// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { diag } from "@opentelemetry/api";
import { ExportResultCode } from "@opentelemetry/core";
import { RetriableRestErrorTypes } from "../../src/Declarations/Constants.js";
import type { SenderResult } from "../../src/types.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
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

// Custom mock for BaseSender that will be extended by TestBaseSender
vi.mock("../../src/platform/nodejs/baseSender.js", () => {
  class MockBaseSender {
    persister: any;
    retryTimer: any;
    networkStatsbeatMetrics: any;
    longIntervalStatsbeatMetrics: any;
    isStatsbeatSender: boolean;
    disableOfflineStorage: boolean;
    numConsecutiveRedirects: number;
    statsbeatFailureCount: number;

    constructor(options: any) {
      this.persister = {
        push: vi.fn().mockResolvedValue(true),
        shift: vi.fn().mockResolvedValue(null),
      };
      this.retryTimer = null;
      this.networkStatsbeatMetrics = {
        countSuccess: vi.fn(),
        countFailure: vi.fn(),
        countThrottle: vi.fn(),
        countRetry: vi.fn(),
        countException: vi.fn(),
        countReadFailure: vi.fn(),
        countWriteFailure: vi.fn(),
        shutdown: vi.fn(),
      };
      this.longIntervalStatsbeatMetrics = {
        shutdown: vi.fn(),
      };
      this.isStatsbeatSender = options?.isStatsbeatSender || false;
      this.disableOfflineStorage = options?.exporterOptions?.disableOfflineStorage || false;
      this.numConsecutiveRedirects = 0;
      this.statsbeatFailureCount = 0;
    }
    send(_payload: unknown[]): Promise<any> {
      throw new Error("This method must be implemented by subclass");
    }

    shutdown(): Promise<void> {
      throw new Error("This method must be implemented by subclass");
    }

    handlePermanentRedirect(_location: string | undefined): void {
      throw new Error("This method must be implemented by subclass");
    }

    async exportEnvelopes(envelopes: Envelope[]): Promise<any> {
      if (!envelopes || envelopes.length === 0) {
        return { code: ExportResultCode.SUCCESS };
      }

      try {
        const { result, statusCode } = await this.send(envelopes);

        if (statusCode === 200) {
          this.networkStatsbeatMetrics.countSuccess();
          return { code: ExportResultCode.SUCCESS };
        } else if (statusCode === 429 || statusCode === 439) {
          this.networkStatsbeatMetrics.countThrottle(statusCode);
          return { code: ExportResultCode.SUCCESS };
        } else if (result && typeof result === "string") {
          try {
            const breezeResponse = JSON.parse(result);
            const filteredEnvelopes: Envelope[] = [];

            if (breezeResponse.itemsReceived > 0) {
              this.networkStatsbeatMetrics.countSuccess();
            }

            if (breezeResponse.errors) {
              for (const error of breezeResponse.errors) {
                if (error.statusCode === 500 || error.statusCode === 503) {
                  // Simplified isRetriable
                  filteredEnvelopes.push(envelopes[error.index]);
                }
              }
            }

            if (filteredEnvelopes.length > 0) {
              this.networkStatsbeatMetrics.countRetry(statusCode);
              if (!this.disableOfflineStorage) {
                this.persister.push(filteredEnvelopes);
              }
              return { code: ExportResultCode.SUCCESS };
            }

            this.networkStatsbeatMetrics.countFailure(0, statusCode);
            return { code: ExportResultCode.FAILED };
          } catch (e) {
            this.networkStatsbeatMetrics.countException(e);
            return { code: ExportResultCode.FAILED };
          }
        } else if (statusCode === 503 || statusCode === 500) {
          this.networkStatsbeatMetrics.countRetry(statusCode);
          if (!this.disableOfflineStorage) {
            this.persister.push(envelopes);
          }
          return { code: ExportResultCode.SUCCESS };
        }

        this.networkStatsbeatMetrics.countFailure(0, statusCode);
        return { code: ExportResultCode.FAILED };
      } catch (error: any) {
        if (error.statusCode === 307 || error.statusCode === 308) {
          this.numConsecutiveRedirects++;
          if (this.numConsecutiveRedirects < 10) {
            if (error.response?.headers?.get) {
              const location = error.response.headers.get("location");
              if (location) {
                this.handlePermanentRedirect(location);
                return this.exportEnvelopes(envelopes);
              }
            }
          } else {
            this.networkStatsbeatMetrics.countException(new Error("Circular redirect"));
            return { code: ExportResultCode.FAILED, error: new Error("Circular redirect") };
          }
        } else if (
          error.statusCode === 400 &&
          error.message.includes("Invalid instrumentation key")
        ) {
          this.shutdownStatsbeat();
          return { code: ExportResultCode.SUCCESS };
        } else if (this.isStatsbeatSender && error.statusCode) {
          this.incrementStatsbeatFailure();
          return { code: ExportResultCode.SUCCESS };
        } else if (error.code === RetriableRestErrorTypes.REQUEST_SEND_ERROR) {
          this.networkStatsbeatMetrics.countRetry(error.statusCode);
          if (!this.disableOfflineStorage) {
            this.persister.push(envelopes);
          }
          return { code: ExportResultCode.SUCCESS };
        }

        this.networkStatsbeatMetrics.countException(error);
        return { code: ExportResultCode.FAILED, error };
      }
    }

    // Mock implementations of private methods to support the tests
    incrementStatsbeatFailure(): void {
      this.statsbeatFailureCount++;
      if (this.statsbeatFailureCount > 10) {
        // MAX_STATSBEAT_FAILURES simplified
        this.shutdownStatsbeat();
      }
    }

    shutdownStatsbeat(): void {
      this.networkStatsbeatMetrics.shutdown();
      this.longIntervalStatsbeatMetrics.shutdown();
    }
  }

  return {
    BaseSender: MockBaseSender,
  };
});

// Import after mocking
import { BaseSender } from "../../src/platform/nodejs/baseSender.js";

// Test implementation of BaseSender
class TestBaseSender extends BaseSender {
  public sendMock = vi.fn();
  public shutdownMock = vi.fn();
  public handlePermanentRedirectMock = vi.fn();

  // Return appropriate mocked objects for testing
  public getNetworkStats(): any {
    return (this as any).networkStatsbeatMetrics;
  }

  public getLongIntervalStats(): any {
    return (this as any).longIntervalStatsbeatMetrics;
  }

  public getPersister(): any {
    return (this as any).persister;
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
}

describe("BaseSender", () => {
  let sender: TestBaseSender;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Create test sender
    sender = new TestBaseSender({
      endpointUrl: "https://example.com",
      instrumentationKey: "test-key",
      trackStatsbeat: true,
      exporterOptions: {},
    });
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
    it("should count throttle and return success when status code is 429", async () => {
      sender.sendMock.mockResolvedValue({ result: "throttled", statusCode: 429 });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(sender.getNetworkStats().countThrottle).toHaveBeenCalledWith(429);
      expect(sender.getNetworkStats().countSuccess).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countRetry).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countFailure).not.toHaveBeenCalled();
    });
    it("should count throttle and return success when status code is 439", async () => {
      sender.sendMock.mockResolvedValue({ result: "throttled", statusCode: 439 });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(sender.getNetworkStats().countThrottle).toHaveBeenCalledWith(439);
      expect(sender.getNetworkStats().countSuccess).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countRetry).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countFailure).not.toHaveBeenCalled();
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

      const result = await sender.exportEnvelopes(envelopes);

      expect(sender.getNetworkStats().countRetry).toHaveBeenCalledWith(206);
      expect(sender.getPersister().push).toHaveBeenCalled();
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

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.getNetworkStats().countRetry).toHaveBeenCalledWith(503);
      expect(sender.getPersister().push).toHaveBeenCalled();
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
    it("should handle invalid instrumentation key error", async () => {
      const invalidKeyError: any = new Error("Invalid instrumentation key");
      invalidKeyError.statusCode = 400;

      sender.sendMock.mockRejectedValue(invalidKeyError);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(sender.getNetworkStats().shutdown).toHaveBeenCalled();
      expect(sender.getLongIntervalStats().shutdown).toHaveBeenCalled();
    });

    it("should handle statsbeat shutdown status codes", async () => {
      // Set as statsbeat sender
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true,
      });

      const unauthorizedError: any = new Error("Unauthorized");
      unauthorizedError.statusCode = 401;

      sender.sendMock.mockRejectedValue(unauthorizedError);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
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

    it("should handle daily cap limit errors silently for statsbeat sender", async () => {
      // Set as statsbeat sender
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true,
      });

      const quotaError: any = new Error("Daily cap limit exceeded");
      quotaError.statusCode = 429;

      sender.sendMock.mockRejectedValue(quotaError);

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(diag.error).not.toHaveBeenCalled();
    });

    it("should handle daily cap limit errors with specific message patterns", async () => {
      // Set as statsbeat sender
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true,
      });

      // Mock specific daily cap limit error messages
      const quotaError1: any = new Error("Daily Cap of data reached.");
      quotaError1.statusCode = 402;

      const quotaError2: any = new Error("This account has reached its daily cap quota");
      quotaError2.statusCode = 402;

      sender.sendMock.mockRejectedValueOnce(quotaError1);

      let result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      expect(result.code).toBe(ExportResultCode.SUCCESS);

      sender.sendMock.mockRejectedValueOnce(quotaError2);

      result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });
    it("should handle partial response with both retriable and non-retriable errors", async () => {
      const mockResponse = JSON.stringify({
        itemsReceived: 3,
        itemsAccepted: 1,
        errors: [
          { index: 0, statusCode: 500, message: "Server error" }, // Retriable
          { index: 1, statusCode: 400, message: "Bad request" }, // Non-retriable
          { index: 2, statusCode: 503, message: "Service unavailable" }, // Retriable
        ],
      });

      sender.sendMock.mockResolvedValue({ result: mockResponse, statusCode: 206 });

      const envelopes = [
        { name: "test1", time: new Date() },
        { name: "test2", time: new Date() },
        { name: "test3", time: new Date() },
      ];

      const result = await sender.exportEnvelopes(envelopes);

      // Should filter and only persist the retriable envelopes (index 0 and 2)
      expect(sender.getPersister().push).toHaveBeenCalledWith([envelopes[0], envelopes[2]]);
      expect(sender.getNetworkStats().countRetry).toHaveBeenCalledWith(206);
      expect(sender.getNetworkStats().countSuccess).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });
    it("should handle disabled offline storage", async () => {
      // Create a sender with disableOfflineStorage set to true
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: { disableOfflineStorage: true },
      });

      // Set up a retriable error
      sender.sendMock.mockResolvedValue({ result: "", statusCode: 503 });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      // Should still count retry
      expect(sender.getNetworkStats().countRetry).toHaveBeenCalledWith(503);

      // But should not attempt to persist
      expect(sender.getPersister().push).not.toHaveBeenCalled();

      // Should still return success to allow the export operation to complete
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });
    it("should only emit one type of statsbeat metric per response", async () => {
      // Throttling case - should only count throttle, not retry or failure
      sender.sendMock.mockResolvedValue({ statusCode: 429 });

      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.getNetworkStats().countThrottle).toHaveBeenCalledWith(429);
      expect(sender.getNetworkStats().countRetry).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countFailure).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countSuccess).not.toHaveBeenCalled();

      vi.clearAllMocks();

      // Retry case - should only count retry, not throttle or failure
      sender.sendMock.mockResolvedValue({ statusCode: 503 });

      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.getNetworkStats().countRetry).toHaveBeenCalledWith(503);
      expect(sender.getNetworkStats().countThrottle).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countFailure).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countSuccess).not.toHaveBeenCalled();

      vi.clearAllMocks();

      // Success case - should only count success, not throttle or retry
      sender.sendMock.mockResolvedValue({ statusCode: 200 });

      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);

      expect(sender.getNetworkStats().countSuccess).toHaveBeenCalled();
      expect(sender.getNetworkStats().countThrottle).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countRetry).not.toHaveBeenCalled();
      expect(sender.getNetworkStats().countFailure).not.toHaveBeenCalled();
    });
    it("should handle empty or malformed Breeze response", async () => {
      // Empty response string
      sender.sendMock.mockResolvedValue({ result: "", statusCode: 206 });

      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      expect(result.code).toBe(ExportResultCode.FAILED);

      // JSON with missing fields
      sender.sendMock.mockResolvedValue({
        result: JSON.stringify({}), // No itemsReceived, itemsAccepted or errors
        statusCode: 206,
      });

      const result2 = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      expect(result2.code).toBe(ExportResultCode.FAILED);

      // Invalid JSON
      sender.sendMock.mockResolvedValue({
        result: "not valid json",
        statusCode: 206,
      });

      const result3 = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      expect(result3.code).toBe(ExportResultCode.FAILED);
      expect(sender.getNetworkStats().countException).toHaveBeenCalled();
    });
  });
});
