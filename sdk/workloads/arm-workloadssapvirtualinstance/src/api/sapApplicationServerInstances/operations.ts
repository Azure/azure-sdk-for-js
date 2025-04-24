// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  startRequestSerializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  stopRequestSerializer,
  SAPApplicationServerInstance,
  sapApplicationServerInstanceSerializer,
  sapApplicationServerInstanceDeserializer,
  UpdateSAPApplicationInstanceRequest,
  updateSAPApplicationInstanceRequestSerializer,
  _SAPApplicationServerInstanceListResult,
  _sapApplicationServerInstanceListResultDeserializer,
} from "../../models/models.js";
import {
  SAPApplicationServerInstancesStopOptionalParams,
  SAPApplicationServerInstancesStartOptionalParams,
  SAPApplicationServerInstancesListOptionalParams,
  SAPApplicationServerInstancesDeleteOptionalParams,
  SAPApplicationServerInstancesUpdateOptionalParams,
  SAPApplicationServerInstancesCreateOptionalParams,
  SAPApplicationServerInstancesGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesStopOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      applicationInstanceName: applicationInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["body"] ? options["body"] : stopRequestSerializer(options["body"]),
  });
}

export async function _stopDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Stops the SAP Application Server Instance. */
export function stop(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesStopOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _stopSend(
        context,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesStartOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      applicationInstanceName: applicationInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["body"] ? options["body"] : startRequestSerializer(options["body"]),
  });
}

export async function _startDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Starts the SAP Application Server Instance. */
export function start(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesStartOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(
        context,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPApplicationServerInstancesListOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SAPApplicationServerInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sapApplicationServerInstanceListResultDeserializer(result.body);
}

/** Lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  options: SAPApplicationServerInstancesListOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SAPApplicationServerInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, sapVirtualInstanceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      applicationInstanceName: applicationInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This operation will be used by service only. Delete by end user will return a Bad Request error. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesDeleteOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  properties: UpdateSAPApplicationInstanceRequest,
  options: SAPApplicationServerInstancesUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      applicationInstanceName: applicationInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateSAPApplicationInstanceRequestSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPApplicationServerInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapApplicationServerInstanceDeserializer(result.body);
}

/** Puts the SAP Application Server Instance resource. */
export async function update(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  properties: UpdateSAPApplicationInstanceRequest,
  options: SAPApplicationServerInstancesUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPApplicationServerInstance> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    sapVirtualInstanceName,
    applicationInstanceName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  resource: SAPApplicationServerInstance,
  options: SAPApplicationServerInstancesCreateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      applicationInstanceName: applicationInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sapApplicationServerInstanceSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPApplicationServerInstance> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapApplicationServerInstanceDeserializer(result.body);
}

/** Puts the SAP Application Server Instance resource. &lt;br&gt;&lt;br&gt;This will be used by service only. PUT by end user will return a Bad Request error. */
export function create(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  resource: SAPApplicationServerInstance,
  options: SAPApplicationServerInstancesCreateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SAPApplicationServerInstance>, SAPApplicationServerInstance> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        sapVirtualInstanceName,
        applicationInstanceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SAPApplicationServerInstance>, SAPApplicationServerInstance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Workloads/sapVirtualInstances/{sapVirtualInstanceName}/applicationInstances/{applicationInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapVirtualInstanceName: sapVirtualInstanceName,
      applicationInstanceName: applicationInstanceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SAPApplicationServerInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sapApplicationServerInstanceDeserializer(result.body);
}

/** Gets the SAP Application Server Instance corresponding to the Virtual Instance for SAP solutions resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sapVirtualInstanceName: string,
  applicationInstanceName: string,
  options: SAPApplicationServerInstancesGetOptionalParams = {
    requestOptions: {},
  },
): Promise<SAPApplicationServerInstance> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sapVirtualInstanceName,
    applicationInstanceName,
    options,
  );
  return _getDeserialize(result);
}
