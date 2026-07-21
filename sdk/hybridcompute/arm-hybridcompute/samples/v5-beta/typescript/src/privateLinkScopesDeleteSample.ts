// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Azure Arc PrivateLinkScope.
 *
 * @summary deletes a Azure Arc PrivateLinkScope.
 * x-ms-original-file: 2025-09-16-preview/privateLinkScope/PrivateLinkScopes_Delete.json
 */
async function privateLinkScopesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.privateLinkScopes.delete("my-resource-group", "my-privatelinkscope");
}

async function main(): Promise<void> {
  await privateLinkScopesDelete();
}

main().catch(console.error);
