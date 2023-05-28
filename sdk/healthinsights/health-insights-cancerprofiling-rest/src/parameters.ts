// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { OncoPhenotypeData } from "./models";

export interface InferCancerProfileHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
}

export interface InferCancerProfileBodyParam {
  body?: OncoPhenotypeData;
}

export interface InferCancerProfileHeaderParam {
  headers?: RawHttpHeadersInput & InferCancerProfileHeaders;
}

export type InferCancerProfileParameters = InferCancerProfileHeaderParam &
  InferCancerProfileBodyParam &
  RequestParameters;
