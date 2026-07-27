// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to rotate the specified cluster credential.
 *
 * @summary rotate the specified cluster credential.
 * x-ms-original-file: 2026-05-01-preview/Clusters_RotateCredential.json
 */
async function rotateOneOrMoreManagedCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.rotateCredential("resourceGroupName", "clusterName", {
    credentials: ["BMC Credential"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await rotateOneOrMoreManagedCredentials();
}

main().catch(console.error);
