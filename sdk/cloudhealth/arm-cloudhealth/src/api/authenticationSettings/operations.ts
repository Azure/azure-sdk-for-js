// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CloudHealthContext as Client } from "../index.js";
import type {
  AuthenticationSetting,
  _AuthenticationSettingListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  authenticationSettingSerializer,
  authenticationSettingDeserializer,
  _authenticationSettingListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AuthenticationSettingsListByHealthModelOptionalParams,
  AuthenticationSettingsDeleteOptionalParams,
  AuthenticationSettingsCreateOrUpdateOptionalParams,
  AuthenticationSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByHealthModelSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: AuthenticationSettingsListByHealthModelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/authenticationsettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listByHealthModelDeserialize(
  result: PathUncheckedResponse,
): Promise<_AuthenticationSettingListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _authenticationSettingListResultDeserializer(result.body);
}

/** List AuthenticationSetting resources by HealthModel */
export function listByHealthModel(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: AuthenticationSettingsListByHealthModelOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AuthenticationSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listByHealthModelSend(context, resourceGroupName, healthModelName, options),
    _listByHealthModelDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  authenticationSettingName: string,
  options: AuthenticationSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/authenticationsettings/{authenticationSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      authenticationSettingName: authenticationSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a AuthenticationSetting */
export function $delete(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  authenticationSettingName: string,
  options: AuthenticationSettingsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, healthModelName, authenticationSettingName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  authenticationSettingName: string,
  resource: AuthenticationSetting,
  options: AuthenticationSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/authenticationsettings/{authenticationSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      authenticationSettingName: authenticationSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: authenticationSettingSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AuthenticationSetting> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authenticationSettingDeserializer(result.body);
}

/** Create a AuthenticationSetting */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  authenticationSettingName: string,
  resource: AuthenticationSetting,
  options: AuthenticationSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AuthenticationSetting>, AuthenticationSetting> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        healthModelName,
        authenticationSettingName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01-preview",
  }) as PollerLike<OperationState<AuthenticationSetting>, AuthenticationSetting>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  authenticationSettingName: string,
  options: AuthenticationSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/authenticationsettings/{authenticationSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      authenticationSettingName: authenticationSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<AuthenticationSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return authenticationSettingDeserializer(result.body);
}

/** Get a AuthenticationSetting */
export async function get(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  authenticationSettingName: string,
  options: AuthenticationSettingsGetOptionalParams = { requestOptions: {} },
): Promise<AuthenticationSetting> {
  const result = await _getSend(
    context,
    resourceGroupName,
    healthModelName,
    authenticationSettingName,
    options,
  );
  return _getDeserialize(result);
}
