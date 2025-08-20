// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { StorageClient } from "$internal/StorageClient.js";
import { isTokenCredential } from "@azure/core-auth";
import { assert } from "vitest";

export function assertClientUsesTokenCredential(client: StorageClient): void {
  const credential = client["credential"];
  assert.isTrue(isTokenCredential(credential));
}
