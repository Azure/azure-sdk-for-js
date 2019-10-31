// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { GreedyPartitionLoadBalancer } from "../src/partitionLoadBalancer";
import { PartitionOwnership } from '../src/eventProcessor';

describe("PartitionLoadBalancer", () => {
  describe("GreedyPartitionLoadBalancer", () => {
    it("all", () => {
      const m = new Map<string, PartitionOwnership>();
      const lb = new GreedyPartitionLoadBalancer();

      lb.loadBalance(m, ["1", "2", "3"]).should.deep.eq(["1", "2", "3"]);
      m.should.be.empty;
    });

    it("filtered", () => {
      const m = new Map<string, PartitionOwnership>();
      const lb = new GreedyPartitionLoadBalancer(["2"]);

      lb.loadBalance(m, ["1", "2", "3"]).should.deep.eq(["2"]);
      m.should.be.empty;
    });    
  });
});