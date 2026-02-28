// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to **WARNING**: This API will be deprecated. Please see [AKS-managed Azure Active Directory integration](https://aka.ms/aks-managed-aad) to update your cluster with AKS-managed Azure AD.
 *
 * @summary **WARNING**: This API will be deprecated. Please see [AKS-managed Azure Active Directory integration](https://aka.ms/aks-managed-aad) to update your cluster with AKS-managed Azure AD.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersResetAADProfile.json
 */
async function resetAADProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedClusters.resetAADProfile("rg1", "clustername1", {
    clientAppID: "clientappid",
    serverAppID: "serverappid",
    serverAppSecret: "serverappsecret",
    tenantID: "tenantid",
  });
}

async function main(): Promise<void> {
  await resetAADProfile();
}

main().catch(console.error);
