// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeploymentEnvironmentsContext as Client } from "./index.js";
import {
  _PagedEnvironment,
  _pagedEnvironmentDeserializer,
  Environment,
  environmentSerializer,
  environmentDeserializer,
  _PagedCatalog,
  _pagedCatalogDeserializer,
  Catalog,
  catalogDeserializer,
  _PagedEnvironmentDefinition,
  _pagedEnvironmentDefinitionDeserializer,
  EnvironmentDefinition,
  environmentDefinitionDeserializer,
  _PagedEnvironmentType,
  _pagedEnvironmentTypeDeserializer,
  EnvironmentType,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ListEnvironmentTypesOptionalParams,
  GetEnvironmentDefinitionOptionalParams,
  ListEnvironmentDefinitionsByCatalogOptionalParams,
  ListEnvironmentDefinitionsOptionalParams,
  GetCatalogOptionalParams,
  ListCatalogsOptionalParams,
  DeleteEnvironmentOptionalParams,
  CreateOrUpdateEnvironmentOptionalParams,
  GetEnvironmentOptionalParams,
  ListEnvironmentsOptionalParams,
  ListAllEnvironmentsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listEnvironmentTypesSend(
  context: Client,
  projectName: string,
  options: ListEnvironmentTypesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/environmentTypes{?api%2Dversion}",
    {
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listEnvironmentTypesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEnvironmentType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEnvironmentTypeDeserializer(result.body);
}

/** Lists all environment types configured for a project. */
export function listEnvironmentTypes(
  context: Client,
  projectName: string,
  options: ListEnvironmentTypesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnvironmentType> {
  return buildPagedAsyncIterator(
    context,
    () => _listEnvironmentTypesSend(context, projectName, options),
    _listEnvironmentTypesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _getEnvironmentDefinitionSend(
  context: Client,
  projectName: string,
  catalogName: string,
  definitionName: string,
  options: GetEnvironmentDefinitionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{definitionName}{?api%2Dversion}",
    {
      projectName: projectName,
      catalogName: catalogName,
      definitionName: definitionName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getEnvironmentDefinitionDeserialize(
  result: PathUncheckedResponse,
): Promise<EnvironmentDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return environmentDefinitionDeserializer(result.body);
}

/** Get an environment definition from a catalog. */
export async function getEnvironmentDefinition(
  context: Client,
  projectName: string,
  catalogName: string,
  definitionName: string,
  options: GetEnvironmentDefinitionOptionalParams = { requestOptions: {} },
): Promise<EnvironmentDefinition> {
  const result = await _getEnvironmentDefinitionSend(
    context,
    projectName,
    catalogName,
    definitionName,
    options,
  );
  return _getEnvironmentDefinitionDeserialize(result);
}

export function _listEnvironmentDefinitionsByCatalogSend(
  context: Client,
  projectName: string,
  catalogName: string,
  options: ListEnvironmentDefinitionsByCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions{?api%2Dversion}",
    {
      projectName: projectName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listEnvironmentDefinitionsByCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEnvironmentDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEnvironmentDefinitionDeserializer(result.body);
}

/** Lists all environment definitions available within a catalog. */
export function listEnvironmentDefinitionsByCatalog(
  context: Client,
  projectName: string,
  catalogName: string,
  options: ListEnvironmentDefinitionsByCatalogOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnvironmentDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listEnvironmentDefinitionsByCatalogSend(context, projectName, catalogName, options),
    _listEnvironmentDefinitionsByCatalogDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _listEnvironmentDefinitionsSend(
  context: Client,
  projectName: string,
  options: ListEnvironmentDefinitionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/environmentDefinitions{?api%2Dversion}",
    {
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listEnvironmentDefinitionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEnvironmentDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEnvironmentDefinitionDeserializer(result.body);
}

/** Lists all environment definitions available for a project. */
export function listEnvironmentDefinitions(
  context: Client,
  projectName: string,
  options: ListEnvironmentDefinitionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnvironmentDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listEnvironmentDefinitionsSend(context, projectName, options),
    _listEnvironmentDefinitionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _getCatalogSend(
  context: Client,
  projectName: string,
  catalogName: string,
  options: GetCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/catalogs/{catalogName}{?api%2Dversion}",
    {
      projectName: projectName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getCatalogDeserialize(result: PathUncheckedResponse): Promise<Catalog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return catalogDeserializer(result.body);
}

/** Gets the specified catalog within the project. */
export async function getCatalog(
  context: Client,
  projectName: string,
  catalogName: string,
  options: GetCatalogOptionalParams = { requestOptions: {} },
): Promise<Catalog> {
  const result = await _getCatalogSend(context, projectName, catalogName, options);
  return _getCatalogDeserialize(result);
}

export function _listCatalogsSend(
  context: Client,
  projectName: string,
  options: ListCatalogsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/catalogs{?api%2Dversion}",
    {
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listCatalogsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedCatalog> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedCatalogDeserializer(result.body);
}

/** Lists all of the catalogs available for a project. */
export function listCatalogs(
  context: Client,
  projectName: string,
  options: ListCatalogsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Catalog> {
  return buildPagedAsyncIterator(
    context,
    () => _listCatalogsSend(context, projectName, options),
    _listCatalogsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _deleteEnvironmentSend(
  context: Client,
  projectName: string,
  userId: string,
  environmentName: string,
  options: DeleteEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/environments/{environmentName}{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _deleteEnvironmentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes an environment and all its associated resources */
export function deleteEnvironment(
  context: Client,
  projectName: string,
  userId: string,
  environmentName: string,
  options: DeleteEnvironmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteEnvironmentDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteEnvironmentSend(context, projectName, userId, environmentName, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2023-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateEnvironmentSend(
  context: Client,
  projectName: string,
  userId: string,
  environmentName: string,
  body: Environment,
  options: CreateOrUpdateEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/environments/{environmentName}{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: environmentSerializer(body),
  });
}

export async function _createOrUpdateEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<Environment> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return environmentDeserializer(result.body);
}

/** Creates or updates an environment. */
export function createOrUpdateEnvironment(
  context: Client,
  projectName: string,
  userId: string,
  environmentName: string,
  body: Environment,
  options: CreateOrUpdateEnvironmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Environment>, Environment> {
  return getLongRunningPoller(
    context,
    _createOrUpdateEnvironmentDeserialize,
    ["201", "200", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateEnvironmentSend(
          context,
          projectName,
          userId,
          environmentName,
          body,
          options,
        ),
      resourceLocationConfig: "original-uri",
      apiVersion: context.apiVersion ?? "2023-04-01",
    },
  ) as PollerLike<OperationState<Environment>, Environment>;
}

export function _getEnvironmentSend(
  context: Client,
  projectName: string,
  userId: string,
  environmentName: string,
  options: GetEnvironmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/environments/{environmentName}{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      environmentName: environmentName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _getEnvironmentDeserialize(
  result: PathUncheckedResponse,
): Promise<Environment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return environmentDeserializer(result.body);
}

/** Gets an environment. */
export async function getEnvironment(
  context: Client,
  projectName: string,
  userId: string,
  environmentName: string,
  options: GetEnvironmentOptionalParams = { requestOptions: {} },
): Promise<Environment> {
  const result = await _getEnvironmentSend(context, projectName, userId, environmentName, options);
  return _getEnvironmentDeserialize(result);
}

export function _listEnvironmentsSend(
  context: Client,
  projectName: string,
  userId: string,
  options: ListEnvironmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/users/{userId}/environments{?api%2Dversion}",
    {
      projectName: projectName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listEnvironmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEnvironment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEnvironmentDeserializer(result.body);
}

/** Lists the environments for a project and user. */
export function listEnvironments(
  context: Client,
  projectName: string,
  userId: string,
  options: ListEnvironmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Environment> {
  return buildPagedAsyncIterator(
    context,
    () => _listEnvironmentsSend(context, projectName, userId, options),
    _listEnvironmentsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}

export function _listAllEnvironmentsSend(
  context: Client,
  projectName: string,
  options: ListAllEnvironmentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/projects/{projectName}/environments{?api%2Dversion}",
    {
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
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

export async function _listAllEnvironmentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedEnvironment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedEnvironmentDeserializer(result.body);
}

/** Lists the environments for a project. */
export function listAllEnvironments(
  context: Client,
  projectName: string,
  options: ListAllEnvironmentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Environment> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllEnvironmentsSend(context, projectName, options),
    _listAllEnvironmentsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}
