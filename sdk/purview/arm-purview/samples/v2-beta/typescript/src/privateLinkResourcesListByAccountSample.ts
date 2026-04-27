// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PurviewManagementClient } from "@azure/arm-purview";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of privately linkable resources for an account
 *
 * @summary gets a list of privately linkable resources for an account
 * x-ms-original-file: 2024-04-01-preview/PrivateLinkResources_ListByAccount.json
 */
async function privateLinkResourcesListByAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-12345678abc";
  const client = new PurviewManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.listByAccount(
    "SampleResourceGroup",
    "account1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateLinkResourcesListByAccount();
}

main().catch(console.error);
