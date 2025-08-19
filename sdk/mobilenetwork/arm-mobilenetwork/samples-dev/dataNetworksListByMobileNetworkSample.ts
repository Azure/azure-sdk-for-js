// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all data networks in the mobile network.
 *
 * @summary Lists all data networks in the mobile network.
 * x-ms-original-file: specification/mobilenetwork/resource-manager/Microsoft.MobileNetwork/stable/2024-04-01/examples/DataNetworkListByMobileNetwork.json
 */

import { MobileNetworkManagementClient } from "@azure/arm-mobilenetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listDataNetworksInAMobileNetwork(): Promise<void> {
  const subscriptionId =
    process.env["MOBILENETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["MOBILENETWORK_RESOURCE_GROUP"] || "rg1";
  const mobileNetworkName = "testMobileNetwork";
  const credential = new DefaultAzureCredential();
  const client = new MobileNetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataNetworks.listByMobileNetwork(
    resourceGroupName,
    mobileNetworkName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDataNetworksInAMobileNetwork();
}

main().catch(console.error);
