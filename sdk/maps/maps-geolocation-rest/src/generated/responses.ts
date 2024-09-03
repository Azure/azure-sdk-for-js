// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpResponse } from "@azure-rest/core-client";
import {
  IpAddressToLocationResultOutput,
  ErrorResponseOutput
} from "./outputModels";

/**
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 *
 * This service will return the ISO country code for the provided IP address. Developers can use this information  to block or alter certain content based on geographical locations where the application is being viewed from.
 */
export interface GeolocationGetLocation200Response extends HttpResponse {
  status: "200";
  body: IpAddressToLocationResultOutput;
}

/**
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 *
 * This service will return the ISO country code for the provided IP address. Developers can use this information  to block or alter certain content based on geographical locations where the application is being viewed from.
 */
export interface GeolocationGetLocationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
