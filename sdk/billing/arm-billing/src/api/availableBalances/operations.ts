// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { AvailableBalance } from "../../models/models.js";
import { errorResponseDeserializer, availableBalanceDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AvailableBalancesGetByBillingProfileOptionalParams,
  AvailableBalancesGetByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: AvailableBalancesGetByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/availableBalance/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailableBalance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return availableBalanceDeserializer(result.body);
}

/** The Available Credit or Payment on Account Balance for a billing profile. The credit balance can be used to settle due or past due invoices and is supported for billing accounts with agreement type Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export async function getByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: AvailableBalancesGetByBillingProfileOptionalParams = { requestOptions: {} },
): Promise<AvailableBalance> {
  const result = await _getByBillingProfileSend(
    context,
    billingAccountName,
    billingProfileName,
    options,
  );
  return _getByBillingProfileDeserialize(result);
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: AvailableBalancesGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/availableBalance/default{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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
): Promise<AvailableBalance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return availableBalanceDeserializer(result.body);
}

/** The Available Credit or Payment on Account Balance for a billing account. The credit balance can be used to settle due or past due invoices and is supported for billing accounts with agreement type Microsoft Customer Agreement. The payment on account balance is supported for billing accounts with agreement type Microsoft Customer Agreement or Microsoft Online Services Program. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: AvailableBalancesGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<AvailableBalance> {
  const result = await _getByBillingAccountSend(context, billingAccountName, options);
  return _getByBillingAccountDeserialize(result);
}
