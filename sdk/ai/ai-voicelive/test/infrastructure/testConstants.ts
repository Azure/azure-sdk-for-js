// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Test constants used across VoiceLive test suites
 */
export const TestConstants = {
  // Test endpoints
  ENDPOINT: "https://test.voicelive.azure.com",
  WS_ENDPOINT: "wss://test.voicelive.azure.com/voice-agent/realtime",

  // Test credentials
  TEST_API_KEY: "test-api-key-12345",

  // Model and voice names
  MODEL_NAME: "gpt-4-realtime-preview",
  VOICE_NAME: "alloy",

  // Test data
  SAMPLE_AUDIO_DATA: new Uint8Array([0x01, 0x02, 0x03, 0x04]),
  SAMPLE_AUDIO_BASE64: "AQIDBA==",

  // Test conversation items
  SAMPLE_USER_MESSAGE: "Hello, how can you help me today?",
  SAMPLE_ASSISTANT_MESSAGE: "I'm here to help you with any questions you have.",

  // Test session ID and event IDs
  SAMPLE_SESSION_ID: "session_123",
  SAMPLE_EVENT_ID: "event_456",
  SAMPLE_TURN_ID: "turn_789",
  SAMPLE_CALL_ID: "call_abc123",

  // Test function definitions
  SAMPLE_FUNCTION_NAME: "get_weather",
  SAMPLE_FUNCTION_DESCRIPTION: "Get current weather for a location",
  SAMPLE_FUNCTION_ARGS: '{"location": "San Francisco"}',
  SAMPLE_FUNCTION_RESULT: '{"temperature": "22°C", "condition": "sunny"}',

  // Test MCP server definitions
  SAMPLE_MCP_SERVER_LABEL: "weather-server",
  SAMPLE_MCP_SERVER_URL: "https://weather-mcp.example.com",
  SAMPLE_MCP_TOOL_NAME: "get_weather",
  SAMPLE_MCP_TOOL_DESCRIPTION: "Get current weather for a location",
  SAMPLE_MCP_APPROVAL_REQUEST_ID: "approval_123",

  // Timeouts and delays
  DEFAULT_TIMEOUT_MS: 5000,
  SHORT_TIMEOUT_MS: 1000,
  CONNECTION_TIMEOUT_MS: 10000,
  STANDARD_TIMEOUT_MS: 30000,
  AGENT_TIMEOUT_MS: 60000,

  // Foundry Agent Configuration
  // Note: FOUNDRY_PROJECT_NAME should be set via environment variable for real tests
  FOUNDRY_PROJECT_NAME: "test-project",

  // Error messages
  INVALID_STATE_ERROR: "Invalid state for operation",
  CONNECTION_ERROR: "Connection failed",
  TIMEOUT_ERROR: "Operation timed out",

  // Test event types
  EVENT_TYPES: {
    SESSION_CREATED: "session.created",
    SESSION_UPDATED: "session.updated",
    INPUT_AUDIO_BUFFER_APPEND: "input_audio_buffer.append",
    INPUT_AUDIO_TURN_START: "input_audio_turn.start",
    INPUT_AUDIO_TURN_END: "input_audio_turn.end",
    CONVERSATION_ITEM_CREATE: "conversation.item.create",
    RESPONSE_CREATE: "response.create",
    RESPONSE_DONE: "response.done",
    FUNCTION_CALL_ARGUMENTS_DONE: "response.function_call.arguments.done",
    FUNCTION_CALL_OUTPUT: "conversation.item.function_call_output",
    MCP_LIST_TOOLS_IN_PROGRESS: "mcp_list_tools.in_progress",
    MCP_LIST_TOOLS_COMPLETED: "mcp_list_tools.completed",
    MCP_LIST_TOOLS_FAILED: "mcp_list_tools.failed",
    MCP_CALL_ARGUMENTS_DELTA: "response.mcp_call_arguments.delta",
    MCP_CALL_ARGUMENTS_DONE: "response.mcp_call_arguments.done",
    MCP_CALL_IN_PROGRESS: "response.mcp_call.in_progress",
    MCP_CALL_COMPLETED: "response.mcp_call.completed",
    MCP_CALL_FAILED: "response.mcp_call.failed",
    ERROR: "error",
  },
} as const;

/**
 * Helper to create test audio data of specified size
 */
export function createTestAudioData(sizeBytes: number): Uint8Array {
  const data = new Uint8Array(sizeBytes);
  for (let i = 0; i < sizeBytes; i++) {
    data[i] = i % 256;
  }
  return data;
}

/**
 * Helper to encode audio data as base64 (browser-compatible)
 */
export function audioToBase64(audioData: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    // Node.js environment
    return Buffer.from(audioData).toString("base64");
  } else {
    // Browser environment - use btoa with proper encoding
    const binaryString = Array.from(audioData, (byte) => String.fromCharCode(byte)).join("");
    return btoa(binaryString);
  }
}

/**
 * Helper to decode base64 audio data (browser-compatible)
 */
export function base64ToAudio(base64: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    // Node.js environment
    return new Uint8Array(Buffer.from(base64, "base64"));
  } else {
    // Browser environment - use atob with proper decoding
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}

/**
 * Create a test session.created event
 */
export function createSessionCreatedEvent(
  sessionId: string = TestConstants.SAMPLE_SESSION_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.SESSION_CREATED,
    event_id: TestConstants.SAMPLE_EVENT_ID,
    session: {
      id: sessionId,
      model: TestConstants.MODEL_NAME,
      voice: TestConstants.VOICE_NAME,
    },
  });
}

/**
 * Create a test session.updated event
 */
export function createSessionUpdatedEvent(
  sessionId: string = TestConstants.SAMPLE_SESSION_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.SESSION_UPDATED,
    event_id: TestConstants.SAMPLE_EVENT_ID,
    session: {
      id: sessionId,
      model: TestConstants.MODEL_NAME,
      voice: TestConstants.VOICE_NAME,
    },
  });
}

/**
 * Create a test function call arguments done event
 */
export function createFunctionCallArgumentsDoneEvent(
  functionName: string = TestConstants.SAMPLE_FUNCTION_NAME,
  callId: string = TestConstants.SAMPLE_CALL_ID,
  args: string = TestConstants.SAMPLE_FUNCTION_ARGS,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.FUNCTION_CALL_ARGUMENTS_DONE,
    event_id: TestConstants.SAMPLE_EVENT_ID,
    call_id: callId,
    name: functionName,
    arguments: args,
  });
}

/**
 * Create a test error event
 */
export function createErrorEvent(errorMessage: string = TestConstants.CONNECTION_ERROR): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.ERROR,
    event_id: TestConstants.SAMPLE_EVENT_ID,
    error: {
      message: errorMessage,
      code: "test_error",
    },
  });
}

/**
 * Sleep helper for async tests
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a test abort signal that aborts after specified timeout
 */
export function createTimeoutAbortSignal(timeoutInMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutInMs);
  return controller.signal;
}

/**
 * Extract message type from JSON message string
 */
export function extractMessageType(message: string): string | null {
  try {
    const parsed = JSON.parse(message);
    return parsed.type || null;
  } catch {
    return null;
  }
}

/**
 * Validate that a message has required properties
 */
export function validateMessage(message: string, requiredProperties: string[]): boolean {
  try {
    const parsed = JSON.parse(message);
    return requiredProperties.every((prop) => Object.prototype.hasOwnProperty.call(parsed, prop));
  } catch {
    return false;
  }
}

/**
 * Count messages of a specific type in an array
 */
export function countMessagesByType(messages: string[], messageType: string): number {
  return messages.filter((msg) => extractMessageType(msg) === messageType).length;
}

/**
 * Get all messages of a specific type
 */
export function getMessagesByType(messages: string[], messageType: string): any[] {
  return messages
    .filter((msg) => extractMessageType(msg) === messageType)
    .map((msg) => JSON.parse(msg));
}

/**
 * Get the last message of a specific type
 */
export function getLastMessageByType(messages: string[], messageType: string): any | null {
  const filtered = getMessagesByType(messages, messageType);
  return filtered.length > 0 ? filtered[filtered.length - 1] : null;
}

/**
 * Create a test MCP list tools in progress event
 */
export function createMcpListToolsInProgressEvent(
  itemId: string = "item_123",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.MCP_LIST_TOOLS_IN_PROGRESS,
    event_id: eventId,
    item_id: itemId,
  });
}

/**
 * Create a test MCP list tools completed event
 */
export function createMcpListToolsCompletedEvent(
  itemId: string = "item_123",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.MCP_LIST_TOOLS_COMPLETED,
    event_id: eventId,
    item_id: itemId,
  });
}

/**
 * Create a test MCP list tools failed event
 */
export function createMcpListToolsFailedEvent(
  itemId: string = "item_123",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.MCP_LIST_TOOLS_FAILED,
    event_id: eventId,
    item_id: itemId,
  });
}

/**
 * Create a test MCP call arguments delta event
 */
export function createMcpCallArgumentsDeltaEvent(
  itemId: string = "item_123",
  responseId: string = "resp_456",
  outputIndex: number = 0,
  delta: string = '{"location": "San',
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.MCP_CALL_ARGUMENTS_DELTA,
    event_id: eventId,
    response_id: responseId,
    item_id: itemId,
    output_index: outputIndex,
    delta: delta,
  });
}

/**
 * Create a test MCP call arguments done event
 */
export function createMcpCallArgumentsDoneEvent(
  itemId: string = "item_123",
  responseId: string = "resp_456",
  outputIndex: number = 0,
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.MCP_CALL_ARGUMENTS_DONE,
    event_id: eventId,
    response_id: responseId,
    item_id: itemId,
    output_index: outputIndex,
  });
}

/**
 * Create a test MCP call in progress event
 */
export function createMcpCallInProgressEvent(
  itemId: string = "item_123",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.MCP_CALL_IN_PROGRESS,
    event_id: eventId,
    item_id: itemId,
  });
}

/**
 * Create a test MCP call completed event
 */
export function createMcpCallCompletedEvent(
  itemId: string = "item_123",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.MCP_CALL_COMPLETED,
    event_id: eventId,
    item_id: itemId,
  });
}

/**
 * Create a test MCP call failed event
 */
export function createMcpCallFailedEvent(
  itemId: string = "item_123",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: TestConstants.EVENT_TYPES.MCP_CALL_FAILED,
    event_id: eventId,
    item_id: itemId,
  });
}

/**
 * Create a test MCP approval request item
 */
export function createMcpApprovalRequestEvent(
  approvalRequestId: string = TestConstants.SAMPLE_MCP_APPROVAL_REQUEST_ID,
  toolName: string = TestConstants.SAMPLE_MCP_TOOL_NAME,
  serverLabel: string = TestConstants.SAMPLE_MCP_SERVER_LABEL,
  args: string = TestConstants.SAMPLE_FUNCTION_ARGS,
  responseId: string = "resp_456",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: "response.output_item.added",
    event_id: eventId,
    response_id: responseId,
    output_index: 0,
    item: {
      type: "mcp_approval_request",
      id: approvalRequestId,
      object: "realtime.item",
      status: "completed",
      arguments: args,
      name: toolName,
      serverLabel: serverLabel,
    },
  });
}

/**
 * Create a test MCP list tools response item event
 */
export function createMcpListToolsResponseEvent(
  serverLabel: string = TestConstants.SAMPLE_MCP_SERVER_LABEL,
  tools: any[] = [
    {
      name: TestConstants.SAMPLE_MCP_TOOL_NAME,
      description: TestConstants.SAMPLE_MCP_TOOL_DESCRIPTION,
      inputSchema: {
        type: "object",
        properties: {
          location: { type: "string" },
        },
        required: ["location"],
      },
    },
  ],
  responseId: string = "resp_456",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: "response.output_item.added",
    event_id: eventId,
    response_id: responseId,
    output_index: 0,
    item: {
      type: "mcp_list_tools",
      id: "list_tools_123",
      object: "realtime.item",
      tools: tools,
      serverLabel: serverLabel,
    },
  });
}

/**
 * Create a test MCP call response item event
 */
export function createMcpCallResponseEvent(
  toolName: string = TestConstants.SAMPLE_MCP_TOOL_NAME,
  serverLabel: string = TestConstants.SAMPLE_MCP_SERVER_LABEL,
  args: string = TestConstants.SAMPLE_FUNCTION_ARGS,
  approvalRequestId?: string,
  responseId: string = "resp_456",
  eventId: string = TestConstants.SAMPLE_EVENT_ID,
): string {
  return JSON.stringify({
    type: "response.output_item.added",
    event_id: eventId,
    response_id: responseId,
    output_index: 0,
    item: {
      type: "mcp_call",
      id: "mcp_call_123",
      object: "realtime.item",
      status: "in_progress",
      ...(approvalRequestId && { approvalRequestId }),
      name: toolName,
      arguments: args,
      serverLabel: serverLabel,
    },
  });
}
