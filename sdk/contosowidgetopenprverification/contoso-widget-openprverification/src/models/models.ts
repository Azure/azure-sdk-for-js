// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ErrorModel } from "@azure-rest/core-client";

/** A widget. OPEN-PR-VERIFICATION-17024 proves this output came from the open spec PR. */
export interface WidgetSuite {
  /** The widget name. */
  readonly name: string;
  /** The ID of the widget's manufacturer. */
  manufacturerId: string;
  /** The shared sample model. */
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

/** The shared model shape from the existing Widget sample. */
export interface FakedSharedModel {
  /** The tag. */
  tag: string;
  /** The creation time in UTC. */
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
export type OperationState = "NotStarted" | "Running" | "Succeeded" | "Failed" | "Canceled";

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

/** The existing sample API versions, retained for this disposable test. */
export enum KnownVersions {
  /** The 2022-12-01 sample API version. */
  V20221201 = "2022-12-01",
}
