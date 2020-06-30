import assert from "assert";
import { hashV1PartitionKey } from "../../../src/utils/hashing/v1";

describe("effectivePartitionKey", function() {
  describe("computes v1 key", function() {
    const toMatch = [
      {
        key: "partitionKey",
        output: "05C1E1B3D9CD2608716273756A756A706F4C667A00"
      },
      {
        key: "",
        output: "05C1CF33970FF80800"
      },
      {
        key: "aa",
        output: "05C1C7B7270FE008626200"
      },
      {
        key: null,
        output: "05C1ED45D7475601"
      },
      {
        key: true,
        output: "05C1D7C5A903D803"
      },
      {
        key: false,
        output: "05C1DB857D857C02"
      },
      {
        key: {},
        output: "05C1D529E345DC00"
      },
      {
        key: 5,
        output: "05C1D9C1C5517C05C014"
      },
      {
        key: 5.5,
        output: "05C1D7A771716C05C016"
      }
    ];
    toMatch.forEach(({ key, output }) => {
      it("matches expected hash output", function() {
        const hashed = hashV1PartitionKey(key);
        assert.equal(hashed, output);
      });
    });
  });
});
