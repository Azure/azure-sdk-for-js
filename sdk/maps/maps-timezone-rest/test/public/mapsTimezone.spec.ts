
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isPlaybackMode, Recorder, env } from "@azure-tools/test-recorder";
import { isNodeLike } from "@azure/core-util";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import MapsTimezone, { isUnexpected } from "../../src";
import { IanaIdOutput } from "../../src";


describe("Authentication", function () {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should work with Microsoft Entra ID authentication", async function () {
    if (isPlaybackMode()) this.skip();
    if (!isNodeLike) this.skip();
    const credential = createTestCredential();
    const client = MapsTimezone(
        credential,
        env["MAPS_RESOURCE_CLIENT_ID"] as string,
        recorder.configureClientOptions({})
    );

    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: { query: "America/New_York" },
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
    if (isPlaybackMode()) this.skip();
    const client = createClient(recorder.configureClientOptions({}));
    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: { query: "America/New_York" },
    });

    assert.isOk(!isUnexpected(response));
  });

  it("should be executed with different baseUrl", async function () {
    if (isPlaybackMode()) this.skip();
    const client = createClient(
        recorder.configureClientOptions({ baseUrl: "https://us.atlas.microsoft.com/" })
    );
    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: { query: "America/New_York" },
    });

    assert.isOk(!isUnexpected(response));
  });
});

describe("MapsTimezone", () => {
  let recorder: Recorder;
  let client: ReturnType<typeof MapsTimezone>;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder.configureClientOptions({}));
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can get timezone by ID", async function () {
    if (isPlaybackMode()) this.skip();
    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: { query: "America/New_York" },
    });
    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isTrue(response.body.TimeZones?.length === 1, "TimeZones array should contain one element.");
    }
  });

  it("can get timezone by coordinates", async function () {
    if (isPlaybackMode()) this.skip();
    const response = await client.path("/timezone/byCoordinates/{format}", "json").get({
      queryParameters: { query: [40.7128, -74.0060] },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      const timeZoneId = response.body.TimeZones?.[0]?.Id ?? "No time zone available";
      assert.equal(timeZoneId, "America/New_York");
    }
  });

  it("can get Windows timezone IDs", async function () {
    if (isPlaybackMode()) this.skip();
    const response = await client.path("/timezone/enumWindows/{format}", "json").get();

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.equal(response.body.length, 505);
    }
  });

  it("can get IANA timezone IDs", async function () {
    if (isPlaybackMode()) this.skip();
    const response = await client.path("/timezone/enumIana/{format}", "json").get();

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.equal(response.body.length, 596);
    }
  });

  it("can get IANA version", async function () {
    if (isPlaybackMode()) this.skip();
    const response = await client.path("/timezone/ianaVersion/{format}", "json").get();

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      assert.isNotEmpty(response.body.Version);
    }
  });

  it("can convert Windows timezone to IANA", async function () {
    if (isPlaybackMode()) this.skip();
    const response = await client.path("/timezone/windowsToIana/{format}", "json").get({
      queryParameters: { query: "Eastern Standard Time" },
    });

    if (isUnexpected(response)) {
      assert.fail(response.body.error?.message || "Unexpected error.");
    } else {
      // Define the expected IANA IDs based on the example output
      const expectedIanaIds = [
        "America/Nassau",
        "America/Toronto",
        "America/Iqaluit",
        "America/Montreal",
        "America/Nipigon",
        "America/Pangnirtung",
        "America/Thunder_Bay",
        "America/New_York",
        "America/Detroit",
        "America/Indiana/Petersburg",
        "America/Indiana/Vincennes",
        "America/Indiana/Winamac",
        "America/Kentucky/Monticello",
        "America/Louisville",
        "EST5EDT"
      ];

      // Extract the IANA IDs from the response
      const ianaIds: string[] = response.body
          .map((ianaId: IanaIdOutput) => ianaId.Id)
          .filter((id: string | undefined): id is string => id !== undefined);

      // Assert that the IANA IDs returned by the API match the expected IDs
      assert.deepEqual(ianaIds, expectedIanaIds, "The IANA IDs should match the expected values.");
    }
  });
});

