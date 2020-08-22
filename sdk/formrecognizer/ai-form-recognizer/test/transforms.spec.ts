// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-use-before-define */
import { assert } from "chai";
import {
  toTextLine,
  toFormPage,
  toFormContent,
  toFieldData,
  toFormFieldFromKeyValuePairModel,
  toFormFieldFromFieldValueModel,
  toFieldsFromFieldValue,
  toFormTable,
  toRecognizeFormResultResponse,
  toFormModelResponse,
  toRecognizedForm,
  toRecognizeFormResultResponseFromReceipt
} from "../src/transforms";
import {
  GeneratedClientGetAnalyzeFormResultResponse as GetAnalyzeFormResultResponse,
  GeneratedClientGetAnalyzeReceiptResultResponse as GetAnalyzeReceiptResultResponse,
  GeneratedClientGetCustomModelResponse as GetCustomModelResponse,
  ReadResult as ReadResultModel,
  FieldValue as FieldValueModel,
  DataTable as DataTableModel,
  DocumentResult as DocumentResultModel
} from "../src/generated/models";
import { Point2D, FormField } from "../src/models";

describe("Transforms", () => {
  function verifyBoundingBox(transformed: Point2D[], original: number[]): void {
    assert.equal(transformed[0].x, original[0], "Expect transform[0].x to equal original[0]");
    assert.equal(transformed[0].y, original[1], "Expect transform[0].y to equal original[1]");
    assert.equal(transformed[1].x, original[2], "Expect transform[1].x to equal original[2]");
    assert.equal(transformed[1].y, original[3], "Expect transform[1].y to equal original[3]");
    assert.equal(transformed[2].x, original[4], "Expect transform[2].x to equal original[4]");
    assert.equal(transformed[2].y, original[5], "Expect transform[2].y to equal original[5]");
    assert.equal(transformed[3].x, original[6], "Expect transform[3].x to equal original[6]");
    assert.equal(transformed[3].y, original[7], "Expect transform[3].y to equal original[7]");
  }
  const originalLine1 = {
    text: "line 1 text",
    boundingBox: [1, 2, 3, 4, 5, 6, 7, 8],
    words: [
      {
        text: "word text 1",
        boundingBox: [2, 3, 4, 5, 6, 7, 8, 9],
        confidence: 0.9
      },
      {
        text: "word text 2",
        boundingBox: [3, 4, 5, 6, 7, 8, 9, 10],
        confidence: 0.99
      }
    ]
  };

  const pageNumber = 1;

  it("toTextLine() converts original TextLineModel", () => {
    const transformed = toTextLine(originalLine1, pageNumber);

    assert.equal(transformed.kind, "line");
    assert.equal(transformed.pageNumber, pageNumber);
    assert.deepStrictEqual(transformed.text, originalLine1.text);
    verifyBoundingBox(transformed.boundingBox, originalLine1.boundingBox);

    assert.deepStrictEqual(transformed.words[0].kind, "word");
    assert.deepStrictEqual(transformed.words[0].text, originalLine1.words[0].text);
    assert.deepStrictEqual(transformed.words[0].confidence, originalLine1.words[0].confidence);
    assert.deepStrictEqual(transformed.words[0].pageNumber, pageNumber);
    assert.deepStrictEqual(transformed.words[1].kind, "word");
    assert.deepStrictEqual(transformed.words[1].text, originalLine1.words[1].text);
    assert.deepStrictEqual(transformed.words[1].confidence, originalLine1.words[1].confidence);
    assert.deepStrictEqual(transformed.words[1].pageNumber, pageNumber);
  });

  const originalLine2 = {
    text: "line 2 text",
    boundingBox: [1, 2, 3, 4, 5, 6, 7, 8],
    words: [
      {
        text: "word text 1",
        boundingBox: [2, 3, 4, 5, 6, 7, 8, 9],
        confidence: 0.9
      },
      {
        text: "word text 2",
        boundingBox: [3, 4, 5, 6, 7, 8, 9, 10],
        confidence: 0.99
      }
    ]
  };

  const originalReadResult1: ReadResultModel = {
    pageNumber: 1,
    angle: 0.2,
    width: 100,
    height: 200,
    unit: "pixel",
    lines: [originalLine1]
  };

  it("toRawExtractedPage() converts original ReadResultModel", () => {
    const transformed = toFormPage(originalReadResult1);

    assert.equal(transformed.pageNumber, originalReadResult1.pageNumber);
    assert.equal(transformed.textAngle, originalReadResult1.angle);
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
    lines: [originalLine1, originalLine2]
  };

  it("toExtractedElement() converts word string reference to extracted word", () => {
    const stringRef = "#/readResults/0/lines/0/words/0";
    const readResults = [originalReadResult1, originalReadResult2].map(toFormPage);

    const transformed = toFormContent(stringRef, readResults);

    assert.deepStrictEqual(transformed, readResults[0].lines![0].words[0]);
  });

  const formPages = [originalReadResult1, originalReadResult2].map(toFormPage);

  it("toExtractedElement() converts line string reference to extracted line", () => {
    const stringRef = "#/readResults/1/lines/1";

    const transformed = toFormContent(stringRef, formPages);

    assert.deepStrictEqual(transformed, formPages[1].lines![1]);
  });

  const originalKeyValueElement1 = {
    text: "keyvalue element text",
    boundingBox: [1, 2, 3, 4, 5, 6, 7, 8],
    elements: ["#/readResults/0/lines/0/words/0", "#/readResults/0/lines/0/words/1"]
  };

  it("toKeyValueElement() converts original KeyValueElementModel", () => {
    const transformed = toFieldData(0, originalKeyValueElement1, formPages);

    assert.equal(transformed.pageNumber, 0);
    assert.equal(transformed.text, originalKeyValueElement1.text);
    assert.ok(transformed.boundingBox);
    verifyBoundingBox(transformed.boundingBox!, originalKeyValueElement1.boundingBox);
    assert.deepStrictEqual(transformed.fieldElements![0], formPages[0].lines![0].words[0]);
    assert.deepStrictEqual(transformed.fieldElements![1], formPages[0].lines![0].words[1]);
  });

  it("toKeyValuePair() converts original key value pair", () => {
    const original = {
      label: "key value pair 1 label",
      confidence: 0.999,
      key: originalKeyValueElement1,
      value: originalKeyValueElement1
    };

    const transformed = toFormFieldFromKeyValuePairModel(1, original, formPages);

    assert.equal(transformed.name, original.label);
    assert.equal(transformed.confidence, original.confidence);
    assert.ok(transformed.labelData);
    assert.ok(transformed.labelData!.boundingBox);
    assert.equal(transformed.labelData!.pageNumber, 1);
    assert.ok(transformed.valueData);
    assert.equal(transformed.valueData!.pageNumber, 1);
    assert.ok(transformed.valueData!.boundingBox);
    verifyBoundingBox(transformed.labelData!.boundingBox!, original.key.boundingBox);
    verifyBoundingBox(transformed.valueData!.boundingBox!, original.value.boundingBox);
    assert.deepStrictEqual(
      transformed.labelData!.fieldElements![0],
      formPages[0].lines![0].words[0]
    );
    assert.deepStrictEqual(
      transformed.valueData!.fieldElements![1],
      formPages[0].lines![0].words[1]
    );
  });

  const commonProperties = {
    text: "field value text",
    boudningBox: [1, 2, 3, 4, 5, 6, 7, 8],
    confidence: 0.9999,
    elements: ["#/readResults/0/lines/0/words/0", "#/readResults/0/lines/0/words/1"]
  };

  describe("toFormFieldFromFieldValueModel()", () => {
    it("converts field value of string", () => {
      const original: FieldValueModel = {
        type: "string",
        valueString: "string value",
        ...commonProperties
      };

      const transformed = toFormFieldFromFieldValueModel(original, "keyName", formPages);

      assert.equal(transformed.name, "keyName");
      assert.equal(transformed.valueType, "string");
      assert.equal(transformed.value, original.valueString);
      assert.ok(transformed.valueData, "Expecting valid 'transformed.valueData'");
      assert.equal(transformed.valueData!.text, original.text);
    });

    it("converts field value of date", () => {
      const original: FieldValueModel = {
        type: "date",
        valueDate: new Date(1999, 9, 9),
        ...commonProperties
      };

      const transformed = toFormFieldFromFieldValueModel(original, "keyName", formPages);

      assert.equal(transformed.name, "keyName");
      assert.equal(transformed.valueType, "date");
      assert.equal(transformed.value, original.valueDate);
      assert.ok(transformed.valueData, "Expecting valid 'transformed.valueData'");
      assert.equal(transformed.valueData!.text, original.text);
    });

    it("converts field value of time", () => {
      const original: FieldValueModel = {
        type: "time",
        valueTime: "time value",
        ...commonProperties
      };

      const transformed = toFormFieldFromFieldValueModel(original, "keyName", formPages);

      assert.equal(transformed.name, "keyName");
      assert.equal(transformed.valueType, "time");
      assert.equal(transformed.value, original.valueTime);
      assert.ok(transformed.valueData, "Expecting valid 'transformed.valueData'");
      assert.equal(transformed.valueData!.text, original.text);
    });

    it("converts field value of phoneNumber", () => {
      const original: FieldValueModel = {
        type: "phoneNumber",
        valuePhoneNumber: "phoneNumber value",
        ...commonProperties
      };

      const transformed = toFormFieldFromFieldValueModel(original, "keyName", formPages);

      assert.equal(transformed.valueType, "phoneNumber");
      assert.equal(transformed.value, original.valuePhoneNumber);
      assert.ok(transformed.valueData, "Expecting valid 'transformed.valueData'");
      assert.equal(transformed.valueData!.text, original.text);
    });

    it("converts field value of number", () => {
      const original: FieldValueModel = {
        type: "number",
        valueNumber: 2.2,
        ...commonProperties
      };

      const transformed = toFormFieldFromFieldValueModel(original, "keyName", formPages);

      assert.equal(transformed.valueType, "number");
      assert.equal(transformed.value, original.valueNumber);
      assert.ok(transformed.valueData, "Expecting valid 'transformed.valueData'");
      assert.equal(transformed.valueData!.text, original.text);
    });

    it("converts field value of integer", () => {
      const original: FieldValueModel = {
        type: "integer",
        valueInteger: 1,
        ...commonProperties
      };

      const transformed = toFormFieldFromFieldValueModel(original, "keyName", formPages);

      assert.equal(transformed.valueType, "integer");
      assert.equal(transformed.value, original.valueInteger);
      assert.ok(transformed.valueData, "Expecting valid 'transformed.valueData'");
      assert.equal(transformed.valueData!.text, original.text);
    });

    it("converts field value of array", () => {
      const originalDate: FieldValueModel = {
        type: "date",
        valueDate: new Date(1999, 9, 9),
        ...commonProperties
      };
      const originalInteger: FieldValueModel = {
        type: "integer",
        valueInteger: 1,
        ...commonProperties
      };
      const original: FieldValueModel = {
        type: "array",
        valueArray: [originalDate, originalInteger]
      };

      const transformed = toFormFieldFromFieldValueModel(original, "keyName", formPages);

      assert.equal(transformed.valueType, "array");

      const array = transformed.value as FormField[];
      assert.equal(array![0].valueType, "date");
      assert.equal(array![0].value, originalDate.valueDate);
      assert.ok(array![0].valueData, "Expecting valid 'transformed.valueData'");
      assert.equal(array![0].valueData!.text, originalDate.text);
      assert.deepStrictEqual(
        array![0].valueData!.fieldElements![0],
        formPages[0].lines![0].words[0]
      );
      assert.equal(array![1].valueType, "integer");
      assert.equal(array![1].value, originalInteger.valueInteger);
      assert.ok(array![1].valueData, "Expecting valid 'transformed.valueData'");
      assert.equal(array![1].valueData!.text, originalInteger.text);
    });

    it("converts field value of object", () => {
      const originalDate: FieldValueModel = {
        type: "date",
        valueDate: new Date(1999, 9, 9),
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

      const transformed = toFormFieldFromFieldValueModel(original, "keyName", formPages);

      assert.equal(transformed.valueType, "object");

      const obj = transformed.value as { [proertyName: string]: FormField };
      assert.ok(obj, "Expecting valid transformed.value");
      assert.equal(obj!["dateProperty"].value, originalDate.valueDate);
      assert.equal(obj!["integerProperty"].value, originalInteger.valueInteger);
    });
  });

  it("toFieldsFromFieldValue() handles missing field", () => {
    const originalInteger: FieldValueModel = {
      type: "integer",
      valueInteger: 1,
      ...commonProperties
    };
    const original: { [propertyName: string]: FieldValueModel } = {
      integerProperty: originalInteger
    };
    Object.assign(original, {
      integerProperty: originalInteger,
      missingField: null
    });

    const transformed = toFieldsFromFieldValue(original, formPages);

    assert.ok(transformed.integerProperty, "Expecting valid integerField");
    assert.ok(transformed.missingField, "Expecting valid missingField");
    assert.equal(transformed.missingField.name, "missingField");
    assert.equal(
      transformed.missingField.confidence,
      undefined,
      "Expecting missingField has undefined confidence"
    );
    assert.equal(
      transformed.missingField.labelData,
      undefined,
      "Expecting missingField has undefined labelData"
    );
    assert.equal(
      transformed.missingField.value,
      undefined,
      "Expecting missingField has undefined value"
    );
    assert.equal(
      transformed.missingField.valueData,
      undefined,
      "Expecting missingField has undefined valueData"
    );
    assert.equal(
      transformed.missingField.valueType,
      undefined,
      "Expecting missingField has undefined valueType"
    );
  });

  it("toTable() converts original data table", () => {
    const originalTable: DataTableModel = {
      rows: 3,
      columns: 2,
      cells: [
        {
          text: "r0c0",
          columnIndex: 0,
          confidence: 0.1,
          rowIndex: 0,
          boundingBox: [1, 2, 3, 4, 5, 6, 7, 8],
          isHeader: true
        },
        {
          text: "r0c1",
          columnIndex: 1,
          confidence: 0.2,
          rowIndex: 0,
          boundingBox: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
          text: "r1c0",
          columnIndex: 0,
          confidence: 0.3,
          rowIndex: 1,
          boundingBox: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
          text: "r1c1",
          columnIndex: 1,
          confidence: 0.4,
          rowIndex: 1,
          boundingBox: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
          text: "r2c0",
          columnIndex: 0,
          confidence: 0.3,
          rowIndex: 2,
          boundingBox: [1, 2, 3, 4, 5, 6, 7, 8],
          columnSpan: 2,
          isFooter: true
        }
      ]
    };

    const transformed = toFormTable(originalTable, formPages, 1);

    assert.equal(transformed.rowCount, originalTable.rows);
    assert.equal(transformed.pageNumber, 1);
    assert.equal(transformed.cells[0].text, originalTable.cells[0].text);
    assert.equal(transformed.cells[3].confidence, originalTable.cells[3].confidence);

    assert.equal(transformed.cells[0].pageNumber, 1);
    assert.equal(transformed.cells[0].isHeader, true);
    assert.equal(transformed.cells[0].isFooter, false);
    assert.equal(transformed.cells[0].rowSpan, 1);
    assert.equal(transformed.cells[0].columnSpan, 1);

    assert.equal(transformed.cells[4].pageNumber, 1);
    assert.equal(transformed.cells[4].isHeader, false);
    assert.equal(transformed.cells[4].isFooter, true);
    assert.equal(transformed.cells[4].rowSpan, 1);
    assert.equal(transformed.cells[4].columnSpan, 2);
  });

  it("toRecognizedForm() should handle empty page", () => {
    const original: DocumentResultModel = {
      docType: "prebuilt:receipt",
      pageRange: [1, 1],
      fields: {}
    };

    const transformed = toRecognizedForm(original, formPages);

    assert.ok(transformed, "Expected valid recognized form");
    assert.deepStrictEqual(transformed.fields, {}, "expected empty fields in recognzied form");
  });

  it("toRecognizeFormResultResponse() converts unsupervised response into recognized forms", () => {
    const original: GetAnalyzeFormResultResponse = JSON.parse(unsupervisedResponseString);
    const transformed = toRecognizeFormResultResponse(original);

    assert.ok(transformed.forms, "Expecting non-empty recognized forms");
    assert.ok(transformed.forms!.length > 0, "Expecting at least one recognized forms");
    const form = transformed.forms![0];
    const originalReadResult = original.analyzeResult!.readResults![0];
    assert.equal(form.formType, "form-0");
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: originalReadResult.pageNumber,
      lastPageNumber: originalReadResult.pageNumber
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields["field-0"]);
    assert.ok(form.fields["field-1"]);
    assert.ok(form.fields["field-2"]);
  });

  it("toRecognizeFormResultResponse() converts supervised response into recognized forms", () => {
    const original: GetAnalyzeFormResultResponse = JSON.parse(supervisedResponseString);
    const transformed = toRecognizeFormResultResponse(original);

    assert.ok(transformed.forms, "Expecting non-empty recognized forms");
    assert.ok(transformed.forms!.length > 0, "Expecting at least one recognized forms");
    const form = transformed.forms![0];
    const originalDocument = original.analyzeResult!.documentResults![0];
    assert.equal(form.formType, originalDocument.docType);
    assert.deepStrictEqual(form.pageRange, {
      firstPageNumber: originalDocument.pageRange[0],
      lastPageNumber: originalDocument.pageRange[1]
    });
    assert.ok(form.pages.length > 0, "Expecting at least one page in the first recognized form");
    assert.ok(form.fields);
    assert.ok(form.fields["InvoiceCharges"]);
    assert.ok(form.fields["InvoiceDate"]);
    assert.ok(form.fields["InvoiceDueDate"]);
    assert.ok(form.fields["InvoiceNumber"]);
    assert.ok(form.fields["InvoiceVatId"]);
  });

  it("toFormModelResponse() converts labeled model response", () => {
    const original: GetCustomModelResponse = JSON.parse(labeledModelResponse);
    const transformed = toFormModelResponse(original);
    const models = transformed.submodels;

    assert.deepStrictEqual(
      transformed.trainingDocuments,
      original.trainResult!.trainingDocuments,
      "Expecting same 'trainingDocuments' as original's"
    );
    assert.deepStrictEqual(
      transformed.errors,
      original.trainResult!.errors,
      "Expecting same 'errors' as original's"
    );
    assert.ok(models, "Expecting model trained without using lables");
    assert.equal(models![0].accuracy, original.trainResult!.averageModelAccuracy);
    assert.deepStrictEqual(models![0].fields!["InvoiceDate"], {
      name: "InvoiceDate",
      accuracy: 0.8,
      label: null
    });
  });

  it("toFormModelResponse() converts unlabeled model response", () => {
    const original: GetCustomModelResponse = JSON.parse(unlabeledModelResponse);
    const transformed = toFormModelResponse(original);
    const models = transformed.submodels;

    assert.deepStrictEqual(
      transformed.trainingDocuments,
      original.trainResult!.trainingDocuments,
      "Expecting same 'trainingDocuments' as original's"
    );
    assert.deepStrictEqual(
      transformed.errors,
      original.trainResult!.errors,
      "Expecting same 'errors' as original's"
    );
    assert.ok(models, "Expecting model trained without using lables");
    assert.equal(models![0].accuracy, undefined, "Expecting 'undefined' accuracy for first model");
    assert.deepStrictEqual(models![0].fields!["field-0"].name, "field-0");
  });

  it("toRecognizeFormResultResponseFromReceipt() converts receipt response", () => {
    const original: GetAnalyzeReceiptResultResponse = JSON.parse(receiptResponseString);
    const transformed = toRecognizeFormResultResponseFromReceipt(original);

    assert.ok(transformed.forms, "Expecting non-empty recognized receipts");
    assert.equal(transformed.forms![0].formType, "prebuilt:receipt");
  });
});

const supervisedResponseString = `{
  "status": "succeeded",
  "createdDateTime": "2020-04-09T22:29:48Z",
  "lastUpdatedDateTime": "2020-04-09T22:29:59Z",
  "analyzeResult": {
    "version": "2.0.0",
    "readResults": [
      {
        "pageNumber": 1,
        "language": "en",
        "angle": 0,
        "width": 8.5,
        "height": 11,
        "unit": "inch"
      }
    ],
    "pageResults": [
      {
        "pageNumber": 1,
        "tables": [
          {
            "rows": 2,
            "columns": 6,
            "cells": [
              {
                "rowIndex": 0,
                "columnIndex": 0,
                "text": "Invoice Number",
                "boundingBox": [
                  0.5075,
                  2.8088,
                  1.9061,
                  2.8088,
                  1.9061,
                  3.3219,
                  0.5075,
                  3.3219
                ]
              },
              {
                "rowIndex": 0,
                "columnIndex": 1,
                "text": "Invoice Date",
                "boundingBox": [
                  1.9061,
                  2.8088,
                  3.3074,
                  2.8088,
                  3.3074,
                  3.3219,
                  1.9061,
                  3.3219
                ]
              },
              {
                "rowIndex": 0,
                "columnIndex": 2,
                "text": "Invoice Due Date",
                "boundingBox": [
                  3.3074,
                  2.8088,
                  4.7074,
                  2.8088,
                  4.7074,
                  3.3219,
                  3.3074,
                  3.3219
                ]
              },
              {
                "rowIndex": 0,
                "columnIndex": 3,
                "text": "Charges",
                "boundingBox": [
                  4.7074,
                  2.8088,
                  5.386,
                  2.8088,
                  5.386,
                  3.3219,
                  4.7074,
                  3.3219
                ]
              },
              {
                "rowIndex": 0,
                "columnIndex": 5,
                "text": "VAT ID",
                "boundingBox": [
                  6.1051,
                  2.8088,
                  7.5038,
                  2.8088,
                  7.5038,
                  3.3219,
                  6.1051,
                  3.3219
                ]
              },
              {
                "rowIndex": 1,
                "columnIndex": 0,
                "text": "7689302",
                "boundingBox": [
                  0.5075,
                  3.3219,
                  1.9061,
                  3.3219,
                  1.9061,
                  3.859,
                  0.5075,
                  3.859
                ]
              },
              {
                "rowIndex": 1,
                "columnIndex": 1,
                "text": "3/09/2015",
                "boundingBox": [
                  1.9061,
                  3.3219,
                  3.3074,
                  3.3219,
                  3.3074,
                  3.859,
                  1.9061,
                  3.859
                ]
              },
              {
                "rowIndex": 1,
                "columnIndex": 2,
                "text": "6/29/2016",
                "boundingBox": [
                  3.3074,
                  3.3219,
                  4.7074,
                  3.3219,
                  4.7074,
                  3.859,
                  3.3074,
                  3.859
                ]
              },
              {
                "rowIndex": 1,
                "columnIndex": 3,
                "columnSpan": 2,
                "text": "$22,123.24",
                "boundingBox": [
                  4.7074,
                  3.3219,
                  6.1051,
                  3.3219,
                  6.1051,
                  3.859,
                  4.7074,
                  3.859
                ]
              },
              {
                "rowIndex": 1,
                "columnIndex": 5,
                "text": "QR",
                "boundingBox": [
                  6.1051,
                  3.3219,
                  7.5038,
                  3.3219,
                  7.5038,
                  3.859,
                  6.1051,
                  3.859
                ]
              }
            ]
          }
        ]
      }
    ],
    "documentResults": [
      {
        "docType": "custom:form",
        "pageRange": [
          1,
          1
        ],
        "fields": {
          "InvoiceDueDate": {
            "type": "string",
            "valueString": "6/29/2016",
            "text": "6/29/2016",
            "pageNumber": 1,
            "boundingBox": [
              3.345,
              3.41,
              3.95,
              3.41,
              3.95,
              3.515,
              3.345,
              3.515
            ],
            "confidence": 1
          },
          "InvoiceNumber": {
            "type": "string",
            "valueString": "7689302",
            "text": "7689302",
            "pageNumber": 1,
            "boundingBox": [
              0.54,
              3.41,
              1.065,
              3.41,
              1.065,
              3.515,
              0.54,
              3.515
            ],
            "confidence": 1
          },
          "InvoiceCharges": {
            "type": "string",
            "valueString": "$22,123.24",
            "text": "$22,123.24",
            "pageNumber": 1,
            "boundingBox": [
              5.29,
              3.41,
              5.9750000000000005,
              3.41,
              5.9750000000000005,
              3.54,
              5.29,
              3.54
            ],
            "confidence": 1
          },
          "InvoiceVatId": {
            "type": "string",
            "valueString": "QR",
            "text": "QR",
            "pageNumber": 1,
            "boundingBox": [
              6.2250000000000005,
              3.41,
              6.425,
              3.41,
              6.425,
              3.52,
              6.2250000000000005,
              3.52
            ],
            "confidence": 0.96
          },
          "InvoiceDate": {
            "type": "string",
            "valueString": "3/09/2015",
            "text": "3/09/2015",
            "pageNumber": 1,
            "boundingBox": [
              1.945,
              3.41,
              2.5500000000000003,
              3.41,
              2.5500000000000003,
              3.515,
              1.945,
              3.515
            ],
            "confidence": 1
          }
        }
      }
    ],
    "errors": []
  }
}`;

const unsupervisedResponseString = `{
  "status": "succeeded",
  "createdDateTime": "2020-04-09T05:28:10Z",
  "lastUpdatedDateTime": "2020-04-09T05:28:12Z",
  "analyzeResult": {
      "version": "2.0.0",
      "readResults": [
          {
              "pageNumber": 1,
              "angle": 0,
              "width": 8.5,
              "height": 11.0,
              "unit": "inch",
              "lines": []
          }
      ],
      "pageResults": [
          {
              "pageNumber": 1,
              "keyValuePairs": [
                  {
                      "key": {
                          "text": "Address:",
                          "boundingBox": [
                              0.7958,
                              1.5139,
                              1.3958,
                              1.5139,
                              1.3958,
                              1.6431,
                              0.7958,
                              1.6431
                          ],
                          "elements": null
                      },
                      "value": {
                          "text": "134 El Camino Real New York NY 46233",
                          "boundingBox": [
                              0.7958,
                              1.6625,
                              2.0458,
                              1.6625,
                              2.0458,
                              2.0431,
                              0.7958,
                              2.0431
                          ],
                          "elements": null
                      },
                      "confidence": 0.36
                  },
                  {
                      "key": {
                          "text": "Invoice For:",
                          "boundingBox": [
                              4.3903,
                              1.5125,
                              5.1139,
                              1.5125,
                              5.1139,
                              1.6431,
                              4.3903,
                              1.6431
                          ],
                          "elements": null
                      },
                      "value": {
                          "text": "The Phone Company 5506 Main St Redmond, WA 73493",
                          "boundingBox": [
                              5.1917,
                              1.4681,
                              6.5708,
                              1.4681,
                              6.5708,
                              2.0569,
                              5.1917,
                              2.0569
                          ],
                          "elements": null
                      },
                      "confidence": 1.0
                  },
                  {
                      "key": {
                          "text": "Invoice Number",
                          "boundingBox": [
                              0.5347,
                              2.8722,
                              1.575,
                              2.8722,
                              1.575,
                              3.0028,
                              0.5347,
                              3.0028
                          ],
                          "elements": null
                      },
                      "value": {
                          "text": "AC-32322",
                          "boundingBox": [
                              0.5347,
                              3.3681,
                              1.1583,
                              3.3681,
                              1.1583,
                              3.5569,
                              0.5347,
                              3.5569
                          ],
                          "elements": null
                      },
                      "confidence": 0.36
                  },
                  {
                      "key": {
                          "text": "Invoice Date",
                          "boundingBox": [
                              1.9403,
                              2.8722,
                              2.7569,
                              2.8722,
                              2.7569,
                              3.0028,
                              1.9403,
                              3.0028
                          ],
                          "elements": null
                      },
                      "value": {
                          "text": "03 March 2018",
                          "boundingBox": [
                              1.9403,
                              3.3681,
                              2.8625,
                              3.3681,
                              2.8625,
                              3.5569,
                              1.9403,
                              3.5569
                          ],
                          "elements": null
                      },
                      "confidence": 0.36
                  },
                  {
                      "key": {
                          "text": "Invoice Due Date",
                          "boundingBox": [
                              3.3403,
                              2.8722,
                              4.4583,
                              2.8722,
                              4.4583,
                              3.0028,
                              3.3403,
                              3.0028
                          ],
                          "elements": null
                      },
                      "value": {
                          "text": "06 Nov 2019",
                          "boundingBox": [
                              3.3403,
                              3.3681,
                              4.125,
                              3.3681,
                              4.125,
                              3.5569,
                              3.3403,
                              3.5569
                          ],
                          "elements": null
                      },
                      "confidence": 0.36
                  },
                  {
                      "key": {
                          "text": "Charges",
                          "boundingBox": [
                              4.7403,
                              2.8722,
                              5.2944,
                              2.8722,
                              5.2944,
                              3.0028,
                              4.7403,
                              3.0028
                          ],
                          "elements": null
                      },
                      "value": {
                          "text": "$110,153.22",
                          "boundingBox": [
                              5.2861,
                              3.3828,
                              6.0556,
                              3.3828,
                              6.0556,
                              3.5609,
                              5.2861,
                              3.5609
                          ],
                          "elements": null
                      },
                      "confidence": 1.0
                  },
                  {
                      "key": {
                          "text": "VAT ID",
                          "boundingBox": [
                              6.1403,
                              2.8278,
                              6.5944,
                              2.8278,
                              6.5944,
                              3.025,
                              6.1403,
                              3.025
                          ],
                          "elements": null
                      },
                      "value": {
                          "text": "RT",
                          "boundingBox": [
                              6.2181,
                              3.3681,
                              6.4028,
                              3.3681,
                              6.4028,
                              3.5569,
                              6.2181,
                              3.5569
                          ],
                          "elements": null
                      },
                      "confidence": 1.0
                  },
                  {
                      "key": {
                          "text": "Page",
                          "boundingBox": [
                              6.2306,
                              9.6653,
                              6.5542,
                              9.6653,
                              6.5542,
                              9.7958,
                              6.2306,
                              9.7958
                          ],
                          "elements": null
                      },
                      "value": {
                          "text": "1 of",
                          "boundingBox": [
                              6.8319,
                              9.6653,
                              7.0611,
                              9.6653,
                              7.0611,
                              9.7958,
                              6.8319,
                              9.7958
                          ],
                          "elements": null
                      },
                      "confidence": 0.86
                  },
                  {
                      "key": {
                          "text": "__Tokens__1",
                          "boundingBox": null,
                          "elements": null
                      },
                      "value": {
                          "text": "Margies Travel",
                          "boundingBox": [
                              0.5278,
                              1.0528,
                              2.6583,
                              1.0528,
                              2.6583,
                              1.4667,
                              0.5278,
                              1.4667
                          ],
                          "elements": null
                      },
                      "confidence": 1.0
                  },
                  {
                      "key": {
                          "text": "__Tokens__2",
                          "boundingBox": null,
                          "elements": null
                      },
                      "value": {
                          "text": "1",
                          "boundingBox": [
                              7.3986,
                              9.6653,
                              7.475,
                              9.6653,
                              7.475,
                              9.7958,
                              7.3986,
                              9.7958
                          ],
                          "elements": null
                      },
                      "confidence": 1.0
                  }
              ],
              "tables": [
                  {
                      "rows": 2,
                      "columns": 5,
                      "cells": [
                          {
                              "text": "Invoice Number",
                              "rowIndex": 0,
                              "columnIndex": 0,
                              "boundingBox": [
                                  0.5347,
                                  2.8722,
                                  1.575,
                                  2.8722,
                                  1.575,
                                  3.0028,
                                  0.5347,
                                  3.0028
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": true,
                              "isFooter": false
                          },
                          {
                              "text": "Invoice Date",
                              "rowIndex": 0,
                              "columnIndex": 1,
                              "boundingBox": [
                                  1.9403,
                                  2.8722,
                                  2.7569,
                                  2.8722,
                                  2.7569,
                                  3.0028,
                                  1.9403,
                                  3.0028
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": true,
                              "isFooter": false
                          },
                          {
                              "text": "Invoice Due Date",
                              "rowIndex": 0,
                              "columnIndex": 2,
                              "boundingBox": [
                                  3.3403,
                                  2.8722,
                                  4.4583,
                                  2.8722,
                                  4.4583,
                                  3.0028,
                                  3.3403,
                                  3.0028
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": true,
                              "isFooter": false
                          },
                          {
                              "text": "Charges",
                              "rowIndex": 0,
                              "columnIndex": 3,
                              "boundingBox": [
                                  4.7403,
                                  2.8722,
                                  5.2944,
                                  2.8722,
                                  5.2944,
                                  3.0028,
                                  4.7403,
                                  3.0028
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": true,
                              "isFooter": false
                          },
                          {
                              "text": "VAT ID",
                              "rowIndex": 0,
                              "columnIndex": 4,
                              "boundingBox": [
                                  6.1403,
                                  2.8278,
                                  6.5944,
                                  2.8278,
                                  6.5944,
                                  3.025,
                                  6.1403,
                                  3.025
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": true,
                              "isFooter": false
                          },
                          {
                              "text": "AC-32322",
                              "rowIndex": 1,
                              "columnIndex": 0,
                              "boundingBox": [
                                  0.5347,
                                  3.3681,
                                  1.1583,
                                  3.3681,
                                  1.1583,
                                  3.5569,
                                  0.5347,
                                  3.5569
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": false,
                              "isFooter": false
                          },
                          {
                              "text": "03 March 2018",
                              "rowIndex": 1,
                              "columnIndex": 1,
                              "boundingBox": [
                                  1.9403,
                                  3.3681,
                                  2.8625,
                                  3.3681,
                                  2.8625,
                                  3.5569,
                                  1.9403,
                                  3.5569
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": false,
                              "isFooter": false
                          },
                          {
                              "text": "06 Nov 2019",
                              "rowIndex": 1,
                              "columnIndex": 2,
                              "boundingBox": [
                                  3.3403,
                                  3.3681,
                                  4.125,
                                  3.3681,
                                  4.125,
                                  3.5569,
                                  3.3403,
                                  3.5569
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": false,
                              "isFooter": false
                          },
                          {
                              "text": "$110,153.22",
                              "rowIndex": 1,
                              "columnIndex": 3,
                              "boundingBox": [
                                  5.2861,
                                  3.3828,
                                  6.0556,
                                  3.3828,
                                  6.0556,
                                  3.5609,
                                  5.2861,
                                  3.5609
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": false,
                              "isFooter": false
                          },
                          {
                              "text": "RT",
                              "rowIndex": 1,
                              "columnIndex": 4,
                              "boundingBox": [
                                  6.2181,
                                  3.3681,
                                  6.4028,
                                  3.3681,
                                  6.4028,
                                  3.5569,
                                  6.2181,
                                  3.5569
                              ],
                              "confidence": 1.0,
                              "rowSpan": 1,
                              "columnSpan": 1,
                              "elements": null,
                              "isHeader": false,
                              "isFooter": false
                          }
                      ]
                  }
              ],
              "clusterId": 0
          }
      ],
      "documentResults": [],
      "errors": []
  }
}`;

const receiptResponseString = `{
  "status": "succeeded",
  "createdDateTime": "2020-04-09T20:55:08Z",
  "lastUpdatedDateTime": "2020-04-09T20:55:11Z",
  "analyzeResult": {
    "version": "2.0.0",
    "readResults": [
      {
        "pageNumber": 1,
        "angle": 0.6893,
        "width": 1688,
        "height": 3000,
        "unit": "pixel",
        "language": "en",
        "lines": [
          {
            "text": "Contoso",
            "boundingBox": [
              635,
              510,
              1086,
              461,
              1098,
              558,
              643,
              604
            ],
            "words": [
              {
                "text": "Contoso",
                "boundingBox": [
                  639,
                  510,
                  1087,
                  461,
                  1098,
                  551,
                  646,
                  604
                ],
                "confidence": 0.955
              }
            ]
          },
          {
            "text": "Contoso",
            "boundingBox": [
              305,
              574,
              519,
              624,
              504,
              686,
              291,
              634
            ],
            "words": [
              {
                "text": "Contoso",
                "boundingBox": [
                  311,
                  575,
                  517,
                  623,
                  503,
                  686,
                  297,
                  636
                ],
                "confidence": 0.435
              }
            ]
          },
          {
            "text": "123 Main Street",
            "boundingBox": [
              300,
              675,
              703,
              767,
              686,
              844,
              284,
              749
            ],
            "words": [
              {
                "text": "123",
                "boundingBox": [
                  302,
                  676,
                  390,
                  695,
                  375,
                  770,
                  287,
                  751
                ],
                "confidence": 0.935
              },
              {
                "text": "Main",
                "boundingBox": [
                  405,
                  698,
                  528,
                  726,
                  512,
                  802,
                  390,
                  774
                ],
                "confidence": 0.958
              },
              {
                "text": "Street",
                "boundingBox": [
                  542,
                  730,
                  702,
                  767,
                  685,
                  845,
                  527,
                  806
                ],
                "confidence": 0.959
              }
            ]
          },
          {
            "text": "Redmond, WA 98052",
            "boundingBox": [
              290,
              784,
              828,
              850,
              820,
              933,
              279,
              868
            ],
            "words": [
              {
                "text": "Redmond,",
                "boundingBox": [
                  293,
                  784,
                  550,
                  826,
                  540,
                  905,
                  280,
                  856
                ],
                "confidence": 0.762
              },
              {
                "text": "WA",
                "boundingBox": [
                  565,
                  828,
                  645,
                  837,
                  637,
                  917,
                  555,
                  907
                ],
                "confidence": 0.943
              },
              {
                "text": "98052",
                "boundingBox": [
                  660,
                  838,
                  824,
                  849,
                  818,
                  933,
                  651,
                  919
                ],
                "confidence": 0.959
              }
            ]
          },
          {
            "text": "987-654-3210",
            "boundingBox": [
              275,
              1003,
              656,
              1055,
              646,
              1123,
              269,
              1073
            ],
            "words": [
              {
                "text": "987-654-3210",
                "boundingBox": [
                  278,
                  1004,
                  656,
                  1057,
                  647,
                  1123,
                  271,
                  1075
                ],
                "confidence": 0.939
              }
            ]
          },
          {
            "text": "6/10/2019 13:59",
            "boundingBox": [
              265,
              1228,
              678,
              1258,
              671,
              1344,
              258,
              1311
            ],
            "words": [
              {
                "text": "6/10/2019",
                "boundingBox": [
                  267,
                  1229,
                  525,
                  1247,
                  517,
                  1332,
                  259,
                  1313
                ],
                "confidence": 0.762
              },
              {
                "text": "13:59",
                "boundingBox": [
                  541,
                  1248,
                  677,
                  1263,
                  669,
                  1345,
                  533,
                  1333
                ],
                "confidence": 0.958
              }
            ]
          },
          {
            "text": "Sales Associate: Paul",
            "boundingBox": [
              253,
              1347,
              868,
              1379,
              863,
              1457,
              249,
              1425
            ],
            "words": [
              {
                "text": "Sales",
                "boundingBox": [
                  259,
                  1348,
                  419,
                  1359,
                  414,
                  1435,
                  252,
                  1422
                ],
                "confidence": 0.92
              },
              {
                "text": "Associate:",
                "boundingBox": [
                  434,
                  1360,
                  711,
                  1374,
                  707,
                  1452,
                  428,
                  1436
                ],
                "confidence": 0.909
              },
              {
                "text": "Paul",
                "boundingBox": [
                  726,
                  1374,
                  865,
                  1379,
                  862,
                  1457,
                  722,
                  1452
                ],
                "confidence": 0.959
              }
            ]
          },
          {
            "text": "1 Cappuccino",
            "boundingBox": [
              244,
              1583,
              658,
              1601,
              653,
              1689,
              240,
              1674
            ],
            "words": [
              {
                "text": "1",
                "boundingBox": [
                  245,
                  1583,
                  299,
                  1585,
                  295,
                  1676,
                  241,
                  1671
                ],
                "confidence": 0.824
              },
              {
                "text": "Cappuccino",
                "boundingBox": [
                  322,
                  1586,
                  654,
                  1605,
                  648,
                  1689,
                  318,
                  1678
                ],
                "confidence": 0.727
              }
            ]
          },
          {
            "text": "$2.20",
            "boundingBox": [
              1106,
              1584,
              1268,
              1574,
              1270,
              1656,
              1110,
              1666
            ],
            "words": [
              {
                "text": "$2.20",
                "boundingBox": [
                  1108,
                  1584,
                  1263,
                  1574,
                  1268,
                  1656,
                  1113,
                  1666
                ],
                "confidence": 0.958
              }
            ]
          },
          {
            "text": "1 BACON & EGGS",
            "boundingBox": [
              232,
              1834,
              745,
              1840,
              744,
              1924,
              231,
              1918
            ],
            "words": [
              {
                "text": "1",
                "boundingBox": [
                  232,
                  1834,
                  286,
                  1836,
                  285,
                  1920,
                  231,
                  1920
                ],
                "confidence": 0.845
              },
              {
                "text": "BACON",
                "boundingBox": [
                  308,
                  1836,
                  506,
                  1841,
                  504,
                  1920,
                  307,
                  1920
                ],
                "confidence": 0.885
              },
              {
                "text": "&",
                "boundingBox": [
                  523,
                  1841,
                  568,
                  1842,
                  566,
                  1921,
                  521,
                  1921
                ],
                "confidence": 0.799
              },
              {
                "text": "EGGS",
                "boundingBox": [
                  585,
                  1842,
                  746,
                  1843,
                  744,
                  1924,
                  583,
                  1921
                ],
                "confidence": 0.948
              }
            ]
          },
          {
            "text": "Sunny-side-up",
            "boundingBox": [
              347,
              1975,
              751,
              1977,
              751,
              2061,
              347,
              2060
            ],
            "words": [
              {
                "text": "Sunny-side-up",
                "boundingBox": [
                  348,
                  1975,
                  749,
                  1979,
                  747,
                  2061,
                  348,
                  2061
                ],
                "confidence": 0.946
              }
            ]
          },
          {
            "text": "$9.5",
            "boundingBox": [
              1135,
              1955,
              1262,
              1952,
              1263,
              2035,
              1136,
              2039
            ],
            "words": [
              {
                "text": "$9.5",
                "boundingBox": [
                  1135,
                  1955,
                  1257,
                  1952,
                  1259,
                  2036,
                  1136,
                  2039
                ],
                "confidence": 0.95
              }
            ]
          },
          {
            "text": "Sub-Total",
            "boundingBox": [
              440,
              2229,
              771,
              2219,
              773,
              2318,
              442,
              2327
            ],
            "words": [
              {
                "text": "Sub-Total",
                "boundingBox": [
                  441,
                  2229,
                  769,
                  2220,
                  774,
                  2319,
                  443,
                  2328
                ],
                "confidence": 0.856
              }
            ]
          },
          {
            "text": "$ 11.70",
            "boundingBox": [
              1092,
              2221,
              1301,
              2224,
              1299,
              2319,
              1093,
              2317
            ],
            "words": [
              {
                "text": "$",
                "boundingBox": [
                  1092,
                  2221,
                  1127,
                  2221,
                  1126,
                  2317,
                  1092,
                  2316
                ],
                "confidence": 0.799
              },
              {
                "text": "11.70",
                "boundingBox": [
                  1146,
                  2221,
                  1297,
                  2223,
                  1296,
                  2319,
                  1145,
                  2317
                ],
                "confidence": 0.948
              }
            ]
          },
          {
            "text": "Tax",
            "boundingBox": [
              442,
              2371,
              549,
              2367,
              552,
              2454,
              445,
              2458
            ],
            "words": [
              {
                "text": "Tax",
                "boundingBox": [
                  445,
                  2371,
                  546,
                  2367,
                  549,
                  2454,
                  448,
                  2458
                ],
                "confidence": 0.958
              }
            ]
          },
          {
            "text": "$ 1.17",
            "boundingBox": [
              1129,
              2359,
              1310,
              2359,
              1306,
              2456,
              1129,
              2456
            ],
            "words": [
              {
                "text": "$",
                "boundingBox": [
                  1129,
                  2359,
                  1171,
                  2359,
                  1171,
                  2456,
                  1129,
                  2456
                ],
                "confidence": 0.89
              },
              {
                "text": "1.17",
                "boundingBox": [
                  1190,
                  2359,
                  1304,
                  2359,
                  1304,
                  2456,
                  1190,
                  2456
                ],
                "confidence": 0.942
              }
            ]
          },
          {
            "text": "Tip",
            "boundingBox": [
              433,
              2505,
              539,
              2506,
              540,
              2602,
              434,
              2602
            ],
            "words": [
              {
                "text": "Tip",
                "boundingBox": [
                  436,
                  2505,
                  536,
                  2505,
                  536,
                  2602,
                  436,
                  2602
                ],
                "confidence": 0.959
              }
            ]
          },
          {
            "text": "$ 1.63",
            "boundingBox": [
              1030,
              2478,
              1269,
              2486,
              1267,
              2591,
              1024,
              2583
            ],
            "words": [
              {
                "text": "$",
                "boundingBox": [
                  1027,
                  2478,
                  1073,
                  2478,
                  1069,
                  2584,
                  1024,
                  2583
                ],
                "confidence": 0.788
              },
              {
                "text": "1.63",
                "boundingBox": [
                  1094,
                  2479,
                  1267,
                  2485,
                  1264,
                  2591,
                  1091,
                  2585
                ],
                "confidence": 0.284
              }
            ]
          },
          {
            "text": "Total",
            "boundingBox": [
              433,
              2652,
              611,
              2644,
              615,
              2738,
              436,
              2747
            ],
            "words": [
              {
                "text": "Total",
                "boundingBox": [
                  435,
                  2652,
                  609,
                  2644,
                  613,
                  2739,
                  439,
                  2747
                ],
                "confidence": 0.866
              }
            ]
          },
          {
            "text": "$14.50",
            "boundingBox": [
              1034,
              2620,
              1386,
              2637,
              1380,
              2762,
              1029,
              2739
            ],
            "words": [
              {
                "text": "$14.50",
                "boundingBox": [
                  1034,
                  2620,
                  1384,
                  2638,
                  1380,
                  2763,
                  1030,
                  2739
                ],
                "confidence": 0.57
              }
            ]
          }
        ]
      }
    ],
    "documentResults": [
      {
        "docType": "prebuilt:receipt",
        "pageRange": [
          1,
          1
        ],
        "fields": {
          "ReceiptType": {
            "type": "string",
            "valueString": "Itemized",
            "confidence": 0.692
          },
          "MerchantName": {
            "type": "string",
            "valueString": "Contoso Contoso",
            "text": "Contoso Contoso",
            "boundingBox": [
              378.2,
              292.4,
              1117.7,
              468.3,
              1035.7,
              812.7,
              296.3,
              636.8
            ],
            "pageNumber": 1,
            "confidence": 0.613,
            "elements": [
              "#/readResults/0/lines/0/words/0",
              "#/readResults/0/lines/1/words/0"
            ]
          },
          "MerchantAddress": {
            "type": "string",
            "valueString": "123 Main Street Redmond, WA 98052",
            "text": "123 Main Street Redmond, WA 98052",
            "boundingBox": [
              302,
              675.8,
              848.1,
              793.7,
              809.9,
              970.4,
              263.9,
              852.5
            ],
            "pageNumber": 1,
            "confidence": 0.99,
            "elements": [
              "#/readResults/0/lines/2/words/0",
              "#/readResults/0/lines/2/words/1",
              "#/readResults/0/lines/2/words/2",
              "#/readResults/0/lines/3/words/0",
              "#/readResults/0/lines/3/words/1",
              "#/readResults/0/lines/3/words/2"
            ]
          },
          "MerchantPhoneNumber": {
            "type": "phoneNumber",
            "valuePhoneNumber": "+19876543210",
            "text": "987-654-3210",
            "boundingBox": [
              278,
              1004,
              656.3,
              1054.7,
              646.8,
              1125.3,
              268.5,
              1074.7
            ],
            "pageNumber": 1,
            "confidence": 0.99,
            "elements": [
              "#/readResults/0/lines/4/words/0"
            ]
          },
          "TransactionDate": {
            "type": "date",
            "valueDate": "2019-06-10",
            "text": "6/10/2019",
            "boundingBox": [
              265.1,
              1228.4,
              525,
              1247,
              518.9,
              1332.1,
              259,
              1313.5
            ],
            "pageNumber": 1,
            "confidence": 0.99,
            "elements": [
              "#/readResults/0/lines/5/words/0"
            ]
          },
          "TransactionTime": {
            "type": "time",
            "valueTime": "13:59:00",
            "text": "13:59",
            "boundingBox": [
              541,
              1248,
              677.3,
              1261.5,
              668.9,
              1346.5,
              532.6,
              1333
            ],
            "pageNumber": 1,
            "confidence": 0.977,
            "elements": [
              "#/readResults/0/lines/5/words/1"
            ]
          },
          "Items": {
            "type": "array",
            "valueArray": [
              {
                "type": "object",
                "valueObject": {
                  "Quantity": {
                    "type": "number",
                    "text": "1",
                    "boundingBox": [
                      245.1,
                      1581.5,
                      300.9,
                      1585.1,
                      295,
                      1676,
                      239.2,
                      1672.4
                    ],
                    "pageNumber": 1,
                    "confidence": 0.92,
                    "elements": [
                      "#/readResults/0/lines/7/words/0"
                    ]
                  },
                  "Name": {
                    "type": "string",
                    "valueString": "Cappuccino",
                    "text": "Cappuccino",
                    "boundingBox": [
                      322,
                      1586,
                      654.2,
                      1601.1,
                      650,
                      1693,
                      317.8,
                      1678
                    ],
                    "pageNumber": 1,
                    "confidence": 0.923,
                    "elements": [
                      "#/readResults/0/lines/7/words/1"
                    ]
                  },
                  "TotalPrice": {
                    "type": "number",
                    "valueNumber": 2.2,
                    "text": "$2.20",
                    "boundingBox": [
                      1107.7,
                      1584,
                      1263,
                      1574,
                      1268.3,
                      1656,
                      1113,
                      1666
                    ],
                    "pageNumber": 1,
                    "confidence": 0.918,
                    "elements": [
                      "#/readResults/0/lines/8/words/0"
                    ]
                  }
                }
              },
              {
                "type": "object",
                "valueObject": {
                  "Quantity": {
                    "type": "number",
                    "text": "1",
                    "boundingBox": [
                      232,
                      1834,
                      286.6,
                      1835,
                      285,
                      1921,
                      230.4,
                      1920
                    ],
                    "pageNumber": 1,
                    "confidence": 0.858,
                    "elements": [
                      "#/readResults/0/lines/9/words/0"
                    ]
                  },
                  "Name": {
                    "type": "string",
                    "valueString": "BACON & EGGS",
                    "text": "BACON & EGGS",
                    "boundingBox": [
                      308,
                      1836,
                      746,
                      1841.4,
                      745,
                      1925.4,
                      307,
                      1920
                    ],
                    "pageNumber": 1,
                    "confidence": 0.916,
                    "elements": [
                      "#/readResults/0/lines/9/words/1",
                      "#/readResults/0/lines/9/words/2",
                      "#/readResults/0/lines/9/words/3"
                    ]
                  },
                  "TotalPrice": {
                    "type": "number",
                    "text": "$9.5",
                    "boundingBox": [
                      1133.9,
                      1955,
                      1257,
                      1952,
                      1259.1,
                      2036,
                      1136,
                      2039
                    ],
                    "pageNumber": 1,
                    "confidence": 0.916,
                    "elements": [
                      "#/readResults/0/lines/11/words/0"
                    ]
                  }
                }
              }
            ]
          },
          "Subtotal": {
            "type": "number",
            "valueNumber": 11.7,
            "text": "11.70",
            "boundingBox": [
              1146,
              2221,
              1297.3,
              2223,
              1296,
              2319,
              1144.7,
              2317
            ],
            "pageNumber": 1,
            "confidence": 0.955,
            "elements": [
              "#/readResults/0/lines/13/words/1"
            ]
          },
          "Tax": {
            "type": "number",
            "valueNumber": 1.17,
            "text": "1.17",
            "boundingBox": [
              1190,
              2359,
              1304,
              2359,
              1304,
              2456,
              1190,
              2456
            ],
            "pageNumber": 1,
            "confidence": 0.979,
            "elements": [
              "#/readResults/0/lines/15/words/1"
            ]
          },
          "Tip": {
            "type": "number",
            "valueNumber": 1.63,
            "text": "1.63",
            "boundingBox": [
              1094,
              2479,
              1267.7,
              2485,
              1264,
              2591,
              1090.3,
              2585
            ],
            "pageNumber": 1,
            "confidence": 0.941,
            "elements": [
              "#/readResults/0/lines/17/words/1"
            ]
          },
          "Total": {
            "type": "number",
            "valueNumber": 14.5,
            "text": "$14.50",
            "boundingBox": [
              1034.2,
              2617,
              1387.5,
              2638.2,
              1380,
              2763,
              1026.7,
              2741.8
            ],
            "pageNumber": 1,
            "confidence": 0.985,
            "elements": [
              "#/readResults/0/lines/19/words/0"
            ]
          }
        }
      }
    ]
  }
}`;

const labeledModelResponse = `{
  "modelInfo": {
    "modelId": "7f98667d-2d29-49e0-948a-9748676a8724",
    "status": "ready",
    "createdDateTime": "2020-04-10T23:14:41Z",
    "lastUpdatedDateTime": "2020-04-10T23:14:42Z"
  },
  "trainResult": {
    "averageModelAccuracy": 0.92,
    "trainingDocuments": [
      {
        "documentName": "Invoice_1.pdf",
        "pages": 1,
        "status": "succeeded"
      },
      {
        "documentName": "Invoice_2.pdf",
        "pages": 1,
        "status": "succeeded"
      },
      {
        "documentName": "Invoice_3.pdf",
        "pages": 1,
        "status": "succeeded"
      },
      {
        "documentName": "Invoice_4.pdf",
        "pages": 1,
        "status": "succeeded"
      },
      {
        "documentName": "Invoice_5.pdf",
        "pages": 1,
        "status": "succeeded"
      }
    ],
    "fields": [
      {
        "fieldName": "InvoiceCharges",
        "accuracy": 1
      },
      {
        "fieldName": "InvoiceDate",
        "accuracy": 0.8
      },
      {
        "fieldName": "InvoiceDueDate",
        "accuracy": 0.8
      },
      {
        "fieldName": "InvoiceNumber",
        "accuracy": 1
      },
      {
        "fieldName": "InvoiceVatId",
        "accuracy": 1
      }
    ],
    "errors": []
  }
}`;

const unlabeledModelResponse = `{
  "modelInfo": {
    "modelId": "a2c3482a-b4a6-4d92-b0fb-498a91bd81e0",
    "status": "ready",
    "createdDateTime": "2020-04-10T23:21:10Z",
    "lastUpdatedDateTime": "2020-04-10T23:21:19Z"
  },
  "keys": {
    "clusters": {
      "0": [
        "Address:",
        "Charges",
        "Invoice Date",
        "Invoice Due Date",
        "Invoice For:",
        "Invoice Number",
        "Microsoft",
        "Page",
        "VAT ID"
      ]
    }
  },
  "trainResult": {
    "trainingDocuments": [
      {
        "documentName": "Invoice_1.pdf",
        "pages": 1,
        "errors": [],
        "status": "succeeded"
      },
      {
        "documentName": "Invoice_2.pdf",
        "pages": 1,
        "errors": [],
        "status": "succeeded"
      },
      {
        "documentName": "Invoice_3.pdf",
        "pages": 1,
        "errors": [],
        "status": "succeeded"
      },
      {
        "documentName": "Invoice_4.pdf",
        "pages": 1,
        "errors": [],
        "status": "succeeded"
      },
      {
        "documentName": "Invoice_5.pdf",
        "pages": 1,
        "errors": [],
        "status": "succeeded"
      }
    ],
    "errors": []
  }
}`;
