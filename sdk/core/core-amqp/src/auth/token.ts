// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
/**
 * Describes the type of supported tokens.
 * @enum TokenType
 */
export enum TokenType {
  /**
   * The "jwt" token type. Used with AADTokenProvider.
   */
  CbsTokenTypeJwt = "jwt",
  /**
   * The sas token type. Used with SharedKeyCredential.
   */
  CbsTokenTypeSas = "servicebus.windows.net:sastoken"
}

/**
 * Represents an access token with an expiration time.
 */
export interface AccessToken {
  /**
   * The access token.
   */
  token: string;

  /**
   * The access token's expiration date and time.
   */
  expiresOn: number;
}

/**
 * Represents a credential capable of providing an authentication token.
 */
export interface TokenCredential {
  /**
   * Gets the token provided by this credential.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param getTokenOptions The options used to configure any requests
   *                        this TokenCredential implementation might make.
   */
  getToken(scopes: string | string[], getTokenOptions?: string): Promise<AccessToken | null>;
}
