// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
  AnalyzeLayoutAsyncHeaders,
  AnalyzeOperationResult as AnalyzeOperationResultModel,
  DataTable as DataTableModel,
  DataTableCell as DataTableCellModel,
  ErrorInformation,
  FormFieldsReport,
  KeysResult,
  KeyValueElement as KeyValueElementModel,
  KeyValuePair as KeyValuePairModel,
  Language,
  LengthUnit,
  Model,
  ModelsModel,
  ModelsSummary,
  TrainCustomModelAsyncHeaders,
  TrainingDocumentInfo,
  TrainResult,
  TrainStatus,
  OperationStatus,
  ModelInfo
} from "./generated/models";

export {
  AnalyzeLayoutAsyncHeaders,
  AnalyzeOperationResultModel,
  DataTableModel,
  DataTableCellModel,
  ErrorInformation,
  FormFieldsReport,
  KeysResult,
  KeyValueElementModel,
  KeyValuePairModel,
  Language,
  LengthUnit,
  ModelsModel,
  ModelsSummary,
  //PageResultModel,
  //ReadResultModel,
  TrainCustomModelAsyncHeaders,
  TrainingDocumentInfo,
  TrainStatus,
  TrainResult
};

/**
 * An object representing an extracted word.
 */
export interface TextWord {
  /**
   * Element kind - "line"
   */
  kind: "word";
  /**
   * The 1-based page number in the input document.
   */
  pageNumber: number;
  /**
   * The text content of the word.
   */
  text: string;
  /**
   * Bounding box of an extracted word.
   */
  boundingBox: number[];
  /**
   * Confidence value.
   */
  confidence?: number;
  /**
   * The extract text line that contains this extracted word
   */
  containingLine?: TextLine;
}

/**
 * An object representing an extracted text line.
 */
export interface TextLine {
  /**
   * Element kind - "line"
   */
  kind: "line";
  /**
   * The 1-based page number in the input document.
   */
  pageNumber: number;
  /**
   * The text content of the line.
   */
  text: string;
  /**
   * Bounding box of an extracted line.
   */
  boundingBox: number[];
  /**
   * The detected language of this line, if different from the overall page language. Possible
   * values include: 'en', 'es'
   */
  // language?: Language;
  /**
   * List of words in the text line.
   */
  words: TextWord[];
}

// export interface CheckBox {
//   /**
//    * Element kind - "checkbox"
//    */
//   kind: "checkbox";
//   /**
//    * The 1-based page number in the input document.
//    */
//   pageNumber: number;
//   /**
//    * Bounding box of an extracted line.
//    */
//   boundingBox: number[];

//   checked: boolean;
// }

/**
 * Information about extracted text elements  in documents
 */
export type ExtractedElement = TextWord | TextLine // | CheckBox;

export interface DataTableCell {
  boundingBox: number[];
  columnIndex: number;
  columnSpan: number;
  confidence: number;
  elements?: ExtractedElement[];
  isFooter: boolean;
  isHeader: boolean;
  rowIndex: number;
  rowSpan: number;
  text: string;
}

/**
 * Information about the extracted table contained in a page.
 */
export interface DataTable {
  rowCount: number;
  columnCount: number;
  rows: DataTableRow[];
}

/**
 * Represents a row of data table cells in extracted table.
 */
export interface DataTableRow {
  cells: DataTableCell[];
}

export interface KeyValueElement {
  boundingBox?: number[];
  elements?: ExtractedElement[];
  text: string;
}

export interface KeyValuePair {
  confidence: number;
  key: KeyValueElement;
  label?: string;
  value: KeyValueElement;
}

/**
 * Extracted information from a single page.
 */
export interface PageResult {
  pageNumber: number;
  clusterId?: number;
  keyValuePairs?: KeyValuePair[];
  tables?: DataTable[];
}

export interface PageRange {
  firstPage: number;
  lastPage: number;
}

export interface DocumentResult {
  /**
   * Document type.
   */
  docType: string;
  /**
   * First and last page number where the document is found.
   */
  pageRange: PageRange;
  /**
   * Dictionary of named field values.
   */
  fields: { [propertyName: string]: FieldValue };
}

export interface AnalyzeResult {
  /**
   * Version of schema used for this result.
   */
  version: string;
  /**
   * Text extracted from the input.
   */
  readResults: ReadResult[];
  /**
   * Page-level information extracted from the input.
   */
  pageResults?: PageResult[];
  /**
   * Document-level information extracted from the input.
   */
  documentResults?: DocumentResult[];
  /**
   * List of errors reported during the analyze operation.
   */
  errors?: ErrorInformation[];
}

export interface CommonFieldValue {
  /**
   * Text content of the extracted field.
   */
  text?: string;
  /**
   * Bounding box of the field value, if appropriate.
   */
  boundingBox?: number[];
  /**
   * Confidence score.
   */
  confidence?: number;
  /**
   * When includeTextDetails is set to true, a list of references to the text elements constituting
   * this field.
   */
  elements?: ExtractedElement[];
  /**
   * The 1-based page number in the input document.
   */
  pageNumber?: number;
}

export type StringFieldValue = {
  type: "string";
  valueString?: string;
} & CommonFieldValue;

export type DateFieldValue = {
  type: "date";
  valueDate?: string;
} & CommonFieldValue;

export type TimeFieldValue = {
  type: "time";
  valueTime?: string;
} & CommonFieldValue;

export type PhoneNumberFieldValue = {
  type: "phoneNumber";
  valuePhoneNumber?: string;
} & CommonFieldValue;

export type NumberFieldValue = {
  type: "number";
  valueNumber?: number;
} & CommonFieldValue;

export type IntegerFieldValue = {
  type: "integer";
  valueInteger?: number;
} & CommonFieldValue;

export type ArrayFieldValue = {
  type: "array";
  valueArray?: FieldValue[];
};

export type ObjectFieldValue = {
  type: "object";
  valueObject?: { [propertyName: string]: FieldValue };
};

export type FieldValue =
  | StringFieldValue
  | DateFieldValue
  | TimeFieldValue
  | PhoneNumberFieldValue
  | NumberFieldValue
  | IntegerFieldValue
  | ArrayFieldValue
  | ObjectFieldValue;

/**
 * Represents an item in a receipt.
 */
export type ReceiptItemField = {
  type: "object";
  valueObject: {
    Name: StringFieldValue;
    Quantity: NumberFieldValue;
    Price: NumberFieldValue;
    TotalPrice: NumberFieldValue;
  };
} & CommonFieldValue;

export interface ReceiptItem {
  name?: string;
  price?: number;
  quantity?: number;
  totalPrice?: number;
}

/**
 * Represents all the items in a receipt.
 */
export interface ReceiptItemArrayField {
  type: "array";
  valueArray: ReceiptItemField[];
}

/**
 * Raw Receipt from the response
 */
export interface RawReceipt {
  ReceiptType: StringFieldValue;
  MerchantName: StringFieldValue;
  MerchantPhoneNumber: PhoneNumberFieldValue;
  MerchantAddress: StringFieldValue;
  Items: ReceiptItemArrayField;
  Subtotal: NumberFieldValue;
  Tax: NumberFieldValue;
  Tip: NumberFieldValue;
  Total: NumberFieldValue;
  TransactionDate: DateFieldValue;
  TransactionTime: TimeFieldValue;
}

export interface Receipt {
  receiptType: string;
  merchantName?: string;
  merchantPhoneNumber?: string;
  merchantAddress?: string;
  items: ReceiptItem[];
  subtotal?: number;
  tax?: number;
  tip?: number;
  total?: number;
  transactionDate?: string;
  transactionTime?: string;
}

export interface RawReceiptResult {
  /**
   * Document type.
   */
  docType: "prebuilt:receipt";
  /**
   * First and last page number where the document is found.
   */
  pageRange: PageRange;
  /**
   * Dictionary of named field values.
   */
  fields: { [propertyName: string]: FieldValue };
}

export type ReceiptResult = RawReceiptResult & Receipt;
/**
 * Text extracted from a page in the input document.
 */
export interface ReadResult {
  /**
   * The 1-based page number in the input document.
   */
  pageNumber: number;
  /**
   * The general orientation of the text in clockwise direction, measured in degrees between (-180,
   * 180].
   */
  angle: number;
  /**
   * The width of the image/PDF in pixels/inches, respectively.
   */
  width: number;
  /**
   * The height of the image/PDF in pixels/inches, respectively.
   */
  height: number;
  /**
   * The unit used by the width, height and boundingBox properties. For images, the unit is
   * "pixel". For PDF, the unit is "inch". Possible values include: 'pixel', 'inch'
   */
  unit: LengthUnit;
  /**
   * The detected language on the page overall. Possible values include: 'en', 'es'
   */
  language?: Language;
  /**
   * When includeTextDetails is set to true, a list of recognized text lines. The maximum number of
   * lines returned is 300 per page. The lines are sorted top to bottom, left to right, although in
   * certain cases proximity is treated with higher priority. As the sorting order depends on the
   * detected text, it may change across images and OCR version updates. Thus, business logic
   * should be built upon the actual line location instead of order.
   */
  lines?: TextLine[];
}

/**
 * Analyze Receipt result.
 */
export interface ExtractReceiptResult {
  version: string;
  readResults: ReadResult[];
  receiptResults?: ReceiptResult[];
}

export interface ExtractReceiptOperationResult {
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  createdOn: Date;
  lastUpdatedOn: Date;
  analyzeResult?: ExtractReceiptResult;
}

/**
 * Contains response data for the getAnalyzeReceiptResult operation.
 */
export type ExtractReceiptResultResponse = ExtractReceiptOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResultModel;
  };
};

export interface ExtractLayoutResult {
  version: string;
  readResults: ReadResult[];
  pageResults?: LayoutPageResult[];
}

export interface LayoutPageResult {
  keyValuePairs?: KeyValuePair[];
  pageNumber: number;
  tables?: DataTable[];
}

export interface ExtractLayoutOperationResult {
  status: OperationStatus;
  createdOn: Date;
  lastUpdatedOn: Date;
  analyzeResult?: ExtractLayoutResult;
}

/**
 * Contains response data for the getAnalyzeLayoutResult operation.
 */
export type ExtractLayoutResultResponse = ExtractLayoutOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResultModel;
  };
};

export type ExtractFormResult = Omit<AnalyzeResult, "documentResults">;

export type ExtractFormOperationResult = Omit<AnalyzeOperationResultModel, "analyzeResult"> & {
  analyzeResult?: ExtractFormResult;
};

export type LabeledFormResult = AnalyzeResult;

export type LabeledFormOperationResult = Omit<AnalyzeOperationResultModel, "analyzeResult"> & {
  analyzeResult?: LabeledFormResult;
};

export type ExtractFormResultResponse = ExtractFormOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResultModel;
  };
};

export type LabeledFormResultResponse = LabeledFormOperationResult & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: AnalyzeOperationResultModel;
  };
};

export interface FormTrainResult {
  trainingDocuments: TrainingDocumentInfo[];
  errors?: ErrorInformation[];
}

export interface FormModel {
  modelInfo: ModelInfo;
  keys: KeysResult;
  trainResult?: FormTrainResult;
}

export interface LabeledFormTrainResult {
  /**
   * List of the documents used to train the model and any errors reported in each document.
   */
  trainingDocuments: TrainingDocumentInfo[];
  /**
   * List of fields used to train the model and the train operation error reported by each.
   */
  fields: FormFieldsReport[];
  /**
   * Average accuracy.
   */
  averageModelAccuracy: number;
  /**
   * Errors returned during the training operation.
   */
  errors?: ErrorInformation[];
}

export interface LabeledFormModel {
  modelInfo: ModelInfo;
  trainResult?: LabeledFormTrainResult;
}

export type FormModelResponse = FormModel & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Model;
  };
};

export type LabeledFormModelResponse = LabeledFormModel & {
  /**
   * The underlying HTTP response.
   */
  _response: coreHttp.HttpResponse & {
    /**
     * The response body as text (string format)
     */
    bodyAsText: string;

    /**
     * The response body as parsed JSON or XML
     */
    parsedBody: Model;
  };
};

export type FormRecognizerRequestBody =
  | Blob
  | string
  | ArrayBuffer
  | ArrayBufferView
  | NodeJS.ReadableStream;
