// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import type {
  FunctionTool,
  ProgrammaticToolCallingParam,
  Reasoning,
  SpecificProgrammaticToolCallingParam,
} from "../../../../src/index.js";
import {
  functionToolDeserializer,
  functionToolSerializer,
  reasoningDeserializer,
  reasoningSerializer,
  responseUsageInputTokensDetailsDeserializer,
  toolChoiceParamUnionSerializer,
  toolUnionDeserializer,
  toolUnionSerializer,
} from "../../../../src/models/models.js";

describe("programmatic tool calling models", () => {
  it("serializes programmatic and callable tools", () => {
    const programmaticTool: ProgrammaticToolCallingParam = {
      type: "programmatic_tool_calling",
    };
    const programmaticToolChoice: SpecificProgrammaticToolCallingParam = {
      type: "programmatic_tool_calling",
    };
    const functionTool: FunctionTool = {
      type: "function",
      name: "get_weather",
      parameters: { type: "object" },
      output_schema: { type: "object" },
      allowed_callers: ["programmatic"],
    };

    expect(toolUnionSerializer(programmaticTool)).toEqual(programmaticTool);
    expect(toolUnionDeserializer(programmaticTool)).toEqual(programmaticTool);
    expect(toolChoiceParamUnionSerializer(programmaticToolChoice)).toEqual(programmaticToolChoice);
    expect(functionToolSerializer(functionTool)).toMatchObject(functionTool);
    expect(functionToolDeserializer(functionTool)).toMatchObject(functionTool);
  });

  it("serializes reasoning modes and cache-write usage", () => {
    const reasoning: Reasoning = {
      mode: "pro",
      effort: "max",
    };

    expect(reasoningSerializer(reasoning)).toMatchObject(reasoning);
    expect(reasoningDeserializer(reasoning)).toMatchObject(reasoning);
    expect(
      responseUsageInputTokensDetailsDeserializer({
        cached_tokens: 5,
        cache_write_tokens: 3,
      }),
    ).toEqual({
      cached_tokens: 5,
      cache_write_tokens: 3,
    });
  });
});
