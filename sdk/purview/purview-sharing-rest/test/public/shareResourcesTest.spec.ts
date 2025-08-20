// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewSharingClient, ShareResourceOutput } from "@azure-rest/purview-sharing";
import { isUnexpected, paginate } from "@azure-rest/purview-sharing";
import type { Recorder } from "@azure-tools/test-recorder";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Share Resources Operations", () => {
  let recorder: Recorder;
  let client: PurviewSharingClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("List all Share Resources", async () => {
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
