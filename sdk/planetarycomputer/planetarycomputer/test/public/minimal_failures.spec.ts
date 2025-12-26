// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { createRecorder, createRecordedClient } from "./utils/recordedClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { PlanetaryComputerProClient } from "../../src/index.js";
import { assertEnvironmentVariable, EnvironmentVariableNames } from "./utils/envVars.js";
import { writeFileSync } from "fs";
import { resolve } from "path";

describe("Minimal Failure Tests", () => {
  let recorder: Recorder;
  let client: PlanetaryComputerProClient;
  let collectionId: string;
  let itemId: string;

  beforeEach(async function (ctx) {
    recorder = await createRecorder(ctx);
    client = createRecordedClient(recorder);
    collectionId = assertEnvironmentVariable(
      EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
    );
    itemId = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ITEM_ID);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // Failure Mode 1: PNG Binary Encoding
  it("PNG binary encoding - Get preview image", async () => {
    console.log("\n========================================");
    console.log("TEST 1: PNG binary encoding failure");
    console.log("========================================");
    console.log(`Collection ID: ${collectionId}`);
    console.log(`Item ID: ${itemId}`);

    try {
      console.log("Calling getPreview with params:");
      const params = {
        assets: ["image"],
        assetBandIndices: "image|1,2,3",
        format: "png",
        width: 512,
        height: 512,
      };
      console.log(JSON.stringify(params, null, 2));

      const response = await client.data.getPreview(collectionId, itemId, params);

      console.log(`Response type: ${typeof response}`);
      console.log(`Response constructor: ${response?.constructor?.name}`);
      console.log(`Response is string: ${typeof response === "string"}`);
      console.log(`Response is Uint8Array: ${response instanceof Uint8Array}`);
      console.log(`Response is Buffer: ${Buffer.isBuffer(response)}`);

      // Log first few characters/bytes to see what we're dealing with
      if (typeof response === "string") {
        console.log(`First 4 chars: ${JSON.stringify(response.substring(0, 4))}`);
        console.log(
          `First 4 char codes: ${Array.from(response.substring(0, 4))
            .map((c) => c.charCodeAt(0).toString(16))
            .join(" ")}`,
        );
      }

      // Try different encoding strategies
      let imageBytes: Buffer;
      if (Buffer.isBuffer(response)) {
        imageBytes = response;
        console.log("Using response as-is (already Buffer)");
      } else if (response instanceof Uint8Array) {
        imageBytes = Buffer.from(response);
        console.log("Converting from Uint8Array");
      } else if (typeof response === "string") {
        // Try latin1 encoding which preserves byte values 0-255
        imageBytes = Buffer.from(response, "latin1");
        console.log("Converting from string using latin1 encoding");
      } else {
        imageBytes = Buffer.from(response as any);
        console.log("Converting using default encoding");
      }

      console.log(`Image size: ${imageBytes.length} bytes`);
      console.log(`First 16 bytes (hex): ${imageBytes.subarray(0, 16).toString("hex")}`);
      // Write image bytes to file for debugging
      const outputPath = resolve("preview.png");
      writeFileSync(outputPath, imageBytes);
      console.log(`✓ Image written to: ${outputPath}`);

      // Check for full PNG magic bytes: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
      const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const actualMagic = imageBytes.subarray(0, 8);
      console.log(`Expected PNG magic: ${pngMagic.toString("hex")}`);
      console.log(`Actual magic bytes: ${actualMagic.toString("hex")}`);

      assert.isTrue(
        imageBytes.subarray(0, 8).equals(pngMagic),
        `PNG magic bytes mismatch. Expected: ${pngMagic.toString("hex")}, Got: ${actualMagic.toString("hex")}`,
      );
      console.log("✓ Test PASSED");
    } catch (error: any) {
      console.log(`✗ Test FAILED: ${error.message}`);
      console.log(`Error stack: ${error.stack}`);
      throw error;
    }
  });

  // // Failure Mode 2: XML Binary Encoding
  // it("XML binary encoding - Get WMTS capabilities", async () => {
  //   console.log("\n========================================");
  //   console.log("TEST 2: XML binary encoding failure");
  //   console.log("========================================");
  //   console.log(`Collection ID: ${collectionId}`);
  //   console.log(`Item ID: ${itemId}`);

  //   try {
  //     console.log("Calling getWmtsCapabilities with params:");
  //     const params = {
  //       assets: ["image"],
  //       assetBandIndices: "image|1,2,3",
  //       tileFormat: "png",
  //       tileScale: 1,
  //       minZoom: 7,
  //       maxZoom: 14,
  //     };
  //     console.log(JSON.stringify(params, null, 2));

  //     const response = await client.data.getWmtsCapabilities(
  //       collectionId,
  //       itemId,
  //       "WebMercatorQuad",
  //       params,
  //     );

  //     console.log(`Response type: ${typeof response}`);
  //     console.log(
  //       `Response has Symbol.asyncIterator: ${(response as any)?.[Symbol.asyncIterator] !== undefined}`,
  //     );

  //     // Collect XML bytes (response is async iterable)
  //     const chunks: Buffer[] = [];
  //     for await (const chunk of response) {
  //       if (typeof chunk === "string") {
  //         chunks.push(Buffer.from(chunk, "binary"));
  //       } else if (typeof chunk === "number") {
  //         chunks.push(Buffer.from([chunk]));
  //       } else {
  //         chunks.push(Buffer.from(chunk as Uint8Array));
  //       }
  //     }
  //     const xmlBytes = Buffer.concat(chunks);
  //     console.log(`XML total size: ${xmlBytes.length} bytes`);
  //     console.log(`First 32 bytes (hex): ${xmlBytes.subarray(0, 32).toString("hex")}`);

  //     const xmlString = xmlBytes.toString("utf-8");
  //     console.log(`XML string length: ${xmlString.length} chars`);
  //     console.log(`XML first 500 chars:\n${xmlString.substring(0, 500)}`);

  //     assert.isTrue(
  //       xmlBytes.length > 100,
  //       `XML should be substantial, got ${xmlBytes.length} bytes`,
  //     );
  //     assert.include(xmlString, "Capabilities", "XML should contain Capabilities element");
  //     console.log("✓ Test PASSED");
  //   } catch (error: any) {
  //     console.log(`✗ Test FAILED: ${error.message}`);
  //     console.log(`Error stack: ${error.stack}`);
  //     throw error;
  //   }
  // });

  // // Failure Mode 3: STAC Item Creation / Serialization
  // it("STAC item creation - Create item", async () => {
  //   console.log("\n========================================");
  //   console.log("TEST 3: STAC item serialization");
  //   console.log("========================================");
  //   console.log(`Collection ID: ${collectionId}`);

  //   const newItem = {
  //     type: "Feature",
  //     stac_version: "1.0.0",
  //     id: `test-item-${Date.now()}`,
  //     collection: collectionId, // Required field
  //     geometry: {
  //       type: "Polygon",
  //       coordinates: [
  //         [
  //           [-84.45, 33.62],
  //           [-84.4, 33.62],
  //           [-84.4, 33.66],
  //           [-84.45, 33.66],
  //           [-84.45, 33.62],
  //         ],
  //       ],
  //     },
  //     boundingBox: [-84.45, 33.62, -84.4, 33.66],
  //     properties: {
  //       datetime: "2021-11-14T00:00:00Z",
  //     },
  //     links: [
  //       {
  //         rel: "collection",
  //         type: "application/json",
  //         href: `https://planetarycomputer.microsoft.com/api/stac/v1/collections/${collectionId}`,
  //       },
  //     ],
  //     assets: {},
  //   };

  //   try {
  //     console.log("Creating item with structure:");
  //     console.log(JSON.stringify(newItem, null, 2));

  //     // Test passes if we can serialize and send the request without serialization errors
  //     // The LRO might fail for other reasons (permissions, validation, etc.) but that's okay
  //     try {
  //       await client.stac.createItem(collectionId, newItem as any);
  //       console.log("Item created successfully");
  //       console.log("✓ Test PASSED");
  //     } catch (error: any) {
  //       // If it's a serialization error (from our code), fail the test
  //       if (error.message?.includes("Cannot convert undefined or null to object")) {
  //         throw error;
  //       }
  //       // Otherwise, it's likely an API error which is okay for this test
  //       console.log(`API returned error (expected): ${error.message}`);
  //       console.log("✓ Test PASSED (serialization worked, API rejected for business reasons)");
  //     }
  //   } catch (error: any) {
  //     console.log(`✗ Test FAILED: ${error.message}`);
  //     console.log(`Error name: ${error.name}`);
  //     console.log(`Error details:`, JSON.stringify(error, null, 2));
  //     if (error.details) {
  //       console.log(`Error details object:`, error.details);
  //     }
  //     if (error.response) {
  //       console.log(`Response status: ${error.response.status}`);
  //       console.log(`Response body:`, error.response.body);
  //     }
  //     console.log(`Error stack: ${error.stack}`);
  //     throw error;
  //   }
  // });

  //   // Failure Mode 4: Collection Lifecycle
  //   it("Collection lifecycle - Create collection", async () => {
  //     console.log("\n========================================");
  //     console.log("TEST 4: Collection lifecycle failure");
  //     console.log("========================================");

  //     const testCollectionId = `test-collection-${Date.now()}`;
  //     const newCollection = {
  //       type: "Collection",
  //       id: testCollectionId,
  //       stac_version: "1.0.0",
  //       description: "Test collection for lifecycle operations",
  //       license: "proprietary",
  //       extent: {
  //         spatial: {
  //           bbox: [[-180, -90, 180, 90]],
  //         },
  //         temporal: {
  //           interval: [[new Date("2021-01-01T00:00:00Z"), null]],
  //         },
  //       },
  //       links: [],
  //     };

  //     try {
  //       console.log("Creating collection with structure:");
  //       console.log(JSON.stringify(newCollection, null, 2));

  //       await client.stac.createCollection(newCollection as any);
  //       console.log("Collection created successfully");

  //       // Verify creation
  //       const createdCollection = await client.stac.getCollection(testCollectionId);
  //       console.log(`Retrieved created collection: ${createdCollection.id}`);
  //       assert.isDefined(createdCollection, "Created collection should be retrievable");
  //       assert.equal(createdCollection.id, testCollectionId, "Created collection ID should match");
  //       console.log("✓ Test PASSED");
  //     } catch (error: any) {
  //       console.log(`✗ Test FAILED: ${error.message}`);
  //       console.log(`Error name: ${error.name}`);
  //       console.log(`Error stack: ${error.stack}`);
  //       throw error;
  //     }
  //   });

  //   // Failure Mode 5: SAS Token Download
  //   it("SAS token download - Download asset with signed URL", async () => {
  //     console.log("\n========================================");
  //     console.log("TEST 5: SAS token download failure");
  //     console.log("========================================");
  //     console.log(`Collection ID: ${collectionId}`);

  //     try {
  //       console.log("Calling getCollectionThumbnail...");

  //       // Get thumbnail from a collection
  //       const response = await client.stac.getCollectionThumbnail(collectionId);

  //       console.log(`Response type: ${typeof response}`);
  //       console.log(`Response has Symbol.asyncIterator: ${(response as any)?.[Symbol.asyncIterator] !== undefined}`);

  //       // Collect the streaming response
  //       const chunks: Buffer[] = [];
  //       for await (const chunk of response) {
  //         if (typeof chunk === "string") {
  //           chunks.push(Buffer.from(chunk, "binary"));
  //         } else if (typeof chunk === "number") {
  //           chunks.push(Buffer.from([chunk]));
  //         } else {
  //           chunks.push(Buffer.from(chunk as Uint8Array));
  //         }
  //       }

  //       const thumbnailBytes = Buffer.concat(chunks);
  //       console.log(`Thumbnail size: ${thumbnailBytes.length} bytes`);
  //       console.log(`First 32 bytes (hex): ${thumbnailBytes.subarray(0, 32).toString("hex")}`);

  //       // Verify we got data
  //       assert.isTrue(thumbnailBytes.length > 0, "Thumbnail should not be empty");
  //       assert.isTrue(thumbnailBytes.length > 100, "Thumbnail should be substantial");

  //       // Check if it's a valid image format
  //       const isPng = thumbnailBytes.subarray(0, 8).toString("hex") === "89504e470d0a1a0a";
  //       const isJpeg = thumbnailBytes.subarray(0, 3).toString("hex") === "ffd8ff";
  //       const isWebp =
  //         thumbnailBytes.subarray(0, 4).toString("hex") === "52494646" &&
  //         thumbnailBytes.subarray(8, 12).toString("hex") === "57454250";

  //       console.log(`Is PNG: ${isPng}`);
  //       console.log(`Is JPEG: ${isJpeg}`);
  //       console.log(`Is WebP: ${isWebp}`);

  //       assert.isTrue(
  //         isPng || isJpeg || isWebp,
  //         `Thumbnail should be a valid image format. First bytes: ${thumbnailBytes.subarray(0, 16).toString("hex")}`,
  //       );
  //       console.log("✓ Test PASSED");
  //     } catch (error: any) {
  //       console.log(`✗ Test FAILED: ${error.message}`);
  //       console.log(`Error stack: ${error.stack}`);
  //       throw error;
  //     }
  //   });
});
