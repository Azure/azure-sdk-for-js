# Sentinel Security Review History

## PR #37993 - eng/common/mcp/azure-sdk-mcp.ps1
- **Date**: 2026-04-10
- **Result**: Clean (no findings)
- **Changes**: 3 defensive bug fixes in PowerShell MCP installer
  1. ErrorAction SilentlyContinue→Ignore (equivalent)
  2. Null guard for $localVersion before JSON access
  3. Diagnostic logging of raw upgrade output when JSON parse fails
- **Notes**: eng/common/mcp scripts are dev tooling, not production SDK code
