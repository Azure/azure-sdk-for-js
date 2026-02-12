// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext as Client } from "../index.js";
import type {
  NginxConfiguration,
  _NginxConfigurationListResponse,
  AnalysisResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  nginxConfigurationDeserializer,
  nginxConfigurationRequestSerializer,
  _nginxConfigurationListResponseDeserializer,
  analysisCreateSerializer,
  analysisResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigurationsAnalysisOptionalParams,
  ConfigurationsListOptionalParams,
  ConfigurationsDeleteOptionalParams,
  ConfigurationsCreateOrUpdateOptionalParams,
  ConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _analysisSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  configurationName: string,
  options: ConfigurationsAnalysisOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/configurations/{configurationName}/analyze{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"] ? options["body"] : analysisCreateSerializer(options["body"]),
  });
}

export async function _analysisDeserialize(result: PathUncheckedResponse): Promise<AnalysisResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return analysisResultDeserializer(result.body);
}

/** Analyze an NGINX configuration without applying it to the NGINXaaS deployment */
export async function analysis(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  configurationName: string,
  options: ConfigurationsAnalysisOptionalParams = { requestOptions: {} },
): Promise<AnalysisResult> {
  const result = await _analysisSend(
    context,
    resourceGroupName,
    deploymentName,
    configurationName,
    options,
  );
  return _analysisDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: ConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/configurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NginxConfigurationListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _nginxConfigurationListResponseDeserializer(result.body);
}

/** List the NGINX configuration of given NGINX deployment. */
export function list(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  options: ConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NginxConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, deploymentName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  configurationName: string,
  options: ConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

/** Reset the NGINX configuration of given NGINX deployment to default */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  configurationName: string,
  options: ConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, deploymentName, configurationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  configurationName: string,
  options: ConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"] ? options["body"] : nginxConfigurationRequestSerializer(options["body"]),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NginxConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nginxConfigurationDeserializer(result.body);
}

/** Create or update the NGINX configuration for given NGINX deployment */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  configurationName: string,
  options: ConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NginxConfiguration>, NginxConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, deploymentName, configurationName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-03-01-preview",
  }) as PollerLike<OperationState<NginxConfiguration>, NginxConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  configurationName: string,
  options: ConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Nginx.NginxPlus/nginxDeployments/{deploymentName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentName: deploymentName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NginxConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return nginxConfigurationDeserializer(result.body);
}

/** Get the NGINX configuration of given NGINX deployment */
export async function get(
  context: Client,
  resourceGroupName: string,
  deploymentName: string,
  configurationName: string,
  options: ConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<NginxConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    deploymentName,
    configurationName,
    options,
  );
  return _getDeserialize(result);
}
