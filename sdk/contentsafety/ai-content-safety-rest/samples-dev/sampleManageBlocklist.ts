// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to manage blocklist.
 */

import type { TextBlocklistItem } from "@azure-rest/ai-content-safety";
import { BlocklistClient, ContentSafetyClient } from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";
import "dotenv/config";

const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

const credential = new AzureKeyCredential(key);
const client = new ContentSafetyClient(endpoint, credential);
const blocklistClient = new BlocklistClient(endpoint, credential);

async function createOrUpdateTextBlocklist(): Promise<void> {
  const blocklistName = "TestBlocklist";
  const blocklistDescription = "Test blocklist management.";

  const result = await blocklistClient.createOrUpdateTextBlocklist(blocklistName, {
    blocklistName,
    description: blocklistDescription,
  });

  console.log(
    "Blocklist created or updated: Name",
    result.blocklistName,
    ", Description: ",
    result.description,
  );
}

async function addBlockItems(): Promise<void> {
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "sample";
  const blockItemText2 = "text";

  // blocklistItemId is server-generated but typed as required, so the
  // request-side literals are asserted to the model type.
  const result = await blocklistClient.addOrUpdateBlocklistItems(blocklistName, {
    blocklistItems: [
      {
        description: "Test block item 1",
        text: blockItemText1,
      },
      {
        description: "Test block item 2",
        text: blockItemText2,
      },
    ] as TextBlocklistItem[],
  });

  console.log("Block items added: ");
  for (const blockItem of result.blocklistItems) {
    console.log(
      "BlockItemId: ",
      blockItem.blocklistItemId,
      ", Text: ",
      blockItem.text,
      ", Description: ",
      blockItem.description,
    );
  }
}

async function analyzeTextWithBlocklists(): Promise<void> {
  const blocklistName = "TestBlocklist";
  const inputText = "This is a sample to test text with blocklist.";

  const result = await client.analyzeText({
    text: inputText,
    blocklistNames: [blocklistName],
    haltOnBlocklistHit: false,
  });

  console.log("Blocklist match results: ");
  if (result.blocklistsMatch) {
    for (const blocklistMatchResult of result.blocklistsMatch) {
      console.log(
        "BlocklistName: ",
        blocklistMatchResult.blocklistName,
        ", BlockItemId: ",
        blocklistMatchResult.blocklistItemId,
        ", BlockItemText: ",
        blocklistMatchResult.blocklistItemText,
      );
    }
  }
}

async function listTextBlocklists(): Promise<void> {
  console.log("List blocklists: ");
  for await (const blocklist of blocklistClient.listTextBlocklists()) {
    console.log(
      "BlocklistName: ",
      blocklist.blocklistName,
      ", Description: ",
      blocklist.description,
    );
  }
}

async function getTextBlocklist(): Promise<void> {
  const blocklistName = "TestBlocklist";

  const result = await blocklistClient.getTextBlocklist(blocklistName);

  console.log("Get blocklist: ");
  console.log("Name: ", result.blocklistName, ", Description: ", result.description);
}

async function listBlockItems(): Promise<void> {
  const blocklistName = "TestBlocklist";

  console.log("List block items: ");
  for await (const blockItem of blocklistClient.listTextBlocklistItems(blocklistName)) {
    console.log(
      "BlockItemId: ",
      blockItem.blocklistItemId,
      ", Text: ",
      blockItem.text,
      ", Description: ",
      blockItem.description,
    );
  }
}

async function getBlockItem(): Promise<void> {
  const blocklistName = "TestBlocklist";
  const blockItemText = "sample";

  const result = await blocklistClient.addOrUpdateBlocklistItems(blocklistName, {
    blocklistItems: [
      {
        description: "Test block item 1",
        text: blockItemText,
      },
    ] as TextBlocklistItem[],
  });
  const blockItemId = result.blocklistItems[0].blocklistItemId;

  const blockItem = await blocklistClient.getTextBlocklistItem(blocklistName, blockItemId);

  console.log("Get blockitem: ");
  console.log(
    "BlockItemId: ",
    blockItem.blocklistItemId,
    ", Text: ",
    blockItem.text,
    ", Description: ",
    blockItem.description,
  );
}

async function removeBlockItems(): Promise<void> {
  const blocklistName = "TestBlocklist";
  const blockItemText = "sample";

  const result = await blocklistClient.addOrUpdateBlocklistItems(blocklistName, {
    blocklistItems: [
      {
        description: "Test block item 1",
        text: blockItemText,
      },
    ] as TextBlocklistItem[],
  });
  const blockItemId = result.blocklistItems[0].blocklistItemId;

  await blocklistClient.removeBlocklistItems(blocklistName, {
    blocklistItemIds: [blockItemId],
  });

  console.log("Removed blockItem: ", blockItemText);
}

async function deleteBlocklist(): Promise<void> {
  const blocklistName = "TestBlocklist";

  await blocklistClient.deleteTextBlocklist(blocklistName);

  console.log("Deleted blocklist: ", blocklistName);
}

(async () => {
  await createOrUpdateTextBlocklist();
  await addBlockItems();
  await analyzeTextWithBlocklists();
  await listTextBlocklists();
  await getTextBlocklist();
  await listBlockItems();
  await getBlockItem();
  await removeBlockItems();
  await deleteBlocklist();
})().catch((err) => {
  console.error("The sample encountered an error:", err);
});
