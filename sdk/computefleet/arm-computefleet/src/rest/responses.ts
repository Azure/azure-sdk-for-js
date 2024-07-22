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
export interface List200Response extends HttpResponse {
  status: "200";
  body: OperationListResultOutput;
}

export interface ListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface Get200Response extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

export interface GetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Resource 'Fleet' update operation succeeded */
export interface CreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

export interface CreateOrUpdate201Headers {
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource 'Fleet' create operation succeeded */
export interface CreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FleetOutput;
  headers: RawHttpHeaders & CreateOrUpdate201Headers;
}

export interface CreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running createOrUpdate operation */
export interface CreateOrUpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

/** Azure operation completed successfully. */
export interface Update200Response extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

export interface Update202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource update request accepted. */
export interface Update202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & Update202Headers;
}

export interface UpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running update operation */
export interface UpdateLogicalResponse extends HttpResponse {
  status: "200";
  body: FleetOutput;
}

export interface Delete202Headers {
  /** The Location header contains the URL where the status of the long running operation can be checked. */
  location?: string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
}

/** Resource deletion accepted. */
export interface Delete202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & Delete202Headers;
}

/** Resource does not exist. */
export interface Delete204Response extends HttpResponse {
  status: "204";
}

export interface DeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** The final response for long-running delete operation */
export interface DeleteLogicalResponse extends HttpResponse {
  status: "200";
}

/** Azure operation completed successfully. */
export interface ListByResourceGroup200Response extends HttpResponse {
  status: "200";
  body: FleetListResultOutput;
}

export interface ListByResourceGroupDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ListBySubscription200Response extends HttpResponse {
  status: "200";
  body: FleetListResultOutput;
}

export interface ListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ListVirtualMachineScaleSets200Response extends HttpResponse {
  status: "200";
  body: VirtualMachineScaleSetListResultOutput;
}

export interface ListVirtualMachineScaleSetsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
