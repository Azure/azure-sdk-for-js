// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";

describe("snippets", () => {
  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
