// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Serialization tests for the input-text client events added in the
 * 2026-07-15 GA surface: `input_text.delta` and `input_text.done`.
 *
 * Covers:
 * - clientEventInputTextDeltaSerializer / clientEventInputTextDoneSerializer
 *   camelCase → snake_case wire mapping (`eventId` → `event_id`,
 *   `contentIndex` → `content_index`).
 * - Optional `contentIndex` is omitted (undefined) when not provided.
 * - clientEventUnionSerializer dispatches both event shapes to the correct
 *   serializer and preserves the wire `type` discriminator, guarding against
 *   dispatch or wire-name regressions.
 * - KnownClientEventType enum values for the two events.
 */

import { describe, it, expect } from "vitest";
import type {
  ClientEventInputTextDelta,
  ClientEventInputTextDone,
} from "../../src/models/index.js";
import {
  clientEventInputTextDeltaSerializer,
  clientEventInputTextDoneSerializer,
  clientEventUnionSerializer,
  KnownClientEventType,
} from "../../src/models/models.js";

describe("Input-text client events (GA 2026-07-15)", () => {
  describe("ClientEventInputTextDelta", () => {
    it("serializes all fields to snake_case wire format", () => {
      const evt: ClientEventInputTextDelta = {
        type: "input_text.delta",
        eventId: "client-evt-1",
        id: "item-1",
        delta: "Hello",
        contentIndex: 2,
      };

      const wire = clientEventInputTextDeltaSerializer(evt);

      expect(wire.type).toBe("input_text.delta");
      expect(wire.event_id).toBe("client-evt-1");
      expect(wire.id).toBe("item-1");
      expect(wire.delta).toBe("Hello");
      expect(wire.content_index).toBe(2);
      // Ensure camelCase keys are not leaked to the wire.
      expect(wire).not.toHaveProperty("eventId");
      expect(wire).not.toHaveProperty("contentIndex");
    });

    it("omits optional contentIndex and eventId when not provided", () => {
      const evt: ClientEventInputTextDelta = {
        type: "input_text.delta",
        id: "item-2",
        delta: "world",
      };

      const wire = clientEventInputTextDeltaSerializer(evt);

      expect(wire.type).toBe("input_text.delta");
      expect(wire.id).toBe("item-2");
      expect(wire.delta).toBe("world");
      expect(wire.content_index).toBeUndefined();
      expect(wire.event_id).toBeUndefined();
    });
  });

  describe("ClientEventInputTextDone", () => {
    it("serializes all fields to snake_case wire format", () => {
      const evt: ClientEventInputTextDone = {
        type: "input_text.done",
        eventId: "client-evt-2",
        id: "item-3",
        contentIndex: 0,
      };

      const wire = clientEventInputTextDoneSerializer(evt);

      expect(wire.type).toBe("input_text.done");
      expect(wire.event_id).toBe("client-evt-2");
      expect(wire.id).toBe("item-3");
      expect(wire.content_index).toBe(0);
      expect(wire).not.toHaveProperty("eventId");
      expect(wire).not.toHaveProperty("contentIndex");
      // `input_text.done` carries no text delta.
      expect(wire).not.toHaveProperty("delta");
    });

    it("omits optional contentIndex and eventId when not provided", () => {
      const evt: ClientEventInputTextDone = {
        type: "input_text.done",
        id: "item-4",
      };

      const wire = clientEventInputTextDoneSerializer(evt);

      expect(wire.type).toBe("input_text.done");
      expect(wire.id).toBe("item-4");
      expect(wire.content_index).toBeUndefined();
      expect(wire.event_id).toBeUndefined();
    });
  });

  describe("clientEventUnionSerializer dispatch", () => {
    it("routes input_text.delta to the delta serializer", () => {
      const evt: ClientEventInputTextDelta = {
        type: "input_text.delta",
        eventId: "u-1",
        id: "item-5",
        delta: "chunk",
        contentIndex: 1,
      };

      const wire = clientEventUnionSerializer(evt);

      expect(wire.type).toBe("input_text.delta");
      expect(wire.event_id).toBe("u-1");
      expect(wire.id).toBe("item-5");
      expect(wire.delta).toBe("chunk");
      expect(wire.content_index).toBe(1);
    });

    it("routes input_text.done to the done serializer", () => {
      const evt: ClientEventInputTextDone = {
        type: "input_text.done",
        eventId: "u-2",
        id: "item-6",
        contentIndex: 3,
      };

      const wire = clientEventUnionSerializer(evt);

      expect(wire.type).toBe("input_text.done");
      expect(wire.event_id).toBe("u-2");
      expect(wire.id).toBe("item-6");
      expect(wire.content_index).toBe(3);
      // Dispatching to the done serializer must not add a delta field.
      expect(wire).not.toHaveProperty("delta");
    });
  });

  describe("KnownClientEventType", () => {
    it("exposes the input_text wire values", () => {
      expect(KnownClientEventType.InputTextDelta).toBe("input_text.delta");
      expect(KnownClientEventType.InputTextDone).toBe("input_text.done");
    });
  });
});
