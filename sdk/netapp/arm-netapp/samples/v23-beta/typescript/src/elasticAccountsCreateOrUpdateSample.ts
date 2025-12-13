// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the specified NetApp Elastic Account within the resource group
 *
 * @summary create or update the specified NetApp Elastic Account within the resource group
 * x-ms-original-file: 2025-09-01-preview/ElasticAccounts_CreateOrUpdate.json
 */
async function elasticAccountsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticAccounts.createOrUpdate("myRG", "account1", {
    location: "eastus",
    tags: { "ac-tag1": "account1" },
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await elasticAccountsCreateOrUpdate();
}

main().catch(console.error);
