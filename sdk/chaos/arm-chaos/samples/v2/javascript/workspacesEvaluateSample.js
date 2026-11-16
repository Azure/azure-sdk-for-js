// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts evaluation of published scenario-template versions, including when the workspace has no scenarios. Acceptance fixes the selected template membership and total count, qualified resource snapshot and canonical discovery result reference. Without a usable discovery snapshot or valid catalog input, the request is rejected synchronously with an Azure error and no evaluation result is created. A valid empty catalog completes successfully with zero counts and an empty results array. Outcome counts reflect processing after acceptance. The initial 202 has no body. Poll the operation-bound Location URL until completion: a completed successful or partially successful assessment returns the typed result; failed or canceled processing returns an Azure error whose target identifies the evaluation resource. Ordinary evaluation reads return the current resource, including failed or canceled results, while retained.
 *
 * @summary starts evaluation of published scenario-template versions, including when the workspace has no scenarios. Acceptance fixes the selected template membership and total count, qualified resource snapshot and canonical discovery result reference. Without a usable discovery snapshot or valid catalog input, the request is rejected synchronously with an Azure error and no evaluation result is created. A valid empty catalog completes successfully with zero counts and an empty results array. Outcome counts reflect processing after acceptance. The initial 202 has no body. Poll the operation-bound Location URL until completion: a completed successful or partially successful assessment returns the typed result; failed or canceled processing returns an Azure error whose target identifies the evaluation resource. Ordinary evaluation reads return the current resource, including failed or canceled results, while retained.
 * x-ms-original-file: 2026-11-01/Workspaces_Evaluate.json
 */
async function startEvaluationOfPublishedScenarioTemplateVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.evaluate("exampleRG", "exampleWorkspace");
  console.log(result);
}

async function main() {
  await startEvaluationOfPublishedScenarioTemplateVersions();
}

main().catch(console.error);
