// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../src/index.js";
import type {
  DataGenerationJobConfiguration,
  DataGenerationJobConfigurationUnion,
  EvaluationDataGenerationJobOutputConfiguration,
  ReinforcementFineTuningDataGenerationJobOutputConfiguration,
  SimpleQnADataGenerationJobConfiguration,
  SimulationSeedDataGenerationJobConfiguration,
  SupervisedFineTuningDataGenerationJobOutputConfiguration,
  ToolUseFineTuningDataGenerationJobConfiguration,
  TracesDataGenerationJobConfiguration,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, expect, it } from "vitest";

describe("dataset generation jobs", () => {
  it("exports configuration models aligned with the wire fields", () => {
    const baseConfiguration: DataGenerationJobConfiguration = { type: "traces" };
    const configurations: [
      SimpleQnADataGenerationJobConfiguration,
      TracesDataGenerationJobConfiguration,
      SimulationSeedDataGenerationJobConfiguration,
      ToolUseFineTuningDataGenerationJobConfiguration,
    ] = [
      { type: "simple_qna", max_samples: 2 },
      { type: "traces" },
      { type: "simulation_seed" },
      { type: "tool_use", max_samples: 2 },
    ];
    const configurationUnion: DataGenerationJobConfigurationUnion[] = configurations;
    const outputConfigurations: [
      EvaluationDataGenerationJobOutputConfiguration,
      SupervisedFineTuningDataGenerationJobOutputConfiguration,
      ReinforcementFineTuningDataGenerationJobOutputConfiguration,
    ] = [
      { name: "evaluation-output" },
      { name: "supervised-output.jsonl" },
      { name: "reinforcement-output.jsonl" },
    ];

    expect(baseConfiguration.type).toBe("traces");
    expect(configurationUnion.map(({ type }) => type)).toEqual([
      "simple_qna",
      "traces",
      "simulation_seed",
      "tool_use",
    ]);
    expect(outputConfigurations.map(({ name }) => name)).toEqual([
      "evaluation-output",
      "supervised-output.jsonl",
      "reinforcement-output.jsonl",
    ]);
  });

  // TODO(dataset-generation): unskip after recording added.
  it.skip("creates, inspects, lists, cancels and deletes a generation job", async () => {
    const project = new AIProjectClient(
      process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>",
      new DefaultAzureCredential(),
    );
    const poller = project.datasets.createGenerationJob({
      name: "test-data-generation",
      scenario: "supervised_finetuning_preview",
      sources: [{ type: "prompt", prompt: "Generate question-and-answer pairs about Azure." }],
      generation_configuration: {
        type: "simple_qna",
        max_samples: 2,
        model_options: { model: process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>" },
        question_types: ["short_answer"],
      },
      output_configuration: { name: "test-data-generation.jsonl", write_mode: "overwrite" },
    });
    await poller.submitted();
    const jobId = poller.operationState?.jobId;
    if (!jobId) throw new Error("Expected a job id after submission.");
    try {
      const job = await project.datasets.getGenerationJob(jobId);
      expect(job.id).toBe(jobId);
      const page = await project.datasets.listGenerationJobs({ limit: 5 }).byPage().next();
      expect(page.done).toBe(false);
      if (job.status === "queued" || job.status === "in_progress") {
        const cancelled = await project.datasets.cancelGenerationJob(jobId);
        expect(cancelled.id).toBe(jobId);
      } else {
        expect(await poller.pollUntilDone()).toBeDefined();
      }
    } finally {
      await project.datasets.deleteGenerationJob(jobId);
    }
  });
});
