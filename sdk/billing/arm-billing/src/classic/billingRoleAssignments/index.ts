// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  resolveByInvoiceSection,
  createByInvoiceSection,
  resolveByCustomer,
  createByCustomer,
  listByEnrollmentAccount,
  deleteByEnrollmentAccount,
  createOrUpdateByEnrollmentAccount,
  getByEnrollmentAccount,
  listByDepartment,
  deleteByDepartment,
  createOrUpdateByDepartment,
  getByDepartment,
  listByBillingAccount,
  deleteByBillingAccount,
  createOrUpdateByBillingAccount,
  getByBillingAccount,
  listByInvoiceSection,
  deleteByInvoiceSection,
  getByInvoiceSection,
  listByCustomer,
  deleteByCustomer,
  getByCustomer,
  resolveByBillingProfile,
  createByBillingProfile,
  resolveByBillingAccount,
  createByBillingAccount,
  listByBillingProfile,
  deleteByBillingProfile,
  getByBillingProfile,
} from "../../api/billingRoleAssignments/operations.js";
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
} from "../../api/billingRoleAssignments/options.js";
import type {
  BillingRoleAssignment,
  BillingRoleAssignmentProperties,
  _BillingRoleAssignmentListResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a BillingRoleAssignments operations. */
export interface BillingRoleAssignmentsOperations {
  /** Lists the role assignments for the caller on an invoice section while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  resolveByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams,
  ) => PollerLike<
    OperationState<_BillingRoleAssignmentListResult>,
    _BillingRoleAssignmentListResult
  >;
  /** @deprecated use resolveByInvoiceSection instead */
  beginResolveByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<_BillingRoleAssignmentListResult>,
      _BillingRoleAssignmentListResult
    >
  >;
  /** @deprecated use resolveByInvoiceSection instead */
  beginResolveByInvoiceSectionAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams,
  ) => Promise<_BillingRoleAssignmentListResult>;
  /** Adds a role assignment on an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  createByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams,
  ) => PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
  /** @deprecated use createByInvoiceSection instead */
  beginCreateByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>>;
  /** @deprecated use createByInvoiceSection instead */
  beginCreateByInvoiceSectionAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on a customer while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
  resolveByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: BillingRoleAssignmentsResolveByCustomerOptionalParams,
  ) => PollerLike<
    OperationState<_BillingRoleAssignmentListResult>,
    _BillingRoleAssignmentListResult
  >;
  /** @deprecated use resolveByCustomer instead */
  beginResolveByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: BillingRoleAssignmentsResolveByCustomerOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<_BillingRoleAssignmentListResult>,
      _BillingRoleAssignmentListResult
    >
  >;
  /** @deprecated use resolveByCustomer instead */
  beginResolveByCustomerAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: BillingRoleAssignmentsResolveByCustomerOptionalParams,
  ) => Promise<_BillingRoleAssignmentListResult>;
  /** Adds a role assignment on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
  createByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByCustomerOptionalParams,
  ) => PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
  /** @deprecated use createByCustomer instead */
  beginCreateByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByCustomerOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>>;
  /** @deprecated use createByCustomer instead */
  beginCreateByCustomerAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByCustomerOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on a enrollment account. The operation is supported for billing accounts of type Enterprise Agreement. */
  listByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    options?: BillingRoleAssignmentsListByEnrollmentAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleAssignment>;
  /** Deletes a role assignment on a enrollment Account. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  deleteByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsDeleteByEnrollmentAccountOptionalParams,
  ) => Promise<void>;
  /** Create or update a billing role assignment. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  createOrUpdateByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams,
  ) => PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
  /** @deprecated use createOrUpdateByEnrollmentAccount instead */
  beginCreateOrUpdateByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>>;
  /** @deprecated use createOrUpdateByEnrollmentAccount instead */
  beginCreateOrUpdateByEnrollmentAccountAndWait: (
    billingAccountName: string,
    enrollmentAccountName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Gets a role assignment for the caller on a enrollment Account. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  getByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsGetByEnrollmentAccountOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on a department. The operation is supported for billing accounts of type Enterprise Agreement. */
  listByDepartment: (
    billingAccountName: string,
    departmentName: string,
    options?: BillingRoleAssignmentsListByDepartmentOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleAssignment>;
  /** Deletes a role assignment on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  deleteByDepartment: (
    billingAccountName: string,
    departmentName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsDeleteByDepartmentOptionalParams,
  ) => Promise<void>;
  /** Create or update a billing role assignment. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  createOrUpdateByDepartment: (
    billingAccountName: string,
    departmentName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams,
  ) => PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
  /** @deprecated use createOrUpdateByDepartment instead */
  beginCreateOrUpdateByDepartment: (
    billingAccountName: string,
    departmentName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>>;
  /** @deprecated use createOrUpdateByDepartment instead */
  beginCreateOrUpdateByDepartmentAndWait: (
    billingAccountName: string,
    departmentName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Gets a role assignment for the caller on a department. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  getByDepartment: (
    billingAccountName: string,
    departmentName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsGetByDepartmentOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: BillingRoleAssignmentsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleAssignment>;
  /** Deletes a role assignment on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
  deleteByBillingAccount: (
    billingAccountName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsDeleteByBillingAccountOptionalParams,
  ) => Promise<void>;
  /** Create or update a billing role assignment. The operation is supported only for billing accounts with agreement type Enterprise Agreement. */
  createOrUpdateByBillingAccount: (
    billingAccountName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
  /** @deprecated use createOrUpdateByBillingAccount instead */
  beginCreateOrUpdateByBillingAccount: (
    billingAccountName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>>;
  /** @deprecated use createOrUpdateByBillingAccount instead */
  beginCreateOrUpdateByBillingAccountAndWait: (
    billingAccountName: string,
    billingRoleAssignmentName: string,
    parameters: BillingRoleAssignment,
    options?: BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Gets a role assignment for the caller on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
  getByBillingAccount: (
    billingAccountName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsGetByBillingAccountOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  listByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: BillingRoleAssignmentsListByInvoiceSectionOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleAssignment>;
  /** Deletes a role assignment on an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  deleteByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsDeleteByInvoiceSectionOptionalParams,
  ) => Promise<void>;
  /** Gets a role assignment for the caller on an invoice section. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement. */
  getByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsGetByInvoiceSectionOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
  listByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: BillingRoleAssignmentsListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleAssignment>;
  /** Deletes a role assignment on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
  deleteByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsDeleteByCustomerOptionalParams,
  ) => Promise<void>;
  /** Gets a role assignment for the caller on a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
  getByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsGetByCustomerOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on an billing profile while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  resolveByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingRoleAssignmentsResolveByBillingProfileOptionalParams,
  ) => PollerLike<
    OperationState<_BillingRoleAssignmentListResult>,
    _BillingRoleAssignmentListResult
  >;
  /** @deprecated use resolveByBillingProfile instead */
  beginResolveByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingRoleAssignmentsResolveByBillingProfileOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<_BillingRoleAssignmentListResult>,
      _BillingRoleAssignmentListResult
    >
  >;
  /** @deprecated use resolveByBillingProfile instead */
  beginResolveByBillingProfileAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingRoleAssignmentsResolveByBillingProfileOptionalParams,
  ) => Promise<_BillingRoleAssignmentListResult>;
  /** Adds a role assignment on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  createByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByBillingProfileOptionalParams,
  ) => PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
  /** @deprecated use createByBillingProfile instead */
  beginCreateByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByBillingProfileOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>>;
  /** @deprecated use createByBillingProfile instead */
  beginCreateByBillingProfileAndWait: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByBillingProfileOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on a billing account while fetching user info for each role assignment. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
  resolveByBillingAccount: (
    billingAccountName: string,
    options?: BillingRoleAssignmentsResolveByBillingAccountOptionalParams,
  ) => PollerLike<
    OperationState<_BillingRoleAssignmentListResult>,
    _BillingRoleAssignmentListResult
  >;
  /** @deprecated use resolveByBillingAccount instead */
  beginResolveByBillingAccount: (
    billingAccountName: string,
    options?: BillingRoleAssignmentsResolveByBillingAccountOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<_BillingRoleAssignmentListResult>,
      _BillingRoleAssignmentListResult
    >
  >;
  /** @deprecated use resolveByBillingAccount instead */
  beginResolveByBillingAccountAndWait: (
    billingAccountName: string,
    options?: BillingRoleAssignmentsResolveByBillingAccountOptionalParams,
  ) => Promise<_BillingRoleAssignmentListResult>;
  /** Adds a role assignment on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  createByBillingAccount: (
    billingAccountName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByBillingAccountOptionalParams,
  ) => PollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>;
  /** @deprecated use createByBillingAccount instead */
  beginCreateByBillingAccount: (
    billingAccountName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByBillingAccountOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BillingRoleAssignment>, BillingRoleAssignment>>;
  /** @deprecated use createByBillingAccount instead */
  beginCreateByBillingAccountAndWait: (
    billingAccountName: string,
    parameters: BillingRoleAssignmentProperties,
    options?: BillingRoleAssignmentsCreateByBillingAccountOptionalParams,
  ) => Promise<BillingRoleAssignment>;
  /** Lists the role assignments for the caller on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingRoleAssignmentsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleAssignment>;
  /** Deletes a role assignment on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  deleteByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsDeleteByBillingProfileOptionalParams,
  ) => Promise<void>;
  /** Gets a role assignment for the caller on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  getByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    billingRoleAssignmentName: string,
    options?: BillingRoleAssignmentsGetByBillingProfileOptionalParams,
  ) => Promise<BillingRoleAssignment>;
}

function _getBillingRoleAssignments(context: BillingManagementContext) {
  return {
    resolveByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams,
    ) =>
      resolveByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    beginResolveByInvoiceSection: async (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams,
    ) => {
      const poller = resolveByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResolveByInvoiceSectionAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: BillingRoleAssignmentsResolveByInvoiceSectionOptionalParams,
    ) => {
      return await resolveByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      );
    },
    createByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams,
    ) =>
      createByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      ),
    beginCreateByInvoiceSection: async (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams,
    ) => {
      const poller = createByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateByInvoiceSectionAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByInvoiceSectionOptionalParams,
    ) => {
      return await createByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      );
    },
    resolveByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: BillingRoleAssignmentsResolveByCustomerOptionalParams,
    ) => resolveByCustomer(context, billingAccountName, billingProfileName, customerName, options),
    beginResolveByCustomer: async (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: BillingRoleAssignmentsResolveByCustomerOptionalParams,
    ) => {
      const poller = resolveByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResolveByCustomerAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: BillingRoleAssignmentsResolveByCustomerOptionalParams,
    ) => {
      return await resolveByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        options,
      );
    },
    createByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByCustomerOptionalParams,
    ) =>
      createByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        parameters,
        options,
      ),
    beginCreateByCustomer: async (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByCustomerOptionalParams,
    ) => {
      const poller = createByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateByCustomerAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByCustomerOptionalParams,
    ) => {
      return await createByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        parameters,
        options,
      );
    },
    listByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      options?: BillingRoleAssignmentsListByEnrollmentAccountOptionalParams,
    ) => listByEnrollmentAccount(context, billingAccountName, enrollmentAccountName, options),
    deleteByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsDeleteByEnrollmentAccountOptionalParams,
    ) =>
      deleteByEnrollmentAccount(
        context,
        billingAccountName,
        enrollmentAccountName,
        billingRoleAssignmentName,
        options,
      ),
    createOrUpdateByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams,
    ) =>
      createOrUpdateByEnrollmentAccount(
        context,
        billingAccountName,
        enrollmentAccountName,
        billingRoleAssignmentName,
        parameters,
        options,
      ),
    beginCreateOrUpdateByEnrollmentAccount: async (
      billingAccountName: string,
      enrollmentAccountName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams,
    ) => {
      const poller = createOrUpdateByEnrollmentAccount(
        context,
        billingAccountName,
        enrollmentAccountName,
        billingRoleAssignmentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateByEnrollmentAccountAndWait: async (
      billingAccountName: string,
      enrollmentAccountName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByEnrollmentAccountOptionalParams,
    ) => {
      return await createOrUpdateByEnrollmentAccount(
        context,
        billingAccountName,
        enrollmentAccountName,
        billingRoleAssignmentName,
        parameters,
        options,
      );
    },
    getByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsGetByEnrollmentAccountOptionalParams,
    ) =>
      getByEnrollmentAccount(
        context,
        billingAccountName,
        enrollmentAccountName,
        billingRoleAssignmentName,
        options,
      ),
    listByDepartment: (
      billingAccountName: string,
      departmentName: string,
      options?: BillingRoleAssignmentsListByDepartmentOptionalParams,
    ) => listByDepartment(context, billingAccountName, departmentName, options),
    deleteByDepartment: (
      billingAccountName: string,
      departmentName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsDeleteByDepartmentOptionalParams,
    ) =>
      deleteByDepartment(
        context,
        billingAccountName,
        departmentName,
        billingRoleAssignmentName,
        options,
      ),
    createOrUpdateByDepartment: (
      billingAccountName: string,
      departmentName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams,
    ) =>
      createOrUpdateByDepartment(
        context,
        billingAccountName,
        departmentName,
        billingRoleAssignmentName,
        parameters,
        options,
      ),
    beginCreateOrUpdateByDepartment: async (
      billingAccountName: string,
      departmentName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams,
    ) => {
      const poller = createOrUpdateByDepartment(
        context,
        billingAccountName,
        departmentName,
        billingRoleAssignmentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateByDepartmentAndWait: async (
      billingAccountName: string,
      departmentName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByDepartmentOptionalParams,
    ) => {
      return await createOrUpdateByDepartment(
        context,
        billingAccountName,
        departmentName,
        billingRoleAssignmentName,
        parameters,
        options,
      );
    },
    getByDepartment: (
      billingAccountName: string,
      departmentName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsGetByDepartmentOptionalParams,
    ) =>
      getByDepartment(
        context,
        billingAccountName,
        departmentName,
        billingRoleAssignmentName,
        options,
      ),
    listByBillingAccount: (
      billingAccountName: string,
      options?: BillingRoleAssignmentsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    deleteByBillingAccount: (
      billingAccountName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsDeleteByBillingAccountOptionalParams,
    ) => deleteByBillingAccount(context, billingAccountName, billingRoleAssignmentName, options),
    createOrUpdateByBillingAccount: (
      billingAccountName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams,
    ) =>
      createOrUpdateByBillingAccount(
        context,
        billingAccountName,
        billingRoleAssignmentName,
        parameters,
        options,
      ),
    beginCreateOrUpdateByBillingAccount: async (
      billingAccountName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams,
    ) => {
      const poller = createOrUpdateByBillingAccount(
        context,
        billingAccountName,
        billingRoleAssignmentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateByBillingAccountAndWait: async (
      billingAccountName: string,
      billingRoleAssignmentName: string,
      parameters: BillingRoleAssignment,
      options?: BillingRoleAssignmentsCreateOrUpdateByBillingAccountOptionalParams,
    ) => {
      return await createOrUpdateByBillingAccount(
        context,
        billingAccountName,
        billingRoleAssignmentName,
        parameters,
        options,
      );
    },
    getByBillingAccount: (
      billingAccountName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, billingRoleAssignmentName, options),
    listByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: BillingRoleAssignmentsListByInvoiceSectionOptionalParams,
    ) =>
      listByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    deleteByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsDeleteByInvoiceSectionOptionalParams,
    ) =>
      deleteByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        billingRoleAssignmentName,
        options,
      ),
    getByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsGetByInvoiceSectionOptionalParams,
    ) =>
      getByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        billingRoleAssignmentName,
        options,
      ),
    listByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: BillingRoleAssignmentsListByCustomerOptionalParams,
    ) => listByCustomer(context, billingAccountName, billingProfileName, customerName, options),
    deleteByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsDeleteByCustomerOptionalParams,
    ) =>
      deleteByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        billingRoleAssignmentName,
        options,
      ),
    getByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsGetByCustomerOptionalParams,
    ) =>
      getByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        billingRoleAssignmentName,
        options,
      ),
    resolveByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingRoleAssignmentsResolveByBillingProfileOptionalParams,
    ) => resolveByBillingProfile(context, billingAccountName, billingProfileName, options),
    beginResolveByBillingProfile: async (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingRoleAssignmentsResolveByBillingProfileOptionalParams,
    ) => {
      const poller = resolveByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResolveByBillingProfileAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingRoleAssignmentsResolveByBillingProfileOptionalParams,
    ) => {
      return await resolveByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        options,
      );
    },
    createByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByBillingProfileOptionalParams,
    ) =>
      createByBillingProfile(context, billingAccountName, billingProfileName, parameters, options),
    beginCreateByBillingProfile: async (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByBillingProfileOptionalParams,
    ) => {
      const poller = createByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateByBillingProfileAndWait: async (
      billingAccountName: string,
      billingProfileName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByBillingProfileOptionalParams,
    ) => {
      return await createByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      );
    },
    resolveByBillingAccount: (
      billingAccountName: string,
      options?: BillingRoleAssignmentsResolveByBillingAccountOptionalParams,
    ) => resolveByBillingAccount(context, billingAccountName, options),
    beginResolveByBillingAccount: async (
      billingAccountName: string,
      options?: BillingRoleAssignmentsResolveByBillingAccountOptionalParams,
    ) => {
      const poller = resolveByBillingAccount(context, billingAccountName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResolveByBillingAccountAndWait: async (
      billingAccountName: string,
      options?: BillingRoleAssignmentsResolveByBillingAccountOptionalParams,
    ) => {
      return await resolveByBillingAccount(context, billingAccountName, options);
    },
    createByBillingAccount: (
      billingAccountName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByBillingAccountOptionalParams,
    ) => createByBillingAccount(context, billingAccountName, parameters, options),
    beginCreateByBillingAccount: async (
      billingAccountName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByBillingAccountOptionalParams,
    ) => {
      const poller = createByBillingAccount(context, billingAccountName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateByBillingAccountAndWait: async (
      billingAccountName: string,
      parameters: BillingRoleAssignmentProperties,
      options?: BillingRoleAssignmentsCreateByBillingAccountOptionalParams,
    ) => {
      return await createByBillingAccount(context, billingAccountName, parameters, options);
    },
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingRoleAssignmentsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    deleteByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsDeleteByBillingProfileOptionalParams,
    ) =>
      deleteByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        billingRoleAssignmentName,
        options,
      ),
    getByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      billingRoleAssignmentName: string,
      options?: BillingRoleAssignmentsGetByBillingProfileOptionalParams,
    ) =>
      getByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        billingRoleAssignmentName,
        options,
      ),
  };
}

export function _getBillingRoleAssignmentsOperations(
  context: BillingManagementContext,
): BillingRoleAssignmentsOperations {
  return {
    ..._getBillingRoleAssignments(context),
  };
}
