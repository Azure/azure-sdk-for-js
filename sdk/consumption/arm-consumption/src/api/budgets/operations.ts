// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Budget,
  budgetSerializer,
  budgetDeserializer,
  _BudgetsListResult,
  _budgetsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  BudgetsListOptionalParams,
  BudgetsDeleteOptionalParams,
  BudgetsCreateOrUpdateOptionalParams,
  BudgetsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: BudgetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Consumption/budgets{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_BudgetsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _budgetsListResultDeserializer(result.body);
}

/** Lists all budgets for the defined scope. */
export function list(
  context: Client,
  scope: string,
  options: BudgetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Budget> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  budgetName: string,
  options: BudgetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Consumption/budgets/{budgetName}{?api%2Dversion}",
    {
      scope: scope,
      budgetName: budgetName,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The operation to delete a budget. */
export async function $delete(
  context: Client,
  scope: string,
  budgetName: string,
  options: BudgetsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, budgetName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  budgetName: string,
  parameters: Budget,
  options: BudgetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Consumption/budgets/{budgetName}{?api%2Dversion}",
    {
      scope: scope,
      budgetName: budgetName,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: budgetSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Budget> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return budgetDeserializer(result.body);
}

/** The operation to create or update a budget. You can optionally provide an eTag if desired as a form of concurrency control. To obtain the latest eTag for a given budget, perform a get operation prior to your put operation. */
export async function createOrUpdate(
  context: Client,
  scope: string,
  budgetName: string,
  parameters: Budget,
  options: BudgetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Budget> {
  const result = await _createOrUpdateSend(context, scope, budgetName, parameters, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  budgetName: string,
  options: BudgetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Consumption/budgets/{budgetName}{?api%2Dversion}",
    {
      scope: scope,
      budgetName: budgetName,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Budget> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return budgetDeserializer(result.body);
}

/** Gets the budget for the scope by budget name. */
export async function get(
  context: Client,
  scope: string,
  budgetName: string,
  options: BudgetsGetOptionalParams = { requestOptions: {} },
): Promise<Budget> {
  const result = await _getSend(context, scope, budgetName, options);
  return _getDeserialize(result);
}
