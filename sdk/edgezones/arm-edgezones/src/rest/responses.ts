// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  OperationListResultOutput,
  ErrorResponseOutput,
  ExtendedZoneOutput,
  ExtendedZoneListResultOutput,
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
  body: ExtendedZoneOutput;
}

export interface GetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ListBySubscription200Response extends HttpResponse {
  status: "200";
  body: ExtendedZoneListResultOutput;
}

export interface ListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface Register200Response extends HttpResponse {
  status: "200";
  body: ExtendedZoneOutput;
}

export interface RegisterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface Unregister200Response extends HttpResponse {
  status: "200";
  body: ExtendedZoneOutput;
}

export interface UnregisterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
