// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an project policy.
 *
 * @summary deletes an project policy.
 * x-ms-original-file: 2026-01-01-preview/ProjectPolicies_Delete.json
 */
async function projectPoliciesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58ffff1";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projectPolicies.delete("rg1", "Contoso", "DevOnlyResources");
}

async function main(): Promise<void> {
  await projectPoliciesDelete();
}

main().catch(console.error);
