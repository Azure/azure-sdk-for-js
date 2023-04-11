// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-tax.us.1098E
// Description: Extract key information from United States Internal Revenue Service Form 1098-E (2021-2022).
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from United States Internal Revenue Service Form 1098-E (2021-2022).
 */
const PrebuiltTaxUs1098EModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-tax.us.1098E",
    description:
      "Extract key information from United States Internal Revenue Service Form 1098-E (2021-2022).",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
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
  };
}

module.exports = {
  PrebuiltTaxUs1098EModel,
  PrebuiltTaxUs1098EResult,
  PrebuiltTaxUs1098EDocument,
  TaxUs1098E,
  TaxUs1098EFields,
  TaxUs1098EBorrower,
  TaxUs1098ELender,
};
