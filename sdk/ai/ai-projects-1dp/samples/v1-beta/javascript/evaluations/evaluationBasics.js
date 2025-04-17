// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the AIProjectClient to manage evaluations.
 *
 * @summary Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all evaluations,
 * and perform various operations on them.
 */

const { AIProjectClient } = require("@azure/ai-projects-1dp");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

async function main() {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const evaluations = [];
  const evaluationNames = [];
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

module.exports = { main };
