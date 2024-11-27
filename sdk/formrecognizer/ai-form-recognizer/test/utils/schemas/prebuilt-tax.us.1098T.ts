// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Model:       prebuilt-tax.us.1098T
// Description: Extract key information from United States Internal Revenue Service Form 1098-T (2021-current).
// API Version: 2023-07-31
// Created:     Tue Aug 01 2023

import * as fr from "../../../src";

/**
 * Extract key information from United States Internal Revenue Service Form 1098-T (2021-current).
 */
export const PrebuiltTaxUs1098TModel = fr.createModelFromSchema(
  modelInfo(),
) as fr.DocumentModel<PrebuiltTaxUs1098TResult>;

export interface PrebuiltTaxUs1098TResult extends fr.AnalyzeResultCommon {
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
  documents: PrebuiltTaxUs1098TDocument[];
}

export type PrebuiltTaxUs1098TDocument = TaxUs1098T;

export interface TaxUs1098T {
  /**
   * Document type: "tax.us.1098T".
   */
  docType: "tax.us.1098T";
  /**
   * Document fields.
   */
  fields: TaxUs1098TFields;
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
 * Describes the fields of `TaxUs1098TFields`.
 */
export interface TaxUs1098TFields {
  /**
   * Form tax year
   */
  taxYear?: fr.DocumentNumberField;
  /**
   * `TaxUs1098T` "Student" field
   */
  student?: fr.DocumentObjectField<TaxUs1098TStudent>;
  /**
   * `TaxUs1098T` "Filer" field
   */
  filer?: fr.DocumentObjectField<TaxUs1098TFiler>;
  /**
   * Payment received for qualified tuition and related expenses (box 1)
   */
  paymentReceived?: fr.DocumentNumberField;
  /**
   * Adjustments of payments for a prior year (box 4)
   */
  adjustmentsForPriorYear?: fr.DocumentNumberField;
  /**
   * Scholarships or grants (box 5)
   */
  scholarships?: fr.DocumentNumberField;
  /**
   * Adjustments of scholarships or grants for a prior year (box 6)
   */
  scholarshipsAdjustments?: fr.DocumentNumberField;
  /**
   * Does payment received relate to an academic period beginning in the next tax year (box 7)
   */
  includesAmountForNextPeriod?: fr.DocumentStringField;
  /**
   * Was the student at least a half-time student during any academic period in this tax year (box 8)
   */
  isAtLeastHalfTimeStudent?: fr.DocumentStringField;
  /**
   * Was the student a graduate student (box 9)
   */
  isGraduateStudent?: fr.DocumentStringField;
  /**
   * Total amount of reimbursements or refunds of qualified tuition and related expanses (box 10)
   */
  insuranceContractReimbursements?: fr.DocumentNumberField;
}

/**
 * Describes the fields of `TaxUs1098TStudent`.
 */
export interface TaxUs1098TStudent {
  /**
   * Student's tax identification nNumber
   */
  tIN?: fr.DocumentStringField;
  /**
   * Student's full name as written on the form
   */
  name?: fr.DocumentStringField;
  /**
   * Student's address
   */
  address?: fr.DocumentAddressField;
  /**
   * Student's account number
   */
  accountNumber?: fr.DocumentStringField;
}

/**
 * Describes the fields of `TaxUs1098TFiler`.
 */
export interface TaxUs1098TFiler {
  /**
   * Filer's tax identification number
   */
  tIN?: fr.DocumentStringField;
  /**
   * Filer's name
   */
  name?: fr.DocumentStringField;
  /**
   * Filer's address
   */
  address?: fr.DocumentAddressField;
  /**
   * Filer's telephone number
   */
  telephone?: fr.DocumentStringField;
}

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-tax.us.1098T",
    description:
      "Extract key information from United States Internal Revenue Service Form 1098-T (2021-current).",
    createdOn: "2023-07-31T00:00:00.000Z",
    apiVersion: "2023-07-31",
    docTypes: {
      "tax.us.1098T": {
        buildMode: "template",
        fieldSchema: {
          TaxYear: {
            type: "number",
            description: "Form tax year",
            example: "2021",
          },
          Student: {
            type: "object",
            properties: {
              TIN: {
                type: "string",
                description: "Student's tax identification nNumber",
                example: "123-45-6789",
              },
              Name: {
                type: "string",
                description: "Student's full name as written on the form",
                example: "John Smith",
              },
              Address: {
                type: "address",
                description: "Student's address",
                example: "123 Microsoft Way, Redmond WA 98052",
              },
              AccountNumber: {
                type: "string",
                description: "Student's account number",
                example: "55123456789",
              },
            },
          },
          Filer: {
            type: "object",
            properties: {
              TIN: {
                type: "string",
                description: "Filer's tax identification number",
                example: "12-3456789",
              },
              Name: {
                type: "string",
                description: "Filer's name",
                example: "Woodgrove Bank",
              },
              Address: {
                type: "address",
                description: "Filer's address",
                example: "321 Microsoft Way, Redmond WA 98052",
              },
              Telephone: {
                type: "string",
                description: "Filer's telephone number",
                example: "(987) 654-3210",
              },
            },
          },
          PaymentReceived: {
            type: "number",
            description: "Payment received for qualified tuition and related expenses (box 1)",
            example: "1,234,567.89",
          },
          AdjustmentsForPriorYear: {
            type: "number",
            description: "Adjustments of payments for a prior year (box 4)",
            example: "1,234,567.89",
          },
          Scholarships: {
            type: "number",
            description: "Scholarships or grants (box 5)",
            example: "1,234,567.89",
          },
          ScholarshipsAdjustments: {
            type: "number",
            description: "Adjustments of scholarships or grants for a prior year (box 6)",
            example: "1,234,567.89",
          },
          IncludesAmountForNextPeriod: {
            type: "string",
            description:
              "Does payment received relate to an academic period beginning in the next tax year (box 7)",
            example: "true",
          },
          IsAtLeastHalfTimeStudent: {
            type: "string",
            description:
              "Was the student at least a half-time student during any academic period in this tax year (box 8)",
            example: "false",
          },
          IsGraduateStudent: {
            type: "string",
            description: "Was the student a graduate student (box 9)",
            example: "true",
          },
          InsuranceContractReimbursements: {
            type: "number",
            description:
              "Total amount of reimbursements or refunds of qualified tuition and related expanses (box 10)",
            example: "1,234,567.89",
          },
        },
      },
    },
  } as const;
}
