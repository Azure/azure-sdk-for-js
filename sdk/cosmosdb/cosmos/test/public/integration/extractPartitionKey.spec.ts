// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { extractPartitionKey } from "../../../src";

describe("extractPartitionKey", function () {
  describe("With undefined partitionKeyDefinition", function () {
    it("should return undefined", function () {
      const document: any = {};
      const result = extractPartitionKey(document, undefined);
      assert.equal(result, undefined);
    });
  });

  describe("With a defined partitionKeyDefinition", function () {
    const partitionKeyDefinition = { paths: ["/a/b"] };
    const migratedPartitionKeyDefinition = { paths: ["/_partitionKey"], isSystemKey: true };

    it("should return [{}] when document has no partition key value", function () {
      const document = {};
      const result = extractPartitionKey(document, partitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should return [] when container is migrated from non-partitioned and document has no partition key value", function () {
      const document = {};
      const result = extractPartitionKey(document, migratedPartitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should return [null] when document has a null partition key value", function () {
      const document: any = { a: { b: null } };
      const result = extractPartitionKey(document, partitionKeyDefinition);
      assert.deepEqual(result, [null]);
    });

    it("should return [{}] when document has a partially defined partition key value", function () {
      const document = { a: "some value" };
      const result = extractPartitionKey(document, partitionKeyDefinition);
      assert.deepEqual(result, [{}]);
    });

    it("should return [value] when document has a valid partition key value", function () {
      const document = { a: { b: "some value" } };
      const result = extractPartitionKey(document, partitionKeyDefinition);
      assert.deepEqual(result, ["some value"]);
    });
  });
});
