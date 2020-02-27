// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";

import {
  AnalyzeOperationResult,
  AnalyzeResult
} from "./generated/models/index";

export {
  AnalyzeOperationResult,
  AnalyzeResult
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
export interface ReceiptItemField {
  type: "object";
  valueObject: {
    Name: StringFieldValue;
    //Quantity: NumberFieldValue;
    TotalPrice: NumberFieldValue;
  };
}

export interface ReceiptItem {
  name: string;
  //quantity: number;
  totalPrice: number;
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
  fields: RawReceipt;
}

export type ReceiptResult = {
  /**
   * Document type.
   */
  docType: "prebuilt:receipt";
  /**
   * First and last page number where the document is found.
   */
  pageRange: number[];

  rawReciptFields: { [propertyName: string]: FieldValue };
} & Receipt

/**
 * Analyze Receipt result.
 */
export type AnalyzeReceiptResult = Omit<AnalyzeResult, 'documentResults'> & {
  receiptResults?: ReceiptResult[];
}

/**
 * Status and result of the queued analyze receipt operation.
 */
export type AnalyzeReceiptOperationResult = Omit<AnalyzeOperationResult, 'analyzeResult'> & {
  /**
   * Results of the analyze receipt operation.
   */
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
    parsedBody: AnalyzeOperationResult;
  };
};

export type AnalyzeLayoutResult = Omit<AnalyzeResult, 'documentResults'>;

export type AnalyzeLayoutOperationResult = Omit<AnalyzeOperationResult, 'analyzeResult'> & {
  analyzeResult?: AnalyzeLayoutResult;
}

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
    parsedBody: AnalyzeOperationResult;
  };
};
