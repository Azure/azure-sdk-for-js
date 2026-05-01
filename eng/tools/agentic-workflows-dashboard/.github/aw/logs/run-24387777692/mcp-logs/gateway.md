<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a review comment on a specific line of code in a pull request. Use this for inline code review feedback, suggestions, or questions about specific code changes. For general PR comments not tied to specific lines, use add_comment instead. When the workflow is configured with `target: \"*\"`, you must specify `pull_request_number` to indicate which PR to target. CONSTRAINTS: Maximum 15 review comment(s) can be created. Comments will be on the RI...`
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
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
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"doc/dev/Mgmt-Naming-Conventions.md","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"58145","repo":"azure-sdk-for-net"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":58145,\"title\":\"[Test PR/NOT READY] review workflow test\",\"body\":\"# Contributing to the Azure SDK\\n\\nPlease see our [CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-net/blob/main/CONTRIBUTING.md) if you are not familiar with contributing to this repository or have questions.\\n\\nFor specific information about pull request etiquette and best practices, see [this section](https://github.com/Azure/azure-sdk-for-net...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":58145,"repo":"azure-sdk-for-net"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/doc/dev/Mgmt-Naming-Conventions.md","mimeType":"text/plain; charset=utf-8","text":"# Azure SDK for .NET - Management Plane SDK Naming Conventions\n\nThis document describes the naming conventions for the Azure Management Plane SDK for .NET.\nIn addition to adhering to the [General Naming Conventi...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":58145,\"title\":\"[Test PR/NOT READY] review workflow test\",\"body\":\"# Contributing to the Azure SDK\\n\\nPlease see our [CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-net/blob/main/CONTRIBUTING.md) if you are not familiar with contributing to this repository or have questions.\\n\\nFor specific information about pull request etiquette and best practices, see [this section](https://github.com/Azure/azure-sdk-for-net...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"58145","repo":"azure-sdk-for-net"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":58145,\"title\":\"[Test PR/NOT READY] review workflow test\",\"body\":\"# Contributing to the Azure SDK\\n\\nPlease see our [CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-net/blob/main/CONTRIBUTING.md) if you are not familiar with contributing to this repository or have questions.\\n\\nFor specific information about pull request etiquette and best practices, see [this section](https://github.com/Azure/azure-sdk-for-net...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"58145","repo":"azure-sdk-for-net"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":58145,\"title\":\"[Test PR/NOT READY] review workflow test\",\"body\":\"# Contributing to the Azure SDK\\n\\nPlease see our [CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-net/blob/main/CONTRIBUTING.md) if you are not familiar with contributing to this repository or have questions.\\n\\nFor specific information about pull request etiquette and best practices, see [this section](https://github.com/Azure/azure-sdk-for-net...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":58145,"repo":"azure-sdk-for-net"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/advisor/Azure.ResourceManager.Advisor/src/Generated/AdvisorMetadataEntityResource.cs\",\"status\":\"modified\",\"additions\":1,\"deletions\":1,\"changes\":2,\"patch\":\"@@ -56,7 +56,7 @@ internal AdvisorMetadataEntityResource(ArmClient client, ResourceIdentifier id)\\n         }\\n \\n         /// \\u003csummary\\u003e Gets whether or not the current instance has data. \\u003c/summary\\u003e\\n-        public virtual bo...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"58145","repo":"azure-sdk-for-net"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":58145,\"title\":\"[Test PR/NOT READY] review workflow test\",\"body\":\"# Contributing to the Azure SDK\\n\\nPlease see our [CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-net/blob/main/CONTRIBUTING.md) if you are not familiar with contributing to this repository or have questions.\\n\\nFor specific information about pull request etiquette and best practices, see [this section](https://github.com/Azure/azure-sdk-for-net...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"**Naming convention violation – `bool` property must start with a verb prefix.**\n\nPer the [Management Plane Naming Conventions](https://github.com/Azure/azure-sdk-for-net/blob/main/doc/dev/Mgmt-Naming-Conventions.md#general-guidelines), property or parameter names of type `bool` must start with a verb such as `Is`, `Can`, or `Has`.\n\nRenaming `HasData` → `Data` removes the required verb prefix. Please keep the original name `HasDat...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `submit_pull_request_review`
  
  ```json
  {"params":{"arguments":{"body":"One naming convention violation found: the `bool` property was renamed from `HasData` to `Data`, dropping the required verb prefix. See inline comment.","event":"REQUEST_CHANGES","pull_request_number":58145},"name":"submit_pull_request_review"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
