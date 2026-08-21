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
import { ExceptionType, RetryCode } from "../../src/export/statsbeat/types.js";
import type { SenderResult } from "../../src/types.js";
import { CustomerSDKStatsMetrics } from "../../src/export/statsbeat/customerSDKStats.js";
import { RestError, createHttpHeaders } from "@azure/core-rest-pipeline";

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
  updateEndpoint: Mock<(endpointUrl: string) => Promise<void>>;
  shutdown: Mock<() => Promise<void>>;
} = {
  countSuccess: vi.fn(),
  countFailure: vi.fn(),
  countThrottle: vi.fn(),
  countRetry: vi.fn(),
  countException: vi.fn(),
  countReadFailure: vi.fn(),
  countWriteFailure: vi.fn(),
  updateEndpoint: vi.fn().mockResolvedValue(undefined),
  shutdown: vi.fn(),
};

export const mockLongIntervalStats: {
  updateEndpoint: Mock<(endpointUrl: string) => Promise<void>>;
  shutdown: Mock<() => Promise<void>>;
} = {
  updateEndpoint: vi.fn().mockResolvedValue(undefined),
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
  // Default to accepting the redirect so legacy tests that exercise the success path keep working;
  // tests that want to assert the cross-origin refusal path override this with mockReturnValue(false).
  public handlePermanentRedirectMock = vi.fn().mockReturnValue(true);
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

  // Neutralize startup replay throttling so existing timing-sensitive tests stay
  // deterministic and fast. Dedicated tests below exercise the real delay logic.
  protected getStartupReplayDelayMs(): number {
    return 0;
  }

  protected getReplayBatchDelayMs(): number {
    return 0;
  }

  public async callSendFirstPersistedFile(): Promise<void> {
    return (this as any).sendFirstPersistedFile();
  }

  async send(payload: unknown[]): Promise<SenderResult> {
    return this.sendMock(payload);
  }

  handlePermanentRedirect(location: string | undefined): boolean {
    return this.handlePermanentRedirectMock(location);
  }

  public setStatsbeatFailureCount(value: number): void {
    (this as any).statsbeatFailureCount = value;
  }

  public getStatsbeatFailureCount(): number {
    return (this as any).statsbeatFailureCount;
  }
}

function createRedirectError(statusCode: 307 | 308, location?: string): Error {
  return Object.assign(new Error("Redirect"), {
    statusCode,
    response: { headers: createHttpHeaders(location ? { location } : {}) },
  });
}

describe("BaseSender", () => {
  let sender: TestBaseSender;

  beforeEach(async () => {
    // Reset all mocks
    vi.clearAllMocks();
    (BaseSender as any).redirectRouteUpdate = Promise.resolve();

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
    Object.defineProperty(sender, "customerSDKStatsMetrics", {
      value: mockCustomerSDKStatsMetrics,
      writable: true,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    const retryTimer = (sender as any).retryTimer as NodeJS.Timeout | null;
    if (retryTimer) {
      clearTimeout(retryTimer);
    }
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

    it.each([307, 308] as const)(
      "should apply an accepted %s redirect to both Statsbeat routes",
      async (code) => {
        const location = "https://newlocation.com";
        sender.sendMock
          .mockRejectedValueOnce(createRedirectError(code, location))
          .mockResolvedValueOnce({
            result: "success",
            statusCode: 200,
          });

        const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

        expect(sender.handlePermanentRedirectMock).toHaveBeenCalledWith(location);
        expect(sender.getNetworkStats().updateEndpoint).toHaveBeenCalledWith(location);
        expect(sender.getLongIntervalStats().updateEndpoint).toHaveBeenCalledWith(location);
        expect(sender.sendMock).toHaveBeenCalledTimes(2);
        expect(result.code).toBe(ExportResultCode.SUCCESS);
      },
    );

    it("should handle circular redirects", async () => {
      sender.sendMock.mockRejectedValue(createRedirectError(307, "https://newlocation.com"));

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.FAILED);
      expect(sender.sendMock).toHaveBeenCalledTimes(10);
      expect(sender.getNetworkStats().countException).toHaveBeenCalled();
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain("Circular redirect");
    });

    it("tracks redirect depth independently for concurrent exports", async () => {
      let releaseFirstUpdate: (() => void) | undefined;
      sender.getNetworkStats().updateEndpoint.mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            releaseFirstUpdate = resolve;
          }),
      );
      const attempts = new Map<string, number>();
      sender.sendMock.mockImplementation(async (envelopes: Array<{ name: string }>) => {
        const item = envelopes[0].name;
        const attempt = (attempts.get(item) ?? 0) + 1;
        attempts.set(item, attempt);
        if (attempt === 1) {
          throw createRedirectError(307, `https://${item}.example.com`);
        }
        return { result: "success", statusCode: 200 };
      });

      const exports = Array.from({ length: 10 }, (_, index) =>
        sender.exportEnvelopes([{ name: `export-${index}`, time: new Date() }]),
      );
      await vi.waitFor(() => expect(sender.sendMock).toHaveBeenCalledTimes(10));
      await vi.waitFor(() =>
        expect(sender.getNetworkStats().updateEndpoint).toHaveBeenCalledOnce(),
      );
      releaseFirstUpdate!();

      const results = await Promise.all(exports);

      expect(results.every((result) => result.code === ExportResultCode.SUCCESS)).toBe(true);
      expect([...attempts.values()]).toEqual(Array(10).fill(2));
    });

    it("does not let an unrelated success reset a looping export's redirect depth", async () => {
      let loopAttempts = 0;
      let releaseFifthRedirect: (() => void) | undefined;
      let signalFifthAttempt: (() => void) | undefined;
      const fifthAttemptStarted = new Promise<void>((resolve) => {
        signalFifthAttempt = resolve;
      });
      sender.sendMock.mockImplementation(async (envelopes: Array<{ name: string }>) => {
        if (envelopes[0].name === "success") {
          return { result: "success", statusCode: 200 };
        }
        loopAttempts++;
        if (loopAttempts === 5) {
          signalFifthAttempt!();
          await new Promise<void>((resolve) => {
            releaseFifthRedirect = resolve;
          });
        }
        throw createRedirectError(307, "https://loop.example.com");
      });

      const loopingExport = sender.exportEnvelopes([{ name: "loop", time: new Date() }]);
      await fifthAttemptStarted;
      const successfulExport = await sender.exportEnvelopes([
        { name: "success", time: new Date() },
      ]);
      releaseFifthRedirect!();
      const loopingResult = await loopingExport;

      expect(successfulExport.code).toBe(ExportResultCode.SUCCESS);
      expect(loopingResult.code).toBe(ExportResultCode.FAILED);
      expect(loopingResult.error?.message).toBe("Circular redirect");
      expect(loopAttempts).toBe(10);
    });

    it("should refuse cross-origin redirects without retrying", async () => {
      sender.sendMock.mockRejectedValue(
        createRedirectError(307, "https://attacker.example.invalid"),
      );
      sender.handlePermanentRedirectMock.mockReturnValue(false);

      const envelopes = [{ name: "test", time: new Date() }];
      const result = await sender.exportEnvelopes(envelopes);

      expect(sender.handlePermanentRedirectMock).toHaveBeenCalledWith(
        "https://attacker.example.invalid",
      );
      expect(sender.getNetworkStats().updateEndpoint).not.toHaveBeenCalled();
      expect(sender.getLongIntervalStats().updateEndpoint).not.toHaveBeenCalled();
      expect(sender.sendMock).toHaveBeenCalledTimes(1);
      expect(result.code).toBe(ExportResultCode.FAILED);
      expect(result.error?.message).toContain("Refused cross-origin redirect");
      expect(sender.getNetworkStats().countException).toHaveBeenCalled();
    });

    it("should not update Statsbeat routing for a redirect without a location", async () => {
      sender.sendMock.mockRejectedValue(createRedirectError(307));

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.handlePermanentRedirectMock).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().updateEndpoint).not.toHaveBeenCalled();
      expect(sender.getLongIntervalStats().updateEndpoint).not.toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.FAILED);
    });

    it("serializes each customer retry with its matching Statsbeat route", async () => {
      const firstLocation = "https://northeurope-0.in.applicationinsights.azure.com/v2.1/track";
      const secondLocation = "https://westus2-0.in.applicationinsights.azure.com/v2.1/track";
      let customerRoute = "";
      let networkRoute = "";
      let longIntervalRoute = "";
      const retryRoutes: Array<{
        item: string;
        customer: string;
        network: string;
        longInterval: string;
      }> = [];
      let completeFirstUpdate: (() => void) | undefined;
      sender.handlePermanentRedirectMock.mockImplementation((location: string) => {
        customerRoute = location;
        return true;
      });
      sender.getNetworkStats().updateEndpoint.mockImplementation((endpointUrl: string) => {
        if (endpointUrl === firstLocation) {
          return new Promise<void>((resolve) => {
            completeFirstUpdate = () => {
              networkRoute = endpointUrl;
              resolve();
            };
          });
        }
        networkRoute = endpointUrl;
        return Promise.resolve();
      });
      sender.getLongIntervalStats().updateEndpoint.mockImplementation((endpointUrl: string) => {
        longIntervalRoute = endpointUrl;
        return Promise.resolve();
      });
      const attempts = new Map<string, number>();
      sender.sendMock.mockImplementation(async (envelopes: Array<{ name: string }>) => {
        const item = envelopes[0].name;
        const attempt = (attempts.get(item) ?? 0) + 1;
        attempts.set(item, attempt);
        if (attempt === 1) {
          throw createRedirectError(307, item === "first" ? firstLocation : secondLocation);
        }
        retryRoutes.push({
          item,
          customer: customerRoute,
          network: networkRoute,
          longInterval: longIntervalRoute,
        });
        return { result: "success", statusCode: 200 };
      });

      const firstExport = sender.exportEnvelopes([{ name: "first", time: new Date() }]);
      const secondExport = sender.exportEnvelopes([{ name: "second", time: new Date() }]);

      await vi.waitFor(() => expect(sender.handlePermanentRedirectMock).toHaveBeenCalledOnce());
      expect(sender.getNetworkStats().updateEndpoint).toHaveBeenCalledTimes(1);
      expect(sender.getLongIntervalStats().updateEndpoint).toHaveBeenCalledTimes(1);
      expect(customerRoute).toBe(firstLocation);

      completeFirstUpdate!();
      await Promise.all([firstExport, secondExport]);

      expect(retryRoutes).toEqual([
        {
          item: "first",
          customer: firstLocation,
          network: firstLocation,
          longInterval: firstLocation,
        },
        {
          item: "second",
          customer: secondLocation,
          network: secondLocation,
          longInterval: secondLocation,
        },
      ]);
      expect(
        sender.getNetworkStats().updateEndpoint.mock.calls.map((call: [string]) => call[0]),
      ).toEqual([firstLocation, secondLocation]);
      expect(
        sender.getLongIntervalStats().updateEndpoint.mock.calls.map((call: [string]) => call[0]),
      ).toEqual([firstLocation, secondLocation]);
      expect(customerRoute).toBe(secondLocation);
    });

    it("handles a nested redirect without re-entering the redirect queue", async () => {
      const firstLocation = "https://northeurope-0.in.applicationinsights.azure.com/v2.1/track";
      const secondLocation = "https://westus2-0.in.applicationinsights.azure.com/v2.1/track";
      sender.sendMock
        .mockRejectedValueOnce(createRedirectError(307, firstLocation))
        .mockRejectedValueOnce(createRedirectError(308, secondLocation))
        .mockResolvedValueOnce({ result: "success", statusCode: 200 });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(sender.sendMock).toHaveBeenCalledTimes(3);
      expect(
        sender.getNetworkStats().updateEndpoint.mock.calls.map((call: [string]) => call[0]),
      ).toEqual([firstLocation, secondLocation]);
      expect(
        sender.getLongIntervalStats().updateEndpoint.mock.calls.map((call: [string]) => call[0]),
      ).toEqual([firstLocation, secondLocation]);
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

    it.each(Object.values(RetriableRestErrorTypes))(
      "should persist telemetry when transport error %s has no response",
      async (code) => {
        const retriableError = new RestError("No response received", { code });
        const testEnvelopes = [{ name: "test", time: new Date() }];
        sender.sendMock.mockRejectedValue(retriableError);
        mockPersist.push.mockResolvedValue(true);

        const result = await sender.exportEnvelopes(testEnvelopes);

        expect(sender.getPersister().push).toHaveBeenCalledWith(testEnvelopes);
        expect(sender.getNetworkStats().countException).toHaveBeenCalledWith(retriableError);
        expect(mockCustomerSDKStatsMetrics.countRetryItems).toHaveBeenCalledWith(
          testEnvelopes,
          RetryCode.CLIENT_EXCEPTION,
          retriableError.message,
          ExceptionType.NETWORK_EXCEPTION,
        );
        expect(mockCustomerSDKStatsMetrics.countDroppedItems).not.toHaveBeenCalled();
        expect((sender as any).retryTimer).not.toBeNull();
        expect(result.code).toBe(ExportResultCode.SUCCESS);
      },
    );

    it("should persist telemetry when a request timeout produces an AbortError", async () => {
      const timeoutError = Object.assign(new Error("Request timed out"), {
        name: "AbortError",
      });
      const testEnvelopes = [{ name: "test", time: new Date() }];
      sender.sendMock.mockRejectedValue(timeoutError);
      mockPersist.push.mockResolvedValue(true);
      mockCustomerSDKStatsMetrics.isTimeoutError.mockReturnValue(true);

      const result = await sender.exportEnvelopes(testEnvelopes);

      expect(sender.getPersister().push).toHaveBeenCalledWith(testEnvelopes);
      expect(sender.getNetworkStats().countException).toHaveBeenCalledWith(timeoutError);
      expect(mockCustomerSDKStatsMetrics.countRetryItems).toHaveBeenCalledWith(
        testEnvelopes,
        RetryCode.CLIENT_TIMEOUT,
        "timeout_exception",
        ExceptionType.TIMEOUT_EXCEPTION,
      );
      expect(mockCustomerSDKStatsMetrics.countDroppedItems).not.toHaveBeenCalled();
      expect((sender as any).retryTimer).not.toBeNull();
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });

    it("should classify the transport's real AbortError timeout message as a timeout", async () => {
      // The Node transport raises an AbortError whose message is only "The operation was
      // aborted...", which isTimeoutError does not recognize. The AbortError name must still
      // drive CLIENT_TIMEOUT classification.
      const timeoutError = Object.assign(
        new Error("The operation was aborted. Reason: Timeout of 10000ms exceeded"),
        { name: "AbortError" },
      );
      const testEnvelopes = [{ name: "test", time: new Date() }];
      sender.sendMock.mockRejectedValue(timeoutError);
      mockPersist.push.mockResolvedValue(true);
      mockCustomerSDKStatsMetrics.isTimeoutError.mockReturnValue(false);

      const result = await sender.exportEnvelopes(testEnvelopes);

      expect(sender.getPersister().push).toHaveBeenCalledWith(testEnvelopes);
      expect(mockCustomerSDKStatsMetrics.countRetryItems).toHaveBeenCalledWith(
        testEnvelopes,
        RetryCode.CLIENT_TIMEOUT,
        "timeout_exception",
        ExceptionType.TIMEOUT_EXCEPTION,
      );
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });

    it("should honor Retry-After when a retriable HTTP status is thrown as a RestError", async () => {
      vi.useFakeTimers();
      const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
      vi.mocked(isRetriable).mockImplementation((statusCode) => statusCode === 503);
      const retriableError = new RestError("Service Unavailable", {
        code: "SERVICE_UNAVAILABLE",
        statusCode: 503,
        response: {
          headers: createHttpHeaders({ "retry-after": "45" }),
        } as any,
      });
      sender.sendMock.mockRejectedValue(retriableError);
      mockPersist.push.mockResolvedValue(true);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(mockPersist.push).toHaveBeenCalled();
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 45_000);

      setTimeoutSpy.mockRestore();
      vi.useRealTimers();
    });

    it("should not persist a non-RestError with a retriable error code", async () => {
      const error = Object.assign(new Error("Envelope serialization failed"), {
        code: RetriableRestErrorTypes.CONNECTION_RESET,
      });
      sender.sendMock.mockRejectedValue(error);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.getPersister().push).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countException).toHaveBeenCalledWith(error);
      expect(result.code).toBe(ExportResultCode.FAILED);
    });

    it.each([
      new RestError("Response received", {
        code: RetriableRestErrorTypes.CONNECTION_RESET,
        statusCode: 400,
      }),
      new RestError("Response received", {
        code: RetriableRestErrorTypes.CONNECTION_RESET,
        response: { status: 400 } as any,
      }),
      Object.assign(new Error("Request aborted after response"), {
        name: "AbortError",
        response: { status: 400 },
      }),
    ])("should not persist a retriable error when an HTTP response exists", async (error) => {
      sender.sendMock.mockRejectedValue(error);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.getPersister().push).not.toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.FAILED);
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

      const retriableError = new RestError("Connection reset", {
        code: RetriableRestErrorTypes.REQUEST_SEND_ERROR,
      });

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

    it("should reschedule retry timer when new retryAfterMs results in a later absolute deadline", async () => {
      vi.useFakeTimers();
      const setTimeoutSpy = vi.spyOn(globalThis, "setTimeout");
      const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");

      vi.mocked(isRetriable).mockImplementation(
        (statusCode) => statusCode === 429 || statusCode === 200,
      );

      // First call with a 30s retryAfterMs at T=0 → deadline = T+30s
      sender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "success",
        retryAfterMs: 30_000,
      });
      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      // Advance 20s, then second call with 15s retryAfterMs → deadline = T+35s (later)
      vi.advanceTimersByTime(20_000);
      sender.sendMock.mockResolvedValue({
        statusCode: 200,
        result: "success",
        retryAfterMs: 15_000,
      });
      await sender.exportEnvelopes([{ name: "test2", time: new Date() }]);

      // clearTimeout should have been called to reschedule
      expect(clearTimeoutSpy).toHaveBeenCalled();
      // The rescheduled timer should use the adjusted delay (~15s)
      expect(setTimeoutSpy).toHaveBeenLastCalledWith(expect.any(Function), 15_000);

      clearTimeoutSpy.mockRestore();
      setTimeoutSpy.mockRestore();
      vi.useRealTimers();
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
            kind: "MetricsData" as const,
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
            kind: "MetricsData" as const,
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
            kind: "MetricsData" as const,
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
      // Save and clear the disable flag so Customer SDK Stats metrics initialize
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
            baseData: { kind: "MessageData" as const, version: 2, message: "test message" },
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
            baseData: { kind: "MessageData" as const, version: 2, message: "test message" },
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
            baseData: { kind: "MessageData" as const, version: 2, message: "test message" },
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

        async send(payload: unknown[]): Promise<SenderResult> {
          return this.sendMock(payload);
        }

        handlePermanentRedirect(_location: string | undefined): boolean {
          // No-op
          return true;
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

    it("should count exception on statsbeat when send throws a non-retriable error", async () => {
      const persistedEnvelopes = [{ name: "persisted", time: new Date() }];

      sender.sendMock.mockRejectedValue(new Error("Send failed"));
      mockPersist.shift.mockResolvedValueOnce(persistedEnvelopes);

      await sender.callSendFirstPersistedFile();

      // exportEnvelopes handles the thrown error internally via countException
      expect(sender.getNetworkStats().countException).toHaveBeenCalled();
    });

    it("should do nothing when no persisted files exist", async () => {
      mockPersist.shift.mockResolvedValueOnce(null);

      await sender.callSendFirstPersistedFile();

      expect(sender.sendMock).not.toHaveBeenCalled();
    });

    it("should not count exception for statsbeat sender when send throws", async () => {
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

      // Statsbeat senders should not count exceptions
      expect(mockNetworkStats.countException).not.toHaveBeenCalled();
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

    it("should be scheduled (not called synchronously) from constructor when offline storage is enabled", async () => {
      vi.useFakeTimers();
      const sendAllSpy = vi.spyOn(BaseSender.prototype as any, "sendAllPersistedFiles");

      const newSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
      });

      // Replay is deferred behind a randomized startup delay, not run synchronously
      expect(sendAllSpy).not.toHaveBeenCalled();
      expect(newSender).toBeDefined();

      // Once the scheduled timer fires, replay runs exactly once
      await vi.advanceTimersByTimeAsync(1);
      expect(sendAllSpy).toHaveBeenCalledTimes(1);

      sendAllSpy.mockRestore();
      vi.useRealTimers();
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

  describe("shutdown", () => {
    it("cancels pending retry and startup replay without shutting shared metrics", async () => {
      vi.useFakeTimers();
      vi.spyOn(TestBaseSender.prototype as any, "getStartupReplayDelayMs").mockReturnValue(1000);
      const retiringSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
      });
      (retiringSender as any).scheduleRetryTimer(1000);

      await retiringSender.shutdown();
      await retiringSender.shutdown();
      await vi.advanceTimersByTimeAsync(1000);

      expect((retiringSender as any).retryTimer).toBeNull();
      expect((retiringSender as any).startupReplayTimer).toBeNull();
      expect(retiringSender.sendMock).not.toHaveBeenCalled();
      expect(mockPersist.shift).not.toHaveBeenCalled();
      expect(mockNetworkStats.shutdown).not.toHaveBeenCalled();
      expect(mockLongIntervalStats.shutdown).not.toHaveBeenCalled();
      expect(mockCustomerSDKStatsMetrics.shutdown).not.toHaveBeenCalled();
      vi.useRealTimers();
    });

    it("restores a retry batch shifted while shutdown is in progress", async () => {
      const envelopes = [{ name: "retry", time: new Date() }];
      let finishShift: ((value: unknown[]) => void) | undefined;
      mockPersist.shift.mockImplementation(
        () =>
          new Promise<unknown[]>((resolve) => {
            finishShift = resolve;
          }),
      );

      const replay = sender.callSendFirstPersistedFile();
      await vi.waitFor(() => expect(mockPersist.shift).toHaveBeenCalledOnce());
      const shuttingDown = sender.shutdown();
      finishShift!(envelopes);
      await Promise.all([replay, shuttingDown]);

      expect(mockPersist.push).toHaveBeenCalledOnce();
      expect(mockPersist.push).toHaveBeenCalledWith(envelopes);
      expect(sender.sendMock).not.toHaveBeenCalled();
    });

    it("restores a startup batch shifted while shutdown is in progress", async () => {
      const envelopes = [{ name: "startup", time: new Date() }];
      let finishShift: ((value: unknown[]) => void) | undefined;
      mockPersist.shift.mockImplementation(
        () =>
          new Promise<unknown[]>((resolve) => {
            finishShift = resolve;
          }),
      );

      const replay = sender.callSendAllPersistedFiles();
      await vi.waitFor(() => expect(mockPersist.shift).toHaveBeenCalledOnce());
      const shuttingDown = sender.shutdown();
      finishShift!(envelopes);
      await Promise.all([replay, shuttingDown]);

      expect(mockPersist.push).toHaveBeenCalledOnce();
      expect(mockPersist.push).toHaveBeenCalledWith(envelopes);
      expect(sender.sendMock).not.toHaveBeenCalled();
    });

    it("does not reschedule work when an in-flight send completes after shutdown", async () => {
      let finishSend: ((result: SenderResult) => void) | undefined;
      sender.sendMock.mockImplementation(
        () =>
          new Promise<SenderResult>((resolve) => {
            finishSend = resolve;
          }),
      );

      const exporting = sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      await vi.waitFor(() => expect(sender.sendMock).toHaveBeenCalledOnce());
      await sender.shutdown();
      finishSend!({ result: "", statusCode: 200 });
      const result = await exporting;

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect((sender as any).retryTimer).toBeNull();
    });

    it("restores a retry batch when its in-flight send loses ownership during shutdown", async () => {
      const envelopes = [{ name: "retry", time: new Date() }];
      let failSend: ((error: Error) => void) | undefined;
      mockPersist.shift.mockResolvedValueOnce(envelopes);
      sender.sendMock.mockImplementation(
        () =>
          new Promise<SenderResult>((_resolve, reject) => {
            failSend = reject;
          }),
      );

      const replay = sender.callSendFirstPersistedFile();
      await vi.waitFor(() => expect(sender.sendMock).toHaveBeenCalledOnce());
      const shuttingDown = sender.shutdown();
      failSend!(new RestError("Connection reset", { code: "ECONNRESET" }));
      await Promise.all([replay, shuttingDown]);

      expect(mockPersist.push).toHaveBeenCalledOnce();
      expect(mockPersist.push).toHaveBeenCalledWith(envelopes);
      expect((sender as any).retryTimer).toBeNull();
    });

    it("does not restore a batch after a definitive non-retriable response", async () => {
      const envelopes = [{ name: "retry", time: new Date() }];
      let failSend: ((error: Error) => void) | undefined;
      mockPersist.shift.mockResolvedValueOnce(envelopes);
      sender.sendMock.mockImplementation(
        () =>
          new Promise<SenderResult>((_resolve, reject) => {
            failSend = reject;
          }),
      );

      const replay = sender.callSendFirstPersistedFile();
      await vi.waitFor(() => expect(sender.sendMock).toHaveBeenCalledOnce());
      const shuttingDown = sender.shutdown();
      failSend!(new RestError("Bad request", { statusCode: 400 }));
      await Promise.all([replay, shuttingDown]);

      expect(mockPersist.push).not.toHaveBeenCalled();
      expect((sender as any).retryTimer).toBeNull();
    });

    it("lets an internal Statsbeat replay finish without waiting on the customer redirect queue", async () => {
      const envelopes = [{ name: "statsbeat", time: new Date() }];
      let releaseCustomerQueue: (() => void) | undefined;
      (BaseSender as any).redirectRouteUpdate = new Promise<void>((resolve) => {
        releaseCustomerQueue = resolve;
      });
      mockPersist.shift.mockResolvedValueOnce(envelopes);
      const statsbeatSender = new TestBaseSender({
        endpointUrl: "https://westus-0.in.applicationinsights.azure.com",
        instrumentationKey: "statsbeat-key",
        trackStatsbeat: false,
        exporterOptions: { disableOfflineStorage: true },
        isStatsbeatSender: true,
      });
      Object.defineProperty(statsbeatSender, "networkStatsbeatMetrics", { value: undefined });
      Object.defineProperty(statsbeatSender, "longIntervalStatsbeatMetrics", { value: undefined });
      statsbeatSender.sendMock
        .mockRejectedValueOnce(
          createRedirectError(307, "https://westus2-0.in.applicationinsights.azure.com/v2.1/track"),
        )
        .mockResolvedValueOnce({ result: "success", statusCode: 200 });

      await statsbeatSender.callSendFirstPersistedFile();
      await statsbeatSender.shutdown();
      releaseCustomerQueue!();

      expect(statsbeatSender.sendMock).toHaveBeenCalledTimes(2);
    });

    it("restores a replay batch when shutdown wins while its redirect is queued", async () => {
      const envelopes = [{ name: "retry", time: new Date() }];
      let releaseRedirectQueue: (() => void) | undefined;
      (BaseSender as any).redirectRouteUpdate = new Promise<void>((resolve) => {
        releaseRedirectQueue = resolve;
      });
      mockPersist.shift.mockResolvedValueOnce(envelopes);
      sender.sendMock.mockRejectedValueOnce(
        createRedirectError(
          307,
          "https://northeurope-0.in.applicationinsights.azure.com/v2.1/track",
        ),
      );

      const replay = sender.callSendFirstPersistedFile();
      await vi.waitFor(() => expect(sender.sendMock).toHaveBeenCalledOnce());
      const shuttingDown = sender.shutdown();
      releaseRedirectQueue!();
      await Promise.all([replay, shuttingDown]);

      expect(sender.handlePermanentRedirectMock).not.toHaveBeenCalled();
      expect(sender.sendMock).toHaveBeenCalledOnce();
      expect(mockPersist.push).toHaveBeenCalledOnce();
      expect(mockPersist.push).toHaveBeenCalledWith(envelopes);
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

  describe("sendFirstPersistedFile — replay via exportEnvelopes", () => {
    it("should re-persist only retriable envelopes when replay gets 206", async () => {
      const envelopes = [
        { name: "ok", time: new Date() },
        { name: "fail", time: new Date() },
      ];

      const breezeResponse = JSON.stringify({
        itemsReceived: 2,
        itemsAccepted: 1,
        errors: [{ index: 1, statusCode: 500, message: "Server Error" }],
      });

      mockPersist.shift.mockResolvedValueOnce(envelopes);
      sender.sendMock.mockResolvedValue({ result: breezeResponse, statusCode: 206 });
      mockPersist.push.mockResolvedValue(true);

      await sender.callSendFirstPersistedFile();

      // exportEnvelopes should have called send with the shifted envelopes
      expect(sender.sendMock).toHaveBeenCalledWith(envelopes);
      // Only the retriable envelope (index 1, status 500) should be re-persisted
      expect(mockPersist.push).toHaveBeenCalledWith([envelopes[1]]);
    });

    it("should re-persist all envelopes when replay gets 503 with no body", async () => {
      const envelopes = [{ name: "test", time: new Date() }];

      mockPersist.shift.mockResolvedValueOnce(envelopes);
      sender.sendMock.mockResolvedValue({ result: "", statusCode: 503 });
      mockPersist.push.mockResolvedValue(true);

      await sender.callSendFirstPersistedFile();

      expect(mockPersist.push).toHaveBeenCalledWith(envelopes);
    });

    it("should not re-persist when replay gets 200", async () => {
      const envelopes = [{ name: "test", time: new Date() }];

      mockPersist.shift.mockResolvedValueOnce(envelopes);
      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });

      await sender.callSendFirstPersistedFile();

      expect(mockPersist.push).not.toHaveBeenCalled();
    });

    it("should re-persist all envelopes on 429 throttle", async () => {
      const envelopes = [{ name: "throttled", time: new Date() }];

      mockPersist.shift.mockResolvedValueOnce(envelopes);
      sender.sendMock.mockResolvedValue({ result: "", statusCode: 429 });
      mockPersist.push.mockResolvedValue(true);

      await sender.callSendFirstPersistedFile();

      expect(mockPersist.push).toHaveBeenCalledWith(envelopes);
    });
  });

  describe("sendAllPersistedFiles — replay via exportEnvelopes", () => {
    it("should re-persist retriable envelopes from 206 during startup replay", async () => {
      const envelopes = [
        { name: "ok", time: new Date() },
        { name: "fail", time: new Date() },
      ];

      const breezeResponse = JSON.stringify({
        itemsReceived: 2,
        itemsAccepted: 1,
        errors: [{ index: 1, statusCode: 500, message: "Server Error" }],
      });

      mockPersist.shift.mockResolvedValueOnce(envelopes).mockResolvedValueOnce(null);
      sender.sendMock.mockResolvedValue({ result: breezeResponse, statusCode: 206 });
      mockPersist.push.mockResolvedValue(true);

      await sender.callSendAllPersistedFiles();

      expect(sender.sendMock).toHaveBeenCalledWith(envelopes);
      // Only the retriable envelope should be re-persisted
      expect(mockPersist.push).toHaveBeenCalledWith([envelopes[1]]);
    });

    it("should stop processing files when exportEnvelopes returns FAILED", async () => {
      const file1 = [{ name: "file1", time: new Date() }];
      const file2 = [{ name: "file2", time: new Date() }];

      // Non-retriable failure — exportEnvelopes returns FAILED
      sender.sendMock.mockResolvedValue({ result: "", statusCode: 400 });

      mockPersist.shift
        .mockResolvedValueOnce(file1)
        .mockResolvedValueOnce(file2)
        .mockResolvedValueOnce(null);

      await sender.callSendAllPersistedFiles();

      // Should stop after first file fails with non-retriable status
      expect(sender.sendMock).toHaveBeenCalledTimes(1);
      expect(sender.sendMock).toHaveBeenCalledWith(file1);
      // Second file should not have been shifted
      expect(mockPersist.shift).toHaveBeenCalledTimes(1);
    });

    it("should continue processing files when retriable errors are persisted successfully", async () => {
      const file1 = [{ name: "file1", time: new Date() }];
      const file2 = [{ name: "file2", time: new Date() }];

      // 503 is retriable — exportEnvelopes persists and returns SUCCESS
      sender.sendMock
        .mockResolvedValueOnce({ result: "", statusCode: 503 })
        .mockResolvedValueOnce({ result: "success", statusCode: 200 });
      mockPersist.push.mockResolvedValue(true);

      mockPersist.shift
        .mockResolvedValueOnce(file1)
        .mockResolvedValueOnce(file2)
        .mockResolvedValueOnce(null);

      await sender.callSendAllPersistedFiles();

      // Both files should be processed (retriable persist returns SUCCESS)
      expect(sender.sendMock).toHaveBeenCalledTimes(2);
      // file1 envelopes were re-persisted due to 503
      expect(mockPersist.push).toHaveBeenCalledWith(file1);
    });

    it("should handle mixed results across multiple persisted files", async () => {
      const file1 = [{ name: "file1-ok", time: new Date() }];
      const file2 = [
        { name: "file2-ok", time: new Date() },
        { name: "file2-fail", time: new Date() },
      ];
      const file3 = [{ name: "file3-ok", time: new Date() }];

      const file2Response = JSON.stringify({
        itemsReceived: 2,
        itemsAccepted: 1,
        errors: [{ index: 1, statusCode: 500, message: "Server Error" }],
      });

      mockPersist.shift
        .mockResolvedValueOnce(file1)
        .mockResolvedValueOnce(file2)
        .mockResolvedValueOnce(file3)
        .mockResolvedValueOnce(null);

      sender.sendMock
        .mockResolvedValueOnce({ result: "success", statusCode: 200 })
        .mockResolvedValueOnce({ result: file2Response, statusCode: 206 })
        .mockResolvedValueOnce({ result: "success", statusCode: 200 });

      mockPersist.push.mockResolvedValue(true);

      await sender.callSendAllPersistedFiles();

      // All 3 files sent
      expect(sender.sendMock).toHaveBeenCalledTimes(3);
      // Only file2's retriable envelope was re-persisted
      expect(mockPersist.push).toHaveBeenCalledTimes(1);
      expect(mockPersist.push).toHaveBeenCalledWith([file2[1]]);
    });

    it("should process at most ten persisted batches per startup replay", async () => {
      const envelopes = [{ name: "persisted", time: new Date() }];
      mockPersist.shift.mockResolvedValue(envelopes);
      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });

      await sender.callSendAllPersistedFiles();

      expect(sender.sendMock).toHaveBeenCalledTimes(10);
      expect(mockPersist.shift).toHaveBeenCalledTimes(10);
    });
  });

  describe("Startup replay throttling (thundering herd mitigation)", () => {
    it("computes a randomized startup replay delay within [0, max)", () => {
      const proto = BaseSender.prototype as any;
      const randomSpy = vi.spyOn(Math, "random");

      randomSpy.mockReturnValue(0);
      expect(proto.getStartupReplayDelayMs.call({})).toBe(0);

      randomSpy.mockReturnValue(0.999999);
      const nearMax = proto.getStartupReplayDelayMs.call({});
      expect(nearMax).toBeGreaterThan(0);
      expect(nearMax).toBeLessThan(60_000);

      randomSpy.mockRestore();
    });

    it("computes an inter-batch replay delay of base plus jitter", () => {
      const proto = BaseSender.prototype as any;
      const randomSpy = vi.spyOn(Math, "random");

      // No jitter → base spacing only
      randomSpy.mockReturnValue(0);
      expect(proto.getReplayBatchDelayMs.call({})).toBe(200);

      // Max jitter → strictly below base + jitter ceiling
      randomSpy.mockReturnValue(0.999999);
      const withJitter = proto.getReplayBatchDelayMs.call({});
      expect(withJitter).toBeGreaterThan(200);
      expect(withJitter).toBeLessThan(400);

      randomSpy.mockRestore();
    });

    it("applies an inter-batch delay before every file except the first", async () => {
      const file1 = [{ name: "f1", time: new Date() }];
      const file2 = [{ name: "f2", time: new Date() }];
      const file3 = [{ name: "f3", time: new Date() }];

      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });
      mockPersist.shift
        .mockResolvedValueOnce(file1)
        .mockResolvedValueOnce(file2)
        .mockResolvedValueOnce(file3)
        .mockResolvedValueOnce(null);

      const delaySpy = vi.spyOn(sender as any, "getReplayBatchDelayMs");

      await sender.callSendAllPersistedFiles();

      // 3 files → delay computed before files 2 and 3, never before file 1
      expect(delaySpy).toHaveBeenCalledTimes(2);
      expect(sender.sendMock).toHaveBeenCalledTimes(3);
    });

    it("does not apply an inter-batch delay for a single persisted file", async () => {
      const file1 = [{ name: "single", time: new Date() }];

      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });
      mockPersist.shift.mockResolvedValueOnce(file1).mockResolvedValueOnce(null);

      const delaySpy = vi.spyOn(sender as any, "getReplayBatchDelayMs");

      await sender.callSendAllPersistedFiles();

      expect(delaySpy).not.toHaveBeenCalled();
      expect(sender.sendMock).toHaveBeenCalledTimes(1);
    });

    it("does not apply an inter-batch delay when replay stops on the first failure", async () => {
      const file1 = [{ name: "f1", time: new Date() }];
      const file2 = [{ name: "f2", time: new Date() }];

      // Non-retriable failure on the first file → loop breaks before any second batch
      sender.sendMock.mockResolvedValue({ result: "", statusCode: 400 });
      mockPersist.shift.mockResolvedValueOnce(file1).mockResolvedValueOnce(file2);

      const delaySpy = vi.spyOn(sender as any, "getReplayBatchDelayMs");

      await sender.callSendAllPersistedFiles();

      expect(delaySpy).not.toHaveBeenCalled();
      expect(sender.sendMock).toHaveBeenCalledTimes(1);
    });

    it("waits for the inter-batch delay to elapse before sending the next file", async () => {
      vi.useFakeTimers();
      const file1 = [{ name: "f1", time: new Date() }];
      const file2 = [{ name: "f2", time: new Date() }];

      sender.sendMock.mockResolvedValue({ result: "success", statusCode: 200 });
      mockPersist.shift
        .mockResolvedValueOnce(file1)
        .mockResolvedValueOnce(file2)
        .mockResolvedValueOnce(null);

      vi.spyOn(sender as any, "getReplayBatchDelayMs").mockReturnValue(5000);

      const replayPromise = sender.callSendAllPersistedFiles();

      // Drain microtasks: first file sent, second file shifted but gated behind the delay
      await vi.advanceTimersByTimeAsync(0);
      expect(sender.sendMock).toHaveBeenCalledTimes(1);

      // Before the delay elapses, the second file must not be sent
      await vi.advanceTimersByTimeAsync(4999);
      expect(sender.sendMock).toHaveBeenCalledTimes(1);

      // Once the delay elapses, the second file is sent
      await vi.advanceTimersByTimeAsync(1);
      await replayPromise;
      expect(sender.sendMock).toHaveBeenCalledTimes(2);

      vi.useRealTimers();
    });

    it("schedules startup replay on an unref'd timer so it never keeps the process alive", () => {
      vi.useFakeTimers();
      const sendAllSpy = vi.spyOn(BaseSender.prototype as any, "sendAllPersistedFiles");

      const throttledSender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
      });

      // Constructor must not drain the backlog inline
      expect(sendAllSpy).not.toHaveBeenCalled();

      // The pending replay timer must be unref'd so it can't hold the event loop open
      const replayTimer = (throttledSender as any).startupReplayTimer as NodeJS.Timeout;
      expect(replayTimer).not.toBeNull();
      expect(replayTimer.hasRef()).toBe(false);

      sendAllSpy.mockRestore();
      vi.useRealTimers();
    });
  });
});
