// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorModel as ErrorModel_1 } from "@azure-rest/core-client";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The result of a list request. */
export interface _KeyListResult {
  /** The collection value. */
  items?: Key[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _keyListResultDeserializer(item: any): _KeyListResult {
  return {
    items: !item["items"] ? item["items"] : keyArrayDeserializer(item["items"]),
    nextLink: item["@nextLink"],
  };
}

export function keyArrayDeserializer(result: Array<Key>): any[] {
  return result.map((item) => {
    return keyDeserializer(item);
  });
}

/** Keys serve as identifiers for key-values and are used to store and retrieve corresponding values. */
export interface Key {
  /** The name of the key. */
  readonly name: string;
}

export function keyDeserializer(item: any): Key {
  return {
    name: item["name"],
  };
}

/** Azure App Configuration error object. */
export interface ErrorModel {
  /** The type of the error. */
  type?: string;
  /** A brief summary of the error. */
  title?: string;
  /** The name of the parameter that resulted in the error. */
  name?: string;
  /** A detailed description of the error. */
  detail?: string;
  /** The HTTP status code that the error maps to. */
  status?: number;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    type: item["type"],
    title: item["title"],
    name: item["name"],
    detail: item["detail"],
    status: item["status"],
  };
}

/** The result of a list request. */
export interface _KeyValueListResult {
  /** The collection value. */
  items?: KeyValue[];
  /** An identifier representing the returned state of the resource. */
  etag?: string;
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _keyValueListResultDeserializer(item: any): _KeyValueListResult {
  return {
    items: !item["items"] ? item["items"] : keyValueArrayDeserializer(item["items"]),
    etag: item["etag"],
    nextLink: item["@nextLink"],
  };
}

export function keyValueArraySerializer(result: Array<KeyValue>): any[] {
  return result.map((item) => {
    return keyValueSerializer(item);
  });
}

export function keyValueArrayDeserializer(result: Array<KeyValue>): any[] {
  return result.map((item) => {
    return keyValueDeserializer(item);
  });
}

/** A key-value pair representing application settings. */
export interface KeyValue {
  /** The key of the key-value. */
  readonly key: string;
  /** The label the key-value belongs to. */
  readonly label?: string;
  /** The content type of the value stored within the key-value. */
  contentType?: string;
  /** The value of the key-value. */
  value?: string;
  /** A date representing the last time the key-value was modified. */
  lastModified?: string;
  /** The tags of the key-value */
  tags?: Record<string, string>;
  /** The description of the key-value. */
  description?: string;
  /** Indicates whether the key-value is locked. */
  locked?: boolean;
  /** A value representing the current state of the resource. */
  etag?: string;
}

export function keyValueSerializer(item: KeyValue): any {
  return {
    content_type: item["contentType"],
    value: item["value"],
    last_modified: item["lastModified"],
    tags: item["tags"],
    description: item["description"],
    locked: item["locked"],
    etag: item["etag"],
  };
}

export function keyValueDeserializer(item: any): KeyValue {
  return {
    key: item["key"],
    label: item["label"],
    contentType: item["content_type"],
    value: item["value"],
    lastModified: item["last_modified"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    description: item["description"],
    locked: item["locked"],
    etag: item["etag"],
  };
}

/** The result of a Feature Flag list request. */
export interface _FeatureFlagListResult {
  /** The collection value. */
  items?: FeatureFlag[];
  /** An identifier representing the returned state of the resource. */
  etag?: string;
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _featureFlagListResultDeserializer(item: any): _FeatureFlagListResult {
  return {
    items: !item["items"] ? item["items"] : featureFlagArrayDeserializer(item["items"]),
    etag: item["etag"],
    nextLink: item["@nextLink"],
  };
}

export function featureFlagArraySerializer(result: Array<FeatureFlag>): any[] {
  return result.map((item) => {
    return featureFlagSerializer(item);
  });
}

export function featureFlagArrayDeserializer(result: Array<FeatureFlag>): any[] {
  return result.map((item) => {
    return featureFlagDeserializer(item);
  });
}

/** A feature flag. */
export interface FeatureFlag {
  /** The name of the feature flag. */
  readonly name: string;
  /** The enabled state of the feature flag. */
  enabled?: boolean;
  /** The label the feature flag belongs to. */
  readonly label?: string;
  /** The description of the feature flag. */
  description?: string;
  /** The conditions of the feature flag. */
  conditions?: FeatureFlagConditions;
  /** The variants of the feature flag. */
  variants?: FeatureFlagVariantDefinition[];
  /** The allocation of the feature flag. */
  allocation?: FeatureFlagAllocation;
  /** The telemetry settings of the feature flag. */
  telemetry?: FeatureFlagTelemetryConfiguration;
  /** The tags of the feature flag */
  tags?: Record<string, string>;
  /** A date representing the last time the feature flag was modified. */
  readonly lastModified?: Date;
  /** A value representing the current state of the resource. */
  readonly etag?: string;
}

export function featureFlagSerializer(item: FeatureFlag): any {
  return {
    enabled: item["enabled"],
    description: item["description"],
    conditions: !item["conditions"]
      ? item["conditions"]
      : featureFlagConditionsSerializer(item["conditions"]),
    variants: !item["variants"]
      ? item["variants"]
      : featureFlagVariantDefinitionArraySerializer(item["variants"]),
    allocation: !item["allocation"]
      ? item["allocation"]
      : featureFlagAllocationSerializer(item["allocation"]),
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : featureFlagTelemetryConfigurationSerializer(item["telemetry"]),
    tags: item["tags"],
  };
}

export function featureFlagDeserializer(item: any): FeatureFlag {
  return {
    name: item["name"],
    enabled: item["enabled"],
    label: item["label"],
    description: item["description"],
    conditions: !item["conditions"]
      ? item["conditions"]
      : featureFlagConditionsDeserializer(item["conditions"]),
    variants: !item["variants"]
      ? item["variants"]
      : featureFlagVariantDefinitionArrayDeserializer(item["variants"]),
    allocation: !item["allocation"]
      ? item["allocation"]
      : featureFlagAllocationDeserializer(item["allocation"]),
    telemetry: !item["telemetry"]
      ? item["telemetry"]
      : featureFlagTelemetryConfigurationDeserializer(item["telemetry"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    lastModified: !item["last_modified"] ? item["last_modified"] : new Date(item["last_modified"]),
    etag: item["etag"],
  };
}

/** The conditions that must be met for the feature flag to be enabled. */
export interface FeatureFlagConditions {
  /** The requirement type for the conditions. */
  requirementType?: RequirementType;
  /** The filters that will conditionally enable or disable the flag. */
  filters?: FeatureFlagFilter[];
}

export function featureFlagConditionsSerializer(item: FeatureFlagConditions): any {
  return {
    requirement_type: item["requirementType"],
    filters: !item["filters"] ? item["filters"] : featureFlagFilterArraySerializer(item["filters"]),
  };
}

export function featureFlagConditionsDeserializer(item: any): FeatureFlagConditions {
  return {
    requirementType: item["requirement_type"],
    filters: !item["filters"]
      ? item["filters"]
      : featureFlagFilterArrayDeserializer(item["filters"]),
  };
}

/** Requirement Type. */
export type RequirementType = "Any" | "All";

export function featureFlagFilterArraySerializer(result: Array<FeatureFlagFilter>): any[] {
  return result.map((item) => {
    return featureFlagFilterSerializer(item);
  });
}

export function featureFlagFilterArrayDeserializer(result: Array<FeatureFlagFilter>): any[] {
  return result.map((item) => {
    return featureFlagFilterDeserializer(item);
  });
}

/** Feature Flag Filter object. */
export interface FeatureFlagFilter {
  /** The name of the filter. */
  name: string;
  /** The parameters used by the filter */
  parameters?: Record<string, string>;
}

export function featureFlagFilterSerializer(item: FeatureFlagFilter): any {
  return { name: item["name"], parameters: item["parameters"] };
}

export function featureFlagFilterDeserializer(item: any): FeatureFlagFilter {
  return {
    name: item["name"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function featureFlagVariantDefinitionArraySerializer(
  result: Array<FeatureFlagVariantDefinition>,
): any[] {
  return result.map((item) => {
    return featureFlagVariantDefinitionSerializer(item);
  });
}

export function featureFlagVariantDefinitionArrayDeserializer(
  result: Array<FeatureFlagVariantDefinition>,
): any[] {
  return result.map((item) => {
    return featureFlagVariantDefinitionDeserializer(item);
  });
}

/** Feature Flag Variants object. */
export interface FeatureFlagVariantDefinition {
  /** The name of the variant. */
  name: string;
  /** The value of the variant. */
  value?: string;
  /** The content type of the value stored within the key-value. */
  contentType?: string;
  /** Determines if the variant should override the status of the flag. */
  statusOverride?: StatusOverride;
}

export function featureFlagVariantDefinitionSerializer(item: FeatureFlagVariantDefinition): any {
  return {
    name: item["name"],
    value: item["value"],
    content_type: item["contentType"],
    status_override: item["statusOverride"],
  };
}

export function featureFlagVariantDefinitionDeserializer(item: any): FeatureFlagVariantDefinition {
  return {
    name: item["name"],
    value: item["value"],
    contentType: item["content_type"],
    statusOverride: item["status_override"],
  };
}

/** Status Override. */
export type StatusOverride = "None" | "Enabled" | "Disabled";

/** Defines how to allocate variants based on context. */
export interface FeatureFlagAllocation {
  /** The default variant to use when disabled. */
  defaultWhenDisabled?: string;
  /** The default variant to use when enabled but not allocated. */
  defaultWhenEnabled?: string;
  /** Allocates percentiles to variants. */
  percentile?: PercentileAllocation[];
  /** Allocates users to variants. */
  user?: UserAllocation[];
  /** Allocates groups to variants. */
  group?: GroupAllocation[];
  /** The seed used for random allocation. */
  seed?: string;
}

export function featureFlagAllocationSerializer(item: FeatureFlagAllocation): any {
  return {
    default_when_disabled: item["defaultWhenDisabled"],
    default_when_enabled: item["defaultWhenEnabled"],
    percentile: !item["percentile"]
      ? item["percentile"]
      : percentileAllocationArraySerializer(item["percentile"]),
    user: !item["user"] ? item["user"] : userAllocationArraySerializer(item["user"]),
    group: !item["group"] ? item["group"] : groupAllocationArraySerializer(item["group"]),
    seed: item["seed"],
  };
}

export function featureFlagAllocationDeserializer(item: any): FeatureFlagAllocation {
  return {
    defaultWhenDisabled: item["default_when_disabled"],
    defaultWhenEnabled: item["default_when_enabled"],
    percentile: !item["percentile"]
      ? item["percentile"]
      : percentileAllocationArrayDeserializer(item["percentile"]),
    user: !item["user"] ? item["user"] : userAllocationArrayDeserializer(item["user"]),
    group: !item["group"] ? item["group"] : groupAllocationArrayDeserializer(item["group"]),
    seed: item["seed"],
  };
}

export function percentileAllocationArraySerializer(result: Array<PercentileAllocation>): any[] {
  return result.map((item) => {
    return percentileAllocationSerializer(item);
  });
}

export function percentileAllocationArrayDeserializer(result: Array<PercentileAllocation>): any[] {
  return result.map((item) => {
    return percentileAllocationDeserializer(item);
  });
}

/** Feature Flag PercentileAllocation object. */
export interface PercentileAllocation {
  /** The variant to allocate these percentiles to. */
  variant: string;
  /** The lower bounds for this percentile allocation. */
  from: number;
  /** The upper bounds for this percentile allocation. */
  to: number;
}

export function percentileAllocationSerializer(item: PercentileAllocation): any {
  return { variant: item["variant"], from: item["from"], to: item["to"] };
}

export function percentileAllocationDeserializer(item: any): PercentileAllocation {
  return {
    variant: item["variant"],
    from: item["from"],
    to: item["to"],
  };
}

export function userAllocationArraySerializer(result: Array<UserAllocation>): any[] {
  return result.map((item) => {
    return userAllocationSerializer(item);
  });
}

export function userAllocationArrayDeserializer(result: Array<UserAllocation>): any[] {
  return result.map((item) => {
    return userAllocationDeserializer(item);
  });
}

/** Feature Flag UserAllocation object. */
export interface UserAllocation {
  /** The variant to allocate these percentiles to. */
  variant: string;
  /** The users to get this variant. */
  users: string[];
}

export function userAllocationSerializer(item: UserAllocation): any {
  return {
    variant: item["variant"],
    users: item["users"].map((p: any) => {
      return p;
    }),
  };
}

export function userAllocationDeserializer(item: any): UserAllocation {
  return {
    variant: item["variant"],
    users: item["users"].map((p: any) => {
      return p;
    }),
  };
}

export function groupAllocationArraySerializer(result: Array<GroupAllocation>): any[] {
  return result.map((item) => {
    return groupAllocationSerializer(item);
  });
}

export function groupAllocationArrayDeserializer(result: Array<GroupAllocation>): any[] {
  return result.map((item) => {
    return groupAllocationDeserializer(item);
  });
}

/** Feature Flag GroupAllocation object. */
export interface GroupAllocation {
  /** The variant to allocate these percentiles to. */
  variant: string;
  /** The groups to get this variant. */
  groups: string[];
}

export function groupAllocationSerializer(item: GroupAllocation): any {
  return {
    variant: item["variant"],
    groups: item["groups"].map((p: any) => {
      return p;
    }),
  };
}

export function groupAllocationDeserializer(item: any): GroupAllocation {
  return {
    variant: item["variant"],
    groups: item["groups"].map((p: any) => {
      return p;
    }),
  };
}

/** Feature Flag Telemetry object. */
export interface FeatureFlagTelemetryConfiguration {
  /** The enabled state of the telemetry. */
  enabled: boolean;
  /** The metadata to include on outbound telemetry */
  metadata?: Record<string, string>;
}

export function featureFlagTelemetryConfigurationSerializer(
  item: FeatureFlagTelemetryConfiguration,
): any {
  return { enabled: item["enabled"], metadata: item["metadata"] };
}

export function featureFlagTelemetryConfigurationDeserializer(
  item: any,
): FeatureFlagTelemetryConfiguration {
  return {
    enabled: item["enabled"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The result of a snapshot list request. */
export interface _SnapshotListResult {
  /** The collection value. */
  items?: ConfigurationSnapshot[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _snapshotListResultDeserializer(item: any): _SnapshotListResult {
  return {
    items: !item["items"] ? item["items"] : configurationSnapshotArrayDeserializer(item["items"]),
    nextLink: item["@nextLink"],
  };
}

export function configurationSnapshotArraySerializer(result: Array<ConfigurationSnapshot>): any[] {
  return result.map((item) => {
    return configurationSnapshotSerializer(item);
  });
}

export function configurationSnapshotArrayDeserializer(
  result: Array<ConfigurationSnapshot>,
): any[] {
  return result.map((item) => {
    return configurationSnapshotDeserializer(item);
  });
}

/** A snapshot is a named, immutable subset of an App Configuration store's key-values. */
export interface ConfigurationSnapshot {
  /** The name of the snapshot. */
  readonly name: string;
  /** The current status of the snapshot. */
  readonly status?: SnapshotStatus;
  /** A list of filters used to filter the key-values included in the snapshot. */
  filters: ConfigurationSettingsFilter[];
  /**
   * The composition type describes how the key-values within the snapshot are
   * composed. The 'key' composition type ensures there are no two key-values
   * containing the same key. The 'key_label' composition type ensures there are no
   * two key-values containing the same key and label.
   */
  compositionType?: CompositionType;
  /** The time that the snapshot was created. */
  readonly createdOn?: string;
  /** The time that the snapshot will expire. */
  readonly expiresOn?: string;
  /**
   * The amount of time, in seconds, that a snapshot will remain in the archived
   * state before expiring. This property is only writable during the creation of a
   * snapshot. If not specified, the default lifetime of key-value revisions will be
   * used.
   */
  retentionPeriodInSeconds?: number;
  /** The size in bytes of the snapshot. */
  readonly sizeInBytes?: number;
  /** The amount of key-values in the snapshot. */
  readonly itemsCount?: number;
  /** The tags of the snapshot. */
  tags?: Record<string, string>;
  /** The description of the snapshot. */
  description?: string;
  /** A value representing the current state of the snapshot. */
  readonly etag?: string;
}

export function configurationSnapshotSerializer(item: ConfigurationSnapshot): any {
  return {
    filters: configurationSettingsFilterArraySerializer(item["filters"]),
    composition_type: item["compositionType"],
    retention_period: item["retentionPeriodInSeconds"],
    tags: item["tags"],
    description: item["description"],
  };
}

export function configurationSnapshotDeserializer(item: any): ConfigurationSnapshot {
  return {
    name: item["name"],
    status: item["status"],
    filters: configurationSettingsFilterArrayDeserializer(item["filters"]),
    compositionType: item["composition_type"],
    createdOn: item["created"],
    expiresOn: item["expires"],
    retentionPeriodInSeconds: item["retention_period"],
    sizeInBytes: item["size"],
    itemsCount: item["items_count"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    description: item["description"],
    etag: item["etag"],
  };
}

/** Snapshot status. */
export type SnapshotStatus = "provisioning" | "ready" | "archived" | "failed";

export function configurationSettingsFilterArraySerializer(
  result: Array<ConfigurationSettingsFilter>,
): any[] {
  return result.map((item) => {
    return configurationSettingsFilterSerializer(item);
  });
}

export function configurationSettingsFilterArrayDeserializer(
  result: Array<ConfigurationSettingsFilter>,
): any[] {
  return result.map((item) => {
    return configurationSettingsFilterDeserializer(item);
  });
}

/**
 * Enables filtering of key-values. Syntax reference:
 * https://aka.ms/azconfig/docs/restapisnapshots
 */
export interface ConfigurationSettingsFilter {
  /** Filters key-values by their key field. */
  keyFilter: string;
  /** Filters key-values by their label field. */
  labelFilter?: string;
  /** Filters key-values by their tags field. */
  tagsFilter?: string[];
}

export function configurationSettingsFilterSerializer(item: ConfigurationSettingsFilter): any {
  return {
    key: item["keyFilter"],
    label: item["labelFilter"],
    tags: !item["tagsFilter"]
      ? item["tagsFilter"]
      : item["tagsFilter"].map((p: any) => {
          return p;
        }),
  };
}

export function configurationSettingsFilterDeserializer(item: any): ConfigurationSettingsFilter {
  return {
    keyFilter: item["key"],
    labelFilter: item["label"],
    tagsFilter: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
  };
}

/** Composition types. */
export type CompositionType = "key" | "key_label";

/** Details of a long running operation. */
export interface OperationDetails {
  /** The unique id of the operation. */
  id: string;
  /** The current status of the operation */
  status: OperationState;
  /**
   * An error, available when the status is `Failed`, describing why the operation
   * failed.
   */
  error?: ErrorModel_1;
}

export function operationDetailsDeserializer(item: any): OperationDetails {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
  };
}

/** Enum describing allowed operation states. */
export type OperationState = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";

/** Parameters used to update a snapshot. */
export interface SnapshotUpdateParameters {
  /** The desired status of the snapshot. */
  status?: SnapshotStatus;
}

export function snapshotUpdateParametersSerializer(item: SnapshotUpdateParameters): any {
  return { status: item["status"] };
}

/** The result of a list request. */
export interface _LabelListResult {
  /** The collection value. */
  items?: Label[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _labelListResultDeserializer(item: any): _LabelListResult {
  return {
    items: !item["items"] ? item["items"] : labelArrayDeserializer(item["items"]),
    nextLink: item["@nextLink"],
  };
}

export function labelArrayDeserializer(result: Array<Label>): any[] {
  return result.map((item) => {
    return labelDeserializer(item);
  });
}

/** Labels are used to group key values or feature flags. */
export interface Label {
  /** The name of the label. */
  name?: string;
}

export function labelDeserializer(item: any): Label {
  return {
    name: item["name"],
  };
}

/** Key-value fields. */
export type KeyValueFields =
  | "key"
  | "label"
  | "content_type"
  | "value"
  | "last_modified"
  | "tags"
  | "description"
  | "locked"
  | "etag";
/** Feature Flag fields. */
export type FeatureFlagFields =
  | "name"
  | "enabled"
  | "label"
  | "description"
  | "conditions"
  | "variants"
  | "allocation"
  | "telemetry"
  | "tags"
  | "last_modified"
  | "etag";
/** Snapshot fields. */
export type SnapshotFields =
  | "name"
  | "status"
  | "filters"
  | "composition_type"
  | "created"
  | "expires"
  | "retention_period"
  | "size"
  | "items_count"
  | "tags"
  | "description"
  | "etag";
/** Label fields. */
export type LabelFields = "name";

/** Service API versions */
export enum KnownVersions {
  /** The 2023-11-01 API version */
  V20231101 = "2023-11-01",
  /** The 2024-09-01 API version */
  V20240901 = "2024-09-01",
  /** The 2026-04-01 API version */
  V20260401 = "2026-04-01",
  /** The 2026-05-01-preview API version */
  V20260501Preview = "2026-05-01-preview",
}
