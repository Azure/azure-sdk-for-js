// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  EnvironmentDefinition,
  _EnvironmentDefinitionListResult,
  CatalogResourceValidationErrorDetails,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  environmentDefinitionDeserializer,
  _environmentDefinitionListResultDeserializer,
  catalogResourceValidationErrorDetailsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EnvironmentDefinitionsGetErrorDetailsOptionalParams,
  EnvironmentDefinitionsListByCatalogOptionalParams,
  EnvironmentDefinitionsGetOptionalParams,
  EnvironmentDefinitionsListByProjectCatalogOptionalParams,
  EnvironmentDefinitionsGetByProjectCatalogOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getErrorDetailsSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  environmentDefinitionName: string,
  options: EnvironmentDefinitionsGetErrorDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/environmentDefinitions/{environmentDefinitionName}/getErrorDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      environmentDefinitionName: environmentDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getErrorDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<CatalogResourceValidationErrorDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogResourceValidationErrorDetailsDeserializer(result.body);
}

/** Gets Environment Definition error details. */
export async function getErrorDetails(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  environmentDefinitionName: string,
  options: EnvironmentDefinitionsGetErrorDetailsOptionalParams = { requestOptions: {} },
): Promise<CatalogResourceValidationErrorDetails> {
  const result = await _getErrorDetailsSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    environmentDefinitionName,
    options,
  );
  return _getErrorDetailsDeserialize(result);
}

export function _listByCatalogSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: EnvironmentDefinitionsListByCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/environmentDefinitions{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24top": options?.top,
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

export async function _listByCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnvironmentDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _environmentDefinitionListResultDeserializer(result.body);
}

/** List environment definitions in the catalog. */
export function listByCatalog(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  options: EnvironmentDefinitionsListByCatalogOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnvironmentDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCatalogSend(context, resourceGroupName, devCenterName, catalogName, options),
    _listByCatalogDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  environmentDefinitionName: string,
  options: EnvironmentDefinitionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/catalogs/{catalogName}/environmentDefinitions/{environmentDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      devCenterName: devCenterName,
      catalogName: catalogName,
      environmentDefinitionName: environmentDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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
): Promise<EnvironmentDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return environmentDefinitionDeserializer(result.body);
}

/** Gets an environment definition from the catalog. */
export async function get(
  context: Client,
  resourceGroupName: string,
  devCenterName: string,
  catalogName: string,
  environmentDefinitionName: string,
  options: EnvironmentDefinitionsGetOptionalParams = { requestOptions: {} },
): Promise<EnvironmentDefinition> {
  const result = await _getSend(
    context,
    resourceGroupName,
    devCenterName,
    catalogName,
    environmentDefinitionName,
    options,
  );
  return _getDeserialize(result);
}

export function _listByProjectCatalogSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  catalogName: string,
  options: EnvironmentDefinitionsListByProjectCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _listByProjectCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnvironmentDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _environmentDefinitionListResultDeserializer(result.body);
}

/** Lists the environment definitions in this project catalog. */
export function listByProjectCatalog(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  catalogName: string,
  options: EnvironmentDefinitionsListByProjectCatalogOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnvironmentDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProjectCatalogSend(context, resourceGroupName, projectName, catalogName, options),
    _listByProjectCatalogDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getByProjectCatalogSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  catalogName: string,
  environmentDefinitionName: string,
  options: EnvironmentDefinitionsGetByProjectCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{environmentDefinitionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      catalogName: catalogName,
      environmentDefinitionName: environmentDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getByProjectCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<EnvironmentDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return environmentDefinitionDeserializer(result.body);
}

/** Gets an environment definition from the catalog. */
export async function getByProjectCatalog(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  catalogName: string,
  environmentDefinitionName: string,
  options: EnvironmentDefinitionsGetByProjectCatalogOptionalParams = { requestOptions: {} },
): Promise<EnvironmentDefinition> {
  const result = await _getByProjectCatalogSend(
    context,
    resourceGroupName,
    projectName,
    catalogName,
    environmentDefinitionName,
    options,
  );
  return _getByProjectCatalogDeserialize(result);
}
