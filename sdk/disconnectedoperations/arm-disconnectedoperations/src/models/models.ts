// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Disconnected operation resource. */
export interface DisconnectedOperation extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DisconnectedOperationProperties;
}

export function disconnectedOperationDeserializer(item: any): DisconnectedOperation {
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

/** Disconnected create or update operation resource. */
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
      : disconnectedOperationPropertiesCreateOrUpdateDeserializer(item["properties"]),
  };
}

/** The disconnected create or update operation properties */
export interface DisconnectedOperationPropertiesCreateOrUpdate {
  /** The resource provisioning state */
  readonly provisioningState?: ResourceProvisioningState;
  /** The connection intent */
  connectionIntent: ConnectionIntent;
  /** The connection status */
  readonly connectionStatus?: ConnectionStatus;
  /** The registration intent */
  registrationStatus?: RegistrationStatus;
  /** The device version */
  deviceVersion?: string;
}

export function disconnectedOperationPropertiesCreateOrUpdateSerializer(
  item: DisconnectedOperationPropertiesCreateOrUpdate,
): any {
  return {
    connectionIntent: item["connectionIntent"],
    registrationStatus: item["registrationStatus"],
    deviceVersion: item["deviceVersion"],
  };
}

export function disconnectedOperationPropertiesCreateOrUpdateDeserializer(
  item: any,
): DisconnectedOperationPropertiesCreateOrUpdate {
  return {
    provisioningState: item["provisioningState"],
    connectionIntent: item["connectionIntent"],
    connectionStatus: item["connectionStatus"],
    registrationStatus: item["registrationStatus"],
    deviceVersion: item["deviceVersion"],
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
}

export function disconnectedOperationUpdatePropertiesSerializer(
  item: DisconnectedOperationUpdateProperties,
): any {
  return {
    connectionIntent: item["connectionIntent"],
    registrationStatus: item["registrationStatus"],
    deviceVersion: item["deviceVersion"],
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
  readonly releaseDate: string;
  /** The release type */
  readonly releaseType: ReleaseType;
  /** The versions that are compatible for this update package. */
  readonly compatibleVersions?: string[];
}

export function imagePropertiesDeserializer(item: any): ImageProperties {
  return {
    provisioningState: item["provisioningState"],
    releaseVersion: item["releaseVersion"],
    releaseDisplayName: item["releaseDisplayName"],
    releaseNotes: item["releaseNotes"],
    releaseDate: item["releaseDate"],
    releaseType: item["releaseType"],
    compatibleVersions: !item["compatibleVersions"]
      ? item["compatibleVersions"]
      : item["compatibleVersions"].map((p: any) => {
          return p;
        }),
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
  readonly releaseDate: string;
  /** The release type */
  readonly releaseType: ReleaseType;
  /** The versions that are compatible for this update package. */
  readonly compatibleVersions?: string[];
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
    releaseDate: item["releaseDate"],
    releaseType: item["releaseType"],
    compatibleVersions: !item["compatibleVersions"]
      ? item["compatibleVersions"]
      : item["compatibleVersions"].map((p: any) => {
          return p;
        }),
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

/** The available API versions. */
export enum KnownVersions {
  /** Version 2025-06-01-preview */
  V20250601Preview = "2025-06-01-preview",
}
