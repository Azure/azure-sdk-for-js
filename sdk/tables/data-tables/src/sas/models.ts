// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A user delegation key.
 */
export interface UserDelegationKey {
  /**
   * The Azure Active Directory object ID in GUID format.
   */
  signedObjectId: string;
  /**
   * The Azure Active Directory tenant ID in GUID format.
   */
  signedTenantId: string;
  /**
   * The date-time the key is active.
   */
  signedStartsOn: Date;
  /**
   * The date-time the key expires.
   */
  signedExpiresOn: Date;
  /**
   * Abbreviation of the Azure Storage service that accepts the key.
   */
  signedService: string;
  /**
   * The service version that created the key.
   */
  signedVersion: string;
  /**
   * The key as a base64 string.
   */
  value: string;
}
