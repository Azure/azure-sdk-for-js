// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DiagFileConsoleLogger } from "$internal/shared/logging/diagFileConsoleLogger.js";

describe("DiagFileConsoleLogger filtering", () => {
  let logger: DiagFileConsoleLogger;
  let originalConsoleLog: typeof console.log;
  let loggedMessages: any[];

  beforeEach(() => {
    logger = new DiagFileConsoleLogger();
    originalConsoleLog = console.log;
    loggedMessages = [];

    // Mock console.log to capture what gets logged
    console.log = vi.fn((...args: any[]) => {
      loggedMessages.push(args);
    });
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    vi.restoreAllMocks();
  });

  it("should filter resource attribute warnings in error and warn methods", () => {
    // Test messages that should be filtered in error and warn methods (case insensitive)
    const filteredMessages = [
      "accessing resource attributes before async attributes settled",
      "resource attributes being accessed before async attributes finished",
      "resource attributes accessed before async detection completed",
      "async attributes settled",
      "module @azure/core-tracing has been loaded before @azure/opentelemetry-instrumentation-azure-sdk",
      // Test case variations to verify case-insensitive matching
      "Accessing Resource Attributes Before Async Attributes Settled",
      "RESOURCE ATTRIBUTES BEING ACCESSED BEFORE ASYNC ATTRIBUTES FINISHED",
      "Module @azure/core-tracing Has Been Loaded Before @azure/opentelemetry-instrumentation-azure-sdk",
    ];

    // Test messages that should NOT be filtered
    const notFilteredMessages = [
      "Some other warning message",
      "Normal log message",
      "Resource information is available",
      "Attributes have been set",
    ];

    // Test filtering of messages that should be filtered in ERROR method
    filteredMessages.forEach((message) => {
      loggedMessages = []; // Reset
      logger.error(message);
      expect(loggedMessages).toHaveLength(0); // Should be filtered (no logs)
    });

    // Test filtering of messages that should be filtered in WARN method
    filteredMessages.forEach((message) => {
      loggedMessages = []; // Reset
      logger.warn(message);
      expect(loggedMessages).toHaveLength(0); // Should be filtered (no logs)
    });

    // Test filtering of messages that should NOT be filtered in ERROR method
    notFilteredMessages.forEach((message) => {
      loggedMessages = []; // Reset
      logger.error(message);
      expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered (has logs)
    });

    // Test filtering of messages that should NOT be filtered in WARN method
    notFilteredMessages.forEach((message) => {
      loggedMessages = []; // Reset
      logger.warn(message);
      expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered (has logs)
    });
  });

  it("should NOT filter resource attribute warnings in other log methods (info, debug, verbose)", () => {
    const warningMessage = "Accessing resource attributes before async attributes settled";

    // Test info method - should NOT filter
    loggedMessages = [];
    logger.info(warningMessage);
    expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered

    // Test debug method - should NOT filter
    loggedMessages = [];
    logger.debug(warningMessage);
    expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered

    // Test verbose method - should NOT filter
    loggedMessages = [];
    logger.verbose(warningMessage);
    expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered
  });

  it("should NOT filter resource attribute warnings in logMessage method", async () => {
    const warningMessage = "Accessing resource attributes before async attributes settled";

    loggedMessages = []; // Reset
    await logger.logMessage(warningMessage, []);
    expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered

    // Test normal message should also not be filtered
    loggedMessages = []; // Reset
    await logger.logMessage("Normal message", []);
    expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered
  });

  it("should filter warnings with additional arguments in error and warn methods", () => {
    // Test error method with args - should filter
    loggedMessages = []; // Reset
    logger.error("Accessing resource attributes before async attributes settled", []);
    expect(loggedMessages).toHaveLength(0); // Should be filtered even with args

    // Test warn method with args - should also filter now
    loggedMessages = []; // Reset
    logger.warn("Accessing resource attributes before async attributes settled", []);
    expect(loggedMessages).toHaveLength(0); // Should be filtered even with args

    // Test info method with args - should NOT filter
    loggedMessages = []; // Reset
    logger.info("Accessing resource attributes before async attributes settled", []);
    expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered
  });

  it("should filter messages in a case-insensitive manner", () => {
    const testCases = [
      // Different case variations of the same message
      "accessing resource attributes before async attributes settled",
      "ACCESSING RESOURCE ATTRIBUTES BEFORE ASYNC ATTRIBUTES SETTLED",
      "Accessing Resource Attributes Before Async Attributes Settled",
      "aCcEsSiNg ReS0uRcE AtTrIbUtEs BeFoRe AsYnC AtTrIbUtEs SeTtLeD",
      // Mixed case for the core-tracing message
      "MODULE @azure/core-tracing HAS BEEN LOADED BEFORE @azure/opentelemetry-instrumentation-azure-sdk",
      "Module @Azure/Core-Tracing Has Been Loaded Before @Azure/Opentelemetry-Instrumentation-Azure-Sdk",
    ];

    // All these should be filtered in error and warn methods
    testCases.forEach((message) => {
      loggedMessages = []; // Reset
      logger.error(message);
      expect(loggedMessages).toHaveLength(0); // Should be filtered

      loggedMessages = []; // Reset
      logger.warn(message);
      expect(loggedMessages).toHaveLength(0); // Should be filtered
    });

    // But should NOT be filtered in other methods
    testCases.forEach((message) => {
      loggedMessages = []; // Reset
      logger.info(message);
      expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered

      loggedMessages = []; // Reset
      logger.debug(message);
      expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered
    });
  });
});
