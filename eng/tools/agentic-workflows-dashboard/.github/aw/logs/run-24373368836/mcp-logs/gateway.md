<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"deletions\":429,\"changes\":429,\"patch\":\"@@ -33350,156 +33350,24 @@ packages:\\n   '@epic-web/invariant@1.0.0':\\n     resolution: {integrity: sha1-EHPl3ubdVAQQeEmQ63PkrNJcmBM=}\\n \\n-  '@esbuild/aix-ppc64@0.27.7':\\n-    resolution: {integrity: sha1-grdPkqp41yC3FBYpOfskjJCt31M=}\\n-    engines: {node: '\\u003e=18'}\\n-    cpu: [ppc64]\\n-    os: [aix]\\n-\\n-  '@esbuild/androi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":160,\"check_runs\":[{\"id\":71181695247,\"name\":\"license/cla\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/71181695247\",\"details_url\":\"https://github.com/apps/microsoft-github-policy-service\",\"started_at\":\"2026-04-14T00:03:48Z\",\"completed_at\":\"2026-04-14T00:03:48Z\"},{\"id\":71181672478,\"name\":\"agent\",\"status\":\"in_progress\",\"html_ur...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"deletions\":429,\"changes\":429,\"patch\":\"@@ -33350,156 +33350,24 @@ packages:\\n   '@epic-web/invariant@1.0.0':\\n     resolution: {integrity: sha1-EHPl3ubdVAQQeEmQ63PkrNJcmBM=}\\n \\n-  '@esbuild/aix-ppc64@0.27.7':\\n-    resolution: {integrity: sha1-grdPkqp41yC3FBYpOfskjJCt31M=}\\n-    engines: {node: '\\u003e=18'}\\n-    cpu: [ppc64]\\n-    os: [aix]\\n-\\n-  '@esbuild/androi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/review","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/review","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":63501,\"name\":\"ai-projects-node.api.md\",\"path\":\"sdk/ai/ai-projects/review/ai-projects-node.api.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/review/ai-projects-node.api.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/bl...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":79509,\"name\":\"ai-projects-node.api.md\",\"path\":\"sdk/ai/ai-projects/review/ai-projects-node.api.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/review/ai-projects-node.api.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/bl...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/review/ai-projects-node.api.md","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/review/ai-projects-node.api.md","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/review/ai-projects-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/ai-projects\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type { ClientOptions } from '...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/review/ai-projects-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/ai-projects\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type { ClientOptions } from '...`
- 🔍 rpc **github**→`tools/call` `list_tags`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":30,"repo":"azure-sdk-for-js"},"name":"list_tags"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/package.json","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/ai-projects\",\n  \"version\": \"2.1.0\",\n  \"description\": \"Azure AI Projects client library.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },\n  \"sideEffects\": false,\n  \"auto...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"name\":\"@typespec/ts-http-runtime_0.3.5\",\"sha\":\"[REDACTED]\"},{\"name\":\"@typespec/ts-http-runtime_0.3.4\",\"sha\":\"[REDACTED]\"},{\"name\":\"@typespec/ts-http-runtime_0.3.3\",\"sha\":\"[REDACTED]\"},{\"name\":\"@typespec/ts-http-runtime_0.3.2\",\"sha\":\"[REDACTED]\"},{\"name\":\"@typespec/ts-http-runtime_0.3.1\",\"sha\":\"[REDACTED]\"},{\"name\":\"@typespec/ts-http-runtime_0.3.0\",\"sha\":\"[REDACTED]\"},{\"name\":\"@typespec/t...`
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"query":"repo:Azure/azure-sdk-for-js @azure/ai-projects"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_latest_release`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-js"},"name":"get_latest_release"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"tag_name\":\"@azure/playwright_1.1.4\",\"target_commitish\":\"[REDACTED]\",\"name\":\"@azure/playwright_1.1.4\",\"body\":\"\",\"draft\":false,\"prerelease\":false,\"id\":307455709,\"created_at\":\"2026-04-10T08:46:32Z\",\"published_at\":\"2026-04-10T09:11:48Z\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/releases/307455709\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/releases/tag/%40azure/playwright_1.1.4\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":108311273,\"name\":\"azure-sdk-for-js\",\"full_name\":\"Azure/azure-sdk-for-js\",\"description\":\"This repository is for active development of the Azure SDK for JavaScript (NodeJS \\u0026 Browser). For consumers of the SDK we recommend visiting our public developer docs at https://docs.microsoft.com/javascript/azure/ or our versioned developer docs at https://azure.github.i...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/CHANGELOG.md","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-js is:pr @azure/ai-projects label:Release"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.1.0 (2026-04-16)\n\n### Breaking Changes\n\n- Change `container_protocol_versions` property from required to optional in output types.\n- Change `code_type` property from required to optional ...`
- 🔍 rpc **github**→`tools/call` `get_tag`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-js","tag":"@azure/ai-projects_2.0.0"},"name":"get_tag"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_tag`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-js","tag":"@azure/ai-projects_1.0.0"},"name":"get_tag"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get tag object: GET https://api.github.com/repos/Azure/azure-sdk-for-js/git/tags/[REDACTED]: 404 Not Found []","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get tag object: GET https://api.github.com/repos/Azure/azure-sdk-for-js/git/tags/[REDACTED]: 404 Not Found []","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `get_release_by_tag`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-js","tag":"@azure/ai-projects_2.0.0"},"name":"get_release_by_tag"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"tag_name\":\"@azure/ai-projects_2.0.0\",\"target_commitish\":\"[REDACTED]\",\"name\":\"@azure/ai-projects_2.0.0\",\"body\":\"\",\"draft\":false,\"prerelease\":false,\"id\":294084707,\"created_at\":\"2026-03-06T19:49:36Z\",\"published_at\":\"2026-03-06T20:16:45Z\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/releases/294084707\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/releases/tag/%40azure/ai-projects_2.0...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/review/ai-projects-node.api.md","repo":"azure-sdk-for-js","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/review/ai-projects-node.api.md","mimeType":"text/plain; charset=utf-8","text":"## API Report File for \"@azure/ai-projects\"\n\n\u003e Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).\n\n```ts\n\nimport type { ClientOptions } from '...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get pull request diff: GET https://api.github.com/repos/Azure/azure-sdk-for-js/pulls/37993: 406 Sorry, the diff exceeded the maximum number of lines (20000) [{Resource:PullRequest Field:diff Code:too_large Message:}]","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-js","sha":"refs/pull/37993/head"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"rename interface name\",\"author\":{\"name\":\"retry-recv\",\"email\":\"goubo2012@gmail.com\",\"date\":\"2026-04-13T23:17:34Z\"},\"committer\":{\"name\":\"retry-recv\",\"email\":\"goubo2012@gmail.com\",\"date\":\"2026-04-13T23:17:34Z\"}},\"author\":{\"login\":\"bobogogo1990\",\"id\":15936679,\"profile_url\":\"https:...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/index.ts","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { PageSettings, PagedAsyncIterableIterator } from \"@azure/core-paging\";\nimport type { ContinuablePage } from \"./static-help...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { PageSettings, PagedAsyncIterableIterator } from \"@azure/core-paging\";\nimport type { ContinuablePage } from \"./static-help...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/index.ts","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nexport type { AgentsOperations } from \"./agents/index.js\";\nexport type { BetaOperations } from \"./beta/index.js\";\nexport type...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nexport type { AgentsOperations } from \"./agents/index.js\";\nexport type { BetaOperations } from \"./beta/index.js\";\nexport type...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/index.ts","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/beta/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { AIProjectContext } from \"../../api/aiProjectContext.js\";\nimport type { BetaAgentsOperations } from \"./agents...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/beta/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { AIProjectContext } from \"../../api/aiProjectContext.js\";\nimport type { BetaEvaluationTaxonomiesOperations } f...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/models/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/models/index.ts","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/models/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nexport type {\n  Agent,\n  AgentVersion,\n  AgentDefinition,\n  AgentDefinitionUnion,\n  AgentKind,\n  RaiConfig,\n  HostedAgentDefi...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/models/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nexport type {\n  Agent,\n  AgentVersion,\n  AgentDefinition,\n  AgentDefinitionUnion,\n  AgentKind,\n  RaiConfig,\n  PromptAgentDefi...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/api/beta/evaluators/index.ts","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/api/beta/evaluators/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/api/beta/evaluators/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nexport {\n  updateVersion,\n  createVersion,\n  deleteVersion,\n  getVersion,\n  listLatestVersions,\n  listVersions,\n...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/api/beta/evaluators/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nexport {\n  updateVersion,\n  createVersion,\n  deleteVersion,\n  getVersion,\n  list,\n  listVersions,\n} from \"./ope...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/evaluators/index.ts","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/evaluators/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/beta/evaluators/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { AIProjectContext } from \"../../../api/aiProjectContext.js\";\nimport {\n  updateVersion,\n  createVe...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/beta/evaluators/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { AIProjectContext } from \"../../../api/aiProjectContext.js\";\nimport {\n  updateVersion,\n  createVe...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/models/models.ts","ref":"refs/heads/main","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/models/models.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport { serializeRecord } from \"../static-helpers/serialization/serialize-record.js\";\n\n/**\n * This file contains only generat...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/evaluators/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/beta/evaluators/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { AIProjectContext } from \"../../../api/aiProjectContext.js\";\nimport {\n  updateVersion,\n  createVe...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Breaking** — Four `TextResponseFormat*` types were renamed but are **not documented in the CHANGELOG**.\n\nThe 2.0.0 GA release exported these four types:\n- `TextResponseFormatConfiguration`\n- `TextResponseFormatConfigurationUnion`\n- `TextResponseFormatConfigurationResponseFormatText`\n- `TextResponseFormatConfigurationResponseFormatJsonObject`\n\nThis PR replaces them with:\n- `TextResponseFormat` (line 143)\n- `TextResponseF...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Breaking** — `BetaEvaluatorsListLatestVersionsOptionalParams` was removed from the public API and replaced with `BetaEvaluatorsListOptionalParams`, but this rename is **not documented in the CHANGELOG**.\n\nThe 2.0.0 GA release exported `BetaEvaluatorsListLatestVersionsOptionalParams` from `src/index.ts` (via this file). Any TypeScript consumer who typed options objects as `BetaEvaluatorsListLatestVersionsOptionalParams` will get...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Medium — Incomplete breaking-changes list**\n\nThe CHANGELOG records only two breaking changes for 2.1.0:\n- `container_protocol_versions` required → optional\n- `code_type` required → optional\n\nAt least five additional breaking changes are present in this PR (four `TextResponseFormat*` type renames and one `BetaEvaluatorsListLatestVersionsOptionalParams` rename — see inline comments on the source files).\n\nAll breaking ...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Medium — Breaking changes in a minor version bump**\n\nThis PR bumps the version from `2.0.0` (GA) to `2.1.0`, yet the CHANGELOG lists multiple breaking changes. Per [semver](https://semver.org/) and the [Azure SDK breaking-changes policy](https://azure.github.io/azure-sdk/general_introduction.html), a minor version increment signals backward-compatible additions only. Breaking changes require a **major** version bump (i.e. `3.0....`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Medium — `BetaOperations` interface gains required properties (breaking for implementors)**\n\nIn the 2.0.0 GA release, `BetaOperations` had 6 properties (`schedules`, `redTeams`, `memoryStores`, `insights`, `evaluators`, `evaluationTaxonomies`). This PR adds three new required properties: `agents`, `skills`, and `toolboxes`.\n\nAdding required properties to a public interface is a source-breaking change for any TypeScript consum...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"This PR introduces several breaking changes to `@azure/ai-projects` against the 2.0.0 GA baseline. **5 findings** (2 critical, 3 medium):\n\n| # | Severity | Category | Summary |\n|---|----------|----------|---------|\n| 1 | 🔴 Critical | Breaking / undocumented | 4 `TextResponseFormat*` types renamed (not in CHANGELOG) |\n| 2 | 🔴 Critical | Breaking / undocumented | `BetaEvaluatorsListLatestVersionsOptionalParams` removed (not in CH...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
