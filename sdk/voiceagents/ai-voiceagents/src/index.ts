// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "./generated/index.js";
export { VoiceAgentsClient, type VoiceAgentsClientOptions } from "./voiceAgentsClient.js";
export {
  VoiceAgentStreamingClient,
  VoiceAgentConnectionState,
  type VoiceAgentStreamingClientOptions,
  type ConnectVoiceAgentOptions,
  type VoiceAgentConnection,
  type VoiceAgentConnectionStateChangedHandler,
  type VoiceAgentCloseResult,
  type VoiceAgentSendOptions,
  type VoiceAgentSendTextOptions,
  type VoiceAgentSendToolOutputOptions,
  type VoiceAgentSessionUpdateOptions,
  type VoiceAgentResponseOptions,
  type VoiceAgentCancelResponseOptions,
} from "./streaming/voiceAgentStreamingClient.js";
export {
  VoiceAgentStreamingError,
  VoiceAgentAuthenticationError,
  VoiceAgentConnectionError,
  VoiceAgentProtocolError,
  type VoiceAgentStreamingErrorCode,
} from "./streaming/errors.js";
