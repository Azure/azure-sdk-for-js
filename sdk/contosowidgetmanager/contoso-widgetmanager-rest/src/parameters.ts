// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type { WidgetSuite } from "./models.js";

export type GetWidgetParameters = RequestParameters;
export type GetWidgetOperationStatusParameters = RequestParameters;
/** The resource instance. */
export type WidgetSuiteResourceMergeAndPatch = Partial<WidgetSuite>;

export interface CreateOrUpdateWidgetBodyParam {
  /** The resource instance. */
  body: WidgetSuiteResourceMergeAndPatch;
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
export type ListWidgetsParameters = RequestParameters;
