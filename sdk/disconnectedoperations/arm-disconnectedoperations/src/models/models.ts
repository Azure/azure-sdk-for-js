// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Disconnected operation resource. */
export interface DisconnectedOperation extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DisconnectedOperationProperties;
}

export function disconnectedOperationDeserializer(item: any): DisconnectedOperation {
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
      : disconnectedOperationPropertiesDeserializer(item["properties"]),
  };
}

/** The disconnected operation properties */
export interface DisconnectedOperationProperties {
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
  /** The unique GUID of the stamp */
  readonly stampId: string;
  /** The billing model */
  readonly billingModel: BillingModel;
  /** The connection intent */
  connectionIntent: ConnectionIntent;
  /** The connection status */
  readonly connectionStatus?: ConnectionStatus;
  /** The registration intent */
  registrationStatus?: RegistrationStatus;
  /** The device version */
  deviceVersion?: string;
  /** The billing configuration */
  billingConfiguration?: BillingConfiguration;
  /** The benefit plans */
  benefitPlans?: BenefitPlans;
}

export function disconnectedOperationPropertiesDeserializer(
  item: any,
): DisconnectedOperationProperties {
  return {
    provisioningState: item["provisioningState"],
    stampId: item["stampId"],
    billingModel: item["billingModel"],
    connectionIntent: item["connectionIntent"],
    connectionStatus: item["connectionStatus"],
    registrationStatus: item["registrationStatus"],
    deviceVersion: item["deviceVersion"],
    billingConfiguration: !item["billingConfiguration"]
      ? item["billingConfiguration"]
      : billingConfigurationDeserializer(item["billingConfiguration"]),
    benefitPlans: !item["benefitPlans"]
      ? item["benefitPlans"]
      : benefitPlansDeserializer(item["benefitPlans"]),
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

/** Billing model */
export enum KnownBillingModel {
  /** Billed on capacity. */
  Capacity = "Capacity",
}

/**
 * Billing model \
 * {@link KnownBillingModel} can be used interchangeably with BillingModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Capacity**: Billed on capacity.
 */
export type BillingModel = string;

/** Connection Intent */
export enum KnownConnectionIntent {
  /** Device is connected to cloud. */
  Connected = "Connected",
  /** Device is disconnected from cloud. */
  Disconnected = "Disconnected",
}

/**
 * Connection Intent \
 * {@link KnownConnectionIntent} can be used interchangeably with ConnectionIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: Device is connected to cloud. \
 * **Disconnected**: Device is disconnected from cloud.
 */
export type ConnectionIntent = string;

/** Connection status */
export enum KnownConnectionStatus {
  /** Device is connected to cloud. */
  Connected = "Connected",
  /** Device is disconnected from cloud. */
  Disconnected = "Disconnected",
}

/**
 * Connection status \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: Device is connected to cloud. \
 * **Disconnected**: Device is disconnected from cloud.
 */
export type ConnectionStatus = string;

/** Registration status */
export enum KnownRegistrationStatus {
  /** Device is registered to cloud. */
  Registered = "Registered",
  /** Device is not registered to cloud. */
  Unregistered = "Unregistered",
}

/**
 * Registration status \
 * {@link KnownRegistrationStatus} can be used interchangeably with RegistrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Registered**: Device is registered to cloud. \
 * **Unregistered**: Device is not registered to cloud.
 */
export type RegistrationStatus = string;

/** The billing configuration */
export interface BillingConfiguration {
  /** The auto renew setting */
  autoRenew: AutoRenew;
  /** The billing status */
  readonly billingStatus: BillingStatus;
  /** The current billing configuration */
  current: BillingPeriod;
  /** The upcoming billing configuration */
  upcoming?: BillingPeriod;
}

export function billingConfigurationSerializer(item: BillingConfiguration): any {
  return {
    autoRenew: item["autoRenew"],
    current: billingPeriodSerializer(item["current"]),
    upcoming: !item["upcoming"] ? item["upcoming"] : billingPeriodSerializer(item["upcoming"]),
  };
}

export function billingConfigurationDeserializer(item: any): BillingConfiguration {
  return {
    autoRenew: item["autoRenew"],
    billingStatus: item["billingStatus"],
    current: billingPeriodDeserializer(item["current"]),
    upcoming: !item["upcoming"] ? item["upcoming"] : billingPeriodDeserializer(item["upcoming"]),
  };
}

/** Auto renew status */
export enum KnownAutoRenew {
  /** Auto renew is enabled. */
  Enabled = "Enabled",
  /** Auto renew is disabled. */
  Disabled = "Disabled",
}

/**
 * Auto renew status \
 * {@link KnownAutoRenew} can be used interchangeably with AutoRenew,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Auto renew is enabled. \
 * **Disabled**: Auto renew is disabled.
 */
export type AutoRenew = string;

/** Billing status */
export enum KnownBillingStatus {
  /** Billing is enabled. */
  Enabled = "Enabled",
  /** Billing is disabled. */
  Disabled = "Disabled",
  /** Billing is stopped. */
  Stopped = "Stopped",
}

/**
 * Billing status \
 * {@link KnownBillingStatus} can be used interchangeably with BillingStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Billing is enabled. \
 * **Disabled**: Billing is disabled. \
 * **Stopped**: Billing is stopped.
 */
export type BillingStatus = string;

/** The billing period */
export interface BillingPeriod {
  /** The number of cores */
  cores: number;
  /** The pricing model */
  pricingModel: PricingModel;
  /** The billing start date */
  readonly startDate?: Date;
  /** The billing end date */
  readonly endDate?: Date;
}

export function billingPeriodSerializer(item: BillingPeriod): any {
  return { cores: item["cores"], pricingModel: item["pricingModel"] };
}

export function billingPeriodDeserializer(item: any): BillingPeriod {
  return {
    cores: item["cores"],
    pricingModel: item["pricingModel"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
  };
}

/** Pricing model */
export enum KnownPricingModel {
  /** Trial pricing model. */
  Trial = "Trial",
  /** Annual pricing model. */
  Annual = "Annual",
}

/**
 * Pricing model \
 * {@link KnownPricingModel} can be used interchangeably with PricingModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Trial**: Trial pricing model. \
 * **Annual**: Annual pricing model.
 */
export type PricingModel = string;

/** The benefit plans */
export interface BenefitPlans {
  /** Azure Hybrid Windows Server Benefit plan */
  azureHybridWindowsServerBenefit?: BenefitPlanStatus;
  /** Number of Windows Server VMs to license under the Azure Hybrid Benefit plan */
  windowsServerVmCount?: number;
}

export function benefitPlansSerializer(item: BenefitPlans): any {
  return {
    azureHybridWindowsServerBenefit: item["azureHybridWindowsServerBenefit"],
    windowsServerVmCount: item["windowsServerVmCount"],
  };
}

export function benefitPlansDeserializer(item: any): BenefitPlans {
  return {
    azureHybridWindowsServerBenefit: item["azureHybridWindowsServerBenefit"],
    windowsServerVmCount: item["windowsServerVmCount"],
  };
}

/** Benefit plans status */
export enum KnownBenefitPlanStatus {
  /** Benefit plan is enabled. */
  Enabled = "Enabled",
  /** Benefit plan is disabled. */
  Disabled = "Disabled",
}

/**
 * Benefit plans status \
 * {@link KnownBenefitPlanStatus} can be used interchangeably with BenefitPlanStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Benefit plan is enabled. \
 * **Disabled**: Benefit plan is disabled.
 */
export type BenefitPlanStatus = string;

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

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface DisconnectedOperationCreateOrUpdate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DisconnectedOperationPropertiesCreateOrUpdate;
}

export function disconnectedOperationCreateOrUpdateSerializer(
  item: DisconnectedOperationCreateOrUpdate,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : disconnectedOperationPropertiesCreateOrUpdateSerializer(item["properties"]),
  };
}

export function disconnectedOperationCreateOrUpdateDeserializer(
  item: any,
): DisconnectedOperationCreateOrUpdate {
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
      : disconnectedOperationPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** model interface DisconnectedOperationPropertiesCreateOrUpdate */
export interface DisconnectedOperationPropertiesCreateOrUpdate {
  /** The connection intent */
  connectionIntent: ConnectionIntent;
  /** The device version */
  deviceVersion?: string;
  /** The billing configuration */
  billingConfiguration?: BillingConfigurationCreateCreateOrUpdate;
  /** The benefit plans */
  benefitPlans?: BenefitPlans;
}

export function disconnectedOperationPropertiesCreateOrUpdateSerializer(
  item: DisconnectedOperationPropertiesCreateOrUpdate,
): any {
  return {
    connectionIntent: item["connectionIntent"],
    deviceVersion: item["deviceVersion"],
    billingConfiguration: !item["billingConfiguration"]
      ? item["billingConfiguration"]
      : billingConfigurationCreateCreateOrUpdateSerializer(item["billingConfiguration"]),
    benefitPlans: !item["benefitPlans"]
      ? item["benefitPlans"]
      : benefitPlansSerializer(item["benefitPlans"]),
  };
}

export function disconnectedOperationPropertiesCreateOrUpdateDeserializer(
  item: any,
): DisconnectedOperationPropertiesCreateOrUpdate {
  return {
    connectionIntent: item["connectionIntent"],
    deviceVersion: item["deviceVersion"],
    billingConfiguration: !item["billingConfiguration"]
      ? item["billingConfiguration"]
      : billingConfigurationCreateCreateOrUpdateDeserializer(item["billingConfiguration"]),
    benefitPlans: !item["benefitPlans"]
      ? item["benefitPlans"]
      : benefitPlansDeserializer(item["benefitPlans"]),
  };
}

/** The billing configuration */
export interface BillingConfigurationCreateCreateOrUpdate {
  /** The auto renew setting */
  autoRenew: AutoRenew;
  /** The current billing configuration */
  current: BillingPeriod;
}

export function billingConfigurationCreateCreateOrUpdateSerializer(
  item: BillingConfigurationCreateCreateOrUpdate,
): any {
  return { autoRenew: item["autoRenew"], current: billingPeriodSerializer(item["current"]) };
}

export function billingConfigurationCreateCreateOrUpdateDeserializer(
  item: any,
): BillingConfigurationCreateCreateOrUpdate {
  return {
    autoRenew: item["autoRenew"],
    current: billingPeriodDeserializer(item["current"]),
  };
}

/** The type used for update operations of the DisconnectedOperation. */
export interface DisconnectedOperationUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: DisconnectedOperationUpdateProperties;
}

export function disconnectedOperationUpdateSerializer(item: DisconnectedOperationUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : disconnectedOperationUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the DisconnectedOperation. */
export interface DisconnectedOperationUpdateProperties {
  /** The connection intent */
  connectionIntent?: ConnectionIntent;
  /** The registration intent */
  registrationStatus?: RegistrationStatus;
  /** The device version */
  deviceVersion?: string;
  /** The billing configuration */
  billingConfiguration?: BillingConfiguration;
  /** The benefit plans */
  benefitPlans?: BenefitPlans;
}

export function disconnectedOperationUpdatePropertiesSerializer(
  item: DisconnectedOperationUpdateProperties,
): any {
  return {
    connectionIntent: item["connectionIntent"],
    registrationStatus: item["registrationStatus"],
    deviceVersion: item["deviceVersion"],
    billingConfiguration: !item["billingConfiguration"]
      ? item["billingConfiguration"]
      : billingConfigurationSerializer(item["billingConfiguration"]),
    benefitPlans: !item["benefitPlans"]
      ? item["benefitPlans"]
      : benefitPlansSerializer(item["benefitPlans"]),
  };
}

/** The response of a DisconnectedOperation list operation. */
export interface _DisconnectedOperationListResult {
  /** The DisconnectedOperation items on this page */
  value: DisconnectedOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _disconnectedOperationListResultDeserializer(
  item: any,
): _DisconnectedOperationListResult {
  return {
    value: disconnectedOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function disconnectedOperationArrayDeserializer(
  result: Array<DisconnectedOperation>,
): any[] {
  return result.map((item) => {
    return disconnectedOperationDeserializer(item);
  });
}

/** The disconnected operation manifest */
export interface DisconnectedOperationDeploymentManifest {
  /** The resource identifier of the disconnected operations resource */
  readonly resourceId: string;
  /** The resource name */
  readonly resourceName: string;
  /** The unique GUID of the stamp */
  readonly stampId: string;
  /** The resource location */
  readonly location: string;
  /** The billing model */
  readonly billingModel: BillingModel;
  /** The connection intent */
  readonly connectionIntent: ConnectionIntent;
  /** The cloud in which the resource is registered */
  readonly cloud?: string;
  /** The billing configuration */
  readonly billingConfiguration?: BillingConfiguration;
  /** The benefit plans */
  readonly benefitPlans?: BenefitPlans;
}

export function disconnectedOperationDeploymentManifestDeserializer(
  item: any,
): DisconnectedOperationDeploymentManifest {
  return {
    resourceId: item["resourceId"],
    resourceName: item["resourceName"],
    stampId: item["stampId"],
    location: item["location"],
    billingModel: item["billingModel"],
    connectionIntent: item["connectionIntent"],
    cloud: item["cloud"],
    billingConfiguration: !item["billingConfiguration"]
      ? item["billingConfiguration"]
      : billingConfigurationDeserializer(item["billingConfiguration"]),
    benefitPlans: !item["benefitPlans"]
      ? item["benefitPlans"]
      : benefitPlansDeserializer(item["benefitPlans"]),
  };
}

/** The response of a Image list operation. */
export interface _ImageListResult {
  /** The Image items on this page */
  value: Image[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _imageListResultDeserializer(item: any): _ImageListResult {
  return {
    value: imageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function imageArrayDeserializer(result: Array<Image>): any[] {
  return result.map((item) => {
    return imageDeserializer(item);
  });
}

/** Holds the release information of a disconnected operations image. */
export interface Image extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ImageProperties;
}

export function imageDeserializer(item: any): Image {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : imagePropertiesDeserializer(item["properties"]),
  };
}

/** The image properties */
export interface ImageProperties {
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
  /** The version of the package in the format 1.1.1 */
  readonly releaseVersion: string;
  /** The release name */
  readonly releaseDisplayName: string;
  /** The release notes */
  readonly releaseNotes: string;
  /** The release date */
  readonly releaseDate: Date;
  /** The release type */
  readonly releaseType: ReleaseType;
  /** The versions that are compatible for this update package. */
  readonly compatibleVersions?: string[];
  /** Image update properties for update release type image. */
  readonly updateProperties?: ImageUpdateProperties;
}

export function imagePropertiesDeserializer(item: any): ImageProperties {
  return {
    provisioningState: item["provisioningState"],
    releaseVersion: item["releaseVersion"],
    releaseDisplayName: item["releaseDisplayName"],
    releaseNotes: item["releaseNotes"],
    releaseDate: new Date(item["releaseDate"]),
    releaseType: item["releaseType"],
    compatibleVersions: !item["compatibleVersions"]
      ? item["compatibleVersions"]
      : item["compatibleVersions"].map((p: any) => {
          return p;
        }),
    updateProperties: !item["updateProperties"]
      ? item["updateProperties"]
      : imageUpdatePropertiesDeserializer(item["updateProperties"]),
  };
}

/** Release Type */
export enum KnownReleaseType {
  /** Release is a new install. */
  Install = "Install",
  /** Release is update. */
  Update = "Update",
}

/**
 * Release Type \
 * {@link KnownReleaseType} can be used interchangeably with ReleaseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Install**: Release is a new install. \
 * **Update**: Release is update.
 */
export type ReleaseType = string;

/** The update properties of the Update Release type Image */
export interface ImageUpdateProperties {
  /** Indicates if a system reboot is required after applying the update. */
  readonly systemReboot: SystemReboot;
  /** Details of security updates included in this image release. */
  readonly securityUpdates: string;
  /** The operating system version provided by this image update. */
  readonly osVersion: string;
  /** The version(s) of the agent software included in this image update. */
  readonly agentVersion: string;
  /** Details of feature updates included in this image release. */
  readonly featureUpdates: string;
}

export function imageUpdatePropertiesDeserializer(item: any): ImageUpdateProperties {
  return {
    systemReboot: item["systemReboot"],
    securityUpdates: item["securityUpdates"],
    osVersion: item["osVersion"],
    agentVersion: item["agentVersion"],
    featureUpdates: item["featureUpdates"],
  };
}

/** System Reboot */
export enum KnownSystemReboot {
  /** System reboot is required. */
  Required = "Required",
  /** System reboot is not required. */
  NotRequired = "NotRequired",
}

/**
 * System Reboot \
 * {@link KnownSystemReboot} can be used interchangeably with SystemReboot,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Required**: System reboot is required. \
 * **NotRequired**: System reboot is not required.
 */
export type SystemReboot = string;

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

/** The image download properties */
export interface ImageDownloadResult {
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
  /** The version of the package in the format 1.1.1 */
  readonly releaseVersion: string;
  /** The release name */
  readonly releaseDisplayName: string;
  /** The release notes */
  readonly releaseNotes: string;
  /** The release date */
  readonly releaseDate: Date;
  /** The release type */
  readonly releaseType: ReleaseType;
  /** The versions that are compatible for this update package. */
  readonly compatibleVersions?: string[];
  /** Image update properties for update release type image. */
  readonly updateProperties?: ImageUpdateProperties;
  /** The unique identifier of the download */
  readonly transactionId: string;
  /** The download URI */
  readonly downloadLink: string;
  /** The download link expiry time */
  readonly linkExpiry: Date;
}

export function imageDownloadResultDeserializer(item: any): ImageDownloadResult {
  return {
    provisioningState: item["provisioningState"],
    releaseVersion: item["releaseVersion"],
    releaseDisplayName: item["releaseDisplayName"],
    releaseNotes: item["releaseNotes"],
    releaseDate: new Date(item["releaseDate"]),
    releaseType: item["releaseType"],
    compatibleVersions: !item["compatibleVersions"]
      ? item["compatibleVersions"]
      : item["compatibleVersions"].map((p: any) => {
          return p;
        }),
    updateProperties: !item["updateProperties"]
      ? item["updateProperties"]
      : imageUpdatePropertiesDeserializer(item["updateProperties"]),
    transactionId: item["transactionId"],
    downloadLink: item["downloadLink"],
    linkExpiry: new Date(item["linkExpiry"]),
  };
}

/** The response of a Artifact list operation. */
export interface _ArtifactListResult {
  /** The Artifact items on this page */
  value: Artifact[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _artifactListResultDeserializer(item: any): _ArtifactListResult {
  return {
    value: artifactArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function artifactArrayDeserializer(result: Array<Artifact>): any[] {
  return result.map((item) => {
    return artifactDeserializer(item);
  });
}

/** Disconnected operations artifact resource. */
export interface Artifact extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ArtifactProperties;
}

export function artifactDeserializer(item: any): Artifact {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : artifactPropertiesDeserializer(item["properties"]),
  };
}

/** The artifact properties */
export interface ArtifactProperties {
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
  /** The artifact display order */
  readonly artifactOrder: number;
  /** The artifact title */
  readonly title: string;
  /** The artifact description */
  readonly description: string;
  /** The artifact size in MB */
  readonly size?: number;
}

export function artifactPropertiesDeserializer(item: any): ArtifactProperties {
  return {
    provisioningState: item["provisioningState"],
    artifactOrder: item["artifactOrder"],
    title: item["title"],
    description: item["description"],
    size: item["size"],
  };
}

/** The artifact download properties */
export interface ArtifactDownloadResult {
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
  /** The artifact display order */
  readonly artifactOrder: number;
  /** The artifact title */
  readonly title: string;
  /** The artifact description */
  readonly description: string;
  /** The artifact size in MB */
  readonly size?: number;
  /** The download URI */
  readonly downloadLink: string;
  /** The download link expiry time */
  readonly linkExpiry: Date;
}

export function artifactDownloadResultDeserializer(item: any): ArtifactDownloadResult {
  return {
    provisioningState: item["provisioningState"],
    artifactOrder: item["artifactOrder"],
    title: item["title"],
    description: item["description"],
    size: item["size"],
    downloadLink: item["downloadLink"],
    linkExpiry: new Date(item["linkExpiry"]),
  };
}

/** The response of a HardwareSetting list operation. */
export interface _HardwareSettingListResult {
  /** The HardwareSetting items on this page */
  value: HardwareSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hardwareSettingListResultDeserializer(item: any): _HardwareSettingListResult {
  return {
    value: hardwareSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hardwareSettingArraySerializer(result: Array<HardwareSetting>): any[] {
  return result.map((item) => {
    return hardwareSettingSerializer(item);
  });
}

export function hardwareSettingArrayDeserializer(result: Array<HardwareSetting>): any[] {
  return result.map((item) => {
    return hardwareSettingDeserializer(item);
  });
}

/** Hardware settings resource. */
export interface HardwareSetting extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HardwareSettingProperties;
}

export function hardwareSettingSerializer(item: HardwareSetting): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : hardwareSettingPropertiesSerializer(item["properties"]),
  };
}

export function hardwareSettingDeserializer(item: any): HardwareSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : hardwareSettingPropertiesDeserializer(item["properties"]),
  };
}

/** The hardware setting properties */
export interface HardwareSettingProperties {
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
  /** The total number of cores */
  totalCores: number;
  /** The disk space in GB */
  diskSpaceInGb: number;
  /** The memory in GB */
  memoryInGb: number;
  /** The OEM */
  oem: string;
  /** The hardware SKU */
  hardwareSku: string;
  /** The number of nodes */
  nodes: number;
  /** The active version at registration */
  versionAtRegistration: string;
  /** The solution builder extension at registration */
  solutionBuilderExtension: string;
  /** The unique Id of the device */
  deviceId: string;
}

export function hardwareSettingPropertiesSerializer(item: HardwareSettingProperties): any {
  return {
    totalCores: item["totalCores"],
    diskSpaceInGb: item["diskSpaceInGb"],
    memoryInGb: item["memoryInGb"],
    oem: item["oem"],
    hardwareSku: item["hardwareSku"],
    nodes: item["nodes"],
    versionAtRegistration: item["versionAtRegistration"],
    solutionBuilderExtension: item["solutionBuilderExtension"],
    deviceId: item["deviceId"],
  };
}

export function hardwareSettingPropertiesDeserializer(item: any): HardwareSettingProperties {
  return {
    provisioningState: item["provisioningState"],
    totalCores: item["totalCores"],
    diskSpaceInGb: item["diskSpaceInGb"],
    memoryInGb: item["memoryInGb"],
    oem: item["oem"],
    hardwareSku: item["hardwareSku"],
    nodes: item["nodes"],
    versionAtRegistration: item["versionAtRegistration"],
    solutionBuilderExtension: item["solutionBuilderExtension"],
    deviceId: item["deviceId"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** Version 2026-03-15 */
  V20260315 = "2026-03-15",
}
