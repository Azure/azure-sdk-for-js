// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  sAPApplicationServerPropertiesSerializer,
  SAPApplicationServerInstance,
  UpdateSAPApplicationInstanceRequest,
  StartRequest,
  OperationStatusResult,
  StopRequest,
  _SAPApplicationServerInstanceListResult,
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
  SAPApplicationServerInstancesGetOptionalParams,
  SAPApplicationServerInstancesCreateOptionalParams,
  SAPApplicationServerInstancesUpdateOptionalParams,
  SAPApplicationServerInstancesDeleteOptionalParams,
  SAPApplicationServerInstancesListOptionalParams,
  SAPApplicationServerInstancesStartOptionalParams,
  SAPApplicationServerInstancesStopOptionalParams,
} from "../../models/options.js";

export function _sAPApplicationServerInstancesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      applicationInstanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPApplicationServerInstancesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPApplicationServerInstance> {
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
          hostname: result.body.properties?.["hostname"],
          kernelVersion: result.body.properties?.["kernelVersion"],
          kernelPatch: result.body.properties?.["kernelPatch"],
          ipAddress: result.body.properties?.["ipAddress"],
          gatewayPort: result.body.properties?.["gatewayPort"],
          icmHttpPort: result.body.properties?.["icmHttpPort"],
          icmHttpsPort: result.body.properties?.["icmHttpsPort"],
          dispatcherStatus: result.body.properties?.["dispatcherStatus"],
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

/** Gets the SAP Application Server Instance corresponding to the Virtual Instance for SAP solutions resource. */
export async function sAPApplicationServerInstancesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesGetOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPApplicationServerInstance> {
  const result = await _sAPApplicationServerInstancesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    sapVirtualInstanceName,
    applicationInstanceName,
    options,
  );
  return _sAPApplicationServerInstancesGetDeserialize(result);
}

export function _sAPApplicationServerInstancesCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  resource: SAPApplicationServerInstance,
  options: SAPApplicationServerInstancesCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      applicationInstanceName,
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
          : sAPApplicationServerPropertiesSerializer(resource.properties),
      },
    });
}

export async function _sAPApplicationServerInstancesCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPApplicationServerInstance> {
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
          hostname: result.body.properties?.["hostname"],
          kernelVersion: result.body.properties?.["kernelVersion"],
          kernelPatch: result.body.properties?.["kernelPatch"],
          ipAddress: result.body.properties?.["ipAddress"],
          gatewayPort: result.body.properties?.["gatewayPort"],
          icmHttpPort: result.body.properties?.["icmHttpPort"],
          icmHttpsPort: result.body.properties?.["icmHttpsPort"],
          dispatcherStatus: result.body.properties?.["dispatcherStatus"],
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

/** Puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
export function sAPApplicationServerInstancesCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  resource: SAPApplicationServerInstance,
  options: SAPApplicationServerInstancesCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<SAPApplicationServerInstance>,
  SAPApplicationServerInstance
> {
  return getLongRunningPoller(
    context,
    _sAPApplicationServerInstancesCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPApplicationServerInstancesCreateSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          applicationInstanceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<
    OperationState<SAPApplicationServerInstance>,
    SAPApplicationServerInstance
  >;
}

export function _sAPApplicationServerInstancesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  properties: UpdateSAPApplicationInstanceRequest,
  options: SAPApplicationServerInstancesUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      applicationInstanceName,
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

export async function _sAPApplicationServerInstancesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPApplicationServerInstance> {
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
          hostname: result.body.properties?.["hostname"],
          kernelVersion: result.body.properties?.["kernelVersion"],
          kernelPatch: result.body.properties?.["kernelPatch"],
          ipAddress: result.body.properties?.["ipAddress"],
          gatewayPort: result.body.properties?.["gatewayPort"],
          icmHttpPort: result.body.properties?.["icmHttpPort"],
          icmHttpsPort: result.body.properties?.["icmHttpsPort"],
          dispatcherStatus: result.body.properties?.["dispatcherStatus"],
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

/** Puts the SAP Application Server Instance resource. */
export async function sAPApplicationServerInstancesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  properties: UpdateSAPApplicationInstanceRequest,
  options: SAPApplicationServerInstancesUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPApplicationServerInstance> {
  const result = await _sAPApplicationServerInstancesUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    sapVirtualInstanceName,
    applicationInstanceName,
    properties,
    options,
  );
  return _sAPApplicationServerInstancesUpdateDeserialize(result);
}

export function _sAPApplicationServerInstancesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      applicationInstanceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPApplicationServerInstancesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This operation will be used by service only. Delete by end user will return a Bad Request error. */
export function sAPApplicationServerInstancesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _sAPApplicationServerInstancesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPApplicationServerInstancesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          applicationInstanceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _sAPApplicationServerInstancesListSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPApplicationServerInstancesListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPApplicationServerInstancesListDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPApplicationServerInstanceListResult> {
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
              hostname: p.properties?.["hostname"],
              kernelVersion: p.properties?.["kernelVersion"],
              kernelPatch: p.properties?.["kernelPatch"],
              ipAddress: p.properties?.["ipAddress"],
              gatewayPort: p.properties?.["gatewayPort"],
              icmHttpPort: p.properties?.["icmHttpPort"],
              icmHttpsPort: p.properties?.["icmHttpsPort"],
              dispatcherStatus: p.properties?.["dispatcherStatus"],
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

/** Lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource. */
export function sAPApplicationServerInstancesList(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPApplicationServerInstancesListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SAPApplicationServerInstance> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _sAPApplicationServerInstancesListSend(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    _sAPApplicationServerInstancesListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _sAPApplicationServerInstancesStartSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  body?: StartRequest,
  options: SAPApplicationServerInstancesStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}/start",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      applicationInstanceName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: body === undefined ? body : { startVm: body["startVm"] },
    });
}

export async function _sAPApplicationServerInstancesStartDeserialize(
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

/** Starts the SAP Application Server Instance. */
export function sAPApplicationServerInstancesStart(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  body?: StartRequest,
  options: SAPApplicationServerInstancesStartOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _sAPApplicationServerInstancesStartDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPApplicationServerInstancesStartSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          applicationInstanceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _sAPApplicationServerInstancesStopSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  body?: StopRequest,
  options: SAPApplicationServerInstancesStopOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}/stop",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      applicationInstanceName,
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

export async function _sAPApplicationServerInstancesStopDeserialize(
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

/** Stops the SAP Application Server Instance. */
export function sAPApplicationServerInstancesStop(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  body?: StopRequest,
  options: SAPApplicationServerInstancesStopOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _sAPApplicationServerInstancesStopDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPApplicationServerInstancesStopSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          applicationInstanceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}
