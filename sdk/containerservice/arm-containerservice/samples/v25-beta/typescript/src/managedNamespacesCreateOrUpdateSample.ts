// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a namespace managed by ARM for the specified managed cluster. Users can configure aspects like resource quotas, network ingress/egress policies, and more. See aka.ms/aks/managed-namespaces for more details.
 *
 * @summary creates or updates a namespace managed by ARM for the specified managed cluster. Users can configure aspects like resource quotas, network ingress/egress policies, and more. See aka.ms/aks/managed-namespaces for more details.
 * x-ms-original-file: 2025-10-02-preview/ManagedNamespacesCreate_Update.json
 */
async function createOrUpdateManagedNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedNamespaces.createOrUpdate(
    "rg1",
    "clustername1",
    "namespace1",
    {
      properties: {
        adoptionPolicy: "IfIdentical",
        annotations: { annatationKey: "annatationValue" },
        defaultNetworkPolicy: { egress: "AllowAll", ingress: "AllowSameNamespace" },
        defaultResourceQuota: {
          cpuLimit: "3m",
          cpuRequest: "3m",
          memoryLimit: "5Gi",
          memoryRequest: "5Gi",
        },
        deletePolicy: "Keep",
        labels: { "kubernetes.io/metadata.name": "true" },
      },
      tags: { tagKey1: "tagValue1" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateManagedNamespace();
}

main().catch(console.error);
