// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { hashV2PartitionKey } from "../../../../src/utils/hashing/v2";

describe("effectivePartitionKey", function () {
  describe("computes v2 key", function () {
    const toMatch = [
      {
        key: ["redmond"],
        output: "22E342F38A486A088463DFF7838A5963",
      },
      {
        key: [
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        ],
        output: "0BA3E9CA8EE4C14538828D1612A4B652",
      },
      {
        key: [""],
        output: "32E9366E637A71B4E710384B2F4970A0",
      },
      {
        key: ["aa"],
        output: "05033626483AE80D00E44FBD35362B19",
      },
      {
        key: [null],
        output: "378867E4430E67857ACE5C908374FE16",
      },
      {
        key: [true],
        output: "0E711127C5B5A8E4726AC6DD306A3E59",
      },
      {
        key: [false],
        output: "2FE1BE91E90A3439635E0E9E37361EF2",
      },
      {
        key: [{}],
        output: "11622DAA78F835834610ABE56EFF5CB5",
      },
      {
        key: [5],
        output: "19C08621B135968252FB34B4CF66F811",
      },
      {
        key: [5.5],
        output: "0E2EE47829D1AF775EEFB6540FD1D0ED",
      },
      {
        key: [12313.1221],
        output: "27E7ECA8F2EE3E53424DE8D5220631C6",
      },
      {
        key: [123456789],
        output: "1F56D2538088EBA82CCF988F36E16760",
      },
    ];
    toMatch.forEach(({ key, output }) => {
      it("matches expected hash output", function () {
        const hashed = hashV2PartitionKey(key);
        assert.equal(hashed, output);
      });
    });
  });
});
