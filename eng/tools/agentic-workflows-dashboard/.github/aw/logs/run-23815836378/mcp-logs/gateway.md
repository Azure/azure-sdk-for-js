<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.6
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37915","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37915,\"title\":\"[Projects] Add missing samples\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37915,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37915","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/ai/ai-projects/samples-dev/agents/tools/agentAzureFunction.ts\",\"status\":\"added\",\"additions\":95,\"changes\":95,\"patch\":\"@@ -0,0 +1,95 @@\\n+// Copyright (c) Microsoft Corporation.\\n+// Licensed under the MIT License.\\n+\\n+/**\\n+ * This sample demonstrates how to create an AI agent with Azure Function capabilities\\n+ * using the AzureFunctionTool. The agent can call an Azure Function via Storage Queue\\n+ *...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37915,\"title\":\"[Projects] Add missing samples\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37915,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37915","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37915,\"title\":\"[Projects] Add missing samples\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37915,\"title\":\"[Projects] Add missing samples\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37915","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37915,\"title\":\"[Projects] Add missing samples\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37915","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37915,\"title\":\"[Projects] Add missing samples\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37915,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":63,\"check_runs\":[{\"id\":69415425782,\"name\":\"js - pullrequest (Build UnitTest windows_20x_browser)\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/69415425782\",\"details_url\":\"https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6088536\",\"started_at\":\"2026-03-31T19:38:57Z\"},{\"id\":69415424589,\"name\":\"js - pullrequest (Build Un...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37915","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37915,\"title\":\"[Projects] Add missing samples\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37915","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37915,\"title\":\"[Projects] Add missing samples\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37915,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"diff --git a/sdk/ai/ai-projects/samples-dev/agents/tools/agentAzureFunction.ts b/sdk/ai/ai-projects/samples-dev/agents/tools/agentAzureFunction.ts\nnew file mode 100644\nindex 000000000000..e0720d9a359a\n--- /dev/null\n+++ b/sdk/ai/ai-projects/samples-dev/agents/tools/agentAzureFunction.ts\n@@ -0,0 +1,95 @@\n+// Copyright (c) Microsoft Corporation.\n+// Licensed under the MIT License.\n+\n+/**\n+ * This sample demonstrates how to create an ...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/samples/v2/typescript/README.md","ref":"refs/pull/37915/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/samples/v2/typescript/README.md","mimeType":"text/plain; charset=utf-8","text":"---\npage_type: sample\nlanguages:\n  - typescript\nproducts:\n  - azure\nurlFragment: ai-projects-typescript\n---\n\n# Azure AI Projects client library samples for TypeScript\n\nThese sample program...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/samples/v2/javascript/README.md","ref":"refs/pull/37915/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/samples/v2/javascript/README.md","mimeType":"text/plain; charset=utf-8","text":"---\npage_type: sample\nlanguages:\n  - javascript\nproducts:\n  - azure\nurlFragment: ai-projects-javascript\n---\n\n# Azure AI Projects client library samples for JavaScript\n\nThese sample program...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Broken link** — This PR adds an entry for `memories/memoryAdvanced.ts` that points to `samples/v2/typescript/src/memories/memoryAdvanced.ts`, but that file **does not exist** in the repository. The source file `samples-dev/memories/memoryAdvanced.ts` exists, but was never compiled into `samples/v2/typescript/src/memories/`. The JavaScript equivalent (`samples/v2/javascript/memories/memoryAdvanced.js`) was correctly added in this ...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Missing env vars** — The new `agentAzureFunction` sample (both `.ts` and `.js`) reads three environment variables that are **absent from `sample.env`**:\n\n```\nSTORAGE_INPUT_QUEUE_NAME=\"\u003cstorage input queue name\u003e\"\nSTORAGE_OUTPUT_QUEUE_NAME=\"\u003cstorage output queue name\u003e\"\nSTORAGE_QUEUE_SERVICE_ENDPOINT=\"\u003cstorage queue service endpoint\u003e\"\n```\n\nWithout these, users following the sample will get...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":4,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Missing env vars** — The new `agentWebSearchCustomSearch` sample (both `.ts` and `.js`) reads two environment variables that are **absent from `sample.env`**:\n\n```\nBING_CUSTOM_SEARCH_PROJECT_CONNECTION_ID=\"\u003cbing custom search project connection id\u003e\"\nBING_CUSTOM_SEARCH_INSTANCE_NAME=\"\u003cbing custom search instance name\u003e\"\n```\n\nUsers who try to run this sample will not know these variables need to be con...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":5,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"3 documentation issues found (1 medium broken link, 2 medium missing env var entries):\n\n1. **TypeScript README broken link** — The README now references `memories/memoryAdvanced.ts` but `samples/v2/typescript/src/memories/memoryAdvanced.ts` does not exist (only the JS equivalent was added). This will produce a dead link in the published documentation.\n\n2. **`agentAzureFunction` env vars missing from `sample.env`** — `STORAGE_INPUT...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":6,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
