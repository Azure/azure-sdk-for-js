// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementContext as Client } from "../index.js";
import {
  _EligibleChildResourcesListResult,
  _eligibleChildResourcesListResultDeserializer,
  EligibleChildResource,
} from "../../models/microsoft/authorization/models.js";
import { cloudErrorDeserializer } from "../../models/microsoft/common/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { EligibleChildResourcesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: EligibleChildResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/eligibleChildResources{?api%2Dversion,%24filter}",
    {
      scope: scope,
      "api%2Dversion": "2024-09-01-preview",
      "%24filter": options?.filter,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_EligibleChildResourcesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _eligibleChildResourcesListResultDeserializer(result.body);
}

/** Get the child resources of a resource on which user has eligible access */
export function list(
  context: Client,
  scope: string,
  options: EligibleChildResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EligibleChildResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-09-01-preview" },
  );
}
