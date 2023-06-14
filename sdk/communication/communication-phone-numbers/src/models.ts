// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  PhoneNumberAssignmentType,
  PhoneNumberSearchRequest,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumberType,
} from "./generated/src/models/";
import { SipTrunkHealth, SipTrunkRoute } from "./generated/src/siprouting/models";

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
 * Additional options that can be passed to list SIP routes.
 */
export interface ListSipRoutesOptions extends OperationOptions {}

/**
 * Additional options that can be passed to list SIP trunks.
 */
export interface ListSipTrunksOptions extends GetSipTrunkOptions {}

/**
 * Additional options that can be passed to list SIP trunks.
 */
export interface ListSipDomainsOptions extends OperationOptions {}

/**
 * Additional options that can be passed to get SIP trunk.
 */
export interface GetSipTrunkOptions extends OperationOptions {
  /**
   * Sets the optional parameter to retrieve SBC properties.
   */
  includeHealth?: boolean;
}

/**
 * Additional options that can be passed to the available offerings request.
 */
export interface ListOfferingsOptions extends OperationOptions {
  phoneNumberType?: PhoneNumberType;
  assignmentType?: PhoneNumberAssignmentType;
}

export {
  PhoneNumberAdministrativeDivision,
  PhoneNumberAssignmentType,
  PhoneNumberAreaCode,
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
  PhoneNumberType,
  PurchasedPhoneNumber,
} from "./generated/src/models/";

export {
  SipRoutingError,
  SipTrunkRoute,
  TlsStatus,
  PingStatus,
  ActivityStatus,
  InactiveReason,
  SipTrunkHealth,
  SipTrunkTls,
  SipTrunkPing,
  SipTrunkActivity,
} from "./generated/src/siprouting/models";

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
  /**
   * Gets or sets enabled property of the trunk.
   */
  enabled?: boolean;
  /**
   * Represents health state of a SIP trunk for routing calls.
   */
  readonly health?: SipTrunkHealth;
}

/**
 * Represents a SIP domain for routing calls. See RFC 4904.
 */
export interface SipDomain {
  /**
   * Gets or sets domain uri.
   */
  domainName: string;
  /**
   * Gets or sets enabled flag
   */
  enabled: boolean;
}

export interface SipRoutingTestRoutesWithNumberOptionalParams extends OperationOptions {
  /**
   * Validated Domains.
   * Map key is domain.
   */
  domains?: { [propertyName: string]: SipDomain };
  /**
   * SIP trunks for routing calls.
   * Map key is trunk's FQDN (1-249 characters).
   */
  trunks?: { [propertyName: string]: SipTrunk };
  /** Trunk routes for routing calls. */
  routes?: SipTrunkRoute[];
}
