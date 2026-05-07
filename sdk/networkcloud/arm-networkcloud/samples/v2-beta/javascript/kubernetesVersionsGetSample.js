// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the Kubernetes version resource that describes the available Kubernetes versions for deployment.
 *
 * @summary retrieve the Kubernetes version resource that describes the available Kubernetes versions for deployment.
 * x-ms-original-file: 2026-05-01-preview/KubernetesVersions_Get.json
 */
async function getKubernetesVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesVersions.get("resourceGroupName", "default");
  console.log(result);
}

async function main() {
  await getKubernetesVersions();
}

main().catch(console.error);
