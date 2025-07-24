// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import ImageAnalysisClient, { isUnexpected } from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { DefaultAzureCredential } from "@azure/identity";
import { readFileSync } from "node:fs";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const endpoint = "<your_endpoint>";
    const key = "<your_key>";
    const credential = new AzureKeyCredential(key);
    const client = ImageAnalysisClient(endpoint, credential);
  });

  it("ReadmeSampleCreateClient_DefaultAzureCredential", async () => {
    const endpoint = "<your_endpoint>";
    const credential = new DefaultAzureCredential();
    const client = ImageAnalysisClient(endpoint, credential);
  });

  it("ReadmeSampleAnalyzeImageFromUrl", async () => {
    const endpoint = "<your_endpoint>";
    const credential = new DefaultAzureCredential();
    const client = ImageAnalysisClient(endpoint, credential);
    // @ts-preserve-whitespace
    const imageUrl = "https://example.com/image.jpg";
    const features = [
      "Caption",
      "DenseCaptions",
      "Objects",
      "People",
      "Read",
      "SmartCrops",
      "Tags",
    ];
    // @ts-preserve-whitespace
    const result = await client.path("/imageanalysis:analyze").post({
      body: {
        url: imageUrl,
      },
      queryParameters: {
        features: features,
        "smartCrops-aspect-ratios": [0.9, 1.33],
      },
      contentType: "application/json",
    });
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    // @ts-preserve-whitespace
    console.log(`Model Version: ${result.body.modelVersion}`);
    console.log(`Image Metadata: ${JSON.stringify(result.body.metadata)}`);
    // @ts-preserve-whitespace
    if (result.body.captionResult) {
      console.log(
        `Caption: ${result.body.captionResult.text} (confidence: ${result.body.captionResult.confidence})`,
      );
    }
    // @ts-preserve-whitespace
    if (result.body.denseCaptionsResult) {
      for (const denseCaption of result.body.denseCaptionsResult.values) {
        console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.objectsResult) {
      for (const object of result.body.objectsResult.values) {
        console.log(`Object: ${JSON.stringify(object)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.peopleResult) {
      for (const person of result.body.peopleResult.values) {
        console.log(`Person: ${JSON.stringify(person)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.readResult) {
      for (const block of result.body.readResult.blocks) {
        console.log(`Text Block: ${JSON.stringify(block)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.smartCropsResult) {
      for (const smartCrop of result.body.smartCropsResult.values) {
        console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.tagsResult) {
      for (const tag of result.body.tagsResult.values) {
        console.log(`Tag: ${JSON.stringify(tag)}`);
      }
    }
  });

  it("ReadmeSampleAnalyzeImageFromFile", async () => {
    const endpoint = "<your_endpoint>";
    const credential = new DefaultAzureCredential();
    const client = ImageAnalysisClient(endpoint, credential);
    // @ts-preserve-whitespace
    const imagePath = "./path/to/your/image.jpg";
    const features = [
      "Caption",
      "DenseCaptions",
      "Objects",
      "People",
      "Read",
      "SmartCrops",
      "Tags",
    ];
    // @ts-preserve-whitespace
    const imageBuffer = readFileSync(imagePath);
    // @ts-preserve-whitespace
    const result = await client.path("/imageanalysis:analyze").post({
      body: imageBuffer,
      queryParameters: {
        features: features,
        "smartCrops-aspect-ratios": [0.9, 1.33],
      },
      contentType: "application/octet-stream",
    });
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    // @ts-preserve-whitespace
    console.log(`Model Version: ${result.body.modelVersion}`);
    console.log(`Image Metadata: ${JSON.stringify(result.body.metadata)}`);
    // @ts-preserve-whitespace
    if (result.body.captionResult) {
      console.log(
        `Caption: ${result.body.captionResult.text} (confidence: ${result.body.captionResult.confidence})`,
      );
    }
    // @ts-preserve-whitespace
    if (result.body.denseCaptionsResult) {
      for (const denseCaption of result.body.denseCaptionsResult.values) {
        console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.objectsResult) {
      for (const object of result.body.objectsResult.values) {
        console.log(`Object: ${JSON.stringify(object)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.peopleResult) {
      for (const person of result.body.peopleResult.values) {
        console.log(`Person: ${JSON.stringify(person)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.readResult) {
      for (const block of result.body.readResult.blocks) {
        console.log(`Text Block: ${JSON.stringify(block)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.smartCropsResult) {
      for (const smartCrop of result.body.smartCropsResult.values) {
        console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`);
      }
    }
    // @ts-preserve-whitespace
    if (result.body.tagsResult) {
      for (const tag of result.body.tagsResult.values) {
        console.log(`Tag: ${JSON.stringify(tag)}`);
      }
    }
  });

  it("ReadmeSampleExtractTextFromImageUrl", async () => {
    const endpoint = "<your_endpoint>";
    const credential = new DefaultAzureCredential();
    const client = ImageAnalysisClient(endpoint, credential);
    // @ts-preserve-whitespace
    const features: string[] = ["Read"];
    const imageUrl: string = "https://aka.ms/azsdk/image-analysis/sample.jpg";
    // @ts-preserve-whitespace
    const result = await client.path("/imageanalysis:analyze").post({
      body: { url: imageUrl },
      queryParameters: { features: features },
      contentType: "application/json",
    });
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    // @ts-preserve-whitespace
    // Process the response
    const imageAnalysisResult = result.body;
    if (imageAnalysisResult.readResult && imageAnalysisResult.readResult.blocks.length > 0) {
      for (const block of imageAnalysisResult.readResult.blocks) {
        console.log(`Detected text block: ${JSON.stringify(block)}`);
      }
    } else {
      console.log("No text blocks detected.");
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
