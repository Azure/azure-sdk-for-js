// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createClient } from "./utils/recordedClient.js";
import type { ContentSafetyClient, TextBlocklistItemOutput } from "@azure-rest/ai-content-safety";
import { isUnexpected, paginate } from "@azure-rest/ai-content-safety";
import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isBrowser, delay } from "@azure/core-util";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Content Safety Client Test", () => {
  let recorder: Recorder;
  let client: ContentSafetyClient;
  function uint8ArrayToBase64(binary: Uint8Array): string {
    let binaryString = "";
    binary.forEach((byte) => {
      binaryString += String.fromCharCode(byte);
    });
    return globalThis.btoa(binaryString);
  }
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "sample";
  const blockItemText2 = "text";
  const blockItemText3 = "image";
  let blockItemId: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("analyze text", async () => {
    const response = await client.path("/text:analyze").post({
      body: {
        text: "This is a sample text",
        categories: ["Hate"],
        outputType: "FourSeverityLevels",
      },
    });
    if (isUnexpected(response)) {
      throw new Error(response.body?.error.message);
    }
    assert.strictEqual(response.status, "200");
    assert.equal(response.body.categoriesAnalysis[0]?.category, "Hate");
    assert.notExists(response.body.categoriesAnalysis[1]);
  });

  it("analyze image", async () => {
    let base64Image: string;
    if (isBrowser) {
      const imagePath = "../../../samples-dev/example-data/image.png";
      const response = await globalThis.fetch(imagePath);
      const buffer = await response.arrayBuffer();
      const binary = new Uint8Array(buffer);
      base64Image = uint8ArrayToBase64(binary);
    } else {
      const imagePath = join("samples-dev", "example-data", "image.png");
      const buffer = readFileSync(imagePath);
      base64Image = buffer.toString("base64");
    }
    const response = await client.path("/image:analyze").post({
      body: {
        image: {
          content: base64Image,
        },
        categories: ["Sexual"],
        outputType: "FourSeverityLevels",
      },
    });
    if (isUnexpected(response)) {
      throw new Error(response.body?.error.message);
    }
    assert.strictEqual(response.status, "200");
    assert.equal(response.body.categoriesAnalysis[0]?.category, "Sexual");
    assert.notExists(response.body.categoriesAnalysis[1]);
  });

  it("create blocklist", async () => {
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
  });

  it("add block items", async () => {
    const addBlockItemsResponse = await client
      .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
      .post({
        body: {
          blocklistItems: [
            {
              description: "Test block item 1",
              text: blockItemText1,
            },
            {
              description: "Test block item 2",
              text: blockItemText2,
            },
            {
              description: "Test block item 3",
              text: blockItemText3,
            },
          ],
        },
      });
    if (isUnexpected(addBlockItemsResponse)) {
      throw new Error(addBlockItemsResponse.body?.error.message);
    }
    assert.strictEqual(addBlockItemsResponse.status, "200");
    assert.isArray(addBlockItemsResponse.body.blocklistItems);

    if (!isPlaybackMode()) {
      await delay(30000);
    }
  });

  it("analyze text with blocklist", async () => {
    const analyzeTextResponse = await client.path("/text:analyze").post({
      body: {
        text: "This is a sample to test.",
        blocklistNames: [blocklistName],
        haltOnBlocklistHit: true,
      },
    });
    if (isUnexpected(analyzeTextResponse)) {
      throw new Error(analyzeTextResponse.body?.error.message);
    }
    assert.strictEqual(analyzeTextResponse.status, "200");
    assert.isArray(analyzeTextResponse.body.blocklistsMatch);
  });

  it("list text blocklists", async () => {
    const listTextBlocklistsResponse = await client.path("/text/blocklists").get();
    if (isUnexpected(listTextBlocklistsResponse)) {
      throw new Error(listTextBlocklistsResponse.body?.error.message);
    }
    assert.strictEqual(listTextBlocklistsResponse.status, "200");
    assert.isArray(listTextBlocklistsResponse.body.value);
  });

  it("get text blocklist", async () => {
    const getTextBlocklistResponse = await client
      .path("/text/blocklists/{blocklistName}", blocklistName)
      .get();
    if (isUnexpected(getTextBlocklistResponse)) {
      throw new Error(getTextBlocklistResponse.body?.error.message);
    }
    assert.strictEqual(getTextBlocklistResponse.status, "200");
    assert.equal(getTextBlocklistResponse.body.blocklistName, blocklistName);
  });

  it("list block items", async () => {
    const listBlockItemsResponse = await client
      .path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName)
      .get();
    if (isUnexpected(listBlockItemsResponse)) {
      throw new Error(listBlockItemsResponse.body?.error.message);
    }
    assert.strictEqual(listBlockItemsResponse.status, "200");
    assert.isArray(listBlockItemsResponse.body.value);
    blockItemId = listBlockItemsResponse.body.value[1].blocklistItemId;
  });

  it("list block items with pagination helper", async () => {
    const dataSources = await client
      .path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName)
      .get();
    if (isUnexpected(dataSources)) {
      throw new Error(dataSources.body?.error.message);
    }
    const iter = paginate(client, dataSources);
    const items: TextBlocklistItemOutput[] = [];
    for await (const item of <
      PagedAsyncIterableIterator<TextBlocklistItemOutput, TextBlocklistItemOutput[], PageSettings>
    >iter) {
      items.push(item);
    }
    assert.equal(items[1].blocklistItemId, blockItemId);
  });

  it("list block items with pagination 1", async () => {
    const listBlockItemsResponse = await client
      .path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName)
      .get({
        queryParameters: {
          top: 10,
          skip: 0,
          maxpagesize: 1,
        },
      });
    if (isUnexpected(listBlockItemsResponse)) {
      throw new Error(listBlockItemsResponse.body?.error.message);
    }
    assert.strictEqual(listBlockItemsResponse.status, "200");
    assert.equal(listBlockItemsResponse.body.value.length, 1);
    const nextLink = listBlockItemsResponse.body.nextLink;
    const skip = nextLink?.split("skip=")[1].split("&")[0];
    assert.equal(skip, "1");
  });

  it("list block items with pagination 2", async () => {
    const listBlockItemsResponse = await client
      .path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName)
      .get({
        queryParameters: {
          top: 10,
          skip: 1,
          maxpagesize: 1,
        },
      });
    if (isUnexpected(listBlockItemsResponse)) {
      throw new Error(listBlockItemsResponse.body?.error.message);
    }
    assert.strictEqual(listBlockItemsResponse.status, "200");
    assert.equal(listBlockItemsResponse.body.value.length, 1);
    assert.equal(listBlockItemsResponse.body.value[0].blocklistItemId, blockItemId);
    const nextLink = listBlockItemsResponse.body.nextLink;
    const skip = nextLink?.split("skip=")[1].split("&")[0];
    assert.equal(skip, "2");
  });

  it("list block items with pagination 3", async () => {
    const listBlockItemsResponse = await client
      .path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName)
      .get({
        queryParameters: {
          top: 10,
          skip: 0,
          maxpagesize: 3,
        },
      });
    if (isUnexpected(listBlockItemsResponse)) {
      throw new Error(listBlockItemsResponse.body?.error.message);
    }
    assert.strictEqual(listBlockItemsResponse.status, "200");
    assert.equal(listBlockItemsResponse.body.value.length, 3);
    assert.equal(listBlockItemsResponse.body.value[1].blocklistItemId, blockItemId);
    assert.notExists(listBlockItemsResponse.body.nextLink);
  });

  it("get block item", async () => {
    const getBlockItemResponse = await client
      .path(
        "/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}",
        blocklistName,
        blockItemId,
      )
      .get();
    if (isUnexpected(getBlockItemResponse)) {
      throw new Error(getBlockItemResponse.body?.error.message);
    }
    assert.strictEqual(getBlockItemResponse.status, "200");
    assert.equal(getBlockItemResponse.body.blocklistItemId, blockItemId);
  });

  it("remove block item", async () => {
    const removeBlockItemResponse = await client
      .path("/text/blocklists/{blocklistName}:removeBlocklistItems", blocklistName)
      .post({
        body: {
          blocklistItemIds: [blockItemId],
        },
      });
    if (isUnexpected(removeBlockItemResponse)) {
      throw new Error(removeBlockItemResponse.body?.error.message);
    }
    assert.strictEqual(removeBlockItemResponse.status, "204");
  });

  it("delete blocklist", async () => {
    const deleteBlockListResponse = await client
      .path("/text/blocklists/{blocklistName}", blocklistName)
      .delete();
    if (isUnexpected(deleteBlockListResponse)) {
      throw new Error(deleteBlockListResponse.body?.error.message);
    }
    assert.strictEqual(deleteBlockListResponse.status, "204");
  });
});
