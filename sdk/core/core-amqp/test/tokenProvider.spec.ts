// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
import { aadServiceBusAudience, aadEventHubsAudience } from "./../src/util/constants";
chai.should();
import debugModule from "debug";
const debug = debugModule("azure:core-http:token-spec");
import { SharedKeyCredential, IotSasTokenProvider } from "../src";

describe("SharedKeyCredential", function(): void {
  it("should work as expected with required parameters and default values for optional parameters", async function(): Promise<
    void
  > {
    const namespace = "mynamespace";
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new SharedKeyCredential(namespace, keyName, key);
    tokenProvider.tokenValidTimeInSeconds.should.equal(3600);
    tokenProvider.tokenRenewalMarginInSeconds.should.equal(900);
    const now = Math.floor(Date.now() / 1000) + tokenProvider.tokenValidTimeInSeconds;
    debug(">>> now: %d", now);
    const tokenInfo = await tokenProvider.getToken(aadServiceBusAudience);
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo!.token.should.match(
      /SharedAccessSignature sr=https%3A%2F%2Fservicebus.azure.net%2F&sig=(.*)&se=\d{10}&skn=myKeyName/g
    );
    tokenInfo!.expiresOn.should.equal(now);
  });

  it("should work as expected when created from a connection string", async function(): Promise<
    void
  > {
    const cs =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const tokenProvider = SharedKeyCredential.fromConnectionString(cs);
    tokenProvider.tokenValidTimeInSeconds.should.equal(3600);
    tokenProvider.tokenRenewalMarginInSeconds.should.equal(900);
    const now = Math.floor(Date.now() / 1000) + tokenProvider.tokenValidTimeInSeconds;
    debug(">>> now: %d", now);
    const tokenInfo = await tokenProvider.getToken(aadServiceBusAudience);
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo!.token.should.match(
      /SharedAccessSignature sr=https%3A%2F%2Fservicebus.azure.net%2F&sig=(.*)&se=\d{10}&skn=sakName/g
    );
    tokenInfo!.expiresOn.should.equal(now);
  });

  it("should throw an error if the audience is type of string[]", async function(): Promise<void> {
    const cs =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const tokenProvider = SharedKeyCredential.fromConnectionString(cs);
    tokenProvider.tokenValidTimeInSeconds.should.equal(3600);
    tokenProvider.tokenRenewalMarginInSeconds.should.equal(900);
    await tokenProvider.getToken([aadServiceBusAudience, aadEventHubsAudience]).catch((err) => {
      debug("Error", err);
      err.message.should.match(/.*audience must be of type string*/gi);
    });
  });

  it("should work as expected with custom value for audience", async function(): Promise<void> {
    const namespace = "mynamespace";
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new SharedKeyCredential(namespace, keyName, key, 2, 1);
    tokenProvider.tokenValidTimeInSeconds.should.equal(2);
    tokenProvider.tokenRenewalMarginInSeconds.should.equal(1);
    const now = Math.floor(Date.now() / 1000) + tokenProvider.tokenValidTimeInSeconds;
    debug(">>> now: %d", now);
    const tokenInfo = await tokenProvider.getToken("https://myaudience.host.mango.net/");
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo!.token.should.match(
      /SharedAccessSignature sr=https%3A%2F%2Fmyaudience.host.mango.net%2F&sig=(.*)&se=\d{10}&skn=myKeyName/g
    );
    tokenInfo!.expiresOn.should.equal(now);
  });

  it("should throw an error when renewal margin is less than or equal to valid time", function(done: any): void {
    const namespace = "mynamespace";
    const keyName = "myKeyName";
    const key = "importantValue";
    try {
      new SharedKeyCredential(namespace, keyName, key, 1, 1);
      done(new Error("This should have failed!!"));
    } catch (err) {
      err.message.should.match(
        /tokenRenewalMarginInSeconds must be less than tokenValidTimeInSeconds/g
      );
    }
    done();
  });
});

describe("IotSasTokenProvider", function(): void {
  it("should work as expected with required parameters and default values for optional parameters", async function(): Promise<
    void
  > {
    const namespace = "mynamespace";
    const keyName = "myKeyName";
    const key = "importantValue";
    const tokenProvider = new IotSasTokenProvider(namespace, keyName, key);
    tokenProvider.tokenValidTimeInSeconds.should.equal(3600);
    tokenProvider.tokenRenewalMarginInSeconds.should.equal(900);
    const now = Math.floor(Date.now() / 1000) + tokenProvider.tokenValidTimeInSeconds;
    debug(">>> now: %d", now);
    const tokenInfo = await tokenProvider.getToken(aadServiceBusAudience);
    debug(">>> Token Info is: %O", tokenInfo);
    tokenInfo!.token.should.match(
      /SharedAccessSignature sr=https%3A%2F%2Fservicebus.azure.net%2F&sig=(.*)&se=\d{10}&skn=myKeyName/g
    );
    tokenInfo!.expiresOn.should.equal(now);
  });
});
