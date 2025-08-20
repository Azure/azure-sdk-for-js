// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { validateOffer } from "$internal/utils/offers.js";
import type { ContainerRequest } from "@azure/cosmos";
import { describe, it, assert } from "vitest";

describe("Offer utils", () => {
  describe("validateOffer", () => {
    it("fails with maxThroughput and throughput specified", () => {
      const body: ContainerRequest = {
        throughput: 400,
        autoUpgradePolicy: {
          throughputPolicy: {
            incrementPercent: 15,
          },
        },
      };
      assert.throws(() => validateOffer(body));
    });

    it("fails with throughput and autoUpgradePolicy specified", () => {
      const body: ContainerRequest = {
        throughput: 400,
        autoUpgradePolicy: {
          throughputPolicy: {
            incrementPercent: 15,
          },
        },
      };
      assert.throws(() => validateOffer(body));
    });

    it("passes with autoscale params", () => {
      const body: ContainerRequest = {
        maxThroughput: 50000,
        autoUpgradePolicy: {
          throughputPolicy: {
            incrementPercent: 50,
          },
        },
      };
      assert.equal(validateOffer(body), undefined);
    });

    it("passes with throughput", () => {
      const body: ContainerRequest = {
        throughput: 400,
      };
      assert.equal(validateOffer(body), undefined);
    });
  });
});
