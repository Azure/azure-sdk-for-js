// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A user delegation key.
 */
export interface UserDelegationKey {
  signedObjectId: string;
  signedTenantId: string;
  signedStartsOn: Date;
  signedExpiresOn: Date;
  signedService: string;
  signedVersion: string;
  value: string;
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * UserDelegationKeyCredential is only used for generation of user delegation SAS.
 */
export class UserDelegationKeyCredential {
  public readonly accountName: string;
  public readonly userDelegationKey: UserDelegationKey;

  constructor(accountName: string, userDelegationKey: UserDelegationKey) {
    this.accountName = accountName;
    this.userDelegationKey = userDelegationKey;
    throw new Error("UserDelegationKeyCredential is not supported in the browser.");
  }

  public computeHMACSHA256(_stringToSign: string): string {
    throw new Error("UserDelegationKeyCredential is not supported in the browser.");
  }
}
