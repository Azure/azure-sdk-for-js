// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  fleetPropertiesSerializer,
  managedServiceIdentitySerializer,
  planSerializer,
  managedServiceIdentityUpdateSerializer,
  resourcePlanUpdateSerializer,
  Fleet,
  FleetUpdate,
  VirtualMachineScaleSet,
  _FleetListResult,
  _VirtualMachineScaleSetListResult,
} from "../../models/models.js";
import { AzureFleetContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  FleetsGetOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
} from "../../models/options.js";

export function _fleetsGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsGetDeserialize(result: PathUncheckedResponse): Promise<Fleet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    tags: result.body["tags"],
    location: result.body["location"],
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          spotPriorityProfile: !result.body.properties?.spotPriorityProfile
            ? undefined
            : {
                capacity: result.body.properties?.spotPriorityProfile?.["capacity"],
                minCapacity: result.body.properties?.spotPriorityProfile?.["minCapacity"],
                maxPricePerVM: result.body.properties?.spotPriorityProfile?.["maxPricePerVM"],
                evictionPolicy: result.body.properties?.spotPriorityProfile?.["evictionPolicy"],
                allocationStrategy:
                  result.body.properties?.spotPriorityProfile?.["allocationStrategy"],
                maintain: result.body.properties?.spotPriorityProfile?.["maintain"],
              },
          regularPriorityProfile: !result.body.properties?.regularPriorityProfile
            ? undefined
            : {
                capacity: result.body.properties?.regularPriorityProfile?.["capacity"],
                minCapacity: result.body.properties?.regularPriorityProfile?.["minCapacity"],
                allocationStrategy:
                  result.body.properties?.regularPriorityProfile?.["allocationStrategy"],
              },
          vmSizesProfile: result.body.properties?.["vmSizesProfile"].map((p: any) => {
            return { name: p["name"], rank: p["rank"] };
          }),
          vmAttributes: !result.body.properties?.vmAttributes
            ? undefined
            : {
                vCpuCount: {
                  min: result.body.properties?.vmAttributes?.vCpuCount["min"],
                  max: result.body.properties?.vmAttributes?.vCpuCount["max"],
                },
                memoryInGiB: {
                  min: result.body.properties?.vmAttributes?.memoryInGiB["min"],
                  max: result.body.properties?.vmAttributes?.memoryInGiB["max"],
                },
                memoryInGiBPerVCpu: !result.body.properties?.vmAttributes?.memoryInGiBPerVCpu
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.memoryInGiBPerVCpu?.["min"],
                      max: result.body.properties?.vmAttributes?.memoryInGiBPerVCpu?.["max"],
                    },
                localStorageSupport: result.body.properties?.vmAttributes?.["localStorageSupport"],
                localStorageInGiB: !result.body.properties?.vmAttributes?.localStorageInGiB
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.localStorageInGiB?.["min"],
                      max: result.body.properties?.vmAttributes?.localStorageInGiB?.["max"],
                    },
                localStorageDiskTypes:
                  result.body.properties?.vmAttributes?.["localStorageDiskTypes"],
                dataDiskCount: !result.body.properties?.vmAttributes?.dataDiskCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.dataDiskCount?.["min"],
                      max: result.body.properties?.vmAttributes?.dataDiskCount?.["max"],
                    },
                networkInterfaceCount: !result.body.properties?.vmAttributes?.networkInterfaceCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.networkInterfaceCount?.["min"],
                      max: result.body.properties?.vmAttributes?.networkInterfaceCount?.["max"],
                    },
                networkBandwidthInMbps: !result.body.properties?.vmAttributes
                  ?.networkBandwidthInMbps
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.networkBandwidthInMbps?.["min"],
                      max: result.body.properties?.vmAttributes?.networkBandwidthInMbps?.["max"],
                    },
                rdmaSupport: result.body.properties?.vmAttributes?.["rdmaSupport"],
                rdmaNetworkInterfaceCount: !result.body.properties?.vmAttributes
                  ?.rdmaNetworkInterfaceCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["min"],
                      max: result.body.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["max"],
                    },
                acceleratorSupport: result.body.properties?.vmAttributes?.["acceleratorSupport"],
                acceleratorManufacturers:
                  result.body.properties?.vmAttributes?.["acceleratorManufacturers"],
                acceleratorTypes: result.body.properties?.vmAttributes?.["acceleratorTypes"],
                acceleratorCount: !result.body.properties?.vmAttributes?.acceleratorCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.acceleratorCount?.["min"],
                      max: result.body.properties?.vmAttributes?.acceleratorCount?.["max"],
                    },
                vmCategories: result.body.properties?.vmAttributes?.["vmCategories"],
                architectureTypes: result.body.properties?.vmAttributes?.["architectureTypes"],
                cpuManufacturers: result.body.properties?.vmAttributes?.["cpuManufacturers"],
                burstableSupport: result.body.properties?.vmAttributes?.["burstableSupport"],
                excludedVMSizes: result.body.properties?.vmAttributes?.["excludedVMSizes"],
              },
          additionalLocationsProfile: !result.body.properties?.additionalLocationsProfile
            ? undefined
            : {
                locationProfiles: result.body.properties?.additionalLocationsProfile?.[
                  "locationProfiles"
                ].map((p: any) => {
                  return {
                    location: p["location"],
                    virtualMachineProfileOverride: !p.virtualMachineProfileOverride
                      ? undefined
                      : {
                          osProfile: !p.virtualMachineProfileOverride?.osProfile
                            ? undefined
                            : {
                                computerNamePrefix:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "computerNamePrefix"
                                  ],
                                adminUsername:
                                  p.virtualMachineProfileOverride?.osProfile?.["adminUsername"],
                                adminPassword:
                                  p.virtualMachineProfileOverride?.osProfile?.["adminPassword"],
                                customData:
                                  p.virtualMachineProfileOverride?.osProfile?.["customData"],
                                windowsConfiguration: !p.virtualMachineProfileOverride?.osProfile
                                  ?.windowsConfiguration
                                  ? undefined
                                  : {
                                      provisionVMAgent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["provisionVMAgent"],
                                      enableAutomaticUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["enableAutomaticUpdates"],
                                      timeZone:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["timeZone"],
                                      additionalUnattendContent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["additionalUnattendContent"] ===
                                        undefined
                                          ? p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["additionalUnattendContent"]
                                          : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.[
                                              "additionalUnattendContent"
                                            ].map((p: any) => {
                                              return {
                                                passName: p["passName"],
                                                componentName: p["componentName"],
                                                settingName: p["settingName"],
                                                content: p["content"],
                                              };
                                            }),
                                      patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                        ?.windowsConfiguration?.patchSettings
                                        ? undefined
                                        : {
                                            patchMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "patchMode"
                                              ],
                                            enableHotpatching:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "enableHotpatching"
                                              ],
                                            assessmentMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "assessmentMode"
                                              ],
                                            automaticByPlatformSettings: !p
                                              .virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings
                                              ? undefined
                                              : {
                                                  rebootSetting:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.windowsConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "rebootSetting"
                                                    ],
                                                  bypassPlatformSafetyChecksOnUserSchedule:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.windowsConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "bypassPlatformSafetyChecksOnUserSchedule"
                                                    ],
                                                },
                                          },
                                      winRM: !p.virtualMachineProfileOverride?.osProfile
                                        ?.windowsConfiguration?.winRM
                                        ? undefined
                                        : {
                                            listeners:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.winRM?.["listeners"] ===
                                              undefined
                                                ? p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.winRM?.["listeners"]
                                                : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.winRM?.[
                                                    "listeners"
                                                  ].map((p: any) => {
                                                    return {
                                                      protocol: p["protocol"],
                                                      certificateUrl: p["certificateUrl"],
                                                    };
                                                  }),
                                          },
                                      enableVMAgentPlatformUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                                    },
                                linuxConfiguration: !p.virtualMachineProfileOverride?.osProfile
                                  ?.linuxConfiguration
                                  ? undefined
                                  : {
                                      disablePasswordAuthentication:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["disablePasswordAuthentication"],
                                      ssh: !p.virtualMachineProfileOverride?.osProfile
                                        ?.linuxConfiguration?.ssh
                                        ? undefined
                                        : {
                                            publicKeys:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                              undefined
                                                ? p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.ssh?.["publicKeys"]
                                                : p.virtualMachineProfileOverride?.osProfile?.linuxConfiguration?.ssh?.[
                                                    "publicKeys"
                                                  ].map((p: any) => {
                                                    return {
                                                      path: p["path"],
                                                      keyData: p["keyData"],
                                                    };
                                                  }),
                                          },
                                      provisionVMAgent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["provisionVMAgent"],
                                      patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                        ?.linuxConfiguration?.patchSettings
                                        ? undefined
                                        : {
                                            patchMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.patchSettings?.["patchMode"],
                                            assessmentMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.patchSettings?.[
                                                "assessmentMode"
                                              ],
                                            automaticByPlatformSettings: !p
                                              .virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings
                                              ? undefined
                                              : {
                                                  rebootSetting:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.linuxConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "rebootSetting"
                                                    ],
                                                  bypassPlatformSafetyChecksOnUserSchedule:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.linuxConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "bypassPlatformSafetyChecksOnUserSchedule"
                                                    ],
                                                },
                                          },
                                      enableVMAgentPlatformUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                                    },
                                secrets:
                                  p.virtualMachineProfileOverride?.osProfile?.["secrets"] ===
                                  undefined
                                    ? p.virtualMachineProfileOverride?.osProfile?.["secrets"]
                                    : p.virtualMachineProfileOverride?.osProfile?.["secrets"].map(
                                        (p: any) => {
                                          return {
                                            sourceVault: !p.sourceVault
                                              ? undefined
                                              : { id: p.sourceVault?.["id"] },
                                            vaultCertificates:
                                              p["vaultCertificates"] === undefined
                                                ? p["vaultCertificates"]
                                                : p["vaultCertificates"].map((p: any) => {
                                                    return {
                                                      certificateUrl: p["certificateUrl"],
                                                      certificateStore: p["certificateStore"],
                                                    };
                                                  }),
                                          };
                                        },
                                      ),
                                allowExtensionOperations:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "allowExtensionOperations"
                                  ],
                                requireGuestProvisionSignal:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "requireGuestProvisionSignal"
                                  ],
                              },
                          storageProfile: !p.virtualMachineProfileOverride?.storageProfile
                            ? undefined
                            : {
                                imageReference: !p.virtualMachineProfileOverride?.storageProfile
                                  ?.imageReference
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.storageProfile
                                        ?.imageReference?.["id"],
                                      publisher:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["publisher"],
                                      offer:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["offer"],
                                      sku: p.virtualMachineProfileOverride?.storageProfile
                                        ?.imageReference?.["sku"],
                                      version:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["version"],
                                      exactVersion:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["exactVersion"],
                                      sharedGalleryImageId:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["sharedGalleryImageId"],
                                      communityGalleryImageId:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["communityGalleryImageId"],
                                    },
                                osDisk: !p.virtualMachineProfileOverride?.storageProfile?.osDisk
                                  ? undefined
                                  : {
                                      name: p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.["name"],
                                      caching:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "caching"
                                        ],
                                      writeAcceleratorEnabled:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "writeAcceleratorEnabled"
                                        ],
                                      createOption:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "createOption"
                                        ],
                                      diffDiskSettings: !p.virtualMachineProfileOverride
                                        ?.storageProfile?.osDisk?.diffDiskSettings
                                        ? undefined
                                        : {
                                            option:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.diffDiskSettings?.["option"],
                                            placement:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.diffDiskSettings?.["placement"],
                                          },
                                      diskSizeGB:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "diskSizeGB"
                                        ],
                                      osType:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "osType"
                                        ],
                                      image: !p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.image
                                        ? undefined
                                        : {
                                            uri: p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.image?.["uri"],
                                          },
                                      vhdContainers:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "vhdContainers"
                                        ],
                                      managedDisk: !p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.managedDisk
                                        ? undefined
                                        : {
                                            storageAccountType:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.managedDisk?.["storageAccountType"],
                                            diskEncryptionSet: !p.virtualMachineProfileOverride
                                              ?.storageProfile?.osDisk?.managedDisk
                                              ?.diskEncryptionSet
                                              ? undefined
                                              : {
                                                  id: p.virtualMachineProfileOverride
                                                    ?.storageProfile?.osDisk?.managedDisk
                                                    ?.diskEncryptionSet?.["id"],
                                                },
                                            securityProfile: !p.virtualMachineProfileOverride
                                              ?.storageProfile?.osDisk?.managedDisk?.securityProfile
                                              ? undefined
                                              : {
                                                  securityEncryptionType:
                                                    p.virtualMachineProfileOverride?.storageProfile
                                                      ?.osDisk?.managedDisk?.securityProfile?.[
                                                      "securityEncryptionType"
                                                    ],
                                                  diskEncryptionSet: !p
                                                    .virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.managedDisk?.securityProfile
                                                    ?.diskEncryptionSet
                                                    ? undefined
                                                    : {
                                                        id: p.virtualMachineProfileOverride
                                                          ?.storageProfile?.osDisk?.managedDisk
                                                          ?.securityProfile?.diskEncryptionSet?.[
                                                          "id"
                                                        ],
                                                      },
                                                },
                                          },
                                      deleteOption:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "deleteOption"
                                        ],
                                    },
                                dataDisks:
                                  p.virtualMachineProfileOverride?.storageProfile?.["dataDisks"] ===
                                  undefined
                                    ? p.virtualMachineProfileOverride?.storageProfile?.["dataDisks"]
                                    : p.virtualMachineProfileOverride?.storageProfile?.[
                                        "dataDisks"
                                      ].map((p: any) => {
                                        return {
                                          name: p["name"],
                                          lun: p["lun"],
                                          caching: p["caching"],
                                          writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                                          createOption: p["createOption"],
                                          diskSizeGB: p["diskSizeGB"],
                                          managedDisk: !p.managedDisk
                                            ? undefined
                                            : {
                                                storageAccountType:
                                                  p.managedDisk?.["storageAccountType"],
                                                diskEncryptionSet: !p.managedDisk?.diskEncryptionSet
                                                  ? undefined
                                                  : {
                                                      id: p.managedDisk?.diskEncryptionSet?.["id"],
                                                    },
                                                securityProfile: !p.managedDisk?.securityProfile
                                                  ? undefined
                                                  : {
                                                      securityEncryptionType:
                                                        p.managedDisk?.securityProfile?.[
                                                          "securityEncryptionType"
                                                        ],
                                                      diskEncryptionSet: !p.managedDisk
                                                        ?.securityProfile?.diskEncryptionSet
                                                        ? undefined
                                                        : {
                                                            id: p.managedDisk?.securityProfile
                                                              ?.diskEncryptionSet?.["id"],
                                                          },
                                                    },
                                              },
                                          diskIOPSReadWrite: p["diskIOPSReadWrite"],
                                          diskMBpsReadWrite: p["diskMBpsReadWrite"],
                                          deleteOption: p["deleteOption"],
                                        };
                                      }),
                                diskControllerType:
                                  p.virtualMachineProfileOverride?.storageProfile?.[
                                    "diskControllerType"
                                  ],
                              },
                          networkProfile: !p.virtualMachineProfileOverride?.networkProfile
                            ? undefined
                            : {
                                healthProbe: !p.virtualMachineProfileOverride?.networkProfile
                                  ?.healthProbe
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.networkProfile
                                        ?.healthProbe?.["id"],
                                    },
                                networkInterfaceConfigurations:
                                  p.virtualMachineProfileOverride?.networkProfile?.[
                                    "networkInterfaceConfigurations"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkInterfaceConfigurations"
                                      ]
                                    : p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkInterfaceConfigurations"
                                      ].map((p: any) => {
                                        return {
                                          name: p["name"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                primary: p.properties?.["primary"],
                                                enableAcceleratedNetworking:
                                                  p.properties?.["enableAcceleratedNetworking"],
                                                disableTcpStateTracking:
                                                  p.properties?.["disableTcpStateTracking"],
                                                enableFpga: p.properties?.["enableFpga"],
                                                networkSecurityGroup: !p.properties
                                                  ?.networkSecurityGroup
                                                  ? undefined
                                                  : {
                                                      id: p.properties?.networkSecurityGroup?.[
                                                        "id"
                                                      ],
                                                    },
                                                dnsSettings: !p.properties?.dnsSettings
                                                  ? undefined
                                                  : {
                                                      dnsServers:
                                                        p.properties?.dnsSettings?.["dnsServers"],
                                                    },
                                                ipConfigurations: p.properties?.[
                                                  "ipConfigurations"
                                                ].map((p: any) => {
                                                  return {
                                                    name: p["name"],
                                                    properties: !p.properties
                                                      ? undefined
                                                      : {
                                                          subnet: !p.properties?.subnet
                                                            ? undefined
                                                            : {
                                                                id: p.properties?.subnet?.["id"],
                                                              },
                                                          primary: p.properties?.["primary"],
                                                          publicIPAddressConfiguration: !p
                                                            .properties
                                                            ?.publicIPAddressConfiguration
                                                            ? undefined
                                                            : {
                                                                name: p.properties
                                                                  ?.publicIPAddressConfiguration?.[
                                                                  "name"
                                                                ],
                                                                properties: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.properties
                                                                  ? undefined
                                                                  : {
                                                                      idleTimeoutInMinutes:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "idleTimeoutInMinutes"
                                                                        ],
                                                                      dnsSettings: !p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties?.dnsSettings
                                                                        ? undefined
                                                                        : {
                                                                            domainNameLabel:
                                                                              p.properties
                                                                                ?.publicIPAddressConfiguration
                                                                                ?.properties
                                                                                ?.dnsSettings?.[
                                                                                "domainNameLabel"
                                                                              ],
                                                                            domainNameLabelScope:
                                                                              p.properties
                                                                                ?.publicIPAddressConfiguration
                                                                                ?.properties
                                                                                ?.dnsSettings?.[
                                                                                "domainNameLabelScope"
                                                                              ],
                                                                          },
                                                                      ipTags:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "ipTags"
                                                                        ] === undefined
                                                                          ? p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "ipTags"
                                                                            ]
                                                                          : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                              "ipTags"
                                                                            ].map((p: any) => {
                                                                              return {
                                                                                ipTagType:
                                                                                  p["ipTagType"],
                                                                                tag: p["tag"],
                                                                              };
                                                                            }),
                                                                      publicIPPrefix: !p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties?.publicIPPrefix
                                                                        ? undefined
                                                                        : {
                                                                            id: p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties
                                                                              ?.publicIPPrefix?.[
                                                                              "id"
                                                                            ],
                                                                          },
                                                                      publicIPAddressVersion:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "publicIPAddressVersion"
                                                                        ],
                                                                      deleteOption:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "deleteOption"
                                                                        ],
                                                                    },
                                                                sku: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.sku
                                                                  ? undefined
                                                                  : {
                                                                      name: p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.sku?.["name"],
                                                                      tier: p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.sku?.["tier"],
                                                                    },
                                                              },
                                                          privateIPAddressVersion:
                                                            p.properties?.[
                                                              "privateIPAddressVersion"
                                                            ],
                                                          applicationGatewayBackendAddressPools:
                                                            p.properties?.[
                                                              "applicationGatewayBackendAddressPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "applicationGatewayBackendAddressPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "applicationGatewayBackendAddressPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          applicationSecurityGroups:
                                                            p.properties?.[
                                                              "applicationSecurityGroups"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "applicationSecurityGroups"
                                                                ]
                                                              : p.properties?.[
                                                                  "applicationSecurityGroups"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          loadBalancerBackendAddressPools:
                                                            p.properties?.[
                                                              "loadBalancerBackendAddressPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "loadBalancerBackendAddressPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "loadBalancerBackendAddressPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          loadBalancerInboundNatPools:
                                                            p.properties?.[
                                                              "loadBalancerInboundNatPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "loadBalancerInboundNatPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "loadBalancerInboundNatPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                        },
                                                  };
                                                }),
                                                enableIPForwarding:
                                                  p.properties?.["enableIPForwarding"],
                                                deleteOption: p.properties?.["deleteOption"],
                                                auxiliaryMode: p.properties?.["auxiliaryMode"],
                                                auxiliarySku: p.properties?.["auxiliarySku"],
                                              },
                                        };
                                      }),
                                networkApiVersion:
                                  p.virtualMachineProfileOverride?.networkProfile?.[
                                    "networkApiVersion"
                                  ],
                              },
                          securityProfile: !p.virtualMachineProfileOverride?.securityProfile
                            ? undefined
                            : {
                                uefiSettings: !p.virtualMachineProfileOverride?.securityProfile
                                  ?.uefiSettings
                                  ? undefined
                                  : {
                                      secureBootEnabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.uefiSettings?.["secureBootEnabled"],
                                      vTpmEnabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.uefiSettings?.["vTpmEnabled"],
                                    },
                                encryptionAtHost:
                                  p.virtualMachineProfileOverride?.securityProfile?.[
                                    "encryptionAtHost"
                                  ],
                                securityType:
                                  p.virtualMachineProfileOverride?.securityProfile?.[
                                    "securityType"
                                  ],
                                encryptionIdentity: !p.virtualMachineProfileOverride
                                  ?.securityProfile?.encryptionIdentity
                                  ? undefined
                                  : {
                                      userAssignedIdentityResourceId:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.encryptionIdentity?.["userAssignedIdentityResourceId"],
                                    },
                                proxyAgentSettings: !p.virtualMachineProfileOverride
                                  ?.securityProfile?.proxyAgentSettings
                                  ? undefined
                                  : {
                                      enabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.proxyAgentSettings?.["enabled"],
                                      mode: p.virtualMachineProfileOverride?.securityProfile
                                        ?.proxyAgentSettings?.["mode"],
                                      keyIncarnationId:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.proxyAgentSettings?.["keyIncarnationId"],
                                    },
                              },
                          diagnosticsProfile: !p.virtualMachineProfileOverride?.diagnosticsProfile
                            ? undefined
                            : {
                                bootDiagnostics: !p.virtualMachineProfileOverride
                                  ?.diagnosticsProfile?.bootDiagnostics
                                  ? undefined
                                  : {
                                      enabled:
                                        p.virtualMachineProfileOverride?.diagnosticsProfile
                                          ?.bootDiagnostics?.["enabled"],
                                      storageUri:
                                        p.virtualMachineProfileOverride?.diagnosticsProfile
                                          ?.bootDiagnostics?.["storageUri"],
                                    },
                              },
                          extensionProfile: !p.virtualMachineProfileOverride?.extensionProfile
                            ? undefined
                            : {
                                extensions:
                                  p.virtualMachineProfileOverride?.extensionProfile?.[
                                    "extensions"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensions"
                                      ]
                                    : p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensions"
                                      ].map((p: any) => {
                                        return {
                                          id: p["id"],
                                          name: p["name"],
                                          type: p["type"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                forceUpdateTag: p.properties?.["forceUpdateTag"],
                                                publisher: p.properties?.["publisher"],
                                                type: p.properties?.["type"],
                                                typeHandlerVersion:
                                                  p.properties?.["typeHandlerVersion"],
                                                autoUpgradeMinorVersion:
                                                  p.properties?.["autoUpgradeMinorVersion"],
                                                enableAutomaticUpgrade:
                                                  p.properties?.["enableAutomaticUpgrade"],
                                                settings: p.properties?.["settings"],
                                                protectedSettings:
                                                  p.properties?.["protectedSettings"],
                                                provisioningState:
                                                  p.properties?.["provisioningState"],
                                                provisionAfterExtensions:
                                                  p.properties?.["provisionAfterExtensions"],
                                                suppressFailures:
                                                  p.properties?.["suppressFailures"],
                                                protectedSettingsFromKeyVault: !p.properties
                                                  ?.protectedSettingsFromKeyVault
                                                  ? undefined
                                                  : {
                                                      secretUrl:
                                                        p.properties
                                                          ?.protectedSettingsFromKeyVault?.[
                                                          "secretUrl"
                                                        ],
                                                      sourceVault: {
                                                        id: p.properties
                                                          ?.protectedSettingsFromKeyVault
                                                          ?.sourceVault["id"],
                                                      },
                                                    },
                                              },
                                        };
                                      }),
                                extensionsTimeBudget:
                                  p.virtualMachineProfileOverride?.extensionProfile?.[
                                    "extensionsTimeBudget"
                                  ],
                              },
                          licenseType: p.virtualMachineProfileOverride?.["licenseType"],
                          scheduledEventsProfile: !p.virtualMachineProfileOverride
                            ?.scheduledEventsProfile
                            ? undefined
                            : {
                                terminateNotificationProfile: !p.virtualMachineProfileOverride
                                  ?.scheduledEventsProfile?.terminateNotificationProfile
                                  ? undefined
                                  : {
                                      notBeforeTimeout:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.terminateNotificationProfile?.["notBeforeTimeout"],
                                      enable:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.terminateNotificationProfile?.["enable"],
                                    },
                                osImageNotificationProfile: !p.virtualMachineProfileOverride
                                  ?.scheduledEventsProfile?.osImageNotificationProfile
                                  ? undefined
                                  : {
                                      notBeforeTimeout:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.osImageNotificationProfile?.["notBeforeTimeout"],
                                      enable:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.osImageNotificationProfile?.["enable"],
                                    },
                              },
                          userData: p.virtualMachineProfileOverride?.["userData"],
                          capacityReservation: !p.virtualMachineProfileOverride?.capacityReservation
                            ? undefined
                            : {
                                capacityReservationGroup: !p.virtualMachineProfileOverride
                                  ?.capacityReservation?.capacityReservationGroup
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.capacityReservation
                                        ?.capacityReservationGroup?.["id"],
                                    },
                              },
                          applicationProfile: !p.virtualMachineProfileOverride?.applicationProfile
                            ? undefined
                            : {
                                galleryApplications:
                                  p.virtualMachineProfileOverride?.applicationProfile?.[
                                    "galleryApplications"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.applicationProfile?.[
                                        "galleryApplications"
                                      ]
                                    : p.virtualMachineProfileOverride?.applicationProfile?.[
                                        "galleryApplications"
                                      ].map((p: any) => {
                                        return {
                                          tags: p["tags"],
                                          order: p["order"],
                                          packageReferenceId: p["packageReferenceId"],
                                          configurationReference: p["configurationReference"],
                                          treatFailureAsDeploymentFailure:
                                            p["treatFailureAsDeploymentFailure"],
                                          enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                                        };
                                      }),
                              },
                          hardwareProfile: !p.virtualMachineProfileOverride?.hardwareProfile
                            ? undefined
                            : {
                                vmSizeProperties: !p.virtualMachineProfileOverride?.hardwareProfile
                                  ?.vmSizeProperties
                                  ? undefined
                                  : {
                                      vCPUsAvailable:
                                        p.virtualMachineProfileOverride?.hardwareProfile
                                          ?.vmSizeProperties?.["vCPUsAvailable"],
                                      vCPUsPerCore:
                                        p.virtualMachineProfileOverride?.hardwareProfile
                                          ?.vmSizeProperties?.["vCPUsPerCore"],
                                    },
                              },
                          serviceArtifactReference: !p.virtualMachineProfileOverride
                            ?.serviceArtifactReference
                            ? undefined
                            : {
                                id: p.virtualMachineProfileOverride?.serviceArtifactReference?.[
                                  "id"
                                ],
                              },
                          securityPostureReference: !p.virtualMachineProfileOverride
                            ?.securityPostureReference
                            ? undefined
                            : {
                                id: p.virtualMachineProfileOverride?.securityPostureReference?.[
                                  "id"
                                ],
                                excludeExtensions:
                                  p.virtualMachineProfileOverride?.securityPostureReference?.[
                                    "excludeExtensions"
                                  ],
                                isOverridable:
                                  p.virtualMachineProfileOverride?.securityPostureReference?.[
                                    "isOverridable"
                                  ],
                              },
                          timeCreated:
                            p.virtualMachineProfileOverride?.["timeCreated"] !== undefined
                              ? new Date(p.virtualMachineProfileOverride?.["timeCreated"])
                              : undefined,
                        },
                  };
                }),
              },
          computeProfile: {
            baseVirtualMachineProfile: {
              osProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                ? undefined
                : {
                    computerNamePrefix:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "computerNamePrefix"
                      ],
                    adminUsername:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminUsername"
                      ],
                    adminPassword:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminPassword"
                      ],
                    customData:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "customData"
                      ],
                    windowsConfiguration: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                      ? undefined
                      : {
                          provisionVMAgent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["provisionVMAgent"],
                          enableAutomaticUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["enableAutomaticUpdates"],
                          timeZone:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["timeZone"],
                          additionalUnattendContent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["additionalUnattendContent"] ===
                            undefined
                              ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                                  .osProfile?.windowsConfiguration?.["additionalUnattendContent"]
                              : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.[
                                  "additionalUnattendContent"
                                ].map((p: any) => {
                                  return {
                                    passName: p["passName"],
                                    componentName: p["componentName"],
                                    settingName: p["settingName"],
                                    content: p["content"],
                                  };
                                }),
                          patchSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                            ?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.["patchMode"],
                                enableHotpatching:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "enableHotpatching"
                                  ],
                                assessmentMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          winRM: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.windowsConfiguration?.winRM
                            ? undefined
                            : {
                                listeners:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.winRM?.["listeners"] ===
                                  undefined
                                    ? result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                        ?.winRM?.["listeners"]
                                    : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.winRM?.[
                                        "listeners"
                                      ].map((p: any) => {
                                        return {
                                          protocol: p["protocol"],
                                          certificateUrl: p["certificateUrl"],
                                        };
                                      }),
                              },
                          enableVMAgentPlatformUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    linuxConfiguration: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                      ? undefined
                      : {
                          disablePasswordAuthentication:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["disablePasswordAuthentication"],
                          ssh: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.linuxConfiguration?.ssh
                            ? undefined
                            : {
                                publicKeys:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                  undefined
                                    ? result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                        ?.ssh?.["publicKeys"]
                                    : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.linuxConfiguration?.ssh?.[
                                        "publicKeys"
                                      ].map((p: any) => {
                                        return {
                                          path: p["path"],
                                          keyData: p["keyData"],
                                        };
                                      }),
                              },
                          provisionVMAgent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["provisionVMAgent"],
                          patchSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.linuxConfiguration?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.["patchMode"],
                                assessmentMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          enableVMAgentPlatformUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    secrets:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "secrets"
                      ] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.["secrets"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ].map((p: any) => {
                            return {
                              sourceVault: !p.sourceVault
                                ? undefined
                                : { id: p.sourceVault?.["id"] },
                              vaultCertificates:
                                p["vaultCertificates"] === undefined
                                  ? p["vaultCertificates"]
                                  : p["vaultCertificates"].map((p: any) => {
                                      return {
                                        certificateUrl: p["certificateUrl"],
                                        certificateStore: p["certificateStore"],
                                      };
                                    }),
                            };
                          }),
                    allowExtensionOperations:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "allowExtensionOperations"
                      ],
                    requireGuestProvisionSignal:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "requireGuestProvisionSignal"
                      ],
                  },
              storageProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .storageProfile
                ? undefined
                : {
                    imageReference: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.storageProfile?.imageReference
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["id"],
                          publisher:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["publisher"],
                          offer:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["offer"],
                          sku: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["sku"],
                          version:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["version"],
                          exactVersion:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["exactVersion"],
                          sharedGalleryImageId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["sharedGalleryImageId"],
                          communityGalleryImageId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["communityGalleryImageId"],
                        },
                    osDisk: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .storageProfile?.osDisk
                      ? undefined
                      : {
                          name: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.["name"],
                          caching:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["caching"],
                          writeAcceleratorEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["writeAcceleratorEnabled"],
                          createOption:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["createOption"],
                          diffDiskSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.diffDiskSettings
                            ? undefined
                            : {
                                option:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["option"],
                                placement:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["placement"],
                              },
                          diskSizeGB:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["diskSizeGB"],
                          osType:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["osType"],
                          image: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.image
                            ? undefined
                            : {
                                uri: result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.image?.["uri"],
                              },
                          vhdContainers:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["vhdContainers"],
                          managedDisk: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                            ? undefined
                            : {
                                storageAccountType:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.managedDisk?.["storageAccountType"],
                                diskEncryptionSet: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.diskEncryptionSet
                                  ? undefined
                                  : {
                                      id: result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.diskEncryptionSet?.["id"],
                                    },
                                securityProfile: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.securityProfile
                                  ? undefined
                                  : {
                                      securityEncryptionType:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.storageProfile?.osDisk
                                          ?.managedDisk?.securityProfile?.[
                                          "securityEncryptionType"
                                        ],
                                      diskEncryptionSet: !result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.securityProfile?.diskEncryptionSet
                                        ? undefined
                                        : {
                                            id: result.body.properties?.computeProfile
                                              .baseVirtualMachineProfile.storageProfile?.osDisk
                                              ?.managedDisk?.securityProfile?.diskEncryptionSet?.[
                                              "id"
                                            ],
                                          },
                                    },
                              },
                          deleteOption:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["deleteOption"],
                        },
                    dataDisks:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["dataDisks"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.["dataDisks"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "dataDisks"
                          ].map((p: any) => {
                            return {
                              name: p["name"],
                              lun: p["lun"],
                              caching: p["caching"],
                              writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                              createOption: p["createOption"],
                              diskSizeGB: p["diskSizeGB"],
                              managedDisk: !p.managedDisk
                                ? undefined
                                : {
                                    storageAccountType: p.managedDisk?.["storageAccountType"],
                                    diskEncryptionSet: !p.managedDisk?.diskEncryptionSet
                                      ? undefined
                                      : {
                                          id: p.managedDisk?.diskEncryptionSet?.["id"],
                                        },
                                    securityProfile: !p.managedDisk?.securityProfile
                                      ? undefined
                                      : {
                                          securityEncryptionType:
                                            p.managedDisk?.securityProfile?.[
                                              "securityEncryptionType"
                                            ],
                                          diskEncryptionSet: !p.managedDisk?.securityProfile
                                            ?.diskEncryptionSet
                                            ? undefined
                                            : {
                                                id: p.managedDisk?.securityProfile
                                                  ?.diskEncryptionSet?.["id"],
                                              },
                                        },
                                  },
                              diskIOPSReadWrite: p["diskIOPSReadWrite"],
                              diskMBpsReadWrite: p["diskMBpsReadWrite"],
                              deleteOption: p["deleteOption"],
                            };
                          }),
                    diskControllerType:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["diskControllerType"],
                  },
              networkProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .networkProfile
                ? undefined
                : {
                    healthProbe: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .networkProfile?.healthProbe
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.healthProbe?.["id"],
                        },
                    networkInterfaceConfigurations:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkInterfaceConfigurations"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.["networkInterfaceConfigurations"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkInterfaceConfigurations"
                          ].map((p: any) => {
                            return {
                              name: p["name"],
                              properties: !p.properties
                                ? undefined
                                : {
                                    primary: p.properties?.["primary"],
                                    enableAcceleratedNetworking:
                                      p.properties?.["enableAcceleratedNetworking"],
                                    disableTcpStateTracking:
                                      p.properties?.["disableTcpStateTracking"],
                                    enableFpga: p.properties?.["enableFpga"],
                                    networkSecurityGroup: !p.properties?.networkSecurityGroup
                                      ? undefined
                                      : {
                                          id: p.properties?.networkSecurityGroup?.["id"],
                                        },
                                    dnsSettings: !p.properties?.dnsSettings
                                      ? undefined
                                      : {
                                          dnsServers: p.properties?.dnsSettings?.["dnsServers"],
                                        },
                                    ipConfigurations: p.properties?.["ipConfigurations"].map(
                                      (p: any) => {
                                        return {
                                          name: p["name"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                subnet: !p.properties?.subnet
                                                  ? undefined
                                                  : {
                                                      id: p.properties?.subnet?.["id"],
                                                    },
                                                primary: p.properties?.["primary"],
                                                publicIPAddressConfiguration: !p.properties
                                                  ?.publicIPAddressConfiguration
                                                  ? undefined
                                                  : {
                                                      name: p.properties
                                                        ?.publicIPAddressConfiguration?.["name"],
                                                      properties: !p.properties
                                                        ?.publicIPAddressConfiguration?.properties
                                                        ? undefined
                                                        : {
                                                            idleTimeoutInMinutes:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.[
                                                                "idleTimeoutInMinutes"
                                                              ],
                                                            dnsSettings: !p.properties
                                                              ?.publicIPAddressConfiguration
                                                              ?.properties?.dnsSettings
                                                              ? undefined
                                                              : {
                                                                  domainNameLabel:
                                                                    p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.properties?.dnsSettings?.[
                                                                      "domainNameLabel"
                                                                    ],
                                                                  domainNameLabelScope:
                                                                    p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.properties?.dnsSettings?.[
                                                                      "domainNameLabelScope"
                                                                    ],
                                                                },
                                                            ipTags:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.["ipTags"] ===
                                                              undefined
                                                                ? p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.["ipTags"]
                                                                : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                    "ipTags"
                                                                  ].map((p: any) => {
                                                                    return {
                                                                      ipTagType: p["ipTagType"],
                                                                      tag: p["tag"],
                                                                    };
                                                                  }),
                                                            publicIPPrefix: !p.properties
                                                              ?.publicIPAddressConfiguration
                                                              ?.properties?.publicIPPrefix
                                                              ? undefined
                                                              : {
                                                                  id: p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.publicIPPrefix?.[
                                                                    "id"
                                                                  ],
                                                                },
                                                            publicIPAddressVersion:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.[
                                                                "publicIPAddressVersion"
                                                              ],
                                                            deleteOption:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.["deleteOption"],
                                                          },
                                                      sku: !p.properties
                                                        ?.publicIPAddressConfiguration?.sku
                                                        ? undefined
                                                        : {
                                                            name: p.properties
                                                              ?.publicIPAddressConfiguration?.sku?.[
                                                              "name"
                                                            ],
                                                            tier: p.properties
                                                              ?.publicIPAddressConfiguration?.sku?.[
                                                              "tier"
                                                            ],
                                                          },
                                                    },
                                                privateIPAddressVersion:
                                                  p.properties?.["privateIPAddressVersion"],
                                                applicationGatewayBackendAddressPools:
                                                  p.properties?.[
                                                    "applicationGatewayBackendAddressPools"
                                                  ] === undefined
                                                    ? p.properties?.[
                                                        "applicationGatewayBackendAddressPools"
                                                      ]
                                                    : p.properties?.[
                                                        "applicationGatewayBackendAddressPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                applicationSecurityGroups:
                                                  p.properties?.["applicationSecurityGroups"] ===
                                                  undefined
                                                    ? p.properties?.["applicationSecurityGroups"]
                                                    : p.properties?.[
                                                        "applicationSecurityGroups"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerBackendAddressPools:
                                                  p.properties?.[
                                                    "loadBalancerBackendAddressPools"
                                                  ] === undefined
                                                    ? p.properties?.[
                                                        "loadBalancerBackendAddressPools"
                                                      ]
                                                    : p.properties?.[
                                                        "loadBalancerBackendAddressPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerInboundNatPools:
                                                  p.properties?.["loadBalancerInboundNatPools"] ===
                                                  undefined
                                                    ? p.properties?.["loadBalancerInboundNatPools"]
                                                    : p.properties?.[
                                                        "loadBalancerInboundNatPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                              },
                                        };
                                      },
                                    ),
                                    enableIPForwarding: p.properties?.["enableIPForwarding"],
                                    deleteOption: p.properties?.["deleteOption"],
                                    auxiliaryMode: p.properties?.["auxiliaryMode"],
                                    auxiliarySku: p.properties?.["auxiliarySku"],
                                  },
                            };
                          }),
                    networkApiVersion:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkApiVersion"],
                  },
              securityProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .securityProfile
                ? undefined
                : {
                    uefiSettings: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityProfile?.uefiSettings
                      ? undefined
                      : {
                          secureBootEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["secureBootEnabled"],
                          vTpmEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["vTpmEnabled"],
                        },
                    encryptionAtHost:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["encryptionAtHost"],
                    securityType:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["securityType"],
                    encryptionIdentity: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.encryptionIdentity
                      ? undefined
                      : {
                          userAssignedIdentityResourceId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.encryptionIdentity?.[
                              "userAssignedIdentityResourceId"
                            ],
                        },
                    proxyAgentSettings: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.proxyAgentSettings
                      ? undefined
                      : {
                          enabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["enabled"],
                          mode: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .securityProfile?.proxyAgentSettings?.["mode"],
                          keyIncarnationId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["keyIncarnationId"],
                        },
                  },
              diagnosticsProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .diagnosticsProfile
                ? undefined
                : {
                    bootDiagnostics: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.diagnosticsProfile?.bootDiagnostics
                      ? undefined
                      : {
                          enabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["enabled"],
                          storageUri:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["storageUri"],
                        },
                  },
              extensionProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .extensionProfile
                ? undefined
                : {
                    extensions:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensions"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .extensionProfile?.["extensions"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensions"
                          ].map((p: any) => {
                            return {
                              id: p["id"],
                              name: p["name"],
                              type: p["type"],
                              properties: !p.properties
                                ? undefined
                                : {
                                    forceUpdateTag: p.properties?.["forceUpdateTag"],
                                    publisher: p.properties?.["publisher"],
                                    type: p.properties?.["type"],
                                    typeHandlerVersion: p.properties?.["typeHandlerVersion"],
                                    autoUpgradeMinorVersion:
                                      p.properties?.["autoUpgradeMinorVersion"],
                                    enableAutomaticUpgrade:
                                      p.properties?.["enableAutomaticUpgrade"],
                                    settings: p.properties?.["settings"],
                                    protectedSettings: p.properties?.["protectedSettings"],
                                    provisioningState: p.properties?.["provisioningState"],
                                    provisionAfterExtensions:
                                      p.properties?.["provisionAfterExtensions"],
                                    suppressFailures: p.properties?.["suppressFailures"],
                                    protectedSettingsFromKeyVault: !p.properties
                                      ?.protectedSettingsFromKeyVault
                                      ? undefined
                                      : {
                                          secretUrl:
                                            p.properties?.protectedSettingsFromKeyVault?.[
                                              "secretUrl"
                                            ],
                                          sourceVault: {
                                            id: p.properties?.protectedSettingsFromKeyVault
                                              ?.sourceVault["id"],
                                          },
                                        },
                                  },
                            };
                          }),
                    extensionsTimeBudget:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensionsTimeBudget"],
                  },
              licenseType:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["licenseType"],
              scheduledEventsProfile: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.scheduledEventsProfile
                ? undefined
                : {
                    terminateNotificationProfile: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile
                      ?.terminateNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.["enable"],
                        },
                    osImageNotificationProfile: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile?.osImageNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.["enable"],
                        },
                  },
              userData:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["userData"],
              capacityReservation: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .capacityReservation
                ? undefined
                : {
                    capacityReservationGroup: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.capacityReservation?.capacityReservationGroup
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .capacityReservation?.capacityReservationGroup?.["id"],
                        },
                  },
              applicationProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .applicationProfile
                ? undefined
                : {
                    galleryApplications:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .applicationProfile?.["galleryApplications"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .applicationProfile?.["galleryApplications"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.applicationProfile?.[
                            "galleryApplications"
                          ].map((p: any) => {
                            return {
                              tags: p["tags"],
                              order: p["order"],
                              packageReferenceId: p["packageReferenceId"],
                              configurationReference: p["configurationReference"],
                              treatFailureAsDeploymentFailure: p["treatFailureAsDeploymentFailure"],
                              enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                            };
                          }),
                  },
              hardwareProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .hardwareProfile
                ? undefined
                : {
                    vmSizeProperties: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.hardwareProfile?.vmSizeProperties
                      ? undefined
                      : {
                          vCPUsAvailable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsAvailable"],
                          vCPUsPerCore:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsPerCore"],
                        },
                  },
              serviceArtifactReference: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.serviceArtifactReference
                ? undefined
                : {
                    id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .serviceArtifactReference?.["id"],
                  },
              securityPostureReference: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.securityPostureReference
                ? undefined
                : {
                    id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityPostureReference?.["id"],
                    excludeExtensions:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["excludeExtensions"],
                    isOverridable:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["isOverridable"],
                  },
              timeCreated:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"] !==
                undefined
                  ? new Date(
                      result.body.properties?.computeProfile.baseVirtualMachineProfile[
                        "timeCreated"
                      ],
                    )
                  : undefined,
            },
            computeApiVersion: result.body.properties?.computeProfile["computeApiVersion"],
            platformFaultDomainCount:
              result.body.properties?.computeProfile["platformFaultDomainCount"],
            additionalVirtualMachineCapabilities: !result.body.properties?.computeProfile
              .additionalVirtualMachineCapabilities
              ? undefined
              : {
                  ultraSSDEnabled:
                    result.body.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                      "ultraSSDEnabled"
                    ],
                  hibernationEnabled:
                    result.body.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                      "hibernationEnabled"
                    ],
                },
          },
          timeCreated:
            result.body.properties?.["timeCreated"] !== undefined
              ? new Date(result.body.properties?.["timeCreated"])
              : undefined,
          uniqueId: result.body.properties?.["uniqueId"],
        },
    zones: result.body["zones"],
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities: result.body.identity?.["userAssignedIdentities"],
        },
    plan: !result.body.plan
      ? undefined
      : {
          name: result.body.plan?.["name"],
          publisher: result.body.plan?.["publisher"],
          product: result.body.plan?.["product"],
          promotionCode: result.body.plan?.["promotionCode"],
          version: result.body.plan?.["version"],
        },
  };
}

/** Get a Fleet */
export async function fleetsGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): Promise<Fleet> {
  const result = await _fleetsGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    fleetName,
    options,
  );
  return _fleetsGetDeserialize(result);
}

export function _fleetsCreateOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !resource.tags ? resource.tags : (serializeRecord(resource.tags as any) as any),
        location: resource["location"],
        properties: !resource.properties
          ? resource.properties
          : fleetPropertiesSerializer(resource.properties),
        zones: resource["zones"],
        identity: !resource.identity
          ? resource.identity
          : managedServiceIdentitySerializer(resource.identity),
        plan: !resource.plan ? resource.plan : planSerializer(resource.plan),
      },
    });
}

export async function _fleetsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Fleet> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    tags: result.body["tags"],
    location: result.body["location"],
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          spotPriorityProfile: !result.body.properties?.spotPriorityProfile
            ? undefined
            : {
                capacity: result.body.properties?.spotPriorityProfile?.["capacity"],
                minCapacity: result.body.properties?.spotPriorityProfile?.["minCapacity"],
                maxPricePerVM: result.body.properties?.spotPriorityProfile?.["maxPricePerVM"],
                evictionPolicy: result.body.properties?.spotPriorityProfile?.["evictionPolicy"],
                allocationStrategy:
                  result.body.properties?.spotPriorityProfile?.["allocationStrategy"],
                maintain: result.body.properties?.spotPriorityProfile?.["maintain"],
              },
          regularPriorityProfile: !result.body.properties?.regularPriorityProfile
            ? undefined
            : {
                capacity: result.body.properties?.regularPriorityProfile?.["capacity"],
                minCapacity: result.body.properties?.regularPriorityProfile?.["minCapacity"],
                allocationStrategy:
                  result.body.properties?.regularPriorityProfile?.["allocationStrategy"],
              },
          vmSizesProfile: result.body.properties?.["vmSizesProfile"].map((p: any) => {
            return { name: p["name"], rank: p["rank"] };
          }),
          vmAttributes: !result.body.properties?.vmAttributes
            ? undefined
            : {
                vCpuCount: {
                  min: result.body.properties?.vmAttributes?.vCpuCount["min"],
                  max: result.body.properties?.vmAttributes?.vCpuCount["max"],
                },
                memoryInGiB: {
                  min: result.body.properties?.vmAttributes?.memoryInGiB["min"],
                  max: result.body.properties?.vmAttributes?.memoryInGiB["max"],
                },
                memoryInGiBPerVCpu: !result.body.properties?.vmAttributes?.memoryInGiBPerVCpu
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.memoryInGiBPerVCpu?.["min"],
                      max: result.body.properties?.vmAttributes?.memoryInGiBPerVCpu?.["max"],
                    },
                localStorageSupport: result.body.properties?.vmAttributes?.["localStorageSupport"],
                localStorageInGiB: !result.body.properties?.vmAttributes?.localStorageInGiB
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.localStorageInGiB?.["min"],
                      max: result.body.properties?.vmAttributes?.localStorageInGiB?.["max"],
                    },
                localStorageDiskTypes:
                  result.body.properties?.vmAttributes?.["localStorageDiskTypes"],
                dataDiskCount: !result.body.properties?.vmAttributes?.dataDiskCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.dataDiskCount?.["min"],
                      max: result.body.properties?.vmAttributes?.dataDiskCount?.["max"],
                    },
                networkInterfaceCount: !result.body.properties?.vmAttributes?.networkInterfaceCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.networkInterfaceCount?.["min"],
                      max: result.body.properties?.vmAttributes?.networkInterfaceCount?.["max"],
                    },
                networkBandwidthInMbps: !result.body.properties?.vmAttributes
                  ?.networkBandwidthInMbps
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.networkBandwidthInMbps?.["min"],
                      max: result.body.properties?.vmAttributes?.networkBandwidthInMbps?.["max"],
                    },
                rdmaSupport: result.body.properties?.vmAttributes?.["rdmaSupport"],
                rdmaNetworkInterfaceCount: !result.body.properties?.vmAttributes
                  ?.rdmaNetworkInterfaceCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["min"],
                      max: result.body.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["max"],
                    },
                acceleratorSupport: result.body.properties?.vmAttributes?.["acceleratorSupport"],
                acceleratorManufacturers:
                  result.body.properties?.vmAttributes?.["acceleratorManufacturers"],
                acceleratorTypes: result.body.properties?.vmAttributes?.["acceleratorTypes"],
                acceleratorCount: !result.body.properties?.vmAttributes?.acceleratorCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.acceleratorCount?.["min"],
                      max: result.body.properties?.vmAttributes?.acceleratorCount?.["max"],
                    },
                vmCategories: result.body.properties?.vmAttributes?.["vmCategories"],
                architectureTypes: result.body.properties?.vmAttributes?.["architectureTypes"],
                cpuManufacturers: result.body.properties?.vmAttributes?.["cpuManufacturers"],
                burstableSupport: result.body.properties?.vmAttributes?.["burstableSupport"],
                excludedVMSizes: result.body.properties?.vmAttributes?.["excludedVMSizes"],
              },
          additionalLocationsProfile: !result.body.properties?.additionalLocationsProfile
            ? undefined
            : {
                locationProfiles: result.body.properties?.additionalLocationsProfile?.[
                  "locationProfiles"
                ].map((p: any) => {
                  return {
                    location: p["location"],
                    virtualMachineProfileOverride: !p.virtualMachineProfileOverride
                      ? undefined
                      : {
                          osProfile: !p.virtualMachineProfileOverride?.osProfile
                            ? undefined
                            : {
                                computerNamePrefix:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "computerNamePrefix"
                                  ],
                                adminUsername:
                                  p.virtualMachineProfileOverride?.osProfile?.["adminUsername"],
                                adminPassword:
                                  p.virtualMachineProfileOverride?.osProfile?.["adminPassword"],
                                customData:
                                  p.virtualMachineProfileOverride?.osProfile?.["customData"],
                                windowsConfiguration: !p.virtualMachineProfileOverride?.osProfile
                                  ?.windowsConfiguration
                                  ? undefined
                                  : {
                                      provisionVMAgent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["provisionVMAgent"],
                                      enableAutomaticUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["enableAutomaticUpdates"],
                                      timeZone:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["timeZone"],
                                      additionalUnattendContent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["additionalUnattendContent"] ===
                                        undefined
                                          ? p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["additionalUnattendContent"]
                                          : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.[
                                              "additionalUnattendContent"
                                            ].map((p: any) => {
                                              return {
                                                passName: p["passName"],
                                                componentName: p["componentName"],
                                                settingName: p["settingName"],
                                                content: p["content"],
                                              };
                                            }),
                                      patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                        ?.windowsConfiguration?.patchSettings
                                        ? undefined
                                        : {
                                            patchMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "patchMode"
                                              ],
                                            enableHotpatching:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "enableHotpatching"
                                              ],
                                            assessmentMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "assessmentMode"
                                              ],
                                            automaticByPlatformSettings: !p
                                              .virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings
                                              ? undefined
                                              : {
                                                  rebootSetting:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.windowsConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "rebootSetting"
                                                    ],
                                                  bypassPlatformSafetyChecksOnUserSchedule:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.windowsConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "bypassPlatformSafetyChecksOnUserSchedule"
                                                    ],
                                                },
                                          },
                                      winRM: !p.virtualMachineProfileOverride?.osProfile
                                        ?.windowsConfiguration?.winRM
                                        ? undefined
                                        : {
                                            listeners:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.winRM?.["listeners"] ===
                                              undefined
                                                ? p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.winRM?.["listeners"]
                                                : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.winRM?.[
                                                    "listeners"
                                                  ].map((p: any) => {
                                                    return {
                                                      protocol: p["protocol"],
                                                      certificateUrl: p["certificateUrl"],
                                                    };
                                                  }),
                                          },
                                      enableVMAgentPlatformUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                                    },
                                linuxConfiguration: !p.virtualMachineProfileOverride?.osProfile
                                  ?.linuxConfiguration
                                  ? undefined
                                  : {
                                      disablePasswordAuthentication:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["disablePasswordAuthentication"],
                                      ssh: !p.virtualMachineProfileOverride?.osProfile
                                        ?.linuxConfiguration?.ssh
                                        ? undefined
                                        : {
                                            publicKeys:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                              undefined
                                                ? p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.ssh?.["publicKeys"]
                                                : p.virtualMachineProfileOverride?.osProfile?.linuxConfiguration?.ssh?.[
                                                    "publicKeys"
                                                  ].map((p: any) => {
                                                    return {
                                                      path: p["path"],
                                                      keyData: p["keyData"],
                                                    };
                                                  }),
                                          },
                                      provisionVMAgent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["provisionVMAgent"],
                                      patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                        ?.linuxConfiguration?.patchSettings
                                        ? undefined
                                        : {
                                            patchMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.patchSettings?.["patchMode"],
                                            assessmentMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.patchSettings?.[
                                                "assessmentMode"
                                              ],
                                            automaticByPlatformSettings: !p
                                              .virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings
                                              ? undefined
                                              : {
                                                  rebootSetting:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.linuxConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "rebootSetting"
                                                    ],
                                                  bypassPlatformSafetyChecksOnUserSchedule:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.linuxConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "bypassPlatformSafetyChecksOnUserSchedule"
                                                    ],
                                                },
                                          },
                                      enableVMAgentPlatformUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                                    },
                                secrets:
                                  p.virtualMachineProfileOverride?.osProfile?.["secrets"] ===
                                  undefined
                                    ? p.virtualMachineProfileOverride?.osProfile?.["secrets"]
                                    : p.virtualMachineProfileOverride?.osProfile?.["secrets"].map(
                                        (p: any) => {
                                          return {
                                            sourceVault: !p.sourceVault
                                              ? undefined
                                              : { id: p.sourceVault?.["id"] },
                                            vaultCertificates:
                                              p["vaultCertificates"] === undefined
                                                ? p["vaultCertificates"]
                                                : p["vaultCertificates"].map((p: any) => {
                                                    return {
                                                      certificateUrl: p["certificateUrl"],
                                                      certificateStore: p["certificateStore"],
                                                    };
                                                  }),
                                          };
                                        },
                                      ),
                                allowExtensionOperations:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "allowExtensionOperations"
                                  ],
                                requireGuestProvisionSignal:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "requireGuestProvisionSignal"
                                  ],
                              },
                          storageProfile: !p.virtualMachineProfileOverride?.storageProfile
                            ? undefined
                            : {
                                imageReference: !p.virtualMachineProfileOverride?.storageProfile
                                  ?.imageReference
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.storageProfile
                                        ?.imageReference?.["id"],
                                      publisher:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["publisher"],
                                      offer:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["offer"],
                                      sku: p.virtualMachineProfileOverride?.storageProfile
                                        ?.imageReference?.["sku"],
                                      version:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["version"],
                                      exactVersion:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["exactVersion"],
                                      sharedGalleryImageId:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["sharedGalleryImageId"],
                                      communityGalleryImageId:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["communityGalleryImageId"],
                                    },
                                osDisk: !p.virtualMachineProfileOverride?.storageProfile?.osDisk
                                  ? undefined
                                  : {
                                      name: p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.["name"],
                                      caching:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "caching"
                                        ],
                                      writeAcceleratorEnabled:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "writeAcceleratorEnabled"
                                        ],
                                      createOption:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "createOption"
                                        ],
                                      diffDiskSettings: !p.virtualMachineProfileOverride
                                        ?.storageProfile?.osDisk?.diffDiskSettings
                                        ? undefined
                                        : {
                                            option:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.diffDiskSettings?.["option"],
                                            placement:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.diffDiskSettings?.["placement"],
                                          },
                                      diskSizeGB:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "diskSizeGB"
                                        ],
                                      osType:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "osType"
                                        ],
                                      image: !p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.image
                                        ? undefined
                                        : {
                                            uri: p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.image?.["uri"],
                                          },
                                      vhdContainers:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "vhdContainers"
                                        ],
                                      managedDisk: !p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.managedDisk
                                        ? undefined
                                        : {
                                            storageAccountType:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.managedDisk?.["storageAccountType"],
                                            diskEncryptionSet: !p.virtualMachineProfileOverride
                                              ?.storageProfile?.osDisk?.managedDisk
                                              ?.diskEncryptionSet
                                              ? undefined
                                              : {
                                                  id: p.virtualMachineProfileOverride
                                                    ?.storageProfile?.osDisk?.managedDisk
                                                    ?.diskEncryptionSet?.["id"],
                                                },
                                            securityProfile: !p.virtualMachineProfileOverride
                                              ?.storageProfile?.osDisk?.managedDisk?.securityProfile
                                              ? undefined
                                              : {
                                                  securityEncryptionType:
                                                    p.virtualMachineProfileOverride?.storageProfile
                                                      ?.osDisk?.managedDisk?.securityProfile?.[
                                                      "securityEncryptionType"
                                                    ],
                                                  diskEncryptionSet: !p
                                                    .virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.managedDisk?.securityProfile
                                                    ?.diskEncryptionSet
                                                    ? undefined
                                                    : {
                                                        id: p.virtualMachineProfileOverride
                                                          ?.storageProfile?.osDisk?.managedDisk
                                                          ?.securityProfile?.diskEncryptionSet?.[
                                                          "id"
                                                        ],
                                                      },
                                                },
                                          },
                                      deleteOption:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "deleteOption"
                                        ],
                                    },
                                dataDisks:
                                  p.virtualMachineProfileOverride?.storageProfile?.["dataDisks"] ===
                                  undefined
                                    ? p.virtualMachineProfileOverride?.storageProfile?.["dataDisks"]
                                    : p.virtualMachineProfileOverride?.storageProfile?.[
                                        "dataDisks"
                                      ].map((p: any) => {
                                        return {
                                          name: p["name"],
                                          lun: p["lun"],
                                          caching: p["caching"],
                                          writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                                          createOption: p["createOption"],
                                          diskSizeGB: p["diskSizeGB"],
                                          managedDisk: !p.managedDisk
                                            ? undefined
                                            : {
                                                storageAccountType:
                                                  p.managedDisk?.["storageAccountType"],
                                                diskEncryptionSet: !p.managedDisk?.diskEncryptionSet
                                                  ? undefined
                                                  : {
                                                      id: p.managedDisk?.diskEncryptionSet?.["id"],
                                                    },
                                                securityProfile: !p.managedDisk?.securityProfile
                                                  ? undefined
                                                  : {
                                                      securityEncryptionType:
                                                        p.managedDisk?.securityProfile?.[
                                                          "securityEncryptionType"
                                                        ],
                                                      diskEncryptionSet: !p.managedDisk
                                                        ?.securityProfile?.diskEncryptionSet
                                                        ? undefined
                                                        : {
                                                            id: p.managedDisk?.securityProfile
                                                              ?.diskEncryptionSet?.["id"],
                                                          },
                                                    },
                                              },
                                          diskIOPSReadWrite: p["diskIOPSReadWrite"],
                                          diskMBpsReadWrite: p["diskMBpsReadWrite"],
                                          deleteOption: p["deleteOption"],
                                        };
                                      }),
                                diskControllerType:
                                  p.virtualMachineProfileOverride?.storageProfile?.[
                                    "diskControllerType"
                                  ],
                              },
                          networkProfile: !p.virtualMachineProfileOverride?.networkProfile
                            ? undefined
                            : {
                                healthProbe: !p.virtualMachineProfileOverride?.networkProfile
                                  ?.healthProbe
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.networkProfile
                                        ?.healthProbe?.["id"],
                                    },
                                networkInterfaceConfigurations:
                                  p.virtualMachineProfileOverride?.networkProfile?.[
                                    "networkInterfaceConfigurations"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkInterfaceConfigurations"
                                      ]
                                    : p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkInterfaceConfigurations"
                                      ].map((p: any) => {
                                        return {
                                          name: p["name"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                primary: p.properties?.["primary"],
                                                enableAcceleratedNetworking:
                                                  p.properties?.["enableAcceleratedNetworking"],
                                                disableTcpStateTracking:
                                                  p.properties?.["disableTcpStateTracking"],
                                                enableFpga: p.properties?.["enableFpga"],
                                                networkSecurityGroup: !p.properties
                                                  ?.networkSecurityGroup
                                                  ? undefined
                                                  : {
                                                      id: p.properties?.networkSecurityGroup?.[
                                                        "id"
                                                      ],
                                                    },
                                                dnsSettings: !p.properties?.dnsSettings
                                                  ? undefined
                                                  : {
                                                      dnsServers:
                                                        p.properties?.dnsSettings?.["dnsServers"],
                                                    },
                                                ipConfigurations: p.properties?.[
                                                  "ipConfigurations"
                                                ].map((p: any) => {
                                                  return {
                                                    name: p["name"],
                                                    properties: !p.properties
                                                      ? undefined
                                                      : {
                                                          subnet: !p.properties?.subnet
                                                            ? undefined
                                                            : {
                                                                id: p.properties?.subnet?.["id"],
                                                              },
                                                          primary: p.properties?.["primary"],
                                                          publicIPAddressConfiguration: !p
                                                            .properties
                                                            ?.publicIPAddressConfiguration
                                                            ? undefined
                                                            : {
                                                                name: p.properties
                                                                  ?.publicIPAddressConfiguration?.[
                                                                  "name"
                                                                ],
                                                                properties: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.properties
                                                                  ? undefined
                                                                  : {
                                                                      idleTimeoutInMinutes:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "idleTimeoutInMinutes"
                                                                        ],
                                                                      dnsSettings: !p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties?.dnsSettings
                                                                        ? undefined
                                                                        : {
                                                                            domainNameLabel:
                                                                              p.properties
                                                                                ?.publicIPAddressConfiguration
                                                                                ?.properties
                                                                                ?.dnsSettings?.[
                                                                                "domainNameLabel"
                                                                              ],
                                                                            domainNameLabelScope:
                                                                              p.properties
                                                                                ?.publicIPAddressConfiguration
                                                                                ?.properties
                                                                                ?.dnsSettings?.[
                                                                                "domainNameLabelScope"
                                                                              ],
                                                                          },
                                                                      ipTags:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "ipTags"
                                                                        ] === undefined
                                                                          ? p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "ipTags"
                                                                            ]
                                                                          : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                              "ipTags"
                                                                            ].map((p: any) => {
                                                                              return {
                                                                                ipTagType:
                                                                                  p["ipTagType"],
                                                                                tag: p["tag"],
                                                                              };
                                                                            }),
                                                                      publicIPPrefix: !p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties?.publicIPPrefix
                                                                        ? undefined
                                                                        : {
                                                                            id: p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties
                                                                              ?.publicIPPrefix?.[
                                                                              "id"
                                                                            ],
                                                                          },
                                                                      publicIPAddressVersion:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "publicIPAddressVersion"
                                                                        ],
                                                                      deleteOption:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "deleteOption"
                                                                        ],
                                                                    },
                                                                sku: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.sku
                                                                  ? undefined
                                                                  : {
                                                                      name: p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.sku?.["name"],
                                                                      tier: p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.sku?.["tier"],
                                                                    },
                                                              },
                                                          privateIPAddressVersion:
                                                            p.properties?.[
                                                              "privateIPAddressVersion"
                                                            ],
                                                          applicationGatewayBackendAddressPools:
                                                            p.properties?.[
                                                              "applicationGatewayBackendAddressPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "applicationGatewayBackendAddressPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "applicationGatewayBackendAddressPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          applicationSecurityGroups:
                                                            p.properties?.[
                                                              "applicationSecurityGroups"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "applicationSecurityGroups"
                                                                ]
                                                              : p.properties?.[
                                                                  "applicationSecurityGroups"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          loadBalancerBackendAddressPools:
                                                            p.properties?.[
                                                              "loadBalancerBackendAddressPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "loadBalancerBackendAddressPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "loadBalancerBackendAddressPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          loadBalancerInboundNatPools:
                                                            p.properties?.[
                                                              "loadBalancerInboundNatPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "loadBalancerInboundNatPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "loadBalancerInboundNatPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                        },
                                                  };
                                                }),
                                                enableIPForwarding:
                                                  p.properties?.["enableIPForwarding"],
                                                deleteOption: p.properties?.["deleteOption"],
                                                auxiliaryMode: p.properties?.["auxiliaryMode"],
                                                auxiliarySku: p.properties?.["auxiliarySku"],
                                              },
                                        };
                                      }),
                                networkApiVersion:
                                  p.virtualMachineProfileOverride?.networkProfile?.[
                                    "networkApiVersion"
                                  ],
                              },
                          securityProfile: !p.virtualMachineProfileOverride?.securityProfile
                            ? undefined
                            : {
                                uefiSettings: !p.virtualMachineProfileOverride?.securityProfile
                                  ?.uefiSettings
                                  ? undefined
                                  : {
                                      secureBootEnabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.uefiSettings?.["secureBootEnabled"],
                                      vTpmEnabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.uefiSettings?.["vTpmEnabled"],
                                    },
                                encryptionAtHost:
                                  p.virtualMachineProfileOverride?.securityProfile?.[
                                    "encryptionAtHost"
                                  ],
                                securityType:
                                  p.virtualMachineProfileOverride?.securityProfile?.[
                                    "securityType"
                                  ],
                                encryptionIdentity: !p.virtualMachineProfileOverride
                                  ?.securityProfile?.encryptionIdentity
                                  ? undefined
                                  : {
                                      userAssignedIdentityResourceId:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.encryptionIdentity?.["userAssignedIdentityResourceId"],
                                    },
                                proxyAgentSettings: !p.virtualMachineProfileOverride
                                  ?.securityProfile?.proxyAgentSettings
                                  ? undefined
                                  : {
                                      enabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.proxyAgentSettings?.["enabled"],
                                      mode: p.virtualMachineProfileOverride?.securityProfile
                                        ?.proxyAgentSettings?.["mode"],
                                      keyIncarnationId:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.proxyAgentSettings?.["keyIncarnationId"],
                                    },
                              },
                          diagnosticsProfile: !p.virtualMachineProfileOverride?.diagnosticsProfile
                            ? undefined
                            : {
                                bootDiagnostics: !p.virtualMachineProfileOverride
                                  ?.diagnosticsProfile?.bootDiagnostics
                                  ? undefined
                                  : {
                                      enabled:
                                        p.virtualMachineProfileOverride?.diagnosticsProfile
                                          ?.bootDiagnostics?.["enabled"],
                                      storageUri:
                                        p.virtualMachineProfileOverride?.diagnosticsProfile
                                          ?.bootDiagnostics?.["storageUri"],
                                    },
                              },
                          extensionProfile: !p.virtualMachineProfileOverride?.extensionProfile
                            ? undefined
                            : {
                                extensions:
                                  p.virtualMachineProfileOverride?.extensionProfile?.[
                                    "extensions"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensions"
                                      ]
                                    : p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensions"
                                      ].map((p: any) => {
                                        return {
                                          id: p["id"],
                                          name: p["name"],
                                          type: p["type"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                forceUpdateTag: p.properties?.["forceUpdateTag"],
                                                publisher: p.properties?.["publisher"],
                                                type: p.properties?.["type"],
                                                typeHandlerVersion:
                                                  p.properties?.["typeHandlerVersion"],
                                                autoUpgradeMinorVersion:
                                                  p.properties?.["autoUpgradeMinorVersion"],
                                                enableAutomaticUpgrade:
                                                  p.properties?.["enableAutomaticUpgrade"],
                                                settings: p.properties?.["settings"],
                                                protectedSettings:
                                                  p.properties?.["protectedSettings"],
                                                provisioningState:
                                                  p.properties?.["provisioningState"],
                                                provisionAfterExtensions:
                                                  p.properties?.["provisionAfterExtensions"],
                                                suppressFailures:
                                                  p.properties?.["suppressFailures"],
                                                protectedSettingsFromKeyVault: !p.properties
                                                  ?.protectedSettingsFromKeyVault
                                                  ? undefined
                                                  : {
                                                      secretUrl:
                                                        p.properties
                                                          ?.protectedSettingsFromKeyVault?.[
                                                          "secretUrl"
                                                        ],
                                                      sourceVault: {
                                                        id: p.properties
                                                          ?.protectedSettingsFromKeyVault
                                                          ?.sourceVault["id"],
                                                      },
                                                    },
                                              },
                                        };
                                      }),
                                extensionsTimeBudget:
                                  p.virtualMachineProfileOverride?.extensionProfile?.[
                                    "extensionsTimeBudget"
                                  ],
                              },
                          licenseType: p.virtualMachineProfileOverride?.["licenseType"],
                          scheduledEventsProfile: !p.virtualMachineProfileOverride
                            ?.scheduledEventsProfile
                            ? undefined
                            : {
                                terminateNotificationProfile: !p.virtualMachineProfileOverride
                                  ?.scheduledEventsProfile?.terminateNotificationProfile
                                  ? undefined
                                  : {
                                      notBeforeTimeout:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.terminateNotificationProfile?.["notBeforeTimeout"],
                                      enable:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.terminateNotificationProfile?.["enable"],
                                    },
                                osImageNotificationProfile: !p.virtualMachineProfileOverride
                                  ?.scheduledEventsProfile?.osImageNotificationProfile
                                  ? undefined
                                  : {
                                      notBeforeTimeout:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.osImageNotificationProfile?.["notBeforeTimeout"],
                                      enable:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.osImageNotificationProfile?.["enable"],
                                    },
                              },
                          userData: p.virtualMachineProfileOverride?.["userData"],
                          capacityReservation: !p.virtualMachineProfileOverride?.capacityReservation
                            ? undefined
                            : {
                                capacityReservationGroup: !p.virtualMachineProfileOverride
                                  ?.capacityReservation?.capacityReservationGroup
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.capacityReservation
                                        ?.capacityReservationGroup?.["id"],
                                    },
                              },
                          applicationProfile: !p.virtualMachineProfileOverride?.applicationProfile
                            ? undefined
                            : {
                                galleryApplications:
                                  p.virtualMachineProfileOverride?.applicationProfile?.[
                                    "galleryApplications"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.applicationProfile?.[
                                        "galleryApplications"
                                      ]
                                    : p.virtualMachineProfileOverride?.applicationProfile?.[
                                        "galleryApplications"
                                      ].map((p: any) => {
                                        return {
                                          tags: p["tags"],
                                          order: p["order"],
                                          packageReferenceId: p["packageReferenceId"],
                                          configurationReference: p["configurationReference"],
                                          treatFailureAsDeploymentFailure:
                                            p["treatFailureAsDeploymentFailure"],
                                          enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                                        };
                                      }),
                              },
                          hardwareProfile: !p.virtualMachineProfileOverride?.hardwareProfile
                            ? undefined
                            : {
                                vmSizeProperties: !p.virtualMachineProfileOverride?.hardwareProfile
                                  ?.vmSizeProperties
                                  ? undefined
                                  : {
                                      vCPUsAvailable:
                                        p.virtualMachineProfileOverride?.hardwareProfile
                                          ?.vmSizeProperties?.["vCPUsAvailable"],
                                      vCPUsPerCore:
                                        p.virtualMachineProfileOverride?.hardwareProfile
                                          ?.vmSizeProperties?.["vCPUsPerCore"],
                                    },
                              },
                          serviceArtifactReference: !p.virtualMachineProfileOverride
                            ?.serviceArtifactReference
                            ? undefined
                            : {
                                id: p.virtualMachineProfileOverride?.serviceArtifactReference?.[
                                  "id"
                                ],
                              },
                          securityPostureReference: !p.virtualMachineProfileOverride
                            ?.securityPostureReference
                            ? undefined
                            : {
                                id: p.virtualMachineProfileOverride?.securityPostureReference?.[
                                  "id"
                                ],
                                excludeExtensions:
                                  p.virtualMachineProfileOverride?.securityPostureReference?.[
                                    "excludeExtensions"
                                  ],
                                isOverridable:
                                  p.virtualMachineProfileOverride?.securityPostureReference?.[
                                    "isOverridable"
                                  ],
                              },
                          timeCreated:
                            p.virtualMachineProfileOverride?.["timeCreated"] !== undefined
                              ? new Date(p.virtualMachineProfileOverride?.["timeCreated"])
                              : undefined,
                        },
                  };
                }),
              },
          computeProfile: {
            baseVirtualMachineProfile: {
              osProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                ? undefined
                : {
                    computerNamePrefix:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "computerNamePrefix"
                      ],
                    adminUsername:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminUsername"
                      ],
                    adminPassword:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminPassword"
                      ],
                    customData:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "customData"
                      ],
                    windowsConfiguration: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                      ? undefined
                      : {
                          provisionVMAgent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["provisionVMAgent"],
                          enableAutomaticUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["enableAutomaticUpdates"],
                          timeZone:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["timeZone"],
                          additionalUnattendContent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["additionalUnattendContent"] ===
                            undefined
                              ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                                  .osProfile?.windowsConfiguration?.["additionalUnattendContent"]
                              : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.[
                                  "additionalUnattendContent"
                                ].map((p: any) => {
                                  return {
                                    passName: p["passName"],
                                    componentName: p["componentName"],
                                    settingName: p["settingName"],
                                    content: p["content"],
                                  };
                                }),
                          patchSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                            ?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.["patchMode"],
                                enableHotpatching:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "enableHotpatching"
                                  ],
                                assessmentMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          winRM: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.windowsConfiguration?.winRM
                            ? undefined
                            : {
                                listeners:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.winRM?.["listeners"] ===
                                  undefined
                                    ? result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                        ?.winRM?.["listeners"]
                                    : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.winRM?.[
                                        "listeners"
                                      ].map((p: any) => {
                                        return {
                                          protocol: p["protocol"],
                                          certificateUrl: p["certificateUrl"],
                                        };
                                      }),
                              },
                          enableVMAgentPlatformUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    linuxConfiguration: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                      ? undefined
                      : {
                          disablePasswordAuthentication:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["disablePasswordAuthentication"],
                          ssh: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.linuxConfiguration?.ssh
                            ? undefined
                            : {
                                publicKeys:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                  undefined
                                    ? result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                        ?.ssh?.["publicKeys"]
                                    : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.linuxConfiguration?.ssh?.[
                                        "publicKeys"
                                      ].map((p: any) => {
                                        return {
                                          path: p["path"],
                                          keyData: p["keyData"],
                                        };
                                      }),
                              },
                          provisionVMAgent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["provisionVMAgent"],
                          patchSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.linuxConfiguration?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.["patchMode"],
                                assessmentMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          enableVMAgentPlatformUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    secrets:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "secrets"
                      ] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.["secrets"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ].map((p: any) => {
                            return {
                              sourceVault: !p.sourceVault
                                ? undefined
                                : { id: p.sourceVault?.["id"] },
                              vaultCertificates:
                                p["vaultCertificates"] === undefined
                                  ? p["vaultCertificates"]
                                  : p["vaultCertificates"].map((p: any) => {
                                      return {
                                        certificateUrl: p["certificateUrl"],
                                        certificateStore: p["certificateStore"],
                                      };
                                    }),
                            };
                          }),
                    allowExtensionOperations:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "allowExtensionOperations"
                      ],
                    requireGuestProvisionSignal:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "requireGuestProvisionSignal"
                      ],
                  },
              storageProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .storageProfile
                ? undefined
                : {
                    imageReference: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.storageProfile?.imageReference
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["id"],
                          publisher:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["publisher"],
                          offer:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["offer"],
                          sku: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["sku"],
                          version:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["version"],
                          exactVersion:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["exactVersion"],
                          sharedGalleryImageId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["sharedGalleryImageId"],
                          communityGalleryImageId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["communityGalleryImageId"],
                        },
                    osDisk: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .storageProfile?.osDisk
                      ? undefined
                      : {
                          name: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.["name"],
                          caching:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["caching"],
                          writeAcceleratorEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["writeAcceleratorEnabled"],
                          createOption:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["createOption"],
                          diffDiskSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.diffDiskSettings
                            ? undefined
                            : {
                                option:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["option"],
                                placement:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["placement"],
                              },
                          diskSizeGB:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["diskSizeGB"],
                          osType:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["osType"],
                          image: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.image
                            ? undefined
                            : {
                                uri: result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.image?.["uri"],
                              },
                          vhdContainers:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["vhdContainers"],
                          managedDisk: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                            ? undefined
                            : {
                                storageAccountType:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.managedDisk?.["storageAccountType"],
                                diskEncryptionSet: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.diskEncryptionSet
                                  ? undefined
                                  : {
                                      id: result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.diskEncryptionSet?.["id"],
                                    },
                                securityProfile: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.securityProfile
                                  ? undefined
                                  : {
                                      securityEncryptionType:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.storageProfile?.osDisk
                                          ?.managedDisk?.securityProfile?.[
                                          "securityEncryptionType"
                                        ],
                                      diskEncryptionSet: !result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.securityProfile?.diskEncryptionSet
                                        ? undefined
                                        : {
                                            id: result.body.properties?.computeProfile
                                              .baseVirtualMachineProfile.storageProfile?.osDisk
                                              ?.managedDisk?.securityProfile?.diskEncryptionSet?.[
                                              "id"
                                            ],
                                          },
                                    },
                              },
                          deleteOption:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["deleteOption"],
                        },
                    dataDisks:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["dataDisks"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.["dataDisks"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "dataDisks"
                          ].map((p: any) => {
                            return {
                              name: p["name"],
                              lun: p["lun"],
                              caching: p["caching"],
                              writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                              createOption: p["createOption"],
                              diskSizeGB: p["diskSizeGB"],
                              managedDisk: !p.managedDisk
                                ? undefined
                                : {
                                    storageAccountType: p.managedDisk?.["storageAccountType"],
                                    diskEncryptionSet: !p.managedDisk?.diskEncryptionSet
                                      ? undefined
                                      : {
                                          id: p.managedDisk?.diskEncryptionSet?.["id"],
                                        },
                                    securityProfile: !p.managedDisk?.securityProfile
                                      ? undefined
                                      : {
                                          securityEncryptionType:
                                            p.managedDisk?.securityProfile?.[
                                              "securityEncryptionType"
                                            ],
                                          diskEncryptionSet: !p.managedDisk?.securityProfile
                                            ?.diskEncryptionSet
                                            ? undefined
                                            : {
                                                id: p.managedDisk?.securityProfile
                                                  ?.diskEncryptionSet?.["id"],
                                              },
                                        },
                                  },
                              diskIOPSReadWrite: p["diskIOPSReadWrite"],
                              diskMBpsReadWrite: p["diskMBpsReadWrite"],
                              deleteOption: p["deleteOption"],
                            };
                          }),
                    diskControllerType:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["diskControllerType"],
                  },
              networkProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .networkProfile
                ? undefined
                : {
                    healthProbe: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .networkProfile?.healthProbe
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.healthProbe?.["id"],
                        },
                    networkInterfaceConfigurations:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkInterfaceConfigurations"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.["networkInterfaceConfigurations"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkInterfaceConfigurations"
                          ].map((p: any) => {
                            return {
                              name: p["name"],
                              properties: !p.properties
                                ? undefined
                                : {
                                    primary: p.properties?.["primary"],
                                    enableAcceleratedNetworking:
                                      p.properties?.["enableAcceleratedNetworking"],
                                    disableTcpStateTracking:
                                      p.properties?.["disableTcpStateTracking"],
                                    enableFpga: p.properties?.["enableFpga"],
                                    networkSecurityGroup: !p.properties?.networkSecurityGroup
                                      ? undefined
                                      : {
                                          id: p.properties?.networkSecurityGroup?.["id"],
                                        },
                                    dnsSettings: !p.properties?.dnsSettings
                                      ? undefined
                                      : {
                                          dnsServers: p.properties?.dnsSettings?.["dnsServers"],
                                        },
                                    ipConfigurations: p.properties?.["ipConfigurations"].map(
                                      (p: any) => {
                                        return {
                                          name: p["name"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                subnet: !p.properties?.subnet
                                                  ? undefined
                                                  : {
                                                      id: p.properties?.subnet?.["id"],
                                                    },
                                                primary: p.properties?.["primary"],
                                                publicIPAddressConfiguration: !p.properties
                                                  ?.publicIPAddressConfiguration
                                                  ? undefined
                                                  : {
                                                      name: p.properties
                                                        ?.publicIPAddressConfiguration?.["name"],
                                                      properties: !p.properties
                                                        ?.publicIPAddressConfiguration?.properties
                                                        ? undefined
                                                        : {
                                                            idleTimeoutInMinutes:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.[
                                                                "idleTimeoutInMinutes"
                                                              ],
                                                            dnsSettings: !p.properties
                                                              ?.publicIPAddressConfiguration
                                                              ?.properties?.dnsSettings
                                                              ? undefined
                                                              : {
                                                                  domainNameLabel:
                                                                    p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.properties?.dnsSettings?.[
                                                                      "domainNameLabel"
                                                                    ],
                                                                  domainNameLabelScope:
                                                                    p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.properties?.dnsSettings?.[
                                                                      "domainNameLabelScope"
                                                                    ],
                                                                },
                                                            ipTags:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.["ipTags"] ===
                                                              undefined
                                                                ? p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.["ipTags"]
                                                                : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                    "ipTags"
                                                                  ].map((p: any) => {
                                                                    return {
                                                                      ipTagType: p["ipTagType"],
                                                                      tag: p["tag"],
                                                                    };
                                                                  }),
                                                            publicIPPrefix: !p.properties
                                                              ?.publicIPAddressConfiguration
                                                              ?.properties?.publicIPPrefix
                                                              ? undefined
                                                              : {
                                                                  id: p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.publicIPPrefix?.[
                                                                    "id"
                                                                  ],
                                                                },
                                                            publicIPAddressVersion:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.[
                                                                "publicIPAddressVersion"
                                                              ],
                                                            deleteOption:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.["deleteOption"],
                                                          },
                                                      sku: !p.properties
                                                        ?.publicIPAddressConfiguration?.sku
                                                        ? undefined
                                                        : {
                                                            name: p.properties
                                                              ?.publicIPAddressConfiguration?.sku?.[
                                                              "name"
                                                            ],
                                                            tier: p.properties
                                                              ?.publicIPAddressConfiguration?.sku?.[
                                                              "tier"
                                                            ],
                                                          },
                                                    },
                                                privateIPAddressVersion:
                                                  p.properties?.["privateIPAddressVersion"],
                                                applicationGatewayBackendAddressPools:
                                                  p.properties?.[
                                                    "applicationGatewayBackendAddressPools"
                                                  ] === undefined
                                                    ? p.properties?.[
                                                        "applicationGatewayBackendAddressPools"
                                                      ]
                                                    : p.properties?.[
                                                        "applicationGatewayBackendAddressPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                applicationSecurityGroups:
                                                  p.properties?.["applicationSecurityGroups"] ===
                                                  undefined
                                                    ? p.properties?.["applicationSecurityGroups"]
                                                    : p.properties?.[
                                                        "applicationSecurityGroups"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerBackendAddressPools:
                                                  p.properties?.[
                                                    "loadBalancerBackendAddressPools"
                                                  ] === undefined
                                                    ? p.properties?.[
                                                        "loadBalancerBackendAddressPools"
                                                      ]
                                                    : p.properties?.[
                                                        "loadBalancerBackendAddressPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerInboundNatPools:
                                                  p.properties?.["loadBalancerInboundNatPools"] ===
                                                  undefined
                                                    ? p.properties?.["loadBalancerInboundNatPools"]
                                                    : p.properties?.[
                                                        "loadBalancerInboundNatPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                              },
                                        };
                                      },
                                    ),
                                    enableIPForwarding: p.properties?.["enableIPForwarding"],
                                    deleteOption: p.properties?.["deleteOption"],
                                    auxiliaryMode: p.properties?.["auxiliaryMode"],
                                    auxiliarySku: p.properties?.["auxiliarySku"],
                                  },
                            };
                          }),
                    networkApiVersion:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkApiVersion"],
                  },
              securityProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .securityProfile
                ? undefined
                : {
                    uefiSettings: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityProfile?.uefiSettings
                      ? undefined
                      : {
                          secureBootEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["secureBootEnabled"],
                          vTpmEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["vTpmEnabled"],
                        },
                    encryptionAtHost:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["encryptionAtHost"],
                    securityType:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["securityType"],
                    encryptionIdentity: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.encryptionIdentity
                      ? undefined
                      : {
                          userAssignedIdentityResourceId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.encryptionIdentity?.[
                              "userAssignedIdentityResourceId"
                            ],
                        },
                    proxyAgentSettings: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.proxyAgentSettings
                      ? undefined
                      : {
                          enabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["enabled"],
                          mode: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .securityProfile?.proxyAgentSettings?.["mode"],
                          keyIncarnationId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["keyIncarnationId"],
                        },
                  },
              diagnosticsProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .diagnosticsProfile
                ? undefined
                : {
                    bootDiagnostics: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.diagnosticsProfile?.bootDiagnostics
                      ? undefined
                      : {
                          enabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["enabled"],
                          storageUri:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["storageUri"],
                        },
                  },
              extensionProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .extensionProfile
                ? undefined
                : {
                    extensions:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensions"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .extensionProfile?.["extensions"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensions"
                          ].map((p: any) => {
                            return {
                              id: p["id"],
                              name: p["name"],
                              type: p["type"],
                              properties: !p.properties
                                ? undefined
                                : {
                                    forceUpdateTag: p.properties?.["forceUpdateTag"],
                                    publisher: p.properties?.["publisher"],
                                    type: p.properties?.["type"],
                                    typeHandlerVersion: p.properties?.["typeHandlerVersion"],
                                    autoUpgradeMinorVersion:
                                      p.properties?.["autoUpgradeMinorVersion"],
                                    enableAutomaticUpgrade:
                                      p.properties?.["enableAutomaticUpgrade"],
                                    settings: p.properties?.["settings"],
                                    protectedSettings: p.properties?.["protectedSettings"],
                                    provisioningState: p.properties?.["provisioningState"],
                                    provisionAfterExtensions:
                                      p.properties?.["provisionAfterExtensions"],
                                    suppressFailures: p.properties?.["suppressFailures"],
                                    protectedSettingsFromKeyVault: !p.properties
                                      ?.protectedSettingsFromKeyVault
                                      ? undefined
                                      : {
                                          secretUrl:
                                            p.properties?.protectedSettingsFromKeyVault?.[
                                              "secretUrl"
                                            ],
                                          sourceVault: {
                                            id: p.properties?.protectedSettingsFromKeyVault
                                              ?.sourceVault["id"],
                                          },
                                        },
                                  },
                            };
                          }),
                    extensionsTimeBudget:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensionsTimeBudget"],
                  },
              licenseType:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["licenseType"],
              scheduledEventsProfile: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.scheduledEventsProfile
                ? undefined
                : {
                    terminateNotificationProfile: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile
                      ?.terminateNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.["enable"],
                        },
                    osImageNotificationProfile: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile?.osImageNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.["enable"],
                        },
                  },
              userData:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["userData"],
              capacityReservation: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .capacityReservation
                ? undefined
                : {
                    capacityReservationGroup: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.capacityReservation?.capacityReservationGroup
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .capacityReservation?.capacityReservationGroup?.["id"],
                        },
                  },
              applicationProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .applicationProfile
                ? undefined
                : {
                    galleryApplications:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .applicationProfile?.["galleryApplications"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .applicationProfile?.["galleryApplications"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.applicationProfile?.[
                            "galleryApplications"
                          ].map((p: any) => {
                            return {
                              tags: p["tags"],
                              order: p["order"],
                              packageReferenceId: p["packageReferenceId"],
                              configurationReference: p["configurationReference"],
                              treatFailureAsDeploymentFailure: p["treatFailureAsDeploymentFailure"],
                              enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                            };
                          }),
                  },
              hardwareProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .hardwareProfile
                ? undefined
                : {
                    vmSizeProperties: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.hardwareProfile?.vmSizeProperties
                      ? undefined
                      : {
                          vCPUsAvailable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsAvailable"],
                          vCPUsPerCore:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsPerCore"],
                        },
                  },
              serviceArtifactReference: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.serviceArtifactReference
                ? undefined
                : {
                    id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .serviceArtifactReference?.["id"],
                  },
              securityPostureReference: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.securityPostureReference
                ? undefined
                : {
                    id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityPostureReference?.["id"],
                    excludeExtensions:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["excludeExtensions"],
                    isOverridable:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["isOverridable"],
                  },
              timeCreated:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"] !==
                undefined
                  ? new Date(
                      result.body.properties?.computeProfile.baseVirtualMachineProfile[
                        "timeCreated"
                      ],
                    )
                  : undefined,
            },
            computeApiVersion: result.body.properties?.computeProfile["computeApiVersion"],
            platformFaultDomainCount:
              result.body.properties?.computeProfile["platformFaultDomainCount"],
            additionalVirtualMachineCapabilities: !result.body.properties?.computeProfile
              .additionalVirtualMachineCapabilities
              ? undefined
              : {
                  ultraSSDEnabled:
                    result.body.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                      "ultraSSDEnabled"
                    ],
                  hibernationEnabled:
                    result.body.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                      "hibernationEnabled"
                    ],
                },
          },
          timeCreated:
            result.body.properties?.["timeCreated"] !== undefined
              ? new Date(result.body.properties?.["timeCreated"])
              : undefined,
          uniqueId: result.body.properties?.["uniqueId"],
        },
    zones: result.body["zones"],
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities: result.body.identity?.["userAssignedIdentities"],
        },
    plan: !result.body.plan
      ? undefined
      : {
          name: result.body.plan?.["name"],
          publisher: result.body.plan?.["publisher"],
          product: result.body.plan?.["product"],
          promotionCode: result.body.plan?.["promotionCode"],
          version: result.body.plan?.["version"],
        },
  };
}

/** Create a Fleet */
export function fleetsCreateOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(context, _fleetsCreateOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fleetsCreateOrUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        fleetName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _fleetsUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetUpdate,
  options: FleetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !properties.tags ? properties.tags : (serializeRecord(properties.tags as any) as any),
        identity: !properties.identity
          ? properties.identity
          : managedServiceIdentityUpdateSerializer(properties.identity),
        plan: !properties.plan ? properties.plan : resourcePlanUpdateSerializer(properties.plan),
        properties: !properties.properties
          ? properties.properties
          : fleetPropertiesSerializer(properties.properties),
      },
    });
}

export async function _fleetsUpdateDeserialize(result: PathUncheckedResponse): Promise<Fleet> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    tags: result.body["tags"],
    location: result.body["location"],
    id: result.body["id"],
    name: result.body["name"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          provisioningState: result.body.properties?.["provisioningState"],
          spotPriorityProfile: !result.body.properties?.spotPriorityProfile
            ? undefined
            : {
                capacity: result.body.properties?.spotPriorityProfile?.["capacity"],
                minCapacity: result.body.properties?.spotPriorityProfile?.["minCapacity"],
                maxPricePerVM: result.body.properties?.spotPriorityProfile?.["maxPricePerVM"],
                evictionPolicy: result.body.properties?.spotPriorityProfile?.["evictionPolicy"],
                allocationStrategy:
                  result.body.properties?.spotPriorityProfile?.["allocationStrategy"],
                maintain: result.body.properties?.spotPriorityProfile?.["maintain"],
              },
          regularPriorityProfile: !result.body.properties?.regularPriorityProfile
            ? undefined
            : {
                capacity: result.body.properties?.regularPriorityProfile?.["capacity"],
                minCapacity: result.body.properties?.regularPriorityProfile?.["minCapacity"],
                allocationStrategy:
                  result.body.properties?.regularPriorityProfile?.["allocationStrategy"],
              },
          vmSizesProfile: result.body.properties?.["vmSizesProfile"].map((p: any) => {
            return { name: p["name"], rank: p["rank"] };
          }),
          vmAttributes: !result.body.properties?.vmAttributes
            ? undefined
            : {
                vCpuCount: {
                  min: result.body.properties?.vmAttributes?.vCpuCount["min"],
                  max: result.body.properties?.vmAttributes?.vCpuCount["max"],
                },
                memoryInGiB: {
                  min: result.body.properties?.vmAttributes?.memoryInGiB["min"],
                  max: result.body.properties?.vmAttributes?.memoryInGiB["max"],
                },
                memoryInGiBPerVCpu: !result.body.properties?.vmAttributes?.memoryInGiBPerVCpu
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.memoryInGiBPerVCpu?.["min"],
                      max: result.body.properties?.vmAttributes?.memoryInGiBPerVCpu?.["max"],
                    },
                localStorageSupport: result.body.properties?.vmAttributes?.["localStorageSupport"],
                localStorageInGiB: !result.body.properties?.vmAttributes?.localStorageInGiB
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.localStorageInGiB?.["min"],
                      max: result.body.properties?.vmAttributes?.localStorageInGiB?.["max"],
                    },
                localStorageDiskTypes:
                  result.body.properties?.vmAttributes?.["localStorageDiskTypes"],
                dataDiskCount: !result.body.properties?.vmAttributes?.dataDiskCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.dataDiskCount?.["min"],
                      max: result.body.properties?.vmAttributes?.dataDiskCount?.["max"],
                    },
                networkInterfaceCount: !result.body.properties?.vmAttributes?.networkInterfaceCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.networkInterfaceCount?.["min"],
                      max: result.body.properties?.vmAttributes?.networkInterfaceCount?.["max"],
                    },
                networkBandwidthInMbps: !result.body.properties?.vmAttributes
                  ?.networkBandwidthInMbps
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.networkBandwidthInMbps?.["min"],
                      max: result.body.properties?.vmAttributes?.networkBandwidthInMbps?.["max"],
                    },
                rdmaSupport: result.body.properties?.vmAttributes?.["rdmaSupport"],
                rdmaNetworkInterfaceCount: !result.body.properties?.vmAttributes
                  ?.rdmaNetworkInterfaceCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["min"],
                      max: result.body.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["max"],
                    },
                acceleratorSupport: result.body.properties?.vmAttributes?.["acceleratorSupport"],
                acceleratorManufacturers:
                  result.body.properties?.vmAttributes?.["acceleratorManufacturers"],
                acceleratorTypes: result.body.properties?.vmAttributes?.["acceleratorTypes"],
                acceleratorCount: !result.body.properties?.vmAttributes?.acceleratorCount
                  ? undefined
                  : {
                      min: result.body.properties?.vmAttributes?.acceleratorCount?.["min"],
                      max: result.body.properties?.vmAttributes?.acceleratorCount?.["max"],
                    },
                vmCategories: result.body.properties?.vmAttributes?.["vmCategories"],
                architectureTypes: result.body.properties?.vmAttributes?.["architectureTypes"],
                cpuManufacturers: result.body.properties?.vmAttributes?.["cpuManufacturers"],
                burstableSupport: result.body.properties?.vmAttributes?.["burstableSupport"],
                excludedVMSizes: result.body.properties?.vmAttributes?.["excludedVMSizes"],
              },
          additionalLocationsProfile: !result.body.properties?.additionalLocationsProfile
            ? undefined
            : {
                locationProfiles: result.body.properties?.additionalLocationsProfile?.[
                  "locationProfiles"
                ].map((p: any) => {
                  return {
                    location: p["location"],
                    virtualMachineProfileOverride: !p.virtualMachineProfileOverride
                      ? undefined
                      : {
                          osProfile: !p.virtualMachineProfileOverride?.osProfile
                            ? undefined
                            : {
                                computerNamePrefix:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "computerNamePrefix"
                                  ],
                                adminUsername:
                                  p.virtualMachineProfileOverride?.osProfile?.["adminUsername"],
                                adminPassword:
                                  p.virtualMachineProfileOverride?.osProfile?.["adminPassword"],
                                customData:
                                  p.virtualMachineProfileOverride?.osProfile?.["customData"],
                                windowsConfiguration: !p.virtualMachineProfileOverride?.osProfile
                                  ?.windowsConfiguration
                                  ? undefined
                                  : {
                                      provisionVMAgent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["provisionVMAgent"],
                                      enableAutomaticUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["enableAutomaticUpdates"],
                                      timeZone:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["timeZone"],
                                      additionalUnattendContent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["additionalUnattendContent"] ===
                                        undefined
                                          ? p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["additionalUnattendContent"]
                                          : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.[
                                              "additionalUnattendContent"
                                            ].map((p: any) => {
                                              return {
                                                passName: p["passName"],
                                                componentName: p["componentName"],
                                                settingName: p["settingName"],
                                                content: p["content"],
                                              };
                                            }),
                                      patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                        ?.windowsConfiguration?.patchSettings
                                        ? undefined
                                        : {
                                            patchMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "patchMode"
                                              ],
                                            enableHotpatching:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "enableHotpatching"
                                              ],
                                            assessmentMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.patchSettings?.[
                                                "assessmentMode"
                                              ],
                                            automaticByPlatformSettings: !p
                                              .virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings
                                              ? undefined
                                              : {
                                                  rebootSetting:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.windowsConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "rebootSetting"
                                                    ],
                                                  bypassPlatformSafetyChecksOnUserSchedule:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.windowsConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "bypassPlatformSafetyChecksOnUserSchedule"
                                                    ],
                                                },
                                          },
                                      winRM: !p.virtualMachineProfileOverride?.osProfile
                                        ?.windowsConfiguration?.winRM
                                        ? undefined
                                        : {
                                            listeners:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.windowsConfiguration?.winRM?.["listeners"] ===
                                              undefined
                                                ? p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.winRM?.["listeners"]
                                                : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.winRM?.[
                                                    "listeners"
                                                  ].map((p: any) => {
                                                    return {
                                                      protocol: p["protocol"],
                                                      certificateUrl: p["certificateUrl"],
                                                    };
                                                  }),
                                          },
                                      enableVMAgentPlatformUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                                    },
                                linuxConfiguration: !p.virtualMachineProfileOverride?.osProfile
                                  ?.linuxConfiguration
                                  ? undefined
                                  : {
                                      disablePasswordAuthentication:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["disablePasswordAuthentication"],
                                      ssh: !p.virtualMachineProfileOverride?.osProfile
                                        ?.linuxConfiguration?.ssh
                                        ? undefined
                                        : {
                                            publicKeys:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                              undefined
                                                ? p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.ssh?.["publicKeys"]
                                                : p.virtualMachineProfileOverride?.osProfile?.linuxConfiguration?.ssh?.[
                                                    "publicKeys"
                                                  ].map((p: any) => {
                                                    return {
                                                      path: p["path"],
                                                      keyData: p["keyData"],
                                                    };
                                                  }),
                                          },
                                      provisionVMAgent:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["provisionVMAgent"],
                                      patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                        ?.linuxConfiguration?.patchSettings
                                        ? undefined
                                        : {
                                            patchMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.patchSettings?.["patchMode"],
                                            assessmentMode:
                                              p.virtualMachineProfileOverride?.osProfile
                                                ?.linuxConfiguration?.patchSettings?.[
                                                "assessmentMode"
                                              ],
                                            automaticByPlatformSettings: !p
                                              .virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings
                                              ? undefined
                                              : {
                                                  rebootSetting:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.linuxConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "rebootSetting"
                                                    ],
                                                  bypassPlatformSafetyChecksOnUserSchedule:
                                                    p.virtualMachineProfileOverride?.osProfile
                                                      ?.linuxConfiguration?.patchSettings
                                                      ?.automaticByPlatformSettings?.[
                                                      "bypassPlatformSafetyChecksOnUserSchedule"
                                                    ],
                                                },
                                          },
                                      enableVMAgentPlatformUpdates:
                                        p.virtualMachineProfileOverride?.osProfile
                                          ?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                                    },
                                secrets:
                                  p.virtualMachineProfileOverride?.osProfile?.["secrets"] ===
                                  undefined
                                    ? p.virtualMachineProfileOverride?.osProfile?.["secrets"]
                                    : p.virtualMachineProfileOverride?.osProfile?.["secrets"].map(
                                        (p: any) => {
                                          return {
                                            sourceVault: !p.sourceVault
                                              ? undefined
                                              : { id: p.sourceVault?.["id"] },
                                            vaultCertificates:
                                              p["vaultCertificates"] === undefined
                                                ? p["vaultCertificates"]
                                                : p["vaultCertificates"].map((p: any) => {
                                                    return {
                                                      certificateUrl: p["certificateUrl"],
                                                      certificateStore: p["certificateStore"],
                                                    };
                                                  }),
                                          };
                                        },
                                      ),
                                allowExtensionOperations:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "allowExtensionOperations"
                                  ],
                                requireGuestProvisionSignal:
                                  p.virtualMachineProfileOverride?.osProfile?.[
                                    "requireGuestProvisionSignal"
                                  ],
                              },
                          storageProfile: !p.virtualMachineProfileOverride?.storageProfile
                            ? undefined
                            : {
                                imageReference: !p.virtualMachineProfileOverride?.storageProfile
                                  ?.imageReference
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.storageProfile
                                        ?.imageReference?.["id"],
                                      publisher:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["publisher"],
                                      offer:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["offer"],
                                      sku: p.virtualMachineProfileOverride?.storageProfile
                                        ?.imageReference?.["sku"],
                                      version:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["version"],
                                      exactVersion:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["exactVersion"],
                                      sharedGalleryImageId:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["sharedGalleryImageId"],
                                      communityGalleryImageId:
                                        p.virtualMachineProfileOverride?.storageProfile
                                          ?.imageReference?.["communityGalleryImageId"],
                                    },
                                osDisk: !p.virtualMachineProfileOverride?.storageProfile?.osDisk
                                  ? undefined
                                  : {
                                      name: p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.["name"],
                                      caching:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "caching"
                                        ],
                                      writeAcceleratorEnabled:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "writeAcceleratorEnabled"
                                        ],
                                      createOption:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "createOption"
                                        ],
                                      diffDiskSettings: !p.virtualMachineProfileOverride
                                        ?.storageProfile?.osDisk?.diffDiskSettings
                                        ? undefined
                                        : {
                                            option:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.diffDiskSettings?.["option"],
                                            placement:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.diffDiskSettings?.["placement"],
                                          },
                                      diskSizeGB:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "diskSizeGB"
                                        ],
                                      osType:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "osType"
                                        ],
                                      image: !p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.image
                                        ? undefined
                                        : {
                                            uri: p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.image?.["uri"],
                                          },
                                      vhdContainers:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "vhdContainers"
                                        ],
                                      managedDisk: !p.virtualMachineProfileOverride?.storageProfile
                                        ?.osDisk?.managedDisk
                                        ? undefined
                                        : {
                                            storageAccountType:
                                              p.virtualMachineProfileOverride?.storageProfile
                                                ?.osDisk?.managedDisk?.["storageAccountType"],
                                            diskEncryptionSet: !p.virtualMachineProfileOverride
                                              ?.storageProfile?.osDisk?.managedDisk
                                              ?.diskEncryptionSet
                                              ? undefined
                                              : {
                                                  id: p.virtualMachineProfileOverride
                                                    ?.storageProfile?.osDisk?.managedDisk
                                                    ?.diskEncryptionSet?.["id"],
                                                },
                                            securityProfile: !p.virtualMachineProfileOverride
                                              ?.storageProfile?.osDisk?.managedDisk?.securityProfile
                                              ? undefined
                                              : {
                                                  securityEncryptionType:
                                                    p.virtualMachineProfileOverride?.storageProfile
                                                      ?.osDisk?.managedDisk?.securityProfile?.[
                                                      "securityEncryptionType"
                                                    ],
                                                  diskEncryptionSet: !p
                                                    .virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.managedDisk?.securityProfile
                                                    ?.diskEncryptionSet
                                                    ? undefined
                                                    : {
                                                        id: p.virtualMachineProfileOverride
                                                          ?.storageProfile?.osDisk?.managedDisk
                                                          ?.securityProfile?.diskEncryptionSet?.[
                                                          "id"
                                                        ],
                                                      },
                                                },
                                          },
                                      deleteOption:
                                        p.virtualMachineProfileOverride?.storageProfile?.osDisk?.[
                                          "deleteOption"
                                        ],
                                    },
                                dataDisks:
                                  p.virtualMachineProfileOverride?.storageProfile?.["dataDisks"] ===
                                  undefined
                                    ? p.virtualMachineProfileOverride?.storageProfile?.["dataDisks"]
                                    : p.virtualMachineProfileOverride?.storageProfile?.[
                                        "dataDisks"
                                      ].map((p: any) => {
                                        return {
                                          name: p["name"],
                                          lun: p["lun"],
                                          caching: p["caching"],
                                          writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                                          createOption: p["createOption"],
                                          diskSizeGB: p["diskSizeGB"],
                                          managedDisk: !p.managedDisk
                                            ? undefined
                                            : {
                                                storageAccountType:
                                                  p.managedDisk?.["storageAccountType"],
                                                diskEncryptionSet: !p.managedDisk?.diskEncryptionSet
                                                  ? undefined
                                                  : {
                                                      id: p.managedDisk?.diskEncryptionSet?.["id"],
                                                    },
                                                securityProfile: !p.managedDisk?.securityProfile
                                                  ? undefined
                                                  : {
                                                      securityEncryptionType:
                                                        p.managedDisk?.securityProfile?.[
                                                          "securityEncryptionType"
                                                        ],
                                                      diskEncryptionSet: !p.managedDisk
                                                        ?.securityProfile?.diskEncryptionSet
                                                        ? undefined
                                                        : {
                                                            id: p.managedDisk?.securityProfile
                                                              ?.diskEncryptionSet?.["id"],
                                                          },
                                                    },
                                              },
                                          diskIOPSReadWrite: p["diskIOPSReadWrite"],
                                          diskMBpsReadWrite: p["diskMBpsReadWrite"],
                                          deleteOption: p["deleteOption"],
                                        };
                                      }),
                                diskControllerType:
                                  p.virtualMachineProfileOverride?.storageProfile?.[
                                    "diskControllerType"
                                  ],
                              },
                          networkProfile: !p.virtualMachineProfileOverride?.networkProfile
                            ? undefined
                            : {
                                healthProbe: !p.virtualMachineProfileOverride?.networkProfile
                                  ?.healthProbe
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.networkProfile
                                        ?.healthProbe?.["id"],
                                    },
                                networkInterfaceConfigurations:
                                  p.virtualMachineProfileOverride?.networkProfile?.[
                                    "networkInterfaceConfigurations"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkInterfaceConfigurations"
                                      ]
                                    : p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkInterfaceConfigurations"
                                      ].map((p: any) => {
                                        return {
                                          name: p["name"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                primary: p.properties?.["primary"],
                                                enableAcceleratedNetworking:
                                                  p.properties?.["enableAcceleratedNetworking"],
                                                disableTcpStateTracking:
                                                  p.properties?.["disableTcpStateTracking"],
                                                enableFpga: p.properties?.["enableFpga"],
                                                networkSecurityGroup: !p.properties
                                                  ?.networkSecurityGroup
                                                  ? undefined
                                                  : {
                                                      id: p.properties?.networkSecurityGroup?.[
                                                        "id"
                                                      ],
                                                    },
                                                dnsSettings: !p.properties?.dnsSettings
                                                  ? undefined
                                                  : {
                                                      dnsServers:
                                                        p.properties?.dnsSettings?.["dnsServers"],
                                                    },
                                                ipConfigurations: p.properties?.[
                                                  "ipConfigurations"
                                                ].map((p: any) => {
                                                  return {
                                                    name: p["name"],
                                                    properties: !p.properties
                                                      ? undefined
                                                      : {
                                                          subnet: !p.properties?.subnet
                                                            ? undefined
                                                            : {
                                                                id: p.properties?.subnet?.["id"],
                                                              },
                                                          primary: p.properties?.["primary"],
                                                          publicIPAddressConfiguration: !p
                                                            .properties
                                                            ?.publicIPAddressConfiguration
                                                            ? undefined
                                                            : {
                                                                name: p.properties
                                                                  ?.publicIPAddressConfiguration?.[
                                                                  "name"
                                                                ],
                                                                properties: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.properties
                                                                  ? undefined
                                                                  : {
                                                                      idleTimeoutInMinutes:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "idleTimeoutInMinutes"
                                                                        ],
                                                                      dnsSettings: !p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties?.dnsSettings
                                                                        ? undefined
                                                                        : {
                                                                            domainNameLabel:
                                                                              p.properties
                                                                                ?.publicIPAddressConfiguration
                                                                                ?.properties
                                                                                ?.dnsSettings?.[
                                                                                "domainNameLabel"
                                                                              ],
                                                                            domainNameLabelScope:
                                                                              p.properties
                                                                                ?.publicIPAddressConfiguration
                                                                                ?.properties
                                                                                ?.dnsSettings?.[
                                                                                "domainNameLabelScope"
                                                                              ],
                                                                          },
                                                                      ipTags:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "ipTags"
                                                                        ] === undefined
                                                                          ? p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "ipTags"
                                                                            ]
                                                                          : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                              "ipTags"
                                                                            ].map((p: any) => {
                                                                              return {
                                                                                ipTagType:
                                                                                  p["ipTagType"],
                                                                                tag: p["tag"],
                                                                              };
                                                                            }),
                                                                      publicIPPrefix: !p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties?.publicIPPrefix
                                                                        ? undefined
                                                                        : {
                                                                            id: p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties
                                                                              ?.publicIPPrefix?.[
                                                                              "id"
                                                                            ],
                                                                          },
                                                                      publicIPAddressVersion:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "publicIPAddressVersion"
                                                                        ],
                                                                      deleteOption:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties?.[
                                                                          "deleteOption"
                                                                        ],
                                                                    },
                                                                sku: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.sku
                                                                  ? undefined
                                                                  : {
                                                                      name: p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.sku?.["name"],
                                                                      tier: p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.sku?.["tier"],
                                                                    },
                                                              },
                                                          privateIPAddressVersion:
                                                            p.properties?.[
                                                              "privateIPAddressVersion"
                                                            ],
                                                          applicationGatewayBackendAddressPools:
                                                            p.properties?.[
                                                              "applicationGatewayBackendAddressPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "applicationGatewayBackendAddressPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "applicationGatewayBackendAddressPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          applicationSecurityGroups:
                                                            p.properties?.[
                                                              "applicationSecurityGroups"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "applicationSecurityGroups"
                                                                ]
                                                              : p.properties?.[
                                                                  "applicationSecurityGroups"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          loadBalancerBackendAddressPools:
                                                            p.properties?.[
                                                              "loadBalancerBackendAddressPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "loadBalancerBackendAddressPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "loadBalancerBackendAddressPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                          loadBalancerInboundNatPools:
                                                            p.properties?.[
                                                              "loadBalancerInboundNatPools"
                                                            ] === undefined
                                                              ? p.properties?.[
                                                                  "loadBalancerInboundNatPools"
                                                                ]
                                                              : p.properties?.[
                                                                  "loadBalancerInboundNatPools"
                                                                ].map((p: any) => {
                                                                  return {
                                                                    id: p["id"],
                                                                  };
                                                                }),
                                                        },
                                                  };
                                                }),
                                                enableIPForwarding:
                                                  p.properties?.["enableIPForwarding"],
                                                deleteOption: p.properties?.["deleteOption"],
                                                auxiliaryMode: p.properties?.["auxiliaryMode"],
                                                auxiliarySku: p.properties?.["auxiliarySku"],
                                              },
                                        };
                                      }),
                                networkApiVersion:
                                  p.virtualMachineProfileOverride?.networkProfile?.[
                                    "networkApiVersion"
                                  ],
                              },
                          securityProfile: !p.virtualMachineProfileOverride?.securityProfile
                            ? undefined
                            : {
                                uefiSettings: !p.virtualMachineProfileOverride?.securityProfile
                                  ?.uefiSettings
                                  ? undefined
                                  : {
                                      secureBootEnabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.uefiSettings?.["secureBootEnabled"],
                                      vTpmEnabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.uefiSettings?.["vTpmEnabled"],
                                    },
                                encryptionAtHost:
                                  p.virtualMachineProfileOverride?.securityProfile?.[
                                    "encryptionAtHost"
                                  ],
                                securityType:
                                  p.virtualMachineProfileOverride?.securityProfile?.[
                                    "securityType"
                                  ],
                                encryptionIdentity: !p.virtualMachineProfileOverride
                                  ?.securityProfile?.encryptionIdentity
                                  ? undefined
                                  : {
                                      userAssignedIdentityResourceId:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.encryptionIdentity?.["userAssignedIdentityResourceId"],
                                    },
                                proxyAgentSettings: !p.virtualMachineProfileOverride
                                  ?.securityProfile?.proxyAgentSettings
                                  ? undefined
                                  : {
                                      enabled:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.proxyAgentSettings?.["enabled"],
                                      mode: p.virtualMachineProfileOverride?.securityProfile
                                        ?.proxyAgentSettings?.["mode"],
                                      keyIncarnationId:
                                        p.virtualMachineProfileOverride?.securityProfile
                                          ?.proxyAgentSettings?.["keyIncarnationId"],
                                    },
                              },
                          diagnosticsProfile: !p.virtualMachineProfileOverride?.diagnosticsProfile
                            ? undefined
                            : {
                                bootDiagnostics: !p.virtualMachineProfileOverride
                                  ?.diagnosticsProfile?.bootDiagnostics
                                  ? undefined
                                  : {
                                      enabled:
                                        p.virtualMachineProfileOverride?.diagnosticsProfile
                                          ?.bootDiagnostics?.["enabled"],
                                      storageUri:
                                        p.virtualMachineProfileOverride?.diagnosticsProfile
                                          ?.bootDiagnostics?.["storageUri"],
                                    },
                              },
                          extensionProfile: !p.virtualMachineProfileOverride?.extensionProfile
                            ? undefined
                            : {
                                extensions:
                                  p.virtualMachineProfileOverride?.extensionProfile?.[
                                    "extensions"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensions"
                                      ]
                                    : p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensions"
                                      ].map((p: any) => {
                                        return {
                                          id: p["id"],
                                          name: p["name"],
                                          type: p["type"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                forceUpdateTag: p.properties?.["forceUpdateTag"],
                                                publisher: p.properties?.["publisher"],
                                                type: p.properties?.["type"],
                                                typeHandlerVersion:
                                                  p.properties?.["typeHandlerVersion"],
                                                autoUpgradeMinorVersion:
                                                  p.properties?.["autoUpgradeMinorVersion"],
                                                enableAutomaticUpgrade:
                                                  p.properties?.["enableAutomaticUpgrade"],
                                                settings: p.properties?.["settings"],
                                                protectedSettings:
                                                  p.properties?.["protectedSettings"],
                                                provisioningState:
                                                  p.properties?.["provisioningState"],
                                                provisionAfterExtensions:
                                                  p.properties?.["provisionAfterExtensions"],
                                                suppressFailures:
                                                  p.properties?.["suppressFailures"],
                                                protectedSettingsFromKeyVault: !p.properties
                                                  ?.protectedSettingsFromKeyVault
                                                  ? undefined
                                                  : {
                                                      secretUrl:
                                                        p.properties
                                                          ?.protectedSettingsFromKeyVault?.[
                                                          "secretUrl"
                                                        ],
                                                      sourceVault: {
                                                        id: p.properties
                                                          ?.protectedSettingsFromKeyVault
                                                          ?.sourceVault["id"],
                                                      },
                                                    },
                                              },
                                        };
                                      }),
                                extensionsTimeBudget:
                                  p.virtualMachineProfileOverride?.extensionProfile?.[
                                    "extensionsTimeBudget"
                                  ],
                              },
                          licenseType: p.virtualMachineProfileOverride?.["licenseType"],
                          scheduledEventsProfile: !p.virtualMachineProfileOverride
                            ?.scheduledEventsProfile
                            ? undefined
                            : {
                                terminateNotificationProfile: !p.virtualMachineProfileOverride
                                  ?.scheduledEventsProfile?.terminateNotificationProfile
                                  ? undefined
                                  : {
                                      notBeforeTimeout:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.terminateNotificationProfile?.["notBeforeTimeout"],
                                      enable:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.terminateNotificationProfile?.["enable"],
                                    },
                                osImageNotificationProfile: !p.virtualMachineProfileOverride
                                  ?.scheduledEventsProfile?.osImageNotificationProfile
                                  ? undefined
                                  : {
                                      notBeforeTimeout:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.osImageNotificationProfile?.["notBeforeTimeout"],
                                      enable:
                                        p.virtualMachineProfileOverride?.scheduledEventsProfile
                                          ?.osImageNotificationProfile?.["enable"],
                                    },
                              },
                          userData: p.virtualMachineProfileOverride?.["userData"],
                          capacityReservation: !p.virtualMachineProfileOverride?.capacityReservation
                            ? undefined
                            : {
                                capacityReservationGroup: !p.virtualMachineProfileOverride
                                  ?.capacityReservation?.capacityReservationGroup
                                  ? undefined
                                  : {
                                      id: p.virtualMachineProfileOverride?.capacityReservation
                                        ?.capacityReservationGroup?.["id"],
                                    },
                              },
                          applicationProfile: !p.virtualMachineProfileOverride?.applicationProfile
                            ? undefined
                            : {
                                galleryApplications:
                                  p.virtualMachineProfileOverride?.applicationProfile?.[
                                    "galleryApplications"
                                  ] === undefined
                                    ? p.virtualMachineProfileOverride?.applicationProfile?.[
                                        "galleryApplications"
                                      ]
                                    : p.virtualMachineProfileOverride?.applicationProfile?.[
                                        "galleryApplications"
                                      ].map((p: any) => {
                                        return {
                                          tags: p["tags"],
                                          order: p["order"],
                                          packageReferenceId: p["packageReferenceId"],
                                          configurationReference: p["configurationReference"],
                                          treatFailureAsDeploymentFailure:
                                            p["treatFailureAsDeploymentFailure"],
                                          enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                                        };
                                      }),
                              },
                          hardwareProfile: !p.virtualMachineProfileOverride?.hardwareProfile
                            ? undefined
                            : {
                                vmSizeProperties: !p.virtualMachineProfileOverride?.hardwareProfile
                                  ?.vmSizeProperties
                                  ? undefined
                                  : {
                                      vCPUsAvailable:
                                        p.virtualMachineProfileOverride?.hardwareProfile
                                          ?.vmSizeProperties?.["vCPUsAvailable"],
                                      vCPUsPerCore:
                                        p.virtualMachineProfileOverride?.hardwareProfile
                                          ?.vmSizeProperties?.["vCPUsPerCore"],
                                    },
                              },
                          serviceArtifactReference: !p.virtualMachineProfileOverride
                            ?.serviceArtifactReference
                            ? undefined
                            : {
                                id: p.virtualMachineProfileOverride?.serviceArtifactReference?.[
                                  "id"
                                ],
                              },
                          securityPostureReference: !p.virtualMachineProfileOverride
                            ?.securityPostureReference
                            ? undefined
                            : {
                                id: p.virtualMachineProfileOverride?.securityPostureReference?.[
                                  "id"
                                ],
                                excludeExtensions:
                                  p.virtualMachineProfileOverride?.securityPostureReference?.[
                                    "excludeExtensions"
                                  ],
                                isOverridable:
                                  p.virtualMachineProfileOverride?.securityPostureReference?.[
                                    "isOverridable"
                                  ],
                              },
                          timeCreated:
                            p.virtualMachineProfileOverride?.["timeCreated"] !== undefined
                              ? new Date(p.virtualMachineProfileOverride?.["timeCreated"])
                              : undefined,
                        },
                  };
                }),
              },
          computeProfile: {
            baseVirtualMachineProfile: {
              osProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                ? undefined
                : {
                    computerNamePrefix:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "computerNamePrefix"
                      ],
                    adminUsername:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminUsername"
                      ],
                    adminPassword:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminPassword"
                      ],
                    customData:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "customData"
                      ],
                    windowsConfiguration: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                      ? undefined
                      : {
                          provisionVMAgent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["provisionVMAgent"],
                          enableAutomaticUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["enableAutomaticUpdates"],
                          timeZone:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["timeZone"],
                          additionalUnattendContent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["additionalUnattendContent"] ===
                            undefined
                              ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                                  .osProfile?.windowsConfiguration?.["additionalUnattendContent"]
                              : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.[
                                  "additionalUnattendContent"
                                ].map((p: any) => {
                                  return {
                                    passName: p["passName"],
                                    componentName: p["componentName"],
                                    settingName: p["settingName"],
                                    content: p["content"],
                                  };
                                }),
                          patchSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                            ?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.["patchMode"],
                                enableHotpatching:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "enableHotpatching"
                                  ],
                                assessmentMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          winRM: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.windowsConfiguration?.winRM
                            ? undefined
                            : {
                                listeners:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.winRM?.["listeners"] ===
                                  undefined
                                    ? result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                        ?.winRM?.["listeners"]
                                    : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.winRM?.[
                                        "listeners"
                                      ].map((p: any) => {
                                        return {
                                          protocol: p["protocol"],
                                          certificateUrl: p["certificateUrl"],
                                        };
                                      }),
                              },
                          enableVMAgentPlatformUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    linuxConfiguration: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                      ? undefined
                      : {
                          disablePasswordAuthentication:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["disablePasswordAuthentication"],
                          ssh: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.linuxConfiguration?.ssh
                            ? undefined
                            : {
                                publicKeys:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                  undefined
                                    ? result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                        ?.ssh?.["publicKeys"]
                                    : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.linuxConfiguration?.ssh?.[
                                        "publicKeys"
                                      ].map((p: any) => {
                                        return {
                                          path: p["path"],
                                          keyData: p["keyData"],
                                        };
                                      }),
                              },
                          provisionVMAgent:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["provisionVMAgent"],
                          patchSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.linuxConfiguration?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.["patchMode"],
                                assessmentMode:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          enableVMAgentPlatformUpdates:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .osProfile?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    secrets:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "secrets"
                      ] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.["secrets"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ].map((p: any) => {
                            return {
                              sourceVault: !p.sourceVault
                                ? undefined
                                : { id: p.sourceVault?.["id"] },
                              vaultCertificates:
                                p["vaultCertificates"] === undefined
                                  ? p["vaultCertificates"]
                                  : p["vaultCertificates"].map((p: any) => {
                                      return {
                                        certificateUrl: p["certificateUrl"],
                                        certificateStore: p["certificateStore"],
                                      };
                                    }),
                            };
                          }),
                    allowExtensionOperations:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "allowExtensionOperations"
                      ],
                    requireGuestProvisionSignal:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "requireGuestProvisionSignal"
                      ],
                  },
              storageProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .storageProfile
                ? undefined
                : {
                    imageReference: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.storageProfile?.imageReference
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["id"],
                          publisher:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["publisher"],
                          offer:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["offer"],
                          sku: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["sku"],
                          version:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["version"],
                          exactVersion:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["exactVersion"],
                          sharedGalleryImageId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["sharedGalleryImageId"],
                          communityGalleryImageId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["communityGalleryImageId"],
                        },
                    osDisk: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .storageProfile?.osDisk
                      ? undefined
                      : {
                          name: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.["name"],
                          caching:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["caching"],
                          writeAcceleratorEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["writeAcceleratorEnabled"],
                          createOption:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["createOption"],
                          diffDiskSettings: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.diffDiskSettings
                            ? undefined
                            : {
                                option:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["option"],
                                placement:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["placement"],
                              },
                          diskSizeGB:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["diskSizeGB"],
                          osType:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["osType"],
                          image: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.image
                            ? undefined
                            : {
                                uri: result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.image?.["uri"],
                              },
                          vhdContainers:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["vhdContainers"],
                          managedDisk: !result.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                            ? undefined
                            : {
                                storageAccountType:
                                  result.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.managedDisk?.["storageAccountType"],
                                diskEncryptionSet: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.diskEncryptionSet
                                  ? undefined
                                  : {
                                      id: result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.diskEncryptionSet?.["id"],
                                    },
                                securityProfile: !result.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.securityProfile
                                  ? undefined
                                  : {
                                      securityEncryptionType:
                                        result.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.storageProfile?.osDisk
                                          ?.managedDisk?.securityProfile?.[
                                          "securityEncryptionType"
                                        ],
                                      diskEncryptionSet: !result.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.securityProfile?.diskEncryptionSet
                                        ? undefined
                                        : {
                                            id: result.body.properties?.computeProfile
                                              .baseVirtualMachineProfile.storageProfile?.osDisk
                                              ?.managedDisk?.securityProfile?.diskEncryptionSet?.[
                                              "id"
                                            ],
                                          },
                                    },
                              },
                          deleteOption:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["deleteOption"],
                        },
                    dataDisks:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["dataDisks"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.["dataDisks"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "dataDisks"
                          ].map((p: any) => {
                            return {
                              name: p["name"],
                              lun: p["lun"],
                              caching: p["caching"],
                              writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                              createOption: p["createOption"],
                              diskSizeGB: p["diskSizeGB"],
                              managedDisk: !p.managedDisk
                                ? undefined
                                : {
                                    storageAccountType: p.managedDisk?.["storageAccountType"],
                                    diskEncryptionSet: !p.managedDisk?.diskEncryptionSet
                                      ? undefined
                                      : {
                                          id: p.managedDisk?.diskEncryptionSet?.["id"],
                                        },
                                    securityProfile: !p.managedDisk?.securityProfile
                                      ? undefined
                                      : {
                                          securityEncryptionType:
                                            p.managedDisk?.securityProfile?.[
                                              "securityEncryptionType"
                                            ],
                                          diskEncryptionSet: !p.managedDisk?.securityProfile
                                            ?.diskEncryptionSet
                                            ? undefined
                                            : {
                                                id: p.managedDisk?.securityProfile
                                                  ?.diskEncryptionSet?.["id"],
                                              },
                                        },
                                  },
                              diskIOPSReadWrite: p["diskIOPSReadWrite"],
                              diskMBpsReadWrite: p["diskMBpsReadWrite"],
                              deleteOption: p["deleteOption"],
                            };
                          }),
                    diskControllerType:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["diskControllerType"],
                  },
              networkProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .networkProfile
                ? undefined
                : {
                    healthProbe: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .networkProfile?.healthProbe
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.healthProbe?.["id"],
                        },
                    networkInterfaceConfigurations:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkInterfaceConfigurations"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.["networkInterfaceConfigurations"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkInterfaceConfigurations"
                          ].map((p: any) => {
                            return {
                              name: p["name"],
                              properties: !p.properties
                                ? undefined
                                : {
                                    primary: p.properties?.["primary"],
                                    enableAcceleratedNetworking:
                                      p.properties?.["enableAcceleratedNetworking"],
                                    disableTcpStateTracking:
                                      p.properties?.["disableTcpStateTracking"],
                                    enableFpga: p.properties?.["enableFpga"],
                                    networkSecurityGroup: !p.properties?.networkSecurityGroup
                                      ? undefined
                                      : {
                                          id: p.properties?.networkSecurityGroup?.["id"],
                                        },
                                    dnsSettings: !p.properties?.dnsSettings
                                      ? undefined
                                      : {
                                          dnsServers: p.properties?.dnsSettings?.["dnsServers"],
                                        },
                                    ipConfigurations: p.properties?.["ipConfigurations"].map(
                                      (p: any) => {
                                        return {
                                          name: p["name"],
                                          properties: !p.properties
                                            ? undefined
                                            : {
                                                subnet: !p.properties?.subnet
                                                  ? undefined
                                                  : {
                                                      id: p.properties?.subnet?.["id"],
                                                    },
                                                primary: p.properties?.["primary"],
                                                publicIPAddressConfiguration: !p.properties
                                                  ?.publicIPAddressConfiguration
                                                  ? undefined
                                                  : {
                                                      name: p.properties
                                                        ?.publicIPAddressConfiguration?.["name"],
                                                      properties: !p.properties
                                                        ?.publicIPAddressConfiguration?.properties
                                                        ? undefined
                                                        : {
                                                            idleTimeoutInMinutes:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.[
                                                                "idleTimeoutInMinutes"
                                                              ],
                                                            dnsSettings: !p.properties
                                                              ?.publicIPAddressConfiguration
                                                              ?.properties?.dnsSettings
                                                              ? undefined
                                                              : {
                                                                  domainNameLabel:
                                                                    p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.properties?.dnsSettings?.[
                                                                      "domainNameLabel"
                                                                    ],
                                                                  domainNameLabelScope:
                                                                    p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.properties?.dnsSettings?.[
                                                                      "domainNameLabelScope"
                                                                    ],
                                                                },
                                                            ipTags:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.["ipTags"] ===
                                                              undefined
                                                                ? p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.["ipTags"]
                                                                : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                    "ipTags"
                                                                  ].map((p: any) => {
                                                                    return {
                                                                      ipTagType: p["ipTagType"],
                                                                      tag: p["tag"],
                                                                    };
                                                                  }),
                                                            publicIPPrefix: !p.properties
                                                              ?.publicIPAddressConfiguration
                                                              ?.properties?.publicIPPrefix
                                                              ? undefined
                                                              : {
                                                                  id: p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.publicIPPrefix?.[
                                                                    "id"
                                                                  ],
                                                                },
                                                            publicIPAddressVersion:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.[
                                                                "publicIPAddressVersion"
                                                              ],
                                                            deleteOption:
                                                              p.properties
                                                                ?.publicIPAddressConfiguration
                                                                ?.properties?.["deleteOption"],
                                                          },
                                                      sku: !p.properties
                                                        ?.publicIPAddressConfiguration?.sku
                                                        ? undefined
                                                        : {
                                                            name: p.properties
                                                              ?.publicIPAddressConfiguration?.sku?.[
                                                              "name"
                                                            ],
                                                            tier: p.properties
                                                              ?.publicIPAddressConfiguration?.sku?.[
                                                              "tier"
                                                            ],
                                                          },
                                                    },
                                                privateIPAddressVersion:
                                                  p.properties?.["privateIPAddressVersion"],
                                                applicationGatewayBackendAddressPools:
                                                  p.properties?.[
                                                    "applicationGatewayBackendAddressPools"
                                                  ] === undefined
                                                    ? p.properties?.[
                                                        "applicationGatewayBackendAddressPools"
                                                      ]
                                                    : p.properties?.[
                                                        "applicationGatewayBackendAddressPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                applicationSecurityGroups:
                                                  p.properties?.["applicationSecurityGroups"] ===
                                                  undefined
                                                    ? p.properties?.["applicationSecurityGroups"]
                                                    : p.properties?.[
                                                        "applicationSecurityGroups"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerBackendAddressPools:
                                                  p.properties?.[
                                                    "loadBalancerBackendAddressPools"
                                                  ] === undefined
                                                    ? p.properties?.[
                                                        "loadBalancerBackendAddressPools"
                                                      ]
                                                    : p.properties?.[
                                                        "loadBalancerBackendAddressPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerInboundNatPools:
                                                  p.properties?.["loadBalancerInboundNatPools"] ===
                                                  undefined
                                                    ? p.properties?.["loadBalancerInboundNatPools"]
                                                    : p.properties?.[
                                                        "loadBalancerInboundNatPools"
                                                      ].map((p: any) => {
                                                        return { id: p["id"] };
                                                      }),
                                              },
                                        };
                                      },
                                    ),
                                    enableIPForwarding: p.properties?.["enableIPForwarding"],
                                    deleteOption: p.properties?.["deleteOption"],
                                    auxiliaryMode: p.properties?.["auxiliaryMode"],
                                    auxiliarySku: p.properties?.["auxiliarySku"],
                                  },
                            };
                          }),
                    networkApiVersion:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkApiVersion"],
                  },
              securityProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .securityProfile
                ? undefined
                : {
                    uefiSettings: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityProfile?.uefiSettings
                      ? undefined
                      : {
                          secureBootEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["secureBootEnabled"],
                          vTpmEnabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["vTpmEnabled"],
                        },
                    encryptionAtHost:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["encryptionAtHost"],
                    securityType:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["securityType"],
                    encryptionIdentity: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.encryptionIdentity
                      ? undefined
                      : {
                          userAssignedIdentityResourceId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.encryptionIdentity?.[
                              "userAssignedIdentityResourceId"
                            ],
                        },
                    proxyAgentSettings: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.proxyAgentSettings
                      ? undefined
                      : {
                          enabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["enabled"],
                          mode: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .securityProfile?.proxyAgentSettings?.["mode"],
                          keyIncarnationId:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["keyIncarnationId"],
                        },
                  },
              diagnosticsProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .diagnosticsProfile
                ? undefined
                : {
                    bootDiagnostics: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.diagnosticsProfile?.bootDiagnostics
                      ? undefined
                      : {
                          enabled:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["enabled"],
                          storageUri:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["storageUri"],
                        },
                  },
              extensionProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .extensionProfile
                ? undefined
                : {
                    extensions:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensions"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .extensionProfile?.["extensions"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensions"
                          ].map((p: any) => {
                            return {
                              id: p["id"],
                              name: p["name"],
                              type: p["type"],
                              properties: !p.properties
                                ? undefined
                                : {
                                    forceUpdateTag: p.properties?.["forceUpdateTag"],
                                    publisher: p.properties?.["publisher"],
                                    type: p.properties?.["type"],
                                    typeHandlerVersion: p.properties?.["typeHandlerVersion"],
                                    autoUpgradeMinorVersion:
                                      p.properties?.["autoUpgradeMinorVersion"],
                                    enableAutomaticUpgrade:
                                      p.properties?.["enableAutomaticUpgrade"],
                                    settings: p.properties?.["settings"],
                                    protectedSettings: p.properties?.["protectedSettings"],
                                    provisioningState: p.properties?.["provisioningState"],
                                    provisionAfterExtensions:
                                      p.properties?.["provisionAfterExtensions"],
                                    suppressFailures: p.properties?.["suppressFailures"],
                                    protectedSettingsFromKeyVault: !p.properties
                                      ?.protectedSettingsFromKeyVault
                                      ? undefined
                                      : {
                                          secretUrl:
                                            p.properties?.protectedSettingsFromKeyVault?.[
                                              "secretUrl"
                                            ],
                                          sourceVault: {
                                            id: p.properties?.protectedSettingsFromKeyVault
                                              ?.sourceVault["id"],
                                          },
                                        },
                                  },
                            };
                          }),
                    extensionsTimeBudget:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensionsTimeBudget"],
                  },
              licenseType:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["licenseType"],
              scheduledEventsProfile: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.scheduledEventsProfile
                ? undefined
                : {
                    terminateNotificationProfile: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile
                      ?.terminateNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.["enable"],
                        },
                    osImageNotificationProfile: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile?.osImageNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.["enable"],
                        },
                  },
              userData:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["userData"],
              capacityReservation: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .capacityReservation
                ? undefined
                : {
                    capacityReservationGroup: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.capacityReservation?.capacityReservationGroup
                      ? undefined
                      : {
                          id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .capacityReservation?.capacityReservationGroup?.["id"],
                        },
                  },
              applicationProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .applicationProfile
                ? undefined
                : {
                    galleryApplications:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .applicationProfile?.["galleryApplications"] === undefined
                        ? result.body.properties?.computeProfile.baseVirtualMachineProfile
                            .applicationProfile?.["galleryApplications"]
                        : result.body.properties?.computeProfile.baseVirtualMachineProfile.applicationProfile?.[
                            "galleryApplications"
                          ].map((p: any) => {
                            return {
                              tags: p["tags"],
                              order: p["order"],
                              packageReferenceId: p["packageReferenceId"],
                              configurationReference: p["configurationReference"],
                              treatFailureAsDeploymentFailure: p["treatFailureAsDeploymentFailure"],
                              enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                            };
                          }),
                  },
              hardwareProfile: !result.body.properties?.computeProfile.baseVirtualMachineProfile
                .hardwareProfile
                ? undefined
                : {
                    vmSizeProperties: !result.body.properties?.computeProfile
                      .baseVirtualMachineProfile.hardwareProfile?.vmSizeProperties
                      ? undefined
                      : {
                          vCPUsAvailable:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsAvailable"],
                          vCPUsPerCore:
                            result.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsPerCore"],
                        },
                  },
              serviceArtifactReference: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.serviceArtifactReference
                ? undefined
                : {
                    id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .serviceArtifactReference?.["id"],
                  },
              securityPostureReference: !result.body.properties?.computeProfile
                .baseVirtualMachineProfile.securityPostureReference
                ? undefined
                : {
                    id: result.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityPostureReference?.["id"],
                    excludeExtensions:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["excludeExtensions"],
                    isOverridable:
                      result.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["isOverridable"],
                  },
              timeCreated:
                result.body.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"] !==
                undefined
                  ? new Date(
                      result.body.properties?.computeProfile.baseVirtualMachineProfile[
                        "timeCreated"
                      ],
                    )
                  : undefined,
            },
            computeApiVersion: result.body.properties?.computeProfile["computeApiVersion"],
            platformFaultDomainCount:
              result.body.properties?.computeProfile["platformFaultDomainCount"],
            additionalVirtualMachineCapabilities: !result.body.properties?.computeProfile
              .additionalVirtualMachineCapabilities
              ? undefined
              : {
                  ultraSSDEnabled:
                    result.body.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                      "ultraSSDEnabled"
                    ],
                  hibernationEnabled:
                    result.body.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                      "hibernationEnabled"
                    ],
                },
          },
          timeCreated:
            result.body.properties?.["timeCreated"] !== undefined
              ? new Date(result.body.properties?.["timeCreated"])
              : undefined,
          uniqueId: result.body.properties?.["uniqueId"],
        },
    zones: result.body["zones"],
    identity: !result.body.identity
      ? undefined
      : {
          principalId: result.body.identity?.["principalId"],
          tenantId: result.body.identity?.["tenantId"],
          type: result.body.identity?.["type"],
          userAssignedIdentities: result.body.identity?.["userAssignedIdentities"],
        },
    plan: !result.body.plan
      ? undefined
      : {
          name: result.body.plan?.["name"],
          publisher: result.body.plan?.["publisher"],
          product: result.body.plan?.["product"],
          promotionCode: result.body.plan?.["promotionCode"],
          version: result.body.plan?.["version"],
        },
  };
}

/** Update a Fleet */
export function fleetsUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetUpdate,
  options: FleetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(context, _fleetsUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fleetsUpdateSend(context, subscriptionId, resourceGroupName, fleetName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _fleetsDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Fleet */
export function fleetsDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _fleetsDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _fleetsDeleteSend(context, subscriptionId, resourceGroupName, fleetName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _fleetsListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_FleetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        tags: p["tags"],
        location: p["location"],
        id: p["id"],
        name: p["name"],
        type: p["type"],
        systemData: !p.systemData
          ? undefined
          : {
              createdBy: p.systemData?.["createdBy"],
              createdByType: p.systemData?.["createdByType"],
              createdAt:
                p.systemData?.["createdAt"] !== undefined
                  ? new Date(p.systemData?.["createdAt"])
                  : undefined,
              lastModifiedBy: p.systemData?.["lastModifiedBy"],
              lastModifiedByType: p.systemData?.["lastModifiedByType"],
              lastModifiedAt:
                p.systemData?.["lastModifiedAt"] !== undefined
                  ? new Date(p.systemData?.["lastModifiedAt"])
                  : undefined,
            },
        properties: !p.properties
          ? undefined
          : {
              provisioningState: p.properties?.["provisioningState"],
              spotPriorityProfile: !p.properties?.spotPriorityProfile
                ? undefined
                : {
                    capacity: p.properties?.spotPriorityProfile?.["capacity"],
                    minCapacity: p.properties?.spotPriorityProfile?.["minCapacity"],
                    maxPricePerVM: p.properties?.spotPriorityProfile?.["maxPricePerVM"],
                    evictionPolicy: p.properties?.spotPriorityProfile?.["evictionPolicy"],
                    allocationStrategy: p.properties?.spotPriorityProfile?.["allocationStrategy"],
                    maintain: p.properties?.spotPriorityProfile?.["maintain"],
                  },
              regularPriorityProfile: !p.properties?.regularPriorityProfile
                ? undefined
                : {
                    capacity: p.properties?.regularPriorityProfile?.["capacity"],
                    minCapacity: p.properties?.regularPriorityProfile?.["minCapacity"],
                    allocationStrategy:
                      p.properties?.regularPriorityProfile?.["allocationStrategy"],
                  },
              vmSizesProfile: p.properties?.["vmSizesProfile"].map((p: any) => {
                return { name: p["name"], rank: p["rank"] };
              }),
              vmAttributes: !p.properties?.vmAttributes
                ? undefined
                : {
                    vCpuCount: {
                      min: p.properties?.vmAttributes?.vCpuCount["min"],
                      max: p.properties?.vmAttributes?.vCpuCount["max"],
                    },
                    memoryInGiB: {
                      min: p.properties?.vmAttributes?.memoryInGiB["min"],
                      max: p.properties?.vmAttributes?.memoryInGiB["max"],
                    },
                    memoryInGiBPerVCpu: !p.properties?.vmAttributes?.memoryInGiBPerVCpu
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.memoryInGiBPerVCpu?.["min"],
                          max: p.properties?.vmAttributes?.memoryInGiBPerVCpu?.["max"],
                        },
                    localStorageSupport: p.properties?.vmAttributes?.["localStorageSupport"],
                    localStorageInGiB: !p.properties?.vmAttributes?.localStorageInGiB
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.localStorageInGiB?.["min"],
                          max: p.properties?.vmAttributes?.localStorageInGiB?.["max"],
                        },
                    localStorageDiskTypes: p.properties?.vmAttributes?.["localStorageDiskTypes"],
                    dataDiskCount: !p.properties?.vmAttributes?.dataDiskCount
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.dataDiskCount?.["min"],
                          max: p.properties?.vmAttributes?.dataDiskCount?.["max"],
                        },
                    networkInterfaceCount: !p.properties?.vmAttributes?.networkInterfaceCount
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.networkInterfaceCount?.["min"],
                          max: p.properties?.vmAttributes?.networkInterfaceCount?.["max"],
                        },
                    networkBandwidthInMbps: !p.properties?.vmAttributes?.networkBandwidthInMbps
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.networkBandwidthInMbps?.["min"],
                          max: p.properties?.vmAttributes?.networkBandwidthInMbps?.["max"],
                        },
                    rdmaSupport: p.properties?.vmAttributes?.["rdmaSupport"],
                    rdmaNetworkInterfaceCount: !p.properties?.vmAttributes
                      ?.rdmaNetworkInterfaceCount
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["min"],
                          max: p.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["max"],
                        },
                    acceleratorSupport: p.properties?.vmAttributes?.["acceleratorSupport"],
                    acceleratorManufacturers:
                      p.properties?.vmAttributes?.["acceleratorManufacturers"],
                    acceleratorTypes: p.properties?.vmAttributes?.["acceleratorTypes"],
                    acceleratorCount: !p.properties?.vmAttributes?.acceleratorCount
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.acceleratorCount?.["min"],
                          max: p.properties?.vmAttributes?.acceleratorCount?.["max"],
                        },
                    vmCategories: p.properties?.vmAttributes?.["vmCategories"],
                    architectureTypes: p.properties?.vmAttributes?.["architectureTypes"],
                    cpuManufacturers: p.properties?.vmAttributes?.["cpuManufacturers"],
                    burstableSupport: p.properties?.vmAttributes?.["burstableSupport"],
                    excludedVMSizes: p.properties?.vmAttributes?.["excludedVMSizes"],
                  },
              additionalLocationsProfile: !p.properties?.additionalLocationsProfile
                ? undefined
                : {
                    locationProfiles: p.properties?.additionalLocationsProfile?.[
                      "locationProfiles"
                    ].map((p: any) => {
                      return {
                        location: p["location"],
                        virtualMachineProfileOverride: !p.virtualMachineProfileOverride
                          ? undefined
                          : {
                              osProfile: !p.virtualMachineProfileOverride?.osProfile
                                ? undefined
                                : {
                                    computerNamePrefix:
                                      p.virtualMachineProfileOverride?.osProfile?.[
                                        "computerNamePrefix"
                                      ],
                                    adminUsername:
                                      p.virtualMachineProfileOverride?.osProfile?.["adminUsername"],
                                    adminPassword:
                                      p.virtualMachineProfileOverride?.osProfile?.["adminPassword"],
                                    customData:
                                      p.virtualMachineProfileOverride?.osProfile?.["customData"],
                                    windowsConfiguration: !p.virtualMachineProfileOverride
                                      ?.osProfile?.windowsConfiguration
                                      ? undefined
                                      : {
                                          provisionVMAgent:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["provisionVMAgent"],
                                          enableAutomaticUpdates:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["enableAutomaticUpdates"],
                                          timeZone:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["timeZone"],
                                          additionalUnattendContent:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.[
                                              "additionalUnattendContent"
                                            ] === undefined
                                              ? p.virtualMachineProfileOverride?.osProfile
                                                  ?.windowsConfiguration?.[
                                                  "additionalUnattendContent"
                                                ]
                                              : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.[
                                                  "additionalUnattendContent"
                                                ].map((p: any) => {
                                                  return {
                                                    passName: p["passName"],
                                                    componentName: p["componentName"],
                                                    settingName: p["settingName"],
                                                    content: p["content"],
                                                  };
                                                }),
                                          patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                            ?.windowsConfiguration?.patchSettings
                                            ? undefined
                                            : {
                                                patchMode:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.patchSettings?.[
                                                    "patchMode"
                                                  ],
                                                enableHotpatching:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.patchSettings?.[
                                                    "enableHotpatching"
                                                  ],
                                                assessmentMode:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.patchSettings?.[
                                                    "assessmentMode"
                                                  ],
                                                automaticByPlatformSettings: !p
                                                  .virtualMachineProfileOverride?.osProfile
                                                  ?.windowsConfiguration?.patchSettings
                                                  ?.automaticByPlatformSettings
                                                  ? undefined
                                                  : {
                                                      rebootSetting:
                                                        p.virtualMachineProfileOverride?.osProfile
                                                          ?.windowsConfiguration?.patchSettings
                                                          ?.automaticByPlatformSettings?.[
                                                          "rebootSetting"
                                                        ],
                                                      bypassPlatformSafetyChecksOnUserSchedule:
                                                        p.virtualMachineProfileOverride?.osProfile
                                                          ?.windowsConfiguration?.patchSettings
                                                          ?.automaticByPlatformSettings?.[
                                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                                        ],
                                                    },
                                              },
                                          winRM: !p.virtualMachineProfileOverride?.osProfile
                                            ?.windowsConfiguration?.winRM
                                            ? undefined
                                            : {
                                                listeners:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.winRM?.["listeners"] ===
                                                  undefined
                                                    ? p.virtualMachineProfileOverride?.osProfile
                                                        ?.windowsConfiguration?.winRM?.["listeners"]
                                                    : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.winRM?.[
                                                        "listeners"
                                                      ].map((p: any) => {
                                                        return {
                                                          protocol: p["protocol"],
                                                          certificateUrl: p["certificateUrl"],
                                                        };
                                                      }),
                                              },
                                          enableVMAgentPlatformUpdates:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.[
                                              "enableVMAgentPlatformUpdates"
                                            ],
                                        },
                                    linuxConfiguration: !p.virtualMachineProfileOverride?.osProfile
                                      ?.linuxConfiguration
                                      ? undefined
                                      : {
                                          disablePasswordAuthentication:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.[
                                              "disablePasswordAuthentication"
                                            ],
                                          ssh: !p.virtualMachineProfileOverride?.osProfile
                                            ?.linuxConfiguration?.ssh
                                            ? undefined
                                            : {
                                                publicKeys:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                                  undefined
                                                    ? p.virtualMachineProfileOverride?.osProfile
                                                        ?.linuxConfiguration?.ssh?.["publicKeys"]
                                                    : p.virtualMachineProfileOverride?.osProfile?.linuxConfiguration?.ssh?.[
                                                        "publicKeys"
                                                      ].map((p: any) => {
                                                        return {
                                                          path: p["path"],
                                                          keyData: p["keyData"],
                                                        };
                                                      }),
                                              },
                                          provisionVMAgent:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.["provisionVMAgent"],
                                          patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                            ?.linuxConfiguration?.patchSettings
                                            ? undefined
                                            : {
                                                patchMode:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.patchSettings?.[
                                                    "patchMode"
                                                  ],
                                                assessmentMode:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.patchSettings?.[
                                                    "assessmentMode"
                                                  ],
                                                automaticByPlatformSettings: !p
                                                  .virtualMachineProfileOverride?.osProfile
                                                  ?.linuxConfiguration?.patchSettings
                                                  ?.automaticByPlatformSettings
                                                  ? undefined
                                                  : {
                                                      rebootSetting:
                                                        p.virtualMachineProfileOverride?.osProfile
                                                          ?.linuxConfiguration?.patchSettings
                                                          ?.automaticByPlatformSettings?.[
                                                          "rebootSetting"
                                                        ],
                                                      bypassPlatformSafetyChecksOnUserSchedule:
                                                        p.virtualMachineProfileOverride?.osProfile
                                                          ?.linuxConfiguration?.patchSettings
                                                          ?.automaticByPlatformSettings?.[
                                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                                        ],
                                                    },
                                              },
                                          enableVMAgentPlatformUpdates:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.[
                                              "enableVMAgentPlatformUpdates"
                                            ],
                                        },
                                    secrets:
                                      p.virtualMachineProfileOverride?.osProfile?.["secrets"] ===
                                      undefined
                                        ? p.virtualMachineProfileOverride?.osProfile?.["secrets"]
                                        : p.virtualMachineProfileOverride?.osProfile?.[
                                            "secrets"
                                          ].map((p: any) => {
                                            return {
                                              sourceVault: !p.sourceVault
                                                ? undefined
                                                : {
                                                    id: p.sourceVault?.["id"],
                                                  },
                                              vaultCertificates:
                                                p["vaultCertificates"] === undefined
                                                  ? p["vaultCertificates"]
                                                  : p["vaultCertificates"].map((p: any) => {
                                                      return {
                                                        certificateUrl: p["certificateUrl"],
                                                        certificateStore: p["certificateStore"],
                                                      };
                                                    }),
                                            };
                                          }),
                                    allowExtensionOperations:
                                      p.virtualMachineProfileOverride?.osProfile?.[
                                        "allowExtensionOperations"
                                      ],
                                    requireGuestProvisionSignal:
                                      p.virtualMachineProfileOverride?.osProfile?.[
                                        "requireGuestProvisionSignal"
                                      ],
                                  },
                              storageProfile: !p.virtualMachineProfileOverride?.storageProfile
                                ? undefined
                                : {
                                    imageReference: !p.virtualMachineProfileOverride?.storageProfile
                                      ?.imageReference
                                      ? undefined
                                      : {
                                          id: p.virtualMachineProfileOverride?.storageProfile
                                            ?.imageReference?.["id"],
                                          publisher:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["publisher"],
                                          offer:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["offer"],
                                          sku: p.virtualMachineProfileOverride?.storageProfile
                                            ?.imageReference?.["sku"],
                                          version:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["version"],
                                          exactVersion:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["exactVersion"],
                                          sharedGalleryImageId:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["sharedGalleryImageId"],
                                          communityGalleryImageId:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["communityGalleryImageId"],
                                        },
                                    osDisk: !p.virtualMachineProfileOverride?.storageProfile?.osDisk
                                      ? undefined
                                      : {
                                          name: p.virtualMachineProfileOverride?.storageProfile
                                            ?.osDisk?.["name"],
                                          caching:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["caching"],
                                          writeAcceleratorEnabled:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["writeAcceleratorEnabled"],
                                          createOption:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["createOption"],
                                          diffDiskSettings: !p.virtualMachineProfileOverride
                                            ?.storageProfile?.osDisk?.diffDiskSettings
                                            ? undefined
                                            : {
                                                option:
                                                  p.virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.diffDiskSettings?.["option"],
                                                placement:
                                                  p.virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.diffDiskSettings?.["placement"],
                                              },
                                          diskSizeGB:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["diskSizeGB"],
                                          osType:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["osType"],
                                          image: !p.virtualMachineProfileOverride?.storageProfile
                                            ?.osDisk?.image
                                            ? undefined
                                            : {
                                                uri: p.virtualMachineProfileOverride?.storageProfile
                                                  ?.osDisk?.image?.["uri"],
                                              },
                                          vhdContainers:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["vhdContainers"],
                                          managedDisk: !p.virtualMachineProfileOverride
                                            ?.storageProfile?.osDisk?.managedDisk
                                            ? undefined
                                            : {
                                                storageAccountType:
                                                  p.virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.managedDisk?.["storageAccountType"],
                                                diskEncryptionSet: !p.virtualMachineProfileOverride
                                                  ?.storageProfile?.osDisk?.managedDisk
                                                  ?.diskEncryptionSet
                                                  ? undefined
                                                  : {
                                                      id: p.virtualMachineProfileOverride
                                                        ?.storageProfile?.osDisk?.managedDisk
                                                        ?.diskEncryptionSet?.["id"],
                                                    },
                                                securityProfile: !p.virtualMachineProfileOverride
                                                  ?.storageProfile?.osDisk?.managedDisk
                                                  ?.securityProfile
                                                  ? undefined
                                                  : {
                                                      securityEncryptionType:
                                                        p.virtualMachineProfileOverride
                                                          ?.storageProfile?.osDisk?.managedDisk
                                                          ?.securityProfile?.[
                                                          "securityEncryptionType"
                                                        ],
                                                      diskEncryptionSet: !p
                                                        .virtualMachineProfileOverride
                                                        ?.storageProfile?.osDisk?.managedDisk
                                                        ?.securityProfile?.diskEncryptionSet
                                                        ? undefined
                                                        : {
                                                            id: p.virtualMachineProfileOverride
                                                              ?.storageProfile?.osDisk?.managedDisk
                                                              ?.securityProfile
                                                              ?.diskEncryptionSet?.["id"],
                                                          },
                                                    },
                                              },
                                          deleteOption:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["deleteOption"],
                                        },
                                    dataDisks:
                                      p.virtualMachineProfileOverride?.storageProfile?.[
                                        "dataDisks"
                                      ] === undefined
                                        ? p.virtualMachineProfileOverride?.storageProfile?.[
                                            "dataDisks"
                                          ]
                                        : p.virtualMachineProfileOverride?.storageProfile?.[
                                            "dataDisks"
                                          ].map((p: any) => {
                                            return {
                                              name: p["name"],
                                              lun: p["lun"],
                                              caching: p["caching"],
                                              writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                                              createOption: p["createOption"],
                                              diskSizeGB: p["diskSizeGB"],
                                              managedDisk: !p.managedDisk
                                                ? undefined
                                                : {
                                                    storageAccountType:
                                                      p.managedDisk?.["storageAccountType"],
                                                    diskEncryptionSet: !p.managedDisk
                                                      ?.diskEncryptionSet
                                                      ? undefined
                                                      : {
                                                          id: p.managedDisk?.diskEncryptionSet?.[
                                                            "id"
                                                          ],
                                                        },
                                                    securityProfile: !p.managedDisk?.securityProfile
                                                      ? undefined
                                                      : {
                                                          securityEncryptionType:
                                                            p.managedDisk?.securityProfile?.[
                                                              "securityEncryptionType"
                                                            ],
                                                          diskEncryptionSet: !p.managedDisk
                                                            ?.securityProfile?.diskEncryptionSet
                                                            ? undefined
                                                            : {
                                                                id: p.managedDisk?.securityProfile
                                                                  ?.diskEncryptionSet?.["id"],
                                                              },
                                                        },
                                                  },
                                              diskIOPSReadWrite: p["diskIOPSReadWrite"],
                                              diskMBpsReadWrite: p["diskMBpsReadWrite"],
                                              deleteOption: p["deleteOption"],
                                            };
                                          }),
                                    diskControllerType:
                                      p.virtualMachineProfileOverride?.storageProfile?.[
                                        "diskControllerType"
                                      ],
                                  },
                              networkProfile: !p.virtualMachineProfileOverride?.networkProfile
                                ? undefined
                                : {
                                    healthProbe: !p.virtualMachineProfileOverride?.networkProfile
                                      ?.healthProbe
                                      ? undefined
                                      : {
                                          id: p.virtualMachineProfileOverride?.networkProfile
                                            ?.healthProbe?.["id"],
                                        },
                                    networkInterfaceConfigurations:
                                      p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkInterfaceConfigurations"
                                      ] === undefined
                                        ? p.virtualMachineProfileOverride?.networkProfile?.[
                                            "networkInterfaceConfigurations"
                                          ]
                                        : p.virtualMachineProfileOverride?.networkProfile?.[
                                            "networkInterfaceConfigurations"
                                          ].map((p: any) => {
                                            return {
                                              name: p["name"],
                                              properties: !p.properties
                                                ? undefined
                                                : {
                                                    primary: p.properties?.["primary"],
                                                    enableAcceleratedNetworking:
                                                      p.properties?.["enableAcceleratedNetworking"],
                                                    disableTcpStateTracking:
                                                      p.properties?.["disableTcpStateTracking"],
                                                    enableFpga: p.properties?.["enableFpga"],
                                                    networkSecurityGroup: !p.properties
                                                      ?.networkSecurityGroup
                                                      ? undefined
                                                      : {
                                                          id: p.properties?.networkSecurityGroup?.[
                                                            "id"
                                                          ],
                                                        },
                                                    dnsSettings: !p.properties?.dnsSettings
                                                      ? undefined
                                                      : {
                                                          dnsServers:
                                                            p.properties?.dnsSettings?.[
                                                              "dnsServers"
                                                            ],
                                                        },
                                                    ipConfigurations: p.properties?.[
                                                      "ipConfigurations"
                                                    ].map((p: any) => {
                                                      return {
                                                        name: p["name"],
                                                        properties: !p.properties
                                                          ? undefined
                                                          : {
                                                              subnet: !p.properties?.subnet
                                                                ? undefined
                                                                : {
                                                                    id: p.properties?.subnet?.[
                                                                      "id"
                                                                    ],
                                                                  },
                                                              primary: p.properties?.["primary"],
                                                              publicIPAddressConfiguration: !p
                                                                .properties
                                                                ?.publicIPAddressConfiguration
                                                                ? undefined
                                                                : {
                                                                    name: p.properties
                                                                      ?.publicIPAddressConfiguration?.[
                                                                      "name"
                                                                    ],
                                                                    properties: !p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.properties
                                                                      ? undefined
                                                                      : {
                                                                          idleTimeoutInMinutes:
                                                                            p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "idleTimeoutInMinutes"
                                                                            ],
                                                                          dnsSettings: !p.properties
                                                                            ?.publicIPAddressConfiguration
                                                                            ?.properties
                                                                            ?.dnsSettings
                                                                            ? undefined
                                                                            : {
                                                                                domainNameLabel:
                                                                                  p.properties
                                                                                    ?.publicIPAddressConfiguration
                                                                                    ?.properties
                                                                                    ?.dnsSettings?.[
                                                                                    "domainNameLabel"
                                                                                  ],
                                                                                domainNameLabelScope:
                                                                                  p.properties
                                                                                    ?.publicIPAddressConfiguration
                                                                                    ?.properties
                                                                                    ?.dnsSettings?.[
                                                                                    "domainNameLabelScope"
                                                                                  ],
                                                                              },
                                                                          ipTags:
                                                                            p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "ipTags"
                                                                            ] === undefined
                                                                              ? p.properties
                                                                                  ?.publicIPAddressConfiguration
                                                                                  ?.properties?.[
                                                                                  "ipTags"
                                                                                ]
                                                                              : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                                  "ipTags"
                                                                                ].map((p: any) => {
                                                                                  return {
                                                                                    ipTagType:
                                                                                      p[
                                                                                        "ipTagType"
                                                                                      ],
                                                                                    tag: p["tag"],
                                                                                  };
                                                                                }),
                                                                          publicIPPrefix: !p
                                                                            .properties
                                                                            ?.publicIPAddressConfiguration
                                                                            ?.properties
                                                                            ?.publicIPPrefix
                                                                            ? undefined
                                                                            : {
                                                                                id: p.properties
                                                                                  ?.publicIPAddressConfiguration
                                                                                  ?.properties
                                                                                  ?.publicIPPrefix?.[
                                                                                  "id"
                                                                                ],
                                                                              },
                                                                          publicIPAddressVersion:
                                                                            p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "publicIPAddressVersion"
                                                                            ],
                                                                          deleteOption:
                                                                            p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "deleteOption"
                                                                            ],
                                                                        },
                                                                    sku: !p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.sku
                                                                      ? undefined
                                                                      : {
                                                                          name: p.properties
                                                                            ?.publicIPAddressConfiguration
                                                                            ?.sku?.["name"],
                                                                          tier: p.properties
                                                                            ?.publicIPAddressConfiguration
                                                                            ?.sku?.["tier"],
                                                                        },
                                                                  },
                                                              privateIPAddressVersion:
                                                                p.properties?.[
                                                                  "privateIPAddressVersion"
                                                                ],
                                                              applicationGatewayBackendAddressPools:
                                                                p.properties?.[
                                                                  "applicationGatewayBackendAddressPools"
                                                                ] === undefined
                                                                  ? p.properties?.[
                                                                      "applicationGatewayBackendAddressPools"
                                                                    ]
                                                                  : p.properties?.[
                                                                      "applicationGatewayBackendAddressPools"
                                                                    ].map((p: any) => {
                                                                      return {
                                                                        id: p["id"],
                                                                      };
                                                                    }),
                                                              applicationSecurityGroups:
                                                                p.properties?.[
                                                                  "applicationSecurityGroups"
                                                                ] === undefined
                                                                  ? p.properties?.[
                                                                      "applicationSecurityGroups"
                                                                    ]
                                                                  : p.properties?.[
                                                                      "applicationSecurityGroups"
                                                                    ].map((p: any) => {
                                                                      return {
                                                                        id: p["id"],
                                                                      };
                                                                    }),
                                                              loadBalancerBackendAddressPools:
                                                                p.properties?.[
                                                                  "loadBalancerBackendAddressPools"
                                                                ] === undefined
                                                                  ? p.properties?.[
                                                                      "loadBalancerBackendAddressPools"
                                                                    ]
                                                                  : p.properties?.[
                                                                      "loadBalancerBackendAddressPools"
                                                                    ].map((p: any) => {
                                                                      return {
                                                                        id: p["id"],
                                                                      };
                                                                    }),
                                                              loadBalancerInboundNatPools:
                                                                p.properties?.[
                                                                  "loadBalancerInboundNatPools"
                                                                ] === undefined
                                                                  ? p.properties?.[
                                                                      "loadBalancerInboundNatPools"
                                                                    ]
                                                                  : p.properties?.[
                                                                      "loadBalancerInboundNatPools"
                                                                    ].map((p: any) => {
                                                                      return {
                                                                        id: p["id"],
                                                                      };
                                                                    }),
                                                            },
                                                      };
                                                    }),
                                                    enableIPForwarding:
                                                      p.properties?.["enableIPForwarding"],
                                                    deleteOption: p.properties?.["deleteOption"],
                                                    auxiliaryMode: p.properties?.["auxiliaryMode"],
                                                    auxiliarySku: p.properties?.["auxiliarySku"],
                                                  },
                                            };
                                          }),
                                    networkApiVersion:
                                      p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkApiVersion"
                                      ],
                                  },
                              securityProfile: !p.virtualMachineProfileOverride?.securityProfile
                                ? undefined
                                : {
                                    uefiSettings: !p.virtualMachineProfileOverride?.securityProfile
                                      ?.uefiSettings
                                      ? undefined
                                      : {
                                          secureBootEnabled:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.uefiSettings?.["secureBootEnabled"],
                                          vTpmEnabled:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.uefiSettings?.["vTpmEnabled"],
                                        },
                                    encryptionAtHost:
                                      p.virtualMachineProfileOverride?.securityProfile?.[
                                        "encryptionAtHost"
                                      ],
                                    securityType:
                                      p.virtualMachineProfileOverride?.securityProfile?.[
                                        "securityType"
                                      ],
                                    encryptionIdentity: !p.virtualMachineProfileOverride
                                      ?.securityProfile?.encryptionIdentity
                                      ? undefined
                                      : {
                                          userAssignedIdentityResourceId:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.encryptionIdentity?.[
                                              "userAssignedIdentityResourceId"
                                            ],
                                        },
                                    proxyAgentSettings: !p.virtualMachineProfileOverride
                                      ?.securityProfile?.proxyAgentSettings
                                      ? undefined
                                      : {
                                          enabled:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.proxyAgentSettings?.["enabled"],
                                          mode: p.virtualMachineProfileOverride?.securityProfile
                                            ?.proxyAgentSettings?.["mode"],
                                          keyIncarnationId:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.proxyAgentSettings?.["keyIncarnationId"],
                                        },
                                  },
                              diagnosticsProfile: !p.virtualMachineProfileOverride
                                ?.diagnosticsProfile
                                ? undefined
                                : {
                                    bootDiagnostics: !p.virtualMachineProfileOverride
                                      ?.diagnosticsProfile?.bootDiagnostics
                                      ? undefined
                                      : {
                                          enabled:
                                            p.virtualMachineProfileOverride?.diagnosticsProfile
                                              ?.bootDiagnostics?.["enabled"],
                                          storageUri:
                                            p.virtualMachineProfileOverride?.diagnosticsProfile
                                              ?.bootDiagnostics?.["storageUri"],
                                        },
                                  },
                              extensionProfile: !p.virtualMachineProfileOverride?.extensionProfile
                                ? undefined
                                : {
                                    extensions:
                                      p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensions"
                                      ] === undefined
                                        ? p.virtualMachineProfileOverride?.extensionProfile?.[
                                            "extensions"
                                          ]
                                        : p.virtualMachineProfileOverride?.extensionProfile?.[
                                            "extensions"
                                          ].map((p: any) => {
                                            return {
                                              id: p["id"],
                                              name: p["name"],
                                              type: p["type"],
                                              properties: !p.properties
                                                ? undefined
                                                : {
                                                    forceUpdateTag:
                                                      p.properties?.["forceUpdateTag"],
                                                    publisher: p.properties?.["publisher"],
                                                    type: p.properties?.["type"],
                                                    typeHandlerVersion:
                                                      p.properties?.["typeHandlerVersion"],
                                                    autoUpgradeMinorVersion:
                                                      p.properties?.["autoUpgradeMinorVersion"],
                                                    enableAutomaticUpgrade:
                                                      p.properties?.["enableAutomaticUpgrade"],
                                                    settings: p.properties?.["settings"],
                                                    protectedSettings:
                                                      p.properties?.["protectedSettings"],
                                                    provisioningState:
                                                      p.properties?.["provisioningState"],
                                                    provisionAfterExtensions:
                                                      p.properties?.["provisionAfterExtensions"],
                                                    suppressFailures:
                                                      p.properties?.["suppressFailures"],
                                                    protectedSettingsFromKeyVault: !p.properties
                                                      ?.protectedSettingsFromKeyVault
                                                      ? undefined
                                                      : {
                                                          secretUrl:
                                                            p.properties
                                                              ?.protectedSettingsFromKeyVault?.[
                                                              "secretUrl"
                                                            ],
                                                          sourceVault: {
                                                            id: p.properties
                                                              ?.protectedSettingsFromKeyVault
                                                              ?.sourceVault["id"],
                                                          },
                                                        },
                                                  },
                                            };
                                          }),
                                    extensionsTimeBudget:
                                      p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensionsTimeBudget"
                                      ],
                                  },
                              licenseType: p.virtualMachineProfileOverride?.["licenseType"],
                              scheduledEventsProfile: !p.virtualMachineProfileOverride
                                ?.scheduledEventsProfile
                                ? undefined
                                : {
                                    terminateNotificationProfile: !p.virtualMachineProfileOverride
                                      ?.scheduledEventsProfile?.terminateNotificationProfile
                                      ? undefined
                                      : {
                                          notBeforeTimeout:
                                            p.virtualMachineProfileOverride?.scheduledEventsProfile
                                              ?.terminateNotificationProfile?.["notBeforeTimeout"],
                                          enable:
                                            p.virtualMachineProfileOverride?.scheduledEventsProfile
                                              ?.terminateNotificationProfile?.["enable"],
                                        },
                                    osImageNotificationProfile: !p.virtualMachineProfileOverride
                                      ?.scheduledEventsProfile?.osImageNotificationProfile
                                      ? undefined
                                      : {
                                          notBeforeTimeout:
                                            p.virtualMachineProfileOverride?.scheduledEventsProfile
                                              ?.osImageNotificationProfile?.["notBeforeTimeout"],
                                          enable:
                                            p.virtualMachineProfileOverride?.scheduledEventsProfile
                                              ?.osImageNotificationProfile?.["enable"],
                                        },
                                  },
                              userData: p.virtualMachineProfileOverride?.["userData"],
                              capacityReservation: !p.virtualMachineProfileOverride
                                ?.capacityReservation
                                ? undefined
                                : {
                                    capacityReservationGroup: !p.virtualMachineProfileOverride
                                      ?.capacityReservation?.capacityReservationGroup
                                      ? undefined
                                      : {
                                          id: p.virtualMachineProfileOverride?.capacityReservation
                                            ?.capacityReservationGroup?.["id"],
                                        },
                                  },
                              applicationProfile: !p.virtualMachineProfileOverride
                                ?.applicationProfile
                                ? undefined
                                : {
                                    galleryApplications:
                                      p.virtualMachineProfileOverride?.applicationProfile?.[
                                        "galleryApplications"
                                      ] === undefined
                                        ? p.virtualMachineProfileOverride?.applicationProfile?.[
                                            "galleryApplications"
                                          ]
                                        : p.virtualMachineProfileOverride?.applicationProfile?.[
                                            "galleryApplications"
                                          ].map((p: any) => {
                                            return {
                                              tags: p["tags"],
                                              order: p["order"],
                                              packageReferenceId: p["packageReferenceId"],
                                              configurationReference: p["configurationReference"],
                                              treatFailureAsDeploymentFailure:
                                                p["treatFailureAsDeploymentFailure"],
                                              enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                                            };
                                          }),
                                  },
                              hardwareProfile: !p.virtualMachineProfileOverride?.hardwareProfile
                                ? undefined
                                : {
                                    vmSizeProperties: !p.virtualMachineProfileOverride
                                      ?.hardwareProfile?.vmSizeProperties
                                      ? undefined
                                      : {
                                          vCPUsAvailable:
                                            p.virtualMachineProfileOverride?.hardwareProfile
                                              ?.vmSizeProperties?.["vCPUsAvailable"],
                                          vCPUsPerCore:
                                            p.virtualMachineProfileOverride?.hardwareProfile
                                              ?.vmSizeProperties?.["vCPUsPerCore"],
                                        },
                                  },
                              serviceArtifactReference: !p.virtualMachineProfileOverride
                                ?.serviceArtifactReference
                                ? undefined
                                : {
                                    id: p.virtualMachineProfileOverride?.serviceArtifactReference?.[
                                      "id"
                                    ],
                                  },
                              securityPostureReference: !p.virtualMachineProfileOverride
                                ?.securityPostureReference
                                ? undefined
                                : {
                                    id: p.virtualMachineProfileOverride?.securityPostureReference?.[
                                      "id"
                                    ],
                                    excludeExtensions:
                                      p.virtualMachineProfileOverride?.securityPostureReference?.[
                                        "excludeExtensions"
                                      ],
                                    isOverridable:
                                      p.virtualMachineProfileOverride?.securityPostureReference?.[
                                        "isOverridable"
                                      ],
                                  },
                              timeCreated:
                                p.virtualMachineProfileOverride?.["timeCreated"] !== undefined
                                  ? new Date(p.virtualMachineProfileOverride?.["timeCreated"])
                                  : undefined,
                            },
                      };
                    }),
                  },
              computeProfile: {
                baseVirtualMachineProfile: {
                  osProfile: !p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                    ? undefined
                    : {
                        computerNamePrefix:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "computerNamePrefix"
                          ],
                        adminUsername:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "adminUsername"
                          ],
                        adminPassword:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "adminPassword"
                          ],
                        customData:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "customData"
                          ],
                        windowsConfiguration: !p.properties?.computeProfile
                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                          ? undefined
                          : {
                              provisionVMAgent:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["provisionVMAgent"],
                              enableAutomaticUpdates:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["enableAutomaticUpdates"],
                              timeZone:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["timeZone"],
                              additionalUnattendContent:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["additionalUnattendContent"] ===
                                undefined
                                  ? p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                      ?.windowsConfiguration?.["additionalUnattendContent"]
                                  : p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.[
                                      "additionalUnattendContent"
                                    ].map((p: any) => {
                                      return {
                                        passName: p["passName"],
                                        componentName: p["componentName"],
                                        settingName: p["settingName"],
                                        content: p["content"],
                                      };
                                    }),
                              patchSettings: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .osProfile?.windowsConfiguration?.patchSettings
                                ? undefined
                                : {
                                    patchMode:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.patchSettings?.[
                                        "patchMode"
                                      ],
                                    enableHotpatching:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.patchSettings?.[
                                        "enableHotpatching"
                                      ],
                                    assessmentMode:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.patchSettings?.[
                                        "assessmentMode"
                                      ],
                                    automaticByPlatformSettings: !p.properties?.computeProfile
                                      .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                      ?.patchSettings?.automaticByPlatformSettings
                                      ? undefined
                                      : {
                                          rebootSetting:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .osProfile?.windowsConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings?.["rebootSetting"],
                                          bypassPlatformSafetyChecksOnUserSchedule:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .osProfile?.windowsConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings?.[
                                              "bypassPlatformSafetyChecksOnUserSchedule"
                                            ],
                                        },
                                  },
                              winRM: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .osProfile?.windowsConfiguration?.winRM
                                ? undefined
                                : {
                                    listeners:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.winRM?.["listeners"] ===
                                      undefined
                                        ? p.properties?.computeProfile.baseVirtualMachineProfile
                                            .osProfile?.windowsConfiguration?.winRM?.["listeners"]
                                        : p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.winRM?.[
                                            "listeners"
                                          ].map((p: any) => {
                                            return {
                                              protocol: p["protocol"],
                                              certificateUrl: p["certificateUrl"],
                                            };
                                          }),
                                  },
                              enableVMAgentPlatformUpdates:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                            },
                        linuxConfiguration: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .osProfile?.linuxConfiguration
                          ? undefined
                          : {
                              disablePasswordAuthentication:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.linuxConfiguration?.["disablePasswordAuthentication"],
                              ssh: !p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                ?.linuxConfiguration?.ssh
                                ? undefined
                                : {
                                    publicKeys:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                      undefined
                                        ? p.properties?.computeProfile.baseVirtualMachineProfile
                                            .osProfile?.linuxConfiguration?.ssh?.["publicKeys"]
                                        : p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.linuxConfiguration?.ssh?.[
                                            "publicKeys"
                                          ].map((p: any) => {
                                            return {
                                              path: p["path"],
                                              keyData: p["keyData"],
                                            };
                                          }),
                                  },
                              provisionVMAgent:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.linuxConfiguration?.["provisionVMAgent"],
                              patchSettings: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .osProfile?.linuxConfiguration?.patchSettings
                                ? undefined
                                : {
                                    patchMode:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.linuxConfiguration?.patchSettings?.[
                                        "patchMode"
                                      ],
                                    assessmentMode:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.linuxConfiguration?.patchSettings?.[
                                        "assessmentMode"
                                      ],
                                    automaticByPlatformSettings: !p.properties?.computeProfile
                                      .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                      ?.patchSettings?.automaticByPlatformSettings
                                      ? undefined
                                      : {
                                          rebootSetting:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .osProfile?.linuxConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings?.["rebootSetting"],
                                          bypassPlatformSafetyChecksOnUserSchedule:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .osProfile?.linuxConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings?.[
                                              "bypassPlatformSafetyChecksOnUserSchedule"
                                            ],
                                        },
                                  },
                              enableVMAgentPlatformUpdates:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                            },
                        secrets:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                                "secrets"
                              ]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                                "secrets"
                              ].map((p: any) => {
                                return {
                                  sourceVault: !p.sourceVault
                                    ? undefined
                                    : { id: p.sourceVault?.["id"] },
                                  vaultCertificates:
                                    p["vaultCertificates"] === undefined
                                      ? p["vaultCertificates"]
                                      : p["vaultCertificates"].map((p: any) => {
                                          return {
                                            certificateUrl: p["certificateUrl"],
                                            certificateStore: p["certificateStore"],
                                          };
                                        }),
                                };
                              }),
                        allowExtensionOperations:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "allowExtensionOperations"
                          ],
                        requireGuestProvisionSignal:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "requireGuestProvisionSignal"
                          ],
                      },
                  storageProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .storageProfile
                    ? undefined
                    : {
                        imageReference: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .storageProfile?.imageReference
                          ? undefined
                          : {
                              id: p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.imageReference?.["id"],
                              publisher:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["publisher"],
                              offer:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["offer"],
                              sku: p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.imageReference?.["sku"],
                              version:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["version"],
                              exactVersion:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["exactVersion"],
                              sharedGalleryImageId:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["sharedGalleryImageId"],
                              communityGalleryImageId:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["communityGalleryImageId"],
                            },
                        osDisk: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .storageProfile?.osDisk
                          ? undefined
                          : {
                              name: p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.osDisk?.["name"],
                              caching:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["caching"],
                              writeAcceleratorEnabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["writeAcceleratorEnabled"],
                              createOption:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["createOption"],
                              diffDiskSettings: !p.properties?.computeProfile
                                .baseVirtualMachineProfile.storageProfile?.osDisk?.diffDiskSettings
                                ? undefined
                                : {
                                    option:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .storageProfile?.osDisk?.diffDiskSettings?.["option"],
                                    placement:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .storageProfile?.osDisk?.diffDiskSettings?.["placement"],
                                  },
                              diskSizeGB:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["diskSizeGB"],
                              osType:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["osType"],
                              image: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.osDisk?.image
                                ? undefined
                                : {
                                    uri: p.properties?.computeProfile.baseVirtualMachineProfile
                                      .storageProfile?.osDisk?.image?.["uri"],
                                  },
                              vhdContainers:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["vhdContainers"],
                              managedDisk: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.osDisk?.managedDisk
                                ? undefined
                                : {
                                    storageAccountType:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .storageProfile?.osDisk?.managedDisk?.[
                                        "storageAccountType"
                                      ],
                                    diskEncryptionSet: !p.properties?.computeProfile
                                      .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                      ?.diskEncryptionSet
                                      ? undefined
                                      : {
                                          id: p.properties?.computeProfile.baseVirtualMachineProfile
                                            .storageProfile?.osDisk?.managedDisk
                                            ?.diskEncryptionSet?.["id"],
                                        },
                                    securityProfile: !p.properties?.computeProfile
                                      .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                      ?.securityProfile
                                      ? undefined
                                      : {
                                          securityEncryptionType:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .storageProfile?.osDisk?.managedDisk
                                              ?.securityProfile?.["securityEncryptionType"],
                                          diskEncryptionSet: !p.properties?.computeProfile
                                            .baseVirtualMachineProfile.storageProfile?.osDisk
                                            ?.managedDisk?.securityProfile?.diskEncryptionSet
                                            ? undefined
                                            : {
                                                id: p.properties?.computeProfile
                                                  .baseVirtualMachineProfile.storageProfile?.osDisk
                                                  ?.managedDisk?.securityProfile
                                                  ?.diskEncryptionSet?.["id"],
                                              },
                                        },
                                  },
                              deleteOption:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["deleteOption"],
                            },
                        dataDisks:
                          p.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "dataDisks"
                          ] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.["dataDisks"]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                                "dataDisks"
                              ].map((p: any) => {
                                return {
                                  name: p["name"],
                                  lun: p["lun"],
                                  caching: p["caching"],
                                  writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                                  createOption: p["createOption"],
                                  diskSizeGB: p["diskSizeGB"],
                                  managedDisk: !p.managedDisk
                                    ? undefined
                                    : {
                                        storageAccountType: p.managedDisk?.["storageAccountType"],
                                        diskEncryptionSet: !p.managedDisk?.diskEncryptionSet
                                          ? undefined
                                          : {
                                              id: p.managedDisk?.diskEncryptionSet?.["id"],
                                            },
                                        securityProfile: !p.managedDisk?.securityProfile
                                          ? undefined
                                          : {
                                              securityEncryptionType:
                                                p.managedDisk?.securityProfile?.[
                                                  "securityEncryptionType"
                                                ],
                                              diskEncryptionSet: !p.managedDisk?.securityProfile
                                                ?.diskEncryptionSet
                                                ? undefined
                                                : {
                                                    id: p.managedDisk?.securityProfile
                                                      ?.diskEncryptionSet?.["id"],
                                                  },
                                            },
                                      },
                                  diskIOPSReadWrite: p["diskIOPSReadWrite"],
                                  diskMBpsReadWrite: p["diskMBpsReadWrite"],
                                  deleteOption: p["deleteOption"],
                                };
                              }),
                        diskControllerType:
                          p.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "diskControllerType"
                          ],
                      },
                  networkProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .networkProfile
                    ? undefined
                    : {
                        healthProbe: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .networkProfile?.healthProbe
                          ? undefined
                          : {
                              id: p.properties?.computeProfile.baseVirtualMachineProfile
                                .networkProfile?.healthProbe?.["id"],
                            },
                        networkInterfaceConfigurations:
                          p.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkInterfaceConfigurations"
                          ] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile
                                .networkProfile?.["networkInterfaceConfigurations"]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                                "networkInterfaceConfigurations"
                              ].map((p: any) => {
                                return {
                                  name: p["name"],
                                  properties: !p.properties
                                    ? undefined
                                    : {
                                        primary: p.properties?.["primary"],
                                        enableAcceleratedNetworking:
                                          p.properties?.["enableAcceleratedNetworking"],
                                        disableTcpStateTracking:
                                          p.properties?.["disableTcpStateTracking"],
                                        enableFpga: p.properties?.["enableFpga"],
                                        networkSecurityGroup: !p.properties?.networkSecurityGroup
                                          ? undefined
                                          : {
                                              id: p.properties?.networkSecurityGroup?.["id"],
                                            },
                                        dnsSettings: !p.properties?.dnsSettings
                                          ? undefined
                                          : {
                                              dnsServers: p.properties?.dnsSettings?.["dnsServers"],
                                            },
                                        ipConfigurations: p.properties?.["ipConfigurations"].map(
                                          (p: any) => {
                                            return {
                                              name: p["name"],
                                              properties: !p.properties
                                                ? undefined
                                                : {
                                                    subnet: !p.properties?.subnet
                                                      ? undefined
                                                      : {
                                                          id: p.properties?.subnet?.["id"],
                                                        },
                                                    primary: p.properties?.["primary"],
                                                    publicIPAddressConfiguration: !p.properties
                                                      ?.publicIPAddressConfiguration
                                                      ? undefined
                                                      : {
                                                          name: p.properties
                                                            ?.publicIPAddressConfiguration?.[
                                                            "name"
                                                          ],
                                                          properties: !p.properties
                                                            ?.publicIPAddressConfiguration
                                                            ?.properties
                                                            ? undefined
                                                            : {
                                                                idleTimeoutInMinutes:
                                                                  p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.[
                                                                    "idleTimeoutInMinutes"
                                                                  ],
                                                                dnsSettings: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.properties?.dnsSettings
                                                                  ? undefined
                                                                  : {
                                                                      domainNameLabel:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties
                                                                          ?.dnsSettings?.[
                                                                          "domainNameLabel"
                                                                        ],
                                                                      domainNameLabelScope:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties
                                                                          ?.dnsSettings?.[
                                                                          "domainNameLabelScope"
                                                                        ],
                                                                    },
                                                                ipTags:
                                                                  p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.["ipTags"] ===
                                                                  undefined
                                                                    ? p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties?.["ipTags"]
                                                                    : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                        "ipTags"
                                                                      ].map((p: any) => {
                                                                        return {
                                                                          ipTagType: p["ipTagType"],
                                                                          tag: p["tag"],
                                                                        };
                                                                      }),
                                                                publicIPPrefix: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.properties?.publicIPPrefix
                                                                  ? undefined
                                                                  : {
                                                                      id: p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties
                                                                        ?.publicIPPrefix?.["id"],
                                                                    },
                                                                publicIPAddressVersion:
                                                                  p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.[
                                                                    "publicIPAddressVersion"
                                                                  ],
                                                                deleteOption:
                                                                  p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.["deleteOption"],
                                                              },
                                                          sku: !p.properties
                                                            ?.publicIPAddressConfiguration?.sku
                                                            ? undefined
                                                            : {
                                                                name: p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.sku?.["name"],
                                                                tier: p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.sku?.["tier"],
                                                              },
                                                        },
                                                    privateIPAddressVersion:
                                                      p.properties?.["privateIPAddressVersion"],
                                                    applicationGatewayBackendAddressPools:
                                                      p.properties?.[
                                                        "applicationGatewayBackendAddressPools"
                                                      ] === undefined
                                                        ? p.properties?.[
                                                            "applicationGatewayBackendAddressPools"
                                                          ]
                                                        : p.properties?.[
                                                            "applicationGatewayBackendAddressPools"
                                                          ].map((p: any) => {
                                                            return {
                                                              id: p["id"],
                                                            };
                                                          }),
                                                    applicationSecurityGroups:
                                                      p.properties?.[
                                                        "applicationSecurityGroups"
                                                      ] === undefined
                                                        ? p.properties?.[
                                                            "applicationSecurityGroups"
                                                          ]
                                                        : p.properties?.[
                                                            "applicationSecurityGroups"
                                                          ].map((p: any) => {
                                                            return {
                                                              id: p["id"],
                                                            };
                                                          }),
                                                    loadBalancerBackendAddressPools:
                                                      p.properties?.[
                                                        "loadBalancerBackendAddressPools"
                                                      ] === undefined
                                                        ? p.properties?.[
                                                            "loadBalancerBackendAddressPools"
                                                          ]
                                                        : p.properties?.[
                                                            "loadBalancerBackendAddressPools"
                                                          ].map((p: any) => {
                                                            return {
                                                              id: p["id"],
                                                            };
                                                          }),
                                                    loadBalancerInboundNatPools:
                                                      p.properties?.[
                                                        "loadBalancerInboundNatPools"
                                                      ] === undefined
                                                        ? p.properties?.[
                                                            "loadBalancerInboundNatPools"
                                                          ]
                                                        : p.properties?.[
                                                            "loadBalancerInboundNatPools"
                                                          ].map((p: any) => {
                                                            return {
                                                              id: p["id"],
                                                            };
                                                          }),
                                                  },
                                            };
                                          },
                                        ),
                                        enableIPForwarding: p.properties?.["enableIPForwarding"],
                                        deleteOption: p.properties?.["deleteOption"],
                                        auxiliaryMode: p.properties?.["auxiliaryMode"],
                                        auxiliarySku: p.properties?.["auxiliarySku"],
                                      },
                                };
                              }),
                        networkApiVersion:
                          p.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkApiVersion"
                          ],
                      },
                  securityProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .securityProfile
                    ? undefined
                    : {
                        uefiSettings: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .securityProfile?.uefiSettings
                          ? undefined
                          : {
                              secureBootEnabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.uefiSettings?.["secureBootEnabled"],
                              vTpmEnabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.uefiSettings?.["vTpmEnabled"],
                            },
                        encryptionAtHost:
                          p.properties?.computeProfile.baseVirtualMachineProfile.securityProfile?.[
                            "encryptionAtHost"
                          ],
                        securityType:
                          p.properties?.computeProfile.baseVirtualMachineProfile.securityProfile?.[
                            "securityType"
                          ],
                        encryptionIdentity: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .securityProfile?.encryptionIdentity
                          ? undefined
                          : {
                              userAssignedIdentityResourceId:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.encryptionIdentity?.[
                                  "userAssignedIdentityResourceId"
                                ],
                            },
                        proxyAgentSettings: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .securityProfile?.proxyAgentSettings
                          ? undefined
                          : {
                              enabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.proxyAgentSettings?.["enabled"],
                              mode: p.properties?.computeProfile.baseVirtualMachineProfile
                                .securityProfile?.proxyAgentSettings?.["mode"],
                              keyIncarnationId:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.proxyAgentSettings?.["keyIncarnationId"],
                            },
                      },
                  diagnosticsProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .diagnosticsProfile
                    ? undefined
                    : {
                        bootDiagnostics: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .diagnosticsProfile?.bootDiagnostics
                          ? undefined
                          : {
                              enabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .diagnosticsProfile?.bootDiagnostics?.["enabled"],
                              storageUri:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .diagnosticsProfile?.bootDiagnostics?.["storageUri"],
                            },
                      },
                  extensionProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .extensionProfile
                    ? undefined
                    : {
                        extensions:
                          p.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensions"
                          ] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile
                                .extensionProfile?.["extensions"]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                                "extensions"
                              ].map((p: any) => {
                                return {
                                  id: p["id"],
                                  name: p["name"],
                                  type: p["type"],
                                  properties: !p.properties
                                    ? undefined
                                    : {
                                        forceUpdateTag: p.properties?.["forceUpdateTag"],
                                        publisher: p.properties?.["publisher"],
                                        type: p.properties?.["type"],
                                        typeHandlerVersion: p.properties?.["typeHandlerVersion"],
                                        autoUpgradeMinorVersion:
                                          p.properties?.["autoUpgradeMinorVersion"],
                                        enableAutomaticUpgrade:
                                          p.properties?.["enableAutomaticUpgrade"],
                                        settings: p.properties?.["settings"],
                                        protectedSettings: p.properties?.["protectedSettings"],
                                        provisioningState: p.properties?.["provisioningState"],
                                        provisionAfterExtensions:
                                          p.properties?.["provisionAfterExtensions"],
                                        suppressFailures: p.properties?.["suppressFailures"],
                                        protectedSettingsFromKeyVault: !p.properties
                                          ?.protectedSettingsFromKeyVault
                                          ? undefined
                                          : {
                                              secretUrl:
                                                p.properties?.protectedSettingsFromKeyVault?.[
                                                  "secretUrl"
                                                ],
                                              sourceVault: {
                                                id: p.properties?.protectedSettingsFromKeyVault
                                                  ?.sourceVault["id"],
                                              },
                                            },
                                      },
                                };
                              }),
                        extensionsTimeBudget:
                          p.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensionsTimeBudget"
                          ],
                      },
                  licenseType:
                    p.properties?.computeProfile.baseVirtualMachineProfile["licenseType"],
                  scheduledEventsProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .scheduledEventsProfile
                    ? undefined
                    : {
                        terminateNotificationProfile: !p.properties?.computeProfile
                          .baseVirtualMachineProfile.scheduledEventsProfile
                          ?.terminateNotificationProfile
                          ? undefined
                          : {
                              notBeforeTimeout:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .scheduledEventsProfile?.terminateNotificationProfile?.[
                                  "notBeforeTimeout"
                                ],
                              enable:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .scheduledEventsProfile?.terminateNotificationProfile?.["enable"],
                            },
                        osImageNotificationProfile: !p.properties?.computeProfile
                          .baseVirtualMachineProfile.scheduledEventsProfile
                          ?.osImageNotificationProfile
                          ? undefined
                          : {
                              notBeforeTimeout:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .scheduledEventsProfile?.osImageNotificationProfile?.[
                                  "notBeforeTimeout"
                                ],
                              enable:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .scheduledEventsProfile?.osImageNotificationProfile?.["enable"],
                            },
                      },
                  userData: p.properties?.computeProfile.baseVirtualMachineProfile["userData"],
                  capacityReservation: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .capacityReservation
                    ? undefined
                    : {
                        capacityReservationGroup: !p.properties?.computeProfile
                          .baseVirtualMachineProfile.capacityReservation?.capacityReservationGroup
                          ? undefined
                          : {
                              id: p.properties?.computeProfile.baseVirtualMachineProfile
                                .capacityReservation?.capacityReservationGroup?.["id"],
                            },
                      },
                  applicationProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .applicationProfile
                    ? undefined
                    : {
                        galleryApplications:
                          p.properties?.computeProfile.baseVirtualMachineProfile
                            .applicationProfile?.["galleryApplications"] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile
                                .applicationProfile?.["galleryApplications"]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.applicationProfile?.[
                                "galleryApplications"
                              ].map((p: any) => {
                                return {
                                  tags: p["tags"],
                                  order: p["order"],
                                  packageReferenceId: p["packageReferenceId"],
                                  configurationReference: p["configurationReference"],
                                  treatFailureAsDeploymentFailure:
                                    p["treatFailureAsDeploymentFailure"],
                                  enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                                };
                              }),
                      },
                  hardwareProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .hardwareProfile
                    ? undefined
                    : {
                        vmSizeProperties: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .hardwareProfile?.vmSizeProperties
                          ? undefined
                          : {
                              vCPUsAvailable:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .hardwareProfile?.vmSizeProperties?.["vCPUsAvailable"],
                              vCPUsPerCore:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .hardwareProfile?.vmSizeProperties?.["vCPUsPerCore"],
                            },
                      },
                  serviceArtifactReference: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .serviceArtifactReference
                    ? undefined
                    : {
                        id: p.properties?.computeProfile.baseVirtualMachineProfile
                          .serviceArtifactReference?.["id"],
                      },
                  securityPostureReference: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .securityPostureReference
                    ? undefined
                    : {
                        id: p.properties?.computeProfile.baseVirtualMachineProfile
                          .securityPostureReference?.["id"],
                        excludeExtensions:
                          p.properties?.computeProfile.baseVirtualMachineProfile
                            .securityPostureReference?.["excludeExtensions"],
                        isOverridable:
                          p.properties?.computeProfile.baseVirtualMachineProfile
                            .securityPostureReference?.["isOverridable"],
                      },
                  timeCreated:
                    p.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"] !==
                    undefined
                      ? new Date(
                          p.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"],
                        )
                      : undefined,
                },
                computeApiVersion: p.properties?.computeProfile["computeApiVersion"],
                platformFaultDomainCount: p.properties?.computeProfile["platformFaultDomainCount"],
                additionalVirtualMachineCapabilities: !p.properties?.computeProfile
                  .additionalVirtualMachineCapabilities
                  ? undefined
                  : {
                      ultraSSDEnabled:
                        p.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                          "ultraSSDEnabled"
                        ],
                      hibernationEnabled:
                        p.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                          "hibernationEnabled"
                        ],
                    },
              },
              timeCreated:
                p.properties?.["timeCreated"] !== undefined
                  ? new Date(p.properties?.["timeCreated"])
                  : undefined,
              uniqueId: p.properties?.["uniqueId"],
            },
        zones: p["zones"],
        identity: !p.identity
          ? undefined
          : {
              principalId: p.identity?.["principalId"],
              tenantId: p.identity?.["tenantId"],
              type: p.identity?.["type"],
              userAssignedIdentities: p.identity?.["userAssignedIdentities"],
            },
        plan: !p.plan
          ? undefined
          : {
              name: p.plan?.["name"],
              publisher: p.plan?.["publisher"],
              product: p.plan?.["product"],
              promotionCode: p.plan?.["promotionCode"],
              version: p.plan?.["version"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List Fleet resources by resource group */
export function fleetsListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () => _fleetsListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _fleetsListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fleetsListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/subscriptions/{subscriptionId}/providers/Microsoft.AzureFleet/fleets", subscriptionId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_FleetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        tags: p["tags"],
        location: p["location"],
        id: p["id"],
        name: p["name"],
        type: p["type"],
        systemData: !p.systemData
          ? undefined
          : {
              createdBy: p.systemData?.["createdBy"],
              createdByType: p.systemData?.["createdByType"],
              createdAt:
                p.systemData?.["createdAt"] !== undefined
                  ? new Date(p.systemData?.["createdAt"])
                  : undefined,
              lastModifiedBy: p.systemData?.["lastModifiedBy"],
              lastModifiedByType: p.systemData?.["lastModifiedByType"],
              lastModifiedAt:
                p.systemData?.["lastModifiedAt"] !== undefined
                  ? new Date(p.systemData?.["lastModifiedAt"])
                  : undefined,
            },
        properties: !p.properties
          ? undefined
          : {
              provisioningState: p.properties?.["provisioningState"],
              spotPriorityProfile: !p.properties?.spotPriorityProfile
                ? undefined
                : {
                    capacity: p.properties?.spotPriorityProfile?.["capacity"],
                    minCapacity: p.properties?.spotPriorityProfile?.["minCapacity"],
                    maxPricePerVM: p.properties?.spotPriorityProfile?.["maxPricePerVM"],
                    evictionPolicy: p.properties?.spotPriorityProfile?.["evictionPolicy"],
                    allocationStrategy: p.properties?.spotPriorityProfile?.["allocationStrategy"],
                    maintain: p.properties?.spotPriorityProfile?.["maintain"],
                  },
              regularPriorityProfile: !p.properties?.regularPriorityProfile
                ? undefined
                : {
                    capacity: p.properties?.regularPriorityProfile?.["capacity"],
                    minCapacity: p.properties?.regularPriorityProfile?.["minCapacity"],
                    allocationStrategy:
                      p.properties?.regularPriorityProfile?.["allocationStrategy"],
                  },
              vmSizesProfile: p.properties?.["vmSizesProfile"].map((p: any) => {
                return { name: p["name"], rank: p["rank"] };
              }),
              vmAttributes: !p.properties?.vmAttributes
                ? undefined
                : {
                    vCpuCount: {
                      min: p.properties?.vmAttributes?.vCpuCount["min"],
                      max: p.properties?.vmAttributes?.vCpuCount["max"],
                    },
                    memoryInGiB: {
                      min: p.properties?.vmAttributes?.memoryInGiB["min"],
                      max: p.properties?.vmAttributes?.memoryInGiB["max"],
                    },
                    memoryInGiBPerVCpu: !p.properties?.vmAttributes?.memoryInGiBPerVCpu
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.memoryInGiBPerVCpu?.["min"],
                          max: p.properties?.vmAttributes?.memoryInGiBPerVCpu?.["max"],
                        },
                    localStorageSupport: p.properties?.vmAttributes?.["localStorageSupport"],
                    localStorageInGiB: !p.properties?.vmAttributes?.localStorageInGiB
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.localStorageInGiB?.["min"],
                          max: p.properties?.vmAttributes?.localStorageInGiB?.["max"],
                        },
                    localStorageDiskTypes: p.properties?.vmAttributes?.["localStorageDiskTypes"],
                    dataDiskCount: !p.properties?.vmAttributes?.dataDiskCount
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.dataDiskCount?.["min"],
                          max: p.properties?.vmAttributes?.dataDiskCount?.["max"],
                        },
                    networkInterfaceCount: !p.properties?.vmAttributes?.networkInterfaceCount
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.networkInterfaceCount?.["min"],
                          max: p.properties?.vmAttributes?.networkInterfaceCount?.["max"],
                        },
                    networkBandwidthInMbps: !p.properties?.vmAttributes?.networkBandwidthInMbps
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.networkBandwidthInMbps?.["min"],
                          max: p.properties?.vmAttributes?.networkBandwidthInMbps?.["max"],
                        },
                    rdmaSupport: p.properties?.vmAttributes?.["rdmaSupport"],
                    rdmaNetworkInterfaceCount: !p.properties?.vmAttributes
                      ?.rdmaNetworkInterfaceCount
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["min"],
                          max: p.properties?.vmAttributes?.rdmaNetworkInterfaceCount?.["max"],
                        },
                    acceleratorSupport: p.properties?.vmAttributes?.["acceleratorSupport"],
                    acceleratorManufacturers:
                      p.properties?.vmAttributes?.["acceleratorManufacturers"],
                    acceleratorTypes: p.properties?.vmAttributes?.["acceleratorTypes"],
                    acceleratorCount: !p.properties?.vmAttributes?.acceleratorCount
                      ? undefined
                      : {
                          min: p.properties?.vmAttributes?.acceleratorCount?.["min"],
                          max: p.properties?.vmAttributes?.acceleratorCount?.["max"],
                        },
                    vmCategories: p.properties?.vmAttributes?.["vmCategories"],
                    architectureTypes: p.properties?.vmAttributes?.["architectureTypes"],
                    cpuManufacturers: p.properties?.vmAttributes?.["cpuManufacturers"],
                    burstableSupport: p.properties?.vmAttributes?.["burstableSupport"],
                    excludedVMSizes: p.properties?.vmAttributes?.["excludedVMSizes"],
                  },
              additionalLocationsProfile: !p.properties?.additionalLocationsProfile
                ? undefined
                : {
                    locationProfiles: p.properties?.additionalLocationsProfile?.[
                      "locationProfiles"
                    ].map((p: any) => {
                      return {
                        location: p["location"],
                        virtualMachineProfileOverride: !p.virtualMachineProfileOverride
                          ? undefined
                          : {
                              osProfile: !p.virtualMachineProfileOverride?.osProfile
                                ? undefined
                                : {
                                    computerNamePrefix:
                                      p.virtualMachineProfileOverride?.osProfile?.[
                                        "computerNamePrefix"
                                      ],
                                    adminUsername:
                                      p.virtualMachineProfileOverride?.osProfile?.["adminUsername"],
                                    adminPassword:
                                      p.virtualMachineProfileOverride?.osProfile?.["adminPassword"],
                                    customData:
                                      p.virtualMachineProfileOverride?.osProfile?.["customData"],
                                    windowsConfiguration: !p.virtualMachineProfileOverride
                                      ?.osProfile?.windowsConfiguration
                                      ? undefined
                                      : {
                                          provisionVMAgent:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["provisionVMAgent"],
                                          enableAutomaticUpdates:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["enableAutomaticUpdates"],
                                          timeZone:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.["timeZone"],
                                          additionalUnattendContent:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.[
                                              "additionalUnattendContent"
                                            ] === undefined
                                              ? p.virtualMachineProfileOverride?.osProfile
                                                  ?.windowsConfiguration?.[
                                                  "additionalUnattendContent"
                                                ]
                                              : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.[
                                                  "additionalUnattendContent"
                                                ].map((p: any) => {
                                                  return {
                                                    passName: p["passName"],
                                                    componentName: p["componentName"],
                                                    settingName: p["settingName"],
                                                    content: p["content"],
                                                  };
                                                }),
                                          patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                            ?.windowsConfiguration?.patchSettings
                                            ? undefined
                                            : {
                                                patchMode:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.patchSettings?.[
                                                    "patchMode"
                                                  ],
                                                enableHotpatching:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.patchSettings?.[
                                                    "enableHotpatching"
                                                  ],
                                                assessmentMode:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.patchSettings?.[
                                                    "assessmentMode"
                                                  ],
                                                automaticByPlatformSettings: !p
                                                  .virtualMachineProfileOverride?.osProfile
                                                  ?.windowsConfiguration?.patchSettings
                                                  ?.automaticByPlatformSettings
                                                  ? undefined
                                                  : {
                                                      rebootSetting:
                                                        p.virtualMachineProfileOverride?.osProfile
                                                          ?.windowsConfiguration?.patchSettings
                                                          ?.automaticByPlatformSettings?.[
                                                          "rebootSetting"
                                                        ],
                                                      bypassPlatformSafetyChecksOnUserSchedule:
                                                        p.virtualMachineProfileOverride?.osProfile
                                                          ?.windowsConfiguration?.patchSettings
                                                          ?.automaticByPlatformSettings?.[
                                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                                        ],
                                                    },
                                              },
                                          winRM: !p.virtualMachineProfileOverride?.osProfile
                                            ?.windowsConfiguration?.winRM
                                            ? undefined
                                            : {
                                                listeners:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.windowsConfiguration?.winRM?.["listeners"] ===
                                                  undefined
                                                    ? p.virtualMachineProfileOverride?.osProfile
                                                        ?.windowsConfiguration?.winRM?.["listeners"]
                                                    : p.virtualMachineProfileOverride?.osProfile?.windowsConfiguration?.winRM?.[
                                                        "listeners"
                                                      ].map((p: any) => {
                                                        return {
                                                          protocol: p["protocol"],
                                                          certificateUrl: p["certificateUrl"],
                                                        };
                                                      }),
                                              },
                                          enableVMAgentPlatformUpdates:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.windowsConfiguration?.[
                                              "enableVMAgentPlatformUpdates"
                                            ],
                                        },
                                    linuxConfiguration: !p.virtualMachineProfileOverride?.osProfile
                                      ?.linuxConfiguration
                                      ? undefined
                                      : {
                                          disablePasswordAuthentication:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.[
                                              "disablePasswordAuthentication"
                                            ],
                                          ssh: !p.virtualMachineProfileOverride?.osProfile
                                            ?.linuxConfiguration?.ssh
                                            ? undefined
                                            : {
                                                publicKeys:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                                  undefined
                                                    ? p.virtualMachineProfileOverride?.osProfile
                                                        ?.linuxConfiguration?.ssh?.["publicKeys"]
                                                    : p.virtualMachineProfileOverride?.osProfile?.linuxConfiguration?.ssh?.[
                                                        "publicKeys"
                                                      ].map((p: any) => {
                                                        return {
                                                          path: p["path"],
                                                          keyData: p["keyData"],
                                                        };
                                                      }),
                                              },
                                          provisionVMAgent:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.["provisionVMAgent"],
                                          patchSettings: !p.virtualMachineProfileOverride?.osProfile
                                            ?.linuxConfiguration?.patchSettings
                                            ? undefined
                                            : {
                                                patchMode:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.patchSettings?.[
                                                    "patchMode"
                                                  ],
                                                assessmentMode:
                                                  p.virtualMachineProfileOverride?.osProfile
                                                    ?.linuxConfiguration?.patchSettings?.[
                                                    "assessmentMode"
                                                  ],
                                                automaticByPlatformSettings: !p
                                                  .virtualMachineProfileOverride?.osProfile
                                                  ?.linuxConfiguration?.patchSettings
                                                  ?.automaticByPlatformSettings
                                                  ? undefined
                                                  : {
                                                      rebootSetting:
                                                        p.virtualMachineProfileOverride?.osProfile
                                                          ?.linuxConfiguration?.patchSettings
                                                          ?.automaticByPlatformSettings?.[
                                                          "rebootSetting"
                                                        ],
                                                      bypassPlatformSafetyChecksOnUserSchedule:
                                                        p.virtualMachineProfileOverride?.osProfile
                                                          ?.linuxConfiguration?.patchSettings
                                                          ?.automaticByPlatformSettings?.[
                                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                                        ],
                                                    },
                                              },
                                          enableVMAgentPlatformUpdates:
                                            p.virtualMachineProfileOverride?.osProfile
                                              ?.linuxConfiguration?.[
                                              "enableVMAgentPlatformUpdates"
                                            ],
                                        },
                                    secrets:
                                      p.virtualMachineProfileOverride?.osProfile?.["secrets"] ===
                                      undefined
                                        ? p.virtualMachineProfileOverride?.osProfile?.["secrets"]
                                        : p.virtualMachineProfileOverride?.osProfile?.[
                                            "secrets"
                                          ].map((p: any) => {
                                            return {
                                              sourceVault: !p.sourceVault
                                                ? undefined
                                                : {
                                                    id: p.sourceVault?.["id"],
                                                  },
                                              vaultCertificates:
                                                p["vaultCertificates"] === undefined
                                                  ? p["vaultCertificates"]
                                                  : p["vaultCertificates"].map((p: any) => {
                                                      return {
                                                        certificateUrl: p["certificateUrl"],
                                                        certificateStore: p["certificateStore"],
                                                      };
                                                    }),
                                            };
                                          }),
                                    allowExtensionOperations:
                                      p.virtualMachineProfileOverride?.osProfile?.[
                                        "allowExtensionOperations"
                                      ],
                                    requireGuestProvisionSignal:
                                      p.virtualMachineProfileOverride?.osProfile?.[
                                        "requireGuestProvisionSignal"
                                      ],
                                  },
                              storageProfile: !p.virtualMachineProfileOverride?.storageProfile
                                ? undefined
                                : {
                                    imageReference: !p.virtualMachineProfileOverride?.storageProfile
                                      ?.imageReference
                                      ? undefined
                                      : {
                                          id: p.virtualMachineProfileOverride?.storageProfile
                                            ?.imageReference?.["id"],
                                          publisher:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["publisher"],
                                          offer:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["offer"],
                                          sku: p.virtualMachineProfileOverride?.storageProfile
                                            ?.imageReference?.["sku"],
                                          version:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["version"],
                                          exactVersion:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["exactVersion"],
                                          sharedGalleryImageId:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["sharedGalleryImageId"],
                                          communityGalleryImageId:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.imageReference?.["communityGalleryImageId"],
                                        },
                                    osDisk: !p.virtualMachineProfileOverride?.storageProfile?.osDisk
                                      ? undefined
                                      : {
                                          name: p.virtualMachineProfileOverride?.storageProfile
                                            ?.osDisk?.["name"],
                                          caching:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["caching"],
                                          writeAcceleratorEnabled:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["writeAcceleratorEnabled"],
                                          createOption:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["createOption"],
                                          diffDiskSettings: !p.virtualMachineProfileOverride
                                            ?.storageProfile?.osDisk?.diffDiskSettings
                                            ? undefined
                                            : {
                                                option:
                                                  p.virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.diffDiskSettings?.["option"],
                                                placement:
                                                  p.virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.diffDiskSettings?.["placement"],
                                              },
                                          diskSizeGB:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["diskSizeGB"],
                                          osType:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["osType"],
                                          image: !p.virtualMachineProfileOverride?.storageProfile
                                            ?.osDisk?.image
                                            ? undefined
                                            : {
                                                uri: p.virtualMachineProfileOverride?.storageProfile
                                                  ?.osDisk?.image?.["uri"],
                                              },
                                          vhdContainers:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["vhdContainers"],
                                          managedDisk: !p.virtualMachineProfileOverride
                                            ?.storageProfile?.osDisk?.managedDisk
                                            ? undefined
                                            : {
                                                storageAccountType:
                                                  p.virtualMachineProfileOverride?.storageProfile
                                                    ?.osDisk?.managedDisk?.["storageAccountType"],
                                                diskEncryptionSet: !p.virtualMachineProfileOverride
                                                  ?.storageProfile?.osDisk?.managedDisk
                                                  ?.diskEncryptionSet
                                                  ? undefined
                                                  : {
                                                      id: p.virtualMachineProfileOverride
                                                        ?.storageProfile?.osDisk?.managedDisk
                                                        ?.diskEncryptionSet?.["id"],
                                                    },
                                                securityProfile: !p.virtualMachineProfileOverride
                                                  ?.storageProfile?.osDisk?.managedDisk
                                                  ?.securityProfile
                                                  ? undefined
                                                  : {
                                                      securityEncryptionType:
                                                        p.virtualMachineProfileOverride
                                                          ?.storageProfile?.osDisk?.managedDisk
                                                          ?.securityProfile?.[
                                                          "securityEncryptionType"
                                                        ],
                                                      diskEncryptionSet: !p
                                                        .virtualMachineProfileOverride
                                                        ?.storageProfile?.osDisk?.managedDisk
                                                        ?.securityProfile?.diskEncryptionSet
                                                        ? undefined
                                                        : {
                                                            id: p.virtualMachineProfileOverride
                                                              ?.storageProfile?.osDisk?.managedDisk
                                                              ?.securityProfile
                                                              ?.diskEncryptionSet?.["id"],
                                                          },
                                                    },
                                              },
                                          deleteOption:
                                            p.virtualMachineProfileOverride?.storageProfile
                                              ?.osDisk?.["deleteOption"],
                                        },
                                    dataDisks:
                                      p.virtualMachineProfileOverride?.storageProfile?.[
                                        "dataDisks"
                                      ] === undefined
                                        ? p.virtualMachineProfileOverride?.storageProfile?.[
                                            "dataDisks"
                                          ]
                                        : p.virtualMachineProfileOverride?.storageProfile?.[
                                            "dataDisks"
                                          ].map((p: any) => {
                                            return {
                                              name: p["name"],
                                              lun: p["lun"],
                                              caching: p["caching"],
                                              writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                                              createOption: p["createOption"],
                                              diskSizeGB: p["diskSizeGB"],
                                              managedDisk: !p.managedDisk
                                                ? undefined
                                                : {
                                                    storageAccountType:
                                                      p.managedDisk?.["storageAccountType"],
                                                    diskEncryptionSet: !p.managedDisk
                                                      ?.diskEncryptionSet
                                                      ? undefined
                                                      : {
                                                          id: p.managedDisk?.diskEncryptionSet?.[
                                                            "id"
                                                          ],
                                                        },
                                                    securityProfile: !p.managedDisk?.securityProfile
                                                      ? undefined
                                                      : {
                                                          securityEncryptionType:
                                                            p.managedDisk?.securityProfile?.[
                                                              "securityEncryptionType"
                                                            ],
                                                          diskEncryptionSet: !p.managedDisk
                                                            ?.securityProfile?.diskEncryptionSet
                                                            ? undefined
                                                            : {
                                                                id: p.managedDisk?.securityProfile
                                                                  ?.diskEncryptionSet?.["id"],
                                                              },
                                                        },
                                                  },
                                              diskIOPSReadWrite: p["diskIOPSReadWrite"],
                                              diskMBpsReadWrite: p["diskMBpsReadWrite"],
                                              deleteOption: p["deleteOption"],
                                            };
                                          }),
                                    diskControllerType:
                                      p.virtualMachineProfileOverride?.storageProfile?.[
                                        "diskControllerType"
                                      ],
                                  },
                              networkProfile: !p.virtualMachineProfileOverride?.networkProfile
                                ? undefined
                                : {
                                    healthProbe: !p.virtualMachineProfileOverride?.networkProfile
                                      ?.healthProbe
                                      ? undefined
                                      : {
                                          id: p.virtualMachineProfileOverride?.networkProfile
                                            ?.healthProbe?.["id"],
                                        },
                                    networkInterfaceConfigurations:
                                      p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkInterfaceConfigurations"
                                      ] === undefined
                                        ? p.virtualMachineProfileOverride?.networkProfile?.[
                                            "networkInterfaceConfigurations"
                                          ]
                                        : p.virtualMachineProfileOverride?.networkProfile?.[
                                            "networkInterfaceConfigurations"
                                          ].map((p: any) => {
                                            return {
                                              name: p["name"],
                                              properties: !p.properties
                                                ? undefined
                                                : {
                                                    primary: p.properties?.["primary"],
                                                    enableAcceleratedNetworking:
                                                      p.properties?.["enableAcceleratedNetworking"],
                                                    disableTcpStateTracking:
                                                      p.properties?.["disableTcpStateTracking"],
                                                    enableFpga: p.properties?.["enableFpga"],
                                                    networkSecurityGroup: !p.properties
                                                      ?.networkSecurityGroup
                                                      ? undefined
                                                      : {
                                                          id: p.properties?.networkSecurityGroup?.[
                                                            "id"
                                                          ],
                                                        },
                                                    dnsSettings: !p.properties?.dnsSettings
                                                      ? undefined
                                                      : {
                                                          dnsServers:
                                                            p.properties?.dnsSettings?.[
                                                              "dnsServers"
                                                            ],
                                                        },
                                                    ipConfigurations: p.properties?.[
                                                      "ipConfigurations"
                                                    ].map((p: any) => {
                                                      return {
                                                        name: p["name"],
                                                        properties: !p.properties
                                                          ? undefined
                                                          : {
                                                              subnet: !p.properties?.subnet
                                                                ? undefined
                                                                : {
                                                                    id: p.properties?.subnet?.[
                                                                      "id"
                                                                    ],
                                                                  },
                                                              primary: p.properties?.["primary"],
                                                              publicIPAddressConfiguration: !p
                                                                .properties
                                                                ?.publicIPAddressConfiguration
                                                                ? undefined
                                                                : {
                                                                    name: p.properties
                                                                      ?.publicIPAddressConfiguration?.[
                                                                      "name"
                                                                    ],
                                                                    properties: !p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.properties
                                                                      ? undefined
                                                                      : {
                                                                          idleTimeoutInMinutes:
                                                                            p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "idleTimeoutInMinutes"
                                                                            ],
                                                                          dnsSettings: !p.properties
                                                                            ?.publicIPAddressConfiguration
                                                                            ?.properties
                                                                            ?.dnsSettings
                                                                            ? undefined
                                                                            : {
                                                                                domainNameLabel:
                                                                                  p.properties
                                                                                    ?.publicIPAddressConfiguration
                                                                                    ?.properties
                                                                                    ?.dnsSettings?.[
                                                                                    "domainNameLabel"
                                                                                  ],
                                                                                domainNameLabelScope:
                                                                                  p.properties
                                                                                    ?.publicIPAddressConfiguration
                                                                                    ?.properties
                                                                                    ?.dnsSettings?.[
                                                                                    "domainNameLabelScope"
                                                                                  ],
                                                                              },
                                                                          ipTags:
                                                                            p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "ipTags"
                                                                            ] === undefined
                                                                              ? p.properties
                                                                                  ?.publicIPAddressConfiguration
                                                                                  ?.properties?.[
                                                                                  "ipTags"
                                                                                ]
                                                                              : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                                  "ipTags"
                                                                                ].map((p: any) => {
                                                                                  return {
                                                                                    ipTagType:
                                                                                      p[
                                                                                        "ipTagType"
                                                                                      ],
                                                                                    tag: p["tag"],
                                                                                  };
                                                                                }),
                                                                          publicIPPrefix: !p
                                                                            .properties
                                                                            ?.publicIPAddressConfiguration
                                                                            ?.properties
                                                                            ?.publicIPPrefix
                                                                            ? undefined
                                                                            : {
                                                                                id: p.properties
                                                                                  ?.publicIPAddressConfiguration
                                                                                  ?.properties
                                                                                  ?.publicIPPrefix?.[
                                                                                  "id"
                                                                                ],
                                                                              },
                                                                          publicIPAddressVersion:
                                                                            p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "publicIPAddressVersion"
                                                                            ],
                                                                          deleteOption:
                                                                            p.properties
                                                                              ?.publicIPAddressConfiguration
                                                                              ?.properties?.[
                                                                              "deleteOption"
                                                                            ],
                                                                        },
                                                                    sku: !p.properties
                                                                      ?.publicIPAddressConfiguration
                                                                      ?.sku
                                                                      ? undefined
                                                                      : {
                                                                          name: p.properties
                                                                            ?.publicIPAddressConfiguration
                                                                            ?.sku?.["name"],
                                                                          tier: p.properties
                                                                            ?.publicIPAddressConfiguration
                                                                            ?.sku?.["tier"],
                                                                        },
                                                                  },
                                                              privateIPAddressVersion:
                                                                p.properties?.[
                                                                  "privateIPAddressVersion"
                                                                ],
                                                              applicationGatewayBackendAddressPools:
                                                                p.properties?.[
                                                                  "applicationGatewayBackendAddressPools"
                                                                ] === undefined
                                                                  ? p.properties?.[
                                                                      "applicationGatewayBackendAddressPools"
                                                                    ]
                                                                  : p.properties?.[
                                                                      "applicationGatewayBackendAddressPools"
                                                                    ].map((p: any) => {
                                                                      return {
                                                                        id: p["id"],
                                                                      };
                                                                    }),
                                                              applicationSecurityGroups:
                                                                p.properties?.[
                                                                  "applicationSecurityGroups"
                                                                ] === undefined
                                                                  ? p.properties?.[
                                                                      "applicationSecurityGroups"
                                                                    ]
                                                                  : p.properties?.[
                                                                      "applicationSecurityGroups"
                                                                    ].map((p: any) => {
                                                                      return {
                                                                        id: p["id"],
                                                                      };
                                                                    }),
                                                              loadBalancerBackendAddressPools:
                                                                p.properties?.[
                                                                  "loadBalancerBackendAddressPools"
                                                                ] === undefined
                                                                  ? p.properties?.[
                                                                      "loadBalancerBackendAddressPools"
                                                                    ]
                                                                  : p.properties?.[
                                                                      "loadBalancerBackendAddressPools"
                                                                    ].map((p: any) => {
                                                                      return {
                                                                        id: p["id"],
                                                                      };
                                                                    }),
                                                              loadBalancerInboundNatPools:
                                                                p.properties?.[
                                                                  "loadBalancerInboundNatPools"
                                                                ] === undefined
                                                                  ? p.properties?.[
                                                                      "loadBalancerInboundNatPools"
                                                                    ]
                                                                  : p.properties?.[
                                                                      "loadBalancerInboundNatPools"
                                                                    ].map((p: any) => {
                                                                      return {
                                                                        id: p["id"],
                                                                      };
                                                                    }),
                                                            },
                                                      };
                                                    }),
                                                    enableIPForwarding:
                                                      p.properties?.["enableIPForwarding"],
                                                    deleteOption: p.properties?.["deleteOption"],
                                                    auxiliaryMode: p.properties?.["auxiliaryMode"],
                                                    auxiliarySku: p.properties?.["auxiliarySku"],
                                                  },
                                            };
                                          }),
                                    networkApiVersion:
                                      p.virtualMachineProfileOverride?.networkProfile?.[
                                        "networkApiVersion"
                                      ],
                                  },
                              securityProfile: !p.virtualMachineProfileOverride?.securityProfile
                                ? undefined
                                : {
                                    uefiSettings: !p.virtualMachineProfileOverride?.securityProfile
                                      ?.uefiSettings
                                      ? undefined
                                      : {
                                          secureBootEnabled:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.uefiSettings?.["secureBootEnabled"],
                                          vTpmEnabled:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.uefiSettings?.["vTpmEnabled"],
                                        },
                                    encryptionAtHost:
                                      p.virtualMachineProfileOverride?.securityProfile?.[
                                        "encryptionAtHost"
                                      ],
                                    securityType:
                                      p.virtualMachineProfileOverride?.securityProfile?.[
                                        "securityType"
                                      ],
                                    encryptionIdentity: !p.virtualMachineProfileOverride
                                      ?.securityProfile?.encryptionIdentity
                                      ? undefined
                                      : {
                                          userAssignedIdentityResourceId:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.encryptionIdentity?.[
                                              "userAssignedIdentityResourceId"
                                            ],
                                        },
                                    proxyAgentSettings: !p.virtualMachineProfileOverride
                                      ?.securityProfile?.proxyAgentSettings
                                      ? undefined
                                      : {
                                          enabled:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.proxyAgentSettings?.["enabled"],
                                          mode: p.virtualMachineProfileOverride?.securityProfile
                                            ?.proxyAgentSettings?.["mode"],
                                          keyIncarnationId:
                                            p.virtualMachineProfileOverride?.securityProfile
                                              ?.proxyAgentSettings?.["keyIncarnationId"],
                                        },
                                  },
                              diagnosticsProfile: !p.virtualMachineProfileOverride
                                ?.diagnosticsProfile
                                ? undefined
                                : {
                                    bootDiagnostics: !p.virtualMachineProfileOverride
                                      ?.diagnosticsProfile?.bootDiagnostics
                                      ? undefined
                                      : {
                                          enabled:
                                            p.virtualMachineProfileOverride?.diagnosticsProfile
                                              ?.bootDiagnostics?.["enabled"],
                                          storageUri:
                                            p.virtualMachineProfileOverride?.diagnosticsProfile
                                              ?.bootDiagnostics?.["storageUri"],
                                        },
                                  },
                              extensionProfile: !p.virtualMachineProfileOverride?.extensionProfile
                                ? undefined
                                : {
                                    extensions:
                                      p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensions"
                                      ] === undefined
                                        ? p.virtualMachineProfileOverride?.extensionProfile?.[
                                            "extensions"
                                          ]
                                        : p.virtualMachineProfileOverride?.extensionProfile?.[
                                            "extensions"
                                          ].map((p: any) => {
                                            return {
                                              id: p["id"],
                                              name: p["name"],
                                              type: p["type"],
                                              properties: !p.properties
                                                ? undefined
                                                : {
                                                    forceUpdateTag:
                                                      p.properties?.["forceUpdateTag"],
                                                    publisher: p.properties?.["publisher"],
                                                    type: p.properties?.["type"],
                                                    typeHandlerVersion:
                                                      p.properties?.["typeHandlerVersion"],
                                                    autoUpgradeMinorVersion:
                                                      p.properties?.["autoUpgradeMinorVersion"],
                                                    enableAutomaticUpgrade:
                                                      p.properties?.["enableAutomaticUpgrade"],
                                                    settings: p.properties?.["settings"],
                                                    protectedSettings:
                                                      p.properties?.["protectedSettings"],
                                                    provisioningState:
                                                      p.properties?.["provisioningState"],
                                                    provisionAfterExtensions:
                                                      p.properties?.["provisionAfterExtensions"],
                                                    suppressFailures:
                                                      p.properties?.["suppressFailures"],
                                                    protectedSettingsFromKeyVault: !p.properties
                                                      ?.protectedSettingsFromKeyVault
                                                      ? undefined
                                                      : {
                                                          secretUrl:
                                                            p.properties
                                                              ?.protectedSettingsFromKeyVault?.[
                                                              "secretUrl"
                                                            ],
                                                          sourceVault: {
                                                            id: p.properties
                                                              ?.protectedSettingsFromKeyVault
                                                              ?.sourceVault["id"],
                                                          },
                                                        },
                                                  },
                                            };
                                          }),
                                    extensionsTimeBudget:
                                      p.virtualMachineProfileOverride?.extensionProfile?.[
                                        "extensionsTimeBudget"
                                      ],
                                  },
                              licenseType: p.virtualMachineProfileOverride?.["licenseType"],
                              scheduledEventsProfile: !p.virtualMachineProfileOverride
                                ?.scheduledEventsProfile
                                ? undefined
                                : {
                                    terminateNotificationProfile: !p.virtualMachineProfileOverride
                                      ?.scheduledEventsProfile?.terminateNotificationProfile
                                      ? undefined
                                      : {
                                          notBeforeTimeout:
                                            p.virtualMachineProfileOverride?.scheduledEventsProfile
                                              ?.terminateNotificationProfile?.["notBeforeTimeout"],
                                          enable:
                                            p.virtualMachineProfileOverride?.scheduledEventsProfile
                                              ?.terminateNotificationProfile?.["enable"],
                                        },
                                    osImageNotificationProfile: !p.virtualMachineProfileOverride
                                      ?.scheduledEventsProfile?.osImageNotificationProfile
                                      ? undefined
                                      : {
                                          notBeforeTimeout:
                                            p.virtualMachineProfileOverride?.scheduledEventsProfile
                                              ?.osImageNotificationProfile?.["notBeforeTimeout"],
                                          enable:
                                            p.virtualMachineProfileOverride?.scheduledEventsProfile
                                              ?.osImageNotificationProfile?.["enable"],
                                        },
                                  },
                              userData: p.virtualMachineProfileOverride?.["userData"],
                              capacityReservation: !p.virtualMachineProfileOverride
                                ?.capacityReservation
                                ? undefined
                                : {
                                    capacityReservationGroup: !p.virtualMachineProfileOverride
                                      ?.capacityReservation?.capacityReservationGroup
                                      ? undefined
                                      : {
                                          id: p.virtualMachineProfileOverride?.capacityReservation
                                            ?.capacityReservationGroup?.["id"],
                                        },
                                  },
                              applicationProfile: !p.virtualMachineProfileOverride
                                ?.applicationProfile
                                ? undefined
                                : {
                                    galleryApplications:
                                      p.virtualMachineProfileOverride?.applicationProfile?.[
                                        "galleryApplications"
                                      ] === undefined
                                        ? p.virtualMachineProfileOverride?.applicationProfile?.[
                                            "galleryApplications"
                                          ]
                                        : p.virtualMachineProfileOverride?.applicationProfile?.[
                                            "galleryApplications"
                                          ].map((p: any) => {
                                            return {
                                              tags: p["tags"],
                                              order: p["order"],
                                              packageReferenceId: p["packageReferenceId"],
                                              configurationReference: p["configurationReference"],
                                              treatFailureAsDeploymentFailure:
                                                p["treatFailureAsDeploymentFailure"],
                                              enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                                            };
                                          }),
                                  },
                              hardwareProfile: !p.virtualMachineProfileOverride?.hardwareProfile
                                ? undefined
                                : {
                                    vmSizeProperties: !p.virtualMachineProfileOverride
                                      ?.hardwareProfile?.vmSizeProperties
                                      ? undefined
                                      : {
                                          vCPUsAvailable:
                                            p.virtualMachineProfileOverride?.hardwareProfile
                                              ?.vmSizeProperties?.["vCPUsAvailable"],
                                          vCPUsPerCore:
                                            p.virtualMachineProfileOverride?.hardwareProfile
                                              ?.vmSizeProperties?.["vCPUsPerCore"],
                                        },
                                  },
                              serviceArtifactReference: !p.virtualMachineProfileOverride
                                ?.serviceArtifactReference
                                ? undefined
                                : {
                                    id: p.virtualMachineProfileOverride?.serviceArtifactReference?.[
                                      "id"
                                    ],
                                  },
                              securityPostureReference: !p.virtualMachineProfileOverride
                                ?.securityPostureReference
                                ? undefined
                                : {
                                    id: p.virtualMachineProfileOverride?.securityPostureReference?.[
                                      "id"
                                    ],
                                    excludeExtensions:
                                      p.virtualMachineProfileOverride?.securityPostureReference?.[
                                        "excludeExtensions"
                                      ],
                                    isOverridable:
                                      p.virtualMachineProfileOverride?.securityPostureReference?.[
                                        "isOverridable"
                                      ],
                                  },
                              timeCreated:
                                p.virtualMachineProfileOverride?.["timeCreated"] !== undefined
                                  ? new Date(p.virtualMachineProfileOverride?.["timeCreated"])
                                  : undefined,
                            },
                      };
                    }),
                  },
              computeProfile: {
                baseVirtualMachineProfile: {
                  osProfile: !p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                    ? undefined
                    : {
                        computerNamePrefix:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "computerNamePrefix"
                          ],
                        adminUsername:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "adminUsername"
                          ],
                        adminPassword:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "adminPassword"
                          ],
                        customData:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "customData"
                          ],
                        windowsConfiguration: !p.properties?.computeProfile
                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                          ? undefined
                          : {
                              provisionVMAgent:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["provisionVMAgent"],
                              enableAutomaticUpdates:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["enableAutomaticUpdates"],
                              timeZone:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["timeZone"],
                              additionalUnattendContent:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["additionalUnattendContent"] ===
                                undefined
                                  ? p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                      ?.windowsConfiguration?.["additionalUnattendContent"]
                                  : p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.[
                                      "additionalUnattendContent"
                                    ].map((p: any) => {
                                      return {
                                        passName: p["passName"],
                                        componentName: p["componentName"],
                                        settingName: p["settingName"],
                                        content: p["content"],
                                      };
                                    }),
                              patchSettings: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .osProfile?.windowsConfiguration?.patchSettings
                                ? undefined
                                : {
                                    patchMode:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.patchSettings?.[
                                        "patchMode"
                                      ],
                                    enableHotpatching:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.patchSettings?.[
                                        "enableHotpatching"
                                      ],
                                    assessmentMode:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.patchSettings?.[
                                        "assessmentMode"
                                      ],
                                    automaticByPlatformSettings: !p.properties?.computeProfile
                                      .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                      ?.patchSettings?.automaticByPlatformSettings
                                      ? undefined
                                      : {
                                          rebootSetting:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .osProfile?.windowsConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings?.["rebootSetting"],
                                          bypassPlatformSafetyChecksOnUserSchedule:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .osProfile?.windowsConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings?.[
                                              "bypassPlatformSafetyChecksOnUserSchedule"
                                            ],
                                        },
                                  },
                              winRM: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .osProfile?.windowsConfiguration?.winRM
                                ? undefined
                                : {
                                    listeners:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.winRM?.["listeners"] ===
                                      undefined
                                        ? p.properties?.computeProfile.baseVirtualMachineProfile
                                            .osProfile?.windowsConfiguration?.winRM?.["listeners"]
                                        : p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.winRM?.[
                                            "listeners"
                                          ].map((p: any) => {
                                            return {
                                              protocol: p["protocol"],
                                              certificateUrl: p["certificateUrl"],
                                            };
                                          }),
                                  },
                              enableVMAgentPlatformUpdates:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                            },
                        linuxConfiguration: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .osProfile?.linuxConfiguration
                          ? undefined
                          : {
                              disablePasswordAuthentication:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.linuxConfiguration?.["disablePasswordAuthentication"],
                              ssh: !p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                ?.linuxConfiguration?.ssh
                                ? undefined
                                : {
                                    publicKeys:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                      undefined
                                        ? p.properties?.computeProfile.baseVirtualMachineProfile
                                            .osProfile?.linuxConfiguration?.ssh?.["publicKeys"]
                                        : p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.linuxConfiguration?.ssh?.[
                                            "publicKeys"
                                          ].map((p: any) => {
                                            return {
                                              path: p["path"],
                                              keyData: p["keyData"],
                                            };
                                          }),
                                  },
                              provisionVMAgent:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.linuxConfiguration?.["provisionVMAgent"],
                              patchSettings: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .osProfile?.linuxConfiguration?.patchSettings
                                ? undefined
                                : {
                                    patchMode:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.linuxConfiguration?.patchSettings?.[
                                        "patchMode"
                                      ],
                                    assessmentMode:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.linuxConfiguration?.patchSettings?.[
                                        "assessmentMode"
                                      ],
                                    automaticByPlatformSettings: !p.properties?.computeProfile
                                      .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                      ?.patchSettings?.automaticByPlatformSettings
                                      ? undefined
                                      : {
                                          rebootSetting:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .osProfile?.linuxConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings?.["rebootSetting"],
                                          bypassPlatformSafetyChecksOnUserSchedule:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .osProfile?.linuxConfiguration?.patchSettings
                                              ?.automaticByPlatformSettings?.[
                                              "bypassPlatformSafetyChecksOnUserSchedule"
                                            ],
                                        },
                                  },
                              enableVMAgentPlatformUpdates:
                                p.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                                  ?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                            },
                        secrets:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                                "secrets"
                              ]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                                "secrets"
                              ].map((p: any) => {
                                return {
                                  sourceVault: !p.sourceVault
                                    ? undefined
                                    : { id: p.sourceVault?.["id"] },
                                  vaultCertificates:
                                    p["vaultCertificates"] === undefined
                                      ? p["vaultCertificates"]
                                      : p["vaultCertificates"].map((p: any) => {
                                          return {
                                            certificateUrl: p["certificateUrl"],
                                            certificateStore: p["certificateStore"],
                                          };
                                        }),
                                };
                              }),
                        allowExtensionOperations:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "allowExtensionOperations"
                          ],
                        requireGuestProvisionSignal:
                          p.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "requireGuestProvisionSignal"
                          ],
                      },
                  storageProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .storageProfile
                    ? undefined
                    : {
                        imageReference: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .storageProfile?.imageReference
                          ? undefined
                          : {
                              id: p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.imageReference?.["id"],
                              publisher:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["publisher"],
                              offer:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["offer"],
                              sku: p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.imageReference?.["sku"],
                              version:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["version"],
                              exactVersion:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["exactVersion"],
                              sharedGalleryImageId:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["sharedGalleryImageId"],
                              communityGalleryImageId:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.imageReference?.["communityGalleryImageId"],
                            },
                        osDisk: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .storageProfile?.osDisk
                          ? undefined
                          : {
                              name: p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.osDisk?.["name"],
                              caching:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["caching"],
                              writeAcceleratorEnabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["writeAcceleratorEnabled"],
                              createOption:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["createOption"],
                              diffDiskSettings: !p.properties?.computeProfile
                                .baseVirtualMachineProfile.storageProfile?.osDisk?.diffDiskSettings
                                ? undefined
                                : {
                                    option:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .storageProfile?.osDisk?.diffDiskSettings?.["option"],
                                    placement:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .storageProfile?.osDisk?.diffDiskSettings?.["placement"],
                                  },
                              diskSizeGB:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["diskSizeGB"],
                              osType:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["osType"],
                              image: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.osDisk?.image
                                ? undefined
                                : {
                                    uri: p.properties?.computeProfile.baseVirtualMachineProfile
                                      .storageProfile?.osDisk?.image?.["uri"],
                                  },
                              vhdContainers:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["vhdContainers"],
                              managedDisk: !p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.osDisk?.managedDisk
                                ? undefined
                                : {
                                    storageAccountType:
                                      p.properties?.computeProfile.baseVirtualMachineProfile
                                        .storageProfile?.osDisk?.managedDisk?.[
                                        "storageAccountType"
                                      ],
                                    diskEncryptionSet: !p.properties?.computeProfile
                                      .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                      ?.diskEncryptionSet
                                      ? undefined
                                      : {
                                          id: p.properties?.computeProfile.baseVirtualMachineProfile
                                            .storageProfile?.osDisk?.managedDisk
                                            ?.diskEncryptionSet?.["id"],
                                        },
                                    securityProfile: !p.properties?.computeProfile
                                      .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                      ?.securityProfile
                                      ? undefined
                                      : {
                                          securityEncryptionType:
                                            p.properties?.computeProfile.baseVirtualMachineProfile
                                              .storageProfile?.osDisk?.managedDisk
                                              ?.securityProfile?.["securityEncryptionType"],
                                          diskEncryptionSet: !p.properties?.computeProfile
                                            .baseVirtualMachineProfile.storageProfile?.osDisk
                                            ?.managedDisk?.securityProfile?.diskEncryptionSet
                                            ? undefined
                                            : {
                                                id: p.properties?.computeProfile
                                                  .baseVirtualMachineProfile.storageProfile?.osDisk
                                                  ?.managedDisk?.securityProfile
                                                  ?.diskEncryptionSet?.["id"],
                                              },
                                        },
                                  },
                              deleteOption:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.["deleteOption"],
                            },
                        dataDisks:
                          p.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "dataDisks"
                          ] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile
                                .storageProfile?.["dataDisks"]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                                "dataDisks"
                              ].map((p: any) => {
                                return {
                                  name: p["name"],
                                  lun: p["lun"],
                                  caching: p["caching"],
                                  writeAcceleratorEnabled: p["writeAcceleratorEnabled"],
                                  createOption: p["createOption"],
                                  diskSizeGB: p["diskSizeGB"],
                                  managedDisk: !p.managedDisk
                                    ? undefined
                                    : {
                                        storageAccountType: p.managedDisk?.["storageAccountType"],
                                        diskEncryptionSet: !p.managedDisk?.diskEncryptionSet
                                          ? undefined
                                          : {
                                              id: p.managedDisk?.diskEncryptionSet?.["id"],
                                            },
                                        securityProfile: !p.managedDisk?.securityProfile
                                          ? undefined
                                          : {
                                              securityEncryptionType:
                                                p.managedDisk?.securityProfile?.[
                                                  "securityEncryptionType"
                                                ],
                                              diskEncryptionSet: !p.managedDisk?.securityProfile
                                                ?.diskEncryptionSet
                                                ? undefined
                                                : {
                                                    id: p.managedDisk?.securityProfile
                                                      ?.diskEncryptionSet?.["id"],
                                                  },
                                            },
                                      },
                                  diskIOPSReadWrite: p["diskIOPSReadWrite"],
                                  diskMBpsReadWrite: p["diskMBpsReadWrite"],
                                  deleteOption: p["deleteOption"],
                                };
                              }),
                        diskControllerType:
                          p.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "diskControllerType"
                          ],
                      },
                  networkProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .networkProfile
                    ? undefined
                    : {
                        healthProbe: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .networkProfile?.healthProbe
                          ? undefined
                          : {
                              id: p.properties?.computeProfile.baseVirtualMachineProfile
                                .networkProfile?.healthProbe?.["id"],
                            },
                        networkInterfaceConfigurations:
                          p.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkInterfaceConfigurations"
                          ] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile
                                .networkProfile?.["networkInterfaceConfigurations"]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                                "networkInterfaceConfigurations"
                              ].map((p: any) => {
                                return {
                                  name: p["name"],
                                  properties: !p.properties
                                    ? undefined
                                    : {
                                        primary: p.properties?.["primary"],
                                        enableAcceleratedNetworking:
                                          p.properties?.["enableAcceleratedNetworking"],
                                        disableTcpStateTracking:
                                          p.properties?.["disableTcpStateTracking"],
                                        enableFpga: p.properties?.["enableFpga"],
                                        networkSecurityGroup: !p.properties?.networkSecurityGroup
                                          ? undefined
                                          : {
                                              id: p.properties?.networkSecurityGroup?.["id"],
                                            },
                                        dnsSettings: !p.properties?.dnsSettings
                                          ? undefined
                                          : {
                                              dnsServers: p.properties?.dnsSettings?.["dnsServers"],
                                            },
                                        ipConfigurations: p.properties?.["ipConfigurations"].map(
                                          (p: any) => {
                                            return {
                                              name: p["name"],
                                              properties: !p.properties
                                                ? undefined
                                                : {
                                                    subnet: !p.properties?.subnet
                                                      ? undefined
                                                      : {
                                                          id: p.properties?.subnet?.["id"],
                                                        },
                                                    primary: p.properties?.["primary"],
                                                    publicIPAddressConfiguration: !p.properties
                                                      ?.publicIPAddressConfiguration
                                                      ? undefined
                                                      : {
                                                          name: p.properties
                                                            ?.publicIPAddressConfiguration?.[
                                                            "name"
                                                          ],
                                                          properties: !p.properties
                                                            ?.publicIPAddressConfiguration
                                                            ?.properties
                                                            ? undefined
                                                            : {
                                                                idleTimeoutInMinutes:
                                                                  p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.[
                                                                    "idleTimeoutInMinutes"
                                                                  ],
                                                                dnsSettings: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.properties?.dnsSettings
                                                                  ? undefined
                                                                  : {
                                                                      domainNameLabel:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties
                                                                          ?.dnsSettings?.[
                                                                          "domainNameLabel"
                                                                        ],
                                                                      domainNameLabelScope:
                                                                        p.properties
                                                                          ?.publicIPAddressConfiguration
                                                                          ?.properties
                                                                          ?.dnsSettings?.[
                                                                          "domainNameLabelScope"
                                                                        ],
                                                                    },
                                                                ipTags:
                                                                  p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.["ipTags"] ===
                                                                  undefined
                                                                    ? p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties?.["ipTags"]
                                                                    : p.properties?.publicIPAddressConfiguration?.properties?.[
                                                                        "ipTags"
                                                                      ].map((p: any) => {
                                                                        return {
                                                                          ipTagType: p["ipTagType"],
                                                                          tag: p["tag"],
                                                                        };
                                                                      }),
                                                                publicIPPrefix: !p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.properties?.publicIPPrefix
                                                                  ? undefined
                                                                  : {
                                                                      id: p.properties
                                                                        ?.publicIPAddressConfiguration
                                                                        ?.properties
                                                                        ?.publicIPPrefix?.["id"],
                                                                    },
                                                                publicIPAddressVersion:
                                                                  p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.[
                                                                    "publicIPAddressVersion"
                                                                  ],
                                                                deleteOption:
                                                                  p.properties
                                                                    ?.publicIPAddressConfiguration
                                                                    ?.properties?.["deleteOption"],
                                                              },
                                                          sku: !p.properties
                                                            ?.publicIPAddressConfiguration?.sku
                                                            ? undefined
                                                            : {
                                                                name: p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.sku?.["name"],
                                                                tier: p.properties
                                                                  ?.publicIPAddressConfiguration
                                                                  ?.sku?.["tier"],
                                                              },
                                                        },
                                                    privateIPAddressVersion:
                                                      p.properties?.["privateIPAddressVersion"],
                                                    applicationGatewayBackendAddressPools:
                                                      p.properties?.[
                                                        "applicationGatewayBackendAddressPools"
                                                      ] === undefined
                                                        ? p.properties?.[
                                                            "applicationGatewayBackendAddressPools"
                                                          ]
                                                        : p.properties?.[
                                                            "applicationGatewayBackendAddressPools"
                                                          ].map((p: any) => {
                                                            return {
                                                              id: p["id"],
                                                            };
                                                          }),
                                                    applicationSecurityGroups:
                                                      p.properties?.[
                                                        "applicationSecurityGroups"
                                                      ] === undefined
                                                        ? p.properties?.[
                                                            "applicationSecurityGroups"
                                                          ]
                                                        : p.properties?.[
                                                            "applicationSecurityGroups"
                                                          ].map((p: any) => {
                                                            return {
                                                              id: p["id"],
                                                            };
                                                          }),
                                                    loadBalancerBackendAddressPools:
                                                      p.properties?.[
                                                        "loadBalancerBackendAddressPools"
                                                      ] === undefined
                                                        ? p.properties?.[
                                                            "loadBalancerBackendAddressPools"
                                                          ]
                                                        : p.properties?.[
                                                            "loadBalancerBackendAddressPools"
                                                          ].map((p: any) => {
                                                            return {
                                                              id: p["id"],
                                                            };
                                                          }),
                                                    loadBalancerInboundNatPools:
                                                      p.properties?.[
                                                        "loadBalancerInboundNatPools"
                                                      ] === undefined
                                                        ? p.properties?.[
                                                            "loadBalancerInboundNatPools"
                                                          ]
                                                        : p.properties?.[
                                                            "loadBalancerInboundNatPools"
                                                          ].map((p: any) => {
                                                            return {
                                                              id: p["id"],
                                                            };
                                                          }),
                                                  },
                                            };
                                          },
                                        ),
                                        enableIPForwarding: p.properties?.["enableIPForwarding"],
                                        deleteOption: p.properties?.["deleteOption"],
                                        auxiliaryMode: p.properties?.["auxiliaryMode"],
                                        auxiliarySku: p.properties?.["auxiliarySku"],
                                      },
                                };
                              }),
                        networkApiVersion:
                          p.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkApiVersion"
                          ],
                      },
                  securityProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .securityProfile
                    ? undefined
                    : {
                        uefiSettings: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .securityProfile?.uefiSettings
                          ? undefined
                          : {
                              secureBootEnabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.uefiSettings?.["secureBootEnabled"],
                              vTpmEnabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.uefiSettings?.["vTpmEnabled"],
                            },
                        encryptionAtHost:
                          p.properties?.computeProfile.baseVirtualMachineProfile.securityProfile?.[
                            "encryptionAtHost"
                          ],
                        securityType:
                          p.properties?.computeProfile.baseVirtualMachineProfile.securityProfile?.[
                            "securityType"
                          ],
                        encryptionIdentity: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .securityProfile?.encryptionIdentity
                          ? undefined
                          : {
                              userAssignedIdentityResourceId:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.encryptionIdentity?.[
                                  "userAssignedIdentityResourceId"
                                ],
                            },
                        proxyAgentSettings: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .securityProfile?.proxyAgentSettings
                          ? undefined
                          : {
                              enabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.proxyAgentSettings?.["enabled"],
                              mode: p.properties?.computeProfile.baseVirtualMachineProfile
                                .securityProfile?.proxyAgentSettings?.["mode"],
                              keyIncarnationId:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .securityProfile?.proxyAgentSettings?.["keyIncarnationId"],
                            },
                      },
                  diagnosticsProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .diagnosticsProfile
                    ? undefined
                    : {
                        bootDiagnostics: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .diagnosticsProfile?.bootDiagnostics
                          ? undefined
                          : {
                              enabled:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .diagnosticsProfile?.bootDiagnostics?.["enabled"],
                              storageUri:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .diagnosticsProfile?.bootDiagnostics?.["storageUri"],
                            },
                      },
                  extensionProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .extensionProfile
                    ? undefined
                    : {
                        extensions:
                          p.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensions"
                          ] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile
                                .extensionProfile?.["extensions"]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                                "extensions"
                              ].map((p: any) => {
                                return {
                                  id: p["id"],
                                  name: p["name"],
                                  type: p["type"],
                                  properties: !p.properties
                                    ? undefined
                                    : {
                                        forceUpdateTag: p.properties?.["forceUpdateTag"],
                                        publisher: p.properties?.["publisher"],
                                        type: p.properties?.["type"],
                                        typeHandlerVersion: p.properties?.["typeHandlerVersion"],
                                        autoUpgradeMinorVersion:
                                          p.properties?.["autoUpgradeMinorVersion"],
                                        enableAutomaticUpgrade:
                                          p.properties?.["enableAutomaticUpgrade"],
                                        settings: p.properties?.["settings"],
                                        protectedSettings: p.properties?.["protectedSettings"],
                                        provisioningState: p.properties?.["provisioningState"],
                                        provisionAfterExtensions:
                                          p.properties?.["provisionAfterExtensions"],
                                        suppressFailures: p.properties?.["suppressFailures"],
                                        protectedSettingsFromKeyVault: !p.properties
                                          ?.protectedSettingsFromKeyVault
                                          ? undefined
                                          : {
                                              secretUrl:
                                                p.properties?.protectedSettingsFromKeyVault?.[
                                                  "secretUrl"
                                                ],
                                              sourceVault: {
                                                id: p.properties?.protectedSettingsFromKeyVault
                                                  ?.sourceVault["id"],
                                              },
                                            },
                                      },
                                };
                              }),
                        extensionsTimeBudget:
                          p.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensionsTimeBudget"
                          ],
                      },
                  licenseType:
                    p.properties?.computeProfile.baseVirtualMachineProfile["licenseType"],
                  scheduledEventsProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .scheduledEventsProfile
                    ? undefined
                    : {
                        terminateNotificationProfile: !p.properties?.computeProfile
                          .baseVirtualMachineProfile.scheduledEventsProfile
                          ?.terminateNotificationProfile
                          ? undefined
                          : {
                              notBeforeTimeout:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .scheduledEventsProfile?.terminateNotificationProfile?.[
                                  "notBeforeTimeout"
                                ],
                              enable:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .scheduledEventsProfile?.terminateNotificationProfile?.["enable"],
                            },
                        osImageNotificationProfile: !p.properties?.computeProfile
                          .baseVirtualMachineProfile.scheduledEventsProfile
                          ?.osImageNotificationProfile
                          ? undefined
                          : {
                              notBeforeTimeout:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .scheduledEventsProfile?.osImageNotificationProfile?.[
                                  "notBeforeTimeout"
                                ],
                              enable:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .scheduledEventsProfile?.osImageNotificationProfile?.["enable"],
                            },
                      },
                  userData: p.properties?.computeProfile.baseVirtualMachineProfile["userData"],
                  capacityReservation: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .capacityReservation
                    ? undefined
                    : {
                        capacityReservationGroup: !p.properties?.computeProfile
                          .baseVirtualMachineProfile.capacityReservation?.capacityReservationGroup
                          ? undefined
                          : {
                              id: p.properties?.computeProfile.baseVirtualMachineProfile
                                .capacityReservation?.capacityReservationGroup?.["id"],
                            },
                      },
                  applicationProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .applicationProfile
                    ? undefined
                    : {
                        galleryApplications:
                          p.properties?.computeProfile.baseVirtualMachineProfile
                            .applicationProfile?.["galleryApplications"] === undefined
                            ? p.properties?.computeProfile.baseVirtualMachineProfile
                                .applicationProfile?.["galleryApplications"]
                            : p.properties?.computeProfile.baseVirtualMachineProfile.applicationProfile?.[
                                "galleryApplications"
                              ].map((p: any) => {
                                return {
                                  tags: p["tags"],
                                  order: p["order"],
                                  packageReferenceId: p["packageReferenceId"],
                                  configurationReference: p["configurationReference"],
                                  treatFailureAsDeploymentFailure:
                                    p["treatFailureAsDeploymentFailure"],
                                  enableAutomaticUpgrade: p["enableAutomaticUpgrade"],
                                };
                              }),
                      },
                  hardwareProfile: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .hardwareProfile
                    ? undefined
                    : {
                        vmSizeProperties: !p.properties?.computeProfile.baseVirtualMachineProfile
                          .hardwareProfile?.vmSizeProperties
                          ? undefined
                          : {
                              vCPUsAvailable:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .hardwareProfile?.vmSizeProperties?.["vCPUsAvailable"],
                              vCPUsPerCore:
                                p.properties?.computeProfile.baseVirtualMachineProfile
                                  .hardwareProfile?.vmSizeProperties?.["vCPUsPerCore"],
                            },
                      },
                  serviceArtifactReference: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .serviceArtifactReference
                    ? undefined
                    : {
                        id: p.properties?.computeProfile.baseVirtualMachineProfile
                          .serviceArtifactReference?.["id"],
                      },
                  securityPostureReference: !p.properties?.computeProfile.baseVirtualMachineProfile
                    .securityPostureReference
                    ? undefined
                    : {
                        id: p.properties?.computeProfile.baseVirtualMachineProfile
                          .securityPostureReference?.["id"],
                        excludeExtensions:
                          p.properties?.computeProfile.baseVirtualMachineProfile
                            .securityPostureReference?.["excludeExtensions"],
                        isOverridable:
                          p.properties?.computeProfile.baseVirtualMachineProfile
                            .securityPostureReference?.["isOverridable"],
                      },
                  timeCreated:
                    p.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"] !==
                    undefined
                      ? new Date(
                          p.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"],
                        )
                      : undefined,
                },
                computeApiVersion: p.properties?.computeProfile["computeApiVersion"],
                platformFaultDomainCount: p.properties?.computeProfile["platformFaultDomainCount"],
                additionalVirtualMachineCapabilities: !p.properties?.computeProfile
                  .additionalVirtualMachineCapabilities
                  ? undefined
                  : {
                      ultraSSDEnabled:
                        p.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                          "ultraSSDEnabled"
                        ],
                      hibernationEnabled:
                        p.properties?.computeProfile.additionalVirtualMachineCapabilities?.[
                          "hibernationEnabled"
                        ],
                    },
              },
              timeCreated:
                p.properties?.["timeCreated"] !== undefined
                  ? new Date(p.properties?.["timeCreated"])
                  : undefined,
              uniqueId: p.properties?.["uniqueId"],
            },
        zones: p["zones"],
        identity: !p.identity
          ? undefined
          : {
              principalId: p.identity?.["principalId"],
              tenantId: p.identity?.["tenantId"],
              type: p.identity?.["type"],
              userAssignedIdentities: p.identity?.["userAssignedIdentities"],
            },
        plan: !p.plan
          ? undefined
          : {
              name: p.plan?.["name"],
              publisher: p.plan?.["publisher"],
              product: p.plan?.["product"],
              promotionCode: p.plan?.["promotionCode"],
              version: p.plan?.["version"],
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List Fleet resources by subscription ID */
export function fleetsListBySubscription(
  context: Client,
  subscriptionId: string,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () => _fleetsListBySubscriptionSend(context, subscriptionId, options),
    _fleetsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _fleetsListVirtualMachineScaleSetsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  name: string,
  options: FleetsListVirtualMachineScaleSetsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{name}/virtualMachineScaleSets",
      subscriptionId,
      resourceGroupName,
      name,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _fleetsListVirtualMachineScaleSetsDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineScaleSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p: any) => {
      return {
        id: p["id"],
        type: p["type"],
        operationStatus: p["operationStatus"],
        error: !p.error
          ? undefined
          : {
              code: p.error?.["code"],
              target: p.error?.["target"],
              message: p.error?.["message"],
              details:
                p.error?.["details"] === undefined
                  ? p.error?.["details"]
                  : p.error?.["details"].map((p: any) => {
                      return {
                        code: p["code"],
                        target: p["target"],
                        message: p["message"],
                      };
                    }),
              innererror: !p.error?.innererror
                ? undefined
                : {
                    exceptionType: p.error?.innererror?.["exceptionType"],
                    errorDetail: p.error?.innererror?.["errorDetail"],
                  },
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** List VirtualMachineScaleSet resources by Fleet */
export function fleetsListVirtualMachineScaleSets(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  name: string,
  options: FleetsListVirtualMachineScaleSetsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualMachineScaleSet> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _fleetsListVirtualMachineScaleSetsSend(
        context,
        subscriptionId,
        resourceGroupName,
        name,
        options,
      ),
    _fleetsListVirtualMachineScaleSetsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
