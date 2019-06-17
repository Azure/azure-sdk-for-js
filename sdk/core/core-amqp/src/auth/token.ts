// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
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
