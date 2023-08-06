// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { TrialMatcherData } from "./models";

export type GetJobParameters = RequestParameters;

export interface CreateJobHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
}

export interface CreateJobBodyParam {
  body?: TrialMatcherData;
}

export interface CreateJobHeaderParam {
  headers?: RawHttpHeadersInput & CreateJobHeaders;
}

export type CreateJobParameters = CreateJobHeaderParam &
  CreateJobBodyParam &
  RequestParameters;
