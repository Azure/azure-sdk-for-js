// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of SAP supported SKUs for ASCS, Application and Database tier.
 *
 * @summary get a list of SAP supported SKUs for ASCS, Application and Database tier.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeSapSupportedSku_Distributed.json
 */
async function sapSupportedSKUsForDistributedNonHAEnvironment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.getSapSupportedSku("centralus", {
    appLocation: "eastus",
    sapProduct: "S4HANA",
    environment: "Prod",
    databaseType: "HANA",
    deploymentType: "ThreeTier",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get a list of SAP supported SKUs for ASCS, Application and Database tier.
 *
 * @summary get a list of SAP supported SKUs for ASCS, Application and Database tier.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeSapSupportedSku_DistributedHA_AvSet.json
 */
async function sapSupportedSKUsForDistributedHAEnvironmentWithAvailabilitySet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.getSapSupportedSku("centralus", {
    appLocation: "eastus",
    sapProduct: "S4HANA",
    environment: "Prod",
    databaseType: "HANA",
    deploymentType: "ThreeTier",
    highAvailabilityType: "AvailabilitySet",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get a list of SAP supported SKUs for ASCS, Application and Database tier.
 *
 * @summary get a list of SAP supported SKUs for ASCS, Application and Database tier.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeSapSupportedSku_DistributedHA_AvZone.json
 */
async function sapSupportedSkusForHAWithAvailabilityZone(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.getSapSupportedSku("centralus", {
    appLocation: "eastus",
    sapProduct: "S4HANA",
    environment: "Prod",
    databaseType: "HANA",
    deploymentType: "ThreeTier",
    highAvailabilityType: "AvailabilityZone",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get a list of SAP supported SKUs for ASCS, Application and Database tier.
 *
 * @summary get a list of SAP supported SKUs for ASCS, Application and Database tier.
 * x-ms-original-file: 2024-09-01/SapVirtualInstances_InvokeSapSupportedSku_SingleServer.json
 */
async function sapSupportedSKUsForSingleServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8e17e36c-42e9-4cd5-a078-7b44883414e0";
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.sapVirtualInstances.getSapSupportedSku("centralus", {
    appLocation: "eastus",
    sapProduct: "S4HANA",
    environment: "NonProd",
    databaseType: "HANA",
    deploymentType: "SingleServer",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await sapSupportedSKUsForDistributedNonHAEnvironment();
  await sapSupportedSKUsForDistributedHAEnvironmentWithAvailabilitySet();
  await sapSupportedSkusForHAWithAvailabilityZone();
  await sapSupportedSKUsForSingleServer();
}

main().catch(console.error);
