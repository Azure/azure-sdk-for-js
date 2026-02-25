// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type * as coreClient from "@azure/core-client";
import type {
  AvailablePhoneNumber,
  PhoneNumberAssignmentType,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberSearchRequest,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumbersPurchaseReservationHeaders,
  PhoneNumberType,
} from "./generated/src/models/index.js";

/**
 * The result of the phone numbers purchase operation.
 */
export interface PurchasePhoneNumbersResult {}

/**
 * The result of the phone number release operation.
 */
export interface ReleasePhoneNumberResult {}

/**
 * Additional options for the get phone number request.
 */
export type GetPurchasedPhoneNumberOptions = OperationOptions;

/**
 * Additional options that can be passed to the list phone numbers request.
 */
export interface ListPurchasedPhoneNumbersOptions extends OperationOptions {}

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

/**
 * Represents mandatory fields for a phone number browse request.
 */
export interface BrowseAvailableNumbersRequest {
  /** Represents the number type of the offering. */
  phoneNumberType: PhoneNumberType;
  /** The ISO 3166-2 country code, e.g. US, representing the location of the search. */
  countryCode: string;
}

/**
 * Additional options that can be passed to the available countries request.
 */
export interface ListAvailableCountriesOptions extends OperationOptions {}

/**
 * Additional options that can be passed to the Toll-Free area codes request.
 */
export interface ListTollFreeAreaCodesOptions extends Omit<
  PhoneNumbersListAreaCodesOptionalParams,
  "assignmentType" | "locality" | "administrativeDivision"
> {}

/**
 * Additional options that can be passed to the Geographic area codes request.
 */
export interface ListGeographicAreaCodesOptions extends PhoneNumbersListAreaCodesOptionalParams {}

/**
 * Additional options that can be passed to the Mobile area codes request.
 */
export interface ListMobileAreaCodesOptions extends Omit<
  PhoneNumbersListAreaCodesOptionalParams,
  "locality" | "administrativeDivision"
> {}

/**
 * Additional options that can be passed to the available localities request.
 */
export interface ListLocalitiesOptions extends OperationOptions {
  administrativeDivision?: string;
  phoneNumberType?: PhoneNumberType;
}

/**
 * Additional options for the search operator information request.
 */
export interface SearchOperatorInformationOptions extends OperationOptions {
  includeAdditionalOperatorDetails?: boolean;
}

/**
 * Additional options that can be passed to list SIP routes.
 */
export interface ListSipRoutesOptions extends OperationOptions {}

/**
 * Additional options that can be passed to list SIP trunks.
 */
export interface ListSipTrunksOptions extends OperationOptions {}

/**
 * Additional options that can be passed to the available offerings request.
 */
export interface ListOfferingsOptions extends OperationOptions {
  phoneNumberType?: PhoneNumberType;
  assignmentType?: PhoneNumberAssignmentType;
}

/**
 * Required fields for create or update a phone numbers reservation.
 */
export interface CreateOrUpdateReservationRequest extends OperationOptions {
  /**
   * The id of the reservation.
   */
  reservationId: string;
}

/**
 * Additional options for updating a phone numbers reservation.
 */
export interface CreateOrUpdateReservationOptions extends OperationOptions {
  /**
   * The phone numbers to be added or updated in the reservation.
   */
  add?: AvailablePhoneNumber[];

  /**
   * The phone number ids to be removed from the reservation.
   */
  remove?: string[];
}

/**
 * Additional options for deleting a phone numbers reservation.
 */
export interface DeleteReservationOptions extends OperationOptions {}

/**
 * Additional options for getting a phone numbers reservation.
 */
export interface GetReservationOptions extends OperationOptions {}

/**
 * Additional options for listing all phone numbers reservations.
 */
export interface ListReservationOptions extends OperationOptions {}

/**
 * Additional options for browse available phone numbers request.
 */
export interface BrowseAvailableNumbersOptions extends coreClient.OperationOptions {
  /** The minimum desired capabilities for the browse operation request. */
  capabilities?: PhoneNumberCapabilitiesRequest;
  /** Represents the assignment type of the offering. Also known as the use case. */
  assignmentType?: PhoneNumberAssignmentType;
  /** The phone number prefix to match. If specified, the search will be limited to phone numbers that start with the any of the given prefixes. */
  phoneNumberPrefixes?: string[];
}

/**
 * The result of the purchase reservation operation.
 */
export type PurchaseReservationResult = PhoneNumbersPurchaseReservationHeaders;

export {
  AvailablePhoneNumber,
  CommunicationError,
  PhoneNumberAdministrativeDivision,
  PhoneNumberAssignmentType,
  PhoneNumberAreaCode,
  PhoneNumberAvailabilityStatus,
  PhoneNumbersBrowseResult,
  PhoneNumberCapabilities,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberCapabilityType,
  PhoneNumberCost,
  PhoneNumberCountry,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumberLocality,
  PhoneNumberOffering,
  PhoneNumberSearchRequest,
  PhoneNumberSearchResult,
  PhoneNumberSearchResultError,
  PhoneNumbersPurchaseReservationHeaders,
  PhoneNumbersPurchaseReservationResponse,
  PhoneNumbersReservation,
  PhoneNumberType,
  PurchasedPhoneNumber,
  OperatorDetails,
  OperatorInformation,
  OperatorInformationOptions,
  OperatorInformationResult,
  OperatorNumberType,
  ReservationStatus,
} from "./generated/src/models/index.js";

export { SipRoutingError, SipTrunkRoute } from "./generated/src/siprouting/models/index.js";

/**
 * Represents a SIP trunk for routing calls. See RFC 4904.
 */
export interface SipTrunk {
  /**
   * Gets or sets FQDN of the trunk.
   */
  fqdn: string;
  /**
   * Gets or sets SIP signaling port of the trunk.
   */
  sipSignalingPort: number;
}
