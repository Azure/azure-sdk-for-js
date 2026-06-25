// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DatabaseWatcherContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  HealthValidation,
  healthValidationDeserializer,
  _HealthValidationListResult,
  _healthValidationListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  HealthValidationsStartValidationOptionalParams,
  HealthValidationsListByParentOptionalParams,
  HealthValidationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _startValidationSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  healthValidationName: string,
  options: HealthValidationsStartValidationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations/{healthValidationName}/startValidation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      watcherName: watcherName,
      healthValidationName: healthValidationName,
      "api%2Dversion": context.apiVersion ?? "2025-01-02",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _startValidationDeserialize(
  result: PathUncheckedResponse,
): Promise<HealthValidation> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return healthValidationDeserializer(result.body);
}

/** Starts health validation for a watcher. */
export function startValidation(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  healthValidationName: string,
  options: HealthValidationsStartValidationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HealthValidation>, HealthValidation> {
  return getLongRunningPoller(context, _startValidationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startValidationSend(context, resourceGroupName, watcherName, healthValidationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-02",
  }) as PollerLike<OperationState<HealthValidation>, HealthValidation>;
}

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: HealthValidationsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      watcherName: watcherName,
      "api%2Dversion": context.apiVersion ?? "2025-01-02",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_HealthValidationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _healthValidationListResultDeserializer(result.body);
}

/** List HealthValidation resources by Watcher */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: HealthValidationsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HealthValidation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, watcherName, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-02" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  healthValidationName: string,
  options: HealthValidationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations/{healthValidationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      watcherName: watcherName,
      healthValidationName: healthValidationName,
      "api%2Dversion": context.apiVersion ?? "2025-01-02",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HealthValidation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return healthValidationDeserializer(result.body);
}

/** Get a HealthValidation */
export async function get(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  healthValidationName: string,
  options: HealthValidationsGetOptionalParams = { requestOptions: {} },
): Promise<HealthValidation> {
  const result = await _getSend(
    context,
    resourceGroupName,
    watcherName,
    healthValidationName,
    options,
  );
  return _getDeserialize(result);
}
