// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to schedule dataset-based evaluations
 * with the AIProjectClient.
 *
 * The OpenAI compatible Evals calls in this sample are made using the OpenAI client.
 * See https://platform.openai.com/docs/api-reference for more information.
 *
 * @summary This sample demonstrates how to create a scheduled evaluation using built-in
 * evaluators (Violence, F1 Score, Coherence), upload a dataset file, create a schedule
 * to run the evaluation daily, and clean up resources.
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
import { tmpdir } from "os";
import * as path from "path";
import * as fs from "node:fs/promises";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const datasetVersion = process.env["DATASET_VERSION"] || "1";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  try {
    const evalData = [
      {
        query: "What is the capital of France?",
        response: "Paris is the capital of France.",
        context: "France is in Europe",
        ground_truth: "Paris",
      },
    ];
    const dataFilePath = path.join(tmpdir(), "sample_data_evaluation.jsonl");
    await fs.writeFile(dataFilePath, evalData.map((item) => JSON.stringify(item)).join("\n"));
    // Upload a single file and create a new Dataset to reference the file
    console.log("Upload a single file and create a new Dataset to reference the file.");
    const dataset = await project.datasets.uploadFile(
      "eval-data-schedule-dataset",
      datasetVersion,
      dataFilePath,
    );
    console.log(JSON.stringify(dataset, null, 2));

    // Define data source configuration with custom schema
    const dataSourceConfig = {
      type: "custom" as const,
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
        type: "azure_ai_evaluator" as const,
        name: "violence",
        evaluator_name: "builtin.violence",
        data_mapping: { query: "{{item.query}}", response: "{{item.response}}" },
        initialization_parameters: { deployment_name: "{{aoai_deployment_and_model}}" },
      },
      {
        type: "azure_ai_evaluator" as const,
        name: "f1",
        evaluator_name: "builtin.f1_score",
      },
      {
        type: "azure_ai_evaluator" as const,
        name: "coherence",
        evaluator_name: "builtin.coherence",
        initialization_parameters: { deployment_name: "{{aoai_deployment_and_model}}" },
      },
    ];

    // Create evaluation
    console.log("\nCreating evaluation");
    const evalObject = await openAIClient.evals.create({
      name: "label model test with dataset ID",
      data_source_config: dataSourceConfig,
      testing_criteria: testingCriteria as any,
    });
    console.log(`Evaluation created`);

    // Get evaluation by ID
    console.log("\nGet Evaluation by Id");
    const evalObjectResponse = await openAIClient.evals.retrieve(evalObject.id);
    console.log("Eval Run Response:");
    console.log(JSON.stringify(evalObjectResponse, null, 2));

    // Create evaluation run object
    console.log("\nCreating Eval Run with Dataset ID");
    const evalRunObject = {
      eval_id: evalObject.id,
      name: "dataset_id_run",
      metadata: { team: "eval-exp", scenario: "dataset-id-v1" },
      data_source: {
        type: "jsonl" as const,
        source: {
          type: "file_id" as const,
          id: dataset.id || "",
        },
      },
    };

    console.log("Eval Run:");
    console.log(JSON.stringify(evalRunObject, null, 2));

    // Create schedule for dataset evaluation
    console.log("\nCreating Schedule for dataset evaluation");
    const schedule = await project.beta.schedules.createOrUpdate("dataset-eval-run-schedule-9am", {
      displayName: "Dataset Evaluation Eval Run Schedule",
      enabled: true,
      trigger: {
        type: "Recurrence",
        interval: 1,
        schedule: {
          type: "Daily",
          hours: [9], // Every day at 9 AM
        },
      },
      task: {
        type: "Evaluation",
        evalId: evalObject.id,
        evalRun: evalRunObject,
      },
    });

    console.log(`\nSchedule created for dataset evaluation: ${schedule.id}`);
    console.log(JSON.stringify(schedule, null, 2));

    // Wait for schedule to be fully created
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // List schedule runs
    console.log(`\nListing schedule runs for schedule id: ${schedule.id}`);
    const scheduleRuns = project.beta.schedules.listRuns(schedule.id ?? "");
    for await (const run of scheduleRuns) {
      console.log(JSON.stringify(run, null, 2));
    }

    // Clean up
    console.log("\nDeleting schedule");
    await project.beta.schedules.delete(schedule.id ?? "");
    console.log("Schedule deleted");

    console.log("\nDeleting evaluation");
    await openAIClient.evals.delete(evalObject.id);
    console.log("Evaluation deleted");

    console.log("\nDeleting dataset");
    await project.datasets.delete(dataset.name, dataset.version);
    console.log("Dataset deleted");
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
