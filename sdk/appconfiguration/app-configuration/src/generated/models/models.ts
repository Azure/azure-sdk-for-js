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
  label?: string;
  /** The content type of the value stored within the key-value. */
  contentType?: string;
  /** The value of the key-value. */
  value?: string;
  /** A date representing the last time the key-value was modified. */
  lastModified?: string;
  /** The tags of the key-value */
  tags?: Record<string, string>;
  /** Indicates whether the key-value is locked. */
  locked?: boolean;
  /** A value representing the current state of the resource. */
  etag?: string;
}

export function keyValueSerializer(item: KeyValue): any {
  return {
    label: item["label"],
    content_type: item["contentType"],
    value: item["value"],
    last_modified: item["lastModified"],
    tags: item["tags"],
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
    locked: item["locked"],
    etag: item["etag"],
  };
}

/** The result of a snapshot list request. */
export interface _SnapshotListResult {
  /** The collection value. */
  items?: Snapshot[];
  /** The URI that can be used to request the next set of paged results. */
  nextLink?: string;
}

export function _snapshotListResultDeserializer(item: any): _SnapshotListResult {
  return {
    items: !item["items"] ? item["items"] : snapshotArrayDeserializer(item["items"]),
    nextLink: item["@nextLink"],
  };
}

export function snapshotArraySerializer(result: Array<Snapshot>): any[] {
  return result.map((item) => {
    return snapshotSerializer(item);
  });
}

export function snapshotArrayDeserializer(result: Array<Snapshot>): any[] {
  return result.map((item) => {
    return snapshotDeserializer(item);
  });
}

/** A snapshot is a named, immutable subset of an App Configuration store's key-values. */
export interface Snapshot {
  /** The name of the snapshot. */
  readonly name: string;
  /** The current status of the snapshot. */
  readonly status?: SnapshotStatus;
  /** A list of filters used to filter the key-values included in the snapshot. */
  filters: KeyValueFilter[];
  /**
   * The composition type describes how the key-values within the snapshot are
   * composed. The 'key' composition type ensures there are no two key-values
   * containing the same key. The 'key_label' composition type ensures there are no
   * two key-values containing the same key and label.
   */
  compositionType?: CompositionType;
  /** The time that the snapshot was created. */
  readonly created?: string;
  /** The time that the snapshot will expire. */
  readonly expires?: string;
  /**
   * The amount of time, in seconds, that a snapshot will remain in the archived
   * state before expiring. This property is only writable during the creation of a
   * snapshot. If not specified, the default lifetime of key-value revisions will be
   * used.
   */
  retentionPeriod?: number;
  /** The size in bytes of the snapshot. */
  readonly size?: number;
  /** The amount of key-values in the snapshot. */
  readonly itemsCount?: number;
  /** The tags of the snapshot. */
  tags?: Record<string, string>;
  /** A value representing the current state of the snapshot. */
  readonly etag?: string;
}

export function snapshotSerializer(item: Snapshot): any {
  return {
    filters: keyValueFilterArraySerializer(item["filters"]),
    composition_type: item["compositionType"],
    retention_period: item["retentionPeriod"],
    tags: item["tags"],
  };
}

export function snapshotDeserializer(item: any): Snapshot {
  return {
    name: item["name"],
    status: item["status"],
    filters: keyValueFilterArrayDeserializer(item["filters"]),
    compositionType: item["composition_type"],
    created: item["created"],
    expires: item["expires"],
    retentionPeriod: item["retention_period"],
    size: item["size"],
    itemsCount: item["items_count"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
  };
}

/** Snapshot status. */
export type SnapshotStatus = "provisioning" | "ready" | "archived" | "failed";

export function keyValueFilterArraySerializer(result: Array<KeyValueFilter>): any[] {
  return result.map((item) => {
    return keyValueFilterSerializer(item);
  });
}

export function keyValueFilterArrayDeserializer(result: Array<KeyValueFilter>): any[] {
  return result.map((item) => {
    return keyValueFilterDeserializer(item);
  });
}

/**
 * Enables filtering of key-values. Syntax reference:
 * https://aka.ms/azconfig/docs/restapisnapshots
 */
export interface KeyValueFilter {
  /** Filters key-values by their key field. */
  key: string;
  /** Filters key-values by their label field. */
  label?: string;
  /** Filters key-values by their tags field. */
  tags?: string[];
}

export function keyValueFilterSerializer(item: KeyValueFilter): any {
  return {
    key: item["key"],
    label: item["label"],
    tags: !item["tags"]
      ? item["tags"]
      : item["tags"].map((p: any) => {
          return p;
        }),
  };
}

export function keyValueFilterDeserializer(item: any): KeyValueFilter {
  return {
    key: item["key"],
    label: item["label"],
    tags: !item["tags"]
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

/** Labels are used to group key-values. */
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
  | "locked"
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
  | "etag";
/** Label fields. */
export type LabelFields = "name";

/** Service API versions */
export enum KnownVersions {
  /** The 2023-11-01 API version */
  V20231101 = "2023-11-01",
  /** The 2024-09-01 API version */
  V20240901 = "2024-09-01",
}
