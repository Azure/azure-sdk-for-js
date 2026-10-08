// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PrivateTrafficManagerManagementClient } from "@azure/arm-privatetrafficmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Private Traffic Manager endpoint.
 *
 * @summary deletes a Private Traffic Manager endpoint.
 * x-ms-original-file: 2026-02-09-preview/Endpoints_Delete_MaximumSet_Gen.json
 */
async function endpointsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "10B6D88D-ADF4-4281-B3D0-B5A6702DEEDA";
  const client = new PrivateTrafficManagerManagementClient(credential, subscriptionId);
  await client.endpoints.delete("rgprivateTrafficManager", "myProfile", "myEndpoint");
}

async function main(): Promise<void> {
  await endpointsDeleteMaximumSet();
}

main().catch(console.error);
