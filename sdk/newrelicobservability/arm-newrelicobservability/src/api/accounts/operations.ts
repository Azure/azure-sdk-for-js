// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservabilityContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _AccountsListResponse,
  _accountsListResponseDeserializer,
  AccountResource,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { AccountsListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  userEmail: string,
  location: string,
  options: AccountsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/NewRelic.Observability/accounts{?api%2Dversion,userEmail,location}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
      userEmail: userEmail,
      location: location,
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
): Promise<_AccountsListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _accountsListResponseDeserializer(result.body);
}

/** Lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created */
export function list(
  context: Client,
  userEmail: string,
  location: string,
  options: AccountsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccountResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, userEmail, location, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-05-01-preview",
    },
  );
}
