// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Data containers.
 *
 * @summary list Data containers.
 * x-ms-original-file: 2025-12-01/Registry/DataContainer/registryList.json
 */
async function registryListRegistryDataContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registryDataContainers.list("test-rg", "registryName", {
    listViewType: "All",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await registryListRegistryDataContainer();
}

main().catch(console.error);
