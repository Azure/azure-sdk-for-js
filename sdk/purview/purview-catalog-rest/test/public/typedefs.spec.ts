// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { getLongRunningPoller, PurviewCatalogRestClient } from "../../src";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import { isNode } from "@azure/core-util";
import { file } from "./termFile";
import { assert } from "chai";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import * as sinon from "sinon";
import FormData from "form-data";

describe("purview catalog test", () => {
  let recorder: Recorder;
  let client: PurviewCatalogRestClient;
  const glosaryName = `jssdkGlossary12${isNode ? "Node" : "Browser"}`;

  beforeEach(function (this: Context) {
    recorder = createRecorder(this);
    client = createClient({ retryOptions: { maxRetries: 1 } });
  });

  afterEach(async function () {
    await recorder.stop();
    sinon.reset();
  });

  it("should list all available typedefs sources", async () => {
    const result = await client.path("/atlas/v2/types/typedefs").get();

    if (result.status !== "200") {
      assert.fail(`GET "/atlas/v2/types/typedefs" failed with ${result.status}`);
    }

    assert.isDefined(result.body.entityDefs?.length);
  });

  it("Should create a glossary", async () => {
    const glossary = await client.path("/atlas/v2/glossary").post({
      body: {
        name: glosaryName,
        shortDescription: "Example Short Description",
        longDescription: "Example Long Description",
        language: "en",
        usage: "Example Glossary",
      },
    });

    assert.strictEqual(glossary.status, "200");
  });

  it("should work with LRO helper", async () => {
    if (isNode) {
      // Stubbing to always get the same boundary header and match recordings
      sinon
        .stub(FormData.prototype, "getBoundary")
        .returns("--------------------------704900034345454045250553");
    }

    const initialResponse = await client
      .path("/glossary/name/{glossaryName}/terms/import", glosaryName)
      .post({
        headers: {
          contentType: "multipart/form-data",
        },
        body: { file },
        contentType: "multipart/form-data",
        queryParameters: { includeTermHierarchy: true },
      });

    const poller = getLongRunningPoller(client, initialResponse, {
      intervalInMs: isLiveMode() ? 5000 : 0,
    });

    const result = await poller.pollUntilDone();
    if (result.status === "500") {
      const error = `Unexpected status code ${result.status}`;
      assert.fail(error);
    }

    assert.isDefined(result.body.properties?.importedTerms);
  }).timeout(20000);
});
