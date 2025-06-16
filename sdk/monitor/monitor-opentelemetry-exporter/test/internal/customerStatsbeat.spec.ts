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
    it("should store exception.message for CLIENT_EXCEPTION drop code", () => {
      const exceptionMessage = "Network connection timeout";

      customerStatsbeatMetrics.countDroppedItems(
        5,
        DropCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount).toHaveLength(1);
      expect(counter.totalItemDropCount[0]).toEqual({
        count: 5,
        "drop.code": DropCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
        "exception.message": exceptionMessage,
      });
    });

    it("should not store exception.message for CLIENT_EXCEPTION when message not provided", () => {
      customerStatsbeatMetrics.countDroppedItems(3, DropCode.CLIENT_EXCEPTION, TelemetryType.TRACE);

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount).toHaveLength(1);
      expect(counter.totalItemDropCount[0]).toEqual({
        count: 3,
        "drop.code": DropCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
      });
      expect(counter.totalItemDropCount[0]).not.toHaveProperty("exception.message");
    });

    it("should not store exception.message for non-CLIENT_EXCEPTION drop codes", () => {
      const exceptionMessage = "Some error message";

      customerStatsbeatMetrics.countDroppedItems(
        2,
        DropCode.NON_RETRYABLE_STATUS_CODE,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount).toHaveLength(1);
      expect(counter.totalItemDropCount[0]).toEqual({
        count: 2,
        "drop.code": DropCode.NON_RETRYABLE_STATUS_CODE,
        telemetry_type: TelemetryType.TRACE,
      });
      expect(counter.totalItemDropCount[0]).not.toHaveProperty("exception.message");
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
      expect(counter.totalItemDropCount).toHaveLength(1);
      expect(counter.totalItemDropCount[0]).toEqual({
        count: 5,
        "drop.code": DropCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
        "exception.message": exceptionMessage,
      });
    });

    it("should create separate entries for different exception messages", () => {
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
      expect(counter.totalItemDropCount).toHaveLength(2);

      const errorAEntry = counter.totalItemDropCount.find(
        (entry: any) => entry["telemetry_type"] === TelemetryType.TRACE,
      );
      const errorBEntry = counter.totalItemDropCount.find(
        (entry: any) => entry["telemetry_type"] === TelemetryType.DEPENDENCY,
      );

      expect(errorAEntry).toEqual({
        count: 2,
        "drop.code": DropCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
        "exception.message": "Error A",
      });
      expect(errorBEntry).toEqual({
        count: 3,
        "drop.code": DropCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.DEPENDENCY,
        "exception.message": "Error B",
      });
    });
  });

  describe("countRetryItems", () => {
    it("should store exception.message for CLIENT_EXCEPTION retry code", () => {
      const exceptionMessage = "Retry due to connection error";

      customerStatsbeatMetrics.countRetryItems(
        3,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount).toHaveLength(1);
      expect(counter.totalItemRetryCount[0]).toEqual({
        count: 3,
        "retry.code": RetryCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
        "exception.message": exceptionMessage,
      });
    });

    it("should not store exception.message for CLIENT_EXCEPTION when message not provided", () => {
      customerStatsbeatMetrics.countRetryItems(2, RetryCode.CLIENT_EXCEPTION, TelemetryType.TRACE);

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount).toHaveLength(1);
      expect(counter.totalItemRetryCount[0]).toEqual({
        count: 2,
        "retry.code": RetryCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
      });
      expect(counter.totalItemRetryCount[0]).not.toHaveProperty("exception.message");
    });

    it("should not store exception.message for non-CLIENT_EXCEPTION retry codes", () => {
      const exceptionMessage = "Some retry message";

      customerStatsbeatMetrics.countRetryItems(
        4,
        RetryCode.RETRYABLE_STATUS_CODE,
        TelemetryType.TRACE,
        exceptionMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount).toHaveLength(1);
      expect(counter.totalItemRetryCount[0]).toEqual({
        count: 4,
        "retry.code": RetryCode.RETRYABLE_STATUS_CODE,
        telemetry_type: TelemetryType.TRACE,
      });
      expect(counter.totalItemRetryCount[0]).not.toHaveProperty("exception.message");
    });

    it("should aggregate counts for same retry code and exception message", () => {
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
      expect(counter.totalItemRetryCount).toHaveLength(1);
      expect(counter.totalItemRetryCount[0]).toEqual({
        count: 5,
        "retry.code": RetryCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
        "exception.message": exceptionMessage,
      });
    });
  });

  describe("Observable Callbacks", () => {
    it("should include exception.message in drop count metrics when present", () => {
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

      // Check that exception.message is included for CLIENT_EXCEPTION
      const clientExceptionCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["drop.code"] === DropCode.CLIENT_EXCEPTION,
      );
      expect(clientExceptionCall).toBeDefined();
      expect(clientExceptionCall![2]).toHaveProperty("exception.message", "Test error");

      // Check that exception.message is not included for other codes
      const nonRetryableCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["drop.code"] === DropCode.NON_RETRYABLE_STATUS_CODE,
      );
      expect(nonRetryableCall).toBeDefined();
      expect(nonRetryableCall![2]).not.toHaveProperty("exception.message");
    });

    it("should include exception.message in retry count metrics when present", () => {
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

      // Check that exception.message is included for CLIENT_EXCEPTION
      const clientExceptionCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["retry.code"] === RetryCode.CLIENT_EXCEPTION,
      );
      expect(clientExceptionCall).toBeDefined();
      expect(clientExceptionCall![2]).toHaveProperty("exception.message", "Retry error");

      // Check that exception.message is not included for other codes
      const retryableCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["retry.code"] === RetryCode.RETRYABLE_STATUS_CODE,
      );
      expect(retryableCall).toBeDefined();
      expect(retryableCall![2]).not.toHaveProperty("exception.message");
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
      expect(counter.totalItemDropCount[0].count).toBe(5);
      expect(counter.totalItemRetryCount[0].count).toBe(3);

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
      expect(counter.totalItemDropCount[0].count).toBe(0);
      expect(counter.totalItemRetryCount[0].count).toBe(0);
    });
  });
  describe("Exception Message Integration Tests", () => {
    it("should capture exception.message in statsbeat when drop code is CLIENT_EXCEPTION", () => {
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
      expect(counter.totalItemDropCount).toHaveLength(1);
      expect(counter.totalItemDropCount[0]).toEqual({
        count: 5,
        "drop.code": DropCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
        "exception.message": testErrorMessage,
      });

      // Test the observable callback includes exception.message in attributes
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const dropCallback = (customerStatsbeatMetrics as any).itemDropCallback.bind(
        customerStatsbeatMetrics,
      );
      dropCallback(mockObservableResult);
      // Should observe the metric with exception.message attribute
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        5,
        expect.objectContaining({
          "drop.code": DropCode.CLIENT_EXCEPTION,
          "exception.message": testErrorMessage,
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should capture exception.message in statsbeat when retry code is CLIENT_EXCEPTION", () => {
      const testErrorMessage = "Connection timeout during retry";

      // Count retry items with CLIENT_EXCEPTION and exception message
      customerStatsbeatMetrics.countRetryItems(
        3,
        RetryCode.CLIENT_EXCEPTION,
        TelemetryType.TRACE,
        testErrorMessage,
      );

      // Verify the internal counter stores the exception message
      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemRetryCount).toHaveLength(1);
      expect(counter.totalItemRetryCount[0]).toEqual({
        count: 3,
        "retry.code": RetryCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
        "exception.message": testErrorMessage,
      });

      // Test the observable callback includes exception.message in attributes
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const retryCallback = (customerStatsbeatMetrics as any).itemRetryCallback.bind(
        customerStatsbeatMetrics,
      );
      retryCallback(mockObservableResult);
      // Should observe the metric with exception.message attribute
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        3,
        expect.objectContaining({
          "retry.code": RetryCode.CLIENT_EXCEPTION,
          "exception.message": testErrorMessage,
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should NOT capture exception.message for non-CLIENT_EXCEPTION codes even when provided", () => {
      const testErrorMessage = "Some error message";

      // Test dropped items with non-CLIENT_EXCEPTION code
      customerStatsbeatMetrics.countDroppedItems(
        2,
        DropCode.NON_RETRYABLE_STATUS_CODE,
        TelemetryType.TRACE,
        testErrorMessage,
      );

      const counter = (customerStatsbeatMetrics as any).customerStatsbeatCounter;
      expect(counter.totalItemDropCount[0]).toEqual({
        count: 2,
        "drop.code": DropCode.NON_RETRYABLE_STATUS_CODE,
        telemetry_type: TelemetryType.TRACE,
      });
      expect(counter.totalItemDropCount[0]).not.toHaveProperty("exception.message");

      // Test observable callback does not include exception.message
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
          "exception.message": error1,
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
          "exception.message": error2,
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should aggregate counts for same CLIENT_EXCEPTION and exception message combination", () => {
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
      expect(counter.totalItemDropCount).toHaveLength(1);
      expect(counter.totalItemDropCount[0]).toEqual({
        count: 5, // 2 + 3
        "drop.code": DropCode.CLIENT_EXCEPTION,
        telemetry_type: TelemetryType.TRACE,
        "exception.message": testErrorMessage,
      });

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
          "exception.message": testErrorMessage,
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
