// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SavingsPlanModel,
  savingsPlanModelDeserializer,
  SavingsPlanUpdateRequest,
  savingsPlanUpdateRequestSerializer,
  _SavingsPlanModelList,
  _savingsPlanModelListDeserializer,
  SavingsPlanUpdateValidateRequest,
  savingsPlanUpdateValidateRequestSerializer,
  SavingsPlanValidateResponse,
  savingsPlanValidateResponseDeserializer,
  _SavingsPlanModelListResult,
  _savingsPlanModelListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SavingsPlanListAllOptionalParams,
  SavingsPlanValidateUpdateOptionalParams,
  SavingsPlanListOptionalParams,
  SavingsPlanUpdateOptionalParams,
  SavingsPlanGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: SavingsPlanListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlans{?api%2Dversion,%24filter,%24orderby,refreshSummary,%24skiptoken,selectedState,take}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      refreshSummary: options?.refreshSummary,
      "%24skiptoken": options?.skiptoken,
      selectedState: options?.selectedState,
      take: options?.take,
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

export async function _listAllDeserialize(
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

/** List savings plans. */
export function listAll(
  context: Client,
  options: SavingsPlanListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SavingsPlanModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _validateUpdateSend(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  body: SavingsPlanUpdateValidateRequest,
  options: SavingsPlanValidateUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}/validate{?api%2Dversion}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      savingsPlanId: savingsPlanId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _validateUpdateDeserialize(
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

/** Validate savings plan patch. */
export async function validateUpdate(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  body: SavingsPlanUpdateValidateRequest,
  options: SavingsPlanValidateUpdateOptionalParams = { requestOptions: {} },
): Promise<SavingsPlanValidateResponse> {
  const result = await _validateUpdateSend(
    context,
    savingsPlanOrderId,
    savingsPlanId,
    body,
    options,
  );
  return _validateUpdateDeserialize(result);
}

export function _listSend(
  context: Client,
  savingsPlanOrderId: string,
  options: SavingsPlanListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans{?api%2Dversion}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listDeserialize(
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

/** List savings plans in an order. */
export function list(
  context: Client,
  savingsPlanOrderId: string,
  options: SavingsPlanListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SavingsPlanModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, savingsPlanOrderId, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  body: SavingsPlanUpdateRequest,
  options: SavingsPlanUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}{?api%2Dversion}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      savingsPlanId: savingsPlanId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SavingsPlanModel> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return savingsPlanModelDeserializer(result.body);
}

/** Update savings plan. */
export function update(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  body: SavingsPlanUpdateRequest,
  options: SavingsPlanUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SavingsPlanModel>, SavingsPlanModel> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, savingsPlanOrderId, savingsPlanId, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01-preview",
  }) as PollerLike<OperationState<SavingsPlanModel>, SavingsPlanModel>;
}

export function _getSend(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  options: SavingsPlanGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/savingsPlans/{savingsPlanId}{?api%2Dversion,%24expand}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      savingsPlanId: savingsPlanId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
      "%24expand": options?.expand,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SavingsPlanModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return savingsPlanModelDeserializer(result.body);
}

/** Get savings plan. */
export async function get(
  context: Client,
  savingsPlanOrderId: string,
  savingsPlanId: string,
  options: SavingsPlanGetOptionalParams = { requestOptions: {} },
): Promise<SavingsPlanModel> {
  const result = await _getSend(context, savingsPlanOrderId, savingsPlanId, options);
  return _getDeserialize(result);
}
