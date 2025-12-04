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

1. Routes the decision to either  
   - `FeatureAgent` for new feature work  
   - `TechDebtAgent` for recurring issues and debt
2. Returns  
   - priority (`low`, `medium`, `high`)  
   - rationale  
   - recommended next steps  
3. Optionally calls an LLM (OpenAI) to generate a short narrative explanation for a PM.

It is a tiny version of how tools like Brief could give engineers and PMs product-aware recommendations instead of only code-level help.

## Tech

- TypeScript  
- Node  
- Simple state-machine style logic for decisions  
- Optional OpenAI integration for narrative output  

## Run locally

```bash
npm install
cp .env.example .env
# add your OpenAI API key to .env if you want narrative output
npm run build
npm start
