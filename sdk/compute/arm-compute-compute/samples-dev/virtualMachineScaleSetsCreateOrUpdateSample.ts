// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_CreateA_WithDiffOsDiskUsingDiffDiskPlacement.json
 */
async function createAScaleSetWithEphemeralOsDisksUsingPlacementProperty(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_DS1_v2" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "windows2016",
            publisher: "microsoft-ads",
            version: "latest",
            offer: "windows-data-science-vm",
          },
          osDisk: {
            caching: "ReadOnly",
            diffDiskSettings: { option: "Local", placement: "ResourceDisk" },
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_CreateA_WithDiffOsDiskUsingDiffDiskPlacementAsNvmeDisk.json
 */
async function createAScaleSetWithEphemeralOsDiskProvisioningInNvmeDiskUsingPlacementProperty(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_DS1_v2" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "windows2016",
            publisher: "microsoft-ads",
            version: "latest",
            offer: "windows-data-science-vm",
          },
          osDisk: {
            caching: "ReadOnly",
            diffDiskSettings: { option: "Local", placement: "NvmeDisk" },
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_CustomImageFromAnUnmanagedGeneralizedOsImage.json
 */
async function createACustomImageScaleSetFromAnUnmanagedGeneralizedOsImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          osDisk: {
            caching: "ReadWrite",
            image: {
              uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/{existing-generalized-os-image-blob-name}.vhd",
            },
            createOption: "FromImage",
            name: "osDisk",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_FromACustomImage.json
 */
async function createAScaleSetFromACustomImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/images/{existing-custom-image-name}",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_FromAGeneralizedSharedImage.json
 */
async function createAScaleSetFromAGeneralizedSharedImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/galleries/mySharedGallery/images/mySharedImage",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_FromASpecializedSharedImage.json
 */
async function createAScaleSetFromASpecializedSharedImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/galleries/mySharedGallery/images/mySharedImage",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_FromWithDisableTcpStateTrackingNetworkInterface.json
 */
async function createAScaleSetWhereNicConfigHasDisableTcpStateTrackingProperty(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/images/{existing-custom-image-name}",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{nicConfig1-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                disableTcpStateTracking: true,
                enableAcceleratedNetworking: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
            {
              name: "{nicConfig2-name}",
              properties: {
                primary: false,
                enableAcceleratedNetworking: false,
                enableIPForwarding: false,
                disableTcpStateTracking: false,
                ipConfigurations: [
                  {
                    name: "{nicConfig2-name}",
                    properties: {
                      primary: true,
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-fpga-subnet-name2}",
                      },
                      privateIPAddressVersion: "IPv4",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_FromWithFpgaNetworkInterface.json
 */
async function createAScaleSetWithFpgaNetworkInterfaces(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/images/{existing-custom-image-name}",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
            {
              name: "{fpgaNic-Name}",
              properties: {
                primary: false,
                enableAcceleratedNetworking: false,
                enableIPForwarding: false,
                enableFpga: true,
                ipConfigurations: [
                  {
                    name: "{fpgaNic-Name}",
                    properties: {
                      primary: true,
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-fpga-subnet-name}",
                      },
                      privateIPAddressVersion: "IPv4",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_FromWithNetworkInterfaceWithDnsSettings.json
 */
async function createAScaleSetWithNetworkInterfacesWithPublicIpAddressDnsSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/images/{existing-custom-image-name}",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{nicConfig1-name}",
              tags: { nicTag: "tag" },
              properties: {
                primary: true,
                enableIPForwarding: true,
                disableTcpStateTracking: true,
                enableAcceleratedNetworking: true,
                auxiliaryMode: "AcceleratedConnections",
                auxiliarySku: "A1",
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
            {
              name: "{nicConfig2-name}",
              properties: {
                primary: false,
                enableAcceleratedNetworking: false,
                enableIPForwarding: false,
                disableTcpStateTracking: false,
                ipConfigurations: [
                  {
                    name: "{nicConfig2-name}",
                    properties: {
                      primary: true,
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-fpga-subnet-name2}",
                      },
                      privateIPAddressVersion: "IPv4",
                      publicIPAddressConfiguration: {
                        name: "publicip",
                        tags: { pipTag: "tag" },
                        properties: {
                          idleTimeoutInMinutes: 10,
                          dnsSettings: {
                            domainNameLabel: "vmsstestlabel01",
                            domainNameLabelScope: "NoReuse",
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_PlatformImageWithUnmanagedOsDisks.json
 */
async function createAPlatformImageScaleSetWithUnmanagedOsDisks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            createOption: "FromImage",
            name: "osDisk",
            vhdContainers: [
              "http://{existing-storage-account-name-0}.blob.core.windows.net/vhdContainer",
              "http://{existing-storage-account-name-1}.blob.core.windows.net/vhdContainer",
              "http://{existing-storage-account-name-2}.blob.core.windows.net/vhdContainer",
              "http://{existing-storage-account-name-3}.blob.core.windows.net/vhdContainer",
              "http://{existing-storage-account-name-4}.blob.core.windows.net/vhdContainer",
            ],
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithAMarketplaceImagePlan.json
 */
async function createAScaleSetWithAMarketplaceImagePlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "windows2016",
            publisher: "microsoft-ads",
            version: "latest",
            offer: "windows-data-science-vm",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithApplicationProfile.json
 */
async function createAScaleSetWithApplicationProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        applicationProfile: {
          galleryApplications: [
            {
              tags: "myTag1",
              order: 1,
              packageReferenceId:
                "/subscriptions/32c17a9e-aa7b-4ba5-a45b-e324116b6fdb/resourceGroups/myresourceGroupName2/providers/Microsoft.Compute/galleries/myGallery1/applications/MyApplication1/versions/1.0",
              configurationReference:
                "https://mystorageaccount.blob.core.windows.net/configurations/settings.config",
              treatFailureAsDeploymentFailure: true,
              enableAutomaticUpgrade: false,
            },
            {
              packageReferenceId:
                "/subscriptions/32c17a9e-aa7b-4ba5-a45b-e324116b6fdg/resourceGroups/myresourceGroupName3/providers/Microsoft.Compute/galleries/myGallery2/applications/MyApplication2/versions/1.1",
            },
          ],
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithAutomaticRepairs.json
 */
async function createAScaleSetWithAutomaticRepairsEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
      scheduledEventsPolicy: {
        scheduledEventsAdditionalPublishingTargets: {
          eventGridAndResourceGraph: {
            enable: true,
            scheduledEventsApiVersion: "2020-07-01",
          },
        },
        userInitiatedRedeploy: { automaticallyApprove: true },
        userInitiatedReboot: { automaticallyApprove: true },
        allInstancesDown: { automaticallyApprove: true },
      },
      automaticRepairsPolicy: { enabled: true, gracePeriod: "PT10M" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithAutomaticZoneRebalancingPolicy.json
 */
async function createAScaleSetWithAutomaticZoneRebalancingEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: false,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
      resiliencyPolicy: {
        automaticZoneRebalancingPolicy: {
          enabled: true,
          rebalanceStrategy: "Recreate",
          rebalanceBehavior: "CreateBeforeDelete",
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithAzureApplicationGateway.json
 */
async function createAScaleSetWithAnAzureApplicationGateway(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      applicationGatewayBackendAddressPools: [
                        {
                          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/applicationGateways/{existing-application-gateway-name}/backendAddressPools/{existing-backend-address-pool-name}",
                        },
                      ],
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithAzureLoadBalancer.json
 */
async function createAScaleSetWithAnAzureLoadBalancer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                      publicIPAddressConfiguration: {
                        name: "{vmss-name}",
                        properties: { publicIPAddressVersion: "IPv4" },
                      },
                      loadBalancerInboundNatPools: [
                        {
                          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/loadBalancers/{existing-load-balancer-name}/inboundNatPools/{existing-nat-pool-name}",
                        },
                      ],
                      loadBalancerBackendAddressPools: [
                        {
                          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/loadBalancers/{existing-load-balancer-name}/backendAddressPools/{existing-backend-address-pool-name}",
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithBootDiagnostics.json
 */
async function createAScaleSetWithBootDiagnostics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        diagnosticsProfile: {
          bootDiagnostics: {
            storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
            enabled: true,
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithCapacityReservation.json
 */
async function createOrUpdateAScaleSetWithCapacityReservation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_DS1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        capacityReservation: {
          capacityReservationGroup: {
            id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/CapacityReservationGroups/{crgName}",
          },
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithDiffOsDisk.json
 */
async function createAScaleSetWithEphemeralOsDisks(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_DS1_v2" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "windows2016",
            publisher: "microsoft-ads",
            version: "latest",
            offer: "windows-data-science-vm",
          },
          osDisk: {
            caching: "ReadOnly",
            diffDiskSettings: { option: "Local" },
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithDiskControllerType.json
 */
async function createAScaleSetWithDiskControllerType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      upgradePolicy: { mode: "Manual" },
      scheduledEventsPolicy: {
        scheduledEventsAdditionalPublishingTargets: {
          eventGridAndResourceGraph: {
            enable: true,
            scheduledEventsApiVersion: "2020-07-01",
          },
        },
        userInitiatedRedeploy: { automaticallyApprove: true },
        userInitiatedReboot: { automaticallyApprove: true },
        allInstancesDown: { automaticallyApprove: true },
      },
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
          diskControllerType: "NVMe",
        },
        userData: "RXhhbXBsZSBVc2VyRGF0YQ==",
        hardwareProfile: {
          vmSizeProperties: { vCPUsAvailable: 1, vCPUsPerCore: 1 },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithDiskEncryptionSetResource.json
 */
async function createAScaleSetWithDiskEncryptionSetResourceInOsDiskAndDataDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_DS1_v2" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/images/{existing-custom-image-name}",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: {
              storageAccountType: "Standard_LRS",
              diskEncryptionSet: {
                id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
              },
            },
            createOption: "FromImage",
          },
          dataDisks: [
            {
              caching: "ReadWrite",
              managedDisk: {
                storageAccountType: "Standard_LRS",
                diskEncryptionSet: {
                  id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
                },
              },
              diskSizeGB: 1023,
              createOption: "Empty",
              lun: 0,
            },
          ],
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithEmptyDataDisksOnEachVm.json
 */
async function createAScaleSetWithEmptyDataDisksOnEachVm(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D2_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
            diskSizeGB: 512,
          },
          dataDisks: [
            { diskSizeGB: 1023, createOption: "Empty", lun: 0 },
            { diskSizeGB: 1023, createOption: "Empty", lun: 1 },
          ],
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithEncryptionAtHost.json
 */
async function createAScaleSetWithHostEncryptionUsingEncryptionAtHostProperty(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_DS1_v2" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "windows2016",
            publisher: "microsoft-ads",
            version: "latest",
            offer: "windows-data-science-vm",
          },
          osDisk: {
            caching: "ReadOnly",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        securityProfile: { encryptionAtHost: true },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithExtensionsSuppressFailuresEnabled.json
 */
async function createAVmssWithAnExtensionThatHasSuppressFailuresEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        diagnosticsProfile: {
          bootDiagnostics: {
            storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
            enabled: true,
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        extensionProfile: {
          extensions: [
            {
              name: "{extension-name}",
              properties: {
                autoUpgradeMinorVersion: false,
                publisher: "{extension-Publisher}",
                type: "{extension-Type}",
                typeHandlerVersion: "{handler-version}",
                settings: {},
                suppressFailures: true,
              },
            },
          ],
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithExtensionsTimeBudget.json
 */
async function createAScaleSetWithExtensionTimeBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        diagnosticsProfile: {
          bootDiagnostics: {
            storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
            enabled: true,
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        extensionProfile: {
          extensions: [
            {
              name: "{extension-name}",
              properties: {
                autoUpgradeMinorVersion: false,
                publisher: "{extension-Publisher}",
                type: "{extension-Type}",
                typeHandlerVersion: "{handler-version}",
                settings: {},
              },
            },
          ],
          extensionsTimeBudget: "PT1H20M",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithHighSpeedInterconnectPlacement.json
 */
async function createAVirtualMachineScaleSetWithHighSpeedInterconnectPlacement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 2, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      orchestrationMode: "Flexible",
      highSpeedInterconnectPlacement: "None",
      platformFaultDomainCount: 1,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            publisher: "Canonical",
            offer: "0001-com-ubuntu-server-focal",
            sku: "20_04-lts-gen2",
            version: "latest",
          },
          osDisk: {
            createOption: "FromImage",
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                enableAcceleratedNetworking: false,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                      primary: true,
                      applicationGatewayBackendAddressPools: [],
                      loadBalancerBackendAddressPools: [],
                      publicIPAddressConfiguration: {
                        name: "{vmss-name}",
                        properties: { idleTimeoutInMinutes: 15 },
                      },
                    },
                  },
                ],
              },
            },
          ],
          networkApiVersion: "2020-11-01",
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithManagedBootDiagnostics.json
 */
async function createAScaleSetWithManagedBootDiagnostics(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        diagnosticsProfile: { bootDiagnostics: { enabled: true } },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithMaxInstancePercentPerZonePolicy.json
 */
async function createAScaleSetWithMaxInstancePercentPerZonePolicyEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: false,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
      resiliencyPolicy: {
        zoneAllocationPolicy: {
          maxInstancePercentPerZonePolicy: { enabled: true, value: 50 },
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithMaxZoneCount.json
 */
async function createAZonesAutoScaleSetWithMaxZoneCount(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: false,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
      resiliencyPolicy: { zoneAllocationPolicy: { maxZoneCount: 2 } },
    },
    placement: { zonePlacementPolicy: "Auto" },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithOSImageScheduledEventEnabled.json
 */
async function createAScaleSetWithOSImageScheduledEventsEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        scheduledEventsProfile: {
          osImageNotificationProfile: {
            enable: true,
            notBeforeTimeout: "PT15M",
          },
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithPasswordAuthentication.json
 */
async function createAScaleSetWithPasswordAuthentication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithPlacement.json
 */
async function createAScaleSetWithPlacementPolicyAuto(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: false,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    placement: { zonePlacementPolicy: "Auto", includeZones: ["1", "3"] },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithPremiumStorage.json
 */
async function createAScaleSetWithPremiumStorage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Premium_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithPriorityMixPolicy.json
 */
async function createAScaleSetWithPriorityMixPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 2, name: "Standard_A8m_v2" },
    location: "westus",
    properties: {
      orchestrationMode: "Flexible",
      platformFaultDomainCount: 1,
      priorityMixPolicy: {
        baseRegularPriorityCount: 10,
        regularPriorityPercentageAboveBase: 50,
      },
      virtualMachineProfile: {
        priority: "Spot",
        storageProfile: {
          imageReference: {
            publisher: "Canonical",
            offer: "0001-com-ubuntu-server-focal",
            sku: "20_04-lts-gen2",
            version: "latest",
          },
          osDisk: {
            createOption: "FromImage",
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                enableAcceleratedNetworking: false,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                      primary: true,
                      applicationGatewayBackendAddressPools: [],
                      loadBalancerBackendAddressPools: [],
                      publicIPAddressConfiguration: {
                        name: "{vmss-name}",
                        properties: { idleTimeoutInMinutes: 15 },
                      },
                    },
                  },
                ],
              },
            },
          ],
          networkApiVersion: "2020-11-01",
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithProtectedSettingsFromKeyVault.json
 */
async function createAVmssWithAnExtensionWithProtectedSettingsFromKeyVault(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        diagnosticsProfile: {
          bootDiagnostics: {
            storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
            enabled: true,
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        extensionProfile: {
          extensions: [
            {
              name: "{extension-name}",
              properties: {
                autoUpgradeMinorVersion: false,
                publisher: "{extension-Publisher}",
                type: "{extension-Type}",
                typeHandlerVersion: "{handler-version}",
                settings: {},
                protectedSettingsFromKeyVault: {
                  sourceVault: {
                    id: "/subscriptions/a53f7094-a16c-47af-abe4-b05c05d0d79a/resourceGroups/myResourceGroup/providers/Microsoft.KeyVault/vaults/kvName",
                  },
                  secretUrl:
                    "https://kvName.vault.azure.net/secrets/secretName/79b88b3a6f5440ffb2e73e44a0db712e",
                },
              },
            },
          ],
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithProxyAgentSettings.json
 */
async function createAScaleSetWithProxyAgentSettingsOfEnabledAndMode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D2s_v3" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            publisher: "Canonical",
            offer: "0001-com-ubuntu-server-jammy",
            sku: "22_04-lts-gen2",
            version: "latest",
          },
          osDisk: {
            caching: "ReadOnly",
            managedDisk: { storageAccountType: "StandardSSD_LRS" },
            createOption: "FromImage",
          },
        },
        securityProfile: {
          proxyAgentSettings: {
            enabled: true,
            addProxyAgentExtension: true,
            wireServer: {
              inVMAccessControlProfileReferenceId:
                "/subscriptions/{sub-id}/resourceGroups/{rg}/providers/Microsoft.Compute/galleries/{gallery-name}/inVMAccessControlProfiles/{profile-name}/versions/{version}",
            },
            imds: {
              inVMAccessControlProfileReferenceId:
                "/subscriptions/{sub-id}/resourceGroups/{rg}/providers/Microsoft.Compute/galleries/{gallery-name}/inVMAccessControlProfiles/{profile-name}/versions/{version}",
            },
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithResilientVMCreationPolicy.json
 */
async function createAScaleSetWithResilientVMCreationEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: false,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
      resiliencyPolicy: { resilientVMCreationPolicy: { enabled: true } },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithResilientVMDeletionPolicy.json
 */
async function createAScaleSetWithResilientVMDeletionEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: false,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
      resiliencyPolicy: { resilientVMDeletionPolicy: { enabled: true } },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithScaleInPolicy.json
 */
async function createAScaleSetWithScaleInPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
      scaleInPolicy: {
        rules: ["OldestVM"],
        prioritizeUnhealthyVMs: true,
        forceDeletion: true,
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithSecurityPostureReference.json
 */
async function createAScaleSetWithSecurityPostureReference(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_A1" },
    location: "eastus2euap",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        securityPostureReference: {
          id: "/CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|{major.*}|latest",
        },
        storageProfile: {
          imageReference: {
            sku: "2022-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            createOption: "FromImage",
            name: "osDisk",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: {
        mode: "Automatic",
        automaticOSUpgradePolicy: { enableAutomaticOSUpgrade: true },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithSecurityTypeConfidentialVM.json
 */
async function createAScaleSetWithSecurityTypeAsConfidentialVM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_DC2as_v5" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "windows-cvm",
            publisher: "MicrosoftWindowsServer",
            version: "17763.2183.2109130127",
            offer: "2019-datacenter-cvm",
          },
          osDisk: {
            caching: "ReadOnly",
            managedDisk: {
              storageAccountType: "StandardSSD_LRS",
              securityProfile: { securityEncryptionType: "VMGuestStateOnly" },
            },
            createOption: "FromImage",
          },
        },
        securityProfile: {
          uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
          securityType: "ConfidentialVM",
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithSecurityTypeConfidentialVMWithNonPersistedTPM.json
 */
async function createAScaleSetWithSecurityTypeAsConfidentialVMAndNonPersistedTPMSecurityEncryptionType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_DC2es_v5" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "linux-cvm",
            publisher: "UbuntuServer",
            version: "17763.2183.2109130127",
            offer: "2022-datacenter-cvm",
          },
          osDisk: {
            caching: "ReadOnly",
            managedDisk: {
              storageAccountType: "StandardSSD_LRS",
              securityProfile: { securityEncryptionType: "NonPersistedTPM" },
            },
            createOption: "FromImage",
          },
        },
        securityProfile: {
          uefiSettings: { secureBootEnabled: false, vTpmEnabled: true },
          securityType: "ConfidentialVM",
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithServiceArtifactReference.json
 */
async function createAScaleSetWithServiceArtifactReference(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_A1" },
    location: "eastus2euap",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        serviceArtifactReference: {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/galleries/myGalleryName/serviceArtifacts/serviceArtifactName/vmArtifactsProfiles/vmArtifactsProfilesName",
        },
        storageProfile: {
          imageReference: {
            sku: "2022-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            createOption: "FromImage",
            name: "osDisk",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: {
        mode: "Automatic",
        automaticOSUpgradePolicy: { enableAutomaticOSUpgrade: true },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithSkuProfile.json
 */
async function createAScaleSetWithSkuProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { capacity: 10, name: "Mix" },
    location: "westus",
    properties: {
      singlePlacementGroup: false,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        priority: "Spot",
        evictionPolicy: "Deallocate",
        billingProfile: { maxPrice: -1 },
      },
      orchestrationMode: "Flexible",
      priorityMixPolicy: {
        baseRegularPriorityCount: 4,
        regularPriorityPercentageAboveBase: 50,
      },
      skuProfile: {
        vmSizes: [
          { name: "Standard_D8s_v5" },
          { name: "Standard_E16s_v5" },
          { name: "Standard_D2s_v5" },
        ],
        allocationStrategy: "CapacityOptimized",
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithSkuProfile_Prioritized.json
 */
async function createAScaleSetWithSkuProfileAndPrioritizedAllocationStrategy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { capacity: 10, name: "Mix" },
    location: "westus",
    properties: {
      singlePlacementGroup: false,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        priority: "Spot",
        evictionPolicy: "Deallocate",
        billingProfile: { maxPrice: -1 },
      },
      orchestrationMode: "Flexible",
      priorityMixPolicy: {
        baseRegularPriorityCount: 4,
        regularPriorityPercentageAboveBase: 50,
      },
      skuProfile: {
        vmSizes: [
          { name: "Standard_D8s_v5", rank: 0 },
          { name: "Standard_E16s_v5", rank: 1 },
          { name: "Standard_D2s_v5", rank: 2 },
        ],
        allocationStrategy: "Prioritized",
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithSpotRestorePolicy.json
 */
async function createAScaleSetWithSpotRestorePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 2, name: "Standard_A8m_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        priority: "Spot",
        evictionPolicy: "Deallocate",
        billingProfile: { maxPrice: -1 },
      },
      upgradePolicy: { mode: "Manual" },
      spotRestorePolicy: { enabled: true, restoreTimeout: "PT1H" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithSshAuthentication.json
 */
async function createAScaleSetWithSshAuthentication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          linuxConfiguration: {
            ssh: {
              publicKeys: [
                {
                  path: "/home/{your-username}/.ssh/authorized_keys",
                  keyData:
                    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCeClRAk2ipUs/l5voIsDC5q9RI+YSRd1Bvd/O+axgY4WiBzG+4FwJWZm/mLLe5DoOdHQwmU2FrKXZSW4w2sYE70KeWnrFViCOX5MTVvJgPE8ClugNl8RWth/tU849DvM9sT7vFgfVSHcAS2yDRyDlueii+8nF2ym8XWAPltFVCyLHRsyBp5YPqK8JFYIa1eybKsY3hEAxRCA+/7bq8et+Gj3coOsuRmrehav7rE6N12Pb80I6ofa6SM5XNYq4Xk0iYNx7R3kdz0Jj9XgZYWjAHjJmT0gTRoOnt6upOuxK7xI/ykWrllgpXrCPu3Ymz+c+ujaqcxDopnAl2lmf69/J1",
                },
              ],
            },
            disablePasswordAuthentication: true,
          },
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithTerminateScheduledEventEnabled.json
 */
async function createAScaleSetWithTerminateScheduledEventsEnabled(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        scheduledEventsProfile: {
          terminateNotificationProfile: {
            enable: true,
            notBeforeTimeout: "PT5M",
          },
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithUefiSettings.json
 */
async function createAScaleSetWithUefiSettingsOfSecureBootAndVTPM(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D2s_v3" },
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "windows10-tvm",
            publisher: "MicrosoftWindowsServer",
            version: "18363.592.2001092016",
            offer: "windowsserver-gen2preview-preview",
          },
          osDisk: {
            caching: "ReadOnly",
            managedDisk: { storageAccountType: "StandardSSD_LRS" },
            createOption: "FromImage",
          },
        },
        securityProfile: {
          uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
          securityType: "TrustedLaunch",
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
    },
    location: "westus",
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithUserData.json
 */
async function createAScaleSetWithUserData(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      upgradePolicy: { mode: "Manual" },
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        userData: "RXhhbXBsZSBVc2VyRGF0YQ==",
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithVMSizeProperties.json
 */
async function createAScaleSetWithVmSizeProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      upgradePolicy: { mode: "Manual" },
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        userData: "RXhhbXBsZSBVc2VyRGF0YQ==",
        hardwareProfile: {
          vmSizeProperties: { vCPUsAvailable: 1, vCPUsPerCore: 1 },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithVMsInDifferentZones.json
 */
async function createAScaleSetWithVirtualMachinesInDifferentZones(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 2, name: "Standard_A1_v2" },
    location: "centralus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
            diskSizeGB: 512,
          },
          dataDisks: [
            { diskSizeGB: 1023, createOption: "Empty", lun: 0 },
            { diskSizeGB: 1023, createOption: "Empty", lun: 1 },
          ],
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Automatic" },
    },
    zones: ["1", "3"],
  });
}

/**
 * This sample demonstrates how to create or update a VM scale set.
 *
 * @summary create or update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Create_WithZonalPlatformFaultDomainAlignMode.json
 */
async function createAScaleSetWithZonalPlatformFaultDomainAlignModeAsAligned(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.createOrUpdate("myResourceGroup", "{vmss-name}", {
    sku: { tier: "Standard", capacity: 3, name: "Standard_D1_v2" },
    location: "westus",
    properties: {
      overprovision: true,
      virtualMachineProfile: {
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
          },
          osDisk: {
            caching: "ReadWrite",
            managedDisk: { storageAccountType: "Standard_LRS" },
            createOption: "FromImage",
          },
        },
        osProfile: {
          computerNamePrefix: "{vmss-name}",
          adminUsername: "{your-username}",
          adminPassword: "{your-password}",
        },
        networkProfile: {
          networkInterfaceConfigurations: [
            {
              name: "{vmss-name}",
              properties: {
                primary: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "{vmss-name}",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/{existing-virtual-network-name}/subnets/{existing-subnet-name}",
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      upgradePolicy: { mode: "Manual" },
      scheduledEventsPolicy: {
        scheduledEventsAdditionalPublishingTargets: {
          eventGridAndResourceGraph: { enable: true },
        },
        userInitiatedRedeploy: { automaticallyApprove: true },
        userInitiatedReboot: { automaticallyApprove: true },
      },
      zonalPlatformFaultDomainAlignMode: "Aligned",
    },
  });
}

async function main(): Promise<void> {
  await createAScaleSetWithEphemeralOsDisksUsingPlacementProperty();
  await createAScaleSetWithEphemeralOsDiskProvisioningInNvmeDiskUsingPlacementProperty();
  await createACustomImageScaleSetFromAnUnmanagedGeneralizedOsImage();
  await createAScaleSetFromACustomImage();
  await createAScaleSetFromAGeneralizedSharedImage();
  await createAScaleSetFromASpecializedSharedImage();
  await createAScaleSetWhereNicConfigHasDisableTcpStateTrackingProperty();
  await createAScaleSetWithFpgaNetworkInterfaces();
  await createAScaleSetWithNetworkInterfacesWithPublicIpAddressDnsSettings();
  await createAPlatformImageScaleSetWithUnmanagedOsDisks();
  await createAScaleSetWithAMarketplaceImagePlan();
  await createAScaleSetWithApplicationProfile();
  await createAScaleSetWithAutomaticRepairsEnabled();
  await createAScaleSetWithAutomaticZoneRebalancingEnabled();
  await createAScaleSetWithAnAzureApplicationGateway();
  await createAScaleSetWithAnAzureLoadBalancer();
  await createAScaleSetWithBootDiagnostics();
  await createOrUpdateAScaleSetWithCapacityReservation();
  await createAScaleSetWithEphemeralOsDisks();
  await createAScaleSetWithDiskControllerType();
  await createAScaleSetWithDiskEncryptionSetResourceInOsDiskAndDataDisk();
  await createAScaleSetWithEmptyDataDisksOnEachVm();
  await createAScaleSetWithHostEncryptionUsingEncryptionAtHostProperty();
  await createAVmssWithAnExtensionThatHasSuppressFailuresEnabled();
  await createAScaleSetWithExtensionTimeBudget();
  await createAVirtualMachineScaleSetWithHighSpeedInterconnectPlacement();
  await createAScaleSetWithManagedBootDiagnostics();
  await createAScaleSetWithMaxInstancePercentPerZonePolicyEnabled();
  await createAZonesAutoScaleSetWithMaxZoneCount();
  await createAScaleSetWithOSImageScheduledEventsEnabled();
  await createAScaleSetWithPasswordAuthentication();
  await createAScaleSetWithPlacementPolicyAuto();
  await createAScaleSetWithPremiumStorage();
  await createAScaleSetWithPriorityMixPolicy();
  await createAVmssWithAnExtensionWithProtectedSettingsFromKeyVault();
  await createAScaleSetWithProxyAgentSettingsOfEnabledAndMode();
  await createAScaleSetWithResilientVMCreationEnabled();
  await createAScaleSetWithResilientVMDeletionEnabled();
  await createAScaleSetWithScaleInPolicy();
  await createAScaleSetWithSecurityPostureReference();
  await createAScaleSetWithSecurityTypeAsConfidentialVM();
  await createAScaleSetWithSecurityTypeAsConfidentialVMAndNonPersistedTPMSecurityEncryptionType();
  await createAScaleSetWithServiceArtifactReference();
  await createAScaleSetWithSkuProfile();
  await createAScaleSetWithSkuProfileAndPrioritizedAllocationStrategy();
  await createAScaleSetWithSpotRestorePolicy();
  await createAScaleSetWithSshAuthentication();
  await createAScaleSetWithTerminateScheduledEventsEnabled();
  await createAScaleSetWithUefiSettingsOfSecureBootAndVTPM();
  await createAScaleSetWithUserData();
  await createAScaleSetWithVmSizeProperties();
  await createAScaleSetWithVirtualMachinesInDifferentZones();
  await createAScaleSetWithZonalPlatformFaultDomainAlignModeAsAligned();
}

main().catch(console.error);
