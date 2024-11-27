// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @azsdk-util
 * @azsdk-skip-javascript
 */

// Model:       prebuilt-tax.us.1098E
// Description: Extract key information from United States Internal Revenue Service Form 1098-E (2021-current).
// API Version: 2023-07-31
// Created:     Wed Aug 02 2023

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from United States Internal Revenue Service Form 1098-E (2021-current).
 */
export const PrebuiltTaxUs1098EModel = fr.createModelFromSchema(
  modelInfo(),
) as fr.DocumentModel<PrebuiltTaxUs1098EResult>;

export interface PrebuiltTaxUs1098EResult extends fr.AnalyzeResultCommon {
  /**
   * Extracted pages.
   */
  pages?: fr.DocumentPage[];
  /**
   * Extracted tables.
   */
  tables?: fr.DocumentTable[];
  /**
   * Extracted key-value pairs.
   */
  keyValuePairs?: fr.DocumentKeyValuePair[];
  /**
   * Extracted text languages.
   */
  languages?: fr.DocumentLanguage[];
  /**
   * Extracted font styles.
   */
  styles?: fr.DocumentStyle[];
  /**
   * Extracted document paragraphs.
   */
  paragraphs?: fr.DocumentParagraph[];
  /**
   * Extracted documents.
   */
  documents: PrebuiltTaxUs1098EDocument[];
}

export type PrebuiltTaxUs1098EDocument = TaxUs1098E;

export interface TaxUs1098E {
  /**
   * Document type: "tax.us.1098E".
   */
  docType: "tax.us.1098E";
  /**
   * Document fields.
   */
  fields: TaxUs1098EFields;
  /**
   * Bounding regions covering the document.
   */
  boundingRegions?: fr.BoundingRegion[];
  /**
   * Locations of the document's elements in the `content` text (reading-order-concatenated content).
   */
  spans: fr.DocumentSpan[];
  /**
   * The service's confidence that it has correctly extracted the document.
   */
  confidence: number;
}

/**
 * Describes the fields of `TaxUs1098EFields`.
 */
export interface TaxUs1098EFields {
  /**
   * Form tax year
   */
  taxYear?: fr.DocumentNumberField;
  /**
   * `TaxUs1098E` "Borrower" field
   */
  borrower?: fr.DocumentObjectField<TaxUs1098EBorrower>;
  /**
   * `TaxUs1098E` "Lender" field
   */
  lender?: fr.DocumentObjectField<TaxUs1098ELender>;
  /**
   * Student loan interest received by lender (box 1)
   */
  studentLoanInterest?: fr.DocumentNumberField;
  /**
   * Does box 1 exclude loan origination fees and/or capitalized interest (box 2)
   */
  excludesFeesOrInterest?: fr.DocumentStringField;
}

/**
 * Describes the fields of `TaxUs1098EBorrower`.
 */
export interface TaxUs1098EBorrower {
  /**
   * Borrower's tax identification number
   */
  tIN?: fr.DocumentStringField;
  /**
   * Borrower's full name as written on the form
   */
  name?: fr.DocumentStringField;
  /**
   * Borrower's address
   */
  address?: fr.DocumentAddressField;
  /**
   * Borrower's account number
   */
  accountNumber?: fr.DocumentStringField;
}

/**
 * Describes the fields of `TaxUs1098ELender`.
 */
export interface TaxUs1098ELender {
  /**
   * Lender's tax identification number
   */
  tIN?: fr.DocumentStringField;
  /**
   * Lender's name
   */
  name?: fr.DocumentStringField;
  /**
   * Lender's address
   */
  address?: fr.DocumentAddressField;
  /**
   * Lender's telephone number
   */
  telephone?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-tax.us.1098E",
    description:
      "Extract key information from United States Internal Revenue Service Form 1098-E (2021-current).",
    createdOn: "2023-07-31T00:00:00.000Z",
    apiVersion: "2023-07-31",
    docTypes: {
      "tax.us.1098E": {
        buildMode: "template",
        fieldSchema: {
          TaxYear: {
            type: "number",
            description: "Form tax year",
            example: "2021",
          },
          Borrower: {
            type: "object",
            properties: {
              TIN: {
                type: "string",
                description: "Borrower's tax identification number",
                example: "123-45-6789",
              },
              Name: {
                type: "string",
                description: "Borrower's full name as written on the form",
                example: "John Smith",
              },
              Address: {
                type: "address",
                description: "Borrower's address",
                example: "123 Microsoft Way, Redmond WA 98052",
              },
              AccountNumber: {
                type: "string",
                description: "Borrower's account number",
                example: "55123456789",
              },
            },
          },
          Lender: {
            type: "object",
            properties: {
              TIN: {
                type: "string",
                description: "Lender's tax identification number",
                example: "12-3456789",
              },
              Name: {
                type: "string",
                description: "Lender's name",
                example: "Woodgrove Bank",
              },
              Address: {
                type: "address",
                description: "Lender's address",
                example: "321 Microsoft Way, Redmond WA 98052",
              },
              Telephone: {
                type: "string",
                description: "Lender's telephone number",
                example: "(987) 654-3210",
              },
            },
          },
          StudentLoanInterest: {
            type: "number",
            description: "Student loan interest received by lender (box 1)",
            example: "1,234,567.89",
          },
          ExcludesFeesOrInterest: {
            type: "string",
            description:
              "Does box 1 exclude loan origination fees and/or capitalized interest (box 2)",
            example: "true",
          },
        },
      },
    },
  } as const;
}
