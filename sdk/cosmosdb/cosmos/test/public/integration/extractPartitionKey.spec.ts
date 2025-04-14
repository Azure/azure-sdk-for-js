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
    const migratedPartitionKeyDefinition = { paths: ["/_partitionKey"], isSystemKey: true };

    it("should return [{}] when document has no partition key value", () => {
      const document = {};
      const result = extractPartitionKeys(document, partitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should return [] when container is migrated from non-partitioned and document has no partition key value", () => {
      const document = {};
      const result = extractPartitionKeys(document, migratedPartitionKeyDefinition);
      assert.deepEqual(result, [{}]);
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
  });
});
