// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "@azure-tools/test-utils";
import sinon from "sinon";
import * as utils from "../../src/utils/utils";
import {
  EntraIdAccessTokenConstants,
  ServiceEnvironmentVariable,
} from "../../src/common/constants";
const playwrightServiceEntra = require("../../src/core/playwrightServiceEntra").default;

describe("playwrightServiceEntra", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, "error").returns(); // Mock console.error
    sandbox.stub(console, "log").returns(); // Mock console.log
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL] =
      "wss://eastus.playwright.microsoft.com/accounts/1234/browsers";
  });

  afterEach(() => {
    sandbox.restore();
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_URL];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
  });

  it("should fetch entra id access token and setup rotation handler", async () => {
    sandbox
      .stub(playwrightServiceEntra["_entraIdAccessToken"], "fetchEntraIdAccessToken")
      .resolves(true);
    sandbox.stub(playwrightServiceEntra, "entraIdGlobalSetupRotationHandler");

    await playwrightServiceEntra.globalSetup();

    expect(playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken.calledOnce).to.be
      .true;
    expect(playwrightServiceEntra.entraIdGlobalSetupRotationHandler.calledOnce).to.be.true;
  });

  it("should validate mpt PAT if entra id access token fetch fails and does not setup rotation handler", async () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = "test";
    sandbox.stub(utils, "parseJwt").returns({ exp: new Date().getTime() / 1000 + 10000 });
    sandbox
      .stub(playwrightServiceEntra["_entraIdAccessToken"], "fetchEntraIdAccessToken")
      .resolves(false);
    sandbox.stub(playwrightServiceEntra, "entraIdGlobalSetupRotationHandler");

    await playwrightServiceEntra.globalSetup();

    expect(playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken.calledOnce).to.be
      .true;
    expect(playwrightServiceEntra.entraIdGlobalSetupRotationHandler.calledOnce).to.be.false;
  });

  it("should be no-op if entra id access token rotation interval doesn't exist", () => {
    const clearIntervalStub = sandbox.stub(global, "clearInterval");

    playwrightServiceEntra.globalTeardown();

    expect(clearIntervalStub.called).to.be.false;
  });

  it("should clear entra id access token rotation interval", () => {
    const intervalId = 1;
    const clearIntervalStub = sandbox.stub(global, "clearInterval");

    playwrightServiceEntra["_entraIdAccessTokenRotationInterval"] = intervalId;
    playwrightServiceEntra.globalTeardown();

    expect(clearIntervalStub.calledWith(intervalId)).to.be.true;
  });

  it("should setup entra id access token rotation handler", () => {
    const newInterval = setInterval(() => {}, 100000);
    const setIntervalStub = sandbox.stub(global, "setInterval").callsFake(() => newInterval);

    playwrightServiceEntra.entraIdGlobalSetupRotationHandler();

    expect(setIntervalStub.called).to.be.true;
    expect(
      setIntervalStub.calledWith(
        playwrightServiceEntra.entraIdAccessTokenRotation,
        EntraIdAccessTokenConstants.ROTATION_INTERVAL_PERIOD_IN_MINUTES * 60 * 1000,
      ),
    ).to.be.true;
    expect(playwrightServiceEntra["_entraIdAccessTokenRotationInterval"]).to.equal(newInterval);
    clearInterval(newInterval);
  });

  it("should rotate entra id access token if needed", async () => {
    sandbox
      .stub(playwrightServiceEntra["_entraIdAccessToken"], "doesEntraIdAccessTokenNeedRotation")
      .returns(true);
    sandbox
      .stub(playwrightServiceEntra["_entraIdAccessToken"], "fetchEntraIdAccessToken")
      .resolves(true);

    await playwrightServiceEntra.entraIdAccessTokenRotation();

    expect(
      playwrightServiceEntra["_entraIdAccessToken"].doesEntraIdAccessTokenNeedRotation.calledOnce,
    ).to.be.true;
    expect(playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken.calledOnce).to.be
      .true;
  });

  it("should not rotate entra id access token if not needed", async () => {
    sandbox
      .stub(playwrightServiceEntra["_entraIdAccessToken"], "doesEntraIdAccessTokenNeedRotation")
      .returns(false);
    sandbox.stub(playwrightServiceEntra["_entraIdAccessToken"], "fetchEntraIdAccessToken");

    await playwrightServiceEntra.entraIdAccessTokenRotation();

    expect(
      playwrightServiceEntra["_entraIdAccessToken"].doesEntraIdAccessTokenNeedRotation.calledOnce,
    ).to.be.true;
    expect(playwrightServiceEntra["_entraIdAccessToken"].fetchEntraIdAccessToken.called).to.be
      .false;
  });
});
