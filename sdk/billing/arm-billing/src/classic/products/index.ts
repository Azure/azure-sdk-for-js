// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext } from "../../api/billingManagementContext.js";
import {
  listByInvoiceSection,
  listByCustomer,
  listByBillingProfile,
  validateMoveEligibility,
  move,
  listByBillingAccount,
  update,
  get,
} from "../../api/products/operations.js";
import type {
  ProductsListByInvoiceSectionOptionalParams,
  ProductsListByCustomerOptionalParams,
  ProductsListByBillingProfileOptionalParams,
  ProductsValidateMoveEligibilityOptionalParams,
  ProductsMoveOptionalParams,
  ProductsListByBillingAccountOptionalParams,
  ProductsUpdateOptionalParams,
  ProductsGetOptionalParams,
} from "../../api/products/options.js";
import type {
  Product,
  ProductPatch,
  MoveProductRequest,
  MoveProductEligibilityResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Products operations. */
export interface ProductsOperations {
  /** Lists the products for an invoice section. These don't include products billed based on usage. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  listByInvoiceSection: (
    billingAccountName: string,
    billingProfileName: string,
    invoiceSectionName: string,
    options?: ProductsListByInvoiceSectionOptionalParams,
  ) => PagedAsyncIterableIterator<Product>;
  /** Lists the products for a customer. These don't include products billed based on usage.The operation is supported only for billing accounts with agreement type Microsoft Partner Agreement. */
  listByCustomer: (
    billingAccountName: string,
    customerName: string,
    options?: ProductsListByCustomerOptionalParams,
  ) => PagedAsyncIterableIterator<Product>;
  /** Lists the products for a billing profile. These don't include products billed based on usage. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement or Microsoft Partner Agreement. */
  listByBillingProfile: (
    billingAccountName: string,
    billingProfileName: string,
    options?: ProductsListByBillingProfileOptionalParams,
  ) => PagedAsyncIterableIterator<Product>;
  /** Validates if a product's charges can be moved to a new invoice section. This operation is supported only for products that are purchased with a recurring charge and for billing accounts with agreement type Microsoft Customer Agreement. */
  validateMoveEligibility: (
    billingAccountName: string,
    productName: string,
    parameters: MoveProductRequest,
    options?: ProductsValidateMoveEligibilityOptionalParams,
  ) => Promise<MoveProductEligibilityResult>;
  /** Moves a product's charges to a new invoice section. The new invoice section must belong to the same billing profile as the existing invoice section. This operation is supported only for products that are purchased with a recurring charge and for billing accounts with agreement type Microsoft Customer Agreement. */
  move: (
    billingAccountName: string,
    productName: string,
    parameters: MoveProductRequest,
    options?: ProductsMoveOptionalParams,
  ) => PollerLike<OperationState<Product>, Product>;
  /** @deprecated use move instead */
  beginMove: (
    billingAccountName: string,
    productName: string,
    parameters: MoveProductRequest,
    options?: ProductsMoveOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Product>, Product>>;
  /** @deprecated use move instead */
  beginMoveAndWait: (
    billingAccountName: string,
    productName: string,
    parameters: MoveProductRequest,
    options?: ProductsMoveOptionalParams,
  ) => Promise<Product>;
  /** Lists the products for a billing account. These don't include products billed based on usage. The operation is supported for billing accounts with agreement type Microsoft Customer Agreement or Microsoft Partner Agreement. */
  listByBillingAccount: (
    billingAccountName: string,
    options?: ProductsListByBillingAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Product>;
  /** Updates the properties of a Product. Currently, auto renew can be updated. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  update: (
    billingAccountName: string,
    productName: string,
    parameters: ProductPatch,
    options?: ProductsUpdateOptionalParams,
  ) => Promise<Product>;
  /** Gets a product by ID. The operation is supported only for billing accounts with agreement type Microsoft Customer Agreement. */
  get: (
    billingAccountName: string,
    productName: string,
    options?: ProductsGetOptionalParams,
  ) => Promise<Product>;
}

function _getProducts(context: BillingManagementContext) {
  return {
    listByInvoiceSection: (
      billingAccountName: string,
      billingProfileName: string,
      invoiceSectionName: string,
      options?: ProductsListByInvoiceSectionOptionalParams,
    ) =>
      listByInvoiceSection(
        context,
        billingAccountName,
        billingProfileName,
        invoiceSectionName,
        options,
      ),
    listByCustomer: (
      billingAccountName: string,
      customerName: string,
      options?: ProductsListByCustomerOptionalParams,
    ) => listByCustomer(context, billingAccountName, customerName, options),
    listByBillingProfile: (
      billingAccountName: string,
      billingProfileName: string,
      options?: ProductsListByBillingProfileOptionalParams,
    ) => listByBillingProfile(context, billingAccountName, billingProfileName, options),
    validateMoveEligibility: (
      billingAccountName: string,
      productName: string,
      parameters: MoveProductRequest,
      options?: ProductsValidateMoveEligibilityOptionalParams,
    ) => validateMoveEligibility(context, billingAccountName, productName, parameters, options),
    move: (
      billingAccountName: string,
      productName: string,
      parameters: MoveProductRequest,
      options?: ProductsMoveOptionalParams,
    ) => move(context, billingAccountName, productName, parameters, options),
    beginMove: async (
      billingAccountName: string,
      productName: string,
      parameters: MoveProductRequest,
      options?: ProductsMoveOptionalParams,
    ) => {
      const poller = move(context, billingAccountName, productName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginMoveAndWait: async (
      billingAccountName: string,
      productName: string,
      parameters: MoveProductRequest,
      options?: ProductsMoveOptionalParams,
    ) => {
      return await move(context, billingAccountName, productName, parameters, options);
    },
    listByBillingAccount: (
      billingAccountName: string,
      options?: ProductsListByBillingAccountOptionalParams,
    ) => listByBillingAccount(context, billingAccountName, options),
    update: (
      billingAccountName: string,
      productName: string,
      parameters: ProductPatch,
      options?: ProductsUpdateOptionalParams,
    ) => update(context, billingAccountName, productName, parameters, options),
    get: (billingAccountName: string, productName: string, options?: ProductsGetOptionalParams) =>
      get(context, billingAccountName, productName, options),
  };
}

export function _getProductsOperations(context: BillingManagementContext): ProductsOperations {
  return {
    ..._getProducts(context),
  };
}
