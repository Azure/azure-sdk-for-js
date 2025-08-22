// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the available namespaces within the ResourceGroup.
 *
 * @summary Lists all the available namespaces within the ResourceGroup.
 * x-ms-original-file: specification/relay/resource-manager/Microsoft.Relay/stable/2017-04-01/examples/NameSpaces/RelayNameSpaceListByResourceGroup.json
 */

import { RelayAPI } from "@azure/arm-relay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function relayNameSpaceListByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["RELAY_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["RELAY_RESOURCE_GROUP"] || "resourcegroup";
  const credential = new DefaultAzureCredential();
  const client = new RelayAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await relayNameSpaceListByResourceGroup();
}

main().catch(console.error);
