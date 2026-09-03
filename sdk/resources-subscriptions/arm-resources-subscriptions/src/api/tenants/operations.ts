// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  _TenantListResult,
  _tenantListResultDeserializer,
  TenantIdDescription,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { TenantsListOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: TenantsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/tenants{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2022-12-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_TenantListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _tenantListResultDeserializer(result.body);
}

/** Gets the tenants for your account. */
export function list(
  context: Client,
  options: TenantsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TenantIdDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2022-12-01" },
  );
}
