// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BatchManagementClient } from "@azure/arm-batch";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_AcceleratedNetworking.json
 */
async function createPoolAcceleratedNetworking(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-datacenter-smalldisk",
            version: "latest",
          },
          nodeAgentSkuId: "batch.node.windows amd64",
        },
      },
      networkConfiguration: {
        enableAcceleratedNetworking: true,
        subnetId:
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/rg1234/providers/Microsoft.Network/virtualNetworks/network1234/subnets/subnet123",
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 1, targetLowPriorityNodes: 0 } },
      vmSize: "STANDARD_D1_V2",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_ConfidentialDiskEncryptionSet_ForUserSubscriptionAccounts.json
 */
async function createPoolConfidentialDiskEncryptionSetForUserSubscriptionAccounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      vmSize: "Standard_DC2as_v5",
      taskSchedulingPolicy: { nodeFillType: "Pack" },
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            publisher: "MicrosoftWindowsServer",
            offer: "WindowsServer",
            sku: "2019-datacenter-core-g2",
            version: "latest",
          },
          nodeAgentSkuId: "batch.node.windows amd64",
          securityProfile: {
            securityType: "confidentialVM",
            encryptionAtHost: false,
            uefiSettings: { vTpmEnabled: true, secureBootEnabled: true },
          },
          osDisk: {
            managedDisk: {
              storageAccountType: "Standard_LRS",
              diskEncryptionSet: {
                id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Compute/diskEncryptionSets/DiskEncryptionSetId",
              },
              securityProfile: {
                securityEncryptionType: "DiskWithVMGuestState",
                diskEncryptionSet: {
                  id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Compute/diskEncryptionSets/ConfidentialDiskEncryptionSetId",
                },
              },
            },
          },
          dataDisks: [
            {
              lun: 0,
              diskSizeGB: 1024,
              managedDisk: {
                storageAccountType: "Standard_LRS",
                diskEncryptionSet: {
                  id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Compute/diskEncryptionSets/DiskEncryptionSetId",
                },
              },
            },
          ],
        },
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 1, resizeTimeout: "PT15M" } },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_CustomerManagedKey_ForBatchManagedAccounts.json
 */
async function createPoolCustomerManagedKeyForBatchManagedAccounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      vmSize: "Standard_D4ds_v5",
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            sku: "2022-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          nodeAgentSkuId: "batch.node.windows amd64",
          diskEncryptionConfiguration: {
            targets: ["OsDisk"],
            customerManagedKey: {
              keyUrl: "http://sample.vault.azure.net//keys/cmk/bb60031a6d4545d3a60d3f94588538c9",
              identityReference: {
                resourceId:
                  "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1",
              },
            },
          },
        },
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 1, resizeTimeout: "PT15M" } },
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
            {},
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_DiskEncryptionSet_ForUserSubscriptionAccounts.json
 */
async function createPoolDiskEncryptionSetForUserSubscriptionAccounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      vmSize: "Standard_D4ds_v5",
      taskSchedulingPolicy: { nodeFillType: "Pack" },
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            sku: "2022-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          nodeAgentSkuId: "batch.node.windows amd64",
          securityProfile: { encryptionAtHost: false },
          osDisk: {
            managedDisk: {
              storageAccountType: "Standard_LRS",
              diskEncryptionSet: {
                id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Compute/diskEncryptionSets/DiskEncryptionSetId",
              },
            },
          },
        },
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 1, resizeTimeout: "PT15M" } },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_DualStackNetworking.json
 */
async function createPoolDualStackNetworking(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create("default-azurebatch", "exampleacc", "dualstackpool", {
    vmSize: "Standard_D4ds_v5",
    networkConfiguration: {
      publicIPAddressConfiguration: { ipFamilies: ["IPv4", "IPv6"] },
      endpointConfiguration: {
        inboundNatPools: [
          {
            backendPort: 22,
            frontendPortRangeStart: 40000,
            frontendPortRangeEnd: 40500,
            name: "sshpool",
            protocol: "TCP",
            networkSecurityGroupRules: [
              {
                access: "Allow",
                priority: 1000,
                sourceAddressPrefix: "*",
                sourcePortRanges: ["*"],
              },
            ],
          },
        ],
      },
    },
    deploymentConfiguration: {
      virtualMachineConfiguration: {
        imageReference: { publisher: "Canonical", offer: "ubuntu-24_04-lts", sku: "server" },
        nodeAgentSkuId: "batch.node.ubuntu 24.04",
      },
    },
    scaleSettings: { fixedScale: { targetDedicatedNodes: 1, targetLowPriorityNodes: 0 } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_MinimalVirtualMachineConfiguration.json
 */
async function createPoolMinimalVirtualMachineConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "UbuntuServer",
            publisher: "Canonical",
            sku: "18.04-LTS",
            version: "latest",
          },
          nodeAgentSkuId: "batch.node.ubuntu 18.04",
        },
      },
      scaleSettings: {
        autoScale: { evaluationInterval: "PT5M", formula: "$TargetDedicatedNodes=1" },
      },
      vmSize: "STANDARD_D4",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_NoPublicIPAddresses.json
 */
async function createPoolNoPublicIP(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/networking-group/providers/Microsoft.Compute/galleries/testgallery/images/testimagedef/versions/0.0.1",
          },
          nodeAgentSkuId: "batch.node.ubuntu 18.04",
        },
      },
      networkConfiguration: {
        publicIPAddressConfiguration: { provision: "NoPublicIPAddresses" },
        subnetId:
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/rg1234/providers/Microsoft.Network/virtualNetworks/network1234/subnets/subnet123",
      },
      vmSize: "STANDARD_D4",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_PublicIPs.json
 */
async function createPoolPublicIPs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/networking-group/providers/Microsoft.Compute/galleries/testgallery/images/testimagedef/versions/0.0.1",
          },
          nodeAgentSkuId: "batch.node.ubuntu 18.04",
        },
      },
      networkConfiguration: {
        publicIPAddressConfiguration: {
          ipAddressIds: [
            "/subscriptions/12345678-1234-1234-1234-1234567890121/resourceGroups/rg13/providers/Microsoft.Network/publicIPAddresses/ip135",
          ],
          provision: "UserManaged",
        },
        subnetId:
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/rg1234/providers/Microsoft.Network/virtualNetworks/network1234/subnets/subnet123",
      },
      vmSize: "STANDARD_D4",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_SecurityProfile.json
 */
async function createPoolSecurityProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "UbuntuServer",
            publisher: "Canonical",
            sku: "18_04-lts-gen2",
            version: "latest",
          },
          nodeAgentSkuId: "batch.node.ubuntu 18.04",
          securityProfile: {
            encryptionAtHost: true,
            securityType: "trustedLaunch",
            uefiSettings: { vTpmEnabled: false },
          },
        },
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 1, targetLowPriorityNodes: 0 } },
      vmSize: "Standard_d4s_v3",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_SharedImageGallery.json
 */
async function createPoolCustomImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/networking-group/providers/Microsoft.Compute/galleries/testgallery/images/testimagedef/versions/0.0.1",
          },
          nodeAgentSkuId: "batch.node.ubuntu 18.04",
        },
      },
      vmSize: "STANDARD_D4",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_Tags.json
 */
async function createPoolTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "0001-com-ubuntu-server-jammy",
            publisher: "Canonical",
            sku: "22_04-lts",
            version: "latest",
          },
          nodeAgentSkuId: "batch.node.ubuntu 22.04",
        },
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 1, targetLowPriorityNodes: 0 } },
      vmSize: "Standard_d4s_v3",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_UpgradePolicy.json
 */
async function createPoolUpgradePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2019-datacenter-smalldisk",
            version: "latest",
          },
          nodeAgentSkuId: "batch.node.windows amd64",
          nodePlacementConfiguration: { policy: "Zonal" },
          windowsConfiguration: { enableAutomaticUpdates: false },
        },
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 2, targetLowPriorityNodes: 0 } },
      upgradePolicy: {
        automaticOSUpgradePolicy: {
          disableAutomaticRollback: true,
          enableAutomaticOSUpgrade: true,
          osRollingUpgradeDeferral: true,
          useRollingUpgradePolicy: true,
        },
        mode: "automatic",
        rollingUpgradePolicy: {
          enableCrossZoneUpgrade: true,
          maxBatchInstancePercent: 20,
          maxUnhealthyInstancePercent: 20,
          maxUnhealthyUpgradedInstancePercent: 20,
          pauseTimeBetweenBatches: "PT0S",
          prioritizeUnhealthyInstances: false,
          rollbackFailedInstancesOnPolicyBreach: false,
        },
      },
      vmSize: "Standard_d4s_v3",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_UserAssignedIdentities.json
 */
async function createPoolUserAssignedIdentities(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      identity: {
        type: "UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1":
            {},
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id2":
            {},
        },
      },
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "UbuntuServer",
            publisher: "Canonical",
            sku: "18.04-LTS",
            version: "latest",
          },
          nodeAgentSkuId: "batch.node.ubuntu 18.04",
        },
      },
      scaleSettings: {
        autoScale: { evaluationInterval: "PT5M", formula: "$TargetDedicatedNodes=1" },
      },
      vmSize: "STANDARD_D4",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_VirtualMachineConfiguration.json
 */
async function createPoolFullVirtualMachineConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          dataDisks: [
            {
              caching: "ReadWrite",
              diskSizeGB: 30,
              lun: 0,
              managedDisk: { storageAccountType: "StandardSSD_LRS" },
            },
            {
              caching: "None",
              diskSizeGB: 200,
              lun: 1,
              managedDisk: { storageAccountType: "Premium_LRS" },
            },
          ],
          diskEncryptionConfiguration: { targets: ["OsDisk", "TemporaryDisk"] },
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter-SmallDisk",
            version: "latest",
          },
          licenseType: "Windows_Server",
          nodeAgentSkuId: "batch.node.windows amd64",
          nodePlacementConfiguration: { policy: "Zonal" },
          osDisk: { ephemeralOSDiskSettings: { placement: "CacheDisk" } },
          windowsConfiguration: { enableAutomaticUpdates: false },
        },
      },
      networkConfiguration: {
        endpointConfiguration: {
          inboundNatPools: [
            {
              name: "testnat",
              backendPort: 12001,
              frontendPortRangeEnd: 15100,
              frontendPortRangeStart: 15000,
              networkSecurityGroupRules: [
                {
                  access: "Allow",
                  priority: 150,
                  sourceAddressPrefix: "192.100.12.45",
                  sourcePortRanges: ["1", "2"],
                },
                {
                  access: "Deny",
                  priority: 3500,
                  sourceAddressPrefix: "*",
                  sourcePortRanges: ["*"],
                },
              ],
              protocol: "TCP",
            },
          ],
        },
      },
      scaleSettings: {
        autoScale: { evaluationInterval: "PT5M", formula: "$TargetDedicatedNodes=1" },
      },
      vmSize: "STANDARD_D4",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_VirtualMachineConfiguration_Extensions.json
 */
async function createPoolVirtualMachineConfigurationExtensions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "0001-com-ubuntu-server-focal",
            publisher: "Canonical",
            sku: "20_04-lts",
          },
          nodeAgentSkuId: "batch.node.ubuntu 20.04",
          extensions: [
            {
              name: "batchextension1",
              type: "KeyVaultForLinux",
              autoUpgradeMinorVersion: true,
              enableAutomaticUpgrade: true,
              publisher: "Microsoft.Azure.KeyVault",
              settings: {
                authenticationSettingsKey: "authenticationSettingsValue",
                secretsManagementSettingsKey: "secretsManagementSettingsValue",
              },
              typeHandlerVersion: "2.0",
            },
          ],
        },
      },
      scaleSettings: {
        autoScale: { evaluationInterval: "PT5M", formula: "$TargetDedicatedNodes=1" },
      },
      vmSize: "STANDARD_D4",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_VirtualMachineConfiguration_ManagedOSDisk.json
 */
async function createPoolVirtualMachineConfigurationOSDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "windowsserver",
            publisher: "microsoftwindowsserver",
            sku: "2022-datacenter-smalldisk",
          },
          nodeAgentSkuId: "batch.node.windows amd64",
          osDisk: {
            caching: "ReadWrite",
            diskSizeGB: 100,
            managedDisk: { storageAccountType: "StandardSSD_LRS" },
            writeAcceleratorEnabled: false,
          },
        },
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 1, targetLowPriorityNodes: 0 } },
      vmSize: "Standard_d2s_v3",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new pool inside the specified account.
 *
 * @summary creates a new pool inside the specified account.
 * x-ms-original-file: 2025-06-01/PoolCreate_VirtualMachineConfiguration_ServiceArtifactReference.json
 */
async function createPoolVirtualMachineConfigurationServiceArtifactReference(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.pool.create(
    "default-azurebatch-japaneast",
    "sampleacct",
    "testpool",
    {
      deploymentConfiguration: {
        virtualMachineConfiguration: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2019-datacenter-smalldisk",
            version: "latest",
          },
          nodeAgentSkuId: "batch.node.windows amd64",
          serviceArtifactReference: {
            id: "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/default-azurebatch-japaneast/providers/Microsoft.Compute/galleries/myGallery/serviceArtifacts/myServiceArtifact/vmArtifactsProfiles/vmArtifactsProfile",
          },
          windowsConfiguration: { enableAutomaticUpdates: false },
        },
      },
      scaleSettings: { fixedScale: { targetDedicatedNodes: 2, targetLowPriorityNodes: 0 } },
      upgradePolicy: {
        automaticOSUpgradePolicy: { enableAutomaticOSUpgrade: true },
        mode: "automatic",
      },
      vmSize: "Standard_d4s_v3",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createPoolAcceleratedNetworking();
  await createPoolConfidentialDiskEncryptionSetForUserSubscriptionAccounts();
  await createPoolCustomerManagedKeyForBatchManagedAccounts();
  await createPoolDiskEncryptionSetForUserSubscriptionAccounts();
  await createPoolDualStackNetworking();
  await createPoolMinimalVirtualMachineConfiguration();
  await createPoolNoPublicIP();
  await createPoolPublicIPs();
  await createPoolSecurityProfile();
  await createPoolCustomImage();
  await createPoolTags();
  await createPoolUpgradePolicy();
  await createPoolUserAssignedIdentities();
  await createPoolFullVirtualMachineConfiguration();
  await createPoolVirtualMachineConfigurationExtensions();
  await createPoolVirtualMachineConfigurationOSDisk();
  await createPoolVirtualMachineConfigurationServiceArtifactReference();
}

main().catch(console.error);
