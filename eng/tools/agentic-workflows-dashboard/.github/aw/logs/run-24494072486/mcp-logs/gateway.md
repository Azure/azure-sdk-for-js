<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"Detailed issue description in Markdown. Do NOT repe...`
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
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-net"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":2928944,\"name\":\"azure-sdk-for-net\",\"full_name\":\"Azure/azure-sdk-for-net\",\"description\":\"This repository is for active development of the Azure SDK for .NET. For consumers of the SDK we recommend visiting our public developer docs at https://learn.microsoft.com/dotnet/azure/ or our versioned developer docs at https://azure.github.io/azure-sdk-for-net. \",\"html_url...`
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-net"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"fix provisioning resourcegraph ci (#58205)\",\"author\":{\"name\":\"Dapeng Zhang\",\"email\":\"dapzhang@microsoft.com\",\"date\":\"2026-04-16T05:37:16Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-16T05:37:16Z\"}},\"author\":{\"login\":\"ArcturusZhang\",\"id\":10554446,...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":false,"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"fix provisioning resourcegraph ci (#58205)\",\"author\":{\"name\":\"Dapeng Zhang\",\"email\":\"dapzhang@microsoft.com\",\"date\":\"2026-04-16T05:37:16Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-16T05:37:16Z\"}},\"author\":{\"login\":\"ArcturusZhang\",\"id\":10554446,\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Add Azure.Provisioning.ResourceGraph library (#58068)\\n\\nCo-authored-by: Copilot \\u003c223556219+Copilot@users.noreply.github.com\\u003e\\nCo-authored-by: Copilot \\u003c175728472+Copilot@users.noreply.github.com\\u003e\",\"author\":{\"name\":\"Dapeng Zhang\",\"email\":\"dapzhang@microsoft.com\",\"date\":\"2026-...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/resourcegraph/Azure.Provisioning.ResourceGraph","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":161,\"name\":\"Azure.Provisioning.ResourceGraph.slnx\",\"path\":\"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/Azure.Provisioning.ResourceGraph.slnx\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/resourcegraph/Azure.Provisioning.ResourceGraph/Azure.Provisioning.ResourceGraph.slnx?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sd...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/CHANGELOG.md","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/src","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/README.md","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":557,\"name\":\"Azure.Provisioning.ResourceGraph.csproj\",\"path\":\"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/src/Azure.Provisioning.ResourceGraph.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/resourcegraph/Azure.Provisioning.ResourceGraph/src/Azure.Provisioning.ResourceGraph.csproj?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/resourcegraph/Azure.Provisioning.ResourceGraph/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 1.0.0-beta.1 (2026-04-16)\n\n### Features Added\n\n- Initial beta release of Azure.Provisioning.ResourceGraph with support for declarative Resource Graph resourc...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/resourcegraph/Azure.Provisioning.ResourceGraph/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure Provisioning ResourceGraph client library for .NET\n\nAzure.Provisioning.ResourceGraph simplifies declarative resource provisioning for Azure Resource Graph in .NET.\n\n## Getting ...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/tests","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/src/Generated","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"Models\",\"path\":\"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/src/Generated/Models\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/resourcegraph/Azure.Provisioning.ResourceGraph/src/Generated/Models?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/trees/[REDACTED]\",\"html_url\":\"https://github.com/A...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":714,\"name\":\"Azure.Provisioning.ResourceGraph.Tests.csproj\",\"path\":\"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/tests/Azure.Provisioning.ResourceGraph.Tests.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/resourcegraph/Azure.Provisioning.ResourceGraph/tests/Azure.Provisioning.ResourceGraph.Tests.csproj?ref=[REDACTED]\",\"git_url\":\"https:/...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/tests/BasicResourceGraphTests.cs","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/resourcegraph/Azure.Provisioning.ResourceGraph/src/Generated/ResourceGraphQuery.cs","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/resourcegraph/Azure.Provisioning.ResourceGraph/tests/BasicResourceGraphTests.cs","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation. All rights reserved.\n// Licensed under the MIT License.\n\nusing System.Threading.Tasks;\nusing Azure.Provisioning.Tests;\nu...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/resourcegraph/Azure.Provisioning.ResourceGraph/src/Generated/ResourceGraphQuery.cs","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation. All rights reserved.\n// Licensed under the MIT License.\n\n// \u003cauto-generated/\u003e\n\n#nullable enable\n\nusing Az...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Documentation Gap\n\n**Package:** `Azure.Provisioning.ResourceGraph`\n**Service directory:** `sdk/resourcegraph/Azure.Provisioning.ResourceGraph/`\n**Triggered by:** commit a6078e1 (PR #58068) by @ArcturusZhang\n\n## What Changed\n\nPR #58068 added the brand-new `Azure.Provisioning.ResourceGraph` provisioning library (1.0.0-beta.1), introducing the `ResourceGraphQuery` resource type for declarative Azure Resource Graph shared-query pro...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `dispatch_triage`
  
  ```json
  {"params":{"arguments":{},"name":"dispatch_triage"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
