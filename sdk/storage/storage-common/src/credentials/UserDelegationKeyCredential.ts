// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createHmac } from "node:crypto";

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

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * UserDelegationKeyCredential is only used for generation of user delegation SAS.
 * @see https://learn.microsoft.com/rest/api/storageservices/create-user-delegation-sas
 */
export class UserDelegationKeyCredential {
  /**
   * Azure Storage account name; readonly.
   */
  public readonly accountName: string;

  /**
   * Azure Storage user delegation key; readonly.
   */
  public readonly userDelegationKey: UserDelegationKey;

  /**
   * Key value in Buffer type.
   */
  private readonly key: Buffer;

  /**
   * Creates an instance of UserDelegationKeyCredential.
   * @param accountName -
   * @param userDelegationKey -
   */
  constructor(accountName: string, userDelegationKey: UserDelegationKey) {
    this.accountName = accountName;
    this.userDelegationKey = userDelegationKey;
    this.key = Buffer.from(userDelegationKey.value, "base64");
  }

  /**
   * Generates a hash signature for an HTTP request or for a SAS.
   *
   * @param stringToSign -
   */
  public computeHMACSHA256(stringToSign: string): string {
    // console.log(`stringToSign: ${JSON.stringify(stringToSign)}`);

    return createHmac("sha256", this.key).update(stringToSign, "utf8").digest("base64");
  }
}
