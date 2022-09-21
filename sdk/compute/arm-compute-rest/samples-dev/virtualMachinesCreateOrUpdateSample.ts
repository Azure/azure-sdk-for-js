// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachinesCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_LinuxVmWithPatchSettingAssessmentModeOfImageDefault.json
 */
async function createALinuxVMWithAPatchSettingAssessmentModeOfImageDefault() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D2s_v3" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          linuxConfiguration: {
            patchSettings: { assessmentMode: "ImageDefault" },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "UbuntuServer",
            publisher: "Canonical",
            sku: "16.04-LTS",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createALinuxVMWithAPatchSettingAssessmentModeOfImageDefault().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_LinuxVmWithAutomaticByPlatformSettings.json
 */
async function createALinuxVMWithAPatchSettingPatchModeOfAutomaticByPlatformAndAutomaticByPlatformSettings() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D2s_v3" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          linuxConfiguration: {
            patchSettings: {
              assessmentMode: "AutomaticByPlatform",
              automaticByPlatformSettings: { rebootSetting: "Never" },
              patchMode: "AutomaticByPlatform"
            },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "UbuntuServer",
            publisher: "Canonical",
            sku: "16.04-LTS",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createALinuxVMWithAPatchSettingPatchModeOfAutomaticByPlatformAndAutomaticByPlatformSettings().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_LinuxVmWithPatchSettingModeOfImageDefault.json
 */
async function createALinuxVMWithAPatchSettingPatchModeOfImageDefault() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D2s_v3" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          linuxConfiguration: {
            patchSettings: { patchMode: "ImageDefault" },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "UbuntuServer",
            publisher: "Canonical",
            sku: "16.04-LTS",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createALinuxVMWithAPatchSettingPatchModeOfImageDefault().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_LinuxVmWithPatchSettingModesOfAutomaticByPlatform.json
 */
async function createALinuxVMWithAPatchSettingsPatchModeAndAssessmentModeSetToAutomaticByPlatform() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D2s_v3" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          linuxConfiguration: {
            patchSettings: {
              assessmentMode: "AutomaticByPlatform",
              patchMode: "AutomaticByPlatform"
            },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "UbuntuServer",
            publisher: "Canonical",
            sku: "16.04-LTS",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createALinuxVMWithAPatchSettingsPatchModeAndAssessmentModeSetToAutomaticByPlatform().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_FromACommunityGalleryImage.json
 */
async function createAVMFromACommunityGalleryImage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            communityGalleryImageId:
              "/CommunityGalleries/galleryPublicName/Images/communityGalleryImageName/Versions/communityGalleryImageVersionName"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMFromACommunityGalleryImage().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_FromASharedGalleryImage.json
 */
async function createAVMFromASharedGalleryImage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            sharedGalleryImageId:
              "/SharedGalleries/sharedGalleryName/Images/sharedGalleryImageName/Versions/sharedGalleryImageVersionName"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMFromASharedGalleryImage().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithDiskControllerType.json
 */
async function createAVMWithDiskControllerType() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        diagnosticsProfile: {
          bootDiagnostics: {
            enabled: true,
            storageUri:
              "http://{existing-storage-account-name}.blob.core.windows.net"
          }
        },
        hardwareProfile: { vmSize: "Standard_D4_v3" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          diskControllerType: "NVMe",
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        },
        userData: "U29tZSBDdXN0b20gRGF0YQ=="
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithDiskControllerType().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithHibernationEnabled.json
 */
async function createAVMWithHibernationEnabled() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "{vm-name}";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "eastus2euap",
      properties: {
        additionalCapabilities: { hibernationEnabled: true },
        diagnosticsProfile: {
          bootDiagnostics: {
            enabled: true,
            storageUri:
              "http://{existing-storage-account-name}.blob.core.windows.net"
          }
        },
        hardwareProfile: { vmSize: "Standard_D2s_v3" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "{vm-name}"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2019-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "vmOSdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithHibernationEnabled().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithUefiSettings.json
 */
async function createAVMWithUefiSettingsOfSecureBootAndVTpm() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D2s_v3" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        securityProfile: {
          securityType: "TrustedLaunch",
          uefiSettings: { secureBootEnabled: true, vTpmEnabled: true }
        },
        storageProfile: {
          imageReference: {
            offer: "windowsserver-gen2preview-preview",
            publisher: "MicrosoftWindowsServer",
            sku: "windows10-tvm",
            version: "18363.592.2001092016"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadOnly",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "StandardSSD_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithUefiSettingsOfSecureBootAndVTpm().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithUserData.json
 */
async function createAVMWithUserData() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "{vm-name}";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        diagnosticsProfile: {
          bootDiagnostics: {
            enabled: true,
            storageUri:
              "http://{existing-storage-account-name}.blob.core.windows.net"
          }
        },
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "{vm-name}"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "vmOSdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        },
        userData: "RXhhbXBsZSBVc2VyRGF0YQ=="
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithUserData().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_CreateWithVMSizeProperties.json
 */
async function createAVMWithVMSizeProperties() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        diagnosticsProfile: {
          bootDiagnostics: {
            enabled: true,
            storageUri:
              "http://{existing-storage-account-name}.blob.core.windows.net"
          }
        },
        hardwareProfile: {
          vmSize: "Standard_D4_v3",
          vmSizeProperties: { vCPUsAvailable: 1, vCPUsPerCore: 1 }
        },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        },
        userData: "U29tZSBDdXN0b20gRGF0YQ=="
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithVMSizeProperties().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithNetworkInterfaceConfiguration.json
 */
async function createAVMWithNetworkInterfaceConfiguration() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkApiVersion: "2020-11-01",
          networkInterfaceConfigurations: [
            {
              name: "{nic-config-name}",
              properties: {
                deleteOption: "Delete",
                ipConfigurations: [
                  {
                    name: "{ip-config-name}",
                    properties: {
                      primary: true,
                      publicIPAddressConfiguration: {
                        name: "{publicIP-config-name}",
                        properties: {
                          deleteOption: "Detach",
                          publicIPAllocationMethod: "Static"
                        },
                        sku: { name: "Basic", tier: "Global" }
                      }
                    }
                  }
                ],
                primary: true
              }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithNetworkInterfaceConfiguration().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithSecurityTypeConfidentialVMWithCustomerManagedKeys.json
 */
async function createAVMWithSecurityTypeConfidentialVMWithCustomerManagedKeys() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_A5" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        securityProfile: {
          securityType: "ConfidentialVM",
          uefiSettings: { secureBootEnabled: true, vTpmEnabled: true }
        },
        storageProfile: {
          imageReference: {
            offer: "2019-datacenter-cvm",
            publisher: "MicrosoftWindowsServer",
            sku: "windows-cvm",
            version: "17763.2183.2109130127"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadOnly",
            createOption: "FromImage",
            managedDisk: {
              securityProfile: {
                diskEncryptionSet: {
                  id:
                    "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}"
                },
                securityEncryptionType: "DiskWithVMGuestState"
              },
              storageAccountType: "StandardSSD_LRS"
            }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithSecurityTypeConfidentialVMWithCustomerManagedKeys().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithSecurityTypeConfidentialVM.json
 */
async function createAVMWithSecurityTypeConfidentialVMWithPlatformManagedKeys() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_A5" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        securityProfile: {
          securityType: "ConfidentialVM",
          uefiSettings: { secureBootEnabled: true, vTpmEnabled: true }
        },
        storageProfile: {
          imageReference: {
            offer: "2019-datacenter-cvm",
            publisher: "MicrosoftWindowsServer",
            sku: "windows-cvm",
            version: "17763.2183.2109130127"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadOnly",
            createOption: "FromImage",
            managedDisk: {
              securityProfile: {
                securityEncryptionType: "DiskWithVMGuestState"
              },
              storageAccountType: "StandardSSD_LRS"
            }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithSecurityTypeConfidentialVMWithPlatformManagedKeys().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingAssessmentModeOfImageDefault.json
 */
async function createAWindowsVMWithAPatchSettingAssessmentModeOfImageDefault() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          windowsConfiguration: {
            enableAutomaticUpdates: true,
            patchSettings: { assessmentMode: "ImageDefault" },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAWindowsVMWithAPatchSettingAssessmentModeOfImageDefault().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingModeOfAutomaticByOS.json
 */
async function createAWindowsVMWithAPatchSettingPatchModeOfAutomaticByOS() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/nsgExistingNic",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          windowsConfiguration: {
            enableAutomaticUpdates: true,
            patchSettings: { patchMode: "AutomaticByOS" },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAWindowsVMWithAPatchSettingPatchModeOfAutomaticByOS().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithAutomaticByPlatformSettings.json
 */
async function createAWindowsVMWithAPatchSettingPatchModeOfAutomaticByPlatformAndAutomaticByPlatformSettings() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          windowsConfiguration: {
            enableAutomaticUpdates: true,
            patchSettings: {
              assessmentMode: "AutomaticByPlatform",
              automaticByPlatformSettings: { rebootSetting: "Never" },
              patchMode: "AutomaticByPlatform"
            },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAWindowsVMWithAPatchSettingPatchModeOfAutomaticByPlatformAndAutomaticByPlatformSettings().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingModeOfAutomaticByPlatformAndEnableHotPatchingTrue.json
 */
async function createAWindowsVMWithAPatchSettingPatchModeOfAutomaticByPlatformAndEnableHotpatchingSetToTrue() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          windowsConfiguration: {
            enableAutomaticUpdates: true,
            patchSettings: {
              enableHotpatching: true,
              patchMode: "AutomaticByPlatform"
            },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAWindowsVMWithAPatchSettingPatchModeOfAutomaticByPlatformAndEnableHotpatchingSetToTrue().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingModeOfManual.json
 */
async function createAWindowsVMWithAPatchSettingPatchModeOfManual() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          windowsConfiguration: {
            enableAutomaticUpdates: true,
            patchSettings: { patchMode: "Manual" },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAWindowsVMWithAPatchSettingPatchModeOfManual().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WindowsVmWithPatchSettingModesOfAutomaticByPlatform.json
 */
async function createAWindowsVMWithPatchSettingsPatchModeAndAssessmentModeSetToAutomaticByPlatform() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
          windowsConfiguration: {
            enableAutomaticUpdates: true,
            patchSettings: {
              assessmentMode: "AutomaticByPlatform",
              patchMode: "AutomaticByPlatform"
            },
            provisionVMAgent: true
          }
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAWindowsVMWithPatchSettingsPatchModeAndAssessmentModeSetToAutomaticByPlatform().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_CustomImageVmFromAnUnmanagedGeneralizedOsImage.json
 */
async function createACustomImageVMFromAnUnmanagedGeneralizedOSImage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "{vm-name}";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            image: {
              uri:
                "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/{existing-generalized-os-image-blob-name}.vhd"
            },
            osType: "Windows",
            vhd: {
              uri:
                "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk.vhd"
            }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createACustomImageVMFromAnUnmanagedGeneralizedOSImage().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_PlatformImageVmWithUnmanagedOsAndDataDisks.json
 */
async function createAPlatformImageVMWithUnmanagedOSAndDataDisks() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "{vm-name}";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D2_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          dataDisks: [
            {
              createOption: "Empty",
              diskSizeGB: 1023,
              lun: 0,
              vhd: {
                uri:
                  "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk0.vhd"
              }
            },
            {
              createOption: "Empty",
              diskSizeGB: 1023,
              lun: 1,
              vhd: {
                uri:
                  "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk1.vhd"
              }
            }
          ],
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            vhd: {
              uri:
                "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk.vhd"
            }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAPlatformImageVMWithUnmanagedOSAndDataDisks().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_FromACustomImage.json
 */
async function createAVMFromACustomImage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            id:
              "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/images/{existing-custom-image-name}"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMFromACustomImage().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_FromAGeneralizedSharedImage.json
 */
async function createAVMFromAGeneralizedSharedImage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            id:
              "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/galleries/mySharedGallery/images/mySharedImage"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMFromAGeneralizedSharedImage().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_FromASpecializedSharedImage.json
 */
async function createAVMFromASpecializedSharedImage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        storageProfile: {
          imageReference: {
            id:
              "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/galleries/mySharedGallery/images/mySharedImage"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMFromASpecializedSharedImage().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMacine_Create_InAVmssWithCustomerAssignedPlatformFaultDomain.json
 */
async function createAVMInAVirtualMachineScaleSetWithCustomerAssignedPlatformFaultDomain() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        platformFaultDomain: 1,
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        },
        virtualMachineScaleSet: {
          id:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachineScaleSets/{existing-flex-vmss-name-with-platformFaultDomainCount-greater-than-1}"
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMInAVirtualMachineScaleSetWithCustomerAssignedPlatformFaultDomain().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_InAnAvailabilitySet.json
 */
async function createAVMInAnAvailabilitySet() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        availabilitySet: {
          id:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/availabilitySets/{existing-availability-set-name}"
        },
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMInAnAvailabilitySet().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithApplicationProfile.json
 */
async function createAVMWithApplicationProfile() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        applicationProfile: {
          galleryApplications: [
            {
              configurationReference:
                "https://mystorageaccount.blob.core.windows.net/configurations/settings.config",
              enableAutomaticUpgrade: false,
              order: 1,
              packageReferenceId:
                "/subscriptions/32c17a9e-aa7b-4ba5-a45b-e324116b6fdb/resourceGroups/myresourceGroupName2/providers/Microsoft.Compute/galleries/myGallery1/applications/MyApplication1/versions/1.0",
              tags: "myTag1",
              treatFailureAsDeploymentFailure: false
            },
            {
              packageReferenceId:
                "/subscriptions/32c17a9e-aa7b-4ba5-a45b-e324116b6fdg/resourceGroups/myresourceGroupName3/providers/Microsoft.Compute/galleries/myGallery2/applications/MyApplication2/versions/1.1"
            }
          ]
        },
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "{image_offer}",
            publisher: "{image_publisher}",
            sku: "{image_sku}",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithApplicationProfile().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithDiskEncryptionSetResource.json
 */
async function createAVMWithDiskEncryptionSetResourceIdInTheOSDiskAndDataDisk() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          dataDisks: [
            {
              caching: "ReadWrite",
              createOption: "Empty",
              diskSizeGB: 1023,
              lun: 0,
              managedDisk: {
                diskEncryptionSet: {
                  id:
                    "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}"
                },
                storageAccountType: "Standard_LRS"
              }
            },
            {
              caching: "ReadWrite",
              createOption: "Attach",
              diskSizeGB: 1023,
              lun: 1,
              managedDisk: {
                diskEncryptionSet: {
                  id:
                    "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}"
                },
                id:
                  "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/{existing-managed-disk-name}",
                storageAccountType: "Standard_LRS"
              }
            }
          ],
          imageReference: {
            id:
              "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/images/{existing-custom-image-name}"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: {
              diskEncryptionSet: {
                id:
                  "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}"
              },
              storageAccountType: "Standard_LRS"
            }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithDiskEncryptionSetResourceIdInTheOSDiskAndDataDisk().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithEncryptionAtHost.json
 */
async function createAVMWithHostEncryptionUsingEncryptionAtHostProperty() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      plan: {
        name: "windows2016",
        product: "windows-data-science-vm",
        publisher: "microsoft-ads"
      },
      properties: {
        hardwareProfile: { vmSize: "Standard_DS1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        securityProfile: { encryptionAtHost: true },
        storageProfile: {
          imageReference: {
            offer: "windows-data-science-vm",
            publisher: "microsoft-ads",
            sku: "windows2016",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadOnly",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithHostEncryptionUsingEncryptionAtHostProperty().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithScheduledEventsProfile.json
 */
async function createAVMWithScheduledEventsProfile() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        diagnosticsProfile: {
          bootDiagnostics: {
            enabled: true,
            storageUri:
              "http://{existing-storage-account-name}.blob.core.windows.net"
          }
        },
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        scheduledEventsProfile: {
          terminateNotificationProfile: {
            enable: true,
            notBeforeTimeout: "PT10M"
          }
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithScheduledEventsProfile().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithAMarketplaceImagePlan.json
 */
async function createAVMWithAMarketplaceImagePlan() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      plan: {
        name: "windows2016",
        product: "windows-data-science-vm",
        publisher: "microsoft-ads"
      },
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "windows-data-science-vm",
            publisher: "microsoft-ads",
            sku: "windows2016",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithAMarketplaceImagePlan().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithExtensionsTimeBudget.json
 */
async function createAVMWithAnExtensionsTimeBudget() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        diagnosticsProfile: {
          bootDiagnostics: {
            enabled: true,
            storageUri:
              "http://{existing-storage-account-name}.blob.core.windows.net"
          }
        },
        extensionsTimeBudget: "PT30M",
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithAnExtensionsTimeBudget().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMacine_Create_WithBootDiagnostics.json
 */
async function createAVMWithBootDiagnostics() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        diagnosticsProfile: {
          bootDiagnostics: {
            enabled: true,
            storageUri:
              "http://{existing-storage-account-name}.blob.core.windows.net"
          }
        },
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithBootDiagnostics().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithEmptyDataDisks.json
 */
async function createAVMWithEmptyDataDisks() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D2_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          dataDisks: [
            { createOption: "Empty", diskSizeGB: 1023, lun: 0 },
            { createOption: "Empty", diskSizeGB: 1023, lun: 1 }
          ],
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithEmptyDataDisks().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithADiffOsDiskUsingDiffDiskPlacementAsCacheDisk.json
 */
async function createAVMWithEphemeralOSDiskProvisioningInCacheDiskUsingPlacementProperty() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      plan: {
        name: "windows2016",
        product: "windows-data-science-vm",
        publisher: "microsoft-ads"
      },
      properties: {
        hardwareProfile: { vmSize: "Standard_DS1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "windows-data-science-vm",
            publisher: "microsoft-ads",
            sku: "windows2016",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadOnly",
            createOption: "FromImage",
            diffDiskSettings: { option: "Local", placement: "CacheDisk" },
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithEphemeralOSDiskProvisioningInCacheDiskUsingPlacementProperty().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithADiffOsDiskUsingDiffDiskPlacementAsResourceDisk.json
 */
async function createAVMWithEphemeralOSDiskProvisioningInResourceDiskUsingPlacementProperty() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      plan: {
        name: "windows2016",
        product: "windows-data-science-vm",
        publisher: "microsoft-ads"
      },
      properties: {
        hardwareProfile: { vmSize: "Standard_DS1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "windows-data-science-vm",
            publisher: "microsoft-ads",
            sku: "windows2016",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadOnly",
            createOption: "FromImage",
            diffDiskSettings: { option: "Local", placement: "ResourceDisk" },
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithEphemeralOSDiskProvisioningInResourceDiskUsingPlacementProperty().catch(
  console.error
);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithADiffOsDisk.json
 */
async function createAVMWithEphemeralOSDisk() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      plan: {
        name: "windows2016",
        product: "windows-data-science-vm",
        publisher: "microsoft-ads"
      },
      properties: {
        hardwareProfile: { vmSize: "Standard_DS1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "windows-data-science-vm",
            publisher: "microsoft-ads",
            sku: "windows2016",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadOnly",
            createOption: "FromImage",
            diffDiskSettings: { option: "Local" },
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithEphemeralOSDisk().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithManagedBootDiagnostics.json
 */
async function createAVMWithManagedBootDiagnostics() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        diagnosticsProfile: { bootDiagnostics: { enabled: true } },
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithManagedBootDiagnostics().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithPasswordAuthentication.json
 */
async function createAVMWithPasswordAuthentication() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithPasswordAuthentication().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithPremiumStorage.json
 */
async function createAVMWithPremiumStorage() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Premium_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithPremiumStorage().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithSshAuthentication.json
 */
async function createAVMWithSshAuthentication() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        hardwareProfile: { vmSize: "Standard_D1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminUsername: "{your-username}",
          computerName: "myVM",
          linuxConfiguration: {
            disablePasswordAuthentication: true,
            ssh: {
              publicKeys: [
                {
                  path: "/home/{your-username}/.ssh/authorized_keys",
                  keyData:
                    "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCeClRAk2ipUs/l5voIsDC5q9RI+YSRd1Bvd/O+axgY4WiBzG+4FwJWZm/mLLe5DoOdHQwmU2FrKXZSW4w2sYE70KeWnrFViCOX5MTVvJgPE8ClugNl8RWth/tU849DvM9sT7vFgfVSHcAS2yDRyDlueii+8nF2ym8XWAPltFVCyLHRsyBp5YPqK8JFYIa1eybKsY3hEAxRCA+/7bq8et+Gj3coOsuRmrehav7rE6N12Pb80I6ofa6SM5XNYq4Xk0iYNx7R3kdz0Jj9XgZYWjAHjJmT0gTRoOnt6upOuxK7xI/ykWrllgpXrCPu3Ymz+c+ujaqcxDopnAl2lmf69/J1"
                }
              ]
            }
          }
        },
        storageProfile: {
          imageReference: {
            offer: "{image_offer}",
            publisher: "{image_publisher}",
            sku: "{image_sku}",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createAVMWithSshAuthentication().catch(console.error);
/**
 * This sample demonstrates how to The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 *
 * @summary The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Create_WithCapacityReservation.json
 */
async function createOrUpdateAVMWithCapacityReservation() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesCreateOrUpdateParameters = {
    body: {
      location: "westus",
      plan: {
        name: "windows2016",
        product: "windows-data-science-vm",
        publisher: "microsoft-ads"
      },
      properties: {
        capacityReservation: {
          capacityReservationGroup: {
            id:
              "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/CapacityReservationGroups/{crgName}"
          }
        },
        hardwareProfile: { vmSize: "Standard_DS1_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true }
            }
          ]
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM"
        },
        storageProfile: {
          imageReference: {
            offer: "windows-data-science-vm",
            publisher: "microsoft-ads",
            sku: "windows2016",
            version: "latest"
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadOnly",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" }
          }
        }
      }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateAVMWithCapacityReservation().catch(console.error);
