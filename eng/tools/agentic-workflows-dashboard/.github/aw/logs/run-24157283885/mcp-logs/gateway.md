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
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-net","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\" [KeyVault] Migrate or retire stand-alone samples (#57907)\\n\\n* [KeyVault] Migrate or retire stand-alone samples\\n\\n The focus of these chagnes is to move `getcert` and\\n `keyvaultproxy` samples from `sdk/keyvault/samples/`\\n to the centralized `samples/keyvault/` directory.\\n The the sharelink sample is be...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\" [KeyVault] Migrate or retire stand-alone samples (#57907)\\n\\n* [KeyVault] Migrate or retire stand-alone samples\\n\\n The focus of these chagnes is to move `getcert` and\\n `keyvaultproxy` samples from `sdk/keyvault/samples/`\\n to the centralized `samples/keyvault/` directory.\\n The the sharelink sample is bei...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"samples/keyvault/keyvaultproxy/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"samples/keyvault/getcert/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"samples/keyvault","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/samples/keyvault/getcert/README.md","mimeType":"text/plain; charset=utf-8","text":"---\npage_type: sample\nlanguages:\n- csharp\nproducts:\n- azure\n- azure-key-vault\nurlFragment: get-certificate-private-key\nname: Get a Certificate Including the Private Key\ndescription: Gets a full certificate...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"dir\",\"size\":0,\"name\":\"getcert\",\"path\":\"samples/keyvault/getcert\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/samples/keyvault/getcert?ref=[REDACTED]\",\"git_url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/git/trees/[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/tree/[REDACTED]/samples/keyvault/getcert\"},{\"type\":\"dir\",\"size\"...`
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"successfully downloaded text file (SHA: [REDACTED])","type":"text"},{"resource":{"mimeType":"text/plain; charset=utf-8","text":"See the [src/README.md](https://github.com/Azure/azure-sdk-for-net/blob/main/samples/keyvault/keyvaultproxy/src/README.md) for more information about this sample.\n","uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/samples/keyvault/keyvaultproxy/README.md"},"type":"resource"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"samples/keyvault/keyvaultproxy/src/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","page":2,"repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/samples/keyvault/keyvaultproxy/src/README.md","mimeType":"text/plain; charset=utf-8","text":"---\npage_type: sample\nlanguages:\n- csharp\nproducts:\n- azure\n- azure-key-vault\nname: Cache certain responses from Key Vault\ndescription: Shows how to implement a pipeline policy to cache certain re...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\" [KeyVault] Migrate or retire stand-alone samples (#57907)\\n\\n* [KeyVault] Migrate or retire stand-alone samples\\n\\n The focus of these chagnes is to move `getcert` and\\n `keyvaultproxy` samples from `sdk/keyvault/samples/`\\n to the centralized `samples/keyvault/` directory.\\n The the sharelink sample is bei...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/keyvault/Azure.Security.KeyVault.Secrets/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/keyvault/Azure.Security.KeyVault.Certificates/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/keyvault/Azure.Security.KeyVault.Certificates/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure Key Vault Certificate client library for .NET\n\nAzure Key Vault is a cloud service that provides secure storage and automated management of certificates used throughout a cloud app...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/keyvault/Azure.Security.KeyVault.Secrets/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure Key Vault secret client library for .NET\n\nAzure Key Vault is a cloud service that provides a secure storage of secrets, such as passwords and database connection strings.\n\nThe Azure ...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/keyvault/Azure.Security.KeyVault.Certificates/TROUBLESHOOTING.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/keyvault/Azure.Security.KeyVault.Secrets/MigrationGuide.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/keyvault/Azure.Security.KeyVault.Certificates/TROUBLESHOOTING.md","mimeType":"text/plain; charset=utf-8","text":"# Troubleshooting Azure Key Vault Certificates SDK Issues\n\nThe `Azure.Security.KeyVault.Certificates` package provides APIs for operations on Azure Key Vault for the\n`Certificat...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/keyvault/Azure.Security.KeyVault.Secrets/MigrationGuide.md","mimeType":"text/plain; charset=utf-8","text":"# Migrate from Microsoft.Azure.KeyVault to Azure.Security.KeyVault.Secrets\n\nThis guide is intended to assist in the migration to version 4 of the Key Vault client library [`Azure.Secur...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Documentation Gap\n\n**Package:** `Azure.Security.KeyVault.Secrets`\n**Service directory:** `sdk/keyvault/Azure.Security.KeyVault.Secrets/`\n**Triggered by:** PR #57907 by @jsquire\n\n## What Changed\n\nPR #57907 retired the `sharelink` stand-alone sample (deprecated KV-managed storage accounts feature) and updated stale links in `MigrationGuide.md`. However, the Table of Contents entry for \"Managing shared access signatures\" was lef...`
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
