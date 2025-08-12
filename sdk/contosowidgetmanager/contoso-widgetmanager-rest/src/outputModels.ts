// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

/** A widget. */
export interface WidgetSuiteOutput {
  /** The widget name. */
  readonly name: string;
  /** The ID of the widget's manufacturer. */
  manufacturerId: string;
  /** The faked shared model. */
  sharedModel?: FakedSharedModelOutput;
}

/** Faked shared model */
export interface FakedSharedModelOutput {
  /** The tag. */
  tag: string;
  /** The created date. */
  createdAt: string;
}

/** Provides status details for long running operations. */
export interface ResourceOperationStatusWidgetSuiteWidgetSuiteErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
  /** The result of the operation. */
  result?: WidgetSuiteOutput;
}

/** Provides status details for long running operations. */
export interface OperationStatusErrorOutput {
  /** The unique ID of the operation. */
  id: string;
  /**
   * The status of the operation
   *
   * Possible values: "NotStarted", "Running", "Succeeded", "Failed", "Canceled"
   */
  status: OperationStateOutput;
  /** Error object that describes the error when status is "Failed". */
  error?: ErrorModel;
}

/** Paged collection of WidgetSuite items */
export interface PagedWidgetSuiteOutput {
  /** The WidgetSuite items on this page */
  value: Array<WidgetSuiteOutput>;
  /** The link to the next page of items */
  nextLink?: string;
}

/** Alias for OperationStateOutput */
export type OperationStateOutput = string;
