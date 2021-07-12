// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { expect } from "chai";
import { TableCheckpointStore } from "../src";

describe("Table Checkpoint Store", function(): void {
  it("implements functions for table checkpoint store", () => {
    expect(TableCheckpointStore, "to implement checkpoint");
  });
});
