// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentServerEvent } from "../models/models.js";

/**
 * A server event whose wire type is not recognized by this version of the SDK.
 *
 * The SDK delivers these events without closing the connection or applying known-event
 * validation or normalization. Inspect and validate raw fields before using them.
 */
export interface VoiceAgentUnknownEvent {
  /** SDK fallback discriminator, distinct from every known server event type. */
  type: "unknown";
  /** Original `type` discriminator received from the service. */
  eventType: string;
  /** Complete parsed JSON event, including its original `type` and all other wire fields. */
  rawEvent: Record<string, unknown>;
}

/**
 * An event received from a voice-agent realtime connection.
 *
 * Known events retain their generated types and normalization. Unrecognized wire types
 * are wrapped in {@link VoiceAgentUnknownEvent}. Switch on `type` to narrow known events,
 * or exclude `type === "unknown"` before passing an event to a known-event handler.
 */
export type VoiceAgentRealtimeEvent = VoiceAgentServerEvent | VoiceAgentUnknownEvent;
