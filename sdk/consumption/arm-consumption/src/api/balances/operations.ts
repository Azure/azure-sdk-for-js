// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext as Client } from "../index.js";
import type { Balance } from "../../models/models.js";
import { errorResponseDeserializer, balanceDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BalancesGetForBillingPeriodByBillingAccountOptionalParams,
  BalancesGetByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getForBillingPeriodByBillingAccountSend(
  context: Client,
  billingAccountId: string,
  billingPeriodName: string,
  options: BalancesGetForBillingPeriodByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingPeriods/{billingPeriodName}/providers/Microsoft.Consumption/balances{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      billingPeriodName: billingPeriodName,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
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

export async function _getForBillingPeriodByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<Balance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return balanceDeserializer(result.body);
}

/** Gets the balances for a scope by billing period and billingAccountId. Balances are available via this API only for May 1, 2014 or later. */
export async function getForBillingPeriodByBillingAccount(
  context: Client,
  billingAccountId: string,
  billingPeriodName: string,
  options: BalancesGetForBillingPeriodByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<Balance> {
  const result = await _getForBillingPeriodByBillingAccountSend(
    context,
    billingAccountId,
    billingPeriodName,
    options,
  );
  return _getForBillingPeriodByBillingAccountDeserialize(result);
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountId: string,
  options: BalancesGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Consumption/balances{?api%2Dversion}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
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

export async function _getByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<Balance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return balanceDeserializer(result.body);
}

/** Gets the balances for a scope by billingAccountId. Balances are available via this API only for May 1, 2014 or later. */
export async function getByBillingAccount(
  context: Client,
  billingAccountId: string,
  options: BalancesGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<Balance> {
  const result = await _getByBillingAccountSend(context, billingAccountId, options);
  return _getByBillingAccountDeserialize(result);
}
