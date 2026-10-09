// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VerifiedIdClient } from "@azure/arm-verifiedid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Authority resources by subscription ID
 *
 * @summary list Authority resources by subscription ID
 * x-ms-original-file: 2024-01-26-preview/Authorities_ListBySubscription.json
 */
async function authoritiesListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new VerifiedIdClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorities.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await authoritiesListBySubscription();
}

main().catch(console.error);
