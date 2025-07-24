// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Constants,
  DefaultConnectOptionsConstants,
  InternalEnvironmentVariables,
} from "../../src/common/constants.js";
import { PlaywrightServiceConfig } from "../../src/common/playwrightServiceConfig.js";
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
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS,
    );
    expect(playwrightServiceConfig.runName).to.equal("");

    const firstRunId = playwrightServiceConfig.runId;
    expect(firstRunId).to.be.a("string");
    expect(firstRunId.length).to.be.greaterThan(0);

    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(firstRunId);

    expect(playwrightServiceConfig.timeout).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_TIMEOUT,
    );
    expect(playwrightServiceConfig.apiVersion).to.equal(Constants.LatestAPIVersion);
    expect(playwrightServiceConfig.slowMo).to.equal(DefaultConnectOptionsConstants.DEFAULT_SLOW_MO);
    expect(playwrightServiceConfig.exposeNetwork).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK,
    );

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_OS];
  });

  it("should set service config object with values from env variables", () => {
    process.env[InternalEnvironmentVariables.MPT_SERVICE_OS] = "windows";
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME] = "runName";
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = "runId";
    process.env[InternalEnvironmentVariables.MPT_API_VERSION] = "api-version";

    const playwrightServiceConfig = new PlaywrightServiceConfig();

    expect(playwrightServiceConfig.serviceOs).to.equal("windows");

    const currentRunId = playwrightServiceConfig.runId;
    expect(currentRunId).to.be.a("string");
    expect(currentRunId.length).to.be.greaterThan(0);
    expect(currentRunId).to.not.equal("runId");

    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(currentRunId);

    expect(playwrightServiceConfig.runName).to.equal("runName");
    expect(playwrightServiceConfig.apiVersion).to.equal("api-version");

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_OS];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
    delete process.env[InternalEnvironmentVariables.MPT_API_VERSION];
  });

  it("should set service config object with values from options", () => {
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];

    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions({
      os: "windows",
      runName: "runName",
      slowMo: 100,
      timeout: 200,
      exposeNetwork: "localhost",
      apiVersion: "sample" as "2025-07-01-preview",
    });

    expect(playwrightServiceConfig.serviceOs).to.equal("windows");

    const currentRunId = playwrightServiceConfig.runId;
    expect(currentRunId).to.be.a("string");
    expect(currentRunId.length).to.be.greaterThan(0);

    expect(playwrightServiceConfig.runName).to.equal("runName");
    expect(playwrightServiceConfig.slowMo).to.equal(100);
    expect(playwrightServiceConfig.timeout).to.equal(200);
    expect(playwrightServiceConfig.exposeNetwork).to.equal("localhost");
    expect(playwrightServiceConfig.apiVersion).to.equal("sample");

    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(currentRunId);

    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_OS]).to.equal("windows");
    expect(process.env[InternalEnvironmentVariables.MPT_API_VERSION]).to.equal("sample");

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_NAME];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_OS];
    delete process.env[InternalEnvironmentVariables.MPT_API_VERSION];
  });

  it("should not set service config object with options if not provided", () => {
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];

    const playwrightServiceConfig = new PlaywrightServiceConfig();
    playwrightServiceConfig.setOptions();

    expect(playwrightServiceConfig.serviceOs).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_SERVICE_OS,
    );

    const currentRunId = playwrightServiceConfig.runId;
    expect(currentRunId).to.be.a("string");
    expect(currentRunId.length).to.be.greaterThan(0);

    expect(playwrightServiceConfig.runName).to.equal("");
    expect(playwrightServiceConfig.timeout).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_TIMEOUT,
    );
    expect(playwrightServiceConfig.slowMo).to.equal(DefaultConnectOptionsConstants.DEFAULT_SLOW_MO);
    expect(playwrightServiceConfig.exposeNetwork).to.equal(
      DefaultConnectOptionsConstants.DEFAULT_EXPOSE_NETWORK,
    );
    expect(playwrightServiceConfig.apiVersion).to.equal(Constants.LatestAPIVersion);

    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(currentRunId);

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
  it("should generate runId automatically when environment variable is not set", () => {
    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];

    const playwrightServiceConfig = new PlaywrightServiceConfig();

    const currentRunId = playwrightServiceConfig.runId;
    expect(currentRunId).to.be.a("string");
    expect(currentRunId.length).to.be.greaterThan(0);

    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(currentRunId);

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
  });

  it("should use the cached runId after first access", () => {
    process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID] = "existing-run-id";

    const playwrightServiceConfig = new PlaywrightServiceConfig();

    const firstRunId = playwrightServiceConfig.runId;
    expect(firstRunId).to.be.a("string");
    expect(firstRunId).to.not.equal("existing-run-id");

    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(firstRunId);

    const secondRunId = playwrightServiceConfig.runId;
    expect(secondRunId).to.equal(firstRunId);

    expect(process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID]).to.equal(firstRunId);

    delete process.env[InternalEnvironmentVariables.MPT_SERVICE_RUN_ID];
  });
});
