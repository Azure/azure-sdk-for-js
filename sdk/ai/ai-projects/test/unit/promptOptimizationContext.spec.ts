// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type { PromptOptimizationConfiguration } from "../../src/index.js";
import {
  promptOptimizationConfigurationDeserializer,
  promptOptimizationConfigurationSerializer,
} from "../../src/models/models.js";

describe("prompt optimization context", () => {
  it("preserves each compatible context variant on the wire and in responses", () => {
    const configuration: PromptOptimizationConfiguration = {
      type: "prompt_optimization",
      context: [
        { type: "steering_prompt", prompt: "Answer concisely." },
        {
          type: "skill_references",
          skill_references: [{ type: "foundry_skill", name: "summarize", version: "1" }],
        },
        {
          type: "agent_traces",
          trace_window: { type: "trace_ids", trace_ids: ["trace-1"], lookback_hours: 24 },
        },
      ],
    };

    const wire = JSON.parse(
      JSON.stringify(promptOptimizationConfigurationSerializer(configuration)),
    );
    expect(wire).toEqual(configuration);
    expect(promptOptimizationConfigurationDeserializer(wire)).toEqual(configuration);
  });

  it("preserves an empty context without requiring one", () => {
    const empty: PromptOptimizationConfiguration = { type: "prompt_optimization", context: [] };
    expect(promptOptimizationConfigurationSerializer(empty)).toEqual(empty);
    expect(promptOptimizationConfigurationDeserializer(empty)).toEqual(empty);

    const omitted: PromptOptimizationConfiguration = { type: "prompt_optimization" };
    expect(JSON.parse(JSON.stringify(promptOptimizationConfigurationSerializer(omitted)))).toEqual(
      omitted,
    );
    expect(promptOptimizationConfigurationDeserializer(omitted).context).toBeUndefined();
  });
});
