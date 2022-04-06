// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import {
  // getLongRunningPoller,
  PurviewCatalogClient,
} from "../../src";
import { Recorder } from "@azure-tools/test-recorder";

import { assert } from "chai";
import { createClient } from "./utils/recordedClient";
import { Context } from "mocha";

describe("purview catalog test", () => {
  let recorder: Recorder;
  let client: PurviewCatalogClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should list all available typedefs sources", async () => {
    const result = await client.path("/atlas/v2/types/typedefs").get();

    if (result.status !== "200") {
      assert.fail(`GET "/atlas/v2/types/typedefs" failed with ${result.status}`);
    }

    assert.isDefined(result.body.entityDefs?.length);
  });

  // it("Should create a glossary", async () => {
  //   const glossary = await client.path("/atlas/v2/glossary").post({
  //     body: {
  //       name: "jssdkGlossary",
  //       shortDescription: "Example Short Description",
  //       longDescription: "Example Long Description",
  //       language: "en",
  //       usage: "Example Glossary",
  //     },
  //   });

  //   console.log(glossary);
  //   assert.strictEqual(glossary.status, "200");
  // });

  // it("should work with LRO helper", async () => {

  //   const initialResponse = await client
  //     .path("/glossary/name/{glossaryName}/terms/import", "jssdkGlossary")
  //     .post({
  //       headers: {
  //         contentType: "multipart/form-data",
  //       },
  //       body: "random content",
  //       contentType: "multipart/form-data",
  //     });

  //   console.log(initialResponse);
  //   const poller = getLongRunningPoller(client, initialResponse, {
  //     intervalInMs: 0
  //   })

  //   const result = await poller.pollUntilDone();
  //   console.log(result);
  //   if (result.status === "500") {
  //     const error = `Unexpected status code ${result.status}`;
  //     assert.fail(error);
  //   }

  //   console.log(result);
  //   // assert.equal(result.body.properties?.provisioningState, "Succeeded");
  // });
}).timeout(60000000000);
