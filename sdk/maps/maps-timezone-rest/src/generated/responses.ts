// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpResponse } from "@azure-rest/core-client";
import {
  TimeZoneResultOutput,
  ErrorResponseOutput,
  WindowsTimeZoneOutput,
  IanaIdOutput,
  TimeZoneIanaVersionResultOutput,
} from "./outputModels.js";

/**
 *
 * The `Get Timezone By ID` API is an HTTP `GET` request that returns current, historical, and future time zone information for the specified IANA time zone ID.
 */
export interface TimeZoneGetTimeZoneByID200Response extends HttpResponse {
  status: "200";
  body: TimeZoneResultOutput;
}

/**
 *
 * The `Get Timezone By ID` API is an HTTP `GET` request that returns current, historical, and future time zone information for the specified IANA time zone ID.
 */
export interface TimeZoneGetTimeZoneByIDDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Timezone By Coordinates` API is an HTTP `GET` request that returns current, historical, and future time zone information for a specified latitude-longitude pair. In addition, the API provides sunset and sunrise times for a given location, with the exception of regions that observe solar days.
 */
export interface TimeZoneGetTimeZoneByCoordinates200Response
  extends HttpResponse {
  status: "200";
  body: TimeZoneResultOutput;
}

/**
 *
 * The `Get Timezone By Coordinates` API is an HTTP `GET` request that returns current, historical, and future time zone information for a specified latitude-longitude pair. In addition, the API provides sunset and sunrise times for a given location, with the exception of regions that observe solar days.
 */
export interface TimeZoneGetTimeZoneByCoordinatesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Windows Time Zones` API is an HTTP `GET` request that returns a full list of Windows Time Zone IDs.
 */
export interface TimeZoneGetWindowsTimezoneIds200Response extends HttpResponse {
  status: "200";
  body: Array<WindowsTimeZoneOutput>;
}

/**
 *
 * The `Get Windows Time Zones` API is an HTTP `GET` request that returns a full list of Windows Time Zone IDs.
 */
export interface TimeZoneGetWindowsTimezoneIdsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get IANA Time Zones` API is an HTTP `GET` request that returns a full list of Internet Assigned Numbers Authority (IANA) time zone IDs. Updates to the IANA service are reflected in the system within one day.
 */
export interface TimeZoneGetIanaTimezoneIds200Response extends HttpResponse {
  status: "200";
  body: Array<IanaIdOutput>;
}

/**
 *
 * The `Get IANA Time Zones` API is an HTTP `GET` request that returns a full list of Internet Assigned Numbers Authority (IANA) time zone IDs. Updates to the IANA service are reflected in the system within one day.
 */
export interface TimeZoneGetIanaTimezoneIdsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Time Zone IANA Version` API is an HTTP `GET` request that returns the current Internet Assigned Numbers Authority (IANA) version number as Metadata.
 */
export interface TimeZoneGetIanaVersion200Response extends HttpResponse {
  status: "200";
  body: TimeZoneIanaVersionResultOutput;
}

/**
 *
 * The `Get Time Zone IANA Version` API is an HTTP `GET` request that returns the current Internet Assigned Numbers Authority (IANA) version number as Metadata.
 */
export interface TimeZoneGetIanaVersionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Windows to IANA Time Zone` API is an HTTP `GET` request that returns a corresponding Internet Assigned Numbers Authority (IANA) ID, given a valid Windows Time Zone ID. Multiple IANA IDs may be returned for a single Windows ID. It is possible to narrow these results by adding an optional territory parameter.
 */
export interface TimeZoneConvertWindowsTimezoneToIana200Response
  extends HttpResponse {
  status: "200";
  body: Array<IanaIdOutput>;
}

/**
 *
 * The `Get Windows to IANA Time Zone` API is an HTTP `GET` request that returns a corresponding Internet Assigned Numbers Authority (IANA) ID, given a valid Windows Time Zone ID. Multiple IANA IDs may be returned for a single Windows ID. It is possible to narrow these results by adding an optional territory parameter.
 */
export interface TimeZoneConvertWindowsTimezoneToIanaDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
