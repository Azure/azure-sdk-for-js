// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _TagResourceCollection,
  _tagResourceCollectionDeserializer,
  TagResourceContract,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OperationOperationsListByTagsOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByTagsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: OperationOperationsListByTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operationsByTags{?api%2Dversion,%24filter,%24top,%24skip,includeNotTaggedOperations}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      includeNotTaggedOperations: options?.includeNotTaggedOperations,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TagResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _tagResourceCollectionDeserializer(result.body);
}

/** Lists a collection of operations associated with tags. */
export function listByTags(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: OperationOperationsListByTagsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagResourceContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTagsSend(context, resourceGroupName, serviceName, apiId, options),
    _listByTagsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}
