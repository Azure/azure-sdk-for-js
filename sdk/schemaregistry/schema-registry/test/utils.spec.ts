// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { parseLocationHeader } from "../src/utils";

describe("parseGroupAndName", function() {
  it("parses location header", function() {
    const group = "group-1";
    const name = "azsdk_js_test";
    const url = `https://dummy1.servicebus.windows.net:443/$schemagroups/${group}/schemas/${name}/versions/1?api-version=2020-09-01-preview`;
    const schemaInfo = parseLocationHeader(url);
    assert.equal(schemaInfo.group, group);
    assert.equal(schemaInfo.name, name);
  });
});
