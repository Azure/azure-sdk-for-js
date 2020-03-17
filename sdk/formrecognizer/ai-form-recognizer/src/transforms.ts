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
  GetAnalyzeFormResultResponse,
  GetAnalyzeLayoutResultResponse,
  GetAnalyzeReceiptResultResponse
} from "./generated/models";

import {
  ReadResult,
  TextLine,
  ExtractedElement,
  DataTableRow,
  DataTable,
  DocumentResult,
  KeyValueElement,
  KeyValuePair,
  PageResult,
  LabeledFormResultResponse,
  ExtractFormResultResponse,
  ExtractLayoutResultResponse,
  ExtractLayoutResult,
  ExtractReceiptResultResponse,
  FieldValue,
  RawReceiptResult,
  ReceiptResult,
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

function toTextLine(original: TextLineModel, pageNumber: number): TextLine {
  const line: TextLine = {
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

export function toReadResult(original: ReadResultModel): ReadResult {
  return {
    pageNumber: original.pageNumber,
    angle: original.angle,
    width: original.width,
    height: original.height,
    unit: original.unit,
    lines: original.lines?.map(toTextLine)
  };
}

// Note: might need to support other element types in future, e.g., checkbox
const textPattern = /#\/readResults\/(\d+)\/lines\/(\d+)\/words\/(\d+)/;

function toExtractedElement(element: string, readResults: ReadResult[]): ExtractedElement {
  const result = textPattern.exec(element);
  if (!result || result.length < 3) {
    throw new Error(`Unexpected element reference encountered: ${element}`);
  }

  const readIndex = Number.parseInt(result[1]);
  const lineIndex = Number.parseInt(result[2]);
  if (result.length === 4) {
    const wordIndex = Number.parseInt(result[3]);
    return readResults[readIndex].lines![lineIndex].words[wordIndex];
  } else {
    return readResults[readIndex].lines![lineIndex];
  }
}

function toKeyValueElement(
  original: KeyValueElementModel,
  readResults?: ReadResult[]
): KeyValueElement {
  return {
    text: original.text,
    boundingBox: original.boundingBox,
    elements: readResults
      ? original.elements?.map((element) => toExtractedElement(element, readResults!))
      : undefined
  };
}

function toKeyValuePair(original: KeyValuePairModel, readResults?: ReadResult[]): KeyValuePair {
  return {
    label: original.label,
    confidence: original.confidence,
    key: toKeyValueElement(original.key, readResults),
    value: toKeyValueElement(original.value, readResults)
  };
}

function toTable(original: DataTableModel, readResults?: ReadResult[]): DataTable {
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
      elements: readResults
        ? cell.elements?.map((element) => toExtractedElement(element, readResults!))
        : undefined,
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

function toPageResult(original: PageResultModel, readResults?: ReadResult[]): PageResult {
  return {
    pageNumber: original.pageNumber,
    clusterId: original.clusterId,
    keyValuePairs: original.keyValuePairs?.map((pair) => toKeyValuePair(pair, readResults)),
    tables: original.tables?.map((table) => toTable(table, readResults))
  };
}

export function transformResults(
  readResults?: ReadResultModel[],
  pageResults?: PageResultModel[]
): { readResults: ReadResult[]; pageResults: PageResult[] } {
  const transformedReadResults = readResults?.map(toReadResult);
  return {
    readResults: transformedReadResults || [],
    pageResults: pageResults?.map((page) => toPageResult(page, transformedReadResults)) || []
  };
}

export function toCustomFormResultResponse(
  original: GetAnalyzeFormResultResponse
): ExtractFormResultResponse {
  const { readResults, pageResults } = transformResults(
    original.analyzeResult?.readResults,
    original.analyzeResult?.pageResults
  );
  return original.status === "succeeded"
    ? {
        status: original.status,
        createdOn: original.createdOn,
        lastUpdatedOn: original.createdOn,
        _response: original._response,
        analyzeResult: !!original.analyzeResult
          ? {
              version: original.analyzeResult.version,
              readResults,
              pageResults,
              errors: original.analyzeResult?.errors
            }
          : undefined
      }
    : {
        status: original.status,
        createdOn: original.createdOn,
        lastUpdatedOn: original.createdOn,
        _response: original._response
      };
}

function toFieldValue(original: FieldValueModel, readResults: ReadResult[]): FieldValue {
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
      (result as StringFieldValue).valueString = original.valueString;
      break;
    case "date":
      (result as DateFieldValue).type = "date";
      (result as DateFieldValue).valueDate = original.valueDate;
      break;
    case "time":
      (result as TimeFieldValue).type = "time";
      (result as TimeFieldValue).valueTime = original.valueTime;
      break;
    case "phoneNumber":
      (result as PhoneNumberFieldValue).type = "phoneNumber";
      (result as PhoneNumberFieldValue).valuePhoneNumber = original.valuePhoneNumber;
      break;
    case "number":
      (result as NumberFieldValue).type = "number";
      (result as NumberFieldValue).valueNumber = original.valueNumber;
      break;
    case "integer":
      (result as IntegerFieldValue).type = "integer";
      (result as IntegerFieldValue).valueInteger = original.valueInteger;
      break;
    case "array":
      (result as ArrayFieldValue).type = "array";
      (result as ArrayFieldValue).valueArray = original.valueArray
        ? original.valueArray.map((a) => toFieldValue(a, readResults))
        : undefined;
      break;
    case "object":
      (result as ObjectFieldValue).type = "object";
      (result as ObjectFieldValue).valueObject = original.valueObject
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
  readResults: ReadResult[]
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
  readResults: ReadResult[]
): DocumentResult {
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
    const { readResults, pageResults } = transformResults(
      original.analyzeResult?.readResults,
      original.analyzeResult?.pageResults
    );
    return {
      status: original.status,
      createdOn: original.createdOn,
      lastUpdatedOn: original.createdOn,
      _response: original._response,
      analyzeResult: !!original.analyzeResult
        ? {
            version: original.analyzeResult.version,
            documentResults: original.analyzeResult.documentResults?.map((d) =>
              toDocumentResult(d, readResults)
            ),
            readResults,
            pageResults,
            errors: original.analyzeResult?.errors
          }
        : undefined
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
  function toAnalyzeLayoutResult(model?: AnalyzeResultModel): ExtractLayoutResult | undefined {
    if (!model) {
      return undefined;
    }
    const { readResults, pageResults } = transformResults(model.readResults, model.pageResults);
    return {
      version: model.version,
      readResults: readResults,
      pageResults: pageResults
    };
  }

  if (original.status === "succeeded") {
    return {
      status: original.status,
      createdOn: original.createdOn,
      lastUpdatedOn: original.lastUpdatedOn,
      analyzeResult: toAnalyzeLayoutResult(original.analyzeResult),
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

function toReceiptResult(result: DocumentResultModel, readResults: ReadResult[]): ReceiptResult {
  const transformedFields = toFields(result.fields, readResults);
  const rawReceiptFields = (transformedFields as unknown) as RawReceipt;
  return {
    docType: ((result as unknown) as RawReceiptResult).docType,
    pageRange: { firstPage: result.pageRange[0], lastPage: result.pageRange[1] },
    receiptType: rawReceiptFields.ReceiptType.valueString!,
    merchantName: rawReceiptFields.MerchantName?.valueString,
    merchantPhoneNumber: rawReceiptFields.MerchantPhoneNumber?.valuePhoneNumber,
    merchantAddress: rawReceiptFields.MerchantAddress?.valueString,
    items: rawReceiptFields.Items.valueArray?.map((i) => {
      return {
        name: (i as ReceiptItemField).valueObject.Name?.valueString,
        quantity: (i as ReceiptItemField).valueObject.Quantity?.valueNumber,
        totalPrice: (i as ReceiptItemField).valueObject.TotalPrice?.valueNumber
      };
    }),
    subtotal: rawReceiptFields.Subtotal?.valueNumber,
    tax: rawReceiptFields.Tax?.valueNumber,
    tip: rawReceiptFields.Tip?.valueNumber,
    total: rawReceiptFields.Total?.valueNumber,
    transactionDate: rawReceiptFields.TransactionDate?.valueDate,
    transactionTime: rawReceiptFields.TransactionTime?.valueTime,
    fields: transformedFields
  };
}

export function toReceiptResultResponse(
  result: GetAnalyzeReceiptResultResponse
): ExtractReceiptResultResponse {
  if (result.status === "succeeded") {
    const readResults = result.analyzeResult!.readResults.map(toReadResult);
    return {
      status: result.status,
      createdOn: result.createdOn,
      lastUpdatedOn: result.lastUpdatedOn,
      _response: result._response,
      analyzeResult: {
        version: result.analyzeResult!.version,
        readResults: readResults,
        receiptResults: result.analyzeResult!.documentResults!.map((d) =>
          toReceiptResult(d, readResults)
        )
      }
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
