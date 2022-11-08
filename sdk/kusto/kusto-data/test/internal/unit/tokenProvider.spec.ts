// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CloudSettings } from "../../../src/cloudSettings";
import { UserPassTokenProvider } from "../../../src/tokenProvider";
import assert from "assert";

describe("CloudInfo", () => {
  describe("#CloudInfo", () => {
    it("mfa off", async () => {
      const fakeUri = "https://fakeurl_mfa.kusto.windows.net";
      CloudSettings.getInstance().cloudCache[fakeUri] = {
        LoginEndpoint: process.env.AadAuthorityUri || "https://login.microsoftonline.com",
        LoginMfaRequired: false,
        KustoClientAppId: "1234",
        KustoClientRedirectUri: "https://microsoft/kustoclient",
        KustoServiceResourceId: "https://fakeurl.kusto.windows.net",
        FirstPartyAuthorityUrl:
          "https://login.microsoftonline.com/8cdef31-a31e-4b4a-93e4-5f571e91255a",
      };

      const provider = new UserPassTokenProvider(fakeUri, "auth_test", "a", "b");
      try {
        await provider.acquireToken();
      } catch {
        // We should fail to acquire token but we want to validate the CloudSettings which acquireToken init
      }

      assert.strictEqual(provider.scopes[0], "https://fakeurl.kusto.windows.net/.default");
    }).timeout(5000);

    it("mfa off", async () => {
      const fakeUri2 = "https://fakeurl2.kusto.windows.net";
      CloudSettings.getInstance().cloudCache[fakeUri2] = {
        LoginEndpoint: process.env.AadAuthorityUri || "https://login.microsoftonline.com",
        LoginMfaRequired: true,
        KustoClientAppId: "1234",
        KustoClientRedirectUri: "https://microsoft/kustoclient",
        KustoServiceResourceId: "https://fakeurl.kusto.windows.net",
        FirstPartyAuthorityUrl:
          "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a",
      };

      const provider = new UserPassTokenProvider(fakeUri2, "auth_test", "a", "b");
      try {
        await provider.acquireToken();
      } catch {
        // We should fail to acquire token but we want to validate the CloudSettings which acquireToken init
      }

      assert.strictEqual(provider.scopes[0], "https://fakeurl.kustomfa.windows.net/.default");
    }).timeout(5000);
  });
});
