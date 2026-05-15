// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all application gateways in a resource group.
 *
 * @summary lists all application gateways in a resource group.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayList.json
 */
async function listsAllApplicationGatewaysInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationGateways.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllApplicationGatewaysInAResourceGroup();
}

main().catch(console.error);
