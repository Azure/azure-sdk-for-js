// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import {
  bearerTokenAuthenticationPolicyName,
  Pipeline as CoreHttpsPipeline
} from "@azure/core-https";
import { StorageClient } from "../../src/StorageClient";

export function assertClientUsesTokenCredential(client: StorageClient) {
  const factories = ((client as any).pipeline.factories as CoreHttpsPipeline).getOrderedPolicies();
  const authPolicy = factories.filter((f) => f.name === bearerTokenAuthenticationPolicyName)[0];
  assert.ok(authPolicy);
}
