// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { EnrollmentAccount, _EnrollmentAccountListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  enrollmentAccountDeserializer,
  _enrollmentAccountListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EnrollmentAccountsListByBillingAccountOptionalParams,
  EnrollmentAccountsGetOptionalParams,
  EnrollmentAccountsListByDepartmentOptionalParams,
  EnrollmentAccountsGetByDepartmentOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: EnrollmentAccountsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts{?api%2Dversion,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
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
): Promise<_EnrollmentAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _enrollmentAccountListResultDeserializer(result.body);
}

/** Lists the enrollment accounts for a billing account. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: EnrollmentAccountsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnrollmentAccount> {
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
  enrollmentAccountName: string,
  options: EnrollmentAccountsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      enrollmentAccountName: enrollmentAccountName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<EnrollmentAccount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return enrollmentAccountDeserializer(result.body);
}

/** Gets an enrollment account by ID. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export async function get(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: EnrollmentAccountsGetOptionalParams = { requestOptions: {} },
): Promise<EnrollmentAccount> {
  const result = await _getSend(context, billingAccountName, enrollmentAccountName, options);
  return _getDeserialize(result);
}

export function _listByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: EnrollmentAccountsListByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/enrollmentAccounts{?api%2Dversion,filter,orderBy,top,skip,count,search}",
    {
      billingAccountName: billingAccountName,
      departmentName: departmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      top: options?.top,
      skip: options?.skip,
      count: options?.count,
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

export async function _listByDepartmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_EnrollmentAccountListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _enrollmentAccountListResultDeserializer(result.body);
}

/** Lists the enrollment accounts for a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export function listByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: EnrollmentAccountsListByDepartmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EnrollmentAccount> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDepartmentSend(context, billingAccountName, departmentName, options),
    _listByDepartmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  enrollmentAccountName: string,
  options: EnrollmentAccountsGetByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/enrollmentAccounts/{enrollmentAccountName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      departmentName: departmentName,
      enrollmentAccountName: enrollmentAccountName,
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

export async function _getByDepartmentDeserialize(
  result: PathUncheckedResponse,
): Promise<EnrollmentAccount> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return enrollmentAccountDeserializer(result.body);
}

/** Gets an enrollment account by department. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export async function getByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  enrollmentAccountName: string,
  options: EnrollmentAccountsGetByDepartmentOptionalParams = { requestOptions: {} },
): Promise<EnrollmentAccount> {
  const result = await _getByDepartmentSend(
    context,
    billingAccountName,
    departmentName,
    enrollmentAccountName,
    options,
  );
  return _getByDepartmentDeserialize(result);
}
