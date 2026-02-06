// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { QuotaItem, _QuotaItemList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  quotaItemDeserializer,
  _quotaItemListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetAppResourceQuotaLimitsAccountListOptionalParams,
  NetAppResourceQuotaLimitsAccountGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: NetAppResourceQuotaLimitsAccountListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/quotaLimits{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_QuotaItemList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _quotaItemListDeserializer(result.body);
}

/** Gets a list of quota limits for all quotas that are under account. Currently PoolsPerAccount is the only one. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: NetAppResourceQuotaLimitsAccountListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<QuotaItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  quotaLimitName: string,
  options: NetAppResourceQuotaLimitsAccountGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/quotaLimits/{quotaLimitName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      quotaLimitName: quotaLimitName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<QuotaItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return quotaItemDeserializer(result.body);
}

/** Get the default, current and usages account quota limit */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  quotaLimitName: string,
  options: NetAppResourceQuotaLimitsAccountGetOptionalParams = { requestOptions: {} },
): Promise<QuotaItem> {
  const result = await _getSend(context, resourceGroupName, accountName, quotaLimitName, options);
  return _getDeserialize(result);
}
