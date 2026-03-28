// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext as Client } from "../index.js";
import type { BillingAccountPoliciesResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  billingAccountPoliciesResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BillingAccountGetPolicyOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getPolicySend(
  context: Client,
  billingAccountId: string,
  options: BillingAccountGetPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Subscription/policies/default{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingAccountPoliciesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingAccountPoliciesResponseDeserializer(result.body);
}

/** Get Billing Account Policy. */
export async function getPolicy(
  context: Client,
  billingAccountId: string,
  options: BillingAccountGetPolicyOptionalParams = { requestOptions: {} },
): Promise<BillingAccountPoliciesResponse> {
  const result = await _getPolicySend(context, billingAccountId, options);
  return _getPolicyDeserialize(result);
}
