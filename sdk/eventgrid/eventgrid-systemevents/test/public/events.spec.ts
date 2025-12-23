// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isSystemEvent } from "@azure/eventgrid-systemevents";
import type { KeyVaultSecretNearExpiryEventData } from "@azure/eventgrid-systemevents";
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
        objectType: "objectType",
        objectName: "objectName",
        version: "version",
        nbf: 1650000000,
        exp: 1660000000,
      },
    };
    const result = isSystemEvent("Microsoft.KeyVault.SecretNearExpiry", e);
    assert.isTrue(result);
    expectTypeOf(e.data).toMatchTypeOf<KeyVaultSecretNearExpiryEventData>();
  });
});
