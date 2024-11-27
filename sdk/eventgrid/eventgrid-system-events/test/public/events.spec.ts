// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isSystemEvent } from "../../src/index.js";
import { describe, it, assert } from "vitest";

describe("Events tests", () => {
  it("isSystemEvent test", async () => {
    const result = isSystemEvent("Microsoft.KeyVault.SecretNearExpiry", {
      eventType: "Microsoft.KeyVault.SecretNearExpiry",
      eventTime: new Date(),
      id: "id",
      subject: "subject",
      dataVersion: "1.0",
      data: {
        id: "id",
        vaultName: "vaultName",
      },
    });
    assert.isTrue(result);
  });
});
