// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentServerEvent } from "../models/models.js";

/**
 * A service event this SDK version does not recognize.
 *
 * These events do not close the connection. The SDK does not validate or transform
 * their payloads, so validate rawEvent before using its fields.
 */
export interface VoiceAgentUnknownEvent {
  /** Identifies an unrecognized event. */
  type: "unknown";
  /** Original event type sent by the service. */
  eventType: string;
  /** Complete event payload, including the original type. */
  rawEvent: Record<string, unknown>;
}

/**
 * An event received from a Realtime voice session.
 *
 * Check type to handle a known event or {@link VoiceAgentUnknownEvent}.
 * Exclude "unknown" before passing an event to a handler for known events only.
 */
export type VoiceAgentRealtimeEvent = VoiceAgentServerEvent | VoiceAgentUnknownEvent;
