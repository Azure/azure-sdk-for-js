// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import {
  SharedKeyCredential,
  SharedAccessSignatureCredential
} from "../src/eventhubSharedKeyCredential";

describe("SharedKeyCredential", function(): void {
  it("should work as expected with required parameters", async function(): Promise<void> {
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new SharedKeyCredential(keyName, key);
    const now = Math.floor(Date.now() / 1000) + 3600;
    const tokenInfo = tokenProvider.getToken("myaudience");
    tokenInfo.token.should.match(
      /SharedAccessSignature sr=myaudience&sig=(.*)&se=\d{10}&skn=myKeyName/g
    );
    tokenInfo.expiresOnTimestamp.should.equal(now);
  });
  it("should work as expected when created from a connection string", async function(): Promise<
    void
  > {
    const cs =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const tokenProvider = SharedKeyCredential.fromConnectionString(cs);
    const now = Math.floor(Date.now() / 1000) + 3600;
    const tokenInfo = tokenProvider.getToken("sb://hostname.servicebus.windows.net/");
    tokenInfo.token.should.match(
      /SharedAccessSignature sr=sb%3A%2F%2Fhostname.servicebus.windows.net%2F&sig=(.*)&se=\d{10}&skn=sakName/g
    );
    tokenInfo.expiresOnTimestamp.should.equal(now);
  });
  it("SharedAccessSignatureCredential", () => {
    const sasCred = new SharedAccessSignatureCredential("SharedAccessSignature se=<blah>");
    const accessToken = sasCred.getToken("audience isn't used");

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

    // these just exist because we're a SharedKeyCredential but we don't currently
    // parse any attributes out (they're available but we've carved out a spot so
    // they're not needed.)
    should.equal(sasCred.key, "");
    should.equal(sasCred.keyName, "");
  });
});
