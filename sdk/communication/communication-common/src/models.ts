// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationUserIdentifier } from "./identifierModels";

/**
 * The access token for a user.
 */
export interface CommunicationAccessToken {
  /**
   * The access token issued for the user.
   */
  token: string;

  /**
   * The expiry time of the token.
   */
  expiresOn: Date;

  /**
   * Stable Communication resource identifier.
   */
  resourceId?: string;

  /**
   * Communication user identifier.
   */
  user?: CommunicationUserIdentifier;

  /**
   * HTTP Authentication scheme associated with the token.
   */
  scheme?: string;
}
