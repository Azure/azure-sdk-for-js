// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates a publisher access token for a tenant-level SaaS resource.
 *
 * @summary generates a publisher access token for a tenant-level SaaS resource.
 * x-ms-original-file: 2026-04-01/SaasTenantListAccessToken.json
 */
async function listAccessTokenForATenantLevelSaaSResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SaaSClient(credential);
  const result = await client.saasTenantLevel.listAccessToken(
    "e24b5b6b-2dfc-41ea-c457-46d0c42494af",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listAccessTokenForATenantLevelSaaSResource();
}

main().catch(console.error);
