// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Pure Storage cloud service resource type, also called reservation */
export interface Reservation extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ReservationPropertiesBaseResourceProperties;
}

export function reservationSerializer(item: Reservation): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : reservationPropertiesBaseResourcePropertiesSerializer(item["properties"]),
  };
}

export function reservationDeserializer(item: any): Reservation {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : reservationPropertiesBaseResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a Reservation resource. */
export interface ReservationPropertiesBaseResourceProperties {
  /** Pure Storage's internal ID for the reservation */
  readonly reservationInternalId?: string;
  /** Marketplace details */
  marketplace: MarketplaceDetails;
  /** User details */
  user: UserDetails;
  /** Provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function reservationPropertiesBaseResourcePropertiesSerializer(
  item: ReservationPropertiesBaseResourceProperties,
): any {
  return {
    marketplace: marketplaceDetailsSerializer(item["marketplace"]),
    user: userDetailsSerializer(item["user"]),
  };
}

export function reservationPropertiesBaseResourcePropertiesDeserializer(
  item: any,
): ReservationPropertiesBaseResourceProperties {
  return {
    reservationInternalId: item["reservationInternalId"],
    marketplace: marketplaceDetailsDeserializer(item["marketplace"]),
    user: userDetailsDeserializer(item["user"]),
    provisioningState: item["provisioningState"],
  };
}

/** Marketplace details */
export interface MarketplaceDetails {
  /** Marketplace subscription ID */
  readonly subscriptionId?: string;
  /** Marketplace subscription status */
  subscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Offer details of the marketplace subscription */
  offerDetails: OfferDetails;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    offerDetails: offerDetailsSerializer(item["offerDetails"]),
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    subscriptionId: item["subscriptionId"],
    subscriptionStatus: item["subscriptionStatus"],
    offerDetails: offerDetailsDeserializer(item["offerDetails"]),
  };
}

/** Marketplace subscription status */
export enum KnownMarketplaceSubscriptionStatus {
  /** Marketplace subscription purchased but not yet activated */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** Marketplace subscription activated */
  Subscribed = "Subscribed",
  /** Marketplace subscription suspended due to missing customer payment */
  Suspended = "Suspended",
  /** Marketplace subscription cancelled */
  Unsubscribed = "Unsubscribed",
}

/**
 * Marketplace subscription status \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Marketplace subscription purchased but not yet activated \
 * **Subscribed**: Marketplace subscription activated \
 * **Suspended**: Marketplace subscription suspended due to missing customer payment \
 * **Unsubscribed**: Marketplace subscription cancelled
 */
export type MarketplaceSubscriptionStatus = string;

/** Offer details for the marketplace that is selected by the user */
export interface OfferDetails {
  /** Publisher ID for the marketplace offer */
  publisherId: string;
  /** Offer ID for the marketplace offer */
  offerId: string;
  /** Plan ID for the marketplace offer */
  planId: string;
  /** Plan Name for the marketplace offer */
  planName?: string;
  /** Term Unit for the marketplace offer */
  termUnit?: string;
  /** Term ID for the marketplace offer */
  termId?: string;
}

export function offerDetailsSerializer(item: OfferDetails): any {
  return {
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
  };
}

export function offerDetailsDeserializer(item: any): OfferDetails {
  return {
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
  };
}

/** User details */
export interface UserDetails {
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Email address */
  emailAddress: string;
  /** Principal name */
  upn?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Company details */
  companyDetails?: CompanyDetails;
}

export function userDetailsSerializer(item: UserDetails): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsSerializer(item["companyDetails"]),
  };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsDeserializer(item["companyDetails"]),
  };
}

/** Company details */
export interface CompanyDetails {
  /** Company name */
  companyName: string;
  /** Company address */
  address?: Address;
}

export function companyDetailsSerializer(item: CompanyDetails): any {
  return {
    companyName: item["companyName"],
    address: !item["address"] ? item["address"] : addressSerializer(item["address"]),
  };
}

export function companyDetailsDeserializer(item: any): CompanyDetails {
  return {
    companyName: item["companyName"],
    address: !item["address"] ? item["address"] : addressDeserializer(item["address"]),
  };
}

/** Address details */
export interface Address {
  /** Address line 1 */
  addressLine1: string;
  /** Address line 2 */
  addressLine2?: string;
  /** Name of the city */
  city: string;
  /** State (if any) */
  state: string;
  /** Name of the country */
  country: string;
  /** Postal code */
  postalCode: string;
}

export function addressSerializer(item: Address): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    city: item["city"],
    state: item["state"],
    country: item["country"],
    postalCode: item["postalCode"],
  };
}

export function addressDeserializer(item: any): Address {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    city: item["city"],
    state: item["state"],
    country: item["country"],
    postalCode: item["postalCode"],
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Deletion in progress */
  Deleting = "Deleting",
  /** Change accepted for processing */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Deleting**: Deletion in progress \
 * **Accepted**: Change accepted for processing
 */
export type ProvisioningState = string;

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
    tags: item["tags"],
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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

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

/** The type used for update operations of the Reservation. */
export interface ReservationUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: ReservationUpdateProperties;
}

export function reservationUpdateSerializer(item: ReservationUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : reservationUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Reservation. */
export interface ReservationUpdateProperties {
  /** User details */
  user?: UserDetails;
}

export function reservationUpdatePropertiesSerializer(item: ReservationUpdateProperties): any {
  return {
    user: !item["user"] ? item["user"] : userDetailsSerializer(item["user"]),
  };
}

/** The response of a Reservation list operation. */
export interface _ReservationListResult {
  /** The Reservation items on this page */
  value: Reservation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _reservationListResultDeserializer(item: any): _ReservationListResult {
  return {
    value: reservationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function reservationArraySerializer(result: Array<Reservation>): any[] {
  return result.map((item) => {
    return reservationSerializer(item);
  });
}

export function reservationArrayDeserializer(result: Array<Reservation>): any[] {
  return result.map((item) => {
    return reservationDeserializer(item);
  });
}

/** Limits constraining certain resource properties */
export interface LimitDetails {
  /** Limits used for storage pool resources */
  storagePool: StoragePoolLimits;
  /** Limits used for volume resources */
  volume: VolumeLimits;
  /** internal */
  protectionPolicy: ProtectionPolicyLimits;
  /** internal */
  performancePolicy: PerformancePolicyLimits;
}

export function limitDetailsDeserializer(item: any): LimitDetails {
  return {
    storagePool: storagePoolLimitsDeserializer(item["storagePool"]),
    volume: volumeLimitsDeserializer(item["volume"]),
    protectionPolicy: protectionPolicyLimitsDeserializer(item["protectionPolicy"]),
    performancePolicy: performancePolicyLimitsDeserializer(item["performancePolicy"]),
  };
}

/** Limits used for storage pool creation */
export interface StoragePoolLimits {
  /** Allowed provisioned bandwidth range for a storage pool, in MB/s */
  provisionedBandwidthMbPerSec: RangeLimits;
  /** Allowed provisioned IOPS range for a storage pool, as a number of operations */
  provisionedIops: RangeLimits;
  /** List of physical availability zones in the region in which storage pools can be deployed; some Azure regions do not support the necessary resources in all availability zones */
  physicalAvailabilityZones: string[];
}

export function storagePoolLimitsDeserializer(item: any): StoragePoolLimits {
  return {
    provisionedBandwidthMbPerSec: rangeLimitsDeserializer(item["provisionedBandwidthMbPerSec"]),
    provisionedIops: rangeLimitsDeserializer(item["provisionedIops"]),
    physicalAvailabilityZones: item["physicalAvailabilityZones"].map((p: any) => {
      return p;
    }),
  };
}

/** Minimum and maximum values for a property */
export interface RangeLimits {
  /** Minimum value of the property */
  min: number;
  /** Maximum value of the property */
  max: number;
}

export function rangeLimitsDeserializer(item: any): RangeLimits {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** Limits used for volumes */
export interface VolumeLimits {
  /** Provisioned size limits for a volume, in bytes */
  provisionedSize: RangeLimits;
}

export function volumeLimitsDeserializer(item: any): VolumeLimits {
  return {
    provisionedSize: rangeLimitsDeserializer(item["provisionedSize"]),
  };
}

/** internal */
export interface ProtectionPolicyLimits {
  /** internal */
  frequency: RangeLimits;
  /** internal */
  retention: RangeLimits;
}

export function protectionPolicyLimitsDeserializer(item: any): ProtectionPolicyLimits {
  return {
    frequency: rangeLimitsDeserializer(item["frequency"]),
    retention: rangeLimitsDeserializer(item["retention"]),
  };
}

/** internal */
export interface PerformancePolicyLimits {
  /** internal */
  iopsLimit: RangeLimits;
  /** internal */
  bandwidthLimit: RangeLimits;
}

export function performancePolicyLimitsDeserializer(item: any): PerformancePolicyLimits {
  return {
    iopsLimit: rangeLimitsDeserializer(item["iopsLimit"]),
    bandwidthLimit: rangeLimitsDeserializer(item["bandwidthLimit"]),
  };
}

/** Latest billing status for this reservation */
export interface ReservationBillingStatus {
  /** Timestamp for the latest update of this billing status, in RFC 3339 format */
  timestamp: string;
  /** Total used capacity as reported by associated storage pools. In bytes */
  totalUsedCapacityReported: number;
  /** How many associated storage pools reported low data reduction ratio (DRR) */
  lowDrrPoolCount: number;
  /** Weighted average of the data-reduction ratio for all associated pools */
  drrWeightedAverage: number;
  /** The sum of total used capacity for all pools with low DRR, if the DRR penalty applies. In bytes */
  totalNonReducibleReported: number;
  /** Extra capacity added because of low DRR storage pools; In bytes */
  extraUsedCapacityNonReducible: number;
  /** Extra capacity added when rounding up low-usage pools to 30TiB. In bytes */
  extraUsedCapacityLowUsageRounding: number;
  /** Extra capacity discounted due to plan forgiving some low-DRR usage. In bytes */
  extraUsedCapacityNonReduciblePlanDiscount: number;
  /** Total used capacity actually billed. In bytes */
  totalUsedCapacityBilled: number;
  /** Total used capacity included in plan. In bytes */
  totalUsedCapacityIncludedPlan: number;
  /** Total used capacity reported at on-demand price. In bytes */
  totalUsedCapacityOverage: number;
  /** The sum of all performance settings across the pools under this reservation. In MB per second */
  totalPerformanceReported: number;
  /** Total performance amount included in plan. In bytes per second */
  totalPerformanceIncludedPlan: number;
  /** Total performance amount reported at on-demand price. In MB per second */
  totalPerformanceOverage: number;
}

export function reservationBillingStatusDeserializer(item: any): ReservationBillingStatus {
  return {
    timestamp: item["timestamp"],
    totalUsedCapacityReported: item["totalUsedCapacityReported"],
    lowDrrPoolCount: item["lowDrrPoolCount"],
    drrWeightedAverage: item["drrWeightedAverage"],
    totalNonReducibleReported: item["totalNonReducibleReported"],
    extraUsedCapacityNonReducible: item["extraUsedCapacityNonReducible"],
    extraUsedCapacityLowUsageRounding: item["extraUsedCapacityLowUsageRounding"],
    extraUsedCapacityNonReduciblePlanDiscount: item["extraUsedCapacityNonReduciblePlanDiscount"],
    totalUsedCapacityBilled: item["totalUsedCapacityBilled"],
    totalUsedCapacityIncludedPlan: item["totalUsedCapacityIncludedPlan"],
    totalUsedCapacityOverage: item["totalUsedCapacityOverage"],
    totalPerformanceReported: item["totalPerformanceReported"],
    totalPerformanceIncludedPlan: item["totalPerformanceIncludedPlan"],
    totalPerformanceOverage: item["totalPerformanceOverage"],
  };
}

/** Represents a billing usage report, including overall status and detailed properties */
export interface ReservationBillingUsageReport {
  /** Latest formatted billing report for this reservation */
  timestamp: string;
  /** A list of detailed billing usage properties */
  billingUsageProperties: BillingUsageProperty[];
  /** Overall status message of the billing usage report */
  overallStatusMessage: string;
}

export function reservationBillingUsageReportDeserializer(
  item: any,
): ReservationBillingUsageReport {
  return {
    timestamp: item["timestamp"],
    billingUsageProperties: billingUsagePropertyArrayDeserializer(item["billingUsageProperties"]),
    overallStatusMessage: item["overallStatusMessage"],
  };
}

export function billingUsagePropertyArrayDeserializer(result: Array<BillingUsageProperty>): any[] {
  return result.map((item) => {
    return billingUsagePropertyDeserializer(item);
  });
}

/** Represents an individual billing usage property */
export interface BillingUsageProperty {
  /** Unique identifier for the billing usage property */
  propertyId: string;
  /** Name of the billing usage property */
  propertyName: string;
  /** Current value of the billing usage property */
  currentValue: string;
  /** Previous value of the billing usage property */
  previousValue?: string;
  /** Severity level of the usage */
  severity: UsageSeverity;
  /** Status message for the billing usage against a property */
  statusMessage?: string;
  /** Optional list of sub-properties providing additional details */
  subProperties?: BillingUsageProperty[];
}

export function billingUsagePropertyDeserializer(item: any): BillingUsageProperty {
  return {
    propertyId: item["propertyId"],
    propertyName: item["propertyName"],
    currentValue: item["currentValue"],
    previousValue: item["previousValue"],
    severity: item["severity"],
    statusMessage: item["statusMessage"],
    subProperties: !item["subProperties"]
      ? item["subProperties"]
      : billingUsagePropertyArrayDeserializer(item["subProperties"]),
  };
}

/** Severity levels for billing usage properties */
export enum KnownUsageSeverity {
  /** Indicates an alert condition */
  Alert = "alert",
  /** Provides informational details */
  Information = "information",
  /** Indicates a warning condition */
  Warning = "warning",
  /** Indicates no severity */
  None = "none",
}

/**
 * Severity levels for billing usage properties \
 * {@link KnownUsageSeverity} can be used interchangeably with UsageSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **alert**: Indicates an alert condition \
 * **information**: Provides informational details \
 * **warning**: Indicates a warning condition \
 * **none**: Indicates no severity
 */
export type UsageSeverity = string;

/** Storage pool resource */
export interface StoragePool extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StoragePoolProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function storagePoolSerializer(item: StoragePool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storagePoolPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function storagePoolDeserializer(item: any): StoragePool {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : storagePoolPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of a storage pool */
export interface StoragePoolProperties {
  /** Pure Storage's internal ID of the storage pool */
  readonly storagePoolInternalId?: string;
  /** Azure Availability Zone the Pool is located in */
  availabilityZone: string;
  /** Network properties of the storage pool */
  vnetInjection: VnetInjection;
  /** How long a destroyed object is kept before being eradicated, in seconds */
  readonly dataRetentionPeriod?: number;
  /** Total bandwidth provisioned for the pool, in MB/s */
  provisionedBandwidthMbPerSec: number;
  /** Total I/O operations per second (IOPS) provisioned for the pool */
  readonly provisionedIops?: number;
  /** AVS connection state summary */
  readonly avs?: AzureVmwareService;
  /** Provisioning state of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Azure resource ID of the Pure Storage Cloud service (reservation resource) this storage pool belongs to */
  reservationResourceId: string;
}

export function storagePoolPropertiesSerializer(item: StoragePoolProperties): any {
  return {
    availabilityZone: item["availabilityZone"],
    vnetInjection: vnetInjectionSerializer(item["vnetInjection"]),
    provisionedBandwidthMbPerSec: item["provisionedBandwidthMbPerSec"],
    reservationResourceId: item["reservationResourceId"],
  };
}

export function storagePoolPropertiesDeserializer(item: any): StoragePoolProperties {
  return {
    storagePoolInternalId: item["storagePoolInternalId"],
    availabilityZone: item["availabilityZone"],
    vnetInjection: vnetInjectionDeserializer(item["vnetInjection"]),
    dataRetentionPeriod: item["dataRetentionPeriod"],
    provisionedBandwidthMbPerSec: item["provisionedBandwidthMbPerSec"],
    provisionedIops: item["provisionedIops"],
    avs: !item["avs"] ? item["avs"] : azureVmwareServiceDeserializer(item["avs"]),
    provisioningState: item["provisioningState"],
    reservationResourceId: item["reservationResourceId"],
  };
}

/** Network in which the storage pool will be made available */
export interface VnetInjection {
  /** Azure resource ID of the Virtual Network subnet where the storage pool will be connected */
  subnetId: string;
  /** Azure resource ID of the Virtual Network in which the subnet is located */
  vnetId: string;
}

export function vnetInjectionSerializer(item: VnetInjection): any {
  return { subnetId: item["subnetId"], vnetId: item["vnetId"] };
}

export function vnetInjectionDeserializer(item: any): VnetInjection {
  return {
    subnetId: item["subnetId"],
    vnetId: item["vnetId"],
  };
}

/** Connected AVS status */
export interface AzureVmwareService {
  /** If true, an AVS SDDC is successfully connected to the storage pool */
  avsEnabled: boolean;
  /** Azure resource ID of the AVS SDDC the storage pool is connected to */
  clusterResourceId?: string;
}

export function azureVmwareServiceDeserializer(item: any): AzureVmwareService {
  return {
    avsEnabled: item["avsEnabled"],
    clusterResourceId: item["sddcResourceId"],
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The type used for update operations of the StoragePool. */
export interface StoragePoolUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: StoragePoolUpdateProperties;
}

export function storagePoolUpdateSerializer(item: StoragePoolUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : storagePoolUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the StoragePool. */
export interface StoragePoolUpdateProperties {
  /** Total bandwidth provisioned for the pool, in MB/s */
  provisionedBandwidthMbPerSec?: number;
}

export function storagePoolUpdatePropertiesSerializer(item: StoragePoolUpdateProperties): any {
  return { provisionedBandwidthMbPerSec: item["provisionedBandwidthMbPerSec"] };
}

/** The response of a StoragePool list operation. */
export interface _StoragePoolListResult {
  /** The StoragePool items on this page */
  value: StoragePool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storagePoolListResultDeserializer(item: any): _StoragePoolListResult {
  return {
    value: storagePoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storagePoolArraySerializer(result: Array<StoragePool>): any[] {
  return result.map((item) => {
    return storagePoolSerializer(item);
  });
}

export function storagePoolArrayDeserializer(result: Array<StoragePool>): any[] {
  return result.map((item) => {
    return storagePoolDeserializer(item);
  });
}

/** Health information for a storage pool */
export interface StoragePoolHealthInfo {
  /** Health metrics */
  health: HealthDetails;
  /** List of health alerts */
  alerts: Alert[];
}

export function storagePoolHealthInfoDeserializer(item: any): StoragePoolHealthInfo {
  return {
    health: healthDetailsDeserializer(item["health"]),
    alerts: alertArrayDeserializer(item["alerts"]),
  };
}

/** Health metrics for a storage pool */
export interface HealthDetails {
  /** How full the pool is right now, in %, compared to the maximum size it can grow to; estimated based on current usage and data reduction ratio */
  usedCapacityPercentage: number;
  /** Bandwidth usage metrics */
  bandwidthUsage: BandwidthUsage;
  /** IOPS usage metrics */
  iopsUsage: IopsUsage;
  /** Storage space usage */
  space: Space;
  /** Data reduction ratio achieved on this pool */
  dataReductionRatio: number;
  /** Estimated maximum capacity of the pool, in bytes, based on current usage and data reduction ratio */
  estimatedMaxCapacity: number;
}

export function healthDetailsDeserializer(item: any): HealthDetails {
  return {
    usedCapacityPercentage: item["usedCapacityPercentage"],
    bandwidthUsage: bandwidthUsageDeserializer(item["bandwidthUsage"]),
    iopsUsage: iopsUsageDeserializer(item["iopsUsage"]),
    space: spaceDeserializer(item["space"]),
    dataReductionRatio: item["dataReductionRatio"],
    estimatedMaxCapacity: item["estimatedMaxCapacity"],
  };
}

/** Bandwidth usage metrics */
export interface BandwidthUsage {
  /** Number of bytes written and read per second (maximum value over the last 10 minutes) */
  current: number;
  /** Bandwidth value currently provisioned for the storage pool, in MB/s */
  provisioned: number;
  /** Maximum bandwidth value that can be provisioned for the storage pool */
  max: number;
}

export function bandwidthUsageDeserializer(item: any): BandwidthUsage {
  return {
    current: item["current"],
    provisioned: item["provisioned"],
    max: item["max"],
  };
}

/** IOPS usage metrics */
export interface IopsUsage {
  /** Current number of IOPS (maximum value over the last 10 minutes) */
  current: number;
  /** IOPS value currently provisioned for the storage pool */
  provisioned: number;
  /** Maximum IOPS value that can be provisioned for the storage pool */
  max: number;
}

export function iopsUsageDeserializer(item: any): IopsUsage {
  return {
    current: item["current"],
    provisioned: item["provisioned"],
    max: item["max"],
  };
}

/** Storage space usage */
export interface Space {
  /** Total space occupied by customer data (i.e., being billed for), in bytes */
  totalUsed: number;
  /** Unique space occupied by customer data, in bytes; for a volume, this is the amount of storage that would be freed by deleting the volume, since snapshot and shared data would be kept */
  unique: number;
  /** Space occupied by data unique to one or more snapshots, in bytes */
  snapshots: number;
  /** Space occupied by duplicated data, meaning data shared with other volumes and snapshots as a result of data deduplication, in bytes */
  shared: number;
}

export function spaceDeserializer(item: any): Space {
  return {
    totalUsed: item["totalUsed"],
    unique: item["unique"],
    snapshots: item["snapshots"],
    shared: item["shared"],
  };
}

export function alertArrayDeserializer(result: Array<Alert>): any[] {
  return result.map((item) => {
    return alertDeserializer(item);
  });
}

/** Health alerts */
export interface Alert {
  /** Severity level */
  level: AlertLevel;
  /** A short description of the alert */
  message: string;
}

export function alertDeserializer(item: any): Alert {
  return {
    level: item["level"],
    message: item["message"],
  };
}

/** Severity level of the alert */
export enum KnownAlertLevel {
  /** Information level */
  Info = "info",
  /** Warning level */
  Warning = "warning",
  /** Error level */
  Error = "error",
}

/**
 * Severity level of the alert \
 * {@link KnownAlertLevel} can be used interchangeably with AlertLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **info**: Information level \
 * **warning**: Warning level \
 * **error**: Error level
 */
export type AlertLevel = string;

/** Transient information about an on-going connection to an AVS instance */
export interface AvsConnection {
  /** Indicates whether service initialization is complete */
  serviceInitializationCompleted: boolean;
  /** Encoded service account credentials alongside connection information */
  serviceInitializationHandleEnc?: string;
  /** Explicit service account credentials */
  serviceInitializationHandle?: ServiceInitializationHandle;
}

export function avsConnectionDeserializer(item: any): AvsConnection {
  return {
    serviceInitializationCompleted: item["serviceInitializationCompleted"],
    serviceInitializationHandleEnc: item["serviceInitializationHandleEnc"],
    serviceInitializationHandle: !item["serviceInitializationHandle"]
      ? item["serviceInitializationHandle"]
      : serviceInitializationHandleDeserializer(item["serviceInitializationHandle"]),
  };
}

/** Initialization handle used to configure the AVS SDDC to communicate with the storage pool */
export interface ServiceInitializationHandle {
  /** Azure resource ID of the AVS SDDC the pool is connecting to */
  clusterResourceId?: string;
  /** Requested service account username */
  serviceAccountUsername?: string;
}

export function serviceInitializationHandleDeserializer(item: any): ServiceInitializationHandle {
  return {
    clusterResourceId: item["sddcResourceId"],
    serviceAccountUsername: item["serviceAccountUsername"],
  };
}

/** Status of storage pool / AVS connection */
export interface AvsStatus {
  /** If true, an AVS connection has been successfully completed */
  avsEnabled: boolean;
  /** Human-readable current AVS connection status */
  currentConnectionStatus: string;
  /** Azure resource ID of the AVS SDDC the pool is connected to */
  clusterResourceId?: string;
}

export function avsStatusDeserializer(item: any): AvsStatus {
  return {
    avsEnabled: item["avsEnabled"],
    currentConnectionStatus: item["currentConnectionStatus"],
    clusterResourceId: item["sddcResourceId"],
  };
}

/** EnableAvsConnection payload information */
export interface StoragePoolEnableAvsConnectionPost {
  /** Azure resource ID of the AVS SDDC to connect to */
  clusterResourceId: string;
}

export function storagePoolEnableAvsConnectionPostSerializer(
  item: StoragePoolEnableAvsConnectionPost,
): any {
  return { sddcResourceId: item["clusterResourceId"] };
}

/** FinalizeAvsConnection payload information, either encoded or explicit */
export interface StoragePoolFinalizeAvsConnectionPost {
  /** Encoded AVS connection information */
  serviceInitializationDataEnc?: string;
  /** Explicit AVS connection information */
  serviceInitializationData?: ServiceInitializationInfo;
}

export function storagePoolFinalizeAvsConnectionPostSerializer(
  item: StoragePoolFinalizeAvsConnectionPost,
): any {
  return {
    serviceInitializationDataEnc: item["serviceInitializationDataEnc"],
    serviceInitializationData: !item["serviceInitializationData"]
      ? item["serviceInitializationData"]
      : serviceInitializationInfoSerializer(item["serviceInitializationData"]),
  };
}

/** Explicit service initialization data */
export interface ServiceInitializationInfo {
  /** Service account username */
  serviceAccountUsername?: string;
  /** Service account password */
  serviceAccountPassword?: string;
  /** AVS instance's vSphere IP address */
  vSphereIp?: string;
  /** AVS instance's vSphere certificate */
  vSphereCertificate?: string;
}

export function serviceInitializationInfoSerializer(item: ServiceInitializationInfo): any {
  return {
    serviceAccountUsername: item["serviceAccountUsername"],
    serviceAccountPassword: item["serviceAccountPassword"],
    vSphereIp: item["vSphereIp"],
    vSphereCertificate: item["vSphereCertificate"],
  };
}

/** AVS storage container resource type, representing a VMware storage container in a storage pool, which can be associated to and mounted as a datastore */
export interface AvsStorageContainer extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AvsStorageContainerProperties;
}

export function avsStorageContainerDeserializer(item: any): AvsStorageContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : avsStorageContainerPropertiesDeserializer(item["properties"]),
  };
}

/** AVS storage container properties */
export interface AvsStorageContainerProperties {
  /** Storage space usage */
  readonly space?: Space;
  /** Name of the storage container */
  readonly resourceName: string;
  /** Maximum amount of bytes that can be provisioned in this storage container; it must be a multiple of 512; each time a volume is provisioned in this container, its provisionedSize will be counted against the provisionLimit and the provisioning will fail if it goes over (minimum: 1048576 (1MiB), maximum: 4503599627370496 (4PiB)); by default it is unrestricted */
  provisionedLimit?: number;
  /** VMware datastore associated with this storage container (if any) */
  readonly datastore?: string;
  /** Whether the datastore is mounted in VMware or not */
  readonly mounted?: boolean;
}

export function avsStorageContainerPropertiesDeserializer(
  item: any,
): AvsStorageContainerProperties {
  return {
    space: !item["space"] ? item["space"] : spaceDeserializer(item["space"]),
    resourceName: item["resourceName"],
    provisionedLimit: item["provisionedLimit"],
    datastore: item["datastore"],
    mounted: item["mounted"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** The response of a AvsStorageContainer list operation. */
export interface _AvsStorageContainerListResult {
  /** The AvsStorageContainer items on this page */
  value: AvsStorageContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _avsStorageContainerListResultDeserializer(
  item: any,
): _AvsStorageContainerListResult {
  return {
    value: avsStorageContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function avsStorageContainerArrayDeserializer(result: Array<AvsStorageContainer>): any[] {
  return result.map((item) => {
    return avsStorageContainerDeserializer(item);
  });
}

/** The type used for update operations of the AvsStorageContainerVolume. */
export interface AvsStorageContainerVolumeUpdate {
  /** The resource-specific properties for this resource. */
  properties?: AvsStorageContainerVolumeUpdateProperties;
}

export function avsStorageContainerVolumeUpdateSerializer(
  item: AvsStorageContainerVolumeUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : avsStorageContainerVolumeUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AvsStorageContainerVolume. */
export interface AvsStorageContainerVolumeUpdateProperties {
  /** Volume's soft-deletion state */
  softDeletion?: SoftDeletion;
}

export function avsStorageContainerVolumeUpdatePropertiesSerializer(
  item: AvsStorageContainerVolumeUpdateProperties,
): any {
  return {
    softDeletion: !item["softDeletion"]
      ? item["softDeletion"]
      : softDeletionSerializer(item["softDeletion"]),
  };
}

/** Soft-deletion state */
export interface SoftDeletion {
  /** If false, the resource is active; if true, the resource has been destroyed; resources can be soft-deleted by setting destroyed to true, and recovered by setting it to false */
  destroyed: boolean;
  /** Date at which the resource will be eradicated and impossible to recover, as an RFC 3339 timestamp; invalid if destroyed is false; */
  readonly eradicationTimestamp?: string;
}

export function softDeletionSerializer(item: SoftDeletion): any {
  return { destroyed: item["destroyed"] };
}

export function softDeletionDeserializer(item: any): SoftDeletion {
  return {
    destroyed: item["destroyed"],
    eradicationTimestamp: item["eradicationTimestamp"],
  };
}

/** A volume contained in an AVS storage container */
export interface AvsStorageContainerVolume extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: VolumeProperties;
}

export function avsStorageContainerVolumeDeserializer(item: any): AvsStorageContainerVolume {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : volumePropertiesDeserializer(item["properties"]),
  };
}

/** Volume properties */
export interface VolumeProperties {
  /** Pure Storage's internal ID for the storage pool containing the volume */
  readonly storagePoolInternalId?: string;
  /** Azure Resource ID of the storage pool containing this volume */
  readonly storagePoolResourceId?: string;
  /** Pure Storage's internal ID for the volume */
  readonly volumeInternalId?: string;
  /** Human-readable name of the volume */
  readonly displayName?: string;
  /** Storage space usage */
  readonly space?: Space;
  /** Volume's soft-deletion state */
  softDeletion: SoftDeletion;
  /** Volume creation date, as an RFC 3339 timestamp */
  readonly createdTimestamp?: string;
  /** Currently provisioned size of the volume, in bytes */
  readonly provisionedSize?: number;
  /** Specify which control plane handles the lifecycle of the volume */
  readonly volumeType?: VolumeType;
  /** AVS-specific volume information */
  readonly avs?: AvsDiskDetails;
  /** Provisioning state of the resource */
  readonly provisioningState?: ResourceProvisioningState;
}

export function volumePropertiesDeserializer(item: any): VolumeProperties {
  return {
    storagePoolInternalId: item["storagePoolInternalId"],
    storagePoolResourceId: item["storagePoolResourceId"],
    volumeInternalId: item["volumeInternalId"],
    displayName: item["displayName"],
    space: !item["space"] ? item["space"] : spaceDeserializer(item["space"]),
    softDeletion: softDeletionDeserializer(item["softDeletion"]),
    createdTimestamp: item["createdTimestamp"],
    provisionedSize: item["provisionedSize"],
    volumeType: item["volumeType"],
    avs: !item["avs"] ? item["avs"] : avsDiskDetailsDeserializer(item["avs"]),
    provisioningState: item["provisioningState"],
  };
}

/** Specify which control plane handles the lifecycle of the volume */
export enum KnownVolumeType {
  /** AVS/VMware */
  AVS = "avs",
}

/**
 * Specify which control plane handles the lifecycle of the volume \
 * {@link KnownVolumeType} can be used interchangeably with VolumeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **avs**: AVS\/VMware
 */
export type VolumeType = string;

/** AVS disk/volume information */
export interface AvsDiskDetails {
  /** VMware ID of the disk/volume */
  diskId: string;
  /** VMware name of the disk/volume */
  diskName: string;
  /** Name of the top-level folder in the datastore that contains the disk/volume */
  folder: string;
  /** VMware ID assigned to the disk/volume */
  avsVmInternalId: string;
  /** Azure resource ID of the AVS VM connected to this disk/volume */
  avsVmResourceId: string;
  /** Name of the AVS VM connected to this disk/volume */
  avsVmName: string;
  /** Azure resource ID of the AVS storage container containing this disk/volume */
  avsStorageContainerResourceId: string;
}

export function avsDiskDetailsDeserializer(item: any): AvsDiskDetails {
  return {
    diskId: item["diskId"],
    diskName: item["diskName"],
    folder: item["folder"],
    avsVmInternalId: item["avsVmInternalId"],
    avsVmResourceId: item["avsVmResourceId"],
    avsVmName: item["avsVmName"],
    avsStorageContainerResourceId: item["avsStorageContainerResourceId"],
  };
}

/** The response of a AvsStorageContainerVolume list operation. */
export interface _AvsStorageContainerVolumeListResult {
  /** The AvsStorageContainerVolume items on this page */
  value: AvsStorageContainerVolume[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _avsStorageContainerVolumeListResultDeserializer(
  item: any,
): _AvsStorageContainerVolumeListResult {
  return {
    value: avsStorageContainerVolumeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function avsStorageContainerVolumeArrayDeserializer(
  result: Array<AvsStorageContainerVolume>,
): any[] {
  return result.map((item) => {
    return avsStorageContainerVolumeDeserializer(item);
  });
}

/** The type used for update operations of the AvsVm. */
export interface AvsVmUpdate {
  /** The resource-specific properties for this resource. */
  properties?: AvsVmUpdateProperties;
}

export function avsVmUpdateSerializer(item: AvsVmUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : avsVmUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AvsVm. */
export interface AvsVmUpdateProperties {
  /** AVS VM's soft-deletion state */
  softDeletion?: SoftDeletion;
}

export function avsVmUpdatePropertiesSerializer(item: AvsVmUpdateProperties): any {
  return {
    softDeletion: !item["softDeletion"]
      ? item["softDeletion"]
      : softDeletionSerializer(item["softDeletion"]),
  };
}

/** AVS VM resource type, representing all the volumes associated to an AVS VM as defined by VMware */
export interface AvsVm extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AvsVmProperties;
}

export function avsVmDeserializer(item: any): AvsVm {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : avsVmPropertiesDeserializer(item["properties"]),
  };
}

/** AVS VM properties */
export interface AvsVmProperties {
  /** Pure Storage's internal ID for the storage pool */
  readonly storagePoolInternalId?: string;
  /** Azure resource ID of the storage pool */
  readonly storagePoolResourceId?: string;
  /** Human-readable name of the AVS VM */
  readonly displayName?: string;
  /** Date at which the AVS VM was created, as an RFC 3339 timestamp */
  readonly createdTimestamp?: string;
  /** AVS VM's soft-deletion state */
  softDeletion?: SoftDeletion;
  /** Specify which control plane handles the lifecycle of the volume container */
  readonly volumeContainerType?: VolumeContainerType;
  /** AVS VM details */
  readonly avs?: AvsVmDetails;
  /** Contains properties related to used Flash space */
  readonly space?: Space;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function avsVmPropertiesDeserializer(item: any): AvsVmProperties {
  return {
    storagePoolInternalId: item["storagePoolInternalId"],
    storagePoolResourceId: item["storagePoolResourceId"],
    displayName: item["displayName"],
    createdTimestamp: item["createdTimestamp"],
    softDeletion: !item["softDeletion"]
      ? item["softDeletion"]
      : softDeletionDeserializer(item["softDeletion"]),
    volumeContainerType: item["volumeContainerType"],
    avs: !item["avs"] ? item["avs"] : avsVmDetailsDeserializer(item["avs"]),
    space: !item["space"] ? item["space"] : spaceDeserializer(item["space"]),
    provisioningState: item["provisioningState"],
  };
}

/** Specify which control plane handles the lifecycle of the volume container */
export enum KnownVolumeContainerType {
  /** AVS/VMware */
  AVS = "avs",
}

/**
 * Specify which control plane handles the lifecycle of the volume container \
 * {@link KnownVolumeContainerType} can be used interchangeably with VolumeContainerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **avs**: AVS\/VMware
 */
export type VolumeContainerType = string;

/** AVS VM details */
export interface AvsVmDetails {
  /** ID of the AVS VM using this set of volumes */
  vmId: string;
  /** Name of the VMware VM using this set of volumes */
  vmName: string;
  /** Type of the VMware VM using this set of volumes */
  vmType: VmType;
  /** Pure Storage's internal ID for this AVS VM */
  avsVmInternalId: string;
}

export function avsVmDetailsDeserializer(item: any): AvsVmDetails {
  return {
    vmId: item["vmId"],
    vmName: item["vmName"],
    vmType: item["vmType"],
    avsVmInternalId: item["avsVmInternalId"],
  };
}

/** AVS VM storage types */
export enum KnownVmType {
  /** VM using vVols as underlying storage */
  VVol = "vvol",
}

/**
 * AVS VM storage types \
 * {@link KnownVmType} can be used interchangeably with VmType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **vvol**: VM using vVols as underlying storage
 */
export type VmType = string;

/** The response of a AvsVm list operation. */
export interface _AvsVmListResult {
  /** The AvsVm items on this page */
  value: AvsVm[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _avsVmListResultDeserializer(item: any): _AvsVmListResult {
  return {
    value: avsVmArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function avsVmArrayDeserializer(result: Array<AvsVm>): any[] {
  return result.map((item) => {
    return avsVmDeserializer(item);
  });
}

/** The type used for update operations of the AvsVmVolume. */
export interface AvsVmVolumeUpdate {
  /** The resource-specific properties for this resource. */
  properties?: AvsVmVolumeUpdateProperties;
}

export function avsVmVolumeUpdateSerializer(item: AvsVmVolumeUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : avsVmVolumeUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the AvsVmVolume. */
export interface AvsVmVolumeUpdateProperties {
  /** Volume's soft-deletion state */
  softDeletion?: SoftDeletion;
}

export function avsVmVolumeUpdatePropertiesSerializer(item: AvsVmVolumeUpdateProperties): any {
  return {
    softDeletion: !item["softDeletion"]
      ? item["softDeletion"]
      : softDeletionSerializer(item["softDeletion"]),
  };
}

/** Any volume associated to a particular AVS VM */
export interface AvsVmVolume extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: VolumeProperties;
}

export function avsVmVolumeDeserializer(item: any): AvsVmVolume {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : volumePropertiesDeserializer(item["properties"]),
  };
}

/** The response of a AvsVmVolume list operation. */
export interface _AvsVmVolumeListResult {
  /** The AvsVmVolume items on this page */
  value: AvsVmVolume[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _avsVmVolumeListResultDeserializer(item: any): _AvsVmVolumeListResult {
  return {
    value: avsVmVolumeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function avsVmVolumeArrayDeserializer(result: Array<AvsVmVolume>): any[] {
  return result.map((item) => {
    return avsVmVolumeDeserializer(item);
  });
}

/** Supported versions for PureStorage.Block. */
export enum KnownVersions {
  /** Version 1 stable */
  V20241101 = "2024-11-01",
}
