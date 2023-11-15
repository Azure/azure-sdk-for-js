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
