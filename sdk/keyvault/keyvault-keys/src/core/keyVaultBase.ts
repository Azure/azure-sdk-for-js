// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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


