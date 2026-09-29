// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Traffic Manager health policy.
 *
 * @summary deletes a Traffic Manager health policy.
 * x-ms-original-file: 2026-02-09-preview/HealthPolicies_Delete_MaximumSet_Gen.json
 */
async function healthPoliciesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new NetworkClient(credential, subscriptionId);
  await client.healthPolicies.delete("rgprivateTrafficManager", "myProfile", "myHealthPolicy");
}

async function main(): Promise<void> {
  await healthPoliciesDeleteMaximumSet();
}

main().catch(console.error);
