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
- ✓ **startup** Routes: /mcp/<server> for servers: [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"[AutoPR @azure-arm-discovery]-generated-from-SDK Generation - JS-6022526 (#37683)\\n\\nConfigurations:\\n'specification/discovery/Discovery.Management/tspconfig.yaml', API\\nVersion: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA:\\n'[REDACTED]' in SpecRepo:\\n'https://github.com/Azure/azure-rest-api-spe...`
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","page":1,"perPage":100,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"[AutoPR @azure-arm-discovery]-generated-from-SDK Generation - JS-6022526 (#37683)\\n\\nConfigurations:\\n'specification/discovery/Discovery.Management/tspconfig.yaml', API\\nVersion: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA:\\n'[REDACTED]' in SpecRepo:\\n'https://github.com/Azure/azure-rest-api-spe...`
- 🔍 rpc **github**→`tools/call` `list_pull_requests`
  
  ```json
  {"params":{"arguments":{"base":"main","direction":"desc","owner":"Azure","perPage":10,"repo":"azure-sdk-for-js","sort":"updated","state":"closed"},"name":"list_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":3145727745,\"number\":36962,\"state\":\"closed\",\"locked\":false,\"title\":\"[AutoPR @azure-arm-dell-storage]-generated-from-SDK Generation - JS-5718232\",\"body\":\"Configurations:  \\u0026#39;specification/dell/Dell.Storage.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-09-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-s...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":37747,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"success\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":44941960732,\"node_id\":\"SC_kwDOBnSy6c8AAAAKdr_mHA\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"success\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23332297327\",\"description\":\"All checks passed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avatar_url\":\"https:...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":false,"owner":"Azure","repo":"azure-sdk-for-js","sha":"main"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"[AutoPR @azure-arm-discovery]-generated-from-SDK Generation - JS-6022526 (#37683)\\n\\nConfigurations:\\n'specification/discovery/Discovery.Management/tspconfig.yaml', API\\nVersion: 2026-02-01-preview, SDK Release Type: beta, and CommitSHA:\\n'[REDACTED]' in SpecRepo:\\n'https://github.com/Azure/azure-rest-api-spec...`
- 🔍 rpc **github**→`tools/call` `list_pull_requests`
  
  ```json
  {"params":{"arguments":{"base":"main","direction":"desc","owner":"Azure","perPage":20,"repo":"azure-sdk-for-js","sort":"updated","state":"open"},"name":"list_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":3424141937,\"number\":37749,\"state\":\"open\",\"locked\":false,\"title\":\"Add update-metadata script and configure it in swagger_to_sdk_config\",\"body\":\"fixes https://github.com/Azure/azure-sdk-tools/issues/13810\\n\\n- add update-metadata script \\n- add config in swagger_to_sdk_config\",\"created_at\":\"2026-03-20T09:33:24Z\",\"updated_at\":\"2026-03-20T09:40:46Z\",\"user\":{\"login\":\"skywing918\",\"id\":41712999,\"node_id...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":37749,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"success\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":44946633519,\"node_id\":\"SC_kwDOBnSy6c8AAAAKdwczLw\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"success\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23337600487\",\"description\":\"All checks passed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avatar_url\":\"https:...`
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"order":"desc","perPage":5,"query":"repo:Azure/azure-sdk-for-js CI test failure main branch","sort":"created"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","page":2,"perPage":30,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"[Azure Load Testing] Updating JavaScript SDK to new data plane api version 2025-11-01-preview (#37055)\\n\\nGenerated new sdk for data plane api version 2025-11-01-preview\\nSDK is generated with the help of typespec\\nAPI spec change PR -\\nhttps://github.com/Azure/azure-rest-api-specs/pull/39372\\n\\n### Packages...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":7,\"incomplete_results\":false,\"items\":[{\"id\":4063650917,\"number\":37612,\"state\":\"open\",\"locked\":false,\"title\":\"CI test failures on main: `@azure/attestation`\",\"body\":\"## Summary\\n\\n1 package is affected by live test failures detected in CI on the `main` branch. The HEAD commit `[REDACTED]` (merged 2026-03-12) shows 2 failing check runs, both in the `js - attestation - tests` CI job. 1 test is failing ou...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":37612,"method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"order":"desc","perPage":10,"query":"repo:Azure/azure-sdk-for-js \"CI test failures on main\" is:open","sort":"created"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37612,\"title\":\"CI test failures on main: `@azure/attestation`\",\"body\":\"## Summary\\n\\n1 package is affected by live test failures detected in CI on the `main` branch. The HEAD commit `[REDACTED]` (merged 2026-03-12) shows 2 failing check runs, both in the `js - attestation - tests` CI job. 1 test is failing out of 212 total. The failure is in a live-mode test (the attestation package runs against real Azure Attestation i...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":8,\"incomplete_results\":false,\"items\":[{\"id\":4094200174,\"number\":37716,\"state\":\"open\",\"locked\":false,\"title\":\"CI test failures on main: communication-identity, storage-blob, communication-short-codes, documentintelligence, openai\",\"body\":\"## Summary\\n\\n5 packages have failing CI check runs on the HEAD commit of `main` ([`4adaf9f`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]), 2026-03-18...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":false,"owner":"Azure","repo":"azure-sdk-for-js","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"Fix(loadtesting):filename undefined error in CJS build (#37693)\\n\\n### Packages impacted by this PR\\n@azure/playwright\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If\\nthere are mo...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"message":"No action needed: The current `main` branch HEAD ([REDACTED], 2026-03-20) and all recent commits have 0 GitHub Check Runs — the CI (Azure Pipelines) does not report per-commit check runs via the GitHub Checks API for direct pushes to main. No new check-run failures can be detected. The most recent known failures are already tracked in open issues #37716 (5 packages, filed 2026-03-18) and #37612 (@azure/attestation, filed 2026-03-12)....`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
