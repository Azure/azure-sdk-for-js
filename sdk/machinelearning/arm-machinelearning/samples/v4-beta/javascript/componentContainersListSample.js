// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list component containers.
 *
 * @summary list component containers.
 * x-ms-original-file: 2025-12-01/Workspace/ComponentContainer/list.json
 */
async function listWorkspaceComponentContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.componentContainers.list("test-rg", "my-aml-workspace")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWorkspaceComponentContainer();
}

main().catch(console.error);
