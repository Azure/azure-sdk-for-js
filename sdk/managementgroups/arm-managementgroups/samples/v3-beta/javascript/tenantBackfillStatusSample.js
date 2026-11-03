// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets tenant backfill status
 *
 * @summary gets tenant backfill status
 * x-ms-original-file: 2023-04-01/TenantBackfillStatusRequest.json
 */
async function tenantBackfillStatus() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.tenantBackfillStatus();
  console.log(result);
}

async function main() {
  await tenantBackfillStatus();
}

main().catch(console.error);
