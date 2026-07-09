// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ResponseSession deserialization tests for the `expiresAt` field added in the
 * 2026-07-15 GA surface.
 *
 * Covers:
 * - responseSessionDeserializer maps the `expires_at` wire field to `expiresAt`.
 * - responseSessionSerializer maps `expiresAt` back to `expires_at` (round-trip).
 * - `expiresAt` / `expires_at` are omitted when not present.
 * - The field survives through the public `session.created` event path
 *   (serverEventSessionCreatedDeserializer), guarding this server-set field
 *   against silent regression during future customization syncs.
 */

import { describe, it, expect } from "vitest";
import {
  responseSessionDeserializer,
  responseSessionSerializer,
  serverEventSessionCreatedDeserializer,
} from "../../src/models/models.js";

describe("ResponseSession.expiresAt (GA 2026-07-15)", () => {
  it("deserializes expires_at to expiresAt", () => {
    const session = responseSessionDeserializer({
      model: "gpt-realtime",
      id: "sess_123",
      expires_at: 1783646259,
    });

    expect(session.id).toBe("sess_123");
    expect(session.expiresAt).toBe(1783646259);
  });

  it("serializes expiresAt back to expires_at (round-trip)", () => {
    const wire = responseSessionSerializer({
      id: "sess_456",
      expiresAt: 1783646259,
    });

    expect(wire.id).toBe("sess_456");
    expect(wire.expires_at).toBe(1783646259);
    expect(wire).not.toHaveProperty("expiresAt");
  });

  it("leaves expiresAt undefined when expires_at is absent", () => {
    const session = responseSessionDeserializer({
      model: "gpt-realtime",
      id: "sess_789",
    });

    expect(session.expiresAt).toBeUndefined();
  });

  it("surfaces expiresAt through the session.created event", () => {
    const evt = serverEventSessionCreatedDeserializer({
      type: "session.created",
      event_id: "evt_1",
      session: {
        model: "gpt-realtime",
        id: "sess_abc",
        expires_at: 1783646259,
      },
    });

    expect(evt.type).toBe("session.created");
    expect(evt.session.id).toBe("sess_abc");
    expect(evt.session.expiresAt).toBe(1783646259);
  });
});
