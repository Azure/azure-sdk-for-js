// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { getInitialPosition } from "../src/partitionPump";
import { EventPosition } from "../src/eventPosition";

describe("PartitionPump", () => {
  it("getInitialPosition", () => {
    // if they explicitly passed in an EventPosition then it trumps any user specified option
    getInitialPosition(EventPosition.earliest(), undefined).offset!.should.equal(-1);
    getInitialPosition(EventPosition.latest(), undefined).offset!.should.equal("@latest");

    // if no initial position was given when we started then we'll allow the user to override....
    getInitialPosition(undefined, EventPosition.fromOffset(100)).offset!.should.equal(100);

    // ...and if they don't override then we give them the default (currently it's EventPosition.earliest())
    getInitialPosition(undefined, undefined).offset!.should.equal(-1);
  });
});
