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
- ✓ **startup** Routes: /mcp/<server> for servers: [safeoutputs github]
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Summary of Changes\n\nThis PR fixes two documentation inconsistencies found in the `documentation/` folder.\n\n### 1. `Generate-code-from-TypeSpec.md` – Incorrect pnpm install command\n\n**Problem:** The command `npm install -g @pnpm` is incorrect. There is no npm package named `@pnpm`; the correct package name is `pnpm`.\n\n**Fix:** Changed `npm install -g @pnpm` to `npm install -g pnpm`.\n\n### 2. `Quickstart-on-how-to-write-tests....`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\",\"patch\":{\"path\":\"/tmp/gh-aw/aw.patch\",\"size\":4774,\"lines\":110}}","type":"text"}],"isError":false}}
  ```
- ✗ **auth** Authentication failed: invalid API key, remote=[::1]:38326, path=/close
- ✓ **shutdown** Shutting down gateway...

</details>
