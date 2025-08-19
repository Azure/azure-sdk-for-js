// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all of the protection policies within a subscription.
 *
 * @summary Lists all of the protection policies within a subscription.
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2024-02-01/examples/WafListPoliciesUnderSubscription.json
 */

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAllPoliciesInAResourceGroup(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policies.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllPoliciesInAResourceGroup();
}

main().catch(console.error);
