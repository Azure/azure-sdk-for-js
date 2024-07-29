// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** An object holding the publicly reachable URL of an image to analyze. */
export interface ImageUrl {
  /** Publicly reachable URL of an image to analyze. */
  url: string;
}

/** The visual features supported by the Image Analysis service */
export type VisualFeatures =
  | "tags"
  | "caption"
  | "denseCaptions"
  | "objects"
  | "read"
  | "smartCrops"
  | "people";
