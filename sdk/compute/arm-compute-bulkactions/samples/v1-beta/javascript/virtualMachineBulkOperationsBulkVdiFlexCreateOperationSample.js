// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to bulkVdiFlexCreate: Bulk create  operation for a batch of virtual machines, this operation supports flex properties to give options on Sku and zone selection.
 *
 * @summary bulkVdiFlexCreate: Bulk create  operation for a batch of virtual machines, this operation supports flex properties to give options on Sku and zone selection.
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkVdiFlexCreate_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkVdiFlexCreateExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkVdiFlexCreateOperation(
    "rgBulkactions",
    "useast2euap",
    {
      resourceConfigParameters: {
        baseProfile: {
          plan: {
            name: "iemasqqkbixbewezyrhnpntjd",
            publisher: "bvggylbvfstnscuupuithafvvgc",
            product: "bguuzrknnuohugjhernflurpx",
            promotionCode: "bxgonranwqoryfkhkfaumdgz",
            version: "uyxetqmmzvqianqv",
          },
          zones: ["wczj"],
          identity: { type: "SystemAssigned", userAssignedIdentities: { key7: {} } },
          extendedLocation: { name: "gbnxzymbdkxhwjpqkur", type: "EdgeZone" },
          placement: {
            zonePlacementPolicy: "Any",
            includeZones: ["inagtbtedobdea"],
            excludeZones: ["pvvwrhuhdpvbacwmesblpgwzk"],
          },
          tags: { key6824: "cefndldgkx" },
          properties: {
            scheduledEventsPolicy: {
              userInitiatedRedeploy: { automaticallyApprove: true },
              userInitiatedReboot: { automaticallyApprove: true },
              scheduledEventsAdditionalPublishingTargets: {
                eventGridAndResourceGraph: {
                  enable: true,
                  scheduledEventsApiVersion: "lifncbftlkounuyfn",
                },
              },
              allInstancesDown: { automaticallyApprove: true },
            },
            storageProfile: {
              imageReference: {
                publisher: "ojlplghybdamadvsrq",
                offer: "uvnqoxhkxefqwbsvjgbswqy",
                sku: "hajdxhjmlkx",
                version: "u",
                sharedGalleryImageId: "fz",
                communityGalleryImageId: "tsfpcq",
                id: "cdbrkpdicibtlliq",
              },
              osDisk: {
                osType: "Windows",
                encryptionSettings: {
                  diskEncryptionKey: {
                    secretUrl: "vzkogocyw",
                    sourceVault: { id: "lvzxxyypkeqlflftmfn" },
                  },
                  keyEncryptionKey: {
                    keyUrl: "mjjkvgpoohatw",
                    sourceVault: { id: "lvzxxyypkeqlflftmfn" },
                  },
                  enabled: true,
                },
                name: "opogpznvctmraoajgizcyrfvpt",
                vhd: { uri: "elpzggtxubepzgjqvdbjmbu" },
                image: { uri: "elpzggtxubepzgjqvdbjmbu" },
                caching: "None",
                writeAcceleratorEnabled: true,
                diffDiskSettings: { option: "Local", placement: "CacheDisk" },
                createOption: "FromImage",
                diskSizeGB: 2,
                managedDisk: {
                  storageAccountType: "Standard_LRS",
                  diskEncryptionSet: { id: "magvkzhdmzhktjlqkkk" },
                  securityProfile: {
                    securityEncryptionType: "VMGuestStateOnly",
                    diskEncryptionSet: { id: "magvkzhdmzhktjlqkkk" },
                  },
                  id: "numddbqmkxuu",
                },
                deleteOption: "Delete",
              },
              dataDisks: [
                {
                  lun: 7,
                  name: "nbthfzqsxyqvqnbgcljxbwyyoj",
                  vhd: { uri: "elpzggtxubepzgjqvdbjmbu" },
                  image: { uri: "elpzggtxubepzgjqvdbjmbu" },
                  caching: "None",
                  writeAcceleratorEnabled: true,
                  createOption: "FromImage",
                  diskSizeGB: 19,
                  managedDisk: {
                    storageAccountType: "Standard_LRS",
                    diskEncryptionSet: { id: "magvkzhdmzhktjlqkkk" },
                    securityProfile: {
                      securityEncryptionType: "VMGuestStateOnly",
                      diskEncryptionSet: { id: "magvkzhdmzhktjlqkkk" },
                    },
                    id: "numddbqmkxuu",
                  },
                  sourceResource: { id: "qnukyordmomtjjqabovlsxl" },
                  toBeDetached: true,
                  detachOption: "ForceDetach",
                  deleteOption: "Delete",
                },
              ],
              diskControllerType: "SCSI",
            },
            hardwareProfile: {
              vmSize: "szrnjqwbruz",
              vmSizeProperties: { vCpusAvailable: 24, vCpusPerCore: 6 },
            },
            additionalCapabilities: { ultraSSDEnabled: true, hibernationEnabled: true },
            osProfile: {
              computerName: "bplxnfp",
              adminUsername: "fxzbi",
              adminPassword: "<a-password-goes-here>",
              customData: "hbdlirohsgnbrahscboc",
              windowsConfiguration: {
                provisionVMAgent: true,
                enableAutomaticUpdates: true,
                timeZone: "t",
                additionalUnattendContent: [
                  {
                    passName: "OobeSystem",
                    componentName: "Microsoft-Windows-Shell-Setup",
                    settingName: "AutoLogon",
                    content: "rguazthnx",
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
                  listeners: [{ protocol: "Http", certificateUrl: "quhfapfpyeeocwvwtvuggoqqwt" }],
                },
              },
              linuxConfiguration: {
                disablePasswordAuthentication: true,
                ssh: {
                  publicKeys: [{ path: "mrdfxnfjazxog", keyData: "wfhrknkehgesontscqyrewfmhgwt" }],
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
                  sourceVault: { id: "lvzxxyypkeqlflftmfn" },
                  vaultCertificates: [
                    { certificateUrl: "crgbpfdvlohwkupdjp", certificateStore: "hyx" },
                  ],
                },
              ],
              allowExtensionOperations: true,
              requireGuestProvisionSignal: true,
            },
            networkProfile: {
              networkInterfaces: [
                { properties: { primary: true, deleteOption: "Delete" }, id: "ymfxctb" },
              ],
              networkApiVersion: "2020-11-01",
              networkInterfaceConfigurations: [
                {
                  name: "qrkzoctmzjketostzabnra",
                  properties: {
                    primary: true,
                    deleteOption: "Delete",
                    enableAcceleratedNetworking: true,
                    disableTcpStateTracking: true,
                    enableFpga: true,
                    enableIPForwarding: true,
                    networkSecurityGroup: { id: "lvzxxyypkeqlflftmfn" },
                    dnsSettings: { dnsServers: ["tqcqopnanyyiavfwhqbkarxtrfqbww"] },
                    ipConfigurations: [
                      {
                        name: "gqymuvgzzfmxqvdadx",
                        properties: {
                          subnet: { id: "lvzxxyypkeqlflftmfn" },
                          primary: true,
                          publicIPAddressConfiguration: {
                            name: "cwxsqjijtwbsyqdwht",
                            properties: {
                              idleTimeoutInMinutes: 17,
                              deleteOption: "Delete",
                              dnsSettings: {
                                domainNameLabel: "fampou",
                                domainNameLabelScope: "TenantReuse",
                              },
                              ipTags: [
                                { ipTagType: "hkjoxhqadudjartwooezaxl", tag: "xywunkjglkmmwfpf" },
                              ],
                              publicIPPrefix: { id: "lvzxxyypkeqlflftmfn" },
                              publicIPAddressVersion: "IPv4",
                              publicIPAllocationMethod: "Dynamic",
                            },
                            sku: { name: "Basic", tier: "Regional" },
                            tags: { key5442: "qhpwpnylvmdthxazhxamnbhdfpf" },
                          },
                          privateIPAddressVersion: "IPv4",
                          applicationSecurityGroups: [{ id: "lvzxxyypkeqlflftmfn" }],
                          applicationGatewayBackendAddressPools: [{ id: "lvzxxyypkeqlflftmfn" }],
                          loadBalancerBackendAddressPools: [{ id: "lvzxxyypkeqlflftmfn" }],
                        },
                      },
                    ],
                    dscpConfiguration: { id: "lvzxxyypkeqlflftmfn" },
                    auxiliaryMode: "None",
                    auxiliarySku: "None",
                  },
                  tags: { key9436: "bjbadzbfvpszbsickv" },
                },
              ],
            },
            securityProfile: {
              uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
              encryptionAtHost: true,
              securityType: "TrustedLaunch",
              encryptionIdentity: { userAssignedIdentityResourceId: "tnajlgbwcepmhytzb" },
              proxyAgentSettings: {
                enabled: true,
                mode: "Audit",
                keyIncarnationId: 4,
                wireServer: { mode: "Audit", inVMAccessControlProfileReferenceId: "xvlzroy" },
                imds: { mode: "Audit", inVMAccessControlProfileReferenceId: "xvlzroy" },
                addProxyAgentExtension: true,
              },
            },
            diagnosticsProfile: {
              bootDiagnostics: { enabled: true, storageUri: "pxuhtzehlfsqolbdleirgj" },
            },
            licenseType: "ymwuemwuntbignqyvzqflvjpcdus",
            extensionsTimeBudget: "dnyqmcijikzkltjav",
            scheduledEventsProfile: {
              terminateNotificationProfile: { notBeforeTimeout: "owbwifqrlsdmm", enable: true },
              osImageNotificationProfile: {
                notBeforeTimeout: "ataqykjdakdvyyzdspaqnhd",
                enable: true,
              },
            },
            userData: "nwjvxe",
            capacityReservation: { capacityReservationGroup: { id: "lvzxxyypkeqlflftmfn" } },
            applicationProfile: {
              galleryApplications: [
                {
                  tags: "cmygipvpkegyclvpznfu",
                  order: 8,
                  packageReferenceId: "afrfkjdrtzftmwramfyu",
                  configurationReference: "nmfaspclhidtznslsps",
                  treatFailureAsDeploymentFailure: true,
                  enableAutomaticUpgrade: true,
                },
              ],
            },
            vmExtensions: [
              {
                name: "jkpmcxwuahpzwkvexgzpypk",
                properties: {
                  forceUpdateTag: "dockqxgatsfzhctxrncuw",
                  publisher: "qesyfldbfoaexyoywhcxafdtdwcg",
                  type: "ptlmlzpbpbkfbu",
                  typeHandlerVersion: "crllsludntz",
                  autoUpgradeMinorVersion: true,
                  enableAutomaticUpgrade: true,
                  settings: {},
                  protectedSettings: {},
                  suppressFailures: true,
                  protectedSettingsFromKeyVault: {
                    secretUrl: "vzkogocyw",
                    sourceVault: { id: "lvzxxyypkeqlflftmfn" },
                  },
                  provisionAfterExtensions: ["onbtyoeifafiktrkmal"],
                },
              },
            ],
          },
          computeApiVersion: "axcvphjtsdjzcwqczcglmq",
          name: "dbozdvegpdvqxltqipvmqsfgunpe",
        },
        resourceOverrides: [
          {
            plan: {
              name: "iemasqqkbixbewezyrhnpntjd",
              publisher: "bvggylbvfstnscuupuithafvvgc",
              product: "bguuzrknnuohugjhernflurpx",
              promotionCode: "bxgonranwqoryfkhkfaumdgz",
              version: "uyxetqmmzvqianqv",
            },
            zones: ["wczj"],
            identity: { type: "SystemAssigned", userAssignedIdentities: { key7: {} } },
            extendedLocation: { name: "gbnxzymbdkxhwjpqkur", type: "EdgeZone" },
            placement: {
              zonePlacementPolicy: "Any",
              includeZones: ["inagtbtedobdea"],
              excludeZones: ["pvvwrhuhdpvbacwmesblpgwzk"],
            },
            tags: { key6824: "cefndldgkx" },
            properties: {
              scheduledEventsPolicy: {
                userInitiatedRedeploy: { automaticallyApprove: true },
                userInitiatedReboot: { automaticallyApprove: true },
                scheduledEventsAdditionalPublishingTargets: {
                  eventGridAndResourceGraph: {
                    enable: true,
                    scheduledEventsApiVersion: "lifncbftlkounuyfn",
                  },
                },
                allInstancesDown: { automaticallyApprove: true },
              },
              storageProfile: {
                imageReference: {
                  publisher: "ojlplghybdamadvsrq",
                  offer: "uvnqoxhkxefqwbsvjgbswqy",
                  sku: "hajdxhjmlkx",
                  version: "u",
                  sharedGalleryImageId: "fz",
                  communityGalleryImageId: "tsfpcq",
                  id: "cdbrkpdicibtlliq",
                },
                osDisk: {
                  osType: "Windows",
                  encryptionSettings: {
                    diskEncryptionKey: {
                      secretUrl: "vzkogocyw",
                      sourceVault: { id: "lvzxxyypkeqlflftmfn" },
                    },
                    keyEncryptionKey: {
                      keyUrl: "mjjkvgpoohatw",
                      sourceVault: { id: "lvzxxyypkeqlflftmfn" },
                    },
                    enabled: true,
                  },
                  name: "opogpznvctmraoajgizcyrfvpt",
                  vhd: { uri: "elpzggtxubepzgjqvdbjmbu" },
                  image: { uri: "elpzggtxubepzgjqvdbjmbu" },
                  caching: "None",
                  writeAcceleratorEnabled: true,
                  diffDiskSettings: { option: "Local", placement: "CacheDisk" },
                  createOption: "FromImage",
                  diskSizeGB: 2,
                  managedDisk: {
                    storageAccountType: "Standard_LRS",
                    diskEncryptionSet: { id: "magvkzhdmzhktjlqkkk" },
                    securityProfile: {
                      securityEncryptionType: "VMGuestStateOnly",
                      diskEncryptionSet: { id: "magvkzhdmzhktjlqkkk" },
                    },
                    id: "numddbqmkxuu",
                  },
                  deleteOption: "Delete",
                },
                dataDisks: [
                  {
                    lun: 7,
                    name: "nbthfzqsxyqvqnbgcljxbwyyoj",
                    vhd: { uri: "elpzggtxubepzgjqvdbjmbu" },
                    image: { uri: "elpzggtxubepzgjqvdbjmbu" },
                    caching: "None",
                    writeAcceleratorEnabled: true,
                    createOption: "FromImage",
                    diskSizeGB: 19,
                    managedDisk: {
                      storageAccountType: "Standard_LRS",
                      diskEncryptionSet: { id: "magvkzhdmzhktjlqkkk" },
                      securityProfile: {
                        securityEncryptionType: "VMGuestStateOnly",
                        diskEncryptionSet: { id: "magvkzhdmzhktjlqkkk" },
                      },
                      id: "numddbqmkxuu",
                    },
                    sourceResource: { id: "qnukyordmomtjjqabovlsxl" },
                    toBeDetached: true,
                    detachOption: "ForceDetach",
                    deleteOption: "Delete",
                  },
                ],
                diskControllerType: "SCSI",
              },
              hardwareProfile: {
                vmSize: "szrnjqwbruz",
                vmSizeProperties: { vCpusAvailable: 24, vCpusPerCore: 6 },
              },
              additionalCapabilities: { ultraSSDEnabled: true, hibernationEnabled: true },
              osProfile: {
                computerName: "bplxnfp",
                adminUsername: "fxzbi",
                adminPassword: "<a-password-goes-here>",
                customData: "hbdlirohsgnbrahscboc",
                windowsConfiguration: {
                  provisionVMAgent: true,
                  enableAutomaticUpdates: true,
                  timeZone: "t",
                  additionalUnattendContent: [
                    {
                      passName: "OobeSystem",
                      componentName: "Microsoft-Windows-Shell-Setup",
                      settingName: "AutoLogon",
                      content: "rguazthnx",
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
                    listeners: [{ protocol: "Http", certificateUrl: "quhfapfpyeeocwvwtvuggoqqwt" }],
                  },
                },
                linuxConfiguration: {
                  disablePasswordAuthentication: true,
                  ssh: {
                    publicKeys: [
                      { path: "mrdfxnfjazxog", keyData: "wfhrknkehgesontscqyrewfmhgwt" },
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
                    sourceVault: { id: "lvzxxyypkeqlflftmfn" },
                    vaultCertificates: [
                      { certificateUrl: "crgbpfdvlohwkupdjp", certificateStore: "hyx" },
                    ],
                  },
                ],
                allowExtensionOperations: true,
                requireGuestProvisionSignal: true,
              },
              networkProfile: {
                networkInterfaces: [
                  { properties: { primary: true, deleteOption: "Delete" }, id: "ymfxctb" },
                ],
                networkApiVersion: "2020-11-01",
                networkInterfaceConfigurations: [
                  {
                    name: "qrkzoctmzjketostzabnra",
                    properties: {
                      primary: true,
                      deleteOption: "Delete",
                      enableAcceleratedNetworking: true,
                      disableTcpStateTracking: true,
                      enableFpga: true,
                      enableIPForwarding: true,
                      networkSecurityGroup: { id: "lvzxxyypkeqlflftmfn" },
                      dnsSettings: { dnsServers: ["tqcqopnanyyiavfwhqbkarxtrfqbww"] },
                      ipConfigurations: [
                        {
                          name: "gqymuvgzzfmxqvdadx",
                          properties: {
                            subnet: { id: "lvzxxyypkeqlflftmfn" },
                            primary: true,
                            publicIPAddressConfiguration: {
                              name: "cwxsqjijtwbsyqdwht",
                              properties: {
                                idleTimeoutInMinutes: 17,
                                deleteOption: "Delete",
                                dnsSettings: {
                                  domainNameLabel: "fampou",
                                  domainNameLabelScope: "TenantReuse",
                                },
                                ipTags: [
                                  { ipTagType: "hkjoxhqadudjartwooezaxl", tag: "xywunkjglkmmwfpf" },
                                ],
                                publicIPPrefix: { id: "lvzxxyypkeqlflftmfn" },
                                publicIPAddressVersion: "IPv4",
                                publicIPAllocationMethod: "Dynamic",
                              },
                              sku: { name: "Basic", tier: "Regional" },
                              tags: { key5442: "qhpwpnylvmdthxazhxamnbhdfpf" },
                            },
                            privateIPAddressVersion: "IPv4",
                            applicationSecurityGroups: [{ id: "lvzxxyypkeqlflftmfn" }],
                            applicationGatewayBackendAddressPools: [{ id: "lvzxxyypkeqlflftmfn" }],
                            loadBalancerBackendAddressPools: [{ id: "lvzxxyypkeqlflftmfn" }],
                          },
                        },
                      ],
                      dscpConfiguration: { id: "lvzxxyypkeqlflftmfn" },
                      auxiliaryMode: "None",
                      auxiliarySku: "None",
                    },
                    tags: { key9436: "bjbadzbfvpszbsickv" },
                  },
                ],
              },
              securityProfile: {
                uefiSettings: { secureBootEnabled: true, vTpmEnabled: true },
                encryptionAtHost: true,
                securityType: "TrustedLaunch",
                encryptionIdentity: { userAssignedIdentityResourceId: "tnajlgbwcepmhytzb" },
                proxyAgentSettings: {
                  enabled: true,
                  mode: "Audit",
                  keyIncarnationId: 4,
                  wireServer: { mode: "Audit", inVMAccessControlProfileReferenceId: "xvlzroy" },
                  imds: { mode: "Audit", inVMAccessControlProfileReferenceId: "xvlzroy" },
                  addProxyAgentExtension: true,
                },
              },
              diagnosticsProfile: {
                bootDiagnostics: { enabled: true, storageUri: "pxuhtzehlfsqolbdleirgj" },
              },
              licenseType: "ymwuemwuntbignqyvzqflvjpcdus",
              extensionsTimeBudget: "dnyqmcijikzkltjav",
              scheduledEventsProfile: {
                terminateNotificationProfile: { notBeforeTimeout: "owbwifqrlsdmm", enable: true },
                osImageNotificationProfile: {
                  notBeforeTimeout: "ataqykjdakdvyyzdspaqnhd",
                  enable: true,
                },
              },
              userData: "nwjvxe",
              capacityReservation: { capacityReservationGroup: { id: "lvzxxyypkeqlflftmfn" } },
              applicationProfile: {
                galleryApplications: [
                  {
                    tags: "cmygipvpkegyclvpznfu",
                    order: 8,
                    packageReferenceId: "afrfkjdrtzftmwramfyu",
                    configurationReference: "nmfaspclhidtznslsps",
                    treatFailureAsDeploymentFailure: true,
                    enableAutomaticUpgrade: true,
                  },
                ],
              },
              vmExtensions: [
                {
                  name: "jkpmcxwuahpzwkvexgzpypk",
                  properties: {
                    forceUpdateTag: "dockqxgatsfzhctxrncuw",
                    publisher: "qesyfldbfoaexyoywhcxafdtdwcg",
                    type: "ptlmlzpbpbkfbu",
                    typeHandlerVersion: "crllsludntz",
                    autoUpgradeMinorVersion: true,
                    enableAutomaticUpgrade: true,
                    settings: {},
                    protectedSettings: {},
                    suppressFailures: true,
                    protectedSettingsFromKeyVault: {
                      secretUrl: "vzkogocyw",
                      sourceVault: { id: "lvzxxyypkeqlflftmfn" },
                    },
                    provisionAfterExtensions: ["onbtyoeifafiktrkmal"],
                  },
                },
              ],
            },
            computeApiVersion: "axcvphjtsdjzcwqczcglmq",
            name: "dbozdvegpdvqxltqipvmqsfgunpe",
          },
        ],
        resourceCount: 10,
        resourcePrefix: "mwbopevxbjcunljvruov",
        flexProperties: {
          vmSizeProfiles: [{ name: "frbnnpdkq", rank: 7 }],
          osType: "Windows",
          priorityProfile: {
            type: "Regular",
            maxPricePerVM: 23,
            evictionPolicy: "Delete",
            allocationStrategy: "LowestPrice",
          },
          zoneAllocationPolicy: {
            distributionStrategy: "BestEffortSingleZone",
            zonePreferences: [{ zone: "ixksjnaxwelhfpsoyjfaezievquqv", rank: 19 }],
          },
          minCapacity: 5,
        },
      },
      executionParameters: {
        retryPolicy: { retryCount: 2, retryWindowInMinutes: 19, onFailureAction: "Unknown" },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to bulkVdiFlexCreate: Bulk create  operation for a batch of virtual machines, this operation supports flex properties to give options on Sku and zone selection.
 *
 * @summary bulkVdiFlexCreate: Bulk create  operation for a batch of virtual machines, this operation supports flex properties to give options on Sku and zone selection.
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkVdiFlexCreate_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkVdiFlexCreateExampleGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkVdiFlexCreateOperation(
    "rgBulkactions",
    "useast2euap",
    {
      resourceConfigParameters: {
        resourceCount: 10,
        flexProperties: {
          vmSizeProfiles: [{ name: "Standard_D2ads_v5", rank: 7 }],
          osType: "Windows",
          priorityProfile: {},
        },
      },
      executionParameters: {},
    },
  );
  console.log(result);
}

async function main() {
  await virtualMachineBulkOperationsBulkVdiFlexCreateExample();
  await virtualMachineBulkOperationsBulkVdiFlexCreateExampleGeneratedByMinimumSetRule();
}

main().catch(console.error);
