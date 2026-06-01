// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a stopped workbench resource.
 * This is a long-running operation that returns 202 Accepted.
 * Returns 204 if the workbench is already in the target state.
 *
 * @summary starts a stopped workbench resource.
 * This is a long-running operation that returns 202 Accepted.
 * Returns 204 if the workbench is already in the target state.
 * x-ms-original-file: 2026-03-15-preview/StartWorkbench.json
 */
async function startWorkbench() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.workbenches.start("rgcognitiveservices", "myAccount", "myProject", "myWorkbench");
}

async function main() {
  await startWorkbench();
}

main().catch(console.error);
