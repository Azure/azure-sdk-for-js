// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getLongRunningPoller } from "../pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
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
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureFleetContext as Client,
  CreateOrUpdate200Response,
  CreateOrUpdate201Response,
  CreateOrUpdateDefaultResponse,
  CreateOrUpdateLogicalResponse,
  Delete202Response,
  Delete204Response,
  DeleteDefaultResponse,
  DeleteLogicalResponse,
  Get200Response,
  GetDefaultResponse,
  ListByResourceGroup200Response,
  ListByResourceGroupDefaultResponse,
  ListBySubscription200Response,
  ListBySubscriptionDefaultResponse,
  ListVirtualMachineScaleSets200Response,
  ListVirtualMachineScaleSetsDefaultResponse,
  Update200Response,
  Update202Response,
  UpdateDefaultResponse,
  UpdateLogicalResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import {
  FleetsGetOptionalParams,
  FleetsCreateOrUpdateOptionalParams,
  FleetsUpdateOptionalParams,
  FleetsDeleteOptionalParams,
  FleetsListByResourceGroupOptionalParams,
  FleetsListBySubscriptionOptionalParams,
  FleetsListVirtualMachineScaleSetsOptionalParams,
} from "../../models/options.js";

export function _getSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod<Get200Response | GetDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(result: Get200Response | GetDefaultResponse): Promise<Fleet> {
  if (isUnexpected(result)) {
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
          vmSizesProfile: result.body.properties?.["vmSizesProfile"].map((p) => {
            return { name: p["name"], rank: p["rank"] };
          }),
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
                                ].map((p) => {
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
                                      ].map((p) => {
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
                                      ].map((p) => {
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
                          ].map((p) => {
                            return {
                              sourceVault: !p.sourceVault
                                ? undefined
                                : { id: p.sourceVault?.["id"] },
                              vaultCertificates:
                                p["vaultCertificates"] === undefined
                                  ? p["vaultCertificates"]
                                  : p["vaultCertificates"].map((p) => {
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
                          ].map((p) => {
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
                          ].map((p) => {
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
                                      (p) => {
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
                                                                  ].map((p) => {
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
                                                      ].map((p) => {
                                                        return { id: p["id"] };
                                                      }),
                                                applicationSecurityGroups:
                                                  p.properties?.["applicationSecurityGroups"] ===
                                                  undefined
                                                    ? p.properties?.["applicationSecurityGroups"]
                                                    : p.properties?.[
                                                        "applicationSecurityGroups"
                                                      ].map((p) => {
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
                                                      ].map((p) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerInboundNatPools:
                                                  p.properties?.["loadBalancerInboundNatPools"] ===
                                                  undefined
                                                    ? p.properties?.["loadBalancerInboundNatPools"]
                                                    : p.properties?.[
                                                        "loadBalancerInboundNatPools"
                                                      ].map((p) => {
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
                          ].map((p) => {
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
                          ].map((p) => {
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
export async function get(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsGetOptionalParams = { requestOptions: {} },
): Promise<Fleet> {
  const result = await _getSend(context, subscriptionId, resourceGroupName, fleetName, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  | CreateOrUpdate200Response
  | CreateOrUpdate201Response
  | CreateOrUpdateDefaultResponse
  | CreateOrUpdateLogicalResponse
> {
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

export async function _createOrUpdateDeserialize(
  result:
    | CreateOrUpdate200Response
    | CreateOrUpdate201Response
    | CreateOrUpdateDefaultResponse
    | CreateOrUpdateLogicalResponse,
): Promise<Fleet> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  const res = result as unknown as CreateOrUpdateLogicalResponse;
  return {
    tags: res.body["tags"],
    location: res.body["location"],
    id: res.body["id"],
    name: res.body["name"],
    type: res.body["type"],
    systemData: !res.body.systemData
      ? undefined
      : {
          createdBy: res.body.systemData?.["createdBy"],
          createdByType: res.body.systemData?.["createdByType"],
          createdAt:
            res.body.systemData?.["createdAt"] !== undefined
              ? new Date(res.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: res.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: res.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            res.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(res.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !res.body.properties
      ? undefined
      : {
          provisioningState: res.body.properties?.["provisioningState"],
          spotPriorityProfile: !res.body.properties?.spotPriorityProfile
            ? undefined
            : {
                capacity: res.body.properties?.spotPriorityProfile?.["capacity"],
                minCapacity: res.body.properties?.spotPriorityProfile?.["minCapacity"],
                maxPricePerVM: res.body.properties?.spotPriorityProfile?.["maxPricePerVM"],
                evictionPolicy: res.body.properties?.spotPriorityProfile?.["evictionPolicy"],
                allocationStrategy:
                  res.body.properties?.spotPriorityProfile?.["allocationStrategy"],
                maintain: res.body.properties?.spotPriorityProfile?.["maintain"],
              },
          regularPriorityProfile: !res.body.properties?.regularPriorityProfile
            ? undefined
            : {
                capacity: res.body.properties?.regularPriorityProfile?.["capacity"],
                minCapacity: res.body.properties?.regularPriorityProfile?.["minCapacity"],
                allocationStrategy:
                  res.body.properties?.regularPriorityProfile?.["allocationStrategy"],
              },
          vmSizesProfile: res.body.properties?.["vmSizesProfile"].map((p) => {
            return { name: p["name"], rank: p["rank"] };
          }),
          computeProfile: {
            baseVirtualMachineProfile: {
              osProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                ? undefined
                : {
                    computerNamePrefix:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "computerNamePrefix"
                      ],
                    adminUsername:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminUsername"
                      ],
                    adminPassword:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminPassword"
                      ],
                    customData:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "customData"
                      ],
                    windowsConfiguration: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                      ? undefined
                      : {
                          provisionVMAgent:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["provisionVMAgent"],
                          enableAutomaticUpdates:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["enableAutomaticUpdates"],
                          timeZone:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["timeZone"],
                          additionalUnattendContent:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["additionalUnattendContent"] === undefined
                              ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                                  .osProfile?.windowsConfiguration?.["additionalUnattendContent"]
                              : res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.[
                                  "additionalUnattendContent"
                                ].map((p) => {
                                  return {
                                    passName: p["passName"],
                                    componentName: p["componentName"],
                                    settingName: p["settingName"],
                                    content: p["content"],
                                  };
                                }),
                          patchSettings: !res.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                            ?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.["patchMode"],
                                enableHotpatching:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "enableHotpatching"
                                  ],
                                assessmentMode:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !res.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          winRM: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.windowsConfiguration?.winRM
                            ? undefined
                            : {
                                listeners:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.winRM?.["listeners"] ===
                                  undefined
                                    ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.winRM?.["listeners"]
                                    : res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.winRM?.[
                                        "listeners"
                                      ].map((p) => {
                                        return {
                                          protocol: p["protocol"],
                                          certificateUrl: p["certificateUrl"],
                                        };
                                      }),
                              },
                          enableVMAgentPlatformUpdates:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    linuxConfiguration: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                      ? undefined
                      : {
                          disablePasswordAuthentication:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.linuxConfiguration?.["disablePasswordAuthentication"],
                          ssh: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.linuxConfiguration?.ssh
                            ? undefined
                            : {
                                publicKeys:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                  undefined
                                    ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.linuxConfiguration?.ssh?.["publicKeys"]
                                    : res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.linuxConfiguration?.ssh?.[
                                        "publicKeys"
                                      ].map((p) => {
                                        return {
                                          path: p["path"],
                                          keyData: p["keyData"],
                                        };
                                      }),
                              },
                          provisionVMAgent:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.linuxConfiguration?.["provisionVMAgent"],
                          patchSettings: !res.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.linuxConfiguration?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.["patchMode"],
                                assessmentMode:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !res.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          enableVMAgentPlatformUpdates:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    secrets:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "secrets"
                      ] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ].map((p) => {
                            return {
                              sourceVault: !p.sourceVault
                                ? undefined
                                : { id: p.sourceVault?.["id"] },
                              vaultCertificates:
                                p["vaultCertificates"] === undefined
                                  ? p["vaultCertificates"]
                                  : p["vaultCertificates"].map((p) => {
                                      return {
                                        certificateUrl: p["certificateUrl"],
                                        certificateStore: p["certificateStore"],
                                      };
                                    }),
                            };
                          }),
                    allowExtensionOperations:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "allowExtensionOperations"
                      ],
                    requireGuestProvisionSignal:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "requireGuestProvisionSignal"
                      ],
                  },
              storageProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .storageProfile
                ? undefined
                : {
                    imageReference: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .storageProfile?.imageReference
                      ? undefined
                      : {
                          id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["id"],
                          publisher:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["publisher"],
                          offer:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["offer"],
                          sku: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["sku"],
                          version:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["version"],
                          exactVersion:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["exactVersion"],
                          sharedGalleryImageId:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["sharedGalleryImageId"],
                          communityGalleryImageId:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["communityGalleryImageId"],
                        },
                    osDisk: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .storageProfile?.osDisk
                      ? undefined
                      : {
                          name: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.["name"],
                          caching:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["caching"],
                          writeAcceleratorEnabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["writeAcceleratorEnabled"],
                          createOption:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["createOption"],
                          diffDiskSettings: !res.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.diffDiskSettings
                            ? undefined
                            : {
                                option:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["option"],
                                placement:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["placement"],
                              },
                          diskSizeGB:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["diskSizeGB"],
                          osType:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["osType"],
                          image: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.image
                            ? undefined
                            : {
                                uri: res.body.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.image?.["uri"],
                              },
                          vhdContainers:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["vhdContainers"],
                          managedDisk: !res.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                            ? undefined
                            : {
                                storageAccountType:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.managedDisk?.["storageAccountType"],
                                diskEncryptionSet: !res.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.diskEncryptionSet
                                  ? undefined
                                  : {
                                      id: res.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.diskEncryptionSet?.["id"],
                                    },
                                securityProfile: !res.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.securityProfile
                                  ? undefined
                                  : {
                                      securityEncryptionType:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.storageProfile?.osDisk
                                          ?.managedDisk?.securityProfile?.[
                                          "securityEncryptionType"
                                        ],
                                      diskEncryptionSet: !res.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.securityProfile?.diskEncryptionSet
                                        ? undefined
                                        : {
                                            id: res.body.properties?.computeProfile
                                              .baseVirtualMachineProfile.storageProfile?.osDisk
                                              ?.managedDisk?.securityProfile?.diskEncryptionSet?.[
                                              "id"
                                            ],
                                          },
                                    },
                              },
                          deleteOption:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["deleteOption"],
                        },
                    dataDisks:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["dataDisks"] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.["dataDisks"]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "dataDisks"
                          ].map((p) => {
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
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["diskControllerType"],
                  },
              networkProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .networkProfile
                ? undefined
                : {
                    healthProbe: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .networkProfile?.healthProbe
                      ? undefined
                      : {
                          id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.healthProbe?.["id"],
                        },
                    networkInterfaceConfigurations:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkInterfaceConfigurations"] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.["networkInterfaceConfigurations"]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkInterfaceConfigurations"
                          ].map((p) => {
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
                                      (p) => {
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
                                                                  ].map((p) => {
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
                                                      ].map((p) => {
                                                        return { id: p["id"] };
                                                      }),
                                                applicationSecurityGroups:
                                                  p.properties?.["applicationSecurityGroups"] ===
                                                  undefined
                                                    ? p.properties?.["applicationSecurityGroups"]
                                                    : p.properties?.[
                                                        "applicationSecurityGroups"
                                                      ].map((p) => {
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
                                                      ].map((p) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerInboundNatPools:
                                                  p.properties?.["loadBalancerInboundNatPools"] ===
                                                  undefined
                                                    ? p.properties?.["loadBalancerInboundNatPools"]
                                                    : p.properties?.[
                                                        "loadBalancerInboundNatPools"
                                                      ].map((p) => {
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
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkApiVersion"],
                  },
              securityProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .securityProfile
                ? undefined
                : {
                    uefiSettings: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityProfile?.uefiSettings
                      ? undefined
                      : {
                          secureBootEnabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["secureBootEnabled"],
                          vTpmEnabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["vTpmEnabled"],
                        },
                    encryptionAtHost:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["encryptionAtHost"],
                    securityType:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["securityType"],
                    encryptionIdentity: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.encryptionIdentity
                      ? undefined
                      : {
                          userAssignedIdentityResourceId:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.encryptionIdentity?.[
                              "userAssignedIdentityResourceId"
                            ],
                        },
                    proxyAgentSettings: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.proxyAgentSettings
                      ? undefined
                      : {
                          enabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["enabled"],
                          mode: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .securityProfile?.proxyAgentSettings?.["mode"],
                          keyIncarnationId:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["keyIncarnationId"],
                        },
                  },
              diagnosticsProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .diagnosticsProfile
                ? undefined
                : {
                    bootDiagnostics: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .diagnosticsProfile?.bootDiagnostics
                      ? undefined
                      : {
                          enabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["enabled"],
                          storageUri:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["storageUri"],
                        },
                  },
              extensionProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .extensionProfile
                ? undefined
                : {
                    extensions:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensions"] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .extensionProfile?.["extensions"]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensions"
                          ].map((p) => {
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
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensionsTimeBudget"],
                  },
              licenseType:
                res.body.properties?.computeProfile.baseVirtualMachineProfile["licenseType"],
              scheduledEventsProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .scheduledEventsProfile
                ? undefined
                : {
                    terminateNotificationProfile: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile
                      ?.terminateNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.["enable"],
                        },
                    osImageNotificationProfile: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile?.osImageNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.["enable"],
                        },
                  },
              userData: res.body.properties?.computeProfile.baseVirtualMachineProfile["userData"],
              capacityReservation: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .capacityReservation
                ? undefined
                : {
                    capacityReservationGroup: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.capacityReservation?.capacityReservationGroup
                      ? undefined
                      : {
                          id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .capacityReservation?.capacityReservationGroup?.["id"],
                        },
                  },
              applicationProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .applicationProfile
                ? undefined
                : {
                    galleryApplications:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .applicationProfile?.["galleryApplications"] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .applicationProfile?.["galleryApplications"]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.applicationProfile?.[
                            "galleryApplications"
                          ].map((p) => {
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
              hardwareProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .hardwareProfile
                ? undefined
                : {
                    vmSizeProperties: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .hardwareProfile?.vmSizeProperties
                      ? undefined
                      : {
                          vCPUsAvailable:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsAvailable"],
                          vCPUsPerCore:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsPerCore"],
                        },
                  },
              serviceArtifactReference: !res.body.properties?.computeProfile
                .baseVirtualMachineProfile.serviceArtifactReference
                ? undefined
                : {
                    id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .serviceArtifactReference?.["id"],
                  },
              securityPostureReference: !res.body.properties?.computeProfile
                .baseVirtualMachineProfile.securityPostureReference
                ? undefined
                : {
                    id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityPostureReference?.["id"],
                    excludeExtensions:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["excludeExtensions"],
                    isOverridable:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["isOverridable"],
                  },
              timeCreated:
                res.body.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"] !==
                undefined
                  ? new Date(
                      res.body.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"],
                    )
                  : undefined,
            },
            computeApiVersion: res.body.properties?.computeProfile["computeApiVersion"],
            platformFaultDomainCount:
              res.body.properties?.computeProfile["platformFaultDomainCount"],
          },
          timeCreated:
            res.body.properties?.["timeCreated"] !== undefined
              ? new Date(res.body.properties?.["timeCreated"])
              : undefined,
          uniqueId: res.body.properties?.["uniqueId"],
        },
    zones: res.body["zones"],
    identity: !res.body.identity
      ? undefined
      : {
          principalId: res.body.identity?.["principalId"],
          tenantId: res.body.identity?.["tenantId"],
          type: res.body.identity?.["type"],
          userAssignedIdentities: res.body.identity?.["userAssignedIdentities"],
        },
    plan: !res.body.plan
      ? undefined
      : {
          name: res.body.plan?.["name"],
          publisher: res.body.plan?.["publisher"],
          product: res.body.plan?.["product"],
          promotionCode: res.body.plan?.["promotionCode"],
          version: res.body.plan?.["version"],
        },
  };
}

/** Create a Fleet */
export function createOrUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  resource: Fleet,
  options: FleetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, subscriptionId, resourceGroupName, fleetName, resource, options),
  }) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _updateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetUpdate,
  options: FleetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod<
  Update200Response | Update202Response | UpdateDefaultResponse | UpdateLogicalResponse
> {
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

export async function _updateDeserialize(
  result: Update200Response | Update202Response | UpdateDefaultResponse | UpdateLogicalResponse,
): Promise<Fleet> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  const res = result as unknown as UpdateLogicalResponse;
  return {
    tags: res.body["tags"],
    location: res.body["location"],
    id: res.body["id"],
    name: res.body["name"],
    type: res.body["type"],
    systemData: !res.body.systemData
      ? undefined
      : {
          createdBy: res.body.systemData?.["createdBy"],
          createdByType: res.body.systemData?.["createdByType"],
          createdAt:
            res.body.systemData?.["createdAt"] !== undefined
              ? new Date(res.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: res.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: res.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            res.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(res.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !res.body.properties
      ? undefined
      : {
          provisioningState: res.body.properties?.["provisioningState"],
          spotPriorityProfile: !res.body.properties?.spotPriorityProfile
            ? undefined
            : {
                capacity: res.body.properties?.spotPriorityProfile?.["capacity"],
                minCapacity: res.body.properties?.spotPriorityProfile?.["minCapacity"],
                maxPricePerVM: res.body.properties?.spotPriorityProfile?.["maxPricePerVM"],
                evictionPolicy: res.body.properties?.spotPriorityProfile?.["evictionPolicy"],
                allocationStrategy:
                  res.body.properties?.spotPriorityProfile?.["allocationStrategy"],
                maintain: res.body.properties?.spotPriorityProfile?.["maintain"],
              },
          regularPriorityProfile: !res.body.properties?.regularPriorityProfile
            ? undefined
            : {
                capacity: res.body.properties?.regularPriorityProfile?.["capacity"],
                minCapacity: res.body.properties?.regularPriorityProfile?.["minCapacity"],
                allocationStrategy:
                  res.body.properties?.regularPriorityProfile?.["allocationStrategy"],
              },
          vmSizesProfile: res.body.properties?.["vmSizesProfile"].map((p) => {
            return { name: p["name"], rank: p["rank"] };
          }),
          computeProfile: {
            baseVirtualMachineProfile: {
              osProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                ? undefined
                : {
                    computerNamePrefix:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "computerNamePrefix"
                      ],
                    adminUsername:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminUsername"
                      ],
                    adminPassword:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "adminPassword"
                      ],
                    customData:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "customData"
                      ],
                    windowsConfiguration: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                      ? undefined
                      : {
                          provisionVMAgent:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["provisionVMAgent"],
                          enableAutomaticUpdates:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["enableAutomaticUpdates"],
                          timeZone:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["timeZone"],
                          additionalUnattendContent:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["additionalUnattendContent"] === undefined
                              ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                                  .osProfile?.windowsConfiguration?.["additionalUnattendContent"]
                              : res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.[
                                  "additionalUnattendContent"
                                ].map((p) => {
                                  return {
                                    passName: p["passName"],
                                    componentName: p["componentName"],
                                    settingName: p["settingName"],
                                    content: p["content"],
                                  };
                                }),
                          patchSettings: !res.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                            ?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.["patchMode"],
                                enableHotpatching:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "enableHotpatching"
                                  ],
                                assessmentMode:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !res.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.windowsConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          winRM: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.windowsConfiguration?.winRM
                            ? undefined
                            : {
                                listeners:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.windowsConfiguration?.winRM?.["listeners"] ===
                                  undefined
                                    ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.windowsConfiguration?.winRM?.["listeners"]
                                    : res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.windowsConfiguration?.winRM?.[
                                        "listeners"
                                      ].map((p) => {
                                        return {
                                          protocol: p["protocol"],
                                          certificateUrl: p["certificateUrl"],
                                        };
                                      }),
                              },
                          enableVMAgentPlatformUpdates:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.windowsConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    linuxConfiguration: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                      ? undefined
                      : {
                          disablePasswordAuthentication:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.linuxConfiguration?.["disablePasswordAuthentication"],
                          ssh: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .osProfile?.linuxConfiguration?.ssh
                            ? undefined
                            : {
                                publicKeys:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.ssh?.["publicKeys"] ===
                                  undefined
                                    ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                                        .osProfile?.linuxConfiguration?.ssh?.["publicKeys"]
                                    : res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.linuxConfiguration?.ssh?.[
                                        "publicKeys"
                                      ].map((p) => {
                                        return {
                                          path: p["path"],
                                          keyData: p["keyData"],
                                        };
                                      }),
                              },
                          provisionVMAgent:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.linuxConfiguration?.["provisionVMAgent"],
                          patchSettings: !res.body.properties?.computeProfile
                            .baseVirtualMachineProfile.osProfile?.linuxConfiguration?.patchSettings
                            ? undefined
                            : {
                                patchMode:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.["patchMode"],
                                assessmentMode:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .osProfile?.linuxConfiguration?.patchSettings?.[
                                    "assessmentMode"
                                  ],
                                automaticByPlatformSettings: !res.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                  ?.patchSettings?.automaticByPlatformSettings
                                  ? undefined
                                  : {
                                      rebootSetting:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "rebootSetting"
                                        ],
                                      bypassPlatformSafetyChecksOnUserSchedule:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.osProfile?.linuxConfiguration
                                          ?.patchSettings?.automaticByPlatformSettings?.[
                                          "bypassPlatformSafetyChecksOnUserSchedule"
                                        ],
                                    },
                              },
                          enableVMAgentPlatformUpdates:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile
                              ?.linuxConfiguration?.["enableVMAgentPlatformUpdates"],
                        },
                    secrets:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "secrets"
                      ] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                            "secrets"
                          ].map((p) => {
                            return {
                              sourceVault: !p.sourceVault
                                ? undefined
                                : { id: p.sourceVault?.["id"] },
                              vaultCertificates:
                                p["vaultCertificates"] === undefined
                                  ? p["vaultCertificates"]
                                  : p["vaultCertificates"].map((p) => {
                                      return {
                                        certificateUrl: p["certificateUrl"],
                                        certificateStore: p["certificateStore"],
                                      };
                                    }),
                            };
                          }),
                    allowExtensionOperations:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "allowExtensionOperations"
                      ],
                    requireGuestProvisionSignal:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile.osProfile?.[
                        "requireGuestProvisionSignal"
                      ],
                  },
              storageProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .storageProfile
                ? undefined
                : {
                    imageReference: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .storageProfile?.imageReference
                      ? undefined
                      : {
                          id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["id"],
                          publisher:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["publisher"],
                          offer:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["offer"],
                          sku: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.imageReference?.["sku"],
                          version:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["version"],
                          exactVersion:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["exactVersion"],
                          sharedGalleryImageId:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["sharedGalleryImageId"],
                          communityGalleryImageId:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.imageReference?.["communityGalleryImageId"],
                        },
                    osDisk: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .storageProfile?.osDisk
                      ? undefined
                      : {
                          name: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.["name"],
                          caching:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["caching"],
                          writeAcceleratorEnabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["writeAcceleratorEnabled"],
                          createOption:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["createOption"],
                          diffDiskSettings: !res.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.diffDiskSettings
                            ? undefined
                            : {
                                option:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["option"],
                                placement:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.diffDiskSettings?.["placement"],
                              },
                          diskSizeGB:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["diskSizeGB"],
                          osType:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["osType"],
                          image: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.osDisk?.image
                            ? undefined
                            : {
                                uri: res.body.properties?.computeProfile.baseVirtualMachineProfile
                                  .storageProfile?.osDisk?.image?.["uri"],
                              },
                          vhdContainers:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["vhdContainers"],
                          managedDisk: !res.body.properties?.computeProfile
                            .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                            ? undefined
                            : {
                                storageAccountType:
                                  res.body.properties?.computeProfile.baseVirtualMachineProfile
                                    .storageProfile?.osDisk?.managedDisk?.["storageAccountType"],
                                diskEncryptionSet: !res.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.diskEncryptionSet
                                  ? undefined
                                  : {
                                      id: res.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.diskEncryptionSet?.["id"],
                                    },
                                securityProfile: !res.body.properties?.computeProfile
                                  .baseVirtualMachineProfile.storageProfile?.osDisk?.managedDisk
                                  ?.securityProfile
                                  ? undefined
                                  : {
                                      securityEncryptionType:
                                        res.body.properties?.computeProfile
                                          .baseVirtualMachineProfile.storageProfile?.osDisk
                                          ?.managedDisk?.securityProfile?.[
                                          "securityEncryptionType"
                                        ],
                                      diskEncryptionSet: !res.body.properties?.computeProfile
                                        .baseVirtualMachineProfile.storageProfile?.osDisk
                                        ?.managedDisk?.securityProfile?.diskEncryptionSet
                                        ? undefined
                                        : {
                                            id: res.body.properties?.computeProfile
                                              .baseVirtualMachineProfile.storageProfile?.osDisk
                                              ?.managedDisk?.securityProfile?.diskEncryptionSet?.[
                                              "id"
                                            ],
                                          },
                                    },
                              },
                          deleteOption:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .storageProfile?.osDisk?.["deleteOption"],
                        },
                    dataDisks:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["dataDisks"] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .storageProfile?.["dataDisks"]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.storageProfile?.[
                            "dataDisks"
                          ].map((p) => {
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
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .storageProfile?.["diskControllerType"],
                  },
              networkProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .networkProfile
                ? undefined
                : {
                    healthProbe: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .networkProfile?.healthProbe
                      ? undefined
                      : {
                          id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.healthProbe?.["id"],
                        },
                    networkInterfaceConfigurations:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkInterfaceConfigurations"] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .networkProfile?.["networkInterfaceConfigurations"]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.networkProfile?.[
                            "networkInterfaceConfigurations"
                          ].map((p) => {
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
                                      (p) => {
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
                                                                  ].map((p) => {
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
                                                      ].map((p) => {
                                                        return { id: p["id"] };
                                                      }),
                                                applicationSecurityGroups:
                                                  p.properties?.["applicationSecurityGroups"] ===
                                                  undefined
                                                    ? p.properties?.["applicationSecurityGroups"]
                                                    : p.properties?.[
                                                        "applicationSecurityGroups"
                                                      ].map((p) => {
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
                                                      ].map((p) => {
                                                        return { id: p["id"] };
                                                      }),
                                                loadBalancerInboundNatPools:
                                                  p.properties?.["loadBalancerInboundNatPools"] ===
                                                  undefined
                                                    ? p.properties?.["loadBalancerInboundNatPools"]
                                                    : p.properties?.[
                                                        "loadBalancerInboundNatPools"
                                                      ].map((p) => {
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
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .networkProfile?.["networkApiVersion"],
                  },
              securityProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .securityProfile
                ? undefined
                : {
                    uefiSettings: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityProfile?.uefiSettings
                      ? undefined
                      : {
                          secureBootEnabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["secureBootEnabled"],
                          vTpmEnabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.uefiSettings?.["vTpmEnabled"],
                        },
                    encryptionAtHost:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["encryptionAtHost"],
                    securityType:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityProfile?.["securityType"],
                    encryptionIdentity: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.encryptionIdentity
                      ? undefined
                      : {
                          userAssignedIdentityResourceId:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.encryptionIdentity?.[
                              "userAssignedIdentityResourceId"
                            ],
                        },
                    proxyAgentSettings: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.securityProfile?.proxyAgentSettings
                      ? undefined
                      : {
                          enabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["enabled"],
                          mode: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .securityProfile?.proxyAgentSettings?.["mode"],
                          keyIncarnationId:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .securityProfile?.proxyAgentSettings?.["keyIncarnationId"],
                        },
                  },
              diagnosticsProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .diagnosticsProfile
                ? undefined
                : {
                    bootDiagnostics: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .diagnosticsProfile?.bootDiagnostics
                      ? undefined
                      : {
                          enabled:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["enabled"],
                          storageUri:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .diagnosticsProfile?.bootDiagnostics?.["storageUri"],
                        },
                  },
              extensionProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .extensionProfile
                ? undefined
                : {
                    extensions:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensions"] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .extensionProfile?.["extensions"]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.extensionProfile?.[
                            "extensions"
                          ].map((p) => {
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
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .extensionProfile?.["extensionsTimeBudget"],
                  },
              licenseType:
                res.body.properties?.computeProfile.baseVirtualMachineProfile["licenseType"],
              scheduledEventsProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .scheduledEventsProfile
                ? undefined
                : {
                    terminateNotificationProfile: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile
                      ?.terminateNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.terminateNotificationProfile?.["enable"],
                        },
                    osImageNotificationProfile: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.scheduledEventsProfile?.osImageNotificationProfile
                      ? undefined
                      : {
                          notBeforeTimeout:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.[
                              "notBeforeTimeout"
                            ],
                          enable:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .scheduledEventsProfile?.osImageNotificationProfile?.["enable"],
                        },
                  },
              userData: res.body.properties?.computeProfile.baseVirtualMachineProfile["userData"],
              capacityReservation: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .capacityReservation
                ? undefined
                : {
                    capacityReservationGroup: !res.body.properties?.computeProfile
                      .baseVirtualMachineProfile.capacityReservation?.capacityReservationGroup
                      ? undefined
                      : {
                          id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .capacityReservation?.capacityReservationGroup?.["id"],
                        },
                  },
              applicationProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .applicationProfile
                ? undefined
                : {
                    galleryApplications:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .applicationProfile?.["galleryApplications"] === undefined
                        ? res.body.properties?.computeProfile.baseVirtualMachineProfile
                            .applicationProfile?.["galleryApplications"]
                        : res.body.properties?.computeProfile.baseVirtualMachineProfile.applicationProfile?.[
                            "galleryApplications"
                          ].map((p) => {
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
              hardwareProfile: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                .hardwareProfile
                ? undefined
                : {
                    vmSizeProperties: !res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .hardwareProfile?.vmSizeProperties
                      ? undefined
                      : {
                          vCPUsAvailable:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsAvailable"],
                          vCPUsPerCore:
                            res.body.properties?.computeProfile.baseVirtualMachineProfile
                              .hardwareProfile?.vmSizeProperties?.["vCPUsPerCore"],
                        },
                  },
              serviceArtifactReference: !res.body.properties?.computeProfile
                .baseVirtualMachineProfile.serviceArtifactReference
                ? undefined
                : {
                    id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .serviceArtifactReference?.["id"],
                  },
              securityPostureReference: !res.body.properties?.computeProfile
                .baseVirtualMachineProfile.securityPostureReference
                ? undefined
                : {
                    id: res.body.properties?.computeProfile.baseVirtualMachineProfile
                      .securityPostureReference?.["id"],
                    excludeExtensions:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["excludeExtensions"],
                    isOverridable:
                      res.body.properties?.computeProfile.baseVirtualMachineProfile
                        .securityPostureReference?.["isOverridable"],
                  },
              timeCreated:
                res.body.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"] !==
                undefined
                  ? new Date(
                      res.body.properties?.computeProfile.baseVirtualMachineProfile["timeCreated"],
                    )
                  : undefined,
            },
            computeApiVersion: res.body.properties?.computeProfile["computeApiVersion"],
            platformFaultDomainCount:
              res.body.properties?.computeProfile["platformFaultDomainCount"],
          },
          timeCreated:
            res.body.properties?.["timeCreated"] !== undefined
              ? new Date(res.body.properties?.["timeCreated"])
              : undefined,
          uniqueId: res.body.properties?.["uniqueId"],
        },
    zones: res.body["zones"],
    identity: !res.body.identity
      ? undefined
      : {
          principalId: res.body.identity?.["principalId"],
          tenantId: res.body.identity?.["tenantId"],
          type: res.body.identity?.["type"],
          userAssignedIdentities: res.body.identity?.["userAssignedIdentities"],
        },
    plan: !res.body.plan
      ? undefined
      : {
          name: res.body.plan?.["name"],
          publisher: res.body.plan?.["publisher"],
          product: res.body.plan?.["product"],
          promotionCode: res.body.plan?.["promotionCode"],
          version: res.body.plan?.["version"],
        },
  };
}

/** Update a Fleet */
export function update(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  properties: FleetUpdate,
  options: FleetsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Fleet>, Fleet> {
  return getLongRunningPoller(context, _updateDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, subscriptionId, resourceGroupName, fleetName, properties, options),
  }) as PollerLike<OperationState<Fleet>, Fleet>;
}

export function _$deleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod<
  Delete202Response | Delete204Response | DeleteDefaultResponse | DeleteLogicalResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{fleetName}",
      subscriptionId,
      resourceGroupName,
      fleetName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(
  result: Delete202Response | Delete204Response | DeleteDefaultResponse | DeleteLogicalResponse,
): Promise<void> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a Fleet */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  fleetName: string,
  options: FleetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, subscriptionId, resourceGroupName, fleetName, options),
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod<ListByResourceGroup200Response | ListByResourceGroupDefaultResponse> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listByResourceGroupDeserialize(
  result: ListByResourceGroup200Response | ListByResourceGroupDefaultResponse,
): Promise<_FleetListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
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
              vmSizesProfile: p.properties?.["vmSizesProfile"].map((p) => {
                return { name: p["name"], rank: p["rank"] };
              }),
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
                                    ].map((p) => {
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
                                          ].map((p) => {
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
                                          ].map((p) => {
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
                              ].map((p) => {
                                return {
                                  sourceVault: !p.sourceVault
                                    ? undefined
                                    : { id: p.sourceVault?.["id"] },
                                  vaultCertificates:
                                    p["vaultCertificates"] === undefined
                                      ? p["vaultCertificates"]
                                      : p["vaultCertificates"].map((p) => {
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
                              ].map((p) => {
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
                              ].map((p) => {
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
                                          (p) => {
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
                                                                      ].map((p) => {
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
                                                          ].map((p) => {
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
                                                          ].map((p) => {
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
                                                          ].map((p) => {
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
                                                          ].map((p) => {
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
                              ].map((p) => {
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
                              ].map((p) => {
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
export function listByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: FleetsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod<ListBySubscription200Response | ListBySubscriptionDefaultResponse> {
  return context
    .path("/subscriptions/{subscriptionId}/providers/Microsoft.AzureFleet/fleets", subscriptionId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listBySubscriptionDeserialize(
  result: ListBySubscription200Response | ListBySubscriptionDefaultResponse,
): Promise<_FleetListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
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
              vmSizesProfile: p.properties?.["vmSizesProfile"].map((p) => {
                return { name: p["name"], rank: p["rank"] };
              }),
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
                                    ].map((p) => {
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
                                          ].map((p) => {
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
                                          ].map((p) => {
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
                              ].map((p) => {
                                return {
                                  sourceVault: !p.sourceVault
                                    ? undefined
                                    : { id: p.sourceVault?.["id"] },
                                  vaultCertificates:
                                    p["vaultCertificates"] === undefined
                                      ? p["vaultCertificates"]
                                      : p["vaultCertificates"].map((p) => {
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
                              ].map((p) => {
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
                              ].map((p) => {
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
                                          (p) => {
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
                                                                      ].map((p) => {
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
                                                          ].map((p) => {
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
                                                          ].map((p) => {
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
                                                          ].map((p) => {
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
                                                          ].map((p) => {
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
                              ].map((p) => {
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
                              ].map((p) => {
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
export function listBySubscription(
  context: Client,
  subscriptionId: string,
  options: FleetsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Fleet> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, subscriptionId, options),
    _listBySubscriptionDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listVirtualMachineScaleSetsSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  name: string,
  options: FleetsListVirtualMachineScaleSetsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod<
  ListVirtualMachineScaleSets200Response | ListVirtualMachineScaleSetsDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureFleet/fleets/{name}/virtualMachineScaleSets",
      subscriptionId,
      resourceGroupName,
      name,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listVirtualMachineScaleSetsDeserialize(
  result: ListVirtualMachineScaleSets200Response | ListVirtualMachineScaleSetsDefaultResponse,
): Promise<_VirtualMachineScaleSetListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
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
                  : p.error?.["details"].map((p) => {
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
export function listVirtualMachineScaleSets(
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
      _listVirtualMachineScaleSetsSend(context, subscriptionId, resourceGroupName, name, options),
    _listVirtualMachineScaleSetsDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
