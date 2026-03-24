// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { _TagResourceCollection, TagResourceContract } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _tagResourceCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OperationListByTagsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByTagsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  apiId: string,
  options: OperationListByTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/apis/{apiId}/operationsByTags{?api%2Dversion,%24filter,%24top,%24skip,includeNotTaggedOperations}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      apiId: apiId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      includeNotTaggedOperations: options?.includeNotTaggedOperations,
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

export async function _listByTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<_TagResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

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
  options: OperationListByTagsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TagResourceContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTagsSend(context, resourceGroupName, serviceName, apiId, options),
    _listByTagsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}
