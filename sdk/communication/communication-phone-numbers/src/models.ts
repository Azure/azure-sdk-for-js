// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type {
  PhoneNumberAssignmentType,
  PhoneNumberSearchRequest,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumberType,
} from "./generated/src/models/index.js";
import type {
  TlsHealth,
  PingHealth,
  IpAddressVersion,
  PrivacyHeader,
  HealthStatusReason,
} from "./generated/src/siprouting/models/index.js";

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
export interface SearchOperatorInformationOptions extends OperationOptions {
  includeAdditionalOperatorDetails?: boolean;
}

/**
 * Additional options that can be passed to list SIP routes.
 */
export interface ListSipRoutesOptions extends OperationOptions {}

/**
 * Additional options that can be passed to list SIP domains.
 */
export interface ListSipDomainsOptions extends OperationOptions {}

/**
 * Additional options that can be passed to list SIP trunks.
 */
export interface ListSipTrunksOptions extends OperationOptions {}

/**
 * Additional options that can be passed to get SIP domains.
 */
export interface GetSipDomainsOptions extends OperationOptions {}

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
  OperatorDetails,
  OperatorInformation,
  OperatorInformationOptions,
  OperatorInformationResult,
  OperatorNumberType,
} from "./generated/src/models/index.js";

export {
  SipRoutingError,
  SipTrunkRoute,
  TlsHealth,
  PingHealth,
  TlsStatus,
  PingStatus,
  HealthStatusReason,
  PrivacyHeader,
  IpAddressVersion,
} from "./generated/src/siprouting/models/index.js";

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
   * Enabled flag
   */
  enabled?: boolean;
  /**
   * Represents health state of a SIP trunk for routing calls.
   */
  health?: TrunkHealth;
  /**
   * When enabled, removes Azure Communication Services from the signaling path on call transfer and sets the SIP Refer-To header to the trunk's FQDN. By default false.
   */
  directTransfer?: boolean;
  /**
   * SIP Privacy header. Default value is id.
   */
  privacyHeader?: PrivacyHeader;
  /**
   * IP address version used by the trunk. The default value is ipv4.
   */
  ipAddressVersion?: IpAddressVersion;
}

/** Represents health state of a SIP trunk for routing calls. */
export interface TrunkHealth {
  /** The status of the TLS connections of the Trunk. */
  tls: TlsHealth;
  /** The status of SIP OPTIONS message sent by Trunk. */
  ping: PingHealth;
  /** The overall health status of Trunk. */
  overall: OverallHealth;
}

/**
 * Represents a DNS domain for SIP trunk.
 */
export interface SipDomain {
  /**
   * Gets or sets FQDN of the domain.
   */
  fqdn: string;
  /**
   * Enabled flag
   */
  enabled: boolean;
}

// This assumes that _only_ inactive status has a reason and that _every_ inactive status has a reason
export type OverallHealth =
  | { status: "unknown" | "active" }
  | { status: "inactive"; reason: HealthStatusReason };
