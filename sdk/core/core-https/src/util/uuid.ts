// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { v4 as uuidv4 } from "uuid";

/**
 * Generated Universall Unique Identifier
 *
 * @return {string} RFC4122 v4 UUID.
 */
export function generateUuid(): string {
  return uuidv4();
}
