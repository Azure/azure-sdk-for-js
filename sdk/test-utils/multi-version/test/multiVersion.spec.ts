// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-use-before-define */
import { assert } from "chai";
import { isVersionInSupportedRange } from "../src/multiVersion";

describe("Multi-service-version test support", () => {
  describe("isVersionInSupportedRange() ", () => {
    [
      { currentVersion: "1.0", supported: ["1.0", "1.1"], expected: true },
      { currentVersion: "1.2", supported: ["1.0", "1.1"], expected: false }
    ].forEach((arg) => {
      const { currentVersion, supported, expected } = arg;
      it(`returns ${expected} for ${currentVersion} and supported versions [${supported.join()}]`, function() {
        const result = isVersionInSupportedRange(currentVersion, supported);
        assert.equal(result.isSupported, expected);
      });
    });
  });
});
