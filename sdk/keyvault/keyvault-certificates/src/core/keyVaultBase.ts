// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export interface ParsedKeyVaultEntityIdentifier {
  /**
   * The vault URI.
   */
  vaultUrl: string;
  /**
   * The version of key/secret/certificate. May be undefined.
   */
  version?: string;
  /**
   * The name of key/secret/certificate.
   */
  name: string;
}
