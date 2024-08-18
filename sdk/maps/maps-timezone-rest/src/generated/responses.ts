// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  TimezoneResultOutput,
  ErrorResponseOutput,
  TimezoneWindowsOutput,
  IanaIdOutput,
  TimezoneIanaVersionResultOutput
} from "./outputModels";

/**
 *
 * The `Get Timezone By ID` API is an HTTP `GET` request that returns current, historical, and future time zone information for the specified IANA time zone ID.
 */
export interface TimezoneGetTimezoneByID200Response extends HttpResponse {
  status: "200";
  body: TimezoneResultOutput;
}

/**
 *
 * The `Get Timezone By ID` API is an HTTP `GET` request that returns current, historical, and future time zone information for the specified IANA time zone ID.
 */
export interface TimezoneGetTimezoneByIDDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Timezone By Coordinates` API is an HTTP `GET` request that returns current, historical, and future time zone information for a specified latitude-longitude pair. In addition, the API provides sunset and sunrise times for a given location.
 */
export interface TimezoneGetTimezoneByCoordinates200Response
  extends HttpResponse {
  status: "200";
  body: TimezoneResultOutput;
}

/**
 *
 * The `Get Timezone By Coordinates` API is an HTTP `GET` request that returns current, historical, and future time zone information for a specified latitude-longitude pair. In addition, the API provides sunset and sunrise times for a given location.
 */
export interface TimezoneGetTimezoneByCoordinatesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Windows Time Zones` API is an HTTP `GET` request that returns a full list of Windows Time Zone IDs.
 */
export interface TimezoneGetWindowsTimezoneIds200Response extends HttpResponse {
  status: "200";
  body: Array<TimezoneWindowsOutput>;
}

/**
 *
 * The `Get Windows Time Zones` API is an HTTP `GET` request that returns a full list of Windows Time Zone IDs.
 */
export interface TimezoneGetWindowsTimezoneIdsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get IANA Time Zones` API is an HTTP `GET` request that returns a full list of Internet Assigned Numbers Authority (IANA) time zone IDs. Updates to the IANA service are reflected in the system within one day.
 */
export interface TimezoneGetIanaTimezoneIds200Response extends HttpResponse {
  status: "200";
  body: Array<IanaIdOutput>;
}

/**
 *
 * The `Get IANA Time Zones` API is an HTTP `GET` request that returns a full list of Internet Assigned Numbers Authority (IANA) time zone IDs. Updates to the IANA service are reflected in the system within one day.
 */
export interface TimezoneGetIanaTimezoneIdsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Time Zone IANA Version` API is an HTTP `GET` request that returns the current Internet Assigned Numbers Authority (IANA) version number as Metadata.
 */
export interface TimezoneGetIanaVersion200Response extends HttpResponse {
  status: "200";
  body: TimezoneIanaVersionResultOutput;
}

/**
 *
 * The `Get Time Zone IANA Version` API is an HTTP `GET` request that returns the current Internet Assigned Numbers Authority (IANA) version number as Metadata.
 */
export interface TimezoneGetIanaVersionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Windows to IANA Time Zone` API is an HTTP `GET` request that returns a corresponding Internet Assigned Numbers Authority (IANA) ID, given a valid Windows Time Zone ID. Multiple IANA IDs may be returned for a single Windows ID. It is possible to narrow these results by adding an optional territory parameter.
 */
export interface TimezoneConvertWindowsTimezoneToIana200Response
  extends HttpResponse {
  status: "200";
  body: Array<IanaIdOutput>;
}

/**
 *
 * The `Get Windows to IANA Time Zone` API is an HTTP `GET` request that returns a corresponding Internet Assigned Numbers Authority (IANA) ID, given a valid Windows Time Zone ID. Multiple IANA IDs may be returned for a single Windows ID. It is possible to narrow these results by adding an optional territory parameter.
 */
export interface TimezoneConvertWindowsTimezoneToIanaDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
