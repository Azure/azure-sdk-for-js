// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { runAll } from "../samples";
import { createAppConfigurationClientForTests } from "./testHelpers";

describe("AppConfiguration samples", () => {
  before(function() {
    createAppConfigurationClientForTests() || this.skip();
  });

  it("Make sure all the samples build and run", async () => {
    await runAll();
  });
});
