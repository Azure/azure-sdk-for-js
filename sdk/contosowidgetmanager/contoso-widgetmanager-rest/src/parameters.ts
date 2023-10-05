// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import { CreateWidgetRequest } from "./models";

export interface GetWidgetQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetWidgetQueryParam {
  queryParameters: GetWidgetQueryParamProperties;
}

export type GetWidgetParameters = GetWidgetQueryParam & RequestParameters;

export interface GetWidgetOperationStatusQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface GetWidgetOperationStatusQueryParam {
  queryParameters: GetWidgetOperationStatusQueryParamProperties;
}

export type GetWidgetOperationStatusParameters =
  GetWidgetOperationStatusQueryParam & RequestParameters;
/** The resource instance. */
export type CreateWidgetRequestResourceMergeAndPatch =
  Partial<CreateWidgetRequest>;

export interface NewWidgetBodyParam {
  /** The resource instance. */
  body: CreateWidgetRequestResourceMergeAndPatch;
}

export interface NewWidgetQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface NewWidgetQueryParam {
  queryParameters: NewWidgetQueryParamProperties;
}

export interface NewWidgetMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type NewWidgetParameters = NewWidgetQueryParam &
  NewWidgetMediaTypesParam &
  NewWidgetBodyParam &
  RequestParameters;

export interface EraseWidgetQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface EraseWidgetQueryParam {
  queryParameters: EraseWidgetQueryParamProperties;
}

export type EraseWidgetParameters = EraseWidgetQueryParam & RequestParameters;

export interface RetrieveAllWidgetsQueryParamProperties {
  /** The API version to use for this operation. */
  "api-version": string;
}

export interface RetrieveAllWidgetsQueryParam {
  queryParameters: RetrieveAllWidgetsQueryParamProperties;
}

export type RetrieveAllWidgetsParameters = RetrieveAllWidgetsQueryParam &
  RequestParameters;
