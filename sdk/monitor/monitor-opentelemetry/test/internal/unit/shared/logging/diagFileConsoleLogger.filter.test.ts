// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import { DiagFileConsoleLogger } from "../../../../src/shared/logging/index.js";

describe("DiagFileConsoleLogger filtering", () => {
  it("should filter resource attribute warnings", () => {
    const logger = new DiagFileConsoleLogger();
    
    // Test messages that should be filtered
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
      "Attributes have been set"
    ];

    // Test filtering of messages that should be filtered
    filteredMessages.forEach(message => {
      const result = logger._shouldFilterResourceAttributeWarning(message, []);
      expect(result).toBe(true);
    });

    // Test filtering of messages that should NOT be filtered
    notFilteredMessages.forEach(message => {
      const result = logger._shouldFilterResourceAttributeWarning(message, []);
      expect(result).toBe(false);
    });
  });

  it("should filter resource attribute warnings in args array", () => {
    const logger = new DiagFileConsoleLogger();
    
    // Test with warning in args array
    const result1 = logger._shouldFilterResourceAttributeWarning(null, [
      "Some message",
      "Accessing resource attributes before async attributes settled",
      "Another message"
    ]);
    expect(result1).toBe(true);

    // Test with no warning in args array
    const result2 = logger._shouldFilterResourceAttributeWarning(null, [
      "Some message",
      "Normal message",
      "Another message"
    ]);
    expect(result2).toBe(false);
  });
});
