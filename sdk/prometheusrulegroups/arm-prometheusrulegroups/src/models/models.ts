// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The Prometheus rule group resource. */
export interface PrometheusRuleGroupResource extends TrackedResource {
  /** Rule group description. */
  description?: string;
  /** Enable/disable rule group. */
  enabled?: boolean;
  /** Apply rule to data from a specific cluster. */
  clusterName?: string;
  /** Target Azure Monitor workspaces resource ids. This api-version is currently limited to creating with one scope. This may change in future. */
  scopes: string[];
  /** The interval in which to run the Prometheus rule group represented in ISO 8601 duration format. Should be between 1 and 15 minutes */
  interval?: string;
  /** Defines the rules in the Prometheus rule group. */
  rules: PrometheusRule[];
}

export function prometheusRuleGroupResourceSerializer(item: PrometheusRuleGroupResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _prometheusRuleGroupResourcePropertiesSerializer(item),
  };
}

export function prometheusRuleGroupResourceDeserializer(item: any): PrometheusRuleGroupResource {
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
    ..._prometheusRuleGroupResourcePropertiesDeserializer(item["properties"]),
  };
}

/** An Azure Prometheus rule group. */
export interface PrometheusRuleGroupProperties {
  /** Rule group description. */
  description?: string;
  /** Enable/disable rule group. */
  enabled?: boolean;
  /** Apply rule to data from a specific cluster. */
  clusterName?: string;
  /** Target Azure Monitor workspaces resource ids. This api-version is currently limited to creating with one scope. This may change in future. */
  scopes: string[];
  /** The interval in which to run the Prometheus rule group represented in ISO 8601 duration format. Should be between 1 and 15 minutes */
  interval?: string;
  /** Defines the rules in the Prometheus rule group. */
  rules: PrometheusRule[];
}

export function prometheusRuleGroupPropertiesSerializer(item: PrometheusRuleGroupProperties): any {
  return {
    description: item["description"],
    enabled: item["enabled"],
    clusterName: item["clusterName"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    interval: item["interval"],
    rules: prometheusRuleArraySerializer(item["rules"]),
  };
}

export function prometheusRuleGroupPropertiesDeserializer(
  item: any,
): PrometheusRuleGroupProperties {
  return {
    description: item["description"],
    enabled: item["enabled"],
    clusterName: item["clusterName"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    interval: item["interval"],
    rules: prometheusRuleArrayDeserializer(item["rules"]),
  };
}

export function prometheusRuleArraySerializer(result: Array<PrometheusRule>): any[] {
  return result.map((item) => {
    return prometheusRuleSerializer(item);
  });
}

export function prometheusRuleArrayDeserializer(result: Array<PrometheusRule>): any[] {
  return result.map((item) => {
    return prometheusRuleDeserializer(item);
  });
}

/** An Azure Prometheus alerting or recording rule. */
export interface PrometheusRule {
  /** Recorded metrics name. */
  record?: string;
  /** Alert rule name. */
  alert?: string;
  /** Enable/disable rule. */
  enabled?: boolean;
  /** The PromQL expression to evaluate. https://prometheus.io/docs/prometheus/latest/querying/basics/. Evaluated periodically as given by 'interval', and the result recorded as a new set of time series with the metric name as given by 'record'. */
  expression: string;
  /** Labels to add or overwrite before storing the result. */
  labels?: Record<string, string>;
  /** The severity of the alerts fired by the rule. Must be between 0 and 4. */
  severity?: number;
  /** The amount of time alert must be active before firing. */
  for?: string;
  /** The annotations clause specifies a set of informational labels that can be used to store longer additional information such as alert descriptions or runbook links. The annotation values can be templated. */
  annotations?: Record<string, string>;
  /** Actions that are performed when the alert rule becomes active, and when an alert condition is resolved. */
  actions?: PrometheusRuleGroupAction[];
  /** Defines the configuration for resolving fired alerts. Only relevant for alerts. */
  resolveConfiguration?: PrometheusRuleResolveConfiguration;
}

export function prometheusRuleSerializer(item: PrometheusRule): any {
  return {
    record: item["record"],
    alert: item["alert"],
    enabled: item["enabled"],
    expression: item["expression"],
    labels: item["labels"],
    severity: item["severity"],
    for: item["for"],
    annotations: item["annotations"],
    actions: !item["actions"]
      ? item["actions"]
      : prometheusRuleGroupActionArraySerializer(item["actions"]),
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : prometheusRuleResolveConfigurationSerializer(item["resolveConfiguration"]),
  };
}

export function prometheusRuleDeserializer(item: any): PrometheusRule {
  return {
    record: item["record"],
    alert: item["alert"],
    enabled: item["enabled"],
    expression: item["expression"],
    labels: !item["labels"]
      ? item["labels"]
      : Object.fromEntries(Object.entries(item["labels"]).map(([k, p]: [string, any]) => [k, p])),
    severity: item["severity"],
    for: item["for"],
    annotations: !item["annotations"]
      ? item["annotations"]
      : Object.fromEntries(
          Object.entries(item["annotations"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    actions: !item["actions"]
      ? item["actions"]
      : prometheusRuleGroupActionArrayDeserializer(item["actions"]),
    resolveConfiguration: !item["resolveConfiguration"]
      ? item["resolveConfiguration"]
      : prometheusRuleResolveConfigurationDeserializer(item["resolveConfiguration"]),
  };
}

export function prometheusRuleGroupActionArraySerializer(
  result: Array<PrometheusRuleGroupAction>,
): any[] {
  return result.map((item) => {
    return prometheusRuleGroupActionSerializer(item);
  });
}

export function prometheusRuleGroupActionArrayDeserializer(
  result: Array<PrometheusRuleGroupAction>,
): any[] {
  return result.map((item) => {
    return prometheusRuleGroupActionDeserializer(item);
  });
}

/** An alert action. Only relevant for alerts. */
export interface PrometheusRuleGroupAction {
  /** The resource id of the action group to use. */
  actionGroupId?: string;
  /** The properties of an action group object. */
  actionProperties?: Record<string, string>;
}

export function prometheusRuleGroupActionSerializer(item: PrometheusRuleGroupAction): any {
  return { actionGroupId: item["actionGroupId"], actionProperties: item["actionProperties"] };
}

export function prometheusRuleGroupActionDeserializer(item: any): PrometheusRuleGroupAction {
  return {
    actionGroupId: item["actionGroupId"],
    actionProperties: !item["actionProperties"]
      ? item["actionProperties"]
      : Object.fromEntries(
          Object.entries(item["actionProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Specifies the Prometheus alert rule configuration. */
export interface PrometheusRuleResolveConfiguration {
  /** Enable alert auto-resolution. */
  autoResolved?: boolean;
  /** Alert auto-resolution timeout. */
  timeToResolve?: string;
}

export function prometheusRuleResolveConfigurationSerializer(
  item: PrometheusRuleResolveConfiguration,
): any {
  return { autoResolved: item["autoResolved"], timeToResolve: item["timeToResolve"] };
}

export function prometheusRuleResolveConfigurationDeserializer(
  item: any,
): PrometheusRuleResolveConfiguration {
  return {
    autoResolved: item["autoResolved"],
    timeToResolve: item["timeToResolve"],
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

/** The Prometheus rule group resource for patch operations. */
export interface PrometheusRuleGroupResourcePatchParameters {
  /** Resource tags */
  tags?: Record<string, string>;
  /** the flag that indicates whether the Prometheus rule group is enabled. */
  enabled?: boolean;
}

export function prometheusRuleGroupResourcePatchParametersSerializer(
  item: PrometheusRuleGroupResourcePatchParameters,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _prometheusRuleGroupResourcePatchParametersPropertiesSerializer(item),
  };
}

/** model interface PrometheusRuleGroupResourcePatchParametersProperties */
export interface PrometheusRuleGroupResourcePatchParametersProperties {
  /** the flag that indicates whether the Prometheus rule group is enabled. */
  enabled?: boolean;
}

export function prometheusRuleGroupResourcePatchParametersPropertiesSerializer(
  item: PrometheusRuleGroupResourcePatchParametersProperties,
): any {
  return { enabled: item["enabled"] };
}

/** Represents a collection of alert rule resources. */
export interface _PrometheusRuleGroupResourceCollection {
  /** the values for the alert rule resources. */
  value?: PrometheusRuleGroupResource[];
  nextLink?: string;
}

export function _prometheusRuleGroupResourceCollectionDeserializer(
  item: any,
): _PrometheusRuleGroupResourceCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : prometheusRuleGroupResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function prometheusRuleGroupResourceArraySerializer(
  result: Array<PrometheusRuleGroupResource>,
): any[] {
  return result.map((item) => {
    return prometheusRuleGroupResourceSerializer(item);
  });
}

export function prometheusRuleGroupResourceArrayDeserializer(
  result: Array<PrometheusRuleGroupResource>,
): any[] {
  return result.map((item) => {
    return prometheusRuleGroupResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-03-01 API version. */
  V20230301 = "2023-03-01",
}

export function _prometheusRuleGroupResourcePropertiesSerializer(
  item: PrometheusRuleGroupResource,
): any {
  return {
    description: item["description"],
    enabled: item["enabled"],
    clusterName: item["clusterName"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    interval: item["interval"],
    rules: prometheusRuleArraySerializer(item["rules"]),
  };
}

export function _prometheusRuleGroupResourcePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    enabled: item["enabled"],
    clusterName: item["clusterName"],
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    interval: item["interval"],
    rules: prometheusRuleArrayDeserializer(item["rules"]),
  };
}

export function _prometheusRuleGroupResourcePatchParametersPropertiesSerializer(
  item: PrometheusRuleGroupResourcePatchParameters,
): any {
  return { enabled: item["enabled"] };
}
