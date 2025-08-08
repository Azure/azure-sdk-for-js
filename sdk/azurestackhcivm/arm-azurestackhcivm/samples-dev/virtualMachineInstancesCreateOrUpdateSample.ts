// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @summary the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_CreateOrUpdate_Put_Virtual_Machine_Instance_With_Gallery_Image.json
 */
async function putVirtualMachineInstanceWithGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualMachineInstances.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      extendedLocation: {
        name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
        type: "CustomLocation",
      },
      properties: {
        hardwareProfile: { vmSize: "Default" },
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/networkInterfaces/test-nic",
            },
          ],
        },
        osProfile: {
          adminPassword: "password",
          adminUsername: "localadmin",
          computerName: "luamaster",
        },
        securityProfile: {
          enableTPM: true,
          uefiSettings: { secureBootEnabled: true },
        },
        storageProfile: {
          imageReference: {
            id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/galleryImages/test-gallery-image",
          },
          vmConfigStoragePathId:
            "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/storageContainers/test-container",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @summary the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_CreateOrUpdate_Put_Virtual_Machine_Instance_With_Gpu.json
 */
async function putVirtualMachineInstanceWithGpu(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualMachineInstances.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      extendedLocation: {
        name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
        type: "CustomLocation",
      },
      properties: {
        hardwareProfile: {
          vmSize: "Default",
          virtualMachineGPUs: [{ assignmentType: "GpuDDA", partitionSizeMB: 0 }],
        },
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/networkInterfaces/test-nic",
            },
          ],
        },
        osProfile: {
          adminPassword: "password",
          adminUsername: "localadmin",
          computerName: "luamaster",
        },
        securityProfile: {
          enableTPM: true,
          uefiSettings: { secureBootEnabled: true },
        },
        storageProfile: {
          imageReference: {
            id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/galleryImages/test-gallery-image",
          },
          vmConfigStoragePathId:
            "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/storageContainers/test-container",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @summary the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_CreateOrUpdate_Put_Virtual_Machine_Instance_With_Marketplace_Gallery_Image.json
 */
async function putVirtualMachineInstanceWithMarketplaceGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualMachineInstances.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      extendedLocation: {
        name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
        type: "CustomLocation",
      },
      properties: {
        hardwareProfile: { vmSize: "Default" },
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/networkInterfaces/test-nic",
            },
          ],
        },
        osProfile: {
          adminPassword: "password",
          adminUsername: "localadmin",
          computerName: "luamaster",
        },
        securityProfile: {
          enableTPM: true,
          uefiSettings: { secureBootEnabled: true },
        },
        storageProfile: {
          imageReference: {
            id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/marketplaceGalleryImages/test-marketplace-gallery-image",
          },
          vmConfigStoragePathId:
            "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/storageContainers/test-container",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @summary the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_CreateOrUpdate_Put_Virtual_Machine_Instance_With_Os_Disk.json
 */
async function putVirtualMachineInstanceWithOsDisk(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualMachineInstances.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      extendedLocation: {
        name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
        type: "CustomLocation",
      },
      properties: {
        hardwareProfile: { vmSize: "Default" },
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/networkInterfaces/test-nic",
            },
          ],
        },
        securityProfile: {
          enableTPM: true,
          uefiSettings: { secureBootEnabled: true },
        },
        storageProfile: {
          osDisk: {
            id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/virtualHardDisks/test-vhd",
          },
          vmConfigStoragePathId:
            "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/storageContainers/test-container",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @summary the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances_CreateOrUpdate_Put_Virtual_Machine_Instance_With_Vm_Config_Agent.json
 */
async function putVirtualMachineInstanceWithVMConfigAgent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualMachineInstances.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      extendedLocation: {
        name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
        type: "CustomLocation",
      },
      properties: {
        hardwareProfile: { vmSize: "Default" },
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/networkInterfaces/test-nic",
            },
          ],
        },
        osProfile: {
          adminPassword: "password",
          adminUsername: "localadmin",
          computerName: "luamaster",
          windowsConfiguration: { provisionVMConfigAgent: true },
        },
        securityProfile: {
          enableTPM: true,
          uefiSettings: { secureBootEnabled: true },
        },
        storageProfile: {
          imageReference: {
            id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/galleryImages/test-gallery-image",
          },
          vmConfigStoragePathId:
            "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/storageContainers/test-container",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 *
 * @summary the operation to create or update a virtual machine instance. Please note some properties can be set only during virtual machine instance creation.
 * x-ms-original-file: 2025-06-01-preview/VirtualMachineInstances__CreateOrUpdate_CreateFromLocal.json
 */
async function createVirtualMachineInstanceFromLocal(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.virtualMachineInstances.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.HybridCompute/machines/DemoVM",
    {
      extendedLocation: {
        name: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.ExtendedLocation/customLocations/dogfood-location",
        type: "CustomLocation",
      },
      properties: {
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/a95612cb-f1fa-4daa-a4fd-272844fa512c/resourceGroups/dogfoodarc/providers/Microsoft.AzureStackHCI/networkInterfaces/test-nic",
            },
          ],
        },
        storageProfile: {
          dataDisks: [
            {
              id: "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/testrg/providers/Microsoft.AzureStackHCI/virtualHardDisks/test-vhd",
            },
          ],
        },
        createFromLocal: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putVirtualMachineInstanceWithGalleryImage();
  await putVirtualMachineInstanceWithGpu();
  await putVirtualMachineInstanceWithMarketplaceGalleryImage();
  await putVirtualMachineInstanceWithOsDisk();
  await putVirtualMachineInstanceWithVMConfigAgent();
  await createVirtualMachineInstanceFromLocal();
}

main().catch(console.error);
