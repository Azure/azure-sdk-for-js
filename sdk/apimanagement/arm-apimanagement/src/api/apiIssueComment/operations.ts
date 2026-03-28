// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { IssueCommentContract, _IssueCommentCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  issueCommentContractSerializer,
  issueCommentContractDeserializer,
  _issueCommentCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ApiIssueCommentListByServiceOptionalParams,
  ApiIssueCommentDeleteOptionalParams,
  ApiIssueCommentCreateOrUpdateOptionalParams,
  ApiIssueCommentGetEntityTagOptionalParams,
  ApiIssueCommentGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  options: ApiIssueCommentListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments{?api%2Dversion,%24filter,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      issueId: issueId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_IssueCommentCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _issueCommentCollectionDeserializer(result.body);
}

/** Lists all comments for the Issue associated with the specified API. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  options: ApiIssueCommentListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IssueCommentContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, serviceName, apiId, issueId, options),
    _listByServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  commentId: string,
  ifMatch: string,
  options: ApiIssueCommentDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments/{commentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      issueId: issueId,
      commentId: commentId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
  });
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

/** Deletes the specified comment from an Issue. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  commentId: string,
  ifMatch: string,
  options: ApiIssueCommentDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    issueId,
    commentId,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  commentId: string,
  parameters: IssueCommentContract,
  options: ApiIssueCommentCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments/{commentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      issueId: issueId,
      commentId: commentId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: issueCommentContractSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IssueCommentContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return issueCommentContractDeserializer(result.body);
}

/** Creates a new Comment for the Issue in an API or updates an existing one. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  commentId: string,
  parameters: IssueCommentContract,
  options: ApiIssueCommentCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<IssueCommentContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    issueId,
    commentId,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getEntityTagSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  commentId: string,
  options: ApiIssueCommentGetEntityTagOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments/{commentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      issueId: issueId,
      commentId: commentId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _getEntityTagDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Gets the entity state (Etag) version of the issue Comment for an API specified by its identifier. */
export async function getEntityTag(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  commentId: string,
  options: ApiIssueCommentGetEntityTagOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getEntityTagSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    issueId,
    commentId,
    options,
  );
  return _getEntityTagDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  commentId: string,
  options: ApiIssueCommentGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/issues/{issueId}/comments/{commentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      issueId: issueId,
      commentId: commentId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<IssueCommentContract> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return issueCommentContractDeserializer(result.body);
}

/** Gets the details of the issue Comment for an API specified by its identifier. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  issueId: string,
  commentId: string,
  options: ApiIssueCommentGetOptionalParams = { requestOptions: {} },
): Promise<IssueCommentContract> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serviceName,
    apiId,
    issueId,
    commentId,
    options,
  );
  return _getDeserialize(result);
}
