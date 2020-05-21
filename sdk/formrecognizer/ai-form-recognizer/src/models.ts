// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
  AnalyzeOperationResult as AnalyzeOperationResultModel,
  FormFieldsReport,
  KeysResult,
  KeyValueElement as KeyValueElementModel,
  KeyValuePair as KeyValuePairModel,
  Language,
  LengthUnit,
  ModelInfo,
  Models,
  ModelsSummary,
  ModelStatus as CustomFormModelStatus,
  TrainStatus as TrainingStatus,
  OperationStatus
} from "./generated/models";

export {
  AnalyzeOperationResultModel,
  FormFieldsReport,
  KeysResult,
  KeyValueElementModel,
  KeyValuePairModel,
  Language,
  LengthUnit,
  ModelInfo,
  Models,
  ModelsSummary,
  CustomFormModelStatus,
  OperationStatus,
  TrainingStatus
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
export interface FormContentCommon {
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
export interface FormWord extends FormContentCommon {
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
export interface FormLine extends FormContentCommon {
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
//   ...
// }

/**
 * Information about an recognized element in the form. Examples include
 * words, lines, checkbox, etc.
 */
export type FormContent = FormWord | FormLine; // | FormCheckBox;

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
  textContent?: FormContent[];
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
  textContent?: FormContent[];
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
  labelText?: FormText;
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
  /**
   * Data type of the value property
   */
  valueType?: ValueTypes;
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
 * Array of {@link FormPage}
 */
export interface FormPageArray extends Array<FormPage> {}

/**
 * Represent recognized form consists of text fields that have semantic meanings.
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
 * Array of {@link RecognizedForm}
 */
export interface RecognizedFormArray extends Array<RecognizedForm> {}

/**
 * Properties common to the recognized text field
 */
interface CommonFieldValue {
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
  textContent?: FormContent[];
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

export type ValueTypes =
  | "string"
  | "date"
  | "time"
  | "phoneNumber"
  | "number"
  | "integer"
  | "array"
  | "object";

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
    Name?: StringFieldValue;
    Quantity?: NumberFieldValue;
    Price?: NumberFieldValue;
    TotalPrice?: NumberFieldValue;
  };
} & CommonFieldValue;

/**
 * Represents a list of recognized receipt items in a receipt.
 */
export interface ReceiptItemArrayField {
  type: "array";
  value: ReceiptItemField[];
}

/**
 * Represents a line item in a receipt.
 */
export interface USReceiptItem {
  /**
   * Name of the receipt item
   */
  name?: FormField;
  /**
   * Price of the receipt item
   */
  price?: FormField;
  /**
   * Quantity of the receipt item
   */
  quantity?: FormField;
  /**
   * Total price of the receipt item
   */
  totalPrice?: FormField;
}

export type USReceiptType = {
  type: "Unrecognized" | "Itemized" | "CreditCard" | "Gas" | "Parking";
  /**
   * Confidence value.
   */
  confidence?: number;
}

/**
 * United States receipt
 */
export interface USReceipt {
  /**
   * Receipt type field
   */
  receiptType: USReceiptType;
  /**
   * Merchant name field
   */
  merchantName: FormField;
  /**
   * Merchant phone number field
   */
  merchantPhoneNumber: FormField;
  /**
   * Merchant address field
   */
  merchantAddress: FormField;
  /**
   * Receipt item list field
   */
  items: USReceiptItem[];
  /**
   * Subtotal field
   */
  subtotal: FormField;
  /**
   * Tax field
   */
  tax: FormField;
  /**
   * Tip field
   */
  tip: FormField;
  /**
   * Total field
   */
  total: FormField;
  /**
   * Transaction date field
   */
  transactionDate: FormField;
  /**
   * Transaction time field
   */
  transactionTime: FormField;
}

/**
 * Recognized Receipt
 */
export type RecognizedReceipt = {
  /**
   * Locale of the receipt
   */
  locale: string;
  /**
   * Recognized form
   */
  recognizedForm: RecognizedForm;
} & (
  | { locale: "US" } & USReceipt
//  | { locale: "UK" } & UKReceipt
// ...
)

/*
 * Array of {@link RecognizedReceipt}
 */
export interface RecognizedReceiptArray extends Array<RecognizedReceipt> {}

/**
 * Report for a custom model training document.
 */
export interface TrainingDocumentInfo {
  /**
   * Training document name.
   */
  documentName: string;
  /**
   * Total number of pages trained.
   */
  pageCount: number;
  /**
   * List of errors.
   */
  errors: FormRecognizerErrorDetails[];
  /**
   * Status of the training operation.
   */
  status: TrainingStatus;
}

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
  errors?: FormRecognizerErrorDetails[];
}

/**
 * Basic custom model information.
 */
export interface CustomFormModelInfo {
  /**
   * Model identifier.
   */
  modelId: string;
  /**
   * Status of the model.
   */
  status: CustomFormModelStatus;
  /**
   * Date and time (UTC) when the model was created.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastModified: Date;
}

/**
 * Represents a model from unlabeled training.
 */
export interface FormModel {
  /**
   * Information about the model
   */
  modelInfo: CustomFormModelInfo;
  /**
   * Keys recognized from unlabeled training.
   */
  keys: KeysResult;
  /**
   * Results of the unlabeled training.
   */
  trainResult?: FormTrainResult;
}

export interface CustomFormField {
  /**
   * Estimated extraction accuracy for this field.
   */
  accuracy?: number;
  /**
   * Training field name.
   */
  name: string;
  /**
   * Training field label.
   */
  label: string | null;
}

export interface CustomFormSubModel {
  /**
   * Estimated extraction accuracy for this field.
   */
  accuracy?: number;
  /**
   * Form fields
   */
  fields: { [propertyName: string]: CustomFormField };
  /**
   * Form type
   */
  formType: string;
}

/**
 * Represents a model from training.
 */
export interface CustomFormModel {
  /**
   * Model identifier.
   */
  modelId: string;
  /**
   * Status of the model.
   */
  status: CustomFormModelStatus;
  /**
   * Date and time (UTC) when the model was created.
   */
  createdOn: Date;
  /**
   * Date and time (UTC) when the status was last updated.
   */
  lastModified: Date;
  /**
   * List of document used to train the model and any errors reported for each document.
   */
  trainingDocuments?: TrainingDocumentInfo[];
  /**
   * Errors returned during training operation.
   */
  errors?: FormRecognizerErrorDetails[];
  /**
   * Form models created by training.
   */
  models?: CustomFormSubModel[];
}

/**
 * Custom model training result.
 */
export interface TrainResult {
  /**
   * List of the documents used to train the model and any errors reported in each document.
   */
  trainingDocuments: TrainingDocumentInfo[];
  /**
   * List of fields used to train the model and the train operation error reported by each.
   */
  fields?: FormFieldsReport[];
  /**
   * Average accuracy.
   */
  averageModelAccuracy?: number;
  /**
   * Errors returned during the training operation.
   */
  errors?: FormRecognizerErrorDetails[];
}

/**
 * Response to the get custom model operation.
 */
export interface Model {
  /**
   * Basic custom model information.
   */
  modelInfo: ModelInfo;
  /**
   * Keys extracted by the custom model.
   */
  keys?: KeysResult;
  /**
   * Custom model training result.
   */
  trainResult?: TrainResult;
}

/**
 * Contains the response data for retrieving a model from unlabeled training.
 */
export type FormModelResponse = CustomFormModel & {
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
 * Types of binary data allowed as input to recognition operations
 */
export type FormRecognizerRequestBody =
  | Blob
  | ArrayBuffer
  | ArrayBufferView
  | NodeJS.ReadableStream;

/**
 * Summary of all models in the cognitive service account.
 */
export interface AccountProperties {
  /**
   * Current count of trained custom models.
   */
  customModelCount: number;
  /**
   * Max number of models that can be trained for this account.
   */
  customModelLimit: number;
}

/**
 * Represents errors from Azure Form Recognizer service
 */
export interface FormRecognizerErrorDetails {
  /**
   * Error code
   */
  code: string;
  /**
   * Error message
   */
  message: string;
}

/**
 * Error from recognize custom forms operation
 */
export class FormRecognizerError extends Error {
  /**
   * Original errors from the service response
   */
  innerErrors?: FormRecognizerErrorDetails[]
  constructor(message: string, innerErrors?: FormRecognizerErrorDetails[]) {
    super(message);
    this.innerErrors = innerErrors;
  }
}
