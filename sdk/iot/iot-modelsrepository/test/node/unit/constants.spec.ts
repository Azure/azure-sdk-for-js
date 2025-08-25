// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as cnst from "$internal/utils/constants.js";
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

describe("constants", () => {
  it("uses same version as package.json", () => {
    const pkgjson = readFileSync("./package.json", "utf-8");
    const pkgjsonVersion = JSON.parse(pkgjson).version;
    expect(cnst.SDK_VERSION).to.equal(pkgjsonVersion);
  });
});
