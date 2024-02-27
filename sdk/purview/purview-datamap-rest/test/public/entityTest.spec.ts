// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { createClient } from "./utils/recordedClient";
import { createFile } from "../../src/index";
import { isUnexpected } from "../../src/isUnexpected";

describe("purview datamap entity test", () => {
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Import entity business metadata ", async function () {
    const client = await createClient(recorder);
    const fileContent = new TextEncoder()
      .encode(`TypeName,UniqueAttributeValue,BusinessAttributeName,BusinessAttributeValue,UniqueAttributeName[optional]
hive_database,hive_db_1,bmWithAllTypes.attr8,"Awesome Attribute 1",name`);

    const response = await client.path("/atlas/v2/entity/businessmetadata/import").post({
      contentType: "multipart/form-data",
      body: {
        file: createFile(fileContent, "template_2.csv"),
      },
    });
    assert.strictEqual(isUnexpected(response), false);
  });
});
