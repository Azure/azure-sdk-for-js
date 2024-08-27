// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";
import { CreateWidget, UpdateWidget } from "./models.js";

export type ListWidgetsParameters = RequestParameters;
export type GetWidgetParameters = RequestParameters;

export interface CreateWidgetBodyParam {
  body?: CreateWidget;
}

export type CreateWidgetParameters = CreateWidgetBodyParam & RequestParameters;

export interface UpdateWidgetBodyParam {
  body?: UpdateWidget;
}

export type UpdateWidgetParameters = UpdateWidgetBodyParam & RequestParameters;
export type DeleteWidgetParameters = RequestParameters;
export type AnalyzeWidgetParameters = RequestParameters;
