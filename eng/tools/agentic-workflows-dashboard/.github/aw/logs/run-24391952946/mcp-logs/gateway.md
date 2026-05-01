<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 38137.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38137,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":38137,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":1,\"deletions\":1,\"changes\":2,\"patch\":\"@@ -471,7 +471,7 @@\\n # PRLabel: %Mgmt\\n /sdk/containerservice/arm-containerservice-rest/ @qiaozha @MaryGao @JialinHuang803\\n \\n-# PRLabel: %Mgmt\\n+# PRLabel: %Mgmt %mgmt-review-needed\\n /sdk/cosmosdb/arm-cosmosdb/ @qiaozha @MaryGao @JialinHuang803\\n \\n # PRLabel: %Mgmt\"},{\"filename\":\"pnpm-lock.yaml\",\"status\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cosmosdb/arm-cosmosdb/package.json","ref":"refs/pull/38137/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cosmosdb/arm-cosmosdb/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-cosmosdb\",\n  \"version\": \"17.0.0-beta.3\",\n  \"description\": \"A generated SDK for CosmosDBManagementClient.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },\n  \"sid...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cosmosdb/arm-cosmosdb/CHANGELOG.md","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cosmosdb/arm-cosmosdb/package.json","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cosmosdb/arm-cosmosdb/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-cosmosdb\",\n  \"sdk-type\": \"mgmt\",\n  \"author\": \"Microsoft Corporation\",\n  \"description\": \"A generated SDK for CosmosDBManagementClient.\",\n  \"version\": \"17.0.0-beta.2...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cosmosdb/arm-cosmosdb/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 17.0.0-beta.2 (2025-11-18)\nCompared with version 16.4.0\n\n### Features Added\n  - Added operation group ChaosFault\n  - Added operation group CopyJobs\n  - Added operation group DataTra...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cosmosdb/arm-cosmosdb/metadata.json","ref":"refs/pull/38137/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cosmosdb/arm-cosmosdb/review/arm-cosmosdb-node.api.md","ref":"refs/pull/38137/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cosmosdb/arm-cosmosdb/metadata.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"apiVersions\": {\n    \"Microsoft.DocumentDB\": \"2025-11-01-preview\"\n  },\n  \"emitterVersion\": \"0.52.1\",\n  \"crossLanguageDefinitions\": {\n    \"CrossLanguagePackageId\": \"Microsoft.DocumentDB\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cosmosdb/arm-cosmosdb/review/arm-cosmosdb-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-cosmosdb\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type { AbortSignalLi...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cosmosdb/arm-cosmosdb/_meta.json","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cosmosdb/arm-cosmosdb/_meta.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"commit\": \"[REDACTED]\",\n  \"readme\": \"specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/readme.md\",\n  \"autorest_command\": \"autorest --version=3.9.7 --typescript --modelerfou...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cosmosdb/arm-cosmosdb/src/cosmosDBManagementClient.ts","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cosmosdb/arm-cosmosdb/src/cosmosDBManagementClient.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\n// Code generated by Microsoft (R) AutoRest Code Generator.\n// Changes may cause incorrect behavior and will be ...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":38137,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":122,\"check_runs\":[{\"id\":71243374162,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24391952946/job/71243374162\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24391952946/job/71243374162\",\"started_at\":\"2026-04-14T10:06:54Z\"},{\"id\":71240898938,\"name\":\"license/cla\",\"status\":\"completed\",\"conclusion\":\"success\",...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":38137,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"pending\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45985973294,\"node_id\":\"SC_kwDOBnSy6c8AAAAKtPpELg\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"pending\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24392094678\",\"description\":\"Waiting for all checks to succeed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avata...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `CHANGELOG.md:4`\n`Compared with version 16.4.0`\n\nThis entry should compare with the immediately preceding published version `17.0.0-beta.2`, not `16.4.0`. The package was already at `17.0.0-beta.2` on the main branch before this PR. Skipping the comparison base to an older stable version suggests the generation tool did not detect the existing beta version.\n\n**Fix:** Update `CHANGELOG.md` to say `Compared with...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `metadata.json:3`\n`\"Microsoft.DocumentDB\": \"2025-11-01-preview\"`\n\nThe api-version `2025-11-01-preview` introduced in this PR is the **same** as the one already present in the package (`17.0.0-beta.2` on main also used `2025-11-01-preview`). The api-version must be strictly newer than the one already present.\n\n**Fix:** Regenerate from a spec commit that targets a newer api-version, or confirm with the servi...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"2 tool issues found in `@azure/arm-cosmosdb` `17.0.0-beta.3`:\n\n1. **CHANGELOG comparison base** — `CHANGELOG.md` compares `17.0.0-beta.3` against `16.4.0` instead of the immediately preceding `17.0.0-beta.2`. The generation tool did not detect the existing beta on main.\n2. **Same api-version** — The api-version `2025-11-01-preview` introduced in this PR is identical to the one already in `17.0.0-beta.2`. Per guidelines, the api-ver...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- ⏳ checkenforcer: still running (waiting for all checks to complete).\n- 🔴 Draft PR: This PR is currently in **draft** state. Mark it as ready for review once issues are resolved.\n\n\u003e **Note:** All ADO CI checks (`js - pullrequest`, Build, UnitTest) have **passed**. The two blocking items from the API review above (CHANGELOG comparison base an...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_GbR00OOG\",\"comment\":\"#aw_GbR00OOG\"}","type":"text"}]}}
  ```
