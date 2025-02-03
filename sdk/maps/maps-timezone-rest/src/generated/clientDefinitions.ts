// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TimeZoneGetTimeZoneByIDParameters,
  TimeZoneGetTimeZoneByCoordinatesParameters,
  TimeZoneGetWindowsTimezoneIdsParameters,
  TimeZoneGetIanaTimezoneIdsParameters,
  TimeZoneGetIanaVersionParameters,
  TimeZoneConvertWindowsTimezoneToIanaParameters,
} from "./parameters.js";
import {
  TimeZoneGetTimeZoneByID200Response,
  TimeZoneGetTimeZoneByIDDefaultResponse,
  TimeZoneGetTimeZoneByCoordinates200Response,
  TimeZoneGetTimeZoneByCoordinatesDefaultResponse,
  TimeZoneGetWindowsTimezoneIds200Response,
  TimeZoneGetWindowsTimezoneIdsDefaultResponse,
  TimeZoneGetIanaTimezoneIds200Response,
  TimeZoneGetIanaTimezoneIdsDefaultResponse,
  TimeZoneGetIanaVersion200Response,
  TimeZoneGetIanaVersionDefaultResponse,
  TimeZoneConvertWindowsTimezoneToIana200Response,
  TimeZoneConvertWindowsTimezoneToIanaDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetTimeZoneByID {
  /**
   *
   * The `Get Timezone By ID` API is an HTTP `GET` request that returns current, historical, and future time zone information for the specified IANA time zone ID.
   */
  get(
    options: TimeZoneGetTimeZoneByIDParameters,
  ): StreamableMethod<
    TimeZoneGetTimeZoneByID200Response | TimeZoneGetTimeZoneByIDDefaultResponse
  >;
}

export interface GetTimeZoneByCoordinates {
  /**
   *
   * The `Get Timezone By Coordinates` API is an HTTP `GET` request that returns current, historical, and future time zone information for a specified latitude-longitude pair. In addition, the API provides sunset and sunrise times for a given location, with the exception of regions that observe solar days.
   */
  get(
    options: TimeZoneGetTimeZoneByCoordinatesParameters,
  ): StreamableMethod<
    | TimeZoneGetTimeZoneByCoordinates200Response
    | TimeZoneGetTimeZoneByCoordinatesDefaultResponse
  >;
}

export interface GetWindowsTimezoneIds {
  /**
   *
   * The `Get Windows Time Zones` API is an HTTP `GET` request that returns a full list of Windows Time Zone IDs.
   */
  get(
    options?: TimeZoneGetWindowsTimezoneIdsParameters,
  ): StreamableMethod<
    | TimeZoneGetWindowsTimezoneIds200Response
    | TimeZoneGetWindowsTimezoneIdsDefaultResponse
  >;
}

export interface GetIanaTimezoneIds {
  /**
   *
   * The `Get IANA Time Zones` API is an HTTP `GET` request that returns a full list of Internet Assigned Numbers Authority (IANA) time zone IDs. Updates to the IANA service are reflected in the system within one day.
   */
  get(
    options?: TimeZoneGetIanaTimezoneIdsParameters,
  ): StreamableMethod<
    | TimeZoneGetIanaTimezoneIds200Response
    | TimeZoneGetIanaTimezoneIdsDefaultResponse
  >;
}

export interface GetIanaVersion {
  /**
   *
   * The `Get Time Zone IANA Version` API is an HTTP `GET` request that returns the current Internet Assigned Numbers Authority (IANA) version number as Metadata.
   */
  get(
    options?: TimeZoneGetIanaVersionParameters,
  ): StreamableMethod<
    TimeZoneGetIanaVersion200Response | TimeZoneGetIanaVersionDefaultResponse
  >;
}

export interface ConvertWindowsTimezoneToIana {
  /**
   *
   * The `Get Windows to IANA Time Zone` API is an HTTP `GET` request that returns a corresponding Internet Assigned Numbers Authority (IANA) ID, given a valid Windows Time Zone ID. Multiple IANA IDs may be returned for a single Windows ID. It is possible to narrow these results by adding an optional territory parameter.
   */
  get(
    options: TimeZoneConvertWindowsTimezoneToIanaParameters,
  ): StreamableMethod<
    | TimeZoneConvertWindowsTimezoneToIana200Response
    | TimeZoneConvertWindowsTimezoneToIanaDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/timezone/byId/\{format\}' has methods for the following verbs: get */
  (path: "/timezone/byId/{format}", format: "json"): GetTimeZoneByID;
  /** Resource for '/timezone/byCoordinates/\{format\}' has methods for the following verbs: get */
  (
    path: "/timezone/byCoordinates/{format}",
    format: "json",
  ): GetTimeZoneByCoordinates;
  /** Resource for '/timezone/enumWindows/\{format\}' has methods for the following verbs: get */
  (
    path: "/timezone/enumWindows/{format}",
    format: "json",
  ): GetWindowsTimezoneIds;
  /** Resource for '/timezone/enumIana/\{format\}' has methods for the following verbs: get */
  (path: "/timezone/enumIana/{format}", format: "json"): GetIanaTimezoneIds;
  /** Resource for '/timezone/ianaVersion/\{format\}' has methods for the following verbs: get */
  (path: "/timezone/ianaVersion/{format}", format: "json"): GetIanaVersion;
  /** Resource for '/timezone/windowsToIana/\{format\}' has methods for the following verbs: get */
  (
    path: "/timezone/windowsToIana/{format}",
    format: "json",
  ): ConvertWindowsTimezoneToIana;
}

export type MapsTimeZoneClient = Client & {
  path: Routes;
};
