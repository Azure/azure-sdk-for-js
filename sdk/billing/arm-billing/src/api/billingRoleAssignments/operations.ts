// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  BillingRoleAssignment,
  BillingRoleAssignmentProperties,
  _BillingRoleAssignmentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  billingRoleAssignmentSerializer,
  billingRoleAssignmentDeserializer,
  billingRoleAssignmentPropertiesSerializer,
  _billingRoleAssignmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams,
  BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams,
  BillingRoleAssignmentsResolveByCustomerOptionalParams,
  BillingRoleAssignmentsCreateByCustomerOptionalParams,
  BillingRoleAssignmentsListByEnrollmentAccountOptionalParams,
  BillingRoleAssignmentsDeleteByEnrollmentAccountOptionalParams,
  BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams,
  BillingRoleAssignmentsGetByEnrollmentAccountOptionalParams,
  BillingRoleAssignmentsListByDepartmentOptionalParams,
  BillingRoleAssignmentsDeleteByDepartmentOptionalParams,
  BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams,
  BillingRoleAssignmentsGetByDepartmentOptionalParams,
  BillingRoleAssignmentsListByBillingAccountOptionalParams,
  BillingRoleAssignmentsDeleteByBillingAccountOptionalParams,
  BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams,
  BillingRoleAssignmentsGetByBillingAccountOptionalParams,
  BillingRoleAssignmentsListByInvoiceSectionOptionalParams,
  BillingRoleAssignmentsDeleteByInvoiceSectionOptionalParams,
  BillingRoleAssignmentsGetByInvoiceSectionOptionalParams,
  BillingRoleAssignmentsListByCustomerOptionalParams,
  BillingRoleAssignmentsDeleteByCustomerOptionalParams,
  BillingRoleAssignmentsGetByCustomerOptionalParams,
  BillingRoleAssignmentsResolveByBillingProfileOptionalParams,
  BillingRoleAssignmentsCreateByBillingProfileOptionalParams,
  BillingRoleAssignmentsResolveByBillingAccountOptionalParams,
  BillingRoleAssignmentsCreateByBillingAccountOptionalParams,
  BillingRoleAssignmentsListByBillingProfileOptionalParams,
  BillingRoleAssignmentsDeleteByBillingProfileOptionalParams,
  BillingRoleAssignmentsGetByBillingProfileOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resolveByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/resolveBillingRoleAssignments{?api%2Dversion,resolveScopeDisplayNames,filter}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      resolveScopeDisplayNames: options?.resolveScopeDisplayNames,
      filter: options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _resolveByInvoiceSectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on an invoice section while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export function resolveByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<_BillingRoleAssignmentListResult>, _BillingRoleAssignmentListResult> {
  return getLongRunningPoller(context, _resolveByInvoiceSectionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resolveByInvoiceSectionSend(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<
    OperationState<_BillingRoleAssignmentListResult>,
    _BillingRoleAssignmentListResult
  >;
}

export function _createByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: BillingRoleAssignmentProperties,
  options: BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/createBillingRoleAssignment{?api%2Dversion}",
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
    body: billingRoleAssignmentPropertiesSerializer(parameters),
  });
}

export async function _createByInvoiceSectionDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Adds a role assignment on an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export function createByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  parameters: BillingRoleAssignmentProperties,
  options: BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment> {
  return getLongRunningPoller(context, _createByInvoiceSectionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createByInvoiceSectionSend(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
}

export function _resolveByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingRoleAssignmentsResolveByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/resolveBillingRoleAssignments{?api%2Dversion,resolveScopeDisplayNames,filter}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      resolveScopeDisplayNames: options?.resolveScopeDisplayNames,
      filter: options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _resolveByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on a customer while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
export function resolveByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingRoleAssignmentsResolveByCustomerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<_BillingRoleAssignmentListResult>, _BillingRoleAssignmentListResult> {
  return getLongRunningPoller(context, _resolveByCustomerDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resolveByCustomerSend(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<
    OperationState<_BillingRoleAssignmentListResult>,
    _BillingRoleAssignmentListResult
  >;
}

export function _createByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  parameters: BillingRoleAssignmentProperties,
  options: BillingRoleAssignmentsCreateByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/createBillingRoleAssignment{?api%2Dversion}",
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
    body: billingRoleAssignmentPropertiesSerializer(parameters),
  });
}

export async function _createByCustomerDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Adds a role assignment on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
export function createByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  parameters: BillingRoleAssignmentProperties,
  options: BillingRoleAssignmentsCreateByCustomerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment> {
  return getLongRunningPoller(context, _createByCustomerDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createByCustomerSend(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
}

export function _listByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: BillingRoleAssignmentsListByEnrollmentAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingRoleAssignments{?api%2Dversion}",
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
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on a enrollment account. The operation is supported for billing accounts of type Enterprise Agreement. */
export function listByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  options: BillingRoleAssignmentsListByEnrollmentAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEnrollmentAccountSend(context, billingAccountName, enrollmentAccountName, options),
    _listByEnrollmentAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _deleteByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByEnrollmentAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      enrollmentAccountName: enrollmentAccountName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByEnrollmentAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a role assignment on a enrollment Account. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export async function deleteByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByEnrollmentAccountOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByEnrollmentAccountSend(
    context,
    billingAccountName,
    enrollmentAccountName,
    billingRoleAssignmentName,
    options,
  );
  return _deleteByEnrollmentAccountDeserialize(result);
}

export function _createOrUpdateByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  billingRoleAssignmentName: string,
  parameters: BillingRoleAssignment,
  options: BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      enrollmentAccountName: enrollmentAccountName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: billingRoleAssignmentSerializer(parameters),
  });
}

export async function _createOrUpdateByEnrollmentAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Create or update a billing role assignment. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export function createOrUpdateByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  billingRoleAssignmentName: string,
  parameters: BillingRoleAssignment,
  options: BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment> {
  return getLongRunningPoller(
    context,
    _createOrUpdateByEnrollmentAccountDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateByEnrollmentAccountSend(
          context,
          billingAccountName,
          enrollmentAccountName,
          billingRoleAssignmentName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
}

export function _getByEnrollmentAccountSend(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByEnrollmentAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/enrollmentAccounts/{enrollmentAccountName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      enrollmentAccountName: enrollmentAccountName,
      billingRoleAssignmentName: billingRoleAssignmentName,
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
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Gets a role assignment for the caller on a enrollment Account. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export async function getByEnrollmentAccount(
  context: Client,
  billingAccountName: string,
  enrollmentAccountName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByEnrollmentAccountOptionalParams = { requestOptions: {} },
): Promise<BillingRoleAssignment> {
  const result = await _getByEnrollmentAccountSend(
    context,
    billingAccountName,
    enrollmentAccountName,
    billingRoleAssignmentName,
    options,
  );
  return _getByEnrollmentAccountDeserialize(result);
}

export function _listByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: BillingRoleAssignmentsListByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/billingRoleAssignments{?api%2Dversion}",
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
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on a department. The operation is supported for billing accounts of type Enterprise Agreement. */
export function listByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  options: BillingRoleAssignmentsListByDepartmentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDepartmentSend(context, billingAccountName, departmentName, options),
    _listByDepartmentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _deleteByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      departmentName: departmentName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByDepartmentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a role assignment on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export async function deleteByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByDepartmentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByDepartmentSend(
    context,
    billingAccountName,
    departmentName,
    billingRoleAssignmentName,
    options,
  );
  return _deleteByDepartmentDeserialize(result);
}

export function _createOrUpdateByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  billingRoleAssignmentName: string,
  parameters: BillingRoleAssignment,
  options: BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      departmentName: departmentName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: billingRoleAssignmentSerializer(parameters),
  });
}

export async function _createOrUpdateByDepartmentDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Create or update a billing role assignment. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export function createOrUpdateByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  billingRoleAssignmentName: string,
  parameters: BillingRoleAssignment,
  options: BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment> {
  return getLongRunningPoller(
    context,
    _createOrUpdateByDepartmentDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateByDepartmentSend(
          context,
          billingAccountName,
          departmentName,
          billingRoleAssignmentName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
}

export function _getByDepartmentSend(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByDepartmentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/departments/{departmentName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      departmentName: departmentName,
      billingRoleAssignmentName: billingRoleAssignmentName,
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
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Gets a role assignment for the caller on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export async function getByDepartment(
  context: Client,
  billingAccountName: string,
  departmentName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByDepartmentOptionalParams = { requestOptions: {} },
): Promise<BillingRoleAssignment> {
  const result = await _getByDepartmentSend(
    context,
    billingAccountName,
    departmentName,
    billingRoleAssignmentName,
    options,
  );
  return _getByDepartmentDeserialize(result);
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: BillingRoleAssignmentsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingRoleAssignments{?api%2Dversion,filter,top,skip}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      top: options?.top,
      skip: options?.skip,
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
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: BillingRoleAssignmentsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _deleteByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a role assignment on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
export async function deleteByBillingAccount(
  context: Client,
  billingAccountName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByBillingAccountSend(
    context,
    billingAccountName,
    billingRoleAssignmentName,
    options,
  );
  return _deleteByBillingAccountDeserialize(result);
}

export function _createOrUpdateByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  billingRoleAssignmentName: string,
  parameters: BillingRoleAssignment,
  options: BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: billingRoleAssignmentSerializer(parameters),
  });
}

export async function _createOrUpdateByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Create or update a billing role assignment. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
export function createOrUpdateByBillingAccount(
  context: Client,
  billingAccountName: string,
  billingRoleAssignmentName: string,
  parameters: BillingRoleAssignment,
  options: BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment> {
  return getLongRunningPoller(
    context,
    _createOrUpdateByBillingAccountDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateByBillingAccountSend(
          context,
          billingAccountName,
          billingRoleAssignmentName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2024-04-01",
    },
  ) as PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingRoleAssignmentName: billingRoleAssignmentName,
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
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Gets a role assignment for the caller on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<BillingRoleAssignment> {
  const result = await _getByBillingAccountSend(
    context,
    billingAccountName,
    billingRoleAssignmentName,
    options,
  );
  return _getByBillingAccountDeserialize(result);
}

export function _listByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingRoleAssignmentsListByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/billingRoleAssignments{?api%2Dversion,filter,top,skip}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      top: options?.top,
      skip: options?.skip,
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
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export function listByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  options: BillingRoleAssignmentsListByInvoiceSectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleAssignment> {
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

export function _deleteByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByInvoiceSectionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a role assignment on an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export async function deleteByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByInvoiceSectionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByInvoiceSectionSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    billingRoleAssignmentName,
    options,
  );
  return _deleteByInvoiceSectionDeserialize(result);
}

export function _getByInvoiceSectionSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByInvoiceSectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      invoiceSectionName: invoiceSectionName,
      billingRoleAssignmentName: billingRoleAssignmentName,
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
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Gets a role assignment for the caller on an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
export async function getByInvoiceSection(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  invoiceSectionName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByInvoiceSectionOptionalParams = { requestOptions: {} },
): Promise<BillingRoleAssignment> {
  const result = await _getByInvoiceSectionSend(
    context,
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    billingRoleAssignmentName,
    options,
  );
  return _getByInvoiceSectionDeserialize(result);
}

export function _listByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingRoleAssignmentsListByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/billingRoleAssignments{?api%2Dversion,filter,top,skip}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      top: options?.top,
      skip: options?.skip,
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
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
export function listByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  options: BillingRoleAssignmentsListByCustomerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByCustomerSend(context, billingAccountName, billingProfileName, customerName, options),
    _listByCustomerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _deleteByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByCustomerDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a role assignment on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
export async function deleteByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByCustomerOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByCustomerSend(
    context,
    billingAccountName,
    billingProfileName,
    customerName,
    billingRoleAssignmentName,
    options,
  );
  return _deleteByCustomerDeserialize(result);
}

export function _getByCustomerSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByCustomerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/customers/{customerName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      customerName: customerName,
      billingRoleAssignmentName: billingRoleAssignmentName,
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
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Gets a role assignment for the caller on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
export async function getByCustomer(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  customerName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByCustomerOptionalParams = { requestOptions: {} },
): Promise<BillingRoleAssignment> {
  const result = await _getByCustomerSend(
    context,
    billingAccountName,
    billingProfileName,
    customerName,
    billingRoleAssignmentName,
    options,
  );
  return _getByCustomerDeserialize(result);
}

export function _resolveByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingRoleAssignmentsResolveByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/resolveBillingRoleAssignments{?api%2Dversion,resolveScopeDisplayNames,filter}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      resolveScopeDisplayNames: options?.resolveScopeDisplayNames,
      filter: options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _resolveByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on an billing profile while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function resolveByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingRoleAssignmentsResolveByBillingProfileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<_BillingRoleAssignmentListResult>, _BillingRoleAssignmentListResult> {
  return getLongRunningPoller(context, _resolveByBillingProfileDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resolveByBillingProfileSend(context, billingAccountName, billingProfileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<
    OperationState<_BillingRoleAssignmentListResult>,
    _BillingRoleAssignmentListResult
  >;
}

export function _createByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  parameters: BillingRoleAssignmentProperties,
  options: BillingRoleAssignmentsCreateByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/createBillingRoleAssignment{?api%2Dversion}",
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
    body: billingRoleAssignmentPropertiesSerializer(parameters),
  });
}

export async function _createByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Adds a role assignment on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function createByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  parameters: BillingRoleAssignmentProperties,
  options: BillingRoleAssignmentsCreateByBillingProfileOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment> {
  return getLongRunningPoller(context, _createByBillingProfileDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createByBillingProfileSend(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
}

export function _resolveByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: BillingRoleAssignmentsResolveByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/resolveBillingRoleAssignments{?api%2Dversion,resolveScopeDisplayNames,filter}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      resolveScopeDisplayNames: options?.resolveScopeDisplayNames,
      filter: options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _resolveByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on a billing account while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
export function resolveByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: BillingRoleAssignmentsResolveByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<_BillingRoleAssignmentListResult>, _BillingRoleAssignmentListResult> {
  return getLongRunningPoller(context, _resolveByBillingAccountDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _resolveByBillingAccountSend(context, billingAccountName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<
    OperationState<_BillingRoleAssignmentListResult>,
    _BillingRoleAssignmentListResult
  >;
}

export function _createByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  parameters: BillingRoleAssignmentProperties,
  options: BillingRoleAssignmentsCreateByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/createBillingRoleAssignment{?api%2Dversion}",
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
    body: billingRoleAssignmentPropertiesSerializer(parameters),
  });
}

export async function _createByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Adds a role assignment on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function createByBillingAccount(
  context: Client,
  billingAccountName: string,
  parameters: BillingRoleAssignmentProperties,
  options: BillingRoleAssignmentsCreateByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment> {
  return getLongRunningPoller(context, _createByBillingAccountDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createByBillingAccountSend(context, billingAccountName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingRoleAssignmentsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/billingRoleAssignments{?api%2Dversion,filter,top,skip}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      top: options?.top,
      skip: options?.skip,
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
): Promise<_BillingRoleAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _billingRoleAssignmentListResultDeserializer(result.body);
}

/** Lists the role assignments for the caller on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: BillingRoleAssignmentsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BillingRoleAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountName, billingProfileName, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _deleteByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      billingRoleAssignmentName: billingRoleAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a role assignment on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export async function deleteByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsDeleteByBillingProfileOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByBillingProfileSend(
    context,
    billingAccountName,
    billingProfileName,
    billingRoleAssignmentName,
    options,
  );
  return _deleteByBillingProfileDeserialize(result);
}

export function _getByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/billingRoleAssignments/{billingRoleAssignmentName}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      billingRoleAssignmentName: billingRoleAssignmentName,
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
): Promise<BillingRoleAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingRoleAssignmentDeserializer(result.body);
}

/** Gets a role assignment for the caller on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
export async function getByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  billingRoleAssignmentName: string,
  options: BillingRoleAssignmentsGetByBillingProfileOptionalParams = { requestOptions: {} },
): Promise<BillingRoleAssignment> {
  const result = await _getByBillingProfileSend(
    context,
    billingAccountName,
    billingProfileName,
    billingRoleAssignmentName,
    options,
  );
  return _getByBillingProfileDeserialize(result);
}
