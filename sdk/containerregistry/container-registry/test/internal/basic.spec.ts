// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Chai is the Azure SDK Team's preferred assertion library, and it is included
// as part of our template project.
import { assert } from "chai";

// Unit tests SHOULD appear inside of a `describe` block.  The hierarchical
// oranization of tests within `describe` blocks will be reflected in our
// pipeline analytics and metrics.
describe("basic internal unit tests", async function() {
  // `it` declares a unit test. The test passes if it does not throw an `Error`
  it("basic assertion", () => {
    assert.equal(1, 1);
  });
});
