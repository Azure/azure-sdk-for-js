<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.4
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_pull_request","description":"Create a new GitHub pull request to propose code changes. Use this after making file edits to submit them for review and merging. The PR will be created from the current branch with your committed changes. For code review comments on an existing PR, use create_pull_request_review_comment instead. CONSTRAINTS: Maximum 1 pull request(s) can be created. Title will be prefixed with \"[docs] \". Labels [documentation automate...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get commit details"},"description":"Get details for a commit from a GitHub repository","inputSchema":{"properties":{"include_diff":{"default":true,"description":"Whether to include file diffs and stats in the response. Default is true.","type":"boolean"},"owner":{"description":"Repository owner","type":"string"},"page":{"description":"Page number for pagination (min 1)","minimum":1,"type":"number"},"perPage":{"descriptio...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [github safeoutputs]
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Summary\n\nThis PR fixes several inconsistencies found between the `documentation/` folder and the actual source code/tooling in this repository.\n\n---\n\n### 1. Node.js version requirement updated (`Quickstart-on-how-to-write-tests.md`, `Generate-code-from-TypeSpec.md`)\n\n**Issue:** Both files said \"Any/all of the LTS versions of Node.js\" as a prerequisite.  \n**Fix:** Updated to \"Node.js 20 or later\" to match the `package.json`...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\",\"patch\":{\"path\":\"/tmp/gh-aw/aw.patch\",\"size\":8889,\"lines\":184}}","type":"text"}],"isError":false}}
  ```
- ✗ **auth** Authentication failed: invalid API key, remote=[::1]:32954, path=/close
- ✓ **shutdown** Shutting down gateway...

</details>
