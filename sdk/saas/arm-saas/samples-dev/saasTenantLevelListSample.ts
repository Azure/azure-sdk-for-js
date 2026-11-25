// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all tenant-level SaaS resources accessible to the caller.
 *
 * @summary lists all tenant-level SaaS resources accessible to the caller.
 * x-ms-original-file: 2026-04-01/SaasTenantList.json
 */
async function listTenantLevelSaaSResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SaaSClient(credential);
  const resArray = new Array();
  for await (const item of client.saasTenantLevel.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTenantLevelSaaSResources();
}

main().catch(console.error);
