// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag, DiagLogLevel } from "@opentelemetry/api";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { DiagFileConsoleLogger } from "../../../../../src/shared/logging/diagFileConsoleLogger.js";

// These tests use real SDK diagnostics instead of fabricated log strings.
describe("DiagFileConsoleLogger filtering", () => {
  let loggedMessages: any[];
  let originalEnv: NodeJS.ProcessEnv;

  const setDiagLogger = (): void => {
    const logger = new DiagFileConsoleLogger();
    // Spy on the internal sink because console.log is intentionally bypassed.
    vi.spyOn(logger as any, "_writeToConsole").mockImplementation((...args: any[]) => {
      loggedMessages.push(args);
    });
    diag.setLogger(logger, {
      logLevel: DiagLogLevel.ALL,
      suppressOverrideMessage: true,
    });
  };

  beforeEach(() => {
    originalEnv = { ...process.env };
    loggedMessages = [];
    setDiagLogger();
    // Ignore any diagnostics emitted by setLogger itself
    loggedMessages.length = 0;
  });

  afterEach(() => {
    process.env = originalEnv;
    diag.disable();
    vi.restoreAllMocks();
  });

  it("filters async resource attribute warnings emitted by the SDK", () => {
    const resource = resourceFromAttributes({
      foo: Promise.resolve("bar"),
    });

    // Accessing attributes before async attributes settle triggers the OTEL diagnostic warning
    // that this logger is supposed to silence.
    void resource.attributes;

    expect(loggedMessages).toHaveLength(0);
  });

  it("filters OTEL_METRICS_EXPORTER=azure_monitor warnings from SDK startup", async () => {
    process.env.OTEL_LOGS_EXPORTER = "otlp";
    process.env.OTEL_METRICS_EXPORTER = "azure_monitor";

    const sdk = new NodeSDK({
      autoDetectResources: false,
      instrumentations: [],
    });

    sdk.start();

    const flat = loggedMessages.flat().join(" ").toLowerCase();
    expect(flat).not.toContain("azure_monitor");
    expect(flat).not.toContain("otel_metrics_exporter");

    await sdk.shutdown();
  });

  it("does not filter unrelated SDK warnings", async () => {
    process.env.OTEL_LOGS_EXPORTER = "otlp";
    process.env.OTEL_METRICS_EXPORTER = "otlp";
    process.env.OTEL_EXPORTER_OTLP_METRICS_PROTOCOL = "invalid-protocol";

    const sdk = new NodeSDK({
      autoDetectResources: false,
      instrumentations: [],
    });

    sdk.start();

    const flat = loggedMessages.flat().join(" ").toLowerCase();
    expect(flat).toContain("unsupported otlp metrics protocol");

    await sdk.shutdown();
  });

  it("does not filter invalid warnings unrelated to azure monitor", () => {
    diag.error("an invalid connection string was supplied for component x");

    const flat = loggedMessages.flat().join(" ").toLowerCase();
    expect(flat).toContain("invalid connection string");
  });

  it("does not filter unsupported exporter warnings when azure_monitor is absent", () => {
    diag.error(
      'unsupported otel_metrics_exporter value "console"; supported values are: [none, console, otlp]',
    );

    const flat = loggedMessages.flat().join(" ").toLowerCase();
    expect(flat).toContain("unsupported otel_metrics_exporter value");
    expect(flat).not.toContain("azure_monitor");
  });

  it("does not filter when only args contain azure_monitor exporter wording", () => {
    diag.error("message header", "unsupported otel_metrics_exporter value azure_monitor");

    const flat = loggedMessages.flat().join(" ").toLowerCase();
    expect(flat).toContain("azure_monitor");
    expect(flat).toContain("unsupported otel_metrics_exporter value");
  });
});
