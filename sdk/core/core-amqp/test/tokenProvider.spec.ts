// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureNamedKeyCredential, AzureSASCredential } from "@azure/core-auth";
import chai from "chai";
import { createSasTokenProvider } from "../src/index";

const should = chai.should();

describe("SasTokenProvider", function (): void {
  describe("createSasTokenProvider", () => {
    it("should work as expected with AzureNamedKeyCredential", async function (): Promise<void> {
      const keyName = "myKeyName";
      const key = "importantValue";
      const tokenProvider = createSasTokenProvider(new AzureNamedKeyCredential(keyName, key));
      const expiry = Math.floor(Date.now() / 1000) + 3600;
      const tokenInfo = await tokenProvider.getToken("myaudience");
      tokenInfo.token.should.match(
        /SharedAccessSignature sr=myaudience&sig=(.*)&se=\d{10}&skn=myKeyName/g
      );
      // account for elapsed time between two Date.now() calls
      // eslint-disable-next-line no-unused-expressions
      (tokenInfo.expiresOnTimestamp - expiry < 2).should.be.true;
    });

    it("should work as expected with `shareAccessKeyName` and `sharedAccessKey`", async function (): Promise<void> {
      // This is how createSasTokenProvider will be called if SAK params are passed through a connection string.
      const tokenProvider = createSasTokenProvider({
        sharedAccessKeyName: "sakName",
        sharedAccessKey: "sak",
      });
      const expiry = Math.floor(Date.now() / 1000) + 3600;
      const tokenInfo = await tokenProvider.getToken("sb://hostname.servicebus.windows.net/");
      tokenInfo.token.should.match(
        /SharedAccessSignature sr=sb%3A%2F%2Fhostname.servicebus.windows.net%2F&sig=(.*)&se=\d{10}&skn=sakName/g
      );
      // account for elapsed time between two Date.now() calls
      // eslint-disable-next-line no-unused-expressions
      (tokenInfo.expiresOnTimestamp - expiry < 2).should.be.true;
    });
  });

  it("should work as expected with AzureSASCredential", async function (): Promise<void> {
    const sasTokenProvider = createSasTokenProvider(
      new AzureSASCredential("SharedAccessSignature se=<blah>")
    );
    const accessToken = await sasTokenProvider.getToken("audience isn't used");

    should.equal(
      accessToken.token,
      "SharedAccessSignature se=<blah>",
      "SAS URI we were constructed with should just be returned verbatim without interpretation (and the audience is ignored)"
    );

    should.equal(
      accessToken.expiresOnTimestamp,
      0,
      "SAS URI always returns 0 for expiry (ignoring what's in the SAS token)"
    );
  });

  it("should work as expected with `sharedAccessSignature`", async function (): Promise<void> {
    // This is how createSasTokenProvider will be called if the shared access signature is passed through a connection string.
    const tokenProvider = createSasTokenProvider({ sharedAccessSignature: "<blah>" });
    const tokenInfo = await tokenProvider.getToken("sb://hostname.servicebus.windows.net/");
    tokenInfo.token.should.match(/<blah>/g);
    tokenInfo.expiresOnTimestamp.should.equal(0);
  });
});
