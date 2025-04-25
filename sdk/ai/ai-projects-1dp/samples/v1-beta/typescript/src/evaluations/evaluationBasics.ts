// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage evaluations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all evaluations,
 * and perform various operations on them.
 */

import { AIProjectClient, EvaluatorIds } from "@azure/ai-projects-1dp";
import type { Evaluation, EvaluationWithOptionalId } from "@azure/ai-projects-1dp";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  // const dataset: DatasetVersion = await project.datasets.uploadFileAndCreate(
  //   "jss-eval-sample-dataset",
  //   "1",
  //   "./samples_folder/sample_data_evaluation.jsonl",
  // );
  // console.log(dataset.name);

  // create a new evaluation
  const newEvaluation: EvaluationWithOptionalId = {
    displayName: "Evaluation 1",
    description: "This is a test evaluation",
    data: {
      type: "dataset",
      id: "data-id", // dataset.name
    },
    evaluators: {
      relevance: {
        id: EvaluatorIds.RELEVANCE,
        initParams: {
          deploymentName: "got-4o"
        }
      } 
    }
  };

  const evalResp = await project.evaluations.createRun(newEvaluation);
  console.log("Create a new evaluation:", JSON.stringify(evalResp, null, 2));
  // get the evaluation by ID
  const eval2 = await project.evaluations.get(evalResp.id);
  console.log("Get the evaluation by ID:", eval2);

  const evaluations: Evaluation[] = [];
  const evaluationNames: string[] = [];
  for await (const evaluation of project.evaluations.list()) {
    evaluations.push(evaluation);
    evaluationNames.push(evaluation.displayName ?? "");
  }
  console.log("List of evaluation display names:", evaluationNames);

  // This is temporary, as interface recommend the name of the evaluation
  const id = evaluations[0].id;
  const evaluation = await project.evaluations.get(id);
  console.log("Get an evaluation by ID:", evaluation);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
