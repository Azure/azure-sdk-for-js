// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { NoOpInstrumenter } from "../src/instrumenter";
import { getInstrumenter, useInstrumenter } from "../src/useInstrumenter";

describe("useInstrumenter", () => {
  it("allows setting and getting a global instrumenter", () => {
    const instrumenter = getInstrumenter();
    assert.exists(instrumenter);
    assert.isTrue(instrumenter instanceof NoOpInstrumenter);

    const newInstrumenter = new NoOpInstrumenter();
    useInstrumenter(newInstrumenter);
    assert.strictEqual(getInstrumenter(), newInstrumenter);
  });
});
