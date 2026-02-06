// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type { JWTAuthenticator, _JWTAuthenticatorListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  jwtAuthenticatorSerializer,
  jwtAuthenticatorDeserializer,
  _jwtAuthenticatorListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JWTAuthenticatorsListByManagedClusterOptionalParams,
  JWTAuthenticatorsDeleteOptionalParams,
  JWTAuthenticatorsCreateOrUpdateOptionalParams,
  JWTAuthenticatorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByManagedClusterSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: JWTAuthenticatorsListByManagedClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/jwtAuthenticators{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
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

export async function _listByManagedClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_JWTAuthenticatorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _jwtAuthenticatorListResultDeserializer(result.body);
}

/** Gets a list of JWT authenticators in the specified managed cluster. */
export function listByManagedCluster(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: JWTAuthenticatorsListByManagedClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JWTAuthenticator> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedClusterSend(context, resourceGroupName, resourceName, options),
    _listByManagedClusterDeserialize,
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
  resourceName: string,
  jwtAuthenticatorName: string,
  options: JWTAuthenticatorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/jwtAuthenticators/{jwtAuthenticatorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      jwtAuthenticatorName: jwtAuthenticatorName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Deletes a JWT authenticator and updates the managed cluster to apply the settings. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jwtAuthenticatorName: string,
  options: JWTAuthenticatorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, resourceName, jwtAuthenticatorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jwtAuthenticatorName: string,
  parameters: JWTAuthenticator,
  options: JWTAuthenticatorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/jwtAuthenticators/{jwtAuthenticatorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      jwtAuthenticatorName: jwtAuthenticatorName,
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
    body: jwtAuthenticatorSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<JWTAuthenticator> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jwtAuthenticatorDeserializer(result.body);
}

/** Creates or updates JWT authenticator in the managed cluster and updates the managed cluster to apply the settings. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jwtAuthenticatorName: string,
  parameters: JWTAuthenticator,
  options: JWTAuthenticatorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<JWTAuthenticator>, JWTAuthenticator> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        resourceName,
        jwtAuthenticatorName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<JWTAuthenticator>, JWTAuthenticator>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jwtAuthenticatorName: string,
  options: JWTAuthenticatorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/jwtAuthenticators/{jwtAuthenticatorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      jwtAuthenticatorName: jwtAuthenticatorName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JWTAuthenticator> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jwtAuthenticatorDeserializer(result.body);
}

/** Gets the specified JWT authenticator of a managed cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  jwtAuthenticatorName: string,
  options: JWTAuthenticatorsGetOptionalParams = { requestOptions: {} },
): Promise<JWTAuthenticator> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    jwtAuthenticatorName,
    options,
  );
  return _getDeserialize(result);
}
