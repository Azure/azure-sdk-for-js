// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the prefixes received over the specified peering under the given subscription and resource group.
 *
 * @summary lists the prefixes received over the specified peering under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/GetPeeringReceivedRoutes.json
 */
async function listsThePrefixesReceivedOverTheSpecifiedPeeringUnderTheGivenSubscriptionAndResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.receivedRoutes.listByPeering("rgName", "peeringName", {
    prefix: "1.1.1.0/24",
    asPath: "123 456",
    originAsValidationState: "Valid",
    rpkiValidationState: "Valid",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsThePrefixesReceivedOverTheSpecifiedPeeringUnderTheGivenSubscriptionAndResourceGroup();
}

main().catch(console.error);
