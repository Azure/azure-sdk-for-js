// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list data versions in the data container
 *
 * @summary list data versions in the data container
 * x-ms-original-file: 2025-12-01/Registry/DataVersionBase/registryList.json
 */
async function registryListRegistryDataVersionBase() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registryDataVersions.list("test-rg", "registryName", "string", {
    orderBy: "string",
    top: 1,
    tags: "string",
    listViewType: "ArchivedOnly",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await registryListRegistryDataVersionBase();
}

main().catch(console.error);
