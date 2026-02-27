// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import type {
  ConfigTemplateVersion,
  _ConfigTemplateVersionListResult} from "../../models/models.js";
import {
  errorResponseDeserializer,
  configTemplateVersionDeserializer,
  _configTemplateVersionListResultDeserializer,
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigTemplateVersionsListByConfigTemplateOptionalParams,
  ConfigTemplateVersionsGetOptionalParams,
} from "./options.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByConfigTemplateSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  options: ConfigTemplateVersionsListByConfigTemplateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      "api%2Dversion": context.apiVersion,
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

export async function _listByConfigTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfigTemplateVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _configTemplateVersionListResultDeserializer(result.body);
}

/** List Config Template Version Resources */
export function listByConfigTemplate(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  options: ConfigTemplateVersionsListByConfigTemplateOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ConfigTemplateVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByConfigTemplateSend(context, resourceGroupName, configTemplateName, options),
    _listByConfigTemplateDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  options: ConfigTemplateVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions/{configTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      configTemplateVersionName: configTemplateVersionName,
      "api%2Dversion": context.apiVersion,
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
): Promise<ConfigTemplateVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return configTemplateVersionDeserializer(result.body);
}

/** Get a Config Template Version Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  options: ConfigTemplateVersionsGetOptionalParams = { requestOptions: {} },
): Promise<ConfigTemplateVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    configTemplateName,
    configTemplateVersionName,
    options,
  );
  return _getDeserialize(result);
}
