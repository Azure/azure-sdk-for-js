// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a list of privateLinkHubs in a resource group
 *
 * @summary Returns a list of privateLinkHubs in a resource group
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/ListPrivateLinkHubsInResourceGroup.json
 */

import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listPrivateLinkHubsInResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "resourceGroup1";
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkHubs.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateLinkHubsInResourceGroup();
}

main().catch(console.error);
