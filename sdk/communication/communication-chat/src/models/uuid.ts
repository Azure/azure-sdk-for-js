// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { v4 as uuidv4 } from "uuid";

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 * @internal
 */
export function generateUuid(): string {
  return uuidv4();
}
