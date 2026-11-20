// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the connection resource.
 *
 * @summary creates or updates the connection resource.
 * x-ms-original-file: 2026-02-06-preview/createOrUpdateConnection.json
 */
async function createsOrUpdatesTheConnectionResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.connections.createOrUpdate("testRG", "testConnection", {
    location: "East US",
    properties: {
      justification: "justification",
      pipeline: "testdc",
      requirementId: "id",
      flowProfileList: [
        {
          pipeline: "pipelinea",
          name: "flowProfileNamea",
          flowProfileId: "25f2c41a-6e29-4c40-a033-b4de81d4a681",
          replicationScenario: "Files",
          status: "Enabled",
          description: "Testing 123",
        },
        {
          pipeline: "pipelinea",
          name: "flowProfileNameb",
          flowProfileId: "66b00598-cabb-4a85-b3d8-88905ac899b8",
          replicationScenario: "Files",
          status: "Enabled",
          description: "Testing 123",
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await createsOrUpdatesTheConnectionResource();
}

main().catch(console.error);
