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
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"pnpm-lock.yaml\",\"status\":\"modified\",\"deletions\":429,\"changes\":429,\"patch\":\"@@ -33350,156 +33350,24 @@ packages:\\n   '@epic-web/invariant@1.0.0':\\n     resolution: {integrity: sha1-EHPl3ubdVAQQeEmQ63PkrNJcmBM=}\\n \\n-  '@esbuild/aix-ppc64@0.27.7':\\n-    resolution: {integrity: sha1-grdPkqp41yC3FBYpOfskjJCt31M=}\\n-    engines: {node: '\\u003e=18'}\\n-    cpu: [ppc64]\\n-    os: [aix]\\n-\\n-  '@esbuild/androi...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
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
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","repo":"azure-sdk-for-js","workflow_runs_filter":{"event":"pull_request","status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":447,\"workflow_runs\":[{\"id\":24372886916,\"name\":\"Warp CI\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFrLy9hA\",\"head_branch\":\"fix/warp-ci-frozen-lockfile\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/warp-ci.yml\",\"run_number\":69,\"run_attempt\":1,\"event\":\"pull_request\",\"display_title\":\"fix(warp-ci): use --frozen-lockfile in CI to prevent version drift\",\"status\":\"completed\",\"conclusion\":\"success...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","page":2,"perPage":100,"pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","page":1,"perPage":100,"pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/ai/ai-projects/samples-dev/agents/tools/agentImageGeneration.ts\",\"status\":\"modified\",\"additions\":1,\"deletions\":1,\"changes\":2,\"patch\":\"@@ -54,7 +54,7 @@ export async function main(): Promise\\u003cvoid\\u003e {\\n     },\\n     {\\n       body: {\\n-        agent: { name: agent.name, type: \\\"agent_reference\\\" },\\n+        agent_reference: { name: agent.name, type: \\\"agent_reference\\\" },\\n       },...`
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
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":43,\"name\":\".gitattributes\",\"path\":\"sdk/ai/ai-projects/.gitattributes\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/.gitattributes?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/blob/[REDACTED]/sdk/ai/ai-projects/.gitattribu...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/CHANGELOG.md","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.1.0 (2026-04-16)\n\n### Breaking Changes\n\n- Change `container_protocol_versions` property from required to optional in output types.\n- Change `code_type` property from required to optional ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/review","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":79509,\"name\":\"ai-projects-node.api.md\",\"path\":\"sdk/ai/ai-projects/review/ai-projects-node.api.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/review/ai-projects-node.api.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/bl...`
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get pull request diff: GET https://api.github.com/repos/Azure/azure-sdk-for-js/pulls/37993: 406 Sorry, the diff exceeded the maximum number of lines (20000) [{Resource:PullRequest Field:diff Code:too_large Message:}]","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/package.json","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/samples-dev","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/README.md","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/ai-projects\",\n  \"version\": \"2.1.0\",\n  \"description\": \"Azure AI Projects client library.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },\n  \"sideEffects\": false,\n  \"auto...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"agents\",\"path\":\"sdk/ai/ai-projects/samples-dev/agents\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/samples-dev/agents?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/trees/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/tree/[REDACTED]/sdk/ai/ai-projects/samples-dev/a...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure AI Projects client library for JavaScript\n\nThe AI Projects client library (in preview) is part of the Microsoft Foundry SDK, and provides easy access to\nresources in your Microsoft Foundry Project. Use it to:\n...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/test/snippets.spec.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/test/snippets.spec.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { VitestTestContext } from \"@azure-tools/test-recorder\";\nimport { AIProjectClient, DatasetVersion } from \"../src/i...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/samples-dev/toolboxes","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/samples-dev/skills","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":7159,\"name\":\"aiProjectClient.ts\",\"path\":\"sdk/ai/ai-projects/src/aiProjectClient.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/src/aiProjectClient.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/blob/[REDACTED]/sdk/ai/a...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":2481,\"name\":\"toolboxesCrud.ts\",\"path\":\"sdk/ai/ai-projects/samples-dev/toolboxes/toolboxesCrud.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/samples-dev/toolboxes/toolboxesCrud.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-f...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":2207,\"name\":\"skillBasic.ts\",\"path\":\"sdk/ai/ai-projects/samples-dev/skills/skillBasic.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/samples-dev/skills/skillBasic.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/blob/[RED...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/aiProjectClient.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"agents\",\"path\":\"sdk/ai/ai-projects/src/classic/agents\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/src/classic/agents?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/trees/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/tree/[REDACTED]/sdk/ai/ai-projects/src/classic/a...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/aiProjectClient.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n/* eslint-disable tsdoc/syntax */\n\nimport OpenAI from \"openai\";\nimport type { ClientOptions as OpenAIClientOptions } from \"op...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"agents\",\"path\":\"sdk/ai/ai-projects/src/classic/beta/agents\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/src/classic/beta/agents?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/trees/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/tree/[REDACTED]/sdk/ai/ai-projects/src...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/samples-dev/conversations","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/beta/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { AIProjectContext } from \"../../api/aiProjectContext.js\";\nimport type { BetaAgentsOperations } from \"./agents...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":2736,\"name\":\"conversationsBasics.ts\",\"path\":\"sdk/ai/ai-projects/samples-dev/conversations/conversationsBasics.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/samples-dev/conversations/conversationsBasics.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://gi...`
- 🔍 rpc **github**→`tools/call` `search_code`
  
  ```json
  {"params":{"arguments":{"query":"skills toolboxes repo:Azure/azure-sdk-for-js path:sdk/ai/ai-projects/README.md"},"name":"search_code"}}
  ```
- 🔍 rpc **github**→`tools/call` `search_code`
  
  ```json
  {"params":{"arguments":{"query":"project.beta.agents sessions blueprints repo:Azure/azure-sdk-for-js path:sdk/ai/ai-projects/README.md"},"name":"search_code"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to search code with query 'project.beta.agents sessions blueprints repo:Azure/azure-sdk-for-js path:sdk/ai/ai-projects/README.md': GET https://api.github.com/search/code?page=1\u0026per_page=30\u0026q=project.beta.agents+sessions+blueprints+repo%3AAzure%2Fazure-sdk-for-js+path%3Asdk%2Fai%2Fai-projects%2FREADME.md: 429  []","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `search_code`
  
  ```json
  {"params":{"arguments":{"query":"beta.skills beta.toolboxes repo:Azure/azure-sdk-for-js path:sdk/ai/ai-projects"},"name":"search_code"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/skills","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":2866,\"name\":\"index.ts\",\"path\":\"sdk/ai/ai-projects/src/classic/beta/skills/index.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/src/classic/beta/skills/index.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/blob/[REDACTED...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","page":3,"perPage":100,"pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/ai/ai-projects/src/aiProjectClient.ts\",\"status\":\"modified\",\"additions\":7,\"deletions\":10,\"changes\":17,\"patch\":\"@@ -45,13 +45,6 @@ export type { AIProjectClientOptionalParams } from \\\"./api/aiProjectContext.js\\\";\\n  * @property {ConnectionsOperations} connections - The operation groups for connections\\n  * @property {AgentsOperations} agents - The operation groups for agents\\n  * @property {BetaOperat...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `search_code`
  
  ```json
  {"params":{"arguments":{"query":"beta.agents beta.skills beta.toolboxes repo:Azure/azure-sdk-for-js path:sdk/ai/ai-projects"},"name":"search_code"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/toolboxes","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":3865,\"name\":\"index.ts\",\"path\":\"sdk/ai/ai-projects/src/classic/beta/toolboxes/index.ts\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/contents/sdk/ai/ai-projects/src/classic/beta/toolboxes/index.ts?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/blob/[RE...`
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/ai-projects/src/classic/beta/index.ts","ref":"refs/pull/37993/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/ai/ai-projects/src/classic/beta/index.ts","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation.\n// Licensed under the MIT License.\n\nimport type { AIProjectContext } from \"../../api/aiProjectContext.js\";\nimport type { BetaAgentsOperations } from \"./agents...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","page":1,"perPage":30,"pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `search_code`
  
  ```json
  {"params":{"arguments":{"query":"beta.agents beta.skills beta.toolboxes repo:Azure/azure-sdk-for-js path:sdk/ai/ai-projects/README.md ref:refs/pull/37993/head"},"name":"search_code"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
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
  {"params":{"arguments":{"method":"get_files","owner":"Azure","page":4,"perPage":100,"pullNumber":37993,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"[]","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37993","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37993,\"title\":\"[Projects] v2.1.0RC1\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-projects`\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\nRelease candidate refresh for `@azure/ai-projects` v2.0.2 RC1, updating the TypeSpec input commit and regenerating client surface area (new operations + helpers), plus wiring CI for the `sdk/ai` service directory.\...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Incomplete** — The `@property beta` annotation in the class-level JSDoc ends with \"include beta features:\" but this PR removed the subsequent bullet list without replacing it. The annotation now documents nothing about what beta features are available.\n\n**Fix:** Either enumerate the sub-routes (as the field-level JSDoc below does) or replace with a concise description:\n```ts\n * @property {BetaOperations} beta - The operatio...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Missing** — `skills` and `toolboxes` are the only properties in `BetaOperations` that lack JSDoc comments. All other properties (including the newly-added `agents`) have them.\n\n**Fix:** Add descriptions consistent with the others:\n```ts\n/** Operations for accessing skills. */\nskills: BetaSkillsOperations;\n/** Operations for accessing toolbox features. */\ntoolboxes: BetaToolboxesOperations;\n```","line":"27","path":"sdk/ai/...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Inaccurate** — \"Evaluation Rules\" in this list does not correspond to any property of `BetaOperations`. The top-level client has `evaluationRules`, but there is no `evaluationRules` in `beta`. The PR adds Toolboxes/agents/skills here without removing this incorrect entry.\n\n**Fix:** Remove `- Evaluation Rules` from this list (or rename to \"Evaluators\" + \"Evaluation Taxonomies\" if those were meant, but they're already liste...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🟡 **Vague** — This breaking change doesn't specify which output type(s) contain `container_protocol_versions`. Readers who grep their codebase for `container_protocol_versions` may not know which interface they're checking against.\n\n**Suggestion:** Name the specific interface(s), e.g.:\n```\n- Change `container_protocol_versions` property from required to optional in `\u003cTypeName\u003e` output type.\n```","line":"7","path":"sdk/...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"Documentation review for `@azure/ai-projects` v2.1.0: 3 medium-severity and 1 low-severity issues found.\n\nThe README, CHANGELOG, and samples-dev all correctly cover the three new `project.beta.agents/skills/toolboxes` routes added by this PR. However, there are consistency gaps in the TSDoc layer: `skills` and `toolboxes` are missing JSDoc descriptions in `BetaOperations` (unlike every other property, including the newly-added `agents`)...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `push_repo_memory`
  
  ```json
  {"params":{"arguments":{},"name":"push_repo_memory"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"message\":\"Memory validation passed: 1 file(s), 1 KB total (limit: 12 KB with 20% overhead).\"}","type":"text"}]}}
  ```
