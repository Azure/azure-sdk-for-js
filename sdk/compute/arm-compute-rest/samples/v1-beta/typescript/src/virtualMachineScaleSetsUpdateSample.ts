// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetsUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Update a VM scale set.
 *
 * @summary Update a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_Update_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsUpdateParameters = {
    body: {
      identity: {
        type: "SystemAssigned",
        userAssignedIdentities: { key3951: {} }
      },
      plan: {
        name: "windows2016",
        product: "windows-data-science-vm",
        promotionCode: "aaaaaaaaaa",
        publisher: "microsoft-ads"
      },
      properties: {
        additionalCapabilities: {
          hibernationEnabled: true,
          ultraSSDEnabled: true
        },
        automaticRepairsPolicy: { enabled: true, gracePeriod: "PT30M" },
        doNotRunExtensionsOnOverprovisionedVMs: true,
        overprovision: true,
        proximityPlacementGroup: {
          id:
            "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
        },
        scaleInPolicy: { forceDeletion: true, rules: ["OldestVM"] },
        singlePlacementGroup: true,
        upgradePolicy: {
          automaticOSUpgradePolicy: {
            disableAutomaticRollback: true,
            enableAutomaticOSUpgrade: true
          },
          mode: "Manual",
          rollingUpgradePolicy: {
            enableCrossZoneUpgrade: true,
            maxBatchInstancePercent: 49,
            maxUnhealthyInstancePercent: 81,
            maxUnhealthyUpgradedInstancePercent: 98,
            pauseTimeBetweenBatches: "aaaaaaaaaaaaaaa",
            prioritizeUnhealthyInstances: true
          }
        },
        virtualMachineProfile: {
          billingProfile: { maxPrice: -1 },
          diagnosticsProfile: {
            bootDiagnostics: {
              enabled: true,
              storageUri:
                "http://{existing-storage-account-name}.blob.core.windows.net"
            }
          },
          extensionProfile: {
            extensionsTimeBudget: "PT1H20M",
            extensions: [
              {
                name: "{extension-name}",
                properties: {
                  type: "{extension-Type}",
                  autoUpgradeMinorVersion: true,
                  enableAutomaticUpgrade: true,
                  forceUpdateTag: "aaaaaaaaa",
                  protectedSettings: {},
                  provisionAfterExtensions: ["aa"],
                  publisher: "{extension-Publisher}",
                  settings: {},
                  suppressFailures: true,
                  typeHandlerVersion: "{handler-version}"
                }
              }
            ]
          },
          licenseType: "aaaaaaaaaaaa",
          networkProfile: {
            healthProbe: {
              id:
                "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/disk123"
            },
            networkApiVersion: "2020-11-01",
            networkInterfaceConfigurations: [
              {
                name: "aaaaaaaa",
                id: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                properties: {
                  deleteOption: "Delete",
                  dnsSettings: { dnsServers: [] },
                  enableAcceleratedNetworking: true,
                  enableFpga: true,
                  enableIPForwarding: true,
                  ipConfigurations: [
                    {
                      name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                      id: "aaaaaaaaaaaaaaaa",
                      properties: {
                        applicationGatewayBackendAddressPools: [
                          {
                            id:
                              "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
                          }
                        ],
                        applicationSecurityGroups: [
                          {
                            id:
                              "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
                          }
                        ],
                        loadBalancerBackendAddressPools: [
                          {
                            id:
                              "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
                          }
                        ],
                        loadBalancerInboundNatPools: [
                          {
                            id:
                              "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
                          }
                        ],
                        primary: true,
                        privateIPAddressVersion: "IPv4",
                        publicIPAddressConfiguration: {
                          name: "a",
                          properties: {
                            deleteOption: "Delete",
                            dnsSettings: {
                              domainNameLabel: "aaaaaaaaaaaaaaaaaa"
                            },
                            idleTimeoutInMinutes: 3
                          }
                        },
                        subnet: {
                          id:
                            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/disk123"
                        }
                      }
                    }
                  ],
                  networkSecurityGroup: {
                    id:
                      "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot"
                  },
                  primary: true
                }
              }
            ]
          },
          osProfile: {
            customData: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
            linuxConfiguration: {
              disablePasswordAuthentication: true,
              patchSettings: {
                assessmentMode: "ImageDefault",
                patchMode: "ImageDefault"
              },
              provisionVMAgent: true,
              ssh: {
                publicKeys: [
                  {
                    path: "/home/{your-username}/.ssh/authorized_keys",
                    keyData:
                      "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCeClRAk2ipUs/l5voIsDC5q9RI+YSRd1Bvd/O+axgY4WiBzG+4FwJWZm/mLLe5DoOdHQwmU2FrKXZSW4w2sYE70KeWnrFViCOX5MTVvJgPE8ClugNl8RWth/tU849DvM9sT7vFgfVSHcAS2yDRyDlueii+8nF2ym8XWAPltFVCyLHRsyBp5YPqK8JFYIa1eybKsY3hEAxRCA+/7bq8et+Gj3coOsuRmrehav7rE6N12Pb80I6ofa6SM5XNYq4Xk0iYNx7R3kdz0Jj9XgZYWjAHjJmT0gTRoOnt6upOuxK7xI/ykWrllgpXrCPu3Ymz+c+ujaqcxDopnAl2lmf69/J1"
                  }
                ]
              }
            },
            secrets: [
              {
                sourceVault: {
                  id:
                    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
                },
                vaultCertificates: [
                  {
                    certificateStore: "aaaaaaaaaaaaaaaaaaaaaaaaa",
                    certificateUrl: "aaaaaaa"
                  }
                ]
              }
            ],
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
                automaticByPlatformSettings: { rebootSetting: "Never" },
                enableHotpatching: true,
                patchMode: "AutomaticByPlatform"
              },
              provisionVMAgent: true,
              timeZone: "aaaaaaaaaaaaaaaa",
              winRM: {
                listeners: [
                  { certificateUrl: "aaaaaaaaaaaaaaaaaaaaaa", protocol: "Http" }
                ]
              }
            }
          },
          scheduledEventsProfile: {
            terminateNotificationProfile: {
              enable: true,
              notBeforeTimeout: "PT10M"
            }
          },
          securityProfile: {
            encryptionAtHost: true,
            securityType: "TrustedLaunch",
            uefiSettings: { secureBootEnabled: true, vTpmEnabled: true }
          },
          storageProfile: {
            dataDisks: [
              {
                name: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
                caching: "None",
                createOption: "Empty",
                diskIOPSReadWrite: 28,
                diskMBpsReadWrite: 15,
                diskSizeGB: 1023,
                lun: 26,
                managedDisk: {
                  diskEncryptionSet: { id: "aaaaaaaaaaaa" },
                  storageAccountType: "Standard_LRS"
                },
                writeAcceleratorEnabled: true
              }
            ],
            imageReference: {
              id: "aaaaaaaaaaaaaaaaaaa",
              offer: "WindowsServer",
              publisher: "MicrosoftWindowsServer",
              sharedGalleryImageId: "aaaaaa",
              sku: "2016-Datacenter",
              version: "latest"
            },
            osDisk: {
              caching: "ReadWrite",
              diskSizeGB: 6,
              image: {
                uri:
                  "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk.vhd"
              },
              managedDisk: {
                diskEncryptionSet: { id: "aaaaaaaaaaaa" },
                storageAccountType: "Standard_LRS"
              },
              vhdContainers: ["aa"],
              writeAcceleratorEnabled: true
            }
          },
          userData: "aaaaaaaaaaaaa"
        }
      },
      sku: { name: "DSv3-Type1", capacity: 7, tier: "aaa" },
      tags: { key246: "aaaaaaaaaaaaaaaaaaaaaaaa" }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Update a VM scale set.
 *
 * @summary Update a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_Update_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsUpdateMinimumSetGen().catch(console.error);
