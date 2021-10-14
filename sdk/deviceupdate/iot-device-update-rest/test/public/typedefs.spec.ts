// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  DeviceUpdateRestClient,
  paginate
} from "../../src";
import { env, Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("device update test", () => {
  let recorder: Recorder;
  let client: DeviceUpdateRestClient;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all update providers", async () => {
    const result = await client.path("/deviceupdate/{instanceId}/updates/providers", env.INSTANCE_ID).get();

    const iter = paginate(client, result);

    const items = [];

    for await (const item of iter) {
      items.push(item);
    }

    assert.strictEqual(items.length, 0);

    if (result.status !== "200") {
      assert.fail(`GET "/deviceupdate/test/updates/providers" failed with ${result.status}`);
    }

    assert.isDefined(result.body.value?.length);
  });


}).timeout(60000000000);
