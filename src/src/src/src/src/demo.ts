// src/demo.ts
import { ProductOrchestrator } from "./orchestrator";
import { ProductContext } from "./agentTypes";

async function main() {
  const orchestrator = new ProductOrchestrator();

  const context: ProductContext = {
    featureName: "Improve error handling in task creation flow",
    description: "Users occasionally lose data when a task create request fails.",
    usersImpacted: 1500,
    weeklyBugReports: 8,
    estimatedDevDays: 3,
    revenueImpactEstimate: 5000
  };

  const decision = await orchestrator.decide(context);

  console.log("=== Product-Oriented Decision ===");
  console.log(`Agent: ${decision.agent}`);
  console.log(`Priority: ${decision.priority}`);
  console.log(`Rationale: ${decision.rationale}`);
  console.log("Next steps:");
  decision.recommendedNextSteps.forEach((step, i) => {
    console.log(`  ${i + 1}. ${step}`);
  });

  if (decision.narrative) {
    console.log("\nNarrative explanation from LLM:\n");
    console.log(decision.narrative);
  } else {
    console.log("\n(No LLM narrative – set OPENAI_API_KEY to enable it.)");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
