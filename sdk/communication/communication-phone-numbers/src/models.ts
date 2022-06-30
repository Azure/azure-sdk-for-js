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
 * Additional options for the get phone number request.
 */
export type GetTrunksStatusOptions = OperationOptions;

/**
 * Additional options for the get phone number request.
 */
export type GetTrunkStatusOptions = OperationOptions;

/** Possible values of the status of TLS connections between Direct Routing and the SBC */
export type TrunkStatusTls = "NoData" | "OK" | "CertExpiring" | "CertExpired";

/** Possible values of the status of options message send by SBC */
export type TrunkStatusPing = "NoData" | "OK" | "PingError" | "PingExpired";

/** Possible values of the overall status of SBC*/
export type TrunkOverallStatus =
  | "NoData"
  | "Active"
  | "InactiveNoRecentPings"
  | "InactiveNoRecentPingsAndCalls"
  | "InactiveNoRecentCalls";

/** Represents a trunk's SBC status */
export interface TrunkStatus {
  /** Trunk's FQDN of the paired SBC */
  fqdn: string;
  /** The status of the TLS connections between Direct Routing and the SBC */
  tls: TrunkStatusTls;
  /** The status of options message send by SBC */
  ping: TrunkStatusPing;
  /** The overall status of SBC */
  trunkOverallStatus: TrunkOverallStatus;
  /** The last time the status has been updated */
  lastUpdateTime: Date;
}

/** SIP trunks for routing calls */
export interface TrunksStatus {
  /** Array of SIP trunks for routing calls */
  values?: TrunkStatus[];
}
