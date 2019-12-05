// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { getStartingPosition } from "../src/partitionPump";
import { EventPosition } from "../src/eventPosition";

describe("PartitionPump", () => {
  it("getStartingPosition", () => {
    // if they explicitly passed in an EventPosition then it trumps any user specified option
    getStartingPosition(EventPosition.earliest(), undefined).offset!.should.equal(-1);
    getStartingPosition(EventPosition.latest(), undefined).offset!.should.equal("@latest");

    // if no initial position was given when we started then we'll allow the user to override....
    getStartingPosition(undefined, EventPosition.fromOffset(100)).offset!.should.equal(100);

    // ...and if they don't override then we give them the default (currently it's EventPosition.earliest())
    getStartingPosition(undefined, undefined).offset!.should.equal(-1);
  });
});
