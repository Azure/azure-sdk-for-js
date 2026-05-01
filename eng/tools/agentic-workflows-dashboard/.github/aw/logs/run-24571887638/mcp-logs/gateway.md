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
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"Detailed issue description in Markdown. Do NOT repe...`
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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Prepare release for Azure.ResourceManager.Advisor Version 1.0.0-beta.6 (#58281)\",\"author\":{\"name\":\"Arthur Ma\",\"email\":\"mars.arthur@263.net\",\"date\":\"2026-04-17T15:01:57Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-17T15:01:57Z\"}},\"author\":{\"login\":\"A...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Prepare release for Azure.ResourceManager.Advisor Version 1.0.0-beta.6 (#58281)\",\"author\":{\"name\":\"Arthur Ma\",\"email\":\"mars.arthur@263.net\",\"date\":\"2026-04-17T15:01:57Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-17T15:01:57Z\"}},\"author\":{\"login\":\"Ar...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":3017,\"name\":\"Azure.ResourceManager.Advisor.sln\",\"path\":\"sdk/advisor/Azure.ResourceManager.Advisor/Azure.ResourceManager.Advisor.sln\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/advisor/Azure.ResourceManager.Advisor/Azure.ResourceManager.Advisor.sln?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/blobs/[REDACTED...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor/README.md","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor/CHANGELOG.md","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/advisor/Azure.ResourceManager.Advisor/README.md","mimeType":"text/plain; charset=utf-8","text":"# Microsoft Azure Advisor management client library for .NET\n\nMicrosoft Advisor is a personalized cloud consultant that helps you follow best practices to optimize your Azure deployments. It anal...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/advisor/Azure.ResourceManager.Advisor/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 1.0.0-beta.6 (2026-04-17)\n\n### Features Added\n\nUpgraded api-version to 2025-05-01-preview.\n\n### Other Changes\n\n- Upgraded dependent `Azure.Core` to `1.53.0`.\n- U...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor/src","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor/tests","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":374,\"name\":\"Azure.ResourceManager.Advisor.csproj\",\"path\":\"sdk/advisor/Azure.ResourceManager.Advisor/src/Azure.ResourceManager.Advisor.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/advisor/Azure.ResourceManager.Advisor/src/Azure.ResourceManager.Advisor.csproj?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":1579,\"name\":\"AdvisorManagementTestBase.cs\",\"path\":\"sdk/advisor/Azure.ResourceManager.Advisor/tests/AdvisorManagementTestBase.cs\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/advisor/Azure.ResourceManager.Advisor/tests/AdvisorManagementTestBase.cs?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/blobs/[REDACTED]\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor/src/Generated","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor/tests/Samples","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":7023,\"name\":\"Sample_MetadataEntityCollection.cs\",\"path\":\"sdk/advisor/Azure.ResourceManager.Advisor/tests/Samples/Sample_MetadataEntityCollection.cs\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/advisor/Azure.ResourceManager.Advisor/tests/Samples/Sample_MetadataEntityCollection.cs?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":30616,\"name\":\"AdvisorAssessmentCollection.cs\",\"path\":\"sdk/advisor/Azure.ResourceManager.Advisor/src/Generated/AdvisorAssessmentCollection.cs\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/advisor/Azure.ResourceManager.Advisor/src/Generated/AdvisorAssessmentCollection.cs?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor/tests/Samples/Sample_SubscriptionResourceExtensions.cs","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/advisor/Azure.ResourceManager.Advisor/tests/Samples/Sample_SubscriptionResourceExtensions.cs","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation. All rights reserved.\n// Licensed under the MIT License.\n\n#nullable disable\n\nusing System;\nusing System.Thr...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/advisor/Azure.ResourceManager.Advisor/tests/Samples/Sample_ResourceGroupResourceExtensions.cs","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/advisor/Azure.ResourceManager.Advisor/tests/Samples/Sample_ResourceGroupResourceExtensions.cs","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation. All rights reserved.\n// Licensed under the MIT License.\n\n#nullable disable\n\nusing System;\nusing System.Th...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Documentation Gap\n\n**Package:** `Azure.ResourceManager.Advisor`\n**Service directory:** `sdk/advisor/Azure.ResourceManager.Advisor/`\n**Triggered by:** [REDACTED] (PR #58281) by @ArthurMa1978\n\n## What Changed\n\nRelease 1.0.0-beta.6 (2026-04-17) upgraded the API version to `2025-05-01-preview`, adding new resource types to the generated code:\n- `AdvisorAssessment` (`AdvisorAssessmentResource`, `AdvisorAssessmentCollection`)\n- `Ad...`
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
