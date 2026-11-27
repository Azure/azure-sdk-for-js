// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayPrivateLinkResource,
  _AiGatewayPrivateLinkResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayPrivateLinkResourceDeserializer,
  _aiGatewayPrivateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiGatewayPrivateLinkResourcesListByAiGatewayOptionalParams,
  AiGatewayPrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByAiGatewaySend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayPrivateLinkResourcesListByAiGatewayOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _listByAiGatewayDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayPrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _aiGatewayPrivateLinkResourceListResultDeserializer(result.body);
}

/** List AiGatewayResource PrivateLinks */
export function listByAiGateway(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  options: AiGatewayPrivateLinkResourcesListByAiGatewayOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGatewayPrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAiGatewaySend(context, resourceGroupName, aiGatewayName, options),
    _listByAiGatewayDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  privateLinkResourceName: string,
  options: AiGatewayPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/aigateways/{aiGatewayName}/privateLinkResources/{privateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiGatewayName: aiGatewayName,
      privateLinkResourceName: privateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
): Promise<AiGatewayPrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayPrivateLinkResourceDeserializer(result.body);
}

/** Get a AiGatewayResource PrivateLink */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiGatewayName: string,
  privateLinkResourceName: string,
  options: AiGatewayPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AiGatewayPrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    aiGatewayName,
    privateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}
