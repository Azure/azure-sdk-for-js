// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
  FormFieldsReport,
  CopyAuthorizationResult as CopyAuthorizationResultModel,
  KeysResult,
  KeyValueElement as KeyValueElementModel,
  KeyValuePair as KeyValuePairModel,
  Language,
  LengthUnit,
  ModelsSummary,
  ModelStatus as CustomFormModelStatus,
  TrainStatus as TrainingStatus,
  OperationStatus,
  ModelStatus
} from "./generated/models";

export {
  CopyAuthorizationResultModel,
  FormFieldsReport,
  KeysResult,
  KeyValueElementModel,
  KeyValuePairModel,
  Language,
  LengthUnit,
  ModelsSummary,
  ModelStatus,
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
 * Represents common properties of recognized form elements.
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
   * Bounding box of a recognized word.
   */
  boundingBox: Point2D[];
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
   * Confidence value.
   */
  confidence?: number;
  /**
   * The recognized text line that contains this recognized word
   */
  containingLine?: FormLine;
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
 * Represents a recognized check box
 */
// export interface FormCheckBox extends FormElement {
//   /**
//    * Element kind - "checkbox"
//    */
//   kind: "checkbox";
//   ...
// }

/**
 * Information about a recognized element in the form. Examples include
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
   * When includeFieldElements is set to true, a list of references to the elements constituting this table cell.
   */
  fieldElements?: FormElement[];
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
   * List of cells in the data table
   */
  cells: FormTableCell[];
}

/**
 * Represents recognized elements of label-value pairs.
 * For example, "Work Address" is the label of
 * "Work Address: One Microsoft Way, Redmond, WA"
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
 * Represents recognized text elements in label-value pairs.
 * For example, "Address": "One Microsoft Way, Redmond, WA"
 */
export type FormField = {
  /**
   * Confidence value.
   */
  confidence?: number;
  /**
   * Contains the recognized field label's text, bounding box, and field elements.
   */
  labelData?: FieldData;
  /**
   * A user defined label for the field.
   */
  name?: string;
  /**
   * Contains the recognized field value's text, bounding box, and field elements.
   */
  valueData?: FieldData;
} & (
  | {
      /**
       * value of the recognized field.
       */
      value?: string;
      /**
       * Type of the 'value' field
       */
      valueType?: "string";
    }
  | {
      value?: number;
      valueType?: "number";
    }
  | {
      value?: Date;
      valueType?: "date";
    }
  | {
      value?: string;
      valueType?: "time";
    }
  | {
      value?: string;
      valueType?: "phoneNumber";
    }
  | {
      value?: number;
      valueType?: "integer";
    }
  | {
      value?: FormField[];
      valueType?: "array";
    }
  | {
      value?: { [propertyName: string]: FormField };
      valueType?: "object";
    }
);

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
   * When `includeFieldElements` is set to true, a list of recognized text lines. The maximum number of
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
  documentName: string;
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
   * Date and time (UTC) when the custom model training started.
   */
  trainingStartedOn: Date;
  /**
   * Date and time (UTC) when the training operation completed.
   */
  trainingCompletedOn: Date;
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

/**
 * Represents the model for a type of custom form from the training.
 */
export interface CustomFormSubmodel {
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
   * Date and time (UTC) when the custom model training started.
   */
  trainingStartedOn: Date;
  /**
   * Date and time (UTC) when the training operation completed.
   */
  trainingCompletedOn: Date;
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
export interface CopyAuthorization extends CopyAuthorizationResultModel {
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
