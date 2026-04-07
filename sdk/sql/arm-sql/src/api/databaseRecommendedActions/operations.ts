// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { RecommendedAction } from "../../models/models.js";
import {
  errorResponseDeserializer,
  recommendedActionArrayDeserializer,
  recommendedActionSerializer,
  recommendedActionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DatabaseRecommendedActionsListByDatabaseAdvisorOptionalParams,
  DatabaseRecommendedActionsUpdateOptionalParams,
  DatabaseRecommendedActionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByDatabaseAdvisorSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advisorName: string,
  options: DatabaseRecommendedActionsListByDatabaseAdvisorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      advisorName: advisorName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByDatabaseAdvisorDeserialize(
  result: PathUncheckedResponse,
): Promise<RecommendedAction[]> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recommendedActionArrayDeserializer(result.body);
}

/** Gets list of Database Recommended Actions. */
export async function listByDatabaseAdvisor(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advisorName: string,
  options: DatabaseRecommendedActionsListByDatabaseAdvisorOptionalParams = { requestOptions: {} },
): Promise<RecommendedAction[]> {
  const result = await _listByDatabaseAdvisorSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    advisorName,
    options,
  );
  return _listByDatabaseAdvisorDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advisorName: string,
  recommendedActionName: string,
  parameters: RecommendedAction,
  options: DatabaseRecommendedActionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions/{recommendedActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      advisorName: advisorName,
      recommendedActionName: recommendedActionName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recommendedActionSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<RecommendedAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recommendedActionDeserializer(result.body);
}

/** Updates a database recommended action. */
export async function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advisorName: string,
  recommendedActionName: string,
  parameters: RecommendedAction,
  options: DatabaseRecommendedActionsUpdateOptionalParams = { requestOptions: {} },
): Promise<RecommendedAction> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    advisorName,
    recommendedActionName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advisorName: string,
  recommendedActionName: string,
  options: DatabaseRecommendedActionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/databases/{databaseName}/advisors/{advisorName}/recommendedActions/{recommendedActionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      databaseName: databaseName,
      advisorName: advisorName,
      recommendedActionName: recommendedActionName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RecommendedAction> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recommendedActionDeserializer(result.body);
}

/** Gets a database recommended action. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  databaseName: string,
  advisorName: string,
  recommendedActionName: string,
  options: DatabaseRecommendedActionsGetOptionalParams = { requestOptions: {} },
): Promise<RecommendedAction> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    databaseName,
    advisorName,
    recommendedActionName,
    options,
  );
  return _getDeserialize(result);
}
