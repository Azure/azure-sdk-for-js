// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** This object is returned from a successful Timezone By ID call or By Coordinates call */
export interface TimezoneResultOutput {
  /** Version property */
  Version?: string;
  /** Reference Utc Timestamp property */
  ReferenceUtcTimestamp?: string;
  /** TimeZoneId array */
  TimeZones?: Array<TimezoneIdOutput>;
}

export interface TimezoneIdOutput {
  /** Id property */
  Id?: string;
  /**
   * An array of time zone ID aliases. Only returned when [options]=*zoneinfo* or *all*.
   *
   * Note: may be null.
   */
  Aliases?: Array<string>;
  /** An array of country/region records. Only returned when [options]=*zoneinfo* or *all*. */
  Countries?: Array<CountryRecordOutput>;
  /** Timezone names object. */
  Names?: TimezoneNamesOutput;
  /** Details in effect at the local time. */
  ReferenceTime?: ReferenceTimeOutput;
  /** Representative point property */
  RepresentativePoint?: RepresentativePointOutput;
  /** Time zone DST transitions from [transitionsFrom] until timestamp + 1 year. */
  TimeTransitions?: Array<TimeTransitionOutput>;
}

/** A country/region record. */
export interface CountryRecordOutput {
  /** country/region Name */
  Name?: string;
  /** ISO-3166 2-letter country/region code for the country/region. */
  Code?: string;
}

/** Timezone names object. */
export interface TimezoneNamesOutput {
  /** The ISO 639-1 language code of the Names */
  ISO6391LanguageCode?: string;
  /** Generic Name */
  Generic?: string;
  /** Standard Name */
  Standard?: string;
  /** Daylight Name */
  Daylight?: string;
}

/** Details in effect at the local time. */
export interface ReferenceTimeOutput {
  /** Time zone name in effect at the reference timestamp (i.e. PST or PDT depending whether Daylight Savings Time is in effect). */
  Tag?: string;
  /** UTC offset in effect at the `ReferenceUTCTimestamp`. */
  StandardOffset?: string;
  /** Time saving in minutes in effect at the `ReferenceUTCTimestamp`. */
  DaylightSavings?: string;
  /** Current wall time at the given time zone as shown in the `Tag` property. */
  WallTime?: string;
  /** The year this POSIX string is valid for. Note: A POSIX string will only be valid in the given year. */
  PosixTzValidYear?: number;
  /** POSIX string used to set the time zone environment variable. */
  PosixTz?: string;
  /** Sunrise at the given time zone as shown in the `Tag` property. The sunrise is described in the ISO8601 format. (Only be populated if the call is byCoordinates) */
  Sunrise?: string;
  /** Sunset at the given time zone as shown in the `Tag` property. The sunset is described in the ISO8601 format.(Only be populated if the call is byCoordinates) */
  Sunset?: string;
}

/** Representative point property */
export interface RepresentativePointOutput {
  /** Latitude property */
  Latitude?: number;
  /** Longitude property */
  Longitude?: number;
}

export interface TimeTransitionOutput {
  /** Tag property */
  Tag?: string;
  /** StandardOffset property */
  StandardOffset?: string;
  /** DaylightSavings property */
  DaylightSavings?: string;
  /** Start date, start time for this transition period */
  UtcStart?: string;
  /** End date, end time for this transition period */
  UtcEnd?: string;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
  /** The error target. */
  target?: string;
  /** The error details. */
  details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  type?: string;
  /** The additional info. */
  info?: Record<string, unknown>;
}

export interface TimezoneWindowsOutput {
  /** Windows Id property */
  WindowsId?: string;
  /** Territory property */
  Territory?: string;
  /** IanaIds array */
  IanaIds?: Array<string>;
}

export interface IanaIdOutput {
  /** Id property */
  Id?: string;
  /** IsAlias property */
  IsAlias?: boolean;
  /** AliasOf property */
  AliasOf?: string;
  /** This attribute returns `True` if the IanaId has any country/zone associated with it. */
  HasZone1970Location?: boolean;
}

/** This object is returned from a successful Timezone IANA Version call */
export interface TimezoneIanaVersionResultOutput {
  /** Version property */
  Version?: string;
}
