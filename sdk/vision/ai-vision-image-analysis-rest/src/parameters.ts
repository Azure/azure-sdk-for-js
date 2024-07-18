// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { VisualFeatures, ImageUrl } from "./models.js";

export interface AnalyzeFromImageDataBodyParam {
  /**
   * The image to be analyzed
   *
   * Value may contain any sequence of octets
   */
  body:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
}

export interface AnalyzeFromImageDataQueryParamProperties {
  /**
   * A list of visual features to analyze.
   * Seven visual features are supported: Caption, DenseCaptions, Read (OCR), Tags, Objects, SmartCrops, and People.
   * At least one visual feature must be specified.
   */
  features: VisualFeatures[];
  /**
   * The desired language for result generation (a two-letter language code).
   * If this option is not specified, the default value 'en' is used (English).
   * See https://aka.ms/cv-languages for a list of supported languages.
   */
  language?: string;
  /**
   * Boolean flag for enabling gender-neutral captioning for Caption and Dense Captions features.
   * By default captions may contain gender terms (for example: 'man', 'woman', or 'boy', 'girl').
   * If you set this to "true", those will be replaced with gender-neutral terms (for example: 'person' or 'child').
   */
  "gender-neutral-caption"?: boolean;
  /**
   * A list of aspect ratios to use for smart cropping.
   * Aspect ratios are calculated by dividing the target crop width in pixels by the height in pixels.
   * Supported values are between 0.75 and 1.8 (inclusive).
   * If this parameter is not specified, the service will return one crop region with an aspect
   * ratio it sees fit between 0.5 and 2.0 (inclusive).
   */
  "smartcrops-aspect-ratios"?: number[];
  /**
   * The version of cloud AI-model used for analysis.
   * The format is the following: 'latest' (default value) or 'YYYY-MM-DD' or 'YYYY-MM-DD-preview', where 'YYYY', 'MM', 'DD' are the year, month and day associated with the model.
   * This is not commonly set, as the default always gives the latest AI model with recent improvements.
   * If however you would like to make sure analysis results do not change over time, set this value to a specific model version.
   */
  "model-version"?: string;
}

export interface AnalyzeFromImageDataQueryParam {
  queryParameters: AnalyzeFromImageDataQueryParamProperties;
}

export interface AnalyzeFromImageDataMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type AnalyzeFromImageDataParameters = AnalyzeFromImageDataQueryParam &
  AnalyzeFromImageDataMediaTypesParam &
  AnalyzeFromImageDataBodyParam &
  RequestParameters;

export interface AnalyzeFromUrlBodyParam {
  /** The image to be analyzed */
  body: ImageUrl;
}

export interface AnalyzeFromUrlQueryParamProperties {
  /**
   * A list of visual features to analyze.
   * Seven visual features are supported: Caption, DenseCaptions, Read (OCR), Tags, Objects, SmartCrops, and People.
   * At least one visual feature must be specified.
   */
  features: VisualFeatures[];
  /**
   * The desired language for result generation (a two-letter language code).
   * If this option is not specified, the default value 'en' is used (English).
   * See https://aka.ms/cv-languages for a list of supported languages.
   */
  language?: string;
  /**
   * Boolean flag for enabling gender-neutral captioning for Caption and Dense Captions features.
   * By default captions may contain gender terms (for example: 'man', 'woman', or 'boy', 'girl').
   * If you set this to "true", those will be replaced with gender-neutral terms (for example: 'person' or 'child').
   */
  "gender-neutral-caption"?: boolean;
  /**
   * A list of aspect ratios to use for smart cropping.
   * Aspect ratios are calculated by dividing the target crop width in pixels by the height in pixels.
   * Supported values are between 0.75 and 1.8 (inclusive).
   * If this parameter is not specified, the service will return one crop region with an aspect
   * ratio it sees fit between 0.5 and 2.0 (inclusive).
   */
  "smartcrops-aspect-ratios"?: number[];
  /**
   * The version of cloud AI-model used for analysis.
   * The format is the following: 'latest' (default value) or 'YYYY-MM-DD' or 'YYYY-MM-DD-preview', where 'YYYY', 'MM', 'DD' are the year, month and day associated with the model.
   * This is not commonly set, as the default always gives the latest AI model with recent improvements.
   * If however you would like to make sure analysis results do not change over time, set this value to a specific model version.
   */
  "model-version"?: string;
}

export interface AnalyzeFromUrlQueryParam {
  queryParameters: AnalyzeFromUrlQueryParamProperties;
}

export interface AnalyzeFromUrlMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/json";
}

export type AnalyzeFromUrlParameters = AnalyzeFromUrlQueryParam &
  AnalyzeFromUrlMediaTypesParam &
  AnalyzeFromUrlBodyParam &
  RequestParameters;
