// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GeolocationGetLocationParameters } from "./parameters";
import {
  GeolocationGetLocation200Response,
  GeolocationGetLocationDefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetLocation {
  /**
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   *
   * This service will return the ISO country code for the provided IP address. Developers can use this information  to block or alter certain content based on geographical locations where the application is being viewed from.
   */
  get(
    options: GeolocationGetLocationParameters
  ): StreamableMethod<
    GeolocationGetLocation200Response | GeolocationGetLocationDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/geolocation/ip/\{format\}' has methods for the following verbs: get */
  (path: "/geolocation/ip/{format}", format: "json"): GetLocation;
}

export type MapsGeolocationClient = Client & {
  path: Routes;
};
