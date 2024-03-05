// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isObjectWithProperties } from "../util/typeGuards.js";

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
 * Tests an object to determine whether it implements KeyCredential.
 *
 * @param credential - The assumed KeyCredential to be tested.
 */
export function isKeyCredential(credential: unknown): credential is KeyCredential {
  return isObjectWithProperties(credential, ["key"]) && typeof credential.key === "string";
}
