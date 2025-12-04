// src/techDebtAgent.ts
import { ProductContext, AgentDecision } from "./agentTypes";

export class TechDebtAgent {
  decide(context: ProductContext): AgentDecision {
    const { weeklyBugReports, estimatedDevDays, usersImpacted } = context;

    let priority: AgentDecision["priority"] = "low";

    if (weeklyBugReports >= 10 || usersImpacted > 3000) {
      priority = "high";
    } else if (weeklyBugReports >= 3) {
      priority = "medium";
    }

    const rationale = [
      `Tech debt area: ${context.featureName}`,
      `Weekly bug reports: ${weeklyBugReports}`,
      `Estimated dev days to fix: ${estimatedDevDays}`,
      `Users impacted: ${usersImpacted}`
    ].join(" | ");

    const recommendedNextSteps: string[] = [];

    if (priority === "high") {
      recommendedNextSteps.push(
        "Block time next sprint to address this debt",
        "Add monitoring or alerts around this area",
        "Document the fix and update runbooks"
      );
    } else if (priority === "medium") {
      recommendedNextSteps.push(
        "Bundle this fix with related work in the next 2–3 sprints",
        "Track bug trend to see if it accelerates"
      );
    } else {
      recommendedNextSteps.push(
        "Keep documented, but only prioritize if the bug volume increases"
      );
    }

    return {
      agent: "TechDebtAgent",
      priority,
      rationale,
      recommendedNextSteps
    };
  }
}
