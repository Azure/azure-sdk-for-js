// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createClient, createBlocklistClient } from "./utils/recordedClient.js";
import type { BlocklistClient, ContentSafetyClient, TextBlocklistItem } from "../../src/index.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isBrowser, delay } from "@azure/core-util";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Content Safety Client Test", () => {
  let recorder: Recorder;
  let client: ContentSafetyClient;
  let blocklistClient: BlocklistClient;
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "sample";
  const blockItemText2 = "text";
  const blockItemText3 = "image";
  let blockItemId: string;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = createClient(recorder);
    blocklistClient = createBlocklistClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("analyze text", async () => {
    const response = await client.analyzeText({
      text: "This is a sample text",
      categories: ["Hate"],
      outputType: "FourSeverityLevels",
    });
    assert.equal(response.categoriesAnalysis[0]?.category, "Hate");
    assert.notExists(response.categoriesAnalysis[1]);
  });

  it("analyze image", async () => {
    let image: Uint8Array;
    if (isBrowser) {
      const imagePath = "../../../samples-dev/example-data/image.png";
      const response = await globalThis.fetch(imagePath);
      const buffer = await response.arrayBuffer();
      image = new Uint8Array(buffer);
    } else {
      const imagePath = join("samples-dev", "example-data", "image.png");
      image = readFileSync(imagePath);
    }
    const response = await client.analyzeImage({
      image: {
        content: image,
      },
      categories: ["Sexual"],
      outputType: "FourSeverityLevels",
    });
    assert.equal(response.categoriesAnalysis[0]?.category, "Sexual");
    assert.notExists(response.categoriesAnalysis[1]);
  });

  it("create blocklist", async () => {
    await recorder.setMatcher("CustomDefaultMatcher", {
      compareBodies: false,
      ignoreQueryOrdering: true,
    });
    const response = await blocklistClient.createOrUpdateTextBlocklist(blocklistName, {
      description: "test",
    });
    assert.equal(response.blocklistName, blocklistName);
  });

  it("add block items", async () => {
    const response = await blocklistClient.addOrUpdateBlocklistItems(blocklistName, {
      blocklistItems: [
        { description: "Test block item 1", text: blockItemText1 },
        { description: "Test block item 2", text: blockItemText2 },
        { description: "Test block item 3", text: blockItemText3 },
      ],
    });
    assert.isArray(response.blocklistItems);

    if (!isPlaybackMode()) {
      await delay(30000);
    }
  });

  it("analyze text with blocklist", async () => {
    const response = await client.analyzeText({
      text: "This is a sample to test.",
      blocklistNames: [blocklistName],
      haltOnBlocklistHit: true,
    });
    assert.isArray(response.blocklistsMatch);
  });

  it("list text blocklists", async () => {
    const blocklists = [];
    for await (const blocklist of blocklistClient.listTextBlocklists()) {
      blocklists.push(blocklist);
    }
    assert.isArray(blocklists);
  });

  it("get text blocklist", async () => {
    const response = await blocklistClient.getTextBlocklist(blocklistName);
    assert.equal(response.blocklistName, blocklistName);
  });

  it("list block items", async () => {
    const items = [];
    for await (const item of blocklistClient.listTextBlocklistItems(blocklistName)) {
      items.push(item);
    }
    assert.isArray(items);
    blockItemId = items[1].blocklistItemId;
  });

  it("list block items with pagination helper", async () => {
    const items: TextBlocklistItem[] = [];
    for await (const item of blocklistClient.listTextBlocklistItems(blocklistName)) {
      items.push(item);
    }
    assert.equal(items[1].blocklistItemId, blockItemId);
  });

  it("list block items with pagination 1", async () => {
    const pages = blocklistClient
      .listTextBlocklistItems(blocklistName, { top: 10, skip: 0, maxpagesize: 1 })
      .byPage();
    const result = await pages.next();
    if (result.done) throw new Error("Expected a page of blocklist items.");
    assert.equal(result.value.length, 1);
    const skip = result.value.continuationToken?.split("skip=")[1].split("&")[0];
    assert.equal(skip, "1");
  });

  it("list block items with pagination 2", async () => {
    const pages = blocklistClient
      .listTextBlocklistItems(blocklistName, { top: 10, skip: 1, maxpagesize: 1 })
      .byPage();
    const result = await pages.next();
    if (result.done) throw new Error("Expected a page of blocklist items.");
    assert.equal(result.value.length, 1);
    assert.equal(result.value[0].blocklistItemId, blockItemId);
    const skip = result.value.continuationToken?.split("skip=")[1].split("&")[0];
    assert.equal(skip, "2");
  });

  it("list block items with pagination 3", async () => {
    const pages = blocklistClient
      .listTextBlocklistItems(blocklistName, { top: 10, skip: 0, maxpagesize: 3 })
      .byPage();
    const result = await pages.next();
    if (result.done) throw new Error("Expected a page of blocklist items.");
    assert.equal(result.value.length, 3);
    assert.equal(result.value[1].blocklistItemId, blockItemId);
    assert.notExists(result.value.continuationToken);
  });

  it("get block item", async () => {
    const response = await blocklistClient.getTextBlocklistItem(blocklistName, blockItemId);
    assert.equal(response.blocklistItemId, blockItemId);
  });

  it("remove block item", async () => {
    await blocklistClient.removeBlocklistItems(blocklistName, {
      blocklistItemIds: [blockItemId],
    });
  });

  it("delete blocklist", async () => {
    await blocklistClient.deleteTextBlocklist(blocklistName);
  });
});
