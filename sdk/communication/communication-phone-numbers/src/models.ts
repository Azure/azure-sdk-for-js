// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type {
  PhoneNumberAssignmentType,
  PhoneNumbersBrowseAvailableNumbersOptionalParams,
  PhoneNumbersBrowseAvailableNumbersResponse,
  PhoneNumbersBrowseRequest,
  PhoneNumbersCreateOrUpdateReservationOptionalParams,
  PhoneNumbersCreateOrUpdateReservationResponse,
  PhoneNumbersDeleteReservationOptionalParams,
  PhoneNumberSearchRequest,
  PhoneNumbersGetReservationOptionalParams,
  PhoneNumbersGetReservationResponse,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumbersListReservationsOptionalParams,
  PhoneNumbersPurchaseReservationOptionalParams,
  PhoneNumbersPurchaseReservationResponse,
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

export interface BrowseAvailableNumbersRequest extends PhoneNumbersBrowseRequest {
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
export interface ListTollFreeAreaCodesOptions
  extends Omit<
    PhoneNumbersListAreaCodesOptionalParams,
    "assignmentType" | "locality" | "administrativeDivision"
  > {}

/**
 * Additional options that can be passed to the Geographic area codes request.
 */
export interface ListGeographicAreaCodesOptions extends PhoneNumbersListAreaCodesOptionalParams {}

/**
 * Additional options that can be passed to the available localities request.
 */
export interface ListLocalitiesOptions extends OperationOptions {
  administrativeDivision?: string;
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
 * Additional options that can be passed to the begin purchase reservation request.
 */
export interface BeginReservationPurchaseOptions
  extends PhoneNumbersPurchaseReservationOptionalParams {}

/**
 * Additional options for creating or updating a phone numbers reservation.
 */
export interface CreateOrUpdateReservationOptions
  extends PhoneNumbersCreateOrUpdateReservationOptionalParams {}

/**
 * Additional options for deleting a phone numbers reservation.
 */
export interface DeleteReservationOptions extends PhoneNumbersDeleteReservationOptionalParams {}

/**
 * Additional options for getting a phone numbers reservation.
 */
export interface GetReservationOptions extends PhoneNumbersGetReservationOptionalParams {}

/**
 * Additional options for listing all phone numbers reservations.
 */
export interface ListReservationOptions extends PhoneNumbersListReservationsOptionalParams {}

/**
 * Additional options for browse available phone numbers request.
 */
export interface BrowseAvailableNumbersOptions
  extends PhoneNumbersBrowseAvailableNumbersOptionalParams {}

/**
 * The result of the phone numbers browse operation.
 */
export interface BrowseAvailableNumbersResult extends PhoneNumbersBrowseAvailableNumbersResponse {}

/**
 * The result of create or update reservation operation.
 */
export interface CreateOrUpdateReservationResult
  extends PhoneNumbersCreateOrUpdateReservationResponse {}

/**
 * The result of the purchase reservation operation.
 */
export interface PurchaseReservationResult extends PhoneNumbersPurchaseReservationResponse {}

/**
 * The result of the get reservation operation.
 */
export interface GetReservationResult extends PhoneNumbersGetReservationResponse {}

export {
  AvailablePhoneNumber,
  AvailablePhoneNumberCost,
  AvailablePhoneNumberError,
  AvailablePhoneNumberStatus,
  PhoneNumberAdministrativeDivision,
  PhoneNumberAssignmentType,
  PhoneNumberAreaCode,
  PhoneNumbersBrowseAvailableNumbersOptionalParams,
  PhoneNumbersBrowseAvailableNumbersResponse,
  PhoneNumberBrowseCapabilitiesRequest,
  PhoneNumbersBrowseRequest,
  PhoneNumbersBrowseResult,
  PhoneNumberCapabilities,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberCapabilityType,
  PhoneNumbersCreateOrUpdateReservationOptionalParams,
  PhoneNumbersCreateOrUpdateReservationResponse,
  PhoneNumberCost,
  PhoneNumberCountry,
  PhoneNumbersDeleteReservationOptionalParams,
  PhoneNumbersGetReservationOptionalParams,
  PhoneNumbersGetReservationResponse,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumbersListReservationsOptionalParams,
  PhoneNumberLocality,
  PhoneNumberOffering,
  PhoneNumberSearchRequest,
  PhoneNumberSearchResult,
  PhoneNumberSearchResultError,
  PhoneNumbersPurchaseReservationHeaders,
  PhoneNumbersPurchaseReservationOptionalParams,
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
