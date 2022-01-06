// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as cnst from "../../../src/utils/constants";
import { readFileSync } from "fs";
import { expect } from "chai";
describe("constants", function () {
  it("uses same version as package.json", function () {
    const pkgjson = readFileSync("./package.json", "utf-8");
    const pkgjsonVersion = JSON.parse(pkgjson).version;
    expect(cnst.SDK_VERSION).to.equal(pkgjsonVersion);
  });
});
