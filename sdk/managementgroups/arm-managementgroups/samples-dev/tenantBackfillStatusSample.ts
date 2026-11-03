// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets tenant backfill status
 *
 * @summary gets tenant backfill status
 * x-ms-original-file: 2023-04-01/TenantBackfillStatusRequest.json
 */
async function tenantBackfillStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.tenantBackfillStatus();
  console.log(result);
}

async function main(): Promise<void> {
  await tenantBackfillStatus();
}

main().catch(console.error);
