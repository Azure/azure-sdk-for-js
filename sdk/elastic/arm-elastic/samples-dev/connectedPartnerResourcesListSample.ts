// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all active deployments associated with the marketplace subscription linked to the given Elastic monitor resource.
 *
 * @summary List all active deployments associated with the marketplace subscription linked to the given Elastic monitor resource.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/ConnectedPartnerResources_List.json
 */
async function connectedPartnerResourcesList(): Promise<void> {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectedPartnerResources.list(
    resourceGroupName,
    monitorName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await connectedPartnerResourcesList();
}

main().catch(console.error);
