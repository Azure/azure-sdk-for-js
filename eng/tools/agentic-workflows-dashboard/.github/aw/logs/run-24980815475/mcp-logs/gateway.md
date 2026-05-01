<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 38290.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get details of GitHub Actions resources (workflows, workflow runs, jobs, and artifacts)"},"description":"Get details about specific GitHub Actions resources.\nUse this tool to get details about individual workflows, workflow runs, jobs, and artifacts by their unique IDs.\n","inputSchema":{"properties":{"method":{"description":"The method to execute","enum":["get_workflow","get_workflow_run","get_workflow_job","download_w...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38290","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38290,\"title\":\"[AutoPR @azure-arm-prometheusrulegroups]-generated-from-SDK Generation - JS-6212382\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/PrometheusRuleGroups/tspconfig.yaml\\u0026#39;, API Version: 2023-03-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38290,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38290,\"title\":\"[AutoPR @azure-arm-prometheusrulegroups]-generated-from-SDK Generation - JS-6212382\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/PrometheusRuleGroups/tspconfig.yaml\\u0026#39;, API Version: 2023-03-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38290","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38290,\"title\":\"[AutoPR @azure-arm-prometheusrulegroups]-generated-from-SDK Generation - JS-6212382\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/PrometheusRuleGroups/tspconfig.yaml\\u0026#39;, API Version: 2023-03-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38290","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38290,\"title\":\"[AutoPR @azure-arm-prometheusrulegroups]-generated-from-SDK Generation - JS-6212382\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/PrometheusRuleGroups/tspconfig.yaml\\u0026#39;, API Version: 2023-03-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":38290,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38290","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":3,\"changes\":3,\"patch\":\"@@ -1678,6 +1678,9 @@ sdk/alertprocessingrules/arm-alertprocessingrules/ @qiaozha @MaryGao @JialinHuan\\n # PRLabel: %Mgmt %mgmt-review-needed\\n sdk/alertrulerecommendations/arm-alertrulerecommendations/ @qiaozha @MaryGao @JialinHuang803\\n \\n+# PRLabel: %Mgmt %mgmt-review-needed\\n+sdk/prometheusrulegroups/arm-prometheusrulegroups/ @qi...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38290,\"title\":\"[AutoPR @azure-arm-prometheusrulegroups]-generated-from-SDK Generation - JS-6212382\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/PrometheusRuleGroups/tspconfig.yaml\\u0026#39;, API Version: 2023-03-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":38290,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38290","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38290,\"title\":\"[AutoPR @azure-arm-prometheusrulegroups]-generated-from-SDK Generation - JS-6212382\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/PrometheusRuleGroups/tspconfig.yaml\\u0026#39;, API Version: 2023-03-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":135,\"check_runs\":[{\"id\":73143501153,\"name\":\"js - pullrequest (Build Analyze)\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/73143501153\",\"details_url\":\"https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6212570\\u0026view=logs\\u0026jobId=b70e5e73-bbb6-5567-0939-8415943fadb9\",\"started_at\":\"2026-04-27T...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38290","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38290,\"title\":\"[AutoPR @azure-arm-prometheusrulegroups]-generated-from-SDK Generation - JS-6212382\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/PrometheusRuleGroups/tspconfig.yaml\\u0026#39;, API Version: 2023-03-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":136,\"name\":\"CHANGELOG.md\",\"path\":\"sdk/prometheusrulegroups/arm-prometheusrulegroups/CHANGELOG.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/CHANGELOG.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups/CHANGELOG.md","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups/review","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups/metadata.json","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups/package.json","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":915,\"name\":\"arm-prometheusrulegroups-api-node.api.md\",\"path\":\"sdk/prometheusrulegroups/arm-prometheusrulegroups/review/arm-prometheusrulegroups-api-node.api.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/review/arm-prometheusrulegroups-api-node.api.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/metadata.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"apiVersions\": {\n    \"Microsoft.AlertsManagement\": \"2023-03-01\"\n  },\n  \"emitterVersion\": \"0.52.3\",\n  \"crossLanguageDefinitions\": {\n    \"CrossLanguagePackageId\": \...`
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"successfully downloaded text file (SHA: [REDACTED])","type":"text"},{"resource":{"mimeType":"text/plain; charset=utf-8","text":"# Release History\n    \n## 1.0.0-beta.1 (2026-04-27)\n\n### Features Added\n\nInitial release of the @azure/arm-prometheusrulegroups package\n","uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/CHANGELOG.md"},"type":"resource"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-prometheusrulegroups\",\n  \"version\": \"1.0.0-beta.1\",\n  \"description\": \"A generated SDK for PrometheusRuleGroupsManagementClient.\",\n  \"engines\": {\...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups/review/arm-prometheusrulegroups-node.api.md","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups/src","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"api\",\"path\":\"sdk/prometheusrulegroups/arm-prometheusrulegroups/src/api\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/src/api?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/trees/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/tree/[REDAC...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/review/arm-prometheusrulegroups-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-prometheusrulegroups\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extracto...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups/src/api","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":337,\"name\":\"index.ts\",\"path\":\"sdk/prometheusrulegroups/arm-prometheusrulegroups/src/api/index.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/src/api/index.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/az...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/prometheusrulegroups/arm-prometheusrulegroups/src/api/prometheusRuleGroupsManagementContext.ts","ref":"refs/pull/38290/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/prometheusrulegroups/arm-prometheusrulegroups/src/api/prometheusRuleGroupsManagementContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions } from ...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"No API design issues found. The `@azure/arm-prometheusrulegroups` 1.0.0-beta.1 package looks clean: version is consistently `1.0.0-beta.1` across `package.json`, the context file (`prometheusRuleGroupsManagementContext.ts`), and `CHANGELOG.md`; no alpha versions; no `_N`/`AutoGenerated` naming issues; no type-safety (`unknown`/`void`) misuse; `KnownVersions` correctly exposes `2023-03-01`; and no client-name or constructor-parameter conce...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- ⏳ js - pullrequest (Build UnitTest ubuntu_22x_node): still running.\n- ⏳ js - pullrequest (Build UnitTest windows_20x_node): still running.\n- ⏳ js - pullrequest (Build UnitTest macoslatest_24x_node): still running.\n- ⏳ js - pullrequest (Build UnitTest windows_20x_browser): still running.\n\n\u003c!-- mgmt-review-bot --\u003e"},"name":"add_comm...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_8v7A31pu\",\"comment\":\"#aw_8v7A31pu\"}","type":"text"}]}}
  ```
