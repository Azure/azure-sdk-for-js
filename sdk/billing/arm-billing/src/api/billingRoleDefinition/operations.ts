// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  BillingRoleDefinition,
  _BillingRoleDefinitionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  billingRoleDefinitionDeserializer,
  _billingRoleDefinitionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BillingRoleDefinitionListByEnrollmentAccountOptionalParams,
  BillingRoleDefinitionGetByEnrollmentAccountOptionalParams,
  BillingRoleDefinitionListByDepartmentOptionalParams,
  BillingRoleDefinitionGetByDepartmentOptionalParams,
  BillingRoleDefinitionListByBillingAccountOptionalParams,
  BillingRoleDefinitionGetByBillingAccountOptionalParams,
  BillingRoleDefinitionListByInvoiceSectionOptionalParams,
  BillingRoleDefinitionGetByInvoiceSectionOptionalParams,
  BillingRoleDefinitionListByCustomerOptionalParams,
  BillingRoleDefinitionGetByCustomerOptionalParams,
  BillingRoleDefinitionListByBillingProfileOptionalParams,
  BillingRoleDefinitionGetByBillingProfileOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: BillingRoleDefinitionListByEnrollmentAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingRoleDefinitions{?api%2Dversion}",
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
): Promise<_BillingRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleDefinitionListResultDeserializer(result.body);
}

/** List the definition for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
export function listByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: BillingRoleDefinitionListByEnrollmentAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEnrollmentAccountSend(context, billingAccountName, enrollmentAccountName, options),
    _listByEnrollmentAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByEnrollmentAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingRoleDefinitions/{roleDefinitionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      enrollmentAccountName: enrollmentAccountName,
      roleDefinitionName: roleDefinitionName,
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

export async function _getByEnrollmentAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleDefinitionDeserializer(result.body);
}

/** Gets the definition for a role on an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
export async function getByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByEnrollmentAccountOptionalParams = { requestOptions: {} },
): Promise<BillingRoleDefinition> {
  const result = await _getByEnrollmentAccountSend(
    context,
    billingAccountName,
    enrollmentAccountName,
    roleDefinitionName,
    options,
  );
  return _getByEnrollmentAccountDeserialize(result);
}

export function _listByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: BillingRoleDefinitionListByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/billingRoleDefinitions{?api%2Dversion}",
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
): Promise<_BillingRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleDefinitionListResultDeserializer(result.body);
}

/** List the definition for a department. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
export function listByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: BillingRoleDefinitionListByDepartmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleDefinition> {
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
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/billingRoleDefinitions/{roleDefinitionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      departmentName: departmentName,
      roleDefinitionName: roleDefinitionName,
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
): Promise<BillingRoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleDefinitionDeserializer(result.body);
}

/** Gets the definition for a role on a department. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
export async function getByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByDepartmentOptionalParams = { requestOptions: {} },
): Promise<BillingRoleDefinition> {
  const result = await _getByDepartmentSend(
    context,
    billingAccountName,
    departmentName,
    roleDefinitionName,
    options,
  );
  return _getByDepartmentDeserialize(result);
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: BillingRoleDefinitionListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingRoleDefinitions{?api%2Dversion}",
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
): Promise<_BillingRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleDefinitionListResultDeserializer(result.body);
}

/** Lists the role definitions for a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: BillingRoleDefinitionListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleDefinition> {
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
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingRoleDefinitions/{roleDefinitionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      roleDefinitionName: roleDefinitionName,
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
): Promise<BillingRoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleDefinitionDeserializer(result.body);
}

/** Gets the definition for a role on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<BillingRoleDefinition> {
  const result = await _getByBillingAccountSend(
    context,
    billingAccountName,
    roleDefinitionName,
    options,
  );
  return _getByBillingAccountDeserialize(result);
}

export function _listByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingRoleDefinitionListByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/billingRoleDefinitions{?api%2Dversion}",
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
): Promise<_BillingRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleDefinitionListResultDeserializer(result.body);
}

/** Lists the role definitions for an invoice section. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function listByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingRoleDefinitionListByInvoiceSectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleDefinition> {
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

export function _getByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/billingRoleDefinitions/{roleDefinitionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      roleDefinitionName: roleDefinitionName,
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

export async function _getByInvoiceSectionDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleDefinitionDeserializer(result.body);
}

/** Gets the definition for a role on an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
export async function getByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByInvoiceSectionOptionalParams = { requestOptions: {} },
): Promise<BillingRoleDefinition> {
  const result = await _getByInvoiceSectionSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    roleDefinitionName,
    options,
  );
  return _getByInvoiceSectionDeserialize(result);
}

export function _listByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingRoleDefinitionListByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/billingRoleDefinitions{?api%2Dversion}",
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
): Promise<_BillingRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleDefinitionListResultDeserializer(result.body);
}

/** Lists the role definitions for a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
export function listByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingRoleDefinitionListByCustomerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleDefinition> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByCustomerSend(context, billingAccountName, billingProfileName, customerName, options),
    _listByCustomerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/billingRoleDefinitions/{roleDefinitionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      roleDefinitionName: roleDefinitionName,
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

export async function _getByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleDefinitionDeserializer(result.body);
}

/** Gets the definition for a role on a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
export async function getByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByCustomerOptionalParams = { requestOptions: {} },
): Promise<BillingRoleDefinition> {
  const result = await _getByCustomerSend(
    context,
    billingAccountName,
    billingProfileName,
    customerName,
    roleDefinitionName,
    options,
  );
  return _getByCustomerDeserialize(result);
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingRoleDefinitionListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/billingRoleDefinitions{?api%2Dversion}",
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
): Promise<_BillingRoleDefinitionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleDefinitionListResultDeserializer(result.body);
}

/** Lists the role definitions for a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingRoleDefinitionListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleDefinition> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountName, billingProfileName, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/billingRoleDefinitions/{roleDefinitionName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      roleDefinitionName: roleDefinitionName,
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
): Promise<BillingRoleDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleDefinitionDeserializer(result.body);
}

/** Gets the definition for a role on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export async function getByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  roleDefinitionName: string,
  options: BillingRoleDefinitionGetByBillingProfileOptionalParams = { requestOptions: {} },
): Promise<BillingRoleDefinition> {
  const result = await _getByBillingProfileSend(
    context,
    billingAccountName,
    billingProfileName,
    roleDefinitionName,
    options,
  );
  return _getByBillingProfileDeserialize(result);
}
