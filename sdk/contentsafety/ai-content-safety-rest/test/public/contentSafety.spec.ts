// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createRecorder, createClient, createBlocklistClient } from "./utils/recordedClient.js";
import type {
  BlocklistClient,
  ContentSafetyClient,
  TextBlocklist,
  TextBlocklistItem,
} from "../../src/index.js";
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
    const result = await client.analyzeText({
      text: "This is a sample text",
      categories: ["Hate"],
      outputType: "FourSeverityLevels",
    });
    assert.equal(result.categoriesAnalysis[0]?.category, "Hate");
    assert.notExists(result.categoriesAnalysis[1]);
  });

  it("analyze image", async () => {
    let imageContent: Uint8Array;
    if (isBrowser) {
      const imagePath = "../../../samples-dev/example-data/image.png";
      const response = await globalThis.fetch(imagePath);
      imageContent = new Uint8Array(await response.arrayBuffer());
    } else {
      const imagePath = join("samples-dev", "example-data", "image.png");
      imageContent = readFileSync(imagePath);
    }
    const result = await client.analyzeImage({
      image: {
        content: imageContent,
      },
      categories: ["Sexual"],
      outputType: "FourSeverityLevels",
    });
    assert.equal(result.categoriesAnalysis[0]?.category, "Sexual");
    assert.notExists(result.categoriesAnalysis[1]);
  });

  it("create blocklist", async () => {
    const result = await blocklistClient.createOrUpdateTextBlocklist(blocklistName, {
      blocklistName,
      description: "test",
    });
    assert.equal(result.blocklistName, blocklistName);
  });

  it("add block items", async () => {
    const result = await blocklistClient.addOrUpdateBlocklistItems(blocklistName, {
      // blocklistItemId is server-generated but typed as required, so the
      // request-side literals are asserted to the model type.
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
      ] as TextBlocklistItem[],
    });
    assert.isArray(result.blocklistItems);

    if (!isPlaybackMode()) {
      await delay(30000);
    }
  });

  it("analyze text with blocklist", async () => {
    const result = await client.analyzeText({
      text: "This is a sample to test.",
      blocklistNames: [blocklistName],
      haltOnBlocklistHit: true,
    });
    assert.isArray(result.blocklistsMatch);
  });

  it("list text blocklists", async () => {
    const items: TextBlocklist[] = [];
    for await (const item of blocklistClient.listTextBlocklists()) {
      items.push(item);
    }
    assert.isArray(items);
  });

  it("get text blocklist", async () => {
    const result = await blocklistClient.getTextBlocklist(blocklistName);
    assert.equal(result.blocklistName, blocklistName);
  });

  it("list block items", async () => {
    const items: TextBlocklistItem[] = [];
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
    const iter = blocklistClient
      .listTextBlocklistItems(blocklistName, { top: 10, skip: 0, maxpagesize: 1 })
      .byPage();
    const firstPage = (await iter.next()).value ?? [];
    assert.equal(firstPage.length, 1);
  });

  it("list block items with pagination 2", async () => {
    const iter = blocklistClient
      .listTextBlocklistItems(blocklistName, { top: 10, skip: 1, maxpagesize: 1 })
      .byPage();
    const firstPage = (await iter.next()).value ?? [];
    assert.equal(firstPage.length, 1);
    assert.equal(firstPage[0].blocklistItemId, blockItemId);
  });

  it("list block items with pagination 3", async () => {
    const iter = blocklistClient
      .listTextBlocklistItems(blocklistName, { top: 10, skip: 0, maxpagesize: 3 })
      .byPage();
    const firstPage = (await iter.next()).value ?? [];
    assert.equal(firstPage.length, 3);
    assert.equal(firstPage[1].blocklistItemId, blockItemId);
  });

  it("get block item", async () => {
    const result = await blocklistClient.getTextBlocklistItem(blocklistName, blockItemId);
    assert.equal(result.blocklistItemId, blockItemId);
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
