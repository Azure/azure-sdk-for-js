// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a Azure Arc PrivateLinkScope's validation details for a given machine.
 *
 * @summary returns a Azure Arc PrivateLinkScope's validation details for a given machine.
 * x-ms-original-file: 2025-09-16-preview/privateLinkScope/PrivateLinkScopes_GetValidationForMachine.json
 */
async function privateLinkScopeGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.privateLinkScopes.getValidationDetailsForMachine(
    "my-resource-group",
    "machineName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkScopeGet();
}

main().catch(console.error);
