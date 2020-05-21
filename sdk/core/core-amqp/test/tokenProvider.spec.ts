// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
chai.should();
import debugModule from "debug";
const debug = debugModule("azure:core-amqp:token-spec");
import { SharedKeyCredential, IotSharedKeyCredential } from "../src";

describe("SharedKeyCredential", function(): void {
  it("should work as expected with required parameters", async function(): Promise<void> {
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new SharedKeyCredential(keyName, key);
    const now = Math.floor(Date.now() / 1000) + 3600;
    debug(">>> now: %d", now);
    const tokenInfo = tokenProvider.getToken("myaudience");
    debug(">>> Token Info is: %O", tokenInfo);
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
    debug(">>> now: %d", now);
    const tokenInfo = tokenProvider.getToken("sb://hostname.servicebus.windows.net/");
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo.token.should.match(
      /SharedAccessSignature sr=sb%3A%2F%2Fhostname.servicebus.windows.net%2F&sig=(.*)&se=\d{10}&skn=sakName/g
    );
    tokenInfo.expiresOnTimestamp.should.equal(now);
  });
});

describe("IotSharedKeyCredential", function(): void {
  it("should work as expected with required parameters", async function(): Promise<void> {
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new IotSharedKeyCredential(keyName, key);
    const now = Math.floor(Date.now() / 1000) + 3600;
    debug(">>> now: %d", now);
    const tokenInfo = tokenProvider.getToken("myaudience");
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo.token.should.match(
      /SharedAccessSignature sr=myaudience&sig=(.*)&se=\d{10}&skn=myKeyName/g
    );
    tokenInfo.expiresOnTimestamp.should.equal(now);
  });
});
