// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts a running workbench resource.
 * This is a long-running operation that returns 202 Accepted.
 * Returns 204 if the workbench is already in the target state.
 *
 * @summary restarts a running workbench resource.
 * This is a long-running operation that returns 202 Accepted.
 * Returns 204 if the workbench is already in the target state.
 * x-ms-original-file: 2026-03-15-preview/RestartWorkbench.json
 */
async function restartWorkbench() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.workbenches.restart("rgcognitiveservices", "myAccount", "myProject", "myWorkbench");
}

async function main() {
  await restartWorkbench();
}

main().catch(console.error);
