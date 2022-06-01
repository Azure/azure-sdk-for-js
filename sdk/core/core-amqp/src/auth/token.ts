// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Describes the type of supported tokens.
 */
export enum TokenType {
  /**
   * The "jwt" token type. Used with AADTokenCredential.
   */
  CbsTokenTypeJwt = "jwt",
  /**
   * The sas token type. Used with SharedKeyCredential.
   */
  CbsTokenTypeSas = "servicebus.windows.net:sastoken",
}
