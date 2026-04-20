// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type {
  ArmErrorDetail,
  Sku,
  ManagedServiceIdentity,
  TrackedResource,
  ExtensionResource,
} from "../../models.js";
import {
  systemDataDeserializer,
  armErrorDetailDeserializer,
  userAssignedIdentityDeserializer,
} from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Definition of ARM tracked top level resource. */
export interface DataCollectionEndpointResource extends TrackedResource {
  /** The kind of the resource. */
  kind?: KnownDataCollectionEndpointResourceKind;
  /** The SKU of the resource. */
  sku?: DataCollectionEndpointResourceSku;
  /** Managed service identity of the resource. */
  identity?: DataCollectionEndpointResourceIdentity;
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the data collection endpoint. */
  description?: string;
  /** The immutable ID of this data collection endpoint resource. This property is READ-ONLY. */
  immutableId?: string;
  /** The endpoint used by clients to access their configuration. */
  configurationAccess?: DataCollectionEndpointConfigurationAccess;
  /** The endpoint used by clients to ingest logs. */
  logsIngestion?: DataCollectionEndpointLogsIngestion;
  /** The endpoint used by clients to ingest metrics. */
  metricsIngestion?: DataCollectionEndpointMetricsIngestion;
  /** Network access control rules for the endpoints. */
  networkAcls?: DataCollectionEndpointNetworkAcls;
  /** The resource provisioning state. This property is READ-ONLY. */
  readonly provisioningState?: KnownDataCollectionEndpointProvisioningState;
  /** List of Azure Monitor Private Link Scope Resources to which this data collection endpoint resource is associated. This property is READ-ONLY. */
  readonly privateLinkScopedResources?: PrivateLinkScopedResource[];
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly failoverConfiguration?: DataCollectionEndpointFailoverConfiguration;
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly metadata?: DataCollectionEndpointMetadata;
}

export function dataCollectionEndpointResourceSerializer(
  item: DataCollectionEndpointResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "description",
      "immutableId",
      "configurationAccess",
      "logsIngestion",
      "metricsIngestion",
      "networkAcls",
    ])
      ? undefined
      : _dataCollectionEndpointResourcePropertiesSerializer(item),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : dataCollectionEndpointResourceSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionEndpointResourceIdentitySerializer(item["identity"]),
  };
}

export function dataCollectionEndpointResourceDeserializer(
  item: any,
): DataCollectionEndpointResource {
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
    ...(!item["properties"]
      ? item["properties"]
      : _dataCollectionEndpointResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : dataCollectionEndpointResourceSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionEndpointResourceIdentityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** model interface DataCollectionEndpointResourceProperties */
export interface DataCollectionEndpointResourceProperties extends DataCollectionEndpoint {}

export function dataCollectionEndpointResourcePropertiesSerializer(
  item: DataCollectionEndpointResourceProperties,
): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionEndpointConfigurationAccessSerializer(item["configurationAccess"]),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionEndpointMetricsIngestionSerializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function dataCollectionEndpointResourcePropertiesDeserializer(
  item: any,
): DataCollectionEndpointResourceProperties {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionEndpointConfigurationAccessDeserializer(item["configurationAccess"]),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionEndpointLogsIngestionDeserializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionEndpointMetricsIngestionDeserializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : privateLinkScopedResourceArrayDeserializer(item["privateLinkScopedResources"]),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : dataCollectionEndpointFailoverConfigurationDeserializer(item["failoverConfiguration"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

/** The kind of the resource. */
export enum KnownKnownDataCollectionEndpointResourceKind {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * The kind of the resource. \
 * {@link KnownKnownDataCollectionEndpointResourceKind} can be used interchangeably with KnownDataCollectionEndpointResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux**: Linux \
 * **Windows**: Windows
 */
export type KnownDataCollectionEndpointResourceKind = string;

/** The SKU of the resource. */
export interface DataCollectionEndpointResourceSku extends Sku {}

export function dataCollectionEndpointResourceSkuSerializer(
  item: DataCollectionEndpointResourceSku,
): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function dataCollectionEndpointResourceSkuDeserializer(
  item: any,
): DataCollectionEndpointResourceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Managed service identity of the resource. */
export interface DataCollectionEndpointResourceIdentity extends ManagedServiceIdentity {}

export function dataCollectionEndpointResourceIdentitySerializer(
  item: DataCollectionEndpointResourceIdentity,
): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function dataCollectionEndpointResourceIdentityDeserializer(
  item: any,
): DataCollectionEndpointResourceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Definition of data collection endpoint. */
export interface DataCollectionEndpoint {
  /** Description of the data collection endpoint. */
  description?: string;
  /** The immutable ID of this data collection endpoint resource. This property is READ-ONLY. */
  immutableId?: string;
  /** The endpoint used by clients to access their configuration. */
  configurationAccess?: DataCollectionEndpointConfigurationAccess;
  /** The endpoint used by clients to ingest logs. */
  logsIngestion?: DataCollectionEndpointLogsIngestion;
  /** The endpoint used by clients to ingest metrics. */
  metricsIngestion?: DataCollectionEndpointMetricsIngestion;
  /** Network access control rules for the endpoints. */
  networkAcls?: DataCollectionEndpointNetworkAcls;
  /** The resource provisioning state. This property is READ-ONLY. */
  readonly provisioningState?: KnownDataCollectionEndpointProvisioningState;
  /** List of Azure Monitor Private Link Scope Resources to which this data collection endpoint resource is associated. This property is READ-ONLY. */
  readonly privateLinkScopedResources?: PrivateLinkScopedResource[];
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly failoverConfiguration?: DataCollectionEndpointFailoverConfiguration;
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly metadata?: DataCollectionEndpointMetadata;
}

export function dataCollectionEndpointSerializer(item: DataCollectionEndpoint): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionEndpointConfigurationAccessSerializer(item["configurationAccess"]),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionEndpointMetricsIngestionSerializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function dataCollectionEndpointDeserializer(item: any): DataCollectionEndpoint {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionEndpointConfigurationAccessDeserializer(item["configurationAccess"]),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionEndpointLogsIngestionDeserializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionEndpointMetricsIngestionDeserializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : privateLinkScopedResourceArrayDeserializer(item["privateLinkScopedResources"]),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : dataCollectionEndpointFailoverConfigurationDeserializer(item["failoverConfiguration"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

/** The endpoint used by clients to access their configuration. */
export interface DataCollectionEndpointConfigurationAccess extends ConfigurationAccessEndpointSpec {}

export function dataCollectionEndpointConfigurationAccessSerializer(
  _item: DataCollectionEndpointConfigurationAccess,
): any {
  return {};
}

export function dataCollectionEndpointConfigurationAccessDeserializer(
  item: any,
): DataCollectionEndpointConfigurationAccess {
  return {
    endpoint: item["endpoint"],
  };
}

/** The endpoint used by clients to ingest logs. */
export interface DataCollectionEndpointLogsIngestion extends LogsIngestionEndpointSpec {}

export function dataCollectionEndpointLogsIngestionSerializer(
  _item: DataCollectionEndpointLogsIngestion,
): any {
  return {};
}

export function dataCollectionEndpointLogsIngestionDeserializer(
  item: any,
): DataCollectionEndpointLogsIngestion {
  return {
    endpoint: item["endpoint"],
  };
}

/** The endpoint used by clients to ingest metrics. */
export interface DataCollectionEndpointMetricsIngestion extends MetricsIngestionEndpointSpec {}

export function dataCollectionEndpointMetricsIngestionSerializer(
  _item: DataCollectionEndpointMetricsIngestion,
): any {
  return {};
}

export function dataCollectionEndpointMetricsIngestionDeserializer(
  item: any,
): DataCollectionEndpointMetricsIngestion {
  return {
    endpoint: item["endpoint"],
  };
}

/** Network access control rules for the endpoints. */
export interface DataCollectionEndpointNetworkAcls extends NetworkRuleSet {}

export function dataCollectionEndpointNetworkAclsSerializer(
  item: DataCollectionEndpointNetworkAcls,
): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function dataCollectionEndpointNetworkAclsDeserializer(
  item: any,
): DataCollectionEndpointNetworkAcls {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The resource provisioning state. This property is READ-ONLY. */
export enum KnownKnownDataCollectionEndpointProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * The resource provisioning state. This property is READ-ONLY. \
 * {@link KnownKnownDataCollectionEndpointProvisioningState} can be used interchangeably with KnownDataCollectionEndpointProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type KnownDataCollectionEndpointProvisioningState = string;

export function privateLinkScopedResourceArrayDeserializer(
  result: Array<PrivateLinkScopedResource>,
): any[] {
  return result.map((item) => {
    return privateLinkScopedResourceDeserializer(item);
  });
}

/** model interface PrivateLinkScopedResource */
export interface PrivateLinkScopedResource {
  /** The resourceId of the Azure Monitor Private Link Scope Scoped Resource through which this DCE is associated with a Azure Monitor Private Link Scope. */
  resourceId?: string;
  /** The immutableId of the Azure Monitor Private Link Scope Resource to which the association is. */
  scopeId?: string;
}

export function privateLinkScopedResourceDeserializer(item: any): PrivateLinkScopedResource {
  return {
    resourceId: item["resourceId"],
    scopeId: item["scopeId"],
  };
}

/** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
export interface DataCollectionEndpointFailoverConfiguration extends FailoverConfigurationSpec {}

export function dataCollectionEndpointFailoverConfigurationDeserializer(
  item: any,
): DataCollectionEndpointFailoverConfiguration {
  return {
    activeLocation: item["activeLocation"],
    locations: !item["locations"]
      ? item["locations"]
      : locationSpecArrayDeserializer(item["locations"]),
  };
}

/** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
export interface DataCollectionEndpointMetadata extends Metadata {}

export function dataCollectionEndpointMetadataDeserializer(
  item: any,
): DataCollectionEndpointMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Definition of the endpoint used for accessing configuration. */
export interface ConfigurationAccessEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function configurationAccessEndpointSpecSerializer(
  _item: ConfigurationAccessEndpointSpec,
): any {
  return {};
}

export function configurationAccessEndpointSpecDeserializer(
  item: any,
): ConfigurationAccessEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the endpoint used for ingesting logs. */
export interface LogsIngestionEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function logsIngestionEndpointSpecSerializer(_item: LogsIngestionEndpointSpec): any {
  return {};
}

export function logsIngestionEndpointSpecDeserializer(item: any): LogsIngestionEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the endpoint used for ingesting metrics. */
export interface MetricsIngestionEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function metricsIngestionEndpointSpecSerializer(_item: MetricsIngestionEndpointSpec): any {
  return {};
}

export function metricsIngestionEndpointSpecDeserializer(item: any): MetricsIngestionEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the network rules. */
export interface NetworkRuleSet {
  /** The configuration to set whether network access from public internet to the endpoints are allowed. */
  publicNetworkAccess?: KnownPublicNetworkAccessOptions;
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The configuration to set whether network access from public internet to the endpoints are allowed. */
export enum KnownKnownPublicNetworkAccessOptions {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * The configuration to set whether network access from public internet to the endpoints are allowed. \
 * {@link KnownKnownPublicNetworkAccessOptions} can be used interchangeably with KnownPublicNetworkAccessOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **SecuredByPerimeter**: SecuredByPerimeter
 */
export type KnownPublicNetworkAccessOptions = string;

/** model interface FailoverConfigurationSpec */
export interface FailoverConfigurationSpec {
  /** Active location where data flow will occur. */
  activeLocation?: string;
  /** Locations that are configured for failover. */
  locations?: LocationSpec[];
}

export function failoverConfigurationSpecDeserializer(item: any): FailoverConfigurationSpec {
  return {
    activeLocation: item["activeLocation"],
    locations: !item["locations"]
      ? item["locations"]
      : locationSpecArrayDeserializer(item["locations"]),
  };
}

export function locationSpecArrayDeserializer(result: Array<LocationSpec>): any[] {
  return result.map((item) => {
    return locationSpecDeserializer(item);
  });
}

/** model interface LocationSpec */
export interface LocationSpec {
  /** Name of location. */
  location?: string;
  /** The resource provisioning state in this location. */
  provisioningStatus?: KnownLocationSpecProvisioningStatus;
}

export function locationSpecDeserializer(item: any): LocationSpec {
  return {
    location: item["location"],
    provisioningStatus: item["provisioningStatus"],
  };
}

/** The resource provisioning state in this location. */
export enum KnownKnownLocationSpecProvisioningStatus {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * The resource provisioning state in this location. \
 * {@link KnownKnownLocationSpecProvisioningStatus} can be used interchangeably with KnownLocationSpecProvisioningStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type KnownLocationSpecProvisioningStatus = string;

/** Metadata about the resource */
export interface Metadata {
  /** Azure offering managing this resource on-behalf-of customer. */
  readonly provisionedBy?: string;
  /** Resource Id of azure offering managing this resource on-behalf-of customer. */
  readonly provisionedByResourceId?: string;
  /** Immutable Id of azure offering managing this resource on-behalf-of customer. */
  readonly provisionedByImmutableId?: string;
}

export function metadataDeserializer(item: any): Metadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponseCommonV2 {
  /** The error object. */
  error?: ArmErrorDetail;
}

export function errorResponseCommonV2Deserializer(item: any): ErrorResponseCommonV2 {
  return {
    error: !item["error"] ? item["error"] : armErrorDetailDeserializer(item["error"]),
  };
}

/** Definition of ARM tracked top level resource properties for update operation. */
export interface ResourceForUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed Service Identity. */
  identity?: ResourceForUpdateIdentity;
}

export function resourceForUpdateSerializer(item: ResourceForUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : resourceForUpdateIdentitySerializer(item["identity"]),
  };
}

/** Managed Service Identity. */
export interface ResourceForUpdateIdentity extends ManagedServiceIdentity {}

export function resourceForUpdateIdentitySerializer(item: ResourceForUpdateIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function dataCollectionEndpointResourceArraySerializer(
  result: Array<DataCollectionEndpointResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionEndpointResourceSerializer(item);
  });
}

export function dataCollectionEndpointResourceArrayDeserializer(
  result: Array<DataCollectionEndpointResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionEndpointResourceDeserializer(item);
  });
}

export function dataCollectionRuleAssociationProxyOnlyResourceArraySerializer(
  result: Array<DataCollectionRuleAssociationProxyOnlyResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionRuleAssociationProxyOnlyResourceSerializer(item);
  });
}

export function dataCollectionRuleAssociationProxyOnlyResourceArrayDeserializer(
  result: Array<DataCollectionRuleAssociationProxyOnlyResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionRuleAssociationProxyOnlyResourceDeserializer(item);
  });
}

/** Definition of generic ARM proxy resource. */
export interface DataCollectionRuleAssociationProxyOnlyResource extends ExtensionResource {
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the association. */
  description?: string;
  /** The resource ID of the data collection rule that is to be associated. */
  dataCollectionRuleId?: string;
  /** The resource ID of the data collection endpoint that is to be associated. */
  dataCollectionEndpointId?: string;
  /** The resource provisioning state. */
  readonly provisioningState?: KnownDataCollectionRuleAssociationProvisioningState;
  /** Metadata about the resource */
  readonly metadata?: DataCollectionRuleAssociationMetadata;
}

export function dataCollectionRuleAssociationProxyOnlyResourceSerializer(
  item: DataCollectionRuleAssociationProxyOnlyResource,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "dataCollectionRuleId",
      "dataCollectionEndpointId",
    ])
      ? undefined
      : _dataCollectionRuleAssociationProxyOnlyResourcePropertiesSerializer(item),
  };
}

export function dataCollectionRuleAssociationProxyOnlyResourceDeserializer(
  item: any,
): DataCollectionRuleAssociationProxyOnlyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dataCollectionRuleAssociationProxyOnlyResourcePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** model interface DataCollectionRuleAssociationProxyOnlyResourceProperties */
export interface DataCollectionRuleAssociationProxyOnlyResourceProperties extends DataCollectionRuleAssociation {}

export function dataCollectionRuleAssociationProxyOnlyResourcePropertiesSerializer(
  item: DataCollectionRuleAssociationProxyOnlyResourceProperties,
): any {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
  };
}

export function dataCollectionRuleAssociationProxyOnlyResourcePropertiesDeserializer(
  item: any,
): DataCollectionRuleAssociationProxyOnlyResourceProperties {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    provisioningState: item["provisioningState"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

/** Definition of association of a data collection rule with a monitored Azure resource. */
export interface DataCollectionRuleAssociation {
  /** Description of the association. */
  description?: string;
  /** The resource ID of the data collection rule that is to be associated. */
  dataCollectionRuleId?: string;
  /** The resource ID of the data collection endpoint that is to be associated. */
  dataCollectionEndpointId?: string;
  /** The resource provisioning state. */
  readonly provisioningState?: KnownDataCollectionRuleAssociationProvisioningState;
  /** Metadata about the resource */
  readonly metadata?: DataCollectionRuleAssociationMetadata;
}

export function dataCollectionRuleAssociationSerializer(item: DataCollectionRuleAssociation): any {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
  };
}

export function dataCollectionRuleAssociationDeserializer(
  item: any,
): DataCollectionRuleAssociation {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    provisioningState: item["provisioningState"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

/** The resource provisioning state. */
export enum KnownKnownDataCollectionRuleAssociationProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * The resource provisioning state. \
 * {@link KnownKnownDataCollectionRuleAssociationProvisioningState} can be used interchangeably with KnownDataCollectionRuleAssociationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type KnownDataCollectionRuleAssociationProvisioningState = string;

/** Metadata about the resource */
export interface DataCollectionRuleAssociationMetadata extends Metadata {}

export function dataCollectionRuleAssociationMetadataDeserializer(
  item: any,
): DataCollectionRuleAssociationMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Definition of ARM tracked top level resource. */
export interface DataCollectionRuleResource extends TrackedResource {
  /** The kind of the resource. */
  kind?: KnownDataCollectionRuleResourceKind;
  /** The SKU of the resource. */
  sku?: DataCollectionRuleResourceSku;
  /** Managed service identity of the resource. */
  identity?: DataCollectionRuleResourceIdentity;
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the data collection rule. */
  description?: string;
  /** The immutable ID of this data collection rule. This property is READ-ONLY. */
  readonly immutableId?: string;
  /** The resource ID of the data collection endpoint that this rule can be used with. */
  dataCollectionEndpointId?: string;
  /** Metadata about the resource */
  readonly metadata?: DataCollectionRuleMetadata;
  /** Defines the ingestion endpoints to send data to via this rule. */
  readonly endpoints?: DataCollectionRuleEndpoints;
  /** Defines all the references that may be used in other sections of the DCR */
  references?: DataCollectionRuleReferences;
  /** Agent settings used to modify agent behavior on a given host */
  agentSettings?: DataCollectionRuleAgentSettings;
  /** Declaration of custom streams used in this rule. */
  streamDeclarations?: Record<string, StreamDeclaration>;
  /**
   * The specification of data sources.
   * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
   */
  dataSources?: DataCollectionRuleDataSources;
  /**
   * The specification of direct data sources.
   * This property is optional and can be omitted.
   */
  directDataSources?: DataCollectionRuleDirectDataSources;
  /** The specification of destinations. */
  destinations?: DataCollectionRuleDestinations;
  /** The specification of data flows. */
  dataFlows?: DataFlow[];
  /** The specification for ingestion limits */
  readonly ingestionQuotas?: DataCollectionRuleIngestionQuotas;
  /** The resource provisioning state. */
  readonly provisioningState?: KnownDataCollectionRuleProvisioningState;
}

export function dataCollectionRuleResourceSerializer(item: DataCollectionRuleResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "description",
      "dataCollectionEndpointId",
      "references",
      "agentSettings",
      "streamDeclarations",
      "dataSources",
      "directDataSources",
      "destinations",
      "dataFlows",
    ])
      ? undefined
      : _dataCollectionRuleResourcePropertiesSerializer(item),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : dataCollectionRuleResourceSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionRuleResourceIdentitySerializer(item["identity"]),
  };
}

export function dataCollectionRuleResourceDeserializer(item: any): DataCollectionRuleResource {
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
    ...(!item["properties"]
      ? item["properties"]
      : _dataCollectionRuleResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : dataCollectionRuleResourceSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionRuleResourceIdentityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** model interface DataCollectionRuleResourceProperties */
export interface DataCollectionRuleResourceProperties extends DataCollectionRule {}

export function dataCollectionRuleResourcePropertiesSerializer(
  item: DataCollectionRuleResourceProperties,
): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : dataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : streamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionRuleDirectDataSourcesSerializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"] ? item["dataFlows"] : dataFlowArraySerializer(item["dataFlows"]),
  };
}

export function dataCollectionRuleResourcePropertiesDeserializer(
  item: any,
): DataCollectionRuleResourceProperties {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : dataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : dataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : streamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionRuleDirectDataSourcesDeserializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : dataCollectionRuleIngestionQuotasDeserializer(item["ingestionQuotas"]),
    provisioningState: item["provisioningState"],
  };
}

/** The kind of the resource. */
export enum KnownKnownDataCollectionRuleResourceKind {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * The kind of the resource. \
 * {@link KnownKnownDataCollectionRuleResourceKind} can be used interchangeably with KnownDataCollectionRuleResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux**: Linux \
 * **Windows**: Windows
 */
export type KnownDataCollectionRuleResourceKind = string;

/** The SKU of the resource. */
export interface DataCollectionRuleResourceSku extends Sku {}

export function dataCollectionRuleResourceSkuSerializer(item: DataCollectionRuleResourceSku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function dataCollectionRuleResourceSkuDeserializer(
  item: any,
): DataCollectionRuleResourceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Managed service identity of the resource. */
export interface DataCollectionRuleResourceIdentity extends ManagedServiceIdentity {}

export function dataCollectionRuleResourceIdentitySerializer(
  item: DataCollectionRuleResourceIdentity,
): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function dataCollectionRuleResourceIdentityDeserializer(
  item: any,
): DataCollectionRuleResourceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
  };
}

/** Definition of what monitoring data to collect and where that data should be sent. */
export interface DataCollectionRule {
  /** Description of the data collection rule. */
  description?: string;
  /** The immutable ID of this data collection rule. This property is READ-ONLY. */
  readonly immutableId?: string;
  /** The resource ID of the data collection endpoint that this rule can be used with. */
  dataCollectionEndpointId?: string;
  /** Metadata about the resource */
  readonly metadata?: DataCollectionRuleMetadata;
  /** Defines the ingestion endpoints to send data to via this rule. */
  readonly endpoints?: DataCollectionRuleEndpoints;
  /** Defines all the references that may be used in other sections of the DCR */
  references?: DataCollectionRuleReferences;
  /** Agent settings used to modify agent behavior on a given host */
  agentSettings?: DataCollectionRuleAgentSettings;
  /** Declaration of custom streams used in this rule. */
  streamDeclarations?: Record<string, StreamDeclaration>;
  /**
   * The specification of data sources.
   * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
   */
  dataSources?: DataCollectionRuleDataSources;
  /**
   * The specification of direct data sources.
   * This property is optional and can be omitted.
   */
  directDataSources?: DataCollectionRuleDirectDataSources;
  /** The specification of destinations. */
  destinations?: DataCollectionRuleDestinations;
  /** The specification of data flows. */
  dataFlows?: DataFlow[];
  /** The specification for ingestion limits */
  readonly ingestionQuotas?: DataCollectionRuleIngestionQuotas;
  /** The resource provisioning state. */
  readonly provisioningState?: KnownDataCollectionRuleProvisioningState;
}

export function dataCollectionRuleSerializer(item: DataCollectionRule): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : dataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : streamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionRuleDirectDataSourcesSerializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"] ? item["dataFlows"] : dataFlowArraySerializer(item["dataFlows"]),
  };
}

export function dataCollectionRuleDeserializer(item: any): DataCollectionRule {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : dataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : dataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : streamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionRuleDirectDataSourcesDeserializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : dataCollectionRuleIngestionQuotasDeserializer(item["ingestionQuotas"]),
    provisioningState: item["provisioningState"],
  };
}

/** Metadata about the resource */
export interface DataCollectionRuleMetadata extends Metadata {}

export function dataCollectionRuleMetadataDeserializer(item: any): DataCollectionRuleMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Defines the ingestion endpoints to send data to via this rule. */
export interface DataCollectionRuleEndpoints extends EndpointsSpec {}

export function dataCollectionRuleEndpointsDeserializer(item: any): DataCollectionRuleEndpoints {
  return {
    logsIngestion: item["logsIngestion"],
    metricsIngestion: item["metricsIngestion"],
  };
}

/** Defines all the references that may be used in other sections of the DCR */
export interface DataCollectionRuleReferences extends ReferencesSpec {}

export function dataCollectionRuleReferencesSerializer(item: DataCollectionRuleReferences): any {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : referencesSpecEnrichmentDataSerializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : applicationInsightsArraySerializer(item["applicationInsights"]),
  };
}

export function dataCollectionRuleReferencesDeserializer(item: any): DataCollectionRuleReferences {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : referencesSpecEnrichmentDataDeserializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : applicationInsightsArrayDeserializer(item["applicationInsights"]),
  };
}

/** Agent settings used to modify agent behavior on a given host */
export interface DataCollectionRuleAgentSettings extends AgentSettingsSpec {}

export function dataCollectionRuleAgentSettingsSerializer(
  item: DataCollectionRuleAgentSettings,
): any {
  return { logs: !item["logs"] ? item["logs"] : agentSettingArraySerializer(item["logs"]) };
}

export function dataCollectionRuleAgentSettingsDeserializer(
  item: any,
): DataCollectionRuleAgentSettings {
  return {
    logs: !item["logs"] ? item["logs"] : agentSettingArrayDeserializer(item["logs"]),
  };
}

export function streamDeclarationRecordSerializer(
  item: Record<string, StreamDeclaration>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : streamDeclarationSerializer(item[key]);
  });
  return result;
}

export function streamDeclarationRecordDeserializer(
  item: Record<string, any>,
): Record<string, StreamDeclaration> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : streamDeclarationDeserializer(item[key]);
  });
  return result;
}

/** Declaration of a custom stream. */
export interface StreamDeclaration {
  /** List of columns used by data in this stream. */
  columns?: ColumnDefinition[];
}

export function streamDeclarationSerializer(item: StreamDeclaration): any {
  return {
    columns: !item["columns"] ? item["columns"] : columnDefinitionArraySerializer(item["columns"]),
  };
}

export function streamDeclarationDeserializer(item: any): StreamDeclaration {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : columnDefinitionArrayDeserializer(item["columns"]),
  };
}

export function columnDefinitionArraySerializer(result: Array<ColumnDefinition>): any[] {
  return result.map((item) => {
    return columnDefinitionSerializer(item);
  });
}

export function columnDefinitionArrayDeserializer(result: Array<ColumnDefinition>): any[] {
  return result.map((item) => {
    return columnDefinitionDeserializer(item);
  });
}

/** Definition of custom data column. */
export interface ColumnDefinition {
  /** The name of the column. */
  name?: string;
  /** The type of the column data. */
  type?: KnownColumnDefinitionType;
}

export function columnDefinitionSerializer(item: ColumnDefinition): any {
  return { name: item["name"], type: item["type"] };
}

export function columnDefinitionDeserializer(item: any): ColumnDefinition {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of the column data. */
export enum KnownKnownColumnDefinitionType {
  /** string */
  String = "string",
  /** int */
  Int = "int",
  /** long */
  Long = "long",
  /** real */
  Real = "real",
  /** boolean */
  Boolean = "boolean",
  /** datetime */
  Datetime = "datetime",
  /** dynamic */
  Dynamic = "dynamic",
}

/**
 * The type of the column data. \
 * {@link KnownKnownColumnDefinitionType} can be used interchangeably with KnownColumnDefinitionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **string**: string \
 * **int**: int \
 * **long**: long \
 * **real**: real \
 * **boolean**: boolean \
 * **datetime**: datetime \
 * **dynamic**: dynamic
 */
export type KnownColumnDefinitionType = string;

/**
 * The specification of data sources.
 * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
 */
export interface DataCollectionRuleDataSources extends DataSourcesSpec {}

export function dataCollectionRuleDataSourcesSerializer(item: DataCollectionRuleDataSources): any {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : perfCounterDataSourceArraySerializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : performanceCountersOTelDataSourceArraySerializer(item["performanceCountersOTel"]),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : windowsEventLogDataSourceArraySerializer(item["windowsEventLogs"]),
    syslog: !item["syslog"] ? item["syslog"] : syslogDataSourceArraySerializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : extensionDataSourceArraySerializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : logFilesDataSourceArraySerializer(item["logFiles"]),
    iisLogs: !item["iisLogs"] ? item["iisLogs"] : iisLogsDataSourceArraySerializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : windowsFirewallLogsDataSourceArraySerializer(item["windowsFirewallLogs"]),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : prometheusForwarderDataSourceArraySerializer(item["prometheusForwarder"]),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : platformTelemetryDataSourceArraySerializer(item["platformTelemetry"]),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : dataSourcesSpecDataImportsSerializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : otelLogsDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : otelTracesDataSourceArraySerializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : otelMetricsDataSourceArraySerializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : etwProviderDataSourceArraySerializer(item["etwProviders"]),
  };
}

export function dataCollectionRuleDataSourcesDeserializer(
  item: any,
): DataCollectionRuleDataSources {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : perfCounterDataSourceArrayDeserializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : performanceCountersOTelDataSourceArrayDeserializer(item["performanceCountersOTel"]),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : windowsEventLogDataSourceArrayDeserializer(item["windowsEventLogs"]),
    syslog: !item["syslog"] ? item["syslog"] : syslogDataSourceArrayDeserializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : extensionDataSourceArrayDeserializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : logFilesDataSourceArrayDeserializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : iisLogsDataSourceArrayDeserializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : windowsFirewallLogsDataSourceArrayDeserializer(item["windowsFirewallLogs"]),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : prometheusForwarderDataSourceArrayDeserializer(item["prometheusForwarder"]),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : platformTelemetryDataSourceArrayDeserializer(item["platformTelemetry"]),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : dataSourcesSpecDataImportsDeserializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : otelLogsDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : otelTracesDataSourceArrayDeserializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : otelMetricsDataSourceArrayDeserializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : etwProviderDataSourceArrayDeserializer(item["etwProviders"]),
  };
}

/**
 * The specification of direct data sources.
 * This property is optional and can be omitted.
 */
export interface DataCollectionRuleDirectDataSources extends DirectDataSourcesSpec {}

export function dataCollectionRuleDirectDataSourcesSerializer(
  item: DataCollectionRuleDirectDataSources,
): any {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : otelMetricsDirectDataSourceArraySerializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : otelLogsDirectDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : otelTracesDirectDataSourceArraySerializer(item["otelTraces"]),
  };
}

export function dataCollectionRuleDirectDataSourcesDeserializer(
  item: any,
): DataCollectionRuleDirectDataSources {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : otelMetricsDirectDataSourceArrayDeserializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : otelLogsDirectDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : otelTracesDirectDataSourceArrayDeserializer(item["otelTraces"]),
  };
}

/** The specification of destinations. */
export interface DataCollectionRuleDestinations extends DestinationsSpec {}

export function dataCollectionRuleDestinationsSerializer(
  item: DataCollectionRuleDestinations,
): any {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : logAnalyticsDestinationArraySerializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : monitoringAccountDestinationArraySerializer(item["monitoringAccounts"]),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : destinationsSpecAzureMonitorMetricsSerializer(item["azureMonitorMetrics"]),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : eventHubDestinationArraySerializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : eventHubDirectDestinationArraySerializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : storageBlobDestinationArraySerializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : storageTableDestinationArraySerializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : storageBlobDestinationArraySerializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : microsoftFabricDestinationArraySerializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : adxDestinationArraySerializer(item["azureDataExplorer"]),
  };
}

export function dataCollectionRuleDestinationsDeserializer(
  item: any,
): DataCollectionRuleDestinations {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : logAnalyticsDestinationArrayDeserializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : monitoringAccountDestinationArrayDeserializer(item["monitoringAccounts"]),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : destinationsSpecAzureMonitorMetricsDeserializer(item["azureMonitorMetrics"]),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : eventHubDestinationArrayDeserializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : eventHubDirectDestinationArrayDeserializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : storageBlobDestinationArrayDeserializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : storageTableDestinationArrayDeserializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : storageBlobDestinationArrayDeserializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : microsoftFabricDestinationArrayDeserializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : adxDestinationArrayDeserializer(item["azureDataExplorer"]),
  };
}

export function dataFlowArraySerializer(result: Array<DataFlow>): any[] {
  return result.map((item) => {
    return dataFlowSerializer(item);
  });
}

export function dataFlowArrayDeserializer(result: Array<DataFlow>): any[] {
  return result.map((item) => {
    return dataFlowDeserializer(item);
  });
}

/** Definition of which streams are sent to which destinations. */
export interface DataFlow {
  /** List of streams for this data flow. */
  streams?: KnownDataFlowStreams[];
  /** List of destinations for this data flow. */
  destinations?: string[];
  /** The KQL query to transform stream data. */
  transformKql?: string;
  /** The output stream of the transform. Only required if the transform changes data to a different stream. */
  outputStream?: string;
  /** The builtIn transform to transform stream data */
  builtInTransform?: string;
  /** Flag to enable overflow column in LA destinations */
  captureOverflow?: boolean;
}

export function dataFlowSerializer(item: DataFlow): any {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    destinations: !item["destinations"]
      ? item["destinations"]
      : item["destinations"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    outputStream: item["outputStream"],
    builtInTransform: item["builtInTransform"],
    captureOverflow: item["captureOverflow"],
  };
}

export function dataFlowDeserializer(item: any): DataFlow {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    destinations: !item["destinations"]
      ? item["destinations"]
      : item["destinations"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    outputStream: item["outputStream"],
    builtInTransform: item["builtInTransform"],
    captureOverflow: item["captureOverflow"],
  };
}

/** Known values of {@link KnownDataFlowStreams} that the service accepts. */
export enum KnownKnownDataFlowStreams {
  /** Microsoft-Event */
  MicrosoftEvent = "Microsoft-Event",
  /** Microsoft-InsightsMetrics */
  MicrosoftInsightsMetrics = "Microsoft-InsightsMetrics",
  /** Microsoft-Perf */
  MicrosoftPerf = "Microsoft-Perf",
  /** Microsoft-Syslog */
  MicrosoftSyslog = "Microsoft-Syslog",
  /** Microsoft-WindowsEvent */
  MicrosoftWindowsEvent = "Microsoft-WindowsEvent",
}

/** Type of KnownDataFlowStreams */
export type KnownDataFlowStreams = string;

/** The specification for ingestion limits */
export interface DataCollectionRuleIngestionQuotas extends IngestionQuotas {}

export function dataCollectionRuleIngestionQuotasDeserializer(
  item: any,
): DataCollectionRuleIngestionQuotas {
  return {
    logs: !item["logs"] ? item["logs"] : ingestionQuotasLogsDeserializer(item["logs"]),
  };
}

/** The resource provisioning state. */
export enum KnownKnownDataCollectionRuleProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * The resource provisioning state. \
 * {@link KnownKnownDataCollectionRuleProvisioningState} can be used interchangeably with KnownDataCollectionRuleProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type KnownDataCollectionRuleProvisioningState = string;

/** This defines all the ingestion endpoints that can be used by this rule */
export interface EndpointsSpec {
  /** The ingestion endpoint for logs */
  readonly logsIngestion?: string;
  /** The ingestion endpoint for metrics */
  readonly metricsIngestion?: string;
}

export function endpointsSpecDeserializer(item: any): EndpointsSpec {
  return {
    logsIngestion: item["logsIngestion"],
    metricsIngestion: item["metricsIngestion"],
  };
}

/** This section defines all the references that may be used in other sections of the DCR */
export interface ReferencesSpec {
  /** All the enrichment data sources referenced in data flows */
  enrichmentData?: ReferencesSpecEnrichmentData;
  /** Application Insights references to be used on OTel metrics/logs enrichment */
  applicationInsights?: ApplicationInsights[];
}

export function referencesSpecSerializer(item: ReferencesSpec): any {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : referencesSpecEnrichmentDataSerializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : applicationInsightsArraySerializer(item["applicationInsights"]),
  };
}

export function referencesSpecDeserializer(item: any): ReferencesSpec {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : referencesSpecEnrichmentDataDeserializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : applicationInsightsArrayDeserializer(item["applicationInsights"]),
  };
}

/** All the enrichment data sources referenced in data flows */
export interface ReferencesSpecEnrichmentData extends EnrichmentData {}

export function referencesSpecEnrichmentDataSerializer(item: ReferencesSpecEnrichmentData): any {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : storageBlobArraySerializer(item["storageBlobs"]),
  };
}

export function referencesSpecEnrichmentDataDeserializer(item: any): ReferencesSpecEnrichmentData {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : storageBlobArrayDeserializer(item["storageBlobs"]),
  };
}

export function applicationInsightsArraySerializer(result: Array<ApplicationInsights>): any[] {
  return result.map((item) => {
    return applicationInsightsSerializer(item);
  });
}

export function applicationInsightsArrayDeserializer(result: Array<ApplicationInsights>): any[] {
  return result.map((item) => {
    return applicationInsightsDeserializer(item);
  });
}

/** model interface ApplicationInsights */
export interface ApplicationInsights {
  /** Id of the application insights resource */
  resourceId: string;
  /** The name of the reference used as an alias when referencing this application insights in Otel data sources */
  name: string;
}

export function applicationInsightsSerializer(item: ApplicationInsights): any {
  return { resourceId: item["resourceId"], name: item["name"] };
}

export function applicationInsightsDeserializer(item: any): ApplicationInsights {
  return {
    resourceId: item["resourceId"],
    name: item["name"],
  };
}

/** All the enrichment data sources referenced in data flows */
export interface EnrichmentData {
  /** All the storage blobs used as enrichment data sources */
  storageBlobs?: StorageBlob[];
}

export function enrichmentDataSerializer(item: EnrichmentData): any {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : storageBlobArraySerializer(item["storageBlobs"]),
  };
}

export function enrichmentDataDeserializer(item: any): EnrichmentData {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : storageBlobArrayDeserializer(item["storageBlobs"]),
  };
}

export function storageBlobArraySerializer(result: Array<StorageBlob>): any[] {
  return result.map((item) => {
    return storageBlobSerializer(item);
  });
}

export function storageBlobArrayDeserializer(result: Array<StorageBlob>): any[] {
  return result.map((item) => {
    return storageBlobDeserializer(item);
  });
}

/** model interface StorageBlob */
export interface StorageBlob {
  /** Resource Id of the storage account that hosts the blob */
  resourceId?: string;
  /** Url of the storage blob */
  blobUrl?: string;
  /** The type of lookup to perform on the blob */
  lookupType?: KnownStorageBlobLookupType;
  /** The name of the enrichment data source used as an alias when referencing this data source in data flows */
  name?: string;
}

export function storageBlobSerializer(item: StorageBlob): any {
  return {
    resourceId: item["resourceId"],
    blobUrl: item["blobUrl"],
    lookupType: item["lookupType"],
    name: item["name"],
  };
}

export function storageBlobDeserializer(item: any): StorageBlob {
  return {
    resourceId: item["resourceId"],
    blobUrl: item["blobUrl"],
    lookupType: item["lookupType"],
    name: item["name"],
  };
}

/** The type of lookup to perform on the blob */
export enum KnownKnownStorageBlobLookupType {
  /** String */
  String = "String",
  /** Cidr */
  Cidr = "Cidr",
}

/**
 * The type of lookup to perform on the blob \
 * {@link KnownKnownStorageBlobLookupType} can be used interchangeably with KnownStorageBlobLookupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: String \
 * **Cidr**: Cidr
 */
export type KnownStorageBlobLookupType = string;

/** An agent setting */
export interface AgentSettingsSpec {
  /** All the settings that are applicable to the logs agent (AMA) */
  logs?: AgentSetting[];
}

export function agentSettingsSpecSerializer(item: AgentSettingsSpec): any {
  return { logs: !item["logs"] ? item["logs"] : agentSettingArraySerializer(item["logs"]) };
}

export function agentSettingsSpecDeserializer(item: any): AgentSettingsSpec {
  return {
    logs: !item["logs"] ? item["logs"] : agentSettingArrayDeserializer(item["logs"]),
  };
}

export function agentSettingArraySerializer(result: Array<AgentSetting>): any[] {
  return result.map((item) => {
    return agentSettingSerializer(item);
  });
}

export function agentSettingArrayDeserializer(result: Array<AgentSetting>): any[] {
  return result.map((item) => {
    return agentSettingDeserializer(item);
  });
}

/** A setting used to control an agent behavior on a host machine */
export interface AgentSetting {
  /**
   * The name of the setting.
   * Must be part of the list of supported settings
   */
  name?: KnownAgentSettingName;
  /** The value of the setting */
  value?: string;
}

export function agentSettingSerializer(item: AgentSetting): any {
  return { name: item["name"], value: item["value"] };
}

export function agentSettingDeserializer(item: any): AgentSetting {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/**
 * The name of the setting.
 * Must be part of the list of supported settings
 */
export enum KnownKnownAgentSettingName {
  /** MaxDiskQuotaInMB */
  MaxDiskQuotaInMB = "MaxDiskQuotaInMB",
  /** UseTimeReceivedForForwardedEvents */
  UseTimeReceivedForForwardedEvents = "UseTimeReceivedForForwardedEvents",
  /** Tags */
  Tags = "Tags",
}

/**
 * The name of the setting.
 * Must be part of the list of supported settings \
 * {@link KnownKnownAgentSettingName} can be used interchangeably with KnownAgentSettingName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MaxDiskQuotaInMB**: MaxDiskQuotaInMB \
 * **UseTimeReceivedForForwardedEvents**: UseTimeReceivedForForwardedEvents \
 * **Tags**: Tags
 */
export type KnownAgentSettingName = string;

/** Specification of data sources that will be collected. */
export interface DataSourcesSpec {
  /** The list of performance counter data source configurations. */
  performanceCounters?: PerfCounterDataSource[];
  /** The list of Open Telemetry performance counter data source configurations. */
  performanceCountersOTel?: PerformanceCountersOTelDataSource[];
  /** The list of Windows Event Log data source configurations. */
  windowsEventLogs?: WindowsEventLogDataSource[];
  /** The list of Syslog data source configurations. */
  syslog?: SyslogDataSource[];
  /** The list of Azure VM extension data source configurations. */
  extensions?: ExtensionDataSource[];
  /** The list of Log files source configurations. */
  logFiles?: LogFilesDataSource[];
  /** The list of IIS logs source configurations. */
  iisLogs?: IisLogsDataSource[];
  /** The list of Windows Firewall logs source configurations. */
  windowsFirewallLogs?: WindowsFirewallLogsDataSource[];
  /** The list of Prometheus forwarder data source configurations. */
  prometheusForwarder?: PrometheusForwarderDataSource[];
  /** The list of platform telemetry configurations */
  platformTelemetry?: PlatformTelemetryDataSource[];
  /** Specifications of pull based data sources */
  dataImports?: DataSourcesSpecDataImports;
  /** The list of Otel Logs data source configurations. */
  otelLogs?: OtelLogsDataSource[];
  /** The list of Otel traces data source configurations. */
  otelTraces?: OtelTracesDataSource[];
  /** The list of OTel metrics data source configurations. */
  otelMetrics?: OtelMetricsDataSource[];
  /** The list of ETW providers data source configurations. */
  etwProviders?: EtwProviderDataSource[];
}

export function dataSourcesSpecSerializer(item: DataSourcesSpec): any {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : perfCounterDataSourceArraySerializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : performanceCountersOTelDataSourceArraySerializer(item["performanceCountersOTel"]),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : windowsEventLogDataSourceArraySerializer(item["windowsEventLogs"]),
    syslog: !item["syslog"] ? item["syslog"] : syslogDataSourceArraySerializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : extensionDataSourceArraySerializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : logFilesDataSourceArraySerializer(item["logFiles"]),
    iisLogs: !item["iisLogs"] ? item["iisLogs"] : iisLogsDataSourceArraySerializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : windowsFirewallLogsDataSourceArraySerializer(item["windowsFirewallLogs"]),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : prometheusForwarderDataSourceArraySerializer(item["prometheusForwarder"]),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : platformTelemetryDataSourceArraySerializer(item["platformTelemetry"]),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : dataSourcesSpecDataImportsSerializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : otelLogsDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : otelTracesDataSourceArraySerializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : otelMetricsDataSourceArraySerializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : etwProviderDataSourceArraySerializer(item["etwProviders"]),
  };
}

export function dataSourcesSpecDeserializer(item: any): DataSourcesSpec {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : perfCounterDataSourceArrayDeserializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : performanceCountersOTelDataSourceArrayDeserializer(item["performanceCountersOTel"]),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : windowsEventLogDataSourceArrayDeserializer(item["windowsEventLogs"]),
    syslog: !item["syslog"] ? item["syslog"] : syslogDataSourceArrayDeserializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : extensionDataSourceArrayDeserializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : logFilesDataSourceArrayDeserializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : iisLogsDataSourceArrayDeserializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : windowsFirewallLogsDataSourceArrayDeserializer(item["windowsFirewallLogs"]),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : prometheusForwarderDataSourceArrayDeserializer(item["prometheusForwarder"]),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : platformTelemetryDataSourceArrayDeserializer(item["platformTelemetry"]),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : dataSourcesSpecDataImportsDeserializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : otelLogsDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : otelTracesDataSourceArrayDeserializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : otelMetricsDataSourceArrayDeserializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : etwProviderDataSourceArrayDeserializer(item["etwProviders"]),
  };
}

export function perfCounterDataSourceArraySerializer(result: Array<PerfCounterDataSource>): any[] {
  return result.map((item) => {
    return perfCounterDataSourceSerializer(item);
  });
}

export function perfCounterDataSourceArrayDeserializer(
  result: Array<PerfCounterDataSource>,
): any[] {
  return result.map((item) => {
    return perfCounterDataSourceDeserializer(item);
  });
}

/**
 * Definition of which performance counters will be collected and how they will be collected by this data collection rule.
 * Collected from both Windows and Linux machines where the counter is present.
 */
export interface PerfCounterDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: KnownPerfCounterDataSourceStreams[];
  /** The number of seconds between consecutive counter measurements (samples). */
  samplingFrequencyInSeconds?: number;
  /**
   * A list of specifier names of the performance counters you want to collect.
   * Use a wildcard (*) to collect a counter for all instances.
   * To get a list of performance counters on Windows, run the command 'typeperf'.
   */
  counterSpecifiers?: string[];
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function perfCounterDataSourceSerializer(item: PerfCounterDataSource): any {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    samplingFrequencyInSeconds: item["samplingFrequencyInSeconds"],
    counterSpecifiers: !item["counterSpecifiers"]
      ? item["counterSpecifiers"]
      : item["counterSpecifiers"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function perfCounterDataSourceDeserializer(item: any): PerfCounterDataSource {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    samplingFrequencyInSeconds: item["samplingFrequencyInSeconds"],
    counterSpecifiers: !item["counterSpecifiers"]
      ? item["counterSpecifiers"]
      : item["counterSpecifiers"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

/** Known values of {@link KnownPerfCounterDataSourceStreams} that the service accepts. */
export enum KnownKnownPerfCounterDataSourceStreams {
  /** Microsoft-Perf */
  MicrosoftPerf = "Microsoft-Perf",
  /** Microsoft-InsightsMetrics */
  MicrosoftInsightsMetrics = "Microsoft-InsightsMetrics",
}

/** Type of KnownPerfCounterDataSourceStreams */
export type KnownPerfCounterDataSourceStreams = string;

export function performanceCountersOTelDataSourceArraySerializer(
  result: Array<PerformanceCountersOTelDataSource>,
): any[] {
  return result.map((item) => {
    return performanceCountersOTelDataSourceSerializer(item);
  });
}

export function performanceCountersOTelDataSourceArrayDeserializer(
  result: Array<PerformanceCountersOTelDataSource>,
): any[] {
  return result.map((item) => {
    return performanceCountersOTelDataSourceDeserializer(item);
  });
}

/**
 * Definition of which Open Telemetry performance counters will be collected and how they will be collected by this data collection rule.
 * Collected from both Windows and Linux machines where the counter is present.
 */
export interface PerformanceCountersOTelDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: KnownPerformanceCountersOTelDataSourceStreams[];
  /** The number of seconds between consecutive counter measurements (samples). */
  samplingFrequencyInSeconds?: number;
  /** A list of specifier names of the performance counters you want to collect. */
  counterSpecifiers?: string[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function performanceCountersOTelDataSourceSerializer(
  item: PerformanceCountersOTelDataSource,
): any {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    samplingFrequencyInSeconds: item["samplingFrequencyInSeconds"],
    counterSpecifiers: !item["counterSpecifiers"]
      ? item["counterSpecifiers"]
      : item["counterSpecifiers"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

export function performanceCountersOTelDataSourceDeserializer(
  item: any,
): PerformanceCountersOTelDataSource {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    samplingFrequencyInSeconds: item["samplingFrequencyInSeconds"],
    counterSpecifiers: !item["counterSpecifiers"]
      ? item["counterSpecifiers"]
      : item["counterSpecifiers"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

/** Known values of {@link KnownPerformanceCountersOTelDataSourceStreams} that the service accepts. */
export enum KnownKnownPerformanceCountersOTelDataSourceStreams {
  /** Microsoft-OtelPerfMetrics */
  MicrosoftOtelPerfMetrics = "Microsoft-OtelPerfMetrics",
}

/** Type of KnownPerformanceCountersOTelDataSourceStreams */
export type KnownPerformanceCountersOTelDataSourceStreams = string;

export function windowsEventLogDataSourceArraySerializer(
  result: Array<WindowsEventLogDataSource>,
): any[] {
  return result.map((item) => {
    return windowsEventLogDataSourceSerializer(item);
  });
}

export function windowsEventLogDataSourceArrayDeserializer(
  result: Array<WindowsEventLogDataSource>,
): any[] {
  return result.map((item) => {
    return windowsEventLogDataSourceDeserializer(item);
  });
}

/**
 * Definition of which Windows Event Log events will be collected and how they will be collected.
 * Only collected from Windows machines.
 */
export interface WindowsEventLogDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: KnownWindowsEventLogDataSourceStreams[];
  /** A list of Windows Event Log queries in XPATH format. */
  xPathQueries?: string[];
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function windowsEventLogDataSourceSerializer(item: WindowsEventLogDataSource): any {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    xPathQueries: !item["xPathQueries"]
      ? item["xPathQueries"]
      : item["xPathQueries"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function windowsEventLogDataSourceDeserializer(item: any): WindowsEventLogDataSource {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    xPathQueries: !item["xPathQueries"]
      ? item["xPathQueries"]
      : item["xPathQueries"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

/** Known values of {@link KnownWindowsEventLogDataSourceStreams} that the service accepts. */
export enum KnownKnownWindowsEventLogDataSourceStreams {
  /** Microsoft-WindowsEvent */
  MicrosoftWindowsEvent = "Microsoft-WindowsEvent",
  /** Microsoft-Event */
  MicrosoftEvent = "Microsoft-Event",
}

/** Type of KnownWindowsEventLogDataSourceStreams */
export type KnownWindowsEventLogDataSourceStreams = string;

export function syslogDataSourceArraySerializer(result: Array<SyslogDataSource>): any[] {
  return result.map((item) => {
    return syslogDataSourceSerializer(item);
  });
}

export function syslogDataSourceArrayDeserializer(result: Array<SyslogDataSource>): any[] {
  return result.map((item) => {
    return syslogDataSourceDeserializer(item);
  });
}

/**
 * Definition of which syslog data will be collected and how it will be collected.
 * Only collected from Linux machines.
 */
export interface SyslogDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: KnownSyslogDataSourceStreams[];
  /** The list of facility names. */
  facilityNames?: KnownSyslogDataSourceFacilityNames[];
  /** The log levels to collect. */
  logLevels?: KnownSyslogDataSourceLogLevels[];
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function syslogDataSourceSerializer(item: SyslogDataSource): any {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    facilityNames: !item["facilityNames"]
      ? item["facilityNames"]
      : item["facilityNames"].map((p: any) => {
          return p;
        }),
    logLevels: !item["logLevels"]
      ? item["logLevels"]
      : item["logLevels"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function syslogDataSourceDeserializer(item: any): SyslogDataSource {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    facilityNames: !item["facilityNames"]
      ? item["facilityNames"]
      : item["facilityNames"].map((p: any) => {
          return p;
        }),
    logLevels: !item["logLevels"]
      ? item["logLevels"]
      : item["logLevels"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

/** Known values of {@link KnownSyslogDataSourceStreams} that the service accepts. */
export enum KnownKnownSyslogDataSourceStreams {
  /** Microsoft-Syslog */
  MicrosoftSyslog = "Microsoft-Syslog",
}

/** Type of KnownSyslogDataSourceStreams */
export type KnownSyslogDataSourceStreams = string;

/** Known values of {@link KnownSyslogDataSourceFacilityNames} that the service accepts. */
export enum KnownKnownSyslogDataSourceFacilityNames {
  /** * */
  Asterisk = "*",
  /** alert */
  Alert = "alert",
  /** audit */
  Audit = "audit",
  /** auth */
  Auth = "auth",
  /** authpriv */
  Authpriv = "authpriv",
  /** clock */
  Clock = "clock",
  /** cron */
  Cron = "cron",
  /** daemon */
  Daemon = "daemon",
  /** ftp */
  Ftp = "ftp",
  /** kern */
  Kern = "kern",
  /** local0 */
  Local0 = "local0",
  /** local1 */
  Local1 = "local1",
  /** local2 */
  Local2 = "local2",
  /** local3 */
  Local3 = "local3",
  /** local4 */
  Local4 = "local4",
  /** local5 */
  Local5 = "local5",
  /** local6 */
  Local6 = "local6",
  /** local7 */
  Local7 = "local7",
  /** lpr */
  Lpr = "lpr",
  /** mail */
  Mail = "mail",
  /** mark */
  Mark = "mark",
  /** news */
  News = "news",
  /** nopri */
  Nopri = "nopri",
  /** ntp */
  Ntp = "ntp",
  /** syslog */
  Syslog = "syslog",
  /** user */
  User = "user",
  /** uucp */
  Uucp = "uucp",
}

/** Type of KnownSyslogDataSourceFacilityNames */
export type KnownSyslogDataSourceFacilityNames = string;

/** Known values of {@link KnownSyslogDataSourceLogLevels} that the service accepts. */
export enum KnownKnownSyslogDataSourceLogLevels {
  /** Debug */
  Debug = "Debug",
  /** Info */
  Info = "Info",
  /** Notice */
  Notice = "Notice",
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
  /** Critical */
  Critical = "Critical",
  /** Alert */
  Alert = "Alert",
  /** Emergency */
  Emergency = "Emergency",
  /** * */
  Asterisk = "*",
}

/** Type of KnownSyslogDataSourceLogLevels */
export type KnownSyslogDataSourceLogLevels = string;

export function extensionDataSourceArraySerializer(result: Array<ExtensionDataSource>): any[] {
  return result.map((item) => {
    return extensionDataSourceSerializer(item);
  });
}

export function extensionDataSourceArrayDeserializer(result: Array<ExtensionDataSource>): any[] {
  return result.map((item) => {
    return extensionDataSourceDeserializer(item);
  });
}

/**
 * Definition of which data will be collected from a separate VM extension that integrates with the Azure Monitor Agent.
 * Collected from either Windows and Linux machines, depending on which extension is defined.
 */
export interface ExtensionDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: KnownExtensionDataSourceStreams[];
  /** The name of the VM extension. */
  extensionName: string;
  /** The extension settings. The format is specific for particular extension. */
  extensionSettings?: any;
  /** The list of data sources this extension needs data from. */
  inputDataSources?: string[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function extensionDataSourceSerializer(item: ExtensionDataSource): any {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    extensionName: item["extensionName"],
    extensionSettings: item["extensionSettings"],
    inputDataSources: !item["inputDataSources"]
      ? item["inputDataSources"]
      : item["inputDataSources"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

export function extensionDataSourceDeserializer(item: any): ExtensionDataSource {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    extensionName: item["extensionName"],
    extensionSettings: item["extensionSettings"],
    inputDataSources: !item["inputDataSources"]
      ? item["inputDataSources"]
      : item["inputDataSources"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

/** Known values of {@link KnownExtensionDataSourceStreams} that the service accepts. */
export enum KnownKnownExtensionDataSourceStreams {
  /** Microsoft-Event */
  MicrosoftEvent = "Microsoft-Event",
  /** Microsoft-InsightsMetrics */
  MicrosoftInsightsMetrics = "Microsoft-InsightsMetrics",
  /** Microsoft-Perf */
  MicrosoftPerf = "Microsoft-Perf",
  /** Microsoft-Syslog */
  MicrosoftSyslog = "Microsoft-Syslog",
  /** Microsoft-WindowsEvent */
  MicrosoftWindowsEvent = "Microsoft-WindowsEvent",
}

/** Type of KnownExtensionDataSourceStreams */
export type KnownExtensionDataSourceStreams = string;

export function logFilesDataSourceArraySerializer(result: Array<LogFilesDataSource>): any[] {
  return result.map((item) => {
    return logFilesDataSourceSerializer(item);
  });
}

export function logFilesDataSourceArrayDeserializer(result: Array<LogFilesDataSource>): any[] {
  return result.map((item) => {
    return logFilesDataSourceDeserializer(item);
  });
}

/** Definition of which custom log files will be collected by this data collection rule */
export interface LogFilesDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data source
   */
  streams: string[];
  /** File Patterns where the log files are located */
  filePatterns: string[];
  /** The data format of the log files */
  format: KnownLogFilesDataSourceFormat;
  /** The log files specific settings. */
  settings?: LogFilesDataSourceSettings;
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function logFilesDataSourceSerializer(item: LogFilesDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    filePatterns: item["filePatterns"].map((p: any) => {
      return p;
    }),
    format: item["format"],
    settings: !item["settings"]
      ? item["settings"]
      : logFilesDataSourceSettingsSerializer(item["settings"]),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function logFilesDataSourceDeserializer(item: any): LogFilesDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    filePatterns: item["filePatterns"].map((p: any) => {
      return p;
    }),
    format: item["format"],
    settings: !item["settings"]
      ? item["settings"]
      : logFilesDataSourceSettingsDeserializer(item["settings"]),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

/** The data format of the log files */
export enum KnownKnownLogFilesDataSourceFormat {
  /** json */
  Json = "json",
  /** text */
  Text = "text",
}

/**
 * The data format of the log files \
 * {@link KnownKnownLogFilesDataSourceFormat} can be used interchangeably with KnownLogFilesDataSourceFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **json**: json \
 * **text**: text
 */
export type KnownLogFilesDataSourceFormat = string;

/** The log files specific settings. */
export interface LogFilesDataSourceSettings extends LogFileSettings {}

export function logFilesDataSourceSettingsSerializer(item: LogFilesDataSourceSettings): any {
  return { text: !item["text"] ? item["text"] : logFileSettingsTextSerializer(item["text"]) };
}

export function logFilesDataSourceSettingsDeserializer(item: any): LogFilesDataSourceSettings {
  return {
    text: !item["text"] ? item["text"] : logFileSettingsTextDeserializer(item["text"]),
  };
}

export function iisLogsDataSourceArraySerializer(result: Array<IisLogsDataSource>): any[] {
  return result.map((item) => {
    return iisLogsDataSourceSerializer(item);
  });
}

export function iisLogsDataSourceArrayDeserializer(result: Array<IisLogsDataSource>): any[] {
  return result.map((item) => {
    return iisLogsDataSourceDeserializer(item);
  });
}

/** Enables IIS logs to be collected by this data collection rule. */
export interface IisLogsDataSource {
  /** IIS streams */
  streams: string[];
  /** Absolute paths file location */
  logDirectories?: string[];
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function iisLogsDataSourceSerializer(item: IisLogsDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    logDirectories: !item["logDirectories"]
      ? item["logDirectories"]
      : item["logDirectories"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function iisLogsDataSourceDeserializer(item: any): IisLogsDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    logDirectories: !item["logDirectories"]
      ? item["logDirectories"]
      : item["logDirectories"].map((p: any) => {
          return p;
        }),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function windowsFirewallLogsDataSourceArraySerializer(
  result: Array<WindowsFirewallLogsDataSource>,
): any[] {
  return result.map((item) => {
    return windowsFirewallLogsDataSourceSerializer(item);
  });
}

export function windowsFirewallLogsDataSourceArrayDeserializer(
  result: Array<WindowsFirewallLogsDataSource>,
): any[] {
  return result.map((item) => {
    return windowsFirewallLogsDataSourceDeserializer(item);
  });
}

/** Enables Firewall logs to be collected by this data collection rule. */
export interface WindowsFirewallLogsDataSource {
  /** Firewall logs streams */
  streams: string[];
  /** Firewall logs profile filter */
  profileFilter?: KnownWindowsFirewallLogsDataSourceProfileFilter[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function windowsFirewallLogsDataSourceSerializer(item: WindowsFirewallLogsDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    profileFilter: !item["profileFilter"]
      ? item["profileFilter"]
      : item["profileFilter"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

export function windowsFirewallLogsDataSourceDeserializer(
  item: any,
): WindowsFirewallLogsDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    profileFilter: !item["profileFilter"]
      ? item["profileFilter"]
      : item["profileFilter"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

/** Known values of {@link KnownWindowsFirewallLogsDataSourceProfileFilter} that the service accepts. */
export enum KnownKnownWindowsFirewallLogsDataSourceProfileFilter {
  /** Domain */
  Domain = "Domain",
  /** Private */
  Private = "Private",
  /** Public */
  Public = "Public",
}

/** Type of KnownWindowsFirewallLogsDataSourceProfileFilter */
export type KnownWindowsFirewallLogsDataSourceProfileFilter = string;

export function prometheusForwarderDataSourceArraySerializer(
  result: Array<PrometheusForwarderDataSource>,
): any[] {
  return result.map((item) => {
    return prometheusForwarderDataSourceSerializer(item);
  });
}

export function prometheusForwarderDataSourceArrayDeserializer(
  result: Array<PrometheusForwarderDataSource>,
): any[] {
  return result.map((item) => {
    return prometheusForwarderDataSourceDeserializer(item);
  });
}

/** Definition of Prometheus metrics forwarding configuration. */
export interface PrometheusForwarderDataSource {
  /** List of streams that this data source will be sent to. */
  streams?: KnownPrometheusForwarderDataSourceStreams[];
  /**
   * The list of label inclusion filters in the form of label "name-value" pairs.
   * Currently only one label is supported: 'microsoft_metrics_include_label'.
   * Label values are matched case-insensitively.
   */
  labelIncludeFilter?: Record<string, string>;
  /** Custom VM Scrape Config that defines scrape jobs */
  customVMScrapeConfig?: any[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function prometheusForwarderDataSourceSerializer(item: PrometheusForwarderDataSource): any {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    labelIncludeFilter: item["labelIncludeFilter"],
    customVMScrapeConfig: !item["customVMScrapeConfig"]
      ? item["customVMScrapeConfig"]
      : item["customVMScrapeConfig"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

export function prometheusForwarderDataSourceDeserializer(
  item: any,
): PrometheusForwarderDataSource {
  return {
    streams: !item["streams"]
      ? item["streams"]
      : item["streams"].map((p: any) => {
          return p;
        }),
    labelIncludeFilter: !item["labelIncludeFilter"]
      ? item["labelIncludeFilter"]
      : Object.fromEntries(
          Object.entries(item["labelIncludeFilter"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    customVMScrapeConfig: !item["customVMScrapeConfig"]
      ? item["customVMScrapeConfig"]
      : item["customVMScrapeConfig"].map((p: any) => {
          return p;
        }),
    name: item["name"],
  };
}

/** Known values of {@link KnownPrometheusForwarderDataSourceStreams} that the service accepts. */
export enum KnownKnownPrometheusForwarderDataSourceStreams {
  /** Microsoft-PrometheusMetrics */
  MicrosoftPrometheusMetrics = "Microsoft-PrometheusMetrics",
}

/** Type of KnownPrometheusForwarderDataSourceStreams */
export type KnownPrometheusForwarderDataSourceStreams = string;

export function platformTelemetryDataSourceArraySerializer(
  result: Array<PlatformTelemetryDataSource>,
): any[] {
  return result.map((item) => {
    return platformTelemetryDataSourceSerializer(item);
  });
}

export function platformTelemetryDataSourceArrayDeserializer(
  result: Array<PlatformTelemetryDataSource>,
): any[] {
  return result.map((item) => {
    return platformTelemetryDataSourceDeserializer(item);
  });
}

/** Definition of platform telemetry data source configuration */
export interface PlatformTelemetryDataSource {
  /** List of platform telemetry streams to collect */
  streams: string[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function platformTelemetryDataSourceSerializer(item: PlatformTelemetryDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    name: item["name"],
  };
}

export function platformTelemetryDataSourceDeserializer(item: any): PlatformTelemetryDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    name: item["name"],
  };
}

/** Specifications of pull based data sources */
export interface DataSourcesSpecDataImports extends DataImportSources {}

export function dataSourcesSpecDataImportsSerializer(item: DataSourcesSpecDataImports): any {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : dataImportSourcesEventHubSerializer(item["eventHub"]),
  };
}

export function dataSourcesSpecDataImportsDeserializer(item: any): DataSourcesSpecDataImports {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : dataImportSourcesEventHubDeserializer(item["eventHub"]),
  };
}

export function otelLogsDataSourceArraySerializer(result: Array<OtelLogsDataSource>): any[] {
  return result.map((item) => {
    return otelLogsDataSourceSerializer(item);
  });
}

export function otelLogsDataSourceArrayDeserializer(result: Array<OtelLogsDataSource>): any[] {
  return result.map((item) => {
    return otelLogsDataSourceDeserializer(item);
  });
}

/** Enables Otel logs to be collected by this data collection rule. */
export interface OtelLogsDataSource {
  /** List of streams that this data source will be sent to. */
  streams: KnownOtelLogsDataSourceStreams[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: OtelLogsDataSourceResourceAttributeRouting;
  /** Specifies the list of resource attributes that need to be added as labels/dimensions to the telemetry data for further enrichment. */
  enrichWithResourceAttributes?: string[];
  /** Specifies the reference alias to enrich the telemetry signal with. */
  enrichWithReference?: string;
  /** Specifies whether to replace the default resourceId in the log record with the resourceId of the referenced resource being used for enrichment. */
  replaceResourceIdWithReference?: boolean;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function otelLogsDataSourceSerializer(item: OtelLogsDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : otelLogsDataSourceResourceAttributeRoutingSerializer(item["resourceAttributeRouting"]),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    replaceResourceIdWithReference: item["replaceResourceIdWithReference"],
    name: item["name"],
  };
}

export function otelLogsDataSourceDeserializer(item: any): OtelLogsDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : otelLogsDataSourceResourceAttributeRoutingDeserializer(item["resourceAttributeRouting"]),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    replaceResourceIdWithReference: item["replaceResourceIdWithReference"],
    name: item["name"],
  };
}

/** Known values of {@link KnownOtelLogsDataSourceStreams} that the service accepts. */
export enum KnownKnownOtelLogsDataSourceStreams {
  /** Microsoft-OTel-Logs */
  MicrosoftOTelLogs = "Microsoft-OTel-Logs",
}

/** Type of KnownOtelLogsDataSourceStreams */
export type KnownOtelLogsDataSourceStreams = string;

/** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
export interface OtelLogsDataSourceResourceAttributeRouting extends OtelDataSourceResourceAttributeRouting {}

export function otelLogsDataSourceResourceAttributeRoutingSerializer(
  item: OtelLogsDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function otelLogsDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): OtelLogsDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function otelTracesDataSourceArraySerializer(result: Array<OtelTracesDataSource>): any[] {
  return result.map((item) => {
    return otelTracesDataSourceSerializer(item);
  });
}

export function otelTracesDataSourceArrayDeserializer(result: Array<OtelTracesDataSource>): any[] {
  return result.map((item) => {
    return otelTracesDataSourceDeserializer(item);
  });
}

/** Enables Otel Traces to be collected by this data collection rule. */
export interface OtelTracesDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams: KnownOtelTracesDataSourceStreams[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: OtelTracesDataSourceResourceAttributeRouting;
  /** Specifies the list of resource attributes that need to be added as labels/dimensions to the telemetry data for further enrichment. */
  enrichWithResourceAttributes?: string[];
  /** Specifies the reference to enrich the telemetry signal with. */
  enrichWithReference?: string;
  /** Specifies whether to replace the default resourceId in the log record with the resourceId of the referenced resource being used for enrichment. */
  replaceResourceIdWithReference?: boolean;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function otelTracesDataSourceSerializer(item: OtelTracesDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : otelTracesDataSourceResourceAttributeRoutingSerializer(item["resourceAttributeRouting"]),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    replaceResourceIdWithReference: item["replaceResourceIdWithReference"],
    name: item["name"],
  };
}

export function otelTracesDataSourceDeserializer(item: any): OtelTracesDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : otelTracesDataSourceResourceAttributeRoutingDeserializer(item["resourceAttributeRouting"]),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    replaceResourceIdWithReference: item["replaceResourceIdWithReference"],
    name: item["name"],
  };
}

/** Known values of {@link KnownOtelTracesDataSourceStreams} that the service accepts. */
export enum KnownKnownOtelTracesDataSourceStreams {
  /** Microsoft-OTel-Traces-Spans */
  MicrosoftOTelTracesSpans = "Microsoft-OTel-Traces-Spans",
  /** Microsoft-OTel-Traces-Events */
  MicrosoftOTelTracesEvents = "Microsoft-OTel-Traces-Events",
  /** Microsoft-OTel-Traces-Resources */
  MicrosoftOTelTracesResources = "Microsoft-OTel-Traces-Resources",
}

/** Type of KnownOtelTracesDataSourceStreams */
export type KnownOtelTracesDataSourceStreams = string;

/** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
export interface OtelTracesDataSourceResourceAttributeRouting extends OtelDataSourceResourceAttributeRouting {}

export function otelTracesDataSourceResourceAttributeRoutingSerializer(
  item: OtelTracesDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function otelTracesDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): OtelTracesDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function otelMetricsDataSourceArraySerializer(result: Array<OtelMetricsDataSource>): any[] {
  return result.map((item) => {
    return otelMetricsDataSourceSerializer(item);
  });
}

export function otelMetricsDataSourceArrayDeserializer(
  result: Array<OtelMetricsDataSource>,
): any[] {
  return result.map((item) => {
    return otelMetricsDataSourceDeserializer(item);
  });
}

/** Definition of OTel metrics configuration. */
export interface OtelMetricsDataSource {
  /** List of streams that this data source will be sent to. */
  streams: string[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: OtelMetricsDataSourceResourceAttributeRouting;
  /** Specifies the list of resource attributes that need to be added as labels/dimensions to the telemetry data for further enrichment. */
  enrichWithResourceAttributes?: string[];
  /** Specifies the reference to enrich the telemetry signal with. */
  enrichWithReference?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function otelMetricsDataSourceSerializer(item: OtelMetricsDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : otelMetricsDataSourceResourceAttributeRoutingSerializer(item["resourceAttributeRouting"]),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    name: item["name"],
  };
}

export function otelMetricsDataSourceDeserializer(item: any): OtelMetricsDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : otelMetricsDataSourceResourceAttributeRoutingDeserializer(item["resourceAttributeRouting"]),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    name: item["name"],
  };
}

/** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
export interface OtelMetricsDataSourceResourceAttributeRouting extends OtelDataSourceResourceAttributeRouting {}

export function otelMetricsDataSourceResourceAttributeRoutingSerializer(
  item: OtelMetricsDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function otelMetricsDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): OtelMetricsDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function etwProviderDataSourceArraySerializer(result: Array<EtwProviderDataSource>): any[] {
  return result.map((item) => {
    return etwProviderDataSourceSerializer(item);
  });
}

export function etwProviderDataSourceArrayDeserializer(
  result: Array<EtwProviderDataSource>,
): any[] {
  return result.map((item) => {
    return etwProviderDataSourceDeserializer(item);
  });
}

/** Enables an ETW provider logs to be collected by this data collection rule. */
export interface EtwProviderDataSource {
  /** List of streams that this data source will be sent to */
  streams: string[];
  /** The provider GUID or class name for event source */
  provider: string;
  /** Provider type specification: By Manifest GUID or by Event Source name */
  providerType: KnownEtwProviderType;
  /** Minimal level of detail to be logged */
  logLevel?: KnownEtwProviderDataSourceLogLevel;
  /** Events Ids to collect */
  eventIds?: string[];
  /** Event's membership in a set of event categories */
  keyword?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function etwProviderDataSourceSerializer(item: EtwProviderDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    provider: item["provider"],
    providerType: item["providerType"],
    logLevel: item["logLevel"],
    eventIds: !item["eventIds"]
      ? item["eventIds"]
      : item["eventIds"].map((p: any) => {
          return p;
        }),
    keyword: item["keyword"],
    name: item["name"],
  };
}

export function etwProviderDataSourceDeserializer(item: any): EtwProviderDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    provider: item["provider"],
    providerType: item["providerType"],
    logLevel: item["logLevel"],
    eventIds: !item["eventIds"]
      ? item["eventIds"]
      : item["eventIds"].map((p: any) => {
          return p;
        }),
    keyword: item["keyword"],
    name: item["name"],
  };
}

/** Provider type specification: By Manifest GUID or by Event Source name */
export enum KnownKnownEtwProviderType {
  /** EventSource */
  EventSource = "EventSource",
  /** Manifest */
  Manifest = "Manifest",
}

/**
 * Provider type specification: By Manifest GUID or by Event Source name \
 * {@link KnownKnownEtwProviderType} can be used interchangeably with KnownEtwProviderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EventSource**: EventSource \
 * **Manifest**: Manifest
 */
export type KnownEtwProviderType = string;

/** Minimal level of detail to be logged */
export enum KnownKnownEtwProviderDataSourceLogLevel {
  /** Critical */
  Critical = "Critical",
  /** Error */
  Error = "Error",
  /** Warning */
  Warning = "Warning",
  /** Informational */
  Informational = "Informational",
  /** Verbose */
  Verbose = "Verbose",
}

/**
 * Minimal level of detail to be logged \
 * {@link KnownKnownEtwProviderDataSourceLogLevel} can be used interchangeably with KnownEtwProviderDataSourceLogLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Critical \
 * **Error**: Error \
 * **Warning**: Warning \
 * **Informational**: Informational \
 * **Verbose**: Verbose
 */
export type KnownEtwProviderDataSourceLogLevel = string;

/** Settings for different log file formats */
export interface LogFileSettings {
  /** Text settings */
  text?: LogFileSettingsText;
}

export function logFileSettingsSerializer(item: LogFileSettings): any {
  return { text: !item["text"] ? item["text"] : logFileSettingsTextSerializer(item["text"]) };
}

export function logFileSettingsDeserializer(item: any): LogFileSettings {
  return {
    text: !item["text"] ? item["text"] : logFileSettingsTextDeserializer(item["text"]),
  };
}

/** Text settings */
export interface LogFileSettingsText extends LogFileTextSettings {}

export function logFileSettingsTextSerializer(item: LogFileSettingsText): any {
  return { recordStartTimestampFormat: item["recordStartTimestampFormat"] };
}

export function logFileSettingsTextDeserializer(item: any): LogFileSettingsText {
  return {
    recordStartTimestampFormat: item["recordStartTimestampFormat"],
  };
}

/** Settings for text log files */
export interface LogFileTextSettings {
  /** One of the supported timestamp formats */
  recordStartTimestampFormat: KnownLogFileTextSettingsRecordStartTimestampFormat;
}

export function logFileTextSettingsSerializer(item: LogFileTextSettings): any {
  return { recordStartTimestampFormat: item["recordStartTimestampFormat"] };
}

export function logFileTextSettingsDeserializer(item: any): LogFileTextSettings {
  return {
    recordStartTimestampFormat: item["recordStartTimestampFormat"],
  };
}

/** One of the supported timestamp formats */
export enum KnownKnownLogFileTextSettingsRecordStartTimestampFormat {
  /** ISO 8601 */
  ISO8601 = "ISO 8601",
  /** YYYY-MM-DD HH:MM:SS */
  YyyyMMDDHHMMSS = "YYYY-MM-DD HH:MM:SS",
  /** M/D/YYYY HH:MM:SS AM/PM */
  MDYyyyHHMMSSAMPM = "M/D/YYYY HH:MM:SS AM/PM",
  /** Mon DD, YYYY HH:MM:SS */
  MonDDYyyyHHMMSS = "Mon DD, YYYY HH:MM:SS",
  /** yyMMdd HH:mm:ss */
  YyMMddHHMmSs = "yyMMdd HH:mm:ss",
  /** ddMMyy HH:mm:ss */
  DdMMyyHHMmSs = "ddMMyy HH:mm:ss",
  /** MMM d hh:mm:ss */
  MMMDHhMmSs = "MMM d hh:mm:ss",
  /** dd/MMM/yyyy:HH:mm:ss zzz */
  DdMMMYyyyHHMmSsZzz = "dd/MMM/yyyy:HH:mm:ss zzz",
  /** yyyy-MM-ddTHH:mm:ssK */
  YyyyMMDdTHHMmSsK = "yyyy-MM-ddTHH:mm:ssK",
}

/**
 * One of the supported timestamp formats \
 * {@link KnownKnownLogFileTextSettingsRecordStartTimestampFormat} can be used interchangeably with KnownLogFileTextSettingsRecordStartTimestampFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ISO 8601**: ISO 8601 \
 * **YYYY-MM-DD HH:MM:SS**: YYYY-MM-DD HH:MM:SS \
 * **M\/D\/YYYY HH:MM:SS AM\/PM**: M\/D\/YYYY HH:MM:SS AM\/PM \
 * **Mon DD, YYYY HH:MM:SS**: Mon DD, YYYY HH:MM:SS \
 * **yyMMdd HH:mm:ss**: yyMMdd HH:mm:ss \
 * **ddMMyy HH:mm:ss**: ddMMyy HH:mm:ss \
 * **MMM d hh:mm:ss**: MMM d hh:mm:ss \
 * **dd\/MMM\/yyyy:HH:mm:ss zzz**: dd\/MMM\/yyyy:HH:mm:ss zzz \
 * **yyyy-MM-ddTHH:mm:ssK**: yyyy-MM-ddTHH:mm:ssK
 */
export type KnownLogFileTextSettingsRecordStartTimestampFormat = string;

/** model interface DataImportSources */
export interface DataImportSources {
  /** Definition of Event Hub configuration. */
  eventHub?: DataImportSourcesEventHub;
}

export function dataImportSourcesSerializer(item: DataImportSources): any {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : dataImportSourcesEventHubSerializer(item["eventHub"]),
  };
}

export function dataImportSourcesDeserializer(item: any): DataImportSources {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : dataImportSourcesEventHubDeserializer(item["eventHub"]),
  };
}

/** Definition of Event Hub configuration. */
export interface DataImportSourcesEventHub extends EventHubDataSource {}

export function dataImportSourcesEventHubSerializer(item: DataImportSourcesEventHub): any {
  return { name: item["name"], consumerGroup: item["consumerGroup"], stream: item["stream"] };
}

export function dataImportSourcesEventHubDeserializer(item: any): DataImportSourcesEventHub {
  return {
    name: item["name"],
    consumerGroup: item["consumerGroup"],
    stream: item["stream"],
  };
}

/** model interface EventHubDataSource */
export interface EventHubDataSource {
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
  /** Event Hub consumer group name */
  consumerGroup?: string;
  /** The stream to collect from EventHub */
  stream?: string;
}

export function eventHubDataSourceSerializer(item: EventHubDataSource): any {
  return { name: item["name"], consumerGroup: item["consumerGroup"], stream: item["stream"] };
}

export function eventHubDataSourceDeserializer(item: any): EventHubDataSource {
  return {
    name: item["name"],
    consumerGroup: item["consumerGroup"],
    stream: item["stream"],
  };
}

/** Enables OTLP (logs, traces, and metrics) payload routing */
export interface OtelDataSourceResourceAttributeRouting {
  /** The name of the resource attribute to match. */
  attributeName?: string;
  /** The value of the resource attribute to match. */
  attributeValue?: string;
}

export function otelDataSourceResourceAttributeRoutingSerializer(
  item: OtelDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function otelDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): OtelDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

/** Specification of direct data sources that will be collected. */
export interface DirectDataSourcesSpec {
  /** The list of OTel metrics data source configurations. */
  otelMetrics?: OtelMetricsDirectDataSource[];
  /** The list of OTel logs data source configurations. */
  otelLogs?: OtelLogsDirectDataSource[];
  /** The list of OTel traces data source configurations. */
  otelTraces?: OtelTracesDirectDataSource[];
}

export function directDataSourcesSpecSerializer(item: DirectDataSourcesSpec): any {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : otelMetricsDirectDataSourceArraySerializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : otelLogsDirectDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : otelTracesDirectDataSourceArraySerializer(item["otelTraces"]),
  };
}

export function directDataSourcesSpecDeserializer(item: any): DirectDataSourcesSpec {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : otelMetricsDirectDataSourceArrayDeserializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : otelLogsDirectDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : otelTracesDirectDataSourceArrayDeserializer(item["otelTraces"]),
  };
}

export function otelMetricsDirectDataSourceArraySerializer(
  result: Array<OtelMetricsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return otelMetricsDirectDataSourceSerializer(item);
  });
}

export function otelMetricsDirectDataSourceArrayDeserializer(
  result: Array<OtelMetricsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return otelMetricsDirectDataSourceDeserializer(item);
  });
}

/** Definition of OTel metrics configuration. */
export interface OtelMetricsDirectDataSource {
  /** List of streams that this data source will be sent to. */
  streams: string[];
  /** Specifies the list of resource attributes that need to be added as labels/dimensions to the telemetry data for further enrichment. */
  enrichWithResourceAttributes?: string[];
  /** Specifies the reference to enrich the telemetry signal with. */
  enrichWithReference?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function otelMetricsDirectDataSourceSerializer(item: OtelMetricsDirectDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    name: item["name"],
  };
}

export function otelMetricsDirectDataSourceDeserializer(item: any): OtelMetricsDirectDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    name: item["name"],
  };
}

export function otelLogsDirectDataSourceArraySerializer(
  result: Array<OtelLogsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return otelLogsDirectDataSourceSerializer(item);
  });
}

export function otelLogsDirectDataSourceArrayDeserializer(
  result: Array<OtelLogsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return otelLogsDirectDataSourceDeserializer(item);
  });
}

/** model interface OtelLogsDirectDataSource */
export interface OtelLogsDirectDataSource {
  /** List of streams that this data source will be sent to. */
  streams: KnownOtelLogsDirectDataSourceStreams[];
  /** Specifies the list of resource attributes that need to be added as labels/dimensions to the telemetry data for further enrichment. */
  enrichWithResourceAttributes?: string[];
  /** Specifies the reference to enrich the telemetry signal with. */
  enrichWithReference?: string;
  /** Specifies whether to replace the default resourceId in the log record with the resourceId of the referenced resource being used for enrichment. */
  replaceResourceIdWithReference?: boolean;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function otelLogsDirectDataSourceSerializer(item: OtelLogsDirectDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    replaceResourceIdWithReference: item["replaceResourceIdWithReference"],
    name: item["name"],
  };
}

export function otelLogsDirectDataSourceDeserializer(item: any): OtelLogsDirectDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    replaceResourceIdWithReference: item["replaceResourceIdWithReference"],
    name: item["name"],
  };
}

/** Known values of {@link KnownOtelLogsDirectDataSourceStreams} that the service accepts. */
export enum KnownKnownOtelLogsDirectDataSourceStreams {
  /** Microsoft-OTel-Logs */
  MicrosoftOTelLogs = "Microsoft-OTel-Logs",
}

/** Type of KnownOtelLogsDirectDataSourceStreams */
export type KnownOtelLogsDirectDataSourceStreams = string;

export function otelTracesDirectDataSourceArraySerializer(
  result: Array<OtelTracesDirectDataSource>,
): any[] {
  return result.map((item) => {
    return otelTracesDirectDataSourceSerializer(item);
  });
}

export function otelTracesDirectDataSourceArrayDeserializer(
  result: Array<OtelTracesDirectDataSource>,
): any[] {
  return result.map((item) => {
    return otelTracesDirectDataSourceDeserializer(item);
  });
}

/** Enables Otel Traces to be collected by this data collection rule. */
export interface OtelTracesDirectDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams: KnownOtelTracesDirectDataSourceStreams[];
  /** Specifies the list of resource attributes that need to be added as labels/dimensions to the telemetry data for further enrichment. */
  enrichWithResourceAttributes?: string[];
  /** Specifies the reference to enrich the telemetry signal with. */
  enrichWithReference?: string;
  /** Specifies whether to replace the default resourceId in the log record with the resourceId of the referenced resource being used for enrichment. */
  replaceResourceIdWithReference?: boolean;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function otelTracesDirectDataSourceSerializer(item: OtelTracesDirectDataSource): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    replaceResourceIdWithReference: item["replaceResourceIdWithReference"],
    name: item["name"],
  };
}

export function otelTracesDirectDataSourceDeserializer(item: any): OtelTracesDirectDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    replaceResourceIdWithReference: item["replaceResourceIdWithReference"],
    name: item["name"],
  };
}

/** Known values of {@link KnownOtelTracesDirectDataSourceStreams} that the service accepts. */
export enum KnownKnownOtelTracesDirectDataSourceStreams {
  /** Microsoft-OTel-Traces-Spans */
  MicrosoftOTelTracesSpans = "Microsoft-OTel-Traces-Spans",
  /** Microsoft-OTel-Traces-Events */
  MicrosoftOTelTracesEvents = "Microsoft-OTel-Traces-Events",
  /** Microsoft-OTel-Traces-Resources */
  MicrosoftOTelTracesResources = "Microsoft-OTel-Traces-Resources",
}

/** Type of KnownOtelTracesDirectDataSourceStreams */
export type KnownOtelTracesDirectDataSourceStreams = string;

/** Specification of destinations that can be used in data flows. */
export interface DestinationsSpec {
  /** List of Log Analytics destinations. */
  logAnalytics?: LogAnalyticsDestination[];
  /** List of monitoring account destinations. */
  monitoringAccounts?: MonitoringAccountDestination[];
  /** Azure Monitor Metrics destination. */
  azureMonitorMetrics?: DestinationsSpecAzureMonitorMetrics;
  /** List of Event Hubs destinations. */
  eventHubs?: EventHubDestination[];
  /** List of Event Hubs Direct destinations. */
  eventHubsDirect?: EventHubDirectDestination[];
  /** List of Storage Blob Direct destinations. To be used only for sending data directly to store from the agent. */
  storageBlobsDirect?: StorageBlobDestination[];
  /** List of Storage Table Direct destinations. */
  storageTablesDirect?: StorageTableDestination[];
  /** List of storage accounts destinations. */
  storageAccounts?: StorageBlobDestination[];
  /** List of Microsoft Fabric destinations. */
  microsoftFabric?: MicrosoftFabricDestination[];
  /** List of Azure Data Explorer destinations. */
  azureDataExplorer?: AdxDestination[];
}

export function destinationsSpecSerializer(item: DestinationsSpec): any {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : logAnalyticsDestinationArraySerializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : monitoringAccountDestinationArraySerializer(item["monitoringAccounts"]),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : destinationsSpecAzureMonitorMetricsSerializer(item["azureMonitorMetrics"]),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : eventHubDestinationArraySerializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : eventHubDirectDestinationArraySerializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : storageBlobDestinationArraySerializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : storageTableDestinationArraySerializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : storageBlobDestinationArraySerializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : microsoftFabricDestinationArraySerializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : adxDestinationArraySerializer(item["azureDataExplorer"]),
  };
}

export function destinationsSpecDeserializer(item: any): DestinationsSpec {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : logAnalyticsDestinationArrayDeserializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : monitoringAccountDestinationArrayDeserializer(item["monitoringAccounts"]),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : destinationsSpecAzureMonitorMetricsDeserializer(item["azureMonitorMetrics"]),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : eventHubDestinationArrayDeserializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : eventHubDirectDestinationArrayDeserializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : storageBlobDestinationArrayDeserializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : storageTableDestinationArrayDeserializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : storageBlobDestinationArrayDeserializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : microsoftFabricDestinationArrayDeserializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : adxDestinationArrayDeserializer(item["azureDataExplorer"]),
  };
}

export function logAnalyticsDestinationArraySerializer(
  result: Array<LogAnalyticsDestination>,
): any[] {
  return result.map((item) => {
    return logAnalyticsDestinationSerializer(item);
  });
}

export function logAnalyticsDestinationArrayDeserializer(
  result: Array<LogAnalyticsDestination>,
): any[] {
  return result.map((item) => {
    return logAnalyticsDestinationDeserializer(item);
  });
}

/** Log Analytics destination. */
export interface LogAnalyticsDestination {
  /** The resource ID of the Log Analytics workspace. */
  workspaceResourceId?: string;
  /** The Customer ID of the Log Analytics workspace. */
  readonly workspaceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function logAnalyticsDestinationSerializer(item: LogAnalyticsDestination): any {
  return { workspaceResourceId: item["workspaceResourceId"], name: item["name"] };
}

export function logAnalyticsDestinationDeserializer(item: any): LogAnalyticsDestination {
  return {
    workspaceResourceId: item["workspaceResourceId"],
    workspaceId: item["workspaceId"],
    name: item["name"],
  };
}

export function monitoringAccountDestinationArraySerializer(
  result: Array<MonitoringAccountDestination>,
): any[] {
  return result.map((item) => {
    return monitoringAccountDestinationSerializer(item);
  });
}

export function monitoringAccountDestinationArrayDeserializer(
  result: Array<MonitoringAccountDestination>,
): any[] {
  return result.map((item) => {
    return monitoringAccountDestinationDeserializer(item);
  });
}

/** Monitoring account destination. */
export interface MonitoringAccountDestination {
  /** The resource ID of the monitoring account. */
  accountResourceId?: string;
  /** The immutable ID of the account. */
  readonly accountId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function monitoringAccountDestinationSerializer(item: MonitoringAccountDestination): any {
  return { accountResourceId: item["accountResourceId"], name: item["name"] };
}

export function monitoringAccountDestinationDeserializer(item: any): MonitoringAccountDestination {
  return {
    accountResourceId: item["accountResourceId"],
    accountId: item["accountId"],
    name: item["name"],
  };
}

/** Azure Monitor Metrics destination. */
export interface DestinationsSpecAzureMonitorMetrics extends AzureMonitorMetricsDestination {}

export function destinationsSpecAzureMonitorMetricsSerializer(
  item: DestinationsSpecAzureMonitorMetrics,
): any {
  return { name: item["name"] };
}

export function destinationsSpecAzureMonitorMetricsDeserializer(
  item: any,
): DestinationsSpecAzureMonitorMetrics {
  return {
    name: item["name"],
  };
}

export function eventHubDestinationArraySerializer(result: Array<EventHubDestination>): any[] {
  return result.map((item) => {
    return eventHubDestinationSerializer(item);
  });
}

export function eventHubDestinationArrayDeserializer(result: Array<EventHubDestination>): any[] {
  return result.map((item) => {
    return eventHubDestinationDeserializer(item);
  });
}

/** model interface EventHubDestination */
export interface EventHubDestination {
  /** The resource ID of the event hub. */
  eventHubResourceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function eventHubDestinationSerializer(item: EventHubDestination): any {
  return { eventHubResourceId: item["eventHubResourceId"], name: item["name"] };
}

export function eventHubDestinationDeserializer(item: any): EventHubDestination {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    name: item["name"],
  };
}

export function eventHubDirectDestinationArraySerializer(
  result: Array<EventHubDirectDestination>,
): any[] {
  return result.map((item) => {
    return eventHubDirectDestinationSerializer(item);
  });
}

export function eventHubDirectDestinationArrayDeserializer(
  result: Array<EventHubDirectDestination>,
): any[] {
  return result.map((item) => {
    return eventHubDirectDestinationDeserializer(item);
  });
}

/** model interface EventHubDirectDestination */
export interface EventHubDirectDestination {
  /** The resource ID of the event hub. */
  eventHubResourceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function eventHubDirectDestinationSerializer(item: EventHubDirectDestination): any {
  return { eventHubResourceId: item["eventHubResourceId"], name: item["name"] };
}

export function eventHubDirectDestinationDeserializer(item: any): EventHubDirectDestination {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    name: item["name"],
  };
}

export function storageBlobDestinationArraySerializer(
  result: Array<StorageBlobDestination>,
): any[] {
  return result.map((item) => {
    return storageBlobDestinationSerializer(item);
  });
}

export function storageBlobDestinationArrayDeserializer(
  result: Array<StorageBlobDestination>,
): any[] {
  return result.map((item) => {
    return storageBlobDestinationDeserializer(item);
  });
}

/** model interface StorageBlobDestination */
export interface StorageBlobDestination {
  /** The container name of the Storage Blob. */
  containerName?: string;
  /** The resource ID of the storage account. */
  storageAccountResourceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function storageBlobDestinationSerializer(item: StorageBlobDestination): any {
  return {
    containerName: item["containerName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function storageBlobDestinationDeserializer(item: any): StorageBlobDestination {
  return {
    containerName: item["containerName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function storageTableDestinationArraySerializer(
  result: Array<StorageTableDestination>,
): any[] {
  return result.map((item) => {
    return storageTableDestinationSerializer(item);
  });
}

export function storageTableDestinationArrayDeserializer(
  result: Array<StorageTableDestination>,
): any[] {
  return result.map((item) => {
    return storageTableDestinationDeserializer(item);
  });
}

/** model interface StorageTableDestination */
export interface StorageTableDestination {
  /** The name of the Storage Table. */
  tableName?: string;
  /** The resource ID of the storage account. */
  storageAccountResourceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function storageTableDestinationSerializer(item: StorageTableDestination): any {
  return {
    tableName: item["tableName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function storageTableDestinationDeserializer(item: any): StorageTableDestination {
  return {
    tableName: item["tableName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function microsoftFabricDestinationArraySerializer(
  result: Array<MicrosoftFabricDestination>,
): any[] {
  return result.map((item) => {
    return microsoftFabricDestinationSerializer(item);
  });
}

export function microsoftFabricDestinationArrayDeserializer(
  result: Array<MicrosoftFabricDestination>,
): any[] {
  return result.map((item) => {
    return microsoftFabricDestinationDeserializer(item);
  });
}

/** Microsoft Fabric destination (non-Azure). */
export interface MicrosoftFabricDestination {
  /** The tenant id of the Microsoft Fabric resource. */
  tenantId?: string;
  /** The artifact id of the Microsoft Fabric resource. */
  artifactId?: string;
  /** The name of the database to which data will be ingested. */
  databaseName?: string;
  /** The ingestion uri of the Microsoft Fabric resource. */
  ingestionUri?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function microsoftFabricDestinationSerializer(item: MicrosoftFabricDestination): any {
  return {
    tenantId: item["tenantId"],
    artifactId: item["artifactId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

export function microsoftFabricDestinationDeserializer(item: any): MicrosoftFabricDestination {
  return {
    tenantId: item["tenantId"],
    artifactId: item["artifactId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

export function adxDestinationArraySerializer(result: Array<AdxDestination>): any[] {
  return result.map((item) => {
    return adxDestinationSerializer(item);
  });
}

export function adxDestinationArrayDeserializer(result: Array<AdxDestination>): any[] {
  return result.map((item) => {
    return adxDestinationDeserializer(item);
  });
}

/** Azure Data Explorer (Adx) destination. */
export interface AdxDestination {
  /** The ARM resource id of the Adx resource. */
  resourceId?: string;
  /** The name of the database to which data will be ingested. */
  databaseName?: string;
  /** The ingestion uri of the Adx resource. */
  readonly ingestionUri?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function adxDestinationSerializer(item: AdxDestination): any {
  return { resourceId: item["resourceId"], databaseName: item["databaseName"], name: item["name"] };
}

export function adxDestinationDeserializer(item: any): AdxDestination {
  return {
    resourceId: item["resourceId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

/** Azure Monitor Metrics destination. */
export interface AzureMonitorMetricsDestination {
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function azureMonitorMetricsDestinationSerializer(
  item: AzureMonitorMetricsDestination,
): any {
  return { name: item["name"] };
}

export function azureMonitorMetricsDestinationDeserializer(
  item: any,
): AzureMonitorMetricsDestination {
  return {
    name: item["name"],
  };
}

/** model interface IngestionQuotas */
export interface IngestionQuotas {
  logs?: IngestionQuotasLogs;
}

export function ingestionQuotasDeserializer(item: any): IngestionQuotas {
  return {
    logs: !item["logs"] ? item["logs"] : ingestionQuotasLogsDeserializer(item["logs"]),
  };
}

/** model interface IngestionQuotasLogs */
export interface IngestionQuotasLogs extends LogsQuotaSpec {}

export function ingestionQuotasLogsDeserializer(item: any): IngestionQuotasLogs {
  return {
    maxSizePerMinuteInGB: item["maxSizePerMinuteInGB"],
    maxRequestsPerMinute: item["maxRequestsPerMinute"],
  };
}

/** model interface LogsQuotaSpec */
export interface LogsQuotaSpec {
  maxSizePerMinuteInGB?: string;
  maxRequestsPerMinute?: string;
}

export function logsQuotaSpecDeserializer(item: any): LogsQuotaSpec {
  return {
    maxSizePerMinuteInGB: item["maxSizePerMinuteInGB"],
    maxRequestsPerMinute: item["maxRequestsPerMinute"],
  };
}

export function dataCollectionRuleResourceArraySerializer(
  result: Array<DataCollectionRuleResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionRuleResourceSerializer(item);
  });
}

export function dataCollectionRuleResourceArrayDeserializer(
  result: Array<DataCollectionRuleResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionRuleResourceDeserializer(item);
  });
}

export function _dataCollectionEndpointResourcePropertiesSerializer(
  item: DataCollectionEndpointResource,
): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionEndpointConfigurationAccessSerializer(item["configurationAccess"]),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionEndpointMetricsIngestionSerializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function _dataCollectionEndpointResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionEndpointConfigurationAccessDeserializer(item["configurationAccess"]),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionEndpointLogsIngestionDeserializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionEndpointMetricsIngestionDeserializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : privateLinkScopedResourceArrayDeserializer(item["privateLinkScopedResources"]),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : dataCollectionEndpointFailoverConfigurationDeserializer(item["failoverConfiguration"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

export function _dataCollectionRuleAssociationProxyOnlyResourcePropertiesSerializer(
  item: DataCollectionRuleAssociationProxyOnlyResource,
): any {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
  };
}

export function _dataCollectionRuleAssociationProxyOnlyResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    provisioningState: item["provisioningState"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

export function _dataCollectionRuleResourcePropertiesSerializer(
  item: DataCollectionRuleResource,
): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : dataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : streamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionRuleDirectDataSourcesSerializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"] ? item["dataFlows"] : dataFlowArraySerializer(item["dataFlows"]),
  };
}

export function _dataCollectionRuleResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : dataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : dataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : streamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionRuleDirectDataSourcesDeserializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : dataCollectionRuleIngestionQuotasDeserializer(item["ingestionQuotas"]),
    provisioningState: item["provisioningState"],
  };
}
