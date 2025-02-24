// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewMetadataPolicies } from "../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createMetadataClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import type { MetadataPolicyListOutput } from "../../src/metadataPolicies/outputModels.js";

describe("List Metadata", () => {
  let recorder: Recorder;
  let client: PurviewMetadataPolicies.Client.PurviewMetadataPoliciesClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createMetadataClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list all available metdataPolicies", async () => {
    const result = await client.path("/metadataPolicies").get();

    if (result.status !== "200") {
      console.log(result.request.url);
      assert.fail(`GET "/metadataPolicies" failed with ${result.status}`);
    }
    const metadataPolicyListOutput = result.body as MetadataPolicyListOutput;
    assert.isDefined(metadataPolicyListOutput.values.length);
  });
});
