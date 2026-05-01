<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.11
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 37853.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get details of GitHub Actions resources (workflows, workflow runs, jobs, and artifacts)"},"description":"Get details about specific GitHub Actions resources.\nUse this tool to get details about individual workflows, workflow runs, jobs, and artifacts by their unique IDs.\n","inputSchema":{"properties":{"method":{"description":"The method to execute","enum":["get_workflow","get_workflow_run","get_workflow_job","download_w...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [safeoutputs github]
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37853,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37853,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"additions\":15,\"deletions\":12,\"changes\":27,\"patch\":\"@@ -4325,24 +4325,27 @@ importers:\\n \\n   sdk/cognitiveservices/arm-cognitiveservices:\\n     dependencies:\\n+      '@azure-rest/core-client':\\n+        specifier: ^2.3.1\\n+        version: link:../../core/core-client-rest\\n       '@azure/abort-controller':\\n         specifier: ^2.1.2\\n         version: link:../../c...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37853,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":65,\"check_runs\":[{\"id\":69637242021,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23882079048/job/69637242021\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23882079048/job/69637242021\",\"started_at\":\"2026-04-02T03:20:20Z\"},{\"id\":69637214612,\"name\":\"conclusion\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":37853,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cognitiveservices/arm-cognitiveservices/package.json","ref":"refs/pull/37853/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cognitiveservices/arm-cognitiveservices/CHANGELOG.md","ref":"refs/pull/37853/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cognitiveservices/arm-cognitiveservices/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-cognitiveservices\",\n  \"version\": \"9.0.0-beta.1\",\n  \"description\": \"A generated SDK for CognitiveServicesManagementClient.\",\n  \"engines\": {\n    \"node\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cognitiveservices/arm-cognitiveservices/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 9.0.0-beta.1 (2026-03-31)\nCompared with version 8.1.0\n\n### Features Added\n  - Added operation group AgentApplicationsOperations\n  - Added operation group AgentDeplo...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"pending\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45384324449,\"node_id\":\"SC_kwDOBnSy6c8AAAAKkR3VYQ\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"pending\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23778914648\",\"description\":\"Waiting for all checks to succeed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avata...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cognitiveservices/arm-cognitiveservices/review/arm-cognitiveservices-node.api.md","ref":"refs/pull/37853/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cognitiveservices/arm-cognitiveservices/review/arm-cognitiveservices-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-cognitiveservices\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cognitiveservices/arm-cognitiveservices/src/api","ref":"refs/pull/37853/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"accountCapabilityHosts\",\"path\":\"sdk/cognitiveservices/arm-cognitiveservices/src/api/accountCapabilityHosts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/cognitiveservices/arm-cognitiveservices/src/api/accountCapabilityHosts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/trees/[REDACTED]\",\"html_url\":\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cognitiveservices/arm-cognitiveservices/src/api/cognitiveServicesManagementContext.ts","ref":"refs/pull/37853/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cognitiveservices/arm-cognitiveservices/src/api/cognitiveServicesManagementContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions } from \"../mode...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/cognitiveservices/arm-cognitiveservices/review/arm-cognitiveservices-node.api.md","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/cognitiveservices/arm-cognitiveservices/review/arm-cognitiveservices-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-cognitiveservices\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","page":2,"perPage":100,"pullNumber":37853,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":65,\"check_runs\":[]}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_comments","owner":"Azure","pullNumber":37853,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4141180760,\"body\":\"/check-enforcer override\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/pull/37853#issuecomment-4141180760\",\"user\":{\"login\":\"v-jiaodi\",\"id\":80496810,\"profile_url\":\"https://github.com/v-jiaodi\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/80496810?v=4\"},\"author_association\":\"MEMBER\",\"reactions\":{\"total_count\":0,\"+1\":0,\"-1\":0,\"laugh\":0,\"confused\":0,\"heart\":...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37853","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37853,\"title\":\"[AutoPR @azure-arm-cognitiveservices]-generated-from-SDK Generation - JS-6069558\",\"body\":\"Configurations:  \\u0026#39;specification/cognitiveservices/CognitiveServices.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-01-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: http...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- ❌ **UnitTest**: CI failing due to missing test recordings. Action: Follow the [test recording guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md#run-tests-in-record-mode) to update recordings, or use `describe.skip` to skip tests (requires maintainer approval).\n- ❌ **checkenforcer**: Still p...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_8anoPg9A\",\"comment\":\"#aw_8anoPg9A\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `review/arm-cognitiveservices-node.api.md:258`\n\n`_UsageListResult` is used as the return type of `AccountsOperations.listUsages` but is not exported from the entry point `index.d.ts` (API Extractor warning: `ae-forgotten-export`).\n\nThe underscore prefix indicates this type is internal, but since it appears in the public API surface, it must be exported with a proper public name.\n\n**Fix:** Export `UsageListRes...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `review/arm-cognitiveservices-node.api.md:2484`\n\n`_OutboundRuleListResult` is used as the return type of `OutboundRulesOperations.post` but is not exported from the entry point `index.d.ts` (API Extractor warning: `ae-forgotten-export`).\n\nThe underscore prefix indicates this type is internal, but since it appears in the public API surface, it must be exported with a proper public name.\n\n**Fix:** Export `Outbo...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"2 tool issues found in `@azure/arm-cognitiveservices` (first TypeSpec migration, v9.0.0-beta.1): both are `ae-forgotten-export` warnings — `_UsageListResult` and `_OutboundRuleListResult` are used as public return types but not exported from the package entry point. These should be exported with proper public names (without `_` prefix) or fixed in the generation tooling.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `push_repo_memory`
  
  ```json
  {"params":{"arguments":{},"name":"push_repo_memory"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"message\":\"Memory validation passed: 2 file(s), 1 KB total (limit: 12 KB with 20% overhead).\"}","type":"text"}]}}
  ```
