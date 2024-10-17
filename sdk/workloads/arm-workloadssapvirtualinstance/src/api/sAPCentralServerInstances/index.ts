// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  sAPCentralServerPropertiesSerializer,
  StartRequest,
  OperationStatusResult,
  StopRequest,
  SAPCentralServerInstance,
  UpdateSAPCentralInstanceRequest,
  _SAPCentralServerInstanceListResult,
} from "../../models/models.js";
import { WorkloadsContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  SAPCentralServerInstancesGetOptionalParams,
  SAPCentralServerInstancesCreateOptionalParams,
  SAPCentralServerInstancesUpdateOptionalParams,
  SAPCentralServerInstancesDeleteOptionalParams,
  SAPCentralServerInstancesListOptionalParams,
  SAPCentralServerInstancesStartOptionalParams,
  SAPCentralServerInstancesStopOptionalParams,
} from "../../models/options.js";

export function _sAPCentralServerInstancesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  options: SAPCentralServerInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      centralInstanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPCentralServerInstancesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPCentralServerInstance> {
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
          instanceNo: result.body.properties?.["instanceNo"],
          subnet: result.body.properties?.["subnet"],
          messageServerProperties: !result.body.properties
            ?.messageServerProperties
            ? undefined
            : {
                msPort:
                  result.body.properties?.messageServerProperties?.["msPort"],
                internalMsPort:
                  result.body.properties?.messageServerProperties?.[
                    "internalMsPort"
                  ],
                httpPort:
                  result.body.properties?.messageServerProperties?.["httpPort"],
                httpsPort:
                  result.body.properties?.messageServerProperties?.[
                    "httpsPort"
                  ],
                hostname:
                  result.body.properties?.messageServerProperties?.["hostname"],
                ipAddress:
                  result.body.properties?.messageServerProperties?.[
                    "ipAddress"
                  ],
                health:
                  result.body.properties?.messageServerProperties?.["health"],
              },
          enqueueServerProperties: !result.body.properties
            ?.enqueueServerProperties
            ? undefined
            : {
                hostname:
                  result.body.properties?.enqueueServerProperties?.["hostname"],
                ipAddress:
                  result.body.properties?.enqueueServerProperties?.[
                    "ipAddress"
                  ],
                port: result.body.properties?.enqueueServerProperties?.["port"],
                health:
                  result.body.properties?.enqueueServerProperties?.["health"],
              },
          gatewayServerProperties: !result.body.properties
            ?.gatewayServerProperties
            ? undefined
            : {
                port: result.body.properties?.gatewayServerProperties?.["port"],
                health:
                  result.body.properties?.gatewayServerProperties?.["health"],
              },
          enqueueReplicationServerProperties: !result.body.properties
            ?.enqueueReplicationServerProperties
            ? undefined
            : {
                ersVersion:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "ersVersion"
                  ],
                instanceNo:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "instanceNo"
                  ],
                hostname:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "hostname"
                  ],
                kernelVersion:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "kernelVersion"
                  ],
                kernelPatch:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "kernelPatch"
                  ],
                ipAddress:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "ipAddress"
                  ],
                health:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "health"
                  ],
              },
          kernelVersion: result.body.properties?.["kernelVersion"],
          kernelPatch: result.body.properties?.["kernelPatch"],
          loadBalancerDetails: !result.body.properties?.loadBalancerDetails
            ? undefined
            : { id: result.body.properties?.loadBalancerDetails?.["id"] },
          vmDetails:
            result.body.properties?.["vmDetails"] === undefined
              ? result.body.properties?.["vmDetails"]
              : result.body.properties?.["vmDetails"].map((p: any) => {
                  return {
                    type: p["type"],
                    virtualMachineId: p["virtualMachineId"],
                    storageDetails:
                      p["storageDetails"] === undefined
                        ? p["storageDetails"]
                        : p["storageDetails"].map((p: any) => {
                            return { id: p["id"] };
                          }),
                  };
                }),
          status: result.body.properties?.["status"],
          health: result.body.properties?.["health"],
          provisioningState: result.body.properties?.["provisioningState"],
          errors: !result.body.properties?.errors
            ? undefined
            : {
                properties: !result.body.properties?.errors?.properties
                  ? undefined
                  : {
                      code: result.body.properties?.errors?.properties?.[
                        "code"
                      ],
                      message:
                        result.body.properties?.errors?.properties?.["message"],
                      details:
                        result.body.properties?.errors?.properties?.[
                          "details"
                        ] === undefined
                          ? result.body.properties?.errors?.properties?.[
                              "details"
                            ]
                          : result.body.properties?.errors?.properties?.[
                              "details"
                            ].map((p: any) => {
                              return {
                                code: p["code"],
                                message: p["message"],
                                details: !p.details ? undefined : p.details,
                              };
                            }),
                    },
              },
        },
  };
}

/** Gets the SAP Central Services Instance resource. */
export async function sAPCentralServerInstancesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  options: SAPCentralServerInstancesGetOptionalParams = { requestOptions: {} },
): Promise<SAPCentralServerInstance> {
  const result = await _sAPCentralServerInstancesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    sapVirtualInstanceName,
    centralInstanceName,
    options,
  );
  return _sAPCentralServerInstancesGetDeserialize(result);
}

export function _sAPCentralServerInstancesCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  resource: SAPCentralServerInstance,
  options: SAPCentralServerInstancesCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      centralInstanceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !resource.tags
          ? resource.tags
          : (serializeRecord(resource.tags as any) as any),
        location: resource["location"],
        properties: !resource.properties
          ? resource.properties
          : sAPCentralServerPropertiesSerializer(resource.properties),
      },
    });
}

export async function _sAPCentralServerInstancesCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPCentralServerInstance> {
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
          instanceNo: result.body.properties?.["instanceNo"],
          subnet: result.body.properties?.["subnet"],
          messageServerProperties: !result.body.properties
            ?.messageServerProperties
            ? undefined
            : {
                msPort:
                  result.body.properties?.messageServerProperties?.["msPort"],
                internalMsPort:
                  result.body.properties?.messageServerProperties?.[
                    "internalMsPort"
                  ],
                httpPort:
                  result.body.properties?.messageServerProperties?.["httpPort"],
                httpsPort:
                  result.body.properties?.messageServerProperties?.[
                    "httpsPort"
                  ],
                hostname:
                  result.body.properties?.messageServerProperties?.["hostname"],
                ipAddress:
                  result.body.properties?.messageServerProperties?.[
                    "ipAddress"
                  ],
                health:
                  result.body.properties?.messageServerProperties?.["health"],
              },
          enqueueServerProperties: !result.body.properties
            ?.enqueueServerProperties
            ? undefined
            : {
                hostname:
                  result.body.properties?.enqueueServerProperties?.["hostname"],
                ipAddress:
                  result.body.properties?.enqueueServerProperties?.[
                    "ipAddress"
                  ],
                port: result.body.properties?.enqueueServerProperties?.["port"],
                health:
                  result.body.properties?.enqueueServerProperties?.["health"],
              },
          gatewayServerProperties: !result.body.properties
            ?.gatewayServerProperties
            ? undefined
            : {
                port: result.body.properties?.gatewayServerProperties?.["port"],
                health:
                  result.body.properties?.gatewayServerProperties?.["health"],
              },
          enqueueReplicationServerProperties: !result.body.properties
            ?.enqueueReplicationServerProperties
            ? undefined
            : {
                ersVersion:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "ersVersion"
                  ],
                instanceNo:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "instanceNo"
                  ],
                hostname:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "hostname"
                  ],
                kernelVersion:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "kernelVersion"
                  ],
                kernelPatch:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "kernelPatch"
                  ],
                ipAddress:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "ipAddress"
                  ],
                health:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "health"
                  ],
              },
          kernelVersion: result.body.properties?.["kernelVersion"],
          kernelPatch: result.body.properties?.["kernelPatch"],
          loadBalancerDetails: !result.body.properties?.loadBalancerDetails
            ? undefined
            : { id: result.body.properties?.loadBalancerDetails?.["id"] },
          vmDetails:
            result.body.properties?.["vmDetails"] === undefined
              ? result.body.properties?.["vmDetails"]
              : result.body.properties?.["vmDetails"].map((p: any) => {
                  return {
                    type: p["type"],
                    virtualMachineId: p["virtualMachineId"],
                    storageDetails:
                      p["storageDetails"] === undefined
                        ? p["storageDetails"]
                        : p["storageDetails"].map((p: any) => {
                            return { id: p["id"] };
                          }),
                  };
                }),
          status: result.body.properties?.["status"],
          health: result.body.properties?.["health"],
          provisioningState: result.body.properties?.["provisioningState"],
          errors: !result.body.properties?.errors
            ? undefined
            : {
                properties: !result.body.properties?.errors?.properties
                  ? undefined
                  : {
                      code: result.body.properties?.errors?.properties?.[
                        "code"
                      ],
                      message:
                        result.body.properties?.errors?.properties?.["message"],
                      details:
                        result.body.properties?.errors?.properties?.[
                          "details"
                        ] === undefined
                          ? result.body.properties?.errors?.properties?.[
                              "details"
                            ]
                          : result.body.properties?.errors?.properties?.[
                              "details"
                            ].map((p: any) => {
                              return {
                                code: p["code"],
                                message: p["message"],
                                details: !p.details ? undefined : p.details,
                              };
                            }),
                    },
              },
        },
  };
}

/** Creates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT operation on this resource by end user will return a Bad Request error. */
export function sAPCentralServerInstancesCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  resource: SAPCentralServerInstance,
  options: SAPCentralServerInstancesCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<SAPCentralServerInstance>,
  SAPCentralServerInstance
> {
  return getLongRunningPoller(
    context,
    _sAPCentralServerInstancesCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPCentralServerInstancesCreateSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          centralInstanceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<SAPCentralServerInstance>,
    SAPCentralServerInstance
  >;
}

export function _sAPCentralServerInstancesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  properties: UpdateSAPCentralInstanceRequest,
  options: SAPCentralServerInstancesUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      centralInstanceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: {
        tags: !properties.tags
          ? properties.tags
          : (serializeRecord(properties.tags as any) as any),
      },
    });
}

export async function _sAPCentralServerInstancesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPCentralServerInstance> {
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
          instanceNo: result.body.properties?.["instanceNo"],
          subnet: result.body.properties?.["subnet"],
          messageServerProperties: !result.body.properties
            ?.messageServerProperties
            ? undefined
            : {
                msPort:
                  result.body.properties?.messageServerProperties?.["msPort"],
                internalMsPort:
                  result.body.properties?.messageServerProperties?.[
                    "internalMsPort"
                  ],
                httpPort:
                  result.body.properties?.messageServerProperties?.["httpPort"],
                httpsPort:
                  result.body.properties?.messageServerProperties?.[
                    "httpsPort"
                  ],
                hostname:
                  result.body.properties?.messageServerProperties?.["hostname"],
                ipAddress:
                  result.body.properties?.messageServerProperties?.[
                    "ipAddress"
                  ],
                health:
                  result.body.properties?.messageServerProperties?.["health"],
              },
          enqueueServerProperties: !result.body.properties
            ?.enqueueServerProperties
            ? undefined
            : {
                hostname:
                  result.body.properties?.enqueueServerProperties?.["hostname"],
                ipAddress:
                  result.body.properties?.enqueueServerProperties?.[
                    "ipAddress"
                  ],
                port: result.body.properties?.enqueueServerProperties?.["port"],
                health:
                  result.body.properties?.enqueueServerProperties?.["health"],
              },
          gatewayServerProperties: !result.body.properties
            ?.gatewayServerProperties
            ? undefined
            : {
                port: result.body.properties?.gatewayServerProperties?.["port"],
                health:
                  result.body.properties?.gatewayServerProperties?.["health"],
              },
          enqueueReplicationServerProperties: !result.body.properties
            ?.enqueueReplicationServerProperties
            ? undefined
            : {
                ersVersion:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "ersVersion"
                  ],
                instanceNo:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "instanceNo"
                  ],
                hostname:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "hostname"
                  ],
                kernelVersion:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "kernelVersion"
                  ],
                kernelPatch:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "kernelPatch"
                  ],
                ipAddress:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "ipAddress"
                  ],
                health:
                  result.body.properties?.enqueueReplicationServerProperties?.[
                    "health"
                  ],
              },
          kernelVersion: result.body.properties?.["kernelVersion"],
          kernelPatch: result.body.properties?.["kernelPatch"],
          loadBalancerDetails: !result.body.properties?.loadBalancerDetails
            ? undefined
            : { id: result.body.properties?.loadBalancerDetails?.["id"] },
          vmDetails:
            result.body.properties?.["vmDetails"] === undefined
              ? result.body.properties?.["vmDetails"]
              : result.body.properties?.["vmDetails"].map((p: any) => {
                  return {
                    type: p["type"],
                    virtualMachineId: p["virtualMachineId"],
                    storageDetails:
                      p["storageDetails"] === undefined
                        ? p["storageDetails"]
                        : p["storageDetails"].map((p: any) => {
                            return { id: p["id"] };
                          }),
                  };
                }),
          status: result.body.properties?.["status"],
          health: result.body.properties?.["health"],
          provisioningState: result.body.properties?.["provisioningState"],
          errors: !result.body.properties?.errors
            ? undefined
            : {
                properties: !result.body.properties?.errors?.properties
                  ? undefined
                  : {
                      code: result.body.properties?.errors?.properties?.[
                        "code"
                      ],
                      message:
                        result.body.properties?.errors?.properties?.["message"],
                      details:
                        result.body.properties?.errors?.properties?.[
                          "details"
                        ] === undefined
                          ? result.body.properties?.errors?.properties?.[
                              "details"
                            ]
                          : result.body.properties?.errors?.properties?.[
                              "details"
                            ].map((p: any) => {
                              return {
                                code: p["code"],
                                message: p["message"],
                                details: !p.details ? undefined : p.details,
                              };
                            }),
                    },
              },
        },
  };
}

/** Updates the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This can be used to update tags on the resource. */
export async function sAPCentralServerInstancesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  properties: UpdateSAPCentralInstanceRequest,
  options: SAPCentralServerInstancesUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPCentralServerInstance> {
  const result = await _sAPCentralServerInstancesUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    sapVirtualInstanceName,
    centralInstanceName,
    properties,
    options,
  );
  return _sAPCentralServerInstancesUpdateDeserialize(result);
}

export function _sAPCentralServerInstancesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  options: SAPCentralServerInstancesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      centralInstanceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPCentralServerInstancesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes the SAP Central Services Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete operation on this resource by end user will return a Bad Request error. You can delete the parent resource, which is the Virtual Instance for SAP solutions resource, using the delete operation on it. */
export function sAPCentralServerInstancesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  options: SAPCentralServerInstancesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _sAPCentralServerInstancesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPCentralServerInstancesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          centralInstanceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _sAPCentralServerInstancesListSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPCentralServerInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPCentralServerInstancesListDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPCentralServerInstanceListResult> {
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
              instanceNo: p.properties?.["instanceNo"],
              subnet: p.properties?.["subnet"],
              messageServerProperties: !p.properties?.messageServerProperties
                ? undefined
                : {
                    msPort: p.properties?.messageServerProperties?.["msPort"],
                    internalMsPort:
                      p.properties?.messageServerProperties?.["internalMsPort"],
                    httpPort:
                      p.properties?.messageServerProperties?.["httpPort"],
                    httpsPort:
                      p.properties?.messageServerProperties?.["httpsPort"],
                    hostname:
                      p.properties?.messageServerProperties?.["hostname"],
                    ipAddress:
                      p.properties?.messageServerProperties?.["ipAddress"],
                    health: p.properties?.messageServerProperties?.["health"],
                  },
              enqueueServerProperties: !p.properties?.enqueueServerProperties
                ? undefined
                : {
                    hostname:
                      p.properties?.enqueueServerProperties?.["hostname"],
                    ipAddress:
                      p.properties?.enqueueServerProperties?.["ipAddress"],
                    port: p.properties?.enqueueServerProperties?.["port"],
                    health: p.properties?.enqueueServerProperties?.["health"],
                  },
              gatewayServerProperties: !p.properties?.gatewayServerProperties
                ? undefined
                : {
                    port: p.properties?.gatewayServerProperties?.["port"],
                    health: p.properties?.gatewayServerProperties?.["health"],
                  },
              enqueueReplicationServerProperties: !p.properties
                ?.enqueueReplicationServerProperties
                ? undefined
                : {
                    ersVersion:
                      p.properties?.enqueueReplicationServerProperties?.[
                        "ersVersion"
                      ],
                    instanceNo:
                      p.properties?.enqueueReplicationServerProperties?.[
                        "instanceNo"
                      ],
                    hostname:
                      p.properties?.enqueueReplicationServerProperties?.[
                        "hostname"
                      ],
                    kernelVersion:
                      p.properties?.enqueueReplicationServerProperties?.[
                        "kernelVersion"
                      ],
                    kernelPatch:
                      p.properties?.enqueueReplicationServerProperties?.[
                        "kernelPatch"
                      ],
                    ipAddress:
                      p.properties?.enqueueReplicationServerProperties?.[
                        "ipAddress"
                      ],
                    health:
                      p.properties?.enqueueReplicationServerProperties?.[
                        "health"
                      ],
                  },
              kernelVersion: p.properties?.["kernelVersion"],
              kernelPatch: p.properties?.["kernelPatch"],
              loadBalancerDetails: !p.properties?.loadBalancerDetails
                ? undefined
                : { id: p.properties?.loadBalancerDetails?.["id"] },
              vmDetails:
                p.properties?.["vmDetails"] === undefined
                  ? p.properties?.["vmDetails"]
                  : p.properties?.["vmDetails"].map((p: any) => {
                      return {
                        type: p["type"],
                        virtualMachineId: p["virtualMachineId"],
                        storageDetails:
                          p["storageDetails"] === undefined
                            ? p["storageDetails"]
                            : p["storageDetails"].map((p: any) => {
                                return { id: p["id"] };
                              }),
                      };
                    }),
              status: p.properties?.["status"],
              health: p.properties?.["health"],
              provisioningState: p.properties?.["provisioningState"],
              errors: !p.properties?.errors
                ? undefined
                : {
                    properties: !p.properties?.errors?.properties
                      ? undefined
                      : {
                          code: p.properties?.errors?.properties?.["code"],
                          message:
                            p.properties?.errors?.properties?.["message"],
                          details:
                            p.properties?.errors?.properties?.["details"] ===
                            undefined
                              ? p.properties?.errors?.properties?.["details"]
                              : p.properties?.errors?.properties?.[
                                  "details"
                                ].map((p: any) => {
                                  return {
                                    code: p["code"],
                                    message: p["message"],
                                    details: !p.details ? undefined : p.details,
                                  };
                                }),
                        },
                  },
            },
      };
    }),
    nextLink: result.body["nextLink"],
  };
}

/** Lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource. */
export function sAPCentralServerInstancesList(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPCentralServerInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SAPCentralServerInstance> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _sAPCentralServerInstancesListSend(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    _sAPCentralServerInstancesListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _sAPCentralServerInstancesStartSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  body?: StartRequest,
  options: SAPCentralServerInstancesStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}/start",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      centralInstanceName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: body === undefined ? body : { startVm: body["startVm"] },
    });
}

export async function _sAPCentralServerInstancesStartDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    status: result.body["status"],
    percentComplete: result.body["percentComplete"],
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
    operations:
      result.body["operations"] === undefined
        ? result.body["operations"]
        : result.body["operations"].map((p: any) => {
            return {
              id: p["id"],
              name: p["name"],
              status: p["status"],
              percentComplete: p["percentComplete"],
              startTime:
                p["startTime"] !== undefined
                  ? new Date(p["startTime"])
                  : undefined,
              endTime:
                p["endTime"] !== undefined ? new Date(p["endTime"]) : undefined,
              operations: !p.operations ? undefined : (p.operations as any),
              error: !p.error
                ? undefined
                : {
                    code: p.error?.["code"],
                    message: p.error?.["message"],
                    target: p.error?.["target"],
                    details:
                      p.error?.["details"] === undefined
                        ? p.error?.["details"]
                        : p.error?.["details"].map((p: any) => {
                            return {
                              code: p["code"],
                              message: p["message"],
                              target: p["target"],
                              details: !p.details ? undefined : p.details,
                              additionalInfo:
                                p["additionalInfo"] === undefined
                                  ? p["additionalInfo"]
                                  : p["additionalInfo"].map((p: any) => {
                                      return {
                                        type: p["type"],
                                        info: p["info"],
                                      };
                                    }),
                            };
                          }),
                    additionalInfo:
                      p.error?.["additionalInfo"] === undefined
                        ? p.error?.["additionalInfo"]
                        : p.error?.["additionalInfo"].map((p: any) => {
                            return { type: p["type"], info: p["info"] };
                          }),
                  },
            };
          }),
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          target: result.body.error?.["target"],
          details:
            result.body.error?.["details"] === undefined
              ? result.body.error?.["details"]
              : result.body.error?.["details"].map((p: any) => {
                  return {
                    code: p["code"],
                    message: p["message"],
                    target: p["target"],
                    details: !p.details ? undefined : p.details,
                    additionalInfo:
                      p["additionalInfo"] === undefined
                        ? p["additionalInfo"]
                        : p["additionalInfo"].map((p: any) => {
                            return { type: p["type"], info: p["info"] };
                          }),
                  };
                }),
          additionalInfo:
            result.body.error?.["additionalInfo"] === undefined
              ? result.body.error?.["additionalInfo"]
              : result.body.error?.["additionalInfo"].map((p: any) => {
                  return { type: p["type"], info: p["info"] };
                }),
        },
  };
}

/** Starts the SAP Central Services Instance. */
export function sAPCentralServerInstancesStart(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  body?: StartRequest,
  options: SAPCentralServerInstancesStartOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _sAPCentralServerInstancesStartDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPCentralServerInstancesStartSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          centralInstanceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _sAPCentralServerInstancesStopSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  body?: StopRequest,
  options: SAPCentralServerInstancesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/centralInstances/{centralInstanceName}/stop",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      centralInstanceName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body:
        body === undefined
          ? body
          : {
              softStopTimeoutSeconds: body["softStopTimeoutSeconds"],
              deallocateVm: body["deallocateVm"],
            },
    });
}

export async function _sAPCentralServerInstancesStopDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    name: result.body["name"],
    status: result.body["status"],
    percentComplete: result.body["percentComplete"],
    startTime:
      result.body["startTime"] !== undefined
        ? new Date(result.body["startTime"])
        : undefined,
    endTime:
      result.body["endTime"] !== undefined
        ? new Date(result.body["endTime"])
        : undefined,
    operations:
      result.body["operations"] === undefined
        ? result.body["operations"]
        : result.body["operations"].map((p: any) => {
            return {
              id: p["id"],
              name: p["name"],
              status: p["status"],
              percentComplete: p["percentComplete"],
              startTime:
                p["startTime"] !== undefined
                  ? new Date(p["startTime"])
                  : undefined,
              endTime:
                p["endTime"] !== undefined ? new Date(p["endTime"]) : undefined,
              operations: !p.operations ? undefined : (p.operations as any),
              error: !p.error
                ? undefined
                : {
                    code: p.error?.["code"],
                    message: p.error?.["message"],
                    target: p.error?.["target"],
                    details:
                      p.error?.["details"] === undefined
                        ? p.error?.["details"]
                        : p.error?.["details"].map((p: any) => {
                            return {
                              code: p["code"],
                              message: p["message"],
                              target: p["target"],
                              details: !p.details ? undefined : p.details,
                              additionalInfo:
                                p["additionalInfo"] === undefined
                                  ? p["additionalInfo"]
                                  : p["additionalInfo"].map((p: any) => {
                                      return {
                                        type: p["type"],
                                        info: p["info"],
                                      };
                                    }),
                            };
                          }),
                    additionalInfo:
                      p.error?.["additionalInfo"] === undefined
                        ? p.error?.["additionalInfo"]
                        : p.error?.["additionalInfo"].map((p: any) => {
                            return { type: p["type"], info: p["info"] };
                          }),
                  },
            };
          }),
    error: !result.body.error
      ? undefined
      : {
          code: result.body.error?.["code"],
          message: result.body.error?.["message"],
          target: result.body.error?.["target"],
          details:
            result.body.error?.["details"] === undefined
              ? result.body.error?.["details"]
              : result.body.error?.["details"].map((p: any) => {
                  return {
                    code: p["code"],
                    message: p["message"],
                    target: p["target"],
                    details: !p.details ? undefined : p.details,
                    additionalInfo:
                      p["additionalInfo"] === undefined
                        ? p["additionalInfo"]
                        : p["additionalInfo"].map((p: any) => {
                            return { type: p["type"], info: p["info"] };
                          }),
                  };
                }),
          additionalInfo:
            result.body.error?.["additionalInfo"] === undefined
              ? result.body.error?.["additionalInfo"]
              : result.body.error?.["additionalInfo"].map((p: any) => {
                  return { type: p["type"], info: p["info"] };
                }),
        },
  };
}

/** Stops the SAP Central Services Instance. */
export function sAPCentralServerInstancesStop(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  centralInstanceName: string,
  body?: StopRequest,
  options: SAPCentralServerInstancesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _sAPCentralServerInstancesStopDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPCentralServerInstancesStopSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          centralInstanceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}
