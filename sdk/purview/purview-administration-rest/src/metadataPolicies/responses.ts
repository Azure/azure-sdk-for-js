// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  MetadataRoleListOutput,
  ErrorResponseModelOutput,
  MetadataPolicyListOutput,
  MetadataPolicyOutput,
} from "./outputModels.js";

/** Lists roles for Purview Account */
export interface MetadataRolesList200Response extends HttpResponse {
  status: "200";
  body: MetadataRoleListOutput;
}

export interface MetadataRolesListDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Lists roles for Purview Account */
export interface MetadataRolesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & MetadataRolesListDefaultHeaders;
}

/** List or Get metadata policies */
export interface MetadataPolicyListAll200Response extends HttpResponse {
  status: "200";
  body: MetadataPolicyListOutput;
}

export interface MetadataPolicyListAllDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** List or Get metadata policies */
export interface MetadataPolicyListAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & MetadataPolicyListAllDefaultHeaders;
}

/** Updates a metadata policy */
export interface MetadataPolicyUpdate200Response extends HttpResponse {
  status: "200";
  body: MetadataPolicyOutput;
}

export interface MetadataPolicyUpdateDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Updates a metadata policy */
export interface MetadataPolicyUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & MetadataPolicyUpdateDefaultHeaders;
}

/** Gets a metadata policy */
export interface MetadataPolicyGet200Response extends HttpResponse {
  status: "200";
  body: MetadataPolicyOutput;
}

export interface MetadataPolicyGetDefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Gets a metadata policy */
export interface MetadataPolicyGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & MetadataPolicyGetDefaultHeaders;
}
