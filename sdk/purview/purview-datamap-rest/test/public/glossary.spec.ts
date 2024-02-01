// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PurviewDataMapClient } from "../../src";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { assert } from "chai";
import { Context } from "mocha";
import { createClient } from "./utils/recordedClient";



describe("purview datamap glossary test", () => {
  let recorder: Recorder;
  let client: PurviewDataMapClient;
  let glossaryName: string;
 // let glossaryGuid: string;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
    glossaryName = "jsTesting";
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
 //   glossaryGuid = glossary.status === "200" ? glossary?.body?.guid || "" : "";
  });

//  it("Should delete a glossary", async () => {
 //   const glossary = await client.path("/atlas/v2/entity/guid/{guid}", glossaryGuid).delete();
 //   console.log("deleted glossary: ", glossary);
//
 //   assert.strictEqual(glossary.status, "200");
 // });
}).timeout(60000000000);
