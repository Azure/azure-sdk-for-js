// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { StatusCodes } from "../../../src/common/statusCodes.js";
import { DocumentProducerScheduler } from "../../../src/queryExecutionContext/DocumentProducerScheduler.js";
import type { DocumentProducer } from "../../../src/queryExecutionContext/documentProducer.js";
import type { PartitionKeyRange } from "../../../src/index.js";
import type { DiagnosticNodeInternal } from "../../../src/diagnostics/DiagnosticNodeInternal.js";

describe("DocumentProducerScheduler", () => {
  let scheduler: DocumentProducerScheduler;
  const mockComparator = (a: DocumentProducer, b: DocumentProducer) => {
    const aMin = a.targetPartitionKeyRange.minInclusive;
    const bMin = b.targetPartitionKeyRange.minInclusive;
    return aMin.localeCompare(bMin);
  };

  const createMockProducer = (overrides: Partial<DocumentProducer> = {}): DocumentProducer =>
    ({
      targetPartitionKeyRange: {
        id: "0",
        minInclusive: "00",
        maxExclusive: "FF",
      } as PartitionKeyRange,
      continuationToken: "token1",
      hasMoreResults: vi.fn().mockReturnValue(true),
      peekNextItem: vi.fn().mockReturnValue(undefined),
      bufferMore: vi.fn().mockResolvedValue({}),
      dispose: vi.fn(),
      ...overrides,
    }) as unknown as DocumentProducer;

  describe("Queue operations", () => {
    beforeEach(() => {
      scheduler = new DocumentProducerScheduler(mockComparator);
    });

    it("should enqueue single producer to unfilled queue", () => {
      expect(scheduler.unfilledSize).toBe(0);
      scheduler.enqueueUnfilled(createMockProducer());
      expect(scheduler.unfilledSize).toBe(1);
    });

    it("should track buffered queue size", () => {
      expect(scheduler.bufferedSize).toBe(0);
    });

    it("should report active producers correctly", () => {
      expect(scheduler.hasActiveProducers()).toBe(false);
      scheduler.enqueueUnfilled(createMockProducer());
      expect(scheduler.hasActiveProducers()).toBe(true);
    });
  });

  describe("enqueueAllUnfilled()", () => {
    beforeEach(() => {
      scheduler = new DocumentProducerScheduler(mockComparator);
    });

    it("should batch enqueue multiple producers", () => {
      scheduler.enqueueAllUnfilled([createMockProducer(), createMockProducer()]);
      expect(scheduler.unfilledSize).toBe(2);
    });

    it("should handle empty array", () => {
      scheduler.enqueueAllUnfilled([]);
      expect(scheduler.unfilledSize).toBe(0);
    });
  });

  describe("bufferProducers()", () => {
    const mockDiagnostic = {} as DiagnosticNodeInternal;
    let mockCallbacks: any;

    beforeEach(() => {
      mockCallbacks = {
        mergeHeaders: vi.fn(),
        addToBuffer: vi.fn(),
        updatePartitionMapping: vi.fn(),
        getContinuationToken: vi.fn().mockReturnValue("token1"),
        fetchFromProducer: vi.fn().mockResolvedValue({ result: [], headers: {} }),
        shouldProcessBufferedProducers: vi.fn().mockReturnValue(true),
        onSplitDetected: vi.fn(),
      };
    });

    it("should return early if unfilled queue is empty", async () => {
      scheduler = new DocumentProducerScheduler(mockComparator);
      await scheduler.bufferProducers(mockDiagnostic, mockCallbacks);
      expect(mockCallbacks.mergeHeaders).not.toHaveBeenCalled();
    });

    it("should respect maxDegreeOfParallelism", async () => {
      scheduler = new DocumentProducerScheduler(mockComparator, { maxDegreeOfParallelism: 2 });
      // Producers with hasMoreResults=false won't be re-enqueued
      scheduler.enqueueAllUnfilled([
        createMockProducer({ hasMoreResults: vi.fn().mockReturnValue(false) as any }),
        createMockProducer({ hasMoreResults: vi.fn().mockReturnValue(false) as any }),
        createMockProducer({ hasMoreResults: vi.fn().mockReturnValue(false) as any }),
      ]);
      await scheduler.bufferProducers(mockDiagnostic, mockCallbacks);
      // Only 2 dequeued and processed (maxDegreeOfParallelism=2)
      expect(mockCallbacks.mergeHeaders).toHaveBeenCalledTimes(2);
      expect(scheduler.unfilledSize).toBe(1); // 1 still waiting
    });

    it("should process all producers when maxDegreeOfParallelism is undefined", async () => {
      scheduler = new DocumentProducerScheduler(mockComparator);
      // Producers with hasMoreResults=false won't be re-enqueued
      scheduler.enqueueAllUnfilled([
        createMockProducer({ hasMoreResults: vi.fn().mockReturnValue(false) as any }),
        createMockProducer({ hasMoreResults: vi.fn().mockReturnValue(false) as any }),
        createMockProducer({ hasMoreResults: vi.fn().mockReturnValue(false) as any }),
      ]);
      await scheduler.bufferProducers(mockDiagnostic, mockCallbacks);
      expect(mockCallbacks.mergeHeaders).toHaveBeenCalledTimes(3);
      expect(scheduler.unfilledSize).toBe(0); // all exhausted
    });

    it("should move producer with data to buffered queue", async () => {
      scheduler = new DocumentProducerScheduler(mockComparator);
      scheduler.enqueueUnfilled(
        createMockProducer({ peekNextItem: vi.fn().mockReturnValue({ id: "doc1" }) as any }),
      );
      await scheduler.bufferProducers(mockDiagnostic, mockCallbacks);
      expect(scheduler.bufferedSize).toBe(1);
    });

    it("should handle split detection during buffering", async () => {
      scheduler = new DocumentProducerScheduler(mockComparator);
      const splitError = new Error("Split detected");
      (splitError as any).code = StatusCodes.Gone;
      const failingProducer = createMockProducer({
        bufferMore: vi.fn().mockRejectedValue(splitError) as any,
      });
      scheduler.enqueueUnfilled(failingProducer);
      await scheduler.bufferProducers(mockDiagnostic, mockCallbacks);
      expect(mockCallbacks.onSplitDetected).toHaveBeenCalledWith(
        splitError,
        mockDiagnostic,
        failingProducer,
      );
    });
  });

  describe("disposeAll()", () => {
    beforeEach(() => {
      scheduler = new DocumentProducerScheduler(mockComparator);
    });

    it("should drain and dispose all producers from unfilled queue", () => {
      const p1 = createMockProducer();
      const p2 = createMockProducer();
      scheduler.enqueueAllUnfilled([p1, p2]);
      scheduler.disposeAll();
      expect(p1.dispose).toHaveBeenCalled();
      expect(p2.dispose).toHaveBeenCalled();
      expect(scheduler.unfilledSize).toBe(0);
    });

    it("should report no active producers after dispose", () => {
      scheduler.enqueueUnfilled(createMockProducer());
      expect(scheduler.hasActiveProducers()).toBe(true);
      scheduler.disposeAll();
      expect(scheduler.hasActiveProducers()).toBe(false);
    });
  });

  describe("Queue ordering", () => {
    it("should order unfilled queue by range comparator", () => {
      scheduler = new DocumentProducerScheduler(mockComparator);
      const p1 = createMockProducer({
        targetPartitionKeyRange: { id: "0", minInclusive: "80", maxExclusive: "FF" } as PartitionKeyRange,
      });
      const p2 = createMockProducer({
        targetPartitionKeyRange: { id: "1", minInclusive: "00", maxExclusive: "80" } as PartitionKeyRange,
      });
      scheduler.enqueueUnfilled(p1);
      scheduler.enqueueUnfilled(p2);
      // Dequeue should give p2 first (smaller minInclusive)
      const first = (scheduler as any)["unfilledQueue"].deq();
      expect(first.targetPartitionKeyRange.minInclusive).toBe("00");
    });
  });
});
