// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";

export interface TimeZoneGetTimeZoneByIDHeaders {
  /** Specifies the language code in which the timezone names should be returned. If no language code is provided, the response will be in "EN". Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details. */
  "Accept-Language"?: string;
}

export interface TimeZoneGetTimeZoneByIDQueryParamProperties {
  /** Alternatively, use alias "o". Options available for types of information returned in the result. */
  options?: "none" | "zoneInfo" | "transitions" | "all";
  /** Alternatively, use alias "stamp", or "s". Reference time, if omitted, the API will use the machine time serving the request. */
  timeStamp?: Date | string;
  /** Alternatively, use alias "tf". The start date from which daylight savings time (DST) transitions are requested, only applies when "options" = all or "options" = transitions. */
  transitionsFrom?: Date | string;
  /** Alternatively, use alias "ty". The number of years from "transitionsFrom" for which DST transitions are requested, only applies when "options" = all or "options" = transitions. */
  transitionsYears?: number;
  /** The IANA time zone ID. */
  query: string;
}

export interface TimeZoneGetTimeZoneByIDQueryParam {
  queryParameters: TimeZoneGetTimeZoneByIDQueryParamProperties;
}

export interface TimeZoneGetTimeZoneByIDHeaderParam {
  headers?: RawHttpHeadersInput & TimeZoneGetTimeZoneByIDHeaders;
}

export type TimeZoneGetTimeZoneByIDParameters =
  TimeZoneGetTimeZoneByIDQueryParam &
    TimeZoneGetTimeZoneByIDHeaderParam &
    RequestParameters;

export interface TimeZoneGetTimeZoneByCoordinatesHeaders {
  /** Specifies the language code in which the timezone names should be returned. If no language code is provided, the response will be in "EN". Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details. */
  "Accept-Language"?: string;
}

export interface TimeZoneGetTimeZoneByCoordinatesQueryParamProperties {
  /** Alternatively, use alias "o". Options available for types of information returned in the result. */
  options?: "none" | "zoneInfo" | "transitions" | "all";
  /** Alternatively, use alias "stamp", or "s". Reference time, if omitted, the API will use the machine time serving the request. */
  timeStamp?: Date | string;
  /** Alternatively, use alias "tf". The start date from which daylight savings time (DST) transitions are requested, only applies when "options" = all or "options" = transitions. */
  transitionsFrom?: Date | string;
  /** Alternatively, use alias "ty". The number of years from "transitionsFrom" for which DST transitions are requested, only applies when "options" = all or "options" = transitions. */
  transitionsYears?: number;
  /** Coordinates of the point for which time zone information is requested. This parameter is a list of coordinates, containing a pair of coordinate(lat, long). When this endpoint is called directly, coordinates are passed in as a single string containing coordinates, separated by commas. */
  query: Array<number>;
}

export interface TimeZoneGetTimeZoneByCoordinatesQueryParam {
  queryParameters: TimeZoneGetTimeZoneByCoordinatesQueryParamProperties;
}

export interface TimeZoneGetTimeZoneByCoordinatesHeaderParam {
  headers?: RawHttpHeadersInput & TimeZoneGetTimeZoneByCoordinatesHeaders;
}

export type TimeZoneGetTimeZoneByCoordinatesParameters =
  TimeZoneGetTimeZoneByCoordinatesQueryParam &
    TimeZoneGetTimeZoneByCoordinatesHeaderParam &
    RequestParameters;
export type TimeZoneGetWindowsTimezoneIdsParameters = RequestParameters;
export type TimeZoneGetIanaTimezoneIdsParameters = RequestParameters;
export type TimeZoneGetIanaVersionParameters = RequestParameters;

export interface TimeZoneConvertWindowsTimezoneToIanaQueryParamProperties {
  /** The Windows time zone ID. */
  query: string;
  /** Windows Time Zone territory code. */
  territory?: string;
}

export interface TimeZoneConvertWindowsTimezoneToIanaQueryParam {
  queryParameters: TimeZoneConvertWindowsTimezoneToIanaQueryParamProperties;
}

export type TimeZoneConvertWindowsTimezoneToIanaParameters =
  TimeZoneConvertWindowsTimezoneToIanaQueryParam & RequestParameters;
