// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceCodeCredential, VisualStudioCodeCredential } from "@azure/identity";
import { describe, it, assert, expect } from "vitest";

describe("Plugin API", function () {
  it("Setting persistence options throws if not initialized", function () {
    assert.throws(() => {
      new DeviceCodeCredential({
        tokenCachePersistenceOptions: {
          enabled: true,
        },
      });
    }, /no persistence provider.*@azure\/identity-cache-persistence/);
  });

  it("VisualStudioCodeCredential throws if plugin not initialized", async function () {
    const credential = new VisualStudioCodeCredential();
    await expect(credential.getToken("https://graph.microsoft.com/.default")).rejects.toThrow(
      /Visual Studio Code Authentication is not available/,
    );
  });
});
