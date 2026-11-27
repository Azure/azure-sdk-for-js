// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a tenant-level SaaS resource by its identifier.
 *
 * @summary gets a tenant-level SaaS resource by its identifier.
 * x-ms-original-file: 2026-04-01/SaasTenantGet.json
 */
async function getATenantLevelSaaSResource() {
  const credential = new DefaultAzureCredential();
  const client = new SaaSClient(credential);
  const result = await client.saasTenantLevel.getResource("e24b5b6b-2dfc-41ea-c457-46d0c42494af");
  console.log(result);
}

async function main() {
  await getATenantLevelSaaSResource();
}

main().catch(console.error);
