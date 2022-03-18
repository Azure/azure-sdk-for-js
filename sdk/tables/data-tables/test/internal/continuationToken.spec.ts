// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  decodeContinuationToken,
  encodeContinuationToken,
} from "../../src/utils/continuationToken";

import { assert } from "chai";

describe("continuation token utils", () => {
  it("should encode nextPartitionKey and nextRowKey", () => {
    const encoded = encodeContinuationToken("foo", "bar");
    assert.equal(encoded, "eyJuZXh0UGFydGl0aW9uS2V5IjoiZm9vIiwibmV4dFJvd0tleSI6ImJhciJ9");
  });

  it("should not encode nextRowKey if it is empty string", () => {
    const encoded = encodeContinuationToken("foo", "");
    assert.deepEqual(decodeContinuationToken(encoded!), { nextPartitionKey: "foo" });
  });

  it("should encode nextPartitionKey and undefined nextRowKey", () => {
    const encoded = encodeContinuationToken("foo");
    assert.equal(encoded, "eyJuZXh0UGFydGl0aW9uS2V5IjoiZm9vIn0=");
  });

  it("should return undefined if nextPartitionKey and nextRowKey are empty", () => {
    const encoded = encodeContinuationToken();
    assert.equal(encoded, undefined);
  });

  it("should decode nextPartitionKey and nextRowKey", () => {
    const decoded = decodeContinuationToken(
      "eyJuZXh0UGFydGl0aW9uS2V5IjoiZm9vIiwibmV4dFJvd0tleSI6ImJhciJ9"
    );
    assert.deepEqual(decoded, { nextPartitionKey: "foo", nextRowKey: "bar" });
  });

  it("should decode nextPartitionKey and undefined nextRowKey", () => {
    const decoded = decodeContinuationToken("eyJuZXh0UGFydGl0aW9uS2V5IjoiZm9vIn0=");
    assert.deepEqual(decoded, { nextPartitionKey: "foo" } as any);
  });
});
