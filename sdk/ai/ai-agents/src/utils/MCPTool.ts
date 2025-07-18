// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MCPToolDefinition,
  MCPToolResource,
  ToolResources,
} from "../index.js";
/**
 * A tool that connects to Model Context Protocol (MCP) servers.
 * Supports managing MCP server connections and allowed tools dynamically.
 */
export class MCPTool {
  private _serverLabel: string;
  private _serverUrl: string;
  private _allowedTools: string[];
  private _requireApproval?: "always" | "never";
  private _headers: Record<string, string>;

  /**
   * Constructor initializes the tool with MCP server configuration.
   * @param serverLabel - The label for the MCP server
   * @param serverUrl - The endpoint for the MCP server
   * @param allowedTools - List of allowed tools for MCP server
   */
  constructor(serverLabel: string, serverUrl: string, allowedTools?: string[]) {
    this._serverLabel = serverLabel;
    this._serverUrl = serverUrl;
    this._allowedTools = allowedTools || [];
    this._requireApproval = "always"; // Default to always require approval
    this._headers = {};
  }
  /**
   * Get the MCP tool resource.
   * @returns The MCP tool resource
   */
  get _resource(): MCPToolResource {
    return {
      serverLabel: this._serverLabel,
      headers: this._headers,
      requireApproval: this._requireApproval,
    };
  }

  /**
   * Set the MCP tool definition.
   * @returns The MCP tool definition
   * */
  get _definition(): MCPToolDefinition {
    return {
      type: "mcp",
      serverLabel: this._serverLabel,
      serverUrl: this._serverUrl,
      allowedTools: this._allowedTools.length > 0 ? this._allowedTools : undefined,
    };
  }

  /**
   * Get the MCP tool definition.
   * @returns A list containing the MCP tool definition
   */
  get definitions(): MCPToolDefinition[] {
    return [this._definition];
  }

  /**
   * Add a tool to the list of allowed tools.
   * @param toolName - The name of the tool to allow
   */
  allowTool(toolName: string): void {
    if (!this._allowedTools.includes(toolName)) {
      this._allowedTools.push(toolName);
    }
  }

  /**
   * Remove a tool from the list of allowed tools.
   * @param toolName - The name of the tool to remove from allowed tools
   * @throws Error if the tool is not in the allowed tools list
   */
  disallowTool(toolName: string): void {
    const index = this._allowedTools.indexOf(toolName);
    if (index > -1) {
      this._allowedTools.splice(index, 1);
    } else {
      throw new Error(`Tool '${toolName}' is not in the allowed tools list.`);
    }
  }

  /**
   * Update the approval mode for the MCP tool.
   * @param requireApproval - The require_approval setting to update
   */
  setApprovalMode(requireApproval?: "always" | "never"): void {
    this._requireApproval = requireApproval;
  }

  /**
   * Update the headers for the MCP tool.
   * @param key - The header key to update
   * @param value - The new value for the header key
   * @throws Error if the key is empty
   */
  updateHeaders(key: string, value: string): void {
    if (key) {
      this._headers[key] = value;
    } else {
      throw new Error("Header key cannot be empty.");
    }
  }

  /**
   * Get the server label for the MCP tool.
   */
  get serverLabel(): string {
    return this._serverLabel;
  }

  /**
   * Get the server URL for the MCP tool.
   */
  get serverUrl(): string {
    return this._serverUrl;
  }

  /**
   * Get the list of allowed tools for the MCP server.
   */
  get allowedTools(): string[] {
    return [...this._allowedTools];
  }

  /**
   * Get the headers for the MCP tool.
   */
  get headers(): Record<string, string> {
    return { ...this._headers };
  }

  /**
   * Get the tool resources for the agent.
   */
  get resources(): ToolResources {
    return {
      mcp: [this._resource],
    };
  }

  /**
   * MCPTool approvals should currently be handled client-side.
   * @param _toolCall - The tool call to execute
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(_toolCall: any): void {
    // MCPTool approvals are handled client-side
  }
}
