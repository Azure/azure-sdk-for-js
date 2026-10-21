// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, expectTypeOf, it } from "vitest";
import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "../../src/index.js";
import type {
  CloudComputerUsePreviewTool,
  CloudComputerUsePreviewToolboxTool,
  HostedAgentDefinition,
  ImageGenTool,
  ToolboxToolType,
  ToolboxToolUnion,
  ToolType,
  ToolUnion,
} from "../../src/index.js";
import {
  hostedAgentDefinitionDeserializer,
  hostedAgentDefinitionSerializer,
  toolboxToolUnionDeserializer,
  toolboxToolUnionSerializer,
  toolUnionDeserializer,
  toolUnionSerializer,
} from "../../src/models/models.js";

function toWire(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value));
}

describe("cloud computer use contracts", () => {
  it("exports both tool variants through the public unions", () => {
    expectTypeOf<CloudComputerUsePreviewTool>().toExtend<ToolUnion>();
    expectTypeOf<CloudComputerUsePreviewToolboxTool>().toExtend<ToolboxToolUnion>();
    expectTypeOf<"cloud_computer_use_preview">().toExtend<ToolType>();
    expectTypeOf<"cloud_computer_use_preview">().toExtend<ToolboxToolType>();
  });

  it("round-trips a parameterless agent tool", () => {
    const tool: CloudComputerUsePreviewTool = { type: "cloud_computer_use_preview" };
    expect(toWire(toolUnionSerializer(tool))).toEqual(tool);
    expect(toWire(toolUnionDeserializer(tool))).toEqual(tool);
  });

  const toolboxTools: CloudComputerUsePreviewToolboxTool[] = [
    { type: "cloud_computer_use_preview" },
    { type: "cloud_computer_use_preview", name: "computer", tool_configs: {} },
    {
      type: "cloud_computer_use_preview",
      name: "computer",
      description: "Cloud computer",
      tool_configs: { cloud_computer_use_preview: { pin: false } },
    },
  ];
  it.each(toolboxTools)(
    "round-trips toolbox properties without introducing tool parameters: %j",
    (tool) => {
      expect(toWire(toolboxToolUnionSerializer(tool))).toEqual(tool);
      expect(toWire(toolboxToolUnionDeserializer(tool))).toEqual(tool);
    },
  );

  // TODO(cloud-computer-use): unskip after recording added.
  it.skip("creates and retrieves an agent and toolbox using the preview tool", async () => {
    const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
    const model = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
    const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
    const agent = await project.agents.createVersion("cloud-computer-use-test", {
      kind: "prompt",
      model,
      tools: [{ type: "cloud_computer_use_preview" }],
    });
    try {
      const retrieved = await project.agents.getVersion(agent.name, agent.version);
      expect(retrieved.definition).toMatchObject({
        kind: "prompt",
        tools: [{ type: "cloud_computer_use_preview" }],
      });
      const toolbox = await project.toolboxes.createVersion("cloud-computer-use-test", [
        { type: "cloud_computer_use_preview", name: "computer" },
      ]);
      try {
        const retrievedToolbox = await project.toolboxes.getVersion(toolbox.name, toolbox.version);
        expect(retrievedToolbox.tools).toMatchObject([
          { type: "cloud_computer_use_preview", name: "computer" },
        ]);
      } finally {
        await project.toolboxes.deleteVersion(toolbox.name, toolbox.version);
      }
    } finally {
      await project.agents.deleteVersion(agent.name, agent.version);
    }
  });
});

describe("additional regenerated model properties", () => {
  it.each([true, false, undefined])("preserves hosted memory snapshot value %s", (enabled) => {
    const definition: HostedAgentDefinition = {
      kind: "hosted",
      cpu: "1",
      memory: "2Gi",
      enable_memory_snapshot: enabled,
    };
    expect(toWire(hostedAgentDefinitionSerializer(definition))).toEqual(toWire(definition));
    expect(toWire(hostedAgentDefinitionDeserializer(definition))).toEqual(toWire(definition));
  });

  it.each([
    ["gpt-image-2.5-sunburst", "xhigh"],
    ["gpt-image-2.5-flare", "max"],
    ["gpt-image-2.5-sunburst-2026-09-08", "max"],
    ["gpt-image-2.5-flare-2026-09-08", "xhigh"],
  ] as const)("round-trips image model %s with quality %s", (model, quality) => {
    const tool: ImageGenTool = { type: "image_generation", model, quality };
    expect(toWire(toolUnionSerializer(tool))).toEqual(tool);
    expect(toWire(toolUnionDeserializer(tool))).toEqual(tool);
  });
});
