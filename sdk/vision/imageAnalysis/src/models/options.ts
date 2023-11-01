// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";
import { VisualFeatures } from "./models.js";

export interface AnalyzeFromStreamOptions extends OperationOptions {
  /** The format of the HTTP payload. */
  contentType?: string;
  /** A string indicating what visual feature types to return. Multiple values should be comma-separated. Valid visual feature types include: Tags, Caption, DenseCaptions, Objects, Read, SmartCrops, People. At least one visual feature must be specified for Image Analysis. */
  visualFeatures?: VisualFeatures[];
  /** The desired language for output generation. If this parameter is not specified, the default value is "en". See https://aka.ms/cv-languages for a list of supported languages. */
  language?: string;
  /** Boolean flag for enabling gender-neutral captioning for caption and denseCaptions features. If this parameter is not specified, the default value is "false". */
  genderNeutralCaption?: boolean;
  /** A list of aspect ratios to use for smartCrops feature. Aspect ratios are calculated by dividing the target crop width by the height. Supported values are between 0.75 and 1.8 (inclusive). Multiple values should be comma-separated. If this parameter is not specified, the service will return one crop suggestion with an aspect ratio it sees fit between 0.5 and 2.0 (inclusive). */
  smartCropsAspectRatios?: number[];
  /** The name of the custom trained model. This parameter needs to be specified if the parameter "features" is not specified. */
  modelName?: string;
}

export interface AnalyzeFromUrlOptions extends OperationOptions {
  /** The format of the HTTP payload. */
  contentType?: string;
  /** A string indicating what visual feature types to return. Multiple values should be comma-separated. Valid visual feature types include: Tags, Caption, DenseCaptions, Objects, Read, SmartCrops, People. At least one visual feature must be specified for Image Analysis. */
  visualFeatures?: VisualFeatures[];
  /** The desired language for output generation. If this parameter is not specified, the default value is "en". See https://aka.ms/cv-languages for a list of supported languages. */
  language?: string;
  /** Boolean flag for enabling gender-neutral captioning for caption and denseCaptions features. If this parameter is not specified, the default value is "false". */
  genderNeutralCaption?: boolean;
  /** A list of aspect ratios to use for smartCrops feature. Aspect ratios are calculated by dividing the target crop width by the height. Supported values are between 0.75 and 1.8 (inclusive). Multiple values should be comma-separated. If this parameter is not specified, the service will return one crop suggestion with an aspect ratio it sees fit between 0.5 and 2.0 (inclusive). */
  smartCropsAspectRatios?: number[];
  /** The name of the custom trained model. This parameter needs to be specified if the parameter "features" is not specified. */
  modelName?: string;
}

export interface SegmentFromUrlOptions extends OperationOptions {
  /** The format of the HTTP payload. */
  contentType?: string;
}

export interface SegmentFromStreamOptions extends OperationOptions {
  /** The format of the HTTP payload. */
  contentType?: string;
}
