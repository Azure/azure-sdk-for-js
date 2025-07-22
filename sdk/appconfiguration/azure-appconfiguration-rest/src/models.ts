// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A key-value pair representing application settings. */
export interface KeyValue {
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

/** A snapshot is a named, immutable subset of an App Configuration store's key-values. */
export interface Snapshot {
  /** A list of filters used to filter the key-values included in the snapshot. */
  filters: Array<KeyValueFilter>;
  /**
   * The composition type describes how the key-values within the snapshot are
   * composed. The 'key' composition type ensures there are no two key-values
   * containing the same key. The 'key_label' composition type ensures there are no
   * two key-values containing the same key and label.
   *
   * Possible values: "key", "key_label"
   */
  composition_type?: CompositionType;
  /**
   * The amount of time, in seconds, that a snapshot will remain in the archived
   * state before expiring. This property is only writable during the creation of a
   * snapshot. If not specified, the default lifetime of key-value revisions will be
   * used.
   */
  retention_period?: number;
  /** The tags of the snapshot. */
  tags?: Record<string, string>;
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

/** Parameters used to update a snapshot. */
export interface SnapshotUpdateParameters {
  /**
   * The desired status of the snapshot.
   *
   * Possible values: "provisioning", "ready", "archived", "failed"
   */
  status?: SnapshotStatus;
}

/** Alias for KeyValueFields */
export type KeyValueFields = string;
/** Alias for SnapshotFields */
export type SnapshotFields = string;
/** Alias for SnapshotStatus */
export type SnapshotStatus = string;
/** Alias for CompositionType */
export type CompositionType = string;
/** Alias for LabelFields */
export type LabelFields = string;
