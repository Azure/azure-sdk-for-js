// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { Department, _DepartmentListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  departmentDeserializer,
  _departmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DepartmentsListByBillingAccountOptionalParams,
  DepartmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: DepartmentsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments{?api%2Dversion,filter,orderBy,top,skip,search}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      search: options?.search,
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
): Promise<_DepartmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _departmentListResultDeserializer(result.body);
}

/** Lists the departments that a user has access to. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: DepartmentsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Department> {
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
  departmentName: string,
  options: DepartmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      departmentName: departmentName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Department> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return departmentDeserializer(result.body);
}

/** Gets a department by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export async function get(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: DepartmentsGetOptionalParams = { requestOptions: {} },
): Promise<Department> {
  const result = await _getSend(context, billingAccountName, departmentName, options);
  return _getDeserialize(result);
}
