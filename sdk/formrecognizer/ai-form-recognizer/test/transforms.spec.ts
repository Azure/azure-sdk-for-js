// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { toTextLine, toRawExtractedPage, toExtractedElement, toKeyValueElement } from "../src/transforms"
import { ReadResult as ReadResultModel } from "../src/generated/models"

describe("Transforms", () => {
  const originalLine1 = {
    text: "line 1 text",
    boundingBox: [1, 2, 3, 4, 5, 6, 7, 8],
    words: [
      {
        text: "word text 1",
        boundingBox: [2, 3, 4, 5, 6, 7, 8, 9],
        confidence: 0.9,
      },
      {
        text: "word text 2",
        boundingBox: [3, 4, 5, 6, 7, 8, 9, 10],
        confidence: 0.99,
      },
    ]
  };

  const pageNumber = 1;

  it("toTextLine() converts original TextLineModel", () => {
    const transformed = toTextLine(originalLine1, pageNumber);

    assert.equal(transformed.kind, "line");
    assert.equal(transformed.pageNumber, pageNumber);
    assert.deepStrictEqual(transformed.text, originalLine1.text);
    assert.deepStrictEqual(transformed.boundingBox, originalLine1.boundingBox);

    assert.deepStrictEqual(transformed.words[0].kind, "word");
    assert.deepStrictEqual(transformed.words[0].text, originalLine1.words[0].text);
    assert.deepStrictEqual(transformed.words[0].confidence, originalLine1.words[0].confidence);
    assert.deepStrictEqual(transformed.words[0].pageNumber, pageNumber);
    assert.deepStrictEqual(transformed.words[1].kind, "word");
    assert.deepStrictEqual(transformed.words[1].text, originalLine1.words[1].text);
    assert.deepStrictEqual(transformed.words[1].confidence, originalLine1.words[1].confidence);
    assert.deepStrictEqual(transformed.words[1].pageNumber, pageNumber);

    assert.equal(transformed.words[0].containingLine, transformed);
    assert.equal(transformed.words[1].containingLine, transformed);
  });

  const originalLine2 = {
    text: "line 2 text",
    boundingBox: [1, 2, 3, 4, 5, 6, 7, 8],
    words: [
      {
        text: "word text 1",
        boundingBox: [2, 3, 4, 5, 6, 7, 8, 9],
        confidence: 0.9,
      },
      {
        text: "word text 2",
        boundingBox: [3, 4, 5, 6, 7, 8, 9, 10],
        confidence: 0.99,
      },
    ]
  };

  const originalReadResult1: ReadResultModel = {
    pageNumber: 1,
    angle: 0.2,
    width: 100,
    height: 200,
    unit: "pixel",
    lines: [
      originalLine1
    ]
  };

  it("toRawExtractedPage() converts original ReadResultModel", () => {

    const transformed = toRawExtractedPage(originalReadResult1);

    assert.equal(transformed.pageNumber, originalReadResult1.pageNumber);
    assert.equal(transformed.angle, originalReadResult1.angle);
    assert.equal(transformed.width, originalReadResult1.width);
    assert.equal(transformed.height, originalReadResult1.height);
    assert.equal(transformed.unit, originalReadResult1.unit);
  });

  const originalReadResult2: ReadResultModel = {
    pageNumber: 1,
    angle: 0.2,
    width: 100,
    height: 200,
    unit: "pixel",
    lines: [
      originalLine1,
      originalLine2
    ]
  };

  it("toExtractedElement() converts word string reference to extracted word", () => {
    const stringRef = "#/readResults/0/lines/0/words/0";
    const readResults = [
      originalReadResult1,
      originalReadResult2
    ].map(toRawExtractedPage);

    const transformed = toExtractedElement(stringRef, readResults);

    assert.deepStrictEqual(transformed, readResults[0].lines![0].words[0]);
  });

  it("toExtractedElement() converts line string reference to extracted line", () => {
    const stringRef = "#/readResults/1/lines/1";
    const readResults = [
      originalReadResult1,
      originalReadResult2
    ].map(toRawExtractedPage);

    const transformed = toExtractedElement(stringRef, readResults);
    assert.deepStrictEqual(transformed, readResults[1].lines![1]);
  });

  it("toKeyValueElement() converts original KeyValueElementModel", () => {
    const original = {
      text: "keyvalue element text",
      boundingBox: [1,2,3,4,5,6,7,8],
      elements: [
        "#/readResults/0/lines/0/words/0",
        "#/readResults/0/lines/0/words/1"
      ]
    };

    const rawExtractedPages = [originalReadResult1].map(toRawExtractedPage);
    const transformed = toKeyValueElement(original, rawExtractedPages);

    assert.equal(transformed.text, original.text);
    assert.deepStrictEqual(transformed.boundingBox, original.boundingBox);
    assert.deepStrictEqual(transformed.elements![0], rawExtractedPages[0].lines![0].words[0])
    assert.deepStrictEqual(transformed.elements![1], rawExtractedPages[0].lines![0].words[1])
  });

  it("toKeyValuePair() converts original key value pair", () => {

  });
});
