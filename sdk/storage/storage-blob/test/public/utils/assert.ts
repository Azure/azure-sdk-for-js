// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isTokenCredential } from "@azure/core-auth";
import type { BlobGetPropertiesResponse, StorageClient } from "@azure/storage-blob";
import { assert } from "vitest";

export function assertClientUsesTokenCredential(client: StorageClient): void {
  assert.isTrue(isTokenCredential(client.credential));
}

export function assertSrcReplicationProps(
  srcRes: Omit<BlobGetPropertiesResponse, "_response">,
): void {
  assert.equal(srcRes.objectReplicationDestinationPolicyId, undefined);
  assert.isAtLeast(srcRes.objectReplicationSourceProperties?.length ?? 0, 1);
  for (const { rules } of srcRes.objectReplicationSourceProperties ?? []) {
    assert.isAtLeast(rules.length, 1);
    for (const { replicationStatus } of rules) {
      assert.equal(replicationStatus, "complete");
    }
  }
}

export function assertDestReplicationProps(
  destRes: Omit<BlobGetPropertiesResponse, "_response">,
): void {
  assert.isUndefined(destRes.objectReplicationSourceProperties);
  assert.isDefined(destRes.objectReplicationDestinationPolicyId);
}
