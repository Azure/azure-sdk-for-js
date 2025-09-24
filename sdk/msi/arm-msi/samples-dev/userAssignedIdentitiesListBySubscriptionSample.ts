// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all the userAssignedIdentities available under the specified subscription.
 *
 * @summary Lists all the userAssignedIdentities available under the specified subscription.
 * x-ms-original-file: specification/msi/resource-manager/Microsoft.ManagedIdentity/stable/2024-11-30/examples/IdentityListBySubscription.json
 */

import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function identityListBySubscription(): Promise<void> {
  const subscriptionId = process.env["MSI_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new ManagedServiceIdentityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.userAssignedIdentities.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await identityListBySubscription();
}

main().catch(console.error);
