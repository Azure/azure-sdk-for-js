// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

/** The result of a list request. */
export interface KeyListResultOutput {
  /** The collection value. */
  items?: Array<KeyOutput>;
  /** The URI that can be used to request the next set of paged results. */
  "@nextLink"?: string;
}

/** Keys serve as identifiers for key-values and are used to store and retrieve corresponding values. */
export interface KeyOutput {
  /** The name of the key. */
  readonly name: string;
}

/** Azure App Configuration error object. */
export interface ErrorModelOutput {
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

/** The result of a list request. */
export interface KeyValueListResultOutput {
  /** The collection value. */
  items?: Array<KeyValueOutput>;
  /** An identifier representing the returned state of the resource. */
  etag?: string;
  /** The URI that can be used to request the next set of paged results. */
  "@nextLink"?: string;
}

/** A key-value pair representing application settings. */
export interface KeyValueOutput {
  /** The key of the key-value. */
  readonly key: string;
  /** The label the key-value belongs to. */
  label?: string;
  /** The content type of the value stored within the key-value. */
  content_type?: string;
  /** The value of the key-value. */
  value?: string;
  /** A date representing the last time the key-value was modified. */
  last_modified?: string;
  /** The tags of the key-value */
  tags?: Record<string, string>;
  /** Indicates whether the key-value is locked. */
  locked?: boolean;
  /** A value representing the current state of the resource. */
  etag?: string;
}

/** The result of a snapshot list request. */
export interface SnapshotListResultOutput {
  /** The collection value. */
  items?: Array<SnapshotOutput>;
  /** The URI that can be used to request the next set of paged results. */
  "@nextLink"?: string;
}

/** A snapshot is a named, immutable subset of an App Configuration store's key-values. */
export interface SnapshotOutput {
  /** The name of the snapshot. */
  readonly name: string;
  /**
   * The current status of the snapshot.
   *
   * Possible values: "provisioning", "ready", "archived", "failed"
   */
  readonly status?: SnapshotStatusOutput;
  /** A list of filters used to filter the key-values included in the snapshot. */
  filters: Array<KeyValueFilterOutput>;
  /**
   * The composition type describes how the key-values within the snapshot are
   * composed. The 'key' composition type ensures there are no two key-values
   * containing the same key. The 'key_label' composition type ensures there are no
   * two key-values containing the same key and label.
   *
   * Possible values: "key", "key_label"
   */
  composition_type?: CompositionTypeOutput;
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
  retention_period?: number;
  /** The size in bytes of the snapshot. */
  readonly size?: number;
  /** The amount of key-values in the snapshot. */
  readonly items_count?: number;
  /** The tags of the snapshot. */
  tags?: Record<string, string>;
  /** A value representing the current state of the snapshot. */
  readonly etag?: string;
}

/**
 * Enables filtering of key-values. Syntax reference:
 * https://aka.ms/azconfig/docs/restapisnapshots
 */
export interface KeyValueFilterOutput {
  /** Filters key-values by their key field. */
  key: string;
  /** Filters key-values by their label field. */
  label?: string;
  /** Filters key-values by their tags field. */
  tags?: string[];
}

/** Details of a long running operation. */
export interface OperationDetailsOutput {
  /** The unique id of the operation. */
  id: string;
  /**
   * The current status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /**
   * An error, available when the status is `Failed`, describing why the operation
   * failed.
   */
  error?: ErrorModel;
}

/** The result of a list request. */
export interface LabelListResultOutput {
  /** The collection value. */
  items?: Array<LabelOutput>;
  /** The URI that can be used to request the next set of paged results. */
  "@nextLink"?: string;
}

/** Labels are used to group key-values. */
export interface LabelOutput {
  /** The name of the label. */
  name?: string;
}

/** Alias for SnapshotStatusOutput */
export type SnapshotStatusOutput = string;
/** Alias for CompositionTypeOutput */
export type CompositionTypeOutput = string;
/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
