// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** This object is returned from a successful Timezone By ID call or By Coordinates call */
export interface TimeZoneResultOutput {
  /** Version property */
  readonly Version?: string;
  /** Reference Utc Timestamp property */
  readonly ReferenceUtcTimestamp?: string;
  /** TimeZoneId array */
  readonly TimeZones?: Array<TimeZoneIdOutput>;
}

export interface TimeZoneIdOutput {
  /** Id property */
  readonly Id?: string;
  /**
   * An array of time zone ID aliases. Only returned when [options]=*zoneinfo* or *all*.
   *
   * Note: may be null.
   */
  readonly Aliases?: Array<string>;
  /** An array of country/region records. Only returned when [options]=*zoneinfo* or *all*. */
  readonly Countries?: Array<CountryRecordOutput>;
  /** Timezone names object. */
  Names?: TimeZoneNamesOutput;
  /** Details in effect at the local time. */
  readonly ReferenceTime?: ReferenceTimeOutput;
  /** Representative point property */
  readonly RepresentativePoint?: RepresentativePointOutput;
  /** Time zone DST transitions from [transitionsFrom] until timestamp + 1 year. */
  readonly TimeTransitions?: Array<TimeTransitionOutput>;
}

/** A country/region record. */
export interface CountryRecordOutput {
  /** country/region Name */
  readonly Name?: string;
  /** ISO-3166 2-letter country/region code for the country/region. */
  readonly Code?: string;
}

/** Timezone names object. */
export interface TimeZoneNamesOutput {
  /** The ISO 639-1 language code of the Names */
  readonly ISO6391LanguageCode?: string;
  /** Generic Name */
  readonly Generic?: string;
  /** Standard Name */
  readonly Standard?: string;
  /** Daylight Name */
  readonly Daylight?: string;
}

/** Details in effect at the local time. */
export interface ReferenceTimeOutput {
  /** Time zone name in effect at the reference timestamp (i.e. PST or PDT depending whether Daylight Savings Time is in effect). */
  readonly Tag?: string;
  /** UTC offset in effect at the `ReferenceUTCTimestamp`. */
  readonly StandardOffset?: string;
  /** Time saving in minutes in effect at the `ReferenceUTCTimestamp`. */
  readonly DaylightSavings?: string;
  /** Current wall time at the given time zone as shown in the `Tag` property. */
  readonly WallTime?: string;
  /** The year this POSIX string is valid for. Note: A POSIX string will only be valid in the given year. */
  readonly PosixTzValidYear?: number;
  /** POSIX string used to set the time zone environment variable. */
  readonly PosixTz?: string;
  /** Sunrise at the given time zone as shown in the `Tag` property, populated only when the call is `byCoordinates`. The sunrise is described in the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Note that the Timezone API does not return sunrise and sunset times when solar day is observed in the requested region. */
  readonly Sunrise?: string;
  /** Sunset at the given time zone as shown in the `Tag` property, populated only when the call is `byCoordinates`. The sunset is described in the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format. Note that the Timezone API does not return sunrise and sunset times when solar day is observed in the requested region. */
  readonly Sunset?: string;
}

/** Representative point property */
export interface RepresentativePointOutput {
  /** Latitude property */
  readonly Latitude?: number;
  /** Longitude property */
  readonly Longitude?: number;
}

export interface TimeTransitionOutput {
  /** Tag property */
  readonly Tag?: string;
  /** StandardOffset property */
  readonly StandardOffset?: string;
  /** DaylightSavings property */
  readonly DaylightSavings?: string;
  /** Start date, start time for this transition period */
  readonly UtcStart?: string;
  /** End date, end time for this transition period */
  readonly UtcEnd?: string;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. (This also follows the OData error response format.). */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  readonly additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, unknown>;
}

export interface WindowsTimeZoneOutput {
  /** Windows Id property */
  readonly WindowsId?: string;
  /** Territory property */
  readonly Territory?: string;
  /** IanaIds array */
  IanaIds?: Array<string>;
}

export interface IanaIdOutput {
  /** Id property */
  readonly Id?: string;
  /** IsAlias property */
  readonly IsAlias?: boolean;
  /** AliasOf property */
  readonly AliasOf?: string;
  /** This attribute returns `True` if the IanaId has any country/zone associated with it. */
  readonly HasZone1970Location?: boolean;
}

/** This object is returned from a successful Timezone IANA Version call */
export interface TimeZoneIanaVersionResultOutput {
  /** Version property */
  readonly Version?: string;
}
