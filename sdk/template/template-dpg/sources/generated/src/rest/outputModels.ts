// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface WidgetOutput {
  /** The UUID of this widget. This is generated automatically by the service. */
  id: string;
  /** The weight of the widget. This is an int32, but must be greater than zero. */
  weight: number;
  /** The color of the widget. */
  color: "red" | "blue";
}

export interface WidgetErrorOutput {
  /** The HTTP error code. */
  code: number;
  /** A human-readable message describing the error. */
  message: string;
}

export interface AnalyzeResultOutput {
  summary: string;
}
