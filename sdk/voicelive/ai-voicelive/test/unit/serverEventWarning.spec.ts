// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * ServerEventWarning deserialization tests (GA 1.0.0).
 *
 * Covers:
 * - serverEventWarningDeserializer maps snake_case wire format to camelCase model.
 * - serverEventWarningDetailsDeserializer round-trip.
 * - serverEventUnionDeserializer dispatches "warning" events correctly.
 * - KnownServerEventType.Warning enum value.
 */

import { describe, it, expect } from "vitest";
import type { ServerEventWarning } from "../../src/models/index.js";
import {
  serverEventWarningDeserializer,
  serverEventWarningDetailsDeserializer,
  serverEventUnionDeserializer,
  KnownServerEventType,
} from "../../src/models/models.js";

describe("ServerEventWarning (GA 1.0.0)", () => {
  it("should deserialize a warning event with all fields", () => {
    const wire = {
      type: "warning",
      event_id: "evt_warn_1",
      warning: {
        message: "Approaching token limit",
        code: "token_limit_warning",
        param: "max_response_output_tokens",
      },
    };

    const deserialized = serverEventWarningDeserializer(wire);

    expect(deserialized.type).toBe("warning");
    expect(deserialized.eventId).toBe("evt_warn_1");
    expect(deserialized.warning.message).toBe("Approaching token limit");
    expect(deserialized.warning.code).toBe("token_limit_warning");
    expect(deserialized.warning.param).toBe("max_response_output_tokens");
  });

  it("should deserialize a warning event with only required message field", () => {
    const wire = {
      type: "warning",
      event_id: "evt_warn_2",
      warning: {
        message: "Generic warning",
      },
    };

    const deserialized = serverEventWarningDeserializer(wire);

    expect(deserialized.warning.message).toBe("Generic warning");
    expect(deserialized.warning.code).toBeUndefined();
    expect(deserialized.warning.param).toBeUndefined();
  });

  it("serverEventWarningDetailsDeserializer should map fields", () => {
    const wire = {
      message: "Custom lexicon failed to load",
      code: "lexicon_load_failed",
      param: "custom_lexicon_url",
    };

    const details = serverEventWarningDetailsDeserializer(wire);

    expect(details.message).toBe("Custom lexicon failed to load");
    expect(details.code).toBe("lexicon_load_failed");
    expect(details.param).toBe("custom_lexicon_url");
  });

  it("serverEventUnionDeserializer should dispatch warning to ServerEventWarning branch", () => {
    const wire = {
      type: "warning",
      event_id: "evt_dispatch_1",
      warning: {
        message: "Dispatched via union",
      },
    };

    const dispatched = serverEventUnionDeserializer(wire) as ServerEventWarning;

    expect(dispatched.type).toBe("warning");
    expect(dispatched.eventId).toBe("evt_dispatch_1");
    expect(dispatched.warning.message).toBe("Dispatched via union");
  });

  it("KnownServerEventType.Warning should equal 'warning'", () => {
    expect(KnownServerEventType.Warning).toBe("warning");
  });
});
