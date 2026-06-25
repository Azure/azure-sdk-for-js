// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { ImageAnalysisClient } from "./imageAnalysisClient.js";
export type {
  ImageAnalysisResult,
  CaptionResult,
  DenseCaptionsResult,
  DenseCaption,
  ImageBoundingBox,
  ImageMetadata,
  ObjectsResult,
  DetectedObject,
  DetectedTag,
  PeopleResult,
  DetectedPerson,
  ReadResult,
  DetectedTextBlock,
  DetectedTextLine,
  ImagePoint,
  DetectedTextWord,
  SmartCropsResult,
  CropRegion,
  TagsResult,
  ImageUrl,
  VisualFeatures,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
  ImageAnalysisClientOptionalParams,
  AnalyzeFromUrlOptionalParams,
  AnalyzeFromImageDataOptionalParams,
} from "./api/index.js";
export { RestError, isRestError } from "@azure/core-rest-pipeline";
