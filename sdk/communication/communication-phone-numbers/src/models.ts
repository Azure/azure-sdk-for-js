// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import {
  PhoneNumberAssignmentType,
  PhoneNumberSearchRequest,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumberType,
} from "./generated/src/models/";
import {
  InactiveStatusReason,
  OverallHealthStatus,
  PingStatus,
  TlsStatus,
} from "./generated/src/siprouting/models";

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
  OverallHealthStatus,
  InactiveStatusReason,
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
}

/**
 * Represents a SIP trunk for routing calls. See RFC 4904.
 */
export type SipTrunkExpanded = SipTrunk & {
  /** Represents health state of a SIP trunk for routing calls. */
  readonly health: SipTrunkHealth;
};

/**
 * Represents health state of SIP trunk.
 */
export interface SipTrunkHealth {
  /**
   * Trunk's TLS connection status details.
   */
  tls: SipTrunkTls;
  /**
   * Trunk's Ping connection status details.
   */
  ping: SipTrunkPing;
  /**
   * Trunk's overall health.
   */
  overall: SipTrunkOverallHealth;
}

/**
 * Details about the status of TLS connection between Direct Routing infrastructure and the SBC.
 */
export interface SipTrunkTls {
  /**
   * Status of TLS connection.
   */
  status: TlsStatus;
}

/**
 * Details about the status of options message sent by SBC.
 */
export interface SipTrunkPing {
  /**
   * Status of options message sent by SBC.
   */
  status: PingStatus;
}

/**
 * Details about the status of options message sent by SBC.
 */
export interface SipTrunkOverallHealth {
  /**
   * The overall health status of SBC.
   */
  status: OverallHealthStatus;
  /**
   * The reason why overall status of SBC is inactive.
   */
  reason?: InactiveStatusReason;
}
