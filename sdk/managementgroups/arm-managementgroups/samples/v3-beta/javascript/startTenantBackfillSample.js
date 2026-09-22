// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts backfilling subscriptions for the Tenant.
 *
 * @summary starts backfilling subscriptions for the Tenant.
 * x-ms-original-file: 2023-04-01/StartTenantBackfillRequest.json
 */
async function startTenantBackfill() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.startTenantBackfill();
  console.log(result);
}

async function main() {
  await startTenantBackfill();
}

main().catch(console.error);
