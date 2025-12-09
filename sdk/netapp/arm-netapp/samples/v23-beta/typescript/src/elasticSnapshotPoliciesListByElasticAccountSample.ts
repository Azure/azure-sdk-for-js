// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ElasticSnapshotPolicy resources by ElasticAccount
 *
 * @summary list ElasticSnapshotPolicy resources by ElasticAccount
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshotPolicies_ListByElasticAccount.json
 */
async function elasticSnapshotPoliciesListByElasticAccount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticSnapshotPolicies.listByElasticAccount(
    "myRG",
    "account1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await elasticSnapshotPoliciesListByElasticAccount();
}

main().catch(console.error);
