// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetVMsUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates a virtual machine of a VM scale set.
 *
 * @summary Updates a virtual machine of a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMs_Update_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMSUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaa";
  const instanceId = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetVMsUpdateParameters = {
    body: {
      location: "westus",
      plan: {
        name: "aaaaaaaaaa",
        product: "aaaaaaaaaaaaaaaaaaaa",
        promotionCode: "aaaaaaaaaaaaaaaaaaaa",
        publisher: "aaaaaaaaaaaaaaaaaaaaaa"
      },
      properties: {
        additionalCapabilities: {
          hibernationEnabled: true,
          ultraSSDEnabled: true
        },
        availabilitySet: {
          id:
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
        },
        diagnosticsProfile: {
          bootDiagnostics: { enabled: true, storageUri: "aaaaaaaaaaaaa" }
        },
        hardwareProfile: {
          vmSize: "Basic_A0",
          vmSizeProperties: { vCPUsAvailable: 9, vCPUsPerCore: 12 }
        },
        instanceView: {
          bootDiagnostics: {
            status: {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              displayStatus: "aaaaaa",
              level: "Info",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z")
            }
          },
          disks: [
            {
              name: "aaaaaaaaaaa",
              encryptionSettings: [
                {
                  diskEncryptionKey: {
                    secretUrl: "aaaaaaaa",
                    sourceVault: {
                      id:
                        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                    }
                  },
                  enabled: true,
                  keyEncryptionKey: {
                    keyUrl: "aaaaaaaaaaaaaa",
                    sourceVault: {
                      id:
                        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                    }
                  }
                }
              ],
              statuses: [
                {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  displayStatus: "aaaaaa",
                  level: "Info",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z")
                }
              ]
            }
          ],
          maintenanceRedeployStatus: {
            isCustomerInitiatedMaintenanceAllowed: true,
            lastOperationMessage: "aaaaaa",
            lastOperationResultCode: "None",
            maintenanceWindowEndTime: new Date("2021-11-30T12:58:26.531Z"),
            maintenanceWindowStartTime: new Date("2021-11-30T12:58:26.531Z"),
            preMaintenanceWindowEndTime: new Date("2021-11-30T12:58:26.531Z"),
            preMaintenanceWindowStartTime: new Date("2021-11-30T12:58:26.531Z")
          },
          placementGroupId: "aaa",
          platformFaultDomain: 14,
          platformUpdateDomain: 23,
          rdpThumbPrint: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
          statuses: [
            {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              displayStatus: "aaaaaa",
              level: "Info",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z")
            }
          ],
          vmAgent: {
            extensionHandlers: [
              {
                type: "aaaaaaaaaaaaa",
                status: {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  displayStatus: "aaaaaa",
                  level: "Info",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z")
                },
                typeHandlerVersion: "aaaaa"
              }
            ],
            statuses: [
              {
                code: "aaaaaaaaaaaaaaaaaaaaaaa",
                displayStatus: "aaaaaa",
                level: "Info",
                message: "a",
                time: new Date("2021-11-30T12:58:26.522Z")
              }
            ],
            vmAgentVersion: "aaaaaaaaaaaaaaaaaaaaaaa"
          },
          vmHealth: {
            status: {
              code: "aaaaaaaaaaaaaaaaaaaaaaa",
              displayStatus: "aaaaaa",
              level: "Info",
              message: "a",
              time: new Date("2021-11-30T12:58:26.522Z")
            }
          },
          extensions: [
            {
              name: "aaaaaaaaaaaaaaaaa",
              type: "aaaaaaaaa",
              statuses: [
                {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  displayStatus: "aaaaaa",
                  level: "Info",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z")
                }
              ],
              substatuses: [
                {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  displayStatus: "aaaaaa",
                  level: "Info",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z")
                }
              ],
              typeHandlerVersion: "aaaaaaaaaaaaaaaaaaaaaaaaaa"
            }
          ]
        },
        licenseType: "aaaaaaaaaa",
        networkProfile: {
          networkApiVersion: "2020-11-01",
          networkInterfaceConfigurations: [
            {
              name: "aaaaaaaaaaa",
              properties: {
                deleteOption: "Delete",
                dnsSettings: { dnsServers: ["aaaaaa"] },
                dscpConfiguration: {
                  id:
                    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                },
                enableAcceleratedNetworking: true,
                enableFpga: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "aa",
                    properties: {
                      applicationGatewayBackendAddressPools: [
                        {
                          id:
                            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                        }
                      ],
                      applicationSecurityGroups: [
                        {
                          id:
                            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                        }
                      ],
                      loadBalancerBackendAddressPools: [
                        {
                          id:
                            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                        }
                      ],
                      primary: true,
                      privateIPAddressVersion: "IPv4",
                      publicIPAddressConfiguration: {
                        name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        properties: {
                          deleteOption: "Delete",
                          dnsSettings: {
                            domainNameLabel: "aaaaaaaaaaaaaaaaaaaaaaaaa"
                          },
                          idleTimeoutInMinutes: 2,
                          ipTags: [
                            {
                              ipTagType: "aaaaaaaaaaaaaaaaaaaaaaaaa",
                              tag: "aaaaaaaaaaaaaaaaaaaa"
                            }
                          ],
                          publicIPAddressVersion: "IPv4",
                          publicIPAllocationMethod: "Dynamic",
                          publicIPPrefix: {
                            id:
                              "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                          }
                        },
                        sku: { name: "Basic", tier: "Regional" }
                      },
                      subnet: {
                        id:
                          "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                      }
                    }
                  }
                ],
                networkSecurityGroup: {
                  id:
                    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                },
                primary: true
              }
            }
          ],
          networkInterfaces: [
            {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachineScaleSets/{vmss-name}/virtualMachines/0/networkInterfaces/vmsstestnetconfig5415",
              properties: { deleteOption: "Delete", primary: true }
            }
          ]
        },
        networkProfileConfiguration: {
          networkInterfaceConfigurations: [
            {
              name: "vmsstestnetconfig5415",
              id: "aaaaaaaa",
              properties: {
                deleteOption: "Delete",
                dnsSettings: { dnsServers: [] },
                enableAcceleratedNetworking: true,
                enableFpga: true,
                enableIPForwarding: true,
                ipConfigurations: [
                  {
                    name: "vmsstestnetconfig9693",
                    id: "aaaaaaaaa",
                    properties: {
                      applicationGatewayBackendAddressPools: [
                        {
                          id:
                            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                        }
                      ],
                      applicationSecurityGroups: [
                        {
                          id:
                            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                        }
                      ],
                      loadBalancerBackendAddressPools: [
                        {
                          id:
                            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                        }
                      ],
                      loadBalancerInboundNatPools: [
                        {
                          id:
                            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                        }
                      ],
                      primary: true,
                      privateIPAddressVersion: "IPv4",
                      publicIPAddressConfiguration: {
                        name: "aaaaaaaaaaaaaaaaaa",
                        properties: {
                          deleteOption: "Delete",
                          dnsSettings: {
                            domainNameLabel: "aaaaaaaaaaaaaaaaaa"
                          },
                          idleTimeoutInMinutes: 18,
                          ipTags: [
                            {
                              ipTagType: "aaaaaaa",
                              tag: "aaaaaaaaaaaaaaaaaaaaaaaaaaa"
                            }
                          ],
                          publicIPAddressVersion: "IPv4",
                          publicIPPrefix: {
                            id:
                              "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                          }
                        },
                        sku: { name: "Basic", tier: "Regional" }
                      },
                      subnet: {
                        id:
                          "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/vn4071/subnets/sn5503"
                      }
                    }
                  }
                ],
                networkSecurityGroup: {
                  id:
                    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                },
                primary: true
              }
            }
          ]
        },
        osProfile: {
          adminPassword: "aaaaaaaaaaaaaaaa",
          adminUsername: "Foo12",
          allowExtensionOperations: true,
          computerName: "test000000",
          customData: "aaaa",
          linuxConfiguration: {
            disablePasswordAuthentication: true,
            patchSettings: {
              assessmentMode: "ImageDefault",
              patchMode: "ImageDefault"
            },
            provisionVMAgent: true,
            ssh: { publicKeys: [{ path: "aaa", keyData: "aaaaaa" }] }
          },
          requireGuestProvisionSignal: true,
          secrets: [],
          windowsConfiguration: {
            additionalUnattendContent: [
              {
                componentName: "Microsoft-Windows-Shell-Setup",
                content: "aaaaaaaaaaaaaaaaaaaa",
                passName: "OobeSystem",
                settingName: "AutoLogon"
              }
            ],
            enableAutomaticUpdates: true,
            patchSettings: {
              assessmentMode: "ImageDefault",
              enableHotpatching: true,
              patchMode: "Manual"
            },
            provisionVMAgent: true,
            timeZone: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
            winRM: {
              listeners: [
                { certificateUrl: "aaaaaaaaaaaaaaaaaaaaaa", protocol: "Http" }
              ]
            }
          }
        },
        protectionPolicy: {
          protectFromScaleIn: true,
          protectFromScaleSetActions: true
        },
        securityProfile: {
          encryptionAtHost: true,
          securityType: "TrustedLaunch",
          uefiSettings: { secureBootEnabled: true, vTpmEnabled: true }
        },
        storageProfile: {
          dataDisks: [
            {
              name:
                "vmss3176_vmss3176_0_disk2_6c4f554bdafa49baa780eb2d128ff39d",
              caching: "None",
              createOption: "Empty",
              deleteOption: "Delete",
              detachOption: "ForceDetach",
              diskSizeGB: 128,
              image: {
                uri:
                  "https://{storageAccountName}.blob.core.windows.net/{containerName}/{vhdName}.vhd"
              },
              lun: 1,
              managedDisk: {
                diskEncryptionSet: { id: "aaaaaaaaaaaa" },
                id:
                  "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_0_disk2_6c4f554bdafa49baa780eb2d128ff39d",
                storageAccountType: "Standard_LRS"
              },
              toBeDetached: true,
              vhd: {
                uri:
                  "https://{storageAccountName}.blob.core.windows.net/{containerName}/{vhdName}.vhd"
              },
              writeAcceleratorEnabled: true
            }
          ],
          imageReference: {
            id: "a",
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sharedGalleryImageId: "aaaaaaaaaaaaaaaaaaaa",
            sku: "2012-R2-Datacenter",
            version: "4.127.20180315"
          },
          osDisk: {
            name:
              "vmss3176_vmss3176_0_OsDisk_1_6d72b805e50e4de6830303c5055077fc",
            caching: "None",
            createOption: "FromImage",
            deleteOption: "Delete",
            diffDiskSettings: { option: "Local", placement: "CacheDisk" },
            diskSizeGB: 127,
            encryptionSettings: {
              diskEncryptionKey: {
                secretUrl: "aaaaaaaa",
                sourceVault: {
                  id:
                    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                }
              },
              enabled: true,
              keyEncryptionKey: {
                keyUrl: "aaaaaaaaaaaaaa",
                sourceVault: {
                  id:
                    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                }
              }
            },
            image: {
              uri:
                "https://{storageAccountName}.blob.core.windows.net/{containerName}/{vhdName}.vhd"
            },
            managedDisk: {
              diskEncryptionSet: { id: "aaaaaaaaaaaa" },
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_0_OsDisk_1_6d72b805e50e4de6830303c5055077fc",
              storageAccountType: "Standard_LRS"
            },
            osType: "Windows",
            vhd: {
              uri:
                "https://{storageAccountName}.blob.core.windows.net/{containerName}/{vhdName}.vhd"
            },
            writeAcceleratorEnabled: true
          }
        },
        userData: "RXhhbXBsZSBVc2VyRGF0YQ=="
      },
      sku: { name: "Classic", capacity: 29, tier: "aaaaaaaaaaaaaa" },
      tags: {}
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetVMSUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Updates a virtual machine of a VM scale set.
 *
 * @summary Updates a virtual machine of a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMs_Update_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMSUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaa";
  const instanceId = "aaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetVMsUpdateParameters = {
    body: { location: "westus" },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetVMSUpdateMinimumSetGen().catch(console.error);
