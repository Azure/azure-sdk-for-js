// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isSystemEvent } from "../../src/index.js";
import type { KeyVaultSecretNearExpiryEventData } from "../../src/index.js";
import { describe, it, assert, expectTypeOf } from "vitest";

describe("Events tests", () => {
  it("isSystemEvent test", async () => {
    const e = {
      eventType: "Microsoft.KeyVault.SecretNearExpiry",
      eventTime: new Date(),
      id: "id",
      subject: "subject",
      dataVersion: "1.0",
      data: {
        id: "id",
        vaultName: "vaultName",
      },
    };
    const result = isSystemEvent("Microsoft.KeyVault.SecretNearExpiry", e);
    assert.isTrue(result);
    expectTypeOf(e).toMatchTypeOf<KeyVaultSecretNearExpiryEventData>();
  });
});
