// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedServiceIdentityClient } from "@azure/arm-msi";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the userAssignedIdentities available under the specified subscription.
 *
 * @summary lists all the userAssignedIdentities available under the specified subscription.
 * x-ms-original-file: 2025-05-31-preview/IdentityListBySubscription.json
 */
async function identityListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-5678-9012-123456789012";
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
