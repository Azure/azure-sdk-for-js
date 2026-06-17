// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BillingAccountPoliciesResponse,
  billingAccountPoliciesResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { BillingAccountGetPolicyOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
  return context
    .path(path)
    .get({
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
