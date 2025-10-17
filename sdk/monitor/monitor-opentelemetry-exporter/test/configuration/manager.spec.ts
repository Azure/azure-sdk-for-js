// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi, beforeEach, afterEach, afterAll } from "vitest";
import { diag } from "@opentelemetry/api";
import type { OneSettingsResponse } from "../../src/configuration/utils.js";
import {
  ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS,
  ONE_SETTINGS_JAVASCRIPT_KEY,
} from "../../src/Declarations/Constants.js";

vi.mock("../../src/configuration/worker.js", async () => {
  const actual = await vi.importActual<typeof import("../../src/configuration/worker.js")>(
    "../../src/configuration/worker.js",
  );
  const instances: ConfigurationWorkerStub[] = [];

  class ConfigurationWorkerStub {
    public shutdown = vi.fn();
    public readonly refreshCallback: () => Promise<number>;
    public readonly initialInterval: number | undefined;

    constructor(callback: () => Promise<number>, interval?: number) {
      this.refreshCallback = callback;
      this.initialInterval = interval;
      instances.push(this);
    }

    public async trigger(): Promise<number> {
      return this.refreshCallback();
    }
  }

  return {
    ...actual,
    ConfigurationWorker: ConfigurationWorkerStub,
    __workerInstances: instances,
  };
});

vi.mock("../../src/configuration/utils.js", async () => {
  const actual = await vi.importActual<typeof import("../../src/configuration/utils.js")>(
    "../../src/configuration/utils.js",
  );
  return {
    ...actual,
    makeOneSettingsRequest: vi.fn(),
  };
});

import {
  ConfigurationManager,
  updateConfigurationAndGetRefreshInterval,
} from "../../src/configuration/configuration.js";
import { makeOneSettingsRequest } from "../../src/configuration/utils.js";

describe("ConfigurationManager", () => {
  const makeRequestMock = vi.mocked(makeOneSettingsRequest);
  const warnSpy = vi.spyOn(diag, "warn");

  beforeEach(() => {
    makeRequestMock.mockReset();
    warnSpy.mockClear();
  });

  afterEach(() => {
    warnSpy.mockReset();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it("should follow the singleton pattern", () => {
    const manager1 = ConfigurationManager.getInstance();
    const manager2 = ConfigurationManager.getInstance();
    expect(manager1).toBe(manager2);
    manager1.shutdown();
  });

  it("should update state from OneSettings response", async () => {
    const response: OneSettingsResponse = {
      etag: "etag",
      refreshInterval: 1200,
      settings: { feature: "enabled" },
      version: 2,
      statusCode: 200,
    };
    makeRequestMock.mockResolvedValue(response);

    const manager = ConfigurationManager.getInstance();
    const interval = await manager.getConfigurationAndRefreshInterval({
      namespaces: ONE_SETTINGS_JAVASCRIPT_KEY,
    });

    expect(interval).toBe(1200);
    expect(manager.getCache()).toMatchObject({ feature: "enabled" });
    expect(makeRequestMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ namespaces: ONE_SETTINGS_JAVASCRIPT_KEY }),
      expect.any(Object),
    );

    manager.shutdown();
  });

  it("should warn when version decreases", async () => {
    const responseSequence: OneSettingsResponse[] = [
      {
        etag: "etag-1",
        refreshInterval: ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS,
        settings: {},
        version: 5,
        statusCode: 200,
      },
      {
        etag: "etag-2",
        refreshInterval: ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS,
        settings: {},
        version: 3,
        statusCode: 200,
      },
    ];
    makeRequestMock
      .mockResolvedValueOnce(responseSequence[0])
      .mockResolvedValueOnce(responseSequence[1]);

    const manager = ConfigurationManager.getInstance();
    await manager.getConfigurationAndRefreshInterval({ namespaces: ONE_SETTINGS_JAVASCRIPT_KEY });
    await manager.getConfigurationAndRefreshInterval({ namespaces: ONE_SETTINGS_JAVASCRIPT_KEY });

    expect(warnSpy).toHaveBeenCalledWith(
      "Latest CHANGE_VERSION is less than the current stored version, no configurations updated.",
    );
    manager.shutdown();
  });

  it("should use helper to update configuration", async () => {
    const response: OneSettingsResponse = {
      etag: "etag",
      refreshInterval: 1500,
      settings: {},
      version: 1,
      statusCode: 200,
    };
    makeRequestMock.mockResolvedValue(response);

    const interval = await updateConfigurationAndGetRefreshInterval();
    expect(interval).toBe(1500);
    ConfigurationManager.getInstance().shutdown();
  });
});
