// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/**
 * Describes the type of supported tokens.
 * @enum TokenType
 */
export enum TokenType {
  /**
   * The "jwt" token type. Used with AADTokenCredential.
   */
  CbsTokenTypeJwt = "jwt",
  /**
   * The sas token type. Used with SharedKeyCredential.
   */
  CbsTokenTypeSas = "servicebus.windows.net:sastoken"
}
