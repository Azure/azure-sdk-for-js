// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-tax.us.1098
// Description: Extract key information from United States Internal Revenue Service Form 1098 (2021-2022).
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from United States Internal Revenue Service Form 1098 (2021-2022).
 */
const PrebuiltTaxUs1098Model = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-tax.us.1098",
    description:
      "Extract key information from United States Internal Revenue Service Form 1098 (2021-2022).",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
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
              "Account Number": {
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
  };
}

module.exports = {
  PrebuiltTaxUs1098Model,
  PrebuiltTaxUs1098Result,
  PrebuiltTaxUs1098Document,
  TaxUs1098,
  TaxUs1098Fields,
  TaxUs1098Borrower,
  TaxUs1098Lender,
};
