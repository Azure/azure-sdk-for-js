// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ManagedPrivateEndpoint,
  ManagedPrivateEndpointListResponse
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";

/** Get Managed Private Endpoints */
export interface Get200Response extends HttpResponse {
  status: "200";
  body: ManagedPrivateEndpoint;
}

/** Create Managed Private Endpoints */
export interface Create200Response extends HttpResponse {
  status: "200";
  body: ManagedPrivateEndpoint;
}

/** Delete Managed Private Endpoints */
export interface Delete202Response extends HttpResponse {
  status: "202";
}

/** Delete Managed Private Endpoints */
export interface Delete204Response extends HttpResponse {
  status: "204";
}

/** List Managed Private Endpoints */
export interface List200Response extends HttpResponse {
  status: "200";
  body: ManagedPrivateEndpointListResponse;
}
