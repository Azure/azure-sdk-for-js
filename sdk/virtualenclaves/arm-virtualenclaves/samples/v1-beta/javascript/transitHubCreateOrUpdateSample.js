// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a TransitHubResource
 *
 * @summary create a TransitHubResource
 * x-ms-original-file: 2025-05-01-preview/TransitHub_CreateOrUpdate.json
 */
async function transitHubCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.transitHub.createOrUpdate(
    "rgopenapi",
    "TestMyCommunity",
    "TestThName",
    {
      properties: {
        state: "PendingApproval",
        transitOption: { type: "ExpressRoute", params: { scaleUnits: 1 } },
      },
      tags: { Tag1: "Value1" },
      location: "westcentralus",
    },
  );
  console.log(result);
}

async function main() {
  await transitHubCreateOrUpdate();
}

main().catch(console.error);
