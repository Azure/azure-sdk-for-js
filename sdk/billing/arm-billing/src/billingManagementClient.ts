// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BillingManagementContext,
  BillingManagementClientOptionalParams,
  createBillingManagement,
} from "./api/index.js";
import { AddressOperations, _getAddressOperations } from "./classic/address/index.js";
import { AgreementsOperations, _getAgreementsOperations } from "./classic/agreements/index.js";
import {
  AssociatedTenantsOperations,
  _getAssociatedTenantsOperations,
} from "./classic/associatedTenants/index.js";
import {
  AvailableBalancesOperations,
  _getAvailableBalancesOperations,
} from "./classic/availableBalances/index.js";
import {
  BillingAccountsOperations,
  _getBillingAccountsOperations,
} from "./classic/billingAccounts/index.js";
import {
  BillingPermissionsOperations,
  _getBillingPermissionsOperations,
} from "./classic/billingPermissions/index.js";
import {
  BillingProfilesOperations,
  _getBillingProfilesOperations,
} from "./classic/billingProfiles/index.js";
import {
  BillingPropertyOperations,
  _getBillingPropertyOperations,
} from "./classic/billingProperty/index.js";
import {
  BillingRequestsOperations,
  _getBillingRequestsOperations,
} from "./classic/billingRequests/index.js";
import {
  BillingRoleAssignmentsOperations,
  _getBillingRoleAssignmentsOperations,
} from "./classic/billingRoleAssignments/index.js";
import {
  BillingRoleDefinitionOperations,
  _getBillingRoleDefinitionOperations,
} from "./classic/billingRoleDefinition/index.js";
import {
  BillingSubscriptionsOperations,
  _getBillingSubscriptionsOperations,
} from "./classic/billingSubscriptions/index.js";
import {
  BillingSubscriptionsAliasesOperations,
  _getBillingSubscriptionsAliasesOperations,
} from "./classic/billingSubscriptionsAliases/index.js";
import { CustomersOperations, _getCustomersOperations } from "./classic/customers/index.js";
import { DepartmentsOperations, _getDepartmentsOperations } from "./classic/departments/index.js";
import {
  EnrollmentAccountsOperations,
  _getEnrollmentAccountsOperations,
} from "./classic/enrollmentAccounts/index.js";
import {
  InvoiceSectionsOperations,
  _getInvoiceSectionsOperations,
} from "./classic/invoiceSections/index.js";
import { InvoicesOperations, _getInvoicesOperations } from "./classic/invoices/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PartnerTransfersOperations,
  _getPartnerTransfersOperations,
} from "./classic/partnerTransfers/index.js";
import {
  PaymentMethodsOperations,
  _getPaymentMethodsOperations,
} from "./classic/paymentMethods/index.js";
import { PoliciesOperations, _getPoliciesOperations } from "./classic/policies/index.js";
import { ProductsOperations, _getProductsOperations } from "./classic/products/index.js";
import {
  RecipientTransfersOperations,
  _getRecipientTransfersOperations,
} from "./classic/recipientTransfers/index.js";
import {
  ReservationOrdersOperations,
  _getReservationOrdersOperations,
} from "./classic/reservationOrders/index.js";
import {
  ReservationsOperations,
  _getReservationsOperations,
} from "./classic/reservations/index.js";
import {
  SavingsPlanOrdersOperations,
  _getSavingsPlanOrdersOperations,
} from "./classic/savingsPlanOrders/index.js";
import {
  SavingsPlansOperations,
  _getSavingsPlansOperations,
} from "./classic/savingsPlans/index.js";
import {
  TransactionsOperations,
  _getTransactionsOperations,
} from "./classic/transactions/index.js";
import { TransfersOperations, _getTransfersOperations } from "./classic/transfers/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { BillingManagementClientOptionalParams } from "./api/billingManagementContext.js";

export class BillingManagementClient {
  private _client: BillingManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: BillingManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: BillingManagementClientOptionalParams,
  );
  /** Documentation for Microsoft.Billing. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | BillingManagementClientOptionalParams,
    options?: BillingManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBillingManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.address = _getAddressOperations(this._client);
    this.billingSubscriptionsAliases = _getBillingSubscriptionsAliasesOperations(this._client);
    this.savingsPlanOrders = _getSavingsPlanOrdersOperations(this._client);
    this.billingRoleDefinition = _getBillingRoleDefinitionOperations(this._client);
    this.billingProperty = _getBillingPropertyOperations(this._client);
    this.savingsPlans = _getSavingsPlansOperations(this._client);
    this.billingPermissions = _getBillingPermissionsOperations(this._client);
    this.transactions = _getTransactionsOperations(this._client);
    this.recipientTransfers = _getRecipientTransfersOperations(this._client);
    this.partnerTransfers = _getPartnerTransfersOperations(this._client);
    this.transfers = _getTransfersOperations(this._client);
    this.reservationOrders = _getReservationOrdersOperations(this._client);
    this.paymentMethods = _getPaymentMethodsOperations(this._client);
    this.invoiceSections = _getInvoiceSectionsOperations(this._client);
    this.enrollmentAccounts = _getEnrollmentAccountsOperations(this._client);
    this.departments = _getDepartmentsOperations(this._client);
    this.customers = _getCustomersOperations(this._client);
    this.policies = _getPoliciesOperations(this._client);
    this.billingSubscriptions = _getBillingSubscriptionsOperations(this._client);
    this.billingProfiles = _getBillingProfilesOperations(this._client);
    this.products = _getProductsOperations(this._client);
    this.availableBalances = _getAvailableBalancesOperations(this._client);
    this.associatedTenants = _getAssociatedTenantsOperations(this._client);
    this.billingAccounts = _getBillingAccountsOperations(this._client);
    this.reservations = _getReservationsOperations(this._client);
    this.invoices = _getInvoicesOperations(this._client);
    this.billingRoleAssignments = _getBillingRoleAssignmentsOperations(this._client);
    this.billingRequests = _getBillingRequestsOperations(this._client);
    this.agreements = _getAgreementsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for address */
  public readonly address: AddressOperations;
  /** The operation groups for billingSubscriptionsAliases */
  public readonly billingSubscriptionsAliases: BillingSubscriptionsAliasesOperations;
  /** The operation groups for savingsPlanOrders */
  public readonly savingsPlanOrders: SavingsPlanOrdersOperations;
  /** The operation groups for billingRoleDefinition */
  public readonly billingRoleDefinition: BillingRoleDefinitionOperations;
  /** The operation groups for billingProperty */
  public readonly billingProperty: BillingPropertyOperations;
  /** The operation groups for savingsPlans */
  public readonly savingsPlans: SavingsPlansOperations;
  /** The operation groups for billingPermissions */
  public readonly billingPermissions: BillingPermissionsOperations;
  /** The operation groups for transactions */
  public readonly transactions: TransactionsOperations;
  /** The operation groups for recipientTransfers */
  public readonly recipientTransfers: RecipientTransfersOperations;
  /** The operation groups for partnerTransfers */
  public readonly partnerTransfers: PartnerTransfersOperations;
  /** The operation groups for transfers */
  public readonly transfers: TransfersOperations;
  /** The operation groups for reservationOrders */
  public readonly reservationOrders: ReservationOrdersOperations;
  /** The operation groups for paymentMethods */
  public readonly paymentMethods: PaymentMethodsOperations;
  /** The operation groups for invoiceSections */
  public readonly invoiceSections: InvoiceSectionsOperations;
  /** The operation groups for enrollmentAccounts */
  public readonly enrollmentAccounts: EnrollmentAccountsOperations;
  /** The operation groups for departments */
  public readonly departments: DepartmentsOperations;
  /** The operation groups for customers */
  public readonly customers: CustomersOperations;
  /** The operation groups for policies */
  public readonly policies: PoliciesOperations;
  /** The operation groups for billingSubscriptions */
  public readonly billingSubscriptions: BillingSubscriptionsOperations;
  /** The operation groups for billingProfiles */
  public readonly billingProfiles: BillingProfilesOperations;
  /** The operation groups for products */
  public readonly products: ProductsOperations;
  /** The operation groups for availableBalances */
  public readonly availableBalances: AvailableBalancesOperations;
  /** The operation groups for associatedTenants */
  public readonly associatedTenants: AssociatedTenantsOperations;
  /** The operation groups for billingAccounts */
  public readonly billingAccounts: BillingAccountsOperations;
  /** The operation groups for reservations */
  public readonly reservations: ReservationsOperations;
  /** The operation groups for invoices */
  public readonly invoices: InvoicesOperations;
  /** The operation groups for billingRoleAssignments */
  public readonly billingRoleAssignments: BillingRoleAssignmentsOperations;
  /** The operation groups for billingRequests */
  public readonly billingRequests: BillingRequestsOperations;
  /** The operation groups for agreements */
  public readonly agreements: AgreementsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
