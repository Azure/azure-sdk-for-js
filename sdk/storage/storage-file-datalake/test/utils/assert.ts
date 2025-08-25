// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isTokenCredential } from "@azure/core-auth";
import type { StorageClient } from "$internal/StorageClient.js";
import { assert } from "vitest";

export function assertClientUsesTokenCredential(client: StorageClient): void {
  assert.isTrue(isTokenCredential(client.credential));
}
