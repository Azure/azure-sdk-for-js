<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.14
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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Generate code from new repository (#57741)\\n\\n* Generate code from new repository\\n\\n* Generate code with the new codegen\\n\\n* Generate APIView\\n\\n* Update hashes\\n\\n* Regenerate code\",\"author\":{\"name\":\"Nikolay Rovinskiy\",\"email\":\"30440255+nick863@users.noreply.github.com\",\"date\":\"2026-04-0...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":true,"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Generate code from new repository (#57741)\\n\\n* Generate code from new repository\\n\\n* Generate code with the new codegen\\n\\n* Generate APIView\\n\\n* Update hashes\\n\\n* Regenerate code\",\"author\":{\"name\":\"Nikolay Rovinskiy\",\"email\":\"30440255+nick863@users.noreply.github.com\",\"date\":\"2026-04-06...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"include_diff":true,"owner":"Azure","page":2,"repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Generate code from new repository (#57741)\\n\\n* Generate code from new repository\\n\\n* Generate code with the new codegen\\n\\n* Generate APIView\\n\\n* Update hashes\\n\\n* Regenerate code\",\"author\":{\"name\":\"Nikolay Rovinskiy\",\"email\":\"30440255+nick863@users.noreply.github.com\",\"date\":\"2026-04-06...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":1640,\"name\":\"Azure.AI.Projects.Agents.sln\",\"path\":\"sdk/ai/Azure.AI.Projects.Agents/Azure.AI.Projects.Agents.sln\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/ai/Azure.AI.Projects.Agents/Azure.AI.Projects.Agents.sln?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/blobs/[REDACTED]\",\"html_url\":\"https://github.c...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/AgentDefinitionOptInKeys.cs","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/README.md","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/CHANGELOG.md","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/DeclarativeAgentDefinition.cs","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/AgentDefinitionOptInKeys.cs","mimeType":"text/plain; charset=utf-8","text":"// \u003cauto-generated/\u003e\n\n#nullable disable\n\nnamespace Azure.AI.Projects.Agents\n{\n    /// \u003csummary\u003e Feature opt-in keys for agent definition opera...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.1.0-beta.1 (Unreleased)\n\n### Features Added\n\n### Breaking Changes\n\n### Bugs Fixed\n\n### Other Changes\n\n## 2.0.0 (2026-03-31)\n\n### Breaking Changes\n- `AgentVersion` wa...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/DeclarativeAgentDefinition.cs","mimeType":"text/plain; charset=utf-8","text":"// \u003cauto-generated/\u003e\n\n#nullable disable\n\nusing System;\nusing System.Collections.Generic;\nusing System.Text.Json;\nusing OpenAI;\nusing OpenAI.Response...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure AI Projects Agents client library for .NET\n\nDevelop Agents using the Azure AI Foundry platform, leveraging an extensive ecosystem of models, tools, and capabilities from OpenAI, Microsoft, and othe...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/api/Azure.AI.Projects.Agents.net8.0.cs","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/src/Generated/ProjectsAgentsModelFactory.cs","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/src/Generated/ProjectsAgentsModelFactory.cs","mimeType":"text/plain; charset=utf-8","text":"// \u003cauto-generated/\u003e\n\n#nullable disable\n\nusing System;\nusing System.Collections.Generic;\nusing System.Linq;\nusing OpenAI;\nusing OpenAI.Responses;\n\nnamesp...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/api/Azure.AI.Projects.Agents.net8.0.cs","mimeType":"text/plain; charset=utf-8","text":"namespace Azure.AI.Projects.Agents\n{\n    public partial class A2APreviewTool : Azure.AI.Projects.Agents.ProjectsAgentTool, System.ClientModel.Primitives.IJsonModel\u003cAzure.A...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/ProjectsAgentProtocol.cs","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/ProjectsAgentProtocol.cs","mimeType":"text/plain; charset=utf-8","text":"// \u003cauto-generated/\u003e\n\n#nullable disable\n\nusing System;\nusing System.ComponentModel;\n\nnamespace Azure.AI.Projects.Agents\n{\n    /// \u003csummary\u003e\u0...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/samples","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":4190,\"name\":\"Sample_Agents_CRUD.md\",\"path\":\"sdk/ai/Azure.AI.Projects.Agents/samples/Sample_Agents_CRUD.md\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/ai/Azure.AI.Projects.Agents/samples/Sample_Agents_CRUD.md?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/blobs/[REDACTED]\",\"html_url\":\"https://github.com/Az...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":7682,\"name\":\"A2APreviewTool.Serialization.cs\",\"path\":\"sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/A2APreviewTool.Serialization.cs\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/A2APreviewTool.Serialization.cs?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/StructuredInputDefinition.cs","ref":"refs/heads/main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/src/Generated/Models/StructuredInputDefinition.cs","mimeType":"text/plain; charset=utf-8","text":"// \u003cauto-generated/\u003e\n\n#nullable disable\n\nusing System;\nusing System.Collections.Generic;\nusing System.Text.Json;\n\nnamespace Azure.AI.Projects.Agents\...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Documentation Gap\n\n**Package:** `Azure.AI.Projects.Agents`\n**Service directory:** `sdk/ai/Azure.AI.Projects.Agents/`\n**Triggered by:** PR #57741 (commit 812a89c) by @nick863\n\n## What Changed\n\nCommit `812a89c` regenerated code for `Azure.AI.Projects.Agents` from a new repository, introducing:\n\n- **New `StructuredInputDefinition` class** — represents a structured input that can participate in prompt template substitution and ...`
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
