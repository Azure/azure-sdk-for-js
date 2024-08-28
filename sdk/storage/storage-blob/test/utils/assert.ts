// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isTokenCredential } from "@azure/core-auth";
import { assert } from "chai";
import { StorageClient } from "../../src/StorageClient";

export function assertClientUsesTokenCredential(client: StorageClient): void {
  const credential = (client as any).credential;
  assert.isTrue(isTokenCredential(credential));
}
