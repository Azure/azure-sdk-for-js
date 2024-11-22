// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PurviewCatalogClient } from "../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("purview catalog tepedefs test", { timeout: 500000 }, () => {
  let recorder: Recorder;
  let client: PurviewCatalogClient;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should list all available typedefs sources", async () => {
    const result = await client.path("/atlas/v2/types/typedefs").get();

    // console.dir(result);
    if (result.status !== "200") {
      assert.fail(`GET "/atlas/v2/types/typedefs" failed with ${result.status}`);
    }

    assert.isDefined(result.body.entityDefs?.length);
  });
});
