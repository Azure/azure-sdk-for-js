// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach } from "vitest";
import { computePartitionKeyRangeId } from "../../../src/client/ClientUtils.js";
import { PartitionKeyInternal } from "../../../src/documents/PartitionKeyInternal.js";
import { PartitionKeyRangeCache } from "../../../src/routing/partitionKeyRangeCache.js";
import {
  Container,
  DiagnosticNodeInternal,
  PartitionKeyDefinition,
  PartitionKeyKind,
} from "../../../src/index.js";

describe("computePartitionKeyRangeId edge case handling", () => {
  let partitionKeyRangeCache: PartitionKeyRangeCache;
  let container: Container;
  let diagnosticNode: DiagnosticNodeInternal;

  const fakePartitionKeyDefinition: PartitionKeyDefinition = {
    paths: ["/id"],
    kind: PartitionKeyKind.Hash,
  };

  beforeEach(() => {
    partitionKeyRangeCache = {
      getPartitionKeyRangeIdFromPartitionKey: vi.fn().mockResolvedValue("fakeRangeId"),
    } as any;

    container = {
      url: "/dbs/test/colls/test",
    } as any;

    diagnosticNode = {} as any;
  });

  const testCases: { name: string; partitionKey: PartitionKeyInternal }[] = [
    { name: "undefined", partitionKey: undefined },
    { name: "null", partitionKey: null },
    { name: "empty array", partitionKey: [] },
    { name: '["key1"]', partitionKey: ["key1"] },
    { name: "[123]", partitionKey: [123] },
  ];

  for (const { name, partitionKey } of testCases) {
    it(`compute partitionKeyRangeId for partition key ${name}`, async () => {
      const result = await computePartitionKeyRangeId(
        diagnosticNode,
        partitionKey,
        partitionKeyRangeCache,
        true,
        container,
        fakePartitionKeyDefinition,
      );

      if (name === '["key1"]' || name === "[123]") {
        expect(result).toBe("fakeRangeId");
        expect(partitionKeyRangeCache.getPartitionKeyRangeIdFromPartitionKey).toHaveBeenCalled();
      } else {
        expect(result).toBeUndefined();
        expect(
          partitionKeyRangeCache.getPartitionKeyRangeIdFromPartitionKey,
        ).not.toHaveBeenCalled();
      }
    });
  }

  it("should return undefined when failover is disabled", async () => {
    const result = await computePartitionKeyRangeId(
      diagnosticNode,
      ["key1"],
      partitionKeyRangeCache,
      false,
      container,
      fakePartitionKeyDefinition,
    );
    expect(result).toBeUndefined();
    expect(partitionKeyRangeCache.getPartitionKeyRangeIdFromPartitionKey).not.toHaveBeenCalled();
  });
});
