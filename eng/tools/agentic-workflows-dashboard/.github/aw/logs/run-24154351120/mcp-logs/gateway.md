<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.14
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a review comment on a specific line of code in a pull request. Use this for inline code review feedback, suggestions, or questions about specific code changes. For general PR comments not tied to specific lines, use add_comment instead. When the workflow is configured with `target: \"*\"`, you must specify `pull_request_number` to indicate which PR to target. CONSTRAINTS: Maximum 10 review comment(s) can be created. Comments will be on the RI...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38052","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38052,\"title\":\"[keyvault-common] Revert empty 2.0.2 version bump\",\"body\":\"Reverts @azure/keyvault-common version from 2.0.2 back to 2.0.0 and removes the empty unreleased CHANGELOG entry. This package has no actual changes and should not be released alongside @azure/keyvault-certificates@4.10.2. The empty version bump was causing the release pipeline to require an APIView approval for keyvault-common with no real content....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38052,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38052","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38052,\"title\":\"[keyvault-common] Revert empty 2.0.2 version bump\",\"body\":\"Reverts @azure/keyvault-common version from 2.0.2 back to 2.0.0 and removes the empty unreleased CHANGELOG entry. This package has no actual changes and should not be released alongside @azure/keyvault-certificates@4.10.2. The empty version bump was causing the release pipeline to require an APIView approval for keyvault-common with no real content....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":38052,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38052,\"title\":\"[keyvault-common] Revert empty 2.0.2 version bump\",\"body\":\"Reverts @azure/keyvault-common version from 2.0.2 back to 2.0.0 and removes the empty unreleased CHANGELOG entry. This package has no actual changes and should not be released alongside @azure/keyvault-certificates@4.10.2. The empty version bump was causing the release pipeline to require an APIView approval for keyvault-common with no real content....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38052","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/keyvault/keyvault-common/CHANGELOG.md\",\"status\":\"modified\",\"deletions\":10,\"changes\":10,\"patch\":\"@@ -1,15 +1,5 @@\\n # Release History\\n \\n-## 2.0.2 (Unreleased)\\n-\\n-### Features Added\\n-\\n-### Breaking Changes\\n-\\n-### Bugs Fixed\\n-\\n-### Other Changes\\n-\\n ## 2.0.0 (2024-10-16)\\n \\n ### Features Added\"},{\"filename\":\"sdk/keyvault/keyvault-common/package.json\",\"status\":\"modified\",\"add...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38052,\"title\":\"[keyvault-common] Revert empty 2.0.2 version bump\",\"body\":\"Reverts @azure/keyvault-common version from 2.0.2 back to 2.0.0 and removes the empty unreleased CHANGELOG entry. This package has no actual changes and should not be released alongside @azure/keyvault-certificates@4.10.2. The empty version bump was causing the release pipeline to require an APIView approval for keyvault-common with no real content....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38052","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38052,\"title\":\"[keyvault-common] Revert empty 2.0.2 version bump\",\"body\":\"Reverts @azure/keyvault-common version from 2.0.2 back to 2.0.0 and removes the empty unreleased CHANGELOG entry. This package has no actual changes and should not be released alongside @azure/keyvault-certificates@4.10.2. The empty version bump was causing the release pipeline to require an APIView approval for keyvault-common with no real content....`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","repo":"azure-sdk-for-js","workflow_runs_filter":{"status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":703055,\"workflow_runs\":[{\"id\":24093954057,\"name\":\"After APIView\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFnByQCQ\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/post-apiview.yml\",\"run_number\":1314748,\"run_attempt\":1,\"event\":\"check_run\",\"display_title\":\"After APIView\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"workflow_id\":157881463,\"check_suite_id\":63649701288,...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"Documentation is complete and consistent. This PR removes an empty unreleased `## 2.0.2 (Unreleased)` CHANGELOG entry and reverts `package.json` version back to `2.0.0`. Both files are consistent with each other, and the CHANGELOG format is correct. No API exports, TSDoc, snippets, README, or samples were changed.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\u003c/summary\u003e\n\n```json\n{\"agent\":\"scribe\",\"pr\"...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
