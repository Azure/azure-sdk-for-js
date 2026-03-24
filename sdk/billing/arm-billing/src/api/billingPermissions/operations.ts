// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  _BillingPermissionListResult,
  BillingPermission,
  CheckAccessRequest,
  BillingPermissionsCheckAccessByInvoiceSectionResponse,
  BillingPermissionsCheckAccessByEnrollmentAccountResponse,
  BillingPermissionsCheckAccessByDepartmentResponse,
  BillingPermissionsCheckAccessByCustomerResponse,
  BillingPermissionsCheckAccessByBillingProfileResponse,
  BillingPermissionsCheckAccessByBillingAccountResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _billingPermissionListResultDeserializer,
  checkAccessRequestSerializer,
  checkAccessResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BillingPermissionsCheckAccessByInvoiceSectionOptionalParams,
  BillingPermissionsListByInvoiceSectionOptionalParams,
  BillingPermissionsCheckAccessByEnrollmentAccountOptionalParams,
  BillingPermissionsListByEnrollmentAccountOptionalParams,
  BillingPermissionsCheckAccessByDepartmentOptionalParams,
  BillingPermissionsListByDepartmentOptionalParams,
  BillingPermissionsListByCustomerAtBillingAccountOptionalParams,
  BillingPermissionsCheckAccessByCustomerOptionalParams,
  BillingPermissionsListByCustomerOptionalParams,
  BillingPermissionsCheckAccessByBillingProfileOptionalParams,
  BillingPermissionsListByBillingProfileOptionalParams,
  BillingPermissionsCheckAccessByBillingAccountOptionalParams,
  BillingPermissionsListByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkAccessByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/checkAccess{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
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
    body: checkAccessRequestSerializer(parameters),
  });
}

export async function _checkAccessByInvoiceSectionDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingPermissionsCheckAccessByInvoiceSectionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return checkAccessResponseDeserializer(p);
    }),
  };
}

/** Provides a list of check access response objects for an invoice section. */
export async function checkAccessByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByInvoiceSectionOptionalParams = { requestOptions: {} },
): Promise<BillingPermissionsCheckAccessByInvoiceSectionResponse> {
  const result = await _checkAccessByInvoiceSectionSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    parameters,
    options,
  );
  return _checkAccessByInvoiceSectionDeserialize(result);
}

export function _listByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingPermissionsListByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/billingPermissions{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
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

export async function _listByInvoiceSectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingPermissionListResultDeserializer(result.body);
}

/** Lists the billing permissions the caller has for an invoice section. */
export function listByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingPermissionsListByInvoiceSectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingPermission> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByInvoiceSectionSend(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    _listByInvoiceSectionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _checkAccessByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByEnrollmentAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/checkAccess{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      enrollmentAccountName: enrollmentAccountName,
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
    body: checkAccessRequestSerializer(parameters),
  });
}

export async function _checkAccessByEnrollmentAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingPermissionsCheckAccessByEnrollmentAccountResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return checkAccessResponseDeserializer(p);
    }),
  };
}

/** Provides a list of check access response objects for an enrollment account. */
export async function checkAccessByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByEnrollmentAccountOptionalParams = { requestOptions: {} },
): Promise<BillingPermissionsCheckAccessByEnrollmentAccountResponse> {
  const result = await _checkAccessByEnrollmentAccountSend(
    context,
    billingAccountName,
    enrollmentAccountName,
    parameters,
    options,
  );
  return _checkAccessByEnrollmentAccountDeserialize(result);
}

export function _listByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: BillingPermissionsListByEnrollmentAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingPermissions{?api%2Dversion}",
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

export async function _listByEnrollmentAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingPermissionListResultDeserializer(result.body);
}

/** Lists the billing permissions the caller has for an enrollment account. */
export function listByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: BillingPermissionsListByEnrollmentAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingPermission> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEnrollmentAccountSend(context, billingAccountName, enrollmentAccountName, options),
    _listByEnrollmentAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _checkAccessByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/checkAccess{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      departmentName: departmentName,
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
    body: checkAccessRequestSerializer(parameters),
  });
}

export async function _checkAccessByDepartmentDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingPermissionsCheckAccessByDepartmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return checkAccessResponseDeserializer(p);
    }),
  };
}

/** Provides a list of check access response objects for a department. */
export async function checkAccessByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByDepartmentOptionalParams = { requestOptions: {} },
): Promise<BillingPermissionsCheckAccessByDepartmentResponse> {
  const result = await _checkAccessByDepartmentSend(
    context,
    billingAccountName,
    departmentName,
    parameters,
    options,
  );
  return _checkAccessByDepartmentDeserialize(result);
}

export function _listByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: BillingPermissionsListByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/billingPermissions{?api%2Dversion}",
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

export async function _listByDepartmentDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingPermissionListResultDeserializer(result.body);
}

/** Lists the billing permissions the caller has for a department. */
export function listByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: BillingPermissionsListByDepartmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingPermission> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDepartmentSend(context, billingAccountName, departmentName, options),
    _listByDepartmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByCustomerAtBillingAccountSend(
  context: Client,
  billingAccountName: string,
  customerName: string,
  options: BillingPermissionsListByCustomerAtBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/customers/{customerName}/billingPermissions{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      customerName: customerName,
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

export async function _listByCustomerAtBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingPermissionListResultDeserializer(result.body);
}

/** Lists the billing permissions the caller has for a customer at billing account level. */
export function listByCustomerAtBillingAccount(
  context: Client,
  billingAccountName: string,
  customerName: string,
  options: BillingPermissionsListByCustomerAtBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingPermission> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCustomerAtBillingAccountSend(context, billingAccountName, customerName, options),
    _listByCustomerAtBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _checkAccessByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/checkAccess{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
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
    body: checkAccessRequestSerializer(parameters),
  });
}

export async function _checkAccessByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingPermissionsCheckAccessByCustomerResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return checkAccessResponseDeserializer(p);
    }),
  };
}

/** Provides a list of check access response objects for a customer. */
export async function checkAccessByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByCustomerOptionalParams = { requestOptions: {} },
): Promise<BillingPermissionsCheckAccessByCustomerResponse> {
  const result = await _checkAccessByCustomerSend(
    context,
    billingAccountName,
    billingProfileName,
    customerName,
    parameters,
    options,
  );
  return _checkAccessByCustomerDeserialize(result);
}

export function _listByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingPermissionsListByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/billingPermissions{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
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

export async function _listByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingPermissionListResultDeserializer(result.body);
}

/** Lists the billing permissions the caller has for a customer. */
export function listByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingPermissionsListByCustomerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingPermission> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByCustomerSend(context, billingAccountName, billingProfileName, customerName, options),
    _listByCustomerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _checkAccessByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/checkAccess{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
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
    body: checkAccessRequestSerializer(parameters),
  });
}

export async function _checkAccessByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingPermissionsCheckAccessByBillingProfileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return checkAccessResponseDeserializer(p);
    }),
  };
}

/** Provides a list of check access response objects for a billing profile. */
export async function checkAccessByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByBillingProfileOptionalParams = { requestOptions: {} },
): Promise<BillingPermissionsCheckAccessByBillingProfileResponse> {
  const result = await _checkAccessByBillingProfileSend(
    context,
    billingAccountName,
    billingProfileName,
    parameters,
    options,
  );
  return _checkAccessByBillingProfileDeserialize(result);
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingPermissionsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/billingPermissions{?api%2Dversion}",
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

export async function _listByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingPermissionListResultDeserializer(result.body);
}

/** Lists the billing permissions the caller has on a billing profile. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingPermissionsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingPermission> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountName, billingProfileName, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _checkAccessByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/checkAccess{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
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
    body: checkAccessRequestSerializer(parameters),
  });
}

export async function _checkAccessByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingPermissionsCheckAccessByBillingAccountResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return checkAccessResponseDeserializer(p);
    }),
  };
}

/** Provides a list of check access response objects for a billing account. */
export async function checkAccessByBillingAccount(
  context: Client,
  billingAccountName: string,
  parameters: CheckAccessRequest,
  options: BillingPermissionsCheckAccessByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<BillingPermissionsCheckAccessByBillingAccountResponse> {
  const result = await _checkAccessByBillingAccountSend(
    context,
    billingAccountName,
    parameters,
    options,
  );
  return _checkAccessByBillingAccountDeserialize(result);
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: BillingPermissionsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingPermissions{?api%2Dversion}",
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

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingPermissionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingPermissionListResultDeserializer(result.body);
}

/** Lists the billing permissions the caller has on a billing account. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: BillingPermissionsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingPermission> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}
