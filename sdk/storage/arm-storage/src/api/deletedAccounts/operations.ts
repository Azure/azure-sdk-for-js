// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext as Client } from "../index.js";
import type { DeletedAccount, _DeletedAccountListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  deletedAccountDeserializer,
  _deletedAccountListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeletedAccountsListOptionalParams,
  DeletedAccountsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: DeletedAccountsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/deletedAccounts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
): Promise<_DeletedAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _deletedAccountListResultDeserializer(result.body);
}

/** Lists deleted accounts under the subscription. */
export function list(
  context: Client,
  options: DeletedAccountsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedAccount> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _getSend(
  context: Client,
  deletedAccountName: string,
  location: string,
  options: DeletedAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Storage/locations/{location}/deletedAccounts/{deletedAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      deletedAccountName: deletedAccountName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeletedAccount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return deletedAccountDeserializer(result.body);
}

/** Get properties of specified deleted account resource. */
export async function get(
  context: Client,
  deletedAccountName: string,
  location: string,
  options: DeletedAccountsGetOptionalParams = { requestOptions: {} },
): Promise<DeletedAccount> {
  const result = await _getSend(context, deletedAccountName, location, options);
  return _getDeserialize(result);
}
