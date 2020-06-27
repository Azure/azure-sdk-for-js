// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Valid collection names for Key Vault Secret identifiers.
 */
export type KeyVaultSecretsIdentifierCollectionName = "secrets" | "deletedsecrets";

/**
 * Represents a Key Vault Secrets identifier and its parsed contents.
 */
export interface ParsedKeyVaultSecretsIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   */
  collection: KeyVaultSecretsIdentifierCollectionName;

  /**
   * The originally received identifier.
   */
  id: string;

  /**
   * The Key Vault Secret unique identifier (an URl).
   */
  vaultUrl: string;

  /**
   * The version of Key Vault Secret. Might be undefined.
   */
  version?: string;

  /**
   * The name of the Key Vault Secret.
   */
  name: string;
}

/**
 * Parser of the KeyVaultIdentifier for the Key Vault Secrets Client.
 */
export class KeyVaultSecretsIdentifier implements ParsedKeyVaultSecretsIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   */
  collection: KeyVaultSecretsIdentifierCollectionName;

  /**
   * The originally received identifier.
   */
  public id: string;

  /**
   * The Key Vault Secret unique identifier (an URl).
   */
  public vaultUrl: string;

  /**
   * The version of Key Vault Secret. Might be undefined.
   */
  public version?: string;

  /**
   * The name of the Key Vault Secret.
   */
  public name: string;

  /**
   * Parses a Key Vault identifier.
   * @param url Key Vault identifier
   */
  constructor(url: string) {
    const collections: KeyVaultSecretsIdentifierCollectionName[] = ["secrets", "deletedsecrets"];
    const urlParts = url.split("/");
    const collection: KeyVaultSecretsIdentifierCollectionName =
      collections.filter((x) => urlParts.includes(x))[0] || "secrets";

    this.collection = collection;
    this.id = url;

    const { vaultUrl, name, version } = parseKeyvaultIdentifier(collection, url);
    this.vaultUrl = vaultUrl;
    this.name = name;
    this.version = version;
  }
}
