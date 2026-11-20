// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the flow resource.
 *
 * @summary creates or updates the flow resource.
 * x-ms-original-file: 2026-02-06-preview/createOrUpdateFlow.json
 */
async function createsOrUpdatesTheFlowResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.createOrUpdate("testRG", "testConnection", "testFlow", {
    location: "East US",
    properties: {
      connection: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testRG/providers/Microsoft.AzureDataTransfer/connections/testConnection",
      },
      flowProfile: {
        pipeline: "testPipeline",
        name: "flowProfileName",
        flowProfileId: "25f2c41a-6e29-4c40-a033-b4de81d4a681",
        replicationScenario: "Files",
        status: "Enabled",
        description: "Testing 123",
      },
      flowDataType: "Blob",
      storageAccountName: "testsa",
      storageContainerName: "testcontainer",
    },
  });
  console.log(result);
}

async function main() {
  await createsOrUpdatesTheFlowResource();
}

main().catch(console.error);
