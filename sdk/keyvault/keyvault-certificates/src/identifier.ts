// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Represents a Key Vault identifier and its parsed contents.
 */
export interface ParsedKeyVaultCertificatesIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   * In this case, only "certificates" is valid.
   */
  collection: "certificates";

  /**
   * The originally received identifier.
   */
  id: string;

  /**
   * The Key Vault Certificate unique identifier (an URl).
   */
  vaultUrl: string;

  /**
   * The version of Key Vault Certificate. Might be undefined.
   */
  version?: string;

  /**
   * The name of the Key Vault Certificate.
   */
  name: string;
}

/**
 * Parser of the KeyVaultIdentifier for the Key Vault Certificates Client.
 */
export class KeyVaultCertificatesIdentifier implements ParsedKeyVaultCertificatesIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   * In this case, only "certificates" is valid.
   */
  collection: "certificates";

  /**
   * The originally received identifier.
   */
  public id: string;

  /**
   * The Key Vault Certificate unique identifier (an URl).
   */
  public vaultUrl: string;

  /**
   * The version of Key Vault Certificate. Might be undefined.
   */
  public version?: string;

  /**
   * The name of the Key Vault Certificate.
   */
  public name: string;

  constructor(url: string) {
    const collection = "certificates";
    const coreParsedIdentifier = parseKeyvaultIdentifier(collection, url);

    this.collection = collection;
    this.id = url;
    this.vaultUrl = coreParsedIdentifier.vaultUrl;
    this.version = coreParsedIdentifier.version;
    this.name = coreParsedIdentifier.name;
  }
}
