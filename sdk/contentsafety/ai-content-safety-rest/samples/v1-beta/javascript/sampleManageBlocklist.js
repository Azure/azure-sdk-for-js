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
  const blockItemText1 = "k*ll";
  const blockItemText2 = "h*te";
  const addBlockItemsParameters = {
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
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}:addBlockItems", blocklistName)
    .post(addBlockItemsParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Block items added: ");
  if (result.body.value) {
    for (const blockItem of result.body.value) {
      console.log(
        "BlockItemId: ",
        blockItem.blockItemId,
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
  const inputText = "I h*te you and I want to k*ll you.";
  const analyzeTextParameters = {
    body: {
      text: inputText,
      blocklistNames: [blocklistName],
      breakByBlocklists: false,
    },
  };

  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Blocklist match results: ");
  if (result.body.blocklistsMatchResults) {
    for (const blocklistMatchResult of result.body.blocklistsMatchResults) {
      console.log(
        "Block item was hit in text, Offset=",
        blocklistMatchResult.offset,
        ", Length=",
        blocklistMatchResult.length
      );
      console.log(
        "BlocklistName: ",
        blocklistMatchResult.blocklistName,
        ", BlockItemId: ",
        blocklistMatchResult.blockItemId,
        ", BlockItemText: ",
        blocklistMatchResult.blockItemText
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
    .path("/text/blocklists/{blocklistName}/blockItems", blocklistName)
    .get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("List block items: ");
  if (result.body.value) {
    for (const blockItem of result.body.value) {
      console.log(
        "BlockItemId: ",
        blockItem.blockItemId,
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
  const blockItemText1 = "k*ll";

  const result = await client
    .path(
      "/text/blocklists/{blocklistName}/blockItems/{blockItemId}",
      blocklistName,
      blockItemText1
    )
    .get();

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Get blockitem: ");
  console.log(
    "BlockItemId: ",
    result.body.blockItemId,
    ", Text: ",
    result.body.text,
    ", Description: ",
    result.body.description
  );
}

async function removeBlockItems() {
  const blocklistName = "TestBlocklist";
  const blockItemText1 = "k*ll";
  const removeBlockItemsParameters = {
    body: {
      blockItemIds: [blockItemText1],
    },
  };

  const result = await client
    .path("/text/blocklists/{blocklistName}:removeBlockItems", blocklistName)
    .post(removeBlockItemsParameters);

  if (isUnexpected(result)) {
    throw result;
  }

  console.log("Removed blockItem: ", blockItemText1);
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
