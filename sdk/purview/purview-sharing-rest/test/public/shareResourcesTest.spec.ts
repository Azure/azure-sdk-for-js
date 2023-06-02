// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isUnexpected,
  PurviewSharingClient,
  ShareResourceListOutput
} from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";

describe("Sent Shares Operations", () => {
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
    const response = await client
      .path("/shareResources")
      .get();

    assert.strictEqual(response.status, "200");
    if (isUnexpected(response)) {
      throw response.body.error;
    }

    const shareResourcesListResponse: ShareResourceListOutput = response.body;

    assert.strictEqual(shareResourcesListResponse.value.length, 2);
    assert.strictEqual(shareResourcesListResponse.value[0].id, "500009de-3510-4bbd-bf81-dc0b5a165be7");
    assert.strictEqual(shareResourcesListResponse.value[0].sentSharesCount, 6);
    assert.strictEqual(shareResourcesListResponse.value[0].receivedSharesCount, 0);
    assert.strictEqual(shareResourcesListResponse.value[0].storeKind, "AdlsGen2Account");
  });
});
