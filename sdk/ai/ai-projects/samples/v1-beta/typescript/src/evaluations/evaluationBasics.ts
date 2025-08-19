// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage evaluations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all evaluations,
 * and perform various operations on them.
 */

import { AIProjectClient, EvaluatorIds } from "@azure/ai-projects";
import type { Evaluation, EvaluationWithOptionalName } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import * as path from "path";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const evaluationDeploymentName =
  process.env["EVALUATION_DEPLOYMENT_NAME"] || "<evaluation deployment name>";
const containerConnectionName =
  process.env["AZURE_STORAGE_CONNECTION_NAME"] || "<storage connection name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const filePath = path.join(__dirname, "sample_data_evaluation.jsonl");
  // upload a file to the dataset
  const dataset = await project.datasets.uploadFile("data-evaluation-test", "1.0.5", filePath, {
    connectionName: containerConnectionName,
  });
  console.log("Dataset created:", JSON.stringify(dataset, null, 2));
  // create a new evaluation
  const newEvaluation: EvaluationWithOptionalName = {
    displayName: "Evaluation 1",
    description: "This is a test evaluation",
    data: {
      type: "dataset",
      id: dataset.id,
    },
    evaluators: {
      relevance: {
        id: EvaluatorIds.RELEVANCE,
        initParams: {
          deploymentName: evaluationDeploymentName,
        },
        dataMapping: {
          query: "${data.query}",
          response: "${data.response}",
        },
      },
    },
  };

  const evalResp = await project.evaluations.create(newEvaluation);
  console.log("Create a new evaluation:", JSON.stringify(evalResp, null, 2));
  // get the evaluation by ID
  const eval2 = await project.evaluations.get(evalResp.name);
  console.log("Get the evaluation by ID:", eval2);

  const evaluations: Evaluation[] = [];
  const evaluationNames: string[] = [];
  for await (const evaluation of project.evaluations.list()) {
    evaluations.push(evaluation);
    evaluationNames.push(evaluation.displayName ?? "");
  }
  console.log("List of evaluation display names:", evaluationNames);

  const name = evaluations[0].name;
  const evaluation = await project.evaluations.get(name);
  console.log("Get an evaluation by ID:", JSON.stringify(evaluation, null, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
