// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
  AnalyzeOperationResult as AnalyzeOperationResultModel,
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
  ModelStatus,
  TrainingDocumentInfo,
  TrainResult,
  TrainStatus,
  OperationStatus,
  ModelInfo
} from "./generated/models";

export {
  AnalyzeOperationResultModel,
  ErrorInformation,
  FormFieldsReport,
  KeysResult,
  KeyValueElementModel,
  KeyValuePairModel,
  Language,
  LengthUnit,
  Models,
  ModelsSummary,
  ModelStatus,
  OperationStatus,
  TrainingDocumentInfo,
  TrainStatus,
  TrainResult
};

/**
 * Represents a point used to defined bounding boxes. The unit is either 'pixel' or 'inch' (See {link @LengthUnit}).
 */
export interface Point2D {
  /**
   * x coordinate
   */
  x: number;
  /**
   * y coordinate
   */
  y: number;
}

/**
 * Represents common properties of recognized form contents.
 */
export interface FormElementCommon {
  /**
   * The 1-based page number in the input document.
   */
  pageNumber: number;
  /**
   * The text content of the word.
   */
  text: string;
  /**
   * Bounding box of an recognized word.
   */
  boundingBox: Point2D[];
}

/**
 * Represents an recognized word.
 */
export interface FormWord extends FormElementCommon {
  /**
   * Element kind - "word"
   */
  kind: "word";
  /**
   * Confidence value.
   */
  confidence?: number;
  /**
   * The recognized text line that contains this recognized word
   */
  containingLine?: FormLine;
}

/**
 * Represents an recognized text line.
 */
export interface FormLine extends FormElementCommon {
  /**
   * Element kind - "line"
   */
  kind: "line";
  /**
   * The detected language of this line, if different from the overall page language. Possible
   * values include: 'en', 'es'
   */
  // language?: Language;
  /**
   * List of words in the text line.
   */
  words: FormWord[];
}

/**
 * Represents an recognized check box
 */
// export interface FormCheckBox extends FormContent {
//   /**
//    * Element kind - "checkbox"
//    */
//   kind: "checkbox";
//   checked: boolean;
// }

/**
 * Information about an recognized element in the form. Examples include
 * words, lines, checkbox, etc.
 */
export type FormElement = FormWord | FormLine; // | FormCheckBox;

/**
 * Represents a cell in recognized table
 */
export interface FormTableCell {
  /**
   * Row index of the cell.
   */
  rowIndex: number;
  /**
   * Column index of the cell.
   */
  columnIndex: number;
  /**
   * Number of rows spanned by this cell.
   */
  rowSpan?: number;
  /**
   * Number of columns spanned by this cell.
   */
  columnSpan?: number;
  /**
   * Text content of the cell.
   */
  text: string;
  /**
   * Bounding box of the cell.
   */
  boundingBox: Point2D[];
  /**
   * Confidence value.
   */
  confidence: number;
  /**
   * When includeTextDetails is set to true, a list of references to the text elements constituting this table cell.
   */
  textContent?: FormElement[];
  /**
   * Is the current cell a header cell?
   */
  isHeader?: boolean;
  /**
   * Is the current cell a footer cell?
   */
  isFooter?: boolean;
}

/**
 * Represents a row of data table cells in recognized table.
 */
export interface FormTableRow {
  /**
   * List of data table cells in a {@link FormTableRow}
   */
  cells: FormTableCell[];
}

/**
 * Information about the recognized table contained in a page.
 */
export interface FormTable {
  /**
   * Number of rows in the data table
   */
  rowCount: number;
  /**
   * Number of columns in the data table
   */
  columnCount: number;
  /**
   * List of rows in the data table
   */
  rows: FormTableRow[];
}

/**
 * Represents recognized text elements of label-value pairs.
 * For example, "Work Address" is the label of
 * "Work Address: One Microsoft Way, Redmond, WA"
 */
export interface FormText {
  /**
   * The bounding box of the recognized label or value
   */
  boundingBox?: Point2D[];
  /**
   * When includeTextDetails is set to true, a list of references to the text elements constituting this name or value.
   */
  textContent?: FormElement[];
  /**
   * The text content of the recognized label or value
   */
  text?: string;
}

/**
 * Represents recognized text elements in label-value pairs.
 * For example, "Address": "One Microsoft Way, Redmond, WA"
 */
export interface FormField {
  /**
   * Confidence value.
   */
  confidence?: number;
  /**
   * Text of the recognized label of the field.
   */
  fieldLabel?: FormText;
  /**
   * A user defined label for the field.
   */
  name?: string;
  /**
   * Text of the recognized value of the field.
   */
  valueText?: FormText;
  /**
   * Value of the field.
   */
  value?: FieldValueTypes;
}

/**
 * Recognized information from a single page.
 */
export interface RecognizedPage {
  /**
   * Page number
   */
  pageNumber: number;
  /**
   * Id of recognized form type
   */
  formTypeId?: number;
  /**
   * List of name/value pairs recognized from the page
   */
  fields?: FormField[];
}

/**
 * Represents a Form page range
 */
export interface FormPageRange {
  /**
   * The page number of the first page in the range
   */
  firstPageNumber: number;
  /**
   * The page number of the last page in the range
   */
  lastPageNumber: number;
}

/**
 * Represent recognized forms consists of text fields that have semantic meanings.
 */
export interface RecognizedForm {
  /**
   * Document type.
   */
  formType: string;
  /**
   * First and last page number where the document is found.
   */
  pageRange: FormPageRange;
  /**
   * Dictionary of named field values.
   */
  fields: { [propertyName: string]: FormField };
  /**
   * Texts and tables extracted from a page in the input
   */
  pages: FormPage[];
}

/**
 * Properties common to the recognized text field
 */
export interface CommonFieldValue {
  /**
   * Text content of the recognized field.
   */
  text?: string;
  /**
   * Bounding box of the field value, if appropriate.
   */
  boundingBox?: Point2D[];
  /**
   * Confidence score.
   */
  confidence?: number;
  /**
   * When includeTextDetails is set to true, a list of references to the text elements constituting
   * this field.
   */
  textContent?: FormElement[];
  /**
   * The 1-based page number in the input document.
   */
  pageNumber?: number;
}

export type FieldValueTypes =
  | string
  | Date
  | number
  | FieldValue[]
  | { [propertyName: string]: FieldValue };

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
  value?: Date;
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
}

/**
 * Represents a special field that contains other fields as its properties
 */
export interface ObjectFieldValue {
  type: "object";
  value?: { [propertyName: string]: FieldValue };
}

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
 * Represents an recognized item field in a receipt.
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
 * The values in an recognized receipt item field
 */
export interface ReceiptItem {
  /**
   * Name of the receipt item
   */
  name?: string;
  /**
   * Price of the receipt item
   */
  price?: number;
  /**
   * Quantity of the receipt item
   */
  quantity?: number;
  /**
   * Total price of the receipt item
   */
  totalPrice?: number;
}

/**
 * Represents a list of recognized receipt items in a receipt.
 */
export interface ReceiptItemArrayField {
  type: "array";
  value: ReceiptItemField[];
}

/**
 * Represents recognized receipt fields in a receipt
 */
export interface RawUSReceipt {
  /**
   * Receipt type field
   */
  ReceiptType: StringFieldValue;
  /**
   * Merchant name field
   */
  MerchantName: StringFieldValue;
  /**
   * Merchant phone number field
   */
  MerchantPhoneNumber: PhoneNumberFieldValue;
  /**
   * Merchant address field
   */
  MerchantAddress: StringFieldValue;
  /**
   * Receipt item list field
   */
  Items: ReceiptItemArrayField;
  /**
   * Subtotal field
   */
  Subtotal: NumberFieldValue;
  /**
   * Tax field
   */
  Tax: NumberFieldValue;
  /**
   * Tip field
   */
  Tip: NumberFieldValue;
  /**
   * Total field
   */
  Total: NumberFieldValue;
  /**
   * Transaction date field
   */
  TransactionDate: DateFieldValue;
  /**
   * Transaction time field
   */
  TransactionTime: TimeFieldValue;
}

/**
 * Represents text values in a receipt
 */
export interface Receipt {
  /**
   * Receipt type, e.g., "Itemized"
   */
  receiptType: string;
  /**
   * Merchant name
   */
  merchantName?: string;
  /**
   * Merchant phone number
   */
  merchantPhoneNumber?: string;
  /**
   * Merchant address
   */
  merchantAddress?: string;
  /**
   * items in the receipt
   */
  items: ReceiptItem[];
  /**
   * Subtotal
   */
  subtotal?: number;
  /**
   * Tax
   */
  tax?: number;
  /**
   * Tip
   */
  tip?: number;
  /**
   * Total
   */
  total?: number;
  /**
   * Transaction date
   */
  transactionDate?: Date;
  /**
   * Transaction time
   */
  transactionTime?: string;
}

/**
 * Represents an recognized receipt
 */
export interface RawReceiptResult {
  /**
   * Document type.
   */
  docType: "prebuilt:receipt";
  /**
   * First and last page number where the document is found.
   */
  pageRange: FormPageRange;
  /**
   * Dictionary of named field values.
   */
  fields: { [propertyName: string]: FieldValue };
}

/**
 * Recognized receipt and values in it
 */
export type RecognizedReceipt = RawReceiptResult & Receipt;

/**
 * Raw texts recognized from a page in the input document.
 */
export interface FormPage {
  /**
   * The 1-based page number in the input document.
   */
  pageNumber: number;
  /**
   * The general orientation of the text in clockwise direction, measured in degrees between (-180,
   * 180].
   */
  textAngle: number;
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
  lines?: FormLine[];
  /**
   * List of data tables recognized form the page
   */
  tables?: FormTable[];
}

/**
 * Analyze Receipt result.
 */
export interface RecognizeReceiptResult {
  /**
   * Version of schema used for this result.
   */
  version: string;
  /**
   * List of raw text line information on recognized pages
   */
  rawExtractedPages: FormPage[];
  /**
   * List of receipts recognized from input document
   */
  extractedReceipts?: RecognizedReceipt[];
}

/**
 * Results of an recognize receipt operation
 */
export type RecognizeReceiptOperationResult = {
  /**
   * Operation status.
   */
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  /**
   * Date and time (UTC) when the analyze operation was submitted.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastUpdatedOn: Date;
} & Partial<RecognizeReceiptResult>;

/**
 * Contains response data for an recognize receipt operation.
 */
export type RecognizeReceiptResultResponse = RecognizeReceiptOperationResult & {
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
 * Recognized information about the layout of the analyzed document
 */
export interface RecognizedContent {
  /**
   * Version of schema used for this result.
   */
  version: string;
  /**
   * Texts and tables extracted from a page in the input
   */
  pages: FormPage[];
}

/**
 * Represents the result from an Recognize Content operation
 */
export type RecognizeContentOperationResult = {
  /**
   * Operation status.
   */
  status: OperationStatus; // 'notStarted' | 'running' | 'succeeded' | 'failed';
  /**
   * Date and time (UTC) when the analyze operation was submitted.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastUpdatedOn: Date;
} & Partial<RecognizedContent>;

/**
 * Contains response data for the Recognize Content operation.
 */
export type RecognizeContentResultResponse = RecognizeContentOperationResult & {
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
 * Represents the result from an recognize form operation using a model from training without labels.
 */
export type RecognizeFormOperationResult = Partial<FormResult> & {
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
};

/**
 * Represents an recognized form using a model from training with labels.
 */
export interface FormResult {
  /**
   * Version of schema used for this result.
   */
  version: string;
  /**
   * Document-level information recognized from the input using machine learning. They include
   * recognized fields that have meaning beyond text, for example, addresses, phone numbers, dates, etc.
   */
  forms?: RecognizedForm[];
  /**
   * List of errors reported during the analyze operation.
   */
  errors?: ErrorInformation[];
}

/**
 * Represents the result from an recognize form operation using a model from training with labels.
 */
export type LabeledFormOperationResult = Partial<FormResult> & {
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
};

/**
 * Contains the response data for recognize form operation using a model from training without labels.
 */
export type RecognizeFormResultResponse = RecognizeFormOperationResult & {
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
 * Contains the unlabeled training results.
 */
export interface FormTrainResult {
  /**
   * List of document used to train the model and any errors reported for each document.
   */
  trainingDocuments: TrainingDocumentInfo[];
  /**
   * Errors returned during training operation.
   */
  errors?: ErrorInformation[];
}

/**
 * Represents a model from unlabeled training.
 */
export interface FormModel {
  /**
   * Information about the model
   */
  modelInfo: ModelInfo;
  /**
   * Keys recognized from unlabeled training.
   */
  keys: KeysResult;
  /**
   * Results of the unlabeled training.
   */
  trainResult?: FormTrainResult;
}

/**
 * Contains the response data for retrieving a model from unlabeled training.
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
 * Represents result of training with labels.
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
 * Represents the trained model from training with labels.
 */
export interface LabeledFormModel {
  /**
   * Information about the model in training with labels.
   */
  modelInfo: ModelInfo;
  /**
   * Results of the training with labels.
   */
  trainResult?: LabeledFormTrainResult;
}

/**
 * Contains the response data for retrieving a model from training with labels
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
  | ArrayBuffer
  | ArrayBufferView
  | NodeJS.ReadableStream;
