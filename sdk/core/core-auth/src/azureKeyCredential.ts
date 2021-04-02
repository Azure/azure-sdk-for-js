// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents a credential defined by a static API key.
 */
export interface KeyCredential {
  /**
   * The value of the API key represented as a string
   */
  readonly key: string;
}

/**
 * A static-key-based credential that supports updating
 * the underlying key value.
 */
export class AzureKeyCredential implements KeyCredential {
  private _key: string;

  /**
   * The value of the key to be used in authentication
   */
  public get key(): string {
    return this._key;
  }

  /**
   * Create an instance of an AzureKeyCredential for use
   * with a service client.
   *
   * @param key - The initial value of the key to use in authentication
   */
  constructor(key: string) {
    if (!key) {
      throw new Error("key must be a non-empty string");
    }

    this._key = key;
  }

  /**
   * Change the value of the key.
   *
   * Updates will take effect upon the next request after
   * updating the key value.
   *
   * @param newKey - The new key value to be used
   */
  public update(newKey: string): void {
    this._key = newKey;
  }
}
