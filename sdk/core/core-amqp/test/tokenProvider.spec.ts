// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
chai.should();
import debugModule from "debug";
const debug = debugModule("azure:core-amqp:token-spec");
import { SharedKeyCredential, IotSharedKeyCredential } from "../src";

describe("SharedKeyCredential", function(): void {
  it("should work as expected with required parameters and default values for optional parameters", async function(): Promise<
    void
  > {
    const namespace = "mynamespace";
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new SharedKeyCredential(namespace, keyName, key);
    const now = Math.floor(Date.now() / 1000) + 3600;
    debug(">>> now: %d", now);
    const tokenInfo = await tokenProvider.getToken();
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo.token.should.match(
      /SharedAccessSignature sr=mynamespace&sig=(.*)&se=\d{10}&skn=myKeyName/g
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
    const tokenInfo = await tokenProvider.getToken();
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo.token.should.match(
      /SharedAccessSignature sr=sb%3A%2F%2Fhostname.servicebus.windows.net%2F&sig=(.*)&se=\d{10}&skn=sakName/g
    );
    tokenInfo.expiresOnTimestamp.should.equal(now);
  });

  it("should work as expected with custom values for optional parameters", async function(): Promise<
    void
  > {
    const namespace = "mynamespace";
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new SharedKeyCredential(namespace, keyName, key);
    const now = Math.floor(Date.now() / 1000) + 3600;
    debug(">>> now: %d", now);
    const tokenInfo = await tokenProvider.getToken("https://myaudience.host.mango.net/");
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo.token.should.match(
      /SharedAccessSignature sr=https%3A%2F%2Fmyaudience.host.mango.net%2F&sig=(.*)&se=\d{10}&skn=myKeyName/g
    );
    tokenInfo.expiresOnTimestamp.should.equal(now);
  });
});

describe("IotSharedKeyCredential", function(): void {
  it("should work as expected with required parameters and default values for optional parameters", async function(): Promise<
    void
  > {
    const namespace = "mynamespace";
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new IotSharedKeyCredential(namespace, keyName, key);
    const now = Math.floor(Date.now() / 1000) + 3600;
    debug(">>> now: %d", now);
    const tokenInfo = await tokenProvider.getToken();
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo.token.should.match(
      /SharedAccessSignature sr=mynamespace&sig=(.*)&se=\d{10}&skn=myKeyName/g
    );
    tokenInfo.expiresOnTimestamp.should.equal(now);
  });
});
