// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { extractPartitionKeys } from "../../../src/extractPartitionKey.js";
import { describe, it, assert } from "vitest";

describe("extractPartitionKey", () => {
  describe("With undefined partitionKeyDefinition", () => {
    it("should return undefined", () => {
      const document: any = {};
      const result = extractPartitionKeys(document, undefined);
      assert.equal(result, undefined);
    });
  });

  describe("With a defined partitionKeyDefinition", () => {
    const partitionKeyDefinition = { paths: ["/a/b"] };
    const migratedPartitionKeyDefinition = { paths: ["/_partitionKey"], systemKey: true };
    const defaultPartitionKeyDefinition = { paths: ["/_partitionKey"] };

    it("should return [{}] when document has no partition key value", () => {
      const document = {};
      const result = extractPartitionKeys(document, partitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should return [] when container is migrated from non-partitioned and document has no partition key value", () => {
      const document = {};
      const result = extractPartitionKeys(document, migratedPartitionKeyDefinition);
      assert.deepEqual(result, []);
    });

    it("should return [null] when document has a null partition key value", () => {
      const document: any = { a: { b: null } };
      const result = extractPartitionKeys(document, partitionKeyDefinition);
      assert.deepEqual(result, [null]);
    });

    it("should return [{}] when document has a partially defined partition key value", () => {
      const document = { a: "some value" };
      const result = extractPartitionKeys(document, partitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should return [value] when document has a valid partition key value", () => {
      const document = { a: { b: "some value" } };
      const result = extractPartitionKeys(document, partitionKeyDefinition);
      assert.deepEqual(result, ["some value"]);
    });
    // add a test case for Hierarchical partition key paths
    it("should return [value] for hierarchical partition key paths", () => {
      const hierarchicalPartitionKeyDefinition = { paths: ["/a", "/bc", "/d"] };
      const document = { a: "a", bc: "bc", d: "d" };
      const result = extractPartitionKeys(document, hierarchicalPartitionKeyDefinition);
      assert.deepEqual(result, ["a", "bc", "d"]);
    });

    it("should handle default partition key path with valid value", () => {
      const document = { _partitionKey: "test-value" };
      const result = extractPartitionKeys(document, defaultPartitionKeyDefinition);
      assert.deepEqual(result, ["test-value"]);
    });

    it("should handle migrated partition key path with valid value", () => {
      const document = { _partitionKey: "test-value" };
      const result = extractPartitionKeys(document, migratedPartitionKeyDefinition);
      assert.deepEqual(result, ["test-value"]);
    });

    it("should handle default partition key path with undefined value and system key", () => {
      const document = {};
      const result = extractPartitionKeys(document, migratedPartitionKeyDefinition);
      assert.deepEqual(result, []);
    });

    it("should handle default partition key path with undefined value and non-system key", () => {
      const document = {};
      const result = extractPartitionKeys(document, defaultPartitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should handle default partition key path with unsupported value type", () => {
      const document = { _partitionKey: { nested: "value" } };
      const result = extractPartitionKeys(document, defaultPartitionKeyDefinition);
      assert.deepEqual(result, undefined);
    });

    it("should handle system key with non-default partition key path", () => {
      const systemKeyDefinition = { paths: ["/customPath"], systemKey: true };
      const document = {};
      const result = extractPartitionKeys(document, systemKeyDefinition);
      assert.deepEqual(result, []);
    });
  });
});
