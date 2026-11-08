// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate a question-and-answer evaluation dataset
 * from an inline prompt, then run an evaluation against the generated dataset.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary Generate an evaluation dataset from a prompt and evaluate model responses.
 * @azsdk-weight 50
 */

import { AIProjectClient } from "@azure/ai-projects";
import type { DatasetDataGenerationJobOutput } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

function formatResultSummary(results: unknown): string {
  if (!Array.isArray(results)) {
    return "";
  }
  return results
    .map((result: unknown) => {
      if (typeof result !== "object" || result === null) {
        return "unknown result";
      }
      const fields = result as Record<string, unknown>;
      return `${String(fields["name"])}=${String(fields["score"])} (${String(fields["passed"])})`;
    })
    .join(", ");
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();
  const suffix = Date.now().toString();
  const jobName = `qna-policy-${suffix}`;
  const datasetName = `qna-policy-${suffix}`;

  let jobId: string | undefined;
  let generatedDatasetName: string | undefined;
  let generatedDatasetVersion: string | undefined;
  let evaluationId: string | undefined;

  try {
    console.log("Creating a prompt-based evaluation data generation job...");
    const generationPoller = project.datasets.createGenerationJob({
      name: jobName,
      scenario: "evaluation",
      sources: [
        {
          type: "prompt",
          description: "Contoso refund policy",
          prompt:
            "Contoso offers a full refund within 30 days of purchase for any product " +
            "returned in its original condition. After 30 days, store credit may be " +
            "issued at the discretion of customer support. Digital goods are " +
            "non-refundable once downloaded.",
        },
      ],
      generation_configuration: {
        type: "simple_qna",
        max_samples: 15,
        model_options: { model: deploymentName },
      },
      output_configuration: {
        name: datasetName,
        description: "QnA pairs generated from the Contoso refund policy prompt.",
        tags: { sample: "dataset-generation-with-evaluation" },
      },
    });

    await generationPoller.submitted();
    jobId = generationPoller.operationState?.jobId;
    if (!jobId) {
      throw new Error("The service did not return a data generation job id.");
    }
    console.log(`Data generation job submitted (id: ${jobId})`);

    const generationResult = await generationPoller.pollUntilDone();
    console.log(
      `Data generation completed (${generationResult.generated_samples} sample(s) generated)`,
    );

    const datasetOutput = generationResult.outputs?.find(
      (output: unknown): output is DatasetDataGenerationJobOutput =>
        typeof output === "object" &&
        output !== null &&
        "type" in output &&
        output.type === "dataset",
    );
    if (
      !datasetOutput ||
      datasetOutput.type !== "dataset" ||
      !datasetOutput.name ||
      !datasetOutput.version
    ) {
      throw new Error("The data generation job did not produce a dataset output.");
    }

    const outputName = datasetOutput.name;
    const outputVersion = datasetOutput.version;
    generatedDatasetName = outputName;
    generatedDatasetVersion = outputVersion;
    const dataset = await project.datasets.get(outputName, outputVersion);
    if (!dataset.id) {
      throw new Error("The generated dataset did not include an id.");
    }
    console.log(
      `Generated dataset (name: ${dataset.name}, version: ${dataset.version}, id: ${dataset.id})`,
    );

    console.log("\nCreating an evaluation for the generated questions...");
    const evaluation = await openAIClient.evals.create({
      name: "Generated QnA Evaluation",
      data_source_config: {
        type: "custom",
        item_schema: {
          type: "object",
          properties: {
            query: { type: "string" },
            ground_truth: { type: "string" },
          },
          required: ["query"],
        },
        include_sample_schema: true,
      },
      testing_criteria: [
        {
          type: "azure_ai_evaluator",
          name: "coherence",
          evaluator_name: "builtin.coherence",
          initialization_parameters: { deployment_name: deploymentName },
          data_mapping: {
            query: "{{item.query}}",
            response: "{{sample.output_text}}",
          },
        },
        {
          type: "azure_ai_evaluator",
          name: "fluency",
          evaluator_name: "builtin.fluency",
          initialization_parameters: { deployment_name: deploymentName },
          data_mapping: { response: "{{sample.output_text}}" },
        },
      ] as any,
    });
    evaluationId = evaluation.id;
    console.log(`Evaluation created (id: ${evaluation.id})`);

    let run = await openAIClient.evals.runs.create(evaluation.id, {
      name: "Generated QnA Evaluation Run",
      data_source: {
        type: "completions",
        source: { type: "file_id", id: dataset.id },
        input_messages: {
          type: "template",
          template: [
            {
              type: "message",
              role: "developer",
              content: {
                type: "input_text",
                text:
                  "You are a Contoso customer-support assistant. Answer the user's " +
                  "question about the Contoso refund policy clearly and concisely.",
              },
            },
            {
              type: "message",
              role: "user",
              content: { type: "input_text", text: "{{item.query}}" },
            },
          ],
        },
        model: deploymentName,
      } as any,
    });
    console.log(`Evaluation run created (id: ${run.id})`);

    while (!["completed", "failed", "canceled"].includes(run.status)) {
      await new Promise((resolve) => setTimeout(resolve, 10000));
      run = await openAIClient.evals.runs.retrieve(run.id, { eval_id: evaluation.id });
      console.log(`Waiting for evaluation run... current status: ${run.status}`);
    }

    if (run.status !== "completed") {
      throw new Error(`Evaluation run did not complete successfully (status: ${run.status}).`);
    }

    console.log(`Result counts: ${JSON.stringify(run.result_counts)}`);
    for await (const item of openAIClient.evals.runs.outputItems.list(run.id, {
      eval_id: evaluation.id,
    })) {
      const summary = formatResultSummary(item.results);
      console.log(`  item ${item.id}: status=${item.status} | ${summary}`);
    }
    console.log(`Eval run report URL: ${run.report_url}`);
  } finally {
    if (evaluationId) {
      console.log(`Deleting evaluation ${evaluationId}...`);
      await openAIClient.evals.delete(evaluationId);
    }
    if (generatedDatasetName && generatedDatasetVersion) {
      console.log(
        `Deleting generated dataset ${generatedDatasetName}/${generatedDatasetVersion}...`,
      );
      await project.datasets.delete(generatedDatasetName, generatedDatasetVersion);
    }
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
