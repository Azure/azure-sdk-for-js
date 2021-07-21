// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import chai from "chai";
const should = chai.should();
import { TableCheckpointStore } from "../src";



/*test to show that test framework is set up well*/
describe("TableCheckpointStore", () => {
  it("is exported from the package", () => {
    should.exist(TableCheckpointStore, "Expected TableCheckpointStore to be exported.");
  });
});
