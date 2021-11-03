// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { mapPartitionKeyToId } from "../../../src/impl/patitionKeyToIdMapper";

describe.only("mapPartitionKeyToId", () => {
  it("add", () => {
    assert.equal(mapPartitionKeyToId("alphabet", 11), 4);
  });
});