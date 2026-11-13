// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to attaches an existing AKS cluster to the account, or updates its attachment.
 * A 202 response contains the current attachment; poll GET and inspect
 * properties.status.stage for progress. A 200 response also contains the
 * current attachment state and does not by itself guarantee workload readiness.
 *
 * @summary attaches an existing AKS cluster to the account, or updates its attachment.
 * A 202 response contains the current attachment; poll GET and inspect
 * properties.status.stage for progress. A 200 response also contains the
 * current attachment state and does not by itself guarantee workload readiness.
 * x-ms-original-file: 2026-11-15-preview/CreateOrUpdateAttachedAksCluster.json
 */
async function createOrUpdateAttachedAksCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.attachedAksClusters.createOrUpdate(
    "rgcognitiveservices",
    "myAccount",
    "myAttachment",
    {
      properties: {
        clusterResourceId:
          "/subscriptions/11111111-2222-3333-4444-555555555555/resourceGroups/rgaks/providers/Microsoft.ContainerService/managedClusters/myAks",
        capabilities: ["foundryNative", "kuberay"],
        extensionProfile: {
          version: "1.0.0",
          releaseTrain: "stable",
          configuration: { rayVersion: "2.52.0" },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAttachedAksCluster();
}

main().catch(console.error);
