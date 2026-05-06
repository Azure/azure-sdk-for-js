// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified Kubernetes version resource.
 *
 * @summary delete the specified Kubernetes version resource.
 * x-ms-original-file: 2026-05-01-preview/KubernetesVersions_Delete.json
 */
async function deleteKubernetesVersions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.kubernetesVersions.delete("resourceGroupName", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await deleteKubernetesVersions();
}

main().catch(console.error);
