// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VerifiedIdClient } from "@azure/arm-verifiedid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Authority resources by resource group
 *
 * @summary list Authority resources by resource group
 * x-ms-original-file: 2024-01-26-preview/Authorities_ListByResourceGroup.json
 */
async function authoritiesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new VerifiedIdClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authorities.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await authoritiesListByResourceGroup();
}

main().catch(console.error);
