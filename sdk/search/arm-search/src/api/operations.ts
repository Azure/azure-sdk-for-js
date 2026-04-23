// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext as Client } from "./index.js";
import type { QuotaUsageResult } from "../models/models.js";
import { quotaUsageResultDeserializer, cloudErrorDeserializer } from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { UsageBySubscriptionSkuOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _usageBySubscriptionSkuSend(
  context: Client,
  location: string,
  skuName: string,
  options: UsageBySubscriptionSkuOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Search/locations/{location}/usages/{skuName}{?api%2Dversion}",
    {
      location: location,
      subscriptionId: context.subscriptionId,
      skuName: skuName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _usageBySubscriptionSkuDeserialize(
  result: PathUncheckedResponse,
): Promise<QuotaUsageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return quotaUsageResultDeserializer(result.body);
}

/** Gets the quota usage for a search SKU in the given subscription. */
export async function usageBySubscriptionSku(
  context: Client,
  location: string,
  skuName: string,
  options: UsageBySubscriptionSkuOptionalParams = { requestOptions: {} },
): Promise<QuotaUsageResult> {
  const result = await _usageBySubscriptionSkuSend(context, location, skuName, options);
  return _usageBySubscriptionSkuDeserialize(result);
}
