// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Performs vip swap operation on swappable cloud services.
 *
 * @summary Performs vip swap operation on swappable cloud services.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/CloudServiceSwapPut.json
 */

import type { SwapResource} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putVipSwapOperation(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const groupName = "rg1";
  const resourceName = "testCloudService";
  const parameters: SwapResource = { properties: { slotType: "Production" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.vipSwap.beginCreateAndWait(
    groupName,
    resourceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putVipSwapOperation();
}

main().catch(console.error);
