// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { getStartPosition } from "../src/partitionPump";
import { EventPosition } from "../src/eventPosition";

describe("PartitionPump", () => {
  it("getStartPosition", () => {
    // if they explicitly passed in an EventPosition then it trumps any user specified option
    getStartPosition(EventPosition.earliest(), undefined).offset!.should.equal(-1);
    getStartPosition(EventPosition.latest(), undefined).offset!.should.equal("@latest");

    // if no initial position was given when we started then we'll allow the user to override....
    getStartPosition(undefined, EventPosition.fromOffset(100)).offset!.should.equal(100);

    // ...and if they don't override then we give them the default (currently it's EventPosition.earliest())
    getStartPosition(undefined, undefined).offset!.should.equal(-1);
  });
});
