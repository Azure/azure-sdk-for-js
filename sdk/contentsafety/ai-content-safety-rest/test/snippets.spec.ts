// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ContentSafetyClient, {
  CreateOrUpdateTextBlocklistParameters,
  isUnexpected,
} from "@azure-rest/ai-content-safety";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential } from "@azure/core-auth";
import { readFileSync } from "node:fs";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const key = "<api_key>";
    const credential = new AzureKeyCredential(key);
    const client = ContentSafetyClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
  });

  it("ReadmeSampleAnalyzeText", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const text = "This is a sample text";
    const analyzeTextOption = { text: text };
    const analyzeTextParameters = { body: analyzeTextOption };
    // @ts-preserve-whitespace
    const result = await client.path("/text:analyze").post(analyzeTextParameters);
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
      const textCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
      console.log(
        textCategoriesAnalysisOutput.category,
        " severity: ",
        textCategoriesAnalysisOutput.severity,
      );
    }
  });

  it("ReadmeSampleAnalyzeTextWithBlocklists", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    async function createOrUpdateTextBlocklist() {
      const blocklistName = "TestBlocklist";
      const blocklistDescription = "Test blocklist management.";
      const createOrUpdateTextBlocklistParameters: CreateOrUpdateTextBlocklistParameters = {
        contentType: "application/merge-patch+json",
        body: {
          description: blocklistDescription,
        },
      };
      // @ts-preserve-whitespace
      const result = await client
        .path("/text/blocklists/{blocklistName}", blocklistName)
        .patch(createOrUpdateTextBlocklistParameters);
      // @ts-preserve-whitespace
      if (isUnexpected(result)) {
        throw result;
      }
      // @ts-preserve-whitespace
      console.log(
        "Blocklist created or updated: Name",
        result.body.blocklistName,
        ", Description: ",
        result.body.description,
      );
    }
    // @ts-preserve-whitespace
    async function addBlockItems() {
      const blocklistName = "TestBlocklist";
      const blockItemText1 = "sample";
      const blockItemText2 = "text";
      const addOrUpdateBlocklistItemsParameters = {
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
      // @ts-preserve-whitespace
      const result = await client
        .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
        .post(addOrUpdateBlocklistItemsParameters);
      // @ts-preserve-whitespace
      if (isUnexpected(result)) {
        throw result;
      }
      // @ts-preserve-whitespace
      console.log("Block items added: ");
      if (result.body.blocklistItems) {
        for (const blockItem of result.body.blocklistItems) {
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
    }
    // @ts-preserve-whitespace
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
      // @ts-preserve-whitespace
      const result = await client.path("/text:analyze").post(analyzeTextParameters);
      // @ts-preserve-whitespace
      if (isUnexpected(result)) {
        throw result;
      }
      // @ts-preserve-whitespace
      console.log("Blocklist match results: ");
      if (result.body.blocklistsMatch) {
        for (const blocklistMatchResult of result.body.blocklistsMatch) {
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
    // @ts-preserve-whitespace
    try {
      await createOrUpdateTextBlocklist();
      await addBlockItems();
      await analyzeTextWithBlocklists();
    } catch (err) {
      console.error("The sample encountered an error:", err);
    }
  });

  it("ReadmeSampleAnalyzeImage", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const image_path = "./samples-dev/example-data/image.png";
    // @ts-preserve-whitespace
    const imageBuffer = readFileSync(image_path);
    const base64Image = imageBuffer.toString("base64");
    const analyzeImageOption = { image: { content: base64Image } };
    const analyzeImageParameters = { body: analyzeImageOption };
    // @ts-preserve-whitespace
    const result = await client.path("/image:analyze").post(analyzeImageParameters);
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
      const imageCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
      console.log(
        imageCategoriesAnalysisOutput.category,
        " severity: ",
        imageCategoriesAnalysisOutput.severity,
      );
    }
  });

  it("ReadmeSampleCreateOrUpdateTextBlocklist", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const blocklistName = "TestBlocklist";
    const blocklistDescription = "Test blocklist management.";
    const createOrUpdateTextBlocklistParameters: CreateOrUpdateTextBlocklistParameters = {
      contentType: "application/merge-patch+json",
      body: {
        description: blocklistDescription,
      },
    };
    // @ts-preserve-whitespace
    const result = await client
      .path("/text/blocklists/{blocklistName}", blocklistName)
      .patch(createOrUpdateTextBlocklistParameters);
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    console.log(
      "Blocklist created or updated: Name",
      result.body.blocklistName,
      ", Description: ",
      result.body.description,
    );
  });

  it("ReadmeSampleListTextBlocklists", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const result = await client.path("/text/blocklists").get();
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    console.log("List blocklists: ");
    if (result.body.value) {
      for (const blocklist of result.body.value) {
        console.log(
          "BlocklistName: ",
          blocklist.blocklistName,
          ", Description: ",
          blocklist.description,
        );
      }
    }
  });

  it("ReadmeSampleGetTextBlocklist", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const blocklistName = "TestBlocklist";
    // @ts-preserve-whitespace
    const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).get();
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    console.log("Get blocklist: ");
    console.log("Name: ", result.body.blocklistName, ", Description: ", result.body.description);
  });

  it("ReadmeSampleDeleteTextBlocklist", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const blocklistName = "TestBlocklist";
    // @ts-preserve-whitespace
    const result = await client.path("/text/blocklists/{blocklistName}", blocklistName).delete();
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    console.log("Deleted blocklist: ", blocklistName);
  });

  it("ReadmeSampleAddBlockItems", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const blocklistName = "TestBlocklist";
    const blockItemText1 = "sample";
    const blockItemText2 = "text";
    const addOrUpdateBlocklistItemsParameters = {
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
    // @ts-preserve-whitespace
    const result = await client
      .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", blocklistName)
      .post(addOrUpdateBlocklistItemsParameters);
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    console.log("Block items added: ");
    if (result.body.blocklistItems) {
      for (const blockItem of result.body.blocklistItems) {
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
  });

  it("ReadmeSampleListBlockItems", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const blocklistName = "TestBlocklist";
    // @ts-preserve-whitespace
    const result = await client
      .path("/text/blocklists/{blocklistName}/blocklistItems", blocklistName)
      .get();
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result;
    }
    // @ts-preserve-whitespace
    console.log("List block items: ");
    if (result.body.value) {
      for (const blockItem of result.body.value) {
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
  });

  it("ReadmeSampleGetBlockItem", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const blockItemId = "<blockItemId>";
    const blocklistName = "TestBlocklist";
    // @ts-preserve-whitespace
    const blockItem = await client
      .path(
        "/text/blocklists/{blocklistName}/blocklistItems/{blocklistItemId}",
        blocklistName,
        blockItemId,
      )
      .get();
    // @ts-preserve-whitespace
    if (isUnexpected(blockItem)) {
      throw blockItem;
    }
    // @ts-preserve-whitespace
    console.log("Get blockitem: ");
    console.log(
      "BlockItemId: ",
      blockItem.body.blocklistItemId,
      ", Text: ",
      blockItem.body.text,
      ", Description: ",
      blockItem.body.description,
    );
  });

  it("ReadmeSampleRemoveBlockItems", async () => {
    const endpoint = "https://<my-custom-subdomain>.cognitiveservices.azure.com/";
    const credential = new DefaultAzureCredential();
    const client = ContentSafetyClient(endpoint, credential);
    // @ts-preserve-whitespace
    const blockItemId = "<blockItemId>";
    const blocklistName = "TestBlocklist";
    const blockItemText = "sample";
    // @ts-preserve-whitespace
    const removeBlocklistItemsParameters = {
      body: {
        blocklistItemIds: [blockItemId],
      },
    };
    const removeBlockItem = await client
      .path("/text/blocklists/{blocklistName}:removeBlocklistItems", blocklistName)
      .post(removeBlocklistItemsParameters);
    // @ts-preserve-whitespace
    if (isUnexpected(removeBlockItem)) {
      throw removeBlockItem;
    }
    // @ts-preserve-whitespace
    console.log("Removed blockItem: ", blockItemText);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
