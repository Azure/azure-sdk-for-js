// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { PartitionGate } from "../../src/impl/partitionGate";
import chai from "chai";
const should = chai.should();

describe("PartitionGate", () => {
  it("add", () => {
    const gate = new PartitionGate();

    gate.add("all");

    // all supercedes everything else
    should.throw(() => gate.add("all"), /Partition already has a subscriber/);
    should.throw(() => gate.add("0"), /Partition already has a subscriber/);

    gate.remove("all");

    gate.add("0");
    gate.add("1"); // and it's okay to add non-conflicting partitions

    should.throw(() => gate.add("all"), /Partition already has a subscriber/);
    should.throw(() => gate.add("0"), /Partition already has a subscriber/);
  });

  it("invalid IDs get thrown out", () => {
    const gate = new PartitionGate();

    should.throw(() => gate.add("allo"), "Invalid partition number allo");
    should.throw(() => gate.add("woo"), "Invalid partition number woo");
  });
});
