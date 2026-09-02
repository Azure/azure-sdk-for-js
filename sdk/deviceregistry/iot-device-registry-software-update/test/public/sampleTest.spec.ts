// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistrySoftwareUpdateClient } from "../../src/index.js";
import { describe, expect, it } from "vitest";

describe("DeviceRegistrySoftwareUpdateClient", () => {
  it("rejects a cross-origin continuation token", async () => {
    const client = new DeviceRegistrySoftwareUpdateClient("contoso.api.adu.microsoft.com", {
      getToken: () =>
        Promise.resolve({
          token: "test-token",
          expiresOnTimestamp: Date.now() + 60_000,
        }),
    });
    const pages = client.softwareUpdate.listProviders().byPage({
      continuationToken: "https://example.com/continuation",
    });

    await expect(pages.next()).rejects.toThrow(
      "Refusing to send credentials to an unexpected request origin.",
    );
  });
});
