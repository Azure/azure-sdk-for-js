// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ManagedEnvironment,
  managedEnvironmentSerializer,
  managedEnvironmentDeserializer,
  _ManagedEnvironmentsCollection,
  _managedEnvironmentsCollectionDeserializer,
  EnvironmentAuthToken,
  environmentAuthTokenDeserializer,
  _WorkloadProfileStatesCollection,
  _workloadProfileStatesCollectionDeserializer,
  WorkloadProfileStates,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ManagedEnvironmentsListWorkloadProfileStatesOptionalParams,
  ManagedEnvironmentsGetAuthTokenOptionalParams,
  ManagedEnvironmentsListBySubscriptionOptionalParams,
  ManagedEnvironmentsListByResourceGroupOptionalParams,
  ManagedEnvironmentsDeleteOptionalParams,
  ManagedEnvironmentsUpdateOptionalParams,
  ManagedEnvironmentsCreateOrUpdateOptionalParams,
  ManagedEnvironmentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listWorkloadProfileStatesSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsListWorkloadProfileStatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/workloadProfileStates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listWorkloadProfileStatesDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkloadProfileStatesCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _workloadProfileStatesCollectionDeserializer(result.body);
}

/** Get all workload Profile States for a Managed Environment. */
export function listWorkloadProfileStates(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsListWorkloadProfileStatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkloadProfileStates> {
  return buildPagedAsyncIterator(
    context,
    () => _listWorkloadProfileStatesSend(context, resourceGroupName, environmentName, options),
    _listWorkloadProfileStatesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _getAuthTokenSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsGetAuthTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}/getAuthtoken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getAuthTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<EnvironmentAuthToken> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return environmentAuthTokenDeserializer(result.body);
}

/** Checks if resource name is available. */
export async function getAuthToken(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsGetAuthTokenOptionalParams = { requestOptions: {} },
): Promise<EnvironmentAuthToken> {
  const result = await _getAuthTokenSend(context, resourceGroupName, environmentName, options);
  return _getAuthTokenDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ManagedEnvironmentsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/managedEnvironments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedEnvironmentsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedEnvironmentsCollectionDeserializer(result.body);
}

/** Get all Managed Environments for a subscription. */
export function listBySubscription(
  context: Client,
  options: ManagedEnvironmentsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedEnvironment> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ManagedEnvironmentsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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
): Promise<_ManagedEnvironmentsCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedEnvironmentsCollectionDeserializer(result.body);
}

/** Get all the Managed Environments in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ManagedEnvironmentsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedEnvironment> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

/** Delete a Managed Environment if it does not have any container apps. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, environmentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  environmentEnvelope: ManagedEnvironment,
  options: ManagedEnvironmentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedEnvironmentSerializer(environmentEnvelope),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedEnvironment> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedEnvironmentDeserializer(result.body);
}

/** Patches a Managed Environment using JSON Merge Patch */
export function update(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  environmentEnvelope: ManagedEnvironment,
  options: ManagedEnvironmentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedEnvironment>, ManagedEnvironment> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, environmentName, environmentEnvelope, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ManagedEnvironment>, ManagedEnvironment>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  environmentEnvelope: ManagedEnvironment,
  options: ManagedEnvironmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedEnvironmentSerializer(environmentEnvelope),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedEnvironment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedEnvironmentDeserializer(result.body);
}

/** Creates or updates a Managed Environment used to host container apps. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  environmentEnvelope: ManagedEnvironment,
  options: ManagedEnvironmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedEnvironment>, ManagedEnvironment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        environmentName,
        environmentEnvelope,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ManagedEnvironment>, ManagedEnvironment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/managedEnvironments/{environmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedEnvironment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedEnvironmentDeserializer(result.body);
}

/** Get the properties of a Managed Environment used to host container apps. */
export async function get(
  context: Client,
  resourceGroupName: string,
  environmentName: string,
  options: ManagedEnvironmentsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedEnvironment> {
  const result = await _getSend(context, resourceGroupName, environmentName, options);
  return _getDeserialize(result);
}
