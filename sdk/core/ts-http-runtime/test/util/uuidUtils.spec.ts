// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { randomUUID } from "../../src/util/uuidUtils";

describe("randomUUID", function () {
  it("should be a valid v4 UUID", function () {
    const actual = randomUUID();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assert.match(actual, uuidRegex, "Not a valid v4 UUID");
  });
});
