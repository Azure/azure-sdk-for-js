<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [safeoutputs github]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 15 comment(s) can be added.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is the 'body' field...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get details of GitHub Actions resources (workflows, workflow runs, jobs, and artifacts)"},"description":"Get details about specific GitHub Actions resources.\nUse this tool to get details about individual workflows, workflow runs, jobs, and artifacts by their unique IDs.\n","inputSchema":{"properties":{"method":{"description":"The method to execute","enum":["get_workflow","get_workflow_run","get_workflow_job","download_w...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-rest-api-specs"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":39093389,\"name\":\"azure-rest-api-specs\",\"full_name\":\"Azure/azure-rest-api-specs\",\"description\":\"The source for REST API specifications for Microsoft Azure.\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs\",\"language\":\"TypeSpec\",\"stargazers_count\":3059,\"forks_count\":5726,\"open_issues_count\":3762,\"updated_at\":\"2026-04-22T23:06:30Z\",\"crea...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42591","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42591,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\",\"body\":\"## SDK generate request for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\\n\\nRequest to regenerate SDK after @scope decorator was added to exclude SloView operations (PR #42529 merged to main).\\n\\n**Release Plan**: [33965](https://web.po...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42591,"method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42591,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\",\"body\":\"## SDK generate request for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\\n\\nRequest to regenerate SDK after @scope decorator was added to exclude SloView operations (PR #42529 merged to main).\\n\\n**Release Plan**: [33965](https://web.po...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42591","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42591,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\",\"body\":\"## SDK generate request for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\\n\\nRequest to regenerate SDK after @scope decorator was added to exclude SloView operations (PR #42529 merged to main).\\n\\n**Release Plan**: [33965](https://web.po...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42591,"method":"get_comments","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42591","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"[]","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42591,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\",\"body\":\"## SDK generate request for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\\n\\nRequest to regenerate SDK after @scope decorator was added to exclude SloView operations (PR #42529 merged to main).\\n\\n**Release Plan**: [33965](https://web.po...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42591,"method":"get_labels","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42591","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"labels\":[{\"color\":\"85d6f1\",\"description\":\"To assign SDK generation to SDK generation agent.\",\"id\":\"LA_kwDOAlSEjc8AAAACYsc1iA\",\"name\":\"Run sdk generation\"}],\"totalCount\":1}","type":"text"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42591,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\",\"body\":\"## SDK generate request for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\\n\\nRequest to regenerate SDK after @scope decorator was added to exclude SloView operations (PR #42529 merged to main).\\n\\n**Release Plan**: [33965](https://web.po...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42591","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42591,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\",\"body\":\"## SDK generate request for TypeSpec project specification/monitoringservice/resource-manager/Microsoft.Monitor/Slis\\n\\nRequest to regenerate SDK after @scope decorator was added to exclude SloView operations (PR #42529 merged to main).\\n\\n**Release Plan**: [33965](https://web.po...`
- 🔍 rpc **github**→`tools/call` `actions_get`
  
  ```json
  {"params":{"arguments":{"method":"get_workflow_run","owner":"Azure","repo":"azure-rest-api-specs","resource_id":"24807436079"},"name":"actions_get"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"id\":24807436079,\"name\":\"SDK Generation Agent\",\"node_id\":\"WFR_kwLOAlSEjc8AAAAFxqNvLw\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/sdk-generation-agent.lock.yml\",\"run_number\":3367,\"run_attempt\":1,\"event\":\"issues\",\"display_title\":\"SDK Generation Agent\",\"status\":\"in_progress\",\"workflow_id\":238779684,\"check_suite_id\":65793278715,\"check_suite_node_id\":\"CS_kwDOAlSEjc8AAAAPUZ...`
- 🔍 rpc **github**→`tools/call` `get_job_logs`
  
  ```json
  {"params":{"arguments":{"failed_only":false,"owner":"Azure","repo":"azure-rest-api-specs","return_content":true,"run_id":24807436079,"tail_lines":200},"name":"get_job_logs"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"job_id is required when failed_only is false","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_jobs","owner":"Azure","repo":"azure-rest-api-specs","resource_id":"24807436079"},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"jobs\":{\"total_count\":3,\"jobs\":[{\"id\":72604749677,\"run_id\":24807436079,\"run_url\":\"https://api.github.com/repos/Azure/azure-rest-api-specs/actions/runs/24807436079\",\"node_id\":\"CR_kwDOAlSEjc8AAAAQ55SPbQ\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-rest-api-specs/actions/jobs/72604749677\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs/actions/runs/248...`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_run_artifacts","owner":"Azure","repo":"azure-rest-api-specs","resource_id":"24807436079"},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"artifacts\":[{\"id\":6590651352,\"node_id\":\"MDg6QXJ0aWZhY3Q2NTkwNjUxMzUy\",\"name\":\"activation\",\"size_in_bytes\":5794,\"url\":\"https://api.github.com/repos/Azure/azure-rest-api-specs/actions/artifacts/6590651352\",\"archive_download_url\":\"https://api.github.com/repos/Azure/azure-rest-api-specs/actions/artifacts/6590651352/zip\",\"expired\":false,\"created_at\":\"2026-04-22T23:12:08Z\",\"updated_at\":\"2026-04-2...`
- 🔍 rpc **github**→`tools/call` `actions_get`
  
  ```json
  {"params":{"arguments":{"method":"download_workflow_run_artifact","owner":"Azure","repo":"azure-rest-api-specs","resource_id":"6590651352"},"name":"actions_get"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"artifact_id\":6590651352,\"download_url\":\"https://productionresultssa19.blob.core.windows.net/actions-results/d88f6988-5a8d-4427-ba8f-06d99d1f2b7e/workflow-job-run-6a95eef5-f658-5fba-bc91-755e04e8052a/artifacts/[REDACTED].zip?rscd=attachment%3B+filename%3D%22activation.zip%22\\u0026rsct=application%2Fzip\\u0026se=2026-04-22T23%3A25%3A13Z\\u0026sig=%2Bz8wmckxrlOEr%2BMK320ErpKyTgT4NpZRikOayAMJ%2BjM%3D\\u0026ske=2026-04-23T00%3A22%3A38Z\\...`
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"query":"repo:Azure/azure-rest-api-specs is:issue number:42591"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"query":"repo:Azure/azure-rest-api-specs is:issue label:\\\"Run sdk generation\\\" author:saleelpk"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Agent - Unable to Process Request\n\nThe SDK Generation Agent was triggered for this issue, but was unable to extract the required details to proceed with SDK generation.\n\n**Reason:** The issue content could not be read by the agent due to security integrity constraints. The agent requires \"approved\" integrity level to process issue content, but this issue's content is below that threshold.\n\n**Required Information:...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_sIRq4M4c\",\"comment\":\"#aw_sIRq4M4c\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `noop`
  
  ```json
  {"params":{"arguments":{"integrity":"high","message":"SDK generation could not be processed for issue #42591. The issue content was filtered by the integrity policy (content below 'approved' trust level), preventing the agent from extracting the required TypeSpec project path, release plan ID, work item ID, API version, and release type. A comment was added to the issue explaining the situation and providing next steps.","secrecy":"public"},"name":"noop"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
