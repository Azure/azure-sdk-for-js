// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified workbench associated with the project.
 *
 * @summary gets the specified workbench associated with the project.
 * x-ms-original-file: 2026-05-15-preview/GetWorkbench.json
 */
async function getWorkbench() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.workbenches.get(
    "rgcognitiveservices",
    "myAccount",
    "myProject",
    "myWorkbench",
  );
  console.log(result);
}

async function main() {
  await getWorkbench();
}

main().catch(console.error);
