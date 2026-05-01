<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.4
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_pull_request_review_comment","description":"Create a review comment on a specific line of code in a pull request. Use this for inline code review feedback, suggestions, or questions about specific code changes. For general PR comments not tied to specific lines, use add_comment instead. When the workflow is configured with `target: \"*\"`, you must specify `pull_request_number` to indicate which PR to target. CONSTRAINTS: Maximum 10 review comment(s...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37650","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37650,\"title\":\"feat(search-documents): implement Beta Activation pattern for preview surface isolation\",\"body\":\"## Summary\\n\\nThis PR implements the **Beta Activation** pattern for `@azure/search-documents`, providing type-safe isolation of preview API surface behind an `enableBeta()` method. This is a proof-of-concept for a general approach that can be applied across all Azure SDK TypeScript client libraries.\\n\\n## T...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37650,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37650","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37650,\"title\":\"feat(search-documents): implement Beta Activation pattern for preview surface isolation\",\"body\":\"## Summary\\n\\nThis PR implements the **Beta Activation** pattern for `@azure/search-documents`, providing type-safe isolation of preview API surface behind an `enableBeta()` method. This is a proof-of-concept for a general approach that can be applied across all Azure SDK TypeScript client libraries.\\n\\n## T...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37650,\"title\":\"feat(search-documents): implement Beta Activation pattern for preview surface isolation\",\"body\":\"## Summary\\n\\nThis PR implements the **Beta Activation** pattern for `@azure/search-documents`, providing type-safe isolation of preview API surface behind an `enableBeta()` method. This is a proof-of-concept for a general approach that can be applied across all Azure SDK TypeScript client libraries.\\n\\n## T...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37650,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37650","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/search/search-documents/package.json\",\"status\":\"modified\",\"additions\":18,\"changes\":18,\"patch\":\"@@ -127,6 +127,24 @@\\n         \\\"default\\\": \\\"./dist/commonjs/index.js\\\"\\n       }\\n     },\\n+    \\\"./beta\\\": {\\n+      \\\"browser\\\": {\\n+        \\\"types\\\": \\\"./dist/browser/beta/index.d.ts\\\",\\n+        \\\"default\\\": \\\"./dist/browser/beta/index.js\\\"\\n+      },\\n+      \\\"reac...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37650,\"title\":\"feat(search-documents): implement Beta Activation pattern for preview surface isolation\",\"body\":\"## Summary\\n\\nThis PR implements the **Beta Activation** pattern for `@azure/search-documents`, providing type-safe isolation of preview API surface behind an `enableBeta()` method. This is a proof-of-concept for a general approach that can be applied across all Azure SDK TypeScript client libraries.\\n\\n## T...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37650","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37650,\"title\":\"feat(search-documents): implement Beta Activation pattern for preview surface isolation\",\"body\":\"## Summary\\n\\nThis PR implements the **Beta Activation** pattern for `@azure/search-documents`, providing type-safe isolation of preview API surface behind an `enableBeta()` method. This is a proof-of-concept for a general approach that can be applied across all Azure SDK TypeScript client libraries.\\n\\n## T...`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","per_page":5,"repo":"azure-sdk-for-js","workflow_runs_filter":{"status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":299793,\"workflow_runs\":[{\"id\":22276391602,\"name\":\"GitHub Scheduled Event Processor\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFL8bCsg\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/scheduled-event-processor.yml\",\"run_number\":18271,\"run_attempt\":1,\"event\":\"schedule\",\"display_title\":\"GitHub Scheduled Event Processor\",\"status\":\"completed\",\"conclusion\":\"success\",\"workflo...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37650","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37650,\"title\":\"feat(search-documents): implement Beta Activation pattern for preview surface isolation\",\"body\":\"## Summary\\n\\nThis PR implements the **Beta Activation** pattern for `@azure/search-documents`, providing type-safe isolation of preview API surface behind an `enableBeta()` method. This is a proof-of-concept for a general approach that can be applied across all Azure SDK TypeScript client libraries.\\n\\n## T...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37650,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/search/search-documents/review/search-documents-beta-node.api.md","ref":"refs/pull/37650/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/search/search-documents/review/search-documents-node.api.md","ref":"refs/pull/37650/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/search/search-documents/review/search-documents-beta-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/search-documents\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/search/search-documents/review/search-documents-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/search-documents\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport { AzureKey...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":377,\"check_runs\":[{\"id\":68620159797,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23566754696/job/68620159797\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23566754696/job/68620159797\",\"started_at\":\"2026-03-25T22:14:20Z\"},{\"id\":68620080994,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"success\",\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37650","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37650,\"title\":\"feat(search-documents): implement Beta Activation pattern for preview surface isolation\",\"body\":\"## Summary\\n\\nThis PR implements the **Beta Activation** pattern for `@azure/search-documents`, providing type-safe isolation of preview API surface behind an `enableBeta()` method. This is a proof-of-concept for a general approach that can be applied across all Azure SDK TypeScript client libraries.\\n\\n## T...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/search/search-documents/src/beta/index.ts","ref":"refs/pull/37650/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/search/search-documents/src/serviceModels.ts","ref":"refs/pull/37650/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/search/search-documents/src/searchIndexClient.ts","ref":"refs/pull/37650/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/search/search-documents/src/beta/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nexport type {\n  SearchIndexClientBetaOperations,\n  SearchIndexClientWithBeta,\n} from \"../searchIndexClient.js\";\n\nexpor...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/search/search-documents/src/searchIndexClient.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\n/// \u003creference lib=\"esnext.asynciterable\" /\u003e\n\nimport type { KeyCredential, TokenCredential } from \"@azu...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/search/search-documents/src/serviceModels.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { OperationOptions } from \"@azure-rest/core-client\";\nimport type { PagedAsyncIterableIterator } from \"./st...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37650","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37650,\"title\":\"feat(search-documents): implement Beta Activation pattern for preview surface isolation\",\"body\":\"## Summary\\n\\nThis PR implements the **Beta Activation** pattern for `@azure/search-documents`, providing type-safe isolation of preview API surface behind an `enableBeta()` method. This is a proof-of-concept for a general approach that can be applied across all Azure SDK TypeScript client libraries.\\n\\n## T...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37650,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"diff --git a/sdk/search/search-documents/package.json b/sdk/search/search-documents/package.json\nindex f1521d832d81..58928f996647 100644\n--- a/sdk/search/search-documents/package.json\n+++ b/sdk/search/search-documents/package.json\n@@ -127,6 +127,24 @@\n         \"default\": \"./dist/commonjs/index.js\"\n       }\n     },\n+    \"./beta\": {\n+      \"browser\": {\n+        \"types\": \"./dist/browser/beta/index.d.ts\",\n+        \"defau...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/search/search-documents/src/index.ts","ref":"refs/pull/37650/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/search/search-documents/src/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nexport { AzureKeyCredential } from \"@azure/core-auth\";\nexport {\n  type AutocompleteItem,\n  type AutocompleteMode,\n  type Aut...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/search/search-documents/review/search-documents-node.api.md","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/search/search-documents/review/search-documents-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/search-documents\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport { AzureKey...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Breaking Change** — 14+ `@public` methods removed from `SearchIndexClient` and replaced by `enableBeta()`.\n\nThe following methods were `// @public` (no `@beta` tag) in the prior API surface and are now only reachable after calling `enableBeta()`:\n\n```\ncreateAlias, createOrUpdateAlias, deleteAlias (×2), getAlias, listAliases,\ncreateKnowledgeBase, createOrUpdateKnowledgeBase, getKnowledgeBase,\nlistKnowledgeBases, deleteKnow...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Breaking Change** — `SearchIndex` interface loses two `@public` fields.\n\n`permissionFilterOption?: SearchIndexPermissionFilterOption` and `purviewEnabled?: boolean` were present on `SearchIndex` in the prior stable API and are now removed. Any code that reads those properties from a `SearchIndex` object will fail to compile.\n\nThis is a structural breaking change on a widely-used type.\n\n**Fix:** Either keep these fields on `...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":4,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Medium — `enableBeta()` mutates `readonly` properties via unsafe double casts.**\n\n```ts\n(this as { serviceVersion: string }).serviceVersion = previewServiceVersion;\n(this as { apiVersion: string }).apiVersion = previewServiceVersion;\nthis.client[\"_client\"].apiVersion = previewServiceVersion;\n```\n\n`serviceVersion` and `apiVersion` are declared `readonly` on the class. The cast `this as { serviceVersion: string }` strips ...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Medium — `ae-forgotten-export`** — `SearchIndexClientWithBeta` is the return type of the public `enableBeta()` method but is not exported from the package's main entry point (`src/index.ts`).\n\nThe API Extractor warning here is a real usability problem. Consumers who want to annotate a variable:\n\n```ts\nimport type { SearchIndexClientWithBeta } from \"@azure/search-documents\"; // ❌ doesn't exist\n\nconst betaClient: Searc...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":5,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":6,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Medium — `SearchIndexClientBetaOperations` mixes stable GA operations with preview-only ones.**\n\nThe interface bundles alias management (`createAlias`, `createOrUpdateAlias`, `deleteAlias`, `getAlias`, `listAliases`) alongside preview-only operations (`createKnowledgeBase`, etc.). Alias management is a GA feature with no `@beta` tag; it does not belong in a \"beta operations\" interface.\n\nThis creates a misleading API: a cons...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":7,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"**API Design Review — 2 critical issues, 3 medium issues found.**\n\nThis PR introduces an interesting \"Beta Activation\" pattern but the current implementation has significant API design problems that must be addressed before merge.\n\n**Critical (breaking changes):**\n1. **14+ `@public` methods removed from `SearchIndexClient`** — `createAlias`, `listAliases`, `createKnowledgeBase`, `getIndexStatsSummary`, and many more were GA-sta...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":8,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
