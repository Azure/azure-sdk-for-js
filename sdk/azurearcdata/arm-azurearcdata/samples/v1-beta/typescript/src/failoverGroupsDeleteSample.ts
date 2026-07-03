// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a failover group resource
 *
 * @summary deletes a failover group resource
 * x-ms-original-file: 2026-03-01-preview/DeleteFailoverGroup.json
 */
async function deletesAFailoverGroupInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.failoverGroups.delete("testrg", "testSqlManagedInstance", "testFailoverGroupName");
}

async function main(): Promise<void> {
  await deletesAFailoverGroupInstance();
}

main().catch(console.error);
