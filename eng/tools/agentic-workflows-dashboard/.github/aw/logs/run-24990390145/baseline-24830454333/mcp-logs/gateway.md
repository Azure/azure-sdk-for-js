<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [safeoutputs github]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created. Labels [\"test-reliability\"] will be automatically added.","inputSchema":{"additionalProperties":false,"properties":{"body":{"descri...`
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
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"37864","method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37864,\"title\":\"Tracking: Known pre-existing CI test failures\",\"body\":\"## Purpose\\n\\nThis issue tracks **known, pre-existing CI test failures** that are caused by infrastructure, service-side, or external dependency issues — not by code bugs in this repository. The automated [Analyze CI Test Failures](.github/workflows/fix-test-failures.md) workflow uses this issue to skip known failures and avoid filing duplicate issu...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":37864,"method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string (#38247)\",\"author\":{\"name\":\"Chien Yuan Chang\",\"email\":\"ds.chienyuanchang@gmail.com\",\"date\":\"2026-04-23T01:36:35Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-23T01:36:35Z\"}},\"author\":{\"login\":\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37864,\"title\":\"Tracking: Known pre-existing CI test failures\",\"body\":\"## Purpose\\n\\nThis issue tracks **known, pre-existing CI test failures** that are caused by infrastructure, service-side, or external dependency issues — not by code bugs in this repository. The automated [Analyze CI Test Failures](.github/workflows/fix-test-failures.md) workflow uses this issue to skip known failures and avoid filing duplicate issu...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38247","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38247,\"title\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string\",\"body\":\"### Packages impacted by this PR\\n@azure/ai-content-understanding\\n\\n### Issues associated with this PR\\nNone\\n\\n### Describe the problem that is addressed by this PR\\nThe custom user agent string in contentUnderstandingContext.ts was hardcoded as azsdk-js-ai-content-understanding/1.0.1 incorrectly. It should 1.1.0.\\n\\n### What are...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38247,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":13,\"check_runs\":[{\"id\":72618317201,\"name\":\"Handle pull_request_target closed event with azure login\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24811887594/job/72618317201\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24811887594/job/72618317201\",\"started_at\":\"2026-04-23T01:36:43Z\",\"completed_at\":\"2026...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38247","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38247,\"title\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string\",\"body\":\"### Packages impacted by this PR\\n@azure/ai-content-understanding\\n\\n### Issues associated with this PR\\nNone\\n\\n### Describe the problem that is addressed by this PR\\nThe custom user agent string in contentUnderstandingContext.ts was hardcoded as azsdk-js-ai-content-understanding/1.0.1 incorrectly. It should 1.1.0.\\n\\n### What are...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":false,"owner":"Azure","repo":"azure-sdk-for-js","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"Improve test coverage to ~100% for @azure/core-client (#38176)\\n\\n## Changes\\n\\n### New test files\\n- base64.spec.ts (node + browser)\\n- interfaceHelpers.spec.ts\\n- operationHelpers.spec.ts\\n- pipeline.spec.ts\\n- utils.spec.ts\\n- urlHelpers.spec.ts (expanded)\\n\\n### Expanded existing tests\\n- deserializ...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38246","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38246,\"title\":\"Prepare release: @azure/core-amqp 4.4.2 and @azure/event-hubs 6.0.4\",\"body\":\"## Release Preparation\\n\\nSets release date to **2026-04-22** for both packages and finalizes changelogs.\\n\\n### @azure/core-amqp 4.4.2\\n- **Bug fix**: Handle `AggregateError` in `translate()` for Node.js 20+ Happy Eyeballs (#38233)\\n- **Bug fix**: Clamp negative `setTimeout` values to 0 for Node.js v24+ (#38166)\\n\\n### @az...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38246,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":19,\"check_runs\":[{\"id\":72599066365,\"name\":\"Handle pull_request_target closed event with azure login\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24805657268/job/72599066365\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24805657268/job/72599066365\",\"started_at\":\"2026-04-22T22:20:15Z\",\"completed_at\":\"2026...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38246","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38246,\"title\":\"Prepare release: @azure/core-amqp 4.4.2 and @azure/event-hubs 6.0.4\",\"body\":\"## Release Preparation\\n\\nSets release date to **2026-04-22** for both packages and finalizes changelogs.\\n\\n### @azure/core-amqp 4.4.2\\n- **Bug fix**: Handle `AggregateError` in `translate()` for Node.js 20+ Happy Eyeballs (#38233)\\n- **Bug fix**: Clamp negative `setTimeout` values to 0 for Node.js v24+ (#38166)\\n\\n### @az...`
- 🔍 rpc **github**→`tools/call` `list_pull_requests`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":20,"repo":"azure-sdk-for-js","state":"open"},"name":"list_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"number\":38260,\"title\":\"docs(loadtesting): changelog update for v1.1.5 @azure/playwright\",\"body\":\"### Packages impacted by this PR\\n@azure/playwright\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there tes...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38260","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38260,\"title\":\"docs(loadtesting): changelog update for v1.1.5 @azure/playwright\",\"body\":\"### Packages impacted by this PR\\n@azure/playwright\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38259","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38259,\"title\":\"feat(confidential-ledger): add redirect URL caching for write operations\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure-rest/confidential-ledger`\\n\\n### Issues associated with this PR\\n\\nRelated to [ADO Task #37485929](https://msazure.visualstudio.com/One/_workitems/edit/37485929) (parent Feature #37442109)\\n\\n### Describe the problem that is addressed by this PR\\n\\nWhen writing to Azure Con...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38258","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38258,\"title\":\"fix(core-client): fix typos in serializer error messages\",\"body\":\"Fix two issues in the Array element metadata error messages in `serializer.ts`:\\n\\n- Add missing opening quote: `element\\u0026#34;` → `\\u0026#34;element\\u0026#34;`\\n- Fix grammar: \\u0026#34;it must of type\\u0026#34; → \\u0026#34;it must be of type\\u0026#34;\\n\\nBoth occurrences (serialize and deserialize paths) are fixed. Test r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38257","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38257,\"title\":\"AI assistance landing page for the repo\",\"body\":\"Doc explaining to SDK customers how to use AI to improve their SDK usage experience\",\"state\":\"open\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/pull/38257\",\"user\":{\"login\":\"KarishmaGhiya\",\"id\":8968058,\"profile_url\":\"https://github.com/KarishmaGhiya\",\"avatar_url\":...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38256","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38256,\"title\":\"feat(warp): add tsgo compiler mode using TypeScript 7 native CLI\",\"body\":\"## Summary\\n\\nAdd a new `--compiler tsgo` flag to warp that uses the native Go-based TypeScript compiler (`tsgo`) from `@typescript/native-preview` for ~10x faster builds.\\n\\n## What\\u0026#39;s changed\\n\\n### New: `--compiler tsgo` CLI flag\\nWhen `--compiler tsgo` is passed, warp uses the `tsgo` CLI binary instead of the TypeS...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38255","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38255,\"title\":\"[AutoPR @azure-arm-monitorslis]-generated-from-SDK Generation - JS-6195149\",\"body\":\"Configurations:  \\u0026#39;specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis/tspconfig.yaml\\u0026#39;, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/azure-sdk/internal/_build/results?...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38254","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38254,\"title\":\"[AutoPR @azure-arm-monitorslis]-generated-from-SDK Generation - JS-6195150\",\"body\":\"Configurations:  \\u0026#39;specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis/tspconfig.yaml\\u0026#39;, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/azure-sdk/internal/_build/results?...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38252","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38252,\"title\":\"[engsys] Migrate user output to stdio helpers\",\"body\":\"### Describe the problem that is addressed by this PR\\n\\nSome packages use `console` instead of Azure logger, which doesn\\u0026#39;t sanitize credentials. This followup PR addresses cases where `console` is being used, but Azure logger is inappropriate due to the output being user-facing.\\n\\n### What are the possible designs available to address th...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38251","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38251,\"title\":\"[engsys] Add `no-console` eslint rule to eslint plugin\",\"body\":\"### Issues associated with this PR\\n\\n#25876 \\n### Describe the problem that is addressed by this PR\\n\\nESLint now marks `console` invocations as an error. `console` calls aren\\u0026#39;t sanitized, so this change enforces sanitization on logs. User-facing output that doesn\\u0026#39;t need sanitization is addressed in #38252.\\n\",\"stat...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38250","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38250,\"title\":\"ai-translation-text-rest 2.0.0\",\"body\":\"### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test cases added in this PR? _(If not, why?)_\\n\\n\\n#...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38249","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38249,\"title\":\"Add dist and dist-test directories to prettier ignore\",\"body\":\"There are debugging/testing scenarios where we modify build output files in VS Code. This PR adds `dist/` and `dist-test/` directories into .prettierignore so that those files are not formatted by the prettier VS Code extension.\",\"state\":\"open\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.co...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38245","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38245,\"title\":\"Add breaking-change analysis agent for ARM SDK migrations\",\"body\":\"## What this PR does\\n\\nAdds a new Copilot agent (\\\\mgmt-breaking-change-analysis\\\\) that analyzes breaking changes in ARM management SDK PRs migrating from Swagger/AutoRest to TypeSpec/emitter.\\n\\n### Files\\n\\n- **\\\\.github/agents/mgmt-breaking-change-analysis.agent.md\\\\** -- Agent definition with mandatory execution protocol,...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38242","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38242,\"title\":\"Add setup script and skills for Azure AI Content Understanding\",\"body\":\"This pull request introduces comprehensive documentation and workflow improvements for running and understanding JavaScript SDK samples for Azure AI Content Understanding. It adds detailed skill guides, usage instructions, troubleshooting steps, and helper scripts to streamline the developer experience, especially for new users setting ...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38241","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38241,\"title\":\"[AutoPR @azure-arm-alertprocessingrules]-generated-from-SDK Generation - JS-6191237\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/AlertProcessingRules/tspconfig.yaml\\u0026#39;, API Version: 2021-08-08, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38240","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38240,\"title\":\"[AutoPR @azure-rest-ai-translation-text]-generated-from-SDK Generation - JS-6188910\",\"body\":\"Configurations:  \\u0026#39;specification/translation/data-plane/TextTranslation/tspconfig.yaml\\u0026#39;, API Version: 2026-06-06, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azu...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38238","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38238,\"title\":\"[WIP] KV sample test recording and HSM coverage\",\"body\":\"## Summary\\n- record the Key Vault sample tests and update the asset tag\\n- fix recorder/proxy usage for `CryptographyClient` sample flows\\n- isolate HSM-only sample cases so ordinary samples stay on the standard vault path\\n- make the backup/restore and delete/purge sample flows reliable for recording and playback\\n\\n## Validation\\n- sample re...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38234","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38234,\"title\":\"Fix broken REST API doc link in ai-projects README\",\"body\":\"The `[ai_foundry_data_plane_rest_apis]` reference link at the bottom of the ai-projects README points to `/rest/api/aifoundry/aiprojects/operation-groups` (plural). That URL 404s on Learn.\\n\\nThe correct path is `/rest/api/aifoundry/aiproject/operation-groups` (singular).\\n\\n**What changed:** One character in the reference link on line 1358.\\n...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38232","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38232,\"title\":\"[storage-file-datalake] migrate to typespec-based code generation\",\"body\":\"This depends on the new migrated version of blob package. The migrated datalake package will not work with old and published autorest-based versions of blob package due to the HTTP request pipeline differences.\",\"state\":\"open\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38230","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38230,\"title\":\"fix(cosmos): make boundingBox optional on SpatialIndex type\",\"body\":\"### Packages impacted by this PR\\n@azure/cosmos\\n\\n### Issues associated with this PR\\nhttps://github.com/Azure/azure-sdk-for-js/issues/38087\\n\\n### Describe the problem that is addressed by this PR\\n BoundingBox was incorrectly marked as required on `SpatialIndex`, but it\\u0026#39;s only needed for geometry indexes, not geography ...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38259","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38259,\"title\":\"feat(confidential-ledger): add redirect URL caching for write operations\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure-rest/confidential-ledger`\\n\\n### Issues associated with this PR\\n\\nRelated to [ADO Task #37485929](https://msazure.visualstudio.com/One/_workitems/edit/37485929) (parent Feature #37442109)\\n\\n### Describe the problem that is addressed by this PR\\n\\nWhen writing to Azure Con...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38259,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":39,\"check_runs\":[{\"id\":72676726086,\"name\":\"js - pullrequest\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/72676726086\",\"details_url\":\"https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6198074\",\"started_at\":\"2026-04-23T10:08:54Z\",\"completed_at\":\"2026-04-23T10:29:32Z\"},{\"id\":72676720654,\"name\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38259","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38259,\"title\":\"feat(confidential-ledger): add redirect URL caching for write operations\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure-rest/confidential-ledger`\\n\\n### Issues associated with this PR\\n\\nRelated to [ADO Task #37485929](https://msazure.visualstudio.com/One/_workitems/edit/37485929) (parent Feature #37442109)\\n\\n### Describe the problem that is addressed by this PR\\n\\nWhen writing to Azure Con...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38176","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38176,\"title\":\"Improve test coverage to ~100% for @azure/core-client\",\"body\":\"## Changes\\n\\n### New test files\\n- base64.spec.ts (node + browser)\\n- interfaceHelpers.spec.ts\\n- operationHelpers.spec.ts\\n- pipeline.spec.ts\\n- utils.spec.ts\\n- urlHelpers.spec.ts (expanded)\\n\\n### Expanded existing tests\\n- deserializationPolicy.spec.ts: error paths, XML parsing, header deserialization\\n- serializationPolicy.spec...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38176,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":13,\"check_runs\":[{\"id\":72572514971,\"name\":\"Handle pull_request_target closed event with azure login\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24797914932/job/72572514971\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24797914932/job/72572514971\",\"started_at\":\"2026-04-22T19:20:19Z\",\"completed_at\":\"2026...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38176","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38176,\"title\":\"Improve test coverage to ~100% for @azure/core-client\",\"body\":\"## Changes\\n\\n### New test files\\n- base64.spec.ts (node + browser)\\n- interfaceHelpers.spec.ts\\n- operationHelpers.spec.ts\\n- pipeline.spec.ts\\n- utils.spec.ts\\n- urlHelpers.spec.ts (expanded)\\n\\n### Expanded existing tests\\n- deserializationPolicy.spec.ts: error paths, XML parsing, header deserialization\\n- serializationPolicy.spec...`
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","query":"CI test failures on main repo:Azure/azure-sdk-for-js","repo":"azure-sdk-for-js"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":50,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string (#38247)\",\"author\":{\"name\":\"Chien Yuan Chang\",\"email\":\"ds.chienyuanchang@gmail.com\",\"date\":\"2026-04-23T01:36:35Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-23T01:36:35Z\"}},\"author\":{\"login\":\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":22,\"incomplete_results\":false,\"items\":[{\"id\":4238646496,\"number\":38090,\"state\":\"open\",\"locked\":false,\"title\":\"CI test failures on main: `@azure/arm-kubernetesconfiguration`\",\"body\":\"## Summary\\n\\n1 package affected, 1 test failing as of CI build `#20260410.1` (commit [`41b10c38`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]), 2026-04-10). The test recorder fails to start a playback sess...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"38090","method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38090,\"title\":\"CI test failures on main: `@azure/arm-kubernetesconfiguration`\",\"body\":\"## Summary\\n\\n1 package affected, 1 test failing as of CI build `#20260410.1` (commit [`41b10c38`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]), 2026-04-10). The test recorder fails to start a playback session with the test proxy, causing the `operation list test` in `@azure/arm-kubernetesconfiguration` to fail. This i...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":38090,"method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":100,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38090,\"title\":\"CI test failures on main: `@azure/arm-kubernetesconfiguration`\",\"body\":\"## Summary\\n\\n1 package affected, 1 test failing as of CI build `#20260410.1` (commit [`41b10c38`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]), 2026-04-10). The test recorder fails to start a playback session with the test proxy, causing the `operation list test` in `@azure/arm-kubernetesconfiguration` to fail. This i...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string (#38247)\",\"author\":{\"name\":\"Chien Yuan Chang\",\"email\":\"ds.chienyuanchang@gmail.com\",\"date\":\"2026-04-23T01:36:35Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-23T01:36:35Z\"}},\"author\":{\"login\":\...`
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","query":"repo:Azure/azure-sdk-for-js is:issue label:test-reliability created:\u003e2026-04-10","repo":"azure-sdk-for-js"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**→`tools/call` `list_pull_requests`
  
  ```json
  {"params":{"arguments":{"base":"main","direction":"desc","owner":"Azure","perPage":30,"repo":"azure-sdk-for-js","sort":"updated","state":"closed"},"name":"list_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":2,\"incomplete_results\":false,\"items\":[{\"id\":4302052084,\"number\":38231,\"state\":\"closed\",\"state_reason\":\"completed\",\"locked\":false,\"title\":\"CI test failures on main: `@azure/event-hubs`\",\"body\":\"## Summary\\n\\nCI analysis of commit [`50208323`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]) (2026-04-20) found **1 package** with actual unit test failures on the CI (playback) pipeline: **...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"number\":38214,\"title\":\"[AutoPR @azure-arm-monitorslis]-generated-from-SDK Generation - JS-6179047\",\"body\":\"Configurations:  \\u0026#39;specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis/tspconfig.yaml\\u0026#39;, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/azure-sdk/internal/_build/results...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38214","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38214,\"title\":\"[AutoPR @azure-arm-monitorslis]-generated-from-SDK Generation - JS-6179047\",\"body\":\"Configurations:  \\u0026#39;specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis/tspconfig.yaml\\u0026#39;, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/azure-sdk/internal/_build/results?...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38247","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38247,\"title\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string\",\"body\":\"### Packages impacted by this PR\\n@azure/ai-content-understanding\\n\\n### Issues associated with this PR\\nNone\\n\\n### Describe the problem that is addressed by this PR\\nThe custom user agent string in contentUnderstandingContext.ts was hardcoded as azsdk-js-ai-content-understanding/1.0.1 incorrectly. It should 1.1.0.\\n\\n### What are...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38194","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38194,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6173815\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38246","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38246,\"title\":\"Prepare release: @azure/core-amqp 4.4.2 and @azure/event-hubs 6.0.4\",\"body\":\"## Release Preparation\\n\\nSets release date to **2026-04-22** for both packages and finalizes changelogs.\\n\\n### @azure/core-amqp 4.4.2\\n- **Bug fix**: Handle `AggregateError` in `translate()` for Node.js 20+ Happy Eyeballs (#38233)\\n- **Bug fix**: Clamp negative `setTimeout` values to 0 for Node.js v24+ (#38166)\\n\\n### @az...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38248","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38248,\"title\":\"Sync eng/common directory with azure-sdk-tools for PR 15253\",\"body\":\"Sync eng/common directory with azure-sdk-tools for PR https://github.com/Azure/azure-sdk-tools/pull/15253  See [eng/common workflow](https://github.com/Azure/azure-sdk-tools/blob/main/eng/common/README.md#workflow)\",\"state\":\"closed\",\"draft\":false,\"merged\":true,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azure...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38176","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38176,\"title\":\"Improve test coverage to ~100% for @azure/core-client\",\"body\":\"## Changes\\n\\n### New test files\\n- base64.spec.ts (node + browser)\\n- interfaceHelpers.spec.ts\\n- operationHelpers.spec.ts\\n- pipeline.spec.ts\\n- utils.spec.ts\\n- urlHelpers.spec.ts (expanded)\\n\\n### Expanded existing tests\\n- deserializationPolicy.spec.ts: error paths, XML parsing, header deserialization\\n- serializationPolicy.spec...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38114","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38114,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6144153\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-04-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipel...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38159","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38159,\"title\":\"[ContentUnderstanding] Expose usage property on AnalysisResultPoller\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-content-understanding`\\n\\n### Issues associated with this PR\\n\\n- https://github.com/Azure/azure-sdk-for-python/issues/46249 (original report in Python SDK)\\n\\n### Describe the problem that is addressed by this PR\\n\\nThe REST API returns a `usage` field in the analyze operat...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38166","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38166,\"title\":\"Fix TimeoutNegativeWarning in event-hubs CBS auth\",\"body\":\"## Summary\\n\\nFixes `TimeoutNegativeWarning` raised by Node.js v24+ when `setTimeout` receives a negative timeout value.\\n\\n#38163\\n\\n## Root Cause\\n\\nIn `sdk/eventhub/event-hubs/src/withAuth.ts`, a deadline pattern computes remaining time as `timeoutAfterStartTime - Date.now()`. If prior steps (opening CBS session, acquiring lock) consume m...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38235","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38235,\"title\":\"fix(loadtesting): Pre fetch storage token to handle OIDC token\",\"body\":\"### Packages impacted by this PR\\n\\nazure/playwright\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test ca...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38244","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38244,\"title\":\"Improve breaking-change agent to enforce guideline reading\",\"body\":\"## What this PR does\\n\\nRestructures the breaking-change agent to prevent it from silently skipping the guidelines file during analysis.\\n\\n### Changes\\n\\n**Agent file (agent.md)**:\\n- Mandatory Execution Protocol -- forces reading guidelines and restating workflow phases before analysis\\n- Execution Phases skeleton -- 5-phase workf...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37869","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37869,\"title\":\"[AutoPR @azure-arm-alertprocessingrules]-generated-from-SDK Generation - JS-6072514\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/AlertProcessingRules/tspconfig.yaml\\u0026#39;, API Version: 2021-08-08, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38183","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38183,\"title\":\"[AutoPR @azure-arm-compute]-generated-from-SDK Generation - JS-6169346\",\"body\":\"Configurations:  \\u0026#39;specification/compute/resource-manager/Microsoft.Compute/Compute/tspconfig.yaml\\u0026#39;, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/azure-sdk/internal/_build/results?buildId=616...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38084","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38084,\"title\":\"[AutoPR @azure-arm-iotoperations]-generated-from-SDK Generation - JS-6132590\",\"body\":\"Configurations:  \\u0026#39;specification/iotoperations/IoTOperations.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38233","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38233,\"title\":\"Handle AggregateError in core-amqp translate() for Node.js 20+ Happy Eyeballs\",\"body\":\"### Packages impacted by this PR\\n\\n- `@azure/core-amqp`\\n- `@azure/event-hubs` (tests only)\\n\\n### Issues associated with this PR\\n\\n- Fixes #38231\\n- Supersedes #38190\\n\\n### Describe the problem that is addressed by this PR\\n\\nNode.js 20+ defaults to Happy Eyeballs (RFC 8305), racing IPv4/IPv6 connections. ...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38239","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38239,\"title\":\"Sync eng/common directory with azure-sdk-tools for PR 15244\",\"body\":\"Sync eng/common directory with azure-sdk-tools for PR https://github.com/Azure/azure-sdk-tools/pull/15244  See [eng/common workflow](https://github.com/Azure/azure-sdk-tools/blob/main/eng/common/README.md#workflow)\",\"state\":\"closed\",\"draft\":false,\"merged\":true,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azure...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38177","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38177,\"title\":\"Improve test coverage to ~100% for @azure-rest/core-client\",\"body\":\"## Changes\\n\\n### New test files\\n- keyCredentialAuthenticationPolicy.spec.ts\\n- operationOptionHelpers.spec.ts\\n\\n### Expanded existing tests\\n- clientHelpers.spec.ts: error handling, pipeline configuration\\n- createRestError.spec.ts: error code paths, replaced {} as PipelineRequest with createPipelineRequest()\\n- getClient.spec.t...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38026","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38026,\"title\":\"[docs] docs: fix inconsistencies in documentation folder\",\"body\":\"### Packages impacted by this PR\\n\\nN/A (documentation only)\\n\\n### Issues associated with this PR\\n\\nFrom Agentic Workflow https://github.com/Azure/azure-sdk-for-js/issues/37982\\n\\n### Describe the problem that is addressed by this PR\\n\\nSeveral documentation files in the `documentation/` folder contained inconsistencies with curre...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38236","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38236,\"title\":\"[EngSys] fix some errors in samples/node test tsconfig\",\"body\":\"They may have been introduced by copy-and-paste.\\n\",\"state\":\"closed\",\"draft\":false,\"merged\":true,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/pull/38236\",\"user\":{\"login\":\"jeremymeng\",\"id\":7583839,\"profile_url\":\"https://github.com/jeremymeng\",\"avatar_url\":\"https://avatars.gith...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38178","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38178,\"title\":\"Improve test coverage to ~100% for @azure/core-lro\",\"body\":\"## Changes\\n\\n### New test files\\n- buildCreatePoller.spec.ts\\n- http-operation.spec.ts\\n- pollHttpOperation.spec.ts\\n- poller-state-guard.spec.ts\\n- pollerInternals.spec.ts\\n\\n### Expanded existing tests\\n- lro.spec.ts: serialization/restore, submitted(), polling intervals, error states\\n- rewriteUrl.spec.ts: undefined URL handling\\n\\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38220","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38220,\"title\":\"[docs] Fix documentation inconsistencies across documentation/ folder\",\"body\":\"I reviewed and these mostly look good IMO. From the Agentic Workflow\\u0026#39;s issue #38215.\\n\\n- Fix incorrect pnpm install command (@pnpm → pnpm) in Generate-code-from-TypeSpec.md\\n- Remove invalid \\u0026#39;npm install -g common/tools/dev-tool\\u0026#39; from RLC-Swagger-quickstart.md and steps-after-generations.md\\n-...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38036","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38036,\"title\":\"[VoiceLive] Add OpenTelemetry tracing instrumentation\",\"body\":\"### Impacted package\\n@azure/ai-voicelive\\n\\n# VoiceLive SDK Telemetry — Design Document\\n\\n## 1. Overview\\n\\nThe `@azure/ai-voicelive` SDK provides opt-in OpenTelemetry tracing for real-time WebSocket voice sessions. When enabled, the SDK automatically emits spans for every WebSocket operation, following [GenAI Semantic Conventions v1....`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38137","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38137,\"title\":\"[AutoPR @azure-arm-cosmosdb]-generated-from-SDK Generation - JS-6150781\",\"body\":\"Configurations:  \\u0026#39;specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: h...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38165","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38165,\"title\":\"feat(communication-ten-dlc): add numberPoolStatus to USCampaign -#4508832\",\"body\":\"## Summary\\n\\nAdd `numberPoolStatus` field to the `USCampaign` TypeScript type in the `@azure-tools/communication-ten-dlc` SDK package and adopt the standard Azure SDK extensible-enum pattern (`Known*` enums) for all extensible string-union types in the package.\\n\\nThe field is **nullable** — campaigns that predate Numb...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38113","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38113,\"title\":\"[AutoPR @azure-arm-communication]-generated-from-SDK Generation - JS-6144115\",\"body\":\"Configurations:  \\u0026#39;specification/communication/Communication.Management/tspconfig.yaml\\u0026#39;, API Version: 2026-03-18, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38229","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38229,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6184505\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-03-20, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38182","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38182,\"title\":\"Improve test coverage to ~100% for @azure/core-util\",\"body\":\"## Changes\\n\\n### New test files\\n- error.spec.ts\\n- indexExports.spec.ts\\n\\n### Expanded existing tests\\n- aborterUtils.spec.ts: cleanup callbacks, abort propagation, race conditions\\n- delay.spec.ts: abort signal handling\\n- typeGuards.spec.ts: type guard edge cases\\n\\n### Test quality improvements\\n- Replaced boolean abort flags wit...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38100","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38100,\"title\":\"Sync eng/common directory with azure-sdk-tools for PR 15062\",\"body\":\"Sync eng/common directory with azure-sdk-tools for PR https://github.com/Azure/azure-sdk-tools/pull/15062  See [eng/common workflow](https://github.com/Azure/azure-sdk-tools/blob/main/eng/common/README.md#workflow)\",\"state\":\"closed\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38247","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38247,\"title\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string\",\"body\":\"### Packages impacted by this PR\\n@azure/ai-content-understanding\\n\\n### Issues associated with this PR\\nNone\\n\\n### Describe the problem that is addressed by this PR\\nThe custom user agent string in contentUnderstandingContext.ts was hardcoded as azsdk-js-ai-content-understanding/1.0.1 incorrectly. It should 1.1.0.\\n\\n### What are...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38247,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38247,\"title\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string\",\"body\":\"### Packages impacted by this PR\\n@azure/ai-content-understanding\\n\\n### Issues associated with this PR\\nNone\\n\\n### Describe the problem that is addressed by this PR\\nThe custom user agent string in contentUnderstandingContext.ts was hardcoded as azsdk-js-ai-content-understanding/1.0.1 incorrectly. It should 1.1.0.\\n\\n### What are...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38247","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38247,\"title\":\"[ContentUnderstanding] Fix 1.1.0 user agent version string\",\"body\":\"### Packages impacted by this PR\\n@azure/ai-content-understanding\\n\\n### Issues associated with this PR\\nNone\\n\\n### Describe the problem that is addressed by this PR\\nThe custom user agent string in contentUnderstandingContext.ts was hardcoded as azsdk-js-ai-content-understanding/1.0.1 incorrectly. It should 1.1.0.\\n\\n### What are...`
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","query":"repo:Azure/azure-sdk-for-js kubernetesconfiguration is:merged merged:\u003e2026-04-10","repo":"azure-sdk-for-js"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"38090","method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38090,\"title\":\"CI test failures on main: `@azure/arm-kubernetesconfiguration`\",\"body\":\"## Summary\\n\\n1 package affected, 1 test failing as of CI build `#20260410.1` (commit [`41b10c38`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]), 2026-04-10). The test recorder fails to start a playback session with the test proxy, causing the `operation list test` in `@azure/arm-kubernetesconfiguration` to fail. This i...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":38090,"method":"get_comments","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"[]","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"38090","method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38090,\"title\":\"CI test failures on main: `@azure/arm-kubernetesconfiguration`\",\"body\":\"## Summary\\n\\n1 package affected, 1 test failing as of CI build `#20260410.1` (commit [`41b10c38`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]), 2026-04-10). The test recorder fails to start a playback session with the test proxy, causing the `operation list test` in `@azure/arm-kubernetesconfiguration` to fail. This i...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38218","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38218,\"title\":\"[EngSys] automatic pnpm update\",\"body\":\"This is an automatic PR generated weekly with changes from running the command pnpm update\",\"state\":\"closed\",\"draft\":false,\"merged\":true,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/pull/38218\",\"user\":{\"login\":\"azure-sdk\",\"id\":53356347,\"profile_url\":\"https://github.com/azure-sdk\",\"avatar_url\":\"https:...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38218,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":16,\"check_runs\":[{\"id\":72170839063,\"name\":\"Handle pull_request_target closed event with azure login\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24679001198/job/72170839063\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24679001198/job/72170839063\",\"started_at\":\"2026-04-20T16:50:13Z\",\"completed_at\":\"2026...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38218","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38218,\"title\":\"[EngSys] automatic pnpm update\",\"body\":\"This is an automatic PR generated weekly with changes from running the command pnpm update\",\"state\":\"closed\",\"draft\":false,\"merged\":true,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/pull/38218\",\"user\":{\"login\":\"azure-sdk\",\"id\":53356347,\"profile_url\":\"https://github.com/azure-sdk\",\"avatar_url\":\"https:...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38232","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38232,\"title\":\"[storage-file-datalake] migrate to typespec-based code generation\",\"body\":\"This depends on the new migrated version of blob package. The migrated datalake package will not work with old and published autorest-based versions of blob package due to the HTTP request pipeline differences.\",\"state\":\"open\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38232,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","query":"repo:Azure/azure-sdk-for-js is:issue created:\u003e2026-04-21 label:bug","repo":"azure-sdk-for-js"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":4307791545,\"number\":38243,\"state\":\"open\",\"locked\":false,\"title\":\"@azure/arm-cognitiveservices doesn't have ModelProviderData property for creating model deployment.\",\"body\":\"- **Package Name**: @azure/arm-cognitiveservices\\n- **Package Version**: 8.1.0\\n- **Operating system**:\\n- [ ] **nodejs**\\n    - **version**: \\n- [ ] **browser**\\n    - **name/versio...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":22,\"check_runs\":[{\"id\":72622769173,\"name\":\"js - storage-file-datalake - tests\",\"status\":\"completed\",\"conclusion\":\"failure\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/72622769173\",\"details_url\":\"https://dev.azure.com/azure-sdk/590cfd2a-581c-4dcb-a12e-6568ce786175/_build/results?buildId=6195805\",\"started_at\":\"2026-04-23T02:00:01Z\",\"completed_at\":\"2026-04-23T02:29:07Z\"},{\"id\":7...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38232","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38232,\"title\":\"[storage-file-datalake] migrate to typespec-based code generation\",\"body\":\"This depends on the new migrated version of blob package. The migrated datalake package will not work with old and published autorest-based versions of blob package due to the HTTP request pipeline differences.\",\"state\":\"open\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38232","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38232,\"title\":\"[storage-file-datalake] migrate to typespec-based code generation\",\"body\":\"This depends on the new migrated version of blob package. The migrated datalake package will not work with old and published autorest-based versions of blob package due to the HTTP request pipeline differences.\",\"state\":\"open\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38232,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38232,\"title\":\"[storage-file-datalake] migrate to typespec-based code generation\",\"body\":\"This depends on the new migrated version of blob package. The migrated datalake package will not work with old and published autorest-based versions of blob package due to the HTTP request pipeline differences.\",\"state\":\"open\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38232","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38232,\"title\":\"[storage-file-datalake] migrate to typespec-based code generation\",\"body\":\"This depends on the new migrated version of blob package. The migrated datalake package will not work with old and published autorest-based versions of blob package due to the HTTP request pipeline differences.\",\"state\":\"open\",\"draft\":false,\"merged\":false,\"mergeable_state\":\"blocked\",\"html_url\":\"https://github.com/Azur...`
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":10,"query":"repo:Azure/azure-sdk-for-js is:open base:main updated:\u003e2026-04-22","repo":"azure-sdk-for-js","sort":"updated"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":15,\"incomplete_results\":false,\"items\":[{\"id\":4315237412,\"number\":38260,\"state\":\"open\",\"locked\":false,\"title\":\"docs(loadtesting): changelog update for v1.1.5 @azure/playwright\",\"body\":\"### Packages impacted by this PR\\r\\n@azure/playwright\\r\\n\\r\\n### Issues associated with this PR\\r\\n\\r\\n\\r\\n### Describe the problem that is addressed by this PR\\r\\n\\r\\n\\r\\n### What are the possible design...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38260","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38260,\"title\":\"docs(loadtesting): changelog update for v1.1.5 @azure/playwright\",\"body\":\"### Packages impacted by this PR\\n@azure/playwright\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38260,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38245","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38245,\"title\":\"Add breaking-change analysis agent for ARM SDK migrations\",\"body\":\"## What this PR does\\n\\nAdds a new Copilot agent (\\\\mgmt-breaking-change-analysis\\\\) that analyzes breaking changes in ARM management SDK PRs migrating from Swagger/AutoRest to TypeSpec/emitter.\\n\\n### Files\\n\\n- **\\\\.github/agents/mgmt-breaking-change-analysis.agent.md\\\\** -- Agent definition with mandatory execution protocol,...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38245,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":34,\"check_runs\":[{\"id\":72678380126,\"name\":\"js - appnetwork - mgmt\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/72678380126\",\"details_url\":\"https://dev.azure.com/azure-sdk/590cfd2a-581c-4dcb-a12e-6568ce786175/_build/results?buildId=6198146\",\"started_at\":\"2026-04-23T10:21:16Z\",\"completed_at\":\"2026-04-23T10:41:27Z\"},{\"id\":72678376110,\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38260","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":12,\"check_runs\":[{\"id\":72666128653,\"name\":\"license/cla\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/72666128653\",\"details_url\":\"https://github.com/apps/microsoft-github-policy-service\",\"started_at\":\"2026-04-23T09:17:15Z\",\"completed_at\":\"2026-04-23T09:17:15Z\"},{\"id\":72486282221,\"name\":\"js - pullrequest\",\"status\":\"completed\",\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38260,\"title\":\"docs(loadtesting): changelog update for v1.1.5 @azure/playwright\",\"body\":\"### Packages impacted by this PR\\n@azure/playwright\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If there are more than one possible design, why was the one in this PR chosen?\\n\\n\\n### Are there test...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38245","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38245,\"title\":\"Add breaking-change analysis agent for ARM SDK migrations\",\"body\":\"## What this PR does\\n\\nAdds a new Copilot agent (\\\\mgmt-breaking-change-analysis\\\\) that analyzes breaking changes in ARM management SDK PRs migrating from Swagger/AutoRest to TypeSpec/emitter.\\n\\n### Files\\n\\n- **\\\\.github/agents/mgmt-breaking-change-analysis.agent.md\\\\** -- Agent definition with mandatory execution protocol,...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38256","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38256,\"title\":\"feat(warp): add tsgo compiler mode using TypeScript 7 native CLI\",\"body\":\"## Summary\\n\\nAdd a new `--compiler tsgo` flag to warp that uses the native Go-based TypeScript compiler (`tsgo`) from `@typescript/native-preview` for ~10x faster builds.\\n\\n## What\\u0026#39;s changed\\n\\n### New: `--compiler tsgo` CLI flag\\nWhen `--compiler tsgo` is passed, warp uses the `tsgo` CLI binary instead of the TypeS...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38256,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38228","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38228,\"title\":\"[AutoPR @azure-arm-compute]-generated-from-SDK Generation - JS-6183422\",\"body\":\"Configurations:  \\u0026#39;specification/compute/resource-manager/Microsoft.Compute/Compute/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","perPage":100,"pullNumber":38228,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":14,\"check_runs\":[{\"id\":72645168735,\"name\":\"js - pullrequest\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/72645168735\",\"details_url\":\"https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6196875\",\"started_at\":\"2026-04-23T05:54:11Z\",\"completed_at\":\"2026-04-23T06:40:07Z\"},{\"id\":72645166827,\"name\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38256","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38256,\"title\":\"feat(warp): add tsgo compiler mode using TypeScript 7 native CLI\",\"body\":\"## Summary\\n\\nAdd a new `--compiler tsgo` flag to warp that uses the native Go-based TypeScript compiler (`tsgo`) from `@typescript/native-preview` for ~10x faster builds.\\n\\n## What\\u0026#39;s changed\\n\\n### New: `--compiler tsgo` CLI flag\\nWhen `--compiler tsgo` is passed, warp uses the `tsgo` CLI binary instead of the TypeS...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":13,\"check_runs\":[{\"id\":72648081700,\"name\":\"js - pullrequest\",\"status\":\"completed\",\"conclusion\":\"failure\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/72648081700\",\"details_url\":\"https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6197162\",\"started_at\":\"2026-04-23T06:47:08Z\",\"completed_at\":\"2026-04-23T07:05:11Z\"},{\"id\":72648075118,\"name\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38228","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38228,\"title\":\"[AutoPR @azure-arm-compute]-generated-from-SDK Generation - JS-6183422\",\"body\":\"Configurations:  \\u0026#39;specification/compute/resource-manager/Microsoft.Compute/Compute/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38228","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38228,\"title\":\"[AutoPR @azure-arm-compute]-generated-from-SDK Generation - JS-6183422\",\"body\":\"Configurations:  \\u0026#39;specification/compute/resource-manager/Microsoft.Compute/Compute/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38228,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38228,\"title\":\"[AutoPR @azure-arm-compute]-generated-from-SDK Generation - JS-6183422\",\"body\":\"Configurations:  \\u0026#39;specification/compute/resource-manager/Microsoft.Compute/Compute/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38228","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38228,\"title\":\"[AutoPR @azure-arm-compute]-generated-from-SDK Generation - JS-6183422\",\"body\":\"Configurations:  \\u0026#39;specification/compute/resource-manager/Microsoft.Compute/Compute/tspconfig.yaml\\u0026#39;, API Version: 2025-11-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azur...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"message":"CI analysis complete — no new failures found. All recently merged PRs (#38247, #38246, #38176, #38259) have green CI check runs. The two open PRs with failing CI (#38228 compute SDK TypeSpec migration, #38232 storage-file-datalake TypeSpec migration) are unmerged and their failures are specific to those PRs' own massive TypeSpec-migration changes. The previously tracked event-hubs AggregateError failure (issue #38231) was fixed and c...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
