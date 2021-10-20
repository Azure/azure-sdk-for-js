// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpFetcher } from "../../../src/fetcherHTTP";
import * as sinon from "sinon";
import { assert, expect } from "chai";
import { ModelsRepositoryClientMetadataOptions } from "../../../src/interfaces/modelsRepositoryClientMetadataOptions";
import { ModelsRepositoryClient } from "../../../src/modelsRepositoryClient";

const hoursToMilliseconds = (hours: number): number => {
  return hours * 36e5;
};

describe("metadata scheduler integration tests", () => {
  // test with no metadata (disabled)
  const dtmi = "dtmi:com:example:Thermostat;1";

  afterEach(function() {
    sinon.restore();
  });
  it("does not fetch metadata when disabled", async () => {
    const fetchSpy = sinon.spy(HttpFetcher.prototype, "fetch");
    const metadata: ModelsRepositoryClientMetadataOptions = {
      enabled: false
    };
    const client = new ModelsRepositoryClient({ metadata });
    await client.getModels(dtmi);
    expect(fetchSpy.neverCalledWith("metadata.json")).to.equal(true);
  });
  // test with enabled, no custom timeout (MAX)
  it("fetches metadata once (long timeout)", async () => {
    const fetchSpy = sinon.spy(HttpFetcher.prototype, "fetch");
    const clock = sinon.useFakeTimers(Date.now());
    const metadata: ModelsRepositoryClientMetadataOptions = {
      enabled: true
    };
    const client = new ModelsRepositoryClient({ metadata });
    await client.getModels(dtmi);
    assert(fetchSpy.firstCall.calledWith("metadata.json"), "failed to check metadata first");
    fetchSpy.resetHistory();
    clock.tick(hoursToMilliseconds(1));
    await client.getModels(dtmi);
    assert(fetchSpy.lastCall.notCalledWith("metadata.json"), "checked metadata too soon");
    clock.reset();
  });
  // test with enabled, 30 second timeout
  it("fetches metadata after short expiration", async () => {
    const fetchSpy = sinon.spy(HttpFetcher.prototype, "fetch");
    const metadata: ModelsRepositoryClientMetadataOptions = {
      expirationInHours: 1
    };
    const clock = sinon.useFakeTimers(Date.now());
    const client = new ModelsRepositoryClient({ metadata });
    await client.getModels(dtmi);
    assert(fetchSpy.firstCall.calledWith("metadata.json"), "failed to check metadata first");
    fetchSpy.resetHistory();
    clock.tick(hoursToMilliseconds(2));
    await client.getModels(dtmi);
    assert(fetchSpy.firstCall.calledWith("metadata.json"), "did not check metadata after expiry");
    clock.reset();
  });
});
