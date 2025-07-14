// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DatabaseWatcherContext as Client,
  HealthValidationsGetOptionalParams,
  HealthValidationsListByParentOptionalParams,
  HealthValidationsStartValidationOptionalParams,
} from "../index.js";
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
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _healthValidationsStartValidationSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  healthValidationName: string,
  options: HealthValidationsStartValidationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations/{healthValidationName}/startValidation",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      healthValidationName,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _healthValidationsStartValidationDeserialize(
  result: PathUncheckedResponse,
): Promise<HealthValidation> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return healthValidationDeserializer(result.body);
}

/** Starts health validation for a watcher. */
export function healthValidationsStartValidation(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  healthValidationName: string,
  options: HealthValidationsStartValidationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<HealthValidation>, HealthValidation> {
  return getLongRunningPoller(
    context,
    _healthValidationsStartValidationDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _healthValidationsStartValidationSend(
          context,
          resourceGroupName,
          watcherName,
          healthValidationName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<HealthValidation>, HealthValidation>;
}

export function _healthValidationsListByParentSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: HealthValidationsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _healthValidationsListByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_HealthValidationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _healthValidationListResultDeserializer(result.body);
}

/** List HealthValidation resources by Watcher */
export function healthValidationsListByParent(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  options: HealthValidationsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HealthValidation> {
  return buildPagedAsyncIterator(
    context,
    () => _healthValidationsListByParentSend(context, resourceGroupName, watcherName, options),
    _healthValidationsListByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _healthValidationsGetSend(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  healthValidationName: string,
  options: HealthValidationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DatabaseWatcher/watchers/{watcherName}/healthValidations/{healthValidationName}",
      context.subscriptionId,
      resourceGroupName,
      watcherName,
      healthValidationName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _healthValidationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<HealthValidation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return healthValidationDeserializer(result.body);
}

/** Get a HealthValidation */
export async function healthValidationsGet(
  context: Client,
  resourceGroupName: string,
  watcherName: string,
  healthValidationName: string,
  options: HealthValidationsGetOptionalParams = { requestOptions: {} },
): Promise<HealthValidation> {
  const result = await _healthValidationsGetSend(
    context,
    resourceGroupName,
    watcherName,
    healthValidationName,
    options,
  );
  return _healthValidationsGetDeserialize(result);
}
