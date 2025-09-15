// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DisconnectedOperationsManagementClient } from "@azure/arm-disconnectedoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get deployment manifest.
 *
 * @summary get deployment manifest.
 * x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_ListDeploymentManifest_MaximumSet_Gen.json
 */
async function disconnectedOperationsListDeploymentManifest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "301DCB09-82EC-4777-A56C-6FFF26BCC814";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.disconnectedOperations.listDeploymentManifest(
    "rgdisconnectedoperations",
    "demo-resource",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disconnectedOperationsListDeploymentManifest();
}

main().catch(console.error);
