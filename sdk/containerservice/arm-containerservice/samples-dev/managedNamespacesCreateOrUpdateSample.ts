// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a managed namespace in the specified managed cluster.
 *
 * @summary Creates or updates a managed namespace in the specified managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-05-02-preview/examples/ManagedNamespacesCreate_Update.json
 */

import type {
  ManagedNamespace} from "@azure/arm-containerservice";
import {
  ContainerServiceClient,
} from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateManagedNamespace(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const managedNamespaceName = "namespace1";
  const parameters: ManagedNamespace = {
    properties: {
      adoptionPolicy: "IfIdentical",
      annotations: { annatationKey: "annatationValue" },
      defaultNetworkPolicy: {
        egress: "AllowAll",
        ingress: "AllowSameNamespace",
      },
      defaultResourceQuota: {
        cpuLimit: "3m",
        cpuRequest: "3m",
        memoryLimit: "5Gi",
        memoryRequest: "5Gi",
      },
      deletePolicy: "Keep",
      labels: { "kubernetesIo/metadataName": "true" },
    },
    tags: { tagKey1: "tagValue1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedNamespaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    managedNamespaceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateManagedNamespace();
}

main().catch(console.error);
