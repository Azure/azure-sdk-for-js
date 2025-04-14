// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** This object is returned from a successful call to IP Address to country/region API */
export interface IpAddressToLocationResultOutput {
  /** The object containing the country/region information. */
  readonly countryRegion?: CountryRegionOutput;
  /** The IP Address of the request. */
  readonly ipAddress?: string;
}

/** The object containing the country/region information. */
export interface CountryRegionOutput {
  /** The IP Address's 2-character code [(ISO 3166-1)](https://www.iso.org/iso-3166-country-codes.html) of the country or region. Please note, IP address in ranges reserved for special purpose will return Null for country/region. */
  readonly isoCode?: string;
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
