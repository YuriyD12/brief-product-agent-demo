// src/agentTypes.ts

export type Priority = "low" | "medium" | "high";

export interface ProductContext {
  featureName: string;
  description: string;
  usersImpacted: number;
  weeklyBugReports: number;
  estimatedDevDays: number;
  revenueImpactEstimate?: number;
}

export interface AgentDecision {
  agent: "FeatureAgent" | "TechDebtAgent";
  priority: Priority;
  rationale: string;
  recommendedNextSteps: string[];
}
