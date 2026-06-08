// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  ApplicationInsightsComponentProactiveDetectionConfiguration,
  applicationInsightsComponentProactiveDetectionConfigurationSerializer,
  applicationInsightsComponentProactiveDetectionConfigurationDeserializer,
  applicationInsightsComponentProactiveDetectionConfigurationArrayDeserializer,
} from "../../models/componentAPIs/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ProactiveDetectionConfigurationsUpdateOptionalParams,
  ProactiveDetectionConfigurationsGetOptionalParams,
  ProactiveDetectionConfigurationsListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  configurationId: string,
  proactiveDetectionProperties: ApplicationInsightsComponentProactiveDetectionConfiguration,
  options: ProactiveDetectionConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/ProactiveDetectionConfigs/{ConfigurationId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      ConfigurationId: configurationId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationInsightsComponentProactiveDetectionConfigurationSerializer(
      proactiveDetectionProperties,
    ),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentProactiveDetectionConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentProactiveDetectionConfigurationDeserializer(result.body);
}

/** Update the ProactiveDetection configuration for this configuration id. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  configurationId: string,
  proactiveDetectionProperties: ApplicationInsightsComponentProactiveDetectionConfiguration,
  options: ProactiveDetectionConfigurationsUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentProactiveDetectionConfiguration> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    resourceName,
    configurationId,
    proactiveDetectionProperties,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  configurationId: string,
  options: ProactiveDetectionConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/ProactiveDetectionConfigs/{ConfigurationId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      ConfigurationId: configurationId,
      "api%2Dversion": "2015-05-01",
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
): Promise<ApplicationInsightsComponentProactiveDetectionConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentProactiveDetectionConfigurationDeserializer(result.body);
}

/** Get the ProactiveDetection configuration for this configuration id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  configurationId: string,
  options: ProactiveDetectionConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentProactiveDetectionConfiguration> {
  const result = await _getSend(context, resourceGroupName, resourceName, configurationId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ProactiveDetectionConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/ProactiveDetectionConfigs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
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
): Promise<ApplicationInsightsComponentProactiveDetectionConfiguration[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentProactiveDetectionConfigurationArrayDeserializer(result.body);
}

/** Gets a list of ProactiveDetection configurations of an Application Insights component. */
export async function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ProactiveDetectionConfigurationsListOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentProactiveDetectionConfiguration[]> {
  const result = await _listSend(context, resourceGroupName, resourceName, options);
  return _listDeserialize(result);
}
