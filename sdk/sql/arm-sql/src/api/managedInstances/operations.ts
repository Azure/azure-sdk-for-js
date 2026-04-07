// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ManagedInstance,
  ManagedInstanceUpdate,
  _ManagedInstanceListResult,
  _OutboundEnvironmentEndpointCollection,
  OutboundEnvironmentEndpoint,
  RefreshExternalGovernanceStatusOperationResultMI,
  _TopQueriesListResult,
  TopQueries,
  ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedInstanceSerializer,
  managedInstanceDeserializer,
  managedInstanceUpdateSerializer,
  _managedInstanceListResultDeserializer,
  _outboundEnvironmentEndpointCollectionDeserializer,
  refreshExternalGovernanceStatusOperationResultMIDeserializer,
  _topQueriesListResultDeserializer,
  managedInstanceValidateAzureKeyVaultEncryptionKeyRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedInstancesListByInstancePoolOptionalParams,
  ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams,
  ManagedInstancesListByManagedInstanceOptionalParams,
  ManagedInstancesStopOptionalParams,
  ManagedInstancesStartOptionalParams,
  ManagedInstancesRefreshStatusOptionalParams,
  ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams,
  ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOptionalParams,
  ManagedInstancesFailoverOptionalParams,
  ManagedInstancesListOptionalParams,
  ManagedInstancesListByResourceGroupOptionalParams,
  ManagedInstancesDeleteOptionalParams,
  ManagedInstancesUpdateOptionalParams,
  ManagedInstancesCreateOrUpdateOptionalParams,
  ManagedInstancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByInstancePoolSend(
  context: Client,
  resourceGroupName: string,
  instancePoolName: string,
  options: ManagedInstancesListByInstancePoolOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/instancePools/{instancePoolName}/managedInstances{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      instancePoolName: instancePoolName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24expand": options?.expand,
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

export async function _listByInstancePoolDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceListResultDeserializer(result.body);
}

/** Gets a list of all managed instances in an instance pool. */
export function listByInstancePool(
  context: Client,
  resourceGroupName: string,
  instancePoolName: string,
  options: ManagedInstancesListByInstancePoolOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByInstancePoolSend(context, resourceGroupName, instancePoolName, options),
    _listByInstancePoolDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _validateAzureKeyVaultEncryptionKeySend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  parameters: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
  options: ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/validateAzureKeyVaultEncryptionKey{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: managedInstanceValidateAzureKeyVaultEncryptionKeyRequestSerializer(parameters),
  });
}

export async function _validateAzureKeyVaultEncryptionKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Validates customer managed key. */
export function validateAzureKeyVaultEncryptionKey(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  parameters: ManagedInstanceValidateAzureKeyVaultEncryptionKeyRequest,
  options: ManagedInstancesValidateAzureKeyVaultEncryptionKeyOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _validateAzureKeyVaultEncryptionKeyDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _validateAzureKeyVaultEncryptionKeySend(
          context,
          resourceGroupName,
          managedInstanceName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listByManagedInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesListByManagedInstanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/topqueries{?api%2Dversion,numberOfQueries,databases,startTime,endTime,interval,aggregationFunction,observationMetric}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      numberOfQueries: options?.numberOfQueries,
      databases: options?.databases,
      startTime: options?.startTime,
      endTime: options?.endTime,
      interval: options?.interval,
      aggregationFunction: options?.aggregationFunction,
      observationMetric: options?.observationMetric,
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

export async function _listByManagedInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_TopQueriesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _topQueriesListResultDeserializer(result.body);
}

/** Get top resource consuming queries of a managed instance. */
export function listByManagedInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesListByManagedInstanceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TopQueries> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByManagedInstanceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/stop{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<ManagedInstance> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceDeserializer(result.body);
}

/** Stops the managed instance. */
export function stop(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesStopOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedInstance>, ManagedInstance> {
  return getLongRunningPoller(context, _stopDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _stopSend(context, resourceGroupName, managedInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/start{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<ManagedInstance> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceDeserializer(result.body);
}

/** Starts the managed instance. */
export function start(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedInstance>, ManagedInstance> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _startSend(context, resourceGroupName, managedInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
}

export function _refreshStatusSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesRefreshStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/refreshExternalGovernanceStatus{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _refreshStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<RefreshExternalGovernanceStatusOperationResultMI> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return refreshExternalGovernanceStatusOperationResultMIDeserializer(result.body);
}

/** Refresh external governance enablement status. */
export function refreshStatus(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesRefreshStatusOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<RefreshExternalGovernanceStatusOperationResultMI>,
  RefreshExternalGovernanceStatusOperationResultMI
> {
  return getLongRunningPoller(context, _refreshStatusDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshStatusSend(context, resourceGroupName, managedInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<RefreshExternalGovernanceStatusOperationResultMI>,
    RefreshExternalGovernanceStatusOperationResultMI
  >;
}

export function _reevaluateInaccessibleDatabaseStateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/reevaluateInaccessibleDatabaseState{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reevaluateInaccessibleDatabaseStateDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Reevaluates the inaccessibility state of all managed databases. */
export function reevaluateInaccessibleDatabaseState(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesReevaluateInaccessibleDatabaseStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _reevaluateInaccessibleDatabaseStateDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _reevaluateInaccessibleDatabaseStateSend(
          context,
          resourceGroupName,
          managedInstanceName,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _listOutboundNetworkDependenciesByManagedInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/outboundNetworkDependenciesEndpoints{?api%2Dversion}",
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

export async function _listOutboundNetworkDependenciesByManagedInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_OutboundEnvironmentEndpointCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _outboundEnvironmentEndpointCollectionDeserializer(result.body);
}

/** Gets the collection of outbound network dependencies for the given managed instance. */
export function listOutboundNetworkDependenciesByManagedInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesListOutboundNetworkDependenciesByManagedInstanceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OutboundEnvironmentEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listOutboundNetworkDependenciesByManagedInstanceSend(
        context,
        resourceGroupName,
        managedInstanceName,
        options,
      ),
    _listOutboundNetworkDependenciesByManagedInstanceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/failover{?api%2Dversion,replicaType}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      replicaType: options?.replicaType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _failoverDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Failovers a managed instance. */
export function failover(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _failoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverSend(context, resourceGroupName, managedInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  options: ManagedInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/managedInstances{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24expand": options?.expand,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceListResultDeserializer(result.body);
}

/** Gets a list of all managed instances in the subscription. */
export function list(
  context: Client,
  options: ManagedInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ManagedInstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24expand": options?.expand,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedInstanceListResultDeserializer(result.body);
}

/** Gets a list of managed instances in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ManagedInstancesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
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
  options: ManagedInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}{?api%2Dversion}",
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

/** Deletes a managed instance. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, managedInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  parameters: ManagedInstanceUpdate,
  options: ManagedInstancesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}{?api%2Dversion}",
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
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedInstanceUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ManagedInstance> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceDeserializer(result.body);
}

/** Updates a managed instance. */
export function update(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  parameters: ManagedInstanceUpdate,
  options: ManagedInstancesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedInstance>, ManagedInstance> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, managedInstanceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  parameters: ManagedInstance,
  options: ManagedInstancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedInstanceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedInstance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceDeserializer(result.body);
}

/** Creates or updates a managed instance. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  parameters: ManagedInstance,
  options: ManagedInstancesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedInstance>, ManagedInstance> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, managedInstanceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<ManagedInstance>, ManagedInstance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedInstanceDeserializer(result.body);
}

/** Gets a managed instance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ManagedInstancesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedInstance> {
  const result = await _getSend(context, resourceGroupName, managedInstanceName, options);
  return _getDeserialize(result);
}
