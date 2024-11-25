// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpResponse } from "@azure-rest/core-client";
import {
  IpAddressToLocationResultOutput,
  ErrorResponseOutput,
} from "./outputModels.js";

/**
 *
 * The `Get IP To Location` API is an HTTP `GET` request that, given an IP address, returns the ISO country code from which that IP address is located. Developers can use this information to block or alter certain content based on geographical locations where the application is being viewed from.
 */
export interface GeolocationGetLocation200Response extends HttpResponse {
  status: "200";
  body: IpAddressToLocationResultOutput;
}

/**
 *
 * The `Get IP To Location` API is an HTTP `GET` request that, given an IP address, returns the ISO country code from which that IP address is located. Developers can use this information to block or alter certain content based on geographical locations where the application is being viewed from.
 */
export interface GeolocationGetLocationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
