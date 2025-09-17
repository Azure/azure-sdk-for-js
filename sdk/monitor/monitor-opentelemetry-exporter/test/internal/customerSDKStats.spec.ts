// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CustomerSDKStatsMetrics } from "../../src/export/statsbeat/customerSDKStats.js";
import { DropCode, RetryCode, TelemetryType } from "../../src/export/statsbeat/types.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";

// Helper function to create mock envelopes for testing
function createMockEnvelopes(
  count: number,
  telemetryType: TelemetryType,
  statusCode?: number,
): Envelope[] {
  const envelopes: Envelope[] = [];

  let baseType: string;
  switch (telemetryType) {
    case TelemetryType.TRACE:
      baseType = "MessageData";
      break;
    case TelemetryType.DEPENDENCY:
      baseType = "RemoteDependencyData";
      break;
    case TelemetryType.REQUEST:
      baseType = "RequestData";
      break;
    case TelemetryType.EXCEPTION:
      baseType = "TelemetryExceptionData";
      break;
    case TelemetryType.CUSTOM_EVENT:
      baseType = "TelemetryEventData";
      break;
    case TelemetryType.CUSTOM_METRIC:
    case TelemetryType.PERFORMANCE_COUNTER:
      baseType = "MetricData";
      break;
    case TelemetryType.AVAILABILITY:
      baseType = "AvailabilityData";
      break;
    case TelemetryType.PAGE_VIEW:
      baseType = "PageViewData";
      break;
    default:
      baseType = "MessageData";
      break;
  }

  for (let i = 0; i < count; i++) {
    const envelope: Envelope = {
      name: `Microsoft.ApplicationInsights.${baseType}`,
      time: new Date(),
      instrumentationKey: "00000000-0000-0000-0000-000000000000",
      data: {
        baseType: baseType,
        baseData: {
          version: 2,
        },
      },
    };

    // Add status code if provided
    if (statusCode !== undefined) {
      (envelope as any).statusCode = statusCode;
    }

    envelopes.push(envelope);
  }

  return envelopes;
}

describe("CustomerSDKStatsMetrics", () => {
  let customerSDKStatsMetrics: CustomerSDKStatsMetrics;
  const mockOptions = {
    instrumentationKey: "00000000-0000-0000-0000-000000000000", // Valid GUID format
    endpointUrl: "https://test.endpoint.com",
  };

  beforeEach(() => {
    // Use getInstance to get the singleton
    customerSDKStatsMetrics = CustomerSDKStatsMetrics.getInstance(mockOptions);
  });

  afterEach(async () => {
    // Clean up singleton instance
    await CustomerSDKStatsMetrics.shutdown();
  });

  describe("countDroppedItems", () => {
    it("should store drop.reason for CLIENT_EXCEPTION drop code", () => {
      const exceptionMessage = "Network connection timeout";

      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(5, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        exceptionMessage,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be categorized as "Timeout exception" instead of raw message
      const successMap = reasonMap.get("Timeout exception");
      expect(successMap).toBeDefined();
      expect(successMap.get(null)).toBe(5);
    });

    it("should not store drop.reason for CLIENT_EXCEPTION when message not provided", () => {
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be "Client exception" instead of "default"
      const successMap = reasonMap.get("Client exception");
      expect(successMap).toBeDefined();
      expect(successMap.get(null)).toBe(3);
    });

    it("should NOT store drop.reason for non-CLIENT_EXCEPTION drop codes", () => {
      const exceptionMessage = "Some error message";

      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(2, TelemetryType.TRACE, 400),
        400,
        exceptionMessage,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(400);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should have "Bad request" as reason for 400 status code
      const successMap = reasonMap.get("Bad request");
      expect(successMap).toBeDefined();
      expect(successMap.get(null)).toBe(2);
    });

    it("should store correct drop.reason for CLIENT_STORAGE_DISABLED drop code", () => {
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        DropCode.CLIENT_STORAGE_DISABLED,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(DropCode.CLIENT_STORAGE_DISABLED);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should have "Client storage disabled" as reason for CLIENT_STORAGE_DISABLED
      const successMap = reasonMap.get("Client local storage disabled");
      expect(successMap).toBeDefined();
      expect(successMap.get(null)).toBe(3);
    });

    it("should aggregate counts for same drop code and exception message", () => {
      const exceptionMessage = "Repeated error";

      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        exceptionMessage,
      );
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(2, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        exceptionMessage,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const dropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(dropCodeMap).toBeDefined();
      expect(dropCodeMap.size).toBe(1);

      const reasonMap = dropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should aggregate based on categorized reason "Client exception"
      const successMap = reasonMap.get("Client exception");
      expect(successMap).toBeDefined();
      expect(successMap.get(null)).toBe(5);
    });

    it("should create separate entries for different telemetry types", () => {
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(2, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        "Error A",
      );
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(3, TelemetryType.DEPENDENCY),
        DropCode.CLIENT_EXCEPTION,
        "Error B",
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(2);

      const traceDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(traceDropCodeMap).toBeDefined();
      expect(traceDropCodeMap.size).toBe(1);

      const traceReasonMap = traceDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(traceReasonMap).toBeDefined();
      expect(traceReasonMap.size).toBe(1);
      const traceSuccessMap = traceReasonMap.get("Client exception");
      expect(traceSuccessMap).toBeDefined();
      expect(traceSuccessMap.get(null)).toBe(2);

      const dependencyDropCodeMap = counter.totalItemDropCount.get(TelemetryType.DEPENDENCY);
      expect(dependencyDropCodeMap).toBeDefined();
      expect(dependencyDropCodeMap.size).toBe(1);

      const dependencyReasonMap = dependencyDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(dependencyReasonMap).toBeDefined();
      expect(dependencyReasonMap.size).toBe(1);
      const dependencySuccessMap = dependencyReasonMap.get("Client exception");
      expect(dependencySuccessMap).toBeDefined();
      expect(dependencySuccessMap.get(null)).toBe(3);
    });
  });

  describe("countRetryItems", () => {
    it("should store retry.reason for CLIENT_EXCEPTION retry code", () => {
      const exceptionMessage = "Retry due to connection error";

      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        RetryCode.CLIENT_EXCEPTION,
        exceptionMessage,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be categorized as "Network exception" instead of raw message
      expect(reasonMap.get("Network exception")).toBe(3);
    });

    it("should not store retry.reason for CLIENT_EXCEPTION when message not provided", () => {
      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(2, TelemetryType.TRACE),
        RetryCode.CLIENT_EXCEPTION,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should default to "Client exception"
      expect(reasonMap.get("Client exception")).toBe(2);
    });

    it("should not store retry.reason for non-CLIENT_EXCEPTION retry codes", () => {
      const exceptionMessage = "Some retry message";

      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(4, TelemetryType.TRACE),
        502, // Bad Gateway - a retryable status code
        exceptionMessage,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(502);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should be categorized as "Bad gateway" based on the status code
      expect(reasonMap.get("Bad gateway")).toBe(4);
    });

    it("should aggregate counts for same retry code and retry reason", () => {
      const exceptionMessage = "Connection timeout";

      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(2, TelemetryType.TRACE),
        RetryCode.CLIENT_EXCEPTION,
        exceptionMessage,
      );
      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        RetryCode.CLIENT_EXCEPTION,
        exceptionMessage,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      // Should aggregate to 5 (2 + 3)
      expect(reasonMap.get("Timeout exception")).toBe(5);
    });
  });

  describe("Observable Callbacks", () => {
    it("should include drop.reason in drop count metrics when present", () => {
      // Test that a 403 status code sets the drop code to the number 403
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(5, TelemetryType.TRACE, 403),
        403, // Using numeric status code
      );

      const mockObservableResult = {
        observe: vi.fn(),
      };

      // Call the item drop callback
      const callback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
        customerSDKStatsMetrics,
      );
      callback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledTimes(1);

      // Check that drop.code is set to 403 (numeric) and drop.reason is "Forbidden"
      const statusCodeCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["drop.code"] === 403,
      );
      expect(statusCodeCall).toBeDefined();
      expect(statusCodeCall![2]).toHaveProperty("drop.code", 403);
      expect(statusCodeCall![2]).toHaveProperty("drop.reason", "Forbidden");
      expect(statusCodeCall![1]).toBe(5); // Count should be 5
    });

    it("should include retry.reason in retry count metrics when present", () => {
      // Add entries with different scenarios
      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(4, TelemetryType.TRACE),
        RetryCode.CLIENT_EXCEPTION,
        "Retry error",
      );
      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(1, TelemetryType.TRACE, 502),
        502,
      );

      const mockObservableResult = {
        observe: vi.fn(),
      };

      // Call the item retry callback
      const callback = (customerSDKStatsMetrics as any).itemRetryCallback.bind(
        customerSDKStatsMetrics,
      );
      callback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledTimes(2);

      // Check that retry.reason is included for CLIENT_EXCEPTION
      const clientExceptionCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["retry.code"] === RetryCode.CLIENT_EXCEPTION,
      );
      expect(clientExceptionCall).toBeDefined();
      expect(clientExceptionCall![2]).toHaveProperty("retry.reason", "Client exception");

      // Check that retry.reason is included for other codes too (now)
      const retryableCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2]["retry.code"] === 502,
      );
      expect(retryableCall).toBeDefined();
      expect(retryableCall![2]).toHaveProperty("retry.reason", "Bad gateway");
    });

    it("should reset counts to zero after observation", () => {
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(5, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        "Test error",
      );
      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        RetryCode.CLIENT_EXCEPTION,
        "Retry error",
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;

      const traceDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      const traceDropReasonMap = traceDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      const traceDropSuccessMap = traceDropReasonMap.get("Client exception");
      expect(traceDropSuccessMap.get(null)).toBe(5);

      const traceRetryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      const traceRetryReasonMap = traceRetryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(traceRetryReasonMap.get("Client exception")).toBe(3);

      const mockObservableResult = {
        observe: vi.fn(),
      };

      // Call the callbacks
      const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
        customerSDKStatsMetrics,
      );
      const retryCallback = (customerSDKStatsMetrics as any).itemRetryCallback.bind(
        customerSDKStatsMetrics,
      );

      dropCallback(mockObservableResult);
      retryCallback(mockObservableResult);

      // Counts should be reset to zero
      const resetTraceDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      const resetTraceDropReasonMap = resetTraceDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      const resetTraceDropSuccessMap = resetTraceDropReasonMap.get("Client exception");
      expect(resetTraceDropSuccessMap.get(null)).toBe(0);

      const resetTraceRetryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      const resetTraceRetryReasonMap = resetTraceRetryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(resetTraceRetryReasonMap.get("Client exception")).toBe(0);
    });
  });
  describe("Drop Reason Integration Tests", () => {
    it("should capture drop.reason in statsbeat when drop code is CLIENT_EXCEPTION", () => {
      const testErrorMessage = "Network connection failed";

      // Count dropped items with CLIENT_EXCEPTION and exception message
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(5, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        testErrorMessage,
      );

      // Verify the internal counter stores the telemetry_type
      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const integrationDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(integrationDropCodeMap).toBeDefined();
      expect(integrationDropCodeMap.size).toBe(1);

      const integrationReasonMap = integrationDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(integrationReasonMap).toBeDefined();
      expect(integrationReasonMap.size).toBe(1);
      const integrationSuccessMap = integrationReasonMap.get("Network exception");
      expect(integrationSuccessMap).toBeDefined();
      expect(integrationSuccessMap.get(null)).toBe(5);

      // Test the observable callback includes drop.reason in attributes
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
        customerSDKStatsMetrics,
      );
      dropCallback(mockObservableResult);
      // Should observe the metric with drop.reason attribute
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        5,
        expect.objectContaining({
          "drop.code": DropCode.CLIENT_EXCEPTION,
          "drop.reason": "Network exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should capture retry.reason in statsbeat when retry code is CLIENT_EXCEPTION", () => {
      const testErrorMessage = "Connection timeout during retry";

      // Count retry items with CLIENT_EXCEPTION and exception message
      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        RetryCode.CLIENT_EXCEPTION,
        testErrorMessage,
      );

      // Verify the internal counter stores the exception message in the nested Map structure
      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemRetryCount.size).toBe(1);

      const retryCodeMap = counter.totalItemRetryCount.get(TelemetryType.TRACE);
      expect(retryCodeMap).toBeDefined();
      expect(retryCodeMap.size).toBe(1);

      const reasonMap = retryCodeMap.get(RetryCode.CLIENT_EXCEPTION);
      expect(reasonMap).toBeDefined();
      expect(reasonMap.size).toBe(1);
      expect(reasonMap.get("Timeout exception")).toBe(3);

      // Test the observable callback includes retry.reason in attributes
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const retryCallback = (customerSDKStatsMetrics as any).itemRetryCallback.bind(
        customerSDKStatsMetrics,
      );
      retryCallback(mockObservableResult);
      // Should observe the metric with retry.reason attribute
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        3,
        expect.objectContaining({
          "retry.code": RetryCode.CLIENT_EXCEPTION,
          "retry.reason": "Timeout exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should NOT capture drop.reason for non-CLIENT_EXCEPTION codes even when provided", () => {
      const testErrorMessage = "Some error message";

      // Test dropped items with non-CLIENT_EXCEPTION code (using 500 status code)
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(2, TelemetryType.TRACE, 500),
        500,
        testErrorMessage,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const nonClientExceptionDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(nonClientExceptionDropCodeMap).toBeDefined();
      expect(nonClientExceptionDropCodeMap.size).toBe(1);

      const nonClientExceptionReasonMap = nonClientExceptionDropCodeMap.get(500);
      expect(nonClientExceptionReasonMap).toBeDefined();
      expect(nonClientExceptionReasonMap.size).toBe(1);
      const nonClientExceptionSuccessMap = nonClientExceptionReasonMap.get("Internal server error");
      expect(nonClientExceptionSuccessMap).toBeDefined();
      expect(nonClientExceptionSuccessMap.get(null)).toBe(2);

      // Test observable callback does not include drop.reason
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
        customerSDKStatsMetrics,
      );
      dropCallback(mockObservableResult);
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        2,
        expect.objectContaining({
          "drop.code": 500,
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
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        error1,
      );
      customerSDKStatsMetrics.countRetryItems(
        createMockEnvelopes(2, TelemetryType.TRACE),
        RetryCode.CLIENT_EXCEPTION,
        error2,
      );

      const mockObservableResult = {
        observe: vi.fn(),
      };

      // Call both callbacks
      const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
        customerSDKStatsMetrics,
      );
      const retryCallback = (customerSDKStatsMetrics as any).itemRetryCallback.bind(
        customerSDKStatsMetrics,
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
          "drop.reason": "Timeout exception",
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
          "retry.reason": "Client exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should aggregate counts for same CLIENT_EXCEPTION and drop reason combination", () => {
      const testErrorMessage = "Repeated connection error";

      // Add the same error twice
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(2, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        testErrorMessage,
      );
      customerSDKStatsMetrics.countDroppedItems(
        createMockEnvelopes(3, TelemetryType.TRACE),
        DropCode.CLIENT_EXCEPTION,
        testErrorMessage,
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemDropCount.size).toBe(1);

      const aggregateDropCodeMap = counter.totalItemDropCount.get(TelemetryType.TRACE);
      expect(aggregateDropCodeMap).toBeDefined();
      expect(aggregateDropCodeMap.size).toBe(1);

      const aggregateReasonMap = aggregateDropCodeMap.get(DropCode.CLIENT_EXCEPTION);
      expect(aggregateReasonMap).toBeDefined();
      expect(aggregateReasonMap.size).toBe(1);
      const aggregateSuccessMap = aggregateReasonMap.get("Network exception");
      expect(aggregateSuccessMap).toBeDefined();
      expect(aggregateSuccessMap.get(null)).toBe(5); // 2 + 3

      // Test observable callback aggregates the count
      const mockObservableResult = {
        observe: vi.fn(),
      };

      const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
        customerSDKStatsMetrics,
      );
      dropCallback(mockObservableResult);
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        5,
        expect.objectContaining({
          "drop.code": DropCode.CLIENT_EXCEPTION,
          "drop.reason": "Network exception",
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });
  });

  describe("telemetry_success functionality", () => {
    it("should track successful REQUEST telemetry items", () => {
      const requestEnvelopes = createMockEnvelopes(3, TelemetryType.REQUEST);
      customerSDKStatsMetrics.countSuccessfulItems(requestEnvelopes);

      const mockObservableResult = {
        observe: vi.fn(),
      };

      const successCallback = (customerSDKStatsMetrics as any).itemSuccessCallback.bind(
        customerSDKStatsMetrics,
      );
      successCallback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        3,
        expect.objectContaining({
          telemetry_type: TelemetryType.REQUEST,
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should track successful DEPENDENCY telemetry items", () => {
      const dependencyEnvelopes = createMockEnvelopes(2, TelemetryType.DEPENDENCY);
      customerSDKStatsMetrics.countSuccessfulItems(dependencyEnvelopes);

      const mockObservableResult = {
        observe: vi.fn(),
      };

      const successCallback = (customerSDKStatsMetrics as any).itemSuccessCallback.bind(
        customerSDKStatsMetrics,
      );
      successCallback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object), // The observable gauge
        2,
        expect.objectContaining({
          telemetry_type: TelemetryType.DEPENDENCY,
          language: expect.any(String),
          version: expect.any(String),
          computeType: expect.any(String),
        }),
      );
    });

    it("should accumulate successful items for multiple REQUEST and DEPENDENCY calls", () => {
      const requestEnvelopes = createMockEnvelopes(2, TelemetryType.REQUEST);
      const dependencyEnvelopes = createMockEnvelopes(1, TelemetryType.DEPENDENCY);

      customerSDKStatsMetrics.countSuccessfulItems(requestEnvelopes);
      customerSDKStatsMetrics.countSuccessfulItems(dependencyEnvelopes);

      const mockObservableResult = {
        observe: vi.fn(),
      };

      const successCallback = (customerSDKStatsMetrics as any).itemSuccessCallback.bind(
        customerSDKStatsMetrics,
      );
      successCallback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledTimes(2);

      // Check REQUEST telemetry
      const requestCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2].telemetry_type === TelemetryType.REQUEST,
      );
      expect(requestCall).toBeDefined();
      expect(requestCall![1]).toBe(2); // Count should be 2

      // Check DEPENDENCY telemetry
      const dependencyCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2].telemetry_type === TelemetryType.DEPENDENCY,
      );
      expect(dependencyCall).toBeDefined();
      expect(dependencyCall![1]).toBe(1); // Count should be 1
    });

    it("should track successful items for non-REQUEST/DEPENDENCY telemetry types", () => {
      const traceEnvelopes = createMockEnvelopes(3, TelemetryType.TRACE);
      const customEventEnvelopes = createMockEnvelopes(2, TelemetryType.CUSTOM_EVENT);

      customerSDKStatsMetrics.countSuccessfulItems(traceEnvelopes);
      customerSDKStatsMetrics.countSuccessfulItems(customEventEnvelopes);

      const mockObservableResult = {
        observe: vi.fn(),
      };

      const successCallback = (customerSDKStatsMetrics as any).itemSuccessCallback.bind(
        customerSDKStatsMetrics,
      );
      successCallback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledTimes(2);

      // Check TRACE telemetry
      const traceCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2].telemetry_type === TelemetryType.TRACE,
      );
      expect(traceCall).toBeDefined();
      expect(traceCall![1]).toBe(3); // Count should be 3

      // Check CUSTOM_EVENT telemetry
      const eventCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2].telemetry_type === TelemetryType.CUSTOM_EVENT,
      );
      expect(eventCall).toBeDefined();
      expect(eventCall![1]).toBe(2); // Count should be 2
    });

    it("should handle mixed telemetry types correctly", () => {
      const requestEnvelopes = createMockEnvelopes(1, TelemetryType.REQUEST);
      const dependencyEnvelopes = createMockEnvelopes(2, TelemetryType.DEPENDENCY);
      const traceEnvelopes = createMockEnvelopes(10, TelemetryType.TRACE);
      const eventEnvelopes = createMockEnvelopes(5, TelemetryType.CUSTOM_EVENT);

      customerSDKStatsMetrics.countSuccessfulItems(requestEnvelopes);
      customerSDKStatsMetrics.countSuccessfulItems(dependencyEnvelopes);
      customerSDKStatsMetrics.countSuccessfulItems(traceEnvelopes);
      customerSDKStatsMetrics.countSuccessfulItems(eventEnvelopes);

      const mockObservableResult = {
        observe: vi.fn(),
      };

      const successCallback = (customerSDKStatsMetrics as any).itemSuccessCallback.bind(
        customerSDKStatsMetrics,
      );
      successCallback(mockObservableResult);

      expect(mockObservableResult.observe).toHaveBeenCalledTimes(4);

      // Check REQUEST telemetry
      const requestCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2].telemetry_type === TelemetryType.REQUEST,
      );
      expect(requestCall).toBeDefined();
      expect(requestCall![1]).toBe(1); // Count should be 1

      // Check DEPENDENCY telemetry
      const dependencyCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2].telemetry_type === TelemetryType.DEPENDENCY,
      );
      expect(dependencyCall).toBeDefined();
      expect(dependencyCall![1]).toBe(2); // Count should be 2

      // Check TRACE telemetry
      const traceCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2].telemetry_type === TelemetryType.TRACE,
      );
      expect(traceCall).toBeDefined();
      expect(traceCall![1]).toBe(10); // Count should be 10

      // Check CUSTOM_EVENT telemetry
      const eventCall = mockObservableResult.observe.mock.calls.find(
        (call: any) => call[2].telemetry_type === TelemetryType.CUSTOM_EVENT,
      );
      expect(eventCall).toBeDefined();
      expect(eventCall![1]).toBe(5); // Count should be 5
    });

    it("should reset counters after observable callback", () => {
      const requestEnvelopes = createMockEnvelopes(2, TelemetryType.REQUEST);
      customerSDKStatsMetrics.countSuccessfulItems(requestEnvelopes);

      const mockObservableResult = {
        observe: vi.fn(),
      };

      const successCallback = (customerSDKStatsMetrics as any).itemSuccessCallback.bind(
        customerSDKStatsMetrics,
      );

      // First call should have items
      successCallback(mockObservableResult);
      expect(mockObservableResult.observe).toHaveBeenCalledWith(
        expect.any(Object),
        2,
        expect.objectContaining({
          telemetry_type: TelemetryType.REQUEST,
        }),
      );

      // Reset mock for second call
      mockObservableResult.observe.mockClear();

      // Second call should have no telemetry (counter reset)
      successCallback(mockObservableResult);
      expect(mockObservableResult.observe).not.toHaveBeenCalled();
    });

    describe("dropped telemetry telemetry_success field marking", () => {
      // Helper function to create mock envelopes with specific success values
      function createMockEnvelopesWithSuccess(
        count: number,
        telemetryType: TelemetryType,
        successValue?: boolean,
      ): Envelope[] {
        const envelopes: Envelope[] = [];

        let baseType: string;
        switch (telemetryType) {
          case TelemetryType.REQUEST:
            baseType = "RequestData";
            break;
          case TelemetryType.DEPENDENCY:
            baseType = "RemoteDependencyData";
            break;
          default:
            baseType = "MessageData";
            break;
        }

        for (let i = 0; i < count; i++) {
          const baseData: any = { version: 2 };

          // Add success field for REQUEST and DEPENDENCY types when provided
          if (
            (telemetryType === TelemetryType.REQUEST ||
              telemetryType === TelemetryType.DEPENDENCY) &&
            successValue !== undefined
          ) {
            baseData.success = successValue;
          }

          envelopes.push({
            name: `Microsoft.ApplicationInsights.${baseType}`,
            time: new Date(),
            instrumentationKey: "00000000-0000-0000-0000-000000000000",
            data: {
              baseType: baseType,
              baseData: baseData,
            },
          });
        }

        return envelopes;
      }

      it("should mark telemetry_success as true for dropped REQUEST envelopes with success=true", () => {
        const successfulRequestEnvelopes = createMockEnvelopesWithSuccess(
          2,
          TelemetryType.REQUEST,
          true,
        );
        customerSDKStatsMetrics.countDroppedItems(
          successfulRequestEnvelopes,
          DropCode.CLIENT_EXCEPTION,
        );

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        expect(mockObservableResult.observe).toHaveBeenCalledWith(
          expect.any(Object),
          2,
          expect.objectContaining({
            telemetry_type: TelemetryType.REQUEST,
            "drop.code": DropCode.CLIENT_EXCEPTION,
            telemetry_success: true,
          }),
        );
      });

      it("should mark telemetry_success as false for dropped REQUEST envelopes with success=false", () => {
        const failedRequestEnvelopes = createMockEnvelopesWithSuccess(
          3,
          TelemetryType.REQUEST,
          false,
        );
        customerSDKStatsMetrics.countDroppedItems(failedRequestEnvelopes, DropCode.UNKNOWN);

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        expect(mockObservableResult.observe).toHaveBeenCalledWith(
          expect.any(Object),
          3,
          expect.objectContaining({
            telemetry_type: TelemetryType.REQUEST,
            "drop.code": DropCode.UNKNOWN,
            telemetry_success: false,
          }),
        );
      });

      it("should mark telemetry_success as true for dropped DEPENDENCY envelopes with success=true", () => {
        const successfulDependencyEnvelopes = createMockEnvelopesWithSuccess(
          4,
          TelemetryType.DEPENDENCY,
          true,
        );
        customerSDKStatsMetrics.countDroppedItems(
          successfulDependencyEnvelopes,
          DropCode.CLIENT_STORAGE_DISABLED,
        );

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        expect(mockObservableResult.observe).toHaveBeenCalledWith(
          expect.any(Object),
          4,
          expect.objectContaining({
            telemetry_type: TelemetryType.DEPENDENCY,
            "drop.code": DropCode.CLIENT_STORAGE_DISABLED,
            telemetry_success: true,
          }),
        );
      });

      it("should mark telemetry_success as false for dropped DEPENDENCY envelopes with success=false", () => {
        const failedDependencyEnvelopes = createMockEnvelopesWithSuccess(
          1,
          TelemetryType.DEPENDENCY,
          false,
        );
        customerSDKStatsMetrics.countDroppedItems(
          failedDependencyEnvelopes,
          DropCode.CLIENT_STORAGE_DISABLED,
        );

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        expect(mockObservableResult.observe).toHaveBeenCalledWith(
          expect.any(Object),
          1,
          expect.objectContaining({
            telemetry_type: TelemetryType.DEPENDENCY,
            "drop.code": DropCode.CLIENT_STORAGE_DISABLED,
            telemetry_success: false,
          }),
        );
      });

      it("should not include telemetry_success for dropped REQUEST envelopes with undefined success", () => {
        const requestEnvelopesWithoutSuccess = createMockEnvelopesWithSuccess(
          2,
          TelemetryType.REQUEST,
          undefined,
        );
        customerSDKStatsMetrics.countDroppedItems(
          requestEnvelopesWithoutSuccess,
          DropCode.CLIENT_EXCEPTION,
        );

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        // Should call observe but without telemetry_success since success is undefined
        expect(mockObservableResult.observe).toHaveBeenCalledWith(
          expect.any(Object),
          2,
          expect.objectContaining({
            telemetry_type: TelemetryType.REQUEST,
            "drop.code": DropCode.CLIENT_EXCEPTION,
          }),
        );

        // Verify telemetry_success is NOT included in the attributes
        const observeCall = mockObservableResult.observe.mock.calls[0];
        const attributes = observeCall[2];
        expect(attributes).not.toHaveProperty("telemetry_success");
      });

      it("should not include telemetry_success for dropped DEPENDENCY envelopes with undefined success", () => {
        const dependencyEnvelopesWithoutSuccess = createMockEnvelopesWithSuccess(
          3,
          TelemetryType.DEPENDENCY,
          undefined,
        );
        customerSDKStatsMetrics.countDroppedItems(
          dependencyEnvelopesWithoutSuccess,
          DropCode.UNKNOWN,
        );

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        // Should call observe but without telemetry_success since success is undefined
        expect(mockObservableResult.observe).toHaveBeenCalledWith(
          expect.any(Object),
          3,
          expect.objectContaining({
            telemetry_type: TelemetryType.DEPENDENCY,
            "drop.code": DropCode.UNKNOWN,
          }),
        );

        // Verify telemetry_success is NOT included in the attributes
        const observeCall = mockObservableResult.observe.mock.calls[0];
        const attributes = observeCall[2];
        expect(attributes).not.toHaveProperty("telemetry_success");
      });

      it("should not include telemetry_success for dropped non-REQUEST/DEPENDENCY telemetry types", () => {
        const traceEnvelopes = createMockEnvelopes(2, TelemetryType.TRACE);
        const eventEnvelopes = createMockEnvelopes(1, TelemetryType.CUSTOM_EVENT);

        customerSDKStatsMetrics.countDroppedItems(traceEnvelopes, DropCode.CLIENT_EXCEPTION);
        customerSDKStatsMetrics.countDroppedItems(eventEnvelopes, DropCode.UNKNOWN);

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        expect(mockObservableResult.observe).toHaveBeenCalledTimes(2);

        // Check TRACE telemetry - should not have telemetry_success
        const traceCall = mockObservableResult.observe.mock.calls.find(
          (call: any) => call[2].telemetry_type === TelemetryType.TRACE,
        );
        expect(traceCall).toBeDefined();
        expect(traceCall![2]).not.toHaveProperty("telemetry_success");

        // Check CUSTOM_EVENT telemetry - should not have telemetry_success
        const eventCall = mockObservableResult.observe.mock.calls.find(
          (call: any) => call[2].telemetry_type === TelemetryType.CUSTOM_EVENT,
        );
        expect(eventCall).toBeDefined();
        expect(eventCall![2]).not.toHaveProperty("telemetry_success");
      });

      it("should handle mixed success states for multiple dropped REQUEST envelopes", () => {
        // Create envelopes with different success states
        const successfulEnvelopes = createMockEnvelopesWithSuccess(2, TelemetryType.REQUEST, true);
        const failedEnvelopes = createMockEnvelopesWithSuccess(3, TelemetryType.REQUEST, false);
        const undefinedEnvelopes = createMockEnvelopesWithSuccess(
          1,
          TelemetryType.REQUEST,
          undefined,
        );

        // Drop them with different drop codes
        customerSDKStatsMetrics.countDroppedItems(successfulEnvelopes, DropCode.CLIENT_EXCEPTION);
        customerSDKStatsMetrics.countDroppedItems(failedEnvelopes, DropCode.UNKNOWN);
        customerSDKStatsMetrics.countDroppedItems(
          undefinedEnvelopes,
          DropCode.CLIENT_STORAGE_DISABLED,
        );

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        expect(mockObservableResult.observe).toHaveBeenCalledTimes(3);

        // Find and verify successful envelopes call
        const successCall = mockObservableResult.observe.mock.calls.find(
          (call: any) => call[2]["drop.code"] === DropCode.CLIENT_EXCEPTION,
        );
        expect(successCall).toBeDefined();
        expect(successCall![1]).toBe(2); // count
        expect(successCall![2]).toMatchObject({
          telemetry_type: TelemetryType.REQUEST,
          "drop.code": DropCode.CLIENT_EXCEPTION,
          telemetry_success: true,
        });

        // Find and verify failed envelopes call
        const failedCall = mockObservableResult.observe.mock.calls.find(
          (call: any) => call[2]["drop.code"] === DropCode.UNKNOWN,
        );
        expect(failedCall).toBeDefined();
        expect(failedCall![1]).toBe(3); // count
        expect(failedCall![2]).toMatchObject({
          telemetry_type: TelemetryType.REQUEST,
          "drop.code": DropCode.UNKNOWN,
          telemetry_success: false,
        });

        // Find and verify undefined success envelopes call
        const undefinedCall = mockObservableResult.observe.mock.calls.find(
          (call: any) => call[2]["drop.code"] === DropCode.CLIENT_STORAGE_DISABLED,
        );
        expect(undefinedCall).toBeDefined();
        expect(undefinedCall![1]).toBe(1); // count
        expect(undefinedCall![2]).toMatchObject({
          telemetry_type: TelemetryType.REQUEST,
          "drop.code": DropCode.CLIENT_STORAGE_DISABLED,
        });
        expect(undefinedCall![2]).not.toHaveProperty("telemetry_success");
      });

      it("should handle mixed success states for multiple dropped DEPENDENCY envelopes", () => {
        // Create envelopes with different success states
        const successfulEnvelopes = createMockEnvelopesWithSuccess(
          1,
          TelemetryType.DEPENDENCY,
          true,
        );
        const failedEnvelopes = createMockEnvelopesWithSuccess(2, TelemetryType.DEPENDENCY, false);
        const undefinedEnvelopes = createMockEnvelopesWithSuccess(
          4,
          TelemetryType.DEPENDENCY,
          undefined,
        );

        // Drop them with different drop codes
        customerSDKStatsMetrics.countDroppedItems(
          successfulEnvelopes,
          DropCode.CLIENT_STORAGE_DISABLED,
        );
        customerSDKStatsMetrics.countDroppedItems(failedEnvelopes, DropCode.CLIENT_EXCEPTION);
        customerSDKStatsMetrics.countDroppedItems(undefinedEnvelopes, DropCode.CLIENT_READONLY);

        const mockObservableResult = {
          observe: vi.fn(),
        };

        const dropCallback = (customerSDKStatsMetrics as any).itemDropCallback.bind(
          customerSDKStatsMetrics,
        );
        dropCallback(mockObservableResult);

        expect(mockObservableResult.observe).toHaveBeenCalledTimes(3);

        // Find and verify successful envelopes call
        const successCall = mockObservableResult.observe.mock.calls.find(
          (call: any) => call[2]["drop.code"] === DropCode.CLIENT_STORAGE_DISABLED,
        );
        expect(successCall).toBeDefined();
        expect(successCall![1]).toBe(1); // count
        expect(successCall![2]).toMatchObject({
          telemetry_type: TelemetryType.DEPENDENCY,
          "drop.code": DropCode.CLIENT_STORAGE_DISABLED,
          telemetry_success: true,
        });

        // Find and verify failed envelopes call
        const failedCall = mockObservableResult.observe.mock.calls.find(
          (call: any) => call[2]["drop.code"] === DropCode.CLIENT_EXCEPTION,
        );
        expect(failedCall).toBeDefined();
        expect(failedCall![1]).toBe(2); // count
        expect(failedCall![2]).toMatchObject({
          telemetry_type: TelemetryType.DEPENDENCY,
          "drop.code": DropCode.CLIENT_EXCEPTION,
          telemetry_success: false,
        });

        // Find and verify undefined success envelopes call
        const undefinedCall = mockObservableResult.observe.mock.calls.find(
          (call: any) => call[2]["drop.code"] === DropCode.CLIENT_READONLY,
        );
        expect(undefinedCall).toBeDefined();
        expect(undefinedCall![1]).toBe(4); // count
        expect(undefinedCall![2]).toMatchObject({
          telemetry_type: TelemetryType.DEPENDENCY,
          "drop.code": DropCode.CLIENT_READONLY,
        });
        expect(undefinedCall![2]).not.toHaveProperty("telemetry_success");
      });
    });
  });

  describe("countSuccessfulItems", () => {
    it("should track successful items correctly", () => {
      customerSDKStatsMetrics.countSuccessfulItems(
        createMockEnvelopes(10, TelemetryType.CUSTOM_EVENT),
      );

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemSuccessCount.size).toBe(1);
      expect(counter.totalItemSuccessCount.get(TelemetryType.CUSTOM_EVENT)).toBe(10);
    });

    it("should aggregate counts for same telemetry type", () => {
      customerSDKStatsMetrics.countSuccessfulItems(createMockEnvelopes(5, TelemetryType.TRACE));
      customerSDKStatsMetrics.countSuccessfulItems(createMockEnvelopes(3, TelemetryType.TRACE));

      const counter = (customerSDKStatsMetrics as any).customerSDKStatsCounter;
      expect(counter.totalItemSuccessCount.size).toBe(1);
      expect(counter.totalItemSuccessCount.get(TelemetryType.TRACE)).toBe(8);
    });
  });
});
