// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample generates question-and-answer pairs from an inline policy prompt
 * using the beta datasets API. The resulting dataset can be used for evaluation.
 * The sample deletes its generated dataset before exiting.
 *
 * Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_MODEL_NAME before running this sample.
 * The model deployment must support the Azure OpenAI Responses API.
 *
 * @summary Generate a SimpleQnA evaluation dataset from an inline prompt.
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  // A unique output name avoids changing an existing dataset and stays below 50 characters.
  const runId = randomUUID().replaceAll("-", "");
  const datasetName = `qna-prompt-${runId}`;
  let generatedDataset: { name: string; version: string } | undefined;

  console.log("Creating a SimpleQnA generation job from an inline prompt...");
  const generationPoller = project.beta.datasets.createGenerationJob(
    {
      inputs: {
        name: `qna-prompt-job-${runId}`,
        scenario: "evaluation",
        sources: [
          {
            type: "prompt",
            description: "Contoso refund policy",
            prompt:
              "Contoso offers a full refund within 30 days of purchase for products returned " +
              "in their original condition. After 30 days, customer support may offer store " +
              "credit. Digital goods are non-refundable once downloaded. Refund requests " +
              "must include a receipt and the order number. Standard refunds are processed " +
              "within five business days to the original payment method.",
          },
        ],
        options: {
          type: "simple_qna",
          max_samples: 15,
          model_options: { model: modelDeploymentName },
        },
        output_options: {
          name: datasetName,
          description: "QnA pairs generated from the Contoso refund policy.",
          tags: { sample: "simple-qna-prompt-source" },
        },
      },
    },
    { updateIntervalInMs: 10_000 },
  );

  try {
    await generationPoller.submitted();
    console.log(`Generation job submitted (id: ${generationPoller.operationState?.jobId})`);

    const result = await generationPoller.pollUntilDone();
    console.log(`Generated ${result.generated_samples} question-and-answer pairs.`);

    const output = result.outputs?.find(
      (item) => item.type === "dataset" && "name" in item && "version" in item,
    );
    if (
      !output ||
      !("name" in output) ||
      !("version" in output) ||
      !output.name ||
      !output.version
    ) {
      throw new Error("The generation job did not return a dataset name and version.");
    }

    generatedDataset = { name: output.name, version: output.version };
    const dataset = await project.datasets.get(output.name, output.version);
    console.log(
      `Generated dataset (name: ${dataset.name}, version: ${dataset.version}, id: ${dataset.id})`,
    );
    // SimpleQnA evaluation rows contain query and ground_truth fields. Use the dataset
    // ID as the file_id source of an evaluation run before cleaning up the dataset.
  } finally {
    if (generatedDataset) {
      await project.datasets.delete(generatedDataset.name, generatedDataset.version);
      console.log("Deleted the generated dataset version.");
    }
  }
}

main().catch((err) => {
  console.error("Sample failed:", err instanceof Error ? err.message : err);
});
