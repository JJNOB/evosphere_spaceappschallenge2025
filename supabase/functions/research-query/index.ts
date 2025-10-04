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

CRITICAL INSTRUCTIONS - QUERY-ADAPTIVE RESPONSE:

Analyze the query intent and populate sections according to these rules:

**ALWAYS REQUIRED:**
- SUMMARY (General Scope)
- SOURCES & DATA ACCESS

**DECISION RULES BY QUERY TYPE:**

1. **Research Queries** (asking about studies, findings, experiments, biological effects):
   - Include: KEY FINDINGS / CONCLUSIONS
   - Include: TECHNOLOGY & OPERATIONAL IMPLICATIONS
   - Include: TECHNOLOGY LIMITATIONS
   - Include: UNCERTAINTIES & CONFLICTS (if comprehensive understanding needed)

2. **Technology Queries** (asking about hardware, systems, TRL, countermeasures, operations):
   - Include: TECHNOLOGY & OPERATIONAL IMPLICATIONS
   - Include: TECHNOLOGY LIMITATIONS
   - Include: ENGINEERING & SYSTEMS INTEGRATION (if asking about requirements, specs, integration)

3. **Gap/Uncertainty Queries** (asking about unknowns, conflicts, what's missing, open questions):
   - Include: UNCERTAINTIES & CONFLICTS
   - Include: KEY FINDINGS (for context on what IS known)

4. **Engineering/Requirements Queries** (asking about requirements, interfaces, specifications, systems):
   - Include: ENGINEERING & SYSTEMS INTEGRATION
   - Include: TECHNOLOGY & OPERATIONAL IMPLICATIONS
   - Include: TECHNOLOGY LIMITATIONS

**General Principle:** Be precise and comprehensive for the query's intent. Don't include sections that don't add value to answering the specific question.

Available sections:

1. **SUMMARY (General Scope)** - ALWAYS REQUIRED - Set context and overview:
   - WHY IT MATTERS: Relevance to Moon/Mars exploration and long-duration spaceflight
   - RESEARCH LANDSCAPE: Number and types of studies (human, animal, plant, microbe)
   - PLATFORMS & METHODS: ISS, Space Shuttle, biosatellites, ground analogs, parabolic flights
   - TIMELINE & MATURITY: Timeframe of research and level of scientific maturity/consensus
   - KEY RISKS & SYSTEMS: Biological systems affected and primary risks identified
   Source: Introduction + Abstract

2. **KEY FINDINGS / CONCLUSIONS** - OPTIONAL - Include only if query asks about results/findings:
   - 3-7 findings with quantitative data when possible
   - Mechanisms and pathways discovered
   - Validated countermeasures or tested solutions
   - Include representative references
   Source: Results + Conclusions

3. **UNCERTAINTIES & CONFLICTS** - OPTIONAL - Include only if query asks about gaps/conflicts/unknowns:
   - Conflicting results between studies
   - Reasons for conflicts (species differences, duration, hardware variations)
   - Data shortages and areas with low confidence
   - Open questions requiring further research
   Source: Discussion + Conclusions

4. **TECHNOLOGY & OPERATIONAL IMPLICATIONS** - OPTIONAL - Include only if query asks about tech/operations/TRL/missions:
   - Existing flight and ground hardware used
   - Environmental conditions studied
   - Countermeasures and their Technology Readiness Level (TRL)
   - Operational impacts on missions
   Source: Conclusions + Methods

5. **TECHNOLOGY LIMITATIONS** - OPTIONAL - Include only if query asks about limitations/constraints/problems:
   - Hardware and environment constraints
   - Sample handling and data collection issues
   - Scalability and integration gaps
   - Maintainability concerns
   Source: Methods + Discussion

6. **SOURCES & DATA ACCESS** - ALWAYS REQUIRED - Transparency and traceability:
   - Core papers with full citations
   - Available datasets (OSDR, NASA Task Book, SLS Library)
   - Grant information when available
   - Links to primary data sources
    Source: References + Metadata

7. **ENGINEERING & SYSTEMS INTEGRATION** - OPTIONAL - Include only if query asks for engineering/integration requirements:
   - Derived requirements with "shall/should" statements
   - Interface and environment envelopes (mass, power, thermal, vibration, radiation)
   - Architecture option trades
   - Risk register items
   - Verification & Validation plans
   Source: Methods + Results + Hardware appendices

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
                      description: "OPTIONAL: Derived requirements (shall/should), interface envelopes (mass/power/thermal/vibration/radiation), architecture trades, risk register, V&V plans. Only include if query asks for engineering/integration details."
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
                      description: "List of relevant research papers cited"
                    }
                  },
                  required: ["summary", "sourcesAndDataAccess", "sources"]
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
