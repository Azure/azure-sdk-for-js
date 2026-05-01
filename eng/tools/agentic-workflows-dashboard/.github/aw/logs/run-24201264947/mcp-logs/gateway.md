<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.14
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
- ✓ **startup** Routes: /mcp/<server> for servers: [safeoutputs github]
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
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-net","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment package version after release of Azure.Provisioning.MySql (#57985)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-09T16:25:16Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-09T16:25:16Z\"}},...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":true,"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":true,"owner":"Azure","perPage":10,"repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment package version after release of Azure.Provisioning.MySql (#57985)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-09T16:25:16Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-09T16:25:16Z\"}},\...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Regenerate repository SDK with TypeSpec build 20260409.2 (#57999)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-09T11:12:44Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-09T11:12:44Z\"}},\"author\":{...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/mysql/Azure.Provisioning.MySql","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/mysql/Azure.Provisioning.MySql/CHANGELOG.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/mysql/Azure.Provisioning.MySql/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 1.0.0-beta.2 (Unreleased)\n\n### Features Added\n\n### Breaking Changes\n\n### Bugs Fixed\n\n### Other Changes\n\n## 1.0.0-beta.1 (2026-04-09)\n\n### Features Added\n\n- Initial...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":145,\"name\":\"Azure.Provisioning.MySql.slnx\",\"path\":\"sdk/mysql/Azure.Provisioning.MySql/Azure.Provisioning.MySql.slnx\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/mysql/Azure.Provisioning.MySql/Azure.Provisioning.MySql.slnx?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/blobs/[REDACTED]\",\"html_url\":\"https://...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/mysql/Azure.Provisioning.MySql/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"57985","method":"get","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":57985,\"title\":\"Increment version for mysql releases\",\"body\":\"Increment package version after release of Azure.Provisioning.MySql\",\"state\":\"closed\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/pull/57985\",\"user\":{\"login\":\"azure-sdk\",\"id\":53356347,\"profile_url\":\"https://github.com/azure-sdk\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/53356347?v=4\"},\"author_association\":\"COLLA...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":57985,"method":"get","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/mysql/Azure.Provisioning.MySql/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure Provisioning MySql client library for .NET\n\nAzure.Provisioning.MySql simplifies declarative resource provisioning for Azure Database for MySQL Flexible Servers in .NET.\n\n## Getting started\n\n...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":57985,\"title\":\"Increment version for mysql releases\",\"body\":\"Increment package version after release of Azure.Provisioning.MySql\",\"state\":\"closed\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/pull/57985\",\"user\":{\"login\":\"azure-sdk\",\"id\":53356347,\"profile_url\":\"https://github.com/azure-sdk\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/53356347?v=4\"},\"author_association\":\"COLLA...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/mysql/Azure.Provisioning.MySql/src","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":549,\"name\":\"Azure.Provisioning.MySql.csproj\",\"path\":\"sdk/mysql/Azure.Provisioning.MySql/src/Azure.Provisioning.MySql.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/mysql/Azure.Provisioning.MySql/src/Azure.Provisioning.MySql.csproj?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/blobs/[REDACTED]\",\"html_ur...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/mysql/Azure.Provisioning.MySql/tests","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/mysql/Azure.Provisioning.MySql/src/Generated","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":706,\"name\":\"Azure.Provisioning.MySql.Tests.csproj\",\"path\":\"sdk/mysql/Azure.Provisioning.MySql/tests/Azure.Provisioning.MySql.Tests.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/mysql/Azure.Provisioning.MySql/tests/Azure.Provisioning.MySql.Tests.csproj?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/blobs/...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":5849,\"name\":\"AdvancedThreatProtection.cs\",\"path\":\"sdk/mysql/Azure.Provisioning.MySql/src/Generated/AdvancedThreatProtection.cs\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/mysql/Azure.Provisioning.MySql/src/Generated/AdvancedThreatProtection.cs?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/blobs/[REDACTED]\",...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/storage/Azure.Provisioning.Storage/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/storage/Azure.Provisioning.Storage/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure Provisioning Storage client library for .NET\n\nAzure.Provisioning.Storage simplifies declarative resource provisioning in .NET for Azure Storage.\n\n## Getting started\n\n### Install the pack...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/mysql/Azure.Provisioning.MySql/src/Generated/MySqlFlexibleServer.cs","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/mysql/Azure.Provisioning.MySql/src/Generated/MySqlFlexibleServer.cs","mimeType":"text/plain; charset=utf-8","text":"// Copyright (c) Microsoft Corporation. All rights reserved.\n// Licensed under the MIT License.\n\n// \u003cauto-generated/\u003e\n\n#nullable disable\n\nusing System;\nusing S...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Documentation Gap\n\n**Package:** `Azure.Provisioning.MySql`\n**Service directory:** `sdk/mysql/Azure.Provisioning.MySql/`\n**Triggered by:** commit [REDACTED] (PR #57985) by @azure-sdk\n\n## What Changed\n\nThe initial beta release (`1.0.0-beta.1`) of `Azure.Provisioning.MySql` was published on 2026-04-09. The package provides declarative infrastructure provisioning for Azure Database for MySQL Flexible Servers, exposing resource type...`
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
