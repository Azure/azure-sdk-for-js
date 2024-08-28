// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  decodeContinuationToken,
  encodeContinuationToken,
} from "../../src/utils/continuationToken";

import { assert } from "chai";

describe("continuation token utils", function () {
  it("should encode nextPartitionKey and nextRowKey", function () {
    const encoded = encodeContinuationToken("foo", "bar");
    assert.equal(encoded, "eyJuZXh0UGFydGl0aW9uS2V5IjoiZm9vIiwibmV4dFJvd0tleSI6ImJhciJ9");
  });

  it("should not encode nextRowKey if it is empty string", function () {
    const encoded = encodeContinuationToken("foo", "");
    assert.deepEqual(decodeContinuationToken(encoded!), { nextPartitionKey: "foo" });
  });

  it("should encode nextPartitionKey and undefined nextRowKey", function () {
    const encoded = encodeContinuationToken("foo");
    assert.equal(encoded, "eyJuZXh0UGFydGl0aW9uS2V5IjoiZm9vIn0=");
  });

  it("should return undefined if nextPartitionKey and nextRowKey are empty", function () {
    const encoded = encodeContinuationToken();
    assert.equal(encoded, undefined);
  });

  it("should decode nextPartitionKey and nextRowKey", function () {
    const decoded = decodeContinuationToken(
      "eyJuZXh0UGFydGl0aW9uS2V5IjoiZm9vIiwibmV4dFJvd0tleSI6ImJhciJ9",
    );
    assert.deepEqual(decoded, { nextPartitionKey: "foo", nextRowKey: "bar" });
  });

  it("should decode nextPartitionKey and undefined nextRowKey", function () {
    const decoded = decodeContinuationToken("eyJuZXh0UGFydGl0aW9uS2V5IjoiZm9vIn0=");
    assert.deepEqual(decoded, { nextPartitionKey: "foo" } as any);
  });
});
