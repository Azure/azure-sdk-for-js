// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, expect, it } from "vitest";

describe("dataset generation jobs", () => {
  // TODO(dataset-generation): unskip after recording added.
  it.skip("creates an evaluation dataset and deletes its resources", async () => {
    const project = new AIProjectClient(
      process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>",
      new DefaultAzureCredential(),
    );
    const poller = project.datasets.createGenerationJob({
      name: "test-data-generation",
      scenario: "evaluation",
      sources: [{ type: "prompt", prompt: "Generate question-and-answer pairs about Azure." }],
      generation_configuration: {
        type: "simple_qna",
        max_samples: 2,
        model_options: { model: process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>" },
      },
      output_configuration: { name: "test-data-generation", write_mode: "overwrite" },
    });
    await poller.submitted();
    const jobId = poller.operationState?.jobId;
    if (!jobId) throw new Error("Expected a job id after submission.");
    let datasetName: string | undefined;
    let datasetVersion: string | undefined;
    try {
      const job = await project.datasets.getGenerationJob(jobId);
      expect(job.id).toBe(jobId);
      const page = await project.datasets.listGenerationJobs({ limit: 5 }).byPage().next();
      expect(page.done).toBe(false);
      const result = await poller.pollUntilDone();
      const dataset = result.outputs?.find((output) => output.type === "dataset");
      if (dataset?.type === "dataset") {
        datasetName = dataset.name;
        datasetVersion = dataset.version;
      }
      expect(datasetName).toBeDefined();
      expect(datasetVersion).toBeDefined();
    } finally {
      if (datasetName && datasetVersion) {
        await project.datasets.delete(datasetName, datasetVersion);
      }
      await project.datasets.deleteGenerationJob(jobId);
    }
  });
});
