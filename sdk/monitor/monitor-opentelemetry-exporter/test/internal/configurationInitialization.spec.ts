// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const configurationMocks = vi.hoisted(() => ({
  initialize: vi.fn(),
}));

vi.mock("../../src/_configuration/configurationManager.js", () => ({
  ConfigurationManager: {
    getInstance: vi.fn(() => configurationMocks),
  },
}));

import type { AzureMonitorExporterOptions } from "../../src/config.js";
import { AzureMonitorBaseExporter } from "../../src/export/base.js";
import { packageVersion } from "../../src/utils/constants/applicationinsights.js";

class TestExporter extends AzureMonitorBaseExporter {
  public constructor(options: AzureMonitorExporterOptions, isStatsbeatExporter = false) {
    super(options, isStatsbeatExporter);
  }
}

describe("OneSettings exporter initialization", () => {
  const instrumentationKey = "1aa11111-bbbb-1ccc-8ddd-eeeeffff3333";

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("FUNCTIONS_WORKER_RUNTIME", "");
    vi.stubEnv("WEBSITE_SITE_NAME", "");
    vi.stubEnv("AKS_ARM_NAMESPACE_ID", "");
    vi.stubEnv("KUBERNETES_SERVICE_HOST", "");
    vi.stubEnv("AZURE_MONITOR_AUTO_ATTACH", "true");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("initializes OneSettings with the standalone exporter profile", () => {
    new TestExporter({
      connectionString:
        `InstrumentationKey=${instrumentationKey};` +
        "Location=westeurope;EndpointSuffix=applicationinsights.azure.com",
    });

    expect(configurationMocks.initialize).toHaveBeenCalledOnce();
    expect(configurationMocks.initialize).toHaveBeenCalledWith({
      os: process.platform === "win32" ? "windows" : process.platform,
      rp: "unknown",
      attach: "integratedauto",
      version: packageVersion,
      component: "ext",
      region: "westeurope",
      ikey: instrumentationKey,
    });
  });

  it("does not initialize OneSettings for the internal Statsbeat exporter", () => {
    new TestExporter(
      {
        connectionString: `InstrumentationKey=${instrumentationKey}`,
      },
      true,
    );

    expect(configurationMocks.initialize).not.toHaveBeenCalled();
  });

  it("extracts the region from an unstamped regional ingestion endpoint", () => {
    new TestExporter({
      connectionString:
        `InstrumentationKey=${instrumentationKey};` +
        "IngestionEndpoint=https://westus.in.applicationinsights.azure.com",
    });

    expect(configurationMocks.initialize).toHaveBeenCalledWith(
      expect.objectContaining({ region: "westus" }),
    );
  });
});
