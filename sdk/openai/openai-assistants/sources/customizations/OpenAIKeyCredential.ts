// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";

/**
 * The OpenAIKeyCredential class represents an OpenAI API key
 * and is used to authenticate into an OpenAI client for
 * an OpenAI endpoint.
 */
export class OpenAIKeyCredential implements KeyCredential {
  private _key: string;

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

    this._key = createKey(key);
  }

  /**
   * The value of the key to be used in authentication
   */
  public get key(): string {
    return this._key;
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
    this._key = createKey(newKey);
  }
}

function createKey(key: string): string {
  return key.startsWith("Bearer ") ? key : `Bearer ${key}`;
}
