// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  OperationListResultOutput,
  ErrorResponseOutput,
  DeidServiceOutput,
  DeidServiceListResultOutput,
  PrivateEndpointConnectionResourceOutput,
  PrivateEndpointConnectionResourceListResultOutput,
  PrivateLinkResourceListResultOutput,
} from "./outputModels.js";

/** Azure operation completed successfully. */
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: OperationListResultOutput;
}

export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DeidServicesGet200Response extends HttpResponse {
  status: "200";
  body: DeidServiceOutput;
}

export interface DeidServicesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DeidServicesListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: DeidServiceListResultOutput;
}

export interface DeidServicesListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface DeidServicesListBySubscription200Response extends HttpResponse {
  status: "200";
  body: DeidServiceListResultOutput;
}

export interface DeidServicesListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'DeidService' update operation succeeded */
export interface DeidServicesCreate200Response extends HttpResponse {
  status: "200";
  body: DeidServiceOutput;
}

export interface DeidServicesCreate201Headers {
  /** A link to the status monitor */
  "azure-asyncoperation"?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'DeidService' create operation succeeded */
export interface DeidServicesCreate201Response extends HttpResponse {
  status: "201";
  body: DeidServiceOutput;
  headers: RawHttpHeaders & DeidServicesCreate201Headers;
}

export interface DeidServicesCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running create operation */
export interface DeidServicesCreateLogicalResponse extends HttpResponse {
  status: "200";
  body: DeidServiceOutput;
}

/** Azure operation completed successfully. */
export interface DeidServicesUpdate200Response extends HttpResponse {
  status: "200";
  body: DeidServiceOutput;
}

export interface DeidServicesUpdate202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource update request accepted. */
export interface DeidServicesUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeidServicesUpdate202Headers;
}

export interface DeidServicesUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface DeidServicesUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: DeidServiceOutput;
}

export interface DeidServicesDelete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface DeidServicesDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DeidServicesDelete202Headers;
}

/** Resource does not exist. */
export interface DeidServicesDelete204Response extends HttpResponse {
  status: "204";
}

export interface DeidServicesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface DeidServicesDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface PrivateEndpointConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionResourceOutput;
}

export interface PrivateEndpointConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'PrivateEndpointConnectionResource' update operation succeeded */
export interface PrivateEndpointConnectionsCreate200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionResourceOutput;
}

export interface PrivateEndpointConnectionsCreate201Headers {
  /** A link to the status monitor */
  "azure-asyncoperation"?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'PrivateEndpointConnectionResource' create operation succeeded */
export interface PrivateEndpointConnectionsCreate201Response extends HttpResponse {
  status: "201";
  body: PrivateEndpointConnectionResourceOutput;
  headers: RawHttpHeaders & PrivateEndpointConnectionsCreate201Headers;
}

export interface PrivateEndpointConnectionsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running create operation */
export interface PrivateEndpointConnectionsCreateLogicalResponse extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionResourceOutput;
}

export interface PrivateEndpointConnectionsDelete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface PrivateEndpointConnectionsDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & PrivateEndpointConnectionsDelete202Headers;
}

/** Resource does not exist. */
export interface PrivateEndpointConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

export interface PrivateEndpointConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface PrivateEndpointConnectionsDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface PrivateEndpointConnectionsListByDeidService200Response extends HttpResponse {
  status: "200";
  body: PrivateEndpointConnectionResourceListResultOutput;
}

export interface PrivateEndpointConnectionsListByDeidServiceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface PrivateLinksListByDeidService200Response extends HttpResponse {
  status: "200";
  body: PrivateLinkResourceListResultOutput;
}

export interface PrivateLinksListByDeidServiceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
