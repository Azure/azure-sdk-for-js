// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { StorageClient } from "../../src/StorageClient";

export function assertClientUsesTokenCredential(client: StorageClient): void {
  const factories = (client as any).pipeline.factories;
  const authPolicy = factories[factories.length - 1].create();
  assert.strictEqual(authPolicy.constructor.name, "BearerTokenAuthenticationPolicy");
}
