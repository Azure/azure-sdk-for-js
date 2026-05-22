// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list featurestore entity containers.
 *
 * @summary list featurestore entity containers.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturesetContainer/list.json
 */
async function listWorkspaceFeaturesetContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.featuresetContainers.list("test-rg", "my-aml-workspace", {
    tags: "string",
    listViewType: "ArchivedOnly",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWorkspaceFeaturesetContainer();
}

main().catch(console.error);
