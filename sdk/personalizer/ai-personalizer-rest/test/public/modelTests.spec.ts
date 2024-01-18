// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import createPersonalizerClient, {
  ModelPropertiesOutput,
  PersonalizerClient,
  isUnexpected,
} from "../../src";
import { assert } from "chai";

describe("Model Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createPersonalizerClient(
      env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "",
      {
        key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "",
      },
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // Issue: https://github.com/Azure/azure-sdk-for-js/issues/23071
  it.skip("model import and export tests", async function () {
    const unSignedModelBytes = await exportModel(client);
    const signedModelBytes = await exportModel(client, true);
    await importModel(client, signedModelBytes);
    const newUnSignedModelBytes = await exportModel(client);
    assertArrayEquals(unSignedModelBytes, newUnSignedModelBytes);
  });

  it("model properties tests", async function () {
    const modelProperties: ModelPropertiesOutput = await getModelProperties(client);
    assert.exists(modelProperties.creationTime);
    assert.exists(modelProperties.lastModifiedTime);
  });
});

async function exportModel(
  client: PersonalizerClient,
  signed: boolean = false,
): Promise<Uint8Array> {
  const response = await client.path("/model").get({ queryParameters: { signed: signed } });
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  return response.body;
}

async function importModel(client: PersonalizerClient, modelBytes: Uint8Array) {
  const response = await client.path("/model").put({ body: modelBytes });
  if (isUnexpected(response)) {
    throw response.body.error;
  }
}

async function getModelProperties(client: PersonalizerClient): Promise<ModelPropertiesOutput> {
  const response = await client.path("/model/properties").get();
  return response.body;
}

function assertArrayEquals(actual: Uint8Array, expected: Uint8Array) {
  return actual.length === expected.length && actual.every((val, index) => val === expected[index]);
}
