// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { ImageUrl } from "./models";

export interface AnalyzeFromStreamBodyParam {
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

export interface AnalyzeFromStreamQueryParamProperties {
  /** A string indicating what visual feature types to return. Multiple values should be comma-separated. Valid visual feature types include: Tags, Caption, DenseCaptions, Objects, Read, SmartCrops, People. At least one visual feature must be specified for Image Analysis. */
  features?: string[];
  /** The desired language for output generation. If this parameter is not specified, the default value is "en". See https://aka.ms/cv-languages for a list of supported languages. */
  language?: string;
  /** Boolean flag for enabling gender-neutral captioning for caption and denseCaptions features. If this parameter is not specified, the default value is "false". */
  "gender-neutral-caption"?: boolean;
  /** A list of aspect ratios to use for smartCrops feature. Aspect ratios are calculated by dividing the target crop width by the height. Supported values are between 0.75 and 1.8 (inclusive). Multiple values should be comma-separated. If this parameter is not specified, the service will return one crop suggestion with an aspect ratio it sees fit between 0.5 and 2.0 (inclusive). */
  "smartcrops-aspect-ratios"?: number[];
  /** The name of the custom trained model. This parameter needs to be specified if the parameter "features" is not specified. */
  "model-name"?: string;
}

export interface AnalyzeFromStreamQueryParam {
  queryParameters?: AnalyzeFromStreamQueryParamProperties;
}

export interface AnalyzeFromStreamMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type AnalyzeFromStreamParameters = AnalyzeFromStreamQueryParam &
  AnalyzeFromStreamMediaTypesParam &
  AnalyzeFromStreamBodyParam &
  RequestParameters;

export interface AnalyzeFromUrlBodyParam {
  /** The image to be analyzed */
  body: ImageUrl;
}

export interface AnalyzeFromUrlQueryParamProperties {
  /** A string indicating what visual feature types to return. Multiple values should be comma-separated. Valid visual feature types include: Tags, Caption, DenseCaptions, Objects, Read, SmartCrops, People. At least one visual feature must be specified for Image Analysis. */
  features?: string[];
  /** The desired language for output generation. If this parameter is not specified, the default value is "en". See https://aka.ms/cv-languages for a list of supported languages. */
  language?: string;
  /** Boolean flag for enabling gender-neutral captioning for caption and denseCaptions features. If this parameter is not specified, the default value is "false". */
  "gender-neutral-caption"?: boolean;
  /** A list of aspect ratios to use for smartCrops feature. Aspect ratios are calculated by dividing the target crop width by the height. Supported values are between 0.75 and 1.8 (inclusive). Multiple values should be comma-separated. If this parameter is not specified, the service will return one crop suggestion with an aspect ratio it sees fit between 0.5 and 2.0 (inclusive). */
  "smartcrops-aspect-ratios"?: number[];
  /** The name of the custom trained model. This parameter needs to be specified if the parameter "features" is not specified. */
  "model-name"?: string;
}

export interface AnalyzeFromUrlQueryParam {
  queryParameters?: AnalyzeFromUrlQueryParamProperties;
}

export interface AnalyzeFromUrlMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/json";
}

export type AnalyzeFromUrlParameters = AnalyzeFromUrlQueryParam &
  AnalyzeFromUrlMediaTypesParam &
  AnalyzeFromUrlBodyParam &
  RequestParameters;

export interface SegmentFromUrlBodyParam {
  /** The image to be analyzed */
  body: ImageUrl;
}

export interface SegmentFromUrlQueryParamProperties {
  /**
   * The type of segmentation to perform
   *
   * Possible values: backgroundRemoval, foregroundMatting
   */
  mode: string;
}

export interface SegmentFromUrlQueryParam {
  queryParameters: SegmentFromUrlQueryParamProperties;
}

export interface SegmentFromUrlMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/json";
}

export type SegmentFromUrlParameters = SegmentFromUrlQueryParam &
  SegmentFromUrlMediaTypesParam &
  SegmentFromUrlBodyParam &
  RequestParameters;

export interface SegmentFromStreamBodyParam {
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

export interface SegmentFromStreamQueryParamProperties {
  /**
   * The type of segmentation to perform
   *
   * Possible values: backgroundRemoval, foregroundMatting
   */
  mode: string;
}

export interface SegmentFromStreamQueryParam {
  queryParameters: SegmentFromStreamQueryParamProperties;
}

export interface SegmentFromStreamMediaTypesParam {
  /** The format of the HTTP payload. */
  contentType: "application/octet-stream";
}

export type SegmentFromStreamParameters = SegmentFromStreamQueryParam &
  SegmentFromStreamMediaTypesParam &
  SegmentFromStreamBodyParam &
  RequestParameters;
