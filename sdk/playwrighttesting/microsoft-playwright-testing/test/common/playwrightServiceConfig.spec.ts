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
import { getAndSetRunId } from "../../src/utils/utils";

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
    expect(playwrightServiceConfig.runId).to.equal("");
    expect(playwrightServiceConfig.timeout).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_TIMEOUT,
    );
    expect(playwrightServiceConfig.slowMo).to.equal(DefaultConnectOptionsConstants.DEFAULT_SLOW_MO);
    expect(playwrightServiceConfig.exposeNetwork).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK,
    );
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.undefined;

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS];
  });

  it("should set service config object with values from env variables", () => {
    process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS] = "windows";
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = "runId";

    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal("windows");
    expect(playwrightServiceConfig.runId).to.equal("runId");

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS];
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
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal("runId");
    expect(process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS]).to.equal("windows");

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS];
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
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(
      playwrightServiceConfig.runId,
    );

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_OS];
  });
  it("should set runId from options if provided and environment variable is not set", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions({
      runId: "custom-run-id",
    });
    expect(playwrightServiceConfig.runId).to.equal("custom-run-id");
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal("custom-run-id");
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
  });
  it("should generate runId if not provided in options and environment variable is not set", () => {
    const runId = getAndSetRunId();
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions({
      runId: runId,
    });
    expect(playwrightServiceConfig.runId).to.be.a("string");
    expect(playwrightServiceConfig.runId).to.equal(runId);
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(runId);
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
  });
  it("should use runId from environment variable if already set", () => {
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = "existing-run-id";
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions({
      runId: "option-run-id",
    });
    expect(playwrightServiceConfig.runId).to.equal("existing-run-id");
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(
      "existing-run-id",
    );
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
  });
});
