// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse, OperationOptions } from "@azure/core-http";
import { AcquiredPhoneNumber } from "./generated/src/models/";

/**
 * Represents an object with a non-enumerable _response property which provides
 * information about the HTTP response.
 */
export type WithResponse<T> = T & { _response: HttpResponse };

/**
 * Represents a generic HTTP response
 */
export type VoidResponse = WithResponse<{}>;

export type UpdatePhoneNumberOptions = OperationOptions;

export type UpdatePhoneNumberResponse = WithResponse<AcquiredPhoneNumber>;

export type GetPhoneNumberOptions = OperationOptions;

export type GetPhoneNumberResponse = WithResponse<AcquiredPhoneNumber>;

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

export {
  AcquiredPhoneNumber,
  BillingFrequency,
  KnownBillingFrequency,
  KnownPhoneNumberAssignmentType,
  KnownPhoneNumberCapabilityValue,
  KnownPhoneNumberType,
  PhoneNumberAssignmentType,
  PhoneNumberCapabilities,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberCapabilityValue,
  PhoneNumberCost,
  PhoneNumberSearchRequest,
  PhoneNumberSearchResult,
  PhoneNumberType,
  PhoneNumberUpdateRequest
} from "./generated/src/models/";
