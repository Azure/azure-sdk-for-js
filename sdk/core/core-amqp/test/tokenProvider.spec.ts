// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { createSasTokenProvider } from "../src/index.js";

describe("SasTokenProvider", function (): void {
  describe("createSasTokenProvider", () => {
    it("should work as expected with AzureNamedKeyCredential", async function (): Promise<void> {
      const keyName = "myKeyName";
      const key = "importantValue";
      const tokenProvider = createSasTokenProvider(new AzureNamedKeyCredential(keyName, key));
      const expiry = Math.floor(Date.now() / 1000) + 3600;
      const tokenInfo = await tokenProvider.getToken("myaudience");
      assert.match(
        tokenInfo.token,
        /SharedAccessSignature sr=myaudience&sig=(.*)&se=\d{10}&skn=myKeyName/g,
      );
      // account for elapsed time between two Date.now() calls
      // eslint-disable-next-line no-unused-expressions
      assert.isTrue(tokenInfo.expiresOnTimestamp - expiry < 2);
    });

    it("should work as expected with `shareAccessKeyName` and `sharedAccessKey`", async function (): Promise<void> {
      // This is how createSasTokenProvider will be called if SAK params are passed through a connection string.
      const tokenProvider = createSasTokenProvider({
        sharedAccessKeyName: "sakName",
        sharedAccessKey: "sak",
      });
      const expiry = Math.floor(Date.now() / 1000) + 3600;
      const tokenInfo = await tokenProvider.getToken("sb://hostname.servicebus.windows.net/");
      assert.match(
        tokenInfo.token,
        /SharedAccessSignature sr=sb%3A%2F%2Fhostname.servicebus.windows.net%2F&sig=(.*)&se=\d{10}&skn=sakName/g,
      );
      // account for elapsed time between two Date.now() calls
      // eslint-disable-next-line no-unused-expressions
      assert.isTrue(tokenInfo.expiresOnTimestamp - expiry < 2);
    });
  });

  it("should work as expected with AzureSASCredential", async function (): Promise<void> {
    const sasTokenProvider = createSasTokenProvider(
      new AzureSASCredential("SharedAccessSignature se=<blah>"),
    );
    const accessToken = await sasTokenProvider.getToken("audience isn't used");

    assert.equal(
      accessToken.token,
      "SharedAccessSignature se=<blah>",
      "SAS URI we were constructed with should just be returned verbatim without interpretation (and the audience is ignored)",
    );

    assert.equal(
      accessToken.expiresOnTimestamp,
      0,
      "SAS URI always returns 0 for expiry (ignoring what's in the SAS token)",
    );
  });

  it("should work as expected with `sharedAccessSignature`", async function (): Promise<void> {
    // This is how createSasTokenProvider will be called if the shared access signature is passed through a connection string.
    const tokenProvider = createSasTokenProvider({ sharedAccessSignature: "<blah>" });
    const tokenInfo = await tokenProvider.getToken("sb://hostname.servicebus.windows.net/");
    assert.match(tokenInfo.token, /<blah>/g);
    assert.equal(tokenInfo.expiresOnTimestamp, 0);
  });
});
