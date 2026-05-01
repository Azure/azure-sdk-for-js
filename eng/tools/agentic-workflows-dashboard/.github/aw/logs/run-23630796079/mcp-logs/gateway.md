<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.8
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_pull_request_review_comment","description":"Create a review comment on a specific line of code in a pull request. Use this for inline code review feedback, suggestions, or questions about specific code changes. For general PR comments not tied to specific lines, use add_comment instead. CONSTRAINTS: Maximum 10 review comment(s) can be created. Comments will be on the RIGHT side of the diff.","inputSchema":{"additionalProperties":false,"properties":{...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get details of GitHub Actions resources (workflows, workflow runs, jobs, and artifacts)"},"description":"Get details about specific GitHub Actions resources.\nUse this tool to get details about individual workflows, workflow runs, jobs, and artifacts by their unique IDs.\n","inputSchema":{"properties":{"method":{"description":"The method to execute","enum":["get_workflow","get_workflow_run","get_workflow_job","download_w...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [safeoutputs github]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37655,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37655,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37655,\"title\":\"[AutoPR @azure-arm-datafactory]-generated-from-SDK Generation - JS-6014612\",\"body\":\"Configurations:  \\u0026#39;specification/datafactory/resource-manager/Microsoft.DataFactory/DataFactory/tspconfig.yaml\\u0026#39;, API Version: 2018-06-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"additions\":21,\"deletions\":12,\"changes\":33,\"patch\":\"@@ -9606,24 +9606,27 @@ importers:\\n \\n   sdk/datafactory/arm-datafactory:\\n     dependencies:\\n+      '@azure-rest/core-client':\\n+        specifier: ^2.3.1\\n+        version: link:../../core/core-client-rest\\n       '@azure/abort-controller':\\n         specifier: ^2.1.2\\n         version: link:../../core/abort-co...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37655,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":60,\"check_runs\":[{\"id\":68829508980,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630796079/job/68829508980\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630796079/job/68829508980\",\"started_at\":\"2026-03-27T04:13:02Z\"},{\"id\":68829472631,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"success\",\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/datafactory/arm-datafactory/CHANGELOG.md","ref":"refs/pull/37655/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/datafactory/arm-datafactory/package.json","ref":"refs/pull/37655/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/datafactory/arm-datafactory/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-datafactory\",\n  \"version\": \"20.0.0\",\n  \"description\": \"A generated SDK for DataFactoryManagementClient.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },\n  ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/datafactory/arm-datafactory/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 20.0.0 (2026-03-16)\n\n### Features Added\n  - Added operation group CredentialOperationsOperations\n  - Added operation group IntegrationRuntimeOperations\n  - Added operation Data...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37655,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get pull request diff: GET https://api.github.com/repos/Azure/azure-sdk-for-js/pulls/37655: 406 Sorry, the diff exceeded the maximum number of files (300). Consider using 'List pull requests files' API or locally cloning the repository instead. [{Resource:PullRequest Field:diff Code:too_large Message:}]","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Design Issue** — `AzureSupportedClouds` uses a closed template-literal union instead of `string`\n\n```ts\nexport type AzureSupportedClouds = `${AzureClouds}`;\n```\n\nThis is a closed union type that restricts callers to exactly the values in the `AzureClouds` enum. When Azure adds a new cloud environment in the service, existing client code would fail to compile. The standard Azure SDK pattern for extensible string enums is:\n\...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `autoPublish: false` for a stable release\n\n`\"autoPublish\": false` was previously `true` in this package. This is a stable release (`20.0.0`), so `autoPublish` must be `true` to enable automatic NPM publishing after the PR merges.\n\n**Fix:** Change `\"autoPublish\": false` → `\"autoPublish\": true`, and report the generation tooling bug at the [generation tool repository](https://github.com/Azure/autorest.typ...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Design Issue** — `AzureClouds` enum is missing the `Known*` prefix\n\nAll extensible string enums in this package follow the `KnownXxx` naming convention (e.g., `KnownActivityState`, `KnownCreatedByType`). The `AzureClouds` enum breaks this pattern — it should be named `KnownAzureClouds`.\n\nAdditionally, enum members use `UPPER_SNAKE_CASE` (`AZURE_CHINA_CLOUD`, `AZURE_PUBLIC_CLOUD`, `AZURE_US_GOVERNMENT`) while the Azure SDK g...`
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
  {"id":5,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"3 issues found in this PR for `@azure/arm-datafactory` v20.0.0 (stable): 1 tool issue and 2 API design issues.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\u003c/summary\u003e\n\n```json\n{\"agent\":\"mgmt-reviewer\",\"pr\":37655,\"summary\":\"issues_found\",\"findings\":[{\"file\":\"sdk/datafactory/arm-datafactory/package.json\",\"line\":9,\"issueType\":\"tool\",\"category\":\"configuration\",\"description\":\"autoPu...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":6,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
