// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { validateOffer } from "../../../dist-esm/utils/offers";
import { ContainerRequest } from "../../../dist-esm";

describe("Offer utils", function() {
  describe("validateOffer", function() {
    it("fails with maxThroughput and throughput specified", function() {
      const body: ContainerRequest = {
        throughput: 400,
        autoUpgradePolicy: {
          throughputPolicy: {
            incrementPercent: 15
          }
        }
      };
      assert.throws(() => validateOffer(body));
    });
    it("fails with throughput and autoUpgradePolicy specified", function() {
      const body: ContainerRequest = {
        throughput: 400,
        autoUpgradePolicy: {
          throughputPolicy: {
            incrementPercent: 15
          }
        }
      };
      assert.throws(() => validateOffer(body));
    });
    it("passes with autoscale params", function() {
      const body: ContainerRequest = {
        maxThroughput: 50000,
        autoUpgradePolicy: {
          throughputPolicy: {
            incrementPercent: 50
          }
        }
      };
      assert.equal(validateOffer(body), undefined);
    });
    it("passes with throughput", function() {
      const body: ContainerRequest = {
        throughput: 400
      };
      assert.equal(validateOffer(body), undefined);
    });
  });
});
