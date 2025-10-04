import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Research paper content from Bion-M 1 Space Mission study
const RESEARCH_CONTENT = `
Title: Mice in Bion-M 1 Space Mission: Training and Selection

Abstract:
After a 16-year hiatus, Russia has resumed its program of biomedical research in space, with the successful 30-day flight of the Bion-M 1 biosatellite (April 19–May 19, 2013). The principal species for biomedical research in this project was the mouse. This paper presents an overview of the scientific goals, the experimental design and the mouse training/selection program. The aim of mice experiments in the Bion-M 1 project was to elucidate cellular and molecular mechanisms, underlying the adaptation of key physiological systems to long-term exposure in microgravity. The studies with mice combined in vivo measurements, both in flight and post-flight (including continuous blood pressure measurement), with extensive in vitro studies carried out shortly after return of the mice and in the end of recovery study. Male C57/BL6 mice group housed in space habitats were flown aboard the Bion-M 1 biosatellite, or remained on ground in the control experiment that replicated environmental and housing conditions in the spacecraft. Vivarium control groups were used to account for housing effects and possible seasonal differences. Mice training included the co-adaptation in housing groups and mice adaptation to paste food diet. The measures taken to co-adapt aggressive male mice in housing groups and the peculiarities of ''space'' paste food are described. The training program for mice designated for in vivo studies was broader and included behavioral/functional test battery and continuous behavioral measurements in the home-cage. The results of the preliminary tests were used for the selection of homogenous groups. After the flight, mice were in good condition for biomedical studies and displayed signs of pronounced disadaptation to Earth's gravity. The outcomes of the training program for the mice welfare are discussed. We conclude that our training program was effective and that male mice can be successfully employed in space biomedical research.

Key Research Areas:
- Space biology and microgravity effects
- Mouse physiology in space
- Adaptation mechanisms
- Biomedical research protocols
- Cardiovascular responses
- Muscle atrophy
- Bone density changes
- Cellular and molecular mechanisms
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log('Processing query:', query);

    // Step 1: Classify user persona
    const personaResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a persona classifier for space biology research queries. 
Analyze the user's query and classify them into ONE of these personas based on their needs and focus:

- scientist: Looking for detailed biological mechanisms, cellular processes, molecular data, research methodology
- manager: Interested in project outcomes, timelines, resource allocation, team coordination
- mission_architect: Focused on mission design, requirements, constraints, system integration
- engineering: Concerned with technical specifications, hardware, measurements, implementation

Return ONLY the persona type.`
          },
          {
            role: "user",
            content: query
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "classify_persona",
              description: "Classify the user into one of the predefined personas",
              parameters: {
                type: "object",
                properties: {
                  persona: {
                    type: "string",
                    enum: ["scientist", "manager", "mission_architect", "engineering"],
                    description: "The classified user persona"
                  },
                  reasoning: {
                    type: "string",
                    description: "Brief explanation of why this persona was chosen"
                  }
                },
                required: ["persona", "reasoning"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "classify_persona" } }
      }),
    });

    if (!personaResponse.ok) {
      throw new Error(`Persona classification failed: ${personaResponse.status}`);
    }

    const personaData = await personaResponse.json();
    const personaToolCall = personaData.choices[0].message.tool_calls?.[0];
    
    if (!personaToolCall) {
      throw new Error('No persona classification received');
    }

    const { persona, reasoning } = JSON.parse(personaToolCall.function.arguments);
    console.log('Classified persona:', persona, '- Reasoning:', reasoning);

    // Step 2: Generate research response
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a NASA bioscience research assistant. Analyze the following research paper and provide detailed, accurate summaries in markdown format.

Research Paper Content:
${RESEARCH_CONTENT}

DETECTED USER PERSONA: ${persona}
Note: For now, provide the standard research response. Persona-specific customization will be added in the next phase.

IMPORTANT INSTRUCTIONS:
1. For the SUMMARY section:
   - If analyzing 1-2 papers: Cite the author(s) ONCE at the beginning (e.g., "Smith et al. (2013) investigated..."), then present findings without repeated citations
   - If analyzing 3+ papers: Write in academic literature review style with inline citations throughout (e.g., "Smith et al. demonstrated that...", "According to Johnson and Lee...")
   - Focus ONLY on the most important and significant findings
   - Be concise - prioritize quality over quantity
   - Use proper academic tone and structure

2. For KEY FINDINGS:
   - List the 3-5 most critical discoveries
   - For 1-2 papers: No need to cite repeatedly
   - For 3+ papers: Include author citations to distinguish sources
   - Use bullet points with brief explanations

3. For CONTRADICTIONS:
   - Only mention significant debates or conflicting results between studies
   - Always cite the authors of conflicting studies

4. If the query is NOT related to the research content, indicate that no relevant information was found and suggest what topics ARE covered in the database.`
          },
          {
            role: "user",
            content: query
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "structure_research_response",
              description: "Structure the research response with clear sections in markdown format",
              parameters: {
                type: "object",
                properties: {
                  summary: {
                    type: "string",
                    description: "Academic-style summary. For 1-2 papers: cite author(s) once at start, then present findings. For 3+ papers: use inline citations throughout. Focus on most important findings only."
                  },
                  keyFindings: {
                    type: "string",
                    description: "3-5 most critical discoveries in bullet points. Only include citations if multiple papers are involved."
                  },
                  contradictions: {
                    type: "string",
                    description: "Contradictions or debates in the research community in markdown format, or empty string if none applicable"
                  },
                  sources: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "Title of the research paper" },
                        url: { type: "string", description: "URL or DOI of the paper" },
                        authors: { type: "string", description: "Authors in format 'FirstAuthor et al.' if multiple authors" },
                        year: { type: "string", description: "Publication year" }
                      },
                      required: ["title", "url", "authors", "year"]
                    },
                    description: "List of relevant research papers cited with authors and publication year"
                  }
                },
                required: ["summary", "keyFindings", "contradictions", "sources"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "structure_research_response" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices[0].message.tool_calls?.[0];
    
    if (!toolCall) {
      console.error('No tool call received');
      throw new Error('No structured response received from AI');
    }

    const result = JSON.parse(toolCall.function.arguments);
    
    // Add persona to the result
    result.persona = persona;

    console.log('Query processed successfully');

    return new Response(
      JSON.stringify({ result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error('Error in research-query function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
