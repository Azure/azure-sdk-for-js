// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all active deployments associated with the marketplace subscription linked to the given Elastic monitor resource.
 *
 * @summary list all active deployments associated with the marketplace subscription linked to the given Elastic monitor resource.
 * x-ms-original-file: 2025-06-01/ConnectedPartnerResources_List.json
 */
async function connectedPartnerResourcesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectedPartnerResources.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await connectedPartnerResourcesList();
}

main().catch(console.error);
