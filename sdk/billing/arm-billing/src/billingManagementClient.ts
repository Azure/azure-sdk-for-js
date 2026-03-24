// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  BillingManagementContext,
  BillingManagementClientOptionalParams,
} from "./api/index.js";
import { createBillingManagement } from "./api/index.js";
import type { AddressOperations } from "./classic/address/index.js";
import { _getAddressOperations } from "./classic/address/index.js";
import type { AgreementsOperations } from "./classic/agreements/index.js";
import { _getAgreementsOperations } from "./classic/agreements/index.js";
import type { AssociatedTenantsOperations } from "./classic/associatedTenants/index.js";
import { _getAssociatedTenantsOperations } from "./classic/associatedTenants/index.js";
import type { AvailableBalancesOperations } from "./classic/availableBalances/index.js";
import { _getAvailableBalancesOperations } from "./classic/availableBalances/index.js";
import type { BillingAccountsOperations } from "./classic/billingAccounts/index.js";
import { _getBillingAccountsOperations } from "./classic/billingAccounts/index.js";
import type { BillingPermissionsOperations } from "./classic/billingPermissions/index.js";
import { _getBillingPermissionsOperations } from "./classic/billingPermissions/index.js";
import type { BillingProfilesOperations } from "./classic/billingProfiles/index.js";
import { _getBillingProfilesOperations } from "./classic/billingProfiles/index.js";
import type { BillingPropertyOperations } from "./classic/billingProperty/index.js";
import { _getBillingPropertyOperations } from "./classic/billingProperty/index.js";
import type { BillingRequestsOperations } from "./classic/billingRequests/index.js";
import { _getBillingRequestsOperations } from "./classic/billingRequests/index.js";
import type { BillingRoleAssignmentsOperations } from "./classic/billingRoleAssignments/index.js";
import { _getBillingRoleAssignmentsOperations } from "./classic/billingRoleAssignments/index.js";
import type { BillingRoleDefinitionOperations } from "./classic/billingRoleDefinition/index.js";
import { _getBillingRoleDefinitionOperations } from "./classic/billingRoleDefinition/index.js";
import type { BillingSubscriptionsOperations } from "./classic/billingSubscriptions/index.js";
import { _getBillingSubscriptionsOperations } from "./classic/billingSubscriptions/index.js";
import type { BillingSubscriptionsAliasesOperations } from "./classic/billingSubscriptionsAliases/index.js";
import { _getBillingSubscriptionsAliasesOperations } from "./classic/billingSubscriptionsAliases/index.js";
import type { CustomersOperations } from "./classic/customers/index.js";
import { _getCustomersOperations } from "./classic/customers/index.js";
import type { DepartmentsOperations } from "./classic/departments/index.js";
import { _getDepartmentsOperations } from "./classic/departments/index.js";
import type { EnrollmentAccountsOperations } from "./classic/enrollmentAccounts/index.js";
import { _getEnrollmentAccountsOperations } from "./classic/enrollmentAccounts/index.js";
import type { InvoiceSectionsOperations } from "./classic/invoiceSections/index.js";
import { _getInvoiceSectionsOperations } from "./classic/invoiceSections/index.js";
import type { InvoicesOperations } from "./classic/invoices/index.js";
import { _getInvoicesOperations } from "./classic/invoices/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PartnerTransfersOperations } from "./classic/partnerTransfers/index.js";
import { _getPartnerTransfersOperations } from "./classic/partnerTransfers/index.js";
import type { PaymentMethodsOperations } from "./classic/paymentMethods/index.js";
import { _getPaymentMethodsOperations } from "./classic/paymentMethods/index.js";
import type { PoliciesOperations } from "./classic/policies/index.js";
import { _getPoliciesOperations } from "./classic/policies/index.js";
import type { ProductsOperations } from "./classic/products/index.js";
import { _getProductsOperations } from "./classic/products/index.js";
import type { RecipientTransfersOperations } from "./classic/recipientTransfers/index.js";
import { _getRecipientTransfersOperations } from "./classic/recipientTransfers/index.js";
import type { ReservationOrdersOperations } from "./classic/reservationOrders/index.js";
import { _getReservationOrdersOperations } from "./classic/reservationOrders/index.js";
import type { ReservationsOperations } from "./classic/reservations/index.js";
import { _getReservationsOperations } from "./classic/reservations/index.js";
import type { SavingsPlanOrdersOperations } from "./classic/savingsPlanOrders/index.js";
import { _getSavingsPlanOrdersOperations } from "./classic/savingsPlanOrders/index.js";
import type { SavingsPlansOperations } from "./classic/savingsPlans/index.js";
import { _getSavingsPlansOperations } from "./classic/savingsPlans/index.js";
import type { TransactionsOperations } from "./classic/transactions/index.js";
import { _getTransactionsOperations } from "./classic/transactions/index.js";
import type { TransfersOperations } from "./classic/transfers/index.js";
import { _getTransfersOperations } from "./classic/transfers/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
