// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type {
  ArmErrorDetail,
  Sku,
  ManagedServiceIdentity,
  TrackedResource,
  ExtensionResource,
} from "../models.js";
import {
  armErrorDetailDeserializer,
  systemDataDeserializer,
  userAssignedIdentityRecordSerializer,
  userAssignedIdentityRecordDeserializer,
} from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Definition of ARM tracked top level resource. */
export interface DataCollectionApiDataCollectionEndpointResource extends TrackedResource {
  /** The kind of the resource. */
  kind?: DataCollectionApiKnownDataCollectionEndpointResourceKind;
  /** The SKU of the resource. */
  sku?: DataCollectionApiDataCollectionEndpointResourceSku;
  /** Managed service identity of the resource. */
  identity?: DataCollectionApiDataCollectionEndpointResourceIdentity;
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the data collection endpoint. */
  description?: string;
  /** The immutable ID of this data collection endpoint resource. This property is READ-ONLY. */
  immutableId?: string;
  /** The endpoint used by clients to access their configuration. */
  configurationAccess?: DataCollectionApiDataCollectionEndpointConfigurationAccess;
  /** The endpoint used by clients to ingest logs. */
  logsIngestion?: DataCollectionApiDataCollectionEndpointLogsIngestion;
  /** The endpoint used by clients to ingest metrics. */
  metricsIngestion?: DataCollectionApiDataCollectionEndpointMetricsIngestion;
  /** Network access control rules for the endpoints. */
  networkAcls?: DataCollectionApiDataCollectionEndpointNetworkAcls;
  /** The resource provisioning state. This property is READ-ONLY. */
  readonly provisioningState?: DataCollectionApiKnownDataCollectionEndpointProvisioningState;
  /** List of Azure Monitor Private Link Scope Resources to which this data collection endpoint resource is associated. This property is READ-ONLY. */
  readonly privateLinkScopedResources?: DataCollectionApiPrivateLinkScopedResource[];
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly failoverConfiguration?: DataCollectionApiDataCollectionEndpointFailoverConfiguration;
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly metadata?: DataCollectionApiDataCollectionEndpointMetadata;
}

export function dataCollectionApiDataCollectionEndpointResourceSerializer(
  item: DataCollectionApiDataCollectionEndpointResource,
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
    sku: !item["sku"]
      ? item["sku"]
      : dataCollectionApiDataCollectionEndpointResourceSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionApiDataCollectionEndpointResourceIdentitySerializer(item["identity"]),
  };
}

export function dataCollectionApiDataCollectionEndpointResourceDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointResource {
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
    sku: !item["sku"]
      ? item["sku"]
      : dataCollectionApiDataCollectionEndpointResourceSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionApiDataCollectionEndpointResourceIdentityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** model interface DataCollectionApiDataCollectionEndpointResourceProperties */
export interface DataCollectionApiDataCollectionEndpointResourceProperties extends DataCollectionApiDataCollectionEndpoint {}

export function dataCollectionApiDataCollectionEndpointResourcePropertiesSerializer(
  item: DataCollectionApiDataCollectionEndpointResourceProperties,
): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionApiDataCollectionEndpointConfigurationAccessSerializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionApiDataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionApiDataCollectionEndpointMetricsIngestionSerializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionApiDataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function dataCollectionApiDataCollectionEndpointResourcePropertiesDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointResourceProperties {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionApiDataCollectionEndpointConfigurationAccessDeserializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionApiDataCollectionEndpointLogsIngestionDeserializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionApiDataCollectionEndpointMetricsIngestionDeserializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionApiDataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : dataCollectionApiPrivateLinkScopedResourceArrayDeserializer(
          item["privateLinkScopedResources"],
        ),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : dataCollectionApiDataCollectionEndpointFailoverConfigurationDeserializer(
          item["failoverConfiguration"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionApiDataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

/** The kind of the resource. */
export enum KnownDataCollectionApiKnownDataCollectionEndpointResourceKind {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * The kind of the resource. \
 * {@link KnownDataCollectionApiKnownDataCollectionEndpointResourceKind} can be used interchangeably with DataCollectionApiKnownDataCollectionEndpointResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux**: Linux \
 * **Windows**: Windows
 */
export type DataCollectionApiKnownDataCollectionEndpointResourceKind = string;

/** The SKU of the resource. */
export interface DataCollectionApiDataCollectionEndpointResourceSku extends Sku {}

export function dataCollectionApiDataCollectionEndpointResourceSkuSerializer(
  item: DataCollectionApiDataCollectionEndpointResourceSku,
): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function dataCollectionApiDataCollectionEndpointResourceSkuDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointResourceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Managed service identity of the resource. */
export interface DataCollectionApiDataCollectionEndpointResourceIdentity extends ManagedServiceIdentity {}

export function dataCollectionApiDataCollectionEndpointResourceIdentitySerializer(
  item: DataCollectionApiDataCollectionEndpointResourceIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function dataCollectionApiDataCollectionEndpointResourceIdentityDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointResourceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Definition of data collection endpoint. */
export interface DataCollectionApiDataCollectionEndpoint {
  /** Description of the data collection endpoint. */
  description?: string;
  /** The immutable ID of this data collection endpoint resource. This property is READ-ONLY. */
  immutableId?: string;
  /** The endpoint used by clients to access their configuration. */
  configurationAccess?: DataCollectionApiDataCollectionEndpointConfigurationAccess;
  /** The endpoint used by clients to ingest logs. */
  logsIngestion?: DataCollectionApiDataCollectionEndpointLogsIngestion;
  /** The endpoint used by clients to ingest metrics. */
  metricsIngestion?: DataCollectionApiDataCollectionEndpointMetricsIngestion;
  /** Network access control rules for the endpoints. */
  networkAcls?: DataCollectionApiDataCollectionEndpointNetworkAcls;
  /** The resource provisioning state. This property is READ-ONLY. */
  readonly provisioningState?: DataCollectionApiKnownDataCollectionEndpointProvisioningState;
  /** List of Azure Monitor Private Link Scope Resources to which this data collection endpoint resource is associated. This property is READ-ONLY. */
  readonly privateLinkScopedResources?: DataCollectionApiPrivateLinkScopedResource[];
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly failoverConfiguration?: DataCollectionApiDataCollectionEndpointFailoverConfiguration;
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly metadata?: DataCollectionApiDataCollectionEndpointMetadata;
}

export function dataCollectionApiDataCollectionEndpointSerializer(
  item: DataCollectionApiDataCollectionEndpoint,
): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionApiDataCollectionEndpointConfigurationAccessSerializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionApiDataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionApiDataCollectionEndpointMetricsIngestionSerializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionApiDataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function dataCollectionApiDataCollectionEndpointDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpoint {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionApiDataCollectionEndpointConfigurationAccessDeserializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionApiDataCollectionEndpointLogsIngestionDeserializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionApiDataCollectionEndpointMetricsIngestionDeserializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionApiDataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : dataCollectionApiPrivateLinkScopedResourceArrayDeserializer(
          item["privateLinkScopedResources"],
        ),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : dataCollectionApiDataCollectionEndpointFailoverConfigurationDeserializer(
          item["failoverConfiguration"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionApiDataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

/** The endpoint used by clients to access their configuration. */
export interface DataCollectionApiDataCollectionEndpointConfigurationAccess extends DataCollectionApiConfigurationAccessEndpointSpec {}

export function dataCollectionApiDataCollectionEndpointConfigurationAccessSerializer(
  _item: DataCollectionApiDataCollectionEndpointConfigurationAccess,
): any {
  return {};
}

export function dataCollectionApiDataCollectionEndpointConfigurationAccessDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointConfigurationAccess {
  return {
    endpoint: item["endpoint"],
  };
}

/** The endpoint used by clients to ingest logs. */
export interface DataCollectionApiDataCollectionEndpointLogsIngestion extends DataCollectionApiLogsIngestionEndpointSpec {}

export function dataCollectionApiDataCollectionEndpointLogsIngestionSerializer(
  _item: DataCollectionApiDataCollectionEndpointLogsIngestion,
): any {
  return {};
}

export function dataCollectionApiDataCollectionEndpointLogsIngestionDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointLogsIngestion {
  return {
    endpoint: item["endpoint"],
  };
}

/** The endpoint used by clients to ingest metrics. */
export interface DataCollectionApiDataCollectionEndpointMetricsIngestion extends DataCollectionApiMetricsIngestionEndpointSpec {}

export function dataCollectionApiDataCollectionEndpointMetricsIngestionSerializer(
  _item: DataCollectionApiDataCollectionEndpointMetricsIngestion,
): any {
  return {};
}

export function dataCollectionApiDataCollectionEndpointMetricsIngestionDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointMetricsIngestion {
  return {
    endpoint: item["endpoint"],
  };
}

/** Network access control rules for the endpoints. */
export interface DataCollectionApiDataCollectionEndpointNetworkAcls extends DataCollectionApiNetworkRuleSet {}

export function dataCollectionApiDataCollectionEndpointNetworkAclsSerializer(
  item: DataCollectionApiDataCollectionEndpointNetworkAcls,
): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function dataCollectionApiDataCollectionEndpointNetworkAclsDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointNetworkAcls {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The resource provisioning state. This property is READ-ONLY. */
export enum KnownDataCollectionApiKnownDataCollectionEndpointProvisioningState {
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
 * {@link KnownDataCollectionApiKnownDataCollectionEndpointProvisioningState} can be used interchangeably with DataCollectionApiKnownDataCollectionEndpointProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type DataCollectionApiKnownDataCollectionEndpointProvisioningState = string;

export function dataCollectionApiPrivateLinkScopedResourceArrayDeserializer(
  result: Array<DataCollectionApiPrivateLinkScopedResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPrivateLinkScopedResourceDeserializer(item);
  });
}

/** model interface DataCollectionApiPrivateLinkScopedResource */
export interface DataCollectionApiPrivateLinkScopedResource {
  /** The resourceId of the Azure Monitor Private Link Scope Scoped Resource through which this DCE is associated with a Azure Monitor Private Link Scope. */
  resourceId?: string;
  /** The immutableId of the Azure Monitor Private Link Scope Resource to which the association is. */
  scopeId?: string;
}

export function dataCollectionApiPrivateLinkScopedResourceDeserializer(
  item: any,
): DataCollectionApiPrivateLinkScopedResource {
  return {
    resourceId: item["resourceId"],
    scopeId: item["scopeId"],
  };
}

/** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
export interface DataCollectionApiDataCollectionEndpointFailoverConfiguration extends DataCollectionApiFailoverConfigurationSpec {}

export function dataCollectionApiDataCollectionEndpointFailoverConfigurationDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointFailoverConfiguration {
  return {
    activeLocation: item["activeLocation"],
    locations: !item["locations"]
      ? item["locations"]
      : dataCollectionApiLocationSpecArrayDeserializer(item["locations"]),
  };
}

/** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
export interface DataCollectionApiDataCollectionEndpointMetadata extends DataCollectionApiMetadata {}

export function dataCollectionApiDataCollectionEndpointMetadataDeserializer(
  item: any,
): DataCollectionApiDataCollectionEndpointMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Definition of the endpoint used for accessing configuration. */
export interface DataCollectionApiConfigurationAccessEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function dataCollectionApiConfigurationAccessEndpointSpecSerializer(
  _item: DataCollectionApiConfigurationAccessEndpointSpec,
): any {
  return {};
}

export function dataCollectionApiConfigurationAccessEndpointSpecDeserializer(
  item: any,
): DataCollectionApiConfigurationAccessEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the endpoint used for ingesting logs. */
export interface DataCollectionApiLogsIngestionEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function dataCollectionApiLogsIngestionEndpointSpecSerializer(
  _item: DataCollectionApiLogsIngestionEndpointSpec,
): any {
  return {};
}

export function dataCollectionApiLogsIngestionEndpointSpecDeserializer(
  item: any,
): DataCollectionApiLogsIngestionEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the endpoint used for ingesting metrics. */
export interface DataCollectionApiMetricsIngestionEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function dataCollectionApiMetricsIngestionEndpointSpecSerializer(
  _item: DataCollectionApiMetricsIngestionEndpointSpec,
): any {
  return {};
}

export function dataCollectionApiMetricsIngestionEndpointSpecDeserializer(
  item: any,
): DataCollectionApiMetricsIngestionEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the network rules. */
export interface DataCollectionApiNetworkRuleSet {
  /** The configuration to set whether network access from public internet to the endpoints are allowed. */
  publicNetworkAccess?: DataCollectionApiKnownPublicNetworkAccessOptions;
}

export function dataCollectionApiNetworkRuleSetSerializer(
  item: DataCollectionApiNetworkRuleSet,
): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function dataCollectionApiNetworkRuleSetDeserializer(
  item: any,
): DataCollectionApiNetworkRuleSet {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The configuration to set whether network access from public internet to the endpoints are allowed. */
export enum KnownDataCollectionApiKnownPublicNetworkAccessOptions {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * The configuration to set whether network access from public internet to the endpoints are allowed. \
 * {@link KnownDataCollectionApiKnownPublicNetworkAccessOptions} can be used interchangeably with DataCollectionApiKnownPublicNetworkAccessOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **SecuredByPerimeter**: SecuredByPerimeter
 */
export type DataCollectionApiKnownPublicNetworkAccessOptions = string;

/** model interface DataCollectionApiFailoverConfigurationSpec */
export interface DataCollectionApiFailoverConfigurationSpec {
  /** Active location where data flow will occur. */
  activeLocation?: string;
  /** Locations that are configured for failover. */
  locations?: DataCollectionApiLocationSpec[];
}

export function dataCollectionApiFailoverConfigurationSpecDeserializer(
  item: any,
): DataCollectionApiFailoverConfigurationSpec {
  return {
    activeLocation: item["activeLocation"],
    locations: !item["locations"]
      ? item["locations"]
      : dataCollectionApiLocationSpecArrayDeserializer(item["locations"]),
  };
}

export function dataCollectionApiLocationSpecArrayDeserializer(
  result: Array<DataCollectionApiLocationSpec>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiLocationSpecDeserializer(item);
  });
}

/** model interface DataCollectionApiLocationSpec */
export interface DataCollectionApiLocationSpec {
  /** Name of location. */
  location?: string;
  /** The resource provisioning state in this location. */
  provisioningStatus?: DataCollectionApiKnownLocationSpecProvisioningStatus;
}

export function dataCollectionApiLocationSpecDeserializer(
  item: any,
): DataCollectionApiLocationSpec {
  return {
    location: item["location"],
    provisioningStatus: item["provisioningStatus"],
  };
}

/** The resource provisioning state in this location. */
export enum KnownDataCollectionApiKnownLocationSpecProvisioningStatus {
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
 * {@link KnownDataCollectionApiKnownLocationSpecProvisioningStatus} can be used interchangeably with DataCollectionApiKnownLocationSpecProvisioningStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type DataCollectionApiKnownLocationSpecProvisioningStatus = string;

/** Metadata about the resource */
export interface DataCollectionApiMetadata {
  /** Azure offering managing this resource on-behalf-of customer. */
  readonly provisionedBy?: string;
  /** Resource Id of azure offering managing this resource on-behalf-of customer. */
  readonly provisionedByResourceId?: string;
  /** Immutable Id of azure offering managing this resource on-behalf-of customer. */
  readonly provisionedByImmutableId?: string;
}

export function dataCollectionApiMetadataDeserializer(item: any): DataCollectionApiMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface DataCollectionApiErrorResponseCommonV2 {
  /** The error object. */
  error?: ArmErrorDetail;
}

export function dataCollectionApiErrorResponseCommonV2Deserializer(
  item: any,
): DataCollectionApiErrorResponseCommonV2 {
  return {
    error: !item["error"] ? item["error"] : armErrorDetailDeserializer(item["error"]),
  };
}

/** Definition of ARM tracked top level resource properties for update operation. */
export interface DataCollectionApiResourceForUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed Service Identity. */
  identity?: DataCollectionApiResourceForUpdateIdentity;
}

export function dataCollectionApiResourceForUpdateSerializer(
  item: DataCollectionApiResourceForUpdate,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionApiResourceForUpdateIdentitySerializer(item["identity"]),
  };
}

/** Managed Service Identity. */
export interface DataCollectionApiResourceForUpdateIdentity extends ManagedServiceIdentity {}

export function dataCollectionApiResourceForUpdateIdentitySerializer(
  item: DataCollectionApiResourceForUpdateIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function dataCollectionApiDataCollectionEndpointResourceArraySerializer(
  result: Array<DataCollectionApiDataCollectionEndpointResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiDataCollectionEndpointResourceSerializer(item);
  });
}

export function dataCollectionApiDataCollectionEndpointResourceArrayDeserializer(
  result: Array<DataCollectionApiDataCollectionEndpointResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiDataCollectionEndpointResourceDeserializer(item);
  });
}

export function dataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceArraySerializer(
  result: Array<DataCollectionApiDataCollectionRuleAssociationProxyOnlyResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceSerializer(item);
  });
}

export function dataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceArrayDeserializer(
  result: Array<DataCollectionApiDataCollectionRuleAssociationProxyOnlyResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceDeserializer(item);
  });
}

/** Definition of generic ARM proxy resource. */
export interface DataCollectionApiDataCollectionRuleAssociationProxyOnlyResource extends ExtensionResource {
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the association. */
  description?: string;
  /** The resource ID of the data collection rule that is to be associated. */
  dataCollectionRuleId?: string;
  /** The resource ID of the data collection endpoint that is to be associated. */
  dataCollectionEndpointId?: string;
  /** The resource provisioning state. */
  readonly provisioningState?: DataCollectionApiKnownDataCollectionRuleAssociationProvisioningState;
  /** Metadata about the resource */
  readonly metadata?: DataCollectionApiDataCollectionRuleAssociationMetadata;
}

export function dataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceSerializer(
  item: DataCollectionApiDataCollectionRuleAssociationProxyOnlyResource,
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

export function dataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleAssociationProxyOnlyResource {
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

/** model interface DataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceProperties */
export interface DataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceProperties extends DataCollectionApiDataCollectionRuleAssociation {}

export function dataCollectionApiDataCollectionRuleAssociationProxyOnlyResourcePropertiesSerializer(
  item: DataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceProperties,
): any {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
  };
}

export function dataCollectionApiDataCollectionRuleAssociationProxyOnlyResourcePropertiesDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleAssociationProxyOnlyResourceProperties {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    provisioningState: item["provisioningState"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionApiDataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

/** Definition of association of a data collection rule with a monitored Azure resource. */
export interface DataCollectionApiDataCollectionRuleAssociation {
  /** Description of the association. */
  description?: string;
  /** The resource ID of the data collection rule that is to be associated. */
  dataCollectionRuleId?: string;
  /** The resource ID of the data collection endpoint that is to be associated. */
  dataCollectionEndpointId?: string;
  /** The resource provisioning state. */
  readonly provisioningState?: DataCollectionApiKnownDataCollectionRuleAssociationProvisioningState;
  /** Metadata about the resource */
  readonly metadata?: DataCollectionApiDataCollectionRuleAssociationMetadata;
}

export function dataCollectionApiDataCollectionRuleAssociationSerializer(
  item: DataCollectionApiDataCollectionRuleAssociation,
): any {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
  };
}

export function dataCollectionApiDataCollectionRuleAssociationDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleAssociation {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    provisioningState: item["provisioningState"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionApiDataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

/** The resource provisioning state. */
export enum KnownDataCollectionApiKnownDataCollectionRuleAssociationProvisioningState {
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
 * {@link KnownDataCollectionApiKnownDataCollectionRuleAssociationProvisioningState} can be used interchangeably with DataCollectionApiKnownDataCollectionRuleAssociationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type DataCollectionApiKnownDataCollectionRuleAssociationProvisioningState = string;

/** Metadata about the resource */
export interface DataCollectionApiDataCollectionRuleAssociationMetadata extends DataCollectionApiMetadata {}

export function dataCollectionApiDataCollectionRuleAssociationMetadataDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleAssociationMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Definition of ARM tracked top level resource. */
export interface DataCollectionApiDataCollectionRuleResource extends TrackedResource {
  /** The kind of the resource. */
  kind?: DataCollectionApiKnownDataCollectionRuleResourceKind;
  /** The SKU of the resource. */
  sku?: DataCollectionApiDataCollectionRuleResourceSku;
  /** Managed service identity of the resource. */
  identity?: DataCollectionApiDataCollectionRuleResourceIdentity;
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the data collection rule. */
  description?: string;
  /** The immutable ID of this data collection rule. This property is READ-ONLY. */
  readonly immutableId?: string;
  /** The resource ID of the data collection endpoint that this rule can be used with. */
  dataCollectionEndpointId?: string;
  /** Metadata about the resource */
  readonly metadata?: DataCollectionApiDataCollectionRuleMetadata;
  /** Defines the ingestion endpoints to send data to via this rule. */
  readonly endpoints?: DataCollectionApiDataCollectionRuleEndpoints;
  /** Defines all the references that may be used in other sections of the DCR */
  references?: DataCollectionApiDataCollectionRuleReferences;
  /** Agent settings used to modify agent behavior on a given host */
  agentSettings?: DataCollectionApiDataCollectionRuleAgentSettings;
  /** Declaration of custom streams used in this rule. */
  streamDeclarations?: Record<string, DataCollectionApiStreamDeclaration>;
  /**
   * The specification of data sources.
   * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
   */
  dataSources?: DataCollectionApiDataCollectionRuleDataSources;
  /**
   * The specification of direct data sources.
   * This property is optional and can be omitted.
   */
  directDataSources?: DataCollectionApiDataCollectionRuleDirectDataSources;
  /** The specification of destinations. */
  destinations?: DataCollectionApiDataCollectionRuleDestinations;
  /** The specification of data flows. */
  dataFlows?: DataCollectionApiDataFlow[];
  /** The specification for ingestion limits */
  readonly ingestionQuotas?: DataCollectionApiDataCollectionRuleIngestionQuotas;
  /** The resource provisioning state. */
  readonly provisioningState?: DataCollectionApiKnownDataCollectionRuleProvisioningState;
}

export function dataCollectionApiDataCollectionRuleResourceSerializer(
  item: DataCollectionApiDataCollectionRuleResource,
): any {
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
    sku: !item["sku"]
      ? item["sku"]
      : dataCollectionApiDataCollectionRuleResourceSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionApiDataCollectionRuleResourceIdentitySerializer(item["identity"]),
  };
}

export function dataCollectionApiDataCollectionRuleResourceDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleResource {
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
    sku: !item["sku"]
      ? item["sku"]
      : dataCollectionApiDataCollectionRuleResourceSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : dataCollectionApiDataCollectionRuleResourceIdentityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** model interface DataCollectionApiDataCollectionRuleResourceProperties */
export interface DataCollectionApiDataCollectionRuleResourceProperties extends DataCollectionApiDataCollectionRule {}

export function dataCollectionApiDataCollectionRuleResourcePropertiesSerializer(
  item: DataCollectionApiDataCollectionRuleResourceProperties,
): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : dataCollectionApiDataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionApiDataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : dataCollectionApiStreamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionApiDataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionApiDataCollectionRuleDirectDataSourcesSerializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionApiDataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataCollectionApiDataFlowArraySerializer(item["dataFlows"]),
  };
}

export function dataCollectionApiDataCollectionRuleResourcePropertiesDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleResourceProperties {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionApiDataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : dataCollectionApiDataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : dataCollectionApiDataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionApiDataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : dataCollectionApiStreamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionApiDataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionApiDataCollectionRuleDirectDataSourcesDeserializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionApiDataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataCollectionApiDataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : dataCollectionApiDataCollectionRuleIngestionQuotasDeserializer(item["ingestionQuotas"]),
    provisioningState: item["provisioningState"],
  };
}

/** The kind of the resource. */
export enum KnownDataCollectionApiKnownDataCollectionRuleResourceKind {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * The kind of the resource. \
 * {@link KnownDataCollectionApiKnownDataCollectionRuleResourceKind} can be used interchangeably with DataCollectionApiKnownDataCollectionRuleResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux**: Linux \
 * **Windows**: Windows
 */
export type DataCollectionApiKnownDataCollectionRuleResourceKind = string;

/** The SKU of the resource. */
export interface DataCollectionApiDataCollectionRuleResourceSku extends Sku {}

export function dataCollectionApiDataCollectionRuleResourceSkuSerializer(
  item: DataCollectionApiDataCollectionRuleResourceSku,
): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function dataCollectionApiDataCollectionRuleResourceSkuDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleResourceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Managed service identity of the resource. */
export interface DataCollectionApiDataCollectionRuleResourceIdentity extends ManagedServiceIdentity {}

export function dataCollectionApiDataCollectionRuleResourceIdentitySerializer(
  item: DataCollectionApiDataCollectionRuleResourceIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function dataCollectionApiDataCollectionRuleResourceIdentityDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleResourceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Definition of what monitoring data to collect and where that data should be sent. */
export interface DataCollectionApiDataCollectionRule {
  /** Description of the data collection rule. */
  description?: string;
  /** The immutable ID of this data collection rule. This property is READ-ONLY. */
  readonly immutableId?: string;
  /** The resource ID of the data collection endpoint that this rule can be used with. */
  dataCollectionEndpointId?: string;
  /** Metadata about the resource */
  readonly metadata?: DataCollectionApiDataCollectionRuleMetadata;
  /** Defines the ingestion endpoints to send data to via this rule. */
  readonly endpoints?: DataCollectionApiDataCollectionRuleEndpoints;
  /** Defines all the references that may be used in other sections of the DCR */
  references?: DataCollectionApiDataCollectionRuleReferences;
  /** Agent settings used to modify agent behavior on a given host */
  agentSettings?: DataCollectionApiDataCollectionRuleAgentSettings;
  /** Declaration of custom streams used in this rule. */
  streamDeclarations?: Record<string, DataCollectionApiStreamDeclaration>;
  /**
   * The specification of data sources.
   * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
   */
  dataSources?: DataCollectionApiDataCollectionRuleDataSources;
  /**
   * The specification of direct data sources.
   * This property is optional and can be omitted.
   */
  directDataSources?: DataCollectionApiDataCollectionRuleDirectDataSources;
  /** The specification of destinations. */
  destinations?: DataCollectionApiDataCollectionRuleDestinations;
  /** The specification of data flows. */
  dataFlows?: DataCollectionApiDataFlow[];
  /** The specification for ingestion limits */
  readonly ingestionQuotas?: DataCollectionApiDataCollectionRuleIngestionQuotas;
  /** The resource provisioning state. */
  readonly provisioningState?: DataCollectionApiKnownDataCollectionRuleProvisioningState;
}

export function dataCollectionApiDataCollectionRuleSerializer(
  item: DataCollectionApiDataCollectionRule,
): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : dataCollectionApiDataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionApiDataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : dataCollectionApiStreamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionApiDataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionApiDataCollectionRuleDirectDataSourcesSerializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionApiDataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataCollectionApiDataFlowArraySerializer(item["dataFlows"]),
  };
}

export function dataCollectionApiDataCollectionRuleDeserializer(
  item: any,
): DataCollectionApiDataCollectionRule {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionApiDataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : dataCollectionApiDataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : dataCollectionApiDataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionApiDataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : dataCollectionApiStreamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionApiDataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionApiDataCollectionRuleDirectDataSourcesDeserializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionApiDataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataCollectionApiDataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : dataCollectionApiDataCollectionRuleIngestionQuotasDeserializer(item["ingestionQuotas"]),
    provisioningState: item["provisioningState"],
  };
}

/** Metadata about the resource */
export interface DataCollectionApiDataCollectionRuleMetadata extends DataCollectionApiMetadata {}

export function dataCollectionApiDataCollectionRuleMetadataDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Defines the ingestion endpoints to send data to via this rule. */
export interface DataCollectionApiDataCollectionRuleEndpoints extends DataCollectionApiEndpointsSpec {}

export function dataCollectionApiDataCollectionRuleEndpointsDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleEndpoints {
  return {
    logsIngestion: item["logsIngestion"],
    metricsIngestion: item["metricsIngestion"],
  };
}

/** Defines all the references that may be used in other sections of the DCR */
export interface DataCollectionApiDataCollectionRuleReferences extends DataCollectionApiReferencesSpec {}

export function dataCollectionApiDataCollectionRuleReferencesSerializer(
  item: DataCollectionApiDataCollectionRuleReferences,
): any {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : dataCollectionApiReferencesSpecEnrichmentDataSerializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : dataCollectionApiApplicationInsightsArraySerializer(item["applicationInsights"]),
  };
}

export function dataCollectionApiDataCollectionRuleReferencesDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleReferences {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : dataCollectionApiReferencesSpecEnrichmentDataDeserializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : dataCollectionApiApplicationInsightsArrayDeserializer(item["applicationInsights"]),
  };
}

/** Agent settings used to modify agent behavior on a given host */
export interface DataCollectionApiDataCollectionRuleAgentSettings extends DataCollectionApiAgentSettingsSpec {}

export function dataCollectionApiDataCollectionRuleAgentSettingsSerializer(
  item: DataCollectionApiDataCollectionRuleAgentSettings,
): any {
  return {
    logs: !item["logs"] ? item["logs"] : dataCollectionApiAgentSettingArraySerializer(item["logs"]),
  };
}

export function dataCollectionApiDataCollectionRuleAgentSettingsDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleAgentSettings {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : dataCollectionApiAgentSettingArrayDeserializer(item["logs"]),
  };
}

export function dataCollectionApiStreamDeclarationRecordSerializer(
  item: Record<string, DataCollectionApiStreamDeclaration>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : dataCollectionApiStreamDeclarationSerializer(item[key]);
  });
  return result;
}

export function dataCollectionApiStreamDeclarationRecordDeserializer(
  item: Record<string, any>,
): Record<string, DataCollectionApiStreamDeclaration> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : dataCollectionApiStreamDeclarationDeserializer(item[key]);
  });
  return result;
}

/** Declaration of a custom stream. */
export interface DataCollectionApiStreamDeclaration {
  /** List of columns used by data in this stream. */
  columns?: DataCollectionApiColumnDefinition[];
}

export function dataCollectionApiStreamDeclarationSerializer(
  item: DataCollectionApiStreamDeclaration,
): any {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : dataCollectionApiColumnDefinitionArraySerializer(item["columns"]),
  };
}

export function dataCollectionApiStreamDeclarationDeserializer(
  item: any,
): DataCollectionApiStreamDeclaration {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : dataCollectionApiColumnDefinitionArrayDeserializer(item["columns"]),
  };
}

export function dataCollectionApiColumnDefinitionArraySerializer(
  result: Array<DataCollectionApiColumnDefinition>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiColumnDefinitionSerializer(item);
  });
}

export function dataCollectionApiColumnDefinitionArrayDeserializer(
  result: Array<DataCollectionApiColumnDefinition>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiColumnDefinitionDeserializer(item);
  });
}

/** Definition of custom data column. */
export interface DataCollectionApiColumnDefinition {
  /** The name of the column. */
  name?: string;
  /** The type of the column data. */
  type?: DataCollectionApiKnownColumnDefinitionType;
}

export function dataCollectionApiColumnDefinitionSerializer(
  item: DataCollectionApiColumnDefinition,
): any {
  return { name: item["name"], type: item["type"] };
}

export function dataCollectionApiColumnDefinitionDeserializer(
  item: any,
): DataCollectionApiColumnDefinition {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of the column data. */
export enum KnownDataCollectionApiKnownColumnDefinitionType {
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
 * {@link KnownDataCollectionApiKnownColumnDefinitionType} can be used interchangeably with DataCollectionApiKnownColumnDefinitionType,
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
export type DataCollectionApiKnownColumnDefinitionType = string;

/**
 * The specification of data sources.
 * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
 */
export interface DataCollectionApiDataCollectionRuleDataSources extends DataCollectionApiDataSourcesSpec {}

export function dataCollectionApiDataCollectionRuleDataSourcesSerializer(
  item: DataCollectionApiDataCollectionRuleDataSources,
): any {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : dataCollectionApiPerfCounterDataSourceArraySerializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : dataCollectionApiPerformanceCountersOTelDataSourceArraySerializer(
          item["performanceCountersOTel"],
        ),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : dataCollectionApiWindowsEventLogDataSourceArraySerializer(item["windowsEventLogs"]),
    syslog: !item["syslog"]
      ? item["syslog"]
      : dataCollectionApiSyslogDataSourceArraySerializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : dataCollectionApiExtensionDataSourceArraySerializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : dataCollectionApiLogFilesDataSourceArraySerializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : dataCollectionApiIisLogsDataSourceArraySerializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : dataCollectionApiWindowsFirewallLogsDataSourceArraySerializer(item["windowsFirewallLogs"]),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : dataCollectionApiPrometheusForwarderDataSourceArraySerializer(item["prometheusForwarder"]),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : dataCollectionApiPlatformTelemetryDataSourceArraySerializer(item["platformTelemetry"]),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : dataCollectionApiDataSourcesSpecDataImportsSerializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : dataCollectionApiOtelLogsDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : dataCollectionApiOtelTracesDataSourceArraySerializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : dataCollectionApiOtelMetricsDataSourceArraySerializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : dataCollectionApiEtwProviderDataSourceArraySerializer(item["etwProviders"]),
  };
}

export function dataCollectionApiDataCollectionRuleDataSourcesDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleDataSources {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : dataCollectionApiPerfCounterDataSourceArrayDeserializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : dataCollectionApiPerformanceCountersOTelDataSourceArrayDeserializer(
          item["performanceCountersOTel"],
        ),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : dataCollectionApiWindowsEventLogDataSourceArrayDeserializer(item["windowsEventLogs"]),
    syslog: !item["syslog"]
      ? item["syslog"]
      : dataCollectionApiSyslogDataSourceArrayDeserializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : dataCollectionApiExtensionDataSourceArrayDeserializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : dataCollectionApiLogFilesDataSourceArrayDeserializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : dataCollectionApiIisLogsDataSourceArrayDeserializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : dataCollectionApiWindowsFirewallLogsDataSourceArrayDeserializer(
          item["windowsFirewallLogs"],
        ),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : dataCollectionApiPrometheusForwarderDataSourceArrayDeserializer(
          item["prometheusForwarder"],
        ),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : dataCollectionApiPlatformTelemetryDataSourceArrayDeserializer(item["platformTelemetry"]),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : dataCollectionApiDataSourcesSpecDataImportsDeserializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : dataCollectionApiOtelLogsDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : dataCollectionApiOtelTracesDataSourceArrayDeserializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : dataCollectionApiOtelMetricsDataSourceArrayDeserializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : dataCollectionApiEtwProviderDataSourceArrayDeserializer(item["etwProviders"]),
  };
}

/**
 * The specification of direct data sources.
 * This property is optional and can be omitted.
 */
export interface DataCollectionApiDataCollectionRuleDirectDataSources extends DataCollectionApiDirectDataSourcesSpec {}

export function dataCollectionApiDataCollectionRuleDirectDataSourcesSerializer(
  item: DataCollectionApiDataCollectionRuleDirectDataSources,
): any {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : dataCollectionApiOtelMetricsDirectDataSourceArraySerializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : dataCollectionApiOtelLogsDirectDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : dataCollectionApiOtelTracesDirectDataSourceArraySerializer(item["otelTraces"]),
  };
}

export function dataCollectionApiDataCollectionRuleDirectDataSourcesDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleDirectDataSources {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : dataCollectionApiOtelMetricsDirectDataSourceArrayDeserializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : dataCollectionApiOtelLogsDirectDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : dataCollectionApiOtelTracesDirectDataSourceArrayDeserializer(item["otelTraces"]),
  };
}

/** The specification of destinations. */
export interface DataCollectionApiDataCollectionRuleDestinations extends DataCollectionApiDestinationsSpec {}

export function dataCollectionApiDataCollectionRuleDestinationsSerializer(
  item: DataCollectionApiDataCollectionRuleDestinations,
): any {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : dataCollectionApiLogAnalyticsDestinationArraySerializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : dataCollectionApiMonitoringAccountDestinationArraySerializer(item["monitoringAccounts"]),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : dataCollectionApiDestinationsSpecAzureMonitorMetricsSerializer(item["azureMonitorMetrics"]),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : dataCollectionApiEventHubDestinationArraySerializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : dataCollectionApiEventHubDirectDestinationArraySerializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : dataCollectionApiStorageBlobDestinationArraySerializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : dataCollectionApiStorageTableDestinationArraySerializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : dataCollectionApiStorageBlobDestinationArraySerializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : dataCollectionApiMicrosoftFabricDestinationArraySerializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : dataCollectionApiAdxDestinationArraySerializer(item["azureDataExplorer"]),
  };
}

export function dataCollectionApiDataCollectionRuleDestinationsDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleDestinations {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : dataCollectionApiLogAnalyticsDestinationArrayDeserializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : dataCollectionApiMonitoringAccountDestinationArrayDeserializer(item["monitoringAccounts"]),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : dataCollectionApiDestinationsSpecAzureMonitorMetricsDeserializer(
          item["azureMonitorMetrics"],
        ),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : dataCollectionApiEventHubDestinationArrayDeserializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : dataCollectionApiEventHubDirectDestinationArrayDeserializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : dataCollectionApiStorageBlobDestinationArrayDeserializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : dataCollectionApiStorageTableDestinationArrayDeserializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : dataCollectionApiStorageBlobDestinationArrayDeserializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : dataCollectionApiMicrosoftFabricDestinationArrayDeserializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : dataCollectionApiAdxDestinationArrayDeserializer(item["azureDataExplorer"]),
  };
}

export function dataCollectionApiDataFlowArraySerializer(
  result: Array<DataCollectionApiDataFlow>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiDataFlowSerializer(item);
  });
}

export function dataCollectionApiDataFlowArrayDeserializer(
  result: Array<DataCollectionApiDataFlow>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiDataFlowDeserializer(item);
  });
}

/** Definition of which streams are sent to which destinations. */
export interface DataCollectionApiDataFlow {
  /** List of streams for this data flow. */
  streams?: DataCollectionApiKnownDataFlowStreams[];
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

export function dataCollectionApiDataFlowSerializer(item: DataCollectionApiDataFlow): any {
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

export function dataCollectionApiDataFlowDeserializer(item: any): DataCollectionApiDataFlow {
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
export enum KnownDataCollectionApiKnownDataFlowStreams {
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

/** Type of DataCollectionApiKnownDataFlowStreams */
export type DataCollectionApiKnownDataFlowStreams = string;

/** The specification for ingestion limits */
export interface DataCollectionApiDataCollectionRuleIngestionQuotas extends DataCollectionApiIngestionQuotas {}

export function dataCollectionApiDataCollectionRuleIngestionQuotasDeserializer(
  item: any,
): DataCollectionApiDataCollectionRuleIngestionQuotas {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : dataCollectionApiIngestionQuotasLogsDeserializer(item["logs"]),
  };
}

/** The resource provisioning state. */
export enum KnownDataCollectionApiKnownDataCollectionRuleProvisioningState {
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
 * {@link KnownDataCollectionApiKnownDataCollectionRuleProvisioningState} can be used interchangeably with DataCollectionApiKnownDataCollectionRuleProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type DataCollectionApiKnownDataCollectionRuleProvisioningState = string;

/** This defines all the ingestion endpoints that can be used by this rule */
export interface DataCollectionApiEndpointsSpec {
  /** The ingestion endpoint for logs */
  readonly logsIngestion?: string;
  /** The ingestion endpoint for metrics */
  readonly metricsIngestion?: string;
}

export function dataCollectionApiEndpointsSpecDeserializer(
  item: any,
): DataCollectionApiEndpointsSpec {
  return {
    logsIngestion: item["logsIngestion"],
    metricsIngestion: item["metricsIngestion"],
  };
}

/** This section defines all the references that may be used in other sections of the DCR */
export interface DataCollectionApiReferencesSpec {
  /** All the enrichment data sources referenced in data flows */
  enrichmentData?: DataCollectionApiReferencesSpecEnrichmentData;
  /** Application Insights references to be used on OTel metrics/logs enrichment */
  applicationInsights?: DataCollectionApiApplicationInsights[];
}

export function dataCollectionApiReferencesSpecSerializer(
  item: DataCollectionApiReferencesSpec,
): any {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : dataCollectionApiReferencesSpecEnrichmentDataSerializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : dataCollectionApiApplicationInsightsArraySerializer(item["applicationInsights"]),
  };
}

export function dataCollectionApiReferencesSpecDeserializer(
  item: any,
): DataCollectionApiReferencesSpec {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : dataCollectionApiReferencesSpecEnrichmentDataDeserializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : dataCollectionApiApplicationInsightsArrayDeserializer(item["applicationInsights"]),
  };
}

/** All the enrichment data sources referenced in data flows */
export interface DataCollectionApiReferencesSpecEnrichmentData extends DataCollectionApiEnrichmentData {}

export function dataCollectionApiReferencesSpecEnrichmentDataSerializer(
  item: DataCollectionApiReferencesSpecEnrichmentData,
): any {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : dataCollectionApiStorageBlobArraySerializer(item["storageBlobs"]),
  };
}

export function dataCollectionApiReferencesSpecEnrichmentDataDeserializer(
  item: any,
): DataCollectionApiReferencesSpecEnrichmentData {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : dataCollectionApiStorageBlobArrayDeserializer(item["storageBlobs"]),
  };
}

export function dataCollectionApiApplicationInsightsArraySerializer(
  result: Array<DataCollectionApiApplicationInsights>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiApplicationInsightsSerializer(item);
  });
}

export function dataCollectionApiApplicationInsightsArrayDeserializer(
  result: Array<DataCollectionApiApplicationInsights>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiApplicationInsightsDeserializer(item);
  });
}

/** model interface DataCollectionApiApplicationInsights */
export interface DataCollectionApiApplicationInsights {
  /** Id of the application insights resource */
  resourceId: string;
  /** The name of the reference used as an alias when referencing this application insights in Otel data sources */
  name: string;
}

export function dataCollectionApiApplicationInsightsSerializer(
  item: DataCollectionApiApplicationInsights,
): any {
  return { resourceId: item["resourceId"], name: item["name"] };
}

export function dataCollectionApiApplicationInsightsDeserializer(
  item: any,
): DataCollectionApiApplicationInsights {
  return {
    resourceId: item["resourceId"],
    name: item["name"],
  };
}

/** All the enrichment data sources referenced in data flows */
export interface DataCollectionApiEnrichmentData {
  /** All the storage blobs used as enrichment data sources */
  storageBlobs?: DataCollectionApiStorageBlob[];
}

export function dataCollectionApiEnrichmentDataSerializer(
  item: DataCollectionApiEnrichmentData,
): any {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : dataCollectionApiStorageBlobArraySerializer(item["storageBlobs"]),
  };
}

export function dataCollectionApiEnrichmentDataDeserializer(
  item: any,
): DataCollectionApiEnrichmentData {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : dataCollectionApiStorageBlobArrayDeserializer(item["storageBlobs"]),
  };
}

export function dataCollectionApiStorageBlobArraySerializer(
  result: Array<DataCollectionApiStorageBlob>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiStorageBlobSerializer(item);
  });
}

export function dataCollectionApiStorageBlobArrayDeserializer(
  result: Array<DataCollectionApiStorageBlob>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiStorageBlobDeserializer(item);
  });
}

/** model interface DataCollectionApiStorageBlob */
export interface DataCollectionApiStorageBlob {
  /** Resource Id of the storage account that hosts the blob */
  resourceId?: string;
  /** Url of the storage blob */
  blobUrl?: string;
  /** The type of lookup to perform on the blob */
  lookupType?: DataCollectionApiKnownStorageBlobLookupType;
  /** The name of the enrichment data source used as an alias when referencing this data source in data flows */
  name?: string;
}

export function dataCollectionApiStorageBlobSerializer(item: DataCollectionApiStorageBlob): any {
  return {
    resourceId: item["resourceId"],
    blobUrl: item["blobUrl"],
    lookupType: item["lookupType"],
    name: item["name"],
  };
}

export function dataCollectionApiStorageBlobDeserializer(item: any): DataCollectionApiStorageBlob {
  return {
    resourceId: item["resourceId"],
    blobUrl: item["blobUrl"],
    lookupType: item["lookupType"],
    name: item["name"],
  };
}

/** The type of lookup to perform on the blob */
export enum KnownDataCollectionApiKnownStorageBlobLookupType {
  /** String */
  String = "String",
  /** Cidr */
  Cidr = "Cidr",
}

/**
 * The type of lookup to perform on the blob \
 * {@link KnownDataCollectionApiKnownStorageBlobLookupType} can be used interchangeably with DataCollectionApiKnownStorageBlobLookupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: String \
 * **Cidr**: Cidr
 */
export type DataCollectionApiKnownStorageBlobLookupType = string;

/** An agent setting */
export interface DataCollectionApiAgentSettingsSpec {
  /** All the settings that are applicable to the logs agent (AMA) */
  logs?: DataCollectionApiAgentSetting[];
}

export function dataCollectionApiAgentSettingsSpecSerializer(
  item: DataCollectionApiAgentSettingsSpec,
): any {
  return {
    logs: !item["logs"] ? item["logs"] : dataCollectionApiAgentSettingArraySerializer(item["logs"]),
  };
}

export function dataCollectionApiAgentSettingsSpecDeserializer(
  item: any,
): DataCollectionApiAgentSettingsSpec {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : dataCollectionApiAgentSettingArrayDeserializer(item["logs"]),
  };
}

export function dataCollectionApiAgentSettingArraySerializer(
  result: Array<DataCollectionApiAgentSetting>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiAgentSettingSerializer(item);
  });
}

export function dataCollectionApiAgentSettingArrayDeserializer(
  result: Array<DataCollectionApiAgentSetting>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiAgentSettingDeserializer(item);
  });
}

/** A setting used to control an agent behavior on a host machine */
export interface DataCollectionApiAgentSetting {
  /**
   * The name of the setting.
   * Must be part of the list of supported settings
   */
  name?: DataCollectionApiKnownAgentSettingName;
  /** The value of the setting */
  value?: string;
}

export function dataCollectionApiAgentSettingSerializer(item: DataCollectionApiAgentSetting): any {
  return { name: item["name"], value: item["value"] };
}

export function dataCollectionApiAgentSettingDeserializer(
  item: any,
): DataCollectionApiAgentSetting {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/**
 * The name of the setting.
 * Must be part of the list of supported settings
 */
export enum KnownDataCollectionApiKnownAgentSettingName {
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
 * {@link KnownDataCollectionApiKnownAgentSettingName} can be used interchangeably with DataCollectionApiKnownAgentSettingName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MaxDiskQuotaInMB**: MaxDiskQuotaInMB \
 * **UseTimeReceivedForForwardedEvents**: UseTimeReceivedForForwardedEvents \
 * **Tags**: Tags
 */
export type DataCollectionApiKnownAgentSettingName = string;

/** Specification of data sources that will be collected. */
export interface DataCollectionApiDataSourcesSpec {
  /** The list of performance counter data source configurations. */
  performanceCounters?: DataCollectionApiPerfCounterDataSource[];
  /** The list of Open Telemetry performance counter data source configurations. */
  performanceCountersOTel?: DataCollectionApiPerformanceCountersOTelDataSource[];
  /** The list of Windows Event Log data source configurations. */
  windowsEventLogs?: DataCollectionApiWindowsEventLogDataSource[];
  /** The list of Syslog data source configurations. */
  syslog?: DataCollectionApiSyslogDataSource[];
  /** The list of Azure VM extension data source configurations. */
  extensions?: DataCollectionApiExtensionDataSource[];
  /** The list of Log files source configurations. */
  logFiles?: DataCollectionApiLogFilesDataSource[];
  /** The list of IIS logs source configurations. */
  iisLogs?: DataCollectionApiIisLogsDataSource[];
  /** The list of Windows Firewall logs source configurations. */
  windowsFirewallLogs?: DataCollectionApiWindowsFirewallLogsDataSource[];
  /** The list of Prometheus forwarder data source configurations. */
  prometheusForwarder?: DataCollectionApiPrometheusForwarderDataSource[];
  /** The list of platform telemetry configurations */
  platformTelemetry?: DataCollectionApiPlatformTelemetryDataSource[];
  /** Specifications of pull based data sources */
  dataImports?: DataCollectionApiDataSourcesSpecDataImports;
  /** The list of Otel Logs data source configurations. */
  otelLogs?: DataCollectionApiOtelLogsDataSource[];
  /** The list of Otel traces data source configurations. */
  otelTraces?: DataCollectionApiOtelTracesDataSource[];
  /** The list of OTel metrics data source configurations. */
  otelMetrics?: DataCollectionApiOtelMetricsDataSource[];
  /** The list of ETW providers data source configurations. */
  etwProviders?: DataCollectionApiEtwProviderDataSource[];
}

export function dataCollectionApiDataSourcesSpecSerializer(
  item: DataCollectionApiDataSourcesSpec,
): any {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : dataCollectionApiPerfCounterDataSourceArraySerializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : dataCollectionApiPerformanceCountersOTelDataSourceArraySerializer(
          item["performanceCountersOTel"],
        ),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : dataCollectionApiWindowsEventLogDataSourceArraySerializer(item["windowsEventLogs"]),
    syslog: !item["syslog"]
      ? item["syslog"]
      : dataCollectionApiSyslogDataSourceArraySerializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : dataCollectionApiExtensionDataSourceArraySerializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : dataCollectionApiLogFilesDataSourceArraySerializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : dataCollectionApiIisLogsDataSourceArraySerializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : dataCollectionApiWindowsFirewallLogsDataSourceArraySerializer(item["windowsFirewallLogs"]),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : dataCollectionApiPrometheusForwarderDataSourceArraySerializer(item["prometheusForwarder"]),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : dataCollectionApiPlatformTelemetryDataSourceArraySerializer(item["platformTelemetry"]),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : dataCollectionApiDataSourcesSpecDataImportsSerializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : dataCollectionApiOtelLogsDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : dataCollectionApiOtelTracesDataSourceArraySerializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : dataCollectionApiOtelMetricsDataSourceArraySerializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : dataCollectionApiEtwProviderDataSourceArraySerializer(item["etwProviders"]),
  };
}

export function dataCollectionApiDataSourcesSpecDeserializer(
  item: any,
): DataCollectionApiDataSourcesSpec {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : dataCollectionApiPerfCounterDataSourceArrayDeserializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : dataCollectionApiPerformanceCountersOTelDataSourceArrayDeserializer(
          item["performanceCountersOTel"],
        ),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : dataCollectionApiWindowsEventLogDataSourceArrayDeserializer(item["windowsEventLogs"]),
    syslog: !item["syslog"]
      ? item["syslog"]
      : dataCollectionApiSyslogDataSourceArrayDeserializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : dataCollectionApiExtensionDataSourceArrayDeserializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : dataCollectionApiLogFilesDataSourceArrayDeserializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : dataCollectionApiIisLogsDataSourceArrayDeserializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : dataCollectionApiWindowsFirewallLogsDataSourceArrayDeserializer(
          item["windowsFirewallLogs"],
        ),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : dataCollectionApiPrometheusForwarderDataSourceArrayDeserializer(
          item["prometheusForwarder"],
        ),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : dataCollectionApiPlatformTelemetryDataSourceArrayDeserializer(item["platformTelemetry"]),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : dataCollectionApiDataSourcesSpecDataImportsDeserializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : dataCollectionApiOtelLogsDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : dataCollectionApiOtelTracesDataSourceArrayDeserializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : dataCollectionApiOtelMetricsDataSourceArrayDeserializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : dataCollectionApiEtwProviderDataSourceArrayDeserializer(item["etwProviders"]),
  };
}

export function dataCollectionApiPerfCounterDataSourceArraySerializer(
  result: Array<DataCollectionApiPerfCounterDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPerfCounterDataSourceSerializer(item);
  });
}

export function dataCollectionApiPerfCounterDataSourceArrayDeserializer(
  result: Array<DataCollectionApiPerfCounterDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPerfCounterDataSourceDeserializer(item);
  });
}

/**
 * Definition of which performance counters will be collected and how they will be collected by this data collection rule.
 * Collected from both Windows and Linux machines where the counter is present.
 */
export interface DataCollectionApiPerfCounterDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: DataCollectionApiKnownPerfCounterDataSourceStreams[];
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

export function dataCollectionApiPerfCounterDataSourceSerializer(
  item: DataCollectionApiPerfCounterDataSource,
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
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function dataCollectionApiPerfCounterDataSourceDeserializer(
  item: any,
): DataCollectionApiPerfCounterDataSource {
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
export enum KnownDataCollectionApiKnownPerfCounterDataSourceStreams {
  /** Microsoft-Perf */
  MicrosoftPerf = "Microsoft-Perf",
  /** Microsoft-InsightsMetrics */
  MicrosoftInsightsMetrics = "Microsoft-InsightsMetrics",
}

/** Type of DataCollectionApiKnownPerfCounterDataSourceStreams */
export type DataCollectionApiKnownPerfCounterDataSourceStreams = string;

export function dataCollectionApiPerformanceCountersOTelDataSourceArraySerializer(
  result: Array<DataCollectionApiPerformanceCountersOTelDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPerformanceCountersOTelDataSourceSerializer(item);
  });
}

export function dataCollectionApiPerformanceCountersOTelDataSourceArrayDeserializer(
  result: Array<DataCollectionApiPerformanceCountersOTelDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPerformanceCountersOTelDataSourceDeserializer(item);
  });
}

/**
 * Definition of which Open Telemetry performance counters will be collected and how they will be collected by this data collection rule.
 * Collected from both Windows and Linux machines where the counter is present.
 */
export interface DataCollectionApiPerformanceCountersOTelDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: DataCollectionApiKnownPerformanceCountersOTelDataSourceStreams[];
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

export function dataCollectionApiPerformanceCountersOTelDataSourceSerializer(
  item: DataCollectionApiPerformanceCountersOTelDataSource,
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

export function dataCollectionApiPerformanceCountersOTelDataSourceDeserializer(
  item: any,
): DataCollectionApiPerformanceCountersOTelDataSource {
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
export enum KnownDataCollectionApiKnownPerformanceCountersOTelDataSourceStreams {
  /** Microsoft-OtelPerfMetrics */
  MicrosoftOtelPerfMetrics = "Microsoft-OtelPerfMetrics",
}

/** Type of DataCollectionApiKnownPerformanceCountersOTelDataSourceStreams */
export type DataCollectionApiKnownPerformanceCountersOTelDataSourceStreams = string;

export function dataCollectionApiWindowsEventLogDataSourceArraySerializer(
  result: Array<DataCollectionApiWindowsEventLogDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiWindowsEventLogDataSourceSerializer(item);
  });
}

export function dataCollectionApiWindowsEventLogDataSourceArrayDeserializer(
  result: Array<DataCollectionApiWindowsEventLogDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiWindowsEventLogDataSourceDeserializer(item);
  });
}

/**
 * Definition of which Windows Event Log events will be collected and how they will be collected.
 * Only collected from Windows machines.
 */
export interface DataCollectionApiWindowsEventLogDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: DataCollectionApiKnownWindowsEventLogDataSourceStreams[];
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

export function dataCollectionApiWindowsEventLogDataSourceSerializer(
  item: DataCollectionApiWindowsEventLogDataSource,
): any {
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

export function dataCollectionApiWindowsEventLogDataSourceDeserializer(
  item: any,
): DataCollectionApiWindowsEventLogDataSource {
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
export enum KnownDataCollectionApiKnownWindowsEventLogDataSourceStreams {
  /** Microsoft-WindowsEvent */
  MicrosoftWindowsEvent = "Microsoft-WindowsEvent",
  /** Microsoft-Event */
  MicrosoftEvent = "Microsoft-Event",
}

/** Type of DataCollectionApiKnownWindowsEventLogDataSourceStreams */
export type DataCollectionApiKnownWindowsEventLogDataSourceStreams = string;

export function dataCollectionApiSyslogDataSourceArraySerializer(
  result: Array<DataCollectionApiSyslogDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiSyslogDataSourceSerializer(item);
  });
}

export function dataCollectionApiSyslogDataSourceArrayDeserializer(
  result: Array<DataCollectionApiSyslogDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiSyslogDataSourceDeserializer(item);
  });
}

/**
 * Definition of which syslog data will be collected and how it will be collected.
 * Only collected from Linux machines.
 */
export interface DataCollectionApiSyslogDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: DataCollectionApiKnownSyslogDataSourceStreams[];
  /** The list of facility names. */
  facilityNames?: DataCollectionApiKnownSyslogDataSourceFacilityNames[];
  /** The log levels to collect. */
  logLevels?: DataCollectionApiKnownSyslogDataSourceLogLevels[];
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function dataCollectionApiSyslogDataSourceSerializer(
  item: DataCollectionApiSyslogDataSource,
): any {
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

export function dataCollectionApiSyslogDataSourceDeserializer(
  item: any,
): DataCollectionApiSyslogDataSource {
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
export enum KnownDataCollectionApiKnownSyslogDataSourceStreams {
  /** Microsoft-Syslog */
  MicrosoftSyslog = "Microsoft-Syslog",
}

/** Type of DataCollectionApiKnownSyslogDataSourceStreams */
export type DataCollectionApiKnownSyslogDataSourceStreams = string;

/** Known values of {@link KnownSyslogDataSourceFacilityNames} that the service accepts. */
export enum KnownDataCollectionApiKnownSyslogDataSourceFacilityNames {
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

/** Type of DataCollectionApiKnownSyslogDataSourceFacilityNames */
export type DataCollectionApiKnownSyslogDataSourceFacilityNames = string;

/** Known values of {@link KnownSyslogDataSourceLogLevels} that the service accepts. */
export enum KnownDataCollectionApiKnownSyslogDataSourceLogLevels {
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

/** Type of DataCollectionApiKnownSyslogDataSourceLogLevels */
export type DataCollectionApiKnownSyslogDataSourceLogLevels = string;

export function dataCollectionApiExtensionDataSourceArraySerializer(
  result: Array<DataCollectionApiExtensionDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiExtensionDataSourceSerializer(item);
  });
}

export function dataCollectionApiExtensionDataSourceArrayDeserializer(
  result: Array<DataCollectionApiExtensionDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiExtensionDataSourceDeserializer(item);
  });
}

/**
 * Definition of which data will be collected from a separate VM extension that integrates with the Azure Monitor Agent.
 * Collected from either Windows and Linux machines, depending on which extension is defined.
 */
export interface DataCollectionApiExtensionDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: DataCollectionApiKnownExtensionDataSourceStreams[];
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

export function dataCollectionApiExtensionDataSourceSerializer(
  item: DataCollectionApiExtensionDataSource,
): any {
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

export function dataCollectionApiExtensionDataSourceDeserializer(
  item: any,
): DataCollectionApiExtensionDataSource {
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
export enum KnownDataCollectionApiKnownExtensionDataSourceStreams {
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

/** Type of DataCollectionApiKnownExtensionDataSourceStreams */
export type DataCollectionApiKnownExtensionDataSourceStreams = string;

export function dataCollectionApiLogFilesDataSourceArraySerializer(
  result: Array<DataCollectionApiLogFilesDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiLogFilesDataSourceSerializer(item);
  });
}

export function dataCollectionApiLogFilesDataSourceArrayDeserializer(
  result: Array<DataCollectionApiLogFilesDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiLogFilesDataSourceDeserializer(item);
  });
}

/** Definition of which custom log files will be collected by this data collection rule */
export interface DataCollectionApiLogFilesDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data source
   */
  streams: string[];
  /** File Patterns where the log files are located */
  filePatterns: string[];
  /** The data format of the log files */
  format: DataCollectionApiKnownLogFilesDataSourceFormat;
  /** The log files specific settings. */
  settings?: DataCollectionApiLogFilesDataSourceSettings;
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function dataCollectionApiLogFilesDataSourceSerializer(
  item: DataCollectionApiLogFilesDataSource,
): any {
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
      : dataCollectionApiLogFilesDataSourceSettingsSerializer(item["settings"]),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function dataCollectionApiLogFilesDataSourceDeserializer(
  item: any,
): DataCollectionApiLogFilesDataSource {
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
      : dataCollectionApiLogFilesDataSourceSettingsDeserializer(item["settings"]),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

/** The data format of the log files */
export enum KnownDataCollectionApiKnownLogFilesDataSourceFormat {
  /** json */
  Json = "json",
  /** text */
  Text = "text",
}

/**
 * The data format of the log files \
 * {@link KnownDataCollectionApiKnownLogFilesDataSourceFormat} can be used interchangeably with DataCollectionApiKnownLogFilesDataSourceFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **json**: json \
 * **text**: text
 */
export type DataCollectionApiKnownLogFilesDataSourceFormat = string;

/** The log files specific settings. */
export interface DataCollectionApiLogFilesDataSourceSettings extends DataCollectionApiLogFileSettings {}

export function dataCollectionApiLogFilesDataSourceSettingsSerializer(
  item: DataCollectionApiLogFilesDataSourceSettings,
): any {
  return {
    text: !item["text"]
      ? item["text"]
      : dataCollectionApiLogFileSettingsTextSerializer(item["text"]),
  };
}

export function dataCollectionApiLogFilesDataSourceSettingsDeserializer(
  item: any,
): DataCollectionApiLogFilesDataSourceSettings {
  return {
    text: !item["text"]
      ? item["text"]
      : dataCollectionApiLogFileSettingsTextDeserializer(item["text"]),
  };
}

export function dataCollectionApiIisLogsDataSourceArraySerializer(
  result: Array<DataCollectionApiIisLogsDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiIisLogsDataSourceSerializer(item);
  });
}

export function dataCollectionApiIisLogsDataSourceArrayDeserializer(
  result: Array<DataCollectionApiIisLogsDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiIisLogsDataSourceDeserializer(item);
  });
}

/** Enables IIS logs to be collected by this data collection rule. */
export interface DataCollectionApiIisLogsDataSource {
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

export function dataCollectionApiIisLogsDataSourceSerializer(
  item: DataCollectionApiIisLogsDataSource,
): any {
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

export function dataCollectionApiIisLogsDataSourceDeserializer(
  item: any,
): DataCollectionApiIisLogsDataSource {
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

export function dataCollectionApiWindowsFirewallLogsDataSourceArraySerializer(
  result: Array<DataCollectionApiWindowsFirewallLogsDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiWindowsFirewallLogsDataSourceSerializer(item);
  });
}

export function dataCollectionApiWindowsFirewallLogsDataSourceArrayDeserializer(
  result: Array<DataCollectionApiWindowsFirewallLogsDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiWindowsFirewallLogsDataSourceDeserializer(item);
  });
}

/** Enables Firewall logs to be collected by this data collection rule. */
export interface DataCollectionApiWindowsFirewallLogsDataSource {
  /** Firewall logs streams */
  streams: string[];
  /** Firewall logs profile filter */
  profileFilter?: DataCollectionApiKnownWindowsFirewallLogsDataSourceProfileFilter[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function dataCollectionApiWindowsFirewallLogsDataSourceSerializer(
  item: DataCollectionApiWindowsFirewallLogsDataSource,
): any {
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

export function dataCollectionApiWindowsFirewallLogsDataSourceDeserializer(
  item: any,
): DataCollectionApiWindowsFirewallLogsDataSource {
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
export enum KnownDataCollectionApiKnownWindowsFirewallLogsDataSourceProfileFilter {
  /** Domain */
  Domain = "Domain",
  /** Private */
  Private = "Private",
  /** Public */
  Public = "Public",
}

/** Type of DataCollectionApiKnownWindowsFirewallLogsDataSourceProfileFilter */
export type DataCollectionApiKnownWindowsFirewallLogsDataSourceProfileFilter = string;

export function dataCollectionApiPrometheusForwarderDataSourceArraySerializer(
  result: Array<DataCollectionApiPrometheusForwarderDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPrometheusForwarderDataSourceSerializer(item);
  });
}

export function dataCollectionApiPrometheusForwarderDataSourceArrayDeserializer(
  result: Array<DataCollectionApiPrometheusForwarderDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPrometheusForwarderDataSourceDeserializer(item);
  });
}

/** Definition of Prometheus metrics forwarding configuration. */
export interface DataCollectionApiPrometheusForwarderDataSource {
  /** List of streams that this data source will be sent to. */
  streams?: DataCollectionApiKnownPrometheusForwarderDataSourceStreams[];
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

export function dataCollectionApiPrometheusForwarderDataSourceSerializer(
  item: DataCollectionApiPrometheusForwarderDataSource,
): any {
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

export function dataCollectionApiPrometheusForwarderDataSourceDeserializer(
  item: any,
): DataCollectionApiPrometheusForwarderDataSource {
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
export enum KnownDataCollectionApiKnownPrometheusForwarderDataSourceStreams {
  /** Microsoft-PrometheusMetrics */
  MicrosoftPrometheusMetrics = "Microsoft-PrometheusMetrics",
}

/** Type of DataCollectionApiKnownPrometheusForwarderDataSourceStreams */
export type DataCollectionApiKnownPrometheusForwarderDataSourceStreams = string;

export function dataCollectionApiPlatformTelemetryDataSourceArraySerializer(
  result: Array<DataCollectionApiPlatformTelemetryDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPlatformTelemetryDataSourceSerializer(item);
  });
}

export function dataCollectionApiPlatformTelemetryDataSourceArrayDeserializer(
  result: Array<DataCollectionApiPlatformTelemetryDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiPlatformTelemetryDataSourceDeserializer(item);
  });
}

/** Definition of platform telemetry data source configuration */
export interface DataCollectionApiPlatformTelemetryDataSource {
  /** List of platform telemetry streams to collect */
  streams: string[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function dataCollectionApiPlatformTelemetryDataSourceSerializer(
  item: DataCollectionApiPlatformTelemetryDataSource,
): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    name: item["name"],
  };
}

export function dataCollectionApiPlatformTelemetryDataSourceDeserializer(
  item: any,
): DataCollectionApiPlatformTelemetryDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    name: item["name"],
  };
}

/** Specifications of pull based data sources */
export interface DataCollectionApiDataSourcesSpecDataImports extends DataCollectionApiDataImportSources {}

export function dataCollectionApiDataSourcesSpecDataImportsSerializer(
  item: DataCollectionApiDataSourcesSpecDataImports,
): any {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : dataCollectionApiDataImportSourcesEventHubSerializer(item["eventHub"]),
  };
}

export function dataCollectionApiDataSourcesSpecDataImportsDeserializer(
  item: any,
): DataCollectionApiDataSourcesSpecDataImports {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : dataCollectionApiDataImportSourcesEventHubDeserializer(item["eventHub"]),
  };
}

export function dataCollectionApiOtelLogsDataSourceArraySerializer(
  result: Array<DataCollectionApiOtelLogsDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelLogsDataSourceSerializer(item);
  });
}

export function dataCollectionApiOtelLogsDataSourceArrayDeserializer(
  result: Array<DataCollectionApiOtelLogsDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelLogsDataSourceDeserializer(item);
  });
}

/** Enables Otel logs to be collected by this data collection rule. */
export interface DataCollectionApiOtelLogsDataSource {
  /** List of streams that this data source will be sent to. */
  streams: DataCollectionApiKnownOtelLogsDataSourceStreams[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: DataCollectionApiOtelLogsDataSourceResourceAttributeRouting;
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

export function dataCollectionApiOtelLogsDataSourceSerializer(
  item: DataCollectionApiOtelLogsDataSource,
): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : dataCollectionApiOtelLogsDataSourceResourceAttributeRoutingSerializer(
          item["resourceAttributeRouting"],
        ),
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

export function dataCollectionApiOtelLogsDataSourceDeserializer(
  item: any,
): DataCollectionApiOtelLogsDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : dataCollectionApiOtelLogsDataSourceResourceAttributeRoutingDeserializer(
          item["resourceAttributeRouting"],
        ),
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
export enum KnownDataCollectionApiKnownOtelLogsDataSourceStreams {
  /** Microsoft-OTel-Logs */
  MicrosoftOTelLogs = "Microsoft-OTel-Logs",
}

/** Type of DataCollectionApiKnownOtelLogsDataSourceStreams */
export type DataCollectionApiKnownOtelLogsDataSourceStreams = string;

/** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
export interface DataCollectionApiOtelLogsDataSourceResourceAttributeRouting extends DataCollectionApiOtelDataSourceResourceAttributeRouting {}

export function dataCollectionApiOtelLogsDataSourceResourceAttributeRoutingSerializer(
  item: DataCollectionApiOtelLogsDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function dataCollectionApiOtelLogsDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): DataCollectionApiOtelLogsDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function dataCollectionApiOtelTracesDataSourceArraySerializer(
  result: Array<DataCollectionApiOtelTracesDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelTracesDataSourceSerializer(item);
  });
}

export function dataCollectionApiOtelTracesDataSourceArrayDeserializer(
  result: Array<DataCollectionApiOtelTracesDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelTracesDataSourceDeserializer(item);
  });
}

/** Enables Otel Traces to be collected by this data collection rule. */
export interface DataCollectionApiOtelTracesDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams: DataCollectionApiKnownOtelTracesDataSourceStreams[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: DataCollectionApiOtelTracesDataSourceResourceAttributeRouting;
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

export function dataCollectionApiOtelTracesDataSourceSerializer(
  item: DataCollectionApiOtelTracesDataSource,
): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : dataCollectionApiOtelTracesDataSourceResourceAttributeRoutingSerializer(
          item["resourceAttributeRouting"],
        ),
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

export function dataCollectionApiOtelTracesDataSourceDeserializer(
  item: any,
): DataCollectionApiOtelTracesDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : dataCollectionApiOtelTracesDataSourceResourceAttributeRoutingDeserializer(
          item["resourceAttributeRouting"],
        ),
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
export enum KnownDataCollectionApiKnownOtelTracesDataSourceStreams {
  /** Microsoft-OTel-Traces-Spans */
  MicrosoftOTelTracesSpans = "Microsoft-OTel-Traces-Spans",
  /** Microsoft-OTel-Traces-Events */
  MicrosoftOTelTracesEvents = "Microsoft-OTel-Traces-Events",
  /** Microsoft-OTel-Traces-Resources */
  MicrosoftOTelTracesResources = "Microsoft-OTel-Traces-Resources",
}

/** Type of DataCollectionApiKnownOtelTracesDataSourceStreams */
export type DataCollectionApiKnownOtelTracesDataSourceStreams = string;

/** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
export interface DataCollectionApiOtelTracesDataSourceResourceAttributeRouting extends DataCollectionApiOtelDataSourceResourceAttributeRouting {}

export function dataCollectionApiOtelTracesDataSourceResourceAttributeRoutingSerializer(
  item: DataCollectionApiOtelTracesDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function dataCollectionApiOtelTracesDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): DataCollectionApiOtelTracesDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function dataCollectionApiOtelMetricsDataSourceArraySerializer(
  result: Array<DataCollectionApiOtelMetricsDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelMetricsDataSourceSerializer(item);
  });
}

export function dataCollectionApiOtelMetricsDataSourceArrayDeserializer(
  result: Array<DataCollectionApiOtelMetricsDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelMetricsDataSourceDeserializer(item);
  });
}

/** Definition of OTel metrics configuration. */
export interface DataCollectionApiOtelMetricsDataSource {
  /** List of streams that this data source will be sent to. */
  streams: string[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: DataCollectionApiOtelMetricsDataSourceResourceAttributeRouting;
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

export function dataCollectionApiOtelMetricsDataSourceSerializer(
  item: DataCollectionApiOtelMetricsDataSource,
): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : dataCollectionApiOtelMetricsDataSourceResourceAttributeRoutingSerializer(
          item["resourceAttributeRouting"],
        ),
    enrichWithResourceAttributes: !item["enrichWithResourceAttributes"]
      ? item["enrichWithResourceAttributes"]
      : item["enrichWithResourceAttributes"].map((p: any) => {
          return p;
        }),
    enrichWithReference: item["enrichWithReference"],
    name: item["name"],
  };
}

export function dataCollectionApiOtelMetricsDataSourceDeserializer(
  item: any,
): DataCollectionApiOtelMetricsDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : dataCollectionApiOtelMetricsDataSourceResourceAttributeRoutingDeserializer(
          item["resourceAttributeRouting"],
        ),
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
export interface DataCollectionApiOtelMetricsDataSourceResourceAttributeRouting extends DataCollectionApiOtelDataSourceResourceAttributeRouting {}

export function dataCollectionApiOtelMetricsDataSourceResourceAttributeRoutingSerializer(
  item: DataCollectionApiOtelMetricsDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function dataCollectionApiOtelMetricsDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): DataCollectionApiOtelMetricsDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function dataCollectionApiEtwProviderDataSourceArraySerializer(
  result: Array<DataCollectionApiEtwProviderDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiEtwProviderDataSourceSerializer(item);
  });
}

export function dataCollectionApiEtwProviderDataSourceArrayDeserializer(
  result: Array<DataCollectionApiEtwProviderDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiEtwProviderDataSourceDeserializer(item);
  });
}

/** Enables an ETW provider logs to be collected by this data collection rule. */
export interface DataCollectionApiEtwProviderDataSource {
  /** List of streams that this data source will be sent to */
  streams: string[];
  /** The provider GUID or class name for event source */
  provider: string;
  /** Provider type specification: By Manifest GUID or by Event Source name */
  providerType: DataCollectionApiKnownEtwProviderType;
  /** Minimal level of detail to be logged */
  logLevel?: DataCollectionApiKnownEtwProviderDataSourceLogLevel;
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

export function dataCollectionApiEtwProviderDataSourceSerializer(
  item: DataCollectionApiEtwProviderDataSource,
): any {
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

export function dataCollectionApiEtwProviderDataSourceDeserializer(
  item: any,
): DataCollectionApiEtwProviderDataSource {
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
export enum KnownDataCollectionApiKnownEtwProviderType {
  /** EventSource */
  EventSource = "EventSource",
  /** Manifest */
  Manifest = "Manifest",
}

/**
 * Provider type specification: By Manifest GUID or by Event Source name \
 * {@link KnownDataCollectionApiKnownEtwProviderType} can be used interchangeably with DataCollectionApiKnownEtwProviderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EventSource**: EventSource \
 * **Manifest**: Manifest
 */
export type DataCollectionApiKnownEtwProviderType = string;

/** Minimal level of detail to be logged */
export enum KnownDataCollectionApiKnownEtwProviderDataSourceLogLevel {
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
 * {@link KnownDataCollectionApiKnownEtwProviderDataSourceLogLevel} can be used interchangeably with DataCollectionApiKnownEtwProviderDataSourceLogLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Critical \
 * **Error**: Error \
 * **Warning**: Warning \
 * **Informational**: Informational \
 * **Verbose**: Verbose
 */
export type DataCollectionApiKnownEtwProviderDataSourceLogLevel = string;

/** Settings for different log file formats */
export interface DataCollectionApiLogFileSettings {
  /** Text settings */
  text?: DataCollectionApiLogFileSettingsText;
}

export function dataCollectionApiLogFileSettingsSerializer(
  item: DataCollectionApiLogFileSettings,
): any {
  return {
    text: !item["text"]
      ? item["text"]
      : dataCollectionApiLogFileSettingsTextSerializer(item["text"]),
  };
}

export function dataCollectionApiLogFileSettingsDeserializer(
  item: any,
): DataCollectionApiLogFileSettings {
  return {
    text: !item["text"]
      ? item["text"]
      : dataCollectionApiLogFileSettingsTextDeserializer(item["text"]),
  };
}

/** Text settings */
export interface DataCollectionApiLogFileSettingsText extends DataCollectionApiLogFileTextSettings {}

export function dataCollectionApiLogFileSettingsTextSerializer(
  item: DataCollectionApiLogFileSettingsText,
): any {
  return { recordStartTimestampFormat: item["recordStartTimestampFormat"] };
}

export function dataCollectionApiLogFileSettingsTextDeserializer(
  item: any,
): DataCollectionApiLogFileSettingsText {
  return {
    recordStartTimestampFormat: item["recordStartTimestampFormat"],
  };
}

/** Settings for text log files */
export interface DataCollectionApiLogFileTextSettings {
  /** One of the supported timestamp formats */
  recordStartTimestampFormat: DataCollectionApiKnownLogFileTextSettingsRecordStartTimestampFormat;
}

export function dataCollectionApiLogFileTextSettingsSerializer(
  item: DataCollectionApiLogFileTextSettings,
): any {
  return { recordStartTimestampFormat: item["recordStartTimestampFormat"] };
}

export function dataCollectionApiLogFileTextSettingsDeserializer(
  item: any,
): DataCollectionApiLogFileTextSettings {
  return {
    recordStartTimestampFormat: item["recordStartTimestampFormat"],
  };
}

/** One of the supported timestamp formats */
export enum KnownDataCollectionApiKnownLogFileTextSettingsRecordStartTimestampFormat {
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
 * {@link KnownDataCollectionApiKnownLogFileTextSettingsRecordStartTimestampFormat} can be used interchangeably with DataCollectionApiKnownLogFileTextSettingsRecordStartTimestampFormat,
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
export type DataCollectionApiKnownLogFileTextSettingsRecordStartTimestampFormat = string;

/** model interface DataCollectionApiDataImportSources */
export interface DataCollectionApiDataImportSources {
  /** Definition of Event Hub configuration. */
  eventHub?: DataCollectionApiDataImportSourcesEventHub;
}

export function dataCollectionApiDataImportSourcesSerializer(
  item: DataCollectionApiDataImportSources,
): any {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : dataCollectionApiDataImportSourcesEventHubSerializer(item["eventHub"]),
  };
}

export function dataCollectionApiDataImportSourcesDeserializer(
  item: any,
): DataCollectionApiDataImportSources {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : dataCollectionApiDataImportSourcesEventHubDeserializer(item["eventHub"]),
  };
}

/** Definition of Event Hub configuration. */
export interface DataCollectionApiDataImportSourcesEventHub extends DataCollectionApiEventHubDataSource {}

export function dataCollectionApiDataImportSourcesEventHubSerializer(
  item: DataCollectionApiDataImportSourcesEventHub,
): any {
  return { name: item["name"], consumerGroup: item["consumerGroup"], stream: item["stream"] };
}

export function dataCollectionApiDataImportSourcesEventHubDeserializer(
  item: any,
): DataCollectionApiDataImportSourcesEventHub {
  return {
    name: item["name"],
    consumerGroup: item["consumerGroup"],
    stream: item["stream"],
  };
}

/** model interface DataCollectionApiEventHubDataSource */
export interface DataCollectionApiEventHubDataSource {
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

export function dataCollectionApiEventHubDataSourceSerializer(
  item: DataCollectionApiEventHubDataSource,
): any {
  return { name: item["name"], consumerGroup: item["consumerGroup"], stream: item["stream"] };
}

export function dataCollectionApiEventHubDataSourceDeserializer(
  item: any,
): DataCollectionApiEventHubDataSource {
  return {
    name: item["name"],
    consumerGroup: item["consumerGroup"],
    stream: item["stream"],
  };
}

/** Enables OTLP (logs, traces, and metrics) payload routing */
export interface DataCollectionApiOtelDataSourceResourceAttributeRouting {
  /** The name of the resource attribute to match. */
  attributeName?: string;
  /** The value of the resource attribute to match. */
  attributeValue?: string;
}

export function dataCollectionApiOtelDataSourceResourceAttributeRoutingSerializer(
  item: DataCollectionApiOtelDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function dataCollectionApiOtelDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): DataCollectionApiOtelDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

/** Specification of direct data sources that will be collected. */
export interface DataCollectionApiDirectDataSourcesSpec {
  /** The list of OTel metrics data source configurations. */
  otelMetrics?: DataCollectionApiOtelMetricsDirectDataSource[];
  /** The list of OTel logs data source configurations. */
  otelLogs?: DataCollectionApiOtelLogsDirectDataSource[];
  /** The list of OTel traces data source configurations. */
  otelTraces?: DataCollectionApiOtelTracesDirectDataSource[];
}

export function dataCollectionApiDirectDataSourcesSpecSerializer(
  item: DataCollectionApiDirectDataSourcesSpec,
): any {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : dataCollectionApiOtelMetricsDirectDataSourceArraySerializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : dataCollectionApiOtelLogsDirectDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : dataCollectionApiOtelTracesDirectDataSourceArraySerializer(item["otelTraces"]),
  };
}

export function dataCollectionApiDirectDataSourcesSpecDeserializer(
  item: any,
): DataCollectionApiDirectDataSourcesSpec {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : dataCollectionApiOtelMetricsDirectDataSourceArrayDeserializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : dataCollectionApiOtelLogsDirectDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : dataCollectionApiOtelTracesDirectDataSourceArrayDeserializer(item["otelTraces"]),
  };
}

export function dataCollectionApiOtelMetricsDirectDataSourceArraySerializer(
  result: Array<DataCollectionApiOtelMetricsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelMetricsDirectDataSourceSerializer(item);
  });
}

export function dataCollectionApiOtelMetricsDirectDataSourceArrayDeserializer(
  result: Array<DataCollectionApiOtelMetricsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelMetricsDirectDataSourceDeserializer(item);
  });
}

/** Definition of OTel metrics configuration. */
export interface DataCollectionApiOtelMetricsDirectDataSource {
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

export function dataCollectionApiOtelMetricsDirectDataSourceSerializer(
  item: DataCollectionApiOtelMetricsDirectDataSource,
): any {
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

export function dataCollectionApiOtelMetricsDirectDataSourceDeserializer(
  item: any,
): DataCollectionApiOtelMetricsDirectDataSource {
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

export function dataCollectionApiOtelLogsDirectDataSourceArraySerializer(
  result: Array<DataCollectionApiOtelLogsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelLogsDirectDataSourceSerializer(item);
  });
}

export function dataCollectionApiOtelLogsDirectDataSourceArrayDeserializer(
  result: Array<DataCollectionApiOtelLogsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelLogsDirectDataSourceDeserializer(item);
  });
}

/** model interface DataCollectionApiOtelLogsDirectDataSource */
export interface DataCollectionApiOtelLogsDirectDataSource {
  /** List of streams that this data source will be sent to. */
  streams: DataCollectionApiKnownOtelLogsDirectDataSourceStreams[];
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

export function dataCollectionApiOtelLogsDirectDataSourceSerializer(
  item: DataCollectionApiOtelLogsDirectDataSource,
): any {
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

export function dataCollectionApiOtelLogsDirectDataSourceDeserializer(
  item: any,
): DataCollectionApiOtelLogsDirectDataSource {
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
export enum KnownDataCollectionApiKnownOtelLogsDirectDataSourceStreams {
  /** Microsoft-OTel-Logs */
  MicrosoftOTelLogs = "Microsoft-OTel-Logs",
}

/** Type of DataCollectionApiKnownOtelLogsDirectDataSourceStreams */
export type DataCollectionApiKnownOtelLogsDirectDataSourceStreams = string;

export function dataCollectionApiOtelTracesDirectDataSourceArraySerializer(
  result: Array<DataCollectionApiOtelTracesDirectDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelTracesDirectDataSourceSerializer(item);
  });
}

export function dataCollectionApiOtelTracesDirectDataSourceArrayDeserializer(
  result: Array<DataCollectionApiOtelTracesDirectDataSource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiOtelTracesDirectDataSourceDeserializer(item);
  });
}

/** Enables Otel Traces to be collected by this data collection rule. */
export interface DataCollectionApiOtelTracesDirectDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams: DataCollectionApiKnownOtelTracesDirectDataSourceStreams[];
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

export function dataCollectionApiOtelTracesDirectDataSourceSerializer(
  item: DataCollectionApiOtelTracesDirectDataSource,
): any {
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

export function dataCollectionApiOtelTracesDirectDataSourceDeserializer(
  item: any,
): DataCollectionApiOtelTracesDirectDataSource {
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
export enum KnownDataCollectionApiKnownOtelTracesDirectDataSourceStreams {
  /** Microsoft-OTel-Traces-Spans */
  MicrosoftOTelTracesSpans = "Microsoft-OTel-Traces-Spans",
  /** Microsoft-OTel-Traces-Events */
  MicrosoftOTelTracesEvents = "Microsoft-OTel-Traces-Events",
  /** Microsoft-OTel-Traces-Resources */
  MicrosoftOTelTracesResources = "Microsoft-OTel-Traces-Resources",
}

/** Type of DataCollectionApiKnownOtelTracesDirectDataSourceStreams */
export type DataCollectionApiKnownOtelTracesDirectDataSourceStreams = string;

/** Specification of destinations that can be used in data flows. */
export interface DataCollectionApiDestinationsSpec {
  /** List of Log Analytics destinations. */
  logAnalytics?: DataCollectionApiLogAnalyticsDestination[];
  /** List of monitoring account destinations. */
  monitoringAccounts?: DataCollectionApiMonitoringAccountDestination[];
  /** Azure Monitor Metrics destination. */
  azureMonitorMetrics?: DataCollectionApiDestinationsSpecAzureMonitorMetrics;
  /** List of Event Hubs destinations. */
  eventHubs?: DataCollectionApiEventHubDestination[];
  /** List of Event Hubs Direct destinations. */
  eventHubsDirect?: DataCollectionApiEventHubDirectDestination[];
  /** List of Storage Blob Direct destinations. To be used only for sending data directly to store from the agent. */
  storageBlobsDirect?: DataCollectionApiStorageBlobDestination[];
  /** List of Storage Table Direct destinations. */
  storageTablesDirect?: DataCollectionApiStorageTableDestination[];
  /** List of storage accounts destinations. */
  storageAccounts?: DataCollectionApiStorageBlobDestination[];
  /** List of Microsoft Fabric destinations. */
  microsoftFabric?: DataCollectionApiMicrosoftFabricDestination[];
  /** List of Azure Data Explorer destinations. */
  azureDataExplorer?: DataCollectionApiAdxDestination[];
}

export function dataCollectionApiDestinationsSpecSerializer(
  item: DataCollectionApiDestinationsSpec,
): any {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : dataCollectionApiLogAnalyticsDestinationArraySerializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : dataCollectionApiMonitoringAccountDestinationArraySerializer(item["monitoringAccounts"]),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : dataCollectionApiDestinationsSpecAzureMonitorMetricsSerializer(item["azureMonitorMetrics"]),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : dataCollectionApiEventHubDestinationArraySerializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : dataCollectionApiEventHubDirectDestinationArraySerializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : dataCollectionApiStorageBlobDestinationArraySerializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : dataCollectionApiStorageTableDestinationArraySerializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : dataCollectionApiStorageBlobDestinationArraySerializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : dataCollectionApiMicrosoftFabricDestinationArraySerializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : dataCollectionApiAdxDestinationArraySerializer(item["azureDataExplorer"]),
  };
}

export function dataCollectionApiDestinationsSpecDeserializer(
  item: any,
): DataCollectionApiDestinationsSpec {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : dataCollectionApiLogAnalyticsDestinationArrayDeserializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : dataCollectionApiMonitoringAccountDestinationArrayDeserializer(item["monitoringAccounts"]),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : dataCollectionApiDestinationsSpecAzureMonitorMetricsDeserializer(
          item["azureMonitorMetrics"],
        ),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : dataCollectionApiEventHubDestinationArrayDeserializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : dataCollectionApiEventHubDirectDestinationArrayDeserializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : dataCollectionApiStorageBlobDestinationArrayDeserializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : dataCollectionApiStorageTableDestinationArrayDeserializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : dataCollectionApiStorageBlobDestinationArrayDeserializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : dataCollectionApiMicrosoftFabricDestinationArrayDeserializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : dataCollectionApiAdxDestinationArrayDeserializer(item["azureDataExplorer"]),
  };
}

export function dataCollectionApiLogAnalyticsDestinationArraySerializer(
  result: Array<DataCollectionApiLogAnalyticsDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiLogAnalyticsDestinationSerializer(item);
  });
}

export function dataCollectionApiLogAnalyticsDestinationArrayDeserializer(
  result: Array<DataCollectionApiLogAnalyticsDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiLogAnalyticsDestinationDeserializer(item);
  });
}

/** Log Analytics destination. */
export interface DataCollectionApiLogAnalyticsDestination {
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

export function dataCollectionApiLogAnalyticsDestinationSerializer(
  item: DataCollectionApiLogAnalyticsDestination,
): any {
  return { workspaceResourceId: item["workspaceResourceId"], name: item["name"] };
}

export function dataCollectionApiLogAnalyticsDestinationDeserializer(
  item: any,
): DataCollectionApiLogAnalyticsDestination {
  return {
    workspaceResourceId: item["workspaceResourceId"],
    workspaceId: item["workspaceId"],
    name: item["name"],
  };
}

export function dataCollectionApiMonitoringAccountDestinationArraySerializer(
  result: Array<DataCollectionApiMonitoringAccountDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiMonitoringAccountDestinationSerializer(item);
  });
}

export function dataCollectionApiMonitoringAccountDestinationArrayDeserializer(
  result: Array<DataCollectionApiMonitoringAccountDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiMonitoringAccountDestinationDeserializer(item);
  });
}

/** Monitoring account destination. */
export interface DataCollectionApiMonitoringAccountDestination {
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

export function dataCollectionApiMonitoringAccountDestinationSerializer(
  item: DataCollectionApiMonitoringAccountDestination,
): any {
  return { accountResourceId: item["accountResourceId"], name: item["name"] };
}

export function dataCollectionApiMonitoringAccountDestinationDeserializer(
  item: any,
): DataCollectionApiMonitoringAccountDestination {
  return {
    accountResourceId: item["accountResourceId"],
    accountId: item["accountId"],
    name: item["name"],
  };
}

/** Azure Monitor Metrics destination. */
export interface DataCollectionApiDestinationsSpecAzureMonitorMetrics extends DataCollectionApiAzureMonitorMetricsDestination {}

export function dataCollectionApiDestinationsSpecAzureMonitorMetricsSerializer(
  item: DataCollectionApiDestinationsSpecAzureMonitorMetrics,
): any {
  return { name: item["name"] };
}

export function dataCollectionApiDestinationsSpecAzureMonitorMetricsDeserializer(
  item: any,
): DataCollectionApiDestinationsSpecAzureMonitorMetrics {
  return {
    name: item["name"],
  };
}

export function dataCollectionApiEventHubDestinationArraySerializer(
  result: Array<DataCollectionApiEventHubDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiEventHubDestinationSerializer(item);
  });
}

export function dataCollectionApiEventHubDestinationArrayDeserializer(
  result: Array<DataCollectionApiEventHubDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiEventHubDestinationDeserializer(item);
  });
}

/** model interface DataCollectionApiEventHubDestination */
export interface DataCollectionApiEventHubDestination {
  /** The resource ID of the event hub. */
  eventHubResourceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function dataCollectionApiEventHubDestinationSerializer(
  item: DataCollectionApiEventHubDestination,
): any {
  return { eventHubResourceId: item["eventHubResourceId"], name: item["name"] };
}

export function dataCollectionApiEventHubDestinationDeserializer(
  item: any,
): DataCollectionApiEventHubDestination {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    name: item["name"],
  };
}

export function dataCollectionApiEventHubDirectDestinationArraySerializer(
  result: Array<DataCollectionApiEventHubDirectDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiEventHubDirectDestinationSerializer(item);
  });
}

export function dataCollectionApiEventHubDirectDestinationArrayDeserializer(
  result: Array<DataCollectionApiEventHubDirectDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiEventHubDirectDestinationDeserializer(item);
  });
}

/** model interface DataCollectionApiEventHubDirectDestination */
export interface DataCollectionApiEventHubDirectDestination {
  /** The resource ID of the event hub. */
  eventHubResourceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function dataCollectionApiEventHubDirectDestinationSerializer(
  item: DataCollectionApiEventHubDirectDestination,
): any {
  return { eventHubResourceId: item["eventHubResourceId"], name: item["name"] };
}

export function dataCollectionApiEventHubDirectDestinationDeserializer(
  item: any,
): DataCollectionApiEventHubDirectDestination {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    name: item["name"],
  };
}

export function dataCollectionApiStorageBlobDestinationArraySerializer(
  result: Array<DataCollectionApiStorageBlobDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiStorageBlobDestinationSerializer(item);
  });
}

export function dataCollectionApiStorageBlobDestinationArrayDeserializer(
  result: Array<DataCollectionApiStorageBlobDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiStorageBlobDestinationDeserializer(item);
  });
}

/** model interface DataCollectionApiStorageBlobDestination */
export interface DataCollectionApiStorageBlobDestination {
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

export function dataCollectionApiStorageBlobDestinationSerializer(
  item: DataCollectionApiStorageBlobDestination,
): any {
  return {
    containerName: item["containerName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function dataCollectionApiStorageBlobDestinationDeserializer(
  item: any,
): DataCollectionApiStorageBlobDestination {
  return {
    containerName: item["containerName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function dataCollectionApiStorageTableDestinationArraySerializer(
  result: Array<DataCollectionApiStorageTableDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiStorageTableDestinationSerializer(item);
  });
}

export function dataCollectionApiStorageTableDestinationArrayDeserializer(
  result: Array<DataCollectionApiStorageTableDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiStorageTableDestinationDeserializer(item);
  });
}

/** model interface DataCollectionApiStorageTableDestination */
export interface DataCollectionApiStorageTableDestination {
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

export function dataCollectionApiStorageTableDestinationSerializer(
  item: DataCollectionApiStorageTableDestination,
): any {
  return {
    tableName: item["tableName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function dataCollectionApiStorageTableDestinationDeserializer(
  item: any,
): DataCollectionApiStorageTableDestination {
  return {
    tableName: item["tableName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function dataCollectionApiMicrosoftFabricDestinationArraySerializer(
  result: Array<DataCollectionApiMicrosoftFabricDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiMicrosoftFabricDestinationSerializer(item);
  });
}

export function dataCollectionApiMicrosoftFabricDestinationArrayDeserializer(
  result: Array<DataCollectionApiMicrosoftFabricDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiMicrosoftFabricDestinationDeserializer(item);
  });
}

/** Microsoft Fabric destination (non-Azure). */
export interface DataCollectionApiMicrosoftFabricDestination {
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

export function dataCollectionApiMicrosoftFabricDestinationSerializer(
  item: DataCollectionApiMicrosoftFabricDestination,
): any {
  return {
    tenantId: item["tenantId"],
    artifactId: item["artifactId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

export function dataCollectionApiMicrosoftFabricDestinationDeserializer(
  item: any,
): DataCollectionApiMicrosoftFabricDestination {
  return {
    tenantId: item["tenantId"],
    artifactId: item["artifactId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

export function dataCollectionApiAdxDestinationArraySerializer(
  result: Array<DataCollectionApiAdxDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiAdxDestinationSerializer(item);
  });
}

export function dataCollectionApiAdxDestinationArrayDeserializer(
  result: Array<DataCollectionApiAdxDestination>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiAdxDestinationDeserializer(item);
  });
}

/** Azure Data Explorer (Adx) destination. */
export interface DataCollectionApiAdxDestination {
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

export function dataCollectionApiAdxDestinationSerializer(
  item: DataCollectionApiAdxDestination,
): any {
  return { resourceId: item["resourceId"], databaseName: item["databaseName"], name: item["name"] };
}

export function dataCollectionApiAdxDestinationDeserializer(
  item: any,
): DataCollectionApiAdxDestination {
  return {
    resourceId: item["resourceId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

/** Azure Monitor Metrics destination. */
export interface DataCollectionApiAzureMonitorMetricsDestination {
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function dataCollectionApiAzureMonitorMetricsDestinationSerializer(
  item: DataCollectionApiAzureMonitorMetricsDestination,
): any {
  return { name: item["name"] };
}

export function dataCollectionApiAzureMonitorMetricsDestinationDeserializer(
  item: any,
): DataCollectionApiAzureMonitorMetricsDestination {
  return {
    name: item["name"],
  };
}

/** model interface DataCollectionApiIngestionQuotas */
export interface DataCollectionApiIngestionQuotas {
  logs?: DataCollectionApiIngestionQuotasLogs;
}

export function dataCollectionApiIngestionQuotasDeserializer(
  item: any,
): DataCollectionApiIngestionQuotas {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : dataCollectionApiIngestionQuotasLogsDeserializer(item["logs"]),
  };
}

/** model interface DataCollectionApiIngestionQuotasLogs */
export interface DataCollectionApiIngestionQuotasLogs extends DataCollectionApiLogsQuotaSpec {}

export function dataCollectionApiIngestionQuotasLogsDeserializer(
  item: any,
): DataCollectionApiIngestionQuotasLogs {
  return {
    maxSizePerMinuteInGB: item["maxSizePerMinuteInGB"],
    maxRequestsPerMinute: item["maxRequestsPerMinute"],
  };
}

/** model interface DataCollectionApiLogsQuotaSpec */
export interface DataCollectionApiLogsQuotaSpec {
  maxSizePerMinuteInGB?: string;
  maxRequestsPerMinute?: string;
}

export function dataCollectionApiLogsQuotaSpecDeserializer(
  item: any,
): DataCollectionApiLogsQuotaSpec {
  return {
    maxSizePerMinuteInGB: item["maxSizePerMinuteInGB"],
    maxRequestsPerMinute: item["maxRequestsPerMinute"],
  };
}

export function dataCollectionApiDataCollectionRuleResourceArraySerializer(
  result: Array<DataCollectionApiDataCollectionRuleResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiDataCollectionRuleResourceSerializer(item);
  });
}

export function dataCollectionApiDataCollectionRuleResourceArrayDeserializer(
  result: Array<DataCollectionApiDataCollectionRuleResource>,
): any[] {
  return result.map((item) => {
    return dataCollectionApiDataCollectionRuleResourceDeserializer(item);
  });
}

export function _dataCollectionEndpointResourcePropertiesSerializer(
  item: DataCollectionApiDataCollectionEndpointResource,
): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionApiDataCollectionEndpointConfigurationAccessSerializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionApiDataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionApiDataCollectionEndpointMetricsIngestionSerializer(item["metricsIngestion"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionApiDataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function _dataCollectionEndpointResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : dataCollectionApiDataCollectionEndpointConfigurationAccessDeserializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : dataCollectionApiDataCollectionEndpointLogsIngestionDeserializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : dataCollectionApiDataCollectionEndpointMetricsIngestionDeserializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : dataCollectionApiDataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : dataCollectionApiPrivateLinkScopedResourceArrayDeserializer(
          item["privateLinkScopedResources"],
        ),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : dataCollectionApiDataCollectionEndpointFailoverConfigurationDeserializer(
          item["failoverConfiguration"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionApiDataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

export function _dataCollectionRuleAssociationProxyOnlyResourcePropertiesSerializer(
  item: DataCollectionApiDataCollectionRuleAssociationProxyOnlyResource,
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
      : dataCollectionApiDataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

export function _dataCollectionRuleResourcePropertiesSerializer(
  item: DataCollectionApiDataCollectionRuleResource,
): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : dataCollectionApiDataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionApiDataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : dataCollectionApiStreamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionApiDataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionApiDataCollectionRuleDirectDataSourcesSerializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionApiDataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataCollectionApiDataFlowArraySerializer(item["dataFlows"]),
  };
}

export function _dataCollectionRuleResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : dataCollectionApiDataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : dataCollectionApiDataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : dataCollectionApiDataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : dataCollectionApiDataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : dataCollectionApiStreamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : dataCollectionApiDataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : dataCollectionApiDataCollectionRuleDirectDataSourcesDeserializer(item["directDataSources"]),
    destinations: !item["destinations"]
      ? item["destinations"]
      : dataCollectionApiDataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : dataCollectionApiDataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : dataCollectionApiDataCollectionRuleIngestionQuotasDeserializer(item["ingestionQuotas"]),
    provisioningState: item["provisioningState"],
  };
}
