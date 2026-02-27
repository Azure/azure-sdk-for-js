// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  DevOpsInfrastructureContext as Client,
  SubscriptionUsagesUsagesOptionalParams,
} from "../index.js";
import type { _PagedQuota, Quota } from "../../models/models.js";
import { _pagedQuotaDeserializer } from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _subscriptionUsagesUsagesSend(
  context: Client,
  subscriptionId: string,
  location: string,
  options: SubscriptionUsagesUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DevOpsInfrastructure/locations/{location}/usages",
      subscriptionId,
      location,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _subscriptionUsagesUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedQuota> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedQuotaDeserializer(result.body);
}

/** List Quota resources by subscription ID */
export function subscriptionUsagesUsages(
  context: Client,
  subscriptionId: string,
  location: string,
  options: SubscriptionUsagesUsagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Quota> {
  return buildPagedAsyncIterator(
    context,
    () => _subscriptionUsagesUsagesSend(context, subscriptionId, location, options),
    _subscriptionUsagesUsagesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
