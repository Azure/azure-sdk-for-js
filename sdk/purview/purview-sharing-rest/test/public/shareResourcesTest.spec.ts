// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isUnexpected, paginate, PurviewSharingClient, ShareResourceOutput } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("Share Resources Operations", () => {
  let recorder: Recorder;
  let client: PurviewSharingClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("List all Share Resources", async function () {
    const response = await client.path("/shareResources").get();

    assert.strictEqual(response.status, "200");
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const pageData = paginate(client, response);

    const result: ShareResourceOutput[] = [];

    for await (const item of pageData) {
      result.push(item);
    }

    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].id, "500009de-3510-4bbd-bf81-dc0b5a165be7");
    assert.strictEqual(result[0].sentSharesCount, 6);
    assert.strictEqual(result[0].receivedSharesCount, 0);
    assert.strictEqual(result[0].storeKind, "AdlsGen2Account");
  });
});
