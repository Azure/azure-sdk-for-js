// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export interface ParsedKeyVaultEntityIdentifier {
  /**
   * @member {string} [vaultUrl] The vault URI.
   */
  vaultUrl: string;
  /**
   * @member {string} [version] The version of key/secret/certificate. May be undefined.
   */
  version?: string;
  /**
   * @member {string} [name] The name of key/secret/certificate.
   */
  name: string;
}
