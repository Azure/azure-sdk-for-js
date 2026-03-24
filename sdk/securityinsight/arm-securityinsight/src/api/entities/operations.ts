// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type {
  EntityUnion,
  _EntityList,
  EntityExpandParameters,
  EntityExpandResponse,
  _GetQueriesResponse,
  EntityQueryItemUnion,
  EntityGetInsightsParameters,
  EntityGetInsightsResponse,
  EntityItemQueryKind,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  entityUnionDeserializer,
  _entityListDeserializer,
  entityManualTriggerRequestBodySerializer,
  entityExpandParametersSerializer,
  entityExpandResponseDeserializer,
  _getQueriesResponseDeserializer,
  entityGetInsightsParametersSerializer,
  entityGetInsightsResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EntitiesGetInsightsOptionalParams,
  EntitiesQueriesOptionalParams,
  EntitiesExpandOptionalParams,
  EntitiesRunPlaybookOptionalParams,
  EntitiesListOptionalParams,
  EntitiesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getInsightsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  parameters: EntityGetInsightsParameters,
  options: EntitiesGetInsightsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities/{entityId}/getInsights{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      entityId: entityId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: entityGetInsightsParametersSerializer(parameters),
  });
}

export async function _getInsightsDeserialize(
  result: PathUncheckedResponse,
): Promise<EntityGetInsightsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return entityGetInsightsResponseDeserializer(result.body);
}

/** Execute Insights for an entity. */
export async function getInsights(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  parameters: EntityGetInsightsParameters,
  options: EntitiesGetInsightsOptionalParams = { requestOptions: {} },
): Promise<EntityGetInsightsResponse> {
  const result = await _getInsightsSend(
    context,
    resourceGroupName,
    workspaceName,
    entityId,
    parameters,
    options,
  );
  return _getInsightsDeserialize(result);
}

export function _queriesSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  kind: EntityItemQueryKind,
  options: EntitiesQueriesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities/{entityId}/queries{?api%2Dversion,kind}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      entityId: entityId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      kind: kind,
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

export async function _queriesDeserialize(
  result: PathUncheckedResponse,
): Promise<_GetQueriesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _getQueriesResponseDeserializer(result.body);
}

/** Get Insights and Activities for an entity. */
export function queries(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  kind: EntityItemQueryKind,
  options: EntitiesQueriesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EntityQueryItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _queriesSend(context, resourceGroupName, workspaceName, entityId, kind, options),
    _queriesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _expandSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  parameters: EntityExpandParameters,
  options: EntitiesExpandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities/{entityId}/expand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      entityId: entityId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: entityExpandParametersSerializer(parameters),
  });
}

export async function _expandDeserialize(
  result: PathUncheckedResponse,
): Promise<EntityExpandResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return entityExpandResponseDeserializer(result.body);
}

/** Expands an entity. */
export async function expand(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  parameters: EntityExpandParameters,
  options: EntitiesExpandOptionalParams = { requestOptions: {} },
): Promise<EntityExpandResponse> {
  const result = await _expandSend(
    context,
    resourceGroupName,
    workspaceName,
    entityId,
    parameters,
    options,
  );
  return _expandDeserialize(result);
}

export function _runPlaybookSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityIdentifier: string,
  options: EntitiesRunPlaybookOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities/{entityIdentifier}/runPlaybook{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      entityIdentifier: entityIdentifier,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["requestBody"]
      ? options["requestBody"]
      : entityManualTriggerRequestBodySerializer(options["requestBody"]),
  });
}

export async function _runPlaybookDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Triggers playbook on a specific entity. */
export async function runPlaybook(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityIdentifier: string,
  options: EntitiesRunPlaybookOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _runPlaybookSend(
    context,
    resourceGroupName,
    workspaceName,
    entityIdentifier,
    options,
  );
  return _runPlaybookDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: EntitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_EntityList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _entityListDeserializer(result.body);
}

/** Gets all entities. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: EntitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EntityUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  options: EntitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities/{entityId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      entityId: entityId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EntityUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return entityUnionDeserializer(result.body);
}

/** Gets an entity. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  options: EntitiesGetOptionalParams = { requestOptions: {} },
): Promise<EntityUnion> {
  const result = await _getSend(context, resourceGroupName, workspaceName, entityId, options);
  return _getDeserialize(result);
}
