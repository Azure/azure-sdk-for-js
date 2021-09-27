// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { ErrorResponseModel, MetadataPolicy, MetadataPolicyList, MetadataRoleList } from "./models";

/** Lists roles for Purview Account */
export interface MetadataRolesList200Response extends HttpResponse {
  status: "200";
  body: MetadataRoleList;
}

export interface MetadataRolesListdefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Lists roles for Purview Account */
export interface MetadataRolesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
  headers: RawHttpHeaders & MetadataRolesListdefaultHeaders;
}

/** List or Get metadata policies */
export interface MetadataPolicyListAll200Response extends HttpResponse {
  status: "200";
  body: MetadataPolicyList;
}

export interface MetadataPolicyListAlldefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** List or Get metadata policies */
export interface MetadataPolicyListAlldefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
  headers: RawHttpHeaders & MetadataPolicyListAlldefaultHeaders;
}

/** Updates a metadata policy */
export interface MetadataPolicyUpdate200Response extends HttpResponse {
  status: "200";
  body: MetadataPolicy;
}

export interface MetadataPolicyUpdatedefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Updates a metadata policy */
export interface MetadataPolicyUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
  headers: RawHttpHeaders & MetadataPolicyUpdatedefaultHeaders;
}

/** Gets a metadata policy */
export interface MetadataPolicyGet200Response extends HttpResponse {
  status: "200";
  body: MetadataPolicy;
}

export interface MetadataPolicyGetdefaultHeaders {
  /** The error code */
  "x-ms-error-code"?: string;
}

/** Gets a metadata policy */
export interface MetadataPolicyGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
  headers: RawHttpHeaders & MetadataPolicyGetdefaultHeaders;
}
