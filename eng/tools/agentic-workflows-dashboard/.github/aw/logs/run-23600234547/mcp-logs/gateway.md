<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.6
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_pull_request_review_comment","description":"Create a review comment on a specific line of code in a pull request. Use this for inline code review feedback, suggestions, or questions about specific code changes. For general PR comments not tied to specific lines, use add_comment instead. When the workflow is configured with `target: \"*\"`, you must specify `pull_request_number` to indicate which PR to target. CONSTRAINTS: Maximum 10 review comment(s...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37697","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37697,\"title\":\"Feature/ai projects v2.0.2b1\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n###...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37697,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37697,\"title\":\"Feature/ai projects v2.0.2b1\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n###...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37697","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37697,\"title\":\"Feature/ai projects v2.0.2b1\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n###...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37697","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37697,\"title\":\"Feature/ai projects v2.0.2b1\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n###...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37697,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","per_page":10,"repo":"azure-sdk-for-js","workflow_runs_filter":{"event":"pull_request","status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"additions\":3,\"changes\":3,\"patch\":\"@@ -1028,6 +1028,9 @@ importers:\\n       '@azure/monitor-opentelemetry':\\n         specifier: ^1.16.0\\n         version: link:../../monitor/monitor-opentelemetry\\n+      '@azure/monitor-opentelemetry-exporter':\\n+        specifier: ^1.0.0-beta.32\\n+        version: link:../../monitor/monitor-opentelemetry-exporter\\n       '@azure/opent...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37697","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37697,\"title\":\"Feature/ai projects v2.0.2b1\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n###...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":55,\"workflow_runs\":[{\"id\":23565021187,\"name\":\"pnpm-lock-conflict-resolver\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFfJWwAw\",\"head_branch\":\"aw/pnpm-lock-conflict-resolver\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/pnpm-lock-conflict-resolver.lock.yml\",\"run_number\":5,\"run_attempt\":1,\"event\":\"pull_request\",\"display_title\":\"pnpm-lock-conflict-resolver\",\"status\":\"completed\",\"conclusion\":\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/review/ai-projects-node.api.md","ref":"refs/pull/37697/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/package.json","ref":"refs/pull/37697/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/ai-projects\",\n  \"version\": \"2.0.2\",\n  \"description\": \"Azure AI Projects client library.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },\n  \"sideEffects\": false,\n  \"auto...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/review/ai-projects-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/ai-projects\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type { ClientOptions } from '...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Inconsistency** — `BetaEvaluatorsOperations.getCredentials` places the body parameter `credentialRequest` between the two resource-identifier parameters `name` and `version`:\n\n```ts\ngetCredentials: (name: string, credentialRequest: EvaluatorCredentialRequest, version: string, options?) =\u003e ...\n```\n\nThe existing `DatasetsOperations.getCredentials` (line 989) uses `(name, version, options?)` — resource identifiers first...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Ambiguous optional fields** — `CodeBasedEvaluatorDefinition` previously required `code_text: string`. This PR makes it optional and adds three new optional fields (`entry_point`, `image_tag`, `blob_uri`), creating an interface where all four alternatives are optional with no way for callers to know which combination is valid:\n\n```ts\nexport interface CodeBasedEvaluatorDefinition extends EvaluatorDefinition {\n    blob_uri?: str...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Type inconsistency** — `foundryFeatures` is typed as `AgentDefinitionOptInKeys | \"AgentEndpoints=V1Preview\"` (same at line 95). The literal `\"AgentEndpoints=V1Preview\"` should be part of the `AgentDefinitionOptInKeys` type alias (currently defined at line 57 as `\"HostedAgents=V1Preview\" | \"WorkflowAgents=V1Preview\"`), not added inline here.\n\nInline literals duplicate the value in two places and break the contract that `...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Inconsistent parameter naming** — `create` uses `name` for the toolset identifier, while `delete`, `get`, and `update` use `toolSetName`:\n\n```ts\ncreate: (name: string, tools: ToolUnion[], ...) =\u003e Promise\u003cToolsetObject\u003e;   // ← \"name\"\ndelete: (toolSetName: string, ...) =\u003e Promise\u003cDeleteToolsetResponse\u003e;          // ← \"toolSetName\"\nget:    (toolSetName: string, ...) =\u003e Promise\u003cTo...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Casing inconsistency** — `EvaluatorCredentialRequest.blobUri` uses camelCase, while every other model property in this package uses snake_case (e.g., `blob_uri`, `project_connection_id`, `search_configurations`). The serializer also emits `blobUri` on the wire, which may not match the service's expected field name.\n\n**Fix:** Rename to `blob_uri` for consistency with the rest of the model layer, unless the service REST contract ...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Naming + Parameter Order** — `BetaEvaluatorsOperations.pendingUpload` has two issues:\n\n1. **Name is a noun, not a verb.** Azure SDK guidelines require service methods to use verb-first names (e.g., `createVersion`, `deleteVersion`). `pendingUpload` reads as a noun/gerund. Prefer `createPendingUpload` or `beginUpload`.\n\n2. **Parameter ordering inconsistent with the sibling `DatasetsOperations.pendingUpload`** (line 992):\n   -...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":4,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":6,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":8,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":5,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":7,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"API design review for `@azure/ai-projects` v2.0.2. Found **6 issues** (0 breaking, 4 medium, 2 low) across the new `BetaToolsetsOperations`, `BetaEvaluatorsOperations` additions, and model changes.\n\n**Summary of findings:**\n- `getCredentials` and `pendingUpload` parameter ordering in `BetaEvaluatorsOperations` inverts the resource-identifiers-first convention established by `DatasetsOperations` (same methods, same signature pattern).\n...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":9,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
