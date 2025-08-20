// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient.js";
import { createClient } from "./utils/recordedClient.js";
import { isUnexpected } from "@azure-rest/purview-datamap";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("purview datamap entity test", () => {
  let recorder: Recorder;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // TODO: Find out why this recording is missing
  it("Import entity business metadata ", { skip: true }, async () => {
    const client = await createClient(recorder);
    const fileContent = new TextEncoder()
      .encode(`TypeName,UniqueAttributeValue,BusinessAttributeName,BusinessAttributeValue,UniqueAttributeName[optional]
hive_database,hive_db_1,bmWithAllTypes.attr8,"Awesome Attribute 1",name`);

    const response = await client.path("/atlas/v2/entity/businessmetadata/import").post({
      contentType: "multipart/form-data",
      body: [
        {
          name: "file",
          body: fileContent,
          filename: "template_2.csv",
        },
      ],
    });
    assert.strictEqual(isUnexpected(response), false);
  });
});
