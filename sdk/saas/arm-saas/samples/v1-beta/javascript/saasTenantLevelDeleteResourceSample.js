// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a tenant-level SaaS resource.
 *
 * @summary deletes a tenant-level SaaS resource.
 * x-ms-original-file: 2026-04-01/SaasTenantDelete.json
 */
async function deleteATenantLevelSaaSResource() {
  const credential = new DefaultAzureCredential();
  const client = new SaaSClient(credential);
  await client.saasTenantLevel.deleteResource("e24b5b6b-2dfc-41ea-c457-46d0c42494af");
}

async function main() {
  await deleteATenantLevelSaaSResource();
}

main().catch(console.error);
