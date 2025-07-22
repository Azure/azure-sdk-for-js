// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Result listing capacities. It contains a list of operations and a URL link to get the next set of results. */
export interface _OperationListResult {
  /** List of capacities supported by the Microsoft.PowerBIDedicated resource provider. */
  readonly value?: Operation[];
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Capacities REST API operation. */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation}. */
  readonly name?: string;
  /** The object that represents the operation. */
  display?: {
    provider?: string;
    resource?: string;
    operation?: string;
    description?: string;
  };
  /** Origin of the operation. */
  readonly origin?: string;
  /** Additional properties to expose performance metrics to shoebox. */
  properties?: {
    serviceSpecification?: ServiceSpecification;
  };
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : _operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : _operationProperties1Deserializer(item["properties"]),
  };
}

/** model interface _OperationDisplay */
export interface _OperationDisplay {
  /** Service provider: Microsoft.PowerBIDedicated. */
  readonly provider?: string;
  /** Resource on which the operation is performed: capacity, etc. */
  readonly resource?: string;
  /** Operation type: create, update, delete, etc. */
  readonly operation?: string;
  /** Localized description of the operation. */
  description?: string;
}

export function _operationDisplayDeserializer(item: any): _OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** model interface _OperationProperties1 */
export interface _OperationProperties1 {
  /** Service specification for exposing performance metrics to shoebox. */
  serviceSpecification?: ServiceSpecification;
}

export function _operationProperties1Deserializer(item: any): _OperationProperties1 {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Service specification for exposing performance metrics to shoebox. */
export interface ServiceSpecification {
  /** Metric specifications for exposing performance metrics to shoebox. */
  metricSpecifications?: MetricSpecification[];
  /** Log specifications for exposing diagnostic logs to shoebox. */
  logSpecifications?: LogSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Metric specification for exposing performance metrics to shoebox. */
export interface MetricSpecification {
  /** Metric name */
  readonly name?: string;
  /** Localizable metric name */
  displayName?: string;
  /** Localizable description of metric */
  displayDescription?: string;
  /** Unit for the metric */
  readonly unit?: string;
  /** Aggregation type for the metric */
  readonly aggregationType?: string;
  /** Pattern used to filter the metric */
  readonly metricFilterPattern?: string;
  /** For describing multi dimensional metrics */
  dimensions?: MetricSpecificationDimensionsItem[];
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    metricFilterPattern: item["metricFilterPattern"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricSpecificationDimensionsItemArrayDeserializer(item["dimensions"]),
  };
}

export function metricSpecificationDimensionsItemArrayDeserializer(
  result: Array<MetricSpecificationDimensionsItem>,
): any[] {
  return result.map((item) => {
    return metricSpecificationDimensionsItemDeserializer(item);
  });
}

/** model interface MetricSpecificationDimensionsItem */
export interface MetricSpecificationDimensionsItem {
  /** Dimension of the metric */
  readonly name?: string;
  /** Localizable dimension of the metric */
  displayName?: string;
}

export function metricSpecificationDimensionsItemDeserializer(
  item: any,
): MetricSpecificationDimensionsItem {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Log specification for exposing diagnostic logs to shoebox. */
export interface LogSpecification {
  /** Name of the log */
  readonly name?: string;
  /** Localizable name of the log */
  displayName?: string;
  /** Blob duration for the log */
  readonly blobDuration?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
  };
}

/** The error object */
export interface ErrorResponse {
  /** The error object. */
  error?: {
    code?: string;
    message?: string;
  };
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : _errorResponseErrorDeserializer(item["error"]),
  };
}

/** model interface _ErrorResponseError */
export interface _ErrorResponseError {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function _errorResponseErrorDeserializer(item: any): _ErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Represents an instance of a Dedicated Capacity resource. */
export interface DedicatedCapacity extends TrackedResource {
  /** The SKU of the PowerBI Dedicated capacity resource. */
  sku: CapacitySku;
  /** Properties of the provision operation request. */
  properties?: DedicatedCapacityProperties;
}

export function dedicatedCapacitySerializer(item: DedicatedCapacity): any {
  return {
    tags: item["tags"],
    location: item["location"],
    sku: capacitySkuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedCapacityPropertiesSerializer(item["properties"]),
  };
}

export function dedicatedCapacityDeserializer(item: any): DedicatedCapacity {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    sku: capacitySkuDeserializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedCapacityPropertiesDeserializer(item["properties"]),
  };
}

/** Represents the SKU name and Azure pricing tier for PowerBI Dedicated capacity resource. */
export interface CapacitySku {
  /** Name of the SKU level. */
  name: string;
  /** The name of the Azure pricing tier to which the SKU applies. */
  tier?: CapacitySkuTier;
  /** The capacity of the SKU. */
  capacity?: number;
}

export function capacitySkuSerializer(item: CapacitySku): any {
  return { name: item["name"], tier: item["tier"], capacity: item["capacity"] };
}

export function capacitySkuDeserializer(item: any): CapacitySku {
  return {
    name: item["name"],
    tier: item["tier"],
    capacity: item["capacity"],
  };
}

/** The name of the Azure pricing tier to which the SKU applies. */
export enum KnownCapacitySkuTier {
  PbieAzure = "PBIE_Azure",
  Premium = "Premium",
  AutoPremiumHost = "AutoPremiumHost",
}

/**
 * The name of the Azure pricing tier to which the SKU applies. \
 * {@link KnownCapacitySkuTier} can be used interchangeably with CapacitySkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PBIE_Azure** \
 * **Premium** \
 * **AutoPremiumHost**
 */
export type CapacitySkuTier = string;

/** Properties of Dedicated Capacity resource. */
export interface DedicatedCapacityProperties extends DedicatedCapacityMutableProperties {
  /** The current state of PowerBI Dedicated resource. The state is to indicate more states outside of resource provisioning. */
  readonly state?: State;
  /** The current deployment state of PowerBI Dedicated resource. The provisioningState is to indicate states for resource provisioning. */
  readonly provisioningState?: CapacityProvisioningState;
}

export function dedicatedCapacityPropertiesSerializer(item: DedicatedCapacityProperties): any {
  return {
    administration: !item["administration"]
      ? item["administration"]
      : dedicatedCapacityAdministratorsSerializer(item["administration"]),
    mode: item["mode"],
  };
}

export function dedicatedCapacityPropertiesDeserializer(item: any): DedicatedCapacityProperties {
  return {
    administration: !item["administration"]
      ? item["administration"]
      : dedicatedCapacityAdministratorsDeserializer(item["administration"]),
    mode: item["mode"],
    tenantId: item["tenantId"],
    friendlyName: item["friendlyName"],
    state: item["state"],
    provisioningState: item["provisioningState"],
  };
}

/** The current state of PowerBI Dedicated resource. The state is to indicate more states outside of resource provisioning. */
export enum KnownState {
  Deleting = "Deleting",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Paused = "Paused",
  Suspended = "Suspended",
  Provisioning = "Provisioning",
  Updating = "Updating",
  Suspending = "Suspending",
  Pausing = "Pausing",
  Resuming = "Resuming",
  Preparing = "Preparing",
  Scaling = "Scaling",
}

/**
 * The current state of PowerBI Dedicated resource. The state is to indicate more states outside of resource provisioning. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Paused** \
 * **Suspended** \
 * **Provisioning** \
 * **Updating** \
 * **Suspending** \
 * **Pausing** \
 * **Resuming** \
 * **Preparing** \
 * **Scaling**
 */
export type State = string;

/** The current deployment state of PowerBI Dedicated resource. The provisioningState is to indicate states for resource provisioning. */
export enum KnownCapacityProvisioningState {
  Deleting = "Deleting",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Paused = "Paused",
  Suspended = "Suspended",
  Provisioning = "Provisioning",
  Updating = "Updating",
  Suspending = "Suspending",
  Pausing = "Pausing",
  Resuming = "Resuming",
  Preparing = "Preparing",
  Scaling = "Scaling",
}

/**
 * The current deployment state of PowerBI Dedicated resource. The provisioningState is to indicate states for resource provisioning. \
 * {@link KnownCapacityProvisioningState} can be used interchangeably with CapacityProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Paused** \
 * **Suspended** \
 * **Provisioning** \
 * **Updating** \
 * **Suspending** \
 * **Pausing** \
 * **Resuming** \
 * **Preparing** \
 * **Scaling**
 */
export type CapacityProvisioningState = string;

/** An object that represents a set of mutable Dedicated capacity resource properties. */
export interface DedicatedCapacityMutableProperties {
  /** A collection of Dedicated capacity administrators */
  administration?: DedicatedCapacityAdministrators;
  /** Specifies the generation of the Power BI Embedded capacity. If no value is specified, the default value 'Gen2' is used. [Learn More](https://docs.microsoft.com/power-bi/developer/embedded/power-bi-embedded-generation-2) */
  mode?: Mode;
  /** Tenant ID for the capacity. Used for creating Pro Plus capacity. */
  readonly tenantId?: string;
  /** Capacity name */
  readonly friendlyName?: string;
}

export function dedicatedCapacityMutablePropertiesSerializer(
  item: DedicatedCapacityMutableProperties,
): any {
  return {
    administration: !item["administration"]
      ? item["administration"]
      : dedicatedCapacityAdministratorsSerializer(item["administration"]),
    mode: item["mode"],
  };
}

export function dedicatedCapacityMutablePropertiesDeserializer(
  item: any,
): DedicatedCapacityMutableProperties {
  return {
    administration: !item["administration"]
      ? item["administration"]
      : dedicatedCapacityAdministratorsDeserializer(item["administration"]),
    mode: item["mode"],
    tenantId: item["tenantId"],
    friendlyName: item["friendlyName"],
  };
}

/** An array of administrator user identities */
export interface DedicatedCapacityAdministrators {
  /** An array of administrator user identities. */
  members?: string[];
}

export function dedicatedCapacityAdministratorsSerializer(
  item: DedicatedCapacityAdministrators,
): any {
  return {
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
  };
}

export function dedicatedCapacityAdministratorsDeserializer(
  item: any,
): DedicatedCapacityAdministrators {
  return {
    members: !item["members"]
      ? item["members"]
      : item["members"].map((p: any) => {
          return p;
        }),
  };
}

/** Specifies the generation of the Power BI Embedded capacity. If no value is specified, the default value 'Gen2' is used. [Learn More](https://docs.microsoft.com/power-bi/developer/embedded/power-bi-embedded-generation-2) */
export enum KnownMode {
  Gen1 = "Gen1",
  Gen2 = "Gen2",
}

/**
 * Specifies the generation of the Power BI Embedded capacity. If no value is specified, the default value 'Gen2' is used. [Learn More](https://docs.microsoft.com/power-bi/developer/embedded/power-bi-embedded-generation-2) \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Gen1** \
 * **Gen2**
 */
export type Mode = string;

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

/** Provision request specification */
export interface DedicatedCapacityUpdateParameters {
  /** The SKU of the Dedicated capacity resource. */
  sku?: CapacitySku;
  /** Key-value pairs of additional provisioning properties. */
  tags?: Record<string, string>;
  /** Properties of the provision operation request. */
  properties?: DedicatedCapacityMutableProperties;
}

export function dedicatedCapacityUpdateParametersSerializer(
  item: DedicatedCapacityUpdateParameters,
): any {
  return {
    sku: !item["sku"] ? item["sku"] : capacitySkuSerializer(item["sku"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedCapacityMutablePropertiesSerializer(item["properties"]),
  };
}

/** An array of Dedicated capacities resources. */
export interface _DedicatedCapacities {
  /** An array of Dedicated capacities resources. */
  value: DedicatedCapacity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dedicatedCapacitiesDeserializer(item: any): _DedicatedCapacities {
  return {
    value: dedicatedCapacityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dedicatedCapacityArraySerializer(result: Array<DedicatedCapacity>): any[] {
  return result.map((item) => {
    return dedicatedCapacitySerializer(item);
  });
}

export function dedicatedCapacityArrayDeserializer(result: Array<DedicatedCapacity>): any[] {
  return result.map((item) => {
    return dedicatedCapacityDeserializer(item);
  });
}

/** The request has succeeded. */
export interface OkResponse {}

export function okResponseDeserializer(item: any): OkResponse {
  return item;
}

/** An object that represents enumerating SKUs for existing resources */
export interface SkuEnumerationForExistingResourceResult {
  /** The collection of available SKUs for existing resources */
  value?: SkuDetailsForExistingResource[];
}

export function skuEnumerationForExistingResourceResultDeserializer(
  item: any,
): SkuEnumerationForExistingResourceResult {
  return {
    value: !item["value"]
      ? item["value"]
      : skuDetailsForExistingResourceArrayDeserializer(item["value"]),
  };
}

export function skuDetailsForExistingResourceArrayDeserializer(
  result: Array<SkuDetailsForExistingResource>,
): any[] {
  return result.map((item) => {
    return skuDetailsForExistingResourceDeserializer(item);
  });
}

/** An object that represents SKU details for existing resources */
export interface SkuDetailsForExistingResource {
  /** The resource type */
  resourceType?: string;
  /** The SKU in SKU details for existing resources. */
  sku?: CapacitySku;
}

export function skuDetailsForExistingResourceDeserializer(
  item: any,
): SkuDetailsForExistingResource {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : capacitySkuDeserializer(item["sku"]),
  };
}

/** An object that represents enumerating SKUs for new resources */
export interface SkuEnumerationForNewResourceResult {
  /** The collection of available SKUs for new resources */
  value?: CapacitySku[];
}

export function skuEnumerationForNewResourceResultDeserializer(
  item: any,
): SkuEnumerationForNewResourceResult {
  return {
    value: !item["value"] ? item["value"] : capacitySkuArrayDeserializer(item["value"]),
  };
}

export function capacitySkuArraySerializer(result: Array<CapacitySku>): any[] {
  return result.map((item) => {
    return capacitySkuSerializer(item);
  });
}

export function capacitySkuArrayDeserializer(result: Array<CapacitySku>): any[] {
  return result.map((item) => {
    return capacitySkuDeserializer(item);
  });
}

/** Details of capacity name request body. */
export interface CheckCapacityNameAvailabilityParameters {
  /** Name for checking availability. */
  name?: string;
  /** The resource type of PowerBI dedicated. */
  type?: string;
}

export function checkCapacityNameAvailabilityParametersSerializer(
  item: CheckCapacityNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The checking result of capacity name availability. */
export interface CheckCapacityNameAvailabilityResult {
  /** Indicator of availability of the capacity name. */
  nameAvailable?: boolean;
  /** The reason of unavailability. */
  reason?: string;
  /** The detailed message of the request unavailability. */
  message?: string;
}

export function checkCapacityNameAvailabilityResultDeserializer(
  item: any,
): CheckCapacityNameAvailabilityResult {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Represents an instance of an auto scale v-core resource. */
export interface AutoScaleVCore extends TrackedResource {
  /** The SKU of the auto scale v-core resource. */
  sku: AutoScaleVCoreSku;
  /** Properties of an auto scale v-core resource. */
  properties?: AutoScaleVCoreProperties;
}

export function autoScaleVCoreSerializer(item: AutoScaleVCore): any {
  return {
    tags: item["tags"],
    location: item["location"],
    sku: autoScaleVCoreSkuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : autoScaleVCorePropertiesSerializer(item["properties"]),
  };
}

export function autoScaleVCoreDeserializer(item: any): AutoScaleVCore {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    sku: autoScaleVCoreSkuDeserializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : autoScaleVCorePropertiesDeserializer(item["properties"]),
  };
}

/** Represents the SKU name and Azure pricing tier for auto scale v-core resource. */
export interface AutoScaleVCoreSku {
  /** Name of the SKU level. */
  name: string;
  /** The name of the Azure pricing tier to which the SKU applies. */
  tier?: VCoreSkuTier;
  /** The capacity of an auto scale v-core resource. */
  capacity?: number;
}

export function autoScaleVCoreSkuSerializer(item: AutoScaleVCoreSku): any {
  return { name: item["name"], tier: item["tier"], capacity: item["capacity"] };
}

export function autoScaleVCoreSkuDeserializer(item: any): AutoScaleVCoreSku {
  return {
    name: item["name"],
    tier: item["tier"],
    capacity: item["capacity"],
  };
}

/** The name of the Azure pricing tier to which the SKU applies. */
export enum KnownVCoreSkuTier {
  AutoScale = "AutoScale",
}

/**
 * The name of the Azure pricing tier to which the SKU applies. \
 * {@link KnownVCoreSkuTier} can be used interchangeably with VCoreSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoScale**
 */
export type VCoreSkuTier = string;

/** Properties of an auto scale v-core resource. */
export interface AutoScaleVCoreProperties extends AutoScaleVCoreMutableProperties {
  /** The object ID of the capacity resource associated with the auto scale v-core resource. */
  capacityObjectId?: string;
  /** The current deployment state of an auto scale v-core resource. The provisioningState is to indicate states for resource provisioning. */
  readonly provisioningState?: VCoreProvisioningState;
}

export function autoScaleVCorePropertiesSerializer(item: AutoScaleVCoreProperties): any {
  return {
    capacityLimit: item["capacityLimit"],
    capacityObjectId: item["capacityObjectId"],
  };
}

export function autoScaleVCorePropertiesDeserializer(item: any): AutoScaleVCoreProperties {
  return {
    capacityLimit: item["capacityLimit"],
    capacityObjectId: item["capacityObjectId"],
    provisioningState: item["provisioningState"],
  };
}

/** The current deployment state of an auto scale v-core resource. The provisioningState is to indicate states for resource provisioning. */
export enum KnownVCoreProvisioningState {
  Succeeded = "Succeeded",
}

/**
 * The current deployment state of an auto scale v-core resource. The provisioningState is to indicate states for resource provisioning. \
 * {@link KnownVCoreProvisioningState} can be used interchangeably with VCoreProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**
 */
export type VCoreProvisioningState = string;

/** An object that represents a set of mutable auto scale v-core resource properties. */
export interface AutoScaleVCoreMutableProperties {
  /** The maximum capacity of an auto scale v-core resource. */
  capacityLimit?: number;
}

export function autoScaleVCoreMutablePropertiesSerializer(
  item: AutoScaleVCoreMutableProperties,
): any {
  return { capacityLimit: item["capacityLimit"] };
}

export function autoScaleVCoreMutablePropertiesDeserializer(
  item: any,
): AutoScaleVCoreMutableProperties {
  return {
    capacityLimit: item["capacityLimit"],
  };
}

/** Update request specification */
export interface AutoScaleVCoreUpdateParameters {
  /** The SKU of the auto scale v-core resource. */
  sku?: AutoScaleVCoreSku;
  /** Key-value pairs of additional provisioning properties. */
  tags?: Record<string, string>;
  /** Properties of the update operation request. */
  properties?: AutoScaleVCoreMutableProperties;
}

export function autoScaleVCoreUpdateParametersSerializer(
  item: AutoScaleVCoreUpdateParameters,
): any {
  return {
    sku: !item["sku"] ? item["sku"] : autoScaleVCoreSkuSerializer(item["sku"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : autoScaleVCoreMutablePropertiesSerializer(item["properties"]),
  };
}

/** An array of auto scale v-core resources. */
export interface _AutoScaleVCoreListResult {
  /** An array of auto scale v-core resources. */
  value: AutoScaleVCore[];
  nextLink?: string;
}

export function _autoScaleVCoreListResultDeserializer(item: any): _AutoScaleVCoreListResult {
  return {
    value: autoScaleVCoreArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autoScaleVCoreArraySerializer(result: Array<AutoScaleVCore>): any[] {
  return result.map((item) => {
    return autoScaleVCoreSerializer(item);
  });
}

export function autoScaleVCoreArrayDeserializer(result: Array<AutoScaleVCore>): any[] {
  return result.map((item) => {
    return autoScaleVCoreDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2021-01-01 API version. */
  V20210101 = "2021-01-01",
}
