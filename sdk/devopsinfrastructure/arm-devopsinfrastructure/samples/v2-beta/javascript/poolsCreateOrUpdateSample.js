// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevOpsInfrastructureClient } = require("@azure/arm-devopsinfrastructure");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Pool
 *
 * @summary create a Pool
 * x-ms-original-file: 2026-07-03-preview/CreateOrUpdatePool.json
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
        description: "Managed by Managed DevOps Pools",
        updateDescription: true,
        organizations: [{ url: "https://mseng.visualstudio.com", openAccess: true }],
      },
      agentProfile: { kind: "Stateless" },
      fabricProfile: {
        kind: "Vmss",
        sku: { name: "Standard_D4ads_v5" },
        images: [
          {
            resourceId: "/MicrosoftWindowsServer/WindowsServer/2019-Datacenter/latest",
            ephemeralType: "NVMeDisk",
            provisioningScriptStorageAccountResourceId:
              "/subscriptions/a2e95d27-c161-4b61-bda4-11512c14c2c2/resourceGroups/rg/providers/Microsoft.Storage/storageAccounts/provisioningscriptsa",
            provisioningScriptManagedIdentityClientId: "0f8fad5b-d9cb-469f-a165-70867728950e",
            provisioningScriptShouldRestart: true,
            provisioningScriptEntryPoint: "scripts/setup-agent.ps1",
          },
        ],
        osProfile: {
          secretsManagementSettings: {
            certificateStoreName: "Root",
            observedCertificates: ["https://abc.vault.azure.net/secrets/one"],
            keyExportable: false,
          },
        },
        networkProfile: {
          subnetId:
            "/subscriptions/a2e95d27-c161-4b61-bda4-11512c14c2c2/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/subnet",
          staticIpAddressCount: 2,
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a Pool
 *
 * @summary create a Pool
 * x-ms-original-file: 2026-07-03-preview/CreateOrUpdatePool_InstanceMix.json
 */
async function poolsCreateOrUpdateInstanceMix() {
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
        description: "Managed by Managed DevOps Pools",
        updateDescription: true,
        organizations: [{ url: "https://mseng.visualstudio.com", openAccess: true }],
      },
      agentProfile: { kind: "Stateless" },
      fabricProfile: {
        kind: "Vmss",
        sku: {
          name: "Mix",
          vmSizes: [{ name: "Standard_E2ads_v5" }, { name: "Standard_D2ads_v5" }],
        },
        images: [
          {
            resourceId: "/MicrosoftWindowsServer/WindowsServer/2019-Datacenter/latest",
            ephemeralType: "Automatic",
            provisioningScriptStorageAccountResourceId:
              "/subscriptions/a2e95d27-c161-4b61-bda4-11512c14c2c2/resourceGroups/rg/providers/Microsoft.Storage/storageAccounts/provisioningscriptsa",
            provisioningScriptManagedIdentityClientId: "0f8fad5b-d9cb-469f-a165-70867728950e",
            provisioningScriptShouldRestart: true,
            provisioningScriptEntryPoint: "scripts/setup-agent.ps1",
          },
        ],
        osProfile: {
          secretsManagementSettings: {
            certificateStoreName: "Root",
            observedCertificates: ["https://abc.vault.azure.net/secrets/one"],
            keyExportable: false,
          },
        },
        networkProfile: {
          subnetId:
            "/subscriptions/a2e95d27-c161-4b61-bda4-11512c14c2c2/resourceGroups/rg/providers/Microsoft.Network/virtualNetworks/vnet/subnets/subnet",
          staticIpAddressCount: 2,
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await poolsCreateOrUpdate();
  await poolsCreateOrUpdateInstanceMix();
}

main().catch(console.error);
