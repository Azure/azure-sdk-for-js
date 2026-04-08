// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext as Client } from "../index.js";
import type {
  DistributedAvailabilityGroup,
  _DistributedAvailabilityGroupsListResult,
  DistributedAvailabilityGroupsFailoverRequest,
  DistributedAvailabilityGroupSetRole,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  distributedAvailabilityGroupSerializer,
  distributedAvailabilityGroupDeserializer,
  _distributedAvailabilityGroupsListResultDeserializer,
  distributedAvailabilityGroupsFailoverRequestSerializer,
  distributedAvailabilityGroupSetRoleSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DistributedAvailabilityGroupsSetRoleOptionalParams,
  DistributedAvailabilityGroupsFailoverOptionalParams,
  DistributedAvailabilityGroupsListByInstanceOptionalParams,
  DistributedAvailabilityGroupsDeleteOptionalParams,
  DistributedAvailabilityGroupsUpdateOptionalParams,
  DistributedAvailabilityGroupsCreateOrUpdateOptionalParams,
  DistributedAvailabilityGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _setRoleSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  parameters: DistributedAvailabilityGroupSetRole,
  options: DistributedAvailabilityGroupsSetRoleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}/setRole{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      distributedAvailabilityGroupName: distributedAvailabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: distributedAvailabilityGroupSetRoleSerializer(parameters),
  });
}

export async function _setRoleDeserialize(
  result: PathUncheckedResponse,
): Promise<DistributedAvailabilityGroup> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return distributedAvailabilityGroupDeserializer(result.body);
}

/** Sets the role for managed instance in a distributed availability group. */
export function setRole(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  parameters: DistributedAvailabilityGroupSetRole,
  options: DistributedAvailabilityGroupsSetRoleOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup> {
  return getLongRunningPoller(context, _setRoleDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _setRoleSend(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>;
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  parameters: DistributedAvailabilityGroupsFailoverRequest,
  options: DistributedAvailabilityGroupsFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      distributedAvailabilityGroupName: distributedAvailabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: distributedAvailabilityGroupsFailoverRequestSerializer(parameters),
  });
}

export async function _failoverDeserialize(
  result: PathUncheckedResponse,
): Promise<DistributedAvailabilityGroup> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return distributedAvailabilityGroupDeserializer(result.body);
}

/** Performs requested failover type in this distributed availability group. */
export function failover(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  parameters: DistributedAvailabilityGroupsFailoverRequest,
  options: DistributedAvailabilityGroupsFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup> {
  return getLongRunningPoller(context, _failoverDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverSend(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>;
}

export function _listByInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: DistributedAvailabilityGroupsListByInstanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_DistributedAvailabilityGroupsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _distributedAvailabilityGroupsListResultDeserializer(result.body);
}

/** Gets a list of a distributed availability groups in instance. */
export function listByInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: DistributedAvailabilityGroupsListByInstanceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DistributedAvailabilityGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByInstanceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  options: DistributedAvailabilityGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      distributedAvailabilityGroupName: distributedAvailabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Drops a distributed availability group between Sql On-Prem and Sql Managed Instance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  options: DistributedAvailabilityGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  parameters: DistributedAvailabilityGroup,
  options: DistributedAvailabilityGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      distributedAvailabilityGroupName: distributedAvailabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: distributedAvailabilityGroupSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DistributedAvailabilityGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return distributedAvailabilityGroupDeserializer(result.body);
}

/** Updates a distributed availability group replication mode. */
export function update(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  parameters: DistributedAvailabilityGroup,
  options: DistributedAvailabilityGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  parameters: DistributedAvailabilityGroup,
  options: DistributedAvailabilityGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      distributedAvailabilityGroupName: distributedAvailabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: distributedAvailabilityGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DistributedAvailabilityGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return distributedAvailabilityGroupDeserializer(result.body);
}

/** Creates a distributed availability group between Sql On-Prem and Sql Managed Instance. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  parameters: DistributedAvailabilityGroup,
  options: DistributedAvailabilityGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  options: DistributedAvailabilityGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/distributedAvailabilityGroups/{distributedAvailabilityGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      distributedAvailabilityGroupName: distributedAvailabilityGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DistributedAvailabilityGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return distributedAvailabilityGroupDeserializer(result.body);
}

/** Gets a distributed availability group info. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  distributedAvailabilityGroupName: string,
  options: DistributedAvailabilityGroupsGetOptionalParams = { requestOptions: {} },
): Promise<DistributedAvailabilityGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    distributedAvailabilityGroupName,
    options,
  );
  return _getDeserialize(result);
}
