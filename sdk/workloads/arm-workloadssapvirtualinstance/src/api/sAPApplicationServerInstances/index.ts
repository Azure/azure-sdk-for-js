// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WorkloadsContext as Client,
  SAPApplicationServerInstancesCreateOptionalParams,
  SAPApplicationServerInstancesDeleteOptionalParams,
  SAPApplicationServerInstancesGetOptionalParams,
  SAPApplicationServerInstancesListOptionalParams,
  SAPApplicationServerInstancesStartOptionalParams,
  SAPApplicationServerInstancesStopOptionalParams,
  SAPApplicationServerInstancesUpdateOptionalParams,
} from "../index.js";
import {
  SAPApplicationServerInstance,
  sAPApplicationServerInstanceSerializer,
  sAPApplicationServerInstanceDeserializer,
  UpdateSAPApplicationInstanceRequest,
  updateSAPApplicationInstanceRequestSerializer,
  _SAPApplicationServerInstanceListResult,
  _sAPApplicationServerInstanceListResultDeserializer,
  startRequestSerializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  stopRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

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

  return sAPApplicationServerInstanceDeserializer(result.body);
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
      body: sAPApplicationServerInstanceSerializer(resource),
    });
}

export async function _sAPApplicationServerInstancesCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPApplicationServerInstance> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPApplicationServerInstanceDeserializer(result.body);
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
      body: updateSAPApplicationInstanceRequestSerializer(properties),
    });
}

export async function _sAPApplicationServerInstancesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPApplicationServerInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sAPApplicationServerInstanceDeserializer(result.body);
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

  return _sAPApplicationServerInstanceListResultDeserializer(result.body);
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
      body: !options["body"]
        ? options["body"]
        : startRequestSerializer(options["body"]),
    });
}

export async function _sAPApplicationServerInstancesStartDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return operationStatusResultDeserializer(result.body);
}

/** Starts the SAP Application Server Instance. */
export function sAPApplicationServerInstancesStart(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
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
      body: !options["body"]
        ? options["body"]
        : stopRequestSerializer(options["body"]),
    });
}

export async function _sAPApplicationServerInstancesStopDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return operationStatusResultDeserializer(result.body);
}

/** Stops the SAP Application Server Instance. */
export function sAPApplicationServerInstancesStop(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
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
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}
