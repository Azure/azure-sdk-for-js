// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import assert from "assert";
import { validateOffer } from "../../../src/utils/offers";
import { ContainerRequest } from "../../../src/client/Container/ContainerRequest";

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
      assert.throws(validateOffer(body));
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
      assert.throws(validateOffer(body));
    });
    it("passes with autopilot params", function() {
      const body: ContainerRequest = {
        maxThroughput: 400,
        autoUpgradePolicy: {
          throughputPolicy: {
            incrementPercent: 15
          }
        }
      };
      assert.ok(validateOffer(body));
    });
    it("passes with throughput", function() {
      const body: ContainerRequest = {
        throughput: 400
      };
      assert.ok(validateOffer(body));
    });
  });
});
