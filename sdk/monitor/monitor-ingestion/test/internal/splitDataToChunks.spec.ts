// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { splitDataToChunks } from "../../src/utils/splitDataToChunksHelper";
import { assert } from "chai";

describe("LogsIngestionClient unit tests", function () {
  it("creates one chunk for single log record of 1MB size", () => {
    const log = [
      {
        data: Array(1000000).fill("x").join(""),
      },
    ];
    const chunkArray = splitDataToChunks(log);
    assert.equal(chunkArray.length, 1);
    assert.isNotEmpty(chunkArray[0]);
    assert.deepEqual(chunkArray[0], log);
  });

  it("creates one chunk for single log record greater than 1MB size", () => {
    const log: Record<string, unknown>[] = [
      {
        data: Array(3000000).fill("x").join(""),
      },
    ];
    const chunkArray = splitDataToChunks(log);
    assert.equal(chunkArray.length, 1);
    assert.isNotEmpty(chunkArray[0]);
    assert.deepEqual(chunkArray[0], log);
  });

  it("creates two chunks for logs greater than 1MB size", () => {
    const log = [
      {
        data: Array(3000000).fill("x").join(""),
      },
      {
        data: Array(3000000).fill("x").join(""),
      },
    ];
    const chunkArray = splitDataToChunks(log);
    assert.equal(chunkArray.length, 2);
    assert.deepEqual(chunkArray[0][0], log[0]);
    assert.deepEqual(chunkArray[1][0], log[1]);
  });
});
