// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, expect, it } from "vitest";

describe("dataset generation jobs", () => {
  // TODO(dataset-generation): unskip after recording added.
  it.skip("creates, inspects, lists, cancels and deletes a generation job", async () => {
    const project = new AIProjectClient(
      process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>",
      new DefaultAzureCredential(),
    );
    const poller = project.datasets.createGenerationJob({
      name: "test-data-generation",
      scenario: "supervised_finetuning",
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
