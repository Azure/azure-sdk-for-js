// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevOpsInfrastructureClient } from "@azure/arm-devopsinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Pool
 *
 * @summary create a Pool
 * x-ms-original-file: 2024-10-19/CreateOrUpdatePool.json
 */
async function poolsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a2e95d27-c161-4b61-bda4-11512c14c2c2";
  const client = new DevOpsInfrastructureClient(credential, subscriptionId);
  const result = await client.pools.createOrUpdate("rg", "pool", {
    location: "eastus",
    properties: {
      provisioningState: "Succeeded",
      maximumConcurrency: 10,
      devCenterProjectResourceId:
        "/subscriptions/222e81d0-cf38-4dab-baa5-289bf16baaa4/resourceGroups/rg-1es-devcenter/providers/Microsoft.DevCenter/projects/1ES",
      organizationProfile: {
        kind: "AzureDevOps",
        organizations: [{ url: "https://mseng.visualstudio.com" }],
      },
      agentProfile: { kind: "Stateless" },
      fabricProfile: {
        kind: "Vmss",
        sku: { name: "Standard_D4ads_v5" },
        images: [
          {
            resourceId:
              "/MicrosoftWindowsServer/WindowsServer/2019-Datacenter/latest",
          },
        ],
      },
    },
  });
  console.log(result);
}

async function main() {
  poolsCreateOrUpdate();
}

main().catch(console.error);
