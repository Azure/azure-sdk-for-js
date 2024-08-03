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
export interface OperationsList200Response extends HttpResponse {
  status: "200";
  body: OperationListResultOutput;
}

export interface OperationsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ExtendedZonesGet200Response extends HttpResponse {
  status: "200";
  body: ExtendedZoneOutput;
}

export interface ExtendedZonesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ExtendedZonesListBySubscription200Response extends HttpResponse {
  status: "200";
  body: ExtendedZoneListResultOutput;
}

export interface ExtendedZonesListBySubscriptionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ExtendedZonesRegister200Response extends HttpResponse {
  status: "200";
  body: ExtendedZoneOutput;
}

export interface ExtendedZonesRegisterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Azure operation completed successfully. */
export interface ExtendedZonesUnregister200Response extends HttpResponse {
  status: "200";
  body: ExtendedZoneOutput;
}

export interface ExtendedZonesUnregisterDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
