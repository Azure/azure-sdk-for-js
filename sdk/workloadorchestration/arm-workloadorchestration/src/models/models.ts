// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** DynamicSchema Resource */
export interface DynamicSchema extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DynamicSchemaProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function dynamicSchemaSerializer(item: DynamicSchema): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : dynamicSchemaPropertiesSerializer(item["properties"]),
  };
}

export function dynamicSchemaDeserializer(item: any): DynamicSchema {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dynamicSchemaPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** DynamicSchema Properties */
export interface DynamicSchemaProperties {
  /** Type of configuration */
  readonly configurationType?: ConfigurationType;
  /** Type of configuration model */
  readonly configurationModel?: ConfigurationModel;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function dynamicSchemaPropertiesSerializer(item: DynamicSchemaProperties): any {
  return item;
}

export function dynamicSchemaPropertiesDeserializer(item: any): DynamicSchemaProperties {
  return {
    configurationType: item["configurationType"],
    configurationModel: item["configurationModel"],
    provisioningState: item["provisioningState"],
  };
}

/** Available configuration types */
export enum KnownConfigurationType {
  /** Configuration type Shared */
  Shared = "Shared",
  /** Configuration type Hierarchy */
  Hierarchy = "Hierarchy",
}

/**
 * Available configuration types \
 * {@link KnownConfigurationType} can be used interchangeably with ConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Shared**: Configuration type Shared \
 * **Hierarchy**: Configuration type Hierarchy
 */
export type ConfigurationType = string;

/** Available configuration models */
export enum KnownConfigurationModel {
  /** Configuration model Application */
  Application = "Application",
  /** Configuration model Common */
  Common = "Common",
}

/**
 * Available configuration models \
 * {@link KnownConfigurationModel} can be used interchangeably with ConfigurationModel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Application**: Configuration model Application \
 * **Common**: Configuration model Common
 */
export type ConfigurationModel = string;

/** Provisioning state of resource */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource Provisioning is initialized */
  Initialized = "Initialized",
  /** Resource Provisioning is in progress */
  Inprogress = "InProgress",
  /** Resource Provisioning is deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state of resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Initialized**: Resource Provisioning is initialized \
 * **InProgress**: Resource Provisioning is in progress \
 * **Deleting**: Resource Provisioning is deleting
 */
export type ProvisioningState = string;

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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
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

export function errorDetailSerializer(item: ErrorDetail): any {
  return item;
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

export function errorDetailArraySerializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailSerializer(item);
  });
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

/** The response of a DynamicSchema list operation. */
export interface _DynamicSchemaListResult {
  /** The DynamicSchema items on this page */
  value: DynamicSchema[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dynamicSchemaListResultDeserializer(item: any): _DynamicSchemaListResult {
  return {
    value: dynamicSchemaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dynamicSchemaArraySerializer(result: Array<DynamicSchema>): any[] {
  return result.map((item) => {
    return dynamicSchemaSerializer(item);
  });
}

export function dynamicSchemaArrayDeserializer(result: Array<DynamicSchema>): any[] {
  return result.map((item) => {
    return dynamicSchemaDeserializer(item);
  });
}

/** Schema Resource */
export interface Schema extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function schemaSerializer(item: Schema): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : schemaPropertiesSerializer(item["properties"]),
  };
}

export function schemaDeserializer(item: any): Schema {
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
      : schemaPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Schema Properties */
export interface SchemaProperties {
  /** Current Version of schema */
  readonly currentVersion?: string;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function schemaPropertiesSerializer(item: SchemaProperties): any {
  return item;
}

export function schemaPropertiesDeserializer(item: any): SchemaProperties {
  return {
    currentVersion: item["currentVersion"],
    provisioningState: item["provisioningState"],
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
    tags: item["tags"],
    location: item["location"],
  };
}

/** The type used for update operations of the Schema. */
export interface SchemaUpdate {
  /** The resource-specific properties for this resource. */
  properties?: SchemaUpdateProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function schemaUpdateSerializer(item: SchemaUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schemaUpdatePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** The updatable properties of the Schema. */
export interface SchemaUpdateProperties {}

export function schemaUpdatePropertiesSerializer(item: SchemaUpdateProperties): any {
  return item;
}

/** Schema Version With Update Type */
export interface SchemaVersionWithUpdateType {
  /** Update type */
  updateType?: UpdateType;
  /** Version to create */
  version?: string;
  /** Schema Version */
  schemaVersion: SchemaVersion;
}

export function schemaVersionWithUpdateTypeSerializer(item: SchemaVersionWithUpdateType): any {
  return {
    updateType: item["updateType"],
    version: item["version"],
    schemaVersion: schemaVersionSerializer(item["schemaVersion"]),
  };
}

/** Denotes which part of the version number will be updated */
export enum KnownUpdateType {
  /** Major version */
  Major = "Major",
  /** Minor version */
  Minor = "Minor",
  /** Patch version */
  Patch = "Patch",
}

/**
 * Denotes which part of the version number will be updated \
 * {@link KnownUpdateType} can be used interchangeably with UpdateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Major**: Major version \
 * **Minor**: Minor version \
 * **Patch**: Patch version
 */
export type UpdateType = string;

/** Schema Version Resource */
export interface SchemaVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaVersionProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function schemaVersionSerializer(item: SchemaVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schemaVersionPropertiesSerializer(item["properties"]),
  };
}

export function schemaVersionDeserializer(item: any): SchemaVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : schemaVersionPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Schema Version Properties */
export interface SchemaVersionProperties {
  /** Value of schema version */
  value: string;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function schemaVersionPropertiesSerializer(item: SchemaVersionProperties): any {
  return { value: item["value"] };
}

export function schemaVersionPropertiesDeserializer(item: any): SchemaVersionProperties {
  return {
    value: item["value"],
    provisioningState: item["provisioningState"],
  };
}

/** Version Parameter */
export interface VersionParameter {
  /** Version of the Resource */
  version: string;
}

export function versionParameterSerializer(item: VersionParameter): any {
  return { version: item["version"] };
}

/** Remove Version response */
export interface RemoveVersionResponse {
  /** Status for remove version response */
  status: string;
}

export function removeVersionResponseDeserializer(item: any): RemoveVersionResponse {
  return {
    status: item["status"],
  };
}

/** The response of a Schema list operation. */
export interface _SchemaListResult {
  /** The Schema items on this page */
  value: Schema[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaListResultDeserializer(item: any): _SchemaListResult {
  return {
    value: schemaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaArraySerializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaSerializer(item);
  });
}

export function schemaArrayDeserializer(result: Array<Schema>): any[] {
  return result.map((item) => {
    return schemaDeserializer(item);
  });
}

/** The response of a SchemaVersion list operation. */
export interface _SchemaVersionListResult {
  /** The SchemaVersion items on this page */
  value: SchemaVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaVersionListResultDeserializer(item: any): _SchemaVersionListResult {
  return {
    value: schemaVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaVersionArraySerializer(result: Array<SchemaVersion>): any[] {
  return result.map((item) => {
    return schemaVersionSerializer(item);
  });
}

export function schemaVersionArrayDeserializer(result: Array<SchemaVersion>): any[] {
  return result.map((item) => {
    return schemaVersionDeserializer(item);
  });
}

/** Solution Version Resource. It has the resolved configuration along with edge specification. */
export interface SolutionVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SolutionVersionProperties;
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function solutionVersionSerializer(item: SolutionVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : solutionVersionPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function solutionVersionDeserializer(item: any): SolutionVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : solutionVersionPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** Solution Version Properties */
export interface SolutionVersionProperties {
  /** Solution Template Version Id */
  readonly solutionTemplateVersionId?: string;
  /** Revision number of resolved config for this solution version */
  readonly revision?: number;
  /** Name of applicable target's display name */
  readonly targetDisplayName?: string;
  /** Resolved configuration values */
  readonly configuration?: string;
  /** Configuration on the line level across all solution template versions */
  readonly targetLevelConfiguration?: string;
  /** App components spec */
  specification: Record<string, any>;
  /** Review id of resolved config for this solution version */
  readonly reviewId?: string;
  /** External validation id */
  readonly externalValidationId?: string;
  /** State of solution instance */
  readonly state?: State;
  /** Solution instance name */
  readonly solutionInstanceName?: string;
  /** Solution Dependency Context */
  readonly solutionDependencies?: SolutionDependency[];
  /** Error Details if any failure is there */
  readonly errorDetails?: ErrorDetail;
  /** The URI for tracking the latest action performed on this solution version. */
  readonly latestActionTrackingUri?: string;
  /** The type of the latest action performed on this solution version. */
  readonly actionType?: JobType;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function solutionVersionPropertiesSerializer(item: SolutionVersionProperties): any {
  return { specification: item["specification"] };
}

export function solutionVersionPropertiesDeserializer(item: any): SolutionVersionProperties {
  return {
    solutionTemplateVersionId: item["solutionTemplateVersionId"],
    revision: item["revision"],
    targetDisplayName: item["targetDisplayName"],
    configuration: item["configuration"],
    targetLevelConfiguration: item["targetLevelConfiguration"],
    specification: item["specification"],
    reviewId: item["reviewId"],
    externalValidationId: item["externalValidationId"],
    state: item["state"],
    solutionInstanceName: item["solutionInstanceName"],
    solutionDependencies: !item["solutionDependencies"]
      ? item["solutionDependencies"]
      : solutionDependencyArrayDeserializer(item["solutionDependencies"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
    latestActionTrackingUri: item["latestActionTrackingUri"],
    actionType: item["actionType"],
    provisioningState: item["provisioningState"],
  };
}

/** Solution Instance State */
export enum KnownState {
  /** Solution Instance is in review */
  InReview = "InReview",
  /** Solution Instance upgrade is in review */
  UpgradeInReview = "UpgradeInReview",
  /** Solution Instance is ready to deploy */
  ReadyToDeploy = "ReadyToDeploy",
  /** Solution Instance is ready to upgrade */
  ReadyToUpgrade = "ReadyToUpgrade",
  /** Solution Instance is deploying */
  Deploying = "Deploying",
  /** Solution Instance is deployed */
  Deployed = "Deployed",
  /** Solution Instance failed to deploy */
  Failed = "Failed",
  /** Solution Instance is undeployed */
  Undeployed = "Undeployed",
  /** Solution Instance is pending external validation */
  PendingExternalValidation = "PendingExternalValidation",
  /** Solution Instance failed external validation */
  ExternalValidationFailed = "ExternalValidationFailed",
  /** Solution Instance is staging the images */
  Staging = "Staging",
}

/**
 * Solution Instance State \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InReview**: Solution Instance is in review \
 * **UpgradeInReview**: Solution Instance upgrade is in review \
 * **ReadyToDeploy**: Solution Instance is ready to deploy \
 * **ReadyToUpgrade**: Solution Instance is ready to upgrade \
 * **Deploying**: Solution Instance is deploying \
 * **Deployed**: Solution Instance is deployed \
 * **Failed**: Solution Instance failed to deploy \
 * **Undeployed**: Solution Instance is undeployed \
 * **PendingExternalValidation**: Solution Instance is pending external validation \
 * **ExternalValidationFailed**: Solution Instance failed external validation \
 * **Staging**: Solution Instance is staging the images
 */
export type State = string;

export function solutionDependencyArrayDeserializer(result: Array<SolutionDependency>): any[] {
  return result.map((item) => {
    return solutionDependencyDeserializer(item);
  });
}

/** Solution Dependency Context */
export interface SolutionDependency {
  /** Solution Version Id */
  solutionVersionId: string;
  /** Solution Instance Name */
  solutionInstanceName?: string;
  /** Solution Template Version Id */
  solutionTemplateVersionId: string;
  /** Target Id */
  targetId: string;
  /** Solution dependencies */
  dependencies?: SolutionDependency[];
}

export function solutionDependencyDeserializer(item: any): SolutionDependency {
  return {
    solutionVersionId: item["solutionVersionId"],
    solutionInstanceName: item["solutionInstanceName"],
    solutionTemplateVersionId: item["solutionTemplateVersionId"],
    targetId: item["targetId"],
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : solutionDependencyArrayDeserializer(item["dependencies"]),
  };
}

/** JobType for the job. Supports extensibility via string values. */
export enum KnownJobType {
  /** A deployment job. */
  Deploy = "deploy",
  /** A staging job. */
  Staging = "staging",
  /** A validation job. */
  ExternalValidation = "externalValidation",
}

/**
 * JobType for the job. Supports extensibility via string values. \
 * {@link KnownJobType} can be used interchangeably with JobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **deploy**: A deployment job. \
 * **staging**: A staging job. \
 * **externalValidation**: A validation job.
 */
export type JobType = string;

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name: string;
  /** The type of the extended location. */
  type: ExtendedLocationType;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The supported ExtendedLocation types. */
export enum KnownExtendedLocationType {
  /** Azure Edge Zones location type */
  EdgeZone = "EdgeZone",
  /** Azure Custom Locations type */
  CustomLocation = "CustomLocation",
}

/**
 * The supported ExtendedLocation types. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**: Azure Edge Zones location type \
 * **CustomLocation**: Azure Custom Locations type
 */
export type ExtendedLocationType = string;

/** The response of a SolutionVersion list operation. */
export interface _SolutionVersionListResult {
  /** The SolutionVersion items on this page */
  value: SolutionVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _solutionVersionListResultDeserializer(item: any): _SolutionVersionListResult {
  return {
    value: solutionVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function solutionVersionArraySerializer(result: Array<SolutionVersion>): any[] {
  return result.map((item) => {
    return solutionVersionSerializer(item);
  });
}

export function solutionVersionArrayDeserializer(result: Array<SolutionVersion>): any[] {
  return result.map((item) => {
    return solutionVersionDeserializer(item);
  });
}

/** Job extension resource for tracking job execution and substatuses. */
export interface Job extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: JobProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function jobDeserializer(item: any): Job {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : jobPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Properties of a Job resource, including type, status, parameters, steps, and error details. */
export interface JobProperties {
  /** The type of job. */
  jobType: JobType;
  /** Start time of the job (ISO8601). */
  startTime?: Date;
  /** End time of the job (ISO8601). */
  endTime?: Date;
  /** Status of the job. */
  status: JobStatus;
  /** Parameters for the job. */
  jobParameter?: JobParameterBaseUnion;
  /** Correlation ID for tracking. */
  correlationId?: string;
  /** Steps and substatuses for the job. */
  steps?: JobStep[];
  /** The OID or identity that triggered the job. */
  triggeredBy?: string;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
  /** Error Details if any failure is there */
  readonly errorDetails?: ErrorDetail;
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    jobType: item["jobType"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    jobParameter: !item["jobParameter"]
      ? item["jobParameter"]
      : jobParameterBaseUnionDeserializer(item["jobParameter"]),
    correlationId: item["correlationId"],
    steps: !item["steps"] ? item["steps"] : jobStepArrayDeserializer(item["steps"]),
    triggeredBy: item["triggeredBy"],
    provisioningState: item["provisioningState"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** Status of a job or job step. */
export enum KnownJobStatus {
  /** The job or step is not started. */
  NotStarted = "NotStarted",
  /** The job or step is in progress. */
  InProgress = "InProgress",
  /** The job or step succeeded. */
  Succeeded = "Succeeded",
  /** The job or step failed. */
  Failed = "Failed",
}

/**
 * Status of a job or job step. \
 * {@link KnownJobStatus} can be used interchangeably with JobStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: The job or step is not started. \
 * **InProgress**: The job or step is in progress. \
 * **Succeeded**: The job or step succeeded. \
 * **Failed**: The job or step failed.
 */
export type JobStatus = string;

/** Base Job Parameter */
export interface JobParameterBase {
  /** Job type discriminator value */
  /** The discriminator possible values: deploy */
  jobType: JobType;
}

export function jobParameterBaseDeserializer(item: any): JobParameterBase {
  return {
    jobType: item["jobType"],
  };
}

/** Alias for JobParameterBaseUnion */
export type JobParameterBaseUnion = DeployJobParameter | JobParameterBase;

export function jobParameterBaseUnionDeserializer(item: any): JobParameterBaseUnion {
  switch (item.jobType) {
    case "deploy":
      return deployJobParameterDeserializer(item as DeployJobParameter);

    default:
      return jobParameterBaseDeserializer(item);
  }
}

/** Parameters for a deployment job. */
export interface DeployJobParameter extends JobParameterBase {
  /** Job type discriminator value */
  jobType: "deploy";
  parameter?: InstallSolutionParameter;
}

export function deployJobParameterDeserializer(item: any): DeployJobParameter {
  return {
    jobType: item["jobType"],
    parameter: !item["parameter"]
      ? item["parameter"]
      : installSolutionParameterDeserializer(item["parameter"]),
  };
}

/** Install Solution Parameter */
export interface InstallSolutionParameter {
  /** Solution Version ARM Id */
  solutionVersionId: string;
}

export function installSolutionParameterSerializer(item: InstallSolutionParameter): any {
  return { solutionVersionId: item["solutionVersionId"] };
}

export function installSolutionParameterDeserializer(item: any): InstallSolutionParameter {
  return {
    solutionVersionId: item["solutionVersionId"],
  };
}

export function jobStepArrayDeserializer(result: Array<JobStep>): any[] {
  return result.map((item) => {
    return jobStepDeserializer(item);
  });
}

/** Job Step */
export interface JobStep {
  /** Name of the step */
  name: string;
  /** Status of the step */
  status: JobStatus;
  /** Start time of the step (ISO8601) */
  startTime?: Date;
  /** End time of the step (ISO8601) */
  endTime?: Date;
  /** Message for the step */
  message?: string;
  /** Statistics for the step */
  statistics?: JobStepStatisticsBaseUnion;
  /** Nested substeps for this step */
  steps?: JobStep[];
  /** Error Details if any failure is there */
  readonly errorDetails?: ErrorDetail;
}

export function jobStepDeserializer(item: any): JobStep {
  return {
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    message: item["message"],
    statistics: !item["statistics"]
      ? item["statistics"]
      : jobStepStatisticsBaseUnionDeserializer(item["statistics"]),
    steps: !item["steps"] ? item["steps"] : jobStepArrayDeserializer(item["steps"]),
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailDeserializer(item["errorDetails"]),
  };
}

/** Base Job Step Statistics */
export interface JobStepStatisticsBase {
  /** Statistics type discriminator value */
  /** The discriminator possible values: deploy */
  statisticsType: JobType;
}

export function jobStepStatisticsBaseDeserializer(item: any): JobStepStatisticsBase {
  return {
    statisticsType: item["statisticsType"],
  };
}

/** Alias for JobStepStatisticsBaseUnion */
export type JobStepStatisticsBaseUnion = DeployJobStepStatistics | JobStepStatisticsBase;

export function jobStepStatisticsBaseUnionDeserializer(item: any): JobStepStatisticsBaseUnion {
  switch (item.statisticsType) {
    case "deploy":
      return deployJobStepStatisticsDeserializer(item as DeployJobStepStatistics);

    default:
      return jobStepStatisticsBaseDeserializer(item);
  }
}

/** Deploy statistics for a job step, including total, success, and failed counts. */
export interface DeployJobStepStatistics extends JobStepStatisticsBase {
  /** Statistics type discriminator value */
  statisticsType: "deploy";
  /** Total count of items processed in this step */
  totalCount?: number;
  /** Count of successful items in this step */
  successCount?: number;
  /** Count of failed items in this step */
  failedCount?: number;
}

export function deployJobStepStatisticsDeserializer(item: any): DeployJobStepStatistics {
  return {
    statisticsType: item["statisticsType"],
    totalCount: item["totalCount"],
    successCount: item["successCount"],
    failedCount: item["failedCount"],
  };
}

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

/** The response of a Job list operation. */
export interface _JobListResult {
  /** The Job items on this page */
  value: Job[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jobListResultDeserializer(item: any): _JobListResult {
  return {
    value: jobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobArrayDeserializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobDeserializer(item);
  });
}

/** Target Resource. Represents a resource to be deployed on the edge. */
export interface Target extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: TargetProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
  extendedLocation?: ExtendedLocation;
}

export function targetSerializer(item: Target): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : targetPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function targetDeserializer(item: any): Target {
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
      : targetPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Target Properties */
export interface TargetProperties {
  /** Description of target */
  description: string;
  /** Display name of target */
  displayName: string;
  /** ArmId of Context */
  contextId: string;
  /** target spec */
  targetSpecification: Record<string, any>;
  /** List of capabilities */
  capabilities: string[];
  /** Hierarchy Level */
  hierarchyLevel: string;
  /** Status of target */
  readonly status?: DeploymentStatus;
  /** Scope of the target resource */
  solutionScope?: string;
  /** State of resource */
  state?: ResourceState;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function targetPropertiesSerializer(item: TargetProperties): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    contextId: item["contextId"],
    targetSpecification: item["targetSpecification"],
    capabilities: item["capabilities"].map((p: any) => {
      return p;
    }),
    hierarchyLevel: item["hierarchyLevel"],
    solutionScope: item["solutionScope"],
    state: item["state"],
  };
}

export function targetPropertiesDeserializer(item: any): TargetProperties {
  return {
    description: item["description"],
    displayName: item["displayName"],
    contextId: item["contextId"],
    targetSpecification: item["targetSpecification"],
    capabilities: item["capabilities"].map((p: any) => {
      return p;
    }),
    hierarchyLevel: item["hierarchyLevel"],
    status: !item["status"] ? item["status"] : deploymentStatusDeserializer(item["status"]),
    solutionScope: item["solutionScope"],
    state: item["state"],
    provisioningState: item["provisioningState"],
  };
}

/** Deployment Status */
export interface DeploymentStatus {
  /** The lastModified of the Status */
  lastModified?: Date;
  /** Indicates if Instance is deployed */
  deployed?: number;
  /** The expected running job id */
  expectedRunningJobId?: number;
  /** The running job id */
  runningJobId?: number;
  /** Deployment status */
  status?: string;
  /** Status details */
  statusDetails?: string;
  /** Deployment Generation */
  generation?: number;
  /** Target resource statuses */
  targetStatuses?: TargetStatus[];
}

export function deploymentStatusDeserializer(item: any): DeploymentStatus {
  return {
    lastModified: !item["lastModified"] ? item["lastModified"] : new Date(item["lastModified"]),
    deployed: item["deployed"],
    expectedRunningJobId: item["expectedRunningJobId"],
    runningJobId: item["runningJobId"],
    status: item["status"],
    statusDetails: item["statusDetails"],
    generation: item["generation"],
    targetStatuses: !item["targetStatuses"]
      ? item["targetStatuses"]
      : targetStatusArrayDeserializer(item["targetStatuses"]),
  };
}

export function targetStatusArrayDeserializer(result: Array<TargetStatus>): any[] {
  return result.map((item) => {
    return targetStatusDeserializer(item);
  });
}

/** Target Status */
export interface TargetStatus {
  /** Target name */
  name?: string;
  /** Target status */
  status?: string;
  /** Component statuses */
  componentStatuses?: ComponentStatus[];
}

export function targetStatusDeserializer(item: any): TargetStatus {
  return {
    name: item["name"],
    status: item["status"],
    componentStatuses: !item["componentStatuses"]
      ? item["componentStatuses"]
      : componentStatusArrayDeserializer(item["componentStatuses"]),
  };
}

export function componentStatusArrayDeserializer(result: Array<ComponentStatus>): any[] {
  return result.map((item) => {
    return componentStatusDeserializer(item);
  });
}

/** Component Status */
export interface ComponentStatus {
  /** Component name */
  name?: string;
  /** Component status */
  status?: string;
}

export function componentStatusDeserializer(item: any): ComponentStatus {
  return {
    name: item["name"],
    status: item["status"],
  };
}

/** Resource Type State */
export enum KnownResourceState {
  /** Resource is active */
  Active = "active",
  /** Resource is inactive */
  Inactive = "inactive",
}

/**
 * Resource Type State \
 * {@link KnownResourceState} can be used interchangeably with ResourceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: Resource is active \
 * **inactive**: Resource is inactive
 */
export type ResourceState = string;

/** The type used for update operations of the Target. */
export interface TargetUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: TargetUpdateProperties;
}

export function targetUpdateSerializer(item: TargetUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : targetUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Target. */
export interface TargetUpdateProperties {
  /** Description of target */
  description?: string;
  /** Display name of target */
  displayName?: string;
  /** ArmId of Context */
  contextId?: string;
  /** target spec */
  targetSpecification?: Record<string, any>;
  /** List of capabilities */
  capabilities?: string[];
  /** Hierarchy Level */
  hierarchyLevel?: string;
  /** Scope of the target resource */
  solutionScope?: string;
  /** State of resource */
  state?: ResourceState;
}

export function targetUpdatePropertiesSerializer(item: TargetUpdateProperties): any {
  return {
    description: item["description"],
    displayName: item["displayName"],
    contextId: item["contextId"],
    targetSpecification: item["targetSpecification"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : item["capabilities"].map((p: any) => {
          return p;
        }),
    hierarchyLevel: item["hierarchyLevel"],
    solutionScope: item["solutionScope"],
    state: item["state"],
  };
}

/** The response of a Target list operation. */
export interface _TargetListResult {
  /** The Target items on this page */
  value: Target[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _targetListResultDeserializer(item: any): _TargetListResult {
  return {
    value: targetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function targetArraySerializer(result: Array<Target>): any[] {
  return result.map((item) => {
    return targetSerializer(item);
  });
}

export function targetArrayDeserializer(result: Array<Target>): any[] {
  return result.map((item) => {
    return targetDeserializer(item);
  });
}

/** Uninstall Solution Parameter */
export interface UninstallSolutionParameter {
  /** Solution Template ARM Id */
  solutionTemplateId: string;
  /** Solution Instance Name */
  solutionInstanceName?: string;
}

export function uninstallSolutionParameterSerializer(item: UninstallSolutionParameter): any {
  return {
    solutionTemplateId: item["solutionTemplateId"],
    solutionInstanceName: item["solutionInstanceName"],
  };
}

/** Install Solution Parameter */
export interface RemoveRevisionParameter {
  /** Solution Template ARM Id */
  solutionTemplateId: string;
  /** Solution Version Name */
  solutionVersion: string;
}

export function removeRevisionParameterSerializer(item: RemoveRevisionParameter): any {
  return {
    solutionTemplateId: item["solutionTemplateId"],
    solutionVersion: item["solutionVersion"],
  };
}

/** Solution Template Parameter */
export interface SolutionTemplateParameter {
  /** Solution Template Version ARM Id */
  solutionTemplateVersionId: string;
  /** Solution Instance Name */
  solutionInstanceName?: string;
  /** Solution Dependencies */
  solutionDependencies?: SolutionDependencyParameter[];
}

export function solutionTemplateParameterSerializer(item: SolutionTemplateParameter): any {
  return {
    solutionTemplateVersionId: item["solutionTemplateVersionId"],
    solutionInstanceName: item["solutionInstanceName"],
    solutionDependencies: !item["solutionDependencies"]
      ? item["solutionDependencies"]
      : solutionDependencyParameterArraySerializer(item["solutionDependencies"]),
  };
}

export function solutionDependencyParameterArraySerializer(
  result: Array<SolutionDependencyParameter>,
): any[] {
  return result.map((item) => {
    return solutionDependencyParameterSerializer(item);
  });
}

/** Solution Dependency Context */
export interface SolutionDependencyParameter {
  /** Solution Version Id */
  solutionVersionId?: string;
  /** Solution Template Id */
  solutionTemplateId?: string;
  /** Solution Template Version */
  solutionTemplateVersion?: string;
  /** Solution Instance Name */
  solutionInstanceName?: string;
  /** Target Id */
  targetId?: string;
  /** Solution dependencies */
  dependencies?: SolutionDependencyParameter[];
}

export function solutionDependencyParameterSerializer(item: SolutionDependencyParameter): any {
  return {
    solutionVersionId: item["solutionVersionId"],
    solutionTemplateId: item["solutionTemplateId"],
    solutionTemplateVersion: item["solutionTemplateVersion"],
    solutionInstanceName: item["solutionInstanceName"],
    targetId: item["targetId"],
    dependencies: !item["dependencies"]
      ? item["dependencies"]
      : solutionDependencyParameterArraySerializer(item["dependencies"]),
  };
}

/** Resolved Configuration */
export interface ResolvedConfiguration {
  /** Resolved Configuration as string */
  configuration: string;
}

export function resolvedConfigurationDeserializer(item: any): ResolvedConfiguration {
  return {
    configuration: item["configuration"],
  };
}

/** Solution Version Parameter */
export interface SolutionVersionParameter {
  /** Solution Version ARM Id */
  solutionVersionId: string;
}

export function solutionVersionParameterSerializer(item: SolutionVersionParameter): any {
  return { solutionVersionId: item["solutionVersionId"] };
}

/** Update External Validation Status Parameter */
export interface UpdateExternalValidationStatusParameter {
  /** Solution Version Id */
  solutionVersionId: string;
  /** Error Details if any failure is there */
  errorDetails?: ErrorDetail;
  /** External validation id */
  externalValidationId: string;
  /** Validation Status of external validation */
  validationStatus: ValidationStatus;
}

export function updateExternalValidationStatusParameterSerializer(
  item: UpdateExternalValidationStatusParameter,
): any {
  return {
    solutionVersionId: item["solutionVersionId"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailSerializer(item["errorDetails"]),
    externalValidationId: item["externalValidationId"],
    validationStatus: item["validationStatus"],
  };
}

/** Solution Instance Validation Status */
export enum KnownValidationStatus {
  /** Solution Instance is valid */
  Valid = "Valid",
  /** Solution Instance is invalid */
  Invalid = "Invalid",
}

/**
 * Solution Instance Validation Status \
 * {@link KnownValidationStatus} can be used interchangeably with ValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid**: Solution Instance is valid \
 * **Invalid**: Solution Instance is invalid
 */
export type ValidationStatus = string;

/** Dynamic Schema Version Resource */
export interface DynamicSchemaVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaVersionProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function dynamicSchemaVersionSerializer(item: DynamicSchemaVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schemaVersionPropertiesSerializer(item["properties"]),
  };
}

export function dynamicSchemaVersionDeserializer(item: any): DynamicSchemaVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : schemaVersionPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The response of a DynamicSchemaVersion list operation. */
export interface _DynamicSchemaVersionListResult {
  /** The DynamicSchemaVersion items on this page */
  value: DynamicSchemaVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dynamicSchemaVersionListResultDeserializer(
  item: any,
): _DynamicSchemaVersionListResult {
  return {
    value: dynamicSchemaVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dynamicSchemaVersionArraySerializer(result: Array<DynamicSchemaVersion>): any[] {
  return result.map((item) => {
    return dynamicSchemaVersionSerializer(item);
  });
}

export function dynamicSchemaVersionArrayDeserializer(result: Array<DynamicSchemaVersion>): any[] {
  return result.map((item) => {
    return dynamicSchemaVersionDeserializer(item);
  });
}

/** Schema Reference Resource */
export interface SchemaReference extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: SchemaReferenceProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function schemaReferenceDeserializer(item: any): SchemaReference {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : schemaReferencePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Schema Reference Properties */
export interface SchemaReferenceProperties {
  /** Schema Id of schema reference */
  schemaId: string;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function schemaReferencePropertiesDeserializer(item: any): SchemaReferenceProperties {
  return {
    schemaId: item["schemaId"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a SchemaReference list operation. */
export interface _SchemaReferenceListResult {
  /** The SchemaReference items on this page */
  value: SchemaReference[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaReferenceListResultDeserializer(item: any): _SchemaReferenceListResult {
  return {
    value: schemaReferenceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaReferenceArrayDeserializer(result: Array<SchemaReference>): any[] {
  return result.map((item) => {
    return schemaReferenceDeserializer(item);
  });
}

/** Solution Resource attached to a Target */
export interface Solution extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SolutionProperties;
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function solutionSerializer(item: Solution): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : solutionPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function solutionDeserializer(item: any): Solution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : solutionPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** Solution Properties */
export interface SolutionProperties {
  /** Solution template Id */
  readonly solutionTemplateId?: string;
  /** List of latest revisions for available solution template versions */
  readonly availableSolutionTemplateVersions?: AvailableSolutionTemplateVersion[];
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function solutionPropertiesSerializer(item: SolutionProperties): any {
  return item;
}

export function solutionPropertiesDeserializer(item: any): SolutionProperties {
  return {
    solutionTemplateId: item["solutionTemplateId"],
    availableSolutionTemplateVersions: !item["availableSolutionTemplateVersions"]
      ? item["availableSolutionTemplateVersions"]
      : availableSolutionTemplateVersionArrayDeserializer(
          item["availableSolutionTemplateVersions"],
        ),
    provisioningState: item["provisioningState"],
  };
}

export function availableSolutionTemplateVersionArrayDeserializer(
  result: Array<AvailableSolutionTemplateVersion>,
): any[] {
  return result.map((item) => {
    return availableSolutionTemplateVersionDeserializer(item);
  });
}

/** Available Solution template Version along with latest revision */
export interface AvailableSolutionTemplateVersion {
  /** Solution template Version */
  solutionTemplateVersion: string;
  /** Latest Configuration Revision */
  latestConfigRevision: string;
  /** Has this solution template version been configured */
  isConfigured: boolean;
}

export function availableSolutionTemplateVersionDeserializer(
  item: any,
): AvailableSolutionTemplateVersion {
  return {
    solutionTemplateVersion: item["solutionTemplateVersion"],
    latestConfigRevision: item["latestConfigRevision"],
    isConfigured: item["isConfigured"],
  };
}

/** The type used for update operations of the Solution. */
export interface SolutionUpdate {
  /** The resource-specific properties for this resource. */
  properties?: SolutionUpdateProperties;
}

export function solutionUpdateSerializer(item: SolutionUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : solutionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Solution. */
export interface SolutionUpdateProperties {}

export function solutionUpdatePropertiesSerializer(item: SolutionUpdateProperties): any {
  return item;
}

/** The response of a Solution list operation. */
export interface _SolutionListResult {
  /** The Solution items on this page */
  value: Solution[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _solutionListResultDeserializer(item: any): _SolutionListResult {
  return {
    value: solutionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function solutionArraySerializer(result: Array<Solution>): any[] {
  return result.map((item) => {
    return solutionSerializer(item);
  });
}

export function solutionArrayDeserializer(result: Array<Solution>): any[] {
  return result.map((item) => {
    return solutionDeserializer(item);
  });
}

/** Solution Template Version Resource. Contains configurations that use expressions which can be resolved hierarchically along with edge specifications. */
export interface SolutionTemplateVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SolutionTemplateVersionProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function solutionTemplateVersionSerializer(item: SolutionTemplateVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : solutionTemplateVersionPropertiesSerializer(item["properties"]),
  };
}

export function solutionTemplateVersionDeserializer(item: any): SolutionTemplateVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : solutionTemplateVersionPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Solution Template Version Properties */
export interface SolutionTemplateVersionProperties {
  /** Config expressions for this solution version */
  configurations: string;
  /** App components spec */
  specification: Record<string, any>;
  /** Orchestrator type */
  orchestratorType?: OrchestratorType;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function solutionTemplateVersionPropertiesSerializer(
  item: SolutionTemplateVersionProperties,
): any {
  return {
    configurations: item["configurations"],
    specification: item["specification"],
    orchestratorType: item["orchestratorType"],
  };
}

export function solutionTemplateVersionPropertiesDeserializer(
  item: any,
): SolutionTemplateVersionProperties {
  return {
    configurations: item["configurations"],
    specification: item["specification"],
    orchestratorType: item["orchestratorType"],
    provisioningState: item["provisioningState"],
  };
}

/** Available Orchestrator types */
export enum KnownOrchestratorType {
  /** Default type */
  TO = "TO",
}

/**
 * Available Orchestrator types \
 * {@link KnownOrchestratorType} can be used interchangeably with OrchestratorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TO**: Default type
 */
export type OrchestratorType = string;

/** The response of a SolutionTemplateVersion list operation. */
export interface _SolutionTemplateVersionListResult {
  /** The SolutionTemplateVersion items on this page */
  value: SolutionTemplateVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _solutionTemplateVersionListResultDeserializer(
  item: any,
): _SolutionTemplateVersionListResult {
  return {
    value: solutionTemplateVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function solutionTemplateVersionArraySerializer(
  result: Array<SolutionTemplateVersion>,
): any[] {
  return result.map((item) => {
    return solutionTemplateVersionSerializer(item);
  });
}

export function solutionTemplateVersionArrayDeserializer(
  result: Array<SolutionTemplateVersion>,
): any[] {
  return result.map((item) => {
    return solutionTemplateVersionDeserializer(item);
  });
}

/** Bulk deploy solution parameter */
export interface BulkDeploySolutionParameter {
  /** Targets to which solution needs to be deployed */
  targets: BulkDeployTargetDetails[];
}

export function bulkDeploySolutionParameterSerializer(item: BulkDeploySolutionParameter): any {
  return { targets: bulkDeployTargetDetailsArraySerializer(item["targets"]) };
}

export function bulkDeployTargetDetailsArraySerializer(
  result: Array<BulkDeployTargetDetails>,
): any[] {
  return result.map((item) => {
    return bulkDeployTargetDetailsSerializer(item);
  });
}

/** Bulk deploy target details */
export interface BulkDeployTargetDetails {
  /** ArmId of Target Solution Version */
  solutionVersionId: string;
}

export function bulkDeployTargetDetailsSerializer(item: BulkDeployTargetDetails): any {
  return { solutionVersionId: item["solutionVersionId"] };
}

/** Bulk publish solution parameter */
export interface BulkPublishSolutionParameter {
  /** Targets to which solution needs to be published */
  targets: BulkPublishTargetDetails[];
  /** Name of the solution instance */
  solutionInstanceName?: string;
  /** Solution dependencies */
  solutionDependencies?: SolutionDependencyParameter[];
}

export function bulkPublishSolutionParameterSerializer(item: BulkPublishSolutionParameter): any {
  return {
    targets: bulkPublishTargetDetailsArraySerializer(item["targets"]),
    solutionInstanceName: item["solutionInstanceName"],
    solutionDependencies: !item["solutionDependencies"]
      ? item["solutionDependencies"]
      : solutionDependencyParameterArraySerializer(item["solutionDependencies"]),
  };
}

export function bulkPublishTargetDetailsArraySerializer(
  result: Array<BulkPublishTargetDetails>,
): any[] {
  return result.map((item) => {
    return bulkPublishTargetDetailsSerializer(item);
  });
}

/** Bulk publish target details */
export interface BulkPublishTargetDetails {
  /** ArmId of Target */
  targetId: string;
  /** Name of the solution instance */
  solutionInstanceName?: string;
}

export function bulkPublishTargetDetailsSerializer(item: BulkPublishTargetDetails): any {
  return {
    targetId: item["targetId"],
    solutionInstanceName: item["solutionInstanceName"],
  };
}

/** Solution Template Resource. Contains capabilities and operations for creating versions. */
export interface SolutionTemplate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SolutionTemplateProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function solutionTemplateSerializer(item: SolutionTemplate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : solutionTemplatePropertiesSerializer(item["properties"]),
  };
}

export function solutionTemplateDeserializer(item: any): SolutionTemplate {
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
      : solutionTemplatePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Solution Template Properties */
export interface SolutionTemplateProperties {
  /** Description of Solution template */
  description: string;
  /** List of capabilities */
  capabilities: string[];
  /** Latest solution template version */
  readonly latestVersion?: string;
  /** State of resource */
  state?: ResourceState;
  /** Flag to enable external validation */
  enableExternalValidation?: boolean;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function solutionTemplatePropertiesSerializer(item: SolutionTemplateProperties): any {
  return {
    description: item["description"],
    capabilities: item["capabilities"].map((p: any) => {
      return p;
    }),
    state: item["state"],
    enableExternalValidation: item["enableExternalValidation"],
  };
}

export function solutionTemplatePropertiesDeserializer(item: any): SolutionTemplateProperties {
  return {
    description: item["description"],
    capabilities: item["capabilities"].map((p: any) => {
      return p;
    }),
    latestVersion: item["latestVersion"],
    state: item["state"],
    enableExternalValidation: item["enableExternalValidation"],
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the SolutionTemplate. */
export interface SolutionTemplateUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: SolutionTemplateUpdateProperties;
}

export function solutionTemplateUpdateSerializer(item: SolutionTemplateUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : solutionTemplateUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the SolutionTemplate. */
export interface SolutionTemplateUpdateProperties {
  /** Description of Solution template */
  description?: string;
  /** List of capabilities */
  capabilities?: string[];
  /** State of resource */
  state?: ResourceState;
  /** Flag to enable external validation */
  enableExternalValidation?: boolean;
}

export function solutionTemplateUpdatePropertiesSerializer(
  item: SolutionTemplateUpdateProperties,
): any {
  return {
    description: item["description"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : item["capabilities"].map((p: any) => {
          return p;
        }),
    state: item["state"],
    enableExternalValidation: item["enableExternalValidation"],
  };
}

/** Solution Template Version With Update Type */
export interface SolutionTemplateVersionWithUpdateType {
  /** Update type */
  updateType?: UpdateType;
  /** Version to create */
  version?: string;
  /** Solution Template Version */
  solutionTemplateVersion: SolutionTemplateVersion;
}

export function solutionTemplateVersionWithUpdateTypeSerializer(
  item: SolutionTemplateVersionWithUpdateType,
): any {
  return {
    updateType: item["updateType"],
    version: item["version"],
    solutionTemplateVersion: solutionTemplateVersionSerializer(item["solutionTemplateVersion"]),
  };
}

/** The response of a SolutionTemplate list operation. */
export interface _SolutionTemplateListResult {
  /** The SolutionTemplate items on this page */
  value: SolutionTemplate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _solutionTemplateListResultDeserializer(item: any): _SolutionTemplateListResult {
  return {
    value: solutionTemplateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function solutionTemplateArraySerializer(result: Array<SolutionTemplate>): any[] {
  return result.map((item) => {
    return solutionTemplateSerializer(item);
  });
}

export function solutionTemplateArrayDeserializer(result: Array<SolutionTemplate>): any[] {
  return result.map((item) => {
    return solutionTemplateDeserializer(item);
  });
}

/** Instance Resource. Represents a deployment object. */
export interface Instance extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: InstanceProperties;
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function instanceSerializer(item: Instance): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : instancePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function instanceDeserializer(item: any): Instance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : instancePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** Instance Properties */
export interface InstanceProperties {
  /** Solution version of instance */
  solutionVersionId: string;
  /** Target of instance */
  targetId: string;
  /** State of instance */
  activeState?: ActiveState;
  /** Reconciliation policy of instance */
  reconciliationPolicy?: ReconciliationPolicyProperties;
  /** Scope of instance */
  solutionScope?: string;
  /** Status of instance */
  readonly status?: DeploymentStatus;
  /** Deployment timestamp of instance */
  readonly deploymentTimestampEpoch?: number;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function instancePropertiesSerializer(item: InstanceProperties): any {
  return {
    solutionVersionId: item["solutionVersionId"],
    targetId: item["targetId"],
    activeState: item["activeState"],
    reconciliationPolicy: !item["reconciliationPolicy"]
      ? item["reconciliationPolicy"]
      : reconciliationPolicyPropertiesSerializer(item["reconciliationPolicy"]),
    solutionScope: item["solutionScope"],
  };
}

export function instancePropertiesDeserializer(item: any): InstanceProperties {
  return {
    solutionVersionId: item["solutionVersionId"],
    targetId: item["targetId"],
    activeState: item["activeState"],
    reconciliationPolicy: !item["reconciliationPolicy"]
      ? item["reconciliationPolicy"]
      : reconciliationPolicyPropertiesDeserializer(item["reconciliationPolicy"]),
    solutionScope: item["solutionScope"],
    status: !item["status"] ? item["status"] : deploymentStatusDeserializer(item["status"]),
    deploymentTimestampEpoch: item["deploymentTimestampEpoch"],
    provisioningState: item["provisioningState"],
  };
}

/** Instance State */
export enum KnownActiveState {
  /** Instance is active */
  Active = "active",
  /** Instance is inactive */
  Inactive = "inactive",
}

/**
 * Instance State \
 * {@link KnownActiveState} can be used interchangeably with ActiveState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active**: Instance is active \
 * **inactive**: Instance is inactive
 */
export type ActiveState = string;

/** Defines a ReconciliationPolicy */
export interface ReconciliationPolicyProperties {
  /** The state of the ReconciliationPolicy */
  state: ReconciliationState;
  /** Policy interval */
  interval: string;
}

export function reconciliationPolicyPropertiesSerializer(
  item: ReconciliationPolicyProperties,
): any {
  return { state: item["state"], interval: item["interval"] };
}

export function reconciliationPolicyPropertiesDeserializer(
  item: any,
): ReconciliationPolicyProperties {
  return {
    state: item["state"],
    interval: item["interval"],
  };
}

/** Defines a state of the reconciliation policy. */
export enum KnownReconciliationState {
  /** Reconciliation is inactive */
  Inactive = "inactive",
  /** Reconciliation is active */
  Active = "active",
}

/**
 * Defines a state of the reconciliation policy. \
 * {@link KnownReconciliationState} can be used interchangeably with ReconciliationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **inactive**: Reconciliation is inactive \
 * **active**: Reconciliation is active
 */
export type ReconciliationState = string;

/** The response of a Instance list operation. */
export interface _InstanceListResult {
  /** The Instance items on this page */
  value: Instance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _instanceListResultDeserializer(item: any): _InstanceListResult {
  return {
    value: instanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function instanceArraySerializer(result: Array<Instance>): any[] {
  return result.map((item) => {
    return instanceSerializer(item);
  });
}

export function instanceArrayDeserializer(result: Array<Instance>): any[] {
  return result.map((item) => {
    return instanceDeserializer(item);
  });
}

/** InstanceHistory Resource */
export interface InstanceHistory extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: InstanceHistoryProperties;
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function instanceHistoryDeserializer(item: any): InstanceHistory {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : instanceHistoryPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** Instance History Properties */
export interface InstanceHistoryProperties {
  /** Solution version of instance */
  readonly solutionVersion: SolutionVersionSnapshot;
  /** Target of instance */
  readonly target: TargetSnapshot;
  /** Scope of instance */
  readonly solutionScope?: string;
  /** State of instance */
  activeState?: ActiveState;
  /** Reconciliation policy of instance */
  readonly reconciliationPolicy?: ReconciliationPolicyProperties;
  /** Deployment Status of instance */
  readonly status?: DeploymentStatus;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function instanceHistoryPropertiesDeserializer(item: any): InstanceHistoryProperties {
  return {
    solutionVersion: solutionVersionSnapshotDeserializer(item["solutionVersion"]),
    target: targetSnapshotDeserializer(item["target"]),
    solutionScope: item["solutionScope"],
    activeState: item["activeState"],
    reconciliationPolicy: !item["reconciliationPolicy"]
      ? item["reconciliationPolicy"]
      : reconciliationPolicyPropertiesDeserializer(item["reconciliationPolicy"]),
    status: !item["status"] ? item["status"] : deploymentStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** Solution Version Snapshot */
export interface SolutionVersionSnapshot {
  /** Solution version of instance */
  solutionVersionId?: string;
  /** App components spec */
  specification?: Record<string, any>;
}

export function solutionVersionSnapshotDeserializer(item: any): SolutionVersionSnapshot {
  return {
    solutionVersionId: item["solutionVersionId"],
    specification: item["specification"],
  };
}

/** Target Snapshot */
export interface TargetSnapshot {
  /** Target of instance */
  targetId?: string;
  /** target spec */
  targetSpecification?: Record<string, any>;
  /** Scope of the target resource */
  solutionScope?: string;
}

export function targetSnapshotDeserializer(item: any): TargetSnapshot {
  return {
    targetId: item["targetId"],
    targetSpecification: item["targetSpecification"],
    solutionScope: item["solutionScope"],
  };
}

/** The response of a InstanceHistory list operation. */
export interface _InstanceHistoryListResult {
  /** The InstanceHistory items on this page */
  value: InstanceHistory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _instanceHistoryListResultDeserializer(item: any): _InstanceHistoryListResult {
  return {
    value: instanceHistoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function instanceHistoryArrayDeserializer(result: Array<InstanceHistory>): any[] {
  return result.map((item) => {
    return instanceHistoryDeserializer(item);
  });
}

/** Config Template Resource. Contains configuration expressions using the predefined expression language. */
export interface ConfigTemplate extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ConfigTemplateProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function configTemplateSerializer(item: ConfigTemplate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : configTemplatePropertiesSerializer(item["properties"]),
  };
}

export function configTemplateDeserializer(item: any): ConfigTemplate {
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
      : configTemplatePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Config Template Properties */
export interface ConfigTemplateProperties {
  /** Description of config template */
  description: string;
  /** Latest config template version */
  readonly latestVersion?: string;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function configTemplatePropertiesSerializer(item: ConfigTemplateProperties): any {
  return { description: item["description"] };
}

export function configTemplatePropertiesDeserializer(item: any): ConfigTemplateProperties {
  return {
    description: item["description"],
    latestVersion: item["latestVersion"],
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the ConfigTemplate. */
export interface ConfigTemplateUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: ConfigTemplateUpdateProperties;
}

export function configTemplateUpdateSerializer(item: ConfigTemplateUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : configTemplateUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the ConfigTemplate. */
export interface ConfigTemplateUpdateProperties {
  /** Description of config template */
  description?: string;
}

export function configTemplateUpdatePropertiesSerializer(
  item: ConfigTemplateUpdateProperties,
): any {
  return { description: item["description"] };
}

/** Config Template Version With Update Type */
export interface ConfigTemplateVersionWithUpdateType {
  /** Update type */
  updateType?: UpdateType;
  /** Version to create */
  version?: string;
  /** Config Template Version */
  configTemplateVersion: ConfigTemplateVersion;
}

export function configTemplateVersionWithUpdateTypeSerializer(
  item: ConfigTemplateVersionWithUpdateType,
): any {
  return {
    updateType: item["updateType"],
    version: item["version"],
    configTemplateVersion: configTemplateVersionSerializer(item["configTemplateVersion"]),
  };
}

/** Config Template Version Resource */
export interface ConfigTemplateVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ConfigTemplateVersionProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function configTemplateVersionSerializer(item: ConfigTemplateVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : configTemplateVersionPropertiesSerializer(item["properties"]),
  };
}

export function configTemplateVersionDeserializer(item: any): ConfigTemplateVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : configTemplateVersionPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** Config Template Version Properties */
export interface ConfigTemplateVersionProperties {
  /** Configuration values */
  configurations: string;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function configTemplateVersionPropertiesSerializer(
  item: ConfigTemplateVersionProperties,
): any {
  return { configurations: item["configurations"] };
}

export function configTemplateVersionPropertiesDeserializer(
  item: any,
): ConfigTemplateVersionProperties {
  return {
    configurations: item["configurations"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a ConfigTemplate list operation. */
export interface _ConfigTemplateListResult {
  /** The ConfigTemplate items on this page */
  value: ConfigTemplate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _configTemplateListResultDeserializer(item: any): _ConfigTemplateListResult {
  return {
    value: configTemplateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configTemplateArraySerializer(result: Array<ConfigTemplate>): any[] {
  return result.map((item) => {
    return configTemplateSerializer(item);
  });
}

export function configTemplateArrayDeserializer(result: Array<ConfigTemplate>): any[] {
  return result.map((item) => {
    return configTemplateDeserializer(item);
  });
}

/** The response of a ConfigTemplateVersion list operation. */
export interface _ConfigTemplateVersionListResult {
  /** The ConfigTemplateVersion items on this page */
  value: ConfigTemplateVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _configTemplateVersionListResultDeserializer(
  item: any,
): _ConfigTemplateVersionListResult {
  return {
    value: configTemplateVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configTemplateVersionArraySerializer(result: Array<ConfigTemplateVersion>): any[] {
  return result.map((item) => {
    return configTemplateVersionSerializer(item);
  });
}

export function configTemplateVersionArrayDeserializer(
  result: Array<ConfigTemplateVersion>,
): any[] {
  return result.map((item) => {
    return configTemplateVersionDeserializer(item);
  });
}

/** Workflow Resource */
export interface Workflow extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkflowProperties;
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function workflowSerializer(item: Workflow): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workflowPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function workflowDeserializer(item: any): Workflow {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workflowPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** Workflow Properties */
export interface WorkflowProperties {
  /** Workflow template Id */
  readonly workflowTemplateId?: string;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function workflowPropertiesSerializer(item: WorkflowProperties): any {
  return item;
}

export function workflowPropertiesDeserializer(item: any): WorkflowProperties {
  return {
    workflowTemplateId: item["workflowTemplateId"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a Workflow list operation. */
export interface _WorkflowListResult {
  /** The Workflow items on this page */
  value: Workflow[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowListResultDeserializer(item: any): _WorkflowListResult {
  return {
    value: workflowArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowArraySerializer(result: Array<Workflow>): any[] {
  return result.map((item) => {
    return workflowSerializer(item);
  });
}

export function workflowArrayDeserializer(result: Array<Workflow>): any[] {
  return result.map((item) => {
    return workflowDeserializer(item);
  });
}

/** Workflow Version Resource */
export interface WorkflowVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkflowVersionProperties;
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function workflowVersionSerializer(item: WorkflowVersion): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workflowVersionPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function workflowVersionDeserializer(item: any): WorkflowVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workflowVersionPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** Workflow Version Properties */
export interface WorkflowVersionProperties {
  /** Revision number of resolved config for this workflow version */
  readonly revision?: number;
  /** Resolved configuration values */
  readonly configuration?: string;
  /** A list of stage specs */
  stageSpec: StageSpec[];
  /** Review id of resolved config for this workflow version */
  readonly reviewId?: string;
  /** State of workflow version */
  readonly state?: State;
  /** Execution specification */
  specification?: Record<string, any>;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function workflowVersionPropertiesSerializer(item: WorkflowVersionProperties): any {
  return {
    stageSpec: stageSpecArraySerializer(item["stageSpec"]),
    specification: item["specification"],
  };
}

export function workflowVersionPropertiesDeserializer(item: any): WorkflowVersionProperties {
  return {
    revision: item["revision"],
    configuration: item["configuration"],
    stageSpec: stageSpecArrayDeserializer(item["stageSpec"]),
    reviewId: item["reviewId"],
    state: item["state"],
    specification: item["specification"],
    provisioningState: item["provisioningState"],
  };
}

export function stageSpecArraySerializer(result: Array<StageSpec>): any[] {
  return result.map((item) => {
    return stageSpecSerializer(item);
  });
}

export function stageSpecArrayDeserializer(result: Array<StageSpec>): any[] {
  return result.map((item) => {
    return stageSpecDeserializer(item);
  });
}

/** Stage Properties */
export interface StageSpec {
  /** Name of Stage */
  name: string;
  /** Stage specification */
  specification?: Record<string, any>;
  /** List of tasks in the stage */
  tasks?: TaskSpec[];
  /** Task option for the stage */
  taskOption?: TaskOption;
}

export function stageSpecSerializer(item: StageSpec): any {
  return {
    name: item["name"],
    specification: item["specification"],
    tasks: !item["tasks"] ? item["tasks"] : taskSpecArraySerializer(item["tasks"]),
    taskOption: !item["taskOption"] ? item["taskOption"] : taskOptionSerializer(item["taskOption"]),
  };
}

export function stageSpecDeserializer(item: any): StageSpec {
  return {
    name: item["name"],
    specification: item["specification"],
    tasks: !item["tasks"] ? item["tasks"] : taskSpecArrayDeserializer(item["tasks"]),
    taskOption: !item["taskOption"]
      ? item["taskOption"]
      : taskOptionDeserializer(item["taskOption"]),
  };
}

export function taskSpecArraySerializer(result: Array<TaskSpec>): any[] {
  return result.map((item) => {
    return taskSpecSerializer(item);
  });
}

export function taskSpecArrayDeserializer(result: Array<TaskSpec>): any[] {
  return result.map((item) => {
    return taskSpecDeserializer(item);
  });
}

/** Task Spec */
export interface TaskSpec {
  /** Name of Task */
  name: string;
  /** Target ARM id */
  targetId?: string;
  /** Task specification */
  specification: Record<string, any>;
}

export function taskSpecSerializer(item: TaskSpec): any {
  return {
    name: item["name"],
    targetId: item["targetId"],
    specification: item["specification"],
  };
}

export function taskSpecDeserializer(item: any): TaskSpec {
  return {
    name: item["name"],
    targetId: item["targetId"],
    specification: item["specification"],
  };
}

/** Task Option Properties */
export interface TaskOption {
  /** Parallel worker numbers of the tasks */
  concurrency?: number;
  /** Error action for the tasks */
  errorAction?: ErrorAction;
}

export function taskOptionSerializer(item: TaskOption): any {
  return {
    concurrency: item["concurrency"],
    errorAction: !item["errorAction"]
      ? item["errorAction"]
      : errorActionSerializer(item["errorAction"]),
  };
}

export function taskOptionDeserializer(item: any): TaskOption {
  return {
    concurrency: item["concurrency"],
    errorAction: !item["errorAction"]
      ? item["errorAction"]
      : errorActionDeserializer(item["errorAction"]),
  };
}

/** Error Action Properties */
export interface ErrorAction {
  /** Error action mode */
  mode?: ErrorActionMode;
  /** Max tolerated failures */
  maxToleratedFailures?: number;
}

export function errorActionSerializer(item: ErrorAction): any {
  return {
    mode: item["mode"],
    maxToleratedFailures: item["maxToleratedFailures"],
  };
}

export function errorActionDeserializer(item: any): ErrorAction {
  return {
    mode: item["mode"],
    maxToleratedFailures: item["maxToleratedFailures"],
  };
}

/** Error Action Mode */
export enum KnownErrorActionMode {
  /** Stop on any failure */
  StopOnAnyFailure = "stopOnAnyFailure",
  /** Stop after N cumulative failures */
  StopOnNFailures = "stopOnNFailures",
  /** Continue silently despite errors */
  SilentlyContinue = "silentlyContinue",
}

/**
 * Error Action Mode \
 * {@link KnownErrorActionMode} can be used interchangeably with ErrorActionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **stopOnAnyFailure**: Stop on any failure \
 * **stopOnNFailures**: Stop after N cumulative failures \
 * **silentlyContinue**: Continue silently despite errors
 */
export type ErrorActionMode = string;

/** The response of a WorkflowVersion list operation. */
export interface _WorkflowVersionListResult {
  /** The WorkflowVersion items on this page */
  value: WorkflowVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowVersionListResultDeserializer(item: any): _WorkflowVersionListResult {
  return {
    value: workflowVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowVersionArraySerializer(result: Array<WorkflowVersion>): any[] {
  return result.map((item) => {
    return workflowVersionSerializer(item);
  });
}

export function workflowVersionArrayDeserializer(result: Array<WorkflowVersion>): any[] {
  return result.map((item) => {
    return workflowVersionDeserializer(item);
  });
}

/** Execution Resource */
export interface Execution extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ExecutionProperties;
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function executionSerializer(item: Execution): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : executionPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function executionDeserializer(item: any): Execution {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : executionPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** Execution Properties */
export interface ExecutionProperties {
  /** Workflow version of execution */
  workflowVersionId: string;
  /** Execution specification */
  specification?: Record<string, any>;
  /** Status of Execution */
  readonly status?: ExecutionStatus;
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function executionPropertiesSerializer(item: ExecutionProperties): any {
  return {
    workflowVersionId: item["workflowVersionId"],
    specification: item["specification"],
  };
}

export function executionPropertiesDeserializer(item: any): ExecutionProperties {
  return {
    workflowVersionId: item["workflowVersionId"],
    specification: item["specification"],
    status: !item["status"] ? item["status"] : executionStatusDeserializer(item["status"]),
    provisioningState: item["provisioningState"],
  };
}

/** Execution Status */
export interface ExecutionStatus {
  /** The lastModified timestamp of the Status */
  updateTime?: Date;
  /** Deployment status */
  status?: number;
  /** status details */
  statusMessage?: string;
  /** target resource statuses */
  stageHistory?: StageStatus[];
}

export function executionStatusDeserializer(item: any): ExecutionStatus {
  return {
    updateTime: !item["updateTime"] ? item["updateTime"] : new Date(item["updateTime"]),
    status: item["status"],
    statusMessage: item["statusMessage"],
    stageHistory: !item["stageHistory"]
      ? item["stageHistory"]
      : stageStatusArrayDeserializer(item["stageHistory"]),
  };
}

export function stageStatusArrayDeserializer(result: Array<StageStatus>): any[] {
  return result.map((item) => {
    return stageStatusDeserializer(item);
  });
}

/** Result of Stage execution */
export interface StageStatus {
  /** Deployment status */
  status?: number;
  /** Status message */
  statusMessage?: string;
  /** Current stage */
  stage?: string;
  /** Next stage */
  nextstage?: string;
  /** Error message */
  errorMessage?: string;
  /** whether this stage is active or inactive */
  isActive?: ActiveState;
  /** The inputs of the StageHistory, Inputs holds a key-value map of user-defined parameters for the initial stage */
  inputs?: Record<string, any>;
  /** The outputs of the StageHistory, it is different as the different input stages. */
  outputs?: Record<string, any>;
}

export function stageStatusDeserializer(item: any): StageStatus {
  return {
    status: item["status"],
    statusMessage: item["statusMessage"],
    stage: item["stage"],
    nextstage: item["nextstage"],
    errorMessage: item["errorMessage"],
    isActive: item["isActive"],
    inputs: item["inputs"],
    outputs: item["outputs"],
  };
}

/** The response of a Execution list operation. */
export interface _ExecutionListResult {
  /** The Execution items on this page */
  value: Execution[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _executionListResultDeserializer(item: any): _ExecutionListResult {
  return {
    value: executionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function executionArraySerializer(result: Array<Execution>): any[] {
  return result.map((item) => {
    return executionSerializer(item);
  });
}

export function executionArrayDeserializer(result: Array<Execution>): any[] {
  return result.map((item) => {
    return executionDeserializer(item);
  });
}

/** A Diagnostic resource. */
export interface Diagnostic extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: DiagnosticProperties;
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function diagnosticSerializer(item: Diagnostic): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : diagnosticPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function diagnosticDeserializer(item: any): Diagnostic {
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
      : diagnosticPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** The properties of a Diagnostic resource. */
export interface DiagnosticProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function diagnosticPropertiesSerializer(item: DiagnosticProperties): any {
  return item;
}

export function diagnosticPropertiesDeserializer(item: any): DiagnosticProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the Diagnostic. */
export interface DiagnosticUpdate {
  /** The resource-specific properties for this resource. */
  properties?: DiagnosticUpdateProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function diagnosticUpdateSerializer(item: DiagnosticUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : diagnosticUpdatePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** The updatable properties of the Diagnostic. */
export interface DiagnosticUpdateProperties {}

export function diagnosticUpdatePropertiesSerializer(item: DiagnosticUpdateProperties): any {
  return item;
}

/** The response of a Diagnostic list operation. */
export interface _DiagnosticListResult {
  /** The Diagnostic items on this page */
  value: Diagnostic[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _diagnosticListResultDeserializer(item: any): _DiagnosticListResult {
  return {
    value: diagnosticArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diagnosticArraySerializer(result: Array<Diagnostic>): any[] {
  return result.map((item) => {
    return diagnosticSerializer(item);
  });
}

export function diagnosticArrayDeserializer(result: Array<Diagnostic>): any[] {
  return result.map((item) => {
    return diagnosticDeserializer(item);
  });
}

/** Context Resource */
export interface Context extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ContextProperties;
}

export function contextSerializer(item: Context): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : contextPropertiesSerializer(item["properties"]),
  };
}

export function contextDeserializer(item: any): Context {
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
      : contextPropertiesDeserializer(item["properties"]),
  };
}

/** Context Properties */
export interface ContextProperties {
  /** List of Capabilities */
  capabilities: Capability[];
  /** List of Hierarchies */
  hierarchies: Hierarchy[];
  /** Provisioning state of resource */
  readonly provisioningState?: ProvisioningState;
}

export function contextPropertiesSerializer(item: ContextProperties): any {
  return {
    capabilities: capabilityArraySerializer(item["capabilities"]),
    hierarchies: hierarchyArraySerializer(item["hierarchies"]),
  };
}

export function contextPropertiesDeserializer(item: any): ContextProperties {
  return {
    capabilities: capabilityArrayDeserializer(item["capabilities"]),
    hierarchies: hierarchyArrayDeserializer(item["hierarchies"]),
    provisioningState: item["provisioningState"],
  };
}

export function capabilityArraySerializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilitySerializer(item);
  });
}

export function capabilityArrayDeserializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilityDeserializer(item);
  });
}

/** Capability, to match in Solution Templates & Targets */
export interface Capability {
  /** Name of Capability */
  name: string;
  /** Description of Capability */
  description: string;
  /** State of resource */
  state?: ResourceState;
}

export function capabilitySerializer(item: Capability): any {
  return {
    name: item["name"],
    description: item["description"],
    state: item["state"],
  };
}

export function capabilityDeserializer(item: any): Capability {
  return {
    name: item["name"],
    description: item["description"],
    state: item["state"],
  };
}

export function hierarchyArraySerializer(result: Array<Hierarchy>): any[] {
  return result.map((item) => {
    return hierarchySerializer(item);
  });
}

export function hierarchyArrayDeserializer(result: Array<Hierarchy>): any[] {
  return result.map((item) => {
    return hierarchyDeserializer(item);
  });
}

/** Hierarchy, to tag Sites / Hierarchy Provider nodes with what they represent */
export interface Hierarchy {
  /** Name of Hierarchy */
  name: string;
  /** Description of Hierarchy */
  description: string;
}

export function hierarchySerializer(item: Hierarchy): any {
  return { name: item["name"], description: item["description"] };
}

export function hierarchyDeserializer(item: any): Hierarchy {
  return {
    name: item["name"],
    description: item["description"],
  };
}

/** The type used for update operations of the Context. */
export interface ContextUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: ContextUpdateProperties;
}

export function contextUpdateSerializer(item: ContextUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : contextUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Context. */
export interface ContextUpdateProperties {
  /** List of Capabilities */
  capabilities?: Capability[];
  /** List of Hierarchies */
  hierarchies?: Hierarchy[];
}

export function contextUpdatePropertiesSerializer(item: ContextUpdateProperties): any {
  return {
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArraySerializer(item["capabilities"]),
    hierarchies: !item["hierarchies"]
      ? item["hierarchies"]
      : hierarchyArraySerializer(item["hierarchies"]),
  };
}

/** The response of a Context list operation. */
export interface _ContextListResult {
  /** The Context items on this page */
  value: Context[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _contextListResultDeserializer(item: any): _ContextListResult {
  return {
    value: contextArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function contextArraySerializer(result: Array<Context>): any[] {
  return result.map((item) => {
    return contextSerializer(item);
  });
}

export function contextArrayDeserializer(result: Array<Context>): any[] {
  return result.map((item) => {
    return contextDeserializer(item);
  });
}

/** Site Reference Resource */
export interface SiteReference extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SiteReferenceProperties;
}

export function siteReferenceSerializer(item: SiteReference): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : siteReferencePropertiesSerializer(item["properties"]),
  };
}

export function siteReferenceDeserializer(item: any): SiteReference {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : siteReferencePropertiesDeserializer(item["properties"]),
  };
}

/** Site Reference Properties */
export interface SiteReferenceProperties {
  /** Azure Resource ID for Site */
  siteId: string;
  /** Provisioning State */
  readonly provisioningState?: ProvisioningState;
}

export function siteReferencePropertiesSerializer(item: SiteReferenceProperties): any {
  return { siteId: item["siteId"] };
}

export function siteReferencePropertiesDeserializer(item: any): SiteReferenceProperties {
  return {
    siteId: item["siteId"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a SiteReference list operation. */
export interface _SiteReferenceListResult {
  /** The SiteReference items on this page */
  value: SiteReference[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _siteReferenceListResultDeserializer(item: any): _SiteReferenceListResult {
  return {
    value: siteReferenceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function siteReferenceArraySerializer(result: Array<SiteReference>): any[] {
  return result.map((item) => {
    return siteReferenceSerializer(item);
  });
}

export function siteReferenceArrayDeserializer(result: Array<SiteReference>): any[] {
  return result.map((item) => {
    return siteReferenceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  V20250601 = "2025-06-01",
}
