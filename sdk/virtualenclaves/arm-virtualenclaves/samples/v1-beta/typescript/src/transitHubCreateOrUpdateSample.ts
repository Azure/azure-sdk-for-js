// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a TransitHubResource
 *
 * @summary create a TransitHubResource
 * x-ms-original-file: 2025-05-01-preview/TransitHub_CreateOrUpdate.json
 */
async function transitHubCreateOrUpdate(): Promise<void> {
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

async function main(): Promise<void> {
  await transitHubCreateOrUpdate();
}

main().catch(console.error);
