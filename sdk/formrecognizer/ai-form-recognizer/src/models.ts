// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

export { KnownFormLanguage, KnownFormLocale } from "./generated/models";

import {
  FormFieldsReport,
  KeysResult,
  KeyValueElement as KeyValueElementModel,
  KeyValueType,
  KeyValuePair as KeyValuePairModel,
  LengthUnit,
  ModelsSummary,
  ModelStatus as CustomFormModelStatus,
  TrainStatus as TrainingStatus,
  OperationStatus,
  ModelStatus,
  FormReadingOrder
} from "./generated/models";

export {
  FormFieldsReport,
  KeysResult,
  KeyValueElementModel,
  KeyValueType,
  KeyValuePairModel,
  LengthUnit,
  ModelsSummary,
  ModelStatus,
  CustomFormModelStatus,
  OperationStatus,
  TrainingStatus,
  FormReadingOrder
};

/**
 * Represents a point used to defined bounding boxes. The unit is either 'pixel' or 'inch', @see {@link LengthUnit}.
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
 * Represents common properties of recognized form elements.
 */
export interface FormElementCommon {
  /**
   * The 1-based page number in the input document.
   */
  pageNumber: number;
  /**
   * Bounding box of a recognized word.
   */
  boundingBox: Point2D[];
  /**
   * Optional text content of the form element.
   */
  text?: string;
}

/**
 * Represents a recognized word.
 */
export interface FormWord extends FormElementCommon {
  /**
   * Element kind - "word"
   */
  kind: "word";
  /**
   * The text content of the word.
   */
  text: string;
  /**
   * Confidence value.
   */
  confidence?: number;
}

/**
 * Represents a recognized text line.
 */
export interface FormLine extends FormElementCommon {
  /**
   * Element kind - "line"
   */
  kind: "line";
  /**
   * The text content of the line.
   */
  text: string;
  /**
   * List of words in the text line.
   */
  words: FormWord[];
  /**
   * Text appearance properties, such as style.
   */
  appearance?: TextAppearance;
}

/**
 * Represents the appearance of a line of text in a form.
 */
export interface TextAppearance {
  /**
   * The identified style of writing, can be one of:
   * - "handwriting"
   * - "other"
   */
  styleName: "handwriting" | "other";
  /**
   * Confidence value.
   */
  styleConfidence: number;
}

/**
 * Represents a recognized selection mark.
 *
 * Selection marks include checkboxes, radio buttons, etc.
 */
export interface FormSelectionMark extends FormElementCommon {
  /**
   * Element kind - "selectionMark"
   */
  kind: "selectionMark";
  /**
   * The state of the mark, either of:
   * - "selected"
   * - "unselected"
   */
  state: "selected" | "unselected";
  /**
   * Confidence value.
   */
  confidence?: number;
}

/**
 * Information about a recognized element in the form. Examples include
 * words, lines, checkbox, etc.
 */
export type FormElement = FormWord | FormLine | FormSelectionMark;

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
  rowSpan: number;
  /**
   * Number of columns spanned by this cell.
   */
  columnSpan: number;
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
   * When includeFieldElements is set to true, a list of references to the elements constituting this table cell.
   */
  fieldElements?: FormElement[];
  /**
   * Is the current cell a header cell?
   */
  isHeader: boolean;
  /**
   * Is the current cell a footer cell?
   */
  isFooter: boolean;
  /**
   * The 1-based page number in the input document where the table cell appears.
   */
  pageNumber: number;
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
   * The bounding box of the recognized table
   *
   * Note: This may be `undefined` for FormTables recognized from from custom models trained
   * without labels.
   */
  boundingBox?: Point2D[];
  /**
   * List of cells in the data table
   */
  cells: FormTableCell[];
  /**
   * The 1-based page number in the input document where the table appears.
   */
  pageNumber: number;
}

/**
 * Represents recognized elements of label-value pairs.
 *
 * For example, "Work Address" is the label of "Work Address: One Microsoft Way, Redmond, WA"
 */
export interface FieldData {
  /**
   * The 1-based page number in the input document.
   */
  pageNumber: number;
  /**
   * The bounding box of the recognized label or value
   */
  boundingBox?: Point2D[];
  /**
   * When includeFieldElements is set to true, a list of references to the
   * form elements that constitute this label-value pair.
   */
  fieldElements?: FormElement[];
  /**
   * The text content of the recognized label or value
   */
  text?: string;
}

/**
 * A field recognized within a form, represented as a tagged union of several
 * different types of form fields, all sharing some common elements.
 *
 * The `valueType` property of this object can be used to determine which
 * variation of FormField was recognized. For example, if the `valueType`
 * property is "number", then the FormField is a FormNumberField, and the
 * `value` property will be a `number`.
 */
export type FormField =
  | FormUnknownField
  | FormStringField
  | FormNumberField
  | FormDateField
  | FormTimeField
  | FormPhoneNumberField
  | FormIntegerField
  | FormSelectionMarkField
  | FormArrayField
  | FormObjectField
  | FormCountryRegionField;

/**
 * Fields common to all variations of FormField.
 */
export interface FormFieldCommon {
  /**
   * The sevice's confidence (expressed as a number between zero and one) in
   * the correctness of the field value.
   */
  confidence?: number;
  /**
   * Contains the recognized field label's text, bounding box, and field elements.
   */
  labelData?: FieldData;
  /**
   * A user-defined label for the field.
   */
  name?: string;
  /**
   * Contains the recognized field value's text, bounding box, and field elements.
   */
  valueData?: FieldData;
}

/**
 * A catch-all form field variation with an unknown value type.
 *
 * This interface is provided for type safety and should only be encountered
 * when the `valueType` of a FormField is undefined, and there is no ordinary
 * reason that should be the case.
 */
export interface FormUnknownField extends FormFieldCommon {
  /**
   * The type of this form value value - undefined.
   *
   * There is no reason this should ordinarily occur, but is provided as a way
   * to hint to the type system that if `valueType` is not known, then the type
   * of value is `unknown`.
   */
  valueType?: undefined;
  /**
   * If `valueType` is undefined, then the type of the value is unknown.
   */
  value?: unknown;
}

/**
 * A form field with a string value.
 */
export interface FormStringField extends FormFieldCommon {
  /**
   * The type of this field's value - "string"
   */
  valueType: "string";
  /**
   * The value of the recognized string.
   */
  value?: string;
}

/**
 * A form field with a numeric value.
 */
export interface FormNumberField extends FormFieldCommon {
  /**
   * The type of this field's value - "number"
   */
  valueType: "number";
  /**
   * The value of the recognized number.
   */
  value?: number;
}

/**
 * A form field with a value representing a date.
 */
export interface FormDateField extends FormFieldCommon {
  /**
   * The type of this field's value - "date"
   */
  valueType: "date";
  /**
   * The value of the date field, represented as a JavaScript date object.
   */
  value?: Date;
}

/**
 * A form field with a value representing a time.
 */
export interface FormTimeField extends FormFieldCommon {
  /**
   * The type of this field's value - "time"
   */
  valueType: "time";
  /**
   * The value of the time field, represented as a string.
   */
  value?: string;
}

/**
 * A form field with a value representing a phone number.
 */
export interface FormPhoneNumberField extends FormFieldCommon {
  /**
   * The type of this field's value - "phoneNumber"
   */
  valueType: "phoneNumber";
  /**
   * The value of the recognized phone number, represented as a string.
   *
   * This value is normalized to a uniform string representation, e.g.
   * "+447911123456". If the service is unable to normalize the value,
   * information about the phone number's textual appearance may appear in the
   * `text` property of the value data (see the `valueData` field of this
   * object).
   */
  value?: string;
}

/**
 * A form field with an integer value.
 */
export interface FormIntegerField extends FormFieldCommon {
  /**
   * The type of this field's value - "integer"
   */
  valueType: "integer";
  /**
   * The value of the recognized integer.
   */
  value?: number;
}

/**
 * A form field with an array of FormFields as a value.
 */
export interface FormArrayField extends FormFieldCommon {
  /**
   * The type of this field's value - "array"
   */
  valueType: "array";
  /**
   * The recognized array of nested fields. Each value in this array is its
   * own `FormField`.
   */
  value?: FormField[];
}

/**
 * A form field with a key-value map (an "object") as a value.
 */
export interface FormObjectField extends FormFieldCommon {
  /**
   * The type of this field's value - "object"
   */
  valueType: "object";
  /**
   * The recognized object structure of the field, represented as a JavaScript
   * object with the nested fields' names as properties that store their
   * values.
   */
  value?: Record<string, FormField>;
}

/**
 * A form field with a value representing the state of a selection mark.
 */
export interface FormSelectionMarkField extends FormFieldCommon {
  /**
   * The type of this field's value - "selectionMark"
   */
  valueType: "selectionMark";
  /**
   * The state of the recognized selection mark, represented as a string, with
   * one of the following values:
   *
   * - "selected"
   * - "unselected"
   */
  value?: "selected" | "unselected";
}

/**
 * A form field with a value representing an administrative region or country
 * in the world.
 */
export interface FormCountryRegionField extends FormFieldCommon {
  /**
   * The type of this field's value - "countryRegion"
   */
  valueType: "countryRegion";
  /**
   * The recognized country or region, represented by a three-letter (ISO
   * 3166-1 alpha-3) code.
   */
  value?: string;
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
   * When `includeFieldElements` is set to true, a list of recognized text lines. The maximum number of
   * lines returned is 300 per page. The lines are sorted top to bottom, left to right, although in
   * certain cases proximity is treated with higher priority. As the sorting order depends on the
   * detected text, it may change across images and OCR version updates. Thus, business logic
   * should be built upon the actual line location instead of order.
   */
  lines?: FormLine[];
  /**
   * List of data tables recognized in the page
   */
  tables?: FormTable[];
  /**
   * List of selection marks recognized in the page
   */
  selectionMarks?: FormSelectionMark[];
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
   * The type of the form.
   */
  formType: string;
  /**
   * Confidence in the correctness of the form type.
   *
   * For unlabeled models, this value will always be undefined.
   */
  formTypeConfidence?: number;
  /**
   * The model ID used to analyze the contents of this document.
   */
  modelId?: string;
  /**
   * First and last page number where the document is found.
   */
  pageRange: FormPageRange;
  /**
   * Dictionary of named field values.
   */
  fields: Record<string, FormField>;
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
   * When includeFieldElements is set to true, a list of references to the elements constituting
   * this field.
   */
  fieldElements?: FormElement[];
  /**
   * The 1-based page number in the input document.
   */
  pageNumber?: number;
}

/**
 * Report for a custom model training document.
 */
export interface TrainingDocumentInfo {
  /**
   * Training document name.
   */
  name: string;
  /**
   * The model ID associated with this training document
   */
  modelId?: string;
  /**
   * Total number of pages trained.
   */
  pageCount: number;
  /**
   * List of errors.
   */
  errors: FormRecognizerError[];
  /**
   * Status of the training operation.
   */
  status: TrainingStatus;
}

/**
 * Optional properties of a custom form model.
 */
export interface CustomFormModelProperties {
  /**
   * Indicates whether or not the model was composed.
   */
  isComposedModel?: boolean;
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
   * The name of the model that was provided during model training.
   *
   * Model names are not guaranteed to be unique.
   */
  modelName?: string;
  /**
   * Optional properties or flags associated with the model.
   */
  properties?: CustomFormModelProperties;
  /**
   * Status of the model.
   */
  status: CustomFormModelStatus;
  /**
   * Date and time (UTC) when the custom model training started.
   */
  trainingStartedOn: Date;
  /**
   * Date and time (UTC) when the training operation completed.
   */
  trainingCompletedOn: Date;
}

/**
 * Information about an identified field within a model.
 */
export interface CustomFormModelField {
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

/**
 * Represents the model for a specific type of custom form from training.
 */
export interface CustomFormSubmodel {
  /**
   * The model ID associated with this submodel.
   */
  modelId?: string;
  /**
   * Estimated extraction accuracy for this model.
   */
  accuracy?: number;
  /**
   * Form fields
   */
  fields: Record<string, CustomFormModelField>;
  /**
   * The form type associated with this submodel.
   */
  formType: string;
}

/**
 * Represents a model from training.
 */
export interface CustomFormModel extends CustomFormModelInfo {
  /**
   * List of document used to train the model and any errors reported for each document.
   */
  trainingDocuments?: TrainingDocumentInfo[];
  /**
   * Errors returned during training operation.
   */
  errors?: FormRecognizerError[];
  /**
   * Form models created by training.
   */
  submodels?: CustomFormSubmodel[];
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
  errors?: FormRecognizerError[];
}

/**
 * Response to the get custom model operation.
 */
export interface Model {
  /**
   * Basic custom model information.
   */
  modelInfo: CustomFormModelInfo;
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
 * Response to the list custom models operation.
 */
export interface Models {
  /**
   * Summary of all trained custom models.
   */
  summary?: ModelsSummary;
  /**
   * Collection of trained custom models.
   */
  modelList?: CustomFormModelInfo[];
  /**
   * Link to the next page of custom models.
   */
  nextLink?: string;
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
 * Contains response data for the listCustomModels operation.
 */
export type ListCustomModelsResponse = Models & {
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
    parsedBody: Models;
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
export interface FormRecognizerError {
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
 * Request parameter that contains authorization claims for copy operation.
 */
export interface CopyAuthorization {
  /**
   * Model identifier.
   */
  modelId: string;
  /**
   * Token claim used to authorize the copy request.
   */
  accessToken: string;
  /**
   * Target resource Id.
   */
  resourceId: string;
  /**
   * Target resource region.
   */
  resourceRegion: string;
  /**
   * The time when the access token expires.
   */
  expiresOn: Date;
}
