// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Fleet
 *
 * @summary create a Fleet
 * x-ms-original-file: 2025-07-01-preview/Fleets_CreateOrUpdate.json
 */
async function fleetsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const result = await client.fleets.createOrUpdate("rgazurefleet", "myFleet", {
    properties: {
      spotPriorityProfile: {
        capacity: 20,
        minCapacity: 10,
        maxPricePerVM: 0.00865,
        evictionPolicy: "Delete",
        allocationStrategy: "PriceCapacityOptimized",
        maintain: true,
      },
      regularPriorityProfile: {
        capacity: 20,
        minCapacity: 10,
        allocationStrategy: "Prioritized",
      },
      vmSizesProfile: [
        { name: "Standard_D1_v2", rank: 0 },
        { name: "Standard_D2_v2", rank: 1 },
      ],
      computeProfile: {
        baseVirtualMachineProfile: {
          osProfile: {
            computerNamePrefix: "o",
            adminUsername: "nrgzqciiaaxjrqldbmjbqkyhntp",
            adminPassword: "adfbrdxpv",
            customData: "xjjib",
            windowsConfiguration: {
              provisionVMAgent: true,
              enableAutomaticUpdates: true,
              timeZone: "hlyjiqcfksgrpjrct",
              additionalUnattendContent: [
                {
                  passName: "OobeSystem",
                  componentName: "Microsoft-Windows-Shell-Setup",
                  settingName: "AutoLogon",
                  content: "bubmqbxjkj",
                },
              ],
              patchSettings: {
                patchMode: "Manual",
                enableHotpatching: true,
                assessmentMode: "ImageDefault",
                automaticByPlatformSettings: {
                  rebootSetting: "Unknown",
                  bypassPlatformSafetyChecksOnUserSchedule: true,
                },
              },
              winRM: {
                listeners: [
                  {
                    protocol: "Https",
                    certificateUrl: "https://myVaultName.vault.azure.net/secrets/myCertName",
                  },
                ],
              },
              enableVMAgentPlatformUpdates: true,
            },
            linuxConfiguration: {
              disablePasswordAuthentication: true,
              ssh: {
                publicKeys: [{ path: "kmqz", keyData: "kivgsubusvpprwqaqpjcmhsv" }],
              },
              provisionVMAgent: true,
              patchSettings: {
                patchMode: "ImageDefault",
                assessmentMode: "ImageDefault",
                automaticByPlatformSettings: {
                  rebootSetting: "Unknown",
                  bypassPlatformSafetyChecksOnUserSchedule: true,
                },
              },
              enableVMAgentPlatformUpdates: true,
            },
            secrets: [
              {
                sourceVault: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}",
                },
                vaultCertificates: [
                  {
                    certificateUrl: "https://myVaultName.vault.azure.net/secrets/myCertName",
                    certificateStore: "nlxrwavpzhueffxsshlun",
                  },
                ],
              },
            ],
            allowExtensionOperations: true,
            requireGuestProvisionSignal: true,
          },
          storageProfile: {
            imageReference: {
              publisher: "mqxgwbiyjzmxavhbkd",
              offer: "isxgumkarlkomp",
              sku: "eojmppqcrnpmxirtp",
              version: "wvpcqefgtmqdgltiuz",
              sharedGalleryImageId: "kmkgihoxwlawuuhcinfirktdwkmx",
              communityGalleryImageId: "vlqe",
              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}/versions/{versionName}",
            },
            osDisk: {
              name: "wfttw",
              caching: "None",
              writeAcceleratorEnabled: true,
              createOption: "FromImage",
              diffDiskSettings: { option: "Local", placement: "CacheDisk" },
              diskSizeGB: 14,
              osType: "Windows",
              image: {
                uri: "https://myStorageAccountName.blob.core.windows.net/myContainerName/myVhdName.vhd",
              },
              vhdContainers: ["tkzcwddtinkfpnfklatw"],
              managedDisk: {
                storageAccountType: "Standard_LRS",
                diskEncryptionSet: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
                },
                securityProfile: {
                  securityEncryptionType: "VMGuestStateOnly",
                  diskEncryptionSet: {
                    id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
                  },
                },
              },
              deleteOption: "Delete",
            },
            dataDisks: [
              {
                name: "eogiykmdmeikswxmigjws",
                lun: 14,
                caching: "None",
                writeAcceleratorEnabled: true,
                createOption: "FromImage",
                diskSizeGB: 6,
                managedDisk: {
                  storageAccountType: "Standard_LRS",
                  diskEncryptionSet: {
                    id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
                  },
                  securityProfile: {
                    securityEncryptionType: "VMGuestStateOnly",
                    diskEncryptionSet: {
                      id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
                    },
                  },
                },
                diskIopsReadWrite: 27,
                diskMBpsReadWrite: 2,
                deleteOption: "Delete",
              },
            ],
            diskControllerType: "uzb",
          },
          networkProfile: {
            healthProbe: {
              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}",
            },
            networkInterfaceConfigurations: [
              {
                name: "i",
                properties: {
                  primary: true,
                  enableAcceleratedNetworking: true,
                  disableTcpStateTracking: true,
                  enableFpga: true,
                  networkSecurityGroup: {
                    id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}",
                  },
                  dnsSettings: { dnsServers: ["nxmmfolhclsesu"] },
                  ipConfigurations: [
                    {
                      name: "oezqhkidfhyywlfzwuotilrpbqnjg",
                      properties: {
                        subnet: {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
                        },
                        primary: true,
                        publicIPAddressConfiguration: {
                          name: "fvpqf",
                          properties: {
                            idleTimeoutInMinutes: 9,
                            dnsSettings: {
                              domainNameLabel: "ukrddzvmorpmfsczjwtbvp",
                              domainNameLabelScope: "TenantReuse",
                            },
                            ipTags: [
                              {
                                ipTagType: "sddgsoemnzgqizale",
                                tag: "wufmhrjsakbiaetyara",
                              },
                            ],
                            publicIPPrefix: {
                              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName}",
                            },
                            publicIPAddressVersion: "IPv4",
                            deleteOption: "Delete",
                          },
                          sku: { name: "Basic", tier: "Regional" },
                        },
                        privateIPAddressVersion: "IPv4",
                        applicationGatewayBackendAddressPools: [
                          {
                            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/backendAddressPools/{backendAddressPoolName}",
                          },
                        ],
                        applicationSecurityGroups: [
                          {
                            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}",
                          },
                        ],
                        loadBalancerBackendAddressPools: [
                          {
                            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}",
                          },
                        ],
                        loadBalancerInboundNatPools: [
                          {
                            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/inboundNatPools/{inboundNatPoolName}",
                          },
                        ],
                      },
                    },
                  ],
                  enableIPForwarding: true,
                  deleteOption: "Delete",
                  auxiliaryMode: "None",
                  auxiliarySku: "None",
                },
              },
            ],
            networkApiVersion: "2020-11-01",
          },
          securityProfile: {
            uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
            encryptionAtHost: true,
            securityType: "TrustedLaunch",
            encryptionIdentity: {
              userAssignedIdentityResourceId:
                "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{userAssignedIdentityName}",
            },
            proxyAgentSettings: {
              enabled: true,
              mode: "Audit",
              keyIncarnationId: 20,
            },
          },
          diagnosticsProfile: {
            bootDiagnostics: {
              enabled: true,
              storageUri: "http://myStorageAccountName.blob.core.windows.net",
            },
          },
          extensionProfile: {
            extensions: [
              {
                name: "bndxuxx",
                properties: {
                  forceUpdateTag: "yhgxw",
                  publisher: "kpxtirxjfprhs",
                  type: "pgjilctjjwaa",
                  typeHandlerVersion: "zevivcoilxmbwlrihhhibq",
                  autoUpgradeMinorVersion: true,
                  enableAutomaticUpgrade: true,
                  settings: {},
                  protectedSettings: {},
                  provisionAfterExtensions: ["nftzosroolbcwmpupujzqwqe"],
                  suppressFailures: true,
                  protectedSettingsFromKeyVault: {
                    secretUrl: "https://myvaultName.vault.azure.net/secrets/secret/mySecretName",
                    sourceVault: {
                      id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}",
                    },
                  },
                },
              },
            ],
            extensionsTimeBudget: "mbhjahtdygwgyszdwjtvlvtgchdwil",
          },
          licenseType: "v",
          scheduledEventsProfile: {
            terminateNotificationProfile: {
              notBeforeTimeout: "iljppmmw",
              enable: true,
            },
            osImageNotificationProfile: {
              notBeforeTimeout: "olbpadmevekyczfokodtfprxti",
              enable: true,
            },
          },
          userData: "s",
          capacityReservation: {
            capacityReservationGroup: {
              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}",
            },
          },
          applicationProfile: {
            galleryApplications: [
              {
                tags: "eyrqjbib",
                order: 5,
                packageReferenceId:
                  "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{applicationName}/versions/{versionName}",
                configurationReference: "ulztmiavpojpbpbddgnuuiimxcpau",
                treatFailureAsDeploymentFailure: true,
                enableAutomaticUpgrade: true,
              },
            ],
          },
          hardwareProfile: {
            vmSizeProperties: { vCPUsAvailable: 16, vCPUsPerCore: 23 },
          },
          serviceArtifactReference: {
            id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactsName}/vmArtifactsProfiles/{vmArtifactsProfileName}",
          },
          securityPostureReference: {
            id: "/CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|{major.*}|latest",
            excludeExtensions: ["{securityPostureVMExtensionName}"],
            isOverridable: true,
          },
        },
        computeApiVersion: "2023-07-01",
        platformFaultDomainCount: 1,
        additionalVirtualMachineCapabilities: {
          ultraSSDEnabled: true,
          hibernationEnabled: true,
        },
      },
      mode: "Instance",
      capacityType: "VCpu",
      zoneAllocationPolicy: {
        distributionStrategy: "Prioritized",
        zonePreferences: [
          { zone: "1", rank: 0 },
          { zone: "2", rank: 1 },
        ],
      },
      vmAttributes: {
        vCpuCount: { min: 2, max: 4 },
        memoryInGiB: { min: 2, max: 4 },
        memoryInGiBPerVCpu: { min: 2, max: 4 },
        localStorageSupport: "Excluded",
        localStorageInGiB: { min: 2, max: 4 },
        localStorageDiskTypes: ["HDD"],
        dataDiskCount: { min: 2, max: 4 },
        networkInterfaceCount: { min: 2, max: 4 },
        networkBandwidthInMbps: { min: 2, max: 4 },
        rdmaSupport: "Excluded",
        rdmaNetworkInterfaceCount: { min: 2, max: 4 },
        acceleratorSupport: "Excluded",
        acceleratorManufacturers: ["AMD"],
        acceleratorTypes: ["GPU"],
        acceleratorCount: { min: 2, max: 4 },
        vmCategories: ["GpuAccelerated"],
        architectureTypes: ["ARM64"],
        cpuManufacturers: ["Intel"],
        burstableSupport: "Excluded",
        excludedVMSizes: ["Standard_A1"],
      },
      additionalLocationsProfile: {
        locationProfiles: [
          {
            location: "ekbzgzhs",
            virtualMachineProfileOverride: {
              osProfile: {
                computerNamePrefix: "xoxwfnjjuqibzxldgxu",
                adminUsername: "wwjyuhblwecni",
                adminPassword: "<a-password-goes-here>",
                customData: "gvyvbgcgutteiivwjn",
                windowsConfiguration: {
                  provisionVMAgent: true,
                  enableAutomaticUpdates: true,
                  timeZone: "oqpoladmchkkugpxocrynztkok",
                  additionalUnattendContent: [
                    {
                      passName: "OobeSystem",
                      componentName: "Microsoft-Windows-Shell-Setup",
                      settingName: "AutoLogon",
                      content: "ynkrgbreqtuxgftjgeuvozzypzx",
                    },
                  ],
                  patchSettings: {
                    patchMode: "Manual",
                    enableHotpatching: true,
                    assessmentMode: "ImageDefault",
                    automaticByPlatformSettings: {
                      rebootSetting: "Unknown",
                      bypassPlatformSafetyChecksOnUserSchedule: true,
                    },
                  },
                  winRM: {
                    listeners: [
                      {
                        protocol: "Http",
                        certificateUrl: "https://microsoft.com/a",
                      },
                    ],
                  },
                  enableVMAgentPlatformUpdates: true,
                },
                linuxConfiguration: {
                  disablePasswordAuthentication: true,
                  ssh: {
                    publicKeys: [{ path: "bci", keyData: "meokrrrddgnyxyhg" }],
                  },
                  provisionVMAgent: true,
                  patchSettings: {
                    patchMode: "ImageDefault",
                    assessmentMode: "ImageDefault",
                    automaticByPlatformSettings: {
                      rebootSetting: "Unknown",
                      bypassPlatformSafetyChecksOnUserSchedule: true,
                    },
                  },
                  enableVMAgentPlatformUpdates: true,
                },
                secrets: [
                  {
                    sourceVault: {
                      id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}",
                    },
                    vaultCertificates: [
                      {
                        certificateUrl: "https://microsoft.com/a",
                        certificateStore: "hdts",
                      },
                    ],
                  },
                ],
                allowExtensionOperations: true,
                requireGuestProvisionSignal: true,
              },
              storageProfile: {
                imageReference: {
                  publisher: "mqxgwbiyjzmxavhbkd",
                  offer: "isxgumkarlkomp",
                  sku: "eojmppqcrnpmxirtp",
                  version: "wvpcqefgtmqdgltiuz",
                  sharedGalleryImageId: "kmkgihoxwlawuuhcinfirktdwkmx",
                  communityGalleryImageId: "vlqe",
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}/versions/{versionName}",
                },
                osDisk: {
                  name: "xhwnqpqigoymwwetvhjuuhiu",
                  caching: "None",
                  writeAcceleratorEnabled: true,
                  createOption: "FromImage",
                  diffDiskSettings: { option: "Local", placement: "CacheDisk" },
                  diskSizeGB: 21,
                  osType: "Windows",
                  image: { uri: "https://microsoft.com/a" },
                  vhdContainers: ["mgyqnavpb"],
                  managedDisk: {
                    storageAccountType: "Standard_LRS",
                    diskEncryptionSet: {
                      id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
                    },
                    securityProfile: {
                      securityEncryptionType: "VMGuestStateOnly",
                      diskEncryptionSet: {
                        id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
                      },
                    },
                  },
                  deleteOption: "Delete",
                },
                dataDisks: [
                  {
                    name: "nqblcowgig",
                    lun: 14,
                    caching: "None",
                    writeAcceleratorEnabled: true,
                    createOption: "FromImage",
                    diskSizeGB: 11,
                    managedDisk: {
                      storageAccountType: "Standard_LRS",
                      diskEncryptionSet: {
                        id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
                      },
                      securityProfile: {
                        securityEncryptionType: "VMGuestStateOnly",
                        diskEncryptionSet: {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{diskEncryptionSetName}",
                        },
                      },
                    },
                    diskIopsReadWrite: 5,
                    diskMBpsReadWrite: 4,
                    deleteOption: "Delete",
                  },
                ],
                diskControllerType: "SCSI",
              },
              networkProfile: {
                healthProbe: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}",
                },
                networkInterfaceConfigurations: [
                  {
                    name: "uyemquurltujhbjkhm",
                    properties: {
                      primary: true,
                      enableAcceleratedNetworking: true,
                      disableTcpStateTracking: true,
                      enableFpga: true,
                      networkSecurityGroup: {
                        id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}",
                      },
                      dnsSettings: { dnsServers: ["ajcsckebabrus"] },
                      ipConfigurations: [
                        {
                          name: "xpwuwsvkuml",
                          properties: {
                            subnet: {
                              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
                            },
                            primary: true,
                            publicIPAddressConfiguration: {
                              name: "wbpdlbxflssopphq",
                              properties: {
                                idleTimeoutInMinutes: 9,
                                dnsSettings: {
                                  domainNameLabel: "uwjtwqgwalsctypszcbnxo",
                                  domainNameLabelScope: "TenantReuse",
                                },
                                ipTags: [
                                  {
                                    ipTagType: "hxkbmbisknggtfdqoaqagjhipdkd",
                                    tag: "vzxhyyrzieaocbxyxieivj",
                                  },
                                ],
                                publicIPPrefix: {
                                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName}",
                                },
                                publicIPAddressVersion: "IPv4",
                                deleteOption: "Delete",
                              },
                              sku: { name: "Basic", tier: "Regional" },
                            },
                            privateIPAddressVersion: "IPv4",
                            applicationGatewayBackendAddressPools: [
                              {
                                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}/backendAddressPools/{backendAddressPoolName}",
                              },
                            ],
                            applicationSecurityGroups: [
                              {
                                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}",
                              },
                            ],
                            loadBalancerBackendAddressPools: [
                              {
                                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}",
                              },
                            ],
                            loadBalancerInboundNatPools: [
                              {
                                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/inboundNatPools/{inboundNatPoolName}",
                              },
                            ],
                          },
                        },
                      ],
                      enableIPForwarding: true,
                      deleteOption: "Delete",
                      auxiliaryMode: "None",
                      auxiliarySku: "None",
                    },
                  },
                ],
                networkApiVersion: "2020-11-01",
              },
              securityProfile: {
                uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
                encryptionAtHost: true,
                securityType: "TrustedLaunch",
                encryptionIdentity: {
                  userAssignedIdentityResourceId:
                    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{userAssignedIdentityName}",
                },
                proxyAgentSettings: {
                  enabled: true,
                  mode: "Audit",
                  keyIncarnationId: 22,
                },
              },
              diagnosticsProfile: {
                bootDiagnostics: {
                  enabled: true,
                  storageUri: "https://microsoft.com/a",
                },
              },
              extensionProfile: {
                extensions: [
                  {
                    name: "dockglmmvl",
                    properties: {
                      forceUpdateTag: "wzyqlpszoiewqbhlnzckfshdtpwkbd",
                      publisher: "iikgjziralgrfsrxrlrdigqyfhuqg",
                      type: "xzhgosms",
                      typeHandlerVersion: "mfzdzdwucagkogmxoosyjpej",
                      autoUpgradeMinorVersion: true,
                      enableAutomaticUpgrade: true,
                      settings: {},
                      protectedSettings: {},
                      provisionAfterExtensions: ["rqrycujrpdodllirebkfg"],
                      suppressFailures: true,
                      protectedSettingsFromKeyVault: {
                        secretUrl: "https://microsoft.com/ahygahgb",
                        sourceVault: {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}",
                        },
                      },
                    },
                  },
                ],
                extensionsTimeBudget: "srxtwxrc",
              },
              licenseType: "hilutelnuqxtpdznq",
              scheduledEventsProfile: {
                terminateNotificationProfile: {
                  notBeforeTimeout: "jgycfvgxpzvgsdylbcspkrxwhgxkyd",
                  enable: true,
                },
                osImageNotificationProfile: {
                  notBeforeTimeout: "nbgfbvisxveyywfyjgcfb",
                  enable: true,
                },
              },
              userData: "ezhyl",
              capacityReservation: {
                capacityReservationGroup: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}",
                },
              },
              applicationProfile: {
                galleryApplications: [
                  {
                    tags: "fronuehbtzhxaoijmdmjzwaswgevh",
                    order: 19,
                    packageReferenceId:
                      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{applicationName}/versions/{versionName}",
                    configurationReference: "gqxsvizquzglpsgqaundtyh",
                    treatFailureAsDeploymentFailure: true,
                    enableAutomaticUpgrade: true,
                  },
                ],
              },
              hardwareProfile: {
                vmSizeProperties: { vCPUsAvailable: 1, vCPUsPerCore: 4 },
              },
              serviceArtifactReference: {
                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactsName}/vmArtifactsProfiles/{vmArtifactsProfileName}",
              },
              securityPostureReference: {
                id: "/CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|{major.*}|latest",
                excludeExtensions: ["zagiokiwvg"],
                isOverridable: true,
              },
            },
          },
        ],
      },
    },
    zones: ["1", "2"],
    identity: { type: "UserAssigned", userAssignedIdentities: {} },
    tags: {},
    location: "westus",
    plan: {
      name: "jwgrcrnrtfoxn",
      publisher: "iozjbiqqckqm",
      product: "cgopbyvdyqikahwyxfpzwaqk",
      promotionCode: "naglezezplcaruqogtxnuizslqnnbr",
      version: "wa",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await fleetsCreateOrUpdate();
}

main().catch(console.error);
