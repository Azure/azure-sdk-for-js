// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DefaultConnectOptionsConstants,
  InternalEnvironmentVariables,
} from "../../src/common/constants.js";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig.js";
import { getAndSetRunId } from "../../src/utils/utils.js";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("PlaywrightServiceConfig", () => {
  beforeEach(() => {
    vi.spyOn(console, "error");
    vi.spyOn(console, "log");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should set service config object with default values", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS,
    );
    expect(playwrightServiceConfig.runName).to.equal("");
    expect(playwrightServiceConfig.runId).to.equal("");
    expect(playwrightServiceConfig.timeout).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_TIMEOUT,
    );
    expect(playwrightServiceConfig.slowMo).to.equal(DefaultConnectOptionsConstants.DEFAULT_SLOW_MO);
    expect(playwrightServiceConfig.exposeNetwork).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK,
    );
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).toBeUndefined();

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_OS];
  });

  it("should set service config object with values from env variables", () => {
    process.env[InternalEnvironmentVariables.MPT_SERVICE_OS] = "windows";
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] = "runName";
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = "runId";

    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal("windows");
    expect(playwrightServiceConfig.runId).to.equal("runId");
    expect(playwrightServiceConfig.runName).to.equal("runName");

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_OS];
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
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal("runId");
    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_OS]).to.equal("windows");

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_OS];
  });

  it("should not set service config object with options if not provided", () => {
    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions();

    expect(playwrightServiceConfig.serviceOs).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS,
    );
    expect(playwrightServiceConfig.runId).toBeDefined();
    expect(playwrightServiceConfig.runName).to.equal("");
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

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_OS];
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
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_OS];
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
