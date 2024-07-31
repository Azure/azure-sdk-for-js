// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PartitionGate } from "../../../src/impl/partitionGate.js";
import { should } from "../../utils/chai.js";
import { describe, it } from "vitest";

describe("PartitionGate", function () {
  it("add", async function () {
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
});
