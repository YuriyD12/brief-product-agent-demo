// src/featureAgent.ts
import { ProductContext, AgentDecision } from "./agentTypes";

export class FeatureAgent {
  decide(context: ProductContext): AgentDecision {
    const { usersImpacted, revenueImpactEstimate = 0, estimatedDevDays } = context;

    let priority: AgentDecision["priority"] = "low";

    if (usersImpacted > 5000 || revenueImpactEstimate > 20000) {
      priority = "high";
    } else if (usersImpacted > 1000 || revenueImpactEstimate > 5000) {
      priority = "medium";
    }

    const rationale = [
      `Feature: ${context.featureName}`,
      `Users impacted: ${usersImpacted}`,
      `Estimated dev days: ${estimatedDevDays}`,
      `Revenue impact estimate: $${revenueImpactEstimate}`
    ].join(" | ");

    const recommendedNextSteps: string[] = [];

    if (priority === "high") {
      recommendedNextSteps.push(
        "Schedule user calls to validate urgency this week",
        "Create spec and align with engineering on scope",
        "Slot into the next sprint if no blocker appears"
      );
    } else if (priority === "medium") {
      recommendedNextSteps.push(
        "Add to upcoming roadmap with clear success metrics",
        "Collect 3–5 more data points on impact"
      );
    } else {
      recommendedNextSteps.push(
        "Keep in backlog and re-evaluate after next release",
        "Look for signals that this feature is repeatedly requested"
      );
    }

    return {
      agent: "FeatureAgent",
      priority,
      rationale,
      recommendedNextSteps
    };
  }
}
