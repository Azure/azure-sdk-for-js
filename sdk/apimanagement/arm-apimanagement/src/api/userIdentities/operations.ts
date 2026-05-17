// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  UserIdentityContract,
  _UserIdentityCollection,
  _userIdentityCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { UserIdentitiesListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserIdentitiesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/users/{userId}/identities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
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
): Promise<_UserIdentityCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _userIdentityCollectionDeserializer(result.body);
}

/** List of all user identities. */
export function list(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  userId: string,
  options: UserIdentitiesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UserIdentityContract> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, serviceName, userId, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}
