// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, use } from "chai";
import { AbortSignal } from "@azure/abort-controller";
import { AzureCommunicationTokenCredential } from "../src/azureCommunicationTokenCredential";
import chaiAsPromised from "chai-as-promised";
import { isNode } from "../src/credential/isNode";
import sinon from "sinon";

use(chaiAsPromised);

declare function btoa(stringToEncode: string): string;

const generateToken = (validForMinutes: number): string => {
  const expiresOn = (Date.now() + validForMinutes * 60 * 1000) / 1000;
  const tokenString = JSON.stringify({ exp: expiresOn });
  const base64Token = isNode ? Buffer.from(tokenString).toString("base64") : btoa(tokenString);
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Token}.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs`;
};

const exposeInternalTimeout = (
  tokenCredential: AzureCommunicationTokenCredential
): ReturnType<typeof setTimeout> => {
  return ((tokenCredential as any).tokenCredential as any).activeTimeout;
};

const exposeInternalUpdatePromise = async (
  tokenCredential: AzureCommunicationTokenCredential
): Promise<void> => {
  const internalPromise = ((tokenCredential as any).tokenCredential as any).activeTokenUpdating;
  if (internalPromise) {
    await internalPromise;
  }
};

describe("CommunicationTokenCredential", () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it("handles valid JWT strings", async () => {
    new AzureCommunicationTokenCredential(generateToken(60));
  });

  it("throws if non-JWT token", async () => {
    assert.throws(() => new AzureCommunicationTokenCredential("IAmNotAToken"), /Invalid token/);
  });

  it("throws if non-JWT passed as lambda", async () => {
    await assert.isRejected(
      new AzureCommunicationTokenCredential({
        tokenRefresher: async () => "IAmNotAToken",
      }).getToken()
    );
  });

  it("returns token as expected", async () => {
    const token = generateToken(60);
    const tokenCredential = new AzureCommunicationTokenCredential(token);
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
  });

  it("returns token as expected when using lambda", async () => {
    const token = generateToken(60);
    const tokenRefresher = sinon.stub().resolves(token);
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
    });
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
    sinon.assert.calledOnce(tokenRefresher);
  });

  it("uses initial token as expected", async () => {
    const token = generateToken(60);
    const tokenRefresher = sinon.stub().resolves(generateToken(120));
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      token,
      refreshProactively: true,
    });
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
    sinon.assert.notCalled(tokenRefresher);
  });

  it("no proactive refresh, accepts expired token", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(-1));
    new AzureCommunicationTokenCredential({
      tokenRefresher,
    });
    clock.tick(5 * 60 * 1000);
    sinon.assert.notCalled(tokenRefresher);
  });

  it("with proactive refresh, passing an expired token to constructor triggers immediate refresh", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(30));
    new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: generateToken(-1),
    });
    clock.tick(5 * 60 * 1000);

    sinon.assert.calledOnce(tokenRefresher);
  });

  it("throws if tokenRefresher returns an expired token", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(-1));
    const credential = new AzureCommunicationTokenCredential({
      tokenRefresher: tokenRefresher,
    });
    clock.tick(5 * 60 * 1000);
    await assert.isRejected(
      credential.getToken(),
      Error,
      "The token returned from the tokenRefresher is expired."
    );
    sinon.assert.calledOnce(tokenRefresher);
  });

  it("returns expired token when not using a lambda", async () => {
    const token = generateToken(-1);
    const tokenCredential = new AzureCommunicationTokenCredential(token);
    const tokenResult = (await tokenCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
  });

  it("passes abortSignal through to tokenRefresher", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(60));
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
    });
    const options = { abortSignal: AbortSignal.none };
    tokenCredential.getToken(options);
    sinon.assert.calledOnceWithExactly(tokenRefresher, options.abortSignal);
  });

  it("throws if disposed", async () => {
    const withStatic = new AzureCommunicationTokenCredential(generateToken(60));
    const withLambda = new AzureCommunicationTokenCredential({
      tokenRefresher: async () => generateToken(60),
    });
    withStatic.dispose();
    withLambda.dispose();
    await assert.isRejected(withStatic.getToken());
    await assert.isRejected(withLambda.getToken());
  });

  it("doesn't swallow error from tokenRefresher", async () => {
    const tokenRefresher = sinon.stub().throws(new Error("No token for you!"));
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
    });
    await assert.isRejected(tokenCredential.getToken());
  });

  it("requests new token when token is about to expire", async () => {
    const token = generateToken(20);
    const newToken = generateToken(60);
    const tokenRefresher = sinon.stub().resolves(token);
    const tokenCredential = new AzureCommunicationTokenCredential({ tokenRefresher });

    const tokenResult = await tokenCredential.getToken();
    assert.strictEqual(tokenResult.token, token);

    tokenRefresher.resolves(newToken);
    // go into the soon-to-expire window
    clock.tick(19 * 60 * 1000);
    const secondTokenResult = await tokenCredential.getToken();

    // returns old token because it's still valid
    assert.strictEqual(secondTokenResult.token, token);

    clock.tick(5 * 60 * 1000);
    // now it returns new token
    const thirdTokenResult = await tokenCredential.getToken();
    assert.strictEqual(thirdTokenResult.token, newToken);

    sinon.assert.calledTwice(tokenRefresher);
  });

  it("proactively refreshes token when it is about to expire", async () => {
    const token = (): string => generateToken(20);
    const tokenRefresher = sinon.stub().resolves(token());
    new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: token(),
    });

    // go into the soon-to-expire window
    clock.tick(19 * 60 * 1000);
    sinon.assert.calledOnce(tokenRefresher);
  });

  it("repeats proactive refreshing", async () => {
    const token = (): string => generateToken(20);
    const tokenRefresher = sinon.stub().resolves(token());
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: token(),
    });

    const internalTimeout = exposeInternalTimeout(tokenCredential);
    // go into the soon-to-expire window
    clock.tick(19 * 60 * 1000);

    await exposeInternalUpdatePromise(tokenCredential);
    const newInternalTimeout = exposeInternalTimeout(tokenCredential);

    assert.isDefined(internalTimeout);
    assert.isDefined(newInternalTimeout);
    assert.notEqual(internalTimeout, newInternalTimeout);
  });

  it("dispose cancels timer", async () => {
    const token = (): string => generateToken(20);
    const tokenRefresher = sinon.stub().resolves(token());
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: token(),
    });

    tokenCredential.dispose();
    // go into the soon-to-expire window
    clock.tick(19 * 60 * 1000);
    sinon.assert.notCalled(tokenRefresher);
  });

  it("multiple calls to getToken call tokenRefresher only once", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(60));
    const tokenCredential = new AzureCommunicationTokenCredential({ tokenRefresher });

    for (let i = 0; i < 10; i++) {
      await tokenCredential.getToken();
    }

    sinon.assert.calledOnce(tokenRefresher);
  });

  it("calls tokenRefresher only once when proactive refreshing is in progress", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(20));
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
    });

    // go into the soon-to-expire window
    clock.tick(19 * 60 * 1000);
    await tokenCredential.getToken();
    sinon.assert.calledOnce(tokenRefresher);
  });

  it("applies fractional backoff when the token is about to expire", async () => {
    const defaultRefreshAfterLifetimePercentage = 0.5;
    const tokenExpirationMinutes = 20;
    const expectedPreBackOffCallCount = 1;
    const expectedTotalCallCount = Math.floor(
      Math.log(tokenExpirationMinutes * 60) / Math.log(1 / defaultRefreshAfterLifetimePercentage)
    );
    const staticToken = generateToken(tokenExpirationMinutes);
    const tokenRefresher = sinon.stub().resolves(((): string => staticToken)()); // keep returning the same token for the duration of the test
    const tokenCredential = new AzureCommunicationTokenCredential({
      tokenRefresher,
      refreshProactively: true,
      token: staticToken,
    });

    const newToken = await tokenCredential.getToken();

    // go into the soon-to-expire window
    for (let i = 0; i < 10 * 60; i++) {
      // perform token refreshing & scheduling
      await exposeInternalUpdatePromise(tokenCredential);
      clock.tick(1000);
    }

    // expect the token to be refreshed only once within the first 10 minutes
    sinon.assert.callCount(tokenRefresher, expectedPreBackOffCallCount);

    // iterate until the penultimate second of the token expiration
    // to prevent an exception being thrown due to the token being expired
    while (Math.floor((newToken.expiresOnTimestamp - Date.now()) / 1000) > 1) {
      // perform token refreshing & scheduling
      await exposeInternalUpdatePromise(tokenCredential);
      clock.tick(1000);
    }

    // expect the token to be refreshed with an increasing frequency in the remaining 10 minutes
    sinon.assert.callCount(tokenRefresher, expectedTotalCallCount);
  });
});
