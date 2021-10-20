// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MetadataScheduler } from "../../../src/metadataScheduler";
import { ModelsRepositoryClientMetadataOptions } from "../../../src/interfaces/modelsRepositoryClientMetadataOptions";
import { expect } from "chai";
import * as sinon from "sinon";

const minutesToMilliseconds = (minutes: number): number => {
  return minutes * 1000 * 60;
};

describe("metadata scheduler", () => {
  beforeEach(() => sinon.restore());
  const scenarios: { [name: string]: ModelsRepositoryClientMetadataOptions } = {
    "disabled metadata": { enabled: false },
    "enabled, no expiration": { enabled: true },
    "enabled, 5 minute expiration": { enabled: true, expirationInMs: minutesToMilliseconds(5) },
    "enabled, 1 minute expiration": { enabled: true, expirationInMs: minutesToMilliseconds(1) },
    "enabled, 0 millisecond expiration": { enabled: true, expirationInMs: 0 }
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
        expect(scheduler.hasExpired()).to.equal(scenario.expirationInMs === 0 ? true : false);
      });
      it("expires correctly", () => {
        // determine correct time to wait
        const timeToWait = scenario.expirationInMs ?? Number.MAX_SAFE_INTEGER;
        // starting now
        const now = new Date();
        const clock = sinon.useFakeTimers(now);
        // wait `timeToWait` milliseconds and check if expired
        if (timeToWait > 0) {
          clock.tick(timeToWait);
        }
        expect(scheduler.hasExpired()).to.equal(scenario.enabled);
        scheduler.reset();
        // should not be expired after a reset unless expiration is 0
        expect(scheduler.hasExpired()).to.equal(scenario.expirationInMs === 0 ? true : false);
        clock.restore();
      });
    });
  }
});
