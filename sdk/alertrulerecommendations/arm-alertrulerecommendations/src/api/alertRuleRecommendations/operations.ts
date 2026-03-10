// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AlertsManagementContext as Client } from "../index.js";
import type {
  _AlertRuleRecommendationsListResponse,
  AlertRuleRecommendationResource,
} from "../../models/models.js";
import {
  _alertRuleRecommendationsListResponseDeserializer,
  errorResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AlertRuleRecommendationsListByTargetTypeOptionalParams,
  AlertRuleRecommendationsListByResourceOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByTargetTypeSend(
  context: Client,
  targetType: string,
  options: AlertRuleRecommendationsListByTargetTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AlertsManagement/alertRuleRecommendations{?api%2Dversion,targetType}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2023-08-01-preview",
      targetType: targetType,
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

export async function _listByTargetTypeDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertRuleRecommendationsListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _alertRuleRecommendationsListResponseDeserializer(result.body);
}

/** Retrieve alert rule recommendations for a target type. */
export function listByTargetType(
  context: Client,
  targetType: string,
  options: AlertRuleRecommendationsListByTargetTypeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertRuleRecommendationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTargetTypeSend(context, targetType, options),
    _listByTargetTypeDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2023-08-01-preview",
    },
  );
}

export function _listByResourceSend(
  context: Client,
  resourceUri: string,
  options: AlertRuleRecommendationsListByResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AlertsManagement/alertRuleRecommendations{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2023-08-01-preview",
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

export async function _listByResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_AlertRuleRecommendationsListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _alertRuleRecommendationsListResponseDeserializer(result.body);
}

/** Retrieve alert rule recommendations for a resource. */
export function listByResource(
  context: Client,
  resourceUri: string,
  options: AlertRuleRecommendationsListByResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AlertRuleRecommendationResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceSend(context, resourceUri, options),
    _listByResourceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2023-08-01-preview",
    },
  );
}
