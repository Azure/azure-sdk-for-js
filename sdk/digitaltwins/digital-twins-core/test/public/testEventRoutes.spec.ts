// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DigitalTwinsClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import { Recorder } from "@azure-tools/test-recorder";
import chai from "chai";

const assert = chai.assert;
const should = chai.should();

describe("DigitalTwins EventRoutes - create, read, list and delete operations", () => {
  let client: DigitalTwinsClient;
  let recorder: Recorder;

  beforeEach(async function(this: Mocha.Context) {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("create event route no endpoint", async function() {
    const eventRouteId = recorder.getUniqueName("eventRoute", "create-event-route");
    const eventFilter =
      "$eventType = 'DigitalTwinTelemetryMessages' or $eventType = 'DigitalTwinLifecycleNotification'";
    const endpointId = recorder.getUniqueName("endpoint", "list-event-routes-enpoint");

    let errorWasThrown = false;
    try {
      await client.upsertEventRoute(eventRouteId, endpointId, eventFilter);
    } catch (error) {
      errorWasThrown = true;
      assert.include(error.message, `The endpoint provided does not exist or is not active`);
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("get event route not exisiting", async function() {
    const eventRouteId = recorder.getUniqueName("eventRoute", "get-event-route-not-existing");

    let errorWasThrown = false;
    try {
      await client.getEventRoute(eventRouteId);
    } catch (error) {
      errorWasThrown = true;
      assert.include(error.message, `There is no route available that matches the provided input`);
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("list event routes", async function() {
    const eventRoutes = client.listEventRoutes();
    for await (const item of eventRoutes) {
      assert.isNotNull(item);
    }
  });

  it("delete event route not exisiting", async function() {
    const eventRouteId = recorder.getUniqueName("eventRoute", "delete-event-routes-not-existing");

    let errorWasThrown = false;
    try {
      await client.deleteEventRoute(eventRouteId);
    } catch (error) {
      errorWasThrown = true;
      assert.include(error.message, `There is no route available that matches the provided input`);
    }
    should.equal(errorWasThrown, true, "Error was not thrown");
  });
});
