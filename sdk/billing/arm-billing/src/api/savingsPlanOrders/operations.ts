// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { SavingsPlanOrderModel, _SavingsPlanOrderModelList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  savingsPlanOrderModelDeserializer,
  _savingsPlanOrderModelListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SavingsPlanOrdersListByBillingAccountOptionalParams,
  SavingsPlanOrdersGetByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: SavingsPlanOrdersListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/savingsPlanOrders{?api%2Dversion,filter,orderBy,skiptoken}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      skiptoken: options?.skiptoken,
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
): Promise<_SavingsPlanOrderModelList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _savingsPlanOrderModelListDeserializer(result.body);
}

/** List all Savings plan orders by billing account. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: SavingsPlanOrdersListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SavingsPlanOrderModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  options: SavingsPlanOrdersGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/savingsPlanOrders/{savingsPlanOrderId}{?api%2Dversion,expand}",
    {
      billingAccountName: billingAccountName,
      savingsPlanOrderId: savingsPlanOrderId,
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

export async function _getByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<SavingsPlanOrderModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return savingsPlanOrderModelDeserializer(result.body);
}

/** Get a savings plan order by billing account. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  options: SavingsPlanOrdersGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<SavingsPlanOrderModel> {
  const result = await _getByBillingAccountSend(
    context,
    billingAccountName,
    savingsPlanOrderId,
    options,
  );
  return _getByBillingAccountDeserialize(result);
}
