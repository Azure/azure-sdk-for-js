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

  it.each([
    ["https://westus.in.applicationinsights.azure.com", "westus"],
    ["https://westus-1.in.applicationinsights.azure.com", "westus"],
    ["https://usgovvirginia.in.applicationinsights.azure.us", "usgovvirginia"],
    ["https://chinaeast2-1.in.applicationinsights.azure.cn", "chinaeast2"],
  ])("extracts the region from regional ingestion endpoint %s", (ingestionEndpoint, region) => {
    new TestExporter({
      connectionString: `InstrumentationKey=${instrumentationKey};IngestionEndpoint=${ingestionEndpoint}`,
    });

    expect(configurationMocks.initialize).toHaveBeenCalledWith(expect.objectContaining({ region }));
  });

  it.each([
    "https://westus.in.applicationinsights.example.com",
    "https://westus.in.applicationinsights.azure.com.example.com",
    "https://prefix.westus.in.applicationinsights.azure.com",
  ])("does not extract a region from unsupported endpoint %s", (ingestionEndpoint) => {
    new TestExporter({
      connectionString: `InstrumentationKey=${instrumentationKey};IngestionEndpoint=${ingestionEndpoint}`,
    });

    expect(configurationMocks.initialize).toHaveBeenCalledWith(
      expect.objectContaining({ region: "" }),
    );
  });
});
