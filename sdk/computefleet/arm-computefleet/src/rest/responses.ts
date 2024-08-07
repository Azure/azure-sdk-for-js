// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  OperationListResultOutput,
  ErrorResponseOutput,
  FleetOutput,
  FleetListResultOutput,
  VirtualMachineScaleSetListResultOutput,
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
export interface FleetsGet200Response extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

export interface FleetsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Fleet' update operation succeeded */
export interface FleetsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

export interface FleetsCreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Fleet' create operation succeeded */
export interface FleetsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FleetOutput;
  headers: RawHttpHeaders & FleetsCreateOrUpdate201Headers;
}

export interface FleetsCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface FleetsCreateOrUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

/** Azure operation completed successfully. */
export interface FleetsUpdate200Response extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

export interface FleetsUpdate202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource update request accepted. */
export interface FleetsUpdate202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & FleetsUpdate202Headers;
}

export interface FleetsUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface FleetsUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

export interface FleetsDelete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface FleetsDelete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & FleetsDelete202Headers;
}

/** Resource does not exist. */
export interface FleetsDelete204Response extends HttpResponse {
  status: "204";
}

export interface FleetsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface FleetsDeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface FleetsListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: FleetListResultOutput;
}

export interface FleetsListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface FleetsListBySubscription200Response extends HttpResponse {
  status: "200";
  body: FleetListResultOutput;
}

export interface FleetsListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface FleetsListVirtualMachineScaleSets200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetListResultOutput;
}

export interface FleetsListVirtualMachineScaleSetsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
