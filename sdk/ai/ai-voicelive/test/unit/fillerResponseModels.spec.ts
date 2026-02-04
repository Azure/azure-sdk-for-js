// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Filler Response Model Serialization & Round-Trip Tests
 *
 * This test suite validates the serialization and deserialization of filler response
 * configuration models to ensure proper JSON structure and field mapping between
 * TypeScript models and the wire protocol format.
 *
 * Tests cover:
 * - BasicFillerResponseConfig (static_filler)
 * - LlmFillerResponseConfig (llm_filler)
 * - FillerResponseConfigBase
 * - FillerResponseConfigBaseUnion discriminated union
 * - RequestSession with fillerResponse field
 * - ReasoningEffort enum values
 */

import { describe, it, expect } from "vitest";
import type {
  BasicFillerResponseConfig,
  LlmFillerResponseConfig,
  FillerResponseConfigBase,
  RequestSession,
} from "../../src/models/index.js";
import {
  basicFillerResponseConfigSerializer,
  basicFillerResponseConfigDeserializer,
  llmFillerResponseConfigSerializer,
  llmFillerResponseConfigDeserializer,
  fillerResponseConfigBaseSerializer,
  fillerResponseConfigBaseDeserializer,
  fillerResponseConfigBaseUnionSerializer,
  fillerResponseConfigBaseUnionDeserializer,
  requestSessionSerializer,
  KnownFillerResponseConfigType,
  KnownFillerTrigger,
  KnownReasoningEffort,
} from "../../src/models/models.js";

describe("Filler Response Models - Serialization & Validation", () => {
  describe("BasicFillerResponseConfig (static_filler)", () => {
    it("should serialize with all fields populated", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: [KnownFillerTrigger.Latency, KnownFillerTrigger.Tool],
        latencyThresholdInMs: 3000,
        texts: ["One moment please...", "Let me check that for you.", "Working on it..."],
      };

      const serialized = basicFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.triggers).toEqual([KnownFillerTrigger.Latency, KnownFillerTrigger.Tool]);
      expect(serialized.latency_threshold_ms).toBe(3000);
      expect(serialized.texts).toEqual([
        "One moment please...",
        "Let me check that for you.",
        "Working on it...",
      ]);
    });

    it("should serialize with minimal required fields", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
      };

      const serialized = basicFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.triggers).toBeUndefined();
      expect(serialized.latency_threshold_ms).toBeUndefined();
      expect(serialized.texts).toBeUndefined();
    });

    it("should serialize with single trigger", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: [KnownFillerTrigger.Latency],
        latencyThresholdInMs: 2000,
      };

      const serialized = basicFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.triggers).toEqual([KnownFillerTrigger.Latency]);
      expect(serialized.latency_threshold_ms).toBe(2000);
    });

    it("should serialize with tool trigger only", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: [KnownFillerTrigger.Tool],
        texts: ["Running the tool now..."],
      };

      const serialized = basicFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.triggers).toEqual([KnownFillerTrigger.Tool]);
      expect(serialized.texts).toEqual(["Running the tool now..."]);
      expect(serialized.latency_threshold_ms).toBeUndefined();
    });

    it("should serialize with empty texts array", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        texts: [],
      };

      const serialized = basicFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.texts).toEqual([]);
    });

    it("should deserialize from wire format correctly", () => {
      const wireFormat = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: [KnownFillerTrigger.Latency, KnownFillerTrigger.Tool],
        latency_threshold_ms: 2500,
        texts: ["Please wait...", "Almost there..."],
      };

      const deserialized = basicFillerResponseConfigDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(deserialized.triggers).toEqual([KnownFillerTrigger.Latency, KnownFillerTrigger.Tool]);
      expect(deserialized.latencyThresholdInMs).toBe(2500);
      expect(deserialized.texts).toEqual(["Please wait...", "Almost there..."]);
    });

    it("should round-trip preserve all fields", () => {
      const original: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: [KnownFillerTrigger.Latency],
        latencyThresholdInMs: 1500,
        texts: ["Hang on...", "Just a moment..."],
      };

      const serialized = basicFillerResponseConfigSerializer(original);
      const deserialized = basicFillerResponseConfigDeserializer(serialized);

      expect(deserialized).toEqual(original);
    });

    it("should handle texts with special characters", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        texts: [
          "Un momento, por favor...",
          "让我查一下...",
          "🤔 Thinking...",
          'Text with "quotes" and \\backslash',
        ],
      };

      const serialized = basicFillerResponseConfigSerializer(config);
      const deserialized = basicFillerResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(deserialized.texts).toEqual(config.texts);
    });
  });

  describe("LlmFillerResponseConfig (llm_filler)", () => {
    it("should serialize with all fields populated", () => {
      const config: LlmFillerResponseConfig = {
        type: KnownFillerResponseConfigType.LlmFiller,
        triggers: [KnownFillerTrigger.Latency, KnownFillerTrigger.Tool],
        latencyThresholdInMs: 2000,
        model: "gpt-4.1-mini",
        instructions: "Generate a brief, friendly acknowledgment while waiting.",
        maxCompletionTokens: 50,
      };

      const serialized = llmFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.triggers).toEqual([KnownFillerTrigger.Latency, KnownFillerTrigger.Tool]);
      expect(serialized.latency_threshold_ms).toBe(2000);
      expect(serialized.model).toBe("gpt-4.1-mini");
      expect(serialized.instructions).toBe(
        "Generate a brief, friendly acknowledgment while waiting.",
      );
      expect(serialized.max_completion_tokens).toBe(50);
    });

    it("should serialize with minimal required fields", () => {
      const config: LlmFillerResponseConfig = {
        type: KnownFillerResponseConfigType.LlmFiller,
      };

      const serialized = llmFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.model).toBeUndefined();
      expect(serialized.instructions).toBeUndefined();
      expect(serialized.max_completion_tokens).toBeUndefined();
    });

    it("should serialize with custom model", () => {
      const config: LlmFillerResponseConfig = {
        type: KnownFillerResponseConfigType.LlmFiller,
        model: "gpt-4o",
      };

      const serialized = llmFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.model).toBe("gpt-4o");
    });

    it("should serialize with custom instructions only", () => {
      const config: LlmFillerResponseConfig = {
        type: KnownFillerResponseConfigType.LlmFiller,
        instructions:
          "You are a helpful assistant. When asked to wait, provide a brief, context-aware acknowledgment.",
      };

      const serialized = llmFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.instructions).toBe(
        "You are a helpful assistant. When asked to wait, provide a brief, context-aware acknowledgment.",
      );
    });

    it("should deserialize from wire format correctly", () => {
      const wireFormat = {
        type: KnownFillerResponseConfigType.LlmFiller,
        triggers: [KnownFillerTrigger.Tool],
        latency_threshold_ms: 3000,
        model: "gpt-4.1-mini",
        instructions: "Be concise.",
        max_completion_tokens: 30,
      };

      const deserialized = llmFillerResponseConfigDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(deserialized.triggers).toEqual([KnownFillerTrigger.Tool]);
      expect(deserialized.latencyThresholdInMs).toBe(3000);
      expect(deserialized.model).toBe("gpt-4.1-mini");
      expect(deserialized.instructions).toBe("Be concise.");
      expect(deserialized.maxCompletionTokens).toBe(30);
    });

    it("should round-trip preserve all fields", () => {
      const original: LlmFillerResponseConfig = {
        type: KnownFillerResponseConfigType.LlmFiller,
        triggers: [KnownFillerTrigger.Latency, KnownFillerTrigger.Tool],
        latencyThresholdInMs: 2500,
        model: "gpt-4.1",
        instructions: "Generate natural waiting phrases.",
        maxCompletionTokens: 100,
      };

      const serialized = llmFillerResponseConfigSerializer(original);
      const deserialized = llmFillerResponseConfigDeserializer(serialized);

      expect(deserialized).toEqual(original);
    });

    it("should handle maxCompletionTokens as 0", () => {
      const config: LlmFillerResponseConfig = {
        type: KnownFillerResponseConfigType.LlmFiller,
        maxCompletionTokens: 0,
      };

      const serialized = llmFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.max_completion_tokens).toBe(0);
    });

    it("should handle very long instructions", () => {
      const longInstructions = "A".repeat(5000);
      const config: LlmFillerResponseConfig = {
        type: KnownFillerResponseConfigType.LlmFiller,
        instructions: longInstructions,
      };

      const serialized = llmFillerResponseConfigSerializer(config);
      const deserialized = llmFillerResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(deserialized.instructions).toBe(longInstructions);
      expect(deserialized.instructions?.length).toBe(5000);
    });
  });

  describe("FillerResponseConfigBase", () => {
    it("should serialize base config with type only", () => {
      const config: FillerResponseConfigBase = {
        type: KnownFillerResponseConfigType.StaticFiller,
      };

      const serialized = fillerResponseConfigBaseSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
    });

    it("should serialize with triggers and threshold", () => {
      const config: FillerResponseConfigBase = {
        type: KnownFillerResponseConfigType.LlmFiller,
        triggers: [KnownFillerTrigger.Latency],
        latencyThresholdInMs: 1000,
      };

      const serialized = fillerResponseConfigBaseSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.triggers).toEqual([KnownFillerTrigger.Latency]);
      expect(serialized.latency_threshold_ms).toBe(1000);
    });

    it("should deserialize base config correctly", () => {
      const wireFormat = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: [KnownFillerTrigger.Tool],
        latency_threshold_ms: 4000,
      };

      const deserialized = fillerResponseConfigBaseDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(deserialized.triggers).toEqual([KnownFillerTrigger.Tool]);
      expect(deserialized.latencyThresholdInMs).toBe(4000);
    });
  });

  describe("FillerResponseConfigBaseUnion (Discriminated Union)", () => {
    it("should serialize static_filler type correctly via union serializer", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        texts: ["Please wait..."],
        triggers: [KnownFillerTrigger.Latency],
      };

      const serialized = fillerResponseConfigBaseUnionSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.texts).toEqual(["Please wait..."]);
      expect(serialized.triggers).toEqual([KnownFillerTrigger.Latency]);
    });

    it("should serialize llm_filler type correctly via union serializer", () => {
      const config: LlmFillerResponseConfig = {
        type: KnownFillerResponseConfigType.LlmFiller,
        model: "gpt-4.1-mini",
        instructions: "Be brief.",
      };

      const serialized = fillerResponseConfigBaseUnionSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.model).toBe("gpt-4.1-mini");
      expect(serialized.instructions).toBe("Be brief.");
    });

    it("should deserialize static_filler type correctly via union deserializer", () => {
      const wireFormat = {
        type: KnownFillerResponseConfigType.StaticFiller,
        texts: ["One moment..."],
        triggers: [KnownFillerTrigger.Tool],
        latency_threshold_ms: 2000,
      };

      const deserialized = fillerResponseConfigBaseUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect((deserialized as BasicFillerResponseConfig).texts).toEqual(["One moment..."]);
      expect(deserialized.triggers).toEqual([KnownFillerTrigger.Tool]);
      expect(deserialized.latencyThresholdInMs).toBe(2000);
    });

    it("should deserialize llm_filler type correctly via union deserializer", () => {
      const wireFormat = {
        type: KnownFillerResponseConfigType.LlmFiller,
        model: "gpt-4o",
        max_completion_tokens: 75,
      };

      const deserialized = fillerResponseConfigBaseUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect((deserialized as LlmFillerResponseConfig).model).toBe("gpt-4o");
      expect((deserialized as LlmFillerResponseConfig).maxCompletionTokens).toBe(75);
    });

    it("should handle unknown type gracefully (fallback to base)", () => {
      const wireFormat = {
        type: "future_filler_type",
        triggers: [KnownFillerTrigger.Latency],
        latency_threshold_ms: 1500,
      };

      const deserialized = fillerResponseConfigBaseUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe("future_filler_type");
      expect(deserialized.triggers).toEqual([KnownFillerTrigger.Latency]);
      expect(deserialized.latencyThresholdInMs).toBe(1500);
    });
  });

  describe("RequestSession with fillerResponse", () => {
    it("should serialize RequestSession with BasicFillerResponseConfig", () => {
      const session: RequestSession = {
        model: "gpt-4o",
        fillerResponse: {
          type: KnownFillerResponseConfigType.StaticFiller,
          triggers: [KnownFillerTrigger.Latency],
          latencyThresholdInMs: 2000,
          texts: ["Just a moment..."],
        } as BasicFillerResponseConfig,
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("gpt-4o");
      expect(serialized.filler_response).toBeDefined();
      expect(serialized.filler_response.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.filler_response.triggers).toEqual([KnownFillerTrigger.Latency]);
      expect(serialized.filler_response.latency_threshold_ms).toBe(2000);
      expect(serialized.filler_response.texts).toEqual(["Just a moment..."]);
    });

    it("should serialize RequestSession with LlmFillerResponseConfig", () => {
      const session: RequestSession = {
        model: "gpt-4.1",
        fillerResponse: {
          type: KnownFillerResponseConfigType.LlmFiller,
          model: "gpt-4.1-mini",
          instructions: "Generate brief acknowledgments.",
          maxCompletionTokens: 50,
        } as LlmFillerResponseConfig,
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("gpt-4.1");
      expect(serialized.filler_response).toBeDefined();
      expect(serialized.filler_response.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.filler_response.model).toBe("gpt-4.1-mini");
      expect(serialized.filler_response.instructions).toBe("Generate brief acknowledgments.");
      expect(serialized.filler_response.max_completion_tokens).toBe(50);
    });

    it("should serialize RequestSession without fillerResponse", () => {
      const session: RequestSession = {
        model: "gpt-4o",
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("gpt-4o");
      expect(serialized.filler_response).toBeUndefined();
    });

    it("should serialize RequestSession with reasoningEffort", () => {
      const session: RequestSession = {
        model: "o1",
        reasoningEffort: KnownReasoningEffort.Medium,
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("o1");
      expect(serialized.reasoning_effort).toBe(KnownReasoningEffort.Medium);
    });

    it("should serialize RequestSession with both reasoningEffort and fillerResponse", () => {
      const session: RequestSession = {
        model: "o1",
        reasoningEffort: KnownReasoningEffort.High,
        fillerResponse: {
          type: KnownFillerResponseConfigType.LlmFiller,
          triggers: [KnownFillerTrigger.Latency, KnownFillerTrigger.Tool],
          latencyThresholdInMs: 3000,
        } as LlmFillerResponseConfig,
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("o1");
      expect(serialized.reasoning_effort).toBe(KnownReasoningEffort.High);
      expect(serialized.filler_response).toBeDefined();
      expect(serialized.filler_response.type).toBe(KnownFillerResponseConfigType.LlmFiller);
      expect(serialized.filler_response.triggers).toEqual([
        KnownFillerTrigger.Latency,
        KnownFillerTrigger.Tool,
      ]);
      expect(serialized.filler_response.latency_threshold_ms).toBe(3000);
    });
  });

  describe("ReasoningEffort Enum Values", () => {
    it("should have all expected enum values", () => {
      expect(KnownReasoningEffort.None).toBe("none");
      expect(KnownReasoningEffort.Minimal).toBe("minimal");
      expect(KnownReasoningEffort.Low).toBe("low");
      expect(KnownReasoningEffort.Medium).toBe("medium");
      expect(KnownReasoningEffort.High).toBe("high");
      expect(KnownReasoningEffort.Xhigh).toBe("xhigh");
    });

    it("should serialize each reasoningEffort value in RequestSession", () => {
      const efforts = [
        KnownReasoningEffort.None,
        KnownReasoningEffort.Minimal,
        KnownReasoningEffort.Low,
        KnownReasoningEffort.Medium,
        KnownReasoningEffort.High,
        KnownReasoningEffort.Xhigh,
      ];

      for (const effort of efforts) {
        const session: RequestSession = {
          model: "o1",
          reasoningEffort: effort,
        };

        const serialized = requestSessionSerializer(session);
        expect(serialized.reasoning_effort).toBe(effort);
      }
    });
  });

  describe("FillerTrigger Enum Values", () => {
    it("should have all expected enum values", () => {
      expect(KnownFillerTrigger.Latency).toBe("latency");
      expect(KnownFillerTrigger.Tool).toBe("tool");
    });

    it("should serialize triggers using enum values", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: [KnownFillerTrigger.Latency, KnownFillerTrigger.Tool],
      };

      const serialized = basicFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.triggers).toEqual([KnownFillerTrigger.Latency, KnownFillerTrigger.Tool]);
    });
  });

  describe("FillerResponseConfigType Enum Values", () => {
    it("should have all expected enum values", () => {
      expect(KnownFillerResponseConfigType.StaticFiller).toBe("static_filler");
      expect(KnownFillerResponseConfigType.LlmFiller).toBe("llm_filler");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle null triggers gracefully", () => {
      const wireFormat = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: null,
        texts: ["Wait..."],
      };

      // TypeScript won't let us pass null directly, but the deserializer should handle it
      const deserialized = basicFillerResponseConfigDeserializer(wireFormat as any);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(deserialized.triggers).toBeNull();
      expect(deserialized.texts).toEqual(["Wait..."]);
    });

    it("should handle empty triggers array", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        triggers: [],
      };

      const serialized = basicFillerResponseConfigSerializer(config);
      const deserialized = basicFillerResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(deserialized.triggers).toEqual([]);
    });

    it("should handle latencyThresholdInMs as 0", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        latencyThresholdInMs: 0,
      };

      const serialized = basicFillerResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(serialized.latency_threshold_ms).toBe(0);
    });

    it("should handle very large latencyThresholdInMs", () => {
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        latencyThresholdInMs: 999999999,
      };

      const serialized = basicFillerResponseConfigSerializer(config);
      const deserialized = basicFillerResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(deserialized.latencyThresholdInMs).toBe(999999999);
    });

    it("should handle many texts in static filler", () => {
      const manyTexts = Array.from({ length: 100 }, (_, i) => `Filler text ${i + 1}`);
      const config: BasicFillerResponseConfig = {
        type: KnownFillerResponseConfigType.StaticFiller,
        texts: manyTexts,
      };

      const serialized = basicFillerResponseConfigSerializer(config);
      const deserialized = basicFillerResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownFillerResponseConfigType.StaticFiller);
      expect(deserialized.texts).toHaveLength(100);
      expect(deserialized.texts?.[0]).toBe("Filler text 1");
      expect(deserialized.texts?.[99]).toBe("Filler text 100");
    });
  });
});
