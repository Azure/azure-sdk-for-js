// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";
import {
  ImageAnalysisClient,
  CaptionResultOutput,
  ImageAnalysisResultOutput,
  ImagePointOutput,
  ObjectsResultOutput,
  TagsResultOutput,
} from "../../src/index.js";
import { createRecorder } from "./utils/recordedClient";
import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createClient } from "./utils/clientMethods";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";

const key = assertEnvironmentVariable("VISION_KEY");
const KeyCredential = new AzureKeyCredential(key);

const credentials = [
  { credential: KeyCredential, title: "AzureKeyCredential" },
  { credential: createTestCredential(), title: "TokenCredential" }
];

describe("Analyze Tests", () => {
  credentials.forEach((credential) => {
    describe(`Using ${credential.title}`, () => {
      let recorder: Recorder;
      let client: ImageAnalysisClient;

      beforeEach(async function (this: Context) {
        recorder = await createRecorder(this);
        recorder.addSanitizers({
          headerSanitizers: [{ key: "Ocp-Apim-Subscription-Key", value: "***********" }],
          uriSanitizers: [{ target: "https://[a-zA-Z0-9-]*/", value: "https://endpoint/" }],
        });
        client = await createClient(recorder, credential.credential);
      });

      afterEach(async function () {
        await recorder?.stop();
      });

      async function downloadUrlToUint8Array(url: string): Promise<Uint8Array> {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to download content: ${response.status} ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        return new Uint8Array(buffer);
      }

      it("Analyze from URL", async function () {
        const allFeatures: string[] = [
          "Caption",
          "DenseCaptions",
          "Objects",
          "People",
          "Read",
          "SmartCrops",
          "Tags",
        ];

        const someFeatures: string[] = ["Caption", "Read"];

        const testFeaturesList: string[][] = [allFeatures, someFeatures];

        for (const testFeatures of testFeaturesList) {
          const result = await client.path("/imageanalysis:analyze").post({
            body: {
              url: "https://aka.ms/azsdk/image-analysis/sample.jpg",
            },
            queryParameters: {
              features: testFeatures,
              "smartCrops-aspect-ratios": [0.9, 1.33],
            },
            contentType: "application/json",
          });

          assert.isNotNull(result);
          assert.equal(result.status, "200");

          const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;

          validateResponse(iaResult, testFeatures, false);
        }
      });

      it("Analyze from Stream", async function () {
        const allFeatures: string[] = [
          "Caption",
          "DenseCaptions",
          "Objects",
          "People",
          "Read",
          "SmartCrops",
          "Tags",
        ];
        const someFeatures: string[] = ["Caption", "Read"];
        const url: string = "https://aka.ms/azsdk/image-analysis/sample.jpg";

        const data: Uint8Array = await downloadUrlToUint8Array(url);

        for (const testFeatures of [allFeatures, someFeatures]) {
          const result = await client.path("/imageanalysis:analyze").post({
            body: data,
            queryParameters: {
              features: testFeatures,
              "smartCrops-aspect-ratios": [0.9, 1.33],
            },
            contentType: "application/octet-stream",
          });

          assert.isNotNull(result);

          assert.equal(result.status, "200");

          const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;

          validateResponse(iaResult, testFeatures, false);
        }
      });

      function validateResponse(
        iaResult: ImageAnalysisResultOutput,
        testFeatures: string[],
        genderNeutral: boolean,
      ): void {
        validateMetadata(iaResult);

        const captionResult = iaResult.captionResult;
        if (testFeatures.includes("Caption")) {
          if (captionResult) {
            validateCaption(captionResult, genderNeutral);
          } else {
            assert.fail("captionResult is null");
          }
        } else {
          assert.isUndefined(captionResult);
        }

        if (testFeatures.includes("DenseCaptions")) {
          validateDenseCaptions(iaResult);
        } else {
          assert.isUndefined(iaResult.denseCaptionsResult);
        }

        const objectsResult = iaResult.objectsResult;
        if (testFeatures.includes("Objects")) {
          if (objectsResult) {
            validateObjectsResult(objectsResult);
          } else {
            assert.fail("objectsResult is null");
          }
        } else {
          assert.isUndefined(objectsResult);
        }

        if (testFeatures.includes("Tags")) {
          if (iaResult.tagsResult) {
            validateTags(iaResult.tagsResult);
          } else {
            assert.fail("tagsResult is null");
          }
        } else {
          assert.isUndefined(iaResult.tagsResult);
        }

        if (testFeatures.includes("People")) {
          validatePeopleResult(iaResult);
        } else {
          assert.isUndefined(iaResult.peopleResult);
        }

        if (testFeatures.includes("SmartCrops")) {
          validateSmartCrops(iaResult);
        } else {
          assert.isUndefined(iaResult.smartCropsResult);
        }

        const readResult = iaResult.readResult;
        if (!testFeatures.includes("Read")) {
          assert.isUndefined(readResult);
        } else {
          if (readResult) {
            validateReadResult(iaResult);
          } else {
            assert.fail("readResult is null");
          }
        }
      }

      function validateReadResult(result: ImageAnalysisResultOutput): void {
        const readResult = result.readResult;
        if (!readResult) throw new Error("Read result is null");

        const allText: string[] = [];
        let words = 0;
        let lines = 0;

        const pagePolygon: ImagePointOutput[] = [
          { x: 0, y: 0 },
          { x: 0, y: result.metadata.height },
          { x: result.metadata.width, y: result.metadata.height },
          { x: result.metadata.width, y: 0 },
        ];

        for (const block of readResult.blocks) {
          for (const oneLine of block.lines) {
            if (!oneLine.boundingPolygon.every((p) => isInPolygon(p, pagePolygon))) {
              throw new Error("Bounding polygon is not in the page polygon");
            }

            words += oneLine.words.length;
            lines++;
            allText.push(oneLine.text);
            for (const word of oneLine.words) {
              if (word.confidence <= 0 || word.confidence >= 1) {
                throw new Error("Invalid word confidence value");
              }
              if (!oneLine.text.includes(word.text)) {
                throw new Error("One line text does not contain word text");
              }
            }
          }
        }

        if (words !== 6) throw new Error("Words count is not equal to 6");
        if (lines !== 3) throw new Error("Lines count is not equal to 3");
        if (allText.join("\n") !== "Sample text\nHand writing\n123 456") {
          throw new Error("All text content is not equal to the expected value");
        }
      }

      function isInPolygon(suspectPoint: ImagePointOutput, polygon: ImagePointOutput[]): boolean {
        let intersectCount = 0;
        const points = [...polygon, polygon[0]];

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          if (
            p1.y > suspectPoint.y !== p2.y > suspectPoint.y &&
            suspectPoint.x < ((p2.x - p1.x) * (suspectPoint.y - p1.y)) / (p2.y - p1.y) + p1.x
          ) {
            intersectCount++;
          }
        }

        const result = intersectCount % 2 !== 0;

        if (!result) {
          console.log(`Point ${suspectPoint} is not in polygon ${polygon}`);
        }

        return result;
      }

      function validateMetadata(iaResult: ImageAnalysisResultOutput): void {
        assert.isAbove(iaResult.metadata.height, 0);
        assert.isAbove(iaResult.metadata.width, 0);
        assert.isFalse(iaResult.modelVersion.trim() === "");
      }

      function validateCaption(captionResult: CaptionResultOutput, genderNeutral: boolean): void {
        assert.isNotNull(captionResult);
        assert.isAbove(captionResult.confidence, 0);
        assert.isBelow(captionResult.confidence, 1);
        assert.isTrue(captionResult.text.toLowerCase().includes(genderNeutral ? "person" : "woman"));
        assert.isTrue(captionResult.text.toLowerCase().includes("table"));
        assert.isTrue(captionResult.text.toLowerCase().includes("laptop"));
      }

      function validateDenseCaptions(iaResult: ImageAnalysisResultOutput): void {
        const denseCaptionsResult = iaResult.denseCaptionsResult;

        assert.isNotNull(denseCaptionsResult);
        assert.isAtLeast(denseCaptionsResult!.values.length, 1);

        const firstCaption = denseCaptionsResult!.values[0];
        assert.isNotNull(firstCaption);
        assert.isNotNull(firstCaption.boundingBox);
        assert.strictEqual(firstCaption.boundingBox.w, iaResult.metadata.width);
        assert.strictEqual(firstCaption.boundingBox.h, iaResult.metadata.height);
        assert.isNotNull(firstCaption.text);
        if (iaResult.captionResult != null) {
          assert.strictEqual(iaResult.captionResult.text, firstCaption.text);
        }

        const boundingBoxes = new Set<string>();

        for (const oneDenseCaption of denseCaptionsResult!.values) {
          assert.isNotNull(oneDenseCaption.boundingBox);
          assert.isFalse(boundingBoxes.has(JSON.stringify(oneDenseCaption.boundingBox)));
          boundingBoxes.add(JSON.stringify(oneDenseCaption.boundingBox));

          assert.isNotNull(oneDenseCaption.text);

          assert.isAbove(oneDenseCaption.confidence, 0);
          assert.isBelow(oneDenseCaption.confidence, 1);
        }
      }

      function validateObjectsResult(objectsResult: ObjectsResultOutput): void {
        assert.isNotNull(objectsResult);
        assert.isAtLeast(objectsResult.values.length, 0);

        for (const oneObject of objectsResult.values) {
          assert.isNotNull(oneObject.boundingBox);
          assert.isTrue(
            oneObject.boundingBox.x > 0 ||
            oneObject.boundingBox.y > 0 ||
            oneObject.boundingBox.h > 0 ||
            oneObject.boundingBox.w > 0,
          );
          assert.isNotNull(oneObject.tags);
          for (const oneTag of oneObject.tags) {
            assert.isFalse(oneTag.name.trim() === "");
            assert.isAbove(oneTag.confidence, 0);
            assert.isBelow(oneTag.confidence, 1);
          }
        }

        assert.isAtLeast(
          objectsResult.values.filter((v) => v.tags.filter((t) => t.name.toLowerCase() === "person"))
            .length,
          0,
        );
      }

      function validateTags(tagsResult: TagsResultOutput): void {
        assert.isNotNull(tagsResult);
        assert.isNotNull(tagsResult.values);
        assert.isAtLeast(tagsResult.values.length, 0);

        let found = 0;
        const tagNames = new Set<string>();

        for (const oneTag of tagsResult.values) {
          assert.isAbove(oneTag.confidence, 0);
          assert.isBelow(oneTag.confidence, 1);

          assert.isFalse(oneTag.name.trim() === "");
          if (["person", "woman", "laptop", "cat", "canidae"].includes(oneTag.name.toLowerCase())) {
            found++;
          }
console.log(oneTag.name);
          assert.isFalse(tagNames.has(oneTag.name));
          tagNames.add(oneTag.name);
        }

        assert.isAtLeast(found, 2);
      }

      function validatePeopleResult(iaResult: ImageAnalysisResultOutput): void {
        const peopleResult = iaResult.peopleResult;

        assert.isNotNull(peopleResult);
        assert.isAtLeast(peopleResult!.values.length, 0);

        const boundingBoxes = new Set<string>();

        for (const onePerson of peopleResult!.values) {
          assert.isNotNull(onePerson.boundingBox);
          assert.isFalse(boundingBoxes.has(JSON.stringify(onePerson.boundingBox)));
          boundingBoxes.add(JSON.stringify(onePerson.boundingBox));

          assert.isAbove(onePerson.confidence, 0);
          assert.isBelow(onePerson.confidence, 1);
        }
      }

      function validateSmartCrops(iaResult: ImageAnalysisResultOutput): void {
        const smartCropsResult = iaResult.smartCropsResult;
        assert.isNotNull(smartCropsResult);

        assert.isNotNull(smartCropsResult!.values);
        assert.strictEqual(smartCropsResult!.values.length, 2);

        const boundingBoxes = new Set<string>();

        for (const oneCrop of smartCropsResult!.values) {
          assert.isFalse(boundingBoxes.has(JSON.stringify(oneCrop.boundingBox)));
          boundingBoxes.add(JSON.stringify(oneCrop.boundingBox));
        }
      }
    });
  });
});