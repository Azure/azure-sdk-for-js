// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Valid collection names for Key Vault Certificate identifiers.
 */
export type KeyVaultCertificatesIdentifierCollectionName = "certificates" | "deletedcertificates";

/**
 * Represents a Key Vault identifier and its parsed contents.
 */
export interface ParsedKeyVaultCertificatesIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   */
  collection: KeyVaultCertificatesIdentifierCollectionName;

  /**
   * The originally received identifier.
   */
  id: string;

  /**
   * The Key Vault Certificate unique identifier (a URL).
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
   */
  collection: KeyVaultCertificatesIdentifierCollectionName;

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

  /**
   * Parses a Key Vault identifier.
   * @param url Key Vault identifier
   */
  constructor(url: string) {
    const collections: KeyVaultCertificatesIdentifierCollectionName[] = [
      "certificates",
      "deletedcertificates"
    ];
    const urlParts = url.split("/");
    const collection: KeyVaultCertificatesIdentifierCollectionName =
      collections.filter((x) => urlParts.includes(x))[0] || "certificates";

    this.collection = collection;
    this.id = url;

    const { vaultUrl, name, version } = parseKeyvaultIdentifier(collection, url);

    this.vaultUrl = vaultUrl;
    this.name = name;
    this.version = version;
  }
}
