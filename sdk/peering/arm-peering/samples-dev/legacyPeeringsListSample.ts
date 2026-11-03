// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the legacy peerings under the given subscription matching the specified kind and location.
 *
 * @summary lists all of the legacy peerings under the given subscription matching the specified kind and location.
 * x-ms-original-file: 2025-05-01/ListLegacyPeerings.json
 */
async function listLegacyPeerings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.legacyPeerings.list("peeringLocation0", "Exchange", {
    directPeeringType: "Edge",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listLegacyPeerings();
}

main().catch(console.error);
