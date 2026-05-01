<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.8
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"add_comment","description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. IMPORTANT: Comments are subject to validation constraints enforced by the MCP server - maximum 65536 characters for the complete comment (including footer which is added a...`
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
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":56998,"method":"get_comments","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":56998,"method":"get","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"[]","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":56998,\"title\":\"[FEATURE REQ] Support Key Vault REST API version 2026-02-01 in Azure.Security.KeyVault.*\",\"body\":\"### Library name\\n\\nAzure.Security.KeyVault.*\\n\\n### Please describe the feature.\\n\\n### Feature request\\n\\nPlease add support for Key Vault REST API version `2026-02-01` in the `Azure.Security.KeyVault.*` client libraries (`Secrets`, `Keys`, and `Certificates`).\\n\\n### Background\\n\\nMicrosoft Learn...`
- 🔍 rpc **github**→`tools/call` `get_label`
  
  ```json
  {"params":{"arguments":{"name":"customer-reported","owner":"Azure","repo":"azure-sdk-for-net"},"name":"get_label"}}
  ```
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"query":"repo:Azure/azure-sdk-for-net KeyVault API version 2026 is:open"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"color\":\"3800e0\",\"description\":\"Issues that are reported by GitHub users external to the Azure organization.\",\"id\":\"MDU6TGFiZWwxMzUzMzE2MTgz\",\"name\":\"customer-reported\"}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":4061829536,\"number\":56998,\"state\":\"open\",\"locked\":false,\"title\":\"[FEATURE REQ] Support Key Vault REST API version 2026-02-01 in Azure.Security.KeyVault.*\",\"body\":\"### Library name\\n\\nAzure.Security.KeyVault.*\\n\\n### Please describe the feature.\\n\\n### Feature request\\n\\nPlease add support for Key Vault REST API version `2026-02-01` in the `Azure.Securi...`
- 🔍 rpc **github**→`tools/call` `get_label`
  
  ```json
  {"params":{"arguments":{"name":"Client","owner":"Azure","repo":"azure-sdk-for-net"},"name":"get_label"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_label`
  
  ```json
  {"params":{"arguments":{"name":"needs-team-triage","owner":"Azure","repo":"azure-sdk-for-net"},"name":"get_label"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_label`
  
  ```json
  {"params":{"arguments":{"name":"feature-request","owner":"Azure","repo":"azure-sdk-for-net"},"name":"get_label"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_label`
  
  ```json
  {"params":{"arguments":{"name":"needs-team-attention","owner":"Azure","repo":"azure-sdk-for-net"},"name":"get_label"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_label`
  
  ```json
  {"params":{"arguments":{"name":"KeyVault","owner":"Azure","repo":"azure-sdk-for-net"},"name":"get_label"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"color\":\"eaa875\",\"description\":\"This issue requires a new behavior in the product in order be resolved.\",\"id\":\"MDU6TGFiZWwxMzY5Njg4Mjk2\",\"name\":\"feature-request\"}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"color\":\"3BA0F8\",\"description\":\"Workflow: This issue needs attention from Azure service team or SDK team\",\"id\":\"MDU6TGFiZWwxOTM2OTU2NjM4\",\"name\":\"needs-team-attention\"}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"color\":\"e99695\",\"description\":\"\",\"id\":\"MDU6TGFiZWwxODY5MTE0OTE=\",\"name\":\"KeyVault\"}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"color\":\"ededed\",\"description\":\"Workflow: This issue needs the team to triage.\",\"id\":\"MDU6TGFiZWwxOTM2OTYwNjA3\",\"name\":\"needs-team-triage\"}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"color\":\"ffeb77\",\"description\":\"This issue is related to a non-management package\",\"id\":\"MDU6TGFiZWwxMTc4NDQ3ODYw\",\"name\":\"Client\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `add_labels`
  
  ```json
  {"params":{"arguments":{"item_number":56998,"labels":["Client","KeyVault","customer-reported","needs-team-attention","needs-team-triage","feature-request"]},"name":"add_labels"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## 🎯 Agentic Issue Triage\n\n**Summary:** This is a feature request to add support for Key Vault REST API version `2026-02-01` in the `Azure.Security.KeyVault.*` client libraries (Secrets, Keys, and Certificates). The requester notes the current latest supported API version in the SDK is `2025-07-01`, and the new `2026-02-01` version introduces an important behavioral change (new vaults default to Azure RBAC). Older API versions are pl...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":4,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
