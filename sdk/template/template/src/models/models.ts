// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorModel } from "@azure-rest/core-client";

/** A widget. */
export interface WidgetSuite {
  /** The widget name. */
  readonly name: string;
  /** The ID of the widget's manufacturer. */
  manufacturerId: string;
  /** The faked shared model. */
  sharedModel?: FakedSharedModel;
}

export function widgetSuiteSerializer(item: WidgetSuite): any {
  return {
    manufacturerId: item["manufacturerId"],
    sharedModel: !item["sharedModel"]
      ? item["sharedModel"]
      : fakedSharedModelSerializer(item["sharedModel"]),
  };
}

export function widgetSuiteDeserializer(item: any): WidgetSuite {
  return {
    name: item["name"],
    manufacturerId: item["manufacturerId"],
    sharedModel: !item["sharedModel"]
      ? item["sharedModel"]
      : fakedSharedModelDeserializer(item["sharedModel"]),
  };
}

/** Faked shared model */
export interface FakedSharedModel {
  /** The tag. */
  tag: string;
  /** The created date. */
  createdAt: Date;
}

export function fakedSharedModelSerializer(item: FakedSharedModel): any {
  return { tag: item["tag"], createdAt: item["createdAt"].toISOString() };
}

export function fakedSharedModelDeserializer(item: any): FakedSharedModel {
  return {
    tag: item["tag"],
    createdAt: new Date(item["createdAt"]),
  };
}

/** Provides status details for long running operations. */
export interface ResourceOperationStatusWidgetSuiteWidgetSuiteError {
  /** The unique ID of the operation. */
  id: string;
  /** The status of the operation */
  status: OperationState;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: WidgetSuite;
}

export function resourceOperationStatusWidgetSuiteWidgetSuiteErrorDeserializer(
  item: any,
): ResourceOperationStatusWidgetSuiteWidgetSuiteError {
  return {
    id: item["id"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
    result: !item["result"] ? item["result"] : widgetSuiteDeserializer(item["result"]),
  };
}

/** Enum describing allowed operation states. */
export enum KnownOperationState {
  /** The operation has not started. */
  NotStarted = "NotStarted",
  /** The operation is in progress. */
  Running = "Running",
  /** The operation has completed successfully. */
  Succeeded = "Succeeded",
  /** The operation has failed. */
  Failed = "Failed",
  /** The operation has been canceled by the user. */
  Canceled = "Canceled",
}

/**
 * Enum describing allowed operation states. \
 * {@link KnownOperationState} can be used interchangeably with OperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: The operation has not started. \
 * **Running**: The operation is in progress. \
 * **Succeeded**: The operation has completed successfully. \
 * **Failed**: The operation has failed. \
 * **Canceled**: The operation has been canceled by the user.
 */
export type OperationState = string;

/** Paged collection of WidgetSuite items */
export interface _PagedWidgetSuite {
  /** The WidgetSuite items on this page */
  value: WidgetSuite[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedWidgetSuiteDeserializer(item: any): _PagedWidgetSuite {
  return {
    value: widgetSuiteArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function widgetSuiteArraySerializer(result: Array<WidgetSuite>): any[] {
  return result.map((item) => {
    return widgetSuiteSerializer(item);
  });
}

export function widgetSuiteArrayDeserializer(result: Array<WidgetSuite>): any[] {
  return result.map((item) => {
    return widgetSuiteDeserializer(item);
  });
}

/** Versions info. */
export enum KnownVersions {
  /** The 2022-12-01 version. */
  V20221201 = "2022-12-01",
}
