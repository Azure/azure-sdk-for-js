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
- ✓ **startup** Routes: /mcp/<server> for servers: [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37558,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37558,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37558,\"title\":\"[AutoPR @azure-arm-alertprocessingrules]-generated-from-SDK Generation - JS-5985665\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/AlertProcessingRules/tspconfig.yaml\\u0026#39;, API Version: 2021-08-08, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-spe...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":3,\"changes\":3,\"patch\":\"@@ -1644,6 +1644,9 @@ sdk/containerregistry/arm-containerregistrytasks/ @qiaozha @MaryGao @JialinHuang\\n # PRLabel: %Mgmt\\n sdk/artifactsigning/arm-artifactsigning/ @qiaozha @MaryGao @JialinHuang803\\n \\n+# PRLabel: %Mgmt\\n+sdk/alertprocessingrules/arm-alertprocessingrules/ @qiaozha @MaryGao @JialinHuang803\\n+\\n ###########\\n # Con...`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","per_page":10,"repo":"azure-sdk-for-js","workflow_runs_filter":{"status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1027321,\"workflow_runs\":[{\"id\":22276391602,\"name\":\"GitHub Scheduled Event Processor\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFL8bCsg\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/scheduled-event-processor.yml\",\"run_number\":18271,\"run_attempt\":1,\"event\":\"schedule\",\"display_title\":\"GitHub Scheduled Event Processor\",\"status\":\"completed\",\"conclusion\":\"success\",\"workfl...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37558,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/alertprocessingrules/arm-alertprocessingrules/CHANGELOG.md","ref":"refs/pull/37558/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/alertprocessingrules/arm-alertprocessingrules/package.json","ref":"refs/pull/37558/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/alertprocessingrules/arm-alertprocessingrules/review/arm-alertprocessingrules-node.api.md","ref":"refs/pull/37558/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/alertprocessingrules/arm-alertprocessingrules/review/arm-alertprocessingrules-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-alertprocessingrules\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extracto...`
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"successfully downloaded text file (SHA: [REDACTED])","type":"text"},{"resource":{"mimeType":"text/plain; charset=utf-8","text":"# Release History\n    \n## 1.0.0-beta.1 (2026-03-10)\n\n### Features Added\n\nInitial release of the @azure/arm-alertprocessingrules package\n","uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/alertprocessingrules/arm-alertprocessingrules/CHANGELOG.md"},"type":"resource"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/alertprocessingrules/arm-alertprocessingrules/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-alertprocessingrules\",\n  \"version\": \"1.0.0-beta.1\",\n  \"description\": \"A generated SDK for AlertsManagementClient.\",\n  \"engines\": {\n    \"node\":...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":61,\"check_runs\":[{\"id\":68829440127,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630772132/job/68829440127\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630772132/job/68829440127\",\"started_at\":\"2026-03-27T04:12:03Z\"},{\"id\":68829395360,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"success\",\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/alertprocessingrules/arm-alertprocessingrules/review/arm-alertprocessingrules-node.api.md","ref":"refs/pull/37558/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/alertprocessingrules/arm-alertprocessingrules/src/api/alertsManagementContext.ts","ref":"refs/pull/37558/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/alertprocessingrules/arm-alertprocessingrules/review/arm-alertprocessingrules-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-alertprocessingrules\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extracto...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/alertprocessingrules/arm-alertprocessingrules/src/api/alertsManagementContext.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { logger } from \"../logger.js\";\nimport { KnownVersions } from \"../models/mo...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37558,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"diff --git a/.github/CODEOWNERS b/.github/CODEOWNERS\nindex 34e8fc1a0737..54b4802bb18f 100644\n--- a/.github/CODEOWNERS\n+++ b/.github/CODEOWNERS\n@@ -1644,6 +1644,9 @@ sdk/containerregistry/arm-containerregistrytasks/ @qiaozha @MaryGao @JialinHuang\n # PRLabel: %Mgmt\n sdk/artifactsigning/arm-artifactsigning/ @qiaozha @MaryGao @JialinHuang803\n \n+# PRLabel: %Mgmt\n+sdk/alertprocessingrules/arm-alertprocessingrules/ @qiaozha @MaryGao @Jial...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Design Issue** — `AzureSupportedClouds` uses a closed template literal union type\n\n```ts\nexport type AzureSupportedClouds = `${AzureClouds}`;\n```\n\nA closed template literal type over an enum means the type cannot be extended as new cloud values are added by the service. It also breaks forward-compatibility for SDK consumers. The recommended pattern is to keep the type open:\n\n```ts\nexport type AzureSupportedClouds = strin...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Design Issue** — `AzureClouds` enum members use `UPPER_SNAKE_CASE`\n\n```ts\nexport enum AzureClouds {\n    AZURE_CHINA_CLOUD = \"AZURE_CHINA_CLOUD\",\n    AZURE_PUBLIC_CLOUD = \"AZURE_PUBLIC_CLOUD\",\n    AZURE_US_GOVERNMENT = \"AZURE_US_GOVERNMENT\"\n}\n```\n\nPer Azure SDK guidelines, enum members should use `PascalCase`. The expected shape is:\n\n```ts\nexport enum AzureClouds {\n    AzureChinaCloud = \"AZURE_CHINA_CLOUD\",\n...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `KnownVersions.V20210808` has a synthetic `V` prefix\n\n```ts\nexport enum KnownVersions {\n    V20210808 = \"2021-08-08\"\n}\n```\n\nTypeScript identifiers cannot start with a digit, so the generator prepends `V` to the date-based version string. The resulting name `V20210808` is non-idiomatic and surprising to SDK consumers.\n\n**Fix:** Add a `@clientName(\"Ga20210808\")` (or a more descriptive name) decorator on...`
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
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"3 issues found in `@azure/arm-alertprocessingrules` (v1.0.0-beta.1, API version 2021-08-08): two design issues and one tool issue — all in the `arm-alertprocessingrules-node.api.md` API surface file. CI is not yet fully evaluated (the review agent job is still in-progress for this run). The PR is a new package initial release.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\u003c/summary\u003e\n\n```json\n{\"agent\":\"...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":6,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
