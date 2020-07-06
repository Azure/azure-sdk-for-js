// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AnalyzeResult as AnalyzeResultModel,
  DataTable as DataTableModel,
  DocumentResult as DocumentResultModel,
  FieldValue as FieldValueModel,
  KeyValueElement as KeyValueElementModel,
  KeyValuePair as KeyValuePairModel,
  PageResult as PageResultModel,
  ReadResult as ReadResultModel,
  TextLine as TextLineModel,
  GeneratedClientGetAnalyzeFormResultResponse as GetAnalyzeFormResultResponse,
  GeneratedClientGetAnalyzeLayoutResultResponse as GetAnalyzeLayoutResultResponse,
  GeneratedClientGetAnalyzeReceiptResultResponse as GetAnalyzeReceiptResultResponse,
  GeneratedClientGetCustomModelResponse as GetCustomModelResponse
} from "./generated/models";

import {
  FormPage,
  FormLine,
  FormElement,
  FormTableRow,
  FormTable,
  RecognizedForm,
  FieldData,
  FormField,
  Point2D,
  FormModelResponse,
  CustomFormField,
  CustomFormSubmodel,
  RecognizedReceipt
} from "./models";
import {
  RecognizeFormResultResponse,
  RecognizeContentResultResponse,
  RecognizeReceiptResultResponse
} from "./internalModels";

export function toBoundingBox(original: number[]): Point2D[] {
  return [
    { x: original[0], y: original[1] },
    { x: original[2], y: original[3] },
    { x: original[4], y: original[5] },
    { x: original[6], y: original[7] }
  ];
}

export function toTextLine(original: TextLineModel, pageNumber: number): FormLine {
  const line: FormLine = {
    kind: "line",
    pageNumber: pageNumber,
    text: original.text,
    boundingBox: toBoundingBox(original.boundingBox),
    words: original.words.map((w) => {
      return {
        kind: "word",
        text: w.text,
        boundingBox: toBoundingBox(w.boundingBox),
        confidence: w.confidence || 1,
        pageNumber: pageNumber
      };
    })
  };
  line.words = line.words.map((w) => {
    return { ...w, containingLine: line };
  });

  return line;
}

export function toFormPage(original: ReadResultModel): FormPage {
  return {
    pageNumber: original.pageNumber,
    textAngle: original.angle,
    width: original.width,
    height: original.height,
    unit: original.unit,
    lines: original.lines?.map((l) => toTextLine(l, original.pageNumber))
  };
}

// Note: might need to support other element types in future, e.g., checkbox
const textPattern = /\/readResults\/(\d+)\/lines\/(\d+)(?:\/words\/(\d+))?/;

export function toFormContent(element: string, readResults: FormPage[]): FormElement {
  const result = textPattern.exec(element);
  if (!result || !result[0] || !result[1] || !result[2]) {
    throw new Error(`Unexpected element reference encountered: ${element}`);
  }

  const readIndex = Number.parseInt(result[1]);
  const lineIndex = Number.parseInt(result[2]);
  if (result[3]) {
    const wordIndex = Number.parseInt(result[3]);
    return readResults[readIndex].lines![lineIndex].words[wordIndex];
  } else {
    return readResults[readIndex].lines![lineIndex];
  }
}

export function toFieldData(
  pageNumber: number,
  original: KeyValueElementModel,
  readResults?: FormPage[]
): FieldData {
  return {
    pageNumber,
    text: original.text,
    boundingBox: original.boundingBox ? toBoundingBox(original.boundingBox) : undefined,
    fieldElements: original.elements?.map((element) => toFormContent(element, readResults!))
  };
}

export function toFormFieldFromKeyValuePairModel(
  pageNumber: number,
  original: KeyValuePairModel,
  readResults?: FormPage[]
): FormField {
  return {
    name: original.label,
    confidence: original.confidence || 1,
    labelData: toFieldData(pageNumber, original.key, readResults),
    valueData: toFieldData(pageNumber, original.value, readResults),
    value: original.value.text,
    valueType: "string"
  };
}

export function toFormTable(original: DataTableModel, readResults?: FormPage[]): FormTable {
  const rows: FormTableRow[] = [];
  for (let i = 0; i < original.rows; i++) {
    rows.push({ cells: [] });
  }
  for (const cell of original.cells) {
    rows[cell.rowIndex].cells.push({
      boundingBox: toBoundingBox(cell.boundingBox),
      columnIndex: cell.columnIndex,
      columnSpan: cell.columnSpan || 1,
      confidence: cell.confidence || 1,
      fieldElements: cell.elements?.map((element) => toFormContent(element, readResults!)),
      isFooter: cell.isFooter || false,
      isHeader: cell.isHeader || false,
      rowIndex: cell.rowIndex,
      rowSpan: cell.rowSpan || 1,
      text: cell.text
    });
  }
  return {
    rowCount: original.rows,
    columnCount: original.columns,
    rows: rows
  };
}

export function toFormPages(
  readResults?: ReadResultModel[],
  pageResults?: PageResultModel[]
): FormPage[] {
  const transformed = readResults?.map(toFormPage);
  // maps from page numbers to the objects
  const readMap = new Map<number, FormPage>(transformed?.map((r) => [r.pageNumber, r]));
  const pageMap = new Map<number, PageResultModel>(pageResults?.map((r) => [r.pageNumber, r]));
  const result = [];
  for (const pageNumber of readMap.keys()) {
    const readResult = readMap.get(pageNumber);
    if (readResult) {
      const pageResult = pageMap.get(pageNumber);
      if (pageResult) {
        readResult.tables = pageResult.tables?.map((table) => toFormTable(table, transformed));
        result.push(readResult);
      }
    }
  }

  return result;
}

export function toRecognizeFormResultResponse(
  original: GetAnalyzeFormResultResponse
): RecognizeFormResultResponse {
  const pages = toFormPages(
    original.analyzeResult?.readResults,
    original.analyzeResult?.pageResults
  );
  const common = {
    status: original.status,
    createdOn: original.createdOn,
    errors: original.analyzeResult?.errors,
    lastModified: original.lastModified,
    _response: original._response
  };

  if (original.status !== "succeeded") {
    return common;
  }

  const additional = original.analyzeResult
    ? {
        version: original.analyzeResult.version,
        forms:
          original.analyzeResult.documentResults &&
          original.analyzeResult.documentResults.length > 0
            ? original.analyzeResult.documentResults.map((d) => toRecognizedForm(d, pages)) // supervised
            : original.analyzeResult.pageResults?.map((p) => toFormFromPageResult(p, pages)) // unsupervised
      }
    : undefined;
  return {
    ...common,
    ...additional
  };
}

export function toFormFieldFromFieldValueModel(
  original: FieldValueModel,
  key: string,
  readResults: FormPage[]
): FormField {
  let value:
    | string
    | Date
    | number
    | FormField[]
    | { [propertyName: string]: FormField }
    | undefined;
  switch (original.type) {
    case "string":
      value = original.valueString;
      break;
    case "date":
      value = original.valueDate;
      break;
    case "time":
      value = original.valueTime;
      break;
    case "integer":
      value = original.valueInteger;
      break;
    case "number":
      value = original.valueNumber;
      break;
    case "phoneNumber":
      value = original.valuePhoneNumber;
      break;
    case "array":
      value = original.valueArray?.map((fieldValueModel) =>
        toFormFieldFromFieldValueModel(fieldValueModel, key, readResults)
      );
      break;
    case "object":
      value = original.valueObject
        ? toFieldsFromFieldValue(original.valueObject, readResults)
        : undefined;
      break;
  }
  return {
    confidence: original.confidence || 1,
    name: key,
    valueData: {
      pageNumber: original.pageNumber ?? 0,
      text: original.text,
      boundingBox: original.boundingBox ? toBoundingBox(original.boundingBox) : undefined,
      fieldElements: original.elements?.map((element) => toFormContent(element, readResults))
    },
    valueType: original.type,
    value
  } as FormField;
}

export function toFieldsFromFieldValue(
  original: { [propertyName: string]: FieldValueModel | null },
  readResults: FormPage[]
): { [propertyName: string]: FormField } {
  const result: { [propertyName: string]: FormField } = {};
  for (const key in original) {
    // eslint-disable-next-line no-prototype-builtins
    if (original.hasOwnProperty(key)) {
      if (!original[key]) {
        result[key] = { name: key };
        continue;
      }
      const formField = toFormFieldFromFieldValueModel(original[key]!, key, readResults);
      result[key] = formField;
    }
  }

  return result;
}

export function toFieldsFromKeyValuePairs(
  pageNumber: number,
  original: KeyValuePairModel[],
  pages: FormPage[]
): { [propertyName: string]: FormField } {
  const result: { [propertyName: string]: FormField } = {};
  for (let i = 0; i < original.length; i++) {
    const pair = original[i];
    const stringField = toFormFieldFromKeyValuePairModel(pageNumber, pair, pages);
    stringField.name = stringField.name || `field-${i}`;

    result[`field-${i}`] = stringField;
  }

  return result;
}

export function toFormFromPageResult(original: PageResultModel, pages: FormPage[]): RecognizedForm {
  return {
    formType: `form-${original.clusterId}`,
    pageRange: { firstPageNumber: original.pageNumber, lastPageNumber: original.pageNumber },
    pages: pages.filter((p) => p.pageNumber === original.pageNumber),
    fields: original.keyValuePairs
      ? toFieldsFromKeyValuePairs(original.pageNumber, original.keyValuePairs, pages)
      : {}
  };
}

export function toRecognizedForm(original: DocumentResultModel, pages: FormPage[]): RecognizedForm {
  return {
    formType: original.docType,
    pageRange: { firstPageNumber: original.pageRange[0], lastPageNumber: original.pageRange[1] },
    fields: toFieldsFromFieldValue(original.fields, pages),
    pages: pages.filter(
      (p) => original.pageRange[0] <= p.pageNumber && p.pageNumber <= original.pageRange[1]
    )
  };
}

export function toRecognizeContentResultResponse(
  original: GetAnalyzeLayoutResultResponse
): RecognizeContentResultResponse {
  function toRecognizeContentResult(
    model?: AnalyzeResultModel
  ): { version?: string; pages?: FormPage[] } | undefined {
    if (!model) {
      return undefined;
    }
    const pages = toFormPages(model.readResults, model.pageResults);
    return {
      version: model.version,
      pages: pages
    };
  }

  const common = {
    status: original.status,
    createdOn: original.createdOn,
    errors: original.analyzeResult?.errors,
    lastModified: original.lastModified,
    _response: original._response
  };
  if (original.status === "succeeded") {
    return {
      ...common,
      ...toRecognizeContentResult(original.analyzeResult)
    };
  } else {
    return common;
  }
}

function toRecognizedReceipt(result: DocumentResultModel, pages: FormPage[]): RecognizedReceipt {
  if (result.docType !== "prebuilt:receipt") {
    throw new RangeError("The document type is not 'prebuilt:receipt'");
  }

  const recognizedForm = toRecognizedForm(result, pages);
  return {
    recognizedForm
  };
}

export function toReceiptResultResponse(
  original: GetAnalyzeReceiptResultResponse
): RecognizeReceiptResultResponse {
  const common = {
    status: original.status,
    createdOn: original.createdOn,
    errors: original.analyzeResult?.errors,
    lastModified: original.lastModified,
    _response: original._response
  };
  if (original.status !== "succeeded") {
    return common;
  }

  if (!original.analyzeResult) {
    throw new Error("Expecting valid analyzeResult from the service response");
  }

  const pages = original.analyzeResult!.readResults.map(toFormPage);
  return {
    ...common,
    version: original.analyzeResult!.version,
    receipts: original
      .analyzeResult!.documentResults!.filter((d) => {
        return !!d.fields;
      })
      .map((d) => toRecognizedReceipt(d, pages))
  };
}

export function toFormModelResponse(response: GetCustomModelResponse): FormModelResponse {
  const common = {
    ...response.modelInfo,
    trainingDocuments: response.trainResult?.trainingDocuments,
    errors: response.trainResult?.errors,
    _response: response._response
  };

  if (response.modelInfo.status !== "ready") {
    return common;
  }

  if (response.trainResult?.averageModelAccuracy || response.trainResult?.fields) {
    // training with forms and labels, populate from trainingResult.fields
    const fields: { [propertyName: string]: CustomFormField } = {};
    for (const f of response.trainResult.fields!) {
      fields[f.fieldName] = { name: f.fieldName, accuracy: f.accuracy, label: null };
    }
    return {
      ...common,
      submodels: [
        {
          accuracy: response.trainResult.averageModelAccuracy,
          formType: `form-${response.modelInfo.modelId}`,
          fields
        }
      ]
    };
  } else if (response.keys) {
    // training with forms, populate from trainingResult.keys
    const submodels: CustomFormSubmodel[] = [];
    for (const clusterKey in response.keys.clusters) {
      const cluster = response.keys.clusters[clusterKey];
      const fields: { [propertyName: string]: CustomFormField } = {};

      for (let i = 0; i < cluster.length; i++) {
        fields[`field-${i}`] = { name: `field-${i}`, label: cluster[i] };
      }
      submodels.push({ formType: `form-${clusterKey}`, fields });
    }

    return {
      ...common,
      submodels
    };
  } else {
    throw new Error("Expecting model(s) from traning result but got none");
  }
}
