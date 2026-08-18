// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  ExpressRouteLag,
  ExpressRouteLagLink,
  ExpressRouteLagMember,
  ExpressRouteLagUpdateTagsOrIdentityRequest,
  _ExpressRouteLagListResult,
  GenerateExpressRouteLagsLOARequest,
  GenerateExpressRouteLagsLOAResult,
  _ExpressRouteLagLinkListResult,
  _ExpressRouteLagMemberListResult,
} from "../../models/microsoft/network/models.js";
import {
  expressRouteLagSerializer,
  expressRouteLagDeserializer,
  expressRouteLagLinkDeserializer,
  expressRouteLagMemberDeserializer,
  expressRouteLagUpdateTagsOrIdentityRequestSerializer,
  _expressRouteLagListResultDeserializer,
  generateExpressRouteLagsLOARequestSerializer,
  generateExpressRouteLagsLOAResultDeserializer,
  _expressRouteLagLinkListResultDeserializer,
  _expressRouteLagMemberListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExpressRouteLagsMembersListOptionalParams,
  ExpressRouteLagsMembersGetOptionalParams,
  ExpressRouteLagsLinksListOptionalParams,
  ExpressRouteLagsLinksGetOptionalParams,
  ExpressRouteLagsGenerateLoaOptionalParams,
  ExpressRouteLagsListOptionalParams,
  ExpressRouteLagsListByResourceGroupOptionalParams,
  ExpressRouteLagsDeleteOptionalParams,
  ExpressRouteLagsUpdateOptionalParams,
  ExpressRouteLagsCreateOrUpdateOptionalParams,
  ExpressRouteLagsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _membersListSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  linkName: string,
  options: ExpressRouteLagsMembersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/links/{linkName}/members{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      linkName: linkName,
      "api%2Dversion": "2025-09-01",
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

export async function _membersListDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExpressRouteLagMemberListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _expressRouteLagMemberListResultDeserializer(result.body);
}

/** Retrieve the ExpressRouteLagMember sub-resources of the specified ExpressRouteLagLink resource. */
export function membersList(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  linkName: string,
  options: ExpressRouteLagsMembersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteLagMember> {
  return buildPagedAsyncIterator(
    context,
    () => _membersListSend(context, resourceGroupName, expressRouteLagName, linkName, options),
    _membersListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01" },
  );
}

export function _membersGetSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  linkName: string,
  memberName: string,
  options: ExpressRouteLagsMembersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/links/{linkName}/members/{memberName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      linkName: linkName,
      memberName: memberName,
      "api%2Dversion": "2025-09-01",
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

export async function _membersGetDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteLagMember> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteLagMemberDeserializer(result.body);
}

/** Retrieves the specified ExpressRouteLagMember resource. */
export async function membersGet(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  linkName: string,
  memberName: string,
  options: ExpressRouteLagsMembersGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteLagMember> {
  const result = await _membersGetSend(
    context,
    resourceGroupName,
    expressRouteLagName,
    linkName,
    memberName,
    options,
  );
  return _membersGetDeserialize(result);
}

export function _linksListSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  options: ExpressRouteLagsLinksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/links{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      "api%2Dversion": "2025-09-01",
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

export async function _linksListDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExpressRouteLagLinkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _expressRouteLagLinkListResultDeserializer(result.body);
}

/** Retrieve the ExpressRouteLagLink sub-resources of the specified ExpressRouteLag resource. */
export function linksList(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  options: ExpressRouteLagsLinksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteLagLink> {
  return buildPagedAsyncIterator(
    context,
    () => _linksListSend(context, resourceGroupName, expressRouteLagName, options),
    _linksListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01" },
  );
}

export function _linksGetSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  linkName: string,
  options: ExpressRouteLagsLinksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/links/{linkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      linkName: linkName,
      "api%2Dversion": "2025-09-01",
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

export async function _linksGetDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteLagLink> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteLagLinkDeserializer(result.body);
}

/** Retrieves the specified ExpressRouteLagLink resource. */
export async function linksGet(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  linkName: string,
  options: ExpressRouteLagsLinksGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteLagLink> {
  const result = await _linksGetSend(
    context,
    resourceGroupName,
    expressRouteLagName,
    linkName,
    options,
  );
  return _linksGetDeserialize(result);
}

export function _generateLoaSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  body: GenerateExpressRouteLagsLOARequest,
  options: ExpressRouteLagsGenerateLoaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/generateLoa{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      "api%2Dversion": "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: generateExpressRouteLagsLOARequestSerializer(body),
  });
}

export async function _generateLoaDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateExpressRouteLagsLOAResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return generateExpressRouteLagsLOAResultDeserializer(result.body);
}

/** Generate a letter of authorization for the requested ExpressRouteLag resource. */
export async function generateLoa(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  body: GenerateExpressRouteLagsLOARequest,
  options: ExpressRouteLagsGenerateLoaOptionalParams = { requestOptions: {} },
): Promise<GenerateExpressRouteLagsLOAResult> {
  const result = await _generateLoaSend(
    context,
    resourceGroupName,
    expressRouteLagName,
    body,
    options,
  );
  return _generateLoaDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ExpressRouteLagsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/expressRouteLags{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-09-01",
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
): Promise<_ExpressRouteLagListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _expressRouteLagListResultDeserializer(result.body);
}

/** List all the ExpressRouteLag resources in the specified subscription. */
export function list(
  context: Client,
  options: ExpressRouteLagsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteLag> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ExpressRouteLagsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-09-01",
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
): Promise<_ExpressRouteLagListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _expressRouteLagListResultDeserializer(result.body);
}

/** List all the ExpressRouteLag resources in the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ExpressRouteLagsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteLag> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  options: ExpressRouteLagsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      "api%2Dversion": "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified ExpressRouteLag resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  options: ExpressRouteLagsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, expressRouteLagName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  properties: ExpressRouteLagUpdateTagsOrIdentityRequest,
  options: ExpressRouteLagsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      "api%2Dversion": "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: expressRouteLagUpdateTagsOrIdentityRequestSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ExpressRouteLag> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteLagDeserializer(result.body);
}

/** Update ExpressRouteLag tags or identity. */
export async function update(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  properties: ExpressRouteLagUpdateTagsOrIdentityRequest,
  options: ExpressRouteLagsUpdateOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteLag> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    expressRouteLagName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  resource: ExpressRouteLag,
  options: ExpressRouteLagsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      "api%2Dversion": "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: expressRouteLagSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteLag> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteLagDeserializer(result.body);
}

/** Creates or updates the specified ExpressRouteLag resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  resource: ExpressRouteLag,
  options: ExpressRouteLagsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpressRouteLag>, ExpressRouteLag> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, expressRouteLagName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-09-01",
  }) as PollerLike<OperationState<ExpressRouteLag>, ExpressRouteLag>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  options: ExpressRouteLagsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      "api%2Dversion": "2025-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExpressRouteLag> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteLagDeserializer(result.body);
}

/** Retrieves the requested ExpressRouteLag resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  options: ExpressRouteLagsGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteLag> {
  const result = await _getSend(context, resourceGroupName, expressRouteLagName, options);
  return _getDeserialize(result);
}
