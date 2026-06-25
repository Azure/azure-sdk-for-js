// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ContentSafetyClient } from "./contentSafety/contentSafetyClient.js";
export type {
  AnalyzeImageOptions,
  ImageData,
  ImageCategory,
  AnalyzeImageOutputType,
  AnalyzeImageResult,
  ImageCategoriesAnalysis,
  AnalyzeTextOptions,
  TextCategory,
  AnalyzeTextOutputType,
  AnalyzeTextResult,
  TextBlocklistMatch,
  TextCategoriesAnalysis,
  DetectTextProtectedMaterialOptions,
  DetectTextProtectedMaterialResult,
  TextProtectedMaterialAnalysisResult,
  ShieldPromptOptions,
  ShieldPromptResult,
  UserPromptInjectionAnalysisResult,
  DocumentInjectionAnalysisResult,
  AddOrUpdateTextBlocklistItemsOptions,
  TextBlocklistItem,
  AddOrUpdateTextBlocklistItemsResult,
  TextBlocklist,
  RemoveTextBlocklistItemsOptions,
} from "./models/index.js";
export { KnownVersions } from "./models/index.js";
export type {
  ContentSafetyClientOptionalParams,
  ShieldPromptOptionalParams,
  DetectTextProtectedMaterialOptionalParams,
  AnalyzeTextOptionalParams,
  AnalyzeImageOptionalParams,
} from "./contentSafety/api/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
export { BlocklistClient } from "./blocklist/blocklistClient.js";
export type {
  BlocklistClientOptionalParams,
  RemoveBlocklistItemsOptionalParams,
  ListTextBlocklistsOptionalParams,
  ListTextBlocklistItemsOptionalParams,
  GetTextBlocklistItemOptionalParams,
  GetTextBlocklistOptionalParams,
  DeleteTextBlocklistOptionalParams,
  CreateOrUpdateTextBlocklistOptionalParams,
  AddOrUpdateBlocklistItemsOptionalParams,
} from "./blocklist/api/index.js";
