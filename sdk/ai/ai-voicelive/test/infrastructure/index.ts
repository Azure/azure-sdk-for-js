// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { MockVoiceLiveWebSocket } from "./mockWebSocket.js";
export {
  TestConstants,
  createTestAudioData,
  audioToBase64,
  base64ToAudio,
  createSessionCreatedEvent,
  createSessionUpdatedEvent,
  createFunctionCallArgumentsDoneEvent,
  createErrorEvent,
  createMcpListToolsInProgressEvent,
  createMcpListToolsCompletedEvent,
  createMcpListToolsFailedEvent,
  createMcpCallArgumentsDeltaEvent,
  createMcpCallArgumentsDoneEvent,
  createMcpCallInProgressEvent,
  createMcpCallCompletedEvent,
  createMcpCallFailedEvent,
  createMcpApprovalRequestEvent,
  createMcpListToolsResponseEvent,
  createMcpCallResponseEvent,
} from "./testConstants.js";
export {
  TestSessionFactory,
  SessionTestUtils,
  TestableVoiceLiveSession,
  MockTokenCredential,
  MockKeyCredential,
} from "./testSessionFactory.js";
export * from "./testConstants.js";

// Phase 3: MCP Test Infrastructure
export * from "./mcpTestHelpers.js";
