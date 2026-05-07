// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update tags associated with the Kubernetes version resource. No other properties are supported for update.
 *
 * @summary update tags associated with the Kubernetes version resource. No other properties are supported for update.
 * x-ms-original-file: 2026-05-01-preview/KubernetesVersions_UpdateTags.json
 */
async function patchKubernetesVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesVersions.update("resourceGroupName", "default", {
    kubernetesVersionPatchParameters: { tags: { key1: "myvalue1", key2: "myvalue2" } },
  });
  console.log(result);
}

async function main() {
  await patchKubernetesVersions();
}

main().catch(console.error);
