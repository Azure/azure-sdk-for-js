// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specific project policy.
 *
 * @summary gets a specific project policy.
 * x-ms-original-file: 2026-01-01-preview/ProjectPolicies_Get.json
 */
async function projectPoliciesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58ffff1";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectPolicies.get("rg1", "Contoso", "DevOnlyResources");
  console.log(result);
}

async function main(): Promise<void> {
  await projectPoliciesGet();
}

main().catch(console.error);
