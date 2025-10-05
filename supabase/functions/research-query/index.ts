import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Research papers database - Comprehensive but concise summaries
const RESEARCH_CONTENT = `
=== PAPER 1: Ethical considerations for the age of non-governmental space exploration ===
DOI: https://doi.org/10.1038/s41467-023-44357-x
Published: Nature Communications (2024) 15:4774
Authors: Allen Seylani, Aman Singh Galsinh, Alexia Tasoula, et al.

FOCUS: Ethics, legal frameworks, and medical policy for commercial/private spaceflight in the era of non-governmental space exploration.

KEY BIOLOGICAL HAZARDS OF SPACEFLIGHT:
- Radiation exposure (galactic cosmic rays, solar particle events, trapped radiation) - most significant health hazard
- NASA career radiation limit: <600 mSv (3% cancer mortality risk increase); Mars missions predicted 6-10% risk for females
- Changing gravity fields, acceleration/deceleration, isolation, confinement in hostile closed environment
- Molecular/cellular effects: DNA damage, oxidative stress, mitochondrial dysregulation, microbiome alterations, epigenetic changes, telomere length changes
- Pathophysiology: cardiovascular changes (fluid shifts, orthostatic intolerance, reduced ventricle size, thrombus), musculoskeletal defects (muscle atrophy, bone loss), CNS alterations (SANS, neurocognitive/psychiatric changes), immune dysfunction, cancer risk

ETHICAL ISSUES IN SPACEFLIGHT OCCUPANT SELECTION:
- Current international legal framework inadequate (UN Space Treaties use undefined terms like "envoys of mankind")
- FAA Recommended Practices are minimal, non-mandatory guidelines for launch/reentry only
- Commercial providers responsible for clearance with limited oversight and no standardized screening
- Risk of "medical forum shopping" - individuals denied clearance seeking lenient providers
- Tension between commercial interests (maximizing seat sales) vs. health interests of individuals
- Need for stricter screening as space travelers become more diverse (civilians, those with medical conditions, without rigorous training)

UNCERTAINTIES IN HEALTH CONSEQUENCES:
- Insufficient data on individual differences (age, sex, genetic background)
- Cannot predict individualized space radiation hazards and outcomes
- Unknown: how drugs/supplements metabolize differently in space, pharmacologic ingredient stability over long missions
- Limited data suggests common prescription drugs may work differently in space

HUMAN SUBJECT RESEARCH ETHICS:
- Government-sponsored research strictly regulated by Code of Federal Regulations and NASA IRB committees
- Unclear if commercial spaceflight occupants covered under such regulations
- Autonomy concerns: participants cannot immediately withdraw from study or return to Earth mid-flight
- Cannot avoid unknown long-term effects of spaceflight environment
- Genetic testing deemed "greater than minimal risk" - requires strict privacy protocols, separate data storage, cross-referencing prohibited without IRB approval

RECOMMENDATIONS:
- Unified ethical guidelines for non-governmental space exploration
- Standardized regulatory oversight for commercial providers
- Clear coverage of commercial spaceflight occupants under human research regulations
- Guidelines to ensure highest ethical and medical standards

=== PAPER 2: Aging and putative frailty biomarkers are altered by spaceflight ===
DOI: https://doi.org/10.1038/s41598-024-57948-5
Published: Scientific Reports (2024) 14:13098
Authors: Andrea Camera, Marshall Tabetah, Veronica Castañeda, JangKeun Kim, et al.

FOCUS: Molecular parallels between spaceflight and aging/frailty on Earth. Investigates whether spaceflight induces a frailty-like condition.

DATA SOURCES:
- Murine data from NASA GeneLab (multiple tissue types: muscle, endothelial cells, brain)
- Astronaut cell-free epigenome data from JAXA missions
- Inspiration4 civilian 3-day commercial spaceflight (peripheral blood mononuclear cells)

SPACEFLIGHT MIMICS AGING HALLMARKS:
- Genomic instability, mitochondrial dysfunction, increased inflammation (inflammaging)
- Homeostatic dysregulation, epigenomic changes, cellular senescence
- Telomere dynamics: brief elongation in flight, increased shorter telomeres post-flight
- Similarities to terrestrial aging: metabolic syndrome, cardiovascular disease, diabetes, neurological deterioration, cancer risk

FRAILTY SYNDROME DEFINITION:
- Syndrome caused by combined age-related alterations leading to depleted physiological reserve
- Clinical diagnosis: 3+ of following - unintentional weight loss, weakness, exhaustion, slow gait, low physical activity
- Spaceflight shows biomarkers associated with frailty development

KEY FINDINGS - MURINE MODELS:
- Upregulation of interferon alpha/gamma responsive pathways (immune system activation) - conserved mammalian response
- Changes in metabolic gene expression, inflammatory markers, sarcopenic genes
- Tissue-specific responses: soleus muscle (largest mass decline) showed most pronounced changes
- Similarities between spaceflight-induced and aging-associated molecular changes

KEY FINDINGS - JAXA ASTRONAUTS (Cell-Free Epigenome):
- Putative frailty biomarkers showed altered expression during spaceflight
- CRITICAL: Several gene expression levels did NOT return to baseline after return to Earth
- Example: AKT1 remained upregulated post-flight - linked to age-related cardiac disease and dementia in animal models
- Challenges assumption that all spaceflight changes revert after return

KEY FINDINGS - INSPIRATION4 CIVILIAN MISSION (PBMCs):
- Frailty genes increased post-flight (R+1) compared to pre-flight
- Percentage of increased frailty genes higher than overall differentially expressed genes
- Affected pathways: immunity (ARG2, PPARD), EGFR trafficking (ATXN2), apoptosis regulators (BCL2L1, FAS), survival factors (CNTF), cell signaling (JAG1), metabolism (PPARD), DNA repair (REV1), synaptic transmission (SNX14), cell cycle (TP53)
- Most changes returned to baseline over time but not immediately

METABOLIC FLUX ANALYSIS:
- Lymphoblastoid cells: altered methylation affecting oxidative stress and carbohydrate metabolism
  - Downregulated: lipid metabolism, fatty acid oxidation/synthesis, bile acid synthesis
  - Upregulated: chondroitin sulfate degradation, nucleotide interconversion, peroxisomal transport
- Cardiomyocytes: upregulated lipid metabolism pathways, fatty acid oxidation/synthesis, glycerophospholipid metabolism, galactose metabolism, glutathione metabolism, pentose phosphate pathway
  - Downregulated: folate metabolism only

INFLAMMAGING AND IMMUNE DYSFUNCTION:
- Upregulation of interferon pathways similar to terrestrial chronic inflammation in aging
- Altered immune cell populations
- Suggests spaceflight accelerates aging-like immune changes

IMPLICATIONS:
- Need for validated transcriptomic panels to monitor astronaut health in-flight and post-flight
- Correlation needed with NASA Standard Measures program
- Understanding persistent molecular changes critical for long-duration missions
- Open question: whether metabolic or inflammatory alterations occur first and which drives frailty-like phenotype

=== PAPER 3: Impact of microgravity and lunar gravity on murine skeletal and immune systems ===
DOI: https://doi.org/10.1038/s41598-024-79315-0
Published: Scientific Reports (2024) 14:28774
Authors: Yusuke Okamura, et al.

FOCUS: Effects of partial gravity (lunar 1/6g) vs microgravity on skeletal and immune systems using ISS centrifuge experiments.

EXPERIMENTAL DESIGN:
- Multiple Artificial-gravity Research System (MARS) on ISS with centrifugal devices
- Mouse habitat units, 25-35 days duration (MHU-4, MHU-5 missions)
- Conditions: microgravity (MG), 1/6g lunar gravity (1/6G), 1g Earth gravity (1G) control
- Tissues analyzed: muscle, bone, thymus, spleen, plasma markers

KEY FINDINGS - BONE AND SKELETAL SYSTEM:
- Microgravity: severe bone loss, decreased bone mineral density
- Lunar gravity (1/6g): partial protection - significantly less bone loss than microgravity but not complete prevention
- Plasma markers (TRAP bone resorption, osteocalcin bone formation): similar alterations in MG and 1/6G
- IMPORTANT: Plasma markers may not correlate with actual bone loss degree at partial gravity

KEY FINDINGS - THYMUS (Primary Immune Organ):
- Microgravity: significant atrophy to 56.6% of ground control normalized weight
- Lunar gravity: partial recovery to 74.3% of ground control - substantial improvement but not complete prevention
- Demonstrates gravity-dependent immune organ response

KEY FINDINGS - SPLEEN (Secondary Immune Organ):
- Minimal weight changes across all conditions
- Suggests spleen less sensitive to gravitational alterations than thymus
- Different immune organs show different gravitational sensitivity

GENE EXPRESSION CHANGES (RNA-seq):
- Microgravity: altered actin regulation-related genes, cell cycle regulation genes
- Suggests molecular mechanisms of gravity sensing at cellular level
- Tissue-specific gene expression patterns indicate complex adaptive responses
- Cell cycle regulation appears to be common target of gravitational stress across tissues

BEHAVIORAL TESTS (Vestibular/Motor Function):
- Variable results between missions (MHU-4 vs MHU-5)
- Discrepancies possibly due to centrifuge design differences and gravity gradient effects
- Mid-air righting reflex and rotarod test inconsistencies
- Highlights hardware design impacts on experimental outcomes

CRITICAL CONCEPT - GRAVITY THRESHOLD:
- Different organs have different gravitational thresholds for maintaining normal function
- Organ-specific gravitational sensitivity hierarchy: thymus > bone > spleen
- Lunar gravity (1/6g) provides some protection but insufficient to prevent all adverse effects
- Implies Mars gravity (3/8g) may offer more protection but data needed

IMPLICATIONS FOR SPACE EXPLORATION:
- Moon-based habitats (1/6g) offer partial natural protection against severe spaceflight health effects
- Cannot rely solely on partial gravity environments for astronaut health maintenance
- Additional countermeasures still necessary even in partial gravity
- Need comprehensive multi-system monitoring and targeted interventions
- Essential for planning long-duration Moon and Mars missions
- Artificial gravity systems design considerations important (radius, rotation rate affect outcomes)

TECHNICAL CONSIDERATIONS:
- Centrifuge hardware design impacts experimental outcomes
- Gravity gradient effects in small radius centrifuges
- Standardization needed for artificial gravity research
- Mission duration effects (25-35 days may not represent full long-duration exposure)
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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are EVOSPHERE - an advanced space biology research assistant analyzing NASA publications and scientific papers. Your mission is to bridge space research with practical applications across multiple domains.

CORE PRINCIPLES:
1. **Always cite sources**: Every statement must reference the specific article(s) it comes from. Use inline citations like (Authors et al., Year) throughout your response.

2. **Role-adaptive communication**: Tailor language and focus based on the user's professional needs:
   - For ENGINEERS: Focus on technical specifications, implementation details, system requirements, operational constraints, TRL levels, and concrete numbers (dimensions, masses, power requirements, etc.)
   - For SCIENTISTS: Emphasize research methodology, statistical significance, sample sizes, experimental design, p-values, and research implications
   - For GENERAL/OTHER ROLES: Balance technical detail with accessibility, focusing on practical implications

3. **Cross-domain applications**: Space research has applications beyond space exploration (medicine, materials science, agriculture, biotechnology, etc.). If a query is about a non-space topic, actively identify how the available space research data can contribute valuable insights to that field.

Research Database:
${RESEARCH_CONTENT}

RESPONSE REQUIREMENTS:
- Begin key points with citations: "Research shows X (Smith et al., 2023)"
- Include specific data: percentages, durations, measurements, statistical values
- For engineers: Emphasize system integration, operational parameters, technical constraints
- For scientists: Highlight experimental methods, sample characteristics, statistical robustness
- Connect findings across papers when relevant
- Explicitly note practical implications for the user's domain
- If space data can inform non-space applications, draw those connections clearly
- In sourcesAndDataAccess, list ALL cited papers with full DOIs

Example citation style: "Microgravity exposure leads to 1-2% bone loss per month (Smith et al., 2023), with thymic atrophy reaching 56.6% of normal weight (Jones et al., 2024)."

Return ONLY the structured result using the provided tool.`
          },
          {
            role: "user",
            content: query
          }
        ],
        tools: [{
          type: "function",
          function: {
            name: "format_research_result",
            description: "Format the research query results in a structured way with inline citations",
            parameters: {
              type: "object",
              properties: {
                summary: { 
                  type: "string", 
                  description: "Brief overview with inline citations (Author et al., Year). Tailor language to user role (engineer: technical specs; scientist: methodology). 2-3 paragraphs." 
                },
                keyFindings: { 
                  type: "string", 
                  description: "Bullet points with citations and specific numbers/data. Format: '- Finding description (Author et al., Year): specific data'" 
                },
                uncertaintiesAndConflicts: { 
                  type: "string", 
                  description: "Known uncertainties with citations. Note data gaps and conflicting results." 
                },
                technologyAndOperationalImplications: { 
                  type: "string", 
                  description: "Technology implications with citations, TRL levels, operational constraints, concrete specifications for engineers or practical applications for other fields" 
                },
                technologyLimitations: { 
                  type: "string", 
                  description: "Current limitations with citations and specific constraints/numbers" 
                },
                engineeringAndSystemsIntegration: { 
                  type: "string", 
                  description: "Engineering requirements with citations, system integration challenges, technical specifications relevant to implementation" 
                },
                sourcesAndDataAccess: { 
                  type: "string", 
                  description: "Full citations with DOIs for ALL papers referenced. Format each as: 'Title (Authors, Year). DOI: [link]'" 
                },
                sources: { 
                  type: "array", 
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      authors: { type: "string" },
                      url: { type: "string" }
                    }
                  },
                  description: "Array of ALL cited source documents with full metadata"
                }
              },
              required: ["summary", "keyFindings", "sources", "sourcesAndDataAccess"]
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "format_research_result" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices[0]?.message?.tool_calls?.[0];

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
