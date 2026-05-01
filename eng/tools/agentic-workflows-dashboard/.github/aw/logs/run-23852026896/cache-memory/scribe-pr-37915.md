# PR #37915 — @azure/ai-projects (new samples)

Date: 2026-03-31
Outcome: issues_found (3 medium)

Findings:
- TypeScript README added link to memories/memoryAdvanced.ts but compiled file missing at samples/v2/typescript/src/memories/
- agentAzureFunction sample missing STORAGE_INPUT_QUEUE_NAME, STORAGE_OUTPUT_QUEUE_NAME, STORAGE_QUEUE_SERVICE_ENDPOINT from sample.env
- agentWebSearchCustomSearch sample missing BING_CUSTOM_SEARCH_PROJECT_CONNECTION_ID, BING_CUSTOM_SEARCH_INSTANCE_NAME from sample.env
