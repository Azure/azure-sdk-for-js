// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SqlVirtualMachineGroup,
  sqlVirtualMachineGroupSerializer,
  sqlVirtualMachineGroupDeserializer,
  SqlVirtualMachineGroupUpdate,
  sqlVirtualMachineGroupUpdateSerializer,
  _SqlVirtualMachineGroupListResult,
  _sqlVirtualMachineGroupListResultDeserializer,
} from "../../models/models.js";
import {
  SqlVirtualMachineGroupsListOptionalParams,
  SqlVirtualMachineGroupsListByResourceGroupOptionalParams,
  SqlVirtualMachineGroupsDeleteOptionalParams,
  SqlVirtualMachineGroupsUpdateOptionalParams,
  SqlVirtualMachineGroupsCreateOrUpdateOptionalParams,
  SqlVirtualMachineGroupsGetOptionalParams,
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

export function _listSend(
  context: Client,
  options: SqlVirtualMachineGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
): Promise<_SqlVirtualMachineGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sqlVirtualMachineGroupListResultDeserializer(result.body);
}

/** Gets all SQL virtual machine groups in a subscription. */
export function list(
  context: Client,
  options: SqlVirtualMachineGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SqlVirtualMachineGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SqlVirtualMachineGroupsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SqlVirtualMachineGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _sqlVirtualMachineGroupListResultDeserializer(result.body);
}

/** Gets all SQL virtual machine groups in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SqlVirtualMachineGroupsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SqlVirtualMachineGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  options: SqlVirtualMachineGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineGroupName: sqlVirtualMachineGroupName,
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
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a SQL virtual machine group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  options: SqlVirtualMachineGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sqlVirtualMachineGroupName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  parameters: SqlVirtualMachineGroupUpdate,
  options: SqlVirtualMachineGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineGroupName: sqlVirtualMachineGroupName,
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
    body: sqlVirtualMachineGroupUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlVirtualMachineGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sqlVirtualMachineGroupDeserializer(result.body);
}

/** Updates SQL virtual machine group tags. */
export function update(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  parameters: SqlVirtualMachineGroupUpdate,
  options: SqlVirtualMachineGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, sqlVirtualMachineGroupName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  parameters: SqlVirtualMachineGroup,
  options: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineGroupName: sqlVirtualMachineGroupName,
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
    body: sqlVirtualMachineGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SqlVirtualMachineGroup> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sqlVirtualMachineGroupDeserializer(result.body);
}

/** Creates or updates a SQL virtual machine group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  parameters: SqlVirtualMachineGroup,
  options: SqlVirtualMachineGroupsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        sqlVirtualMachineGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<SqlVirtualMachineGroup>, SqlVirtualMachineGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  options: SqlVirtualMachineGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SqlVirtualMachine/sqlVirtualMachineGroups/{sqlVirtualMachineGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sqlVirtualMachineGroupName: sqlVirtualMachineGroupName,
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
): Promise<SqlVirtualMachineGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return sqlVirtualMachineGroupDeserializer(result.body);
}

/** Gets a SQL virtual machine group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sqlVirtualMachineGroupName: string,
  options: SqlVirtualMachineGroupsGetOptionalParams = { requestOptions: {} },
): Promise<SqlVirtualMachineGroup> {
  const result = await _getSend(context, resourceGroupName, sqlVirtualMachineGroupName, options);
  return _getDeserialize(result);
}
