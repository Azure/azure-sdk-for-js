// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApplicationInsightsManagementContext as Client } from "../index.js";
import {
  ApplicationInsightsComponentExportConfiguration,
  applicationInsightsComponentExportConfigurationDeserializer,
  ApplicationInsightsComponentExportRequest,
  applicationInsightsComponentExportRequestSerializer,
  applicationInsightsComponentExportConfigurationArrayDeserializer,
} from "../../models/componentAPIs/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExportConfigurationsUpdateOptionalParams,
  ExportConfigurationsGetOptionalParams,
  ExportConfigurationsDeleteOptionalParams,
  ExportConfigurationsCreateOptionalParams,
  ExportConfigurationsListOptionalParams,
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
  exportId: string,
  exportProperties: ApplicationInsightsComponentExportRequest,
  options: ExportConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/exportconfiguration/{exportId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      exportId: exportId,
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
    body: applicationInsightsComponentExportRequestSerializer(exportProperties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentExportConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentExportConfigurationDeserializer(result.body);
}

/** Update the Continuous Export configuration for this export id. */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportId: string,
  exportProperties: ApplicationInsightsComponentExportRequest,
  options: ExportConfigurationsUpdateOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentExportConfiguration> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    resourceName,
    exportId,
    exportProperties,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportId: string,
  options: ExportConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/exportconfiguration/{exportId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      exportId: exportId,
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
): Promise<ApplicationInsightsComponentExportConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentExportConfigurationDeserializer(result.body);
}

/** Get the Continuous Export configuration for this export id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportId: string,
  options: ExportConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentExportConfiguration> {
  const result = await _getSend(context, resourceGroupName, resourceName, exportId, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportId: string,
  options: ExportConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/exportconfiguration/{exportId}{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      resourceName: resourceName,
      exportId: exportId,
      "api%2Dversion": "2015-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentExportConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentExportConfigurationDeserializer(result.body);
}

/** Delete a Continuous Export configuration of an Application Insights component. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportId: string,
  options: ExportConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentExportConfiguration> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, exportId, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportProperties: ApplicationInsightsComponentExportRequest,
  options: ExportConfigurationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/exportconfiguration{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: applicationInsightsComponentExportRequestSerializer(exportProperties),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ApplicationInsightsComponentExportConfiguration[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentExportConfigurationArrayDeserializer(result.body);
}

/** Create a Continuous Export configuration of an Application Insights component. */
export async function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  exportProperties: ApplicationInsightsComponentExportRequest,
  options: ExportConfigurationsCreateOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentExportConfiguration[]> {
  const result = await _createSend(
    context,
    resourceGroupName,
    resourceName,
    exportProperties,
    options,
  );
  return _createDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ExportConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/exportconfiguration{?api%2Dversion}",
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
): Promise<ApplicationInsightsComponentExportConfiguration[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentExportConfigurationArrayDeserializer(result.body);
}

/** Gets a list of Continuous Export configuration of an Application Insights component. */
export async function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ExportConfigurationsListOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentExportConfiguration[]> {
  const result = await _listSend(context, resourceGroupName, resourceName, options);
  return _listDeserialize(result);
}
