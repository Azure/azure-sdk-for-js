// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { PhoneNumberSearchRequest } from "./generated/src/models/";

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

export {
  PurchasedPhoneNumber,
  PhoneNumberAssignmentType,
  PhoneNumberCapabilities,
  PhoneNumberCapabilitiesRequest,
  PhoneNumberCapabilityType,
  PhoneNumberCost,
  PhoneNumberSearchResult,
  PhoneNumberSearchRequest,
  PhoneNumberType,
  PhoneNumberSource,
} from "./generated/src/models/";

export { SipTrunkRoute, CommunicationError } from "./generated/src/siprouting/models";

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
  health?: SipTrunkHealth;
};

export interface SipTrunkHealth {
  tls: TlsHealth;
  ping: PingHealth;
  overall: OverallHealth;
}

export interface TlsHealth {
  status: TlsStatus;
}

export interface PingHealth {
  status: PingStatus;
}

export interface OverallHealth {
  status: OverallStatus;
  reason?: InactiveStatusReason;
}

/** Possible values of the status of TLS connections between Direct Routing and the SBC */
export type TlsStatus = "unknown" | "ok" | "certExpiring" | "certExpired";

/** Possible values of the status of options message send by SBC */
export type PingStatus = "unknown" | "ok" | "expired" | "error";

/** Possible values of the overall status of SBC*/
export type OverallStatus = "unknown" | "active" | "inactive";

/** Possible values of the overall status of SBC*/
export type InactiveStatusReason = "noRecentCalls" | "noRecentPings" | "noRecentCallsAndPings";
