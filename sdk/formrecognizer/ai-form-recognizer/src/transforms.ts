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
  FormRecognizerClientGetAnalyzeFormResultResponse as GetAnalyzeFormResultResponse,
  FormRecognizerClientGetAnalyzeLayoutResultResponse as GetAnalyzeLayoutResultResponse,
  FormRecognizerClientGetAnalyzeReceiptResultResponse as GetAnalyzeReceiptResultResponse
} from "./generated/models";

import {
  RawExtractedPage,
  ExtractedLine,
  ExtractedElement,
  DataTableRow,
  DataTable,
  ExtractedForm,
  ExtractedText,
  ExtractedField,
  ExtractedPage,
  LabeledFormResultResponse,
  ExtractFormResultResponse,
  ExtractLayoutResultResponse,
  ExtractedLayout,
  ExtractReceiptResultResponse,
  FieldValue,
  RawReceiptResult,
  ExtractedReceipt,
  RawReceipt,
  ReceiptItemField,
  StringFieldValue,
  DateFieldValue,
  TimeFieldValue,
  PhoneNumberFieldValue,
  NumberFieldValue,
  IntegerFieldValue,
  ObjectFieldValue,
  ArrayFieldValue
} from "./models";

export function toTextLine(original: TextLineModel, pageNumber: number): ExtractedLine {
  const line: ExtractedLine = {
    kind: "line",
    pageNumber: pageNumber,
    text: original.text,
    boundingBox: original.boundingBox,
    words: original.words.map((w) => {
      return {
        kind: "word",
        text: w.text,
        boundingBox: w.boundingBox,
        confidence: w.confidence,
        pageNumber: pageNumber
      };
    })
  };
  line.words = line.words.map((w) => {
    return { ...w, containingLine: line };
  });

  return line;
}

export function toRawExtractedPage(original: ReadResultModel): RawExtractedPage {
  return {
    pageNumber: original.pageNumber,
    angle: original.angle,
    width: original.width,
    height: original.height,
    unit: original.unit,
    lines: original.lines?.map((l) => toTextLine(l, original.pageNumber))
  };
}

// Note: might need to support other element types in future, e.g., checkbox
const textPattern = /#\/readResults\/(\d+)\/lines\/(\d+)(?:\/words\/(\d+))?/;

export function toExtractedElement(element: string, readResults: RawExtractedPage[]): ExtractedElement {
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

export function toKeyValueElement(
  original: KeyValueElementModel,
  readResults?: RawExtractedPage[]
): ExtractedText {
  return {
    text: original.text,
    boundingBox: original.boundingBox,
    elements: original.elements?.map((element) => toExtractedElement(element, readResults!))
  };
}

export function toKeyValuePair(original: KeyValuePairModel, readResults?: RawExtractedPage[]): ExtractedField {
  return {
    label: original.label,
    confidence: original.confidence,
    name: toKeyValueElement(original.key, readResults),
    value: toKeyValueElement(original.value, readResults)
  };
}

export function toTable(original: DataTableModel, readResults?: RawExtractedPage[]): DataTable {
  let rows: DataTableRow[] = [];
  for (let i = 0; i < original.rows; i++) {
    rows.push({ cells: [] });
  }
  for (const cell of original.cells) {
    rows[cell.rowIndex].cells.push({
      boundingBox: cell.boundingBox,
      columnIndex: cell.columnIndex,
      columnSpan: cell.columnSpan || 1,
      confidence: cell.confidence,
      elements: cell.elements?.map((element) => toExtractedElement(element, readResults!)),
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

export function toPageResult(original: PageResultModel, readResults?: RawExtractedPage[]): ExtractedPage {
  return {
    pageNumber: original.pageNumber,
    formTypeId: original.clusterId,
    fields: original.keyValuePairs?.map((pair) => toKeyValuePair(pair, readResults)),
    tables: original.tables?.map((table) => toTable(table, readResults))
  };
}

export function transformResults(
  readResults?: ReadResultModel[],
  pageResults?: PageResultModel[]
): { rawExtractedPages: RawExtractedPage[]; extractedPages: ExtractedPage[] } {
  const transformedReadResults = readResults?.map(toRawExtractedPage);
  return {
    rawExtractedPages: transformedReadResults || [],
    extractedPages: pageResults?.map((page) => toPageResult(page, transformedReadResults)) || []
  };
}

export function toCustomFormResultResponse(
  original: GetAnalyzeFormResultResponse
): ExtractFormResultResponse {
  const { rawExtractedPages, extractedPages} = transformResults(
    original.analyzeResult?.readResults,
    original.analyzeResult?.pageResults
  );
  return original.status === "succeeded"
    ? {
        status: original.status,
        createdOn: original.createdOn,
        lastUpdatedOn: original.createdOn,
        _response: original._response,
        ...(original.analyzeResult
          ? {
              version: original.analyzeResult.version,
              rawExtractedPages,
              extractedPages,
              errors: original.analyzeResult.errors
            }
          : undefined)
      }
    : {
        status: original.status,
        createdOn: original.createdOn,
        lastUpdatedOn: original.createdOn,
        _response: original._response
      };
}

export function toFieldValue(original: FieldValueModel, readResults: RawExtractedPage[]): FieldValue {
  const result =
    original.type === "object" || original.type === "array"
      ? {}
      : {
          text: original.text,
          boundingBox: original.boundingBox,
          confidence: original.confidence,
          pageNumber: original.pageNumber,
          elements: original.elements?.map((element) => toExtractedElement(element, readResults))
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
      (result as ArrayFieldValue).value = original.valueArray?.map((a) => toFieldValue(a, readResults));
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
  readResults: RawExtractedPage[]
): { [propertyName: string]: FieldValue } {
  const result: { [propertyName: string]: FieldValue } = {};
  for (const key in original) {
    if (original.hasOwnProperty(key)) {
      result[key] = toFieldValue(original[key], readResults);
    }
  }

  return result;
}

function toDocumentResult(
  original: DocumentResultModel,
  readResults: RawExtractedPage[]
): ExtractedForm {
  return {
    docType: original.docType,
    pageRange: { firstPage: original.pageRange[0], lastPage: original.pageRange[1] },
    fields: toFields(original.fields, readResults)
  };
}

export function toLabeledFormResultResponse(
  original: GetAnalyzeFormResultResponse
): LabeledFormResultResponse {
  if (original.status === "succeeded") {
    const { rawExtractedPages, extractedPages} = transformResults(
      original.analyzeResult?.readResults,
      original.analyzeResult?.pageResults
    );
    return {
      status: original.status,
      createdOn: original.createdOn,
      lastUpdatedOn: original.createdOn,
      _response: original._response,
      ...(original.analyzeResult
        ? {
            version: original.analyzeResult.version,
            extractedForms: original.analyzeResult.documentResults?.map((d) =>
              toDocumentResult(d, rawExtractedPages)
            ),
            rawExtractedPages,
            extractedPages,
            errors: original.analyzeResult.errors
          }
        : undefined)
    };
  } else {
    return {
      status: original.status,
      createdOn: original.createdOn,
      lastUpdatedOn: original.createdOn,
      _response: original._response
    };
  }
}

export function toAnalyzeLayoutResultResponse(
  original: GetAnalyzeLayoutResultResponse
): ExtractLayoutResultResponse {
  function toAnalyzeLayoutResult(model?: AnalyzeResultModel): ExtractedLayout | undefined {
    if (!model) {
      return undefined;
    }
    const { rawExtractedPages, extractedPages} = transformResults(model.readResults, model.pageResults);
    return {
      version: model.version,
      rawExtractedPages,
      extractedLayoutPages: extractedPages
    };
  }

  if (original.status === "succeeded") {
    return {
      status: original.status,
      createdOn: original.createdOn,
      lastUpdatedOn: original.lastUpdatedOn,
      ...toAnalyzeLayoutResult(original.analyzeResult),
      _response: original._response
    };
  } else {
    return {
      status: original.status,
      createdOn: original.createdOn,
      lastUpdatedOn: original.lastUpdatedOn,
      _response: original._response
    };
  }
}

function toReceiptResult(result: DocumentResultModel, readResults: RawExtractedPage[]): ExtractedReceipt {
  const transformedFields = toFields(result.fields, readResults);
  const rawReceiptFields = (transformedFields as unknown) as RawReceipt;
  return {
    docType: ((result as unknown) as RawReceiptResult).docType,
    pageRange: { firstPage: result.pageRange[0], lastPage: result.pageRange[1] },
    receiptType: rawReceiptFields.ReceiptType.value!,
    merchantName: rawReceiptFields.MerchantName?.value,
    merchantPhoneNumber: rawReceiptFields.MerchantPhoneNumber?.value,
    merchantAddress: rawReceiptFields.MerchantAddress?.value,
    items: rawReceiptFields.Items.value?.map((i) => {
      return {
        name: (i as ReceiptItemField).value.Name?.value,
        quantity: (i as ReceiptItemField).value.Quantity?.value,
        totalPrice: (i as ReceiptItemField).value.TotalPrice?.value
      };
    }),
    subtotal: rawReceiptFields.Subtotal?.value,
    tax: rawReceiptFields.Tax?.value,
    tip: rawReceiptFields.Tip?.value,
    total: rawReceiptFields.Total?.value,
    transactionDate: rawReceiptFields.TransactionDate?.value,
    transactionTime: rawReceiptFields.TransactionTime?.value,
    fields: transformedFields
  };
}

export function toReceiptResultResponse(
  result: GetAnalyzeReceiptResultResponse
): ExtractReceiptResultResponse {
  if (result.status === "succeeded") {
    const readResults = result.analyzeResult!.readResults.map(toRawExtractedPage);
    return {
      status: result.status,
      createdOn: result.createdOn,
      lastUpdatedOn: result.lastUpdatedOn,
      _response: result._response,
      version: result.analyzeResult!.version,
      rawExtractedPages: readResults,
      extractedReceipts: result.analyzeResult!.documentResults!.map((d) =>
        toReceiptResult(d, readResults))
    };
  } else {
    return {
      status: result.status,
      createdOn: result.createdOn,
      lastUpdatedOn: result.lastUpdatedOn,
      _response: result._response
    };
  }
}
