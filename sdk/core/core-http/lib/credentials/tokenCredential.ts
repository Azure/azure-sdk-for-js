// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { RequestOptionsBase } from "../webResource";

/**
 * Represents a credential capable of providing an authentication token.
 */
export interface TokenCredential {
  /**
   * Gets the token provided by this credential.
   *
   * @param scopes The list of scopes for which the token will have access.
   * @param requestOptions The RequestOptionsBase used to configure any requests
   *                       this TokenCredential implementation might make.
   */
  getToken(
    scopes: string | string[],
    requestOptions?: RequestOptionsBase
  ): Promise<string | null>;
}
