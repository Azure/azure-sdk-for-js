// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  ConnectedEnvironment,
  connectedEnvironmentSerializer,
  connectedEnvironmentDeserializer,
  ConnectedEnvironmentPatchResource,
  connectedEnvironmentPatchResourceSerializer,
  _ConnectedEnvironmentCollection,
  _connectedEnvironmentCollectionDeserializer,
  CheckNameAvailabilityRequest,
  checkNameAvailabilityRequestSerializer,
  CheckNameAvailabilityResponse,
  checkNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ConnectedEnvironmentsCheckNameAvailabilityOptionalParams,
  ConnectedEnvironmentsListBySubscriptionOptionalParams,
  ConnectedEnvironmentsListByResourceGroupOptionalParams,
  ConnectedEnvironmentsDeleteOptionalParams,
  ConnectedEnvironmentsUpdateOptionalParams,
  ConnectedEnvironmentsCreateOrUpdateOptionalParams,
  ConnectedEnvironmentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: ConnectedEnvironmentsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: checkNameAvailabilityRequestSerializer(checkNameAvailabilityRequest),
    });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Checks if resource connectedEnvironmentName is available. */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  checkNameAvailabilityRequest: CheckNameAvailabilityRequest,
  options: ConnectedEnvironmentsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    connectedEnvironmentName,
    checkNameAvailabilityRequest,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ConnectedEnvironmentsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/connectedEnvironments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectedEnvironmentCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _connectedEnvironmentCollectionDeserializer(result.body);
}

/** Get all connectedEnvironments for a subscription. */
export function listBySubscription(
  context: Client,
  options: ConnectedEnvironmentsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectedEnvironment> {
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
  options: ConnectedEnvironmentsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectedEnvironmentCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _connectedEnvironmentCollectionDeserializer(result.body);
}

/** Get all connectedEnvironments in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ConnectedEnvironmentsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectedEnvironment> {
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
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
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
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete an connectedEnvironment. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, connectedEnvironmentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  environmentEnvelope: ConnectedEnvironmentPatchResource,
  options: ConnectedEnvironmentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: connectedEnvironmentPatchResourceSerializer(environmentEnvelope),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedEnvironment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectedEnvironmentDeserializer(result.body);
}

/** Patches a Managed Environment. Only patching of tags is supported currently */
export async function update(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  environmentEnvelope: ConnectedEnvironmentPatchResource,
  options: ConnectedEnvironmentsUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectedEnvironment> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    connectedEnvironmentName,
    environmentEnvelope,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  environmentEnvelope: ConnectedEnvironment,
  options: ConnectedEnvironmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: connectedEnvironmentSerializer(environmentEnvelope),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedEnvironment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectedEnvironmentDeserializer(result.body);
}

/** Creates or updates an connectedEnvironment. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  environmentEnvelope: ConnectedEnvironment,
  options: ConnectedEnvironmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectedEnvironment>, ConnectedEnvironment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        connectedEnvironmentName,
        environmentEnvelope,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<ConnectedEnvironment>, ConnectedEnvironment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/connectedEnvironments/{connectedEnvironmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectedEnvironmentName: connectedEnvironmentName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedEnvironment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return connectedEnvironmentDeserializer(result.body);
}

/** Get the properties of an connectedEnvironment. */
export async function get(
  context: Client,
  resourceGroupName: string,
  connectedEnvironmentName: string,
  options: ConnectedEnvironmentsGetOptionalParams = { requestOptions: {} },
): Promise<ConnectedEnvironment> {
  const result = await _getSend(context, resourceGroupName, connectedEnvironmentName, options);
  return _getDeserialize(result);
}
