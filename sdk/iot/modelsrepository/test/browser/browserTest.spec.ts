// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as lib from "../../src";

import { assert } from "chai";
import * as sinon from "sinon";

describe("resolver -  browser", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("single resolution (no pseudo-parsing)", () => {
    it.only("integration works in browser", function(done) {
      const dtmi: string = "dtmi:azure:DeviceManagement:DeviceInformation;1";
      const endpoint = "https://devicemodels.azure.com";
      const fakeData = JSON.stringify({
        fakeDtdl: "fakeBodyAsText"
      });
      const resolveResult = lib.resolve(dtmi, endpoint);
      resolveResult
        .then((actualOutput: any) => {
          assert.deepStrictEqual({ [dtmi]: JSON.parse(fakeData) }, actualOutput);
          done();
        })
        .catch((err: any) => done(err));
    });
  });
});
