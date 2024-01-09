// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AnalyzeTextOptions,
  AnalyzeImageOptions,
  TextBlocklist,
  AddOrUpdateTextBlocklistItemsOptions,
  RemoveTextBlocklistItemsOptions,
} from "./models";

export interface AnalyzeTextBodyParam {
  /** The text analysis request. */
  body: AnalyzeTextOptions;
}

export type AnalyzeTextParameters = AnalyzeTextBodyParam & RequestParameters;

export interface AnalyzeImageBodyParam {
  /** The image analysis request. */
  body: AnalyzeImageOptions;
}

export type AnalyzeImageParameters = AnalyzeImageBodyParam & RequestParameters;
export type GetTextBlocklistParameters = RequestParameters;
/** The resource instance. */
export type TextBlocklistResourceMergeAndPatch = Partial<TextBlocklist>;

export interface CreateOrUpdateTextBlocklistBodyParam {
  /** The resource instance. */
  body: TextBlocklistResourceMergeAndPatch;
}

export interface CreateOrUpdateTextBlocklistMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateTextBlocklistParameters =
  CreateOrUpdateTextBlocklistMediaTypesParam &
    CreateOrUpdateTextBlocklistBodyParam &
    RequestParameters;
export type DeleteTextBlocklistParameters = RequestParameters;
export type ListTextBlocklistsParameters = RequestParameters;

export interface AddOrUpdateBlocklistItemsBodyParam {
  /** Options for adding or updating blocklist items. */
  body: AddOrUpdateTextBlocklistItemsOptions;
}

export type AddOrUpdateBlocklistItemsParameters =
  AddOrUpdateBlocklistItemsBodyParam & RequestParameters;

export interface RemoveBlocklistItemsBodyParam {
  /** Options for removing blocklist items. */
  body: RemoveTextBlocklistItemsOptions;
}

export type RemoveBlocklistItemsParameters = RemoveBlocklistItemsBodyParam &
  RequestParameters;
export type GetTextBlocklistItemParameters = RequestParameters;

export interface ListTextBlocklistItemsQueryParamProperties {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListTextBlocklistItemsQueryParam {
  queryParameters?: ListTextBlocklistItemsQueryParamProperties;
}

export type ListTextBlocklistItemsParameters =
  ListTextBlocklistItemsQueryParam & RequestParameters;
