// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { StorageClient } from "../../src/StorageClient";
import { isTokenCredential } from "@azure/core-auth";

export function assertClientUsesTokenCredential(client: StorageClient): void {
  const credential = client["credential"];
  assert.isTrue(isTokenCredential(credential));
}
