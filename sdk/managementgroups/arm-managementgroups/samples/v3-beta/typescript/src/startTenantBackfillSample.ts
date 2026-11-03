// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts backfilling subscriptions for the Tenant.
 *
 * @summary starts backfilling subscriptions for the Tenant.
 * x-ms-original-file: 2023-04-01/StartTenantBackfillRequest.json
 */
async function startTenantBackfill(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.startTenantBackfill();
  console.log(result);
}

async function main(): Promise<void> {
  await startTenantBackfill();
}

main().catch(console.error);
