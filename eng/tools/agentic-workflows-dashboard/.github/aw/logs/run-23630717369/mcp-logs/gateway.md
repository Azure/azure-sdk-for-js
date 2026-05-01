<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.8
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [safeoutputs github]
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37851,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37851,\"title\":\"[AutoPR @azure-ai-projects]-generated-from-SDK Generation - JS-6069137\",\"body\":\"Configurations:  \\u0026#39;specification/ai-foundry/data-plane/Foundry/tspconfig.yaml\\u0026#39;, API Version: v1, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/azure-sdk/internal/_build...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37851,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37851,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/ai/ai-projects/generated/aiProjectClient.ts\",\"status\":\"added\",\"additions\":62,\"changes\":62,\"patch\":\"@@ -0,0 +1,62 @@\\n+// Copyright (c) Microsoft Corporation.\\n+// Licensed under the MIT License.\\n+\\n+import { AIProjectContext, AIProjectClientOptionalParams, createAIProject } from \\\"./api/index.js\\\";\\n+import { AgentsOperations, _getAgentsOperations } from \\\"./classic/agents/index.js\\\";\\n+import...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":59,\"check_runs\":[{\"id\":68829292669,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630717369/job/68829292669\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630717369/job/68829292669\",\"started_at\":\"2026-03-27T04:10:04Z\"},{\"id\":68829243392,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"success\",\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/package.json","ref":"refs/pull/37851/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/CHANGELOG.md","ref":"refs/pull/37851/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.0.1 (2026-03-13)\n\n### Bugs Fixed\n\n- Fix polling for memory store update operations that cannot complete.\n\n## 2.0.0 (2026-03-06)\n\n### Breaking changes\n\n- change `RedTeam` property `ta...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/ai-projects\",\n  \"version\": \"2.0.1\",\n  \"description\": \"Azure AI Projects client library.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },\n  \"sideEffects\": false,\n  \"auto...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — Absolute machine path in `constantPaths`\n\n```json\n\"path\": \"/mnt/vss/_work/1/s/azure-sdk-for-js/sdk/ai/ai-projects/generated/api/aiProjectContext.ts\"\n```\n\nThis is a hard-coded absolute path from the CI build machine (`/mnt/vss/_work/...`) that leaked into the repository. This will break the SDK version bump tooling (`dev-tool` uses `constantPaths` to find and update the SDK version string) for any develope...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `WorkIQPreviewTool` has a forgotten-export warning\n\n```\n// Warning: (ae-forgotten-export) The symbol \"WorkIQPreviewTool\" needs to be exported by the entry point index.d.ts\n```\n\n`WorkIQPreviewTool` is referenced in `ToolUnion` (line 2247) but is **not exported** from the package's entry point `index.d.ts`. This means consumers of the package cannot reference the type directly, even though it appears as part ...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":4,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"Found **2 tooling issues** in this PR for `@azure/ai-projects` (data-plane, not a management SDK). CI checks are still in progress (the current agent run). No API design issues were found in the changed public API surface beyond the tool issues below.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\u003c/summary\u003e\n\n```json\n{\"agent\":\"mgmt-reviewer\",\"pr\":37851,\"summary\":\"issues_found\",\"findings\":[{\"file...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":5,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
