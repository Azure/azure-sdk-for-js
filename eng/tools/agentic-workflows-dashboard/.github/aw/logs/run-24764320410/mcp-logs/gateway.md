<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 38114.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38114,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":38114,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":1,\"deletions\":1,\"changes\":2,\"patch\":\"@@ -393,7 +393,7 @@\\n # PRLabel: %Mgmt\\n /sdk/azurestack/arm-azurestack/ @qiaozha @MaryGao @JialinHuang803\\n \\n-# PRLabel: %Mgmt\\n+# PRLabel: %Mgmt %mgmt-review-needed\\n /sdk/azurestackhci/arm-azurestackhci/ @qiaozha @MaryGao @JialinHuang803\\n \\n # PRLabel: %Mgmt\"},{\"filename\":\"sdk/azurestackhci/arm-azurestackh...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":38114,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":186,\"check_runs\":[{\"id\":72455027408,\"name\":\"license/cla\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/72455027408\",\"details_url\":\"https://github.com/apps/microsoft-github-policy-service\",\"started_at\":\"2026-04-22T06:45:43Z\",\"completed_at\":\"2026-04-22T06:45:43Z\"},{\"id\":72454976179,\"name\":\"agent\",\"status\":\"in_progress\",\"html_ur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/azurestackhci/arm-azurestackhci/CHANGELOG.md","ref":"refs/pull/38114/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/azurestackhci/arm-azurestackhci/metadata.json","ref":"refs/pull/38114/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/azurestackhci/arm-azurestackhci/review/arm-azurestackhci-node.api.md","ref":"refs/pull/38114/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/azurestackhci/arm-azurestackhci/package.json","ref":"refs/pull/38114/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/azurestackhci/arm-azurestackhci/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-azurestackhci\",\n  \"version\": \"4.1.0-beta.1\",\n  \"description\": \"A generated SDK for AzureStackHCIClient.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/azurestackhci/arm-azurestackhci/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 4.1.0-beta.1 (2026-04-13)\nCompared with version 4.0.0\n\n### Features Added\n  - Added operation group ClusterJobsOperations\n  - Added operation group DevicePoolsOperations\n ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/azurestackhci/arm-azurestackhci/metadata.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"apiVersions\": {\n    \"Microsoft.AzureStackHCI\": \"2026-04-01-preview\"\n  },\n  \"emitterVersion\": \"0.52.1\",\n  \"crossLanguageDefinitions\": {\n    \"CrossLanguagePackageId\": \"Microsof...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/azurestackhci/arm-azurestackhci/review/arm-azurestackhci-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-azurestackhci\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport ...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/azurestackhci/arm-azurestackhci","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":59603,\"name\":\"CHANGELOG.md\",\"path\":\"sdk/azurestackhci/arm-azurestackhci/CHANGELOG.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/azurestackhci/arm-azurestackhci/CHANGELOG.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/blob/[REDACTED]...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/azurestackhci/arm-azurestackhci/metadata.json","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/azurestackhci/arm-azurestackhci/metadata.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"apiVersions\": {\n    \"Microsoft.AzureStackHCI\": \"2026-02-01\"\n  },\n  \"emitterVersion\": \"0.51.1\",\n  \"crossLanguageDefinitions\": {\n    \"CrossLanguagePackageId\": \"Microsoft.AzureS...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":38114,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"success\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45928298337,\"node_id\":\"SC_kwDOBnSy6c8AAAAKsYo3YQ\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"success\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24336701381\",\"description\":\"All checks passed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avatar_url\":\"https:...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/azurestackhci/arm-azurestackhci/src/api/azureStackHCIContext.ts","ref":"refs/pull/38114/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/azurestackhci/arm-azurestackhci/src/api/azureStackHCIContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions } from \"../models/models.js\";\nimpor...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/azurestackhci/arm-azurestackhci/review/arm-azurestackhci-node.api.md","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/azurestackhci/arm-azurestackhci/review/arm-azurestackhci-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-azurestackhci\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport ...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Design Issue** — Redundant `OperationGroup` in client property name\n\n`readonly updateSummariesOperationGroup: UpdateSummariesOperationGroupOperations;`\n\nThe client property `updateSummariesOperationGroup` contains the redundant suffix `OperationGroup` — all properties on a service client are already understood to be operation groups, so the suffix adds noise and is inconsistent with the rest of the client (e.g., `updateSumm...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"1 design issue found in this PR for `@azure/arm-azurestackhci@4.1.0-beta.1`. All tooling checks (CHANGELOG comparison base, API version progression, userAgent alignment, KnownVersions) are clean. The single finding is a redundant `OperationGroup` suffix in the new `updateSummariesOperationGroup` client property name, which needs to be addressed in the TypeSpec source before release.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structur...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `add_comment`
  
  ```json
  {"params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- ⏳ Required approvals: PR is awaiting reviews from assigned reviewers (`xirzec`, `jeremymeng`, `MaryGao`, `qiaozha`, `JialinHuang803`). All CI checks have passed (checkenforcer ✅).\n\n\u003c!-- mgmt-review-bot --\u003e\n","item_number":"38114"},"name":"add_comment"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_XM9o0IAJ\",\"comment\":\"#aw_XM9o0IAJ\"}","type":"text"}]}}
  ```
