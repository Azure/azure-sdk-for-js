// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";

export interface TimezoneGetTimezoneByIDHeaders {
  /** Specifies the language code in which the timezone names should be returned. If no language code is provided, the response will be in "EN". Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details. */
  "Accept-Language"?: string;
}

export interface TimezoneGetTimezoneByIDQueryParamProperties {
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

export interface TimezoneGetTimezoneByIDQueryParam {
  queryParameters: TimezoneGetTimezoneByIDQueryParamProperties;
}

export interface TimezoneGetTimezoneByIDHeaderParam {
  headers?: RawHttpHeadersInput & TimezoneGetTimezoneByIDHeaders;
}

export type TimezoneGetTimezoneByIDParameters = TimezoneGetTimezoneByIDQueryParam &
  TimezoneGetTimezoneByIDHeaderParam &
  RequestParameters;

export interface TimezoneGetTimezoneByCoordinatesHeaders {
  /** Specifies the language code in which the timezone names should be returned. If no language code is provided, the response will be in "EN". Please refer to [Supported Languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for details. */
  "Accept-Language"?: string;
}

export interface TimezoneGetTimezoneByCoordinatesQueryParamProperties {
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

export interface TimezoneGetTimezoneByCoordinatesQueryParam {
  queryParameters: TimezoneGetTimezoneByCoordinatesQueryParamProperties;
}

export interface TimezoneGetTimezoneByCoordinatesHeaderParam {
  headers?: RawHttpHeadersInput & TimezoneGetTimezoneByCoordinatesHeaders;
}

export type TimezoneGetTimezoneByCoordinatesParameters = TimezoneGetTimezoneByCoordinatesQueryParam &
  TimezoneGetTimezoneByCoordinatesHeaderParam &
  RequestParameters;
export type TimezoneGetWindowsTimezoneIdsParameters = RequestParameters;
export type TimezoneGetIanaTimezoneIdsParameters = RequestParameters;
export type TimezoneGetIanaVersionParameters = RequestParameters;

export interface TimezoneConvertWindowsTimezoneToIanaQueryParamProperties {
  /** The Windows time zone ID. */
  query: string;
  /** Windows Time Zone territory code. */
  territory?: string;
}

export interface TimezoneConvertWindowsTimezoneToIanaQueryParam {
  queryParameters: TimezoneConvertWindowsTimezoneToIanaQueryParamProperties;
}

export type TimezoneConvertWindowsTimezoneToIanaParameters = TimezoneConvertWindowsTimezoneToIanaQueryParam &
  RequestParameters;
