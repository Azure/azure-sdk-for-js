// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list datastores.
 *
 * @summary list datastores.
 * x-ms-original-file: 2025-12-01/Datastore/list.json
 */
async function listDatastores() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.datastores.list("test-rg", "my-aml-workspace", {
    isDefault: false,
    names: ["string"],
    searchText: "string",
    orderBy: "string",
    orderByAsc: false,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDatastores();
}

main().catch(console.error);
