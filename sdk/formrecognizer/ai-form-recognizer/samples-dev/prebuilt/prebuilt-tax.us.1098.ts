// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @azsdk-util
 * @azsdk-skip-javascript
 */

// Model:       prebuilt-tax.us.1098
// Description: Extract key information from United States Internal Revenue Service Form 1098 (2021-current).
// API Version: 2023-07-31
// Created:     Wed Aug 02 2023

import * as fr from "@azure/ai-form-recognizer";

/**
 * Extract key information from United States Internal Revenue Service Form 1098 (2021-current).
 */
export const PrebuiltTaxUs1098Model = fr.createModelFromSchema(
  modelInfo()
) as fr.DocumentModel<PrebuiltTaxUs1098Result>;

export interface PrebuiltTaxUs1098Result extends fr.AnalyzeResultCommon {
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
  documents: PrebuiltTaxUs1098Document[];
}

export type PrebuiltTaxUs1098Document = TaxUs1098;

export interface TaxUs1098 {
  /**
   * Document type: "tax.us.1098".
   */
  docType: "tax.us.1098";
  /**
   * Document fields.
   */
  fields: TaxUs1098Fields;
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
 * Describes the fields of `TaxUs1098Fields`.
 */
export interface TaxUs1098Fields {
  /**
   * Form tax year
   */
  taxYear?: fr.DocumentNumberField;
  /**
   * `TaxUs1098` "Borrower" field
   */
  borrower?: fr.DocumentObjectField<TaxUs1098Borrower>;
  /**
   * `TaxUs1098` "Lender" field
   */
  lender?: fr.DocumentObjectField<TaxUs1098Lender>;
  /**
   * Mortgage interest amount received from payer(s)/borrower(s) (box 1)
   */
  mortgageInterest?: fr.DocumentNumberField;
  /**
   * Outstanding mortgage principal (box 2)
   */
  outstandingMortgagePrincipal?: fr.DocumentNumberField;
  /**
   * Origination date of the mortgage (box 3)
   */
  mortgageOriginationDate?: fr.DocumentDateField;
  /**
   * Refund amount of overpaid interest (box 4)
   */
  overpaidInterestRefund?: fr.DocumentNumberField;
  /**
   * Mortgage insurance premium amount (box 5)
   */
  mortgageInsurancePremium?: fr.DocumentNumberField;
  /**
   * Points paid on purchase of principal residence (box 6)
   */
  pointsPaid?: fr.DocumentNumberField;
  /**
   * Is the address of the property securing the mortgage the same as the payer's/borrower's mailing address (box 7)
   */
  isPropertyAddressSameAsBorrower?: fr.DocumentStringField;
  /**
   * Address or description of the property securing the mortgage (box 8)
   */
  propertyAddress?: fr.DocumentStringField;
  /**
   * Number of mortgaged properties (box 9)
   */
  mortgagedPropertiesCount?: fr.DocumentNumberField;
  /**
   * Additional information to report to payer (box 10)
   */
  other?: fr.DocumentStringField;
  /**
   * Real estate tax (box 10)
   */
  realEstateTax?: fr.DocumentNumberField;
  /**
   * Additional assessments made on the property (box 10)
   */
  additionalAssessment?: fr.DocumentStringField;
  /**
   * Mortgage acquisition date (box 11)
   */
  mortgageAcquisitionDate?: fr.DocumentDateField;
}

/**
 * Describes the fields of `TaxUs1098Borrower`.
 */
export interface TaxUs1098Borrower {
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
 * Describes the fields of `TaxUs1098Lender`.
 */
export interface TaxUs1098Lender {
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
    modelId: "prebuilt-tax.us.1098",
    description:
      "Extract key information from United States Internal Revenue Service Form 1098 (2021-current).",
    createdOn: "2023-07-31T00:00:00.000Z",
    apiVersion: "2023-07-31",
    docTypes: {
      "tax.us.1098": {
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
          MortgageInterest: {
            type: "number",
            description: "Mortgage interest amount received from payer(s)/borrower(s) (box 1)",
            example: "1,234,567.89",
          },
          OutstandingMortgagePrincipal: {
            type: "number",
            description: "Outstanding mortgage principal (box 2)",
            example: "1,234,567.89",
          },
          MortgageOriginationDate: {
            type: "date",
            description: "Origination date of the mortgage (box 3)",
            example: "2022-01-01",
          },
          OverpaidInterestRefund: {
            type: "number",
            description: "Refund amount of overpaid interest (box 4)",
            example: "1,234,567.89",
          },
          MortgageInsurancePremium: {
            type: "number",
            description: "Mortgage insurance premium amount (box 5)",
            example: "1,234,567.89",
          },
          PointsPaid: {
            type: "number",
            description: "Points paid on purchase of principal residence (box 6)",
            example: "1,234,567.89",
          },
          IsPropertyAddressSameAsBorrower: {
            type: "string",
            description:
              "Is the address of the property securing the mortgage the same as the payer's/borrower's mailing address (box 7)",
            example: "true",
          },
          PropertyAddress: {
            type: "string",
            description: "Address or description of the property securing the mortgage (box 8)",
            example: "123 Main St., Redmond WA 98052",
          },
          MortgagedPropertiesCount: {
            type: "number",
            description: "Number of mortgaged properties (box 9)",
            example: "1",
          },
          Other: {
            type: "string",
            description: "Additional information to report to payer (box 10)",
          },
          RealEstateTax: {
            type: "number",
            description: "Real estate tax (box 10)",
            example: "1,234,567.89",
          },
          AdditionalAssessment: {
            type: "string",
            description: "Additional assessments made on the property (box 10)",
            example: "Structural damage observed",
          },
          MortgageAcquisitionDate: {
            type: "date",
            description: "Mortgage acquisition date (box 11)",
            example: "2022-01-01",
          },
        },
      },
    },
  } as const;
}
