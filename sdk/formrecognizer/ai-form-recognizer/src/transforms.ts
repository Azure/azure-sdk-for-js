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
  FormText,
  FormField,
  RecognizeFormResultResponse,
  RecognizeContentResultResponse,
  RecognizeReceiptResultResponse,
  FieldValue,
  StringFieldValue,
  DateFieldValue,
  TimeFieldValue,
  PhoneNumberFieldValue,
  NumberFieldValue,
  IntegerFieldValue,
  ObjectFieldValue,
  ArrayFieldValue,
  Point2D,
  FormModelResponse,
  CustomFormSubModelField,
  CustomFormSubModel,
  ReceiptWithLocale,
  USReceiptType,
  USReceiptItem,
  ReceiptItemArrayField,
  RecognizedReceipt
} from "./models";

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

export function toFormElement(element: string, readResults: FormPage[]): FormElement {
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

export function toFormText(original: KeyValueElementModel, readResults?: FormPage[]): FormText {
  return {
    text: original.text,
    boundingBox: original.boundingBox ? toBoundingBox(original.boundingBox) : undefined,
    textContent: original.elements?.map((element) => toFormElement(element, readResults!))
  };
}

export function toFormField(original: KeyValuePairModel, readResults?: FormPage[]): FormField {
  return {
    name: original.label,
    confidence: original.confidence || 1,
    fieldLabel: toFormText(original.key, readResults),
    valueText: toFormText(original.value, readResults),
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
      confidence: cell.confidence,
      textContent: cell.elements?.map((element) => toFormElement(element, readResults!)),
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
            : original.analyzeResult.pageResults?.map((p) => toFormFromPageResult(p, pages)), // unsupervised
        errors: original.analyzeResult.errors
      }
    : undefined;
  return {
    ...common,
    ...additional
  };
}

export function toFieldValue(original: FieldValueModel, readResults: FormPage[]): FieldValue {
  const result =
    original.type === "object" || original.type === "array"
      ? {}
      : {
          text: original.text,
          boundingBox: original.boundingBox ? toBoundingBox(original.boundingBox) : undefined,
          confidence: original.confidence || 1,
          pageNumber: original.pageNumber,
          textContent: original.elements?.map((element) => toFormElement(element, readResults))
        };
  switch (original.type) {
    case "string":
      (result as StringFieldValue).type = "string";
      (result as StringFieldValue).value = original.valueString;
      break;
    case "date":
      (result as DateFieldValue).type = "date";
      (result as DateFieldValue).value = original.valueDate;
      break;
    case "time":
      (result as TimeFieldValue).type = "time";
      (result as TimeFieldValue).value = original.valueTime;
      break;
    case "phoneNumber":
      (result as PhoneNumberFieldValue).type = "phoneNumber";
      (result as PhoneNumberFieldValue).value = original.valuePhoneNumber;
      break;
    case "number":
      (result as NumberFieldValue).type = "number";
      (result as NumberFieldValue).value = original.valueNumber;
      break;
    case "integer":
      (result as IntegerFieldValue).type = "integer";
      (result as IntegerFieldValue).value = original.valueInteger;
      break;
    case "array":
      (result as ArrayFieldValue).type = "array";
      (result as ArrayFieldValue).value = original.valueArray?.map((a) =>
        toFieldValue(a, readResults)
      );
      break;
    case "object":
      (result as ObjectFieldValue).type = "object";
      (result as ObjectFieldValue).value = original.valueObject
        ? toFields(original.valueObject, readResults)
        : undefined;
      break;
    default:
      throw new Error(`Unknown field value type from ${original}`);
  }
  return (result as unknown) as FieldValue;
}

export function toFields(
  original: { [propertyName: string]: FieldValueModel },
  readResults: FormPage[]
): { [propertyName: string]: FieldValue } {
  const result: { [propertyName: string]: FieldValue } = {};
  for (const key in original) {
    // eslint-disable-next-line no-prototype-builtins
    if (original.hasOwnProperty(key)) {
      result[key] = toFieldValue(original[key], readResults);
    }
  }

  return result;
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
      const fieldValue = toFieldValue(original[key]!, readResults);
      if (fieldValue.type === "array" || fieldValue.type === "object") {
        const formField: FormField = {
          confidence: 1,
          name: key,
          value: fieldValue.value,
          valueType: fieldValue.type
        };
        result[key] = formField;
      } else {
        const formField: FormField = {
          confidence: fieldValue.confidence,
          name: key,
          valueText: {
            text: fieldValue.text,
            boundingBox: fieldValue.boundingBox,
            textContent: fieldValue.textContent
          },
          value: fieldValue.value,
          valueType: fieldValue.type
        };
        result[key] = formField;
      }
    }
  }

  return result;
}

export function toFieldsFromKeyValuePairs(
  original: KeyValuePairModel[],
  pages: FormPage[]
): { [propertyName: string]: FormField } {
  const result: { [propertyName: string]: FormField } = {};
  for (let i = 0; i < original.length; i++) {
    const pair = original[i];
    const stringField = toFormField(pair, pages);
    stringField.name = stringField.name || `field-${i}`;

    result[`field-${i}`] = stringField;
  }

  return result;
}

export function toFormFromPageResult(original: PageResultModel, pages: FormPage[]): RecognizedForm {
  return {
    formType: `form-${original.clusterId}`,
    pageRange: { firstPageNumber: original.pageNumber, lastPageNumber: original.pageNumber },
    pages,
    fields: original.keyValuePairs ? toFieldsFromKeyValuePairs(original.keyValuePairs, pages) : {}
  };
}

export function toRecognizedForm(original: DocumentResultModel, pages: FormPage[]): RecognizedForm {
  return {
    formType: original.docType,
    pageRange: { firstPageNumber: original.pageRange[0], lastPageNumber: original.pageRange[1] },
    fields: toFieldsFromFieldValue(original.fields, pages),
    pages
  };
}

export function toRecognizeContentResultResponse(
  original: GetAnalyzeLayoutResultResponse
): RecognizeContentResultResponse {
  function toRecognizeContentResult(model?: AnalyzeResultModel): { version?: string, pages?: FormPage[] } | undefined {
    if (!model) {
      return undefined;
    }
    const pages = toFormPages(model.readResults, model.pageResults);
    return {
      version: model.version,
      pages: pages,
    };
  }

  const common = {
    status: original.status,
    createdOn: original.createdOn,
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

function toRecognizedReceipt(result: DocumentResultModel, pages: FormPage[]): ReceiptWithLocale {
  if (result.docType !== "prebuilt:receipt") {
    throw new RangeError("The document type is not 'prebuilt:receipt'");
  }

  const form = toRecognizedForm(result, pages);
  return {
    recognizedForm: form,
    locale: undefined
  };
}

function toReceiptType(type: FormField): USReceiptType {
  if (type.valueType === "string" && type.value === "Itemized") {
    return "itemized";
  } else {
    return "unrecognized";
  }
}

function toUSReceiptItems(items: ReceiptItemArrayField): USReceiptItem[] {
  return items.value?.map((item) => {
    const name: FormField = {
      name: "Name",
      confidence: item.value.Name?.confidence,
      value: item.value.Name?.value,
      valueType: item.value.Name?.type,
      valueText: {
        text: item.value.Name?.text,
        boundingBox: item.value.Name?.boundingBox,
        textContent: item.value.Name?.textContent
      }
    };
    const quantity: FormField = {
      name: "Quantity",
      confidence: item.value.Quantity?.confidence,
      value: item.value.Quantity?.value,
      valueType: item.value.Quantity?.type,
      valueText: {
        text: item.value.Quantity?.text,
        boundingBox: item.value.Quantity?.boundingBox,
        textContent: item.value.Quantity?.textContent
      }
    };
    const price: FormField = {
      name: "Price",
      confidence: item.value.Price?.confidence,
      value: item.value.Price?.value,
      valueType: item.value.Price?.type,
      valueText: {
        text: item.value.Price?.text,
        boundingBox: item.value.Price?.boundingBox,
        textContent: item.value.Price?.textContent
      }
    };
    const totalPrice: FormField = {
      name: "TotalPrice",
      confidence: item.value.TotalPrice?.confidence,
      value: item.value.TotalPrice?.value,
      valueType: item.value.TotalPrice?.type,
      valueText: {
        text: item.value.TotalPrice?.text,
        boundingBox: item.value.TotalPrice?.boundingBox,
        textContent: item.value.TotalPrice?.textContent
      }
    };

    return {
      name,
      quantity,
      price,
      totalPrice
    };
  });
}

function toUSReceipt(receipt: ReceiptWithLocale): RecognizedReceipt {
  const form = receipt.recognizedForm;
  return {
    locale: "US",
    recognizedForm: receipt.recognizedForm,
    items: toUSReceiptItems((form.fields["Items"] as unknown) as ReceiptItemArrayField),
    merchantAddress: form.fields["MerchantAddress"],
    merchantName: form.fields["MerchantName"],
    merchantPhoneNumber: form.fields["MerchantPhoneNumber"],
    receiptType: toReceiptType(form.fields["ReceiptType"]),
    subtotal: form.fields["Subtotal"],
    tax: form.fields["Tax"],
    tip: form.fields["Tip"],
    total: form.fields["Total"],
    transactionDate: form.fields["TransactionDate"],
    transactionTime: form.fields["TransactionTime"]
  };
}

function toReceiptWithLocale(receipt: ReceiptWithLocale): RecognizedReceipt {
  switch (receipt.locale) {
    case "US":
      return toUSReceipt(receipt);
    default:
      throw new RangeError(`Unsupported receipt with locale ${receipt.locale}`);
  }
}

export function toReceiptResultResponse(
  result: GetAnalyzeReceiptResultResponse
): RecognizeReceiptResultResponse {
  const common = {
    status: result.status,
    createdOn: result.createdOn,
    lastModified: result.lastModified,
    _response: result._response
  };
  if (result.status !== "succeeded") {
    return common;
  }

  const pages = result.analyzeResult!.readResults.map(toFormPage);
  return {
    ...common,
    version: result.analyzeResult!.version,
    receipts: result.analyzeResult!.documentResults!.map((d) => {
      const receipt = toRecognizedReceipt(d, pages);
      return toReceiptWithLocale({ ...receipt, locale: "US" }); // default to US until service returns locale info.
    })
  };
}

export function toFormModelResponse(response: GetCustomModelResponse): FormModelResponse {
  const common = {
    ...response.modelInfo,
    _response: response._response
  };

  if (response.modelInfo.status !== "ready") {
    return common;
  }

  if (response.trainResult?.averageModelAccuracy || response.trainResult?.fields) {
    // training with forms and labels, populate from trainingResult.fields
    const fields: { [propertyName: string]: CustomFormSubModelField } = {};
    for (const f of response.trainResult.fields!) {
      fields[f.fieldName] = { name: f.fieldName, accuracy: f.accuracy, label: null };
    }
    return {
      ...common,
      trainingDocuments: response.trainResult.trainingDocuments,
      errors: response.trainResult.errors,
      models: [
        {
          accuracy: response.trainResult.averageModelAccuracy,
          formType: `form-${response.modelInfo.modelId}`,
          fields
        }
      ]
    };
  } else if (response.keys) {
    // training with forms, populate from trainingResult.keys
    const models: CustomFormSubModel[] = [];
    for (const clusterKey in response.keys.clusters) {
      const cluster = response.keys.clusters[clusterKey];
      const fields: { [propertyName: string]: CustomFormSubModelField } = {};

      for (let i = 0; i < cluster.length; i++) {
        fields[`field-${i}`] = { name: `field-${i}`, label: cluster[i] };
      }
      models.push({ formType: `form-${clusterKey}`, fields });
    }

    return {
      ...common,
      trainingDocuments: response.trainResult?.trainingDocuments,
      errors: response.trainResult?.errors,
      models
    };
  } else {
    throw new Error("Expecting model(s) from traning result but got none");
  }
}
