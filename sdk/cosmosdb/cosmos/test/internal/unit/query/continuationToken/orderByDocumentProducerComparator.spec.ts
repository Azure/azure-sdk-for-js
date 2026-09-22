// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeEach, assert } from "vitest";
import { OrderByDocumentProducerComparator } from "../../../../../src/queryExecutionContext/orderByDocumentProducerComparator.js";
import type { DocumentProducer } from "../../../../../src/queryExecutionContext/documentProducer.js";
import type { PartitionKeyRange } from "../../../../../src/client/Container/PartitionKeyRange.js";

describe("OrderByDocumentProducerComparator", () => {
  let comparator: OrderByDocumentProducerComparator;
  let mockPartitionKeyRange1: PartitionKeyRange;
  let mockPartitionKeyRange2: PartitionKeyRange;

  beforeEach(() => {
    comparator = new OrderByDocumentProducerComparator(["Ascending"]);
    mockPartitionKeyRange1 = {
      id: "0",
      minInclusive: "",
      maxExclusive: "AA",
      ridPrefix: 1,
      throughputFraction: 1,
      status: "online",
      parents: [],
    };
    mockPartitionKeyRange2 = {
      id: "1",
      minInclusive: "AA",
      maxExclusive: "BB",
      ridPrefix: 2,
      throughputFraction: 1,
      status: "online",
      parents: [],
    };
  });

  const createMockDocumentProducer = (
    partitionKeyRange: PartitionKeyRange,
    startEpk?: string,
  ): Partial<DocumentProducer> => ({
    getTargetPartitionKeyRange: () => partitionKeyRange,
    startEpk: startEpk,
  });

  describe("targetPartitionKeyRangeDocProdComparator", () => {
    it("should return -1 when first producer has smaller minInclusive", () => {
      const docProd1 = createMockDocumentProducer({
        ...mockPartitionKeyRange1,
        minInclusive: "",
      });
      const docProd2 = createMockDocumentProducer({
        ...mockPartitionKeyRange2,
        minInclusive: "AA",
      });

      // Access private method using type assertion
      const result = (comparator as any).targetPartitionKeyRangeDocProdComparator(
        docProd1 as DocumentProducer,
        docProd2 as DocumentProducer,
      );

      assert.equal(result, -1);
    });

    it("should return 1 when first producer has larger minInclusive", () => {
      const docProd1 = createMockDocumentProducer({
        ...mockPartitionKeyRange1,
        minInclusive: "BB",
      });
      const docProd2 = createMockDocumentProducer({
        ...mockPartitionKeyRange2,
        minInclusive: "AA",
      });

      const result = (comparator as any).targetPartitionKeyRangeDocProdComparator(
        docProd1 as DocumentProducer,
        docProd2 as DocumentProducer,
      );

      assert.equal(result, 1);
    });

    it("should return 0 when both producers have same minInclusive and no startEpk", () => {
      const docProd1 = createMockDocumentProducer({
        ...mockPartitionKeyRange1,
        minInclusive: "AA",
      });
      const docProd2 = createMockDocumentProducer({
        ...mockPartitionKeyRange2,
        minInclusive: "AA",
      });

      const result = (comparator as any).targetPartitionKeyRangeDocProdComparator(
        docProd1 as DocumentProducer,
        docProd2 as DocumentProducer,
      );

      assert.equal(result, 0);
    });

    it("should use startEpk as tie-breaker when minInclusive values are equal", () => {
      const docProd1 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange1,
          minInclusive: "AA",
        },
        "epk1",
      );
      const docProd2 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange2,
          minInclusive: "AA",
        },
        "epk2",
      );

      const result = (comparator as any).targetPartitionKeyRangeDocProdComparator(
        docProd1 as DocumentProducer,
        docProd2 as DocumentProducer,
      );

      assert.equal(result, -1); // "epk1" < "epk2"
    });

    it("should return 1 when first startEpk is greater with equal minInclusive", () => {
      const docProd1 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange1,
          minInclusive: "AA",
        },
        "epk2",
      );
      const docProd2 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange2,
          minInclusive: "AA",
        },
        "epk1",
      );

      const result = (comparator as any).targetPartitionKeyRangeDocProdComparator(
        docProd1 as DocumentProducer,
        docProd2 as DocumentProducer,
      );

      assert.equal(result, 1); // "epk2" > "epk1"
    });

    it("should return 0 when both startEpk values are equal", () => {
      const docProd1 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange1,
          minInclusive: "AA",
        },
        "epk1",
      );
      const docProd2 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange2,
          minInclusive: "AA",
        },
        "epk1",
      );

      const result = (comparator as any).targetPartitionKeyRangeDocProdComparator(
        docProd1 as DocumentProducer,
        docProd2 as DocumentProducer,
      );

      assert.equal(result, 0); // "epk1" === "epk1"
    });

    it("should return 0 when one startEpk is undefined", () => {
      const docProd1 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange1,
          minInclusive: "AA",
        },
        "epk1",
      );
      const docProd2 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange2,
          minInclusive: "AA",
        },
        undefined,
      );

      const result = (comparator as any).targetPartitionKeyRangeDocProdComparator(
        docProd1 as DocumentProducer,
        docProd2 as DocumentProducer,
      );

      assert.equal(result, 0);
    });

    it("should return 0 when both startEpk values are undefined", () => {
      const docProd1 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange1,
          minInclusive: "AA",
        },
        undefined,
      );
      const docProd2 = createMockDocumentProducer(
        {
          ...mockPartitionKeyRange2,
          minInclusive: "AA",
        },
        undefined,
      );

      const result = (comparator as any).targetPartitionKeyRangeDocProdComparator(
        docProd1 as DocumentProducer,
        docProd2 as DocumentProducer,
      );

      assert.equal(result, 0);
    });
  });
});
