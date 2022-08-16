// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import Personalizer, { GeneratedClient, ModelPropertiesOutput } from "../../src";
import { env } from "process";
import { assert } from "chai";

describe("Model Tests", () => {
  let recorder: Recorder;
  let client: GeneratedClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = Personalizer(env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "", { key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "" });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("model import and export tests", async function () {
    let unSignedModelBytes = await exportModelAsync(client);
    let signedModelBytes = await exportModelAsync(client, true);
    await importModelAsync(client, signedModelBytes);
    let newUnSignedModelBytes = await exportModelAsync(client);
    assertArrayEquals(unSignedModelBytes, newUnSignedModelBytes);
  });

  it("model properties tests", async function () {
    let modelProperties: ModelPropertiesOutput = await getModelPropertiesAsync(client);
    assert.exists(modelProperties.creationTime);
    assert.exists(modelProperties.lastModifiedTime);
  });
});

async function exportModelAsync(client: GeneratedClient, signed: boolean = false): Promise<Uint8Array> {
  let queryParameters: Record<string, unknown> = { signed: signed };
  let response = await client.path("/model").get(queryParameters);
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
    return response.body as Uint8Array;
}

async function importModelAsync(client: GeneratedClient, modelBytes: Uint8Array) {
  await client.path("/model").put({body: modelBytes });
    // if (isUnexpected(response)) {
    //   throw response.body.error.code;
    // }
}

async function getModelPropertiesAsync(client: GeneratedClient): Promise<ModelPropertiesOutput> {
  let response = await client.path("/model/properties").get();
  return response.body as ModelPropertiesOutput;
}

function assertArrayEquals(actual: Uint8Array, expected: Uint8Array) {
  return actual.length === expected.length &&
    actual.every((val, index) => val === expected[index]);
}


