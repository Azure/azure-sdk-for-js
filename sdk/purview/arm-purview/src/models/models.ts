// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged list of operation resources */
export interface _OperationList {
  /** Total item count. */
  count?: number;
  /** The Url of next result page. */
  nextLink?: string;
  /** Collection of items of type results. */
  value: Operation[];
}

export function _operationListDeserializer(item: any): _OperationList {
  return {
    count: item["count"],
    nextLink: item["nextLink"],
    value: operationArrayDeserializer(item["value"]),
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Operation resource */
export interface Operation {
  /** The response model for get operation properties */
  display?: OperationDisplay;
  /** Whether operation is a data action */
  isDataAction?: boolean;
  /** Operation name for display purposes */
  name?: string;
  /** origin of the operation */
  origin?: string;
  /** The operation meta service specification */
  serviceSpecification?: OperationMetaServiceSpecification;
}

export function operationDeserializer(item: any): Operation {
  return {
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    isDataAction: item["isDataAction"],
    name: item["name"],
    origin: item["origin"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationPropertiesDeserializer(item["properties"])),
  };
}

/** The response model for get operation properties */
export interface OperationDisplay {
  /** Description of the operation for display purposes */
  description?: string;
  /** Name of the operation for display purposes */
  operation?: string;
  /** Name of the provider for display purposes */
  provider?: string;
  /** Name of the resource type for display purposes */
  resource?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

/** properties on meta info */
export interface OperationProperties {
  /** The operation meta service specification */
  serviceSpecification?: OperationMetaServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : operationMetaServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** The operation meta service specification */
export interface OperationMetaServiceSpecification {
  /** log specifications for the operation */
  logSpecifications?: OperationMetaLogSpecification[];
  /** metric specifications for the operation */
  metricSpecifications?: OperationMetaMetricSpecification[];
}

export function operationMetaServiceSpecificationDeserializer(
  item: any,
): OperationMetaServiceSpecification {
  return {
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : operationMetaLogSpecificationArrayDeserializer(item["logSpecifications"]),
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : operationMetaMetricSpecificationArrayDeserializer(item["metricSpecifications"]),
  };
}

export function operationMetaLogSpecificationArrayDeserializer(
  result: Array<OperationMetaLogSpecification>,
): any[] {
  return result.map((item) => {
    return operationMetaLogSpecificationDeserializer(item);
  });
}

/** log specifications for operation api */
export interface OperationMetaLogSpecification {
  /** blob duration of the log */
  blobDuration?: string;
  /** localized name of the log category */
  displayName?: string;
  /** name of the log category */
  name?: string;
}

export function operationMetaLogSpecificationDeserializer(
  item: any,
): OperationMetaLogSpecification {
  return {
    blobDuration: item["blobDuration"],
    displayName: item["displayName"],
    name: item["name"],
  };
}

export function operationMetaMetricSpecificationArrayDeserializer(
  result: Array<OperationMetaMetricSpecification>,
): any[] {
  return result.map((item) => {
    return operationMetaMetricSpecificationDeserializer(item);
  });
}

/** metric specifications for the operation */
export interface OperationMetaMetricSpecification {
  /** aggregation type of metric */
  aggregationType?: string;
  /** properties for dimension */
  dimensions?: DimensionProperties[];
  /** description of the metric */
  displayDescription?: string;
  /** localized name of the metric */
  displayName?: string;
  /** enable regional mdm account */
  enableRegionalMdmAccount?: string;
  /** internal metric name */
  internalMetricName?: string;
  /** name of the metric */
  name?: string;
  /** dimension name use to replace resource id if specified */
  resourceIdDimensionNameOverride?: string;
  /**
   * Metric namespace.
   * Only set the namespace if different from the default value,
   * leaving it empty makes it use the value from the ARM manifest.
   */
  sourceMdmNamespace?: string;
  /** supported aggregation types */
  supportedAggregationTypes?: string[];
  /** supported time grain types */
  supportedTimeGrainTypes?: string[];
  /** units for the metric */
  unit?: string;
}

export function operationMetaMetricSpecificationDeserializer(
  item: any,
): OperationMetaMetricSpecification {
  return {
    aggregationType: item["aggregationType"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionPropertiesArrayDeserializer(item["dimensions"]),
    displayDescription: item["displayDescription"],
    displayName: item["displayName"],
    enableRegionalMdmAccount: item["enableRegionalMdmAccount"],
    internalMetricName: item["internalMetricName"],
    name: item["name"],
    resourceIdDimensionNameOverride: item["resourceIdDimensionNameOverride"],
    sourceMdmNamespace: item["sourceMdmNamespace"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    supportedTimeGrainTypes: !item["supportedTimeGrainTypes"]
      ? item["supportedTimeGrainTypes"]
      : item["supportedTimeGrainTypes"].map((p: any) => {
          return p;
        }),
    unit: item["unit"],
  };
}

export function dimensionPropertiesArrayDeserializer(result: Array<DimensionProperties>): any[] {
  return result.map((item) => {
    return dimensionPropertiesDeserializer(item);
  });
}

/** properties for dimension */
export interface DimensionProperties {
  /** localized display name of the dimension to customer */
  displayName?: string;
  /** dimension name */
  name?: string;
  /** flag indicating whether this dimension should be included to the customer in Azure Monitor logs (aka Shoebox) */
  toBeExportedForCustomer?: boolean;
}

export function dimensionPropertiesDeserializer(item: any): DimensionProperties {
  return {
    displayName: item["displayName"],
    name: item["name"],
    toBeExportedForCustomer: item["toBeExportedForCustomer"],
  };
}

/** Default error response model */
export interface ErrorResponseModel {
  /** Gets or sets the error. */
  readonly error?: ErrorResponseModelError;
}

export function errorResponseModelDeserializer(item: any): ErrorResponseModel {
  return {
    error: !item["error"] ? item["error"] : errorResponseModelErrorDeserializer(item["error"]),
  };
}

/** Gets or sets the error. */
export interface ErrorResponseModelError extends ErrorModel {}

export function errorResponseModelErrorDeserializer(item: any): ErrorResponseModelError {
  return {
    code: item["code"],
    details: !item["details"] ? item["details"] : errorModelArrayDeserializer(item["details"]),
    message: item["message"],
    target: item["target"],
  };
}

/** Default error model */
export interface ErrorModel {
  /** Gets or sets the code. */
  readonly code?: string;
  /** Gets or sets the details. */
  readonly details?: ErrorModel[];
  /** Gets or sets the messages. */
  readonly message?: string;
  /** Gets or sets the target. */
  readonly target?: string;
}

export function errorModelDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    details: !item["details"] ? item["details"] : errorModelArrayDeserializer(item["details"]),
    message: item["message"],
    target: item["target"],
  };
}

export function errorModelArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorModelDeserializer(item);
  });
}

/** Account resource */
export interface Account extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** The Managed Identity of the resource */
  identity?: Identity;
  /** Gets or sets the Sku. */
  sku?: AccountSku;
  /** Gets or sets the status of the account. */
  readonly accountStatus?: AccountPropertiesAccountStatus;
  /** External Cloud Service connectors */
  cloudConnectors?: CloudConnectors;
  /** Gets the time at which the entity was created. */
  readonly createdAt?: Date;
  /** Gets the creator of the entity. */
  readonly createdBy?: string;
  /** Gets the creators of the entity's object id. */
  readonly createdByObjectId?: string;
  /** Gets the default domain in the account. */
  readonly defaultDomain?: string;
  /** The URIs that are the public endpoints of the account. */
  readonly endpoints?: AccountPropertiesEndpoints;
  /** Gets or sets the friendly name. */
  readonly friendlyName?: string;
  /** Ingestion Storage Account Info */
  ingestionStorage?: IngestionStorage;
  /** Gets or sets the state of managed eventhub. If enabled managed eventhub will be created, if disabled the managed eventhub will be removed. */
  managedEventHubState?: ManagedEventHubState;
  /** Gets or sets the managed resource group name */
  managedResourceGroupName?: string;
  /** Gets the resource identifiers of the managed resources. */
  readonly managedResources?: AccountPropertiesManagedResources;
  /** Gets or sets the public network access for managed resources. */
  managedResourcesPublicNetworkAccess?: PublicNetworkAccess;
  /** Gets or sets the Merge Info. */
  mergeInfo?: AccountMergeInfo;
  /** Gets the private endpoint connections information. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Gets or sets the state of the provisioning. */
  readonly provisioningState?: ProvisioningState;
  /** Gets or sets the public network access. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Gets or sets the state of tenant endpoint. */
  tenantEndpointState?: TenantEndpointState;
}

export function accountSerializer(item: Account): any {
  return {
    properties: areAllPropsUndefined(item, [
      "cloudConnectors",
      "ingestionStorage",
      "managedEventHubState",
      "managedResourceGroupName",
      "managedResourcesPublicNetworkAccess",
      "mergeInfo",
      "publicNetworkAccess",
      "tenantEndpointState",
    ])
      ? undefined
      : _accountPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : accountSkuSerializer(item["sku"]),
  };
}

export function accountDeserializer(item: any): Account {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accountPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : accountSkuDeserializer(item["sku"]),
  };
}

/** The account properties */
export interface AccountProperties {
  /** Gets or sets the status of the account. */
  readonly accountStatus?: AccountPropertiesAccountStatus;
  /** External Cloud Service connectors */
  cloudConnectors?: CloudConnectors;
  /** Gets the time at which the entity was created. */
  readonly createdAt?: Date;
  /** Gets the creator of the entity. */
  readonly createdBy?: string;
  /** Gets the creators of the entity's object id. */
  readonly createdByObjectId?: string;
  /** Gets the default domain in the account. */
  readonly defaultDomain?: string;
  /** The URIs that are the public endpoints of the account. */
  readonly endpoints?: AccountPropertiesEndpoints;
  /** Gets or sets the friendly name. */
  readonly friendlyName?: string;
  /** Ingestion Storage Account Info */
  ingestionStorage?: IngestionStorage;
  /** Gets or sets the state of managed eventhub. If enabled managed eventhub will be created, if disabled the managed eventhub will be removed. */
  managedEventHubState?: ManagedEventHubState;
  /** Gets or sets the managed resource group name */
  managedResourceGroupName?: string;
  /** Gets the resource identifiers of the managed resources. */
  readonly managedResources?: AccountPropertiesManagedResources;
  /** Gets or sets the public network access for managed resources. */
  managedResourcesPublicNetworkAccess?: PublicNetworkAccess;
  /** Gets or sets the Merge Info. */
  mergeInfo?: AccountMergeInfo;
  /** Gets the private endpoint connections information. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Gets or sets the state of the provisioning. */
  readonly provisioningState?: ProvisioningState;
  /** Gets or sets the public network access. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Gets or sets the state of tenant endpoint. */
  tenantEndpointState?: TenantEndpointState;
}

export function accountPropertiesSerializer(item: AccountProperties): any {
  return {
    cloudConnectors: !item["cloudConnectors"]
      ? item["cloudConnectors"]
      : cloudConnectorsSerializer(item["cloudConnectors"]),
    ingestionStorage: !item["ingestionStorage"]
      ? item["ingestionStorage"]
      : ingestionStorageSerializer(item["ingestionStorage"]),
    managedEventHubState: item["managedEventHubState"],
    managedResourceGroupName: item["managedResourceGroupName"],
    managedResourcesPublicNetworkAccess: item["managedResourcesPublicNetworkAccess"],
    mergeInfo: !item["mergeInfo"]
      ? item["mergeInfo"]
      : accountMergeInfoSerializer(item["mergeInfo"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    tenantEndpointState: item["tenantEndpointState"],
  };
}

export function accountPropertiesDeserializer(item: any): AccountProperties {
  return {
    accountStatus: !item["accountStatus"]
      ? item["accountStatus"]
      : accountPropertiesAccountStatusDeserializer(item["accountStatus"]),
    cloudConnectors: !item["cloudConnectors"]
      ? item["cloudConnectors"]
      : cloudConnectorsDeserializer(item["cloudConnectors"]),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByObjectId: item["createdByObjectId"],
    defaultDomain: item["defaultDomain"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : accountPropertiesEndpointsDeserializer(item["endpoints"]),
    friendlyName: item["friendlyName"],
    ingestionStorage: !item["ingestionStorage"]
      ? item["ingestionStorage"]
      : ingestionStorageDeserializer(item["ingestionStorage"]),
    managedEventHubState: item["managedEventHubState"],
    managedResourceGroupName: item["managedResourceGroupName"],
    managedResources: !item["managedResources"]
      ? item["managedResources"]
      : accountPropertiesManagedResourcesDeserializer(item["managedResources"]),
    managedResourcesPublicNetworkAccess: item["managedResourcesPublicNetworkAccess"],
    mergeInfo: !item["mergeInfo"]
      ? item["mergeInfo"]
      : accountMergeInfoDeserializer(item["mergeInfo"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    publicNetworkAccess: item["publicNetworkAccess"],
    tenantEndpointState: item["tenantEndpointState"],
  };
}

/** Gets or sets the status of the account. */
export interface AccountPropertiesAccountStatus extends AccountStatus {}

export function accountPropertiesAccountStatusDeserializer(
  item: any,
): AccountPropertiesAccountStatus {
  return {
    accountProvisioningState: item["accountProvisioningState"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : accountStatusErrorDetailsDeserializer(item["errorDetails"]),
  };
}

/** External Cloud Service connectors */
export interface CloudConnectors {
  /**
   * AWS external identifier.
   * Configured in AWS to allow use of the role arn used for scanning
   */
  readonly awsExternalId?: string;
}

export function cloudConnectorsSerializer(item: CloudConnectors): any {
  return item;
}

export function cloudConnectorsDeserializer(item: any): CloudConnectors {
  return {
    awsExternalId: item["awsExternalId"],
  };
}

/** The URIs that are the public endpoints of the account. */
export interface AccountPropertiesEndpoints extends AccountEndpoints {}

export function accountPropertiesEndpointsDeserializer(item: any): AccountPropertiesEndpoints {
  return {
    catalog: item["catalog"],
    scan: item["scan"],
  };
}

/** Ingestion Storage Account Info */
export interface IngestionStorage {
  /** Gets or sets the Id. */
  readonly id?: string;
  /** Gets or sets the primary endpoint. */
  readonly primaryEndpoint?: string;
  /** Gets or sets the public network access setting */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function ingestionStorageSerializer(item: IngestionStorage): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function ingestionStorageDeserializer(item: any): IngestionStorage {
  return {
    id: item["id"],
    primaryEndpoint: item["primaryEndpoint"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Gets or sets the public network access for managed resources. */
export enum KnownPublicNetworkAccess {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Gets or sets the public network access for managed resources. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type PublicNetworkAccess = string;

/** Gets or sets the state of managed eventhub. If enabled managed eventhub will be created, if disabled the managed eventhub will be removed. */
export enum KnownManagedEventHubState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Gets or sets the state of managed eventhub. If enabled managed eventhub will be created, if disabled the managed eventhub will be removed. \
 * {@link KnownManagedEventHubState} can be used interchangeably with ManagedEventHubState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type ManagedEventHubState = string;

/** Gets the resource identifiers of the managed resources. */
export interface AccountPropertiesManagedResources extends ManagedResources {}

export function accountPropertiesManagedResourcesDeserializer(
  item: any,
): AccountPropertiesManagedResources {
  return {
    eventHubNamespace: item["eventHubNamespace"],
    resourceGroup: item["resourceGroup"],
    storageAccount: item["storageAccount"],
  };
}

/** The public Account Merge Info model. */
export interface AccountMergeInfo {
  /** The account location of the *other* account in the merge operation. */
  readonly accountLocation?: string;
  /** The account name of the *other* account in the merge operation. */
  readonly accountName?: string;
  /** The resource group name of the *other* account in the merge operation. */
  readonly accountResourceGroupName?: string;
  /** The subscription id of the *other* account in the merge operation. */
  readonly accountSubscriptionId?: string;
  /**
   * The deprovisioned status of the account.
   * Only applicable for the secondary account.
   */
  readonly deprovisioned?: boolean;
  /** The status of the merge operation. */
  readonly mergeStatus?: MergeStatus;
  /** The account's type for the merge operation. */
  readonly typeOfAccount?: MergeAccountType;
}

export function accountMergeInfoSerializer(item: AccountMergeInfo): any {
  return item;
}

export function accountMergeInfoDeserializer(item: any): AccountMergeInfo {
  return {
    accountLocation: item["accountLocation"],
    accountName: item["accountName"],
    accountResourceGroupName: item["accountResourceGroupName"],
    accountSubscriptionId: item["accountSubscriptionId"],
    deprovisioned: item["deprovisioned"],
    mergeStatus: item["mergeStatus"],
    typeOfAccount: item["typeOfAccount"],
  };
}

/** The status of the merge operation. */
export enum KnownMergeStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * The status of the merge operation. \
 * {@link KnownMergeStatus} can be used interchangeably with MergeStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **InProgress**: InProgress
 */
export type MergeStatus = string;

/** The account's type for the merge operation. */
export enum KnownMergeAccountType {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * The account's type for the merge operation. \
 * {@link KnownMergeAccountType} can be used interchangeably with MergeAccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: Primary \
 * **Secondary**: Secondary
 */
export type MergeAccountType = string;

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** A private endpoint connection class. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The private endpoint information. */
  privateEndpoint?: PrivateEndpoint;
  /** The private link service connection state. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state. */
  readonly provisioningState?: string;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** A private endpoint connection properties class. */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint information. */
  privateEndpoint?: PrivateEndpoint;
  /** The private link service connection state. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state. */
  readonly provisioningState?: string;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

/** A private endpoint class. */
export interface PrivateEndpoint {
  /** The private endpoint identifier. */
  id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return { id: item["id"] };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The private link service connection state. */
export interface PrivateLinkServiceConnectionState {
  /** The required actions. */
  actionsRequired?: string;
  /** The description. */
  description?: string;
  /** The status. */
  status?: PrivateEndpointConnectionStatus;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    actionsRequired: item["actionsRequired"],
    description: item["description"],
    status: item["status"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    actionsRequired: item["actionsRequired"],
    description: item["description"],
    status: item["status"],
  };
}

/** The status. */
export enum KnownPrivateEndpointConnectionStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The status. \
 * {@link KnownPrivateEndpointConnectionStatus} can be used interchangeably with PrivateEndpointConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Pending**: Pending \
 * **Approved**: Approved \
 * **Rejected**: Rejected \
 * **Disconnected**: Disconnected
 */
export type PrivateEndpointConnectionStatus = string;

/** Gets or sets the state of the provisioning. */
export enum KnownProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Creating */
  Creating = "Creating",
  /** Moving */
  Moving = "Moving",
  /** Deleting */
  Deleting = "Deleting",
  /** SoftDeleting */
  SoftDeleting = "SoftDeleting",
  /** SoftDeleted */
  SoftDeleted = "SoftDeleted",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Gets or sets the state of the provisioning. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Creating**: Creating \
 * **Moving**: Moving \
 * **Deleting**: Deleting \
 * **SoftDeleting**: SoftDeleting \
 * **SoftDeleted**: SoftDeleted \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled
 */
export type ProvisioningState = string;

/** Gets or sets the state of tenant endpoint. */
export enum KnownTenantEndpointState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Gets or sets the state of tenant endpoint. \
 * {@link KnownTenantEndpointState} can be used interchangeably with TenantEndpointState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: NotSpecified \
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type TenantEndpointState = string;

/** The Managed Identity of the resource */
export interface Identity {
  /** Service principal object Id */
  readonly principalId?: string;
  /** Tenant Id */
  readonly tenantId?: string;
  /** Identity Type */
  type?: ManagedIdentityType;
  /** User Assigned Identities */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Identity Type */
export enum KnownManagedIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * Identity Type \
 * {@link KnownManagedIdentityType} can be used interchangeably with ManagedIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type ManagedIdentityType = string;

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

/** Uses client ID and Principal ID */
export interface UserAssignedIdentity {
  /** Gets or Sets Client ID */
  readonly clientId?: string;
  /** Gets or Sets Principal ID */
  readonly principalId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    clientId: item["clientId"],
    principalId: item["principalId"],
  };
}

/** The Sku */
export interface AccountSku {
  /** Gets or sets the sku capacity. */
  capacity?: number;
  /** Gets or sets the sku name. */
  name?: AccountSkuName;
}

export function accountSkuSerializer(item: AccountSku): any {
  return { capacity: item["capacity"], name: item["name"] };
}

export function accountSkuDeserializer(item: any): AccountSku {
  return {
    capacity: item["capacity"],
    name: item["name"],
  };
}

/** Gets or sets the sku name. */
export enum KnownAccountSkuName {
  /** Standard */
  Standard = "Standard",
  /** Free */
  Free = "Free",
}

/**
 * Gets or sets the sku name. \
 * {@link KnownAccountSkuName} can be used interchangeably with AccountSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard \
 * **Free**: Free
 */
export type AccountSkuName = string;

/** The account status. */
export interface AccountStatus {
  /** Gets the account status code. */
  readonly accountProvisioningState?: AccountProvisioningState;
  /** Gets the account error details. */
  readonly errorDetails?: AccountStatusErrorDetails;
}

export function accountStatusDeserializer(item: any): AccountStatus {
  return {
    accountProvisioningState: item["accountProvisioningState"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : accountStatusErrorDetailsDeserializer(item["errorDetails"]),
  };
}

/** Gets the account status code. */
export enum KnownAccountProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Moving */
  Moving = "Moving",
  /** Deleting */
  Deleting = "Deleting",
  /** SoftDeleting */
  SoftDeleting = "SoftDeleting",
  /** SoftDeleted */
  SoftDeleted = "SoftDeleted",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Gets the account status code. \
 * {@link KnownAccountProvisioningState} can be used interchangeably with AccountProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Moving**: Moving \
 * **Deleting**: Deleting \
 * **SoftDeleting**: SoftDeleting \
 * **SoftDeleted**: SoftDeleted \
 * **Failed**: Failed \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled
 */
export type AccountProvisioningState = string;

/** Gets the account error details. */
export interface AccountStatusErrorDetails extends ErrorModel {}

export function accountStatusErrorDetailsDeserializer(item: any): AccountStatusErrorDetails {
  return {
    code: item["code"],
    details: !item["details"] ? item["details"] : errorModelArrayDeserializer(item["details"]),
    message: item["message"],
    target: item["target"],
  };
}

/** The account endpoints */
export interface AccountEndpoints {
  /** Gets the catalog endpoint. */
  readonly catalog?: string;
  /** Gets the scan endpoint. */
  readonly scan?: string;
}

export function accountEndpointsDeserializer(item: any): AccountEndpoints {
  return {
    catalog: item["catalog"],
    scan: item["scan"],
  };
}

/** The managed resources in customer subscription. */
export interface ManagedResources {
  /** Gets the managed event hub namespace resource identifier. */
  readonly eventHubNamespace?: string;
  /** Gets the managed resource group resource identifier. This resource group will host resource dependencies for the account. */
  readonly resourceGroup?: string;
  /** Gets the managed storage account resource identifier. */
  readonly storageAccount?: string;
}

export function managedResourcesDeserializer(item: any): ManagedResources {
  return {
    eventHubNamespace: item["eventHubNamespace"],
    resourceGroup: item["resourceGroup"],
    storageAccount: item["storageAccount"],
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

/** The account update properties. */
export interface AccountUpdateParameters {
  /** The Managed Identity of the resource */
  identity?: Identity;
  /** The account properties */
  properties?: AccountProperties;
  /** Tags on the azure resource. */
  tags?: Record<string, string>;
}

export function accountUpdateParametersSerializer(item: AccountUpdateParameters): any {
  return {
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : accountPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Paged list of Account resources */
export interface _AccountList {
  /** The Account items on this page */
  value: Account[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accountListDeserializer(item: any): _AccountList {
  return {
    value: accountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accountArraySerializer(result: Array<Account>): any[] {
  return result.map((item) => {
    return accountSerializer(item);
  });
}

export function accountArrayDeserializer(result: Array<Account>): any[] {
  return result.map((item) => {
    return accountDeserializer(item);
  });
}

/** Collection administrator update. */
export interface CollectionAdminUpdate {
  /** Gets or sets the object identifier of the admin. */
  objectId?: string;
}

export function collectionAdminUpdateSerializer(item: CollectionAdminUpdate): any {
  return { objectId: item["objectId"] };
}

/** The Purview Account access keys. */
export interface AccessKeys {
  /** Gets or sets the primary connection string. */
  atlasKafkaPrimaryEndpoint?: string;
  /** Gets or sets the secondary connection string. */
  atlasKafkaSecondaryEndpoint?: string;
}

export function accessKeysDeserializer(item: any): AccessKeys {
  return {
    atlasKafkaPrimaryEndpoint: item["atlasKafkaPrimaryEndpoint"],
    atlasKafkaSecondaryEndpoint: item["atlasKafkaSecondaryEndpoint"],
  };
}

/** The request payload for CheckNameAvailability API */
export interface CheckNameAvailabilityRequest {
  /** Resource name to verify for availability */
  name?: string;
  /** Fully qualified resource type which includes provider namespace */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** The response payload for CheckNameAvailability API */
export interface CheckNameAvailabilityResult {
  /** Error message */
  message?: string;
  /** Indicates if name is valid and available. */
  nameAvailable?: boolean;
  /** The reason the name is not available. */
  reason?: Reason;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    message: item["message"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
  };
}

/** The reason the name is not available. */
export enum KnownReason {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * The reason the name is not available. \
 * {@link KnownReason} can be used interchangeably with Reason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Invalid \
 * **AlreadyExists**: AlreadyExists
 */
export type Reason = string;

/** The configuration of the event streaming service resource attached to the Purview account for kafka notifications. */
export interface KafkaConfiguration extends ProxyResource {
  /** Consumer group for hook event hub. */
  consumerGroup?: string;
  /** Credentials to access the event streaming service attached to the purview account. */
  credentials?: Credentials;
  /** Optional partition Id for notification event hub. If not set, all partitions will be leveraged. */
  eventHubPartitionId?: string;
  eventHubResourceId?: string;
  /** The event hub type. */
  eventHubType?: EventHubType;
  /** The state of the event streaming service */
  eventStreamingState?: EventStreamingState;
  /** The event streaming service type */
  eventStreamingType?: EventStreamingType;
}

export function kafkaConfigurationSerializer(item: KafkaConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, [
      "consumerGroup",
      "credentials",
      "eventHubPartitionId",
      "eventHubResourceId",
      "eventHubType",
      "eventStreamingState",
      "eventStreamingType",
    ])
      ? undefined
      : _kafkaConfigurationPropertiesSerializer(item),
  };
}

export function kafkaConfigurationDeserializer(item: any): KafkaConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _kafkaConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** The kafka configuration properties of the event streaming service attached to the Purview account for kafka notifications. */
export interface KafkaConfigurationProperties {
  /** Consumer group for hook event hub. */
  consumerGroup?: string;
  /** Credentials to access the event streaming service attached to the purview account. */
  credentials?: Credentials;
  /** Optional partition Id for notification event hub. If not set, all partitions will be leveraged. */
  eventHubPartitionId?: string;
  eventHubResourceId?: string;
  /** The event hub type. */
  eventHubType?: EventHubType;
  /** The state of the event streaming service */
  eventStreamingState?: EventStreamingState;
  /** The event streaming service type */
  eventStreamingType?: EventStreamingType;
}

export function kafkaConfigurationPropertiesSerializer(item: KafkaConfigurationProperties): any {
  return {
    consumerGroup: item["consumerGroup"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsSerializer(item["credentials"]),
    eventHubPartitionId: item["eventHubPartitionId"],
    eventHubResourceId: item["eventHubResourceId"],
    eventHubType: item["eventHubType"],
    eventStreamingState: item["eventStreamingState"],
    eventStreamingType: item["eventStreamingType"],
  };
}

export function kafkaConfigurationPropertiesDeserializer(item: any): KafkaConfigurationProperties {
  return {
    consumerGroup: item["consumerGroup"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsDeserializer(item["credentials"]),
    eventHubPartitionId: item["eventHubPartitionId"],
    eventHubResourceId: item["eventHubResourceId"],
    eventHubType: item["eventHubType"],
    eventStreamingState: item["eventStreamingState"],
    eventStreamingType: item["eventStreamingType"],
  };
}

/** Credentials to access the event streaming service attached to the purview account. */
export interface Credentials {
  /** Identity identifier for UserAssign type. */
  identityId?: string;
  /** Identity Type. */
  type?: KafkaConfigurationIdentityType;
}

export function credentialsSerializer(item: Credentials): any {
  return { identityId: item["identityId"], type: item["type"] };
}

export function credentialsDeserializer(item: any): Credentials {
  return {
    identityId: item["identityId"],
    type: item["type"],
  };
}

/** Identity Type. */
export enum KnownKafkaConfigurationIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * Identity Type. \
 * {@link KnownKafkaConfigurationIdentityType} can be used interchangeably with KafkaConfigurationIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned
 */
export type KafkaConfigurationIdentityType = string;

/** The event hub type. */
export enum KnownEventHubType {
  /** Notification */
  Notification = "Notification",
  /** Hook */
  Hook = "Hook",
}

/**
 * The event hub type. \
 * {@link KnownEventHubType} can be used interchangeably with EventHubType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Notification**: Notification \
 * **Hook**: Hook
 */
export type EventHubType = string;

/** The state of the event streaming service */
export enum KnownEventStreamingState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * The state of the event streaming service \
 * {@link KnownEventStreamingState} can be used interchangeably with EventStreamingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type EventStreamingState = string;

/** The event streaming service type */
export enum KnownEventStreamingType {
  /** None */
  None = "None",
  /** Managed */
  Managed = "Managed",
  /** Azure */
  Azure = "Azure",
}

/**
 * The event streaming service type \
 * {@link KnownEventStreamingType} can be used interchangeably with EventStreamingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Managed**: Managed \
 * **Azure**: Azure
 */
export type EventStreamingType = string;

/** Paged list of kafka configuration resources */
export interface _KafkaConfigurationList {
  /** The KafkaConfiguration items on this page */
  value: KafkaConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _kafkaConfigurationListDeserializer(item: any): _KafkaConfigurationList {
  return {
    value: kafkaConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function kafkaConfigurationArraySerializer(result: Array<KafkaConfiguration>): any[] {
  return result.map((item) => {
    return kafkaConfigurationSerializer(item);
  });
}

export function kafkaConfigurationArrayDeserializer(result: Array<KafkaConfiguration>): any[] {
  return result.map((item) => {
    return kafkaConfigurationDeserializer(item);
  });
}

/** Paged list of private endpoint connections */
export interface _PrivateEndpointConnectionList {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListDeserializer(
  item: any,
): _PrivateEndpointConnectionList {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A privately linkable resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** A privately linkable resource properties. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group identifier. */
  readonly groupId?: string;
  /** This translates to how many Private IPs should be created for each privately linkable resource. */
  readonly requiredMembers?: string[];
  /** The required zone names for private link resource. */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Paged list of private link resources */
export interface _PrivateLinkResourceList {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListDeserializer(item: any): _PrivateLinkResourceList {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** Feature request model */
export interface BatchFeatureRequest {
  /** Set of features */
  features?: string[];
}

export function batchFeatureRequestSerializer(item: BatchFeatureRequest): any {
  return {
    features: !item["features"]
      ? item["features"]
      : item["features"].map((p: any) => {
          return p;
        }),
  };
}

/** List of features with enabled status */
export interface BatchFeatureStatus {
  /** Features with enabled status */
  readonly features?: Record<string, boolean>;
}

export function batchFeatureStatusDeserializer(item: any): BatchFeatureStatus {
  return {
    features: !item["features"]
      ? item["features"]
      : Object.fromEntries(Object.entries(item["features"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** A private endpoint connection status update request class. */
export interface PrivateEndpointConnectionStatusUpdateRequest {
  /** The private endpoint resource identifier. */
  privateEndpointId?: string;
  /** The private endpoint connection status. */
  status?: string;
}

export function privateEndpointConnectionStatusUpdateRequestSerializer(
  item: PrivateEndpointConnectionStatusUpdateRequest,
): any {
  return { privateEndpointId: item["privateEndpointId"], status: item["status"] };
}

/** A private endpoint connection status update response class. */
export interface PrivateEndpointConnectionStatusUpdateResponse {
  /** The private endpoint resource identifier. */
  privateEndpointId?: string;
  /** The private endpoint connection status. */
  status?: string;
}

export function privateEndpointConnectionStatusUpdateResponseDeserializer(
  item: any,
): PrivateEndpointConnectionStatusUpdateResponse {
  return {
    privateEndpointId: item["privateEndpointId"],
    status: item["status"],
  };
}

/** Payload to get and set the default account in the given scope */
export interface DefaultAccountPayload {
  /** The name of the account that is set as the default. */
  accountName?: string;
  /** The resource group name of the account that is set as the default. */
  resourceGroupName?: string;
  /** The scope object ID. For example, sub ID or tenant ID. */
  scope?: string;
  /** The scope tenant in which the default account is set. */
  scopeTenantId?: string;
  /** The scope where the default account is set. */
  scopeType?: ScopeType;
  /** The subscription ID of the account that is set as the default. */
  subscriptionId?: string;
}

export function defaultAccountPayloadSerializer(item: DefaultAccountPayload): any {
  return {
    accountName: item["accountName"],
    resourceGroupName: item["resourceGroupName"],
    scope: item["scope"],
    scopeTenantId: item["scopeTenantId"],
    scopeType: item["scopeType"],
    subscriptionId: item["subscriptionId"],
  };
}

export function defaultAccountPayloadDeserializer(item: any): DefaultAccountPayload {
  return {
    accountName: item["accountName"],
    resourceGroupName: item["resourceGroupName"],
    scope: item["scope"],
    scopeTenantId: item["scopeTenantId"],
    scopeType: item["scopeType"],
    subscriptionId: item["subscriptionId"],
  };
}

/** The scope where the default account is set. */
export enum KnownScopeType {
  /** Tenant */
  Tenant = "Tenant",
  /** Subscription */
  Subscription = "Subscription",
}

/**
 * The scope where the default account is set. \
 * {@link KnownScopeType} can be used interchangeably with ScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tenant**: Tenant \
 * **Subscription**: Subscription
 */
export type ScopeType = string;

/** List of usage information */
export interface UsageList {
  /** The Usage items on this page */
  value: Usage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function usageListDeserializer(item: any): UsageList {
  return {
    value: usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** Response for usage information */
export interface Usage {
  /** Current usage quota value */
  readonly currentValue?: number;
  /** Fully qualified resource Id */
  readonly id?: string;
  /** Usage quota limit */
  readonly limit?: number;
  /** Quota name */
  readonly name?: UsageName;
  /** Quota usage unit. */
  readonly unit?: string;
}

export function usageDeserializer(item: any): Usage {
  return {
    currentValue: item["currentValue"],
    id: item["id"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : usageNameDeserializer(item["name"]),
    unit: item["unit"],
  };
}

/** Quota name */
export interface UsageName extends QuotaName {}

export function usageNameDeserializer(item: any): UsageName {
  return {
    localizedValue: item["localizedValue"],
    value: item["value"],
  };
}

/** Quota name */
export interface QuotaName {
  /** Gets or sets the localized name value. */
  localizedValue?: string;
  /** Gets or sets the name value. */
  value?: string;
}

export function quotaNameDeserializer(item: any): QuotaName {
  return {
    localizedValue: item["localizedValue"],
    value: item["value"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-04-01-preview API version. */
  V20240401Preview = "2024-04-01-preview",
}

export function _operationPropertiesDeserializer(item: any) {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : operationMetaServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _accountPropertiesSerializer(item: Account): any {
  return {
    cloudConnectors: !item["cloudConnectors"]
      ? item["cloudConnectors"]
      : cloudConnectorsSerializer(item["cloudConnectors"]),
    ingestionStorage: !item["ingestionStorage"]
      ? item["ingestionStorage"]
      : ingestionStorageSerializer(item["ingestionStorage"]),
    managedEventHubState: item["managedEventHubState"],
    managedResourceGroupName: item["managedResourceGroupName"],
    managedResourcesPublicNetworkAccess: item["managedResourcesPublicNetworkAccess"],
    mergeInfo: !item["mergeInfo"]
      ? item["mergeInfo"]
      : accountMergeInfoSerializer(item["mergeInfo"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    tenantEndpointState: item["tenantEndpointState"],
  };
}

export function _accountPropertiesDeserializer(item: any) {
  return {
    accountStatus: !item["accountStatus"]
      ? item["accountStatus"]
      : accountPropertiesAccountStatusDeserializer(item["accountStatus"]),
    cloudConnectors: !item["cloudConnectors"]
      ? item["cloudConnectors"]
      : cloudConnectorsDeserializer(item["cloudConnectors"]),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByObjectId: item["createdByObjectId"],
    defaultDomain: item["defaultDomain"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : accountPropertiesEndpointsDeserializer(item["endpoints"]),
    friendlyName: item["friendlyName"],
    ingestionStorage: !item["ingestionStorage"]
      ? item["ingestionStorage"]
      : ingestionStorageDeserializer(item["ingestionStorage"]),
    managedEventHubState: item["managedEventHubState"],
    managedResourceGroupName: item["managedResourceGroupName"],
    managedResources: !item["managedResources"]
      ? item["managedResources"]
      : accountPropertiesManagedResourcesDeserializer(item["managedResources"]),
    managedResourcesPublicNetworkAccess: item["managedResourcesPublicNetworkAccess"],
    mergeInfo: !item["mergeInfo"]
      ? item["mergeInfo"]
      : accountMergeInfoDeserializer(item["mergeInfo"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    publicNetworkAccess: item["publicNetworkAccess"],
    tenantEndpointState: item["tenantEndpointState"],
  };
}

export function _kafkaConfigurationPropertiesSerializer(item: KafkaConfiguration): any {
  return {
    consumerGroup: item["consumerGroup"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsSerializer(item["credentials"]),
    eventHubPartitionId: item["eventHubPartitionId"],
    eventHubResourceId: item["eventHubResourceId"],
    eventHubType: item["eventHubType"],
    eventStreamingState: item["eventStreamingState"],
    eventStreamingType: item["eventStreamingType"],
  };
}

export function _kafkaConfigurationPropertiesDeserializer(item: any) {
  return {
    consumerGroup: item["consumerGroup"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : credentialsDeserializer(item["credentials"]),
    eventHubPartitionId: item["eventHubPartitionId"],
    eventHubResourceId: item["eventHubResourceId"],
    eventHubType: item["eventHubType"],
    eventStreamingState: item["eventStreamingState"],
    eventStreamingType: item["eventStreamingType"],
  };
}
