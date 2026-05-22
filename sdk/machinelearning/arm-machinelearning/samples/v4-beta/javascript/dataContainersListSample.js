// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list data containers.
 *
 * @summary list data containers.
 * x-ms-original-file: 2025-12-01/Workspace/DataContainer/list.json
 */
async function listWorkspaceDataContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataContainers.list("testrg123", "workspace123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWorkspaceDataContainer();
}

main().catch(console.error);
