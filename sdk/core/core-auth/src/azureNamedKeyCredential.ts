// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isObjectWithProperties } from "./typeguards";

/**
 * Represents a credential defined by a static API name and key.
 */
export interface NamedKeyCredential {
  /**
   * The value of the API key represented as a string
   */
  readonly key: string;
  /**
   * The value of the API name represented as a string.
   */
  readonly name: string;
}

/**
 * A static name/key-based credential that supports updating
 * the underlying name and key values.
 */
export class AzureNamedKeyCredential implements NamedKeyCredential {
  private _key: string;
  private _name: string;

  /**
   * The value of the key to be used in authentication.
   */
  public get key(): string {
    return this._key;
  }

  /**
   * The value of the name to be used in authentication.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Create an instance of an AzureNamedKeyCredential for use
   * with a service client.
   *
   * @param name - The initial value of the name to use in authentication.
   * @param key - The initial value of the key to use in authentication.
   */
  constructor(name: string, key: string) {
    if (!name || !key) {
      throw new TypeError("name and key must be non-empty strings");
    }

    this._name = name;
    this._key = key;
  }

  /**
   * Change the value of the key.
   *
   * Updates will take effect upon the next request after
   * updating the key value.
   *
   * @param newName - The new name value to be used.
   * @param newKey - The new key value to be used.
   */
  public update(newName: string, newKey: string): void {
    if (!newName || !newKey) {
      throw new TypeError("newName and newKey must be non-empty strings");
    }

    this._name = newName;
    this._key = newKey;
  }
}

/**
 * Tests an object to determine whether it implements NamedKeyCredential.
 *
 * @param credential - The assumed NamedKeyCredential to be tested.
 */
export function isNamedKeyCredential(credential: unknown): credential is NamedKeyCredential {
  return (
    isObjectWithProperties(credential, ["name", "key"]) &&
    typeof credential.key === "string" &&
    typeof credential.name === "string"
  );
}
