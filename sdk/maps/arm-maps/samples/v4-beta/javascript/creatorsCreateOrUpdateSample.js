// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMapsManagementClient } = require("@azure/arm-maps");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Maps Creator resource. Creator resource will manage Azure resources required to populate a custom set of mapping data. It requires an account to exist before it can be created.
 *
 * @summary create or update a Maps Creator resource. Creator resource will manage Azure resources required to populate a custom set of mapping data. It requires an account to exist before it can be created.
 * x-ms-original-file: 2025-10-01-preview/CreateMapsCreator.json
 */
async function createCreatorResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.creators.createOrUpdate(
    "myResourceGroup",
    "myMapsAccount",
    "myCreator",
    { location: "eastus2", properties: { storageUnits: 5 }, tags: { test: "true" } },
  );
  console.log(result);
}

async function main() {
  await createCreatorResource();
}

main().catch(console.error);
