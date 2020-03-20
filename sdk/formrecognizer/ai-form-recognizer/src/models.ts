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
  Models,
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
  Models,
  ModelsSummary,
  TrainingDocumentInfo,
  TrainStatus,
  TrainResult
};

/**
 * Represents an extracted word.
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
 * Represents an extracted text line.
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

/**
 * Represents an extracted check box
 */
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
 * Information about an extracted element in the form. Examples include
 * words, lines, checkbox, etc.
 */
export type ExtractedElement = ExtractedWord | ExtractedLine // | ExtractedCheckBox;

/**
 * Represents a cell in extracted table
 */
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

/**
 * Represents extracted text elements in fields of name-value pairs.
 * For example, "Address" is the field name of
 * "Address": "One Microsoft Way, Redmond, WA"
 */
export interface ExtractedText {
  boundingBox?: number[];
  elements?: ExtractedElement[];
  text: string;
}

/**
 * Represents extracted text elements in name-value pairs.
 * For example, "Address": "One Microsoft Way, Redmond, WA"
 */
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

/**
 * Represents a page range
 */
export interface PageRange {
  firstPage: number;
  lastPage: number;
}

/**
 * Represent extracted forms consists of text fields.
 */
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

/**
 * Properties common to the extracted text field
 */
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

/**
 * Represents a field of string value.
 */
export type StringFieldValue = {
  type: "string";
  value?: string;
} & CommonFieldValue;

/**
 * Represents a date field
 */
export type DateFieldValue = {
  type: "date";
  value?: string;
} & CommonFieldValue;

/**
 * Represent a time field
 */
export type TimeFieldValue = {
  type: "time";
  value?: string;
} & CommonFieldValue;

/**
 * Represents a phone number field
 */
export type PhoneNumberFieldValue = {
  type: "phoneNumber";
  value?: string;
} & CommonFieldValue;

/**
 * Represents a number field
 */
export type NumberFieldValue = {
  type: "number";
  value?: number;
} & CommonFieldValue;

/**
 * Represents an integer field
 */
export type IntegerFieldValue = {
  type: "integer";
  value?: number;
} & CommonFieldValue;

/**
 * Represents a special field that contains an array of fields
 */
export interface ArrayFieldValue {
  type: "array";
  value?: FieldValue[];
};

/**
 * Represents a special field that contains other fields as its properties
 */
export interface ObjectFieldValue {
  type: "object";
  value?: { [propertyName: string]: FieldValue };
};

/**
 * Union type of all field types
 */
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
 * Represents an extracted item field in a receipt.
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

/**
 * The values in an extracted receipt item field
 */
export interface ReceiptItem {
  name?: string;
  price?: number;
  quantity?: number;
  totalPrice?: number;
}

/**
 * Represents a list of extracted receipt items in a receipt.
 */
export interface ReceiptItemArrayField {
  type: "array";
  value: ReceiptItemField[];
}

/**
 * Represents extracted receipt fields in a receipt
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

/**
 * Represents text values in a receipt
 */
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

/**
 * Represents an extracted receipt
 */
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

/**
 * Extracted receipt and values in it
 */
export type ExtractedReceipt = RawReceiptResult & Receipt;

/**
 * Raw texts extracted from a page in the input document.
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

/**
 * Extracted information about the layout of the analyzed document
 */
export interface ExtractedLayout {
  version: string;
  rawExtractedPages: RawExtractedPage[];
  extractedLayoutPages?: ExtractedLayoutPage[];
}

/**
 * Represents an extracted layout page
 */
export interface ExtractedLayoutPage {
  fields?: ExtractedField[];
  pageNumber: number;
  tables?: DataTable[];
}

/**
 * Represents the result from an extract layout operation
 */
export type ExtractLayoutOperationResult = {
  status: OperationStatus;
  createdOn: Date;
  lastUpdatedOn: Date;
} & Partial<ExtractedLayout>

/**
 * Contains response data for the extract layout operation.
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

/**
 * Represents an extracted form using unsupervised model
 */
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

/**
 * Represents the result from an extract form operation using unsupervised model
 */
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

/**
 * Represents an extracted form using a model from supervised training with labels
 */
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

/**
 * Represents the result from an extract form operation using a supervised model
 */
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

/**
 * Contains the response data for extract form (unsupervised) operation
 */
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

/**
 * Contains the response data for extract form (supervised) operation
 */
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

/**
 * Contains the response data for retrieving a model from unsupervised training
 */
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

/**
 * Represents result of supervised training with labels
 */
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

/**
 * Represents the trained model from supervised training with labels
 */
export interface LabeledFormModel {
  modelInfo: ModelInfo;
  trainResult?: LabeledFormTrainResult;
}

/**
 * Contains the response data for retrieving a model from supervised training with labels
 */
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

/**
 * Types of input data allowed to analyze operations
 */
export type FormRecognizerRequestBody =
  | Blob
  | string
  | ArrayBuffer
  | ArrayBufferView
  | NodeJS.ReadableStream;
