// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { diag } from "@opentelemetry/api";
import { ExportResultCode } from "@opentelemetry/core";
import { RetriableRestErrorTypes } from "../../src/Declarations/Constants.js";
import type { SenderResult } from "../../src/types.js";
import { MAX_STATSBEAT_FAILURES } from "../../src/export/statsbeat/types.js";

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
export const mockNetworkStats = {
  countSuccess: vi.fn(),
  countFailure: vi.fn(),
  countThrottle: vi.fn(),
  countRetry: vi.fn(),
  countException: vi.fn(),
  countReadFailure: vi.fn(),
  countWriteFailure: vi.fn(),
  shutdown: vi.fn()
};

export const mockLongIntervalStats = {
  shutdown: vi.fn()
};

// Helper type for our mock
interface MockFilePersist {
  push: ReturnType<typeof vi.fn>;
  shift: ReturnType<typeof vi.fn>;
  _getFirstFileOnDisk?: ReturnType<typeof vi.fn>;
  _storeToDisk?: ReturnType<typeof vi.fn>;
  _fileCleanupTask?: ReturnType<typeof vi.fn>;
}

// Global mock instance that we can modify in tests
export const mockPersist: MockFilePersist = {
  push: vi.fn().mockResolvedValue(true),
  shift: vi.fn().mockResolvedValue(null),
  _getFirstFileOnDisk: vi.fn(),
  _storeToDisk: vi.fn(),
  _fileCleanupTask: vi.fn()
};

// Mock the persist module
vi.mock("../../src/platform/nodejs/persist/index.js", () => {
  return {
    FileSystemPersist: vi.fn().mockImplementation(() => mockPersist)
  };
});

vi.mock("../../src/export/statsbeat/networkStatsbeatMetrics.js", () => {
  return {
    NetworkStatsbeatMetrics: vi.fn().mockImplementation(() => {
      return mockNetworkStats;
    })
  };
});

vi.mock("../../src/export/statsbeat/longIntervalStatsbeatMetrics.js", () => {
  return {
    getInstance: vi.fn().mockImplementation(() => {
      return mockLongIntervalStats;
    })
  };
});

vi.mock("../../src/utils/breezeUtils.js", () => {
  const actual = vi.importActual("../../src/utils/breezeUtils.js");
  return {
    ...actual,
    // Keep the actual implementation for tests to use
    isRetriable: vi.fn().mockImplementation((statusCode) => 
      statusCode === 500 || statusCode === 503 || statusCode === 408 || statusCode === 429 || statusCode === 439
    )
  };
});

// Now import the BaseSender which will use our mocked dependencies
import { BaseSender } from "../../src/platform/nodejs/baseSender.js";

// Test implementation of BaseSender
class TestBaseSender extends BaseSender {
  public sendMock = vi.fn();
  public shutdownMock = vi.fn();
  public handlePermanentRedirectMock = vi.fn();
  
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
  
  // Override the private networkStatsbeatMetrics field to use our mock directly
  constructor(options: any) {
    super(options);
    // Override the private networkStatsbeatMetrics field
    Object.defineProperty(this, 'networkStatsbeatMetrics', { 
      value: mockNetworkStats,
      writable: true 
    });
    // Override the private longIntervalStatsbeatMetrics field
    Object.defineProperty(this, 'longIntervalStatsbeatMetrics', { 
      value: mockLongIntervalStats,
      writable: true 
    });
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
  
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Create test sender
    sender = new TestBaseSender({
      endpointUrl: "https://example.com",
      instrumentationKey: "test-key",
      trackStatsbeat: true,
      exporterOptions: {}
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
        errors: [{ index: 1, statusCode: 400, message: "Bad request" }]
      });
      
      sender.sendMock.mockResolvedValue({ result: mockResponse, statusCode: 206 });
      
      const envelopes = [
        { name: "test1", time: new Date() },
        { name: "test2", time: new Date() }
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
          { index: 1, statusCode: 503, message: "Service unavailable" }
        ]
      });
      
      sender.sendMock.mockResolvedValue({ result: mockResponse, statusCode: 206 });
      
      const envelopes = [
        { name: "test1", time: new Date() },
        { name: "test2", time: new Date() }
      ];
      
      const result = await sender.exportEnvelopes(envelopes);
      
      expect(sender.getNetworkStats().countRetry).toHaveBeenCalled();
      expect(sender.getPersister().push).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });    
    
    it("should count failure when no retriable errors are found", async () => {
      const mockResponse = JSON.stringify({
        itemsReceived: 2,
        itemsAccepted: 0,
        errors: [
          { index: 0, statusCode: 400, message: "Bad request" },
          { index: 1, statusCode: 400, message: "Bad request" }
        ]
      });
      
      sender.sendMock.mockResolvedValue({ result: mockResponse, statusCode: 400 });
      
      const envelopes = [
        { name: "test1", time: new Date() },
        { name: "test2", time: new Date() }
      ];
      
      const result = await sender.exportEnvelopes(envelopes);
      
      expect(sender.getNetworkStats().countFailure).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.FAILED);
    });    
    
    it("should count retry when retriable status code has no result", async () => {
      sender.sendMock.mockResolvedValue({ statusCode: 503 });
      
      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      
      expect(sender.getNetworkStats().countRetry).toHaveBeenCalled();
      expect(sender.getPersister().push).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });

    it("should handle temporary redirect (307)", async () => {
      // First call throws a redirect error, second call succeeds
      const redirectError: any = new Error("Temporary redirect");
      redirectError.statusCode = 307;
      redirectError.response = {
        headers: { get: (name: string) => name === "location" ? "https://newlocation.com" : null }
      };
      
      sender.sendMock.mockRejectedValueOnce(redirectError).mockResolvedValueOnce({ 
        result: "success",
        statusCode: 200 
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
        headers: { get: (name: string) => name === "location" ? "https://permanentlocation.com" : null }
      };
      
      sender.sendMock.mockRejectedValueOnce(redirectError).mockResolvedValueOnce({ 
        result: "success",
        statusCode: 200 
      });
      
      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      
      expect(sender.handlePermanentRedirectMock).toHaveBeenCalledWith("https://permanentlocation.com");
      expect(sender.sendMock).toHaveBeenCalledTimes(2);
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });    
    
    it("should handle circular redirects", async () => {
      const redirectError: any = new Error("Temporary redirect");
      redirectError.statusCode = 307;
      redirectError.response = {
        headers: { get: (name: string) => name === "location" ? "https://newlocation.com" : null }
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
      expect(sender.getNetworkStats().shutdown).toHaveBeenCalled();
      expect(sender.getLongIntervalStats().shutdown).toHaveBeenCalled();
    });
    
    it("should handle statsbeat shutdown after max failures", async () => {
      // Set as statsbeat sender
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true
      });
      
      // Set the failure count to MAX_STATSBEAT_FAILURES
      sender.setStatsbeatFailureCount(MAX_STATSBEAT_FAILURES);
      
      const unauthorizedError: any = new Error("Unauthorized");
      unauthorizedError.statusCode = 401;
      
      sender.sendMock.mockRejectedValue(unauthorizedError);
      
      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      
      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(sender.getStatsbeatFailureCount()).toBe(MAX_STATSBEAT_FAILURES + 1);
      expect(sender.getNetworkStats().shutdown).toHaveBeenCalled();
      expect(sender.getLongIntervalStats().shutdown).toHaveBeenCalled();
    });
    
    it("should count exception for non-retriable errors", async () => {
      const nonRetriableError: any = new Error("Bad request");
      nonRetriableError.statusCode = 400;
      
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
      
      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      
      expect(sender.getPersister().push).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.SUCCESS);
    });
    
    it("should not log errors for statsbeat sender with retriable errors", async () => {
      // Set as statsbeat sender
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true
      });
      
      const retriableError: any = new Error("Connection reset");
      retriableError.code = RetriableRestErrorTypes.REQUEST_SEND_ERROR;
      
      sender.sendMock.mockRejectedValue(retriableError);
      
      await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      
      expect(diag.error).not.toHaveBeenCalled();
    });
    
    it("should count write failure when persisting fails with an exception", async () => {
      sender.sendMock.mockResolvedValue({ statusCode: 503 });
      
      // Temporarily change the push function in our mockPersist to reject
      const originalPush = mockPersist.push;
      mockPersist.push = vi.fn().mockRejectedValue(new Error("Disk full"));
      
      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      
      // Restore the original mock
      mockPersist.push = originalPush;
      
      expect(sender.getNetworkStats().countWriteFailure).toHaveBeenCalled();
      expect(result.code).toBe(ExportResultCode.FAILED);
      expect(result.error).toBeDefined();
      expect(diag.error).toHaveBeenCalled();
    });

    it("should handle daily cap limit errors silently for statsbeat sender", async () => {
      // Set as statsbeat sender
      sender = new TestBaseSender({
        endpointUrl: "https://example.com",
        instrumentationKey: "test-key",
        trackStatsbeat: true,
        exporterOptions: {},
        isStatsbeatSender: true
      });
      
      const quotaError: any = new Error("Daily cap limit exceeded");
      quotaError.statusCode = 429;
      
      sender.sendMock.mockRejectedValue(quotaError);
      
      const result = await sender.exportEnvelopes([{ name: "test", time: new Date() }]);
      
      expect(result.code).toBe(ExportResultCode.SUCCESS);
      expect(diag.error).not.toHaveBeenCalled();
    });
  });
});
