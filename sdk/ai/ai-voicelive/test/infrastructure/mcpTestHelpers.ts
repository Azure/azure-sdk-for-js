// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Phase 3: MCP Test Helper Functions
 * 
 * This module provides utility functions to simplify MCP testing, including:
 * - Event waiting and accumulation
 * - Approval workflow helpers
 * - Test data factories
 * - Validation helpers
 */

import type { TestableVoiceLiveSession } from "./testSessionFactory.js";
import type {
  MCPServer,
  ResponseMCPApprovalRequestItem,
  ResponseMCPCallItem,
  MCPTool,
  MCPApprovalResponseRequestItem,
} from "../../src/models/index.js";

/**
 * Waits for a specific MCP event type with timeout.
 * 
 * @param session - The test session
 * @param eventType - The event type to wait for
 * @param timeoutMs - Timeout in milliseconds (default: 5000)
 * @returns Promise resolving to the event
 * @throws Error if timeout occurs
 * 
 * @example
 * ```typescript
 * const event = await waitForMcpEvent(
 *   session,
 *   "mcp_list_tools.completed",
 *   3000
 * );
 * console.log(event.item_id);
 * ```
 */
export function waitForMcpEvent<T = any>(
  session: TestableVoiceLiveSession,
  eventType: string,
  timeoutMs: number = 5000,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutHandle = setTimeout(() => {
      unsubscribe?.();
      reject(new Error(`Timeout waiting for event '${eventType}' after ${timeoutMs}ms`));
    }, timeoutMs);

    const unsubscribe = session.onServerEvent?.(eventType as any, (event: T) => {
      clearTimeout(timeoutHandle);
      unsubscribe?.();
      resolve(event);
    });

    if (!unsubscribe) {
      clearTimeout(timeoutHandle);
      reject(new Error("Session does not support onServerEvent"));
    }
  });
}

/**
 * Waits for an MCP approval request event.
 * 
 * @param session - The test session
 * @param timeoutMs - Timeout in milliseconds (default: 5000)
 * @returns Promise resolving to the approval request item
 * 
 * @example
 * ```typescript
 * const approvalRequest = await waitForApprovalRequest(session);
 * console.log(`Tool ${approvalRequest.name} needs approval`);
 * ```
 */
export async function waitForApprovalRequest(
  session: TestableVoiceLiveSession,
  timeoutMs: number = 5000,
): Promise<ResponseMCPApprovalRequestItem> {
  return new Promise((resolve, reject) => {
    const timeoutHandle = setTimeout(() => {
      unsubscribe?.();
      reject(new Error(`Timeout waiting for approval request after ${timeoutMs}ms`));
    }, timeoutMs);

    const unsubscribe = session.onServerEvent?.("response.output_item.added", (event: any) => {
      if (event.item?.type === "mcp_approval_request") {
        clearTimeout(timeoutHandle);
        unsubscribe?.();
        resolve(event.item as ResponseMCPApprovalRequestItem);
      }
    });

    if (!unsubscribe) {
      clearTimeout(timeoutHandle);
      reject(new Error("Session does not support onServerEvent"));
    }
  });
}

/**
 * Waits for an MCP tool call to complete.
 * 
 * @param session - The test session
 * @param callId - The call item ID to wait for
 * @param timeoutMs - Timeout in milliseconds (default: 10000)
 * @returns Promise resolving to the completed call item
 * 
 * @example
 * ```typescript
 * const result = await waitForToolCompletion(session, "item_123");
 * console.log(result.output);
 * ```
 */
export async function waitForToolCompletion(
  session: TestableVoiceLiveSession,
  callId: string,
  timeoutMs: number = 10000,
): Promise<ResponseMCPCallItem> {
  return new Promise((resolve, reject) => {
    const timeoutHandle = setTimeout(() => {
      unsubscribe?.();
      reject(new Error(`Timeout waiting for tool completion after ${timeoutMs}ms`));
    }, timeoutMs);

    const unsubscribe = session.onServerEvent?.("response.mcp_call.completed", (event: any) => {
      if (event.item_id === callId) {
        clearTimeout(timeoutHandle);
        unsubscribe?.();
        resolve(event as ResponseMCPCallItem);
      }
    });

    if (!unsubscribe) {
      clearTimeout(timeoutHandle);
      reject(new Error("Session does not support onServerEvent"));
    }
  });
}

/**
 * Accumulates argument deltas for a specific item until done event.
 * 
 * @param session - The test session
 * @param itemId - The item ID to accumulate deltas for
 * @param timeoutMs - Timeout in milliseconds (default: 5000)
 * @returns Promise resolving to the complete accumulated arguments string
 * 
 * @example
 * ```typescript
 * const args = await accumulateArgumentDeltas(session, "item_123");
 * const parsed = JSON.parse(args);
 * console.log(parsed);
 * ```
 */
export async function accumulateArgumentDeltas(
  session: TestableVoiceLiveSession,
  itemId: string,
  timeoutMs: number = 5000,
): Promise<string> {
  return new Promise((resolve, reject) => {
    let accumulated = "";
    const timeoutHandle = setTimeout(() => {
      deltaUnsubscribe?.();
      doneUnsubscribe?.();
      reject(new Error(`Timeout accumulating deltas after ${timeoutMs}ms`));
    }, timeoutMs);

    const deltaUnsubscribe = session.onServerEvent?.(
      "response.mcp_call_arguments.delta",
      (event: any) => {
        if (event.item_id === itemId) {
          accumulated += event.delta;
        }
      },
    );

    const doneUnsubscribe = session.onServerEvent?.(
      "response.mcp_call_arguments.done",
      (event: any) => {
        if (event.item_id === itemId) {
          clearTimeout(timeoutHandle);
          deltaUnsubscribe?.();
          doneUnsubscribe?.();
          resolve(event.arguments || accumulated);
        }
      },
    );

    if (!deltaUnsubscribe || !doneUnsubscribe) {
      clearTimeout(timeoutHandle);
      reject(new Error("Session does not support onServerEvent"));
    }
  });
}

/**
 * Sends an approval response for an approval request.
 * 
 * @param session - The test session
 * @param approvalRequestId - The ID of the approval request
 * @param approve - Whether to approve (true) or reject (false)
 * @returns Promise that resolves when the response is sent
 * 
 * @example
 * ```typescript
 * await sendApprovalResponse(session, "approval_123", true);
 * ```
 */
export async function sendApprovalResponse(
  session: TestableVoiceLiveSession,
  approvalRequestId: string,
  approve: boolean,
): Promise<void> {
  const approvalItem: MCPApprovalResponseRequestItem = {
    type: "mcp_approval_response",
    id: `approval_response_${Date.now()}`,
    approvalRequestId,
    approve,
  };

  await session.addConversationItem?.(approvalItem);
}

/**
 * Validates that a tool has the required structure.
 * 
 * @param tool - The tool to validate
 * @returns true if valid, false otherwise
 * 
 * @example
 * ```typescript
 * const tool = { name: "add", inputSchema: { type: "object" } };
 * if (validateToolSchema(tool)) {
 *   console.log("Tool is valid");
 * }
 * ```
 */
export function validateToolSchema(tool: MCPTool): boolean {
  if (!tool.name || typeof tool.name !== "string") {
    return false;
  }

  if (!tool.inputSchema || typeof tool.inputSchema !== "object") {
    return false;
  }

  // Validate inputSchema has required fields
  if (!tool.inputSchema.type) {
    return false;
  }

  return true;
}

/**
 * Validates that an MCP server configuration is well-formed.
 * 
 * @param server - The server configuration to validate
 * @returns true if valid, false otherwise
 * 
 * @example
 * ```typescript
 * const server = {
 *   type: "mcp",
 *   serverLabel: "test",
 *   serverUrl: "http://localhost:8000"
 * };
 * if (validateMCPServer(server)) {
 *   console.log("Server config is valid");
 * }
 * ```
 */
export function validateMCPServer(server: MCPServer): boolean {
  if (server.type !== "mcp") {
    return false;
  }

  if (!server.serverLabel || typeof server.serverLabel !== "string") {
    return false;
  }

  if (!server.serverUrl || typeof server.serverUrl !== "string") {
    return false;
  }

  // Validate URL format
  try {
    new URL(server.serverUrl);
  } catch {
    return false;
  }

  return true;
}

/**
 * Creates a test MCP server configuration with sensible defaults.
 * 
 * @param overrides - Optional overrides for the default configuration
 * @returns MCP server configuration
 * 
 * @example
 * ```typescript
 * const server = createTestMcpServerConfig({
 *   serverLabel: "my-test-server",
 *   requireApproval: "always"
 * });
 * ```
 */
export function createTestMcpServerConfig(overrides?: Partial<MCPServer>): MCPServer {
  const defaults: MCPServer = {
    type: "mcp",
    serverLabel: "test-mcp-server",
    serverUrl: "http://localhost:8100",
  };

  return { ...defaults, ...overrides };
}

/**
 * Creates a test tool definition with sensible defaults.
 * 
 * @param name - Tool name
 * @param description - Optional tool description
 * @param schema - Optional input schema (defaults to empty object schema)
 * @returns Tool definition
 * 
 * @example
 * ```typescript
 * const tool = createTestTool("add", "Adds two numbers", {
 *   type: "object",
 *   properties: {
 *     a: { type: "number" },
 *     b: { type: "number" }
 *   }
 * });
 * ```
 */
export function createTestTool(
  name: string,
  description?: string,
  schema?: any,
): MCPTool {
  return {
    name,
    description: description || `Test tool: ${name}`,
    inputSchema: schema || {
      type: "object",
      properties: {},
    },
  };
}

/**
 * Creates a pre-configured calculator tool for testing.
 * 
 * @returns Calculator tool definition
 * 
 * @example
 * ```typescript
 * const calcTool = createCalculatorTool();
 * // Use in tests
 * ```
 */
export function createCalculatorTool(): MCPTool {
  return {
    name: "calculator",
    description: "Performs basic arithmetic operations",
    inputSchema: {
      type: "object",
      properties: {
        operation: {
          type: "string",
          enum: ["add", "subtract", "multiply", "divide"],
          description: "The operation to perform",
        },
        a: {
          type: "number",
          description: "First operand",
        },
        b: {
          type: "number",
          description: "Second operand",
        },
      },
      required: ["operation", "a", "b"],
    },
    annotations: {
      category: "math",
      complexity: "simple",
    },
  };
}

/**
 * Creates a pre-configured weather tool for testing.
 * 
 * @returns Weather tool definition
 * 
 * @example
 * ```typescript
 * const weatherTool = createWeatherTool();
 * // Use in tests
 * ```
 */
export function createWeatherTool(): MCPTool {
  return {
    name: "get_weather",
    description: "Gets current weather for a location",
    inputSchema: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "City name or coordinates",
        },
        units: {
          type: "string",
          enum: ["metric", "imperial"],
          description: "Temperature units",
        },
      },
      required: ["location"],
    },
    annotations: {
      category: "data",
      readOnly: true,
    },
  };
}

/**
 * Asserts that an event is of the expected type.
 * 
 * @param event - The event to check
 * @param expectedType - The expected event type
 * @throws Error if the event type doesn't match
 * 
 * @example
 * ```typescript
 * const event = await waitForMcpEvent(session, "mcp_list_tools.completed");
 * expectMcpEvent(event, "mcp_list_tools.completed");
 * ```
 */
export function expectMcpEvent(event: any, expectedType: string): void {
  if (!event) {
    throw new Error(`Expected event of type '${expectedType}' but received null/undefined`);
  }

  if (event.type !== expectedType) {
    throw new Error(
      `Expected event type '${expectedType}' but received '${event.type}'`,
    );
  }
}

/**
 * Asserts that a tool exists in a list of tools.
 * 
 * @param tools - Array of tools
 * @param toolName - Name of the tool to find
 * @throws Error if the tool is not found
 * 
 * @example
 * ```typescript
 * const tools = server.getAllTools();
 * expectToolInList(tools, "calculator");
 * ```
 */
export function expectToolInList(tools: MCPTool[], toolName: string): void {
  const found = tools.some((tool) => tool.name === toolName);
  if (!found) {
    const toolNames = tools.map((t) => t.name).join(", ");
    throw new Error(
      `Tool '${toolName}' not found in list. Available tools: ${toolNames || "(none)"}`,
    );
  }
}
