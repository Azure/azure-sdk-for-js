// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DeviceUpdateClient } from "@azure-rest/iot-device-update";
import { isUnexpected } from "@azure-rest/iot-device-update";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient, startRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("update test", () => {
  let recorder: Recorder;
  let client: DeviceUpdateClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await startRecorder(recorder);
    client = createRecordedClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  const provider = "fabrikam";
  const name = "vacuum";
  const version = "2022.401.504.6";

  it("list providers", async () => {
    const response = await client
      .path("/deviceUpdate/{instanceId}/updates/providers", "sdkinstance")
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/updates/providers" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("list names", async () => {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/updates/providers/{provider}/names",
        "sdkinstance",
        provider,
      )
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/updates/providers/fabrikam/names" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("get name not found", async () => {
    const response = await client
      .path("/deviceUpdate/{instanceId}/updates/providers/{provider}/names", "sdkinstance", "foo")
      .get();

    assert.equal(response.status, "404");
  });

  it("list versions", async () => {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
        "sdkinstance",
        provider,
        name,
      )
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/updates/providers/fabrikam/names/vacuum/versions" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("get version not found", async () => {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
        "sdkinstance",
        "foo",
        "bar",
      )
      .get();

    assert.equal(response.status, "404");
  });

  it("get update", async () => {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
        "sdkinstance",
        provider,
        name,
        version,
      )
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/updates/providers/fabrikam/names/vacuum" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("get update not found", async () => {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
        "sdkinstance",
        "foo",
        "bar",
        "1.2",
      )
      .get();

    assert.equal(response.status, "404");
  });

  it("list files", async () => {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files",
        "sdkinstance",
        provider,
        name,
        version,
      )
      .get();

    if (isUnexpected(response)) {
      assert.fail(
        `GET "/deviceUpdate/sdkInstance/updates/providers/fabrikam/names/vacuum/versions/1.2" failed with ${response.status}`,
      );
    }

    assert.equal("200", response.status);
  });

  it("list files not found", { timeout: 600000 }, async () => {
    const response = await client
      .path(
        "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files",
        "sdkinstance",
        "foo",
        "bar",
        "1.2",
      )
      .get();

    assert.equal(response.status, "404");
  });
});
