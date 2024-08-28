// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RequestParameters } from "@azure-rest/core-client";

export interface GeolocationGetLocationQueryParamProperties {
  /** The IP address. Both IPv4 and IPv6 are allowed. */
  ip: string;
}

export interface GeolocationGetLocationQueryParam {
  queryParameters: GeolocationGetLocationQueryParamProperties;
}

export type GeolocationGetLocationParameters = GeolocationGetLocationQueryParam &
  RequestParameters;
