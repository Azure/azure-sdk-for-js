// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a TransitHubResource
 *
 * @summary update a TransitHubResource
 * x-ms-original-file: 2025-05-01-preview/TransitHub_Update.json
 */
async function transitHubUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CA1CB369-DD26-4DB2-9D43-9AFEF0F22093";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.transitHub.update("rgopenapi", "TestMyCommunity", "TestThName", {
    tags: { key4278: "hjoxhwofxcshowbnafdrrzq" },
    properties: {
      state: "PendingApproval",
      transitOption: { type: "ExpressRoute", params: { scaleUnits: 1 } },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await transitHubUpdate();
}

main().catch(console.error);
