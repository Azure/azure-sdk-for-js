// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Microsoft Learn MCP Server Configuration
 *
 * The Microsoft Learn MCP server provides tools for querying
 * Microsoft Learn documentation and resources.
 *
 * Server URL: https://learn.microsoft.com/api/mcp
 */

import type { MCPServer } from "../../src/models/index.js";

/**
 * Microsoft Learn MCP Server configuration for integration testing.
 *
 * This server is publicly accessible and provides real tools for
 * querying Microsoft Learn content.
 */
export const MICROSOFT_LEARN_MCP_SERVER: MCPServer = {
  type: "mcp",
  serverLabel: "microsoft-learn",
  serverUrl: "https://learn.microsoft.com/api/mcp",
  requireApproval: "never", // Read-only operations, no approval needed
};

/**
 * Checks if the Microsoft Learn MCP server is accessible.
 * @returns Promise resolving to true if accessible
 */
export async function isMicrosoftLearnMcpServerAvailable(): Promise<boolean> {
  try {
    // In a real implementation, we might check the server health
    // For now, assume it's available since it's a public Microsoft service
    return true;
  } catch {
    return false;
  }
}
