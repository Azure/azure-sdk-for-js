// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DefaultConnectOptionsConstants,
  InternalEnvironmentVariables,
  ServiceEnvironmentVariable,
} from "../../src/common/constants";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig";
import { expect } from "@azure-tools/test-utils";
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
    expect(playwrightServiceConfig.runName).to.be.undefined;
    expect(playwrightServiceConfig.timeout).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_TIMEOUT,
    );
    expect(playwrightServiceConfig.slowMo).to.equal(DefaultConnectOptionsConstants.DEFAULT_SLOW_MO);
    expect(playwrightServiceConfig.exposeNetwork).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK,
    );
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID]).to.equal(
      playwrightServiceConfig.runId,
    );

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS];
  });

  it("should set service config object with values from env variables", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS] = "windows";
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID] = "runId";
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] = "runName";
    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal("windows");
    expect(playwrightServiceConfig.runId).to.equal("runId");
    expect(playwrightServiceConfig.runName).to.equal("runName");

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
  });

  it("should set service config object with values from options", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions({
      os: "windows",
      runId: "runId",
      runName: "runName",
      slowMo: 100,
      timeout: 200,
      exposeNetwork: "localhost",
    });

    expect(playwrightServiceConfig.serviceOs).to.equal("windows");
    expect(playwrightServiceConfig.runId).to.equal("runId");
    expect(playwrightServiceConfig.runName).to.equal("runName");
    expect(playwrightServiceConfig.slowMo).to.equal(100);
    expect(playwrightServiceConfig.timeout).to.equal(200);
    expect(playwrightServiceConfig.exposeNetwork).to.equal("localhost");
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID]).to.equal("runId");
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS]).to.equal("windows");

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS];
  });

  it("should not set service config object with options if not provided", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions();

    expect(playwrightServiceConfig.serviceOs).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS,
    );
    expect(playwrightServiceConfig.runId).to.exist;
    expect(playwrightServiceConfig.runName).to.be.undefined;
    expect(playwrightServiceConfig.timeout).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_TIMEOUT,
    );
    expect(playwrightServiceConfig.slowMo).to.equal(DefaultConnectOptionsConstants.DEFAULT_SLOW_MO);
    expect(playwrightServiceConfig.exposeNetwork).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK,
    );
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID]).to.equal(
      playwrightServiceConfig.runId,
    );

    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS];
  });
  it("should set runName from options if provided and environment variable is not set", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions({
      runName: "custom-run-name",
    });
    expect(playwrightServiceConfig.runName).to.equal("custom-run-name");
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME]).to.equal(
      "custom-run-name",
    );
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
  });
  it("should use runName from environment variable if already set", () => {
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] = "existing-run-name";
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions();

    expect(playwrightServiceConfig.runName).to.equal("existing-run-name");
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME]).to.equal(
      "existing-run-name",
    );
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
  });
});
