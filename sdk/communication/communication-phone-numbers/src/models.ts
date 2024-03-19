// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  PhoneNumberAssignmentType,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumberType,
  PhoneNumberCapabilityType,
  PhoneNumberCost,
} from "./generated/src/models/";

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
export interface SearchOperatorInformationOptions extends OperationOptions {}

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
 * Capabilities model with optional tenDlcBrief.
 */
export interface PhoneNumberCapabilities {
  /** Capability value for calling. */
  calling: PhoneNumberCapabilityType;
  /** Capability value for SMS. */
  sms: PhoneNumberCapabilityType;
  /** Ten DLC campaign brief id attached to the number */
  tenDLCCampaignBriefId?: string;
}

/** Represents a purchased phone number. */
export interface PurchasedPhoneNumber {
  /** The id of the phone number, e.g. 11234567890. */
  id: string;
  /** String of the E.164 format of the phone number, e.g. +11234567890. */
  phoneNumber: string;
  /** The ISO 3166-2 code of the phone number's country, e.g. US. */
  countryCode: string;
  /** The phone number's type, e.g. geographic, tollFree. */
  phoneNumberType: PhoneNumberType;
  /** Capabilities of a phone number. */
  capabilities: PhoneNumberCapabilities;
  /** The assignment type of the phone number. A phone number can be assigned to a person, or to an application. */
  assignmentType: PhoneNumberAssignmentType;
  /** The date and time that the phone number was purchased. */
  purchaseDate: Date;
  /** The incurred cost for a single phone number. */
  cost: PhoneNumberCost;
  /** Id of the operator that provided the number */
  operatorId?: string;
  /** Name of the operator that provided the number */
  operatorName?: string;
}

/** Represents a phone number capability offering */
export interface PhoneNumberOffering {
  /** Represents the number type of the offering. */
  phoneNumberType?: PhoneNumberType;
  /** Represents the assignment type of the offering. */
  assignmentType?: PhoneNumberAssignmentType;
  /** Capabilities of a phone number. */
  availableCapabilities?: PhoneNumberCapabilities;
  /** The incurred cost for a single phone number. */
  cost: PhoneNumberCost;
}

/** Represents a phone number search request to find phone numbers. Found phone numbers are temporarily held for a following purchase. */
export interface PhoneNumberSearchRequest {
  /** The type of phone numbers to search for, e.g. geographic, or tollFree. */
  phoneNumberType: PhoneNumberType;
  /** The assignment type of the phone numbers to search for. A phone number can be assigned to a person, or to an application. */
  assignmentType: PhoneNumberAssignmentType;
  /** Capabilities of a phone number. */
  capabilities: PhoneNumberCapabilities;
  /** The area code of the desired phone number, e.g. 425. */
  areaCode?: string;
  /** The quantity of desired phone numbers. The default value is 1. */
  quantity?: number;
}

/** The result of a phone number search operation. */
export interface PhoneNumberSearchResult {
  /** The search id. */
  searchId: string;
  /** The phone numbers that are available. Can be fewer than the desired search quantity. */
  phoneNumbers: string[];
  /** The phone number's type, e.g. geographic, or tollFree. */
  phoneNumberType: PhoneNumberType;
  /** Phone number's assignment type. */
  assignmentType: PhoneNumberAssignmentType;
  /** Capabilities of a phone number. */
  capabilities: PhoneNumberCapabilities;
  /** The incurred cost for a single phone number. */
  cost: PhoneNumberCost;
  /** The date that this search result expires and phone numbers are no longer on hold. A search result expires in less than 15min, e.g. 2020-11-19T16:31:49.048Z. */
  searchExpiresBy: Date;
}

export {
  PhoneNumberAdministrativeDivision,
  PhoneNumberAssignmentType,
  PhoneNumberAreaCode,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberCapabilityType,
  PhoneNumberCost,
  PhoneNumberCountry,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumberLocality,
  PhoneNumberType,
  OperatorDetails,
  OperatorInformation,
  OperatorInformationResult,
  OperatorNumberType,
} from "./generated/src/models/";

export { SipRoutingError, SipTrunkRoute } from "./generated/src/siprouting/models";

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
