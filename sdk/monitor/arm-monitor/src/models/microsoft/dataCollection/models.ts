// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type {
  ErrorDetail,
  Sku,
  ManagedServiceIdentity,
  TrackedResource,
  ExtensionResource,
} from "../../models.js";
import {
  systemDataDeserializer,
  errorDetailDeserializer,
  userAssignedIdentityDeserializer,
} from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Definition of ARM tracked top level resource. */
export interface MicrosoftDataCollectionDataCollectionEndpointResource extends TrackedResource {
  /** The kind of the resource. */
  kind?: MicrosoftDataCollectionKnownDataCollectionEndpointResourceKind;
  /** The SKU of the resource. */
  sku?: MicrosoftDataCollectionDataCollectionEndpointResourceSku;
  /** Managed service identity of the resource. */
  identity?: MicrosoftDataCollectionDataCollectionEndpointResourceIdentity;
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the data collection endpoint. */
  description?: string;
  /** The immutable ID of this data collection endpoint resource. This property is READ-ONLY. */
  immutableId?: string;
  /** The endpoint used by clients to access their configuration. */
  configurationAccess?: MicrosoftDataCollectionDataCollectionEndpointConfigurationAccess;
  /** The endpoint used by clients to ingest logs. */
  logsIngestion?: MicrosoftDataCollectionDataCollectionEndpointLogsIngestion;
  /** The endpoint used by clients to ingest metrics. */
  metricsIngestion?: MicrosoftDataCollectionDataCollectionEndpointMetricsIngestion;
  /** Network access control rules for the endpoints. */
  networkAcls?: MicrosoftDataCollectionDataCollectionEndpointNetworkAcls;
  /** The resource provisioning state. This property is READ-ONLY. */
  readonly provisioningState?: MicrosoftDataCollectionKnownDataCollectionEndpointProvisioningState;
  /** List of Azure Monitor Private Link Scope Resources to which this data collection endpoint resource is associated. This property is READ-ONLY. */
  readonly privateLinkScopedResources?: MicrosoftDataCollectionPrivateLinkScopedResource[];
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly failoverConfiguration?: MicrosoftDataCollectionDataCollectionEndpointFailoverConfiguration;
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly metadata?: MicrosoftDataCollectionDataCollectionEndpointMetadata;
}

export function microsoftDataCollectionDataCollectionEndpointResourceSerializer(
  item: MicrosoftDataCollectionDataCollectionEndpointResource,
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
      : microsoftDataCollectionDataCollectionEndpointResourceSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftDataCollectionDataCollectionEndpointResourceIdentitySerializer(item["identity"]),
  };
}

export function microsoftDataCollectionDataCollectionEndpointResourceDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointResource {
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
      : microsoftDataCollectionDataCollectionEndpointResourceSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftDataCollectionDataCollectionEndpointResourceIdentityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** model interface MicrosoftDataCollectionDataCollectionEndpointResourceProperties */
export interface MicrosoftDataCollectionDataCollectionEndpointResourceProperties extends MicrosoftDataCollectionDataCollectionEndpoint {}

export function microsoftDataCollectionDataCollectionEndpointResourcePropertiesSerializer(
  item: MicrosoftDataCollectionDataCollectionEndpointResourceProperties,
): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : microsoftDataCollectionDataCollectionEndpointConfigurationAccessSerializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointMetricsIngestionSerializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : microsoftDataCollectionDataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function microsoftDataCollectionDataCollectionEndpointResourcePropertiesDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointResourceProperties {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : microsoftDataCollectionDataCollectionEndpointConfigurationAccessDeserializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointLogsIngestionDeserializer(
          item["logsIngestion"],
        ),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointMetricsIngestionDeserializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : microsoftDataCollectionDataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : microsoftDataCollectionPrivateLinkScopedResourceArrayDeserializer(
          item["privateLinkScopedResources"],
        ),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : microsoftDataCollectionDataCollectionEndpointFailoverConfigurationDeserializer(
          item["failoverConfiguration"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : microsoftDataCollectionDataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

/** The kind of the resource. */
export enum KnownMicrosoftDataCollectionKnownDataCollectionEndpointResourceKind {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * The kind of the resource. \
 * {@link KnownMicrosoftDataCollectionKnownDataCollectionEndpointResourceKind} can be used interchangeably with MicrosoftDataCollectionKnownDataCollectionEndpointResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux**: Linux \
 * **Windows**: Windows
 */
export type MicrosoftDataCollectionKnownDataCollectionEndpointResourceKind = string;

/** The SKU of the resource. */
export interface MicrosoftDataCollectionDataCollectionEndpointResourceSku extends Sku {}

export function microsoftDataCollectionDataCollectionEndpointResourceSkuSerializer(
  item: MicrosoftDataCollectionDataCollectionEndpointResourceSku,
): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function microsoftDataCollectionDataCollectionEndpointResourceSkuDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointResourceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Managed service identity of the resource. */
export interface MicrosoftDataCollectionDataCollectionEndpointResourceIdentity extends ManagedServiceIdentity {}

export function microsoftDataCollectionDataCollectionEndpointResourceIdentitySerializer(
  item: MicrosoftDataCollectionDataCollectionEndpointResourceIdentity,
): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function microsoftDataCollectionDataCollectionEndpointResourceIdentityDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointResourceIdentity {
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
export interface MicrosoftDataCollectionDataCollectionEndpoint {
  /** Description of the data collection endpoint. */
  description?: string;
  /** The immutable ID of this data collection endpoint resource. This property is READ-ONLY. */
  immutableId?: string;
  /** The endpoint used by clients to access their configuration. */
  configurationAccess?: MicrosoftDataCollectionDataCollectionEndpointConfigurationAccess;
  /** The endpoint used by clients to ingest logs. */
  logsIngestion?: MicrosoftDataCollectionDataCollectionEndpointLogsIngestion;
  /** The endpoint used by clients to ingest metrics. */
  metricsIngestion?: MicrosoftDataCollectionDataCollectionEndpointMetricsIngestion;
  /** Network access control rules for the endpoints. */
  networkAcls?: MicrosoftDataCollectionDataCollectionEndpointNetworkAcls;
  /** The resource provisioning state. This property is READ-ONLY. */
  readonly provisioningState?: MicrosoftDataCollectionKnownDataCollectionEndpointProvisioningState;
  /** List of Azure Monitor Private Link Scope Resources to which this data collection endpoint resource is associated. This property is READ-ONLY. */
  readonly privateLinkScopedResources?: MicrosoftDataCollectionPrivateLinkScopedResource[];
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly failoverConfiguration?: MicrosoftDataCollectionDataCollectionEndpointFailoverConfiguration;
  /** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
  readonly metadata?: MicrosoftDataCollectionDataCollectionEndpointMetadata;
}

export function microsoftDataCollectionDataCollectionEndpointSerializer(
  item: MicrosoftDataCollectionDataCollectionEndpoint,
): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : microsoftDataCollectionDataCollectionEndpointConfigurationAccessSerializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointMetricsIngestionSerializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : microsoftDataCollectionDataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function microsoftDataCollectionDataCollectionEndpointDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpoint {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : microsoftDataCollectionDataCollectionEndpointConfigurationAccessDeserializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointLogsIngestionDeserializer(
          item["logsIngestion"],
        ),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointMetricsIngestionDeserializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : microsoftDataCollectionDataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : microsoftDataCollectionPrivateLinkScopedResourceArrayDeserializer(
          item["privateLinkScopedResources"],
        ),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : microsoftDataCollectionDataCollectionEndpointFailoverConfigurationDeserializer(
          item["failoverConfiguration"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : microsoftDataCollectionDataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

/** The endpoint used by clients to access their configuration. */
export interface MicrosoftDataCollectionDataCollectionEndpointConfigurationAccess extends MicrosoftDataCollectionConfigurationAccessEndpointSpec {}

export function microsoftDataCollectionDataCollectionEndpointConfigurationAccessSerializer(
  _item: MicrosoftDataCollectionDataCollectionEndpointConfigurationAccess,
): any {
  return {};
}

export function microsoftDataCollectionDataCollectionEndpointConfigurationAccessDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointConfigurationAccess {
  return {
    endpoint: item["endpoint"],
  };
}

/** The endpoint used by clients to ingest logs. */
export interface MicrosoftDataCollectionDataCollectionEndpointLogsIngestion extends MicrosoftDataCollectionLogsIngestionEndpointSpec {}

export function microsoftDataCollectionDataCollectionEndpointLogsIngestionSerializer(
  _item: MicrosoftDataCollectionDataCollectionEndpointLogsIngestion,
): any {
  return {};
}

export function microsoftDataCollectionDataCollectionEndpointLogsIngestionDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointLogsIngestion {
  return {
    endpoint: item["endpoint"],
  };
}

/** The endpoint used by clients to ingest metrics. */
export interface MicrosoftDataCollectionDataCollectionEndpointMetricsIngestion extends MicrosoftDataCollectionMetricsIngestionEndpointSpec {}

export function microsoftDataCollectionDataCollectionEndpointMetricsIngestionSerializer(
  _item: MicrosoftDataCollectionDataCollectionEndpointMetricsIngestion,
): any {
  return {};
}

export function microsoftDataCollectionDataCollectionEndpointMetricsIngestionDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointMetricsIngestion {
  return {
    endpoint: item["endpoint"],
  };
}

/** Network access control rules for the endpoints. */
export interface MicrosoftDataCollectionDataCollectionEndpointNetworkAcls extends MicrosoftDataCollectionNetworkRuleSet {}

export function microsoftDataCollectionDataCollectionEndpointNetworkAclsSerializer(
  item: MicrosoftDataCollectionDataCollectionEndpointNetworkAcls,
): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function microsoftDataCollectionDataCollectionEndpointNetworkAclsDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointNetworkAcls {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The resource provisioning state. This property is READ-ONLY. */
export enum KnownMicrosoftDataCollectionKnownDataCollectionEndpointProvisioningState {
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
 * {@link KnownMicrosoftDataCollectionKnownDataCollectionEndpointProvisioningState} can be used interchangeably with MicrosoftDataCollectionKnownDataCollectionEndpointProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type MicrosoftDataCollectionKnownDataCollectionEndpointProvisioningState = string;

export function microsoftDataCollectionPrivateLinkScopedResourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionPrivateLinkScopedResource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPrivateLinkScopedResourceDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionPrivateLinkScopedResource */
export interface MicrosoftDataCollectionPrivateLinkScopedResource {
  /** The resourceId of the Azure Monitor Private Link Scope Scoped Resource through which this DCE is associated with a Azure Monitor Private Link Scope. */
  resourceId?: string;
  /** The immutableId of the Azure Monitor Private Link Scope Resource to which the association is. */
  scopeId?: string;
}

export function microsoftDataCollectionPrivateLinkScopedResourceDeserializer(
  item: any,
): MicrosoftDataCollectionPrivateLinkScopedResource {
  return {
    resourceId: item["resourceId"],
    scopeId: item["scopeId"],
  };
}

/** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
export interface MicrosoftDataCollectionDataCollectionEndpointFailoverConfiguration extends MicrosoftDataCollectionFailoverConfigurationSpec {}

export function microsoftDataCollectionDataCollectionEndpointFailoverConfigurationDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointFailoverConfiguration {
  return {
    activeLocation: item["activeLocation"],
    locations: !item["locations"]
      ? item["locations"]
      : microsoftDataCollectionLocationSpecArrayDeserializer(item["locations"]),
  };
}

/** Metadata for the resource. This property can only be updated by Log Analytics Control Plane for Data Collection Endpoint with Log Analytics Destination. */
export interface MicrosoftDataCollectionDataCollectionEndpointMetadata extends MicrosoftDataCollectionMetadata {}

export function microsoftDataCollectionDataCollectionEndpointMetadataDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionEndpointMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Definition of the endpoint used for accessing configuration. */
export interface MicrosoftDataCollectionConfigurationAccessEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function microsoftDataCollectionConfigurationAccessEndpointSpecSerializer(
  _item: MicrosoftDataCollectionConfigurationAccessEndpointSpec,
): any {
  return {};
}

export function microsoftDataCollectionConfigurationAccessEndpointSpecDeserializer(
  item: any,
): MicrosoftDataCollectionConfigurationAccessEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the endpoint used for ingesting logs. */
export interface MicrosoftDataCollectionLogsIngestionEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function microsoftDataCollectionLogsIngestionEndpointSpecSerializer(
  _item: MicrosoftDataCollectionLogsIngestionEndpointSpec,
): any {
  return {};
}

export function microsoftDataCollectionLogsIngestionEndpointSpecDeserializer(
  item: any,
): MicrosoftDataCollectionLogsIngestionEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the endpoint used for ingesting metrics. */
export interface MicrosoftDataCollectionMetricsIngestionEndpointSpec {
  /** The endpoint. This property is READ-ONLY. */
  readonly endpoint?: string;
}

export function microsoftDataCollectionMetricsIngestionEndpointSpecSerializer(
  _item: MicrosoftDataCollectionMetricsIngestionEndpointSpec,
): any {
  return {};
}

export function microsoftDataCollectionMetricsIngestionEndpointSpecDeserializer(
  item: any,
): MicrosoftDataCollectionMetricsIngestionEndpointSpec {
  return {
    endpoint: item["endpoint"],
  };
}

/** Definition of the network rules. */
export interface MicrosoftDataCollectionNetworkRuleSet {
  /** The configuration to set whether network access from public internet to the endpoints are allowed. */
  publicNetworkAccess?: MicrosoftDataCollectionKnownPublicNetworkAccessOptions;
}

export function microsoftDataCollectionNetworkRuleSetSerializer(
  item: MicrosoftDataCollectionNetworkRuleSet,
): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function microsoftDataCollectionNetworkRuleSetDeserializer(
  item: any,
): MicrosoftDataCollectionNetworkRuleSet {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The configuration to set whether network access from public internet to the endpoints are allowed. */
export enum KnownMicrosoftDataCollectionKnownPublicNetworkAccessOptions {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * The configuration to set whether network access from public internet to the endpoints are allowed. \
 * {@link KnownMicrosoftDataCollectionKnownPublicNetworkAccessOptions} can be used interchangeably with MicrosoftDataCollectionKnownPublicNetworkAccessOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled \
 * **SecuredByPerimeter**: SecuredByPerimeter
 */
export type MicrosoftDataCollectionKnownPublicNetworkAccessOptions = string;

/** model interface MicrosoftDataCollectionFailoverConfigurationSpec */
export interface MicrosoftDataCollectionFailoverConfigurationSpec {
  /** Active location where data flow will occur. */
  activeLocation?: string;
  /** Locations that are configured for failover. */
  locations?: MicrosoftDataCollectionLocationSpec[];
}

export function microsoftDataCollectionFailoverConfigurationSpecDeserializer(
  item: any,
): MicrosoftDataCollectionFailoverConfigurationSpec {
  return {
    activeLocation: item["activeLocation"],
    locations: !item["locations"]
      ? item["locations"]
      : microsoftDataCollectionLocationSpecArrayDeserializer(item["locations"]),
  };
}

export function microsoftDataCollectionLocationSpecArrayDeserializer(
  result: Array<MicrosoftDataCollectionLocationSpec>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionLocationSpecDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionLocationSpec */
export interface MicrosoftDataCollectionLocationSpec {
  /** Name of location. */
  location?: string;
  /** The resource provisioning state in this location. */
  provisioningStatus?: MicrosoftDataCollectionKnownLocationSpecProvisioningStatus;
}

export function microsoftDataCollectionLocationSpecDeserializer(
  item: any,
): MicrosoftDataCollectionLocationSpec {
  return {
    location: item["location"],
    provisioningStatus: item["provisioningStatus"],
  };
}

/** The resource provisioning state in this location. */
export enum KnownMicrosoftDataCollectionKnownLocationSpecProvisioningStatus {
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
 * {@link KnownMicrosoftDataCollectionKnownLocationSpecProvisioningStatus} can be used interchangeably with MicrosoftDataCollectionKnownLocationSpecProvisioningStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type MicrosoftDataCollectionKnownLocationSpecProvisioningStatus = string;

/** Metadata about the resource */
export interface MicrosoftDataCollectionMetadata {
  /** Azure offering managing this resource on-behalf-of customer. */
  readonly provisionedBy?: string;
  /** Resource Id of azure offering managing this resource on-behalf-of customer. */
  readonly provisionedByResourceId?: string;
  /** Immutable Id of azure offering managing this resource on-behalf-of customer. */
  readonly provisionedByImmutableId?: string;
}

export function microsoftDataCollectionMetadataDeserializer(
  item: any,
): MicrosoftDataCollectionMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface MicrosoftDataCollectionErrorResponseCommonV2 {
  /** The error object. */
  error?: ErrorDetail;
}

export function microsoftDataCollectionErrorResponseCommonV2Deserializer(
  item: any,
): MicrosoftDataCollectionErrorResponseCommonV2 {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Definition of ARM tracked top level resource properties for update operation. */
export interface MicrosoftDataCollectionResourceForUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed Service Identity. */
  identity?: MicrosoftDataCollectionResourceForUpdateIdentity;
}

export function microsoftDataCollectionResourceForUpdateSerializer(
  item: MicrosoftDataCollectionResourceForUpdate,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : microsoftDataCollectionResourceForUpdateIdentitySerializer(item["identity"]),
  };
}

/** Managed Service Identity. */
export interface MicrosoftDataCollectionResourceForUpdateIdentity extends ManagedServiceIdentity {}

export function microsoftDataCollectionResourceForUpdateIdentitySerializer(
  item: MicrosoftDataCollectionResourceForUpdateIdentity,
): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function microsoftDataCollectionDataCollectionEndpointResourceArraySerializer(
  result: Array<MicrosoftDataCollectionDataCollectionEndpointResource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionDataCollectionEndpointResourceSerializer(item);
  });
}

export function microsoftDataCollectionDataCollectionEndpointResourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionDataCollectionEndpointResource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionDataCollectionEndpointResourceDeserializer(item);
  });
}

export function microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceArraySerializer(
  result: Array<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceSerializer(item);
  });
}

export function microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceDeserializer(item);
  });
}

/** Definition of generic ARM proxy resource. */
export interface MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource extends ExtensionResource {
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the association. */
  description?: string;
  /** The resource ID of the data collection rule that is to be associated. */
  dataCollectionRuleId?: string;
  /** The resource ID of the data collection endpoint that is to be associated. */
  dataCollectionEndpointId?: string;
  /** The resource provisioning state. */
  readonly provisioningState?: MicrosoftDataCollectionKnownDataCollectionRuleAssociationProvisioningState;
  /** Metadata about the resource */
  readonly metadata?: MicrosoftDataCollectionDataCollectionRuleAssociationMetadata;
}

export function microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource,
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

export function microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource {
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

/** model interface MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceProperties */
export interface MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceProperties extends MicrosoftDataCollectionDataCollectionRuleAssociation {}

export function microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourcePropertiesSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceProperties,
): any {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
  };
}

export function microsoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourcePropertiesDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResourceProperties {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    provisioningState: item["provisioningState"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : microsoftDataCollectionDataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

/** Definition of association of a data collection rule with a monitored Azure resource. */
export interface MicrosoftDataCollectionDataCollectionRuleAssociation {
  /** Description of the association. */
  description?: string;
  /** The resource ID of the data collection rule that is to be associated. */
  dataCollectionRuleId?: string;
  /** The resource ID of the data collection endpoint that is to be associated. */
  dataCollectionEndpointId?: string;
  /** The resource provisioning state. */
  readonly provisioningState?: MicrosoftDataCollectionKnownDataCollectionRuleAssociationProvisioningState;
  /** Metadata about the resource */
  readonly metadata?: MicrosoftDataCollectionDataCollectionRuleAssociationMetadata;
}

export function microsoftDataCollectionDataCollectionRuleAssociationSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleAssociation,
): any {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
  };
}

export function microsoftDataCollectionDataCollectionRuleAssociationDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleAssociation {
  return {
    description: item["description"],
    dataCollectionRuleId: item["dataCollectionRuleId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    provisioningState: item["provisioningState"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : microsoftDataCollectionDataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

/** The resource provisioning state. */
export enum KnownMicrosoftDataCollectionKnownDataCollectionRuleAssociationProvisioningState {
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
 * {@link KnownMicrosoftDataCollectionKnownDataCollectionRuleAssociationProvisioningState} can be used interchangeably with MicrosoftDataCollectionKnownDataCollectionRuleAssociationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type MicrosoftDataCollectionKnownDataCollectionRuleAssociationProvisioningState = string;

/** Metadata about the resource */
export interface MicrosoftDataCollectionDataCollectionRuleAssociationMetadata extends MicrosoftDataCollectionMetadata {}

export function microsoftDataCollectionDataCollectionRuleAssociationMetadataDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleAssociationMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Definition of ARM tracked top level resource. */
export interface MicrosoftDataCollectionDataCollectionRuleResource extends TrackedResource {
  /** The kind of the resource. */
  kind?: MicrosoftDataCollectionKnownDataCollectionRuleResourceKind;
  /** The SKU of the resource. */
  sku?: MicrosoftDataCollectionDataCollectionRuleResourceSku;
  /** Managed service identity of the resource. */
  identity?: MicrosoftDataCollectionDataCollectionRuleResourceIdentity;
  /** Resource entity tag (ETag). */
  readonly etag?: string;
  /** Description of the data collection rule. */
  description?: string;
  /** The immutable ID of this data collection rule. This property is READ-ONLY. */
  readonly immutableId?: string;
  /** The resource ID of the data collection endpoint that this rule can be used with. */
  dataCollectionEndpointId?: string;
  /** Metadata about the resource */
  readonly metadata?: MicrosoftDataCollectionDataCollectionRuleMetadata;
  /** Defines the ingestion endpoints to send data to via this rule. */
  readonly endpoints?: MicrosoftDataCollectionDataCollectionRuleEndpoints;
  /** Defines all the references that may be used in other sections of the DCR */
  references?: MicrosoftDataCollectionDataCollectionRuleReferences;
  /** Agent settings used to modify agent behavior on a given host */
  agentSettings?: MicrosoftDataCollectionDataCollectionRuleAgentSettings;
  /** Declaration of custom streams used in this rule. */
  streamDeclarations?: Record<string, MicrosoftDataCollectionStreamDeclaration>;
  /**
   * The specification of data sources.
   * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
   */
  dataSources?: MicrosoftDataCollectionDataCollectionRuleDataSources;
  /**
   * The specification of direct data sources.
   * This property is optional and can be omitted.
   */
  directDataSources?: MicrosoftDataCollectionDataCollectionRuleDirectDataSources;
  /** The specification of destinations. */
  destinations?: MicrosoftDataCollectionDataCollectionRuleDestinations;
  /** The specification of data flows. */
  dataFlows?: MicrosoftDataCollectionDataFlow[];
  /** The specification for ingestion limits */
  readonly ingestionQuotas?: MicrosoftDataCollectionDataCollectionRuleIngestionQuotas;
  /** The resource provisioning state. */
  readonly provisioningState?: MicrosoftDataCollectionKnownDataCollectionRuleProvisioningState;
}

export function microsoftDataCollectionDataCollectionRuleResourceSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleResource,
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
      : microsoftDataCollectionDataCollectionRuleResourceSkuSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftDataCollectionDataCollectionRuleResourceIdentitySerializer(item["identity"]),
  };
}

export function microsoftDataCollectionDataCollectionRuleResourceDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleResource {
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
      : microsoftDataCollectionDataCollectionRuleResourceSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : microsoftDataCollectionDataCollectionRuleResourceIdentityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** model interface MicrosoftDataCollectionDataCollectionRuleResourceProperties */
export interface MicrosoftDataCollectionDataCollectionRuleResourceProperties extends MicrosoftDataCollectionDataCollectionRule {}

export function microsoftDataCollectionDataCollectionRuleResourcePropertiesSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleResourceProperties,
): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : microsoftDataCollectionDataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : microsoftDataCollectionDataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : microsoftDataCollectionStreamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : microsoftDataCollectionDataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : microsoftDataCollectionDataCollectionRuleDirectDataSourcesSerializer(
          item["directDataSources"],
        ),
    destinations: !item["destinations"]
      ? item["destinations"]
      : microsoftDataCollectionDataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : microsoftDataCollectionDataFlowArraySerializer(item["dataFlows"]),
  };
}

export function microsoftDataCollectionDataCollectionRuleResourcePropertiesDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleResourceProperties {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : microsoftDataCollectionDataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : microsoftDataCollectionDataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : microsoftDataCollectionDataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : microsoftDataCollectionDataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : microsoftDataCollectionStreamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : microsoftDataCollectionDataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : microsoftDataCollectionDataCollectionRuleDirectDataSourcesDeserializer(
          item["directDataSources"],
        ),
    destinations: !item["destinations"]
      ? item["destinations"]
      : microsoftDataCollectionDataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : microsoftDataCollectionDataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : microsoftDataCollectionDataCollectionRuleIngestionQuotasDeserializer(
          item["ingestionQuotas"],
        ),
    provisioningState: item["provisioningState"],
  };
}

/** The kind of the resource. */
export enum KnownMicrosoftDataCollectionKnownDataCollectionRuleResourceKind {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * The kind of the resource. \
 * {@link KnownMicrosoftDataCollectionKnownDataCollectionRuleResourceKind} can be used interchangeably with MicrosoftDataCollectionKnownDataCollectionRuleResourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux**: Linux \
 * **Windows**: Windows
 */
export type MicrosoftDataCollectionKnownDataCollectionRuleResourceKind = string;

/** The SKU of the resource. */
export interface MicrosoftDataCollectionDataCollectionRuleResourceSku extends Sku {}

export function microsoftDataCollectionDataCollectionRuleResourceSkuSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleResourceSku,
): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function microsoftDataCollectionDataCollectionRuleResourceSkuDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleResourceSku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Managed service identity of the resource. */
export interface MicrosoftDataCollectionDataCollectionRuleResourceIdentity extends ManagedServiceIdentity {}

export function microsoftDataCollectionDataCollectionRuleResourceIdentitySerializer(
  item: MicrosoftDataCollectionDataCollectionRuleResourceIdentity,
): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function microsoftDataCollectionDataCollectionRuleResourceIdentityDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleResourceIdentity {
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
export interface MicrosoftDataCollectionDataCollectionRule {
  /** Description of the data collection rule. */
  description?: string;
  /** The immutable ID of this data collection rule. This property is READ-ONLY. */
  readonly immutableId?: string;
  /** The resource ID of the data collection endpoint that this rule can be used with. */
  dataCollectionEndpointId?: string;
  /** Metadata about the resource */
  readonly metadata?: MicrosoftDataCollectionDataCollectionRuleMetadata;
  /** Defines the ingestion endpoints to send data to via this rule. */
  readonly endpoints?: MicrosoftDataCollectionDataCollectionRuleEndpoints;
  /** Defines all the references that may be used in other sections of the DCR */
  references?: MicrosoftDataCollectionDataCollectionRuleReferences;
  /** Agent settings used to modify agent behavior on a given host */
  agentSettings?: MicrosoftDataCollectionDataCollectionRuleAgentSettings;
  /** Declaration of custom streams used in this rule. */
  streamDeclarations?: Record<string, MicrosoftDataCollectionStreamDeclaration>;
  /**
   * The specification of data sources.
   * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
   */
  dataSources?: MicrosoftDataCollectionDataCollectionRuleDataSources;
  /**
   * The specification of direct data sources.
   * This property is optional and can be omitted.
   */
  directDataSources?: MicrosoftDataCollectionDataCollectionRuleDirectDataSources;
  /** The specification of destinations. */
  destinations?: MicrosoftDataCollectionDataCollectionRuleDestinations;
  /** The specification of data flows. */
  dataFlows?: MicrosoftDataCollectionDataFlow[];
  /** The specification for ingestion limits */
  readonly ingestionQuotas?: MicrosoftDataCollectionDataCollectionRuleIngestionQuotas;
  /** The resource provisioning state. */
  readonly provisioningState?: MicrosoftDataCollectionKnownDataCollectionRuleProvisioningState;
}

export function microsoftDataCollectionDataCollectionRuleSerializer(
  item: MicrosoftDataCollectionDataCollectionRule,
): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : microsoftDataCollectionDataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : microsoftDataCollectionDataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : microsoftDataCollectionStreamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : microsoftDataCollectionDataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : microsoftDataCollectionDataCollectionRuleDirectDataSourcesSerializer(
          item["directDataSources"],
        ),
    destinations: !item["destinations"]
      ? item["destinations"]
      : microsoftDataCollectionDataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : microsoftDataCollectionDataFlowArraySerializer(item["dataFlows"]),
  };
}

export function microsoftDataCollectionDataCollectionRuleDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRule {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : microsoftDataCollectionDataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : microsoftDataCollectionDataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : microsoftDataCollectionDataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : microsoftDataCollectionDataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : microsoftDataCollectionStreamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : microsoftDataCollectionDataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : microsoftDataCollectionDataCollectionRuleDirectDataSourcesDeserializer(
          item["directDataSources"],
        ),
    destinations: !item["destinations"]
      ? item["destinations"]
      : microsoftDataCollectionDataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : microsoftDataCollectionDataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : microsoftDataCollectionDataCollectionRuleIngestionQuotasDeserializer(
          item["ingestionQuotas"],
        ),
    provisioningState: item["provisioningState"],
  };
}

/** Metadata about the resource */
export interface MicrosoftDataCollectionDataCollectionRuleMetadata extends MicrosoftDataCollectionMetadata {}

export function microsoftDataCollectionDataCollectionRuleMetadataDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleMetadata {
  return {
    provisionedBy: item["provisionedBy"],
    provisionedByResourceId: item["provisionedByResourceId"],
    provisionedByImmutableId: item["provisionedByImmutableId"],
  };
}

/** Defines the ingestion endpoints to send data to via this rule. */
export interface MicrosoftDataCollectionDataCollectionRuleEndpoints extends MicrosoftDataCollectionEndpointsSpec {}

export function microsoftDataCollectionDataCollectionRuleEndpointsDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleEndpoints {
  return {
    logsIngestion: item["logsIngestion"],
    metricsIngestion: item["metricsIngestion"],
  };
}

/** Defines all the references that may be used in other sections of the DCR */
export interface MicrosoftDataCollectionDataCollectionRuleReferences extends MicrosoftDataCollectionReferencesSpec {}

export function microsoftDataCollectionDataCollectionRuleReferencesSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleReferences,
): any {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : microsoftDataCollectionReferencesSpecEnrichmentDataSerializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : microsoftDataCollectionApplicationInsightsArraySerializer(item["applicationInsights"]),
  };
}

export function microsoftDataCollectionDataCollectionRuleReferencesDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleReferences {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : microsoftDataCollectionReferencesSpecEnrichmentDataDeserializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : microsoftDataCollectionApplicationInsightsArrayDeserializer(item["applicationInsights"]),
  };
}

/** Agent settings used to modify agent behavior on a given host */
export interface MicrosoftDataCollectionDataCollectionRuleAgentSettings extends MicrosoftDataCollectionAgentSettingsSpec {}

export function microsoftDataCollectionDataCollectionRuleAgentSettingsSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleAgentSettings,
): any {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : microsoftDataCollectionAgentSettingArraySerializer(item["logs"]),
  };
}

export function microsoftDataCollectionDataCollectionRuleAgentSettingsDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleAgentSettings {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : microsoftDataCollectionAgentSettingArrayDeserializer(item["logs"]),
  };
}

export function microsoftDataCollectionStreamDeclarationRecordSerializer(
  item: Record<string, MicrosoftDataCollectionStreamDeclaration>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : microsoftDataCollectionStreamDeclarationSerializer(item[key]);
  });
  return result;
}

export function microsoftDataCollectionStreamDeclarationRecordDeserializer(
  item: Record<string, any>,
): Record<string, MicrosoftDataCollectionStreamDeclaration> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : microsoftDataCollectionStreamDeclarationDeserializer(item[key]);
  });
  return result;
}

/** Declaration of a custom stream. */
export interface MicrosoftDataCollectionStreamDeclaration {
  /** List of columns used by data in this stream. */
  columns?: MicrosoftDataCollectionColumnDefinition[];
}

export function microsoftDataCollectionStreamDeclarationSerializer(
  item: MicrosoftDataCollectionStreamDeclaration,
): any {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : microsoftDataCollectionColumnDefinitionArraySerializer(item["columns"]),
  };
}

export function microsoftDataCollectionStreamDeclarationDeserializer(
  item: any,
): MicrosoftDataCollectionStreamDeclaration {
  return {
    columns: !item["columns"]
      ? item["columns"]
      : microsoftDataCollectionColumnDefinitionArrayDeserializer(item["columns"]),
  };
}

export function microsoftDataCollectionColumnDefinitionArraySerializer(
  result: Array<MicrosoftDataCollectionColumnDefinition>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionColumnDefinitionSerializer(item);
  });
}

export function microsoftDataCollectionColumnDefinitionArrayDeserializer(
  result: Array<MicrosoftDataCollectionColumnDefinition>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionColumnDefinitionDeserializer(item);
  });
}

/** Definition of custom data column. */
export interface MicrosoftDataCollectionColumnDefinition {
  /** The name of the column. */
  name?: string;
  /** The type of the column data. */
  type?: MicrosoftDataCollectionKnownColumnDefinitionType;
}

export function microsoftDataCollectionColumnDefinitionSerializer(
  item: MicrosoftDataCollectionColumnDefinition,
): any {
  return { name: item["name"], type: item["type"] };
}

export function microsoftDataCollectionColumnDefinitionDeserializer(
  item: any,
): MicrosoftDataCollectionColumnDefinition {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of the column data. */
export enum KnownMicrosoftDataCollectionKnownColumnDefinitionType {
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
 * {@link KnownMicrosoftDataCollectionKnownColumnDefinitionType} can be used interchangeably with MicrosoftDataCollectionKnownColumnDefinitionType,
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
export type MicrosoftDataCollectionKnownColumnDefinitionType = string;

/**
 * The specification of data sources.
 * This property is optional and can be omitted if the rule is meant to be used via direct calls to the provisioned endpoint.
 */
export interface MicrosoftDataCollectionDataCollectionRuleDataSources extends MicrosoftDataCollectionDataSourcesSpec {}

export function microsoftDataCollectionDataCollectionRuleDataSourcesSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleDataSources,
): any {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : microsoftDataCollectionPerfCounterDataSourceArraySerializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : microsoftDataCollectionPerformanceCountersOTelDataSourceArraySerializer(
          item["performanceCountersOTel"],
        ),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : microsoftDataCollectionWindowsEventLogDataSourceArraySerializer(item["windowsEventLogs"]),
    syslog: !item["syslog"]
      ? item["syslog"]
      : microsoftDataCollectionSyslogDataSourceArraySerializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : microsoftDataCollectionExtensionDataSourceArraySerializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : microsoftDataCollectionLogFilesDataSourceArraySerializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : microsoftDataCollectionIisLogsDataSourceArraySerializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : microsoftDataCollectionWindowsFirewallLogsDataSourceArraySerializer(
          item["windowsFirewallLogs"],
        ),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : microsoftDataCollectionPrometheusForwarderDataSourceArraySerializer(
          item["prometheusForwarder"],
        ),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : microsoftDataCollectionPlatformTelemetryDataSourceArraySerializer(
          item["platformTelemetry"],
        ),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : microsoftDataCollectionDataSourcesSpecDataImportsSerializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : microsoftDataCollectionOtelLogsDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : microsoftDataCollectionOtelTracesDataSourceArraySerializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : microsoftDataCollectionOtelMetricsDataSourceArraySerializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : microsoftDataCollectionEtwProviderDataSourceArraySerializer(item["etwProviders"]),
  };
}

export function microsoftDataCollectionDataCollectionRuleDataSourcesDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleDataSources {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : microsoftDataCollectionPerfCounterDataSourceArrayDeserializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : microsoftDataCollectionPerformanceCountersOTelDataSourceArrayDeserializer(
          item["performanceCountersOTel"],
        ),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : microsoftDataCollectionWindowsEventLogDataSourceArrayDeserializer(item["windowsEventLogs"]),
    syslog: !item["syslog"]
      ? item["syslog"]
      : microsoftDataCollectionSyslogDataSourceArrayDeserializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : microsoftDataCollectionExtensionDataSourceArrayDeserializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : microsoftDataCollectionLogFilesDataSourceArrayDeserializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : microsoftDataCollectionIisLogsDataSourceArrayDeserializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : microsoftDataCollectionWindowsFirewallLogsDataSourceArrayDeserializer(
          item["windowsFirewallLogs"],
        ),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : microsoftDataCollectionPrometheusForwarderDataSourceArrayDeserializer(
          item["prometheusForwarder"],
        ),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : microsoftDataCollectionPlatformTelemetryDataSourceArrayDeserializer(
          item["platformTelemetry"],
        ),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : microsoftDataCollectionDataSourcesSpecDataImportsDeserializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : microsoftDataCollectionOtelLogsDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : microsoftDataCollectionOtelTracesDataSourceArrayDeserializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : microsoftDataCollectionOtelMetricsDataSourceArrayDeserializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : microsoftDataCollectionEtwProviderDataSourceArrayDeserializer(item["etwProviders"]),
  };
}

/**
 * The specification of direct data sources.
 * This property is optional and can be omitted.
 */
export interface MicrosoftDataCollectionDataCollectionRuleDirectDataSources extends MicrosoftDataCollectionDirectDataSourcesSpec {}

export function microsoftDataCollectionDataCollectionRuleDirectDataSourcesSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleDirectDataSources,
): any {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : microsoftDataCollectionOtelMetricsDirectDataSourceArraySerializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : microsoftDataCollectionOtelLogsDirectDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : microsoftDataCollectionOtelTracesDirectDataSourceArraySerializer(item["otelTraces"]),
  };
}

export function microsoftDataCollectionDataCollectionRuleDirectDataSourcesDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleDirectDataSources {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : microsoftDataCollectionOtelMetricsDirectDataSourceArrayDeserializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : microsoftDataCollectionOtelLogsDirectDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : microsoftDataCollectionOtelTracesDirectDataSourceArrayDeserializer(item["otelTraces"]),
  };
}

/** The specification of destinations. */
export interface MicrosoftDataCollectionDataCollectionRuleDestinations extends MicrosoftDataCollectionDestinationsSpec {}

export function microsoftDataCollectionDataCollectionRuleDestinationsSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleDestinations,
): any {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : microsoftDataCollectionLogAnalyticsDestinationArraySerializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : microsoftDataCollectionMonitoringAccountDestinationArraySerializer(
          item["monitoringAccounts"],
        ),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : microsoftDataCollectionDestinationsSpecAzureMonitorMetricsSerializer(
          item["azureMonitorMetrics"],
        ),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : microsoftDataCollectionEventHubDestinationArraySerializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : microsoftDataCollectionEventHubDirectDestinationArraySerializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : microsoftDataCollectionStorageBlobDestinationArraySerializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : microsoftDataCollectionStorageTableDestinationArraySerializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : microsoftDataCollectionStorageBlobDestinationArraySerializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : microsoftDataCollectionMicrosoftFabricDestinationArraySerializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : microsoftDataCollectionAdxDestinationArraySerializer(item["azureDataExplorer"]),
  };
}

export function microsoftDataCollectionDataCollectionRuleDestinationsDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleDestinations {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : microsoftDataCollectionLogAnalyticsDestinationArrayDeserializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : microsoftDataCollectionMonitoringAccountDestinationArrayDeserializer(
          item["monitoringAccounts"],
        ),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : microsoftDataCollectionDestinationsSpecAzureMonitorMetricsDeserializer(
          item["azureMonitorMetrics"],
        ),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : microsoftDataCollectionEventHubDestinationArrayDeserializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : microsoftDataCollectionEventHubDirectDestinationArrayDeserializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : microsoftDataCollectionStorageBlobDestinationArrayDeserializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : microsoftDataCollectionStorageTableDestinationArrayDeserializer(
          item["storageTablesDirect"],
        ),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : microsoftDataCollectionStorageBlobDestinationArrayDeserializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : microsoftDataCollectionMicrosoftFabricDestinationArrayDeserializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : microsoftDataCollectionAdxDestinationArrayDeserializer(item["azureDataExplorer"]),
  };
}

export function microsoftDataCollectionDataFlowArraySerializer(
  result: Array<MicrosoftDataCollectionDataFlow>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionDataFlowSerializer(item);
  });
}

export function microsoftDataCollectionDataFlowArrayDeserializer(
  result: Array<MicrosoftDataCollectionDataFlow>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionDataFlowDeserializer(item);
  });
}

/** Definition of which streams are sent to which destinations. */
export interface MicrosoftDataCollectionDataFlow {
  /** List of streams for this data flow. */
  streams?: MicrosoftDataCollectionKnownDataFlowStreams[];
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

export function microsoftDataCollectionDataFlowSerializer(
  item: MicrosoftDataCollectionDataFlow,
): any {
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

export function microsoftDataCollectionDataFlowDeserializer(
  item: any,
): MicrosoftDataCollectionDataFlow {
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
export enum KnownMicrosoftDataCollectionKnownDataFlowStreams {
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

/** Type of MicrosoftDataCollectionKnownDataFlowStreams */
export type MicrosoftDataCollectionKnownDataFlowStreams = string;

/** The specification for ingestion limits */
export interface MicrosoftDataCollectionDataCollectionRuleIngestionQuotas extends MicrosoftDataCollectionIngestionQuotas {}

export function microsoftDataCollectionDataCollectionRuleIngestionQuotasDeserializer(
  item: any,
): MicrosoftDataCollectionDataCollectionRuleIngestionQuotas {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : microsoftDataCollectionIngestionQuotasLogsDeserializer(item["logs"]),
  };
}

/** The resource provisioning state. */
export enum KnownMicrosoftDataCollectionKnownDataCollectionRuleProvisioningState {
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
 * {@link KnownMicrosoftDataCollectionKnownDataCollectionRuleProvisioningState} can be used interchangeably with MicrosoftDataCollectionKnownDataCollectionRuleProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Canceled**: Canceled \
 * **Failed**: Failed
 */
export type MicrosoftDataCollectionKnownDataCollectionRuleProvisioningState = string;

/** This defines all the ingestion endpoints that can be used by this rule */
export interface MicrosoftDataCollectionEndpointsSpec {
  /** The ingestion endpoint for logs */
  readonly logsIngestion?: string;
  /** The ingestion endpoint for metrics */
  readonly metricsIngestion?: string;
}

export function microsoftDataCollectionEndpointsSpecDeserializer(
  item: any,
): MicrosoftDataCollectionEndpointsSpec {
  return {
    logsIngestion: item["logsIngestion"],
    metricsIngestion: item["metricsIngestion"],
  };
}

/** This section defines all the references that may be used in other sections of the DCR */
export interface MicrosoftDataCollectionReferencesSpec {
  /** All the enrichment data sources referenced in data flows */
  enrichmentData?: MicrosoftDataCollectionReferencesSpecEnrichmentData;
  /** Application Insights references to be used on OTel metrics/logs enrichment */
  applicationInsights?: MicrosoftDataCollectionApplicationInsights[];
}

export function microsoftDataCollectionReferencesSpecSerializer(
  item: MicrosoftDataCollectionReferencesSpec,
): any {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : microsoftDataCollectionReferencesSpecEnrichmentDataSerializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : microsoftDataCollectionApplicationInsightsArraySerializer(item["applicationInsights"]),
  };
}

export function microsoftDataCollectionReferencesSpecDeserializer(
  item: any,
): MicrosoftDataCollectionReferencesSpec {
  return {
    enrichmentData: !item["enrichmentData"]
      ? item["enrichmentData"]
      : microsoftDataCollectionReferencesSpecEnrichmentDataDeserializer(item["enrichmentData"]),
    applicationInsights: !item["applicationInsights"]
      ? item["applicationInsights"]
      : microsoftDataCollectionApplicationInsightsArrayDeserializer(item["applicationInsights"]),
  };
}

/** All the enrichment data sources referenced in data flows */
export interface MicrosoftDataCollectionReferencesSpecEnrichmentData extends MicrosoftDataCollectionEnrichmentData {}

export function microsoftDataCollectionReferencesSpecEnrichmentDataSerializer(
  item: MicrosoftDataCollectionReferencesSpecEnrichmentData,
): any {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : microsoftDataCollectionStorageBlobArraySerializer(item["storageBlobs"]),
  };
}

export function microsoftDataCollectionReferencesSpecEnrichmentDataDeserializer(
  item: any,
): MicrosoftDataCollectionReferencesSpecEnrichmentData {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : microsoftDataCollectionStorageBlobArrayDeserializer(item["storageBlobs"]),
  };
}

export function microsoftDataCollectionApplicationInsightsArraySerializer(
  result: Array<MicrosoftDataCollectionApplicationInsights>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionApplicationInsightsSerializer(item);
  });
}

export function microsoftDataCollectionApplicationInsightsArrayDeserializer(
  result: Array<MicrosoftDataCollectionApplicationInsights>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionApplicationInsightsDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionApplicationInsights */
export interface MicrosoftDataCollectionApplicationInsights {
  /** Id of the application insights resource */
  resourceId: string;
  /** The name of the reference used as an alias when referencing this application insights in Otel data sources */
  name: string;
}

export function microsoftDataCollectionApplicationInsightsSerializer(
  item: MicrosoftDataCollectionApplicationInsights,
): any {
  return { resourceId: item["resourceId"], name: item["name"] };
}

export function microsoftDataCollectionApplicationInsightsDeserializer(
  item: any,
): MicrosoftDataCollectionApplicationInsights {
  return {
    resourceId: item["resourceId"],
    name: item["name"],
  };
}

/** All the enrichment data sources referenced in data flows */
export interface MicrosoftDataCollectionEnrichmentData {
  /** All the storage blobs used as enrichment data sources */
  storageBlobs?: MicrosoftDataCollectionStorageBlob[];
}

export function microsoftDataCollectionEnrichmentDataSerializer(
  item: MicrosoftDataCollectionEnrichmentData,
): any {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : microsoftDataCollectionStorageBlobArraySerializer(item["storageBlobs"]),
  };
}

export function microsoftDataCollectionEnrichmentDataDeserializer(
  item: any,
): MicrosoftDataCollectionEnrichmentData {
  return {
    storageBlobs: !item["storageBlobs"]
      ? item["storageBlobs"]
      : microsoftDataCollectionStorageBlobArrayDeserializer(item["storageBlobs"]),
  };
}

export function microsoftDataCollectionStorageBlobArraySerializer(
  result: Array<MicrosoftDataCollectionStorageBlob>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionStorageBlobSerializer(item);
  });
}

export function microsoftDataCollectionStorageBlobArrayDeserializer(
  result: Array<MicrosoftDataCollectionStorageBlob>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionStorageBlobDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionStorageBlob */
export interface MicrosoftDataCollectionStorageBlob {
  /** Resource Id of the storage account that hosts the blob */
  resourceId?: string;
  /** Url of the storage blob */
  blobUrl?: string;
  /** The type of lookup to perform on the blob */
  lookupType?: MicrosoftDataCollectionKnownStorageBlobLookupType;
  /** The name of the enrichment data source used as an alias when referencing this data source in data flows */
  name?: string;
}

export function microsoftDataCollectionStorageBlobSerializer(
  item: MicrosoftDataCollectionStorageBlob,
): any {
  return {
    resourceId: item["resourceId"],
    blobUrl: item["blobUrl"],
    lookupType: item["lookupType"],
    name: item["name"],
  };
}

export function microsoftDataCollectionStorageBlobDeserializer(
  item: any,
): MicrosoftDataCollectionStorageBlob {
  return {
    resourceId: item["resourceId"],
    blobUrl: item["blobUrl"],
    lookupType: item["lookupType"],
    name: item["name"],
  };
}

/** The type of lookup to perform on the blob */
export enum KnownMicrosoftDataCollectionKnownStorageBlobLookupType {
  /** String */
  String = "String",
  /** Cidr */
  Cidr = "Cidr",
}

/**
 * The type of lookup to perform on the blob \
 * {@link KnownMicrosoftDataCollectionKnownStorageBlobLookupType} can be used interchangeably with MicrosoftDataCollectionKnownStorageBlobLookupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **String**: String \
 * **Cidr**: Cidr
 */
export type MicrosoftDataCollectionKnownStorageBlobLookupType = string;

/** An agent setting */
export interface MicrosoftDataCollectionAgentSettingsSpec {
  /** All the settings that are applicable to the logs agent (AMA) */
  logs?: MicrosoftDataCollectionAgentSetting[];
}

export function microsoftDataCollectionAgentSettingsSpecSerializer(
  item: MicrosoftDataCollectionAgentSettingsSpec,
): any {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : microsoftDataCollectionAgentSettingArraySerializer(item["logs"]),
  };
}

export function microsoftDataCollectionAgentSettingsSpecDeserializer(
  item: any,
): MicrosoftDataCollectionAgentSettingsSpec {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : microsoftDataCollectionAgentSettingArrayDeserializer(item["logs"]),
  };
}

export function microsoftDataCollectionAgentSettingArraySerializer(
  result: Array<MicrosoftDataCollectionAgentSetting>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionAgentSettingSerializer(item);
  });
}

export function microsoftDataCollectionAgentSettingArrayDeserializer(
  result: Array<MicrosoftDataCollectionAgentSetting>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionAgentSettingDeserializer(item);
  });
}

/** A setting used to control an agent behavior on a host machine */
export interface MicrosoftDataCollectionAgentSetting {
  /**
   * The name of the setting.
   * Must be part of the list of supported settings
   */
  name?: MicrosoftDataCollectionKnownAgentSettingName;
  /** The value of the setting */
  value?: string;
}

export function microsoftDataCollectionAgentSettingSerializer(
  item: MicrosoftDataCollectionAgentSetting,
): any {
  return { name: item["name"], value: item["value"] };
}

export function microsoftDataCollectionAgentSettingDeserializer(
  item: any,
): MicrosoftDataCollectionAgentSetting {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/**
 * The name of the setting.
 * Must be part of the list of supported settings
 */
export enum KnownMicrosoftDataCollectionKnownAgentSettingName {
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
 * {@link KnownMicrosoftDataCollectionKnownAgentSettingName} can be used interchangeably with MicrosoftDataCollectionKnownAgentSettingName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MaxDiskQuotaInMB**: MaxDiskQuotaInMB \
 * **UseTimeReceivedForForwardedEvents**: UseTimeReceivedForForwardedEvents \
 * **Tags**: Tags
 */
export type MicrosoftDataCollectionKnownAgentSettingName = string;

/** Specification of data sources that will be collected. */
export interface MicrosoftDataCollectionDataSourcesSpec {
  /** The list of performance counter data source configurations. */
  performanceCounters?: MicrosoftDataCollectionPerfCounterDataSource[];
  /** The list of Open Telemetry performance counter data source configurations. */
  performanceCountersOTel?: MicrosoftDataCollectionPerformanceCountersOTelDataSource[];
  /** The list of Windows Event Log data source configurations. */
  windowsEventLogs?: MicrosoftDataCollectionWindowsEventLogDataSource[];
  /** The list of Syslog data source configurations. */
  syslog?: MicrosoftDataCollectionSyslogDataSource[];
  /** The list of Azure VM extension data source configurations. */
  extensions?: MicrosoftDataCollectionExtensionDataSource[];
  /** The list of Log files source configurations. */
  logFiles?: MicrosoftDataCollectionLogFilesDataSource[];
  /** The list of IIS logs source configurations. */
  iisLogs?: MicrosoftDataCollectionIisLogsDataSource[];
  /** The list of Windows Firewall logs source configurations. */
  windowsFirewallLogs?: MicrosoftDataCollectionWindowsFirewallLogsDataSource[];
  /** The list of Prometheus forwarder data source configurations. */
  prometheusForwarder?: MicrosoftDataCollectionPrometheusForwarderDataSource[];
  /** The list of platform telemetry configurations */
  platformTelemetry?: MicrosoftDataCollectionPlatformTelemetryDataSource[];
  /** Specifications of pull based data sources */
  dataImports?: MicrosoftDataCollectionDataSourcesSpecDataImports;
  /** The list of Otel Logs data source configurations. */
  otelLogs?: MicrosoftDataCollectionOtelLogsDataSource[];
  /** The list of Otel traces data source configurations. */
  otelTraces?: MicrosoftDataCollectionOtelTracesDataSource[];
  /** The list of OTel metrics data source configurations. */
  otelMetrics?: MicrosoftDataCollectionOtelMetricsDataSource[];
  /** The list of ETW providers data source configurations. */
  etwProviders?: MicrosoftDataCollectionEtwProviderDataSource[];
}

export function microsoftDataCollectionDataSourcesSpecSerializer(
  item: MicrosoftDataCollectionDataSourcesSpec,
): any {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : microsoftDataCollectionPerfCounterDataSourceArraySerializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : microsoftDataCollectionPerformanceCountersOTelDataSourceArraySerializer(
          item["performanceCountersOTel"],
        ),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : microsoftDataCollectionWindowsEventLogDataSourceArraySerializer(item["windowsEventLogs"]),
    syslog: !item["syslog"]
      ? item["syslog"]
      : microsoftDataCollectionSyslogDataSourceArraySerializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : microsoftDataCollectionExtensionDataSourceArraySerializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : microsoftDataCollectionLogFilesDataSourceArraySerializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : microsoftDataCollectionIisLogsDataSourceArraySerializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : microsoftDataCollectionWindowsFirewallLogsDataSourceArraySerializer(
          item["windowsFirewallLogs"],
        ),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : microsoftDataCollectionPrometheusForwarderDataSourceArraySerializer(
          item["prometheusForwarder"],
        ),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : microsoftDataCollectionPlatformTelemetryDataSourceArraySerializer(
          item["platformTelemetry"],
        ),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : microsoftDataCollectionDataSourcesSpecDataImportsSerializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : microsoftDataCollectionOtelLogsDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : microsoftDataCollectionOtelTracesDataSourceArraySerializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : microsoftDataCollectionOtelMetricsDataSourceArraySerializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : microsoftDataCollectionEtwProviderDataSourceArraySerializer(item["etwProviders"]),
  };
}

export function microsoftDataCollectionDataSourcesSpecDeserializer(
  item: any,
): MicrosoftDataCollectionDataSourcesSpec {
  return {
    performanceCounters: !item["performanceCounters"]
      ? item["performanceCounters"]
      : microsoftDataCollectionPerfCounterDataSourceArrayDeserializer(item["performanceCounters"]),
    performanceCountersOTel: !item["performanceCountersOTel"]
      ? item["performanceCountersOTel"]
      : microsoftDataCollectionPerformanceCountersOTelDataSourceArrayDeserializer(
          item["performanceCountersOTel"],
        ),
    windowsEventLogs: !item["windowsEventLogs"]
      ? item["windowsEventLogs"]
      : microsoftDataCollectionWindowsEventLogDataSourceArrayDeserializer(item["windowsEventLogs"]),
    syslog: !item["syslog"]
      ? item["syslog"]
      : microsoftDataCollectionSyslogDataSourceArrayDeserializer(item["syslog"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : microsoftDataCollectionExtensionDataSourceArrayDeserializer(item["extensions"]),
    logFiles: !item["logFiles"]
      ? item["logFiles"]
      : microsoftDataCollectionLogFilesDataSourceArrayDeserializer(item["logFiles"]),
    iisLogs: !item["iisLogs"]
      ? item["iisLogs"]
      : microsoftDataCollectionIisLogsDataSourceArrayDeserializer(item["iisLogs"]),
    windowsFirewallLogs: !item["windowsFirewallLogs"]
      ? item["windowsFirewallLogs"]
      : microsoftDataCollectionWindowsFirewallLogsDataSourceArrayDeserializer(
          item["windowsFirewallLogs"],
        ),
    prometheusForwarder: !item["prometheusForwarder"]
      ? item["prometheusForwarder"]
      : microsoftDataCollectionPrometheusForwarderDataSourceArrayDeserializer(
          item["prometheusForwarder"],
        ),
    platformTelemetry: !item["platformTelemetry"]
      ? item["platformTelemetry"]
      : microsoftDataCollectionPlatformTelemetryDataSourceArrayDeserializer(
          item["platformTelemetry"],
        ),
    dataImports: !item["dataImports"]
      ? item["dataImports"]
      : microsoftDataCollectionDataSourcesSpecDataImportsDeserializer(item["dataImports"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : microsoftDataCollectionOtelLogsDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : microsoftDataCollectionOtelTracesDataSourceArrayDeserializer(item["otelTraces"]),
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : microsoftDataCollectionOtelMetricsDataSourceArrayDeserializer(item["otelMetrics"]),
    etwProviders: !item["etwProviders"]
      ? item["etwProviders"]
      : microsoftDataCollectionEtwProviderDataSourceArrayDeserializer(item["etwProviders"]),
  };
}

export function microsoftDataCollectionPerfCounterDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionPerfCounterDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPerfCounterDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionPerfCounterDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionPerfCounterDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPerfCounterDataSourceDeserializer(item);
  });
}

/**
 * Definition of which performance counters will be collected and how they will be collected by this data collection rule.
 * Collected from both Windows and Linux machines where the counter is present.
 */
export interface MicrosoftDataCollectionPerfCounterDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: MicrosoftDataCollectionKnownPerfCounterDataSourceStreams[];
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

export function microsoftDataCollectionPerfCounterDataSourceSerializer(
  item: MicrosoftDataCollectionPerfCounterDataSource,
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

export function microsoftDataCollectionPerfCounterDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionPerfCounterDataSource {
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
export enum KnownMicrosoftDataCollectionKnownPerfCounterDataSourceStreams {
  /** Microsoft-Perf */
  MicrosoftPerf = "Microsoft-Perf",
  /** Microsoft-InsightsMetrics */
  MicrosoftInsightsMetrics = "Microsoft-InsightsMetrics",
}

/** Type of MicrosoftDataCollectionKnownPerfCounterDataSourceStreams */
export type MicrosoftDataCollectionKnownPerfCounterDataSourceStreams = string;

export function microsoftDataCollectionPerformanceCountersOTelDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionPerformanceCountersOTelDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPerformanceCountersOTelDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionPerformanceCountersOTelDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionPerformanceCountersOTelDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPerformanceCountersOTelDataSourceDeserializer(item);
  });
}

/**
 * Definition of which Open Telemetry performance counters will be collected and how they will be collected by this data collection rule.
 * Collected from both Windows and Linux machines where the counter is present.
 */
export interface MicrosoftDataCollectionPerformanceCountersOTelDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: MicrosoftDataCollectionKnownPerformanceCountersOTelDataSourceStreams[];
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

export function microsoftDataCollectionPerformanceCountersOTelDataSourceSerializer(
  item: MicrosoftDataCollectionPerformanceCountersOTelDataSource,
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

export function microsoftDataCollectionPerformanceCountersOTelDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionPerformanceCountersOTelDataSource {
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
export enum KnownMicrosoftDataCollectionKnownPerformanceCountersOTelDataSourceStreams {
  /** Microsoft-OtelPerfMetrics */
  MicrosoftOtelPerfMetrics = "Microsoft-OtelPerfMetrics",
}

/** Type of MicrosoftDataCollectionKnownPerformanceCountersOTelDataSourceStreams */
export type MicrosoftDataCollectionKnownPerformanceCountersOTelDataSourceStreams = string;

export function microsoftDataCollectionWindowsEventLogDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionWindowsEventLogDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionWindowsEventLogDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionWindowsEventLogDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionWindowsEventLogDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionWindowsEventLogDataSourceDeserializer(item);
  });
}

/**
 * Definition of which Windows Event Log events will be collected and how they will be collected.
 * Only collected from Windows machines.
 */
export interface MicrosoftDataCollectionWindowsEventLogDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: MicrosoftDataCollectionKnownWindowsEventLogDataSourceStreams[];
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

export function microsoftDataCollectionWindowsEventLogDataSourceSerializer(
  item: MicrosoftDataCollectionWindowsEventLogDataSource,
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

export function microsoftDataCollectionWindowsEventLogDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionWindowsEventLogDataSource {
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
export enum KnownMicrosoftDataCollectionKnownWindowsEventLogDataSourceStreams {
  /** Microsoft-WindowsEvent */
  MicrosoftWindowsEvent = "Microsoft-WindowsEvent",
  /** Microsoft-Event */
  MicrosoftEvent = "Microsoft-Event",
}

/** Type of MicrosoftDataCollectionKnownWindowsEventLogDataSourceStreams */
export type MicrosoftDataCollectionKnownWindowsEventLogDataSourceStreams = string;

export function microsoftDataCollectionSyslogDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionSyslogDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionSyslogDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionSyslogDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionSyslogDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionSyslogDataSourceDeserializer(item);
  });
}

/**
 * Definition of which syslog data will be collected and how it will be collected.
 * Only collected from Linux machines.
 */
export interface MicrosoftDataCollectionSyslogDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: MicrosoftDataCollectionKnownSyslogDataSourceStreams[];
  /** The list of facility names. */
  facilityNames?: MicrosoftDataCollectionKnownSyslogDataSourceFacilityNames[];
  /** The log levels to collect. */
  logLevels?: MicrosoftDataCollectionKnownSyslogDataSourceLogLevels[];
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function microsoftDataCollectionSyslogDataSourceSerializer(
  item: MicrosoftDataCollectionSyslogDataSource,
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

export function microsoftDataCollectionSyslogDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionSyslogDataSource {
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
export enum KnownMicrosoftDataCollectionKnownSyslogDataSourceStreams {
  /** Microsoft-Syslog */
  MicrosoftSyslog = "Microsoft-Syslog",
}

/** Type of MicrosoftDataCollectionKnownSyslogDataSourceStreams */
export type MicrosoftDataCollectionKnownSyslogDataSourceStreams = string;

/** Known values of {@link KnownSyslogDataSourceFacilityNames} that the service accepts. */
export enum KnownMicrosoftDataCollectionKnownSyslogDataSourceFacilityNames {
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

/** Type of MicrosoftDataCollectionKnownSyslogDataSourceFacilityNames */
export type MicrosoftDataCollectionKnownSyslogDataSourceFacilityNames = string;

/** Known values of {@link KnownSyslogDataSourceLogLevels} that the service accepts. */
export enum KnownMicrosoftDataCollectionKnownSyslogDataSourceLogLevels {
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

/** Type of MicrosoftDataCollectionKnownSyslogDataSourceLogLevels */
export type MicrosoftDataCollectionKnownSyslogDataSourceLogLevels = string;

export function microsoftDataCollectionExtensionDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionExtensionDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionExtensionDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionExtensionDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionExtensionDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionExtensionDataSourceDeserializer(item);
  });
}

/**
 * Definition of which data will be collected from a separate VM extension that integrates with the Azure Monitor Agent.
 * Collected from either Windows and Linux machines, depending on which extension is defined.
 */
export interface MicrosoftDataCollectionExtensionDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams?: MicrosoftDataCollectionKnownExtensionDataSourceStreams[];
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

export function microsoftDataCollectionExtensionDataSourceSerializer(
  item: MicrosoftDataCollectionExtensionDataSource,
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

export function microsoftDataCollectionExtensionDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionExtensionDataSource {
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
export enum KnownMicrosoftDataCollectionKnownExtensionDataSourceStreams {
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

/** Type of MicrosoftDataCollectionKnownExtensionDataSourceStreams */
export type MicrosoftDataCollectionKnownExtensionDataSourceStreams = string;

export function microsoftDataCollectionLogFilesDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionLogFilesDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionLogFilesDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionLogFilesDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionLogFilesDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionLogFilesDataSourceDeserializer(item);
  });
}

/** Definition of which custom log files will be collected by this data collection rule */
export interface MicrosoftDataCollectionLogFilesDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data source
   */
  streams: string[];
  /** File Patterns where the log files are located */
  filePatterns: string[];
  /** The data format of the log files */
  format: MicrosoftDataCollectionKnownLogFilesDataSourceFormat;
  /** The log files specific settings. */
  settings?: MicrosoftDataCollectionLogFilesDataSourceSettings;
  /** The KQL query to transform the data source. This is a deprecated property and will be removed in future versions. */
  transformKql?: string;
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function microsoftDataCollectionLogFilesDataSourceSerializer(
  item: MicrosoftDataCollectionLogFilesDataSource,
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
      : microsoftDataCollectionLogFilesDataSourceSettingsSerializer(item["settings"]),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

export function microsoftDataCollectionLogFilesDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionLogFilesDataSource {
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
      : microsoftDataCollectionLogFilesDataSourceSettingsDeserializer(item["settings"]),
    transformKql: item["transformKql"],
    name: item["name"],
  };
}

/** The data format of the log files */
export enum KnownMicrosoftDataCollectionKnownLogFilesDataSourceFormat {
  /** json */
  Json = "json",
  /** text */
  Text = "text",
}

/**
 * The data format of the log files \
 * {@link KnownMicrosoftDataCollectionKnownLogFilesDataSourceFormat} can be used interchangeably with MicrosoftDataCollectionKnownLogFilesDataSourceFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **json**: json \
 * **text**: text
 */
export type MicrosoftDataCollectionKnownLogFilesDataSourceFormat = string;

/** The log files specific settings. */
export interface MicrosoftDataCollectionLogFilesDataSourceSettings extends MicrosoftDataCollectionLogFileSettings {}

export function microsoftDataCollectionLogFilesDataSourceSettingsSerializer(
  item: MicrosoftDataCollectionLogFilesDataSourceSettings,
): any {
  return {
    text: !item["text"]
      ? item["text"]
      : microsoftDataCollectionLogFileSettingsTextSerializer(item["text"]),
  };
}

export function microsoftDataCollectionLogFilesDataSourceSettingsDeserializer(
  item: any,
): MicrosoftDataCollectionLogFilesDataSourceSettings {
  return {
    text: !item["text"]
      ? item["text"]
      : microsoftDataCollectionLogFileSettingsTextDeserializer(item["text"]),
  };
}

export function microsoftDataCollectionIisLogsDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionIisLogsDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionIisLogsDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionIisLogsDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionIisLogsDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionIisLogsDataSourceDeserializer(item);
  });
}

/** Enables IIS logs to be collected by this data collection rule. */
export interface MicrosoftDataCollectionIisLogsDataSource {
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

export function microsoftDataCollectionIisLogsDataSourceSerializer(
  item: MicrosoftDataCollectionIisLogsDataSource,
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

export function microsoftDataCollectionIisLogsDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionIisLogsDataSource {
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

export function microsoftDataCollectionWindowsFirewallLogsDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionWindowsFirewallLogsDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionWindowsFirewallLogsDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionWindowsFirewallLogsDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionWindowsFirewallLogsDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionWindowsFirewallLogsDataSourceDeserializer(item);
  });
}

/** Enables Firewall logs to be collected by this data collection rule. */
export interface MicrosoftDataCollectionWindowsFirewallLogsDataSource {
  /** Firewall logs streams */
  streams: string[];
  /** Firewall logs profile filter */
  profileFilter?: MicrosoftDataCollectionKnownWindowsFirewallLogsDataSourceProfileFilter[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function microsoftDataCollectionWindowsFirewallLogsDataSourceSerializer(
  item: MicrosoftDataCollectionWindowsFirewallLogsDataSource,
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

export function microsoftDataCollectionWindowsFirewallLogsDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionWindowsFirewallLogsDataSource {
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
export enum KnownMicrosoftDataCollectionKnownWindowsFirewallLogsDataSourceProfileFilter {
  /** Domain */
  Domain = "Domain",
  /** Private */
  Private = "Private",
  /** Public */
  Public = "Public",
}

/** Type of MicrosoftDataCollectionKnownWindowsFirewallLogsDataSourceProfileFilter */
export type MicrosoftDataCollectionKnownWindowsFirewallLogsDataSourceProfileFilter = string;

export function microsoftDataCollectionPrometheusForwarderDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionPrometheusForwarderDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPrometheusForwarderDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionPrometheusForwarderDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionPrometheusForwarderDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPrometheusForwarderDataSourceDeserializer(item);
  });
}

/** Definition of Prometheus metrics forwarding configuration. */
export interface MicrosoftDataCollectionPrometheusForwarderDataSource {
  /** List of streams that this data source will be sent to. */
  streams?: MicrosoftDataCollectionKnownPrometheusForwarderDataSourceStreams[];
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

export function microsoftDataCollectionPrometheusForwarderDataSourceSerializer(
  item: MicrosoftDataCollectionPrometheusForwarderDataSource,
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

export function microsoftDataCollectionPrometheusForwarderDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionPrometheusForwarderDataSource {
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
export enum KnownMicrosoftDataCollectionKnownPrometheusForwarderDataSourceStreams {
  /** Microsoft-PrometheusMetrics */
  MicrosoftPrometheusMetrics = "Microsoft-PrometheusMetrics",
}

/** Type of MicrosoftDataCollectionKnownPrometheusForwarderDataSourceStreams */
export type MicrosoftDataCollectionKnownPrometheusForwarderDataSourceStreams = string;

export function microsoftDataCollectionPlatformTelemetryDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionPlatformTelemetryDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPlatformTelemetryDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionPlatformTelemetryDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionPlatformTelemetryDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionPlatformTelemetryDataSourceDeserializer(item);
  });
}

/** Definition of platform telemetry data source configuration */
export interface MicrosoftDataCollectionPlatformTelemetryDataSource {
  /** List of platform telemetry streams to collect */
  streams: string[];
  /**
   * A friendly name for the data source.
   * This name should be unique across all data sources (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function microsoftDataCollectionPlatformTelemetryDataSourceSerializer(
  item: MicrosoftDataCollectionPlatformTelemetryDataSource,
): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    name: item["name"],
  };
}

export function microsoftDataCollectionPlatformTelemetryDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionPlatformTelemetryDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    name: item["name"],
  };
}

/** Specifications of pull based data sources */
export interface MicrosoftDataCollectionDataSourcesSpecDataImports extends MicrosoftDataCollectionDataImportSources {}

export function microsoftDataCollectionDataSourcesSpecDataImportsSerializer(
  item: MicrosoftDataCollectionDataSourcesSpecDataImports,
): any {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : microsoftDataCollectionDataImportSourcesEventHubSerializer(item["eventHub"]),
  };
}

export function microsoftDataCollectionDataSourcesSpecDataImportsDeserializer(
  item: any,
): MicrosoftDataCollectionDataSourcesSpecDataImports {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : microsoftDataCollectionDataImportSourcesEventHubDeserializer(item["eventHub"]),
  };
}

export function microsoftDataCollectionOtelLogsDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionOtelLogsDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelLogsDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionOtelLogsDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionOtelLogsDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelLogsDataSourceDeserializer(item);
  });
}

/** Enables Otel logs to be collected by this data collection rule. */
export interface MicrosoftDataCollectionOtelLogsDataSource {
  /** List of streams that this data source will be sent to. */
  streams: MicrosoftDataCollectionKnownOtelLogsDataSourceStreams[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: MicrosoftDataCollectionOtelLogsDataSourceResourceAttributeRouting;
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

export function microsoftDataCollectionOtelLogsDataSourceSerializer(
  item: MicrosoftDataCollectionOtelLogsDataSource,
): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : microsoftDataCollectionOtelLogsDataSourceResourceAttributeRoutingSerializer(
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

export function microsoftDataCollectionOtelLogsDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionOtelLogsDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : microsoftDataCollectionOtelLogsDataSourceResourceAttributeRoutingDeserializer(
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
export enum KnownMicrosoftDataCollectionKnownOtelLogsDataSourceStreams {
  /** Microsoft-OTel-Logs */
  MicrosoftOTelLogs = "Microsoft-OTel-Logs",
}

/** Type of MicrosoftDataCollectionKnownOtelLogsDataSourceStreams */
export type MicrosoftDataCollectionKnownOtelLogsDataSourceStreams = string;

/** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
export interface MicrosoftDataCollectionOtelLogsDataSourceResourceAttributeRouting extends MicrosoftDataCollectionOtelDataSourceResourceAttributeRouting {}

export function microsoftDataCollectionOtelLogsDataSourceResourceAttributeRoutingSerializer(
  item: MicrosoftDataCollectionOtelLogsDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function microsoftDataCollectionOtelLogsDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): MicrosoftDataCollectionOtelLogsDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function microsoftDataCollectionOtelTracesDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionOtelTracesDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelTracesDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionOtelTracesDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionOtelTracesDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelTracesDataSourceDeserializer(item);
  });
}

/** Enables Otel Traces to be collected by this data collection rule. */
export interface MicrosoftDataCollectionOtelTracesDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams: MicrosoftDataCollectionKnownOtelTracesDataSourceStreams[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: MicrosoftDataCollectionOtelTracesDataSourceResourceAttributeRouting;
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

export function microsoftDataCollectionOtelTracesDataSourceSerializer(
  item: MicrosoftDataCollectionOtelTracesDataSource,
): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : microsoftDataCollectionOtelTracesDataSourceResourceAttributeRoutingSerializer(
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

export function microsoftDataCollectionOtelTracesDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionOtelTracesDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : microsoftDataCollectionOtelTracesDataSourceResourceAttributeRoutingDeserializer(
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
export enum KnownMicrosoftDataCollectionKnownOtelTracesDataSourceStreams {
  /** Microsoft-OTel-Traces-Spans */
  MicrosoftOTelTracesSpans = "Microsoft-OTel-Traces-Spans",
  /** Microsoft-OTel-Traces-Events */
  MicrosoftOTelTracesEvents = "Microsoft-OTel-Traces-Events",
  /** Microsoft-OTel-Traces-Resources */
  MicrosoftOTelTracesResources = "Microsoft-OTel-Traces-Resources",
}

/** Type of MicrosoftDataCollectionKnownOtelTracesDataSourceStreams */
export type MicrosoftDataCollectionKnownOtelTracesDataSourceStreams = string;

/** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
export interface MicrosoftDataCollectionOtelTracesDataSourceResourceAttributeRouting extends MicrosoftDataCollectionOtelDataSourceResourceAttributeRouting {}

export function microsoftDataCollectionOtelTracesDataSourceResourceAttributeRoutingSerializer(
  item: MicrosoftDataCollectionOtelTracesDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function microsoftDataCollectionOtelTracesDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): MicrosoftDataCollectionOtelTracesDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function microsoftDataCollectionOtelMetricsDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionOtelMetricsDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelMetricsDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionOtelMetricsDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionOtelMetricsDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelMetricsDataSourceDeserializer(item);
  });
}

/** Definition of OTel metrics configuration. */
export interface MicrosoftDataCollectionOtelMetricsDataSource {
  /** List of streams that this data source will be sent to. */
  streams: string[];
  /** Specifies the routing policy based on OTLP payload resource attributes to route subset of the payload according to matching resource attribute. */
  resourceAttributeRouting?: MicrosoftDataCollectionOtelMetricsDataSourceResourceAttributeRouting;
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

export function microsoftDataCollectionOtelMetricsDataSourceSerializer(
  item: MicrosoftDataCollectionOtelMetricsDataSource,
): any {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : microsoftDataCollectionOtelMetricsDataSourceResourceAttributeRoutingSerializer(
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

export function microsoftDataCollectionOtelMetricsDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionOtelMetricsDataSource {
  return {
    streams: item["streams"].map((p: any) => {
      return p;
    }),
    resourceAttributeRouting: !item["resourceAttributeRouting"]
      ? item["resourceAttributeRouting"]
      : microsoftDataCollectionOtelMetricsDataSourceResourceAttributeRoutingDeserializer(
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
export interface MicrosoftDataCollectionOtelMetricsDataSourceResourceAttributeRouting extends MicrosoftDataCollectionOtelDataSourceResourceAttributeRouting {}

export function microsoftDataCollectionOtelMetricsDataSourceResourceAttributeRoutingSerializer(
  item: MicrosoftDataCollectionOtelMetricsDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function microsoftDataCollectionOtelMetricsDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): MicrosoftDataCollectionOtelMetricsDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

export function microsoftDataCollectionEtwProviderDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionEtwProviderDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionEtwProviderDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionEtwProviderDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionEtwProviderDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionEtwProviderDataSourceDeserializer(item);
  });
}

/** Enables an ETW provider logs to be collected by this data collection rule. */
export interface MicrosoftDataCollectionEtwProviderDataSource {
  /** List of streams that this data source will be sent to */
  streams: string[];
  /** The provider GUID or class name for event source */
  provider: string;
  /** Provider type specification: By Manifest GUID or by Event Source name */
  providerType: MicrosoftDataCollectionKnownEtwProviderType;
  /** Minimal level of detail to be logged */
  logLevel?: MicrosoftDataCollectionKnownEtwProviderDataSourceLogLevel;
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

export function microsoftDataCollectionEtwProviderDataSourceSerializer(
  item: MicrosoftDataCollectionEtwProviderDataSource,
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

export function microsoftDataCollectionEtwProviderDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionEtwProviderDataSource {
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
export enum KnownMicrosoftDataCollectionKnownEtwProviderType {
  /** EventSource */
  EventSource = "EventSource",
  /** Manifest */
  Manifest = "Manifest",
}

/**
 * Provider type specification: By Manifest GUID or by Event Source name \
 * {@link KnownMicrosoftDataCollectionKnownEtwProviderType} can be used interchangeably with MicrosoftDataCollectionKnownEtwProviderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EventSource**: EventSource \
 * **Manifest**: Manifest
 */
export type MicrosoftDataCollectionKnownEtwProviderType = string;

/** Minimal level of detail to be logged */
export enum KnownMicrosoftDataCollectionKnownEtwProviderDataSourceLogLevel {
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
 * {@link KnownMicrosoftDataCollectionKnownEtwProviderDataSourceLogLevel} can be used interchangeably with MicrosoftDataCollectionKnownEtwProviderDataSourceLogLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Critical \
 * **Error**: Error \
 * **Warning**: Warning \
 * **Informational**: Informational \
 * **Verbose**: Verbose
 */
export type MicrosoftDataCollectionKnownEtwProviderDataSourceLogLevel = string;

/** Settings for different log file formats */
export interface MicrosoftDataCollectionLogFileSettings {
  /** Text settings */
  text?: MicrosoftDataCollectionLogFileSettingsText;
}

export function microsoftDataCollectionLogFileSettingsSerializer(
  item: MicrosoftDataCollectionLogFileSettings,
): any {
  return {
    text: !item["text"]
      ? item["text"]
      : microsoftDataCollectionLogFileSettingsTextSerializer(item["text"]),
  };
}

export function microsoftDataCollectionLogFileSettingsDeserializer(
  item: any,
): MicrosoftDataCollectionLogFileSettings {
  return {
    text: !item["text"]
      ? item["text"]
      : microsoftDataCollectionLogFileSettingsTextDeserializer(item["text"]),
  };
}

/** Text settings */
export interface MicrosoftDataCollectionLogFileSettingsText extends MicrosoftDataCollectionLogFileTextSettings {}

export function microsoftDataCollectionLogFileSettingsTextSerializer(
  item: MicrosoftDataCollectionLogFileSettingsText,
): any {
  return { recordStartTimestampFormat: item["recordStartTimestampFormat"] };
}

export function microsoftDataCollectionLogFileSettingsTextDeserializer(
  item: any,
): MicrosoftDataCollectionLogFileSettingsText {
  return {
    recordStartTimestampFormat: item["recordStartTimestampFormat"],
  };
}

/** Settings for text log files */
export interface MicrosoftDataCollectionLogFileTextSettings {
  /** One of the supported timestamp formats */
  recordStartTimestampFormat: MicrosoftDataCollectionKnownLogFileTextSettingsRecordStartTimestampFormat;
}

export function microsoftDataCollectionLogFileTextSettingsSerializer(
  item: MicrosoftDataCollectionLogFileTextSettings,
): any {
  return { recordStartTimestampFormat: item["recordStartTimestampFormat"] };
}

export function microsoftDataCollectionLogFileTextSettingsDeserializer(
  item: any,
): MicrosoftDataCollectionLogFileTextSettings {
  return {
    recordStartTimestampFormat: item["recordStartTimestampFormat"],
  };
}

/** One of the supported timestamp formats */
export enum KnownMicrosoftDataCollectionKnownLogFileTextSettingsRecordStartTimestampFormat {
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
 * {@link KnownMicrosoftDataCollectionKnownLogFileTextSettingsRecordStartTimestampFormat} can be used interchangeably with MicrosoftDataCollectionKnownLogFileTextSettingsRecordStartTimestampFormat,
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
export type MicrosoftDataCollectionKnownLogFileTextSettingsRecordStartTimestampFormat = string;

/** model interface MicrosoftDataCollectionDataImportSources */
export interface MicrosoftDataCollectionDataImportSources {
  /** Definition of Event Hub configuration. */
  eventHub?: MicrosoftDataCollectionDataImportSourcesEventHub;
}

export function microsoftDataCollectionDataImportSourcesSerializer(
  item: MicrosoftDataCollectionDataImportSources,
): any {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : microsoftDataCollectionDataImportSourcesEventHubSerializer(item["eventHub"]),
  };
}

export function microsoftDataCollectionDataImportSourcesDeserializer(
  item: any,
): MicrosoftDataCollectionDataImportSources {
  return {
    eventHub: !item["eventHub"]
      ? item["eventHub"]
      : microsoftDataCollectionDataImportSourcesEventHubDeserializer(item["eventHub"]),
  };
}

/** Definition of Event Hub configuration. */
export interface MicrosoftDataCollectionDataImportSourcesEventHub extends MicrosoftDataCollectionEventHubDataSource {}

export function microsoftDataCollectionDataImportSourcesEventHubSerializer(
  item: MicrosoftDataCollectionDataImportSourcesEventHub,
): any {
  return { name: item["name"], consumerGroup: item["consumerGroup"], stream: item["stream"] };
}

export function microsoftDataCollectionDataImportSourcesEventHubDeserializer(
  item: any,
): MicrosoftDataCollectionDataImportSourcesEventHub {
  return {
    name: item["name"],
    consumerGroup: item["consumerGroup"],
    stream: item["stream"],
  };
}

/** model interface MicrosoftDataCollectionEventHubDataSource */
export interface MicrosoftDataCollectionEventHubDataSource {
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

export function microsoftDataCollectionEventHubDataSourceSerializer(
  item: MicrosoftDataCollectionEventHubDataSource,
): any {
  return { name: item["name"], consumerGroup: item["consumerGroup"], stream: item["stream"] };
}

export function microsoftDataCollectionEventHubDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionEventHubDataSource {
  return {
    name: item["name"],
    consumerGroup: item["consumerGroup"],
    stream: item["stream"],
  };
}

/** Enables OTLP (logs, traces, and metrics) payload routing */
export interface MicrosoftDataCollectionOtelDataSourceResourceAttributeRouting {
  /** The name of the resource attribute to match. */
  attributeName?: string;
  /** The value of the resource attribute to match. */
  attributeValue?: string;
}

export function microsoftDataCollectionOtelDataSourceResourceAttributeRoutingSerializer(
  item: MicrosoftDataCollectionOtelDataSourceResourceAttributeRouting,
): any {
  return { attributeName: item["attributeName"], attributeValue: item["attributeValue"] };
}

export function microsoftDataCollectionOtelDataSourceResourceAttributeRoutingDeserializer(
  item: any,
): MicrosoftDataCollectionOtelDataSourceResourceAttributeRouting {
  return {
    attributeName: item["attributeName"],
    attributeValue: item["attributeValue"],
  };
}

/** Specification of direct data sources that will be collected. */
export interface MicrosoftDataCollectionDirectDataSourcesSpec {
  /** The list of OTel metrics data source configurations. */
  otelMetrics?: MicrosoftDataCollectionOtelMetricsDirectDataSource[];
  /** The list of OTel logs data source configurations. */
  otelLogs?: MicrosoftDataCollectionOtelLogsDirectDataSource[];
  /** The list of OTel traces data source configurations. */
  otelTraces?: MicrosoftDataCollectionOtelTracesDirectDataSource[];
}

export function microsoftDataCollectionDirectDataSourcesSpecSerializer(
  item: MicrosoftDataCollectionDirectDataSourcesSpec,
): any {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : microsoftDataCollectionOtelMetricsDirectDataSourceArraySerializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : microsoftDataCollectionOtelLogsDirectDataSourceArraySerializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : microsoftDataCollectionOtelTracesDirectDataSourceArraySerializer(item["otelTraces"]),
  };
}

export function microsoftDataCollectionDirectDataSourcesSpecDeserializer(
  item: any,
): MicrosoftDataCollectionDirectDataSourcesSpec {
  return {
    otelMetrics: !item["otelMetrics"]
      ? item["otelMetrics"]
      : microsoftDataCollectionOtelMetricsDirectDataSourceArrayDeserializer(item["otelMetrics"]),
    otelLogs: !item["otelLogs"]
      ? item["otelLogs"]
      : microsoftDataCollectionOtelLogsDirectDataSourceArrayDeserializer(item["otelLogs"]),
    otelTraces: !item["otelTraces"]
      ? item["otelTraces"]
      : microsoftDataCollectionOtelTracesDirectDataSourceArrayDeserializer(item["otelTraces"]),
  };
}

export function microsoftDataCollectionOtelMetricsDirectDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionOtelMetricsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelMetricsDirectDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionOtelMetricsDirectDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionOtelMetricsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelMetricsDirectDataSourceDeserializer(item);
  });
}

/** Definition of OTel metrics configuration. */
export interface MicrosoftDataCollectionOtelMetricsDirectDataSource {
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

export function microsoftDataCollectionOtelMetricsDirectDataSourceSerializer(
  item: MicrosoftDataCollectionOtelMetricsDirectDataSource,
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

export function microsoftDataCollectionOtelMetricsDirectDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionOtelMetricsDirectDataSource {
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

export function microsoftDataCollectionOtelLogsDirectDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionOtelLogsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelLogsDirectDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionOtelLogsDirectDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionOtelLogsDirectDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelLogsDirectDataSourceDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionOtelLogsDirectDataSource */
export interface MicrosoftDataCollectionOtelLogsDirectDataSource {
  /** List of streams that this data source will be sent to. */
  streams: MicrosoftDataCollectionKnownOtelLogsDirectDataSourceStreams[];
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

export function microsoftDataCollectionOtelLogsDirectDataSourceSerializer(
  item: MicrosoftDataCollectionOtelLogsDirectDataSource,
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

export function microsoftDataCollectionOtelLogsDirectDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionOtelLogsDirectDataSource {
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
export enum KnownMicrosoftDataCollectionKnownOtelLogsDirectDataSourceStreams {
  /** Microsoft-OTel-Logs */
  MicrosoftOTelLogs = "Microsoft-OTel-Logs",
}

/** Type of MicrosoftDataCollectionKnownOtelLogsDirectDataSourceStreams */
export type MicrosoftDataCollectionKnownOtelLogsDirectDataSourceStreams = string;

export function microsoftDataCollectionOtelTracesDirectDataSourceArraySerializer(
  result: Array<MicrosoftDataCollectionOtelTracesDirectDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelTracesDirectDataSourceSerializer(item);
  });
}

export function microsoftDataCollectionOtelTracesDirectDataSourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionOtelTracesDirectDataSource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionOtelTracesDirectDataSourceDeserializer(item);
  });
}

/** Enables Otel Traces to be collected by this data collection rule. */
export interface MicrosoftDataCollectionOtelTracesDirectDataSource {
  /**
   * List of streams that this data source will be sent to.
   * A stream indicates what schema will be used for this data and usually what table in Log Analytics the data will be sent to.
   */
  streams: MicrosoftDataCollectionKnownOtelTracesDirectDataSourceStreams[];
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

export function microsoftDataCollectionOtelTracesDirectDataSourceSerializer(
  item: MicrosoftDataCollectionOtelTracesDirectDataSource,
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

export function microsoftDataCollectionOtelTracesDirectDataSourceDeserializer(
  item: any,
): MicrosoftDataCollectionOtelTracesDirectDataSource {
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
export enum KnownMicrosoftDataCollectionKnownOtelTracesDirectDataSourceStreams {
  /** Microsoft-OTel-Traces-Spans */
  MicrosoftOTelTracesSpans = "Microsoft-OTel-Traces-Spans",
  /** Microsoft-OTel-Traces-Events */
  MicrosoftOTelTracesEvents = "Microsoft-OTel-Traces-Events",
  /** Microsoft-OTel-Traces-Resources */
  MicrosoftOTelTracesResources = "Microsoft-OTel-Traces-Resources",
}

/** Type of MicrosoftDataCollectionKnownOtelTracesDirectDataSourceStreams */
export type MicrosoftDataCollectionKnownOtelTracesDirectDataSourceStreams = string;

/** Specification of destinations that can be used in data flows. */
export interface MicrosoftDataCollectionDestinationsSpec {
  /** List of Log Analytics destinations. */
  logAnalytics?: MicrosoftDataCollectionLogAnalyticsDestination[];
  /** List of monitoring account destinations. */
  monitoringAccounts?: MicrosoftDataCollectionMonitoringAccountDestination[];
  /** Azure Monitor Metrics destination. */
  azureMonitorMetrics?: MicrosoftDataCollectionDestinationsSpecAzureMonitorMetrics;
  /** List of Event Hubs destinations. */
  eventHubs?: MicrosoftDataCollectionEventHubDestination[];
  /** List of Event Hubs Direct destinations. */
  eventHubsDirect?: MicrosoftDataCollectionEventHubDirectDestination[];
  /** List of Storage Blob Direct destinations. To be used only for sending data directly to store from the agent. */
  storageBlobsDirect?: MicrosoftDataCollectionStorageBlobDestination[];
  /** List of Storage Table Direct destinations. */
  storageTablesDirect?: MicrosoftDataCollectionStorageTableDestination[];
  /** List of storage accounts destinations. */
  storageAccounts?: MicrosoftDataCollectionStorageBlobDestination[];
  /** List of Microsoft Fabric destinations. */
  microsoftFabric?: MicrosoftDataCollectionMicrosoftFabricDestination[];
  /** List of Azure Data Explorer destinations. */
  azureDataExplorer?: MicrosoftDataCollectionAdxDestination[];
}

export function microsoftDataCollectionDestinationsSpecSerializer(
  item: MicrosoftDataCollectionDestinationsSpec,
): any {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : microsoftDataCollectionLogAnalyticsDestinationArraySerializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : microsoftDataCollectionMonitoringAccountDestinationArraySerializer(
          item["monitoringAccounts"],
        ),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : microsoftDataCollectionDestinationsSpecAzureMonitorMetricsSerializer(
          item["azureMonitorMetrics"],
        ),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : microsoftDataCollectionEventHubDestinationArraySerializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : microsoftDataCollectionEventHubDirectDestinationArraySerializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : microsoftDataCollectionStorageBlobDestinationArraySerializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : microsoftDataCollectionStorageTableDestinationArraySerializer(item["storageTablesDirect"]),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : microsoftDataCollectionStorageBlobDestinationArraySerializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : microsoftDataCollectionMicrosoftFabricDestinationArraySerializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : microsoftDataCollectionAdxDestinationArraySerializer(item["azureDataExplorer"]),
  };
}

export function microsoftDataCollectionDestinationsSpecDeserializer(
  item: any,
): MicrosoftDataCollectionDestinationsSpec {
  return {
    logAnalytics: !item["logAnalytics"]
      ? item["logAnalytics"]
      : microsoftDataCollectionLogAnalyticsDestinationArrayDeserializer(item["logAnalytics"]),
    monitoringAccounts: !item["monitoringAccounts"]
      ? item["monitoringAccounts"]
      : microsoftDataCollectionMonitoringAccountDestinationArrayDeserializer(
          item["monitoringAccounts"],
        ),
    azureMonitorMetrics: !item["azureMonitorMetrics"]
      ? item["azureMonitorMetrics"]
      : microsoftDataCollectionDestinationsSpecAzureMonitorMetricsDeserializer(
          item["azureMonitorMetrics"],
        ),
    eventHubs: !item["eventHubs"]
      ? item["eventHubs"]
      : microsoftDataCollectionEventHubDestinationArrayDeserializer(item["eventHubs"]),
    eventHubsDirect: !item["eventHubsDirect"]
      ? item["eventHubsDirect"]
      : microsoftDataCollectionEventHubDirectDestinationArrayDeserializer(item["eventHubsDirect"]),
    storageBlobsDirect: !item["storageBlobsDirect"]
      ? item["storageBlobsDirect"]
      : microsoftDataCollectionStorageBlobDestinationArrayDeserializer(item["storageBlobsDirect"]),
    storageTablesDirect: !item["storageTablesDirect"]
      ? item["storageTablesDirect"]
      : microsoftDataCollectionStorageTableDestinationArrayDeserializer(
          item["storageTablesDirect"],
        ),
    storageAccounts: !item["storageAccounts"]
      ? item["storageAccounts"]
      : microsoftDataCollectionStorageBlobDestinationArrayDeserializer(item["storageAccounts"]),
    microsoftFabric: !item["microsoftFabric"]
      ? item["microsoftFabric"]
      : microsoftDataCollectionMicrosoftFabricDestinationArrayDeserializer(item["microsoftFabric"]),
    azureDataExplorer: !item["azureDataExplorer"]
      ? item["azureDataExplorer"]
      : microsoftDataCollectionAdxDestinationArrayDeserializer(item["azureDataExplorer"]),
  };
}

export function microsoftDataCollectionLogAnalyticsDestinationArraySerializer(
  result: Array<MicrosoftDataCollectionLogAnalyticsDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionLogAnalyticsDestinationSerializer(item);
  });
}

export function microsoftDataCollectionLogAnalyticsDestinationArrayDeserializer(
  result: Array<MicrosoftDataCollectionLogAnalyticsDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionLogAnalyticsDestinationDeserializer(item);
  });
}

/** Log Analytics destination. */
export interface MicrosoftDataCollectionLogAnalyticsDestination {
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

export function microsoftDataCollectionLogAnalyticsDestinationSerializer(
  item: MicrosoftDataCollectionLogAnalyticsDestination,
): any {
  return { workspaceResourceId: item["workspaceResourceId"], name: item["name"] };
}

export function microsoftDataCollectionLogAnalyticsDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionLogAnalyticsDestination {
  return {
    workspaceResourceId: item["workspaceResourceId"],
    workspaceId: item["workspaceId"],
    name: item["name"],
  };
}

export function microsoftDataCollectionMonitoringAccountDestinationArraySerializer(
  result: Array<MicrosoftDataCollectionMonitoringAccountDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionMonitoringAccountDestinationSerializer(item);
  });
}

export function microsoftDataCollectionMonitoringAccountDestinationArrayDeserializer(
  result: Array<MicrosoftDataCollectionMonitoringAccountDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionMonitoringAccountDestinationDeserializer(item);
  });
}

/** Monitoring account destination. */
export interface MicrosoftDataCollectionMonitoringAccountDestination {
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

export function microsoftDataCollectionMonitoringAccountDestinationSerializer(
  item: MicrosoftDataCollectionMonitoringAccountDestination,
): any {
  return { accountResourceId: item["accountResourceId"], name: item["name"] };
}

export function microsoftDataCollectionMonitoringAccountDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionMonitoringAccountDestination {
  return {
    accountResourceId: item["accountResourceId"],
    accountId: item["accountId"],
    name: item["name"],
  };
}

/** Azure Monitor Metrics destination. */
export interface MicrosoftDataCollectionDestinationsSpecAzureMonitorMetrics extends MicrosoftDataCollectionAzureMonitorMetricsDestination {}

export function microsoftDataCollectionDestinationsSpecAzureMonitorMetricsSerializer(
  item: MicrosoftDataCollectionDestinationsSpecAzureMonitorMetrics,
): any {
  return { name: item["name"] };
}

export function microsoftDataCollectionDestinationsSpecAzureMonitorMetricsDeserializer(
  item: any,
): MicrosoftDataCollectionDestinationsSpecAzureMonitorMetrics {
  return {
    name: item["name"],
  };
}

export function microsoftDataCollectionEventHubDestinationArraySerializer(
  result: Array<MicrosoftDataCollectionEventHubDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionEventHubDestinationSerializer(item);
  });
}

export function microsoftDataCollectionEventHubDestinationArrayDeserializer(
  result: Array<MicrosoftDataCollectionEventHubDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionEventHubDestinationDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionEventHubDestination */
export interface MicrosoftDataCollectionEventHubDestination {
  /** The resource ID of the event hub. */
  eventHubResourceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function microsoftDataCollectionEventHubDestinationSerializer(
  item: MicrosoftDataCollectionEventHubDestination,
): any {
  return { eventHubResourceId: item["eventHubResourceId"], name: item["name"] };
}

export function microsoftDataCollectionEventHubDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionEventHubDestination {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    name: item["name"],
  };
}

export function microsoftDataCollectionEventHubDirectDestinationArraySerializer(
  result: Array<MicrosoftDataCollectionEventHubDirectDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionEventHubDirectDestinationSerializer(item);
  });
}

export function microsoftDataCollectionEventHubDirectDestinationArrayDeserializer(
  result: Array<MicrosoftDataCollectionEventHubDirectDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionEventHubDirectDestinationDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionEventHubDirectDestination */
export interface MicrosoftDataCollectionEventHubDirectDestination {
  /** The resource ID of the event hub. */
  eventHubResourceId?: string;
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function microsoftDataCollectionEventHubDirectDestinationSerializer(
  item: MicrosoftDataCollectionEventHubDirectDestination,
): any {
  return { eventHubResourceId: item["eventHubResourceId"], name: item["name"] };
}

export function microsoftDataCollectionEventHubDirectDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionEventHubDirectDestination {
  return {
    eventHubResourceId: item["eventHubResourceId"],
    name: item["name"],
  };
}

export function microsoftDataCollectionStorageBlobDestinationArraySerializer(
  result: Array<MicrosoftDataCollectionStorageBlobDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionStorageBlobDestinationSerializer(item);
  });
}

export function microsoftDataCollectionStorageBlobDestinationArrayDeserializer(
  result: Array<MicrosoftDataCollectionStorageBlobDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionStorageBlobDestinationDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionStorageBlobDestination */
export interface MicrosoftDataCollectionStorageBlobDestination {
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

export function microsoftDataCollectionStorageBlobDestinationSerializer(
  item: MicrosoftDataCollectionStorageBlobDestination,
): any {
  return {
    containerName: item["containerName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function microsoftDataCollectionStorageBlobDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionStorageBlobDestination {
  return {
    containerName: item["containerName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function microsoftDataCollectionStorageTableDestinationArraySerializer(
  result: Array<MicrosoftDataCollectionStorageTableDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionStorageTableDestinationSerializer(item);
  });
}

export function microsoftDataCollectionStorageTableDestinationArrayDeserializer(
  result: Array<MicrosoftDataCollectionStorageTableDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionStorageTableDestinationDeserializer(item);
  });
}

/** model interface MicrosoftDataCollectionStorageTableDestination */
export interface MicrosoftDataCollectionStorageTableDestination {
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

export function microsoftDataCollectionStorageTableDestinationSerializer(
  item: MicrosoftDataCollectionStorageTableDestination,
): any {
  return {
    tableName: item["tableName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function microsoftDataCollectionStorageTableDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionStorageTableDestination {
  return {
    tableName: item["tableName"],
    storageAccountResourceId: item["storageAccountResourceId"],
    name: item["name"],
  };
}

export function microsoftDataCollectionMicrosoftFabricDestinationArraySerializer(
  result: Array<MicrosoftDataCollectionMicrosoftFabricDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionMicrosoftFabricDestinationSerializer(item);
  });
}

export function microsoftDataCollectionMicrosoftFabricDestinationArrayDeserializer(
  result: Array<MicrosoftDataCollectionMicrosoftFabricDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionMicrosoftFabricDestinationDeserializer(item);
  });
}

/** Microsoft Fabric destination (non-Azure). */
export interface MicrosoftDataCollectionMicrosoftFabricDestination {
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

export function microsoftDataCollectionMicrosoftFabricDestinationSerializer(
  item: MicrosoftDataCollectionMicrosoftFabricDestination,
): any {
  return {
    tenantId: item["tenantId"],
    artifactId: item["artifactId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

export function microsoftDataCollectionMicrosoftFabricDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionMicrosoftFabricDestination {
  return {
    tenantId: item["tenantId"],
    artifactId: item["artifactId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

export function microsoftDataCollectionAdxDestinationArraySerializer(
  result: Array<MicrosoftDataCollectionAdxDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionAdxDestinationSerializer(item);
  });
}

export function microsoftDataCollectionAdxDestinationArrayDeserializer(
  result: Array<MicrosoftDataCollectionAdxDestination>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionAdxDestinationDeserializer(item);
  });
}

/** Azure Data Explorer (Adx) destination. */
export interface MicrosoftDataCollectionAdxDestination {
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

export function microsoftDataCollectionAdxDestinationSerializer(
  item: MicrosoftDataCollectionAdxDestination,
): any {
  return { resourceId: item["resourceId"], databaseName: item["databaseName"], name: item["name"] };
}

export function microsoftDataCollectionAdxDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionAdxDestination {
  return {
    resourceId: item["resourceId"],
    databaseName: item["databaseName"],
    ingestionUri: item["ingestionUri"],
    name: item["name"],
  };
}

/** Azure Monitor Metrics destination. */
export interface MicrosoftDataCollectionAzureMonitorMetricsDestination {
  /**
   * A friendly name for the destination.
   * This name should be unique across all destinations (regardless of type) within the data collection rule.
   */
  name?: string;
}

export function microsoftDataCollectionAzureMonitorMetricsDestinationSerializer(
  item: MicrosoftDataCollectionAzureMonitorMetricsDestination,
): any {
  return { name: item["name"] };
}

export function microsoftDataCollectionAzureMonitorMetricsDestinationDeserializer(
  item: any,
): MicrosoftDataCollectionAzureMonitorMetricsDestination {
  return {
    name: item["name"],
  };
}

/** model interface MicrosoftDataCollectionIngestionQuotas */
export interface MicrosoftDataCollectionIngestionQuotas {
  logs?: MicrosoftDataCollectionIngestionQuotasLogs;
}

export function microsoftDataCollectionIngestionQuotasDeserializer(
  item: any,
): MicrosoftDataCollectionIngestionQuotas {
  return {
    logs: !item["logs"]
      ? item["logs"]
      : microsoftDataCollectionIngestionQuotasLogsDeserializer(item["logs"]),
  };
}

/** model interface MicrosoftDataCollectionIngestionQuotasLogs */
export interface MicrosoftDataCollectionIngestionQuotasLogs extends MicrosoftDataCollectionLogsQuotaSpec {}

export function microsoftDataCollectionIngestionQuotasLogsDeserializer(
  item: any,
): MicrosoftDataCollectionIngestionQuotasLogs {
  return {
    maxSizePerMinuteInGB: item["maxSizePerMinuteInGB"],
    maxRequestsPerMinute: item["maxRequestsPerMinute"],
  };
}

/** model interface MicrosoftDataCollectionLogsQuotaSpec */
export interface MicrosoftDataCollectionLogsQuotaSpec {
  maxSizePerMinuteInGB?: string;
  maxRequestsPerMinute?: string;
}

export function microsoftDataCollectionLogsQuotaSpecDeserializer(
  item: any,
): MicrosoftDataCollectionLogsQuotaSpec {
  return {
    maxSizePerMinuteInGB: item["maxSizePerMinuteInGB"],
    maxRequestsPerMinute: item["maxRequestsPerMinute"],
  };
}

export function microsoftDataCollectionDataCollectionRuleResourceArraySerializer(
  result: Array<MicrosoftDataCollectionDataCollectionRuleResource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionDataCollectionRuleResourceSerializer(item);
  });
}

export function microsoftDataCollectionDataCollectionRuleResourceArrayDeserializer(
  result: Array<MicrosoftDataCollectionDataCollectionRuleResource>,
): any[] {
  return result.map((item) => {
    return microsoftDataCollectionDataCollectionRuleResourceDeserializer(item);
  });
}

export function _dataCollectionEndpointResourcePropertiesSerializer(
  item: MicrosoftDataCollectionDataCollectionEndpointResource,
): any {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : microsoftDataCollectionDataCollectionEndpointConfigurationAccessSerializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointLogsIngestionSerializer(item["logsIngestion"]),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointMetricsIngestionSerializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : microsoftDataCollectionDataCollectionEndpointNetworkAclsSerializer(item["networkAcls"]),
  };
}

export function _dataCollectionEndpointResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    configurationAccess: !item["configurationAccess"]
      ? item["configurationAccess"]
      : microsoftDataCollectionDataCollectionEndpointConfigurationAccessDeserializer(
          item["configurationAccess"],
        ),
    logsIngestion: !item["logsIngestion"]
      ? item["logsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointLogsIngestionDeserializer(
          item["logsIngestion"],
        ),
    metricsIngestion: !item["metricsIngestion"]
      ? item["metricsIngestion"]
      : microsoftDataCollectionDataCollectionEndpointMetricsIngestionDeserializer(
          item["metricsIngestion"],
        ),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : microsoftDataCollectionDataCollectionEndpointNetworkAclsDeserializer(item["networkAcls"]),
    provisioningState: item["provisioningState"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : microsoftDataCollectionPrivateLinkScopedResourceArrayDeserializer(
          item["privateLinkScopedResources"],
        ),
    failoverConfiguration: !item["failoverConfiguration"]
      ? item["failoverConfiguration"]
      : microsoftDataCollectionDataCollectionEndpointFailoverConfigurationDeserializer(
          item["failoverConfiguration"],
        ),
    metadata: !item["metadata"]
      ? item["metadata"]
      : microsoftDataCollectionDataCollectionEndpointMetadataDeserializer(item["metadata"]),
  };
}

export function _dataCollectionRuleAssociationProxyOnlyResourcePropertiesSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleAssociationProxyOnlyResource,
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
      : microsoftDataCollectionDataCollectionRuleAssociationMetadataDeserializer(item["metadata"]),
  };
}

export function _dataCollectionRuleResourcePropertiesSerializer(
  item: MicrosoftDataCollectionDataCollectionRuleResource,
): any {
  return {
    description: item["description"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    references: !item["references"]
      ? item["references"]
      : microsoftDataCollectionDataCollectionRuleReferencesSerializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : microsoftDataCollectionDataCollectionRuleAgentSettingsSerializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : microsoftDataCollectionStreamDeclarationRecordSerializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : microsoftDataCollectionDataCollectionRuleDataSourcesSerializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : microsoftDataCollectionDataCollectionRuleDirectDataSourcesSerializer(
          item["directDataSources"],
        ),
    destinations: !item["destinations"]
      ? item["destinations"]
      : microsoftDataCollectionDataCollectionRuleDestinationsSerializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : microsoftDataCollectionDataFlowArraySerializer(item["dataFlows"]),
  };
}

export function _dataCollectionRuleResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    immutableId: item["immutableId"],
    dataCollectionEndpointId: item["dataCollectionEndpointId"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : microsoftDataCollectionDataCollectionRuleMetadataDeserializer(item["metadata"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : microsoftDataCollectionDataCollectionRuleEndpointsDeserializer(item["endpoints"]),
    references: !item["references"]
      ? item["references"]
      : microsoftDataCollectionDataCollectionRuleReferencesDeserializer(item["references"]),
    agentSettings: !item["agentSettings"]
      ? item["agentSettings"]
      : microsoftDataCollectionDataCollectionRuleAgentSettingsDeserializer(item["agentSettings"]),
    streamDeclarations: !item["streamDeclarations"]
      ? item["streamDeclarations"]
      : microsoftDataCollectionStreamDeclarationRecordDeserializer(item["streamDeclarations"]),
    dataSources: !item["dataSources"]
      ? item["dataSources"]
      : microsoftDataCollectionDataCollectionRuleDataSourcesDeserializer(item["dataSources"]),
    directDataSources: !item["directDataSources"]
      ? item["directDataSources"]
      : microsoftDataCollectionDataCollectionRuleDirectDataSourcesDeserializer(
          item["directDataSources"],
        ),
    destinations: !item["destinations"]
      ? item["destinations"]
      : microsoftDataCollectionDataCollectionRuleDestinationsDeserializer(item["destinations"]),
    dataFlows: !item["dataFlows"]
      ? item["dataFlows"]
      : microsoftDataCollectionDataFlowArrayDeserializer(item["dataFlows"]),
    ingestionQuotas: !item["ingestionQuotas"]
      ? item["ingestionQuotas"]
      : microsoftDataCollectionDataCollectionRuleIngestionQuotasDeserializer(
          item["ingestionQuotas"],
        ),
    provisioningState: item["provisioningState"],
  };
}
