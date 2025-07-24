// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Result of GET request to list Confluent operations. */
export interface _OperationListResult {
  /** List of Confluent operations supported by the Microsoft.Confluent provider. */
  value: OperationResult[];
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationResultArrayDeserializer(result: Array<OperationResult>): any[] {
  return result.map((item) => {
    return operationResultDeserializer(item);
  });
}

/** An Confluent REST API operation. */
export interface OperationResult {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** The object that represents the operation. */
  display?: OperationDisplay;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
}

export function operationResultDeserializer(item: any): OperationResult {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    isDataAction: item["isDataAction"],
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft.Confluent */
  provider?: string;
  /** Type on which the operation is performed, e.g., 'clusters'. */
  resource?: string;
  /** Operation type, e.g., read, write, delete, etc. */
  operation?: string;
  /** Description of the operation, e.g., 'Write confluent'. */
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

/** Default error response for resource provider */
export interface ResourceProviderDefaultErrorResponse {
  /** Response body of Error */
  readonly error?: ErrorResponseBody;
}

export function resourceProviderDefaultErrorResponseDeserializer(
  item: any,
): ResourceProviderDefaultErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseBodyDeserializer(item["error"]),
  };
}

/** Response body of Error */
export interface ErrorResponseBody {
  /** Error code */
  readonly code?: string;
  /** Error message */
  readonly message?: string;
  /** Error target */
  readonly target?: string;
  /** Error detail */
  readonly details?: ErrorResponseBody[];
}

export function errorResponseBodyDeserializer(item: any): ErrorResponseBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : errorResponseBodyArrayDeserializer(item["details"]),
  };
}

export function errorResponseBodyArrayDeserializer(result: Array<ErrorResponseBody>): any[] {
  return result.map((item) => {
    return errorResponseBodyDeserializer(item);
  });
}

/** Details API key */
export interface APIKeyRecord {
  /** Type of api key */
  kind?: string;
  /** Id of the api key */
  id?: string;
  /** API Key Properties */
  properties?: APIKeyProperties;
}

export function apiKeyRecordDeserializer(item: any): APIKeyRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : apiKeyPropertiesDeserializer(item["properties"]),
  };
}

/** API Key Properties */
export interface APIKeyProperties {
  /** Metadata of the record */
  metadata?: SCMetadataEntity;
  /** Specification of the API Key */
  spec?: APIKeySpecEntity;
}

export function apiKeyPropertiesDeserializer(item: any): APIKeyProperties {
  return {
    metadata: !item["metadata"] ? item["metadata"] : scMetadataEntityDeserializer(item["metadata"]),
    spec: !item["spec"] ? item["spec"] : apiKeySpecEntityDeserializer(item["spec"]),
  };
}

/** Metadata of the data record */
export interface SCMetadataEntity {
  /** Self lookup url */
  self?: string;
  /** Resource name of the record */
  resourceName?: string;
  /** Created Date Time */
  createdTimestamp?: string;
  /** Updated Date time */
  updatedTimestamp?: string;
  /** Deleted Date time */
  deletedTimestamp?: string;
}

export function scMetadataEntitySerializer(item: SCMetadataEntity): any {
  return {
    self: item["self"],
    resourceName: item["resourceName"],
    createdTimestamp: item["createdTimestamp"],
    updatedTimestamp: item["updatedTimestamp"],
    deletedTimestamp: item["deletedTimestamp"],
  };
}

export function scMetadataEntityDeserializer(item: any): SCMetadataEntity {
  return {
    self: item["self"],
    resourceName: item["resourceName"],
    createdTimestamp: item["createdTimestamp"],
    updatedTimestamp: item["updatedTimestamp"],
    deletedTimestamp: item["deletedTimestamp"],
  };
}

/** Spec of the API Key record */
export interface APIKeySpecEntity {
  /** The description of the API Key */
  description?: string;
  /** The name of the API Key */
  name?: string;
  /** API Key Secret */
  secret?: string;
  /** Specification of the cluster */
  resource?: APIKeyResourceEntity;
  /** Specification of the cluster */
  owner?: APIKeyOwnerEntity;
}

export function apiKeySpecEntityDeserializer(item: any): APIKeySpecEntity {
  return {
    description: item["description"],
    name: item["name"],
    secret: item["secret"],
    resource: !item["resource"]
      ? item["resource"]
      : apiKeyResourceEntityDeserializer(item["resource"]),
    owner: !item["owner"] ? item["owner"] : apiKeyOwnerEntityDeserializer(item["owner"]),
  };
}

/** API Key Resource details which can be kafka cluster or schema registry cluster */
export interface APIKeyResourceEntity {
  /** Id of the resource */
  id?: string;
  /** The environment of the api key */
  environment?: string;
  /** API URL for accessing or modifying the api key resource object */
  related?: string;
  /** CRN reference to the referred resource */
  resourceName?: string;
  /** Type of the owner which can be service or user account */
  kind?: string;
}

export function apiKeyResourceEntityDeserializer(item: any): APIKeyResourceEntity {
  return {
    id: item["id"],
    environment: item["environment"],
    related: item["related"],
    resourceName: item["resourceName"],
    kind: item["kind"],
  };
}

/** API Key Owner details which can be a user or service account */
export interface APIKeyOwnerEntity {
  /** API Key owner id */
  id?: string;
  /** API URL for accessing or modifying the referred object */
  related?: string;
  /** CRN reference to the referred resource */
  resourceName?: string;
  /** Type of the owner service or user account */
  kind?: string;
}

export function apiKeyOwnerEntityDeserializer(item: any): APIKeyOwnerEntity {
  return {
    id: item["id"],
    related: item["related"],
    resourceName: item["resourceName"],
    kind: item["kind"],
  };
}

/** Organization resource. */
export interface OrganizationResource extends TrackedResource {
  /** Organization resource properties */
  properties: OrganizationResourceProperties;
}

export function organizationResourceSerializer(item: OrganizationResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: organizationResourcePropertiesSerializer(item["properties"]),
  };
}

export function organizationResourceDeserializer(item: any): OrganizationResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: organizationResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Organization resource property */
export interface OrganizationResourceProperties {
  /** The creation time of the resource. */
  readonly createdTime?: Date;
  /** Provision states for confluent RP */
  readonly provisioningState?: ProvisionState;
  /** Id of the Confluent organization. */
  readonly organizationId?: string;
  /** SSO url for the Confluent organization. */
  readonly ssoUrl?: string;
  /** Confluent offer detail */
  offerDetail: OfferDetail;
  /** Subscriber detail */
  userDetail: UserDetail;
  /** Link an existing Confluent organization */
  linkOrganization?: LinkOrganization;
}

export function organizationResourcePropertiesSerializer(
  item: OrganizationResourceProperties,
): any {
  return {
    offerDetail: offerDetailSerializer(item["offerDetail"]),
    userDetail: userDetailSerializer(item["userDetail"]),
    linkOrganization: !item["linkOrganization"]
      ? item["linkOrganization"]
      : linkOrganizationSerializer(item["linkOrganization"]),
  };
}

export function organizationResourcePropertiesDeserializer(
  item: any,
): OrganizationResourceProperties {
  return {
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    provisioningState: item["provisioningState"],
    organizationId: item["organizationId"],
    ssoUrl: item["ssoUrl"],
    offerDetail: offerDetailDeserializer(item["offerDetail"]),
    userDetail: userDetailDeserializer(item["userDetail"]),
    linkOrganization: !item["linkOrganization"]
      ? item["linkOrganization"]
      : linkOrganizationDeserializer(item["linkOrganization"]),
  };
}

/** Provision states for confluent RP */
export enum KnownProvisionState {
  Accepted = "Accepted",
  Creating = "Creating",
  Updating = "Updating",
  Deleting = "Deleting",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
  Deleted = "Deleted",
  NotSpecified = "NotSpecified",
}

/**
 * Provision states for confluent RP \
 * {@link KnownProvisionState} can be used interchangeably with ProvisionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Deleted** \
 * **NotSpecified**
 */
export type ProvisionState = string;

/** Confluent Offer detail */
export interface OfferDetail {
  /** Publisher Id */
  publisherId: string;
  /** Offer Id */
  id: string;
  /** Offer Plan Id */
  planId: string;
  /** Offer Plan Name */
  planName: string;
  /** Offer Plan Term unit */
  termUnit: string;
  /** Offer Plan Term Id */
  termId?: string;
  /** Private Offer Id */
  privateOfferId?: string;
  /** Array of Private Offer Ids */
  privateOfferIds?: string[];
  /** SaaS Offer Status */
  status?: SaaSOfferStatus;
}

export function offerDetailSerializer(item: OfferDetail): any {
  return {
    publisherId: item["publisherId"],
    id: item["id"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
    privateOfferId: item["privateOfferId"],
    privateOfferIds: !item["privateOfferIds"]
      ? item["privateOfferIds"]
      : item["privateOfferIds"].map((p: any) => {
          return p;
        }),
    status: item["status"],
  };
}

export function offerDetailDeserializer(item: any): OfferDetail {
  return {
    publisherId: item["publisherId"],
    id: item["id"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
    privateOfferId: item["privateOfferId"],
    privateOfferIds: !item["privateOfferIds"]
      ? item["privateOfferIds"]
      : item["privateOfferIds"].map((p: any) => {
          return p;
        }),
    status: item["status"],
  };
}

/** SaaS Offer Status for confluent RP */
export enum KnownSaaSOfferStatus {
  Started = "Started",
  PendingFulfillmentStart = "PendingFulfillmentStart",
  InProgress = "InProgress",
  Subscribed = "Subscribed",
  Suspended = "Suspended",
  Reinstated = "Reinstated",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Unsubscribed = "Unsubscribed",
  Updating = "Updating",
}

/**
 * SaaS Offer Status for confluent RP \
 * {@link KnownSaaSOfferStatus} can be used interchangeably with SaaSOfferStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Started** \
 * **PendingFulfillmentStart** \
 * **InProgress** \
 * **Subscribed** \
 * **Suspended** \
 * **Reinstated** \
 * **Succeeded** \
 * **Failed** \
 * **Unsubscribed** \
 * **Updating**
 */
export type SaaSOfferStatus = string;

/** Subscriber detail */
export interface UserDetail {
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Email address */
  emailAddress: string;
  /** User principal name */
  userPrincipalName?: string;
  /** AAD email address */
  aadEmail?: string;
}

export function userDetailSerializer(item: UserDetail): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    userPrincipalName: item["userPrincipalName"],
    aadEmail: item["aadEmail"],
  };
}

export function userDetailDeserializer(item: any): UserDetail {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    userPrincipalName: item["userPrincipalName"],
    aadEmail: item["aadEmail"],
  };
}

/** Link an existing Confluent organization */
export interface LinkOrganization {
  /** User auth token */
  token: string;
}

export function linkOrganizationSerializer(item: LinkOrganization): any {
  return { token: item["token"] };
}

export function linkOrganizationDeserializer(item: any): LinkOrganization {
  return {
    token: item["token"],
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

/** Organization Resource update */
export interface OrganizationResourceUpdate {
  /** ARM resource tags */
  tags?: Record<string, string>;
}

export function organizationResourceUpdateSerializer(item: OrganizationResourceUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a OrganizationResource list operation. */
export interface _OrganizationResourceListResult {
  /** The OrganizationResource items on this page */
  value: OrganizationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _organizationResourceListResultDeserializer(
  item: any,
): _OrganizationResourceListResult {
  return {
    value: organizationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function organizationResourceArraySerializer(result: Array<OrganizationResource>): any[] {
  return result.map((item) => {
    return organizationResourceSerializer(item);
  });
}

export function organizationResourceArrayDeserializer(result: Array<OrganizationResource>): any[] {
  return result.map((item) => {
    return organizationResourceDeserializer(item);
  });
}

/** List Access Request Model */
export interface ListAccessRequestModel {
  /** Search filters for the request */
  searchFilters?: Record<string, string>;
}

export function listAccessRequestModelSerializer(item: ListAccessRequestModel): any {
  return { searchFilters: item["searchFilters"] };
}

/** Result of POST request to list regions supported by confluent */
export interface ListRegionsSuccessResponse {
  /** List of regions supported by confluent */
  data?: RegionRecord[];
}

export function listRegionsSuccessResponseDeserializer(item: any): ListRegionsSuccessResponse {
  return {
    data: !item["data"] ? item["data"] : regionRecordArrayDeserializer(item["data"]),
  };
}

export function regionRecordArrayDeserializer(result: Array<RegionRecord>): any[] {
  return result.map((item) => {
    return regionRecordDeserializer(item);
  });
}

/** Details of region record */
export interface RegionRecord {
  /** Kind of the cluster */
  kind?: string;
  /** Id of the cluster */
  id?: string;
  /** Region Properties */
  properties?: RegionProperties;
}

export function regionRecordDeserializer(item: any): RegionRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : regionPropertiesDeserializer(item["properties"]),
  };
}

/** Region Properties */
export interface RegionProperties {
  /** Metadata of the record */
  metadata?: SCMetadataEntity;
  /** Specification of the region */
  spec?: RegionSpecEntity;
}

export function regionPropertiesDeserializer(item: any): RegionProperties {
  return {
    metadata: !item["metadata"] ? item["metadata"] : scMetadataEntityDeserializer(item["metadata"]),
    spec: !item["spec"] ? item["spec"] : regionSpecEntityDeserializer(item["spec"]),
  };
}

/** Region spec details */
export interface RegionSpecEntity {
  /** Display Name of the region */
  name?: string;
  /** Cloud provider name */
  cloud?: string;
  /** Region name */
  regionName?: string;
  packages?: string[];
}

export function regionSpecEntityDeserializer(item: any): RegionSpecEntity {
  return {
    name: item["name"],
    cloud: item["cloud"],
    regionName: item["regionName"],
    packages: !item["packages"]
      ? item["packages"]
      : item["packages"].map((p: any) => {
          return p;
        }),
  };
}

/** Details about environment name, metadata and environment id of an environment */
export interface SCEnvironmentRecord extends ProxyResource {
  /** Type of environment */
  kind?: string;
  /** Environment properties */
  properties?: EnvironmentProperties;
}

export function scEnvironmentRecordSerializer(item: SCEnvironmentRecord): any {
  return {
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : environmentPropertiesSerializer(item["properties"]),
  };
}

export function scEnvironmentRecordDeserializer(item: any): SCEnvironmentRecord {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : environmentPropertiesDeserializer(item["properties"]),
  };
}

/** Environment resource property */
export interface EnvironmentProperties {
  /** Stream governance configuration */
  streamGovernanceConfig?: StreamGovernanceConfig;
  /** Metadata of the record */
  metadata?: SCMetadataEntity;
}

export function environmentPropertiesSerializer(item: EnvironmentProperties): any {
  return {
    streamGovernanceConfig: !item["streamGovernanceConfig"]
      ? item["streamGovernanceConfig"]
      : streamGovernanceConfigSerializer(item["streamGovernanceConfig"]),
    metadata: !item["metadata"] ? item["metadata"] : scMetadataEntitySerializer(item["metadata"]),
  };
}

export function environmentPropertiesDeserializer(item: any): EnvironmentProperties {
  return {
    streamGovernanceConfig: !item["streamGovernanceConfig"]
      ? item["streamGovernanceConfig"]
      : streamGovernanceConfigDeserializer(item["streamGovernanceConfig"]),
    metadata: !item["metadata"] ? item["metadata"] : scMetadataEntityDeserializer(item["metadata"]),
  };
}

/** Stream governance configuration */
export interface StreamGovernanceConfig {
  /** Stream governance configuration */
  package?: Package;
}

export function streamGovernanceConfigSerializer(item: StreamGovernanceConfig): any {
  return { package: item["package"] };
}

export function streamGovernanceConfigDeserializer(item: any): StreamGovernanceConfig {
  return {
    package: item["package"],
  };
}

/** Stream Governance Package. Supported values are ESSENTIALS and ADVANCED */
export enum KnownPackage {
  Essentials = "ESSENTIALS",
  Advanced = "ADVANCED",
}

/**
 * Stream Governance Package. Supported values are ESSENTIALS and ADVANCED \
 * {@link KnownPackage} can be used interchangeably with Package,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ESSENTIALS** \
 * **ADVANCED**
 */
export type Package = string;

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

/** Result of GET request to list Confluent operations. */
export interface _GetEnvironmentsResponse {
  /** The SCEnvironmentRecord items on this page */
  value: SCEnvironmentRecord[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _getEnvironmentsResponseDeserializer(item: any): _GetEnvironmentsResponse {
  return {
    value: scEnvironmentRecordArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scEnvironmentRecordArraySerializer(result: Array<SCEnvironmentRecord>): any[] {
  return result.map((item) => {
    return scEnvironmentRecordSerializer(item);
  });
}

export function scEnvironmentRecordArrayDeserializer(result: Array<SCEnvironmentRecord>): any[] {
  return result.map((item) => {
    return scEnvironmentRecordDeserializer(item);
  });
}

/** Result of GET request to list schema registry clusters in the environment of a confluent organization */
export interface _ListSchemaRegistryClustersResponse {
  /** The SchemaRegistryClusterRecord items on this page */
  value: SchemaRegistryClusterRecord[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listSchemaRegistryClustersResponseDeserializer(
  item: any,
): _ListSchemaRegistryClustersResponse {
  return {
    value: schemaRegistryClusterRecordArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaRegistryClusterRecordArrayDeserializer(
  result: Array<SchemaRegistryClusterRecord>,
): any[] {
  return result.map((item) => {
    return schemaRegistryClusterRecordDeserializer(item);
  });
}

/** Details of schema registry cluster record */
export interface SchemaRegistryClusterRecord {
  /** Kind of the cluster */
  kind?: string;
  /** Id of the cluster */
  id?: string;
  /** Schema Registry Cluster Properties */
  properties?: SchemaRegistryClusterProperties;
}

export function schemaRegistryClusterRecordDeserializer(item: any): SchemaRegistryClusterRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : schemaRegistryClusterPropertiesDeserializer(item["properties"]),
  };
}

/** Schema Registry Cluster Properties */
export interface SchemaRegistryClusterProperties {
  /** Metadata of the record */
  metadata?: SCMetadataEntity;
  /** Specification of the schema registry cluster */
  spec?: SchemaRegistryClusterSpecEntity;
  /** Specification of the cluster status */
  status?: SchemaRegistryClusterStatusEntity;
}

export function schemaRegistryClusterPropertiesDeserializer(
  item: any,
): SchemaRegistryClusterProperties {
  return {
    metadata: !item["metadata"] ? item["metadata"] : scMetadataEntityDeserializer(item["metadata"]),
    spec: !item["spec"] ? item["spec"] : schemaRegistryClusterSpecEntityDeserializer(item["spec"]),
    status: !item["status"]
      ? item["status"]
      : schemaRegistryClusterStatusEntityDeserializer(item["status"]),
  };
}

/** Details of schema registry cluster spec */
export interface SchemaRegistryClusterSpecEntity {
  /** Name of the schema registry cluster */
  name?: string;
  /** Http endpoint of the cluster */
  httpEndpoint?: string;
  /** Type of the cluster package Advanced, essentials */
  package?: string;
  /** Region details of the schema registry cluster */
  region?: SchemaRegistryClusterEnvironmentRegionEntity;
  /** Environment details of the schema registry cluster */
  environment?: SchemaRegistryClusterEnvironmentRegionEntity;
  /** The cloud service provider */
  cloud?: string;
}

export function schemaRegistryClusterSpecEntityDeserializer(
  item: any,
): SchemaRegistryClusterSpecEntity {
  return {
    name: item["name"],
    httpEndpoint: item["httpEndpoint"],
    package: item["package"],
    region: !item["region"]
      ? item["region"]
      : schemaRegistryClusterEnvironmentRegionEntityDeserializer(item["region"]),
    environment: !item["environment"]
      ? item["environment"]
      : schemaRegistryClusterEnvironmentRegionEntityDeserializer(item["environment"]),
    cloud: item["cloud"],
  };
}

/** The environment associated with this object */
export interface SchemaRegistryClusterEnvironmentRegionEntity {
  /** ID of the referred resource */
  id?: string;
  /** API URL for accessing or modifying the referred object */
  related?: string;
  /** CRN reference to the referred resource */
  resourceName?: string;
}

export function schemaRegistryClusterEnvironmentRegionEntityDeserializer(
  item: any,
): SchemaRegistryClusterEnvironmentRegionEntity {
  return {
    id: item["id"],
    related: item["related"],
    resourceName: item["resourceName"],
  };
}

/** Status of the schema registry cluster record */
export interface SchemaRegistryClusterStatusEntity {
  /** The lifecycle phase of the cluster */
  phase?: string;
}

export function schemaRegistryClusterStatusEntityDeserializer(
  item: any,
): SchemaRegistryClusterStatusEntity {
  return {
    phase: item["phase"],
  };
}

/** Details of cluster record */
export interface SCClusterRecord extends ProxyResource {
  /** Type of cluster */
  kind?: string;
  /** Cluster Properties */
  properties?: ClusterProperties;
}

export function scClusterRecordSerializer(item: SCClusterRecord): any {
  return {
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesSerializer(item["properties"]),
  };
}

export function scClusterRecordDeserializer(item: any): SCClusterRecord {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : clusterPropertiesDeserializer(item["properties"]),
  };
}

/** Service Connector Cluster Properties */
export interface ClusterProperties {
  /** Metadata of the record */
  metadata?: SCMetadataEntity;
  /** Specification of the cluster */
  spec?: SCClusterSpecEntity;
  /** Specification of the cluster status */
  status?: ClusterStatusEntity;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    metadata: !item["metadata"] ? item["metadata"] : scMetadataEntitySerializer(item["metadata"]),
    spec: !item["spec"] ? item["spec"] : scClusterSpecEntitySerializer(item["spec"]),
    status: !item["status"] ? item["status"] : clusterStatusEntitySerializer(item["status"]),
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    metadata: !item["metadata"] ? item["metadata"] : scMetadataEntityDeserializer(item["metadata"]),
    spec: !item["spec"] ? item["spec"] : scClusterSpecEntityDeserializer(item["spec"]),
    status: !item["status"] ? item["status"] : clusterStatusEntityDeserializer(item["status"]),
  };
}

/** Spec of the cluster record */
export interface SCClusterSpecEntity {
  /** The name of the cluster */
  name?: string;
  /** The availability zone configuration of the cluster */
  availability?: string;
  /** The cloud service provider */
  cloud?: string;
  /** type of zone availability */
  zone?: string;
  /** Stream governance configuration */
  package?: Package;
  /** The cloud service provider region */
  region?: string;
  /** The bootstrap endpoint used by Kafka clients to connect to the cluster */
  kafkaBootstrapEndpoint?: string;
  /** The cluster HTTP request URL. */
  httpEndpoint?: string;
  /** The Kafka API cluster endpoint */
  apiEndpoint?: string;
  /** Specification of the cluster configuration */
  config?: ClusterConfigEntity;
  /** Specification of the cluster environment */
  environment?: SCClusterNetworkEnvironmentEntity;
  /** Specification of the cluster network */
  network?: SCClusterNetworkEnvironmentEntity;
  /** Specification of the cluster byok */
  byok?: SCClusterByokEntity;
}

export function scClusterSpecEntitySerializer(item: SCClusterSpecEntity): any {
  return {
    name: item["name"],
    availability: item["availability"],
    cloud: item["cloud"],
    zone: item["zone"],
    package: item["package"],
    region: item["region"],
    kafkaBootstrapEndpoint: item["kafkaBootstrapEndpoint"],
    httpEndpoint: item["httpEndpoint"],
    apiEndpoint: item["apiEndpoint"],
    config: !item["config"] ? item["config"] : clusterConfigEntitySerializer(item["config"]),
    environment: !item["environment"]
      ? item["environment"]
      : scClusterNetworkEnvironmentEntitySerializer(item["environment"]),
    network: !item["network"]
      ? item["network"]
      : scClusterNetworkEnvironmentEntitySerializer(item["network"]),
    byok: !item["byok"] ? item["byok"] : scClusterByokEntitySerializer(item["byok"]),
  };
}

export function scClusterSpecEntityDeserializer(item: any): SCClusterSpecEntity {
  return {
    name: item["name"],
    availability: item["availability"],
    cloud: item["cloud"],
    zone: item["zone"],
    package: item["package"],
    region: item["region"],
    kafkaBootstrapEndpoint: item["kafkaBootstrapEndpoint"],
    httpEndpoint: item["httpEndpoint"],
    apiEndpoint: item["apiEndpoint"],
    config: !item["config"] ? item["config"] : clusterConfigEntityDeserializer(item["config"]),
    environment: !item["environment"]
      ? item["environment"]
      : scClusterNetworkEnvironmentEntityDeserializer(item["environment"]),
    network: !item["network"]
      ? item["network"]
      : scClusterNetworkEnvironmentEntityDeserializer(item["network"]),
    byok: !item["byok"] ? item["byok"] : scClusterByokEntityDeserializer(item["byok"]),
  };
}

/** The configuration of the Kafka cluster */
export interface ClusterConfigEntity {
  /** The lifecycle phase of the cluster */
  kind?: string;
}

export function clusterConfigEntitySerializer(item: ClusterConfigEntity): any {
  return { kind: item["kind"] };
}

export function clusterConfigEntityDeserializer(item: any): ClusterConfigEntity {
  return {
    kind: item["kind"],
  };
}

/** The environment or the network to which cluster belongs */
export interface SCClusterNetworkEnvironmentEntity {
  /** ID of the referred resource */
  id?: string;
  /** Environment of the referred resource */
  environment?: string;
  /** API URL for accessing or modifying the referred object */
  related?: string;
  /** CRN reference to the referred resource */
  resourceName?: string;
}

export function scClusterNetworkEnvironmentEntitySerializer(
  item: SCClusterNetworkEnvironmentEntity,
): any {
  return {
    id: item["id"],
    environment: item["environment"],
    related: item["related"],
    resourceName: item["resourceName"],
  };
}

export function scClusterNetworkEnvironmentEntityDeserializer(
  item: any,
): SCClusterNetworkEnvironmentEntity {
  return {
    id: item["id"],
    environment: item["environment"],
    related: item["related"],
    resourceName: item["resourceName"],
  };
}

/** The network associated with this object */
export interface SCClusterByokEntity {
  /** ID of the referred resource */
  id?: string;
  /** API URL for accessing or modifying the referred object */
  related?: string;
  /** CRN reference to the referred resource */
  resourceName?: string;
}

export function scClusterByokEntitySerializer(item: SCClusterByokEntity): any {
  return {
    id: item["id"],
    related: item["related"],
    resourceName: item["resourceName"],
  };
}

export function scClusterByokEntityDeserializer(item: any): SCClusterByokEntity {
  return {
    id: item["id"],
    related: item["related"],
    resourceName: item["resourceName"],
  };
}

/** Status of the cluster record */
export interface ClusterStatusEntity {
  /** The lifecycle phase of the cluster */
  phase?: string;
  /** The number of Confluent Kafka Units */
  cku?: number;
}

export function clusterStatusEntitySerializer(item: ClusterStatusEntity): any {
  return { phase: item["phase"], cku: item["cku"] };
}

export function clusterStatusEntityDeserializer(item: any): ClusterStatusEntity {
  return {
    phase: item["phase"],
    cku: item["cku"],
  };
}

/** Result of GET request to list clusters in the environment of a confluent organization */
export interface _ListClustersSuccessResponse {
  /** The SCClusterRecord items on this page */
  value: SCClusterRecord[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listClustersSuccessResponseDeserializer(item: any): _ListClustersSuccessResponse {
  return {
    value: scClusterRecordArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scClusterRecordArraySerializer(result: Array<SCClusterRecord>): any[] {
  return result.map((item) => {
    return scClusterRecordSerializer(item);
  });
}

export function scClusterRecordArrayDeserializer(result: Array<SCClusterRecord>): any[] {
  return result.map((item) => {
    return scClusterRecordDeserializer(item);
  });
}

/** Create API Key model */
export interface CreateAPIKeyModel {
  /** Name of the API Key */
  name?: string;
  /** Description of the API Key */
  description?: string;
}

export function createAPIKeyModelSerializer(item: CreateAPIKeyModel): any {
  return { name: item["name"], description: item["description"] };
}

/** List users success response */
export interface AccessListUsersSuccessResponse {
  /** Type of response */
  kind?: string;
  /** Metadata of the list */
  metadata?: ConfluentListMetadata;
  /** Data of the users list */
  data?: UserRecord[];
}

export function accessListUsersSuccessResponseDeserializer(
  item: any,
): AccessListUsersSuccessResponse {
  return {
    kind: item["kind"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : confluentListMetadataDeserializer(item["metadata"]),
    data: !item["data"] ? item["data"] : userRecordArrayDeserializer(item["data"]),
  };
}

/** Metadata of the list */
export interface ConfluentListMetadata {
  /** First page of the list */
  first?: string;
  /** Last page of the list */
  last?: string;
  /** Previous page of the list */
  prev?: string;
  /** Next page of the list */
  next?: string;
  /** Total size of the list */
  totalSize?: number;
}

export function confluentListMetadataDeserializer(item: any): ConfluentListMetadata {
  return {
    first: item["first"],
    last: item["last"],
    prev: item["prev"],
    next: item["next"],
    totalSize: item["total_size"],
  };
}

export function userRecordArrayDeserializer(result: Array<UserRecord>): any[] {
  return result.map((item) => {
    return userRecordDeserializer(item);
  });
}

/** Record of the user */
export interface UserRecord {
  /** Type of account */
  kind?: string;
  /** Id of the user */
  id?: string;
  /** Metadata of the record */
  metadata?: MetadataEntity;
  /** Email of the user */
  email?: string;
  /** Name of the user */
  fullName?: string;
  /** Auth type of the user */
  authType?: string;
}

export function userRecordDeserializer(item: any): UserRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    metadata: !item["metadata"] ? item["metadata"] : metadataEntityDeserializer(item["metadata"]),
    email: item["email"],
    fullName: item["full_name"],
    authType: item["auth_type"],
  };
}

/** Metadata of the data record */
export interface MetadataEntity {
  /** Self lookup url */
  self?: string;
  /** Resource name of the record */
  resourceName?: string;
  /** Created Date Time */
  createdAt?: string;
  /** Updated Date time */
  updatedAt?: string;
  /** Deleted Date time */
  deletedAt?: string;
}

export function metadataEntityDeserializer(item: any): MetadataEntity {
  return {
    self: item["self"],
    resourceName: item["resource_name"],
    createdAt: item["created_at"],
    updatedAt: item["updated_at"],
    deletedAt: item["deleted_at"],
  };
}

/** List service accounts success response */
export interface AccessListServiceAccountsSuccessResponse {
  /** Type of response */
  kind?: string;
  /** Metadata of the list */
  metadata?: ConfluentListMetadata;
  /** Data of the service accounts list */
  data?: ServiceAccountRecord[];
}

export function accessListServiceAccountsSuccessResponseDeserializer(
  item: any,
): AccessListServiceAccountsSuccessResponse {
  return {
    kind: item["kind"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : confluentListMetadataDeserializer(item["metadata"]),
    data: !item["data"] ? item["data"] : serviceAccountRecordArrayDeserializer(item["data"]),
  };
}

export function serviceAccountRecordArrayDeserializer(result: Array<ServiceAccountRecord>): any[] {
  return result.map((item) => {
    return serviceAccountRecordDeserializer(item);
  });
}

/** Record of the service account */
export interface ServiceAccountRecord {
  /** Type of account */
  kind?: string;
  /** Id of the service account */
  id?: string;
  /** Metadata of the record */
  metadata?: MetadataEntity;
  /** Name of the service account */
  displayName?: string;
  /** Description of the service account */
  description?: string;
}

export function serviceAccountRecordDeserializer(item: any): ServiceAccountRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    metadata: !item["metadata"] ? item["metadata"] : metadataEntityDeserializer(item["metadata"]),
    displayName: item["display_name"],
    description: item["description"],
  };
}

/** List invitations success response */
export interface AccessListInvitationsSuccessResponse {
  /** Type of response */
  kind?: string;
  /** Metadata of the list */
  metadata?: ConfluentListMetadata;
  /** Data of the invitations list */
  data?: InvitationRecord[];
}

export function accessListInvitationsSuccessResponseDeserializer(
  item: any,
): AccessListInvitationsSuccessResponse {
  return {
    kind: item["kind"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : confluentListMetadataDeserializer(item["metadata"]),
    data: !item["data"] ? item["data"] : invitationRecordArrayDeserializer(item["data"]),
  };
}

export function invitationRecordArrayDeserializer(result: Array<InvitationRecord>): any[] {
  return result.map((item) => {
    return invitationRecordDeserializer(item);
  });
}

/** Record of the invitation */
export interface InvitationRecord {
  /** Type of account */
  kind?: string;
  /** Id of the invitation */
  id?: string;
  /** Metadata of the record */
  metadata?: MetadataEntity;
  /** Email of the user */
  email?: string;
  /** Auth type of the user */
  authType?: string;
  /** Status of the invitation */
  status?: string;
  /** Accepted date time of the invitation */
  acceptedAt?: string;
  /** Expiration date time of the invitation */
  expiresAt?: string;
}

export function invitationRecordDeserializer(item: any): InvitationRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    metadata: !item["metadata"] ? item["metadata"] : metadataEntityDeserializer(item["metadata"]),
    email: item["email"],
    authType: item["auth_type"],
    status: item["status"],
    acceptedAt: item["accepted_at"],
    expiresAt: item["expires_at"],
  };
}

/** Invite User Account model */
export interface AccessInviteUserAccountModel {
  /** Id of the organization */
  organizationId?: string;
  /** Email of the logged in user */
  email?: string;
  /** Upn of the logged in user */
  upn?: string;
  /** Details of the user who is being invited */
  invitedUserDetails?: AccessInvitedUserDetails;
}

export function accessInviteUserAccountModelSerializer(item: AccessInviteUserAccountModel): any {
  return {
    organizationId: item["organizationId"],
    email: item["email"],
    upn: item["upn"],
    invitedUserDetails: !item["invitedUserDetails"]
      ? item["invitedUserDetails"]
      : accessInvitedUserDetailsSerializer(item["invitedUserDetails"]),
  };
}

/** Details of the user being invited */
export interface AccessInvitedUserDetails {
  /** UPN/Email of the user who is being invited */
  invitedEmail?: string;
  /** Auth type of the user */
  authType?: string;
}

export function accessInvitedUserDetailsSerializer(item: AccessInvitedUserDetails): any {
  return { invitedEmail: item["invitedEmail"], auth_type: item["authType"] };
}

/** Details of the environments returned on successful response */
export interface AccessListEnvironmentsSuccessResponse {
  /** Type of response */
  kind?: string;
  /** Metadata of the  environment list */
  metadata?: ConfluentListMetadata;
  /** Environment list data */
  data?: EnvironmentRecord[];
}

export function accessListEnvironmentsSuccessResponseDeserializer(
  item: any,
): AccessListEnvironmentsSuccessResponse {
  return {
    kind: item["kind"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : confluentListMetadataDeserializer(item["metadata"]),
    data: !item["data"] ? item["data"] : environmentRecordArrayDeserializer(item["data"]),
  };
}

export function environmentRecordArrayDeserializer(result: Array<EnvironmentRecord>): any[] {
  return result.map((item) => {
    return environmentRecordDeserializer(item);
  });
}

/** Details about environment name, metadata and environment id of an environment */
export interface EnvironmentRecord {
  /** Type of environment */
  kind?: string;
  /** Id of the environment */
  id?: string;
  /** Metadata of the record */
  metadata?: MetadataEntity;
  /** Display name of the user */
  displayName?: string;
}

export function environmentRecordDeserializer(item: any): EnvironmentRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    metadata: !item["metadata"] ? item["metadata"] : metadataEntityDeserializer(item["metadata"]),
    displayName: item["display_name"],
  };
}

/** Details of the clusters returned on successful response */
export interface AccessListClusterSuccessResponse {
  /** Type of response */
  kind?: string;
  /** Metadata of the list */
  metadata?: ConfluentListMetadata;
  /** List of clusters */
  data?: ClusterRecord[];
}

export function accessListClusterSuccessResponseDeserializer(
  item: any,
): AccessListClusterSuccessResponse {
  return {
    kind: item["kind"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : confluentListMetadataDeserializer(item["metadata"]),
    data: !item["data"] ? item["data"] : clusterRecordArrayDeserializer(item["data"]),
  };
}

export function clusterRecordArrayDeserializer(result: Array<ClusterRecord>): any[] {
  return result.map((item) => {
    return clusterRecordDeserializer(item);
  });
}

/** Details of cluster record */
export interface ClusterRecord {
  /** Type of cluster */
  kind?: string;
  /** Id of the cluster */
  id?: string;
  /** Metadata of the record */
  metadata?: MetadataEntity;
  /** Display name of the cluster */
  displayName?: string;
  /** Specification of the cluster */
  spec?: ClusterSpecEntity;
  /** Specification of the cluster */
  status?: ClusterStatusEntity;
}

export function clusterRecordDeserializer(item: any): ClusterRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    metadata: !item["metadata"] ? item["metadata"] : metadataEntityDeserializer(item["metadata"]),
    displayName: item["display_name"],
    spec: !item["spec"] ? item["spec"] : clusterSpecEntityDeserializer(item["spec"]),
    status: !item["status"] ? item["status"] : clusterStatusEntityDeserializer(item["status"]),
  };
}

/** Spec of the cluster record */
export interface ClusterSpecEntity {
  /** The name of the cluster */
  displayName?: string;
  /** The availability zone configuration of the cluster */
  availability?: string;
  /** The cloud service provider */
  cloud?: string;
  /** type of zone availability */
  zone?: string;
  /** The cloud service provider region */
  region?: string;
  /** The bootstrap endpoint used by Kafka clients to connect to the cluster */
  kafkaBootstrapEndpoint?: string;
  /** The cluster HTTP request URL. */
  httpEndpoint?: string;
  /** The Kafka API cluster endpoint */
  apiEndpoint?: string;
  /** Specification of the cluster */
  config?: ClusterConfigEntity;
  /** Specification of the cluster */
  environment?: ClusterEnvironmentEntity;
  /** Specification of the cluster */
  network?: ClusterNetworkEntity;
  /** Specification of the cluster */
  byok?: ClusterByokEntity;
}

export function clusterSpecEntityDeserializer(item: any): ClusterSpecEntity {
  return {
    displayName: item["display_name"],
    availability: item["availability"],
    cloud: item["cloud"],
    zone: item["zone"],
    region: item["region"],
    kafkaBootstrapEndpoint: item["kafka_bootstrap_endpoint"],
    httpEndpoint: item["http_endpoint"],
    apiEndpoint: item["api_endpoint"],
    config: !item["config"] ? item["config"] : clusterConfigEntityDeserializer(item["config"]),
    environment: !item["environment"]
      ? item["environment"]
      : clusterEnvironmentEntityDeserializer(item["environment"]),
    network: !item["network"] ? item["network"] : clusterNetworkEntityDeserializer(item["network"]),
    byok: !item["byok"] ? item["byok"] : clusterByokEntityDeserializer(item["byok"]),
  };
}

/** The environment to which cluster belongs */
export interface ClusterEnvironmentEntity {
  /** ID of the referred resource */
  id?: string;
  /** Environment of the referred resource */
  environment?: string;
  /** API URL for accessing or modifying the referred object */
  related?: string;
  /** CRN reference to the referred resource */
  resourceName?: string;
}

export function clusterEnvironmentEntityDeserializer(item: any): ClusterEnvironmentEntity {
  return {
    id: item["id"],
    environment: item["environment"],
    related: item["related"],
    resourceName: item["resource_name"],
  };
}

/** The network associated with this object */
export interface ClusterNetworkEntity {
  /** ID of the referred resource */
  id?: string;
  /** Environment of the referred resource */
  environment?: string;
  /** API URL for accessing or modifying the referred object */
  related?: string;
  /** CRN reference to the referred resource */
  resourceName?: string;
}

export function clusterNetworkEntityDeserializer(item: any): ClusterNetworkEntity {
  return {
    id: item["id"],
    environment: item["environment"],
    related: item["related"],
    resourceName: item["resource_name"],
  };
}

/** The network associated with this object */
export interface ClusterByokEntity {
  /** ID of the referred resource */
  id?: string;
  /** API URL for accessing or modifying the referred object */
  related?: string;
  /** CRN reference to the referred resource */
  resourceName?: string;
}

export function clusterByokEntityDeserializer(item: any): ClusterByokEntity {
  return {
    id: item["id"],
    related: item["related"],
    resourceName: item["resource_name"],
  };
}

/** Details of the role bindings returned on successful response */
export interface AccessListRoleBindingsSuccessResponse {
  /** Type of response */
  kind?: string;
  /** Metadata of the list */
  metadata?: ConfluentListMetadata;
  /** List of role binding */
  data?: RoleBindingRecord[];
}

export function accessListRoleBindingsSuccessResponseDeserializer(
  item: any,
): AccessListRoleBindingsSuccessResponse {
  return {
    kind: item["kind"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : confluentListMetadataDeserializer(item["metadata"]),
    data: !item["data"] ? item["data"] : roleBindingRecordArrayDeserializer(item["data"]),
  };
}

export function roleBindingRecordArrayDeserializer(result: Array<RoleBindingRecord>): any[] {
  return result.map((item) => {
    return roleBindingRecordDeserializer(item);
  });
}

/** Details on principal, role name and crn pattern of a role binding */
export interface RoleBindingRecord {
  /** The type of the resource. */
  kind?: string;
  /** Id of the role binding */
  id?: string;
  /** Metadata of the record */
  metadata?: MetadataEntity;
  /** The principal User or Group to bind the role to */
  principal?: string;
  /** The name of the role to bind to the principal */
  roleName?: string;
  /** A CRN that specifies the scope and resource patterns necessary for the role to bind */
  crnPattern?: string;
}

export function roleBindingRecordDeserializer(item: any): RoleBindingRecord {
  return {
    kind: item["kind"],
    id: item["id"],
    metadata: !item["metadata"] ? item["metadata"] : metadataEntityDeserializer(item["metadata"]),
    principal: item["principal"],
    roleName: item["role_name"],
    crnPattern: item["crn_pattern"],
  };
}

/** Create role binding request model */
export interface AccessCreateRoleBindingRequestModel {
  /** The principal User or Group to bind the role to */
  principal?: string;
  /** The name of the role to bind to the principal */
  roleName?: string;
  /** A CRN that specifies the scope and resource patterns necessary for the role to bind */
  crnPattern?: string;
}

export function accessCreateRoleBindingRequestModelSerializer(
  item: AccessCreateRoleBindingRequestModel,
): any {
  return {
    principal: item["principal"],
    role_name: item["roleName"],
    crn_pattern: item["crnPattern"],
  };
}

/** Details of the role binding names returned on successful response */
export interface AccessRoleBindingNameListSuccessResponse {
  /** Type of response */
  kind?: string;
  /** Metadata of the list */
  metadata?: ConfluentListMetadata;
  /** List of role binding names */
  data?: string[];
}

export function accessRoleBindingNameListSuccessResponseDeserializer(
  item: any,
): AccessRoleBindingNameListSuccessResponse {
  return {
    kind: item["kind"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : confluentListMetadataDeserializer(item["metadata"]),
    data: !item["data"]
      ? item["data"]
      : item["data"].map((p: any) => {
          return p;
        }),
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

/** Details of connector record */
export interface ConnectorResource extends ProxyResource {
  /** The properties of the Connector */
  properties: ConnectorResourceProperties;
}

export function connectorResourceSerializer(item: ConnectorResource): any {
  return {
    properties: connectorResourcePropertiesSerializer(item["properties"]),
  };
}

export function connectorResourceDeserializer(item: any): ConnectorResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: connectorResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The resource properties of the Connector */
export interface ConnectorResourceProperties {
  /** Connector Info Base */
  connectorBasicInfo?: ConnectorInfoBase;
  /** Connector Service type info base properties. */
  connectorServiceTypeInfo?: ConnectorServiceTypeInfoBaseUnion;
  /** The connection information consumed by applications. */
  partnerConnectorInfo?: PartnerInfoBaseUnion;
}

export function connectorResourcePropertiesSerializer(item: ConnectorResourceProperties): any {
  return {
    connectorBasicInfo: !item["connectorBasicInfo"]
      ? item["connectorBasicInfo"]
      : connectorInfoBaseSerializer(item["connectorBasicInfo"]),
    connectorServiceTypeInfo: !item["connectorServiceTypeInfo"]
      ? item["connectorServiceTypeInfo"]
      : connectorServiceTypeInfoBaseUnionSerializer(item["connectorServiceTypeInfo"]),
    partnerConnectorInfo: !item["partnerConnectorInfo"]
      ? item["partnerConnectorInfo"]
      : partnerInfoBaseUnionSerializer(item["partnerConnectorInfo"]),
  };
}

export function connectorResourcePropertiesDeserializer(item: any): ConnectorResourceProperties {
  return {
    connectorBasicInfo: !item["connectorBasicInfo"]
      ? item["connectorBasicInfo"]
      : connectorInfoBaseDeserializer(item["connectorBasicInfo"]),
    connectorServiceTypeInfo: !item["connectorServiceTypeInfo"]
      ? item["connectorServiceTypeInfo"]
      : connectorServiceTypeInfoBaseUnionDeserializer(item["connectorServiceTypeInfo"]),
    partnerConnectorInfo: !item["partnerConnectorInfo"]
      ? item["partnerConnectorInfo"]
      : partnerInfoBaseUnionDeserializer(item["partnerConnectorInfo"]),
  };
}

/** Connector Info Base properties */
export interface ConnectorInfoBase {
  /** Connector Type */
  connectorType?: ConnectorType;
  /** Connector Class */
  connectorClass?: ConnectorClass;
  /** Connector Name */
  connectorName?: string;
  /** Connector Id */
  connectorId?: string;
  /** Connector Status */
  connectorState?: ConnectorStatus;
}

export function connectorInfoBaseSerializer(item: ConnectorInfoBase): any {
  return {
    connectorType: item["connectorType"],
    connectorClass: item["connectorClass"],
    connectorName: item["connectorName"],
    connectorId: item["connectorId"],
    connectorState: item["connectorState"],
  };
}

export function connectorInfoBaseDeserializer(item: any): ConnectorInfoBase {
  return {
    connectorType: item["connectorType"],
    connectorClass: item["connectorClass"],
    connectorName: item["connectorName"],
    connectorId: item["connectorId"],
    connectorState: item["connectorState"],
  };
}

/** Connector Type */
export enum KnownConnectorType {
  Sink = "SINK",
  Source = "SOURCE",
}

/**
 * Connector Type \
 * {@link KnownConnectorType} can be used interchangeably with ConnectorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SINK** \
 * **SOURCE**
 */
export type ConnectorType = string;

/** Connector Class */
export enum KnownConnectorClass {
  Azureblobsource = "AZUREBLOBSOURCE",
  Azureblobsink = "AZUREBLOBSINK",
}

/**
 * Connector Class \
 * {@link KnownConnectorClass} can be used interchangeably with ConnectorClass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AZUREBLOBSOURCE** \
 * **AZUREBLOBSINK**
 */
export type ConnectorClass = string;

/** Connector Status */
export enum KnownConnectorStatus {
  Provisioning = "PROVISIONING",
  Running = "RUNNING",
  Paused = "PAUSED",
  Failed = "FAILED",
}

/**
 * Connector Status \
 * {@link KnownConnectorStatus} can be used interchangeably with ConnectorStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PROVISIONING** \
 * **RUNNING** \
 * **PAUSED** \
 * **FAILED**
 */
export type ConnectorStatus = string;

/** The connector service type info */
export interface ConnectorServiceTypeInfoBase {
  /** The connector service type. */
  /** The discriminator possible values: AzureBlobStorageSinkConnector, AzureBlobStorageSourceConnector, AzureCosmosDBSinkConnector, AzureCosmosDBSourceConnector, AzureSynapseAnalyticsSinkConnector */
  connectorServiceType: ConnectorServiceType;
}

export function connectorServiceTypeInfoBaseSerializer(item: ConnectorServiceTypeInfoBase): any {
  return { connectorServiceType: item["connectorServiceType"] };
}

export function connectorServiceTypeInfoBaseDeserializer(item: any): ConnectorServiceTypeInfoBase {
  return {
    connectorServiceType: item["connectorServiceType"],
  };
}

/** Alias for ConnectorServiceTypeInfoBaseUnion */
export type ConnectorServiceTypeInfoBaseUnion =
  | AzureBlobStorageSinkConnectorServiceInfo
  | AzureBlobStorageSourceConnectorServiceInfo
  | AzureCosmosDBSinkConnectorServiceInfo
  | AzureCosmosDBSourceConnectorServiceInfo
  | AzureSynapseAnalyticsSinkConnectorServiceInfo
  | ConnectorServiceTypeInfoBase;

export function connectorServiceTypeInfoBaseUnionSerializer(
  item: ConnectorServiceTypeInfoBaseUnion,
): any {
  switch (item.connectorServiceType) {
    case "AzureBlobStorageSinkConnector":
      return azureBlobStorageSinkConnectorServiceInfoSerializer(
        item as AzureBlobStorageSinkConnectorServiceInfo,
      );

    case "AzureBlobStorageSourceConnector":
      return azureBlobStorageSourceConnectorServiceInfoSerializer(
        item as AzureBlobStorageSourceConnectorServiceInfo,
      );

    case "AzureCosmosDBSinkConnector":
      return azureCosmosDBSinkConnectorServiceInfoSerializer(
        item as AzureCosmosDBSinkConnectorServiceInfo,
      );

    case "AzureCosmosDBSourceConnector":
      return azureCosmosDBSourceConnectorServiceInfoSerializer(
        item as AzureCosmosDBSourceConnectorServiceInfo,
      );

    case "AzureSynapseAnalyticsSinkConnector":
      return azureSynapseAnalyticsSinkConnectorServiceInfoSerializer(
        item as AzureSynapseAnalyticsSinkConnectorServiceInfo,
      );

    default:
      return connectorServiceTypeInfoBaseSerializer(item);
  }
}

export function connectorServiceTypeInfoBaseUnionDeserializer(
  item: any,
): ConnectorServiceTypeInfoBaseUnion {
  switch (item.connectorServiceType) {
    case "AzureBlobStorageSinkConnector":
      return azureBlobStorageSinkConnectorServiceInfoDeserializer(
        item as AzureBlobStorageSinkConnectorServiceInfo,
      );

    case "AzureBlobStorageSourceConnector":
      return azureBlobStorageSourceConnectorServiceInfoDeserializer(
        item as AzureBlobStorageSourceConnectorServiceInfo,
      );

    case "AzureCosmosDBSinkConnector":
      return azureCosmosDBSinkConnectorServiceInfoDeserializer(
        item as AzureCosmosDBSinkConnectorServiceInfo,
      );

    case "AzureCosmosDBSourceConnector":
      return azureCosmosDBSourceConnectorServiceInfoDeserializer(
        item as AzureCosmosDBSourceConnectorServiceInfo,
      );

    case "AzureSynapseAnalyticsSinkConnector":
      return azureSynapseAnalyticsSinkConnectorServiceInfoDeserializer(
        item as AzureSynapseAnalyticsSinkConnectorServiceInfo,
      );

    default:
      return connectorServiceTypeInfoBaseDeserializer(item);
  }
}

/** The connector service type. */
export enum KnownConnectorServiceType {
  AzureBlobStorageSinkConnector = "AzureBlobStorageSinkConnector",
  AzureBlobStorageSourceConnector = "AzureBlobStorageSourceConnector",
  AzureCosmosDBSinkConnector = "AzureCosmosDBSinkConnector",
  AzureCosmosDBSourceConnector = "AzureCosmosDBSourceConnector",
  AzureSynapseAnalyticsSinkConnector = "AzureSynapseAnalyticsSinkConnector",
}

/**
 * The connector service type. \
 * {@link KnownConnectorServiceType} can be used interchangeably with ConnectorServiceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureBlobStorageSinkConnector** \
 * **AzureBlobStorageSourceConnector** \
 * **AzureCosmosDBSinkConnector** \
 * **AzureCosmosDBSourceConnector** \
 * **AzureSynapseAnalyticsSinkConnector**
 */
export type ConnectorServiceType = string;

/** The authentication info when auth_type is azureBlobStorageSinkConnector */
export interface AzureBlobStorageSinkConnectorServiceInfo extends ConnectorServiceTypeInfoBase {
  /** Azure Blob Storage Account Name */
  storageAccountName?: string;
  /** Azure Blob Storage Account Key */
  storageAccountKey?: string;
  /** Azure Blob Storage Account Container Name */
  storageContainerName?: string;
  /** The connector service type. */
  connectorServiceType: "AzureBlobStorageSinkConnector";
}

export function azureBlobStorageSinkConnectorServiceInfoSerializer(
  item: AzureBlobStorageSinkConnectorServiceInfo,
): any {
  return {
    connectorServiceType: item["connectorServiceType"],
    storageAccountName: item["storageAccountName"],
    storageAccountKey: item["storageAccountKey"],
    storageContainerName: item["storageContainerName"],
  };
}

export function azureBlobStorageSinkConnectorServiceInfoDeserializer(
  item: any,
): AzureBlobStorageSinkConnectorServiceInfo {
  return {
    connectorServiceType: item["connectorServiceType"],
    storageAccountName: item["storageAccountName"],
    storageAccountKey: item["storageAccountKey"],
    storageContainerName: item["storageContainerName"],
  };
}

/** The connector service type is AzureBlobStorageSourceConnector */
export interface AzureBlobStorageSourceConnectorServiceInfo extends ConnectorServiceTypeInfoBase {
  /** Azure Blob Storage Account Name */
  storageAccountName?: string;
  /** Azure Blob Storage Account Key */
  storageAccountKey?: string;
  /** Azure Blob Storage Account Container Name */
  storageContainerName?: string;
  /** The connector service type. */
  connectorServiceType: "AzureBlobStorageSourceConnector";
}

export function azureBlobStorageSourceConnectorServiceInfoSerializer(
  item: AzureBlobStorageSourceConnectorServiceInfo,
): any {
  return {
    connectorServiceType: item["connectorServiceType"],
    storageAccountName: item["storageAccountName"],
    storageAccountKey: item["storageAccountKey"],
    storageContainerName: item["storageContainerName"],
  };
}

export function azureBlobStorageSourceConnectorServiceInfoDeserializer(
  item: any,
): AzureBlobStorageSourceConnectorServiceInfo {
  return {
    connectorServiceType: item["connectorServiceType"],
    storageAccountName: item["storageAccountName"],
    storageAccountKey: item["storageAccountKey"],
    storageContainerName: item["storageContainerName"],
  };
}

/** The authentication info when auth_type is AzureCosmosDBSinkConnector */
export interface AzureCosmosDBSinkConnectorServiceInfo extends ConnectorServiceTypeInfoBase {
  /** Azure Cosmos Database Name */
  cosmosDatabaseName?: string;
  /** Azure Cosmos Database Master Key */
  cosmosMasterKey?: string;
  /** Azure Cosmos Database Connection Endpoint */
  cosmosConnectionEndpoint?: string;
  /** Azure Cosmos Database Containers Topic Mapping */
  cosmosContainersTopicMapping?: string;
  /** Azure Cosmos Database Id Strategy */
  cosmosIdStrategy?: string;
  /** The connector service type. */
  connectorServiceType: "AzureCosmosDBSinkConnector";
}

export function azureCosmosDBSinkConnectorServiceInfoSerializer(
  item: AzureCosmosDBSinkConnectorServiceInfo,
): any {
  return {
    connectorServiceType: item["connectorServiceType"],
    cosmosDatabaseName: item["cosmosDatabaseName"],
    cosmosMasterKey: item["cosmosMasterKey"],
    cosmosConnectionEndpoint: item["cosmosConnectionEndpoint"],
    cosmosContainersTopicMapping: item["cosmosContainersTopicMapping"],
    cosmosIdStrategy: item["cosmosIdStrategy"],
  };
}

export function azureCosmosDBSinkConnectorServiceInfoDeserializer(
  item: any,
): AzureCosmosDBSinkConnectorServiceInfo {
  return {
    connectorServiceType: item["connectorServiceType"],
    cosmosDatabaseName: item["cosmosDatabaseName"],
    cosmosMasterKey: item["cosmosMasterKey"],
    cosmosConnectionEndpoint: item["cosmosConnectionEndpoint"],
    cosmosContainersTopicMapping: item["cosmosContainersTopicMapping"],
    cosmosIdStrategy: item["cosmosIdStrategy"],
  };
}

/** The authentication info when auth_type is AzureCosmosDBSourceConnector */
export interface AzureCosmosDBSourceConnectorServiceInfo extends ConnectorServiceTypeInfoBase {
  /** Azure Cosmos Database Name */
  cosmosDatabaseName?: string;
  /** Azure Cosmos Database Master Key */
  cosmosMasterKey?: string;
  /** Azure Cosmos Database Connection Endpoint */
  cosmosConnectionEndpoint?: string;
  /** Azure Cosmos Database Containers Topic Mapping */
  cosmosContainersTopicMapping?: string;
  /** Azure Cosmos Database Message Key Enabled */
  cosmosMessageKeyEnabled?: boolean;
  /** Azure Cosmos Database Message Key Field */
  cosmosMessageKeyField?: string;
  /** The connector service type. */
  connectorServiceType: "AzureCosmosDBSourceConnector";
}

export function azureCosmosDBSourceConnectorServiceInfoSerializer(
  item: AzureCosmosDBSourceConnectorServiceInfo,
): any {
  return {
    connectorServiceType: item["connectorServiceType"],
    cosmosDatabaseName: item["cosmosDatabaseName"],
    cosmosMasterKey: item["cosmosMasterKey"],
    cosmosConnectionEndpoint: item["cosmosConnectionEndpoint"],
    cosmosContainersTopicMapping: item["cosmosContainersTopicMapping"],
    cosmosMessageKeyEnabled: item["cosmosMessageKeyEnabled"],
    cosmosMessageKeyField: item["cosmosMessageKeyField"],
  };
}

export function azureCosmosDBSourceConnectorServiceInfoDeserializer(
  item: any,
): AzureCosmosDBSourceConnectorServiceInfo {
  return {
    connectorServiceType: item["connectorServiceType"],
    cosmosDatabaseName: item["cosmosDatabaseName"],
    cosmosMasterKey: item["cosmosMasterKey"],
    cosmosConnectionEndpoint: item["cosmosConnectionEndpoint"],
    cosmosContainersTopicMapping: item["cosmosContainersTopicMapping"],
    cosmosMessageKeyEnabled: item["cosmosMessageKeyEnabled"],
    cosmosMessageKeyField: item["cosmosMessageKeyField"],
  };
}

/** The authentication info when auth_type is AzureSynapseAnalyticsSinkConnector */
export interface AzureSynapseAnalyticsSinkConnectorServiceInfo
  extends ConnectorServiceTypeInfoBase {
  /** Azure Synapse Analytics SQL Server Name */
  synapseSqlServerName?: string;
  /** Azure Synapse SQL login details */
  synapseSqlUser?: string;
  /** Azure Synapse SQL login details */
  synapseSqlPassword?: string;
  /** Azure Synapse Dedicated SQL Pool Database Name */
  synapseSqlDatabaseName?: string;
  /** The connector service type. */
  connectorServiceType: "AzureSynapseAnalyticsSinkConnector";
}

export function azureSynapseAnalyticsSinkConnectorServiceInfoSerializer(
  item: AzureSynapseAnalyticsSinkConnectorServiceInfo,
): any {
  return {
    connectorServiceType: item["connectorServiceType"],
    synapseSqlServerName: item["synapseSqlServerName"],
    synapseSqlUser: item["synapseSqlUser"],
    synapseSqlPassword: item["synapseSqlPassword"],
    synapseSqlDatabaseName: item["synapseSqlDatabaseName"],
  };
}

export function azureSynapseAnalyticsSinkConnectorServiceInfoDeserializer(
  item: any,
): AzureSynapseAnalyticsSinkConnectorServiceInfo {
  return {
    connectorServiceType: item["connectorServiceType"],
    synapseSqlServerName: item["synapseSqlServerName"],
    synapseSqlUser: item["synapseSqlUser"],
    synapseSqlPassword: item["synapseSqlPassword"],
    synapseSqlDatabaseName: item["synapseSqlDatabaseName"],
  };
}

/** The partner info base */
export interface PartnerInfoBase {
  /** The partner connector type. */
  /** The discriminator possible values: KafkaAzureBlobStorageSink, KafkaAzureBlobStorageSource, KafkaAzureCosmosDBSink, KafkaAzureCosmosDBSource, KafkaAzureSynapseAnalyticsSink */
  partnerConnectorType: PartnerConnectorType;
}

export function partnerInfoBaseSerializer(item: PartnerInfoBase): any {
  return { partnerConnectorType: item["partnerConnectorType"] };
}

export function partnerInfoBaseDeserializer(item: any): PartnerInfoBase {
  return {
    partnerConnectorType: item["partnerConnectorType"],
  };
}

/** Alias for PartnerInfoBaseUnion */
export type PartnerInfoBaseUnion =
  | KafkaAzureBlobStorageSinkConnectorInfo
  | KafkaAzureBlobStorageSourceConnectorInfo
  | KafkaAzureCosmosDBSinkConnectorInfo
  | KafkaAzureCosmosDBSourceConnectorInfo
  | KafkaAzureSynapseAnalyticsSinkConnectorInfo
  | PartnerInfoBase;

export function partnerInfoBaseUnionSerializer(item: PartnerInfoBaseUnion): any {
  switch (item.partnerConnectorType) {
    case "KafkaAzureBlobStorageSink":
      return kafkaAzureBlobStorageSinkConnectorInfoSerializer(
        item as KafkaAzureBlobStorageSinkConnectorInfo,
      );

    case "KafkaAzureBlobStorageSource":
      return kafkaAzureBlobStorageSourceConnectorInfoSerializer(
        item as KafkaAzureBlobStorageSourceConnectorInfo,
      );

    case "KafkaAzureCosmosDBSink":
      return kafkaAzureCosmosDBSinkConnectorInfoSerializer(
        item as KafkaAzureCosmosDBSinkConnectorInfo,
      );

    case "KafkaAzureCosmosDBSource":
      return kafkaAzureCosmosDBSourceConnectorInfoSerializer(
        item as KafkaAzureCosmosDBSourceConnectorInfo,
      );

    case "KafkaAzureSynapseAnalyticsSink":
      return kafkaAzureSynapseAnalyticsSinkConnectorInfoSerializer(
        item as KafkaAzureSynapseAnalyticsSinkConnectorInfo,
      );

    default:
      return partnerInfoBaseSerializer(item);
  }
}

export function partnerInfoBaseUnionDeserializer(item: any): PartnerInfoBaseUnion {
  switch (item.partnerConnectorType) {
    case "KafkaAzureBlobStorageSink":
      return kafkaAzureBlobStorageSinkConnectorInfoDeserializer(
        item as KafkaAzureBlobStorageSinkConnectorInfo,
      );

    case "KafkaAzureBlobStorageSource":
      return kafkaAzureBlobStorageSourceConnectorInfoDeserializer(
        item as KafkaAzureBlobStorageSourceConnectorInfo,
      );

    case "KafkaAzureCosmosDBSink":
      return kafkaAzureCosmosDBSinkConnectorInfoDeserializer(
        item as KafkaAzureCosmosDBSinkConnectorInfo,
      );

    case "KafkaAzureCosmosDBSource":
      return kafkaAzureCosmosDBSourceConnectorInfoDeserializer(
        item as KafkaAzureCosmosDBSourceConnectorInfo,
      );

    case "KafkaAzureSynapseAnalyticsSink":
      return kafkaAzureSynapseAnalyticsSinkConnectorInfoDeserializer(
        item as KafkaAzureSynapseAnalyticsSinkConnectorInfo,
      );

    default:
      return partnerInfoBaseDeserializer(item);
  }
}

/** Partner Connector type. */
export enum KnownPartnerConnectorType {
  KafkaAzureBlobStorageSource = "KafkaAzureBlobStorageSource",
  KafkaAzureBlobStorageSink = "KafkaAzureBlobStorageSink",
  KafkaAzureCosmosDBSource = "KafkaAzureCosmosDBSource",
  KafkaAzureCosmosDBSink = "KafkaAzureCosmosDBSink",
  KafkaAzureSynapseAnalyticsSink = "KafkaAzureSynapseAnalyticsSink",
}

/**
 * Partner Connector type. \
 * {@link KnownPartnerConnectorType} can be used interchangeably with PartnerConnectorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **KafkaAzureBlobStorageSource** \
 * **KafkaAzureBlobStorageSink** \
 * **KafkaAzureCosmosDBSource** \
 * **KafkaAzureCosmosDBSink** \
 * **KafkaAzureSynapseAnalyticsSink**
 */
export type PartnerConnectorType = string;

/** The partner connector type is KafkaAzureBlobStorageSink */
export interface KafkaAzureBlobStorageSinkConnectorInfo extends PartnerInfoBase {
  /** Kafka Auth Type */
  authType?: AuthType;
  /** Kafka Input Data Format Type */
  inputFormat?: DataFormatType;
  /** Kafka Output Data Format Type */
  outputFormat?: DataFormatType;
  /** Kafka API Key */
  apiKey?: string;
  /** Kafka API Key Secret */
  apiSecret?: string;
  /** Kafka Service Account Id */
  serviceAccountId?: string;
  /** Kafka topics list */
  topics?: string[];
  /** Kafka topics directory */
  topicsDir?: string;
  /** Flush size */
  flushSize?: string;
  /** Maximum Tasks */
  maxTasks?: string;
  /** Time Interval */
  timeInterval?: string;
  /** The partner connector type. */
  partnerConnectorType: "KafkaAzureBlobStorageSink";
}

export function kafkaAzureBlobStorageSinkConnectorInfoSerializer(
  item: KafkaAzureBlobStorageSinkConnectorInfo,
): any {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topics: !item["topics"]
      ? item["topics"]
      : item["topics"].map((p: any) => {
          return p;
        }),
    topicsDir: item["topicsDir"],
    flushSize: item["flushSize"],
    maxTasks: item["maxTasks"],
    timeInterval: item["timeInterval"],
  };
}

export function kafkaAzureBlobStorageSinkConnectorInfoDeserializer(
  item: any,
): KafkaAzureBlobStorageSinkConnectorInfo {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topics: !item["topics"]
      ? item["topics"]
      : item["topics"].map((p: any) => {
          return p;
        }),
    topicsDir: item["topicsDir"],
    flushSize: item["flushSize"],
    maxTasks: item["maxTasks"],
    timeInterval: item["timeInterval"],
  };
}

/** Kafka Connector Auth Type */
export enum KnownAuthType {
  ServiceAccount = "SERVICE_ACCOUNT",
  KafkaAPIKEY = "KAFKA_API_KEY",
}

/**
 * Kafka Connector Auth Type \
 * {@link KnownAuthType} can be used interchangeably with AuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SERVICE_ACCOUNT** \
 * **KAFKA_API_KEY**
 */
export type AuthType = string;

/** Data Format Type */
export enum KnownDataFormatType {
  Avro = "AVRO",
  Json = "JSON",
  String = "STRING",
  Bytes = "BYTES",
  Protobuf = "PROTOBUF",
}

/**
 * Data Format Type \
 * {@link KnownDataFormatType} can be used interchangeably with DataFormatType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AVRO** \
 * **JSON** \
 * **STRING** \
 * **BYTES** \
 * **PROTOBUF**
 */
export type DataFormatType = string;

/** The partner connector type is KafkaAzureBlobStorageSource */
export interface KafkaAzureBlobStorageSourceConnectorInfo extends PartnerInfoBase {
  /** Kafka Auth Type */
  authType?: AuthType;
  /** Kafka Input Data Format Type */
  inputFormat?: DataFormatType;
  /** Kafka Output Data Format Type */
  outputFormat?: DataFormatType;
  /** Kafka API Key */
  apiKey?: string;
  /** Kafka API Secret */
  apiSecret?: string;
  /** Kafka Service Account Id */
  serviceAccountId?: string;
  /** Kafka topics Regex pattern */
  topicRegex?: string;
  /** Kafka topics directory */
  topicsDir?: string;
  /** Maximum Tasks */
  maxTasks?: string;
  /** The partner connector type. */
  partnerConnectorType: "KafkaAzureBlobStorageSource";
}

export function kafkaAzureBlobStorageSourceConnectorInfoSerializer(
  item: KafkaAzureBlobStorageSourceConnectorInfo,
): any {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topicRegex: item["topicRegex"],
    topicsDir: item["topicsDir"],
    maxTasks: item["maxTasks"],
  };
}

export function kafkaAzureBlobStorageSourceConnectorInfoDeserializer(
  item: any,
): KafkaAzureBlobStorageSourceConnectorInfo {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topicRegex: item["topicRegex"],
    topicsDir: item["topicsDir"],
    maxTasks: item["maxTasks"],
  };
}

/** The partner connector type is KafkaAzureCosmosDBSink */
export interface KafkaAzureCosmosDBSinkConnectorInfo extends PartnerInfoBase {
  /** Kafka Auth Type */
  authType?: AuthType;
  /** Kafka Input Data Format Type */
  inputFormat?: DataFormatType;
  /** Kafka Output Data Format Type */
  outputFormat?: DataFormatType;
  /** Kafka API Key */
  apiKey?: string;
  /** Kafka API Key Secret */
  apiSecret?: string;
  /** Kafka Service Account Id */
  serviceAccountId?: string;
  /** Kafka topics list */
  topics?: string[];
  /** Kafka topics directory */
  topicsDir?: string;
  /** Flush size */
  flushSize?: string;
  /** Maximum Tasks */
  maxTasks?: string;
  /** Time Interval */
  timeInterval?: string;
  /** The partner connector type. */
  partnerConnectorType: "KafkaAzureCosmosDBSink";
}

export function kafkaAzureCosmosDBSinkConnectorInfoSerializer(
  item: KafkaAzureCosmosDBSinkConnectorInfo,
): any {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topics: !item["topics"]
      ? item["topics"]
      : item["topics"].map((p: any) => {
          return p;
        }),
    topicsDir: item["topicsDir"],
    flushSize: item["flushSize"],
    maxTasks: item["maxTasks"],
    timeInterval: item["timeInterval"],
  };
}

export function kafkaAzureCosmosDBSinkConnectorInfoDeserializer(
  item: any,
): KafkaAzureCosmosDBSinkConnectorInfo {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topics: !item["topics"]
      ? item["topics"]
      : item["topics"].map((p: any) => {
          return p;
        }),
    topicsDir: item["topicsDir"],
    flushSize: item["flushSize"],
    maxTasks: item["maxTasks"],
    timeInterval: item["timeInterval"],
  };
}

/** The partner connector type is KafkaAzureCosmosDBSource */
export interface KafkaAzureCosmosDBSourceConnectorInfo extends PartnerInfoBase {
  /** Kafka Auth Type */
  authType?: AuthType;
  /** Kafka Input Data Format Type */
  inputFormat?: DataFormatType;
  /** Kafka Output Data Format Type */
  outputFormat?: DataFormatType;
  /** Kafka API Key */
  apiKey?: string;
  /** Kafka API Secret */
  apiSecret?: string;
  /** Kafka Service Account Id */
  serviceAccountId?: string;
  /** Kafka topics Regex pattern */
  topicRegex?: string;
  /** Kafka topics directory */
  topicsDir?: string;
  /** Maximum Tasks */
  maxTasks?: string;
  /** The partner connector type. */
  partnerConnectorType: "KafkaAzureCosmosDBSource";
}

export function kafkaAzureCosmosDBSourceConnectorInfoSerializer(
  item: KafkaAzureCosmosDBSourceConnectorInfo,
): any {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topicRegex: item["topicRegex"],
    topicsDir: item["topicsDir"],
    maxTasks: item["maxTasks"],
  };
}

export function kafkaAzureCosmosDBSourceConnectorInfoDeserializer(
  item: any,
): KafkaAzureCosmosDBSourceConnectorInfo {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topicRegex: item["topicRegex"],
    topicsDir: item["topicsDir"],
    maxTasks: item["maxTasks"],
  };
}

/** The partner connector type is KafkaAzureSynapseAnalyticsSink */
export interface KafkaAzureSynapseAnalyticsSinkConnectorInfo extends PartnerInfoBase {
  /** Kafka Auth Type */
  authType?: AuthType;
  /** Kafka Input Data Format Type */
  inputFormat?: DataFormatType;
  /** Kafka Output Data Format Type */
  outputFormat?: DataFormatType;
  /** Kafka API Key */
  apiKey?: string;
  /** Kafka API Key Secret */
  apiSecret?: string;
  /** Kafka Service Account Id */
  serviceAccountId?: string;
  /** Kafka topics list */
  topics?: string[];
  /** Kafka topics directory */
  topicsDir?: string;
  /** Flush size */
  flushSize?: string;
  /** Maximum Tasks */
  maxTasks?: string;
  /** Time Interval */
  timeInterval?: string;
  /** The partner connector type. */
  partnerConnectorType: "KafkaAzureSynapseAnalyticsSink";
}

export function kafkaAzureSynapseAnalyticsSinkConnectorInfoSerializer(
  item: KafkaAzureSynapseAnalyticsSinkConnectorInfo,
): any {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topics: !item["topics"]
      ? item["topics"]
      : item["topics"].map((p: any) => {
          return p;
        }),
    topicsDir: item["topicsDir"],
    flushSize: item["flushSize"],
    maxTasks: item["maxTasks"],
    timeInterval: item["timeInterval"],
  };
}

export function kafkaAzureSynapseAnalyticsSinkConnectorInfoDeserializer(
  item: any,
): KafkaAzureSynapseAnalyticsSinkConnectorInfo {
  return {
    partnerConnectorType: item["partnerConnectorType"],
    authType: item["authType"],
    inputFormat: item["inputFormat"],
    outputFormat: item["outputFormat"],
    apiKey: item["apiKey"],
    apiSecret: item["apiSecret"],
    serviceAccountId: item["serviceAccountId"],
    topics: !item["topics"]
      ? item["topics"]
      : item["topics"].map((p: any) => {
          return p;
        }),
    topicsDir: item["topicsDir"],
    flushSize: item["flushSize"],
    maxTasks: item["maxTasks"],
    timeInterval: item["timeInterval"],
  };
}

/** Result of GET request to list connectors in the cluster of a confluent organization */
export interface _ListConnectorsSuccessResponse {
  /** The ConnectorResource items on this page */
  value: ConnectorResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listConnectorsSuccessResponseDeserializer(
  item: any,
): _ListConnectorsSuccessResponse {
  return {
    value: connectorResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectorResourceArraySerializer(result: Array<ConnectorResource>): any[] {
  return result.map((item) => {
    return connectorResourceSerializer(item);
  });
}

export function connectorResourceArrayDeserializer(result: Array<ConnectorResource>): any[] {
  return result.map((item) => {
    return connectorResourceDeserializer(item);
  });
}

/** Details of topic record */
export interface TopicRecord extends ProxyResource {
  /** Topic Properties */
  properties?: TopicProperties;
}

export function topicRecordSerializer(item: TopicRecord): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : topicPropertiesSerializer(item["properties"]),
  };
}

export function topicRecordDeserializer(item: any): TopicRecord {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : topicPropertiesDeserializer(item["properties"]),
  };
}

/** Topic Properties */
export interface TopicProperties {
  /** Type of topic */
  kind?: string;
  /** Topic Id returned by Confluent */
  topicId?: string;
  /** Metadata of the record */
  metadata?: TopicMetadataEntity;
  /** Partition Specification of the topic */
  partitions?: TopicsRelatedLink;
  /** Config Specification of the topic */
  configs?: TopicsRelatedLink;
  /** Input Config Specification of the topic */
  inputConfigs?: TopicsInputConfig[];
  /** Partition Reassignment Specification of the topic */
  partitionsReassignments?: TopicsRelatedLink;
  /** Partition count of the topic */
  partitionsCount?: string;
  /** Replication factor of the topic */
  replicationFactor?: string;
}

export function topicPropertiesSerializer(item: TopicProperties): any {
  return {
    kind: item["kind"],
    topicId: item["topicId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : topicMetadataEntitySerializer(item["metadata"]),
    partitions: !item["partitions"]
      ? item["partitions"]
      : topicsRelatedLinkSerializer(item["partitions"]),
    configs: !item["configs"] ? item["configs"] : topicsRelatedLinkSerializer(item["configs"]),
    inputConfigs: !item["inputConfigs"]
      ? item["inputConfigs"]
      : topicsInputConfigArraySerializer(item["inputConfigs"]),
    partitionsReassignments: !item["partitionsReassignments"]
      ? item["partitionsReassignments"]
      : topicsRelatedLinkSerializer(item["partitionsReassignments"]),
    partitionsCount: item["partitionsCount"],
    replicationFactor: item["replicationFactor"],
  };
}

export function topicPropertiesDeserializer(item: any): TopicProperties {
  return {
    kind: item["kind"],
    topicId: item["topicId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : topicMetadataEntityDeserializer(item["metadata"]),
    partitions: !item["partitions"]
      ? item["partitions"]
      : topicsRelatedLinkDeserializer(item["partitions"]),
    configs: !item["configs"] ? item["configs"] : topicsRelatedLinkDeserializer(item["configs"]),
    inputConfigs: !item["inputConfigs"]
      ? item["inputConfigs"]
      : topicsInputConfigArrayDeserializer(item["inputConfigs"]),
    partitionsReassignments: !item["partitionsReassignments"]
      ? item["partitionsReassignments"]
      : topicsRelatedLinkDeserializer(item["partitionsReassignments"]),
    partitionsCount: item["partitionsCount"],
    replicationFactor: item["replicationFactor"],
  };
}

/** Metadata of the data record */
export interface TopicMetadataEntity {
  /** Self lookup url */
  self?: string;
  /** Resource name of the record */
  resourceName?: string;
}

export function topicMetadataEntitySerializer(item: TopicMetadataEntity): any {
  return { self: item["self"], resourceName: item["resourceName"] };
}

export function topicMetadataEntityDeserializer(item: any): TopicMetadataEntity {
  return {
    self: item["self"],
    resourceName: item["resourceName"],
  };
}

/** Partition Config spec of the topic record */
export interface TopicsRelatedLink {
  /** Relationship of the topic */
  related?: string;
}

export function topicsRelatedLinkSerializer(item: TopicsRelatedLink): any {
  return { related: item["related"] };
}

export function topicsRelatedLinkDeserializer(item: any): TopicsRelatedLink {
  return {
    related: item["related"],
  };
}

export function topicsInputConfigArraySerializer(result: Array<TopicsInputConfig>): any[] {
  return result.map((item) => {
    return topicsInputConfigSerializer(item);
  });
}

export function topicsInputConfigArrayDeserializer(result: Array<TopicsInputConfig>): any[] {
  return result.map((item) => {
    return topicsInputConfigDeserializer(item);
  });
}

/** Topics input config */
export interface TopicsInputConfig {
  /** Name of the topic input config */
  name?: string;
  /** Value of the topic input config */
  value?: string;
}

export function topicsInputConfigSerializer(item: TopicsInputConfig): any {
  return { name: item["name"], value: item["value"] };
}

export function topicsInputConfigDeserializer(item: any): TopicsInputConfig {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Result of GET request to list topics in the cluster of a confluent organization */
export interface _ListTopicsSuccessResponse {
  /** The TopicRecord items on this page */
  value: TopicRecord[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listTopicsSuccessResponseDeserializer(item: any): _ListTopicsSuccessResponse {
  return {
    value: topicRecordArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function topicRecordArraySerializer(result: Array<TopicRecord>): any[] {
  return result.map((item) => {
    return topicRecordSerializer(item);
  });
}

export function topicRecordArrayDeserializer(result: Array<TopicRecord>): any[] {
  return result.map((item) => {
    return topicRecordDeserializer(item);
  });
}

/** Response of a list operation. */
export interface _ConfluentAgreementResourceListResponse {
  /** The ConfluentAgreementResource items on this page */
  value: ConfluentAgreementResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _confluentAgreementResourceListResponseDeserializer(
  item: any,
): _ConfluentAgreementResourceListResponse {
  return {
    value: confluentAgreementResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function confluentAgreementResourceArraySerializer(
  result: Array<ConfluentAgreementResource>,
): any[] {
  return result.map((item) => {
    return confluentAgreementResourceSerializer(item);
  });
}

export function confluentAgreementResourceArrayDeserializer(
  result: Array<ConfluentAgreementResource>,
): any[] {
  return result.map((item) => {
    return confluentAgreementResourceDeserializer(item);
  });
}

/** Agreement Terms definition */
export interface ConfluentAgreementResource {
  /** The ARM id of the resource. */
  readonly id?: string;
  /** The name of the agreement. */
  readonly name?: string;
  /** The type of the agreement. */
  readonly type?: string;
  /** Metadata pertaining to creation and last modification of the resource */
  readonly systemData?: SystemData;
  /** Represents the properties of the resource. */
  properties?: ConfluentAgreementProperties;
}

export function confluentAgreementResourceSerializer(item: ConfluentAgreementResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : confluentAgreementPropertiesSerializer(item["properties"]),
  };
}

export function confluentAgreementResourceDeserializer(item: any): ConfluentAgreementResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : confluentAgreementPropertiesDeserializer(item["properties"]),
  };
}

/** Terms properties for Marketplace and Confluent. */
export interface ConfluentAgreementProperties {
  /** Publisher identifier string. */
  publisher?: string;
  /** Product identifier string. */
  product?: string;
  /** Plan identifier string. */
  plan?: string;
  /** Link to HTML with Microsoft and Publisher terms. */
  licenseTextLink?: string;
  /** Link to the privacy policy of the publisher. */
  privacyPolicyLink?: string;
  /** Date and time in UTC of when the terms were accepted. This is empty if Accepted is false. */
  retrieveDatetime?: Date;
  /** Terms signature. */
  signature?: string;
  /** If any version of the terms have been accepted, otherwise false. */
  accepted?: boolean;
}

export function confluentAgreementPropertiesSerializer(item: ConfluentAgreementProperties): any {
  return {
    publisher: item["publisher"],
    product: item["product"],
    plan: item["plan"],
    licenseTextLink: item["licenseTextLink"],
    privacyPolicyLink: item["privacyPolicyLink"],
    retrieveDatetime: !item["retrieveDatetime"]
      ? item["retrieveDatetime"]
      : item["retrieveDatetime"].toISOString(),
    signature: item["signature"],
    accepted: item["accepted"],
  };
}

export function confluentAgreementPropertiesDeserializer(item: any): ConfluentAgreementProperties {
  return {
    publisher: item["publisher"],
    product: item["product"],
    plan: item["plan"],
    licenseTextLink: item["licenseTextLink"],
    privacyPolicyLink: item["privacyPolicyLink"],
    retrieveDatetime: !item["retrieveDatetime"]
      ? item["retrieveDatetime"]
      : new Date(item["retrieveDatetime"]),
    signature: item["signature"],
    accepted: item["accepted"],
  };
}

/** Validation response from the provider */
export interface ValidationResponse {
  /** Info from the response */
  info?: Record<string, string>;
}

export function validationResponseDeserializer(item: any): ValidationResponse {
  return {
    info: item["info"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-07-01 API version. */
  V20240701 = "2024-07-01",
}
