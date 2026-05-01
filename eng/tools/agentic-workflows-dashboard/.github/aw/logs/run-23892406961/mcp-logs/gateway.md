<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.11
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 37926.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get details of GitHub Actions resources (workflows, workflow runs, jobs, and artifacts)"},"description":"Get details about specific GitHub Actions resources.\nUse this tool to get details about individual workflows, workflow runs, jobs, and artifacts by their unique IDs.\n","inputSchema":{"properties":{"method":{"description":"The method to execute","enum":["get_workflow","get_workflow_run","get_workflow_job","download_w...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-js"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":108311273,\"name\":\"azure-sdk-for-js\",\"full_name\":\"Azure/azure-sdk-for-js\",\"description\":\"This repository is for active development of the Azure SDK for JavaScript (NodeJS \\u0026 Browser). For consumers of the SDK we recommend visiting our public developer docs at https://docs.microsoft.com/javascript/azure/ or our versioned developer docs at https://azure.github.i...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":37926,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/playwright/arm-playwright/CHANGELOG.md\",\"status\":\"modified\",\"additions\":19,\"changes\":19,\"patch\":\"@@ -1,4 +1,23 @@\\n # Release History\\n+\\n+## 1.1.0-beta.1 (2026-04-06)\\n+Compared with version 1.0.0\\n+\\n+### Features Added\\n+  - Added Interface ManagedServiceIdentity\\n+  - Added Interface UserAssignedIdentity\\n+  - Interface PlaywrightWorkspace has a new optional parameter identity\\n+  - Interface P...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37926,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37926,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":187,\"check_runs\":[{\"id\":69668836682,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23892406961/job/69668836682\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23892406961/job/69668836682\",\"started_at\":\"2026-04-02T08:53:32Z\"},{\"id\":69668789192,\"name\":\"conclusion\",\"status\":\"completed\",\"conclusion\":\"skipped\",\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","page":2,"pullNumber":37926,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":187,\"check_runs\":[{\"id\":69668715038,\"name\":\"detection\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23892406907/job/69668715038\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23892406907/job/69668715038\",\"started_at\":\"2026-04-02T08:52:27Z\",\"completed_at\":\"2026-04-02T08:52:26Z\"},{\"id\":69668715035,\"name...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":37926,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/playwright/arm-playwright/review/arm-playwright-node.api.md","ref":"refs/pull/37926/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/playwright/arm-playwright/review/arm-playwright-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-playwright\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type { Abort...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"success\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45457544237,\"node_id\":\"SC_kwDOBnSy6c8AAAAKlXsULQ\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"success\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23847189084\",\"description\":\"All checks passed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avatar_url\":\"https:...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/playwright/arm-playwright/CHANGELOG.md","ref":"refs/pull/37926/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/playwright/arm-playwright/package.json","ref":"refs/pull/37926/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/playwright/arm-playwright/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-playwright\",\n  \"version\": \"1.1.0-beta.1\",\n  \"description\": \"A generated SDK for PlaywrightManagementClient.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },\n...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/playwright/arm-playwright/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 1.1.0-beta.1 (2026-04-06)\nCompared with version 1.0.0\n\n### Features Added\n  - Added Interface ManagedServiceIdentity\n  - Added Interface UserAssignedIdentity\n  - Interface Playw...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37926,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"diff --git a/sdk/playwright/arm-playwright/CHANGELOG.md b/sdk/playwright/arm-playwright/CHANGELOG.md\nindex f610a3f5f028..adb4689ffe3d 100644\n--- a/sdk/playwright/arm-playwright/CHANGELOG.md\n+++ b/sdk/playwright/arm-playwright/CHANGELOG.md\n@@ -1,4 +1,23 @@\n # Release History\n+\n+## 1.1.0-beta.1 (2026-04-06)\n+Compared with version 1.0.0\n+\n+### Features Added\n+  - Added Interface ManagedServiceIdentity\n+  - Added Interface UserAssig...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/playwright/arm-playwright/src/api","ref":"refs/pull/37926/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/playwright/arm-playwright/review/arm-playwright-node.api.md","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":287,\"name\":\"index.ts\",\"path\":\"sdk/playwright/arm-playwright/src/api/index.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/playwright/arm-playwright/src/api/index.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/blob/[REDACTED]/sdk/playw...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/playwright/arm-playwright/review/arm-playwright-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-playwright\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport { AbortSigna...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/playwright/arm-playwright/src/api/playwrightManagementContext.ts","ref":"refs/pull/37926/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/playwright/arm-playwright/src/api/playwrightManagementContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions } from \"../models/models.js\";\nimpo...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_reviews","owner":"Azure","pullNumber":37926,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4043607602,\"state\":\"COMMENTED\",\"body\":\"## Pull request overview\\n\\nUpdates the `@azure/arm-playwright` management-plane SDK generated from the `2026-02-01-preview` swagger/TypeSpec configuration, including model/API surface updates and regenerated beta samples for JS/TS.\\n\\n**Changes:**\\n- Bumps package version to `1.1.0-beta.1` and refreshes generation metadata (new spec path + commit SHA).\\n- Adds new ARM resource mo...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37926","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37926,\"title\":\"[AutoPR @azure-arm-playwright]-generated-from-SDK Generation - JS-6092964\",\"body\":\"Configurations:  \\u0026#39;specification/loadtestservice/resource-manager/Microsoft.LoadTestService/playwright/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pi...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\nAll CI checks have passed. The PR is currently blocked pending required approvals from the requested reviewers.\n\n- ✅ CI checks: All checks passed (checkenforcer green as of 2026-04-01).\n- 🔄 **Pending approvals**: The PR requires sign-off from requested reviewers (`MaryGao`, `qiaozha`, `JialinHuang803`) before it can be merged.\n\n\u003c!-- mgmt-re...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_EKtWrfaA\",\"comment\":\"#aw_EKtWrfaA\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"No API design issues found. The `@azure/arm-playwright` v`1.1.0-beta.1` update looks clean:\n\n- **Versions consistent**: `package.json`, `playwrightManagementContext.ts` user-agent string, and `CHANGELOG.md` all reflect `1.1.0-beta.1`. No alpha versions anywhere.\n- **CHANGELOG**: Correctly compares with `1.0.0` (the prior stable release; no previous beta exists).\n- **New API surface**: `ManagedServiceIdentity`, `UserAssignedIdentity`, ...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
