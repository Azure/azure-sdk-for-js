// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DeviceUpdateClient, isUnexpected } from "../../src";
import { Context } from "mocha";
import { assert } from "chai";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient, startRecorder } from "./utils/recordedClient";

describe("device and deployment test", () => {
  let recorder: Recorder;
  let client: DeviceUpdateClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    await startRecorder(recorder);
    client = createRecordedClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  const group = "dpokluda-test";

  it("list devices", async function () {
    const response = await client
      .path("/deviceUpdate/{instanceId}/management/devices", "sdkinstance")
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/management/devices" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("get device not found", async function () {
    const response = await client
      .path("/deviceUpdate/{instanceId}/management/devices/{deviceId}", "sdkinstance", "foo")
      .get();

    assert.equal(response.status, "404");
  });

  it("list groups", async function () {
    const response = await client
      .path("/deviceUpdate/{instanceId}/management/groups", "sdkinstance")
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/management/groups" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("get group", async function () {
    const response = await client
      .path("/deviceUpdate/{instanceId}/management/groups/{groupId}", "sdkinstance", group)
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/updates/providers/fabrikam/names/vacuum" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("get group not found", async function () {
    const response = await client
      .path("/deviceUpdate/{instanceId}/management/groups/{groupId}", "sdkinstance", "foo")
      .get();

    assert.equal(response.status, "404");
  });

  it("list device classes", async function () {
    const response = await client
      .path("/deviceUpdate/{instanceId}/management/deviceClasses", "sdkinstance")
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/management/deviceClasses" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("get device class not found", async function () {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/management/deviceClasses/{deviceClassId}",
        "sdkinstance",
        "foo",
      )
      .get();

    assert.equal(response.status, "404");
  });

  it("list best updates for group", async function () {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/management/groups/{groupId}/bestUpdates",
        "sdkinstance",
        group,
      )
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/management/groups/group/bestUpdates" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("list best updates for group not found", async function () {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/management/groups/{groupId}/bestUpdates",
        "sdkinstance",
        "foo",
      )
      .get();

    assert.equal(response.status, "404");
  });

  it("list deployments for group", async function () {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments",
        "sdkinstance",
        group,
      )
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/management/groups/group/deployments" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("list deployments for group not found", async function () {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/management/groups/{groupId}/deployments",
        "sdkinstance",
        "foo",
      )
      .get();

    assert.equal(response.status, "404");
  });
}).timeout(600000);
