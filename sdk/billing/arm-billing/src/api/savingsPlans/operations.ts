// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  _SavingsPlanModelListResult,
  _SavingsPlanModelList,
  SavingsPlanModel,
  SavingsPlanUpdateRequest,
  SavingsPlanUpdateValidateRequest,
  SavingsPlanValidateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _savingsPlanModelListResultDeserializer,
  _savingsPlanModelListDeserializer,
  savingsPlanModelDeserializer,
  savingsPlanUpdateRequestSerializer,
  savingsPlanUpdateValidateRequestSerializer,
  savingsPlanValidateResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SavingsPlansValidateUpdateByBillingAccountOptionalParams,
  SavingsPlansListBySavingsPlanOrderOptionalParams,
  SavingsPlansUpdateByBillingAccountOptionalParams,
  SavingsPlansGetByBillingAccountOptionalParams,
  SavingsPlansListByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateUpdateByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  body: SavingsPlanUpdateValidateRequest,
  options: SavingsPlansValidateUpdateByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}/validate{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      savingsPlanOrderId: savingsPlanOrderId,
      savingsPlanId: savingsPlanId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: savingsPlanUpdateValidateRequestSerializer(body),
  });
}

export async function _validateUpdateByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<SavingsPlanValidateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return savingsPlanValidateResponseDeserializer(result.body);
}

/** Validate savings plan patch by billing account. */
export async function validateUpdateByBillingAccount(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  body: SavingsPlanUpdateValidateRequest,
  options: SavingsPlansValidateUpdateByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<SavingsPlanValidateResponse> {
  const result = await _validateUpdateByBillingAccountSend(
    context,
    billingAccountName,
    savingsPlanOrderId,
    savingsPlanId,
    body,
    options,
  );
  return _validateUpdateByBillingAccountDeserialize(result);
}

export function _listBySavingsPlanOrderSend(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  options: SavingsPlansListBySavingsPlanOrderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      savingsPlanOrderId: savingsPlanOrderId,
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

export async function _listBySavingsPlanOrderDeserialize(
  result: PathUncheckedResponse,
): Promise<_SavingsPlanModelList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _savingsPlanModelListDeserializer(result.body);
}

/** List savings plans in an order by billing account. */
export function listBySavingsPlanOrder(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  options: SavingsPlansListBySavingsPlanOrderOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SavingsPlanModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySavingsPlanOrderSend(context, billingAccountName, savingsPlanOrderId, options),
    _listBySavingsPlanOrderDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _updateByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  body: SavingsPlanUpdateRequest,
  options: SavingsPlansUpdateByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      savingsPlanOrderId: savingsPlanOrderId,
      savingsPlanId: savingsPlanId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: savingsPlanUpdateRequestSerializer(body),
  });
}

export async function _updateByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<SavingsPlanModel> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return savingsPlanModelDeserializer(result.body);
}

/** Update savings plan by billing account. */
export function updateByBillingAccount(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  body: SavingsPlanUpdateRequest,
  options: SavingsPlansUpdateByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SavingsPlanModel>, SavingsPlanModel> {
  return getLongRunningPoller(context, _updateByBillingAccountDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateByBillingAccountSend(
        context,
        billingAccountName,
        savingsPlanOrderId,
        savingsPlanId,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<SavingsPlanModel>, SavingsPlanModel>;
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  options: SavingsPlansGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}{?api%2Dversion,expand}",
    {
      billingAccountName: billingAccountName,
      savingsPlanOrderId: savingsPlanOrderId,
      savingsPlanId: savingsPlanId,
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
): Promise<SavingsPlanModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return savingsPlanModelDeserializer(result.body);
}

/** Get savings plan by billing account. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  options: SavingsPlansGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<SavingsPlanModel> {
  const result = await _getByBillingAccountSend(
    context,
    billingAccountName,
    savingsPlanOrderId,
    savingsPlanId,
    options,
  );
  return _getByBillingAccountDeserialize(result);
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: SavingsPlansListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/savingsPlans{?api%2Dversion,filter,orderBy,skiptoken,take,selectedState,refreshSummary}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      skiptoken: options?.skiptoken,
      take: options?.take,
      selectedState: options?.selectedState,
      refreshSummary: options?.refreshSummary,
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
): Promise<_SavingsPlanModelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _savingsPlanModelListResultDeserializer(result.body);
}

/** List savings plans by billing account. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: SavingsPlansListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SavingsPlanModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}
