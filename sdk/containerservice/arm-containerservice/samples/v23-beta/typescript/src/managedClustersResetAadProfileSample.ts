// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ManagedClusterAADProfile} from "@azure/arm-containerservice";
import {
  ContainerServiceClient,
} from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to **WARNING**: This API will be deprecated. Please see [AKS-managed Azure Active Directory integration](https://aka.ms/aks-managed-aad) to update your cluster with AKS-managed Azure AD.
 *
 * @summary **WARNING**: This API will be deprecated. Please see [AKS-managed Azure Active Directory integration](https://aka.ms/aks-managed-aad) to update your cluster with AKS-managed Azure AD.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/ManagedClustersResetAADProfile.json
 */
async function resetAadProfile(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const parameters: ManagedClusterAADProfile = {
    clientAppID: "clientappid",
    serverAppID: "serverappid",
    serverAppSecret: "serverappsecret",
    tenantID: "tenantid",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.beginResetAADProfileAndWait(
    resourceGroupName,
    resourceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resetAadProfile();
}

main().catch(console.error);
