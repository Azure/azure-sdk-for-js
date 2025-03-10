// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { setLogLevel } from "@azure/logger";

describe("snippets", () => {
  it("SetLogLevel", () => {
    setLogLevel("info");
  });
});
