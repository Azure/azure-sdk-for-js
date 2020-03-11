// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
  AnalyzeLayoutAsyncHeaders,
  AnalyzeOperationResult as AnalyzeOperationResultModel,
  AnalyzeResult as AnalyzeResultModel,
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
  PageResult as PageResultModel,
  ReadResult,
  TextWord,
  TrainCustomModelAsyncHeaders,
  TrainingDocumentInfo,
  TrainStatus,
  TrainResult,
  TextLine,
  OperationStatus,
  ModelInfo
} from "./generated/models/index";

export {
  AnalyzeLayoutAsyncHeaders,
  AnalyzeOperationResultModel,
  AnalyzeResultModel,
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
  PageResultModel,
  ReadResult,
  TrainCustomModelAsyncHeaders,
  TrainingDocumentInfo,
  TrainStatus,
  TextWord,
  TrainResult,
  TextLine
}

/**
 * Information about extracted text elements  in documents
 */
export type TextElement = (TextWord | TextLine) & { pageNumber: number };

export interface DataTableCell {
  boundingBox: number[];
  columnIndex: number;
  columnSpan?: number;
  confidence: number;
  elements?: TextElement[];
  isFooter?: boolean;
  isHeader?: boolean;
  rowIndex: number;
  rowSpan?: number;
  text: string;
}

/**
 * Information about the extracted table contained in a page.
 */
export interface DataTable {
  rows: DataTableRow[];
}

/**
 * Represents a row of data table cells in extracted table.
 */
export interface DataTableRow {
  cells: DataTableCell[]
}


export interface KeyValueElement {
  boundingBox?: number[];
  elements?: TextElement[];
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
  page: number; // pageNumber
  clusterId?: number;
  keyValuePairs?: KeyValuePair[];
  tables?: DataTable[];
}

export type AnalyzeResult = Omit<AnalyzeResultModel, "pageResults"> & {
  /**
   * Page-level information extracted from the input.
   */
  pageResults?: PageResult[];
}

export interface CommonFieldValue {
  /**
   * Text content of the extracted field.
   */
  text?: string;
  /**
   * Bounding box of the field value, if appropriate.
   */
  boundingBox: number[];
  /**
   * Confidence score.
   */
  confidence: number;
  /**
   * When includeTextDetails is set to true, a list of references to the text elements constituting
   * this field.
   */
  elements?: TextElement[];
  /**
   * The 1-based page number in the input document.
   */
  page: number;
}

export type StringFieldValue = {
  type: "string";
  valueString: string;
} & CommonFieldValue;

export type DateFieldValue = {
  type: "date";
  valueDate: string;
} & CommonFieldValue;

export type TimeFieldValue = {
  type: "time";
  valueTime: string;
} & CommonFieldValue;

export type PhoneNumberFieldValue = {
  type: "phoneNumber";
  valuePhoneNumber: string;
} & CommonFieldValue;

export type NumberFieldValue = {
  type: "number";
  valueNumber: number;
} & CommonFieldValue;

export type IntegerFieldValue = {
  type: "integer";
  valueInteger: number;
} & CommonFieldValue;

export type ArrayFieldValue = {
  type: "array";
  valueArray: FieldValue[];
} & CommonFieldValue;

export type ObjectFieldValue = {
  type: "object";
  valueObject: { [propertyName: string]: FieldValue };
} & CommonFieldValue;

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
  }
} & CommonFieldValue

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
  merchantName: string;
  merchantPhoneNumber: string;
  merchantAddress: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  transactionDate: string;
  transactionTime: string;
}

export interface RawReceiptResult {
  /**
   * Document type.
   */
  docType: "prebuilt:receipt";
  /**
   * First and last page number where the document is found.
   */
  pageRange: number[];
  /**
   * Dictionary of named field values.
   */
  fields: { [propertyName: string]: FieldValue };
}

export type ReceiptResult = RawReceiptResult & Receipt

/**
 * Analyze Receipt result.
 */
export interface AnalyzeReceiptResult {
  version: string;
  readResults: ReadResult[];
  receiptResults?: ReceiptResult[];
}

export interface AnalyzeReceiptOperationResult {
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  createdDateTime: Date;
  lastUpdatedDateTime: Date;
  analyzeResult?: AnalyzeReceiptResult;
}

/**
 * Contains response data for the getAnalyzeReceiptResult operation.
 */
export type AnalyzeReceiptResultResponse = AnalyzeReceiptOperationResult & {
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
  }
}

export interface AnalyzeLayoutResult {
  version: string;
  readResults: ReadResult[];
  pageResults?: LayoutPageResult[];
}

export interface LayoutPageResult {
  keyValuePairs?: KeyValuePair[];
  page: number; // pageNumber
  tables?: DataTable[];
};

export interface AnalyzeLayoutOperationResult {
  status: OperationStatus;
  createdDateTime: Date;
  lastUpdatedDateTime: Date;
  analyzeResult?: AnalyzeLayoutResult;
}

/**
 * Contains response data for the getAnalyzeLayoutResult operation.
 */
export type AnalyzeLayoutResultResponse = AnalyzeLayoutOperationResult & {
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
  }
}

export type AnalyzeFormResult = Omit<AnalyzeResult, "documentResults">

export type AnalyzeFormOperationResult = Omit<AnalyzeOperationResultModel, 'analyzeResult'> & {
  analyzeResult?: AnalyzeFormResult;
}

export type AnalyzeFormResultResponse = AnalyzeFormOperationResult & {
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
}
export interface CustomFormModelTrainResult {
  trainingDocuments: TrainingDocumentInfo[];
  errors?: ErrorInformation[];
}

export interface CustomFormModel {
  kind: "unlabeled";
  modelInfo: ModelInfo;
  keys?: KeysResult;
  trainResult?: CustomFormModelTrainResult;
}

export interface LabeledFormModel{
  kind: "labeled";
  modelInfo: ModelInfo;
  trainResult?: TrainResult;
};


export type CustomFormModelResponse = CustomFormModel & {
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
