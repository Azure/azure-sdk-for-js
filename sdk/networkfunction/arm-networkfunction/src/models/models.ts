// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Azure Traffic Collector resource. */
export interface AzureTrafficCollector extends ProxyResource {
  /** Resource location. */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Collector Policies for Azure Traffic Collector. */
  readonly collectorPolicies?: ResourceReference[];
  /** The virtualHub to which the Azure Traffic Collector belongs. */
  virtualHub?: ResourceReference;
  /** The provisioning state of the application rule collection resource. */
  readonly provisioningState?: ProvisioningState;
}

export function azureTrafficCollectorSerializer(item: AzureTrafficCollector): any {
  return {
    properties: areAllPropsUndefined(item, ["virtualHub"])
      ? undefined
      : _azureTrafficCollectorPropertiesSerializer(item),
    location: item["location"],
    tags: item["tags"],
  };
}

export function azureTrafficCollectorDeserializer(item: any): AzureTrafficCollector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _azureTrafficCollectorPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
  };
}

/** Azure Traffic Collector resource properties. */
export interface AzureTrafficCollectorPropertiesFormat {
  /** Collector Policies for Azure Traffic Collector. */
  readonly collectorPolicies?: ResourceReference[];
  /** The virtualHub to which the Azure Traffic Collector belongs. */
  virtualHub?: ResourceReference;
  /** The provisioning state of the application rule collection resource. */
  readonly provisioningState?: ProvisioningState;
}

export function azureTrafficCollectorPropertiesFormatSerializer(
  item: AzureTrafficCollectorPropertiesFormat,
): any {
  return {
    virtualHub: !item["virtualHub"]
      ? item["virtualHub"]
      : resourceReferenceSerializer(item["virtualHub"]),
  };
}

export function azureTrafficCollectorPropertiesFormatDeserializer(
  item: any,
): AzureTrafficCollectorPropertiesFormat {
  return {
    collectorPolicies: !item["collectorPolicies"]
      ? item["collectorPolicies"]
      : resourceReferenceArrayDeserializer(item["collectorPolicies"]),
    virtualHub: !item["virtualHub"]
      ? item["virtualHub"]
      : resourceReferenceDeserializer(item["virtualHub"]),
    provisioningState: item["provisioningState"],
  };
}

export function resourceReferenceArraySerializer(result: Array<ResourceReference>): any[] {
  return result.map((item) => {
    return resourceReferenceSerializer(item);
  });
}

export function resourceReferenceArrayDeserializer(result: Array<ResourceReference>): any[] {
  return result.map((item) => {
    return resourceReferenceDeserializer(item);
  });
}

/** Resource reference properties. */
export interface ResourceReference {
  /** Resource ID. */
  readonly id?: string;
}

export function resourceReferenceSerializer(item: ResourceReference): any {
  return item;
}

export function resourceReferenceDeserializer(item: any): ResourceReference {
  return {
    id: item["id"],
  };
}

/** The current provisioning state. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Updating**: Updating \
 * **Deleting**: Deleting \
 * **Failed**: Failed
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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** An error response from the service. */
export interface CloudError {
  /** An error response from the service. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the service. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
}

/** Tags object for patch operations. */
export interface TagsObject {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function tagsObjectSerializer(item: TagsObject): any {
  return { tags: item["tags"] };
}

/** Collector policy resource. */
export interface CollectorPolicy extends ProxyResource {
  /** Resource location. */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Ingestion policies. */
  ingestionPolicy?: IngestionPolicyPropertiesFormat;
  /** Emission policies. */
  emissionPolicies?: EmissionPoliciesPropertiesFormat[];
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
}

export function collectorPolicySerializer(item: CollectorPolicy): any {
  return {
    properties: areAllPropsUndefined(item, ["ingestionPolicy", "emissionPolicies"])
      ? undefined
      : _collectorPolicyPropertiesSerializer(item),
    location: item["location"],
    tags: item["tags"],
  };
}

export function collectorPolicyDeserializer(item: any): CollectorPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _collectorPolicyPropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
  };
}

/** Collection policy properties. */
export interface CollectorPolicyPropertiesFormat {
  /** Ingestion policies. */
  ingestionPolicy?: IngestionPolicyPropertiesFormat;
  /** Emission policies. */
  emissionPolicies?: EmissionPoliciesPropertiesFormat[];
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
}

export function collectorPolicyPropertiesFormatSerializer(
  item: CollectorPolicyPropertiesFormat,
): any {
  return {
    ingestionPolicy: !item["ingestionPolicy"]
      ? item["ingestionPolicy"]
      : ingestionPolicyPropertiesFormatSerializer(item["ingestionPolicy"]),
    emissionPolicies: !item["emissionPolicies"]
      ? item["emissionPolicies"]
      : emissionPoliciesPropertiesFormatArraySerializer(item["emissionPolicies"]),
  };
}

export function collectorPolicyPropertiesFormatDeserializer(
  item: any,
): CollectorPolicyPropertiesFormat {
  return {
    ingestionPolicy: !item["ingestionPolicy"]
      ? item["ingestionPolicy"]
      : ingestionPolicyPropertiesFormatDeserializer(item["ingestionPolicy"]),
    emissionPolicies: !item["emissionPolicies"]
      ? item["emissionPolicies"]
      : emissionPoliciesPropertiesFormatArrayDeserializer(item["emissionPolicies"]),
    provisioningState: item["provisioningState"],
  };
}

/** Ingestion Policy properties. */
export interface IngestionPolicyPropertiesFormat {
  /** The ingestion type. */
  ingestionType?: IngestionType;
  /** Ingestion Sources. */
  ingestionSources?: IngestionSourcesPropertiesFormat[];
}

export function ingestionPolicyPropertiesFormatSerializer(
  item: IngestionPolicyPropertiesFormat,
): any {
  return {
    ingestionType: item["ingestionType"],
    ingestionSources: !item["ingestionSources"]
      ? item["ingestionSources"]
      : ingestionSourcesPropertiesFormatArraySerializer(item["ingestionSources"]),
  };
}

export function ingestionPolicyPropertiesFormatDeserializer(
  item: any,
): IngestionPolicyPropertiesFormat {
  return {
    ingestionType: item["ingestionType"],
    ingestionSources: !item["ingestionSources"]
      ? item["ingestionSources"]
      : ingestionSourcesPropertiesFormatArrayDeserializer(item["ingestionSources"]),
  };
}

/** The ingestion type. */
export enum KnownIngestionType {
  /** IPFIX */
  Ipfix = "IPFIX",
}

/**
 * The ingestion type. \
 * {@link KnownIngestionType} can be used interchangeably with IngestionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPFIX**: IPFIX
 */
export type IngestionType = string;

export function ingestionSourcesPropertiesFormatArraySerializer(
  result: Array<IngestionSourcesPropertiesFormat>,
): any[] {
  return result.map((item) => {
    return ingestionSourcesPropertiesFormatSerializer(item);
  });
}

export function ingestionSourcesPropertiesFormatArrayDeserializer(
  result: Array<IngestionSourcesPropertiesFormat>,
): any[] {
  return result.map((item) => {
    return ingestionSourcesPropertiesFormatDeserializer(item);
  });
}

/** Ingestion policy properties. */
export interface IngestionSourcesPropertiesFormat {
  /** Ingestion source type. */
  sourceType?: SourceType;
  /** Resource ID. */
  resourceId?: string;
}

export function ingestionSourcesPropertiesFormatSerializer(
  item: IngestionSourcesPropertiesFormat,
): any {
  return { sourceType: item["sourceType"], resourceId: item["resourceId"] };
}

export function ingestionSourcesPropertiesFormatDeserializer(
  item: any,
): IngestionSourcesPropertiesFormat {
  return {
    sourceType: item["sourceType"],
    resourceId: item["resourceId"],
  };
}

/** Ingestion source type. */
export enum KnownSourceType {
  /** Resource */
  Resource = "Resource",
}

/**
 * Ingestion source type. \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resource**: Resource
 */
export type SourceType = string;

export function emissionPoliciesPropertiesFormatArraySerializer(
  result: Array<EmissionPoliciesPropertiesFormat>,
): any[] {
  return result.map((item) => {
    return emissionPoliciesPropertiesFormatSerializer(item);
  });
}

export function emissionPoliciesPropertiesFormatArrayDeserializer(
  result: Array<EmissionPoliciesPropertiesFormat>,
): any[] {
  return result.map((item) => {
    return emissionPoliciesPropertiesFormatDeserializer(item);
  });
}

/** Emission policy properties. */
export interface EmissionPoliciesPropertiesFormat {
  /** Emission format type. */
  emissionType?: EmissionType;
  /** Emission policy destinations. */
  emissionDestinations?: EmissionPolicyDestination[];
}

export function emissionPoliciesPropertiesFormatSerializer(
  item: EmissionPoliciesPropertiesFormat,
): any {
  return {
    emissionType: item["emissionType"],
    emissionDestinations: !item["emissionDestinations"]
      ? item["emissionDestinations"]
      : emissionPolicyDestinationArraySerializer(item["emissionDestinations"]),
  };
}

export function emissionPoliciesPropertiesFormatDeserializer(
  item: any,
): EmissionPoliciesPropertiesFormat {
  return {
    emissionType: item["emissionType"],
    emissionDestinations: !item["emissionDestinations"]
      ? item["emissionDestinations"]
      : emissionPolicyDestinationArrayDeserializer(item["emissionDestinations"]),
  };
}

/** Emission format type. */
export enum KnownEmissionType {
  /** IPFIX */
  Ipfix = "IPFIX",
}

/**
 * Emission format type. \
 * {@link KnownEmissionType} can be used interchangeably with EmissionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPFIX**: IPFIX
 */
export type EmissionType = string;

export function emissionPolicyDestinationArraySerializer(
  result: Array<EmissionPolicyDestination>,
): any[] {
  return result.map((item) => {
    return emissionPolicyDestinationSerializer(item);
  });
}

export function emissionPolicyDestinationArrayDeserializer(
  result: Array<EmissionPolicyDestination>,
): any[] {
  return result.map((item) => {
    return emissionPolicyDestinationDeserializer(item);
  });
}

/** Emission policy destination properties. */
export interface EmissionPolicyDestination {
  /** Emission destination type. */
  destinationType?: DestinationType;
}

export function emissionPolicyDestinationSerializer(item: EmissionPolicyDestination): any {
  return { destinationType: item["destinationType"] };
}

export function emissionPolicyDestinationDeserializer(item: any): EmissionPolicyDestination {
  return {
    destinationType: item["destinationType"],
  };
}

/** Emission destination type. */
export enum KnownDestinationType {
  /** AzureMonitor */
  AzureMonitor = "AzureMonitor",
}

/**
 * Emission destination type. \
 * {@link KnownDestinationType} can be used interchangeably with DestinationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureMonitor**: AzureMonitor
 */
export type DestinationType = string;

/** The response of a CollectorPolicy list operation. */
export interface _CollectorPolicyListResult {
  /** The CollectorPolicy items on this page */
  value: CollectorPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _collectorPolicyListResultDeserializer(item: any): _CollectorPolicyListResult {
  return {
    value: collectorPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function collectorPolicyArraySerializer(result: Array<CollectorPolicy>): any[] {
  return result.map((item) => {
    return collectorPolicySerializer(item);
  });
}

export function collectorPolicyArrayDeserializer(result: Array<CollectorPolicy>): any[] {
  return result.map((item) => {
    return collectorPolicyDeserializer(item);
  });
}

/** Paged collection of Operation items */
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

/** Azure Traffic Collector REST API operation definition. */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** Display metadata associated with the operation. */
  display?: OperationDisplay;
  /** Origin of the operation */
  origin?: string;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft NetworkFunction. */
  provider?: string;
  /** Resource on which the operation is performed etc. */
  resource?: string;
  /** Type of operation: get, read, delete, etc. */
  operation?: string;
  /** Description of the operation. */
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

/** The response of a AzureTrafficCollector list operation. */
export interface _AzureTrafficCollectorListResult {
  /** The AzureTrafficCollector items on this page */
  value: AzureTrafficCollector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _azureTrafficCollectorListResultDeserializer(
  item: any,
): _AzureTrafficCollectorListResult {
  return {
    value: azureTrafficCollectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureTrafficCollectorArraySerializer(result: Array<AzureTrafficCollector>): any[] {
  return result.map((item) => {
    return azureTrafficCollectorSerializer(item);
  });
}

export function azureTrafficCollectorArrayDeserializer(
  result: Array<AzureTrafficCollector>,
): any[] {
  return result.map((item) => {
    return azureTrafficCollectorDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2022-11-01 API version. */
  V20221101 = "2022-11-01",
}

export function _azureTrafficCollectorPropertiesSerializer(item: AzureTrafficCollector): any {
  return {
    virtualHub: !item["virtualHub"]
      ? item["virtualHub"]
      : resourceReferenceSerializer(item["virtualHub"]),
  };
}

export function _azureTrafficCollectorPropertiesDeserializer(item: any) {
  return {
    collectorPolicies: !item["collectorPolicies"]
      ? item["collectorPolicies"]
      : resourceReferenceArrayDeserializer(item["collectorPolicies"]),
    virtualHub: !item["virtualHub"]
      ? item["virtualHub"]
      : resourceReferenceDeserializer(item["virtualHub"]),
    provisioningState: item["provisioningState"],
  };
}

export function _collectorPolicyPropertiesSerializer(item: CollectorPolicy): any {
  return {
    ingestionPolicy: !item["ingestionPolicy"]
      ? item["ingestionPolicy"]
      : ingestionPolicyPropertiesFormatSerializer(item["ingestionPolicy"]),
    emissionPolicies: !item["emissionPolicies"]
      ? item["emissionPolicies"]
      : emissionPoliciesPropertiesFormatArraySerializer(item["emissionPolicies"]),
  };
}

export function _collectorPolicyPropertiesDeserializer(item: any) {
  return {
    ingestionPolicy: !item["ingestionPolicy"]
      ? item["ingestionPolicy"]
      : ingestionPolicyPropertiesFormatDeserializer(item["ingestionPolicy"]),
    emissionPolicies: !item["emissionPolicies"]
      ? item["emissionPolicies"]
      : emissionPoliciesPropertiesFormatArrayDeserializer(item["emissionPolicies"]),
    provisioningState: item["provisioningState"],
  };
}
