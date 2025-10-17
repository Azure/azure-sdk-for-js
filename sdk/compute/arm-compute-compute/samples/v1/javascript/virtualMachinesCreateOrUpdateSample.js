// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_CustomImageVmFromAnUnmanagedGeneralizedOsImage.json
 */
async function createACustomImageVmFromAnUnmanagedGeneralizedOsImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "{vm-name}", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
      storageProfile: {
        osDisk: {
          name: "myVMosdisk",
          image: {
            uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/{existing-generalized-os-image-blob-name}.vhd",
          },
          osType: "Windows",
          createOption: "FromImage",
          caching: "ReadWrite",
          vhd: {
            uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk.vhd",
          },
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_FromACommunityGalleryImage.json
 */
async function createAVMFromACommunityGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
      storageProfile: {
        imageReference: {
          communityGalleryImageId:
            "/CommunityGalleries/galleryPublicName/Images/communityGalleryImageName/Versions/communityGalleryImageVersionName",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_FromACustomImage.json
 */
async function createAVmFromACustomImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
      storageProfile: {
        imageReference: {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/images/{existing-custom-image-name}",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_FromAGeneralizedSharedImage.json
 */
async function createAVmFromAGeneralizedSharedImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
      storageProfile: {
        imageReference: {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/galleries/mySharedGallery/images/mySharedImage",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_FromASharedGalleryImage.json
 */
async function createAVMFromASharedGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
      storageProfile: {
        imageReference: {
          sharedGalleryImageId:
            "/SharedGalleries/sharedGalleryName/Images/sharedGalleryImageName/Versions/sharedGalleryImageVersionName",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_FromASpecializedSharedImage.json
 */
async function createAVmFromASpecializedSharedImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
      storageProfile: {
        imageReference: {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/galleries/mySharedGallery/images/mySharedImage",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_InAVmssWithCustomerAssignedPlatformFaultDomain.json
 */
async function createAVmInAVirtualMachineScaleSetWithCustomerAssignedPlatformFaultDomain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      virtualMachineScaleSet: {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachineScaleSets/{existing-flex-vmss-name-with-platformFaultDomainCount-greater-than-1}",
      },
      platformFaultDomain: 1,
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_InAnAvailabilitySet.json
 */
async function createAVmInAnAvailabilitySet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      availabilitySet: {
        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/availabilitySets/{existing-availability-set-name}",
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_LinuxVmWithAutomaticByPlatformSettings.json
 */
async function createALinuxVmWithAPatchSettingPatchModeOfAutomaticByPlatformAndAutomaticByPlatformSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2s_v3" },
      storageProfile: {
        imageReference: {
          sku: "16.04-LTS",
          publisher: "Canonical",
          version: "latest",
          offer: "UbuntuServer",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Premium_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        linuxConfiguration: {
          provisionVMAgent: true,
          patchSettings: {
            patchMode: "AutomaticByPlatform",
            assessmentMode: "AutomaticByPlatform",
            automaticByPlatformSettings: {
              rebootSetting: "Never",
              bypassPlatformSafetyChecksOnUserSchedule: true,
            },
          },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_LinuxVmWithPatchSettingAssessmentModeOfImageDefault.json
 */
async function createALinuxVmWithAPatchSettingAssessmentModeOfImageDefault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2s_v3" },
      storageProfile: {
        imageReference: {
          sku: "16.04-LTS",
          publisher: "Canonical",
          version: "latest",
          offer: "UbuntuServer",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Premium_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        linuxConfiguration: {
          provisionVMAgent: true,
          patchSettings: { assessmentMode: "ImageDefault" },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_LinuxVmWithPatchSettingModeOfImageDefault.json
 */
async function createALinuxVmWithAPatchSettingPatchModeOfImageDefault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2s_v3" },
      storageProfile: {
        imageReference: {
          sku: "16.04-LTS",
          publisher: "Canonical",
          version: "latest",
          offer: "UbuntuServer",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Premium_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        linuxConfiguration: {
          provisionVMAgent: true,
          patchSettings: { patchMode: "ImageDefault" },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_LinuxVmWithPatchSettingModesOfAutomaticByPlatform.json
 */
async function createALinuxVmWithAPatchSettingsPatchModeAndAssessmentModeSetToAutomaticByPlatform() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2s_v3" },
      storageProfile: {
        imageReference: {
          sku: "16.04-LTS",
          publisher: "Canonical",
          version: "latest",
          offer: "UbuntuServer",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Premium_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        linuxConfiguration: {
          provisionVMAgent: true,
          patchSettings: {
            patchMode: "AutomaticByPlatform",
            assessmentMode: "AutomaticByPlatform",
          },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_PlatformImageVmWithUnmanagedOsAndDataDisks.json
 */
async function createAPlatformImageVmWithUnmanagedOsAndDataDisks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "{vm-name}", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2_v2" },
      storageProfile: {
        imageReference: {
          sku: "2016-Datacenter",
          publisher: "MicrosoftWindowsServer",
          version: "latest",
          offer: "WindowsServer",
        },
        osDisk: {
          caching: "ReadWrite",
          vhd: {
            uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk.vhd",
          },
          createOption: "FromImage",
          name: "myVMosdisk",
        },
        dataDisks: [
          {
            diskSizeGB: 1023,
            createOption: "Empty",
            lun: 0,
            vhd: {
              uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk0.vhd",
            },
          },
          {
            diskSizeGB: 1023,
            createOption: "Empty",
            lun: 1,
            vhd: {
              uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk1.vhd",
            },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithAutomaticByPlatformSettings.json
 */
async function createAWindowsVmWithAPatchSettingPatchModeOfAutomaticByPlatformAndAutomaticByPlatformSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        windowsConfiguration: {
          provisionVMAgent: true,
          enableAutomaticUpdates: true,
          patchSettings: {
            patchMode: "AutomaticByPlatform",
            assessmentMode: "AutomaticByPlatform",
            automaticByPlatformSettings: {
              rebootSetting: "Never",
              bypassPlatformSafetyChecksOnUserSchedule: false,
            },
          },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingAssessmentModeOfImageDefault.json
 */
async function createAWindowsVmWithAPatchSettingAssessmentModeOfImageDefault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        windowsConfiguration: {
          provisionVMAgent: true,
          enableAutomaticUpdates: true,
          patchSettings: { assessmentMode: "ImageDefault" },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingModeOfAutomaticByOS.json
 */
async function createAWindowsVmWithAPatchSettingPatchModeOfAutomaticByOS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        windowsConfiguration: {
          provisionVMAgent: true,
          enableAutomaticUpdates: true,
          patchSettings: { patchMode: "AutomaticByOS" },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/nsgExistingNic",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingModeOfAutomaticByPlatformAndEnableHotPatchingTrue.json
 */
async function createAWindowsVmWithAPatchSettingPatchModeOfAutomaticByPlatformAndEnableHotpatchingSetToTrue() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        windowsConfiguration: {
          provisionVMAgent: true,
          enableAutomaticUpdates: true,
          patchSettings: {
            patchMode: "AutomaticByPlatform",
            enableHotpatching: true,
          },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingModeOfManual.json
 */
async function createAWindowsVmWithAPatchSettingPatchModeOfManual() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        windowsConfiguration: {
          provisionVMAgent: true,
          enableAutomaticUpdates: true,
          patchSettings: { patchMode: "Manual" },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingModesOfAutomaticByPlatform.json
 */
async function createAWindowsVmWithPatchSettingsPatchModeAndAssessmentModeSetToAutomaticByPlatform() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
        windowsConfiguration: {
          provisionVMAgent: true,
          enableAutomaticUpdates: true,
          patchSettings: {
            patchMode: "AutomaticByPlatform",
            assessmentMode: "AutomaticByPlatform",
          },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithADiffOsDisk.json
 */
async function createAVmWithEphemeralOsDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_DS1_v2" },
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
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithADiffOsDiskUsingDiffDiskPlacementAsCacheDisk.json
 */
async function createAVmWithEphemeralOsDiskProvisioningInCacheDiskUsingPlacementProperty() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_DS1_v2" },
      storageProfile: {
        imageReference: {
          sku: "windows2016",
          publisher: "microsoft-ads",
          version: "latest",
          offer: "windows-data-science-vm",
        },
        osDisk: {
          caching: "ReadOnly",
          diffDiskSettings: { option: "Local", placement: "CacheDisk" },
          managedDisk: { storageAccountType: "Standard_LRS" },
          createOption: "FromImage",
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithADiffOsDiskUsingDiffDiskPlacementAsNvmeDisk.json
 */
async function createAVmWithEphemeralOsDiskProvisioningInNvmeDiskUsingPlacementProperty() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_DS1_v2" },
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
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithADiffOsDiskUsingDiffDiskPlacementAsResourceDisk.json
 */
async function createAVmWithEphemeralOsDiskProvisioningInResourceDiskUsingPlacementProperty() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_DS1_v2" },
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
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithAMarketplaceImagePlan.json
 */
async function createAVmWithAMarketplaceImagePlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithApplicationProfile.json
 */
async function createAVmWithApplicationProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
      storageProfile: {
        imageReference: {
          sku: "{image_sku}",
          publisher: "{image_publisher}",
          version: "latest",
          offer: "{image_offer}",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
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
            treatFailureAsDeploymentFailure: false,
            enableAutomaticUpgrade: false,
          },
          {
            packageReferenceId:
              "/subscriptions/32c17a9e-aa7b-4ba5-a45b-e324116b6fdg/resourceGroups/myresourceGroupName3/providers/Microsoft.Compute/galleries/myGallery2/applications/MyApplication2/versions/1.1",
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithBootDiagnostics.json
 */
async function createAVmWithBootDiagnostics() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      diagnosticsProfile: {
        bootDiagnostics: {
          storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
          enabled: true,
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithCapacityReservation.json
 */
async function createOrUpdateAVMWithCapacityReservation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_DS1_v2" },
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
          name: "myVMosdisk",
        },
      },
      capacityReservation: {
        capacityReservationGroup: {
          id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/CapacityReservationGroups/{crgName}",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithDataDisksFromSourceResource.json
 */
async function createAVmWithDataDisksUsingCopyAndRestoreOptions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
        dataDisks: [
          {
            diskSizeGB: 1023,
            createOption: "Copy",
            sourceResource: {
              id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/{existing-snapshot-name}",
            },
            lun: 0,
          },
          {
            diskSizeGB: 1023,
            createOption: "Copy",
            sourceResource: {
              id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/{existing-disk-name}",
            },
            lun: 1,
          },
          {
            diskSizeGB: 1023,
            createOption: "Restore",
            sourceResource: {
              id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/restorePointCollections/{existing-rpc-name}/restorePoints/{existing-rp-name}/diskRestorePoints/{existing-disk-restore-point-name}",
            },
            lun: 2,
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithDiskControllerType.json
 */
async function createAVMWithDiskControllerType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D4_v3" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
        diskControllerType: "NVMe",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      diagnosticsProfile: {
        bootDiagnostics: {
          storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
          enabled: true,
        },
      },
      userData: "U29tZSBDdXN0b20gRGF0YQ==",
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithDiskEncryptionSetResource.json
 */
async function createAVmWithDiskEncryptionSetResourceIdInTheOsDiskAndDataDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
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
          {
            caching: "ReadWrite",
            managedDisk: {
              id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/{existing-managed-disk-name}",
              storageAccountType: "Standard_LRS",
              diskEncryptionSet: {
                id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
              },
            },
            diskSizeGB: 1023,
            createOption: "Attach",
            lun: 1,
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithEmptyDataDisks.json
 */
async function createAVmWithEmptyDataDisks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
        dataDisks: [
          { diskSizeGB: 1023, createOption: "Empty", lun: 0 },
          { diskSizeGB: 1023, createOption: "Empty", lun: 1 },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithEncryptionAtHost.json
 */
async function createAVmWithHostEncryptionUsingEncryptionAtHostProperty() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_DS1_v2" },
      securityProfile: { encryptionAtHost: true },
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
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithEncryptionIdentity.json
 */
async function createAVMWithEncryptionIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity":
          {},
      },
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_D2s_v3" },
      securityProfile: {
        encryptionIdentity: {
          userAssignedIdentityResourceId:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myIdentity",
        },
      },
      storageProfile: {
        imageReference: {
          publisher: "MicrosoftWindowsServer",
          offer: "WindowsServer",
          sku: "2019-Datacenter",
          version: "latest",
        },
        osDisk: {
          caching: "ReadOnly",
          managedDisk: { storageAccountType: "StandardSSD_LRS" },
          createOption: "FromImage",
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithExtensionsTimeBudget.json
 */
async function createAVmWithAnExtensionsTimeBudget() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      diagnosticsProfile: {
        bootDiagnostics: {
          storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
          enabled: true,
        },
      },
      extensionsTimeBudget: "PT30M",
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithHibernationEnabled.json
 */
async function createAVMWithHibernationEnabled() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "{vm-name}", {
    location: "eastus2euap",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2s_v3" },
      additionalCapabilities: { hibernationEnabled: true },
      storageProfile: {
        imageReference: {
          publisher: "MicrosoftWindowsServer",
          offer: "WindowsServer",
          sku: "2019-Datacenter",
          version: "latest",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "vmOSdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "{vm-name}",
        adminPassword: "{your-password}",
      },
      diagnosticsProfile: {
        bootDiagnostics: {
          storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
          enabled: true,
        },
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithManagedBootDiagnostics.json
 */
async function createAVmWithManagedBootDiagnostics() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      diagnosticsProfile: { bootDiagnostics: { enabled: true } },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithNetworkInterfaceConfiguration.json
 */
async function createAVMWithNetworkInterfaceConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkApiVersion: "2020-11-01",
        networkInterfaceConfigurations: [
          {
            name: "{nic-config-name}",
            tags: { nicTag: "tag" },
            properties: {
              primary: true,
              deleteOption: "Delete",
              ipConfigurations: [
                {
                  name: "{ip-config-name}",
                  properties: {
                    primary: true,
                    publicIPAddressConfiguration: {
                      name: "{publicIP-config-name}",
                      tags: { pipTag: "tag" },
                      sku: { name: "Basic", tier: "Global" },
                      properties: {
                        deleteOption: "Detach",
                        publicIPAllocationMethod: "Static",
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithNetworkInterfaceConfigurationDnsSettings.json
 */
async function createAVMWithNetworkInterfaceConfigurationWithPublicIpAddressDnsSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkApiVersion: "2020-11-01",
        networkInterfaceConfigurations: [
          {
            name: "{nic-config-name}",
            properties: {
              primary: true,
              deleteOption: "Delete",
              ipConfigurations: [
                {
                  name: "{ip-config-name}",
                  properties: {
                    primary: true,
                    publicIPAddressConfiguration: {
                      name: "{publicIP-config-name}",
                      sku: { name: "Basic", tier: "Global" },
                      properties: {
                        deleteOption: "Detach",
                        publicIPAllocationMethod: "Static",
                        dnsSettings: {
                          domainNameLabel: "aaaaa",
                          domainNameLabelScope: "TenantReuse",
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
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithPasswordAuthentication.json
 */
async function createAVmWithPasswordAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithPlacement.json
 */
async function createAVMWithAutomaticZonePlacement() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus2",
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
    },
    properties: {
      hardwareProfile: { vmSize: "Standard_DS1_v2" },
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
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
    placement: { zonePlacementPolicy: "Any", includeZones: ["1", "3"] },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithPremiumStorage.json
 */
async function createAVmWithPremiumStorage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithProxyAgentSettings.json
 */
async function createAVMWithProxyAgentSettingsOfEnabledAndMode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2s_v3" },
      securityProfile: {
        proxyAgentSettings: {
          enabled: true,
          wireServer: { mode: "Audit" },
          imds: { mode: "Audit" },
        },
      },
      storageProfile: {
        imageReference: {
          publisher: "MicrosoftWindowsServer",
          offer: "WindowsServer",
          sku: "2019-Datacenter",
          version: "latest",
        },
        osDisk: {
          caching: "ReadOnly",
          managedDisk: { storageAccountType: "StandardSSD_LRS" },
          createOption: "FromImage",
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithScheduledEventsProfile.json
 */
async function createAVmWithScheduledEventsProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      diagnosticsProfile: {
        bootDiagnostics: {
          storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
          enabled: true,
        },
      },
      scheduledEventsProfile: {
        terminateNotificationProfile: {
          notBeforeTimeout: "PT10M",
          enable: true,
        },
        osImageNotificationProfile: { notBeforeTimeout: "PT15M", enable: true },
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithSecurityTypeConfidentialVM.json
 */
async function createAVMWithSecurityTypeConfidentialVMWithPlatformManagedKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_DC2as_v5" },
      securityProfile: {
        uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
        securityType: "ConfidentialVM",
      },
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
            securityProfile: { securityEncryptionType: "DiskWithVMGuestState" },
          },
          createOption: "FromImage",
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithSecurityTypeConfidentialVMWithCustomerManagedKeys.json
 */
async function createAVMWithSecurityTypeConfidentialVMWithCustomerManagedKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_DC2as_v5" },
      securityProfile: {
        uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
        securityType: "ConfidentialVM",
      },
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
            securityProfile: {
              securityEncryptionType: "DiskWithVMGuestState",
              diskEncryptionSet: {
                id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
              },
            },
          },
          createOption: "FromImage",
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithSecurityTypeConfidentialVMWithNonPersistedTPM.json
 */
async function createAVMWithSecurityTypeConfidentialVMWithNonPersistedTPMSecurityEncryptionType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_DC2es_v5" },
      securityProfile: {
        uefiSettings: { secureBootEnabled: false, vTpmEnabled: true },
        securityType: "ConfidentialVM",
      },
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
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithSshAuthentication.json
 */
async function createAVmWithSshAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
      storageProfile: {
        imageReference: {
          sku: "{image_sku}",
          publisher: "{image_publisher}",
          version: "latest",
          offer: "{image_offer}",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
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
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithUefiSettings.json
 */
async function createAVMWithUefiSettingsOfSecureBootAndVTPM() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D2s_v3" },
      securityProfile: {
        uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
        securityType: "TrustedLaunch",
      },
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
          name: "myVMosdisk",
        },
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithUserData.json
 */
async function createAVMWithUserData() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "{vm-name}", {
    location: "westus",
    properties: {
      hardwareProfile: { vmSize: "Standard_D1_v2" },
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
          name: "vmOSdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "{vm-name}",
        adminPassword: "{your-password}",
      },
      diagnosticsProfile: {
        bootDiagnostics: {
          storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
          enabled: true,
        },
      },
      userData: "RXhhbXBsZSBVc2VyRGF0YQ==",
    },
  });
}

/**
 * This sample demonstrates how to the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary the operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Create_WithVMSizeProperties.json
 */
async function createAVMWithVMSizeProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.createOrUpdate("myResourceGroup", "myVM", {
    location: "westus",
    properties: {
      hardwareProfile: {
        vmSize: "Standard_D4_v3",
        vmSizeProperties: { vCPUsAvailable: 1, vCPUsPerCore: 1 },
      },
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
          name: "myVMosdisk",
          createOption: "FromImage",
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      diagnosticsProfile: {
        bootDiagnostics: {
          storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
          enabled: true,
        },
      },
      userData: "U29tZSBDdXN0b20gRGF0YQ==",
    },
  });
}

async function main() {
  await createACustomImageVmFromAnUnmanagedGeneralizedOsImage();
  await createAVMFromACommunityGalleryImage();
  await createAVmFromACustomImage();
  await createAVmFromAGeneralizedSharedImage();
  await createAVMFromASharedGalleryImage();
  await createAVmFromASpecializedSharedImage();
  await createAVmInAVirtualMachineScaleSetWithCustomerAssignedPlatformFaultDomain();
  await createAVmInAnAvailabilitySet();
  await createALinuxVmWithAPatchSettingPatchModeOfAutomaticByPlatformAndAutomaticByPlatformSettings();
  await createALinuxVmWithAPatchSettingAssessmentModeOfImageDefault();
  await createALinuxVmWithAPatchSettingPatchModeOfImageDefault();
  await createALinuxVmWithAPatchSettingsPatchModeAndAssessmentModeSetToAutomaticByPlatform();
  await createAPlatformImageVmWithUnmanagedOsAndDataDisks();
  await createAWindowsVmWithAPatchSettingPatchModeOfAutomaticByPlatformAndAutomaticByPlatformSettings();
  await createAWindowsVmWithAPatchSettingAssessmentModeOfImageDefault();
  await createAWindowsVmWithAPatchSettingPatchModeOfAutomaticByOS();
  await createAWindowsVmWithAPatchSettingPatchModeOfAutomaticByPlatformAndEnableHotpatchingSetToTrue();
  await createAWindowsVmWithAPatchSettingPatchModeOfManual();
  await createAWindowsVmWithPatchSettingsPatchModeAndAssessmentModeSetToAutomaticByPlatform();
  await createAVmWithEphemeralOsDisk();
  await createAVmWithEphemeralOsDiskProvisioningInCacheDiskUsingPlacementProperty();
  await createAVmWithEphemeralOsDiskProvisioningInNvmeDiskUsingPlacementProperty();
  await createAVmWithEphemeralOsDiskProvisioningInResourceDiskUsingPlacementProperty();
  await createAVmWithAMarketplaceImagePlan();
  await createAVmWithApplicationProfile();
  await createAVmWithBootDiagnostics();
  await createOrUpdateAVMWithCapacityReservation();
  await createAVmWithDataDisksUsingCopyAndRestoreOptions();
  await createAVMWithDiskControllerType();
  await createAVmWithDiskEncryptionSetResourceIdInTheOsDiskAndDataDisk();
  await createAVmWithEmptyDataDisks();
  await createAVmWithHostEncryptionUsingEncryptionAtHostProperty();
  await createAVMWithEncryptionIdentity();
  await createAVmWithAnExtensionsTimeBudget();
  await createAVMWithHibernationEnabled();
  await createAVmWithManagedBootDiagnostics();
  await createAVMWithNetworkInterfaceConfiguration();
  await createAVMWithNetworkInterfaceConfigurationWithPublicIpAddressDnsSettings();
  await createAVmWithPasswordAuthentication();
  await createAVMWithAutomaticZonePlacement();
  await createAVmWithPremiumStorage();
  await createAVMWithProxyAgentSettingsOfEnabledAndMode();
  await createAVmWithScheduledEventsProfile();
  await createAVMWithSecurityTypeConfidentialVMWithPlatformManagedKeys();
  await createAVMWithSecurityTypeConfidentialVMWithCustomerManagedKeys();
  await createAVMWithSecurityTypeConfidentialVMWithNonPersistedTPMSecurityEncryptionType();
  await createAVmWithSshAuthentication();
  await createAVMWithUefiSettingsOfSecureBootAndVTPM();
  await createAVMWithUserData();
  await createAVMWithVMSizeProperties();
}

main().catch(console.error);
