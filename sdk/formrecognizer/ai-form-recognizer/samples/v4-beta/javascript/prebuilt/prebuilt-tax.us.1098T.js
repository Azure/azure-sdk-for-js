// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-tax.us.1098T
// Description: Extract key information from United States Internal Revenue Service Form 1098-T (2021-2022).
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from United States Internal Revenue Service Form 1098-T (2021-2022).
 */
const PrebuiltTaxUs1098TModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-tax.us.1098T",
    description:
      "Extract key information from United States Internal Revenue Service Form 1098-T (2021-2022).",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
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
  };
}

module.exports = {
  PrebuiltTaxUs1098TModel,
  PrebuiltTaxUs1098TResult,
  PrebuiltTaxUs1098TDocument,
  TaxUs1098T,
  TaxUs1098TFields,
  TaxUs1098TStudent,
  TaxUs1098TFiler,
};
