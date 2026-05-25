// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementContext as Client } from "../index.js";
import {
  AiGateway,
  aiGatewaySerializer,
  aiGatewayDeserializer,
  errorResponseDeserializer,
  AiGatewayTagsUpdate,
  aiGatewayTagsUpdateSerializer,
  _AiGatewayListResult,
  _aiGatewayListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AiGatewaysListByResourceGroupOptionalParams,
  AiGatewaysListBySubscriptionOptionalParams,
  AiGatewaysDeleteOptionalParams,
  AiGatewaysPatchOptionalParams,
  AiGatewaysCreateOrUpdateOptionalParams,
  AiGatewaysGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AiGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/aigateways{?api%2Dversion,top,skip,maxpagesize,filter,select*,expand*,orderby*}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
      top: options?.top,
      skip: options?.skip,
      maxpagesize: options?.maxpagesize,
      filter: options?.filter,
      select: !options?.select
        ? options?.select
        : options?.select.map((p: any) => {
            return p;
          }),
      expand: !options?.expand
        ? options?.expand
        : options?.expand.map((p: any) => {
            return p;
          }),
      orderby: !options?.orderby
        ? options?.orderby
        : options?.orderby.map((p: any) => {
            return p;
          }),
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _aiGatewayListResultDeserializer(result.body);
}

/** List AiGateway resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AiGatewaysListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-15" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: AiGatewaysListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/aigateways{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiGatewayListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _aiGatewayListResultDeserializer(result.body);
}

/** List AiGateway resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: AiGatewaysListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiGateway> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-03-15" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AiGatewaysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/aigateways/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a AiGateway */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AiGatewaysDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, name, options);
  return _$deleteDeserialize(result);
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  properties: AiGatewayTagsUpdate,
  options: AiGatewaysPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/aigateways/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: aiGatewayTagsUpdateSerializer(properties),
  });
}

export async function _patchDeserialize(result: PathUncheckedResponse): Promise<AiGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return aiGatewayDeserializer(result.body);
}

/** Update a AiGateway */
export async function patch(
  context: Client,
  resourceGroupName: string,
  name: string,
  properties: AiGatewayTagsUpdate,
  options: AiGatewaysPatchOptionalParams = { requestOptions: {} },
): Promise<AiGateway> {
  const result = await _patchSend(context, resourceGroupName, name, properties, options);
  return _patchDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  resource: AiGateway,
  options: AiGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/aigateways/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: aiGatewaySerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGateway> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return aiGatewayDeserializer(result.body);
}

/** Create a AiGateway */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  resource: AiGateway,
  options: AiGatewaysCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AiGateway> {
  const result = await _createOrUpdateSend(context, resourceGroupName, name, resource, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AiGatewaysGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/aigateways/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-15",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AiGateway> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return aiGatewayDeserializer(result.body);
}

/** Get a AiGateway */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: AiGatewaysGetOptionalParams = { requestOptions: {} },
): Promise<AiGateway> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}
