// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a VM scale set.
 *
 * @summary update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Update_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.update("rgcompute", "aaaaaaaaaaaaa", {
    sku: { name: "DSv3-Type1", tier: "aaa", capacity: 7 },
    plan: {
      publisher: "microsoft-ads",
      product: "windows-data-science-vm",
      name: "windows2016",
      promotionCode: "aaaaaaaaaa",
    },
    properties: {
      upgradePolicy: {
        mode: "Manual",
        rollingUpgradePolicy: {
          maxBatchInstancePercent: 49,
          maxUnhealthyInstancePercent: 81,
          maxUnhealthyUpgradedInstancePercent: 98,
          pauseTimeBetweenBatches: "aaaaaaaaaaaaaaa",
          enableCrossZoneUpgrade: true,
          prioritizeUnhealthyInstances: true,
          rollbackFailedInstancesOnPolicyBreach: true,
          maxSurge: true,
        },
        automaticOSUpgradePolicy: {
          enableAutomaticOSUpgrade: true,
          disableAutomaticRollback: true,
          osRollingUpgradeDeferral: true,
        },
      },
      automaticRepairsPolicy: { enabled: true, gracePeriod: "PT30M" },
      virtualMachineProfile: {
        osProfile: {
          customData: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
          windowsConfiguration: {
            provisionVMAgent: true,
            enableAutomaticUpdates: true,
            patchSettings: {
              patchMode: "AutomaticByPlatform",
              enableHotpatching: true,
              assessmentMode: "ImageDefault",
              automaticByPlatformSettings: { rebootSetting: "Never" },
            },
            timeZone: "aaaaaaaaaaaaaaaa",
            additionalUnattendContent: [
              {
                passName: "OobeSystem",
                componentName: "Microsoft-Windows-Shell-Setup",
                settingName: "AutoLogon",
                content: "aaaaaaaaaaaaaaaaaaaa",
              },
            ],
            winRM: {
              listeners: [{ protocol: "Http", certificateUrl: "aaaaaaaaaaaaaaaaaaaaaa" }],
            },
          },
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
            provisionVMAgent: true,
            patchSettings: {
              patchMode: "ImageDefault",
              assessmentMode: "ImageDefault",
            },
          },
          secrets: [
            {
              sourceVault: {
                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
              },
              vaultCertificates: [
                {
                  certificateUrl: "aaaaaaa",
                  certificateStore: "aaaaaaaaaaaaaaaaaaaaaaaaa",
                },
              ],
            },
          ],
        },
        storageProfile: {
          imageReference: {
            sku: "2016-Datacenter",
            publisher: "MicrosoftWindowsServer",
            version: "latest",
            offer: "WindowsServer",
            sharedGalleryImageId: "aaaaaa",
            id: "aaaaaaaaaaaaaaaaaaa",
          },
          osDisk: {
            caching: "ReadWrite",
            writeAcceleratorEnabled: true,
            diffDiskSettings: { option: "Local", placement: "CacheDisk" },
            diskSizeGB: 6,
            image: {
              uri: "http://{existing-storage-account-name}.blob.core.windows.net/{existing-container-name}/myDisk.vhd",
            },
            vhdContainers: ["aa"],
            managedDisk: {
              storageAccountType: "Standard_LRS",
              diskEncryptionSet: { id: "aaaaaaaaaaaa" },
            },
          },
          dataDisks: [
            {
              diskSizeGB: 1023,
              createOption: "Empty",
              lun: 26,
              name: "aaaaaaaaaaaaaaaaaaaaaaaaaa",
              caching: "None",
              writeAcceleratorEnabled: true,
              managedDisk: {
                storageAccountType: "Standard_LRS",
                diskEncryptionSet: { id: "aaaaaaaaaaaa" },
              },
              diskIopsReadWrite: 28,
              diskMBpsReadWrite: 15,
            },
          ],
        },
        networkProfile: {
          healthProbe: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/disk123",
          },
          networkInterfaceConfigurations: [
            {
              name: "aaaaaaaa",
              properties: {
                primary: true,
                enableAcceleratedNetworking: true,
                enableFpga: true,
                networkSecurityGroup: {
                  id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
                },
                dnsSettings: { dnsServers: [] },
                ipConfigurations: [
                  {
                    name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    properties: {
                      subnet: {
                        id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/disk123",
                      },
                      primary: true,
                      publicIPAddressConfiguration: {
                        name: "a",
                        properties: {
                          idleTimeoutInMinutes: 3,
                          dnsSettings: {
                            domainNameLabel: "aaaaaaaaaaaaaaaaaa",
                          },
                          deleteOption: "Delete",
                        },
                      },
                      privateIPAddressVersion: "IPv4",
                      applicationGatewayBackendAddressPools: [
                        {
                          id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
                        },
                      ],
                      applicationSecurityGroups: [
                        {
                          id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
                        },
                      ],
                      loadBalancerBackendAddressPools: [
                        {
                          id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
                        },
                      ],
                      loadBalancerInboundNatPools: [
                        {
                          id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
                        },
                      ],
                    },
                  },
                ],
                enableIPForwarding: true,
                deleteOption: "Delete",
              },
            },
          ],
          networkApiVersion: "2020-11-01",
        },
        securityProfile: {
          encryptionAtHost: true,
          uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
          securityType: "TrustedLaunch",
        },
        diagnosticsProfile: {
          bootDiagnostics: {
            storageUri: "http://{existing-storage-account-name}.blob.core.windows.net",
            enabled: true,
          },
        },
        extensionProfile: {
          extensions: [
            {
              name: "{extension-name}",
              properties: {
                autoUpgradeMinorVersion: true,
                publisher: "{extension-Publisher}",
                type: "{extension-Type}",
                typeHandlerVersion: "{handler-version}",
                settings: {},
                forceUpdateTag: "aaaaaaaaa",
                enableAutomaticUpgrade: true,
                protectedSettings: {},
                provisionAfterExtensions: ["aa"],
                suppressFailures: true,
              },
            },
          ],
          extensionsTimeBudget: "PT1H20M",
        },
        licenseType: "aaaaaaaaaaaa",
        billingProfile: { maxPrice: -1 },
        scheduledEventsProfile: {
          terminateNotificationProfile: {
            notBeforeTimeout: "PT10M",
            enable: true,
          },
        },
        userData: "aaaaaaaaaaaaa",
      },
      overprovision: true,
      doNotRunExtensionsOnOverprovisionedVMs: true,
      singlePlacementGroup: true,
      additionalCapabilities: {
        hibernationEnabled: true,
        ultraSSDEnabled: true,
      },
      scaleInPolicy: { rules: ["OldestVM"], forceDeletion: true },
      proximityPlacementGroup: {
        id: "subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/snapshots/mySnapshot",
      },
    },
    identity: {
      type: "SystemAssigned",
      userAssignedIdentities: { key3951: {} },
    },
    zones: ["1", "2", "3"],
    tags: { key246: "aaaaaaaaaaaaaaaaaaaaaaaa" },
  });
}

/**
 * This sample demonstrates how to update a VM scale set.
 *
 * @summary update a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Update_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.update("rgcompute", "aaaaaaaaaaaaaa", {});
}

async function main(): Promise<void> {
  await virtualMachineScaleSetUpdateMaximumSetGen();
  await virtualMachineScaleSetUpdateMinimumSetGen();
}

main().catch(console.error);
