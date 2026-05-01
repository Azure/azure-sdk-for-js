<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.11
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 37930.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37930,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":37930,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"additions\":21,\"deletions\":441,\"changes\":462,\"patch\":\"@@ -18890,24 +18890,27 @@ importers:\\n \\n   sdk/managednetworkfabric/arm-managednetworkfabric:\\n     dependencies:\\n+      '@azure-rest/core-client':\\n+        specifier: ^2.3.1\\n+        version: link:../../core/core-client-rest\\n       '@azure/abort-controller':\\n         specifier: ^2.1.2\\n         version: li...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37930,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":128,\"check_runs\":[{\"id\":69812001347,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23935818377/job/69812001347\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23935818377/job/69812001347\",\"started_at\":\"2026-04-03T05:56:58Z\"},{\"id\":69811989047,\"name\":\"conclusion\",\"status\":\"completed\",\"conclusion\":\"skipped\",\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":37930,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"pending\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45483827470,\"node_id\":\"SC_kwDOBnSy6c8AAAAKlwwhDg\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"pending\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23868324300\",\"description\":\"Waiting for all checks to succeed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avata...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/package.json","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/CHANGELOG.md","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/metadata.json","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-managednetworkfabric\",\n  \"version\": \"2.0.0-beta.1\",\n  \"description\": \"A generated SDK for AzureNetworkFabricManagementServiceAPI.\",\n  \"engines\": ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.0.0-beta.1 (2026-04-01)\nCompared with version 1.0.0\n\n### Features Added\n  - Added operation group NetworkMonitorsOperations\n  - Added operation AccessContro...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/metadata.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"apiVersions\": {\n    \"Microsoft.ManagedNetworkFabric\": \"2024-06-15-preview\"\n  },\n  \"emitterVersion\": \"0.51.1\",\n  \"crossLanguageDefinitions\": {\n    \"CrossLanguagePa...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-api-accessControlLists-node.api.md","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"api\",\"path\":\"sdk/managednetworkfabric/arm-managednetworkfabric/src/api\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/managednetworkfabric/arm-managednetworkfabric/src/api?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/trees/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/tree/[REDAC...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-api-accessControlLists-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-managednetworkfabric\"\n\n\u003e Do not edit this file. It is a report generated by [API Extracto...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src/azureNetworkFabricManagementServiceAPI.ts","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-api-networkFabrics-node.api.md","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/src/azureNetworkFabricManagementServiceAPI.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type {\n  AzureNetworkFabricManagementServiceAPIContext,\n  AzureNet...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-api-networkFabrics-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-managednetworkfabric\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](h...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src/api","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","repo":"azure-sdk-for-js","workflow_runs_filter":{"branch":"sdkauto/@azure-arm-managednetworkfabric-6094751","event":"pull_request"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"accessControlLists\",\"path\":\"sdk/managednetworkfabric/arm-managednetworkfabric/src/api/accessControlLists\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/managednetworkfabric/arm-managednetworkfabric/src/api/accessControlLists?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/trees/[REDACTED]\",\"html_url\":\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src/api/azureNetworkFabricManagementServiceAPIContext.ts","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/src/api/azureNetworkFabricManagementServiceAPIContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_comments","owner":"Azure","pullNumber":37930,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4172602343,\"body\":\"## API Change Check\\r\\n\\r\\nAPIView identified API level changes in this PR and created the following API reviews\\r\\n\\r\\n[@azure/arm-managednetworkfabric](https://spa.apiview.dev/review/[REDACTED]?activeApiRevisionId=[REDACTED])\\r\\n\\u003c!-- Fetch URI: https://apiview.dev/api/pullrequests?pullRequestNumber=37930\\u0026repoName=Azure/azure-sdk-for-js\\u0026commitSHA=[REDACTED] --\\u003e\",\"html_url\"...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","page":2,"perPage":50,"pullNumber":37930,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":128,\"check_runs\":[{\"id\":69811922510,\"name\":\"detection\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23935818398/job/69811922510\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23935818398/job/69811922510\",\"started_at\":\"2026-04-03T05:55:40Z\",\"completed_at\":\"2026-04-03T05:55:39Z\"},{\"id\":69811922472,\"name...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":".github/prompts","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":11929,\"name\":\"architecture-review-guidelines.md\",\"path\":\".github/prompts/architecture-review-guidelines.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/.github/prompts/architecture-review-guidelines.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","page":2,"perPage":100,"pullNumber":37930,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/managednetworkfabric/arm-managednetworkfabric/samples-dev/l2IsolationDomainsUpdateAdministrativeStateSample.ts\",\"status\":\"modified\",\"additions\":11,\"deletions\":21,\"changes\":32,\"patch\":\"@@ -1,33 +1,23 @@\\n // Copyright (c) Microsoft Corporation.\\n // Licensed under the MIT License.\\n \\n-/**\\n- * This sample demonstrates how to Enables isolation domain across the fabric or on specified racks.\\n- *\\n- *...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37930","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37930,\"title\":\"[AutoPR @azure-arm-managednetworkfabric]-generated-from-SDK Generation - JS-6094751\",\"body\":\"Configurations:  \\u0026#39;specification/managednetworkfabric/ManagedNetworkFabric.ResourceManager.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-06-15-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u00...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":4090,\"name\":\"arm-managednetworkfabric-api-accessControlLists-node.api.md\",\"path\":\"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-api-accessControlLists-node.api.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-api-accessControlLists-node.api...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-node.api.md","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-models-node.api.md","ref":"refs/pull/37930/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-models-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-managednetworkfabric\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-e...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-managednetworkfabric\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extracto...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/src","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":8147,\"name\":\"azureNetworkFabricManagementServiceAPI.ts\",\"path\":\"sdk/managednetworkfabric/arm-managednetworkfabric/src/azureNetworkFabricManagementServiceAPI.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/managednetworkfabric/arm-managednetworkfabric/src/azureNetworkFabricManagementServiceAPI.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/re...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":169482,\"name\":\"arm-managednetworkfabric-node.api.md\",\"path\":\"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-node.api.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-node.api.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azu...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-node.api.md","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/review/arm-managednetworkfabric-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-managednetworkfabric\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extracto...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/managednetworkfabric/arm-managednetworkfabric/package.json","ref":"main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/managednetworkfabric/arm-managednetworkfabric/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-managednetworkfabric\",\n  \"sdk-type\": \"mgmt\",\n  \"author\": \"Microsoft Corporation\",\n  \"description\": \"A generated SDK for AzureNetworkFabricManage...`
- 🔍 rpc **safeoutputs**→`tools/call` `add_comment`
  
  ```json
  {"params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- 🔄 **pnpm-lock conflict**: The PR has a merge conflict in `pnpm-lock.yaml` (`mergeable_state: dirty`). Follow the [conflict resolution guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/resolve-pnpm-lock-merge-conflict.md) to fix this issue.\n\n\u003c!-- mgmt-review-agent --\u003e","item_number":"37930"},"name":"add_comment"}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"No API design or tooling issues found for this TypeSpec migration of `@azure/arm-managednetworkfabric` (`2.0.0-beta.1`).\n\n**Checked:**\n- ✅ Version alignment: `package.json`, `src/api/azureNetworkFabricManagementServiceAPIContext.ts`, and `CHANGELOG.md` all consistently use `2.0.0-beta.1`\n- ✅ No alpha versions present\n- ✅ Client name unchanged (`AzureNetworkFabricManagementServiceAPI`)\n- ✅ Constructor parameters unchanged (`c...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_jUd8ZBWl\",\"comment\":\"#aw_jUd8ZBWl\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
