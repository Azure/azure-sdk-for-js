// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isTokenCredential } from "@azure/core-auth";
import { assert } from "vitest";

export function assertClientUsesTokenCredential(client: Record<string, any>): void {
  const credential = (client as { credential: unknown })["credential"];
  assert.isTrue(isTokenCredential(credential));
}
