// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByEnrollmentAccount,
  getByEnrollmentAccount,
  listByDepartment,
  getByDepartment,
  listByBillingAccount,
  getByBillingAccount,
  listByInvoiceSection,
  getByInvoiceSection,
  listByCustomer,
  getByCustomer,
  listByBillingProfile,
  getByBillingProfile,
} from "../../api/billingRoleDefinition/operations.js";
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
} from "../../api/billingRoleDefinition/options.js";
import type { BillingRoleDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BillingRoleDefinition operations. */
export interface BillingRoleDefinitionOperations {
  /** List the definition for an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
  listByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    options?: BillingRoleDefinitionListByEnrollmentAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleDefinition>;
  /** Gets the definition for a role on an enrollment account. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
  getByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    roleDefinitionName: string,
    options?: BillingRoleDefinitionGetByEnrollmentAccountOptionalParams,
  ) => Promise<BillingRoleDefinition>;
  /** List the definition for a department. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
  listByDepartment: (
    billingAccountName: string,
    departmentName: string,
    options?: BillingRoleDefinitionListByDepartmentOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleDefinition>;
  /** Gets the definition for a role on a department. The operation is supported for billing accounts with agreement type Enterprise Agreement. */
  getByDepartment: (
    billingAccountName: string,
    departmentName: string,
    roleDefinitionName: string,
    options?: BillingRoleDefinitionGetByDepartmentOptionalParams,
  ) => Promise<BillingRoleDefinition>;
  /** Lists the role definitions for a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: BillingRoleDefinitionListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleDefinition>;
  /** Gets the definition for a role on a billing account. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
  getByBillingAccount: (
    billingAccountName: string,
    roleDefinitionName: string,
    options?: BillingRoleDefinitionGetByBillingAccountOptionalParams,
  ) => Promise<BillingRoleDefinition>;
  /** Lists the role definitions for an invoice section. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  listByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: BillingRoleDefinitionListByInvoiceSectionOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleDefinition>;
  /** Gets the definition for a role on an invoice section. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  getByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    roleDefinitionName: string,
    options?: BillingRoleDefinitionGetByInvoiceSectionOptionalParams,
  ) => Promise<BillingRoleDefinition>;
  /** Lists the role definitions for a customer. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement. */
  listByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: BillingRoleDefinitionListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleDefinition>;
  /** Gets the definition for a role on a customer. The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  getByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    roleDefinitionName: string,
    options?: BillingRoleDefinitionGetByCustomerOptionalParams,
  ) => Promise<BillingRoleDefinition>;
  /** Lists the role definitions for a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement, Microsoft Customer Agreement or Enterprise Agreement. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingRoleDefinitionListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<BillingRoleDefinition>;
  /** Gets the definition for a role on a billing profile. The operation is supported for billing accounts with agreement type Microsoft Partner Agreement or Microsoft Customer Agreement. */
  getByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    roleDefinitionName: string,
    options?: BillingRoleDefinitionGetByBillingProfileOptionalParams,
  ) => Promise<BillingRoleDefinition>;
}

function _getBillingRoleDefinition(context: BillingManagementContext) {
  return {
    listByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      options?: BillingRoleDefinitionListByEnrollmentAccountOptionalParams,
    ) => listByEnrollmentAccount(context, billingAccountName, enrollmentAccountName, options),
    getByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      roleDefinitionName: string,
      options?: BillingRoleDefinitionGetByEnrollmentAccountOptionalParams,
    ) =>
      getByEnrollmentAccount(
        context,
        billingAccountName,
        enrollmentAccountName,
        roleDefinitionName,
        options,
      ),
    listByDepartment: (
      billingAccountName: string,
      departmentName: string,
      options?: BillingRoleDefinitionListByDepartmentOptionalParams,
    ) => listByDepartment(context, billingAccountName, departmentName, options),
    getByDepartment: (
      billingAccountName: string,
      departmentName: string,
      roleDefinitionName: string,
      options?: BillingRoleDefinitionGetByDepartmentOptionalParams,
    ) => getByDepartment(context, billingAccountName, departmentName, roleDefinitionName, options),
    listByBillingAccount: (
      billingAccountName: string,
      options?: BillingRoleDefinitionListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    getByBillingAccount: (
      billingAccountName: string,
      roleDefinitionName: string,
      options?: BillingRoleDefinitionGetByBillingAccountOptionalParams,
    ) => getByBillingAccount(context, billingAccountName, roleDefinitionName, options),
    listByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: BillingRoleDefinitionListByInvoiceSectionOptionalParams,
    ) =>
      listByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    getByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      roleDefinitionName: string,
      options?: BillingRoleDefinitionGetByInvoiceSectionOptionalParams,
    ) =>
      getByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        roleDefinitionName,
        options,
      ),
    listByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: BillingRoleDefinitionListByCustomerOptionalParams,
    ) => listByCustomer(context, billingAccountName, billingProfileName, customerName, options),
    getByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      roleDefinitionName: string,
      options?: BillingRoleDefinitionGetByCustomerOptionalParams,
    ) =>
      getByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        roleDefinitionName,
        options,
      ),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingRoleDefinitionListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    getByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      roleDefinitionName: string,
      options?: BillingRoleDefinitionGetByBillingProfileOptionalParams,
    ) =>
      getByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        roleDefinitionName,
        options,
      ),
  };
}

export function _getBillingRoleDefinitionOperations(
  context: BillingManagementContext,
): BillingRoleDefinitionOperations {
  return {
    ..._getBillingRoleDefinition(context),
  };
}
