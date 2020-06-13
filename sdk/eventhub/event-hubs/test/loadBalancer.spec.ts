// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FairPartitionLoadBalancer,
  GreedyPartitionLoadBalancer
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

    it("don't steal when you can just wait", () => {
      // @chradek's case: let's say we have this partition layout:
      // AAAABBBCCD
      //
      // Before, we'd let 'C' steal from 'A' - we see that we don't have enough
      // +1 processors(exact match) and so 'C' attempts to become one. This can
      // lead to some unnecessary thrash as 'A' loses partitions to a processor
      // that has technically already met it's quota.
      //
      // Instead, we treat 'A' is a +1-ish specifically for when we ('C')
      // are checking if we want to grab more partitions.
      //
      // This allows 'A' to just naturally decline as _actual_ processors grab
      // their minimum required partitions rather than forcing it and possibly
      // having a partition have to juggle between partitions as they try to
      // meet the minimum.
      const partitions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

      const lb = new FairPartitionLoadBalancer(1000 * 60);

      // we'll do 4 consumers
      const initialOwnershipMap = createOwnershipMap({
        "0": "a",
        "1": "a",
        "2": "a",
        "3": "a",

        "4": "b",
        "5": "b",
        "6": "b",

        "7": "c",
        "8": "c",

        "9": "d"
      });

      const requestedPartitions = lb.loadBalance("c", initialOwnershipMap, partitions);
      requestedPartitions.sort();

      requestedPartitions.should.deep.equal(
        ["7", "8"],
        "c will not steal one partition since it sees that, eventually, 'a' will lose its partitions and become a +1 processor on it's own"
      );
    });

    it("avoid thrash", () => {
      // this is a case where we shouldn't steal - we have
      // the minimum number of partitions and stealing at this
      // point will just keep thrashing both processors.
      const partitionsToOwn = lb.loadBalance(
        "b",
        createOwnershipMap({
          "0": "a",
          "1": "b",
          "2": "a"
        }),
        ["0", "1", "2"]
      );

      partitionsToOwn.sort();
      partitionsToOwn.should.deep.equal(["1"], "should not re-steal when things are balanced");
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

      // we're balanced - processors now only grab the partitions that they own
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
        "balanced: b only grabbed it's already owned partitions"
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
