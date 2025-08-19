// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Starts backfilling subscriptions for the Tenant.
 *
 * @summary Starts backfilling subscriptions for the Tenant.
 * x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/StartTenantBackfillRequest.json
 */
async function startTenantBackfill(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.startTenantBackfill();
  console.log(result);
}

startTenantBackfill().catch(console.error);
