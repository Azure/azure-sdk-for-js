// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfidentialLedgerClient } from "@azure-rest/confidential-ledger";
import { isUnexpected } from "@azure-rest/confidential-ledger";
import { createClient, createRecorder } from "./utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("List Enclaves", () => {
  let recorder: Recorder;
  let client: ConfidentialLedgerClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list all available document formats", async () => {
    const result = await client.path("/app/enclaveQuotes").get();

    assert.equal(result.status, "200");

    if (isUnexpected(result)) {
      throw result.body;
    }

    assert.typeOf(result.body.currentNodeId, "string");
    assert.equal(Object.keys(result.body.enclaveQuotes).length, 3);
  });
});
