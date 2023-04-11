// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Model:       prebuilt-healthInsuranceCard.us
// Description: Extract key information from US health insurance cards.
// API Version: 2023-02-28-preview
// Created:     Thu Apr 06 2023

const fr = require("@azure/ai-form-recognizer");

/**
 * Extract key information from US health insurance cards.
 */
const PrebuiltHealthInsuranceCardUsModel = fr.createModelFromSchema(modelInfo());

/**
 * The raw model schema.
 */
function modelInfo() {
  return {
    modelId: "prebuilt-healthInsuranceCard.us",
    description: "Extract key information from US health insurance cards.",
    createdOn: "2023-02-28T00:00:00.000Z",
    apiVersion: "2023-02-28-preview",
    docTypes: {
      "healthInsuranceCard.us": {
        buildMode: "template",
        fieldSchema: {
          Insurer: {
            type: "string",
            description: "Health insurance provider name",
          },
          Member: {
            type: "object",
            properties: {
              Name: {
                type: "string",
                description: "Member name",
              },
              BirthDate: {
                type: "date",
                description: "Member date of birth",
              },
              Employer: {
                type: "string",
                description: "Member name employer",
              },
              Gender: {
                type: "string",
                description: "Member gender",
              },
              IdNumberSuffix: {
                type: "string",
                description:
                  "Identification Number Suffix as it appears on some health insurance cards",
              },
            },
          },
          Dependents: {
            type: "array",
            description:
              "Array holding list of dependents, ordered where possible by membership suffix value",
            items: {
              type: "object",
              properties: {
                Name: {
                  type: "string",
                  description: "Dependent name",
                },
              },
            },
          },
          IdNumber: {
            type: "object",
            properties: {
              Prefix: {
                type: "string",
                description:
                  "Identification Number Prefix as it appears on some health insurance cards",
              },
              Number: {
                type: "string",
                description: "Identification Number",
              },
            },
          },
          GroupNumber: {
            type: "string",
            description: "Insurance Group Number",
          },
          PrescriptionInfo: {
            type: "object",
            properties: {
              Issuer: {
                type: "string",
                description: "ANSI issuer identification number (IIN)",
              },
              RxBIN: {
                type: "string",
                description: "Prescription issued BIN number",
              },
              RxPCN: {
                type: "string",
                description: "Prescription processor control number",
              },
              RxGrp: {
                type: "string",
                description: "Prescription group number",
              },
              RxId: {
                type: "string",
                description:
                  "Prescription identification number. If not present, will default to membership id number",
              },
              RxPlan: {
                type: "string",
                description: "Prescription Plan number",
              },
            },
          },
          Pbm: {
            type: "string",
            description: "Pharmacy Benefit Manager for the plan",
          },
          EffectiveDate: {
            type: "date",
            description: "Date from which the plan is effective",
          },
          Copays: {
            type: "array",
            description: "Array holding list of CoPay Benefits",
            items: {
              type: "object",
              properties: {
                Benefit: {
                  type: "string",
                  description: "Co-Pay Benefit name",
                },
                Amount: {
                  type: "currency",
                  description: "Co-Pay required amount",
                },
              },
            },
          },
          Payer: {
            type: "object",
            properties: {
              Id: {
                type: "string",
                description: "Payer Id Number",
              },
              Address: {
                type: "address",
                description: "Payer address",
              },
              PhoneNumber: {
                type: "phoneNumber",
                description: "Payer phone number",
              },
            },
          },
          Plan: {
            type: "object",
            properties: {
              Number: {
                type: "string",
                description: "Plan number",
              },
              Name: {
                type: "string",
                description: "Plan name - If see Medicaid -> then medicaid",
              },
              Type: {
                type: "string",
                description: "Plan type",
              },
            },
          },
        },
      },
    },
  };
}

module.exports = {
  PrebuiltHealthInsuranceCardUsModel,
  PrebuiltHealthInsuranceCardUsResult,
  PrebuiltHealthInsuranceCardUsDocument,
  HealthInsuranceCardUs,
  HealthInsuranceCardUsFields,
  HealthInsuranceCardUsMember,
  HealthInsuranceCardUsDependentsElement,
  HealthInsuranceCardUsIdNumber,
  HealthInsuranceCardUsPrescriptionInfo,
  HealthInsuranceCardUsCopaysElement,
  HealthInsuranceCardUsPayer,
  HealthInsuranceCardUsPlan,
};
