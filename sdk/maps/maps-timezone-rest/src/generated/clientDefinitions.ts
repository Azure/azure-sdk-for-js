// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TimezoneGetTimezoneByIDParameters,
  TimezoneGetTimezoneByCoordinatesParameters,
  TimezoneGetWindowsTimezoneIdsParameters,
  TimezoneGetIanaTimezoneIdsParameters,
  TimezoneGetIanaVersionParameters,
  TimezoneConvertWindowsTimezoneToIanaParameters
} from "./parameters";
import {
  TimezoneGetTimezoneByID200Response,
  TimezoneGetTimezoneByIDDefaultResponse,
  TimezoneGetTimezoneByCoordinates200Response,
  TimezoneGetTimezoneByCoordinatesDefaultResponse,
  TimezoneGetWindowsTimezoneIds200Response,
  TimezoneGetWindowsTimezoneIdsDefaultResponse,
  TimezoneGetIanaTimezoneIds200Response,
  TimezoneGetIanaTimezoneIdsDefaultResponse,
  TimezoneGetIanaVersion200Response,
  TimezoneGetIanaVersionDefaultResponse,
  TimezoneConvertWindowsTimezoneToIana200Response,
  TimezoneConvertWindowsTimezoneToIanaDefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetTimezoneByID {
  /**
   *
   * The `Get Timezone By ID` API is an HTTP `GET` request that returns current, historical, and future time zone information for the specified IANA time zone ID.
   */
  get(
    options: TimezoneGetTimezoneByIDParameters
  ): StreamableMethod<
    TimezoneGetTimezoneByID200Response | TimezoneGetTimezoneByIDDefaultResponse
  >;
}

export interface GetTimezoneByCoordinates {
  /**
   *
   * The `Get Timezone By Coordinates` API is an HTTP `GET` request that returns current, historical, and future time zone information for a specified latitude-longitude pair. In addition, the API provides sunset and sunrise times for a given location.
   */
  get(
    options: TimezoneGetTimezoneByCoordinatesParameters
  ): StreamableMethod<
    | TimezoneGetTimezoneByCoordinates200Response
    | TimezoneGetTimezoneByCoordinatesDefaultResponse
  >;
}

export interface GetWindowsTimezoneIds {
  /**
   *
   * The `Get Windows Time Zones` API is an HTTP `GET` request that returns a full list of Windows Time Zone IDs.
   */
  get(
    options?: TimezoneGetWindowsTimezoneIdsParameters
  ): StreamableMethod<
    | TimezoneGetWindowsTimezoneIds200Response
    | TimezoneGetWindowsTimezoneIdsDefaultResponse
  >;
}

export interface GetIanaTimezoneIds {
  /**
   *
   * The `Get IANA Time Zones` API is an HTTP `GET` request that returns a full list of Internet Assigned Numbers Authority (IANA) time zone IDs. Updates to the IANA service are reflected in the system within one day.
   */
  get(
    options?: TimezoneGetIanaTimezoneIdsParameters
  ): StreamableMethod<
    | TimezoneGetIanaTimezoneIds200Response
    | TimezoneGetIanaTimezoneIdsDefaultResponse
  >;
}

export interface GetIanaVersion {
  /**
   *
   * The `Get Time Zone IANA Version` API is an HTTP `GET` request that returns the current Internet Assigned Numbers Authority (IANA) version number as Metadata.
   */
  get(
    options?: TimezoneGetIanaVersionParameters
  ): StreamableMethod<
    TimezoneGetIanaVersion200Response | TimezoneGetIanaVersionDefaultResponse
  >;
}

export interface ConvertWindowsTimezoneToIana {
  /**
   *
   * The `Get Windows to IANA Time Zone` API is an HTTP `GET` request that returns a corresponding Internet Assigned Numbers Authority (IANA) ID, given a valid Windows Time Zone ID. Multiple IANA IDs may be returned for a single Windows ID. It is possible to narrow these results by adding an optional territory parameter.
   */
  get(
    options: TimezoneConvertWindowsTimezoneToIanaParameters
  ): StreamableMethod<
    | TimezoneConvertWindowsTimezoneToIana200Response
    | TimezoneConvertWindowsTimezoneToIanaDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/timezone/byId/\{format\}' has methods for the following verbs: get */
  (path: "/timezone/byId/{format}", format: "json"): GetTimezoneByID;
  /** Resource for '/timezone/byCoordinates/\{format\}' has methods for the following verbs: get */
  (
    path: "/timezone/byCoordinates/{format}",
    format: "json"
  ): GetTimezoneByCoordinates;
  /** Resource for '/timezone/enumWindows/\{format\}' has methods for the following verbs: get */
  (
    path: "/timezone/enumWindows/{format}",
    format: "json"
  ): GetWindowsTimezoneIds;
  /** Resource for '/timezone/enumIana/\{format\}' has methods for the following verbs: get */
  (path: "/timezone/enumIana/{format}", format: "json"): GetIanaTimezoneIds;
  /** Resource for '/timezone/ianaVersion/\{format\}' has methods for the following verbs: get */
  (path: "/timezone/ianaVersion/{format}", format: "json"): GetIanaVersion;
  /** Resource for '/timezone/windowsToIana/\{format\}' has methods for the following verbs: get */
  (
    path: "/timezone/windowsToIana/{format}",
    format: "json"
  ): ConvertWindowsTimezoneToIana;
}

export type MapsTimezoneClient = Client & {
  path: Routes;
};
