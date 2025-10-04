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
            content: `You are a NASA bioscience research assistant. Analyze the following research paper and provide detailed, accurate summaries based on the content. When answering queries, focus on:
1. Research Summary: Key findings and methodology
2. Key Insights: Important discoveries and conclusions
3. Knowledge Gaps: Areas needing further research

Research Paper Content:
${RESEARCH_CONTENT}

Provide structured, detailed responses based on the actual research content.`
          },
          {
            role: "user",
            content: query
          }
        ],
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
    const result = data.choices[0].message.content;

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
