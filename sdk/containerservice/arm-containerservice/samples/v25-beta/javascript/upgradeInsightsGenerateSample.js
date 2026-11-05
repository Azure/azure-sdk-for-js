// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 *
 * @summary generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 * x-ms-original-file: 2026-08-02-preview/ManagedClustersGenerateUpgradeInsights_AgentPool.json
 */
async function generateASingleAgentPoolKubernetesVersionUpgradeInsight() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.upgradeInsights.generate("rg1", "clustername1", {
    upgradeType: "AgentPool",
    agentPoolName: "nodepool1",
    targetKubernetesVersion: "1.33.5",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 *
 * @summary generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 * x-ms-original-file: 2026-08-02-preview/ManagedClustersGenerateUpgradeInsights_ControlPlane.json
 */
async function generateAControlPlaneUpgradeInsight() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.upgradeInsights.generate("rg1", "clustername1", {
    upgradeType: "ControlPlane",
    targetKubernetesVersion: "1.33.5",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 *
 * @summary generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 * x-ms-original-file: 2026-08-02-preview/ManagedClustersGenerateUpgradeInsights_ControlPlaneAndAgentPools.json
 */
async function generateACombinedControlPlaneAndAgentPoolsUpgradeInsight() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.upgradeInsights.generate("rg1", "clustername1", {
    upgradeType: "ControlPlaneAndAgentPools",
    targetKubernetesVersion: "1.33.5",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 *
 * @summary generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 * x-ms-original-file: 2026-08-02-preview/ManagedClustersGenerateUpgradeInsights_NodeImage.json
 */
async function generateANodeOSImageUpgradeInsight() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.upgradeInsights.generate("rg1", "clustername1", {
    upgradeType: "NodeImage",
    agentPoolName: "nodepool1",
    targetNodeImageVersion: "AKSUbuntu-2204gen2-202607.01.0",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 *
 * @summary generates (or refreshes) an upgrade readiness evaluation for the managed cluster.
 * The requested scope and target version(s) are supplied in the request body; the
 * server runs the readiness checks — the control plane Kubernetes version upgrade, a
 * single agent pool Kubernetes version upgrade, a single agent pool node OS image
 * upgrade, or the combined control plane and agent pools upgrade — persists the result
 * as an UpgradeInsight resource with a server-generated name, and returns that
 * resource. The response body is identical to a subsequent GET of the resource.
 * x-ms-original-file: 2026-08-02-preview/ManagedClustersGenerateUpgradeInsights_NodeImageLatest.json
 */
async function generateANodeOSImageUpgradeInsightUsingTheLatestAvailableImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.upgradeInsights.generate("rg1", "clustername1", {
    upgradeType: "NodeImage",
    agentPoolName: "nodepool1",
  });
  console.log(result);
}

async function main() {
  await generateASingleAgentPoolKubernetesVersionUpgradeInsight();
  await generateAControlPlaneUpgradeInsight();
  await generateACombinedControlPlaneAndAgentPoolsUpgradeInsight();
  await generateANodeOSImageUpgradeInsight();
  await generateANodeOSImageUpgradeInsightUsingTheLatestAvailableImage();
}

main().catch(console.error);
