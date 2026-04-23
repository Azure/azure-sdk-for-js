// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the list of resources that are onboarded with NSP. These resources can be associated with a network security perimeter
 *
 * @summary Gets the list of resources that are onboarded with NSP. These resources can be associated with a network security perimeter
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PerimeterAssociableResourcesList.json
 */
async function networkSecurityPerimeterAssociableResourceTypes(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterAssociableResourceTypes.list(
    location,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterAssociableResourceTypes();
}

main().catch(console.error);
