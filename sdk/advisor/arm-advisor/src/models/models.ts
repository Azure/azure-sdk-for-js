// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Parameters for predict recommendation. */
export interface PredictionRequest {
  /** Type of the prediction. */
  predictionType?: PredictionType;
  /** Extended properties are arguments specific for each prediction type. */
  extendedProperties?: any;
}

export function predictionRequestSerializer(item: PredictionRequest): any {
  return {
    properties: areAllPropsUndefined(item, ["predictionType", "extendedProperties"])
      ? undefined
      : _predictionRequestPropertiesSerializer(item),
  };
}

/** Properties given for the predictor. */
export interface PredictionRequestProperties {
  /** Type of the prediction. */
  predictionType?: PredictionType;
  /** Extended properties are arguments specific for each prediction type. */
  extendedProperties?: any;
}

export function predictionRequestPropertiesSerializer(item: PredictionRequestProperties): any {
  return { predictionType: item["predictionType"], extendedProperties: item["extendedProperties"] };
}

/** Type of the prediction. */
export enum KnownPredictionType {
  /** PredictiveRightsizing */
  PredictiveRightsizing = "PredictiveRightsizing",
}

/**
 * Type of the prediction. \
 * {@link KnownPredictionType} can be used interchangeably with PredictionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PredictiveRightsizing**
 */
export type PredictionType = string;

/** Response used by predictions. */
export interface PredictionResponse {
  /** Extended properties */
  extendedProperties?: any;
  /** Type of the prediction. */
  predictionType?: PredictionType;
  /** The category of the recommendation. */
  category?: Category;
  /** The business impact of the recommendation. */
  impact?: Impact;
  /** The resource type identified by Advisor. */
  impactedField?: string;
  /** The most recent time that Advisor checked the validity of the recommendation. */
  lastUpdated?: Date;
  /** A summary of the recommendation. */
  shortDescription?: ShortDescription;
}

export function predictionResponseDeserializer(item: any): PredictionResponse {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _predictionResponsePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the prediction */
export interface PredictionResponseProperties {
  /** Extended properties */
  extendedProperties?: any;
  /** Type of the prediction. */
  predictionType?: PredictionType;
  /** The category of the recommendation. */
  category?: Category;
  /** The business impact of the recommendation. */
  impact?: Impact;
  /** The resource type identified by Advisor. */
  impactedField?: string;
  /** The most recent time that Advisor checked the validity of the recommendation. */
  lastUpdated?: Date;
  /** A summary of the recommendation. */
  shortDescription?: ShortDescription;
}

export function predictionResponsePropertiesDeserializer(item: any): PredictionResponseProperties {
  return {
    extendedProperties: item["extendedProperties"],
    predictionType: item["predictionType"],
    category: item["category"],
    impact: item["impact"],
    impactedField: item["impactedField"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    shortDescription: !item["shortDescription"]
      ? item["shortDescription"]
      : shortDescriptionDeserializer(item["shortDescription"]),
  };
}

/** The category of the recommendation. */
export enum KnownCategory {
  /** HighAvailability */
  HighAvailability = "HighAvailability",
  /** Security */
  Security = "Security",
  /** Performance */
  Performance = "Performance",
  /** Cost */
  Cost = "Cost",
  /** OperationalExcellence */
  OperationalExcellence = "OperationalExcellence",
}

/**
 * The category of the recommendation. \
 * {@link KnownCategory} can be used interchangeably with Category,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HighAvailability** \
 * **Security** \
 * **Performance** \
 * **Cost** \
 * **OperationalExcellence**
 */
export type Category = string;

/** The business impact of the recommendation. */
export enum KnownImpact {
  /** High */
  High = "High",
  /** Medium */
  Medium = "Medium",
  /** Low */
  Low = "Low",
}

/**
 * The business impact of the recommendation. \
 * {@link KnownImpact} can be used interchangeably with Impact,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High** \
 * **Medium** \
 * **Low**
 */
export type Impact = string;

/** A summary of the recommendation. */
export interface ShortDescription {
  /** The issue or opportunity identified by the recommendation and proposed solution. */
  problem?: string;
  /** The issue or opportunity identified by the recommendation and proposed solution. */
  solution?: string;
}

export function shortDescriptionDeserializer(item: any): ShortDescription {
  return {
    problem: item["problem"],
    solution: item["solution"],
  };
}

/** model interface ArmErrorResponse */
export interface ArmErrorResponse {
  /** ARM error response body. */
  error?: ARMErrorResponseBody;
}

export function armErrorResponseDeserializer(item: any): ArmErrorResponse {
  return {
    error: !item["error"] ? item["error"] : armErrorResponseBodyDeserializer(item["error"]),
  };
}

/** ARM error response body. */
export interface ARMErrorResponseBody {
  /** Gets or sets the string that describes the error in detail and provides debugging information. */
  message?: string;
  /** Gets or sets the string that can be used to programmatically identify the error. */
  code?: string;
}

export function armErrorResponseBodyDeserializer(item: any): ARMErrorResponseBody {
  return {
    message: item["message"],
    code: item["code"],
  };
}

/** Paged collection of OperationEntity items */
export interface _OperationEntityListResult {
  /** The OperationEntity items on this page */
  value: OperationEntity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationEntityListResultDeserializer(item: any): _OperationEntityListResult {
  return {
    value: operationEntityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationEntityArrayDeserializer(result: Array<OperationEntity>): any[] {
  return result.map((item) => {
    return operationEntityDeserializer(item);
  });
}

/** The operation supported by Advisor. */
export interface OperationEntity {
  /** Operation name: {provider}/{resource}/{operation}. */
  name?: string;
  /** The operation supported by Advisor. */
  display?: OperationDisplayInfo;
}

export function operationEntityDeserializer(item: any): OperationEntity {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayInfoDeserializer(item["display"]),
  };
}

/** The operation supported by Advisor. */
export interface OperationDisplayInfo {
  /** The description of the operation. */
  description?: string;
  /** The action that users can perform, based on their permission level. */
  operation?: string;
  /** Service provider: Microsoft Advisor. */
  provider?: string;
  /** Resource on which the operation is performed. */
  resource?: string;
}

export function operationDisplayInfoDeserializer(item: any): OperationDisplayInfo {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

/** The metadata entity contract. */
export interface MetadataEntity extends ProxyResource {
  /** The display name. */
  displayName?: string;
  /** The list of keys on which this entity depends on. */
  dependsOn?: string[];
  /** The list of scenarios applicable to this metadata entity. */
  applicableScenarios?: Scenario[];
  /** The list of supported values. */
  supportedValues?: MetadataSupportedValueDetail[];
}

export function metadataEntityDeserializer(item: any): MetadataEntity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _metadataEntityPropertiesDeserializer(item["properties"])),
  };
}

/** The metadata entity properties */
export interface MetadataEntityProperties {
  /** The display name. */
  displayName?: string;
  /** The list of keys on which this entity depends on. */
  dependsOn?: string[];
  /** The list of scenarios applicable to this metadata entity. */
  applicableScenarios?: Scenario[];
  /** The list of supported values. */
  supportedValues?: MetadataSupportedValueDetail[];
}

export function metadataEntityPropertiesDeserializer(item: any): MetadataEntityProperties {
  return {
    displayName: item["displayName"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p: any) => {
          return p;
        }),
    applicableScenarios: !item["applicableScenarios"]
      ? item["applicableScenarios"]
      : item["applicableScenarios"].map((p: any) => {
          return p;
        }),
    supportedValues: !item["supportedValues"]
      ? item["supportedValues"]
      : metadataSupportedValueDetailArrayDeserializer(item["supportedValues"]),
  };
}

/** The list of scenarios applicable to this metadata entity. */
export enum KnownScenario {
  /** Alerts */
  Alerts = "Alerts",
}

/**
 * The list of scenarios applicable to this metadata entity. \
 * {@link KnownScenario} can be used interchangeably with Scenario,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Alerts**
 */
export type Scenario = string;

export function metadataSupportedValueDetailArrayDeserializer(
  result: Array<MetadataSupportedValueDetail>,
): any[] {
  return result.map((item) => {
    return metadataSupportedValueDetailDeserializer(item);
  });
}

/** The metadata supported value detail. */
export interface MetadataSupportedValueDetail {
  /** The id. */
  id?: string;
  /** The display name. */
  displayName?: string;
}

export function metadataSupportedValueDetailDeserializer(item: any): MetadataSupportedValueDetail {
  return {
    id: item["id"],
    displayName: item["displayName"],
  };
}

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

/** The response of a MetadataEntity list operation. */
export interface _MetadataEntityListResult {
  /** The MetadataEntity items on this page */
  value: MetadataEntity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _metadataEntityListResultDeserializer(item: any): _MetadataEntityListResult {
  return {
    value: metadataEntityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function metadataEntityArrayDeserializer(result: Array<MetadataEntity>): any[] {
  return result.map((item) => {
    return metadataEntityDeserializer(item);
  });
}

/** Advisor Recommendation. */
export interface ResourceRecommendationBase extends ExtensionResource {
  /** The category of the recommendation. */
  category?: Category;
  /** The sub-category of the recommendation. */
  control?: Control;
  /** The business impact of the recommendation. */
  impact?: Impact;
  /** The resource type identified by Advisor. */
  impactedField?: string;
  /** The resource identified by Advisor. */
  impactedValue?: string;
  /** The state of the Recommendation */
  recommendationStatus?: RecommendationStatus;
  /** The type of recommendation completion, which is either MarkedByUser or SystemVerified */
  completionType?: string;
  /** The reason the Recommendation was dismissed. */
  recommendationDismissReason?: RecommendationDismissReason;
  /** The time the Recommendation was postponed until. */
  postponedUntilDateTime?: Date;
  /** The most recent time Advisor evaluated the recommendation for validity (re-ingested). */
  lastRefreshed?: Date;
  /** The most recent time the recommendation state changed (manual or automated). */
  lastUpdated?: Date;
  /** The created time of the recommendation. */
  createdTime?: Date;
  /** The recommendation metadata. */
  metadata?: Record<string, any>;
  /** The recommendation-type GUID. */
  recommendationTypeId?: string;
  /** The potential risk of not implementing the recommendation. */
  risk?: Risk;
  /** A summary of the recommendation. */
  shortDescription?: ShortDescription;
  /** The single snoozed or dismissed rule for the recommendation. */
  suppressionId?: string;
  /** Extended properties */
  extendedProperties?: Record<string, string>;
  /** Metadata of resource that was assessed */
  resourceMetadata?: ResourceMetadata;
  /** The detailed description of recommendation. */
  description?: string;
  /** The label of recommendation. */
  label?: string;
  /** The link to learn more about recommendation and generation logic. */
  learnMoreLink?: string;
  /** The potential benefit of implementing recommendation. */
  potentialBenefits?: string;
  /** The list of recommended actions to implement recommendation. */
  actions?: Record<string, any>[];
  /** The automated way to apply recommendation. */
  remediation?: Record<string, any>;
  /** The recommendation metadata properties exposed to customer to provide additional information. */
  exposedMetadataProperties?: Record<string, any>;
  /** The properties of a tracked recommendation. */
  trackedProperties?: TrackedRecommendationProperties;
  /** The Review that this Recommendation belongs to. */
  review?: RecommendationPropertiesReview;
  /** The Workload that this Resource belongs to. */
  resourceWorkload?: RecommendationPropertiesResourceWorkload;
  /** The Source System that this Recommendation originated from. */
  sourceSystem?: string;
  /** Additional notes for the Recommendation */
  notes?: string;
}

export function resourceRecommendationBaseDeserializer(item: any): ResourceRecommendationBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _resourceRecommendationBasePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of the recommendation. */
export interface RecommendationProperties {
  /** The category of the recommendation. */
  category?: Category;
  /** The sub-category of the recommendation. */
  control?: Control;
  /** The business impact of the recommendation. */
  impact?: Impact;
  /** The resource type identified by Advisor. */
  impactedField?: string;
  /** The resource identified by Advisor. */
  impactedValue?: string;
  /** The state of the Recommendation */
  recommendationStatus?: RecommendationStatus;
  /** The type of recommendation completion, which is either MarkedByUser or SystemVerified */
  completionType?: string;
  /** The reason the Recommendation was dismissed. */
  recommendationDismissReason?: RecommendationDismissReason;
  /** The time the Recommendation was postponed until. */
  postponedUntilDateTime?: Date;
  /** The most recent time Advisor evaluated the recommendation for validity (re-ingested). */
  lastRefreshed?: Date;
  /** The most recent time the recommendation state changed (manual or automated). */
  lastUpdated?: Date;
  /** The created time of the recommendation. */
  createdTime?: Date;
  /** The recommendation metadata. */
  metadata?: Record<string, any>;
  /** The recommendation-type GUID. */
  recommendationTypeId?: string;
  /** The potential risk of not implementing the recommendation. */
  risk?: Risk;
  /** A summary of the recommendation. */
  shortDescription?: ShortDescription;
  /** The single snoozed or dismissed rule for the recommendation. */
  suppressionId?: string;
  /** Extended properties */
  extendedProperties?: Record<string, string>;
  /** Metadata of resource that was assessed */
  resourceMetadata?: ResourceMetadata;
  /** The detailed description of recommendation. */
  description?: string;
  /** The label of recommendation. */
  label?: string;
  /** The link to learn more about recommendation and generation logic. */
  learnMoreLink?: string;
  /** The potential benefit of implementing recommendation. */
  potentialBenefits?: string;
  /** The list of recommended actions to implement recommendation. */
  actions?: Record<string, any>[];
  /** The automated way to apply recommendation. */
  remediation?: Record<string, any>;
  /** The recommendation metadata properties exposed to customer to provide additional information. */
  exposedMetadataProperties?: Record<string, any>;
  /** The properties of a tracked recommendation. */
  trackedProperties?: TrackedRecommendationProperties;
  /** The Review that this Recommendation belongs to. */
  review?: RecommendationPropertiesReview;
  /** The Workload that this Resource belongs to. */
  resourceWorkload?: RecommendationPropertiesResourceWorkload;
  /** The Source System that this Recommendation originated from. */
  sourceSystem?: string;
  /** Additional notes for the Recommendation */
  notes?: string;
}

export function recommendationPropertiesDeserializer(item: any): RecommendationProperties {
  return {
    category: item["category"],
    control: item["control"],
    impact: item["impact"],
    impactedField: item["impactedField"],
    impactedValue: item["impactedValue"],
    recommendationStatus: item["recommendationStatus"],
    completionType: item["completionType"],
    recommendationDismissReason: item["recommendationDismissReason"],
    postponedUntilDateTime: !item["postponedUntilDateTime"]
      ? item["postponedUntilDateTime"]
      : new Date(item["postponedUntilDateTime"]),
    lastRefreshed: !item["lastRefreshed"] ? item["lastRefreshed"] : new Date(item["lastRefreshed"]),
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    recommendationTypeId: item["recommendationTypeId"],
    risk: item["risk"],
    shortDescription: !item["shortDescription"]
      ? item["shortDescription"]
      : shortDescriptionDeserializer(item["shortDescription"]),
    suppressionId: item["suppressionId"],
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : Object.fromEntries(
          Object.entries(item["extendedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    resourceMetadata: !item["resourceMetadata"]
      ? item["resourceMetadata"]
      : resourceMetadataDeserializer(item["resourceMetadata"]),
    description: item["description"],
    label: item["label"],
    learnMoreLink: item["learnMoreLink"],
    potentialBenefits: item["potentialBenefits"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1]));
        }),
    remediation: !item["remediation"]
      ? item["remediation"]
      : Object.fromEntries(
          Object.entries(item["remediation"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    exposedMetadataProperties: !item["exposedMetadataProperties"]
      ? item["exposedMetadataProperties"]
      : Object.fromEntries(
          Object.entries(item["exposedMetadataProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    trackedProperties: !item["trackedProperties"]
      ? item["trackedProperties"]
      : trackedRecommendationPropertiesDeserializer(item["trackedProperties"]),
    review: !item["review"]
      ? item["review"]
      : recommendationPropertiesReviewDeserializer(item["review"]),
    resourceWorkload: !item["resourceWorkload"]
      ? item["resourceWorkload"]
      : recommendationPropertiesResourceWorkloadDeserializer(item["resourceWorkload"]),
    sourceSystem: item["sourceSystem"],
    notes: item["notes"],
  };
}

/** The sub-category of the recommendation. */
export enum KnownControl {
  /** HighAvailability */
  HighAvailability = "HighAvailability",
  /** BusinessContinuity */
  BusinessContinuity = "BusinessContinuity",
  /** DisasterRecovery */
  DisasterRecovery = "DisasterRecovery",
  /** Scalability */
  Scalability = "Scalability",
  /** MonitoringAndAlerting */
  MonitoringAndAlerting = "MonitoringAndAlerting",
  /** ServiceUpgradeAndRetirement */
  ServiceUpgradeAndRetirement = "ServiceUpgradeAndRetirement",
  /** Other */
  Other = "Other",
  /** PrioritizedRecommendations */
  PrioritizedRecommendations = "PrioritizedRecommendations",
  /** Personalized */
  Personalized = "Personalized",
}

/**
 * The sub-category of the recommendation. \
 * {@link KnownControl} can be used interchangeably with Control,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HighAvailability** \
 * **BusinessContinuity** \
 * **DisasterRecovery** \
 * **Scalability** \
 * **MonitoringAndAlerting** \
 * **ServiceUpgradeAndRetirement** \
 * **Other** \
 * **PrioritizedRecommendations** \
 * **Personalized**
 */
export type Control = string;

/** The state of the Recommendation applicable from v2026-02-01-preview. */
export enum KnownRecommendationStatus {
  /** New */
  New = "New",
  /** Postponed */
  Postponed = "Postponed",
  /** Dismissed */
  Dismissed = "Dismissed",
  /** Completed */
  Completed = "Completed",
}

/**
 * The state of the Recommendation applicable from v2026-02-01-preview. \
 * {@link KnownRecommendationStatus} can be used interchangeably with RecommendationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New** \
 * **Postponed** \
 * **Dismissed** \
 * **Completed**
 */
export type RecommendationStatus = string;

/** The reason for dismissing the Recommendation. */
export enum KnownRecommendationDismissReason {
  /** ExcessiveCostInvestmentRequired */
  ExcessiveCostInvestmentRequired = "ExcessiveCostInvestmentRequired",
  /** TooComplexOrImpracticalToImplement */
  TooComplexOrImpracticalToImplement = "TooComplexOrImpracticalToImplement",
  /** AnAlternativeSolutionIsAlreadyInPlace */
  AnAlternativeSolutionIsAlreadyInPlace = "AnAlternativeSolutionIsAlreadyInPlace",
  /** IncompatibleWithTheCurrentConfiguration */
  IncompatibleWithTheCurrentConfiguration = "IncompatibleWithTheCurrentConfiguration",
  /** ImplementationStepsAreUnclear */
  ImplementationStepsAreUnclear = "ImplementationStepsAreUnclear",
  /** RiskIsAcceptable */
  RiskIsAcceptable = "RiskIsAcceptable",
  /** Other */
  Other = "Other",
}

/**
 * The reason for dismissing the Recommendation. \
 * {@link KnownRecommendationDismissReason} can be used interchangeably with RecommendationDismissReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ExcessiveCostInvestmentRequired** \
 * **TooComplexOrImpracticalToImplement** \
 * **AnAlternativeSolutionIsAlreadyInPlace** \
 * **IncompatibleWithTheCurrentConfiguration** \
 * **ImplementationStepsAreUnclear** \
 * **RiskIsAcceptable** \
 * **Other**
 */
export type RecommendationDismissReason = string;

/** The potential risk of not implementing the recommendation. */
export enum KnownRisk {
  /** Error */
  Error = "Error",
  /** Warning */
  Warning = "Warning",
  /** None */
  None = "None",
}

/**
 * The potential risk of not implementing the recommendation. \
 * {@link KnownRisk} can be used interchangeably with Risk,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error** \
 * **Warning** \
 * **None**
 */
export type Risk = string;

/** Recommendation resource metadata */
export interface ResourceMetadata {
  /** Azure resource Id of the assessed resource */
  resourceId?: string;
  /** Source from which recommendation is generated */
  source?: string;
  /** The action to view resource. */
  action?: Record<string, any>;
  /** The singular user friendly name of resource type. eg: virtual machine */
  singular?: string;
  /** The plural user friendly name of resource type. eg: virtual machines */
  plural?: string;
}

export function resourceMetadataDeserializer(item: any): ResourceMetadata {
  return {
    resourceId: item["resourceId"],
    source: item["source"],
    action: !item["action"]
      ? item["action"]
      : Object.fromEntries(Object.entries(item["action"]).map(([k, p]: [string, any]) => [k, p])),
    singular: item["singular"],
    plural: item["plural"],
  };
}

/** The tracked properties of a Recommendation */
export interface TrackedRecommendationProperties {
  /** The Priority of the Recommendation. */
  priority?: Priority;
}

export function trackedRecommendationPropertiesDeserializer(
  item: any,
): TrackedRecommendationProperties {
  return {
    priority: item["priority"],
  };
}

/** The Priority of the Recommendation. */
export enum KnownPriority {
  /** Critical */
  Critical = "Critical",
  /** High */
  High = "High",
  /** Medium */
  Medium = "Medium",
  /** Low */
  Low = "Low",
  /** Informational */
  Informational = "Informational",
}

/**
 * The Priority of the Recommendation. \
 * {@link KnownPriority} can be used interchangeably with Priority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical** \
 * **High** \
 * **Medium** \
 * **Low** \
 * **Informational**
 */
export type Priority = string;

/** The Review that this Recommendation belongs to. */
export interface RecommendationPropertiesReview {
  /** The ARM Resource Id of the Review */
  id?: string;
  /** The Name of the Review */
  name?: string;
}

export function recommendationPropertiesReviewDeserializer(
  item: any,
): RecommendationPropertiesReview {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** The Workload that this Resource belongs to. */
export interface RecommendationPropertiesResourceWorkload {
  /** The Id of the Workload */
  id?: string;
  /** The Name of the Workload */
  name?: string;
}

export function recommendationPropertiesResourceWorkloadDeserializer(
  item: any,
): RecommendationPropertiesResourceWorkload {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(_item: ExtensionResource): any {
  return {};
}

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

/** The recommendation patch payload. */
export interface RecommendationPatchPayload {
  /** The properties for recommendation patch payload. */
  properties?: RecommendationStatePropertiesPayload;
}

export function recommendationPatchPayloadSerializer(item: RecommendationPatchPayload): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : recommendationStatePropertiesPayloadSerializer(item["properties"]),
  };
}

/** Properties for recommendation state patch payload. */
export interface RecommendationStatePropertiesPayload {
  /** The state of the recommendation. */
  recommendationStatus?: RecommendationStatus;
  /** The reason the state of the Recommendation was changed. */
  recommendationDismissReason?: RecommendationDismissReason;
  /** The time the Recommendation was postponed until. */
  postponedUntilDateTime?: Date;
}

export function recommendationStatePropertiesPayloadSerializer(
  item: RecommendationStatePropertiesPayload,
): any {
  return {
    recommendationStatus: item["recommendationStatus"],
    recommendationDismissReason: item["recommendationDismissReason"],
    postponedUntilDateTime: !item["postponedUntilDateTime"]
      ? item["postponedUntilDateTime"]
      : item["postponedUntilDateTime"].toISOString(),
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

/** The response of a ResourceRecommendationBase list operation. */
export interface _ResourceRecommendationBaseListResult {
  /** The ResourceRecommendationBase items on this page */
  value: ResourceRecommendationBase[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceRecommendationBaseListResultDeserializer(
  item: any,
): _ResourceRecommendationBaseListResult {
  return {
    value: resourceRecommendationBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceRecommendationBaseArrayDeserializer(
  result: Array<ResourceRecommendationBase>,
): any[] {
  return result.map((item) => {
    return resourceRecommendationBaseDeserializer(item);
  });
}

/** The details of the snoozed or dismissed rule; for example, the duration, name, and GUID associated with the rule. */
export interface SuppressionContract extends ExtensionResource {
  /** The GUID of the suppression. */
  suppressionId?: string;
  /** The duration for which the suppression is valid. */
  ttl?: string;
  /** Gets or sets the expiration time stamp. */
  readonly expirationTimeStamp?: Date;
}

export function suppressionContractSerializer(item: SuppressionContract): any {
  return {
    properties: areAllPropsUndefined(item, ["suppressionId", "ttl"])
      ? undefined
      : _suppressionContractPropertiesSerializer(item),
  };
}

export function suppressionContractDeserializer(item: any): SuppressionContract {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _suppressionContractPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of the suppression. */
export interface SuppressionProperties {
  /** The GUID of the suppression. */
  suppressionId?: string;
  /** The duration for which the suppression is valid. */
  ttl?: string;
  /** Gets or sets the expiration time stamp. */
  readonly expirationTimeStamp?: Date;
}

export function suppressionPropertiesSerializer(item: SuppressionProperties): any {
  return { suppressionId: item["suppressionId"], ttl: item["ttl"] };
}

export function suppressionPropertiesDeserializer(item: any): SuppressionProperties {
  return {
    suppressionId: item["suppressionId"],
    ttl: item["ttl"],
    expirationTimeStamp: !item["expirationTimeStamp"]
      ? item["expirationTimeStamp"]
      : new Date(item["expirationTimeStamp"]),
  };
}

/** The response of a SuppressionContract list operation. */
export interface _SuppressionContractListResult {
  /** The SuppressionContract items on this page */
  value: SuppressionContract[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _suppressionContractListResultDeserializer(
  item: any,
): _SuppressionContractListResult {
  return {
    value: suppressionContractArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function suppressionContractArraySerializer(result: Array<SuppressionContract>): any[] {
  return result.map((item) => {
    return suppressionContractSerializer(item);
  });
}

export function suppressionContractArrayDeserializer(result: Array<SuppressionContract>): any[] {
  return result.map((item) => {
    return suppressionContractDeserializer(item);
  });
}

/** The details of Advisor score for a single category. */
export interface AdvisorScoreEntity extends ProxyResource {
  /** The details of latest available score. */
  lastRefreshedScore?: ScoreEntity;
  /** The historic Advisor score data. */
  timeSeries?: TimeSeriesEntity[];
}

export function advisorScoreEntityDeserializer(item: any): AdvisorScoreEntity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _advisorScoreEntityPropertiesDeserializer(item["properties"])),
  };
}

/** The Advisor score data. */
export interface AdvisorScoreEntityProperties {
  /** The details of latest available score. */
  lastRefreshedScore?: ScoreEntity;
  /** The historic Advisor score data. */
  timeSeries?: TimeSeriesEntity[];
}

export function advisorScoreEntityPropertiesDeserializer(item: any): AdvisorScoreEntityProperties {
  return {
    lastRefreshedScore: !item["lastRefreshedScore"]
      ? item["lastRefreshedScore"]
      : scoreEntityDeserializer(item["lastRefreshedScore"]),
    timeSeries: !item["timeSeries"]
      ? item["timeSeries"]
      : timeSeriesEntityArrayDeserializer(item["timeSeries"]),
  };
}

/** The details of Advisor Score */
export interface ScoreEntity {
  /** The date score was calculated. */
  date?: string;
  /** The percentage score. */
  score?: number;
  /** The consumption units for the score. */
  consumptionUnits?: number;
  /** The number of impacted resources. */
  impactedResourceCount?: number;
  /** The potential percentage increase in overall score at subscription level once all recommendations in this scope are implemented. */
  potentialScoreIncrease?: number;
  /** The count of impacted categories. */
  readonly categoryCount?: number;
}

export function scoreEntityDeserializer(item: any): ScoreEntity {
  return {
    date: item["date"],
    score: item["score"],
    consumptionUnits: item["consumptionUnits"],
    impactedResourceCount: item["impactedResourceCount"],
    potentialScoreIncrease: item["potentialScoreIncrease"],
    categoryCount: item["categoryCount"],
  };
}

export function timeSeriesEntityArrayDeserializer(result: Array<TimeSeriesEntity>): any[] {
  return result.map((item) => {
    return timeSeriesEntityDeserializer(item);
  });
}

/** The historic data at different aggregation levels. */
export interface TimeSeriesEntity {
  /** The aggregation level of the score. */
  aggregationLevel?: Aggregated;
  /** The past score data */
  scoreHistory?: ScoreEntity[];
}

export function timeSeriesEntityDeserializer(item: any): TimeSeriesEntity {
  return {
    aggregationLevel: item["aggregationLevel"],
    scoreHistory: !item["scoreHistory"]
      ? item["scoreHistory"]
      : scoreEntityArrayDeserializer(item["scoreHistory"]),
  };
}

/** The aggregation level of the score. */
export enum KnownAggregated {
  /** week */
  Week = "week",
  /** day */
  Day = "day",
  /** month */
  Month = "month",
}

/**
 * The aggregation level of the score. \
 * {@link KnownAggregated} can be used interchangeably with Aggregated,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **week** \
 * **day** \
 * **month**
 */
export type Aggregated = string;

export function scoreEntityArrayDeserializer(result: Array<ScoreEntity>): any[] {
  return result.map((item) => {
    return scoreEntityDeserializer(item);
  });
}

/** model interface _AdvisorScoreResponse */
export interface _AdvisorScoreResponse {
  /** The list of operations. */
  value?: AdvisorScoreEntity[];
}

export function _advisorScoreResponseDeserializer(item: any): _AdvisorScoreResponse {
  return {
    value: !item["value"] ? item["value"] : advisorScoreEntityArrayDeserializer(item["value"]),
  };
}

export function advisorScoreEntityArrayDeserializer(result: Array<AdvisorScoreEntity>): any[] {
  return result.map((item) => {
    return advisorScoreEntityDeserializer(item);
  });
}

/** The Advisor assessment result data structure. */
export interface AssessmentResult extends ProxyResource {
  /** Workload Id. */
  workloadId?: string;
  /** Workload Name. */
  readonly workloadName?: string;
  /** Assessment Id. */
  readonly assessmentId?: string;
  /** Assessment Type Description. */
  readonly description?: string;
  /** Assessment Type Id. */
  typeId?: string;
  /** Assessment Type. */
  readonly typePropertiesType?: string;
  /** Assessment Score. */
  readonly score?: number;
  /** Assessment State. */
  readonly state?: string;
  /** Assessment Type Version. */
  readonly typeVersion?: string;
  /** Assessment Type Locale. */
  locale?: string;
}

export function assessmentResultSerializer(item: AssessmentResult): any {
  return {
    properties: areAllPropsUndefined(item, ["workloadId", "typeId", "locale"])
      ? undefined
      : _assessmentResultPropertiesSerializer(item),
  };
}

export function assessmentResultDeserializer(item: any): AssessmentResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _assessmentResultPropertiesDeserializer(item["properties"])),
  };
}

/** Assessment result properties. */
export interface AssessmentResultProperties {
  /** Workload Id. */
  workloadId?: string;
  /** Workload Name. */
  readonly workloadName?: string;
  /** Assessment Id. */
  readonly assessmentId?: string;
  /** Assessment Type Description. */
  readonly description?: string;
  /** Assessment Type Id. */
  typeId?: string;
  /** Assessment Type. */
  readonly type?: string;
  /** Assessment Score. */
  readonly score?: number;
  /** Assessment State. */
  readonly state?: string;
  /** Assessment Type Version. */
  readonly typeVersion?: string;
  /** Assessment Type Locale. */
  locale?: string;
}

export function assessmentResultPropertiesSerializer(item: AssessmentResultProperties): any {
  return { workloadId: item["workloadId"], typeId: item["typeId"], locale: item["locale"] };
}

export function assessmentResultPropertiesDeserializer(item: any): AssessmentResultProperties {
  return {
    workloadId: item["workloadId"],
    workloadName: item["workloadName"],
    assessmentId: item["assessmentId"],
    description: item["description"],
    typeId: item["typeId"],
    type: item["type"],
    score: item["score"],
    state: item["state"],
    typeVersion: item["typeVersion"],
    locale: item["locale"],
  };
}

/** Paged collection of AssessmentResult items */
export interface _AssessmentListResult {
  /** The AssessmentResult items on this page */
  value: AssessmentResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _assessmentListResultDeserializer(item: any): _AssessmentListResult {
  return {
    value: assessmentResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assessmentResultArraySerializer(result: Array<AssessmentResult>): any[] {
  return result.map((item) => {
    return assessmentResultSerializer(item);
  });
}

export function assessmentResultArrayDeserializer(result: Array<AssessmentResult>): any[] {
  return result.map((item) => {
    return assessmentResultDeserializer(item);
  });
}

/** The Advisor resiliency review data structure. */
export interface ResiliencyReview extends ProxyResource {
  /** Review name. */
  readonly reviewName?: string;
  /** Workload Name. */
  readonly workloadName?: string;
  /** Review status. */
  readonly reviewStatus?: ReviewStatus;
  /** Review recommendations count. */
  readonly recommendationsCount?: number;
  /** Review last updated timestamp. */
  readonly publishedAt?: string;
  /** Review last updated timestamp. */
  readonly updatedAt?: string;
}

export function resiliencyReviewDeserializer(item: any): ResiliencyReview {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _resiliencyReviewPropertiesDeserializer(item["properties"])),
  };
}

/** Resiliency review properties. */
export interface ResiliencyReviewProperties {
  /** Review name. */
  readonly reviewName?: string;
  /** Workload Name. */
  readonly workloadName?: string;
  /** Review status. */
  readonly reviewStatus?: ReviewStatus;
  /** Review recommendations count. */
  readonly recommendationsCount?: number;
  /** Review last updated timestamp. */
  readonly publishedAt?: string;
  /** Review last updated timestamp. */
  readonly updatedAt?: string;
}

export function resiliencyReviewPropertiesDeserializer(item: any): ResiliencyReviewProperties {
  return {
    reviewName: item["reviewName"],
    workloadName: item["workloadName"],
    reviewStatus: item["reviewStatus"],
    recommendationsCount: item["recommendationsCount"],
    publishedAt: item["publishedAt"],
    updatedAt: item["updatedAt"],
  };
}

/** Review status. */
export enum KnownReviewStatus {
  /** New */
  New = "New",
  /** In Progress */
  InProgress = "InProgress",
  /** Triaged */
  Triaged = "Triaged",
  /** Completed */
  Completed = "Completed",
}

/**
 * Review status. \
 * {@link KnownReviewStatus} can be used interchangeably with ReviewStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: New \
 * **InProgress**: In Progress \
 * **Triaged**: Triaged \
 * **Completed**: Completed
 */
export type ReviewStatus = string;

/** Collection of Resiliency Reviews. */
export interface _ResiliencyReviewCollection {
  /** The ResiliencyReview items on this page */
  value: ResiliencyReview[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resiliencyReviewCollectionDeserializer(item: any): _ResiliencyReviewCollection {
  return {
    value: resiliencyReviewArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resiliencyReviewArrayDeserializer(result: Array<ResiliencyReview>): any[] {
  return result.map((item) => {
    return resiliencyReviewDeserializer(item);
  });
}

/** Triage recommendation data structure. */
export interface TriageRecommendation extends ProxyResource {
  /** Review id. */
  readonly reviewId?: string;
  /** Recommendation label. */
  readonly title?: string;
  /** Recommendation priority. */
  readonly priority?: PriorityName;
  /** List of subscription ids. */
  readonly appliesToSubscriptions?: string[];
  /** Recommendation status. */
  readonly recommendationStatus?: RecommendationStatusName;
  /** Recommendation potential benefit. */
  readonly updatedAt?: string;
  /** Recommendation rejection reason. */
  readonly rejectReason?: string;
  /** Recommendation potential benefit. */
  readonly potentialBenefits?: string;
  /** Recommendation description. */
  readonly description?: string;
  /** Recommendation notes. */
  readonly notes?: string;
}

export function triageRecommendationDeserializer(item: any): TriageRecommendation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _triageRecommendationPropertiesDeserializer(item["properties"])),
  };
}

/** Triage recommendation properties. */
export interface TriageRecommendationProperties {
  /** Review id. */
  readonly reviewId?: string;
  /** Recommendation label. */
  readonly title?: string;
  /** Recommendation priority. */
  readonly priority?: PriorityName;
  /** List of subscription ids. */
  readonly appliesToSubscriptions?: string[];
  /** Recommendation status. */
  readonly recommendationStatus?: RecommendationStatusName;
  /** Recommendation potential benefit. */
  readonly updatedAt?: string;
  /** Recommendation rejection reason. */
  readonly rejectReason?: string;
  /** Recommendation potential benefit. */
  readonly potentialBenefits?: string;
  /** Recommendation description. */
  readonly description?: string;
  /** Recommendation notes. */
  readonly notes?: string;
}

export function triageRecommendationPropertiesDeserializer(
  item: any,
): TriageRecommendationProperties {
  return {
    reviewId: item["reviewId"],
    title: item["title"],
    priority: item["priority"],
    appliesToSubscriptions: !item["appliesToSubscriptions"]
      ? item["appliesToSubscriptions"]
      : item["appliesToSubscriptions"].map((p: any) => {
          return p;
        }),
    recommendationStatus: item["recommendationStatus"],
    updatedAt: item["updatedAt"],
    rejectReason: item["rejectReason"],
    potentialBenefits: item["potentialBenefits"],
    description: item["description"],
    notes: item["notes"],
  };
}

/** Recommendation priority name enum. */
export enum KnownPriorityName {
  /** High */
  High = "High",
  /** Medium */
  Medium = "Medium",
  /** Low */
  Low = "Low",
}

/**
 * Recommendation priority name enum. \
 * {@link KnownPriorityName} can be used interchangeably with PriorityName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **High**: High \
 * **Medium**: Medium \
 * **Low**: Low
 */
export type PriorityName = string;

/** Recommendation status name enum. */
export enum KnownRecommendationStatusName {
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Pending */
  Pending = "Pending",
}

/**
 * Recommendation status name enum. \
 * {@link KnownRecommendationStatusName} can be used interchangeably with RecommendationStatusName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approved**: Approved \
 * **Rejected**: Rejected \
 * **Pending**: Pending
 */
export type RecommendationStatusName = string;

/** Collection of Advisor triage recommendations. */
export interface _TriageRecommendationCollection {
  /** List of triage recommendations. */
  value: TriageRecommendation[];
  /** The URL to get the next set of triage recommendations, if there are any. */
  nextLink?: string;
}

export function _triageRecommendationCollectionDeserializer(
  item: any,
): _TriageRecommendationCollection {
  return {
    value: triageRecommendationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function triageRecommendationArrayDeserializer(result: Array<TriageRecommendation>): any[] {
  return result.map((item) => {
    return triageRecommendationDeserializer(item);
  });
}

/** Recommendation reject body. */
export interface RecommendationRejectBody {
  /** Reason for rejecting recommendation. */
  reasonForRejection?: ReasonForRejectionName;
}

export function recommendationRejectBodySerializer(item: RecommendationRejectBody): any {
  return { reasonForRejection: item["reasonForRejection"] };
}

/** Reason for rejecting recommendation name enum. */
export enum KnownReasonForRejectionName {
  /** Not A Risk */
  NotARisk = "NotARisk",
  /** Risk Accepted */
  RiskAccepted = "RiskAccepted",
}

/**
 * Reason for rejecting recommendation name enum. \
 * {@link KnownReasonForRejectionName} can be used interchangeably with ReasonForRejectionName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotARisk**: Not A Risk \
 * **RiskAccepted**: Risk Accepted
 */
export type ReasonForRejectionName = string;

/** Triage resource data structure. */
export interface TriageResource extends ProxyResource {
  /** Unique identifier for the review resource this triageResource belongs to. */
  readonly reviewId?: string;
  /** Unique identifier for the recommendation resource this triageResource belongs to. */
  readonly recommendationId?: string;
  /** Unique identifier for the subscription resource this triageResource belongs to. */
  readonly subscriptionId?: string;
  /** Name of the resource group this triageResource belongs to. */
  readonly resourceGroup?: string;
  /** Type of resource this triageResource corresponds to e.g. "Cosmos DB". */
  readonly resourceType?: string;
  /** Full Azure resource id path of the resource this triageResource corresponds to. */
  readonly resourceId?: string;
  /** Name of the resource this triageResource corresponds to. */
  readonly resourceName?: string;
}

export function triageResourceDeserializer(item: any): TriageResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _triageResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Triage resource properties. */
export interface TriageResourceProperties {
  /** Unique identifier for the review resource this triageResource belongs to. */
  readonly reviewId?: string;
  /** Unique identifier for the recommendation resource this triageResource belongs to. */
  readonly recommendationId?: string;
  /** Unique identifier for the subscription resource this triageResource belongs to. */
  readonly subscriptionId?: string;
  /** Name of the resource group this triageResource belongs to. */
  readonly resourceGroup?: string;
  /** Type of resource this triageResource corresponds to e.g. "Cosmos DB". */
  readonly resourceType?: string;
  /** Full Azure resource id path of the resource this triageResource corresponds to. */
  readonly resourceId?: string;
  /** Name of the resource this triageResource corresponds to. */
  readonly resourceName?: string;
}

export function triageResourcePropertiesDeserializer(item: any): TriageResourceProperties {
  return {
    reviewId: item["reviewId"],
    recommendationId: item["recommendationId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceType: item["resourceType"],
    resourceId: item["resourceId"],
    resourceName: item["resourceName"],
  };
}

/** Collection of Advisor triage resources. */
export interface _TriageResourceCollection {
  /** The TriageResource items on this page */
  value: TriageResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _triageResourceCollectionDeserializer(item: any): _TriageResourceCollection {
  return {
    value: triageResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function triageResourceArrayDeserializer(result: Array<TriageResource>): any[] {
  return result.map((item) => {
    return triageResourceDeserializer(item);
  });
}

/** Paged collection of ConfigData items */
export interface _ConfigurationListResult {
  /** The ConfigData items on this page */
  value: ConfigData[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _configurationListResultDeserializer(item: any): _ConfigurationListResult {
  return {
    value: configDataArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configDataArraySerializer(result: Array<ConfigData>): any[] {
  return result.map((item) => {
    return configDataSerializer(item);
  });
}

export function configDataArrayDeserializer(result: Array<ConfigData>): any[] {
  return result.map((item) => {
    return configDataDeserializer(item);
  });
}

/** The Advisor configuration data structure. */
export interface ConfigData extends Resource {
  /** Exclude the resource from Advisor evaluations. Valid values: False (default) or True. */
  exclude?: boolean;
  /** Minimum percentage threshold for Advisor low CPU utilization evaluation. Valid only for subscriptions. Valid values: 5 (default), 10, 15 or 20. */
  lowCpuThreshold?: CpuThreshold;
  /** Minimum duration for Advisor low CPU utilization evaluation. Valid only for subscriptions. Valid values: 7 (default), 14, 21, 30, 60 or 90. */
  duration?: Duration;
  /** Advisor digest configuration. Valid only for subscriptions */
  digests?: DigestConfig[];
}

export function configDataSerializer(item: ConfigData): any {
  return {
    properties: areAllPropsUndefined(item, ["exclude", "lowCpuThreshold", "duration", "digests"])
      ? undefined
      : _configDataPropertiesSerializer(item),
  };
}

export function configDataDeserializer(item: any): ConfigData {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _configDataPropertiesDeserializer(item["properties"])),
  };
}

/** Configuration data properties */
export interface ConfigDataProperties {
  /** Exclude the resource from Advisor evaluations. Valid values: False (default) or True. */
  exclude?: boolean;
  /** Minimum percentage threshold for Advisor low CPU utilization evaluation. Valid only for subscriptions. Valid values: 5 (default), 10, 15 or 20. */
  lowCpuThreshold?: CpuThreshold;
  /** Minimum duration for Advisor low CPU utilization evaluation. Valid only for subscriptions. Valid values: 7 (default), 14, 21, 30, 60 or 90. */
  duration?: Duration;
  /** Advisor digest configuration. Valid only for subscriptions */
  digests?: DigestConfig[];
}

export function configDataPropertiesSerializer(item: ConfigDataProperties): any {
  return {
    exclude: item["exclude"],
    lowCpuThreshold: item["lowCpuThreshold"],
    duration: item["duration"],
    digests: !item["digests"] ? item["digests"] : digestConfigArraySerializer(item["digests"]),
  };
}

export function configDataPropertiesDeserializer(item: any): ConfigDataProperties {
  return {
    exclude: item["exclude"],
    lowCpuThreshold: item["lowCpuThreshold"],
    duration: item["duration"],
    digests: !item["digests"] ? item["digests"] : digestConfigArrayDeserializer(item["digests"]),
  };
}

/** Minimum percentage threshold for Advisor low CPU utilization evaluation. Valid only for subscriptions. Valid values: 5 (default), 10, 15 or 20. */
export enum KnownCpuThreshold {
  /** 5 */
  Five = "5",
  /** 10 */
  Ten = "10",
  /** 15 */
  Fifteen = "15",
  /** 20 */
  Twenty = "20",
}

/**
 * Minimum percentage threshold for Advisor low CPU utilization evaluation. Valid only for subscriptions. Valid values: 5 (default), 10, 15 or 20. \
 * {@link KnownCpuThreshold} can be used interchangeably with CpuThreshold,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **5** \
 * **10** \
 * **15** \
 * **20**
 */
export type CpuThreshold = string;

/** Minimum duration for Advisor low CPU utilization evaluation. Valid only for subscriptions. Valid values: 7 (default), 14, 21, 30, 60 or 90. */
export enum KnownDuration {
  /** 7 */
  Duration7 = "7",
  /** 14 */
  Duration14 = "14",
  /** 21 */
  Duration21 = "21",
  /** 30 */
  Duration30 = "30",
  /** 60 */
  Duration60 = "60",
  /** 90 */
  Duration90 = "90",
}

/**
 * Minimum duration for Advisor low CPU utilization evaluation. Valid only for subscriptions. Valid values: 7 (default), 14, 21, 30, 60 or 90. \
 * {@link KnownDuration} can be used interchangeably with Duration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **7** \
 * **14** \
 * **21** \
 * **30** \
 * **60** \
 * **90**
 */
export type Duration = string;

export function digestConfigArraySerializer(result: Array<DigestConfig>): any[] {
  return result.map((item) => {
    return digestConfigSerializer(item);
  });
}

export function digestConfigArrayDeserializer(result: Array<DigestConfig>): any[] {
  return result.map((item) => {
    return digestConfigDeserializer(item);
  });
}

/** Advisor Digest configuration entity */
export interface DigestConfig {
  /** Name of digest configuration. Value is case-insensitive and must be unique within a subscription. */
  name?: string;
  /** Action group resource id used by digest. */
  actionGroupResourceId?: string;
  /** Frequency that digest will be triggered, in days. Value must be between 7 and 30 days inclusive. */
  frequency?: number;
  /** Categories to send digest for. If categories are not provided, then digest will be sent for all categories. */
  categories?: Category[];
  /** Language for digest content body. Value must be ISO 639-1 code for one of Azure portal supported languages. Otherwise, it will be converted into one. Default value is English (en). */
  language?: string;
  /** State of digest configuration. */
  state?: DigestConfigState;
}

export function digestConfigSerializer(item: DigestConfig): any {
  return {
    name: item["name"],
    actionGroupResourceId: item["actionGroupResourceId"],
    frequency: item["frequency"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    language: item["language"],
    state: item["state"],
  };
}

export function digestConfigDeserializer(item: any): DigestConfig {
  return {
    name: item["name"],
    actionGroupResourceId: item["actionGroupResourceId"],
    frequency: item["frequency"],
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    language: item["language"],
    state: item["state"],
  };
}

/** State of digest configuration. */
export enum KnownDigestConfigState {
  /** Active */
  Active = "Active",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * State of digest configuration. \
 * {@link KnownDigestConfigState} can be used interchangeably with DigestConfigState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Disabled**
 */
export type DigestConfigState = string;

/** The Advisor assessment type list result data structure. */
export interface _AssessmentTypeListResult {
  /** The AssessmentTypeResult items on this page */
  value: AssessmentTypeResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _assessmentTypeListResultDeserializer(item: any): _AssessmentTypeListResult {
  return {
    value: assessmentTypeResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function assessmentTypeResultArrayDeserializer(result: Array<AssessmentTypeResult>): any[] {
  return result.map((item) => {
    return assessmentTypeResultDeserializer(item);
  });
}

/** The Advisor assessment type result data structure. */
export interface AssessmentTypeResult {
  /** Assessment Type Id */
  id?: string;
  /** Assessment Type Title */
  title?: string;
  /** Assessment Type Description */
  description?: string;
  /** Assessment Type Locale */
  locale?: string;
  /** Assessment Type Version */
  version?: string;
}

export function assessmentTypeResultDeserializer(item: any): AssessmentTypeResult {
  return {
    id: item["id"],
    title: item["title"],
    description: item["description"],
    locale: item["locale"],
    version: item["version"],
  };
}

/** The Workload list result data structure. */
export interface _WorkloadListResult {
  /** List of WorkloadListResult items on this page. */
  value: WorkloadResult[];
  /** Url to get the next Page of WorkloadListResult items. */
  nextLink?: string;
}

export function _workloadListResultDeserializer(item: any): _WorkloadListResult {
  return {
    value: workloadResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workloadResultArrayDeserializer(result: Array<WorkloadResult>): any[] {
  return result.map((item) => {
    return workloadResultDeserializer(item);
  });
}

/** The Workload result data structure. */
export interface WorkloadResult {
  /** Workload Id */
  id?: string;
  /** Workload Name */
  name?: string;
  /** Subscription Id */
  subscriptionId?: string;
  /** Subscription Name */
  subscriptionName?: string;
}

export function workloadResultDeserializer(item: any): WorkloadResult {
  return {
    id: item["id"],
    name: item["name"],
    subscriptionId: item["subscriptionId"],
    subscriptionName: item["subscriptionName"],
  };
}

/** Known values of {@link ConfigurationName} that the service accepts. */
export enum KnownConfigurationName {
  /** default */
  Default = "default",
}

/** Type of ConfigurationName */
export type ConfigurationName = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01-preview API version. */
  V20250501Preview = "2025-05-01-preview",
  /** The 2026-02-01-preview API version. */
  V20260201Preview = "2026-02-01-preview",
}

export function _predictionRequestPropertiesSerializer(item: PredictionRequest): any {
  return { predictionType: item["predictionType"], extendedProperties: item["extendedProperties"] };
}

export function _predictionResponsePropertiesDeserializer(item: any) {
  return {
    extendedProperties: item["extendedProperties"],
    predictionType: item["predictionType"],
    category: item["category"],
    impact: item["impact"],
    impactedField: item["impactedField"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    shortDescription: !item["shortDescription"]
      ? item["shortDescription"]
      : shortDescriptionDeserializer(item["shortDescription"]),
  };
}

export function _metadataEntityPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    dependsOn: !item["dependsOn"]
      ? item["dependsOn"]
      : item["dependsOn"].map((p: any) => {
          return p;
        }),
    applicableScenarios: !item["applicableScenarios"]
      ? item["applicableScenarios"]
      : item["applicableScenarios"].map((p: any) => {
          return p;
        }),
    supportedValues: !item["supportedValues"]
      ? item["supportedValues"]
      : metadataSupportedValueDetailArrayDeserializer(item["supportedValues"]),
  };
}

export function _resourceRecommendationBasePropertiesDeserializer(item: any) {
  return {
    category: item["category"],
    control: item["control"],
    impact: item["impact"],
    impactedField: item["impactedField"],
    impactedValue: item["impactedValue"],
    recommendationStatus: item["recommendationStatus"],
    completionType: item["completionType"],
    recommendationDismissReason: item["recommendationDismissReason"],
    postponedUntilDateTime: !item["postponedUntilDateTime"]
      ? item["postponedUntilDateTime"]
      : new Date(item["postponedUntilDateTime"]),
    lastRefreshed: !item["lastRefreshed"] ? item["lastRefreshed"] : new Date(item["lastRefreshed"]),
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    recommendationTypeId: item["recommendationTypeId"],
    risk: item["risk"],
    shortDescription: !item["shortDescription"]
      ? item["shortDescription"]
      : shortDescriptionDeserializer(item["shortDescription"]),
    suppressionId: item["suppressionId"],
    extendedProperties: !item["extendedProperties"]
      ? item["extendedProperties"]
      : Object.fromEntries(
          Object.entries(item["extendedProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    resourceMetadata: !item["resourceMetadata"]
      ? item["resourceMetadata"]
      : resourceMetadataDeserializer(item["resourceMetadata"]),
    description: item["description"],
    label: item["label"],
    learnMoreLink: item["learnMoreLink"],
    potentialBenefits: item["potentialBenefits"],
    actions: !item["actions"]
      ? item["actions"]
      : item["actions"].map((p: any) => {
          return Object.fromEntries(Object.entries(p).map(([k1, p1]: [string, any]) => [k1, p1]));
        }),
    remediation: !item["remediation"]
      ? item["remediation"]
      : Object.fromEntries(
          Object.entries(item["remediation"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    exposedMetadataProperties: !item["exposedMetadataProperties"]
      ? item["exposedMetadataProperties"]
      : Object.fromEntries(
          Object.entries(item["exposedMetadataProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    trackedProperties: !item["trackedProperties"]
      ? item["trackedProperties"]
      : trackedRecommendationPropertiesDeserializer(item["trackedProperties"]),
    review: !item["review"]
      ? item["review"]
      : recommendationPropertiesReviewDeserializer(item["review"]),
    resourceWorkload: !item["resourceWorkload"]
      ? item["resourceWorkload"]
      : recommendationPropertiesResourceWorkloadDeserializer(item["resourceWorkload"]),
    sourceSystem: item["sourceSystem"],
    notes: item["notes"],
  };
}

export function _suppressionContractPropertiesSerializer(item: SuppressionContract): any {
  return { suppressionId: item["suppressionId"], ttl: item["ttl"] };
}

export function _suppressionContractPropertiesDeserializer(item: any) {
  return {
    suppressionId: item["suppressionId"],
    ttl: item["ttl"],
    expirationTimeStamp: !item["expirationTimeStamp"]
      ? item["expirationTimeStamp"]
      : new Date(item["expirationTimeStamp"]),
  };
}

export function _advisorScoreEntityPropertiesDeserializer(item: any) {
  return {
    lastRefreshedScore: !item["lastRefreshedScore"]
      ? item["lastRefreshedScore"]
      : scoreEntityDeserializer(item["lastRefreshedScore"]),
    timeSeries: !item["timeSeries"]
      ? item["timeSeries"]
      : timeSeriesEntityArrayDeserializer(item["timeSeries"]),
  };
}

export function _assessmentResultPropertiesSerializer(item: AssessmentResult): any {
  return { workloadId: item["workloadId"], typeId: item["typeId"], locale: item["locale"] };
}

export function _assessmentResultPropertiesDeserializer(item: any) {
  return {
    workloadId: item["workloadId"],
    workloadName: item["workloadName"],
    assessmentId: item["assessmentId"],
    description: item["description"],
    typeId: item["typeId"],
    typePropertiesType: item["type"],
    score: item["score"],
    state: item["state"],
    typeVersion: item["typeVersion"],
    locale: item["locale"],
  };
}

export function _resiliencyReviewPropertiesDeserializer(item: any) {
  return {
    reviewName: item["reviewName"],
    workloadName: item["workloadName"],
    reviewStatus: item["reviewStatus"],
    recommendationsCount: item["recommendationsCount"],
    publishedAt: item["publishedAt"],
    updatedAt: item["updatedAt"],
  };
}

export function _triageRecommendationPropertiesDeserializer(item: any) {
  return {
    reviewId: item["reviewId"],
    title: item["title"],
    priority: item["priority"],
    appliesToSubscriptions: !item["appliesToSubscriptions"]
      ? item["appliesToSubscriptions"]
      : item["appliesToSubscriptions"].map((p: any) => {
          return p;
        }),
    recommendationStatus: item["recommendationStatus"],
    updatedAt: item["updatedAt"],
    rejectReason: item["rejectReason"],
    potentialBenefits: item["potentialBenefits"],
    description: item["description"],
    notes: item["notes"],
  };
}

export function _triageResourcePropertiesDeserializer(item: any) {
  return {
    reviewId: item["reviewId"],
    recommendationId: item["recommendationId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    resourceType: item["resourceType"],
    resourceId: item["resourceId"],
    resourceName: item["resourceName"],
  };
}

export function _configDataPropertiesSerializer(item: ConfigData): any {
  return {
    exclude: item["exclude"],
    lowCpuThreshold: item["lowCpuThreshold"],
    duration: item["duration"],
    digests: !item["digests"] ? item["digests"] : digestConfigArraySerializer(item["digests"]),
  };
}

export function _configDataPropertiesDeserializer(item: any) {
  return {
    exclude: item["exclude"],
    lowCpuThreshold: item["lowCpuThreshold"],
    duration: item["duration"],
    digests: !item["digests"] ? item["digests"] : digestConfigArrayDeserializer(item["digests"]),
  };
}
