import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Research papers database - Full text content from all PDFs
const RESEARCH_CONTENT = `
=== PAPER 1: Ethical considerations for the age of non-governmental space exploration ===
DOI: https://doi.org/10.1038/s41467-023-44357-x
Published: Nature Communications (2024) 15:4774
Authors: Allen Seylani, Aman Singh Galsinh, Alexia Tasoula, et al.

ABSTRACT:
Mounting ambitions and capabilities for public and private, non-government sector crewed space exploration bring with them an increasingly diverse set of space travelers, raising new and nontrivial ethical, legal, and medical policy and practice concerns which are still relatively underexplored. In this piece, we lay out several pressing issues related to ethical considerations for selecting space travelers and conducting human subject research on them, especially in the context of non-governmental and commercial/private space operations.

INTRODUCTION:
It has been over 50 years since the first human walked on the Moon. Since then, most commercialized spaceflights have been contracts granted to private companies by various governments to launch satellites. In recent years, the definition of commercial spaceflight has expanded to include human transportation between Earth and habitats in Low Earth Orbit and future lunar or other extraterrestrial outposts. With the first crewed launch of SpaceX Dragon to the International Space Station (ISS) on May 30, 2020, a new era of public-private spaceflight partnership has emerged. Private companies such as Boeing, Virgin Galactic, Axiom, Sierra Space, and Blue Origin now create steep commercial demand for crewed spaceflight.

An increase in commercial/private and civilian space missions with a more diverse crew may provide an opportunity to collect data on health issues in space. While these data could shape medical standards and improve treatment choices for prolonged spaceflight, their collection and management should require strict regulation. As spacefarers shift from professionally trained astronauts to private individuals without rigorous preparation or with existing medical conditions, there is a need to refine selection criteria and training for non-governmental space travelers.

BIOLOGICAL HAZARDS OF SPACEFLIGHT:
Current space missions to the ISS in Low Earth Orbit and future missions pushing the boundaries of human space exploration towards the Moon and Mars are characterized by exposure to space radiation (galactic cosmic rays GCR, solar particle events SPE, trapped radiation), changing gravity fields, acceleration/deceleration phenomena, isolation and confinement in a hostile and closed environment, and distance from Earth. Exposure to GCR/SPE is potentially the most significant single health hazard for Low Earth Orbit; for deep-space crewed missions beyond the Earth's protective magnetic field this risk profile increases dramatically.

NASA increased an individual astronaut's total career effective radiation dose (independent of age at exposure and sex) to less than 600 mSv, translating into a mean risk increase of cancer mortality (REID) of below 3% above the non-exposed baseline mean. However, these standards remain controversial, especially in light of predicted REID ranging between 6-10% for females exposed at ages 20, 40, and 60 years for a simulated Mars Mission.

At the molecular level, space hazards drive a diverse array of molecular and cellular changes observed during spaceflight, including DNA damage, oxidative stress, mitochondrial dysregulation, microbiome alterations, epigenetic changes, and telomere length changes. Such cellular and molecular effects lead to serious pathophysiology including: cardiovascular system changes (fluid shifts, orthostatic intolerance, reduced ventricle size, thrombus formation), musculoskeletal defects (muscle atrophy and bone loss), central nervous system alterations (fluid shifts, neurocognitive and psychiatric alteration, Space-Associated Neuro-ocular Syndrome SANS), immune system dysfunction, and initiation of malignant processes due to loss of DNA integrity, failed DNA repair mechanisms, mutations, and chromosomal rearrangements.

ETHICAL ISSUES RELATED TO SELECTION OF SPACEFLIGHT OCCUPANTS:
Given these significant spaceflight hazards, stringent selection criteria are important to protect astronaut and spaceflight occupant (SO) health. For instance, the ISS Multilateral Space Medicine Board provides guidance about travel to the ISS by private individuals and NASA has significantly strengthened its health-oriented recommendations over the last two decades. However, with increasing commercial and private spaceflight opportunities, it is no longer just trained and pre-screened astronauts who travel to space.

Current guidance on its own is not in a good position to resolve some of the issues that will arise in these new contexts. While some guidelines might apply to certain instances of paying SOs (for example, private astronauts travelling to the ISS and therefore covered by ISS rules), there is still a relative dearth of discussion concerning how to extend these important deliberations to the new types of SO that we are likely to see in the coming decades.

The relevant international legal framework, i.e. the five UN Space Treaties, do not specifically address the health of astronauts or other spaceflight participants. The Outer Space Treaty (OST) of 1967 introduces the concept of "envoys of mankind" for astronauts; the Rescue and Return Agreement (RRA) extends this protection to "personnel of spacecraft". However, neither of these terms is clearly defined and terminological inconsistencies have led to broad interpretation.

In the US, the FAA and NASA entered a Memorandum of Understanding in June 2012 to coordinate standards for commercial government or non-government astronaut transport to and from Low Earth Orbit and the ISS. Despite this, the clearance of 'ordinary' SOs for spaceflight is currently the responsibility of commercial providers, with limited oversight, and a lack of standardized screening procedures and protocols. The FAA Recommended Practices for Human Space Flight Occupant Safety only apply to launch and reentry. The guidance comes not in the form of mandatory requirements but rather as minimal recommendations.

MEDICAL FORUM SHOPPING AND SELECTION CONCERNS:
If an SO fails to be cleared by one physician, can they get clearance from a more lenient provider elsewhere? Medical forum shopping is a foreseeable ethical and legal concern where regulatory standardization is lacking or is inconsistent between jurisdictions, which could lead to increased risk of harm for the individual, spaceflight crew, and uninvolved third parties.

There might be tension between the potential clearance requirements desirable for a commercial spaceflight operator or provider (who might have an interest in lenient requirements to sell as many seats as possible) and those desirable from the health standpoint of a particular SO. While legal and social norms allow people to engage in some risks, questions arise about the appropriate degree of paternalistic oversight for space travel, as well as questions about who has the power to enforce relevant policies and regulations.

UNCERTAINTIES IN HEALTH CONSEQUENCES:
Even if stringent screening requirements are in place, substantial uncertainties remain regarding the various health consequences of space travel, making it virtually impossible for specific individuals to understand what their actual health risks are. Current data insufficiently address individual differences among astronauts such as age, sex, and genetic background, which translates into significant uncertainty in predicting individualized space radiation hazards and outcomes for both astronauts and SOs.

In addition, while it is known that individuals metabolize drugs and supplements differently in space, little to nothing is known about the physiology underlying these changes. Limited available data suggests that even relatively common prescription drugs might work differently in space. Furthermore, the reduced and often unknown stability of pharmacologic ingredients and supplements over the course of exploration-rated space missions becomes even more critical.

HUMAN SUBJECT RESEARCH ETHICS:
Human Subject Research projects in space, supported or otherwise subject to regulation by any US federal department or agency, are strictly regulated under the Code of Federal Regulations. NASA Institutional Review Board (IRB) committees review such research proposals to guarantee enforcement of these policies and the ethical, safe, and equitable treatment of human research subjects. While government-sponsored human subject research is strictly regulated, it is still unclear whether future commercial SOs will be covered under such regulations.

Increased commercial and private spaceflight opportunities will bring with them an expanding diversity of SOs with different health profiles, most of them likely not in the same physical and psychological shape as highly trained career astronauts. By necessity, increasing knowledge about the effects of the spaceflight environment on human molecular biology, physiology, and psychology, as well as on the chemical composition of pharmaceuticals, involves human subject research.

Principles of health ethics encompass avoiding harm, beneficence, achieving a favorable risk-benefit balance, respecting autonomy, fairness, and fidelity. Human subject research in space may violate a participant's autonomy, should the individual decide to withdraw from the study. In terrestrial medical research, subjects may at any time withdraw their consent, even if the study is already in progress. Such withdrawal, however, is much more complicated in space. Even if individuals are able to drop out, return to Earth will not be immediate. There is also no way for individuals to withdraw from the possible (unknown) long-term effects of the spaceflight environment.

GENETIC TESTING AND PRIVACY:
The highest level of concern involves human subject research studies involving genetic testing. NASA defines genetic testing based on the Genetic Information Nondiscrimination Act. Studies involving genetic testing in human subjects are deemed of the highest concern and automatically categorized as "greater than minimal risk". These studies require additional measures to protect research subjects, including policies that prohibit the public release of genetic data without prior approval from the individual or their direct family members. NASA enforces strict rules as genetic data must be stored separately, and cross-referencing is forbidden without IRB approval.

CONCLUSION:
We are entering an exciting new era of space exploration previously only thought of as science fiction. Commercial/private and civilian spaceflights, such as Inspiration4 and the Polaris missions are no longer just a possibility but a reality. While governmental oversight has historically governed space activities, the emergence of non-governmental initiatives calls for unified ethical guidelines, safeguarding human well-being during selection, research, and decision-making in space. Since non-governmental outfits are not bound by the same rules in the same way, we as a community must ensure that the guidelines we set will guide space exploration according to the highest ethical and medical standards for humans that are currently possible.

=== PAPER 2: Aging and putative frailty biomarkers are altered by spaceflight ===
DOI: https://doi.org/10.1038/s41598-024-57948-5
Published: Scientific Reports (2024) 14:13098
Authors: Andrea Camera, Marshall Tabetah, Veronica Castañeda, JangKeun Kim, et al.

ABSTRACT:
Human space exploration poses inherent risks to astronauts' health, leading to molecular changes that can significantly impact their well-being. These alterations encompass genomic instability, mitochondrial dysfunction, increased inflammation, homeostatic dysregulation, and various epigenomic changes. Remarkably, these changes bear similarities to those observed during the aging process on Earth. However, our understanding of the connection between these molecular shifts and disease development in space remains limited. Frailty syndrome, a clinical syndrome associated with biological aging, has not been comprehensively investigated during spaceflight.

To bridge this knowledge gap, we leveraged murine data obtained from NASA's GeneLab, along with astronaut data gathered from the JAXA and Inspiration4 missions. Our objective was to assess the presence of biological markers and pathways related to frailty, aging, and sarcopenia within the spaceflight context. Through our analysis, we identified notable changes in gene expression patterns that may be indicative of the development of a frailty-like condition during space missions. These findings suggest that the parallels between spaceflight and the aging process may extend to encompass frailty as well.

INTRODUCTION:
Missions beyond low Earth orbit are the new frontier of crewed space exploration. Future missions to Mars as well as long-duration missions to the Moon will be significantly more sustained than any previous deep space mission. During transit, the space environment presents key challenges for astronauts' safety. Previous literature describes microgravity, radiation exposure, isolation and confinement as major stressors that are able to induce pathophysiological changes in the heart, skeletal muscle, and immune system, as well as bone loss, central nervous system alterations, and increased cancer risk.

There is increasing interest to identify the molecular mechanisms driving those health risks, including changes in mitochondrial function, genetic and epigenetic regulation, telomere-length dynamics, DNA damage, and oxidative stress. Interestingly, the molecular mechanisms of spaceflight-related stressors share similarities with the hallmarks of aging: mitochondrial dysfunction, genomic instability, epigenetic alterations, telomere length changes (including brief elongation in flight and increased shorter telomeres post-flight), cellular senescence, and dysbiosis.

AGING AND FRAILTY:
Aging is a state of depleted biological resilience resulting in an increased vulnerability to stressors. It leads to a systemic loss of the body's capacity to maintain homeostasis and health. The aging phenotype manifests in metabolic syndrome, cardiovascular disease, diabetes, neurological deterioration, and cancer. Old age is also marked by immune dysregulation, which can result in a chronic low-grade inflammation state called inflammaging, a status associated with increased levels of pro-inflammatory markers in blood and tissues. The deterioration in muscle quality and quantity is another feature of aging, characterized by altered myofiber metabolism and impaired satellite cell activity. Loss of muscle mass increases the risk of developing other comorbidities, in a vicious cycle that leads to unhealthy aging.

Frailty, a recent concept in aging science, can be defined as a syndrome caused by the combined effect of numerous age-related alterations. These alterations lead to a depletion of physiological reserve and/or deterioration of cognitive functions, resulting in an increased risk of morbidity and mortality. Frailty can be clinically diagnosed by the presence of three or more of the following components: unintentional weight loss over the last year, weakness, exhaustion, slow gait, and low physical activity level.

KEY FINDINGS FROM MURINE MODELS:
We analyzed multiple murine datasets from NASA's GeneLab including muscle tissues (gastrocnemius, extensor digitorum longus, quadriceps, soleus, tibialis anterior), endothelial cells, brain tissue, and data from bedrest studies. The expression of putative frailty related biomarkers showed significant alterations in spaceflight compared to ground controls.

In muscle tissue, we found:
- Upregulation of interferon alpha and gamma responsive pathways
- Changes in metabolic gene expression
- Alterations in inflammatory markers
- Modified expression of sarcopenic genes

These changes were tissue-specific, with the soleus muscle (which displayed the largest decline in mass) showing more pronounced changes than other muscle groups.

ASTRONAUT DATA - JAXA CELL-FREE EPIGENOME:
We examined Cell-Free Epigenome samples from JAXA astronauts at multiple timepoints (before flight, during flight, and after return). Putative frailty biomarkers showed altered expression during spaceflight compared to ground control. Interestingly, several gene expression levels did not return to baseline after reentry, suggesting persistent spaceflight-induced modifications.

For example, AKT1 was upregulated at all timepoints after reentry. A persisted upregulation of this gene is linked to age-related cardiac disease and dementia in animal models. The presence of biomarker gene expression that does not revert to normal challenges the concept that every physiological change induced by spaceflight is reverted after astronauts' return to Earth.

INSPIRATION4 CIVILIAN MISSION DATA:
We used single-cell gene expression data from peripheral blood mononuclear cells (PBMCs) from the Inspiration4 civilian commercial 3-day space mission. Frailty genes were increased in PBMCs and subpopulations post-flight compared to pre-flight timepoints. The percentage of increased frailty genes was higher than the percentage of differentially expressed genes overall.

Generally, the average expression and percentage of expression of the increased genes were increased at R+1 (immediately after return) compared to pre-flights and returned to baseline over time. Several genes were upregulated at R+1 in various pathways including: immunity (ARG2, PPARD), EGFR trafficking (ATXN2), regulators of apoptosis (BCL2L1, FAS), survival factor for neuronal cell types (CNTF), cell-cell signaling (JAG1), metabolism (PPARD), DNA repair (REV1), neuronal excitability and synaptic transmission (SNX14), and cell cycle regulation (TP53).

METABOLIC FLUX ANALYSIS:
We applied metabolic flux balance analysis simulations using transcriptional changes from human lymphoblastoid cells and cardiomyocytes exposed to microgravity. In lymphoblastoid cells, microgravity led to transcriptional changes through altered methylation patterns affecting oxidative stress and carbohydrate metabolism pathways. The flux simulation showed that pathways associated with lipid metabolism, fatty acid oxidation, fatty acid synthesis, and bile acid synthesis were downregulated during flight, while chondroitin sulfate degradation, nucleotide interconversion, and peroxisomal transport were upregulated.

In cardiomyocytes, marked up-regulation during flight was observed in lipid metabolism-associated pathways (fatty acid oxidation, fatty acid synthesis, glycerophospholipid metabolism), galactose metabolism, nucleotide interconversion, CoA synthesis, glutathione metabolism, and pentose phosphate pathway. The only significant downregulation was detected in folate metabolism.

INFLAMMAGING AND IMMUNE SYSTEM:
One of the most pronounced findings in both rodent and human datasets is the induction of interferon alpha and gamma responsive pathways. Interferons are cytokines associated with modulation of the immune response which is a known consequence of spaceflight. Our observation of the activation of interferon pathways suggests that the activation of the innate immune system is a conserved mammalian response to spaceflight and aging. In the aging field, the concept of inflammaging suggests that the chronic low-grade dysregulation of the immune system that happens with aging underpins the development of diseases such as atherosclerosis, type II diabetes, and sarcopenia.

IMPLICATIONS:
These findings suggest that future studies aimed at establishing a validated transcriptomic panel for astronauts could be fruitful areas of investigation for monitoring and improving astronaut health in- and post-flight. The establishment and validation of such a panel could be done by correlating with physiological measures already captured by NASA's standard measures program or by adapting physiological measures from emerging frailty indexes.

It remains an open question if, like sarcopenia, metabolic alterations occur earlier than inflammatory alterations in flight and whether inflammation or an altered metabolism is the key driver for a frailty-like phenotype in space.

=== PAPER 3: Impact of microgravity and lunar gravity on murine skeletal and immune systems during space travel ===
DOI: https://doi.org/10.1038/s41598-024-79315-0
Published: Scientific Reports (2024) 14:28774
Authors: Yui Okamura, Kei Gochi, Tatsuya Ishikawa, Takuto Hayashi, et al.

ABSTRACT:
Long-duration spaceflight creates a variety of stresses due to the unique environment, which can lead to compromised functioning of the skeletal and immune systems. However, the mechanisms by which organisms respond to this stress remain unclear. The present study aimed to investigate the impact of three different gravitational loadings (microgravity, 1/6 g lunar gravity, and 1 g) on the behavior, bone, thymus, and spleen of mice housed for 25-35 days in the International Space Station.

The bone density reduction under microgravity was mostly recovered by 1 g but only partially recovered by 1/6 g. Both 1 g and 1/6 g suppressed microgravity-induced changes in some osteoblast and osteoclast marker gene expression. Thymus atrophy induced by microgravity was half recovered by both 1 g and 1/6 g, but gene expression changes were not fully recovered by 1/6 g. While no histological changes were observed due to low gravity, alterations in gene expression were noted in the spleen. We found that in bone and thymus, lunar gravity reduced microgravity-induced histological alterations and partially reversed gene expression changes. This study highlighted organ-specific variations in responsiveness to gravity.

INTRODUCTION:
Space exploration has attracted attention in various fields, including materials, fuels, communication equipment, systems, medicine, and botany. To further explore space, the manned lunar exploration program "Artemis" has been initiated, and research is underway to address the various obstacles to the space environment. Notably, astronauts experience various environmental challenges during spaceflight including microgravity, psychological stress, and high space radiation. These changes pose significant threats to the various physiological functions of astronauts. A prolonged stay in space induces changes such as deterioration of bones, skeletal muscle function, vestibular control, optic nerve papillary edema, and cardiac hypertrophy among astronauts.

To conduct space exploration, we must understand biological effects at the molecular level to adapt to space environments such as gravity on the Moon and Mars. It is important to study the effects of long-term gravitational fluctuations on living organisms to prepare for future space exploration.

MOUSE HABITAT UNIT MISSIONS:
We successfully housed mice in the ISS under different gravitational conditions for 25-35 days using the Multiple Artificial-gravity Research System (MARS), which can exhibit varying gravitational forces using a centrifugal device. Three missions (MHU-1, -4, and -5) were conducted:
- MHU-1: Compared microgravity (MG) vs artificial 1g (AG) for 35 days
- MHU-4 and MHU-5: Studied partial gravity 1/6g (PG) lunar gravity for 25-26 days using centrifuges of different radii

BEHAVIORAL TESTS:
Vestibular function and coordinated movements were assessed using mid-air righting reflex tests and rotarod tests. In MHU-1, the latency to right tended to increase non-significantly in MG mice compared to AG and ground control (1GC) mice. The duration on the rotarod was significantly shorter in both AG and MG mice compared to 1GC mice. Results varied between the two partial gravity missions, possibly due to differences in centrifuge design and gravity gradient effects.

BONE MASS AND DENSITY:
MG mice in MHU-1 showed a significant 70% decrease in trabecular bone volume/tissue volume (BV/TV), whereas PG mice in MHU-4 and -5 showed only 30% and 28% decreases respectively, despite housing being 10 days shorter. In cortical bone, cross-sectional area (Ct.Ar) and thickness (Ct.Th) decreased significantly by 17% and 16% in MG mice. In PG mice, these reductions were only 5% in MHU-4 (not significant), while MHU-5 showed significant reductions of 7% and 5% respectively.

Plasma levels of the bone resorption marker TRAP increased by 139% in MG mice, while bone formation marker osteocalcin decreased by 49%. In PG mice, TRAP increases (127% and 139%) and osteocalcin decreases (44% and 51%) were comparable to MG mice, suggesting these plasma markers may not directly correlate with the degree of bone loss prevention observed at 1/6g.

GENE EXPRESSION IN BONE:
RNA-seq analysis of osteocyte-rich bone fractions revealed 485 differentially expressed genes between MG and 1GC mice. Gene ontology analysis identified:
- Upregulation of actin regulation-related genes (cluster 1), which may represent gravity sensing through cytoskeletal changes
- Downregulation of genes responsible for mitochondrial function and cell cycle (clusters 3 and 4)

Osteoblast markers (Sost, Bmp4, Spp1) showed significantly higher expression in MG mice, while Bglap expression was significantly lower. These changes were absent when comparing partial gravity (4PG) and ground control (4GC) mice. Osteoclast markers Acp5 and Ctsk were significantly upregulated in MG mice, and these changes were partially suppressed in PG mice. This suggests that bone is highly sensitive to gravitational alterations.

THYMUS ATROPHY:
Thymus weight normalized by body weight was reduced to 56.6% in MG mice compared to ground controls. In artificial 1g (AG), thymus weight was reduced to 79.8%, and in partial gravity (PG) mice it decreased to 76.4% and 79.2% in the two missions, indicating that both 1/6g and artificial 1g partially suppressed gravity-induced thymus reduction.

Histological analysis revealed no significant changes between PG and GC mice using HE staining. Immunostaining with anti-Aire, UEA-1, and nuclei showed no differences in thymic epithelial cell distribution between PG and GC mice, unlike the abnormal distribution observed in MG mice. This suggests that 1/6g and artificial 1g partially countered thymic weight loss and prevented histological changes induced in the microgravity environment.

RNA-seq analysis of thymus tissue identified 2880 differentially expressed genes between MG and 1GC mice. Clustering revealed five distinct groups, with samples classified into a "1g group" (including ground controls and AG) and a "less than 1g group" (including PG and MG). Gene ontology analysis showed:
- Downregulation of endothelial morphogenesis genes in PG and MG mice
- Upregulation of cell migration genes, particularly pronounced in MG mice
- Downregulation of cell cycle genes in MG mice, with cluster-specific patterns

SPLEEN GENE EXPRESSION:
Body weight-normalized spleen weights in MG mice tended to be lower than GC mice. Histological analysis revealed no significant differences between any experimental groups. However, RNA-seq analysis of 681 differentially expressed genes between MG and 1GC mice showed distinct clustering patterns. Gene ontology analysis identified cell cycle-related genes in the downregulated cluster, consistent with observations in bone and thymus tissues.

DISCUSSION:
This study represents a comprehensive analysis of organ-specific gravitational responses during spaceflight. Key findings include:

1. Lunar gravity (1/6g) provides partial protection against microgravity-induced bone loss, though not as effectively as 1g
2. Thymus atrophy is partially prevented by both 1/6g and 1g, with histological preservation at 1/6g
3. Gene expression changes in bone, thymus, and spleen suggest complex organ-specific adaptive responses
4. Cell cycle regulation appears to be a common target of gravitational stress across multiple tissues

The results demonstrate that there may be a threshold gravity level necessary to maintain normal physiological function during spaceflight. While 1/6g (lunar gravity) provides some protection, it is insufficient to completely prevent all spaceflight-induced changes. This has important implications for future Moon and Mars missions, where astronauts will experience reduced but non-zero gravity.

CLINICAL IMPLICATIONS:
Understanding the molecular-level gravity threshold for maintaining healthy skeletal and immune systems is crucial for developing countermeasures for long-duration space missions. The partial recovery observed at lunar gravity suggests that Moon-based habitats may offer some natural protection against the most severe spaceflight health effects, though additional countermeasures will still be necessary.

The organ-specific variations in responsiveness to gravity highlight the need for comprehensive, multi-system monitoring and targeted interventions during future exploration missions.
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
