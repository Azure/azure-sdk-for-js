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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37647","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37647,\"title\":\"Port @azure/postgresql-auth package from postgres-entra-auth repo\",\"body\":\"## Description\\n\\nMigrates the standalone [azure-postgresql-auth](https://github.com/Azure/postgres-entra-auth/tree/main/javascript) library into the monorepo as `@azure/postgresql-auth` - a new Azure SDK client package providing Entra ID authentication for PostgreSQL connections via both `pg` (node-postgres) and Sequelize clients....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37647,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37647","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37647,\"title\":\"Port @azure/postgresql-auth package from postgres-entra-auth repo\",\"body\":\"## Description\\n\\nMigrates the standalone [azure-postgresql-auth](https://github.com/Azure/postgres-entra-auth/tree/main/javascript) library into the monorepo as `@azure/postgresql-auth` - a new Azure SDK client package providing Entra ID authentication for PostgreSQL connections via both `pg` (node-postgres) and Sequelize clients....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":37647,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37647,\"title\":\"Port @azure/postgresql-auth package from postgres-entra-auth repo\",\"body\":\"## Description\\n\\nMigrates the standalone [azure-postgresql-auth](https://github.com/Azure/postgres-entra-auth/tree/main/javascript) library into the monorepo as `@azure/postgresql-auth` - a new Azure SDK client package providing Entra ID authentication for PostgreSQL connections via both `pg` (node-postgres) and Sequelize clients....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37647","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":3,\"changes\":3,\"patch\":\"@@ -834,6 +834,9 @@\\n # PRLabel: %Mgmt\\n /sdk/policyinsights/arm-policyinsights/ @qiaozha @MaryGao @JialinHuang803\\n \\n+# PRLabel: %Postgresql\\n+/sdk/postgresql/postgresql-auth/ @maorleger @jeremymeng\\n+\\n # PRLabel: %Mgmt\\n /sdk/postgresql/arm-postgresql/ @qiaozha @MaryGao @JialinHuang803\\n \"},{\"filename\":\"common/tools/dev-t...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37647,\"title\":\"Port @azure/postgresql-auth package from postgres-entra-auth repo\",\"body\":\"## Description\\n\\nMigrates the standalone [azure-postgresql-auth](https://github.com/Azure/postgres-entra-auth/tree/main/javascript) library into the monorepo as `@azure/postgresql-auth` - a new Azure SDK client package providing Entra ID authentication for PostgreSQL connections via both `pg` (node-postgres) and Sequelize clients....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37647","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37647,\"title\":\"Port @azure/postgresql-auth package from postgres-entra-auth repo\",\"body\":\"## Description\\n\\nMigrates the standalone [azure-postgresql-auth](https://github.com/Azure/postgres-entra-auth/tree/main/javascript) library into the monorepo as `@azure/postgresql-auth` - a new Azure SDK client package providing Entra ID authentication for PostgreSQL connections via both `pg` (node-postgres) and Sequelize clients....`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","per_page":5,"repo":"azure-sdk-for-js","workflow_runs_filter":{"status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":740213,\"workflow_runs\":[{\"id\":22276391602,\"name\":\"GitHub Scheduled Event Processor\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFL8bCsg\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/scheduled-event-processor.yml\",\"run_number\":18271,\"run_attempt\":1,\"event\":\"schedule\",\"display_title\":\"GitHub Scheduled Event Processor\",\"status\":\"completed\",\"conclusion\":\"success\",\"workflo...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Inconsistent naming** — Snippet test names don't follow the `ReadmeSample\u003cFeature\u003e` convention used across the repo (e.g., `keyvault-keys`, `identity` packages use `ReadmeSampleCreateClient`, `ReadmeSampleAuthentication`, etc.).\n\n**Current:** `\"entraTokenProvider\"`, `\"configureEntraAuthentication\"`, `\"Logging\"`\n**Expected:** `\"ReadmeSampleEntraTokenProvider\"`, `\"ReadmeSampleConfigureEntraAuthentication\"`, `...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Misleading import style** — The README examples use `await import()` (dynamic imports) while the actual sample files (`pgConnection.ts`, `sequelizeConnection.ts`) use standard static ES module imports. This discrepancy can confuse users who copy from the README.\n\n```ts\n// README (dynamic, unusual for top-level code)\nconst { entraTokenProvider } = await import(\"@azure/postgresql-auth\");\nconst pg = await import(\"pg\");\n\n/...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":4,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔵 **Missing options documentation** — The Key Concepts section mentions `entraTokenProvider` but omits its `options` parameter (`GetEntraTokenPasswordOptions`). Users won't know they can pass a custom `scope` to override the default PostgreSQL AAD scope.\n\nSimilarly, `SequelizeBeforeConnectHook` is a public exported type but has no mention in the README, leaving users without guidance on its intended use (typing custom Sequelize-lik...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":5,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔵 **Internal/exported name divergence** — The type `GetEntraAccessTokenOptions` is defined internally but re-exported under the alias `GetEntraTokenPasswordOptions`. The TSDoc on `entraTokenProvider` refers to the type implicitly through parameter typing, but the `@param options` description doesn't name the exported type explicitly.\n\n**Fix:** In the `@param options` JSDoc of `entraTokenProvider`, reference the public exported type...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":6,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"This PR introduces a new `@azure/postgresql-auth` package with generally good documentation. Found **4 issues** (0 critical, 2 medium, 2 low):\n\n1. **[medium]** Snippet test names (`\"entraTokenProvider\"`, `\"configureEntraAuthentication\"`, `\"Logging\"`) don't follow the `ReadmeSample\u003cFeature\u003e` convention used across the repo — both `snippets.spec.ts` and the `snippet:` tags in `README.md` need renaming.\n2. **[medium]** R...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":7,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
