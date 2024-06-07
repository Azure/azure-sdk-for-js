// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Suite } from "mocha";

import { isSystemEvent } from "../../src";
import { assert } from "chai";

describe("Events tests", function (this: Suite) {
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
