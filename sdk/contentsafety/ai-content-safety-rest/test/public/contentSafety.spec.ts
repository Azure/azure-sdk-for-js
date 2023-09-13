// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecorder, createClient } from "./utils/recordedClient";
import { Context } from "mocha";
import { ContentSafetyClient, isUnexpected } from "../../src";
import fs from "fs";
import path from "path";
import { isBrowser } from "@azure/core-util";

describe("Content Safety Client Test", () => {
  let recorder: Recorder;
  let client: ContentSafetyClient;
  function sleep(time: number): Promise<NodeJS.Timer> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("analyze text", async function () {
    const response = await client.path("/text:analyze").post({
      body: {
        text: "You are an idiot",
        categories: ["Hate"],
      },
    });
    if (isUnexpected(response)) {
      throw new Error(response.body?.error.message);
    }
    assert.strictEqual(response.status, "200");
    assert.equal(response.body.hateResult?.category, "Hate");
    assert.notExists(response.body.selfHarmResult);
  });

  it("analyze image", async function () {
    let base64Image: string;
    if (isBrowser) {
      const imagePath = "http://localhost:9876/base/samples-dev/example-data/image.png";
      const response = await fetch(imagePath);
      const buffer = await response.arrayBuffer();
      const binary = new Uint8Array(buffer);
      const chunkSize = 0x8000;
      const chunks = [];
      for (let i = 0; i < binary.length; i += chunkSize) {
        chunks.push(binary.slice(i, i + chunkSize));
      }
      const stringChunks = chunks.map((chunk) =>
        String.fromCharCode.apply(null, Array.from(chunk))
      );
      base64Image = btoa(stringChunks.join(""));
    } else {
      const imagePath = path.join("samples-dev", "example-data", "image.png");
      const buffer = fs.readFileSync(imagePath);
      base64Image = buffer.toString("base64");
    }
    const response = await client.path("/image:analyze").post({
      body: {
        image: {
          content: base64Image,
        },
        categories: ["Sexual"],
      },
    });
    if (isUnexpected(response)) {
      throw new Error(response.body?.error.message);
    }
    assert.strictEqual(response.status, "200");
    assert.equal(response.body.sexualResult?.category, "Sexual");
    assert.notExists(response.body.violenceResult);
  });

  it("manage blocklist", async function () {
    const blocklistName = "TestBlocklist";
    const blockItemText1 = "k*ll";
    const blockItemText2 = "h*te";

    // create blocklist
    const createBlockListResponse = await client
      .path("/text/blocklists/{blocklistName}", blocklistName)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          description: "test",
        },
      });
    if (isUnexpected(createBlockListResponse)) {
      throw new Error(createBlockListResponse.body?.error.message);
    }
    assert.strictEqual(createBlockListResponse.status, "201");
    assert.equal(createBlockListResponse.body.blocklistName, blocklistName);

    // add block items
    const addBlockItemsResponse = await client
      .path("/text/blocklists/{blocklistName}:addBlockItems", blocklistName)
      .post({
        body: {
          blockItems: [
            {
              description: "Test block item 1",
              text: blockItemText1,
            },
            {
              description: "Test block item 2",
              text: blockItemText2,
            },
          ],
        },
      });
    if (isUnexpected(addBlockItemsResponse)) {
      throw new Error(addBlockItemsResponse.body?.error.message);
    }
    assert.strictEqual(addBlockItemsResponse.status, "200");
    assert.isArray(addBlockItemsResponse.body.value);

    // sleep 30s to wait for block items to be ready
    await sleep(30000);

    // analyze text with blocklist
    const analyzeTextResponse = await client.path("/text:analyze").post({
      body: {
        text: "I h*te you and I want to k*ll you.",
        blocklistNames: [blocklistName],
        breakByBlocklists: false,
      },
    });
    if (isUnexpected(analyzeTextResponse)) {
      throw new Error(analyzeTextResponse.body?.error.message);
    }
    assert.strictEqual(analyzeTextResponse.status, "200");

    // list text blocklists
    const listTextBlocklistsResponse = await client.path("/text/blocklists").get();
    if (isUnexpected(listTextBlocklistsResponse)) {
      throw new Error(listTextBlocklistsResponse.body?.error.message);
    }
    assert.strictEqual(listTextBlocklistsResponse.status, "200");
    assert.isArray(listTextBlocklistsResponse.body.value);

    // get text blocklist
    const getTextBlocklistResponse = await client
      .path("/text/blocklists/{blocklistName}", blocklistName)
      .get();
    if (isUnexpected(getTextBlocklistResponse)) {
      throw new Error(getTextBlocklistResponse.body?.error.message);
    }
    assert.strictEqual(getTextBlocklistResponse.status, "200");
    assert.equal(getTextBlocklistResponse.body.blocklistName, blocklistName);

    // list block items
    const listBlockItemsResponse = await client
      .path("/text/blocklists/{blocklistName}/blockItems", blocklistName)
      .get();
    if (isUnexpected(listBlockItemsResponse)) {
      throw new Error(listBlockItemsResponse.body?.error.message);
    }
    assert.strictEqual(listBlockItemsResponse.status, "200");
    assert.isArray(listBlockItemsResponse.body.value);
    const blockItemId = listBlockItemsResponse.body.value[0].blockItemId;

    // get block item
    const getBlockItemResponse = await client
      .path("/text/blocklists/{blocklistName}/blockItems/{blockItemId}", blocklistName, blockItemId)
      .get();
    if (isUnexpected(getBlockItemResponse)) {
      throw new Error(getBlockItemResponse.body?.error.message);
    }
    assert.strictEqual(getBlockItemResponse.status, "200");
    assert.equal(getBlockItemResponse.body.blockItemId, blockItemId);

    // remove block item
    const removeBlockItemResponse = await client
      .path("/text/blocklists/{blocklistName}:removeBlockItems", blocklistName)
      .post({
        body: {
          blockItemIds: [blockItemId],
        },
      });
    if (isUnexpected(removeBlockItemResponse)) {
      throw new Error(removeBlockItemResponse.body?.error.message);
    }
    assert.strictEqual(removeBlockItemResponse.status, "204");

    // delete blocklist
    const deleteBlockListResponse = await client
      .path("/text/blocklists/{blocklistName}", blocklistName)
      .delete();
    if (isUnexpected(deleteBlockListResponse)) {
      throw new Error(deleteBlockListResponse.body?.error.message);
    }
    assert.strictEqual(deleteBlockListResponse.status, "204");
  });
});
