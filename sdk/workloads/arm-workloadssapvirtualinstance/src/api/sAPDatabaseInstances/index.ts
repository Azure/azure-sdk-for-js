// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  sAPDatabasePropertiesSerializer,
  StartRequest,
  OperationStatusResult,
  StopRequest,
  SAPDatabaseInstance,
  UpdateSAPDatabaseInstanceRequest,
  _SAPDatabaseInstanceListResult,
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
  SAPDatabaseInstancesGetOptionalParams,
  SAPDatabaseInstancesCreateOptionalParams,
  SAPDatabaseInstancesUpdateOptionalParams,
  SAPDatabaseInstancesDeleteOptionalParams,
  SAPDatabaseInstancesListOptionalParams,
  SAPDatabaseInstancesStartOptionalParams,
  SAPDatabaseInstancesStopOptionalParams,
} from "../../models/options.js";

export function _sAPDatabaseInstancesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  options: SAPDatabaseInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      databaseInstanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPDatabaseInstancesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPDatabaseInstance> {
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
          subnet: result.body.properties?.["subnet"],
          databaseSid: result.body.properties?.["databaseSid"],
          databaseType: result.body.properties?.["databaseType"],
          ipAddress: result.body.properties?.["ipAddress"],
          loadBalancerDetails: !result.body.properties?.loadBalancerDetails
            ? undefined
            : { id: result.body.properties?.loadBalancerDetails?.["id"] },
          vmDetails:
            result.body.properties?.["vmDetails"] === undefined
              ? result.body.properties?.["vmDetails"]
              : result.body.properties?.["vmDetails"].map((p: any) => {
                  return {
                    virtualMachineId: p["virtualMachineId"],
                    status: p["status"],
                    storageDetails:
                      p["storageDetails"] === undefined
                        ? p["storageDetails"]
                        : p["storageDetails"].map((p: any) => {
                            return { id: p["id"] };
                          }),
                  };
                }),
          status: result.body.properties?.["status"],
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

/** Gets the SAP Database Instance resource. */
export async function sAPDatabaseInstancesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  options: SAPDatabaseInstancesGetOptionalParams = { requestOptions: {} },
): Promise<SAPDatabaseInstance> {
  const result = await _sAPDatabaseInstancesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    sapVirtualInstanceName,
    databaseInstanceName,
    options,
  );
  return _sAPDatabaseInstancesGetDeserialize(result);
}

export function _sAPDatabaseInstancesCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  resource: SAPDatabaseInstance,
  options: SAPDatabaseInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      databaseInstanceName,
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
          : sAPDatabasePropertiesSerializer(resource.properties),
      },
    });
}

export async function _sAPDatabaseInstancesCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPDatabaseInstance> {
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
          subnet: result.body.properties?.["subnet"],
          databaseSid: result.body.properties?.["databaseSid"],
          databaseType: result.body.properties?.["databaseType"],
          ipAddress: result.body.properties?.["ipAddress"],
          loadBalancerDetails: !result.body.properties?.loadBalancerDetails
            ? undefined
            : { id: result.body.properties?.loadBalancerDetails?.["id"] },
          vmDetails:
            result.body.properties?.["vmDetails"] === undefined
              ? result.body.properties?.["vmDetails"]
              : result.body.properties?.["vmDetails"].map((p: any) => {
                  return {
                    virtualMachineId: p["virtualMachineId"],
                    status: p["status"],
                    storageDetails:
                      p["storageDetails"] === undefined
                        ? p["storageDetails"]
                        : p["storageDetails"].map((p: any) => {
                            return { id: p["id"] };
                          }),
                  };
                }),
          status: result.body.properties?.["status"],
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

/** Creates the Database resource corresponding to the Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
export function sAPDatabaseInstancesCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  resource: SAPDatabaseInstance,
  options: SAPDatabaseInstancesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SAPDatabaseInstance>, SAPDatabaseInstance> {
  return getLongRunningPoller(
    context,
    _sAPDatabaseInstancesCreateDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPDatabaseInstancesCreateSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          databaseInstanceName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<SAPDatabaseInstance>, SAPDatabaseInstance>;
}

export function _sAPDatabaseInstancesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  properties: UpdateSAPDatabaseInstanceRequest,
  options: SAPDatabaseInstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      databaseInstanceName,
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

export async function _sAPDatabaseInstancesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPDatabaseInstance> {
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
          subnet: result.body.properties?.["subnet"],
          databaseSid: result.body.properties?.["databaseSid"],
          databaseType: result.body.properties?.["databaseType"],
          ipAddress: result.body.properties?.["ipAddress"],
          loadBalancerDetails: !result.body.properties?.loadBalancerDetails
            ? undefined
            : { id: result.body.properties?.loadBalancerDetails?.["id"] },
          vmDetails:
            result.body.properties?.["vmDetails"] === undefined
              ? result.body.properties?.["vmDetails"]
              : result.body.properties?.["vmDetails"].map((p: any) => {
                  return {
                    virtualMachineId: p["virtualMachineId"],
                    status: p["status"],
                    storageDetails:
                      p["storageDetails"] === undefined
                        ? p["storageDetails"]
                        : p["storageDetails"].map((p: any) => {
                            return { id: p["id"] };
                          }),
                  };
                }),
          status: result.body.properties?.["status"],
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

/** Updates the Database resource. */
export async function sAPDatabaseInstancesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  properties: UpdateSAPDatabaseInstanceRequest,
  options: SAPDatabaseInstancesUpdateOptionalParams = { requestOptions: {} },
): Promise<SAPDatabaseInstance> {
  const result = await _sAPDatabaseInstancesUpdateSend(
    context,
    subscriptionId,
    resourceGroupName,
    sapVirtualInstanceName,
    databaseInstanceName,
    properties,
    options,
  );
  return _sAPDatabaseInstancesUpdateDeserialize(result);
}

export function _sAPDatabaseInstancesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  options: SAPDatabaseInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      databaseInstanceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPDatabaseInstancesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes the Database resource corresponding to a Virtual Instance for SAP solutions resource. &lt;br&gt;&lt;br&gt;This will be used by service only. Delete by end user will return a Bad Request error. */
export function sAPDatabaseInstancesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  options: SAPDatabaseInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _sAPDatabaseInstancesDeleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPDatabaseInstancesDeleteSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          databaseInstanceName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _sAPDatabaseInstancesListSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPDatabaseInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _sAPDatabaseInstancesListDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPDatabaseInstanceListResult> {
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
              subnet: p.properties?.["subnet"],
              databaseSid: p.properties?.["databaseSid"],
              databaseType: p.properties?.["databaseType"],
              ipAddress: p.properties?.["ipAddress"],
              loadBalancerDetails: !p.properties?.loadBalancerDetails
                ? undefined
                : { id: p.properties?.loadBalancerDetails?.["id"] },
              vmDetails:
                p.properties?.["vmDetails"] === undefined
                  ? p.properties?.["vmDetails"]
                  : p.properties?.["vmDetails"].map((p: any) => {
                      return {
                        virtualMachineId: p["virtualMachineId"],
                        status: p["status"],
                        storageDetails:
                          p["storageDetails"] === undefined
                            ? p["storageDetails"]
                            : p["storageDetails"].map((p: any) => {
                                return { id: p["id"] };
                              }),
                      };
                    }),
              status: p.properties?.["status"],
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

/** Lists the Database resources associated with a Virtual Instance for SAP solutions resource. */
export function sAPDatabaseInstancesList(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPDatabaseInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SAPDatabaseInstance> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _sAPDatabaseInstancesListSend(
        context,
        subscriptionId,
        resourceGroupName,
        sapVirtualInstanceName,
        options,
      ),
    _sAPDatabaseInstancesListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _sAPDatabaseInstancesStartSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  body?: StartRequest,
  options: SAPDatabaseInstancesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}/start",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      databaseInstanceName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: body === undefined ? body : { startVm: body["startVm"] },
    });
}

export async function _sAPDatabaseInstancesStartDeserialize(
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

/** Starts the database instance of the SAP system. */
export function sAPDatabaseInstancesStart(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  body?: StartRequest,
  options: SAPDatabaseInstancesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _sAPDatabaseInstancesStartDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPDatabaseInstancesStartSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          databaseInstanceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _sAPDatabaseInstancesStopSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  body?: StopRequest,
  options: SAPDatabaseInstancesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/databaseInstances/{databaseInstanceName}/stop",
      subscriptionId,
      resourceGroupName,
      sapVirtualInstanceName,
      databaseInstanceName,
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

export async function _sAPDatabaseInstancesStopDeserialize(
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

/** Stops the database instance of the SAP system. */
export function sAPDatabaseInstancesStop(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  databaseInstanceName: string,
  body?: StopRequest,
  options: SAPDatabaseInstancesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(
    context,
    _sAPDatabaseInstancesStopDeserialize,
    ["200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _sAPDatabaseInstancesStopSend(
          context,
          subscriptionId,
          resourceGroupName,
          sapVirtualInstanceName,
          databaseInstanceName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}
