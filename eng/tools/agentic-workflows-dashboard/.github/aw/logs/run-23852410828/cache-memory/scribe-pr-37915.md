# PR #37915 — @azure/ai-projects (new samples)

Date: 2026-04-01 (re-run)
Outcome: clean

Summary:
All 5 new sample files (agentAzureFunction, agentCodeInterpreterWithFiles, agentWebSearchCustomSearch, agentWebSearchPreview, responseBasicWithoutAIProjectClient) are properly documented:
- Both TypeScript and JavaScript README tables updated with accurate descriptions matching @summary JSDoc tags
- Link definitions added for all new samples in both READMEs
- sample.env files updated with all required env vars (STORAGE_INPUT/OUTPUT_QUEUE_NAME, STORAGE_QUEUE_SERVICE_ENDPOINT, BING_CUSTOM_SEARCH_PROJECT_CONNECTION_ID, BING_CUSTOM_SEARCH_INSTANCE_NAME)
- memoryAdvanced.ts was removed (not added), no dangling README references
- Previous issues from prior run are fully resolved
