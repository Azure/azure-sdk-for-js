// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  DatadogSingleSignOnResource,
  datadogSingleSignOnResourceSerializer,
  datadogSingleSignOnResourceDeserializer,
  _DatadogSingleSignOnResourceListResponse,
  _datadogSingleSignOnResourceListResponseDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SingleSignOnConfigurationsListOptionalParams,
  SingleSignOnConfigurationsCreateOrUpdateOptionalParams,
  SingleSignOnConfigurationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: SingleSignOnConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/singleSignOnConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DatadogSingleSignOnResourceListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _datadogSingleSignOnResourceListResponseDeserializer(result.body);
}

/** List the single sign-on configurations for a given monitor resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: SingleSignOnConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatadogSingleSignOnResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, monitorName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-26-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: SingleSignOnConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/singleSignOnConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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
      body: !options?.body ? options?.body : datadogSingleSignOnResourceSerializer(options?.body),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatadogSingleSignOnResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return datadogSingleSignOnResourceDeserializer(result.body);
}

/** Configures single-sign-on for this resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: SingleSignOnConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DatadogSingleSignOnResource>, DatadogSingleSignOnResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, monitorName, configurationName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-26-preview",
  }) as PollerLike<OperationState<DatadogSingleSignOnResource>, DatadogSingleSignOnResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: SingleSignOnConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Datadog/monitors/{monitorName}/singleSignOnConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
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
): Promise<DatadogSingleSignOnResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return datadogSingleSignOnResourceDeserializer(result.body);
}

/** Gets the datadog single sign-on resource for the given Monitor. */
export async function get(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  configurationName: string,
  options: SingleSignOnConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<DatadogSingleSignOnResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    monitorName,
    configurationName,
    options,
  );
  return _getDeserialize(result);
}
