// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  PasswordAuthentication,
  PasswordAuthenticationCreateOrUpdate,
  PasswordAuthenticationForPatchUpdateUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  passwordAuthenticationDeserializer,
  passwordAuthenticationCreateOrUpdateSerializer,
  passwordAuthenticationForPatchUpdateUpdateSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PasswordAuthenticationsUpdateOptionalParams,
  PasswordAuthenticationsCreateOrReplaceOptionalParams,
  PasswordAuthenticationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  properties: PasswordAuthenticationForPatchUpdateUpdate,
  options: PasswordAuthenticationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/passwordMethod{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: passwordAuthenticationForPatchUpdateUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PasswordAuthentication> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return passwordAuthenticationDeserializer(result.body);
}

/** Updates the service-created PostgreSQL username-and-password authentication method. The request is sparse and omitted properties preserve their current values. This API version supports enabling the method, disabling the method, and resetting its password. For a cluster that already has an administrator but currently has password authentication disabled, state Enabled and administratorLoginPassword can be supplied together to re-enable password authentication and reset the password. Disabling cannot include credentials and does not remove or modify existing database users or roles. Administrator rename is not supported in this API version. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  properties: PasswordAuthenticationForPatchUpdateUpdate,
  options: PasswordAuthenticationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PasswordAuthentication>, PasswordAuthentication> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<PasswordAuthentication>, PasswordAuthentication>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resource: PasswordAuthenticationCreateOrUpdate,
  options: PasswordAuthenticationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/passwordMethod{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: passwordAuthenticationCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<PasswordAuthentication> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return passwordAuthenticationDeserializer(result.body);
}

/** Creates or replaces the service-created PostgreSQL username-and-password authentication method. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  resource: PasswordAuthenticationCreateOrUpdate,
  options: PasswordAuthenticationsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PasswordAuthentication>, PasswordAuthentication> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, clusterName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<PasswordAuthentication>, PasswordAuthentication>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: PasswordAuthenticationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/authentications/passwordMethod{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<PasswordAuthentication> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return passwordAuthenticationDeserializer(result.body);
}

/** Gets the service-created PostgreSQL username-and-password authentication method. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: PasswordAuthenticationsGetOptionalParams = { requestOptions: {} },
): Promise<PasswordAuthentication> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
