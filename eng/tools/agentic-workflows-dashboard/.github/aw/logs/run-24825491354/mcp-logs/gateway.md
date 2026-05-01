<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.19
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [safeoutputs github]
- ✓ **startup** Guards sink server ID logging enrichment disabled (no sink server IDs configured)
- ✓ **startup** OpenTelemetry tracing disabled (no OTLP endpoint configured)
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"Detailed issue description in Markdown. Do NOT repe...`
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get commit details"},"description":"Get details for a commit from a GitHub repository","inputSchema":{"properties":{"include_diff":{"default":true,"description":"Whether to include file diffs and stats in the response. Default is true.","type":"boolean"},"owner":{"description":"Repository owner","type":"string"},"page":{"description":"Page number for pagination (min 1)","minimum":1,"type":"number"},"perPage":{"descriptio...`
- ✓ **startup** Starting MCPG in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> where <server> is one of: [github safeoutputs]
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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment package version after release of Azure.ResourceManager.DefenderEasm (#58563)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-23T08:38:01Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-23T08:3...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment package version after release of Azure.ResourceManager.DefenderEasm (#58563)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-23T08:38:01Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-23T08:38...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment package version after release of Azure.ResourceManager.DependencyMap (#58562)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-23T08:37:45Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-23T08:3...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":false,"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get commit: [REDACTED]: GET https://api.github.com/repos/Azure/azure-sdk-for-net/commits/[REDACTED]?page=1\u0026per_page=30: 422 No commit found for SHA: [REDACTED] []","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment package version after release of Azure.ResourceManager.DevCenter (#58561)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-23T08:37:28Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-23T08:37:28...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/dependencymap/Azure.ResourceManager.DependencyMap/CHANGELOG.md","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"chore: remove outdated project structure link from README.md (#58559)\",\"author\":{\"name\":\"Arthur Ma\",\"email\":\"mars.arthur@263.net\",\"date\":\"2026-04-23T07:55:14Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-23T07:55:14Z\"}},\"author\":{\"login\":\"ArthurMa1978...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/dependencymap/Azure.ResourceManager.DependencyMap/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 1.0.0-beta.3 (Unreleased)\n\n### Features Added\n\n### Breaking Changes\n\n### Bugs Fixed\n\n### Other Changes\n\n## 1.0.0-beta.2 (2026-04-23)\n\n### Other Ch...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/dependencymap/Azure.ResourceManager.DependencyMap/README.md","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/defendereasm/Azure.ResourceManager.DefenderEasm/README.md","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/defendereasm/Azure.ResourceManager.DefenderEasm/README.md","mimeType":"text/plain; charset=utf-8","text":"# Microsoft Azure DefenderEasm management client library for .NET\n\nMicrosoft Defender External Attack Surface Management (Defender EASM) continuously discovers and maps your digital att...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/dependencymap/Azure.ResourceManager.DependencyMap/README.md","mimeType":"text/plain; charset=utf-8","text":"# Microsoft Azure Dependency Map management client library for .NET\n\nAzure Dependency Map is a service that enables automated and manual mapping of dependencies between services, micr...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/dependencymap/Azure.ResourceManager.DependencyMap","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/defendereasm/Azure.ResourceManager.DefenderEasm","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":3037,\"name\":\"Azure.ResourceManager.DefenderEasm.sln\",\"path\":\"sdk/defendereasm/Azure.ResourceManager.DefenderEasm/Azure.ResourceManager.DefenderEasm.sln\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/defendereasm/Azure.ResourceManager.DefenderEasm/Azure.ResourceManager.DefenderEasm.sln?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/az...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":3993,\"name\":\"Azure.ResourceManager.DependencyMap.sln\",\"path\":\"sdk/dependencymap/Azure.ResourceManager.DependencyMap/Azure.ResourceManager.DependencyMap.sln\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/dependencymap/Azure.ResourceManager.DependencyMap/Azure.ResourceManager.DependencyMap.sln?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/A...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/dependencymap/Azure.ResourceManager.DependencyMap/src","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/dependencymap/Azure.ResourceManager.DependencyMap/tests","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":162,\"name\":\"Azure.ResourceManager.DependencyMap.Tests.csproj\",\"path\":\"sdk/dependencymap/Azure.ResourceManager.DependencyMap/tests/Azure.ResourceManager.DependencyMap.Tests.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/dependencymap/Azure.ResourceManager.DependencyMap/tests/Azure.ResourceManager.DependencyMap.Tests.csproj?ref=[REDACTED]\",\"git_...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":372,\"name\":\"Azure.ResourceManager.DependencyMap.csproj\",\"path\":\"sdk/dependencymap/Azure.ResourceManager.DependencyMap/src/Azure.ResourceManager.DependencyMap.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/dependencymap/Azure.ResourceManager.DependencyMap/src/Azure.ResourceManager.DependencyMap.csproj?ref=[REDACTED]\",\"git_url\":\"https://api.gi...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/dependencymap/Azure.ResourceManager.DependencyMap/src/Generated","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":15587,\"name\":\"ArmDependencyMapModelFactory.cs\",\"path\":\"sdk/dependencymap/Azure.ResourceManager.DependencyMap/src/Generated/ArmDependencyMapModelFactory.cs\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/dependencymap/Azure.ResourceManager.DependencyMap/src/Generated/ArmDependencyMapModelFactory.cs?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/re...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/dependencymap/Azure.ResourceManager.DependencyMap/src/Generated/DependencyMapResource.cs","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/dependencymap/Azure.ResourceManager.DependencyMap/src/Generated/DependencyMapResource.cs","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation. All rights reserved.\n// Licensed under the MIT License.\n\n// \u003cauto-generated/\u003e\n\n#nullable disable\n\nu...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Documentation Gap\n\n**Package:** `Azure.ResourceManager.DependencyMap`\n**Service directory:** `sdk/dependencymap/Azure.ResourceManager.DependencyMap/`\n**Triggered by:** commit c6e44de (PR #58562) by @azure-sdk\n\n## What Changed\n\n`Azure.ResourceManager.DependencyMap` 1.0.0-beta.2 was just released (dependency upgrades to Azure.Core 1.53.0 and Azure.ResourceManager 1.14.0). The package has a rich set of resources and operations (in...`
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
