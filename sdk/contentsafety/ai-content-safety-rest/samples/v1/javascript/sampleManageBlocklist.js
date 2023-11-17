// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to manage blocklist.
 */

const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"] || "<endpoint>";
const key = process.env["CONTENT_SAFETY_API_KEY"] || "<key>";

const credential = new AzureKeyCredential(key);
const client = ContentSafetyClient(endpoint, credential);

async function createOrUpdateTextBlocklist() {
  const blocklistName = "TestBlocklist";
  const blocklistDescription = "Test blocklist management.";
  const createOrUpdateTextBlocklistParameters = {
    contentType: "application/merge-patch+json",
    body: {
      description: blocklistDescription,
    },
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}", blocklistName)
    .patch(createOrUpdateTextBlocklistParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log(
    "Blocklist created or updated: Name",
    result.body.blocklistName,
    ", Description: ",
    result.body.description
  );
}

async function addBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "sample";
  const blockItemText2 = "text";
  const AddOrUpdateBlocklistItemsParameters = {
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
      ],
    },
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
    .post(AddOrUpdateBlocklistItemsParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Block items added: ");
  if (result.body.blocklistItems) {
    for (const blockItem of result.body.blocklistItems) {
      console.log(
        "BlockItemId: ",
        blockItem.blocklistItemId,
        ", Text: ",
        blockItem.text,
        ", Description: ",
        blockItem.description
      );
    }
  }
}

async function analyzeTextWithBlocklists() {
  const blocklistName = "TestBlocklist";
  const inputText = "This is a sample to test text with blocklist.";
  const analyzeTextParameters = {
    body: {
      text: inputText,
      blocklistNames: [blocklistName],
      haltOnBlocklistHit: false,
    },
  };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Blocklist match results: ");
  if (result.body.blocklistsMatch) {
    for (const blocklistMatchResult of result.body.blocklistsMatch) {
      console.log(
        "BlocklistName: ",
        blocklistMatchResult.blocklistName,
        ", BlockItemId: ",
        blocklistMatchResult.blocklistItemId,
        ", BlockItemText: ",
        blocklistMatchResult.blocklistItemText
      );
    }
  }
}

async function listTextBlocklists() {
  const result = await client.path("/text/blocklists").get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("List blocklists: ");
  if (result.body.value) {
    for (const blocklist of result.body.value) {
      console.log(
        "BlocklistName: ",
        blocklist.blocklistName,
        ", Description: ",
        blocklist.description
      );
    }
  }
}

async function getTextBlocklist() {
  const blocklistName = "TestBlocklist";

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Get blocklist: ");
  console.log("Name: ", result.body.blocklistName, ", Description: ", result.body.description);
}

async function listBlockItems() {
  const blocklistName = "TestBlocklist";

  const result = await client
    .path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName)
    .get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("List block items: ");
  if (result.body.value) {
    for (const blockItem of result.body.value) {
      console.log(
        "BlockItemId: ",
        blockItem.blocklistItemId,
        ", Text: ",
        blockItem.text,
        ", Description: ",
        blockItem.description
      );
    }
  }
}

async function getBlockItem() {
  const blocklistName = "TestBlocklist";
  const blockItemText = "sample";
  const AddOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText,
        },
      ],
    },
  };
  const result = await client
    .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
    .post(AddOrUpdateBlocklistItemsParameters);
  if (isUnexpected(result) || result.body.blocklistItems === undefined) {
    throw new Error("Block item not added.");
  }
  const blockItemId = result.body.blocklistItems[0].blocklistItemId;

  const blockItem = await client
    .path(
      "/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}",
      blocklistName,
      blockItemId
    )
    .get();

  if (isUnexpected(blockItem)) {
    throw blockItem;
  }

  console.log("Get blockitem: ");
  console.log(
    "BlockItemId: ",
    blockItem.body.blocklistItemId,
    ", Text: ",
    blockItem.body.text,
    ", Description: ",
    blockItem.body.description
  );
}

async function removeBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText = "sample";
  const AddOrUpdateBlocklistItemsParameters = {
    body: {
      blocklistItems: [
        {
          description: "Test block item 1",
          text: blockItemText,
        },
      ],
    },
  };
  const result = await client
    .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
    .post(AddOrUpdateBlocklistItemsParameters);
  if (isUnexpected(result) || result.body.blocklistItems === undefined) {
    throw new Error("Block item not added.");
  }
  const blockItemId = result.body.blocklistItems[0].blocklistItemId;

  const RemoveBlocklistItemsParameters = {
    body: {
      blocklistItemIds: [blockItemId],
    },
  };
  const removeBlockItem = await client
    .path("/text/blocklists/{blocklistName}:removeBlocklistItems", blocklistName)
    .post(RemoveBlocklistItemsParameters);

  if (isUnexpected(removeBlockItem)) {
    throw removeBlockItem;
  }

  console.log("Removed blockItem: ", blockItemText);
}

async function deleteBlocklist() {
  const blocklistName = "TestBlocklist";

  const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).delete();

  if (isUnexpected(result)) {
    throw result;
  }

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
