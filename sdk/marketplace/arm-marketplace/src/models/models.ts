// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Query user's rules properties */
export interface QueryUserRulesProperties {
  /** List of subscription IDs */
  subscriptionIds?: string[];
}

export function queryUserRulesPropertiesSerializer(item: QueryUserRulesProperties): any {
  return {
    properties: areAllPropsUndefined(item, ["subscriptionIds"])
      ? undefined
      : _queryUserRulesPropertiesPropertiesSerializer(item),
  };
}

/** List of subscriptions IDs to query the user's rules */
export interface QueryUserRulesDetails {
  /** List of subscription IDs */
  subscriptionIds?: string[];
}

export function queryUserRulesDetailsSerializer(item: QueryUserRulesDetails): any {
  return {
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface RuleListResponse */
export interface RuleListResponse {
  readonly value?: Rule[];
  /** URL to get the next set of rules list results if there are any. */
  nextLink?: string;
}

export function ruleListResponseDeserializer(item: any): RuleListResponse {
  return {
    value: !item["value"] ? item["value"] : ruleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ruleArraySerializer(result: Array<Rule>): any[] {
  return result.map((item) => {
    return ruleSerializer(item);
  });
}

export function ruleArrayDeserializer(result: Array<Rule>): any[] {
  return result.map((item) => {
    return ruleDeserializer(item);
  });
}

/** model interface Rule */
export interface Rule {
  /** Rule type */
  type?: RuleType;
  value?: string[];
}

export function ruleSerializer(item: Rule): any {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

export function ruleDeserializer(item: any): Rule {
  return {
    type: item["type"],
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
  };
}

/** Rule type */
export enum KnownRuleType {
  /** PrivateProducts */
  PrivateProducts = "PrivateProducts",
  /** TermsAndCondition */
  TermsAndCondition = "TermsAndCondition",
}

/**
 * Rule type \
 * {@link KnownRuleType} can be used interchangeably with RuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrivateProducts** \
 * **TermsAndCondition**
 */
export type RuleType = string;

/** Error response indicates Microsoft.Marketplace service is not able to process the incoming request. The reason is provided in the error message. */
export interface ErrorResponse {
  /** The details of the error. */
  error?: ErrorResponseError;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseErrorDeserializer(item["error"]),
  };
}

/** The details of the error. */
export interface ErrorResponseError {
  /** Error code. */
  readonly code?: string;
  /** Error message indicating why the operation failed. */
  readonly message?: string;
}

export function errorResponseErrorDeserializer(item: any): ErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** model interface SetRulesRequest */
export interface SetRulesRequest {
  value?: Rule[];
  /** URL to get the next set of rules list results if there are any. */
  nextLink?: string;
}

export function setRulesRequestSerializer(item: SetRulesRequest): any {
  return {
    value: !item["value"] ? item["value"] : ruleArraySerializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Result of the request to list Marketplace operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of Microsoft.Marketplace operations supported by the Microsoft.Marketplace resource provider. */
  value?: SingleOperation[];
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : singleOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function singleOperationArrayDeserializer(result: Array<SingleOperation>): any[] {
  return result.map((item) => {
    return singleOperationDeserializer(item);
  });
}

/** Microsoft.Marketplace REST API operation */
export interface SingleOperation {
  /** Operation ID */
  id?: string;
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** The object that represents the operation. */
  display?: SingleOperationDisplay;
  /** Origin of the operation */
  origin?: string;
  /** Properties of the operation */
  properties?: any;
}

export function singleOperationDeserializer(item: any): SingleOperation {
  return {
    id: item["id"],
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"]
      ? item["display"]
      : singleOperationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** The object that represents the operation. */
export interface SingleOperationDisplay {
  /** Service provider: Microsoft.Marketplace */
  readonly provider?: string;
  /** Resource on which the operation is performed */
  readonly resource?: string;
  /** Operation type */
  readonly operation?: string;
  /** Friendly description for the operation, */
  readonly description?: string;
}

export function singleOperationDisplayDeserializer(item: any): SingleOperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The PrivateStore data structure. */
export interface PrivateStore extends ProxyResource {
  /** Indicates private store availability */
  availability?: Availability;
  /** Private Store id */
  readonly privateStoreId?: string;
  /** Identifier for purposes of race condition */
  eTag?: string;
  /** Private Store Name */
  privateStoreName?: string;
  /** Tenant id */
  tenantId?: string;
  /** Is government */
  isGov?: boolean;
  /** Gets list of associated collection ids */
  readonly collectionIds?: string[];
  /** Gets or sets list of branding characteristics */
  branding?: Record<string, string>;
  /** Gets or sets notifications settings */
  notificationsSettings?: NotificationsSettingsProperties;
}

export function privateStoreSerializer(item: PrivateStore): any {
  return {
    properties: areAllPropsUndefined(item, [
      "availability",
      "eTag",
      "privateStoreName",
      "tenantId",
      "isGov",
      "branding",
      "notificationsSettings",
    ])
      ? undefined
      : _privateStorePropertiesSerializer(item),
  };
}

export function privateStoreDeserializer(item: any): PrivateStore {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateStorePropertiesDeserializer(item["properties"])),
  };
}

/** Describes the json payload on whether or not the private store is enabled for a given tenant */
export interface PrivateStoreProperties {
  /** Indicates private store availability */
  availability?: Availability;
  /** Private Store id */
  readonly privateStoreId?: string;
  /** Identifier for purposes of race condition */
  eTag?: string;
  /** Private Store Name */
  privateStoreName?: string;
  /** Tenant id */
  tenantId?: string;
  /** Is government */
  isGov?: boolean;
  /** Gets list of associated collection ids */
  readonly collectionIds?: string[];
  /** Gets or sets list of branding characteristics */
  branding?: Record<string, string>;
  /** Gets or sets list of notified recipients for new requests */
  recipients?: Recipient[];
  /** Gets or sets whether to send email to all marketplace admins for new requests */
  sendToAllMarketplaceAdmins?: boolean;
}

export function privateStorePropertiesSerializer(item: PrivateStoreProperties): any {
  return {
    availability: item["availability"],
    eTag: item["eTag"],
    privateStoreName: item["privateStoreName"],
    tenantId: item["tenantId"],
    isGov: item["isGov"],
    branding: item["branding"],
    notificationsSettings: areAllPropsUndefined(item, ["recipients", "sendToAllMarketplaceAdmins"])
      ? undefined
      : _privateStorePropertiesNotificationsSettingsSerializer(item),
  };
}

export function privateStorePropertiesDeserializer(item: any): PrivateStoreProperties {
  return {
    availability: item["availability"],
    privateStoreId: item["privateStoreId"],
    eTag: item["eTag"],
    privateStoreName: item["privateStoreName"],
    tenantId: item["tenantId"],
    isGov: item["isGov"],
    collectionIds: !item["collectionIds"]
      ? item["collectionIds"]
      : item["collectionIds"].map((p: any) => {
          return p;
        }),
    branding: !item["branding"]
      ? item["branding"]
      : Object.fromEntries(Object.entries(item["branding"]).map(([k, p]: [string, any]) => [k, p])),
    ...(!item["notificationsSettings"]
      ? item["notificationsSettings"]
      : _privateStorePropertiesNotificationsSettingsDeserializer(item["notificationsSettings"])),
  };
}

/** Indicates private store availability */
export enum KnownAvailability {
  /** enabled */
  Enabled = "enabled",
  /** disabled */
  Disabled = "disabled",
}

/**
 * Indicates private store availability \
 * {@link KnownAvailability} can be used interchangeably with Availability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type Availability = string;

/** Describes the json payload for notifications settings */
export interface NotificationsSettingsProperties {
  /** Gets or sets list of notified recipients for new requests */
  recipients?: Recipient[];
  /** Gets or sets whether to send email to all marketplace admins for new requests */
  sendToAllMarketplaceAdmins?: boolean;
}

export function notificationsSettingsPropertiesSerializer(
  item: NotificationsSettingsProperties,
): any {
  return {
    recipients: !item["recipients"]
      ? item["recipients"]
      : recipientArraySerializer(item["recipients"]),
    sendToAllMarketplaceAdmins: item["sendToAllMarketplaceAdmins"],
  };
}

export function notificationsSettingsPropertiesDeserializer(
  item: any,
): NotificationsSettingsProperties {
  return {
    recipients: !item["recipients"]
      ? item["recipients"]
      : recipientArrayDeserializer(item["recipients"]),
    sendToAllMarketplaceAdmins: item["sendToAllMarketplaceAdmins"],
  };
}

export function recipientArraySerializer(result: Array<Recipient>): any[] {
  return result.map((item) => {
    return recipientSerializer(item);
  });
}

export function recipientArrayDeserializer(result: Array<Recipient>): any[] {
  return result.map((item) => {
    return recipientDeserializer(item);
  });
}

/** Describes the json payload for a notified recipient for new requests */
export interface Recipient {
  /** Principal ID */
  principalId?: string;
  /** Email Address */
  readonly emailAddress?: string;
  /** Display Name */
  readonly displayName?: string;
}

export function recipientSerializer(item: Recipient): any {
  return { principalId: item["principalId"] };
}

export function recipientDeserializer(item: any): Recipient {
  return {
    principalId: item["principalId"],
    emailAddress: item["emailAddress"],
    displayName: item["displayName"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
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

export function resourceSerializer(item: Resource): any {
  return item;
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

/** Describes the json payload for the list of available private stores (between zero and one, inclusive) */
export interface _PrivateStoreList {
  /** The PrivateStore items on this page */
  value: PrivateStore[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateStoreListDeserializer(item: any): _PrivateStoreList {
  return {
    value: privateStoreArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateStoreArraySerializer(result: Array<PrivateStore>): any[] {
  return result.map((item) => {
    return privateStoreSerializer(item);
  });
}

export function privateStoreArrayDeserializer(result: Array<PrivateStore>): any[] {
  return result.map((item) => {
    return privateStoreDeserializer(item);
  });
}

/** Response object of query if are there existing offers in the collections. */
export interface AnyExistingOffersInTheCollectionsResponse {
  /** Boolean answer, true if exists at least a single offer in an enabled collection, otherwise, false. */
  value?: boolean;
}

export function anyExistingOffersInTheCollectionsResponseDeserializer(
  item: any,
): AnyExistingOffersInTheCollectionsResponse {
  return {
    value: item["value"],
  };
}

/** List of offers */
export interface QueryOffers {
  value?: OfferProperties[];
  /** URL to get the next set of PrivateStore list results if there are any. */
  nextLink?: string;
}

export function queryOffersDeserializer(item: any): QueryOffers {
  return {
    value: !item["value"] ? item["value"] : offerPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function offerPropertiesArraySerializer(result: Array<OfferProperties>): any[] {
  return result.map((item) => {
    return offerPropertiesSerializer(item);
  });
}

export function offerPropertiesArrayDeserializer(result: Array<OfferProperties>): any[] {
  return result.map((item) => {
    return offerPropertiesDeserializer(item);
  });
}

/** model interface OfferProperties */
export interface OfferProperties {
  /** Offers unique id */
  readonly uniqueOfferId?: string;
  /** It will be displayed prominently in the marketplace */
  readonly offerDisplayName?: string;
  /** Publisher name that will be displayed prominently in the marketplace */
  readonly publisherDisplayName?: string;
  /** Identifier for purposes of race condition */
  eTag?: string;
  /** Private store unique id */
  readonly privateStoreId?: string;
  /** Private store offer creation date */
  readonly createdAt?: string;
  /** Private store offer modification date */
  readonly modifiedAt?: string;
  /** Plan ids limitation for this offer */
  specificPlanIdsLimitation?: string[];
  /** Indicating whether the offer was not updated to db (true = not updated). If the allow list is identical to the existed one in db, the offer would not be updated. */
  updateSuppressedDueIdempotence?: boolean;
  /** Icon File Uris */
  iconFileUris?: Record<string, string>;
  /** Indicating whether the offer is stop sell or not. */
  readonly isStopSell?: boolean;
  /** Offer plans */
  plans?: Plan[];
}

export function offerPropertiesSerializer(item: OfferProperties): any {
  return {
    eTag: item["eTag"],
    specificPlanIdsLimitation: !item["specificPlanIdsLimitation"]
      ? item["specificPlanIdsLimitation"]
      : item["specificPlanIdsLimitation"].map((p: any) => {
          return p;
        }),
    updateSuppressedDueIdempotence: item["updateSuppressedDueIdempotence"],
    iconFileUris: item["iconFileUris"],
    plans: !item["plans"] ? item["plans"] : planArraySerializer(item["plans"]),
  };
}

export function offerPropertiesDeserializer(item: any): OfferProperties {
  return {
    uniqueOfferId: item["uniqueOfferId"],
    offerDisplayName: item["offerDisplayName"],
    publisherDisplayName: item["publisherDisplayName"],
    eTag: item["eTag"],
    privateStoreId: item["privateStoreId"],
    createdAt: item["createdAt"],
    modifiedAt: item["modifiedAt"],
    specificPlanIdsLimitation: !item["specificPlanIdsLimitation"]
      ? item["specificPlanIdsLimitation"]
      : item["specificPlanIdsLimitation"].map((p: any) => {
          return p;
        }),
    updateSuppressedDueIdempotence: item["updateSuppressedDueIdempotence"],
    iconFileUris: !item["iconFileUris"]
      ? item["iconFileUris"]
      : Object.fromEntries(
          Object.entries(item["iconFileUris"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    isStopSell: item["isStopSell"],
    plans: !item["plans"] ? item["plans"] : planArrayDeserializer(item["plans"]),
  };
}

export function planArraySerializer(result: Array<Plan>): any[] {
  return result.map((item) => {
    return planSerializer(item);
  });
}

export function planArrayDeserializer(result: Array<Plan>): any[] {
  return result.map((item) => {
    return planDeserializer(item);
  });
}

/** model interface Plan */
export interface Plan {
  /** Identifier for this plan */
  readonly skuId?: string;
  /** Text identifier for this plan */
  readonly planId?: string;
  /** Friendly name for the plan for display in the marketplace */
  readonly planDisplayName?: string;
  /** Plan accessibility */
  accessibility?: Accessibility;
  /** Alternative stack type */
  readonly altStackReference?: string;
  /** Stack type (classic or arm) */
  readonly stackType?: string;
  /** Indicating whether the plan is stop sell or not. */
  readonly isStopSell?: boolean;
}

export function planSerializer(item: Plan): any {
  return { accessibility: item["accessibility"] };
}

export function planDeserializer(item: any): Plan {
  return {
    skuId: item["skuId"],
    planId: item["planId"],
    planDisplayName: item["planDisplayName"],
    accessibility: item["accessibility"],
    altStackReference: item["altStackReference"],
    stackType: item["stackType"],
    isStopSell: item["isStopSell"],
  };
}

/** Plan accessibility */
export enum KnownAccessibility {
  /** Unknown */
  Unknown = "Unknown",
  /** Public */
  Public = "Public",
  /** PrivateTenantOnLevel */
  PrivateTenantOnLevel = "PrivateTenantOnLevel",
  /** PrivateSubscriptionOnLevel */
  PrivateSubscriptionOnLevel = "PrivateSubscriptionOnLevel",
}

/**
 * Plan accessibility \
 * {@link KnownAccessibility} can be used interchangeably with Accessibility,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Public** \
 * **PrivateTenantOnLevel** \
 * **PrivateSubscriptionOnLevel**
 */
export type Accessibility = string;

/** Query user's offers properties */
export interface QueryUserOffersProperties {
  /** List of offer IDs */
  offerIds?: string[];
  /** List of subscription IDs */
  subscriptionIds?: string[];
}

export function queryUserOffersPropertiesSerializer(item: QueryUserOffersProperties): any {
  return {
    properties: areAllPropsUndefined(item, ["offerIds", "subscriptionIds"])
      ? undefined
      : _queryUserOffersPropertiesPropertiesSerializer(item),
  };
}

/** List of offers IDs and list of user's subscriptions IDs to query the user's approved offers */
export interface QueryUserOffersDetails {
  /** List of offer IDs */
  offerIds?: string[];
  /** List of subscription IDs */
  subscriptionIds?: string[];
}

export function queryUserOffersDetailsSerializer(item: QueryUserOffersDetails): any {
  return {
    offerIds: !item["offerIds"]
      ? item["offerIds"]
      : item["offerIds"].map((p: any) => {
          return p;
        }),
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Billing accounts response object */
export interface BillingAccountsResponse {
  /** Billing accounts list */
  billingAccounts?: string[];
}

export function billingAccountsResponseDeserializer(item: any): BillingAccountsResponse {
  return {
    billingAccounts: !item["billingAccounts"]
      ? item["billingAccounts"]
      : item["billingAccounts"].map((p: any) => {
          return p;
        }),
  };
}

/** The subscriptions list to get the related collections */
export interface CollectionsToSubscriptionsMappingPayload {
  /** Subscriptions ids list */
  properties?: CollectionsToSubscriptionsMappingProperties;
}

export function collectionsToSubscriptionsMappingPayloadSerializer(
  item: CollectionsToSubscriptionsMappingPayload,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : collectionsToSubscriptionsMappingPropertiesSerializer(item["properties"]),
  };
}

/** The subscriptions list to get the related collections */
export interface CollectionsToSubscriptionsMappingProperties {
  /** Subscriptions ids list */
  subscriptionIds?: string[];
}

export function collectionsToSubscriptionsMappingPropertiesSerializer(
  item: CollectionsToSubscriptionsMappingProperties,
): any {
  return {
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

/** A map of collections subscriptions details */
export interface CollectionsToSubscriptionsMappingResponse {
  /** The map of collections subscriptions */
  details?: Record<string, CollectionsSubscriptionsMappingDetails>;
}

export function collectionsToSubscriptionsMappingResponseDeserializer(
  item: any,
): CollectionsToSubscriptionsMappingResponse {
  return {
    details: !item["details"]
      ? item["details"]
      : collectionsSubscriptionsMappingDetailsRecordDeserializer(item["details"]),
  };
}

export function collectionsSubscriptionsMappingDetailsRecordDeserializer(
  item: Record<string, any>,
): Record<string, CollectionsSubscriptionsMappingDetails> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : collectionsSubscriptionsMappingDetailsDeserializer(item[key]);
  });
  return result;
}

/** Collection name and related subscriptions list */
export interface CollectionsSubscriptionsMappingDetails {
  /** Collection name */
  collectionName?: string;
  /** Subscriptions ids list */
  subscriptions?: string[];
}

export function collectionsSubscriptionsMappingDetailsDeserializer(
  item: any,
): CollectionsSubscriptionsMappingDetails {
  return {
    collectionName: item["collectionName"],
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
  };
}

/** Query approved plans payload */
export interface QueryApprovedPlansPayload {
  /** Offer id */
  offerId?: string;
  /** Offer plan ids */
  planIds?: string[];
  /** List of subscription IDs */
  subscriptionIds?: string[];
}

export function queryApprovedPlansPayloadSerializer(item: QueryApprovedPlansPayload): any {
  return {
    properties: areAllPropsUndefined(item, ["offerId", "planIds", "subscriptionIds"])
      ? undefined
      : _queryApprovedPlansPayloadPropertiesSerializer(item),
  };
}

/** Query approved plans details */
export interface QueryApprovedPlans {
  /** Offer id */
  offerId?: string;
  /** Offer plan ids */
  planIds?: string[];
  /** List of subscription IDs */
  subscriptionIds?: string[];
}

export function queryApprovedPlansSerializer(item: QueryApprovedPlans): any {
  return {
    offerId: item["offerId"],
    planIds: !item["planIds"]
      ? item["planIds"]
      : item["planIds"].map((p: any) => {
          return p;
        }),
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Query approved plans response */
export interface QueryApprovedPlansResponse {
  /** A list indicating for each plan which subscriptions are approved. Plan Id is unique */
  details?: QueryApprovedPlansDetails[];
}

export function queryApprovedPlansResponseDeserializer(item: any): QueryApprovedPlansResponse {
  return {
    details: !item["details"]
      ? item["details"]
      : queryApprovedPlansDetailsArrayDeserializer(item["details"]),
  };
}

export function queryApprovedPlansDetailsArrayDeserializer(
  result: Array<QueryApprovedPlansDetails>,
): any[] {
  return result.map((item) => {
    return queryApprovedPlansDetailsDeserializer(item);
  });
}

/** Query approved plans response */
export interface QueryApprovedPlansDetails {
  /** Plan id */
  planId?: string;
  /** Approved subscription ids list. In case all subscriptions are approved for a plan, allSubscriptions flag is true and list is empty ( else flag is set to false). In case both subscriptions list is empty and allSubscriptions flag is false, the plan is not approved for any subscription. */
  subscriptionIds?: string[];
  /** Indicates whether all subscriptions are approved for this plan */
  allSubscriptions?: boolean;
}

export function queryApprovedPlansDetailsDeserializer(item: any): QueryApprovedPlansDetails {
  return {
    planId: item["planId"],
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
    allSubscriptions: item["allSubscriptions"],
  };
}

/** Bulk collections action properties */
export interface BulkCollectionsPayload {
  /** collection ids list that the action is performed on */
  collectionIds?: string[];
  /** Action to perform (For example: EnableCollections, DisableCollections) */
  action?: string;
}

export function bulkCollectionsPayloadSerializer(item: BulkCollectionsPayload): any {
  return {
    properties: areAllPropsUndefined(item, ["collectionIds", "action"])
      ? undefined
      : _bulkCollectionsPayloadPropertiesSerializer(item),
  };
}

/** Bulk collection details */
export interface BulkCollectionsDetails {
  /** collection ids list that the action is performed on */
  collectionIds?: string[];
  /** Action to perform (For example: EnableCollections, DisableCollections) */
  action?: string;
}

export function bulkCollectionsDetailsSerializer(item: BulkCollectionsDetails): any {
  return {
    collectionIds: !item["collectionIds"]
      ? item["collectionIds"]
      : item["collectionIds"].map((p: any) => {
          return p;
        }),
    action: item["action"],
  };
}

/** The bulk collections response. The response contains two lists that indicate for each collection whether the operation succeeded or failed */
export interface BulkCollectionsResponse {
  /** Succeeded collections */
  succeeded?: CollectionsDetails[];
  /** Failed collections */
  failed?: CollectionsDetails[];
}

export function bulkCollectionsResponseDeserializer(item: any): BulkCollectionsResponse {
  return {
    succeeded: !item["succeeded"]
      ? item["succeeded"]
      : collectionsDetailsArrayDeserializer(item["succeeded"]),
    failed: !item["failed"] ? item["failed"] : collectionsDetailsArrayDeserializer(item["failed"]),
  };
}

export function collectionsDetailsArrayDeserializer(result: Array<CollectionsDetails>): any[] {
  return result.map((item) => {
    return collectionsDetailsDeserializer(item);
  });
}

/** Collection name and id. */
export interface CollectionsDetails {
  /** Collection name. */
  collectionName?: string;
  /** Collection id. */
  collectionId?: string;
}

export function collectionsDetailsDeserializer(item: any): CollectionsDetails {
  return {
    collectionName: item["collectionName"],
    collectionId: item["collectionId"],
  };
}

/** Get private store notifications state */
export interface PrivateStoreNotificationsState {
  stopSellNotifications?: StopSellNotifications[];
  newNotifications?: NewNotifications[];
  approvalRequests?: RequestApprovalsDetails[];
}

export function privateStoreNotificationsStateDeserializer(
  item: any,
): PrivateStoreNotificationsState {
  return {
    stopSellNotifications: !item["stopSellNotifications"]
      ? item["stopSellNotifications"]
      : stopSellNotificationsArrayDeserializer(item["stopSellNotifications"]),
    newNotifications: !item["newNotifications"]
      ? item["newNotifications"]
      : newNotificationsArrayDeserializer(item["newNotifications"]),
    approvalRequests: !item["approvalRequests"]
      ? item["approvalRequests"]
      : requestApprovalsDetailsArrayDeserializer(item["approvalRequests"]),
  };
}

export function stopSellNotificationsArrayDeserializer(
  result: Array<StopSellNotifications>,
): any[] {
  return result.map((item) => {
    return stopSellNotificationsDeserializer(item);
  });
}

/** Stop sell notification details */
export interface StopSellNotifications {
  /** Gets offer id */
  offerId?: string;
  /** Gets offer display name */
  displayName?: string;
  /** Gets a value indicating whether entire offer is in stop sell or only few of its plans */
  isEntire?: boolean;
  /** Gets or sets the notification message id */
  messageCode?: number;
  /** Gets or sets the icon url */
  icon?: string;
  /** Gets or sets removed plans notifications */
  plans?: PlanNotificationDetails[];
}

export function stopSellNotificationsDeserializer(item: any): StopSellNotifications {
  return {
    offerId: item["offerId"],
    displayName: item["displayName"],
    isEntire: item["isEntire"],
    messageCode: item["messageCode"],
    icon: item["icon"],
    plans: !item["plans"] ? item["plans"] : planNotificationDetailsArrayDeserializer(item["plans"]),
  };
}

export function planNotificationDetailsArrayDeserializer(
  result: Array<PlanNotificationDetails>,
): any[] {
  return result.map((item) => {
    return planNotificationDetailsDeserializer(item);
  });
}

/** Plan notification details */
export interface PlanNotificationDetails {
  /** Gets or sets the plan id */
  planId?: string;
  /** Gets or sets the plan display name */
  planDisplayName?: string;
}

export function planNotificationDetailsDeserializer(item: any): PlanNotificationDetails {
  return {
    planId: item["planId"],
    planDisplayName: item["planDisplayName"],
  };
}

export function newNotificationsArrayDeserializer(result: Array<NewNotifications>): any[] {
  return result.map((item) => {
    return newNotificationsDeserializer(item);
  });
}

/** New plans notification details */
export interface NewNotifications {
  /** Gets offer id */
  offerId?: string;
  /** Gets offer display name */
  displayName?: string;
  /** Gets a value indicating whether future plans is enabled. */
  isFuturePlansEnabled?: boolean;
  /** Gets or sets the notification message id */
  messageCode?: number;
  /** Gets or sets the icon url */
  icon?: string;
  /** Gets or sets removed plans notifications */
  plans?: PlanNotificationDetails[];
}

export function newNotificationsDeserializer(item: any): NewNotifications {
  return {
    offerId: item["offerId"],
    displayName: item["displayName"],
    isFuturePlansEnabled: item["isFuturePlansEnabled"],
    messageCode: item["messageCode"],
    icon: item["icon"],
    plans: !item["plans"] ? item["plans"] : planNotificationDetailsArrayDeserializer(item["plans"]),
  };
}

export function requestApprovalsDetailsArrayDeserializer(
  result: Array<RequestApprovalsDetails>,
): any[] {
  return result.map((item) => {
    return requestApprovalsDetailsDeserializer(item);
  });
}

/** Request approvals details */
export interface RequestApprovalsDetails {
  /** Gets offer id */
  offerId?: string;
  /** Gets offer display name */
  displayName?: string;
  /** Gets or sets publisher id */
  publisherId?: string;
  /** Gets or sets the notification message id */
  messageCode?: number;
  /** Gets or sets the icon url */
  icon?: string;
  /** Gets or sets removed plans notifications */
  plans?: PlanNotificationDetails[];
}

export function requestApprovalsDetailsDeserializer(item: any): RequestApprovalsDetails {
  return {
    offerId: item["offerId"],
    displayName: item["displayName"],
    publisherId: item["publisherId"],
    messageCode: item["messageCode"],
    icon: item["icon"],
    plans: !item["plans"] ? item["plans"] : planNotificationDetailsArrayDeserializer(item["plans"]),
  };
}

/** Notification update request payload */
export interface AcknowledgeOfferNotificationProperties {
  /** Gets or sets a value indicating whether acknowledge action flag is enabled */
  acknowledge?: boolean;
  /** Gets or sets a value indicating whether dismiss action flag is enabled */
  dismiss?: boolean;
  /** Gets or sets a value indicating whether remove offer action flag is enabled */
  removeOffer?: boolean;
  /** Gets or sets added plans */
  addPlans?: string[];
  /** Gets or sets remove plans */
  removePlans?: string[];
}

export function acknowledgeOfferNotificationPropertiesSerializer(
  item: AcknowledgeOfferNotificationProperties,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "acknowledge",
      "dismiss",
      "removeOffer",
      "addPlans",
      "removePlans",
    ])
      ? undefined
      : _acknowledgeOfferNotificationPropertiesPropertiesSerializer(item),
  };
}

/** Notification update request payload details */
export interface AcknowledgeOfferNotificationDetails {
  /** Gets or sets a value indicating whether acknowledge action flag is enabled */
  acknowledge?: boolean;
  /** Gets or sets a value indicating whether dismiss action flag is enabled */
  dismiss?: boolean;
  /** Gets or sets a value indicating whether remove offer action flag is enabled */
  removeOffer?: boolean;
  /** Gets or sets added plans */
  addPlans?: string[];
  /** Gets or sets remove plans */
  removePlans?: string[];
}

export function acknowledgeOfferNotificationDetailsSerializer(
  item: AcknowledgeOfferNotificationDetails,
): any {
  return {
    acknowledge: item["acknowledge"],
    dismiss: item["dismiss"],
    removeOffer: item["removeOffer"],
    addPlans: !item["addPlans"]
      ? item["addPlans"]
      : item["addPlans"].map((p: any) => {
          return p;
        }),
    removePlans: !item["removePlans"]
      ? item["removePlans"]
      : item["removePlans"].map((p: any) => {
          return p;
        }),
  };
}

/** Subscription list operation response. */
export interface SubscriptionsResponse {
  /** An array of subscriptions. */
  readonly value?: Subscription[];
  /** The skip token to retrieve the next page. */
  readonly skipToken?: string;
  /** Number of subscriptions on the page */
  readonly count?: number;
}

export function subscriptionsResponseDeserializer(item: any): SubscriptionsResponse {
  return {
    value: !item["value"] ? item["value"] : subscriptionArrayDeserializer(item["value"]),
    skipToken: item["skipToken"],
    count: item["count"],
  };
}

export function subscriptionArrayDeserializer(result: Array<Subscription>): any[] {
  return result.map((item) => {
    return subscriptionDeserializer(item);
  });
}

/** Subscription information. */
export interface Subscription {
  /** The fully qualified ID for the subscription. For example, /subscriptions/00000000-0000-0000-0000-000000000000. */
  readonly id?: string;
  /** The subscription ID. */
  readonly subscriptionId?: string;
  /** The subscription display name. */
  readonly displayName?: string;
  /** The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted. */
  readonly state?: SubscriptionState;
}

export function subscriptionDeserializer(item: any): Subscription {
  return {
    id: item["id"],
    subscriptionId: item["subscriptionId"],
    displayName: item["displayName"],
    state: item["state"],
  };
}

/** The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted. */
export enum KnownSubscriptionState {
  /** Enabled */
  Enabled = "Enabled",
  /** Warned */
  Warned = "Warned",
  /** PastDue */
  PastDue = "PastDue",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * The subscription state. Possible values are Enabled, Warned, PastDue, Disabled, and Deleted. \
 * {@link KnownSubscriptionState} can be used interchangeably with SubscriptionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Warned** \
 * **PastDue** \
 * **Disabled** \
 * **Deleted**
 */
export type SubscriptionState = string;

/** List of all new plans notifications for public offers */
export interface NewPlansNotificationsList {
  newPlansNotifications?: NewNotifications[];
}

export function newPlansNotificationsListDeserializer(item: any): NewPlansNotificationsList {
  return {
    newPlansNotifications: !item["newPlansNotifications"]
      ? item["newPlansNotifications"]
      : newNotificationsArrayDeserializer(item["newPlansNotifications"]),
  };
}

/** Private plans subscriptions */
export interface StopSellSubscriptions {
  subscriptions?: string[];
}

export function stopSellSubscriptionsSerializer(item: StopSellSubscriptions): any {
  return {
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : item["subscriptions"].map((p: any) => {
          return p;
        }),
  };
}

/** List of stop sell offers and plans notifications. */
export interface StopSellOffersPlansNotificationsList {
  stopSellNotifications?: StopSellOffersPlansNotificationsListProperties[];
}

export function stopSellOffersPlansNotificationsListDeserializer(
  item: any,
): StopSellOffersPlansNotificationsList {
  return {
    stopSellNotifications: !item["stopSellNotifications"]
      ? item["stopSellNotifications"]
      : stopSellOffersPlansNotificationsListPropertiesArrayDeserializer(
          item["stopSellNotifications"],
        ),
  };
}

export function stopSellOffersPlansNotificationsListPropertiesArrayDeserializer(
  result: Array<StopSellOffersPlansNotificationsListProperties>,
): any[] {
  return result.map((item) => {
    return stopSellOffersPlansNotificationsListPropertiesDeserializer(item);
  });
}

/** List of stop sell offers and plans notifications. */
export interface StopSellOffersPlansNotificationsListProperties {
  /** The offer id */
  readonly offerId?: string;
  /** The offer display name */
  readonly displayName?: string;
  /** A value indicating whether entire offer is in stop sell or only few of its plans */
  readonly isEntire?: boolean;
  /** The notification message code */
  readonly messageCode?: number;
  /** The icon url */
  readonly icon?: string;
  /** The list of removed plans notifications */
  readonly plans?: PlanNotificationDetails[];
  /** True if the offer has public plans */
  readonly publicContext?: boolean;
  /** The subscriptions related to private plans */
  readonly subscriptionsIds?: string[];
}

export function stopSellOffersPlansNotificationsListPropertiesDeserializer(
  item: any,
): StopSellOffersPlansNotificationsListProperties {
  return {
    offerId: item["offerId"],
    displayName: item["displayName"],
    isEntire: item["isEntire"],
    messageCode: item["messageCode"],
    icon: item["icon"],
    plans: !item["plans"] ? item["plans"] : planNotificationDetailsArrayDeserializer(item["plans"]),
    publicContext: item["publicContext"],
    subscriptionsIds: !item["subscriptionsIds"]
      ? item["subscriptionsIds"]
      : item["subscriptionsIds"].map((p: any) => {
          return p;
        }),
  };
}

/** List of subscription Ids in the private store */
export interface SubscriptionsContextList {
  subscriptionsIds?: string[];
}

export function subscriptionsContextListDeserializer(item: any): SubscriptionsContextList {
  return {
    subscriptionsIds: !item["subscriptionsIds"]
      ? item["subscriptionsIds"]
      : item["subscriptionsIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Request approval resource. */
export interface RequestApprovalResource extends ProxyResource {
  /** Gets or sets unique offer id. */
  offerId?: string;
  /** Gets offer display name */
  readonly offerDisplayName?: string;
  /** The offer's publisher id */
  publisherId?: string;
  /** Gets or sets the plans details */
  plansDetails?: PlanDetails[];
  /** Gets a value indicating whether the request is closed */
  readonly isClosed?: boolean;
  /** Gets or sets the request approval message code */
  messageCode?: number;
}

export function requestApprovalResourceSerializer(item: RequestApprovalResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "offerId",
      "publisherId",
      "plansDetails",
      "messageCode",
    ])
      ? undefined
      : _requestApprovalResourcePropertiesSerializer(item),
  };
}

export function requestApprovalResourceDeserializer(item: any): RequestApprovalResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _requestApprovalResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Approval request resource properties */
export interface RequestApprovalProperties {
  /** Gets or sets unique offer id. */
  offerId?: string;
  /** Gets offer display name */
  readonly offerDisplayName?: string;
  /** The offer's publisher id */
  publisherId?: string;
  /** Gets or sets the plans details */
  plansDetails?: PlanDetails[];
  /** Gets a value indicating whether the request is closed */
  readonly isClosed?: boolean;
  /** Gets or sets the request approval message code */
  messageCode?: number;
}

export function requestApprovalPropertiesSerializer(item: RequestApprovalProperties): any {
  return {
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    plansDetails: !item["plansDetails"]
      ? item["plansDetails"]
      : planDetailsArraySerializer(item["plansDetails"]),
    messageCode: item["messageCode"],
  };
}

export function requestApprovalPropertiesDeserializer(item: any): RequestApprovalProperties {
  return {
    offerId: item["offerId"],
    offerDisplayName: item["offerDisplayName"],
    publisherId: item["publisherId"],
    plansDetails: !item["plansDetails"]
      ? item["plansDetails"]
      : planDetailsArrayDeserializer(item["plansDetails"]),
    isClosed: item["isClosed"],
    messageCode: item["messageCode"],
  };
}

export function planDetailsArraySerializer(result: Array<PlanDetails>): any[] {
  return result.map((item) => {
    return planDetailsSerializer(item);
  });
}

export function planDetailsArrayDeserializer(result: Array<PlanDetails>): any[] {
  return result.map((item) => {
    return planDetailsDeserializer(item);
  });
}

/** Return plan with request details */
export interface PlanDetails {
  /** Gets or sets Plan Id */
  planId?: string;
  /** Gets the plan status */
  readonly status?: Status;
  /** Gets request date */
  readonly requestDate?: any;
  /** Gets or sets user's justification for the plan's request */
  justification?: string;
  /** Gets or sets the subscription id that the user is requesting to add the plan to */
  subscriptionId?: string;
  /** Gets or sets the subscription name that the user is requesting to add the plan to */
  subscriptionName?: string;
}

export function planDetailsSerializer(item: PlanDetails): any {
  return {
    planId: item["planId"],
    justification: item["justification"],
    subscriptionId: item["subscriptionId"],
    subscriptionName: item["subscriptionName"],
  };
}

export function planDetailsDeserializer(item: any): PlanDetails {
  return {
    planId: item["planId"],
    status: item["status"],
    requestDate: item["requestDate"],
    justification: item["justification"],
    subscriptionId: item["subscriptionId"],
    subscriptionName: item["subscriptionName"],
  };
}

/** Gets the plan status */
export enum KnownStatus {
  /** Pending */
  Pending = "Pending",
  /** Rejected */
  Rejected = "Rejected",
  /** Approved */
  Approved = "Approved",
  /** None */
  None = "None",
}

/**
 * Gets the plan status \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Rejected** \
 * **Approved** \
 * **None**
 */
export type Status = string;

/** List of admin request approval resources */
export interface RequestApprovalsList {
  value?: RequestApprovalResource[];
  /** URL to get the next set of notifications list results if there are any. */
  readonly nextLink?: string;
}

export function requestApprovalsListDeserializer(item: any): RequestApprovalsList {
  return {
    value: !item["value"] ? item["value"] : requestApprovalResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function requestApprovalResourceArraySerializer(
  result: Array<RequestApprovalResource>,
): any[] {
  return result.map((item) => {
    return requestApprovalResourceSerializer(item);
  });
}

export function requestApprovalResourceArrayDeserializer(
  result: Array<RequestApprovalResource>,
): any[] {
  return result.map((item) => {
    return requestApprovalResourceDeserializer(item);
  });
}

/** The details to get the request plans statuses */
export interface QueryRequestApprovalProperties {
  /** The details to get the request plans statuses */
  properties?: RequestDetails;
}

export function queryRequestApprovalPropertiesSerializer(
  item: QueryRequestApprovalProperties,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : requestDetailsSerializer(item["properties"]),
  };
}

/** Request details needed to get the plans statuses */
export interface RequestDetails {
  /** The offer's publisher id */
  publisherId?: string;
  /** Current plans list */
  planIds?: string[];
  /** Gets or sets the subscription id */
  subscriptionId?: string;
}

export function requestDetailsSerializer(item: RequestDetails): any {
  return {
    publisherId: item["publisherId"],
    planIds: !item["planIds"]
      ? item["planIds"]
      : item["planIds"].map((p: any) => {
          return p;
        }),
    subscriptionId: item["subscriptionId"],
  };
}

/** Gets the request plans with indication on each plan whether is approved by the admin, has pending request or not requested yet */
export interface QueryRequestApproval {
  /** Gets or sets unique offer id. */
  uniqueOfferId?: string;
  /** Gets or sets the plans details */
  plansDetails?: Record<string, PlanDetails>;
  /** Gets or sets e-tag field */
  etag?: string;
  /** Gets or sets the notification message id */
  messageCode?: number;
}

export function queryRequestApprovalDeserializer(item: any): QueryRequestApproval {
  return {
    uniqueOfferId: item["uniqueOfferId"],
    plansDetails: !item["plansDetails"]
      ? item["plansDetails"]
      : planDetailsRecordDeserializer(item["plansDetails"]),
    etag: item["etag"],
    messageCode: item["messageCode"],
  };
}

export function planDetailsRecordSerializer(
  item: Record<string, PlanDetails>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : planDetailsSerializer(item[key]);
  });
  return result;
}

export function planDetailsRecordDeserializer(
  item: Record<string, any>,
): Record<string, PlanDetails> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : planDetailsDeserializer(item[key]);
  });
  return result;
}

/** Withdraw properties */
export interface WithdrawProperties {
  /** Gets or sets Plan Id */
  planId?: string;
  /** The offer's publisher id */
  publisherId?: string;
}

export function withdrawPropertiesSerializer(item: WithdrawProperties): any {
  return {
    properties: areAllPropsUndefined(item, ["planId", "publisherId"])
      ? undefined
      : _withdrawPropertiesPropertiesSerializer(item),
  };
}

/** Withdraw properties details */
export interface WithdrawDetails {
  /** Gets or sets Plan Id */
  planId?: string;
  /** The offer's publisher id */
  publisherId?: string;
}

export function withdrawDetailsSerializer(item: WithdrawDetails): any {
  return { planId: item["planId"], publisherId: item["publisherId"] };
}

/** Admin request approval resource. */
export interface AdminRequestApprovalsResource extends ProxyResource {
  /** Gets or sets offer Id */
  offerId?: string;
  /** Gets display name */
  readonly displayName?: string;
  /** Gets or sets publisher Id */
  publisherId?: string;
  /** Gets or sets admin action */
  adminAction?: AdminAction;
  /** Gets or sets Approved plans ids, empty in case of rejected */
  approvedPlans?: string[];
  /** Gets or sets admin comment */
  comment?: string;
  /** Gets or sets admin details */
  administrator?: string;
  /** Gets list of plans with requesters details */
  readonly plans?: PlanRequesterDetails[];
  /** Gets or sets list of associated collection ids */
  collectionIds?: string[];
  /** The offer icon url. */
  readonly icon?: string;
}

export function adminRequestApprovalsResourceSerializer(item: AdminRequestApprovalsResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "offerId",
      "publisherId",
      "adminAction",
      "approvedPlans",
      "comment",
      "administrator",
      "collectionIds",
    ])
      ? undefined
      : _adminRequestApprovalsResourcePropertiesSerializer(item),
  };
}

export function adminRequestApprovalsResourceDeserializer(
  item: any,
): AdminRequestApprovalsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _adminRequestApprovalsResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Admin approval request resource properties */
export interface AdminRequestApprovalProperties {
  /** Gets or sets offer Id */
  offerId?: string;
  /** Gets display name */
  readonly displayName?: string;
  /** Gets or sets publisher Id */
  publisherId?: string;
  /** Gets or sets admin action */
  adminAction?: AdminAction;
  /** Gets or sets Approved plans ids, empty in case of rejected */
  approvedPlans?: string[];
  /** Gets or sets admin comment */
  comment?: string;
  /** Gets or sets admin details */
  administrator?: string;
  /** Gets list of plans with requesters details */
  readonly plans?: PlanRequesterDetails[];
  /** Gets or sets list of associated collection ids */
  collectionIds?: string[];
  /** The offer icon url. */
  readonly icon?: string;
}

export function adminRequestApprovalPropertiesSerializer(
  item: AdminRequestApprovalProperties,
): any {
  return {
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    adminAction: item["adminAction"],
    approvedPlans: !item["approvedPlans"]
      ? item["approvedPlans"]
      : item["approvedPlans"].map((p: any) => {
          return p;
        }),
    comment: item["comment"],
    administrator: item["administrator"],
    collectionIds: !item["collectionIds"]
      ? item["collectionIds"]
      : item["collectionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function adminRequestApprovalPropertiesDeserializer(
  item: any,
): AdminRequestApprovalProperties {
  return {
    offerId: item["offerId"],
    displayName: item["displayName"],
    publisherId: item["publisherId"],
    adminAction: item["adminAction"],
    approvedPlans: !item["approvedPlans"]
      ? item["approvedPlans"]
      : item["approvedPlans"].map((p: any) => {
          return p;
        }),
    comment: item["comment"],
    administrator: item["administrator"],
    plans: !item["plans"] ? item["plans"] : planRequesterDetailsArrayDeserializer(item["plans"]),
    collectionIds: !item["collectionIds"]
      ? item["collectionIds"]
      : item["collectionIds"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
  };
}

/** Gets or sets admin action */
export enum KnownAdminAction {
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
}

/**
 * Gets or sets admin action \
 * {@link KnownAdminAction} can be used interchangeably with AdminAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved** \
 * **Rejected**
 */
export type AdminAction = string;

export function planRequesterDetailsArrayDeserializer(result: Array<PlanRequesterDetails>): any[] {
  return result.map((item) => {
    return planRequesterDetailsDeserializer(item);
  });
}

/** Plan with requesters details */
export interface PlanRequesterDetails {
  /** Gets the plan id */
  readonly planId?: string;
  /** Gets the plan display name */
  readonly planDisplayName?: string;
  /** Gets requesters details list */
  readonly requesters?: UserRequestDetails[];
}

export function planRequesterDetailsDeserializer(item: any): PlanRequesterDetails {
  return {
    planId: item["planId"],
    planDisplayName: item["planDisplayName"],
    requesters: !item["requesters"]
      ? item["requesters"]
      : userRequestDetailsArrayDeserializer(item["requesters"]),
  };
}

export function userRequestDetailsArrayDeserializer(result: Array<UserRequestDetails>): any[] {
  return result.map((item) => {
    return userRequestDetailsDeserializer(item);
  });
}

/** user request details */
export interface UserRequestDetails {
  /** Gets user id */
  readonly user?: string;
  /** Gets request date */
  readonly date?: string;
  /** Gets justification */
  readonly justification?: string;
  /** Gets the subscription id that the user is requesting to add the plan to */
  subscriptionId?: string;
  /** Gets the subscription name that the user is requesting to add the plan to */
  subscriptionName?: string;
}

export function userRequestDetailsDeserializer(item: any): UserRequestDetails {
  return {
    user: item["user"],
    date: item["date"],
    justification: item["justification"],
    subscriptionId: item["subscriptionId"],
    subscriptionName: item["subscriptionName"],
  };
}

/** List of admin request approval resources */
export interface AdminRequestApprovalsList {
  value?: AdminRequestApprovalsResource[];
  /** URL to get the next set of notifications list results if there are any. */
  readonly nextLink?: string;
}

export function adminRequestApprovalsListDeserializer(item: any): AdminRequestApprovalsList {
  return {
    value: !item["value"]
      ? item["value"]
      : adminRequestApprovalsResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function adminRequestApprovalsResourceArraySerializer(
  result: Array<AdminRequestApprovalsResource>,
): any[] {
  return result.map((item) => {
    return adminRequestApprovalsResourceSerializer(item);
  });
}

export function adminRequestApprovalsResourceArrayDeserializer(
  result: Array<AdminRequestApprovalsResource>,
): any[] {
  return result.map((item) => {
    return adminRequestApprovalsResourceDeserializer(item);
  });
}

/** The Collection data structure. */
export interface Collection extends ProxyResource {
  /** Gets collection Id. */
  readonly collectionId?: string;
  /** Gets or sets collection name. */
  collectionName?: string;
  /** Gets or sets the association with Commercial's Billing Account. */
  claim?: string;
  /** Indicating whether all subscriptions are selected (=true) or not (=false). */
  allSubscriptions?: boolean;
  /** Indicating whether all items are approved for this collection (=true) or not (=false). */
  readonly approveAllItems?: boolean;
  /** Gets the modified date of all items approved. */
  readonly approveAllItemsModifiedAt?: Date;
  /** Gets or sets subscription ids list. Empty list indicates all subscriptions are selected, null indicates no update is done, explicit list indicates the explicit selected subscriptions. On insert, null is considered as bad request */
  subscriptionsList?: string[];
  /** Indicating whether the collection is enabled or disabled. */
  enabled?: boolean;
  /** Gets the number of offers associated with the collection. */
  readonly numberOfOffers?: number;
  /** Gets list of collection rules */
  readonly appliedRules?: Rule[];
}

export function collectionSerializer(item: Collection): any {
  return {
    properties: areAllPropsUndefined(item, [
      "collectionName",
      "claim",
      "allSubscriptions",
      "subscriptionsList",
      "enabled",
    ])
      ? undefined
      : _collectionPropertiesSerializer(item),
  };
}

export function collectionDeserializer(item: any): Collection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _collectionPropertiesDeserializer(item["properties"])),
  };
}

/** The collection details */
export interface CollectionProperties {
  /** Gets collection Id. */
  readonly collectionId?: string;
  /** Gets or sets collection name. */
  collectionName?: string;
  /** Gets or sets the association with Commercial's Billing Account. */
  claim?: string;
  /** Indicating whether all subscriptions are selected (=true) or not (=false). */
  allSubscriptions?: boolean;
  /** Indicating whether all items are approved for this collection (=true) or not (=false). */
  readonly approveAllItems?: boolean;
  /** Gets the modified date of all items approved. */
  readonly approveAllItemsModifiedAt?: Date;
  /** Gets or sets subscription ids list. Empty list indicates all subscriptions are selected, null indicates no update is done, explicit list indicates the explicit selected subscriptions. On insert, null is considered as bad request */
  subscriptionsList?: string[];
  /** Indicating whether the collection is enabled or disabled. */
  enabled?: boolean;
  /** Gets the number of offers associated with the collection. */
  readonly numberOfOffers?: number;
  /** Gets list of collection rules */
  readonly appliedRules?: Rule[];
}

export function collectionPropertiesSerializer(item: CollectionProperties): any {
  return {
    collectionName: item["collectionName"],
    claim: item["claim"],
    allSubscriptions: item["allSubscriptions"],
    subscriptionsList: !item["subscriptionsList"]
      ? item["subscriptionsList"]
      : item["subscriptionsList"].map((p: any) => {
          return p;
        }),
    enabled: item["enabled"],
  };
}

export function collectionPropertiesDeserializer(item: any): CollectionProperties {
  return {
    collectionId: item["collectionId"],
    collectionName: item["collectionName"],
    claim: item["claim"],
    allSubscriptions: item["allSubscriptions"],
    approveAllItems: item["approveAllItems"],
    approveAllItemsModifiedAt: !item["approveAllItemsModifiedAt"]
      ? item["approveAllItemsModifiedAt"]
      : new Date(item["approveAllItemsModifiedAt"]),
    subscriptionsList: !item["subscriptionsList"]
      ? item["subscriptionsList"]
      : item["subscriptionsList"].map((p: any) => {
          return p;
        }),
    enabled: item["enabled"],
    numberOfOffers: item["numberOfOffers"],
    appliedRules: !item["appliedRules"]
      ? item["appliedRules"]
      : ruleArrayDeserializer(item["appliedRules"]),
  };
}

/** model interface CollectionsList */
export interface CollectionsList {
  value?: Collection[];
  /** URL to get the next set of offer list results if there are any. */
  nextLink?: string;
}

export function collectionsListDeserializer(item: any): CollectionsList {
  return {
    value: !item["value"] ? item["value"] : collectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function collectionArraySerializer(result: Array<Collection>): any[] {
  return result.map((item) => {
    return collectionSerializer(item);
  });
}

export function collectionArrayDeserializer(result: Array<Collection>): any[] {
  return result.map((item) => {
    return collectionDeserializer(item);
  });
}

/** Transfer offers properties */
export interface TransferOffersProperties {
  /** Target collections ids */
  targetCollections?: string[];
  /** Operation to perform (For example: Copy or Move) */
  operation?: string;
  /** Offers ids list to transfer from source collection to target collection(s) */
  offerIdsList?: string[];
}

export function transferOffersPropertiesSerializer(item: TransferOffersProperties): any {
  return {
    properties: areAllPropsUndefined(item, ["targetCollections", "operation", "offerIdsList"])
      ? undefined
      : _transferOffersPropertiesPropertiesSerializer(item),
  };
}

/** Transfer offers response details */
export interface TransferOffersDetails {
  /** Target collections ids */
  targetCollections?: string[];
  /** Operation to perform (For example: Copy or Move) */
  operation?: string;
  /** Offers ids list to transfer from source collection to target collection(s) */
  offerIdsList?: string[];
}

export function transferOffersDetailsSerializer(item: TransferOffersDetails): any {
  return {
    targetCollections: !item["targetCollections"]
      ? item["targetCollections"]
      : item["targetCollections"].map((p: any) => {
          return p;
        }),
    operation: item["operation"],
    offerIdsList: !item["offerIdsList"]
      ? item["offerIdsList"]
      : item["offerIdsList"].map((p: any) => {
          return p;
        }),
  };
}

/** The transfer items response. The response contains two lists that indicate for each collection whether the operation succeeded or failed */
export interface TransferOffersResponse {
  /** Succeeded collections */
  succeeded?: CollectionsDetails[];
  /** Failed collections */
  failed?: CollectionsDetails[];
}

export function transferOffersResponseDeserializer(item: any): TransferOffersResponse {
  return {
    succeeded: !item["succeeded"]
      ? item["succeeded"]
      : collectionsDetailsArrayDeserializer(item["succeeded"]),
    failed: !item["failed"] ? item["failed"] : collectionsDetailsArrayDeserializer(item["failed"]),
  };
}

/** Suggested subscription list */
export interface CollectionOffersByAllContextsPayload {
  /** Subscription ids list */
  subscriptionIds?: string[];
}

export function collectionOffersByAllContextsPayloadSerializer(
  item: CollectionOffersByAllContextsPayload,
): any {
  return {
    properties: areAllPropsUndefined(item, ["subscriptionIds"])
      ? undefined
      : _collectionOffersByAllContextsPayloadPropertiesSerializer(item),
  };
}

/** Suggested subscription list */
export interface CollectionOffersByAllContextsProperties {
  /** Subscription ids list */
  subscriptionIds?: string[];
}

export function collectionOffersByAllContextsPropertiesSerializer(
  item: CollectionOffersByAllContextsProperties,
): any {
  return {
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

/** List of objects which describes offers per context. An empty GUID is a public context. */
export interface _CollectionOffersByContextList {
  readonly value?: CollectionOffersByContext[];
  /** URL to get the next set of offer list per context results if there are any. */
  nextLink?: string;
}

export function _collectionOffersByContextListDeserializer(
  item: any,
): _CollectionOffersByContextList {
  return {
    value: !item["value"]
      ? item["value"]
      : collectionOffersByContextArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function collectionOffersByContextArrayDeserializer(
  result: Array<CollectionOffersByContext>,
): any[] {
  return result.map((item) => {
    return collectionOffersByContextDeserializer(item);
  });
}

/** List of offers and plans that restricted to the context */
export interface CollectionOffersByContext {
  /** Offer's context, e.g. subscription ID, tenant ID. */
  readonly context?: string;
  value?: OfferProperties[];
}

export function collectionOffersByContextDeserializer(item: any): CollectionOffersByContext {
  return {
    context: item["context"],
    ...(!item["offers"]
      ? item["offers"]
      : _collectionOffersByContextOffersDeserializer(item["offers"])),
  };
}

/** List of offers */
export interface CollectionOffersByContextOffers {
  value?: OfferProperties[];
}

export function collectionOffersByContextOffersDeserializer(
  item: any,
): CollectionOffersByContextOffers {
  return {
    value: !item["value"] ? item["value"] : offerPropertiesArrayDeserializer(item["value"]),
  };
}

/** The privateStore offer data structure. */
export interface Offer extends ProxyResource {
  /** Offers unique id */
  readonly uniqueOfferId?: string;
  /** It will be displayed prominently in the marketplace */
  readonly offerDisplayName?: string;
  /** Publisher name that will be displayed prominently in the marketplace */
  readonly publisherDisplayName?: string;
  /** Identifier for purposes of race condition */
  eTag?: string;
  /** Private store unique id */
  readonly privateStoreId?: string;
  /** Private store offer creation date */
  readonly createdAt?: string;
  /** Private store offer modification date */
  readonly modifiedAt?: string;
  /** Plan ids limitation for this offer */
  specificPlanIdsLimitation?: string[];
  /** Indicating whether the offer was not updated to db (true = not updated). If the allow list is identical to the existed one in db, the offer would not be updated. */
  updateSuppressedDueIdempotence?: boolean;
  /** Icon File Uris */
  iconFileUris?: Record<string, string>;
  /** Indicating whether the offer is stop sell or not. */
  readonly isStopSell?: boolean;
  /** Offer plans */
  plans?: Plan[];
}

export function offerSerializer(item: Offer): any {
  return {
    properties: areAllPropsUndefined(item, [
      "eTag",
      "specificPlanIdsLimitation",
      "updateSuppressedDueIdempotence",
      "iconFileUris",
      "plans",
    ])
      ? undefined
      : _offerPropertiesSerializer(item),
  };
}

export function offerDeserializer(item: any): Offer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _offerPropertiesDeserializer(item["properties"])),
  };
}

/** Paged collection of Offer items */
export interface _OfferListResponse {
  /** The Offer items on this page */
  value: Offer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _offerListResponseDeserializer(item: any): _OfferListResponse {
  return {
    value: offerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function offerArraySerializer(result: Array<Offer>): any[] {
  return result.map((item) => {
    return offerSerializer(item);
  });
}

export function offerArrayDeserializer(result: Array<Offer>): any[] {
  return result.map((item) => {
    return offerDeserializer(item);
  });
}

/** Payload object for upsert offer with multiple context and plans. */
export interface MultiContextAndPlansPayload {
  /** The offer ID which contains the plans. */
  offerId?: string;
  /** The offer's eTag. */
  eTag?: string;
  plansContext?: ContextAndPlansDetails[];
}

export function multiContextAndPlansPayloadSerializer(item: MultiContextAndPlansPayload): any {
  return {
    properties: areAllPropsUndefined(item, ["offerId", "eTag", "plansContext"])
      ? undefined
      : _multiContextAndPlansPayloadPropertiesSerializer(item),
  };
}

/** Object describes multiple context and plans. */
export interface MultiContextAndPlansProperties {
  /** The offer ID which contains the plans. */
  offerId?: string;
  /** The offer's eTag. */
  eTag?: string;
  plansContext?: ContextAndPlansDetails[];
}

export function multiContextAndPlansPropertiesSerializer(
  item: MultiContextAndPlansProperties,
): any {
  return {
    offerId: item["offerId"],
    eTag: item["eTag"],
    plansContext: !item["plansContext"]
      ? item["plansContext"]
      : contextAndPlansDetailsArraySerializer(item["plansContext"]),
  };
}

export function contextAndPlansDetailsArraySerializer(
  result: Array<ContextAndPlansDetails>,
): any[] {
  return result.map((item) => {
    return contextAndPlansDetailsSerializer(item);
  });
}

/** Object of plans per context. */
export interface ContextAndPlansDetails {
  /** Plan's context, e.g. subscription ID, tenant ID. */
  context?: string;
  /** List of plan IDs. */
  planIds?: string[];
}

export function contextAndPlansDetailsSerializer(item: ContextAndPlansDetails): any {
  return {
    context: item["context"],
    planIds: !item["planIds"]
      ? item["planIds"]
      : item["planIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Set the Operation for the POST method. Ping or Delete */
export enum KnownOperation {
  /** DeletePrivateStoreOffer */
  DeletePrivateStoreOffer = "DeletePrivateStoreOffer",
  /** DeletePrivateStoreCollection */
  DeletePrivateStoreCollection = "DeletePrivateStoreCollection",
  /** DeletePrivateStoreCollectionOffer */
  DeletePrivateStoreCollectionOffer = "DeletePrivateStoreCollectionOffer",
  /** Ping */
  Ping = "Ping",
}

/**
 * Set the Operation for the POST method. Ping or Delete \
 * {@link KnownOperation} can be used interchangeably with Operation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DeletePrivateStoreOffer** \
 * **DeletePrivateStoreCollection** \
 * **DeletePrivateStoreCollectionOffer** \
 * **Ping**
 */
export type Operation = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-01-01 API version. */
  V20250101 = "2025-01-01",
}

export function _queryUserRulesPropertiesPropertiesSerializer(item: QueryUserRulesProperties): any {
  return {
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _privateStorePropertiesNotificationsSettingsSerializer(
  item: PrivateStoreProperties,
): any {
  return {
    recipients: !item["recipients"]
      ? item["recipients"]
      : recipientArraySerializer(item["recipients"]),
    sendToAllMarketplaceAdmins: item["sendToAllMarketplaceAdmins"],
  };
}

export function _privateStorePropertiesNotificationsSettingsDeserializer(item: any) {
  return {
    recipients: !item["recipients"]
      ? item["recipients"]
      : recipientArrayDeserializer(item["recipients"]),
    sendToAllMarketplaceAdmins: item["sendToAllMarketplaceAdmins"],
  };
}

export function _privateStorePropertiesSerializer(item: PrivateStore): any {
  return {
    availability: item["availability"],
    eTag: item["eTag"],
    privateStoreName: item["privateStoreName"],
    tenantId: item["tenantId"],
    isGov: item["isGov"],
    branding: item["branding"],
    notificationsSettings: !item["notificationsSettings"]
      ? item["notificationsSettings"]
      : notificationsSettingsPropertiesSerializer(item["notificationsSettings"]),
  };
}

export function _privateStorePropertiesDeserializer(item: any) {
  return {
    availability: item["availability"],
    privateStoreId: item["privateStoreId"],
    eTag: item["eTag"],
    privateStoreName: item["privateStoreName"],
    tenantId: item["tenantId"],
    isGov: item["isGov"],
    collectionIds: !item["collectionIds"]
      ? item["collectionIds"]
      : item["collectionIds"].map((p: any) => {
          return p;
        }),
    branding: !item["branding"]
      ? item["branding"]
      : Object.fromEntries(Object.entries(item["branding"]).map(([k, p]: [string, any]) => [k, p])),
    notificationsSettings: !item["notificationsSettings"]
      ? item["notificationsSettings"]
      : notificationsSettingsPropertiesDeserializer(item["notificationsSettings"]),
  };
}

export function _queryUserOffersPropertiesPropertiesSerializer(
  item: QueryUserOffersProperties,
): any {
  return {
    offerIds: !item["offerIds"]
      ? item["offerIds"]
      : item["offerIds"].map((p: any) => {
          return p;
        }),
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _queryApprovedPlansPayloadPropertiesSerializer(
  item: QueryApprovedPlansPayload,
): any {
  return {
    offerId: item["offerId"],
    planIds: !item["planIds"]
      ? item["planIds"]
      : item["planIds"].map((p: any) => {
          return p;
        }),
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _bulkCollectionsPayloadPropertiesSerializer(item: BulkCollectionsPayload): any {
  return {
    collectionIds: !item["collectionIds"]
      ? item["collectionIds"]
      : item["collectionIds"].map((p: any) => {
          return p;
        }),
    action: item["action"],
  };
}

export function _acknowledgeOfferNotificationPropertiesPropertiesSerializer(
  item: AcknowledgeOfferNotificationProperties,
): any {
  return {
    acknowledge: item["acknowledge"],
    dismiss: item["dismiss"],
    removeOffer: item["removeOffer"],
    addPlans: !item["addPlans"]
      ? item["addPlans"]
      : item["addPlans"].map((p: any) => {
          return p;
        }),
    removePlans: !item["removePlans"]
      ? item["removePlans"]
      : item["removePlans"].map((p: any) => {
          return p;
        }),
  };
}

export function _requestApprovalResourcePropertiesSerializer(item: RequestApprovalResource): any {
  return {
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    plansDetails: !item["plansDetails"]
      ? item["plansDetails"]
      : planDetailsArraySerializer(item["plansDetails"]),
    messageCode: item["messageCode"],
  };
}

export function _requestApprovalResourcePropertiesDeserializer(item: any) {
  return {
    offerId: item["offerId"],
    offerDisplayName: item["offerDisplayName"],
    publisherId: item["publisherId"],
    plansDetails: !item["plansDetails"]
      ? item["plansDetails"]
      : planDetailsArrayDeserializer(item["plansDetails"]),
    isClosed: item["isClosed"],
    messageCode: item["messageCode"],
  };
}

export function _withdrawPropertiesPropertiesSerializer(item: WithdrawProperties): any {
  return { planId: item["planId"], publisherId: item["publisherId"] };
}

export function _adminRequestApprovalsResourcePropertiesSerializer(
  item: AdminRequestApprovalsResource,
): any {
  return {
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    adminAction: item["adminAction"],
    approvedPlans: !item["approvedPlans"]
      ? item["approvedPlans"]
      : item["approvedPlans"].map((p: any) => {
          return p;
        }),
    comment: item["comment"],
    administrator: item["administrator"],
    collectionIds: !item["collectionIds"]
      ? item["collectionIds"]
      : item["collectionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _adminRequestApprovalsResourcePropertiesDeserializer(item: any) {
  return {
    offerId: item["offerId"],
    displayName: item["displayName"],
    publisherId: item["publisherId"],
    adminAction: item["adminAction"],
    approvedPlans: !item["approvedPlans"]
      ? item["approvedPlans"]
      : item["approvedPlans"].map((p: any) => {
          return p;
        }),
    comment: item["comment"],
    administrator: item["administrator"],
    plans: !item["plans"] ? item["plans"] : planRequesterDetailsArrayDeserializer(item["plans"]),
    collectionIds: !item["collectionIds"]
      ? item["collectionIds"]
      : item["collectionIds"].map((p: any) => {
          return p;
        }),
    icon: item["icon"],
  };
}

export function _collectionPropertiesSerializer(item: Collection): any {
  return {
    collectionName: item["collectionName"],
    claim: item["claim"],
    allSubscriptions: item["allSubscriptions"],
    subscriptionsList: !item["subscriptionsList"]
      ? item["subscriptionsList"]
      : item["subscriptionsList"].map((p: any) => {
          return p;
        }),
    enabled: item["enabled"],
  };
}

export function _collectionPropertiesDeserializer(item: any) {
  return {
    collectionId: item["collectionId"],
    collectionName: item["collectionName"],
    claim: item["claim"],
    allSubscriptions: item["allSubscriptions"],
    approveAllItems: item["approveAllItems"],
    approveAllItemsModifiedAt: !item["approveAllItemsModifiedAt"]
      ? item["approveAllItemsModifiedAt"]
      : new Date(item["approveAllItemsModifiedAt"]),
    subscriptionsList: !item["subscriptionsList"]
      ? item["subscriptionsList"]
      : item["subscriptionsList"].map((p: any) => {
          return p;
        }),
    enabled: item["enabled"],
    numberOfOffers: item["numberOfOffers"],
    appliedRules: !item["appliedRules"]
      ? item["appliedRules"]
      : ruleArrayDeserializer(item["appliedRules"]),
  };
}

export function _transferOffersPropertiesPropertiesSerializer(item: TransferOffersProperties): any {
  return {
    targetCollections: !item["targetCollections"]
      ? item["targetCollections"]
      : item["targetCollections"].map((p: any) => {
          return p;
        }),
    operation: item["operation"],
    offerIdsList: !item["offerIdsList"]
      ? item["offerIdsList"]
      : item["offerIdsList"].map((p: any) => {
          return p;
        }),
  };
}

export function _collectionOffersByAllContextsPayloadPropertiesSerializer(
  item: CollectionOffersByAllContextsPayload,
): any {
  return {
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : item["subscriptionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _collectionOffersByContextOffersDeserializer(item: any) {
  return {
    value: !item["value"] ? item["value"] : offerPropertiesArrayDeserializer(item["value"]),
  };
}

export function _offerPropertiesSerializer(item: Offer): any {
  return {
    eTag: item["eTag"],
    specificPlanIdsLimitation: !item["specificPlanIdsLimitation"]
      ? item["specificPlanIdsLimitation"]
      : item["specificPlanIdsLimitation"].map((p: any) => {
          return p;
        }),
    updateSuppressedDueIdempotence: item["updateSuppressedDueIdempotence"],
    iconFileUris: item["iconFileUris"],
    plans: !item["plans"] ? item["plans"] : planArraySerializer(item["plans"]),
  };
}

export function _offerPropertiesDeserializer(item: any) {
  return {
    uniqueOfferId: item["uniqueOfferId"],
    offerDisplayName: item["offerDisplayName"],
    publisherDisplayName: item["publisherDisplayName"],
    eTag: item["eTag"],
    privateStoreId: item["privateStoreId"],
    createdAt: item["createdAt"],
    modifiedAt: item["modifiedAt"],
    specificPlanIdsLimitation: !item["specificPlanIdsLimitation"]
      ? item["specificPlanIdsLimitation"]
      : item["specificPlanIdsLimitation"].map((p: any) => {
          return p;
        }),
    updateSuppressedDueIdempotence: item["updateSuppressedDueIdempotence"],
    iconFileUris: !item["iconFileUris"]
      ? item["iconFileUris"]
      : Object.fromEntries(
          Object.entries(item["iconFileUris"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    isStopSell: item["isStopSell"],
    plans: !item["plans"] ? item["plans"] : planArrayDeserializer(item["plans"]),
  };
}

export function _multiContextAndPlansPayloadPropertiesSerializer(
  item: MultiContextAndPlansPayload,
): any {
  return {
    offerId: item["offerId"],
    eTag: item["eTag"],
    plansContext: !item["plansContext"]
      ? item["plansContext"]
      : contextAndPlansDetailsArraySerializer(item["plansContext"]),
  };
}
