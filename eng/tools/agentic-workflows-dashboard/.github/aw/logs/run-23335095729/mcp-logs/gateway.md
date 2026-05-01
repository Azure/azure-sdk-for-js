<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.15
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"add_comment","description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 2 comment(s) can be added.","inputSchema":{"type":"object","required":["body"],"properties":{"body":{"type":"string","description":"The comment text i...`
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get a specific label from a repository."},"description":"Get a specific label from a repository.","inputSchema":{"properties":{"name":{"description":"Label name.","type":"string"},"owner":{"description":"Repository owner (username or organization name)","type":"string"},"repo":{"description":"Repository name","type":"string"}},"required":["owner","repo","name"],"type":"object"},"name":"get_label","icons":[{"src":"data:im...`
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
- 🔍 rpc **github**←`resp` ⚠️`calling "tools/call": unknown tool "search_repositories"`
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-net"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` ⚠️`calling "tools/call": unknown tool "search_repositories"`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"57287","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"missing required parameter: method","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":57287,"method":"get","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":57287,\"title\":\"[Generator Bug] @@alternateType to armResourceType emits WriteObjectValue instead of WriteStringValue\",\"body\":\"## Description\\n\\nWhen `@@alternateType` maps a property to `Azure.Core.armResourceType` (C# `ResourceType`), the generator emits `WriteObjectValue(ResourceType, options)` for serialization. But `WriteObjectValue` has no case for `ResourceType` (which is a `readonly struct` wrapping a string), so...`
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-net"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` ⚠️`calling "tools/call": unknown tool "search_repositories"`
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-net"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` ⚠️`calling "tools/call": unknown tool "search_repositories"`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"57287","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"missing required parameter: method","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"query":"repo:Azure/azure-sdk-for-net is:issue 57287"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":4106604981,\"number\":57287,\"state\":\"open\",\"locked\":false,\"title\":\"[Generator Bug] @@alternateType to armResourceType emits WriteObjectValue instead of WriteStringValue\",\"body\":\"## Description\\n\\nWhen `@@alternateType` maps a property to `Azure.Core.armResourceType` (C# `ResourceType`), the generator emits `WriteObjectValue(ResourceType, options)` for serializ...`
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-net"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` ⚠️`calling "tools/call": unknown tool "search_repositories"`
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-net"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` ⚠️`calling "tools/call": unknown tool "search_repositories"`
- 🔍 rpc **safeoutputs**→`tools/call` `noop`
  
  ```json
  {"params":{"arguments":{"message":"No action needed: Issue #57287 already has the \"bug\" label applied. Per triage preconditions, issues with existing labels are skipped to avoid overwriting human-applied triage."},"name":"noop"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
