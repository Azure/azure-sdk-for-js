// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage evaluations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all evaluations,
 * and perform various operations on them.
 */

const { AIProjectClient, EvaluatorIds } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const databaseId = process.env["DATABASE_ID"] || "<database id>";
const evaluationDeploymentName =
  process.env["EVALUATION_DEPLOYMENT_NAME"] || "<evaluation deployment name>";

async function main() {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  // create a new evaluation
  const newEvaluation = {
    displayName: "Evaluation 1",
    description: "This is a test evaluation",
    data: {
      type: "dataset",
      // return by project.datasets.uploadFile().name for example
      id: databaseId,
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

  const evalResp = await project.evaluations.createRun(newEvaluation);
  console.log("Create a new evaluation:", JSON.stringify(evalResp, null, 2));
  // get the evaluation by ID
  const eval2 = await project.evaluations.get(evalResp.name);
  console.log("Get the evaluation by ID:", eval2);

  const evaluations = [];
  const evaluationNames = [];
  for await (const evaluation of project.evaluations.list()) {
    evaluations.push(evaluation);
    evaluationNames.push(evaluation.displayName ?? "");
  }
  console.log("List of evaluation display names:", evaluationNames);

  // This is temporary, as interface recommend the name of the evaluation
  const name = evaluations[0].name;
  const evaluation = await project.evaluations.get(name);
  console.log("Get an evaluation by ID:", JSON.stringify(evaluation, null, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
