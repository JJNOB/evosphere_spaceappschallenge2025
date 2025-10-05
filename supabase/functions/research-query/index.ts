import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Research papers database
const RESEARCH_CONTENT = `
=== PAPER 1: FAIRness and Usability for Open-access Omics Data Systems ===
Authors: Daniel C. Berrios, Afshin Beheshti, Sylvain V. Costes
Institution: NASA Ames Research Center
Abstract: Omics data sharing is crucial to biological research. We assessed the "FAIRness" of NASA's GeneLab Data Systems (GLDS) along with four similar systems using 14 FAIRness metrics. Systems performed best in data findability and accessibility, worst in data interoperability. GeneLab is a NASA initiative for open science biomedical research supporting human space exploration and life on Earth. The GLDS manages genomics, transcriptomics, proteomics, and metabolomics data from space biology research.

=== PAPER 2: Selective Proliferation of Highly Functional Adipose-Derived Stem Cells in Microgravity ===
Authors: Takanobu Mashiko, Koji Kanayama, Natsumi Saito, et al.
Abstract: Microgravity conditions combined with microspheres in stirred suspension preserved stemness in human adipose-derived stem cells (hASCs). One-week cultures using polystyrene and collagen microspheres increased proportions of SSEA-3(+) hASCs 4.4- and 4.3-fold compared to normal conditions. These cultured hASCs expressed higher levels of pluripotent markers (OCT4, SOX2, NANOG, MYC, KLF) and had improved abilities for proliferation, colony formation, and multiple-mesenchymal differentiation. This novel culturing method may enhance regenerative therapies.

=== PAPER 3: Cell Type-Specific Calcium Signaling in Arabidopsis Roots Using GCaMP3 ===
Authors: William Krogman, J. Alan Sparks, Elison B. Blancaflor
Institution: Noble Research Institute LLC
Abstract: Cytoplasmic calcium [Ca2+]cyt is a second messenger in plant cells responding to environmental stimuli. We developed Arabidopsis lines expressing GCaMP3 in five root cell types (columella, endodermis, cortex, epidermis, trichoblasts). Found similarities and differences in [Ca2+]cyt signatures when exposed to ATP, glutamate, aluminum, and salt. These lines enable in-depth studies linking environmental stimuli to root developmental pathways via [Ca2+]cyt.

=== PAPER 4: Brassinosteroids Inhibit Autotropic Root Straightening ===
Authors: Louise de Bang, Ana Paez-Garcia, Ashley E. Cannon, et al.
Institution: Noble Research Institute LLC
Abstract: Brassinosteroids affect root gravitropism through effects on filamentous-actin (F-actin). Epi-brassinolide (eBL) and latrunculin B (LatB) both enhanced downward growth and inhibited autotropism (root straightening). eBL reduced F-actin density and modified organization in living roots. Live cell imaging revealed decreased global F-actin dynamics in hypocotyls treated with eBL. eBL-induced enhancement of root gravitropism can be explained by inhibited autotropic root straightening through modifying F-actin organization and dynamics.

=== PAPER 5: MscL Channel/Nanovalve Pore Size Modulation ===
Authors: Li-Min Yang, Robin Wray, Juandell Parker, et al.
Institution: University of Texas Medical Center
Abstract: MscL is a bacterial mechanosensitive channel protecting cells from osmotic lysis. It's a well-characterized mechanosensor serving as paradigm for how molecules sense and respond to stimuli. Can be genetically modified and used as triggered nanovalve for sensors in microelectronic arrays and vesicular drug release. Three routes throttle open channel conductance: shortening linker between TM2 and cytoplasmic bundle, constraining by cross-linking, or heavy metal coordination. These routes provide engineering options for MscL sensors in nanotech devices.

Key Research Areas Covered:
- Space biology and omics data systems
- Microgravity effects on stem cells
- Plant biology and calcium signaling
- Root development and gravitropism
- Mechanobiology and nanovalves
- Regenerative medicine in space
- Plant adaptation to stress
- Biomedical research protocols
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

**CITATION FORMAT**: Throughout ALL sections, cite papers using the standard format (ActualAuthorSurname et al. Year), e.g., (Smith et al. 2013). Extract the ACTUAL author surnames from the papers - never use placeholder text. Include citations inline when referencing specific findings, data, or claims.

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
                          authors: { type: "string", description: "Extract the actual first author's surname from the paper (the name listed directly below the paper title). Format as 'Surname et al.' for multiple authors, or just 'Surname' for single author. NEVER use placeholder text like 'FirstAuthor'." },
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
