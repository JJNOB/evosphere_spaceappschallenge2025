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

    // Generate research response
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

CRITICAL INSTRUCTIONS - Structure your response according to these sections:

**CITATION FORMAT**: Throughout ALL sections, cite papers using the standard format (FirstAuthor et al. Year), e.g., (Smith et al. 2013). Include citations inline when referencing specific findings, data, or claims.

1. **SUMMARY (General Scope)** - Set context and overview:
   - WHY IT MATTERS: Relevance to Moon/Mars exploration and long-duration spaceflight
   - RESEARCH LANDSCAPE: Number and types of studies (human, animal, plant, microbe)
   - PLATFORMS & METHODS: ISS, Space Shuttle, biosatellites, ground analogs, parabolic flights
   - TIMELINE & MATURITY: Timeframe of research and level of scientific maturity/consensus
   - KEY RISKS & SYSTEMS: Biological systems affected and primary risks identified
   Source: Introduction + Abstract

2. **KEY FINDINGS / CONCLUSIONS** - Main proven results:
   - 3-7 findings with quantitative data when possible
   - Cite specific papers for each finding (FirstAuthor et al. Year)
   - Mechanisms and pathways discovered
   - Validated countermeasures or tested solutions
   Source: Results + Conclusions

3. **UNCERTAINTIES & CONFLICTS** - Gaps and disagreements:
   - Conflicting results between studies with citations
   - Reasons for conflicts (species differences, duration, hardware variations)
   - Data shortages and areas with low confidence
   - Open questions requiring further research
   Source: Discussion + Conclusions

4. **TECHNOLOGY & OPERATIONAL IMPLICATIONS** - Mission planning connections:
   - Existing flight and ground hardware used (cite papers)
   - Environmental conditions studied
   - Countermeasures and their Technology Readiness Level (TRL) with citations
   - Operational impacts on missions
   Source: Conclusions + Methods

5. **TECHNOLOGY LIMITATIONS** - Hardware/method constraints:
   - Hardware and environment constraints
   - Sample handling and data collection issues
   - Scalability and integration gaps
   - Maintainability concerns
    Source: Methods + Discussion

7. **SPECIFICATIONS** - Engineering constraints and design parameters:
   - Operating temperature ranges and environmental conditions
   - Power requirements and constraints
   - Mass, volume, and dimensional specifications
   - Radiation tolerance and shielding requirements
   - Vibration and structural load specifications
   - Interface requirements (mechanical, electrical, data)
   - Sample handling and containment specifications
   - Mission duration constraints and life support requirements
   Source: Methods + Results + Hardware specifications

CRITICAL: If the query is NOT related to the research content available, you MUST return this EXACT message in the summary field:
"The relevant information to process your query could not be found in the current database"

For all other fields when no information is found, return: "No relevant information available in the current database."

When information IS found, provide detailed responses as instructed above.`
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
                description: "Structure the research response with all required sections in markdown format",
                parameters: {
                  type: "object",
                  properties: {
                    summary: {
                      type: "string",
                      description: "General scope covering: relevance to Moon/Mars, research landscape, platforms, timeline & maturity, key systems & risks. If no relevant information found, use the exact message specified in the system prompt."
                    },
                    keyFindings: {
                      type: "string",
                      description: "3-7 main proven results with quantitative data, mechanisms, countermeasures, and references"
                    },
                    uncertaintiesAndConflicts: {
                      type: "string",
                      description: "Gaps, disagreements, conflicting results, reasons for conflicts, data shortages, open questions"
                    },
                    technologyAndOperationalImplications: {
                      type: "string",
                      description: "Flight/ground hardware, environmental conditions, countermeasures with TRL, operational impacts"
                    },
                    technologyLimitations: {
                      type: "string",
                      description: "Hardware constraints, sample handling issues, scalability gaps, maintainability concerns"
                    },
                    sourcesAndDataAccess: {
                      type: "string",
                      description: "Core papers, datasets (OSDR, NASA Task Book), grant info, citations with links"
                    },
                    engineeringAndSystemsIntegration: {
                      type: "string",
                      description: "Engineering constraints and design parameters: operating temperature ranges, power requirements, mass/volume/dimensional specs, radiation tolerance, vibration specs, interface requirements, sample handling specs, mission duration constraints"
                    },
                    sources: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string", description: "Title of the research paper" },
                          url: { type: "string", description: "URL or DOI of the paper" },
                          authors: { type: "string", description: "Authors in format 'FirstAuthor et al.' where FirstAuthor is the name listed directly below the paper title (first author position). For single author use just the name." },
                          year: { type: "string", description: "Publication year" }
                        },
                        required: ["title", "url", "authors", "year"]
                      },
                      description: "List of relevant research papers cited"
                    }
                  },
                  required: ["summary", "keyFindings", "uncertaintiesAndConflicts", "technologyAndOperationalImplications", "technologyLimitations", "sourcesAndDataAccess", "engineeringAndSystemsIntegration", "sources"]
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
