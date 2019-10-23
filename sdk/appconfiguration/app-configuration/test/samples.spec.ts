// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { runAll } from "../samples";
import { getConnectionStringFromEnvironment } from "./testHelpers";

describe("AppConfiguration samples", () => {
  before(function() {
    getConnectionStringFromEnvironment() || this.skip();
  });

  it("Make sure all the samples build and run", async () => {
    await runAll();
  });
});
