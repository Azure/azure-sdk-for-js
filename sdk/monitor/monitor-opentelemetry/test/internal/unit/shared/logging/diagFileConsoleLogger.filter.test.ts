// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DiagFileConsoleLogger } from "../../../../../src/shared/logging/diagFileConsoleLogger.js";

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

  it("should filter resource attribute warnings in error method only", () => {
    // Test messages that should be filtered in error method
    const filteredMessages = [
      "Accessing resource attributes before async attributes settled",
      "Resource attributes being accessed before async attributes finished",
      "Resource attributes accessed before async detection completed",
      "async attributes settled",
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

    // Test filtering of messages that should NOT be filtered in ERROR method
    notFilteredMessages.forEach((message) => {
      loggedMessages = []; // Reset
      logger.error(message);
      expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered (has logs)
    });
  });

  it("should NOT filter resource attribute warnings in other log methods", () => {
    const warningMessage = "Accessing resource attributes before async attributes settled";

    // Test warn method - should NOT filter
    loggedMessages = [];
    logger.warn(warningMessage);
    expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered

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

  it("should filter warnings with additional arguments in error method only", () => {
    // Test error method with args - should filter
    loggedMessages = []; // Reset
    logger.error("Accessing resource attributes before async attributes settled", []);
    expect(loggedMessages).toHaveLength(0); // Should be filtered even with args

    // Test warn method with args - should NOT filter
    loggedMessages = []; // Reset
    logger.warn("Accessing resource attributes before async attributes settled", []);
    expect(loggedMessages.length).toBeGreaterThan(0); // Should NOT be filtered
  });
});
