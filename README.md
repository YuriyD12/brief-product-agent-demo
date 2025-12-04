# brief-product-agent-demo

Small TypeScript demo that shows how I think about AI agents, routing, and product-aware decisions.

## What it does

It takes a simple product context:

- feature name
- description
- users impacted
- weekly bug reports
- estimated dev days
- revenue impact (optional)

Then it:

1. Routes the decision to either:
   - FeatureAgent (new feature work)
   - TechDebtAgent (bug/debt prioritization)
2. Returns:
   - priority (low, medium, high)
   - rationale
   - recommended next steps
3. Optionally calls an LLM to generate a narrative explanation for a PM.

## Tech

- TypeScript
- Node
- Simple state machine–style logic
- Optional OpenAI integration

## Run locally

```bash
npm install
cp .env.example .env
npm run build
npm start
