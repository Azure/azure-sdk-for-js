// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotHubContext as Client } from "../index.js";
import type { UserSubscriptionQuotaListResult } from "../../models/models.js";
import {
  errorDetailsDeserializer,
  userSubscriptionQuotaListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ResourceProviderCommonGetSubscriptionQuotaOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSubscriptionQuotaSend(
  context: Client,
  options: ResourceProviderCommonGetSubscriptionQuotaOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Devices/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getSubscriptionQuotaDeserialize(
  result: PathUncheckedResponse,
): Promise<UserSubscriptionQuotaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return userSubscriptionQuotaListResultDeserializer(result.body);
}

/** Get the number of free and paid iot hubs in the subscription */
export async function getSubscriptionQuota(
  context: Client,
  options: ResourceProviderCommonGetSubscriptionQuotaOptionalParams = { requestOptions: {} },
): Promise<UserSubscriptionQuotaListResult> {
  const result = await _getSubscriptionQuotaSend(context, options);
  return _getSubscriptionQuotaDeserialize(result);
}
