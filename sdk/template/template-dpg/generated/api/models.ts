// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** */
export interface Widget {
  /** The UUID of this widget. This is generated automatically by the service. */
  id: string;
  /** The weight of the widget. This is an int32, but must be greater than zero. */
  weight: number;
  /** The color of the widget. */
  color: ColorType;
}

/** Type of ColorType */
/** */
export type ColorType = "red" | "blue";

/** */
export interface AnalyzeResult {
  /** */
  summary: string;
}
