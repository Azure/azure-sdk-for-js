<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.11
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [safeoutputs github]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get details of GitHub Actions resources (workflows, workflow runs, jobs, and artifacts)"},"description":"Get details about specific GitHub Actions resources.\nUse this tool to get details about individual workflows, workflow runs, jobs, and artifacts by their unique IDs.\n","inputSchema":{"properties":{"method":{"description":"The method to execute","enum":["get_workflow","get_workflow_run","get_workflow_job","download_w...`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 37932.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37932,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37932,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":37932,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"pending\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45484741733,\"node_id\":\"SC_kwDOBnSy6c8AAAAKlxoUZQ\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"pending\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23869060323\",\"description\":\"Waiting for all checks to succeed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avata...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"additions\":40,\"deletions\":460,\"changes\":500,\"patch\":\"@@ -18884,24 +18884,27 @@ importers:\\n \\n   sdk/managednetworkfabric/arm-managednetworkfabric:\\n     dependencies:\\n+      '@azure-rest/core-client':\\n+        specifier: ^2.3.1\\n+        version: link:../../core/core-client-rest\\n       '@azure/abort-controller':\\n         specifier: ^2.1.2\\n         version: li...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37932,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":128,\"check_runs\":[{\"id\":69812049231,\"name\":\"conclusion\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23935822313/job/69812049231\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23935822313/job/69812049231\",\"started_at\":\"2026-04-03T05:57:34Z\",\"completed_at\":\"2026-04-03T05:57:34Z\"},{\"id\":69811997506,\"nam...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","repo":"azure-sdk-for-js","workflow_runs_filter":{"branch":"sdkauto/@azure-arm-managednetworkfabric-6094861"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/CHANGELOG.md","ref":"refs/pull/37932/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/package.json","ref":"refs/pull/37932/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-managednetworkfabric\",\n  \"version\": \"2.0.0\",\n  \"description\": \"A generated SDK for AzureNetworkFabricManagementServiceAPI.\",\n  \"engines\": {\n    ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.0.0 (2026-04-01)\n\n### Features Added\n  - Added operation group NetworkBootstrapDevicesOperations\n  - Added operation group NetworkBootstrapInterfacesOperatio...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":24,\"workflow_runs\":[{\"id\":23935824320,\"name\":\"GitHub Event Processor\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFkq-xwA\",\"head_branch\":\"sdkauto/@azure-arm-managednetworkfabric-6094861\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/event-processor.yml\",\"run_number\":121900,\"run_attempt\":1,\"event\":\"pull_request_target\",\"display_title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Gener...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-node.api.md","ref":"refs/pull/37932/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-managednetworkfabric\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extracto...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-models-node.api.md","ref":"refs/pull/37932/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-models-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-managednetworkfabric\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-e...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src/managedNetworkFabricContext.ts","ref":"refs/pull/37932/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"Failed to get file contents. The path does not point to a file or directory, or the file does not exist in the repository.","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src","ref":"refs/pull/37932/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"api\",\"path\":\"sdk/managednetworkfabric/arm-managednetworkfabric/src/api\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/managednetworkfabric/arm-managednetworkfabric/src/api?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/trees/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/tree/[REDAC...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src/azureNetworkFabricManagementServiceAPI.ts","ref":"refs/pull/37932/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/src/azureNetworkFabricManagementServiceAPI.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type {\n  AzureNetworkFabricManagementServiceAPIContext,\n  AzureNet...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src/api/azureNetworkFabricManagementServiceAPIContext.ts","ref":"refs/pull/37932/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/src/api/azureNetworkFabricManagementServiceAPIContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/package.json","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/CHANGELOG.md","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-managednetworkfabric\",\n  \"sdk-type\": \"mgmt\",\n  \"author\": \"Microsoft Corporation\",\n  \"description\": \"A generated SDK for AzureNetworkFabricManage...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 1.0.2 (Unreleased)\n\n### Features Added\n\n### Breaking Changes\n\n### Bugs Fixed\n\n### Other Changes\n\n## 1.0.1 (2025-08-22)\n\n### Other Changes\n\n  - Other ...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","page":3,"perPage":100,"pullNumber":37932,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":128,\"check_runs\":[]}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_comments","owner":"Azure","pullNumber":37932,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4172726418,\"body\":\"## API Change Check\\r\\n\\r\\nAPIView identified API level changes in this PR and created the following API reviews\\r\\n\\r\\n[@azure/arm-managednetworkfabric](https://spa.apiview.dev/review/[REDACTED]?activeApiRevisionId=[REDACTED])\\r\\n\\u003c!-- Fetch URI: https://apiview.dev/api/pullrequests?pullRequestNumber=37932\\u0026repoName=Azure/azure-sdk-for-js\\u0026commitSHA=[REDACTED] --\\u003e\",\"html_url\"...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37932","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37932,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094861\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2025-07-15, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39;...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- 🔄 **pnpm-lock conflict**: The PR has a merge conflict in `pnpm-lock.yaml` (`mergeable_state: dirty`). Follow the [conflict guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/resolve-pnpm-lock-merge-conflict.md) to resolve this before CI can run.\n\n\u003c!-- mgmt-review-assistant --\u003e\n","item_number":"37932"},"name":"add_co...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `CHANGELOG.md:871`\n\nThe CHANGELOG is missing the previously-released version entries. The current `main` branch CHANGELOG includes:\n```\n## 1.0.2 (Unreleased)\n## 1.0.1 (2025-08-22)\n```\nBoth entries are absent from this PR — only `2.0.0` and `1.0.0` appear. The generation tool appears to have overwritten the existing CHANGELOG without preserving historical entries.\n\n**Fix:** Restore the missing `1.0.1 (202...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_zSiDufF3\",\"comment\":\"#aw_zSiDufF3\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"1 tool issue found in `@azure/arm-managednetworkfabric` 2.0.0 (TypeSpec migration from Swagger-based 1.0.x). The public API surface looks clean — no naming clashes, no `unknown` return types, no alpha versions, and version consistency checks pass across `package.json`, `CHANGELOG.md`, and the context file. One tool issue was identified in the CHANGELOG.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\u003c/summary\u003...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
