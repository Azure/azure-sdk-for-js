// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
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
  readonly nextLink?: string;
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

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** An Anyscale on Azure terms and conditions that a subscription must accept before Anyscale resources can be provisioned. A read-only catalog entry that customers view and accept. */
export interface Agreement extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AgreementProperties;
}

export function agreementSerializer(item: Agreement): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : agreementPropertiesSerializer(item["properties"]),
  };
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
  };
}

/** Properties of an Anyscale agreement. All fields are RP-managed (read-only); customers read and accept, they do not author. */
export interface AgreementProperties {
  /** The provisioning state of the agreement resource. */
  readonly provisioningState?: ProvisioningState;
  /** The display name of the agreement. */
  readonly displayName?: string;
  /** URL to view/download the agreement document. */
  readonly agreementLink?: string;
  /** Current status of the agreement. */
  readonly status?: AgreementStatus;
  /** Date from which the agreement is effective (UTC). Present once accepted. */
  readonly effectiveDate?: Date;
}

export function agreementPropertiesSerializer(_item: AgreementProperties): any {
  return {};
}

export function agreementPropertiesDeserializer(item: any): AgreementProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    agreementLink: item["agreementLink"],
    status: item["status"],
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
  };
}

/** Provisioning state enum */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * Provisioning state enum \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ProvisioningState = string;

/** The current status of the agreement. */
export enum KnownAgreementStatus {
  /** The agreement is available but has not been accepted yet. */
  Pending = "Pending",
  /** The agreement has been accepted and is currently in effect. */
  Active = "Active",
}

/**
 * The current status of the agreement. \
 * {@link KnownAgreementStatus} can be used interchangeably with AgreementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: The agreement is available but has not been accepted yet. \
 * **Active**: The agreement has been accepted and is currently in effect.
 */
export type AgreementStatus = string;

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

/** The response of a Agreement list operation. */
export interface _AgreementListResult {
  /** The Agreement items on this page */
  value: Agreement[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _agreementListResultDeserializer(item: any): _AgreementListResult {
  return {
    value: agreementArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agreementArraySerializer(result: Array<Agreement>): any[] {
  return result.map((item) => {
    return agreementSerializer(item);
  });
}

export function agreementArrayDeserializer(result: Array<Agreement>): any[] {
  return result.map((item) => {
    return agreementDeserializer(item);
  });
}

/** Anyscale cloud resource */
export interface Cloud extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CloudProperties;
}

export function cloudSerializer(item: Cloud): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudPropertiesSerializer(item["properties"]),
  };
}

export function cloudDeserializer(item: any): Cloud {
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
      : cloudPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the cloud resource */
export interface CloudProperties {
  /** Optional Azure Container Registry resource ID for image builds. */
  acrResourceId?: string;
  /** The SSO URL for the cloud */
  readonly ssoUrl?: string;
  /** The provisioning state of the cloud resource */
  readonly provisioningState?: ProvisioningState;
}

export function cloudPropertiesSerializer(item: CloudProperties): any {
  return { acrResourceId: item["acrResourceId"] };
}

export function cloudPropertiesDeserializer(item: any): CloudProperties {
  return {
    acrResourceId: item["acrResourceId"],
    ssoUrl: item["ssoUrl"],
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** The type used for update operations of the Cloud. */
export interface CloudUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: CloudUpdateProperties;
}

export function cloudUpdateSerializer(item: CloudUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Cloud. */
export interface CloudUpdateProperties {
  /** Optional Azure Container Registry resource ID for image builds. */
  acrResourceId?: string;
}

export function cloudUpdatePropertiesSerializer(item: CloudUpdateProperties): any {
  return { acrResourceId: item["acrResourceId"] };
}

/** The response of a Cloud list operation. */
export interface _CloudListResult {
  /** The Cloud items on this page */
  value: Cloud[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _cloudListResultDeserializer(item: any): _CloudListResult {
  return {
    value: cloudArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudArraySerializer(result: Array<Cloud>): any[] {
  return result.map((item) => {
    return cloudSerializer(item);
  });
}

export function cloudArrayDeserializer(result: Array<Cloud>): any[] {
  return result.map((item) => {
    return cloudDeserializer(item);
  });
}

/** Anyscale cloud resource */
export interface CloudResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CloudResourceProperties;
}

export function cloudResourceSerializer(item: CloudResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudResourcePropertiesSerializer(item["properties"]),
  };
}

export function cloudResourceDeserializer(item: any): CloudResource {
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
      : cloudResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the cloud resource */
export interface CloudResourceProperties {
  /**
   * The cloud resource ID which is used during Anyscale operator bootstrap,
   * generated by Anyscale control plane.
   */
  readonly cloudResourceId?: string;
  /** Provider of the cloud resource */
  provider: Provider;
  /** Compute stack of the cloud resource */
  computeStack: ComputeStack;
  /**
   * A fully qualified storage bucket name for cloud storage,
   * e.g. s3://bucket-name, gs://bucket-name, or
   * abfss://bucket-name
   */
  cloudStorageBucketName: string;
  /** The cloud storage bucket endpoint */
  cloudStorageBucketEndpoint: string;
  /**
   * The cloud provider region of this cloud resource, e.g. us-west-2. For Generic clouds this is a
   * free-form routing label and need not match a real cloud provider region.
   * Defaults to the resource location when unset. Immutable once the resource is created.
   */
  region?: string;
  /**
   * The region of the cloud storage bucket. Defaults to `region` when unset.
   * Immutable once the resource is created.
   */
  cloudStorageBucketRegion?: string;
  /** The principal ID of the managed identity that will be used by the Anyscale operator */
  anyscaleOperatorIamIdentity?: string;
  /** The provisioning state of the cloud resource */
  readonly provisioningState?: ProvisioningState;
}

export function cloudResourcePropertiesSerializer(item: CloudResourceProperties): any {
  return {
    provider: item["provider"],
    computeStack: item["computeStack"],
    cloudStorageBucketName: item["cloudStorageBucketName"],
    cloudStorageBucketEndpoint: item["cloudStorageBucketEndpoint"],
    region: item["region"],
    cloudStorageBucketRegion: item["cloudStorageBucketRegion"],
    anyscaleOperatorIamIdentity: item["anyscaleOperatorIamIdentity"],
  };
}

export function cloudResourcePropertiesDeserializer(item: any): CloudResourceProperties {
  return {
    cloudResourceId: item["cloudResourceId"],
    provider: item["provider"],
    computeStack: item["computeStack"],
    cloudStorageBucketName: item["cloudStorageBucketName"],
    cloudStorageBucketEndpoint: item["cloudStorageBucketEndpoint"],
    region: item["region"],
    cloudStorageBucketRegion: item["cloudStorageBucketRegion"],
    anyscaleOperatorIamIdentity: item["anyscaleOperatorIamIdentity"],
    provisioningState: item["provisioningState"],
  };
}

/** Cloud provider for the cloud resources */
export enum KnownProvider {
  /** Microsoft Azure */
  Azure = "Azure",
  /** Generic Kubernetes */
  Generic = "Generic",
  /** Amazon Web Services */
  Aws = "AWS",
  /** Google Cloud Platform */
  Gcp = "GCP",
}

/**
 * Cloud provider for the cloud resources \
 * {@link KnownProvider} can be used interchangeably with Provider,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure**: Microsoft Azure \
 * **Generic**: Generic Kubernetes \
 * **AWS**: Amazon Web Services \
 * **GCP**: Google Cloud Platform
 */
export type Provider = string;

/** Compute stack associated with the cloud resource */
export enum KnownComputeStack {
  /** Kubernetes */
  K8S = "K8S",
}

/**
 * Compute stack associated with the cloud resource \
 * {@link KnownComputeStack} can be used interchangeably with ComputeStack,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **K8S**: Kubernetes
 */
export type ComputeStack = string;

/** The type used for update operations of the CloudResource. */
export interface CloudResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: CloudResourceUpdateProperties;
}

export function cloudResourceUpdateSerializer(item: CloudResourceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : cloudResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the CloudResource. */
export interface CloudResourceUpdateProperties {
  /** Provider of the cloud resource */
  provider?: Provider;
  /** Compute stack of the cloud resource */
  computeStack?: ComputeStack;
  /**
   * A fully qualified storage bucket name for cloud storage,
   * e.g. s3://bucket-name, gs://bucket-name, or
   * abfss://bucket-name
   */
  cloudStorageBucketName?: string;
  /** The cloud storage bucket endpoint */
  cloudStorageBucketEndpoint?: string;
  /** The principal ID of the managed identity that will be used by the Anyscale operator */
  anyscaleOperatorIamIdentity?: string;
}

export function cloudResourceUpdatePropertiesSerializer(item: CloudResourceUpdateProperties): any {
  return {
    provider: item["provider"],
    computeStack: item["computeStack"],
    cloudStorageBucketName: item["cloudStorageBucketName"],
    cloudStorageBucketEndpoint: item["cloudStorageBucketEndpoint"],
    anyscaleOperatorIamIdentity: item["anyscaleOperatorIamIdentity"],
  };
}

/** The response of a CloudResource list operation. */
export interface _CloudResourceListResult {
  /** The CloudResource items on this page */
  value: CloudResource[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _cloudResourceListResultDeserializer(item: any): _CloudResourceListResult {
  return {
    value: cloudResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudResourceArraySerializer(result: Array<CloudResource>): any[] {
  return result.map((item) => {
    return cloudResourceSerializer(item);
  });
}

export function cloudResourceArrayDeserializer(result: Array<CloudResource>): any[] {
  return result.map((item) => {
    return cloudResourceDeserializer(item);
  });
}

/** A compute configuration for launching Anyscale clusters. */
export interface ComputeConfig extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ComputeConfigProperties;
}

export function computeConfigSerializer(item: ComputeConfig): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : computeConfigPropertiesSerializer(item["properties"]),
  };
}

export function computeConfigDeserializer(item: any): ComputeConfig {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : computeConfigPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the compute config. */
export interface ComputeConfigProperties {
  /** Compute config specification. */
  spec: ComputeConfigSpec;
  /** The URL to the compute config overview page in the Anyscale console. */
  readonly url?: string;
  /** The current revision number. This is incremented when the compute config is updated. */
  readonly revision?: number;
  /** The provisioning state of the compute config. */
  readonly provisioningState?: ProvisioningState;
}

export function computeConfigPropertiesSerializer(item: ComputeConfigProperties): any {
  return { spec: computeConfigSpecSerializer(item["spec"]) };
}

export function computeConfigPropertiesDeserializer(item: any): ComputeConfigProperties {
  return {
    spec: computeConfigSpecDeserializer(item["spec"]),
    url: item["url"],
    revision: item["revision"],
    provisioningState: item["provisioningState"],
  };
}

/** Compute config specifications. */
export interface ComputeConfigSpec {
  /** A list of the compute config options. */
  options?: ComputeConfigSpecOption[];
}

export function computeConfigSpecSerializer(item: ComputeConfigSpec): any {
  return {
    options: !item["options"]
      ? item["options"]
      : computeConfigSpecOptionArraySerializer(item["options"]),
  };
}

export function computeConfigSpecDeserializer(item: any): ComputeConfigSpec {
  return {
    options: !item["options"]
      ? item["options"]
      : computeConfigSpecOptionArrayDeserializer(item["options"]),
  };
}

export function computeConfigSpecOptionArraySerializer(
  result: Array<ComputeConfigSpecOption>,
): any[] {
  return result.map((item) => {
    return computeConfigSpecOptionSerializer(item);
  });
}

export function computeConfigSpecOptionArrayDeserializer(
  result: Array<ComputeConfigSpecOption>,
): any[] {
  return result.map((item) => {
    return computeConfigSpecOptionDeserializer(item);
  });
}

/** One compute config option. */
export interface ComputeConfigSpecOption {
  /** The resource IDs of the cloud resources to use for this compute config under the Anyscale cloud to launch the cluster. If not specified, all cloud resources will be used. */
  cloudResourceNames?: string[];
  /** The node type to use for the head node. */
  headNode: NodeType;
  /** The node types to use for the worker nodes. */
  workerNodes?: WorkerNode[];
  /** The availability zones that sessions are allowed to be launched in, e.g. "eastus-1". If not specified or "any" is provided as the option, any AZ may be used. If "any" is provided, it must be the only item in the list. */
  zones?: string[];
  /** Advanced configurations for this deployment compute config to pass to the cloud provider when launching this instance. */
  advancedInstanceConfig?: string;
  /** A set of advanced cluster-level flags that can be used to configure a particular workload. */
  flags?: Record<string, any>;
}

export function computeConfigSpecOptionSerializer(item: ComputeConfigSpecOption): any {
  return {
    cloudResourceNames: !item["cloudResourceNames"]
      ? item["cloudResourceNames"]
      : item["cloudResourceNames"].map((p: any) => {
          return p;
        }),
    headNode: nodeTypeSerializer(item["headNode"]),
    workerNodes: !item["workerNodes"]
      ? item["workerNodes"]
      : workerNodeArraySerializer(item["workerNodes"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    advancedInstanceConfig: item["advancedInstanceConfig"],
    flags: !item["flags"] ? item["flags"] : _computeConfigSpecOptionFlagsSerializer(item["flags"]),
  };
}

export function computeConfigSpecOptionDeserializer(item: any): ComputeConfigSpecOption {
  return {
    cloudResourceNames: !item["cloudResourceNames"]
      ? item["cloudResourceNames"]
      : item["cloudResourceNames"].map((p: any) => {
          return p;
        }),
    headNode: nodeTypeDeserializer(item["headNode"]),
    workerNodes: !item["workerNodes"]
      ? item["workerNodes"]
      : workerNodeArrayDeserializer(item["workerNodes"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    advancedInstanceConfig: item["advancedInstanceConfig"],
    flags: !item["flags"]
      ? item["flags"]
      : _computeConfigSpecOptionFlagsDeserializer(item["flags"]),
  };
}

/** Configuration of a node group. */
export interface NodeType {
  /** Unique name of this node group. */
  name: string;
  /** The cloud provider instance type to use for this node. Optional when using requiredResources. */
  instanceType?: string;
  /** Declaration of logical node resources for Ray. */
  resources?: LogicalResources;
  /** Required resources for compute node type which specifies the actual CPU, memory, and GPU resources that should be allocated for this node type. */
  requiredResources?: PhysicalResources;
  /** Labels to associate the node with for Ray scheduling purposes. */
  labels?: Record<string, any>;
  /** Required labels that must be present on the node for node (pod) scheduling purposes. */
  requiredLabels?: Record<string, any>;
  /** Advanced configurations for this compute node type to pass to the cloud provider when launching this instance. */
  advancedInstanceConfig?: string;
  /** A set of advanced node-level flags that can be used to configure a particular workload. */
  flags?: Record<string, any>;
}

export function nodeTypeSerializer(item: NodeType): any {
  return {
    name: item["name"],
    instanceType: item["instanceType"],
    resources: !item["resources"]
      ? item["resources"]
      : logicalResourcesSerializer(item["resources"]),
    requiredResources: !item["requiredResources"]
      ? item["requiredResources"]
      : physicalResourcesSerializer(item["requiredResources"]),
    labels: !item["labels"] ? item["labels"] : _nodeTypeLabelsSerializer(item["labels"]),
    requiredLabels: !item["requiredLabels"]
      ? item["requiredLabels"]
      : _nodeTypeRequiredLabelsSerializer(item["requiredLabels"]),
    advancedInstanceConfig: item["advancedInstanceConfig"],
    flags: !item["flags"] ? item["flags"] : _nodeTypeFlagsSerializer(item["flags"]),
  };
}

export function nodeTypeDeserializer(item: any): NodeType {
  return {
    name: item["name"],
    instanceType: item["instanceType"],
    resources: !item["resources"]
      ? item["resources"]
      : logicalResourcesDeserializer(item["resources"]),
    requiredResources: !item["requiredResources"]
      ? item["requiredResources"]
      : physicalResourcesDeserializer(item["requiredResources"]),
    labels: !item["labels"] ? item["labels"] : _nodeTypeLabelsDeserializer(item["labels"]),
    requiredLabels: !item["requiredLabels"]
      ? item["requiredLabels"]
      : _nodeTypeRequiredLabelsDeserializer(item["requiredLabels"]),
    advancedInstanceConfig: item["advancedInstanceConfig"],
    flags: !item["flags"] ? item["flags"] : _nodeTypeFlagsDeserializer(item["flags"]),
  };
}

/** Logical resources for a node type used during Ray scheduling. */
export interface LogicalResources {
  /** Number of CPUs in this node type. */
  cpu?: number;
  /** Number of GPUs in this node type. */
  gpu?: number;
  /** Amount of memory to allocate to the Python worker. */
  memory?: number;
  /** The amount of memory in bytes allocated for the Ray object store on this node. */
  objectStoreMemory?: number;
  /** Custom resources for this node to be used by Ray autoscaler. */
  customResources?: Record<string, any>;
}

export function logicalResourcesSerializer(item: LogicalResources): any {
  return {
    cpu: item["cpu"],
    gpu: item["gpu"],
    memory: item["memory"],
    objectStoreMemory: item["objectStoreMemory"],
    customResources: !item["customResources"]
      ? item["customResources"]
      : _logicalResourcesCustomResourcesSerializer(item["customResources"]),
  };
}

export function logicalResourcesDeserializer(item: any): LogicalResources {
  return {
    cpu: item["cpu"],
    gpu: item["gpu"],
    memory: item["memory"],
    objectStoreMemory: item["objectStoreMemory"],
    customResources: !item["customResources"]
      ? item["customResources"]
      : _logicalResourcesCustomResourcesDeserializer(item["customResources"]),
  };
}

/** model interface _LogicalResourcesCustomResources */
export interface _LogicalResourcesCustomResources {}

export function _logicalResourcesCustomResourcesSerializer(
  _item: _LogicalResourcesCustomResources,
): any {
  return {};
}

export function _logicalResourcesCustomResourcesDeserializer(
  item: any,
): _LogicalResourcesCustomResources {
  return item;
}

/** Physical resources for the underlying node type. */
export interface PhysicalResources {
  /** Number of CPUs to allocate. */
  cpu?: number;
  /** Number of GPUs to allocate. */
  gpu?: number;
  /** Amount of memory in bytes to allocate. */
  memory?: number;
  /** Number of TPUs to allocate. */
  tpu?: number;
  /** Type of accelerator (e.g., 'T4', 'L4', 'H100'). */
  accelerator?: string;
  /** CPU architecture type. */
  cpuArchitecture?: CpuArchitecture;
}

export function physicalResourcesSerializer(item: PhysicalResources): any {
  return {
    cpu: item["cpu"],
    gpu: item["gpu"],
    memory: item["memory"],
    tpu: item["tpu"],
    accelerator: item["accelerator"],
    cpuArchitecture: item["cpuArchitecture"],
  };
}

export function physicalResourcesDeserializer(item: any): PhysicalResources {
  return {
    cpu: item["cpu"],
    gpu: item["gpu"],
    memory: item["memory"],
    tpu: item["tpu"],
    accelerator: item["accelerator"],
    cpuArchitecture: item["cpuArchitecture"],
  };
}

/** CPU architecture type. */
export enum KnownCpuArchitecture {
  /** x86 64-bit architecture. */
  X8664 = "x86_64",
  /** ARM 64-bit architecture. */
  Arm64 = "arm64",
}

/**
 * CPU architecture type. \
 * {@link KnownCpuArchitecture} can be used interchangeably with CpuArchitecture,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **x86_64**: x86 64-bit architecture. \
 * **arm64**: ARM 64-bit architecture.
 */
export type CpuArchitecture = string;

/** model interface _NodeTypeLabels */
export interface _NodeTypeLabels {}

export function _nodeTypeLabelsSerializer(_item: _NodeTypeLabels): any {
  return {};
}

export function _nodeTypeLabelsDeserializer(item: any): _NodeTypeLabels {
  return item;
}

/** model interface _NodeTypeRequiredLabels */
export interface _NodeTypeRequiredLabels {}

export function _nodeTypeRequiredLabelsSerializer(_item: _NodeTypeRequiredLabels): any {
  return {};
}

export function _nodeTypeRequiredLabelsDeserializer(item: any): _NodeTypeRequiredLabels {
  return item;
}

/** model interface _NodeTypeFlags */
export interface _NodeTypeFlags {}

export function _nodeTypeFlagsSerializer(_item: _NodeTypeFlags): any {
  return {};
}

export function _nodeTypeFlagsDeserializer(item: any): _NodeTypeFlags {
  return item;
}

export function workerNodeArraySerializer(result: Array<WorkerNode>): any[] {
  return result.map((item) => {
    return workerNodeSerializer(item);
  });
}

export function workerNodeArrayDeserializer(result: Array<WorkerNode>): any[] {
  return result.map((item) => {
    return workerNodeDeserializer(item);
  });
}

/** Configuration for a worker node group. */
export interface WorkerNode extends NodeType {
  /** Minimum number of nodes of this type that will be kept running in the cluster. */
  minNodes?: number;
  /** Maximum number of nodes of this type that can be running in the cluster. */
  maxNodes?: number;
  /** Market type of the instances. */
  marketType?: MarketType;
}

export function workerNodeSerializer(item: WorkerNode): any {
  return {
    name: item["name"],
    instanceType: item["instanceType"],
    resources: !item["resources"]
      ? item["resources"]
      : logicalResourcesSerializer(item["resources"]),
    requiredResources: !item["requiredResources"]
      ? item["requiredResources"]
      : physicalResourcesSerializer(item["requiredResources"]),
    labels: !item["labels"] ? item["labels"] : _nodeTypeLabelsSerializer(item["labels"]),
    requiredLabels: !item["requiredLabels"]
      ? item["requiredLabels"]
      : _nodeTypeRequiredLabelsSerializer(item["requiredLabels"]),
    advancedInstanceConfig: item["advancedInstanceConfig"],
    flags: !item["flags"] ? item["flags"] : _nodeTypeFlagsSerializer(item["flags"]),
    minNodes: item["minNodes"],
    maxNodes: item["maxNodes"],
    marketType: item["marketType"],
  };
}

export function workerNodeDeserializer(item: any): WorkerNode {
  return {
    name: item["name"],
    instanceType: item["instanceType"],
    resources: !item["resources"]
      ? item["resources"]
      : logicalResourcesDeserializer(item["resources"]),
    requiredResources: !item["requiredResources"]
      ? item["requiredResources"]
      : physicalResourcesDeserializer(item["requiredResources"]),
    labels: !item["labels"] ? item["labels"] : _nodeTypeLabelsDeserializer(item["labels"]),
    requiredLabels: !item["requiredLabels"]
      ? item["requiredLabels"]
      : _nodeTypeRequiredLabelsDeserializer(item["requiredLabels"]),
    advancedInstanceConfig: item["advancedInstanceConfig"],
    flags: !item["flags"] ? item["flags"] : _nodeTypeFlagsDeserializer(item["flags"]),
    minNodes: item["minNodes"],
    maxNodes: item["maxNodes"],
    marketType: item["marketType"],
  };
}

/** Market type of instances to use (on-demand vs spot). */
export enum KnownMarketType {
  /** Use on-demand instances only. */
  OnDemand = "ON_DEMAND",
  /** Use spot instances only. */
  Spot = "SPOT",
  /** Prefer to use spot instances but fall back to on-demand if necessary. */
  PreferSpot = "PREFER_SPOT",
}

/**
 * Market type of instances to use (on-demand vs spot). \
 * {@link KnownMarketType} can be used interchangeably with MarketType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ON_DEMAND**: Use on-demand instances only. \
 * **SPOT**: Use spot instances only. \
 * **PREFER_SPOT**: Prefer to use spot instances but fall back to on-demand if necessary.
 */
export type MarketType = string;

/** model interface _ComputeConfigSpecOptionFlags */
export interface _ComputeConfigSpecOptionFlags {}

export function _computeConfigSpecOptionFlagsSerializer(_item: _ComputeConfigSpecOptionFlags): any {
  return {};
}

export function _computeConfigSpecOptionFlagsDeserializer(
  item: any,
): _ComputeConfigSpecOptionFlags {
  return item;
}

/** The type used for update operations of the ComputeConfig. */
export interface ComputeConfigUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ComputeConfigUpdateProperties;
}

export function computeConfigUpdateSerializer(item: ComputeConfigUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : computeConfigUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the ComputeConfig. */
export interface ComputeConfigUpdateProperties {
  /** Compute config specification. */
  spec?: ComputeConfigSpec;
}

export function computeConfigUpdatePropertiesSerializer(item: ComputeConfigUpdateProperties): any {
  return { spec: !item["spec"] ? item["spec"] : computeConfigSpecSerializer(item["spec"]) };
}

/** The response of a ComputeConfig list operation. */
export interface _ComputeConfigListResult {
  /** The ComputeConfig items on this page */
  value: ComputeConfig[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _computeConfigListResultDeserializer(item: any): _ComputeConfigListResult {
  return {
    value: computeConfigArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function computeConfigArraySerializer(result: Array<ComputeConfig>): any[] {
  return result.map((item) => {
    return computeConfigSerializer(item);
  });
}

export function computeConfigArrayDeserializer(result: Array<ComputeConfig>): any[] {
  return result.map((item) => {
    return computeConfigDeserializer(item);
  });
}

/** A container image used by Anyscale workloads. */
export interface ContainerImage extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ContainerImageProperties;
}

export function containerImageSerializer(item: ContainerImage): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : containerImagePropertiesSerializer(item["properties"]),
  };
}

export function containerImageDeserializer(item: any): ContainerImage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : containerImagePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a container image. Exactly one of `containerfile` or `containerImageUri` must be provided. */
export interface ContainerImageProperties {
  /** Containerfile content to use to build the container image. Mutually exclusive with containerImageUri. */
  containerfile?: string;
  /** A pre-built container image reference from an external registry, such as registry/repository:tag or registry/repository@sha256:digest. Mutually exclusive with containerfile. */
  containerImageUri?: string;
  /** The URL link of the container image to the Anyscale console. */
  readonly url?: string;
  /** The current revision number. This is incremented when the container image is updated. */
  readonly revision?: number;
  /** The current state of the container image build. */
  readonly buildState?: ContainerImageBuildState;
  /** The provisioning state of the container image. */
  readonly provisioningState?: ProvisioningState;
}

export function containerImagePropertiesSerializer(item: ContainerImageProperties): any {
  return { containerfile: item["containerfile"], containerImageUri: item["containerImageUri"] };
}

export function containerImagePropertiesDeserializer(item: any): ContainerImageProperties {
  return {
    containerfile: item["containerfile"],
    containerImageUri: item["containerImageUri"],
    url: item["url"],
    revision: item["revision"],
    buildState: item["buildState"],
    provisioningState: item["provisioningState"],
  };
}

/** State of a container image build. */
export enum KnownContainerImageBuildState {
  /** Build is queued; has not started yet. */
  BuildPending = "BuildPending",
  /** Build is in progress. */
  BuildInProgress = "BuildInProgress",
  /** Build has completed successfully. */
  BuildSucceeded = "BuildSucceeded",
  /** Build has completed with a failure. */
  BuildFailed = "BuildFailed",
}

/**
 * State of a container image build. \
 * {@link KnownContainerImageBuildState} can be used interchangeably with ContainerImageBuildState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BuildPending**: Build is queued; has not started yet. \
 * **BuildInProgress**: Build is in progress. \
 * **BuildSucceeded**: Build has completed successfully. \
 * **BuildFailed**: Build has completed with a failure.
 */
export type ContainerImageBuildState = string;

/** The type used for update operations of the ContainerImage. */
export interface ContainerImageUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ContainerImageUpdateProperties;
}

export function containerImageUpdateSerializer(item: ContainerImageUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : containerImageUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the ContainerImage. */
export interface ContainerImageUpdateProperties {
  /** Containerfile content to use to build the container image. Mutually exclusive with containerImageUri. */
  containerfile?: string;
  /** A pre-built container image reference from an external registry, such as registry/repository:tag or registry/repository@sha256:digest. Mutually exclusive with containerfile. */
  containerImageUri?: string;
}

export function containerImageUpdatePropertiesSerializer(
  item: ContainerImageUpdateProperties,
): any {
  return { containerfile: item["containerfile"], containerImageUri: item["containerImageUri"] };
}

/** The response of a ContainerImage list operation. */
export interface _ContainerImageListResult {
  /** The ContainerImage items on this page */
  value: ContainerImage[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _containerImageListResultDeserializer(item: any): _ContainerImageListResult {
  return {
    value: containerImageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerImageArraySerializer(result: Array<ContainerImage>): any[] {
  return result.map((item) => {
    return containerImageSerializer(item);
  });
}

export function containerImageArrayDeserializer(result: Array<ContainerImage>): any[] {
  return result.map((item) => {
    return containerImageDeserializer(item);
  });
}

/** A job that runs a workload in an Anyscale project. */
export interface Job extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: JobProperties;
}

export function jobSerializer(item: Job): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : jobPropertiesSerializer(item["properties"]),
  };
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
  };
}

/** The properties of the job. */
export interface JobProperties {
  /** The configuration for the job. */
  config: JobConfig;
  /** The current state of the job. */
  readonly state?: JobState;
  /** The URL to the job overview page in the Anyscale console. */
  readonly url?: string;
  /** The provisioning state of the job. */
  readonly provisioningState?: ProvisioningState;
}

export function jobPropertiesSerializer(item: JobProperties): any {
  return { config: jobConfigSerializer(item["config"]) };
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    config: jobConfigDeserializer(item["config"]),
    state: item["state"],
    url: item["url"],
    provisioningState: item["provisioningState"],
  };
}

/** The configuration of the job. */
export interface JobConfig {
  /** The Ray container image reference to use for the job, such as registry/repository:tag or registry/repository@sha256:digest. */
  imageUri?: string;
  /** The compute configuration for the job, either the name of predefined compute config or an inline compute configs object. */
  computeConfig?: ComputeConfigSpecOrReference;
  /** Command that will be run to execute the job, e.g. 'python main.py'. */
  entrypoint?: string;
  /** The remote archive location where your code will run, such as an abfss://, s3://, gs://, or https:// path. */
  workingDir?: string;
  /** Remote locations of Python modules to install along with the runtime environment. */
  pyModules?: string[];
  /** Pip package requirements to install on top of the image, such as package names, version specifiers, or requirements-file arguments. */
  pipRequirements?: string[];
  /** Environment variables to set. */
  envVars?: Record<string, any>;
  /** Maximum number of times the job will be retried before being marked failed. */
  maxRetries?: number;
  /** The timeout in seconds for each job run. */
  timeout?: number;
}

export function jobConfigSerializer(item: JobConfig): any {
  return {
    imageUri: item["imageUri"],
    computeConfig: !item["computeConfig"]
      ? item["computeConfig"]
      : computeConfigSpecOrReferenceSerializer(item["computeConfig"]),
    entrypoint: item["entrypoint"],
    workingDir: item["workingDir"],
    pyModules: !item["pyModules"]
      ? item["pyModules"]
      : item["pyModules"].map((p: any) => {
          return p;
        }),
    pipRequirements: !item["pipRequirements"]
      ? item["pipRequirements"]
      : item["pipRequirements"].map((p: any) => {
          return p;
        }),
    envVars: !item["envVars"] ? item["envVars"] : _jobConfigEnvVarsSerializer(item["envVars"]),
    maxRetries: item["maxRetries"],
    timeout: item["timeout"],
  };
}

export function jobConfigDeserializer(item: any): JobConfig {
  return {
    imageUri: item["imageUri"],
    computeConfig: !item["computeConfig"]
      ? item["computeConfig"]
      : computeConfigSpecOrReferenceDeserializer(item["computeConfig"]),
    entrypoint: item["entrypoint"],
    workingDir: item["workingDir"],
    pyModules: !item["pyModules"]
      ? item["pyModules"]
      : item["pyModules"].map((p: any) => {
          return p;
        }),
    pipRequirements: !item["pipRequirements"]
      ? item["pipRequirements"]
      : item["pipRequirements"].map((p: any) => {
          return p;
        }),
    envVars: !item["envVars"] ? item["envVars"] : _jobConfigEnvVarsDeserializer(item["envVars"]),
    maxRetries: item["maxRetries"],
    timeout: item["timeout"],
  };
}

/** An inline compute config spec or a predefined compute config which is used in the workload. */
export interface ComputeConfigSpecOrReference {
  /** The inlined compute config spec. */
  spec?: ComputeConfigSpec;
  /** The resource ID of an existing predefined compute config. */
  computeConfigName?: string;
}

export function computeConfigSpecOrReferenceSerializer(item: ComputeConfigSpecOrReference): any {
  return {
    spec: !item["spec"] ? item["spec"] : computeConfigSpecSerializer(item["spec"]),
    computeConfigName: item["computeConfigName"],
  };
}

export function computeConfigSpecOrReferenceDeserializer(item: any): ComputeConfigSpecOrReference {
  return {
    spec: !item["spec"] ? item["spec"] : computeConfigSpecDeserializer(item["spec"]),
    computeConfigName: item["computeConfigName"],
  };
}

/** model interface _JobConfigEnvVars */
export interface _JobConfigEnvVars {}

export function _jobConfigEnvVarsSerializer(_item: _JobConfigEnvVars): any {
  return {};
}

export function _jobConfigEnvVarsDeserializer(item: any): _JobConfigEnvVars {
  return item;
}

/** The current state of a job. */
export enum KnownJobState {
  /** The job is being started and is not yet running. */
  Starting = "Starting",
  /** The job is running. */
  Running = "Running",
  /** The job did not finish running or the entrypoint returned a non-zero exit code after retrying up to max_retries times. */
  Failed = "Failed",
  /** The job finished running and its entrypoint returned exit code 0. */
  Succeeded = "Succeeded",
  /** The job state is unknown. */
  Unknown = "Unknown",
}

/**
 * The current state of a job. \
 * {@link KnownJobState} can be used interchangeably with JobState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Starting**: The job is being started and is not yet running. \
 * **Running**: The job is running. \
 * **Failed**: The job did not finish running or the entrypoint returned a non-zero exit code after retrying up to max_retries times. \
 * **Succeeded**: The job finished running and its entrypoint returned exit code 0. \
 * **Unknown**: The job state is unknown.
 */
export type JobState = string;

/** The type used for update operations of the Job. */
export interface JobUpdate {
  /** The resource-specific properties for this resource. */
  properties?: JobUpdateProperties;
}

export function jobUpdateSerializer(item: JobUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : jobUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Job. */
export interface JobUpdateProperties {
  /** The configuration for the job. */
  config?: JobConfig;
}

export function jobUpdatePropertiesSerializer(item: JobUpdateProperties): any {
  return { config: !item["config"] ? item["config"] : jobConfigSerializer(item["config"]) };
}

/** The response of a Job list operation. */
export interface _JobListResult {
  /** The Job items on this page */
  value: Job[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _jobListResultDeserializer(item: any): _JobListResult {
  return {
    value: jobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jobArraySerializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobSerializer(item);
  });
}

export function jobArrayDeserializer(result: Array<Job>): any[] {
  return result.map((item) => {
    return jobDeserializer(item);
  });
}

/** A project that organizes Anyscale workloads. */
export interface Project extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ProjectProperties;
}

export function projectSerializer(item: Project): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesSerializer(item["properties"]),
  };
}

export function projectDeserializer(item: any): Project {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : projectPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the project. */
export interface ProjectProperties {
  /** The URL link of the project to the Anyscale console. */
  readonly url?: string;
  /** The provisioning state of the project. */
  readonly provisioningState?: ProvisioningState;
}

export function projectPropertiesSerializer(_item: ProjectProperties): any {
  return {};
}

export function projectPropertiesDeserializer(item: any): ProjectProperties {
  return {
    url: item["url"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a Project list operation. */
export interface _ProjectListResult {
  /** The Project items on this page */
  value: Project[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _projectListResultDeserializer(item: any): _ProjectListResult {
  return {
    value: projectArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function projectArraySerializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectSerializer(item);
  });
}

export function projectArrayDeserializer(result: Array<Project>): any[] {
  return result.map((item) => {
    return projectDeserializer(item);
  });
}

/** An Anyscale service that serves Ray Serve applications. */
export interface Service extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ServiceProperties;
}

export function serviceSerializer(item: Service): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : servicePropertiesSerializer(item["properties"]),
  };
}

export function serviceDeserializer(item: any): Service {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : servicePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the Anyscale service. */
export interface ServiceProperties {
  /** Deployment config of the Anyscale service. */
  deploymentConfig?: ServiceDeploymentConfig;
  /** The current running state of the service. */
  readonly currentState?: ServiceCurrentState;
  /** The hostname of the service endpoint. */
  readonly hostname?: string;
  /** The base URL of the service endpoint. */
  readonly baseUrl?: string;
  /** Whether the service has auto-rollout enabled. */
  readonly autoRolloutEnabled?: boolean;
  /** The primary (stable) version of the service. If the service is terminated, this refers to the most recently active version. */
  readonly primaryVersion?: ServiceVersionDetail;
  /** The canary version of the service. Present only during a rolling out state. */
  readonly canaryVersion?: ServiceVersionDetail;
  /** The URL link to the service in the Anyscale console. */
  readonly url?: string;
  /** The provisioning state of the Anyscale service. */
  readonly provisioningState?: ProvisioningState;
}

export function servicePropertiesSerializer(item: ServiceProperties): any {
  return {
    deploymentConfig: !item["deploymentConfig"]
      ? item["deploymentConfig"]
      : serviceDeploymentConfigSerializer(item["deploymentConfig"]),
  };
}

export function servicePropertiesDeserializer(item: any): ServiceProperties {
  return {
    deploymentConfig: !item["deploymentConfig"]
      ? item["deploymentConfig"]
      : serviceDeploymentConfigDeserializer(item["deploymentConfig"]),
    currentState: item["currentState"],
    hostname: item["hostname"],
    baseUrl: item["baseUrl"],
    autoRolloutEnabled: item["autoRolloutEnabled"],
    primaryVersion: !item["primaryVersion"]
      ? item["primaryVersion"]
      : serviceVersionDetailDeserializer(item["primaryVersion"]),
    canaryVersion: !item["canaryVersion"]
      ? item["canaryVersion"]
      : serviceVersionDetailDeserializer(item["canaryVersion"]),
    url: item["url"],
    provisioningState: item["provisioningState"],
  };
}

/** Configurable deployment properties for a service. These fields are user-writable on create and update. */
export interface ServiceDeploymentConfig {
  /** Optional description of the service. */
  description?: string;
  /** The compute config to use for the service. */
  computeConfig?: ComputeConfigSpecOrReference;
  /** The container image reference to use for the service, such as registry/repository:tag or registry/repository@sha256:digest. */
  imageUri?: string;
  /** List of Ray Serve applications to run. At least one application must be specified. Each application must include an 'importPath'. See https://docs.ray.io/en/latest/serve/production-guide/config.html for the Ray Serve config format. */
  applications?: Record<string, any>[];
  /** The deployment rollout strategy. Defaults to Rollout. */
  rolloutStrategy?: RolloutStrategy;
  /** The version identifier for this deployment. Auto-generated if not provided. */
  version?: string;
  /** The percentage of traffic to route to the canary version during rollout (0-100). If not set, the service will automatically roll out. */
  canaryPercent?: number;
  /** The maximum percentage of excess capacity allowed during rollout (0-100). */
  maxSurgePercent?: number;
  /** Whether to automatically complete the rollout when the canary version reaches 100% traffic. Defaults to true. */
  autoCompleteRollout?: boolean;
  /** The traffic percentage for this version in a multi-version deployment (0-100). All version weights must sum to 100. */
  trafficPercent?: number;
  /** HTTP protocol configuration. */
  httpConfig?: Record<string, any>;
  /** gRPC protocol configuration. */
  grpcConfig?: Record<string, any>;
  /** Auto-termination timeout in seconds. The service will be unconditionally terminated after this period. Setting to 0 disables auto-termination (default). */
  maxUptimeTimeoutSec?: number;
  /** Environment variables to set on the service cluster. */
  envVars?: Record<string, any>;
  /** Tracing configuration for distributed tracing. */
  tracingConfig?: TracingConfig;
  /** External storage configuration for Ray GCS head node fault tolerance. If populated, head node fault tolerance will be enabled. */
  rayGcsExternalStorageConfig?: RayGcsExternalStorageConfig;
  /** List of connection IDs to associate with the service for third-party integrations. */
  connectionIds?: string[];
}

export function serviceDeploymentConfigSerializer(item: ServiceDeploymentConfig): any {
  return {
    description: item["description"],
    computeConfig: !item["computeConfig"]
      ? item["computeConfig"]
      : computeConfigSpecOrReferenceSerializer(item["computeConfig"]),
    imageUri: item["imageUri"],
    applications: !item["applications"]
      ? item["applications"]
      : _serviceDeploymentConfigApplicationArraySerializer(item["applications"]),
    rolloutStrategy: item["rolloutStrategy"],
    version: item["version"],
    canaryPercent: item["canaryPercent"],
    maxSurgePercent: item["maxSurgePercent"],
    autoCompleteRollout: item["autoCompleteRollout"],
    trafficPercent: item["trafficPercent"],
    httpConfig: !item["httpConfig"]
      ? item["httpConfig"]
      : _serviceDeploymentConfigHttpConfigSerializer(item["httpConfig"]),
    grpcConfig: !item["grpcConfig"]
      ? item["grpcConfig"]
      : _serviceDeploymentConfigGrpcConfigSerializer(item["grpcConfig"]),
    maxUptimeTimeoutSec: item["maxUptimeTimeoutSec"],
    envVars: !item["envVars"]
      ? item["envVars"]
      : _serviceDeploymentConfigEnvVarsSerializer(item["envVars"]),
    tracingConfig: !item["tracingConfig"]
      ? item["tracingConfig"]
      : tracingConfigSerializer(item["tracingConfig"]),
    rayGcsExternalStorageConfig: !item["rayGcsExternalStorageConfig"]
      ? item["rayGcsExternalStorageConfig"]
      : rayGcsExternalStorageConfigSerializer(item["rayGcsExternalStorageConfig"]),
    connectionIds: !item["connectionIds"]
      ? item["connectionIds"]
      : item["connectionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function serviceDeploymentConfigDeserializer(item: any): ServiceDeploymentConfig {
  return {
    description: item["description"],
    computeConfig: !item["computeConfig"]
      ? item["computeConfig"]
      : computeConfigSpecOrReferenceDeserializer(item["computeConfig"]),
    imageUri: item["imageUri"],
    applications: !item["applications"]
      ? item["applications"]
      : _serviceDeploymentConfigApplicationArrayDeserializer(item["applications"]),
    rolloutStrategy: item["rolloutStrategy"],
    version: item["version"],
    canaryPercent: item["canaryPercent"],
    maxSurgePercent: item["maxSurgePercent"],
    autoCompleteRollout: item["autoCompleteRollout"],
    trafficPercent: item["trafficPercent"],
    httpConfig: !item["httpConfig"]
      ? item["httpConfig"]
      : _serviceDeploymentConfigHttpConfigDeserializer(item["httpConfig"]),
    grpcConfig: !item["grpcConfig"]
      ? item["grpcConfig"]
      : _serviceDeploymentConfigGrpcConfigDeserializer(item["grpcConfig"]),
    maxUptimeTimeoutSec: item["maxUptimeTimeoutSec"],
    envVars: !item["envVars"]
      ? item["envVars"]
      : _serviceDeploymentConfigEnvVarsDeserializer(item["envVars"]),
    tracingConfig: !item["tracingConfig"]
      ? item["tracingConfig"]
      : tracingConfigDeserializer(item["tracingConfig"]),
    rayGcsExternalStorageConfig: !item["rayGcsExternalStorageConfig"]
      ? item["rayGcsExternalStorageConfig"]
      : rayGcsExternalStorageConfigDeserializer(item["rayGcsExternalStorageConfig"]),
    connectionIds: !item["connectionIds"]
      ? item["connectionIds"]
      : item["connectionIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _serviceDeploymentConfigApplicationArraySerializer(
  result: Array<_ServiceDeploymentConfigApplication>,
): any[] {
  return result.map((item) => {
    return _serviceDeploymentConfigApplicationSerializer(item);
  });
}

export function _serviceDeploymentConfigApplicationArrayDeserializer(
  result: Array<_ServiceDeploymentConfigApplication>,
): any[] {
  return result.map((item) => {
    return _serviceDeploymentConfigApplicationDeserializer(item);
  });
}

/** model interface _ServiceDeploymentConfigApplication */
export interface _ServiceDeploymentConfigApplication {}

export function _serviceDeploymentConfigApplicationSerializer(
  _item: _ServiceDeploymentConfigApplication,
): any {
  return {};
}

export function _serviceDeploymentConfigApplicationDeserializer(
  item: any,
): _ServiceDeploymentConfigApplication {
  return item;
}

/** The deployment rollout strategy for a service. */
export enum KnownRolloutStrategy {
  /** Deploy to a new cluster and gradually shift traffic via canary deployment. */
  Rollout = "Rollout",
  /** Update the existing cluster in-place via Ray Serve. Only ray_serve_config changes are allowed. */
  InPlace = "InPlace",
  /** Deploy multiple versions simultaneously with explicit traffic allocation. */
  MultiVersion = "MultiVersion",
}

/**
 * The deployment rollout strategy for a service. \
 * {@link KnownRolloutStrategy} can be used interchangeably with RolloutStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rollout**: Deploy to a new cluster and gradually shift traffic via canary deployment. \
 * **InPlace**: Update the existing cluster in-place via Ray Serve. Only ray_serve_config changes are allowed. \
 * **MultiVersion**: Deploy multiple versions simultaneously with explicit traffic allocation.
 */
export type RolloutStrategy = string;

/** model interface _ServiceDeploymentConfigHttpConfig */
export interface _ServiceDeploymentConfigHttpConfig {}

export function _serviceDeploymentConfigHttpConfigSerializer(
  _item: _ServiceDeploymentConfigHttpConfig,
): any {
  return {};
}

export function _serviceDeploymentConfigHttpConfigDeserializer(
  item: any,
): _ServiceDeploymentConfigHttpConfig {
  return item;
}

/** model interface _ServiceDeploymentConfigGrpcConfig */
export interface _ServiceDeploymentConfigGrpcConfig {}

export function _serviceDeploymentConfigGrpcConfigSerializer(
  _item: _ServiceDeploymentConfigGrpcConfig,
): any {
  return {};
}

export function _serviceDeploymentConfigGrpcConfigDeserializer(
  item: any,
): _ServiceDeploymentConfigGrpcConfig {
  return item;
}

/** model interface _ServiceDeploymentConfigEnvVars */
export interface _ServiceDeploymentConfigEnvVars {}

export function _serviceDeploymentConfigEnvVarsSerializer(
  _item: _ServiceDeploymentConfigEnvVars,
): any {
  return {};
}

export function _serviceDeploymentConfigEnvVarsDeserializer(
  item: any,
): _ServiceDeploymentConfigEnvVars {
  return item;
}

/** Tracing configuration for distributed tracing. */
export interface TracingConfig {
  /** Whether tracing is enabled. If enabled and no exporterImportPath is defined, the default tracing exporter will be used. Defaults to true. */
  enabled?: boolean;
  /** Custom tracing exporter import path. Should be of the form 'module.submodule.export_tracing'. */
  exporterImportPath?: string;
  /** The sampling ratio for tracing (0.0 to 1.0). Reducing the ratio minimizes serving latency and storage overhead. Defaults to 1.0. */
  samplingRatio?: number;
}

export function tracingConfigSerializer(item: TracingConfig): any {
  return {
    enabled: item["enabled"],
    exporterImportPath: item["exporterImportPath"],
    samplingRatio: item["samplingRatio"],
  };
}

export function tracingConfigDeserializer(item: any): TracingConfig {
  return {
    enabled: item["enabled"],
    exporterImportPath: item["exporterImportPath"],
    samplingRatio: item["samplingRatio"],
  };
}

/** External storage configuration for Ray GCS fault tolerance. */
export interface RayGcsExternalStorageConfig {
  /** Address of the external storage (e.g., Redis). Must be accessible from instances in the cloud. */
  address?: string;
  /** Path to the TLS certificate file to use for authentication when using secure connections. Defaults to the cloud-wide configuration. */
  certificatePath?: string;
}

export function rayGcsExternalStorageConfigSerializer(item: RayGcsExternalStorageConfig): any {
  return { address: item["address"], certificatePath: item["certificatePath"] };
}

export function rayGcsExternalStorageConfigDeserializer(item: any): RayGcsExternalStorageConfig {
  return {
    address: item["address"],
    certificatePath: item["certificatePath"],
  };
}

/** The current running state of a service. */
export enum KnownServiceCurrentState {
  /** The service is initializing. */
  Starting = "Starting",
  /** The service is healthy and running. */
  Running = "Running",
  /** The service has errors but is still running. */
  Unhealthy = "Unhealthy",
  /** Infrastructure or system error. */
  SystemFailure = "SystemFailure",
  /** User configuration error. */
  UserErrorFailure = "UserErrorFailure",
  /** The service configuration is updating. */
  Updating = "Updating",
  /** The service is in the process of rolling out a new version. */
  RollingOut = "RollingOut",
  /** The service is rolling back to a previous version. */
  RollingBack = "RollingBack",
  /** The service is shutting down. */
  Terminating = "Terminating",
  /** The service is fully stopped. */
  Terminated = "Terminated",
}

/**
 * The current running state of a service. \
 * {@link KnownServiceCurrentState} can be used interchangeably with ServiceCurrentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Starting**: The service is initializing. \
 * **Running**: The service is healthy and running. \
 * **Unhealthy**: The service has errors but is still running. \
 * **SystemFailure**: Infrastructure or system error. \
 * **UserErrorFailure**: User configuration error. \
 * **Updating**: The service configuration is updating. \
 * **RollingOut**: The service is in the process of rolling out a new version. \
 * **RollingBack**: The service is rolling back to a previous version. \
 * **Terminating**: The service is shutting down. \
 * **Terminated**: The service is fully stopped.
 */
export type ServiceCurrentState = string;

/** Inline summary of a service version, returned as part of the service response. */
export interface ServiceVersionDetail {
  /** The version string identifier. */
  version: string;
  /** The target percentage of traffic sent to this version (0-100). */
  weight: number;
  /** The current percentage of traffic sent to this version (0-100). */
  currentWeight?: number;
  /** The current state of this version. */
  currentState: ServiceVersionState;
  /** The container image reference used by this version, such as registry/repository:tag or registry/repository@sha256:digest. */
  imageUri: string;
  /** The ID of the compute configuration used by this version. */
  computeConfig: ComputeConfigSpecOrReference;
  /** List of Ray Serve applications for this version. */
  applications?: Record<string, any>[];
  /** External storage configuration for Ray GCS head node fault tolerance. If populated, head node fault tolerance will be enabled. */
  rayGcsExternalStorageConfig?: RayGcsExternalStorageConfig;
  /** Tracing configuration for distributed tracing. */
  tracingConfig?: TracingConfig;
  /** The time this version was created. */
  createdAt?: Date;
}

export function serviceVersionDetailDeserializer(item: any): ServiceVersionDetail {
  return {
    version: item["version"],
    weight: item["weight"],
    currentWeight: item["currentWeight"],
    currentState: item["currentState"],
    imageUri: item["imageUri"],
    computeConfig: computeConfigSpecOrReferenceDeserializer(item["computeConfig"]),
    applications: !item["applications"]
      ? item["applications"]
      : _serviceVersionDetailApplicationArrayDeserializer(item["applications"]),
    rayGcsExternalStorageConfig: !item["rayGcsExternalStorageConfig"]
      ? item["rayGcsExternalStorageConfig"]
      : rayGcsExternalStorageConfigDeserializer(item["rayGcsExternalStorageConfig"]),
    tracingConfig: !item["tracingConfig"]
      ? item["tracingConfig"]
      : tracingConfigDeserializer(item["tracingConfig"]),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
  };
}

/** The state of an individual service version. */
export enum KnownServiceVersionState {
  /** The version state is unknown. */
  Unknown = "Unknown",
  /** The version is initializing. */
  Starting = "Starting",
  /** The version is updating. */
  Updating = "Updating",
  /** The version is running. */
  Running = "Running",
  /** The version has issues. */
  Unhealthy = "Unhealthy",
  /** System failure. */
  SystemFailure = "SystemFailure",
  /** The version is shutting down. */
  Terminating = "Terminating",
  /** The version is stopped. */
  Terminated = "Terminated",
}

/**
 * The state of an individual service version. \
 * {@link KnownServiceVersionState} can be used interchangeably with ServiceVersionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The version state is unknown. \
 * **Starting**: The version is initializing. \
 * **Updating**: The version is updating. \
 * **Running**: The version is running. \
 * **Unhealthy**: The version has issues. \
 * **SystemFailure**: System failure. \
 * **Terminating**: The version is shutting down. \
 * **Terminated**: The version is stopped.
 */
export type ServiceVersionState = string;

export function _serviceVersionDetailApplicationArrayDeserializer(
  result: Array<_ServiceVersionDetailApplication>,
): any[] {
  return result.map((item) => {
    return _serviceVersionDetailApplicationDeserializer(item);
  });
}

/** model interface _ServiceVersionDetailApplication */
export interface _ServiceVersionDetailApplication {}

export function _serviceVersionDetailApplicationDeserializer(
  item: any,
): _ServiceVersionDetailApplication {
  return item;
}

/** The type used for update operations of the Service. */
export interface ServiceUpdate {
  /** The resource-specific properties for this resource. */
  properties?: ServiceUpdateProperties;
}

export function serviceUpdateSerializer(item: ServiceUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : serviceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Service. */
export interface ServiceUpdateProperties {
  /** Deployment config of the Anyscale service. */
  deploymentConfig?: ServiceDeploymentConfig;
}

export function serviceUpdatePropertiesSerializer(item: ServiceUpdateProperties): any {
  return {
    deploymentConfig: !item["deploymentConfig"]
      ? item["deploymentConfig"]
      : serviceDeploymentConfigSerializer(item["deploymentConfig"]),
  };
}

/** The response of a Service list operation. */
export interface _ServiceListResult {
  /** The Service items on this page */
  value: Service[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _serviceListResultDeserializer(item: any): _ServiceListResult {
  return {
    value: serviceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serviceArraySerializer(result: Array<Service>): any[] {
  return result.map((item) => {
    return serviceSerializer(item);
  });
}

export function serviceArrayDeserializer(result: Array<Service>): any[] {
  return result.map((item) => {
    return serviceDeserializer(item);
  });
}

/** A workspace for interactive development in an Anyscale project. */
export interface Workspace extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: WorkspaceProperties;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesSerializer(item["properties"]),
  };
}

export function workspaceDeserializer(item: any): Workspace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the workspace. */
export interface WorkspaceProperties {
  /** The compute config to use for the workspace. */
  computeConfig: ComputeConfigSpecOrReference;
  /** The Ray container image reference to use for the workspace, such as registry/repository:tag or registry/repository@sha256:digest. */
  imageUri: string;
  /** The number of minutes of inactivity before Anyscale terminates the workspace. Idle time is defined as the time during which a workspace is not running a user command. Set to 0 to disable automatic termination. */
  idleTerminationMinutes?: number;
  /** The current status of the workspace. */
  readonly currentStatus?: WorkspaceState;
  /** The provisioning state of the workspace. */
  readonly provisioningState?: ProvisioningState;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return {
    computeConfig: computeConfigSpecOrReferenceSerializer(item["computeConfig"]),
    imageUri: item["imageUri"],
    idleTerminationMinutes: item["idleTerminationMinutes"],
  };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    computeConfig: computeConfigSpecOrReferenceDeserializer(item["computeConfig"]),
    imageUri: item["imageUri"],
    idleTerminationMinutes: item["idleTerminationMinutes"],
    currentStatus: item["currentStatus"],
    provisioningState: item["provisioningState"],
  };
}

/** The current state of workspace. */
export enum KnownWorkspaceState {
  /** The workspace is starting up. */
  Starting = "Starting",
  /** The workspace is updating. */
  Updating = "Updating",
  /** The workspace is running. */
  Running = "Running",
  /** The workspace is terminating. */
  Terminating = "Terminating",
  /** The workspace is terminated. */
  Terminated = "Terminated",
  /** The workspace is in an error state. */
  Errored = "Errored",
}

/**
 * The current state of workspace. \
 * {@link KnownWorkspaceState} can be used interchangeably with WorkspaceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Starting**: The workspace is starting up. \
 * **Updating**: The workspace is updating. \
 * **Running**: The workspace is running. \
 * **Terminating**: The workspace is terminating. \
 * **Terminated**: The workspace is terminated. \
 * **Errored**: The workspace is in an error state.
 */
export type WorkspaceState = string;

/** The type used for update operations of the Workspace. */
export interface WorkspaceUpdate {
  /** The resource-specific properties for this resource. */
  properties?: WorkspaceUpdateProperties;
}

export function workspaceUpdateSerializer(item: WorkspaceUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workspaceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the Workspace. */
export interface WorkspaceUpdateProperties {
  /** The compute config to use for the workspace. */
  computeConfig?: ComputeConfigSpecOrReference;
  /** The Ray container image reference to use for the workspace, such as registry/repository:tag or registry/repository@sha256:digest. */
  imageUri?: string;
  /** The number of minutes of inactivity before Anyscale terminates the workspace. Idle time is defined as the time during which a workspace is not running a user command. Set to 0 to disable automatic termination. */
  idleTerminationMinutes?: number;
}

export function workspaceUpdatePropertiesSerializer(item: WorkspaceUpdateProperties): any {
  return {
    computeConfig: !item["computeConfig"]
      ? item["computeConfig"]
      : computeConfigSpecOrReferenceSerializer(item["computeConfig"]),
    imageUri: item["imageUri"],
    idleTerminationMinutes: item["idleTerminationMinutes"],
  };
}

/** The response of a Workspace list operation. */
export interface _WorkspaceListResult {
  /** The Workspace items on this page */
  value: Workspace[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _workspaceListResultDeserializer(item: any): _WorkspaceListResult {
  return {
    value: workspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceArraySerializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceSerializer(item);
  });
}

export function workspaceArrayDeserializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-09-01 API version */
  V20260901 = "2026-09-01",
}
