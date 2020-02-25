// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ReadResult,
  PageResult,
  ErrorInformation,
  OperationStatus
} from "./generated/models/index";

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
  elements?: string[];
  /**
   * The 1-based page number in the input document.
   */
  page?: number;
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
  valueNumber: string;
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
 * A set of extracted fields corresponding to the input document.
 */
export interface DocumentResult {
  /**
   * Document type.
   */
  docType: string;
  /**
   * First and last page number where the document is found.
   */
  pageRange: number[];
  /**
   * Dictionary of named field values.
   */
  fields: { [propertyName: string]: FieldValue };
}

/**
 * Analyze operation result.
 */
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

/**
 * Represents an item in a receipt.
 */
export interface ReceiptItemField {
  type: "object";
  valueObject: {
    Name: StringFieldValue;
    TotalPrice: NumberFieldValue;
  };
}

/**
 * Represents all the items in a receipt.
 */
export interface ReceiptItemArrayField {
  type: "array";
  valueArray: ReceiptItemField;
}

/**
 * Receipt
 */
export interface Receipt {
  ReceiptType: StringFieldValue;
  MerchantName: StringFieldValue;
  MerchantPhoneNumber: PhoneNumberFieldValue;
  MerchantAddress: StringFieldValue;
  Items: ReceiptItemArrayField;
  Subtotal: NumberFieldValue;
  Tax: NumberFieldValue;
  Total: NumberFieldValue;
  TransactionDate: DateFieldValue;
  TransactionTime: TimeFieldValue;
}

export interface ReceiptResult {
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
  fields: Receipt;
}

/**
 * Analyze Receipt result.
 */
export interface AnalyzeReceiptResult {
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
   * Receipt information extracted from the input.
   */
  receiptResults?: ReceiptResult[];
  /**
   * List of errors reported during the analyze operation.
   */
  errors?: ErrorInformation[];
}

/**
 * Status and result of the queued analyze operation.
 */
export interface AnalyzeReceiptOperationResult {
  /**
   * Operation status. Possible values include: 'notStarted', 'running', 'succeeded', 'failed'
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
  /**
   * Results of the analyze operation.
   */
  analyzeResult?: AnalyzeReceiptResult;
}
