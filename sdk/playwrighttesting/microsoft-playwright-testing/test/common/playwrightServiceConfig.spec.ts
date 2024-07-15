// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DefaultConnectOptionsConstants,
  ServiceEnvironmentVariableConstants,
} from "../../src/common/constants";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig";
import { expect } from "chai";
import sinon from "sinon";

describe("PlaywrightServiceConfig", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(console, "error");
    sandbox.stub(console, "log");
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    sandbox.restore();
  });

  it("should set service config object with default values", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS,
    );
    expect(playwrightServiceConfig.runId).to.exist;
    expect(playwrightServiceConfig.timeout).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_TIMEOUT,
    );
    expect(playwrightServiceConfig.slowMo).to.equal(DefaultConnectOptionsConstants.DEFAULT_SLOW_MO);
    expect(playwrightServiceConfig.exposeNetwork).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK,
    );
    expect(process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID]).to.equal(
      playwrightServiceConfig.runId,
    );

    delete process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_OS];
  });

  it("should set service config object with values from env variables", () => {
    process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_OS] = "windows";
    process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID] = "runId";

    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal("windows");
    expect(playwrightServiceConfig.runId).to.equal("runId");

    delete process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_OS];
  });

  it("should set service config object with values from options", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions({
      os: "windows",
      runId: "runId",
      slowMo: 100,
      timeout: 200,
      exposeNetwork: "localhost",
    });

    expect(playwrightServiceConfig.serviceOs).to.equal("windows");
    expect(playwrightServiceConfig.runId).to.equal("runId");
    expect(playwrightServiceConfig.slowMo).to.equal(100);
    expect(playwrightServiceConfig.timeout).to.equal(200);
    expect(playwrightServiceConfig.exposeNetwork).to.equal("localhost");
    expect(process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID]).to.equal(
      "runId",
    );
    expect(process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_OS]).to.equal(
      "windows",
    );

    delete process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_OS];
  });

  it("should not set service config object with options if not provided", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions();

    expect(playwrightServiceConfig.serviceOs).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS,
    );
    expect(playwrightServiceConfig.runId).to.exist;
    expect(playwrightServiceConfig.timeout).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_TIMEOUT,
    );
    expect(playwrightServiceConfig.slowMo).to.equal(DefaultConnectOptionsConstants.DEFAULT_SLOW_MO);
    expect(playwrightServiceConfig.exposeNetwork).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK,
    );
    expect(process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID]).to.equal(
      playwrightServiceConfig.runId,
    );

    delete process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariableConstants.PLAYWRIGHT_SERVICE_OS];
  });
});
