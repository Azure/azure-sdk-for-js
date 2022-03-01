import { Context } from "mocha";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";

describe("Sample test", () => {
  let recorder: Recorder;

  beforeEach(function (this: Context) {
    recorder = new Recorder(this.currentTest);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("sample test", async function () {
    assert.equal(1, 1);
  });
});
