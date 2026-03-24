// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  checkAccessByInvoiceSection,
  listByInvoiceSection,
  checkAccessByEnrollmentAccount,
  listByEnrollmentAccount,
  checkAccessByDepartment,
  listByDepartment,
  listByCustomerAtBillingAccount,
  checkAccessByCustomer,
  listByCustomer,
  checkAccessByBillingProfile,
  listByBillingProfile,
  checkAccessByBillingAccount,
  listByBillingAccount,
} from "../../api/billingPermissions/operations.js";
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
} from "../../api/billingPermissions/options.js";
import type {
  BillingPermission,
  CheckAccessRequest,
  BillingPermissionsCheckAccessByInvoiceSectionResponse,
  BillingPermissionsCheckAccessByEnrollmentAccountResponse,
  BillingPermissionsCheckAccessByDepartmentResponse,
  BillingPermissionsCheckAccessByCustomerResponse,
  BillingPermissionsCheckAccessByBillingProfileResponse,
  BillingPermissionsCheckAccessByBillingAccountResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BillingPermissions operations. */
export interface BillingPermissionsOperations {
  /** Provides a list of check access response objects for an invoice section. */
  checkAccessByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    parameters: CheckAccessRequest,
    options?: BillingPermissionsCheckAccessByInvoiceSectionOptionalParams,
  ) => Promise<BillingPermissionsCheckAccessByInvoiceSectionResponse>;
  /** Lists the billing permissions the caller has for an invoice section. */
  listByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: BillingPermissionsListByInvoiceSectionOptionalParams,
  ) => PagedAsyncIterableIterator<BillingPermission>;
  /** Provides a list of check access response objects for an enrollment account. */
  checkAccessByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    parameters: CheckAccessRequest,
    options?: BillingPermissionsCheckAccessByEnrollmentAccountOptionalParams,
  ) => Promise<BillingPermissionsCheckAccessByEnrollmentAccountResponse>;
  /** Lists the billing permissions the caller has for an enrollment account. */
  listByEnrollmentAccount: (
    billingAccountName: string,
    enrollmentAccountName: string,
    options?: BillingPermissionsListByEnrollmentAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingPermission>;
  /** Provides a list of check access response objects for a department. */
  checkAccessByDepartment: (
    billingAccountName: string,
    departmentName: string,
    parameters: CheckAccessRequest,
    options?: BillingPermissionsCheckAccessByDepartmentOptionalParams,
  ) => Promise<BillingPermissionsCheckAccessByDepartmentResponse>;
  /** Lists the billing permissions the caller has for a department. */
  listByDepartment: (
    billingAccountName: string,
    departmentName: string,
    options?: BillingPermissionsListByDepartmentOptionalParams,
  ) => PagedAsyncIterableIterator<BillingPermission>;
  /** Lists the billing permissions the caller has for a customer at billing account level. */
  listByCustomerAtBillingAccount: (
    billingAccountName: string,
    customerName: string,
    options?: BillingPermissionsListByCustomerAtBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingPermission>;
  /** Provides a list of check access response objects for a customer. */
  checkAccessByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    parameters: CheckAccessRequest,
    options?: BillingPermissionsCheckAccessByCustomerOptionalParams,
  ) => Promise<BillingPermissionsCheckAccessByCustomerResponse>;
  /** Lists the billing permissions the caller has for a customer. */
  listByCustomer: (
    billingAccountName: string,
    billingProfileName: string,
    customerName: string,
    options?: BillingPermissionsListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<BillingPermission>;
  /** Provides a list of check access response objects for a billing profile. */
  checkAccessByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    parameters: CheckAccessRequest,
    options?: BillingPermissionsCheckAccessByBillingProfileOptionalParams,
  ) => Promise<BillingPermissionsCheckAccessByBillingProfileResponse>;
  /** Lists the billing permissions the caller has on a billing profile. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: BillingPermissionsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<BillingPermission>;
  /** Provides a list of check access response objects for a billing account. */
  checkAccessByBillingAccount: (
    billingAccountName: string,
    parameters: CheckAccessRequest,
    options?: BillingPermissionsCheckAccessByBillingAccountOptionalParams,
  ) => Promise<BillingPermissionsCheckAccessByBillingAccountResponse>;
  /** Lists the billing permissions the caller has on a billing account. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: BillingPermissionsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<BillingPermission>;
}

function _getBillingPermissions(context: BillingManagementContext) {
  return {
    checkAccessByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      parameters: CheckAccessRequest,
      options?: BillingPermissionsCheckAccessByInvoiceSectionOptionalParams,
    ) =>
      checkAccessByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        parameters,
        options,
      ),
    listByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: BillingPermissionsListByInvoiceSectionOptionalParams,
    ) =>
      listByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    checkAccessByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      parameters: CheckAccessRequest,
      options?: BillingPermissionsCheckAccessByEnrollmentAccountOptionalParams,
    ) =>
      checkAccessByEnrollmentAccount(
        context,
        billingAccountName,
        enrollmentAccountName,
        parameters,
        options,
      ),
    listByEnrollmentAccount: (
      billingAccountName: string,
      enrollmentAccountName: string,
      options?: BillingPermissionsListByEnrollmentAccountOptionalParams,
    ) => listByEnrollmentAccount(context, billingAccountName, enrollmentAccountName, options),
    checkAccessByDepartment: (
      billingAccountName: string,
      departmentName: string,
      parameters: CheckAccessRequest,
      options?: BillingPermissionsCheckAccessByDepartmentOptionalParams,
    ) => checkAccessByDepartment(context, billingAccountName, departmentName, parameters, options),
    listByDepartment: (
      billingAccountName: string,
      departmentName: string,
      options?: BillingPermissionsListByDepartmentOptionalParams,
    ) => listByDepartment(context, billingAccountName, departmentName, options),
    listByCustomerAtBillingAccount: (
      billingAccountName: string,
      customerName: string,
      options?: BillingPermissionsListByCustomerAtBillingAccountOptionalParams,
    ) => listByCustomerAtBillingAccount(context, billingAccountName, customerName, options),
    checkAccessByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      parameters: CheckAccessRequest,
      options?: BillingPermissionsCheckAccessByCustomerOptionalParams,
    ) =>
      checkAccessByCustomer(
        context,
        billingAccountName,
        billingProfileName,
        customerName,
        parameters,
        options,
      ),
    listByCustomer: (
      billingAccountName: string,
      billingProfileName: string,
      customerName: string,
      options?: BillingPermissionsListByCustomerOptionalParams,
    ) => listByCustomer(context, billingAccountName, billingProfileName, customerName, options),
    checkAccessByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      parameters: CheckAccessRequest,
      options?: BillingPermissionsCheckAccessByBillingProfileOptionalParams,
    ) =>
      checkAccessByBillingProfile(
        context,
        billingAccountName,
        billingProfileName,
        parameters,
        options,
      ),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: BillingPermissionsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    checkAccessByBillingAccount: (
      billingAccountName: string,
      parameters: CheckAccessRequest,
      options?: BillingPermissionsCheckAccessByBillingAccountOptionalParams,
    ) => checkAccessByBillingAccount(context, billingAccountName, parameters, options),
    listByBillingAccount: (
      billingAccountName: string,
      options?: BillingPermissionsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
  };
}

export function _getBillingPermissionsOperations(
  context: BillingManagementContext,
): BillingPermissionsOperations {
  return {
    ..._getBillingPermissions(context),
  };
}
