<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.7
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_issue","description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created. Labels [test-reliability] will be automatically added.","inputSchema":{"additionalProperties":false,"properties...`
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get commit details"},"description":"Get details for a commit from a GitHub repository","inputSchema":{"properties":{"include_diff":{"default":true,"description":"Whether to include file diffs and stats in the response. Default is true.","type":"boolean"},"owner":{"description":"Repository owner","type":"string"},"page":{"description":"Page number for pagination (min 1)","minimum":1,"type":"number"},"perPage":{"descriptio...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [safeoutputs github]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":false,"owner":"Azure","repo":"azure-sdk-for-js","sha":"main"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"fix(loadtesting): Direct Azure Portal URL to Specific Playwright Test Run (#37850)\\n\\n### Packages impacted by this PR\\n\\n@azure/playwright\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":37850,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `list_pull_requests`
  
  ```json
  {"params":{"arguments":{"base":"main","direction":"desc","owner":"Azure","perPage":5,"repo":"azure-sdk-for-js","sort":"updated","state":"closed"},"name":"list_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"success\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45200831729,\"node_id\":\"SC_kwDOBnSy6c8AAAAKhi308Q\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"success\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23591085283\",\"description\":\"All checks passed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avatar_url\":\"https:...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":3450578571,\"number\":37850,\"state\":\"closed\",\"locked\":false,\"title\":\"fix(loadtesting): Direct Azure Portal URL to Specific Playwright Test Run\",\"body\":\"### Packages impacted by this PR\\n\\n@azure/playwright\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible des...`
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"order":"desc","perPage":5,"query":"repo:Azure/azure-sdk-for-js CI test failures main is:open","sort":"created"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"order":"desc","perPage":5,"query":"repo:Azure/azure-sdk-for-js is:merged base:main merged:\u003e2026-03-26","sort":"created"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":10,\"incomplete_results\":false,\"items\":[{\"id\":4142598778,\"number\":37849,\"state\":\"open\",\"locked\":false,\"title\":\"CI test failures on main: attestation, communication-identity, communication-short-codes, digital-twins-core\",\"body\":\"## Summary\\n\\nAs of 2026-03-26, commit [`7066e51`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]) (HEAD of `main`), CI reports failures across 4 service directori...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":2,\"incomplete_results\":false,\"items\":[{\"id\":4142727413,\"number\":37850,\"state\":\"closed\",\"locked\":false,\"title\":\"fix(loadtesting): Direct Azure Portal URL to Specific Playwright Test Run\",\"body\":\"### Packages impacted by this PR\\r\\n\\r\\n@azure/playwright\\r\\n### Issues associated with this PR\\r\\n\\r\\n\\r\\n### Describe the problem that is addressed by this PR\\r\\n\\r\\n\\r\\n### What are the possi...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":37849,"method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":10,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"fix(loadtesting): Direct Azure Portal URL to Specific Playwright Test Run (#37850)\\n\\n### Packages impacted by this PR\\n\\n@azure/playwright\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the proble...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37849,\"title\":\"CI test failures on main: attestation, communication-identity, communication-short-codes, digital-twins-core\",\"body\":\"## Summary\\n\\nAs of 2026-03-26, commit [`7066e51`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]) (HEAD of `main`), CI reports failures across 4 service directories with actual test failures and 2 additional directories with CI-infrastructure-level failures (0 failed tests). ...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"message":"No new CI unit test failures detected on main. HEAD commit is 7d18378026 (2026-03-27); check-enforcer reports \"All checks passed\". An existing open issue (#37849, created 2026-03-26) already tracks all known live/AAD integration test failures (attestation clock skew, communication-identity AAD resource unavailable, communication-short-codes HTTP 500). The regular playback-mode unit tests are passing. No new issue needed for this run....`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
