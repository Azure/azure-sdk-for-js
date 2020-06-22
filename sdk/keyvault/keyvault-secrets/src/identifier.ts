// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseKeyvaultIdentifier } from "./core/utils";

/**
 * Represents a Key Vault Secrets identifier and its parsed contents.
 */
export interface ParsedKeyVaultSecretsIdentifier {
  /**
   * The type of resource under Key Vault that this identifier is referring to.
   * In this case, only "secrets" is valid.
   */
  collection: "secrets";

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
   * In this case, only "secrets" is valid.
   */
  collection: "secrets";

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

  constructor(url: string) {
    const collection = "secrets";
    const coreParsedIdentifier = parseKeyvaultIdentifier(collection, url);

    this.collection = collection;
    this.id = url;
    this.vaultUrl = coreParsedIdentifier.vaultUrl;
    this.version = coreParsedIdentifier.version;
    this.name = coreParsedIdentifier.name;
  }
}
