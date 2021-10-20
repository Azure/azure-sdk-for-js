// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MetadataScheduler } from "../../../src/metadataScheduler";
import { ModelsRepositoryClientMetadataOptions } from "../../../src/interfaces/modelsRepositoryClientMetadataOptions";
import { expect } from "chai";
import * as sinon from "sinon";

const hoursToMilliseconds = (hours: number): number => {
  return hours * 36e5;
};

describe("metadata scheduler", () => {
  beforeEach(() => sinon.restore());
  const scenarios: { [name: string]: ModelsRepositoryClientMetadataOptions } = {
    "disabled metadata": { enabled: false },
    "enabled, no expiration": { enabled: true },
    "enabled, 5 hour expiration": { enabled: true, expirationInHours: 5 },
    "enabled, 1 hour expiration": { enabled: true, expirationInHours: 1 },
    "enabled, instant expiration": { enabled: true, expirationInHours: 0 }
  };
  for (const scenarioName in scenarios) {
    describe(`metadata: ${scenarioName}`, () => {
      const scenario = scenarios[scenarioName];
      const scheduler = new MetadataScheduler(scenario);
      it("initializes correctly", () => {
        expect(scheduler.hasExpired()).to.equal(scenario.enabled);
      });
      it("resets correctly", () => {
        scheduler.reset();
        expect(scheduler.hasExpired()).to.equal(scenario.expirationInHours === 0 ? true : false);
      });
      it("expires correctly", () => {
        // determine correct time to wait
        const timeToWait = scenario.expirationInHours ?? Number.MAX_SAFE_INTEGER;
        // starting now
        const clock = sinon.useFakeTimers(Date.now());
        // wait `timeToWait` milliseconds and check if expired
        if (timeToWait > 0) {
          clock.tick(hoursToMilliseconds(timeToWait));
        }
        expect(scheduler.hasExpired()).to.equal(scenario.enabled);
        scheduler.reset();
        // should not be expired after a reset unless expiration is 0
        expect(scheduler.hasExpired()).to.equal(scenario.expirationInHours === 0 ? true : false);
        clock.restore();
      });
    });
  }
});
