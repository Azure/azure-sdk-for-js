// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _EntityListResult,
  _entityListResultDeserializer,
  EntityInfo,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { EntitiesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: EntitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/getEntities{?api%2Dversion,%24skiptoken,%24skip,%24top,%24select,%24search,%24filter,%24view,groupName}",
    {
      "api%2Dversion": context.apiVersion ?? "2023-04-01",
      "%24skiptoken": options?.skiptoken,
      "%24skip": options?.skip,
      "%24top": options?.top,
      "%24select": options?.select,
      "%24search": options?.search,
      "%24filter": options?.filter,
      "%24view": options?.view,
      groupName: options?.groupName,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "cache-control": options?.cacheControl ?? "no-cache",
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_EntityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _entityListResultDeserializer(result.body);
}

/** List all entities (Management Groups, Subscriptions, etc.) for the authenticated user. */
export function list(
  context: Client,
  options: EntitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EntityInfo> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2023-04-01" },
  );
}
