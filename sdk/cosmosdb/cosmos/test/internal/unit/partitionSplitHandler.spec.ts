// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { StatusCodes, SubStatusCodes } from "../../../src/common/statusCodes.js";
import { PartitionSplitHandler } from "../../../src/queryExecutionContext/PartitionSplitHandler.js";
import type { ClientContext } from "../../../src/ClientContext.js";
import type { DocumentProducer } from "../../../src/queryExecutionContext/documentProducer.js";
import type { PartitionKeyRange } from "../../../src/index.js";
import type { BaseContinuationToken } from "../../../src/documents/ContinuationToken/CompositeQueryContinuationToken.js";
import type { DiagnosticNodeInternal } from "../../../src/diagnostics/DiagnosticNodeInternal.js";

describe("PartitionSplitHandler", () => {
  let clientContext: ClientContext;
  let collectionLink: string;
  let updatedContinuationRanges: Map<string, any>;
  let splitHandler: PartitionSplitHandler;

  beforeEach(() => {
    clientContext = {} as ClientContext;
    collectionLink = "dbs/testDb/colls/testColl";
    updatedContinuationRanges = new Map();
    splitHandler = new PartitionSplitHandler(
      clientContext,
      collectionLink,
      updatedContinuationRanges,
    );
  });

  describe("needsCacheRefresh()", () => {
    it("should return true for Gone + PartitionKeyRangeGone error", () => {
      const error = {
        code: StatusCodes.Gone,
        substatus: SubStatusCodes.PartitionKeyRangeGone,
      };
      expect(PartitionSplitHandler.needsCacheRefresh(error)).toBe(true);
    });

    it("should return false for Gone without PartitionKeyRangeGone substatus", () => {
      const error = {
        code: StatusCodes.Gone,
        substatus: SubStatusCodes.NameCacheIsStale,
      };
      expect(PartitionSplitHandler.needsCacheRefresh(error)).toBe(false);
    });

    it("should return false for non-Gone errors", () => {
      const error = {
        code: StatusCodes.NotFound,
        substatus: SubStatusCodes.PartitionKeyRangeGone,
      };
      expect(PartitionSplitHandler.needsCacheRefresh(error)).toBe(false);
    });

    it("should return false for error without substatus field", () => {
      const error = { code: StatusCodes.Gone };
      expect(PartitionSplitHandler.needsCacheRefresh(error)).toBe(false);
    });

    it("should return false for undefined error", () => {
      expect(PartitionSplitHandler.needsCacheRefresh(undefined)).toBe(false);
    });
  });

  describe("Construction", () => {
    it("should construct with required dependencies", () => {
      expect(splitHandler).toBeDefined();
    });
  });

  describe("handlePartitionRangeChanges()", () => {
    const mockDiagnostic = {} as DiagnosticNodeInternal;

    it("should return empty array for token with no rangeMappings", async () => {
      const parsedToken: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [],
      };
      const result = await splitHandler.handlePartitionRangeChanges(parsedToken, mockDiagnostic);
      expect(result).toEqual([]);
    });

    it("should detect no-change scenario (same range)", async () => {
      const parsedToken: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          { queryRange: { min: "00", max: "FF" }, continuationToken: "token1" },
        ],
      };
      const mockRange: PartitionKeyRange = {
        id: "0",
        minInclusive: "00",
        maxExclusive: "FF",
      } as PartitionKeyRange;

      (splitHandler as any)["routingProvider"].getOverlappingRanges = vi
        .fn()
        .mockResolvedValue([mockRange]);

      const result = await splitHandler.handlePartitionRangeChanges(parsedToken, mockDiagnostic);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ range: mockRange, continuationToken: "token1" });
      expect(result[0].epkMin).toBeUndefined();
    });

    it("should detect merge scenario", async () => {
      const parsedToken: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          { queryRange: { min: "00", max: "80" }, continuationToken: "token1" },
        ],
      };
      const mergedRange: PartitionKeyRange = {
        id: "0",
        minInclusive: "00",
        maxExclusive: "FF",
      } as PartitionKeyRange;

      (splitHandler as any)["routingProvider"].getOverlappingRanges = vi
        .fn()
        .mockResolvedValue([mergedRange]);

      const result = await splitHandler.handlePartitionRangeChanges(parsedToken, mockDiagnostic);
      expect(result).toHaveLength(1);
      expect(result[0].epkMin).toBe("00");
      expect(result[0].epkMax).toBe("80");
      expect(updatedContinuationRanges.has("00-80")).toBe(true);
    });

    it("should detect split scenario", async () => {
      const parsedToken: BaseContinuationToken = {
        rid: "test-rid",
        rangeMappings: [
          { queryRange: { min: "00", max: "FF" }, continuationToken: "token1" },
        ],
      };
      const splitRanges: PartitionKeyRange[] = [
        { id: "0", minInclusive: "00", maxExclusive: "80" } as PartitionKeyRange,
        { id: "1", minInclusive: "80", maxExclusive: "FF" } as PartitionKeyRange,
      ];

      (splitHandler as any)["routingProvider"].getOverlappingRanges = vi
        .fn()
        .mockResolvedValue(splitRanges);

      const result = await splitHandler.handlePartitionRangeChanges(parsedToken, mockDiagnostic);
      expect(result).toHaveLength(2);
      expect(result[0].continuationToken).toBe("token1");
      expect(result[1].continuationToken).toBe("token1");
      expect(updatedContinuationRanges.has("00-FF")).toBe(true);
      expect(updatedContinuationRanges.get("00-FF").newRanges).toHaveLength(2);
    });
  });

  describe("handleRuntimeSplit()", () => {
    const mockDiagnostic = {} as DiagnosticNodeInternal;
    let mockProducer: DocumentProducer;
    let mockError: any;
    let producerFactory: any;

    beforeEach(() => {
      mockError = new Error("Gone");
      mockError.code = StatusCodes.Gone;
      mockError.substatus = SubStatusCodes.PartitionKeyRangeGone;

      mockProducer = {
        targetPartitionKeyRange: {
          id: "0",
          minInclusive: "00",
          maxExclusive: "FF",
        } as PartitionKeyRange,
        continuationToken: "token1",
        startEpk: undefined,
        endEpk: undefined,
      } as DocumentProducer;

      producerFactory = vi.fn((range: any, token: any, startEpk: any, endEpk: any, populateHeaders: any) => ({
        targetPartitionKeyRange: range,
        continuationToken: token,
        startEpk,
        endEpk,
        populateEpkRangeHeaders: populateHeaders,
      })) as any;
    });

    it("should create replacement producers for split scenario", async () => {
      const replacementRanges: PartitionKeyRange[] = [
        { id: "0", minInclusive: "00", maxExclusive: "80" } as PartitionKeyRange,
        { id: "1", minInclusive: "80", maxExclusive: "FF" } as PartitionKeyRange,
      ];

      (splitHandler as any)["getReplacementRanges"] = vi.fn().mockResolvedValue(replacementRanges);

      const result = await splitHandler.handleRuntimeSplit(
        mockError, mockDiagnostic, mockProducer, "token1", producerFactory,
      );
      expect(result).toHaveLength(2);
      expect(producerFactory).toHaveBeenCalledTimes(2);
    });

    it("should create single replacement for merge scenario", async () => {
      const replacementRanges: PartitionKeyRange[] = [
        { id: "merged", minInclusive: "00", maxExclusive: "FF" } as PartitionKeyRange,
      ];

      (splitHandler as any)["getReplacementRanges"] = vi.fn().mockResolvedValue(replacementRanges);

      const result = await splitHandler.handleRuntimeSplit(
        mockError, mockDiagnostic, mockProducer, "token1", producerFactory,
      );
      expect(result).toHaveLength(1);
      expect(result[0].populateEpkRangeHeaders).toBe(true);
    });

    it("should throw when no replacement ranges found", async () => {
      (splitHandler as any)["getReplacementRanges"] = vi.fn().mockResolvedValue([]);
      await expect(
        splitHandler.handleRuntimeSplit(mockError, mockDiagnostic, mockProducer, "token1", producerFactory),
      ).rejects.toThrow();
    });

    it("should handle split without continuation token", async () => {
      const replacementRanges: PartitionKeyRange[] = [
        { id: "0", minInclusive: "00", maxExclusive: "80" } as PartitionKeyRange,
      ];
      (splitHandler as any)["getReplacementRanges"] = vi.fn().mockResolvedValue(replacementRanges);

      const result = await splitHandler.handleRuntimeSplit(
        mockError, mockDiagnostic, mockProducer, undefined, producerFactory,
      );
      expect(result).toHaveLength(1);
      expect(updatedContinuationRanges.size).toBe(0);
    });
  });
});
