// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  GreedyPartitionLoadBalancer,
  FairPartitionLoadBalancer
} from "../src/partitionLoadBalancer";
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

  describe("FairPartitionLoadBalancer", () => {
    const lb = new FairPartitionLoadBalancer(1000 * 60);

    it("odd number of partitions per processor", () => {
      const allPartitions = ["0", "1", "2"];

      // at this point 'a' has it's fair share of partitions (there are 3 total)
      // and it's okay to have 1 extra.
      let partitionsToOwn = lb.loadBalance(
        "a",
        createOwnershipMap({
          "1": "b",
          "2": "a",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(
        ["2", "3"],
        "we've gotten our fair share, shouldn't claim anything new"
      );

      // now the other side of this is when we're fighting for the ownership of an
      // extra partition
      partitionsToOwn = lb.loadBalance(
        "a",
        createOwnershipMap({
          "1": "b",
          "2": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(
        ["0", "2"],
        "we had our minimum fair share (1) but there's still one extra (uneven number of partitions per processor) and we should snag it"
      );
    });

    it("even number of partitions per processor", () => {
      const allPartitions = ["0", "1", "2", "3"];

      // at this point 'a' has it's fair share of partitions (there are 4 total)
      // so it'll stop claiming additional partitions.
      let partitionsToOwn = lb.loadBalance(
        "a",
        createOwnershipMap({
          "1": "b",
          "2": "a",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(
        ["2", "3"],
        "we've gotten our fair share, shouldn't claim anything new"
      );

      partitionsToOwn = lb.loadBalance(
        "a",
        createOwnershipMap({
          "0": "b",
          "1": "b",
          "2": "a",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(["2", "3"], "load is balanced, won't grab any more.");
    });

    // when there are no freely available partitions (partitions that have either expired or are literally unowned)
    // we'll need to steal from an existing processor.
    // This can happen in a few ways:
    // 1. we were simply racing against other processors
    // 2. we're coming in later after all partitions have been allocated (ie, scaling out)
    // 3. timing issues, death of a processor, etc...
    it("stealing", () => {
      // something like this could happen if 'a' were just the only processor
      // and now we're spinning up 'b'
      let partitionsToOwn = lb.loadBalance(
        "b",
        createOwnershipMap({
          "0": "a",
          "1": "a",
          "2": "a"
        }),
        ["0", "1", "2"]
      );
      partitionsToOwn.sort();
      // we'll attempt to steal a partition from 'a'.
      partitionsToOwn.length.should.equal(
        1,
        "stealing with an odd number of partitions per processor"
      );

      // and now the same case as above, but with an even number of partitions per processor.
      partitionsToOwn = lb.loadBalance(
        "b",
        createOwnershipMap({
          "0": "a",
          "1": "a",
          "2": "a",
          "3": "a"
        }),
        ["0", "1", "2", "3"]
      );
      partitionsToOwn.sort();
      // we'll attempt to steal a partition from 'a'.
      partitionsToOwn.length.should.equal(
        1,
        "stealing with an even number of partitions per processor"
      );
    });

    it("general cases", () => {
      const allPartitions = ["0", "1", "2", "3"];

      // in the presence of no owners we claim a random partition
      let partitionsToOwn = lb.loadBalance("a", createOwnershipMap({}), allPartitions);
      partitionsToOwn.length.should.be.equal(1, "nothing is owned, claim one");

      // if there are other owners we should claim up to #partitions/#owners
      partitionsToOwn = lb.loadBalance(
        "a",
        createOwnershipMap({
          "1": "b",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.length.should.be.equal(2, "1 and 1 with another owner, should claim one");
      // better not try to claim 'b's partition when there are unowned partitions
      partitionsToOwn.filter((p) => p === "1").length.should.equal(0);

      // 'b' should claim the last unowned partition
      partitionsToOwn = lb.loadBalance(
        "b",
        createOwnershipMap({
          "1": "b",
          "2": "a",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(["0", "1"], "b grabbed the last available partition");

      // we're at equilibrium - processors now only grab the partitions that they own
      partitionsToOwn = lb.loadBalance(
        "b",
        createOwnershipMap({
          "0": "b",
          "1": "a",
          "2": "b",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(
        ["0", "2"],
        "equilibrium: b only grabbed it's already owned partitions"
      );
    });

    function createOwnershipMap(
      partitionToOwner: Record<string, string>
    ): Map<string, PartitionOwnership> {
      const ownershipMap = new Map<string, PartitionOwnership>();

      for (const partitionId in partitionToOwner) {
        ownershipMap.set(partitionId, {
          consumerGroup: "$Default",
          eventHubName: "eventhubname1",
          fullyQualifiedNamespace: "fqdn",
          ownerId: partitionToOwner[partitionId],
          partitionId: partitionId,
          etag: "etag",
          lastModifiedTimeInMs: Date.now()
        });
      }

      return ownershipMap;
    }
  });
});
