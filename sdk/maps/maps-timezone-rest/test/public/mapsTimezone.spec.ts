// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import MapsTimezone, { isUnexpected, MapsTimezoneClient } from "../../src";

describe("Authentication", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should work with Microsoft Entra ID authentication", async function () {
    if (!isNodeLike) this.skip();
    const credential = createTestCredential();
    const client = MapsTimezone(
        credential,
        env["MAPS_RESOURCE_CLIENT_ID"] as string,
        recorder.configureClientOptions({})
    );

    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: { id: "America/New_York" },
    });
    assert.isOk(!isUnexpected(response));
  });
});

describe("Endpoint can be overwritten", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should be executed without specifying baseUrl", async function () {
    const client = createClient(recorder.configureClientOptions({}));
    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: { id: "America/New_York" },
    });

    assert.isOk(!isUnexpected(response));
  });

  it("should be executed with different baseUrl", async function () {
    const client = createClient(
        recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" })
    );
    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: { id: "America/New_York" },
    });

    assert.isOk(!isUnexpected(response));
  });
});

describe("MapsTimezone", () => {
  let recorder: Recorder;
  let client: MapsTimezoneClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can get timezone by ID", async function () {
    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: { id: "America/New_York" },
    });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body);
    }
  });

  it("can get timezone by coordinates", async function () {
    const response = await client.path("/timezone/byCoordinates/{format}", "json").get({
      queryParameters: { lat: 40.7128, lon: -74.0060 },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body);
    }
  });

  it("can get Windows timezone IDs", async function () {
    const response = await client.path("/timezone/enumWindows/{format}", "json").get();

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body);
    }
  });

  it("can get IANA timezone IDs", async function () {
    const response = await client.path("/timezone/enumIana/{format}", "json").get();

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body);
    }
  });

  it("can get IANA version", async function () {
    const response = await client.path("/timezone/ianaVersion/{format}", "json").get();

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body.version);
    }
  });

  it("can convert Windows timezone to IANA", async function () {
    const response = await client.path("/timezone/windowsToIana/{format}", "json").get({
      queryParameters: { windowsTimezoneId: "Eastern Standard Time" },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body.ianaTimezoneIds);
    }
  });
});
