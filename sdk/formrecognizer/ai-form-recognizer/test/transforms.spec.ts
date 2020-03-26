// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { toTextLine, toRawExtractedPage, toExtractedElement, toKeyValueElement, toKeyValuePair, toFieldValue } from "../src/transforms"
import { ReadResult as ReadResultModel, FieldValue as FieldValueModel } from "../src/generated/models"
import { StringFieldValue, DateFieldValue, TimeFieldValue, PhoneNumberFieldValue, NumberFieldValue, IntegerFieldValue, ArrayFieldValue, ObjectFieldValue } from '../src/models';

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

  const rawExtractedPages = [
    originalReadResult1,
    originalReadResult2
  ].map(toRawExtractedPage);

  it("toExtractedElement() converts line string reference to extracted line", () => {
    const stringRef = "#/readResults/1/lines/1";

    const transformed = toExtractedElement(stringRef, rawExtractedPages);

    assert.deepStrictEqual(transformed, rawExtractedPages[1].lines![1]);
  });

  const originalKeyValueElement1 = {
    text: "keyvalue element text",
    boundingBox: [1,2,3,4,5,6,7,8],
    elements: [
      "#/readResults/0/lines/0/words/0",
      "#/readResults/0/lines/0/words/1"
    ]
  };

  it("toKeyValueElement() converts original KeyValueElementModel", () => {
    const transformed = toKeyValueElement(originalKeyValueElement1, rawExtractedPages);

    assert.equal(transformed.text, originalKeyValueElement1.text);
    assert.deepStrictEqual(transformed.boundingBox, originalKeyValueElement1.boundingBox);
    assert.deepStrictEqual(transformed.elements![0], rawExtractedPages[0].lines![0].words[0])
    assert.deepStrictEqual(transformed.elements![1], rawExtractedPages[0].lines![0].words[1])
  });

  it("toKeyValuePair() converts original key value pair", () => {
    const original = {
      label: "key value pair 1 label",
      confidence: 0.999,
      key: originalKeyValueElement1,
      value: originalKeyValueElement1
    };

    const transformed = toKeyValuePair(original, rawExtractedPages);

    assert.equal(transformed.label, original.label);
    assert.equal(transformed.confidence, original.confidence);
    assert.deepStrictEqual(transformed.name.boundingBox, original.key.boundingBox);
    assert.deepStrictEqual(transformed.value.boundingBox, original.value.boundingBox);
    assert.deepStrictEqual(transformed.name.elements![0], rawExtractedPages[0].lines![0].words[0]);
    assert.deepStrictEqual(transformed.value.elements![1], rawExtractedPages[0].lines![0].words[1]);
  });

  describe("toFieldValue()", () => {
    const commonProperties = {
      text: "field value text",
      boudningBox: [1, 2, 3, 4, 5, 6, 7, 8],
      confidence: 0.9999,
      elements: [
        "#/readResults/0/lines/0/words/0",
        "#/readResults/0/lines/0/words/1"
      ]
    }

    it("converts field value of string", () => {
      const original: FieldValueModel = {
        type: "string",
        valueString: "string value",
        ...commonProperties
      };

      const transformed = toFieldValue(original, rawExtractedPages);

      assert.equal(transformed.type, "string");
      assert.equal(transformed.value, original.valueString);
      assert.equal((transformed as StringFieldValue).text, original.text);
    });

    it("converts field value of date", () => {
      const original: FieldValueModel = {
        type: "date",
        valueDate: "date value",
        ...commonProperties
      };

      const transformed = toFieldValue(original, rawExtractedPages);

      assert.equal(transformed.type, "date");
      assert.equal(transformed.value, original.valueDate);
      assert.equal((transformed as DateFieldValue).text, original.text);
    });

    it("converts field value of time", () => {
      const original: FieldValueModel = {
        type: "time",
        valueTime: "time value",
        ...commonProperties
      };

      const transformed = toFieldValue(original, rawExtractedPages);

      assert.equal(transformed.type, "time");
      assert.equal(transformed.value, original.valueTime);
      assert.equal((transformed as TimeFieldValue).text, original.text);
    });

    it("converts field value of phoneNumber", () => {
      const original: FieldValueModel = {
        type: "phoneNumber",
        valuePhoneNumber: "phoneNumber value",
        ...commonProperties
      };

      const transformed = toFieldValue(original, rawExtractedPages);

      assert.equal(transformed.type, "phoneNumber");
      assert.equal(transformed.value, original.valuePhoneNumber);
      assert.equal((transformed as PhoneNumberFieldValue).text, original.text);
    });

    it("converts field value of number", () => {
      const original: FieldValueModel = {
        type: "number",
        valueNumber: 2.2,
        ...commonProperties
      };

      const transformed = toFieldValue(original, rawExtractedPages);

      assert.equal(transformed.type, "number");
      assert.equal(transformed.value, original.valueNumber);
      assert.equal((transformed as NumberFieldValue).text, original.text);
    });

    it("converts field value of integer", () => {
      const original: FieldValueModel = {
        type: "integer",
        valueInteger: 1,
        ...commonProperties
      };

      const transformed = toFieldValue(original, rawExtractedPages);

      assert.equal(transformed.type, "integer");
      assert.equal(transformed.value, original.valueInteger);
      assert.equal((transformed as IntegerFieldValue).text, original.text);
    });

    it("converts field value of array", () => {
      const originalDate: FieldValueModel = {
            type: "date",
            valueDate: "date value",
            ...commonProperties
        };
      const originalInteger: FieldValueModel = {
            type: "integer",
            valueInteger: 1,
            ...commonProperties
        };
      const original: FieldValueModel = {
        type: "array",
        valueArray: [
          originalDate,
          originalInteger
        ]};

      const transformed = toFieldValue(original, rawExtractedPages);

      assert.equal(transformed.type, "array");

      const array = (transformed as ArrayFieldValue).value;
      assert.equal(array![0].type, "date");
      assert.equal(array![0].value, originalDate.valueDate);
      assert.equal((array![0] as DateFieldValue).text, originalDate.text);
      assert.deepStrictEqual(
        (array![0] as DateFieldValue).elements![0],
        rawExtractedPages[0].lines![0].words[0]);
      assert.equal(array![1].type, "integer");
      assert.equal(array![1].value, originalInteger.valueInteger);
      assert.equal((array![1] as DateFieldValue).text, originalDate.text);
    });

    it("converts field value of object", () => {
      const originalDate: FieldValueModel = {
        type: "date",
        valueDate: "date value",
        ...commonProperties
      };
      const originalInteger: FieldValueModel = {
        type: "integer",
        valueInteger: 1,
        ...commonProperties
      };
      const original: FieldValueModel = {
        type: "object",
        valueObject: {
          dateProperty: originalDate,
          integerProperty: originalInteger
        }
      };

      const transformed = toFieldValue(original, rawExtractedPages);

      assert.equal(transformed.type, "object");

      const obj = (transformed as ObjectFieldValue);
      assert.equal(obj.type, "object");
      assert.equal(obj.value!["dateProperty"].value, originalDate.valueDate);
      assert.equal(obj.value!["integerProperty"].value, originalInteger.valueInteger);
    });
  });
});
