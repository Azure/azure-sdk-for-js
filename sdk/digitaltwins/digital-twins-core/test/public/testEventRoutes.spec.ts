// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DigitalTwinsClient } from "@azure/digital-twins-core";
import { authenticate } from "../utils/testAuthentication.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("DigitalTwins EventRoutes - create, read, list and delete operations", () => {
  let client: DigitalTwinsClient;
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    const authentication = await authenticate(ctx);
    client = authentication.client;
    recorder = authentication.recorder;
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("create event route no endpoint", async () => {
    const eventRouteId = recorder.variable(
      "eventRoute",
      `eventRoute${Math.floor(Math.random() * 1000)}`,
    );
    const eventFilter =
      "$eventType = 'DigitalTwinTelemetryMessages' or $eventType = 'DigitalTwinLifecycleNotification'";
    const endpointId = recorder.variable("endpoint", `endpoint${Math.floor(Math.random() * 1000)}`);

    let errorWasThrown = false;
    try {
      await client.upsertEventRoute(eventRouteId, endpointId, eventFilter);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `The endpoint provided does not exist or is not active`);
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("get event route not existing", async () => {
    const eventRouteId = recorder.variable(
      "eventRoute",
      `eventRoute${Math.floor(Math.random() * 1000)}`,
    );

    let errorWasThrown = false;
    try {
      await client.getEventRoute(eventRouteId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no route available that matches the provided input`);
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });

  it("list event routes", async () => {
    const eventRoutes = client.listEventRoutes();
    for await (const item of eventRoutes) {
      assert.isNotNull(item);
    }
  });

  it("delete event route not existing", async () => {
    const eventRouteId = recorder.variable(
      "eventRoute",
      `eventRoute${Math.floor(Math.random() * 1000)}`,
    );

    let errorWasThrown = false;
    try {
      await client.deleteEventRoute(eventRouteId);
    } catch (error: any) {
      errorWasThrown = true;
      assert.include(error.message, `There is no route available that matches the provided input`);
    }
    assert.equal(errorWasThrown, true, "Error was not thrown");
  });
});
