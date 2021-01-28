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

export type ListPhoneNumbersOptions = OperationOptions;

export {
  AcquiredPhoneNumber,
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
