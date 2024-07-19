// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createModelClient } from "./utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { ModelClient, GetEmbeddingsBodyParam, isUnexpected, EmbeddingsResultOutput } from "../../src/index.js";

describe("embeddings test suite", () => {
  let recorder: Recorder;
  let client: ModelClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createModelClient("embeddings", recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("embeddings regression test", async function () {
    const headers = { "extra-parameters": "allow" };
    const embeddingParams = {
      body: {
        input: ["first phrase"],
        dimensions: 1,
        encoding_format: "foo",
        input_type: "foo",
        model: "foo"
      }
    } as GetEmbeddingsBodyParam;

    assert.isDefined(embeddingParams);

    const response = await client.path("/embeddings").post({
      headers,
      body: embeddingParams.body
    });
    const responseHeaders = response.request.headers.toJSON();
    assert.isDefined(responseHeaders);
    assert.isDefined(responseHeaders["extra-parameters"]);
    assert.isTrue(responseHeaders["extra-parameters"] == headers["extra-parameters"]);

    const request = response.request;
    assert.isDefined(request);

    const reqBody = request.body as string;
    assert.isDefined(reqBody);
    const json = JSON.parse(reqBody);
    assert.isDefined(json["input"]);
    assert.isArray(json["input"]);
    assert.isNotEmpty(json["input"]);

    if (json["input"]) {
      assert.isDefined(json["input"][0]);
      assert.isTrue(json["input"][0] == embeddingParams.body?.input[0]);
    }
    assert.isTrue(json["dimensions"] == embeddingParams.body?.dimensions);
    assert.isTrue(json["model"] == embeddingParams.body?.model);
    assert.isTrue(json["encoding_format"] == embeddingParams.body?.encoding_format);
    assert.isTrue(json["input_type"] == embeddingParams.body?.input_type);
  },
    {
      timeout: 50000
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
