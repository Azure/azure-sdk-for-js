// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GeolocationGetLocationParameters } from "./parameters.js";
import {
  GeolocationGetLocation200Response,
  GeolocationGetLocationDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetLocation {
  /**
   *
   * The `Get IP To Location` API is an HTTP `GET` request that, given an IP address, returns the ISO country code from which that IP address is located. Developers can use this information to block or alter certain content based on geographical locations where the application is being viewed from.
   */
  get(
    options: GeolocationGetLocationParameters,
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
