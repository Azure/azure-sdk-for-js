// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { UserDelegationKey } from "./UserDelegationKey.js";

export type { UserDelegationKey } from "./UserDelegationKey.js";

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
