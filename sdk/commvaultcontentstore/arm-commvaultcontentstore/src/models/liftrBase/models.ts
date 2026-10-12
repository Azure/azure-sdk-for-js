// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** Marketplace details for an organization */
export interface MarketplaceDetails {
  /** Azure subscription id for the the marketplace offer is purchased from */
  subscriptionId?: string;
  /** Marketplace subscription status */
  readonly subscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Marketplace SaaS Resource Id */
  saasResourceId?: string;
  /** Offer details for the marketplace that is selected by the user */
  offerDetails: OfferDetails;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    subscriptionId: item["subscriptionId"],
    saasResourceId: item["saasResourceId"],
    offerDetails: offerDetailsSerializer(item["offerDetails"]),
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    subscriptionId: item["subscriptionId"],
    subscriptionStatus: item["subscriptionStatus"],
    saasResourceId: item["saasResourceId"],
    offerDetails: offerDetailsDeserializer(item["offerDetails"]),
  };
}

/** Marketplace subscription status of a resource. */
export enum KnownMarketplaceSubscriptionStatus {
  /** Purchased but not yet activated */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** Marketplace subscription is activated */
  Subscribed = "Subscribed",
  /** This state indicates that a customer's payment for the Marketplace service was not received */
  Suspended = "Suspended",
  /** Customer has cancelled the subscription */
  Unsubscribed = "Unsubscribed",
}

/**
 * Marketplace subscription status of a resource. \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Purchased but not yet activated \
 * **Subscribed**: Marketplace subscription is activated \
 * **Suspended**: This state indicates that a customer's payment for the Marketplace service was not received \
 * **Unsubscribed**: Customer has cancelled the subscription
 */
export type MarketplaceSubscriptionStatus = string;

/** Offer details for the marketplace that is selected by the user */
export interface OfferDetails {
  /** Publisher Id for the marketplace offer */
  publisherId: string;
  /** Offer Id for the marketplace offer */
  offerId: string;
  /** Plan Id for the marketplace offer */
  planId?: string;
  /** Plan Name for the marketplace offer */
  planName?: string;
  /** Plan Display Name for the marketplace offer */
  termUnit?: string;
  /** Plan Display Name for the marketplace offer */
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

/** User details for an organization */
export interface UserDetails {
  /** First name of the user */
  firstName?: string;
  /** Last name of the user */
  lastName?: string;
  /** Email address of the user */
  emailAddress?: string;
  /** User's principal name */
  upn?: string;
  /** User's phone number */
  phoneNumber?: string;
}

export function userDetailsSerializer(item: UserDetails): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
  };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    upn: item["upn"],
    phoneNumber: item["phoneNumber"],
  };
}

/** Marketplace details for an organization */
export interface MarketplaceDetailsCreateOrUpdate {
  /** Azure subscription id for the the marketplace offer is purchased from */
  subscriptionId?: string;
  /** Marketplace SaaS Resource Id */
  saasResourceId?: string;
  /** Offer details for the marketplace that is selected by the user */
  offerDetails: OfferDetails;
}

export function marketplaceDetailsCreateOrUpdateSerializer(
  item: MarketplaceDetailsCreateOrUpdate,
): any {
  return {
    subscriptionId: item["subscriptionId"],
    saasResourceId: item["saasResourceId"],
    offerDetails: offerDetailsSerializer(item["offerDetails"]),
  };
}

/** Marketplace details for an organization */
export interface MarketplaceDetailsUpdate {
  /** Azure subscription id for the the marketplace offer is purchased from */
  subscriptionId?: string;
  /** Marketplace SaaS Resource Id */
  saasResourceId?: string;
  /** Offer details for the marketplace that is selected by the user */
  offerDetails: OfferDetails;
}

export function marketplaceDetailsUpdateSerializer(item: MarketplaceDetailsUpdate): any {
  return {
    subscriptionId: item["subscriptionId"],
    saasResourceId: item["saasResourceId"],
    offerDetails: offerDetailsSerializer(item["offerDetails"]),
  };
}
