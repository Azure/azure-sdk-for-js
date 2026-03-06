// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use built-in evaluators with a dataset ID
 * with the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create an evaluation using built-in
 * evaluators (Violence, F1 Score, Coherence), upload a dataset file, run the evaluation
 * using the dataset ID, monitor its progress, and clean up resources.
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

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const path = require("path");
const { tmpdir } = require("os");
require("dotenv/config");
const fs = require("node:fs/promises");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const datasetVersion = process.env["DATASET_VERSION"] || "1";

// Sample evaluation data with query, response, context, and ground_truth fields
const evalData = [
  {
    query: "What is the capital of France?",
    response: "Paris is the capital of France.",
    context: "France is in Europe",
    ground_truth: "Paris",
  },
];

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  try {
    // Create a temporary directory to store the data file
    const tempFilePath = path.join(tmpdir(), `ai-eval-data-${Date.now()}.jsonl`);
    const jsonlContent = evalData.map((item) => JSON.stringify(item)).join("\n");
    await fs.writeFile(tempFilePath, jsonlContent);

    // Upload a single file and create a new Dataset to reference the file
    console.log("Upload a single file and create a new Dataset to reference the file.");
    const dataset = await project.datasets.uploadFile("ai-eval-data", datasetVersion, tempFilePath);
    console.log(JSON.stringify(dataset, null, 2));

    // Define data source configuration with custom schema
    const dataSourceConfig = {
      type: "custom",
      item_schema: {
        type: "object",
        properties: {
          query: { type: "string" },
          response: { type: "string" },
          context: { type: "string" },
          ground_truth: { type: "string" },
        },
        required: [],
      },
      include_sample_schema: true,
    };

    // Define testing criteria with built-in evaluators
    const testingCriteria = [
      {
        type: "azure_ai_evaluator",
        name: "violence",
        evaluator_name: "builtin.violence",
        data_mapping: { query: "{{item.query}}", response: "{{item.response}}" },
        initialization_parameters: { deployment_name: modelDeploymentName },
      },
      {
        type: "azure_ai_evaluator",
        name: "f1",
        evaluator_name: "builtin.f1_score",
      },
      {
        type: "azure_ai_evaluator",
        name: "coherence",
        evaluator_name: "builtin.coherence",
        initialization_parameters: { deployment_name: modelDeploymentName },
      },
    ];

    // Create evaluation
    console.log("\nCreating evaluation");
    const evalObject = await openAIClient.evals.create({
      name: "label model test with dataset ID",
      data_source_config: dataSourceConfig,
      testing_criteria: testingCriteria,
    });
    console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);

    // Get evaluation by ID
    console.log("\nGet evaluation by Id");
    const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
    console.log("Evaluation Response:");
    console.log(JSON.stringify(evalObjectResponse, null, 2));

    // Create evaluation run with Dataset ID
    console.log("\nCreating evaluation run with Dataset ID");
    const evalRunObject = await openAIClient.evals.runs.create(evalObject.id, {
      name: "dataset_id_run",
      metadata: { team: "eval-exp", scenario: "dataset-id-v1" },
      data_source: {
        type: "jsonl",
        source: {
          type: "file_id",
          id: dataset.id || "",
        },
      },
    });

    console.log(`Evaluation run created (id: ${evalRunObject.id})`);
    console.log(JSON.stringify(evalRunObject, null, 2));

    // Get evaluation run by ID
    console.log("\nGet evaluation run by Id");
    let evalRunResponse = await openAIClient.evals.runs.retrieve(evalRunObject.id, {
      eval_id: evalObject.id,
    });
    console.log("Evaluation run Response:");
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

module.exports = { main };
