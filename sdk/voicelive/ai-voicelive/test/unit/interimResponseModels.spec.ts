// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Interim Response Model Serialization & Round-Trip Tests
 *
 * This test suite validates the serialization and deserialization of interim response
 * configuration models to ensure proper JSON structure and field mapping between
 * TypeScript models and the wire protocol format.
 *
 * Tests cover:
 * - StaticInterimResponseConfig (static_interim_response)
 * - LlmInterimResponseConfig (llm_interim_response)
 * - InterimResponseConfigBase
 * - InterimResponseConfigBaseUnion discriminated union
 * - RequestSession with interimResponse field
 * - ReasoningEffort enum values
 */

import { describe, it, expect } from "vitest";
import type {
  StaticInterimResponseConfig,
  LlmInterimResponseConfig,
  InterimResponseConfigBase,
  RequestSession,
} from "../../src/models/index.js";
import {
  staticInterimResponseConfigSerializer,
  staticInterimResponseConfigDeserializer,
  llmInterimResponseConfigSerializer,
  llmInterimResponseConfigDeserializer,
  interimResponseConfigBaseSerializer,
  interimResponseConfigBaseDeserializer,
  interimResponseConfigBaseUnionSerializer,
  interimResponseConfigBaseUnionDeserializer,
  requestSessionSerializer,
  KnownInterimResponseConfigType,
  KnownInterimResponseTrigger,
  KnownReasoningEffort,
} from "../../src/models/models.js";

describe("Interim Response Models - Serialization & Validation", () => {
  describe("StaticInterimResponseConfig (static_interim_response)", () => {
    it("should serialize with all fields populated", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: [KnownInterimResponseTrigger.Latency, KnownInterimResponseTrigger.Tool],
        latencyThresholdInMs: 3000,
        texts: ["One moment please...", "Let me check that for you.", "Working on it..."],
      };

      const serialized = staticInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(serialized.triggers).toEqual([
        KnownInterimResponseTrigger.Latency,
        KnownInterimResponseTrigger.Tool,
      ]);
      expect(serialized.latency_threshold_ms).toBe(3000);
      expect(serialized.texts).toEqual([
        "One moment please...",
        "Let me check that for you.",
        "Working on it...",
      ]);
    });

    it("should serialize with minimal required fields", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
      };

      const serialized = staticInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(serialized.triggers).toBeUndefined();
      expect(serialized.latency_threshold_ms).toBeUndefined();
      expect(serialized.texts).toBeUndefined();
    });

    it("should serialize with single trigger", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: [KnownInterimResponseTrigger.Latency],
        latencyThresholdInMs: 2000,
      };

      const serialized = staticInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(serialized.triggers).toEqual([KnownInterimResponseTrigger.Latency]);
      expect(serialized.latency_threshold_ms).toBe(2000);
    });

    it("should serialize with tool trigger only", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: [KnownInterimResponseTrigger.Tool],
        texts: ["Running the tool now..."],
      };

      const serialized = staticInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(serialized.triggers).toEqual([KnownInterimResponseTrigger.Tool]);
      expect(serialized.texts).toEqual(["Running the tool now..."]);
      expect(serialized.latency_threshold_ms).toBeUndefined();
    });

    it("should serialize with empty texts array", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        texts: [],
      };

      const serialized = staticInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(serialized.texts).toEqual([]);
    });

    it("should deserialize from wire format correctly", () => {
      const wireFormat = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: [KnownInterimResponseTrigger.Latency, KnownInterimResponseTrigger.Tool],
        latency_threshold_ms: 2500,
        texts: ["Please wait...", "Almost there..."],
      };

      const deserialized = staticInterimResponseConfigDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(deserialized.triggers).toEqual([
        KnownInterimResponseTrigger.Latency,
        KnownInterimResponseTrigger.Tool,
      ]);
      expect(deserialized.latencyThresholdInMs).toBe(2500);
      expect(deserialized.texts).toEqual(["Please wait...", "Almost there..."]);
    });

    it("should round-trip preserve all fields", () => {
      const original: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: [KnownInterimResponseTrigger.Latency],
        latencyThresholdInMs: 1500,
        texts: ["Hang on...", "Just a moment..."],
      };

      const serialized = staticInterimResponseConfigSerializer(original);
      const deserialized = staticInterimResponseConfigDeserializer(serialized);

      expect(deserialized).toEqual(original);
    });

    it("should handle texts with special characters", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        texts: [
          "Un momento, por favor...",
          "让我查一下...",
          "🤔 Thinking...",
          'Text with "quotes" and \\backslash',
        ],
      };

      const serialized = staticInterimResponseConfigSerializer(config);
      const deserialized = staticInterimResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(deserialized.texts).toEqual(config.texts);
    });
  });

  describe("LlmInterimResponseConfig (llm_interim_response)", () => {
    it("should serialize with all fields populated", () => {
      const config: LlmInterimResponseConfig = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        triggers: [KnownInterimResponseTrigger.Latency, KnownInterimResponseTrigger.Tool],
        latencyThresholdInMs: 2000,
        model: "gpt-4.1-mini",
        instructions: "Generate a brief, friendly acknowledgment while waiting.",
        maxCompletionTokens: 50,
      };

      const serialized = llmInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(serialized.triggers).toEqual([
        KnownInterimResponseTrigger.Latency,
        KnownInterimResponseTrigger.Tool,
      ]);
      expect(serialized.latency_threshold_ms).toBe(2000);
      expect(serialized.model).toBe("gpt-4.1-mini");
      expect(serialized.instructions).toBe(
        "Generate a brief, friendly acknowledgment while waiting.",
      );
      expect(serialized.max_completion_tokens).toBe(50);
    });

    it("should serialize with minimal required fields", () => {
      const config: LlmInterimResponseConfig = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
      };

      const serialized = llmInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(serialized.model).toBeUndefined();
      expect(serialized.instructions).toBeUndefined();
      expect(serialized.max_completion_tokens).toBeUndefined();
    });

    it("should serialize with custom model", () => {
      const config: LlmInterimResponseConfig = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        model: "gpt-4o",
      };

      const serialized = llmInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(serialized.model).toBe("gpt-4o");
    });

    it("should serialize with custom instructions only", () => {
      const config: LlmInterimResponseConfig = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        instructions:
          "You are a helpful assistant. When asked to wait, provide a brief, context-aware acknowledgment.",
      };

      const serialized = llmInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(serialized.instructions).toBe(
        "You are a helpful assistant. When asked to wait, provide a brief, context-aware acknowledgment.",
      );
    });

    it("should deserialize from wire format correctly", () => {
      const wireFormat = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        triggers: [KnownInterimResponseTrigger.Tool],
        latency_threshold_ms: 3000,
        model: "gpt-4.1-mini",
        instructions: "Be concise.",
        max_completion_tokens: 30,
      };

      const deserialized = llmInterimResponseConfigDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(deserialized.triggers).toEqual([KnownInterimResponseTrigger.Tool]);
      expect(deserialized.latencyThresholdInMs).toBe(3000);
      expect(deserialized.model).toBe("gpt-4.1-mini");
      expect(deserialized.instructions).toBe("Be concise.");
      expect(deserialized.maxCompletionTokens).toBe(30);
    });

    it("should round-trip preserve all fields", () => {
      const original: LlmInterimResponseConfig = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        triggers: [KnownInterimResponseTrigger.Latency, KnownInterimResponseTrigger.Tool],
        latencyThresholdInMs: 2500,
        model: "gpt-4.1",
        instructions: "Generate natural waiting phrases.",
        maxCompletionTokens: 100,
      };

      const serialized = llmInterimResponseConfigSerializer(original);
      const deserialized = llmInterimResponseConfigDeserializer(serialized);

      expect(deserialized).toEqual(original);
    });

    it("should handle maxCompletionTokens as 0", () => {
      const config: LlmInterimResponseConfig = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        maxCompletionTokens: 0,
      };

      const serialized = llmInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(serialized.max_completion_tokens).toBe(0);
    });

    it("should handle very long instructions", () => {
      const longInstructions = "A".repeat(5000);
      const config: LlmInterimResponseConfig = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        instructions: longInstructions,
      };

      const serialized = llmInterimResponseConfigSerializer(config);
      const deserialized = llmInterimResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(deserialized.instructions).toBe(longInstructions);
      expect(deserialized.instructions?.length).toBe(5000);
    });
  });

  describe("InterimResponseConfigBase", () => {
    it("should serialize base config with type only", () => {
      const config: InterimResponseConfigBase = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
      };

      const serialized = interimResponseConfigBaseSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
    });

    it("should serialize with triggers and threshold", () => {
      const config: InterimResponseConfigBase = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        triggers: [KnownInterimResponseTrigger.Latency],
        latencyThresholdInMs: 1000,
      };

      const serialized = interimResponseConfigBaseSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(serialized.triggers).toEqual([KnownInterimResponseTrigger.Latency]);
      expect(serialized.latency_threshold_ms).toBe(1000);
    });

    it("should deserialize base config correctly", () => {
      const wireFormat = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: [KnownInterimResponseTrigger.Tool],
        latency_threshold_ms: 4000,
      };

      const deserialized = interimResponseConfigBaseDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(deserialized.triggers).toEqual([KnownInterimResponseTrigger.Tool]);
      expect(deserialized.latencyThresholdInMs).toBe(4000);
    });
  });

  describe("InterimResponseConfigBaseUnion (Discriminated Union)", () => {
    it("should serialize static_interim_response type correctly via union serializer", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        texts: ["Please wait..."],
        triggers: [KnownInterimResponseTrigger.Latency],
      };

      const serialized = interimResponseConfigBaseUnionSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(serialized.texts).toEqual(["Please wait..."]);
      expect(serialized.triggers).toEqual([KnownInterimResponseTrigger.Latency]);
    });

    it("should serialize llm_interim_response type correctly via union serializer", () => {
      const config: LlmInterimResponseConfig = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        model: "gpt-4.1-mini",
        instructions: "Be brief.",
      };

      const serialized = interimResponseConfigBaseUnionSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect(serialized.model).toBe("gpt-4.1-mini");
      expect(serialized.instructions).toBe("Be brief.");
    });

    it("should deserialize static_interim_response type correctly via union deserializer", () => {
      const wireFormat = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        texts: ["One moment..."],
        triggers: [KnownInterimResponseTrigger.Tool],
        latency_threshold_ms: 2000,
      };

      const deserialized = interimResponseConfigBaseUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect((deserialized as StaticInterimResponseConfig).texts).toEqual(["One moment..."]);
      expect(deserialized.triggers).toEqual([KnownInterimResponseTrigger.Tool]);
      expect(deserialized.latencyThresholdInMs).toBe(2000);
    });

    it("should deserialize llm_interim_response type correctly via union deserializer", () => {
      const wireFormat = {
        type: KnownInterimResponseConfigType.LlmInterimResponse,
        model: "gpt-4o",
        max_completion_tokens: 75,
      };

      const deserialized = interimResponseConfigBaseUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.LlmInterimResponse);
      expect((deserialized as LlmInterimResponseConfig).model).toBe("gpt-4o");
      expect((deserialized as LlmInterimResponseConfig).maxCompletionTokens).toBe(75);
    });

    it("should handle unknown type gracefully (fallback to base)", () => {
      const wireFormat = {
        type: "future_interim_type",
        triggers: [KnownInterimResponseTrigger.Latency],
        latency_threshold_ms: 1500,
      };

      const deserialized = interimResponseConfigBaseUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe("future_interim_type");
      expect(deserialized.triggers).toEqual([KnownInterimResponseTrigger.Latency]);
      expect(deserialized.latencyThresholdInMs).toBe(1500);
    });
  });

  describe("RequestSession with interimResponse", () => {
    it("should serialize RequestSession with StaticInterimResponseConfig", () => {
      const session: RequestSession = {
        model: "gpt-4o",
        interimResponse: {
          type: KnownInterimResponseConfigType.StaticInterimResponse,
          triggers: [KnownInterimResponseTrigger.Latency],
          latencyThresholdInMs: 2000,
          texts: ["Just a moment..."],
        } as StaticInterimResponseConfig,
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("gpt-4o");
      expect(serialized.interim_response).toBeDefined();
      expect(serialized.interim_response.type).toBe(
        KnownInterimResponseConfigType.StaticInterimResponse,
      );
      expect(serialized.interim_response.triggers).toEqual([KnownInterimResponseTrigger.Latency]);
      expect(serialized.interim_response.latency_threshold_ms).toBe(2000);
      expect(serialized.interim_response.texts).toEqual(["Just a moment..."]);
    });

    it("should serialize RequestSession with LlmInterimResponseConfig", () => {
      const session: RequestSession = {
        model: "gpt-4.1",
        interimResponse: {
          type: KnownInterimResponseConfigType.LlmInterimResponse,
          model: "gpt-4.1-mini",
          instructions: "Generate brief acknowledgments.",
          maxCompletionTokens: 50,
        } as LlmInterimResponseConfig,
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("gpt-4.1");
      expect(serialized.interim_response).toBeDefined();
      expect(serialized.interim_response.type).toBe(
        KnownInterimResponseConfigType.LlmInterimResponse,
      );
      expect(serialized.interim_response.model).toBe("gpt-4.1-mini");
      expect(serialized.interim_response.instructions).toBe("Generate brief acknowledgments.");
      expect(serialized.interim_response.max_completion_tokens).toBe(50);
    });

    it("should serialize RequestSession without interimResponse", () => {
      const session: RequestSession = {
        model: "gpt-4o",
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("gpt-4o");
      expect(serialized.interim_response).toBeUndefined();
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

    it("should serialize RequestSession with both reasoningEffort and interimResponse", () => {
      const session: RequestSession = {
        model: "o1",
        reasoningEffort: KnownReasoningEffort.High,
        interimResponse: {
          type: KnownInterimResponseConfigType.LlmInterimResponse,
          triggers: [KnownInterimResponseTrigger.Latency, KnownInterimResponseTrigger.Tool],
          latencyThresholdInMs: 3000,
        } as LlmInterimResponseConfig,
      };

      const serialized = requestSessionSerializer(session);

      expect(serialized.model).toBe("o1");
      expect(serialized.reasoning_effort).toBe(KnownReasoningEffort.High);
      expect(serialized.interim_response).toBeDefined();
      expect(serialized.interim_response.type).toBe(
        KnownInterimResponseConfigType.LlmInterimResponse,
      );
      expect(serialized.interim_response.triggers).toEqual([
        KnownInterimResponseTrigger.Latency,
        KnownInterimResponseTrigger.Tool,
      ]);
      expect(serialized.interim_response.latency_threshold_ms).toBe(3000);
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

  describe("InterimResponseTrigger Enum Values", () => {
    it("should have all expected enum values", () => {
      expect(KnownInterimResponseTrigger.Latency).toBe("latency");
      expect(KnownInterimResponseTrigger.Tool).toBe("tool");
    });

    it("should serialize triggers using enum values", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: [KnownInterimResponseTrigger.Latency, KnownInterimResponseTrigger.Tool],
      };

      const serialized = staticInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(serialized.triggers).toEqual([
        KnownInterimResponseTrigger.Latency,
        KnownInterimResponseTrigger.Tool,
      ]);
    });
  });

  describe("InterimResponseConfigType Enum Values", () => {
    it("should have all expected enum values", () => {
      expect(KnownInterimResponseConfigType.StaticInterimResponse).toBe("static_interim_response");
      expect(KnownInterimResponseConfigType.LlmInterimResponse).toBe("llm_interim_response");
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle null triggers gracefully", () => {
      const wireFormat = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: null,
        texts: ["Wait..."],
      };

      // TypeScript won't let us pass null directly, but the deserializer should handle it
      const deserialized = staticInterimResponseConfigDeserializer(wireFormat as any);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(deserialized.triggers).toBeNull();
      expect(deserialized.texts).toEqual(["Wait..."]);
    });

    it("should handle empty triggers array", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        triggers: [],
      };

      const serialized = staticInterimResponseConfigSerializer(config);
      const deserialized = staticInterimResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(deserialized.triggers).toEqual([]);
    });

    it("should handle latencyThresholdInMs as 0", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        latencyThresholdInMs: 0,
      };

      const serialized = staticInterimResponseConfigSerializer(config);

      expect(serialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(serialized.latency_threshold_ms).toBe(0);
    });

    it("should handle very large latencyThresholdInMs", () => {
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        latencyThresholdInMs: 999999999,
      };

      const serialized = staticInterimResponseConfigSerializer(config);
      const deserialized = staticInterimResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(deserialized.latencyThresholdInMs).toBe(999999999);
    });

    it("should handle many texts in static interim response", () => {
      const manyTexts = Array.from({ length: 100 }, (_, i) => `Interim text ${i + 1}`);
      const config: StaticInterimResponseConfig = {
        type: KnownInterimResponseConfigType.StaticInterimResponse,
        texts: manyTexts,
      };

      const serialized = staticInterimResponseConfigSerializer(config);
      const deserialized = staticInterimResponseConfigDeserializer(serialized);

      expect(deserialized.type).toBe(KnownInterimResponseConfigType.StaticInterimResponse);
      expect(deserialized.texts).toHaveLength(100);
      expect(deserialized.texts?.[0]).toBe("Interim text 1");
      expect(deserialized.texts?.[99]).toBe("Interim text 100");
    });
  });
});
