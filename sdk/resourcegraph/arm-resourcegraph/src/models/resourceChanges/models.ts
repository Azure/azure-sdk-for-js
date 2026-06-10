// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DateTimeInterval } from "../resourceGraphCommon/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The parameters for a specific changes request. */
export interface ResourceChangesRequestParameters {
  /** Specifies the list of resources for a changes request. */
  resourceIds?: string[];
  /** The subscription id of resources to query the changes from. */
  subscriptionId?: string;
  /** Specifies the date and time interval for a changes request. */
  interval: ResourceChangesRequestParametersInterval;
  /** Acts as the continuation token for paged responses. */
  skipToken?: string;
  /** The maximum number of changes the client can accept in a paged response. */
  top?: number;
  /** The table name to query resources from. */
  table?: string;
  /** The flag if set to true will fetch property changes */
  fetchPropertyChanges?: boolean;
  /** The flag if set to true will fetch change snapshots */
  fetchSnapshots?: boolean;
}

export function resourceChangesRequestParametersSerializer(
  item: ResourceChangesRequestParameters,
): any {
  return {
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
    subscriptionId: item["subscriptionId"],
    interval: resourceChangesRequestParametersIntervalSerializer(item["interval"]),
    $skipToken: item["skipToken"],
    $top: item["top"],
    table: item["table"],
    fetchPropertyChanges: item["fetchPropertyChanges"],
    fetchSnapshots: item["fetchSnapshots"],
  };
}

/** Specifies the date and time interval for a changes request. */
export interface ResourceChangesRequestParametersInterval extends DateTimeInterval {}

export function resourceChangesRequestParametersIntervalSerializer(
  item: ResourceChangesRequestParametersInterval,
): any {
  return { start: item["start"].toISOString(), end: item["end"].toISOString() };
}

/** A list of changes associated with a resource over a specific time interval. */
export interface ResourceChangeList {
  /**
   * The pageable value returned by the operation, i.e. a list of changes to the resource.
   *
   * - The list is ordered from the most recent changes to the least recent changes.
   * - This list will be empty if there were no changes during the requested interval.
   * - The `Before` snapshot timestamp value of the oldest change can be outside of the specified time interval.
   */
  changes?: ResourceChangeData[];
  /** Skip token that encodes the skip information while executing the current request */
  skipToken?: any;
}

export function resourceChangeListDeserializer(item: any): ResourceChangeList {
  return {
    changes: !item["changes"]
      ? item["changes"]
      : resourceChangeDataArrayDeserializer(item["changes"]),
    skipToken: item["$skipToken"],
  };
}

export function resourceChangeDataArrayDeserializer(result: Array<ResourceChangeData>): any[] {
  return result.map((item) => {
    return resourceChangeDataDeserializer(item);
  });
}

/** Data on a specific change, represented by a pair of before and after resource snapshots. */
export interface ResourceChangeData {
  /** The resource for a change. */
  resourceId?: string;
  /** The change ID. Valid and unique within the specified resource only. */
  changeId: string;
  /** The snapshot before the change. */
  beforeSnapshot: ResourceChangeDataBeforeSnapshot;
  /** The snapshot after the change. */
  afterSnapshot: ResourceChangeDataAfterSnapshot;
  /** The change type for snapshot. PropertyChanges will be provided in case of Update change type */
  changeType?: ChangeType;
  /** An array of resource property change */
  propertyChanges?: ResourcePropertyChange[];
}

export function resourceChangeDataDeserializer(item: any): ResourceChangeData {
  return {
    resourceId: item["resourceId"],
    changeId: item["changeId"],
    beforeSnapshot: resourceChangeDataBeforeSnapshotDeserializer(item["beforeSnapshot"]),
    afterSnapshot: resourceChangeDataAfterSnapshotDeserializer(item["afterSnapshot"]),
    changeType: item["changeType"],
    propertyChanges: !item["propertyChanges"]
      ? item["propertyChanges"]
      : resourcePropertyChangeArrayDeserializer(item["propertyChanges"]),
  };
}

/** The snapshot before the change. */
export interface ResourceChangeDataBeforeSnapshot extends ResourceSnapshotData {}

export function resourceChangeDataBeforeSnapshotDeserializer(
  item: any,
): ResourceChangeDataBeforeSnapshot {
  return {
    snapshotId: item["snapshotId"],
    timestamp: new Date(item["timestamp"]),
    content: item["content"],
  };
}

/** The snapshot after the change. */
export interface ResourceChangeDataAfterSnapshot extends ResourceSnapshotData {}

export function resourceChangeDataAfterSnapshotDeserializer(
  item: any,
): ResourceChangeDataAfterSnapshot {
  return {
    snapshotId: item["snapshotId"],
    timestamp: new Date(item["timestamp"]),
    content: item["content"],
  };
}

/** The change type for snapshot. PropertyChanges will be provided in case of Update change type */
export type ChangeType = "Create" | "Update" | "Delete";

export function resourcePropertyChangeArrayDeserializer(
  result: Array<ResourcePropertyChange>,
): any[] {
  return result.map((item) => {
    return resourcePropertyChangeDeserializer(item);
  });
}

/** The resource property change */
export interface ResourcePropertyChange {
  /** The property name */
  propertyName: string;
  /** The property value in before snapshot */
  beforeValue?: string;
  /** The property value in after snapshot */
  afterValue?: string;
  /** The change category. */
  changeCategory: ChangeCategory;
  /** The property change Type */
  propertyChangeType: PropertyChangeType;
}

export function resourcePropertyChangeDeserializer(item: any): ResourcePropertyChange {
  return {
    propertyName: item["propertyName"],
    beforeValue: item["beforeValue"],
    afterValue: item["afterValue"],
    changeCategory: item["changeCategory"],
    propertyChangeType: item["propertyChangeType"],
  };
}

/** The change category. */
export type ChangeCategory = "User" | "System";
/** The property change Type */
export type PropertyChangeType = "Insert" | "Update" | "Remove";

/** Data on a specific resource snapshot. */
export interface ResourceSnapshotData {
  /** The ID of the snapshot. */
  snapshotId?: string;
  /**
   * The time when the snapshot was created.
   * The snapshot timestamp provides an approximation as to when a modification to a resource was detected.  There can be a difference between the actual modification time and the detection time.  This is due to differences in how operations that modify a resource are processed, versus how operation that record resource snapshots are processed.
   */
  timestamp: Date;
  /** The resource snapshot content (in resourceChangeDetails response only). */
  content?: any;
}

export function resourceSnapshotDataDeserializer(item: any): ResourceSnapshotData {
  return {
    snapshotId: item["snapshotId"],
    timestamp: new Date(item["timestamp"]),
    content: item["content"],
  };
}

/** The parameters for a specific change details request. */
export interface ResourceChangeDetailsRequestParameters {
  /** Specifies the list of resources for a change details request. */
  resourceIds: string[];
  /** Specifies the list of change IDs for a change details request. */
  changeIds: string[];
}

export function resourceChangeDetailsRequestParametersSerializer(
  item: ResourceChangeDetailsRequestParameters,
): any {
  return {
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
    changeIds: item["changeIds"].map((p: any) => {
      return p;
    }),
  };
}
