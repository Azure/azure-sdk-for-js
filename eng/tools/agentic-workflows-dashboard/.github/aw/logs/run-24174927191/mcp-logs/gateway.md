<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.14
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 38064.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38064,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":38064,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":38064,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"pending\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45778918917,\"node_id\":\"SC_kwDOBnSy6c8AAAAKqKLeBQ\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"pending\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24173089791\",\"description\":\"Waiting for all checks to succeed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avata...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"additions\":20,\"deletions\":449,\"changes\":469,\"patch\":\"@@ -33106,7 +33106,7 @@ packages:\\n     resolution: {integrity: sha1-ZbwrwdttAOFTuVrHAG9Fc+KJ6b4=}\\n \\n   '@colors/colors@1.5.0':\\n-    resolution: {integrity: sha512-ooWCrlZP11i8GImSjTHYHLkvFDP48nS4+204nGb1RiX/WXYHmJA2III9/e2DWVabCESdW7hBAEzHRqUn9OUVvQ==}\\n+    resolution: {integrity: sha1-u1BFecHK6SPmV2pPXaQ9Jfl729...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":38064,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":121,\"check_runs\":[{\"id\":70554264644,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24174927191/job/70554264644\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24174927191/job/70554264644\",\"started_at\":\"2026-04-09T05:56:38Z\"},{\"id\":70554256748,\"name\":\"license/cla\",\"status\":\"completed\",\"conclusion\":\"success\",...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","page":2,"perPage":100,"pullNumber":38064,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":121,\"check_runs\":[{\"id\":70554196702,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24174925133/job/70554196702\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24174925133/job/70554196702\",\"started_at\":\"2026-04-09T05:55:41Z\",\"completed_at\":\"2026-04-09T05:55:41Z\"},{\"id\":70554196675,\"nam...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38064","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38064,\"title\":\"[AutoPR @azure-arm-deviceregistry]-generated-from-SDK Generation - JS-6128532\",\"body\":\"Configurations:  \\u0026#39;specification/deviceregistry/DeviceRegistry.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.a...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/deviceregistry/arm-deviceregistry/CHANGELOG.md","ref":"refs/pull/38064/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/deviceregistry/arm-deviceregistry/package.json","ref":"refs/pull/38064/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/deviceregistry/arm-deviceregistry/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 1.2.0-beta.1 (2026-04-09)\nCompared with version 1.1.0\n\n### Features Added\n  - Added operation group CredentialsOperations\n  - Added operation group PoliciesOperations\n  ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/deviceregistry/arm-deviceregistry/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-deviceregistry\",\n  \"version\": \"1.2.0-beta.1\",\n  \"description\": \"A generated SDK for DeviceRegistryManagementClient.\",\n  \"engines\": {\n    \"node\": \"\u003e=...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/deviceregistry/arm-deviceregistry/review/arm-deviceregistry-node.api.md","ref":"refs/pull/38064/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/deviceregistry/arm-deviceregistry/review/arm-deviceregistry-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-deviceregistry\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimp...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/deviceregistry/arm-deviceregistry/src/api/deviceRegistryManagementContext.ts","ref":"refs/pull/38064/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/deviceregistry/arm-deviceregistry/src/api/deviceRegistryManagementContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions } from \"../models/models...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/deviceregistry/arm-deviceregistry/metadata.json","ref":"refs/pull/38064/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/deviceregistry/arm-deviceregistry/metadata.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"apiVersions\": {\n    \"Microsoft.DeviceRegistry\": \"2026-03-01-preview\"\n  },\n  \"emitterVersion\": \"0.52.0\",\n  \"crossLanguageDefinitions\": {\n    \"CrossLanguagePackageId\": \"Micro...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- ❌ **UnitTest (ubuntu_22x_node / windows_20x_node / macoslatest_24x_node)**: Missing test recordings — `RecorderError: Recording file path ... does not exist` for `deviceregistry_namespaced_resources_tests`, `deviceregistry_operations_test`, and `deviceregistry_rootlevel_resources_tests`. Action: Record new test recordings per the [test guide](https:...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Design Concern** — `review/arm-deviceregistry-node.api.md:547–550`\n\n```\ninterface Event_2 extends EventBase { ... }\nexport { Event_2 as Event }\n```\n\nThe type is exported as `Event`, which clashes with the well-known DOM built-in `Event`. API Extractor renames it to `Event_2` internally to avoid the collision, but the `_2` suffix leaks into the API report (e.g. `events?: Event_2[]` at lines 123 and 218). The guidelines ex...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_dQP2qeuT\",\"comment\":\"#aw_dQP2qeuT\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"1 design issue found in `@azure/arm-deviceregistry` 1.2.0-beta.1.\n\n- **Naming collision** (×1): `Event` exported type clashes with the DOM built-in `Event`; API Extractor renames it to `Event_2` internally, and the `_2` suffix leaks into the API report.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\u003c/summary\u003e\n\n```json\n{\"agent\":\"mgmt-reviewer\",\"pr\":38064,\"summary\":\"issues_found\",\"findings\":[{\...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
