// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates mutable properties or tags on an existing tenant-level SaaS resource.
 *
 * @summary updates mutable properties or tags on an existing tenant-level SaaS resource.
 * x-ms-original-file: 2026-04-01/SaasTenantPatch.json
 */
async function updateATenantLevelSaaSResource() {
  const credential = new DefaultAzureCredential();
  const client = new SaaSClient(credential);
  const result = await client.saasTenantLevel.updateResource(
    "e24b5b6b-2dfc-41ea-c457-46d0c42494af",
    { properties: { productCode: "0007150b-0000-0160-2654-64a36bcef7ba", intent: "Retain" } },
  );
  console.log(result);
}

async function main() {
  await updateATenantLevelSaaSResource();
}

main().catch(console.error);
