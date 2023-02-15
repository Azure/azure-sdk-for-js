// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { Widget } from "./models";

export type GetWidgetParameters = RequestParameters;
export type GetWidgetOperationStatusParameters = RequestParameters;
export type WidgetResourceMergeAndPatch = Partial<Widget>;

export interface CreateOrUpdateWidgetBodyParam {
  body?: WidgetResourceMergeAndPatch;
}

export interface CreateOrUpdateWidgetMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateWidgetParameters =
  CreateOrUpdateWidgetMediaTypesParam &
    CreateOrUpdateWidgetBodyParam &
    RequestParameters;
export type DeleteWidgetParameters = RequestParameters;

export interface ListWidgetsQueryParamProperties {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListWidgetsQueryParam {
  queryParameters?: ListWidgetsQueryParamProperties;
}

export type ListWidgetsParameters = ListWidgetsQueryParam & RequestParameters;
