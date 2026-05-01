<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.8
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_pull_request_review_comment","description":"Create a review comment on a specific line of code in a pull request. Use this for inline code review feedback, suggestions, or questions about specific code changes. For general PR comments not tied to specific lines, use add_comment instead. CONSTRAINTS: Maximum 10 review comment(s) can be created. Comments will be on the RIGHT side of the diff.","inputSchema":{"additionalProperties":false,"properties":{...`
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
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37792,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37792,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"additions\":22,\"deletions\":10,\"changes\":32,\"patch\":\"@@ -2205,18 +2205,21 @@ importers:\\n \\n   sdk/attestation/arm-attestation:\\n     dependencies:\\n+      '@azure-rest/core-client':\\n+        specifier: ^2.3.1\\n+        version: link:../../core/core-client-rest\\n       '@azure/core-auth':\\n         specifier: ^1.9.0\\n         version: link:../../core/core-auth\\n-  ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37792,\"title\":\"[AutoPR @azure-arm-attestation]-generated-from-SDK Generation - JS-6054094\",\"body\":\"Configurations:  \\u0026#39;specification/attestation/resource-manager/Microsoft.Attestation/Attestation/tspconfig.yaml\\u0026#39;, API Version: 2021-06-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: ht...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37792,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":59,\"check_runs\":[{\"id\":68829287150,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630714041/job/68829287150\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630714041/job/68829287150\",\"started_at\":\"2026-03-27T04:10:03Z\"},{\"id\":68829247325,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"success\",\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/attestation/arm-attestation/src/api","ref":"refs/pull/37792/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":2521,\"name\":\"attestationManagementContext.ts\",\"path\":\"sdk/attestation/arm-attestation/src/api/attestationManagementContext.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/attestation/arm-attestation/src/api/attestationManagementContext.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_u...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/attestation/arm-attestation/src/api/attestationManagementContext.ts","ref":"refs/pull/37792/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/attestation/arm-attestation/review/arm-attestation-node.api.md","ref":"refs/pull/37792/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/attestation/arm-attestation/src/api/attestationManagementContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions } from \"../models/models.js\";\ni...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/attestation/arm-attestation/review/arm-attestation-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-attestation\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type { C...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/attestation/arm-attestation/src/api/attestationManagementContext.ts","ref":"refs/pull/37792/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/attestation/arm-attestation/src/api/attestationManagementContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions } from \"../models/models.js\";\ni...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/attestation/arm-attestation/review/arm-attestation-node.api.md","ref":"refs/pull/37792/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/attestation/arm-attestation/review/arm-attestation-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-attestation\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type { C...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"No API design or tooling issues found for `@azure/arm-attestation` v3.0.0-beta.1. The package migrates from the legacy `@azure/core-client` stack to `@azure-rest/core-client`, adds the `PrivateLinkResources` operation group, new model types, and a `KnownVersions` enum. Version `3.0.0-beta.1` is consistent across `package.json`, `CHANGELOG.md`, and `src/api/attestationManagementContext.ts`. No alpha versions are present. No naming violatio...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
