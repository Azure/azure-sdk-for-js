// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-use-before-define */
import { assert } from "chai";
import { isVersionInSupportedRange, lessThanOrEqual } from "../src/multiVersion";

describe("Multi-service-version test support", () => {
  describe("isVersionInSupportedRange() on version list", () => {
    [
      { currentVersion: "1.0", supported: ["1.0", "1.1"], expected: true },
      { currentVersion: "1.2", supported: ["1.0", "1.1"], expected: false },
      { currentVersion: "1.0", supported: { minVer: "1.0", maxVer: undefined }, expected: true },
      { currentVersion: "1.1", supported: { minVer: "1.0", maxVer: undefined }, expected: true },
      { currentVersion: "1.0", supported: { minVer: "1.1", maxVer: undefined }, expected: false },
      { currentVersion: "1.0", supported: { minVer: undefined, maxVer: "1.1" }, expected: true },
      { currentVersion: "1.1", supported: { minVer: undefined, maxVer: "1.1" }, expected: true },
      { currentVersion: "1.2", supported: { minVer: undefined, maxVer: "1.1" }, expected: false }
    ].forEach((arg) => {
      const { currentVersion, supported, expected } = arg;
      let versions: string;
      if (supported instanceof Array) {
        versions = `[${supported.join()}]`;
      } else {
        versions = `[min ${supported.minVer ?? "<unspecified>"}, max ${supported.maxVer ??
          "<unspecified>"}]`;
      }
      it(`returns ${expected} for ${currentVersion} and supported versions ${versions}`, function() {
        const result = isVersionInSupportedRange(currentVersion, supported);
        assert.equal(result.isSupported, expected);
      });
    });
  });

  describe("lessThanOrEqual()", () => {
    const func1 = function(a: string, b: string): number {
      if (a === b) {
        return 0;
      }
      if (a.startsWith(b)) {
        return -1;
      } else if (b.startsWith(a)) {
        return 1;
      }

      return a < b ? -1 : 1;
    };

    [
      { a: "1.0", b: "1.1", compareFunc: undefined, expected: true },
      { a: "1.1", b: "1.0", compareFunc: undefined, expected: false },
      { a: "1.0", b: "1.0-beta.1", compareFunc: undefined, expected: true },
      { a: "1.0", b: "1.0-beta.1", compareFunc: func1, expected: false }
    ].forEach((arg) => {
      const { a, b, compareFunc, expected } = arg;
      it(`returns ${expected} for comparing '${a}' and '${b}'${
        compareFunc ? " custom func" : ""
      }`, () => {
        const result = lessThanOrEqual(a, b, compareFunc);
        assert.equal(result, expected);
      });
    });
  });
});
