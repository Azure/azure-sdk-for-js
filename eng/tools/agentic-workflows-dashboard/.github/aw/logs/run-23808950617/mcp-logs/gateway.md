<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.10
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [safeoutputs github]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Update an existing GitHub pull request's title or body. Supports replacing, appending to, or prepending content to the body. Title is always replaced. Only the fields you specify will be updated; other fields remain unchanged. CONSTRAINTS: Maximum 1 pull request(s) can be updated.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"Pull request body content in Markdown. For 'replace', this becomes the entire body. For '...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get commit details"},"description":"Get details for a commit from a GitHub repository","inputSchema":{"properties":{"include_diff":{"default":true,"description":"Whether to include file diffs and stats in the response. Default is true.","type":"boolean"},"owner":{"description":"Repository owner","type":"string"},"page":{"description":"Page number for pagination (min 1)","minimum":1,"type":"number"},"perPage":{"descriptio...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37911","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37911,\"title\":\"testing only\",\"state\":\"open\",\"draft\":true,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/pull/37911\",\"user\":{\"login\":\"jeremymeng\",\"id\":7583839,\"profile_url\":\"https://github.com/jeremymeng\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/7583839?v=4\"},\"labels\":[\"Mgmt\"],\"head\":{\"ref\":\"test-conflict-resolver\",\"sha\"...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37911,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37911,\"title\":\"testing only\",\"state\":\"open\",\"draft\":true,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/pull/37911\",\"user\":{\"login\":\"jeremymeng\",\"id\":7583839,\"profile_url\":\"https://github.com/jeremymeng\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/7583839?v=4\"},\"labels\":[\"Mgmt\"],\"head\":{\"ref\":\"test-conflict-resolver\",\"sha\"...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37911","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37911,\"title\":\"testing only\",\"state\":\"open\",\"draft\":true,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/pull/37911\",\"user\":{\"login\":\"jeremymeng\",\"id\":7583839,\"profile_url\":\"https://github.com/jeremymeng\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/7583839?v=4\"},\"labels\":[\"Mgmt\"],\"head\":{\"ref\":\"test-conflict-resolver\",\"sha\"...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"message":"No action needed for PR #37911: The branch `test-conflict-resolver` already has a merge commit (b633e3ace) incorporating the latest main branch. Running `git merge FETCH_HEAD` returns \"Already up to date\" with no conflicts and no conflict markers in pnpm-lock.yaml. The PR's `mergeable_state: blocked` is due to it being a draft PR, not a merge conflict. Per the workflow instructions (step 5), when the merge shows no conflicts, process...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
