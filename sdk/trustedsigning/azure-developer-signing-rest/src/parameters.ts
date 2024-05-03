// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import { SigningPayloadOptions } from "./models.js";

export type GetSigningStatusParameters = RequestParameters;
export type GetSignRootCertificateParameters = RequestParameters;
export type ListExtendedKeyUsagesParameters = RequestParameters;

export interface SignHeaders {
  /** An optional client version. */
  "client-version"?: string;
  /** An identifier used to batch multiple requests. */
  "x-correlation-id"?: string;
}

export interface SignBodyParam {
  body?: SigningPayloadOptions;
}

export interface SignHeaderParam {
  headers?: RawHttpHeadersInput & SignHeaders;
}

export type SignParameters = SignHeaderParam &
  SignBodyParam &
  RequestParameters;
