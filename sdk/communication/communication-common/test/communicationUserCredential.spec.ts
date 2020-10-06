// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import { assert, use } from "chai";
import { isNode } from "@azure/core-http";
import { AbortSignal } from "@azure/abort-controller";
import { AzureCommunicationUserCredential } from "../src/communicationUserCredential";

use(chaiAsPromised);

declare function btoa(stringToEncode: string): string;

const generateToken = (validForMinutes: number): string => {
  const expiresOn = (Date.now() + validForMinutes * 60 * 1000) / 1000;
  const tokenString = JSON.stringify({ exp: expiresOn });
  const base64Token = isNode ? Buffer.from(tokenString).toString("base64") : btoa(tokenString);
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${base64Token}.adM-ddBZZlQ1WlN3pdPBOF5G4Wh9iZpxNP_fSvpF4cWs`;
};

const exposeInternalTimeout = (
  userCredential: AzureCommunicationUserCredential
): ReturnType<typeof setTimeout> => {
  return ((userCredential as any).userCredential as any).activeTimeout;
};

const exposeInternalUpdatePromise = async (
  userCredential: AzureCommunicationUserCredential
): Promise<void> => {
  const internalPromise = ((userCredential as any).userCredential as any).activeTokenUpdating;
  if (internalPromise) {
    await internalPromise;
  }
};

describe("CommunicationUserCredential", () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it("handles valid JWT strings", async () => {
    new AzureCommunicationUserCredential(generateToken(60));
  });

  it("throws if non-JWT token", async () => {
    assert.throws(() => new AzureCommunicationUserCredential("IAmNotAToken"), /Invalid token/);
  });

  it("throws if non-JWT passed as lambda", async () => {
    await assert.isRejected(
      new AzureCommunicationUserCredential({
        tokenRefresher: async () => "IAmNotAToken"
      }).getToken()
    );
  });

  it("returns token as expected", async () => {
    const token = generateToken(60);
    const userCredential = new AzureCommunicationUserCredential(token);
    const tokenResult = (await userCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
  });

  it("returns token as expected when using lambda", async () => {
    const token = generateToken(60);
    const tokenRefresher = sinon.stub().resolves(token);
    const userCredential = new AzureCommunicationUserCredential({
      tokenRefresher
    });
    const tokenResult = (await userCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
    sinon.assert.calledOnce(tokenRefresher);
  });

  it("uses initial token as expected", async () => {
    const initialToken = generateToken(60);
    const tokenRefresher = sinon.stub().resolves(generateToken(120));
    const userCredential = new AzureCommunicationUserCredential({
      tokenRefresher,
      initialToken,
      refreshProactively: true
    });
    const tokenResult = (await userCredential.getToken()).token;
    assert.strictEqual(tokenResult, initialToken);
    sinon.assert.notCalled(tokenRefresher);
  });

  it("no proactive refresh, accepts expired token", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(-1));
    new AzureCommunicationUserCredential({
      tokenRefresher
    });
    clock.tick(5 * 60 * 1000);
    sinon.assert.notCalled(tokenRefresher);
  });

  it("with proactive refresh, passing an expired token triggers immediate refresh", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(-1));
    new AzureCommunicationUserCredential({
      tokenRefresher,
      refreshProactively: true
    });
    clock.tick(5 * 60 * 1000);
    sinon.assert.calledOnce(tokenRefresher);
  });

  it("returns expired token when not using a lambda", async () => {
    const token = generateToken(-1);
    const userCredential = new AzureCommunicationUserCredential(token);
    const tokenResult = (await userCredential.getToken()).token;
    assert.strictEqual(tokenResult, token);
  });

  it("passes abortSignal through to tokenRefresher", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(60));
    const userCredential = new AzureCommunicationUserCredential({
      tokenRefresher
    });
    const abortSignal = AbortSignal.none;
    userCredential.getToken(abortSignal);
    sinon.assert.calledOnceWithExactly(tokenRefresher, abortSignal);
  });

  it("throws if disposed", async () => {
    const withStatic = new AzureCommunicationUserCredential(generateToken(60));
    const withLambda = new AzureCommunicationUserCredential({
      tokenRefresher: async () => generateToken(60)
    });
    withStatic.dispose();
    withLambda.dispose();
    await assert.isRejected(withStatic.getToken());
    await assert.isRejected(withLambda.getToken());
  });

  it("doesn't swallow error from tokenrefresher", async () => {
    const tokenRefresher = sinon.stub().throws(new Error("No token for you!"));
    const userCredential = new AzureCommunicationUserCredential({
      tokenRefresher
    });
    await assert.isRejected(userCredential.getToken());
  });

  it("requests new token when token is about to expire", async () => {
    const token = generateToken(20);
    const newToken = generateToken(60);
    const tokenRefresher = sinon.stub().resolves(token);
    const userCredential = new AzureCommunicationUserCredential({ tokenRefresher });

    const tokenResult = await userCredential.getToken();
    assert.strictEqual(tokenResult.token, token);

    tokenRefresher.resolves(newToken);
    // go into soon to expire window
    clock.tick(19 * 60 * 1000);
    const secondTokenResult = await userCredential.getToken();

    // returns old token because it's still valid
    assert.strictEqual(secondTokenResult.token, token);

    clock.tick(5 * 60 * 1000);
    // now it returns new token
    const thirdTokenResult = await userCredential.getToken();
    assert.strictEqual(thirdTokenResult.token, newToken);

    sinon.assert.calledTwice(tokenRefresher);
  });

  it("proactively refreshes token when it is about to expire", async () => {
    const token = (): string => generateToken(20);
    const tokenRefresher = sinon.stub().resolves(token());
    new AzureCommunicationUserCredential({
      tokenRefresher,
      refreshProactively: true,
      initialToken: token()
    });

    // go into soon to expire window
    clock.tick(19 * 60 * 1000);
    sinon.assert.calledOnce(tokenRefresher);
  });

  it("repeats proactive refreshing", async () => {
    const token = (): string => generateToken(20);
    const tokenRefresher = sinon.stub().resolves(token());
    const userCredential = new AzureCommunicationUserCredential({
      tokenRefresher,
      refreshProactively: true,
      initialToken: token()
    });

    const internalTimeout = exposeInternalTimeout(userCredential);
    // go into soon to expire window
    clock.tick(19 * 60 * 1000);

    await exposeInternalUpdatePromise(userCredential);
    const newInternalTimeout = exposeInternalTimeout(userCredential);

    assert.isDefined(internalTimeout);
    assert.isDefined(newInternalTimeout);
    assert.notEqual(internalTimeout, newInternalTimeout);
  });

  it("dispose cancels timer", async () => {
    const token = (): string => generateToken(20);
    const tokenRefresher = sinon.stub().resolves(token());
    const userCredential = new AzureCommunicationUserCredential({
      tokenRefresher,
      refreshProactively: true,
      initialToken: token()
    });

    userCredential.dispose();
    // go into soon to expire window
    clock.tick(19 * 60 * 1000);
    sinon.assert.notCalled(tokenRefresher);
  });

  it("multiple calls to getToken call tokenRefresher only once", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(60));
    const userCredential = new AzureCommunicationUserCredential({ tokenRefresher });

    for (let i = 0; i < 10; i++) {
      await userCredential.getToken();
    }

    sinon.assert.calledOnce(tokenRefresher);
  });

  it("calls tokenRefresher only once when proactive refreshing is in progress", async () => {
    const tokenRefresher = sinon.stub().resolves(generateToken(20));
    const userCredential = new AzureCommunicationUserCredential({
      tokenRefresher,
      refreshProactively: true
    });

    // go into soon to expire window
    clock.tick(19 * 60 * 1000);
    await userCredential.getToken();
    sinon.assert.calledOnce(tokenRefresher);
  });
});
