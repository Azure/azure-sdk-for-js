// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** MarketplaceDetails of Qumulo FileSystem resource */
export interface MarketplaceDetails {
  /** Marketplace Subscription Id */
  marketplaceSubscriptionId?: string;
  /** Plan Id */
  planId: string;
  /** Offer Id */
  offerId: string;
  /** Publisher Id */
  publisherId?: string;
  /** Term Unit */
  termUnit?: string;
  /** Marketplace subscription status */
  readonly marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    planId: item["planId"],
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    termUnit: item["termUnit"],
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    planId: item["planId"],
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    termUnit: item["termUnit"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
  };
}

/** Marketplace subscription status of the file system resource */
export enum KnownMarketplaceSubscriptionStatus {
  /** Fulfillment has not started */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** Marketplace offer is subscribed */
  Subscribed = "Subscribed",
  /** Marketplace offer is suspended because of non payment */
  Suspended = "Suspended",
  /** Marketplace offer is unsubscribed */
  Unsubscribed = "Unsubscribed",
}

/**
 * Marketplace subscription status of the file system resource \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Fulfillment has not started \
 * **Subscribed**: Marketplace offer is subscribed \
 * **Suspended**: Marketplace offer is suspended because of non payment \
 * **Unsubscribed**: Marketplace offer is unsubscribed
 */
export type MarketplaceSubscriptionStatus = string;

/** Provisioning State of the File system resource */
export enum KnownProvisioningState {
  /** File system resource creation request accepted */
  Accepted = "Accepted",
  /** File system resource creation started */
  Creating = "Creating",
  /** File system resource is being updated */
  Updating = "Updating",
  /** File system resource deletion started */
  Deleting = "Deleting",
  /** File system resource creation successful */
  Succeeded = "Succeeded",
  /** File system resource creation failed */
  Failed = "Failed",
  /** File system resource creation canceled */
  Canceled = "Canceled",
  /** File system resource is deleted */
  Deleted = "Deleted",
}

/**
 * Provisioning State of the File system resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: File system resource creation request accepted \
 * **Creating**: File system resource creation started \
 * **Updating**: File system resource is being updated \
 * **Deleting**: File system resource deletion started \
 * **Succeeded**: File system resource creation successful \
 * **Failed**: File system resource creation failed \
 * **Canceled**: File system resource creation canceled \
 * **Deleted**: File system resource is deleted
 */
export type ProvisioningState = string;

/** User Details of Qumulo FileSystem resource */
export interface UserDetails {
  /** User Email */
  email: string;
}

export function userDetailsSerializer(item: UserDetails): any {
  return { email: item["email"] };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    email: item["email"],
  };
}
