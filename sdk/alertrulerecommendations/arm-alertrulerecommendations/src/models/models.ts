// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** List of alert rule recommendations. */
export interface _AlertRuleRecommendationsListResponse {
  /** The AlertRuleRecommendationResource items on this page */
  value: AlertRuleRecommendationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertRuleRecommendationsListResponseDeserializer(
  item: any,
): _AlertRuleRecommendationsListResponse {
  return {
    value: alertRuleRecommendationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertRuleRecommendationResourceArrayDeserializer(
  result: Array<AlertRuleRecommendationResource>,
): any[] {
  return result.map((item) => {
    return alertRuleRecommendationResourceDeserializer(item);
  });
}

/** A single alert rule recommendation resource. */
export interface AlertRuleRecommendationResource extends ProxyResource {
  /** The recommendation alert rule type. */
  alertRuleType: string;
  /** The recommendation alert rule category. */
  category?: string;
  /** A dictionary that provides the display information for an alert rule recommendation. */
  displayInformation: Record<string, string>;
  /** A complete ARM template to deploy the alert rules. */
  ruleArmTemplate: RuleArmTemplate;
}

export function alertRuleRecommendationResourceDeserializer(
  item: any,
): AlertRuleRecommendationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._alertRuleRecommendationResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Describes the format of Alert Rule Recommendations response. */
export interface AlertRuleRecommendationProperties {
  /** The recommendation alert rule type. */
  alertRuleType: string;
  /** The recommendation alert rule category. */
  category?: string;
  /** A dictionary that provides the display information for an alert rule recommendation. */
  displayInformation: Record<string, string>;
  /** A complete ARM template to deploy the alert rules. */
  ruleArmTemplate: RuleArmTemplate;
}

export function alertRuleRecommendationPropertiesDeserializer(
  item: any,
): AlertRuleRecommendationProperties {
  return {
    alertRuleType: item["alertRuleType"],
    category: item["category"],
    displayInformation: Object.fromEntries(
      Object.entries(item["displayInformation"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    ruleArmTemplate: ruleArmTemplateDeserializer(item["ruleArmTemplate"]),
  };
}

/** A complete ARM template to deploy the alert rules. */
export interface RuleArmTemplate {
  /** JSON schema reference */
  schema: string;
  /** A 4 number format for the version number of this template file. For example, 1.0.0.0 */
  contentVersion: string;
  /** Variable definitions */
  variables: any;
  /** Input parameter definitions */
  parameters: any;
  /** Alert rule resource definitions */
  resources: any[];
}

export function ruleArmTemplateDeserializer(item: any): RuleArmTemplate {
  return {
    schema: item["$schema"],
    contentVersion: item["contentVersion"],
    variables: item["variables"],
    parameters: item["parameters"],
    resources: item["resources"].map((p: any) => {
      return p;
    }),
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-08-01-preview API version. */
  V20230801Preview = "2023-08-01-preview",
}

export function _alertRuleRecommendationResourcePropertiesDeserializer(item: any) {
  return {
    alertRuleType: item["alertRuleType"],
    category: item["category"],
    displayInformation: Object.fromEntries(
      Object.entries(item["displayInformation"]).map(([k, p]: [string, any]) => [k, p]),
    ),
    ruleArmTemplate: ruleArmTemplateDeserializer(item["ruleArmTemplate"]),
  };
}
