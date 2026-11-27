// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** Marketplace details */
export interface MarketplaceDetails {
  /** Marketplace subscription ID */
  readonly subscriptionId?: string;
  /** Marketplace subscription status */
  subscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Offer details of the marketplace subscription */
  offerDetails?: OfferDetails;
  /** ARM ID of the Marketplace SaaS resource. Only used in Create operations. */
  saaSResourceId?: string;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    subscriptionStatus: item["subscriptionStatus"],
    offerDetails: !item["offerDetails"]
      ? item["offerDetails"]
      : offerDetailsSerializer(item["offerDetails"]),
    saaSResourceId: item["saaSResourceId"],
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    subscriptionId: item["subscriptionId"],
    subscriptionStatus: item["subscriptionStatus"],
    offerDetails: !item["offerDetails"]
      ? item["offerDetails"]
      : offerDetailsDeserializer(item["offerDetails"]),
    saaSResourceId: item["saaSResourceId"],
  };
}

/** Marketplace subscription status */
export enum KnownMarketplaceSubscriptionStatus {
  /** Marketplace subscription purchased but not yet activated */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** Marketplace subscription activated */
  Subscribed = "Subscribed",
  /** Marketplace subscription suspended due to missing customer payment */
  Suspended = "Suspended",
  /** Marketplace subscription cancelled */
  Unsubscribed = "Unsubscribed",
}

/**
 * Marketplace subscription status \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Marketplace subscription purchased but not yet activated \
 * **Subscribed**: Marketplace subscription activated \
 * **Suspended**: Marketplace subscription suspended due to missing customer payment \
 * **Unsubscribed**: Marketplace subscription cancelled
 */
export type MarketplaceSubscriptionStatus = string;

/** Offer details for the marketplace that is selected by the user */
export interface OfferDetails {
  /** Publisher ID for the marketplace offer */
  publisherId: string;
  /** Offer ID for the marketplace offer */
  offerId: string;
  /** Plan ID for the marketplace offer */
  planId: string;
  /** Plan Name for the marketplace offer */
  planName?: string;
  /** Term Unit for the marketplace offer */
  termUnit?: string;
  /** Term ID for the marketplace offer */
  termId?: string;
}

export function offerDetailsSerializer(item: OfferDetails): any {
  return {
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
  };
}

export function offerDetailsDeserializer(item: any): OfferDetails {
  return {
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    planId: item["planId"],
    planName: item["planName"],
    termUnit: item["termUnit"],
    termId: item["termId"],
  };
}

/** User details */
export interface UserDetails {
  /** First name */
  firstName: string;
  /** Last name */
  lastName: string;
  /** Email address */
  emailAddress: string;
  /** Principal name */
  upn?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Company details */
  companyDetails?: CompanyDetails;
}

export function userDetailsSerializer(item: UserDetails): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsSerializer(item["companyDetails"]),
  };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
    companyDetails: !item["companyDetails"]
      ? item["companyDetails"]
      : companyDetailsDeserializer(item["companyDetails"]),
  };
}

/** Company details */
export interface CompanyDetails {
  /** Company name */
  companyName: string;
  /** Company address */
  address?: Address;
}

export function companyDetailsSerializer(item: CompanyDetails): any {
  return {
    companyName: item["companyName"],
    address: !item["address"] ? item["address"] : addressSerializer(item["address"]),
  };
}

export function companyDetailsDeserializer(item: any): CompanyDetails {
  return {
    companyName: item["companyName"],
    address: !item["address"] ? item["address"] : addressDeserializer(item["address"]),
  };
}

/** Address details */
export interface Address {
  /** Address line 1 */
  addressLine1: string;
  /** Address line 2 */
  addressLine2?: string;
  /** Name of the city */
  city: string;
  /** State (if any) */
  state: string;
  /** Name of the country */
  country: string;
  /** Postal code */
  postalCode: string;
}

export function addressSerializer(item: Address): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    city: item["city"],
    state: item["state"],
    country: item["country"],
    postalCode: item["postalCode"],
  };
}

export function addressDeserializer(item: any): Address {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    city: item["city"],
    state: item["state"],
    country: item["country"],
    postalCode: item["postalCode"],
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Deletion in progress */
  Deleting = "Deleting",
  /** Change accepted for processing */
  Accepted = "Accepted",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Deleting**: Deletion in progress \
 * **Accepted**: Change accepted for processing
 */
export type ProvisioningState = string;
