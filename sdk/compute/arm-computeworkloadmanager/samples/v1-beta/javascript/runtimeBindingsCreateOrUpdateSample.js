// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a runtime binding.
 *
 * @summary creates or replaces a runtime binding.
 * x-ms-original-file: 2026-11-01-preview/RuntimeBindings_CreateOrUpdate_ManagedKubernetes.json
 */
async function createAManagedKubernetesRuntimeBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeBindings.createOrUpdate(
    "rg-workload",
    "managed-agents-prod",
    "kubernetes-default",
    {
      location: "eastus2",
      kind: "Kubernetes",
      properties: { provisioningMode: "Managed", managedProfile: { offering: "Automatic" } },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or replaces a runtime binding.
 *
 * @summary creates or replaces a runtime binding.
 * x-ms-original-file: 2026-11-01-preview/RuntimeBindings_CreateOrUpdate_ManagedServerless.json
 */
async function createAManagedServerlessContainerRuntimeBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeBindings.createOrUpdate(
    "rg-workload",
    "managed-agents-prod",
    "serverless-default",
    {
      location: "eastus2",
      kind: "ServerlessContainers",
      properties: {
        provisioningMode: "Managed",
        managedProfile: { provider: "ACI" },
        identityProfile: {
          executionIdentity: { provisioningMode: "ServiceManaged", scope: "SandboxGroup" },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or replaces a runtime binding.
 *
 * @summary creates or replaces a runtime binding.
 * x-ms-original-file: 2026-11-01-preview/RuntimeBindings_CreateOrUpdate_ReferencedKubernetes.json
 */
async function attachAReferencedKubernetesRuntimeBinding() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeBindings.createOrUpdate(
    "rg-workload",
    "managed-agents-prod",
    "customer-aks",
    {
      location: "eastus2",
      kind: "Kubernetes",
      properties: {
        provisioningMode: "Referenced",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/aks-rg/providers/Microsoft.ContainerService/managedClusters/aks-prod",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createAManagedKubernetesRuntimeBinding();
  await createAManagedServerlessContainerRuntimeBinding();
  await attachAReferencedKubernetesRuntimeBinding();
}

main().catch(console.error);
