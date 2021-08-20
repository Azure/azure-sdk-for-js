// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * User assertion to use when authenticating with the On-Behalf-Of flow.
 */
export interface UserAssertion {
  accessToken: string;
}

/**
 * Optional parameters to configure the TokenCredential authentication.
 */
export interface AuthenticationOptions {
  /**
   * User assertion to use when authenticating with the On-Behalf-Of flow.
   */
  userAssertion?: UserAssertion;
}

/**
 * Function that generates user assertions. Useful for future proofing.
 */
export function createUserAssertion(accessToken: string): UserAssertion {
  return {
    accessToken
  };
}
