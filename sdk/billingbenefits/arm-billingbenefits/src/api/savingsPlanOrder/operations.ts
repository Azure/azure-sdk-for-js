// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BillingBenefitsRPContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SavingsPlanOrderModel,
  savingsPlanOrderModelDeserializer,
  _SavingsPlanOrderModelList,
  _savingsPlanOrderModelListDeserializer,
  RoleAssignmentEntity,
  roleAssignmentEntityDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SavingsPlanOrderElevateOptionalParams,
  SavingsPlanOrderListOptionalParams,
  SavingsPlanOrderGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _elevateSend(
  context: Client,
  savingsPlanOrderId: string,
  options: SavingsPlanOrderElevateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}/elevate{?api%2Dversion}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _elevateDeserialize(
  result: PathUncheckedResponse,
): Promise<RoleAssignmentEntity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return roleAssignmentEntityDeserializer(result.body);
}

/** Elevate as owner on savings plan order based on billing permissions. */
export async function elevate(
  context: Client,
  savingsPlanOrderId: string,
  options: SavingsPlanOrderElevateOptionalParams = { requestOptions: {} },
): Promise<RoleAssignmentEntity> {
  const result = await _elevateSend(context, savingsPlanOrderId, options);
  return _elevateDeserialize(result);
}

export function _listSend(
  context: Client,
  options: SavingsPlanOrderListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrders{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SavingsPlanOrderModelList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _savingsPlanOrderModelListDeserializer(result.body);
}

/** List all Savings plan orders. */
export function list(
  context: Client,
  options: SavingsPlanOrderListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SavingsPlanOrderModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-12-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  savingsPlanOrderId: string,
  options: SavingsPlanOrderGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.BillingBenefits/savingsPlanOrders/{savingsPlanOrderId}{?api%2Dversion,%24expand}",
    {
      savingsPlanOrderId: savingsPlanOrderId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01-preview",
      "%24expand": options?.expand,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SavingsPlanOrderModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return savingsPlanOrderModelDeserializer(result.body);
}

/** Get a savings plan order. */
export async function get(
  context: Client,
  savingsPlanOrderId: string,
  options: SavingsPlanOrderGetOptionalParams = { requestOptions: {} },
): Promise<SavingsPlanOrderModel> {
  const result = await _getSend(context, savingsPlanOrderId, options);
  return _getDeserialize(result);
}
