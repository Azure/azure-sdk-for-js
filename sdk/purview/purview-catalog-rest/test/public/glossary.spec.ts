// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  AtlasGlossaryOutput,
  ImportCSVOperationOutput,
  PurviewCatalogClient,
} from "../../src";
import { getLongRunningPoller } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient } from "./utils/recordedClient";
import type { Context } from "mocha";

describe("purview catalog glossary test", () => {
  let recorder: Recorder;
  let client: PurviewCatalogClient;
  let glossaryName: string;
  let glossaryGuid: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
    glossaryName = "jsLROTesting-2";
  });

  afterEach(async function () {
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
    const atlasGlossaryOutput = glossary.body as AtlasGlossaryOutput;
    glossaryGuid = glossary.status === "200" ? atlasGlossaryOutput?.guid || "" : "";
  });

  it("should work with LRO helper", async () => {
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
    const poller = await getLongRunningPoller(client, initialResponse, {
      intervalInMs: 100,
    });

    const result = await poller.pollUntilDone();
    console.log("LRO polling result:", result);
    if (result.status === "500") {
      const error = `Unexpected status code ${result.status}`;
      assert.fail(error);
    }

    // console.log(result);
    const importCSVOperationOutput = result.body as ImportCSVOperationOutput;
    assert.equal(importCSVOperationOutput.status, "Succeeded");
  });

  it("Should delete a glossary", async () => {
    const glossary = await client.path("/atlas/v2/entity/guid/{guid}", glossaryGuid).delete();
    console.log("deleted glossary: ", glossary);

    assert.strictEqual(glossary.status, "200");
  });
}).timeout(60000000000);
