// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Result of the request to list billing operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of billing operations supported by the Microsoft.Billing resource provider. */
  readonly value?: Operation[];
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API. */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action". */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for ARM/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** Localized display information for this particular operation. */
export interface OperationDisplay {
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

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

/** An agreement. */
export interface Agreement extends ProxyResource {
  /** An agreement. */
  properties?: AgreementProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function agreementDeserializer(item: any): Agreement {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : agreementPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** An agreement. */
export interface AgreementProperties {
  /** The mode of acceptance for an agreement. */
  readonly acceptanceMode?: AcceptanceMode;
  /** The URL to download the agreement. */
  readonly agreementLink?: string;
  /** The list of billing profiles associated with agreement and present only for specific agreements. */
  readonly billingProfileInfo?: BillingProfileInfo[];
  /** The category of the agreement. */
  readonly category?: Category;
  /** The name of the agreement signed by a customer. */
  readonly displayName?: string;
  /** The date from which the agreement is effective. */
  readonly effectiveDate?: Date;
  /** The date when the agreement expires. */
  readonly expirationDate?: Date;
  /** The list of participants that participates in acceptance of an agreement. */
  readonly participants?: Participant[];
  /** The current status of the agreement. */
  readonly status?: string;
  /** The ID of the lead billing account if this agreement is part of the Customer Affiliate Purchase Terms. */
  readonly leadBillingAccountName?: string;
}

export function agreementPropertiesDeserializer(item: any): AgreementProperties {
  return {
    acceptanceMode: item["acceptanceMode"],
    agreementLink: item["agreementLink"],
    billingProfileInfo: !item["billingProfileInfo"]
      ? item["billingProfileInfo"]
      : billingProfileInfoArrayDeserializer(item["billingProfileInfo"]),
    category: item["category"],
    displayName: item["displayName"],
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    participants: !item["participants"]
      ? item["participants"]
      : participantArrayDeserializer(item["participants"]),
    status: item["status"],
    leadBillingAccountName: item["leadBillingAccountName"],
  };
}

/** The mode of acceptance for an agreement. */
export enum KnownAcceptanceMode {
  /** Other */
  Other = "Other",
  /** ClickToAccept */
  ClickToAccept = "ClickToAccept",
  /** ESignEmbedded */
  ESignEmbedded = "ESignEmbedded",
  /** ESignOffline */
  ESignOffline = "ESignOffline",
  /** Implicit */
  Implicit = "Implicit",
  /** Offline */
  Offline = "Offline",
  /** PhysicalSign */
  PhysicalSign = "PhysicalSign",
}

/**
 * The mode of acceptance for an agreement. \
 * {@link KnownAcceptanceMode} can be used interchangeably with AcceptanceMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **ClickToAccept**: ClickToAccept \
 * **ESignEmbedded**: ESignEmbedded \
 * **ESignOffline**: ESignOffline \
 * **Implicit**: Implicit \
 * **Offline**: Offline \
 * **PhysicalSign**: PhysicalSign
 */
export type AcceptanceMode = string;

export function billingProfileInfoArrayDeserializer(result: Array<BillingProfileInfo>): any[] {
  return result.map((item) => {
    return billingProfileInfoDeserializer(item);
  });
}

/** Details about billing profile associated with agreement and available only for specific agreements. */
export interface BillingProfileInfo {
  /** The fully qualified ID that uniquely identifies a billing account. */
  billingAccountId?: string;
  /** The name of the billing profile. */
  billingProfileDisplayName?: string;
  /** The friendly ID that uniquely identifies a billing profile. */
  billingProfileId?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  billingProfileSystemId?: string;
  /** Billing account name. Available for a specific type of agreement. */
  indirectRelationshipOrganizationName?: string;
}

export function billingProfileInfoDeserializer(item: any): BillingProfileInfo {
  return {
    billingAccountId: item["billingAccountId"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileId: item["billingProfileId"],
    billingProfileSystemId: item["billingProfileSystemId"],
    indirectRelationshipOrganizationName: item["indirectRelationshipOrganizationName"],
  };
}

/** The category of the agreement. */
export enum KnownCategory {
  /** Other */
  Other = "Other",
  /** AffiliatePurchaseTerms */
  AffiliatePurchaseTerms = "AffiliatePurchaseTerms",
  /** IndirectForGovernmentAgreement */
  IndirectForGovernmentAgreement = "IndirectForGovernmentAgreement",
  /** MicrosoftCustomerAgreement */
  MicrosoftCustomerAgreement = "MicrosoftCustomerAgreement",
  /** MicrosoftPartnerAgreement */
  MicrosoftPartnerAgreement = "MicrosoftPartnerAgreement",
  /** UKCloudComputeFramework */
  UKCloudComputeFramework = "UKCloudComputeFramework",
}

/**
 * The category of the agreement. \
 * {@link KnownCategory} can be used interchangeably with Category,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **AffiliatePurchaseTerms**: AffiliatePurchaseTerms \
 * **IndirectForGovernmentAgreement**: IndirectForGovernmentAgreement \
 * **MicrosoftCustomerAgreement**: MicrosoftCustomerAgreement \
 * **MicrosoftPartnerAgreement**: MicrosoftPartnerAgreement \
 * **UKCloudComputeFramework**: UKCloudComputeFramework
 */
export type Category = string;

export function participantArrayDeserializer(result: Array<Participant>): any[] {
  return result.map((item) => {
    return participantDeserializer(item);
  });
}

/** Billing account name. Available for a specific type of agreement. */
export interface Participant {
  /** The email address of the participant. */
  readonly email?: string;
  /** The acceptance status of the participant. */
  readonly status?: string;
  /** The date when the status got changed. */
  readonly statusDate?: Date;
}

export function participantDeserializer(item: any): Participant {
  return {
    email: item["email"],
    status: item["status"],
    statusDate: !item["statusDate"] ? item["statusDate"] : new Date(item["statusDate"]),
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

/** Paged collection of Agreement items */
export interface _AgreementListResult {
  /** The Agreement items on this page */
  readonly value: Agreement[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agreementListResultDeserializer(item: any): _AgreementListResult {
  return {
    value: agreementArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agreementArrayDeserializer(result: Array<Agreement>): any[] {
  return result.map((item) => {
    return agreementDeserializer(item);
  });
}

/** A request submitted by a user to manage billing. Users with an owner role on the scope can approve or decline these requests. */
export interface BillingRequest extends ProxyResource {
  /** A request submitted by a user to manage billing. Users with an owner role on the scope can approve or decline these requests. */
  properties?: BillingRequestProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function billingRequestSerializer(item: BillingRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : billingRequestPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function billingRequestDeserializer(item: any): BillingRequest {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingRequestPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A request submitted by a user to manage billing. Users with an owner role on the scope can approve or decline these requests. */
export interface BillingRequestProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** Additional information for the billing request. */
  additionalInformation?: Record<string, string>;
  /** The principal of the request reviewer. Will only be set if request is approved. */
  reviewedBy?: BillingRequestPropertiesReviewedBy;
  /** The date and time when the request was reviewed. */
  readonly reviewalDate?: Date;
  /** The fully qualified ID that uniquely identifies a billing account. */
  readonly billingAccountId?: string;
  /** The ID that uniquely identifies a billing account. */
  readonly billingAccountName?: string;
  /** The name of the billing account. */
  readonly billingAccountDisplayName?: string;
  /** The primary tenant ID of the billing account for which the billing request was submitted. */
  readonly billingAccountPrimaryBillingTenantId?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  readonly billingProfileId?: string;
  /** The ID that uniquely identifies a billing profile. */
  readonly billingProfileName?: string;
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The principal of the entity who created the request. */
  createdBy?: BillingRequestPropertiesCreatedBy;
  /** The date and time when the request was created. */
  readonly creationDate?: Date;
  /** The date and time when the request expires. */
  readonly expirationDate?: Date;
  /** The reason to approve or decline the request. */
  decisionReason?: string;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  readonly invoiceSectionId?: string;
  /** The ID that uniquely identifies an invoice section. */
  readonly invoiceSectionName?: string;
  /** The name of the invoice section. */
  readonly invoiceSectionDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a customer. */
  readonly customerId?: string;
  /** The ID that uniquely identifies a customer. */
  readonly customerName?: string;
  /** The name of the customer. */
  readonly customerDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a billing subscription. */
  readonly subscriptionId?: string;
  /** The ID that uniquely identifies a billing subscription. */
  readonly subscriptionName?: string;
  /** The name of the billing subscription. */
  readonly subscriptionDisplayName?: string;
  /** Justification for submitting request. */
  justification?: string;
  /** The recipients of the billing request. */
  recipients?: Principal[];
  /** The billing scope for which the request was submitted (ex. '/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}'). */
  requestScope?: string;
  /** The billing scope for which the request will be applied. This is a read only property derived by the service. */
  readonly billingScope?: string;
  /** Status of billing request. */
  status?: BillingRequestStatus;
  /** Type of billing request. */
  type?: BillingRequestType;
  /** The principal of the entity who last updated the request. */
  lastUpdatedBy?: BillingRequestPropertiesLastUpdatedBy;
  /** Date and time of last update. */
  readonly lastUpdatedDate?: Date;
}

export function billingRequestPropertiesSerializer(item: BillingRequestProperties): any {
  return {
    additionalInformation: item["additionalInformation"],
    reviewedBy: !item["reviewedBy"]
      ? item["reviewedBy"]
      : billingRequestPropertiesReviewedBySerializer(item["reviewedBy"]),
    createdBy: !item["createdBy"]
      ? item["createdBy"]
      : billingRequestPropertiesCreatedBySerializer(item["createdBy"]),
    decisionReason: item["decisionReason"],
    justification: item["justification"],
    recipients: !item["recipients"]
      ? item["recipients"]
      : principalArraySerializer(item["recipients"]),
    requestScope: item["requestScope"],
    status: item["status"],
    type: item["type"],
    lastUpdatedBy: !item["lastUpdatedBy"]
      ? item["lastUpdatedBy"]
      : billingRequestPropertiesLastUpdatedBySerializer(item["lastUpdatedBy"]),
  };
}

export function billingRequestPropertiesDeserializer(item: any): BillingRequestProperties {
  return {
    provisioningState: item["provisioningState"],
    additionalInformation: !item["additionalInformation"]
      ? item["additionalInformation"]
      : Object.fromEntries(
          Object.entries(item["additionalInformation"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    reviewedBy: !item["reviewedBy"]
      ? item["reviewedBy"]
      : billingRequestPropertiesReviewedByDeserializer(item["reviewedBy"]),
    reviewalDate: !item["reviewalDate"] ? item["reviewalDate"] : new Date(item["reviewalDate"]),
    billingAccountId: item["billingAccountId"],
    billingAccountName: item["billingAccountName"],
    billingAccountDisplayName: item["billingAccountDisplayName"],
    billingAccountPrimaryBillingTenantId: item["billingAccountPrimaryBillingTenantId"],
    billingProfileId: item["billingProfileId"],
    billingProfileName: item["billingProfileName"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    createdBy: !item["createdBy"]
      ? item["createdBy"]
      : billingRequestPropertiesCreatedByDeserializer(item["createdBy"]),
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    decisionReason: item["decisionReason"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionName: item["invoiceSectionName"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    customerId: item["customerId"],
    customerName: item["customerName"],
    customerDisplayName: item["customerDisplayName"],
    subscriptionId: item["subscriptionId"],
    subscriptionName: item["subscriptionName"],
    subscriptionDisplayName: item["subscriptionDisplayName"],
    justification: item["justification"],
    recipients: !item["recipients"]
      ? item["recipients"]
      : principalArrayDeserializer(item["recipients"]),
    requestScope: item["requestScope"],
    billingScope: item["billingScope"],
    status: item["status"],
    type: item["type"],
    lastUpdatedBy: !item["lastUpdatedBy"]
      ? item["lastUpdatedBy"]
      : billingRequestPropertiesLastUpdatedByDeserializer(item["lastUpdatedBy"]),
    lastUpdatedDate: !item["lastUpdatedDate"]
      ? item["lastUpdatedDate"]
      : new Date(item["lastUpdatedDate"]),
  };
}

/** The provisioning state of the resource during a long-running operation. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** New */
  New = "New",
  /** Pending */
  Pending = "Pending",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** PendingBilling */
  PendingBilling = "PendingBilling",
  /** ConfirmedBilling */
  ConfirmedBilling = "ConfirmedBilling",
  /** Creating */
  Creating = "Creating",
  /** Created */
  Created = "Created",
  /** Expired */
  Expired = "Expired",
}

/**
 * The provisioning state of the resource during a long-running operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **New**: New \
 * **Pending**: Pending \
 * **Provisioning**: Provisioning \
 * **PendingBilling**: PendingBilling \
 * **ConfirmedBilling**: ConfirmedBilling \
 * **Creating**: Creating \
 * **Created**: Created \
 * **Expired**: Expired
 */
export type ProvisioningState = string;

/** The principal of the request reviewer. Will only be set if request is approved. */
export interface BillingRequestPropertiesReviewedBy extends Principal {}

export function billingRequestPropertiesReviewedBySerializer(
  item: BillingRequestPropertiesReviewedBy,
): any {
  return { tenantId: item["tenantId"], objectId: item["objectId"], upn: item["upn"] };
}

export function billingRequestPropertiesReviewedByDeserializer(
  item: any,
): BillingRequestPropertiesReviewedBy {
  return {
    tenantId: item["tenantId"],
    objectId: item["objectId"],
    upn: item["upn"],
  };
}

/** The principal of the entity who created the request. */
export interface BillingRequestPropertiesCreatedBy extends Principal {}

export function billingRequestPropertiesCreatedBySerializer(
  item: BillingRequestPropertiesCreatedBy,
): any {
  return { tenantId: item["tenantId"], objectId: item["objectId"], upn: item["upn"] };
}

export function billingRequestPropertiesCreatedByDeserializer(
  item: any,
): BillingRequestPropertiesCreatedBy {
  return {
    tenantId: item["tenantId"],
    objectId: item["objectId"],
    upn: item["upn"],
  };
}

export function principalArraySerializer(result: Array<Principal>): any[] {
  return result.map((item) => {
    return principalSerializer(item);
  });
}

export function principalArrayDeserializer(result: Array<Principal>): any[] {
  return result.map((item) => {
    return principalDeserializer(item);
  });
}

/** A principal who has interacted with a billing entity. */
export interface Principal {
  /** The tenant id of the principal who has interacted with a billing entity. */
  tenantId?: string;
  /** The object id of the principal who has interacted with a billing entity. */
  objectId?: string;
  /** The user principal name of the principal who has interacted with a billing entity. */
  upn?: string;
}

export function principalSerializer(item: Principal): any {
  return { tenantId: item["tenantId"], objectId: item["objectId"], upn: item["upn"] };
}

export function principalDeserializer(item: any): Principal {
  return {
    tenantId: item["tenantId"],
    objectId: item["objectId"],
    upn: item["upn"],
  };
}

/** Status of billing request. */
export enum KnownBillingRequestStatus {
  /** Other */
  Other = "Other",
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Declined */
  Declined = "Declined",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Completed */
  Completed = "Completed",
  /** Expired */
  Expired = "Expired",
}

/**
 * Status of billing request. \
 * {@link KnownBillingRequestStatus} can be used interchangeably with BillingRequestStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **Declined**: Declined \
 * **Cancelled**: Cancelled \
 * **Completed**: Completed \
 * **Expired**: Expired
 */
export type BillingRequestStatus = string;

/** Type of billing request. */
export enum KnownBillingRequestType {
  /** Other */
  Other = "Other",
  /** InvoiceAccess */
  InvoiceAccess = "InvoiceAccess",
  /** ProvisioningAccess */
  ProvisioningAccess = "ProvisioningAccess",
  /** RoleAssignment */
  RoleAssignment = "RoleAssignment",
  /** UpdateBillingPolicy */
  UpdateBillingPolicy = "UpdateBillingPolicy",
}

/**
 * Type of billing request. \
 * {@link KnownBillingRequestType} can be used interchangeably with BillingRequestType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **InvoiceAccess**: InvoiceAccess \
 * **ProvisioningAccess**: ProvisioningAccess \
 * **RoleAssignment**: RoleAssignment \
 * **UpdateBillingPolicy**: UpdateBillingPolicy
 */
export type BillingRequestType = string;

/** The principal of the entity who last updated the request. */
export interface BillingRequestPropertiesLastUpdatedBy extends Principal {}

export function billingRequestPropertiesLastUpdatedBySerializer(
  item: BillingRequestPropertiesLastUpdatedBy,
): any {
  return { tenantId: item["tenantId"], objectId: item["objectId"], upn: item["upn"] };
}

export function billingRequestPropertiesLastUpdatedByDeserializer(
  item: any,
): BillingRequestPropertiesLastUpdatedBy {
  return {
    tenantId: item["tenantId"],
    objectId: item["objectId"],
    upn: item["upn"],
  };
}

/** Paged collection of BillingRequest items */
export interface _BillingRequestListResult {
  /** The BillingRequest items on this page */
  readonly value: BillingRequest[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingRequestListResultDeserializer(item: any): _BillingRequestListResult {
  return {
    value: billingRequestArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingRequestArraySerializer(result: Array<BillingRequest>): any[] {
  return result.map((item) => {
    return billingRequestSerializer(item);
  });
}

export function billingRequestArrayDeserializer(result: Array<BillingRequest>): any[] {
  return result.map((item) => {
    return billingRequestDeserializer(item);
  });
}

/** The properties of the billing role assignment. */
export interface BillingRoleAssignment extends ProxyResource {
  /** The properties of the billing role assignment. */
  properties?: BillingRoleAssignmentProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function billingRoleAssignmentSerializer(item: BillingRoleAssignment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : billingRoleAssignmentPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function billingRoleAssignmentDeserializer(item: any): BillingRoleAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingRoleAssignmentPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of the billing role assignment. */
export interface BillingRoleAssignmentProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The date the role assignment was created. */
  readonly createdOn?: Date;
  /** The tenant Id of the user who created the role assignment. */
  readonly createdByPrincipalTenantId?: string;
  /** The object ID of the user who created the role assignment. */
  readonly createdByPrincipalId?: string;
  /** The principal PUID of the user who created the role assignment. */
  readonly createdByPrincipalPuid?: string;
  /** The email address of the user who created the role assignment. This is supported only for billing accounts with agreement type Enterprise Agreement. */
  readonly createdByUserEmailAddress?: string;
  /** The date the role assignment was modified. */
  readonly modifiedOn?: Date;
  /** The principal PUID of the user who modified the role assignment. */
  readonly modifiedByPrincipalPuid?: string;
  /** The email address of the user who modified the role assignment. This is supported only for billing accounts with agreement type Enterprise Agreement. */
  readonly modifiedByUserEmailAddress?: string;
  /** The principal PUID of the user who modified the role assignment. */
  readonly modifiedByPrincipalId?: string;
  /** The tenant Id of the user who modified the role assignment. */
  readonly modifiedByPrincipalTenantId?: string;
  /** The principal PUID of the user to whom the role was assigned. */
  principalPuid?: string;
  /** The object id of the user to whom the role was assigned. */
  principalId?: string;
  /** The principal tenant id of the user to whom the role was assigned. */
  principalTenantId?: string;
  /** The ID of the role definition. */
  roleDefinitionId: string;
  /** The scope at which the role was assigned. */
  scope?: string;
  /** The authentication type of the user, whether Organization or MSA, of the user to whom the role was assigned. This is supported only for billing accounts with agreement type Enterprise Agreement. */
  userAuthenticationType?: string;
  /** The email address of the user to whom the role was assigned. This is supported only for billing accounts with agreement type Enterprise Agreement. */
  userEmailAddress?: string;
  /** The friendly name of the tenant of the user to whom the role was assigned. This will be 'Primary Tenant' for the primary tenant of the billing account. */
  readonly principalTenantName?: string;
  /** The display name of the principal to whom the role was assigned. */
  readonly principalDisplayName?: string;
  /** The type of a role Assignment. */
  readonly principalType?: PrincipalType;
  /** The ID of the billing request that was created for the role assignment. This is only applicable to cross tenant role assignments or role assignments created through the billing request. */
  readonly billingRequestId?: string;
  /** The fully qualified ID that uniquely identifies a billing account. */
  readonly billingAccountId?: string;
  /** The name of the billing account. */
  readonly billingAccountDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  readonly billingProfileId?: string;
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  readonly invoiceSectionId?: string;
  /** The name of the invoice section. */
  readonly invoiceSectionDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a customer. */
  readonly customerId?: string;
  /** The name of the customer. */
  readonly customerDisplayName?: string;
}

export function billingRoleAssignmentPropertiesSerializer(
  item: BillingRoleAssignmentProperties,
): any {
  return {
    principalPuid: item["principalPuid"],
    principalId: item["principalId"],
    principalTenantId: item["principalTenantId"],
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    userAuthenticationType: item["userAuthenticationType"],
    userEmailAddress: item["userEmailAddress"],
  };
}

export function billingRoleAssignmentPropertiesDeserializer(
  item: any,
): BillingRoleAssignmentProperties {
  return {
    provisioningState: item["provisioningState"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    createdByPrincipalTenantId: item["createdByPrincipalTenantId"],
    createdByPrincipalId: item["createdByPrincipalId"],
    createdByPrincipalPuid: item["createdByPrincipalPuid"],
    createdByUserEmailAddress: item["createdByUserEmailAddress"],
    modifiedOn: !item["modifiedOn"] ? item["modifiedOn"] : new Date(item["modifiedOn"]),
    modifiedByPrincipalPuid: item["modifiedByPrincipalPuid"],
    modifiedByUserEmailAddress: item["modifiedByUserEmailAddress"],
    modifiedByPrincipalId: item["modifiedByPrincipalId"],
    modifiedByPrincipalTenantId: item["modifiedByPrincipalTenantId"],
    principalPuid: item["principalPuid"],
    principalId: item["principalId"],
    principalTenantId: item["principalTenantId"],
    roleDefinitionId: item["roleDefinitionId"],
    scope: item["scope"],
    userAuthenticationType: item["userAuthenticationType"],
    userEmailAddress: item["userEmailAddress"],
    principalTenantName: item["principalTenantName"],
    principalDisplayName: item["principalDisplayName"],
    principalType: item["principalType"],
    billingRequestId: item["billingRequestId"],
    billingAccountId: item["billingAccountId"],
    billingAccountDisplayName: item["billingAccountDisplayName"],
    billingProfileId: item["billingProfileId"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    customerId: item["customerId"],
    customerDisplayName: item["customerDisplayName"],
  };
}

/** The type of a role Assignment. */
export enum KnownPrincipalType {
  /** Unknown */
  Unknown = "Unknown",
  /** None */
  None = "None",
  /** User */
  User = "User",
  /** Group */
  Group = "Group",
  /** DirectoryRole */
  DirectoryRole = "DirectoryRole",
  /** ServicePrincipal */
  ServicePrincipal = "ServicePrincipal",
  /** Everyone */
  Everyone = "Everyone",
}

/**
 * The type of a role Assignment. \
 * {@link KnownPrincipalType} can be used interchangeably with PrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **None**: None \
 * **User**: User \
 * **Group**: Group \
 * **DirectoryRole**: DirectoryRole \
 * **ServicePrincipal**: ServicePrincipal \
 * **Everyone**: Everyone
 */
export type PrincipalType = string;

/** Paged collection of BillingRoleAssignment items */
export interface _BillingRoleAssignmentListResult {
  /** The BillingRoleAssignment items on this page */
  readonly value: BillingRoleAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingRoleAssignmentListResultDeserializer(
  item: any,
): _BillingRoleAssignmentListResult {
  return {
    value: billingRoleAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingRoleAssignmentArraySerializer(result: Array<BillingRoleAssignment>): any[] {
  return result.map((item) => {
    return billingRoleAssignmentSerializer(item);
  });
}

export function billingRoleAssignmentArrayDeserializer(
  result: Array<BillingRoleAssignment>,
): any[] {
  return result.map((item) => {
    return billingRoleAssignmentDeserializer(item);
  });
}

/** An invoice. */
export interface Invoice extends ProxyResource {
  /** An invoice. */
  properties?: InvoiceProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function invoiceDeserializer(item: any): Invoice {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : invoicePropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** An invoice. */
export interface InvoiceProperties {
  /** The amount due as of now. */
  amountDue?: InvoicePropertiesAmountDue;
  /** The amount of Azure prepayment applied to the charges. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
  azurePrepaymentApplied?: InvoicePropertiesAzurePrepaymentApplied;
  /** The total charges for the invoice billing period. */
  billedAmount?: InvoicePropertiesBilledAmount;
  /** The Id of the active invoice which is originally billed after this invoice was voided. This field is applicable to the void invoices only. */
  readonly billedDocumentId?: string;
  /** The name of the billing profile for which the invoice is generated. */
  readonly billingProfileDisplayName?: string;
  /** The ID of the billing profile for which the invoice is generated. */
  readonly billingProfileId?: string;
  /** The total refund for returns and cancellations during the invoice billing period. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
  creditAmount?: InvoicePropertiesCreditAmount;
  /** The Id of the invoice which got voided and this credit note was issued as a result. This field is applicable to the credit notes only. */
  readonly creditForDocumentId?: string;
  /** List of documents available to download and view such as invoice, credit note, or tax receipt. */
  readonly documents?: InvoiceDocument[];
  /** The type of the document. */
  readonly documentType?: InvoiceDocumentType;
  /** The due date for the invoice. */
  readonly dueDate?: Date;
  /** List of failed payments. */
  readonly failedPayments?: FailedPayment[];
  /** The amount of free Azure credits applied to the charges. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
  freeAzureCreditApplied?: InvoicePropertiesFreeAzureCreditApplied;
  /** The date when the invoice was generated. */
  readonly invoiceDate?: Date;
  /** The end date of the billing period for which the invoice is generated. The date is in MM-DD-YYYY format. */
  readonly invoicePeriodEndDate?: Date;
  /** The start date of the billing period for which the invoice is generated. The date is in MM-DD-YYYY format. */
  readonly invoicePeriodStartDate?: Date;
  /** Invoice type. */
  readonly invoiceType?: InvoiceType;
  /** Specifies if the invoice is generated as part of monthly invoicing cycle or not. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
  readonly isMonthlyInvoice?: boolean;
  /** List of payments. */
  readonly payments?: Payment[];
  /** An optional purchase order number for the invoice. */
  readonly purchaseOrderNumber?: string;
  /** Rebill details for an invoice. */
  rebillDetails?: InvoicePropertiesRebillDetails;
  /** The current status of the invoice. */
  readonly status?: InvoiceStatus;
  /** The name of the billing subscription for which the invoice is generated. */
  readonly subscriptionDisplayName?: string;
  /** The ID of the subscription for which the invoice is generated. */
  readonly subscriptionId?: string;
  /** Identifies the type of tax calculation used for the invoice. The field is applicable only to invoices with special tax calculation logic. */
  readonly specialTaxationType?: SpecialTaxationType;
  /** The pre-tax amount due. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
  subTotal?: InvoicePropertiesSubTotal;
  /** The amount of tax charged for the billing period. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
  taxAmount?: InvoicePropertiesTaxAmount;
  /** The amount due when the invoice was generated. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
  totalAmount?: InvoicePropertiesTotalAmount;
  /** The details of a refund request. */
  refundDetails?: InvoicePropertiesRefundDetails;
}

export function invoicePropertiesDeserializer(item: any): InvoiceProperties {
  return {
    amountDue: !item["amountDue"]
      ? item["amountDue"]
      : invoicePropertiesAmountDueDeserializer(item["amountDue"]),
    azurePrepaymentApplied: !item["azurePrepaymentApplied"]
      ? item["azurePrepaymentApplied"]
      : invoicePropertiesAzurePrepaymentAppliedDeserializer(item["azurePrepaymentApplied"]),
    billedAmount: !item["billedAmount"]
      ? item["billedAmount"]
      : invoicePropertiesBilledAmountDeserializer(item["billedAmount"]),
    billedDocumentId: item["billedDocumentId"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileId: item["billingProfileId"],
    creditAmount: !item["creditAmount"]
      ? item["creditAmount"]
      : invoicePropertiesCreditAmountDeserializer(item["creditAmount"]),
    creditForDocumentId: item["creditForDocumentId"],
    documents: !item["documents"]
      ? item["documents"]
      : invoiceDocumentArrayDeserializer(item["documents"]),
    documentType: item["documentType"],
    dueDate: !item["dueDate"] ? item["dueDate"] : new Date(item["dueDate"]),
    failedPayments: !item["failedPayments"]
      ? item["failedPayments"]
      : failedPaymentArrayDeserializer(item["failedPayments"]),
    freeAzureCreditApplied: !item["freeAzureCreditApplied"]
      ? item["freeAzureCreditApplied"]
      : invoicePropertiesFreeAzureCreditAppliedDeserializer(item["freeAzureCreditApplied"]),
    invoiceDate: !item["invoiceDate"] ? item["invoiceDate"] : new Date(item["invoiceDate"]),
    invoicePeriodEndDate: !item["invoicePeriodEndDate"]
      ? item["invoicePeriodEndDate"]
      : new Date(item["invoicePeriodEndDate"]),
    invoicePeriodStartDate: !item["invoicePeriodStartDate"]
      ? item["invoicePeriodStartDate"]
      : new Date(item["invoicePeriodStartDate"]),
    invoiceType: item["invoiceType"],
    isMonthlyInvoice: item["isMonthlyInvoice"],
    payments: !item["payments"] ? item["payments"] : paymentArrayDeserializer(item["payments"]),
    purchaseOrderNumber: item["purchaseOrderNumber"],
    rebillDetails: !item["rebillDetails"]
      ? item["rebillDetails"]
      : invoicePropertiesRebillDetailsDeserializer(item["rebillDetails"]),
    status: item["status"],
    subscriptionDisplayName: item["subscriptionDisplayName"],
    subscriptionId: item["subscriptionId"],
    specialTaxationType: item["specialTaxationType"],
    subTotal: !item["subTotal"]
      ? item["subTotal"]
      : invoicePropertiesSubTotalDeserializer(item["subTotal"]),
    taxAmount: !item["taxAmount"]
      ? item["taxAmount"]
      : invoicePropertiesTaxAmountDeserializer(item["taxAmount"]),
    totalAmount: !item["totalAmount"]
      ? item["totalAmount"]
      : invoicePropertiesTotalAmountDeserializer(item["totalAmount"]),
    refundDetails: !item["refundDetails"]
      ? item["refundDetails"]
      : invoicePropertiesRefundDetailsDeserializer(item["refundDetails"]),
  };
}

/** The amount due as of now. */
export interface InvoicePropertiesAmountDue extends Amount {}

export function invoicePropertiesAmountDueDeserializer(item: any): InvoicePropertiesAmountDue {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The amount of Azure prepayment applied to the charges. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
export interface InvoicePropertiesAzurePrepaymentApplied extends Amount {}

export function invoicePropertiesAzurePrepaymentAppliedDeserializer(
  item: any,
): InvoicePropertiesAzurePrepaymentApplied {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The total charges for the invoice billing period. */
export interface InvoicePropertiesBilledAmount extends Amount {}

export function invoicePropertiesBilledAmountDeserializer(
  item: any,
): InvoicePropertiesBilledAmount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The total refund for returns and cancellations during the invoice billing period. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
export interface InvoicePropertiesCreditAmount extends Amount {}

export function invoicePropertiesCreditAmountDeserializer(
  item: any,
): InvoicePropertiesCreditAmount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

export function invoiceDocumentArrayDeserializer(result: Array<InvoiceDocument>): any[] {
  return result.map((item) => {
    return invoiceDocumentDeserializer(item);
  });
}

/** The properties of a document. */
export interface InvoiceDocument {
  /** The document numbers for the invoice document. */
  readonly documentNumbers?: string[];
  /** The URL to download the invoice document if the source is external to Microsoft.Billing. */
  readonly externalUrl?: string;
  /** The type of the document. */
  readonly kind?: InvoiceDocumentType;
  /** The ID that uniquely identifies an invoice document. This ID may be an identifier for an invoice PDF, a credit note, or a tax receipt. */
  readonly name?: string;
  /** The URL to download the invoice document if the source is internal to Microsoft.Billing. */
  readonly url?: string;
  /** The source of the document. ENF for Brazil and DRS for rest of the world. */
  readonly source?: DocumentSource;
}

export function invoiceDocumentDeserializer(item: any): InvoiceDocument {
  return {
    documentNumbers: !item["documentNumbers"]
      ? item["documentNumbers"]
      : item["documentNumbers"].map((p: any) => {
          return p;
        }),
    externalUrl: item["externalUrl"],
    kind: item["kind"],
    name: item["name"],
    url: item["url"],
    source: item["source"],
  };
}

/** The type of the document. */
export enum KnownInvoiceDocumentType {
  /** Other */
  Other = "Other",
  /** Invoice */
  Invoice = "Invoice",
  /** VoidNote */
  VoidNote = "VoidNote",
  /** TaxReceipt */
  TaxReceipt = "TaxReceipt",
  /** CreditNote */
  CreditNote = "CreditNote",
  /** Summary */
  Summary = "Summary",
  /** Transactions */
  Transactions = "Transactions",
}

/**
 * The type of the document. \
 * {@link KnownInvoiceDocumentType} can be used interchangeably with InvoiceDocumentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Invoice**: Invoice \
 * **VoidNote**: VoidNote \
 * **TaxReceipt**: TaxReceipt \
 * **CreditNote**: CreditNote \
 * **Summary**: Summary \
 * **Transactions**: Transactions
 */
export type InvoiceDocumentType = string;

/** The source of the document. ENF for Brazil and DRS for rest of the world. */
export enum KnownDocumentSource {
  /** Other */
  Other = "Other",
  /** DRS */
  DRS = "DRS",
  /** ENF */
  ENF = "ENF",
}

/**
 * The source of the document. ENF for Brazil and DRS for rest of the world. \
 * {@link KnownDocumentSource} can be used interchangeably with DocumentSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **DRS**: DRS \
 * **ENF**: ENF
 */
export type DocumentSource = string;

export function failedPaymentArrayDeserializer(result: Array<FailedPayment>): any[] {
  return result.map((item) => {
    return failedPaymentDeserializer(item);
  });
}

/** A failed payment. */
export interface FailedPayment {
  /** The date when the payment was attempted. */
  readonly date?: Date;
  /** The reason that the payment failed. */
  readonly failedPaymentReason?: FailedPaymentReason;
}

export function failedPaymentDeserializer(item: any): FailedPayment {
  return {
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    failedPaymentReason: item["failedPaymentReason"],
  };
}

/** The reason that the payment failed. */
export enum KnownFailedPaymentReason {
  /** Other */
  Other = "Other",
  /** BankDeclined */
  BankDeclined = "BankDeclined",
  /** CardExpired */
  CardExpired = "CardExpired",
  /** IncorrectCardDetails */
  IncorrectCardDetails = "IncorrectCardDetails",
}

/**
 * The reason that the payment failed. \
 * {@link KnownFailedPaymentReason} can be used interchangeably with FailedPaymentReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **BankDeclined**: BankDeclined \
 * **CardExpired**: CardExpired \
 * **IncorrectCardDetails**: IncorrectCardDetails
 */
export type FailedPaymentReason = string;

/** The amount of free Azure credits applied to the charges. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
export interface InvoicePropertiesFreeAzureCreditApplied extends Amount {}

export function invoicePropertiesFreeAzureCreditAppliedDeserializer(
  item: any,
): InvoicePropertiesFreeAzureCreditApplied {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** Invoice type. */
export enum KnownInvoiceType {
  /** Other */
  Other = "Other",
  /** AzureServices */
  AzureServices = "AzureServices",
  /** AzureMarketplace */
  AzureMarketplace = "AzureMarketplace",
  /** AzureSupport */
  AzureSupport = "AzureSupport",
}

/**
 * Invoice type. \
 * {@link KnownInvoiceType} can be used interchangeably with InvoiceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **AzureServices**: AzureServices \
 * **AzureMarketplace**: AzureMarketplace \
 * **AzureSupport**: AzureSupport
 */
export type InvoiceType = string;

export function paymentArrayDeserializer(result: Array<Payment>): any[] {
  return result.map((item) => {
    return paymentDeserializer(item);
  });
}

/** An invoice payment. */
export interface Payment {
  /** The paid amount. */
  amount?: PaymentAmount;
  /** The date when the payment was made. */
  readonly date?: Date;
  /** The ID that uniquely identifies the payment method used for the invoice. */
  readonly paymentMethodId?: string;
  /** The family of payment method. */
  readonly paymentMethodFamily?: PaymentMethodFamily;
  /** The type of payment method. */
  readonly paymentMethodType?: string;
  /** The type of payment. */
  readonly paymentType?: string;
}

export function paymentDeserializer(item: any): Payment {
  return {
    amount: !item["amount"] ? item["amount"] : paymentAmountDeserializer(item["amount"]),
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    paymentMethodId: item["paymentMethodId"],
    paymentMethodFamily: item["paymentMethodFamily"],
    paymentMethodType: item["paymentMethodType"],
    paymentType: item["paymentType"],
  };
}

/** The paid amount. */
export interface PaymentAmount extends Amount {}

export function paymentAmountDeserializer(item: any): PaymentAmount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** Payment on Account type. */
export enum KnownPaymentMethodFamily {
  /** Other */
  Other = "Other",
  /** None */
  None = "None",
  /** CreditCard */
  CreditCard = "CreditCard",
  /** Credits */
  Credits = "Credits",
  /** CheckWire */
  CheckWire = "CheckWire",
  /** EWallet */
  EWallet = "EWallet",
  /** TaskOrder */
  TaskOrder = "TaskOrder",
  /** DirectDebit */
  DirectDebit = "DirectDebit",
}

/**
 * Payment on Account type. \
 * {@link KnownPaymentMethodFamily} can be used interchangeably with PaymentMethodFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **None**: None \
 * **CreditCard**: CreditCard \
 * **Credits**: Credits \
 * **CheckWire**: CheckWire \
 * **EWallet**: EWallet \
 * **TaskOrder**: TaskOrder \
 * **DirectDebit**: DirectDebit
 */
export type PaymentMethodFamily = string;

/** Rebill details for an invoice. */
export interface InvoicePropertiesRebillDetails extends RebillDetails {}

export function invoicePropertiesRebillDetailsDeserializer(
  item: any,
): InvoicePropertiesRebillDetails {
  return {
    invoiceDocumentId: item["invoiceDocumentId"],
    creditNoteDocumentId: item["creditNoteDocumentId"],
    rebillDetails: !item["rebillDetails"]
      ? item["rebillDetails"]
      : rebillDetailsDeserializer(item["rebillDetails"]),
  };
}

/** The current status of the invoice. */
export enum KnownInvoiceStatus {
  /** Other */
  Other = "Other",
  /** Due */
  Due = "Due",
  /** OverDue */
  OverDue = "OverDue",
  /** Paid */
  Paid = "Paid",
  /** Void */
  Void = "Void",
  /** Locked */
  Locked = "Locked",
}

/**
 * The current status of the invoice. \
 * {@link KnownInvoiceStatus} can be used interchangeably with InvoiceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Due**: Due \
 * **OverDue**: OverDue \
 * **Paid**: Paid \
 * **Void**: Void \
 * **Locked**: Locked
 */
export type InvoiceStatus = string;

/** Identifies the type of tax calculation used for the invoice. The field is applicable only to invoices with special tax calculation logic. */
export enum KnownSpecialTaxationType {
  /** SubtotalLevel */
  SubtotalLevel = "SubtotalLevel",
  /** InvoiceLevel */
  InvoiceLevel = "InvoiceLevel",
}

/**
 * Identifies the type of tax calculation used for the invoice. The field is applicable only to invoices with special tax calculation logic. \
 * {@link KnownSpecialTaxationType} can be used interchangeably with SpecialTaxationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SubtotalLevel**: SubtotalLevel \
 * **InvoiceLevel**: InvoiceLevel
 */
export type SpecialTaxationType = string;

/** The pre-tax amount due. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
export interface InvoicePropertiesSubTotal extends Amount {}

export function invoicePropertiesSubTotalDeserializer(item: any): InvoicePropertiesSubTotal {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The amount of tax charged for the billing period. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
export interface InvoicePropertiesTaxAmount extends Amount {}

export function invoicePropertiesTaxAmountDeserializer(item: any): InvoicePropertiesTaxAmount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The amount due when the invoice was generated. This field is applicable to billing accounts with agreement type Microsoft Customer Agreement. */
export interface InvoicePropertiesTotalAmount extends Amount {}

export function invoicePropertiesTotalAmountDeserializer(item: any): InvoicePropertiesTotalAmount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The details of a refund request. */
export interface InvoicePropertiesRefundDetails extends RefundDetailsSummary {}

export function invoicePropertiesRefundDetailsDeserializer(
  item: any,
): InvoicePropertiesRefundDetails {
  return {
    requestedOn: !item["requestedOn"] ? item["requestedOn"] : new Date(item["requestedOn"]),
    approvedOn: !item["approvedOn"] ? item["approvedOn"] : new Date(item["approvedOn"]),
    completedOn: !item["completedOn"] ? item["completedOn"] : new Date(item["completedOn"]),
    amountRequested: !item["amountRequested"]
      ? item["amountRequested"]
      : refundDetailsSummaryAmountRequestedDeserializer(item["amountRequested"]),
    amountRefunded: !item["amountRefunded"]
      ? item["amountRefunded"]
      : refundDetailsSummaryAmountRefundedDeserializer(item["amountRefunded"]),
    rebillInvoiceId: item["rebillInvoiceId"],
    transactionCount: item["transactionCount"],
    refundStatus: item["refundStatus"],
    refundOperationId: item["refundOperationId"],
    refundReason: item["refundReason"],
  };
}

/** The amount. */
export interface Amount {
  /** The currency for the amount value. */
  readonly currency?: string;
  /** The amount value. For example, if the currency is USD, then a value of 600 would be $600.00. */
  readonly value?: number;
}

export function amountSerializer(item: Amount): any {
  return item;
}

export function amountDeserializer(item: any): Amount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The rebill details of an invoice. */
export interface RebillDetails {
  /** The ID of invoice. */
  readonly invoiceDocumentId?: string;
  /** The ID of credit note. */
  readonly creditNoteDocumentId?: string;
  /** The rebill details of an invoice. */
  readonly rebillDetails?: RebillDetails;
}

export function rebillDetailsDeserializer(item: any): RebillDetails {
  return {
    invoiceDocumentId: item["invoiceDocumentId"],
    creditNoteDocumentId: item["creditNoteDocumentId"],
    rebillDetails: !item["rebillDetails"]
      ? item["rebillDetails"]
      : rebillDetailsDeserializer(item["rebillDetails"]),
  };
}

/** The details of refund request. */
export interface RefundDetailsSummary {
  /** Date when the refund was requested. */
  readonly requestedOn?: Date;
  /** Date when the refund was approved. */
  readonly approvedOn?: Date;
  /** Date when the refund was completed. */
  readonly completedOn?: Date;
  /** The amount of refund requested. */
  amountRequested?: RefundDetailsSummaryAmountRequested;
  /** The amount refunded. */
  amountRefunded?: RefundDetailsSummaryAmountRefunded;
  /** The invoice ID of the rebill invoice for a refund. */
  readonly rebillInvoiceId?: string;
  /** The number of transactions refunded. */
  readonly transactionCount?: number;
  /** The status of refund request. */
  readonly refundStatus?: RefundStatus;
  /** The ID of refund operation. */
  readonly refundOperationId?: string;
  /** The reason for refund. */
  readonly refundReason?: RefundReasonCode;
}

export function refundDetailsSummaryDeserializer(item: any): RefundDetailsSummary {
  return {
    requestedOn: !item["requestedOn"] ? item["requestedOn"] : new Date(item["requestedOn"]),
    approvedOn: !item["approvedOn"] ? item["approvedOn"] : new Date(item["approvedOn"]),
    completedOn: !item["completedOn"] ? item["completedOn"] : new Date(item["completedOn"]),
    amountRequested: !item["amountRequested"]
      ? item["amountRequested"]
      : refundDetailsSummaryAmountRequestedDeserializer(item["amountRequested"]),
    amountRefunded: !item["amountRefunded"]
      ? item["amountRefunded"]
      : refundDetailsSummaryAmountRefundedDeserializer(item["amountRefunded"]),
    rebillInvoiceId: item["rebillInvoiceId"],
    transactionCount: item["transactionCount"],
    refundStatus: item["refundStatus"],
    refundOperationId: item["refundOperationId"],
    refundReason: item["refundReason"],
  };
}

/** The amount of refund requested. */
export interface RefundDetailsSummaryAmountRequested extends Amount {}

export function refundDetailsSummaryAmountRequestedDeserializer(
  item: any,
): RefundDetailsSummaryAmountRequested {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The amount refunded. */
export interface RefundDetailsSummaryAmountRefunded extends Amount {}

export function refundDetailsSummaryAmountRefundedDeserializer(
  item: any,
): RefundDetailsSummaryAmountRefunded {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The status of refund request. */
export enum KnownRefundStatus {
  /** Other */
  Other = "Other",
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Declined */
  Declined = "Declined",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Completed */
  Completed = "Completed",
  /** Expired */
  Expired = "Expired",
}

/**
 * The status of refund request. \
 * {@link KnownRefundStatus} can be used interchangeably with RefundStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **Declined**: Declined \
 * **Cancelled**: Cancelled \
 * **Completed**: Completed \
 * **Expired**: Expired
 */
export type RefundStatus = string;

/** The reason for refund. */
export enum KnownRefundReasonCode {
  /** Other */
  Other = "Other",
  /** AccidentalConversion */
  AccidentalConversion = "AccidentalConversion",
  /** UnclearPricing */
  UnclearPricing = "UnclearPricing",
  /** AccidentalPurchase */
  AccidentalPurchase = "AccidentalPurchase",
  /** ForgotToCancel */
  ForgotToCancel = "ForgotToCancel",
  /** UnclearDocumentation */
  UnclearDocumentation = "UnclearDocumentation",
}

/**
 * The reason for refund. \
 * {@link KnownRefundReasonCode} can be used interchangeably with RefundReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **AccidentalConversion**: AccidentalConversion \
 * **UnclearPricing**: UnclearPricing \
 * **AccidentalPurchase**: AccidentalPurchase \
 * **ForgotToCancel**: ForgotToCancel \
 * **UnclearDocumentation**: UnclearDocumentation
 */
export type RefundReasonCode = string;

/** Paged collection of Invoice items */
export interface _InvoiceListResult {
  /** The Invoice items on this page */
  readonly value: Invoice[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _invoiceListResultDeserializer(item: any): _InvoiceListResult {
  return {
    value: invoiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function invoiceArrayDeserializer(result: Array<Invoice>): any[] {
  return result.map((item) => {
    return invoiceDeserializer(item);
  });
}

/** A secure URL that can be used to download a an entity until the URL expires. */
export interface DocumentDownloadResult {
  /** The time in UTC when the download URL will expire. */
  readonly expiryTime?: string;
  /** The URL to the PDF or .zip file. */
  readonly url?: string;
}

export function documentDownloadResultDeserializer(item: any): DocumentDownloadResult {
  return {
    expiryTime: item["expiryTime"],
    url: item["url"],
  };
}

/** A list of download details for individual documents. */
export interface DocumentDownloadRequest {
  /** The ID that uniquely identifies an invoice document. This ID may be an identifier for an invoice PDF, a credit note, or a tax receipt. If omitted, the most recent invoice PDF for the invoice will be returned. */
  documentName?: string;
  /** The ID that uniquely identifies an invoice. */
  invoiceName?: string;
}

export function documentDownloadRequestSerializer(item: DocumentDownloadRequest): any {
  return { documentName: item["documentName"], invoiceName: item["invoiceName"] };
}

/** The definition of the reservation. */
export interface Reservation extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  etag?: number;
  /** The sku information associated to this reservation */
  sku?: ReservationSkuProperty;
  /** The reserved source type of the reservation, e.g. virtual machine. */
  readonly reservedResourceType?: string;
  /** Allows reservation discount to be applied across skus within the same auto fit group. Not all skus support instance size flexibility. */
  instanceFlexibility?: InstanceFlexibility;
  /** The display name of the reservation */
  readonly displayName?: string;
  /** The array of applied scopes of a reservation. Will be null if the reservation is in Shared scope */
  appliedScopes?: string[];
  /** The applied scope type of the reservation. */
  readonly appliedScopeType?: string;
  /** Indicates if the reservation is archived */
  archived?: boolean;
  /** Capabilities of the reservation */
  capabilities?: string;
  /** The number of the reservation. */
  readonly quantity?: number;
  /** The provisioning state of the reservation, e.g. Succeeded */
  readonly provisioningState?: string;
  /** The effective date time of the reservation */
  readonly effectiveDateTime?: Date;
  /** This is the DateTime when the reservation benefit started. */
  benefitStartTime?: Date;
  /** DateTime of the last time the reservation was updated. */
  readonly lastUpdatedDateTime?: Date;
  /** The expiry date of the reservation */
  readonly expiryDate?: string;
  /** This is the date-time when the reservation will expire. */
  expiryDateTime?: Date;
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** The sku description of the reservation */
  readonly skuDescription?: string;
  /** The message giving detailed information about the status code. */
  extendedStatusInfo?: ReservationExtendedStatusInfo;
  /** The billing plan options available for this sku. */
  billingPlan?: ReservationBillingPlan;
  /** The provisioning state of the reservation for display, e.g. Succeeded */
  readonly displayProvisioningState?: string;
  /** The provisioning state of the reservation, e.g. Succeeded */
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
  appliedScopeProperties?: ReservationAppliedScopeProperties;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  readonly billingScopeId?: string;
  /** The renew state of the reservation */
  readonly renew?: boolean;
  /** The renew source of the reservation */
  readonly renewSource?: string;
  /** Reservation Id of the reservation which is purchased because of renew. Format of the resource Id is /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}. */
  renewDestination?: string;
  /** The renew properties for a reservation. */
  renewProperties?: RenewPropertiesResponse;
  /** The term of the reservation, e.g. P1Y */
  readonly term?: string;
  /** The applied scope type of the reservation for display, e.g. Shared */
  readonly userFriendlyAppliedScopeType?: string;
  /** The renew state of the reservation for display, e.g. On */
  readonly userFriendlyRenewState?: string;
  /** Reservation utilization */
  readonly utilization?: ReservationPropertyUtilization;
  /** Represents UPN */
  productCode?: string;
}

export function reservationDeserializer(item: any): Reservation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _reservationPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
    sku: !item["sku"] ? item["sku"] : reservationSkuPropertyDeserializer(item["sku"]),
  };
}

/** The property of reservation object. */
export interface ReservationProperty {
  /** The reserved source type of the reservation, e.g. virtual machine. */
  readonly reservedResourceType?: string;
  /** Allows reservation discount to be applied across skus within the same auto fit group. Not all skus support instance size flexibility. */
  instanceFlexibility?: InstanceFlexibility;
  /** The display name of the reservation */
  readonly displayName?: string;
  /** The array of applied scopes of a reservation. Will be null if the reservation is in Shared scope */
  appliedScopes?: string[];
  /** The applied scope type of the reservation. */
  readonly appliedScopeType?: string;
  /** Indicates if the reservation is archived */
  archived?: boolean;
  /** Capabilities of the reservation */
  capabilities?: string;
  /** The number of the reservation. */
  readonly quantity?: number;
  /** The provisioning state of the reservation, e.g. Succeeded */
  readonly provisioningState?: string;
  /** The effective date time of the reservation */
  readonly effectiveDateTime?: Date;
  /** This is the DateTime when the reservation benefit started. */
  benefitStartTime?: Date;
  /** DateTime of the last time the reservation was updated. */
  readonly lastUpdatedDateTime?: Date;
  /** The expiry date of the reservation */
  readonly expiryDate?: string;
  /** This is the date-time when the reservation will expire. */
  expiryDateTime?: Date;
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** The sku description of the reservation */
  readonly skuDescription?: string;
  /** The message giving detailed information about the status code. */
  extendedStatusInfo?: ReservationExtendedStatusInfo;
  /** The billing plan options available for this sku. */
  billingPlan?: ReservationBillingPlan;
  /** The provisioning state of the reservation for display, e.g. Succeeded */
  readonly displayProvisioningState?: string;
  /** The provisioning state of the reservation, e.g. Succeeded */
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
  appliedScopeProperties?: ReservationAppliedScopeProperties;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  readonly billingScopeId?: string;
  /** The renew state of the reservation */
  readonly renew?: boolean;
  /** The renew source of the reservation */
  readonly renewSource?: string;
  /** Reservation Id of the reservation which is purchased because of renew. Format of the resource Id is /providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/reservations/{reservationId}. */
  renewDestination?: string;
  /** The renew properties for a reservation. */
  renewProperties?: RenewPropertiesResponse;
  /** The term of the reservation, e.g. P1Y */
  readonly term?: string;
  /** The applied scope type of the reservation for display, e.g. Shared */
  readonly userFriendlyAppliedScopeType?: string;
  /** The renew state of the reservation for display, e.g. On */
  readonly userFriendlyRenewState?: string;
  /** Represents UPN */
  productCode?: string;
  /** last 7 day utilization trend for a reservation */
  readonly trend?: string;
  /** The array of aggregates of a reservation's utilization */
  aggregates?: ReservationUtilizationAggregates[];
}

export function reservationPropertyDeserializer(item: any): ReservationProperty {
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
    expiryDate: item["expiryDate"],
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
    skuDescription: item["skuDescription"],
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : reservationExtendedStatusInfoDeserializer(item["extendedStatusInfo"]),
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
      : reservationAppliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
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
    ...(!item["utilization"]
      ? item["utilization"]
      : _reservationPropertyUtilizationDeserializer(item["utilization"])),
    productCode: item["productCode"],
  };
}

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

/** Extended status information for the reservation. */
export interface ReservationExtendedStatusInfo {
  /** The status of the reservation. */
  statusCode?: ReservationStatusCode;
  /** The message giving detailed information about the status code. */
  message?: string;
  /** Properties for extended status information */
  properties?: ExtendedStatusDefinitionProperties;
}

export function reservationExtendedStatusInfoDeserializer(
  item: any,
): ReservationExtendedStatusInfo {
  return {
    statusCode: item["statusCode"],
    message: item["message"],
    properties: !item["properties"]
      ? item["properties"]
      : extendedStatusDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** The status of the reservation. */
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
  /** CapacityError */
  CapacityError = "CapacityError",
  /** CapacityRestricted */
  CapacityRestricted = "CapacityRestricted",
  /** Exchanged */
  Exchanged = "Exchanged",
  /** UnknownError */
  UnknownError = "UnknownError",
  /** RiskCheckFailed */
  RiskCheckFailed = "RiskCheckFailed",
  /** CreditLineCheckFailed */
  CreditLineCheckFailed = "CreditLineCheckFailed",
  /** Warning */
  Warning = "Warning",
  /** NoBenefitDueToSubscriptionTransfer */
  NoBenefitDueToSubscriptionTransfer = "NoBenefitDueToSubscriptionTransfer",
  /** NoBenefitDueToSubscriptionDeletion */
  NoBenefitDueToSubscriptionDeletion = "NoBenefitDueToSubscriptionDeletion",
  /** NoBenefit */
  NoBenefit = "NoBenefit",
}

/**
 * The status of the reservation. \
 * {@link KnownReservationStatusCode} can be used interchangeably with ReservationStatusCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Pending**: Pending \
 * **Processing**: Processing \
 * **Active**: Active \
 * **PurchaseError**: PurchaseError \
 * **PaymentInstrumentError**: PaymentInstrumentError \
 * **Split**: Split \
 * **Merged**: Merged \
 * **Expired**: Expired \
 * **Succeeded**: Succeeded \
 * **CapacityError**: CapacityError \
 * **CapacityRestricted**: CapacityRestricted \
 * **Exchanged**: Exchanged \
 * **UnknownError**: UnknownError \
 * **RiskCheckFailed**: RiskCheckFailed \
 * **CreditLineCheckFailed**: CreditLineCheckFailed \
 * **Warning**: Warning \
 * **NoBenefitDueToSubscriptionTransfer**: NoBenefitDueToSubscriptionTransfer \
 * **NoBenefitDueToSubscriptionDeletion**: NoBenefitDueToSubscriptionDeletion \
 * **NoBenefit**: NoBenefit
 */
export type ReservationStatusCode = string;

/** Extended status definition properties */
export interface ExtendedStatusDefinitionProperties {
  /** Subscription Id */
  subscriptionId?: string;
}

export function extendedStatusDefinitionPropertiesDeserializer(
  item: any,
): ExtendedStatusDefinitionProperties {
  return {
    subscriptionId: item["subscriptionId"],
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
export interface ReservationAppliedScopeProperties {
  /** Tenant ID where the reservation should apply benefit. */
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

export function reservationAppliedScopePropertiesSerializer(
  item: ReservationAppliedScopeProperties,
): any {
  return {
    tenantId: item["tenantId"],
    managementGroupId: item["managementGroupId"],
    subscriptionId: item["subscriptionId"],
    resourceGroupId: item["resourceGroupId"],
    displayName: item["displayName"],
  };
}

export function reservationAppliedScopePropertiesDeserializer(
  item: any,
): ReservationAppliedScopeProperties {
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
  purchaseProperties?: ReservationPurchaseRequest;
  /** Amount that Microsoft uses for record. Used during refund for calculating refund limit. Tax is not included. This is locked price 30 days before expiry. */
  pricingCurrencyTotal?: Price;
  /** Currency and amount that customer will be charged in customer's local currency for renewal purchase. Tax is not included. */
  billingCurrencyTotal?: Price;
}

export function renewPropertiesResponseDeserializer(item: any): RenewPropertiesResponse {
  return {
    purchaseProperties: !item["purchaseProperties"]
      ? item["purchaseProperties"]
      : reservationPurchaseRequestDeserializer(item["purchaseProperties"]),
    pricingCurrencyTotal: !item["pricingCurrencyTotal"]
      ? item["pricingCurrencyTotal"]
      : priceDeserializer(item["pricingCurrencyTotal"]),
    billingCurrencyTotal: !item["billingCurrencyTotal"]
      ? item["billingCurrencyTotal"]
      : priceDeserializer(item["billingCurrencyTotal"]),
  };
}

/** The request for reservation purchase */
export interface ReservationPurchaseRequest {
  /** The name of sku */
  sku?: SkuName;
  /** The Azure region where the reserved resource lives. */
  location?: string;
  /** The reserved source type of the reservation, e.g. virtual machine. */
  readonly reservedResourceType?: string;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  readonly billingScopeId?: string;
  /** The term of the reservation, e.g. P1Y */
  readonly term?: string;
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** Quantity of the skus that are part of the reservation. Must be greater than zero. */
  quantity?: number;
  /** Friendly name of the reservation */
  displayName?: string;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** List of the subscriptions that the benefit will be applied. Do not specify if AppliedScopeType is Shared. */
  appliedScopes?: string[];
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: ReservationAppliedScopeProperties;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** Properties specific to each reserved resource type. Not required if not applicable. */
  reservedResourceProperties?: ReservationPurchaseRequestPropertiesReservedResourceProperties;
  /** Allows reservation discount to be applied across skus within the same auto fit group. Not all skus support instance size flexibility. */
  instanceFlexibility?: InstanceFlexibility;
  /** This is the date-time when the Azure hybrid benefit needs to be reviewed. */
  reviewDateTime?: Date;
}

export function reservationPurchaseRequestSerializer(item: ReservationPurchaseRequest): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuNameSerializer(item["sku"]),
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "billingPlan",
      "quantity",
      "displayName",
      "appliedScopeType",
      "appliedScopes",
      "appliedScopeProperties",
      "renew",
      "reservedResourceProperties",
      "instanceFlexibility",
      "reviewDateTime",
    ])
      ? undefined
      : _reservationPurchaseRequestPropertiesSerializer(item),
  };
}

export function reservationPurchaseRequestDeserializer(item: any): ReservationPurchaseRequest {
  return {
    sku: !item["sku"] ? item["sku"] : skuNameDeserializer(item["sku"]),
    location: item["location"],
    ...(!item["properties"]
      ? item["properties"]
      : _reservationPurchaseRequestPropertiesDeserializer(item["properties"])),
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
export interface ReservationPurchaseRequestProperties {
  /** The reserved source type of the reservation, e.g. virtual machine. */
  readonly reservedResourceType?: string;
  /** Subscription that will be charged for purchasing reservation or savings plan */
  readonly billingScopeId?: string;
  /** The term of the reservation, e.g. P1Y */
  readonly term?: string;
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** Quantity of the skus that are part of the reservation. Must be greater than zero. */
  quantity?: number;
  /** Friendly name of the reservation */
  displayName?: string;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** List of the subscriptions that the benefit will be applied. Do not specify if AppliedScopeType is Shared. */
  appliedScopes?: string[];
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: ReservationAppliedScopeProperties;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** Allows reservation discount to be applied across skus within the same auto fit group. Not all skus support instance size flexibility. */
  instanceFlexibility?: InstanceFlexibility;
  /** This is the date-time when the Azure hybrid benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. */
  instanceFlexibilityReservedResourcePropertiesInstanceFlexibility?: InstanceFlexibility;
}

export function reservationPurchaseRequestPropertiesSerializer(
  item: ReservationPurchaseRequestProperties,
): any {
  return {
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
      : reservationAppliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    reservedResourceProperties: areAllPropsUndefined(item, ["instanceFlexibility"])
      ? undefined
      : _reservationPurchaseRequestPropertiesReservedResourcePropertiesSerializer(item),
    instanceFlexibility: item["instanceFlexibility"],
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
  };
}

export function reservationPurchaseRequestPropertiesDeserializer(
  item: any,
): ReservationPurchaseRequestProperties {
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
      : reservationAppliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    ...(!item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : _reservationPurchaseRequestPropertiesReservedResourcePropertiesDeserializer(
          item["reservedResourceProperties"],
        )),
    instanceFlexibility: item["instanceFlexibility"],
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
  };
}

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

/** Properties specific to each reserved resource type. Not required if not applicable. */
export interface ReservationPurchaseRequestPropertiesReservedResourceProperties {
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. */
  instanceFlexibility?: InstanceFlexibility;
}

export function reservationPurchaseRequestPropertiesReservedResourcePropertiesSerializer(
  item: ReservationPurchaseRequestPropertiesReservedResourceProperties,
): any {
  return { instanceFlexibility: item["instanceFlexibility"] };
}

export function reservationPurchaseRequestPropertiesReservedResourcePropertiesDeserializer(
  item: any,
): ReservationPurchaseRequestPropertiesReservedResourceProperties {
  return {
    instanceFlexibility: item["instanceFlexibility"],
  };
}

/** The price. */
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

/** Reservation utilization */
export interface ReservationPropertyUtilization {
  /** last 7 day utilization trend for a reservation */
  readonly trend?: string;
  /** The array of aggregates of a reservation's utilization */
  aggregates?: ReservationUtilizationAggregates[];
}

export function reservationPropertyUtilizationDeserializer(
  item: any,
): ReservationPropertyUtilization {
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

/** The property of reservation sku object. */
export interface ReservationSkuProperty {
  /** The name of the reservation sku. */
  readonly name?: string;
}

export function reservationSkuPropertySerializer(item: ReservationSkuProperty): any {
  return item;
}

export function reservationSkuPropertyDeserializer(item: any): ReservationSkuProperty {
  return {
    name: item["name"],
  };
}

/** The request for reservation patch */
export interface Patch {
  /** The sku information associated to this reservation */
  sku?: ReservationSkuProperty;
  /** Tags for this reservation */
  tags?: Record<string, string>;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: ReservationAppliedScopeProperties;
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. */
  instanceFlexibility?: InstanceFlexibility;
  /** Display name of the reservation */
  displayName?: string;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  renewProperties?: PatchPropertiesRenewProperties;
  /** This is the date-time when the Azure hybrid benefit needs to be reviewed. */
  reviewDateTime?: Date;
}

export function patchSerializer(item: Patch): any {
  return {
    properties: areAllPropsUndefined(item, [
      "appliedScopeType",
      "appliedScopeProperties",
      "instanceFlexibility",
      "displayName",
      "renew",
      "renewProperties",
      "reviewDateTime",
    ])
      ? undefined
      : _patchPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : reservationSkuPropertySerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** Properties for reservation patch */
export interface PatchProperties {
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. Required and need to provide tenantId and managementGroupId if AppliedScopeType is ManagementGroup */
  appliedScopeProperties?: ReservationAppliedScopeProperties;
  /** Turning this on will apply the reservation discount to other VMs in the same VM size group. Only specify for VirtualMachines reserved resource type. */
  instanceFlexibility?: InstanceFlexibility;
  /** Display name of the reservation */
  displayName?: string;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** This is the date-time when the Azure hybrid benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** The request for reservation purchase */
  purchaseProperties?: ReservationPurchaseRequest;
}

export function patchPropertiesSerializer(item: PatchProperties): any {
  return {
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : reservationAppliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    instanceFlexibility: item["instanceFlexibility"],
    displayName: item["displayName"],
    renew: item["renew"],
    renewProperties: areAllPropsUndefined(item, ["purchaseProperties"])
      ? undefined
      : _patchPropertiesRenewPropertiesSerializer(item),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
  };
}

/** model interface PatchPropertiesRenewProperties */
export interface PatchPropertiesRenewProperties {
  /** The request for reservation purchase */
  purchaseProperties?: ReservationPurchaseRequest;
}

export function patchPropertiesRenewPropertiesSerializer(
  item: PatchPropertiesRenewProperties,
): any {
  return {
    purchaseProperties: !item["purchaseProperties"]
      ? item["purchaseProperties"]
      : reservationPurchaseRequestSerializer(item["purchaseProperties"]),
  };
}

/** List of `Reservations` */
export interface _ReservationList {
  /** The Reservation items on this page */
  value: Reservation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _reservationListDeserializer(item: any): _ReservationList {
  return {
    value: reservationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function reservationArrayDeserializer(result: Array<Reservation>): any[] {
  return result.map((item) => {
    return reservationDeserializer(item);
  });
}

/** The list of reservations and summary of roll out count of reservations in each state. */
export interface _ReservationsListResult {
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
  /** The roll out count summary of the reservations */
  summary?: ReservationSummary;
  /** The list of reservations. */
  readonly value?: Reservation[];
}

export function _reservationsListResultDeserializer(item: any): _ReservationsListResult {
  return {
    nextLink: item["nextLink"],
    summary: !item["summary"] ? item["summary"] : reservationSummaryDeserializer(item["summary"]),
    value: !item["value"] ? item["value"] : reservationArrayDeserializer(item["value"]),
  };
}

/** The roll up count summary of reservations in each state */
export interface ReservationSummary {
  /** The number of reservation in Cancelled state */
  readonly cancelledCount?: number;
  /** The number of reservation in Expired state */
  readonly expiredCount?: number;
  /** The number of reservation in Expiring state */
  readonly expiringCount?: number;
  /** The number of reservation in Failed state */
  readonly failedCount?: number;
  /** The number of reservation in Pending state */
  readonly pendingCount?: number;
  /** The number of reservation in Succeeded state */
  readonly succeededCount?: number;
  /** The number of reservation in 'No Benefit' state */
  readonly noBenefitCount?: number;
  /** The number of reservation in Warning state */
  readonly warningCount?: number;
  /** The number of reservation in Processing state */
  readonly processingCount?: number;
}

export function reservationSummaryDeserializer(item: any): ReservationSummary {
  return {
    cancelledCount: item["cancelledCount"],
    expiredCount: item["expiredCount"],
    expiringCount: item["expiringCount"],
    failedCount: item["failedCount"],
    pendingCount: item["pendingCount"],
    succeededCount: item["succeededCount"],
    noBenefitCount: item["noBenefitCount"],
    warningCount: item["warningCount"],
    processingCount: item["processingCount"],
  };
}

/** A billing account. */
export interface BillingAccount extends ProxyResource {
  /** A billing account. */
  properties?: BillingAccountProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function billingAccountDeserializer(item: any): BillingAccount {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingAccountPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A billing account. */
export interface BillingAccountProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The current status of the billing account. */
  readonly accountStatus?: AccountStatus;
  /** The type of customer. */
  readonly accountType?: AccountType;
  /** The tier of the account. */
  readonly accountSubType?: AccountSubType;
  /** Reason for the specified billing account status. */
  readonly accountStatusReasonCode?: BillingAccountStatusReasonCode;
  /** The type of agreement. */
  readonly agreementType?: AgreementType;
  /** The billing account name. */
  displayName?: string;
  /** The properties of an enrollment. */
  enrollmentDetails?: BillingAccountPropertiesEnrollmentDetails;
  /** Indicates whether user has read access to the billing account. */
  hasReadAccess?: boolean;
  /** Indicates whether or not the billing account has any billing profiles. */
  hasNoBillingProfiles?: boolean;
  /** Notification email address for legacy account. Available for agreement type Microsoft Online Services Program. */
  notificationEmailAddress?: string;
  /** The tenant that was used to set up the billing account. By default, only users from this tenant can get role assignments on the billing account and all purchases are provisioned in this tenant. */
  primaryBillingTenantId?: string;
  /** The address of the individual or organization that is responsible for the billing account. */
  soldTo?: BillingAccountPropertiesSoldTo;
  /** Describes the registration number of the organization linked with the billing account. */
  registrationNumber?: BillingAccountPropertiesRegistrationNumber;
  /** Identifies the billing relationships represented by a billing account. The billing relationship may be between Microsoft, the customer, and/or a third-party. */
  readonly billingRelationshipTypes?: BillingRelationshipType[];
  /** Qualifications for pricing on a billing account. Values may be Commercial, Education, Charity or Government. */
  readonly qualifications?: string[];
  /** A list of tax identifiers for the billing account. */
  taxIds?: TaxIdentifier[];
}

export function billingAccountPropertiesSerializer(item: BillingAccountProperties): any {
  return {
    displayName: item["displayName"],
    enrollmentDetails: !item["enrollmentDetails"]
      ? item["enrollmentDetails"]
      : billingAccountPropertiesEnrollmentDetailsSerializer(item["enrollmentDetails"]),
    hasReadAccess: item["hasReadAccess"],
    hasNoBillingProfiles: item["hasNoBillingProfiles"],
    notificationEmailAddress: item["notificationEmailAddress"],
    primaryBillingTenantId: item["primaryBillingTenantId"],
    soldTo: !item["soldTo"]
      ? item["soldTo"]
      : billingAccountPropertiesSoldToSerializer(item["soldTo"]),
    registrationNumber: !item["registrationNumber"]
      ? item["registrationNumber"]
      : billingAccountPropertiesRegistrationNumberSerializer(item["registrationNumber"]),
    taxIds: !item["taxIds"] ? item["taxIds"] : taxIdentifierArraySerializer(item["taxIds"]),
  };
}

export function billingAccountPropertiesDeserializer(item: any): BillingAccountProperties {
  return {
    provisioningState: item["provisioningState"],
    accountStatus: item["accountStatus"],
    accountType: item["accountType"],
    accountSubType: item["accountSubType"],
    accountStatusReasonCode: item["accountStatusReasonCode"],
    agreementType: item["agreementType"],
    displayName: item["displayName"],
    enrollmentDetails: !item["enrollmentDetails"]
      ? item["enrollmentDetails"]
      : billingAccountPropertiesEnrollmentDetailsDeserializer(item["enrollmentDetails"]),
    hasReadAccess: item["hasReadAccess"],
    hasNoBillingProfiles: item["hasNoBillingProfiles"],
    notificationEmailAddress: item["notificationEmailAddress"],
    primaryBillingTenantId: item["primaryBillingTenantId"],
    soldTo: !item["soldTo"]
      ? item["soldTo"]
      : billingAccountPropertiesSoldToDeserializer(item["soldTo"]),
    registrationNumber: !item["registrationNumber"]
      ? item["registrationNumber"]
      : billingAccountPropertiesRegistrationNumberDeserializer(item["registrationNumber"]),
    billingRelationshipTypes: !item["billingRelationshipTypes"]
      ? item["billingRelationshipTypes"]
      : item["billingRelationshipTypes"].map((p: any) => {
          return p;
        }),
    qualifications: !item["qualifications"]
      ? item["qualifications"]
      : item["qualifications"].map((p: any) => {
          return p;
        }),
    taxIds: !item["taxIds"] ? item["taxIds"] : taxIdentifierArrayDeserializer(item["taxIds"]),
  };
}

/** The current status of the billing account. */
export enum KnownAccountStatus {
  /** Other */
  Other = "Other",
  /** Active */
  Active = "Active",
  /** UnderReview */
  UnderReview = "UnderReview",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
  /** Extended */
  Extended = "Extended",
  /** Pending */
  Pending = "Pending",
  /** New */
  New = "New",
  /** Expired */
  Expired = "Expired",
  /** Terminated */
  Terminated = "Terminated",
  /** Transferred */
  Transferred = "Transferred",
}

/**
 * The current status of the billing account. \
 * {@link KnownAccountStatus} can be used interchangeably with AccountStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Active**: Active \
 * **UnderReview**: UnderReview \
 * **Disabled**: Disabled \
 * **Deleted**: Deleted \
 * **Extended**: Extended \
 * **Pending**: Pending \
 * **New**: New \
 * **Expired**: Expired \
 * **Terminated**: Terminated \
 * **Transferred**: Transferred
 */
export type AccountStatus = string;

/** The type of customer. */
export enum KnownAccountType {
  /** Other */
  Other = "Other",
  /** Enterprise */
  Enterprise = "Enterprise",
  /** Individual */
  Individual = "Individual",
  /** Partner */
  Partner = "Partner",
  /** Reseller */
  Reseller = "Reseller",
  /** ClassicPartner */
  ClassicPartner = "ClassicPartner",
  /** Internal */
  Internal = "Internal",
  /** Tenant */
  Tenant = "Tenant",
  /** Business */
  Business = "Business",
}

/**
 * The type of customer. \
 * {@link KnownAccountType} can be used interchangeably with AccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Enterprise**: Enterprise \
 * **Individual**: Individual \
 * **Partner**: Partner \
 * **Reseller**: Reseller \
 * **ClassicPartner**: ClassicPartner \
 * **Internal**: Internal \
 * **Tenant**: Tenant \
 * **Business**: Business
 */
export type AccountType = string;

/** The tier of the account. */
export enum KnownAccountSubType {
  /** Other */
  Other = "Other",
  /** None */
  None = "None",
  /** Individual */
  Individual = "Individual",
  /** Professional */
  Professional = "Professional",
  /** Enterprise */
  Enterprise = "Enterprise",
}

/**
 * The tier of the account. \
 * {@link KnownAccountSubType} can be used interchangeably with AccountSubType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **None**: None \
 * **Individual**: Individual \
 * **Professional**: Professional \
 * **Enterprise**: Enterprise
 */
export type AccountSubType = string;

/** Reason for the specified billing account status. */
export enum KnownBillingAccountStatusReasonCode {
  /** Other */
  Other = "Other",
  /** UnusualActivity */
  UnusualActivity = "UnusualActivity",
  /** ManuallyTerminated */
  ManuallyTerminated = "ManuallyTerminated",
  /** Expired */
  Expired = "Expired",
  /** Transferred */
  Transferred = "Transferred",
  /** TerminateProcessing */
  TerminateProcessing = "TerminateProcessing",
}

/**
 * Reason for the specified billing account status. \
 * {@link KnownBillingAccountStatusReasonCode} can be used interchangeably with BillingAccountStatusReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **UnusualActivity**: UnusualActivity \
 * **ManuallyTerminated**: ManuallyTerminated \
 * **Expired**: Expired \
 * **Transferred**: Transferred \
 * **TerminateProcessing**: TerminateProcessing
 */
export type BillingAccountStatusReasonCode = string;

/** The type of agreement. */
export enum KnownAgreementType {
  /** Other */
  Other = "Other",
  /** MicrosoftCustomerAgreement */
  MicrosoftCustomerAgreement = "MicrosoftCustomerAgreement",
  /** EnterpriseAgreement */
  EnterpriseAgreement = "EnterpriseAgreement",
  /** MicrosoftOnlineServicesProgram */
  MicrosoftOnlineServicesProgram = "MicrosoftOnlineServicesProgram",
  /** MicrosoftPartnerAgreement */
  MicrosoftPartnerAgreement = "MicrosoftPartnerAgreement",
}

/**
 * The type of agreement. \
 * {@link KnownAgreementType} can be used interchangeably with AgreementType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **MicrosoftCustomerAgreement**: MicrosoftCustomerAgreement \
 * **EnterpriseAgreement**: EnterpriseAgreement \
 * **MicrosoftOnlineServicesProgram**: MicrosoftOnlineServicesProgram \
 * **MicrosoftPartnerAgreement**: MicrosoftPartnerAgreement
 */
export type AgreementType = string;

/** The properties of an enrollment. */
export interface BillingAccountPropertiesEnrollmentDetails extends EnrollmentDetails {}

export function billingAccountPropertiesEnrollmentDetailsSerializer(
  item: BillingAccountPropertiesEnrollmentDetails,
): any {
  return {
    startDate: !item["startDate"] ? item["startDate"] : item["startDate"].toISOString(),
    endDate: !item["endDate"] ? item["endDate"] : item["endDate"].toISOString(),
    poNumber: item["poNumber"],
    indirectRelationshipInfo: !item["indirectRelationshipInfo"]
      ? item["indirectRelationshipInfo"]
      : enrollmentDetailsIndirectRelationshipInfoSerializer(item["indirectRelationshipInfo"]),
  };
}

export function billingAccountPropertiesEnrollmentDetailsDeserializer(
  item: any,
): BillingAccountPropertiesEnrollmentDetails {
  return {
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    currency: item["currency"],
    channel: item["channel"],
    language: item["language"],
    countryCode: item["countryCode"],
    billingCycle: item["billingCycle"],
    extendedTermOption: item["extendedTermOption"],
    supportLevel: item["supportLevel"],
    supportCoverage: item["supportCoverage"],
    cloud: item["cloud"],
    poNumber: item["poNumber"],
    markupStatus: item["markupStatus"],
    indirectRelationshipInfo: !item["indirectRelationshipInfo"]
      ? item["indirectRelationshipInfo"]
      : enrollmentDetailsIndirectRelationshipInfoDeserializer(item["indirectRelationshipInfo"]),
    invoiceRecipient: item["invoiceRecipient"],
  };
}

/** The address of the individual or organization that is responsible for the billing account. */
export interface BillingAccountPropertiesSoldTo extends AddressDetails {}

export function billingAccountPropertiesSoldToSerializer(
  item: BillingAccountPropertiesSoldTo,
): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

export function billingAccountPropertiesSoldToDeserializer(
  item: any,
): BillingAccountPropertiesSoldTo {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

/** Describes the registration number of the organization linked with the billing account. */
export interface BillingAccountPropertiesRegistrationNumber extends RegistrationNumber {}

export function billingAccountPropertiesRegistrationNumberSerializer(
  item: BillingAccountPropertiesRegistrationNumber,
): any {
  return { id: item["id"] };
}

export function billingAccountPropertiesRegistrationNumberDeserializer(
  item: any,
): BillingAccountPropertiesRegistrationNumber {
  return {
    id: item["id"],
    required: item["required"],
    type: !item["type"]
      ? item["type"]
      : item["type"].map((p: any) => {
          return p;
        }),
  };
}

/** Identifies the billing relationships represented by a billing account or billing profile. The billing relationship may be between Microsoft, the customer, and/or a third-party. */
export enum KnownBillingRelationshipType {
  /** Other */
  Other = "Other",
  /** Direct */
  Direct = "Direct",
  /** IndirectCustomer */
  IndirectCustomer = "IndirectCustomer",
  /** IndirectPartner */
  IndirectPartner = "IndirectPartner",
  /** CSPPartner */
  CSPPartner = "CSPPartner",
  /** CSPCustomer */
  CSPCustomer = "CSPCustomer",
}

/**
 * Identifies the billing relationships represented by a billing account or billing profile. The billing relationship may be between Microsoft, the customer, and/or a third-party. \
 * {@link KnownBillingRelationshipType} can be used interchangeably with BillingRelationshipType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Direct**: Direct \
 * **IndirectCustomer**: IndirectCustomer \
 * **IndirectPartner**: IndirectPartner \
 * **CSPPartner**: CSPPartner \
 * **CSPCustomer**: CSPCustomer
 */
export type BillingRelationshipType = string;

export function taxIdentifierArraySerializer(result: Array<TaxIdentifier>): any[] {
  return result.map((item) => {
    return taxIdentifierSerializer(item);
  });
}

export function taxIdentifierArrayDeserializer(result: Array<TaxIdentifier>): any[] {
  return result.map((item) => {
    return taxIdentifierDeserializer(item);
  });
}

/** A tax identifier for the billing account. */
export interface TaxIdentifier {
  /** The id of the tax identifier. */
  id?: string;
  /** The type of the tax identifier. */
  type?: TaxIdentifierType;
  /** The scope of the tax identifier. */
  scope?: string;
  /** The country of the tax identifier. */
  country?: string;
  /** The status of the tax identifier. */
  status?: TaxIdentifierStatus;
}

export function taxIdentifierSerializer(item: TaxIdentifier): any {
  return {
    id: item["id"],
    type: item["type"],
    scope: item["scope"],
    country: item["country"],
    status: item["status"],
  };
}

export function taxIdentifierDeserializer(item: any): TaxIdentifier {
  return {
    id: item["id"],
    type: item["type"],
    scope: item["scope"],
    country: item["country"],
    status: item["status"],
  };
}

/** The type of the tax identifier. */
export enum KnownTaxIdentifierType {
  /** Other */
  Other = "Other",
  /** BrazilCcmId */
  BrazilCcmId = "BrazilCcmId",
  /** BrazilCnpjId */
  BrazilCnpjId = "BrazilCnpjId",
  /** BrazilCpfId */
  BrazilCpfId = "BrazilCpfId",
  /** CanadianFederalExempt */
  CanadianFederalExempt = "CanadianFederalExempt",
  /** CanadianProvinceExempt */
  CanadianProvinceExempt = "CanadianProvinceExempt",
  /** ExternalTaxation */
  ExternalTaxation = "ExternalTaxation",
  /** IndiaFederalTanId */
  IndiaFederalTanId = "IndiaFederalTanId",
  /** IndiaFederalServiceTaxId */
  IndiaFederalServiceTaxId = "IndiaFederalServiceTaxId",
  /** IndiaPanId */
  IndiaPanId = "IndiaPanId",
  /** IndiaStateCstId */
  IndiaStateCstId = "IndiaStateCstId",
  /** IndiaStateGstINId */
  IndiaStateGstINId = "IndiaStateGstINId",
  /** IndiaStateVatId */
  IndiaStateVatId = "IndiaStateVatId",
  /** IntlExempt */
  IntlExempt = "IntlExempt",
  /** USExempt */
  USExempt = "USExempt",
  /** VatId */
  VatId = "VatId",
  /** LoveCode */
  LoveCode = "LoveCode",
  /** MobileBarCode */
  MobileBarCode = "MobileBarCode",
  /** NationalIdentificationNumber */
  NationalIdentificationNumber = "NationalIdentificationNumber",
  /** PublicSectorId */
  PublicSectorId = "PublicSectorId",
}

/**
 * The type of the tax identifier. \
 * {@link KnownTaxIdentifierType} can be used interchangeably with TaxIdentifierType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **BrazilCcmId**: BrazilCcmId \
 * **BrazilCnpjId**: BrazilCnpjId \
 * **BrazilCpfId**: BrazilCpfId \
 * **CanadianFederalExempt**: CanadianFederalExempt \
 * **CanadianProvinceExempt**: CanadianProvinceExempt \
 * **ExternalTaxation**: ExternalTaxation \
 * **IndiaFederalTanId**: IndiaFederalTanId \
 * **IndiaFederalServiceTaxId**: IndiaFederalServiceTaxId \
 * **IndiaPanId**: IndiaPanId \
 * **IndiaStateCstId**: IndiaStateCstId \
 * **IndiaStateGstINId**: IndiaStateGstINId \
 * **IndiaStateVatId**: IndiaStateVatId \
 * **IntlExempt**: IntlExempt \
 * **USExempt**: USExempt \
 * **VatId**: VatId \
 * **LoveCode**: LoveCode \
 * **MobileBarCode**: MobileBarCode \
 * **NationalIdentificationNumber**: NationalIdentificationNumber \
 * **PublicSectorId**: PublicSectorId
 */
export type TaxIdentifierType = string;

/** The status of the tax identifier. */
export enum KnownTaxIdentifierStatus {
  /** Other */
  Other = "Other",
  /** Valid */
  Valid = "Valid",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * The status of the tax identifier. \
 * {@link KnownTaxIdentifierStatus} can be used interchangeably with TaxIdentifierStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Valid**: Valid \
 * **Invalid**: Invalid
 */
export type TaxIdentifierStatus = string;

/** The properties of an enrollment. */
export interface EnrollmentDetails {
  /** The start date of the enrollment. */
  startDate?: Date;
  /** The end date of the enrollment. */
  endDate?: Date;
  /** The billing currency for the enrollment. */
  readonly currency?: string;
  /** The channel type of the enrollment. */
  readonly channel?: string;
  /** The language for the enrollment. */
  readonly language?: string;
  /** The country code of the enrollment. */
  readonly countryCode?: string;
  /** The billing cycle for the enrollment. */
  readonly billingCycle?: string;
  /** The billing account extension opted by the company. */
  readonly extendedTermOption?: ExtendedTermOption;
  /** The support level offer associated with an enrollment. */
  readonly supportLevel?: SupportLevel;
  /** The support coverage period for the enrollment. */
  readonly supportCoverage?: string;
  /** The cloud of the enrollment. */
  readonly cloud?: string;
  /** The purchase order number of the enrollment. */
  poNumber?: string;
  /** Markup status of enrollment, applicable only for indirect enrollments. */
  readonly markupStatus?: MarkupStatus;
  /** The properties of an enrollment which are applicable only for indirect enrollments. */
  indirectRelationshipInfo?: EnrollmentDetailsIndirectRelationshipInfo;
  /** The contact who receives invoices of the enrollment. */
  readonly invoiceRecipient?: string;
}

export function enrollmentDetailsSerializer(item: EnrollmentDetails): any {
  return {
    startDate: !item["startDate"] ? item["startDate"] : item["startDate"].toISOString(),
    endDate: !item["endDate"] ? item["endDate"] : item["endDate"].toISOString(),
    poNumber: item["poNumber"],
    indirectRelationshipInfo: !item["indirectRelationshipInfo"]
      ? item["indirectRelationshipInfo"]
      : enrollmentDetailsIndirectRelationshipInfoSerializer(item["indirectRelationshipInfo"]),
  };
}

export function enrollmentDetailsDeserializer(item: any): EnrollmentDetails {
  return {
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    currency: item["currency"],
    channel: item["channel"],
    language: item["language"],
    countryCode: item["countryCode"],
    billingCycle: item["billingCycle"],
    extendedTermOption: item["extendedTermOption"],
    supportLevel: item["supportLevel"],
    supportCoverage: item["supportCoverage"],
    cloud: item["cloud"],
    poNumber: item["poNumber"],
    markupStatus: item["markupStatus"],
    indirectRelationshipInfo: !item["indirectRelationshipInfo"]
      ? item["indirectRelationshipInfo"]
      : enrollmentDetailsIndirectRelationshipInfoDeserializer(item["indirectRelationshipInfo"]),
    invoiceRecipient: item["invoiceRecipient"],
  };
}

/** The billing account extension opted by the company. */
export enum KnownExtendedTermOption {
  /** Other */
  Other = "Other",
  /** Opted-In */
  OptedIn = "Opted-In",
  /** Opted-Out */
  OptedOut = "Opted-Out",
}

/**
 * The billing account extension opted by the company. \
 * {@link KnownExtendedTermOption} can be used interchangeably with ExtendedTermOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Opted-In**: Opted-In \
 * **Opted-Out**: Opted-Out
 */
export type ExtendedTermOption = string;

/** The support level offer associated with an enrollment. */
export enum KnownSupportLevel {
  /** Other */
  Other = "Other",
  /** Standard */
  Standard = "Standard",
  /** Pro-Direct */
  ProDirect = "Pro-Direct",
  /** Developer */
  Developer = "Developer",
}

/**
 * The support level offer associated with an enrollment. \
 * {@link KnownSupportLevel} can be used interchangeably with SupportLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Standard**: Standard \
 * **Pro-Direct**: Pro-Direct \
 * **Developer**: Developer
 */
export type SupportLevel = string;

/** Markup status of enrollment, applicable only for indirect enrollments. */
export enum KnownMarkupStatus {
  /** Other */
  Other = "Other",
  /** Disabled */
  Disabled = "Disabled",
  /** Preview */
  Preview = "Preview",
  /** Published */
  Published = "Published",
  /** Locked */
  Locked = "Locked",
}

/**
 * Markup status of enrollment, applicable only for indirect enrollments. \
 * {@link KnownMarkupStatus} can be used interchangeably with MarkupStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Disabled**: Disabled \
 * **Preview**: Preview \
 * **Published**: Published \
 * **Locked**: Locked
 */
export type MarkupStatus = string;

/** The properties of an enrollment which are applicable only for indirect enrollments. */
export interface EnrollmentDetailsIndirectRelationshipInfo extends IndirectRelationshipInfo {}

export function enrollmentDetailsIndirectRelationshipInfoSerializer(
  item: EnrollmentDetailsIndirectRelationshipInfo,
): any {
  return {
    billingAccountName: item["billingAccountName"],
    billingProfileName: item["billingProfileName"],
    displayName: item["displayName"],
  };
}

export function enrollmentDetailsIndirectRelationshipInfoDeserializer(
  item: any,
): EnrollmentDetailsIndirectRelationshipInfo {
  return {
    billingAccountName: item["billingAccountName"],
    billingProfileName: item["billingProfileName"],
    displayName: item["displayName"],
  };
}

/** Identifies the billing profile that is linked to another billing profile in indirect purchase motion. */
export interface IndirectRelationshipInfo {
  /** The billing account name of the partner or the customer for an indirect motion. */
  billingAccountName?: string;
  /** The billing profile name of the partner or the customer for an indirect motion. */
  billingProfileName?: string;
  /** The display name of the partner or customer for an indirect motion. */
  displayName?: string;
}

export function indirectRelationshipInfoSerializer(item: IndirectRelationshipInfo): any {
  return {
    billingAccountName: item["billingAccountName"],
    billingProfileName: item["billingProfileName"],
    displayName: item["displayName"],
  };
}

export function indirectRelationshipInfoDeserializer(item: any): IndirectRelationshipInfo {
  return {
    billingAccountName: item["billingAccountName"],
    billingProfileName: item["billingProfileName"],
    displayName: item["displayName"],
  };
}

/** Address details. */
export interface AddressDetails {
  /** Address line 1. */
  addressLine1: string;
  /** Address line 2. */
  addressLine2?: string;
  /** Address line 3. */
  addressLine3?: string;
  /** Address city. */
  city?: string;
  /** Company name. Optional for MCA Individual (Pay-as-you-go). */
  companyName?: string;
  /** Country code uses ISO 3166-1 Alpha-2 format. */
  country: string;
  /** Address district. */
  district?: string;
  /** Email address. */
  email?: string;
  /** First name. Optional for MCA Enterprise. */
  firstName?: string;
  /** Last name. Optional for MCA Enterprise. */
  lastName?: string;
  /** Middle name. */
  middleName?: string;
  /** Phone number. */
  phoneNumber?: string;
  /** Postal code. */
  postalCode?: string;
  /** Address region. */
  region?: string;
  /** Indicates if the address is incomplete. */
  isValidAddress?: boolean;
}

export function addressDetailsSerializer(item: AddressDetails): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

export function addressDetailsDeserializer(item: any): AddressDetails {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

/** Describes the registration number of the organization linked with the billing account. */
export interface RegistrationNumber {
  /** The unique identification number of the organization linked with the billing account. */
  id?: string;
  /** Identifies if the registration number is required for the billing account. */
  readonly required?: boolean;
  /** The types of registration number allowed based on the country of the billing account. */
  readonly type?: string[];
}

export function registrationNumberSerializer(item: RegistrationNumber): any {
  return { id: item["id"] };
}

export function registrationNumberDeserializer(item: any): RegistrationNumber {
  return {
    id: item["id"],
    required: item["required"],
    type: !item["type"]
      ? item["type"]
      : item["type"].map((p: any) => {
          return p;
        }),
  };
}

/** A billing account. */
export interface BillingAccountPatch extends ProxyResourceWithTags {
  /** A billing account. */
  properties?: BillingAccountProperties;
}

export function billingAccountPatchSerializer(item: BillingAccountPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : billingAccountPropertiesSerializer(item["properties"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources. */
export interface ProxyResourceWithTags extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function proxyResourceWithTagsSerializer(item: ProxyResourceWithTags): any {
  return { tags: item["tags"] };
}

export function proxyResourceWithTagsDeserializer(item: any): ProxyResourceWithTags {
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
  };
}

/** Paged collection of BillingAccount items */
export interface _BillingAccountListResult {
  /** The BillingAccount items on this page */
  readonly value: BillingAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingAccountListResultDeserializer(item: any): _BillingAccountListResult {
  return {
    value: billingAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingAccountArrayDeserializer(result: Array<BillingAccount>): any[] {
  return result.map((item) => {
    return billingAccountDeserializer(item);
  });
}

/** The properties of payment term. */
export interface PaymentTerm {
  /** Represents duration in netXX format. Always in days. */
  term?: string;
  /** The date on when the defined 'Payment Term' will be effective from and is always in UTC. */
  startDate?: Date;
  /** The date on when the defined 'Payment Term' will end and is always in UTC. */
  endDate?: Date;
  /** Indicates payment term is the standard payment term. */
  readonly isDefault?: boolean;
}

export function paymentTermSerializer(item: PaymentTerm): any {
  return {
    term: item["term"],
    startDate: !item["startDate"] ? item["startDate"] : item["startDate"].toISOString(),
    endDate: !item["endDate"] ? item["endDate"] : item["endDate"].toISOString(),
  };
}

export function paymentTermDeserializer(item: any): PaymentTerm {
  return {
    term: item["term"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    isDefault: item["isDefault"],
  };
}

/** The details for a billing account transitioned from agreement type Microsoft Online Services Program to agreement type Microsoft Customer Agreement. */
export interface TransitionDetails {
  /** The transition completion date. */
  readonly transitionDate?: Date;
  /** The anniversary day of the pre-transitioned account of type Microsoft Online Services Program. */
  readonly anniversaryDay?: number;
}

export function transitionDetailsDeserializer(item: any): TransitionDetails {
  return {
    transitionDate: !item["transitionDate"]
      ? item["transitionDate"]
      : new Date(item["transitionDate"]),
    anniversaryDay: item["anniversaryDay"],
  };
}

/** A container for a list of resources */
export interface _InvoiceSectionWithCreateSubPermissionListResult {
  /** The InvoiceSectionWithCreateSubPermission items on this page */
  readonly value: InvoiceSectionWithCreateSubPermission[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _invoiceSectionWithCreateSubPermissionListResultDeserializer(
  item: any,
): _InvoiceSectionWithCreateSubPermissionListResult {
  return {
    value: invoiceSectionWithCreateSubPermissionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function invoiceSectionWithCreateSubPermissionArrayDeserializer(
  result: Array<InvoiceSectionWithCreateSubPermission>,
): any[] {
  return result.map((item) => {
    return invoiceSectionWithCreateSubPermissionDeserializer(item);
  });
}

/** Invoice section properties with create subscription permission. */
export interface InvoiceSectionWithCreateSubPermission {
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  readonly billingProfileId?: string;
  /** The system generated unique identifier for a billing profile. */
  readonly billingProfileSystemId?: string;
  /** The status of the billing profile. */
  readonly billingProfileStatus?: BillingProfileStatus;
  /** Reason for the specified billing profile status. */
  readonly billingProfileStatusReasonCode?: BillingProfileStatusReasonCode;
  /** The billing profile spending limit. */
  readonly billingProfileSpendingLimit?: SpendingLimit;
  /** Enabled azure plans for the associated billing profile. */
  readonly enabledAzurePlans?: AzurePlan[];
  /** The name of the invoice section. */
  readonly invoiceSectionDisplayName?: string;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  readonly invoiceSectionId?: string;
  /** The system generated unique identifier for an invoice section. */
  readonly invoiceSectionSystemId?: string;
}

export function invoiceSectionWithCreateSubPermissionDeserializer(
  item: any,
): InvoiceSectionWithCreateSubPermission {
  return {
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileId: item["billingProfileId"],
    billingProfileSystemId: item["billingProfileSystemId"],
    billingProfileStatus: item["billingProfileStatus"],
    billingProfileStatusReasonCode: item["billingProfileStatusReasonCode"],
    billingProfileSpendingLimit: item["billingProfileSpendingLimit"],
    enabledAzurePlans: !item["enabledAzurePlans"]
      ? item["enabledAzurePlans"]
      : azurePlanArrayDeserializer(item["enabledAzurePlans"]),
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionSystemId: item["invoiceSectionSystemId"],
  };
}

/** The status of the billing profile. */
export enum KnownBillingProfileStatus {
  /** Other */
  Other = "Other",
  /** Active */
  Active = "Active",
  /** Disabled */
  Disabled = "Disabled",
  /** Warned */
  Warned = "Warned",
  /** Deleted */
  Deleted = "Deleted",
  /** UnderReview */
  UnderReview = "UnderReview",
}

/**
 * The status of the billing profile. \
 * {@link KnownBillingProfileStatus} can be used interchangeably with BillingProfileStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Active**: Active \
 * **Disabled**: Disabled \
 * **Warned**: Warned \
 * **Deleted**: Deleted \
 * **UnderReview**: UnderReview
 */
export type BillingProfileStatus = string;

/** Reason for the specified billing profile status. */
export enum KnownBillingProfileStatusReasonCode {
  /** Other */
  Other = "Other",
  /** PastDue */
  PastDue = "PastDue",
  /** UnusualActivity */
  UnusualActivity = "UnusualActivity",
  /** SpendingLimitReached */
  SpendingLimitReached = "SpendingLimitReached",
  /** SpendingLimitExpired */
  SpendingLimitExpired = "SpendingLimitExpired",
}

/**
 * Reason for the specified billing profile status. \
 * {@link KnownBillingProfileStatusReasonCode} can be used interchangeably with BillingProfileStatusReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **PastDue**: PastDue \
 * **UnusualActivity**: UnusualActivity \
 * **SpendingLimitReached**: SpendingLimitReached \
 * **SpendingLimitExpired**: SpendingLimitExpired
 */
export type BillingProfileStatusReasonCode = string;

/** The billing profile spending limit. */
export enum KnownSpendingLimit {
  /** Off */
  Off = "Off",
  /** On */
  On = "On",
}

/**
 * The billing profile spending limit. \
 * {@link KnownSpendingLimit} can be used interchangeably with SpendingLimit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Off**: Off \
 * **On**: On
 */
export type SpendingLimit = string;

export function azurePlanArraySerializer(result: Array<AzurePlan>): any[] {
  return result.map((item) => {
    return azurePlanSerializer(item);
  });
}

export function azurePlanArrayDeserializer(result: Array<AzurePlan>): any[] {
  return result.map((item) => {
    return azurePlanDeserializer(item);
  });
}

/** Details of the Azure plan. */
export interface AzurePlan {
  /** The ID that uniquely identifies a product. */
  productId?: string;
  /** The ID that uniquely identifies a sku. */
  skuId?: string;
  /** The sku description. */
  skuDescription?: string;
}

export function azurePlanSerializer(item: AzurePlan): any {
  return {
    productId: item["productId"],
    skuId: item["skuId"],
    skuDescription: item["skuDescription"],
  };
}

export function azurePlanDeserializer(item: any): AzurePlan {
  return {
    productId: item["productId"],
    skuId: item["skuId"],
    skuDescription: item["skuDescription"],
  };
}

/** Result of the payment terms eligibility. */
export interface PaymentTermsEligibilityResult {
  /** Indicates the eligibility status of the payment terms. */
  eligibilityStatus?: PaymentTermsEligibilityStatus;
  /** Details of the payment terms eligibility. */
  eligibilityDetails?: PaymentTermsEligibilityDetail[];
}

export function paymentTermsEligibilityResultDeserializer(
  item: any,
): PaymentTermsEligibilityResult {
  return {
    eligibilityStatus: item["eligibilityStatus"],
    eligibilityDetails: !item["eligibilityDetails"]
      ? item["eligibilityDetails"]
      : paymentTermsEligibilityDetailArrayDeserializer(item["eligibilityDetails"]),
  };
}

/** Indicates the eligibility status of the payment terms. */
export enum KnownPaymentTermsEligibilityStatus {
  /** Other */
  Other = "Other",
  /** Valid */
  Valid = "Valid",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * Indicates the eligibility status of the payment terms. \
 * {@link KnownPaymentTermsEligibilityStatus} can be used interchangeably with PaymentTermsEligibilityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Valid**: Valid \
 * **Invalid**: Invalid
 */
export type PaymentTermsEligibilityStatus = string;

export function paymentTermsEligibilityDetailArrayDeserializer(
  result: Array<PaymentTermsEligibilityDetail>,
): any[] {
  return result.map((item) => {
    return paymentTermsEligibilityDetailDeserializer(item);
  });
}

/** Details of the payment terms eligibility. */
export interface PaymentTermsEligibilityDetail {
  /** Indicates the reason for the ineligibility of the payment terms. */
  code?: PaymentTermsEligibilityCode;
  /** Indicates the message for the ineligibility of the payment terms. */
  message?: string;
}

export function paymentTermsEligibilityDetailDeserializer(
  item: any,
): PaymentTermsEligibilityDetail {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Indicates the reason for the ineligibility of the payment terms. */
export enum KnownPaymentTermsEligibilityCode {
  /** Other */
  Other = "Other",
  /** OverlappingPaymentTerms */
  OverlappingPaymentTerms = "OverlappingPaymentTerms",
  /** InvalidDateFormat */
  InvalidDateFormat = "InvalidDateFormat",
  /** InvalidDateRange */
  InvalidDateRange = "InvalidDateRange",
  /** InactiveBillingAccount */
  InactiveBillingAccount = "InactiveBillingAccount",
  /** InvalidBillingAccountType */
  InvalidBillingAccountType = "InvalidBillingAccountType",
  /** NullOrEmptyPaymentTerms */
  NullOrEmptyPaymentTerms = "NullOrEmptyPaymentTerms",
  /** BillingAccountNotFound */
  BillingAccountNotFound = "BillingAccountNotFound",
  /** IneligibleBillingAccountStatus */
  IneligibleBillingAccountStatus = "IneligibleBillingAccountStatus",
  /** InvalidTerms */
  InvalidTerms = "InvalidTerms",
}

/**
 * Indicates the reason for the ineligibility of the payment terms. \
 * {@link KnownPaymentTermsEligibilityCode} can be used interchangeably with PaymentTermsEligibilityCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **OverlappingPaymentTerms**: OverlappingPaymentTerms \
 * **InvalidDateFormat**: InvalidDateFormat \
 * **InvalidDateRange**: InvalidDateRange \
 * **InactiveBillingAccount**: InactiveBillingAccount \
 * **InvalidBillingAccountType**: InvalidBillingAccountType \
 * **NullOrEmptyPaymentTerms**: NullOrEmptyPaymentTerms \
 * **BillingAccountNotFound**: BillingAccountNotFound \
 * **IneligibleBillingAccountStatus**: IneligibleBillingAccountStatus \
 * **InvalidTerms**: InvalidTerms
 */
export type PaymentTermsEligibilityCode = string;

/** An associated tenant. */
export interface AssociatedTenant extends ProxyResource {
  /** An associated tenant. */
  properties?: AssociatedTenantProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function associatedTenantSerializer(item: AssociatedTenant): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : associatedTenantPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function associatedTenantDeserializer(item: any): AssociatedTenant {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : associatedTenantPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** An associated tenant. */
export interface AssociatedTenantProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The name of the associated tenant. */
  displayName?: string;
  /** The ID that uniquely identifies a tenant. */
  tenantId?: string;
  /** The state determines whether users from the associated tenant can be assigned roles for commerce activities like viewing and downloading invoices, managing payments, and making purchases. */
  billingManagementState?: BillingManagementTenantState;
  /** The state determines whether subscriptions and licenses can be provisioned in the associated tenant. It can be set to 'Pending' to initiate a billing request. */
  provisioningManagementState?: ProvisioningTenantState;
  /** The unique identifier for the billing request that is created when enabling provisioning for an associated tenant. */
  readonly provisioningBillingRequestId?: string;
}

export function associatedTenantPropertiesSerializer(item: AssociatedTenantProperties): any {
  return {
    displayName: item["displayName"],
    tenantId: item["tenantId"],
    billingManagementState: item["billingManagementState"],
    provisioningManagementState: item["provisioningManagementState"],
  };
}

export function associatedTenantPropertiesDeserializer(item: any): AssociatedTenantProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    tenantId: item["tenantId"],
    billingManagementState: item["billingManagementState"],
    provisioningManagementState: item["provisioningManagementState"],
    provisioningBillingRequestId: item["provisioningBillingRequestId"],
  };
}

/** The state determines whether users from the associated tenant can be assigned roles for commerce activities like viewing and downloading invoices, managing payments, and making purchases. */
export enum KnownBillingManagementTenantState {
  /** Other */
  Other = "Other",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
  /** Active */
  Active = "Active",
  /** Revoked */
  Revoked = "Revoked",
}

/**
 * The state determines whether users from the associated tenant can be assigned roles for commerce activities like viewing and downloading invoices, managing payments, and making purchases. \
 * {@link KnownBillingManagementTenantState} can be used interchangeably with BillingManagementTenantState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **NotAllowed**: NotAllowed \
 * **Active**: Active \
 * **Revoked**: Revoked
 */
export type BillingManagementTenantState = string;

/** The state determines whether subscriptions and licenses can be provisioned in the associated tenant. It can be set to 'Pending' to initiate a billing request. */
export enum KnownProvisioningTenantState {
  /** Other */
  Other = "Other",
  /** NotRequested */
  NotRequested = "NotRequested",
  /** Active */
  Active = "Active",
  /** Pending */
  Pending = "Pending",
  /** BillingRequestExpired */
  BillingRequestExpired = "BillingRequestExpired",
  /** BillingRequestDeclined */
  BillingRequestDeclined = "BillingRequestDeclined",
  /** Revoked */
  Revoked = "Revoked",
}

/**
 * The state determines whether subscriptions and licenses can be provisioned in the associated tenant. It can be set to 'Pending' to initiate a billing request. \
 * {@link KnownProvisioningTenantState} can be used interchangeably with ProvisioningTenantState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **NotRequested**: NotRequested \
 * **Active**: Active \
 * **Pending**: Pending \
 * **BillingRequestExpired**: BillingRequestExpired \
 * **BillingRequestDeclined**: BillingRequestDeclined \
 * **Revoked**: Revoked
 */
export type ProvisioningTenantState = string;

/** Paged collection of AssociatedTenant items */
export interface _AssociatedTenantListResult {
  /** The AssociatedTenant items on this page */
  readonly value: AssociatedTenant[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _associatedTenantListResultDeserializer(item: any): _AssociatedTenantListResult {
  return {
    value: associatedTenantArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function associatedTenantArraySerializer(result: Array<AssociatedTenant>): any[] {
  return result.map((item) => {
    return associatedTenantSerializer(item);
  });
}

export function associatedTenantArrayDeserializer(result: Array<AssociatedTenant>): any[] {
  return result.map((item) => {
    return associatedTenantDeserializer(item);
  });
}

/** The Available Credit or Payment on Account Balance. The credit balance can be used to settle due or past due invoices. */
export interface AvailableBalance extends ProxyResource {
  /** The Available Credit or Payment on Account Balance. The credit balance can be used to settle due or past due invoices. */
  properties?: AvailableBalanceProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function availableBalanceDeserializer(item: any): AvailableBalance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : availableBalancePropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The Available Credit or Payment on Account Balance. The credit balance can be used to settle due or past due invoices. */
export interface AvailableBalanceProperties {
  /** Credit amount for immediate payment. */
  amount?: AvailableBalancePropertiesAmount;
  /** The list of payments on accounts. */
  readonly paymentsOnAccount?: PaymentOnAccount[];
  /** Total amount of payments on accounts. */
  totalPaymentsOnAccount?: AvailableBalancePropertiesTotalPaymentsOnAccount;
}

export function availableBalancePropertiesDeserializer(item: any): AvailableBalanceProperties {
  return {
    amount: !item["amount"]
      ? item["amount"]
      : availableBalancePropertiesAmountDeserializer(item["amount"]),
    paymentsOnAccount: !item["paymentsOnAccount"]
      ? item["paymentsOnAccount"]
      : paymentOnAccountArrayDeserializer(item["paymentsOnAccount"]),
    totalPaymentsOnAccount: !item["totalPaymentsOnAccount"]
      ? item["totalPaymentsOnAccount"]
      : availableBalancePropertiesTotalPaymentsOnAccountDeserializer(
          item["totalPaymentsOnAccount"],
        ),
  };
}

/** Credit amount for immediate payment. */
export interface AvailableBalancePropertiesAmount extends Amount {}

export function availableBalancePropertiesAmountDeserializer(
  item: any,
): AvailableBalancePropertiesAmount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

export function paymentOnAccountArrayDeserializer(result: Array<PaymentOnAccount>): any[] {
  return result.map((item) => {
    return paymentOnAccountDeserializer(item);
  });
}

/** A Payment on Account. */
export interface PaymentOnAccount {
  /** Payment on Account amount. */
  amount?: PaymentOnAccountAmount;
  /** The ID of the billing profile for the payments on account. */
  readonly billingProfileId?: string;
  /** The name of the billing profile for the payments on account. */
  readonly billingProfileDisplayName?: string;
  /** The ID of the invoice for which the payments on account was generated. */
  readonly invoiceId?: string;
  /** The name of the invoice for the payments on account. */
  readonly invoiceName?: string;
  /** The date of the payments on account. */
  readonly date?: Date;
  /** Payment on Account type. */
  readonly paymentMethodType?: PaymentMethodFamily;
}

export function paymentOnAccountDeserializer(item: any): PaymentOnAccount {
  return {
    amount: !item["amount"] ? item["amount"] : paymentOnAccountAmountDeserializer(item["amount"]),
    billingProfileId: item["billingProfileId"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    invoiceId: item["invoiceId"],
    invoiceName: item["invoiceName"],
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    paymentMethodType: item["paymentMethodType"],
  };
}

/** Payment on Account amount. */
export interface PaymentOnAccountAmount extends Amount {}

export function paymentOnAccountAmountDeserializer(item: any): PaymentOnAccountAmount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** Total amount of payments on accounts. */
export interface AvailableBalancePropertiesTotalPaymentsOnAccount extends Amount {}

export function availableBalancePropertiesTotalPaymentsOnAccountDeserializer(
  item: any,
): AvailableBalancePropertiesTotalPaymentsOnAccount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** A product. */
export interface Product extends ProxyResource {
  /** A product. */
  properties?: ProductProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function productDeserializer(item: any): Product {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : productPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A product. */
export interface ProductProperties {
  /** Indicates whether auto renewal is turned on or off for a product. */
  autoRenew?: AutoRenew;
  /** The availability of the product. */
  readonly availabilityId?: string;
  /** The frequency at which the product will be billed. */
  readonly billingFrequency?: string;
  /** The ID of the billing profile to which the product is billed. */
  readonly billingProfileId?: string;
  /** The name of the billing profile to which the product is billed. */
  readonly billingProfileDisplayName?: string;
  /** The ID of the customer for whom the product was purchased. The field is applicable only for Microsoft Partner Agreement billing account. */
  readonly customerId?: string;
  /** The name of the customer for whom the product was purchased. The field is applicable only for Microsoft Partner Agreement billing account. */
  readonly customerDisplayName?: string;
  /** The display name of the product. */
  readonly displayName?: string;
  /** The date when the product will be renewed or canceled. */
  readonly endDate?: string;
  /** The ID of the invoice section to which the product is billed. */
  readonly invoiceSectionId?: string;
  /** The name of the invoice section to which the product is billed. */
  readonly invoiceSectionDisplayName?: string;
  /** The last month charges. */
  lastCharge?: ProductPropertiesLastCharge;
  /** The date of the last charge. */
  readonly lastChargeDate?: string;
  /** The description of the type of product. */
  readonly productType?: string;
  /** The ID of the type of product. */
  readonly productTypeId?: string;
  /** The sku ID of the product. */
  readonly skuId?: string;
  /** The sku description of the product. */
  readonly skuDescription?: string;
  /** The date when the product was purchased. */
  readonly purchaseDate?: string;
  /** The quantity purchased for the product. */
  readonly quantity?: number;
  /** The status of the product. */
  readonly status?: ProductStatus;
  /** The id of the tenant in which the product is used. */
  readonly tenantId?: string;
  /** Reseller for this product. The fields is not available for Microsoft Partner Agreement products. */
  reseller?: ProductPropertiesReseller;
}

export function productPropertiesSerializer(item: ProductProperties): any {
  return {
    autoRenew: item["autoRenew"],
    lastCharge: !item["lastCharge"]
      ? item["lastCharge"]
      : productPropertiesLastChargeSerializer(item["lastCharge"]),
    reseller: !item["reseller"]
      ? item["reseller"]
      : productPropertiesResellerSerializer(item["reseller"]),
  };
}

export function productPropertiesDeserializer(item: any): ProductProperties {
  return {
    autoRenew: item["autoRenew"],
    availabilityId: item["availabilityId"],
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    customerId: item["customerId"],
    customerDisplayName: item["customerDisplayName"],
    displayName: item["displayName"],
    endDate: item["endDate"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    lastCharge: !item["lastCharge"]
      ? item["lastCharge"]
      : productPropertiesLastChargeDeserializer(item["lastCharge"]),
    lastChargeDate: item["lastChargeDate"],
    productType: item["productType"],
    productTypeId: item["productTypeId"],
    skuId: item["skuId"],
    skuDescription: item["skuDescription"],
    purchaseDate: item["purchaseDate"],
    quantity: item["quantity"],
    status: item["status"],
    tenantId: item["tenantId"],
    reseller: !item["reseller"]
      ? item["reseller"]
      : productPropertiesResellerDeserializer(item["reseller"]),
  };
}

/** Indicates whether auto renewal is turned on or off for a product. */
export enum KnownAutoRenew {
  /** Off */
  Off = "Off",
  /** On */
  On = "On",
}

/**
 * Indicates whether auto renewal is turned on or off for a product. \
 * {@link KnownAutoRenew} can be used interchangeably with AutoRenew,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Off**: Off \
 * **On**: On
 */
export type AutoRenew = string;

/** The last month charges. */
export interface ProductPropertiesLastCharge extends Amount {}

export function productPropertiesLastChargeSerializer(item: ProductPropertiesLastCharge): any {
  return item;
}

export function productPropertiesLastChargeDeserializer(item: any): ProductPropertiesLastCharge {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The status of the product. */
export enum KnownProductStatus {
  /** Other */
  Other = "Other",
  /** Active */
  Active = "Active",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
  /** PastDue */
  PastDue = "PastDue",
  /** Expiring */
  Expiring = "Expiring",
  /** Expired */
  Expired = "Expired",
  /** AutoRenew */
  AutoRenew = "AutoRenew",
  /** Canceled */
  Canceled = "Canceled",
  /** Suspended */
  Suspended = "Suspended",
}

/**
 * The status of the product. \
 * {@link KnownProductStatus} can be used interchangeably with ProductStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Active**: Active \
 * **Disabled**: Disabled \
 * **Deleted**: Deleted \
 * **PastDue**: PastDue \
 * **Expiring**: Expiring \
 * **Expired**: Expired \
 * **AutoRenew**: AutoRenew \
 * **Canceled**: Canceled \
 * **Suspended**: Suspended
 */
export type ProductStatus = string;

/** Reseller for this product. The fields is not available for Microsoft Partner Agreement products. */
export interface ProductPropertiesReseller extends Reseller {}

export function productPropertiesResellerSerializer(item: ProductPropertiesReseller): any {
  return item;
}

export function productPropertiesResellerDeserializer(item: any): ProductPropertiesReseller {
  return {
    resellerId: item["resellerId"],
    description: item["description"],
  };
}

/** Details of the reseller. */
export interface Reseller {
  /** The MPN ID of the reseller. */
  readonly resellerId?: string;
  /** The name of the reseller. */
  readonly description?: string;
}

export function resellerSerializer(item: Reseller): any {
  return item;
}

export function resellerDeserializer(item: any): Reseller {
  return {
    resellerId: item["resellerId"],
    description: item["description"],
  };
}

/** A product. */
export interface ProductPatch extends ProxyResourceWithTags {
  /** A product. */
  properties?: ProductProperties;
}

export function productPatchSerializer(item: ProductPatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : productPropertiesSerializer(item["properties"]),
  };
}

/** Paged collection of Product items */
export interface _ProductListResult {
  /** The Product items on this page */
  readonly value: Product[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _productListResultDeserializer(item: any): _ProductListResult {
  return {
    value: productArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function productArrayDeserializer(result: Array<Product>): any[] {
  return result.map((item) => {
    return productDeserializer(item);
  });
}

/** The properties of the product to initiate a transfer. */
export interface MoveProductRequest {
  /** The destination invoice section id. */
  destinationInvoiceSectionId: string;
}

export function moveProductRequestSerializer(item: MoveProductRequest): any {
  return { destinationInvoiceSectionId: item["destinationInvoiceSectionId"] };
}

/** Result of the transfer eligibility validation. */
export interface MoveProductEligibilityResult {
  /** Specifies whether the subscription is eligible to be transferred. */
  isMoveEligible?: boolean;
  /** Error details of the transfer eligibility validation. */
  errorDetails?: MoveProductEligibilityResultErrorDetails;
}

export function moveProductEligibilityResultDeserializer(item: any): MoveProductEligibilityResult {
  return {
    isMoveEligible: item["isMoveEligible"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : moveProductEligibilityResultErrorDetailsDeserializer(item["errorDetails"]),
  };
}

/** Error details of the transfer eligibility validation. */
export interface MoveProductEligibilityResultErrorDetails extends MoveProductErrorDetails {}

export function moveProductEligibilityResultErrorDetailsDeserializer(
  item: any,
): MoveProductEligibilityResultErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    details: item["details"],
  };
}

/** Error details of the transfer eligibility validation. */
export interface MoveProductErrorDetails {
  /** Error code for the product transfer validation. */
  readonly code?: MoveValidationErrorCode;
  /** The error message. */
  readonly message?: string;
  /** Error details of the transfer eligibility validation. */
  readonly details?: string;
}

export function moveProductErrorDetailsDeserializer(item: any): MoveProductErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    details: item["details"],
  };
}

/** Error code for the product transfer validation. */
export enum KnownMoveValidationErrorCode {
  /** Other */
  Other = "Other",
  /** BillingAccountInactive */
  BillingAccountInactive = "BillingAccountInactive",
  /** DestinationBillingProfileInactive */
  DestinationBillingProfileInactive = "DestinationBillingProfileInactive",
  /** DestinationBillingProfileNotFound */
  DestinationBillingProfileNotFound = "DestinationBillingProfileNotFound",
  /** DestinationBillingProfilePastDue */
  DestinationBillingProfilePastDue = "DestinationBillingProfilePastDue",
  /** DestinationInvoiceSectionInactive */
  DestinationInvoiceSectionInactive = "DestinationInvoiceSectionInactive",
  /** DestinationInvoiceSectionNotFound */
  DestinationInvoiceSectionNotFound = "DestinationInvoiceSectionNotFound",
  /** InsufficientPermissionOnDestination */
  InsufficientPermissionOnDestination = "InsufficientPermissionOnDestination",
  /** InsufficientPermissionOnSource */
  InsufficientPermissionOnSource = "InsufficientPermissionOnSource",
  /** InvalidDestination */
  InvalidDestination = "InvalidDestination",
  /** InvalidSource */
  InvalidSource = "InvalidSource",
  /** MarketplaceNotEnabledOnDestination */
  MarketplaceNotEnabledOnDestination = "MarketplaceNotEnabledOnDestination",
  /** ProductInactive */
  ProductInactive = "ProductInactive",
  /** ProductNotFound */
  ProductNotFound = "ProductNotFound",
  /** ProductTypeNotSupported */
  ProductTypeNotSupported = "ProductTypeNotSupported",
  /** SourceBillingProfilePastDue */
  SourceBillingProfilePastDue = "SourceBillingProfilePastDue",
  /** SourceInvoiceSectionInactive */
  SourceInvoiceSectionInactive = "SourceInvoiceSectionInactive",
}

/**
 * Error code for the product transfer validation. \
 * {@link KnownMoveValidationErrorCode} can be used interchangeably with MoveValidationErrorCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **BillingAccountInactive**: BillingAccountInactive \
 * **DestinationBillingProfileInactive**: DestinationBillingProfileInactive \
 * **DestinationBillingProfileNotFound**: DestinationBillingProfileNotFound \
 * **DestinationBillingProfilePastDue**: DestinationBillingProfilePastDue \
 * **DestinationInvoiceSectionInactive**: DestinationInvoiceSectionInactive \
 * **DestinationInvoiceSectionNotFound**: DestinationInvoiceSectionNotFound \
 * **InsufficientPermissionOnDestination**: InsufficientPermissionOnDestination \
 * **InsufficientPermissionOnSource**: InsufficientPermissionOnSource \
 * **InvalidDestination**: InvalidDestination \
 * **InvalidSource**: InvalidSource \
 * **MarketplaceNotEnabledOnDestination**: MarketplaceNotEnabledOnDestination \
 * **ProductInactive**: ProductInactive \
 * **ProductNotFound**: ProductNotFound \
 * **ProductTypeNotSupported**: ProductTypeNotSupported \
 * **SourceBillingProfilePastDue**: SourceBillingProfilePastDue \
 * **SourceInvoiceSectionInactive**: SourceInvoiceSectionInactive
 */
export type MoveValidationErrorCode = string;

/** A billing profile. */
export interface BillingProfile extends ProxyResource {
  /** A billing profile. */
  properties?: BillingProfileProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function billingProfileSerializer(item: BillingProfile): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : billingProfilePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function billingProfileDeserializer(item: any): BillingProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingProfilePropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A billing profile. */
export interface BillingProfileProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** Identifies the billing relationship represented by the billing profile. The billing relationship may be between Microsoft, the customer, and/or a third-party. */
  readonly billingRelationshipType?: BillingRelationshipType;
  /** Billing address. */
  billTo?: BillingProfilePropertiesBillTo;
  /** The currency in which the charges for the billing profile are billed. */
  readonly currency?: string;
  /** The name of the billing profile. */
  displayName?: string;
  /** Information about the enabled azure plans. */
  enabledAzurePlans?: AzurePlan[];
  /** Indicates whether user has read access to the billing profile. */
  readonly hasReadAccess?: boolean;
  /** Identifies the billing profile that is linked to another billing profile in indirect purchase motion. */
  indirectRelationshipInfo?: BillingProfilePropertiesIndirectRelationshipInfo;
  /** The day of the month when the invoice for the billing profile is generated. */
  readonly invoiceDay?: number;
  /** Flag controlling whether the invoices for the billing profile are sent through email. */
  invoiceEmailOptIn?: boolean;
  /** The list of email addresses to receive invoices by email for the billing profile. */
  invoiceRecipients?: string[];
  /** The default purchase order number that will appear on the invoices generated for the billing profile. */
  poNumber?: string;
  /** The default address where the products are shipped, or the services are being used. If a ship to is not specified for a product or a subscription, then this address will be used. */
  shipTo?: BillingProfilePropertiesShipTo;
  /** The address of the individual or organization that is responsible for the billing account. */
  soldTo?: BillingProfilePropertiesSoldTo;
  /** The billing profile spending limit. */
  readonly spendingLimit?: SpendingLimit;
  /** The details of billing profile spending limit. */
  readonly spendingLimitDetails?: SpendingLimitDetails[];
  /** The status of the billing profile. */
  readonly status?: BillingProfileStatus;
  /** Reason for the specified billing profile status. */
  readonly statusReasonCode?: BillingProfileStatusReasonCode;
  /** The system generated unique identifier for a billing profile. */
  readonly systemId?: string;
  /** Dictionary of metadata associated with the resource. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** Identifies the cloud environments that are associated with a billing profile. This is a system managed optional field and gets updated as the billing profile gets associated with accounts in various clouds. */
  readonly targetClouds?: string[];
  /** The current payment term of the billing profile. */
  currentPaymentTerm?: BillingProfilePropertiesCurrentPaymentTerm;
  /** The other payment terms of the billing profile. */
  readonly otherPaymentTerms?: PaymentTerm[];
}

export function billingProfilePropertiesSerializer(item: BillingProfileProperties): any {
  return {
    billTo: !item["billTo"]
      ? item["billTo"]
      : billingProfilePropertiesBillToSerializer(item["billTo"]),
    displayName: item["displayName"],
    enabledAzurePlans: !item["enabledAzurePlans"]
      ? item["enabledAzurePlans"]
      : azurePlanArraySerializer(item["enabledAzurePlans"]),
    indirectRelationshipInfo: !item["indirectRelationshipInfo"]
      ? item["indirectRelationshipInfo"]
      : billingProfilePropertiesIndirectRelationshipInfoSerializer(
          item["indirectRelationshipInfo"],
        ),
    invoiceEmailOptIn: item["invoiceEmailOptIn"],
    invoiceRecipients: !item["invoiceRecipients"]
      ? item["invoiceRecipients"]
      : item["invoiceRecipients"].map((p: any) => {
          return p;
        }),
    poNumber: item["poNumber"],
    shipTo: !item["shipTo"]
      ? item["shipTo"]
      : billingProfilePropertiesShipToSerializer(item["shipTo"]),
    soldTo: !item["soldTo"]
      ? item["soldTo"]
      : billingProfilePropertiesSoldToSerializer(item["soldTo"]),
    tags: item["tags"],
    currentPaymentTerm: !item["currentPaymentTerm"]
      ? item["currentPaymentTerm"]
      : billingProfilePropertiesCurrentPaymentTermSerializer(item["currentPaymentTerm"]),
  };
}

export function billingProfilePropertiesDeserializer(item: any): BillingProfileProperties {
  return {
    provisioningState: item["provisioningState"],
    billingRelationshipType: item["billingRelationshipType"],
    billTo: !item["billTo"]
      ? item["billTo"]
      : billingProfilePropertiesBillToDeserializer(item["billTo"]),
    currency: item["currency"],
    displayName: item["displayName"],
    enabledAzurePlans: !item["enabledAzurePlans"]
      ? item["enabledAzurePlans"]
      : azurePlanArrayDeserializer(item["enabledAzurePlans"]),
    hasReadAccess: item["hasReadAccess"],
    indirectRelationshipInfo: !item["indirectRelationshipInfo"]
      ? item["indirectRelationshipInfo"]
      : billingProfilePropertiesIndirectRelationshipInfoDeserializer(
          item["indirectRelationshipInfo"],
        ),
    invoiceDay: item["invoiceDay"],
    invoiceEmailOptIn: item["invoiceEmailOptIn"],
    invoiceRecipients: !item["invoiceRecipients"]
      ? item["invoiceRecipients"]
      : item["invoiceRecipients"].map((p: any) => {
          return p;
        }),
    poNumber: item["poNumber"],
    shipTo: !item["shipTo"]
      ? item["shipTo"]
      : billingProfilePropertiesShipToDeserializer(item["shipTo"]),
    soldTo: !item["soldTo"]
      ? item["soldTo"]
      : billingProfilePropertiesSoldToDeserializer(item["soldTo"]),
    spendingLimit: item["spendingLimit"],
    spendingLimitDetails: !item["spendingLimitDetails"]
      ? item["spendingLimitDetails"]
      : spendingLimitDetailsArrayDeserializer(item["spendingLimitDetails"]),
    status: item["status"],
    statusReasonCode: item["statusReasonCode"],
    systemId: item["systemId"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    targetClouds: !item["targetClouds"]
      ? item["targetClouds"]
      : item["targetClouds"].map((p: any) => {
          return p;
        }),
    currentPaymentTerm: !item["currentPaymentTerm"]
      ? item["currentPaymentTerm"]
      : billingProfilePropertiesCurrentPaymentTermDeserializer(item["currentPaymentTerm"]),
    otherPaymentTerms: !item["otherPaymentTerms"]
      ? item["otherPaymentTerms"]
      : paymentTermArrayDeserializer(item["otherPaymentTerms"]),
  };
}

/** Billing address. */
export interface BillingProfilePropertiesBillTo extends AddressDetails {}

export function billingProfilePropertiesBillToSerializer(
  item: BillingProfilePropertiesBillTo,
): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

export function billingProfilePropertiesBillToDeserializer(
  item: any,
): BillingProfilePropertiesBillTo {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

/** Identifies the billing profile that is linked to another billing profile in indirect purchase motion. */
export interface BillingProfilePropertiesIndirectRelationshipInfo extends IndirectRelationshipInfo {}

export function billingProfilePropertiesIndirectRelationshipInfoSerializer(
  item: BillingProfilePropertiesIndirectRelationshipInfo,
): any {
  return {
    billingAccountName: item["billingAccountName"],
    billingProfileName: item["billingProfileName"],
    displayName: item["displayName"],
  };
}

export function billingProfilePropertiesIndirectRelationshipInfoDeserializer(
  item: any,
): BillingProfilePropertiesIndirectRelationshipInfo {
  return {
    billingAccountName: item["billingAccountName"],
    billingProfileName: item["billingProfileName"],
    displayName: item["displayName"],
  };
}

/** The default address where the products are shipped, or the services are being used. If a ship to is not specified for a product or a subscription, then this address will be used. */
export interface BillingProfilePropertiesShipTo extends AddressDetails {}

export function billingProfilePropertiesShipToSerializer(
  item: BillingProfilePropertiesShipTo,
): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

export function billingProfilePropertiesShipToDeserializer(
  item: any,
): BillingProfilePropertiesShipTo {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

/** The address of the individual or organization that is responsible for the billing account. */
export interface BillingProfilePropertiesSoldTo extends AddressDetails {}

export function billingProfilePropertiesSoldToSerializer(
  item: BillingProfilePropertiesSoldTo,
): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

export function billingProfilePropertiesSoldToDeserializer(
  item: any,
): BillingProfilePropertiesSoldTo {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

export function spendingLimitDetailsArrayDeserializer(result: Array<SpendingLimitDetails>): any[] {
  return result.map((item) => {
    return spendingLimitDetailsDeserializer(item);
  });
}

/** The billing profile spending limit. */
export interface SpendingLimitDetails {
  /** The initial amount for the billing profile. */
  amount?: number;
  /** The currency in which the charges for the billing profile are billed. */
  currency?: string;
  /** The date when this spending limit goes into effect. */
  startDate?: Date;
  /** The date when this spending limit is no longer in effect. */
  endDate?: Date;
  /** The type of spending limit. */
  type?: SpendingLimitType;
  /** The status of current spending limit. */
  status?: SpendingLimitStatus;
}

export function spendingLimitDetailsDeserializer(item: any): SpendingLimitDetails {
  return {
    amount: item["amount"],
    currency: item["currency"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    type: item["type"],
    status: item["status"],
  };
}

/** The type of spending limit. */
export enum KnownSpendingLimitType {
  /** Other */
  Other = "Other",
  /** None */
  None = "None",
  /** FreeAccount */
  FreeAccount = "FreeAccount",
  /** Sandbox */
  Sandbox = "Sandbox",
  /** AzureForStudents */
  AzureForStudents = "AzureForStudents",
  /** AcademicSponsorship */
  AcademicSponsorship = "AcademicSponsorship",
  /** AzureConsumptionCredit */
  AzureConsumptionCredit = "AzureConsumptionCredit",
  /** AzurePassSponsorship */
  AzurePassSponsorship = "AzurePassSponsorship",
  /** MpnSponsorship */
  MpnSponsorship = "MpnSponsorship",
  /** MSDN */
  Msdn = "MSDN",
  /** NonProfitSponsorship */
  NonProfitSponsorship = "NonProfitSponsorship",
  /** Sponsorship */
  Sponsorship = "Sponsorship",
  /** StartupSponsorship */
  StartupSponsorship = "StartupSponsorship",
  /** AzureForStudentsStarter */
  AzureForStudentsStarter = "AzureForStudentsStarter",
  /** VisualStudio */
  VisualStudio = "VisualStudio",
}

/**
 * The type of spending limit. \
 * {@link KnownSpendingLimitType} can be used interchangeably with SpendingLimitType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **None**: None \
 * **FreeAccount**: FreeAccount \
 * **Sandbox**: Sandbox \
 * **AzureForStudents**: AzureForStudents \
 * **AcademicSponsorship**: AcademicSponsorship \
 * **AzureConsumptionCredit**: AzureConsumptionCredit \
 * **AzurePassSponsorship**: AzurePassSponsorship \
 * **MpnSponsorship**: MpnSponsorship \
 * **MSDN**: MSDN \
 * **NonProfitSponsorship**: NonProfitSponsorship \
 * **Sponsorship**: Sponsorship \
 * **StartupSponsorship**: StartupSponsorship \
 * **AzureForStudentsStarter**: AzureForStudentsStarter \
 * **VisualStudio**: VisualStudio
 */
export type SpendingLimitType = string;

/** The status of current spending limit. */
export enum KnownSpendingLimitStatus {
  /** Other */
  Other = "Other",
  /** None */
  None = "None",
  /** Active */
  Active = "Active",
  /** Expired */
  Expired = "Expired",
  /** LimitReached */
  LimitReached = "LimitReached",
  /** LimitRemoved */
  LimitRemoved = "LimitRemoved",
}

/**
 * The status of current spending limit. \
 * {@link KnownSpendingLimitStatus} can be used interchangeably with SpendingLimitStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **None**: None \
 * **Active**: Active \
 * **Expired**: Expired \
 * **LimitReached**: LimitReached \
 * **LimitRemoved**: LimitRemoved
 */
export type SpendingLimitStatus = string;

/** The current payment term of the billing profile. */
export interface BillingProfilePropertiesCurrentPaymentTerm extends PaymentTerm {}

export function billingProfilePropertiesCurrentPaymentTermSerializer(
  item: BillingProfilePropertiesCurrentPaymentTerm,
): any {
  return {
    term: item["term"],
    startDate: !item["startDate"] ? item["startDate"] : item["startDate"].toISOString(),
    endDate: !item["endDate"] ? item["endDate"] : item["endDate"].toISOString(),
  };
}

export function billingProfilePropertiesCurrentPaymentTermDeserializer(
  item: any,
): BillingProfilePropertiesCurrentPaymentTerm {
  return {
    term: item["term"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
    isDefault: item["isDefault"],
  };
}

export function paymentTermArraySerializer(result: Array<PaymentTerm>): any[] {
  return result.map((item) => {
    return paymentTermSerializer(item);
  });
}

export function paymentTermArrayDeserializer(result: Array<PaymentTerm>): any[] {
  return result.map((item) => {
    return paymentTermDeserializer(item);
  });
}

/** Paged collection of BillingProfile items */
export interface _BillingProfileListResult {
  /** The BillingProfile items on this page */
  readonly value: BillingProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingProfileListResultDeserializer(item: any): _BillingProfileListResult {
  return {
    value: billingProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingProfileArraySerializer(result: Array<BillingProfile>): any[] {
  return result.map((item) => {
    return billingProfileSerializer(item);
  });
}

export function billingProfileArrayDeserializer(result: Array<BillingProfile>): any[] {
  return result.map((item) => {
    return billingProfileDeserializer(item);
  });
}

/** Eligibility to delete a billing profile result. */
export interface DeleteBillingProfileEligibilityResult {
  /** Status describing if billing profile is eligible to be deleted. */
  eligibilityStatus?: DeleteBillingProfileEligibilityStatus;
  /** Validation details of delete billing profile eligibility. */
  eligibilityDetails?: DeleteBillingProfileEligibilityDetail[];
}

export function deleteBillingProfileEligibilityResultDeserializer(
  item: any,
): DeleteBillingProfileEligibilityResult {
  return {
    eligibilityStatus: item["eligibilityStatus"],
    eligibilityDetails: !item["eligibilityDetails"]
      ? item["eligibilityDetails"]
      : deleteBillingProfileEligibilityDetailArrayDeserializer(item["eligibilityDetails"]),
  };
}

/** Status describing if billing profile is eligible to be deleted. */
export enum KnownDeleteBillingProfileEligibilityStatus {
  /** Allowed */
  Allowed = "Allowed",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * Status describing if billing profile is eligible to be deleted. \
 * {@link KnownDeleteBillingProfileEligibilityStatus} can be used interchangeably with DeleteBillingProfileEligibilityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allowed**: Allowed \
 * **NotAllowed**: NotAllowed
 */
export type DeleteBillingProfileEligibilityStatus = string;

export function deleteBillingProfileEligibilityDetailArrayDeserializer(
  result: Array<DeleteBillingProfileEligibilityDetail>,
): any[] {
  return result.map((item) => {
    return deleteBillingProfileEligibilityDetailDeserializer(item);
  });
}

/** Validation details of delete billing profile eligibility. */
export interface DeleteBillingProfileEligibilityDetail {
  /** Code of the delete invoice section eligibility response. */
  code?: DeleteBillingProfileEligibilityCode;
  /** Validation message. */
  message?: string;
}

export function deleteBillingProfileEligibilityDetailDeserializer(
  item: any,
): DeleteBillingProfileEligibilityDetail {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Code of the delete invoice section eligibility response. */
export enum KnownDeleteBillingProfileEligibilityCode {
  /** None */
  None = "None",
  /** ActiveCredits */
  ActiveCredits = "ActiveCredits",
  /** ActiveCreditCard */
  ActiveCreditCard = "ActiveCreditCard",
  /** LastBillingProfile */
  LastBillingProfile = "LastBillingProfile",
  /** NotSupported */
  NotSupported = "NotSupported",
  /** OutstandingCharges */
  OutstandingCharges = "OutstandingCharges",
  /** PendingCharges */
  PendingCharges = "PendingCharges",
  /** ReservedInstances */
  ReservedInstances = "ReservedInstances",
  /** ActiveBillingSubscriptions */
  ActiveBillingSubscriptions = "ActiveBillingSubscriptions",
}

/**
 * Code of the delete invoice section eligibility response. \
 * {@link KnownDeleteBillingProfileEligibilityCode} can be used interchangeably with DeleteBillingProfileEligibilityCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **ActiveCredits**: ActiveCredits \
 * **ActiveCreditCard**: ActiveCreditCard \
 * **LastBillingProfile**: LastBillingProfile \
 * **NotSupported**: NotSupported \
 * **OutstandingCharges**: OutstandingCharges \
 * **PendingCharges**: PendingCharges \
 * **ReservedInstances**: ReservedInstances \
 * **ActiveBillingSubscriptions**: ActiveBillingSubscriptions
 */
export type DeleteBillingProfileEligibilityCode = string;

/** The billing properties of a subscription. */
export interface BillingSubscription extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** Indicates whether auto renewal is turned on or off for a product. */
  autoRenew?: AutoRenew;
  /** The provisioning tenant of the subscription. */
  beneficiaryTenantId?: string;
  /** The beneficiary of the billing subscription. */
  beneficiary?: Beneficiary;
  /** The billing frequency in ISO8601 format of product in the subscription. Example: P1M, P3M, P1Y */
  billingFrequency?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  billingProfileId?: string;
  /** Dictionary of billing policies associated with the subscription. */
  readonly billingPolicies?: Record<string, string>;
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The ID that uniquely identifies a billing profile. */
  readonly billingProfileName?: string;
  /** The cost center applied to the subscription. This field is only available for consumption subscriptions of Microsoft Customer Agreement or Enterprise Agreement Type billing accounts. */
  consumptionCostCenter?: string;
  /** The fully qualified ID that uniquely identifies a customer. */
  customerId?: string;
  /** The name of the customer. */
  readonly customerDisplayName?: string;
  /** The ID that uniquely identifies a customer. */
  readonly customerName?: string;
  /** The name of the billing subscription. */
  displayName?: string;
  /** The enrollment Account ID associated with the subscription. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountId?: string;
  /** The enrollment Account name associated with the subscription. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountDisplayName?: string;
  /** Enrollment Account Subscription details. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountSubscriptionDetails?: EnrollmentAccountSubscriptionDetails;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  invoiceSectionId?: string;
  /** The name of the invoice section. */
  readonly invoiceSectionDisplayName?: string;
  /** The ID that uniquely identifies an invoice section. */
  readonly invoiceSectionName?: string;
  /** The last month's charges. This field is only available for usage based subscriptions of Microsoft Customer Agreement billing accounts. */
  readonly lastMonthCharges?: Amount;
  /** The current month to date charges. This field is only available for usage based subscriptions of Microsoft Customer Agreement billing accounts. */
  readonly monthToDateCharges?: Amount;
  /** Next billing cycle details of the subscription. */
  readonly nextBillingCycleDetails?: NextBillingCycleDetails;
  /** The offer ID for the subscription. This field is only available for the Microsoft Online Services Program billing accounts or billing accounts with agreement type Enterprise Agreement. */
  readonly offerId?: string;
  /** The category of the product for which the subscription is purchased. Possible values include: AzureSupport, Hardware, ReservationOrder, SaaS, SavingsPlanOrder, Software, UsageBased, Other. */
  readonly productCategory?: string;
  /** Type of the product for which the subscription is purchased. */
  readonly productType?: string;
  /** Id of the product for which the subscription is purchased. */
  productTypeId?: string;
  /** Purchase date of the product in UTC time. */
  readonly purchaseDate?: Date;
  /** The quantity of licenses or fulfillment units for the subscription. */
  quantity?: number;
  /** Reseller for this subscription. The fields is not available for Microsoft Partner Agreement billing accounts. */
  readonly reseller?: Reseller;
  /** Details for the next renewal term of a subscription. */
  readonly renewalTermDetails?: RenewalTermDetails;
  /** The SKU ID of the product for which the subscription is purchased. This field is is only available  for Microsoft Customer Agreement billing accounts. */
  skuId?: string;
  /** The SKU description of the product for which the subscription is purchased. This field is is only available for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. */
  readonly skuDescription?: string;
  /** System imposed policies that regulate behavior of the subscription. */
  systemOverrides?: SystemOverrides;
  /** Unique identifier of the linked resource. */
  readonly resourceUri?: string;
  /** The duration in ISO8601 format for which you can use the subscription. Example: P1M, P3M, P1Y */
  termDuration?: string;
  /** Start date of the term in UTC time. */
  readonly termStartDate?: Date;
  /** End date of the term in UTC time. */
  readonly termEndDate?: Date;
  /** The tenant in which the subscription is provisioned. */
  provisioningTenantId?: string;
  /** The status of the subscription. This field is not available for Enterprise Agreement billing accounts */
  readonly status?: BillingSubscriptionStatus;
  /** The status of an operation on the subscription. When None, there is no ongoing operation. When LockedForUpdate, write operations will be blocked on the Billing Subscription. Other is the default value and you may need to refer to the latest API version for more details. */
  readonly operationStatus?: BillingSubscriptionOperationStatus;
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The ID of the subscription. */
  readonly subscriptionId?: string;
  /** The suspension reason for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly suspensionReasons?: string[];
  /** The suspension details for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly suspensionReasonDetails?: BillingSubscriptionStatusDetails[];
}

export function billingSubscriptionDeserializer(item: any): BillingSubscription {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _billingSubscriptionPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The billing properties of a subscription. */
export interface BillingSubscriptionProperties {
  /** Indicates whether auto renewal is turned on or off for a product. */
  autoRenew?: AutoRenew;
  /** The provisioning tenant of the subscription. */
  beneficiaryTenantId?: string;
  /** The beneficiary of the billing subscription. */
  beneficiary?: Beneficiary;
  /** The billing frequency in ISO8601 format of product in the subscription. Example: P1M, P3M, P1Y */
  billingFrequency?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  billingProfileId?: string;
  /** Dictionary of billing policies associated with the subscription. */
  readonly billingPolicies?: Record<string, string>;
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The ID that uniquely identifies a billing profile. */
  readonly billingProfileName?: string;
  /** The cost center applied to the subscription. This field is only available for consumption subscriptions of Microsoft Customer Agreement or Enterprise Agreement Type billing accounts. */
  consumptionCostCenter?: string;
  /** The fully qualified ID that uniquely identifies a customer. */
  customerId?: string;
  /** The name of the customer. */
  readonly customerDisplayName?: string;
  /** The ID that uniquely identifies a customer. */
  readonly customerName?: string;
  /** The name of the billing subscription. */
  displayName?: string;
  /** The enrollment Account ID associated with the subscription. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountId?: string;
  /** The enrollment Account name associated with the subscription. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountDisplayName?: string;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  invoiceSectionId?: string;
  /** The name of the invoice section. */
  readonly invoiceSectionDisplayName?: string;
  /** The ID that uniquely identifies an invoice section. */
  readonly invoiceSectionName?: string;
  /** The last month's charges. This field is only available for usage based subscriptions of Microsoft Customer Agreement billing accounts. */
  readonly lastMonthCharges?: Amount;
  /** The current month to date charges. This field is only available for usage based subscriptions of Microsoft Customer Agreement billing accounts. */
  readonly monthToDateCharges?: Amount;
  /** Next billing cycle details of the subscription. */
  readonly nextBillingCycleDetails?: NextBillingCycleDetails;
  /** The offer ID for the subscription. This field is only available for the Microsoft Online Services Program billing accounts or billing accounts with agreement type Enterprise Agreement. */
  readonly offerId?: string;
  /** The category of the product for which the subscription is purchased. Possible values include: AzureSupport, Hardware, ReservationOrder, SaaS, SavingsPlanOrder, Software, UsageBased, Other. */
  readonly productCategory?: string;
  /** Type of the product for which the subscription is purchased. */
  readonly productType?: string;
  /** Id of the product for which the subscription is purchased. */
  productTypeId?: string;
  /** Purchase date of the product in UTC time. */
  readonly purchaseDate?: Date;
  /** The quantity of licenses or fulfillment units for the subscription. */
  quantity?: number;
  /** Reseller for this subscription. The fields is not available for Microsoft Partner Agreement billing accounts. */
  readonly reseller?: Reseller;
  /** Details for the next renewal term of a subscription. */
  readonly renewalTermDetails?: RenewalTermDetails;
  /** The SKU ID of the product for which the subscription is purchased. This field is is only available  for Microsoft Customer Agreement billing accounts. */
  skuId?: string;
  /** The SKU description of the product for which the subscription is purchased. This field is is only available for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. */
  readonly skuDescription?: string;
  /** System imposed policies that regulate behavior of the subscription. */
  systemOverrides?: SystemOverrides;
  /** Unique identifier of the linked resource. */
  readonly resourceUri?: string;
  /** The duration in ISO8601 format for which you can use the subscription. Example: P1M, P3M, P1Y */
  termDuration?: string;
  /** Start date of the term in UTC time. */
  readonly termStartDate?: Date;
  /** End date of the term in UTC time. */
  readonly termEndDate?: Date;
  /** The tenant in which the subscription is provisioned. */
  provisioningTenantId?: string;
  /** The status of the subscription. This field is not available for Enterprise Agreement billing accounts */
  readonly status?: BillingSubscriptionStatus;
  /** The status of an operation on the subscription. When None, there is no ongoing operation. When LockedForUpdate, write operations will be blocked on the Billing Subscription. Other is the default value and you may need to refer to the latest API version for more details. */
  readonly operationStatus?: BillingSubscriptionOperationStatus;
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The ID of the subscription. */
  readonly subscriptionId?: string;
  /** The suspension reason for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly suspensionReasons?: string[];
  /** The suspension details for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly suspensionReasonDetails?: BillingSubscriptionStatusDetails[];
  /** The enrollment Account and the subscription association start date. This field is available only for the Enterprise Agreement Type. */
  readonly enrollmentAccountStartDate?: Date;
  /** The current enrollment account status of the subscription. This field is available only for the Enterprise Agreement Type. */
  readonly subscriptionEnrollmentAccountStatus?: SubscriptionEnrollmentAccountStatus;
}

export function billingSubscriptionPropertiesSerializer(item: BillingSubscriptionProperties): any {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiarySerializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    displayName: item["displayName"],
    invoiceSectionId: item["invoiceSectionId"],
    productTypeId: item["productTypeId"],
    quantity: item["quantity"],
    skuId: item["skuId"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesSerializer(item["systemOverrides"]),
    termDuration: item["termDuration"],
    provisioningTenantId: item["provisioningTenantId"],
  };
}

export function billingSubscriptionPropertiesDeserializer(
  item: any,
): BillingSubscriptionProperties {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiaryDeserializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    billingPolicies: !item["billingPolicies"]
      ? item["billingPolicies"]
      : Object.fromEntries(
          Object.entries(item["billingPolicies"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileName: item["billingProfileName"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    customerDisplayName: item["customerDisplayName"],
    customerName: item["customerName"],
    displayName: item["displayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    ...(!item["enrollmentAccountSubscriptionDetails"]
      ? item["enrollmentAccountSubscriptionDetails"]
      : _billingSubscriptionPropertiesEnrollmentAccountSubscriptionDetailsDeserializer(
          item["enrollmentAccountSubscriptionDetails"],
        )),
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    invoiceSectionName: item["invoiceSectionName"],
    lastMonthCharges: !item["lastMonthCharges"]
      ? item["lastMonthCharges"]
      : amountDeserializer(item["lastMonthCharges"]),
    monthToDateCharges: !item["monthToDateCharges"]
      ? item["monthToDateCharges"]
      : amountDeserializer(item["monthToDateCharges"]),
    nextBillingCycleDetails: !item["nextBillingCycleDetails"]
      ? item["nextBillingCycleDetails"]
      : nextBillingCycleDetailsDeserializer(item["nextBillingCycleDetails"]),
    offerId: item["offerId"],
    productCategory: item["productCategory"],
    productType: item["productType"],
    productTypeId: item["productTypeId"],
    purchaseDate: !item["purchaseDate"] ? item["purchaseDate"] : new Date(item["purchaseDate"]),
    quantity: item["quantity"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    renewalTermDetails: !item["renewalTermDetails"]
      ? item["renewalTermDetails"]
      : renewalTermDetailsDeserializer(item["renewalTermDetails"]),
    skuId: item["skuId"],
    skuDescription: item["skuDescription"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesDeserializer(item["systemOverrides"]),
    resourceUri: item["resourceUri"],
    termDuration: item["termDuration"],
    termStartDate: !item["termStartDate"] ? item["termStartDate"] : new Date(item["termStartDate"]),
    termEndDate: !item["termEndDate"] ? item["termEndDate"] : new Date(item["termEndDate"]),
    provisioningTenantId: item["provisioningTenantId"],
    status: item["status"],
    operationStatus: item["operationStatus"],
    provisioningState: item["provisioningState"],
    subscriptionId: item["subscriptionId"],
    suspensionReasons: !item["suspensionReasons"]
      ? item["suspensionReasons"]
      : item["suspensionReasons"].map((p: any) => {
          return p;
        }),
    suspensionReasonDetails: !item["suspensionReasonDetails"]
      ? item["suspensionReasonDetails"]
      : billingSubscriptionStatusDetailsArrayDeserializer(item["suspensionReasonDetails"]),
  };
}

/** Details of the beneficiary. */
export interface Beneficiary {
  /** The ID that uniquely identifies a tenant. */
  tenantId?: string;
  /** The ID that uniquely identifies a user in a tenant. */
  objectId?: string;
}

export function beneficiarySerializer(item: Beneficiary): any {
  return { tenantId: item["tenantId"], objectId: item["objectId"] };
}

export function beneficiaryDeserializer(item: any): Beneficiary {
  return {
    tenantId: item["tenantId"],
    objectId: item["objectId"],
  };
}

/** The billing properties that can be modified. Available only for the Enterprise Agreement Type. */
export interface EnrollmentAccountSubscriptionDetails {
  /** The enrollment Account and the subscription association start date. This field is available only for the Enterprise Agreement Type. */
  readonly enrollmentAccountStartDate?: Date;
  /** The current enrollment account status of the subscription. This field is available only for the Enterprise Agreement Type. */
  readonly subscriptionEnrollmentAccountStatus?: SubscriptionEnrollmentAccountStatus;
}

export function enrollmentAccountSubscriptionDetailsDeserializer(
  item: any,
): EnrollmentAccountSubscriptionDetails {
  return {
    enrollmentAccountStartDate: !item["enrollmentAccountStartDate"]
      ? item["enrollmentAccountStartDate"]
      : new Date(item["enrollmentAccountStartDate"]),
    subscriptionEnrollmentAccountStatus: item["subscriptionEnrollmentAccountStatus"],
  };
}

/** The current enrollment account status of the subscription. This field is available only for the Enterprise Agreement Type. */
export enum KnownSubscriptionEnrollmentAccountStatus {
  /** Active */
  Active = "Active",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Expired */
  Expired = "Expired",
  /** Deleted */
  Deleted = "Deleted",
  /** TransferredOut */
  TransferredOut = "TransferredOut",
  /** Transferring */
  Transferring = "Transferring",
  /** Inactive */
  Inactive = "Inactive",
}

/**
 * The current enrollment account status of the subscription. This field is available only for the Enterprise Agreement Type. \
 * {@link KnownSubscriptionEnrollmentAccountStatus} can be used interchangeably with SubscriptionEnrollmentAccountStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Cancelled**: Cancelled \
 * **Expired**: Expired \
 * **Deleted**: Deleted \
 * **TransferredOut**: TransferredOut \
 * **Transferring**: Transferring \
 * **Inactive**: Inactive
 */
export type SubscriptionEnrollmentAccountStatus = string;

/** Billing cycle details of the product. */
export interface NextBillingCycleDetails {
  /** Billing frequency of the product under the subscription. */
  readonly billingFrequency?: string;
}

export function nextBillingCycleDetailsDeserializer(item: any): NextBillingCycleDetails {
  return {
    billingFrequency: item["billingFrequency"],
  };
}

/** Details for the next renewal term of a subscription. */
export interface RenewalTermDetails {
  /** The billing frequency in ISO8601 format of product in the subscription. Example: P1M, P3M, P1Y */
  readonly billingFrequency?: string;
  /** Id of the product for which the subscription is purchased. */
  readonly productId?: string;
  /** Type Id of the product for which the subscription is purchased. */
  readonly productTypeId?: string;
  /** The SKU ID of the product for which the subscription is purchased. This field is is only available  for Microsoft Customer Agreement billing accounts. */
  readonly skuId?: string;
  /** The duration in ISO8601 format for which you can use the subscription. Example: P1M, P3M, P1Y */
  readonly termDuration?: string;
  /** The quantity of licenses or fulfillment units for the subscription. */
  quantity?: number;
  /** End date of the term in UTC time. */
  readonly termEndDate?: Date;
}

export function renewalTermDetailsDeserializer(item: any): RenewalTermDetails {
  return {
    billingFrequency: item["billingFrequency"],
    productId: item["productId"],
    productTypeId: item["productTypeId"],
    skuId: item["skuId"],
    termDuration: item["termDuration"],
    quantity: item["quantity"],
    termEndDate: !item["termEndDate"] ? item["termEndDate"] : new Date(item["termEndDate"]),
  };
}

/** System imposed policies that regulate behavior of the subscription. */
export interface SystemOverrides {
  /** The policy override for the subscription indicates whether the self-serve cancellation or seat reduction is allowed. */
  readonly cancellation?: Cancellation;
  /** The end date in UTC time by when the self-serve cancellation ends. */
  readonly cancellationAllowedEndDate?: Date;
}

export function systemOverridesSerializer(item: SystemOverrides): any {
  return item;
}

export function systemOverridesDeserializer(item: any): SystemOverrides {
  return {
    cancellation: item["cancellation"],
    cancellationAllowedEndDate: !item["cancellationAllowedEndDate"]
      ? item["cancellationAllowedEndDate"]
      : new Date(item["cancellationAllowedEndDate"]),
  };
}

/** The policy override for the subscription indicates whether the self-serve cancellation or seat reduction is allowed. */
export enum KnownCancellation {
  /** NotAllowed */
  NotAllowed = "NotAllowed",
  /** Allowed */
  Allowed = "Allowed",
}

/**
 * The policy override for the subscription indicates whether the self-serve cancellation or seat reduction is allowed. \
 * {@link KnownCancellation} can be used interchangeably with Cancellation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotAllowed**: NotAllowed \
 * **Allowed**: Allowed
 */
export type Cancellation = string;

/** The subscription status. */
export enum KnownBillingSubscriptionStatus {
  /** Other */
  Other = "Other",
  /** Unknown */
  Unknown = "Unknown",
  /** Active */
  Active = "Active",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
  /** Warned */
  Warned = "Warned",
  /** Expiring */
  Expiring = "Expiring",
  /** Expired */
  Expired = "Expired",
  /** AutoRenew */
  AutoRenew = "AutoRenew",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Suspended */
  Suspended = "Suspended",
  /** Failed */
  Failed = "Failed",
}

/**
 * The subscription status. \
 * {@link KnownBillingSubscriptionStatus} can be used interchangeably with BillingSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Unknown**: Unknown \
 * **Active**: Active \
 * **Disabled**: Disabled \
 * **Deleted**: Deleted \
 * **Warned**: Warned \
 * **Expiring**: Expiring \
 * **Expired**: Expired \
 * **AutoRenew**: AutoRenew \
 * **Cancelled**: Cancelled \
 * **Suspended**: Suspended \
 * **Failed**: Failed
 */
export type BillingSubscriptionStatus = string;

/** The status of an operation on the subscription. When None, there is no ongoing operation. When LockedForUpdate, write operations will be blocked on the Billing Subscription. Other is the default value and you may need to refer to the latest API version for more details. */
export enum KnownBillingSubscriptionOperationStatus {
  /** Other */
  Other = "Other",
  /** None */
  None = "None",
  /** LockedForUpdate */
  LockedForUpdate = "LockedForUpdate",
}

/**
 * The status of an operation on the subscription. When None, there is no ongoing operation. When LockedForUpdate, write operations will be blocked on the Billing Subscription. Other is the default value and you may need to refer to the latest API version for more details. \
 * {@link KnownBillingSubscriptionOperationStatus} can be used interchangeably with BillingSubscriptionOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **None**: None \
 * **LockedForUpdate**: LockedForUpdate
 */
export type BillingSubscriptionOperationStatus = string;

export function billingSubscriptionStatusDetailsArrayDeserializer(
  result: Array<BillingSubscriptionStatusDetails>,
): any[] {
  return result.map((item) => {
    return billingSubscriptionStatusDetailsDeserializer(item);
  });
}

/** The suspension details for a subscription. This field is not available for Enterprise Agreement billing accounts. */
export interface BillingSubscriptionStatusDetails {
  /** The suspension effective date for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly effectiveDate?: Date;
  /** The suspension reason for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly reason?: SubscriptionStatusReason;
}

export function billingSubscriptionStatusDetailsDeserializer(
  item: any,
): BillingSubscriptionStatusDetails {
  return {
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    reason: item["reason"],
  };
}

/** The suspension reason for a subscription. This field is not available for Enterprise Agreement billing accounts. */
export enum KnownSubscriptionStatusReason {
  /** None */
  None = "None",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** PastDue */
  PastDue = "PastDue",
  /** SuspiciousActivity */
  SuspiciousActivity = "SuspiciousActivity",
  /** Other */
  Other = "Other",
  /** Transferred */
  Transferred = "Transferred",
  /** PolicyViolation */
  PolicyViolation = "PolicyViolation",
  /** SpendingLimitReached */
  SpendingLimitReached = "SpendingLimitReached",
  /** Expired */
  Expired = "Expired",
}

/**
 * The suspension reason for a subscription. This field is not available for Enterprise Agreement billing accounts. \
 * {@link KnownSubscriptionStatusReason} can be used interchangeably with SubscriptionStatusReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Cancelled**: Cancelled \
 * **PastDue**: PastDue \
 * **SuspiciousActivity**: SuspiciousActivity \
 * **Other**: Other \
 * **Transferred**: Transferred \
 * **PolicyViolation**: PolicyViolation \
 * **SpendingLimitReached**: SpendingLimitReached \
 * **Expired**: Expired
 */
export type SubscriptionStatusReason = string;

/** A container for a list of resources */
export interface _BillingSubscriptionListResult {
  /** The link (url) to the next page of results. */
  readonly nextLink?: string;
  /** Total number of records. */
  readonly totalCount?: number;
  /** The list of resources. */
  readonly value?: BillingSubscription[];
}

export function _billingSubscriptionListResultDeserializer(
  item: any,
): _BillingSubscriptionListResult {
  return {
    nextLink: item["nextLink"],
    totalCount: item["totalCount"],
    value: !item["value"] ? item["value"] : billingSubscriptionArrayDeserializer(item["value"]),
  };
}

export function billingSubscriptionArrayDeserializer(result: Array<BillingSubscription>): any[] {
  return result.map((item) => {
    return billingSubscriptionDeserializer(item);
  });
}

/** The billing properties of a subscription. */
export interface BillingSubscriptionPatch extends ProxyResourceWithTags {
  /** Indicates whether auto renewal is turned on or off for a product. */
  autoRenew?: AutoRenew;
  /** The provisioning tenant of the subscription. */
  beneficiaryTenantId?: string;
  /** The beneficiary of the billing subscription. */
  beneficiary?: Beneficiary;
  /** The billing frequency in ISO8601 format of product in the subscription. Example: P1M, P3M, P1Y */
  billingFrequency?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  billingProfileId?: string;
  /** Dictionary of billing policies associated with the subscription. */
  readonly billingPolicies?: Record<string, string>;
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The ID that uniquely identifies a billing profile. */
  readonly billingProfileName?: string;
  /** The cost center applied to the subscription. This field is only available for consumption subscriptions of Microsoft Customer Agreement or Enterprise Agreement Type billing accounts. */
  consumptionCostCenter?: string;
  /** The fully qualified ID that uniquely identifies a customer. */
  customerId?: string;
  /** The name of the customer. */
  readonly customerDisplayName?: string;
  /** The ID that uniquely identifies a customer. */
  readonly customerName?: string;
  /** The name of the billing subscription. */
  displayName?: string;
  /** The enrollment Account ID associated with the subscription. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountId?: string;
  /** The enrollment Account name associated with the subscription. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountDisplayName?: string;
  /** Enrollment Account Subscription details. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountSubscriptionDetails?: EnrollmentAccountSubscriptionDetails;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  invoiceSectionId?: string;
  /** The name of the invoice section. */
  readonly invoiceSectionDisplayName?: string;
  /** The ID that uniquely identifies an invoice section. */
  readonly invoiceSectionName?: string;
  /** The last month's charges. This field is only available for usage based subscriptions of Microsoft Customer Agreement billing accounts. */
  readonly lastMonthCharges?: Amount;
  /** The current month to date charges. This field is only available for usage based subscriptions of Microsoft Customer Agreement billing accounts. */
  readonly monthToDateCharges?: Amount;
  /** Next billing cycle details of the subscription. */
  readonly nextBillingCycleDetails?: NextBillingCycleDetails;
  /** The offer ID for the subscription. This field is only available for the Microsoft Online Services Program billing accounts or billing accounts with agreement type Enterprise Agreement. */
  readonly offerId?: string;
  /** The category of the product for which the subscription is purchased. Possible values include: AzureSupport, Hardware, ReservationOrder, SaaS, SavingsPlanOrder, Software, UsageBased, Other. */
  readonly productCategory?: string;
  /** Type of the product for which the subscription is purchased. */
  readonly productType?: string;
  /** Id of the product for which the subscription is purchased. */
  productTypeId?: string;
  /** Purchase date of the product in UTC time. */
  readonly purchaseDate?: Date;
  /** The quantity of licenses or fulfillment units for the subscription. */
  quantity?: number;
  /** Reseller for this subscription. The fields is not available for Microsoft Partner Agreement billing accounts. */
  readonly reseller?: Reseller;
  /** Details for the next renewal term of a subscription. */
  readonly renewalTermDetails?: RenewalTermDetails;
  /** The SKU ID of the product for which the subscription is purchased. This field is is only available  for Microsoft Customer Agreement billing accounts. */
  skuId?: string;
  /** The SKU description of the product for which the subscription is purchased. This field is is only available for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. */
  readonly skuDescription?: string;
  /** System imposed policies that regulate behavior of the subscription. */
  systemOverrides?: SystemOverrides;
  /** Unique identifier of the linked resource. */
  readonly resourceUri?: string;
  /** The duration in ISO8601 format for which you can use the subscription. Example: P1M, P3M, P1Y */
  termDuration?: string;
  /** Start date of the term in UTC time. */
  readonly termStartDate?: Date;
  /** End date of the term in UTC time. */
  readonly termEndDate?: Date;
  /** The tenant in which the subscription is provisioned. */
  provisioningTenantId?: string;
  /** The status of the subscription. This field is not available for Enterprise Agreement billing accounts */
  readonly status?: BillingSubscriptionStatus;
  /** The status of an operation on the subscription. When None, there is no ongoing operation. When LockedForUpdate, write operations will be blocked on the Billing Subscription. Other is the default value and you may need to refer to the latest API version for more details. */
  readonly operationStatus?: BillingSubscriptionOperationStatus;
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The ID of the subscription. */
  readonly subscriptionId?: string;
  /** The suspension reason for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly suspensionReasons?: string[];
  /** The suspension details for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly suspensionReasonDetails?: BillingSubscriptionStatusDetails[];
}

export function billingSubscriptionPatchSerializer(item: BillingSubscriptionPatch): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "autoRenew",
      "beneficiaryTenantId",
      "beneficiary",
      "billingFrequency",
      "billingProfileId",
      "consumptionCostCenter",
      "customerId",
      "displayName",
      "invoiceSectionId",
      "productTypeId",
      "quantity",
      "skuId",
      "systemOverrides",
      "termDuration",
      "provisioningTenantId",
    ])
      ? undefined
      : _billingSubscriptionPatchPropertiesSerializer(item),
  };
}

/** Request parameters for cancel customer subscription. */
export interface CancelSubscriptionRequest {
  /** Cancellation reason. */
  cancellationReason: CancellationReason;
  /** The fully qualified ID that uniquely identifies a customer. */
  customerId?: string;
}

export function cancelSubscriptionRequestSerializer(item: CancelSubscriptionRequest): any {
  return { cancellationReason: item["cancellationReason"], customerId: item["customerId"] };
}

/** Cancellation reason. */
export enum KnownCancellationReason {
  /** Other */
  Other = "Other",
  /** Compromise */
  Compromise = "Compromise",
  /** Dispute */
  Dispute = "Dispute",
}

/**
 * Cancellation reason. \
 * {@link KnownCancellationReason} can be used interchangeably with CancellationReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Compromise**: Compromise \
 * **Dispute**: Dispute
 */
export type CancellationReason = string;

/** Request parameters that are provided to merge the two billing subscriptions. */
export interface BillingSubscriptionMergeRequest {
  /** The ID of the target billing subscription that will be merged with the source subscription provided in the request. */
  targetBillingSubscriptionName?: string;
  /** The quantity of the source billing subscription that will be merged with the target billing subscription. */
  quantity?: number;
}

export function billingSubscriptionMergeRequestSerializer(
  item: BillingSubscriptionMergeRequest,
): any {
  return {
    targetBillingSubscriptionName: item["targetBillingSubscriptionName"],
    quantity: item["quantity"],
  };
}

/** Request parameters to transfer billing subscription. */
export interface MoveBillingSubscriptionRequest {
  /** The destination invoice section id. */
  destinationInvoiceSectionId?: string;
  /** The destination enrollment account id. */
  destinationEnrollmentAccountId?: string;
}

export function moveBillingSubscriptionRequestSerializer(
  item: MoveBillingSubscriptionRequest,
): any {
  return {
    destinationInvoiceSectionId: item["destinationInvoiceSectionId"],
    destinationEnrollmentAccountId: item["destinationEnrollmentAccountId"],
  };
}

/** Request parameters that are provided to split the billing subscription. */
export interface BillingSubscriptionSplitRequest {
  /** The ID of the target product to which the subscription needs to be split into. This value is not same as the value returned in Get API call and can be retrieved from Catalog API to know the product id to split into. */
  targetProductTypeId?: string;
  /** The ID of the target product to which the subscription needs to be split into. This value is not same as the value returned in Get API call and can be retrieved from Catalog API to know the sku id to split into. */
  targetSkuId?: string;
  /** The quantity of the target product to which the subscription needs to be split into. */
  quantity?: number;
  /** The term duration of the target in ISO8601 format product to which the subscription needs to be split into. Example: P1M, P1Y */
  termDuration?: string;
  /** The billing frequency of the target subscription in the ISO8601 format. Example: P1M, P3M, P1Y" */
  billingFrequency?: string;
}

export function billingSubscriptionSplitRequestSerializer(
  item: BillingSubscriptionSplitRequest,
): any {
  return {
    targetProductTypeId: item["targetProductTypeId"],
    targetSkuId: item["targetSkuId"],
    quantity: item["quantity"],
    termDuration: item["termDuration"],
    billingFrequency: item["billingFrequency"],
  };
}

/** Result of the transfer eligibility validation. */
export interface MoveBillingSubscriptionEligibilityResult {
  /** Specifies whether the subscription is eligible to be transferred. */
  readonly isMoveEligible?: boolean;
  /** Error details of the transfer eligibility validation. */
  errorDetails?: MoveBillingSubscriptionErrorDetails;
}

export function moveBillingSubscriptionEligibilityResultDeserializer(
  item: any,
): MoveBillingSubscriptionEligibilityResult {
  return {
    isMoveEligible: item["isMoveEligible"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : moveBillingSubscriptionErrorDetailsDeserializer(item["errorDetails"]),
  };
}

/** Error details of the transfer eligibility validation. */
export interface MoveBillingSubscriptionErrorDetails {
  /** Error code of the transfer validation response. */
  code?: SubscriptionTransferValidationErrorCode;
  /** The error message. */
  message?: string;
  /** Detailed error message explaining the error. */
  details?: string;
}

export function moveBillingSubscriptionErrorDetailsDeserializer(
  item: any,
): MoveBillingSubscriptionErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    details: item["details"],
  };
}

/** Error code of the transfer validation response. */
export enum KnownSubscriptionTransferValidationErrorCode {
  /** Other */
  Other = "Other",
  /** BillingAccountInactive */
  BillingAccountInactive = "BillingAccountInactive",
  /** DestinationBillingProfileInactive */
  DestinationBillingProfileInactive = "DestinationBillingProfileInactive",
  /** DestinationBillingProfileNotFound */
  DestinationBillingProfileNotFound = "DestinationBillingProfileNotFound",
  /** DestinationBillingProfilePastDue */
  DestinationBillingProfilePastDue = "DestinationBillingProfilePastDue",
  /** DestinationInvoiceSectionInactive */
  DestinationInvoiceSectionInactive = "DestinationInvoiceSectionInactive",
  /** DestinationInvoiceSectionNotFound */
  DestinationInvoiceSectionNotFound = "DestinationInvoiceSectionNotFound",
  /** InsufficientPermissionOnDestination */
  InsufficientPermissionOnDestination = "InsufficientPermissionOnDestination",
  /** InsufficientPermissionOnSource */
  InsufficientPermissionOnSource = "InsufficientPermissionOnSource",
  /** InvalidDestination */
  InvalidDestination = "InvalidDestination",
  /** InvalidSource */
  InvalidSource = "InvalidSource",
  /** MarketplaceNotEnabledOnDestination */
  MarketplaceNotEnabledOnDestination = "MarketplaceNotEnabledOnDestination",
  /** ProductInactive */
  ProductInactive = "ProductInactive",
  /** ProductNotFound */
  ProductNotFound = "ProductNotFound",
  /** ProductTypeNotSupported */
  ProductTypeNotSupported = "ProductTypeNotSupported",
  /** SourceBillingProfilePastDue */
  SourceBillingProfilePastDue = "SourceBillingProfilePastDue",
  /** SourceInvoiceSectionInactive */
  SourceInvoiceSectionInactive = "SourceInvoiceSectionInactive",
  /** AccountIsLocked */
  AccountIsLocked = "AccountIsLocked",
  /** AssetHasCap */
  AssetHasCap = "AssetHasCap",
  /** AssetNotActive */
  AssetNotActive = "AssetNotActive",
  /** BillingProfilePastDue */
  BillingProfilePastDue = "BillingProfilePastDue",
  /** CrossBillingAccountNotAllowed */
  CrossBillingAccountNotAllowed = "CrossBillingAccountNotAllowed",
  /** NoActiveAzurePlan */
  NoActiveAzurePlan = "NoActiveAzurePlan",
  /** None */
  None = "None",
  /** SubscriptionNotActive */
  SubscriptionNotActive = "SubscriptionNotActive",
  /** SubscriptionHasReservations */
  SubscriptionHasReservations = "SubscriptionHasReservations",
  /** SubscriptionTypeNotSupported */
  SubscriptionTypeNotSupported = "SubscriptionTypeNotSupported",
  /** InvoiceSectionIsRestricted */
  InvoiceSectionIsRestricted = "InvoiceSectionIsRestricted",
}

/**
 * Error code of the transfer validation response. \
 * {@link KnownSubscriptionTransferValidationErrorCode} can be used interchangeably with SubscriptionTransferValidationErrorCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **BillingAccountInactive**: BillingAccountInactive \
 * **DestinationBillingProfileInactive**: DestinationBillingProfileInactive \
 * **DestinationBillingProfileNotFound**: DestinationBillingProfileNotFound \
 * **DestinationBillingProfilePastDue**: DestinationBillingProfilePastDue \
 * **DestinationInvoiceSectionInactive**: DestinationInvoiceSectionInactive \
 * **DestinationInvoiceSectionNotFound**: DestinationInvoiceSectionNotFound \
 * **InsufficientPermissionOnDestination**: InsufficientPermissionOnDestination \
 * **InsufficientPermissionOnSource**: InsufficientPermissionOnSource \
 * **InvalidDestination**: InvalidDestination \
 * **InvalidSource**: InvalidSource \
 * **MarketplaceNotEnabledOnDestination**: MarketplaceNotEnabledOnDestination \
 * **ProductInactive**: ProductInactive \
 * **ProductNotFound**: ProductNotFound \
 * **ProductTypeNotSupported**: ProductTypeNotSupported \
 * **SourceBillingProfilePastDue**: SourceBillingProfilePastDue \
 * **SourceInvoiceSectionInactive**: SourceInvoiceSectionInactive \
 * **AccountIsLocked**: AccountIsLocked \
 * **AssetHasCap**: AssetHasCap \
 * **AssetNotActive**: AssetNotActive \
 * **BillingProfilePastDue**: BillingProfilePastDue \
 * **CrossBillingAccountNotAllowed**: CrossBillingAccountNotAllowed \
 * **NoActiveAzurePlan**: NoActiveAzurePlan \
 * **None**: None \
 * **SubscriptionNotActive**: SubscriptionNotActive \
 * **SubscriptionHasReservations**: SubscriptionHasReservations \
 * **SubscriptionTypeNotSupported**: SubscriptionTypeNotSupported \
 * **InvoiceSectionIsRestricted**: InvoiceSectionIsRestricted
 */
export type SubscriptionTransferValidationErrorCode = string;

/** A policy at customer scope. */
export interface CustomerPolicy extends ProxyResource {
  /** A policy at customer scope. */
  properties?: CustomerPolicyProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function customerPolicySerializer(item: CustomerPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : customerPolicyPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function customerPolicyDeserializer(item: any): CustomerPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : customerPolicyPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A policy at customer scope. */
export interface CustomerPolicyProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The policy that controls whether the users in customer's organization can view charges at pay-as-you-go prices. */
  viewCharges: ViewChargesPolicy;
  /** List of all policies defined at the billing scope. */
  policies?: PolicySummary[];
}

export function customerPolicyPropertiesSerializer(item: CustomerPolicyProperties): any {
  return {
    viewCharges: item["viewCharges"],
    policies: !item["policies"] ? item["policies"] : policySummaryArraySerializer(item["policies"]),
  };
}

export function customerPolicyPropertiesDeserializer(item: any): CustomerPolicyProperties {
  return {
    provisioningState: item["provisioningState"],
    viewCharges: item["viewCharges"],
    policies: !item["policies"]
      ? item["policies"]
      : policySummaryArrayDeserializer(item["policies"]),
  };
}

/** The policy that controls whether the users in customer's organization can view charges at pay-as-you-go prices. */
export enum KnownViewChargesPolicy {
  /** Other */
  Other = "Other",
  /** Allowed */
  Allowed = "Allowed",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * The policy that controls whether the users in customer's organization can view charges at pay-as-you-go prices. \
 * {@link KnownViewChargesPolicy} can be used interchangeably with ViewChargesPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Allowed**: Allowed \
 * **NotAllowed**: NotAllowed
 */
export type ViewChargesPolicy = string;

export function policySummaryArraySerializer(result: Array<PolicySummary>): any[] {
  return result.map((item) => {
    return policySummarySerializer(item);
  });
}

export function policySummaryArrayDeserializer(result: Array<PolicySummary>): any[] {
  return result.map((item) => {
    return policySummaryDeserializer(item);
  });
}

/** The summary of the policy. */
export interface PolicySummary {
  /** The name of the policy. */
  name?: string;
  /** The value of the policy. */
  value?: string;
  /** The type of the policy. */
  policyType?: PolicyType;
  /** The scope at which the policy is defined. */
  scope?: string;
}

export function policySummarySerializer(item: PolicySummary): any {
  return {
    name: item["name"],
    value: item["value"],
    policyType: item["policyType"],
    scope: item["scope"],
  };
}

export function policySummaryDeserializer(item: any): PolicySummary {
  return {
    name: item["name"],
    value: item["value"],
    policyType: item["policyType"],
    scope: item["scope"],
  };
}

/** The type of the policy. */
export enum KnownPolicyType {
  /** Other */
  Other = "Other",
  /** UserControlled */
  UserControlled = "UserControlled",
  /** SystemControlled */
  SystemControlled = "SystemControlled",
}

/**
 * The type of the policy. \
 * {@link KnownPolicyType} can be used interchangeably with PolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **UserControlled**: UserControlled \
 * **SystemControlled**: SystemControlled
 */
export type PolicyType = string;

/** Known values of {@link ServiceDefinedResourceName} that the service accepts. */
export enum KnownServiceDefinedResourceName {
  /** default */
  Default = "default",
}

/** Type of ServiceDefinedResourceName */
export type ServiceDefinedResourceName = string;

/** A policy at billing profile scope. */
export interface BillingProfilePolicy extends ProxyResource {
  /** A policy at billing profile scope. */
  properties?: BillingProfilePolicyProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function billingProfilePolicySerializer(item: BillingProfilePolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : billingProfilePolicyPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function billingProfilePolicyDeserializer(item: any): BillingProfilePolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingProfilePolicyPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A policy at billing profile scope. */
export interface BillingProfilePolicyProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The policies for Enterprise Agreement enrollments. */
  enterpriseAgreementPolicies?: BillingProfilePolicyPropertiesEnterpriseAgreementPolicies;
  /** The policy that controls invoice section label management at invoice section scope. This is allowed by default. */
  invoiceSectionLabelManagement?: InvoiceSectionLabelManagementPolicy;
  /** The policy that controls whether Azure marketplace purchases are allowed. */
  marketplacePurchases?: MarketplacePurchasesPolicy;
  /** The policy that controls whether Azure reservation purchases are allowed. */
  reservationPurchases?: ReservationPurchasesPolicy;
  /** The policy that controls whether users with Azure savings plan purchase are allowed. */
  savingsPlanPurchases?: SavingsPlanPurchasesPolicy;
  /** The policy that controls whether the users in customer's organization can view charges at pay-as-you-go prices. */
  viewCharges?: ViewChargesPolicy;
  /** List of all policies defined at the billing scope. */
  policies?: PolicySummary[];
}

export function billingProfilePolicyPropertiesSerializer(
  item: BillingProfilePolicyProperties,
): any {
  return {
    enterpriseAgreementPolicies: !item["enterpriseAgreementPolicies"]
      ? item["enterpriseAgreementPolicies"]
      : billingProfilePolicyPropertiesEnterpriseAgreementPoliciesSerializer(
          item["enterpriseAgreementPolicies"],
        ),
    invoiceSectionLabelManagement: item["invoiceSectionLabelManagement"],
    marketplacePurchases: item["marketplacePurchases"],
    reservationPurchases: item["reservationPurchases"],
    savingsPlanPurchases: item["savingsPlanPurchases"],
    viewCharges: item["viewCharges"],
    policies: !item["policies"] ? item["policies"] : policySummaryArraySerializer(item["policies"]),
  };
}

export function billingProfilePolicyPropertiesDeserializer(
  item: any,
): BillingProfilePolicyProperties {
  return {
    provisioningState: item["provisioningState"],
    enterpriseAgreementPolicies: !item["enterpriseAgreementPolicies"]
      ? item["enterpriseAgreementPolicies"]
      : billingProfilePolicyPropertiesEnterpriseAgreementPoliciesDeserializer(
          item["enterpriseAgreementPolicies"],
        ),
    invoiceSectionLabelManagement: item["invoiceSectionLabelManagement"],
    marketplacePurchases: item["marketplacePurchases"],
    reservationPurchases: item["reservationPurchases"],
    savingsPlanPurchases: item["savingsPlanPurchases"],
    viewCharges: item["viewCharges"],
    policies: !item["policies"]
      ? item["policies"]
      : policySummaryArrayDeserializer(item["policies"]),
  };
}

/** The policies for Enterprise Agreement enrollments. */
export interface BillingProfilePolicyPropertiesEnterpriseAgreementPolicies extends EnterpriseAgreementPolicies {}

export function billingProfilePolicyPropertiesEnterpriseAgreementPoliciesSerializer(
  item: BillingProfilePolicyPropertiesEnterpriseAgreementPolicies,
): any {
  return {
    authenticationType: item["authenticationType"],
    accountOwnerViewCharges: item["accountOwnerViewCharges"],
    departmentAdminViewCharges: item["departmentAdminViewCharges"],
  };
}

export function billingProfilePolicyPropertiesEnterpriseAgreementPoliciesDeserializer(
  item: any,
): BillingProfilePolicyPropertiesEnterpriseAgreementPolicies {
  return {
    authenticationType: item["authenticationType"],
    accountOwnerViewCharges: item["accountOwnerViewCharges"],
    departmentAdminViewCharges: item["departmentAdminViewCharges"],
  };
}

/** The policy that controls invoice section label management at invoice section scope. This is allowed by default. */
export enum KnownInvoiceSectionLabelManagementPolicy {
  /** Other */
  Other = "Other",
  /** Allowed */
  Allowed = "Allowed",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * The policy that controls invoice section label management at invoice section scope. This is allowed by default. \
 * {@link KnownInvoiceSectionLabelManagementPolicy} can be used interchangeably with InvoiceSectionLabelManagementPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Allowed**: Allowed \
 * **NotAllowed**: NotAllowed
 */
export type InvoiceSectionLabelManagementPolicy = string;

/** The policy that controls whether Azure marketplace purchases are allowed. */
export enum KnownMarketplacePurchasesPolicy {
  /** Other */
  Other = "Other",
  /** AllAllowed */
  AllAllowed = "AllAllowed",
  /** Disabled */
  Disabled = "Disabled",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
  /** OnlyFreeAllowed */
  OnlyFreeAllowed = "OnlyFreeAllowed",
}

/**
 * The policy that controls whether Azure marketplace purchases are allowed. \
 * {@link KnownMarketplacePurchasesPolicy} can be used interchangeably with MarketplacePurchasesPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **AllAllowed**: AllAllowed \
 * **Disabled**: Disabled \
 * **NotAllowed**: NotAllowed \
 * **OnlyFreeAllowed**: OnlyFreeAllowed
 */
export type MarketplacePurchasesPolicy = string;

/** The policy that controls whether Azure reservation purchases are allowed. */
export enum KnownReservationPurchasesPolicy {
  /** Other */
  Other = "Other",
  /** Allowed */
  Allowed = "Allowed",
  /** Disabled */
  Disabled = "Disabled",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * The policy that controls whether Azure reservation purchases are allowed. \
 * {@link KnownReservationPurchasesPolicy} can be used interchangeably with ReservationPurchasesPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Allowed**: Allowed \
 * **Disabled**: Disabled \
 * **NotAllowed**: NotAllowed
 */
export type ReservationPurchasesPolicy = string;

/** The policy that controls whether users with Azure savings plan purchase are allowed. */
export enum KnownSavingsPlanPurchasesPolicy {
  /** Other */
  Other = "Other",
  /** Allowed */
  Allowed = "Allowed",
  /** Disabled */
  Disabled = "Disabled",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * The policy that controls whether users with Azure savings plan purchase are allowed. \
 * {@link KnownSavingsPlanPurchasesPolicy} can be used interchangeably with SavingsPlanPurchasesPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Allowed**: Allowed \
 * **Disabled**: Disabled \
 * **NotAllowed**: NotAllowed
 */
export type SavingsPlanPurchasesPolicy = string;

/** The policies for Enterprise Agreement enrollments. */
export interface EnterpriseAgreementPolicies {
  /** The state showing the enrollment auth level. */
  authenticationType?: EnrollmentAuthLevelState;
  /** The policy that controls whether account owner can view charges. */
  accountOwnerViewCharges?: EnrollmentAccountOwnerViewCharges;
  /** The policy that controls whether department admin can view charges. */
  departmentAdminViewCharges?: EnrollmentDepartmentAdminViewCharges;
}

export function enterpriseAgreementPoliciesSerializer(item: EnterpriseAgreementPolicies): any {
  return {
    authenticationType: item["authenticationType"],
    accountOwnerViewCharges: item["accountOwnerViewCharges"],
    departmentAdminViewCharges: item["departmentAdminViewCharges"],
  };
}

export function enterpriseAgreementPoliciesDeserializer(item: any): EnterpriseAgreementPolicies {
  return {
    authenticationType: item["authenticationType"],
    accountOwnerViewCharges: item["accountOwnerViewCharges"],
    departmentAdminViewCharges: item["departmentAdminViewCharges"],
  };
}

/** The state showing the enrollment auth level. */
export enum KnownEnrollmentAuthLevelState {
  /** Other */
  Other = "Other",
  /** MicrosoftAccountOnly */
  MicrosoftAccountOnly = "MicrosoftAccountOnly",
  /** MixedAccount */
  MixedAccount = "MixedAccount",
  /** OrganizationalAccountCrossTenant */
  OrganizationalAccountCrossTenant = "OrganizationalAccountCrossTenant",
  /** OrganizationalAccountOnly */
  OrganizationalAccountOnly = "OrganizationalAccountOnly",
}

/**
 * The state showing the enrollment auth level. \
 * {@link KnownEnrollmentAuthLevelState} can be used interchangeably with EnrollmentAuthLevelState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **MicrosoftAccountOnly**: MicrosoftAccountOnly \
 * **MixedAccount**: MixedAccount \
 * **OrganizationalAccountCrossTenant**: OrganizationalAccountCrossTenant \
 * **OrganizationalAccountOnly**: OrganizationalAccountOnly
 */
export type EnrollmentAuthLevelState = string;

/** The policy that controls whether account owner can view charges. */
export enum KnownEnrollmentAccountOwnerViewCharges {
  /** Other */
  Other = "Other",
  /** Allowed */
  Allowed = "Allowed",
  /** Disabled */
  Disabled = "Disabled",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * The policy that controls whether account owner can view charges. \
 * {@link KnownEnrollmentAccountOwnerViewCharges} can be used interchangeably with EnrollmentAccountOwnerViewCharges,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Allowed**: Allowed \
 * **Disabled**: Disabled \
 * **NotAllowed**: NotAllowed
 */
export type EnrollmentAccountOwnerViewCharges = string;

/** The policy that controls whether department admin can view charges. */
export enum KnownEnrollmentDepartmentAdminViewCharges {
  /** Other */
  Other = "Other",
  /** Allowed */
  Allowed = "Allowed",
  /** Disabled */
  Disabled = "Disabled",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * The policy that controls whether department admin can view charges. \
 * {@link KnownEnrollmentDepartmentAdminViewCharges} can be used interchangeably with EnrollmentDepartmentAdminViewCharges,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Allowed**: Allowed \
 * **Disabled**: Disabled \
 * **NotAllowed**: NotAllowed
 */
export type EnrollmentDepartmentAdminViewCharges = string;

/** A policy at billing account scope. */
export interface BillingAccountPolicy extends ProxyResource {
  /** A policy at billing account scope. */
  properties?: BillingAccountPolicyProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function billingAccountPolicySerializer(item: BillingAccountPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : billingAccountPolicyPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function billingAccountPolicyDeserializer(item: any): BillingAccountPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingAccountPolicyPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A policy at billing account scope. */
export interface BillingAccountPolicyProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The policies for Enterprise Agreement enrollments. */
  enterpriseAgreementPolicies?: BillingAccountPolicyPropertiesEnterpriseAgreementPolicies;
  /** The policy that controls whether Azure marketplace purchases are allowed. */
  marketplacePurchases?: MarketplacePurchasesPolicy;
  /** The policy that controls whether Azure reservation purchases are allowed. */
  reservationPurchases?: ReservationPurchasesPolicy;
  /** The policy that controls whether users with Azure savings plan purchase are allowed. */
  savingsPlanPurchases?: SavingsPlanPurchasesPolicy;
  /** List of all policies defined at the billing scope. */
  policies?: PolicySummary[];
}

export function billingAccountPolicyPropertiesSerializer(
  item: BillingAccountPolicyProperties,
): any {
  return {
    enterpriseAgreementPolicies: !item["enterpriseAgreementPolicies"]
      ? item["enterpriseAgreementPolicies"]
      : billingAccountPolicyPropertiesEnterpriseAgreementPoliciesSerializer(
          item["enterpriseAgreementPolicies"],
        ),
    marketplacePurchases: item["marketplacePurchases"],
    reservationPurchases: item["reservationPurchases"],
    savingsPlanPurchases: item["savingsPlanPurchases"],
    policies: !item["policies"] ? item["policies"] : policySummaryArraySerializer(item["policies"]),
  };
}

export function billingAccountPolicyPropertiesDeserializer(
  item: any,
): BillingAccountPolicyProperties {
  return {
    provisioningState: item["provisioningState"],
    enterpriseAgreementPolicies: !item["enterpriseAgreementPolicies"]
      ? item["enterpriseAgreementPolicies"]
      : billingAccountPolicyPropertiesEnterpriseAgreementPoliciesDeserializer(
          item["enterpriseAgreementPolicies"],
        ),
    marketplacePurchases: item["marketplacePurchases"],
    reservationPurchases: item["reservationPurchases"],
    savingsPlanPurchases: item["savingsPlanPurchases"],
    policies: !item["policies"]
      ? item["policies"]
      : policySummaryArrayDeserializer(item["policies"]),
  };
}

/** The policies for Enterprise Agreement enrollments. */
export interface BillingAccountPolicyPropertiesEnterpriseAgreementPolicies extends EnterpriseAgreementPolicies {}

export function billingAccountPolicyPropertiesEnterpriseAgreementPoliciesSerializer(
  item: BillingAccountPolicyPropertiesEnterpriseAgreementPolicies,
): any {
  return {
    authenticationType: item["authenticationType"],
    accountOwnerViewCharges: item["accountOwnerViewCharges"],
    departmentAdminViewCharges: item["departmentAdminViewCharges"],
  };
}

export function billingAccountPolicyPropertiesEnterpriseAgreementPoliciesDeserializer(
  item: any,
): BillingAccountPolicyPropertiesEnterpriseAgreementPolicies {
  return {
    authenticationType: item["authenticationType"],
    accountOwnerViewCharges: item["accountOwnerViewCharges"],
    departmentAdminViewCharges: item["departmentAdminViewCharges"],
  };
}

/** A policy at subscription scope. */
export interface SubscriptionPolicy extends ProxyResource {
  /** A policy at subscription scope. */
  properties?: SubscriptionPolicyProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function subscriptionPolicyDeserializer(item: any): SubscriptionPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionPolicyPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A policy at subscription scope. */
export interface SubscriptionPolicyProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** List of all policies defined at the billing scope. */
  policies?: PolicySummary[];
}

export function subscriptionPolicyPropertiesDeserializer(item: any): SubscriptionPolicyProperties {
  return {
    provisioningState: item["provisioningState"],
    policies: !item["policies"]
      ? item["policies"]
      : policySummaryArrayDeserializer(item["policies"]),
  };
}

/** A partner's customer. */
export interface Customer extends ProxyResource {
  /** A partner's customer. */
  properties?: CustomerProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function customerDeserializer(item: any): Customer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : customerPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A partner's customer. */
export interface CustomerProperties {
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  readonly billingProfileId?: string;
  /** The name of the customer. */
  readonly displayName?: string;
  /** The system generated unique identifier for a customer. */
  readonly systemId?: string;
  /** Identifies the status of an customer. This is an upcoming property that will be populated in the future. */
  readonly status?: CustomerStatus;
  /** Azure plans enabled for the customer. */
  enabledAzurePlans?: AzurePlan[];
  /** The list of resellers for which an Azure plan is enabled for the customer. */
  resellers?: Reseller[];
  /** Dictionary of metadata associated with the resource. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function customerPropertiesDeserializer(item: any): CustomerProperties {
  return {
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileId: item["billingProfileId"],
    displayName: item["displayName"],
    systemId: item["systemId"],
    status: item["status"],
    enabledAzurePlans: !item["enabledAzurePlans"]
      ? item["enabledAzurePlans"]
      : azurePlanArrayDeserializer(item["enabledAzurePlans"]),
    resellers: !item["resellers"]
      ? item["resellers"]
      : resellerArrayDeserializer(item["resellers"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Identifies the status of an customer. This is an upcoming property that will be populated in the future. */
export enum KnownCustomerStatus {
  /** Other */
  Other = "Other",
  /** Active */
  Active = "Active",
  /** Pending */
  Pending = "Pending",
  /** Disabled */
  Disabled = "Disabled",
  /** Warned */
  Warned = "Warned",
  /** Deleted */
  Deleted = "Deleted",
  /** UnderReview */
  UnderReview = "UnderReview",
}

/**
 * Identifies the status of an customer. This is an upcoming property that will be populated in the future. \
 * {@link KnownCustomerStatus} can be used interchangeably with CustomerStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Active**: Active \
 * **Pending**: Pending \
 * **Disabled**: Disabled \
 * **Warned**: Warned \
 * **Deleted**: Deleted \
 * **UnderReview**: UnderReview
 */
export type CustomerStatus = string;

export function resellerArraySerializer(result: Array<Reseller>): any[] {
  return result.map((item) => {
    return resellerSerializer(item);
  });
}

export function resellerArrayDeserializer(result: Array<Reseller>): any[] {
  return result.map((item) => {
    return resellerDeserializer(item);
  });
}

/** Paged collection of Customer items */
export interface _CustomerListResult {
  /** The Customer items on this page */
  readonly value: Customer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _customerListResultDeserializer(item: any): _CustomerListResult {
  return {
    value: customerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function customerArrayDeserializer(result: Array<Customer>): any[] {
  return result.map((item) => {
    return customerDeserializer(item);
  });
}

/** Optional grouping of enrollment accounts to segment costs into logical groupings and set budgets. */
export interface Department extends ProxyResource {
  /** Optional grouping of enrollment accounts to segment costs into logical groupings and set budgets. */
  properties?: DepartmentProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function departmentDeserializer(item: any): Department {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : departmentPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Optional grouping of enrollment accounts to segment costs into logical groupings and set budgets. */
export interface DepartmentProperties {
  /** The cost center associated with the department. */
  costCenter?: string;
  /** The name of the department. */
  displayName?: string;
  /** The ID that uniquely identifies the department. */
  readonly id?: string;
  /** The status of the department. */
  readonly status?: string;
}

export function departmentPropertiesDeserializer(item: any): DepartmentProperties {
  return {
    costCenter: item["costCenter"],
    displayName: item["displayName"],
    id: item["id"],
    status: item["status"],
  };
}

/** Paged collection of Department items */
export interface _DepartmentListResult {
  /** The Department items on this page */
  readonly value: Department[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _departmentListResultDeserializer(item: any): _DepartmentListResult {
  return {
    value: departmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function departmentArrayDeserializer(result: Array<Department>): any[] {
  return result.map((item) => {
    return departmentDeserializer(item);
  });
}

/** It is an organizational hierarchy within a billing account to administer and manage azure costs. */
export interface EnrollmentAccount extends ProxyResource {
  /** It is an organizational hierarchy within a billing account to administer and manage azure costs. */
  properties?: EnrollmentAccountProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function enrollmentAccountDeserializer(item: any): EnrollmentAccount {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : enrollmentAccountPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** It is an organizational hierarchy within a billing account to administer and manage azure costs. */
export interface EnrollmentAccountProperties {
  /** The cost center associated with the enrollment account. */
  costCenter?: string;
  /** The name of the enrollment account. */
  displayName?: string;
  /** The name of the department under which the enrollment account exists. */
  readonly departmentDisplayName?: string;
  /** The ID that uniquely identifies the department. */
  readonly departmentId?: string;
  /** Boolean flag which enables subscribers to run development and testing workloads on Azure at special Dev/Test rates. */
  isDevTestEnabled?: boolean;
  /** The owner of the enrollment account. */
  readonly accountOwner?: string;
  /** The authorization type of the enrollment account. */
  readonly authType?: string;
  /** The status of the enrollment account. */
  readonly status?: string;
  /** The date from which the enrollment account became valid and functional. */
  readonly startDate?: Date;
  /** The date of expiration of the enrollment account. */
  readonly endDate?: Date;
}

export function enrollmentAccountPropertiesDeserializer(item: any): EnrollmentAccountProperties {
  return {
    costCenter: item["costCenter"],
    displayName: item["displayName"],
    departmentDisplayName: item["departmentDisplayName"],
    departmentId: item["departmentId"],
    isDevTestEnabled: item["isDevTestEnabled"],
    accountOwner: item["accountOwner"],
    authType: item["authType"],
    status: item["status"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
  };
}

/** Paged collection of EnrollmentAccount items */
export interface _EnrollmentAccountListResult {
  /** The EnrollmentAccount items on this page */
  readonly value: EnrollmentAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _enrollmentAccountListResultDeserializer(item: any): _EnrollmentAccountListResult {
  return {
    value: enrollmentAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enrollmentAccountArrayDeserializer(result: Array<EnrollmentAccount>): any[] {
  return result.map((item) => {
    return enrollmentAccountDeserializer(item);
  });
}

/** An invoice section. */
export interface InvoiceSection extends ProxyResource {
  /** An invoice section. */
  properties?: InvoiceSectionProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function invoiceSectionSerializer(item: InvoiceSection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : invoiceSectionPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function invoiceSectionDeserializer(item: any): InvoiceSection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : invoiceSectionPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** An invoice section. */
export interface InvoiceSectionProperties {
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The name of the invoice section. */
  displayName?: string;
  /** Identifies the status of an invoice section. */
  state?: InvoiceSectionState;
  /** Reason for the specified invoice section status. */
  reasonCode?: InvoiceSectionStateReasonCode;
  /** The system generated unique identifier for an invoice section. */
  readonly systemId?: string;
  /** Identifies the cloud environments that are associated with an invoice section. This is a system managed optional field and gets updated as the invoice section gets associated with accounts in various clouds. */
  targetCloud?: string;
  /** Dictionary of metadata associated with the resource. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function invoiceSectionPropertiesSerializer(item: InvoiceSectionProperties): any {
  return {
    displayName: item["displayName"],
    state: item["state"],
    reasonCode: item["reasonCode"],
    targetCloud: item["targetCloud"],
    tags: item["tags"],
  };
}

export function invoiceSectionPropertiesDeserializer(item: any): InvoiceSectionProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    state: item["state"],
    reasonCode: item["reasonCode"],
    systemId: item["systemId"],
    targetCloud: item["targetCloud"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Identifies the status of an invoice section. */
export enum KnownInvoiceSectionState {
  /** Other */
  Other = "Other",
  /** Active */
  Active = "Active",
  /** Deleted */
  Deleted = "Deleted",
  /** Disabled */
  Disabled = "Disabled",
  /** UnderReview */
  UnderReview = "UnderReview",
  /** Warned */
  Warned = "Warned",
  /** Restricted */
  Restricted = "Restricted",
}

/**
 * Identifies the status of an invoice section. \
 * {@link KnownInvoiceSectionState} can be used interchangeably with InvoiceSectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Active**: Active \
 * **Deleted**: Deleted \
 * **Disabled**: Disabled \
 * **UnderReview**: UnderReview \
 * **Warned**: Warned \
 * **Restricted**: Restricted
 */
export type InvoiceSectionState = string;

/** Reason for the specified invoice section status. */
export enum KnownInvoiceSectionStateReasonCode {
  /** Other */
  Other = "Other",
  /** PastDue */
  PastDue = "PastDue",
  /** UnusualActivity */
  UnusualActivity = "UnusualActivity",
  /** SpendingLimitReached */
  SpendingLimitReached = "SpendingLimitReached",
  /** SpendingLimitExpired */
  SpendingLimitExpired = "SpendingLimitExpired",
}

/**
 * Reason for the specified invoice section status. \
 * {@link KnownInvoiceSectionStateReasonCode} can be used interchangeably with InvoiceSectionStateReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **PastDue**: PastDue \
 * **UnusualActivity**: UnusualActivity \
 * **SpendingLimitReached**: SpendingLimitReached \
 * **SpendingLimitExpired**: SpendingLimitExpired
 */
export type InvoiceSectionStateReasonCode = string;

/** Paged collection of InvoiceSection items */
export interface _InvoiceSectionListResult {
  /** The InvoiceSection items on this page */
  readonly value: InvoiceSection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _invoiceSectionListResultDeserializer(item: any): _InvoiceSectionListResult {
  return {
    value: invoiceSectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function invoiceSectionArraySerializer(result: Array<InvoiceSection>): any[] {
  return result.map((item) => {
    return invoiceSectionSerializer(item);
  });
}

export function invoiceSectionArrayDeserializer(result: Array<InvoiceSection>): any[] {
  return result.map((item) => {
    return invoiceSectionDeserializer(item);
  });
}

/** Eligibility to delete an invoice section result. */
export interface DeleteInvoiceSectionEligibilityResult {
  /** Status describing if invoice section is eligible to be deleted. */
  eligibilityStatus?: DeleteInvoiceSectionEligibilityStatus;
  /** A list of delete invoice section eligibility result details. */
  eligibilityDetails?: DeleteInvoiceSectionEligibilityDetail[];
}

export function deleteInvoiceSectionEligibilityResultDeserializer(
  item: any,
): DeleteInvoiceSectionEligibilityResult {
  return {
    eligibilityStatus: item["eligibilityStatus"],
    eligibilityDetails: !item["eligibilityDetails"]
      ? item["eligibilityDetails"]
      : deleteInvoiceSectionEligibilityDetailArrayDeserializer(item["eligibilityDetails"]),
  };
}

/** Status describing if invoice section is eligible to be deleted. */
export enum KnownDeleteInvoiceSectionEligibilityStatus {
  /** Allowed */
  Allowed = "Allowed",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * Status describing if invoice section is eligible to be deleted. \
 * {@link KnownDeleteInvoiceSectionEligibilityStatus} can be used interchangeably with DeleteInvoiceSectionEligibilityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allowed**: Allowed \
 * **NotAllowed**: NotAllowed
 */
export type DeleteInvoiceSectionEligibilityStatus = string;

export function deleteInvoiceSectionEligibilityDetailArrayDeserializer(
  result: Array<DeleteInvoiceSectionEligibilityDetail>,
): any[] {
  return result.map((item) => {
    return deleteInvoiceSectionEligibilityDetailDeserializer(item);
  });
}

/** The details of delete invoice section eligibility result. */
export interface DeleteInvoiceSectionEligibilityDetail {
  /** Code for the delete invoice section validation. */
  code?: DeleteInvoiceSectionEligibilityCode;
  /** Validation message. */
  message?: string;
}

export function deleteInvoiceSectionEligibilityDetailDeserializer(
  item: any,
): DeleteInvoiceSectionEligibilityDetail {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Code for the delete invoice section validation. */
export enum KnownDeleteInvoiceSectionEligibilityCode {
  /** Other */
  Other = "Other",
  /** LastInvoiceSection */
  LastInvoiceSection = "LastInvoiceSection",
  /** ActiveAzurePlans */
  ActiveAzurePlans = "ActiveAzurePlans",
  /** ReservedInstances */
  ReservedInstances = "ReservedInstances",
  /** ActiveBillingSubscriptions */
  ActiveBillingSubscriptions = "ActiveBillingSubscriptions",
}

/**
 * Code for the delete invoice section validation. \
 * {@link KnownDeleteInvoiceSectionEligibilityCode} can be used interchangeably with DeleteInvoiceSectionEligibilityCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **LastInvoiceSection**: LastInvoiceSection \
 * **ActiveAzurePlans**: ActiveAzurePlans \
 * **ReservedInstances**: ReservedInstances \
 * **ActiveBillingSubscriptions**: ActiveBillingSubscriptions
 */
export type DeleteInvoiceSectionEligibilityCode = string;

/** A payment method. */
export interface PaymentMethod extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** Id of payment method. */
  readonly idPropertiesId?: string;
  /** The account holder name for the payment method. This is only supported for payment methods with family CreditCard. */
  readonly accountHolderName?: string;
  /** The display name of the payment method. */
  readonly displayName?: string;
  /** The expiration month and year of the payment method. This is only supported for payment methods with family CreditCard. */
  readonly expiration?: string;
  /** The family of payment method. */
  family?: PaymentMethodFamily;
  /** Last four digits of payment method. */
  readonly lastFourDigits?: string;
  /** The list of logos for the payment method. */
  logos?: PaymentMethodLogo[];
  /** The type of payment method. */
  readonly paymentMethodType?: string;
  /** Status of the payment method. */
  status?: PaymentMethodStatus;
}

export function paymentMethodDeserializer(item: any): PaymentMethod {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _paymentMethodPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of a payment method. */
export interface PaymentMethodProperties {
  /** Id of payment method. */
  readonly id?: string;
  /** The account holder name for the payment method. This is only supported for payment methods with family CreditCard. */
  readonly accountHolderName?: string;
  /** The display name of the payment method. */
  readonly displayName?: string;
  /** The expiration month and year of the payment method. This is only supported for payment methods with family CreditCard. */
  readonly expiration?: string;
  /** The family of payment method. */
  family?: PaymentMethodFamily;
  /** Last four digits of payment method. */
  readonly lastFourDigits?: string;
  /** The list of logos for the payment method. */
  logos?: PaymentMethodLogo[];
  /** The type of payment method. */
  readonly paymentMethodType?: string;
  /** Status of the payment method. */
  status?: PaymentMethodStatus;
}

export function paymentMethodPropertiesDeserializer(item: any): PaymentMethodProperties {
  return {
    id: item["id"],
    accountHolderName: item["accountHolderName"],
    displayName: item["displayName"],
    expiration: item["expiration"],
    family: item["family"],
    lastFourDigits: item["lastFourDigits"],
    logos: !item["logos"] ? item["logos"] : paymentMethodLogoArrayDeserializer(item["logos"]),
    paymentMethodType: item["paymentMethodType"],
    status: item["status"],
  };
}

export function paymentMethodLogoArrayDeserializer(result: Array<PaymentMethodLogo>): any[] {
  return result.map((item) => {
    return paymentMethodLogoDeserializer(item);
  });
}

/** Logo of payment method. */
export interface PaymentMethodLogo {
  /** MIME type of the logo. */
  readonly mimeType?: string;
  /** Public URL of image of the logo. */
  readonly url?: string;
}

export function paymentMethodLogoDeserializer(item: any): PaymentMethodLogo {
  return {
    mimeType: item["mimeType"],
    url: item["url"],
  };
}

/** Status of the payment method. */
export enum KnownPaymentMethodStatus {
  /** active */
  Active = "active",
  /** inactive */
  Inactive = "inactive",
}

/**
 * Status of the payment method. \
 * {@link KnownPaymentMethodStatus} can be used interchangeably with PaymentMethodStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: active \
 * **inactive**: inactive
 */
export type PaymentMethodStatus = string;

/** The response of a PaymentMethod list operation. */
export interface _PaymentMethodsListResult {
  /** The PaymentMethod items on this page */
  readonly value: PaymentMethod[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _paymentMethodsListResultDeserializer(item: any): _PaymentMethodsListResult {
  return {
    value: paymentMethodArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function paymentMethodArrayDeserializer(result: Array<PaymentMethod>): any[] {
  return result.map((item) => {
    return paymentMethodDeserializer(item);
  });
}

/** A payment method link. */
export interface PaymentMethodLink extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** The account holder name for the payment method. This is only supported for payment methods with family CreditCard. */
  readonly accountHolderName?: string;
  /** The display name of the payment method. */
  readonly displayName?: string;
  /** The expiration month and year of the payment method. This is only supported for payment methods with family CreditCard. */
  readonly expiration?: string;
  /** The family of payment method. */
  readonly family?: PaymentMethodFamily;
  /** Last four digits of payment method. */
  readonly lastFourDigits?: string;
  /** The list of logos for the payment method. */
  readonly logos?: PaymentMethodLogo[];
  /** Projection of a payment method. Will not be returned in this or future versions. */
  paymentMethod?: PaymentMethodProperties;
  /** Id of payment method. Example: /providers/Microsoft.Billing/paymentMethods/ABCDABCDABC0 */
  paymentMethodId?: string;
  /** The type of payment method. */
  readonly paymentMethodType?: string;
  /** Status of the payment method. */
  readonly status?: PaymentMethodStatus;
}

export function paymentMethodLinkDeserializer(item: any): PaymentMethodLink {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _paymentMethodLinkPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of a payment method link. */
export interface PaymentMethodLinkProperties {
  /** The account holder name for the payment method. This is only supported for payment methods with family CreditCard. */
  readonly accountHolderName?: string;
  /** The display name of the payment method. */
  readonly displayName?: string;
  /** The expiration month and year of the payment method. This is only supported for payment methods with family CreditCard. */
  readonly expiration?: string;
  /** The family of payment method. */
  readonly family?: PaymentMethodFamily;
  /** Last four digits of payment method. */
  readonly lastFourDigits?: string;
  /** The list of logos for the payment method. */
  readonly logos?: PaymentMethodLogo[];
  /** Projection of a payment method. Will not be returned in this or future versions. */
  paymentMethod?: PaymentMethodProperties;
  /** Id of payment method. Example: /providers/Microsoft.Billing/paymentMethods/ABCDABCDABC0 */
  paymentMethodId?: string;
  /** The type of payment method. */
  readonly paymentMethodType?: string;
  /** Status of the payment method. */
  readonly status?: PaymentMethodStatus;
}

export function paymentMethodLinkPropertiesDeserializer(item: any): PaymentMethodLinkProperties {
  return {
    accountHolderName: item["accountHolderName"],
    displayName: item["displayName"],
    expiration: item["expiration"],
    family: item["family"],
    lastFourDigits: item["lastFourDigits"],
    logos: !item["logos"] ? item["logos"] : paymentMethodLogoArrayDeserializer(item["logos"]),
    paymentMethod: !item["paymentMethod"]
      ? item["paymentMethod"]
      : paymentMethodPropertiesDeserializer(item["paymentMethod"]),
    paymentMethodId: item["paymentMethodId"],
    paymentMethodType: item["paymentMethodType"],
    status: item["status"],
  };
}

/** The response of a PaymentMethodLink list operation. */
export interface _PaymentMethodLinksListResult {
  /** The PaymentMethodLink items on this page */
  readonly value: PaymentMethodLink[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _paymentMethodLinksListResultDeserializer(
  item: any,
): _PaymentMethodLinksListResult {
  return {
    value: paymentMethodLinkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function paymentMethodLinkArrayDeserializer(result: Array<PaymentMethodLink>): any[] {
  return result.map((item) => {
    return paymentMethodLinkDeserializer(item);
  });
}

/** Details of a reservation order being returned. */
export interface ReservationOrder extends ProxyResource {
  etag?: number;
  /** Tags for this reservation */
  tags?: Record<string, string>;
  /** Friendly name for user to easily identified the reservation order. */
  displayName?: string;
  /** Enrollment id of the reservation order. */
  enrollmentId?: string;
  /** Fully-qualified identifier of the customerId where the benefit is applied. Present only for Enterprise Agreement PartnerLed customers. */
  customerId?: string;
  /** Billing profile Id associated to this reservation order. */
  billingProfileId?: string;
  /** Billing account Id associated to this reservation order. */
  billingAccountId?: string;
  /** This is the DateTime when the reservation order was initially requested for purchase. */
  requestDateTime?: Date;
  /** This is the DateTime when the reservation order was created. */
  createdDateTime?: Date;
  /** This is the date when the reservation order will expire. */
  expiryDate?: Date;
  /** This is the date-time when the reservation order will expire. */
  expiryDateTime?: Date;
  /** This is the DateTime when the reservation benefit started. */
  benefitStartTime?: Date;
  /** Total original quantity of the skus purchased in the reservation order. */
  originalQuantity?: number;
  /** The term of the reservation, e.g. P1Y */
  readonly term?: string;
  /** The provisioning state of the reservation, e.g. Succeeded */
  readonly provisioningState?: string;
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** Information describing the type of billing plan for this reservation order. */
  planInformation?: ReservationOrderBillingPlanInformation;
  reservations?: Reservation[];
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** Extended status information for the reservation. */
  extendedStatusInfo?: ReservationExtendedStatusInfo;
  /** Represents UPN */
  productCode?: string;
}

export function reservationOrderDeserializer(item: any): ReservationOrder {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _reservationOrderPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties of a reservation order. */
export interface ReservationOrderProperty {
  /** Friendly name for user to easily identified the reservation order. */
  displayName?: string;
  /** Enrollment id of the reservation order. */
  enrollmentId?: string;
  /** Fully-qualified identifier of the customerId where the benefit is applied. Present only for Enterprise Agreement PartnerLed customers. */
  customerId?: string;
  /** Billing profile Id associated to this reservation order. */
  billingProfileId?: string;
  /** Billing account Id associated to this reservation order. */
  billingAccountId?: string;
  /** This is the DateTime when the reservation order was initially requested for purchase. */
  requestDateTime?: Date;
  /** This is the DateTime when the reservation order was created. */
  createdDateTime?: Date;
  /** This is the date when the reservation order will expire. */
  expiryDate?: Date;
  /** This is the date-time when the reservation order will expire. */
  expiryDateTime?: Date;
  /** This is the DateTime when the reservation benefit started. */
  benefitStartTime?: Date;
  /** Total original quantity of the skus purchased in the reservation order. */
  originalQuantity?: number;
  /** The term of the reservation, e.g. P1Y */
  readonly term?: string;
  /** The provisioning state of the reservation, e.g. Succeeded */
  readonly provisioningState?: string;
  /** Represent the billing plans. */
  billingPlan?: ReservationBillingPlan;
  /** Information describing the type of billing plan for this reservation order. */
  planInformation?: ReservationOrderBillingPlanInformation;
  reservations?: Reservation[];
  /** This is the date-time when the Azure Hybrid Benefit needs to be reviewed. */
  reviewDateTime?: Date;
  /** Extended status information for the reservation. */
  extendedStatusInfo?: ReservationExtendedStatusInfo;
  /** Represents UPN */
  productCode?: string;
}

export function reservationOrderPropertyDeserializer(item: any): ReservationOrderProperty {
  return {
    displayName: item["displayName"],
    enrollmentId: item["enrollmentId"],
    customerId: item["customerId"],
    billingProfileId: item["billingProfileId"],
    billingAccountId: item["billingAccountId"],
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
      : reservationArrayDeserializer(item["reservations"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : reservationExtendedStatusInfoDeserializer(item["extendedStatusInfo"]),
    productCode: item["productCode"],
  };
}

/** Information describing the type of billing plan for this reservation order. */
export interface ReservationOrderBillingPlanInformation {
  /** Amount of money to be paid for the Order. Tax is not included. */
  pricingCurrencyTotal?: Price;
  /** Date when the billing plan has started. */
  startDate?: Date;
  /** For recurring billing plans, indicates the date when next payment will be processed. Null when total is paid off. */
  nextPaymentDueDate?: Date;
  transactions?: ReservationPaymentDetail[];
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
      : reservationPaymentDetailArrayDeserializer(item["transactions"]),
  };
}

export function reservationPaymentDetailArrayDeserializer(
  result: Array<ReservationPaymentDetail>,
): any[] {
  return result.map((item) => {
    return reservationPaymentDetailDeserializer(item);
  });
}

/** Information about payment related to a reservation order. */
export interface ReservationPaymentDetail {
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
  /** Describes whether the payment is completed, failed, pending, cancelled or scheduled in the future. */
  status?: PaymentStatus;
  /** Extended status information for the reservation. */
  extendedStatusInfo?: ReservationExtendedStatusInfo;
}

export function reservationPaymentDetailDeserializer(item: any): ReservationPaymentDetail {
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
      : reservationExtendedStatusInfoDeserializer(item["extendedStatusInfo"]),
  };
}

/** Describes whether the payment is completed, failed, pending, cancelled or scheduled in the future. */
export enum KnownPaymentStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Completed */
  Completed = "Completed",
  /** Pending */
  Pending = "Pending",
}

/**
 * Describes whether the payment is completed, failed, pending, cancelled or scheduled in the future. \
 * {@link KnownPaymentStatus} can be used interchangeably with PaymentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Scheduled**: Scheduled \
 * **Cancelled**: Cancelled \
 * **Completed**: Completed \
 * **Pending**: Pending
 */
export type PaymentStatus = string;

/** List of ReservationOrders */
export interface _ReservationOrderList {
  /** The ReservationOrder items on this page */
  value: ReservationOrder[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _reservationOrderListDeserializer(item: any): _ReservationOrderList {
  return {
    value: reservationOrderArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function reservationOrderArrayDeserializer(result: Array<ReservationOrder>): any[] {
  return result.map((item) => {
    return reservationOrderDeserializer(item);
  });
}

/** Details of the transfer. */
export interface TransferDetails extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** The time at which the transfer request expires. */
  readonly expirationTime?: Date;
  /** Overall transfer status. */
  readonly transferStatus?: TransferStatus;
  /** The email ID of the user to whom the transfer request was sent. */
  readonly recipientEmailId?: string;
  /** The email ID of the user who sent the transfer request. */
  readonly initiatorEmailId?: string;
  /** The email ID of the user who canceled the transfer request. */
  readonly canceledBy?: string;
  /** Detailed transfer status. */
  readonly detailedTransferStatus?: DetailedTransferStatus[];
}

export function transferDetailsDeserializer(item: any): TransferDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _transferDetailsPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Transfer details */
export interface TransferProperties {
  /** The time at which the transfer request expires. */
  readonly expirationTime?: Date;
  /** Overall transfer status. */
  readonly transferStatus?: TransferStatus;
  /** The email ID of the user to whom the transfer request was sent. */
  readonly recipientEmailId?: string;
  /** The email ID of the user who sent the transfer request. */
  readonly initiatorEmailId?: string;
  /** The email ID of the user who canceled the transfer request. */
  readonly canceledBy?: string;
  /** Detailed transfer status. */
  readonly detailedTransferStatus?: DetailedTransferStatus[];
}

export function transferPropertiesDeserializer(item: any): TransferProperties {
  return {
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    transferStatus: item["transferStatus"],
    recipientEmailId: item["recipientEmailId"],
    initiatorEmailId: item["initiatorEmailId"],
    canceledBy: item["canceledBy"],
    detailedTransferStatus: !item["detailedTransferStatus"]
      ? item["detailedTransferStatus"]
      : detailedTransferStatusArrayDeserializer(item["detailedTransferStatus"]),
  };
}

/** The status of a transfer. */
export enum KnownTransferStatus {
  /** Expired */
  Expired = "Expired",
  /** Pending */
  Pending = "Pending",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** CompletedWithErrors */
  CompletedWithErrors = "CompletedWithErrors",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Declined */
  Declined = "Declined",
}

/**
 * The status of a transfer. \
 * {@link KnownTransferStatus} can be used interchangeably with TransferStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Expired**: Expired \
 * **Pending**: Pending \
 * **InProgress**: InProgress \
 * **Completed**: Completed \
 * **CompletedWithErrors**: CompletedWithErrors \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Declined**: Declined
 */
export type TransferStatus = string;

export function detailedTransferStatusArrayDeserializer(
  result: Array<DetailedTransferStatus>,
): any[] {
  return result.map((item) => {
    return detailedTransferStatusDeserializer(item);
  });
}

/** Detailed transfer status. */
export interface DetailedTransferStatus {
  /** Type of product that is transferred. */
  readonly productType?: ProductType;
  /** The ID of the product that is transferred. */
  readonly productId?: string;
  /** The name of the product that is transferred. */
  readonly productName?: string;
  /** The SKU of the product that is transferred. */
  readonly skuDescription?: string;
  /** Transfer status. */
  readonly transferStatus?: ProductTransferStatus;
  /** Error details for transfer execution. */
  errorDetails?: TransferError;
}

export function detailedTransferStatusDeserializer(item: any): DetailedTransferStatus {
  return {
    productType: item["productType"],
    productId: item["productId"],
    productName: item["productName"],
    skuDescription: item["skuDescription"],
    transferStatus: item["transferStatus"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : transferErrorDeserializer(item["errorDetails"]),
  };
}

/** The type of product that is transferred. */
export enum KnownProductType {
  /** AzureSubscription */
  AzureSubscription = "AzureSubscription",
  /** AzureReservation */
  AzureReservation = "AzureReservation",
  /** Department */
  Department = "Department",
  /** SavingsPlan */
  SavingsPlan = "SavingsPlan",
  /** SAAS */
  Saas = "SAAS",
}

/**
 * The type of product that is transferred. \
 * {@link KnownProductType} can be used interchangeably with ProductType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureSubscription**: AzureSubscription \
 * **AzureReservation**: AzureReservation \
 * **Department**: Department \
 * **SavingsPlan**: SavingsPlan \
 * **SAAS**: SAAS
 */
export type ProductType = string;

/** The status of a transfer. */
export enum KnownProductTransferStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
}

/**
 * The status of a transfer. \
 * {@link KnownProductTransferStatus} can be used interchangeably with ProductTransferStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **InProgress**: InProgress \
 * **Completed**: Completed \
 * **Failed**: Failed
 */
export type ProductTransferStatus = string;

/** Error details for transfer execution. */
export interface TransferError {
  /** Error code. */
  readonly code?: string;
  /** Error message. */
  readonly message?: string;
}

export function transferErrorDeserializer(item: any): TransferError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Request parameters to initiate transfer. */
export interface InitiateTransferRequest {
  /** The email ID of the recipient to whom the transfer request is sent. */
  recipientEmailId?: string;
}

export function initiateTransferRequestSerializer(item: InitiateTransferRequest): any {
  return {
    properties: areAllPropsUndefined(item, ["recipientEmailId"])
      ? undefined
      : _initiateTransferRequestPropertiesSerializer(item),
  };
}

/** Request parameters to initiate transfer. */
export interface InitiateTransferProperties {
  /** The email ID of the recipient to whom the transfer request is sent. */
  recipientEmailId?: string;
}

export function initiateTransferPropertiesSerializer(item: InitiateTransferProperties): any {
  return { recipientEmailId: item["recipientEmailId"] };
}

/** Paged collection of TransferDetails items */
export interface _TransferDetailsListResult {
  /** The TransferDetails items on this page */
  readonly value: TransferDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _transferDetailsListResultDeserializer(item: any): _TransferDetailsListResult {
  return {
    value: transferDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function transferDetailsArrayDeserializer(result: Array<TransferDetails>): any[] {
  return result.map((item) => {
    return transferDetailsDeserializer(item);
  });
}

/** Details of the transfer. */
export interface PartnerTransferDetails extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** The time at which the transfer request expires. */
  readonly expirationTime?: Date;
  /** Overall transfer status. */
  readonly transferStatus?: TransferStatus;
  /** The email ID of the user to whom the transfer request was sent. */
  readonly recipientEmailId?: string;
  /** The type of customer who sent the transfer request. */
  readonly initiatorCustomerType?: InitiatorCustomerType;
  /** The email ID of the user who sent the transfer request. */
  readonly initiatorEmailId?: string;
  /** Optional MPN ID of the reseller for transfer requests that are sent from a Microsoft Partner Agreement billing account. */
  readonly resellerId?: string;
  /** Optional name of the reseller for transfer requests that are sent from Microsoft Partner Agreement billing account. */
  readonly resellerName?: string;
  /** The email ID of the user who canceled the transfer request. */
  readonly canceledBy?: string;
  /** Detailed transfer status. */
  readonly detailedTransferStatus?: DetailedTransferStatus[];
}

export function partnerTransferDetailsDeserializer(item: any): PartnerTransferDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _partnerTransferDetailsPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Transfer Details. */
export interface PartnerTransferProperties {
  /** The time at which the transfer request expires. */
  readonly expirationTime?: Date;
  /** Overall transfer status. */
  readonly transferStatus?: TransferStatus;
  /** The email ID of the user to whom the transfer request was sent. */
  readonly recipientEmailId?: string;
  /** The type of customer who sent the transfer request. */
  readonly initiatorCustomerType?: InitiatorCustomerType;
  /** The email ID of the user who sent the transfer request. */
  readonly initiatorEmailId?: string;
  /** Optional MPN ID of the reseller for transfer requests that are sent from a Microsoft Partner Agreement billing account. */
  readonly resellerId?: string;
  /** Optional name of the reseller for transfer requests that are sent from Microsoft Partner Agreement billing account. */
  readonly resellerName?: string;
  /** The email ID of the user who canceled the transfer request. */
  readonly canceledBy?: string;
  /** Detailed transfer status. */
  readonly detailedTransferStatus?: DetailedTransferStatus[];
}

export function partnerTransferPropertiesDeserializer(item: any): PartnerTransferProperties {
  return {
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    transferStatus: item["transferStatus"],
    recipientEmailId: item["recipientEmailId"],
    initiatorCustomerType: item["initiatorCustomerType"],
    initiatorEmailId: item["initiatorEmailId"],
    resellerId: item["resellerId"],
    resellerName: item["resellerName"],
    canceledBy: item["canceledBy"],
    detailedTransferStatus: !item["detailedTransferStatus"]
      ? item["detailedTransferStatus"]
      : detailedTransferStatusArrayDeserializer(item["detailedTransferStatus"]),
  };
}

/** The type of customer of the transfer initiator. */
export enum KnownInitiatorCustomerType {
  /** Partner */
  Partner = "Partner",
  /** EA */
  EA = "EA",
}

/**
 * The type of customer of the transfer initiator. \
 * {@link KnownInitiatorCustomerType} can be used interchangeably with InitiatorCustomerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Partner**: Partner \
 * **EA**: EA
 */
export type InitiatorCustomerType = string;

/** Request parameters to initiate partner transfer. */
export interface PartnerInitiateTransferRequest {
  /** The email ID of the recipient to whom the transfer request is sent. */
  recipientEmailId?: string;
  /** Optional MPN ID of the reseller for transfer requests that are sent from a Microsoft Partner Agreement billing account. */
  resellerId?: string;
}

export function partnerInitiateTransferRequestSerializer(
  item: PartnerInitiateTransferRequest,
): any {
  return {
    properties: areAllPropsUndefined(item, ["recipientEmailId", "resellerId"])
      ? undefined
      : _partnerInitiateTransferRequestPropertiesSerializer(item),
  };
}

/** Request parameters to initiate transfer. */
export interface PartnerInitiateTransferProperties {
  /** The email ID of the recipient to whom the transfer request is sent. */
  recipientEmailId?: string;
  /** Optional MPN ID of the reseller for transfer requests that are sent from a Microsoft Partner Agreement billing account. */
  resellerId?: string;
}

export function partnerInitiateTransferPropertiesSerializer(
  item: PartnerInitiateTransferProperties,
): any {
  return { recipientEmailId: item["recipientEmailId"], resellerId: item["resellerId"] };
}

/** Paged collection of PartnerTransferDetails items */
export interface _PartnerTransferDetailsListResult {
  /** The PartnerTransferDetails items on this page */
  readonly value: PartnerTransferDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _partnerTransferDetailsListResultDeserializer(
  item: any,
): _PartnerTransferDetailsListResult {
  return {
    value: partnerTransferDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function partnerTransferDetailsArrayDeserializer(
  result: Array<PartnerTransferDetails>,
): any[] {
  return result.map((item) => {
    return partnerTransferDetailsDeserializer(item);
  });
}

/** Details of the transfer. */
export interface RecipientTransferDetails extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** The time at which the transfer request expires. */
  readonly expirationTime?: Date;
  /** Type of subscriptions that can be transferred. */
  readonly allowedProductType?: EligibleProductType[];
  /** Overall transfer status. */
  readonly transferStatus?: TransferStatus;
  /** The email ID of the user to whom the transfer request was sent. */
  readonly recipientEmailId?: string;
  /** The email ID of the user who sent the transfer request. */
  readonly initiatorEmailId?: string;
  /** Optional MPN ID of the reseller for transfer requests that are sent from a Microsoft Partner Agreement billing account. */
  readonly resellerId?: string;
  /** Optional name of the reseller for transfer requests that are sent from Microsoft Partner Agreement billing account. */
  readonly resellerName?: string;
  /** The type of customer who sent the transfer request. */
  readonly initiatorCustomerType?: InitiatorCustomerType;
  /** The email ID of the user who canceled the transfer request. */
  readonly canceledBy?: string;
  /** Detailed transfer status. */
  readonly detailedTransferStatus?: DetailedTransferStatus[];
  /** The customer tenant id. */
  readonly customerTenantId?: string;
  /** List of supported account types. */
  readonly supportedAccounts?: SupportedAccountType[];
}

export function recipientTransferDetailsDeserializer(item: any): RecipientTransferDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _recipientTransferDetailsPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Transfer Details. */
export interface RecipientTransferProperties {
  /** The time at which the transfer request expires. */
  readonly expirationTime?: Date;
  /** Type of subscriptions that can be transferred. */
  readonly allowedProductType?: EligibleProductType[];
  /** Overall transfer status. */
  readonly transferStatus?: TransferStatus;
  /** The email ID of the user to whom the transfer request was sent. */
  readonly recipientEmailId?: string;
  /** The email ID of the user who sent the transfer request. */
  readonly initiatorEmailId?: string;
  /** Optional MPN ID of the reseller for transfer requests that are sent from a Microsoft Partner Agreement billing account. */
  readonly resellerId?: string;
  /** Optional name of the reseller for transfer requests that are sent from Microsoft Partner Agreement billing account. */
  readonly resellerName?: string;
  /** The type of customer who sent the transfer request. */
  readonly initiatorCustomerType?: InitiatorCustomerType;
  /** The email ID of the user who canceled the transfer request. */
  readonly canceledBy?: string;
  /** Detailed transfer status. */
  readonly detailedTransferStatus?: DetailedTransferStatus[];
  /** The customer tenant id. */
  readonly customerTenantId?: string;
  /** List of supported account types. */
  readonly supportedAccounts?: SupportedAccountType[];
}

export function recipientTransferPropertiesDeserializer(item: any): RecipientTransferProperties {
  return {
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    allowedProductType: !item["allowedProductType"]
      ? item["allowedProductType"]
      : item["allowedProductType"].map((p: any) => {
          return p;
        }),
    transferStatus: item["transferStatus"],
    recipientEmailId: item["recipientEmailId"],
    initiatorEmailId: item["initiatorEmailId"],
    resellerId: item["resellerId"],
    resellerName: item["resellerName"],
    initiatorCustomerType: item["initiatorCustomerType"],
    canceledBy: item["canceledBy"],
    detailedTransferStatus: !item["detailedTransferStatus"]
      ? item["detailedTransferStatus"]
      : detailedTransferStatusArrayDeserializer(item["detailedTransferStatus"]),
    customerTenantId: item["customerTenantId"],
    supportedAccounts: !item["supportedAccounts"]
      ? item["supportedAccounts"]
      : item["supportedAccounts"].map((p: any) => {
          return p;
        }),
  };
}

/** Type of the products that can be transferred. */
export enum KnownEligibleProductType {
  /** DevTestAzureSubscription */
  DevTestAzureSubscription = "DevTestAzureSubscription",
  /** StandardAzureSubscription */
  StandardAzureSubscription = "StandardAzureSubscription",
  /** AzureReservation */
  AzureReservation = "AzureReservation",
}

/**
 * Type of the products that can be transferred. \
 * {@link KnownEligibleProductType} can be used interchangeably with EligibleProductType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DevTestAzureSubscription**: DevTestAzureSubscription \
 * **StandardAzureSubscription**: StandardAzureSubscription \
 * **AzureReservation**: AzureReservation
 */
export type EligibleProductType = string;

/** The supported account types. */
export enum KnownSupportedAccountType {
  /** None */
  None = "None",
  /** Partner */
  Partner = "Partner",
  /** Individual */
  Individual = "Individual",
  /** Enterprise */
  Enterprise = "Enterprise",
}

/**
 * The supported account types. \
 * {@link KnownSupportedAccountType} can be used interchangeably with SupportedAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Partner**: Partner \
 * **Individual**: Individual \
 * **Enterprise**: Enterprise
 */
export type SupportedAccountType = string;

/** Paged collection of RecipientTransferDetails items */
export interface _RecipientTransferDetailsListResult {
  /** The RecipientTransferDetails items on this page */
  readonly value: RecipientTransferDetails[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recipientTransferDetailsListResultDeserializer(
  item: any,
): _RecipientTransferDetailsListResult {
  return {
    value: recipientTransferDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recipientTransferDetailsArrayDeserializer(
  result: Array<RecipientTransferDetails>,
): any[] {
  return result.map((item) => {
    return recipientTransferDetailsDeserializer(item);
  });
}

/** Request parameters to accept transfer. */
export interface AcceptTransferRequest {
  /** Request parameters to accept transfer. */
  productDetails?: ProductDetails[];
}

export function acceptTransferRequestSerializer(item: AcceptTransferRequest): any {
  return {
    properties: areAllPropsUndefined(item, ["productDetails"])
      ? undefined
      : _acceptTransferRequestPropertiesSerializer(item),
  };
}

/** Request parameters to accept transfer. */
export interface AcceptTransferProperties {
  /** Request parameters to accept transfer. */
  productDetails?: ProductDetails[];
}

export function acceptTransferPropertiesSerializer(item: AcceptTransferProperties): any {
  return {
    productDetails: !item["productDetails"]
      ? item["productDetails"]
      : productDetailsArraySerializer(item["productDetails"]),
  };
}

export function productDetailsArraySerializer(result: Array<ProductDetails>): any[] {
  return result.map((item) => {
    return productDetailsSerializer(item);
  });
}

/** Details of the product that is transferred. */
export interface ProductDetails {
  /** Type of the product that is transferred. */
  productType?: ProductType;
  /** The ID of the product that is transferred. */
  productId?: string;
}

export function productDetailsSerializer(item: ProductDetails): any {
  return { productType: item["productType"], productId: item["productId"] };
}

/** Result of transfer validation. */
export interface ValidateTransferListResponse {
  /** The list of transfer validation results. */
  readonly value?: ValidateTransferResponse[];
}

export function validateTransferListResponseDeserializer(item: any): ValidateTransferListResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : validateTransferResponseArrayDeserializer(item["value"]),
  };
}

export function validateTransferResponseArrayDeserializer(
  result: Array<ValidateTransferResponse>,
): any[] {
  return result.map((item) => {
    return validateTransferResponseDeserializer(item);
  });
}

/** Transfer validation response. */
export interface ValidateTransferResponse {
  /** The status of validation */
  readonly status?: string;
  /** The product id for which this result applies. */
  readonly productId?: string;
  /** The array of validation results. */
  results?: ValidationResultProperties[];
}

export function validateTransferResponseDeserializer(item: any): ValidateTransferResponse {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _validateTransferResponsePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of transfer validation response. */
export interface ValidateTransferResponseProperties {
  /** The status of validation */
  readonly status?: string;
  /** The product id for which this result applies. */
  readonly productId?: string;
  /** The array of validation results. */
  results?: ValidationResultProperties[];
}

export function validateTransferResponsePropertiesDeserializer(
  item: any,
): ValidateTransferResponseProperties {
  return {
    status: item["status"],
    productId: item["productId"],
    results: !item["results"]
      ? item["results"]
      : validationResultPropertiesArrayDeserializer(item["results"]),
  };
}

export function validationResultPropertiesArrayDeserializer(
  result: Array<ValidationResultProperties>,
): any[] {
  return result.map((item) => {
    return validationResultPropertiesDeserializer(item);
  });
}

/** The properties of the validation result. */
export interface ValidationResultProperties {
  /** Result Level. */
  readonly level?: string;
  /** Result Code. */
  readonly code?: string;
  /** The validation message. */
  readonly message?: string;
}

export function validationResultPropertiesDeserializer(item: any): ValidationResultProperties {
  return {
    level: item["level"],
    code: item["code"],
    message: item["message"],
  };
}

/** Paged collection of Transaction items */
export interface _TransactionListResult {
  /** The Transaction items on this page */
  readonly value: Transaction[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _transactionListResultDeserializer(item: any): _TransactionListResult {
  return {
    value: transactionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function transactionArrayDeserializer(result: Array<Transaction>): any[] {
  return result.map((item) => {
    return transactionDeserializer(item);
  });
}

/** A transaction. */
export interface Transaction extends ProxyResourceWithTags {
  /** A transaction. */
  properties?: TransactionProperties;
}

export function transactionDeserializer(item: any): Transaction {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : transactionPropertiesDeserializer(item["properties"]),
  };
}

/** A transaction. */
export interface TransactionProperties {
  /** The amount of any Azure credits automatically applied to this transaction. */
  azureCreditApplied?: TransactionPropertiesAzureCreditApplied;
  /** Details of the Azure plan. */
  azurePlan?: string;
  /** The ISO 4217 code for the currency in which this transaction is billed. */
  billingCurrency?: string;
  /** The name of the billing profile. */
  billingProfileDisplayName?: any;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  billingProfileId?: string;
  /** The amount of Microsoft Azure Consumption Commitment(MACC) decrement through the transaction. */
  consumptionCommitmentDecremented?: TransactionPropertiesConsumptionCommitmentDecremented;
  /** The name of the customer. */
  customerDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a customer. */
  customerId?: string;
  /** The credit type of the transaction. Applies only to credited transactions. */
  creditType?: CreditType;
  /** The date of transaction. */
  date?: Date;
  /** The percentage discount, if any, applied to this transaction. */
  discount?: number;
  /** The price of the product after applying any discounts. */
  effectivePrice?: TransactionPropertiesEffectivePrice;
  /** The exchange rate used to convert charged amount to billing currency, if applicable. */
  exchangeRate?: number;
  /** Invoice name on which the transaction was billed or 'Pending' if the transaction is not billed. */
  invoice?: string;
  /** The fully qualified ID of the invoice on which the transaction was billed. This field is only applicable for transactions which are billed. */
  invoiceId?: string;
  /** The name of the invoice section. */
  invoiceSectionDisplayName?: string;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  invoiceSectionId?: string;
  /** Whether or not the transaction is third party. */
  isThirdParty?: boolean;
  /** Type of the transaction, billed or unbilled. */
  kind?: TransactionKind;
  /** The retail price of the product. */
  marketPrice?: TransactionPropertiesMarketPrice;
  /** The part number of the product for which the transaction took place. The field is only applicable for Enterprise Agreement invoices. */
  partNumber?: string;
  /** The ISO 4217 code for the currency in which the product is priced. */
  pricingCurrency?: string;
  /** The description of the product for which the transaction took place. */
  productDescription?: string;
  /** The family of the product for which the transaction took place. */
  productFamily?: string;
  /** The ID of the product type for which the transaction took place. */
  productTypeId?: string;
  /** The type of the product for which the transaction took place. */
  productType?: string;
  /** The quantity purchased in the transaction. */
  quantity?: number;
  /** There reason code for the transaction. */
  reasonCode?: string;
  /** The date of the purchase of the product, or the start date of the month in which usage started. */
  servicePeriodStartDate?: Date;
  /** The end date of the product term, or the end date of the month in which usage ended. */
  servicePeriodEndDate?: Date;
  /** The pre-tax charged amount for the transaction. */
  subTotal?: TransactionPropertiesSubTotal;
  /** The tax amount applied to the transaction. */
  tax?: TransactionPropertiesTax;
  /** The charge associated with the transaction. */
  transactionAmount?: TransactionPropertiesTransactionAmount;
  /** The type of transaction. */
  transactionType?: string;
  /** The number of units used for a given product. */
  units?: number;
  /** The unit of measure used to bill for the product. For example, compute services are billed per hour. */
  unitOfMeasure?: string;
  /** The description for the unit of measure for a given product. */
  unitType?: string;
  /** Identifies the type of tax calculation used for the invoice. The field is applicable only to invoices with special tax calculation logic. */
  specialTaxationType?: SpecialTaxationType;
  /** The refund details of a transaction. */
  refundTransactionDetails?: TransactionPropertiesRefundTransactionDetails;
}

export function transactionPropertiesDeserializer(item: any): TransactionProperties {
  return {
    azureCreditApplied: !item["azureCreditApplied"]
      ? item["azureCreditApplied"]
      : transactionPropertiesAzureCreditAppliedDeserializer(item["azureCreditApplied"]),
    azurePlan: item["azurePlan"],
    billingCurrency: item["billingCurrency"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileId: item["billingProfileId"],
    consumptionCommitmentDecremented: !item["consumptionCommitmentDecremented"]
      ? item["consumptionCommitmentDecremented"]
      : transactionPropertiesConsumptionCommitmentDecrementedDeserializer(
          item["consumptionCommitmentDecremented"],
        ),
    customerDisplayName: item["customerDisplayName"],
    customerId: item["customerId"],
    creditType: item["creditType"],
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    discount: item["discount"],
    effectivePrice: !item["effectivePrice"]
      ? item["effectivePrice"]
      : transactionPropertiesEffectivePriceDeserializer(item["effectivePrice"]),
    exchangeRate: item["exchangeRate"],
    invoice: item["invoice"],
    invoiceId: item["invoiceId"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    invoiceSectionId: item["invoiceSectionId"],
    isThirdParty: item["isThirdParty"],
    kind: item["kind"],
    marketPrice: !item["marketPrice"]
      ? item["marketPrice"]
      : transactionPropertiesMarketPriceDeserializer(item["marketPrice"]),
    partNumber: item["partNumber"],
    pricingCurrency: item["pricingCurrency"],
    productDescription: item["productDescription"],
    productFamily: item["productFamily"],
    productTypeId: item["productTypeId"],
    productType: item["productType"],
    quantity: item["quantity"],
    reasonCode: item["reasonCode"],
    servicePeriodStartDate: !item["servicePeriodStartDate"]
      ? item["servicePeriodStartDate"]
      : new Date(item["servicePeriodStartDate"]),
    servicePeriodEndDate: !item["servicePeriodEndDate"]
      ? item["servicePeriodEndDate"]
      : new Date(item["servicePeriodEndDate"]),
    subTotal: !item["subTotal"]
      ? item["subTotal"]
      : transactionPropertiesSubTotalDeserializer(item["subTotal"]),
    tax: !item["tax"] ? item["tax"] : transactionPropertiesTaxDeserializer(item["tax"]),
    transactionAmount: !item["transactionAmount"]
      ? item["transactionAmount"]
      : transactionPropertiesTransactionAmountDeserializer(item["transactionAmount"]),
    transactionType: item["transactionType"],
    units: item["units"],
    unitOfMeasure: item["unitOfMeasure"],
    unitType: item["unitType"],
    specialTaxationType: item["specialTaxationType"],
    refundTransactionDetails: !item["refundTransactionDetails"]
      ? item["refundTransactionDetails"]
      : transactionPropertiesRefundTransactionDetailsDeserializer(item["refundTransactionDetails"]),
  };
}

/** The amount of any Azure credits automatically applied to this transaction. */
export interface TransactionPropertiesAzureCreditApplied extends Amount {}

export function transactionPropertiesAzureCreditAppliedDeserializer(
  item: any,
): TransactionPropertiesAzureCreditApplied {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The amount of Microsoft Azure Consumption Commitment(MACC) decrement through the transaction. */
export interface TransactionPropertiesConsumptionCommitmentDecremented extends Amount {}

export function transactionPropertiesConsumptionCommitmentDecrementedDeserializer(
  item: any,
): TransactionPropertiesConsumptionCommitmentDecremented {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The credit type of the transaction. Applies only to credited transactions. */
export enum KnownCreditType {
  /** Other */
  Other = "Other",
  /** AzureFreeCredit */
  AzureFreeCredit = "AzureFreeCredit",
  /** AzureCreditOffer */
  AzureCreditOffer = "AzureCreditOffer",
  /** ServiceInterruption */
  ServiceInterruption = "ServiceInterruption",
  /** Refund */
  Refund = "Refund",
}

/**
 * The credit type of the transaction. Applies only to credited transactions. \
 * {@link KnownCreditType} can be used interchangeably with CreditType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **AzureFreeCredit**: AzureFreeCredit \
 * **AzureCreditOffer**: AzureCreditOffer \
 * **ServiceInterruption**: ServiceInterruption \
 * **Refund**: Refund
 */
export type CreditType = string;

/** The price of the product after applying any discounts. */
export interface TransactionPropertiesEffectivePrice extends Amount {}

export function transactionPropertiesEffectivePriceDeserializer(
  item: any,
): TransactionPropertiesEffectivePrice {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** Type of the transaction, billed or unbilled. */
export enum KnownTransactionKind {
  /** Other */
  Other = "Other",
  /** All */
  All = "All",
  /** Reservation */
  Reservation = "Reservation",
}

/**
 * Type of the transaction, billed or unbilled. \
 * {@link KnownTransactionKind} can be used interchangeably with TransactionKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **All**: All \
 * **Reservation**: Reservation
 */
export type TransactionKind = string;

/** The retail price of the product. */
export interface TransactionPropertiesMarketPrice extends Amount {}

export function transactionPropertiesMarketPriceDeserializer(
  item: any,
): TransactionPropertiesMarketPrice {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The pre-tax charged amount for the transaction. */
export interface TransactionPropertiesSubTotal extends Amount {}

export function transactionPropertiesSubTotalDeserializer(
  item: any,
): TransactionPropertiesSubTotal {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The tax amount applied to the transaction. */
export interface TransactionPropertiesTax extends Amount {}

export function transactionPropertiesTaxDeserializer(item: any): TransactionPropertiesTax {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The charge associated with the transaction. */
export interface TransactionPropertiesTransactionAmount extends Amount {}

export function transactionPropertiesTransactionAmountDeserializer(
  item: any,
): TransactionPropertiesTransactionAmount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The refund details of a transaction. */
export interface TransactionPropertiesRefundTransactionDetails extends RefundTransactionDetails {}

export function transactionPropertiesRefundTransactionDetailsDeserializer(
  item: any,
): TransactionPropertiesRefundTransactionDetails {
  return {
    amountRequested: !item["amountRequested"]
      ? item["amountRequested"]
      : refundTransactionDetailsAmountRequestedDeserializer(item["amountRequested"]),
    amountRefunded: !item["amountRefunded"]
      ? item["amountRefunded"]
      : refundTransactionDetailsAmountRefundedDeserializer(item["amountRefunded"]),
    refundOperationId: item["refundOperationId"],
  };
}

/** The refund details of a transaction. */
export interface RefundTransactionDetails {
  /** The amount of refund requested. */
  amountRequested?: RefundTransactionDetailsAmountRequested;
  /** The amount refunded. */
  amountRefunded?: RefundTransactionDetailsAmountRefunded;
  /** The ID of refund operation. */
  refundOperationId?: string;
}

export function refundTransactionDetailsDeserializer(item: any): RefundTransactionDetails {
  return {
    amountRequested: !item["amountRequested"]
      ? item["amountRequested"]
      : refundTransactionDetailsAmountRequestedDeserializer(item["amountRequested"]),
    amountRefunded: !item["amountRefunded"]
      ? item["amountRefunded"]
      : refundTransactionDetailsAmountRefundedDeserializer(item["amountRefunded"]),
    refundOperationId: item["refundOperationId"],
  };
}

/** The amount of refund requested. */
export interface RefundTransactionDetailsAmountRequested extends Amount {}

export function refundTransactionDetailsAmountRequestedDeserializer(
  item: any,
): RefundTransactionDetailsAmountRequested {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** The amount refunded. */
export interface RefundTransactionDetailsAmountRefunded extends Amount {}

export function refundTransactionDetailsAmountRefundedDeserializer(
  item: any,
): RefundTransactionDetailsAmountRefunded {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** A transaction summary. */
export interface TransactionSummary {
  /** The total amount of any Azure credits applied. */
  readonly azureCreditApplied?: number;
  /** The ISO 4217 code for the currency in which the transactions are billed. */
  readonly billingCurrency?: string;
  /** The total Microsoft Azure Consumption Commitment (MACC) decrement through the invoice. */
  readonly consumptionCommitmentDecremented?: number;
  /** The total pre-tax charged amount. */
  readonly subTotal?: number;
  /** The total tax amount applied. */
  readonly tax?: number;
  /** The total charges. */
  readonly total?: number;
}

export function transactionSummaryDeserializer(item: any): TransactionSummary {
  return {
    azureCreditApplied: item["azureCreditApplied"],
    billingCurrency: item["billingCurrency"],
    consumptionCommitmentDecremented: item["consumptionCommitmentDecremented"],
    subTotal: item["subTotal"],
    tax: item["tax"],
    total: item["total"],
  };
}

/** A container for a list of resources */
export interface _BillingPermissionListResult {
  /** The BillingPermission items on this page */
  readonly value: BillingPermission[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingPermissionListResultDeserializer(item: any): _BillingPermissionListResult {
  return {
    value: billingPermissionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingPermissionArrayDeserializer(result: Array<BillingPermission>): any[] {
  return result.map((item) => {
    return billingPermissionDeserializer(item);
  });
}

/** The set of allowed action and not allowed actions a caller has on a resource. */
export interface BillingPermission {
  /** The set of actions that the caller is allowed to perform. */
  readonly actions?: string[];
  /** The set of actions that the caller is not allowed to perform. */
  readonly notActions?: string[];
}

export function billingPermissionDeserializer(item: any): BillingPermission {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
    notActions: !item["notActions"]
      ? item["notActions"]
      : item["notActions"].map((p: any) => {
          return p;
        }),
  };
}

/** Request to check access. */
export interface CheckAccessRequest {
  /** List of actions passed in the request body against which the permissions will be checked. */
  actions?: string[];
}

export function checkAccessRequestSerializer(item: CheckAccessRequest): any {
  return {
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return p;
        }),
  };
}

/** The properties of a check access response. */
export interface CheckAccessResponse {
  /** Access Decision, specifies access is allowed or not. */
  readonly accessDecision?: AccessDecision;
  /** Gets or sets an action. */
  readonly action?: string;
}

export function checkAccessResponseDeserializer(item: any): CheckAccessResponse {
  return {
    accessDecision: item["accessDecision"],
    action: item["action"],
  };
}

/** Access Decision, specifies access is allowed or not. */
export enum KnownAccessDecision {
  /** Other */
  Other = "Other",
  /** Allowed */
  Allowed = "Allowed",
  /** NotAllowed */
  NotAllowed = "NotAllowed",
}

/**
 * Access Decision, specifies access is allowed or not. \
 * {@link KnownAccessDecision} can be used interchangeably with AccessDecision,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Allowed**: Allowed \
 * **NotAllowed**: NotAllowed
 */
export type AccessDecision = string;

/** List of savings plans */
export interface _SavingsPlanModelListResult extends _SavingsPlanModelList {
  /** The roll out count summary of the savings plans */
  summary: SavingsPlanSummaryCount;
}

export function _savingsPlanModelListResultDeserializer(item: any): _SavingsPlanModelListResult {
  return {
    value: savingsPlanModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    summary: savingsPlanSummaryCountDeserializer(item["summary"]),
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

/** List of savings plans */
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

/** Savings plan */
export interface SavingsPlanModel extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** Savings plan SKU */
  sku: Sku;
  /** Display name */
  displayName?: string;
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The provisioning state of the savings plan for display, e.g. Succeeded */
  readonly displayProvisioningState?: string;
  /** The applied scope type of the savings plan for display, e.g. Shared */
  readonly userFriendlyAppliedScopeType?: string;
  /** Subscription that will be charged for purchasing SavingsPlan */
  billingScopeId?: string;
  /** Fully-qualified identifier of the billing profile where the savings plan is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. */
  readonly customerId?: string;
  /** Fully-qualified identifier of the billing account where the savings plan is applied. */
  readonly billingAccountId?: string;
  /** Represents the Savings plan term in ISO 8601 format. */
  term?: SavingsPlanTerm;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** SavingsPlan Id of the SavingsPlan from which this SavingsPlan is renewed. */
  renewSource?: string;
  /** SavingsPlan Id of the SavingsPlan which is purchased because of renew. */
  renewDestination?: string;
  /** Properties specific to renew. */
  renewProperties?: RenewProperties;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly purchases. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** DateTime of the savings plan starting when this version is effective from. */
  readonly effectiveDateTime?: Date;
  /** This is the DateTime when the savings plan benefit starts. */
  readonly benefitStartTime?: Date;
  /** This is the date-time when the savings plan will expire. */
  readonly expiryDateTime?: Date;
  /** Date time when the savings plan was purchased. */
  readonly purchaseDateTime?: Date;
  /** Savings plan utilization */
  readonly utilization?: Utilization;
  /** Extended status information */
  readonly extendedStatusInfo?: ExtendedStatusInfo;
  /** Represents UPN */
  productCode?: string;
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    sku: skuDeserializer(item["sku"]),
  };
}

/** Savings plan properties */
export interface SavingsPlanModelProperties {
  /** Display name */
  displayName?: string;
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The provisioning state of the savings plan for display, e.g. Succeeded */
  readonly displayProvisioningState?: string;
  /** The applied scope type of the savings plan for display, e.g. Shared */
  readonly userFriendlyAppliedScopeType?: string;
  /** Subscription that will be charged for purchasing SavingsPlan */
  billingScopeId?: string;
  /** Fully-qualified identifier of the billing profile where the savings plan is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. */
  readonly customerId?: string;
  /** Fully-qualified identifier of the billing account where the savings plan is applied. */
  readonly billingAccountId?: string;
  /** Represents the Savings plan term in ISO 8601 format. */
  term?: SavingsPlanTerm;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** SavingsPlan Id of the SavingsPlan from which this SavingsPlan is renewed. */
  renewSource?: string;
  /** SavingsPlan Id of the SavingsPlan which is purchased because of renew. */
  renewDestination?: string;
  /** Properties specific to renew. */
  renewProperties?: RenewProperties;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly purchases. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** DateTime of the savings plan starting when this version is effective from. */
  readonly effectiveDateTime?: Date;
  /** This is the DateTime when the savings plan benefit starts. */
  readonly benefitStartTime?: Date;
  /** This is the date-time when the savings plan will expire. */
  readonly expiryDateTime?: Date;
  /** Date time when the savings plan was purchased. */
  readonly purchaseDateTime?: Date;
  /** Savings plan utilization */
  readonly utilization?: Utilization;
  /** Extended status information */
  readonly extendedStatusInfo?: ExtendedStatusInfo;
  /** Represents UPN */
  productCode?: string;
}

export function savingsPlanModelPropertiesDeserializer(item: any): SavingsPlanModelProperties {
  return {
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    displayProvisioningState: item["displayProvisioningState"],
    userFriendlyAppliedScopeType: item["userFriendlyAppliedScopeType"],
    billingScopeId: item["billingScopeId"],
    billingProfileId: item["billingProfileId"],
    customerId: item["customerId"],
    billingAccountId: item["billingAccountId"],
    term: item["term"],
    renew: item["renew"],
    renewSource: item["renewSource"],
    renewDestination: item["renewDestination"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : renewPropertiesDeserializer(item["renewProperties"]),
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    effectiveDateTime: !item["effectiveDateTime"]
      ? item["effectiveDateTime"]
      : new Date(item["effectiveDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    purchaseDateTime: !item["purchaseDateTime"]
      ? item["purchaseDateTime"]
      : new Date(item["purchaseDateTime"]),
    utilization: !item["utilization"]
      ? item["utilization"]
      : utilizationDeserializer(item["utilization"]),
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
    productCode: item["productCode"],
  };
}

/** Represents the Savings plan term in ISO 8601 format. */
export enum KnownSavingsPlanTerm {
  /** P1Y */
  P1Y = "P1Y",
  /** P3Y */
  P3Y = "P3Y",
  /** P5Y */
  P5Y = "P5Y",
}

/**
 * Represents the Savings plan term in ISO 8601 format. \
 * {@link KnownSavingsPlanTerm} can be used interchangeably with SavingsPlanTerm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P1Y**: P1Y \
 * **P3Y**: P3Y \
 * **P5Y**: P5Y
 */
export type SavingsPlanTerm = string;

/** Properties specific to renew. */
export interface RenewProperties {
  /** Purchase request. */
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

/** Purchase request. */
export interface PurchaseRequest {
  /** The SKU to be applied for this resource */
  sku?: Sku;
  /** Friendly name of the savings plan */
  displayName?: string;
  /** Subscription that will be charged for purchasing SavingsPlan */
  billingScopeId?: string;
  /** Represents the Savings plan term in ISO 8601 format. */
  term?: SavingsPlanTerm;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly purchases. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
  /** Setting this to true will automatically purchase a new benefit on the expiration date time. */
  renew?: boolean;
  /** Properties specific to applied scope type. Not required if not applicable. */
  appliedScopeProperties?: AppliedScopeProperties;
}

export function purchaseRequestSerializer(item: PurchaseRequest): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
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
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    ...(!item["properties"]
      ? item["properties"]
      : _purchaseRequestPropertiesDeserializer(item["properties"])),
  };
}

/** The SKU to be applied for this resource */
export interface Sku {
  /** Name of the SKU to be applied */
  name?: string;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
  };
}

/** Purchase request properties. */
export interface PurchaseRequestProperties {
  /** Friendly name of the savings plan */
  displayName?: string;
  /** Subscription that will be charged for purchasing SavingsPlan */
  billingScopeId?: string;
  /** Represents the Savings plan term in ISO 8601 format. */
  term?: SavingsPlanTerm;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly purchases. */
  billingPlan?: BillingPlan;
  /** Type of the Applied Scope. */
  appliedScopeType?: AppliedScopeType;
  /** Commitment towards the benefit. */
  commitment?: Commitment;
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
    renew: item["renew"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
  };
}

/** Represents the billing plan in ISO 8601 format. Required only for monthly purchases. */
export enum KnownBillingPlan {
  /** P1M */
  P1M = "P1M",
}

/**
 * Represents the billing plan in ISO 8601 format. Required only for monthly purchases. \
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

/** Properties specific to applied scope type. Not required if not applicable. */
export interface AppliedScopeProperties {
  /** Tenant ID where the savings plan where the benefit is applied. */
  tenantId?: string;
  /** Fully-qualified identifier of the management group where the benefit is applied. */
  managementGroupId?: string;
  /** Fully-qualified identifier of the subscription where the benefit is applied. */
  subscriptionId?: string;
  /** Fully-qualified identifier of the resource group where the benefit is applied. */
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

/** Savings plan utilization */
export interface Utilization {
  /** The trend for a savings plan's utilization */
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

/** Extended status information */
export interface ExtendedStatusInfo {
  /** Status code providing additional information. */
  statusCode?: string;
  /** The message giving detailed information about the status code. */
  message?: string;
  /** The subscription that has failed credit line check. */
  subscriptionId?: string;
}

export function extendedStatusInfoDeserializer(item: any): ExtendedStatusInfo {
  return {
    statusCode: item["statusCode"],
    message: item["message"],
    ...(!item["properties"]
      ? item["properties"]
      : _extendedStatusInfoPropertiesDeserializer(item["properties"])),
  };
}

/** Properties specific to credit line check failure */
export interface ExtendedStatusInfoProperties {
  /** The subscription that has failed credit line check. */
  subscriptionId?: string;
}

export function extendedStatusInfoPropertiesDeserializer(item: any): ExtendedStatusInfoProperties {
  return {
    subscriptionId: item["subscriptionId"],
  };
}

/** Savings plan patch request */
export interface SavingsPlanUpdateRequest {
  /** Savings plan patch request */
  properties?: SavingsPlanUpdateRequestProperties;
  /** The SKU to be applied for this resource */
  sku?: Sku;
  /** Tags for this reservation */
  tags?: Record<string, string>;
}

export function savingsPlanUpdateRequestSerializer(item: SavingsPlanUpdateRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : savingsPlanUpdateRequestPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
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
  /** Properties specific to renew. */
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

/** Savings plan update validate request. */
export interface SavingsPlanUpdateValidateRequest {
  /** The benefits of a savings plan. */
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

/** Savings plan update validate response. */
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
  /** Indicates if the provided input is valid */
  valid?: boolean;
  /** Failure reason code if the provided input is invalid */
  reasonCode?: string;
  /** Failure reason if the provided input is invalid */
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

/** A billing property. */
export interface BillingProperty extends ProxyResource {
  /** A billing property. */
  properties?: BillingPropertyProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function billingPropertySerializer(item: BillingProperty): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : billingPropertyPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function billingPropertyDeserializer(item: any): BillingProperty {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingPropertyPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A billing property. */
export interface BillingPropertyProperties {
  /** The type of agreement. */
  readonly billingAccountAgreementType?: AgreementType;
  /** The name of the billing account. */
  readonly billingAccountDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a billing account. */
  readonly billingAccountId?: string;
  /** Notification email address for legacy account. Available for agreement type Microsoft Online Services Program. */
  readonly accountAdminNotificationEmailAddress?: string;
  /** The country of the individual or organization that is responsible for the billing account. */
  readonly billingAccountSoldToCountry?: string;
  /** The current status of the billing account. */
  readonly billingAccountStatus?: AccountStatus;
  /** Reason for the specified billing account status. */
  readonly billingAccountStatusReasonCode?: BillingAccountStatusReasonCode;
  /** The type of customer. */
  readonly billingAccountType?: AccountType;
  /** The tier of the account. */
  readonly billingAccountSubType?: AccountSubType;
  /** The billing currency for the subscription. Available for billing accounts with agreement type Enterprise Agreement */
  readonly billingCurrency?: string;
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  readonly billingProfileId?: string;
  /** The billing profile spending limit. */
  readonly billingProfileSpendingLimit?: SpendingLimit;
  /** The details of billing profile spending limit. */
  readonly billingProfileSpendingLimitDetails?: SpendingLimitDetails[];
  /** The status of the billing profile. */
  readonly billingProfileStatus?: BillingProfileStatus;
  /** Reason for the specified billing profile status. */
  readonly billingProfileStatusReasonCode?: BillingProfileStatusReasonCode;
  /** The payment method family of the primary payment method for the billing profile. */
  readonly billingProfilePaymentMethodFamily?: PaymentMethodFamily;
  /** The payment method type of the primary payment method for the billing profile. */
  readonly billingProfilePaymentMethodType?: string;
  /** The Azure AD tenant ID of the billing account for the subscription. */
  readonly billingTenantId?: string;
  /** The cost center applied to the subscription. Available for agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. This property can be updated via patch. */
  costCenter?: string;
  /** The name of the customer. */
  readonly customerDisplayName?: string;
  /** The fully qualified ID that uniquely identifies a customer. */
  readonly customerId?: string;
  /** Identifies the status of an customer. This is an upcoming property that will be populated in the future. */
  readonly customerStatus?: CustomerStatus;
  /** The name of the invoice section. */
  readonly invoiceSectionDisplayName?: string;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  readonly invoiceSectionId?: string;
  /** Identifies the status of an invoice section. */
  readonly invoiceSectionStatus?: InvoiceSectionState;
  /** Reason for the specified invoice section status. */
  readonly invoiceSectionStatusReasonCode?: InvoiceSectionStateReasonCode;
  /** Specifies if the billing account for the subscription is transitioned from a Microsoft Online Service Program to a Microsoft Customer Agreement (MCA) account. Will be present and value will be true if its a transitioned billing account. */
  readonly isTransitionedBillingAccount?: boolean;
  /** The sku description. */
  readonly skuDescription?: string;
  /** The ID that uniquely identifies a sku. */
  readonly skuId?: string;
  /** The subscription status. */
  readonly subscriptionBillingStatus?: BillingSubscriptionStatus;
  /** The reason codes for the subscription status. */
  readonly subscriptionBillingStatusDetails?: BillingSubscriptionStatusDetails[];
  /** The type of billing subscription. */
  readonly subscriptionBillingType?: SubscriptionBillingType;
  /** The address of the individual or organization where service subscription is being used. Available for agreement type Microsoft Online Services Program. This property can be updated via patch. */
  subscriptionServiceUsageAddress?: BillingPropertyPropertiesSubscriptionServiceUsageAddress;
  /** The Azure workload type of the subscription. */
  readonly subscriptionWorkloadType?: SubscriptionWorkloadType;
  /** The enrollment details for the subscription. Available for billing accounts with agreement type Enterprise Agreement. */
  enrollmentDetails?: BillingPropertyPropertiesEnrollmentDetails;
  /** Indicates whether user is the account admin. */
  readonly isAccountAdmin?: boolean;
  /** The ID that uniquely identifies a product. */
  readonly productId?: string;
  /** The ID that uniquely identifies a product. */
  readonly productName?: string;
}

export function billingPropertyPropertiesSerializer(item: BillingPropertyProperties): any {
  return {
    costCenter: item["costCenter"],
    subscriptionServiceUsageAddress: !item["subscriptionServiceUsageAddress"]
      ? item["subscriptionServiceUsageAddress"]
      : billingPropertyPropertiesSubscriptionServiceUsageAddressSerializer(
          item["subscriptionServiceUsageAddress"],
        ),
    enrollmentDetails: !item["enrollmentDetails"]
      ? item["enrollmentDetails"]
      : billingPropertyPropertiesEnrollmentDetailsSerializer(item["enrollmentDetails"]),
  };
}

export function billingPropertyPropertiesDeserializer(item: any): BillingPropertyProperties {
  return {
    billingAccountAgreementType: item["billingAccountAgreementType"],
    billingAccountDisplayName: item["billingAccountDisplayName"],
    billingAccountId: item["billingAccountId"],
    accountAdminNotificationEmailAddress: item["accountAdminNotificationEmailAddress"],
    billingAccountSoldToCountry: item["billingAccountSoldToCountry"],
    billingAccountStatus: item["billingAccountStatus"],
    billingAccountStatusReasonCode: item["billingAccountStatusReasonCode"],
    billingAccountType: item["billingAccountType"],
    billingAccountSubType: item["billingAccountSubType"],
    billingCurrency: item["billingCurrency"],
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileId: item["billingProfileId"],
    billingProfileSpendingLimit: item["billingProfileSpendingLimit"],
    billingProfileSpendingLimitDetails: !item["billingProfileSpendingLimitDetails"]
      ? item["billingProfileSpendingLimitDetails"]
      : spendingLimitDetailsArrayDeserializer(item["billingProfileSpendingLimitDetails"]),
    billingProfileStatus: item["billingProfileStatus"],
    billingProfileStatusReasonCode: item["billingProfileStatusReasonCode"],
    billingProfilePaymentMethodFamily: item["billingProfilePaymentMethodFamily"],
    billingProfilePaymentMethodType: item["billingProfilePaymentMethodType"],
    billingTenantId: item["billingTenantId"],
    costCenter: item["costCenter"],
    customerDisplayName: item["customerDisplayName"],
    customerId: item["customerId"],
    customerStatus: item["customerStatus"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionStatus: item["invoiceSectionStatus"],
    invoiceSectionStatusReasonCode: item["invoiceSectionStatusReasonCode"],
    isTransitionedBillingAccount: item["isTransitionedBillingAccount"],
    skuDescription: item["skuDescription"],
    skuId: item["skuId"],
    subscriptionBillingStatus: item["subscriptionBillingStatus"],
    subscriptionBillingStatusDetails: !item["subscriptionBillingStatusDetails"]
      ? item["subscriptionBillingStatusDetails"]
      : billingSubscriptionStatusDetailsArrayDeserializer(item["subscriptionBillingStatusDetails"]),
    subscriptionBillingType: item["subscriptionBillingType"],
    subscriptionServiceUsageAddress: !item["subscriptionServiceUsageAddress"]
      ? item["subscriptionServiceUsageAddress"]
      : billingPropertyPropertiesSubscriptionServiceUsageAddressDeserializer(
          item["subscriptionServiceUsageAddress"],
        ),
    subscriptionWorkloadType: item["subscriptionWorkloadType"],
    enrollmentDetails: !item["enrollmentDetails"]
      ? item["enrollmentDetails"]
      : billingPropertyPropertiesEnrollmentDetailsDeserializer(item["enrollmentDetails"]),
    isAccountAdmin: item["isAccountAdmin"],
    productId: item["productId"],
    productName: item["productName"],
  };
}

/** The type of billing subscription. */
export enum KnownSubscriptionBillingType {
  /** None */
  None = "None",
  /** Benefit */
  Benefit = "Benefit",
  /** Free */
  Free = "Free",
  /** Paid */
  Paid = "Paid",
  /** PrePaid */
  PrePaid = "PrePaid",
}

/**
 * The type of billing subscription. \
 * {@link KnownSubscriptionBillingType} can be used interchangeably with SubscriptionBillingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Benefit**: Benefit \
 * **Free**: Free \
 * **Paid**: Paid \
 * **PrePaid**: PrePaid
 */
export type SubscriptionBillingType = string;

/** The address of the individual or organization where service subscription is being used. Available for agreement type Microsoft Online Services Program. This property can be updated via patch. */
export interface BillingPropertyPropertiesSubscriptionServiceUsageAddress extends AddressDetails {}

export function billingPropertyPropertiesSubscriptionServiceUsageAddressSerializer(
  item: BillingPropertyPropertiesSubscriptionServiceUsageAddress,
): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

export function billingPropertyPropertiesSubscriptionServiceUsageAddressDeserializer(
  item: any,
): BillingPropertyPropertiesSubscriptionServiceUsageAddress {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    city: item["city"],
    companyName: item["companyName"],
    country: item["country"],
    district: item["district"],
    email: item["email"],
    firstName: item["firstName"],
    lastName: item["lastName"],
    middleName: item["middleName"],
    phoneNumber: item["phoneNumber"],
    postalCode: item["postalCode"],
    region: item["region"],
    isValidAddress: item["isValidAddress"],
  };
}

/** The Azure workload type of the subscription. */
export enum KnownSubscriptionWorkloadType {
  /** None */
  None = "None",
  /** Production */
  Production = "Production",
  /** DevTest */
  DevTest = "DevTest",
  /** Internal */
  Internal = "Internal",
}

/**
 * The Azure workload type of the subscription. \
 * {@link KnownSubscriptionWorkloadType} can be used interchangeably with SubscriptionWorkloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Production**: Production \
 * **DevTest**: DevTest \
 * **Internal**: Internal
 */
export type SubscriptionWorkloadType = string;

/** The enrollment details for the subscription. Available for billing accounts with agreement type Enterprise Agreement. */
export interface BillingPropertyPropertiesEnrollmentDetails extends SubscriptionEnrollmentDetails {}

export function billingPropertyPropertiesEnrollmentDetailsSerializer(
  item: BillingPropertyPropertiesEnrollmentDetails,
): any {
  return {
    departmentDisplayName: item["departmentDisplayName"],
    departmentId: item["departmentId"],
    enrollmentAccountStatus: item["enrollmentAccountStatus"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
  };
}

export function billingPropertyPropertiesEnrollmentDetailsDeserializer(
  item: any,
): BillingPropertyPropertiesEnrollmentDetails {
  return {
    departmentDisplayName: item["departmentDisplayName"],
    departmentId: item["departmentId"],
    enrollmentAccountStatus: item["enrollmentAccountStatus"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
  };
}

/** The enrollment details for the subscription. Available for billing accounts with agreement type Enterprise Agreement. */
export interface SubscriptionEnrollmentDetails {
  /** The name of the department */
  departmentDisplayName?: string;
  /** The ID that uniquely identifies the department. */
  departmentId?: string;
  /** The status of the enrollment account. */
  enrollmentAccountStatus?: string;
  /** The name of the enrollment account. */
  enrollmentAccountDisplayName?: string;
  /** The ID that uniquely identifies an enrollment account. */
  enrollmentAccountId?: string;
}

export function subscriptionEnrollmentDetailsSerializer(item: SubscriptionEnrollmentDetails): any {
  return {
    departmentDisplayName: item["departmentDisplayName"],
    departmentId: item["departmentId"],
    enrollmentAccountStatus: item["enrollmentAccountStatus"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
  };
}

export function subscriptionEnrollmentDetailsDeserializer(
  item: any,
): SubscriptionEnrollmentDetails {
  return {
    departmentDisplayName: item["departmentDisplayName"],
    departmentId: item["departmentId"],
    enrollmentAccountStatus: item["enrollmentAccountStatus"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
  };
}

/** The properties of a role definition. */
export interface BillingRoleDefinition extends ProxyResource {
  /** The properties of a role definition. */
  properties?: BillingRoleDefinitionProperties;
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
}

export function billingRoleDefinitionDeserializer(item: any): BillingRoleDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : billingRoleDefinitionPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The properties of a role definition. */
export interface BillingRoleDefinitionProperties {
  /** The role description. */
  readonly description?: string;
  /** The billingPermissions the role has. */
  readonly permissions?: BillingPermission[];
  /** The name of the role. */
  roleName: string;
}

export function billingRoleDefinitionPropertiesDeserializer(
  item: any,
): BillingRoleDefinitionProperties {
  return {
    description: item["description"],
    permissions: !item["permissions"]
      ? item["permissions"]
      : billingPermissionArrayDeserializer(item["permissions"]),
    roleName: item["roleName"],
  };
}

/** Paged collection of BillingRoleDefinition items */
export interface _BillingRoleDefinitionListResult {
  /** The BillingRoleDefinition items on this page */
  readonly value: BillingRoleDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingRoleDefinitionListResultDeserializer(
  item: any,
): _BillingRoleDefinitionListResult {
  return {
    value: billingRoleDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingRoleDefinitionArrayDeserializer(
  result: Array<BillingRoleDefinition>,
): any[] {
  return result.map((item) => {
    return billingRoleDefinitionDeserializer(item);
  });
}

/** Savings plan order */
export interface SavingsPlanOrderModel extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** Savings plan SKU */
  sku: Sku;
  /** Display name */
  displayName?: string;
  /** The provisioning state of the savings plan, e.g. Succeeded */
  readonly provisioningState?: string;
  /** Subscription that will be charged for purchasing SavingsPlan */
  billingScopeId?: string;
  /** Fully-qualified identifier of the billing profile where the savings plan is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. */
  readonly customerId?: string;
  /** Fully-qualified identifier of the billing account where the savings plan is applied. */
  readonly billingAccountId?: string;
  /** Represents the Savings plan term in ISO 8601 format. */
  term?: SavingsPlanTerm;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly purchases. */
  billingPlan?: BillingPlan;
  /** DateTime when the savings plan benefit started. */
  readonly benefitStartTime?: Date;
  /** DateTime when the savings plan will expire. */
  readonly expiryDateTime?: Date;
  /** Information describing the type of billing plan for this savings plan. */
  planInformation?: BillingPlanInformation;
  savingsPlans?: string[];
  /** Extended status information */
  readonly extendedStatusInfo?: ExtendedStatusInfo;
  /** Represents UPN */
  productCode?: string;
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    sku: skuDeserializer(item["sku"]),
  };
}

/** Savings plan order properties */
export interface SavingsPlanOrderModelProperties {
  /** Display name */
  displayName?: string;
  /** The provisioning state of the savings plan, e.g. Succeeded */
  readonly provisioningState?: string;
  /** Subscription that will be charged for purchasing SavingsPlan */
  billingScopeId?: string;
  /** Fully-qualified identifier of the billing profile where the savings plan is applied. Present only for Field-led or Customer-led customers. */
  readonly billingProfileId?: string;
  /** Fully-qualified identifier of the customer where the savings plan is applied. Present only for Partner-led customers. */
  readonly customerId?: string;
  /** Fully-qualified identifier of the billing account where the savings plan is applied. */
  readonly billingAccountId?: string;
  /** Represents the Savings plan term in ISO 8601 format. */
  term?: SavingsPlanTerm;
  /** Represents the billing plan in ISO 8601 format. Required only for monthly purchases. */
  billingPlan?: BillingPlan;
  /** DateTime when the savings plan benefit started. */
  readonly benefitStartTime?: Date;
  /** DateTime when the savings plan will expire. */
  readonly expiryDateTime?: Date;
  /** Information describing the type of billing plan for this savings plan. */
  planInformation?: BillingPlanInformation;
  savingsPlans?: string[];
  /** Extended status information */
  readonly extendedStatusInfo?: ExtendedStatusInfo;
  /** Represents UPN */
  productCode?: string;
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
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
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
    productCode: item["productCode"],
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
  /** Date when the transaction is completed. Null when it is scheduled. */
  paymentDate?: Date;
  /** Amount in pricing currency. Tax not included. */
  pricingCurrencyTotal?: Price;
  /** Amount charged in Billing currency. Tax not included. Is null for future payments */
  billingCurrencyTotal?: Price;
  /** Describes whether the payment is completed, failed, pending, cancelled or scheduled in the future. */
  status?: PaymentStatus;
  /** Extended status information */
  readonly extendedStatusInfo?: ExtendedStatusInfo;
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
  };
}

/** List of savings plan orders */
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

/** A billing subscription alias. */
export interface BillingSubscriptionAlias extends ProxyResource {
  /** Dictionary of metadata associated with the resource. It may not be populated for all resource types. Maximum key/value length supported of 256 characters. Keys/value should not empty value nor null. Keys can not contain < > % & \ ? / */
  tags?: Record<string, string>;
  /** Indicates whether auto renewal is turned on or off for a product. */
  autoRenew?: AutoRenew;
  /** The provisioning tenant of the subscription. */
  beneficiaryTenantId?: string;
  /** The beneficiary of the billing subscription. */
  beneficiary?: Beneficiary;
  /** The billing frequency in ISO8601 format of product in the subscription. Example: P1M, P3M, P1Y */
  billingFrequency?: string;
  /** The fully qualified ID that uniquely identifies a billing profile. */
  billingProfileId?: string;
  /** Dictionary of billing policies associated with the subscription. */
  readonly billingPolicies?: Record<string, string>;
  /** The name of the billing profile. */
  readonly billingProfileDisplayName?: string;
  /** The ID that uniquely identifies a billing profile. */
  readonly billingProfileName?: string;
  /** The cost center applied to the subscription. This field is only available for consumption subscriptions of Microsoft Customer Agreement or Enterprise Agreement Type billing accounts. */
  consumptionCostCenter?: string;
  /** The fully qualified ID that uniquely identifies a customer. */
  customerId?: string;
  /** The name of the customer. */
  readonly customerDisplayName?: string;
  /** The ID that uniquely identifies a customer. */
  readonly customerName?: string;
  /** The name of the billing subscription. */
  displayName?: string;
  /** The enrollment Account ID associated with the subscription. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountId?: string;
  /** The enrollment Account name associated with the subscription. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountDisplayName?: string;
  /** Enrollment Account Subscription details. This field is available only for the Enterprise Agreement Type billing accounts. */
  readonly enrollmentAccountSubscriptionDetails?: EnrollmentAccountSubscriptionDetails;
  /** The fully qualified ID that uniquely identifies an invoice section. */
  invoiceSectionId?: string;
  /** The name of the invoice section. */
  readonly invoiceSectionDisplayName?: string;
  /** The ID that uniquely identifies an invoice section. */
  readonly invoiceSectionName?: string;
  /** The last month's charges. This field is only available for usage based subscriptions of Microsoft Customer Agreement billing accounts. */
  readonly lastMonthCharges?: Amount;
  /** The current month to date charges. This field is only available for usage based subscriptions of Microsoft Customer Agreement billing accounts. */
  readonly monthToDateCharges?: Amount;
  /** Next billing cycle details of the subscription. */
  readonly nextBillingCycleDetails?: NextBillingCycleDetails;
  /** The offer ID for the subscription. This field is only available for the Microsoft Online Services Program billing accounts or billing accounts with agreement type Enterprise Agreement. */
  readonly offerId?: string;
  /** The category of the product for which the subscription is purchased. Possible values include: AzureSupport, Hardware, ReservationOrder, SaaS, SavingsPlanOrder, Software, UsageBased, Other. */
  readonly productCategory?: string;
  /** Type of the product for which the subscription is purchased. */
  readonly productType?: string;
  /** Id of the product for which the subscription is purchased. */
  productTypeId?: string;
  /** Purchase date of the product in UTC time. */
  readonly purchaseDate?: Date;
  /** The quantity of licenses or fulfillment units for the subscription. */
  quantity?: number;
  /** Reseller for this subscription. The fields is not available for Microsoft Partner Agreement billing accounts. */
  readonly reseller?: Reseller;
  /** Details for the next renewal term of a subscription. */
  readonly renewalTermDetails?: RenewalTermDetails;
  /** The SKU ID of the product for which the subscription is purchased. This field is is only available  for Microsoft Customer Agreement billing accounts. */
  skuId?: string;
  /** The SKU description of the product for which the subscription is purchased. This field is is only available for billing accounts with agreement type Microsoft Customer Agreement and Microsoft Partner Agreement. */
  readonly skuDescription?: string;
  /** System imposed policies that regulate behavior of the subscription. */
  systemOverrides?: SystemOverrides;
  /** Unique identifier of the linked resource. */
  readonly resourceUri?: string;
  /** The duration in ISO8601 format for which you can use the subscription. Example: P1M, P3M, P1Y */
  termDuration?: string;
  /** Start date of the term in UTC time. */
  readonly termStartDate?: Date;
  /** End date of the term in UTC time. */
  readonly termEndDate?: Date;
  /** The tenant in which the subscription is provisioned. */
  provisioningTenantId?: string;
  /** The status of the subscription. This field is not available for Enterprise Agreement billing accounts */
  readonly status?: BillingSubscriptionStatus;
  /** The status of an operation on the subscription. When None, there is no ongoing operation. When LockedForUpdate, write operations will be blocked on the Billing Subscription. Other is the default value and you may need to refer to the latest API version for more details. */
  readonly operationStatus?: BillingSubscriptionOperationStatus;
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
  /** The ID of the subscription. */
  readonly subscriptionId?: string;
  /** The suspension reason for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly suspensionReasons?: string[];
  /** The suspension details for a subscription. This field is not available for Enterprise Agreement billing accounts. */
  readonly suspensionReasonDetails?: BillingSubscriptionStatusDetails[];
  /** The ID of the billing subscription with the subscription alias. */
  readonly billingSubscriptionId?: string;
}

export function billingSubscriptionAliasSerializer(item: BillingSubscriptionAlias): any {
  return {
    properties: areAllPropsUndefined(item, [
      "autoRenew",
      "beneficiaryTenantId",
      "beneficiary",
      "billingFrequency",
      "billingProfileId",
      "consumptionCostCenter",
      "customerId",
      "displayName",
      "invoiceSectionId",
      "productTypeId",
      "quantity",
      "skuId",
      "systemOverrides",
      "termDuration",
      "provisioningTenantId",
    ])
      ? undefined
      : _billingSubscriptionAliasPropertiesSerializer(item),
    tags: item["tags"],
  };
}

export function billingSubscriptionAliasDeserializer(item: any): BillingSubscriptionAlias {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _billingSubscriptionAliasPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A billing subscription alias. */
export interface BillingSubscriptionAliasProperties extends BillingSubscriptionProperties {
  /** The ID of the billing subscription with the subscription alias. */
  readonly billingSubscriptionId?: string;
  /** The provisioning state of the resource during a long-running operation. */
  readonly provisioningState?: ProvisioningState;
}

export function billingSubscriptionAliasPropertiesSerializer(
  item: BillingSubscriptionAliasProperties,
): any {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiarySerializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    displayName: item["displayName"],
    invoiceSectionId: item["invoiceSectionId"],
    productTypeId: item["productTypeId"],
    quantity: item["quantity"],
    skuId: item["skuId"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesSerializer(item["systemOverrides"]),
    termDuration: item["termDuration"],
    provisioningTenantId: item["provisioningTenantId"],
  };
}

export function billingSubscriptionAliasPropertiesDeserializer(
  item: any,
): BillingSubscriptionAliasProperties {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiaryDeserializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    billingPolicies: !item["billingPolicies"]
      ? item["billingPolicies"]
      : Object.fromEntries(
          Object.entries(item["billingPolicies"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileName: item["billingProfileName"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    customerDisplayName: item["customerDisplayName"],
    customerName: item["customerName"],
    displayName: item["displayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    ...(!item["enrollmentAccountSubscriptionDetails"]
      ? item["enrollmentAccountSubscriptionDetails"]
      : _billingSubscriptionPropertiesEnrollmentAccountSubscriptionDetailsDeserializer(
          item["enrollmentAccountSubscriptionDetails"],
        )),
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    invoiceSectionName: item["invoiceSectionName"],
    lastMonthCharges: !item["lastMonthCharges"]
      ? item["lastMonthCharges"]
      : amountDeserializer(item["lastMonthCharges"]),
    monthToDateCharges: !item["monthToDateCharges"]
      ? item["monthToDateCharges"]
      : amountDeserializer(item["monthToDateCharges"]),
    nextBillingCycleDetails: !item["nextBillingCycleDetails"]
      ? item["nextBillingCycleDetails"]
      : nextBillingCycleDetailsDeserializer(item["nextBillingCycleDetails"]),
    offerId: item["offerId"],
    productCategory: item["productCategory"],
    productType: item["productType"],
    productTypeId: item["productTypeId"],
    purchaseDate: !item["purchaseDate"] ? item["purchaseDate"] : new Date(item["purchaseDate"]),
    quantity: item["quantity"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    renewalTermDetails: !item["renewalTermDetails"]
      ? item["renewalTermDetails"]
      : renewalTermDetailsDeserializer(item["renewalTermDetails"]),
    skuId: item["skuId"],
    skuDescription: item["skuDescription"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesDeserializer(item["systemOverrides"]),
    resourceUri: item["resourceUri"],
    termDuration: item["termDuration"],
    termStartDate: !item["termStartDate"] ? item["termStartDate"] : new Date(item["termStartDate"]),
    termEndDate: !item["termEndDate"] ? item["termEndDate"] : new Date(item["termEndDate"]),
    provisioningTenantId: item["provisioningTenantId"],
    status: item["status"],
    operationStatus: item["operationStatus"],
    provisioningState: item["provisioningState"],
    subscriptionId: item["subscriptionId"],
    suspensionReasons: !item["suspensionReasons"]
      ? item["suspensionReasons"]
      : item["suspensionReasons"].map((p: any) => {
          return p;
        }),
    suspensionReasonDetails: !item["suspensionReasonDetails"]
      ? item["suspensionReasonDetails"]
      : billingSubscriptionStatusDetailsArrayDeserializer(item["suspensionReasonDetails"]),
    billingSubscriptionId: item["billingSubscriptionId"],
  };
}

/** Paged collection of BillingSubscriptionAlias items */
export interface _BillingSubscriptionAliasListResult {
  /** The BillingSubscriptionAlias items on this page */
  readonly value: BillingSubscriptionAlias[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingSubscriptionAliasListResultDeserializer(
  item: any,
): _BillingSubscriptionAliasListResult {
  return {
    value: billingSubscriptionAliasArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingSubscriptionAliasArraySerializer(
  result: Array<BillingSubscriptionAlias>,
): any[] {
  return result.map((item) => {
    return billingSubscriptionAliasSerializer(item);
  });
}

export function billingSubscriptionAliasArrayDeserializer(
  result: Array<BillingSubscriptionAlias>,
): any[] {
  return result.map((item) => {
    return billingSubscriptionAliasDeserializer(item);
  });
}

/** Result of the address validation. */
export interface AddressValidationResponse {
  /** Status of the address validation. */
  readonly status?: AddressValidationStatus;
  /** The list of suggested addresses. */
  readonly suggestedAddresses?: AddressDetails[];
  /** Validation error message. */
  readonly validationMessage?: string;
}

export function addressValidationResponseDeserializer(item: any): AddressValidationResponse {
  return {
    status: item["status"],
    suggestedAddresses: !item["suggestedAddresses"]
      ? item["suggestedAddresses"]
      : addressDetailsArrayDeserializer(item["suggestedAddresses"]),
    validationMessage: item["validationMessage"],
  };
}

/** Status of the address validation. */
export enum KnownAddressValidationStatus {
  /** Other */
  Other = "Other",
  /** Valid */
  Valid = "Valid",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * Status of the address validation. \
 * {@link KnownAddressValidationStatus} can be used interchangeably with AddressValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Other**: Other \
 * **Valid**: Valid \
 * **Invalid**: Invalid
 */
export type AddressValidationStatus = string;

export function addressDetailsArraySerializer(result: Array<AddressDetails>): any[] {
  return result.map((item) => {
    return addressDetailsSerializer(item);
  });
}

export function addressDetailsArrayDeserializer(result: Array<AddressDetails>): any[] {
  return result.map((item) => {
    return addressDetailsDeserializer(item);
  });
}

/** Known values of {@link TransactionType} that the service accepts. */
export enum KnownTransactionType {
  /** Other */
  Other = "Other",
  /** Billed */
  Billed = "Billed",
  /** Unbilled */
  Unbilled = "Unbilled",
}

/** Type of TransactionType */
export type TransactionType = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-04-01 API version. */
  V20240401 = "2024-04-01",
}

export function checkAccessResponseArrayDeserializer(result: Array<CheckAccessResponse>): any[] {
  return result.map((item) => {
    return checkAccessResponseDeserializer(item);
  });
}

export function documentDownloadRequestArraySerializer(
  result: Array<DocumentDownloadRequest>,
): any[] {
  return result.map((item) => {
    return documentDownloadRequestSerializer(item);
  });
}

export function _reservationPurchaseRequestPropertiesReservedResourcePropertiesSerializer(
  item: ReservationPurchaseRequestProperties,
): any {
  return {
    instanceFlexibility: item["instanceFlexibilityReservedResourcePropertiesInstanceFlexibility"],
  };
}

export function _reservationPurchaseRequestPropertiesReservedResourcePropertiesDeserializer(
  item: any,
) {
  return {
    instanceFlexibilityReservedResourcePropertiesInstanceFlexibility: item["instanceFlexibility"],
  };
}

export function _reservationPurchaseRequestPropertiesSerializer(
  item: ReservationPurchaseRequest,
): any {
  return {
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
      : reservationAppliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : reservationPurchaseRequestPropertiesReservedResourcePropertiesSerializer(
          item["reservedResourceProperties"],
        ),
    instanceFlexibility: item["instanceFlexibility"],
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
  };
}

export function _reservationPurchaseRequestPropertiesDeserializer(item: any) {
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
      : reservationAppliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    renew: item["renew"],
    reservedResourceProperties: !item["reservedResourceProperties"]
      ? item["reservedResourceProperties"]
      : reservationPurchaseRequestPropertiesReservedResourcePropertiesDeserializer(
          item["reservedResourceProperties"],
        ),
    instanceFlexibility: item["instanceFlexibility"],
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
  };
}

export function _reservationPropertyUtilizationDeserializer(item: any) {
  return {
    trend: item["trend"],
    aggregates: !item["aggregates"]
      ? item["aggregates"]
      : reservationUtilizationAggregatesArrayDeserializer(item["aggregates"]),
  };
}

export function _reservationPropertiesDeserializer(item: any) {
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
    expiryDate: item["expiryDate"],
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
    skuDescription: item["skuDescription"],
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : reservationExtendedStatusInfoDeserializer(item["extendedStatusInfo"]),
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
      : reservationAppliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
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
      : reservationPropertyUtilizationDeserializer(item["utilization"]),
    productCode: item["productCode"],
  };
}

export function _patchPropertiesRenewPropertiesSerializer(item: PatchProperties): any {
  return {
    purchaseProperties: !item["purchaseProperties"]
      ? item["purchaseProperties"]
      : reservationPurchaseRequestSerializer(item["purchaseProperties"]),
  };
}

export function _patchPropertiesSerializer(item: Patch): any {
  return {
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : reservationAppliedScopePropertiesSerializer(item["appliedScopeProperties"]),
    instanceFlexibility: item["instanceFlexibility"],
    displayName: item["displayName"],
    renew: item["renew"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : patchPropertiesRenewPropertiesSerializer(item["renewProperties"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : item["reviewDateTime"].toISOString(),
  };
}

export function _billingSubscriptionPropertiesEnrollmentAccountSubscriptionDetailsDeserializer(
  item: any,
) {
  return {
    enrollmentAccountStartDate: !item["enrollmentAccountStartDate"]
      ? item["enrollmentAccountStartDate"]
      : new Date(item["enrollmentAccountStartDate"]),
    subscriptionEnrollmentAccountStatus: item["subscriptionEnrollmentAccountStatus"],
  };
}

export function _billingSubscriptionPropertiesSerializer(item: BillingSubscription): any {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiarySerializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    displayName: item["displayName"],
    invoiceSectionId: item["invoiceSectionId"],
    productTypeId: item["productTypeId"],
    quantity: item["quantity"],
    skuId: item["skuId"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesSerializer(item["systemOverrides"]),
    termDuration: item["termDuration"],
    provisioningTenantId: item["provisioningTenantId"],
  };
}

export function _billingSubscriptionPropertiesDeserializer(item: any) {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiaryDeserializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    billingPolicies: !item["billingPolicies"]
      ? item["billingPolicies"]
      : Object.fromEntries(
          Object.entries(item["billingPolicies"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileName: item["billingProfileName"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    customerDisplayName: item["customerDisplayName"],
    customerName: item["customerName"],
    displayName: item["displayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    enrollmentAccountSubscriptionDetails: !item["enrollmentAccountSubscriptionDetails"]
      ? item["enrollmentAccountSubscriptionDetails"]
      : enrollmentAccountSubscriptionDetailsDeserializer(
          item["enrollmentAccountSubscriptionDetails"],
        ),
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    invoiceSectionName: item["invoiceSectionName"],
    lastMonthCharges: !item["lastMonthCharges"]
      ? item["lastMonthCharges"]
      : amountDeserializer(item["lastMonthCharges"]),
    monthToDateCharges: !item["monthToDateCharges"]
      ? item["monthToDateCharges"]
      : amountDeserializer(item["monthToDateCharges"]),
    nextBillingCycleDetails: !item["nextBillingCycleDetails"]
      ? item["nextBillingCycleDetails"]
      : nextBillingCycleDetailsDeserializer(item["nextBillingCycleDetails"]),
    offerId: item["offerId"],
    productCategory: item["productCategory"],
    productType: item["productType"],
    productTypeId: item["productTypeId"],
    purchaseDate: !item["purchaseDate"] ? item["purchaseDate"] : new Date(item["purchaseDate"]),
    quantity: item["quantity"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    renewalTermDetails: !item["renewalTermDetails"]
      ? item["renewalTermDetails"]
      : renewalTermDetailsDeserializer(item["renewalTermDetails"]),
    skuId: item["skuId"],
    skuDescription: item["skuDescription"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesDeserializer(item["systemOverrides"]),
    resourceUri: item["resourceUri"],
    termDuration: item["termDuration"],
    termStartDate: !item["termStartDate"] ? item["termStartDate"] : new Date(item["termStartDate"]),
    termEndDate: !item["termEndDate"] ? item["termEndDate"] : new Date(item["termEndDate"]),
    provisioningTenantId: item["provisioningTenantId"],
    status: item["status"],
    operationStatus: item["operationStatus"],
    provisioningState: item["provisioningState"],
    subscriptionId: item["subscriptionId"],
    suspensionReasons: !item["suspensionReasons"]
      ? item["suspensionReasons"]
      : item["suspensionReasons"].map((p: any) => {
          return p;
        }),
    suspensionReasonDetails: !item["suspensionReasonDetails"]
      ? item["suspensionReasonDetails"]
      : billingSubscriptionStatusDetailsArrayDeserializer(item["suspensionReasonDetails"]),
  };
}

export function _billingSubscriptionPatchPropertiesSerializer(item: BillingSubscriptionPatch): any {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiarySerializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    displayName: item["displayName"],
    invoiceSectionId: item["invoiceSectionId"],
    productTypeId: item["productTypeId"],
    quantity: item["quantity"],
    skuId: item["skuId"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesSerializer(item["systemOverrides"]),
    termDuration: item["termDuration"],
    provisioningTenantId: item["provisioningTenantId"],
  };
}

export function _billingSubscriptionPatchPropertiesDeserializer(item: any) {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiaryDeserializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    billingPolicies: !item["billingPolicies"]
      ? item["billingPolicies"]
      : Object.fromEntries(
          Object.entries(item["billingPolicies"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileName: item["billingProfileName"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    customerDisplayName: item["customerDisplayName"],
    customerName: item["customerName"],
    displayName: item["displayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    enrollmentAccountSubscriptionDetails: !item["enrollmentAccountSubscriptionDetails"]
      ? item["enrollmentAccountSubscriptionDetails"]
      : enrollmentAccountSubscriptionDetailsDeserializer(
          item["enrollmentAccountSubscriptionDetails"],
        ),
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    invoiceSectionName: item["invoiceSectionName"],
    lastMonthCharges: !item["lastMonthCharges"]
      ? item["lastMonthCharges"]
      : amountDeserializer(item["lastMonthCharges"]),
    monthToDateCharges: !item["monthToDateCharges"]
      ? item["monthToDateCharges"]
      : amountDeserializer(item["monthToDateCharges"]),
    nextBillingCycleDetails: !item["nextBillingCycleDetails"]
      ? item["nextBillingCycleDetails"]
      : nextBillingCycleDetailsDeserializer(item["nextBillingCycleDetails"]),
    offerId: item["offerId"],
    productCategory: item["productCategory"],
    productType: item["productType"],
    productTypeId: item["productTypeId"],
    purchaseDate: !item["purchaseDate"] ? item["purchaseDate"] : new Date(item["purchaseDate"]),
    quantity: item["quantity"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    renewalTermDetails: !item["renewalTermDetails"]
      ? item["renewalTermDetails"]
      : renewalTermDetailsDeserializer(item["renewalTermDetails"]),
    skuId: item["skuId"],
    skuDescription: item["skuDescription"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesDeserializer(item["systemOverrides"]),
    resourceUri: item["resourceUri"],
    termDuration: item["termDuration"],
    termStartDate: !item["termStartDate"] ? item["termStartDate"] : new Date(item["termStartDate"]),
    termEndDate: !item["termEndDate"] ? item["termEndDate"] : new Date(item["termEndDate"]),
    provisioningTenantId: item["provisioningTenantId"],
    status: item["status"],
    operationStatus: item["operationStatus"],
    provisioningState: item["provisioningState"],
    subscriptionId: item["subscriptionId"],
    suspensionReasons: !item["suspensionReasons"]
      ? item["suspensionReasons"]
      : item["suspensionReasons"].map((p: any) => {
          return p;
        }),
    suspensionReasonDetails: !item["suspensionReasonDetails"]
      ? item["suspensionReasonDetails"]
      : billingSubscriptionStatusDetailsArrayDeserializer(item["suspensionReasonDetails"]),
  };
}

export function _paymentMethodPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    accountHolderName: item["accountHolderName"],
    displayName: item["displayName"],
    expiration: item["expiration"],
    family: item["family"],
    lastFourDigits: item["lastFourDigits"],
    logos: !item["logos"] ? item["logos"] : paymentMethodLogoArrayDeserializer(item["logos"]),
    paymentMethodType: item["paymentMethodType"],
    status: item["status"],
  };
}

export function _paymentMethodLinkPropertiesDeserializer(item: any) {
  return {
    accountHolderName: item["accountHolderName"],
    displayName: item["displayName"],
    expiration: item["expiration"],
    family: item["family"],
    lastFourDigits: item["lastFourDigits"],
    logos: !item["logos"] ? item["logos"] : paymentMethodLogoArrayDeserializer(item["logos"]),
    paymentMethod: !item["paymentMethod"]
      ? item["paymentMethod"]
      : paymentMethodPropertiesDeserializer(item["paymentMethod"]),
    paymentMethodId: item["paymentMethodId"],
    paymentMethodType: item["paymentMethodType"],
    status: item["status"],
  };
}

export function _reservationOrderPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    enrollmentId: item["enrollmentId"],
    customerId: item["customerId"],
    billingProfileId: item["billingProfileId"],
    billingAccountId: item["billingAccountId"],
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
      : reservationArrayDeserializer(item["reservations"]),
    reviewDateTime: !item["reviewDateTime"]
      ? item["reviewDateTime"]
      : new Date(item["reviewDateTime"]),
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : reservationExtendedStatusInfoDeserializer(item["extendedStatusInfo"]),
    productCode: item["productCode"],
  };
}

export function _transferDetailsPropertiesDeserializer(item: any) {
  return {
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    transferStatus: item["transferStatus"],
    recipientEmailId: item["recipientEmailId"],
    initiatorEmailId: item["initiatorEmailId"],
    canceledBy: item["canceledBy"],
    detailedTransferStatus: !item["detailedTransferStatus"]
      ? item["detailedTransferStatus"]
      : detailedTransferStatusArrayDeserializer(item["detailedTransferStatus"]),
  };
}

export function _initiateTransferRequestPropertiesSerializer(item: InitiateTransferRequest): any {
  return { recipientEmailId: item["recipientEmailId"] };
}

export function _partnerTransferDetailsPropertiesDeserializer(item: any) {
  return {
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    transferStatus: item["transferStatus"],
    recipientEmailId: item["recipientEmailId"],
    initiatorCustomerType: item["initiatorCustomerType"],
    initiatorEmailId: item["initiatorEmailId"],
    resellerId: item["resellerId"],
    resellerName: item["resellerName"],
    canceledBy: item["canceledBy"],
    detailedTransferStatus: !item["detailedTransferStatus"]
      ? item["detailedTransferStatus"]
      : detailedTransferStatusArrayDeserializer(item["detailedTransferStatus"]),
  };
}

export function _partnerInitiateTransferRequestPropertiesSerializer(
  item: PartnerInitiateTransferRequest,
): any {
  return { recipientEmailId: item["recipientEmailId"], resellerId: item["resellerId"] };
}

export function _recipientTransferDetailsPropertiesDeserializer(item: any) {
  return {
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    allowedProductType: !item["allowedProductType"]
      ? item["allowedProductType"]
      : item["allowedProductType"].map((p: any) => {
          return p;
        }),
    transferStatus: item["transferStatus"],
    recipientEmailId: item["recipientEmailId"],
    initiatorEmailId: item["initiatorEmailId"],
    resellerId: item["resellerId"],
    resellerName: item["resellerName"],
    initiatorCustomerType: item["initiatorCustomerType"],
    canceledBy: item["canceledBy"],
    detailedTransferStatus: !item["detailedTransferStatus"]
      ? item["detailedTransferStatus"]
      : detailedTransferStatusArrayDeserializer(item["detailedTransferStatus"]),
    customerTenantId: item["customerTenantId"],
    supportedAccounts: !item["supportedAccounts"]
      ? item["supportedAccounts"]
      : item["supportedAccounts"].map((p: any) => {
          return p;
        }),
  };
}

export function _acceptTransferRequestPropertiesSerializer(item: AcceptTransferRequest): any {
  return {
    productDetails: !item["productDetails"]
      ? item["productDetails"]
      : productDetailsArraySerializer(item["productDetails"]),
  };
}

export function _validateTransferResponsePropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    productId: item["productId"],
    results: !item["results"]
      ? item["results"]
      : validationResultPropertiesArrayDeserializer(item["results"]),
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
    renew: item["renew"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
  };
}

export function _extendedStatusInfoPropertiesDeserializer(item: any) {
  return {
    subscriptionId: item["subscriptionId"],
  };
}

export function _savingsPlanModelPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    provisioningState: item["provisioningState"],
    displayProvisioningState: item["displayProvisioningState"],
    userFriendlyAppliedScopeType: item["userFriendlyAppliedScopeType"],
    billingScopeId: item["billingScopeId"],
    billingProfileId: item["billingProfileId"],
    customerId: item["customerId"],
    billingAccountId: item["billingAccountId"],
    term: item["term"],
    renew: item["renew"],
    renewSource: item["renewSource"],
    renewDestination: item["renewDestination"],
    renewProperties: !item["renewProperties"]
      ? item["renewProperties"]
      : renewPropertiesDeserializer(item["renewProperties"]),
    billingPlan: item["billingPlan"],
    appliedScopeType: item["appliedScopeType"],
    appliedScopeProperties: !item["appliedScopeProperties"]
      ? item["appliedScopeProperties"]
      : appliedScopePropertiesDeserializer(item["appliedScopeProperties"]),
    commitment: !item["commitment"]
      ? item["commitment"]
      : commitmentDeserializer(item["commitment"]),
    effectiveDateTime: !item["effectiveDateTime"]
      ? item["effectiveDateTime"]
      : new Date(item["effectiveDateTime"]),
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
    purchaseDateTime: !item["purchaseDateTime"]
      ? item["purchaseDateTime"]
      : new Date(item["purchaseDateTime"]),
    utilization: !item["utilization"]
      ? item["utilization"]
      : utilizationDeserializer(item["utilization"]),
    extendedStatusInfo: !item["extendedStatusInfo"]
      ? item["extendedStatusInfo"]
      : extendedStatusInfoDeserializer(item["extendedStatusInfo"]),
    productCode: item["productCode"],
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
    benefitStartTime: !item["benefitStartTime"]
      ? item["benefitStartTime"]
      : new Date(item["benefitStartTime"]),
    expiryDateTime: !item["expiryDateTime"]
      ? item["expiryDateTime"]
      : new Date(item["expiryDateTime"]),
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
    productCode: item["productCode"],
  };
}

export function _billingSubscriptionAliasPropertiesSerializer(item: BillingSubscriptionAlias): any {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiarySerializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    displayName: item["displayName"],
    invoiceSectionId: item["invoiceSectionId"],
    productTypeId: item["productTypeId"],
    quantity: item["quantity"],
    skuId: item["skuId"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesSerializer(item["systemOverrides"]),
    termDuration: item["termDuration"],
    provisioningTenantId: item["provisioningTenantId"],
  };
}

export function _billingSubscriptionAliasPropertiesDeserializer(item: any) {
  return {
    autoRenew: item["autoRenew"],
    beneficiaryTenantId: item["beneficiaryTenantId"],
    beneficiary: !item["beneficiary"]
      ? item["beneficiary"]
      : beneficiaryDeserializer(item["beneficiary"]),
    billingFrequency: item["billingFrequency"],
    billingProfileId: item["billingProfileId"],
    billingPolicies: !item["billingPolicies"]
      ? item["billingPolicies"]
      : Object.fromEntries(
          Object.entries(item["billingPolicies"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    billingProfileDisplayName: item["billingProfileDisplayName"],
    billingProfileName: item["billingProfileName"],
    consumptionCostCenter: item["consumptionCostCenter"],
    customerId: item["customerId"],
    customerDisplayName: item["customerDisplayName"],
    customerName: item["customerName"],
    displayName: item["displayName"],
    enrollmentAccountId: item["enrollmentAccountId"],
    enrollmentAccountDisplayName: item["enrollmentAccountDisplayName"],
    enrollmentAccountSubscriptionDetails: !item["enrollmentAccountSubscriptionDetails"]
      ? item["enrollmentAccountSubscriptionDetails"]
      : enrollmentAccountSubscriptionDetailsDeserializer(
          item["enrollmentAccountSubscriptionDetails"],
        ),
    invoiceSectionId: item["invoiceSectionId"],
    invoiceSectionDisplayName: item["invoiceSectionDisplayName"],
    invoiceSectionName: item["invoiceSectionName"],
    lastMonthCharges: !item["lastMonthCharges"]
      ? item["lastMonthCharges"]
      : amountDeserializer(item["lastMonthCharges"]),
    monthToDateCharges: !item["monthToDateCharges"]
      ? item["monthToDateCharges"]
      : amountDeserializer(item["monthToDateCharges"]),
    nextBillingCycleDetails: !item["nextBillingCycleDetails"]
      ? item["nextBillingCycleDetails"]
      : nextBillingCycleDetailsDeserializer(item["nextBillingCycleDetails"]),
    offerId: item["offerId"],
    productCategory: item["productCategory"],
    productType: item["productType"],
    productTypeId: item["productTypeId"],
    purchaseDate: !item["purchaseDate"] ? item["purchaseDate"] : new Date(item["purchaseDate"]),
    quantity: item["quantity"],
    reseller: !item["reseller"] ? item["reseller"] : resellerDeserializer(item["reseller"]),
    renewalTermDetails: !item["renewalTermDetails"]
      ? item["renewalTermDetails"]
      : renewalTermDetailsDeserializer(item["renewalTermDetails"]),
    skuId: item["skuId"],
    skuDescription: item["skuDescription"],
    systemOverrides: !item["systemOverrides"]
      ? item["systemOverrides"]
      : systemOverridesDeserializer(item["systemOverrides"]),
    resourceUri: item["resourceUri"],
    termDuration: item["termDuration"],
    termStartDate: !item["termStartDate"] ? item["termStartDate"] : new Date(item["termStartDate"]),
    termEndDate: !item["termEndDate"] ? item["termEndDate"] : new Date(item["termEndDate"]),
    provisioningTenantId: item["provisioningTenantId"],
    status: item["status"],
    operationStatus: item["operationStatus"],
    provisioningState: item["provisioningState"],
    subscriptionId: item["subscriptionId"],
    suspensionReasons: !item["suspensionReasons"]
      ? item["suspensionReasons"]
      : item["suspensionReasons"].map((p: any) => {
          return p;
        }),
    suspensionReasonDetails: !item["suspensionReasonDetails"]
      ? item["suspensionReasonDetails"]
      : billingSubscriptionStatusDetailsArrayDeserializer(item["suspensionReasonDetails"]),
    billingSubscriptionId: item["billingSubscriptionId"],
  };
}

export type BillingPermissionsCheckAccessByInvoiceSectionResponse = { body: CheckAccessResponse[] };

export type BillingPermissionsCheckAccessByEnrollmentAccountResponse = {
  body: CheckAccessResponse[];
};

export type BillingPermissionsCheckAccessByDepartmentResponse = { body: CheckAccessResponse[] };

export type BillingPermissionsCheckAccessByCustomerResponse = { body: CheckAccessResponse[] };

export type BillingPermissionsCheckAccessByBillingProfileResponse = { body: CheckAccessResponse[] };

export type BillingPermissionsCheckAccessByBillingAccountResponse = { body: CheckAccessResponse[] };
