// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
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
  ModelsSummary,
  TrainingDocumentInfo,
  TrainResult,
  TrainStatus,
  OperationStatus,
  ModelInfo
} from "./generated/models";

export {
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
  ModelsSummary,
  //PageResultModel,
  //ReadResultModel,
  TrainingDocumentInfo,
  TrainStatus,
  TrainResult
};

/**
 * An object representing an extracted word.
 */
export interface ExtractedWord {
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
  containingLine?: ExtractedLine;
}

/**
 * An object representing an extracted text line.
 */
export interface ExtractedLine {
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
  words: ExtractedWord[];
}

// export interface ExtractedCheckBox {
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
export type ExtractedElement = ExtractedWord | ExtractedLine // | ExtractedCheckBox;

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

export interface ExtractedText {
  boundingBox?: number[];
  elements?: ExtractedElement[];
  text: string;
}

export interface ExtractedField {
  confidence: number;
  name: ExtractedText;
  label?: string;
  value: ExtractedText;
}

/**
 * Extracted information from a single page.
 */
export interface ExtractedPage {
  pageNumber: number;
  formTypeId?: number;
  fields?: ExtractedField[];
  tables?: DataTable[];
}

export interface PageRange {
  firstPage: number;
  lastPage: number;
}

export interface ExtractedForm {
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
  value?: string;
} & CommonFieldValue;

export type DateFieldValue = {
  type: "date";
  value?: string;
} & CommonFieldValue;

export type TimeFieldValue = {
  type: "time";
  value?: string;
} & CommonFieldValue;

export type PhoneNumberFieldValue = {
  type: "phoneNumber";
  value?: string;
} & CommonFieldValue;

export type NumberFieldValue = {
  type: "number";
  value?: number;
} & CommonFieldValue;

export type IntegerFieldValue = {
  type: "integer";
  value?: number;
} & CommonFieldValue;

export type ArrayFieldValue = {
  type: "array";
  value?: FieldValue[];
};

export type ObjectFieldValue = {
  type: "object";
  value?: { [propertyName: string]: FieldValue };
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
  value: {
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
  value: ReceiptItemField[];
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

export type ExtractedReceipt = RawReceiptResult & Receipt;
/**
 * Text extracted from a page in the input document.
 */
export interface RawExtractedPage {
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
  // language?: Language;
  /**
   * When includeTextDetails is set to true, a list of recognized text lines. The maximum number of
   * lines returned is 300 per page. The lines are sorted top to bottom, left to right, although in
   * certain cases proximity is treated with higher priority. As the sorting order depends on the
   * detected text, it may change across images and OCR version updates. Thus, business logic
   * should be built upon the actual line location instead of order.
   */
  lines?: ExtractedLine[];
}

/**
 * Analyze Receipt result.
 */
export interface ExtractReceiptResult {
  version: string;
  rawExtractedPages: RawExtractedPage[];
  extractedReceipts?: ExtractedReceipt[];
}

export type ExtractReceiptOperationResult = {
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  createdOn: Date;
  lastUpdatedOn: Date;
} & Partial<ExtractReceiptResult>

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

export interface ExtractedLayout {
  version: string;
  rawExtractedPages: RawExtractedPage[];
  extractedLayoutPages?: ExtractedLayoutPage[];
}

export interface ExtractedLayoutPage {
  fields?: ExtractedField[];
  pageNumber: number;
  tables?: DataTable[];
}

export type ExtractLayoutOperationResult = {
  status: OperationStatus;
  createdOn: Date;
  lastUpdatedOn: Date;
} & Partial<ExtractedLayout>

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

export interface FormResult {
  /**
   * Version of schema used for this result.
   */
  version: string;
  /**
   * Text extracted from the input.
   */
  rawExtractedPages: RawExtractedPage[];
  /**
   * Page-level information extracted from the input.
   */
  extractedPages?: ExtractedPage[];
  /**
   * List of errors reported during the analyze operation.
   */
  errors?: ErrorInformation[];
}

export type ExtractFormOperationResult = Partial<FormResult> & {
  /**
   * Operation status.
   */
  status: OperationStatus;
  /**
   * Date and time (UTC) when the analyze operation was submitted.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastUpdatedOn: Date;
}

export interface LabeledFormResult {
  /**
   * Version of schema used for this result.
   */
  version: string;
  /**
   * Text extracted from the input.
   */
  rawExtractedPages: RawExtractedPage[];
  /**
   * Page-level information extracted from the input.
   */
  extractedPages?: ExtractedPage[];
  /**
   * Document-level information extracted from the input.
   */
  extractedForms?: ExtractedForm[];
  /**
   * List of errors reported during the analyze operation.
   */
  errors?: ErrorInformation[];
}

export type LabeledFormOperationResult = Partial<LabeledFormResult> & {
  /**
   * Operation status.
   */
  status: OperationStatus;
  /**
   * Date and time (UTC) when the analyze operation was submitted.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastUpdatedOn: Date;
}

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
