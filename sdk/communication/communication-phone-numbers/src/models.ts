// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-http";
import { PhoneNumberSearchRequest } from "./generated/src/models/";

export type VoidResponse = {};

/**
 * Additional options for the get phone number request.
 */
export type GetPhoneNumberOptions = OperationOptions;

/**
 * Additional options that can be passed to the list phone numbers request.
 */
export interface ListPhoneNumbersOptions extends OperationOptions {
  /**
   * An optional parameter for how many entries to skip, for pagination purposes.
   * The default value is 0.
   */
  skip?: number;

  /**
   * An optional parameter for how many entries to return, for pagination purposes.
   * The default value is 100.
   */
  top?: number;
}

/**
 * Represents a phone number search request to find phone numbers.
 * Found phone numbers are temporarily held for a following purchase.
 */
export interface SearchAvailablePhoneNumbersRequest extends PhoneNumberSearchRequest {
  /**
   * The ISO 3166-2 country code, e.g. US, representing the location of the search.
   */
  countryCode: string;
}

export {
  AcquiredPhoneNumber,
  PhoneNumberAssignmentType,
  PhoneNumberCapabilities,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberCapabilityType,
  PhoneNumberCost,
  PhoneNumberSearchResult,
  PhoneNumberSearchRequest,
  PhoneNumberType
} from "./generated/src/models/";
