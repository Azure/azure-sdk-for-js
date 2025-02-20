// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HybridConnectivityManagementAPIContext as Client,
  SolutionConfigurationsCreateOrUpdateOptionalParams,
  SolutionConfigurationsDeleteOptionalParams,
  SolutionConfigurationsGetOptionalParams,
  SolutionConfigurationsListOptionalParams,
  SolutionConfigurationsSyncNowOptionalParams,
  SolutionConfigurationsUpdateOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  SolutionConfiguration,
  solutionConfigurationSerializer,
  solutionConfigurationDeserializer,
  _SolutionConfigurationListResult,
  _solutionConfigurationListResultDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
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

export function _solutionConfigurationsSyncNowSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsSyncNowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/syncNow",
      { value: resourceUri, allowReserved: true },
      solutionConfiguration,
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

export async function _solutionConfigurationsSyncNowDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Trigger immediate sync with source cloud */
export function solutionConfigurationsSyncNow(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsSyncNowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _solutionConfigurationsSyncNowDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _solutionConfigurationsSyncNowSend(context, resourceUri, solutionConfiguration, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _solutionConfigurationsListSend(
  context: Client,
  resourceUri: string,
  options: SolutionConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations", {
      value: resourceUri,
      allowReserved: true,
    })
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _solutionConfigurationsListDeserialize(
  result: PathUncheckedResponse,
): Promise<_SolutionConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _solutionConfigurationListResultDeserializer(result.body);
}

/** List SolutionConfiguration resources by parent */
export function solutionConfigurationsList(
  context: Client,
  resourceUri: string,
  options: SolutionConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SolutionConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _solutionConfigurationsListSend(context, resourceUri, options),
    _solutionConfigurationsListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _solutionConfigurationsDeleteSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}",
      { value: resourceUri, allowReserved: true },
      solutionConfiguration,
    )
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _solutionConfigurationsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a SolutionConfiguration */
export async function solutionConfigurationsDelete(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _solutionConfigurationsDeleteSend(
    context,
    resourceUri,
    solutionConfiguration,
    options,
  );
  return _solutionConfigurationsDeleteDeserialize(result);
}

export function _solutionConfigurationsUpdateSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  properties: SolutionConfiguration,
  options: SolutionConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}",
      { value: resourceUri, allowReserved: true },
      solutionConfiguration,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: solutionConfigurationSerializer(properties),
    });
}

export async function _solutionConfigurationsUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionConfigurationDeserializer(result.body);
}

/** Update a SolutionConfiguration */
export async function solutionConfigurationsUpdate(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  properties: SolutionConfiguration,
  options: SolutionConfigurationsUpdateOptionalParams = { requestOptions: {} },
): Promise<SolutionConfiguration> {
  const result = await _solutionConfigurationsUpdateSend(
    context,
    resourceUri,
    solutionConfiguration,
    properties,
    options,
  );
  return _solutionConfigurationsUpdateDeserialize(result);
}

export function _solutionConfigurationsCreateOrUpdateSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  resource: SolutionConfiguration,
  options: SolutionConfigurationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}",
      { value: resourceUri, allowReserved: true },
      solutionConfiguration,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: solutionConfigurationSerializer(resource),
    });
}

export async function _solutionConfigurationsCreateOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionConfiguration> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionConfigurationDeserializer(result.body);
}

/** Create a SolutionConfiguration */
export async function solutionConfigurationsCreateOrUpdate(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  resource: SolutionConfiguration,
  options: SolutionConfigurationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<SolutionConfiguration> {
  const result = await _solutionConfigurationsCreateOrUpdateSend(
    context,
    resourceUri,
    solutionConfiguration,
    resource,
    options,
  );
  return _solutionConfigurationsCreateOrUpdateDeserialize(result);
}

export function _solutionConfigurationsGetSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/{resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}",
      { value: resourceUri, allowReserved: true },
      solutionConfiguration,
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

export async function _solutionConfigurationsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return solutionConfigurationDeserializer(result.body);
}

/** Get a SolutionConfiguration */
export async function solutionConfigurationsGet(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<SolutionConfiguration> {
  const result = await _solutionConfigurationsGetSend(
    context,
    resourceUri,
    solutionConfiguration,
    options,
  );
  return _solutionConfigurationsGetDeserialize(result);
}
