// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SolutionConfiguration,
  solutionConfigurationSerializer,
  solutionConfigurationDeserializer,
  SolutionConfigurationUpdate,
  solutionConfigurationUpdateSerializer,
  _SolutionConfigurationListResult,
  _solutionConfigurationListResultDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import {
  SolutionConfigurationsSyncNowOptionalParams,
  SolutionConfigurationsListOptionalParams,
  SolutionConfigurationsDeleteOptionalParams,
  SolutionConfigurationsUpdateOptionalParams,
  SolutionConfigurationsCreateOrUpdateOptionalParams,
  SolutionConfigurationsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _syncNowSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsSyncNowOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}/syncNow{?api-version}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _syncNowDeserialize(
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
export function syncNow(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsSyncNowOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _syncNowDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _syncNowSend(context, resourceUri, solutionConfiguration, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: SolutionConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations{?api-version}",
    {
      resourceUri: resourceUri,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
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
export function list(
  context: Client,
  resourceUri: string,
  options: SolutionConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SolutionConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}{?api-version}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a SolutionConfiguration */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceUri, solutionConfiguration, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  properties: SolutionConfigurationUpdate,
  options: SolutionConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}{?api-version}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: solutionConfigurationUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
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
export async function update(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  properties: SolutionConfigurationUpdate,
  options: SolutionConfigurationsUpdateOptionalParams = { requestOptions: {} },
): Promise<SolutionConfiguration> {
  const result = await _updateSend(
    context,
    resourceUri,
    solutionConfiguration,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  resource: SolutionConfiguration,
  options: SolutionConfigurationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}{?api-version}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: solutionConfigurationSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
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
export async function createOrUpdate(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  resource: SolutionConfiguration,
  options: SolutionConfigurationsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<SolutionConfiguration> {
  const result = await _createOrUpdateSend(
    context,
    resourceUri,
    solutionConfiguration,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.HybridConnectivity/solutionConfigurations/{solutionConfiguration}{?api-version}",
    {
      resourceUri: resourceUri,
      solutionConfiguration: solutionConfiguration,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
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
export async function get(
  context: Client,
  resourceUri: string,
  solutionConfiguration: string,
  options: SolutionConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<SolutionConfiguration> {
  const result = await _getSend(context, resourceUri, solutionConfiguration, options);
  return _getDeserialize(result);
}
