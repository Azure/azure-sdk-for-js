// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewCatalogClient } from "../../src/index.js";
import { getLongRunningPoller } from "../../src/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("purview catalog glossary test", () => {
  let recorder: Recorder;
  let client: PurviewCatalogClient;
  let glossaryName: string;
  let glossaryGuid: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
    glossaryName = "jsLROTesting-2";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Should create a glossary", async () => {
    const glossary = await client.path("/atlas/v2/glossary").post({
      body: {
        name: glossaryName,
        shortDescription: "Example Short Description",
        longDescription: "Example Long Description",
        language: "en",
        usage: "Example Glossary",
      },
    });

    console.log("created glossary: ", glossary);

    assert.strictEqual(glossary.status, "200");
    glossaryGuid = glossary.status === "200" ? glossary?.body?.guid || "" : "";
  });

  it("should work with LRO helper", { timeout: 500000 }, async () => {
    await recorder.addSanitizers(
      {
        removeHeaderSanitizer: {
          headersForRemoval: ["Content-Type", "Transfer-Encoding"],
        },
      },
      ["playback", "record"],
    );
    await recorder.setMatcher("BodilessMatcher");
    const initialResponse = await client
      .path("/glossary/name/{glossaryName}/terms/import", glossaryName)
      .post({
        headers: {
          contentType: "multipart/form-data",
        },
        body: {
          file: "random content",
        },
        contentType: "multipart/form-data",
      });

    console.log("LRO init resp: ", initialResponse);
    const poller = getLongRunningPoller(client, initialResponse, {
      intervalInMs: 100,
    });

    const result = await poller.pollUntilDone();
    console.log("LRO polling result:", result);
    if (result.status === "500") {
      const error = `Unexpected status code ${result.status}`;
      assert.fail(error);
    }

    // console.log(result);
    assert.equal(result.body.status, "Succeeded");
  });

  it("Should delete a glossary", async () => {
    const glossary = await client.path("/atlas/v2/entity/guid/{guid}", glossaryGuid).delete();
    console.log("deleted glossary: ", glossary);

    assert.strictEqual(glossary.status, "200");
  });
});
