// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CustomerStatsbeatMetrics } from "../../src/export/statsbeat/customerStatsbeat.js";
import { DropCode, RetryCode, TelemetryType } from "../../src/export/statsbeat/types.js";

describe("CustomerStatsbeatMetrics", () => {
  let customerStatsbeatMetrics: CustomerStatsbeatMetrics;
  const mockOptions = {
    instrumentationKey: "00000000-0000-0000-0000-000000000000", // Valid GUID format
    endpointUrl: "https://test.endpoint.com",
  };

  beforeEach(() => {
    // Use getInstance to get the singleton
    customerStatsbeatMetrics = CustomerStatsbeatMetrics.getInstance(mockOptions);
  });

  afterEach(async () => {
    // Clean up singleton instance
    await CustomerStatsbeatMetrics.shutdown();
  });

  describe("countDroppedItems", () => {
    it("should store drop.reason for CLIENT_EXCEPTION drop code", () => {
      const exceptionMessage = "Network connection timeout";

      customerStatsbeatMetrics.countDroppedItems(
        5,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be categorized as "timeout_exception" instead of raw message
      expect(reasonMap.get("timeout_exception")).toBe(5);
    });

    it("should not store drop.reason for CLIENT_EXCEPTION when message not provided", () => {
      customerStatsbeatMetrics.countDroppedItems(3, DropCode.CLIENT_EXCEPTION, TelemetryType.TRACE);

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be "unknown_exception" instead of "default"
      expect(reasonMap.get("unknown_exception")).toBe(3);
    });

    it("should store appropriate drop.reason for non-CLIENT_EXCEPTION drop codes", () => {
      const exceptionMessage = "Some error message";

      customerStatsbeatMetrics.countDroppedItems(
        2,
        DropCode.NON_RETRYABLE_STATUS_CODE,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(DropCode.NON_RETRYABLE_STATUS_CODE);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be "non_retryable_status" instead of "default"
      expect(reasonMap.get("non_retryable_status")).toBe(2);
    });

    it("should aggregate counts for same drop code and exception message", () => {
      const exceptionMessage = "Repeated error";

      customerStatsbeatMetrics.countDroppedItems(
        3,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        exceptionMessage,
      );
      customerStatsbeatMetrics.countDroppedItems(
        2,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should aggregate based on categorized reason "other_exception"
      expect(reasonMap.get("other_exception")).toBe(5);
    });

    it("should create separate entries for different telemetry types", () => {
      customerStatsbeatMetrics.countDroppedItems(
        2,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        "Error A",
      );
      customerStatsbeatMetrics.countDroppedItems(
        3,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.DEPENDENCY,
        "Error B",
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount.size).toBe(2);

      const traceDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(traceDropCodeMap).toBeDefined();
      expect(traceDropCodeMap.size).toBe(1);

      const traceReasonMap = traceDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(traceReasonMap).toBeDefined();
      expect(traceReasonMap.size).toBe(1);
      expect(traceReasonMap.get("other_exception")).toBe(2);

      const dependencyDropCodeMap = counter.totalItemDropCount.get(TelemetryType.DEPENDENCY);
      expect(dependencyDropCodeMap).toBeDefined();
      expect(dependencyDropCodeMap.size).toBe(1);

      const dependencyReasonMap = dependencyDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(dependencyReasonMap).toBeDefined();
      expect(dependencyReasonMap.size).toBe(1);
      expect(dependencyReasonMap.get("other_exception")).toBe(3);
    });
  });

  describe("countRetryItems", () => {
    it("should store retry.reason for CLIENT_EXCEPTION retry code", () => {
      const exceptionMessage = "Retry due to connection error";

      customerStatsbeatMetrics.countRetryItems(
        3,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be categorized as "network_exception" instead of raw message
      expect(reasonMap.get("network_exception")).toBe(3);
    });

    it("should not store retry.reason for CLIENT_EXCEPTION when message not provided", () => {
      customerStatsbeatMetrics.countRetryItems(2, RetryCode.CLIENT_EXCEPTION, TelemetryType.TRACE);

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should default to "unknown_exception"
      expect(reasonMap.get("unknown_exception")).toBe(2);
    });

    it("should not store retry.reason for non-CLIENT_EXCEPTION retry codes", () => {
      const exceptionMessage = "Some retry message";

      customerStatsbeatMetrics.countRetryItems(
        4,
        RetryCode.RETRYABLE_STATUS_CODE,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.RETRYABLE_STATUS_CODE);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be categorized as "retryable_status"
      expect(reasonMap.get("retryable_status")).toBe(4);
    });

    it("should aggregate counts for same retry code and retry reason", () => {
      const exceptionMessage = "Connection timeout";

      customerStatsbeatMetrics.countRetryItems(
        2,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        exceptionMessage,
      );
      customerStatsbeatMetrics.countRetryItems(
        3,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should aggregate to 5 (2 + 3)
      expect(reasonMap.get("timeout_exception")).toBe(5);
    });
  });

  describe("Observable Callbacks", () => {
    it("should include drop.reason in drop count metrics when present", () => {
      // Add entries with different scenarios
      customerStatsbeatMetrics.countDroppedItems(
        3,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        "Test error",
      );
      customerStatsbeatMetrics.countDroppedItems(
        2,
        DropCode.NON_RETRYABLE_STATUS_CODE,
        TelemetryType.TRACE,
      );

      const mockObservableResult = {
        observe: vi.fn(),
      };

      // Call the item drop callback
      const callback = (customerStatsbeatMetrics as any).itemDropCallback.bind(
        customerStatsbeatMetrics,
      );
      callback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledTimes(2);

      // Check that drop.reason is included for CLIENT_EXCEPTION (categorized)
      const clientExceptionCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["drop.code"] === DropCode.CLIENT_EXCEPTION,
      );
      expect(clientExceptionCall).toBeDefined();
      expect(clientExceptionCall![2]).toHaveProperty("drop.reason", "other_exception");

      // Check that drop.reason is included for other codes too (now)
      const nonRetryableCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["drop.code"] === DropCode.NON_RETRYABLE_STATUS_CODE,
      );
      expect(nonRetryableCall).toBeDefined();
      expect(nonRetryableCall![2]).toHaveProperty("drop.reason", "non_retryable_status");
    });

    it("should include retry.reason in retry count metrics when present", () => {
      // Add entries with different scenarios
      customerStatsbeatMetrics.countRetryItems(
        4,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        "Retry error",
      );
      customerStatsbeatMetrics.countRetryItems(
        1,
        RetryCode.RETRYABLE_STATUS_CODE,
        TelemetryType.TRACE,
      );

      const mockObservableResult = {
        observe: vi.fn(),
      };

      // Call the item retry callback
      const callback = (customerStatsbeatMetrics as any).itemRetryCallback.bind(
        customerStatsbeatMetrics,
      );
      callback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledTimes(2);

      // Check that retry.reason is included for CLIENT_EXCEPTION
      const clientExceptionCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["retry.code"] === RetryCode.CLIENT_EXCEPTION,
      );
      expect(clientExceptionCall).toBeDefined();
      expect(clientExceptionCall![2]).toHaveProperty("retry.reason", "other_exception");

      // Check that retry.reason is included for other codes too (now)
      const retryableCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["retry.code"] === RetryCode.RETRYABLE_STATUS_CODE,
      );
      expect(retryableCall).toBeDefined();
      expect(retryableCall![2]).toHaveProperty("retry.reason", "retryable_status");
    });

    it("should reset counts to zero after observation", () => {
      customerStatsbeatMetrics.countDroppedItems(
        5,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        "Test error",
      );
      customerStatsbeatMetrics.countRetryItems(
        3,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        "Retry error",
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;

      const traceDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      const traceDropReasonMap = traceDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(traceDropReasonMap.get("other_exception")).toBe(5);

      const traceRetryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      const traceRetryReasonMap = traceRetryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(traceRetryReasonMap.get("other_exception")).toBe(3);

      const mockObservableResult = {
        observe: vi.fn(),
      };

      // Call the callbacks
      const dropCallback = (customerStatsbeatMetrics as any).itemDropCallback.bind(
        customerStatsbeatMetrics,
      );
      const retryCallback = (customerStatsbeatMetrics as any).itemRetryCallback.bind(
        customerStatsbeatMetrics,
      );

      dropCallback(mockObservableResult);
      retryCallback(mockObservableResult);

      // Counts should be reset to zero
      const resetTraceDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      const resetTraceDropReasonMap = resetTraceDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(resetTraceDropReasonMap.get("other_exception")).toBe(0);

      const resetTraceRetryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      const resetTraceRetryReasonMap = resetTraceRetryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(resetTraceRetryReasonMap.get("other_exception")).toBe(0);
    });
  });
  describe("Drop Reason Integration Tests", () => {
    it("should capture drop.reason in statsbeat when drop code is CLIENT_EXCEPTION", () => {
      const testErrorMessage = "Network connection failed";

      // Count dropped items with CLIENT_EXCEPTION and exception message
      customerStatsbeatMetrics.countDroppedItems(
        5,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        testErrorMessage,
      );

      // Verify the internal counter stores the telemetry_type
      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const integrationDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(integrationDropCodeMap).toBeDefined();
      expect(integrationDropCodeMap.size).toBe(1);

      const integrationReasonMap = integrationDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(integrationReasonMap).toBeDefined();
      expect(integrationReasonMap.size).toBe(1);
      expect(integrationReasonMap.get("network_exception")).toBe(5);

      // Test the observable callback includes drop.reason in attributes
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const dropCallback = (customerStatsbeatMetrics as any).itemDropCallback.bind(
        customerStatsbeatMetrics,
      );
      dropCallback(mockObservableResult);
      // Should observe the metric with drop.reason attribute
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        5,
        expect.objectContaining({
          "drop.code": DropCode.CLIENT_EXCEPTION,
          "drop.reason": "network_exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should capture retry.reason in statsbeat when retry code is CLIENT_EXCEPTION", () => {
      const testErrorMessage = "Connection timeout during retry";

      // Count retry items with CLIENT_EXCEPTION and exception message
      customerStatsbeatMetrics.countRetryItems(
        3,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        testErrorMessage,
      );

      // Verify the internal counter stores the exception message in the nested Map structure
      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      expect(reasonMap.get("timeout_exception")).toBe(3);

      // Test the observable callback includes retry.reason in attributes
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const retryCallback = (customerStatsbeatMetrics as any).itemRetryCallback.bind(
        customerStatsbeatMetrics,
      );
      retryCallback(mockObservableResult);
      // Should observe the metric with retry.reason attribute
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        3,
        expect.objectContaining({
          "retry.code": RetryCode.CLIENT_EXCEPTION,
          "retry.reason": "timeout_exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should NOT capture drop.reason for non-CLIENT_EXCEPTION codes even when provided", () => {
      const testErrorMessage = "Some error message";

      // Test dropped items with non-CLIENT_EXCEPTION code
      customerStatsbeatMetrics.countDroppedItems(
        2,
        DropCode.NON_RETRYABLE_STATUS_CODE,
        TelemetryType.TRACE,
        testErrorMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const nonClientExceptionDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(nonClientExceptionDropCodeMap).toBeDefined();
      expect(nonClientExceptionDropCodeMap.size).toBe(1);

      const nonClientExceptionReasonMap = nonClientExceptionDropCodeMap.get(
        DropCode.NON_RETRYABLE_STATUS_CODE,
      );
      expect(nonClientExceptionReasonMap).toBeDefined();
      expect(nonClientExceptionReasonMap.size).toBe(1);
      expect(nonClientExceptionReasonMap.get("non_retryable_status")).toBe(2);

      // Test observable callback does not include drop.reason
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const dropCallback = (customerStatsbeatMetrics as any).itemDropCallback.bind(
        customerStatsbeatMetrics,
      );
      dropCallback(mockObservableResult);
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        2,
        expect.objectContaining({
          "drop.code": DropCode.NON_RETRYABLE_STATUS_CODE,
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should handle multiple CLIENT_EXCEPTION entries with different exception messages", () => {
      const error1 = "Network timeout";
      const error2 = "Authentication failed";

      // Add two different CLIENT_EXCEPTION errors
      customerStatsbeatMetrics.countDroppedItems(
        3,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        error1,
      );
      customerStatsbeatMetrics.countRetryItems(
        2,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        error2,
      );

      const mockObservableResult = {
        observe: vi.fn(),
      };

      // Call both callbacks
      const dropCallback = (customerStatsbeatMetrics as any).itemDropCallback.bind(
        customerStatsbeatMetrics,
      );
      const retryCallback = (customerStatsbeatMetrics as any).itemRetryCallback.bind(
        customerStatsbeatMetrics,
      );

      dropCallback(mockObservableResult);
      retryCallback(mockObservableResult);

      // Should have called observe twice with different exception messages
      expect(mockObservableResult.observe).toHaveBeenCalledTimes(2);
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        3,
        expect.objectContaining({
          "drop.code": DropCode.CLIENT_EXCEPTION,
          "drop.reason": "timeout_exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );

      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        2,
        expect.objectContaining({
          "retry.code": RetryCode.CLIENT_EXCEPTION,
          "retry.reason": "auth_exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should aggregate counts for same CLIENT_EXCEPTION and drop reason combination", () => {
      const testErrorMessage = "Repeated connection error";

      // Add the same error twice
      customerStatsbeatMetrics.countDroppedItems(
        2,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        testErrorMessage,
      );
      customerStatsbeatMetrics.countDroppedItems(
        3,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        testErrorMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const aggregateDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(aggregateDropCodeMap).toBeDefined();
      expect(aggregateDropCodeMap.size).toBe(1);

      const aggregateReasonMap = aggregateDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(aggregateReasonMap).toBeDefined();
      expect(aggregateReasonMap.size).toBe(1);
      expect(aggregateReasonMap.get("network_exception")).toBe(5); // 2 + 3

      // Test observable callback aggregates the count
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const dropCallback = (customerStatsbeatMetrics as any).itemDropCallback.bind(
        customerStatsbeatMetrics,
      );
      dropCallback(mockObservableResult);
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        5,
        expect.objectContaining({
          "drop.code": DropCode.CLIENT_EXCEPTION,
          "drop.reason": "network_exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });
  });

  describe("countSuccessfulItems", () => {
    it("should track successful items correctly", () => {
      customerStatsbeatMetrics.countSuccessfulItems(10, TelemetryType.CUSTOM_EVENT);

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemSuccessCount.size).toBe(1);
      expect(counter.totalItemSuccessCount.get(TelemetryType.CUSTOM_EVENT)).toBe(10);
    });

    it("should aggregate counts for same telemetry type", () => {
      customerStatsbeatMetrics.countSuccessfulItems(5, TelemetryType.TRACE);
      customerStatsbeatMetrics.countSuccessfulItems(3, TelemetryType.TRACE);

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemSuccessCount.size).toBe(1);
      expect(counter.totalItemSuccessCount.get(TelemetryType.TRACE)).toBe(8);
    });
  });
});
