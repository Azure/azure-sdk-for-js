// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified workbench associated with the project.
 *
 * @summary deletes the specified workbench associated with the project.
 * x-ms-original-file: 2026-05-15-preview/DeleteWorkbench.json
 */
async function deleteWorkbench() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.workbenches.delete("rgcognitiveservices", "myAccount", "myProject", "myWorkbench");
}

async function main() {
  await deleteWorkbench();
}

main().catch(console.error);
