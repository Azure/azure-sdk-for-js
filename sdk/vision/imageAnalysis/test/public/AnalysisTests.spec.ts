import { assert } from "chai";
import { Context } from "mocha";
import {
  ImageAnalysisClient,
  CaptionResultOutput,
  ImageAnalysisResultOutput,
  ReadResultOutput,
  ObjectsResultOutput,
  TagsResultOutput,
} from "../../src/index.js";
import * as fs from "fs";
import { createClient, createRecorder } from "./utils/recordedClient";
import { Recorder } from "@azure-tools/test-recorder";

describe("Analyze Tests", () => {
  let recorder: Recorder;
  let client: ImageAnalysisClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder?.stop();
  });

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

    const someFeatures: string[] = [
      "Caption",
      "Read",
    ];

    const testFeaturesList: string[][] = [allFeatures, someFeatures];

    for (const testFeatures of testFeaturesList) {
      const result = await client.path("/imageanalysis:analyze").post(
        {
          body:
          {
            url: "https://aka.ms/azai/vision/image-analysis-sample.jpg"
          },
          queryParameters:
          {
            features: testFeatures,
            "smartCrops-aspect-ratios": [0.9, 1.33]
          },
          contentType: "application/json"
        }
      );

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

    const fileLocation = process.env.TEST_IMAGE_INPUT_PATH ? process.env.TEST_IMAGE_INPUT_PATH : "./test/image-analysis-sample.jpg";

    for (const testFeatures of [allFeatures, someFeatures]) {
      const fileStream = fs.readFileSync(fileLocation);
      const result = await client.path("/imageanalysis:analyze").post(
        {
          body: new Uint8Array(fileStream),
          queryParameters: {
            features: testFeatures,
            "smartCrops-aspect-ratios": [0.9, 1.33],
          },
          contentType: "application/octet-stream"
        }
      );

      assert.isNotNull(result);

      assert.equal(result.status, "200");
      
      const iaResult: ImageAnalysisResultOutput = result.body as ImageAnalysisResultOutput;
      
      validateResponse(iaResult, testFeatures, false);
    }
  });

  function validateResponse(
    iaResult: ImageAnalysisResultOutput,
    testFeatures: string[],
    genderNeutral: boolean
  ) {
    validateMetadata(iaResult);

    const captionResult = iaResult.captionResult;
    if (testFeatures.includes("Caption")) {
      captionResult ? validateCaption(captionResult, genderNeutral) : assert.fail("captionResult is null");
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
      objectsResult ? validateObjectsResult(objectsResult) : assert.fail("objectsResult is null");
    } else {
      assert.isUndefined(objectsResult);
    }

    if (testFeatures.includes("Tags")) {
      iaResult.tagsResult ? validateTags(iaResult.tagsResult) : assert.fail("tagsResult is null");
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
      readResult ? validateReadResult(readResult) : assert.fail("readResult is null");
    }
  }

  function validateReadResult(readResult: ReadResultOutput) {
    assert.isNotNull(readResult);
    assert.isFalse(readResult.modelVersion.trim() === "");
    assert.isFalse(readResult.content.trim() === "");
    for (const onePage of readResult.pages) {
      assert.isTrue(onePage.height > 0 || onePage.width > 0);
      for (const oneLine of onePage.lines) {
        assert.isNotNull(oneLine.boundingBox);
        const nonZero = oneLine.boundingBox.some((point) => point !== 0);
        assert.isTrue(nonZero);

        assert.isFalse(oneLine.content.trim() === "");
      }
    }
  }

  function validateMetadata(iaResult: ImageAnalysisResultOutput) {
    assert.isAbove(iaResult.metadata.height, 0);
    assert.isAbove(iaResult.metadata.width, 0);
    assert.isFalse(iaResult.modelVersion.trim() === "");
  }

  function validateCaption(
    captionResult: CaptionResultOutput,
    genderNeutral: boolean
  ) {
    assert.isNotNull(captionResult);
    assert.isAbove(captionResult.confidence, 0);
    assert.isBelow(captionResult.confidence, 1);
    assert.isTrue(
      captionResult.text
        .toLowerCase()
        .includes(genderNeutral ? "person" : "woman")
    );
    assert.isTrue(captionResult.text.toLowerCase().includes("table"));
    assert.isTrue(captionResult.text.toLowerCase().includes("laptop"));
  }

  function validateDenseCaptions(iaResult: ImageAnalysisResultOutput) {
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

    const captions = new Set<string>();
    const boundingBoxes = new Set<string>();

    for (const oneDenseCaption of denseCaptionsResult!.values) {
      assert.isNotNull(oneDenseCaption.boundingBox);
      assert.isFalse(boundingBoxes.has(JSON.stringify(oneDenseCaption.boundingBox)));
      boundingBoxes.add(JSON.stringify(oneDenseCaption.boundingBox));

      assert.isNotNull(oneDenseCaption.text);
      assert.isFalse(captions.has(oneDenseCaption.text));
      captions.add(oneDenseCaption.text);

      assert.isAbove(oneDenseCaption.confidence, 0);
      assert.isBelow(oneDenseCaption.confidence, 1);
    }
  }

  function validateObjectsResult(objectsResult: ObjectsResultOutput) {
    assert.isNotNull(objectsResult);
    assert.isAtLeast(objectsResult.values.length, 0);

    for (const oneObject of objectsResult.values) {
      assert.isNotNull(oneObject.boundingBox);
      assert.isTrue(oneObject.boundingBox.x > 0 || oneObject.boundingBox.y > 0 || oneObject.boundingBox.h > 0 || oneObject.boundingBox.w > 0);
      assert.isNotNull(oneObject.tags);
      for (const oneTag of oneObject.tags) {
        assert.isFalse(oneTag.name.trim() === "");
        assert.isAbove(oneTag.confidence, 0);
        assert.isBelow(oneTag.confidence, 1);
      }
    }

    assert.isAtLeast(objectsResult.values.filter(v => v.tags.filter(t => t.name.toLowerCase() === "person")).length, 0);
  }

  function validateTags(tagsResult: TagsResultOutput) {
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

      assert.isFalse(tagNames.has(oneTag.name));
      tagNames.add(oneTag.name);
    }

    assert.isAtLeast(found, 2);
  }

  function validatePeopleResult(iaResult: ImageAnalysisResultOutput) {
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

  function validateSmartCrops(iaResult: ImageAnalysisResultOutput) {
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
