// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Appliance in the specified Subscription and Resource Group.
 *
 * @summary creates or updates an Appliance in the specified Subscription and Resource Group.
 * x-ms-original-file: 2025-03-01-preview/AppliancesCreate_Update.json
 */
async function createOrUpdateAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.createOrUpdate("testresourcegroup", "appliance01", {
    location: "West US",
    properties: {
      distro: "AKSEdge",
      infrastructureConfig: { provider: "VMWare" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an Appliance in the specified Subscription and Resource Group.
 *
 * @summary creates or updates an Appliance in the specified Subscription and Resource Group.
 * x-ms-original-file: 2025-03-01-preview/AppliancesUpdateProxy.json
 */
async function updateApplianceProxyConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.createOrUpdate("testresourcegroup", "appliance01", {
    location: "West US",
    properties: {
      distro: "AKSEdge",
      publicKey: "xxxxxxxx",
      infrastructureConfig: { provider: "VMWare" },
      networkProfile: { proxyConfiguration: { version: "latest" } },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAppliance();
  await updateApplianceProxyConfiguration();
}

main().catch(console.error);
