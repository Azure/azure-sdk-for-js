<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 38212.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38212,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":38212,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":1,\"deletions\":1,\"changes\":2,\"patch\":\"@@ -466,7 +466,7 @@\\n # PRLabel: %Mgmt\\n /sdk/containerregistry/arm-containerregistry/ @qiaozha @MaryGao @JialinHuang803\\n \\n-# PRLabel: %Mgmt\\n+# PRLabel: %Mgmt %mgmt-review-needed\\n /sdk/containerservice/arm-containerservice/      @qiaozha @MaryGao @JialinHuang803\\n \\n # PRLabel: %Mgmt\"},{\"filename\":\"pnpm-loc...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":38212,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":122,\"check_runs\":[{\"id\":72056703618,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24645265165/job/72056703618\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24645265165/job/72056703618\",\"started_at\":\"2026-04-20T02:14:23Z\"},{\"id\":72056700468,\"name\":\"license/cla\",\"status\":\"completed\",\"conclusion\":\"success\",...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/containerservice/arm-containerservice/CHANGELOG.md","ref":"refs/pull/38212/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/containerservice/arm-containerservice/package.json","ref":"refs/pull/38212/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/containerservice/arm-containerservice/metadata.json","ref":"refs/pull/38212/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/containerservice/arm-containerservice/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-containerservice\",\n  \"version\": \"25.1.0-beta.2\",\n  \"description\": \"A generated SDK for ContainerServiceClient.\",\n  \"engines\": {\n    \"node\": \"\u003e=2...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/containerservice/arm-containerservice/metadata.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"apiVersions\": {\n    \"Microsoft.ContainerService\": \"2026-02-02-preview\"\n  },\n  \"emitterVersion\": \"0.52.2\",\n  \"crossLanguageDefinitions\": {\n    \"CrossLanguagePackageId\": \...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/containerservice/arm-containerservice/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 25.1.0-beta.2 (2026-04-20)\nCompared with version 25.0.0\n\n### Features Added\n  - Added operation group ContainerServiceOperations\n  - Added operation group IdentityBin...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/containerservice/arm-containerservice/package.json","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/containerservice/arm-containerservice/CHANGELOG.md","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/containerservice/arm-containerservice/metadata.json","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/containerservice/arm-containerservice/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-containerservice\",\n  \"version\": \"25.1.0-beta.1\",\n  \"description\": \"A generated SDK for ContainerServiceClient.\",\n  \"engines\": {\n    \"node\": \"\u003e=2...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/containerservice/arm-containerservice/metadata.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"apiVersions\": {\n    \"Microsoft.ContainerService\": \"2026-01-02-preview\"\n  },\n  \"emitterVersion\": \"0.51.0\",\n  \"crossLanguageDefinitions\": {\n    \"CrossLanguagePackageId\": \...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/containerservice/arm-containerservice/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 25.1.0-beta.1 (2026-03-31)\nCompared with version 25.0.0\n\n### Features Added\n  - Added operation group ContainerServiceOperations\n  - Added operation group IdentityBin...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/containerservice/arm-containerservice/review/arm-containerservice-node.api.md","ref":"refs/pull/38212/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/containerservice/arm-containerservice/review/arm-containerservice-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/arm-containerservice\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```t...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":38212,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"pending\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":46234544997,\"node_id\":\"SC_kwDOBnSy6c8AAAAKw8srZQ\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"pending\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24643625263\",\"description\":\"Waiting for all checks to succeed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avata...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","repo":"azure-sdk-for-js","resource_id":"checkenforcer.yml","workflow_runs_filter":{"branch":"sdkauto/@azure-arm-containerservice-6178337"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to list workflow runs: GET https://api.github.com/repos/Azure/azure-sdk-for-js/actions/workflows/checkenforcer.yml/runs?branch=sdkauto%2F%40azure-arm-containerservice-6178337\u0026page=1\u0026per_page=30: 404 Not Found []","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38212","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38212,\"title\":\"[AutoPR @azure-arm-containerservice]-generated-from-SDK Generation - JS-6178337\",\"body\":\"Configurations:  \\u0026#39;specification/containerservice/resource-manager/Microsoft.ContainerService/aks/tspconfig.yaml\\u0026#39;, API Version: 2026-02-02-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; P...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":38212,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get pull request diff: GET https://api.github.com/repos/Azure/azure-sdk-for-js/pulls/38212: 406 Sorry, the diff exceeded the maximum number of files (300). Consider using 'List pull requests files' API or locally cloning the repository instead. [{Resource:PullRequest Field:diff Code:too_large Message:}]","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Tool Issue** — `CHANGELOG.md:4`\n`Compared with version 25.0.0`.\nThe current version on `main` is `25.1.0-beta.1`, so this release (`25.1.0-beta.2`) should compare with `25.1.0-beta.1`, not `25.0.0`. The tool skipped over the previous beta and compared against the last stable, which misrepresents the delta.\n**Fix:** Update the comparison base from `25.0.0` to `25.1.0-beta.1`, and report the issue in the [generation tool reposit...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"**1 tool issue found** for `@azure/arm-containerservice` `25.1.0-beta.2`.\n\nThe `CHANGELOG.md` incorrectly compares with `25.0.0` (the last stable) instead of `25.1.0-beta.1` (the previous beta currently on `main`). No public API design issues were found — the client name (`ContainerServiceClient`) is unchanged, the new API version (`2026-02-02-preview`) is strictly newer than the one on `main` (`2026-01-02-preview`), and `KnownVersion...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- ❌ **UnitTest** (all environments — ubuntu_22x_node, windows_20x_node): Stale test recordings. The tests request `api-version=2026-02-02-preview` but recordings were made against `api-version=2026-01-02-preview`. Action: Re-record tests or skip with maintainer approval. See the [test guide](https://github.com/Azure/azure-sdk-for-js/blob/main/document...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_7H2ewePJ\",\"comment\":\"#aw_7H2ewePJ\"}","type":"text"}]}}
  ```
