// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type { ExperimentMetric } from "./models.js";

export interface GetMetricHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if no entity matches this string. */
  "If-None-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
  /** The request should only proceed if the entity was modified after this time. */
  "If-Modified-Since"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetMetricHeaderParam {
  headers?: RawHttpHeadersInput & GetMetricHeaders;
}

export type GetMetricParameters = GetMetricHeaderParam & RequestParameters;

export interface CreateOrUpdateMetricHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if no entity matches this string. */
  "If-None-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
  /** The request should only proceed if the entity was modified after this time. */
  "If-Modified-Since"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The resource instance. */
export type ExperimentMetricResourceMergeAndPatch = Partial<ExperimentMetric>;

export interface CreateOrUpdateMetricBodyParam {
  /** The resource instance. */
  body: ExperimentMetricResourceMergeAndPatch;
}

export interface CreateOrUpdateMetricHeaderParam {
  headers?: RawHttpHeadersInput & CreateOrUpdateMetricHeaders;
}

export interface CreateOrUpdateMetricMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type CreateOrUpdateMetricParameters = CreateOrUpdateMetricHeaderParam &
  CreateOrUpdateMetricMediaTypesParam &
  CreateOrUpdateMetricBodyParam &
  RequestParameters;

export interface ValidateMetricHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ValidateMetricBodyParam {
  /** Experiment metric input to validate */
  body: ExperimentMetric;
}

export interface ValidateMetricHeaderParam {
  headers?: RawHttpHeadersInput & ValidateMetricHeaders;
}

export type ValidateMetricParameters = ValidateMetricHeaderParam &
  ValidateMetricBodyParam &
  RequestParameters;

export interface DeleteMetricHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if no entity matches this string. */
  "If-None-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
  /** The request should only proceed if the entity was modified after this time. */
  "If-Modified-Since"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeleteMetricHeaderParam {
  headers?: RawHttpHeadersInput & DeleteMetricHeaders;
}

export type DeleteMetricParameters = DeleteMetricHeaderParam & RequestParameters;

export interface ListMetricsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListMetricsQueryParamProperties {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}

export interface ListMetricsQueryParam {
  queryParameters?: ListMetricsQueryParamProperties;
}

export interface ListMetricsHeaderParam {
  headers?: RawHttpHeadersInput & ListMetricsHeaders;
}

export type ListMetricsParameters = ListMetricsQueryParam &
  ListMetricsHeaderParam &
  RequestParameters;
