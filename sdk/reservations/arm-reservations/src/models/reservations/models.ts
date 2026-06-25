// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { ProxyResource, systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The list of catalogs and pagination information. */
export interface _CatalogsResult {
  /** The Catalog items on this page */
  value: Catalog[];
  /** The link to the next page of items */
  nextLink?: string;
  /** The total amount of catalog items. */
  totalItems?: number;
}

export function _catalogsResultDeserializer(item: any): _CatalogsResult {
  return {
    value: catalogArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    totalItems: item["totalItems"],
  };
}

export function catalogArrayDeserializer(result: Array<Catalog>): any[] {
  return result.map((item) => {
    return catalogDeserializer(item);
  });
}

/** Product details of a type of resource. */
export interface Catalog {
  /** The type of resource the sku applies to. */
  readonly resourceType?: string;
  /** The name of sku */
  readonly name?: string;
  /** The billing plan options available for this sku. */
  billingPlans?: Record<string, ReservationBillingPlan[]>;
  /** Available reservation terms for this resource */
  readonly terms?: ReservationTerm[];
  readonly locations?: string[];
  readonly skuProperties?: SkuProperty[];
  /** Pricing information about the sku */
  readonly msrp?: CatalogMsrp;
  readonly restrictions?: SkuRestriction[];
  /** The tier of this sku */
  readonly tier?: string;
  /** The size of this sku */
  readonly size?: string;
  readonly capabilities?: SkuCapability[];
}

export function catalogDeserializer(item: any): Catalog {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    billingPlans: !item["billingPlans"]
      ? item["billingPlans"]
      : Object.fromEntries(
          Object.entries(item["billingPlans"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    terms: !item["terms"]
      ? item["terms"]
      : item["terms"].map((p: any) => {
          return p;
        }),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    skuProperties: !item["skuProperties"]
      ? item["skuProperties"]
      : skuPropertyArrayDeserializer(item["skuProperties"]),
    msrp: !item["msrp"] ? item["msrp"] : catalogMsrpDeserializer(item["msrp"]),
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : skuRestrictionArrayDeserializer(item["restrictions"]),
    tier: item["tier"],
    size: item["size"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArrayDeserializer(item["capabilities"]),
  };
}

/** Represent the billing plans. */
export enum KnownReservationBillingPlan {
  /** Upfront */
  Upfront = "Upfront",
  /** Monthly */
  Monthly = "Monthly",
}

/**
 * Represent the billing plans. \
 * {@link KnownReservationBillingPlan} can be used interchangeably with ReservationBillingPlan,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Upfront**: Upfront \
 * **Monthly**: Monthly
 */
export type ReservationBillingPlan = string;

/** Represent the term of reservation. */
export enum KnownReservationTerm {
  /** P1Y */
  P1Y = "P1Y",
  /** P3Y */
  P3Y = "P3Y",
  /** P5Y */
  P5Y = "P5Y",
}

/**
 * Represent the term of reservation. \
 * {@link KnownReservationTerm} can be used interchangeably with ReservationTerm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1Y**: P1Y \
 * **P3Y**: P3Y \
 * **P5Y**: P5Y
 */
export type ReservationTerm = string;

export function skuPropertyArrayDeserializer(result: Array<SkuProperty>): any[] {
  return result.map((item) => {
    return skuPropertyDeserializer(item);
  });
}

/** Property of a sku. */
export interface SkuProperty {
  /** An invariant to describe the feature. */
  name?: string;
  /** An invariant if the feature is measured by quantity. */
  value?: string;
}

export function skuPropertyDeserializer(item: any): SkuProperty {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Pricing information about the sku */
export interface CatalogMsrp {
  /** Amount in pricing currency. Tax not included. */
  p1Y?: Price;
  /** Amount in pricing currency. Tax not included. */
  p3Y?: Price;
  /** Amount in pricing currency. Tax not included. */
  p5Y?: Price;
}

export function catalogMsrpDeserializer(item: any): CatalogMsrp {
  return {
    p1Y: !item["p1Y"] ? item["p1Y"] : priceDeserializer(item["p1Y"]),
    p3Y: !item["p3Y"] ? item["p3Y"] : priceDeserializer(item["p3Y"]),
    p5Y: !item["p5Y"] ? item["p5Y"] : priceDeserializer(item["p5Y"]),
  };
}

/** Pricing information containing the amount and the currency code */
export interface Price {
  /** The ISO 4217 3-letter currency code for the currency used by this purchase record. */
  currencyCode?: string;
  amount?: number;
}

export function priceSerializer(item: Price): any {
  return { currencyCode: item["currencyCode"], amount: item["amount"] };
}

export function priceDeserializer(item: any): Price {
  return {
    currencyCode: item["currencyCode"],
    amount: item["amount"],
  };
}

export function skuRestrictionArrayDeserializer(result: Array<SkuRestriction>): any[] {
  return result.map((item) => {
    return skuRestrictionDeserializer(item);
  });
}

/** Restriction of a sku. */
export interface SkuRestriction {
  /** The type of restrictions. */
  type?: string;
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the sku is restricted. */
  values?: string[];
  /** The reason for restriction. */
  reasonCode?: string;
}

export function skuRestrictionDeserializer(item: any): SkuRestriction {
  return {
    type: item["type"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    reasonCode: item["reasonCode"],
  };
}

export function skuCapabilityArrayDeserializer(result: Array<SkuCapability>): any[] {
  return result.map((item) => {
    return skuCapabilityDeserializer(item);
  });
}

/** Capability of a sku. */
export interface SkuCapability {
  /** An invariant to describe the feature. */
  name?: string;
  /** An invariant if the feature is measured by quantity. */
  value?: string;
}

export function skuCapabilityDeserializer(item: any): SkuCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Error information */
export interface ErrorModel {
  /** Extended error information including error code and error message */
  error?: ExtendedErrorInfo;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    error: !item["error"] ? item["error"] : extendedErrorInfoDeserializer(item["error"]),
  };
}

/** Extended error information including error code and error message */
export interface ExtendedErrorInfo {
  /** Error code describing the reason that service is not able to process the incoming request */
  code?: ErrorResponseCode;
  message?: string;
}

export function extendedErrorInfoDeserializer(item: any): ExtendedErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Error code describing the reason that service is not able to process the incoming request */
export enum KnownErrorResponseCode {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** InternalServerError */
  InternalServerError = "InternalServerError",
  /** ServerTimeout */
  ServerTimeout = "ServerTimeout",
  /** AuthorizationFailed */
  AuthorizationFailed = "AuthorizationFailed",
  /** BadRequest */
  BadRequest = "BadRequest",
  /** ClientCertificateThumbprintNotSet */
  ClientCertificateThumbprintNotSet = "ClientCertificateThumbprintNotSet",
  /** InvalidRequestContent */
  InvalidRequestContent = "InvalidRequestContent",
  /** OperationFailed */
  OperationFailed = "OperationFailed",
  /** HttpMethodNotSupported */
  HttpMethodNotSupported = "HttpMethodNotSupported",
  /** InvalidRequestUri */
  InvalidRequestUri = "InvalidRequestUri",
  /** MissingTenantId */
  MissingTenantId = "MissingTenantId",
  /** InvalidTenantId */
  InvalidTenantId = "InvalidTenantId",
  /** InvalidReservationOrderId */
  InvalidReservationOrderId = "InvalidReservationOrderId",
  /** InvalidReservationId */
  InvalidReservationId = "InvalidReservationId",
  /** ReservationIdNotInReservationOrder */
  ReservationIdNotInReservationOrder = "ReservationIdNotInReservationOrder",
  /** ReservationOrderNotFound */
  ReservationOrderNotFound = "ReservationOrderNotFound",
  /** InvalidSubscriptionId */
  InvalidSubscriptionId = "InvalidSubscriptionId",
  /** InvalidAccessToken */
  InvalidAccessToken = "InvalidAccessToken",
  /** InvalidLocationId */
  InvalidLocationId = "InvalidLocationId",
  /** UnauthenticatedRequestsThrottled */
  UnauthenticatedRequestsThrottled = "UnauthenticatedRequestsThrottled",
  /** InvalidHealthCheckType */
  InvalidHealthCheckType = "InvalidHealthCheckType",
  /** Forbidden */
  Forbidden = "Forbidden",
  /** BillingScopeIdCannotBeChanged */
  BillingScopeIdCannotBeChanged = "BillingScopeIdCannotBeChanged",
  /** AppliedScopesNotAssociatedWithCommerceAccount */
  AppliedScopesNotAssociatedWithCommerceAccount = "AppliedScopesNotAssociatedWithCommerceAccount",
  /** PatchValuesSameAsExisting */
  PatchValuesSameAsExisting = "PatchValuesSameAsExisting",
  /** RoleAssignmentCreationFailed */
  RoleAssignmentCreationFailed = "RoleAssignmentCreationFailed",
  /** ReservationOrderCreationFailed */
  ReservationOrderCreationFailed = "ReservationOrderCreationFailed",
  /** ReservationOrderNotEnabled */
  ReservationOrderNotEnabled = "ReservationOrderNotEnabled",
  /** CapacityUpdateScopesFailed */
  CapacityUpdateScopesFailed = "CapacityUpdateScopesFailed",
  /** UnsupportedReservationTerm */
  UnsupportedReservationTerm = "UnsupportedReservationTerm",
  /** ReservationOrderIdAlreadyExists */
  ReservationOrderIdAlreadyExists = "ReservationOrderIdAlreadyExists",
  /** RiskCheckFailed */
  RiskCheckFailed = "RiskCheckFailed",
  /** CreateQuoteFailed */
  CreateQuoteFailed = "CreateQuoteFailed",
  /** ActivateQuoteFailed */
  ActivateQuoteFailed = "ActivateQuoteFailed",
  /** NonsupportedAccountId */
  NonsupportedAccountId = "NonsupportedAccountId",
  /** PaymentInstrumentNotFound */
  PaymentInstrumentNotFound = "PaymentInstrumentNotFound",
  /** MissingAppliedScopesForSingle */
  MissingAppliedScopesForSingle = "MissingAppliedScopesForSingle",
  /** NoValidReservationsToReRate */
  NoValidReservationsToReRate = "NoValidReservationsToReRate",
  /** ReRateOnlyAllowedForEA */
  ReRateOnlyAllowedForEA = "ReRateOnlyAllowedForEA",
  /** OperationCannotBePerformedInCurrentState */
  OperationCannotBePerformedInCurrentState = "OperationCannotBePerformedInCurrentState",
  /** InvalidSingleAppliedScopesCount */
  InvalidSingleAppliedScopesCount = "InvalidSingleAppliedScopesCount",
  /** InvalidFulfillmentRequestParameters */
  InvalidFulfillmentRequestParameters = "InvalidFulfillmentRequestParameters",
  /** NotSupportedCountry */
  NotSupportedCountry = "NotSupportedCountry",
  /** InvalidRefundQuantity */
  InvalidRefundQuantity = "InvalidRefundQuantity",
  /** PurchaseError */
  PurchaseError = "PurchaseError",
  /** BillingCustomerInputError */
  BillingCustomerInputError = "BillingCustomerInputError",
  /** BillingPaymentInstrumentSoftError */
  BillingPaymentInstrumentSoftError = "BillingPaymentInstrumentSoftError",
  /** BillingPaymentInstrumentHardError */
  BillingPaymentInstrumentHardError = "BillingPaymentInstrumentHardError",
  /** BillingTransientError */
  BillingTransientError = "BillingTransientError",
  /** BillingError */
  BillingError = "BillingError",
  /** FulfillmentConfigurationError */
  FulfillmentConfigurationError = "FulfillmentConfigurationError",
  /** FulfillmentOutOfStockError */
  FulfillmentOutOfStockError = "FulfillmentOutOfStockError",
  /** FulfillmentTransientError */
  FulfillmentTransientError = "FulfillmentTransientError",
  /** FulfillmentError */
  FulfillmentError = "FulfillmentError",
  /** CalculatePriceFailed */
  CalculatePriceFailed = "CalculatePriceFailed",
  /** AppliedScopesSameAsExisting */
  AppliedScopesSameAsExisting = "AppliedScopesSameAsExisting",
  /** SelfServiceRefundNotSupported */
  SelfServiceRefundNotSupported = "SelfServiceRefundNotSupported",
  /** RefundLimitExceeded */
  RefundLimitExceeded = "RefundLimitExceeded",
}

/**
 * Error code describing the reason that service is not able to process the incoming request \
 * {@link KnownErrorResponseCode} can be used interchangeably with ErrorResponseCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **InternalServerError**: InternalServerError \
 * **ServerTimeout**: ServerTimeout \
 * **AuthorizationFailed**: AuthorizationFailed \
 * **BadRequest**: BadRequest \
 * **ClientCertificateThumbprintNotSet**: ClientCertificateThumbprintNotSet \
 * **InvalidRequestContent**: InvalidRequestContent \
 * **OperationFailed**: OperationFailed \
 * **HttpMethodNotSupported**: HttpMethodNotSupported \
 * **InvalidRequestUri**: InvalidRequestUri \
 * **MissingTenantId**: MissingTenantId \
 * **InvalidTenantId**: InvalidTenantId \
 * **InvalidReservationOrderId**: InvalidReservationOrderId \
 * **InvalidReservationId**: InvalidReservationId \
 * **ReservationIdNotInReservationOrder**: ReservationIdNotInReservationOrder \
 * **ReservationOrderNotFound**: ReservationOrderNotFound \
 * **InvalidSubscriptionId**: InvalidSubscriptionId \
 * **InvalidAccessToken**: InvalidAccessToken \
 * **InvalidLocationId**: InvalidLocationId \
 * **UnauthenticatedRequestsThrottled**: UnauthenticatedRequestsThrottled \
 * **InvalidHealthCheckType**: InvalidHealthCheckType \
 * **Forbidden**: Forbidden \
 * **BillingScopeIdCannotBeChanged**: BillingScopeIdCannotBeChanged \
 * **AppliedScopesNotAssociatedWithCommerceAccount**: AppliedScopesNotAssociatedWithCommerceAccount \
 * **PatchValuesSameAsExisting**: PatchValuesSameAsExisting \
 * **RoleAssignmentCreationFailed**: RoleAssignmentCreationFailed \
 * **ReservationOrderCreationFailed**: ReservationOrderCreationFailed \
 * **ReservationOrderNotEnabled**: ReservationOrderNotEnabled \
 * **CapacityUpdateScopesFailed**: CapacityUpdateScopesFailed \
 * **UnsupportedReservationTerm**: UnsupportedReservationTerm \
 * **ReservationOrderIdAlreadyExists**: ReservationOrderIdAlreadyExists \
 * **RiskCheckFailed**: RiskCheckFailed \
 * **CreateQuoteFailed**: CreateQuoteFailed \
 * **ActivateQuoteFailed**: ActivateQuoteFailed \
 * **NonsupportedAccountId**: NonsupportedAccountId \
 * **PaymentInstrumentNotFound**: PaymentInstrumentNotFound \
 * **MissingAppliedScopesForSingle**: MissingAppliedScopesForSingle \
 * **NoValidReservationsToReRate**: NoValidReservationsToReRate \
 * **ReRateOnlyAllowedForEA**: ReRateOnlyAllowedForEA \
 * **OperationCannotBePerformedInCurrentState**: OperationCannotBePerformedInCurrentState \
 * **InvalidSingleAppliedScopesCount**: InvalidSingleAppliedScopesCount \
 * **InvalidFulfillmentRequestParameters**: InvalidFulfillmentRequestParameters \
 * **NotSupportedCountry**: NotSupportedCountry \
 * **InvalidRefundQuantity**: InvalidRefundQuantity \
 * **PurchaseError**: PurchaseError \
 * **BillingCustomerInputError**: BillingCustomerInputError \
 * **BillingPaymentInstrumentSoftError**: BillingPaymentInstrumentSoftError \
 * **BillingPaymentInstrumentHardError**: BillingPaymentInstrumentHardError \
 * **BillingTransientError**: BillingTransientError \
 * **BillingError**: BillingError \
 * **FulfillmentConfigurationError**: FulfillmentConfigurationError \
 * **FulfillmentOutOfStockError**: FulfillmentOutOfStockError \
 * **FulfillmentTransientError**: FulfillmentTransientError \
 * **FulfillmentError**: FulfillmentError \
 * **CalculatePriceFailed**: CalculatePriceFailed \
 * **AppliedScopesSameAsExisting**: AppliedScopesSameAsExisting \
 * **SelfServiceRefundNotSupported**: SelfServiceRefundNotSupported \
 * **RefundLimitExceeded**: RefundLimitExceeded
 */
export type ErrorResponseCode = string;

/** The response for applied reservations api */
export interface AppliedReservations {
  /** Identifier of the applied reservations */
  readonly id?: string;
  /** Name of resource */
  readonly name?: string;
  /** Type of resource. "Microsoft.Capacity/AppliedReservations" */
  readonly type?: string;
  /** Paginated list of applied reservations */
  reservationOrderIds?: AppliedReservationList;
}

export function appliedReservationsDeserializer(item: any): AppliedReservations {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _appliedReservationsPropertiesDeserializer(item["properties"])),
  };
}

/** Properties for applied reservations returned */
export interface AppliedReservationsProperties {
  /** Paginated list of applied reservations */
  reservationOrderIds?: AppliedReservationList;
}

export function appliedReservationsPropertiesDeserializer(
  item: any,
): AppliedReservationsProperties {
  return {
    reservationOrderIds: !item["reservationOrderIds"]
      ? item["reservationOrderIds"]
      : appliedReservationListDeserializer(item["reservationOrderIds"]),
  };
}

/** Paginated list of applied reservations */
export interface AppliedReservationList {
  /** Array of reservation resource ids */
  value?: string[];
  /** Url to get the next page of reservations */
  nextLink?: string;
}

export function appliedReservationListDeserializer(item: any): AppliedReservationList {
  return {
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
    nextLink: item["nextLink"],
  };
}

/** model interface _OperationList */
export interface _OperationList {
  value?: OperationResponse[];
  /** Url to get the next page of items. */
  nextLink?: string;
}

export function _operationListDeserializer(item: any): _OperationList {
  return {
    value: !item["value"] ? item["value"] : operationResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationResponseArrayDeserializer(result: Array<OperationResponse>): any[] {
  return result.map((item) => {
    return operationResponseDeserializer(item);
  });
}

/** The response containing operation information */
export interface OperationResponse {
  /** Name of the operation */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** Display of the operation */
  display?: OperationDisplay;
  /** Origin of the operation */
  origin?: string;
  /** Properties of the operation */
  properties?: any;
}

export function operationResponseDeserializer(item: any): OperationResponse {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** Information about an operation */
export interface OperationDisplay {
  provider?: string;
  resource?: string;
  operation?: string;
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The definition of the reservation. */
export interface ReservationResponse extends ProxyResource {
  /** The properties associated to this reservation */
  properties?: ReservationsProperties;
  /** The Azure region where the reserved resource lives. */
  location?: string;
  etag?: number;
  /** The sku information associated to this reservation */
  sku?: SkuName;
  /** Resource Provider type to be reserved. */
  kind?: "Microsoft.Compute";
}

export function reservationResponseDeserializer(item: any): ReservationResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : reservationsPropertiesDeserializer(item["properties"]),
    location: item["location"],
    etag: item["etag"],
    sku: !item["sku"] ? item["sku"] : skuNameDeserializer(item["sku"]),
    kind: item["kind"],
  };
}

/** The properties of the reservations */
export interface ReservationsProperties {
  /** The type of the resource that is being reserved. */
  reservedResourceType?: ReservedResourceType;
  /** Allows reservation discount to be applied across skus within the same auto fit group. Not all skus support instance size flexibility. */
  instanceFlexibility?: InstanceFlexibility;
  /** Friendly name for user to easily identify the reservation */
  displayName?: string;
  /** The list of applied scopes */
  appliedScopes?: string[];
  /** The applied scope type */
  appliedScopeType?: AppliedScopeType;
  /** Indicates if the reservation is archived */
  archived?: boolean;
  /** Capabilities of the reservation */
  capabilities?: string;
  /** Quantity of the skus that are part of the reservation. Must be greater than zero. */
  quantity?: number;
  /** Current state of the reservation. */
  provisioningState?: ProvisioningState;
  /** DateTime of the reservation starting when this version is effective from. */
  effectiveDateTime?: Date;
  /** This is the DateTime when the reservation benefit started. */
  benefitStartTime?: Date;
  /** DateTime of the last time the reservation was updated. */
  readonly lastUpdatedDateTime?: Date;
  /** This is the date when the reservation will expire. */
  expiryDate?: Date;
  /** This is the date-time when the reservation will expire. */
  expiryDateTime?: Date;
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** Description of the sku in english. */
  skuDescription?: string;
  /** The message giving detailed information about the status code. */
  extendedStatusInfo?: ExtendedStatusInfo;
  /** The billing plan options available for this sku. */
  billingPlan?: ReservationBillingPlan;
  /** The provisioning state of the reservation for display, e.g. Succeeded */
  readonly displayProvisioningState?: string;
  /** The provisioning sub-state of the reservation, e.g. Succeeded */
  readonly provisioningSubState?: string;
  /** This is the date when the reservation was purchased. */
  purchaseDate?: Date;
  /** This is the date-time when the reservation was purchased. */
  purchaseDateTime?: Date;
  /** Properties of reservation split */
  splitProperties?: ReservationSplitProperties;
  /** Properties of reservation merge */
  mergeProperties?: ReservationMergeProperties;
  /** Properties of reservation swap */
  swapProperties?: ReservationSwapProperties;
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  billingScopeId?: string;
  /** Setting this to true will automatically purchase a new reservation on the expiration date time. */
  renew?: boolean;
  /** Reservation Id of the reservation from which this reservation is renewed. Format of the resource Id is /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}. */
  renewSource?: string;
  /** Reservation Id of the reservation which is purchased because of renew. Format of the resource Id is /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}. */
  renewDestination?: string;
  /** The renew properties for a reservation. */
  renewProperties?: RenewPropertiesResponse;
  /** Represent the term of reservation. */
  term?: ReservationTerm;
  /** The applied scope type of the reservation for display, e.g. Shared */
  readonly userFriendlyAppliedScopeType?: string;
  /** The renew state of the reservation for display, e.g. On */
  readonly userFriendlyRenewState?: string;
  /** Reservation utilization */
  readonly utilization?: ReservationsPropertiesUtilization;
}

export function reservationsPropertiesDeserializer(item: any): ReservationsProperties {
  return {
    reservedResourceType: item["reservedResourceType"],
    instanceFlexibility: item["instanceFlexibility"],
    displayName: item["displayName"],
    appliedScopes: !item["appliedScopes"]
      ? item["appliedScopes"]
      : item["appliedScopes"].map((p: any) => {
          return p;
        }),
    appliedScopeType: item["appliedScopeType"],
    archived: item["archived"],
    capabilities: item["capabilities"],
    quantity: item["quantity"],
    provisioningState: item["provisioningState"],
    effectiveDateTime: !item["effectiveDateTime"]
      ? item["effectiveDateTime"]
      : new Date(item["effectiveDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    lastUpdatedDateTime: !item["lastUpdatedDateTime"]
      ? item["lastUpdatedDateTime"]
      : new Date(item["lastUpdatedDateTime"]),
    expiryDate: !item["expiryDate"] ? item["expiryDate"] : new Date(item["expiryDate"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
    skuDescription: item["skuDescription"],
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
    billingPlan: item["billingPlan"],
    displayProvisioningState: item["displayProvisioningState"],
    provisioningSubState: item["provisioningSubState"],
    purchaseDate: !item["purchaseDate"] ? item["purchaseDate"] : new Date(item["purchaseDate"]),
    purchaseDateTime: !item["purchaseDateTime"]
      ? item["purchaseDateTime"]
      : new Date(item["purchaseDateTime"]),
    splitProperties: !item["splitProperties"]
      ? item["splitProperties"]
      : reservationSplitPropertiesDeserializer(item["splitProperties"]),
    mergeProperties: !item["mergeProperties"]
      ? item["mergeProperties"]
      : reservationMergePropertiesDeserializer(item["mergeProperties"]),
    swapProperties: !item["swapProperties"]
      ? item["swapProperties"]
      : reservationSwapPropertiesDeserializer(item["swapProperties"]),
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    billingScopeId: item["billingScopeId"],
    renew: item["renew"],
    renewSource: item["renewSource"],
    renewDestination: item["renewDestination"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : renewPropertiesResponseDeserializer(item["renewProperties"]),
    term: item["term"],
    userFriendlyAppliedScopeType: item["userFriendlyAppliedScopeType"],
    userFriendlyRenewState: item["userFriendlyRenewState"],
    utilization: !item["utilization"]
      ? item["utilization"]
      : reservationsPropertiesUtilizationDeserializer(item["utilization"]),
  };
}

/** The type of the resource that is being reserved. In addition to below types we have also added the following: OpenAIPTU, MDC, Sentinel. */
export enum KnownReservedResourceType {
  /** VirtualMachines */
  VirtualMachines = "VirtualMachines",
  /** SqlDatabases */
  SqlDatabases = "SqlDatabases",
  /** SuseLinux */
  SuseLinux = "SuseLinux",
  /** CosmosDb */
  CosmosDb = "CosmosDb",
  /** RedHat */
  RedHat = "RedHat",
  /** SqlDataWarehouse */
  SqlDataWarehouse = "SqlDataWarehouse",
  /** VMwareCloudSimple */
  VMwareCloudSimple = "VMwareCloudSimple",
  /** RedHatOsa */
  RedHatOsa = "RedHatOsa",
  /** Databricks */
  Databricks = "Databricks",
  /** AppService */
  AppService = "AppService",
  /** ManagedDisk */
  ManagedDisk = "ManagedDisk",
  /** BlockBlob */
  BlockBlob = "BlockBlob",
  /** RedisCache */
  RedisCache = "RedisCache",
  /** AzureDataExplorer */
  AzureDataExplorer = "AzureDataExplorer",
  /** MySql */
  MySql = "MySql",
  /** MariaDb */
  MariaDb = "MariaDb",
  /** PostgreSql */
  PostgreSql = "PostgreSql",
  /** DedicatedHost */
  DedicatedHost = "DedicatedHost",
  /** SapHana */
  SapHana = "SapHana",
  /** SqlAzureHybridBenefit */
  SqlAzureHybridBenefit = "SqlAzureHybridBenefit",
  /** AVS */
  AVS = "AVS",
  /** DataFactory */
  DataFactory = "DataFactory",
  /** NetAppStorage */
  NetAppStorage = "NetAppStorage",
  /** AzureFiles */
  AzureFiles = "AzureFiles",
  /** SqlEdge */
  SqlEdge = "SqlEdge",
  /** VirtualMachineSoftware */
  VirtualMachineSoftware = "VirtualMachineSoftware",
}

/**
 * The type of the resource that is being reserved. In addition to below types we have also added the following: OpenAIPTU, MDC, Sentinel. \
 * {@link KnownReservedResourceType} can be used interchangeably with ReservedResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VirtualMachines**: VirtualMachines \
 * **SqlDatabases**: SqlDatabases \
 * **SuseLinux**: SuseLinux \
 * **CosmosDb**: CosmosDb \
 * **RedHat**: RedHat \
 * **SqlDataWarehouse**: SqlDataWarehouse \
 * **VMwareCloudSimple**: VMwareCloudSimple \
 * **RedHatOsa**: RedHatOsa \
 * **Databricks**: Databricks \
 * **AppService**: AppService \
 * **ManagedDisk**: ManagedDisk \
 * **BlockBlob**: BlockBlob \
 * **RedisCache**: RedisCache \
 * **AzureDataExplorer**: AzureDataExplorer \
 * **MySql**: MySql \
 * **MariaDb**: MariaDb \
 * **PostgreSql**: PostgreSql \
 * **DedicatedHost**: DedicatedHost \
 * **SapHana**: SapHana \
 * **SqlAzureHybridBenefit**: SqlAzureHybridBenefit \
 * **AVS**: AVS \
 * **DataFactory**: DataFactory \
 * **NetAppStorage**: NetAppStorage \
 * **AzureFiles**: AzureFiles \
 * **SqlEdge**: SqlEdge \
 * **VirtualMachineSoftware**: VirtualMachineSoftware
 */
export type ReservedResourceType = string;

/** Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. */
export enum KnownInstanceFlexibility {
  /** On */
  On = "On",
  /** Off */
  Off = "Off",
}

/**
 * Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. \
 * {@link KnownInstanceFlexibility} can be used interchangeably with InstanceFlexibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **On**: On \
 * **Off**: Off
 */
export type InstanceFlexibility = string;

/** Type of the Applied Scope. */
export enum KnownAppliedScopeType {
  /** Single */
  Single = "Single",
  /** Shared */
  Shared = "Shared",
  /** ManagementGroup */
  ManagementGroup = "ManagementGroup",
}

/**
 * Type of the Applied Scope. \
 * {@link KnownAppliedScopeType} can be used interchangeably with AppliedScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Single**: Single \
 * **Shared**: Shared \
 * **ManagementGroup**: ManagementGroup
 */
export type AppliedScopeType = string;

/** Represent the current state of the Reservation. */
export enum KnownProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** PendingResourceHold */
  PendingResourceHold = "PendingResourceHold",
  /** ConfirmedResourceHold */
  ConfirmedResourceHold = "ConfirmedResourceHold",
  /** PendingBilling */
  PendingBilling = "PendingBilling",
  /** ConfirmedBilling */
  ConfirmedBilling = "ConfirmedBilling",
  /** Created */
  Created = "Created",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Expired */
  Expired = "Expired",
  /** BillingFailed */
  BillingFailed = "BillingFailed",
  /** Failed */
  Failed = "Failed",
  /** Split */
  Split = "Split",
  /** Merged */
  Merged = "Merged",
}

/**
 * Represent the current state of the Reservation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **PendingResourceHold**: PendingResourceHold \
 * **ConfirmedResourceHold**: ConfirmedResourceHold \
 * **PendingBilling**: PendingBilling \
 * **ConfirmedBilling**: ConfirmedBilling \
 * **Created**: Created \
 * **Succeeded**: Succeeded \
 * **Cancelled**: Cancelled \
 * **Expired**: Expired \
 * **BillingFailed**: BillingFailed \
 * **Failed**: Failed \
 * **Split**: Split \
 * **Merged**: Merged
 */
export type ProvisioningState = string;

/** model interface ExtendedStatusInfo */
export interface ExtendedStatusInfo {
  statusCode?: ReservationStatusCode;
  /** The message giving detailed information about the status code. */
  message?: string;
}

export function extendedStatusInfoDeserializer(item: any): ExtendedStatusInfo {
  return {
    statusCode: item["statusCode"],
    message: item["message"],
  };
}

/** Known values of {@link ReservationStatusCode} that the service accepts. */
export enum KnownReservationStatusCode {
  /** None */
  None = "None",
  /** Pending */
  Pending = "Pending",
  /** Processing */
  Processing = "Processing",
  /** Active */
  Active = "Active",
  /** PurchaseError */
  PurchaseError = "PurchaseError",
  /** PaymentInstrumentError */
  PaymentInstrumentError = "PaymentInstrumentError",
  /** Split */
  Split = "Split",
  /** Merged */
  Merged = "Merged",
  /** Expired */
  Expired = "Expired",
  /** Succeeded */
  Succeeded = "Succeeded",
}

/** Type of ReservationStatusCode */
export type ReservationStatusCode = string;

/** Properties of reservation split */
export interface ReservationSplitProperties {
  /** List of destination resource id that are created due to split. Format of the resource id is /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  splitDestinations?: string[];
  /** Resource id of the reservation from which this is split. Format of the resource id is /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  splitSource?: string;
}

export function reservationSplitPropertiesDeserializer(item: any): ReservationSplitProperties {
  return {
    splitDestinations: !item["splitDestinations"]
      ? item["splitDestinations"]
      : item["splitDestinations"].map((p: any) => {
          return p;
        }),
    splitSource: item["splitSource"],
  };
}

/** Properties of reservation merge */
export interface ReservationMergeProperties {
  /** Reservation resource id Created due to the merge. Format of the resource id is /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  mergeDestination?: string;
  /** Resource ids of the source reservation's merged to form this reservation. Format of the resource id is /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  mergeSources?: string[];
}

export function reservationMergePropertiesDeserializer(item: any): ReservationMergeProperties {
  return {
    mergeDestination: item["mergeDestination"],
    mergeSources: !item["mergeSources"]
      ? item["mergeSources"]
      : item["mergeSources"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties of reservation swap */
export interface ReservationSwapProperties {
  /** Resource id of the source reservation that gets swapped. Format of the resource id is /providers/microsoft.capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  swapSource?: string;
  /** Reservation resource id that the original resource gets swapped to. Format of the resource id is /providers/microsoft.capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  swapDestination?: string;
}

export function reservationSwapPropertiesDeserializer(item: any): ReservationSwapProperties {
  return {
    swapSource: item["swapSource"],
    swapDestination: item["swapDestination"],
  };
}

/** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
export interface AppliedScopeProperties {
  /** Tenant ID where the savings plan should apply benefit. */
  tenantId?: string;
  /** Fully-qualified identifier of the management group where the benefit must be applied. */
  managementGroupId?: string;
  /** Fully-qualified identifier of the subscription. */
  subscriptionId?: string;
  /** Fully-qualified identifier of the resource group. */
  resourceGroupId?: string;
  /** Display name */
  displayName?: string;
}

export function appliedScopePropertiesSerializer(item: AppliedScopeProperties): any {
  return {
    tenantId: item["tenantId"],
    managementGroupId: item["managementGroupId"],
    subscriptionId: item["subscriptionId"],
    resourceGroupId: item["resourceGroupId"],
    displayName: item["displayName"],
  };
}

export function appliedScopePropertiesDeserializer(item: any): AppliedScopeProperties {
  return {
    tenantId: item["tenantId"],
    managementGroupId: item["managementGroupId"],
    subscriptionId: item["subscriptionId"],
    resourceGroupId: item["resourceGroupId"],
    displayName: item["displayName"],
  };
}

/** The renew properties for a reservation. */
export interface RenewPropertiesResponse {
  /** The request for reservation purchase */
  purchaseProperties?: PurchaseRequest;
  /** Amount that Microsoft uses for record. Used during refund for calculating refund limit. Tax is not included. This is locked price 30 days before expiry. */
  pricingCurrencyTotal?: RenewPropertiesResponsePricingCurrencyTotal;
  /** Currency and amount that customer will be charged in customer's local currency for renewal purchase. Tax is not included. */
  billingCurrencyTotal?: RenewPropertiesResponseBillingCurrencyTotal;
}

export function renewPropertiesResponseDeserializer(item: any): RenewPropertiesResponse {
  return {
    purchaseProperties: !item["purchaseProperties"]
      ? item["purchaseProperties"]
      : purchaseRequestDeserializer(item["purchaseProperties"]),
    pricingCurrencyTotal: !item["pricingCurrencyTotal"]
      ? item["pricingCurrencyTotal"]
      : renewPropertiesResponsePricingCurrencyTotalDeserializer(item["pricingCurrencyTotal"]),
    billingCurrencyTotal: !item["billingCurrencyTotal"]
      ? item["billingCurrencyTotal"]
      : renewPropertiesResponseBillingCurrencyTotalDeserializer(item["billingCurrencyTotal"]),
  };
}

/** The request for reservation purchase */
export interface PurchaseRequest {
  /** The name of sku */
  sku?: SkuName;
  /** The Azure region where the reserved resource lives. */
  location?: string;
  /** The type of the resource that is being reserved. In addition to below types we have also added the following: OpenAIPTU, MDC, Sentinel. */
  reservedResourceType?: ReservedResourceType;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  billingScopeId?: string;
  /** Represent the term of reservation. */
  term?: ReservationTerm;
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** Quantity of the skus that are part of the reservation. */
  quantity?: number;
  /** Friendly name of the reservation */
  displayName?: string;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** List of the subscriptions that the benefit will be applied. Do not specify if AppliedScopeType is Shared. This property will be deprecated and replaced by appliedScopeProperties instead for Single AppliedScopeType. */
  appliedScopes?: string[];
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Setting this to true will automatically purchase a new reservation on the expiration date time. */
  renew?: boolean;
  /** Properties specific to each reserved resource type. Not required if not applicable. */
  reservedResourceProperties?: PurchaseRequestPropertiesReservedResourceProperties;
  /** This is the date-time when the Azure hybrid benefit needs to be reviewed. */
  reviewDateTime?: Date;
}

export function purchaseRequestSerializer(item: PurchaseRequest): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuNameSerializer(item["sku"]),
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "reservedResourceType",
      "billingScopeId",
      "term",
      "billingPlan",
      "quantity",
      "displayName",
      "appliedScopeType",
      "appliedScopes",
      "appliedScopeProperties",
      "renew",
      "reservedResourceProperties",
      "reviewDateTime",
    ])
      ? undefined
      : _purchaseRequestPropertiesSerializer(item),
  };
}

export function purchaseRequestDeserializer(item: any): PurchaseRequest {
  return {
    sku: !item["sku"] ? item["sku"] : skuNameDeserializer(item["sku"]),
    location: item["location"],
    ...(!item["properties"]
      ? item["properties"]
      : _purchaseRequestPropertiesDeserializer(item["properties"])),
  };
}

/** The name of sku */
export interface SkuName {
  name?: string;
}

export function skuNameSerializer(item: SkuName): any {
  return { name: item["name"] };
}

export function skuNameDeserializer(item: any): SkuName {
  return {
    name: item["name"],
  };
}

/** Properties of reservation purchase request */
export interface PurchaseRequestProperties {
  /** The type of the resource that is being reserved. In addition to below types we have also added the following: OpenAIPTU, MDC, Sentinel. */
  reservedResourceType?: ReservedResourceType;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  billingScopeId?: string;
  /** Represent the term of reservation. */
  term?: ReservationTerm;
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** Quantity of the skus that are part of the reservation. */
  quantity?: number;
  /** Friendly name of the reservation */
  displayName?: string;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** List of the subscriptions that the benefit will be applied. Do not specify if AppliedScopeType is Shared. This property will be deprecated and replaced by appliedScopeProperties instead for Single AppliedScopeType. */
  appliedScopes?: string[];
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Setting this to true will automatically purchase a new reservation on the expiration date time. */
  renew?: boolean;
  /** Properties specific to each reserved resource type. Not required if not applicable. */
  reservedResourceProperties?: PurchaseRequestPropertiesReservedResourceProperties;
  /** This is the date-time when the Azure hybrid benefit needs to be reviewed. */
  reviewDateTime?: Date;
}

export function purchaseRequestPropertiesSerializer(item: PurchaseRequestProperties): any {
  return {
    reservedResourceType: item["reservedResourceType"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    quantity: item["quantity"],
    displayName: item["displayName"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopes: !item["appliedScopes"]
      ? item["appliedScopes"]
      : item["appliedScopes"].map((p: any) => {
          return p;
        }),
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : purchaseRequestPropertiesReservedResourcePropertiesSerializer(
          item["reservedResourceProperties"],
        ),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
  };
}

export function purchaseRequestPropertiesDeserializer(item: any): PurchaseRequestProperties {
  return {
    reservedResourceType: item["reservedResourceType"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    quantity: item["quantity"],
    displayName: item["displayName"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopes: !item["appliedScopes"]
      ? item["appliedScopes"]
      : item["appliedScopes"].map((p: any) => {
          return p;
        }),
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : purchaseRequestPropertiesReservedResourcePropertiesDeserializer(
          item["reservedResourceProperties"],
        ),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
  };
}

/** Properties specific to each reserved resource type. Not required if not applicable. */
export interface PurchaseRequestPropertiesReservedResourceProperties {
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. */
  instanceFlexibility?: InstanceFlexibility;
}

export function purchaseRequestPropertiesReservedResourcePropertiesSerializer(
  item: PurchaseRequestPropertiesReservedResourceProperties,
): any {
  return { instanceFlexibility: item["instanceFlexibility"] };
}

export function purchaseRequestPropertiesReservedResourcePropertiesDeserializer(
  item: any,
): PurchaseRequestPropertiesReservedResourceProperties {
  return {
    instanceFlexibility: item["instanceFlexibility"],
  };
}

/** Amount that Microsoft uses for record. Used during refund for calculating refund limit. Tax is not included. This is locked price 30 days before expiry. */
export interface RenewPropertiesResponsePricingCurrencyTotal {
  /** The ISO 4217 3-letter currency code for the currency used by this purchase record. */
  currencyCode?: string;
  amount?: number;
}

export function renewPropertiesResponsePricingCurrencyTotalDeserializer(
  item: any,
): RenewPropertiesResponsePricingCurrencyTotal {
  return {
    currencyCode: item["currencyCode"],
    amount: item["amount"],
  };
}

/** Currency and amount that customer will be charged in customer's local currency for renewal purchase. Tax is not included. */
export interface RenewPropertiesResponseBillingCurrencyTotal {
  /** The ISO 4217 3-letter currency code for the currency used by this purchase record. */
  currencyCode?: string;
  amount?: number;
}

export function renewPropertiesResponseBillingCurrencyTotalDeserializer(
  item: any,
): RenewPropertiesResponseBillingCurrencyTotal {
  return {
    currencyCode: item["currencyCode"],
    amount: item["amount"],
  };
}

/** Reservation utilization */
export interface ReservationsPropertiesUtilization {
  /** last 7 day utilization trend for a reservation */
  readonly trend?: string;
  /** The array of aggregates of a reservation's utilization */
  aggregates?: ReservationUtilizationAggregates[];
}

export function reservationsPropertiesUtilizationDeserializer(
  item: any,
): ReservationsPropertiesUtilization {
  return {
    trend: item["trend"],
    aggregates: !item["aggregates"]
      ? item["aggregates"]
      : reservationUtilizationAggregatesArrayDeserializer(item["aggregates"]),
  };
}

export function reservationUtilizationAggregatesArrayDeserializer(
  result: Array<ReservationUtilizationAggregates>,
): any[] {
  return result.map((item) => {
    return reservationUtilizationAggregatesDeserializer(item);
  });
}

/** The aggregate values of reservation utilization */
export interface ReservationUtilizationAggregates {
  /** The grain of the aggregate */
  readonly grain?: number;
  /** The grain unit of the aggregate */
  readonly grainUnit?: string;
  /** The aggregate value */
  readonly value?: number;
  /** The aggregate value unit */
  readonly valueUnit?: string;
}

export function reservationUtilizationAggregatesDeserializer(
  item: any,
): ReservationUtilizationAggregates {
  return {
    grain: item["grain"],
    grainUnit: item["grainUnit"],
    value: item["value"],
    valueUnit: item["valueUnit"],
  };
}

/** The request for reservation patch */
export interface Patch {
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** List of the subscriptions that the benefit will be applied. Do not specify if AppliedScopeType is Shared. This property will be deprecated and replaced by appliedScopeProperties instead for Single AppliedScopeType. */
  appliedScopes?: string[];
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. */
  instanceFlexibility?: InstanceFlexibility;
  /** Display name of the reservation */
  name?: string;
  /** Setting this to true will automatically purchase a new reservation on the expiration date time. */
  renew?: boolean;
  renewProperties?: PatchPropertiesRenewProperties;
  /** This is the date-time when the Azure hybrid benefit needs to be reviewed. */
  reviewDateTime?: Date;
}

export function patchSerializer(item: Patch): any {
  return {
    properties: areAllPropsUndefined(item, [
      "appliedScopeType",
      "appliedScopes",
      "appliedScopeProperties",
      "instanceFlexibility",
      "name",
      "renew",
      "renewProperties",
      "reviewDateTime",
    ])
      ? undefined
      : _patchPropertiesSerializer(item),
  };
}

/** Properties for reservation patch */
export interface PatchProperties {
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** List of the subscriptions that the benefit will be applied. Do not specify if AppliedScopeType is Shared. This property will be deprecated and replaced by appliedScopeProperties instead for Single AppliedScopeType. */
  appliedScopes?: string[];
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. */
  instanceFlexibility?: InstanceFlexibility;
  /** Display name of the reservation */
  name?: string;
  /** Setting this to true will automatically purchase a new reservation on the expiration date time. */
  renew?: boolean;
  renewProperties?: PatchPropertiesRenewProperties;
  /** This is the date-time when the Azure hybrid benefit needs to be reviewed. */
  reviewDateTime?: Date;
}

export function patchPropertiesSerializer(item: PatchProperties): any {
  return {
    appliedScopeType: item["appliedScopeType"],
    appliedScopes: !item["appliedScopes"]
      ? item["appliedScopes"]
      : item["appliedScopes"].map((p: any) => {
          return p;
        }),
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    instanceFlexibility: item["instanceFlexibility"],
    name: item["name"],
    renew: item["renew"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : patchPropertiesRenewPropertiesSerializer(item["renewProperties"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
  };
}

/** model interface PatchPropertiesRenewProperties */
export interface PatchPropertiesRenewProperties {
  /** The request for reservation purchase */
  purchaseProperties?: PurchaseRequest;
}

export function patchPropertiesRenewPropertiesSerializer(
  item: PatchPropertiesRenewProperties,
): any {
  return {
    purchaseProperties: !item["purchaseProperties"]
      ? item["purchaseProperties"]
      : purchaseRequestSerializer(item["purchaseProperties"]),
  };
}

/** List of `Reservation`s */
export interface _ReservationList {
  /** The ReservationResponse items on this page */
  value: ReservationResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _reservationListDeserializer(item: any): _ReservationList {
  return {
    value: reservationResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function reservationResponseArrayDeserializer(result: Array<ReservationResponse>): any[] {
  return result.map((item) => {
    return reservationResponseDeserializer(item);
  });
}

/** Available scope */
export interface AvailableScopeRequest {
  /** Available scope request properties */
  properties?: AvailableScopeRequestProperties;
}

export function availableScopeRequestSerializer(item: AvailableScopeRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : availableScopeRequestPropertiesSerializer(item["properties"]),
  };
}

/** Available scope request properties */
export interface AvailableScopeRequestProperties {
  scopes?: string[];
}

export function availableScopeRequestPropertiesSerializer(
  item: AvailableScopeRequestProperties,
): any {
  return {
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of available scope api containing scopes and their eligibilities. */
export interface AvailableScopeProperties {
  /** The scopes checked by the available scope api. */
  properties?: SubscriptionScopeProperties;
}

export function availableScopePropertiesDeserializer(item: any): AvailableScopeProperties {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionScopePropertiesDeserializer(item["properties"]),
  };
}

/** The scopes checked by the available scope api. */
export interface SubscriptionScopeProperties {
  scopes?: ScopeProperties[];
}

export function subscriptionScopePropertiesDeserializer(item: any): SubscriptionScopeProperties {
  return {
    scopes: !item["scopes"] ? item["scopes"] : scopePropertiesArrayDeserializer(item["scopes"]),
  };
}

export function scopePropertiesArrayDeserializer(result: Array<ScopeProperties>): any[] {
  return result.map((item) => {
    return scopePropertiesDeserializer(item);
  });
}

/** The scope and whether it is valid. */
export interface ScopeProperties {
  scope?: string;
  valid?: boolean;
}

export function scopePropertiesDeserializer(item: any): ScopeProperties {
  return {
    scope: item["scope"],
    valid: item["valid"],
  };
}

/** The request for reservation split */
export interface SplitRequest {
  /** List of the quantities in the new reservations to create. */
  quantities?: number[];
  /** Resource id of the reservation to be split. Format of the resource id should be /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  reservationId?: string;
}

export function splitRequestSerializer(item: SplitRequest): any {
  return {
    properties: areAllPropsUndefined(item, ["quantities", "reservationId"])
      ? undefined
      : _splitRequestPropertiesSerializer(item),
  };
}

/** Properties for reservation split */
export interface SplitProperties {
  /** List of the quantities in the new reservations to create. */
  quantities?: number[];
  /** Resource id of the reservation to be split. Format of the resource id should be /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  reservationId?: string;
}

export function splitPropertiesSerializer(item: SplitProperties): any {
  return {
    quantities: !item["quantities"]
      ? item["quantities"]
      : item["quantities"].map((p: any) => {
          return p;
        }),
    reservationId: item["reservationId"],
  };
}

/** The request for reservation merge */
export interface MergeRequest {
  /** Format of the resource id should be /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  sources?: string[];
}

export function mergeRequestSerializer(item: MergeRequest): any {
  return {
    properties: areAllPropsUndefined(item, ["sources"])
      ? undefined
      : _mergeRequestPropertiesSerializer(item),
  };
}

/** Properties for reservation merge */
export interface MergeProperties {
  /** Format of the resource id should be /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId} */
  sources?: string[];
}

export function mergePropertiesSerializer(item: MergeProperties): any {
  return {
    sources: !item["sources"]
      ? item["sources"]
      : item["sources"].map((p: any) => {
          return p;
        }),
  };
}

/** The list of reservations and summary of roll out count of reservations in each state. */
export interface _ReservationsListResult {
  /** The list of reservations. */
  readonly value?: ReservationResponse[];
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
  /** The roll out count summary of the reservations */
  summary?: ReservationSummary;
}

export function _reservationsListResultDeserializer(item: any): _ReservationsListResult {
  return {
    value: !item["value"] ? item["value"] : reservationResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    summary: !item["summary"] ? item["summary"] : reservationSummaryDeserializer(item["summary"]),
  };
}

/** The roll up count summary of reservations in each state */
export interface ReservationSummary {
  /** The number of reservation in Succeeded state */
  readonly succeededCount?: number;
  /** The number of reservation in Failed state */
  readonly failedCount?: number;
  /** The number of reservation in Expiring state */
  readonly expiringCount?: number;
  /** The number of reservation in Expired state */
  readonly expiredCount?: number;
  /** The number of reservation in Pending state */
  readonly pendingCount?: number;
  /** The number of reservation in Cancelled state */
  readonly cancelledCount?: number;
  /** The number of reservation in Processing state */
  readonly processingCount?: number;
  /** The number of reservation in Warning state */
  readonly warningCount?: number;
  /** The number of reservation in NoBenefit state */
  readonly noBenefitCount?: number;
}

export function reservationSummaryDeserializer(item: any): ReservationSummary {
  return {
    succeededCount: item["succeededCount"],
    failedCount: item["failedCount"],
    expiringCount: item["expiringCount"],
    expiredCount: item["expiredCount"],
    pendingCount: item["pendingCount"],
    cancelledCount: item["cancelledCount"],
    processingCount: item["processingCount"],
    warningCount: item["warningCount"],
    noBenefitCount: item["noBenefitCount"],
  };
}

/** Error response indicates that the service is not able to process the incoming request. The reason is provided in the error message. */
export interface ErrorResponse {
  /** The details of the error. */
  error?: ErrorDetails;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailsDeserializer(item["error"]),
  };
}

/** The details of the error. */
export interface ErrorDetails {
  /** Error code. */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
  /** The target of the particular error. */
  readonly target?: string;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** Details of a reservation order being returned. */
export interface ReservationOrderResponse extends ProxyResource {
  etag?: number;
  /** Friendly name for user to easily identified the reservation. */
  displayName?: string;
  /** This is the DateTime when the reservation was initially requested for purchase. */
  requestDateTime?: Date;
  /** This is the DateTime when the reservation was created. */
  createdDateTime?: Date;
  /** This is the date when the reservation will expire. */
  expiryDate?: Date;
  /** This is the date-time when the reservation will expire. */
  expiryDateTime?: Date;
  /** This is the DateTime when the reservation benefit started. */
  benefitStartTime?: Date;
  /** Total Quantity of the skus purchased in the reservation. */
  originalQuantity?: number;
  /** Represent the term of reservation. */
  term?: ReservationTerm;
  /** Current state of the reservation. */
  provisioningState?: ProvisioningState;
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** Information describing the type of billing plan for this reservation. */
  planInformation?: ReservationOrderBillingPlanInformation;
  reservations?: ReservationResponse[];
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
}

export function reservationOrderResponseDeserializer(item: any): ReservationOrderResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _reservationOrderResponsePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** Properties of a reservation order. */
export interface ReservationOrderProperties {
  /** Friendly name for user to easily identified the reservation. */
  displayName?: string;
  /** This is the DateTime when the reservation was initially requested for purchase. */
  requestDateTime?: Date;
  /** This is the DateTime when the reservation was created. */
  createdDateTime?: Date;
  /** This is the date when the reservation will expire. */
  expiryDate?: Date;
  /** This is the date-time when the reservation will expire. */
  expiryDateTime?: Date;
  /** This is the DateTime when the reservation benefit started. */
  benefitStartTime?: Date;
  /** Total Quantity of the skus purchased in the reservation. */
  originalQuantity?: number;
  /** Represent the term of reservation. */
  term?: ReservationTerm;
  /** Current state of the reservation. */
  provisioningState?: ProvisioningState;
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** Information describing the type of billing plan for this reservation. */
  planInformation?: ReservationOrderBillingPlanInformation;
  reservations?: ReservationResponse[];
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
}

export function reservationOrderPropertiesDeserializer(item: any): ReservationOrderProperties {
  return {
    displayName: item["displayName"],
    requestDateTime: !item["requestDateTime"]
      ? item["requestDateTime"]
      : new Date(item["requestDateTime"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    expiryDate: !item["expiryDate"] ? item["expiryDate"] : new Date(item["expiryDate"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    originalQuantity: item["originalQuantity"],
    term: item["term"],
    provisioningState: item["provisioningState"],
    billingPlan: item["billingPlan"],
    planInformation: !item["planInformation"]
      ? item["planInformation"]
      : reservationOrderBillingPlanInformationDeserializer(item["planInformation"]),
    reservations: !item["reservations"]
      ? item["reservations"]
      : reservationResponseArrayDeserializer(item["reservations"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
  };
}

/** Information describing the type of billing plan for this reservation. */
export interface ReservationOrderBillingPlanInformation {
  /** Amount of money to be paid for the Order. Tax is not included. */
  pricingCurrencyTotal?: Price;
  /** Date when the billing plan has started. */
  startDate?: Date;
  /** For recurring billing plans, indicates the date when next payment will be processed. Null when total is paid off. */
  nextPaymentDueDate?: Date;
  transactions?: PaymentDetail[];
}

export function reservationOrderBillingPlanInformationDeserializer(
  item: any,
): ReservationOrderBillingPlanInformation {
  return {
    pricingCurrencyTotal: !item["pricingCurrencyTotal"]
      ? item["pricingCurrencyTotal"]
      : priceDeserializer(item["pricingCurrencyTotal"]),
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    nextPaymentDueDate: !item["nextPaymentDueDate"]
      ? item["nextPaymentDueDate"]
      : new Date(item["nextPaymentDueDate"]),
    transactions: !item["transactions"]
      ? item["transactions"]
      : paymentDetailArrayDeserializer(item["transactions"]),
  };
}

export function paymentDetailArrayDeserializer(result: Array<PaymentDetail>): any[] {
  return result.map((item) => {
    return paymentDetailDeserializer(item);
  });
}

/** Information about payment related to a reservation order. */
export interface PaymentDetail {
  /** Date when the payment needs to be done. */
  dueDate?: Date;
  /** Date when the transaction is completed. Is null when it is scheduled. */
  paymentDate?: Date;
  /** Amount in pricing currency. Tax not included. */
  pricingCurrencyTotal?: Price;
  /** Amount charged in Billing currency. Tax not included. Is null for future payments */
  billingCurrencyTotal?: Price;
  /** Shows the Account that is charged for this payment. */
  billingAccount?: string;
  /** Describes whether the payment is completed, failed, cancelled or scheduled in the future. */
  status?: PaymentStatus;
  extendedStatusInfo?: ExtendedStatusInfo;
}

export function paymentDetailDeserializer(item: any): PaymentDetail {
  return {
    dueDate: !item["dueDate"] ? item["dueDate"] : new Date(item["dueDate"]),
    paymentDate: !item["paymentDate"] ? item["paymentDate"] : new Date(item["paymentDate"]),
    pricingCurrencyTotal: !item["pricingCurrencyTotal"]
      ? item["pricingCurrencyTotal"]
      : priceDeserializer(item["pricingCurrencyTotal"]),
    billingCurrencyTotal: !item["billingCurrencyTotal"]
      ? item["billingCurrencyTotal"]
      : priceDeserializer(item["billingCurrencyTotal"]),
    billingAccount: item["billingAccount"],
    status: item["status"],
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
  };
}

/** Describes whether the payment is completed, failed, cancelled or scheduled in the future. */
export enum KnownPaymentStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** Cancelled */
  Cancelled = "Cancelled",
}

/**
 * Describes whether the payment is completed, failed, cancelled or scheduled in the future. \
 * {@link KnownPaymentStatus} can be used interchangeably with PaymentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Scheduled**: Scheduled \
 * **Cancelled**: Cancelled
 */
export type PaymentStatus = string;

/** List of `ReservationOrder`s */
export interface _ReservationOrderList {
  /** The ReservationOrderResponse items on this page */
  value: ReservationOrderResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _reservationOrderListDeserializer(item: any): _ReservationOrderList {
  return {
    value: reservationOrderResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function reservationOrderResponseArrayDeserializer(
  result: Array<ReservationOrderResponse>,
): any[] {
  return result.map((item) => {
    return reservationOrderResponseDeserializer(item);
  });
}

/** Request body for change directory of a reservation. */
export interface ChangeDirectoryRequest {
  /** Tenant id GUID that reservation order is to be transferred to */
  destinationTenantId?: string;
}

export function changeDirectoryRequestSerializer(item: ChangeDirectoryRequest): any {
  return { destinationTenantId: item["destinationTenantId"] };
}

/** Change directory response */
export interface ChangeDirectoryResponse {
  /** Change directory result for reservation order or reservation */
  reservationOrder?: ChangeDirectoryResult;
  reservations?: ChangeDirectoryResult[];
}

export function changeDirectoryResponseDeserializer(item: any): ChangeDirectoryResponse {
  return {
    reservationOrder: !item["reservationOrder"]
      ? item["reservationOrder"]
      : changeDirectoryResultDeserializer(item["reservationOrder"]),
    reservations: !item["reservations"]
      ? item["reservations"]
      : changeDirectoryResultArrayDeserializer(item["reservations"]),
  };
}

/** Change directory result for reservation order or reservation */
export interface ChangeDirectoryResult {
  /** Identifier of the reservation order or reservation */
  id?: string;
  /** Name of the reservation order or reservation */
  name?: string;
  /** True if change directory operation succeeded on this reservation order or reservation */
  isSucceeded?: boolean;
  /** Error reason if operation failed. Null otherwise */
  error?: string;
}

export function changeDirectoryResultDeserializer(item: any): ChangeDirectoryResult {
  return {
    id: item["id"],
    name: item["name"],
    isSucceeded: item["isSucceeded"],
    error: item["error"],
  };
}

export function changeDirectoryResultArrayDeserializer(
  result: Array<ChangeDirectoryResult>,
): any[] {
  return result.map((item) => {
    return changeDirectoryResultDeserializer(item);
  });
}

/** The response of calculate price for reservation. */
export interface CalculatePriceResponse {
  /** Properties for calculate price response */
  properties?: CalculatePriceResponseProperties;
}

export function calculatePriceResponseDeserializer(item: any): CalculatePriceResponse {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : calculatePriceResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Properties for calculate price response */
export interface CalculatePriceResponseProperties {
  /** Currency and amount that customer will be charged in customer's local currency. Tax is not included. */
  billingCurrencyTotal?: CalculatePriceResponsePropertiesBillingCurrencyTotal;
  /** Net total amount in pricing currency. */
  netTotal?: number;
  /** Tax amount in pricing currency. */
  taxTotal?: number;
  /** Total amount in pricing currency. */
  grandTotal?: number;
  /** Whether or not tax is included in grand total */
  isTaxIncluded?: boolean;
  /** True if billing is managed by Microsoft Partner. Used only for CSP accounts. */
  isBillingPartnerManaged?: boolean;
  /** GUID that represents reservation order that can be placed after calculating price. */
  reservationOrderId?: string;
  /** Title of sku that is being purchased. */
  skuTitle?: string;
  /** Description of sku that is being purchased. */
  skuDescription?: string;
  /** Amount that Microsoft uses for record. Used during refund for calculating refund limit. Tax is not included. */
  pricingCurrencyTotal?: CalculatePriceResponsePropertiesPricingCurrencyTotal;
  paymentSchedule?: PaymentDetail[];
}

export function calculatePriceResponsePropertiesDeserializer(
  item: any,
): CalculatePriceResponseProperties {
  return {
    billingCurrencyTotal: !item["billingCurrencyTotal"]
      ? item["billingCurrencyTotal"]
      : calculatePriceResponsePropertiesBillingCurrencyTotalDeserializer(
          item["billingCurrencyTotal"],
        ),
    netTotal: item["netTotal"],
    taxTotal: item["taxTotal"],
    grandTotal: item["grandTotal"],
    isTaxIncluded: item["isTaxIncluded"],
    isBillingPartnerManaged: item["isBillingPartnerManaged"],
    reservationOrderId: item["reservationOrderId"],
    skuTitle: item["skuTitle"],
    skuDescription: item["skuDescription"],
    pricingCurrencyTotal: !item["pricingCurrencyTotal"]
      ? item["pricingCurrencyTotal"]
      : calculatePriceResponsePropertiesPricingCurrencyTotalDeserializer(
          item["pricingCurrencyTotal"],
        ),
    paymentSchedule: !item["paymentSchedule"]
      ? item["paymentSchedule"]
      : paymentDetailArrayDeserializer(item["paymentSchedule"]),
  };
}

/** Currency and amount that customer will be charged in customer's local currency. Tax is not included. */
export interface CalculatePriceResponsePropertiesBillingCurrencyTotal {
  /** The ISO 4217 3-letter currency code for the currency used by this purchase record. */
  currencyCode?: string;
  /** Amount in pricing currency. Tax is not included. */
  amount?: number;
}

export function calculatePriceResponsePropertiesBillingCurrencyTotalDeserializer(
  item: any,
): CalculatePriceResponsePropertiesBillingCurrencyTotal {
  return {
    currencyCode: item["currencyCode"],
    amount: item["amount"],
  };
}

/** Amount that Microsoft uses for record. Used during refund for calculating refund limit. Tax is not included. */
export interface CalculatePriceResponsePropertiesPricingCurrencyTotal {
  /** The ISO 4217 3-letter currency code for the currency used by this purchase record. */
  currencyCode?: string;
  amount?: number;
}

export function calculatePriceResponsePropertiesPricingCurrencyTotalDeserializer(
  item: any,
): CalculatePriceResponsePropertiesPricingCurrencyTotal {
  return {
    currencyCode: item["currencyCode"],
    amount: item["amount"],
  };
}

/** Request containing information needed for calculating refund. */
export interface CalculateRefundRequest {
  /** Fully qualified identifier of the reservation order being returned */
  id?: string;
  /** Properties needed for calculate refund including the scope and the reservation to be returned. */
  properties?: CalculateRefundRequestProperties;
}

export function calculateRefundRequestSerializer(item: CalculateRefundRequest): any {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : calculateRefundRequestPropertiesSerializer(item["properties"]),
  };
}

/** Properties needed for calculate refund including the scope and the reservation to be returned. */
export interface CalculateRefundRequestProperties {
  /** The scope of the refund, e.g. Reservation */
  scope?: string;
  /** Reservation to return */
  reservationToReturn?: ReservationToReturn;
}

export function calculateRefundRequestPropertiesSerializer(
  item: CalculateRefundRequestProperties,
): any {
  return {
    scope: item["scope"],
    reservationToReturn: !item["reservationToReturn"]
      ? item["reservationToReturn"]
      : reservationToReturnSerializer(item["reservationToReturn"]),
  };
}

/** Reservation to return */
export interface ReservationToReturn {
  /** Fully qualified identifier of the reservation being returned */
  reservationId?: string;
  /** Quantity to be returned. Must be greater than zero. */
  quantity?: number;
}

export function reservationToReturnSerializer(item: ReservationToReturn): any {
  return { reservationId: item["reservationId"], quantity: item["quantity"] };
}

/** The response of calculate refund containing refund information of reservation */
export interface CalculateRefundResponse {
  /** Fully qualified identifier of the reservation being returned */
  id?: string;
  /** The refund properties of reservation */
  properties?: RefundResponseProperties;
}

export function calculateRefundResponseDeserializer(item: any): CalculateRefundResponse {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : refundResponsePropertiesDeserializer(item["properties"]),
  };
}

/** The refund properties of reservation */
export interface RefundResponseProperties {
  /** Refund session identifier */
  sessionId?: string;
  /** Quantity to be returned */
  quantity?: number;
  /** Pricing information containing the amount and the currency code */
  billingRefundAmount?: Price;
  /** Pricing information containing the amount and the currency code */
  pricingRefundAmount?: Price;
  /** Refund policy result */
  policyResult?: RefundPolicyResult;
  /** billing information */
  billingInformation?: RefundBillingInformation;
}

export function refundResponsePropertiesDeserializer(item: any): RefundResponseProperties {
  return {
    sessionId: item["sessionId"],
    quantity: item["quantity"],
    billingRefundAmount: !item["billingRefundAmount"]
      ? item["billingRefundAmount"]
      : priceDeserializer(item["billingRefundAmount"]),
    pricingRefundAmount: !item["pricingRefundAmount"]
      ? item["pricingRefundAmount"]
      : priceDeserializer(item["pricingRefundAmount"]),
    policyResult: !item["policyResult"]
      ? item["policyResult"]
      : refundPolicyResultDeserializer(item["policyResult"]),
    billingInformation: !item["billingInformation"]
      ? item["billingInformation"]
      : refundBillingInformationDeserializer(item["billingInformation"]),
  };
}

/** Refund policy result */
export interface RefundPolicyResult {
  /** Refund policy result property */
  properties?: RefundPolicyResultProperty;
}

export function refundPolicyResultDeserializer(item: any): RefundPolicyResult {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : refundPolicyResultPropertyDeserializer(item["properties"]),
  };
}

/** Refund policy result property */
export interface RefundPolicyResultProperty {
  /** Pricing information containing the amount and the currency code */
  consumedRefundsTotal?: Price;
  /** Pricing information containing the amount and the currency code */
  maxRefundLimit?: Price;
  /** Refund Policy errors */
  policyErrors?: RefundPolicyError[];
}

export function refundPolicyResultPropertyDeserializer(item: any): RefundPolicyResultProperty {
  return {
    consumedRefundsTotal: !item["consumedRefundsTotal"]
      ? item["consumedRefundsTotal"]
      : priceDeserializer(item["consumedRefundsTotal"]),
    maxRefundLimit: !item["maxRefundLimit"]
      ? item["maxRefundLimit"]
      : priceDeserializer(item["maxRefundLimit"]),
    policyErrors: !item["policyErrors"]
      ? item["policyErrors"]
      : refundPolicyErrorArrayDeserializer(item["policyErrors"]),
  };
}

export function refundPolicyErrorArrayDeserializer(result: Array<RefundPolicyError>): any[] {
  return result.map((item) => {
    return refundPolicyErrorDeserializer(item);
  });
}

/** error details */
export interface RefundPolicyError {
  /** Error code describing the reason that service is not able to process the incoming request */
  code?: ErrorResponseCode;
  message?: string;
}

export function refundPolicyErrorDeserializer(item: any): RefundPolicyError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** billing information */
export interface RefundBillingInformation {
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** The number of completed transactions in this reservation's payment */
  completedTransactions?: number;
  /** The number of total transactions in this reservation's payment */
  totalTransactions?: number;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyTotalPaidAmount?: Price;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyProratedAmount?: Price;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyRemainingCommitmentAmount?: Price;
}

export function refundBillingInformationDeserializer(item: any): RefundBillingInformation {
  return {
    billingPlan: item["billingPlan"],
    completedTransactions: item["completedTransactions"],
    totalTransactions: item["totalTransactions"],
    billingCurrencyTotalPaidAmount: !item["billingCurrencyTotalPaidAmount"]
      ? item["billingCurrencyTotalPaidAmount"]
      : priceDeserializer(item["billingCurrencyTotalPaidAmount"]),
    billingCurrencyProratedAmount: !item["billingCurrencyProratedAmount"]
      ? item["billingCurrencyProratedAmount"]
      : priceDeserializer(item["billingCurrencyProratedAmount"]),
    billingCurrencyRemainingCommitmentAmount: !item["billingCurrencyRemainingCommitmentAmount"]
      ? item["billingCurrencyRemainingCommitmentAmount"]
      : priceDeserializer(item["billingCurrencyRemainingCommitmentAmount"]),
  };
}

/** Request containing information needed for returning reservation. */
export interface RefundRequest {
  /** Properties needed for refund request including the session id from calculate refund, the scope, the reservation to be returned and the return reason. */
  properties?: RefundRequestProperties;
}

export function refundRequestSerializer(item: RefundRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : refundRequestPropertiesSerializer(item["properties"]),
  };
}

/** Properties needed for refund request including the session id from calculate refund, the scope, the reservation to be returned and the return reason. */
export interface RefundRequestProperties {
  /** SessionId that was returned by CalculateRefund API. */
  sessionId?: string;
  /** The scope of the refund, e.g. Reservation */
  scope?: string;
  /** Reservation to return */
  reservationToReturn?: ReservationToReturn;
  /** The reason of returning the reservation */
  returnReason?: string;
}

export function refundRequestPropertiesSerializer(item: RefundRequestProperties): any {
  return {
    sessionId: item["sessionId"],
    scope: item["scope"],
    reservationToReturn: !item["reservationToReturn"]
      ? item["reservationToReturn"]
      : reservationToReturnSerializer(item["reservationToReturn"]),
    returnReason: item["returnReason"],
  };
}

/** Calculate exchange request */
export interface CalculateExchangeRequest {
  /** Calculate exchange request properties */
  properties?: CalculateExchangeRequestProperties;
}

export function calculateExchangeRequestSerializer(item: CalculateExchangeRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : calculateExchangeRequestPropertiesSerializer(item["properties"]),
  };
}

/** Calculate exchange request properties */
export interface CalculateExchangeRequestProperties {
  /** List of reservations that are being purchased in this exchange. */
  reservationsToPurchase?: PurchaseRequest[];
  /** List of savings plans that are being purchased in this exchange. */
  savingsPlansToPurchase?: SavingsPlanPurchaseRequest[];
  /** List of reservations that are being returned in this exchange. */
  reservationsToExchange?: ReservationToReturn[];
}

export function calculateExchangeRequestPropertiesSerializer(
  item: CalculateExchangeRequestProperties,
): any {
  return {
    reservationsToPurchase: !item["reservationsToPurchase"]
      ? item["reservationsToPurchase"]
      : purchaseRequestArraySerializer(item["reservationsToPurchase"]),
    savingsPlansToPurchase: !item["savingsPlansToPurchase"]
      ? item["savingsPlansToPurchase"]
      : savingsPlanPurchaseRequestArraySerializer(item["savingsPlansToPurchase"]),
    reservationsToExchange: !item["reservationsToExchange"]
      ? item["reservationsToExchange"]
      : reservationToReturnArraySerializer(item["reservationsToExchange"]),
  };
}

export function purchaseRequestArraySerializer(result: Array<PurchaseRequest>): any[] {
  return result.map((item) => {
    return purchaseRequestSerializer(item);
  });
}

export function purchaseRequestArrayDeserializer(result: Array<PurchaseRequest>): any[] {
  return result.map((item) => {
    return purchaseRequestDeserializer(item);
  });
}

export function savingsPlanPurchaseRequestArraySerializer(
  result: Array<SavingsPlanPurchaseRequest>,
): any[] {
  return result.map((item) => {
    return savingsPlanPurchaseRequestSerializer(item);
  });
}

export function savingsPlanPurchaseRequestArrayDeserializer(
  result: Array<SavingsPlanPurchaseRequest>,
): any[] {
  return result.map((item) => {
    return savingsPlanPurchaseRequestDeserializer(item);
  });
}

/** Request body for savings plan purchase */
export interface SavingsPlanPurchaseRequest {
  /** The name of sku */
  sku?: SkuName;
  /** Friendly name of the savings plan */
  displayName?: string;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  billingScopeId?: string;
  /** Represent savings plan term in ISO 8601 format. */
  term?: SavingsPlanTerm;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
}

export function savingsPlanPurchaseRequestSerializer(item: SavingsPlanPurchaseRequest): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuNameSerializer(item["sku"]),
    properties: areAllPropsUndefined(item, [
      "displayName",
      "billingScopeId",
      "term",
      "billingPlan",
      "appliedScopeType",
      "appliedScopeProperties",
      "commitment",
    ])
      ? undefined
      : _savingsPlanPurchaseRequestPropertiesSerializer(item),
  };
}

export function savingsPlanPurchaseRequestDeserializer(item: any): SavingsPlanPurchaseRequest {
  return {
    sku: !item["sku"] ? item["sku"] : skuNameDeserializer(item["sku"]),
    ...(!item["properties"]
      ? item["properties"]
      : _savingsPlanPurchaseRequestPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a savings plan purchase */
export interface SavingsPlanPurchaseRequestProperties {
  /** Friendly name of the savings plan */
  displayName?: string;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  billingScopeId?: string;
  /** Represent savings plan term in ISO 8601 format. */
  term?: SavingsPlanTerm;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
}

export function savingsPlanPurchaseRequestPropertiesSerializer(
  item: SavingsPlanPurchaseRequestProperties,
): any {
  return {
    displayName: item["displayName"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
  };
}

export function savingsPlanPurchaseRequestPropertiesDeserializer(
  item: any,
): SavingsPlanPurchaseRequestProperties {
  return {
    displayName: item["displayName"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
  };
}

/** Represent savings plan term in ISO 8601 format. */
export enum KnownSavingsPlanTerm {
  /** P1Y */
  P1Y = "P1Y",
  /** P3Y */
  P3Y = "P3Y",
}

/**
 * Represent savings plan term in ISO 8601 format. \
 * {@link KnownSavingsPlanTerm} can be used interchangeably with SavingsPlanTerm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1Y**: P1Y \
 * **P3Y**: P3Y
 */
export type SavingsPlanTerm = string;

/** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
export enum KnownBillingPlan {
  /** P1M */
  P1M = "P1M",
}

/**
 * Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. \
 * {@link KnownBillingPlan} can be used interchangeably with BillingPlan,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1M**: P1M
 */
export type BillingPlan = string;

/** Commitment towards the benefit. */
export interface Commitment extends Price {
  /** Commitment grain. */
  grain?: CommitmentGrain;
}

export function commitmentSerializer(item: Commitment): any {
  return { currencyCode: item["currencyCode"], amount: item["amount"], grain: item["grain"] };
}

export function commitmentDeserializer(item: any): Commitment {
  return {
    currencyCode: item["currencyCode"],
    amount: item["amount"],
    grain: item["grain"],
  };
}

/** Commitment grain. */
export enum KnownCommitmentGrain {
  /** Hourly */
  Hourly = "Hourly",
}

/**
 * Commitment grain. \
 * {@link KnownCommitmentGrain} can be used interchangeably with CommitmentGrain,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hourly**: Hourly
 */
export type CommitmentGrain = string;

export function reservationToReturnArraySerializer(result: Array<ReservationToReturn>): any[] {
  return result.map((item) => {
    return reservationToReturnSerializer(item);
  });
}

/** CalculateExchange operation result */
export interface CalculateExchangeOperationResultResponse {
  /** It should match what is used to GET the operation result. */
  id?: string;
  /** It must match the last segment of the id field, and will typically be a GUID / system generated value. */
  name?: string;
  /** Status of the operation. */
  status?: CalculateExchangeOperationResultStatus;
  /** CalculateExchange response properties */
  properties?: CalculateExchangeResponseProperties;
  /** Required if status == failed or status == canceled. */
  error?: OperationResultError;
}

export function calculateExchangeOperationResultResponseDeserializer(
  item: any,
): CalculateExchangeOperationResultResponse {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    properties: !item["properties"]
      ? item["properties"]
      : calculateExchangeResponsePropertiesDeserializer(item["properties"]),
    error: !item["error"] ? item["error"] : operationResultErrorDeserializer(item["error"]),
  };
}

/** Status of the operation. */
export enum KnownCalculateExchangeOperationResultStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Pending */
  Pending = "Pending",
}

/**
 * Status of the operation. \
 * {@link KnownCalculateExchangeOperationResultStatus} can be used interchangeably with CalculateExchangeOperationResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Cancelled**: Cancelled \
 * **Pending**: Pending
 */
export type CalculateExchangeOperationResultStatus = string;

/** CalculateExchange response properties */
export interface CalculateExchangeResponseProperties {
  /** Exchange session identifier */
  sessionId?: string;
  /** Pricing information containing the amount and the currency code */
  netPayable?: Price;
  /** Pricing information containing the amount and the currency code */
  refundsTotal?: Price;
  /** Pricing information containing the amount and the currency code */
  purchasesTotal?: Price;
  /** Details of the reservations being purchased */
  reservationsToPurchase?: ReservationToPurchaseCalculateExchange[];
  /** Details of the savings plans being purchased */
  savingsPlansToPurchase?: SavingsPlanToPurchaseCalculateExchange[];
  /** Details of the reservations being returned */
  reservationsToExchange?: ReservationToExchange[];
  /** Exchange policy errors */
  policyResult?: ExchangePolicyErrors;
}

export function calculateExchangeResponsePropertiesDeserializer(
  item: any,
): CalculateExchangeResponseProperties {
  return {
    sessionId: item["sessionId"],
    netPayable: !item["netPayable"] ? item["netPayable"] : priceDeserializer(item["netPayable"]),
    refundsTotal: !item["refundsTotal"]
      ? item["refundsTotal"]
      : priceDeserializer(item["refundsTotal"]),
    purchasesTotal: !item["purchasesTotal"]
      ? item["purchasesTotal"]
      : priceDeserializer(item["purchasesTotal"]),
    reservationsToPurchase: !item["reservationsToPurchase"]
      ? item["reservationsToPurchase"]
      : reservationToPurchaseCalculateExchangeArrayDeserializer(item["reservationsToPurchase"]),
    savingsPlansToPurchase: !item["savingsPlansToPurchase"]
      ? item["savingsPlansToPurchase"]
      : savingsPlanToPurchaseCalculateExchangeArrayDeserializer(item["savingsPlansToPurchase"]),
    reservationsToExchange: !item["reservationsToExchange"]
      ? item["reservationsToExchange"]
      : reservationToExchangeArrayDeserializer(item["reservationsToExchange"]),
    policyResult: !item["policyResult"]
      ? item["policyResult"]
      : exchangePolicyErrorsDeserializer(item["policyResult"]),
  };
}

export function reservationToPurchaseCalculateExchangeArrayDeserializer(
  result: Array<ReservationToPurchaseCalculateExchange>,
): any[] {
  return result.map((item) => {
    return reservationToPurchaseCalculateExchangeDeserializer(item);
  });
}

/** Reservation purchase details */
export interface ReservationToPurchaseCalculateExchange {
  /** The request for reservation purchase */
  properties?: PurchaseRequest;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyTotal?: Price;
}

export function reservationToPurchaseCalculateExchangeDeserializer(
  item: any,
): ReservationToPurchaseCalculateExchange {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : purchaseRequestDeserializer(item["properties"]),
    billingCurrencyTotal: !item["billingCurrencyTotal"]
      ? item["billingCurrencyTotal"]
      : priceDeserializer(item["billingCurrencyTotal"]),
  };
}

export function savingsPlanToPurchaseCalculateExchangeArrayDeserializer(
  result: Array<SavingsPlanToPurchaseCalculateExchange>,
): any[] {
  return result.map((item) => {
    return savingsPlanToPurchaseCalculateExchangeDeserializer(item);
  });
}

/** Savings plan purchase details */
export interface SavingsPlanToPurchaseCalculateExchange {
  /** Request body for savings plan purchase */
  properties?: SavingsPlanPurchaseRequest;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyTotal?: Price;
}

export function savingsPlanToPurchaseCalculateExchangeDeserializer(
  item: any,
): SavingsPlanToPurchaseCalculateExchange {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : savingsPlanPurchaseRequestDeserializer(item["properties"]),
    billingCurrencyTotal: !item["billingCurrencyTotal"]
      ? item["billingCurrencyTotal"]
      : priceDeserializer(item["billingCurrencyTotal"]),
  };
}

export function reservationToExchangeArrayDeserializer(
  result: Array<ReservationToExchange>,
): any[] {
  return result.map((item) => {
    return reservationToExchangeDeserializer(item);
  });
}

/** Reservation refund details */
export interface ReservationToExchange {
  /** Fully qualified id of the reservation being returned. */
  reservationId?: string;
  /** Quantity to be returned */
  quantity?: number;
  /** Pricing information containing the amount and the currency code */
  billingRefundAmount?: Price;
  /** billing information */
  billingInformation?: BillingInformation;
}

export function reservationToExchangeDeserializer(item: any): ReservationToExchange {
  return {
    reservationId: item["reservationId"],
    quantity: item["quantity"],
    billingRefundAmount: !item["billingRefundAmount"]
      ? item["billingRefundAmount"]
      : priceDeserializer(item["billingRefundAmount"]),
    billingInformation: !item["billingInformation"]
      ? item["billingInformation"]
      : billingInformationDeserializer(item["billingInformation"]),
  };
}

/** billing information */
export interface BillingInformation {
  /** Pricing information containing the amount and the currency code */
  billingCurrencyTotalPaidAmount?: Price;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyProratedAmount?: Price;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyRemainingCommitmentAmount?: Price;
}

export function billingInformationDeserializer(item: any): BillingInformation {
  return {
    billingCurrencyTotalPaidAmount: !item["billingCurrencyTotalPaidAmount"]
      ? item["billingCurrencyTotalPaidAmount"]
      : priceDeserializer(item["billingCurrencyTotalPaidAmount"]),
    billingCurrencyProratedAmount: !item["billingCurrencyProratedAmount"]
      ? item["billingCurrencyProratedAmount"]
      : priceDeserializer(item["billingCurrencyProratedAmount"]),
    billingCurrencyRemainingCommitmentAmount: !item["billingCurrencyRemainingCommitmentAmount"]
      ? item["billingCurrencyRemainingCommitmentAmount"]
      : priceDeserializer(item["billingCurrencyRemainingCommitmentAmount"]),
  };
}

/** Exchange policy errors */
export interface ExchangePolicyErrors {
  /** Exchange Policy errors */
  policyErrors?: ExchangePolicyError[];
}

export function exchangePolicyErrorsDeserializer(item: any): ExchangePolicyErrors {
  return {
    policyErrors: !item["policyErrors"]
      ? item["policyErrors"]
      : exchangePolicyErrorArrayDeserializer(item["policyErrors"]),
  };
}

export function exchangePolicyErrorArrayDeserializer(result: Array<ExchangePolicyError>): any[] {
  return result.map((item) => {
    return exchangePolicyErrorDeserializer(item);
  });
}

/** error details */
export interface ExchangePolicyError {
  code?: string;
  message?: string;
}

export function exchangePolicyErrorDeserializer(item: any): ExchangePolicyError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Required if status == failed or status == canceled. */
export interface OperationResultError {
  /** Required if status == failed or status == cancelled. If status == failed, provide an invariant error code used for error troubleshooting, aggregation, and analysis. */
  code?: string;
  /** Required if status == failed. Localized. If status == failed, provide an actionable error message indicating what error occurred, and what the user can do to address the issue. */
  message?: string;
}

export function operationResultErrorDeserializer(item: any): OperationResultError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Exchange request */
export interface ExchangeRequest {
  /** Exchange request properties */
  properties?: ExchangeRequestProperties;
}

export function exchangeRequestSerializer(item: ExchangeRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : exchangeRequestPropertiesSerializer(item["properties"]),
  };
}

/** Exchange request properties */
export interface ExchangeRequestProperties {
  /** SessionId that was returned by CalculateExchange API. */
  sessionId?: string;
}

export function exchangeRequestPropertiesSerializer(item: ExchangeRequestProperties): any {
  return { sessionId: item["sessionId"] };
}

/** Exchange operation result */
export interface ExchangeOperationResultResponse {
  /** It should match what is used to GET the operation result. */
  id?: string;
  /** It must match the last segment of the id field, and will typically be a GUID / system generated value. */
  name?: string;
  /** Status of the operation. */
  status?: ExchangeOperationResultStatus;
  /** Exchange response properties */
  properties?: ExchangeResponseProperties;
  /** Required if status == failed or status == canceled. */
  error?: OperationResultError;
}

export function exchangeOperationResultResponseDeserializer(
  item: any,
): ExchangeOperationResultResponse {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    properties: !item["properties"]
      ? item["properties"]
      : exchangeResponsePropertiesDeserializer(item["properties"]),
    error: !item["error"] ? item["error"] : operationResultErrorDeserializer(item["error"]),
  };
}

/** Status of the operation. */
export enum KnownExchangeOperationResultStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** PendingRefunds */
  PendingRefunds = "PendingRefunds",
  /** PendingPurchases */
  PendingPurchases = "PendingPurchases",
}

/**
 * Status of the operation. \
 * {@link KnownExchangeOperationResultStatus} can be used interchangeably with ExchangeOperationResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Cancelled**: Cancelled \
 * **PendingRefunds**: PendingRefunds \
 * **PendingPurchases**: PendingPurchases
 */
export type ExchangeOperationResultStatus = string;

/** Exchange response properties */
export interface ExchangeResponseProperties {
  /** Exchange session identifier */
  sessionId?: string;
  /** Pricing information containing the amount and the currency code */
  netPayable?: Price;
  /** Pricing information containing the amount and the currency code */
  refundsTotal?: Price;
  /** Pricing information containing the amount and the currency code */
  purchasesTotal?: Price;
  /** Details of the reservations being purchased */
  reservationsToPurchase?: ReservationToPurchaseExchange[];
  /** Details of the savings plans being purchased */
  savingsPlansToPurchase?: SavingsPlanToPurchaseExchange[];
  /** Details of the reservations being returned */
  reservationsToExchange?: ReservationToReturnForExchange[];
  /** Exchange policy errors */
  policyResult?: ExchangePolicyErrors;
}

export function exchangeResponsePropertiesDeserializer(item: any): ExchangeResponseProperties {
  return {
    sessionId: item["sessionId"],
    netPayable: !item["netPayable"] ? item["netPayable"] : priceDeserializer(item["netPayable"]),
    refundsTotal: !item["refundsTotal"]
      ? item["refundsTotal"]
      : priceDeserializer(item["refundsTotal"]),
    purchasesTotal: !item["purchasesTotal"]
      ? item["purchasesTotal"]
      : priceDeserializer(item["purchasesTotal"]),
    reservationsToPurchase: !item["reservationsToPurchase"]
      ? item["reservationsToPurchase"]
      : reservationToPurchaseExchangeArrayDeserializer(item["reservationsToPurchase"]),
    savingsPlansToPurchase: !item["savingsPlansToPurchase"]
      ? item["savingsPlansToPurchase"]
      : savingsPlanToPurchaseExchangeArrayDeserializer(item["savingsPlansToPurchase"]),
    reservationsToExchange: !item["reservationsToExchange"]
      ? item["reservationsToExchange"]
      : reservationToReturnForExchangeArrayDeserializer(item["reservationsToExchange"]),
    policyResult: !item["policyResult"]
      ? item["policyResult"]
      : exchangePolicyErrorsDeserializer(item["policyResult"]),
  };
}

export function reservationToPurchaseExchangeArrayDeserializer(
  result: Array<ReservationToPurchaseExchange>,
): any[] {
  return result.map((item) => {
    return reservationToPurchaseExchangeDeserializer(item);
  });
}

/** Reservation purchase details */
export interface ReservationToPurchaseExchange {
  /** Fully qualified id of the reservationOrder being purchased */
  reservationOrderId?: string;
  /** Fully qualified id of the reservation being purchased. This value is only guaranteed to be non-null if the purchase is successful. */
  reservationId?: string;
  /** The request for reservation purchase */
  properties?: PurchaseRequest;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyTotal?: Price;
  /** Status of the individual operation. */
  status?: OperationStatus;
}

export function reservationToPurchaseExchangeDeserializer(
  item: any,
): ReservationToPurchaseExchange {
  return {
    reservationOrderId: item["reservationOrderId"],
    reservationId: item["reservationId"],
    properties: !item["properties"]
      ? item["properties"]
      : purchaseRequestDeserializer(item["properties"]),
    billingCurrencyTotal: !item["billingCurrencyTotal"]
      ? item["billingCurrencyTotal"]
      : priceDeserializer(item["billingCurrencyTotal"]),
    status: item["status"],
  };
}

/** Status of the individual operation. */
export enum KnownOperationStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Pending */
  Pending = "Pending",
}

/**
 * Status of the individual operation. \
 * {@link KnownOperationStatus} can be used interchangeably with OperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Cancelled**: Cancelled \
 * **Pending**: Pending
 */
export type OperationStatus = string;

export function savingsPlanToPurchaseExchangeArrayDeserializer(
  result: Array<SavingsPlanToPurchaseExchange>,
): any[] {
  return result.map((item) => {
    return savingsPlanToPurchaseExchangeDeserializer(item);
  });
}

/** Savings plan purchase details */
export interface SavingsPlanToPurchaseExchange {
  /** Fully qualified id of the savings plan order being purchased */
  savingsPlanOrderId?: string;
  /** Fully qualified id of the savings plan being purchased. This value is only guaranteed to be non-null if the purchase is successful. */
  savingsPlanId?: string;
  /** Request body for savings plan purchase */
  properties?: SavingsPlanPurchaseRequest;
  /** Pricing information containing the amount and the currency code */
  billingCurrencyTotal?: Price;
  /** Status of the individual operation. */
  status?: OperationStatus;
}

export function savingsPlanToPurchaseExchangeDeserializer(
  item: any,
): SavingsPlanToPurchaseExchange {
  return {
    savingsPlanOrderId: item["savingsPlanOrderId"],
    savingsPlanId: item["savingsPlanId"],
    properties: !item["properties"]
      ? item["properties"]
      : savingsPlanPurchaseRequestDeserializer(item["properties"]),
    billingCurrencyTotal: !item["billingCurrencyTotal"]
      ? item["billingCurrencyTotal"]
      : priceDeserializer(item["billingCurrencyTotal"]),
    status: item["status"],
  };
}

export function reservationToReturnForExchangeArrayDeserializer(
  result: Array<ReservationToReturnForExchange>,
): any[] {
  return result.map((item) => {
    return reservationToReturnForExchangeDeserializer(item);
  });
}

/** Reservation refund details */
export interface ReservationToReturnForExchange {
  /** Fully qualified id of the reservation being returned. */
  reservationId?: string;
  /** Quantity to be returned */
  quantity?: number;
  /** Pricing information containing the amount and the currency code */
  billingRefundAmount?: Price;
  /** billing information */
  billingInformation?: BillingInformation;
  /** Status of the individual operation. */
  status?: OperationStatus;
}

export function reservationToReturnForExchangeDeserializer(
  item: any,
): ReservationToReturnForExchange {
  return {
    reservationId: item["reservationId"],
    quantity: item["quantity"],
    billingRefundAmount: !item["billingRefundAmount"]
      ? item["billingRefundAmount"]
      : priceDeserializer(item["billingRefundAmount"]),
    billingInformation: !item["billingInformation"]
      ? item["billingInformation"]
      : billingInformationDeserializer(item["billingInformation"]),
    status: item["status"],
  };
}

export function _appliedReservationsPropertiesDeserializer(item: any) {
  return {
    reservationOrderIds: !item["reservationOrderIds"]
      ? item["reservationOrderIds"]
      : appliedReservationListDeserializer(item["reservationOrderIds"]),
  };
}

export function _purchaseRequestPropertiesSerializer(item: PurchaseRequest): any {
  return {
    reservedResourceType: item["reservedResourceType"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    quantity: item["quantity"],
    displayName: item["displayName"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopes: !item["appliedScopes"]
      ? item["appliedScopes"]
      : item["appliedScopes"].map((p: any) => {
          return p;
        }),
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : purchaseRequestPropertiesReservedResourcePropertiesSerializer(
          item["reservedResourceProperties"],
        ),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
  };
}

export function _purchaseRequestPropertiesDeserializer(item: any) {
  return {
    reservedResourceType: item["reservedResourceType"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    quantity: item["quantity"],
    displayName: item["displayName"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopes: !item["appliedScopes"]
      ? item["appliedScopes"]
      : item["appliedScopes"].map((p: any) => {
          return p;
        }),
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : purchaseRequestPropertiesReservedResourcePropertiesDeserializer(
          item["reservedResourceProperties"],
        ),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
  };
}

export function _patchPropertiesSerializer(item: Patch): any {
  return {
    appliedScopeType: item["appliedScopeType"],
    appliedScopes: !item["appliedScopes"]
      ? item["appliedScopes"]
      : item["appliedScopes"].map((p: any) => {
          return p;
        }),
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    instanceFlexibility: item["instanceFlexibility"],
    name: item["name"],
    renew: item["renew"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : patchPropertiesRenewPropertiesSerializer(item["renewProperties"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
  };
}

export function _splitRequestPropertiesSerializer(item: SplitRequest): any {
  return {
    quantities: !item["quantities"]
      ? item["quantities"]
      : item["quantities"].map((p: any) => {
          return p;
        }),
    reservationId: item["reservationId"],
  };
}

export function _mergeRequestPropertiesSerializer(item: MergeRequest): any {
  return {
    sources: !item["sources"]
      ? item["sources"]
      : item["sources"].map((p: any) => {
          return p;
        }),
  };
}

export function _reservationOrderResponsePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    requestDateTime: !item["requestDateTime"]
      ? item["requestDateTime"]
      : new Date(item["requestDateTime"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    expiryDate: !item["expiryDate"] ? item["expiryDate"] : new Date(item["expiryDate"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    originalQuantity: item["originalQuantity"],
    term: item["term"],
    provisioningState: item["provisioningState"],
    billingPlan: item["billingPlan"],
    planInformation: !item["planInformation"]
      ? item["planInformation"]
      : reservationOrderBillingPlanInformationDeserializer(item["planInformation"]),
    reservations: !item["reservations"]
      ? item["reservations"]
      : reservationResponseArrayDeserializer(item["reservations"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
  };
}

export function _savingsPlanPurchaseRequestPropertiesSerializer(
  item: SavingsPlanPurchaseRequest,
): any {
  return {
    displayName: item["displayName"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
  };
}

export function _savingsPlanPurchaseRequestPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
  };
}
