// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createCustomMeasurements,
  createResourceMetricEnvelope,
  truncateCustomDimensions,
} from "../../src/utils/common.js";
import { ApplicationInsightsCustomMeasurements } from "../../src/utils/constants/applicationinsights.js";
import { CUSTOM_DIMENSIONS_GENAI_KEYS } from "../../src/Declarations/Constants.js";
import { MaxPropertyLengths } from "../../src/types.js";
import { afterEach, beforeEach, describe, it, assert, vi } from "vitest";
import { SpanKind, ValueType } from "@opentelemetry/api";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import { AggregationTemporality, DataPointType } from "@opentelemetry/sdk-metrics";
import { logToEnvelope } from "../../src/utils/logUtils.js";
import { resourceMetricsToEnvelope } from "../../src/utils/metricUtils.js";
import { readableSpanToEnvelope, spanEventsToEnvelopes } from "../../src/utils/spanUtils.js";
import { spanToReadableSpan } from "../utils/spanToReadableSpan.js";

describe("Custom Dimensions Size Limits", () => {
  beforeEach(() => {
    vi.stubEnv("APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES", undefined);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("#createCustomMeasurements", () => {
    it("should keep finite numbers, drop invalid values, and truncate oversized keys", () => {
      const oversizedKey = "k".repeat(151);

      const result = createCustomMeasurements({
        [ApplicationInsightsCustomMeasurements]: {
          count: 42,
          ratio: 0.5,
          notANumber: Number.NaN,
          positiveInfinity: Number.POSITIVE_INFINITY,
          stringValue: "7",
          "": 9,
          [oversizedKey]: 8,
        },
      });

      assert.deepStrictEqual(result, {
        count: 42,
        ratio: 0.5,
        ["k".repeat(150)]: 8,
      });
    });

    it("should support Map values and ignore non-map attributes", () => {
      assert.deepStrictEqual(
        createCustomMeasurements({
          [ApplicationInsightsCustomMeasurements]: new Map<string, unknown>([
            ["itemsProcessed", 12],
            ["invalid", false],
          ]),
        }),
        { itemsProcessed: 12 },
      );
      assert.deepStrictEqual(
        createCustomMeasurements({
          [ApplicationInsightsCustomMeasurements]:
            '{"itemsProcessed":42,"queueDepth":7,"invalid":"3"}',
        }),
        { itemsProcessed: 42, queueDepth: 7 },
      );
      assert.deepStrictEqual(
        createCustomMeasurements({
          [ApplicationInsightsCustomMeasurements]: "not a map",
        }),
        {},
      );
    });
  });

  describe("#truncateCustomDimensions", () => {
    it("should return properties unchanged when under 8KB limit", () => {
      const properties: { [key: string]: string } = {
        key1: "value1",
        key2: "value2",
        key3: "value3",
      };
      const result = truncateCustomDimensions(properties);
      assert.deepStrictEqual(result, properties);
    });

    it("should return empty object when given empty properties", () => {
      const result = truncateCustomDimensions({});
      assert.deepStrictEqual(result, {});
    });

    it("should truncate a single value that exceeds 8KB", () => {
      const largeValue = "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        largeKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);

      // Value should be truncated to the 8KB limit
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "largeKey value should be truncated to 8KB",
      );
      assert.isTrue(
        Buffer.byteLength(result["largeKey"], "utf-8") < Buffer.byteLength(largeValue, "utf-8"),
        "largeKey value should be shorter than the original",
      );
    });

    it("should only truncate values that individually exceed 8KB", () => {
      const smallValue = "hello";
      const properties: { [key: string]: string } = {
        small: smallValue,
        large: "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 500),
      };

      const result = truncateCustomDimensions(properties);

      // Small property should be unchanged
      assert.strictEqual(result["small"], smallValue);

      // Large property should be truncated to 8KB
      assert.isTrue(
        Buffer.byteLength(result["large"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "large property should be truncated to 8KB",
      );
    });

    it("should not truncate values that are each under 8KB even if combined total exceeds it", () => {
      // Two properties that together exceed 8KB but each is under 8KB individually
      const halfSize = 5 * 1024;
      const properties: { [key: string]: string } = {
        key1: "a".repeat(halfSize),
        key2: "b".repeat(halfSize),
      };

      const result = truncateCustomDimensions(properties);

      // Neither value should be truncated since each is under 8KB
      assert.strictEqual(result["key1"].length, halfSize);
      assert.strictEqual(result["key2"].length, halfSize);
    });

    it("should truncate gen_ai keys at 256KB instead of 8KB", () => {
      const over8KBValue = "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 1000);
      const over256KBValue = "x".repeat(MaxPropertyLengths.EIGHTEEN_BIT + 1000);

      for (const genAiKey of CUSTOM_DIMENSIONS_GENAI_KEYS) {
        // Value over 8KB but under 256KB should NOT be truncated
        const smallResult = truncateCustomDimensions({ [genAiKey]: over8KBValue });
        assert.strictEqual(
          smallResult[genAiKey],
          over8KBValue,
          `Gen AI key '${genAiKey}' under 256KB should not be truncated`,
        );

        // Value over 256KB SHOULD be truncated
        const largeResult = truncateCustomDimensions({ [genAiKey]: over256KBValue });
        assert.isTrue(
          Buffer.byteLength(largeResult[genAiKey], "utf-8") <= MaxPropertyLengths.EIGHTEEN_BIT,
          `Gen AI key '${genAiKey}' over 256KB should be truncated to 256KB`,
        );
      }
    });

    it("should truncate non-gen_ai keys at 8KB while gen_ai keys use 256KB limit", () => {
      const largeValue = "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        "gen_ai.input.messages": largeValue,
        regularKey: largeValue,
      };

      const result = truncateCustomDimensions(properties);

      // Gen AI key should be preserved (under 256KB)
      assert.strictEqual(result["gen_ai.input.messages"], largeValue);

      // Non-gen_ai key should be truncated to 8KB
      assert.isTrue(
        Buffer.byteLength(result["regularKey"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "Non-gen_ai key should be truncated to 8KB",
      );
    });

    it("should truncate keys not in the gen_ai list even if they start with gen_ai", () => {
      const largeValue = "x".repeat(MaxPropertyLengths.THIRTEEN_BIT + 1000);
      const properties: { [key: string]: string } = {
        "gen_ai.other_attribute": largeValue,
      };

      const result = truncateCustomDimensions(properties);
      assert.isTrue(
        Buffer.byteLength(result["gen_ai.other_attribute"], "utf-8") <=
          MaxPropertyLengths.THIRTEEN_BIT,
        "Non-listed gen_ai key should still be truncated",
      );
    });

    it("should not drop entries regardless of total size", () => {
      const properties: { [key: string]: string } = {};
      // Many small entries whose combined size exceeds 8KB
      for (let i = 0; i < 128; i++) {
        properties["k".repeat(512) + i.toString()] = "value" + i;
      }

      const result = truncateCustomDimensions(properties);

      // All entries should be preserved since no individual value exceeds 8KB
      assert.strictEqual(
        Object.keys(result).length,
        Object.keys(properties).length,
        "No entries should be dropped",
      );
    });

    it("should truncate multiple values that each exceed 8KB independently", () => {
      const oversize = MaxPropertyLengths.THIRTEEN_BIT + 2000;
      const properties: { [key: string]: string } = {
        big1: "a".repeat(oversize),
        big2: "b".repeat(oversize),
      };

      const result = truncateCustomDimensions(properties);

      // Both values should be truncated to 8KB
      assert.isTrue(
        Buffer.byteLength(result["big1"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "big1 should be truncated to 8KB",
      );
      assert.isTrue(
        Buffer.byteLength(result["big2"], "utf-8") <= MaxPropertyLengths.THIRTEEN_BIT,
        "big2 should be truncated to 8KB",
      );
      // Both entries should still exist
      assert.isDefined(result["big1"]);
      assert.isDefined(result["big2"]);
    });

    it("should verify default limit is 8KB", () => {
      assert.strictEqual(MaxPropertyLengths.THIRTEEN_BIT, 8 * 1024);
    });

    it("should verify gen_ai limit is 256KB", () => {
      assert.strictEqual(MaxPropertyLengths.EIGHTEEN_BIT, 256 * 1024);
    });

    it("should stringify non-string values (number, boolean, object, array)", () => {
      const properties: Record<string, unknown> = {
        aNumber: 42,
        aBool: true,
        anObject: { nested: "value" },
        anArray: [1, 2, 3],
      };

      const result = truncateCustomDimensions(properties);

      assert.strictEqual(result["aNumber"], "42");
      assert.strictEqual(result["aBool"], "true");
      assert.strictEqual(result["anObject"], '{"nested":"value"}');
      assert.strictEqual(result["anArray"], "[1,2,3]");
    });

    describe.each(["gen_ai.input.messages", "gen_ai.output.messages"])("%s", (key) => {
      it.each([undefined, "", " ", ",,,", "unknown_feature", "*", "true"])(
        "should keep the 256 KiB limit without an explicit opt-in (%s)",
        (features) => {
          vi.stubEnv("APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES", features);
          const value = "x".repeat(256 * 1024 + 1);
          const result = truncateCustomDimensions({ [key]: value });
          assert.strictEqual(Buffer.byteLength(result[key]), 256 * 1024);
        },
      );

      it.each([
        "gen_ai_input_output_limit_increase",
        " GEN_AI_INPUT_OUTPUT_LIMIT_INCREASE ",
        "unknown_feature, gen_ai_input_output_limit_increase,,",
      ])("should recognize the experimental feature (%s)", (features) => {
        vi.stubEnv("APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES", features);
        const value = "x".repeat(1024 * 1024);
        const result = truncateCustomDimensions({ [key]: value });
        assert.strictEqual(result[key].length, value.length);
        assert.strictEqual(result[key], value);
      });

      it.each([-1, 0, 1])("should enforce the 4 MiB boundary with offset %i", (offset) => {
        vi.stubEnv(
          "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
          "gen_ai_input_output_limit_increase",
        );
        const limit = 4 * 1024 * 1024;
        const value = "x".repeat(limit + offset);
        const result = truncateCustomDimensions({ [key]: value });
        const expected = value.slice(0, limit);
        assert.strictEqual(Buffer.byteLength(result[key]), expected.length);
        assert.strictEqual(result[key], expected);
      });
    });

    it("should keep other GenAI limits and ordinary limits unchanged when opted in", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES", "gen_ai_input_output_limit_increase");
      const value = "x".repeat(256 * 1024 + 1);
      for (const key of CUSTOM_DIMENSIONS_GENAI_KEYS) {
        if (key === "gen_ai.input.messages" || key === "gen_ai.output.messages") {
          continue;
        }
        assert.strictEqual(
          Buffer.byteLength(truncateCustomDimensions({ [key]: value })[key]),
          256 * 1024,
          key,
        );
      }
      for (const key of [
        "custom.attribute",
        "gen_ai.other_attribute",
        "gen_ai.input.messages.extra",
      ]) {
        assert.strictEqual(
          Buffer.byteLength(truncateCustomDimensions({ [key]: value })[key]),
          8 * 1024,
          key,
        );
      }
    });

    describe.each([
      { key: "custom.attribute", limit: 8 * 1024 },
      { key: "gen_ai.system_instructions", limit: 256 * 1024 },
      { key: "gen_ai.input.messages", limit: 4 * 1024 * 1024 },
      { key: "gen_ai.output.messages", limit: 4 * 1024 * 1024 },
    ])("UTF-8 boundaries for $key", ({ key, limit }) => {
      it.each(["\u00e9", "\u20ac", "\u{1f600}"])(
        "should not split a multibyte character (%s)",
        (character) => {
          vi.stubEnv(
            "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
            "gen_ai_input_output_limit_increase",
          );
          for (let remaining = 1; remaining < Buffer.byteLength(character); remaining++) {
            const prefix = "x".repeat(limit - remaining);
            const properties = { [key]: prefix + character };
            const result = truncateCustomDimensions(properties);

            assert.strictEqual(Buffer.byteLength(result[key]), prefix.length);
            assert.strictEqual(result[key], prefix);
            assert.strictEqual(properties[key], prefix + character);
          }
        },
      );

      it.each(["", "x", "\u{1f600}"])(
        "should preserve complete characters at the byte limit with suffix %j",
        (suffix) => {
          vi.stubEnv(
            "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
            "gen_ai_input_output_limit_increase",
          );
          const value = "\u{1f600}".repeat(limit / 4);
          const result = truncateCustomDimensions({ [key]: value + suffix });
          assert.strictEqual(Buffer.byteLength(result[key]), limit);
          assert.strictEqual(result[key], value);
        },
      );
    });

    it("should serialize structured GenAI content before applying the increased limit", () => {
      vi.stubEnv("APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES", "gen_ai_input_output_limit_increase");
      const messages = [
        { role: "user", parts: [{ type: "image", content: "a".repeat(1024 * 1024) }] },
      ];
      const result = truncateCustomDimensions({ "gen_ai.input.messages": messages });
      assert.strictEqual(result["gen_ai.input.messages"].length, JSON.stringify(messages).length);
      assert.deepStrictEqual(JSON.parse(result["gen_ai.input.messages"]), messages);
    });
  });

  describe.each([false, true])("Telemetry conversion with opt-in %s", (enabled) => {
    it("should apply the same limits to spans, events, logs, metrics, and resources", () => {
      vi.stubEnv(
        "APPLICATIONINSIGHTS_EXPERIMENTAL_FEATURES",
        enabled ? "gen_ai_input_output_limit_increase" : undefined,
      );
      vi.stubEnv("AZURE_MONITOR_AUTO_ATTACH", "false");
      const attributes = {
        "gen_ai.input.messages": "i".repeat(1024 * 1024),
        "gen_ai.output.messages": "o".repeat(4 * 1024 * 1024 + 1),
        "gen_ai.system_instructions": "s".repeat(256 * 1024 + 1),
        "custom.attribute": "c".repeat(8 * 1024 + 1),
      };
      const resource = resourceFromAttributes(attributes);
      const tracer = new BasicTracerProvider().getTracer("genai-limits");
      const envelopes = [];
      for (const kind of [SpanKind.SERVER, SpanKind.CLIENT]) {
        const span = tracer.startSpan("genai", { kind, attributes });
        span.addEvent("gen_ai.client.inference.operation.details", attributes);
        span.addEvent("exception", {
          ...attributes,
          "exception.type": "Error",
          "exception.message": "test",
        });
        span.end();
        const readableSpan = spanToReadableSpan(span);
        envelopes.push(
          readableSpanToEnvelope(readableSpan, "ikey"),
          ...spanEventsToEnvelopes(readableSpan, "ikey"),
        );
      }
      envelopes.push(
        logToEnvelope(
          {
            resource,
            instrumentationScope: { name: "genai-limits" },
            hrTime: [1, 0],
            hrTimeObserved: [1, 0],
            body: "genai",
            attributes,
            droppedAttributesCount: 0,
          },
          "ikey",
        ),
        createResourceMetricEnvelope(resource, "ikey"),
        ...resourceMetricsToEnvelope(
          {
            resource,
            scopeMetrics: [
              {
                scope: { name: "genai-limits" },
                metrics: [
                  {
                    descriptor: {
                      name: "genai",
                      description: "",
                      unit: "",
                      valueType: ValueType.INT,
                    },
                    aggregationTemporality: AggregationTemporality.CUMULATIVE,
                    dataPointType: DataPointType.SUM,
                    isMonotonic: true,
                    dataPoints: [{ attributes, startTime: [1, 0], endTime: [2, 0], value: 1 }],
                  },
                ],
              },
            ],
          },
          "ikey",
        ),
      );

      assert.lengthOf(envelopes, 9);
      for (const envelope of envelopes) {
        const baseData = envelope?.data?.baseData;
        assert.ok(baseData && "properties" in baseData);
        const properties = baseData.properties;
        assert.ok(properties);
        assert.strictEqual(
          Buffer.byteLength(properties["gen_ai.input.messages"]),
          enabled ? 1024 * 1024 : 256 * 1024,
          envelope?.name,
        );
        assert.strictEqual(
          Buffer.byteLength(properties["gen_ai.output.messages"]),
          enabled ? 4 * 1024 * 1024 : 256 * 1024,
          envelope?.name,
        );
        assert.strictEqual(Buffer.byteLength(properties["gen_ai.system_instructions"]), 256 * 1024);
        assert.strictEqual(Buffer.byteLength(properties["custom.attribute"]), 8 * 1024);
      }
    });
  });
});
