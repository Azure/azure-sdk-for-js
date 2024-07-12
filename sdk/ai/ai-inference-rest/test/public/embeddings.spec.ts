// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createEmbeddingsClient } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { ModelClient, isUnexpected, EmbeddingsResultOutput } from "../../src/index.js";

describe("embeddings test suite", () => {
  let recorder: Recorder;
  let client: ModelClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createEmbeddingsClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("simple embeddings test", async function () {
    const response = await client.path("/embeddings").post({
      body: {
        input: ["first phrase", "second phrase", "third phrase"]
      }
    });
    console.log(response);

    assert.isFalse(isUnexpected(response));

    const result = response.body as EmbeddingsResultOutput;
    assert.isDefined(result);
    assert.isNotEmpty(result.data);
    assert.isTrue(result.data.length === 3);
    for (const data of result.data) {
      assert.isDefined(data.index);
      assert.isTrue(data.embedding[0] !== 0.0);
      assert.isTrue(data.embedding[data.embedding.length - 1] !== 0.0);
    }
    assert.isDefined(result.usage);
    assert.isTrue(result.usage.prompt_tokens > 0);
    assert.isTrue(result.usage.prompt_tokens == result.usage.total_tokens);
  },
    {
      timeout: 50000
    });

});
