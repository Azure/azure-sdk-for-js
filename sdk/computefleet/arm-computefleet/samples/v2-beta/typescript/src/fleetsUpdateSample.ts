// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Fleet
 *
 * @summary update a Fleet
 * x-ms-original-file: 2025-07-01-preview/Fleets_Update.json
 */
async function fleetsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const result = await client.fleets.update("rgazurefleet", "myFleet", {
    identity: { type: "UserAssigned", userAssignedIdentities: {} },
    tags: {},
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
                    protocol: "Http",
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
                    secretUrl: "https://myVaultName.vault.azure.net/secrets/secret/mySecretName",
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
        vmCategories: ["GeneralPurpose"],
        architectureTypes: ["ARM64"],
        cpuManufacturers: ["Intel"],
        burstableSupport: "Excluded",
        excludedVMSizes: ["Standard_A1"],
      },
      additionalLocationsProfile: {
        locationProfiles: [
          {
            location: "v",
            virtualMachineProfileOverride: {
              osProfile: {
                computerNamePrefix: "tec",
                adminUsername: "xdgnnqymtamdyqxy",
                adminPassword: "<a-password-goes-here>",
                customData: "whcielwnerogvbxnbia",
                windowsConfiguration: {
                  provisionVMAgent: true,
                  enableAutomaticUpdates: true,
                  timeZone: "ktf",
                  additionalUnattendContent: [
                    {
                      passName: "OobeSystem",
                      componentName: "Microsoft-Windows-Shell-Setup",
                      settingName: "AutoLogon",
                      content: "xcigofrcurxdwx",
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
                        certificateUrl: "https://microsoft.com/apzd",
                      },
                    ],
                  },
                  enableVMAgentPlatformUpdates: true,
                },
                linuxConfiguration: {
                  disablePasswordAuthentication: true,
                  ssh: {
                    publicKeys: [
                      {
                        path: "ebeglujkldnntlpmazrg",
                        keyData: "vmgnwtwjcodavmu",
                      },
                    ],
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
                        certificateStore: "yycyfwpymjtwzza",
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
                  name: "dt",
                  caching: "None",
                  writeAcceleratorEnabled: true,
                  createOption: "FromImage",
                  diffDiskSettings: { option: "Local", placement: "CacheDisk" },
                  diskSizeGB: 9,
                  osType: "Windows",
                  image: { uri: "https://microsoft.com/a" },
                  vhdContainers: ["kdagj"],
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
                    name: "mhljivkyryuomrapmmxx",
                    lun: 6,
                    caching: "None",
                    writeAcceleratorEnabled: true,
                    createOption: "FromImage",
                    diskSizeGB: 9,
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
                    diskIopsReadWrite: 24,
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
                    name: "gpunpcdsdphgspvgwwbnk",
                    properties: {
                      primary: true,
                      enableAcceleratedNetworking: true,
                      disableTcpStateTracking: true,
                      enableFpga: true,
                      networkSecurityGroup: {
                        id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/{networkSecurityGroupName}",
                      },
                      dnsSettings: { dnsServers: ["sjpmlu"] },
                      ipConfigurations: [
                        {
                          name: "fweiphgkyhbcsbfjmxzczkpg",
                          properties: {
                            subnet: {
                              id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName}",
                            },
                            primary: true,
                            publicIPAddressConfiguration: {
                              name: "dvnoamqjyshquvtmf",
                              properties: {
                                idleTimeoutInMinutes: 1,
                                dnsSettings: {
                                  domainNameLabel: "ayofnb",
                                  domainNameLabelScope: "TenantReuse",
                                },
                                ipTags: [
                                  {
                                    ipTagType: "zqpznczmc",
                                    tag: "ugnfzikniqjisffrbvryavenhmtd",
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
                  keyIncarnationId: 6,
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
                    name: "oredyuufsd",
                    properties: {
                      forceUpdateTag: "muglieujh",
                      publisher: "ccbiyfuveemaaopgxbjpm",
                      type: "yorumzkbfpxnrdwgczwwaeaxmda",
                      typeHandlerVersion: "nlnqbmgzwubbc",
                      autoUpgradeMinorVersion: true,
                      enableAutomaticUpgrade: true,
                      settings: {},
                      protectedSettings: {},
                      provisionAfterExtensions: ["xuefrutmgzsxrpjjayvy"],
                      suppressFailures: true,
                      protectedSettingsFromKeyVault: {
                        secretUrl: "https://microsoft.com/a",
                        sourceVault: {
                          id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}",
                        },
                      },
                    },
                  },
                ],
                extensionsTimeBudget: "trluxrynunvdnukztblhbnsubr",
              },
              licenseType: "ginsqshzwimjteiyfxhnjxfrcaat",
              scheduledEventsProfile: {
                terminateNotificationProfile: {
                  notBeforeTimeout: "plbazenobaeueixatewbey",
                  enable: true,
                },
                osImageNotificationProfile: {
                  notBeforeTimeout: "ednjvcedpjmczw",
                  enable: true,
                },
              },
              userData: "zekdr",
              capacityReservation: {
                capacityReservationGroup: {
                  id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/{capacityReservationGroupName}",
                },
              },
              applicationProfile: {
                galleryApplications: [
                  {
                    tags: "eomzidad",
                    order: 22,
                    packageReferenceId:
                      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{applicationName}/versions/{versionName}",
                    configurationReference: "zdqfcpvt",
                    treatFailureAsDeploymentFailure: true,
                    enableAutomaticUpgrade: true,
                  },
                ],
              },
              hardwareProfile: {
                vmSizeProperties: { vCPUsAvailable: 8, vCPUsPerCore: 17 },
              },
              serviceArtifactReference: {
                id: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactsName}/vmArtifactsProfiles/{vmArtifactsProfileName}",
              },
              securityPostureReference: {
                id: "/CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|{major.*}|latest",
                excludeExtensions: ["ragwgzswxzzz"],
                isOverridable: true,
              },
            },
          },
        ],
      },
      mode: "Managed",
      capacityType: "VM",
      zoneAllocationPolicy: { distributionStrategy: "BestEffortSingleZone" },
    },
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
  await fleetsUpdate();
}

main().catch(console.error);
