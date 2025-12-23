// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use AI-assisted evaluators from the built-in catalog
 * with the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation using built-in AI-assisted
 * evaluators (Similarity, ROUGE, METEOR, GLEU, F1, BLEU), upload a dataset, run the evaluation,
 * monitor its progress, and clean up resources.
 *
 * Before running the sample:
 *
 * npm install @azure/ai-projects @azure/identity dotenv
 *
 * Set these environment variables with your own values:
 * 1) AZURE_AI_PROJECT_ENDPOINT - Required. The Azure AI Project endpoint, as found in the overview page of your
 *    Microsoft Foundry project. It has the form: https://<account_name>.services.ai.azure.com/api/projects/<project_name>.
 * 2) MODEL_DEPLOYMENT_NAME - Required. The name of the model deployment to use for evaluation.
 * 3) DATASET_VERSION - Optional. The version of the Dataset to create and use in this sample.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as path from "path";
import { tmpdir } from "os";
import "dotenv/config";
import * as fs from "fs";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const datasetVersion = process.env["DATASET_VERSION"] || "1";

const evalData = [
  {
    query: "What is capital of France?",
    context: "France is in Europe",
    response: "Paris is the capital of France.",
    ground_truth: "Paris is the capital of France.",
  },
];

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  try {
    // Create a temporary directory to store the data file
    const tempFilePath = path.join(tmpdir(), `ai-eval-data-${Date.now()}.jsonl`);
    const jsonlContent = evalData.map((item) => JSON.stringify(item)).join("\n");
    fs.writeFileSync(tempFilePath, jsonlContent);
    // Upload a single file and create a new Dataset to reference the file
    console.log("Upload a single file and create a new Dataset to reference the file.");
    const dataset = await project.datasets.uploadFile("ai-eval-data", datasetVersion, tempFilePath);
    console.log(JSON.stringify(dataset, null, 2));

    // Define data source configuration
    const dataSourceConfig = {
      type: "custom" as const,
      item_schema: {
        type: "object",
        properties: {
          response: { type: "string" },
          ground_truth: { type: "string" },
        },
        required: [],
      },
      include_sample_schema: false,
    };

    // Define testing criteria with built-in AI-assisted evaluators
    const testingCriteria = [
      {
        type: "azure_ai_evaluator" as const,
        name: "Similarity",
        evaluator_name: "builtin.similarity",
        data_mapping: { response: "{{item.response}}", ground_truth: "{{item.ground_truth}}" },
        initialization_parameters: { deployment_name: modelDeploymentName, threshold: 3 },
      },
      {
        type: "azure_ai_evaluator" as const,
        name: "ROUGEScore",
        evaluator_name: "builtin.rouge_score",
        data_mapping: { response: "{{item.response}}", ground_truth: "{{item.ground_truth}}" },
        initialization_parameters: {
          rouge_type: "rouge1",
          f1_score_threshold: 0.5,
          precision_threshold: 0.5,
          recall_threshold: 0.5,
        },
      },
      {
        type: "azure_ai_evaluator" as const,
        name: "METEORScore",
        evaluator_name: "builtin.meteor_score",
        data_mapping: { response: "{{item.response}}", ground_truth: "{{item.ground_truth}}" },
        initialization_parameters: { threshold: 0.5 },
      },
      {
        type: "azure_ai_evaluator" as const,
        name: "GLEUScore",
        evaluator_name: "builtin.gleu_score",
        data_mapping: { response: "{{item.response}}", ground_truth: "{{item.ground_truth}}" },
        initialization_parameters: { threshold: 0.5 },
      },
      {
        type: "azure_ai_evaluator" as const,
        name: "F1Score",
        evaluator_name: "builtin.f1_score",
        data_mapping: { response: "{{item.response}}", ground_truth: "{{item.ground_truth}}" },
        initialization_parameters: { threshold: 0.5 },
      },
      {
        type: "azure_ai_evaluator" as const,
        name: "BLEUScore",
        evaluator_name: "builtin.bleu_score",
        data_mapping: { response: "{{item.response}}", ground_truth: "{{item.ground_truth}}" },
        initialization_parameters: { threshold: 0.5 },
      },
    ];

    // Create evaluation
    console.log("\nCreating evaluation");
    const evalObject = await openAIClient.evals.create({
      name: "ai assisted evaluators test",
      data_source_config: dataSourceConfig,
      testing_criteria: testingCriteria as any,
    });
    console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

    // Get evaluation by ID
    console.log("\nGet Evaluation by Id");
    const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
    console.log("Evaluation Response:");
    console.log(JSON.stringify(evalObjectResponse, null, 2));

    // Create evaluation run
    console.log("\nCreating evaluation run");
    const evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
      name: "dataset",
      metadata: { team: "eval-exp", scenario: "notifications-v1" },
      data_source: {
        type: "jsonl" as const,
        source: {
          type: "file_id" as const,
          id: dataset.id || "",
        },
      },
    });

    console.log("Eval Run created");
    console.log(JSON.stringify(evalRunObject, null, 2));

    // Get evaluation run by ID
    console.log("\nGet Evaluation Run by Id");
    let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Evaluation Run Response:");
    console.log(JSON.stringify(evalRunResponse, null, 2));

    // Poll for completion
    while (!["completed", "failed"].includes(evalRunResponse.status)) {
      evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunResponse.id, {
        eval_id: evalObject.id,
      });
      console.log("Waiting for evaluation run to complete...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (evalRunResponse.status === "completed") {
      const outputItems = [];
      for await (const item of openAIClient.evals.runs.outputItems.list(evalRunResponse.id, {
        eval_id: evalObject.id,
      })) {
        outputItems.push(item);
      }
      console.log("\nEvaluation output items:");
      console.log(JSON.stringify(outputItems, null, 2));
      console.log(`Eval Run Report URL: ${evalRunResponse.report_url}`);
    } else {
      console.log(`\nEvaluation run failed. Report URL: ${evalRunResponse.report_url}`);
    }

    // Clean up
    console.log("\nDeleting dataset");
    await project.datasets.delete(dataset.name, dataset.version);
    console.log("Dataset deleted");

    console.log("\nDeleting evaluation");
    await openAIClient.evals.delete(evalObject.id);
    console.log("Evaluation deleted");
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
