// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Localized display information for and operation. */
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

/** An offer. */
export interface Offer extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: OfferProperties;
}

export function offerDeserializer(item: any): Offer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : offerPropertiesDeserializer(item["properties"]),
  };
}

/** The offer properties */
export interface OfferProperties {
  /** The content version */
  contentVersion?: string;
  /** The content url */
  contentUrl?: string;
  /** The offer content */
  offerContent: OfferContent;
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
  /** The marketplace skus */
  marketplaceSkus?: MarketplaceSku[];
}

export function offerPropertiesDeserializer(item: any): OfferProperties {
  return {
    contentVersion: item["contentVersion"],
    contentUrl: item["contentUrl"],
    offerContent: offerContentDeserializer(item["offerContent"]),
    provisioningState: item["provisioningState"],
    marketplaceSkus: !item["marketplaceSkus"]
      ? item["marketplaceSkus"]
      : marketplaceSkuArrayDeserializer(item["marketplaceSkus"]),
  };
}

/** The offer content */
export interface OfferContent {
  /** The display name of the offer */
  displayName: string;
  /** The summary */
  summary?: string;
  /** The long summary */
  longSummary?: string;
  /** The description */
  description?: string;
  /** The offer id */
  offerId: string;
  /** The offer type */
  offerType?: string;
  /** The support uri */
  supportUri?: string;
  /** The popularity of the offer */
  popularity?: number;
  /** The publisher of the offer */
  offerPublisher?: OfferPublisher;
  /** The availability of the offer */
  availability?: OfferAvailability;
  /** The release type of the offer */
  releaseType?: OfferReleaseType;
  /** The icon files */
  iconFileUris?: IconFileUris;
  /** The terms and conditions */
  termsAndConditions?: TermsAndConditions;
  /** The category ids */
  categoryIds?: string[];
  /** The operating systems */
  operatingSystems?: string[];
}

export function offerContentDeserializer(item: any): OfferContent {
  return {
    displayName: item["displayName"],
    summary: item["summary"],
    longSummary: item["longSummary"],
    description: item["description"],
    offerId: item["offerId"],
    offerType: item["offerType"],
    supportUri: item["supportUri"],
    popularity: item["popularity"],
    offerPublisher: !item["offerPublisher"]
      ? item["offerPublisher"]
      : offerPublisherDeserializer(item["offerPublisher"]),
    availability: item["availability"],
    releaseType: item["releaseType"],
    iconFileUris: !item["iconFileUris"]
      ? item["iconFileUris"]
      : iconFileUrisDeserializer(item["iconFileUris"]),
    termsAndConditions: !item["termsAndConditions"]
      ? item["termsAndConditions"]
      : termsAndConditionsDeserializer(item["termsAndConditions"]),
    categoryIds: !item["categoryIds"]
      ? item["categoryIds"]
      : item["categoryIds"].map((p: any) => {
          return p;
        }),
    operatingSystems: !item["operatingSystems"]
      ? item["operatingSystems"]
      : item["operatingSystems"].map((p: any) => {
          return p;
        }),
  };
}

/** The offer publisher */
export interface OfferPublisher {
  /** The publisher Id */
  publisherId: string;
  /** The publisher name */
  publisherDisplayName: string;
}

export function offerPublisherDeserializer(item: any): OfferPublisher {
  return {
    publisherId: item["publisherId"],
    publisherDisplayName: item["publisherDisplayName"],
  };
}

/** OfferAvailability Enum */
export enum KnownOfferAvailability {
  /** The offer availability is private */
  Private = "Private",
  /** The offer availability is public */
  Public = "Public",
}

/**
 * OfferAvailability Enum \
 * {@link KnownOfferAvailability} can be used interchangeably with OfferAvailability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Private**: The offer availability is private \
 * **Public**: The offer availability is public
 */
export type OfferAvailability = string;

/** Offer release type Enum */
export enum KnownOfferReleaseType {
  /** The offer in preview */
  Preview = "Preview",
  /** The offer in GA */
  GA = "GA",
}

/**
 * Offer release type Enum \
 * {@link KnownOfferReleaseType} can be used interchangeably with OfferReleaseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: The offer in preview \
 * **GA**: The offer in GA
 */
export type OfferReleaseType = string;

/** Icon files */
export interface IconFileUris {
  /** uri of small icon */
  small?: string;
  /** uri of medium icon */
  medium?: string;
  /** uri of wide icon */
  wide?: string;
  /** uri of large icon */
  large?: string;
}

export function iconFileUrisDeserializer(item: any): IconFileUris {
  return {
    small: item["small"],
    medium: item["medium"],
    wide: item["wide"],
    large: item["large"],
  };
}

/** Terms and conditions */
export interface TermsAndConditions {
  /** The legal terms and conditions uri */
  legalTermsUri?: string;
  /** The type of legal terms */
  legalTermsType?: string;
  /** The privacy policy uri */
  privacyPolicyUri?: string;
}

export function termsAndConditionsDeserializer(item: any): TermsAndConditions {
  return {
    legalTermsUri: item["legalTermsUri"],
    legalTermsType: item["legalTermsType"],
    privacyPolicyUri: item["privacyPolicyUri"],
  };
}

/** The provisioning state of a resource type. */
export enum KnownResourceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;

export function marketplaceSkuArrayDeserializer(result: Array<MarketplaceSku>): any[] {
  return result.map((item) => {
    return marketplaceSkuDeserializer(item);
  });
}

/** The marketplace sku */
export interface MarketplaceSku {
  /** The catalog plan id */
  catalogPlanId: string;
  /** The marketplace sku id */
  marketplaceSkuId: string;
  /** The type of marketplace sku */
  type?: string;
  /** The display name of marketplace sku */
  displayName?: string;
  /** The summary */
  summary?: string;
  /** The long summary */
  longSummary?: string;
  /** The description */
  description?: string;
  /** The generation */
  generation?: string;
  /** The display rank of the sku */
  displayRank?: number;
  /** The operating system supported */
  operatingSystem?: SkuOperatingSystem;
  /** The marketplace sku version */
  marketplaceSkuVersions?: MarketplaceSkuVersion[];
}

export function marketplaceSkuDeserializer(item: any): MarketplaceSku {
  return {
    catalogPlanId: item["catalogPlanId"],
    marketplaceSkuId: item["marketplaceSkuId"],
    type: item["type"],
    displayName: item["displayName"],
    summary: item["summary"],
    longSummary: item["longSummary"],
    description: item["description"],
    generation: item["generation"],
    displayRank: item["displayRank"],
    operatingSystem: !item["operatingSystem"]
      ? item["operatingSystem"]
      : skuOperatingSystemDeserializer(item["operatingSystem"]),
    marketplaceSkuVersions: !item["marketplaceSkuVersions"]
      ? item["marketplaceSkuVersions"]
      : marketplaceSkuVersionArrayDeserializer(item["marketplaceSkuVersions"]),
  };
}

/** The sku operating system */
export interface SkuOperatingSystem {
  /** The family of the operating system */
  family?: string;
  /** The type of the operating system */
  type?: string;
  /** The name of the operating system */
  name: string;
}

export function skuOperatingSystemDeserializer(item: any): SkuOperatingSystem {
  return {
    family: item["family"],
    type: item["type"],
    name: item["name"],
  };
}

export function marketplaceSkuVersionArrayDeserializer(
  result: Array<MarketplaceSkuVersion>,
): any[] {
  return result.map((item) => {
    return marketplaceSkuVersionDeserializer(item);
  });
}

/** The marketplace sku version */
export interface MarketplaceSkuVersion {
  /** The name of sku version */
  name: string;
  /** The size of the image */
  sizeOnDiskInMb?: number;
  /** The size of the download */
  minimumDownloadSizeInMb?: number;
  /** The stage name */
  stageName?: string;
  /** The launch type */
  launchType?: OfferLaunchType;
}

export function marketplaceSkuVersionDeserializer(item: any): MarketplaceSkuVersion {
  return {
    name: item["name"],
    sizeOnDiskInMb: item["sizeOnDiskInMb"],
    minimumDownloadSizeInMb: item["minimumDownloadSizeInMb"],
    stageName: item["stageName"],
    launchType: item["launchType"],
  };
}

/** Offer launch type Enum */
export enum KnownOfferLaunchType {
  /** The offer has been certified */
  Trusted = "Trusted",
  /** The offer has not been certified */
  Unknown = "Unknown",
}

/**
 * Offer launch type Enum \
 * {@link KnownOfferLaunchType} can be used interchangeably with OfferLaunchType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Trusted**: The offer has been certified \
 * **Unknown**: The offer has not been certified
 */
export type OfferLaunchType = string;

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceDeserializer(item: any): ExtensionResource {
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

/** The response of a Offer list operation. */
export interface _OfferListResult {
  /** The Offer items on this page */
  value: Offer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _offerListResultDeserializer(item: any): _OfferListResult {
  return {
    value: offerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function offerArrayDeserializer(result: Array<Offer>): any[] {
  return result.map((item) => {
    return offerDeserializer(item);
  });
}

/** Access token request object */
export interface AccessTokenRequest {
  /** The name of the publisher. */
  publisherName?: string;
  /** The region where the disk will be created. */
  edgeMarketPlaceRegion: string;
  /** The region where the disk will be created. */
  egeMarketPlaceResourceId?: string;
  /** The hyperv version. */
  hypervGeneration?: string;
  /** The marketplace sku. */
  marketPlaceSku?: string;
  /** The marketplace sku version. */
  marketPlaceSkuVersion?: string;
  /** The device sku. */
  deviceSku?: string;
  /** The device sku version. */
  deviceVersion?: string;
}

export function accessTokenRequestSerializer(item: AccessTokenRequest): any {
  return {
    publisherName: item["publisherName"],
    edgeMarketPlaceRegion: item["edgeMarketPlaceRegion"],
    egeMarketPlaceResourceId: item["egeMarketPlaceResourceId"],
    hypervGeneration: item["hypervGeneration"],
    marketPlaceSku: item["marketPlaceSku"],
    marketPlaceSkuVersion: item["marketPlaceSkuVersion"],
    deviceSku: item["deviceSku"],
    deviceVersion: item["deviceVersion"],
  };
}

/** The disk access token */
export interface DiskAccessToken {
  /** The disk id. */
  diskId?: string;
  /** The access token creation status. */
  status?: string;
  /** The access token. */
  accessToken: string;
}

export function diskAccessTokenDeserializer(item: any): DiskAccessToken {
  return {
    diskId: item["diskId"],
    status: item["status"],
    accessToken: item["accessToken"],
  };
}

/** Access token request object */
export interface AccessTokenReadRequest {
  /** The name of the publisher. */
  requestId: string;
}

export function accessTokenReadRequestSerializer(item: AccessTokenReadRequest): any {
  return { requestId: item["requestId"] };
}

/** A publisher who provides offers. */
export interface Publisher extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: PublisherProperties;
}

export function publisherDeserializer(item: any): Publisher {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : publisherPropertiesDeserializer(item["properties"]),
  };
}

/** Publisher properties */
export interface PublisherProperties {
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
}

export function publisherPropertiesDeserializer(item: any): PublisherProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The response of a Publisher list operation. */
export interface _PublisherListResult {
  /** The Publisher items on this page */
  value: Publisher[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _publisherListResultDeserializer(item: any): _PublisherListResult {
  return {
    value: publisherArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function publisherArrayDeserializer(result: Array<Publisher>): any[] {
  return result.map((item) => {
    return publisherDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** Version 2024-10-01 */
  V20241001 = "2024-10-01",
  /** Version 2025-10-01-preview */
  V20251001Preview = "2025-10-01-preview",
}
