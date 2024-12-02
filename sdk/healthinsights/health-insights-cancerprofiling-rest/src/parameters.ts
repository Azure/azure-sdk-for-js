// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type { OncoPhenotypeData } from "./models.js";

export type GetJobParameters = RequestParameters;

export interface CreateJobHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
}

export interface CreateJobBodyParam {
  body?: OncoPhenotypeData;
}

export interface CreateJobHeaderParam {
  headers?: RawHttpHeadersInput & CreateJobHeaders;
}

export type CreateJobParameters = CreateJobHeaderParam & CreateJobBodyParam & RequestParameters;
