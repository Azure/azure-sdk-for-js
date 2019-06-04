// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { RequestOptionsBase } from "../webResource";

/**
 * Defines a type for credential scopes that can either be a string
 * or a list of strings.
 */
export type CredentialScopes = string | string[];

/**
 * Represents a credential capable of providing an authentication token.
 */
export interface TokenCredential {
  /**
   * Gets the token provided by this credential.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param aborter The AbortSignalLike used for aborting the token request.
   */
  getToken(
    scopes: CredentialScopes,
    requestOptions?: RequestOptionsBase
  ): Promise<string | null>;
}
