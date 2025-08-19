// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all JIT requests within the resource group.
 *
 * @summary Lists all JIT requests within the resource group.
 * x-ms-original-file: specification/solutions/resource-manager/Microsoft.Solutions/stable/2021-07-01/examples/listJitRequestsByResourceGroup.json
 */

import { ApplicationClient } from "@azure/arm-managedapplications";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsAllJitRequestsWithinTheResourceGroup(): Promise<void> {
  const subscriptionId = process.env["MANAGEDAPPLICATIONS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["MANAGEDAPPLICATIONS_RESOURCE_GROUP"] || "rg";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationClient(credential, subscriptionId);
  const result = await client.jitRequests.listByResourceGroup(resourceGroupName);
  console.log(result);
}

async function main(): Promise<void> {
  await listsAllJitRequestsWithinTheResourceGroup();
}

main().catch(console.error);
