// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list and describe all NetApp elastic accounts in the resource group.
 *
 * @summary list and describe all NetApp elastic accounts in the resource group.
 * x-ms-original-file: 2025-09-01-preview/ElasticAccounts_ListByResourceGroup.json
 */
async function elasticAccountsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticAccounts.listByResourceGroup("myRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await elasticAccountsListByResourceGroup();
}

main().catch(console.error);
