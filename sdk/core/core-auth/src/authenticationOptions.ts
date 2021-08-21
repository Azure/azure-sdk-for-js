// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * User assertion to use when authenticating with the On-Behalf-Of flow.
 */
export interface UserAssertion {
  /**
   * Form the [OAuth 2.0 On-Behalf-Of flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow):
   * The access token that was sent to the middle-tier API.
   */
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
