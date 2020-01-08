// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { GreedyPartitionLoadBalancer } from "../src/partitionLoadBalancer";
import { PartitionOwnership } from "../src/eventProcessor";

describe("PartitionLoadBalancer", () => {
  describe("GreedyPartitionLoadBalancer", () => {
    it("all", () => {
      const m = new Map<string, PartitionOwnership>();
      const lb = new GreedyPartitionLoadBalancer();

      lb.loadBalance("ownerId", m, ["1", "2", "3"]).should.deep.eq(["1", "2", "3"]);
      m.should.be.empty;
    });

    it("filtered", () => {
      const m = new Map<string, PartitionOwnership>();
      const lb = new GreedyPartitionLoadBalancer(["2"]);

      lb.loadBalance("ownerId", m, ["1", "2", "3"]).should.deep.eq(["2"]);
      m.should.be.empty;
    });

    it("claim partitions we already own", () => {
      const m = new Map<string, PartitionOwnership>();

      m.set("1", {
        consumerGroup: "",
        fullyQualifiedNamespace: "",
        eventHubName: "",
        // we already own this so we won't
        // try to reclaim it.
        ownerId: "ownerId",
        partitionId: ""
      });

      m.set("2", {
        consumerGroup: "",
        fullyQualifiedNamespace: "",
        eventHubName: "",
        // owned by someone else - we'll steal this
        // partition
        ownerId: "someOtherOwnerId",
        partitionId: ""
      });

      const lb = new GreedyPartitionLoadBalancer(["1", "2", "3"]);

      lb.loadBalance("ownerId", m, ["1", "2", "3"]).should.deep.eq(["1", "2", "3"]);
    });
  });
});
