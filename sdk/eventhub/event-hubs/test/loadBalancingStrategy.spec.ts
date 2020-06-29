// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PartitionOwnership } from "../src/eventProcessor";
import { BalancedLoadBalancingStrategy } from "../src/loadBalancerStrategies/balancedStrategy";
import { GreedyLoadBalancingStrategy } from "../src/loadBalancerStrategies/greedyStrategy";
import { UnbalancedLoadBalancingStrategy } from "../src/loadBalancerStrategies/unbalancedStrategy";

describe("LoadBalancingStrategy", () => {
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

  describe("UnbalancedLoadBalancingStrategy", () => {
    it("all", () => {
      const m = new Map<string, PartitionOwnership>();
      const lb = new UnbalancedLoadBalancingStrategy();

      lb.getPartitionsToCliam("ownerId", m, ["1", "2", "3"]).should.deep.eq(["1", "2", "3"]);
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

      const lb = new UnbalancedLoadBalancingStrategy();

      lb.getPartitionsToCliam("ownerId", m, ["1", "2", "3"]).should.deep.eq(["1", "2", "3"]);
    });
  });

  describe("BalancedLoadBalancingStrategy", () => {
    const lb = new BalancedLoadBalancingStrategy(1000 * 60);

    it("odd number of partitions per processor", () => {
      const allPartitions = ["0", "1", "2"];

      // at this point 'a' has it's fair share of partitions (there are 3 total)
      // and it's okay to have 1 extra.
      let partitionsToOwn = lb.getPartitionsToCliam(
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
        [],
        "we've gotten our fair share, shouldn't claim anything new"
      );

      // now the other side of this is when we're fighting for the ownership of an
      // extra partition
      partitionsToOwn = lb.getPartitionsToCliam(
        "a",
        createOwnershipMap({
          "1": "b",
          "2": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(
        ["0"],
        "we had our minimum fair share (1) but there's still one extra (uneven number of partitions per processor) and we should snag it"
      );
    });

    it("even number of partitions per processor", () => {
      const allPartitions = ["0", "1", "2", "3"];

      // at this point 'a' has it's fair share of partitions (there are 4 total)
      // so it'll stop claiming additional partitions.
      let partitionsToOwn = lb.getPartitionsToCliam(
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
        [],
        "we've gotten our fair share, shouldn't claim anything new"
      );

      partitionsToOwn = lb.getPartitionsToCliam(
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
      partitionsToOwn.should.be.deep.equal([], "load is balanced, won't grab any more.");
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
      let partitionsToOwn = lb.getPartitionsToCliam(
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
      partitionsToOwn = lb.getPartitionsToCliam(
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

      const lb = new BalancedLoadBalancingStrategy(1000 * 60);

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

      const requestedPartitions = lb.getPartitionsToCliam("c", initialOwnershipMap, partitions);
      requestedPartitions.sort();

      requestedPartitions.should.deep.equal(
        [],
        "c will not steal one partition since it sees that, eventually, 'a' will lose its partitions and become a +1 processor on it's own"
      );
    });

    it("avoid thrash", () => {
      // this is a case where we shouldn't steal - we have
      // the minimum number of partitions and stealing at this
      // point will just keep thrashing both processors.
      const partitionsToOwn = lb.getPartitionsToCliam(
        "b",
        createOwnershipMap({
          "0": "a",
          "1": "b",
          "2": "a"
        }),
        ["0", "1", "2"]
      );

      partitionsToOwn.sort();
      partitionsToOwn.should.deep.equal([], "should not re-steal when things are balanced");
    });

    it("general cases", () => {
      const allPartitions = ["0", "1", "2", "3"];

      // in the presence of no owners we claim a random partition
      let partitionsToOwn = lb.getPartitionsToCliam("a", createOwnershipMap({}), allPartitions);
      partitionsToOwn.length.should.be.equal(1, "nothing is owned, claim one");

      // if there are other owners we should claim up to #partitions/#owners
      partitionsToOwn = lb.getPartitionsToCliam(
        "a",
        createOwnershipMap({
          "1": "b",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.length.should.be.equal(1, "1 and 1 with another owner, should claim one");
      // better not try to claim 'b's partition when there are unowned partitions
      partitionsToOwn.filter((p) => p === "1").length.should.equal(0);

      // 'b' should claim the last unowned partition
      partitionsToOwn = lb.getPartitionsToCliam(
        "b",
        createOwnershipMap({
          "1": "b",
          "2": "a",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(["0"], "b grabbed the last available partition");

      // we're balanced - processors now only grab the partitions that they own
      partitionsToOwn = lb.getPartitionsToCliam(
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
      partitionsToOwn.should.be.deep.equal([], "balanced: b should not grab anymore partitions");
    });

    it("honors the partitionOwnershipExpirationIntervalInMs", () => {
      const intervalInMs = 1000;
      const lb = new BalancedLoadBalancingStrategy(intervalInMs);
      const allPartitions = ["0", "1"];
      const ownershipMap = createOwnershipMap({
        "0": "b",
        "1": "a"
      });

      // At this point, 'a' has its fair share of partitions, and none should be returned.
      let partitionsToOwn = lb.getPartitionsToCliam("a", ownershipMap, allPartitions);
      partitionsToOwn.length.should.equal(0, "Expected to not claim any new partitions.");

      // Change the ownership of partition "0" so it is older than the interval.
      const ownership = ownershipMap.get("0")!;
      ownership.lastModifiedTimeInMs = Date.now() - (intervalInMs + 1); // Add 1 to the interval to ensure it has just expired.

      partitionsToOwn = lb.getPartitionsToCliam("a", ownershipMap, allPartitions);
      partitionsToOwn.should.deep.equal(["0"]);
    });
  });

  describe("GreedyLoadBalancingStrategy", () => {
    const lb = new GreedyLoadBalancingStrategy(1000 * 60);

    it("odd number of partitions per processor", () => {
      const allPartitions = ["0", "1", "2"];

      // at this point 'a' has it's fair share of partitions (there are 3 total)
      // and it's okay to have 1 extra.
      let partitionsToOwn = lb.getPartitionsToCliam(
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
        [],
        "we've gotten our fair share, shouldn't claim anything new"
      );

      // now the other side of this is when we're fighting for the ownership of an
      // extra partition
      partitionsToOwn = lb.getPartitionsToCliam(
        "a",
        createOwnershipMap({
          "1": "b",
          "2": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(
        ["0"],
        "we had our minimum fair share (1) but there's still one extra (uneven number of partitions per processor) and we should snag it"
      );
    });

    it("even number of partitions per processor", () => {
      const allPartitions = ["0", "1", "2", "3"];

      // at this point 'a' has it's fair share of partitions (there are 4 total)
      // so it'll stop claiming additional partitions.
      let partitionsToOwn = lb.getPartitionsToCliam(
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
        [],
        "we've gotten our fair share, shouldn't claim anything new"
      );

      partitionsToOwn = lb.getPartitionsToCliam(
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
      partitionsToOwn.should.be.deep.equal([], "load is balanced, won't grab any more.");
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
      let partitionsToOwn = lb.getPartitionsToCliam(
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
      partitionsToOwn = lb.getPartitionsToCliam(
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
        2,
        "stealing with an even number of partitions per processor"
      );
    });

    it("claims unowned then steals", () => {
      const allPartitions = [];
      for (let i = 0; i < 8; i++) {
        allPartitions.push(`${i}`);
      }

      let partitionsToOwn = lb.getPartitionsToCliam(
        "a",
        createOwnershipMap({
          "0": "",
          // skip 1, 2
          "3": "b",
          "4": "b",
          "5": "b",
          "6": "b",
          "7": "b"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      // "a" should have 4 partitions in order to be balanced.
      // Partitions "0", "1", "2" should be chosen before any are stolen.
      partitionsToOwn.length.should.equal(4, "should have claimed half of the partitions.");
      partitionsToOwn
        .slice(0, 3)
        .should.deep.equal(["0", "1", "2"], "should have claimed unclaimed partitions first.");
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

      const lb = new BalancedLoadBalancingStrategy(1000 * 60);

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

      const requestedPartitions = lb.getPartitionsToCliam("c", initialOwnershipMap, partitions);
      requestedPartitions.sort();

      requestedPartitions.should.deep.equal(
        [],
        "c will not steal one partition since it sees that, eventually, 'a' will lose its partitions and become a +1 processor on it's own"
      );
    });

    it("avoid thrash", () => {
      // this is a case where we shouldn't steal - we have
      // the minimum number of partitions and stealing at this
      // point will just keep thrashing both processors.
      const partitionsToOwn = lb.getPartitionsToCliam(
        "b",
        createOwnershipMap({
          "0": "a",
          "1": "b",
          "2": "a"
        }),
        ["0", "1", "2"]
      );

      partitionsToOwn.sort();
      partitionsToOwn.should.deep.equal([], "should not re-steal when things are balanced");
    });

    it("general cases", () => {
      const allPartitions = ["0", "1", "2", "3"];

      // in the presence of no owners we claim a random partition
      let partitionsToOwn = lb.getPartitionsToCliam("a", createOwnershipMap({}), allPartitions);
      partitionsToOwn.length.should.be.equal(4, "nothing is owned, claim all");

      // if there are other owners we should claim up to #partitions/#owners
      partitionsToOwn = lb.getPartitionsToCliam(
        "a",
        createOwnershipMap({
          "1": "b",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.length.should.be.equal(1, "1 and 1 with another owner, should claim one");
      // better not try to claim 'b's partition when there are unowned partitions
      partitionsToOwn.filter((p) => p === "1").length.should.equal(0);

      // 'b' should claim the last unowned partition
      partitionsToOwn = lb.getPartitionsToCliam(
        "b",
        createOwnershipMap({
          "1": "b",
          "2": "a",
          "3": "a"
        }),
        allPartitions
      );
      partitionsToOwn.sort();
      partitionsToOwn.should.be.deep.equal(["0"], "b grabbed the last available partition");

      // we're balanced - processors now only grab the partitions that they own
      partitionsToOwn = lb.getPartitionsToCliam(
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
      partitionsToOwn.should.be.deep.equal([], "balanced: b should not grab anymore partitions");
    });

    it("honors the partitionOwnershipExpirationIntervalInMs", () => {
      const intervalInMs = 1000;
      const lb = new GreedyLoadBalancingStrategy(intervalInMs);
      const allPartitions = ["0", "1", "2", "3"];
      const ownershipMap = createOwnershipMap({
        "0": "b",
        "1": "a"
      });

      // At this point, "a" should only grab 1 partition since both "a" and "b" should end up with 2 partitions each.
      let partitionsToOwn = lb.getPartitionsToCliam("a", ownershipMap, allPartitions);
      partitionsToOwn.length.should.equal(1, "Expected to claim 1 new partitions.");

      // Change the ownership of partition "0" so it is older than the interval.
      const ownership = ownershipMap.get("0")!;
      ownership.lastModifiedTimeInMs = Date.now() - (intervalInMs + 1); // Add 1 to the interval to ensure it has just expired.

      // At this point, "a" should grab partitions 0, 2, and 3.
      // This is because "b" only owned 1 partition and that claim is expired,
      // so "a" as treated as if it is the only owner.
      partitionsToOwn = lb.getPartitionsToCliam("a", ownershipMap, allPartitions);
      partitionsToOwn.sort();
      partitionsToOwn.should.deep.equal(["0", "2", "3"]);
    });
  });
});
