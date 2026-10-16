// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import type { ConfigTemplateSchema, _ConfigTemplateSchemaListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  configTemplateSchemaDeserializer,
  _configTemplateSchemaListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigTemplateSchemasListByConfigTemplateVersionOptionalParams,
  ConfigTemplateSchemasGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByConfigTemplateVersionSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  options: ConfigTemplateSchemasListByConfigTemplateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions/{configTemplateVersionName}/configTemplateSchemas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      configTemplateVersionName: configTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _listByConfigTemplateVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfigTemplateSchemaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _configTemplateSchemaListResultDeserializer(result.body);
}

/** List by ConfigTemplateVersion */
export function listByConfigTemplateVersion(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  options: ConfigTemplateSchemasListByConfigTemplateVersionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigTemplateSchema> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByConfigTemplateVersionSend(
        context,
        resourceGroupName,
        configTemplateName,
        configTemplateVersionName,
        options,
      ),
    _listByConfigTemplateVersionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  configTemplateSchemaName: string,
  options: ConfigTemplateSchemasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/configTemplates/{configTemplateName}/versions/{configTemplateVersionName}/configTemplateSchemas/{configTemplateSchemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configTemplateName: configTemplateName,
      configTemplateVersionName: configTemplateVersionName,
      configTemplateSchemaName: configTemplateSchemaName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<ConfigTemplateSchema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configTemplateSchemaDeserializer(result.body);
}

/** Get a ConfigTemplateSchema Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  configTemplateName: string,
  configTemplateVersionName: string,
  configTemplateSchemaName: string,
  options: ConfigTemplateSchemasGetOptionalParams = { requestOptions: {} },
): Promise<ConfigTemplateSchema> {
  const result = await _getSend(
    context,
    resourceGroupName,
    configTemplateName,
    configTemplateVersionName,
    configTemplateSchemaName,
    options,
  );
  return _getDeserialize(result);
}
