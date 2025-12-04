// src/orchestrator.ts
import OpenAI from "openai";
import { FeatureAgent } from "./featureAgent";
import { TechDebtAgent } from "./techDebtAgent";
import { ProductContext, AgentDecision } from "./agentTypes";

export class ProductOrchestrator {
  private featureAgent = new FeatureAgent();
  private techDebtAgent = new TechDebtAgent();
  private client?: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.client = new OpenAI({ apiKey });
    }
  }

  pickAgent(context: ProductContext): "FeatureAgent" | "TechDebtAgent" {
    if (context.weeklyBugReports >= 3) {
      return "TechDebtAgent";
    }
    return "FeatureAgent";
  }

  async decide(context: ProductContext): Promise<AgentDecision & { narrative?: string }> {
    const agentType = this.pickAgent(context);

    const baseDecision =
      agentType === "FeatureAgent"
        ? this.featureAgent.decide(context)
        : this.techDebtAgent.decide(context);

    let narrative: string | undefined;

    if (this.client) {
      const prompt = `
You are a product-minded engineering advisor.
Given this structured decision, explain to a PM in 4–6 sentences why this priority makes sense.

Decision:
${JSON.stringify(baseDecision, null, 2)}
Context:
${JSON.stringify(context, null, 2)}
      `.trim();

      try {
        const completion = await this.client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }]
        });

        narrative = completion.choices[0]?.message?.content?.toString().trim();
      } catch (err) {
        console.error("Failed to call OpenAI:", err);
      }
    }

    return { ...baseDecision, narrative };
  }
}
