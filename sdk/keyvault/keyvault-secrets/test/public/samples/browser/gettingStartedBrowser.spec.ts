// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Authenticates with Azure Key Vault from a browser using InteractiveBrowserCredential.
 */

import { SecretClient } from "../../../../src/index.js";
import { InteractiveBrowserCredential } from "@azure/identity";
import { createTestCredential } from "@azure-tools/test-credential";
import { forPublishing } from "@azure-tools/test-publishing";
import { describe, it } from "vitest";

describe("gettingStartedBrowser", () => {
  it("create a secret client in the browser", async () => {
    // @snippet ReadmeSampleCreateClientBrowser
    const credential = forPublishing(
      createTestCredential(),
      () =>
        new InteractiveBrowserCredential({
          tenantId: "<YOUR_TENANT_ID>",
          clientId: "<YOUR_CLIENT_ID>",
        }),
    );
    const url = "<keyvault-url>";
    const client = new SecretClient(url, credential);
    // @snippet-end ReadmeSampleCreateClientBrowser
  });
});
