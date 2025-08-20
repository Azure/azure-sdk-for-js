// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRecorder, createModelClient } from "../utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type {
  ModelClient,
  GetImageEmbeddingsBodyParam,
  EmbeddingsResultOutput,
} from "../../../src/index.js";
import { isUnexpected } from "@azure-rest/ai-inference";
import fs from "node:fs";
import path from "node:path";

function getImageDataUrl(imageFile: string, imageFormat: string): string {
  try {
    const imagePath = path.join("samples-dev", "example-data", imageFile);
    const buffer = fs.readFileSync(imagePath);
    const base64Image = buffer.toString("base64");
    return `data:image/${imageFormat};base64,${base64Image}`;
  } catch (error) {
    console.error(`Could not read '${imageFile}'.`);
    console.error("Set the correct path to the image file before running this sample.");
    throw error;
  }
}

describe("image embeddings test suite", () => {
  let recorder: Recorder;
  let client: ModelClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createModelClient("imageEmbeddings", recorder, { credentials: {} });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("image embeddings regression test", async () => {
    const headers = { "extra-parameters": "allow" };
    const image = getImageDataUrl("sample.png", "png");
    const embeddingParams = {
      body: {
        input: [{ image }],
        dimensions: 1,
        encoding_format: "foo",
        input_type: "foo",
        model: "foo",
      },
    } as GetImageEmbeddingsBodyParam;

    assert.isDefined(embeddingParams);

    const response = await client.path("/images/embeddings").post({
      headers,
      body: embeddingParams.body,
    });
    const responseHeaders = response.request.headers.toJSON();
    assert.isDefined(responseHeaders);
    assert.isDefined(responseHeaders["extra-parameters"]);
    assert.isTrue(responseHeaders["extra-parameters"] === headers["extra-parameters"]);

    const request = response.request;
    assert.isDefined(request);

    const reqBody = request.body as string;
    assert.isDefined(reqBody);
    const json = JSON.parse(reqBody);
    assert.isDefined(json["input"]);
    assert.isArray(json["input"]);
    assert.isNotEmpty(json["input"]);

    if (json["input"] && json["input"].length > 0) {
      assert.isDefined(json["input"][0]["image"]);
      assert.isTrue(json["input"][0]["image"] === embeddingParams.body?.input[0]["image"]);
    }
    assert.isTrue(json["dimensions"] === embeddingParams.body?.dimensions);
    assert.isTrue(json["model"] === embeddingParams.body?.model);
    assert.isTrue(json["encoding_format"] === embeddingParams.body?.encoding_format);
    assert.isTrue(json["input_type"] === embeddingParams.body?.input_type);
  });

  it("simple embeddings test", async () => {
    const image = getImageDataUrl("sample.png", "png");
    const response = await client.path("/images/embeddings").post({
      body: {
        input: [{ image }],
      },
    });
    console.log(response);

    assert.isFalse(isUnexpected(response));

    const result = response.body as EmbeddingsResultOutput;
    assert.isDefined(result);
    assert.isNotEmpty(result.data);
    assert.isTrue(result.data.length === 1);
    const resultData = result.data[0];
    assert.isTrue(resultData.embedding[0] !== 0.0);
    assert.isTrue(resultData.embedding[resultData.embedding.length - 1] !== 0.0);
    assert.isDefined(result.usage);
    assert.isTrue(result.usage.prompt_tokens > 0);
    assert.isTrue(result.usage.prompt_tokens === result.usage.total_tokens);
  });
});
