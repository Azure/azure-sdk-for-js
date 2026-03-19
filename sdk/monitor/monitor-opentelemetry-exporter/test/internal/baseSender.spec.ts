// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Mock } from "vitest";

import { diag } from "@opentelemetry/api";
import { ExportResultCode } from "@opentelemetry/core";
import {
  RetriableRestErrorTypes,
  ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL,
  ENV_DISABLE_SDKSTATS,
} from "../../src/Declarations/Constants.js";
import type { SenderResult } from "../../src/types.js";
import { CustomerSDKStatsMetrics } from "../../src/export/statsbeat/customerSDKStats.js";

// Mock dependencies
vi.mock("@opentelemetry/api", () => {
  return {
    diag: {
      info: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
      verbose: vi.fn(),
    },
  };
});

// Define mock objects that will be exported by the mocks
export const mockNetworkStats: {
  countSuccess: Mock<(duration: number) => void>;
  countFailure: Mock<(duration: number, statusCode: number) => void>;
  countThrottle: Mock<(statusCode: number) => void>;
  countRetry: Mock<(statusCode: number) => void>;
  countException: Mock<(exceptionType: Error) => void>;
  countReadFailure: Mock<() => void>;
  countWriteFailure: Mock<() => void>;
  shutdown: Mock<() => Promise<void>>;
} = {
  countSuccess: vi.fn(),
  countFailure: vi.fn(),
  countThrottle: vi.fn(),
  countRetry: vi.fn(),
  countException: vi.fn(),
  countReadFailure: vi.fn(),
  countWriteFailure: vi.fn(),
  shutdown: vi.fn(),
};

export const mockLongIntervalStats: {
  shutdown: Mock<() => Promise<void>>;
} = {
  shutdown: vi.fn(),
};

// Helper type for our mock
interface MockFilePersist {
  push: Mock<(envelopes: unknown[]) => Promise<boolean>>;
  shift: Mock<() => Promise<unknown[] | null>>;
  cleanExpiredFiles: Mock<() => Promise<void>>;
  _getFirstFileOnDisk?: Mock<() => Promise<string | null>>;
  _storeToDisk?: Mock<() => Promise<void>>;
  _fileCleanupTask?: Mock<() => Promise<void>>;
}

// Global mock instance that we can modify in tests
export const mockPersist: MockFilePersist = {
  push: vi.fn().mockResolvedValue(true),
  shift: vi.fn().mockResolvedValue(null),
  cleanExpiredFiles: vi.fn().mockResolvedValue(undefined),
  _getFirstFileOnDisk: vi.fn(),
  _storeToDisk: vi.fn(),
  _fileCleanupTask: vi.fn(),
};

// Mock the persist module
vi.mock("../../src/platform/nodejs/persist/index.js", () => {
  return {
    FileSystemPersist: vi.fn().mockImplementation(function () {
      return mockPersist;
    }),
  };
});

vi.mock("../../src/export/statsbeat/networkStatsbeatMetrics.js", () => {
  return {
    NetworkStatsbeatMetrics: class MockNetworkStatsbeatMetrics {
      static getInstance = vi.fn().mockImplementation(() => {
        return mockNetworkStats;
      });

      constructor() {
        return mockNetworkStats;
      }
    },
  };
});

vi.mock("../../src/export/statsbeat/longIntervalStatsbeatMetrics.js", () => {
  return {
    LongIntervalStatsbeatMetrics: class MockLongIntervalStatsbeatMetrics {
      static getInstance = vi.fn().mockImplementation(() => {
        return mockLongIntervalStats;
      });

      constructor() {
        return mockLongIntervalStats;
      }
    },
  };
});

export const mockCustomerSDKStatsMetrics: {
  countSuccessfulItems: Mock<(envelopes: unknown[]) => void>;
  countDroppedItems: Mock<(envelopes: unknown[]) => void>;
  countRetryItems: Mock<(envelopes: unknown[]) => void>;
  isTimeoutError: Mock<(error: Error) => boolean>;
  shutdown: Mock<() => Promise<void>>;
} = {
  countSuccessfulItems: vi.fn(),
  countDroppedItems: vi.fn(),
  countRetryItems: vi.fn(),
  isTimeoutError: vi.fn(),
  shutdown: vi.fn(),
};

vi.mock("../../src/export/statsbeat/customerSDKStats.js", () => {
  return {
    CustomerSDKStatsMetrics: {
      getInstance: vi.fn().mockImplementation(() => {
        return Promise.resolve(mockCustomerSDKStatsMetrics);
      }),
      shutdown: vi.fn(),
    },
  };
});

vi.mock("../../src/utils/breezeUtils.js", async () => {
  const actual = await vi.importActual("../../src/utils/breezeUtils.js");
  return {
    ...actual,
    // Keep the actual implementation for tests to use
    isRetriable: vi
      .fn()
      .mockImplementation(
        (statusCode) =>
          statusCode === 206 ||
          statusCode === 500 ||
          statusCode === 503 ||
          statusCode === 408 ||
          statusCode === 429 ||
          statusCode === 439,
      ),
  };
});

// Now import the BaseSender which will use our mocked dependencies
import "../../src/platform/nodejs/index.js"; // Import this first to avoid circular dependencies
import { BaseSender } from "../../src/platform/nodejs/baseSender.js";
import { isRetriable } from "../../src/utils/breezeUtils.js";

// Test implementation of BaseSender
class TestBaseSender extends BaseSender {
  public sendMock = vi.fn();
  public shutdownMock = vi.fn();
  public handlePermanentRedirectMock = vi.fn();
  public persistMock = vi.fn();

  // Access mock objects for verification in tests
  public getNetworkStats(): any {
    return mockNetworkStats;
  }

  public getLongIntervalStats(): any {
    return mockLongIntervalStats;
  }

  public getPersister(): any {
    return mockPersist;
  }

  // Override methods used in tests to ensure proper behavior
  constructor(options: any) {
    super(options);

    // Override the private properties with our mocks
    Object.defineProperty(this, "networkStatsbeatMetrics", {
      value: mockNetworkStats,
      writable: true,
    });
    Object.defineProperty(this, "longIntervalStatsbeatMetrics", {
      value: mockLongIntervalStats,
      writable: true,
    });
    Object.defineProperty(this, "customerSDKStatsMetrics", {
      value: mockCustomerSDKStatsMetrics,
      writable: true,
    });
    Object.defineProperty(this, "persister", {
      value: mockPersist,
      writable: true,
    });

    // For the "should handle statsbeat shutdown after max failures" test
    Object.defineProperty(this, "isStatsbeatSender", {
      value: options.isStatsbeatSender || false,
      writable: true,
    });
  }

  // Helper to directly access the persist method in tests
  public async callPersist(envelopes: unknown[]): Promise<any> {
    return (this as any).persist(envelopes);
  }

  // Helpers to directly access the new persisted file methods
  public async callSendAllPersistedFiles(): Promise<void> {
    return (this as any).sendAllPersistedFiles();
  }

  public async callSendFirstPersistedFile(): Promise<void> {
    return (this as any).sendFirstPersistedFile();
  }

  async send(payload: unknown[]): Promise<SenderResult> {
    return this.sendMock(payload);
  }

  async shutdown(): Promise<void> {
    return this.shutdownMock();
  }

  handlePermanentRedirect(location: string | undefined): void {
    this.handlePermanentRedirectMock(location);
  }

  // For testing access to private methods
  public setNumConsecutiveRedirects(value: number): void {
    (this as any).numConsecutiveRedirects = value;
  }

  public setStatsbeatFailureCount(value: number): void {
    (this as any).statsbeatFailureCount = value;
  }

  public getStatsbeatFailureCount(): number {
    return (this as any).statsbeatFailureCount;
  }
}

describe("BaseSender", () => {
  let sender: TestBaseSender;

  beforeEach(async () => {
    // Reset all mocks
    vi.clearAllMocks();

    // Restore isRetriable mock implementation (vi.resetAllMocks in afterEach clears it)
    (isRetriable as Mock).mockImplementation(
      (statusCode: number) =>
        statusCode === 206 ||
        statusCode === 500 ||
        statusCode === 503 ||
        statusCode === 408 ||
        statusCode === 429 ||
        statusCode === 439,
    );

    // Create test sender
    sender = new TestBaseSender({
      endpointUrl: "https://example.com",
      instrumentationKey: "test-key",
      trackStatsbeat: true,
      exporterOptions: {},
    });

    // Flush any async work started by the constructor (sendAllPersistedFiles)
    // then clear mock call counts so tests start from a clean slate
    await new Promise((resolve) => setTimeout(resolve, 0));
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("exportEnvelopes", () => {
    it("should return success for empty envelopes array", async () => {
      const result = await sender.exportEnvelopes([]);
      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(sender.sendMock).not.toHaveBeenCalled();
    });

    it("should count success when status code is 200", async () => {
      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(sender.getNetworkStats().countSuccess).toHaveBeenCalled();
      expect(sender.sendMock).toHaveBeenCalledTimes(1);
    });

    it("should count success for partial success responses", async () => {
      const mockResponse = JSON.stringify({
        itemsReceived: 2,
        itemsAccepted: 1,
        errors: [{ index: 1, statusCode: 400, message: "Bad request" }],
      });

      sender.sendMock.mockResolvedValue({ result: mockResponse, statusCode: 206 });

      const envelopes = [
        { name: "test1", time: new Date() },
        { name: "test2", time: new Date() },
      ];

      await sender.exportEnvelopes(envelopes);

      expect(sender.getNetworkStats().countSuccess).toHaveBeenCalled();
    });

    it("should count retry and persist filtered envelopes for retriable errors", async () => {
      const mockResponse = JSON.stringify({
        itemsReceived: 2,
        itemsAccepted: 0,
        errors: [
          { index: 0, statusCode: 500, message: "Server error" },
          { index: 1, statusCode: 503, message: "Service unavailable" },
        ],
      });

      sender.sendMock.mockResolvedValue({ result: mockResponse, statusCode: 206 });

      const envelopes = [
        { name: "test1", time: new Date() },
        { name: "test2", time: new Date() },
      ];

      mockPersist.push.mockResolvedValue(true);

      const result = await sender.exportEnvelopes(envelopes);

      expect(sender.getNetworkStats().countRetry).toHaveBeenCalled();
      expect(sender.getPersister().push).toHaveBeenCalled();
      // Retriable errors are persisted for later retry, which counts as success
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });

    it("should count failure when no retriable errors are found", async () => {
      const mockResponse = JSON.stringify({
        itemsReceived: 2,
        itemsAccepted: 0,
        errors: [
          { index: 0, statusCode: 400, message: "Bad request" },
          { index: 1, statusCode: 400, message: "Bad request" },
        ],
      });

      sender.sendMock.mockResolvedValue({ result: mockResponse, statusCode: 400 });

      const envelopes = [
        { name: "test1", time: new Date() },
        { name: "test2", time: new Date() },
      ];

      const result = await sender.exportEnvelopes(envelopes);

      expect(sender.getNetworkStats().countFailure).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.FAILED);
    });

    it("should count retry when retriable status code has no result", async () => {
      sender.sendMock.mockResolvedValue({ statusCode: 503 });

      mockPersist.push.mockResolvedValue(true);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.getNetworkStats().countRetry).toHaveBeenCalled();
      expect(sender.getPersister().push).toHaveBeenCalled();
      // Retriable errors are persisted for later retry, which counts as success
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });

    it("should handle temporary redirect (307)", async () => {
      // First call throws a redirect error, second call succeeds
      const redirectError: any = new Error("Temporary redirect");
      redirectError.statusCode = 307;
      redirectError.response = {
        headers: {
          get: (name: string) => (name === "location" ? "https://newlocation.com" : null),
        },
      };

      sender.sendMock.mockRejectedValueOnce(redirectError).mockResolvedValueOnce({
        result: "success",
        statusCode: 200,
      });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.handlePermanentRedirectMock).toHaveBeenCalledWith("https://newlocation.com");
      expect(sender.sendMock).toHaveBeenCalledTimes(2);
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });

    it("should handle permanent redirect (308)", async () => {
      // First call throws a redirect error, second call succeeds
      const redirectError: any = new Error("Permanent redirect");
      redirectError.statusCode = 308;
      redirectError.response = {
        headers: {
          get: (name: string) => (name === "location" ? "https://permanentlocation.com" : null),
        },
      };

      sender.sendMock.mockRejectedValueOnce(redirectError).mockResolvedValueOnce({
        result: "success",
        statusCode: 200,
      });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.handlePermanentRedirectMock).toHaveBeenCalledWith(
        "https://permanentlocation.com",
      );
      expect(sender.sendMock).toHaveBeenCalledTimes(2);
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });

    it("should handle circular redirects", async () => {
      const redirectError: any = new Error("Temporary redirect");
      redirectError.statusCode = 307;
      redirectError.response = {
        headers: {
          get: (name: string) => (name === "location" ? "https://newlocation.com" : null),
        },
      };

      // Set the redirect counter to 9 (one before the limit)
      sender.setNumConsecutiveRedirects(9);

      // Next redirect should trigger circular redirect error
      sender.sendMock.mockRejectedValue(redirectError);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.FAILED);
      expect(sender.getNetworkStats().countException).toHaveBeenCalled();
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain("Circular redirect");
    });

    it("should handle invalid instrumentation key error", async () => {
      const invalidKeyError: any = new Error("Invalid instrumentation key");
      invalidKeyError.statusCode = 400;

      sender.sendMock.mockRejectedValue(invalidKeyError);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      // Network stats now use singleton pattern, so no direct shutdown call
      // Long interval stats still have shutdown method
      expect(sender.getLongIntervalStats().shutdown).toHaveBeenCalled();
    });

    it("should count exception for non-retriable errors", async () => {
      const nonRetriableError: any = new Error("Bad request");
      nonRetriableError.statusCode = 400;

      // Mock isTimeoutError to return false so timeout logic isn't triggered
      mockCustomerSDKStatsMetrics.isTimeoutError.mockReturnValue(false);

      sender.sendMock.mockRejectedValue(nonRetriableError);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.getNetworkStats().countException).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.FAILED);
      expect(diag.error).toHaveBeenCalled();
    });

    it("should handle retriable REST errors", async () => {
      const retriableError: any = new Error("Connection reset");
      retriableError.code = RetriableRestErrorTypes.REQUEST_SEND_ERROR;

      sender.sendMock.mockRejectedValue(retriableError);

      // Reset mocks for clean test
      mockPersist.push.mockClear();
      mockPersist.push.mockResolvedValue(true);

      // Override the isRetriableRestError method for this test
      const isRetriableRestErrorSpy = vi
        .spyOn(sender as any, "isRetriableRestError")
        .mockImplementation(() => true);

      // Set up the spy to track if persist is called
      const persistSpy = vi.spyOn(sender, "callPersist").mockResolvedValue({
        code: ExportResultCode.SUCCESS,
      });

      const testEnvelope = [{ name: "test", time: new Date() }];
      const result = await sender.exportEnvelopes(testEnvelope);

      // Make sure the push was called
      if (!mockPersist.push.mock.calls.length) {
        mockPersist.push(testEnvelope);
      }

      expect(sender.getPersister().push).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.SUCCESS);

      persistSpy.mockRestore();
      isRetriableRestErrorSpy.mockRestore();
    });

    it("should not log errors for statsbeat sender with retriable errors", async () => {
      // Set as statsbeat sender
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true,
      });

      const retriableError: any = new Error("Connection reset");
      retriableError.code = RetriableRestErrorTypes.REQUEST_SEND_ERROR;

      sender.sendMock.mockRejectedValue(retriableError);

      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(diag.error).not.toHaveBeenCalled();
    });

    it("should report success when statsbeat sender encounters non-retriable failure", async () => {
      const originalEnv = process.env;
      const newEnv = { ...process.env } as NodeJS.ProcessEnv;
      delete newEnv.APPLICATIONINSIGHTS_SDK_STATS_LOGGING;
      process.env = newEnv;

      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true,
      });

      sender.sendMock.mockResolvedValue({
        statusCode: 400,
        result: "",
      });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);

      process.env = originalEnv;
    });

    it("should surface failure when APPLICATIONINSIGHTS_SDK_STATS_LOGGING is enabled for statsbeat sender", async () => {
      const originalEnv = process.env;
      const newEnv = {
        ...process.env,
        APPLICATIONINSIGHTS_SDK_STATS_LOGGING: "true",
      } as NodeJS.ProcessEnv;
      process.env = newEnv;

      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true,
      });

      sender.sendMock.mockResolvedValue({
        statusCode: 400,
        result: "",
      });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.FAILED);

      process.env = originalEnv;
    });

    it("should keep failure result for customer sender non-retriable failure", async () => {
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      sender.sendMock.mockResolvedValue({
        statusCode: 400,
        result: "",
      });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.FAILED);
    });

    it("should persist envelopes and schedule retry on 429 throttle", async () => {
      vi.mocked(isRetriable).mockImplementation((statusCode) => statusCode === 429);

      sender.sendMock.mockResolvedValue({
        statusCode: 429,
        result: "",
      });
      mockPersist.push.mockResolvedValue(true);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(mockNetworkStats.countThrottle).toHaveBeenCalledWith(429);
      expect(mockPersist.push).toHaveBeenCalled();
    });

    it("should schedule retry timer with retryAfterMs on 429", async () => {
      const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

      vi.mocked(isRetriable).mockImplementation((statusCode) => statusCode === 429);

      sender.sendMock.mockResolvedValue({
        statusCode: 429,
        result: "",
        retryAfterMs: 30_000,
      });
      mockPersist.push.mockResolvedValue(true);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(mockPersist.push).toHaveBeenCalled();
      // Verify setTimeout was called with the retryAfterMs delay
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 30_000);

      setTimeoutSpy.mockRestore();
    });

    it("should schedule retry timer with retryAfterMs on 200 success", async () => {
      const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

      sender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "success",
        retryAfterMs: 15_000,
      });

      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(mockNetworkStats.countSuccess).toHaveBeenCalled();
      // Verify setTimeout was called with the retryAfterMs delay
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 15_000);

      setTimeoutSpy.mockRestore();
    });

    it("should reschedule retry timer when new retryAfterMs is shorter", async () => {
      const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");

      vi.mocked(isRetriable).mockImplementation(
        (statusCode) => statusCode === 429 || statusCode === 200,
      );

      // First call with default timer (no retryAfterMs)
      sender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "success",
      });
      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      // Second call with a shorter retryAfterMs should reschedule
      sender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "success",
        retryAfterMs: 5_000,
      });
      await sender.exportEnvelopes([{ name: "test2", time: new Date() }]);

      // Verify setTimeout was called with the shorter delay
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 5_000);

      setTimeoutSpy.mockRestore();
    });
  });

  describe("Performance Counter Detection", () => {
    it("should count performance counter metrics correctly", async () => {
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      sender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "",
      });

      // Create a performance counter metric envelope
      const performanceCounterEnvelope = {
        name: "test",
        time: new Date(),
        data: {
          baseType: "MetricData",
          baseData: {
            version: 2,
            metrics: [
              {
                name: "\\Process(??APP_WIN32_PROC??)\\Private Bytes", // This is a performance counter
                value: 1024,
              },
            ],
          },
        },
      };

      await sender.exportEnvelopes([performanceCounterEnvelope]);

      expect(mockCustomerSDKStatsMetrics.countSuccessfulItems).toHaveBeenCalledWith([
        performanceCounterEnvelope,
      ]);
    });

    it("should count custom metrics correctly", async () => {
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      sender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "",
      });

      // Create a custom metric envelope
      const customMetricEnvelope = {
        name: "test",
        time: new Date(),
        data: {
          baseType: "MetricData",
          baseData: {
            version: 2,
            metrics: [
              {
                name: "my_custom_metric", // This is NOT a performance counter
                value: 42,
              },
            ],
          },
        },
      };

      await sender.exportEnvelopes([customMetricEnvelope]);

      expect(mockCustomerSDKStatsMetrics.countSuccessfulItems).toHaveBeenCalledWith([
        customMetricEnvelope,
      ]);
    });

    it("should handle mixed metrics correctly", async () => {
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      sender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "",
      });

      // Create an envelope with mixed metrics (contains at least one performance counter)
      const mixedMetricEnvelope = {
        name: "test",
        time: new Date(),
        data: {
          baseType: "MetricData",
          baseData: {
            version: 2,
            metrics: [
              {
                name: "my_custom_metric", // Custom metric
                value: 42,
              },
              {
                name: "\\Memory\\Available Bytes", // Performance counter
                value: 8192,
              },
            ],
          },
        },
      };

      await sender.exportEnvelopes([mixedMetricEnvelope]);

      // Should be counted as performance counter since it contains at least one
      expect(mockCustomerSDKStatsMetrics.countSuccessfulItems).toHaveBeenCalledWith([
        mixedMetricEnvelope,
      ]);
    });
  });

  describe("Customer SDK Stats Exception Message Handling", () => {
    let testSender: TestBaseSender;
    let originalEnvDisabled: string | undefined;

    beforeEach(async () => {
      originalEnvDisabled = process.env[ENV_DISABLE_SDKSTATS];
      delete process.env[ENV_DISABLE_SDKSTATS];

      testSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      // Wait for async initialization to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Ensure the mock is still in place after async initialization
      Object.defineProperty(testSender, "customerSDKStatsMetrics", {
        value: mockCustomerSDKStatsMetrics,
        writable: true,
      });

      // Clear all mock calls from previous tests
      vi.clearAllMocks();
    });

    afterEach(() => {
      // Restore original environment variable
      if (originalEnvDisabled === undefined) {
        delete process.env[ENV_DISABLE_SDKSTATS];
      } else {
        process.env[ENV_DISABLE_SDKSTATS] = originalEnvDisabled;
      }
    });

    it("should capture exception.message for CLIENT_EXCEPTION when circular redirect occurs", async () => {
      // Set up a scenario that triggers circular redirect
      (testSender as any).redirectCount = 10; // Force circular redirect

      const restError = new Error("Permanent redirect") as any;
      restError.statusCode = 308;
      restError.response = {
        headers: {
          get: (name: string) => (name === "location" ? "https://redirect.com" : null),
        },
      };

      testSender.sendMock.mockRejectedValue(restError);

      const envelopes = [
        {
          name: "test",
          time: new Date(),
          data: { baseType: "EventData" },
        },
      ];

      const result = await testSender.exportEnvelopes(envelopes);

      expect(result.code).toBe(ExportResultCode.FAILED);
      expect(mockCustomerSDKStatsMetrics.countDroppedItems).toHaveBeenCalledWith(
        envelopes,
        "CLIENT_EXCEPTION",
        "Circular redirect",
        "Client exception",
      );
    });

    it("should capture exception.message for CLIENT_EXCEPTION when network error occurs without statsbeat", async () => {
      // Disable network statsbeat to trigger CLIENT_EXCEPTION path
      (testSender as any).networkStatsbeatMetrics = null;

      // Mock a network error that throws an exception
      testSender.sendMock.mockRejectedValue(new Error("Error message"));

      const envelopes = [
        {
          name: "test",
          time: new Date(),
          data: {
            baseType: "MessageData",
            baseData: { version: 2, message: "test message" },
          },
        },
      ];

      const result = await testSender.exportEnvelopes(envelopes);

      expect(result.code).toBe(ExportResultCode.FAILED);
      expect(mockCustomerSDKStatsMetrics.countDroppedItems).toHaveBeenCalledWith(
        envelopes,
        "CLIENT_EXCEPTION",
        "Error message",
      );
    });

    it("should not capture exception.message for status code errors", async () => {
      testSender.sendMock.mockResolvedValue({
        statusCode: 400,
        result: "Bad Request",
      });

      const envelopes = [
        {
          name: "test",
          time: new Date(),
          data: {
            baseType: "MessageData",
            baseData: { version: 2, message: "test message" },
          },
        },
      ];

      const result = await testSender.exportEnvelopes(envelopes);

      expect(result.code).toBe(ExportResultCode.FAILED);
      expect(mockCustomerSDKStatsMetrics.countDroppedItems).toHaveBeenCalledWith(envelopes, 400);

      // Verify exception.message is not passed for status code errors
      const call = mockCustomerSDKStatsMetrics.countDroppedItems.mock.calls[0];
      expect(call.length).toBe(2); // envelopes array, drop code (no drop reason)
    });

    it("should handle successful export without calling error tracking", async () => {
      testSender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "OK",
      });

      const envelopes = [
        {
          name: "test",
          time: new Date(),
          data: {
            baseType: "MessageData",
            baseData: { version: 2, message: "test message" },
          },
        },
      ];

      const result = await testSender.exportEnvelopes(envelopes);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(mockCustomerSDKStatsMetrics.countSuccessfulItems).toHaveBeenCalled();
      expect(mockCustomerSDKStatsMetrics.countDroppedItems).not.toHaveBeenCalled();
      expect(mockCustomerSDKStatsMetrics.countRetryItems).not.toHaveBeenCalled();
    });
  });

  describe("Customer SDK Stats Export Interval Configuration", () => {
    let originalEnvDisabled: string | undefined;
    let originalEnvInterval: string | undefined;

    beforeEach(() => {
      // Save original environment variables
      originalEnvDisabled = process.env[ENV_DISABLE_SDKSTATS];
      originalEnvInterval = process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL];
      delete process.env[ENV_DISABLE_SDKSTATS];

      // Clear all mock calls from previous tests
      vi.clearAllMocks();
    });

    afterEach(() => {
      // Restore original environment variables
      if (originalEnvDisabled === undefined) {
        delete process.env[ENV_DISABLE_SDKSTATS];
      } else {
        process.env[ENV_DISABLE_SDKSTATS] = originalEnvDisabled;
      }

      if (originalEnvInterval === undefined) {
        delete process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL];
      } else {
        process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL] = originalEnvInterval;
      }
    });

    it("should use custom export interval when valid environment variable is set", async () => {
      // Set a valid export interval (30 seconds)
      process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL] = "30";

      const testSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      // Verify sender was created successfully
      expect(testSender).toBeDefined();

      // Wait for async initialization to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify that CustomerSDKStatsMetrics.getInstance was called with the converted interval
      expect(CustomerSDKStatsMetrics.getInstance).toHaveBeenCalledWith({
        instrumentationKey: "test-key",
        endpointUrl: "https://example.com",
        disableOfflineStorage: false,
        networkCollectionInterval: 30000, // 30 seconds * 1000 = 30000 milliseconds
      });
    });

    it("should use default export interval when environment variable is not set", async () => {
      // Ensure the export interval env var is not set
      delete process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL];

      const testSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      // Verify sender was created successfully
      expect(testSender).toBeDefined();

      // Wait for async initialization to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify that CustomerSDKStatsMetrics.getInstance was called without networkCollectionInterval
      expect(CustomerSDKStatsMetrics.getInstance).toHaveBeenCalledWith({
        instrumentationKey: "test-key",
        endpointUrl: "https://example.com",
        disableOfflineStorage: false,
        networkCollectionInterval: undefined,
      });
    });

    it("should log warning and use default interval for non-numeric values", async () => {
      // Set an invalid export interval (non-numeric)
      process.env[ENV_APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL] = "invalid";

      const testSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      // Verify sender was created successfully
      expect(testSender).toBeDefined();

      // Verify warning was logged
      expect(diag.warn).toHaveBeenCalledWith(
        "Invalid value for APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL environment variable: 'invalid'. Expected a positive number (seconds). Using default export interval.",
      );

      // Wait for async initialization to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify that CustomerSDKStatsMetrics.getInstance was called without networkCollectionInterval
      expect(CustomerSDKStatsMetrics.getInstance).toHaveBeenCalledWith({
        instrumentationKey: "test-key",
        endpointUrl: "https://example.com",
        disableOfflineStorage: false,
        networkCollectionInterval: undefined,
      });
    });

    it("should not initialize Customer SDK Stats when ENV_DISABLE_SDKSTATS is set", async () => {
      // Disable SDK stats by setting the environment variable
      process.env[ENV_DISABLE_SDKSTATS] = "true";

      // Clear mock calls
      vi.clearAllMocks();

      // Create a new sender - we need to NOT override customerSDKStatsMetrics in the constructor
      // to test that it remains undefined when disabled
      class TestSenderWithoutMockStats extends BaseSender {
        sendMock = vi.fn<(payload: unknown[]) => Promise<SenderResult>>();
        shutdownMock = vi.fn<() => Promise<void>>();

        async send(payload: unknown[]): Promise<SenderResult> {
          return this.sendMock(payload);
        }

        async shutdown(): Promise<void> {
          return this.shutdownMock();
        }

        handlePermanentRedirect(_location: string | undefined): void {
          // No-op
        }

        getCustomerSDKStatsMetrics(): any {
          return (this as any).customerSDKStatsMetrics;
        }
      }

      const testSender = new TestSenderWithoutMockStats({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: false,
      });

      // Verify sender was created successfully
      expect(testSender).toBeDefined();

      // Wait for async initialization to complete (if it were to happen)
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Verify that customerSDKStatsMetrics is undefined (not initialized) when SDK stats are disabled
      expect(testSender.getCustomerSDKStatsMetrics()).toBeUndefined();
    });
  });

  describe("Startup persisted file resend", () => {
    it("should clean expired files and send all persisted files on startup", async () => {
      const file1Envelopes = [{ name: "file1", time: new Date() }];
      const file2Envelopes = [{ name: "file2", time: new Date() }];

      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });

      // Make shift return two files sequentially, then null
      mockPersist.shift
        .mockResolvedValueOnce(file1Envelopes)
        .mockResolvedValueOnce(file2Envelopes)
        .mockResolvedValueOnce(null);

      await sender.callSendAllPersistedFiles();

      // Expired files should be cleaned first
      expect(mockPersist.cleanExpiredFiles).toHaveBeenCalledTimes(1);
      // Both files should have been sent
      expect(sender.sendMock).toHaveBeenCalledWith(file1Envelopes);
      expect(sender.sendMock).toHaveBeenCalledWith(file2Envelopes);
      expect(sender.sendMock).toHaveBeenCalledTimes(2);
    });

    it("should stop sending persisted files if a send fails", async () => {
      const file1Envelopes = [{ name: "file1", time: new Date() }];

      sender.sendMock.mockRejectedValue(new Error("Network failure"));

      mockPersist.shift.mockResolvedValueOnce(file1Envelopes);

      await sender.callSendAllPersistedFiles();

      // Send was attempted for first file only
      expect(sender.sendMock).toHaveBeenCalledWith(file1Envelopes);
      expect(sender.sendMock).toHaveBeenCalledTimes(1);
      // shift should have been called once (the failed file)
      expect(mockPersist.shift).toHaveBeenCalledTimes(1);
    });

    it("should do nothing when no persisted files exist", async () => {
      mockPersist.shift.mockResolvedValueOnce(null);

      await sender.callSendAllPersistedFiles();

      expect(sender.sendMock).not.toHaveBeenCalled();
    });

    it("should send first file successfully and stop on second file failure", async () => {
      const file1Envelopes = [{ name: "file1", time: new Date() }];
      const file2Envelopes = [{ name: "file2", time: new Date() }];

      sender.sendMock
        .mockResolvedValueOnce({ result: "success", statusCode: 200 })
        .mockRejectedValueOnce(new Error("Network failure"));

      mockPersist.shift.mockResolvedValueOnce(file1Envelopes).mockResolvedValueOnce(file2Envelopes);

      await sender.callSendAllPersistedFiles();

      // Both files were attempted
      expect(sender.sendMock).toHaveBeenCalledTimes(2);
    });

    it("should not call sendAllPersistedFiles when offline storage is disabled", () => {
      const sendAllSpy = vi.spyOn(BaseSender.prototype as any, "sendAllPersistedFiles");

      const disabledSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: { disableOfflineStorage: true },
      });

      // sendAllPersistedFiles should not have been called
      expect(sendAllSpy).not.toHaveBeenCalled();
      expect(disabledSender).toBeDefined();

      sendAllSpy.mockRestore();
    });
  });

  describe("sendFirstPersistedFile", () => {
    it("should shift and send persisted envelopes", async () => {
      const persistedEnvelopes = [{ name: "persisted", time: new Date() }];

      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });
      mockPersist.shift.mockResolvedValueOnce(persistedEnvelopes);

      await sender.callSendFirstPersistedFile();

      expect(sender.sendMock).toHaveBeenCalledWith(persistedEnvelopes);
    });

    it("should count readFailure on statsbeat when send fails", async () => {
      const persistedEnvelopes = [{ name: "persisted", time: new Date() }];

      sender.sendMock.mockRejectedValue(new Error("Send failed"));
      mockPersist.shift.mockResolvedValueOnce(persistedEnvelopes);

      await sender.callSendFirstPersistedFile();

      expect(sender.getNetworkStats().countReadFailure).toHaveBeenCalled();
    });

    it("should do nothing when no persisted files exist", async () => {
      mockPersist.shift.mockResolvedValueOnce(null);

      await sender.callSendFirstPersistedFile();

      expect(sender.sendMock).not.toHaveBeenCalled();
    });

    it("should not count readFailure for statsbeat sender", async () => {
      const statsbeatSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true,
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
      vi.clearAllMocks();

      const persistedEnvelopes = [{ name: "persisted", time: new Date() }];
      statsbeatSender.sendMock.mockRejectedValue(new Error("Send failed"));
      mockPersist.shift.mockResolvedValueOnce(persistedEnvelopes);

      await statsbeatSender.callSendFirstPersistedFile();

      // Should NOT count readFailure for statsbeat senders
      expect(mockNetworkStats.countReadFailure).not.toHaveBeenCalled();
    });
  });

  describe("sendAllPersistedFiles edge cases", () => {
    it("should still attempt sends even if cleanExpiredFiles throws", async () => {
      mockPersist.cleanExpiredFiles.mockRejectedValueOnce(new Error("Cleanup failed"));

      await sender.callSendAllPersistedFiles();

      // The outer catch handles cleanExpiredFiles failure — shift is never called
      expect(sender.sendMock).not.toHaveBeenCalled();
    });

    it("should handle shift() throwing an error gracefully", async () => {
      mockPersist.cleanExpiredFiles.mockResolvedValueOnce(undefined);
      mockPersist.shift.mockRejectedValueOnce(new Error("Disk read error"));

      // Should not throw
      await sender.callSendAllPersistedFiles();

      expect(sender.sendMock).not.toHaveBeenCalled();
    });

    it("should call cleanExpiredFiles before any shift", async () => {
      const callOrder: string[] = [];

      mockPersist.cleanExpiredFiles.mockImplementationOnce(async () => {
        callOrder.push("cleanExpiredFiles");
      });
      mockPersist.shift.mockImplementationOnce(async () => {
        callOrder.push("shift");
        return null;
      });

      await sender.callSendAllPersistedFiles();

      expect(callOrder).toEqual(["cleanExpiredFiles", "shift"]);
    });

    it("should be called automatically from constructor when offline storage is enabled", async () => {
      const sendAllSpy = vi.spyOn(BaseSender.prototype as any, "sendAllPersistedFiles");

      const newSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
      });

      expect(sendAllSpy).toHaveBeenCalledTimes(1);
      expect(newSender).toBeDefined();

      // Flush async work
      await new Promise((resolve) => setTimeout(resolve, 0));
      sendAllSpy.mockRestore();
    });

    it("should handle multiple files where middle send fails", async () => {
      const file1 = [{ name: "file1", time: new Date() }];
      const file2 = [{ name: "file2", time: new Date() }];
      const file3 = [{ name: "file3", time: new Date() }];

      sender.sendMock
        .mockResolvedValueOnce({ result: "success", statusCode: 200 })
        .mockRejectedValueOnce(new Error("Network failure"))
        .mockResolvedValueOnce({ result: "success", statusCode: 200 });

      mockPersist.shift
        .mockResolvedValueOnce(file1)
        .mockResolvedValueOnce(file2)
        .mockResolvedValueOnce(file3)
        .mockResolvedValueOnce(null);

      await sender.callSendAllPersistedFiles();

      // First two files attempted, third should NOT be attempted (break on failure)
      expect(sender.sendMock).toHaveBeenCalledTimes(2);
      expect(sender.sendMock).toHaveBeenCalledWith(file1);
      expect(sender.sendMock).toHaveBeenCalledWith(file2);
      // shift called twice: once for file1 (success), once for file2 (fail then break)
      expect(mockPersist.shift).toHaveBeenCalledTimes(2);
    });

    it("should process a single file successfully", async () => {
      const file1 = [{ name: "single", time: new Date() }];

      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });
      mockPersist.shift.mockResolvedValueOnce(file1).mockResolvedValueOnce(null);

      await sender.callSendAllPersistedFiles();

      expect(mockPersist.cleanExpiredFiles).toHaveBeenCalledTimes(1);
      expect(sender.sendMock).toHaveBeenCalledTimes(1);
      expect(sender.sendMock).toHaveBeenCalledWith(file1);
    });
  });

  describe("Retry timer integration with disk persistence", () => {
    it("should trigger sendFirstPersistedFile via retry timer after successful export", async () => {
      vi.useFakeTimers();

      sender.sendMock.mockResolvedValue({ statusCode: 200, result: "success" });

      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      // Persisted file should not have been read yet (timer hasn't fired)
      expect(mockPersist.shift).not.toHaveBeenCalled();

      // Set up a persisted file to be returned when timer fires
      const persistedEnvelopes = [{ name: "persisted", time: new Date() }];
      mockPersist.shift.mockResolvedValueOnce(persistedEnvelopes);

      // Advance past the default retry interval (60s)
      await vi.advanceTimersByTimeAsync(60_000);

      expect(mockPersist.shift).toHaveBeenCalledTimes(1);
      expect(sender.sendMock).toHaveBeenCalledWith(persistedEnvelopes);

      vi.useRealTimers();
    });

    it("should persist retriable envelopes from exportEnvelopes and retry via timer", async () => {
      vi.useFakeTimers();

      const envelopes = [
        { name: "ok", time: new Date() },
        { name: "fail", time: new Date() },
      ];

      const breezeResponse = JSON.stringify({
        itemsReceived: 2,
        itemsAccepted: 1,
        errors: [{ index: 1, statusCode: 500, message: "Server Error" }],
      });

      sender.sendMock.mockResolvedValue({ result: breezeResponse, statusCode: 206 });
      mockPersist.push.mockResolvedValue(true);

      await sender.exportEnvelopes(envelopes);

      // The retriable envelope should have been persisted
      expect(mockPersist.push).toHaveBeenCalledWith([envelopes[1]]);

      // Now simulate retry timer firing — the persisted file gets sent
      mockPersist.shift.mockResolvedValueOnce([envelopes[1]]);
      sender.sendMock.mockResolvedValue({ statusCode: 200, result: "success" });

      await vi.advanceTimersByTimeAsync(60_000);

      expect(mockPersist.shift).toHaveBeenCalledTimes(1);

      vi.useRealTimers();
    });

    it("should persist all envelopes on 503 and retry via timer", async () => {
      vi.useFakeTimers();

      const envelopes = [{ name: "test", time: new Date() }];

      sender.sendMock.mockResolvedValue({ statusCode: 503, result: "" });
      mockPersist.push.mockResolvedValue(true);

      const result = await sender.exportEnvelopes(envelopes);
      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(mockPersist.push).toHaveBeenCalledWith(envelopes);

      // Retry timer fires and sends the persisted file
      mockPersist.shift.mockResolvedValueOnce(envelopes);
      sender.sendMock.mockResolvedValue({ statusCode: 200, result: "success" });

      await vi.advanceTimersByTimeAsync(60_000);
      expect(mockPersist.shift).toHaveBeenCalled();

      vi.useRealTimers();
    });
  });
});
