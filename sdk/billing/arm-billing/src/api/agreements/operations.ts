// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { Agreement, _AgreementListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  agreementDeserializer,
  _agreementListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AgreementsListByBillingAccountOptionalParams,
  AgreementsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: AgreementsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/agreements{?api%2Dversion,expand}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      expand: options?.expand,
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

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgreementListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _agreementListResultDeserializer(result.body);
}

/** Lists the agreements for a billing account. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: AgreementsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Agreement> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getSend(
  context: Client,
  billingAccountName: string,
  agreementName: string,
  options: AgreementsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/agreements/{agreementName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      agreementName: agreementName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Agreement> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return agreementDeserializer(result.body);
}

/** Gets an agreement by ID. */
export async function get(
  context: Client,
  billingAccountName: string,
  agreementName: string,
  options: AgreementsGetOptionalParams = { requestOptions: {} },
): Promise<Agreement> {
  const result = await _getSend(context, billingAccountName, agreementName, options);
  return _getDeserialize(result);
}
