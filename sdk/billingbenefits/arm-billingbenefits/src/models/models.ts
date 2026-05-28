// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for an operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Resource definition for Discounts. */
export interface Discount extends TrackedResource {
  /** Discount properties */
  properties?: DiscountPropertiesUnion;
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: string;
  /** The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly etag?: string;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ServiceManagedIdentity;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Plan for the resource. */
  plan?: Plan;
}

export function discountSerializer(item: Discount): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : discountPropertiesUnionSerializer(item["properties"]),
    managedBy: item["managedBy"],
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function discountDeserializer(item: any): Discount {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : discountPropertiesUnionDeserializer(item["properties"]),
    managedBy: item["managedBy"],
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Properties belonging to discounts. */
export interface DiscountProperties {
  /** This defines whether the entity being created is primary or affiliate. Supported values: primary, affiliate. Validation: Required, must match one of the 2 values. */
  /** The discriminator possible values: Affiliate, Primary */
  entityType: DiscountEntityType;
  /** This is the catalog UPN for the product. */
  productCode: string;
  /** Start date of the discount. Value is the date the discount started or will start in the future. */
  startAt: Date;
  /** This is the globally unique identifier of the Discount which will not change for the lifetime of the Discount. */
  systemId?: string;
  /** The state of the resource. Supported values are Pending, Failed, Succeeded, Canceled. */
  readonly provisioningState?: DiscountProvisioningState;
  /** Billing account resource id where the discount metadata is present. */
  readonly billingAccountResourceId?: string;
  /** Billing profile resource id where the discount is scoped to. */
  readonly billingProfileResourceId?: string;
  /** Customer resource id where the discount is scoped to. */
  readonly customerResourceId?: string;
  /** This defines a user friendly display name for the discount. */
  displayName?: string;
  /** Represents the current status of the discount. */
  readonly status?: DiscountStatus;
  /** Fully-qualified identifier of the benefit under applicable benefit list. */
  readonly benefitResourceId?: string;
  /** List of applied scopes supported for discounts. */
  appliedScopeType?: DiscountAppliedScopeType;
}

export function discountPropertiesSerializer(item: DiscountProperties): any {
  return {
    entityType: item["entityType"],
    productCode: item["productCode"],
    startAt: item["startAt"].toISOString(),
    systemId: item["systemId"],
    displayName: item["displayName"],
    appliedScopeType: item["appliedScopeType"],
  };
}

export function discountPropertiesDeserializer(item: any): DiscountProperties {
  return {
    entityType: item["entityType"],
    productCode: item["productCode"],
    startAt: new Date(item["startAt"]),
    systemId: item["systemId"],
    provisioningState: item["provisioningState"],
    billingAccountResourceId: item["billingAccountResourceId"],
    billingProfileResourceId: item["billingProfileResourceId"],
    customerResourceId: item["customerResourceId"],
    displayName: item["displayName"],
    status: item["status"],
    benefitResourceId: item["benefitResourceId"],
    appliedScopeType: item["appliedScopeType"],
  };
}

/** Alias for DiscountPropertiesUnion */
export type DiscountPropertiesUnion =
  | EntityTypeAffiliateDiscount
  | EntityTypePrimaryDiscount
  | DiscountProperties;

export function discountPropertiesUnionSerializer(item: DiscountPropertiesUnion): any {
  switch (item.entityType) {
    case "Affiliate":
      return entityTypeAffiliateDiscountSerializer(item as EntityTypeAffiliateDiscount);

    case "Primary":
      return entityTypePrimaryDiscountSerializer(item as EntityTypePrimaryDiscount);

    default:
      return discountPropertiesSerializer(item);
  }
}

export function discountPropertiesUnionDeserializer(item: any): DiscountPropertiesUnion {
  switch (item["entityType"]) {
    case "Affiliate":
      return entityTypeAffiliateDiscountDeserializer(item as EntityTypeAffiliateDiscount);

    case "Primary":
      return entityTypePrimaryDiscountDeserializer(item as EntityTypePrimaryDiscount);

    default:
      return discountPropertiesDeserializer(item);
  }
}

/** This defines whether the entity being created is primary or affiliate. Supported values: primary, affiliate. Validation: Required, must match one of the 2 values. */
export enum KnownDiscountEntityType {
  /** Primary */
  Primary = "Primary",
  /** Affiliate */
  Affiliate = "Affiliate",
}

/**
 * This defines whether the entity being created is primary or affiliate. Supported values: primary, affiliate. Validation: Required, must match one of the 2 values. \
 * {@link KnownDiscountEntityType} can be used interchangeably with DiscountEntityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Affiliate**
 */
export type DiscountEntityType = string;

/** Provisioning states of Discount. */
export enum KnownDiscountProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Pending */
  Pending = "Pending",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning states of Discount. \
 * {@link KnownDiscountProvisioningState} can be used interchangeably with DiscountProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Pending** \
 * **Succeeded** \
 * **Canceled** \
 * **Failed**
 */
export type DiscountProvisioningState = string;

/** Represents the current status of the discount. */
export enum KnownDiscountStatus {
  /** Active */
  Active = "Active",
  /** Pending */
  Pending = "Pending",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Expired */
  Expired = "Expired",
}

/**
 * Represents the current status of the discount. \
 * {@link KnownDiscountStatus} can be used interchangeably with DiscountStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Pending** \
 * **Failed** \
 * **Canceled** \
 * **Expired**
 */
export type DiscountStatus = string;

/** List of applied scopes supported for discounts. */
export enum KnownDiscountAppliedScopeType {
  /** BillingAccount */
  BillingAccount = "BillingAccount",
  /** BillingProfile */
  BillingProfile = "BillingProfile",
  /** Customer */
  Customer = "Customer",
}

/**
 * List of applied scopes supported for discounts. \
 * {@link KnownDiscountAppliedScopeType} can be used interchangeably with DiscountAppliedScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BillingAccount** \
 * **BillingProfile** \
 * **Customer**
 */
export type DiscountAppliedScopeType = string;

/** Entity type for affiliate discounts */
export interface EntityTypeAffiliateDiscount extends DiscountProperties {
  /** This will be present in the response if the primary has a resource ID */
  readonly primaryResourceId?: string;
  /** End date of the discount. No duration will be supported. Allowed value is any date greater than or equal to startDate. */
  readonly endAt?: Date;
  /** This defines whether the entity being created is primary or affiliate. Supported values: primary, affiliate. Validation: Required, must match one of the 2 values. */
  entityType: "Affiliate";
}

export function entityTypeAffiliateDiscountSerializer(item: EntityTypeAffiliateDiscount): any {
  return {
    entityType: item["entityType"],
    productCode: item["productCode"],
    startAt: item["startAt"].toISOString(),
    systemId: item["systemId"],
    displayName: item["displayName"],
    appliedScopeType: item["appliedScopeType"],
  };
}

export function entityTypeAffiliateDiscountDeserializer(item: any): EntityTypeAffiliateDiscount {
  return {
    entityType: item["entityType"],
    productCode: item["productCode"],
    startAt: new Date(item["startAt"]),
    systemId: item["systemId"],
    provisioningState: item["provisioningState"],
    billingAccountResourceId: item["billingAccountResourceId"],
    billingProfileResourceId: item["billingProfileResourceId"],
    customerResourceId: item["customerResourceId"],
    displayName: item["displayName"],
    status: item["status"],
    benefitResourceId: item["benefitResourceId"],
    appliedScopeType: item["appliedScopeType"],
    primaryResourceId: item["primaryResourceId"],
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
  };
}

/** Entity type for primary discounts */
export interface EntityTypePrimaryDiscount extends DiscountProperties {
  /** This defines the conditions for a given discount type. */
  discountTypeProperties?: DiscountTypePropertiesUnion;
  /** End date of the discount. No duration will be supported. Allowed value is any date greater than or equal to startDate. */
  endAt: Date;
  /** This defines whether the entity being created is primary or affiliate. Supported values: primary, affiliate. Validation: Required, must match one of the 2 values. */
  entityType: "Primary";
}

export function entityTypePrimaryDiscountSerializer(item: EntityTypePrimaryDiscount): any {
  return {
    entityType: item["entityType"],
    productCode: item["productCode"],
    startAt: item["startAt"].toISOString(),
    systemId: item["systemId"],
    displayName: item["displayName"],
    appliedScopeType: item["appliedScopeType"],
    discountTypeProperties: !item["discountTypeProperties"]
      ? item["discountTypeProperties"]
      : discountTypePropertiesUnionSerializer(item["discountTypeProperties"]),
    endAt: item["endAt"].toISOString(),
  };
}

export function entityTypePrimaryDiscountDeserializer(item: any): EntityTypePrimaryDiscount {
  return {
    entityType: item["entityType"],
    productCode: item["productCode"],
    startAt: new Date(item["startAt"]),
    systemId: item["systemId"],
    provisioningState: item["provisioningState"],
    billingAccountResourceId: item["billingAccountResourceId"],
    billingProfileResourceId: item["billingProfileResourceId"],
    customerResourceId: item["customerResourceId"],
    displayName: item["displayName"],
    status: item["status"],
    benefitResourceId: item["benefitResourceId"],
    appliedScopeType: item["appliedScopeType"],
    discountTypeProperties: !item["discountTypeProperties"]
      ? item["discountTypeProperties"]
      : discountTypePropertiesUnionDeserializer(item["discountTypeProperties"]),
    endAt: new Date(item["endAt"]),
  };
}

/** This defines the conditions for a given discount type. */
export interface DiscountTypeProperties {
  /** Defines the type of discount. Supported values are ProductFamily, Product, Sku, CustomPrice, and CustomPriceMultiCurrency. */
  /** The discriminator possible values: ProductFamily, Product, Sku, CustomPrice, CustomPriceMultiCurrency */
  discountType: DiscountType;
  /** The customer action on which the discount is applied. Supported values are Purchase, Consume, and Renew. Validation: Required, one of supported values. */
  applyDiscountOn: ApplyDiscountOn;
  /** Discount percentage provided for the customer. Validation: Required unless this is a price rule. */
  discountPercentage?: number;
  /** The discount combination rule when there are multiple applicable custom prices. Validation: Required. Supported values are Stackable and BestOf. */
  discountCombinationRule?: DiscountCombinationRule;
  /** Set only in price guarantee scenario. */
  priceGuaranteeProperties?: PriceGuaranteeProperties;
  /** Array of conditions for the discount. Validation: Optional. Maximum length is 1000. */
  conditions?: ConditionsItem[];
}

export function discountTypePropertiesSerializer(item: DiscountTypeProperties): any {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesSerializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArraySerializer(item["conditions"]),
  };
}

export function discountTypePropertiesDeserializer(item: any): DiscountTypeProperties {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesDeserializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArrayDeserializer(item["conditions"]),
  };
}

/** Alias for DiscountTypePropertiesUnion */
export type DiscountTypePropertiesUnion =
  | DiscountTypeProductFamily
  | DiscountTypeProduct
  | DiscountTypeProductSku
  | DiscountTypeCustomPriceUnion
  | DiscountTypeProperties;

export function discountTypePropertiesUnionSerializer(item: DiscountTypePropertiesUnion): any {
  switch (item.discountType) {
    case "ProductFamily":
      return discountTypeProductFamilySerializer(item as DiscountTypeProductFamily);

    case "Product":
      return discountTypeProductSerializer(item as DiscountTypeProduct);

    case "Sku":
      return discountTypeProductSkuSerializer(item as DiscountTypeProductSku);

    case "CustomPrice":
    case "CustomPriceMultiCurrency":
      return discountTypeCustomPriceUnionSerializer(item as DiscountTypeCustomPriceUnion);

    default:
      return discountTypePropertiesSerializer(item);
  }
}

export function discountTypePropertiesUnionDeserializer(item: any): DiscountTypePropertiesUnion {
  switch (item["discountType"]) {
    case "ProductFamily":
      return discountTypeProductFamilyDeserializer(item as DiscountTypeProductFamily);

    case "Product":
      return discountTypeProductDeserializer(item as DiscountTypeProduct);

    case "Sku":
      return discountTypeProductSkuDeserializer(item as DiscountTypeProductSku);

    case "CustomPrice":
    case "CustomPriceMultiCurrency":
      return discountTypeCustomPriceUnionDeserializer(item as DiscountTypeCustomPriceUnion);

    default:
      return discountTypePropertiesDeserializer(item);
  }
}

/** Defines the type of discount. Supported values are ProductFamily, Product, Sku, CustomPrice, and CustomPriceMultiCurrency. */
export enum KnownDiscountType {
  /** ProductFamily */
  ProductFamily = "ProductFamily",
  /** Product */
  Product = "Product",
  /** Sku */
  Sku = "Sku",
  /** CustomPrice */
  CustomPrice = "CustomPrice",
  /** CustomPriceMultiCurrency */
  CustomPriceMultiCurrency = "CustomPriceMultiCurrency",
}

/**
 * Defines the type of discount. Supported values are ProductFamily, Product, Sku, CustomPrice, and CustomPriceMultiCurrency. \
 * {@link KnownDiscountType} can be used interchangeably with DiscountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ProductFamily** \
 * **Product** \
 * **Sku** \
 * **CustomPrice** \
 * **CustomPriceMultiCurrency**
 */
export type DiscountType = string;

/** The customer action on which the discount is applied. Supported values are Purchase, Consume, and Renew. Validation: Required, one of supported values. */
export enum KnownApplyDiscountOn {
  /** Purchase */
  Purchase = "Purchase",
  /** Consume */
  Consume = "Consume",
  /** Renew */
  Renew = "Renew",
}

/**
 * The customer action on which the discount is applied. Supported values are Purchase, Consume, and Renew. Validation: Required, one of supported values. \
 * {@link KnownApplyDiscountOn} can be used interchangeably with ApplyDiscountOn,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Purchase** \
 * **Consume** \
 * **Renew**
 */
export type ApplyDiscountOn = string;

/** The discount combination rule when there are multiple applicable custom prices. Validation: Required. Supported values are Stackable and BestOf. */
export enum KnownDiscountCombinationRule {
  /** BestOf */
  BestOf = "BestOf",
  /** Stackable */
  Stackable = "Stackable",
}

/**
 * The discount combination rule when there are multiple applicable custom prices. Validation: Required. Supported values are Stackable and BestOf. \
 * {@link KnownDiscountCombinationRule} can be used interchangeably with DiscountCombinationRule,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BestOf** \
 * **Stackable**
 */
export type DiscountCombinationRule = string;

/** Set only in price guarantee scenario. */
export interface PriceGuaranteeProperties {
  /** Supported values: Protected, Locked */
  pricingPolicy?: PricingPolicy;
  /** The date on which prices are to be used for guarantee calculation. Validation: expected to be 00 hours, Format: 2024-09-30T00:00:00Z. Must be in UTC. */
  priceGuaranteeDate?: Date;
}

export function priceGuaranteePropertiesSerializer(item: PriceGuaranteeProperties): any {
  return {
    pricingPolicy: item["pricingPolicy"],
    priceGuaranteeDate: !item["priceGuaranteeDate"]
      ? item["priceGuaranteeDate"]
      : item["priceGuaranteeDate"].toISOString(),
  };
}

export function priceGuaranteePropertiesDeserializer(item: any): PriceGuaranteeProperties {
  return {
    pricingPolicy: item["pricingPolicy"],
    priceGuaranteeDate: !item["priceGuaranteeDate"]
      ? item["priceGuaranteeDate"]
      : new Date(item["priceGuaranteeDate"]),
  };
}

/** Supported values: Protected, Locked */
export enum KnownPricingPolicy {
  /** Protected */
  Protected = "Protected",
  /** Locked */
  Locked = "Locked",
}

/**
 * Supported values: Protected, Locked \
 * {@link KnownPricingPolicy} can be used interchangeably with PricingPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Protected** \
 * **Locked**
 */
export type PricingPolicy = string;

export function conditionsItemArraySerializer(result: Array<ConditionsItem>): any[] {
  return result.map((item) => {
    return conditionsItemSerializer(item);
  });
}

export function conditionsItemArrayDeserializer(result: Array<ConditionsItem>): any[] {
  return result.map((item) => {
    return conditionsItemDeserializer(item);
  });
}

/** Condition for a discount. */
export interface ConditionsItem {
  conditionName?: string;
  /** These items are open-ended strings. */
  value?: string[];
  type?: string;
}

export function conditionsItemSerializer(item: ConditionsItem): any {
  return {
    conditionName: item["conditionName"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
    type: item["type"],
  };
}

export function conditionsItemDeserializer(item: any): ConditionsItem {
  return {
    conditionName: item["conditionName"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
    type: item["type"],
  };
}

/** Discount type properties including product family name */
export interface DiscountTypeProductFamily extends DiscountTypeProperties {
  /** Product family for which the discount is given. Validation: Optional */
  productFamilyName?: string;
  /** Defines the type of discount. Supported values are ProductFamily, Product, Sku, CustomPrice, and CustomPriceMultiCurrency. */
  discountType: "ProductFamily";
}

export function discountTypeProductFamilySerializer(item: DiscountTypeProductFamily): any {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesSerializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArraySerializer(item["conditions"]),
    productFamilyName: item["productFamilyName"],
  };
}

export function discountTypeProductFamilyDeserializer(item: any): DiscountTypeProductFamily {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesDeserializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArrayDeserializer(item["conditions"]),
    productFamilyName: item["productFamilyName"],
  };
}

/** Discount type properties including product family name and product id. */
export interface DiscountTypeProduct extends DiscountTypeProperties {
  /** Product family for which the discount is given. Validation: Optional */
  productFamilyName?: string;
  /** Product ID for which the discount is given. Validation: Optional. No specific format, example: DZH318Z09V6F */
  productId?: string;
  /** Defines the type of discount. Supported values are ProductFamily, Product, Sku, CustomPrice, and CustomPriceMultiCurrency. */
  discountType: "Product";
}

export function discountTypeProductSerializer(item: DiscountTypeProduct): any {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesSerializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArraySerializer(item["conditions"]),
    productFamilyName: item["productFamilyName"],
    productId: item["productId"],
  };
}

export function discountTypeProductDeserializer(item: any): DiscountTypeProduct {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesDeserializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArrayDeserializer(item["conditions"]),
    productFamilyName: item["productFamilyName"],
    productId: item["productId"],
  };
}

/** Discount type properties including product family name, product id, and sku id. */
export interface DiscountTypeProductSku extends DiscountTypeProperties {
  /** Product family for which the discount is given. Validation: Optional */
  productFamilyName?: string;
  /** Product ID for which the discount is given. Validation: Optional. No specific format, example: DZH318Z09V6F */
  productId?: string;
  /** ResourceSku for the given discount. Validation: Optional. */
  skuId?: string;
  /** Defines the type of discount. Supported values are ProductFamily, Product, Sku, CustomPrice, and CustomPriceMultiCurrency. */
  discountType: "Sku";
}

export function discountTypeProductSkuSerializer(item: DiscountTypeProductSku): any {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesSerializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArraySerializer(item["conditions"]),
    productFamilyName: item["productFamilyName"],
    productId: item["productId"],
    skuId: item["skuId"],
  };
}

export function discountTypeProductSkuDeserializer(item: any): DiscountTypeProductSku {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesDeserializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArrayDeserializer(item["conditions"]),
    productFamilyName: item["productFamilyName"],
    productId: item["productId"],
    skuId: item["skuId"],
  };
}

/** Discount type properties including product family name, product id, sku, and custom price properties. Allows a single entry in marketSetPrices. */
export interface DiscountTypeCustomPrice extends DiscountTypeProperties {
  /** Product family for which the discount is given. Validation: Optional */
  productFamilyName?: string;
  /** Product ID for which the discount is given. Validation: Optional. No specific format, example: DZH318Z09V6F */
  productId?: string;
  /** ResourceSku for the given discount. Validation: Optional. */
  skuId?: string;
  /** Custom price properties for a given discount. */
  customPriceProperties?: CustomPriceProperties;
  /** Defines the type of discount. Supported values are ProductFamily, Product, Sku, CustomPrice, and CustomPriceMultiCurrency. */
  /** The discriminator possible values: CustomPriceMultiCurrency */
  discountType: "CustomPrice" | "CustomPriceMultiCurrency";
}

export function discountTypeCustomPriceSerializer(item: DiscountTypeCustomPrice): any {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesSerializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArraySerializer(item["conditions"]),
    productFamilyName: item["productFamilyName"],
    productId: item["productId"],
    skuId: item["skuId"],
    customPriceProperties: !item["customPriceProperties"]
      ? item["customPriceProperties"]
      : customPricePropertiesSerializer(item["customPriceProperties"]),
  };
}

export function discountTypeCustomPriceDeserializer(item: any): DiscountTypeCustomPrice {
  return {
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesDeserializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArrayDeserializer(item["conditions"]),
    productFamilyName: item["productFamilyName"],
    productId: item["productId"],
    skuId: item["skuId"],
    customPriceProperties: !item["customPriceProperties"]
      ? item["customPriceProperties"]
      : customPricePropertiesDeserializer(item["customPriceProperties"]),
  };
}

/** Alias for DiscountTypeCustomPriceUnion */
export type DiscountTypeCustomPriceUnion =
  | DiscountTypeCustomPriceMultiCurrency
  | DiscountTypeCustomPrice;

export function discountTypeCustomPriceUnionSerializer(item: DiscountTypeCustomPriceUnion): any {
  switch (item.discountType) {
    case "CustomPriceMultiCurrency":
      return discountTypeCustomPriceMultiCurrencySerializer(
        item as DiscountTypeCustomPriceMultiCurrency,
      );

    default:
      return discountTypeCustomPriceSerializer(item);
  }
}

export function discountTypeCustomPriceUnionDeserializer(item: any): DiscountTypeCustomPriceUnion {
  switch (item["discountType"]) {
    case "CustomPriceMultiCurrency":
      return discountTypeCustomPriceMultiCurrencyDeserializer(
        item as DiscountTypeCustomPriceMultiCurrency,
      );

    default:
      return discountTypeCustomPriceDeserializer(item);
  }
}

/** Custom price properties for a given discount. */
export interface CustomPriceProperties {
  /** The type of the priceable node pricing rule. Validation: Required. Supported values are fixedPriceLock, fixedListPrice, and priceCeiling. */
  ruleType: DiscountRuleType;
  /** The catalog instance where the priceable node lives. Validation: Required. No defined format, will vary per team. */
  catalogId: string;
  /** The set of BigCat claims. Validation: Required. Must contain AgreementType, NationalCloud, and PricingAudience claims. Additionally requires AccessPass claim when creating custom price with action == consume on the pricing instructions. */
  catalogClaims: CatalogClaimsItem[];
  /** The term units for the priceable node. Validation: Optional, Maximum length 128 characters. Must be present if and only if the availability derived by market, product, sku, and claims has terms. */
  termUnits?: string;
  /** The billing period of the priceable node. Validation: Optional, Maximum length 128 characters. Only allowed if the availability derived by market, product, sku, and claims has terms and at least one of those terms has a billing period. When specified, termUnits must be specified. */
  billingPeriod?: string;
  /** Must be present if the market, product, sku, and claims, and optional term information resolves to multiple availabilities that only differ by meter type. Validation: Maximum length 128 characters. */
  meterType?: string;
  /** The set of market set prices of the priceable node. Validation: Required. Must contain at least one element. */
  marketSetPrices: MarketSetPricesItems[];
}

export function customPricePropertiesSerializer(item: CustomPriceProperties): any {
  return {
    ruleType: item["ruleType"],
    catalogId: item["catalogId"],
    catalogClaims: catalogClaimsItemArraySerializer(item["catalogClaims"]),
    termUnits: item["termUnits"],
    billingPeriod: item["billingPeriod"],
    meterType: item["meterType"],
    marketSetPrices: marketSetPricesItemsArraySerializer(item["marketSetPrices"]),
  };
}

export function customPricePropertiesDeserializer(item: any): CustomPriceProperties {
  return {
    ruleType: item["ruleType"],
    catalogId: item["catalogId"],
    catalogClaims: catalogClaimsItemArrayDeserializer(item["catalogClaims"]),
    termUnits: item["termUnits"],
    billingPeriod: item["billingPeriod"],
    meterType: item["meterType"],
    marketSetPrices: marketSetPricesItemsArrayDeserializer(item["marketSetPrices"]),
  };
}

/** The type of the priceable node pricing rule. Validation: Required. Supported values are fixedPriceLock, fixedListPrice, and priceCeiling. */
export enum KnownDiscountRuleType {
  /** FixedPriceLock */
  FixedPriceLock = "FixedPriceLock",
  /** FixedListPrice */
  FixedListPrice = "FixedListPrice",
  /** PriceCeiling */
  PriceCeiling = "PriceCeiling",
}

/**
 * The type of the priceable node pricing rule. Validation: Required. Supported values are fixedPriceLock, fixedListPrice, and priceCeiling. \
 * {@link KnownDiscountRuleType} can be used interchangeably with DiscountRuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FixedPriceLock** \
 * **FixedListPrice** \
 * **PriceCeiling**
 */
export type DiscountRuleType = string;

export function catalogClaimsItemArraySerializer(result: Array<CatalogClaimsItem>): any[] {
  return result.map((item) => {
    return catalogClaimsItemSerializer(item);
  });
}

export function catalogClaimsItemArrayDeserializer(result: Array<CatalogClaimsItem>): any[] {
  return result.map((item) => {
    return catalogClaimsItemDeserializer(item);
  });
}

/** Catalog claim for a discount. */
export interface CatalogClaimsItem {
  catalogClaimsItemType?: string;
  value?: string;
}

export function catalogClaimsItemSerializer(item: CatalogClaimsItem): any {
  return { catalogClaimsItemType: item["catalogClaimsItemType"], value: item["value"] };
}

export function catalogClaimsItemDeserializer(item: any): CatalogClaimsItem {
  return {
    catalogClaimsItemType: item["catalogClaimsItemType"],
    value: item["value"],
  };
}

export function marketSetPricesItemsArraySerializer(result: Array<MarketSetPricesItems>): any[] {
  return result.map((item) => {
    return marketSetPricesItemsSerializer(item);
  });
}

export function marketSetPricesItemsArrayDeserializer(result: Array<MarketSetPricesItems>): any[] {
  return result.map((item) => {
    return marketSetPricesItemsDeserializer(item);
  });
}

/** Items in the MarketSetPrices array. */
export interface MarketSetPricesItems {
  markets: string[];
  /** The locked price for the priceable node. Validation: Required. Must be greater than or equal to 0. If the case of billing plans. This represents the price for each cycle charge. */
  value: number;
  /** The currency of the locked price value. Validation: Required. Must be a valid ISO 4217 3-letter currency code. */
  currency: string;
}

export function marketSetPricesItemsSerializer(item: MarketSetPricesItems): any {
  return {
    markets: item["markets"].map((p: any) => {
      return p;
    }),
    value: item["value"],
    currency: item["currency"],
  };
}

export function marketSetPricesItemsDeserializer(item: any): MarketSetPricesItems {
  return {
    markets: item["markets"].map((p: any) => {
      return p;
    }),
    value: item["value"],
    currency: item["currency"],
  };
}

/** Discount type properties including product family name, product id, sku, and custom price properties. Allows multiple entries in marketSetPrices. */
export interface DiscountTypeCustomPriceMultiCurrency extends DiscountTypeCustomPrice {
  /** Defines the type of discount. Supported values are ProductFamily, Product, Sku, CustomPrice, and CustomPriceMultiCurrency. */
  discountType: "CustomPriceMultiCurrency";
}

export function discountTypeCustomPriceMultiCurrencySerializer(
  item: DiscountTypeCustomPriceMultiCurrency,
): any {
  return {
    productFamilyName: item["productFamilyName"],
    productId: item["productId"],
    skuId: item["skuId"],
    customPriceProperties: !item["customPriceProperties"]
      ? item["customPriceProperties"]
      : customPricePropertiesSerializer(item["customPriceProperties"]),
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesSerializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArraySerializer(item["conditions"]),
  };
}

export function discountTypeCustomPriceMultiCurrencyDeserializer(
  item: any,
): DiscountTypeCustomPriceMultiCurrency {
  return {
    productFamilyName: item["productFamilyName"],
    productId: item["productId"],
    skuId: item["skuId"],
    customPriceProperties: !item["customPriceProperties"]
      ? item["customPriceProperties"]
      : customPricePropertiesDeserializer(item["customPriceProperties"]),
    discountType: item["discountType"],
    applyDiscountOn: item["applyDiscountOn"],
    discountPercentage: item["discountPercentage"],
    discountCombinationRule: item["discountCombinationRule"],
    priceGuaranteeProperties: !item["priceGuaranteeProperties"]
      ? item["priceGuaranteeProperties"]
      : priceGuaranteePropertiesDeserializer(item["priceGuaranteeProperties"]),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionsItemArrayDeserializer(item["conditions"]),
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ServiceManagedIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
  type: ServiceManagedIdentityType;
  /** The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function serviceManagedIdentitySerializer(item: ServiceManagedIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function serviceManagedIdentityDeserializer(item: any): ServiceManagedIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownServiceManagedIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned,UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownServiceManagedIdentityType} can be used interchangeably with ServiceManagedIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned,UserAssigned**
 */
export type ServiceManagedIdentityType = string;

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The resource model definition representing SKU */
export interface Sku {
  /** The name of the SKU. E.g. P3. It is typically a letter+number code */
  name: string;
  /** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
  tier?: SkuTier;
  /** The SKU size. When the name field is the combination of tier and some other value, this would be the standalone code. */
  size?: string;
  /** If the service has different generations of hardware, for the same SKU, then that can be captured here. */
  family?: string;
  /** If the SKU supports scale out/in then the capacity integer should be included. If scale out/in is not possible for the resource this may be omitted. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** This field is required to be implemented by the Resource Provider if the service has more than one tier, but is not required on a PUT. */
export type SkuTier = "Free" | "Basic" | "Standard" | "Premium";

/** Plan for the resource. */
export interface Plan {
  /** A user defined name of the 3rd Party Artifact that is being procured. */
  name: string;
  /** The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic */
  publisher: string;
  /** The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. */
  product: string;
  /** A publisher provided promotion code as provisioned in Data Market for the said product/artifact. */
  promotionCode?: string;
  /** The version of the desired product/artifact. */
  version?: string;
}

export function planSerializer(item: Plan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

export function planDeserializer(item: any): Plan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(_item: Resource): any {
  return {};
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Discount list */
export interface _DiscountList {
  /** The Discount items on this page */
  value: Discount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _discountListDeserializer(item: any): _DiscountList {
  return {
    value: discountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function discountArraySerializer(result: Array<Discount>): any[] {
  return result.map((item) => {
    return discountSerializer(item);
  });
}

export function discountArrayDeserializer(result: Array<Discount>): any[] {
  return result.map((item) => {
    return discountDeserializer(item);
  });
}

/** MACC contributor */
export interface Contributor extends ProxyResource {
  /** Provisioning state of MACC as assigned by RPaaS. This indicates the last operation's status. For all practical purposes, this can be ignored. For current status of MACC resource, refer to MaccStatus. */
  readonly provisioningState?: string;
  /** Represents the current status of the MACC. */
  status?: MaccStatus;
  /** Represents type of the object being operated on. Possible values are primary or contributor. */
  entityType?: MaccEntityType;
  /** Display name */
  displayName?: string;
  /** Represents catalog UPN. */
  productCode?: string;
  /** Fully-qualified identifier of the billing account where the MACC is applied. Present only for Enterprise Agreement customers. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId} */
  billingAccountResourceId?: string;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Must be start of month. Timestamp must be in the ISO date format YYYY-MM-DDT00:00:00Z. */
  startAt?: Date;
  /** Must be end of month. Timestamp must be in the ISO date format YYYY-MM-DDT23:59:59Z. */
  endAt?: Date;
  /** This is the globally unique identifier of the MACC which will not change for the lifetime of the MACC. */
  systemId?: string;
  /** Setting this to 'Enable' enables automatic shortfall charging when commitment is not met. */
  automaticShortfall?: EnablementMode;
  /** Optional field to record suppression reason for automatic shortfall. */
  automaticShortfallSuppressReason?: AutomaticShortfallSuppressReason;
  /** MACC shortfall */
  shortfall?: Shortfall;
  /** List of milestones associated with this MACC. */
  milestones?: MaccMilestone[];
  /** This is the resource identifier of either the primary MACC or the contributor. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  resourceId?: string;
  /** Setting this to true means multi-entity. */
  allowContributors?: boolean;
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
  /** Fully-qualified billing account resource identifier of the primary MACC. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
}

export function contributorDeserializer(item: any): Contributor {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _contributorPropertiesDeserializer(item["properties"])),
  };
}

/** MACC properties */
export interface MaccModelProperties {
  /** Provisioning state of MACC as assigned by RPaaS. This indicates the last operation's status. For all practical purposes, this can be ignored. For current status of MACC resource, refer to MaccStatus. */
  readonly provisioningState?: string;
  /** Represents the current status of the MACC. */
  status?: MaccStatus;
  /** Represents type of the object being operated on. Possible values are primary or contributor. */
  entityType: MaccEntityType;
  /** Display name */
  displayName?: string;
  /** Represents catalog UPN. */
  productCode?: string;
  /** Fully-qualified identifier of the billing account where the MACC is applied. Present only for Enterprise Agreement customers. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId} */
  billingAccountResourceId?: string;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Must be start of month. Timestamp must be in the ISO date format YYYY-MM-DDT00:00:00Z. */
  startAt?: Date;
  /** Must be end of month. Timestamp must be in the ISO date format YYYY-MM-DDT23:59:59Z. */
  endAt?: Date;
  /** This is the globally unique identifier of the MACC which will not change for the lifetime of the MACC. */
  systemId?: string;
  /** Setting this to 'Enable' enables automatic shortfall charging when commitment is not met. */
  automaticShortfall?: EnablementMode;
  /** Optional field to record suppression reason for automatic shortfall. */
  automaticShortfallSuppressReason?: AutomaticShortfallSuppressReason;
  /** MACC shortfall */
  shortfall?: Shortfall;
  /** List of milestones associated with this MACC. */
  milestones?: MaccMilestone[];
  /** This is the resource identifier of either the primary MACC or the contributor. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  resourceId?: string;
  /** Setting this to true means multi-entity. */
  allowContributors?: boolean;
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
  /** Fully-qualified billing account resource identifier of the primary MACC. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
}

export function maccModelPropertiesSerializer(item: MaccModelProperties): any {
  return {
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonSerializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallSerializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArraySerializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function maccModelPropertiesDeserializer(item: any): MaccModelProperties {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonDeserializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallDeserializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArrayDeserializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

/** Represents the current status of the MACC. */
export enum KnownMaccStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** Active */
  Active = "Active",
  /** Pending */
  Pending = "Pending",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Completed */
  Completed = "Completed",
  /** Stopped */
  Stopped = "Stopped",
  /** PendingSettlement */
  PendingSettlement = "PendingSettlement",
  /** ShortfallCharged */
  ShortfallCharged = "ShortfallCharged",
  /** ShortfallWaived */
  ShortfallWaived = "ShortfallWaived",
}

/**
 * Represents the current status of the MACC. \
 * {@link KnownMaccStatus} can be used interchangeably with MaccStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Scheduled** \
 * **Active** \
 * **Pending** \
 * **Failed** \
 * **Canceled** \
 * **Completed** \
 * **Stopped** \
 * **PendingSettlement** \
 * **ShortfallCharged** \
 * **ShortfallWaived**
 */
export type MaccStatus = string;

/** Represents type of the object being operated on. Possible values are primary or contributor. */
export enum KnownMaccEntityType {
  /** Primary */
  Primary = "Primary",
  /** Contributor */
  Contributor = "Contributor",
}

/**
 * Represents type of the object being operated on. Possible values are primary or contributor. \
 * {@link KnownMaccEntityType} can be used interchangeably with MaccEntityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Contributor**
 */
export type MaccEntityType = string;

/** Commitment towards the benefit. */
export interface Commitment extends Price {
  /** The grain of the commitment. */
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

/** Grain. */
export enum KnownCommitmentGrain {
  /** Hourly */
  Hourly = "Hourly",
  /** FullTerm */
  FullTerm = "FullTerm",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Grain. \
 * {@link KnownCommitmentGrain} can be used interchangeably with CommitmentGrain,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hourly** \
 * **FullTerm** \
 * **Unknown**
 */
export type CommitmentGrain = string;

/** Represents the enablement status of a feature or settings. */
export enum KnownEnablementMode {
  /** Unknown */
  Unknown = "Unknown",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Represents the enablement status of a feature or settings. \
 * {@link KnownEnablementMode} can be used interchangeably with EnablementMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Enabled** \
 * **Disabled**
 */
export type EnablementMode = string;

/** Optional field to record suppression reason for automatic shortfall. */
export interface AutomaticShortfallSuppressReason {
  /** Code for the suppression reason. */
  code?: string;
  /** Message for suppression reason. */
  message?: string;
}

export function automaticShortfallSuppressReasonSerializer(
  item: AutomaticShortfallSuppressReason,
): any {
  return { code: item["code"], message: item["message"] };
}

export function automaticShortfallSuppressReasonDeserializer(
  item: any,
): AutomaticShortfallSuppressReason {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** MACC shortfall */
export interface Shortfall {
  /** Represents catalog UPN. */
  productCode?: string;
  /** Shortfall amount with grain. */
  charge?: Commitment;
  /** Start DateTime. */
  startAt?: Date;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Fully-qualified resource identifier of the credits associated with the shortfall. */
  resourceId?: string;
  /** Points to BalanceVersion document that indicates the remaining commitment balance when the credit was created. */
  balanceVersion?: number;
  /** This is an identifier of the shortfall which will not change for its lifetime. */
  systemId?: string;
}

export function shortfallSerializer(item: Shortfall): any {
  return {
    productCode: item["productCode"],
    charge: !item["charge"] ? item["charge"] : commitmentSerializer(item["charge"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    resourceId: item["resourceId"],
    balanceVersion: item["balanceVersion"],
    systemId: item["systemId"],
  };
}

export function shortfallDeserializer(item: any): Shortfall {
  return {
    productCode: item["productCode"],
    charge: !item["charge"] ? item["charge"] : commitmentDeserializer(item["charge"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    resourceId: item["resourceId"],
    balanceVersion: item["balanceVersion"],
    systemId: item["systemId"],
  };
}

export function maccMilestoneArraySerializer(result: Array<MaccMilestone>): any[] {
  return result.map((item) => {
    return maccMilestoneSerializer(item);
  });
}

export function maccMilestoneArrayDeserializer(result: Array<MaccMilestone>): any[] {
  return result.map((item) => {
    return maccMilestoneDeserializer(item);
  });
}

/** MACC milestone represents interim targets within the period of MACC. */
export interface MaccMilestone {
  /** Globally unique identifier for the milestone. Format: {guid} */
  milestoneId?: string;
  /** Commitment associated with this milestone. */
  commitment?: Price;
  /** End date time for the milestone. Timestamp must be in the ISO date format YYYY-MM-DDT23:59:59Z. */
  endAt?: Date;
  /** Setting this to 'Enable' enables automatic shortfall invoicing when milestone commitment is not met. */
  automaticShortfall?: EnablementMode;
  /** Optional field to record suppression reason for automatic shortfall. */
  automaticShortfallSuppressReason?: AutomaticShortfallSuppressReason;
  /** Represents the current status of the Milestone. */
  status?: MaccMilestoneStatus;
  /** Details of the shortfall associated with this milestone. */
  shortfall?: Shortfall;
}

export function maccMilestoneSerializer(item: MaccMilestone): any {
  return {
    milestoneId: item["milestoneId"],
    commitment: !item["commitment"] ? item["commitment"] : priceSerializer(item["commitment"]),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonSerializer(item["automaticShortfallSuppressReason"]),
    status: item["status"],
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallSerializer(item["shortfall"]),
  };
}

export function maccMilestoneDeserializer(item: any): MaccMilestone {
  return {
    milestoneId: item["milestoneId"],
    commitment: !item["commitment"] ? item["commitment"] : priceDeserializer(item["commitment"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonDeserializer(item["automaticShortfallSuppressReason"]),
    status: item["status"],
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallDeserializer(item["shortfall"]),
  };
}

/** model interface Price */
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

/** Represents the current status of the Milestone. */
export enum KnownMaccMilestoneStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** Active */
  Active = "Active",
  /** Pending */
  Pending = "Pending",
  /** Failed */
  Failed = "Failed",
  /** Completed */
  Completed = "Completed",
  /** Canceled */
  Canceled = "Canceled",
  /** Removed */
  Removed = "Removed",
  /** PendingSettlement */
  PendingSettlement = "PendingSettlement",
  /** ShortfallCharged */
  ShortfallCharged = "ShortfallCharged",
  /** ShortfallWaived */
  ShortfallWaived = "ShortfallWaived",
}

/**
 * Represents the current status of the Milestone. \
 * {@link KnownMaccMilestoneStatus} can be used interchangeably with MaccMilestoneStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Scheduled** \
 * **Active** \
 * **Pending** \
 * **Failed** \
 * **Completed** \
 * **Canceled** \
 * **Removed** \
 * **PendingSettlement** \
 * **ShortfallCharged** \
 * **ShortfallWaived**
 */
export type MaccMilestoneStatus = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Contributor list */
export interface _ContributorList {
  /** The Contributor items on this page */
  value: Contributor[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _contributorListDeserializer(item: any): _ContributorList {
  return {
    value: contributorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function contributorArrayDeserializer(result: Array<Contributor>): any[] {
  return result.map((item) => {
    return contributorDeserializer(item);
  });
}

/** Credit resource definition */
export interface Credit extends TrackedResource {
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: string;
  /** The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly etag?: string;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Plan for the resource. */
  plan?: Plan;
  /** Status of the credit */
  status?: CreditStatus;
  /** Product UPN for the credit type */
  productCode?: string;
  /** The reason for the credit. Not required if not applicable. */
  reason?: CreditReason;
  /** The entire investment amount for the credit contract, including currency and amount */
  credit?: Commitment;
  /** Start DateTime. */
  startAt?: Date;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Credit breakdown item representing a milestone, line-item, or no-charge service */
  policies?: CreditPolicies;
  /** Fully-qualified identifier of the billing account where the benefit is applied. Present only for Enterprise Agreement customers. */
  billingAccountResourceId?: string;
  /** Fully-qualified identifier of the billing profile where the benefit is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileResourceId?: string;
  /** Credit line-items/milestones/no-charge services breakdown */
  breakdown?: CreditBreakdownItem[];
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** System identifier */
  systemId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. Format is /providers/Microsoft.Billing/billingAccounts/{acctId:orgId} */
  readonly customerId?: string;
  /** Fully-qualified resource identifier of the resource. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/{benefitType}/{benefitName}. */
  resourceId?: string;
}

export function creditSerializer(item: Credit): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "status",
      "productCode",
      "reason",
      "credit",
      "startAt",
      "endAt",
      "policies",
      "billingAccountResourceId",
      "breakdown",
      "systemId",
      "resourceId",
    ])
      ? undefined
      : _creditPropertiesSerializer(item),
    managedBy: item["managedBy"],
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function creditDeserializer(item: any): Credit {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _creditPropertiesDeserializer(item["properties"])),
    managedBy: item["managedBy"],
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Properties of a credit */
export interface CreditProperties {
  /** Status of the credit */
  status?: CreditStatus;
  /** Product UPN for the credit type */
  productCode?: string;
  /** The reason for the credit. Not required if not applicable. */
  reason?: CreditReason;
  /** The entire investment amount for the credit contract, including currency and amount */
  credit?: Commitment;
  /** Start DateTime. */
  startAt?: Date;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Credit breakdown item representing a milestone, line-item, or no-charge service */
  policies?: CreditPolicies;
  /** Fully-qualified identifier of the billing account where the benefit is applied. Present only for Enterprise Agreement customers. */
  billingAccountResourceId?: string;
  /** Fully-qualified identifier of the billing profile where the benefit is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileResourceId?: string;
  /** Credit line-items/milestones/no-charge services breakdown */
  breakdown?: CreditBreakdownItem[];
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** System identifier */
  systemId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. Format is /providers/Microsoft.Billing/billingAccounts/{acctId:orgId} */
  readonly customerId?: string;
  /** Fully-qualified resource identifier of the resource. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/{benefitType}/{benefitName}. */
  resourceId?: string;
}

export function creditPropertiesSerializer(item: CreditProperties): any {
  return {
    status: item["status"],
    productCode: item["productCode"],
    reason: !item["reason"] ? item["reason"] : creditReasonSerializer(item["reason"]),
    credit: !item["credit"] ? item["credit"] : commitmentSerializer(item["credit"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    policies: !item["policies"] ? item["policies"] : creditPoliciesSerializer(item["policies"]),
    billingAccountResourceId: item["billingAccountResourceId"],
    breakdown: !item["breakdown"]
      ? item["breakdown"]
      : creditBreakdownItemArraySerializer(item["breakdown"]),
    systemId: item["systemId"],
    resourceId: item["resourceId"],
  };
}

export function creditPropertiesDeserializer(item: any): CreditProperties {
  return {
    status: item["status"],
    productCode: item["productCode"],
    reason: !item["reason"] ? item["reason"] : creditReasonDeserializer(item["reason"]),
    credit: !item["credit"] ? item["credit"] : commitmentDeserializer(item["credit"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    policies: !item["policies"] ? item["policies"] : creditPoliciesDeserializer(item["policies"]),
    billingAccountResourceId: item["billingAccountResourceId"],
    billingProfileResourceId: item["billingProfileResourceId"],
    breakdown: !item["breakdown"]
      ? item["breakdown"]
      : creditBreakdownItemArrayDeserializer(item["breakdown"]),
    provisioningState: item["provisioningState"],
    systemId: item["systemId"],
    customerId: item["customerId"],
    resourceId: item["resourceId"],
  };
}

/** Status of the credit */
export enum KnownCreditStatus {
  /** Credit status is unknown */
  Unknown = "Unknown",
  /** Credit is pending activation */
  Pending = "Pending",
  /** Credit is active and available for use */
  Active = "Active",
  /** Credit operation succeeded */
  Succeeded = "Succeeded",
  /** Credit has been cancelled */
  Canceled = "Canceled",
  /** Credit operation failed */
  Failed = "Failed",
  /** Credit has expired */
  Expired = "Expired",
  /** Credit has been fully consumed */
  Exhausted = "Exhausted",
  /** Credit application has not started yet */
  NotStarted = "NotStarted",
}

/**
 * Status of the credit \
 * {@link KnownCreditStatus} can be used interchangeably with CreditStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Credit status is unknown \
 * **Pending**: Credit is pending activation \
 * **Active**: Credit is active and available for use \
 * **Succeeded**: Credit operation succeeded \
 * **Canceled**: Credit has been cancelled \
 * **Failed**: Credit operation failed \
 * **Expired**: Credit has expired \
 * **Exhausted**: Credit has been fully consumed \
 * **NotStarted**: Credit application has not started yet
 */
export type CreditStatus = string;

/** The reason for the credit. Not required if not applicable. */
export interface CreditReason {
  /** The reason code for credit. */
  code?: string;
  /** The free string description of the credit. */
  description?: string;
}

export function creditReasonSerializer(item: CreditReason): any {
  return { code: item["code"], description: item["description"] };
}

export function creditReasonDeserializer(item: any): CreditReason {
  return {
    code: item["code"],
    description: item["description"],
  };
}

/** Credit breakdown item representing a milestone, line-item, or no-charge service */
export interface CreditPolicies {
  /** Redemption policy of the Credit */
  redemption?: CreditRedemptionPolicy;
  /** Expiration policy of the Credit */
  expiration?: CreditExpirationPolicy;
}

export function creditPoliciesSerializer(item: CreditPolicies): any {
  return { redemption: item["redemption"], expiration: item["expiration"] };
}

export function creditPoliciesDeserializer(item: any): CreditPolicies {
  return {
    redemption: item["redemption"],
    expiration: item["expiration"],
  };
}

/** Redemption policy of the Credit */
export enum KnownCreditRedemptionPolicy {
  /** Redemption policy is not applicable for this credit */
  NotApplicable = "NotApplicable",
  /** Credit is automatically redeemed */
  AutoRedeem = "AutoRedeem",
  /** Credit is manually redeemed */
  ManualRedeem = "ManualRedeem",
}

/**
 * Redemption policy of the Credit \
 * {@link KnownCreditRedemptionPolicy} can be used interchangeably with CreditRedemptionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotApplicable**: Redemption policy is not applicable for this credit \
 * **AutoRedeem**: Credit is automatically redeemed \
 * **ManualRedeem**: Credit is manually redeemed
 */
export type CreditRedemptionPolicy = string;

/** Expiration policy of the Credit */
export enum KnownCreditExpirationPolicy {
  /** No policy applied to the expiration of this credit */
  None = "None",
  /** Billing profile is suspended when the credit expires */
  SuspendBillingProfile = "SuspendBillingProfile",
}

/**
 * Expiration policy of the Credit \
 * {@link KnownCreditExpirationPolicy} can be used interchangeably with CreditExpirationPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No policy applied to the expiration of this credit \
 * **SuspendBillingProfile**: Billing profile is suspended when the credit expires
 */
export type CreditExpirationPolicy = string;

export function creditBreakdownItemArraySerializer(result: Array<CreditBreakdownItem>): any[] {
  return result.map((item) => {
    return creditBreakdownItemSerializer(item);
  });
}

export function creditBreakdownItemArrayDeserializer(result: Array<CreditBreakdownItem>): any[] {
  return result.map((item) => {
    return creditBreakdownItemDeserializer(item);
  });
}

/** Credit breakdown item representing a milestone, line-item, or no-charge service */
export interface CreditBreakdownItem {
  /** Allocation details including currency and amount for this breakdown item */
  allocation?: Commitment;
  /** Start DateTime. */
  startAt?: Date;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Key-value pairs for additional parameters and metadata */
  dimensions?: CreditDimension[];
}

export function creditBreakdownItemSerializer(item: CreditBreakdownItem): any {
  return {
    allocation: !item["allocation"] ? item["allocation"] : commitmentSerializer(item["allocation"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : creditDimensionArraySerializer(item["dimensions"]),
  };
}

export function creditBreakdownItemDeserializer(item: any): CreditBreakdownItem {
  return {
    allocation: !item["allocation"]
      ? item["allocation"]
      : commitmentDeserializer(item["allocation"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : creditDimensionArrayDeserializer(item["dimensions"]),
  };
}

export function creditDimensionArraySerializer(result: Array<CreditDimension>): any[] {
  return result.map((item) => {
    return creditDimensionSerializer(item);
  });
}

export function creditDimensionArrayDeserializer(result: Array<CreditDimension>): any[] {
  return result.map((item) => {
    return creditDimensionDeserializer(item);
  });
}

/** Key-value pair for additional credit parameters and metadata */
export interface CreditDimension {
  /** The dimension key (e.g., productFamily, description, creditType) */
  key: string;
  /** The dimension value */
  value: string;
}

export function creditDimensionSerializer(item: CreditDimension): any {
  return { key: item["key"], value: item["value"] };
}

export function creditDimensionDeserializer(item: any): CreditDimension {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** Provisioning state */
export enum KnownProvisioningState {
  /** Creating */
  Creating = "Creating",
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
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **PendingBilling** \
 * **ConfirmedBilling** \
 * **Created** \
 * **Succeeded** \
 * **Cancelled** \
 * **Expired** \
 * **Failed**
 */
export type ProvisioningState = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** Credit patch request */
export interface CreditPatchRequest {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The entire investment amount for the credit contract, including currency and amount. Only amount can be modified. */
  credit?: Commitment;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Credit line-items/milestones/no-charge services breakdown. Entire breakdown will be replaced in a PATCH operation. */
  breakdown?: CreditBreakdownItem[];
}

export function creditPatchRequestSerializer(item: CreditPatchRequest): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["credit", "endAt", "breakdown"])
      ? undefined
      : _creditPatchRequestPropertiesSerializer(item),
  };
}

/** Credit patch properties */
export interface CreditPatchProperties {
  /** The entire investment amount for the credit contract, including currency and amount. Only amount can be modified. */
  credit?: Commitment;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Credit line-items/milestones/no-charge services breakdown. Entire breakdown will be replaced in a PATCH operation. */
  breakdown?: CreditBreakdownItem[];
}

export function creditPatchPropertiesSerializer(item: CreditPatchProperties): any {
  return {
    credit: !item["credit"] ? item["credit"] : commitmentSerializer(item["credit"]),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    breakdown: !item["breakdown"]
      ? item["breakdown"]
      : creditBreakdownItemArraySerializer(item["breakdown"]),
  };
}

/** List of credits */
export interface _CreditsList {
  /** The Credit items on this page */
  value: Credit[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _creditsListDeserializer(item: any): _CreditsList {
  return {
    value: creditArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function creditArraySerializer(result: Array<Credit>): any[] {
  return result.map((item) => {
    return creditSerializer(item);
  });
}

export function creditArrayDeserializer(result: Array<Credit>): any[] {
  return result.map((item) => {
    return creditDeserializer(item);
  });
}

/** Resource definition for Conditional Credits. */
export interface ConditionalCredit extends TrackedResource {
  /** Conditional credit properties */
  properties?: ConditionalCreditPropertiesUnion;
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: string;
  /** The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly etag?: string;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Plan for the resource. */
  plan?: Plan;
}

export function conditionalCreditSerializer(item: ConditionalCredit): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : conditionalCreditPropertiesUnionSerializer(item["properties"]),
    managedBy: item["managedBy"],
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function conditionalCreditDeserializer(item: any): ConditionalCredit {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : conditionalCreditPropertiesUnionDeserializer(item["properties"]),
    managedBy: item["managedBy"],
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Properties belonging to conditional credits. */
export interface ConditionalCreditProperties {
  /** Type of conditional credit entity */
  /** The discriminator possible values: Contributor, Primary */
  entityType: ConditionalCreditEntityType;
  /** Display name for the conditional credit */
  displayName?: string;
  /** The billing account resource ID */
  billingAccountResourceId?: string;
  /** The provisioning state of the resource */
  readonly provisioningState?: ConditionalCreditsProvisioningState;
  /** The status of the conditional credit */
  status?: ConditionalCreditStatus;
  /** Start date of the conditional credit */
  startAt?: Date;
  /** End date of the conditional credit (derived from last milestone) */
  endAt?: Date;
  /** Product code for the conditional credit */
  productCode?: string;
  /** Fully-qualified identifier of the benefit under applicable benefit list. */
  readonly benefitResourceId?: string;
  /** Fully-qualified resource identifier of the resource. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/{benefitType}/{benefitName}. */
  resourceId?: string;
}

export function conditionalCreditPropertiesSerializer(item: ConditionalCreditProperties): any {
  return {
    entityType: item["entityType"],
    displayName: item["displayName"],
    billingAccountResourceId: item["billingAccountResourceId"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    productCode: item["productCode"],
    resourceId: item["resourceId"],
  };
}

export function conditionalCreditPropertiesDeserializer(item: any): ConditionalCreditProperties {
  return {
    entityType: item["entityType"],
    displayName: item["displayName"],
    billingAccountResourceId: item["billingAccountResourceId"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    productCode: item["productCode"],
    benefitResourceId: item["benefitResourceId"],
    resourceId: item["resourceId"],
  };
}

/** Alias for ConditionalCreditPropertiesUnion */
export type ConditionalCreditPropertiesUnion =
  | ContributorConditionalCreditProperties
  | PrimaryConditionalCreditProperties
  | ConditionalCreditProperties;

export function conditionalCreditPropertiesUnionSerializer(
  item: ConditionalCreditPropertiesUnion,
): any {
  switch (item.entityType) {
    case "Contributor":
      return contributorConditionalCreditPropertiesSerializer(
        item as ContributorConditionalCreditProperties,
      );

    case "Primary":
      return primaryConditionalCreditPropertiesSerializer(
        item as PrimaryConditionalCreditProperties,
      );

    default:
      return conditionalCreditPropertiesSerializer(item);
  }
}

export function conditionalCreditPropertiesUnionDeserializer(
  item: any,
): ConditionalCreditPropertiesUnion {
  switch (item["entityType"]) {
    case "Contributor":
      return contributorConditionalCreditPropertiesDeserializer(
        item as ContributorConditionalCreditProperties,
      );

    case "Primary":
      return primaryConditionalCreditPropertiesDeserializer(
        item as PrimaryConditionalCreditProperties,
      );

    default:
      return conditionalCreditPropertiesDeserializer(item);
  }
}

/** Type of conditional credit entity */
export enum KnownConditionalCreditEntityType {
  /** Primary */
  Primary = "Primary",
  /** Contributor */
  Contributor = "Contributor",
}

/**
 * Type of conditional credit entity \
 * {@link KnownConditionalCreditEntityType} can be used interchangeably with ConditionalCreditEntityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Contributor**
 */
export type ConditionalCreditEntityType = string;

/** The provisioning state of the resource */
export enum KnownConditionalCreditsProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Pending */
  Pending = "Pending",
}

/**
 * The provisioning state of the resource \
 * {@link KnownConditionalCreditsProvisioningState} can be used interchangeably with ConditionalCreditsProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Pending**
 */
export type ConditionalCreditsProvisioningState = string;

/** The status of the conditional credit */
export enum KnownConditionalCreditStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** Active */
  Active = "Active",
  /** Pending */
  Pending = "Pending",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Completed */
  Completed = "Completed",
  /** Stopped */
  Stopped = "Stopped",
  /** PendingSettlement */
  PendingSettlement = "PendingSettlement",
}

/**
 * The status of the conditional credit \
 * {@link KnownConditionalCreditStatus} can be used interchangeably with ConditionalCreditStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Scheduled** \
 * **Active** \
 * **Pending** \
 * **Failed** \
 * **Canceled** \
 * **Completed** \
 * **Stopped** \
 * **PendingSettlement**
 */
export type ConditionalCreditStatus = string;

/** Properties for contributor conditional credit. */
export interface ContributorConditionalCreditProperties extends ConditionalCreditProperties {
  /** Resource ID of the primary conditional credit (required for contributors) */
  primaryResourceId?: string;
  /** System identifier shared between primary and contributor conditional credits representing the same conditional credit program */
  systemId?: string;
  /** Product code for the contributor conditional credit */
  productCode?: string;
  /** Start date for the contributor conditional credit */
  startAt?: Date;
  /** List of milestones copied from primary conditional credit (excludes award details) */
  readonly milestones?: ContributorConditionalCreditMilestone[];
  /** Fully-qualified billing account resource identifier of the primary CACO. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
  /** Type of conditional credit entity */
  entityType: "Contributor";
}

export function contributorConditionalCreditPropertiesSerializer(
  item: ContributorConditionalCreditProperties,
): any {
  return {
    entityType: item["entityType"],
    displayName: item["displayName"],
    billingAccountResourceId: item["billingAccountResourceId"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    productCode: item["productCode"],
    resourceId: item["resourceId"],
    primaryResourceId: item["primaryResourceId"],
    systemId: item["systemId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function contributorConditionalCreditPropertiesDeserializer(
  item: any,
): ContributorConditionalCreditProperties {
  return {
    entityType: item["entityType"],
    displayName: item["displayName"],
    billingAccountResourceId: item["billingAccountResourceId"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    productCode: item["productCode"],
    benefitResourceId: item["benefitResourceId"],
    resourceId: item["resourceId"],
    primaryResourceId: item["primaryResourceId"],
    systemId: item["systemId"],
    milestones: !item["milestones"]
      ? item["milestones"]
      : contributorConditionalCreditMilestoneArrayDeserializer(item["milestones"]),
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function contributorConditionalCreditMilestoneArrayDeserializer(
  result: Array<ContributorConditionalCreditMilestone>,
): any[] {
  return result.map((item) => {
    return contributorConditionalCreditMilestoneDeserializer(item);
  });
}

/** Milestone definition for contributor conditional credit (excludes award details) */
export interface ContributorConditionalCreditMilestone extends ConditionalCreditMilestoneBase {}

export function contributorConditionalCreditMilestoneDeserializer(
  item: any,
): ContributorConditionalCreditMilestone {
  return {
    milestoneId: item["milestoneId"],
    name: item["name"],
    status: item["status"],
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    spendTarget: !item["spendTarget"]
      ? item["spendTarget"]
      : priceDeserializer(item["spendTarget"]),
    award: !item["award"] ? item["award"] : awardDeserializer(item["award"]),
  };
}

/** Properties for primary conditional credit. */
export interface PrimaryConditionalCreditProperties extends ConditionalCreditProperties {
  /** System identifier shared between primary and contributor conditional credits representing the same conditional credit program */
  systemId?: string;
  /** Whether this conditional credit allows contributor billing accounts */
  allowContributors?: EnablementMode;
  /** List of milestones for this conditional credit (must include awards) */
  milestones?: ConditionalCreditMilestone[];
  /** Type of conditional credit entity */
  entityType: "Primary";
}

export function primaryConditionalCreditPropertiesSerializer(
  item: PrimaryConditionalCreditProperties,
): any {
  return {
    entityType: item["entityType"],
    displayName: item["displayName"],
    billingAccountResourceId: item["billingAccountResourceId"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    productCode: item["productCode"],
    resourceId: item["resourceId"],
    systemId: item["systemId"],
    allowContributors: item["allowContributors"],
    milestones: !item["milestones"]
      ? item["milestones"]
      : conditionalCreditMilestoneArraySerializer(item["milestones"]),
  };
}

export function primaryConditionalCreditPropertiesDeserializer(
  item: any,
): PrimaryConditionalCreditProperties {
  return {
    entityType: item["entityType"],
    displayName: item["displayName"],
    billingAccountResourceId: item["billingAccountResourceId"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    productCode: item["productCode"],
    benefitResourceId: item["benefitResourceId"],
    resourceId: item["resourceId"],
    systemId: item["systemId"],
    allowContributors: item["allowContributors"],
    milestones: !item["milestones"]
      ? item["milestones"]
      : conditionalCreditMilestoneArrayDeserializer(item["milestones"]),
  };
}

export function conditionalCreditMilestoneArraySerializer(
  result: Array<ConditionalCreditMilestone>,
): any[] {
  return result.map((item) => {
    return conditionalCreditMilestoneSerializer(item);
  });
}

export function conditionalCreditMilestoneArrayDeserializer(
  result: Array<ConditionalCreditMilestone>,
): any[] {
  return result.map((item) => {
    return conditionalCreditMilestoneDeserializer(item);
  });
}

/** Milestone definition within a conditional credit */
export interface ConditionalCreditMilestone extends ConditionalCreditMilestoneBase {
  /** Award details for this milestone */
  award?: Award;
}

export function conditionalCreditMilestoneSerializer(item: ConditionalCreditMilestone): any {
  return {
    milestoneId: item["milestoneId"],
    name: item["name"],
    status: item["status"],
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    spendTarget: !item["spendTarget"] ? item["spendTarget"] : priceSerializer(item["spendTarget"]),
    award: !item["award"] ? item["award"] : awardSerializer(item["award"]),
  };
}

export function conditionalCreditMilestoneDeserializer(item: any): ConditionalCreditMilestone {
  return {
    milestoneId: item["milestoneId"],
    name: item["name"],
    status: item["status"],
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    spendTarget: !item["spendTarget"]
      ? item["spendTarget"]
      : priceDeserializer(item["spendTarget"]),
    award: !item["award"] ? item["award"] : awardDeserializer(item["award"]),
  };
}

/** Award details for milestone completion */
export interface Award {
  /** Credit amount to be awarded */
  credit?: Commitment;
  /** Start date when the credit becomes effective */
  startAt?: Date;
  /** End date when the credit expires */
  endAt?: Date;
  /** Resource ID for the awarded credit. */
  readonly resourceId?: string;
  /** This is the globally unique identifier of the credit which will not change for its lifetime. */
  readonly systemId?: string;
  /** Points to BalanceVersion document that indicates the remaining commitment balance when the credit was created. */
  readonly balanceVersion?: number;
  /** Duration for which the benefit is active. Will be in format P{int}M or P{int}Y. Any values representing up to 12 years are valid. Upper limit examples: P144M, P12Y. */
  duration?: Term;
}

export function awardSerializer(item: Award): any {
  return {
    credit: !item["credit"] ? item["credit"] : commitmentSerializer(item["credit"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    duration: item["duration"],
  };
}

export function awardDeserializer(item: any): Award {
  return {
    credit: !item["credit"] ? item["credit"] : commitmentDeserializer(item["credit"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    resourceId: item["resourceId"],
    systemId: item["systemId"],
    balanceVersion: item["balanceVersion"],
    duration: item["duration"],
  };
}

/** Represent benefit term in ISO 8601 format. */
export enum KnownTerm {
  /** P1M */
  P1M = "P1M",
  /** P1Y */
  P1Y = "P1Y",
  /** P3Y */
  P3Y = "P3Y",
  /** P5Y */
  P5Y = "P5Y",
}

/**
 * Represent benefit term in ISO 8601 format. \
 * {@link KnownTerm} can be used interchangeably with Term,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1M** \
 * **P1Y** \
 * **P3Y** \
 * **P5Y**
 */
export type Term = string;

/** Base milestone definition for conditional credits */
export interface ConditionalCreditMilestoneBase {
  /** Unique identifier for the milestone */
  milestoneId?: string;
  /** Display name for the milestone */
  name?: string;
  /** Current status of the milestone */
  status?: MilestoneStatus;
  /** End date for this milestone */
  endAt?: Date;
  /** Spend target for this milestone */
  spendTarget?: Price;
  /** Award details for this milestone (only present for primary conditional credits) */
  award?: Award;
}

export function conditionalCreditMilestoneBaseSerializer(
  item: ConditionalCreditMilestoneBase,
): any {
  return {
    milestoneId: item["milestoneId"],
    name: item["name"],
    status: item["status"],
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    spendTarget: !item["spendTarget"] ? item["spendTarget"] : priceSerializer(item["spendTarget"]),
    award: !item["award"] ? item["award"] : awardSerializer(item["award"]),
  };
}

export function conditionalCreditMilestoneBaseDeserializer(
  item: any,
): ConditionalCreditMilestoneBase {
  return {
    milestoneId: item["milestoneId"],
    name: item["name"],
    status: item["status"],
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    spendTarget: !item["spendTarget"]
      ? item["spendTarget"]
      : priceDeserializer(item["spendTarget"]),
    award: !item["award"] ? item["award"] : awardDeserializer(item["award"]),
  };
}

/** Current status of the milestone */
export enum KnownMilestoneStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** Active */
  Active = "Active",
  /** Pending */
  Pending = "Pending",
  /** Failed */
  Failed = "Failed",
  /** Completed */
  Completed = "Completed",
  /** Canceled */
  Canceled = "Canceled",
  /** Removed */
  Removed = "Removed",
  /** PendingSettlement */
  PendingSettlement = "PendingSettlement",
  /** Missed */
  Missed = "Missed",
}

/**
 * Current status of the milestone \
 * {@link KnownMilestoneStatus} can be used interchangeably with MilestoneStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Scheduled** \
 * **Active** \
 * **Pending** \
 * **Failed** \
 * **Completed** \
 * **Canceled** \
 * **Removed** \
 * **PendingSettlement** \
 * **Missed**
 */
export type MilestoneStatus = string;

/** Conditional credit patch request */
export interface ConditionalCreditPatchRequest {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Display name for the conditional credit */
  displayName?: string;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Whether this conditional credit allows contributor billing accounts */
  allowContributors?: EnablementMode;
  /** Updated milestones list (only applicable for primary conditional credits) */
  milestones?: ConditionalCreditMilestone[];
}

export function conditionalCreditPatchRequestSerializer(item: ConditionalCreditPatchRequest): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "endAt",
      "allowContributors",
      "milestones",
    ])
      ? undefined
      : _conditionalCreditPatchRequestPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Conditional credit patch request properties */
export interface ConditionalCreditPatchRequestProperties {
  /** Display name for the conditional credit */
  displayName?: string;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Whether this conditional credit allows contributor billing accounts */
  allowContributors?: EnablementMode;
  /** Updated milestones list (only applicable for primary conditional credits) */
  milestones?: ConditionalCreditMilestone[];
}

export function conditionalCreditPatchRequestPropertiesSerializer(
  item: ConditionalCreditPatchRequestProperties,
): any {
  return {
    displayName: item["displayName"],
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    allowContributors: item["allowContributors"],
    milestones: !item["milestones"]
      ? item["milestones"]
      : conditionalCreditMilestoneArraySerializer(item["milestones"]),
  };
}

/** List of applicable conditional credits */
export interface _ConditionalCreditList {
  /** The ConditionalCredit items on this page */
  value: ConditionalCredit[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _conditionalCreditListDeserializer(item: any): _ConditionalCreditList {
  return {
    value: conditionalCreditArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function conditionalCreditArraySerializer(result: Array<ConditionalCredit>): any[] {
  return result.map((item) => {
    return conditionalCreditSerializer(item);
  });
}

export function conditionalCreditArrayDeserializer(result: Array<ConditionalCredit>): any[] {
  return result.map((item) => {
    return conditionalCreditDeserializer(item);
  });
}

/** Conditional credit contributor */
export interface ConditionalCreditContributor extends ProxyResource {
  /** Type of conditional credit entity */
  entityType?: "Contributor";
  /** Display name for the conditional credit */
  displayName?: string;
  /** The billing account resource ID */
  billingAccountResourceId?: string;
  /** The provisioning state of the resource */
  readonly provisioningState?: ConditionalCreditsProvisioningState;
  /** The status of the conditional credit */
  status?: ConditionalCreditStatus;
  /** Start date for the contributor conditional credit */
  startAt?: Date;
  /** End date of the conditional credit (derived from last milestone) */
  endAt?: Date;
  /** Product code for the contributor conditional credit */
  productCode?: string;
  /** Fully-qualified identifier of the benefit under applicable benefit list. */
  readonly benefitResourceId?: string;
  /** Fully-qualified resource identifier of the resource. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/{benefitType}/{benefitName}. */
  resourceId?: string;
  /** Resource ID of the primary conditional credit (required for contributors) */
  primaryResourceId?: string;
  /** System identifier shared between primary and contributor conditional credits representing the same conditional credit program */
  systemId?: string;
  /** List of milestones copied from primary conditional credit (excludes award details) */
  readonly milestones?: ContributorConditionalCreditMilestone[];
  /** Fully-qualified billing account resource identifier of the primary CACO. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
}

export function conditionalCreditContributorDeserializer(item: any): ConditionalCreditContributor {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _conditionalCreditContributorPropertiesDeserializer(item["properties"])),
  };
}

/** Conditional credit contributor list */
export interface _ConditionalCreditContributorList {
  /** The ConditionalCreditContributor items on this page */
  value: ConditionalCreditContributor[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _conditionalCreditContributorListDeserializer(
  item: any,
): _ConditionalCreditContributorList {
  return {
    value: conditionalCreditContributorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function conditionalCreditContributorArrayDeserializer(
  result: Array<ConditionalCreditContributor>,
): any[] {
  return result.map((item) => {
    return conditionalCreditContributorDeserializer(item);
  });
}

/** Microsoft Azure Consumption Commitment. */
export interface Macc extends TrackedResource {
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: string;
  /** The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly etag?: string;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Plan for the resource. */
  plan?: Plan;
  /** Provisioning state of MACC as assigned by RPaaS. This indicates the last operation's status. For all practical purposes, this can be ignored. For current status of MACC resource, refer to MaccStatus. */
  readonly provisioningState?: string;
  /** Represents the current status of the MACC. */
  status?: MaccStatus;
  /** Represents type of the object being operated on. Possible values are primary or contributor. */
  entityType?: MaccEntityType;
  /** Display name */
  displayName?: string;
  /** Represents catalog UPN. */
  productCode?: string;
  /** Fully-qualified identifier of the billing account where the MACC is applied. Present only for Enterprise Agreement customers. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId} */
  billingAccountResourceId?: string;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Must be start of month. Timestamp must be in the ISO date format YYYY-MM-DDT00:00:00Z. */
  startAt?: Date;
  /** Must be end of month. Timestamp must be in the ISO date format YYYY-MM-DDT23:59:59Z. */
  endAt?: Date;
  /** This is the globally unique identifier of the MACC which will not change for the lifetime of the MACC. */
  systemId?: string;
  /** Setting this to 'Enable' enables automatic shortfall charging when commitment is not met. */
  automaticShortfall?: EnablementMode;
  /** Optional field to record suppression reason for automatic shortfall. */
  automaticShortfallSuppressReason?: AutomaticShortfallSuppressReason;
  /** MACC shortfall */
  shortfall?: Shortfall;
  /** List of milestones associated with this MACC. */
  milestones?: MaccMilestone[];
  /** This is the resource identifier of either the primary MACC or the contributor. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  resourceId?: string;
  /** Setting this to true means multi-entity. */
  allowContributors?: boolean;
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
  /** Fully-qualified billing account resource identifier of the primary MACC. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
}

export function maccSerializer(item: Macc): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "status",
      "entityType",
      "displayName",
      "productCode",
      "billingAccountResourceId",
      "commitment",
      "startAt",
      "endAt",
      "systemId",
      "automaticShortfall",
      "automaticShortfallSuppressReason",
      "shortfall",
      "milestones",
      "resourceId",
      "allowContributors",
      "primaryResourceId",
      "primaryBillingAccountResourceId",
    ])
      ? undefined
      : _maccPropertiesSerializer(item),
    managedBy: item["managedBy"],
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function maccDeserializer(item: any): Macc {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _maccPropertiesDeserializer(item["properties"])),
    managedBy: item["managedBy"],
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Macc patch request */
export interface MaccPatchRequest {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Setting this to true means multi-entity. */
  allowContributors?: boolean;
  /** Represents the enablement status of a feature or settings. */
  automaticShortfall?: EnablementMode;
  /** Optional field to record suppression reason for automatic shortfall. */
  automaticShortfallSuppressReason?: AutomaticShortfallSuppressReason;
  /** Display name */
  displayName?: string;
  /** Represents the current status of the Milestone. */
  status?: MaccMilestoneStatus;
  /** List of milestones to update or add. */
  milestones?: MaccMilestone[];
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
  /** Fully-qualified billing account resource identifier of the primary MACC. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
}

export function maccPatchRequestSerializer(item: MaccPatchRequest): any {
  return {
    properties: areAllPropsUndefined(item, [
      "commitment",
      "endAt",
      "allowContributors",
      "automaticShortfall",
      "automaticShortfallSuppressReason",
      "displayName",
      "status",
      "milestones",
      "primaryResourceId",
      "primaryBillingAccountResourceId",
    ])
      ? undefined
      : _maccPatchRequestPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Macc patch request properties */
export interface MaccPatchRequestProperties {
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Setting this to true means multi-entity. */
  allowContributors?: boolean;
  /** Represents the enablement status of a feature or settings. */
  automaticShortfall?: EnablementMode;
  /** Optional field to record suppression reason for automatic shortfall. */
  automaticShortfallSuppressReason?: AutomaticShortfallSuppressReason;
  /** Display name */
  displayName?: string;
  /** Represents the current status of the Milestone. */
  status?: MaccMilestoneStatus;
  /** List of milestones to update or add. */
  milestones?: MaccMilestone[];
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
  /** Fully-qualified billing account resource identifier of the primary MACC. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
}

export function maccPatchRequestPropertiesSerializer(item: MaccPatchRequestProperties): any {
  return {
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    allowContributors: item["allowContributors"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonSerializer(item["automaticShortfallSuppressReason"]),
    displayName: item["displayName"],
    status: item["status"],
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArraySerializer(item["milestones"]),
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

/** MACC list */
export interface _MaccList {
  /** The Macc items on this page */
  value: Macc[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _maccListDeserializer(item: any): _MaccList {
  return {
    value: maccArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function maccArraySerializer(result: Array<Macc>): any[] {
  return result.map((item) => {
    return maccSerializer(item);
  });
}

export function maccArrayDeserializer(result: Array<Macc>): any[] {
  return result.map((item) => {
    return maccDeserializer(item);
  });
}

/** Charge shortfall request */
export interface ChargeShortfallRequest {
  /** Represents catalog UPN. */
  productCode?: string;
  /** Shortfall amount with grain. */
  charge?: Commitment;
  /** Start DateTime. */
  startAt?: Date;
  /** End DateTime in UTC. */
  endAt?: Date;
  /** Fully-qualified resource identifier of the credits associated with the shortfall. */
  resourceId?: string;
  /** Points to BalanceVersion document that indicates the remaining commitment balance when the credit was created. */
  balanceVersion?: number;
  /** This is an identifier of the shortfall which will not change for its lifetime. */
  systemId?: string;
}

export function chargeShortfallRequestSerializer(item: ChargeShortfallRequest): any {
  return {
    properties: areAllPropsUndefined(item, [
      "productCode",
      "charge",
      "startAt",
      "endAt",
      "resourceId",
      "balanceVersion",
      "systemId",
    ])
      ? undefined
      : _chargeShortfallRequestPropertiesSerializer(item),
  };
}

/** Savings plan order alias */
export interface SavingsPlanOrderAliasModel extends ProxyResource {
  /** Savings plan SKU */
  sku: ResourceSku;
  /** Resource provider kind */
  kind?: string;
  /** Display name */
  displayName?: string;
  /** Identifier of the savings plan created */
  readonly savingsPlanOrderId?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
}

export function savingsPlanOrderAliasModelSerializer(item: SavingsPlanOrderAliasModel): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "billingScopeId",
      "term",
      "billingPlan",
      "appliedScopeType",
      "appliedScopeProperties",
      "commitment",
      "renew",
    ])
      ? undefined
      : _savingsPlanOrderAliasModelPropertiesSerializer(item),
    sku: resourceSkuSerializer(item["sku"]),
    kind: item["kind"],
  };
}

export function savingsPlanOrderAliasModelDeserializer(item: any): SavingsPlanOrderAliasModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _savingsPlanOrderAliasModelPropertiesDeserializer(item["properties"])),
    sku: resourceSkuDeserializer(item["sku"]),
    kind: item["kind"],
  };
}

/** Savings plan properties */
export interface SavingsPlanOrderAliasProperties {
  /** Display name */
  displayName?: string;
  /** Identifier of the savings plan created */
  readonly savingsPlanOrderId?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
}

export function savingsPlanOrderAliasPropertiesSerializer(
  item: SavingsPlanOrderAliasProperties,
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
    renew: item["renew"],
  };
}

export function savingsPlanOrderAliasPropertiesDeserializer(
  item: any,
): SavingsPlanOrderAliasProperties {
  return {
    displayName: item["displayName"],
    savingsPlanOrderId: item["savingsPlanOrderId"],
    provisioningState: item["provisioningState"],
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
    renew: item["renew"],
  };
}

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
 * **P1M**
 */
export type BillingPlan = string;

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
 * **Single** \
 * **Shared** \
 * **ManagementGroup**
 */
export type AppliedScopeType = string;

/** Properties specific to applied scope type. Not required if not applicable. */
export interface AppliedScopeProperties {
  /** Tenant ID where the benefit is applied. */
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

/** model interface ResourceSku */
export interface ResourceSku {
  name?: string;
}

export function resourceSkuSerializer(item: ResourceSku): any {
  return { name: item["name"] };
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    name: item["name"],
  };
}

/** Savings plan order */
export interface SavingsPlanOrderModel extends ProxyResource {
  /** Savings plan SKU */
  sku: ResourceSku;
  /** Display name */
  displayName?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Fully-qualified identifier of the billing profile where the benefit is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. */
  readonly customerId?: string;
  /** Fully-qualified identifier of the billing account where the benefit is applied. Present only for Enterprise Agreement customers. */
  readonly billingAccountId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Expiry date time */
  readonly expiryDateTime?: Date;
  /** This is the DateTime when the savings plan benefit started. */
  benefitStartTime?: Date;
  /** Information describing the type of billing plan for this savings plan. */
  planInformation?: BillingPlanInformation;
  savingsPlans?: string[];
  readonly extendedStatusInfo?: ExtendedStatusInfo;
}

export function savingsPlanOrderModelDeserializer(item: any): SavingsPlanOrderModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _savingsPlanOrderModelPropertiesDeserializer(item["properties"])),
    sku: resourceSkuDeserializer(item["sku"]),
  };
}

/** Savings plan order properties */
export interface SavingsPlanOrderModelProperties {
  /** Display name */
  displayName?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Fully-qualified identifier of the billing profile where the benefit is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. */
  readonly customerId?: string;
  /** Fully-qualified identifier of the billing account where the benefit is applied. Present only for Enterprise Agreement customers. */
  readonly billingAccountId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Expiry date time */
  readonly expiryDateTime?: Date;
  /** This is the DateTime when the savings plan benefit started. */
  benefitStartTime?: Date;
  /** Information describing the type of billing plan for this savings plan. */
  planInformation?: BillingPlanInformation;
  savingsPlans?: string[];
  readonly extendedStatusInfo?: ExtendedStatusInfo;
}

export function savingsPlanOrderModelPropertiesDeserializer(
  item: any,
): SavingsPlanOrderModelProperties {
  return {
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    billingScopeId: item["billingScopeId"],
    billingProfileId: item["billingProfileId"],
    customerId: item["customerId"],
    billingAccountId: item["billingAccountId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    planInformation: !item["planInformation"]
      ? item["planInformation"]
      : billingPlanInformationDeserializer(item["planInformation"]),
    savingsPlans: !item["savingsPlans"]
      ? item["savingsPlans"]
      : item["savingsPlans"].map((p: any) => {
          return p;
        }),
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
  };
}

/** Information describing the type of billing plan for this savings plan. */
export interface BillingPlanInformation {
  /** Amount of money to be paid for the Order. Tax is not included. */
  pricingCurrencyTotal?: Price;
  /** Date when the billing plan has started. */
  startDate?: Date;
  /** For recurring billing plans, indicates the date when next payment will be processed. Null when total is paid off. */
  nextPaymentDueDate?: Date;
  transactions?: PaymentDetail[];
}

export function billingPlanInformationDeserializer(item: any): BillingPlanInformation {
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

/** Information about payment related to a savings plan order. */
export interface PaymentDetail {
  /** Date when the payment needs to be done. */
  dueDate?: Date;
  /** Date when the transaction is completed. Is null when it is scheduled. */
  paymentDate?: Date;
  /** Amount in pricing currency. Tax not included. */
  pricingCurrencyTotal?: Price;
  /** Amount charged in Billing currency. Tax not included. Is null for future payments */
  billingCurrencyTotal?: Price;
  /** Describes whether the payment is completed, failed, cancelled or scheduled in the future. */
  status?: PaymentStatus;
  readonly extendedStatusInfo?: ExtendedStatusInfo;
  /** Billing account */
  billingAccount?: string;
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
    status: item["status"],
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
    billingAccount: item["billingAccount"],
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
 * **Succeeded** \
 * **Failed** \
 * **Scheduled** \
 * **Cancelled**
 */
export type PaymentStatus = string;

/** model interface ExtendedStatusInfo */
export interface ExtendedStatusInfo {
  /** Status code providing additional information. */
  statusCode?: string;
  /** The message giving detailed information about the status code. */
  message?: string;
}

export function extendedStatusInfoDeserializer(item: any): ExtendedStatusInfo {
  return {
    statusCode: item["statusCode"],
    message: item["message"],
  };
}

/** Paged collection of SavingsPlanOrderModel items */
export interface _SavingsPlanOrderModelList {
  /** The SavingsPlanOrderModel items on this page */
  value: SavingsPlanOrderModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _savingsPlanOrderModelListDeserializer(item: any): _SavingsPlanOrderModelList {
  return {
    value: savingsPlanOrderModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function savingsPlanOrderModelArrayDeserializer(
  result: Array<SavingsPlanOrderModel>,
): any[] {
  return result.map((item) => {
    return savingsPlanOrderModelDeserializer(item);
  });
}

/** Role assignment entity */
export interface RoleAssignmentEntity {
  /** Role assignment entity id */
  id?: string;
  /** Role assignment entity name */
  name?: string;
  /** Principal Id */
  principalId?: string;
  /** Role definition id */
  roleDefinitionId?: string;
  /** Scope of the role assignment entity */
  scope?: string;
}

export function roleAssignmentEntityDeserializer(item: any): RoleAssignmentEntity {
  return {
    id: item["id"],
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _roleAssignmentEntityPropertiesDeserializer(item["properties"])),
  };
}

/** Role assignment entity properties */
export interface RoleAssignmentEntityProperties {
  /** Principal Id */
  principalId?: string;
  /** Role definition id */
  roleDefinitionId?: string;
  /** Scope of the role assignment entity */
  scope?: string;
}

export function roleAssignmentEntityPropertiesDeserializer(
  item: any,
): RoleAssignmentEntityProperties {
  return {
    principalId: item["principalId"],
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
  };
}

/** Savings plan */
export interface SavingsPlanModel extends ProxyResource {
  /** Savings plan SKU */
  sku: ResourceSku;
  /** Display name */
  displayName?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** The provisioning state of the savings plan for display, e.g. Succeeded */
  readonly displayProvisioningState?: string;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Fully-qualified identifier of the billing profile where the benefit is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. */
  readonly customerId?: string;
  /** Fully-qualified identifier of the billing account where the benefit is applied. Present only for Enterprise Agreement customers. */
  readonly billingAccountId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** The applied scope type of the savings plan for display, e.g. Shared */
  readonly userFriendlyAppliedScopeType?: string;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** DateTime of the savings plan starts providing benefit from. */
  readonly effectiveDateTime?: Date;
  /** Expiry date time */
  readonly expiryDateTime?: Date;
  /** Date time when the savings plan was purchased */
  readonly purchaseDateTime?: Date;
  /** This is the DateTime when the savings plan benefit started. */
  benefitStartTime?: Date;
  readonly extendedStatusInfo?: ExtendedStatusInfo;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** Savings plan utilization */
  readonly utilization?: Utilization;
  /** SavingsPlan Id of the SavingsPlan from which this SavingsPlan is renewed. */
  renewSource?: string;
  /** SavingsPlan Id of the SavingsPlan which is purchased because of renew. */
  renewDestination?: string;
  renewProperties?: RenewProperties;
}

export function savingsPlanModelDeserializer(item: any): SavingsPlanModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _savingsPlanModelPropertiesDeserializer(item["properties"])),
    sku: resourceSkuDeserializer(item["sku"]),
  };
}

/** Savings plan properties */
export interface SavingsPlanModelProperties {
  /** Display name */
  displayName?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** The provisioning state of the savings plan for display, e.g. Succeeded */
  readonly displayProvisioningState?: string;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Fully-qualified identifier of the billing profile where the benefit is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. */
  readonly customerId?: string;
  /** Fully-qualified identifier of the billing account where the benefit is applied. Present only for Enterprise Agreement customers. */
  readonly billingAccountId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** The applied scope type of the savings plan for display, e.g. Shared */
  readonly userFriendlyAppliedScopeType?: string;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** DateTime of the savings plan starts providing benefit from. */
  readonly effectiveDateTime?: Date;
  /** Expiry date time */
  readonly expiryDateTime?: Date;
  /** Date time when the savings plan was purchased */
  readonly purchaseDateTime?: Date;
  /** This is the DateTime when the savings plan benefit started. */
  benefitStartTime?: Date;
  readonly extendedStatusInfo?: ExtendedStatusInfo;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** Savings plan utilization */
  readonly utilization?: Utilization;
  /** SavingsPlan Id of the SavingsPlan from which this SavingsPlan is renewed. */
  renewSource?: string;
  /** SavingsPlan Id of the SavingsPlan which is purchased because of renew. */
  renewDestination?: string;
  renewProperties?: RenewProperties;
}

export function savingsPlanModelPropertiesDeserializer(item: any): SavingsPlanModelProperties {
  return {
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    displayProvisioningState: item["displayProvisioningState"],
    billingScopeId: item["billingScopeId"],
    billingProfileId: item["billingProfileId"],
    customerId: item["customerId"],
    billingAccountId: item["billingAccountId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    userFriendlyAppliedScopeType: item["userFriendlyAppliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    effectiveDateTime: !item["effectiveDateTime"]
      ? item["effectiveDateTime"]
      : new Date(item["effectiveDateTime"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    purchaseDateTime: !item["purchaseDateTime"]
      ? item["purchaseDateTime"]
      : new Date(item["purchaseDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
    renew: item["renew"],
    utilization: !item["utilization"]
      ? item["utilization"]
      : utilizationDeserializer(item["utilization"]),
    renewSource: item["renewSource"],
    renewDestination: item["renewDestination"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : renewPropertiesDeserializer(item["renewProperties"]),
  };
}

/** Savings plan utilization */
export interface Utilization {
  /** The number of days trend for a savings plan */
  readonly trend?: string;
  /** The array of aggregates of a savings plan's utilization */
  aggregates?: UtilizationAggregates[];
}

export function utilizationDeserializer(item: any): Utilization {
  return {
    trend: item["trend"],
    aggregates: !item["aggregates"]
      ? item["aggregates"]
      : utilizationAggregatesArrayDeserializer(item["aggregates"]),
  };
}

export function utilizationAggregatesArrayDeserializer(
  result: Array<UtilizationAggregates>,
): any[] {
  return result.map((item) => {
    return utilizationAggregatesDeserializer(item);
  });
}

/** The aggregate values of savings plan utilization */
export interface UtilizationAggregates {
  /** The grain of the aggregate */
  readonly grain?: number;
  /** The grain unit of the aggregate */
  readonly grainUnit?: string;
  /** The aggregate value */
  readonly value?: number;
  /** The aggregate value unit */
  readonly valueUnit?: string;
}

export function utilizationAggregatesDeserializer(item: any): UtilizationAggregates {
  return {
    grain: item["grain"],
    grainUnit: item["grainUnit"],
    value: item["value"],
    valueUnit: item["valueUnit"],
  };
}

/** model interface RenewProperties */
export interface RenewProperties {
  purchaseProperties?: PurchaseRequest;
}

export function renewPropertiesSerializer(item: RenewProperties): any {
  return {
    purchaseProperties: !item["purchaseProperties"]
      ? item["purchaseProperties"]
      : purchaseRequestSerializer(item["purchaseProperties"]),
  };
}

export function renewPropertiesDeserializer(item: any): RenewProperties {
  return {
    purchaseProperties: !item["purchaseProperties"]
      ? item["purchaseProperties"]
      : purchaseRequestDeserializer(item["purchaseProperties"]),
  };
}

/** model interface PurchaseRequest */
export interface PurchaseRequest {
  /** The SKU to be applied for this resource */
  sku?: ResourceSku;
  /** Friendly name of the savings plan */
  displayName?: string;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** DateTime of the savings plan starts providing benefit from. */
  readonly effectiveDateTime?: Date;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
}

export function purchaseRequestSerializer(item: PurchaseRequest): any {
  return {
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    properties: areAllPropsUndefined(item, [
      "displayName",
      "billingScopeId",
      "term",
      "billingPlan",
      "appliedScopeType",
      "commitment",
      "renew",
      "appliedScopeProperties",
    ])
      ? undefined
      : _purchaseRequestPropertiesSerializer(item),
  };
}

export function purchaseRequestDeserializer(item: any): PurchaseRequest {
  return {
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    ...(!item["properties"]
      ? item["properties"]
      : _purchaseRequestPropertiesDeserializer(item["properties"])),
  };
}

/** model interface PurchaseRequestProperties */
export interface PurchaseRequestProperties {
  /** Friendly name of the savings plan */
  displayName?: string;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** DateTime of the savings plan starts providing benefit from. */
  readonly effectiveDateTime?: Date;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
}

export function purchaseRequestPropertiesSerializer(item: PurchaseRequestProperties): any {
  return {
    displayName: item["displayName"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    renew: item["renew"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
  };
}

export function purchaseRequestPropertiesDeserializer(item: any): PurchaseRequestProperties {
  return {
    displayName: item["displayName"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    effectiveDateTime: !item["effectiveDateTime"]
      ? item["effectiveDateTime"]
      : new Date(item["effectiveDateTime"]),
    renew: item["renew"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
  };
}

/** Savings plan patch request */
export interface SavingsPlanUpdateRequest {
  /** Savings plan patch request */
  properties?: SavingsPlanUpdateRequestProperties;
}

export function savingsPlanUpdateRequestSerializer(item: SavingsPlanUpdateRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : savingsPlanUpdateRequestPropertiesSerializer(item["properties"]),
  };
}

/** Savings plan patch request */
export interface SavingsPlanUpdateRequestProperties {
  /** Display name */
  displayName?: string;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  renewProperties?: RenewProperties;
}

export function savingsPlanUpdateRequestPropertiesSerializer(
  item: SavingsPlanUpdateRequestProperties,
): any {
  return {
    displayName: item["displayName"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : renewPropertiesSerializer(item["renewProperties"]),
  };
}

/** Paged collection of SavingsPlanModel items */
export interface _SavingsPlanModelList {
  /** The SavingsPlanModel items on this page */
  value: SavingsPlanModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _savingsPlanModelListDeserializer(item: any): _SavingsPlanModelList {
  return {
    value: savingsPlanModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function savingsPlanModelArrayDeserializer(result: Array<SavingsPlanModel>): any[] {
  return result.map((item) => {
    return savingsPlanModelDeserializer(item);
  });
}

/** model interface SavingsPlanUpdateValidateRequest */
export interface SavingsPlanUpdateValidateRequest {
  benefits?: SavingsPlanUpdateRequestProperties[];
}

export function savingsPlanUpdateValidateRequestSerializer(
  item: SavingsPlanUpdateValidateRequest,
): any {
  return {
    benefits: !item["benefits"]
      ? item["benefits"]
      : savingsPlanUpdateRequestPropertiesArraySerializer(item["benefits"]),
  };
}

export function savingsPlanUpdateRequestPropertiesArraySerializer(
  result: Array<SavingsPlanUpdateRequestProperties>,
): any[] {
  return result.map((item) => {
    return savingsPlanUpdateRequestPropertiesSerializer(item);
  });
}

/** model interface SavingsPlanValidateResponse */
export interface SavingsPlanValidateResponse {
  benefits?: SavingsPlanValidResponseProperty[];
  /** Url to get the next page. */
  nextLink?: string;
}

export function savingsPlanValidateResponseDeserializer(item: any): SavingsPlanValidateResponse {
  return {
    benefits: !item["benefits"]
      ? item["benefits"]
      : savingsPlanValidResponsePropertyArrayDeserializer(item["benefits"]),
    nextLink: item["nextLink"],
  };
}

export function savingsPlanValidResponsePropertyArrayDeserializer(
  result: Array<SavingsPlanValidResponseProperty>,
): any[] {
  return result.map((item) => {
    return savingsPlanValidResponsePropertyDeserializer(item);
  });
}

/** Benefit scope response property */
export interface SavingsPlanValidResponseProperty {
  /** Indicates if the provided input was valid */
  valid?: boolean;
  /** Failure reason code if the provided input was invalid */
  reasonCode?: string;
  /** Failure reason if the provided input was invalid */
  reason?: string;
}

export function savingsPlanValidResponsePropertyDeserializer(
  item: any,
): SavingsPlanValidResponseProperty {
  return {
    valid: item["valid"],
    reasonCode: item["reasonCode"],
    reason: item["reason"],
  };
}

/** Represents the result of listing savings plan models */
export interface _SavingsPlanModelListResult {
  /** The list of savings plans. */
  readonly value?: SavingsPlanModel[];
  /** Url to get the next page. */
  readonly nextLink?: string;
  /** The roll out count summary of the savings plans */
  readonly additionalProperties?: SavingsPlanSummary[];
}

export function _savingsPlanModelListResultDeserializer(item: any): _SavingsPlanModelListResult {
  return {
    value: !item["value"] ? item["value"] : savingsPlanModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    additionalProperties: !item["additionalProperties"]
      ? item["additionalProperties"]
      : savingsPlanSummaryArrayDeserializer(item["additionalProperties"]),
  };
}

export function savingsPlanSummaryArrayDeserializer(result: Array<SavingsPlanSummary>): any[] {
  return result.map((item) => {
    return savingsPlanSummaryDeserializer(item);
  });
}

/** Savings plans list summary */
export interface SavingsPlanSummary {
  /** This property has value 'summary' */
  readonly name?: string;
  /** The roll up count summary of savings plans in each state */
  value?: SavingsPlanSummaryCount;
}

export function savingsPlanSummaryDeserializer(item: any): SavingsPlanSummary {
  return {
    name: item["name"],
    value: !item["value"] ? item["value"] : savingsPlanSummaryCountDeserializer(item["value"]),
  };
}

/** The roll up count summary of savings plans in each state */
export interface SavingsPlanSummaryCount {
  /** The number of savings plans in Succeeded state */
  readonly succeededCount?: number;
  /** The number of savings plans in Failed state */
  readonly failedCount?: number;
  /** The number of savings plans in Expiring state */
  readonly expiringCount?: number;
  /** The number of savings plans in Expired state */
  readonly expiredCount?: number;
  /** The number of savings plans in Pending state */
  readonly pendingCount?: number;
  /** The number of savings plans in Cancelled state */
  readonly cancelledCount?: number;
  /** The number of savings plans in Processing state */
  readonly processingCount?: number;
  /** The number of savings plans in No Benefit state */
  readonly noBenefitCount?: number;
  /** The number of savings plans in Warning state */
  readonly warningCount?: number;
}

export function savingsPlanSummaryCountDeserializer(item: any): SavingsPlanSummaryCount {
  return {
    succeededCount: item["succeededCount"],
    failedCount: item["failedCount"],
    expiringCount: item["expiringCount"],
    expiredCount: item["expiredCount"],
    pendingCount: item["pendingCount"],
    cancelledCount: item["cancelledCount"],
    processingCount: item["processingCount"],
    noBenefitCount: item["noBenefitCount"],
    warningCount: item["warningCount"],
  };
}

/** Reservation order alias */
export interface ReservationOrderAliasResponse extends ProxyResource {
  /** Reservation order SKU */
  sku: ResourceSku;
  /** The Azure Region where the reserved resource lives. */
  location?: string;
  /** Display name */
  displayName?: string;
  /** Identifier of the reservation order created */
  readonly reservationOrderId?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Total Quantity of the SKUs purchased in the Reservation. */
  quantity?: number;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** The type of the resource that is being reserved. */
  reservedResourceType?: ReservedResourceType;
  /** This is the date-time when the Reservation needs to be reviewed. */
  reviewDateTime?: Date;
  /** Properties specific to each reserved resource type. Not required if not applicable. */
  reservedResourceProperties?: ReservationOrderAliasResponsePropertiesReservedResourceProperties;
}

export function reservationOrderAliasResponseDeserializer(
  item: any,
): ReservationOrderAliasResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _reservationOrderAliasResponsePropertiesDeserializer(item["properties"])),
    sku: resourceSkuDeserializer(item["sku"]),
    location: item["location"],
  };
}

/** Reservation properties */
export interface ReservationOrderAliasResponseProperties {
  /** Display name */
  displayName?: string;
  /** Identifier of the reservation order created */
  readonly reservationOrderId?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Total Quantity of the SKUs purchased in the Reservation. */
  quantity?: number;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** The type of the resource that is being reserved. */
  reservedResourceType?: ReservedResourceType;
  /** This is the date-time when the Reservation needs to be reviewed. */
  reviewDateTime?: Date;
  /** Properties specific to each reserved resource type. Not required if not applicable. */
  reservedResourceProperties?: ReservationOrderAliasResponsePropertiesReservedResourceProperties;
}

export function reservationOrderAliasResponsePropertiesDeserializer(
  item: any,
): ReservationOrderAliasResponseProperties {
  return {
    displayName: item["displayName"],
    reservationOrderId: item["reservationOrderId"],
    provisioningState: item["provisioningState"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    quantity: item["quantity"],
    renew: item["renew"],
    reservedResourceType: item["reservedResourceType"],
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : reservationOrderAliasResponsePropertiesReservedResourcePropertiesDeserializer(
          item["reservedResourceProperties"],
        ),
  };
}

/** The type of the resource that is being reserved. */
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
 * The type of the resource that is being reserved. \
 * {@link KnownReservedResourceType} can be used interchangeably with ReservedResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VirtualMachines** \
 * **SqlDatabases** \
 * **SuseLinux** \
 * **CosmosDb** \
 * **RedHat** \
 * **SqlDataWarehouse** \
 * **VMwareCloudSimple** \
 * **RedHatOsa** \
 * **Databricks** \
 * **AppService** \
 * **ManagedDisk** \
 * **BlockBlob** \
 * **RedisCache** \
 * **AzureDataExplorer** \
 * **MySql** \
 * **MariaDb** \
 * **PostgreSql** \
 * **DedicatedHost** \
 * **SapHana** \
 * **SqlAzureHybridBenefit** \
 * **AVS** \
 * **DataFactory** \
 * **NetAppStorage** \
 * **AzureFiles** \
 * **SqlEdge** \
 * **VirtualMachineSoftware**
 */
export type ReservedResourceType = string;

/** Properties specific to each reserved resource type. Not required if not applicable. */
export interface ReservationOrderAliasResponsePropertiesReservedResourceProperties {
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. */
  instanceFlexibility?: InstanceFlexibility;
}

export function reservationOrderAliasResponsePropertiesReservedResourcePropertiesDeserializer(
  item: any,
): ReservationOrderAliasResponsePropertiesReservedResourceProperties {
  return {
    instanceFlexibility: item["instanceFlexibility"],
  };
}

/** Turning this on will apply the reservation discount to other VMs in the same VM size group. */
export enum KnownInstanceFlexibility {
  /** On */
  On = "On",
  /** Off */
  Off = "Off",
}

/**
 * Turning this on will apply the reservation discount to other VMs in the same VM size group. \
 * {@link KnownInstanceFlexibility} can be used interchangeably with InstanceFlexibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **On** \
 * **Off**
 */
export type InstanceFlexibility = string;

/** Reservation order alias */
export interface ReservationOrderAliasRequest extends Resource {
  /** Reservation order SKU */
  sku: ResourceSku;
  /** The Azure Region where the reservation benefits are applied to. */
  location?: string;
  /** Display name */
  displayName?: string;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Total Quantity of the SKUs purchased in the Reservation. */
  quantity?: number;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** The type of the resource that is being reserved. */
  reservedResourceType?: ReservedResourceType;
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** Properties specific to each reserved resource type. Not required if not applicable. */
  reservedResourceProperties?: ReservationOrderAliasRequestPropertiesReservedResourceProperties;
}

export function reservationOrderAliasRequestSerializer(item: ReservationOrderAliasRequest): any {
  return {
    sku: resourceSkuSerializer(item["sku"]),
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "displayName",
      "billingScopeId",
      "term",
      "billingPlan",
      "appliedScopeType",
      "appliedScopeProperties",
      "quantity",
      "renew",
      "reservedResourceType",
      "reviewDateTime",
      "reservedResourceProperties",
    ])
      ? undefined
      : _reservationOrderAliasRequestPropertiesSerializer(item),
  };
}

/** Reservation properties */
export interface ReservationOrderAliasRequestProperties {
  /** Display name */
  displayName?: string;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Total Quantity of the SKUs purchased in the Reservation. */
  quantity?: number;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** The type of the resource that is being reserved. */
  reservedResourceType?: ReservedResourceType;
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** Properties specific to each reserved resource type. Not required if not applicable. */
  reservedResourceProperties?: ReservationOrderAliasRequestPropertiesReservedResourceProperties;
}

export function reservationOrderAliasRequestPropertiesSerializer(
  item: ReservationOrderAliasRequestProperties,
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
    quantity: item["quantity"],
    renew: item["renew"],
    reservedResourceType: item["reservedResourceType"],
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : reservationOrderAliasRequestPropertiesReservedResourcePropertiesSerializer(
          item["reservedResourceProperties"],
        ),
  };
}

/** Properties specific to each reserved resource type. Not required if not applicable. */
export interface ReservationOrderAliasRequestPropertiesReservedResourceProperties {
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. */
  instanceFlexibility?: InstanceFlexibility;
}

export function reservationOrderAliasRequestPropertiesReservedResourcePropertiesSerializer(
  item: ReservationOrderAliasRequestPropertiesReservedResourceProperties,
): any {
  return { instanceFlexibility: item["instanceFlexibility"] };
}

/** Discounts patch request */
export interface DiscountPatchRequest {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Display name */
  displayName?: string;
}

export function discountPatchRequestSerializer(item: DiscountPatchRequest): any {
  return {
    properties: areAllPropsUndefined(item, ["displayName"])
      ? undefined
      : _discountPatchRequestPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Discounts patch request properties */
export interface DiscountPatchRequestProperties {
  /** Display name */
  displayName?: string;
}

export function discountPatchRequestPropertiesSerializer(
  item: DiscountPatchRequestProperties,
): any {
  return { displayName: item["displayName"] };
}

/** Request to validate any benefit. */
export interface BenefitValidateRequest {
  /** Defines benefits for validation. */
  benefits?: BenefitValidateModelUnion[];
}

export function benefitValidateRequestSerializer(item: BenefitValidateRequest): any {
  return {
    benefits: !item["benefits"]
      ? item["benefits"]
      : benefitValidateModelUnionArraySerializer(item["benefits"]),
  };
}

export function benefitValidateModelUnionArraySerializer(
  result: Array<BenefitValidateModelUnion>,
): any[] {
  return result.map((item) => {
    return benefitValidateModelUnionSerializer(item);
  });
}

/** Abstract benefit model to validate. */
export interface BenefitValidateModel {
  /** Type of benefit to validate. This is used to determine the model type for validation. */
  /** The discriminator possible values: ConditionalCredits, Credits, MACC, SavingsPlan */
  benefitType: BenefitType;
}

export function benefitValidateModelSerializer(item: BenefitValidateModel): any {
  return { benefitType: item["benefitType"] };
}

/** Alias for BenefitValidateModelUnion */
export type BenefitValidateModelUnion =
  | ConditionalCreditsValidateModel
  | CreditsValidateModel
  | MaccValidateModel
  | SavingsPlanValidateModel
  | BenefitValidateModel;

export function benefitValidateModelUnionSerializer(item: BenefitValidateModelUnion): any {
  switch (item.benefitType) {
    case "ConditionalCredits":
      return conditionalCreditsValidateModelSerializer(item as ConditionalCreditsValidateModel);

    case "Credits":
      return creditsValidateModelSerializer(item as CreditsValidateModel);

    case "MACC":
      return maccValidateModelSerializer(item as MaccValidateModel);

    case "SavingsPlan":
      return savingsPlanValidateModelSerializer(item as SavingsPlanValidateModel);

    default:
      return benefitValidateModelSerializer(item);
  }
}

/** Represents benefit model type for validation. */
export enum KnownBenefitType {
  /** SavingsPlan */
  SavingsPlan = "SavingsPlan",
  /** MACC */
  Macc = "MACC",
  /** ConditionalCredits */
  ConditionalCredits = "ConditionalCredits",
  /** Credits */
  Credits = "Credits",
}

/**
 * Represents benefit model type for validation. \
 * {@link KnownBenefitType} can be used interchangeably with BenefitType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SavingsPlan** \
 * **MACC** \
 * **ConditionalCredits** \
 * **Credits**
 */
export type BenefitType = string;

/** Conditional Credits validate model */
export interface ConditionalCreditsValidateModel extends BenefitValidateModel {
  /** Conditional Credits validate properties */
  properties?: ConditionalCreditPropertiesUnion;
  /** Type of benefit to validate. This is used to determine the model type for validation. */
  benefitType: "ConditionalCredits";
}

export function conditionalCreditsValidateModelSerializer(
  item: ConditionalCreditsValidateModel,
): any {
  return {
    benefitType: item["benefitType"],
    properties: !item["properties"]
      ? item["properties"]
      : conditionalCreditPropertiesUnionSerializer(item["properties"]),
  };
}

/** Credits validate model */
export interface CreditsValidateModel extends BenefitValidateModel {
  /** Type of benefit to validate. This is used to determine the model type for validation. */
  benefitType: "Credits";
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Credit properties */
  properties?: CreditProperties;
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: string;
  /** The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly etag?: string;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Plan for the resource. */
  plan?: Plan;
}

export function creditsValidateModelSerializer(item: CreditsValidateModel): any {
  return {
    benefitType: item["benefitType"],
    properties: areAllPropsUndefined(item, [
      "tags",
      "location",
      "properties",
      "managedBy",
      "kind",
      "identity",
      "sku",
      "plan",
    ])
      ? undefined
      : _creditsValidateModelPropertiesSerializer(item),
  };
}

/** MACC validate model */
export interface MaccValidateModel extends BenefitValidateModel {
  /** Type of benefit to validate. This is used to determine the model type for validation. */
  benefitType: "MACC";
  /** Provisioning state of MACC as assigned by RPaaS. This indicates the last operation's status. For all practical purposes, this can be ignored. For current status of MACC resource, refer to MaccStatus. */
  readonly provisioningState?: string;
  /** Represents the current status of the MACC. */
  status?: MaccStatus;
  /** Represents type of the object being operated on. Possible values are primary or contributor. */
  entityType?: MaccEntityType;
  /** Display name */
  displayName?: string;
  /** Represents catalog UPN. */
  productCode?: string;
  /** Fully-qualified identifier of the billing account where the MACC is applied. Present only for Enterprise Agreement customers. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId} */
  billingAccountResourceId?: string;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Must be start of month. Timestamp must be in the ISO date format YYYY-MM-DDT00:00:00Z. */
  startAt?: Date;
  /** Must be end of month. Timestamp must be in the ISO date format YYYY-MM-DDT23:59:59Z. */
  endAt?: Date;
  /** This is the globally unique identifier of the MACC which will not change for the lifetime of the MACC. */
  systemId?: string;
  /** Setting this to 'Enable' enables automatic shortfall charging when commitment is not met. */
  automaticShortfall?: EnablementMode;
  /** Optional field to record suppression reason for automatic shortfall. */
  automaticShortfallSuppressReason?: AutomaticShortfallSuppressReason;
  /** MACC shortfall */
  shortfall?: Shortfall;
  /** List of milestones associated with this MACC. */
  milestones?: MaccMilestone[];
  /** This is the resource identifier of either the primary MACC or the contributor. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  resourceId?: string;
  /** Setting this to true means multi-entity. */
  allowContributors?: boolean;
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
  /** Fully-qualified billing account resource identifier of the primary MACC. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
}

export function maccValidateModelSerializer(item: MaccValidateModel): any {
  return {
    benefitType: item["benefitType"],
    properties: areAllPropsUndefined(item, [
      "status",
      "entityType",
      "displayName",
      "productCode",
      "billingAccountResourceId",
      "commitment",
      "startAt",
      "endAt",
      "systemId",
      "automaticShortfall",
      "automaticShortfallSuppressReason",
      "shortfall",
      "milestones",
      "resourceId",
      "allowContributors",
      "primaryResourceId",
      "primaryBillingAccountResourceId",
    ])
      ? undefined
      : _maccValidateModelPropertiesSerializer(item),
  };
}

/** Savings plan validate model */
export interface SavingsPlanValidateModel extends BenefitValidateModel {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Savings plan SKU */
  sku: ResourceSku;
  /** Resource provider kind */
  kind?: string;
  /** Type of benefit to validate. This is used to determine the model type for validation. */
  benefitType: "SavingsPlan";
  /** Display name */
  displayName?: string;
  /** Identifier of the savings plan created */
  readonly savingsPlanOrderId?: string;
  /** Provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Subscription that will be charged for purchasing the benefit */
  billingScopeId?: string;
  /** Represent benefit term in ISO 8601 format. */
  term?: Term;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly billing plans. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
}

export function savingsPlanValidateModelSerializer(item: SavingsPlanValidateModel): any {
  return {
    benefitType: item["benefitType"],
    properties: areAllPropsUndefined(item, [
      "displayName",
      "billingScopeId",
      "term",
      "billingPlan",
      "appliedScopeType",
      "appliedScopeProperties",
      "commitment",
      "renew",
    ])
      ? undefined
      : _savingsPlanValidateModelPropertiesSerializer(item),
    sku: resourceSkuSerializer(item["sku"]),
    kind: item["kind"],
  };
}

/** Benefit validate response. */
export interface BenefitValidateResponse {
  /** Defines benefit validation response for benefits. */
  benefits?: BenefitValidateResponseProperty[];
  /** Url to get the next page. */
  nextLink?: string;
}

export function benefitValidateResponseDeserializer(item: any): BenefitValidateResponse {
  return {
    benefits: !item["benefits"]
      ? item["benefits"]
      : benefitValidateResponsePropertyArrayDeserializer(item["benefits"]),
    nextLink: item["nextLink"],
  };
}

export function benefitValidateResponsePropertyArrayDeserializer(
  result: Array<BenefitValidateResponseProperty>,
): any[] {
  return result.map((item) => {
    return benefitValidateResponsePropertyDeserializer(item);
  });
}

/** Benefit validate response property */
export interface BenefitValidateResponseProperty {
  /** Indicates if the provided input was valid */
  valid?: boolean;
  /** Failure reason code if the provided input was invalid */
  reasonCode?: string;
  /** Failure reason if the provided input was invalid */
  reason?: string;
  /** Resource identifier of the benefit that was validated. */
  resourceId?: string;
}

export function benefitValidateResponsePropertyDeserializer(
  item: any,
): BenefitValidateResponseProperty {
  return {
    valid: item["valid"],
    reasonCode: item["reasonCode"],
    reason: item["reason"],
    resourceId: item["resourceId"],
  };
}

/** List MACCs under a billing account */
export interface SellerResourceListRequest {
  /** Fully-qualified billing account resource identifier where the benefit is applied. Present only for Enterprise Agreement customers. */
  billingAccountResourceId?: string;
  /** This is an OData expresssion to filter the list of MACCs based on the properties of MACC passed in the filter. */
  filter?: string;
  /** Setting it to true will return the list of contributors associated with the MACC. */
  contributors?: boolean;
  /** Setting it to true will return the list of milestones associated with the MACC. */
  milestones?: boolean;
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
}

export function sellerResourceListRequestSerializer(item: SellerResourceListRequest): any {
  return {
    properties: areAllPropsUndefined(item, [
      "billingAccountResourceId",
      "$filter",
      "contributors",
      "milestones",
      "primaryResourceId",
    ])
      ? undefined
      : _sellerResourceListRequestPropertiesSerializer(item),
  };
}

/** Request properties to list maccs under a billing account */
export interface SellerResourceListRequestProperties {
  /** Fully-qualified billing account resource identifier where the benefit is applied. Present only for Enterprise Agreement customers. */
  billingAccountResourceId: string;
  /** This is an OData expresssion to filter the list of MACCs based on the properties of MACC passed in the filter. */
  filter?: string;
  /** Setting it to true will return the list of contributors associated with the MACC. */
  contributors?: boolean;
  /** Setting it to true will return the list of milestones associated with the MACC. */
  milestones?: boolean;
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
}

export function sellerResourceListRequestPropertiesSerializer(
  item: SellerResourceListRequestProperties,
): any {
  return {
    billingAccountResourceId: item["billingAccountResourceId"],
    $filter: item["filter"],
    contributors: item["contributors"],
    milestones: item["milestones"],
    primaryResourceId: item["primaryResourceId"],
  };
}

/** Applicable MACC list */
export interface _ApplicableMaccList {
  /** List Applicable MACCs. */
  value?: ApplicableMacc[];
  /** Url to get the next page. */
  nextLink?: string;
}

export function _applicableMaccListDeserializer(item: any): _ApplicableMaccList {
  return {
    value: !item["value"] ? item["value"] : applicableMaccArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicableMaccArrayDeserializer(result: Array<ApplicableMacc>): any[] {
  return result.map((item) => {
    return applicableMaccDeserializer(item);
  });
}

/** Applicable MACC. */
export interface ApplicableMacc extends ProxyResource {
  /** Provisioning state of MACC as assigned by RPaaS. This indicates the last operation's status. For all practical purposes, this can be ignored. For current status of MACC resource, refer to MaccStatus. */
  readonly provisioningState?: string;
  /** Represents the current status of the MACC. */
  status?: MaccStatus;
  /** Represents type of the object being operated on. Possible values are primary or contributor. */
  entityType?: MaccEntityType;
  /** Display name */
  displayName?: string;
  /** Represents catalog UPN. */
  productCode?: string;
  /** Fully-qualified identifier of the billing account where the MACC is applied. Present only for Enterprise Agreement customers. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId} */
  billingAccountResourceId?: string;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Must be start of month. Timestamp must be in the ISO date format YYYY-MM-DDT00:00:00Z. */
  startAt?: Date;
  /** Must be end of month. Timestamp must be in the ISO date format YYYY-MM-DDT23:59:59Z. */
  endAt?: Date;
  /** This is the globally unique identifier of the MACC which will not change for the lifetime of the MACC. */
  systemId?: string;
  /** Setting this to 'Enable' enables automatic shortfall charging when commitment is not met. */
  automaticShortfall?: EnablementMode;
  /** Optional field to record suppression reason for automatic shortfall. */
  automaticShortfallSuppressReason?: AutomaticShortfallSuppressReason;
  /** MACC shortfall */
  shortfall?: Shortfall;
  /** List of milestones associated with this MACC. */
  milestones?: MaccMilestone[];
  /** This is the resource identifier of either the primary MACC or the contributor. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  resourceId?: string;
  /** Setting this to true means multi-entity. */
  allowContributors?: boolean;
  /** Fully-qualified resource identifier of the primary MACC. Format: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BillingBenefits/maccs/{maccName}. */
  primaryResourceId?: string;
  /** Fully-qualified billing account resource identifier of the primary MACC. Format must be Azure Resource ID: /providers/Microsoft.Billing/billingAccounts/{acctId:orgId}. */
  primaryBillingAccountResourceId?: string;
}

export function applicableMaccDeserializer(item: any): ApplicableMacc {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _applicableMaccPropertiesDeserializer(item["properties"])),
  };
}

/** Credit source resource definition */
export interface CreditSource extends TrackedResource {
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: string;
  /** The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly etag?: string;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Plan for the resource. */
  plan?: Plan;
  /** Status of the credit */
  status?: CreditStatus;
  /** The uri of the resource impacted which lead to the grant of the credit. */
  sourceResourceId?: string;
  /** The billing period of the impact for the resource. Format YYYYMM */
  impactedBillingPeriod?: string;
  /** Commitment towards the benefit. */
  credit?: Commitment;
}

export function creditSourceSerializer(item: CreditSource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "status",
      "sourceResourceId",
      "impactedBillingPeriod",
      "credit",
    ])
      ? undefined
      : _creditSourcePropertiesSerializer(item),
    managedBy: item["managedBy"],
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function creditSourceDeserializer(item: any): CreditSource {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _creditSourcePropertiesDeserializer(item["properties"])),
    managedBy: item["managedBy"],
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Properties of a credit source */
export interface CreditSourceProperties {
  /** Status of the credit */
  status?: CreditStatus;
  /** The uri of the resource impacted which lead to the grant of the credit. */
  sourceResourceId?: string;
  /** The billing period of the impact for the resource. Format YYYYMM */
  impactedBillingPeriod?: string;
  /** Commitment towards the benefit. */
  credit?: Commitment;
}

export function creditSourcePropertiesSerializer(item: CreditSourceProperties): any {
  return {
    status: item["status"],
    sourceResourceId: item["sourceResourceId"],
    impactedBillingPeriod: item["impactedBillingPeriod"],
    credit: !item["credit"] ? item["credit"] : commitmentSerializer(item["credit"]),
  };
}

export function creditSourcePropertiesDeserializer(item: any): CreditSourceProperties {
  return {
    status: item["status"],
    sourceResourceId: item["sourceResourceId"],
    impactedBillingPeriod: item["impactedBillingPeriod"],
    credit: !item["credit"] ? item["credit"] : commitmentDeserializer(item["credit"]),
  };
}

/** Credit patch request */
export interface CreditSourcePatchRequest {
  /** Resource Tags */
  tags?: Record<string, string>;
}

export function creditSourcePatchRequestSerializer(item: CreditSourcePatchRequest): any {
  return { tags: item["tags"] };
}

/** List of credit sources */
export interface _CreditSourcesList {
  /** The CreditSource items on this page */
  value: CreditSource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _creditSourcesListDeserializer(item: any): _CreditSourcesList {
  return {
    value: creditSourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function creditSourceArraySerializer(result: Array<CreditSource>): any[] {
  return result.map((item) => {
    return creditSourceSerializer(item);
  });
}

export function creditSourceArrayDeserializer(result: Array<CreditSource>): any[] {
  return result.map((item) => {
    return creditSourceDeserializer(item);
  });
}

/** Free Services resource definition */
export interface FreeServices extends TrackedResource {
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type. E.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  kind?: string;
  /** The etag field is *not* required. If it is provided in the response body, it must also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly etag?: string;
  /** Managed service identity (system assigned and/or user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** The resource model definition representing SKU */
  sku?: Sku;
  /** Plan for the resource. */
  plan?: Plan;
  /** This is the catalog UPN for the product. */
  productCode?: string;
  /** Current status of the free services */
  status?: FreeServicesStatus;
  /** Date and time when the free services become active */
  startAt?: Date;
  /** Expiration date and time of the free services */
  endAt?: Date;
  /** Provisioning state of Free Services as assigned by RPaaS. This indicates the last operation's status. For all practical purposes, this can be ignored. For current status of Free Services resource, refer to FreeServicesStatus. */
  readonly provisioningState?: string;
  /** Billing account resource id where the free services metadata is present. */
  readonly billingAccountResourceId?: string;
  /** Billing profile resource id where the free services are scoped to. */
  readonly billingProfileResourceId?: string;
  /** Customer resource id where the free services are scoped to. */
  readonly customerResourceId?: string;
  /** This is the globally unique identifier of the free services which will not change for its lifetime. */
  systemId?: string;
}

export function freeServicesSerializer(item: FreeServices): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "productCode",
      "status",
      "startAt",
      "endAt",
      "systemId",
    ])
      ? undefined
      : _freeServicesPropertiesSerializer(item),
    managedBy: item["managedBy"],
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function freeServicesDeserializer(item: any): FreeServices {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _freeServicesPropertiesDeserializer(item["properties"])),
    managedBy: item["managedBy"],
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Properties of free services */
export interface FreeServicesProperties {
  /** This is the catalog UPN for the product. */
  productCode?: string;
  /** Current status of the free services */
  status?: FreeServicesStatus;
  /** Date and time when the free services become active */
  startAt?: Date;
  /** Expiration date and time of the free services */
  endAt?: Date;
  /** Provisioning state of Free Services as assigned by RPaaS. This indicates the last operation's status. For all practical purposes, this can be ignored. For current status of Free Services resource, refer to FreeServicesStatus. */
  readonly provisioningState?: string;
  /** Billing account resource id where the free services metadata is present. */
  readonly billingAccountResourceId?: string;
  /** Billing profile resource id where the free services are scoped to. */
  readonly billingProfileResourceId?: string;
  /** Customer resource id where the free services are scoped to. */
  readonly customerResourceId?: string;
  /** This is the globally unique identifier of the free services which will not change for its lifetime. */
  systemId?: string;
}

export function freeServicesPropertiesSerializer(item: FreeServicesProperties): any {
  return {
    productCode: item["productCode"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    systemId: item["systemId"],
  };
}

export function freeServicesPropertiesDeserializer(item: any): FreeServicesProperties {
  return {
    productCode: item["productCode"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    provisioningState: item["provisioningState"],
    billingAccountResourceId: item["billingAccountResourceId"],
    billingProfileResourceId: item["billingProfileResourceId"],
    customerResourceId: item["customerResourceId"],
    systemId: item["systemId"],
  };
}

/** Status of the free services */
export enum KnownFreeServicesStatus {
  /** Free services status is unknown */
  Unknown = "Unknown",
  /** Free services are pending activation */
  Pending = "Pending",
  /** Free services are active */
  Active = "Active",
  /** Free services have been canceled */
  Canceled = "Canceled",
  /** Free services have been fully consumed or completed */
  Completed = "Completed",
}

/**
 * Status of the free services \
 * {@link KnownFreeServicesStatus} can be used interchangeably with FreeServicesStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Free services status is unknown \
 * **Pending**: Free services are pending activation \
 * **Active**: Free services are active \
 * **Canceled**: Free services have been canceled \
 * **Completed**: Free services have been fully consumed or completed
 */
export type FreeServicesStatus = string;

/** Free services patch request */
export interface FreeServicesPatchRequest {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Updated expiration date and time of the free services */
  endAt?: Date;
}

export function freeServicesPatchRequestSerializer(item: FreeServicesPatchRequest): any {
  return {
    properties: areAllPropsUndefined(item, ["endAt"])
      ? undefined
      : _freeServicesPatchRequestPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Free services patch request properties */
export interface FreeServicesPatchRequestProperties {
  /** Updated expiration date and time of the free services */
  endAt?: Date;
}

export function freeServicesPatchRequestPropertiesSerializer(
  item: FreeServicesPatchRequestProperties,
): any {
  return { endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString() };
}

/** This operation lists the free services that are available under the specified subscription. */
export interface _FreeServicesList {
  /** The list of free services */
  value?: FreeServices[];
  /** The URL to get the next set of results */
  readonly nextLink?: string;
}

export function _freeServicesListDeserializer(item: any): _FreeServicesList {
  return {
    value: !item["value"] ? item["value"] : freeServicesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function freeServicesArraySerializer(result: Array<FreeServices>): any[] {
  return result.map((item) => {
    return freeServicesSerializer(item);
  });
}

export function freeServicesArrayDeserializer(result: Array<FreeServices>): any[] {
  return result.map((item) => {
    return freeServicesDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-12-01-preview API version. */
  V20251201Preview = "2025-12-01-preview",
}

export function _contributorPropertiesSerializer(item: Contributor): any {
  return {
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonSerializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallSerializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArraySerializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _contributorPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonDeserializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallDeserializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArrayDeserializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _creditPropertiesSerializer(item: Credit): any {
  return {
    status: item["status"],
    productCode: item["productCode"],
    reason: !item["reason"] ? item["reason"] : creditReasonSerializer(item["reason"]),
    credit: !item["credit"] ? item["credit"] : commitmentSerializer(item["credit"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    policies: !item["policies"] ? item["policies"] : creditPoliciesSerializer(item["policies"]),
    billingAccountResourceId: item["billingAccountResourceId"],
    breakdown: !item["breakdown"]
      ? item["breakdown"]
      : creditBreakdownItemArraySerializer(item["breakdown"]),
    systemId: item["systemId"],
    resourceId: item["resourceId"],
  };
}

export function _creditPropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    productCode: item["productCode"],
    reason: !item["reason"] ? item["reason"] : creditReasonDeserializer(item["reason"]),
    credit: !item["credit"] ? item["credit"] : commitmentDeserializer(item["credit"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    policies: !item["policies"] ? item["policies"] : creditPoliciesDeserializer(item["policies"]),
    billingAccountResourceId: item["billingAccountResourceId"],
    billingProfileResourceId: item["billingProfileResourceId"],
    breakdown: !item["breakdown"]
      ? item["breakdown"]
      : creditBreakdownItemArrayDeserializer(item["breakdown"]),
    provisioningState: item["provisioningState"],
    systemId: item["systemId"],
    customerId: item["customerId"],
    resourceId: item["resourceId"],
  };
}

export function _creditPatchRequestPropertiesSerializer(item: CreditPatchRequest): any {
  return {
    credit: !item["credit"] ? item["credit"] : commitmentSerializer(item["credit"]),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    breakdown: !item["breakdown"]
      ? item["breakdown"]
      : creditBreakdownItemArraySerializer(item["breakdown"]),
  };
}

export function _conditionalCreditPatchRequestPropertiesSerializer(
  item: ConditionalCreditPatchRequest,
): any {
  return {
    displayName: item["displayName"],
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    allowContributors: item["allowContributors"],
    milestones: !item["milestones"]
      ? item["milestones"]
      : conditionalCreditMilestoneArraySerializer(item["milestones"]),
  };
}

export function _conditionalCreditContributorPropertiesSerializer(
  item: ConditionalCreditContributor,
): any {
  return {
    entityType: item["entityType"],
    displayName: item["displayName"],
    billingAccountResourceId: item["billingAccountResourceId"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    productCode: item["productCode"],
    resourceId: item["resourceId"],
    primaryResourceId: item["primaryResourceId"],
    systemId: item["systemId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _conditionalCreditContributorPropertiesDeserializer(item: any) {
  return {
    entityType: item["entityType"],
    displayName: item["displayName"],
    billingAccountResourceId: item["billingAccountResourceId"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    productCode: item["productCode"],
    benefitResourceId: item["benefitResourceId"],
    resourceId: item["resourceId"],
    primaryResourceId: item["primaryResourceId"],
    systemId: item["systemId"],
    milestones: !item["milestones"]
      ? item["milestones"]
      : contributorConditionalCreditMilestoneArrayDeserializer(item["milestones"]),
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _maccPropertiesSerializer(item: Macc): any {
  return {
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonSerializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallSerializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArraySerializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _maccPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonDeserializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallDeserializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArrayDeserializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _maccPatchRequestPropertiesSerializer(item: MaccPatchRequest): any {
  return {
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    allowContributors: item["allowContributors"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonSerializer(item["automaticShortfallSuppressReason"]),
    displayName: item["displayName"],
    status: item["status"],
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArraySerializer(item["milestones"]),
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _chargeShortfallRequestPropertiesSerializer(item: ChargeShortfallRequest): any {
  return {
    productCode: item["productCode"],
    charge: !item["charge"] ? item["charge"] : commitmentSerializer(item["charge"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    resourceId: item["resourceId"],
    balanceVersion: item["balanceVersion"],
    systemId: item["systemId"],
  };
}

export function _chargeShortfallRequestPropertiesDeserializer(item: any) {
  return {
    productCode: item["productCode"],
    charge: !item["charge"] ? item["charge"] : commitmentDeserializer(item["charge"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    resourceId: item["resourceId"],
    balanceVersion: item["balanceVersion"],
    systemId: item["systemId"],
  };
}

export function _savingsPlanOrderAliasModelPropertiesSerializer(
  item: SavingsPlanOrderAliasModel,
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
    renew: item["renew"],
  };
}

export function _savingsPlanOrderAliasModelPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    savingsPlanOrderId: item["savingsPlanOrderId"],
    provisioningState: item["provisioningState"],
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
    renew: item["renew"],
  };
}

export function _savingsPlanOrderModelPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    billingScopeId: item["billingScopeId"],
    billingProfileId: item["billingProfileId"],
    customerId: item["customerId"],
    billingAccountId: item["billingAccountId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    planInformation: !item["planInformation"]
      ? item["planInformation"]
      : billingPlanInformationDeserializer(item["planInformation"]),
    savingsPlans: !item["savingsPlans"]
      ? item["savingsPlans"]
      : item["savingsPlans"].map((p: any) => {
          return p;
        }),
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
  };
}

export function _roleAssignmentEntityPropertiesDeserializer(item: any) {
  return {
    principalId: item["principalId"],
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
  };
}

export function _purchaseRequestPropertiesSerializer(item: PurchaseRequest): any {
  return {
    displayName: item["displayName"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    renew: item["renew"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesSerializer(item["appliedScopeProperties"]),
  };
}

export function _purchaseRequestPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    effectiveDateTime: !item["effectiveDateTime"]
      ? item["effectiveDateTime"]
      : new Date(item["effectiveDateTime"]),
    renew: item["renew"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
  };
}

export function _savingsPlanModelPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    displayProvisioningState: item["displayProvisioningState"],
    billingScopeId: item["billingScopeId"],
    billingProfileId: item["billingProfileId"],
    customerId: item["customerId"],
    billingAccountId: item["billingAccountId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    userFriendlyAppliedScopeType: item["userFriendlyAppliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    effectiveDateTime: !item["effectiveDateTime"]
      ? item["effectiveDateTime"]
      : new Date(item["effectiveDateTime"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    purchaseDateTime: !item["purchaseDateTime"]
      ? item["purchaseDateTime"]
      : new Date(item["purchaseDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
    renew: item["renew"],
    utilization: !item["utilization"]
      ? item["utilization"]
      : utilizationDeserializer(item["utilization"]),
    renewSource: item["renewSource"],
    renewDestination: item["renewDestination"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : renewPropertiesDeserializer(item["renewProperties"]),
  };
}

export function _reservationOrderAliasResponsePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    reservationOrderId: item["reservationOrderId"],
    provisioningState: item["provisioningState"],
    billingScopeId: item["billingScopeId"],
    term: item["term"],
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    quantity: item["quantity"],
    renew: item["renew"],
    reservedResourceType: item["reservedResourceType"],
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : reservationOrderAliasResponsePropertiesReservedResourcePropertiesDeserializer(
          item["reservedResourceProperties"],
        ),
  };
}

export function _reservationOrderAliasRequestPropertiesSerializer(
  item: ReservationOrderAliasRequest,
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
    quantity: item["quantity"],
    renew: item["renew"],
    reservedResourceType: item["reservedResourceType"],
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : reservationOrderAliasRequestPropertiesReservedResourcePropertiesSerializer(
          item["reservedResourceProperties"],
        ),
  };
}

export function _discountPatchRequestPropertiesSerializer(item: DiscountPatchRequest): any {
  return { displayName: item["displayName"] };
}

export function _creditsValidateModelPropertiesSerializer(item: CreditsValidateModel): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : creditPropertiesSerializer(item["properties"]),
    managedBy: item["managedBy"],
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function _creditsValidateModelPropertiesDeserializer(item: any) {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : creditPropertiesDeserializer(item["properties"]),
    managedBy: item["managedBy"],
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

export function _maccValidateModelPropertiesSerializer(item: MaccValidateModel): any {
  return {
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonSerializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallSerializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArraySerializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _maccValidateModelPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonDeserializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallDeserializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArrayDeserializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _savingsPlanValidateModelPropertiesSerializer(item: SavingsPlanValidateModel): any {
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
    renew: item["renew"],
  };
}

export function _savingsPlanValidateModelPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    savingsPlanOrderId: item["savingsPlanOrderId"],
    provisioningState: item["provisioningState"],
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
    renew: item["renew"],
  };
}

export function _sellerResourceListRequestPropertiesSerializer(
  item: SellerResourceListRequest,
): any {
  return {
    billingAccountResourceId: item["billingAccountResourceId"],
    $filter: item["filter"],
    contributors: item["contributors"],
    milestones: item["milestones"],
    primaryResourceId: item["primaryResourceId"],
  };
}

export function _applicableMaccPropertiesSerializer(item: ApplicableMacc): any {
  return {
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"] ? item["commitment"] : commitmentSerializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonSerializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallSerializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArraySerializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _applicableMaccPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    entityType: item["entityType"],
    displayName: item["displayName"],
    productCode: item["productCode"],
    billingAccountResourceId: item["billingAccountResourceId"],
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    systemId: item["systemId"],
    automaticShortfall: item["automaticShortfall"],
    automaticShortfallSuppressReason: !item["automaticShortfallSuppressReason"]
      ? item["automaticShortfallSuppressReason"]
      : automaticShortfallSuppressReasonDeserializer(item["automaticShortfallSuppressReason"]),
    shortfall: !item["shortfall"] ? item["shortfall"] : shortfallDeserializer(item["shortfall"]),
    milestones: !item["milestones"]
      ? item["milestones"]
      : maccMilestoneArrayDeserializer(item["milestones"]),
    resourceId: item["resourceId"],
    allowContributors: item["allowContributors"],
    primaryResourceId: item["primaryResourceId"],
    primaryBillingAccountResourceId: item["primaryBillingAccountResourceId"],
  };
}

export function _creditSourcePropertiesSerializer(item: CreditSource): any {
  return {
    status: item["status"],
    sourceResourceId: item["sourceResourceId"],
    impactedBillingPeriod: item["impactedBillingPeriod"],
    credit: !item["credit"] ? item["credit"] : commitmentSerializer(item["credit"]),
  };
}

export function _creditSourcePropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    sourceResourceId: item["sourceResourceId"],
    impactedBillingPeriod: item["impactedBillingPeriod"],
    credit: !item["credit"] ? item["credit"] : commitmentDeserializer(item["credit"]),
  };
}

export function _freeServicesPropertiesSerializer(item: FreeServices): any {
  return {
    productCode: item["productCode"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : item["startAt"].toISOString(),
    endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString(),
    systemId: item["systemId"],
  };
}

export function _freeServicesPropertiesDeserializer(item: any) {
  return {
    productCode: item["productCode"],
    status: item["status"],
    startAt: !item["startAt"] ? item["startAt"] : new Date(item["startAt"]),
    endAt: !item["endAt"] ? item["endAt"] : new Date(item["endAt"]),
    provisioningState: item["provisioningState"],
    billingAccountResourceId: item["billingAccountResourceId"],
    billingProfileResourceId: item["billingProfileResourceId"],
    customerResourceId: item["customerResourceId"],
    systemId: item["systemId"],
  };
}

export function _freeServicesPatchRequestPropertiesSerializer(item: FreeServicesPatchRequest): any {
  return { endAt: !item["endAt"] ? item["endAt"] : item["endAt"].toISOString() };
}
